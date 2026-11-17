import { MyPlantClient } from "../src/index.js";
import * as readline from "readline";
import * as fs from "fs";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const AUTH_FILE = ".myplant-auth.json";

async function runLogin() {
  const client = new MyPlantClient();

  rl.question("Email or username: ", (email) => {
    rl.question("Password: ", async (password) => {
      try {
        console.log("\nAuthenticating...");
        const authData = await client.auth.login(email.trim(), password);

        fs.writeFileSync(AUTH_FILE, JSON.stringify(authData, null, 2));
        console.log(`Logged in as ${authData.user.name}!`);
        console.log(`Tokens saved in ${AUTH_FILE}.`);
      } catch (error) {
        console.error("Login failed:", error);
      } finally {
        rl.close();
      }
    });
  });
}

runLogin();
