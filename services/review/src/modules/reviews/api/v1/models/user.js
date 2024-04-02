import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import { roles } from "@app/constants";

const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
      unique: true,
    },
    role: {
      type: String,
      enum: Object.values(roles),
      default: roles.buyer,
    },
    address: {
      type: String,
    },
    is_active: {
      type: String,
      default: true,
    },
    is_verified: {
      type: Boolean,
      default: false,
    },
    verification_code: {
      type: String,
      index: {
        unique: true,
        partialFilterExpression: { verification_code: { $type: "string" } },
      },
    },
  },
  {
    versionKey: false,
    minimize: false,
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

UserSchema.index({ createdAt: 1 });

UserSchema.plugin(mongoosePaginate);

const User = mongoose.model("User", UserSchema);

User.syncIndexes();

export { User };
