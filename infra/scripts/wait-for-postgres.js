const { exec } = require("node:child_process");
require("dotenv").config({
  path: ".env.development",
});

let retries = 0;

function checkPostgres() {
  exec(
    `docker exec ${process.env.APP_NAME}-container-database pg_isready --host localhost`,
    handleReturn,
  );

  function handleReturn(_, output, error) {
    if (output.includes("accepting connections")) {
      console.log("\n🟢 Postgres esta aceitando conexões.");
      return;
    } else {
      process.stdout.write(".");

      if (retries > 10) {
        console.error("\n🔴 " + error);
        process.exit(1);
      }

      retries++;
      // Tenta novamente em 0.2 segundo
      setTimeout(checkPostgres, 200);
    }
  }
}

process.stdout.write("\n\n🔵 Aguardando o postgres aceitar conexões.");

checkPostgres();
