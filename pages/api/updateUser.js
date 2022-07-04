import { ObjectId } from "mongodb";
import nextConnect from "next-connect";
import middleware from "../../middleware/database";

const handler = nextConnect();

handler.use(middleware);

handler.put(async (req, res) => {
  const { name, country, _id } = JSON.parse(req.body);

  const user = await req.db.collection("users").findOneAndUpdate(
    {
      _id: ObjectId(_id)
    },
    {
      $set: {
        name,
        country
      }
    },
    {
      returnOriginal: false
    }
  );

  res.json(user.value);
});

export default handler;