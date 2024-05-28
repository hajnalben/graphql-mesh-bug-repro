import { runQueryV1, runQueryV2 } from "./queries";

main();

async function main() {
  await runQueryV1();
  await runQueryV2();
}