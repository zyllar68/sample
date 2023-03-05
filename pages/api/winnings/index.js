import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

const NEXT_PUBLIC_API_KEY = process.env.NEXT_PUBLIC_API_KEY;

export default async function handler(req, res) {
  const apiKey = req.headers["api-key"];
  const client = await clientPromise;
  const db = client.db(process.env.MONGODB_NAME);

  if (NEXT_PUBLIC_API_KEY !== apiKey) {
    return res.status(401).json({ message: "Invalid api key" });
  }

  const { winningNumber, drawId } = req.body;

  const id = new ObjectId(drawId);

  switch (req.method) {
    case "POST":
      try {
        await db
          .collection("draws")
          .updateOne({ _id: id }, { $set: { winningNumber: winningNumber } });

        const result = await db.collection("winnings").insertOne({
          winningNumber,
          drawId,
          createadAt: Date.now(),
        });
        res.status(200).json(result);
      } catch (error) {
        console.log(error);
        res.status(500).json({ message: `Internal server error` });
      }
      break;

    default:
      break;
  }
}
