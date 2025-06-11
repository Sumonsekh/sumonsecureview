
import { MongoClient } from 'mongodb';

const uri = "YOUR_MONGO_URI";
const client = new MongoClient(uri);
const dbName = "sumonsecureview";
let db;

export async function connectDb() {
  if (!db) {
    await client.connect();
    db = client.db(dbName);
  }
  return db;
}

export async function saveToDb(content) {
  const db = await connectDb();
  await db.collection("files").insertOne(content);
}

export async function getFromDb(id) {
  const db = await connectDb();
  return await db.collection("files").findOne({ linkId: id });
}

export async function markAsViewed(id) {
  const db = await connectDb();
  await db.collection("files").updateOne({ linkId: id }, { $set: { viewed: true } });
}
