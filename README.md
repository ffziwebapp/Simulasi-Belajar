# Belajar & Simulasi Tes Pijak 2027

Situs statis untuk persiapan tes seleksi **Pijak 2027 in collaboration with IBM SkillsBuild**. Situs ini bisa dibuka di HP maupun laptop.

## Isi

- **Modul materi** (7 bab, sekitar 13.000 kata): strategi tes, Logical Reasoning & Computational Thinking, Programming Fundamentals, Data & System Foundations, Frontend, Backend, dan Traits Assessment. Setiap bab berisi teori, tabel ringkas, contoh kode, contoh soal dengan pembahasan, dan ringkasan cepat.
- **Simulasi tes**: 6 blok (5 × 10 menit Technical + 20 menit Traits) dengan blok waktu terkunci, bank 205 soal teknis (41 per blok) ditambah generator soal yang angkanya diacak setiap kali dibuat, serta 60 butir Likert dan 12 soal situasional untuk Traits. Setiap blok mengambil soal yang paling lama tidak muncul, jadi beberapa kali simulasi berturut-turut tidak mengulang soal yang sama. Hasil dilengkapi pembahasan, profil traits, dan skor konsistensi.
- **Jadwal belajar 28 hari** dengan checklist yang tersimpan di browser.
- **Sumber belajar tambahan**: kursus, dokumentasi, dan latihan gratis per topik.

Progres (bab yang sudah dibaca, checklist jadwal, riwayat simulasi) disimpan di `localStorage` browser, jadi hanya tersimpan di perangkat dan browser yang sama.

## Struktur folder

```
index.html            ← halaman utama (harus berada di root repository)
css/style.css
js/app.js             ← routing, modul, jadwal, sumber, mesin simulasi
js/bank.js            ← bank soal utama
js/bank-tambahan.js   ← soal tambahan
js/bank-tambahan-2.js ← soal tambahan ke-2
js/generator.js       ← generator soal berangka acak
js/traits-tambahan.js ← butir traits tambahan
js/jadwal.js          ← data jadwal 28 hari
js/sumber.js          ← daftar sumber eksternal
js/modul/*.js         ← isi setiap bab (Markdown)
js/vendor/marked.min.js ← pengubah Markdown ke HTML (MIT License)
.nojekyll
```

## Menjalankan

- **Online:** deploy ke GitHub Pages (lihat `PANDUAN-DEPLOY.md`).
- **Lokal:** cukup klik dua kali `index.html`, karena tidak butuh server.

## Menambah atau mengubah konten

- **Soal:** tambahkan objek ke `js/bank-tambahan.js` dengan format `{q, code?, o:[4 opsi], a:indeksBenar, e:"pembahasan"}`.
- **Materi:** edit file di `js/modul/`. Isinya Markdown di dalam ``String.raw`...` ``. Hindari karakter backtick dan `${` di dalam teks; gunakan `<code>` untuk kode sebaris dan `~~~` untuk blok kode.

## Catatan

Situs ini adalah bahan belajar **tidak resmi**. Soal dibuat sendiri berdasarkan nama-nama section di modul Kode Etik tes dan **bukan** soal asli. Informasi resmi hanya dari Dicoding dan IBM SkillsBuild.
