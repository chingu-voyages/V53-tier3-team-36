import mongoose, { Schema } from "mongoose";
import { User } from "../models/user.model";

// TODO: this model should be expanded. This is just data to get started.
const userSchema = new Schema<User>(
  {
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    imageUrl: { type: String },
    bio: { type: String, default: "" },
    read: { type: [String], default: [] },
    wantToRead: { type: [String], default: [] },
    rated: { type: [String], default: [] },
    hashtags: { type: [String], default: [] },
  },
  { timestamps: true }
);

export const UserModel: mongoose.Model<User> =
  mongoose.models.User || mongoose.model<User>("User", userSchema);
