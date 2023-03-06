import { format } from "date-fns";
import clientPromise from "@/lib/mongodb";

const NEXT_PUBLIC_API_KEY = process.env.NEXT_PUBLIC_API_KEY;

export default async function handler(req, res) {
  const apiKey = req.headers["api-key"];
  const client = await clientPromise;
  const db = client.db(process.env.MONGODB_NAME);

  if (NEXT_PUBLIC_API_KEY !== apiKey) {
    return res.status(401).json({ message: "Invalid api key" });
  }

  const date = new Date();
  const hours = date.getHours();
  const mins = date.getMinutes();

  const drawDate = format(date, "yyyy-mm-dd");
  const timeOpened = format(date, "HH:mm");

  let drawTime;

  if (hours <= 12 && mins <= 30) {
    drawTime = 2;
  } else if (hours <= 17 && mins <= 30) {
    drawTime = 5;
  } else if (hours <= 21 && mins <= 30) {
    drawTime = 9;
  }

  switch (req.method) {
    case "POST":
      try {
        const draws = await db.collection("draws").insertOne({
          drawDate,
          drawTime,
          timeOpened,
          timeClosed: "",
          status: "open",
          collectedBets: 0,
          totalWinnings: 0,
          winningNumber: "",
        });

        res.status(200).json(draws);
      } catch (error) {
        console.log(error);
        res.status(500).json({ message: `Internal server error` });
      }

      break;
    case "GET":
      try {
        const draw = await db
          .collection("draws")
          .find()
          .sort({ _id: -1 })
          .toArray();
        res.status(200).json(draw);
      } catch (error) {
        console.log(error);
        res.status(500).json({ message: `Internal server error` });
      }
      break;

    default:
      break;
  }
}
