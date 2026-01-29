import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";
import * as schema from "./schema";

const getDatabaseConfig = () => {
  const tursoUrl = process.env.TURSO_DATABASE_URL;
  const tursoAuthToken = process.env.TURSO_AUTH_TOKEN;

  // Use Turso if environment variables are set
  if (tursoUrl && tursoAuthToken) {
    return {
      url: tursoUrl,
      authToken: tursoAuthToken,
    };
  }

  // Fallback to local SQLite for development
  if (process.env.NODE_ENV === "production") {
    throw new Error(
      "TURSO_DATABASE_URL and TURSO_AUTH_TOKEN must be set in production"
    );
  }

  return {
    url: "file:local.db",
  };
};

const config = getDatabaseConfig();
const client = createClient(config);
export const db = drizzle(client, { schema });
