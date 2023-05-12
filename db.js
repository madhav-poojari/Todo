const { MongoClient } = require("mongodb");

async function main() {
  const uri =
    "mongodb+srv://junith:9oetA6mMXTEfFlYE@cluster0.lihyu7f.mongodb.net/?retryWrites=true&w=majority";

  const client = new MongoClient(uri);

  try {
    await client.connect();
    let collection = await client.db("bookstore").collection("todo_list");
    return collection;
  } catch (e) {
    console.error(e);
    return null;
  }
}

module.exports = {
  getDB: main().catch(console.error),
};
