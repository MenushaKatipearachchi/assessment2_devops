import express from "express";
// import mongoose from "mongoose";
import { celebrate, Segments } from "celebrate";
import { default as filterQuery } from "@sliit-foss/mongoose-filter-query";
import { asyncHandler } from "@sliit-foss/functions";
import { objectIdSchema } from "@app/constants";
import { toSuccess } from "@app/middleware";
import {
  serviceCreateNotification,
  serviceGetNotifications,
  serviceGetNotificationById,
  serviceUpdateNotificationById,
  serviceDeleteNotificationById,
} from "./service";

// ----------------------------------
// serviceGetNotification,
// serviceNotificationsByUser,
// serviceUpdateNotificationRead
// ----------------------------------

import { createNotificationSchema, updateNotificationSchema } from "./schema";
/*

// FIREBASE

const admin = require('firebase-admin');
// const express = require('express');

const app = express();

// Initialize Firebase admin SDK
admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  databaseURL: 'https://distributedsystemsprojec-b662c.firebaseio.com',
});

// ----
const { celebrate, Segments, Joi } = require('celebrate');
const asyncHandler = require('express-async-handler');

app.post('/',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      token: Joi.string().required(),
      // add any other validation rules for your message object
    }),
  }),
  asyncHandler(async (req, res) => {
    const { token, ...message } = req.body;
    await admin.messaging().send({
      token,
      notification: {
        ...message,
      },
    });
    res.send('Message sent successfully');
  })
);

// -------------------

*/
const notification = express.Router();

notification.post(
  "/",
  celebrate({ [Segments.BODY]: createNotificationSchema }),
  asyncHandler(async function controllerCreateNotification(req, res) {
    const data = await serviceCreateNotification(req.body);
    return toSuccess({
      res,
      data,
      message: "Notification created successfully!",
    });
  })
);

notification.get(
  "/",
  filterQuery,
  asyncHandler(async function controllerGetNotifications(req, res) {
    const data = await serviceGetNotifications(
      req.query.filter,
      req.query.sort,
      req.query.page,
      req.query.limit
    );
    return toSuccess({
      res,
      data,
      message: "Notifications fetched successfully!",
    });
  })
);

notification.get(
  "/:id",
  celebrate({ [Segments.PARAMS]: objectIdSchema() }),
  asyncHandler(async function controllerGetNotificationById(req, res) {
    const data = await serviceGetNotificationById(req.params.id);
    return toSuccess({
      res,
      data,
      message: "Notification fetched successfully!",
    });
  })
);

notification.patch(
  "/:id",
  celebrate({
    [Segments.PARAMS]: objectIdSchema(),
    [Segments.BODY]: updateNotificationSchema,
  }),
  asyncHandler(async function controllerUpdateNotificationById(req, res) {
    const data = await serviceUpdateNotificationById(req.params.id, req.body);
    return toSuccess({
      res,
      data,
      message: "Notification updated successfully!",
    });
  })
);

notification.delete(
  "/:id",
  celebrate({ [Segments.PARAMS]: objectIdSchema() }),
  asyncHandler(async function controllerDeleteNotificationById(req, res) {
    const data = await serviceDeleteNotificationById(req.params.id);
    return toSuccess({
      res,
      data,
      message: "Notification deleted successfully!",
    });
  })
);

export default notification;
