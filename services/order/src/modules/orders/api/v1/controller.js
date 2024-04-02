import express from "express";
import { celebrate, Segments } from "celebrate";
import { default as filterQuery } from "@sliit-foss/mongoose-filter-query";
import { asyncHandler } from "@sliit-foss/functions";
import { objectIdSchema } from "@app/constants";
import { toSuccess } from "@app/middleware";
import {
  serviceCreateOrder,
  serviceGetOrder,
  serviceGetAllOrders,
  serviceGetOrdersByBuyer,
  serviceGetOrdersBySeller,
  serviceUpdateOrderDeliveryStatus,
  serviceUpdateOrderPaymentStatus,
  serviceCancelOrder,
  // eslint-disable-next-line no-unused-vars
  serviceRefundOrder,
} from "./service";

import {
  createOrderSchema,
  updateOrderDeliveryStatusSchema,
  updateOrderPaymentStatusSchema,
} from "./schema";

const order = express.Router();

order.post(
  "/",

  celebrate({ [Segments.BODY]: createOrderSchema }),

  asyncHandler(async function controllerCreateOrder(req, res) {
    console.log("req.body", req.body);
    const data = await serviceCreateOrder(req.body);
    return toSuccess({ res, data, message: "User created successfully!" });
  })
);

order.get(
  "/",
  filterQuery,
  asyncHandler(async function controllerGetAllOrders(req, res) {
    const data = await serviceGetAllOrders(
      req.query.filter,
      req.query.sort,
      req.query.page,
      req.query.limit
    );

    return toSuccess({ res, data, message: "Orders fetched successfully!" });
  })
);

order.get(
  "/:id",
  celebrate({ [Segments.PARAMS]: objectIdSchema() }),
  asyncHandler(async function controllerGetOrder(req, res) {
    const data = await serviceGetOrder(req.params.id);
    return toSuccess({ res, data, message: "Order fetched successfully!" });
  })
);

order.get(
  "/buyer/:id",
  celebrate({ [Segments.PARAMS]: objectIdSchema() }),
  filterQuery,
  asyncHandler(async function controllerGetOrdersByBuyer(req, res) {
    const data = await serviceGetOrdersByBuyer(
      req.params.id,
      req.query.filter,
      req.query.sort,
      req.query.page,
      req.query.limit
    );
    return toSuccess({ res, data, message: "Orders fetched successfully!" });
  })
);

order.get(
  "/seller/:id",
  celebrate({ [Segments.PARAMS]: objectIdSchema() }),
  filterQuery,
  asyncHandler(async function controllerGetOrdersBySeller(req, res) {
    const data = await serviceGetOrdersBySeller(
      req.params.id,
      req.query.filter,
      req.query.sort,
      req.query.page,
      req.query.limit
    );
    return toSuccess({ res, data, message: "Orders fetched successfully!" });
  })
);

order.patch(
  "/:id/delivery-status",
  celebrate({
    [Segments.PARAMS]: objectIdSchema(),
    [Segments.BODY]: updateOrderDeliveryStatusSchema,
  }),
  asyncHandler(async function controllerUpdateOrderDeliveryStatus(req, res) {
    const data = await serviceUpdateOrderDeliveryStatus(
      req.params.id,
      req.body.status
    );

    return toSuccess({
      res,
      data,
      message: "Order delivery status updated successfully!",
    });
  })
);

order.patch(
  "/:id/payment-status",
  celebrate({
    [Segments.PARAMS]: objectIdSchema(),
    [Segments.BODY]: updateOrderPaymentStatusSchema,
  }),
  asyncHandler(async function controllerUpdateOrderPaymentStatus(req, res) {
    const data = await serviceUpdateOrderPaymentStatus(
      req.params.id,
      req.body.isPaid
    );

    return toSuccess({
      res,
      data,
      message: "Order payment status updated successfully!",
    });
  })
);

order.patch(
  "/:id/cancel",
  celebrate({ [Segments.PARAMS]: objectIdSchema() }),
  asyncHandler(async function controllerCancelOrder(req, res) {
    const data = await serviceCancelOrder(
      req.params.id,
      req.body.productId,
      req.body.reason
    );

    return toSuccess({
      res,
      data,
      message: "Order cancellation request executed successfully!",
    });
  })
);

export default order;
