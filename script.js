// Pengaman: aplikasi tetap berjalan normal jika CDN Lucide / Chart.js gagal dimuat
if (typeof window.lucide === 'undefined') {
    window.lucide = { createIcons() {} };
    console.warn('Lucide Icons gagal dimuat, ikon tidak ditampilkan.');
}
if (typeof window.Chart === 'undefined') {
    window.Chart = function () { this.destroy = function () {}; };
    console.warn('Chart.js gagal dimuat, grafik tidak ditampilkan.');
}

// Default Seed Database
const DEFAULT_USERS = [
    { id: 'USR-001', name: 'Rizky Admin Pusat', email: 'admin@alfamidi.com', password: 'admin123', role: 'Admin', outlet: 'Head Office', status: 'Aktif' },
    { id: 'USR-002', name: 'Dewi Pegawai Tondo', email: 'pegawai@alfamidi.com', password: 'pegawai123', role: 'Pelapor', outlet: 'Alfamidi Tondo', status: 'Aktif' },
    { id: 'USR-003', name: 'Budi Santoso (AC & Electricity)', email: 'teknisi@alfamidi.com', password: 'teknisi123', role: 'Teknisi', outlet: 'Area Palu', status: 'Aktif', spec: 'Pendingin & Kelistrikan' },
    { id: 'USR-004', name: 'Andi Wijaya (IT & Kasir)', email: 'andi@alfamidi.com', password: 'teknisi123', role: 'Teknisi', outlet: 'Area Palu', status: 'Aktif', spec: 'Komputer Kasir & CCTV' }
];

const DEFAULT_OUTLETS = [
    { id: 'ALF-001', name: 'Alfamidi Tondo', address: 'Jl. Soekarno Hatta No. 45', subdistrict: 'Mantikulore', city: 'Palu', status: 'Operasional' },
    { id: 'ALF-002', name: 'Alfamidi Palu Barat', address: 'Jl. Hasanuddin No. 12', subdistrict: 'Palu Barat', city: 'Palu', status: 'Operasional' },
    { id: 'ALF-003', name: 'Alfamidi Tatanga', address: 'Jl. I Gusti Ngurah Rai No. 88', subdistrict: 'Tatanga', city: 'Palu', status: 'Operasional' },
    { id: 'ALF-004', name: 'Alfamidi Sisingamangaraja', address: 'Jl. Sisingamangaraja No. 20', subdistrict: 'Palu Timur', city: 'Palu', status: 'Operasional' }
];

const DEFAULT_FACILITIES = [
    { id: 'FAS-001', name: 'AC Split Standing 5PK', category: 'Pendingin / AC', condition: 'Perlu Perawatan', location: 'Area Kasir' },
    { id: 'FAS-002', name: 'POS Kasir Main PC #1', category: 'Komputer Kasir', condition: 'Normal', location: 'Meja Kasir 1' },
    { id: 'FAS-003', name: 'Rak Gondola Display A2', category: 'Rak Barang', condition: 'Rusak Ringan', location: 'Lorong Snack' },
    { id: 'FAS-004', name: 'Genset Silent 15 KVA', category: 'Instalasi Listrik', condition: 'Normal', location: 'Ruang Utility' },
    { id: 'FAS-005', name: 'CCTV Dome Outdoor 4K', category: 'CCTV', condition: 'Normal', location: 'Parkiran Depan' }
];

const DEFAULT_REPORTS = [
    {
        id: 'LAP-001',
        outletName: 'Alfamidi Tondo',
        reporterName: 'Dewi Pegawai Tondo',
        facilityName: 'AC Split Standing 5PK',
        category: 'Pendingin / AC',
        damageType: 'Tidak menyala',
        priority: 'Tinggi',
        description: 'AC area kasir mati total, indikator power berkedip merah dan mengeluarkan bau hangus.',
        photo: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=600&q=80',
        repairPhoto: '',
        status: 'Diproses',
        technicianId: 'USR-003',
        technicianName: 'Budi Santoso',
        technicianNotes: 'Sedang dilakukan pengecekan kabel modul inverter AC.',
        date: '2026-09-16 08:30',
        timeline: [
            { status: 'Laporan Dibuat', date: '2026-09-16 08:30', note: 'Dilaporkan oleh Dewi Pegawai Tondo' },
            { status: 'Diverifikasi', date: '2026-09-16 09:00', note: 'Laporan terverifikasi valid oleh Admin' },
            { status: 'Teknisi Ditugaskan', date: '2026-09-16 09:15', note: 'Ditugaskan kepada Budi Santoso' },
            { status: 'Diproses', date: '2026-09-16 10:00', note: 'Teknisi telah berada di lokasi gerai' }
        ]
    },
    {
        id: 'LAP-002',
        outletName: 'Alfamidi Palu Barat',
        reporterName: 'Ahmad Kasir',
        facilityName: 'POS Kasir Main PC #1',
        category: 'Komputer Kasir',
        damageType: 'Gangguan software',
        priority: 'Darurat',
        description: 'Barcode scanner & layar kasir freeze saat transaksi puncak pagi.',
        photo: 'https://images.unsplash.com/photo-1556742049-0a670f4a4591?auto=format&fit=crop&w=600&q=80',
        repairPhoto: '',
        status: 'Diverifikasi',
        technicianId: 'USR-004',
        technicianName: 'Andi Wijaya',
        technicianNotes: 'Menunggu teknisi meluncur ke lokasi.',
        date: '2026-09-17 11:15',
        timeline: [
            { status: 'Laporan Dibuat', date: '2026-09-17 11:15', note: 'Laporan diterima' },
            { status: 'Diverifikasi', date: '2026-09-17 11:30', note: 'Diverifikasi Admin' }
        ]
    },
    {
        id: 'LAP-003',
        outletName: 'Alfamidi Tatanga',
        reporterName: 'Siti Store Boy',
        facilityName: 'Rak Gondola Display A2',
        category: 'Rak Barang',
        damageType: 'Rusak fisik',
        priority: 'Sedang',
        description: 'Penyangga rak bagian bawah bengkok akibat tertimpa dus minuman kaleng.',
        photo: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80',
        repairPhoto: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80',
        status: 'Selesai',
        technicianId: 'USR-003',
        technicianName: 'Budi Santoso',
        technicianNotes: 'Siku penyangga rak telah diganti dengan sparepart baru.',
        date: '2026-09-12 14:00',
        timeline: [
            { status: 'Laporan Dibuat', date: '2026-09-12 14:00', note: 'Laporan dibuat' },
            { status: 'Diverifikasi', date: '2026-09-12 14:30', note: 'Verified' },
            { status: 'Teknisi Ditugaskan', date: '2026-09-12 15:00', note: 'Ditugaskan' },
            { status: 'Diproses', date: '2026-09-13 09:00', note: 'Pengerjaan' },
            { status: 'Selesai', date: '2026-09-13 11:30', note: 'Perbaikan selesai tuntas' }
        ]
    }
];

function getDB(key, defaultVal) {
    const data = localStorage.getItem('alfamidi_' + key);
    return data ? JSON.parse(data) : defaultVal;
}

let lastSeenVersion = '';

function setDB(key, val) {
    try {
        localStorage.setItem('alfamidi_' + key, JSON.stringify(val));
        // Penanda versi data: dipakai polling untuk mendeteksi perubahan dari tab/sesi lain
        const version = Date.now() + '-' + Math.random().toString(36).slice(2, 7);
        localStorage.setItem('alfamidi_data_version', version);
        lastSeenVersion = version;
        return true;
    } catch (err) {
        const isQuota = err && (err.name === 'QuotaExceededError' || err.name === 'NS_ERROR_DOM_QUOTA_REACHED' || err.code === 22 || err.code === 1014);
        showToast(isQuota
            ? 'Penyimpanan browser penuh. Gunakan foto yang lebih kecil atau hapus data lama.'
            : 'Gagal menyimpan data ke penyimpanan browser.', 'error');
        return false;
    }
}

// ===== Pembuatan ID unik berbasis counter persisten =====
function parseIdNumber(id) {
    const m = String(id || '').match(/(\d+)$/);
    return m ? parseInt(m[1], 10) : 0;
}

function getIdCounter(name, list) {
    const stored = parseInt(localStorage.getItem('alfamidi_counter_' + name) || '0', 10) || 0;
    const maxExisting = list.reduce((mx, item) => Math.max(mx, parseIdNumber(item.id)), 0);
    // Selalu ambil nilai terbesar, sehingga ID tidak pernah dipakai ulang walau data dihapus
    return Math.max(stored, maxExisting);
}

function formatId(prefix, num) {
    return prefix + '-' + String(num).padStart(3, '0');
}

// Hanya melihat ID berikutnya (untuk tampilan), tidak menggunakannya
function peekNextId(prefix, name, list) {
    return formatId(prefix, getIdCounter(name, list) + 1);
}

// Memakai ID berikutnya dan menyimpan counter secara permanen
function reserveNextId(prefix, name, list) {
    const next = getIdCounter(name, list) + 1;
    try { localStorage.setItem('alfamidi_counter_' + name, String(next)); } catch (err) { /* counter tetap aman karena dibandingkan dengan ID tertinggi */ }
    return formatId(prefix, next);
}

// ===== Normalisasi teks untuk pencarian =====
function normalizeText(value) {
    return String(value ?? '').replace(/\s+/g, ' ').trim().toLowerCase();
}

// ===== Validasi & kompresi gambar (HTML5 Canvas) =====
const IMAGE_MAX_FILE_MB = 10;      // batas ukuran file asli
const IMAGE_MAX_DIMENSION = 1280;  // sisi terpanjang hasil kompresi (px)
const IMAGE_TARGET_KB = 250;       // target ukuran hasil kompresi

