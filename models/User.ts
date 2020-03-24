import mongoose, { Model } from "mongoose";

export interface IUser {
  email: string;
  name: string;
  password?: string;
}

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      index: true,
      unique: true,
      lowercase: true,
      required: true
    },
    name: { type: String, required: true },
    password: { type: String, required: true }
  },
  {
    timestamps: true
  }
);

const userModel =
  (mongoose.models.User as Model<IUser & mongoose.Document>) ||
  mongoose.model<IUser & mongoose.Document>("User", userSchema);

export default userModel;
