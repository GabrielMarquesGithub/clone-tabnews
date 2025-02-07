import { query } from "infra/database";

async function getStatus(_, response) {
  const result = await query({
    text: `
      SELECT 
        regexp_replace(version(), '^PostgreSQL ([^ ]+).*$','\\1')::text AS version,
        (SELECT setting::int FROM pg_settings WHERE name = 'max_connections') AS max_connections,
        (SELECT COUNT(*)::int FROM pg_stat_activity WHERE datname = $1) AS current_connections
    `,
    values: [process.env.DB_NAME],
  });

  const { ...rest } = result.rows[0];

  const updatedAt = new Date().toISOString();

  response.status(200).json({
    updated_at: updatedAt,
    dependencies: {
      database: { ...rest },
    },
  });
}

export default getStatus;
