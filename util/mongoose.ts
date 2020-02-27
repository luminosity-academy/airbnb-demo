import { NextApiRequest, NextApiResponse } from "next";

import mongoose from "mongoose";

export const middleware = (
  handler: (req: NextApiRequest, res: NextApiResponse) => void
) => async (req: NextApiRequest, res: NextApiResponse) => {
  if (mongoose.connections[0].readyState !== 1) {
    // Using new database connection
    await mongoose.connect("mongodb://localhost:27017/test", {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
  }
  return handler(req, res);
};

export default mongoose;
