import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
// import { roles } from "@app/constants";

const { Schema } = mongoose;

const DeliverySchema = new Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },
    order_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      required: false,
    },
    itemsPrice: {
      type: Number,
      ref: "Order",
      required: true,
    },
    shippingPrice: {
      type: Number,
      ref: "Order",
      required: true,
    },
    totalPrice: {
      type: Number,
      ref: "Order",
      required: true,
    },
    shippingAddress: {
      type: String,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      ref: "Order",
      enum: ["Pending", "Confirmed", "Shipped", "Delivered", "Cancelled"],
      default: "Pending",
    },
  },
  {
    versionKey: false,
    minimize: false,
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

DeliverySchema.index({ createdAt: 1 });

DeliverySchema.plugin(mongoosePaginate);

const Delivery = mongoose.model("Delivery", DeliverySchema);

Delivery.syncIndexes();

export { Delivery };
