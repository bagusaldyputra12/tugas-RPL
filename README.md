# Sistem Pelaporan Kerusakan Fasilitas Alfamidi

Aplikasi web (HTML, CSS, JavaScript) untuk melaporkan dan mengelola kerusakan fasilitas gerai Alfamidi. Repositori ini dilengkapi pipeline **Continuous Integration (CI)** dengan GitHub Actions yang menguji setiap perubahan secara otomatis.

Tugas Team-Based Project (TBP) – Rekayasa Perangkat Lunak, Pertemuan 13 & 14 (Pemeliharaan Perangkat Lunak & DevOps).

## Struktur Singkat

| Berkas | Fungsi |
| --- | --- |
| `index.html`, `style.css`, `script.js` | Berkas utama aplikasi |
| `test.js` | Automated test: memastikan berkas utama aplikasi tersedia |
| `package.json` | Perintah proyek (`npm test` menjalankan `node test.js`) |
| `.github/workflows/ci.yml` | Workflow CI GitHub Actions |

## 1. Siapkan: Jalankan Test Secara Lokal

Prasyarat: **Node.js 20.x** dan npm.

```bash
npm install   # memasang dependensi (proyek ini tidak memiliki dependensi eksternal)
npm test      # menjalankan node test.js
```

Hasil yang diharapkan:

```
SUKSES: Semua file utama aplikasi valid dan siap dirilis!
```

## 2. Otomasikan: Workflow CI

Workflow disimpan di `.github/workflows/ci.yml`. Tahapan CI yang dijalankan runner:

1. **Trigger**: event `push` / `pull_request`
2. **Checkout repository**: `actions/checkout`
3. **Setup Node.js 20.x**: `actions/setup-node`
4. **Install dependensi**: `npm install` (atau `npm ci`)
5. **Automated test**: `npm test`

Job `test` berjalan pada runner `ubuntu-latest`. Jika salah satu langkah gagal, pipeline berhenti dan commit ditandai gagal.

## 3. Buktikan: Pengetesan CI Berhasil dan Gagal

Dua versi `ci.yml` dipakai untuk membuktikan CI. Keduanya menjalankan perintah yang sama (`npm test`), perbedaannya ada pada cara install dependensi.

### A. CI Berhasil

```yaml
name: CI Pipeline

on:
  push:
    branches: { main }
  pull_request:
    branches: { main }
  workflow_dispatch:

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Repository
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20.x'

      - name: Install Dependencies
        run: npm install

      - name: Run Automated Test
        run: npm test
```

Penjelasan:
- Berjalan pada `push` dan `pull_request` ke branch `main`, serta manual lewat `workflow_dispatch` (tombol *Run workflow* di tab Actions).
- Memakai `npm install`, yang tidak membutuhkan `package-lock.json`, sehingga langkah install selalu lolos.
- Langkah *Run Automated Test* menjalankan `npm test` dan mencetak `SUKSES: Semua file utama aplikasi valid dan siap dirilis!`.

### B. CI Gagal

```yaml
name: CI

on:
  push:
  pull_request:

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v6

      - uses: actions/setup-node@v7
        with:
          node-version: '20.x'
          cache: 'npm'

      - name: Install dependensi
        run: npm ci

      - name: Build
        run: npm run build --if-present
      - name: Lint
        run: npm run lint --if-present

      - name: Test
        run: npm test
```

Penyebab kegagalan:
- Repositori tidak memiliki `package-lock.json`, padahal `npm ci` mewajibkannya (diuji lokal: `npm ci` berhenti dengan `npm error code EUSAGE`). Opsi `cache: 'npm'` pada `setup-node` juga membutuhkan lockfile.
- Akibatnya pipeline berhenti di langkah **Install dependensi** dan langkah Build, Lint, dan Test tidak sempat berjalan.

### C. Perbaikan

Ganti isi `ci.yml` dengan versi **CI Berhasil** (memakai `npm install`). Alternatif lain: buat lockfile dengan `npm install --package-lock-only`, lalu commit `package-lock.json` agar `npm ci` bisa berjalan.

## Cara Menjalankan dan Melihat Hasil CI

1. Simpan workflow sebagai `.github/workflows/ci.yml`, lalu push:
   ```bash
   git add .
   git commit -m "pesan perubahan"
   git push origin main
   ```
2. Buka tab **Actions** di repositori: <https://github.com/bagusaldyputra12/tugas-RPL/actions>
3. Pilih run terbaru, lalu lihat status tiap langkah (centang hijau = sukses, tanda silang merah = gagal).
4. Jika gagal: baca log langkah yang berhenti, perbaiki, jalankan `npm test` di lokal, lalu push ulang.

## Menganalisis Pipeline Gagal

| Jenis kegagalan | Yang diperiksa |
| --- | --- |
| Install gagal | Keberadaan `package-lock.json`, versi Node, registry, konfigurasi dependensi |
| Test gagal | Pesan error dari `test.js` (misalnya `ERROR: File style.css tidak ditemukan!`) dan perubahan yang memicunya |
| Permission gagal | Izin workflow, environment, dan secret |

## Bukti Run CI

| Run | Workflow | Hasil | Bukti |
| --- | --- | --- | --- |
| 1 | CI (versi gagal, `npm ci`) | Gagal di langkah Install dependensi | _(tempel screenshot / URL run)_ |
| 2 | CI Pipeline (versi berhasil, `npm install`) | Berhasil | _(tempel screenshot / URL run)_ |

## Tim dan Pembagian Peran

| Nama | Peran |
| --- | --- |
| _(isi nama anggota)_ | _(mis. penulis workflow CI)_ |
| _(isi nama anggota)_ | _(mis. penulis test dan dokumentasi)_ |
| _(isi nama anggota)_ | _(mis. .......)_ |
