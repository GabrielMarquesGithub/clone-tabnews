import { query } from "infra/database";

async function cleanDatabase() {
  await query("drop schema public cascade; create schema public;");
}

beforeAll(cleanDatabase);

describe("GET /api/v1/migrations", () => {
  it("should return status 200 and valid response body", async () => {
    const response = await fetch("http://localhost:3000/api/v1/migrations");
    const responseBody = await response.json();

    // Status
    expect(response.status).toBe(200);

    // Body
    expect(Array.isArray(responseBody)).toBe(true);
    expect(responseBody.length).toBeGreaterThan(0);
  });
});
