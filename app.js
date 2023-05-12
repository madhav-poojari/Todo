const express = require("express");
const { ObjectID } = require("mongodb");
const { getDB } = require("./db");

const app = express();
app.use(express.json());
let db;
async function getDatabase() {
  db = await getDB;
  // console.log(db);
}

getDatabase();
if (!db) {
  let port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Listening to port ${port}`);
  });
}

//gets a list of everything we need to do
app.get("/all", async (req, res) => {
  let listy = [];
  await db.find().forEach((book) => listy.push(book));
  res.status(200).json(listy);
});

app.get("/books/:id", async (req, res) => {
  let boosk;
  boosk = await db.findOne({ _id: ObjectID(req.params.id) });
  if (boosk == null) res.status(500).json({ error: "no book found " });
  else res.status(200).json(boosk);

  console.log("here");
});

app.post("/addTodo", (req, res) => {
  const todo = req.body;
  db.insertOne(todo)
    .then((result) => {
      res.status(201).json(result);
    })
    .catch((err) => {
      res.status(500).json({ err: "could not add to list" });
    });
});

app.patch("/todo/:id", (req, res) => {
  const updates = req.body;
  db.updateOne({ _id: ObjectID(req.params.id) }, { $set: updates })
    .then((result) => {
      res.status(201).json(result);
    })
    .catch((err) => {
      res.status(500).json({ err: "could not update" });
    });
});

app.delete("/todo/:id", async (req, res) => {
  let del;

  del = await db.deleteOne({ _id: ObjectID(req.params.id) });
  if (del == null) res.status(500).json({ error: "no such item found " });
  else res.status(200).json(del);
});
