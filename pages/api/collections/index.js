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

  const { drawId } = req.body;

  switch (req.method) {
    case "POST":
      const usherList = await db
        .collection("users")
        .find({ accountType: "usher" }, { _id: 1, fullName: 1 })
        .toArray();

      let collectionList = [];
      let totalCollection = 0;
      let overAllCollection = 0;

      for (const user of usherList) {
        totalCollection = await db
          .collection("entries")
          .aggregate([
            {
              $match: {
                drawId: drawId,
                userId: user._id,
              },
            },
            {
              $unwind: "$entryData",
            },
            {
              $group: {
                _id: null,
                totalAmount: {
                  $sum: "$entryData.amount",
                },
              },
            },
            {
              $project: {
                _id: 0,
                totalAmount: 1,
              },
            },
          ])
          .toArray();
        console.log(totalCollection);

        if (totalCollection.length > 0) {
          totalCollection = totalCollection[0].totalAmount;
          overAllCollection += totalCollection;
        } else {
          totalCollection = 0;
        }

        const collectionInfo = {
          _id: new ObjectId(),
          userId: user._id,
          fullName: user.fullName,
          totalCollection: totalCollection,
          paymentStatus: "pending",
        };

        collectionList.push(collectionInfo);
      }
      const result = await db.collection("collections").insertOne({
        collectionList: collectionList,
        drawId: drawId,
        unPaidCollection: overAllCollection,
        overAllCollection,
        createdAt: Date.now(),
      });
      res.status(200).json(result);
      break;
    case "GET":
      try {
        const result = await db
          .collection("collections")
          .find({
            drawId: drawId,
          })
          .toArray();
        res.status(200).json(result);
      } catch (error) {
        console.log(error);
        res
          .status(500)
          .json({ message: "There was an error while retrieving data!" });
      }
      break;
    default:
      break;
  }
}
