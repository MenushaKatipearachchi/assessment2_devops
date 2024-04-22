import { Joi } from "celebrate";

export const correlationId = "x-correlation-id";
export const hostName = "x-host-name";

export const protectedRoutes = [
  "/v1/auth/login",
  "/v1/auth/register",
  "/v1/auth/refresh-token",
  "/v1/auth/verify/*",
  "/v1/system/health",
  "/v1/items",
  "/v1/reviews",
  "/v1/notification",
];

export const roles = ["admin", "seller", "buyer"].reduce((acc, role) => {
  acc[role] = role;
  return acc;
}, {});

export const cancellationStatus = ["pending", "approved", "rejected"].reduce(
  (acc, status) => {
    acc[status] = status;
    return acc;
  },
  {}
);

export const objectIdSchema = (name = "id") =>
  Joi.object({
    [name]: Joi.string().hex().length(24).required(),
  });

export const ratingParamSchema = (name = "rating") =>
  Joi.object({
    [name]: Joi.number().integer().min(1).max(5).required(),
  });
