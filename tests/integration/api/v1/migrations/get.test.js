import { query } from "infra/database";
import { waitForAllServices } from "tests/orchestrator";
import { serverConfig } from "configs/serverConfig";

async function cleanDatabase() {
  await query("drop schema public cascade; create schema public;");
}

beforeAll(async () => {
  await waitForAllServices();
  await cleanDatabase();
});

describe("GET /migrations", () => {
  describe("Anonymous user", () => {
    it("Getting pending migrations", async () => {
      const response = await fetch(serverConfig.apiUrl + "/migrations");
      const responseBody = await response.json();

      expect(response.status).toBe(200);

      expect(Array.isArray(responseBody)).toBe(true);
      expect(responseBody.length).toBeGreaterThan(0);
    });
  });
});
