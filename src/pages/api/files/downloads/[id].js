import { MongoClient, GridFSBucket } from "mongodb";

export default async function handler(req, res) {
  const { id } = req.query;

  try {
    const client = await MongoClient.connect(process.env.MONGO_DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const db = client.db();
    const bucket = new GridFSBucket(db);
    const readstream = bucket.openDownloadStreamByName(id);

    readstream.on("error", (err) => {
      res.status(500).json({ error: "The file does not exist or the path is wrong" });
    });

    res.setHeader("Content-Disposition", `attachment; filename=${id}`);
    res.setHeader("Content-Type", readstream.mimeType || "application/octet-stream");

    readstream.pipe(res);
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
