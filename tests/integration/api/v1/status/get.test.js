import { waitForAllServices } from "tests/orchestrator";
import { serverConfig } from "configs/serverConfig";

beforeAll(async () => {
  await waitForAllServices();
});

describe("GET /status", () => {
  describe("Anonymous user", () => {
    it("Getting current system status", async () => {
      const response = await fetch(serverConfig.apiUrl + "/status");
      const responseBody = await response.json();
      const responseDatabase = responseBody.dependencies.database;

      expect(response.status).toBe(200);

      expect(responseBody).toHaveProperty("updated_at");
      const updatedAt = new Date(responseBody.updated_at);
      expect(updatedAt.toISOString()).toBe(responseBody.updated_at);

      expect(responseDatabase).toHaveProperty("version");
      expect(responseDatabase.version).toEqual("16.0");

      expect(responseDatabase).toHaveProperty("max_connections");
      expect(typeof responseDatabase.max_connections).toBe("number");
      expect(responseDatabase.max_connections).toBeGreaterThan(0);

      expect(responseDatabase).toHaveProperty("current_connections");
      expect(typeof responseDatabase.current_connections).toBe("number");
      expect(responseDatabase.current_connections).toEqual(1);
    });
  });
});
