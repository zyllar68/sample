import clientPromise from "@/lib/mongodb";

const NEXT_API_KEY = process.env.NEXT_API_KEY;

export default async function handler(req, res) {
  const apiKey = req.headers["api-key"];
  const client = await clientPromise;
  const db = client.db(process.env.MONGODB_NAME);

  if (NEXT_API_KEY !== apiKey) {
    return res.status(401).json({ message: apiKey });
  }

  if (req.method === "POST") {
    let newId;
    try {
      const highestId = await db
        .collection(`${req.body.accountType === "admin" ? "admin" : "usher"}`)
        .find()
        .sort({ _id: -1 })
        .limit(1)
        .project({ _id: 1 })
        .toArray();
      const newCounter =
        highestId.length > 0
          ? parseInt(highestId[0]._id.substring(1), 10) + 1
          : 1;
      newId = `${req.body.accountType === "admin" ? "a" : "u"}${newCounter
        .toString()
        .padStart(3, "0")}`;

      const user = await db
        .collection(`${req.body.accountType === "admin" ? "admin" : "usher"}`)
        .insertOne({
          _id: newId,
          username: req.body.username,
          password: req.body.password,
          fullName: req.body.fullName,
          accountType: req.body.accountType,
          phoneNumber: req.body.phoneNumber,
          address: req.body.address,
          status: 1,
        });

      res.status(200).json(user);
    } catch (error) {
      console.log(error);
    }
  }
}
