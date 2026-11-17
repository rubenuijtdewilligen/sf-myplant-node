import { MyPlantClient } from "../src/index.js";
import * as fs from "fs";

const AUTH_FILE = ".myplant-auth.json";

async function runExample() {
  if (!fs.existsSync(AUTH_FILE)) {
    console.error("No token found. First run: npx tsx examples/login.ts");
    return;
  }

  const authData = JSON.parse(fs.readFileSync(AUTH_FILE, "utf-8"));
  const myplant = new MyPlantClient(undefined, authData.token);

  try {
    console.log("Fetching photo galleries...\n");
    const page = await myplant.galleries.getPage({ page: 1, perPage: 5 });

    console.log(
      `Showing page ${page.page} of ${page.totalPages} (${page.totalItems} total):\n`,
    );
    page.items.forEach((g) => {
      console.log(`- ${g.name}`);
      console.log(`  Link:    ${g.link}`);
      console.log(`  Preview: ${g.preview ?? "None"}`);
      console.log("  ---");
    });
  } catch (error) {
    console.error("Error:", error);
  }
}

runExample();
