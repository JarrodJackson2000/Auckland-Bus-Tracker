// workers/busDataWorker.js
const { getBusLocations } = require("../services/atApiService");
const {
  saveBusData,
  fetchAndSaveRoutes,
  fetchAndSaveBusLocationsByRoute,
} = require("../services/busService");
const { broadcastBusUpdate } = require("../websocket/socketServer");

const fetchAndStoreBusData = async () => {
  try {
    // Fetch all routes
    await fetchAndSaveRoutes();

    // Fetch bus locations for all routes
    const routes = await getRoutes(); // Assuming you export `getRoutes` from `atApiService`
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

// Run the worker at a fixed interval
setInterval(fetchAndStoreBusData, 10000); // Every 10 seconds
