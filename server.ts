import express from 'express';
import pg from 'pg';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pg;

// Helper to get __dirname in ESM
const getDirname = () => {
  try {
    const __filename = fileURLToPath(import.meta.url);
    return path.dirname(__filename);
  } catch (e) {
    return process.cwd();
  }
};

const __dirname = getDirname();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.DATABASE_URL?.includes('localhost') ? false : {
    rejectUnauthorized: false
  }
});

// Initialize database
async function initDb() {
  if (!process.env.DATABASE_URL) {
    console.error('CRITICAL: DATABASE_URL environment variable is missing.');
    console.error('Please add DATABASE_URL to your environment variables/secrets.');
    return;
  }

  try {
    const client = await pool.connect();
    try {
      await client.query(`
        CREATE TABLE IF NOT EXISTS church_data (
          id TEXT PRIMARY KEY,
          content TEXT NOT NULL
        )
      `);
      console.log('Database initialized successfully');
    } finally {
      client.release();
    }
  } catch (err) {
    console.error('Failed to connect to the database. Check if DATABASE_URL is correct.');
    console.error('Error details:', err instanceof Error ? err.message : err);
  }
}

initDb().catch(err => console.error('DB Init Error:', err));

export async function createServer() {
  const app = express();
  app.use(express.json());

  // API Routes
  app.get('/api/data', async (req, res) => {
    if (!process.env.DATABASE_URL) {
      return res.status(500).json({ error: 'DATABASE_URL is not configured' });
    }
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
    if (!process.env.DATABASE_URL) {
      return res.status(500).json({ error: 'DATABASE_URL is not configured' });
    }
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
  if (process.env.NODE_ENV !== 'production' && !process.env.NETLIFY) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else if (!process.env.NETLIFY) {
    // Standard production server (not Netlify)
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  return app;
}

if (process.env.NODE_ENV !== 'production' && !process.env.NETLIFY) {
  createServer().then(app => {
    const PORT = 3000;
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  });
}
