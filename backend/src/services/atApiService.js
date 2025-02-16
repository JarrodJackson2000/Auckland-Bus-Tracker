const axios = require("axios");
const gtfs = require("gtfs-realtime-bindings");
require("dotenv").config();

const getRoutes = async () => {
  try {
    const response = await axios.get("https://api.at.govt.nz/gtfs/v3/routes", {
      headers: { "Ocp-Apim-Subscription-Key": process.env.AT_API_KEY },
    });
    return response.data.data; // Return only the `data` array
  } catch (error) {
    console.error("Error fetching routes:", error);
    throw error;
  }
};

const getBusLocationsByRoute = async (routeId) => {
  try {
    const response = await axios.get(
      "https://api.at.govt.nz/gtfs/v3/vehiclePositions",
      {
        headers: { "Ocp-Apim-Subscription-Key": process.env.AT_API_KEY },
        responseType: "arraybuffer", // Required for protobuf
      }
    );

    // Decode the protobuf response
    const feed = gtfs.transit_realtime.FeedMessage.decode(response.data);

    // Filter by route_id
    const filteredEntities = feed.entity.filter(
      (entity) =>
        entity.vehicle &&
        entity.vehicle.trip &&
        entity.vehicle.trip.routeId === routeId
    );

    return { entity: filteredEntities }; // Return filtered data
  } catch (error) {
    console.error("Error fetching bus locations by route:", error);
    throw error;
  }
};

module.exports = { getRoutes, getBusLocationsByRoute };
