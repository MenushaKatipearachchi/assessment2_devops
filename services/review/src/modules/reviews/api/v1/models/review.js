import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import { Item } from "./item";
import { User } from "./user";

const { Schema } = mongoose;

const ReviewSchema = new Schema(
  {
    item: {
      type: mongoose.Types.ObjectId,
      required: false,
      ref: "Item",
    },
    user: {
      type: mongoose.Types.ObjectId,
      required: false,
      ref: "User",
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    text: {
      type: String,
      required: true,
    },
  },
  {
    versionKey: "_version",
    minimize: false,
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

ReviewSchema.index({ createdAt: 1 });

ReviewSchema.plugin(mongoosePaginate);

const Review = mongoose.model("Review", ReviewSchema);

Review.syncIndexes();

export { Review };
