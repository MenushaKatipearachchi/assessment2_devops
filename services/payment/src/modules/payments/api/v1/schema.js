import { Joi } from "celebrate";

// export const createPaymentSchema = Joi.object({
//   user_id: Joi.string().optional(),
//   amount: Joi.number().required(),
//   currency: Joi.string().required(),
//   payment_method: Joi.string()
//     .valid("Credit Card", "Debit Card", "PayPal")
//     .required(),
//   transactionId: Joi.string().required(),
//   payment_status: Joi.string().default("Pending"),
//   paypal_payment_details: Joi.object()
//     .keys({
//       intent: Joi.string().valid("sale").required(),
//       payer: Joi.object()
//         .keys({
//           payment_method: Joi.string().valid("paypal").required(),
//         })
//         .required(),
//       redirect_urls: Joi.object()
//         .keys({
//           return_url: Joi.string().optional(),
//           cancel_url: Joi.string().optional(),
//         })
//         .optional(),
//       transactions: Joi.array().items(
//         Joi.object().keys({
//           item_list: Joi.object().keys({
//             items: Joi.array().items(
//               Joi.object().keys({
//                 name: Joi.string().required(),
//                 sku: Joi.string().required(),
//                 price: Joi.string().required(),
//                 currency: Joi.string().required(),
//                 quantity: Joi.number().required(),
//               })
//             ),
//           }),
//           amount: Joi.object().keys({
//             currency: Joi.string().required(),
//             total: Joi.string().required(),
//           }),
//           description: Joi.string().required(),
//         })
//       ),
//     })
//     .required(),
// });

// export const updatePaymentSchema = Joi.object({
//   amount: Joi.number().optional(),
//   currency: Joi.string().optional(),
//   payment_method: Joi.string()
//     .valid("Credit Card", "Debit Card", "PayPal")
//     .optional(),
//   transactionId: Joi.string().optional(),
//   payment_status: Joi.string()
//     .valid("Pending", "Processing", "Completed", "Failed")
//     .optional(),
//   paypal_payment_details: Joi.object()
//     .keys({
//       intent: Joi.string().valid("sale").optional(),
//       payer: Joi.object()
//         .keys({
//           payment_method: Joi.string().valid("paypal").optional(),
//         })
//         .optional(),
//       redirect_urls: Joi.object()
//         .keys({
//           return_url: Joi.string().optional(),
//           cancel_url: Joi.string().optional(),
//         })
//         .optional(),
//       transactions: Joi.array().items(
//         Joi.object().keys({
//           item_list: Joi.object().keys({
//             items: Joi.array().items(
//               Joi.object().keys({
//                 name: Joi.string().optional(),
//                 sku: Joi.string().optional(),
//                 price: Joi.string().optional(),
//                 currency: Joi.string().optional(),
//                 quantity: Joi.number().optional(),
//               })
//             ),
//           }),
//           amount: Joi.object().keys({
//             currency: Joi.string().optional(),
//             total: Joi.string().optional(),
//           }),
//           description: Joi.string().optional(),
//         })
//       ),
//     })
//     .optional(),
// });

export const createPaymentSchema = Joi.object({
  amount: Joi.number().required(),
  currency: Joi.string().valid("USD", "EUR", "GBP").required(),
  card: Joi.object({
    cardNumber: Joi.string().creditCard().required(),
    cvv: Joi.string().length(3).required(),
    expirationDate: Joi.string()
      .pattern(/^\d{2}\/\d{4}$/)
      .required(),
    nameOnCard: Joi.string().required(),
  }).required(),
});

export const updatePaymentSchema = Joi.object({
  amount: Joi.number(),
  currency: Joi.string().valid("USD", "EUR", "GBP"),
  card: Joi.object({
    cardNumber: Joi.string().creditCard(),
    cvv: Joi.string().length(3),
    expirationDate: Joi.string().pattern(/^\d{2}\/\d{4}$/),
    nameOnCard: Joi.string(),
  }),
}).min(1);
