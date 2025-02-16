const { getBusLocations, getRoutes } = require("../services/atApiService");
const {
  saveBusData,
  fetchAndSaveRoutes,
  fetchAndSaveBusLocationsByRoute,
} = require("../services/busService");
const { broadcastBusUpdate } = require("../websocket/socketServer");

const fetchAndStoreBusData = async () => {
  try {
    console.log("Running bus data worker...");
    // Fetch all routes
    await fetchAndSaveRoutes();

    // Fetch bus locations for all routes
    const routes = await getRoutes();
    for (const route of routes) {
      await fetchAndSaveBusLocationsByRoute(route.route_id);
    }

    // Optionally, fetch all bus locations (if needed)
    const busData = await getBusLocations();
    await saveBusData(busData);
    broadcastBusUpdate(busData);
  } catch (error) {
    console.error("Error in worker:", error);
  }
};

exports.fetchAndStoreBusData = fetchAndStoreBusData;
