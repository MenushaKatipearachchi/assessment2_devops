import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const { Schema } = mongoose;

const PaymentSchema = new Schema(
  // {
  //   user_id: {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: "User",
  //     required: false,
  //   },
  //   amount: {
  //     type: Number,
  //     required: true,
  //   },
  //   currency: {
  //     type: String,
  //     required: true,
  //   },
  //   payment_method: {
  //     type: String,
  //     required: true,
  //     enum: ["Credit Card", "Debit Card", "PayPal"],
  //   },
  //   transactionId: {
  //     type: String,
  //     required: true,
  //   },
  //   payment_status: {
  //     type: String,
  //     enum: ["Pending", "Processing", "Completed", "Failed"],
  //     default: "Pending",
  //     required: true,
  //   },
  //   paypal_payment_details: {
  //     type: {
  //       intent: {
  //         type: String,
  //         required: true,
  //         enum: ["sale"],
  //       },
  //       payer: {
  //         payment_method: {
  //           type: String,
  //           required: true,
  //           enum: ["paypal"],
  //         },
  //       },
  //       redirect_urls: {
  //         return_url: {
  //           type: String,
  //           default: "http://localhost:4003/api/v1/payments/success",
  //           required: false,
  //         },
  //         cancel_url: {
  //           type: String,
  //           default: "http://localhost:4003/api/v1/payments/cancel",
  //           required: false,
  //         },
  //       },
  //       transactions: [
  //         {
  //           item_list: {
  //             items: [
  //               {
  //                 name: {
  //                   type: String,
  //                   required: true,
  //                 },
  //                 sku: {
  //                   type: String,
  //                   required: true,
  //                 },
  //                 price: {
  //                   type: String,
  //                   required: true,
  //                 },
  //                 currency: {
  //                   type: String,
  //                   required: true,
  //                 },
  //                 quantity: {
  //                   type: Number,
  //                   required: true,
  //                 },
  //               },
  //             ],
  //           },
  //           amount: {
  //             currency: {
  //               type: String,
  //               required: true,
  //             },
  //             total: {
  //               type: String,
  //               required: true,
  //             },
  //           },
  //           description: {
  //             type: String,
  //             required: true,
  //           },
  //         },
  //       ],
  //     },
  //     required: false,
  //   },
  // },
  {
    amount: {
      type: Number,
      required: true,
    },
    currency: {
      type: String,
      enum: ["USD", "EUR", "GBP"],
      required: true,
    },
    card: {
      cardNumber: {
        type: String,
        required: true,
      },
      cvv: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 3,
      },
      expirationDate: {
        type: String,
        required: true,
        match: /^\d{2}\/\d{4}$/,
      },
      nameOnCard: {
        type: String,
        required: true,
      },
    },
  },
  {
    versionKey: "_version",
    minimize: false,
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

PaymentSchema.index({ createdAt: 1 });

PaymentSchema.plugin(mongoosePaginate);

const Payment = mongoose.model("Payment", PaymentSchema);

Payment.syncIndexes();

export { Payment };
