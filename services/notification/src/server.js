import initializeServer from "@app/server";
import config from "./config";

initializeServer({
  service: "Notification service",
  database: true,
  cors: true,
  config,
});
