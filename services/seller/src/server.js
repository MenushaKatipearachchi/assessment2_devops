import initializeServer from "@app/server";
import config from "./config";

initializeServer({
  service: "Seller service",
  database: true,
  cors: true,
  config,
});