function compressImage(file) {
    return new Promise((resolve, reject) => {
        if (!file.type || !file.type.startsWith('image/')) {
            return reject(new Error('File harus berupa gambar (JPG, PNG, atau WEBP).'));
        }
        if (file.size > IMAGE_MAX_FILE_MB * 1024 * 1024) {
            return reject(new Error(`Ukuran foto terlalu besar. Maksimal ${IMAGE_MAX_FILE_MB} MB.`));
        }

        const objectUrl = URL.createObjectURL(file);
        const img = new Image();
        img.onerror = () => {
            URL.revokeObjectURL(objectUrl);
            reject(new Error('File gambar tidak valid atau rusak.'));
        };
        img.onload = () => {
            URL.revokeObjectURL(objectUrl);
            let scale = Math.min(1, IMAGE_MAX_DIMENSION / Math.max(img.width, img.height));
            let dataUrl = '';

            for (let attempt = 0; attempt < 4; attempt++) {
                const width = Math.max(1, Math.round(img.width * scale));
                const height = Math.max(1, Math.round(img.height * scale));
                const canvas = document.createElement('canvas');
                canvas.width = width;
                canvas.height = height;
                const ctx = canvas.getContext('2d');
                ctx.fillStyle = '#ffffff'; // latar putih agar PNG transparan tidak menjadi hitam
                ctx.fillRect(0, 0, width, height);
                ctx.drawImage(img, 0, 0, width, height);

                let quality = 0.8;
                dataUrl = canvas.toDataURL('image/jpeg', quality);
                while (dataUrl.length * 0.75 > IMAGE_TARGET_KB * 1024 && quality > 0.4) {
                    quality -= 0.1;
                    dataUrl = canvas.toDataURL('image/jpeg', quality);
                }
                if (dataUrl.length * 0.75 <= IMAGE_TARGET_KB * 1024) break;
                scale *= 0.8; // masih terlalu besar: perkecil dimensi lalu coba lagi
            }
            resolve(dataUrl);
        };
        img.src = objectUrl;
    });
}

function formatDataUrlSize(dataUrl) {
    const kb = Math.round(dataUrl.length * 0.75 / 1024);
    return kb >= 1024 ? (kb / 1024).toFixed(1) + ' MB' : kb + ' KB';
}

function initDataStore() {
    if (!localStorage.getItem('alfamidi_users')) setDB('users', DEFAULT_USERS);
    if (!localStorage.getItem('alfamidi_outlets')) setDB('outlets', DEFAULT_OUTLETS);
    if (!localStorage.getItem('alfamidi_facilities')) setDB('facilities', DEFAULT_FACILITIES);
    if (!localStorage.getItem('alfamidi_reports')) setDB('reports', DEFAULT_REPORTS);
    if (!localStorage.getItem('alfamidi_notifications')) setDB('notifications', [
        { id: 1, title: 'Laporan Baru', text: 'LAP-002 membutuhkan penugasan teknisi.', time: '10 menit lalu', read: false, role: 'Admin' },
        { id: 2, title: 'Tugas Perbaikan', text: 'Anda ditugaskan ke laporan LAP-001.', time: '1 jam lalu', read: false, role: 'Teknisi' }
    ]);
}

let currentUser = null;
let activePage = 'dashboard';
let chartsInstance = {};

// DOM Ready Load
window.addEventListener('DOMContentLoaded', () => {
    initDataStore();
    checkSession();
    lucide.createIcons();
    initResponsiveTables();
    initLiveSync();
    
    // Apply saved dark mode preference
    if (localStorage.getItem('alfamidi_theme') === 'dark') {
        document.documentElement.classList.add('dark');
        document.documentElement.classList.remove('light');
        updateThemeIcon(true);
    }
});

// Fungsi untuk toggle tampil/sembunyi password
function togglePasswordVisibility() {
    const passwordInput = document.getElementById('login-password');
    const toggleBtn = document.getElementById('toggle-password-btn');
    const show = passwordInput.type === 'password';

    passwordInput.type = show ? 'text' : 'password';
    // Ganti ikon dengan elemen baru agar Lucide selalu merender ulang dengan benar
    toggleBtn.innerHTML = `<i data-lucide="${show ? 'eye' : 'eye-off'}" class="w-4 h-4"></i>`;
    lucide.createIcons();
}

function handleLogin(e) {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    const users = getDB('users', DEFAULT_USERS);
    const user = users.find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === password);

    if (user) {
        currentUser = user;
        localStorage.setItem('alfamidi_session', JSON.stringify(user));
        showToast(`Selamat datang kembali, ${user.name}!`, 'success');
        renderAppLayout();
    } else {
        showToast('Email atau password tidak valid!', 'error');
    }
}

function checkSession() {
    const savedSession = localStorage.getItem('alfamidi_session');
    if (savedSession) {
        currentUser = JSON.parse(savedSession);
        renderAppLayout();
    } else {
        document.getElementById('login-view').classList.remove('hidden');
        document.getElementById('app-view').classList.add('hidden');
    }
}

function logout() {
    localStorage.removeItem('alfamidi_session');
    currentUser = null;
    document.getElementById('login-view').classList.remove('hidden');
    document.getElementById('app-view').classList.add('hidden');
    showToast('Anda telah keluar dari sistem.', 'info');
}

function renderAppLayout() {
    document.getElementById('login-view').classList.add('hidden');
    document.getElementById('app-view').classList.remove('hidden');

    // Set user profile specs
    document.getElementById('user-display-name').textContent = currentUser.name;
    document.getElementById('user-display-outlet').textContent = currentUser.outlet || 'Alfamidi Store';
    document.getElementById('user-avatar').textContent = currentUser.name.charAt(0).toUpperCase();
    
    const roleLabel = document.getElementById('sidebar-role-label');
    const topRoleBadge = document.getElementById('top-role-badge');
    roleLabel.textContent = currentUser.role;
    topRoleBadge.textContent = currentUser.role;

    // Render Dynamic Sidebar Menu
    renderSidebarMenu();
    renderNotifications();
    
    // Navigate to initial default page
    navigateTo('dashboard');
}

function renderSidebarMenu() {
    const nav = document.getElementById('sidebar-menu');
    let items = [];

    if (currentUser.role === 'Pelapor') {
        items = [
            { id: 'dashboard', label: 'Dashboard', icon: 'layout-dashboard' },
            { id: 'buat-laporan', label: 'Buat Laporan', icon: 'plus-circle' },
            { id: 'laporan-saya', label: 'Laporan Saya', icon: 'file-text' },
            { id: 'profil', label: 'Profil Saya', icon: 'user' }
        ];
    } else if (currentUser.role === 'Admin') {
        items = [
            { id: 'dashboard', label: 'Dashboard', icon: 'layout-dashboard' },
            { id: 'kelola-laporan', label: 'Kelola Laporan', icon: 'clipboard-list' },
            { id: 'data-master', label: 'Data Master', icon: 'database' },
            { id: 'statistik', label: 'Statistik & Analisis', icon: 'bar-chart-3' },
            { id: 'profil', label: 'Profil Saya', icon: 'user' }
        ];
    } else if (currentUser.role === 'Teknisi') {
        items = [
            { id: 'dashboard', label: 'Dashboard', icon: 'layout-dashboard' },
            { id: 'tugas-saya', label: 'Tugas Saya', icon: 'wrench' },
            { id: 'riwayat-tugas', label: 'Riwayat Penanganan', icon: 'history' },
            { id: 'profil', label: 'Profil Saya', icon: 'user' }
        ];
    }

    nav.innerHTML = items.map(item => `
        <button onclick="navigateTo('${item.id}')" class="sidebar-item w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl text-xs font-medium transition ${activePage === item.id ? 'bg-red-600 text-white shadow-md' : 'text-slate-800 hover:bg-slate-100 hover:text-slate-900'}">
            <i data-lucide="${item.icon}" class="w-4 h-4"></i>
            <span>${item.label}</span>
        </button>
    `).join('');

    lucide.createIcons();
}

function navigateTo(pageId) {
    activePage = pageId;
    lastSeenVersion = localStorage.getItem('alfamidi_data_version') || '';
    renderSidebarMenu();

    const titleMap = {
        'dashboard': 'Dashboard Ringkasan',
        'buat-laporan': 'Form Pelaporan Kerusakan Fasilitas',
        'laporan-saya': 'Daftar Laporan Kerusakan',
        'kelola-laporan': 'Manajemen Laporan Kerusakan',
        'data-master': 'Pengelolaan Data Master',
        'statistik': 'Statistik & Laporan Analitik',
        'tugas-saya': 'Daftar Tugas Perbaikan Teknisi',
        'riwayat-tugas': 'Riwayat Selesai Perbaikan',
        'profil': 'Profil & Pengaturan Akun'
    };

    document.getElementById('page-title').textContent = titleMap[pageId] || 'Sistem Informasi';
    
    const content = document.getElementById('main-content');
    
    // Render specific page views
    if (pageId === 'dashboard') renderDashboardPage(content);
    else if (pageId === 'buat-laporan') renderBuatLaporanPage(content);
    else if (pageId === 'laporan-saya' || pageId === 'kelola-laporan') renderLaporanListPage(content);
    else if (pageId === 'data-master') renderDataMasterPage(content);
    else if (pageId === 'statistik') renderStatistikPage(content);
    else if (pageId === 'tugas-saya' || pageId === 'riwayat-tugas') renderTeknisiTasksPage(content);
    else if (pageId === 'profil') renderProfilPage(content);

    // Close mobile sidebar if open
    document.getElementById('app-sidebar').classList.add('-translate-x-full');
    document.getElementById('sidebar-overlay').classList.add('hidden');
    
    lucide.createIcons();
}

