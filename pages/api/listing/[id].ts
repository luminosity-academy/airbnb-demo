import { NextApiRequest, NextApiResponse } from "next";

import Listing from "../../../models/Listing";
import { middleware } from "../../../util/mongoose";

const listingRoute = async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    query: { id },
    method
  } = req;

  if (id) {
    if (method === "GET") {
      const dbListing = await Listing.findById(id);

      if (dbListing) {
        // Get data from your database
        return res.status(200).json(dbListing);
      }

      return res.status(404).json({ message: "Listing not found." });
    }

    if (method === "PUT") {
      const response = await Listing.replaceOne({ _id: id }, req.body);

      if (response) {
        const dbListing = await Listing.findById(id);

        // Get data from your database
        return res.status(200).json(dbListing);
      }

      return res.status(500).json({ message: "Error updating listing." });
    }
  } else {
    return res.status(400).json({ message: "ID must be defined." });
  }

  res.setHeader("Allow", ["GET", "PUT"]);
  return res.status(405).end(`Method ${method} Not Allowed`);
};

export default middleware(listingRoute);
