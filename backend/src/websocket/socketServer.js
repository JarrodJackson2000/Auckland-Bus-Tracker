const http = require("http");
const socketIo = require("socket.io");
const { getLatestBusData } = require("../models/busLocationModel");

const server = http.createServer();
const io = socketIo(server);

io.on("connection", (socket) => {
  console.log("A client connected");

  // Send initial bus data to the client
  const sendInitialData = async () => {
    const buses = await getLatestBusData();
    socket.emit("initial-data", buses);
  };

  sendInitialData();

  socket.on("disconnect", () => {
    console.log("A client disconnected");
  });
});

const broadcastBusUpdate = (busData) => {
  io.emit("bus-update", busData);
};

// Start the server
const PORT = process.env.SOCKET_PORT || 3002;
server.listen(PORT, () => {
  console.log(`WebSocket server running on port ${PORT}`);
});

module.exports = { server, broadcastBusUpdate };
