import redis from "../config/redis.js";

const SESSION_TIMER_PREFIX = "session:timer:";
const SESSION_STATUS_PREFIX = "session:status:";

export const startSessionTimer = async (sessionId) => {
  try {
    const key = SESSION_TIMER_PREFIX + sessionId;
    const statusKey = SESSION_STATUS_PREFIX + sessionId;
    
    await redis.set(key, Date.now().toString());
    await redis.set(statusKey, "ACTIVE");
    
    console.log(`Session timer started: ${sessionId}`);
  } catch (error) {
    console.error("Failed to start session timer:", error);
  }
};

export const getSessionDuration = async (sessionId) => {
  try {
    const key = SESSION_TIMER_PREFIX + sessionId;
    const startTime = await redis.get(key);
    
    if (!startTime) {
      return 0;
    }
    
    const duration = Math.floor((Date.now() - parseInt(startTime)) / 1000);
    return duration;
  } catch (error) {
    console.error("Failed to get session duration:", error);
    return 0;
  }
};

export const endSessionTimer = async (sessionId) => {
  try {
    const key = SESSION_TIMER_PREFIX + sessionId;
    const statusKey = SESSION_STATUS_PREFIX + sessionId;
    
    const duration = await getSessionDuration(sessionId);
    
    await redis.del(key);
    await redis.set(statusKey, "ENDED");
    await redis.expire(statusKey, 86400);
    
    console.log(`Session timer ended: ${sessionId}, Duration: ${duration}s`);
    return duration;
  } catch (error) {
    console.error("Failed to end session timer:", error);
    return 0;
  }
};

export const isSessionActive = async (sessionId) => {
  try {
    const statusKey = SESSION_STATUS_PREFIX + sessionId;
    const status = await redis.get(statusKey);
    return status === "ACTIVE";
  } catch (error) {
    console.error("Failed to check session status:", error);
    return false;
  }
};