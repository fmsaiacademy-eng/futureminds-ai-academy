<#
.SYNOPSIS
  Creates the Azure App Service that hosts FutureMinds AI Academy and pushes
  the current build to it. Safe to re-run: every step is idempotent.

.DESCRIPTION
  Run this after `az login`. Afterwards, pushes to `main` deploy automatically
  via .github/workflows/azure-deploy.yml.

  Prerequisites:
    - Azure CLI installed and logged in:  az login
    - Secrets available locally in .env.local (they are read from there and
      copied into App Service settings; the file itself is never uploaded).

.EXAMPLE
  powershell -ExecutionPolicy Bypass -File deploy/azure-provision-and-deploy.ps1
#>

[CmdletBinding()]
param(
  [string]$ResourceGroup = "futureminds-rg",
  [string]$Location      = "centralindia",
  [string]$PlanName      = "futureminds-plan",
  [string]$AppName       = "futureminds-ai-academy",
  # B1 is the cheapest tier with always-on and a free managed TLS cert.
  [string]$Sku           = "B1"
)

$ErrorActionPreference = "Stop"
$repoRoot = Split-Path -Parent $PSScriptRoot

function Step($msg) { Write-Host "`n==> $msg" -ForegroundColor Cyan }

# `az` is a native command, so a failure sets $LASTEXITCODE without raising a
# PowerShell error. Without this wrapper the script sails past a failed deploy
# and reports success.
function Invoke-Az {
  param([Parameter(ValueFromRemainingArguments = $true)][string[]]$AzArgs)
  & az @AzArgs
  if ($LASTEXITCODE -ne 0) {
    throw "az $($AzArgs -join ' ') failed (exit $LASTEXITCODE)"
  }
}

<#
  Compress-Archive (Windows PowerShell 5.1) writes zip entry names with
  backslash separators. Linux App Service then extracts single files literally
  named `.next\server\app\page.js`, and Kudu's rsync rejects each one with
  "Invalid argument (22)" — the deploy fails with a bare HTTP 400. Writing the
  entries ourselves with forward slashes is the fix.
