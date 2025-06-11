
import formidable from 'formidable';
import fs from 'fs';
import { saveToDb } from '../db/mongo.js';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  const form = new formidable.IncomingForm({ uploadDir: '/tmp', keepExtensions: true });

  form.parse(req, async (err, fields, files) => {
    if (err) return res.status(500).send("Error in form parsing");

    const file = files.file[0];
    const message = fields.message ? fields.message[0] : "";
    const linkId = Math.random().toString(36).substr(2, 9);

    await saveToDb({ linkId, path: file.filepath, message, viewed: false });

    res.status(200).json({ link: `/api/view?id=${linkId}` });
  });
}
