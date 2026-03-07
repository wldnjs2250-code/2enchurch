import express from 'express';
import { createServer as createViteServer } from 'vite';
import Database from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const db = new Database('church.db');

/**
 * NOTE: To use NeonDB (Postgres), replace better-sqlite3 with 'pg' or '@neondatabase/serverless'.
 * Example:
 * import { neon } from '@neondatabase/serverless';
 * const sql = neon(process.env.DATABASE_URL);
 * 
 * Then update the API routes to use async/await with the sql client.
 */

// Initialize database
db.exec(`
  CREATE TABLE IF NOT EXISTS church_data (
    id TEXT PRIMARY KEY,
    content TEXT NOT NULL
  )
`);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.get('/api/data', (req, res) => {
    try {
      const row = db.prepare('SELECT content FROM church_data WHERE id = ?').get('main');
      if (row) {
        res.json(JSON.parse(row.content));
      } else {
        res.json(null);
      }
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch data' });
    }
  });

  app.post('/api/save', (req, res) => {
    try {
      const content = JSON.stringify(req.body);
      // Update vs Insert logic (Upsert)
      const stmt = db.prepare(`
        INSERT INTO church_data (id, content) VALUES (?, ?)
        ON CONFLICT(id) DO UPDATE SET content = excluded.content
      `);
      stmt.run('main', content);
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
