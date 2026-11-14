MODUL.push({
id:"pemrograman", no:"2.2", blok:"prog", menit:60,
judul:"Programming Fundamentals",
ringkas:"Paradigma, tipe data, kontrol alur, fungsi, scope dan closure, struktur data, OOP, error handling, clean code, dan Git",
md:String.raw`
## Peta Materi

Programming Fundamentals menguji konsep yang **berlaku di semua bahasa**, biasanya lewat soal "apa output kode ini" dalam **Python** atau **JavaScript**. Kuasai konsepnya, lalu hafalkan perbedaan perilaku kedua bahasa tersebut.

## 1. Bagaimana Program Dijalankan

| Istilah | Penjelasan | Contoh |
|---|---|---|
| **Compiler** | Menerjemahkan seluruh kode sumber menjadi kode mesin sebelum dijalankan | C, C++, Go, Rust |
| **Interpreter** | Menerjemahkan dan menjalankan kode baris demi baris | Python, Ruby |
| **JIT (Just-In-Time)** | Interpretasi plus kompilasi bagian yang sering dipakai saat runtime | JavaScript (V8), Java (JVM) |
| **Static typing** | Tipe diperiksa saat kompilasi | Java, TypeScript, Go |
| **Dynamic typing** | Tipe ditentukan saat program berjalan | Python, JavaScript |
| **Strong typing** | Jarang terjadi konversi tipe otomatis | Python: <code>"5" + 3</code> → error |
| **Weak typing** | Sering terjadi konversi otomatis (coercion) | JavaScript: <code>"5" + 3</code> → "53" |

### Paradigma pemrograman

| Paradigma | Ide utama | Contoh bahasa |
|---|---|---|
| Prosedural | Program adalah urutan prosedur/fungsi | C, Pascal |
| Berorientasi objek (OOP) | Program adalah kumpulan objek berisi data dan perilaku | Java, C#, Python |
| Fungsional | Fungsi murni, data immutable, tanpa efek samping | Haskell; gaya fungsional di JS/Python |
| Deklaratif | Menyatakan **apa** yang diinginkan, bukan **bagaimana** | SQL, HTML |

## 2. Variabel dan Tipe Data

| Kategori | Python | JavaScript |
|---|---|---|
| Bilangan bulat | <code>int</code> (presisi tak terbatas) | <code>number</code> (64-bit float), <code>bigint</code> |
| Desimal | <code>float</code> | <code>number</code> |
| Teks | <code>str</code> | <code>string</code> |
| Logika | <code>bool</code>: <code>True</code>/<code>False</code> | <code>boolean</code>: <code>true</code>/<code>false</code> |
| Kosong | <code>None</code> | <code>null</code>, <code>undefined</code> |
| Daftar | <code>list</code> (mutable), <code>tuple</code> (immutable) | <code>Array</code> |
| Pasangan kunci-nilai | <code>dict</code> | <code>Object</code>, <code>Map</code> |
| Himpunan unik | <code>set</code> | <code>Set</code> |

> **Teori:** **Mutable** berarti isinya bisa diubah setelah dibuat (list, dict, object, array). **Immutable** berarti tidak bisa diubah (int, str, tuple; string dan number di JS). Mengubah string selalu menghasilkan string baru.

### Nilai vs referensi

Tipe primitif disalin **nilainya**, sedangkan objek, list, dan array disalin **referensinya** (alamatnya).

~~~python
a = [1, 2, 3]
b = a            # b menunjuk ke list yang SAMA dengan a
b.append(4)
print(a)         # [1, 2, 3, 4]

c = a.copy()     # salinan dangkal (shallow copy) -> list baru
c.append(5)
print(a)         # [1, 2, 3, 4] (tidak berubah)
~~~

~~~javascript
const o1 = { n: 1 };
const o2 = o1;        // referensi yang sama
o2.n = 9;
console.log(o1.n);    // 9
const o3 = { ...o1 }; // salinan dangkal
~~~

> **Jebakan:** <code>const</code> di JavaScript melarang **penugasan ulang** variabel, bukan perubahan isi. <code>const arr = []; arr.push(1)</code> tetap valid.

## 3. Operator

| Operasi | Python | JavaScript |
|---|---|---|
| Pembagian | <code>7 / 2</code> → 3.5 | <code>7 / 2</code> → 3.5 |
| Pembagian bulat | <code>7 // 2</code> → 3; <code>-7 // 2</code> → -4 | <code>Math.floor(7 / 2)</code> → 3 |
| Sisa bagi | <code>7 % 3</code> → 1; <code>-7 % 3</code> → 2 | <code>7 % 3</code> → 1; <code>-7 % 3</code> → -1 |
| Pangkat | <code>2 ** 3</code> → 8 | <code>2 ** 3</code> → 8 |
| Sama dengan | <code>==</code> | <code>===</code> (ketat) dan <code>==</code> (dengan konversi) |
| Logika | <code>and</code>, <code>or</code>, <code>not</code> | <code>&amp;&amp;</code>, <code>\|\|</code>, <code>!</code> |
| Identitas objek | <code>is</code> | <code>Object.is</code> |

**Short-circuit evaluation:** pada <code>A and B</code>, jika A salah maka B tidak dievaluasi. Pada <code>A or B</code>, jika A benar maka B tidak dievaluasi. Di JS dan Python, operator ini mengembalikan **nilai operannya**, bukan selalu boolean: <code>0 || "default"</code> → "default"; <code>"" or "x"</code> → "x".

### Nilai falsy

| Python | JavaScript |
|---|---|
| <code>False</code>, <code>None</code>, <code>0</code>, <code>0.0</code>, <code>""</code>, <code>[]</code>, <code>{}</code>, <code>set()</code> | <code>false</code>, <code>0</code>, <code>-0</code>, <code>""</code>, <code>null</code>, <code>undefined</code>, <code>NaN</code> |

> **Jebakan:** Di JavaScript, <code>[]</code> dan <code>{}</code> bernilai **truthy**. Di Python, list dan dict kosong bernilai **falsy**.

### Konversi tipe otomatis di JavaScript

~~~javascript
"5" + 3        // "53"   (+ dengan string -> penggabungan)
"5" - 3        // 2      (- * / memaksa ke number)
"5" * "2"      // 10
true + 1       // 2
null + 1       // 1
undefined + 1  // NaN
1 == "1"       // true   (== mengonversi tipe)
1 === "1"      // false
null == undefined   // true
null === undefined  // false
NaN === NaN    // false  (gunakan Number.isNaN)
0.1 + 0.2      // 0.30000000000000004 (presisi floating point)
typeof null    // "object" (quirk historis)
typeof []      // "object" -> gunakan Array.isArray
typeof function(){}  // "function"
~~~

## 4. Kontrol Alur

### Percabangan

Dalam rangkaian if / elif / else, **hanya cabang pertama yang kondisinya benar** yang dijalankan.

~~~python
nilai = 85
if nilai >= 90:
    print("A")
elif nilai >= 80:
    print("B")      # <- ini yang dijalankan
elif nilai >= 70:
    print("C")      # tidak dicek lagi
else:
    print("D")
~~~

JavaScript juga punya <code>switch</code>. Tanpa <code>break</code>, eksekusi akan "jatuh" (fall-through) ke case berikutnya.

### Perulangan

| Konstruksi | Python | JavaScript |
|---|---|---|
| Rentang angka | <code>for i in range(0, 5)</code> → 0..4 | <code>for (let i = 0; i &lt; 5; i++)</code> |
| Iterasi isi | <code>for x in daftar</code> | <code>for (const x of arr)</code> |
| Iterasi key | <code>for k in kamus</code> | <code>for (const k in obj)</code> |
| Kondisional | <code>while kondisi:</code> | <code>while (kondisi)</code>, <code>do...while</code> |

- <code>range(start, stop, step)</code>: **stop tidak ikut**. <code>range(10, 0, -3)</code> → 10, 7, 4, 1.
- <code>break</code> keluar dari loop terdalam; <code>continue</code> melompat ke iterasi berikutnya.
- Python punya <code>for ... else</code>: blok else dijalankan jika loop selesai **tanpa** break.
- <code>do...while</code> di JS selalu dijalankan minimal sekali.

<details><summary>Contoh soal: loop bersarang</summary>

~~~python
hitung = 0
for i in range(3):
    for j in range(i):
        hitung += 1
print(hitung)
~~~

**Pembahasan:** i=0 → j tidak berjalan (0 kali); i=1 → 1 kali; i=2 → 2 kali. Total **3**.

</details>

## 5. Fungsi

- **Parameter** adalah variabel di definisi fungsi; **argumen** adalah nilai yang dikirim saat pemanggilan.
- Fungsi tanpa <code>return</code> mengembalikan <code>None</code> (Python) atau <code>undefined</code> (JS).
- **Fungsi murni (pure function):** output hanya bergantung pada input dan tidak punya efek samping. Fungsi seperti ini mudah diuji.
- **Higher-order function:** fungsi yang menerima atau mengembalikan fungsi, misalnya <code>map</code>, <code>filter</code>, dan <code>reduce</code>.

~~~javascript
const angka = [1, 2, 3, 4, 5];
angka.map(x => x * 2);              // [2, 4, 6, 8, 10]
angka.filter(x => x % 2 === 1);     // [1, 3, 5]
angka.reduce((acc, x) => acc + x, 0); // 15
angka.find(x => x > 2);             // 3 (elemen pertama yang cocok)
angka.some(x => x > 4);             // true
angka.every(x => x > 0);            // true
~~~

~~~python
angka = [1, 2, 3, 4, 5]
[x * 2 for x in angka]              # list comprehension -> [2, 4, 6, 8, 10]
[x for x in angka if x % 2 == 1]    # [1, 3, 5]
sum(angka)                          # 15
list(map(lambda x: x * 2, angka))   # [2, 4, 6, 8, 10]
~~~

> **Jebakan:** Nilai default mutable di Python dibuat **sekali** saat fungsi didefinisikan. <code>def f(x, daftar=[])</code> akan terus menambah ke list yang sama di setiap pemanggilan. Solusinya, pakai <code>daftar=None</code> lalu buat list baru di dalam fungsi.

## 6. Scope, Hoisting, dan Closure

**Scope** adalah wilayah tempat sebuah variabel bisa diakses.

| | <code>var</code> (JS) | <code>let</code> / <code>const</code> (JS) | Python |
|---|---|---|---|
| Lingkup | Fungsi | Blok <code>{ }</code> | Fungsi (LEGB: Local, Enclosing, Global, Built-in) |
| Hoisting | Ya, bernilai <code>undefined</code> | Ya, tetapi dalam *temporal dead zone* → ReferenceError | – |
| Deklarasi ulang | Boleh | Tidak boleh | – |

~~~javascript
console.log(a);  // undefined (var di-hoist)
var a = 5;
console.log(b);  // ReferenceError (temporal dead zone)
let b = 5;

for (var i = 0; i < 3; i++) setTimeout(() => console.log(i));  // 3 3 3
for (let j = 0; j < 3; j++) setTimeout(() => console.log(j));  // 0 1 2
~~~

Pada contoh terakhir, <code>var</code> hanya membuat satu variabel i untuk seluruh loop, sedangkan <code>let</code> membuat variabel baru di setiap iterasi.

**Closure** adalah fungsi yang "mengingat" variabel dari scope tempat ia dibuat, bahkan setelah fungsi luarnya selesai berjalan.

~~~javascript
function buatCounter() {
  let n = 0;
  return () => ++n;
}
const c = buatCounter();
c(); c();
console.log(c());  // 3
~~~

## 7. Rekursi

Rekursi sudah dibahas di Bab 2.1. Hal tambahan yang perlu diingat:

- Setiap pemanggilan disimpan di **call stack**. Rekursi yang terlalu dalam menyebabkan stack overflow (di Python muncul <code>RecursionError</code>, batas default sekitar 1.000).
- **Memoization** menyimpan hasil perhitungan supaya tidak dihitung ulang. Fibonacci naif bernilai O(2ⁿ), sedangkan dengan memoization O(n).

~~~python
from functools import lru_cache

@lru_cache(maxsize=None)     # menyimpan hasil pemanggilan sebelumnya
def fib(n):
    if n <= 1:
        return n
    return fib(n - 1) + fib(n - 2)
~~~

## 8. Struktur Data

| Struktur | Sifat | Akses | Cari | Sisip/hapus | Kegunaan |
|---|---|---|---|---|---|
| Array / list | Berurutan, berindeks | O(1) | O(n) | O(n) di tengah, O(1) di akhir | Data berurutan |
| Linked list | Node saling menunjuk | O(n) | O(n) | O(1) jika node diketahui | Sisip/hapus sering |
| **Stack** | **LIFO** | puncak O(1) | – | push/pop O(1) | Undo, call stack, cek kurung |
| **Queue** | **FIFO** | depan O(1) | – | enqueue/dequeue O(1) | Antrean tugas, BFS |
| Hash table | Key → value lewat fungsi hash | O(1) rata-rata | O(1) rata-rata | O(1) rata-rata | dict, Map, cache |
| Set | Elemen unik | – | O(1) rata-rata | O(1) | Menghapus duplikat |
| Tree (BST) | Hierarki; kiri < akar < kanan | – | O(log n) jika seimbang | O(log n) | Indeks database, DOM, folder |
| Heap | Akar selalu min/max | min/max O(1) | – | O(log n) | Priority queue |
| Graph | Simpul + sisi | – | BFS/DFS O(V+E) | – | Peta rute, jejaring sosial |

<details><summary>Contoh soal: stack</summary>

**Soal:** Sebuah stack kosong menjalankan push(1), push(2), pop(), push(3), push(4), pop(). Elemen di puncak sekarang?

**Pembahasan:** [1] → [1,2] → pop 2 → [1] → [1,3] → [1,3,4] → pop 4 → [1,3]. Puncaknya **3**.

</details>

### Penelusuran tree

Untuk tree dengan akar A, anak kiri B, dan anak kanan C:

- **Pre-order** (akar, kiri, kanan): A B C
- **In-order** (kiri, akar, kanan): B A C. Pada BST, in-order menghasilkan data yang terurut.
- **Post-order** (kiri, kanan, akar): B C A
- **BFS / level-order**: per tingkat, memakai queue. **DFS**: masuk sedalam mungkin dulu, memakai stack atau rekursi.

### Operasi string dan list yang sering keluar

~~~python
s = "Pijak2027"
s[0], s[-1]      # 'P', '7'
s[1:4]           # 'ija'  (indeks 4 tidak ikut)
s[::-1]          # '7202kajiP' (dibalik)
s.lower(), len(s)  # 'pijak2027', 9
"a,b,c".split(",")   # ['a', 'b', 'c']
"-".join(["a", "b"]) # 'a-b'
~~~

~~~javascript
const s = "Pijak2027";
s[0]; s.length;           // "P", 9
s.slice(1, 4);            // "ija"
s.split("").reverse().join("");  // "7202kajiP"
[3, 1, 10].sort();        // [1, 10, 3]  <- sort default membandingkan sebagai STRING!
[3, 1, 10].sort((a, b) => a - b); // [1, 3, 10]
~~~

## 9. Pemrograman Berorientasi Objek (OOP)

> **Teori:** OOP memodelkan program sebagai kumpulan **objek** yang menggabungkan **data (atribut)** dan **perilaku (method)**. **Class** adalah cetak biru, sedangkan **object** atau **instance** adalah hasil cetakannya.

### Empat pilar OOP

| Pilar | Arti | Contoh |
|---|---|---|
| **Encapsulation** | Menyembunyikan data internal; akses hanya lewat method | Atribut <code>saldo</code> privat, diubah lewat <code>setor()</code> |
| **Abstraction** | Menampilkan yang penting dan menyembunyikan kompleksitas | <code>mobil.jalan()</code> tanpa perlu tahu cara kerja mesin |
| **Inheritance** | Class anak mewarisi atribut dan method class induk | <code>Kucing extends Hewan</code> |
| **Polymorphism** | Satu antarmuka, banyak bentuk implementasi | <code>hewan.suara()</code> menghasilkan "Meong" atau "Guk" |

~~~python
class Hewan:
    def __init__(self, nama):
        self.nama = nama          # atribut
    def suara(self):              # method
        return "..."

class Kucing(Hewan):              # inheritance
    def suara(self):              # overriding -> polymorphism
        return "Meong"

class Anjing(Hewan):
    def suara(self):
        return "Guk"

for h in [Kucing("Tom"), Anjing("Rex")]:
    print(h.nama, h.suara())      # Tom Meong / Rex Guk
~~~

- **Overloading:** nama method sama dengan parameter berbeda, ditentukan saat compile (Java). **Overriding:** class anak mendefinisikan ulang method induk, ditentukan saat runtime.
- **Constructor** (<code>__init__</code> di Python, <code>constructor</code> di JS) dijalankan saat objek dibuat.
- **Interface / abstract class:** kontrak berisi method yang wajib diimplementasikan oleh class turunannya.
- **Composition over inheritance:** relasi "punya" (mobil *punya* mesin) sering lebih fleksibel daripada relasi "adalah" (mobil *adalah* kendaraan).

### Prinsip SOLID

| Prinsip | Arti singkat |
|---|---|
| **S**ingle Responsibility | Satu class hanya punya satu alasan untuk berubah |
| **O**pen/Closed | Terbuka untuk perluasan, tertutup untuk modifikasi |
| **L**iskov Substitution | Objek turunan harus bisa menggantikan objek induk tanpa merusak program |
| **I**nterface Segregation | Lebih baik banyak interface kecil daripada satu interface gemuk |
| **D**ependency Inversion | Bergantung pada abstraksi, bukan pada implementasi konkret |

## 10. Penanganan Error

~~~python
try:
    x = int("abc")
except ValueError as e:
    print("Input bukan angka")
else:
    print("Berhasil")        # hanya jika TIDAK ada error
finally:
    print("Selalu jalan")    # selalu dijalankan
~~~

~~~javascript
try {
  JSON.parse("{rusak");
} catch (err) {
  console.log(err.name);   // "SyntaxError"
} finally {
  console.log("selesai");
}
~~~

| Jenis error | Kapan terjadi | Contoh |
|---|---|---|
| Syntax error | Kode melanggar tata bahasa, program tidak bisa jalan | Lupa titik dua atau kurung |
| Runtime error | Terjadi saat program berjalan | Pembagian dengan nol, indeks di luar batas |
| Logic error | Program berjalan tetapi hasilnya salah | Memakai <code>&lt;</code> padahal seharusnya <code>&lt;=</code> |

Exception Python yang umum: <code>TypeError</code>, <code>ValueError</code>, <code>IndexError</code>, <code>KeyError</code>, <code>ZeroDivisionError</code>, <code>NameError</code>, <code>AttributeError</code>.

## 11. Pemrograman Asinkron (Pengantar)

Kode **sinkron** dijalankan berurutan dan menunggu setiap langkah selesai. Kode **asinkron** memulai operasi lambat (jaringan, file, timer) lalu melanjutkan pekerjaan lain, dan hasilnya ditangani belakangan lewat **callback**, **Promise**, atau **async/await**. Detail event loop dibahas di Bab 2.4.

## 12. Clean Code dan Praktik Baik

- **Penamaan yang bermakna:** <code>totalHarga</code> lebih baik daripada <code>th</code>.
- **DRY (Don't Repeat Yourself):** logika yang berulang dijadikan fungsi.
- **KISS (Keep It Simple):** solusi paling sederhana yang bekerja.
- **YAGNI (You Aren't Gonna Need It):** jangan membuat fitur sebelum dibutuhkan.
- Fungsi yang pendek, satu tugas, dan komentar yang menjelaskan **mengapa**, bukan **apa**.
- **Testing:** unit test untuk setiap fungsi penting. **TDD** berarti menulis test lebih dulu: red → green → refactor.
- **Debugging:** baca pesan error dan stack trace, reproduksi masalahnya, persempit lokasinya (print, debugger, breakpoint), perbaiki, lalu uji ulang.

## 13. Version Control dengan Git

> **Teori:** Git adalah sistem version control **terdistribusi**, dibuat oleh Linus Torvalds pada 2005. Setiap salinan repository menyimpan seluruh riwayat perubahan.

Alur kerja dasarnya: **working directory** → <code>git add</code> → **staging area** → <code>git commit</code> → **repository lokal** → <code>git push</code> → **remote** (GitHub/GitLab).

| Perintah | Fungsi |
|---|---|
| <code>git init</code> | Membuat repository baru |
| <code>git clone &lt;url&gt;</code> | Menyalin repository remote beserta riwayatnya |
| <code>git status</code> | Melihat status file |
| <code>git add &lt;file&gt;</code> / <code>git add .</code> | Memasukkan perubahan ke staging |
| <code>git commit -m "pesan"</code> | Menyimpan snapshot |
| <code>git log</code> | Melihat riwayat commit |
| <code>git branch</code> / <code>git switch -c fitur</code> | Membuat dan berpindah branch |
| <code>git merge fitur</code> | Menggabungkan branch |
| <code>git pull</code> | <code>git fetch</code> + <code>git merge</code> dari remote |
| <code>git fetch</code> | Mengambil perubahan tanpa menggabungkan |
| <code>git push</code> | Mengirim commit ke remote |
| <code>git revert</code> | Membuat commit baru yang membatalkan commit lama (aman) |
| <code>git reset</code> | Memindahkan HEAD ke commit lain (mengubah riwayat) |
| <code>git stash</code> | Menyimpan perubahan sementara tanpa commit |

**Merge conflict** terjadi ketika dua branch mengubah baris yang sama. Git menandai bagian yang bentrok, kamu memilih versi yang benar, lalu melakukan commit. **Pull request** adalah permintaan agar perubahan di sebuah branch ditinjau (code review) sebelum digabungkan.

## Ringkasan Cepat

- Python <code>//</code> membulatkan ke bawah; <code>range</code> tidak menyertakan nilai stop; slicing tidak menyertakan indeks akhir.
- JS: <code>+</code> dengan string menggabungkan; <code>-</code> mengonversi ke angka; gunakan <code>===</code>; <code>typeof null</code> adalah "object".
- Objek, list, dan array disalin sebagai referensi.
- <code>let</code>/<code>const</code> berlingkup blok, <code>var</code> berlingkup fungsi; closure mengingat variabel luar.
- Stack = LIFO, Queue = FIFO, hash map O(1), BST O(log n).
- Empat pilar OOP: encapsulation, abstraction, inheritance, polymorphism.
- <code>finally</code> selalu dijalankan; <code>else</code> pada try hanya jika tidak ada error.
`});
