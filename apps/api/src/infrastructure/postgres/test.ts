import { postgres } from "@jobflow/shared"

async function main() {
  const result = await postgres.query("SELECT NOW()");
  console.log(result.rows[0]);
  process.exit(0);
}

main();