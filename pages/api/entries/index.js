import clientPromise from "@/lib/mongodb";
import { format } from "date-fns";
import { ObjectId } from "mongodb";

const NEXT_PUBLIC_API_KEY = process.env.NEXT_PUBLIC_API_KEY;

export default async function handler(req, res) {
  const apiKey = req.headers["api-key"];
  const client = await clientPromise;
  const db = client.db(process.env.MONGODB_NAME);

  if (NEXT_PUBLIC_API_KEY !== apiKey) {
    return res.status(401).json({ message: "Invalid api key" });
  }

  const date = new Date();
  const year = format(date, "yyyy");
  const day = format(date, "dd");

  const id = req.body.drawId;
  const newDrawId = new ObjectId(id);

  switch (req.method) {
    case "POST":
      let newId;
      try {
        const highestId = await db
          .collection("entries")
          .find()
          .sort({ _id: -1 })
          .limit(1)
          .project({ _id: 1 })
          .toArray();
        const newCounter =
          highestId.length > 0 && highestId[0]._id
            ? parseInt(highestId[0]._id.substring(8), 10) + 1
            : 1;
        newId = `${year}-${day}-${newCounter.toString().padStart(3, "0")}`;

        let allCombination = [];
        const combinations = [];
        for (let i = 0; i < req.body.entryData.length; i++) {
          const { amount, number, type } = req.body.entryData[i];

          if (type === "target") {
            allCombination.push(req.body.entryData[i]);
          } else if (type === "rambol") {
            const digits = number.split("");

            for (let i = 0; i < digits.length; i++) {
              for (let j = 0; j < digits.length; j++) {
                for (let k = 0; k < digits.length; k++) {
                  if (i !== j && j !== k && i !== k) {
                    const combination = parseInt(
                      digits[i] + digits[j] + digits[k]
                    );
                    if (!combinations.includes(combination)) {
                      combinations.push(combination);
                    }
                  }
                }
              }
            }

            const dividedAmount =
              req.body.entryData[i].amount / combinations.length;

            for (let i = 0; i < combinations.length; i++) {
              allCombination.push({
                type: type,
                amount: dividedAmount,
                number: combinations[i],
              });
            }
          }
        }

        await db.collection("entries").insertOne({
          _id: newId,
          drawId: req.body.drawId,
          userId: req.body.userId,
          fullName: req.body.fullName,
          drawTime: req.body.drawTime,
          createdAt: Date.now(),
          entryData: req.body.entryData,
          allCombination: allCombination,
        });

        const entry = await db.collection("draws").updateOne(
          { _id: newDrawId },
          {
            $inc: {
              collectedBets: req.body.totalAmount,
            },
          }
        );

        res.status(200).json(entry);
      } catch (error) {
        console.log(error);
        res.status(500).json({ message: `Internal server error` });
      }

    default:
      break;
  }
}
