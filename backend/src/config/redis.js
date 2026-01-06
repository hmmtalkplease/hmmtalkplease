import Redis from "ioredis";

if (!process.env.REDIS_URL) {
  throw new Error("❌ REDIS_URL is not defined in environment variables");
}

const redis = new Redis(process.env.REDIS_URL);

// ✅ Connected
redis.on("connect", () => {
  console.log("✅ Connected to Company Redis");
});

// ❌ Errors
redis.on("error", (err) => {
  console.error("❌ Redis connection error:", err);
});

export default redis;
