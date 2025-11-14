import { sequelize } from './config/database.js';
import { Todo } from './models/Todo.js';

const seedDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log('🔌 Terhubung ke database...');

    await sequelize.sync({ force: true });
    console.log('🧹 Database lama dibersihkan.');

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
    
    // console.log(JSON.stringify(createdTodos, null, 2));

    process.exit(0); 
  } catch (error) {
    console.error("❌ Gagal seeding database:", error);
    process.exit(1); 
  }
};

seedDatabase();