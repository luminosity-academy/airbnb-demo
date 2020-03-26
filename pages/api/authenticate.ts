import { NextApiRequest, NextApiResponse } from "next";

import jsonwebtoken from "jsonwebtoken";

import User, { IUser } from "../../models/User";
import { comparePassword } from "../../util/hash";
import { middleware } from "../../util/mongoose";

const authRoute = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;

  if (!process.env.JWT_SECRET) {
    return res.status(500).json({ message: "Error with server." });
  }

  if (req.url) {
    if (method === "POST") {
      try {
        const userBody: IUser = JSON.parse(req.body);

        const dbUser = await User.findOne({ email: userBody.email });

        if (dbUser && dbUser.password && userBody.password) {
          const isPasswordValid = await comparePassword(
            userBody.password,
            dbUser.password
          );

          if (isPasswordValid) {
            const tokenPayload: IUser = {
              email: dbUser.email,
              name: dbUser.name
            };

            const token = jsonwebtoken.sign(
              tokenPayload,
              process.env.JWT_SECRET
            );

            return res.status(200).json(token);
          }
        }

        return res.status(401).json({ message: "Invalid password." });
      } catch (e) {
        return res.status(500).json({ message: "Error creating user." });
      }
    }
  } else {
    return res.status(500).end(`Error with URL in request.`);
  }

  res.setHeader("Allow", ["POST"]);
  return res.status(405).end(`Method ${method} Not Allowed`);
};

export default middleware(authRoute);
