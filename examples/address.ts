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
    console.log("Fetching Conscribo address...\n");
    const address = await myplant.address.get();

    console.log(
      `Street:      ${address.street} ${address.addition ?? ""}`.trim(),
    );
    console.log(`Postal code: ${address.postalCode}`);
    console.log(`City:        ${address.city}`);
  } catch (error) {
    console.error("Error:", error);
  }
}

runExample();
