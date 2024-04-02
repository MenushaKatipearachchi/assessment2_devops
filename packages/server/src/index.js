import fs from "fs";
import crypto from "crypto";
import express from "express";
import expressHealth from "express-health-middleware";
import compression from "compression";
import helmet from "helmet";
import cors from "cors";
import context from "express-http-context";
import stack from "callsite";
import { moduleLogger } from "@sliit-foss/module-logger";
import { correlationId } from "@app/constants";
import { errorHandler, responseInterceptor } from "@app/middleware";
import { connect as connectDatabase } from "@app/mongoose";

const initialize = ({
  service,
  routes,
  lMiddleware = [],
  cors: isCorsEnable,
  database,
  config,
}) => {
  const logger = moduleLogger("Server");

  const app = express();

  app.use(helmet());
  app.use(compression());

  app.use(express.json({ limit: "1mb" }));
  app.use(express.urlencoded({ extended: true }));

  if (isCorsEnable) {
    app.use(cors());
  }

  app.use(context.middleware);

  app.use((req, _res, next) => {
    _res.header("Access-Control-Allow-Origin", "*"); // allow front end to access the api
    _res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    context.set(
      "correlationId",
      req.headers[correlationId] ?? crypto.randomBytes(16).toString("hex")
    );
    next();
  });

  if (database) {
    connectDatabase(database);
  }

  app.use("/system", expressHealth());

  if (!routes) {
    routes = express.Router();
    const root = stack()
      .find((site) => site.getFileName().endsWith("server.js"))
      ?.getFileName()
      ?.replace("/server.js", "")
      ?.replace("\\server.js", "");
    fs.readdirSync(`${root}/modules`)?.forEach((module) => {
      fs.readdirSync(`${root}/modules/${module}/api`)?.forEach((v) => {
        routes.use(
          `/${v}/${module}`,
          require(`${root}/modules/${module}/api/${v}/controller`).default
        );
      });
    });
  }

  app.use(`/api`, ...lMiddleware, routes);

  app.use(responseInterceptor);

  app.use(errorHandler);

  // const HOST = config.HOST ?? "0.0.0.0";

  app.listen(config.PORT, () => {
    // logger.info(`${service} listening on ${HOST}:${config.PORT}`);
    logger.info(`${service} listening on ${config.PORT}`);
  });
};

export default initialize;
