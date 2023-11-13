import { join } from 'path';
import { createReadStream } from 'fs';

export default function handler(req, res) {
  const { id } = req.query;

  if (!id) {
    res.status(400).json({ error: 'ID is required' });
    return;
  }

  const _image = join(process.cwd(), `src/public/avatars/${id}.png`);
  const _stream = createReadStream(_image);

  _stream.on('error', () => {
    res.status(404).json({ error: 'Image not found' });
  });
  _stream.pipe(res);
}
