import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
// import { roles } from "@app/constants";

const { Schema } = mongoose;

const NotificationSchema = new Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },
    notification_title: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    isRead: {
      type: Boolean,
      default: false,
    },
  },
  {
    versionKey: false,
    minimize: false,
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

NotificationSchema.index({ createdAt: 1 });

NotificationSchema.plugin(mongoosePaginate);

const Notification = mongoose.model("Notification", NotificationSchema);

Notification.syncIndexes();

export { Notification };
