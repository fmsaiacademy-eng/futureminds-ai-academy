import { MongoClient, type Db, type Collection, type Document } from "mongodb";

/**
 * A single MongoClient is reused across requests.
 *
 * Serverless platforms (Vercel, Azure Functions) reuse the Node process
 * between invocations, and Next dev reloads modules on every edit. Without
 * caching on globalThis each of those would open a fresh connection pool and
 * quickly exhaust the 500-connection limit on an Atlas M0 cluster.
 */

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB || "futureminds";

declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

/** True when a connection string is configured. */
export const isDbConfigured = Boolean(uri);

function connect(): Promise<MongoClient> {
  if (!uri) {
    throw new Error(
      "MONGODB_URI is not set. Add it to .env.local (local) or your host's environment variables (production).",
    );
  }

  if (!global._mongoClientPromise) {
    const client = new MongoClient(uri, {
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 8000,
      retryWrites: true,
    });
    global._mongoClientPromise = client.connect();
  }

  return global._mongoClientPromise;
}

export async function getDb(): Promise<Db> {
  const client = await connect();
  return client.db(dbName);
}

export async function getCollection<T extends Document>(
  name: string,
): Promise<Collection<T>> {
  const db = await getDb();
  return db.collection<T>(name);
}

export const COLLECTIONS = {
  enquiries: "enquiries",
  reviews: "reviews",
} as const;
