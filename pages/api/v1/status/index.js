import { query } from "../../../../infra/database";

const status = async (request, response) => {
  const result = await query("SELECT 1 + 1 AS sum;");
  console.log(result);
  response.status(200).json({
    status: "ok2",
  });
};

export default status;
