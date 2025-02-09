// models/busRouteModel.js
("use strict");
const BusRoute = require("./busRoute");

const insertRoutes = async (routes) => {
  try {
    await BusRoute.bulkCreate(routes); // Insert multiple routes at once
  } catch (error) {
    console.error("Error inserting routes:", error);
    throw error;
  }
};

module.exports = { insertRoutes };
