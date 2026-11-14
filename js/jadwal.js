/* Jadwal belajar 28 hari. Tugas boleh memuat tautan markdown. */
window.JADWAL = {
intro: "Rencana 4 minggu dengan 1,5–2 jam belajar per hari dan satu hari ringan setiap minggu. Isi tanggal mulai agar setiap hari tampil dengan tanggalnya. Jika waktumu hanya 2 minggu, kerjakan dua hari jadwal dalam satu hari dan tetap jalankan simulasi penuh di akhir setiap minggu.",

teknik: String.raw`
### Prinsip belajar yang didukung riset

| Teknik | Cara menerapkan | Dasar |
|---|---|---|
| **Active recall** (latihan mengingat) | Setelah membaca satu subbab, tutup layar lalu tulis ulang poin-poinnya dari ingatan. Simulasi dan latihan soal adalah bentuk active recall | Roediger & Karpicke (2006): menguji diri meningkatkan retensi jangka panjang dibanding membaca ulang |
| **Spaced repetition** (pengulangan berjarak) | Ulangi materi pada hari ke-1, 3, 7, dan 14 setelah pertama dipelajari. Jadwal ini sudah menyisipkan sesi ulang | Kurva lupa Ebbinghaus: ingatan menurun cepat jika tidak diulang |
| **Interleaving** (selang-seling) | Campur jenis soal (logika, kode, SQL) dalam satu sesi latihan, jangan satu jenis saja | Melatih kemampuan memilih strategi yang tepat, seperti di tes asli |
| **Teknik Feynman** | Jelaskan sebuah konsep dengan bahasa sederhana seolah kepada adik kelas. Bagian yang macet adalah bagian yang belum kamu pahami | Mengubah pemahaman pasif menjadi aktif |
| **Pomodoro** | 25 menit fokus, 5 menit istirahat; setelah 4 putaran, istirahat 15–30 menit | Menjaga fokus dan mencegah kelelahan |
| **Belajar dengan praktik** | Ketik dan jalankan sendiri setiap contoh kode, jangan hanya dibaca | Mengubah pengetahuan deklaratif menjadi keterampilan |
| **Tidur cukup** | 7–9 jam, terutama malam sebelum tes | Tidur berperan dalam konsolidasi memori |

### Struktur satu sesi belajar (± 100 menit)

1. **5 menit:** ulang kilat catatan kemarin (active recall).
2. **50 menit (2 Pomodoro):** baca bagian modul dan praktikkan contohnya.
3. **25 menit:** latihan soal atau latihan blok di simulasi.
4. **15 menit:** pelajari setiap jawaban yang salah, lalu catat di **buku kesalahan** dengan format *konsep – kenapa salah – jawaban benar*.
5. **5 menit:** tulis 3 poin terpenting hari ini.

### Target skor sebelum tes

- Setiap blok teknis **≥ 70%** secara konsisten di dua simulasi terakhir.
- Konsistensi Traits **≥ 70**.
- Tidak ada blok yang waktunya habis dengan banyak soal kosong.
`,

minggu: [
 { judul:"Fondasi & Diagnosis", tujuan:"Mengukur kemampuan awal, menguasai logika dan dasar pemrograman",
   hari:[
    { fokus:"Diagnosis", durasi:"± 100 menit", tugas:[
      "Baca [Bab 0: Pengantar & Strategi](#modul-strategi)",
      "Kerjakan **Simulasi Penuh** pertama tanpa persiapan (70 menit) di menu [Simulasi](#simulasi)",
      "Catat skor setiap blok dan urutkan dari yang terlemah; itu prioritas belajarmu",
      "Siapkan buku kesalahan (kertas atau catatan digital)",
      "Buat akun IBM SkillsBuild dan cek kelas wajib di dashboard Pijak"
    ]},
    { fokus:"Logika 1", durasi:"± 100 menit", tugas:[
      "Baca Bab 2.1 bagian 1–4: [computational thinking, logika proposisi, silogisme, jenis penalaran](#modul-logika)",
      "Buat sendiri tabel kebenaran untuk p → q, p ↔ q, dan ¬(p ∧ q)",
      "Hafalkan pasangan: kontraposisi setara, konvers dan invers tidak",
      "Kerjakan 10 soal silogisme memakai diagram Venn (gunakan contoh di modul, lalu buat variasinya)"
    ]},
    { fokus:"Logika 2", durasi:"± 100 menit", tugas:[
      "Baca Bab 2.1 bagian 5–7: [pola deret, penalaran analitis, kombinatorika](#modul-logika)",
      "Hafalkan jangkar huruf: E=5, J=10, O=15, T=20, Y=25",
      "Coba soal-soal tantangan computational thinking di [buku Tantangan Bebras Indonesia](https://bebras.usk.ac.id/wp-content/uploads/2025/09/D-Bebras-SMA-Penegak-2020.pdf)",
      "Latihan blok **Logical Reasoning** di simulasi, lalu pelajari pembahasannya"
    ]},
    { fokus:"Algoritma", durasi:"± 100 menit", tugas:[
      "Baca Bab 2.1 bagian 8–12: [algoritma, sorting, rekursi, Big-O](#modul-logika)",
      "Tonton animasi bubble, selection, insertion, dan merge sort di [VisuAlgo](https://visualgo.net/en/sorting)",
      "Telusuri dengan tabel jejak 3 pseudocode berisi loop dan kondisi",
      "Ulang kilat: silogisme dan negasi kuantor (spaced repetition hari ke-3)"
    ]},
    { fokus:"Pemrograman 1", durasi:"± 110 menit", tugas:[
      "Baca Bab 2.2 bagian 1–4: [cara program dijalankan, tipe data, operator, kontrol alur](#modul-pemrograman)",
      "Jalankan sendiri semua contoh jebakan Python dan JavaScript (di [Python Tutor](https://pythontutor.com/) atau console browser dengan F12)",
      "Buat daftar 10 perbedaan perilaku Python vs JavaScript dari ingatan"
    ]},
    { fokus:"Pemrograman 2", durasi:"± 110 menit", tugas:[
      "Baca Bab 2.2 bagian 5–7: [fungsi, scope, hoisting, closure, rekursi](#modul-pemrograman)",
      "Visualisasikan closure dan rekursi langkah demi langkah di [Python Tutor](https://pythontutor.com/)",
      "Selesaikan 3 soal mudah di [HackerRank](https://www.hackerrank.com/domains/python) atau [Exercism](https://exercism.org/)",
      "Latihan blok **Programming Fundamentals**"
    ]},
    { fokus:"Ulasan ringan", durasi:"± 60 menit", tugas:[
      "Baca ulang buku kesalahan minggu ini",
      "Jelaskan dengan teknik Feynman: implikasi, binary search, dan closure",
      "Istirahat yang cukup. Istirahat termasuk bagian dari jadwal"
    ]}
   ]},
 { judul:"Pemrograman Lanjut & Data", tujuan:"Menguasai struktur data, OOP, Git, SQL, dan sistem",
   hari:[
    { fokus:"Struktur data", durasi:"± 110 menit", tugas:[
      "Baca Bab 2.2 bagian 8: [struktur data dan operasi string/list](#modul-pemrograman)",
      "Simulasikan push/pop stack dan enqueue/dequeue queue di kertas",
      "Lihat animasi linked list, stack, queue, dan BST di [VisuAlgo](https://visualgo.net/en)",
      "Ulang kilat: Big-O dan sorting (spaced repetition hari ke-7)"
    ]},
    { fokus:"OOP & Git", durasi:"± 110 menit", tugas:[
      "Baca Bab 2.2 bagian 9–13: [OOP, SOLID, error handling, clean code, Git](#modul-pemrograman)",
      "Tulis class Hewan, Kucing, dan Anjing sendiri untuk mempraktikkan inheritance dan polymorphism",
      "Selesaikan level dasar [Learn Git Branching](https://learngitbranching.js.org/)",
      "Latihan blok **Programming Fundamentals** (kedua kalinya)"
    ]},
    { fokus:"Basis data", durasi:"± 110 menit", tugas:[
      "Baca Bab 2.3 bagian 1–3: [model relasional, kunci, ERD, normalisasi](#modul-data-sistem)",
      "Gambar ERD sederhana untuk aplikasi toko online (pelanggan, produk, pesanan, detail pesanan)",
      "Normalisasi satu tabel contoh sampai 3NF"
    ]},
    { fokus:"SQL", durasi:"± 120 menit", tugas:[
      "Baca Bab 2.3 bagian 4–5: [SQL, JOIN, subquery, index, transaksi ACID](#modul-data-sistem)",
      "Selesaikan pelajaran 1–12 di [SQLBolt](https://sqlbolt.com/)",
      "Hafalkan urutan eksekusi: FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY → LIMIT",
      "Ulang kilat: OOP dan struktur data (spaced repetition hari ke-3)"
    ]},
    { fokus:"Sistem komputer", durasi:"± 110 menit", tugas:[
      "Baca Bab 2.3 bagian 6–9: [NoSQL, CAP, representasi data, arsitektur, sistem operasi](#modul-data-sistem)",
      "Latihan konversi: 5 bilangan biner ↔ desimal ↔ heksadesimal",
      "Hitung rata-rata waktu tunggu FCFS vs SJF untuk satu contoh buatanmu"
    ]},
    { fokus:"Jaringan & cloud", durasi:"± 110 menit", tugas:[
      "Baca Bab 2.3 bagian 10–12: [jaringan, cloud, dasar data & AI](#modul-data-sistem)",
      "Baca tentang DNS dan TCP/IP di [Cloudflare Learning Center](https://www.cloudflare.com/learning/)",
      "Tuliskan dari ingatan 7 langkah \"apa yang terjadi saat mengetik URL\"",
      "Latihan blok **Data & System Foundations**"
    ]},
    { fokus:"Evaluasi minggu 2", durasi:"± 90 menit", tugas:[
      "Kerjakan **Simulasi Penuh** kedua dan bandingkan dengan hari ke-1",
      "Ulang kilat logika dan algoritma (spaced repetition hari ke-14)",
      "Perbarui buku kesalahan dan tandai topik yang masih di bawah 70%"
    ]}
   ]},
 { judul:"Frontend & Backend", tujuan:"Menguasai web dari browser sampai server",
   hari:[
    { fokus:"HTML & CSS 1", durasi:"± 110 menit", tugas:[
      "Baca Bab 2.4 bagian 1–3 (sampai Display dan position): [cara kerja browser, HTML, selector, specificity, box model](#modul-frontend)",
      "Selesaikan semua level [CSS Diner](https://flukeout.github.io/) untuk melatih selector",
      "Buat satu halaman profil sederhana dengan HTML semantik"
    ]},
    { fokus:"CSS layout", durasi:"± 110 menit", tugas:[
      "Baca Bab 2.4 bagian 3 (Flexbox sampai akhir CSS): [flexbox, grid, satuan, responsif](#modul-frontend)",
      "Selesaikan [Flexbox Froggy](https://flexboxfroggy.com/) dan [Grid Garden](https://cssgridgarden.com/)",
      "Buat halaman profil tadi menjadi responsif dengan pendekatan mobile-first",
      "Ulang kilat: SQL JOIN dan normalisasi (spaced repetition hari ke-7)"
    ]},
    { fokus:"JavaScript & DOM", durasi:"± 120 menit", tugas:[
      "Baca Bab 2.4 bagian 4–5: [ES6+, this, DOM, event, storage, event loop, fetch](#modul-frontend)",
      "Lihat visualisasi event loop di [Loupe](http://latentflip.com/loupe/)",
      "Buat to-do list kecil yang menyimpan data di localStorage",
      "Latihan blok **Frontend / Client-Side**"
    ]},
    { fokus:"React & kualitas web", durasi:"± 110 menit", tugas:[
      "Baca Bab 2.4 bagian 6–10: [React, tooling, performa, aksesibilitas, keamanan](#modul-frontend)",
      "Ikuti tutorial Tic-Tac-Toe di [react.dev](https://react.dev/learn/tutorial-tic-tac-toe)",
      "Jalankan Lighthouse (DevTools browser) pada satu situs dan baca skor LCP, INP, dan CLS"
    ]},
    { fokus:"HTTP & REST", durasi:"± 110 menit", tugas:[
      "Baca Bab 2.5 bagian 1–4: [client-server, HTTP, REST, contoh Express](#modul-backend)",
      "Hafalkan kode status 200, 201, 204, 301, 304, 400, 401, 403, 404, 409, 429, 500, 503",
      "Buka tab Network di DevTools, lalu amati method, status, dan header dari beberapa request",
      "Ulang kilat: CSS specificity dan event loop (spaced repetition hari ke-3)"
    ]},
    { fokus:"Auth & keamanan", durasi:"± 120 menit", tugas:[
      "Baca Bab 2.5 bagian 5–7: [database di backend, autentikasi, otorisasi, OWASP](#modul-backend)",
      "Dekode sebuah contoh token di [jwt.io](https://jwt.io/) dan perhatikan bahwa payload-nya bisa dibaca",
      "Baca ringkasan [OWASP Top 10](https://owasp.org/www-project-top-ten/)",
      "Latihan blok **Backend / Server-Side**"
    ]},
    { fokus:"Arsitektur & ulasan", durasi:"± 90 menit", tugas:[
      "Baca Bab 2.5 bagian 8–10: [caching, scaling, testing, deployment](#modul-backend)",
      "Gambar diagram arsitektur 3-tier dengan cache dan load balancer dari ingatan",
      "Ulang kilat seluruh buku kesalahan minggu 1–3"
    ]}
   ]},
 { judul:"Traits, Integrasi & Simulasi", tujuan:"Memantapkan semua blok dan siap secara mental di hari tes",
   hari:[
    { fokus:"Traits", durasi:"± 90 menit", tugas:[
      "Baca [Bab 3.1: Traits Assessment](#modul-traits)",
      "Tulis jawaban 6 pertanyaan refleksi diri di bab tersebut",
      "Latihan blok **Traits Assessment**, lalu periksa skor konsistensinya",
      "Opsional: coba tes Big Five gratis di [Open Psychometrics](https://openpsychometrics.org/tests/IPIP-BFFM/) untuk mengenal diri"
    ]},
    { fokus:"Simulasi penuh 3", durasi:"± 100 menit", tugas:[
      "Kerjakan **Simulasi Penuh** dalam kondisi seperti tes asli (laptop, ruangan tenang, tanpa gangguan)",
      "Analisis: blok mana yang di bawah 70%? Apakah ada blok yang kehabisan waktu?",
      "Ulang kilat Frontend dan Backend (spaced repetition hari ke-7)"
    ]},
    { fokus:"Perbaikan blok terlemah", durasi:"± 110 menit", tugas:[
      "Baca ulang bab untuk **dua blok dengan skor terendah**, fokus pada bagian Ringkasan Cepat dan pembahasan soal yang salah",
      "Latihan dua blok tersebut masing-masing 2 kali",
      "Perkaya materi dengan satu sumber dari menu [Sumber](#sumber) untuk topik terlemah"
    ]},
    { fokus:"Interleaving", durasi:"± 100 menit", tugas:[
      "Latihan kelima blok teknis secara bergantian (logika → SQL → kode → frontend → backend)",
      "Fokus pada manajemen waktu: putaran pertama ≤ 6 menit per blok",
      "Ulang kilat: Ringkasan Cepat semua bab"
    ]},
    { fokus:"Simulasi penuh 4", durasi:"± 100 menit", tugas:[
      "Kerjakan **Simulasi Penuh** terakhir",
      "Targetkan setiap blok ≥ 70% dan konsistensi Traits ≥ 70",
      "Pelajari semua pembahasan, lalu baca buku kesalahan sekali lagi"
    ]},
    { fokus:"H-1: persiapan teknis", durasi:"± 60 menit", tugas:[
      "Baca ulang modul Kode Etik resmi di dashboard tes",
      "Cek laptop, charger, koneksi internet (siapkan hotspot cadangan), dan browser versi terbaru",
      "Baca Ringkasan Cepat setiap bab secara santai, jangan mempelajari materi baru",
      "Tidur 7–9 jam"
    ]},
    { fokus:"Hari tes", durasi:"70 menit tes", tugas:[
      "Makan secukupnya, siapkan air minum, tutup aplikasi lain, dan matikan notifikasi",
      "Ingat strategi dua putaran dan jangan menekan Selesai lebih awal",
      "Untuk Traits: jawab dengan jujur, baca negasi dengan teliti",
      "Kerjakan sendiri dan percaya pada persiapanmu"
    ]}
   ]}
]
};
