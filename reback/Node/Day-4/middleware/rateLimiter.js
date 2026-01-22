const rateLimitStore = new Map();

const RATE_LIMIT = 10;
const WINDOW_MS = 60 * 1000;

function rateLimiter(req, res, next) {
  const ip = req.ip;
  const currentTime = Date.now();

  if (!rateLimitStore.has(ip)) {
    rateLimitStore.set(ip, {
      count: 1,
      startTime: currentTime,
    });
    return next();
  }

  const data = rateLimitStore.get(ip);

  // Reset window if time expired
  if (currentTime - data.startTime > WINDOW_MS) {
    rateLimitStore.set(ip, {
      count: 1,
      startTime: currentTime,
    });
    return next();
  }

  // Limit exceeded
  if (data.count >= RATE_LIMIT) {
    const retryAfter = Math.ceil(
      (WINDOW_MS - (currentTime - data.startTime)) / 1000
    );

    return res.status(429).json({
      success: false,
      message: "Too many requests. Please try again later.",
      retryAfter: `${retryAfter}s`,
    });
  }

  data.count++;
  rateLimitStore.set(ip, data);
  next();
}

/*  Cleanup old IPs every 5 minutes */
setInterval(() => {
  const now = Date.now();
  for (const [ip, data] of rateLimitStore.entries()) {
    if (now - data.startTime > WINDOW_MS) {
      rateLimitStore.delete(ip);
    }
  }
}, 5 * 60 * 1000);

module.exports = rateLimiter;
