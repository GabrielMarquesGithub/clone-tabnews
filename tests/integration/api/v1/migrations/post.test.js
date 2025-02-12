import { waitForAllServices, clearDatabase } from "tests/orchestrator";
import { serverConfig } from "configs/serverConfig";

beforeAll(async () => {
  await waitForAllServices();
  await clearDatabase();
});

describe("POST /migrations", () => {
  describe("Anonymous user", () => {
    describe("Running pending migrations", () => {
      it("For the first time", async () => {
        const response = await fetch(serverConfig.apiUrl + "/migrations", {
          method: "POST",
        });
        const responseBody = await response.json();

        expect(response.status).toBe(201);

        expect(Array.isArray(responseBody)).toBe(true);
        expect(responseBody.length).toBeGreaterThan(0);
      });
      it("For the second time", async () => {
        const response = await fetch(serverConfig.apiUrl + "/migrations", {
          method: "POST",
        });
        const responseBody = await response.json();

        expect(response.status).toBe(200);

        expect(Array.isArray(responseBody)).toBe(true);
        expect(responseBody.length).toBe(0);
      });
    });
  });
});
