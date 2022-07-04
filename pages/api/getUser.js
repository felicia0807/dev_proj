import { ObjectId } from "mongodb";
import nextConnect from "next-connect";
import middleware from "../../middleware/database";

const handler = nextConnect();

handler.use(middleware);

handler.get(async (req, res) => {
  const { _id } = req.body || req.query;
  const users = await req.db.collection("users").findOne({ _id: ObjectId(_id) });
  res.json(users);
});

export default handler;