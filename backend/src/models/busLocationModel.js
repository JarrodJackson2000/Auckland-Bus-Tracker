// models/busLocationModel.js
const BusLocation = require("./busLocation");

const insertBusData = async (buses) => {
  try {
    await BusLocation.bulkCreate(buses); // Insert multiple records at once
  } catch (error) {
    console.error("Error inserting bus data:", error);
    throw error;
  }
};

module.exports = { insertBusData };
