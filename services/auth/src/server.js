import initializeServer from "@app/server";
import { authorizer } from "./middleware";
import config from "./config";

initializeServer({
  service: "Auth service",
  lMiddleware: [authorizer],
  config,
});