#>
function New-DeploymentZip {
  param([string]$SourceDir, [string]$DestinationPath)

  Add-Type -AssemblyName System.IO.Compression, System.IO.Compression.FileSystem
  if (Test-Path -LiteralPath $DestinationPath) { Remove-Item -LiteralPath $DestinationPath -Force }

  $root = (Resolve-Path $SourceDir).Path.TrimEnd('\') + '\'
  $stream  = [System.IO.File]::Open($DestinationPath, [System.IO.FileMode]::CreateNew)
  $archive = New-Object System.IO.Compression.ZipArchive($stream, [System.IO.Compression.ZipArchiveMode]::Create)
  try {
    foreach ($file in Get-ChildItem -LiteralPath $SourceDir -Recurse -File -Force) {
      $entry = $file.FullName.Substring($root.Length).Replace('\', '/')
      [System.IO.Compression.ZipFileExtensions]::CreateEntryFromFile($archive, $file.FullName, $entry) | Out-Null
    }
  } finally {
    $archive.Dispose()
    $stream.Dispose()
  }
}

# Copy-Item -Recurse into an existing directory nests it (public/public), so
# clear the destination first. Matters on every re-run.
function Copy-Tree {
  param([string]$Source, [string]$Destination)
  if (Test-Path -LiteralPath $Destination) { Remove-Item -LiteralPath $Destination -Recurse -Force }
  Copy-Item -LiteralPath $Source -Destination $Destination -Recurse -Force
}

# --- Read secrets out of .env.local ----------------------------------------
$envFile = Join-Path $repoRoot ".env.local"
if (-not (Test-Path $envFile)) { throw "$envFile not found. Cannot resolve MONGODB_URI / ADMIN_TOKEN." }

$settings = @{}
foreach ($line in Get-Content $envFile) {
  if ($line -match '^\s*([A-Z_][A-Z0-9_]*)\s*=\s*(.*)$') {
    $settings[$Matches[1]] = $Matches[2].Trim().Trim('"')
  }
}
foreach ($required in @("MONGODB_URI", "ADMIN_TOKEN")) {
  if (-not $settings[$required]) { throw "$required is missing or empty in .env.local" }
}

# --- Provision --------------------------------------------------------------
Step "Resource group $ResourceGroup ($Location)"
Invoke-Az group create --name $ResourceGroup --location $Location --output none

Step "App Service plan $PlanName ($Sku, Linux)"
Invoke-Az appservice plan create `
  --name $PlanName --resource-group $ResourceGroup `
  --location $Location --sku $Sku --is-linux --output none

Step "Web app $AppName (Node 22 LTS)"
Invoke-Az webapp create `
  --name $AppName --resource-group $ResourceGroup `
  --plan $PlanName --runtime "NODE:22-lts" --output none

# --- Configure --------------------------------------------------------------
Step "Application settings"
$appSettings = @(
  @{ name = "MONGODB_URI"; value = $settings['MONGODB_URI'] }
  @{ name = "MONGODB_DB";  value = $(if ($settings['MONGODB_DB']) { $settings['MONGODB_DB'] } else { 'futureminds' }) }
  @{ name = "ADMIN_TOKEN"; value = $settings['ADMIN_TOKEN'] }
  @{ name = "NODE_ENV";    value = "production" }
  # The bundle is already built; App Service must not try to build it again.
  @{ name = "SCM_DO_BUILD_DURING_DEPLOYMENT"; value = "false" }
  @{ name = "WEBSITE_NODE_DEFAULT_VERSION";   value = "~22" }
)
if ($settings['LEAD_WEBHOOK_URL']) {
  $appSettings += @{ name = "LEAD_WEBHOOK_URL"; value = $settings['LEAD_WEBHOOK_URL'] }
}

<#
  Settings go in via a JSON file rather than `--settings KEY=VALUE ...`.
  On Windows `az` is a .cmd batch wrapper, so cmd.exe parses the arguments and
  treats the `&` in a MongoDB connection string as a command separator. That
  silently swallows every setting after it into one corrupted value.
#>
$settingsFile = Join-Path ([System.IO.Path]::GetTempPath()) "fm-appsettings.json"
# No BOM: the CLI's JSON parser rejects one.
[System.IO.File]::WriteAllText(
  $settingsFile,
  (ConvertTo-Json -InputObject @($appSettings) -Depth 3),
  (New-Object System.Text.UTF8Encoding($false))
)
try {
  Invoke-Az webapp config appsettings set `
    --name $AppName --resource-group $ResourceGroup `
    --settings "@$settingsFile" --output none
} finally {
  # The file holds the database password and admin token.
  Remove-Item -LiteralPath $settingsFile -Force -ErrorAction SilentlyContinue
}

Step "Startup command, HTTPS-only, always-on"
Invoke-Az webapp config set `
  --name $AppName --resource-group $ResourceGroup `
  --startup-file "node server.js" --always-on true --output none
Invoke-Az webapp update `
  --name $AppName --resource-group $ResourceGroup `
  --https-only true --output none

# --- Build and deploy -------------------------------------------------------
Push-Location $repoRoot
try {
  Step "Building"
  npm run build
  if ($LASTEXITCODE -ne 0) { throw "npm run build failed" }

  # server.js only serves these when they sit next to it.
  Copy-Tree "public"       ".next/standalone/public"
  Copy-Tree ".next/static" ".next/standalone/.next/static"

  Step "Packaging"
  $zip = Join-Path ([System.IO.Path]::GetTempPath()) "futureminds-standalone.zip"
  New-DeploymentZip -SourceDir ".next/standalone" -DestinationPath $zip
  Write-Host "    $([math]::Round((Get-Item $zip).Length / 1MB, 1)) MB"

  # --clean wipes wwwroot first, so a previously botched upload cannot leave
  # stale files behind.
  #
  # --track-status false: the default polls container startup for ~10 minutes
  # and then exits non-zero even when the upload and the site are both fine.
  # The verification below is the real check.
  Step "Deploying to $AppName"
  Invoke-Az webapp deploy `
    --name $AppName --resource-group $ResourceGroup `
    --src-path $zip --type zip --clean true --restart true `
    --track-status false --output none
} finally {
  Pop-Location
}

$url = "https://$AppName.azurewebsites.net"

# The container needs a moment to come up after the restart.
Step "Verifying $url"
$homeOk = $false
foreach ($attempt in 1..30) {
  try {
    $r = Invoke-WebRequest -Uri $url -UseBasicParsing -TimeoutSec 30
    if ($r.StatusCode -eq 200) { $homeOk = $true; break }
  } catch { }
  Start-Sleep -Seconds 10
}
if (-not $homeOk) { throw "Site did not return 200 after ~5 minutes. Check: az webapp log tail -n $AppName -g $ResourceGroup" }
Write-Host "    homepage 200" -ForegroundColor Green

# A DB-backed route. 401 means the route module loaded and reached the auth
# check; 500 means it failed to load at all (the Turbopack/mongodb bug).
try {
  Invoke-WebRequest -Uri "$url/api/placements" -UseBasicParsing -TimeoutSec 30 | Out-Null
  $apiCode = 200
} catch {
  $apiCode = [int]$_.Exception.Response.StatusCode
}
if ($apiCode -eq 401) {
  Write-Host "    api routes load (401 as expected without a token)" -ForegroundColor Green
} else {
  Write-Host "    WARNING: /api/placements returned $apiCode, expected 401." -ForegroundColor Red
  Write-Host "    Check the logs: az webapp log tail -n $AppName -g $ResourceGroup" -ForegroundColor Red
}

Step "Deployed -> $url"
Write-Host "If the site loads but forms hang, allow Azure's outbound IPs in MongoDB Atlas:" -ForegroundColor Yellow
Write-Host "  az webapp show -n $AppName -g $ResourceGroup --query outboundIpAddresses -o tsv"
Write-Host "Live logs:  az webapp log tail -n $AppName -g $ResourceGroup"
