
import { getFromDb, markAsViewed } from '../db/mongo.js';
import fs from 'fs';

export default async function handler(req, res) {
  const id = req.query.id;
  const data = await getFromDb(id);

  if (!data || data.viewed) {
    return res.status(404).send("This content has already been viewed or doesn't exist.");
  }

  await markAsViewed(id);
  const fileContent = fs.readFileSync(data.path);

  res.setHeader('Content-Type', 'application/octet-stream');
  res.send(fileContent);
}