function renderDashboardPage(container) {
    const reports = getDB('reports', DEFAULT_REPORTS);
    
    // Filter user role view data
    let userReports = reports;
    if (currentUser.role === 'Pelapor') {
        userReports = reports.filter(r => r.outletName === currentUser.outlet || r.reporterName === currentUser.name);
    } else if (currentUser.role === 'Teknisi') {
        userReports = reports.filter(r => r.technicianId === currentUser.id);
    }

    const total = userReports.length;
    const baru = userReports.filter(r => r.status === 'Baru / Menunggu' || r.status === 'Diverifikasi').length;
    const diproses = userReports.filter(r => r.status === 'Diproses' || r.status === 'Teknisi Ditugaskan' || r.status === 'Menunggu Suku Cadang').length;
    const selesai = userReports.filter(r => r.status === 'Selesai').length;

    container.innerHTML = `
        <!-- Statistics Cards Grid -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div class="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between">
                <div>
                    <p class="text-xs font-semibold text-slate-500 dark:text-slate-400">Total Laporan</p>
                    <h3 class="text-2xl font-bold text-slate-800 dark:text-white mt-1">${total}</h3>
                </div>
                <div class="p-3 bg-blue-50 dark:bg-blue-900/30 text-slate-900 dark:text-white rounded-xl">
                    <i data-lucide="file-text" class="w-6 h-6"></i>
                </div>
            </div>

            <div class="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between">
                <div>
                    <p class="text-xs font-semibold text-slate-500 dark:text-slate-400">Laporan Baru / Menunggu</p>
                    <h3 class="text-2xl font-bold text-amber-600 dark:text-amber-400 mt-1">${baru}</h3>
                </div>
                <div class="p-3 bg-amber-50 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 rounded-xl">
                    <i data-lucide="clock" class="w-6 h-6"></i>
                </div>
            </div>

            <div class="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between">
                <div>
                    <p class="text-xs font-semibold text-slate-500 dark:text-slate-400">Sedang Diproses</p>
                    <h3 class="text-2xl font-bold text-slate-900 dark:text-white mt-1">${diproses}</h3>
                </div>
                <div class="p-3 bg-sky-50 dark:bg-sky-900/30 text-slate-900 dark:text-white rounded-xl">
                    <i data-lucide="wrench" class="w-6 h-6"></i>
                </div>
            </div>

            <div class="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between">
                <div>
                    <p class="text-xs font-semibold text-slate-500 dark:text-slate-400">Selesai Ditangani</p>
                    <h3 class="text-2xl font-bold text-emerald-600 dark:text-emerald-400 mt-1">${selesai}</h3>
                </div>
                <div class="p-3 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-xl">
                    <i data-lucide="check-circle" class="w-6 h-6"></i>
                </div>
            </div>
        </div>

        <!-- Quick Actions Banner for Pelapor -->
        ${currentUser.role === 'Pelapor' ? `
            <div class="bg-gradient-to-r from-brand-blue to-brand-darkblue rounded-2xl p-6 text-white shadow-lg flex flex-col md:flex-row items-center justify-between gap-4">
                <div>
                    <h2 class="text-lg font-bold">Ada Fasilitas Gerai yang Rusak / Terkendala?</h2>
                    <p class="text-xs text-sky-100 mt-1">Laporkan segera kerusakan fasilitas gerai Alfamidi untuk mendapatkan penanganan teknisi cepat.</p>
                </div>
                <button onclick="navigateTo('buat-laporan')" class="px-5 py-2.5 bg-brand-orange hover:bg-orange-600 text-white font-semibold text-xs rounded-xl shadow-md transition flex items-center gap-2 whitespace-nowrap">
                    <i data-lucide="plus-circle" class="w-4 h-4"></i> Buat Laporan Kerusakan
                </button>
            </div>
        ` : ''}

        <!-- Analytics Summary for Admin -->
        ${currentUser.role === 'Admin' ? `
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div class="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
                    <h3 class="text-sm font-bold text-slate-800 dark:text-white mb-4">Status Laporan Ringkas</h3>
                    <div class="h-56 relative">
                        <canvas id="chart-status-summary"></canvas>
                    </div>
                </div>
                <div class="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
                    <h3 class="text-sm font-bold text-slate-800 dark:text-white mb-4">Prioritas Kerusakan</h3>
                    <div class="h-56 relative">
                        <canvas id="chart-priority-summary"></canvas>
                    </div>
                </div>
            </div>
        ` : ''}

        <!-- Recent Reports Table -->
        <div class="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
            <div class="p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
                <h3 class="text-sm font-bold text-slate-800 dark:text-white">Laporan Kerusakan Terbaru</h3>
                <button onclick="navigateTo('${currentUser.role === 'Admin' ? 'kelola-laporan' : (currentUser.role === 'Teknisi' ? 'tugas-saya' : 'laporan-saya')}')" class="text-xs text-slate-900 dark:text-white hover:underline font-semibold">
                    Lihat Semua
                </button>
            </div>
            <div class="overflow-x-auto">
                <table class="w-full text-left text-xs">
                    <thead class="bg-slate-50 dark:bg-slate-800/50 text-slate-500 uppercase font-semibold">
                        <tr>
                            <th class="p-3.5">ID Laporan</th>
                            <th class="p-3.5">Gerai</th>
                            <th class="p-3.5">Fasilitas</th>
                            <th class="p-3.5">Jenis Kerusakan</th>
                            <th class="p-3.5">Prioritas</th>
                            <th class="p-3.5">Tanggal</th>
                            <th class="p-3.5">Status</th>
                            <th class="p-3.5 text-center">Aksi</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-slate-100 dark:divide-slate-800">
                        ${userReports.length === 0 ? `
                            <tr><td colspan="8" class="text-center p-6 text-slate-400">Belum ada laporan kerusakan.</td></tr>
                        ` : userReports.slice(0, 5).map(r => renderReportRowHTML(r)).join('')}
                    </tbody>
                </table>
            </div>
        </div>
    `;

    if (currentUser.role === 'Admin') {
        setTimeout(renderAdminDashboardCharts, 100);
    }
}

function renderBuatLaporanPage(container) {
    const outlets = getDB('outlets', DEFAULT_OUTLETS);
    const facilities = getDB('facilities', DEFAULT_FACILITIES);
    const reports = getDB('reports', DEFAULT_REPORTS);
    
    // Pratinjau ID laporan berikutnya (counter persisten)
    const newId = peekNextId('LAP', 'report', reports);
    uploadedPhotoBase64 = '';
    photoProcessing = false;

    container.innerHTML = `
        <div class="max-w-3xl mx-auto bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <form onsubmit="submitNewReport(event)" class="space-y-5">
                <div class="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
                    <div>
                        <h3 class="text-base font-bold text-slate-800 dark:text-white">Formulir Laporan Kerusakan Baru</h3>
                        <p class="text-xs text-slate-500">Pastikan informasi kerusakan diisi secara detail dan akurat.</p>
                    </div>
                    <span class="px-3 py-1 bg-brand-lightblue text-slate-900 font-mono font-bold text-xs rounded-lg">${newId}</span>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label class="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Pilih Gerai Alfamidi</label>
                        <select id="form-outlet" required class="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-xs text-slate-800 dark:text-white focus:ring-2 focus:ring-brand-blue">
                            ${outlets.map(o => `<option value="${o.name}">${o.name} (${o.city})</option>`).join('')}
                        </select>
                    </div>

                    <div>
                        <label class="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Kategori Fasilitas</label>
                        <select id="form-category" required class="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-xs text-slate-800 dark:text-white focus:ring-2 focus:ring-brand-blue">
                            <option value="Pendingin / AC">Pendingin / AC</option>
                            <option value="Komputer Kasir">Komputer Kasir</option>
                            <option value="Rak Barang">Rak Barang</option>
                            <option value="Instalasi Listrik">Instalasi Listrik</option>
                            <option value="Lampu">Lampu</option>
                            <option value="Pintu">Pintu / Entrance</option>
                            <option value="CCTV">CCTV Security</option>
                            <option value="Fasilitas lainnya">Fasilitas Lainnya</option>
                        </select>
                    </div>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label class="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Nama Fasilitas Spasifik</label>
                        <input type="text" id="form-facility-name" required placeholder="Contoh: AC Standing Outdoor Kasir 1" class="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-xs text-slate-800 dark:text-white focus:ring-2 focus:ring-brand-blue">
                    </div>

                    <div>
                        <label class="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Jenis Kerusakan</label>
                        <select id="form-damage-type" required class="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-xs text-slate-800 dark:text-white focus:ring-2 focus:ring-brand-blue">
                            <option value="Tidak menyala">Tidak menyala / Mati Total</option>
                            <option value="Rusak fisik">Rusak fisik / Patah / Retak</option>
                            <option value="Tidak berfungsi">Tidak berfungsi optimal</option>
                            <option value="Gangguan listrik">Gangguan listrik / Konsleting</option>
                            <option value="Kerusakan software">Kerusakan software / System</option>
                            <option value="Kerusakan hardware">Kerusakan hardware</option>
                            <option value="Lainnya">Lainnya</option>
                        </select>
                    </div>
                </div>

                <div>
                    <label class="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">Tingkat Prioritas</label>
                    <div class="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        <label class="border border-slate-200 dark:border-slate-700 p-2.5 rounded-xl flex items-center gap-2 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800">
                            <input type="radio" name="priority" value="Rendah" class="text-slate-900 dark:text-white">
                            <span class="text-xs font-semibold text-emerald-600">Rendah</span>
                        </label>
                        <label class="border border-slate-200 dark:border-slate-700 p-2.5 rounded-xl flex items-center gap-2 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800">
                            <input type="radio" name="priority" value="Sedang" checked class="text-slate-900 dark:text-white">
                            <span class="text-xs font-semibold text-amber-600">Sedang</span>
                        </label>
                        <label class="border border-slate-200 dark:border-slate-700 p-2.5 rounded-xl flex items-center gap-2 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800">
                            <input type="radio" name="priority" value="Tinggi" class="text-slate-900 dark:text-white">
                            <span class="text-xs font-semibold text-orange-600">Tinggi</span>
                        </label>
                        <label class="border border-slate-200 dark:border-slate-700 p-2.5 rounded-xl flex items-center gap-2 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800">
                            <input type="radio" name="priority" value="Darurat" class="text-slate-900 dark:text-white">
                            <span class="text-xs font-semibold text-red-600">Darurat</span>
                        </label>
                    </div>
                </div>

                <div>
                    <label class="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Deskripsi Detail Kerusakan</label>
                    <textarea id="form-description" required rows="3" placeholder="Jelaskan kronologi atau gejala kerusakan yang dialami..." class="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-xs text-slate-800 dark:text-white focus:ring-2 focus:ring-brand-blue"></textarea>
                </div>

                <div>
                    <label class="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Upload Foto Kerusakan</label>
                    <input type="file" id="form-photo" accept="image/*" onchange="previewDamagePhoto(event)" class="block w-full text-xs text-slate-500 file:mr-3 file:py-2 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-red-600 file:text-white hover:file:bg-red-700">
                    <p class="text-[11px] text-slate-400 mt-1">Maks. 10 MB. Foto dikompres otomatis sebelum disimpan.</p>
                    <div id="damage-photo-preview-box" class="mt-3 h-40 rounded-xl bg-slate-100 dark:bg-slate-800 border border-dashed border-slate-300 dark:border-slate-700 flex items-center justify-center overflow-hidden hidden">
                        <img id="damage-photo-img" src="" class="max-h-full object-contain">
                    </div>
                </div>

                <div class="flex items-center justify-end gap-3 pt-4 border-t border-slate-200 dark:border-slate-800">
                    <button type="button" onclick="navigateTo('dashboard')" class="px-4 py-2 bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-xl text-xs font-semibold">
                        Batal
                    </button>
                    <button type="button" onclick="showToast('Draft laporan berhasil disimpan di lokal!', 'info')" class="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-xl text-xs font-semibold transition">
                        Simpan Draft
                    </button>
                    <button type="submit" class="px-5 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-semibold transition shadow-md">
                        Kirim Laporan Kerusakan
                    </button>
                </div>
            </form>
        </div>
    `;
}

