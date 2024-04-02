import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const { Schema } = mongoose;

const ItemSchema = new Schema(
  {
    title: {
      type: String,
      required: false,
    },
    message: {
      type: String,
      required: false,
    },
    category: {
      type: String,
      required: false,
    },
    price: {
      type: Number,
      required: false,
    },
    seller: {
      type: String,
      required: false,
    },
    selectedFile: {
      type: String,
      required: false,
    },
    avgRating: {
      type: Number,
      default: 0,
      required: false,
    },
  },
  {
    versionKey: "_version",
    minimize: false,
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

ItemSchema.index({ createdAt: 1 });

ItemSchema.plugin(mongoosePaginate);

const Item = mongoose.model("Item", ItemSchema);

Item.syncIndexes();

export { Item };
