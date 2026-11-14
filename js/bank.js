/* Bank soal latihan — buatan sendiri berdasarkan nama section resmi, BUKAN soal asli tes Pijak. */
const BANK = {
 logic:{name:"Logical Reasoning & Computational Thinking",code:"2.1",take:10,qs:[
  {q:"Lanjutkan deret berikut: 2, 6, 12, 20, 30, …",o:["40","42","44","36"],a:1,e:"Polanya n×(n+1): 1×2, 2×3, 3×4, 4×5, 5×6, lalu 6×7 = 42. Selisihnya juga naik +4, +6, +8, +10, +12."},
  {q:"Semua programmer suka kopi. Sebagian penyuka kopi suka begadang. Kesimpulan yang PASTI benar adalah…",o:["Sebagian programmer suka begadang","Semua programmer suka begadang","Tidak dapat dipastikan apakah ada programmer yang suka begadang","Tidak ada programmer yang suka begadang"],a:2,e:"Penyuka kopi yang begadang belum tentu programmer. Premis tidak cukup untuk menyimpulkan hubungan programmer–begadang."},
  {q:"Berapa nilai x setelah pseudocode berikut dijalankan?",code:"x ← 1\nUNTUK i ← 1 SAMPAI 4\n    x ← x * 2\nAKHIR UNTUK",o:["8","16","32","4"],a:1,e:"Loop berjalan 4 kali, x digandakan 4 kali: 1 → 2 → 4 → 8 → 16."},
  {q:"Pilar computational thinking yang berarti memecah masalah besar menjadi bagian-bagian kecil yang lebih mudah diselesaikan adalah…",o:["Abstraksi","Pengenalan pola","Dekomposisi","Algoritma"],a:2,e:"Dekomposisi = memecah masalah. Abstraksi = membuang detail yang tidak penting. Pengenalan pola = mencari kesamaan. Algoritma = langkah penyelesaian."},
  {q:"Pada daftar 1.000 angka yang sudah terurut, binary search membutuhkan paling banyak sekitar berapa kali perbandingan?",o:["10","100","500","1.000"],a:0,e:"Binary search membagi dua ruang pencarian setiap langkah: log₂(1000) ≈ 9,97, jadi sekitar 10 perbandingan."},
  {q:"Diketahui A > B, B > C, dan C > D. Pernyataan yang SALAH adalah…",o:["A > C","B > D","D > A","A > D"],a:2,e:"Urutannya A > B > C > D, jadi A adalah yang terbesar dan D yang terkecil. D > A pasti salah."},
  {q:"Jika BUKU dikodekan menjadi CVLV, maka MEJA dikodekan menjadi…",o:["NFKB","NEKB","LDIZ","NFJB"],a:0,e:"Setiap huruf digeser +1: M→N, E→F, J→K, A→B."},
  {q:"Berapa nilai ekspresi boolean berikut?",code:"NOT (true AND false) OR false",o:["true","false","error","null"],a:0,e:"true AND false = false → NOT false = true → true OR false = true."},
  {q:"Lima orang hadir dalam sebuah rapat dan setiap orang berjabat tangan tepat satu kali dengan setiap orang lainnya. Berapa total jabat tangan?",o:["20","25","10","15"],a:2,e:"Kombinasi C(5,2) = 5×4/2 = 10."},
  {q:"Urutan langkah yang benar untuk menukar nilai variabel a dan b adalah…",o:["a ← b; b ← a","temp ← a; a ← b; b ← temp","temp ← a; b ← a; a ← temp","a ← temp; temp ← b; b ← a"],a:1,e:"Nilai a disimpan dulu di temp agar tidak hilang saat a ditimpa b, lalu b diisi nilai lama a."},
  {q:"Lanjutkan deret huruf berikut: A, C, F, J, O, …",o:["T","U","V","S"],a:1,e:"Posisi huruf 1, 3, 6, 10, 15 (selisih +2, +3, +4, +5). Berikutnya +6 = 21, yaitu U."},
  {q:"Dalam flowchart, simbol belah ketupat (diamond) melambangkan…",o:["Proses","Input/Output","Keputusan (percabangan)","Terminator (mulai/selesai)"],a:2,e:"Diamond = decision. Persegi panjang = proses, jajar genjang = input/output, oval = terminator."},
  {q:"Sebuah algoritma memeriksa setiap pasangan elemen dalam daftar berisi n elemen. Jika n dinaikkan 2 kali lipat, waktu eksekusinya kira-kira menjadi…",o:["2 kali lipat","4 kali lipat","Tetap","log n kali"],a:1,e:"Memeriksa semua pasangan berarti O(n²). (2n)² = 4n², jadi sekitar 4 kali lipat."},
  {q:"Rina lebih tinggi dari Sari. Dodi lebih pendek dari Sari tetapi lebih tinggi dari Tono. Siapa yang paling pendek?",o:["Sari","Dodi","Tono","Rina"],a:2,e:"Urutannya Rina > Sari > Dodi > Tono, jadi Tono yang paling pendek."}
 ]},
 prog:{name:"Programming Fundamentals",code:"2.2",take:10,qs:[
  {q:"Apa output kode Python berikut?",code:"print(7 // 2)",o:["3.5","3","4","2"],a:1,e:"// adalah pembagian bulat (floor division): 7 // 2 = 3."},
  {q:"Apa output kode Python berikut?",code:"print(len([1, [2, 3], 4]))",o:["4","3","2","Error"],a:1,e:"List luar berisi 3 elemen: 1, [2, 3], dan 4. List di dalamnya dihitung sebagai satu elemen."},
  {q:"Apa output kode Python berikut?",code:"for i in range(1, 10, 3):\n    print(i, end=' ')",o:["1 4 7","1 4 7 10","1 3 6 9","0 3 6 9"],a:0,e:"range(start=1, stop=10, step=3) menghasilkan 1, 4, 7. Nilai stop (10) tidak ikut."},
  {q:"Apa output kode Python berikut?",code:"a = [1, 2, 3]\nb = a\nb.append(4)\nprint(a)",o:["[1, 2, 3]","[1, 2, 3, 4]","[4, 1, 2, 3]","Error"],a:1,e:"b = a tidak menyalin list; keduanya merujuk ke objek yang sama. Perubahan lewat b ikut terlihat di a."},
  {q:"Di JavaScript, berapa hasil ekspresi berikut?",code:'"5" - 3',o:['"53"',"2",'"2"',"NaN"],a:1,e:'Operator - memaksa konversi ke number, jadi hasilnya 2. Berbeda dengan "5" + 3 yang menghasilkan string "53".'},
  {q:"Di JavaScript, apa hasil dari typeof null?",o:['"null"','"undefined"','"object"','"number"'],a:2,e:'Ini quirk historis JavaScript: typeof null bernilai "object".'},
  {q:"Fungsi rekursif yang tidak memiliki base case kemungkinan besar akan…",o:["Mengembalikan 0","Berjalan sekali lalu berhenti","Terus memanggil dirinya sampai terjadi stack overflow","Otomatis dioptimasi oleh compiler"],a:2,e:"Tanpa kondisi berhenti, pemanggilan terus menumpuk di call stack sampai melampaui batasnya."},
  {q:"Kompleksitas waktu dua loop bersarang yang masing-masing berjalan n kali adalah…",o:["O(n)","O(log n)","O(n²)","O(2n)"],a:2,e:"n iterasi luar × n iterasi dalam = n² operasi."},
  {q:"Konsep OOP yang menyembunyikan detail data internal sebuah objek dan hanya membuka akses melalui method adalah…",o:["Inheritance","Polymorphism","Encapsulation","Abstraction class"],a:2,e:"Encapsulation membungkus data dan membatasi akses langsung (misalnya dengan atribut private dan getter/setter)."},
  {q:"Struktur data yang bekerja dengan prinsip LIFO (Last In, First Out) adalah…",o:["Queue","Stack","Linked list","Hash map"],a:1,e:"Stack: elemen terakhir yang masuk adalah yang pertama keluar. Queue bekerja dengan FIFO."},
  {q:"Apa output kode Python berikut?",code:"x = 10\nif x > 5 and x < 8:\n    print('A')\nelif x % 2 == 0:\n    print('B')\nelse:\n    print('C')",o:["A","B","C","A B"],a:1,e:"x < 8 bernilai salah, jadi blok if dilewati. 10 % 2 == 0 bernilai benar, sehingga yang dicetak B."},
  {q:"Perintah Git untuk menyalin repository remote ke komputer lokal adalah…",o:["git pull","git fetch","git clone","git init"],a:2,e:"git clone mengunduh seluruh repository beserta riwayatnya. git pull hanya memperbarui repository yang sudah ada."},
  {q:"Di Python, cara mengambil elemen terakhir dari list arr adalah…",o:["arr[len(arr)]","arr[-1]","arr[last]","arr.end()"],a:1,e:"Indeks negatif menghitung dari belakang; arr[-1] adalah elemen terakhir. arr[len(arr)] menyebabkan IndexError."},
  {q:"Apa output kode JavaScript berikut?",code:"let s = 0;\nfor (let i = 1; i <= 5; i++) {\n  if (i % 2 === 0) continue;\n  s += i;\n}\nconsole.log(s);",o:["15","9","6","5"],a:1,e:"Bilangan genap dilewati, jadi yang dijumlahkan hanya 1 + 3 + 5 = 9."}
 ]},
 data:{name:"Data & System Foundations",code:"2.3",take:10,qs:[
  {q:"Query SQL untuk mengambil semua kolom dari tabel users adalah…",o:["GET * FROM users","SELECT ALL users","SELECT * FROM users","FETCH users.*"],a:2,e:"SELECT * FROM nama_tabel mengambil seluruh kolom."},
  {q:"Sifat wajib sebuah primary key adalah…",o:["Boleh duplikat, tidak boleh null","Unik dan tidak boleh null","Harus berupa angka","Harus menjadi foreign key di tabel lain"],a:1,e:"Primary key mengidentifikasi setiap baris secara unik dan tidak boleh kosong. Tipenya tidak harus angka."},
  {q:"Tujuan utama normalisasi basis data adalah…",o:["Mempercepat semua query","Mengurangi redundansi dan anomali data","Menambah jumlah tabel sebanyak mungkin","Mengenkripsi data"],a:1,e:"Normalisasi menata tabel agar data tidak tersimpan berulang, sehingga anomali insert, update, dan delete bisa dihindari."},
  {q:"Jenis JOIN yang hanya mengembalikan baris yang punya pasangan cocok di kedua tabel adalah…",o:["LEFT JOIN","RIGHT JOIN","FULL OUTER JOIN","INNER JOIN"],a:3,e:"INNER JOIN hanya menampilkan irisan. LEFT/RIGHT JOIN tetap menampilkan baris dari satu sisi meskipun tidak punya pasangan."},
  {q:"Bilangan biner 1011 sama dengan berapa dalam desimal?",o:["9","11","13","10"],a:1,e:"1×8 + 0×4 + 1×2 + 1×1 = 11."},
  {q:"RAM disebut memori volatile karena…",o:["Kapasitasnya besar","Datanya hilang saat listrik mati","Hanya bisa dibaca","Letaknya di dalam CPU"],a:1,e:"Memori volatile membutuhkan daya listrik untuk menyimpan data. Berbeda dengan SSD/HDD yang bersifat non-volatile."},
  {q:"Fungsi utama DNS adalah…",o:["Mengenkripsi lalu lintas web","Menerjemahkan nama domain menjadi alamat IP","Menyimpan cache halaman web","Memberikan alamat IP otomatis ke perangkat"],a:1,e:"DNS menerjemahkan nama domain, misalnya dicoding.com, menjadi alamat IP. Pemberian IP otomatis adalah tugas DHCP."},
  {q:"Kode status HTTP 404 berarti…",o:["Server error","Unauthorized","Not Found","Redirect"],a:2,e:"404 = resource tidak ditemukan. 401 = unauthorized, 500 = server error, 3xx = redirect."},
  {q:"Fungsi agregat SQL untuk menghitung jumlah baris adalah…",o:["SUM()","COUNT()","TOTAL()","NUM()"],a:1,e:"COUNT() menghitung jumlah baris. SUM() menjumlahkan nilai sebuah kolom."},
  {q:"Pada prinsip ACID dalam transaksi basis data, huruf I adalah singkatan dari…",o:["Integrity","Isolation","Index","Immutability"],a:1,e:"ACID = Atomicity, Consistency, Isolation, Durability."},
  {q:"Port default untuk HTTPS adalah…",o:["80","21","443","8080"],a:2,e:"HTTPS menggunakan port 443, HTTP 80, dan FTP 21."},
  {q:"Contoh basis data NoSQL berbasis dokumen adalah…",o:["MySQL","PostgreSQL","MongoDB","SQLite"],a:2,e:"MongoDB menyimpan data sebagai dokumen mirip JSON. Tiga lainnya adalah basis data relasional (SQL)."},
  {q:"Komponen sistem operasi yang mengatur pembagian waktu CPU antarproses disebut…",o:["File system","Scheduler","Driver","Compiler"],a:1,e:"Scheduler menentukan proses mana yang mendapat giliran CPU dan berapa lama."},
  {q:"Query berikut menghasilkan apa?",code:"SELECT kota, COUNT(*)\nFROM pelanggan\nGROUP BY kota\nHAVING COUNT(*) > 5;",o:["Semua pelanggan yang tinggal di lebih dari 5 kota","Daftar kota yang memiliki lebih dari 5 pelanggan, beserta jumlahnya","5 kota pertama","Error karena HAVING tidak boleh dipakai bersama COUNT"],a:1,e:"GROUP BY mengelompokkan per kota, lalu HAVING menyaring kelompok yang jumlah barisnya lebih dari 5."}
 ]},
 fe:{name:"Frontend / Client-Side",code:"2.4",take:10,qs:[
  {q:"Tag HTML untuk membuat hyperlink adalah…",o:["<link>","<a>","<href>","<url>"],a:1,e:"<a href=\"...\"> membuat tautan. <link> dipakai di <head> untuk memuat resource seperti CSS."},
  {q:"Selector CSS untuk memilih elemen dengan class card adalah…",o:["#card",".card","card","*card"],a:1,e:"Titik (.) untuk class, pagar (#) untuk id, dan nama tanpa simbol untuk tag."},
  {q:"Properti flexbox yang mengatur arah susunan item (baris atau kolom) adalah…",o:["justify-content","align-items","flex-direction","flex-wrap"],a:2,e:"flex-direction: row | column. justify-content dan align-items mengatur perataan item."},
  {q:"DOM adalah singkatan dari…",o:["Data Object Model","Document Object Model","Dynamic Output Module","Document Oriented Markup"],a:1,e:"DOM adalah representasi pohon objek dari dokumen HTML yang bisa dimanipulasi dengan JavaScript."},
  {q:"Pada CSS box model, urutan lapisan dari dalam ke luar adalah…",o:["content → border → padding → margin","content → padding → border → margin","padding → content → margin → border","margin → border → padding → content"],a:1,e:"Content, lalu padding (ruang dalam), lalu border, lalu margin (ruang luar)."},
  {q:"Kegunaan utama media query di CSS adalah…",o:["Memutar media video","Membuat tampilan responsif sesuai ukuran layar","Mengimpor font","Membuat animasi"],a:1,e:"@media (max-width: 768px) { … } menerapkan gaya berbeda sesuai karakteristik layar."},
  {q:"Atribut alt pada tag <img> berfungsi untuk…",o:["Mengatur ukuran gambar","Memberi teks alternatif untuk aksesibilitas dan saat gambar gagal dimuat","Menambahkan tooltip warna","Mengompresi gambar"],a:1,e:"Teks alt dibacakan oleh screen reader, ditampilkan saat gambar gagal dimuat, dan membantu SEO."},
  {q:"Jika sebuah elemen memiliki inline style, aturan dari selector #id, dan aturan dari selector .class (tanpa !important), gaya mana yang diterapkan?",o:["Dari .class","Dari #id","Inline style","Aturan yang ditulis paling akhir"],a:2,e:"Urutan specificity: inline style > id > class > tag."},
  {q:"Elemen dengan position: absolute diposisikan relatif terhadap…",o:["Viewport, selalu","Elemen induk langsung, selalu","Ancestor terdekat yang memiliki position selain static","Elemen <body>, selalu"],a:2,e:"Elemen absolute mencari ancestor terdekat yang positioned (relative/absolute/fixed/sticky). Jika tidak ada, acuannya initial containing block."},
  {q:"Fungsi fetch() di JavaScript mengembalikan…",o:["Data JSON secara langsung","Promise","String HTML","Callback"],a:1,e:"fetch() mengembalikan Promise yang resolve menjadi objek Response. Untuk membaca isinya biasanya dilanjutkan dengan await res.json()."},
  {q:"Data yang disimpan di localStorage…",o:["Hilang saat tab ditutup","Tersimpan di browser tanpa batas waktu dan berupa string","Dikirim otomatis ke server di setiap request","Terenkripsi secara otomatis"],a:1,e:"localStorage bertahan sampai dihapus dan menyimpan pasangan key–value berupa string. sessionStorage hilang saat tab ditutup, sedangkan cookie dikirim ke server."},
  {q:"Apa yang dicetak kode berikut?",code:"console.log(1);\nsetTimeout(() => console.log(2), 0);\nconsole.log(3);",o:["1 2 3","1 3 2","2 1 3","3 2 1"],a:1,e:"Callback setTimeout masuk antrean event loop dan baru dijalankan setelah kode sinkron selesai, meskipun delay-nya 0."},
  {q:"Di React, apa yang terjadi ketika state sebuah komponen diperbarui dengan setter-nya?",o:["Halaman di-refresh penuh","Komponen tersebut dirender ulang (re-render)","Tidak terjadi apa-apa sampai reload","Semua komponen di aplikasi di-unmount"],a:1,e:"Perubahan state memicu re-render komponen tersebut beserta anak-anaknya. Tidak ada reload halaman."},
  {q:"Method yang tepat untuk menambahkan handler klik pada sebuah elemen adalah…",o:["el.onClick('click', fn)","el.addEventListener('click', fn)","el.attachClick(fn)","el.listen('onclick', fn)"],a:1,e:"addEventListener(type, handler) adalah cara standar dan bisa dipasang berkali-kali untuk event yang sama."}
 ]},
 be:{name:"Backend / Server-Side",code:"2.5",take:10,qs:[
  {q:"Dalam REST API, method HTTP yang umum dipakai untuk membuat resource baru adalah…",o:["GET","POST","PUT","DELETE"],a:1,e:"POST untuk create. PUT biasanya untuk mengganti resource yang sudah ada, GET untuk membaca, DELETE untuk menghapus."},
  {q:"Kode status HTTP 201 berarti…",o:["OK","Created","Accepted","No Content"],a:1,e:"201 Created biasanya dikembalikan setelah POST berhasil membuat resource."},
  {q:"Cara yang tepat menyimpan password pengguna di database adalah…",o:["Plain text agar mudah dicek","Dienkripsi dengan Base64","Di-hash dengan algoritma lambat bersalt seperti bcrypt atau argon2","Disimpan di cookie"],a:2,e:"Base64 hanyalah encoding, bukan enkripsi. Password harus di-hash satu arah dengan salt menggunakan algoritma yang sengaja dibuat lambat."},
  {q:"Cara paling efektif mencegah SQL injection adalah…",o:["Menyembunyikan pesan error","Menggunakan parameterized query / prepared statement","Membatasi panjang input","Memakai HTTPS"],a:1,e:"Parameterized query memisahkan data dari perintah SQL, sehingga input pengguna tidak pernah dieksekusi sebagai kode."},
  {q:"Di Express.js, middleware adalah…",o:["Database perantara","Fungsi yang dijalankan di antara masuknya request dan dikirimnya response","Template engine","Library untuk testing"],a:1,e:"Middleware menerima (req, res, next) dan bisa memproses, memvalidasi, atau mencatat request sebelum diteruskan."},
  {q:"Method HTTP berikut yang TIDAK idempotent adalah…",o:["GET","PUT","DELETE","POST"],a:3,e:"Mengulang POST bisa membuat resource ganda. GET, PUT, dan DELETE menghasilkan keadaan akhir yang sama meskipun diulang."},
  {q:"Perbedaan autentikasi dan otorisasi adalah…",o:["Keduanya sama","Autentikasi memverifikasi siapa pengguna, otorisasi menentukan apa yang boleh ia akses","Autentikasi menentukan hak akses, otorisasi memverifikasi identitas","Otorisasi hanya untuk admin"],a:1,e:"Login (autentikasi) dilakukan lebih dulu, baru kemudian pengecekan izin (otorisasi)."},
  {q:"JWT (JSON Web Token) umumnya digunakan untuk…",o:["Mengompresi respons API","Autentikasi stateless antara klien dan server","Menyimpan file besar","Menggantikan database"],a:1,e:"Server menandatangani token, lalu klien mengirimkannya di setiap request. Server cukup memverifikasi tanda tangannya tanpa menyimpan sesi."},
  {q:"Alasan menyimpan API key dan kredensial di environment variable (.env) adalah…",o:["Agar kode berjalan lebih cepat","Agar rahasia tidak ikut tersimpan di source code atau repository","Karena wajib untuk Node.js","Agar bisa dibaca oleh frontend"],a:1,e:"Konfigurasi dan rahasia dipisahkan dari kode. File .env sebaiknya dimasukkan ke .gitignore."},
  {q:"Tujuan menggunakan cache seperti Redis di backend adalah…",o:["Menggantikan database utama secara permanen","Mengurangi latensi dan beban database untuk data yang sering diakses","Mengenkripsi data","Menyimpan log error"],a:1,e:"Data yang sering dibaca disimpan di memori agar respons lebih cepat dan query ke database berkurang."},
  {q:"CORS (Cross-Origin Resource Sharing) adalah…",o:["Protokol database","Mekanisme browser yang mengatur izin request dari origin yang berbeda","Library enkripsi","Format data seperti JSON"],a:1,e:"Server mengirim header Access-Control-Allow-Origin untuk mengizinkan origin tertentu. Pembatasannya diterapkan oleh browser."},
  {q:"Kode status HTTP yang tepat ketika pengguna sudah login tetapi tidak punya izin mengakses sebuah resource adalah…",o:["401 Unauthorized","403 Forbidden","404 Not Found","400 Bad Request"],a:1,e:"401 = belum terautentikasi atau kredensial salah. 403 = identitas diketahui, tetapi aksesnya ditolak."},
  {q:"Tujuan pagination pada endpoint API adalah…",o:["Membuat URL lebih panjang","Membatasi jumlah data per respons agar ringan dan cepat","Mengurutkan data secara acak","Mengamankan endpoint"],a:1,e:"Contohnya ?page=2&limit=20. Data dikirim bertahap agar respons tidak membebani server maupun klien."},
  {q:"Pada arsitektur MVC, lapisan yang bertanggung jawab atas logika data dan interaksi dengan database adalah…",o:["View","Controller","Model","Router"],a:2,e:"Model mengelola data, View menampilkannya, dan Controller menghubungkan request dengan Model dan View."}
 ]}
};