let uploadedPhotoBase64 = '';
let photoProcessing = false;

async function previewDamagePhoto(e) {
    const input = e.target;
    const file = input.files[0];
    if (!file) return;

    photoProcessing = true;
    try {
        uploadedPhotoBase64 = await compressImage(file);
        document.getElementById('damage-photo-img').src = uploadedPhotoBase64;
        document.getElementById('damage-photo-preview-box').classList.remove('hidden');
        showToast(`Foto siap diunggah (${formatDataUrlSize(uploadedPhotoBase64)}).`, 'success');
    } catch (err) {
        uploadedPhotoBase64 = '';
        input.value = '';
        document.getElementById('damage-photo-preview-box').classList.add('hidden');
        showToast(err.message || 'Gagal memproses foto.', 'error');
    } finally {
        photoProcessing = false;
    }
}

function submitNewReport(e) {
    e.preventDefault();
    if (photoProcessing) {
        showToast('Foto masih diproses, mohon tunggu sebentar.', 'info');
        return;
    }
    const reports = getDB('reports', DEFAULT_REPORTS);
    const newId = reserveNextId('LAP', 'report', reports);

    const selectedPriority = document.querySelector('input[name="priority"]:checked').value;

    const newReport = {
        id: newId,
        outletName: document.getElementById('form-outlet').value,
        reporterName: currentUser.name,
        facilityName: document.getElementById('form-facility-name').value,
        category: document.getElementById('form-category').value,
        damageType: document.getElementById('form-damage-type').value,
        priority: selectedPriority,
        description: document.getElementById('form-description').value,
        photo: uploadedPhotoBase64 || 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80',
        repairPhoto: '',
        status: 'Baru / Menunggu',
        technicianId: '',
        technicianName: 'Belum Ditugaskan',
        technicianNotes: '',
        date: new Date().toISOString().replace('T', ' ').substring(0, 16),
        timeline: [
            { status: 'Laporan Dibuat', date: new Date().toISOString().replace('T', ' ').substring(0, 16), note: 'Laporan dikirim oleh ' + currentUser.name }
        ]
    };

    reports.unshift(newReport);
    if (!setDB('reports', reports)) return;

    // Add System Notification for Admin
    addNotification('Laporan Kerusakan Baru', `${newId} dibuat oleh ${currentUser.name} (${newReport.outletName}).`, 'Admin');

    showToast('Laporan berhasil dikirim dan menunggu verifikasi admin.', 'success');
    uploadedPhotoBase64 = '';
    navigateTo(currentUser.role === 'Pelapor' ? 'laporan-saya' : 'kelola-laporan');
}

function renderLaporanListPage(container) {
    const reports = getDB('reports', DEFAULT_REPORTS);
    
    container.innerHTML = `
        <div class="space-y-4">
            <!-- Filter and Search Bar Card -->
            <div class="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col md:flex-row gap-3 items-center justify-between">
                <div class="relative w-full md:w-72">
                    <i data-lucide="search" class="w-4 h-4 absolute left-3 top-3 text-slate-400"></i>
                    <input type="text" id="filter-search" oninput="applyReportFilters()" placeholder="Cari ID, Gerai, Fasilitas..." class="w-full pl-9 pr-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-xs text-slate-800 dark:text-white focus:ring-2 focus:ring-brand-blue">
                </div>

                <div class="flex flex-wrap items-center gap-2 w-full md:w-auto">
                    <select id="filter-status" onchange="applyReportFilters()" class="py-2 px-3 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-xs text-slate-800 dark:text-white">
                        <option value="">Semua Status</option>
                        <option value="Baru / Menunggu">Baru / Menunggu</option>
                        <option value="Diverifikasi">Diverifikasi</option>
                        <option value="Diproses">Diproses</option>
                        <option value="Menunggu Suku Cadang">Menunggu Suku Cadang</option>
                        <option value="Selesai">Selesai</option>
                    </select>

                    <select id="filter-priority" onchange="applyReportFilters()" class="py-2 px-3 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-xs text-slate-800 dark:text-white">
                        <option value="">Semua Prioritas</option>
                        <option value="Rendah">Rendah</option>
                        <option value="Sedang">Sedang</option>
                        <option value="Tinggi">Tinggi</option>
                        <option value="Darurat">Darurat</option>
                    </select>

                    <select id="filter-category" onchange="applyReportFilters()" class="py-2 px-3 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-xs text-slate-800 dark:text-white">
                        <option value="">Semua Fasilitas</option>
                        <option value="Pendingin / AC">Pendingin / AC</option>
                        <option value="Komputer Kasir">Komputer Kasir</option>
                        <option value="Rak Barang">Rak Barang</option>
                        <option value="Instalasi Listrik">Instalasi Listrik</option>
                    </select>
                </div>
            </div>

            <!-- Reports Data Table -->
            <div class="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
                <div class="overflow-x-auto">
                    <table class="w-full text-left text-xs">
                        <thead class="bg-slate-50 dark:bg-slate-800/50 text-slate-500 uppercase font-semibold">
                            <tr>
                                <th class="p-3.5">ID Laporan</th>
                                <th class="p-3.5">Gerai</th>
                                <th class="p-3.5">Fasilitas</th>
                                <th class="p-3.5">Jenis Kerusakan</th>
                                <th class="p-3.5">Prioritas</th>
                                <th class="p-3.5">Tanggal</th>
                                <th class="p-3.5">Status</th>
                                <th class="p-3.5 text-center">Aksi</th>
                            </tr>
                        </thead>
                        <tbody id="reports-table-body" class="divide-y divide-slate-100 dark:divide-slate-800">
                            <!-- Populated via JS -->
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    `;

    applyReportFilters();
}

function applyReportFilters() {
    const reports = getDB('reports', DEFAULT_REPORTS);
    lastSeenVersion = localStorage.getItem('alfamidi_data_version') || '';
    const searchTerms = normalizeText(document.getElementById('filter-search')?.value).split(' ').filter(Boolean);
    const status = normalizeText(document.getElementById('filter-status')?.value);
    const priority = normalizeText(document.getElementById('filter-priority')?.value);
    const category = normalizeText(document.getElementById('filter-category')?.value);

    const filtered = reports.filter(r => {
        // Role visibility scope
        if (currentUser.role === 'Pelapor' && r.outletName !== currentUser.outlet && r.reporterName !== currentUser.name) return false;
        
        // Semua kolom data dinormalisasi (trim + huruf kecil + spasi ganda dirapikan)
        const haystack = normalizeText([
            r.id, r.outletName, r.facilityName, r.category, r.damageType,
            r.priority, r.status, r.date, r.reporterName, r.technicianName
        ].join(' '));
        const compactHaystack = haystack.replace(/[\s\-_]/g, '');
        const matchesSearch = searchTerms.every(term =>
            haystack.includes(term) || compactHaystack.includes(term.replace(/[\s\-_]/g, '')));
        const matchesStatus = !status || normalizeText(r.status) === status;
        const matchesPriority = !priority || normalizeText(r.priority) === priority;
        const matchesCategory = !category || normalizeText(r.category) === category;

        return matchesSearch && matchesStatus && matchesPriority && matchesCategory;
    });

    const tbody = document.getElementById('reports-table-body');
    if (tbody) {
        if (filtered.length === 0) {
            tbody.innerHTML = `<tr><td colspan="8" class="text-center p-8 text-slate-400">Tidak ada data laporan yang sesuai filter.</td></tr>`;
        } else {
            tbody.innerHTML = filtered.map(r => renderReportRowHTML(r)).join('');
        }
    }
    lucide.createIcons();
}

