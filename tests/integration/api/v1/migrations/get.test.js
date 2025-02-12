import { waitForAllServices, clearDatabase } from "tests/orchestrator";
import { serverConfig } from "configs/serverConfig";

beforeAll(async () => {
  await waitForAllServices();
  await clearDatabase();
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
