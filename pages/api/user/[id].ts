import { NextApiRequest, NextApiResponse } from "next";

import User from "../../../models/User";
import { middleware } from "../../../util/mongoose";

const userRoute = async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    query: { id },
    method
  } = req;

  if (id) {
    if (method === "GET") {
      const dbUser = await User.findById(id);

      if (dbUser) {
        // Get data from your database
        return res.status(200).json(dbUser);
      }

      return res.status(404).json({ message: "User not found." });
    }

    if (method === "PUT") {
      const response = await User.replaceOne({ _id: id }, req.body);

      if (response) {
        const dbUser = await User.findById(id);

        // Get data from your database
        return res.status(200).json(dbUser);
      }

      return res.status(500).json({ message: "Error updating user." });
    }
  } else {
    return res.status(400).json({ message: "ID must be defined." });
  }

  res.setHeader("Allow", ["GET", "PUT"]);
  return res.status(405).end(`Method ${method} Not Allowed`);
};

export default middleware(userRoute);
