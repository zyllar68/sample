import clientPromise from "@/lib/mongodb";
import { parseISO } from "date-fns";

const NEXT_PUBLIC_API_KEY = process.env.NEXT_PUBLIC_API_KEY;

export default async function handler(req, res) {
  const apiKey = req.headers["api-key"];
  const client = await clientPromise;
  const db = client.db(process.env.MONGODB_NAME);

  if (NEXT_PUBLIC_API_KEY !== apiKey) {
    return res.status(401).json({ message: "Invalid api key" });
  }

  const { newDate, drawTime } = req.query;
  let collectionResult = [];
  let totalAmount = 0;
  switch (req.method) {
    case "GET":
      try {
        const result = await db
          .collection("draws")
          .find({
            drawDate: newDate,
            drawTime:
              parseInt(drawTime) === 1
                ? { $in: [2, 5, 9] }
                : parseInt(drawTime),
          })
          .toArray();
        if (result.length > 0) {
          collectionResult = await db
            .collection("entries")
            .find({
              drawId: result[0]._id.toString(),
            })
            .toArray();
        }
        if (collectionResult.length > 0) {
          collectionResult.forEach((obj) => {
            obj.entryData.forEach((entry) => {
              totalAmount += entry.amount;
            });
          });
        }

        res.status(200).json(totalAmount);
      } catch (error) {
        console.log(error);
        res
          .status(500)
          .json({ message: "There was an error while retrieving data!!" });
      }
      break;

    default:
      break;
  }
}
