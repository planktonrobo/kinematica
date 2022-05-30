// server/index.js

const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 3001;
const http = require("http");

const app = express();
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, "../client/build")));

// Handle GET requests to /api route
app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});

// All other GET requests not handled before will return our React app
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
});

io.on("connection", (client) => {
  client.on("angleState", handleUpdateAngles);

  function handleUpdateAngles(angles) {
    client.emit("angleState", { data: angles });
  }

  setTimeout(() => {
    client.emit("angleState", { data: [0.17020068, -0.78000531, 0.01241211, -0.22135256, 0.8383028, 0] });
  }, 100);
  
});

function startInterval(client, state) {
  const intervalId = setInterval(() => {
    client.emit("angleState", { data: "" });
    clearInterval(intervalId);
  }, 1000 / 60); // 60 = frame rate;
}

server.listen(PORT, () => {
  console.log("Connected to PORT");
});

// app.listen(PORT);
