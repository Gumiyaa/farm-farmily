# 🌾 Farm Family

A modern and responsive agriculture website built using **HTML5, CSS3, and JavaScript**. This project showcases a family farming business through an engaging company profile with interactive animations and a clean user interface.

![HTML](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Bootstrap](https://img.shields.io/badge/Bootstrap-7952B3?style=for-the-badge&logo=bootstrap&logoColor=white)

---

<details>
<summary><strong>📖 Dokumen Lengkap</strong> — About, Fitur, Cara Menjalankan, & lainnya</summary>

## 📖 About

Farm Family is a company profile website designed to introduce a family-owned farming business. The website presents information about crops, farming activities, harvest data, articles, testimonials, and contact information with a modern and responsive design.

---

## ✨ Features

- 🌾 Responsive Landing Page
- 👨‍🌾 About Farm Section
- 🌱 Plant Collection
- 📅 Farming Schedule
- 📊 Harvest Statistics (Chart.js)
- 🖼️ Image Gallery with Lightbox
- 📰 Agriculture Articles
- 💬 Customer Testimonials
- 📞 Contact Form (langsung ke WhatsApp)
- 🌙 Dark Mode
- 📈 Scroll Progress Bar
- ⬆️ Back to Top Button
- 🎯 Counter Animation
- ✨ AOS Scroll Animation
- 📱 Mobile Friendly

---

## 🛠️ Built With

- HTML5
- CSS3
- JavaScript (Vanilla JS)
- Bootstrap 5
- AOS Animation
- Swiper.js
- Chart.js
- Lightbox2
- Google Fonts

---

## 📂 Project Structure

```text
farm-family/
│
├── index.html
├── css/
│   └── style.css
├── js/
│   └── script.js
├── assets/
│   └── img/          # gambar lokal, favicon, og-image, avatar
├── robots.txt
├── sitemap.xml
└── README.md
```

---

## 🚀 Getting Started

Clone this repository

```bash
git clone https://github.com/Gumiyaa/farm-farmily.git
```

Open the project folder

```bash
cd farm-farmily
```

**Laragon**
1. Letakkan folder ini di `www/farm`.
2. Buka `http://farm.test` atau `http://localhost/farm`.

**Tanpa Laragon**
```bash
php -S 127.0.0.1:8000
```
Lalu buka `http://127.0.0.1:8000`.

---

## 📸 Preview

Add screenshots of your website here.

Example:

```
assets/img/preview-home.png
assets/img/preview-gallery.png
```

---

## 📚 Libraries Used

- Bootstrap 5
- AOS
- Swiper.js
- Chart.js
- Lightbox2

---

## 🎯 Future Improvements

- Admin Dashboard
- Login Authentication
- Database Integration
- Product Management
- Weather API
- Harvest Management System
- Multi-language Support

---

## 👨‍💻 Author

**Gumilang Atmaja**

- GitHub: https://github.com/Gumiyaa

---

## 📄 License

This project is created for educational and portfolio purposes.

</details>

---

## ⚠️ Data yang wajib diganti sebelum online

| Data | Lokasi | Catatan |
|---|---|---|
| Nomor WhatsApp | `index.html` — cari `6281234567890` | Ada di link kontak, footer, tombol float, `data-whatsapp` form, dan JSON-LD |
| Email | `index.html` — `info@pertanian-keluarga.id` | Ganti dengan email asli |
| Domain | `index.html`, `robots.txt`, `sitemap.xml` | Ganti `https://pertanian-keluarga.id` dengan domain asli |
| Sosial media | `index.html` — footer | Link masih `href="#"` |
| Alamat & jam buka | `index.html` bagian Kontak + footer | Sesuaikan data asli |
| Artikel | `index.html` — link "Selengkapnya" | Masih placeholder; buat halaman detail artikel atau hapus link |
| Foto | `assets/img/` | **Ganti dengan foto asli kebun** |

> **Penting soal foto:** gambar di `assets/img/` saat ini diambil dari sumber publik sebagai placeholder (Wikimedia Commons, situs pemerintah daerah, media berita, Pinterest, Google Images). Sebagian belum tentu bebas lisensi. Untuk produksi, gunakan foto milik sendiri.

---

## ✅ Upgrade Frontend Terbaru

- Semua gambar dipindah ke lokal (`assets/img/`) — tidak lagi hotlink ke situs lain.
- Ukuran gambar dioptimalkan, ditambah `width`/`height`, `loading="lazy"`, dan `decoding="async"` untuk mengurangi layout shift.
- Loading screen 1,8–3 detik dihapus agar halaman tampil lebih cepat.
- SEO: title/description baru, canonical, Open Graph, Twitter Card, favicon, JSON-LD `LocalBusiness`, `robots.txt`, dan `sitemap.xml`.
- Form kontak sekarang benar-benar mengirim pesan lewat **WhatsApp** (tanpa backend), dengan validasi dan status `aria-live`.
- Tombol WhatsApp mengambang di kanan bawah.
- Dark mode diperbaiki: tidak ada flash putih saat load, mengikuti preferensi sistem, dan warna teks/ikon tidak lagi hilang.
- Aksesibilitas: skip-link, `:focus-visible`, label ARIA, `prefers-reduced-motion`, dan fokus otomatis saat navigasi anchor.
- Performa: CDN `preconnect`, script `defer`, Bootstrap Icons yang tidak terpakai dihapus.
- Copyright otomatis mengikuti tahun berjalan.
- Data statistik panen diselaraskan: 13,5 ton (sesuai total chart).
- Avatar testimoni diganti dari `picsum.photos` menjadi SVG lokal.

### Catatan pengembangan berikutnya

- Halaman detail artikel / blog.
- Katalog produk + harga + tombol order WhatsApp per produk.
- Data jadwal tanam & hasil panen dari file JSON/PHP/MySQL agar mudah diupdate.
- Testimoni asli / Google Reviews.
- Peta lokasi dan analytics.
