import migrationRunner from "node-pg-migrate";
import { resolve } from "node:path";
import { createRouter } from "next-connect";

import { getNewClient } from "infra/database";
import { errorMiddleware } from "infra/middlewares";

const router = createRouter();

router.get(getHandler).post(getHandler);

export default router.handler(errorMiddleware);

async function getHandler(request, response) {
  const allowedMethods = ["GET", "POST"];

  if (!allowedMethods.includes(request.method)) {
    return response.status(405).end();
  }

  let dbClient;

  try {
    dbClient = await getNewClient();

    const migrationRunnerConfig = {
      dbClient,
      databaseUrl: process.env.DATABASE_URL,
      dir: resolve("infra", "migrations"),
      direction: "up",
      migrationsTable: "pgmigrations",
      verbose: true,
    };

    if (request.method === "GET") {
      const pendingMigrations = await migrationRunner({
        ...migrationRunnerConfig,
        dryRun: true,
      });

      await dbClient.end();

      return response.status(200).json(pendingMigrations);
    }

    if (request.method === "POST") {
      const migratedMigrations = await migrationRunner({
        ...migrationRunnerConfig,
        dryRun: false,
      });

      await dbClient.end();

      // Se existir migrations executadas, retornar 201
      if (migratedMigrations.length > 0) {
        return response.status(201).json(migratedMigrations);
      }

      return response.status(200).json(migratedMigrations);
    }
  } catch (error) {
    console.error(error);
    throw error;
  } finally {
    if (dbClient) {
      await dbClient.end();
    }
  }
}
