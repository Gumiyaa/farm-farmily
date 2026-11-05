# Pertanian Keluarga — Website

Website profil pertanian keluarga berbasis **HTML, CSS, dan JavaScript statis**. Tidak memerlukan backend.

## Menjalankan

**Laragon**
1. Letakkan folder ini di `www/farm`.
2. Buka `http://farm.test` atau `http://localhost/farm`.

**Tanpa Laragon**
```bash
php -S 127.0.0.1:8000
```
Lalu buka `http://127.0.0.1:8000`.

## Yang wajib diganti sebelum online

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

## Yang sudah di-upgrade

- Semua gambar dipindah ke lokal (`assets/img/`) — tidak lagi hotlink ke situs lain.
- Ukuran gambar dioptimalkan, ditambah `width`/`height`, `loading="lazy"`, dan `decoding="async"` untuk mengurangi layout shift.
- Loading screen 1,8–3 detik dihapus agar halaman tampil lebih cepat.
- SEO: title/description baru, canonical, Open Graph, Twitter Card, favicon, JSON-LD `LocalBusiness`, `robots.txt`, dan `sitemap.xml`.
- Form kontak sekarang benar-benar mengirim pesan lewat **WhatsApp** (tanpa backend), dengan validasi dan status `aria-live`.
- Tombol WhatsApp mengambang di kanan bawah.
- Dark mode diperbaiki: tidak ada flash putih saat load, mengikuti preferensi sistem, dan warna teks/ikon tidak lagi hilang.
- Aksesibilitas: skip-link, `:focus-visible`, label ARIA, `prefers-reduced-motion`, dan fokus otomatis saat navigasi anchor.
- Performa: CDN `preconnect`, script `defer`, Bootstrap Icons yang tidak terpakai dihapus, dan `--force-prefers-reduced-motion` friendly.
- Copyright otomatis mengikuti tahun berjalan.
- Data statistik panen diselaraskan: 13,5 ton (sesuai total chart).
- Avatar testimoni diganti dari `picsum.photos` menjadi SVG lokal.

## Struktur

```
farm/
├── assets/
│   └── img/            # gambar lokal, favicon, og-image, avatar
├── css/
│   └── style.css
├── js/
│   └── script.js
├── index.html
├── robots.txt
├── sitemap.xml
└── README.md
```

## Catatan pengembangan berikutnya

- Halaman detail artikel / blog.
- Katalog produk + harga + tombol order WhatsApp per produk.
- Data jadwal tanam & hasil panen dari file JSON/PHP/MySQL agar mudah diupdate.
- Testimoni asli / Google Reviews.
- Peta lokasi dan analytics.
