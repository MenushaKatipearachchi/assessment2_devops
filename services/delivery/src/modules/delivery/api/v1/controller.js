import express from "express";
// import mongoose from "mongoose";
import { celebrate, Segments } from "celebrate";
import { default as filterQuery } from "@sliit-foss/mongoose-filter-query";
import { asyncHandler } from "@sliit-foss/functions";
import { objectIdSchema } from "@app/constants";
import { toSuccess } from "@app/middleware";
import {
  serviceCreateDelivery,
  serviceGetDeliveries,
  serviceGetDeliveryById,
  serviceUpdateDeliveryById,
  serviceDeleteDeliveryById,
} from "./service";

import { createDeliverySchema, updateDeliverySchema } from "./schema";

const delivery = express.Router();

delivery.post(
  "/",
  celebrate({ [Segments.BODY]: createDeliverySchema }),
  asyncHandler(async function controllerCreateDelivery(req, res) {
    const data = await serviceCreateDelivery(req.body);
    return toSuccess({
      res,
      data,
      message: "Delivery created successfully!",
    });
  })
);

delivery.get(
  "/",
  filterQuery,
  asyncHandler(async function controllerGetDeliveries(req, res) {
    const data = await serviceGetDeliveries(
      req.query.filter,
      req.query.sort,
      req.query.page,
      req.query.limit
    );
    return toSuccess({ res, data, message: "Deliverys fetched successfully!" });
  })
);

// delivery.get(
//   "/:id",
//   celebrate({ [Segments.PARAMS]: objectIdSchema() }),
//   asyncHandler(async function controllerGetDeliveryById(req, res) {
//     const data = await serviceGetDeliveryById(req.params.id);
//     return toSuccess({ res, data, message: "Delivery fetched successfully!" });
//   })
// );

delivery.get(
  "/:id",
  celebrate({ [Segments.PARAMS]: objectIdSchema() }),
  asyncHandler(async function controllerGetDeliveryById(req, res) {
    const data = await serviceGetDeliveryById(req.params.id);
    if (!data) {
      // Handle the case where the delivery with the provided ID is not found
      return res.status(404).json({ message: "Delivery not found" });
    }
    return res.json({ data, message: "Delivery fetched successfully!" });
  })
);

delivery.patch(
  "/:id",
  celebrate({
    [Segments.PARAMS]: objectIdSchema(),
    [Segments.BODY]: updateDeliverySchema,
  }),
  asyncHandler(async function controllerUpdateDeliveryById(req, res) {
    const data = await serviceUpdateDeliveryById(req.params.id, req.body);
    return toSuccess({ res, data, message: "Delivery updated successfully!" });
  })
);

delivery.delete(
  "/:id",
  celebrate({ [Segments.PARAMS]: objectIdSchema() }),
  asyncHandler(async function controllerDeleteDeliveryById(req, res) {
    const data = await serviceDeleteDeliveryById(req.params.id);
    return toSuccess({ res, data, message: "Delivery deleted successfully!" });
  })
);

export default delivery;
