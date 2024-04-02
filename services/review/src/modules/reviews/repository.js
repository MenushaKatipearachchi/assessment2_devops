import { Review } from "./api/v1/models";

export function createReview(review) {
  return Review.create(review);
}

export function getReviewByRating(rating) {
  return Review.find({ rating }).lean().populate("item");
}

export function getReviewById(id) {
  return Review.findById(id).lean();
}

export function getReviewsByProductId(productId) {
  return Review.find({ productId }).lean();
}

export function getAllReviews({ filters = {}, sorts = {}, page, limit }) {
  if (page && limit) {
    return Review.paginate(filters, {
      page,
      limit,
      sorts,
      lean: true,
    });
  }
  return Review.find(filters).sort(sorts).lean().populate("item").populate("user");
}

export function updateReviewById(id, data) {
  return Review.findByIdAndUpdate(id, data, { new: true }).lean();
}

export function deleteReviewById(id) {
  return Review.findByIdAndDelete(id).lean();
}
