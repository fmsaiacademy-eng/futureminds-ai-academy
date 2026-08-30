export type Module = {
  title: string;
  duration: string;
  topics: string[];
};

export type Course = {
  slug: string;
  title: string;
  shortTitle: string;
  code: string;
  tagline: string;
  summary: string;
  level: "Beginner friendly" | "Intermediate" | "Advanced";
  duration: string;
  effort: string;
  format: string;
  mode: string;
  featured: boolean;
  accent: "cyan" | "violet" | "amber" | "emerald" | "rose" | "sky";
  /** Typical market range in India for the target roles. Indicative, not a guarantee. */
  salaryRange: string;
  roles: string[];
  audience: string[];
  prerequisites: string[];
  outcomes: string[];
  tools: string[];
  modules: Module[];
  capstones: string[];
};

export const courses: Course[] = [
  {
    slug: "forward-deployed-engineer",
    title: "Forward Deployed Engineer (FDE)",
    shortTitle: "Forward Deployed Engineer",
    code: "FDE-401",
    tagline: "The engineer who ships AI inside the customer's world.",
    summary:
      "Forward Deployed Engineers sit between a product team and its largest customers — scoping the real problem, building the integration, and making an AI system work against messy production data. It is one of the fastest-growing and highest-leverage roles in AI companies today, and almost nobody trains for it. This programme does.",
    level: "Advanced",
    duration: "16 weeks",
    effort: "10–12 hrs/week",
    format: "Live cohort + 1:1 mentorship",
    mode: "Classroom in Marathahalli & Live online",
    featured: true,
    accent: "cyan",
    salaryRange: "₹18–45 LPA",
    roles: [
      "Forward Deployed Engineer",
      "AI Solutions Engineer",
      "Solutions Architect (AI)",
      "Technical Account Engineer",
      "Deployment Engineer",
    ],
    audience: [
      "Software engineers with 2+ years who enjoy customer-facing work",
      "Solution architects and pre-sales engineers moving into AI",
      "Data and ML engineers who want scope beyond the notebook",
    ],
    prerequisites: [
      "Comfortable writing Python and reading someone else's codebase",
      "Basic SQL and REST API experience",
      "Willingness to present and defend technical decisions",
    ],
    outcomes: [
      "Run a discovery call and convert a vague business ask into a scoped, testable AI solution",
      "Build production integrations against unfamiliar customer systems and dirty data",
      "Design evaluation harnesses that prove an AI feature actually works for the customer",
      "Deploy into restricted environments — VPC, on-prem, air-gapped — and debug them live",
      "Write the solution design docs, runbooks and handover material a real deployment needs",
    ],
    tools: [
      "Python",
      "FastAPI",
      "Docker",
      "Kubernetes",
      "Claude & OpenAI APIs",
      "Model Context Protocol",
      "Postgres + pgvector",
      "Terraform",
      "Snowflake",
      "Datadog",
    ],
    modules: [
      {
        title: "The FDE Operating Model",
        duration: "Weeks 1–2",
        topics: [
          "What an FDE actually owns, and where the role sits between product, sales and engineering",
          "Discovery: running technical scoping calls and asking the question behind the question",
          "Turning a business objective into a success metric you can measure in week one",
          "Writing a solution design document that a customer VP and a staff engineer both accept",
        ],
      },
      {
        title: "Integration Engineering",
        duration: "Weeks 3–5",
        topics: [
          "Reading and mapping an unfamiliar customer schema under time pressure",
          "Building resilient connectors: REST, GraphQL, webhooks, SFTP, message queues",
          "Auth in the enterprise — OAuth2, SAML, SCIM, service accounts, rotating secrets",
          "Idempotency, retries, backpressure and the failure modes that page you at 2 AM",
        ],
      },
      {
        title: "Applied LLM Systems",
        duration: "Weeks 6–8",
        topics: [
          "Retrieval over customer data: chunking strategy, hybrid search, reranking, citations",
          "Tool-calling and Model Context Protocol servers over customer systems",
          "Structured output, schema enforcement and graceful degradation",
          "Cost and latency engineering: caching, routing, batching, model selection",
        ],
      },
      {
        title: "Evaluation & Trust",
        duration: "Weeks 9–10",
        topics: [
          "Building a golden dataset with the customer's own subject-matter experts",
          "Offline evals, LLM-as-judge, and knowing when the judge is wrong",
          "Online measurement: shadow traffic, A/B rollout, human review queues",
          "Guardrails, PII handling, red-teaming and the security questionnaire",
        ],
      },
      {
        title: "Deploying Into Someone Else's Estate",
        duration: "Weeks 11–13",
        topics: [
          "VPC, on-prem and air-gapped deployments — what breaks and how to plan for it",
          "Infrastructure as code for repeatable customer environments",
          "Observability you can hand over: logging, tracing, dashboards, alerting",
          "Runbooks, SLAs, escalation paths and the production support handover",
        ],
      },
      {
        title: "The Customer-Facing Craft",
        duration: "Weeks 14–16",
        topics: [
          "Demoing to executives without dumbing it down",
          "Handling scope creep, blockers and the difficult status update",
          "Feeding the field back into the product roadmap",
          "Capstone build, live defence, and FDE interview simulation",
        ],
      },
    ],
    capstones: [
      "Take a simulated enterprise brief from discovery call to deployed, evaluated AI system with full handover documentation",
      "Debug a deliberately broken customer deployment live, under time pressure, and write the incident report",
    ],
  },

  {
    slug: "generative-ai-and-agentic-ai",
    title: "Generative AI & Agentic AI Engineering",
    shortTitle: "Generative & Agentic AI",
    code: "GEN-301",
    tagline: "From prompt to production agent — build systems that reason and act.",
    summary:
      "The flagship programme. You will go past chatbot demos and build what companies are actually hiring for: retrieval systems that cite their sources, multi-step agents that use tools safely, and evaluation pipelines that keep them honest in production.",
    level: "Intermediate",
    duration: "20 weeks",
    effort: "10–12 hrs/week",
    format: "Live cohort + build labs",
    mode: "Classroom in Marathahalli & Live online",
    featured: true,
    accent: "violet",
    salaryRange: "₹12–38 LPA",
    roles: [
      "Generative AI Engineer",
      "AI / Agent Engineer",
      "LLM Application Developer",
      "AI Research Engineer",
      "Conversational AI Lead",
    ],
    audience: [
      "Developers who want to move into AI engineering",
      "Data scientists shifting from classical ML to LLM systems",
      "Technical founders building an AI product",
    ],
    prerequisites: [
      "Solid Python fundamentals",
      "Basic understanding of APIs and Git",
      "No deep learning background required — we build it up",
    ],
    outcomes: [
      "Explain transformer and attention mechanics well enough to debug model behaviour",
      "Ship a production RAG system with hybrid retrieval, reranking and grounded citations",
      "Design multi-agent systems with planning, memory, tool use and human-in-the-loop control",
      "Fine-tune open-weight models with LoRA/QLoRA and know when fine-tuning is the wrong answer",
      "Build the eval and observability layer that keeps an AI feature safe to release",
    ],
    tools: [
      "Python",
      "PyTorch",
      "Hugging Face",
      "LangGraph",
      "Model Context Protocol",
      "Claude & OpenAI APIs",
      "Llama & Mistral",
      "pgvector",
      "Qdrant",
      "vLLM",
      "LangSmith",
      "Ragas",
    ],
    modules: [
      {
        title: "Foundations of Modern LLMs",
        duration: "Weeks 1–3",
        topics: [
          "Tokenisation, embeddings and what the model is really doing",
          "Transformer architecture and attention, built from scratch in PyTorch",
          "Pretraining, instruction tuning, RLHF and why models behave the way they do",
          "Context windows, sampling parameters, and reading a model card critically",
        ],
      },
      {
        title: "Prompt & Context Engineering",
        duration: "Weeks 4–5",
        topics: [
          "Structured prompting, few-shot design and decomposition patterns",
          "Reasoning techniques: chain-of-thought, self-consistency, reflection",
          "Context window budgeting, compaction and long-document strategies",
          "Prompt injection, jailbreaks and defensive prompt design",
        ],
      },
      {
        title: "Retrieval-Augmented Generation",
        duration: "Weeks 6–9",
        topics: [
          "Document parsing, chunking strategy and metadata design",
          "Embedding model selection and vector database internals (HNSW, IVF)",
          "Hybrid search with BM25, reranking, and query rewriting",
          "Grounded answers, citation enforcement and hallucination reduction",
          "GraphRAG and structured-data retrieval over SQL",
        ],
      },
      {
        title: "Agentic AI Systems",
        duration: "Weeks 10–14",
        topics: [
          "Agent architectures: ReAct, planner-executor, supervisor and swarm patterns",
          "Tool design and Model Context Protocol servers",
          "Short-term, episodic and long-term memory design",
          "Multi-agent orchestration with LangGraph: state, checkpoints, recovery",
          "Human-in-the-loop approval, sandboxing and blast-radius control",
          "Computer-use and browser agents, and their failure modes",
        ],
      },
      {
        title: "Fine-Tuning & Open Models",
        duration: "Weeks 15–17",
        topics: [
          "When to prompt, when to retrieve, when to fine-tune — a decision framework",
          "Dataset construction, cleaning and synthetic data generation",
          "LoRA, QLoRA and parameter-efficient fine-tuning on a single GPU",
          "Preference tuning with DPO",
          "Quantisation, distillation and serving with vLLM",
        ],
      },
      {
        title: "Evaluation, Safety & Production",
        duration: "Weeks 18–20",
        topics: [
          "Building eval sets; Ragas, LLM-as-judge and human review pipelines",
          "Tracing, cost tracking and regression testing for non-deterministic systems",
          "Guardrails, content safety, PII redaction and audit trails",
          "Deployment, streaming, scaling and capstone demo day",
        ],
      },
    ],
    capstones: [
      "A production-grade agentic assistant over a real document corpus, with tool use, citations, evals and a public demo",
      "A fine-tuned open-weight model that beats a general-purpose baseline on a domain task you choose",
    ],
  },

  {
    slug: "data-science-and-ai-engineer",
    title: "Data Science & AI Engineer",
    shortTitle: "Data Science & AI Engineer",
    code: "DSA-302",
    tagline: "Analyse the data, build the model, ship the AI system.",
    summary:
      "The hybrid role most companies are actually trying to hire: someone who can interrogate data properly, build a model that holds up, and then take it all the way into a running production system. You go deep on statistics and machine learning, then on deep learning and LLM engineering, and finish by deploying and monitoring what you built.",
    level: "Intermediate",
    duration: "20 weeks",
    effort: "10–12 hrs/week",
    format: "Live cohort + project reviews",
    mode: "Classroom in Marathahalli & Live online",
    featured: true,
    accent: "emerald",
    salaryRange: "₹10–35 LPA",
    roles: [
      "Data Scientist",
      "AI Engineer",
      "Machine Learning Engineer",
      "Applied Scientist",
      "Decision Scientist",
    ],
    audience: [
      "Analysts and engineers moving into data science and AI roles",
      "Data scientists who keep getting stuck before production",
      "Developers who want modelling depth, not just API calls",
    ],
    prerequisites: [
      "Basic Python and SQL",
      "School-level mathematics; we rebuild the statistics you need",
      "No machine learning background required",
    ],
    outcomes: [
      "Take a business question, choose the right analysis, and defend your conclusion with evidence",
      "Build, tune and honestly evaluate machine learning models — and explain them to a non-technical stakeholder",
      "Train and fine-tune deep learning models, including LLMs, for domain problems",
      "Engineer AI systems with retrieval, tool use and evaluation, not just notebook prototypes",
      "Deploy models as services and keep them healthy with monitoring, drift detection and retraining",
    ],
    tools: [
      "Python",
      "pandas & Polars",
      "scikit-learn",
      "XGBoost",
      "PyTorch",
      "SQL & PostgreSQL",
      "Hugging Face",
      "Claude & OpenAI APIs",
      "pgvector",
      "MLflow",
      "FastAPI",
      "Docker",
      "Evidently",
      "AWS & Azure",
    ],
    modules: [
      {
        title: "Data Foundations in Python & SQL",
        duration: "Weeks 1–3",
        topics: [
          "Python for data work: clean, testable, modular code rather than notebook sprawl",
          "pandas and Polars for wrangling messy real-world datasets",
          "SQL from joins through window functions and query optimisation",
          "Data cleaning, missing-data strategy and reproducible preparation pipelines",
        ],
      },
      {
        title: "Statistics & Experimentation",
        duration: "Weeks 4–6",
        topics: [
          "Distributions, exploratory analysis and knowing what the data can and cannot answer",
          "Hypothesis testing, confidence intervals and the traps that produce false findings",
          "A/B test design, sample sizing and reading a result honestly",
          "Introduction to causal inference — separating correlation from cause",
          "Communicating analysis so it changes a decision",
        ],
      },
      {
        title: "Machine Learning in Depth",
        duration: "Weeks 7–11",
        topics: [
          "Regression, classification, trees and gradient boosting with XGBoost",
          "Feature engineering, data leakage, cross-validation and honest evaluation",
          "Imbalanced data, calibration and choosing the metric that matches the business cost",
          "Unsupervised learning: clustering, dimensionality reduction, anomaly detection",
          "Time series forecasting and recommendation systems",
          "Interpretability with SHAP, plus fairness and bias considerations",
        ],
      },
      {
        title: "Deep Learning",
        duration: "Weeks 12–14",
        topics: [
          "Neural network fundamentals and PyTorch",
          "Training dynamics: optimisers, regularisation, and debugging a model that will not learn",
          "CNNs for vision and transformers for text",
          "Transfer learning and getting real value from pretrained models",
        ],
      },
      {
        title: "AI & LLM Engineering",
        duration: "Weeks 15–17",
        topics: [
          "Working with LLM APIs: structured output, tool calling and streaming",
          "Retrieval-augmented generation over your own data with pgvector",
          "Fine-tuning open-weight models with LoRA, and deciding when not to",
          "Using LLMs inside a data science workflow: extraction, classification, synthetic data",
          "Evaluating non-deterministic systems, and guardrails before release",
        ],
      },
      {
        title: "Production, Monitoring & MLOps Essentials",
        duration: "Weeks 18–20",
        topics: [
          "Serving models with FastAPI and Docker; batch versus real-time inference",
          "Experiment tracking, model registry and reproducibility with MLflow",
          "Cloud deployment and CI/CD for model updates",
          "Data drift, concept drift and silent failure detection with Evidently",
          "Retraining strategy, rollback, and the capstone build and defence",
        ],
      },
    ],
    capstones: [
      "An end-to-end AI product: raw data through analysis and modelling to a deployed, monitored service with a live dashboard",
      "A domain problem solved with a fine-tuned or retrieval-augmented LLM, benchmarked honestly against a simpler baseline",
    ],
  },

  {
    slug: "full-stack-development-with-ai",
    title: "Full Stack Development with AI",
    shortTitle: "Full Stack with AI",
    code: "FSA-201",
    tagline: "Become the developer who ships complete AI products, alone.",
    summary:
      "A modern full stack programme rebuilt for the AI era. You learn to build and deploy real web applications end to end — and to embed LLM features, agents and AI-assisted workflows into them as a first-class part of the product, not a bolted-on demo.",
    level: "Beginner friendly",
    duration: "24 weeks",
    effort: "12–15 hrs/week",
    format: "Live cohort + daily practice",
    mode: "Classroom in Marathahalli & Live online",
    featured: true,
    accent: "sky",
    salaryRange: "₹6–24 LPA",
    roles: [
      "Full Stack Developer (AI)",
      "AI Product Engineer",
      "Frontend Engineer with AI",
      "Backend Engineer (AI Services)",
      "Founding Engineer",
    ],
    audience: [
      "Graduates and career switchers starting in software",
      "Frontend or backend developers who want the full picture plus AI",
      "Founders who want to build their own product",
    ],
    prerequisites: [
      "Basic programming logic in any language",
      "No prior web development experience needed",
    ],
    outcomes: [
      "Build and deploy production web applications with TypeScript, React and Next.js",
      "Design REST and streaming APIs, relational schemas and authentication that hold up",
      "Embed LLM features — chat, RAG, agents, structured extraction — inside a real product",
      "Use AI coding tools like a senior engineer: review, verify and stay accountable for the output",
      "Ship to the cloud with CI/CD, monitoring and a portfolio of live, working apps",
    ],
    tools: [
      "TypeScript",
      "React 19",
      "Next.js",
      "Node.js",
      "Python & FastAPI",
      "PostgreSQL",
      "Prisma",
      "Tailwind CSS",
      "Redis",
      "Docker",
      "Vercel & AWS",
      "Claude Code",
      "pgvector",
    ],
    modules: [
      {
        title: "Programming & Web Foundations",
        duration: "Weeks 1–4",
        topics: [
          "JavaScript and TypeScript from fundamentals to generics",
          "HTML, semantic markup and accessibility that is not an afterthought",
          "Modern CSS: flexbox, grid, responsive design, Tailwind",
          "Git, GitHub, code review and working like a team",
        ],
      },
      {
        title: "Frontend Engineering",
        duration: "Weeks 5–9",
        topics: [
          "React 19: components, hooks, server components, suspense",
          "Next.js App Router, routing, data fetching and rendering strategies",
          "State management, forms, validation and error boundaries",
          "Performance, Core Web Vitals, SEO and accessibility auditing",
        ],
      },
      {
        title: "Backend & Data",
        duration: "Weeks 10–14",
        topics: [
          "Node.js and FastAPI services; REST design and streaming responses",
          "PostgreSQL: modelling, indexing, transactions, query performance",
          "ORMs, migrations, caching with Redis, background jobs and queues",
          "Authentication, authorisation, OWASP Top 10 and secure secret handling",
        ],
      },
      {
        title: "Building AI Into the Product",
        duration: "Weeks 15–19",
        topics: [
          "LLM APIs, streaming UX, tool calling and structured output in a real app",
          "RAG over your application's own data with pgvector",
          "Agentic features with human approval and safe action boundaries",
          "Evaluating, rate limiting and costing AI features before you launch them",
          "AI-assisted development: real leverage from Claude Code without losing control",
        ],
      },
      {
        title: "Ship, Scale & Get Hired",
        duration: "Weeks 20–24",
        topics: [
          "Testing: unit, integration and end-to-end with Playwright",
          "Docker, CI/CD, environments and zero-downtime deploys",
          "Observability, logging and debugging production incidents",
          "System design interviews, DSA refresher, portfolio and mock interviews",
        ],
      },
    ],
    capstones: [
      "A full-featured SaaS product with authentication, payments, a database and an AI assistant — deployed and publicly accessible",
      "An open-source contribution and a portfolio site that gets you past the first screen",
    ],
  },

  {
    slug: "full-stack-with-data-science",
    title: "Full Stack with Data Science",
    shortTitle: "Full Stack with Data Science",
    code: "FSD-202",
    tagline: "Do the analysis, build the model, then ship the application around it.",
    summary:
      "Most data scientists hand over a notebook. This programme makes you the person who takes an idea from raw data through modelling to a working, deployed application that people actually use — a combination that is rare and very well paid.",
    level: "Beginner friendly",
    duration: "24 weeks",
    effort: "12–15 hrs/week",
    format: "Live cohort + project reviews",
    mode: "Classroom in Marathahalli & Live online",
    featured: false,
    accent: "amber",
    salaryRange: "₹7–26 LPA",
    roles: [
      "Data Scientist",
      "ML Engineer",
      "Full Stack Data Scientist",
      "Analytics Engineer",
      "Decision Scientist",
    ],
    audience: [
      "Graduates in engineering, statistics, maths or commerce",
      "Analysts who want to move from dashboards into modelling and products",
      "Developers adding data science depth",
    ],
    prerequisites: [
      "Comfort with school-level mathematics",
      "Basic programming exposure helps; we start Python from the ground up",
    ],
    outcomes: [
      "Write production-quality Python for data work, not just notebook scratch code",
      "Run the full statistical toolkit — EDA, inference, experiment design, causal thinking",
      "Build, tune and validate ML models, and explain them to a non-technical stakeholder",
      "Wrap models in APIs and web applications and deploy them to the cloud",
      "Communicate findings that actually change a business decision",
    ],
    tools: [
      "Python",
      "pandas & Polars",
      "NumPy",
      "scikit-learn",
      "XGBoost",
      "PyTorch",
      "SQL & PostgreSQL",
      "dbt",
      "FastAPI",
      "Streamlit",
      "React",
      "Power BI",
      "Docker",
      "MLflow",
    ],
    modules: [
      {
        title: "Python & SQL for Data",
        duration: "Weeks 1–4",
        topics: [
          "Python fundamentals through to clean, testable, modular code",
          "pandas and Polars for real-world data wrangling at scale",
          "SQL from joins to window functions and query optimisation",
          "Data cleaning, missing data strategy and reproducible pipelines",
        ],
      },
      {
        title: "Statistics & Analysis",
        duration: "Weeks 5–8",
        topics: [
          "Descriptive statistics, distributions and exploratory data analysis",
          "Hypothesis testing, confidence intervals and common statistical traps",
          "A/B testing and experiment design end to end",
          "Introduction to causal inference — correlation is still not causation",
          "Visualisation and storytelling with data",
        ],
      },
      {
        title: "Machine Learning",
        duration: "Weeks 9–14",
        topics: [
          "Regression, classification, trees and gradient boosting with XGBoost",
          "Feature engineering, leakage, cross-validation and honest evaluation",
          "Unsupervised learning: clustering, dimensionality reduction, anomaly detection",
          "Time series forecasting and recommendation systems",
          "Model interpretability with SHAP, and fairness considerations",
        ],
      },
      {
        title: "Deep Learning & Modern AI",
        duration: "Weeks 15–18",
        topics: [
          "Neural networks and PyTorch fundamentals",
          "CNNs for vision and transformers for text",
          "Transfer learning and using pretrained models effectively",
          "Practical LLM use for data science: extraction, classification, synthetic data",
        ],
      },
      {
        title: "The Full Stack Half",
        duration: "Weeks 19–24",
        topics: [
          "Serving models with FastAPI; Streamlit for rapid internal tools",
          "React and Next.js essentials for building a real front end",
          "Databases, caching and application architecture for data products",
          "Docker, cloud deployment, MLflow tracking and monitoring",
          "Capstone build, business presentation and interview preparation",
        ],
      },
    ],
    capstones: [
      "An end-to-end data product: raw data through modelling to a deployed web application with a live dashboard",
      "A business case study presented to a panel — analysis, recommendation and the numbers behind it",
    ],
  },

  {
    slug: "data-engineering-for-ai",
    title: "Data Engineering for AI",
    shortTitle: "Data Engineering for AI",
    code: "DE-303",
    tagline: "AI is only as good as the pipelines feeding it.",
    summary:
      "Build the data foundation every AI system depends on — batch and streaming pipelines, lakehouse architecture, quality gates, and the retrieval infrastructure that modern LLM applications run on.",
    level: "Intermediate",
    duration: "14 weeks",
    effort: "10 hrs/week",
    format: "Live cohort + cloud labs",
    mode: "Classroom in Marathahalli & Live online",
    featured: false,
    accent: "rose",
    salaryRange: "₹10–32 LPA",
    roles: [
      "Data Engineer",
      "Analytics Engineer",
      "Data Platform Engineer",
      "Streaming Engineer",
    ],
    audience: [
      "Developers and SQL analysts moving into data engineering",
      "ETL and warehouse professionals modernising their stack",
      "ML engineers who keep getting blocked by data problems",
    ],
    prerequisites: ["Working SQL knowledge", "Basic Python"],
    outcomes: [
      "Design and operate batch and streaming pipelines that survive real traffic",
      "Build a lakehouse with proper table formats, partitioning and time travel",
      "Enforce data quality and contracts so downstream models can be trusted",
      "Model data for analytics and for AI retrieval workloads",
      "Control cost and performance across storage, compute and orchestration",
    ],
    tools: [
      "Python",
      "SQL",
      "Apache Spark",
      "Kafka",
      "Airflow",
      "dbt",
      "Snowflake",
      "Databricks",
      "Apache Iceberg",
      "Great Expectations",
      "Terraform",
      "pgvector",
    ],
    modules: [
      {
        title: "Foundations & Modelling",
        duration: "Weeks 1–4",
        topics: [
          "Modern data architecture: warehouse, lake, lakehouse and when each fits",
          "Dimensional modelling, slowly changing dimensions and normalisation trade-offs",
          "Advanced SQL and warehouse query optimisation",
          "Python for data engineering: idempotent, testable, restartable jobs",
        ],
      },
      {
        title: "Batch Pipelines at Scale",
        duration: "Weeks 5–8",
        topics: [
          "Apache Spark: the execution model, partitions, shuffles and tuning",
          "Apache Iceberg and Delta table formats, schema evolution and time travel",
          "Airflow orchestration, backfills, dependencies and SLAs",
          "dbt for transformation, testing and documentation",
        ],
      },
      {
        title: "Streaming & Real Time",
        duration: "Weeks 9–11",
        topics: [
          "Kafka fundamentals: topics, partitions, consumer groups, delivery semantics",
          "Stream processing, windowing and late-arriving data",
          "Change data capture from operational databases",
          "Lambda and kappa architectures in practice",
        ],
      },
      {
        title: "Quality, Governance & AI Workloads",
        duration: "Weeks 12–14",
        topics: [
          "Data contracts, validation with Great Expectations, and observability",
          "Lineage, cataloguing, PII governance and access control",
          "Building ingestion and embedding pipelines for RAG systems",
          "Cost engineering, and the capstone platform build",
        ],
      },
    ],
    capstones: [
      "A production lakehouse ingesting both batch and streaming sources, with quality gates, orchestration and an analytics layer",
      "An automated document-ingestion pipeline that keeps a vector index fresh for an LLM application",
    ],
  },
];

