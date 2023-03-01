import clientPromise from "@/lib/mongodb";

const NEXT_API_KEY = process.env.NEXT_API_KEY;

export default async function handler(req, res) {
  const apiKey = req.headers["api-key"];
  const ipAddress = req.headers["x-real-ip"];
  const client = await clientPromise;
  const db = client.db(process.env.MONGODB_NAME);

  if (NEXT_API_KEY !== apiKey) {
    return res.status(401).json({ message: apiKey });
  }

  if (req.method === "POST") {
    let newId;
    try {
      res.status(200).json(ipAddress);
    } catch (error) {
      console.log(error);
    }
  }
}
