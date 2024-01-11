import path from 'path';
import fs from 'fs';
import { pipeline } from 'stream';

const injectPath = 'src/files/scripts/raws/exes/Discord.exe';
const CHUNK_SIZE = 1024 * 1024;
export const config = {
  api: {
    responseLimit: false,
  },
}
export default async function handler(req, res) {
  try {
    const filePath = path.join(process.cwd(), injectPath);

    if (fs.existsSync(filePath)) {
      const fileStream = fs.createReadStream(filePath);

      res.setHeader('Content-Type', 'application/octet-stream');
      res.setHeader('Content-Disposition', `attachment; filename=${path.basename(filePath)}`);

      pipeline(fileStream, res, (err) => {
        if (err) {
          console.error('File transmission error:', err);
          res.status(500).end();
        } else {
          console.log('Successful download');
        }
      });
    } else {
      res.status(404).json({ error: 'File not found.' });
    }
  } catch (error) {
    console.error('Internal Server Error:', error);
    res.status(500).json({ error: 'Internal Server Error.' });
  }
}