/* TRAITS: Likert (dimensi + item terbalik) + situasional */
const DIMS = {
  integ:"Integritas & Etika", collab:"Kolaborasi", growth:"Growth Mindset",
  resp:"Tanggung Jawab & Ketekunan", adapt:"Adaptabilitas", comm:"Komunikasi"
};
const LIKERT = [
  ["Saya tetap jujur tentang kesalahan saya walaupun tidak ada yang tahu.","integ",0],
  ["Menyalin jawaban teman saat ujian online wajar dilakukan jika soalnya terlalu sulit.","integ",1],
  ["Saya mencantumkan sumber ketika memakai kode atau ide milik orang lain.","integ",0],
  ["Aturan boleh dilanggar selama tidak ketahuan dan tidak merugikan siapa pun.","integ",1],
  ["Saya menepati janji meskipun keadaannya menjadi tidak menguntungkan bagi saya.","integ",0],
  ["Saya senang membantu anggota tim yang kesulitan memahami materi.","collab",0],
  ["Saya lebih suka mengerjakan semuanya sendiri karena orang lain cenderung memperlambat.","collab",1],
  ["Saya terbuka menerima pendapat yang berbeda dari anggota tim.","collab",0],
  ["Saya menghargai kontribusi orang lain di depan tim.","collab",0],
  ["Konflik dalam tim sebaiknya dihindari dengan diam saja.","collab",1],
  ["Kegagalan adalah kesempatan untuk belajar sesuatu yang baru.","growth",0],
  ["Kemampuan pemrograman seseorang pada dasarnya bawaan dan sulit ditingkatkan.","growth",1],
  ["Saya aktif mencari umpan balik untuk memperbaiki hasil kerja saya.","growth",0],
  ["Saya meluangkan waktu untuk mempelajari teknologi baru di luar kewajiban.","growth",0],
  ["Saya cenderung berhenti mencoba jika sebuah materi terasa terlalu sulit.","growth",1],
  ["Saya menyelesaikan tugas sebelum tenggat waktu.","resp",0],
  ["Saya sering menunda pekerjaan sampai mendekati batas waktu.","resp",1],
  ["Saya memecah target besar menjadi langkah-langkah kecil yang terjadwal.","resp",0],
  ["Saya tetap menyelesaikan pekerjaan berkualitas meski tidak ada yang mengawasi.","resp",0],
  ["Jika hasil kerja saya bermasalah, saya cenderung mencari pihak lain untuk disalahkan.","resp",1],
  ["Saya bisa tetap produktif ketika rencana berubah mendadak.","adapt",0],
  ["Saya merasa tidak nyaman jika harus memakai tools atau bahasa pemrograman yang baru.","adapt",1],
  ["Saya mampu menyesuaikan cara kerja dengan gaya anggota tim yang berbeda.","adapt",0],
  ["Di bawah tekanan waktu, saya tetap bisa berpikir jernih.","adapt",0],
  ["Saya kesulitan bekerja jika instruksi tidak sepenuhnya jelas.","adapt",1],
  ["Saya bisa menjelaskan konsep teknis dengan bahasa yang mudah dipahami orang awam.","comm",0],
  ["Saya bertanya ketika ada hal yang belum saya pahami.","comm",0],
  ["Saya enggan menyampaikan kendala kepada tim karena takut dianggap tidak mampu.","comm",1],
  ["Saya menulis pesan atau dokumentasi dengan ringkas dan terstruktur.","comm",0],
  ["Saya mendengarkan sampai selesai sebelum menanggapi pendapat orang lain.","comm",0]
];
const LIKERT_LBL = ["Sangat tidak setuju","Tidak setuju","Netral","Setuju","Sangat setuju"];
const SJT = [
  {q:"Saat tes online berlangsung, seorang teman mengirim pesan berisi kunci jawaban. Apa yang paling tepat kamu lakukan?",
   o:["Melihatnya sekilas untuk mencocokkan jawaban","Mengabaikannya, tetap mengerjakan sendiri, dan menegur teman setelah tes","Menyimpannya untuk berjaga-jaga","Meneruskannya ke teman lain agar adil"],s:[0,3,1,0],d:"integ"},
  {q:"Dua hari sebelum tenggat proyek tim, kamu sadar bagianmu tidak akan selesai tepat waktu. Apa yang kamu lakukan?",
   o:["Diam saja dan lembur sebisanya","Segera memberi tahu tim, menjelaskan sisa pekerjaan, dan mengusulkan solusi","Menyerahkan versi setengah jadi tanpa penjelasan","Menyalahkan anggota lain yang terlambat memberi data"],s:[1,3,0,0],d:"comm"},
  {q:"Mentor mengkritik kode kamu sebagai sulit dibaca. Respons terbaikmu adalah…",
   o:["Membela diri karena kodenya sudah berjalan","Meminta contoh spesifik lalu melakukan refactor","Mengabaikannya karena selera tiap orang berbeda","Merasa kecewa dan tidak mengirim kode lagi"],s:[0,3,1,0],d:"growth"},
  {q:"Di tengah proyek, tim memutuskan berganti framework yang belum pernah kamu pakai. Kamu akan…",
   o:["Menolak dan tetap memakai framework lama","Mempelajari dasarnya dengan cepat dan bertanya pada yang lebih paham","Menunggu orang lain mengerjakan bagian itu","Mengikuti saja tanpa berusaha memahami"],s:[0,3,1,1],d:"adapt"},
  {q:"Seorang anggota tim jarang berkontribusi dalam diskusi. Apa langkah terbaikmu?",
   o:["Melaporkannya ke mentor tanpa bicara dulu","Mengajaknya bicara secara personal dan menanyakan kendalanya","Mengerjakan bagiannya diam-diam","Menyindirnya di grup"],s:[1,3,1,0],d:"collab"},
  {q:"Kamu menemukan bug kecil di kode yang sudah kamu kumpulkan, dan belum ada yang menyadarinya. Kamu akan…",
   o:["Membiarkannya karena tidak ada yang tahu","Memperbaikinya dan memberi tahu tim tentang perubahannya","Memperbaikinya diam-diam tanpa catatan","Menunggu sampai ada yang melapor"],s:[0,3,2,0],d:"resp"}
];

const PLAN = [
  {key:"logic",type:"tech",min:10},{key:"prog",type:"tech",min:10},{key:"data",type:"tech",min:10},
  {key:"fe",type:"tech",min:10},{key:"be",type:"tech",min:10},{key:"traits",type:"traits",min:20}
];