function renderReportRowHTML(r) {
    const priorityColors = {
        'Rendah': 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300',
        'Sedang': 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300',
        'Tinggi': 'bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300',
        'Darurat': 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300 animate-pulse'
    };

    const statusColors = {
        'Baru / Menunggu': 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300',
        'Diverifikasi': 'bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300',
        'Teknisi Ditugaskan': 'bg-blue-100 text-slate-900 dark:bg-blue-900/40 dark:text-white',
        'Diproses': 'bg-sky-100 text-slate-900 dark:bg-sky-900/40 dark:text-white',
        'Menunggu Suku Cadang': 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300',
        'Selesai': 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300',
        'Ditolak': 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300'
    };

    return `
        <tr class="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition">
            <td class="p-3.5 font-mono font-bold text-slate-900 dark:text-white">${r.id}</td>
            <td class="p-3.5 font-medium text-slate-800 dark:text-white">${r.outletName}</td>
            <td class="p-3.5 text-slate-600 dark:text-slate-300">${r.facilityName}</td>
            <td class="p-3.5 text-slate-600 dark:text-slate-300">${r.damageType}</td>
            <td class="p-3.5">
                <span class="px-2 py-0.5 rounded text-[11px] font-bold ${priorityColors[r.priority] || ''}">${r.priority}</span>
            </td>
            <td class="p-3.5 text-slate-500">${r.date}</td>
            <td class="p-3.5">
                <span class="px-2 py-0.5 rounded text-[11px] font-semibold ${statusColors[r.status] || ''}">${r.status}</span>
            </td>
            <td class="p-3.5 text-center">
                <div class="flex items-center justify-center gap-1.5">
                    <button onclick="openDetailModal('${r.id}')" title="Lihat Detail" class="p-1.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-lg">
                        <i data-lucide="eye" class="w-4 h-4"></i>
                    </button>
                    ${currentUser.role === 'Admin' && (r.status === 'Baru / Menunggu' || r.status === 'Diverifikasi') ? `
                        <button onclick="openAssignModal('${r.id}')" title="Verifikasi & Assign" class="p-1.5 bg-red-600 hover:bg-red-700 text-white rounded-lg">
                            <i data-lucide="user-check" class="w-4 h-4"></i>
                        </button>
                    ` : ''}
                </div>
            </td>
        </tr>
    `;
}

function openDetailModal(id) {
    const reports = getDB('reports', DEFAULT_REPORTS);
    const r = reports.find(item => item.id === id);
    if (!r) return;

    document.getElementById('modal-report-id').textContent = r.id;
    document.getElementById('modal-outlet-name').textContent = r.outletName;
    document.getElementById('modal-reporter-info').textContent = `${r.reporterName} (${r.date})`;
    document.getElementById('modal-facility-info').textContent = `${r.facilityName} - Kategori: ${r.category}`;
    document.getElementById('modal-damage-type').textContent = r.damageType;
    document.getElementById('modal-priority-badge').textContent = r.priority;
    document.getElementById('modal-technician-assigned').textContent = r.technicianName || 'Belum Ditugaskan';
    document.getElementById('modal-description').textContent = r.description;

    // Render Photos
    const photoBox = document.getElementById('modal-photo-container');
    if (r.photo) {
        photoBox.innerHTML = `<img src="${r.photo}" class="max-h-full object-contain">`;
    } else {
        photoBox.innerHTML = `<p class="text-xs text-slate-400">Tidak ada foto kerusakan.</p>`;
    }

    const repairBox = document.getElementById('modal-repair-photo-container');
    if (r.repairPhoto) {
        repairBox.innerHTML = `<img src="${r.repairPhoto}" class="max-h-full object-contain">`;
    } else {
        repairBox.innerHTML = `<p class="text-xs text-slate-400">Belum ada foto hasil perbaikan.</p>`;
    }

    // Technician Notes
    const notesSec = document.getElementById('modal-notes-section');
    if (r.technicianNotes) {
        notesSec.classList.remove('hidden');
        document.getElementById('modal-technician-notes').textContent = r.technicianNotes;
    } else {
        notesSec.classList.add('hidden');
    }

    // Render 6-Stage Timeline
    renderTimeline(r);

    openModal('modal-detail-laporan');
}

function renderTimeline(r) {
    const stages = [
        'Laporan Dibuat',
        'Diverifikasi',
        'Teknisi Ditugaskan',
        'Diproses',
        'Menunggu Suku Cadang',
        'Selesai'
    ];

    const currentIdx = stages.indexOf(r.status === 'Selesai' ? 'Selesai' : (r.status === 'Menunggu Suku Cadang' ? 'Menunggu Suku Cadang' : (r.status === 'Diproses' ? 'Diproses' : (r.status === 'Teknisi Ditugaskan' ? 'Teknisi Ditugaskan' : (r.status === 'Diverifikasi' ? 'Diverifikasi' : 'Laporan Dibuat')))));

    const container = document.getElementById('report-timeline');
    container.innerHTML = stages.map((stage, idx) => {
        const isPassed = idx <= currentIdx;
        const isCurrent = idx === currentIdx;

        return `
            <div class="p-2 rounded-xl text-center border ${isCurrent ? 'bg-brand-blue text-white border-brand-blue shadow-md' : (isPassed ? 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800' : 'bg-slate-100 dark:bg-slate-800 text-slate-400 border-slate-200 dark:border-slate-700')} flex flex-col items-center justify-center">
                <div class="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold mb-1 ${isCurrent ? 'bg-white text-slate-900' : (isPassed ? 'bg-emerald-600 text-white' : 'bg-slate-300 text-slate-600')}">
                    ${idx + 1}
                </div>
                <span class="text-[10px] font-semibold leading-tight">${stage}</span>
            </div>
        `;
    }).join('');
}

function openAssignModal(id) {
    document.getElementById('assign-report-id').value = id;
    
    const users = getDB('users', DEFAULT_USERS);
    const technicians = users.filter(u => u.role === 'Teknisi');

    const select = document.getElementById('assign-technician-id');
    select.innerHTML = technicians.map(t => `
        <option value="${t.id}">${t.name} (${t.spec || 'Teknisi Spesialis'})</option>
    `).join('');

    openModal('modal-verify-assign');
}

function submitAssignTechnician(e) {
    e.preventDefault();
    const id = document.getElementById('assign-report-id').value;
    const techId = document.getElementById('assign-technician-id').value;
    const notes = document.getElementById('assign-admin-notes').value;

    const users = getDB('users', DEFAULT_USERS);
    const tech = users.find(u => u.id === techId);

    const reports = getDB('reports', DEFAULT_REPORTS);
    const r = reports.find(item => item.id === id);

    if (r) {
        r.status = 'Teknisi Ditugaskan';
        r.technicianId = tech.id;
        r.technicianName = tech.name;
        r.timeline.push({
            status: 'Teknisi Ditugaskan',
            date: new Date().toISOString().replace('T', ' ').substring(0, 16),
            note: `Ditugaskan ke ${tech.name}. Catatan: ${notes}`
        });

        setDB('reports', reports);
        
        // Add Notification for Technician
        addNotification('Tugas Baru', `Anda ditugaskan pada laporan ${id} (${r.outletName}).`, 'Teknisi');

        showToast(`Laporan ${id} berhasil diverifikasi dan ditugaskan!`, 'success');
        closeModal('modal-verify-assign');
        navigateTo('kelola-laporan');
    }
}

function rejectReport() {
    const id = document.getElementById('assign-report-id').value;
    const reports = getDB('reports', DEFAULT_REPORTS);
    const r = reports.find(item => item.id === id);

    if (r) {
        r.status = 'Ditolak';
        r.timeline.push({
            status: 'Ditolak',
            date: new Date().toISOString().replace('T', ' ').substring(0, 16),
            note: 'Laporan ditolak oleh Admin.'
        });
        setDB('reports', reports);
        showToast(`Laporan ${id} telah ditolak.`, 'info');
        closeModal('modal-verify-assign');
        navigateTo('kelola-laporan');
    }
}

function renderTeknisiTasksPage(container) {
    const reports = getDB('reports', DEFAULT_REPORTS);
    
    // Filter technician assigned reports
    const techReports = reports.filter(r => r.technicianId === currentUser.id || r.technicianName === currentUser.name);

    container.innerHTML = `
        <div class="space-y-4">
            <div class="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between">
                <div>
                    <h3 class="text-sm font-bold text-slate-800 dark:text-white">Daftar Tugas Perbaikan</h3>
                    <p class="text-xs text-slate-500">Tugas yang dialokasikan khusus untuk Anda.</p>
                </div>
                <span class="px-3 py-1 bg-amber-100 dark:bg-amber-900/40 text-amber-800 dark:text-amber-300 font-bold text-xs rounded-xl">
                    ${techReports.length} Tugas Total
                </span>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                ${techReports.length === 0 ? `
                    <div class="col-span-2 bg-white dark:bg-slate-900 p-8 text-center rounded-2xl border border-slate-200 dark:border-slate-800 text-slate-400">
                        Belum ada tugas penanganan yang ditugaskan kepada Anda saat ini.
                    </div>
                ` : techReports.map(r => `
                    <div class="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
                        <div class="flex items-center justify-between">
                            <span class="font-mono font-bold text-slate-900 dark:text-white text-xs">${r.id}</span>
                            <span class="px-2 py-0.5 rounded text-[11px] font-semibold bg-sky-100 text-slate-900">${r.status}</span>
                        </div>
                        <div>
                            <h4 class="font-bold text-sm text-slate-800 dark:text-white">${r.facilityName}</h4>
                            <p class="text-xs text-slate-500">${r.outletName} &bull; Prioritas: <span class="font-semibold text-orange-600">${r.priority}</span></p>
                        </div>
                        <p class="text-xs text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-800 p-2.5 rounded-lg border border-slate-200 dark:border-slate-700">
                            ${r.description}
                        </p>
                        <div class="flex items-center justify-between pt-2">
                            <button onclick="openDetailModal('${r.id}')" class="text-xs text-slate-500 hover:text-slate-800 dark:hover:text-white flex items-center gap-1">
                                <i data-lucide="info" class="w-3.5 h-3.5"></i> Detail Info
                            </button>
                            <button onclick="openTechnicianUpdateModal('${r.id}')" class="px-3 py-1.5 bg-brand-orange hover:bg-orange-600 text-white rounded-lg text-xs font-semibold shadow transition flex items-center gap-1.5">
                                <i data-lucide="wrench" class="w-3.5 h-3.5"></i> Update Status / Selesai
                            </button>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
    lucide.createIcons();
}

