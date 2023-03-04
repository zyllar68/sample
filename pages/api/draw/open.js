import clientPromise from "@/lib/mongodb";

const NEXT_PUBLIC_API_KEY = process.env.NEXT_PUBLIC_API_KEY;

export default async function handler(req, res) {
  const apiKey = req.headers["api-key"];
  const client = await clientPromise;
  const db = client.db(process.env.MONGODB_NAME);

  if (NEXT_PUBLIC_API_KEY !== apiKey) {
    return res.status(401).json({ message: "Invalid api key" });
  }

  switch (req.method) {
    case "GET":
      try {
        const draw = await db
          .collection("draws")
          .findOne({ timeClosed: "open" });
        res.status(200).json(draw);
      } catch (error) {
        console.log(error);
        res.status(500).json({ message: `Internal server error` });
      }

    default:
      break;
  }
}
