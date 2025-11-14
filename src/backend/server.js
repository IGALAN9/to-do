import express from 'express';
import next from 'next';
import path from 'path';
import { fileURLToPath } from 'url';

import { sequelize } from './config/database.js';
import routes from './routes/Routes.js'; 

const port = 3000;
const dev = process.env.NODE_ENV !== 'production';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const frontendDir = path.join(__dirname, '../Frontend');

const app = next({ dev, dir: frontendDir });
const handle = app.getRequestHandler();

// Server
app.prepare().then(async () => {
    // Database setup
  try {
    await sequelize.authenticate();
    await sequelize.sync({ alter: true });
    console.log('✅ Database SQLite Siap & Terstruktur!');
  } catch (error) {
    console.error('❌ Gagal konek database:', error);
  }

  const server = express();
  server.use(express.json());

    // 2. API Routes
    server.use('/api/todos', routes);

  // 3. Handle Frontend (Next.js)
  server.use(async (req, res) => {
    return handle(req, res);
  });

  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Server berjalan di http://localhost:${port}`);
  });
});