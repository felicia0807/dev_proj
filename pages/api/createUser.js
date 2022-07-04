import nextConnect from "next-connect";
import middleware from "../../middleware/database";

const handler = nextConnect();

handler.use(middleware);

handler.post(async (req, res) => {
  const { name, country } = JSON.parse(req.body);

  const {
    ops: [user]
  } = await req.db.collection("users").insertOne({
    name,
    country
  });

  res.json(user);
});

export default handler;