import express from "express";
import serviceConnector from "@sliit-foss/service-connector";
import { tracedAsyncHandler } from "@sliit-foss/functions";
import { serviceHosts } from "../constants";
//  eslint-disable-next-line no-unused-vars
import { permittedRoles } from "../../../middleware";
import { routeGuards } from "./middleware";

const orchestrator = express.Router();

const connector = serviceConnector({ service: "Proxy" });

orchestrator.all(
  "/:api_version/:module*",
  tracedAsyncHandler(function attachMiddleware(req, res, next) {
    switch (req.params.module) {
      case "users":
        return routeGuards[req.params.module](req, res, next);
      case "emails":
        return permittedRoles(["admin", "seller"])(req, res, next);
      default:
        return;
    }
  })
);

orchestrator.all(
  "/:api_version/:module*",
  tracedAsyncHandler(function redirect(req, res) {
    return connector.proxy(serviceHosts[req.params.module], req, res);
  })
);

export default orchestrator;
