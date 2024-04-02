import { Joi } from "celebrate";

export const createReviewSchema = Joi.object({
  item: Joi.string().optional(), // needs to integrate with item id in items collection
  user: Joi.string().optional(),  // needs to integrate with user id in users collection
  rating: Joi.number().required(),
  text: Joi.string().required(),
});

export const updateReviewSchema = Joi.object({
  rating: Joi.number().optional(),
  text: Joi.string().optional(),
});