let uploadedRepairPhotoBase64 = '';
let repairPhotoProcessing = false;

async function previewRepairPhoto(e) {
    const input = e.target;
    const file = input.files[0];
    if (!file) return;

    repairPhotoProcessing = true;
    try {
        uploadedRepairPhotoBase64 = await compressImage(file);
        document.getElementById('tech-photo-img').src = uploadedRepairPhotoBase64;
        document.getElementById('tech-photo-preview').classList.remove('hidden');
        showToast(`Foto siap diunggah (${formatDataUrlSize(uploadedRepairPhotoBase64)}).`, 'success');
    } catch (err) {
        uploadedRepairPhotoBase64 = '';
        input.value = '';
        document.getElementById('tech-photo-preview').classList.add('hidden');
        showToast(err.message || 'Gagal memproses foto.', 'error');
    } finally {
        repairPhotoProcessing = false;
    }
}

function openTechnicianUpdateModal(id) {
    document.getElementById('tech-update-report-id').value = id;
    uploadedRepairPhotoBase64 = '';
    document.getElementById('tech-update-photo').value = '';
    document.getElementById('tech-photo-preview').classList.add('hidden');
    openModal('modal-technician-update');
}

function submitTechnicianUpdate(e) {
    e.preventDefault();
    const id = document.getElementById('tech-update-report-id').value;
    const newStatus = document.getElementById('tech-update-status').value;
    const notes = document.getElementById('tech-update-notes').value;

    if (repairPhotoProcessing) {
        showToast('Foto masih diproses, mohon tunggu sebentar.', 'info');
        return;
    }

    if (newStatus === 'Selesai' && !confirm('Apakah perbaikan fasilitas ini benar-benar telah tuntas dilaksanakan?')) {
        return;
    }

    const reports = getDB('reports', DEFAULT_REPORTS);
    const r = reports.find(item => item.id === id);

    if (r) {
        r.status = newStatus;
        r.technicianNotes = notes;
        if (uploadedRepairPhotoBase64) r.repairPhoto = uploadedRepairPhotoBase64;

        r.timeline.push({
            status: newStatus,
            date: new Date().toISOString().replace('T', ' ').substring(0, 16),
            note: `Update Teknisi (${currentUser.name}): ${notes}`
        });

        if (!setDB('reports', reports)) return;
        
        // Add Notification for Pelapor
        addNotification('Update Status Laporan', `Laporan ${id} kini berstatus ${newStatus}.`, 'Pelapor');

        showToast(`Status laporan ${id} berhasil diperbarui menjadi '${newStatus}'!`, 'success');
        closeModal('modal-technician-update');
        navigateTo('tugas-saya');
    }
}

let activeMasterTab = 'users';

function renderDataMasterPage(container) {
    container.innerHTML = `
        <div class="space-y-4">
            <!-- Tabs Header -->
            <div class="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
                <button onclick="switchMasterTab('users')" id="tab-users" class="px-4 py-2 text-xs font-bold rounded-xl transition ${activeMasterTab === 'users' ? 'bg-red-600 text-white' : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300'}">
                    Data Pengguna
                </button>
                <button onclick="switchMasterTab('outlets')" id="tab-outlets" class="px-4 py-2 text-xs font-bold rounded-xl transition ${activeMasterTab === 'outlets' ? 'bg-red-600 text-white' : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300'}">
                    Data Gerai Alfamidi
                </button>
                <button onclick="switchMasterTab('facilities')" id="tab-facilities" class="px-4 py-2 text-xs font-bold rounded-xl transition ${activeMasterTab === 'facilities' ? 'bg-red-600 text-white' : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300'}">
                    Data Fasilitas Master
                </button>
            </div>

            <!-- Master Content Container -->
            <div id="master-tab-content">
                <!-- Rendered by JS -->
            </div>
        </div>
    `;

    switchMasterTab(activeMasterTab);
}

