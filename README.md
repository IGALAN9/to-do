## Mulai aplikasi

```bash

npm install

npm run seed (database akan terbuat dari sini)

npm run dev

```

## Design decisions

Tech Stack
SERN = SQLite + Express + React + Node

Monolithic with Custom Server

File server.js bertindak sebagai pintu gerbang utama. Ia menjalankan Express.js untuk menangani request API (/api/todos), dan menyerahkan sisa request lainnya ke Next.js (app.getRequestHandler()) untuk merender halaman web.

Kepraktisan. hanya perlu satu terminal (npm run dev) dan satu port (3000) untuk menjalankan aplikasi full-stack. Tidak perlu mengatur CORS karena domain dan port-nya sama.

Explicit Separation (Frontend vs Backend)

Membuat folder src/frontend untuk Next.js dan src/backend untuk Express/Sequelize.

API Design: Modular REST API

Routing: Logika API dipisahkan ke file src/backend/routes/Routes.js, tidak ditumpuk di server.js. Ini membuat kode lebih bersih dan mudah dibaca.

## Possible improvements

Search and filter

Untuk mencari tugas berdasarkan judul, tambahkan input search bar. Tambahkan juga filter tab: "Semua", "Aktif", dan "Selesai".

Tenggat Waktu (Due Dates)

Jika tugas sudah lewat tenggat waktu, indikator warna akan muncul.
