import express from 'express';
import { createServer as createViteServer } from 'vite';
import pg from 'pg';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pg;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

// Initialize database
async function initDb() {
  const client = await pool.connect();
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS church_data (
        id TEXT PRIMARY KEY,
        content TEXT NOT NULL
      )
    `);
  } finally {
    client.release();
  }
}

initDb().catch(err => console.error('DB Init Error:', err));

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.get('/api/data', async (req, res) => {
    try {
      const result = await pool.query('SELECT content FROM church_data WHERE id = $1', ['main']);
      if (result.rows.length > 0) {
        res.json(JSON.parse(result.rows[0].content));
      } else {
        res.json(null);
      }
    } catch (error) {
      console.error('Fetch error:', error);
      res.status(500).json({ error: 'Failed to fetch data' });
    }
  });

  app.post('/api/save', async (req, res) => {
    try {
      const content = JSON.stringify(req.body);
      await pool.query(`
        INSERT INTO church_data (id, content) VALUES ($1, $2)
        ON CONFLICT(id) DO UPDATE SET content = EXCLUDED.content
      `, ['main', content]);
      res.json({ success: true });
    } catch (error) {
      console.error('Save error:', error);
      res.status(500).json({ error: 'Failed to save data' });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
