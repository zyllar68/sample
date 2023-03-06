import clientPromise from "@/lib/mongodb";
import { compare } from "bcrypt";
import jwt from "jsonwebtoken";

const NEXT_PUBLIC_API_KEY = process.env.NEXT_PUBLIC_API_KEY;

export default async function handler(req, res) {
  const apiKey = req.headers["api-key"];
  const client = await clientPromise;
  const db = client.db(process.env.MONGODB_NAME);

  if (NEXT_PUBLIC_API_KEY !== apiKey) {
    return res.status(401).json({ message: "Invalid api key" });
  }
  switch (req.method) {
    case "POST":
      const authResult = await db
        .collection("users")
        .findOne({ username: req.body.username });
      if (!authResult) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
      const password = req.body.password;

      const isValidPassword = await compare(password, authResult.password);
      if (!isValidPassword) {
        return res.status(401).json({
          message: "Invalid credentialss",
          password: authResult.password,
        });
      }

      const token = jwt.sign(
        {
          userId: authResult._id.toString(),
          accountType: authResult.accountType,
          accountName: authResult.fullName,
        },
        process.env.JWT_SECRET
      );

      res.status(200).json({ token });

      break;
    default:
      break;
  }
}