export const getCourse = (slug: string) => courses.find((c) => c.slug === slug);
export const featuredCourses = courses.filter((c) => c.featured);

type AccentStyle = {
  text: string;
  chip: string;
  bar: string;
  dot: string;
};

export const accents: Record<Course["accent"], AccentStyle> = {
  cyan: {
    text: "text-cyan-300",
    chip: "bg-cyan-400/10 text-cyan-200 ring-cyan-400/25",
    bar: "from-cyan-400 to-sky-500",
    dot: "bg-cyan-400",
  },
  violet: {
    text: "text-violet-300",
    chip: "bg-violet-400/10 text-violet-200 ring-violet-400/25",
    bar: "from-violet-400 to-fuchsia-500",
    dot: "bg-violet-400",
  },
  emerald: {
    text: "text-emerald-300",
    chip: "bg-emerald-400/10 text-emerald-200 ring-emerald-400/25",
    bar: "from-emerald-400 to-teal-500",
    dot: "bg-emerald-400",
  },
  sky: {
    text: "text-sky-300",
    chip: "bg-sky-400/10 text-sky-200 ring-sky-400/25",
    bar: "from-sky-400 to-blue-500",
    dot: "bg-sky-400",
  },
  amber: {
    text: "text-amber-300",
    chip: "bg-amber-400/10 text-amber-200 ring-amber-400/25",
    bar: "from-amber-400 to-orange-500",
    dot: "bg-amber-400",
  },
  rose: {
    text: "text-rose-300",
    chip: "bg-rose-400/10 text-rose-200 ring-rose-400/25",
    bar: "from-rose-400 to-pink-500",
    dot: "bg-rose-400",
  },
};
