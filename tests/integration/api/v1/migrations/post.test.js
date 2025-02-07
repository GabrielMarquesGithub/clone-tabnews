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

describe("POST /api/v1/migrations", () => {
  it("should return status 200 and valid response body", async () => {
    const response1 = await fetch(serverConfig.apiUrl + "/migrations", {
      method: "POST",
    });
    const response1Body = await response1.json();

    // Status
    expect(response1.status).toBe(201);

    // Body
    expect(Array.isArray(response1Body)).toBe(true);
    expect(response1Body.length).toBeGreaterThan(0);

    const response2 = await fetch(serverConfig.apiUrl + "/migrations", {
      method: "POST",
    });
    const response2Body = await response2.json();

    // Status
    expect(response2.status).toBe(200);

    // Body
    expect(Array.isArray(response2Body)).toBe(true);
    expect(response2Body.length).toBe(0);
  });
});
