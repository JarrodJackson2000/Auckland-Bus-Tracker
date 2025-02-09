"use strict";
const User = require("./user");
const BusRoute = require("./busRoute");
const Favourite = require("./favourite");
const BusLocation = require("./busLocation");

// Sync tables

async function init() {
  try {
    console.log("Syncing tables...");
    // Sync tables in the correct order to respect foreign key constraints
    await User.sync;
    await BusRoute.sync;
    await Favourite.sync;
    await BusLocation.sync;

    console.log("All tables were created successfully.");
  } catch (error) {
    console.error("Failed to sync database:", error);
  }
}

init();

module.exports = { User, BusRoute, Favourite, BusLocation };
