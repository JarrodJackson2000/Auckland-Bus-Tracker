// services/busService.js
const { insertBusData } = require("../models/busLocationModel");
const {
  getRoutes,
  getBusLocationsByRoute,
} = require("../services/atApiService");

const saveBusData = async (busData) => {
  try {
    const buses = busData.entity
      .filter((entity) => entity.vehicle && entity.vehicle.position)
      .map((entity) => ({
        busId: entity.vehicle.vehicle.id,
        latitude: entity.vehicle.position.latitude,
        longitude: entity.vehicle.position.longitude,
        timestamp: new Date(entity.vehicle.timestamp * 1000),
      }));

    await insertBusData(buses); // Insert into the `bus_locations` table
    console.log("Bus data saved to database");
  } catch (error) {
    console.error("Error saving bus data:", error);
    throw error;
  }
};

const fetchAndSaveRoutes = async () => {
  try {
    const routes = await getRoutes();
    console.log("Fetched routes:", routes);
    // Save routes to the database (if needed)
    // You can create a function in `busRouteModel.js` to save routes
  } catch (error) {
    console.error("Error fetching routes:", error);
    throw error;
  }
};

const fetchAndSaveBusLocationsByRoute = async (routeId) => {
  try {
    const busData = await getBusLocationsByRoute(routeId);
    await saveBusData(busData);
    console.log(`Bus data for route ${routeId} saved to database`);
  } catch (error) {
    console.error(`Error fetching bus locations for route ${routeId}:`, error);
    throw error;
  }
};

module.exports = {
  saveBusData,
  fetchAndSaveRoutes,
  fetchAndSaveBusLocationsByRoute,
};
