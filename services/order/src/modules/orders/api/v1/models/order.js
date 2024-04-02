import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const { Schema } = mongoose;

const OrderSchema = new Schema(
  {
    buyer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    products: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
        cancellationDetails: {
          isRequested: { type: Boolean, default: false },
          reason: { type: String },
          status: {
            type: String,
            enum: ["Pending", "Approved", "Rejected"],
            default: "Pending",
          },
          isRefunded: { type: Boolean, default: false },
          refundAmount: { type: Number },
          refundDate: { type: Date },
        },
      },
    ],
    shippingAddress: {
      type: String,
      ref: "User",
      required: true,
    },
    paymentMethod: {
      type: String,
      required: true,
    },
    paymentResult: {
      id: String,
      status: String,
      update_time: String,
      email_address: String,
    },
    itemsPrice: {
      type: Number,
      required: true,
      default: 0,
    },
    shippingPrice: {
      type: Number,
      required: true,
      default: 0,
    },
    totalPrice: {
      type: Number,
      required: true,
      default: 0,
    },
    commission: {
      type: Number,
      required: true,
      default: 0,
    },
    isPaid: {
      type: Boolean,
      required: true,
      default: false,
    },
    paidAt: {
      type: Date,
    },
    status: {
      type: String,
      enum: ["Pending", "Confirmed", "Shipped", "Delivered", "Cancelled"],
      default: "Pending",
    },
    isDelivered: {
      type: Boolean,
      required: true,
      default: false,
    },
    deliveredAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

OrderSchema.index({ createdAt: 1 });

// To disable generating _id for each item in products array
OrderSchema.set("toObject", { getters: true, virtuals: true, id: false });
OrderSchema.set("toJSON", { getters: true, virtuals: true, id: false });

OrderSchema.plugin(mongoosePaginate);

OrderSchema.pre("save", async function () {
  if (!this.shippingAddress) {
    const buyer = await mongoose.model("Order").findById(this.buyer);
    this.shippingAddress = buyer.address;
  }
});

const Order = mongoose.model("Order", OrderSchema);

Order.syncIndexes();

export { Order };
