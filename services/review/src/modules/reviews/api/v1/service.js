import {
  createReview,
  getAllReviews,
  getReviewById,
  getReviewByRating,
  updateReviewById,
  deleteReviewById,
} from "../../repository";

// import { hashPasswordIfProvided } from "./helpers";

export const serviceCreateReview = (review) => {
  // if (!review.rating) throw new Error("Rating is required");
  // await hashPasswordIfProvided(review);
  return createReview(review);
};

export const serviceGetReviews = (filters, sorts, page, limit) => {
  return getAllReviews({ filters, sorts, page, limit });
};

export const serviceGetReviewById = (id) => {
  return getReviewById(id);
};

export const serviceGetReviewByRating = (rating) => {
  return getReviewByRating(rating);
};

export const serviceUpdateReviewById = (id, data) => {
  // await hashPasswordIfProvided(data);
  return updateReviewById(id, data);
};

export const serviceDeleteReviewById = (id) => {
  return deleteReviewById(id);
};
