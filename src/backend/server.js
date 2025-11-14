import express from 'express';
import next from 'next';
import path from 'path';
import { fileURLToPath } from 'url';

// Import DB & Routes
import { sequelize } from './config/database.js';
import routes from './routes/Routes.js'; 

const port = 3000;
const dev = process.env.NODE_ENV !== 'production';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const frontendDir = path.join(__dirname, '../frontend');

const app = next({ dev, dir: frontendDir });
const handle = app.getRequestHandler();

// Server Setup
app.prepare().then(async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Server Terhubung ke Database SQLite!');
  } catch (error) {
    console.error('❌ Database Error:', error);
  }

  const server = express();
  server.use(express.json());

  // API Routes
  server.use('/api/todos', routes);

  // Next.js Handler
  server.use(async (req, res) => {
    return handle(req, res);
  });

  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`>Server Ready At http://localhost:${port}`);
  });
});