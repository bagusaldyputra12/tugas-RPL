# Sistem Pelaporan Kerusakan Fasilitas Alfamidi

Aplikasi web (HTML, CSS, JavaScript) untuk melaporkan dan mengelola kerusakan fasilitas gerai Alfamidi. Repositori ini dilengkapi pipeline **Continuous Integration (CI)** dengan GitHub Actions yang menguji setiap perubahan secara otomatis.

Tugas Team-Based Project (TBP) – Rekayasa Perangkat Lunak, Pertemuan 13 & 14 (Pemeliharaan Perangkat Lunak & DevOps).

## Menjalankan di komputer lokal

Prasyarat: Node.js 20+ (workflow CI memakai 20.x).

```bash
npm install   # install dependensi (proyek ini tidak punya dependensi runtime)
npm test      # menjalankan node test.js
```

Hasil yang diharapkan:

```
SUKSES: Semua file utama aplikasi valid dan siap dirilis!
```

Proyek ini aplikasi statis, jadi tidak ada langkah build dan lint (`npm run build` dan `npm run lint` dilewati dengan `--if-present`). Untuk membuka aplikasi, buka `index.html` di browser.

## Melihat hasil run

1. Buka tab **Actions** pada repository GitHub.
2. Pilih workflow **CI**, lalu klik salah satu run.
3. Centang hijau = semua langkah lulus; silang merah = ada langkah gagal (klik langkah untuk melihat log).

## Struktur proyek

```
.github/workflows/ci.yml          Workflow GitHub Actions
index.html, style.css, script.js  Aplikasi (UI dan logika)
test.js                           Automated test (memeriksa berkas utama aplikasi)
package.json                      Script npm (npm test)
alfamidi-vector-logo-seeklogo/    Aset logo
README.md                         Dokumentasi tugas TBP
```

## Dokumentasi tugas

- Laporan TBP (ringkasan error, langkah perbaikan, pembagian peran): _[tempel tautan laporan]_
- Run gagal dan run sukses: lihat bagian **3. Buktikan** di bawah.

---

## 1. Siapkan

Repository proyek berisi aplikasi web pelaporan kerusakan fasilitas gerai. Agar perintah test dapat berjalan secara lokal dan di CI, dipastikan:

- `package.json` memiliki script `test` yang menjalankan `node test.js`.
- `test.js` memeriksa bahwa `index.html`, `style.css`, dan `script.js` tersedia. Jika ada yang hilang, test keluar dengan exit code 1 sehingga CI gagal.
- Tidak ada dependensi tambahan, sehingga install hanya membutuhkan Node.js.

Bukti perintah berjalan lokal: `npm install && npm test` → `SUKSES: Semua file utama aplikasi valid dan siap dirilis!` (exit code 0).

## 2. Otomasikan

Workflow `.github/workflows/ci.yml` berjalan pada **push** dan **pull request**, dengan langkah: checkout → setup Node.js 20.x → install dependensi → build/lint (jika ada) → `npm test`.

Dua versi workflow dipakai untuk membuktikan CI.

**Versi gagal** (`npm ci` tanpa `package-lock.json`):

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

**Versi berhasil** (`npm install`):

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

## 3. Buktikan

| Run | Workflow | Hasil | Keterangan |
| --- | --- | --- | --- |
| #1 | CI (`npm ci`, `cache: 'npm'`) | Gagal | Berhenti di langkah Install dependensi: tidak ada `package-lock.json` |
| #2 | CI Pipeline (`npm install`) | Sukses | Install dan `npm test` lulus |

Tautan/screenshot run (isi setelah push):

- Run gagal: _[tempel URL run #1]_
- Run sukses: _[tempel URL run #2]_

## 4. Ringkasan error dan langkah perbaikan

**Gejala.** Langkah *Install dependensi* gagal dengan pesan:

```
npm error code EUSAGE
npm error
npm error The `npm ci` command can only install with an existing package-lock.json or
npm error npm-shrinkwrap.json with lockfileVersion >= 1. Run an install with npm@5 or
npm error later to generate a package-lock.json file, then try again.
```

**Penyebab.** Workflow memakai `npm ci`, yang mewajibkan `package-lock.json`, padahal berkas itu tidak ada di repository. Opsi `cache: 'npm'` pada `setup-node` juga membutuhkan lockfile.

**Dampak.** Pipeline berhenti di langkah install, sehingga Build, Lint, dan Test tidak dijalankan dan commit ditandai gagal.

**Perbaikan.**

1. Baca log langkah yang gagal di tab Actions dan temukan pesan `EUSAGE`.
2. Jalankan `npm ci` di lokal untuk mereproduksi masalah (hasilnya sama).
3. Ganti `ci.yml` dengan versi berhasil yang memakai `npm install`. Alternatif: buat lockfile dengan `npm install --package-lock-only` lalu commit `package-lock.json`.
4. Jalankan `npm test` di lokal (lulus), commit, dan push.
5. Pastikan run berikutnya di GitHub Actions berwarna hijau.

**Klasifikasi pemeliharaan.** *Corrective maintenance* (memperbaiki kesalahan yang teridentifikasi). `test.js` tetap menjadi test regresi: jika berkas utama hilang, CI gagal dengan pesan `ERROR: File <nama> tidak ditemukan!`.

## 5. Pembagian peran

| Anggota | NIM | Peran | Tugas |
| --- | --- | --- | --- |
| Bagus Aldy Putra | F5512510009 | Ketua / DevOps | Menulis workflow CI, mengelola repository dan push |
| Orlicon Yaleswira Widodo | F5512510004 | Developer | Memperbaiki workflow yang gagal, memelihara `test.js` dan `package.json` |
| Gracia Marselina | F5512510024 | QA / Dokumentasi | Menjalankan dan mendokumentasikan run gagal dan sukses, menulis README dan laporan |

## 6. Kesimpulan

Pipeline CI otomatis memeriksa setiap perubahan, sehingga masalah pada langkah install terdeteksi sejak push pertama, bukan setelah digabung ke `main`. Alurnya sesuai prinsip perubahan terkendali: catat isu, analisis akar masalah, perbaiki, uji, dan catat hasil.