function switchMasterTab(tab) {
    activeMasterTab = tab;
    const container = document.getElementById('master-tab-content');
    if (!container) return;

    if (tab === 'users') {
        const users = getDB('users', DEFAULT_USERS);
        container.innerHTML = `
            <div class="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-4 space-y-4">
                <div class="flex items-center justify-between">
                    <h4 class="text-xs font-bold text-slate-800 dark:text-white">Daftar Pengguna Sistem</h4>
                    <button onclick="openMasterFormModal('users')" class="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white text-xs font-semibold rounded-lg flex items-center gap-1">
                        <i data-lucide="plus" class="w-4 h-4"></i> Tambah Data Pengguna
                    </button>
                </div>
                <div class="overflow-x-auto">
                    <table class="w-full text-left text-xs">
                        <thead class="bg-slate-50 dark:bg-slate-800/50 text-slate-500 font-semibold uppercase">
                            <tr>
                                <th class="p-3">Nama Pengguna</th>
                                <th class="p-3">Email / Username</th>
                                <th class="p-3">Role</th>
                                <th class="p-3">Penempatan / Spek</th>
                                <th class="p-3">Status</th>
                                <th class="p-3 text-center">Aksi</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-slate-100 dark:divide-slate-800">
                            ${users.map(u => `
                                <tr>
                                    <td class="p-3 font-semibold text-slate-800 dark:text-white">${u.name}</td>
                                    <td class="p-3 text-slate-500">${u.email}</td>
                                    <td class="p-3"><span class="px-2 py-0.5 rounded bg-sky-100 text-slate-900 text-[11px] font-bold">${u.role}</span></td>
                                    <td class="p-3 text-slate-600 dark:text-slate-300">${u.outlet || u.spec || '-'}</td>
                                    <td class="p-3"><span class="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[11px] font-bold">${u.status || 'Aktif'}</span></td>
                                    <td class="p-3 text-center">
                                        <button onclick="deleteMasterItem('users', '${u.id}')" class="p-1 text-red-500 hover:bg-red-50 rounded">
                                            <i data-lucide="trash-2" class="w-4 h-4"></i>
                                        </button>
                                    </td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            </div>
        `;
    } else if (tab === 'outlets') {
        const outlets = getDB('outlets', DEFAULT_OUTLETS);
        container.innerHTML = `
            <div class="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-4 space-y-4">
                <div class="flex items-center justify-between">
                    <h4 class="text-xs font-bold text-slate-800 dark:text-white">Daftar Gerai Alfamidi</h4>
                    <button onclick="openMasterFormModal('outlets')" class="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white text-xs font-semibold rounded-lg flex items-center gap-1">
                        <i data-lucide="plus" class="w-4 h-4"></i> Tambah Gerai
                    </button>
                </div>
                <div class="overflow-x-auto">
                    <table class="w-full text-left text-xs">
                        <thead class="bg-slate-50 dark:bg-slate-800/50 text-slate-500 font-semibold uppercase">
                            <tr>
                                <th class="p-3">ID Gerai</th>
                                <th class="p-3">Nama Gerai</th>
                                <th class="p-3">Alamat</th>
                                <th class="p-3">Kecamatan / Kota</th>
                                <th class="p-3">Status</th>
                                <th class="p-3 text-center">Aksi</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-slate-100 dark:divide-slate-800">
                            ${outlets.map(o => `
                                <tr>
                                    <td class="p-3 font-mono font-bold text-slate-900 dark:text-white">${o.id}</td>
                                    <td class="p-3 font-semibold text-slate-800 dark:text-white">${o.name}</td>
                                    <td class="p-3 text-slate-500">${o.address}</td>
                                    <td class="p-3 text-slate-600 dark:text-slate-300">${o.subdistrict}, ${o.city}</td>
                                    <td class="p-3"><span class="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[11px] font-bold">${o.status}</span></td>
                                    <td class="p-3 text-center">
                                        <button onclick="deleteMasterItem('outlets', '${o.id}')" class="p-1 text-red-500 hover:bg-red-50 rounded">
                                            <i data-lucide="trash-2" class="w-4 h-4"></i>
                                        </button>
                                    </td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            </div>
        `;
    } else if (tab === 'facilities') {
        const facilities = getDB('facilities', DEFAULT_FACILITIES);
        container.innerHTML = `
            <div class="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-4 space-y-4">
                <div class="flex items-center justify-between">
                    <h4 class="text-xs font-bold text-slate-800 dark:text-white">Daftar Fasilitas Master</h4>
                    <button onclick="openMasterFormModal('facilities')" class="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white text-xs font-semibold rounded-lg flex items-center gap-1">
                        <i data-lucide="plus" class="w-4 h-4"></i> Tambah Fasilitas
                    </button>
                </div>
                <div class="overflow-x-auto">
                    <table class="w-full text-left text-xs">
                        <thead class="bg-slate-50 dark:bg-slate-800/50 text-slate-500 font-semibold uppercase">
                            <tr>
                                <th class="p-3">ID Fasilitas</th>
                                <th class="p-3">Nama Fasilitas</th>
                                <th class="p-3">Kategori</th>
                                <th class="p-3">Lokasi Default</th>
                                <th class="p-3 text-center">Aksi</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-slate-100 dark:divide-slate-800">
                            ${facilities.map(f => `
                                <tr>
                                    <td class="p-3 font-mono font-bold text-slate-900 dark:text-white">${f.id}</td>
                                    <td class="p-3 font-semibold text-slate-800 dark:text-white">${f.name}</td>
                                    <td class="p-3 text-slate-500">${f.category}</td>
                                    <td class="p-3 text-slate-600 dark:text-slate-300">${f.location}</td>
                                    <td class="p-3 text-center">
                                        <button onclick="deleteMasterItem('facilities', '${f.id}')" class="p-1 text-red-500 hover:bg-red-50 rounded">
                                            <i data-lucide="trash-2" class="w-4 h-4"></i>
                                        </button>
                                    </td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            </div>
        `;
    }
    lucide.createIcons();
}

let activeMasterType = '';

function openMasterFormModal(type) {
    activeMasterType = type;
    const fieldsContainer = document.getElementById('master-form-fields');
    const title = document.getElementById('master-modal-title');

    if (type === 'users') {
        title.textContent = 'Tambah Data Pengguna Baru';
        fieldsContainer.innerHTML = `
            <div>
                <label class="block text-xs font-semibold mb-1">Nama Lengkap</label>
                <input type="text" id="m-user-name" required class="w-full p-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-xs">
            </div>
            <div>
                <label class="block text-xs font-semibold mb-1">Email / Username</label>
                <input type="email" id="m-user-email" required class="w-full p-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-xs">
            </div>
            <div>
                <label class="block text-xs font-semibold mb-1">Role Akses</label>
                <select id="m-user-role" class="w-full p-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-xs">
                    <option value="Pelapor">Pelapor / Pegawai Gerai</option>
                    <option value="Teknisi">Teknisi</option>
                    <option value="Admin">Admin / Manajemen</option>
                </select>
            </div>
        `;
    } else if (type === 'outlets') {
        title.textContent = 'Tambah Gerai Alfamidi Baru';
        fieldsContainer.innerHTML = `
            <div>
                <label class="block text-xs font-semibold mb-1">Nama Gerai</label>
                <input type="text" id="m-outlet-name" placeholder="Contoh: Alfamidi Mantikulore" required class="w-full p-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-xs">
            </div>
            <div>
                <label class="block text-xs font-semibold mb-1">Alamat Lengkap</label>
                <input type="text" id="m-outlet-address" required class="w-full p-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-xs">
            </div>
            <div class="grid grid-cols-2 gap-2">
                <div>
                    <label class="block text-xs font-semibold mb-1">Kecamatan</label>
                    <input type="text" id="m-outlet-subdistrict" required class="w-full p-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-xs">
                </div>
                <div>
                    <label class="block text-xs font-semibold mb-1">Kota</label>
                    <input type="text" id="m-outlet-city" value="Palu" required class="w-full p-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-xs">
                </div>
            </div>
        `;
    } else if (type === 'facilities') {
        title.textContent = 'Tambah Fasilitas Master Baru';
        fieldsContainer.innerHTML = `
            <div>
                <label class="block text-xs font-semibold mb-1">Nama Fasilitas</label>
                <input type="text" id="m-facility-name" required class="w-full p-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-xs">
            </div>
            <div>
                <label class="block text-xs font-semibold mb-1">Kategori</label>
                <select id="m-facility-category" class="w-full p-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-xs">
                    <option value="Pendingin / AC">Pendingin / AC</option>
                    <option value="Komputer Kasir">Komputer Kasir</option>
                    <option value="Rak Barang">Rak Barang</option>
                    <option value="Instalasi Listrik">Instalasi Listrik</option>
                    <option value="CCTV">CCTV</option>
                </select>
            </div>
            <div>
                <label class="block text-xs font-semibold mb-1">Lokasi Default</label>
                <input type="text" id="m-facility-location" placeholder="Contoh: Meja Kasir Utama" required class="w-full p-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-xs">
            </div>
        `;
    }

    openModal('modal-master-form');
}

function handleMasterFormSubmit(e) {
    e.preventDefault();
    if (activeMasterType === 'users') {
        const users = getDB('users', DEFAULT_USERS);
        users.push({
            id: reserveNextId('USR', 'user', users),
            name: document.getElementById('m-user-name').value,
            email: document.getElementById('m-user-email').value,
            password: '123',
            role: document.getElementById('m-user-role').value,
            status: 'Aktif'
        });
        setDB('users', users);
    } else if (activeMasterType === 'outlets') {
        const outlets = getDB('outlets', DEFAULT_OUTLETS);
        outlets.push({
            id: reserveNextId('ALF', 'outlet', outlets),
            name: document.getElementById('m-outlet-name').value,
            address: document.getElementById('m-outlet-address').value,
            subdistrict: document.getElementById('m-outlet-subdistrict').value,
            city: document.getElementById('m-outlet-city').value,
            status: 'Operasional'
        });
        setDB('outlets', outlets);
    } else if (activeMasterType === 'facilities') {
        const facilities = getDB('facilities', DEFAULT_FACILITIES);
        facilities.push({
            id: reserveNextId('FAS', 'facility', facilities),
            name: document.getElementById('m-facility-name').value,
            category: document.getElementById('m-facility-category').value,
            location: document.getElementById('m-facility-location').value,
            condition: 'Normal'
        });
        setDB('facilities', facilities);
    }

    showToast('Data master berhasil ditambahkan!', 'success');
    closeModal('modal-master-form');
    switchMasterTab(activeMasterType);
}

function deleteMasterItem(type, id) {
    if (!confirm('Apakah Anda yakin ingin menghapus data ini?')) return;
    let items = getDB(type, []);
    items = items.filter(i => i.id !== id);
    setDB(type, items);
    showToast('Data berhasil dihapus.', 'info');
    switchMasterTab(type);
}

function renderStatistikPage(container) {
    container.innerHTML = `
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
                <h3 class="text-sm font-bold text-slate-800 dark:text-white mb-4">Grafik Laporan Berdasarkan Status</h3>
                <div class="h-64 relative">
                    <canvas id="chart-status-page"></canvas>
                </div>
            </div>

            <div class="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
                <h3 class="text-sm font-bold text-slate-800 dark:text-white mb-4">Kerusakan Berdasarkan Kategori Fasilitas</h3>
                <div class="h-64 relative">
                    <canvas id="chart-category-page"></canvas>
                </div>
            </div>

            <div class="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
                <h3 class="text-sm font-bold text-slate-800 dark:text-white mb-4">Sebaran Prioritas Laporan</h3>
                <div class="h-64 relative">
                    <canvas id="chart-priority-page"></canvas>
                </div>
            </div>

            <div class="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
                <h3 class="text-sm font-bold text-slate-800 dark:text-white mb-4">Tren Insiden Kerusakan Per Bulan</h3>
                <div class="h-64 relative">
                    <canvas id="chart-trend-page"></canvas>
                </div>
            </div>
        </div>
    `;

    setTimeout(renderAnalyticsCharts, 100);
}

function renderAdminDashboardCharts() {
    const reports = getDB('reports', DEFAULT_REPORTS);
    
    // Status chart
    const ctxStatus = document.getElementById('chart-status-summary')?.getContext('2d');
    if (ctxStatus) {
        if (chartsInstance['statusSum']) chartsInstance['statusSum'].destroy();
        chartsInstance['statusSum'] = new Chart(ctxStatus, {
            type: 'doughnut',
            data: {
                labels: ['Baru', 'Diproses', 'Selesai'],
                datasets: [{
                    data: [
                        reports.filter(r => r.status.includes('Baru') || r.status.includes('Diverifikasi')).length,
                        reports.filter(r => r.status.includes('Diproses') || r.status.includes('Teknisi')).length,
                        reports.filter(r => r.status === 'Selesai').length
                    ],
                    backgroundColor: ['#F59E0B', '#0284C7', '#10B981']
                }]
            },
            options: { responsive: true, maintainAspectRatio: false }
        });
    }

    // Priority chart
    const ctxPriority = document.getElementById('chart-priority-summary')?.getContext('2d');
    if (ctxPriority) {
        if (chartsInstance['prioSum']) chartsInstance['prioSum'].destroy();
        chartsInstance['prioSum'] = new Chart(ctxPriority, {
            type: 'pie',
            data: {
                labels: ['Rendah', 'Sedang', 'Tinggi', 'Darurat'],
                datasets: [{
                    data: [
                        reports.filter(r => r.priority === 'Rendah').length,
                        reports.filter(r => r.priority === 'Sedang').length,
                        reports.filter(r => r.priority === 'Tinggi').length,
                        reports.filter(r => r.priority === 'Darurat').length
                    ],
                    backgroundColor: ['#10B981', '#F59E0B', '#F97316', '#EF4444']
                }]
            },
            options: { responsive: true, maintainAspectRatio: false }
        });
    }
}

function renderAnalyticsCharts() {
    const reports = getDB('reports', DEFAULT_REPORTS);

    // Status full
    const ctx1 = document.getElementById('chart-status-page')?.getContext('2d');
    if (ctx1) {
        new Chart(ctx1, {
            type: 'bar',
            data: {
                labels: ['Baru', 'Diverifikasi', 'Diproses', 'Menunggu Sparepart', 'Selesai'],
                datasets: [{
                    label: 'Jumlah Laporan',
                    data: [
                        reports.filter(r => r.status === 'Baru / Menunggu').length,
                        reports.filter(r => r.status === 'Diverifikasi').length,
                        reports.filter(r => r.status === 'Diproses').length,
                        reports.filter(r => r.status === 'Menunggu Suku Cadang').length,
                        reports.filter(r => r.status === 'Selesai').length
                    ],
                    backgroundColor: '#00529C'
                }]
            },
            options: { responsive: true, maintainAspectRatio: false }
        });
    }

    // Category chart
    const ctx2 = document.getElementById('chart-category-page')?.getContext('2d');
    if (ctx2) {
        new Chart(ctx2, {
            type: 'doughnut',
            data: {
                labels: ['AC', 'Komputer Kasir', 'Rak Barang', 'Listrik', 'Lainnya'],
                datasets: [{
                    data: [
                        reports.filter(r => r.category.includes('AC')).length,
                        reports.filter(r => r.category.includes('Kasir')).length,
                        reports.filter(r => r.category.includes('Rak')).length,
                        reports.filter(r => r.category.includes('Listrik')).length,
                        reports.filter(r => !r.category.includes('AC') && !r.category.includes('Kasir') && !r.category.includes('Rak') && !r.category.includes('Listrik')).length
                    ],
                    backgroundColor: ['#0284C7', '#F59E0B', '#10B981', '#EF4444', '#8B5CF6']
                }]
            },
            options: { responsive: true, maintainAspectRatio: false }
        });
    }

    // Trend line
    const ctx4 = document.getElementById('chart-trend-page')?.getContext('2d');
    if (ctx4) {
        new Chart(ctx4, {
            type: 'line',
            data: {
                labels: ['Jun', 'Jul', 'Agu', 'Sep'],
                datasets: [{
                    label: 'Insiden Kerusakan',
                    data: [12, 19, 15, 24],
                    borderColor: '#FF6B00',
                    tension: 0.3,
                    fill: false
                }]
            },
            options: { responsive: true, maintainAspectRatio: false }
        });
    }
}

function renderProfilPage(container) {
    container.innerHTML = `
        <div class="max-w-xl mx-auto bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <div class="flex items-center space-x-4 pb-4 border-b border-slate-200 dark:border-slate-800">
                <div class="w-14 h-14 bg-brand-blue text-white rounded-2xl font-bold text-xl flex items-center justify-center">
                    ${currentUser.name.charAt(0)}
                </div>
                <div>
                    <h3 class="font-bold text-base text-slate-800 dark:text-white">${currentUser.name}</h3>
                    <p class="text-xs text-slate-500">${currentUser.email}</p>
                    <span class="inline-block mt-1 px-2.5 py-0.5 bg-brand-lightblue text-slate-900 rounded-full text-[10px] font-bold">
                        ${currentUser.role}
                    </span>
                </div>
            </div>

            <div class="space-y-3 text-xs">
                <div>
                    <label class="text-slate-400 font-medium">Penempatan Gerai / Area</label>
                    <p class="font-semibold text-slate-800 dark:text-white">${currentUser.outlet || 'Area Palu Central'}</p>
                </div>
                <div>
                    <label class="text-slate-400 font-medium">Status Hak Akses</label>
                    <p class="font-semibold text-emerald-600">Aktif Terverifikasi</p>
                </div>
            </div>

            <div class="pt-4 border-t border-slate-200 dark:border-slate-800 flex justify-end">
                <button onclick="logout()" class="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-semibold transition flex items-center gap-2">
                    <i data-lucide="log-out" class="w-4 h-4"></i> Keluar Dari Aplikasi
                </button>
            </div>
        </div>
    `;
    lucide.createIcons();
}

function addNotification(title, text, targetRole) {
    const notifs = getDB('notifications', []);
    notifs.unshift({
        id: Date.now(),
        title: title,
        text: text,
        time: 'Baru saja',
        read: false,
        role: targetRole
    });
    setDB('notifications', notifs);
    renderNotifications();
}

function renderNotifications() {
    const notifs = getDB('notifications', []);
    const userNotifs = notifs.filter(n => !n.role || n.role === currentUser?.role);
    const unreadCount = userNotifs.filter(n => !n.read).length;

    const badge = document.getElementById('notif-badge');
    if (badge) {
        if (unreadCount > 0) badge.classList.remove('hidden');
        else badge.classList.add('hidden');
    }

    const list = document.getElementById('notif-list');
    if (list) {
        if (userNotifs.length === 0) {
            list.innerHTML = `<div class="p-4 text-center text-slate-400">Tidak ada notifikasi.</div>`;
        } else {
            list.innerHTML = userNotifs.map(n => `
                <div class="p-3 hover:bg-slate-50 dark:hover:bg-slate-800 transition ${!n.read ? 'bg-red-50 dark:bg-red-900/10' : ''}">
                    <p class="font-bold text-slate-800 dark:text-white">${n.title}</p>
                    <p class="text-slate-600 dark:text-slate-300 mt-0.5">${n.text}</p>
                    <span class="text-[10px] text-slate-400 mt-1 block">${n.time}</span>
                </div>
            `).join('');
        }
    }
}

function toggleNotifications() {
    document.getElementById('notif-dropdown').classList.toggle('hidden');
}

function markAllNotifsRead() {
    const notifs = getDB('notifications', []);
    notifs.forEach(n => n.read = true);
    setDB('notifications', notifs);
    renderNotifications();
}

function toggleDarkMode() {
    const html = document.documentElement;
    const isDark = html.classList.toggle('dark');
    localStorage.setItem('alfamidi_theme', isDark ? 'dark' : 'light');
    updateThemeIcon(isDark);
}

function updateThemeIcon(isDark) {
    const icon = document.getElementById('theme-icon');
    if (icon) {
        icon.setAttribute('data-lucide', isDark ? 'sun' : 'moon');
        lucide.createIcons();
    }
}

function toggleMobileSidebar() {
    document.getElementById('app-sidebar').classList.toggle('-translate-x-full');
    document.getElementById('sidebar-overlay').classList.toggle('hidden');
}

function openModal(id) {
    document.getElementById(id).classList.remove('hidden');
}

function closeModal(id) {
    document.getElementById(id).classList.add('hidden');
}

function showToast(message, type = 'info') {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    const bgColors = {
        'success': 'bg-emerald-600 text-white',
        'error': 'bg-red-600 text-white',
        'info': 'bg-red-600 text-white'
    };

    toast.className = `p-3 rounded-xl shadow-xl text-xs font-semibold transition-all transform translate-y-2 opacity-0 flex items-center justify-between ${bgColors[type] || bgColors.info} pointer-events-auto`;
    toast.innerHTML = `
        <span>${message}</span>
        <button onclick="this.parentElement.remove()" class="ml-2 opacity-70 hover:opacity-100">&times;</button>
    `;

    container.appendChild(toast);

    setTimeout(() => {
        toast.classList.remove('translate-y-2', 'opacity-0');
    }, 10);

    setTimeout(() => {
        toast.classList.add('opacity-0');
        setTimeout(() => toast.remove(), 300);
    }, 4000);
}

// ===== Tabel responsif: tabel berubah menjadi kartu vertikal di layar mobile (gaya ada di style.css) =====
function makeTablesResponsive(root) {
    root.querySelectorAll('table').forEach(table => {
        const headers = Array.from(table.querySelectorAll('thead th')).map(th => th.textContent.trim());
        if (!headers.length) return;
        table.classList.add('responsive-table');
        table.querySelectorAll('tbody tr').forEach(tr => {
            Array.from(tr.children).forEach((td, i) => {
                if (td.tagName === 'TD' && !td.hasAttribute('colspan') && headers[i]) {
                    td.setAttribute('data-label', headers[i]);
                }
            });
        });
    });
}

function initResponsiveTables() {
    const main = document.getElementById('main-content');
    if (!main) return;
    let timer = null;
    new MutationObserver(() => {
        clearTimeout(timer);
        timer = setTimeout(() => makeTablesResponsive(main), 0);
    }).observe(main, { childList: true, subtree: true });
}

// ===== Sinkronisasi data berkala (polling) =====
// Catatan: localStorage bersifat per-browser. Polling + event 'storage' ini mensimulasikan
// pembaruan otomatis antar tab/sesi pada browser yang sama. Untuk sinkronisasi lintas
// perangkat yang sebenarnya, data perlu dipindahkan ke backend API + database (mis. MySQL).
const SYNC_INTERVAL_MS = 5000;

function isUserBusy() {
    const modalIds = ['modal-detail-laporan', 'modal-verify-assign', 'modal-technician-update', 'modal-master-form'];
    const modalOpen = modalIds.some(id => {
        const el = document.getElementById(id);
        return el && !el.classList.contains('hidden');
    });
    if (modalOpen || activePage === 'buat-laporan') return true;

    const listPage = activePage === 'kelola-laporan' || activePage === 'laporan-saya';
    const active = document.activeElement;
    const typing = active && /^(INPUT|TEXTAREA|SELECT)$/.test(active.tagName) &&
        document.getElementById('main-content').contains(active);
    return !listPage && typing;
}

function refreshLiveData() {
    if (!currentUser || document.hidden) return;
    const version = localStorage.getItem('alfamidi_data_version') || '';
    if (version === lastSeenVersion) return;

    renderNotifications();
    if (isUserBusy()) return; // jangan ganggu pengguna; dicoba lagi pada siklus berikutnya

    if (activePage === 'kelola-laporan' || activePage === 'laporan-saya') applyReportFilters();
    else navigateTo(activePage);
    showToast('Data terbaru dimuat otomatis.', 'info');
}

function initLiveSync() {
    setInterval(refreshLiveData, SYNC_INTERVAL_MS);
    window.addEventListener('storage', e => {
        if (e.key && e.key.startsWith('alfamidi_')) refreshLiveData();
    });
    document.addEventListener('visibilitychange', () => {
        if (!document.hidden) refreshLiveData();
    });
}