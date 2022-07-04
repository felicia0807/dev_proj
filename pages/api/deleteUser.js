import { ObjectId } from "mongodb";
import nextConnect from "next-connect";
import middleware from "../../middleware/database";

const handler = nextConnect();

handler.use(middleware);

handler.delete(async (req, res) => {
  const { _id } = req.query;

  await req.db.collection("users").deleteOne(
    {
      _id: ObjectId(_id)
    }
  );

  res.json({});
});

export default handler;