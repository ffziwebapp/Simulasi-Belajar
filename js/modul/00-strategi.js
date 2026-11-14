MODUL.push({
id:"strategi", no:"0", blok:null, menit:15,
judul:"Pengantar & Strategi Menghadapi Tes",
ringkas:"Mengenal program, format tes blok waktu terkunci, dan strategi mengerjakan soal secara efisien",
md:String.raw`
## Mengenal Program Pijak

Pijak adalah program pengembangan talenta digital hasil kolaborasi **IBM Indonesia melalui IBM SkillsBuild** dan **Dicoding Indonesia**. IBM SkillsBuild adalah program pendidikan teknologi gratis dari IBM, sedangkan Dicoding bertindak sebagai penyedia kurikulum dan penyelenggara.

Gambaran batch sebelumnya (Pijak 2026):

- Lebih dari 20.000 peserta mendapat akses materi IBM SkillsBuild, seperti Introduction to AI, Generative AI, dan AI Ethics.
- Lebih dari 600 peserta dengan performa terbaik melanjutkan ke **tahap intensif berbasis proyek** dengan pendampingan praktisi industri, diakhiri proyek akhir (capstone).
- Lulusan dipertemukan dengan perusahaan lewat Pijak Career Fair.

Struktur tes seleksi 2027 dengan section Frontend dan Backend menunjukkan bahwa batch ini juga menilai **kesiapan sebagai software developer**, bukan hanya literasi AI. Karena itu modul ini membahas fondasi rekayasa perangkat lunak secara menyeluruh.

> **Ingat:** Informasi resmi (jadwal, syarat, pengumuman) hanya dari dashboard program Dicoding dan email yang kamu daftarkan. Situs ini adalah bahan belajar tidak resmi.

## Format Tes

| Section | Jumlah blok | Durasi tiap blok | Total |
|---|---|---|---|
| Technical Assessment | 5 | 10 menit | 50 menit |
| Traits Assessment | 1 | 20 menit | 20 menit |
| **Total** | **6** | | **70 menit** |

Kelima blok Technical Assessment adalah:

1. **Logical Reasoning & Computational Thinking**: pola, logika, dan cara berpikir algoritmis.
2. **Programming Fundamentals**: konsep pemrograman yang tidak terikat bahasa, plus membaca kode.
3. **Data & System Foundations**: basis data, SQL, cara kerja komputer, sistem operasi, dan jaringan.
4. **Frontend / Client-Side**: HTML, CSS, JavaScript di browser, dan framework UI.
5. **Backend / Server-Side**: HTTP, API, autentikasi, keamanan, dan arsitektur server.

Aturan penting dari modul Kode Etik:

- Kode etik berlaku sejak kamu membuka halaman tes hingga selesai.
- Tes dikerjakan dalam **blok waktu terkunci**. Setiap blok berjalan sendiri dan tidak bisa dibuka lagi setelah waktunya habis.
- **Sisa waktu satu blok tidak dipindahkan** ke blok berikutnya.
- Siapkan satu perangkat komputer atau laptop dan browser yang disarankan (misalnya Chrome atau Firefox versi terbaru). Periksa persyaratan lengkap di halaman modul resmi sebelum menekan tombol mulai.

## Strategi Manajemen Waktu

Dengan 10 menit per blok, anggap kamu punya sekitar **60 detik per soal** jika soalnya 10. Waktu ini tidak bisa ditabung untuk blok lain, jadi manfaatkan sampai habis.

### Teknik dua putaran

1. **Putaran 1 (± 6 menit):** kerjakan soal dari awal sampai akhir. Jika sebuah soal butuh lebih dari 60–90 detik, pilih jawaban sementara, **tandai ragu**, lalu lanjut.
2. **Putaran 2 (± 3 menit):** kembali ke soal yang ditandai dan kerjakan lebih teliti.
3. **Menit terakhir:** pastikan tidak ada soal yang kosong.

> **Teori:** Strategi ini berangkat dari konsep *opportunity cost*. Waktu yang habis untuk satu soal sulit adalah waktu yang hilang untuk dua atau tiga soal mudah. Dalam tes berwaktu, skor maksimal didapat dengan memastikan semua soal mudah terjawab lebih dulu.

### Jangan menyelesaikan blok terlalu cepat

Karena sisa waktu hangus, tidak ada keuntungan menekan **Selesai** lebih awal. Gunakan sisa waktu untuk memeriksa ulang soal hitungan dan soal membaca kode, karena di dua jenis soal inilah kesalahan karena terburu-buru paling sering terjadi.

### Isi semua soal

Kecuali ada informasi resmi bahwa jawaban salah dikurangi nilai, **jangan biarkan soal kosong**. Tebakan dari 4 pilihan masih punya peluang benar 25%, dan peluangnya naik menjadi 50% jika kamu bisa menyingkirkan dua opsi.

## Teknik Menjawab Pilihan Ganda

### Eliminasi

Coret opsi yang pasti salah lebih dulu. Ciri opsi yang biasanya salah:

- Memakai kata absolut seperti *selalu*, *tidak pernah*, atau *pasti*, padahal konsepnya punya pengecualian.
- Istilah yang terdengar teknis tetapi tidak ada, misalnya <code>git download</code> atau properti CSS karangan.
- Mencampur dua konsep, misalnya menjelaskan DHCP saat ditanya fungsi DNS.

### Membaca soal kode

1. Baca **pertanyaannya** dulu: apa yang diminta, output, nilai variabel, atau letak error?
2. Identifikasi bahasanya (Python atau JavaScript), karena aturannya berbeda, misalnya <code>//</code> di Python adalah pembagian bulat sedangkan di JavaScript adalah komentar.
3. Buat **tabel jejak (trace table)** di kertas coretan untuk setiap variabel.
4. Perhatikan batas loop (<code>&lt;</code> atau <code>&lt;=</code>), indeks yang dimulai dari 0, dan <code>break</code>/<code>continue</code>.

### Soal konsep

Untuk soal "manakah yang benar/salah", ubah setiap opsi menjadi pernyataan benar–salah lalu nilai satu per satu. Jangan terpaku pada opsi pertama yang terdengar benar.

## Persiapan Hari H

- Laptop dengan daya penuh atau tersambung charger, internet stabil (siapkan hotspot cadangan).
- Browser versi terbaru, tutup tab lain, matikan notifikasi.
- Kertas dan pulpen untuk coretan, jika diizinkan oleh aturan tes.
- Ruangan tenang dan tidak ada orang lain yang membantu.
- Tidur cukup. Kurang tidur menurunkan kemampuan memori kerja dan penalaran logis.
- Baca ulang modul Kode Etik resmi sebelum menekan mulai.

## Kode Etik dan Integritas

Kode etik tes bertujuan memastikan setiap peserta dinilai atas kemampuannya sendiri dalam kondisi yang setara. Selama tes, **jangan**:

- Membuka tab, aplikasi, mesin pencari, atau AI lain.
- Meminta bantuan orang lain, atau membagikan soal dan jawaban.
- Memakai perangkat kedua.

Platform tes umumnya dapat mendeteksi perpindahan tab. Selain berisiko didiskualifikasi, menyontek juga merugikan dirimu sendiri: tahap intensif berbasis proyek menuntut kemampuan nyata, dan tes ini memastikan kamu siap mengikutinya.

## Cara Memakai Situs Ini

1. Mulai dengan **Simulasi Penuh** sekali untuk mengukur kemampuan awal.
2. Ikuti **Jadwal Belajar 28 Hari** dan baca bab modul sesuai urutan di jadwal.
3. Setelah membaca satu bab, langsung kerjakan **latihan blok** yang sesuai.
4. Pelajari pembahasan setiap soal yang salah, lalu kembali ke bagian modul yang relevan.
5. Perkaya materi dengan halaman **Sumber**, terutama untuk topik yang skornya masih di bawah 70%.
`});
