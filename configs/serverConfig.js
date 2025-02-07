const baseServerConfig = {
  baseUrl: "http://localhost:3000",
};

const serverConfig = {
  apiUrl: baseServerConfig.baseUrl + "/api/v1",
  ...baseServerConfig,
};

export { serverConfig };
