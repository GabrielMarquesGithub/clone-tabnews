import retry from "async-retry";

import { serverConfig } from "../configs/serverConfig";
import { query } from "infra/database";

async function waitForAllServices() {
  await waitForWebServer();

  async function waitForWebServer() {
    await retry(fetchStatusPage, {
      retries: 100,
      maxTimeout: 1000,
      factor: 1,
      randomize: false,
      onRetry: (error, attempt) => {
        console.error(
          `Attempt ${attempt} - Failed to fetch status page: ${error.message}`,
        );
      },
    });

    async function fetchStatusPage() {
      const response = await fetch(serverConfig.apiUrl + "/status");
      if (!response.ok) {
        throw new Error(`HTTP error status ${response.status}`);
      }
    }
  }
}

async function clearDatabase() {
  await query("drop schema public cascade; create schema public;");
}

export { waitForAllServices, clearDatabase };
