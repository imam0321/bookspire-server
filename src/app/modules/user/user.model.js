import { model, Schema } from "mongoose";

const authProviderSchema = new Schema(
  {
    provider: { type: String, required: true },
    providerId: { type: String, required: true },
  },
  { versionKey: false, _id: false }
);

const userSchema = new Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
      unique: [true, "Email is Unique"],
      required: [true, "Email is Required"],
    },
    role: {
      type: String,
      enum: ["admin", "user", "seller"],
      default: "user",
    },
    photoURL: {
      type: String,
    },
    isVerified: { type: Boolean, default: false },
    isActive: { type: String, enum: ["active", "block"], default: "active" },
    password: {
      type: String,
    },
    auths: [authProviderSchema]
  },
  { timestamps: true, versionKey: false }
);

export const User = model("User", userSchema);
