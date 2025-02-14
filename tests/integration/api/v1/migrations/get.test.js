import { waitForAllServices, clearDatabase, apiUrl } from "tests/orchestrator";

beforeAll(async () => {
  await waitForAllServices();
  await clearDatabase();
});

describe("GET /migrations", () => {
  describe("Anonymous user", () => {
    it("Getting pending migrations", async () => {
      const response = await fetch(apiUrl + "/migrations");
      const responseBody = await response.json();

      expect(response.status).toBe(200);

      expect(Array.isArray(responseBody)).toBe(true);
      expect(responseBody.length).toBeGreaterThan(0);
    });
  });
});
