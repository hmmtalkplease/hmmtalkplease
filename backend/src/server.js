import "dotenv/config";
import http from "http";

import app from "./app.js";
import redis from "./config/redis.js";

// OPTIONAL: sockets later
// import { initSockets } from "./sockets/index.js";

const PORT = process.env.PORT || 5000;

// Create HTTP server (future-ready for sockets)
const server = http.createServer(app);

// Redis health check (NON-BLOCKING)
redis
  .set("health:redis", "ok")
  .then(() => redis.get("health:redis"))
  .then(value => console.log("🟢 Redis Health:", value))
  .catch(err => console.error("🔴 Redis Error:", err.message));

// Start server
server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
