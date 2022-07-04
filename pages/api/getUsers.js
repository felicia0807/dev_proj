//sample api//

import nextConnect from "next-connect";
import middleware from "../../middleware/database";

const handler = nextConnect();

handler.use(middleware); //api connected to middleware// 


handler.get(async (req, res) => {
  const users = await req.db.collection("users").find({}).toArray();
  res.json(users);
});

export default handler;