import express from "express";
import mongoose from "mongoose";
// import { Joi } from "celebrate";
import { celebrate, Segments } from "celebrate";
import { default as filterQuery } from "@sliit-foss/mongoose-filter-query";
import { asyncHandler } from "@sliit-foss/functions";
import { objectIdSchema } from "@app/constants";
import { ratingParamSchema } from "@app/constants";
import { toSuccess } from "@app/middleware";
import {
  serviceCreateReview,
  serviceGetReviews,
  serviceGetReviewById,
  serviceGetReviewByRating,
  serviceUpdateReviewById,
  serviceDeleteReviewById,
} from "./service";

import { createReviewSchema, updateReviewSchema } from "./schema";

const review = express.Router();

review.post(
  "/",
  celebrate({ [Segments.BODY]: createReviewSchema }),
  asyncHandler(async function controllerCreateReview(req, res) {
    const data = await serviceCreateReview(req.body);
    return toSuccess({ res, data, message: "Review created successfully!" });
  })
);

// review.get(
//   "/",
//   filterQuery,
//   asyncHandler(async function controllerGetReviews(req, res) {
//     const data = await serviceGetReviews(
//       req.query.filter,
//       req.query.sort,
//       req.query.page,
//       req.query.limit
//     );
//     return toSuccess({ res, data, message: "Reviews fetched successfully!" });
//   })
// );

review.get(
  "/",
  filterQuery,
  asyncHandler(async function controllerGetReviews(req, res) {
    const { filter, sort, page, limit } = req.query;
    const data = await serviceGetReviews(filter, sort, page, limit);
    return toSuccess({ res, data, message: "Reviews fetched successfully!" });
  })
);

review.get(
  "/:id",
  celebrate({ [Segments.PARAMS]: objectIdSchema() }),
  asyncHandler(async function controllerGetReviewById(req, res) {
    const data = await serviceGetReviewById(req.params.id);
    return toSuccess({ res, data, message: "Review fetched successfully!" });
  })
);

// get review by rating
review.get(
  "/rating/:rating",
  celebrate({ [Segments.PARAMS]: ratingParamSchema() }),
  asyncHandler(async function controllerGetReviewByRating(req, res) {
    const data = await serviceGetReviewByRating(req.params.rating);
    return toSuccess({ res, data, message: "Reviews fetched successfully!" });
  })
);

review.patch(
  "/:id",
  celebrate({
    [Segments.PARAMS]: objectIdSchema(),
    [Segments.BODY]: updateReviewSchema,
  }),
  asyncHandler(async function controllerUpdateReviewById(req, res) {
    const data = await serviceUpdateReviewById(req.params.id, req.body);
    return toSuccess({ res, data, message: "Review updated successfully!" });
  })
);

review.delete(
  "/:id",
  celebrate({ [Segments.PARAMS]: objectIdSchema() }),
  asyncHandler(async function controllerDeleteReviewById(req, res) {
    const data = await serviceDeleteReviewById(req.params.id);
    return toSuccess({ res, data, message: "Review deleted successfully!" });
  })
);

export default review;
