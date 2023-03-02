import bcrypt from "bcrypt";

import clientPromise from "@/lib/mongodb";

const NEXT_PUBLIC_API_KEY = process.env.NEXT_PUBLIC_API_KEY;

export default async function handler(req, res) {
  const apiKey = req.headers["api-key"];
  const client = await clientPromise;
  const db = client.db(process.env.MONGODB_NAME);

  if (NEXT_PUBLIC_API_KEY !== apiKey) {
    return res.status(401).json({ message: "Invalid api key" });
  }

  const hashedPassword = await bcrypt.hash(req.body.password, 10);

  switch (req.method) {
    case "POST":
      let newId;
      try {
        const highestId = await db
          .collection("users")
          .find()
          .sort({ _id: -1 })
          .limit(1)
          .project({ _id: 1 })
          .toArray();
        const newCounter =
          highestId.length > 0 && highestId[0]._id
            ? parseInt(highestId[0]._id.substring(5), 10) + 1
            : 1;
        newId = `swt${newCounter.toString().padStart(3, "0")}`;

        const user = await db.collection("users").insertOne({
          _id: newId,
          ...req.body,
          password: hashedPassword,
          status: 1,
        });

        res.status(200).json(user);
      } catch (error) {
        res.status(500).json({ message: `Internal server error ${error}` });
      }
      break;
    case "GET":
      try {
        const users = await db
          .collection("users")
          .find({ accountType: "ushers" })
          .toArray();
      } catch (error) {
        res.status(500).json({ message: `Internal server error ${error}` });
      }
      break;
    default:
      break;
  }
}
