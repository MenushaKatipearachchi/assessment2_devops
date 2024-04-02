import initializeServer from "@app/server";
import { defaultLimiter as rateLimiter, authorizer } from "./middleware";
import routes from "./routes";
import config from "./config";

initializeServer({
  service: "Orchestrator",
  routes,
  lMiddleware: [authorizer, rateLimiter],
  cors: true,
  config,
});
