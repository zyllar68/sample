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

  const { winningId, usherListId, refNumber } = req.body;
  const newWinningId = new ObjectId(winningId);
  const newUsherListId = new ObjectId(usherListId);

  switch (req.method) {
    case "PUT":
      try {
        const result = await db.collection("winnings").updateOne(
          {
            _id: newWinningId,
            "usherList._id": newUsherListId,
          },
          {
            $set: {
              "usherList.$.paymentStatus": "paid",
              "usherList.$.refNumber": refNumber,
            },
          }
        );
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
