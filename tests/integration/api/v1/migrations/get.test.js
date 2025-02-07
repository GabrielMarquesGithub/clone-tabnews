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

describe("GET /api/v1/migrations", () => {
  it("should return status 200 and valid response body", async () => {
    const response = await fetch(serverConfig.apiUrl + "/migrations");
    const responseBody = await response.json();

    // Status
    expect(response.status).toBe(200);

    // Body
    expect(Array.isArray(responseBody)).toBe(true);
    expect(responseBody.length).toBeGreaterThan(0);
  });
});
