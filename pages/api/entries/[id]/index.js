import clientPromise from "@/lib/mongodb";
import { format } from "date-fns";

const NEXT_PUBLIC_API_KEY = process.env.NEXT_PUBLIC_API_KEY;

export default async function handler(req, res) {
  const apiKey = req.headers["api-key"];
  const client = await clientPromise;
  const db = client.db(process.env.MONGODB_NAME);

  if (NEXT_PUBLIC_API_KEY !== apiKey) {
    return res.status(401).json({ message: "Invalid api key" });
  }

  const newDate = new Date();
  const formattedDate = format(newDate, "yyyy-MM-dd");

  const { id, createdAt, drawTime } = req.query;

  let DEFAULT_DRAW_TIMES = [2, 5, 9]; // default drawTime values
  let drawTimeArray =
    drawTime === "all" ? DEFAULT_DRAW_TIMES : [parseInt(drawTime)];

  console.log(drawTimeArray);

  switch (req.method) {
    case "GET":
      try {
        const entries = await db
          .collection("entries")
          .find({
            userId: id,
            createdAt: createdAt ? createdAt : formattedDate,
            drawTime: { $in: drawTimeArray },
          })
          .toArray();
        res.status(200).json(entries);
      } catch (error) {
        res.status(500).json({ message: `Internal server error ${error}` });
      }
      break;

    default:
      break;
  }
}
