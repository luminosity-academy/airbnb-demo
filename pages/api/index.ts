import { NextApiRequest, NextApiResponse } from "next";
import User, { IUser } from "../../models/User";
import "../../util/mongoose";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { query, method } = req;

  switch (method) {
    case "GET":
      const { id } = query;

      const dbUser = await User.findById(id);

      if (dbUser) {
        // Get data from your database
        return res.status(200).json(dbUser);
      }

      return res.status(404).json({ message: "User not found." });
    case "PUT":
      try {
        const { name, email, password } = query;

        const user: IUser = {
          name: String(name),
          email: String(email),
          password: String(password)
        };

        const createdUser = await User.create(user);

        // Update or create data in your database
        return res.status(200).json(createdUser);
      } catch (e) {
        return res.status(500).json({ message: "Error creating user." });
      }
    default:
      res.setHeader("Allow", ["GET", "PUT"]);
      return res.status(405).end(`Method ${method} Not Allowed`);
  }
};
