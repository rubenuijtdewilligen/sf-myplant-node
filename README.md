# 🌱 sf-myplant

A TypeScript-first Node.js client for the Semper Florens MyPlant API.

[![License: GPL-3.0](https://img.shields.io/badge/License-GPL--3.0-blue.svg)](LICENSE)
[![npm version](https://img.shields.io/npm/v/sf-myplant.svg)](https://www.npmjs.com/package/sf-myplant)

## Installation

```bash
npm install sf-myplant
```

## Quick Start

### 1. Authentication

Authenticate with your MyPlant email address or username to retrieve a JWT token.

```TypeScript
import { MyPlantClient } from "sf-myplant";

const myplant = new MyPlantClient();

const { token, user } = await myplant.auth.login("your@email.com", "your-password");
console.log(`Logged in as ${user.name}!`);
```

### 2. Fetching Activities

Retrieve upcoming activities and inspect specific activity details or participants.

```TypeScript
import { MyPlantClient } from "sf-myplant";

const myplant = new MyPlantClient("https://semper-florens.nl/api", "YOUR_ACCESS_TOKEN");

// Fetch all upcoming activities
const activities = await myplant.activities.getAll();
const latest = activities[0];

// Fetch full details, form questions, and participants for an activity
const details = await myplant.activities.getById(latest.id);
console.log(details.participants);
```

Examples for all other endpoints can be found in [/examples](/examples/).

## Drop-in Replacement for my-plant-api-client

`sf-myplant` exposes the exact same default export and top-level method names as [bastiaanno/my-plant-api-client](https://github.com/bastiaanno/my-plant-api-client):

```TypeScript
import MyPlantClient from "sf-myplant";

const client = new MyPlantClient();
await client.login("username", "password");

const activities = await client.getActivities();
const wudjes = await client.getWudjes();
```

## License

GPL 3.0 or later
