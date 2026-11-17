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
    console.log("Fetching WUDjes...\n");
    const page = await myplant.wudjes.getPage({ page: 1, perPage: 5 });

    console.log(
      `Showing page ${page.page} of ${page.totalPages} (${page.totalItems} total):\n`,
    );
    page.items.forEach((w) => {
      console.log(`- ${w.author.name} (${w.created}):`);
      console.log(`  "${w.message}"`);
      console.log("  ---");
    });
  } catch (error) {
    console.error("Error:", error);
  }
}

runExample();
