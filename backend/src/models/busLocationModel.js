const { Sequelize } = require("sequelize");
const dbConnect = require("../../config/dbConnect"); // Corrected path
const sequelizeInstance = dbConnect.Sequelize;

const insertBusData = async (buses) => {
  try {
    await sequelizeInstance.query(
      "INSERT INTO bus_locations (busId, latitude, longitude, timestamp) VALUES ?",
      {
        replacements: [
          buses.map((bus) => [
            bus.busId,
            bus.latitude,
            bus.longitude,
            bus.timestamp,
          ]),
        ],
        type: Sequelize.QueryTypes.INSERT,
      }
    );
  } catch (error) {
    console.error("Error inserting bus data:", error);
    throw error;
  }
};

const getLatestBusData = async () => {
  try {
    const latestBusData = await sequelizeInstance.query(
      "SELECT * FROM bus_locations ORDER BY timestamp DESC LIMIT 100",
      { type: Sequelize.QueryTypes.SELECT }
    );
    return latestBusData;
  } catch (error) {
    console.error("Error fetching latest bus data:", error);
    throw error;
  }
};

module.exports = { insertBusData, getLatestBusData };
