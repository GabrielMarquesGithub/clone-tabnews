let response;
let responseBody;
let responseDatabase;

beforeAll(async () => {
  response = await fetch("http://localhost:3000/api/v1/status");
  responseBody = await response.json();
  responseDatabase = responseBody.dependencies.database;
});

describe("GET /api/v1/status", () => {
  it("should return status 200 and valid response body", () => {
    // Status
    expect(response.status).toBe(200);

    // Updated at
    expect(responseBody).toHaveProperty("updated_at");
    const updatedAt = new Date(responseBody.updated_at);
    expect(updatedAt.toISOString()).toBe(responseBody.updated_at);

    // Database
    expect(responseDatabase).toHaveProperty("version");
    expect(responseDatabase.version).toEqual("16.0");

    expect(responseDatabase).toHaveProperty("max_connections");
    expect(typeof responseDatabase.max_connections).toBe("number");
    expect(responseDatabase.max_connections).toBeGreaterThan(0);

    expect(responseDatabase).toHaveProperty("current_connections");
    expect(typeof responseDatabase.current_connections).toBe("number");
    expect(responseDatabase.current_connections).toEqual(1);

    console.log(responseDatabase);
  });
});
