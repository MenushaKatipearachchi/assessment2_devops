import express from "express";
import mongoose from "mongoose";
import { celebrate, Segments } from "celebrate";
import { default as filterQuery } from "@sliit-foss/mongoose-filter-query";
import { asyncHandler } from "@sliit-foss/functions";
import { objectIdSchema } from "@app/constants";
import { toSuccess } from "@app/middleware";
import {
  serviceCreatePayment,
  serviceGetPayments,
  serviceGetPaymentById,
  serviceUpdatePaymentById,
  serviceDeletePaymentById,
} from "./service";

import { createPaymentSchema, updatePaymentSchema } from "./schema";

const app = express(); // Initialize the Express app
app.set("view engine", "ejs"); // Set the view engine to EJS

const payment = express.Router();
const paypal = require("paypal-rest-sdk");

paypal.configure({
  mode: "sandbox", // sandbox or live
  client_id:
    "AcmQTWo29gmRgHYMgbXjATiVnXHi-BgrpMIPvy7hEvHgHsQIa4jmgKj4geiMhgLLH2nV4Ns5Y0_f_nv1",
  client_secret:
    "EPbPDqR49DSsW59ES8ggYq9rWn-TbPeTPVaaLmz2o4nZONXi8qLRweFKEYcZIprMylkNyjaHQRghZi4G",
});

app.post("/pay", (req, res) => {
  const create_payment_json = {
    intent: "sale",
    payer: {
      payment_method: "paypal",
    },
    redirect_urls: {
      return_url: "http://localhost:4003/api/v1/payments/success",
      cancel_url: "http://localhost:4003/api/v1/payments/cancel",
    },
    transactions: [
      {
        item_list: {
          items: [
            {
              name: "Red Sox Hat",
              sku: "001",
              price: "25.00",
              currency: "USD",
              quantity: 1,
            },
          ],
        },
        amount: {
          currency: "USD",
          total: "25.00",
        },
        description: "Hat for the best team ever",
      },
    ],
  };

  paypal.payment.create(create_payment_json, function (error, payment) {
    if (error) {
      throw error;
    } else {
      for (let index = 0; index < payment.links.length; index++) {
        if (payment.links[index].rel === "approval_url") {
          res.redirect(payment.links[index].href);
        }
      }
    }
  });
});

payment.post(
  "/",
  celebrate({ [Segments.BODY]: createPaymentSchema }),
  asyncHandler(async function controllerCreatePayment(req, res) {
    const data = await serviceCreatePayment({
      ...req.body,
      user_id: mongoose.Types.ObjectId(req.body.user_id), // convert user_id to ObjectId
    });
    return toSuccess({ res, data, message: "Payment created successfully!" });
  })
);

app.get("/paypal", (req, res) => res.render("index"));

app.get("/success", (req, res) => {
  const payerID = req.query.PayerID;
  const paymentId = req.query.paymentId;

  const execute_payment_json = {
    payer_id: payerID,
    transactions: [
      {
        amount: {
          currency: "USD",
          total: "25.00",
        },
      },
    ],
  };

  paypal.payment.execute(
    paymentId,
    execute_payment_json,
    function (error, payment) {
      if (error) {
        console.log(error.response);
        throw error;
      } else {
        console.log(JSON.stringify(payment));
        res.send("Success");
      }
    }
  );
});

app.get("/cancel", (req, res) => res.send("Cancelled"));

payment.get(
  "/",
  filterQuery,
  asyncHandler(async function controllerGetPayments(req, res) {
    const data = await serviceGetPayments(
      req.query.filter,
      req.query.sort,
      req.query.page,
      req.query.limit
    );
    return toSuccess({ res, data, message: "Payments fetched successfully!" });
  })
);

payment.get(
  "/:id",
  celebrate({ [Segments.PARAMS]: objectIdSchema() }),
  asyncHandler(async function controllerGetPaymentById(req, res) {
    const data = await serviceGetPaymentById(req.params.id);
    return toSuccess({ res, data, message: "Payment fetched successfully!" });
  })
);

payment.patch(
  "/:id",
  celebrate({
    [Segments.PARAMS]: objectIdSchema(),
    [Segments.BODY]: updatePaymentSchema,
  }),
  asyncHandler(async function controllerUpdatePaymentById(req, res) {
    const data = await serviceUpdatePaymentById(req.params.id, req.body);
    return toSuccess({ res, data, message: "Payment updated successfully!" });
  })
);

payment.delete(
  "/:id",
  celebrate({ [Segments.PARAMS]: objectIdSchema() }),
  asyncHandler(async function controllerDeletePaymentById(req, res) {
    const data = await serviceDeletePaymentById(req.params.id);
    return toSuccess({ res, data, message: "Payment deleted successfully!" });
  })
);

app.use(payment); // Mount the payment router on the Express app

export default app;
