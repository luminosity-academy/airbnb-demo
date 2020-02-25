import mongoose from "mongoose";

export interface IListing {
  title: string;
  body: string;
  dateAvailable: Date;
}

const listingSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      index: true,
      required: true
    },
    body: { type: String, required: true },
    dateAvailable: { type: Date, default: Date.now }
  },
  {
    timestamps: true
  }
);

const listingModel = mongoose.model<IListing & mongoose.Document>(
  "Listing",
  listingSchema
);

export default listingModel;
