import rateLimit from "express-rate-limit";

const options = {
  windowMs: 1 * 60 * 1000,
  standardHeaders: true,
  legacyHeaders: false,
  max: 1000000,
  message: (_req, res) =>
    res.status(429).json({
      message: `Too many requests`,
    }),
};

export const defaultLimiter = rateLimit(options);
