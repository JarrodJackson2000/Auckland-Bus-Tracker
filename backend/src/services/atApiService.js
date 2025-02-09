// services/atApiService.js
const axios = require("axios");
const gtfs = require("gtfs-realtime-bindings");
require("dotenv").config();

const getBusLocationsByRoute = async (routeId) => {
  try {
    const response = await axios.get(
      "https://api.at.govt.nz/realtime/gtfs-realtime/trip-updates",
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
        entity.tripUpdate && entity.tripUpdate.trip.routeId === routeId
    );

    return { entity: filteredEntities }; // Return filtered data
  } catch (error) {
    console.error("Error fetching bus locations by route:", error);
    throw error;
  }
};

module.exports = { getBusLocations, getRoutes, getBusLocationsByRoute };
