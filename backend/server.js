const express = require("express");
const app = express();
require("dotenv").config();
const { fetchAndStoreBusData } = require("./src/workers/busDataWorker");

// Validate required environment variables
const requiredEnvVars = ["DB_NAME", "DB_USER", "DB_PASSWORD", "DB_HOST"];
for (const envVar of requiredEnvVars) {
  if (!process.env[envVar]) {
    console.error(`Missing required environment variable: ${envVar}`);
    process.exit(1);
  }
}

// Import and initialize the database models
const { User, BusRoute, Favourite, BusLocation } = require("./src/models");

// Call the init function to sync tables
const init = async () => {
  try {
    console.log("Syncing tables...");
    await User.sync;
    await BusRoute.sync;
    await BusLocation.sync;
    await Favourite.sync;
    console.log("All tables were created successfully.");
  } catch (error) {
    console.error("Failed to sync database:", error);
    process.exit(1);
  }
};

// Initialize the database and start the server
init().then(() => {
  // Parse requests of content-type - application/json
  app.use(express.json());

  app.get("/", (req, res) => {
    res.json({ message: "Welcome to my MySQL application." });
  });

  // Set port, listen for requests
  const PORT = process.env.PORT || 8081;

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
  });
});

setInterval(fetchAndStoreBusData, 10000); // Every 10 seconds
