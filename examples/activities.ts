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
    console.log("Fetching upcoming activities...\n");
    const activities = await myplant.activities.getAll();

    if (activities.length === 0) {
      console.log("No upcoming activities found.");
      return;
    }

    activities.forEach((a) => {
      console.log(`- [${a.id}] ${a.title} (${a.committee})`);
      console.log(`  Venue: ${a.venue} | Start: ${a.startTime}`);
      console.log(`  Signed up: ${a.userStatus.signedUp ? "Yes" : "No"}`);
      console.log("  ---");
    });

    const first = activities[0];
    if (first) {
      console.log(`\nFetching details for "${first.title}"...`);
      const detail = await myplant.activities.getById(first.id);
      console.log(`Participants: ${detail.participants.length}`);
      console.log(`Form questions: ${detail.form.length}`);
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

runExample();
