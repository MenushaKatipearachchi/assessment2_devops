import { Joi } from "celebrate";
import { cancellationStatus } from "@app/constants";

export const createOrderSchema = Joi.object({
  buyer: Joi.string().length(24).hex().required(),
  products: Joi.array().items(
    Joi.object({
      product: Joi.string().length(24).hex().required(),
      quantity: Joi.number().required(),
      cancellationDetails: Joi.object({
        isRequested: Joi.boolean().optional(),
        reason: Joi.string().optional(),
        status: Joi.string()
          .valid(...Object.values(cancellationStatus))
          .optional(),
        isRefunded: Joi.boolean().optional(),
        refundAmount: Joi.number().optional(),
        refundDate: Joi.date().optional(),
      }),
    })
  ),
  shippingAddress: Joi.string().required(),
  paymentMethod: Joi.string().required(),
  paymentResult: Joi.object({
    id: Joi.string().optional(),
    status: Joi.string().optional(),
    update_time: Joi.string().optional(),
    email_address: Joi.string().optional(),
  }),
  itemsPrice: Joi.number().required(),
  shippingPrice: Joi.number().required(),
  totalPrice: Joi.number().required(),
  commission: Joi.number().required(),
  isPaid: Joi.boolean().optional(),
  paidAt: Joi.date().optional(),
  status: Joi.string().optional(),
  isDelivered: Joi.boolean().optional(),
  deliveredAt: Joi.date().optional(),
});

export const updateOrderDeliveryStatusSchema = Joi.object({
  buyer: Joi.string().optional(),
  products: Joi.array().items(
    Joi.object({
      product: Joi.string().optional(),
      quantity: Joi.number().optional(),
      cancellationDetails: Joi.object({
        isRequested: Joi.boolean().optional(),
        reason: Joi.string().optional(),
        status: Joi.string().optional(),
        isRefunded: Joi.boolean().optional(),
        refundAmount: Joi.number().optional(),
        refundDate: Joi.date().optional(),
      }),
    })
  ),
  shippingAddress: Joi.string().optional(),
  paymentMethod: Joi.string().optional(),
  paymentResult: Joi.object({
    id: Joi.string().optional(),
    status: Joi.string().optional(),
    update_time: Joi.string().optional(),
    email_address: Joi.string().optional(),
  }),
  itemsPrice: Joi.number().optional(),
  shippingPrice: Joi.number().optional(),
  totalPrice: Joi.number().optional(),
  commission: Joi.number().optional(),
  isPaid: Joi.boolean().optional(),
  paidAt: Joi.date().optional(),
  status: Joi.string().required(),
  isDelivered: Joi.boolean().optional(),
  deliveredAt: Joi.date().optional(),
});

export const updateOrderPaymentStatusSchema = Joi.object({
  buyer: Joi.string().optional(),
  products: Joi.array().items(
    Joi.object({
      product: Joi.string().optional(),
      quantity: Joi.number().optional(),
      cancellationDetails: Joi.object({
        isRequested: Joi.boolean().optional(),
        reason: Joi.string().optional(),
        status: Joi.string().optional(),
        isRefunded: Joi.boolean().optional(),
        refundAmount: Joi.number().optional(),
        refundDate: Joi.date().optional(),
      }),
    })
  ),
  shippingAddress: Joi.string().optional(),
  paymentMethod: Joi.string().optional(),
  paymentResult: Joi.object({
    id: Joi.string().optional(),
    status: Joi.string().optional(),
    update_time: Joi.string().optional(),
    email_address: Joi.string().optional(),
  }),
  itemsPrice: Joi.number().optional(),
  shippingPrice: Joi.number().optional(),
  totalPrice: Joi.number().optional(),
  commission: Joi.number().optional(),
  isPaid: Joi.boolean().required(),
  paidAt: Joi.date().optional(),
  status: Joi.string().optional(),
  isDelivered: Joi.boolean().optional(),
  deliveredAt: Joi.date().optional(),
});
