import axios from 'axios';

export default async function handler(req, res) {
  try {
    const response = await axios.get('http://localhost:3001/people');
    res.status(response.status).json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
