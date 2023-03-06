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

        const usherUsers = await db
          .collection("users")
          .find(
            { accountType: "usher" },
            { projection: { _id: 1, fullName: 1 } }
          )
          .toArray();

        let totalWinnings;
        let totalCollected;
        let usherList = [];
        let countEntries;

        for (const user of usherUsers) {
          const addAllBets = await db
            .collection("entries")
            .aggregate([
              // Match entries that contain { number: 155 } in allCombination
              {
                $match: {
                  userId: user._id,
                  "allCombination.number": parseInt(winningNumber),
                  drawId,
                },
              },
              // Unwind allCombination to get one document per entry/number combination
              { $unwind: "$allCombination" },
              // Filter to only documents where allCombination.number is 155
              { $match: { "allCombination.number": parseInt(winningNumber) } },
              // Group by drawId and sum up allCombination.amount
              {
                $group: {
                  _id: "$drawId",
                  totalAmount: { $sum: "$allCombination.amount" },
                },
              },
            ])
            .toArray();
          countEntries = await db.collection("entries").countDocuments({
            userId: user._id,
            "allCombination.number": parseInt(winningNumber),
            drawId,
          });

          if (addAllBets.length > 0) {
            totalWinnings = parseInt(addAllBets[0].totalAmount) * 500;
            totalCollected = addAllBets[0].totalAmount;
          } else {
            totalWinnings = 0;
            totalCollected = 0;
          }

          const usherInfo = {
            _id: new ObjectId(),
            userId: user._id,
            userName: user.fullName,
            totalCollected: totalCollected,
            totalWinnings: totalWinnings,
            totalEntriesWon: countEntries,
            paymentStatus: "pending",
          };

          usherList.push(usherInfo);
        }
        await db.collection("winnings").insertOne({
          drawId,
          winningNumber: winningNumber,
          usherList: usherList,
          createdAt: Date.now(),
        });

        res.status(200).json(usherUsers);
      } catch (error) {
        console.log(error);
        res.status(500).json({ message: `Internal server error` });
      }
      break;

    default:
      break;
  }
}
