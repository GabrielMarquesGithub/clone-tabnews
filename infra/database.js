import { Client } from "pg";

async function query(queryObj) {
  let client;

  try {
    client = await getNewClient();
    const result = await client.query(queryObj);
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  } finally {
    if (client instanceof Client) {
      await client.end();
    }
  }
}

async function getNewClient() {
  const client = new Client({
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    ssl: getSSLValues(),
  });

  await client.connect();
  return client;
}

function getSSLValues() {
  if (process.env.DB_CA) {
    return {
      ca: process.env.DB_CA,
    };
  }
  return process.env.NODE_ENV === "production";
}

export { query, getNewClient };
