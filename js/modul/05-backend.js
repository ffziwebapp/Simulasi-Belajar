MODUL.push({
id:"backend", no:"2.5", blok:"be", menit:60,
judul:"Backend / Server-Side",
ringkas:"Arsitektur client-server, HTTP, REST dan desain API, autentikasi & otorisasi, keamanan OWASP, database di backend, caching, arsitektur, testing, dan deployment",
md:String.raw`
## Peta Materi

Backend adalah bagian aplikasi yang berjalan **di server**. Tugasnya menerima request, menjalankan logika bisnis, mengakses database, dan mengirim respons. Contoh bahasa dan framework: Node.js (Express, NestJS), Python (Django, Flask, FastAPI), PHP (Laravel), Java (Spring Boot), dan Go.

## 1. Arsitektur Client–Server

~~~text
[Browser / Aplikasi HP]  --request HTTP-->  [Web server / API]  --query-->  [Database]
        (client)        <--respons JSON---   (logika bisnis)   <--data---
~~~

| Arsitektur | Penjelasan |
|---|---|
| **2-tier** | Client langsung terhubung ke database |
| **3-tier** | Presentation (frontend) → Application (backend) → Data (database). Paling umum |
| **N-tier** | Lapisan tambahan seperti cache, antrean pesan, dan layanan pihak ketiga |

**Web server** (Nginx, Apache) melayani file statis dan meneruskan request. **Application server** menjalankan kode backend. Nginx juga sering dipakai sebagai **reverse proxy** dan load balancer di depan aplikasi.

## 2. Protokol HTTP

> **Teori:** HTTP (Hypertext Transfer Protocol) adalah protokol **request–response** yang bersifat **stateless**: setiap request berdiri sendiri, dan server tidak mengingat request sebelumnya. State dipertahankan lewat cookie, session, atau token. HTTPS adalah HTTP yang dienkripsi dengan **TLS**.

### Anatomi request dan respons

~~~http
POST /api/v1/pesanan HTTP/1.1
Host: toko.id
Content-Type: application/json
Authorization: Bearer eyJhbGciOi...

{"produkId": 12, "jumlah": 2}
~~~

~~~http
HTTP/1.1 201 Created
Content-Type: application/json
Location: /api/v1/pesanan/88

{"id": 88, "status": "baru"}
~~~

### Method HTTP

| Method | Fungsi | Body | Safe | Idempotent |
|---|---|---|---|---|
| **GET** | Mengambil data | Tidak | Ya | Ya |
| **POST** | Membuat data / aksi | Ya | Tidak | **Tidak** |
| **PUT** | Mengganti seluruh resource | Ya | Tidak | Ya |
| **PATCH** | Mengubah sebagian resource | Ya | Tidak | Tidak dijamin |
| **DELETE** | Menghapus | Opsional | Tidak | Ya |
| HEAD | Seperti GET tetapi hanya header | Tidak | Ya | Ya |
| OPTIONS | Menanyakan method yang didukung (CORS preflight) | Tidak | Ya | Ya |

- **Safe:** tidak mengubah data di server.
- **Idempotent:** dijalankan sekali atau berkali-kali, hasil akhir di server tetap sama. Menghapus resource yang sama dua kali tetap berakhir dengan resource terhapus. Mengirim POST dua kali bisa membuat dua pesanan.

### Kode status

| Kelas | Arti | Kode penting |
|---|---|---|
| **1xx** | Informasi | 101 Switching Protocols (WebSocket) |
| **2xx** | Berhasil | **200** OK, **201** Created, **204** No Content |
| **3xx** | Pengalihan | **301** Moved Permanently, **302** Found, **304** Not Modified (cache) |
| **4xx** | Kesalahan klien | **400** Bad Request, **401** Unauthorized, **403** Forbidden, **404** Not Found, 405 Method Not Allowed, **409** Conflict, 422 Unprocessable Entity, **429** Too Many Requests |
| **5xx** | Kesalahan server | **500** Internal Server Error, 502 Bad Gateway, **503** Service Unavailable, 504 Gateway Timeout |

> **Jebakan:** **401** berarti "kamu belum terautentikasi" (belum login atau token tidak valid). **403** berarti "kamu dikenali tetapi tidak berhak". Mengakses halaman admin dengan akun biasa → 403.

### Header penting

<code>Content-Type</code> (format body), <code>Authorization</code> (kredensial), <code>Accept</code> (format yang diinginkan klien), <code>Cache-Control</code>, <code>Set-Cookie</code>/<code>Cookie</code>, <code>Access-Control-Allow-Origin</code> (CORS), <code>User-Agent</code>, dan <code>Location</code> (lokasi resource baru atau tujuan redirect).

### Versi HTTP

HTTP/1.1 (koneksi persisten), HTTP/2 (multiplexing banyak request dalam satu koneksi, kompresi header), HTTP/3 (berjalan di atas QUIC/UDP).

## 3. REST dan Desain API

> **Teori:** **REST** (Representational State Transfer) adalah gaya arsitektur yang dirumuskan **Roy Fielding** dalam disertasinya (2000). Enam batasannya:
> 1. **Client–server:** pemisahan tanggung jawab.
> 2. **Stateless:** setiap request membawa semua informasi yang dibutuhkan.
> 3. **Cacheable:** respons menyatakan apakah boleh di-cache.
> 4. **Uniform interface:** resource diidentifikasi oleh URI dan dimanipulasi lewat representasinya (JSON).
> 5. **Layered system:** klien tidak perlu tahu apakah ada proxy atau load balancer di antaranya.
> 6. **Code on demand** (opsional): server boleh mengirim kode yang bisa dijalankan.

### Konvensi endpoint

| Aksi | Method + endpoint | Respons |
|---|---|---|
| Daftar produk | <code>GET /api/v1/produk?page=2&amp;limit=20&amp;sort=harga</code> | 200 + array |
| Detail produk | <code>GET /api/v1/produk/12</code> | 200 atau 404 |
| Buat produk | <code>POST /api/v1/produk</code> | 201 + Location |
| Ganti produk | <code>PUT /api/v1/produk/12</code> | 200 / 204 |
| Ubah sebagian | <code>PATCH /api/v1/produk/12</code> | 200 |
| Hapus produk | <code>DELETE /api/v1/produk/12</code> | 204 |
| Ulasan milik produk | <code>GET /api/v1/produk/12/ulasan</code> | 200 |

Prinsip praktis:

- Gunakan **kata benda jamak** untuk resource (<code>/users</code>), bukan kata kerja (<code>/getUsers</code>).
- Biarkan method HTTP yang menyatakan aksinya.
- Cantumkan **versi** API (<code>/v1/</code>) agar perubahan tidak merusak klien lama.
- Sediakan **pagination**, **filter**, dan **sort** lewat query string.
- Format error yang konsisten, misalnya <code>{"error": {"code": "VALIDATION", "message": "..."}}</code>.
- Dokumentasikan dengan **OpenAPI/Swagger**.

### Alternatif REST

| Gaya | Ciri |
|---|---|
| **GraphQL** | Satu endpoint; klien menentukan field yang diminta, sehingga terhindar dari *over-fetching* |
| **gRPC** | Protokol biner (Protocol Buffers) di atas HTTP/2; cepat untuk komunikasi antar-microservice |
| **WebSocket** | Koneksi dua arah yang terus terbuka; untuk chat, notifikasi, dan data real-time |
| **Webhook** | Server memanggil URL milikmu saat sebuah event terjadi, misalnya pembayaran berhasil |

## 4. Membangun API: Contoh Express.js

~~~javascript
const express = require("express");
const app = express();

app.use(express.json());                      // middleware: parsing body JSON

app.use((req, res, next) => {                 // middleware logging
  console.log(req.method, req.url);
  next();                                     // WAJIB dipanggil agar request diteruskan
});

function wajibLogin(req, res, next) {         // middleware autentikasi
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Belum login" });
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch {
    res.status(401).json({ error: "Token tidak valid" });
  }
}

app.get("/api/v1/produk/:id", async (req, res) => {
  const produk = await db.produk.findById(req.params.id);  // parameter path
  if (!produk) return res.status(404).json({ error: "Tidak ditemukan" });
  res.json(produk);                                         // status 200 default
});

app.post("/api/v1/produk", wajibLogin, async (req, res) => {
  const { nama, harga } = req.body;
  if (!nama || !(harga > 0)) return res.status(400).json({ error: "Input tidak valid" });
  const baru = await db.produk.create({ nama, harga, pemilik: req.user.id });
  res.status(201).json(baru);
});

app.use((err, req, res, next) => {            // error handler (4 parameter)
  console.error(err);
  res.status(500).json({ error: "Terjadi kesalahan server" });
});

app.listen(process.env.PORT || 3000);
~~~

| Sumber data request | Express | Contoh |
|---|---|---|
| Parameter path | <code>req.params.id</code> | /produk/**12** |
| Query string | <code>req.query.page</code> | /produk?**page=2** |
| Body | <code>req.body</code> | JSON pada POST/PUT |
| Header | <code>req.headers</code> | Authorization |

**Middleware** adalah fungsi <code>(req, res, next)</code> yang dijalankan berurutan sebelum handler akhir. Kegunaannya: parsing, logging, autentikasi, validasi, dan rate limiting.

### Pola MVC dan layered architecture

| Lapisan | Tanggung jawab |
|---|---|
| **Route / Controller** | Menerima request, memvalidasi input, mengirim respons |
| **Service** | Logika bisnis |
| **Repository / Model** | Akses database |

Pada **MVC**, **Model** mengelola data, **View** menampilkan (template HTML atau JSON), dan **Controller** menghubungkan keduanya. Pemisahan ini membuat kode mudah diuji dan dirawat (*separation of concerns*).

## 5. Database di Backend

- **Driver/query builder:** menulis SQL secara langsung dengan parameter.
- **ORM** (Object-Relational Mapping) seperti Sequelize, Prisma, SQLAlchemy, Eloquent, dan Hibernate memetakan tabel menjadi class/objek. Keuntungannya produktivitas; risikonya query yang tidak efisien.
- **Masalah N+1 query:** mengambil 100 pesanan lalu menjalankan 100 query terpisah untuk pelanggan masing-masing. Solusinya JOIN atau *eager loading*.
- **Migration:** perubahan skema database yang ter-versi dan bisa diulang di setiap lingkungan.
- **Connection pool:** memakai ulang koneksi database agar tidak membuat koneksi baru di setiap request.

## 6. Autentikasi dan Otorisasi

| | Autentikasi (AuthN) | Otorisasi (AuthZ) |
|---|---|---|
| Pertanyaan | **Siapa kamu?** | **Apa yang boleh kamu lakukan?** |
| Contoh | Login dengan email + password, OTP | Hanya admin yang boleh menghapus produk |
| Gagal | 401 | 403 |

### Menyimpan password

> **Awas:** Password **tidak pernah** disimpan sebagai teks biasa, dan **bukan** dienkripsi (karena enkripsi bisa didekripsi) atau di-encode Base64 (karena hanya pengodean). Password harus di-**hash** dengan algoritma yang **sengaja dibuat lambat** dan memakai **salt**: **bcrypt**, **scrypt**, atau **Argon2**. MD5 dan SHA-1 sudah tidak aman untuk password.

- **Hashing:** satu arah, tidak bisa dikembalikan. Saat login, password yang diketik di-hash lalu dibandingkan dengan hash yang tersimpan.
- **Salt:** nilai acak unik per pengguna, untuk mencegah serangan *rainbow table*.
- **Enkripsi:** dua arah dengan kunci. Simetris (AES): satu kunci yang sama. Asimetris (RSA): kunci publik dan kunci privat.
- **Encoding** (Base64, URL encoding): hanya mengubah format, **bukan** pengamanan.

### Session vs token

| | Session (stateful) | JWT (stateless) |
|---|---|---|
| Disimpan di | Server (memori/Redis); klien hanya memegang session ID di cookie | Klien memegang token; server cukup memverifikasi tanda tangannya |
| Skalabilitas | Butuh penyimpanan sesi bersama | Mudah di-scale horizontal |
| Logout/pencabutan | Mudah (hapus sesi) | Sulit sebelum token kedaluwarsa; perlu masa berlaku pendek plus refresh token |

### Struktur JWT

<code>header.payload.signature</code>, masing-masing di-encode Base64URL.

- **Header:** algoritma, misalnya HS256.
- **Payload:** *claims*, misalnya id pengguna, role, dan <code>exp</code> (waktu kedaluwarsa). Bisa dibaca siapa pun, jadi **jangan menaruh rahasia** di sini.
- **Signature:** HMAC atau tanda tangan RSA atas header dan payload. Jika isinya diubah, verifikasi gagal.

### OAuth 2.0 dan OpenID Connect

**OAuth 2.0** adalah protokol **otorisasi terdelegasi**: aplikasi mendapat izin terbatas (*scope*) untuk mengakses resource milik pengguna di layanan lain tanpa mengetahui password-nya. **OpenID Connect** menambahkan lapisan autentikasi di atasnya ("Masuk dengan Google"). Alur yang umum untuk aplikasi web adalah *Authorization Code* (dengan PKCE).

### Model otorisasi

- **RBAC** (Role-Based Access Control): izin diberikan berdasarkan peran (admin, editor, user).
- **ABAC** (Attribute-Based): berdasarkan atribut, misalnya "hanya pemilik dokumen yang boleh mengedit".
- **Principle of least privilege:** berikan hak akses seminimal mungkin.
- **MFA/2FA:** faktor kedua seperti OTP atau aplikasi authenticator.

## 7. Keamanan Backend (OWASP Top 10)

> **Teori:** **OWASP Top 10** adalah daftar risiko keamanan aplikasi web paling kritis yang disusun oleh Open Worldwide Application Security Project. Versi 2021 berisi:

| No | Risiko | Contoh dan pencegahan |
|---|---|---|
| A01 | **Broken Access Control** | Mengganti <code>/pesanan/12</code> menjadi <code>/pesanan/13</code> lalu melihat milik orang lain (IDOR). Periksa kepemilikan di server |
| A02 | **Cryptographic Failures** | Data sensitif tanpa enkripsi, HTTP tanpa TLS, hash lemah |
| A03 | **Injection** | SQL injection, command injection. Gunakan **parameterized query** |
| A04 | Insecure Design | Tidak ada pembatasan percobaan login sejak tahap desain |
| A05 | Security Misconfiguration | Mode debug aktif di production, password default |
| A06 | Vulnerable and Outdated Components | Library lama yang punya celah. Lakukan <code>npm audit</code> dan pembaruan |
| A07 | Identification and Authentication Failures | Password lemah diizinkan, sesi tidak kedaluwarsa |
| A08 | Software and Data Integrity Failures | Update atau dependensi tanpa verifikasi |
| A09 | Security Logging and Monitoring Failures | Serangan tidak terdeteksi karena tidak ada log |
| A10 | Server-Side Request Forgery (SSRF) | Server dipaksa mengakses URL internal |

### SQL injection

~~~javascript
// RENTAN: input digabung langsung ke query
db.query("SELECT * FROM users WHERE email = '" + email + "'");
// jika email = ' OR '1'='1  -> semua baris pengguna terbaca

// AMAN: parameterized query / prepared statement
db.query("SELECT * FROM users WHERE email = ?", [email]);
~~~

### Praktik keamanan lain

- **Validasi dan sanitasi semua input** di server; jangan percaya data dari klien.
- **HTTPS** di semua halaman, cookie dengan atribut <code>HttpOnly</code>, <code>Secure</code>, dan <code>SameSite</code>.
- **Rate limiting** untuk endpoint login dan API (respons 429).
- **Rahasia di environment variable** (<code>.env</code> yang masuk <code>.gitignore</code>), bukan di kode.
- **CORS** dibatasi ke origin yang dikenal; jangan sembarang memakai <code>*</code> untuk API yang memakai kredensial.
- **Security headers:** Content-Security-Policy, Strict-Transport-Security, X-Content-Type-Options.
- Pesan error untuk pengguna dibuat umum; detail teknis hanya masuk ke log.

### CORS

Browser memblokir JavaScript di <code>https://app.id</code> membaca respons dari <code>https://api.lain.id</code> kecuali server API mengirim header <code>Access-Control-Allow-Origin: https://app.id</code>. Untuk request "non-sederhana" (misalnya method PUT/DELETE atau header Authorization), browser lebih dulu mengirim **preflight** <code>OPTIONS</code>. CORS adalah aturan **browser**: Postman atau curl tidak terpengaruh.

## 8. Performa dan Skalabilitas

### Caching

| Lapisan | Contoh |
|---|---|
| Browser | Header <code>Cache-Control: max-age=3600</code>, ETag → 304 Not Modified |
| CDN | Cloudflare, Akamai menyimpan file statis dekat pengguna |
| Aplikasi | **Redis** atau Memcached menyimpan hasil query yang sering dibaca |
| Database | Query cache, index |

Strategi **cache-aside**: cari dulu di cache; jika tidak ada (*cache miss*), ambil dari database lalu simpan di cache dengan **TTL**. Tantangannya adalah **invalidasi**: kapan data cache dianggap basi.

### Scaling

- **Vertical scaling (scale up):** menambah CPU/RAM di satu server. Sederhana tetapi ada batasnya.
- **Horizontal scaling (scale out):** menambah jumlah server di belakang **load balancer**. Syaratnya aplikasi bersifat stateless.
- **Database:** *read replica* untuk beban baca dan **sharding** (memecah data ke beberapa server).
- **Message queue** (RabbitMQ, Kafka): memproses pekerjaan berat secara asinkron (kirim email, olah video) agar respons API tetap cepat.

### Monolith vs microservices

| | Monolith | Microservices |
|---|---|---|
| Struktur | Satu aplikasi dan satu deploy | Banyak layanan kecil, masing-masing di-deploy terpisah |
| Kelebihan | Sederhana, mudah di-debug, cocok di awal | Skala dan deploy per layanan, tim lebih independen |
| Kekurangan | Sulit di-scale per bagian, deploy semuanya sekaligus | Kompleksitas jaringan, observabilitas, konsistensi data |

Pola terkait: **API gateway**, **service discovery**, dan **circuit breaker**.

## 9. Testing

> **Teori:** **Piramida pengujian** (Mike Cohn) menyarankan banyak **unit test** (cepat, murah) di dasar, lebih sedikit **integration test** di tengah, dan sedikit **end-to-end test** (lambat, mahal) di puncak.

| Jenis | Menguji | Contoh alat |
|---|---|---|
| Unit | Satu fungsi secara terisolasi (dependensi di-*mock*) | Jest, Mocha, pytest |
| Integration | Beberapa komponen bersama, misalnya API + database | Supertest, pytest |
| End-to-end | Alur pengguna lengkap di browser | Cypress, Playwright |
| Load/performance | Perilaku di bawah beban tinggi | k6, JMeter |

Istilah lain: **TDD** (tulis test dulu), **regression test** (memastikan bug lama tidak muncul lagi), dan **code coverage**.

## 10. Deployment dan DevOps

- **Environment:** development → staging → production, dengan konfigurasi lewat environment variable (prinsip **Twelve-Factor App**).
- **Docker container:** mengemas aplikasi beserta dependensinya agar berjalan sama di mana pun. Berbeda dengan VM, container **berbagi kernel** OS host sehingga lebih ringan. **Dockerfile** → **image** → **container**.
- **Orkestrasi:** Kubernetes mengatur banyak container (scaling, self-healing).
- **CI/CD:** setiap push memicu pipeline otomatis (lint → test → build → deploy), misalnya GitHub Actions, GitLab CI, atau Jenkins.
- **Observabilitas:** **log** (apa yang terjadi), **metrik** (angka seperti latensi dan error rate), dan **tracing** (jejak request antarlayanan).
- **Platform:** VPS, PaaS (Railway, Render, IBM Code Engine), serverless (AWS Lambda, Cloud Functions).

## Ringkasan Cepat

- HTTP stateless. GET/PUT/DELETE idempotent; POST tidak.
- 200 OK, 201 Created, 204 No Content, 400 input salah, 401 belum login, 403 tidak berhak, 404 tidak ada, 429 terlalu banyak request, 500 error server.
- REST (Fielding): stateless, cacheable, uniform interface; endpoint memakai kata benda jamak dan versi.
- Middleware <code>(req, res, next)</code>; jangan lupa memanggil <code>next()</code>.
- Password: hash lambat dengan salt (bcrypt/Argon2). Base64 bukan enkripsi.
- JWT = header.payload.signature; payload bisa dibaca siapa pun.
- OWASP #1 Broken Access Control; SQL injection dicegah dengan parameterized query.
- CORS adalah aturan browser; server mengizinkannya lewat <code>Access-Control-Allow-Origin</code>.
- Cache (Redis) mengurangi beban database; horizontal scaling butuh aplikasi stateless.
- Piramida test: unit > integration > E2E. Container berbagi kernel; CI/CD mengotomatiskan test dan deploy.
`});
