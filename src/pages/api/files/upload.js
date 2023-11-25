// pages/api/files/uploads.js
import multer from "multer";
import { MongoClient, GridFSBucket } from "mongodb";

const storage = multer.memoryStorage();
const upload = multer({ storage: storage }).single("file");

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  try {
    await new Promise((resolve, reject) => {
      upload(req, res, (error) => {
        if (error) {
          reject(error);
        } else {
          resolve();
        }
      });
    });

    if (req.method === "POST") {
      const client = await MongoClient.connect(process.env.MONGO_DB, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });

      const db = client.db();
      const bucket = new GridFSBucket(db);

      const file = req.file;

      if (!file) {
        return res.status(400).json({ error: "No file provided" });
      }

      const filename = file.originalname;

      const writestream = bucket.openUploadStream(filename);

      writestream.end(file.buffer);

      writestream.on("finish", () => {
        const downloadUrl = `http://${req.headers.host}/api/files/downloads/${filename}`; 
        res.json({ downloadUrl });
      });
    } else {
      res.status(405).json({ error: "Method Not Allowed" });
    }
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
