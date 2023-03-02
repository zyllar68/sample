import clientPromise from "@/lib/mongodb";

const NEXT_PUBLIC_API_KEY = process.env.NEXT_PUBLIC_API_KEY;

export default async function handler(req, res) {
  const apiKey = req.headers["api-key"];
  const client = await clientPromise;
  const db = client.db(process.env.MONGODB_NAME);

  const { id } = req.query;

  if (NEXT_PUBLIC_API_KEY !== apiKey) {
    return res.status(401).json({ message: "Invalit api key!" });
  }

  switch (req.method) {
    case "GET":
      try {
        const user = await db.collection("users").findOne({ _id: id });
        res.status(200).json(user);
      } catch (error) {
        res.status(500).json({ error: "Internal server error" });
      }
      break;

    case "PUT":
      try {
        const updatedUser = await db
          .collection("users")
          .updateOne({ _id: id }, { $set: body });
        res.status(200).json(updatedUser);
      } catch (error) {
        res.status(500).json({ error: "Internal server error" });
      }
      break;

    default:
      res.status(405).json({ error: `Method ${method} not allowed` });
      break;
  }
}
