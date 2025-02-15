import { waitForAllServices, apiUrl } from "tests/orchestrator";

beforeAll(async () => {
  await waitForAllServices();
});

describe("POST /status", () => {
  describe("Anonymous user", () => {
    it("Getting current system status", async () => {
      const response = await fetch(apiUrl + "/status", { method: "POST" });
      const responseBody = await response.json();

      expect(response.status).toBe(405);

      expect(responseBody).toEqual({
        name: "MethodNotAllowedError",
        message: "Método não permitido para este endpoint.",
        action: "Verifique se o método HTTP está correto.",
        status_code: 405,
      });
    });
  });
});
