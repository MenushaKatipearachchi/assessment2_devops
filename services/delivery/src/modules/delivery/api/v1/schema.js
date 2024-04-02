import { Joi } from "celebrate";
// import { roles } from "@app/constants";

export const createDeliverySchema = Joi.object({
  user_id: Joi.string().optional(),
  order_id: Joi.string().optional(),
  itemsPrice: Joi.number().required(),
  shippingPrice: Joi.number().required(),
  totalPrice: Joi.number().required(),
  shippingAddress: Joi.string().required(),
  status: Joi.string().required(),
});

export const updateDeliverySchema = Joi.object({
  user_id: Joi.string().optional(),
  order_id: Joi.string().optional(),
  itemsPrice: Joi.number().optional(),
  shippingPrice: Joi.number().optional(),
  totalPrice: Joi.number().optional(),
  shippingAddress: Joi.string().optional(),
  status: Joi.string().optional(),
});
