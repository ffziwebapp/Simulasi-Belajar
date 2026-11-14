MODUL.push({
id:"data-sistem", no:"2.3", blok:"data", menit:60,
judul:"Data & System Foundations",
ringkas:"Model relasional, ERD, normalisasi, SQL lengkap, transaksi, NoSQL, arsitektur komputer, sistem operasi, jaringan, dan cloud",
md:String.raw`
## Peta Materi

Blok ini menggabungkan tiga bidang. Prioritaskan sesuai kemungkinan kemunculannya:

1. **Basis data dan SQL**: paling sering muncul, termasuk soal membaca query.
2. **Sistem komputer dan sistem operasi**: representasi data, memori, proses.
3. **Jaringan dan cloud**: DNS, TCP/IP, port, HTTP, model layanan cloud.

## 1. Data, Informasi, dan Basis Data

- **Data** adalah fakta mentah ("27", "Budi"). **Informasi** adalah data yang sudah diolah dan bermakna ("Budi berusia 27 tahun").
- **Basis data** adalah kumpulan data terorganisasi. **DBMS** (Database Management System) adalah perangkat lunak pengelolanya, misalnya MySQL, PostgreSQL, SQLite, dan MongoDB.
- Jenis data: **terstruktur** (tabel), **semi-terstruktur** (JSON, XML), dan **tidak terstruktur** (gambar, video, teks bebas).

## 2. Model Relasional

> **Teori:** Model relasional diperkenalkan oleh **Edgar F. Codd** (IBM, 1970). Data disimpan dalam **relasi** (tabel) yang terdiri dari **tuple** (baris) dan **atribut** (kolom). Hubungan antartabel dibentuk melalui nilai kunci, bukan pointer.

| Istilah formal | Istilah sehari-hari |
|---|---|
| Relasi | Tabel |
| Tuple | Baris / record |
| Atribut | Kolom / field |
| Domain | Himpunan nilai yang boleh untuk sebuah atribut |
| Kardinalitas | Jumlah baris |
| Derajat | Jumlah kolom |

### Jenis kunci (key)

| Kunci | Arti |
|---|---|
| **Super key** | Satu atau beberapa kolom yang bisa mengidentifikasi baris secara unik |
| **Candidate key** | Super key minimal (tanpa kolom berlebih) |
| **Primary key (PK)** | Candidate key yang dipilih: **unik dan tidak NULL** |
| **Alternate key** | Candidate key yang tidak dipilih menjadi PK |
| **Foreign key (FK)** | Kolom yang merujuk ke PK tabel lain untuk membentuk relasi |
| **Composite key** | Kunci yang terdiri dari lebih dari satu kolom |
| **Surrogate key** | Kunci buatan tanpa makna bisnis, misalnya id auto-increment |

**Integritas referensial** berarti setiap nilai FK harus ada di tabel yang dirujuk. Aturan <code>ON DELETE CASCADE</code> ikut menghapus baris anak ketika induknya dihapus.

### Relasi dan ERD

ERD (Entity Relationship Diagram) yang diperkenalkan Peter Chen (1976) menggambarkan **entitas**, **atribut**, dan **relasi**.

| Kardinalitas | Contoh | Implementasi |
|---|---|---|
| One-to-one (1:1) | Pengguna – Profil | FK unik di salah satu tabel |
| One-to-many (1:N) | Pelanggan – Pesanan | FK di sisi "many" (pesanan.id_pelanggan) |
| Many-to-many (M:N) | Mahasiswa – Mata kuliah | **Tabel penghubung** (KRS) berisi dua FK |

## 3. Normalisasi

> **Teori:** Normalisasi adalah proses menata tabel untuk mengurangi **redundansi** dan mencegah **anomali** saat insert, update, dan delete. Dasarnya adalah konsep **functional dependency**: A → B berarti nilai A menentukan nilai B.

Anomali yang dicegah:

- **Insert anomaly:** tidak bisa menambah data dosen baru sebelum ia punya mahasiswa.
- **Update anomaly:** alamat pelanggan tersimpan di 50 baris pesanan, lalu hanya sebagian yang terubah.
- **Delete anomaly:** menghapus pesanan terakhir ikut menghapus satu-satunya data pelanggan.

| Bentuk normal | Syarat | Pelanggaran khas |
|---|---|---|
| **1NF** | Setiap sel **atomik** (satu nilai), tidak ada kelompok berulang | Kolom hobi = "futsal, coding" |
| **2NF** | 1NF + tidak ada **ketergantungan parsial** pada sebagian composite key | Pada (id_mhs, id_mk) → nama_mhs, nama_mhs hanya bergantung pada id_mhs |
| **3NF** | 2NF + tidak ada **ketergantungan transitif** (non-key → non-key) | id_mhs → kode_pos → kota |
| **BCNF** | Setiap determinan adalah candidate key | Versi 3NF yang lebih ketat |

> **Tips:** Kalimat untuk menghafal 3NF: setiap atribut non-kunci bergantung pada **kunci (1NF), seluruh kunci (2NF), dan hanya kunci (3NF)**.

**Denormalisasi** adalah sengaja menambah redundansi untuk mempercepat pembacaan, misalnya di data warehouse atau laporan.

## 4. SQL

SQL (Structured Query Language) adalah bahasa deklaratif untuk basis data relasional.

| Kategori | Perintah | Fungsi |
|---|---|---|
| DDL (Data Definition) | <code>CREATE</code>, <code>ALTER</code>, <code>DROP</code>, <code>TRUNCATE</code> | Mengelola struktur |
| DML (Data Manipulation) | <code>SELECT</code>, <code>INSERT</code>, <code>UPDATE</code>, <code>DELETE</code> | Mengelola isi |
| DCL (Data Control) | <code>GRANT</code>, <code>REVOKE</code> | Hak akses |
| TCL (Transaction Control) | <code>COMMIT</code>, <code>ROLLBACK</code>, <code>SAVEPOINT</code> | Transaksi |

> **Ingat:** <code>DELETE</code> menghapus baris (bisa memakai WHERE dan bisa di-rollback). <code>TRUNCATE</code> mengosongkan seluruh tabel dengan cepat. <code>DROP</code> menghapus tabel beserta strukturnya.

### Membuat dan mengisi tabel

~~~sql
CREATE TABLE pelanggan (
  id      INT PRIMARY KEY AUTO_INCREMENT,
  nama    VARCHAR(100) NOT NULL,
  email   VARCHAR(100) UNIQUE,
  kota    VARCHAR(50) DEFAULT 'Jakarta'
);

CREATE TABLE pesanan (
  id            INT PRIMARY KEY AUTO_INCREMENT,
  id_pelanggan  INT,
  total         DECIMAL(12,2) CHECK (total >= 0),
  tanggal       DATE,
  FOREIGN KEY (id_pelanggan) REFERENCES pelanggan(id)
);

INSERT INTO pelanggan (nama, email, kota) VALUES ('Sari', 'sari@mail.id', 'Bandung');
UPDATE pelanggan SET kota = 'Bogor' WHERE id = 1;   -- tanpa WHERE, SEMUA baris berubah!
DELETE FROM pelanggan WHERE id = 1;
~~~

### Urutan penulisan vs urutan eksekusi SELECT

~~~sql
SELECT   kota, COUNT(*) AS jumlah      -- 5
FROM     pelanggan                     -- 1
WHERE    aktif = 1                     -- 2  menyaring BARIS
GROUP BY kota                          -- 3  mengelompokkan
HAVING   COUNT(*) > 5                  -- 4  menyaring KELOMPOK
ORDER BY jumlah DESC                   -- 6
LIMIT    10;                           -- 7
~~~

Konsekuensinya:

- <code>WHERE</code> **tidak bisa** memakai fungsi agregat (COUNT, SUM); gunakan <code>HAVING</code>.
- Alias dari SELECT umumnya **tidak bisa** dipakai di WHERE, tetapi bisa dipakai di ORDER BY.

### Operator penyaring

| Operator | Contoh | Arti |
|---|---|---|
| <code>=</code>, <code>&lt;&gt;</code> / <code>!=</code>, <code>&lt;</code>, <code>&gt;=</code> | <code>harga &gt;= 10000</code> | Perbandingan |
| <code>AND</code>, <code>OR</code>, <code>NOT</code> | <code>kota = 'Bogor' AND aktif = 1</code> | Logika |
| <code>BETWEEN</code> | <code>umur BETWEEN 18 AND 25</code> | Rentang, **inklusif** |
| <code>IN</code> | <code>kota IN ('Bogor', 'Depok')</code> | Salah satu dari daftar |
| <code>LIKE</code> | <code>nama LIKE 'A%'</code> | % = banyak karakter, _ = satu karakter |
| <code>IS NULL</code> | <code>email IS NULL</code> | Cek NULL (**bukan** <code>= NULL</code>) |

> **Jebakan:** <code>NULL = NULL</code> menghasilkan UNKNOWN, bukan TRUE. Gunakan <code>IS NULL</code>. <code>COUNT(*)</code> menghitung semua baris, sedangkan <code>COUNT(kolom)</code> mengabaikan NULL.

### Fungsi agregat

<code>COUNT</code>, <code>SUM</code>, <code>AVG</code>, <code>MIN</code>, <code>MAX</code>. Setiap kolom di SELECT yang bukan agregat **harus** dicantumkan di GROUP BY.

### JOIN

Contoh data: tabel **pelanggan** (1 Sari, 2 Budi, 3 Rina) dan **pesanan** (id_pelanggan: 1, 1, 2, 9).

| JOIN | Hasil | Jumlah baris |
|---|---|---|
| <code>INNER JOIN</code> | Hanya pasangan yang cocok: Sari ×2, Budi ×1 | 3 |
| <code>LEFT JOIN</code> | Semua pelanggan; Rina dengan kolom pesanan NULL | 4 |
| <code>RIGHT JOIN</code> | Semua pesanan; pesanan id 9 dengan kolom pelanggan NULL | 4 |
| <code>FULL OUTER JOIN</code> | Gabungan LEFT dan RIGHT | 5 |
| <code>CROSS JOIN</code> | Semua kombinasi (produk Kartesius) | 3 × 4 = 12 |
| <code>SELF JOIN</code> | Tabel di-join dengan dirinya sendiri | misalnya karyawan → atasan |

~~~sql
-- pelanggan yang BELUM pernah memesan
SELECT p.nama
FROM pelanggan p
LEFT JOIN pesanan o ON o.id_pelanggan = p.id
WHERE o.id IS NULL;
~~~

### Subquery, UNION, dan fungsi lain

~~~sql
-- produk dengan harga di atas rata-rata
SELECT nama FROM produk
WHERE harga > (SELECT AVG(harga) FROM produk);

-- pelanggan yang punya pesanan > 1 juta
SELECT nama FROM pelanggan
WHERE id IN (SELECT id_pelanggan FROM pesanan WHERE total > 1000000);

-- UNION menghapus duplikat, UNION ALL tidak
SELECT kota FROM pelanggan UNION SELECT kota FROM toko;

-- DISTINCT menghapus baris duplikat
SELECT DISTINCT kota FROM pelanggan;

-- CASE seperti if-else
SELECT nama, CASE WHEN total >= 1000000 THEN 'Besar' ELSE 'Kecil' END AS kategori
FROM pesanan;
~~~

<details><summary>Contoh soal: membaca query agregat</summary>

**Soal:** Tabel nilai(nama, mapel, skor) berisi: (Ani, MTK, 80), (Ani, IPA, 90), (Budi, MTK, 70), (Budi, IPA, 60), (Cici, MTK, 95). Apa hasil query berikut?

~~~sql
SELECT nama, AVG(skor) AS rata
FROM nilai
GROUP BY nama
HAVING AVG(skor) >= 75
ORDER BY rata DESC;
~~~

**Pembahasan:** Rata-rata Ani 85, Budi 65, Cici 95. Budi tersaring oleh HAVING. Setelah diurutkan menurun: **Cici 95, Ani 85**.

</details>

### Index dan view

- **Index** seperti daftar isi buku. Biasanya berbentuk **B-tree**, mempercepat pencarian dari O(n) menjadi O(log n), tetapi memperlambat INSERT/UPDATE dan memakan ruang. Kolom PK otomatis ter-index.
- **View** adalah query tersimpan yang dipakai seperti tabel virtual.
- **Stored procedure** adalah kumpulan perintah SQL yang disimpan di server. **Trigger** dijalankan otomatis saat terjadi event (INSERT/UPDATE/DELETE).

## 5. Transaksi dan ACID

Transaksi adalah sekumpulan operasi yang diperlakukan sebagai **satu unit**. Contohnya transfer: kurangi saldo A **dan** tambah saldo B. Keduanya harus berhasil, atau keduanya batal.

| Sifat | Arti |
|---|---|
| **Atomicity** | Semua operasi berhasil, atau tidak ada yang dijalankan (rollback) |
| **Consistency** | Data selalu berpindah dari satu keadaan valid ke keadaan valid lain sesuai aturan (constraint) |
| **Isolation** | Transaksi yang berjalan bersamaan tidak saling mengganggu |
| **Durability** | Data yang sudah di-commit tetap tersimpan walau listrik padam |

Masalah konkurensi yang dicegah oleh isolation: **dirty read** (membaca data yang belum di-commit), **non-repeatable read**, dan **phantom read**. Tingkat isolasi dari yang terlemah: Read Uncommitted → Read Committed → Repeatable Read → Serializable.

## 6. NoSQL dan Teorema CAP

| Jenis NoSQL | Model data | Contoh | Cocok untuk |
|---|---|---|---|
| Dokumen | JSON/BSON | MongoDB, Firestore | Data dengan skema fleksibel |
| Key-value | Kunci → nilai | Redis, DynamoDB | Cache, sesi |
| Kolom lebar | Keluarga kolom | Cassandra, HBase | Data tulis masif, time series |
| Graph | Simpul dan sisi | Neo4j | Relasi kompleks, rekomendasi |

| | SQL (relasional) | NoSQL |
|---|---|---|
| Skema | Tetap, didefinisikan di awal | Fleksibel |
| Skala | Umumnya vertikal | Umumnya horizontal (sharding) |
| Konsistensi | ACID kuat | Sering BASE (*eventually consistent*) |
| Relasi | JOIN | Data di-embed atau didenormalisasi |

> **Teori:** **Teorema CAP** (Eric Brewer, 2000) menyatakan bahwa sistem data terdistribusi hanya bisa menjamin dua dari tiga sifat: **Consistency** (setiap pembacaan mendapat data terbaru), **Availability** (setiap request mendapat respons), dan **Partition tolerance** (tetap berjalan meski jaringan antarnode terputus). Karena partisi jaringan tidak bisa dihindari, pilihan praktisnya saat terjadi partisi adalah **CP** atau **AP**.

## 7. Representasi Data

| Satuan | Nilai |
|---|---|
| 1 bit | 0 atau 1 |
| 1 nibble | 4 bit |
| 1 byte | 8 bit (256 kemungkinan nilai: 0–255) |
| 1 KB / KiB | 1.000 / 1.024 byte |
| 1 MB / MiB | 1.000² / 1.024² byte |

### Konversi bilangan

- **Biner → desimal:** jumlahkan pangkat 2. 1101₂ = 8 + 4 + 0 + 1 = **13**.
- **Desimal → biner:** bagi 2 berulang dan baca sisa dari bawah. 13 → 1101.
- **Heksadesimal:** 0–9 lalu A=10 sampai F=15. Satu digit heksa = 4 bit. 2F₁₆ = 2×16 + 15 = **47**; FF₁₆ = 255.
- **Oktal:** satu digit oktal = 3 bit.

### Lain-lain

- **Two's complement:** cara menyimpan bilangan negatif. Rentang 8-bit signed adalah −128 sampai 127.
- **Floating point (IEEE 754):** sebab mengapa 0.1 + 0.2 ≠ 0.3 tepat.
- **Encoding teks:** ASCII (7-bit, 128 karakter; 'A' = 65, 'a' = 97, '0' = 48), Unicode/UTF-8 (1–4 byte, mendukung semua aksara dan emoji).
- **Gerbang logika:** AND, OR, NOT, NAND, NOR, XOR. NAND dan NOR disebut gerbang universal karena semua gerbang lain bisa dibangun darinya.

## 8. Arsitektur Komputer

> **Teori:** Kebanyakan komputer modern mengikuti **arsitektur von Neumann** (1945): CPU, memori yang menyimpan **instruksi dan data bersama-sama**, perangkat I/O, dan bus penghubung. CPU menjalankan siklus **fetch → decode → execute** (→ store).

| Komponen | Fungsi |
|---|---|
| **ALU** | Operasi aritmetika dan logika |
| **Control Unit** | Mengatur alur instruksi |
| **Register** | Penyimpanan tercepat di dalam CPU |
| **Cache (L1/L2/L3)** | Memori cepat yang menyimpan data yang sering dipakai |
| **RAM** | Memori utama, **volatile** (hilang saat listrik mati) |
| **ROM** | Read-only, non-volatile (firmware/BIOS) |
| **SSD/HDD** | Penyimpanan sekunder, non-volatile |
| **GPU** | Ribuan inti untuk komputasi paralel (grafis, AI) |

**Hierarki memori** (makin ke bawah makin lambat, makin besar, makin murah): register → cache → RAM → SSD → HDD.

Konsep penting:

- **Clock speed (GHz):** jumlah siklus per detik. **Multi-core:** beberapa inti bekerja paralel.
- **Prinsip lokalitas:** data yang baru diakses dan data di dekatnya kemungkinan segera diakses lagi. Inilah alasan cache efektif.
- **32-bit vs 64-bit:** sistem 32-bit hanya bisa mengalamatkan memori hingga sekitar 4 GB.

## 9. Sistem Operasi

Sistem operasi adalah perantara antara perangkat keras dan aplikasi. Tugasnya meliputi **manajemen proses**, **memori**, **file**, **perangkat I/O**, dan **keamanan**. **Kernel** adalah inti OS yang berjalan dalam mode istimewa.

### Proses dan thread

| | Process | Thread |
|---|---|---|
| Definisi | Program yang sedang berjalan | Unit eksekusi di dalam proses |
| Memori | Ruang memori sendiri | **Berbagi** memori dengan thread lain di proses yang sama |
| Biaya pembuatan | Lebih mahal | Lebih ringan |
| Komunikasi | IPC (pipe, socket) | Lewat memori bersama, perlu sinkronisasi |

Status proses: **New → Ready → Running → Waiting/Blocked → Terminated**. **Context switch** adalah proses menyimpan status satu proses lalu memuat status proses lain.

- **Concurrency:** beberapa tugas berjalan bergantian dan tampak bersamaan.
- **Parallelism:** beberapa tugas benar-benar berjalan bersamaan di inti CPU yang berbeda.

### Penjadwalan CPU

| Algoritma | Cara kerja | Catatan |
|---|---|---|
| **FCFS** | Yang datang duluan dilayani duluan | Sederhana; proses panjang bisa membuat yang lain menunggu lama (convoy effect) |
| **SJF** | Pekerjaan terpendek lebih dulu | Rata-rata waktu tunggu minimal; proses panjang bisa *starvation* |
| **Round Robin** | Setiap proses mendapat jatah waktu (quantum) bergiliran | Adil, cocok untuk sistem interaktif |
| **Priority** | Prioritas tertinggi lebih dulu | Starvation diatasi dengan *aging* |

<details><summary>Contoh soal: FCFS vs SJF</summary>

**Soal:** Tiga proses tiba bersamaan dengan burst time P1 = 6, P2 = 2, P3 = 4. Berapa rata-rata waktu tunggu dengan FCFS (urutan P1, P2, P3) dan dengan SJF?

**Pembahasan:**
FCFS: P1 menunggu 0, P2 menunggu 6, P3 menunggu 8 → rata-rata (0 + 6 + 8) / 3 = **4,67**.
SJF (P2, P3, P1): P2 menunggu 0, P3 menunggu 2, P1 menunggu 6 → rata-rata (0 + 2 + 6) / 3 = **2,67**.

</details>

### Sinkronisasi dan deadlock

- **Race condition** terjadi ketika hasil bergantung pada urutan eksekusi thread. Pencegahannya memakai **mutex/lock**, **semaphore**, atau operasi atomik.
- **Critical section** adalah bagian kode yang mengakses resource bersama.
- **Deadlock** terjadi ketika proses saling menunggu resource yang dipegang proses lain selamanya.

> **Teori:** Empat **syarat Coffman** (1971) untuk deadlock, yang harus terpenuhi semuanya: **mutual exclusion**, **hold and wait**, **no preemption**, dan **circular wait**. Mematahkan salah satunya akan mencegah deadlock.

### Manajemen memori

- **Virtual memory:** setiap proses seolah punya ruang alamat sendiri yang besar. Sebagian datanya bisa disimpan di disk (swap).
- **Paging:** memori dibagi menjadi blok berukuran tetap (*page/frame*). **Page fault** terjadi ketika page yang diminta tidak ada di RAM.
- **Fragmentasi:** internal (sisa ruang di dalam blok) dan eksternal (ruang kosong tersebar).
- **Thrashing:** sistem terlalu sibuk memindahkan page sehingga kinerjanya merosot.

### Sistem file

File, direktori, path absolut (<code>/home/budi/a.txt</code>) dan path relatif (<code>../a.txt</code>), serta izin akses Unix: r (4), w (2), x (1). <code>chmod 755</code> berarti pemilik rwx, grup r-x, lainnya r-x.

## 10. Jaringan Komputer

### Model OSI dan TCP/IP

| Lapisan OSI | TCP/IP | Fungsi | Contoh protokol/perangkat |
|---|---|---|---|
| 7 Application | Application | Layanan untuk aplikasi | HTTP, DNS, SMTP, FTP, SSH |
| 6 Presentation | Application | Format, enkripsi, kompresi | TLS, JPEG |
| 5 Session | Application | Mengelola sesi | – |
| 4 Transport | Transport | Pengiriman antarproses, port | **TCP, UDP** |
| 3 Network | Internet | Pengalamatan dan routing | **IP**, ICMP, router |
| 2 Data Link | Link | Frame antarperangkat dalam satu jaringan | Ethernet, Wi-Fi, MAC, switch |
| 1 Physical | Link | Sinyal fisik | Kabel, gelombang radio, hub |

> **Tips:** Jembatan keledai OSI dari bawah ke atas: **P**lease **D**o **N**ot **T**hrow **S**ausage **P**izza **A**way.

### TCP vs UDP

| | TCP | UDP |
|---|---|---|
| Koneksi | Connection-oriented (**three-way handshake**: SYN → SYN-ACK → ACK) | Connectionless |
| Keandalan | Terjamin, berurutan, ada retransmisi | Tidak dijamin |
| Kecepatan | Lebih lambat | Lebih cepat, overhead kecil |
| Contoh | Web, email, transfer file | Streaming, game online, DNS, VoIP |

### Pengalamatan

- **IPv4:** 32 bit, ditulis 4 oktet (192.168.1.10). **IPv6:** 128 bit, heksadesimal.
- **IP privat:** 10.x.x.x, 172.16–31.x.x, 192.168.x.x. **NAT** menerjemahkan IP privat menjadi IP publik.
- **Subnet mask / CIDR:** /24 = 255.255.255.0, berisi 256 alamat (254 host yang bisa dipakai).
- **MAC address:** alamat fisik kartu jaringan, 48 bit.
- **127.0.0.1 / localhost:** alamat komputer itu sendiri.

### Layanan penting

| Layanan | Fungsi |
|---|---|
| **DNS** | Menerjemahkan nama domain menjadi IP. Record: A (IPv4), AAAA (IPv6), CNAME (alias), MX (email) |
| **DHCP** | Memberi IP, gateway, dan DNS secara otomatis |
| **Router** | Meneruskan paket antarjaringan |
| **Switch** | Meneruskan frame di dalam LAN berdasarkan MAC |
| **Firewall** | Menyaring lalu lintas berdasarkan aturan |
| **Load balancer** | Membagi beban ke beberapa server |
| **CDN** | Menyimpan salinan konten di server terdekat dengan pengguna |

### Port yang sering ditanyakan

| Port | Layanan | Port | Layanan |
|---|---|---|---|
| 20/21 | FTP | 80 | HTTP |
| 22 | SSH | 443 | HTTPS |
| 23 | Telnet | 3306 | MySQL |
| 25 | SMTP | 5432 | PostgreSQL |
| 53 | DNS | 6379 | Redis |

### Apa yang terjadi saat mengetik URL di browser

1. Browser mengurai URL (protokol, domain, path).
2. **DNS lookup**: cache browser → OS → resolver ISP → root → TLD → nameserver otoritatif → alamat IP.
3. **Koneksi TCP** ke IP tersebut di port 443 (three-way handshake).
4. **TLS handshake**: verifikasi sertifikat dan kesepakatan kunci enkripsi.
5. Browser mengirim **request HTTP** (GET /path).
6. Server memproses dan mengirim **respons** (status, header, body HTML).
7. Browser **merender** halaman dan mengambil resource tambahan (CSS, JS, gambar).

## 11. Dasar Cloud Computing

> **Teori:** Menurut NIST (SP 800-145), cloud computing memiliki lima karakteristik: **on-demand self-service**, **broad network access**, **resource pooling**, **rapid elasticity**, dan **measured service** (bayar sesuai pemakaian).

| Model layanan | Yang dikelola penyedia | Contoh |
|---|---|---|
| **IaaS** | Infrastruktur (server, jaringan, storage) | AWS EC2, IBM Cloud VPC, Google Compute Engine |
| **PaaS** | Infrastruktur + runtime/platform | Heroku, Google App Engine, IBM Code Engine |
| **SaaS** | Seluruh aplikasi | Gmail, Google Docs, Zoom |

Model penerapan: **public**, **private**, **hybrid**, dan **multi-cloud**. Istilah lain: **virtualisasi** (beberapa VM di satu server fisik lewat hypervisor), **container** (Docker), dan **serverless** (fungsi dijalankan sesuai kebutuhan).

## 12. Dasar Data dan AI

Karena Pijak berakar pada pembelajaran AI, istilah berikut layak dikenali:

- **Siklus data:** pengumpulan → pembersihan → eksplorasi → pemodelan → visualisasi/komunikasi.
- **Machine learning:** *supervised* (data berlabel: klasifikasi, regresi), *unsupervised* (tanpa label: clustering), dan *reinforcement* (belajar dari reward).
- **Data training vs testing:** model dilatih di satu bagian data lalu diuji di bagian lain. **Overfitting** terjadi ketika model menghafal data latih sehingga buruk pada data baru.
- **Generative AI / LLM:** model yang menghasilkan teks atau gambar. Risikonya termasuk *hallucination* dan bias, dan inilah yang dibahas dalam AI Ethics.

## Ringkasan Cepat

- PK: unik dan tidak NULL. FK merujuk ke PK lain. Relasi M:N butuh tabel penghubung.
- 1NF atomik, 2NF tanpa ketergantungan parsial, 3NF tanpa ketergantungan transitif.
- Urutan eksekusi: FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY → LIMIT.
- INNER JOIN = irisan; LEFT JOIN = semua baris kiri. Gunakan <code>IS NULL</code>, bukan <code>= NULL</code>.
- ACID: Atomicity, Consistency, Isolation, Durability. CAP: pilih CP atau AP saat terjadi partisi.
- RAM volatile; urutan memori dari tercepat: register → cache → RAM → SSD.
- Process punya memori sendiri; thread berbagi memori. Deadlock memerlukan empat syarat Coffman.
- TCP andal (handshake), UDP cepat. DNS: nama → IP. HTTPS port 443.
- IaaS → PaaS → SaaS: makin ke kanan, makin banyak yang dikelola penyedia.
`});
