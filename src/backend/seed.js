import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process'; 
import { fileURLToPath } from 'url';
import { sequelize } from './config/database.js';
import { Todo } from './models/Todo.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dbFilePath = path.join(__dirname, '../../../database.sqlite');

const run = async () => {
  try {
    console.log('🚀 Memulai Setup Database...');

    // 1. Cek File Database
    if (!fs.existsSync(dbFilePath)) {
      console.log('File database belum ada. Membuat baru...');
      fs.writeFileSync(dbFilePath, ''); 
    } else {
      console.log('File database ditemukan. Mereset isinya...');
    }

    // 2. Jalankan Migrasi via CLI (Ini akan membuat tabel)
    console.log('Menjalankan Migrasi (Membuat Tabel)...');
    try {
      execSync('npx sequelize-cli db:migrate:undo:all', { stdio: 'inherit' });
      execSync('npx sequelize-cli db:migrate', { stdio: 'inherit' });
    } catch (err) {
      console.error('Gagal saat migrasi CLI. Pastikan .sequelizerc benar.');
      process.exit(1);
    }

    console.log('Mengisi Data Dummy...');
    await Todo.bulkCreate([
      {
        title: "Test 1",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
        completed: true
      },
      {
        title: "Test 2",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
        completed: true
      },
      {
        title: "Test 3",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
        completed: true
      },
      {
        title: "Test 4",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
        completed: false
      }
    ]);

    console.log('Database siap digunakan.');
    process.exit(0);

  } catch (error) {
    console.error('Terjadi Error:', error);
    process.exit(1);
  }
};

run();