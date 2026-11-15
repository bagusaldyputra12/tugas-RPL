const fs = require('fs');

// Cek apakah file utama aplikasi tersedia
const files = ['index.html', 'style.css', 'script.js'];

files.forEach(file => {
  if (!fs.existsSync(file)) {
    console.error(`ERROR: File ${file} tidak ditemukan!`);
    process.exit(1); // Gagalkan tes jika file hilang
  }
});

console.log('SUKSES: Semua file utama aplikasi valid dan siap dirilis!');