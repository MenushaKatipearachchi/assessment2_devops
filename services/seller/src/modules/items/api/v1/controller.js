import express from "express";
import { celebrate, Segments } from "celebrate";
import { default as filterQuery } from "@sliit-foss/mongoose-filter-query";
import { asyncHandler } from "@sliit-foss/functions";
import { objectIdSchema } from "@app/constants";
import { toSuccess } from "@app/middleware";
import {
  serviceCreateItem,
} from "./service";

import { createItemSchema, updateItemSchema } from "./schema";

const item = express.Router();

item.post(
  "/",
  celebrate({ [Segments.BODY]: createItemSchema }),
  asyncHandler(async function controllerCreateReview(req, res) {
    const data = await serviceCreateItem(req.body);
    return toSuccess({ res, data, message: "Item created successfully!" });
  })
);



export default item;
