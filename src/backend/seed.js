// src/Backend/seed.js
import { sequelize } from './config/database.js';
import { Todo } from './models/Todo.js';

const seedDatabase = async () => {
  try {
    // Cek koneksi
    await sequelize.authenticate();
    console.log('🔌 Terhubung ke database...');

    // force: true akan MENGHAPUS tabel lama dan membuatnya lagi (Reset Data)
    await sequelize.sync({ force: true });
    console.log('🧹 Database lama dibersihkan.');

    // Masukkan Data Dummy & Simpan hasilnya ke variabel
    const createdTodos = await Todo.bulkCreate([
      {
        title: "Belajar Struktur Backend",
        description: "Memahami pemisahan routes, controller, dan model",
        completed: true
      },
      {
        title: "Setup Database SQLite",
        description: "Konfigurasi Sequelize dan koneksi database",
        completed: true
      },
      {
        title: "Testing API dengan Postman",
        description: "Coba endpoint GET, POST, PUT, DELETE",
        completed: false
      }
    ]);

    console.log("✅ Data dummy berhasil ditambahkan!");
    console.log("📊 Berikut data yang masuk ke database:");
    
    // Tampilkan data dalam format JSON yang mudah dibaca
    console.log(JSON.stringify(createdTodos, null, 2));

    process.exit(0); // Keluar sukses
  } catch (error) {
    console.error("❌ Gagal seeding database:", error);
    process.exit(1); // Keluar error
  }
};

seedDatabase();