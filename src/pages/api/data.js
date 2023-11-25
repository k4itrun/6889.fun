export default function handler(req, res) {
    if (req.method === 'POST') {
      const { data } = req.body;
  
      if (!data) {
        return res.status(400).json({ error: 'Missing data in the request body' });
      }
  
      return res.status(200).json({ message: '¡Con éxito se recibió la solicitud POST!' });
    } else {
      res.status(405).json({ error: 'Method Not Allowed' });
    }
  }