import { NextApiRequest, NextApiResponse } from "next";

import User, { IUser } from "../../../models/User";
import { hashPassword } from "../../../util/hash";
import { middleware } from "../../../util/mongoose";

const userRoute = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;

  if (req.url) {
    if (method === "GET") {
      const dbUsers = await User.find();

      if (dbUsers) {
        // Get data from your database
        return res.status(200).json(dbUsers);
      }

      return res.status(404).json({ message: "No users found." });
    }

    if (method === "POST") {
      try {
        const userBody: IUser = JSON.parse(req.body);

        if (userBody.password) {
          const hashedPassword = await hashPassword(userBody.password);

          const user: IUser = {
            name: userBody.name,
            email: userBody.email,
            password: hashedPassword
          };

          const createdUser = await User.create(user);

          // Update or create data in your database
          return res.status(200).json(createdUser);
        }

        return res.status(500).end(`Must supply password.`);
      } catch (e) {
        console.error(e);

        return res.status(500).json({ message: "Error creating user." });
      }
    }
  } else {
    return res.status(500).end(`Error with URL in request.`);
  }

  res.setHeader("Allow", ["GET", "POST"]);
  return res.status(405).end(`Method ${method} Not Allowed`);
};

export default middleware(userRoute);
