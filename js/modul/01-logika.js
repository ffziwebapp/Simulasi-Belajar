MODUL.push({
id:"logika", no:"2.1", blok:"logic", menit:45,
judul:"Logical Reasoning & Computational Thinking",
ringkas:"Computational thinking, logika proposisi, silogisme, pola deret, kombinatorika, algoritma, dan kompleksitas",
md:String.raw`
## Peta Materi

Blok ini mengukur **cara berpikir**, bukan hafalan. Soalnya biasanya terbagi dalam lima kelompok:

| Kelompok | Contoh bentuk soal |
|---|---|
| Computational thinking | Pilar mana yang dipakai dalam sebuah skenario |
| Logika formal | Kesimpulan silogisme, negasi, implikasi, tabel kebenaran |
| Pola | Deret angka/huruf, kode sandi, analogi |
| Penalaran analitis | Urutan posisi, siapa paling tinggi, penjadwalan |
| Algoritma | Menelusuri pseudocode/flowchart, sorting, searching, kompleksitas |

## 1. Computational Thinking

> **Teori:** Istilah *computational thinking* dipopulerkan oleh Jeannette Wing (2006), yang mengartikannya sebagai cara berpikir untuk merumuskan masalah dan solusinya sehingga solusi itu bisa dijalankan oleh manusia maupun mesin. Kerangka yang umum dipakai di pendidikan (misalnya oleh BBC Bitesize dan Google for Education) membaginya menjadi empat pilar.

| Pilar | Pertanyaan kunci | Contoh |
|---|---|---|
| **Dekomposisi** | Bisakah masalah ini dipecah menjadi bagian kecil? | Membuat aplikasi ojek online: akun, peta, pemesanan, pembayaran, rating |
| **Pengenalan pola** | Apa kesamaan atau keteraturannya? | Semua form butuh validasi, jadi cukup dibuat satu fungsi validasi |
| **Abstraksi** | Detail apa yang bisa diabaikan? | Peta KRL hanya menampilkan stasiun dan jalur, tanpa jarak sebenarnya |
| **Algoritma** | Langkah apa saja, dan dalam urutan apa? | Resep, pseudocode, flowchart |

Selain empat pilar, ada juga **evaluasi** (menilai apakah solusi benar dan efisien) dan **generalisasi** (memakai solusi yang sama untuk masalah serupa).

> **Tips:** Kata kunci di soal: *memecah/membagi* → dekomposisi; *kesamaan/berulang/tren* → pengenalan pola; *menyederhanakan/mengabaikan detail/model* → abstraksi; *langkah-langkah/urutan/prosedur* → algoritma.

## 2. Logika Proposisi

**Proposisi** adalah kalimat yang bernilai benar (B) atau salah (S), tetapi tidak keduanya. "Jakarta ibu kota Indonesia" adalah proposisi, sedangkan "Tolong tutup pintunya" bukan.

### Operator logika

| Operator | Simbol | Di kode | Bernilai benar jika… |
|---|---|---|---|
| Negasi (NOT) | ¬p | <code>!p</code> / <code>not p</code> | p salah |
| Konjungsi (AND) | p ∧ q | <code>&amp;&amp;</code> / <code>and</code> | keduanya benar |
| Disjungsi (OR) | p ∨ q | <code>\|\|</code> / <code>or</code> | minimal satu benar |
| Implikasi | p → q | – | selalu, **kecuali** p benar dan q salah |
| Biimplikasi | p ↔ q | <code>==</code> | nilai p dan q sama |
| XOR | p ⊕ q | <code>^</code> | nilai p dan q berbeda |

### Tabel kebenaran

| p | q | p ∧ q | p ∨ q | p → q | p ↔ q |
|---|---|---|---|---|---|
| B | B | B | B | B | B |
| B | S | S | B | **S** | S |
| S | B | S | B | B | S |
| S | S | S | S | B | B |

Implikasi sering membingungkan. Bayangkan janji: "Jika kamu lulus tes (p), kamu dapat beasiswa (q)". Janji itu hanya **dilanggar** jika kamu lulus tetapi tidak mendapat beasiswa. Jika kamu tidak lulus, apa pun hasilnya, janji itu tidak dilanggar.

### Konvers, invers, kontraposisi

Dari implikasi p → q:

| Bentuk | Rumus | Setara dengan p → q? |
|---|---|---|
| Konvers | q → p | Tidak |
| Invers | ¬p → ¬q | Tidak |
| **Kontraposisi** | ¬q → ¬p | **Ya** |

Contoh: "Jika hujan, maka jalan basah." Kontraposisinya: "Jika jalan tidak basah, maka tidak hujan" (pasti benar). Konversnya: "Jika jalan basah, maka hujan" (belum tentu, bisa karena disiram).

### Hukum-hukum penting

- **De Morgan:** ¬(p ∧ q) ≡ ¬p ∨ ¬q, dan ¬(p ∨ q) ≡ ¬p ∧ ¬q.
- **Negasi implikasi:** ¬(p → q) ≡ p ∧ ¬q. Negasi dari "Jika belajar, maka lulus" adalah "Belajar **dan** tidak lulus".
- **Implikasi sebagai disjungsi:** p → q ≡ ¬p ∨ q.
- **Prioritas operator** (tertinggi ke terendah): NOT → AND → OR → implikasi → biimplikasi.

### Kuantor

| Kuantor | Bentuk | Negasinya |
|---|---|---|
| Universal (∀) | "Semua x bersifat P" | "**Ada** x yang **tidak** bersifat P" |
| Eksistensial (∃) | "Ada x yang bersifat P" | "**Semua** x **tidak** bersifat P" (= tidak ada x yang P) |

> **Jebakan:** Negasi "Semua peserta lulus" **bukan** "Semua peserta tidak lulus", melainkan "Ada peserta yang tidak lulus".

### Pola penarikan kesimpulan yang sah

| Nama | Premis | Kesimpulan |
|---|---|---|
| Modus ponens | p → q; p | q |
| Modus tollens | p → q; ¬q | ¬p |
| Silogisme hipotetis | p → q; q → r | p → r |
| Silogisme disjungtif | p ∨ q; ¬p | q |

Dua kesalahan yang sering dijadikan opsi jebakan:

- **Menegaskan konsekuen:** p → q; q, maka p. Ini **tidak sah**.
- **Menyangkal anteseden:** p → q; ¬p, maka ¬q. Ini juga **tidak sah**.

<details><summary>Contoh soal: modus tollens</summary>

**Soal:** "Jika server menyala, website bisa diakses. Website tidak bisa diakses." Kesimpulannya?

**Pembahasan:** p = server menyala, q = website bisa diakses. Diketahui p → q dan ¬q, maka berlaku modus tollens: ¬p, yaitu **server tidak menyala**.

</details>

## 3. Silogisme Kategoris

Silogisme kategoris memakai kata *semua*, *sebagian*, dan *tidak ada*. Cara paling aman adalah **diagram Venn**: gambar lingkaran untuk setiap himpunan, lalu periksa apakah kesimpulan **pasti** benar di semua kemungkinan gambar.

| Premis 1 | Premis 2 | Kesimpulan |
|---|---|---|
| Semua A adalah B | Semua B adalah C | Semua A adalah C |
| Semua A adalah B | Sebagian C adalah A | Sebagian C adalah B |
| Semua A adalah B | Tidak ada B yang C | Tidak ada A yang C |
| Sebagian A adalah B | Sebagian B adalah C | **Tidak dapat disimpulkan** |
| Semua A adalah B | Sebagian B adalah C | **Tidak dapat disimpulkan** tentang A dan C |
| Tidak ada A yang B | Tidak ada B yang C | **Tidak dapat disimpulkan** |

Aturan praktis:

1. Jika kedua premis memakai "sebagian", **tidak ada** kesimpulan pasti.
2. Jika kedua premis negatif ("tidak ada"), **tidak ada** kesimpulan pasti.
3. Jika salah satu premis memakai "sebagian", kesimpulannya juga "sebagian".
4. Jika salah satu premis negatif, kesimpulannya juga negatif.
5. "Semua A adalah B" **tidak** berarti "Semua B adalah A".

<details><summary>Contoh soal: premis "sebagian"</summary>

**Soal:** Semua programmer suka kopi. Sebagian penyuka kopi suka begadang. Apa kesimpulan yang pasti?

**Pembahasan:** Gambar lingkaran "programmer" di dalam lingkaran "kopi". Lingkaran "begadang" memotong sebagian lingkaran "kopi", tetapi bisa saja potongannya tidak mengenai lingkaran "programmer". Jadi **tidak dapat dipastikan** apakah ada programmer yang suka begadang.

</details>

## 4. Penalaran Deduktif, Induktif, dan Abduktif

| Jenis | Arah | Kepastian | Contoh |
|---|---|---|---|
| **Deduktif** | Umum → khusus | Pasti benar jika premis benar | Semua manusia fana; Budi manusia; jadi Budi fana |
| **Induktif** | Khusus → umum | Mungkin benar | 10 kali deploy hari Jumat bermasalah, jadi deploy Jumat berisiko |
| **Abduktif** | Akibat → penjelasan terbaik | Dugaan | Website lambat dan CPU 100%, kemungkinan ada query berat |

Debugging pada dasarnya adalah penalaran abduktif (membuat dugaan), lalu diuji secara deduktif (jika dugaan benar, maka X akan terjadi).

## 5. Pola Deret dan Kode

### Langkah sistematis menganalisis deret angka

1. **Selisih tingkat 1.** 5, 8, 11, 14 → +3.
2. **Selisih tingkat 2.** 2, 6, 12, 20, 30: selisihnya 4, 6, 8, 10 → naik 2, jadi berikutnya 30 + 12 = **42**.
3. **Rasio.** 3, 6, 12, 24 → ×2.
4. **Bilangan khusus.** Kuadrat (1, 4, 9, 16), kubik (1, 8, 27), prima (2, 3, 5, 7, 11, 13), segitiga (1, 3, 6, 10, 15), Fibonacci (1, 1, 2, 3, 5, 8).
5. **Rumus suku ke-n.** n(n+1), 2ⁿ − 1, n² + 1.
6. **Deret berselang.** 2, 10, 4, 20, 6, 30 → suku ganjil 2, 4, 6 dan suku genap 10, 20, 30.
7. **Operasi bergantian.** 3, 6, 4, 8, 6, 12 → ×2, −2, ×2, −2.

### Deret huruf

Ubah huruf menjadi angka: A=1, B=2, … Z=26. Hafalkan beberapa jangkar: **E=5, J=10, O=15, T=20, Y=25**.

| Deret | Angka | Pola | Berikutnya |
|---|---|---|---|
| A, C, F, J, O | 1, 3, 6, 10, 15 | +2, +3, +4, +5 | +6 = 21 = **U** |
| Z, X, U, Q | 26, 24, 21, 17 | −2, −3, −4 | −5 = 12 = **L** |
| B, D, F, H | 2, 4, 6, 8 | +2 | **J** |

### Kode sandi

Cari pola transformasinya: geser huruf (Caesar cipher), dibalik, posisi huruf dijumlahkan, atau vokal diganti.

<details><summary>Contoh soal: Caesar cipher</summary>

**Soal:** Jika KODE ditulis LPEF, maka DATA ditulis?

**Pembahasan:** K→L, O→P, D→E, E→F, berarti setiap huruf digeser +1. DATA menjadi **EBUB**.

</details>

## 6. Penalaran Analitis (Urutan dan Posisi)

Untuk soal seperti "A lebih tinggi dari B, C lebih pendek dari B…":

1. Tulis setiap informasi dengan simbol: A > B, C < B.
2. Gabungkan menjadi satu garis: A > B > C.
3. Informasi yang belum pasti dicatat sebagai cabang. Jangan dipaksakan.

Untuk soal susunan duduk atau penjadwalan, buat **tabel atau slot** dan isi dari informasi yang paling pasti, misalnya "D duduk di ujung kiri".

## 7. Kombinatorika dan Peluang Dasar

| Konsep | Rumus | Kapan dipakai | Contoh |
|---|---|---|---|
| Aturan perkalian | n₁ × n₂ × … | Pilihan bertahap yang saling bebas | 3 baju × 2 celana = 6 kombinasi |
| Faktorial | n! = n × (n−1) × … × 1 | Menyusun semua objek | 4 buku di rak = 4! = 24 |
| Permutasi | P(n,r) = n! / (n−r)! | **Urutan penting** | Ketua dan wakil dari 5 orang = 20 |
| Kombinasi | C(n,r) = n! / (r!(n−r)!) | **Urutan tidak penting** | Tim 2 orang dari 5 orang = 10 |
| Peluang | kejadian / ruang sampel | Kemungkinan | Dadu genap = 3/6 = 1/2 |

> **Tips:** Jabat tangan antar n orang = C(n, 2) = n(n−1)/2. Jumlah pertandingan setengah kompetisi (setiap tim bertemu sekali) memakai rumus yang sama.

## 8. Algoritma, Pseudocode, dan Flowchart

> **Teori:** Algoritma adalah urutan langkah yang **terbatas** (finite), **jelas** (definite), punya **input** dan **output**, serta **efektif** (bisa dikerjakan). Kriteria ini dirumuskan Donald Knuth dalam *The Art of Computer Programming*.

### Tiga struktur kontrol dasar

Teorema Böhm–Jacopini (1966) menyatakan bahwa setiap algoritma bisa disusun hanya dengan tiga struktur:

1. **Sekuensial**: langkah dijalankan berurutan.
2. **Seleksi**: percabangan (JIKA … MAKA … SELAIN ITU).
3. **Iterasi**: perulangan (UNTUK, SELAMA).

### Simbol flowchart

| Simbol | Bentuk | Fungsi |
|---|---|---|
| Terminator | Oval | Mulai / Selesai |
| Proses | Persegi panjang | Perhitungan, penugasan nilai |
| Input/Output | Jajar genjang | Membaca input / menampilkan output |
| Keputusan | Belah ketupat | Kondisi Ya/Tidak |
| Garis alir | Panah | Arah alur |
| Konektor | Lingkaran kecil | Penghubung antarbagian |

### Menelusuri pseudocode dengan tabel jejak

~~~text
total ← 0
i ← 1
SELAMA i <= 10
    JIKA i MOD 3 = 0 MAKA
        total ← total + i
    i ← i + 1
TAMPILKAN total
~~~

| i | i MOD 3 = 0? | total |
|---|---|---|
| 3 | Ya | 3 |
| 6 | Ya | 9 |
| 9 | Ya | **18** |

Hanya baris yang mengubah nilai yang perlu dicatat. Hasilnya **18**.

## 9. Searching dan Sorting

### Pencarian

| Algoritma | Syarat | Cara kerja | Kompleksitas |
|---|---|---|---|
| Linear search | Tidak ada | Periksa satu per satu dari awal | O(n) |
| Binary search | **Data terurut** | Bandingkan dengan elemen tengah, buang separuh data | O(log n) |

Binary search pada 1.000 data butuh paling banyak sekitar 10 perbandingan (2¹⁰ = 1.024). Pada 1 juta data sekitar 20 perbandingan.

### Pengurutan

| Algoritma | Ide | Rata-rata | Catatan |
|---|---|---|---|
| Bubble sort | Tukar pasangan bersebelahan; elemen terbesar "menggelembung" ke kanan | O(n²) | Paling sederhana |
| Selection sort | Cari elemen terkecil, taruh di depan | O(n²) | Jumlah pertukaran sedikit |
| Insertion sort | Sisipkan elemen ke posisi yang tepat di bagian yang sudah terurut | O(n²) | Cepat untuk data yang hampir terurut |
| Merge sort | Bagi dua, urutkan, lalu gabungkan (*divide and conquer*) | O(n log n) | Stabil, butuh memori tambahan |
| Quick sort | Pilih pivot, partisi kecil-besar, lalu rekursi | O(n log n) | Kasus terburuk O(n²) |

<details><summary>Contoh: satu putaran bubble sort</summary>

Data [5, 1, 4, 2]:

- Bandingkan 5 dan 1 → tukar → [1, 5, 4, 2]
- Bandingkan 5 dan 4 → tukar → [1, 4, 5, 2]
- Bandingkan 5 dan 2 → tukar → [1, 4, 2, **5**]

Setelah putaran pertama, elemen terbesar (5) sudah berada di posisi akhir.

</details>

## 10. Rekursi

Fungsi rekursif memanggil dirinya sendiri dan wajib memiliki:

1. **Base case**: kondisi berhenti.
2. **Recursive case**: pemanggilan dengan masalah yang lebih kecil, sehingga lama-kelamaan mencapai base case.

~~~text
FUNGSI faktorial(n)
    JIKA n = 0 MAKA KEMBALIKAN 1          // base case
    KEMBALIKAN n * faktorial(n - 1)       // recursive case
~~~

faktorial(4) = 4 × faktorial(3) = 4 × 3 × faktorial(2) = 4 × 3 × 2 × faktorial(1) = 4 × 3 × 2 × 1 × faktorial(0) = **24**.

Tanpa base case, fungsi akan terus memanggil dirinya sampai terjadi **stack overflow**.

## 11. Kompleksitas Algoritma (Big-O)

> **Teori:** Notasi Big-O menggambarkan **laju pertumbuhan** waktu atau memori terhadap ukuran input n pada kasus terburuk. Konstanta dan suku yang lebih kecil diabaikan: 3n² + 5n + 2 ditulis O(n²).

| Notasi | Nama | Contoh | n = 1.000 → kira-kira |
|---|---|---|---|
| O(1) | Konstan | Akses array dengan indeks | 1 |
| O(log n) | Logaritmik | Binary search | 10 |
| O(n) | Linear | Satu loop, linear search | 1.000 |
| O(n log n) | Linearitmik | Merge sort | 10.000 |
| O(n²) | Kuadratik | Dua loop bersarang | 1.000.000 |
| O(2ⁿ) | Eksponensial | Fibonacci rekursif naif | sangat besar |

Cara cepat menentukannya:

- Loop yang berjalan n kali → O(n).
- Loop bersarang n × n → O(n²).
- Loop yang membagi dua ruang setiap langkah (i = i × 2 atau n = n / 2) → O(log n).
- Dua loop yang **berurutan** (bukan bersarang) → O(n + n) = O(n).

## 12. Matematika Diskrit Singkat

- **Modulo:** sisa bagi. 17 MOD 5 = 2. Bilangan genap ⇔ n MOD 2 = 0.
- **Basis bilangan:** biner (2), oktal (8), desimal (10), heksadesimal (16). 1011₂ = 8 + 0 + 2 + 1 = 11.
- **Himpunan:** gabungan (A ∪ B), irisan (A ∩ B), selisih (A − B). |A ∪ B| = |A| + |B| − |A ∩ B|.

<details><summary>Contoh soal: himpunan</summary>

**Soal:** Dari 40 peserta, 25 menguasai Python, 18 menguasai JavaScript, dan 8 menguasai keduanya. Berapa yang tidak menguasai keduanya?

**Pembahasan:** |P ∪ J| = 25 + 18 − 8 = 35. Peserta yang tidak menguasai keduanya = 40 − 35 = **5**.

</details>

## Ringkasan Cepat

- Kontraposisi setara dengan implikasi; konvers dan invers tidak.
- Negasi "semua" adalah "ada yang tidak"; negasi p → q adalah p ∧ ¬q.
- Dua premis "sebagian" atau dua premis negatif → tidak ada kesimpulan pasti.
- Deret: cek selisih, selisih bertingkat, rasio, lalu bilangan khusus.
- Urutan penting → permutasi; tidak penting → kombinasi.
- Binary search butuh data terurut, O(log n). Loop bersarang → O(n²).
- Rekursi wajib punya base case.
`});
