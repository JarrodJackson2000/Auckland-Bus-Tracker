const { Sequelize } = require("sequelize");
const dbConnect = require("../../config/dbConnect"); // Corrected path
const sequelizeInstance = dbConnect.Sequelize;

const insertRoute = async (routes) => {
  try {
    // Map the routes to the correct format for the database
    const routeData = routes.map((route) => [
      route.id, // routeId
      route.attributes.route_long_name || route.attributes.route_short_name, // routeName
    ]);

    await sequelizeInstance.query(
      "INSERT INTO bus_routes (routeId, routeName) VALUES ?",
      {
        replacements: [routeData], // Pass the mapped data
        type: Sequelize.QueryTypes.INSERT,
      }
    );
    console.log("Routes inserted successfully.");
  } catch (error) {
    console.error("Error inserting route data:", error);
    throw error;
  }
};

module.exports = { insertRoute };
