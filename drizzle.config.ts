import { defineConfig } from "drizzle-kit";

const isTurso = !!process.env.TURSO_DATABASE_URL && !!process.env.TURSO_AUTH_TOKEN;

export default defineConfig({
  dialect: isTurso ? "turso" : "sqlite",
  schema: "./lib/db/schema.ts",
  out: "./drizzle",
  dbCredentials: isTurso
    ? {
        url: process.env.TURSO_DATABASE_URL!,
        authToken: process.env.TURSO_AUTH_TOKEN!,
      }
    : {
        url: "./local.db",
      },
});
