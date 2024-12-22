import { Client } from "pg";

const query = async (queryObj) => {
  const client = new Client({
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
  });

  await client.connect();
  const result = await client.query(queryObj);
  await client.end();
  return result;
};

export { query };
