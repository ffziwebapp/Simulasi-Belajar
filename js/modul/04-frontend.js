MODUL.push({
id:"frontend", no:"2.4", blok:"fe", menit:60,
judul:"Frontend / Client-Side",
ringkas:"Cara kerja browser, HTML semantik, CSS (cascade, box model, flexbox, grid, responsif), JavaScript & DOM, async, React, performa, aksesibilitas, keamanan",
md:String.raw`
## Peta Materi

Frontend adalah semua hal yang berjalan **di browser pengguna**. Ada tiga lapisan, ditambah tooling dan framework:

| Lapisan | Peran | Analogi rumah |
|---|---|---|
| **HTML** | Struktur dan makna konten | Rangka dan ruangan |
| **CSS** | Tampilan dan tata letak | Cat, dekorasi, tata ruang |
| **JavaScript** | Perilaku dan interaksi | Listrik, pintu otomatis |

## 1. Cara Kerja Browser

> **Teori:** **Critical Rendering Path** adalah urutan langkah browser mengubah HTML, CSS, dan JS menjadi piksel di layar.

1. **Parsing HTML** menjadi **DOM** (Document Object Model), sebuah pohon objek.
2. **Parsing CSS** menjadi **CSSOM**.
3. DOM dan CSSOM digabung menjadi **Render Tree** (hanya elemen yang terlihat; <code>display: none</code> tidak ikut).
4. **Layout (reflow):** menghitung posisi dan ukuran setiap elemen.
5. **Paint:** mewarnai piksel.
6. **Composite:** menyusun lapisan-lapisan menjadi gambar akhir.

Implikasinya:

- CSS bersifat **render-blocking**, jadi letakkan di <code>&lt;head&gt;</code>.
- <code>&lt;script&gt;</code> biasa **memblokir parsing** HTML. Gunakan <code>defer</code> (dijalankan berurutan setelah parsing selesai) atau <code>async</code> (dijalankan segera setelah terunduh, urutannya tidak dijamin).
- Mengubah ukuran atau posisi elemen memicu **reflow** (mahal). Mengubah warna hanya memicu **repaint**. Animasi <code>transform</code> dan <code>opacity</code> paling murah karena hanya memicu composite.

## 2. HTML

### Struktur dokumen

~~~html
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Judul Halaman</title>
  <link rel="stylesheet" href="style.css">
  <script src="app.js" defer></script>
</head>
<body>
  <header><nav>...</nav></header>
  <main>
    <article>
      <h1>Judul</h1>
      <p>Paragraf dengan <a href="/profil">tautan</a>.</p>
      <img src="foto.jpg" alt="Deskripsi foto">
    </article>
  </main>
  <footer>...</footer>
</body>
</html>
~~~

- <code>&lt;!DOCTYPE html&gt;</code> membuat browser memakai mode standar HTML5.
- Meta **viewport** wajib ada agar halaman responsif di HP.

### Elemen block vs inline

| Block (lebar penuh, mulai baris baru) | Inline (mengikuti alur teks) |
|---|---|
| <code>div</code>, <code>p</code>, <code>h1</code>–<code>h6</code>, <code>ul</code>, <code>li</code>, <code>section</code>, <code>form</code>, <code>table</code> | <code>span</code>, <code>a</code>, <code>strong</code>, <code>em</code>, <code>img</code>, <code>input</code>, <code>button</code>, <code>label</code> |

### HTML semantik

Tag semantik menjelaskan **makna** konten, bukan hanya tampilannya: <code>&lt;header&gt;</code>, <code>&lt;nav&gt;</code>, <code>&lt;main&gt;</code> (satu per halaman), <code>&lt;section&gt;</code>, <code>&lt;article&gt;</code>, <code>&lt;aside&gt;</code>, <code>&lt;footer&gt;</code>, <code>&lt;figure&gt;</code>, dan <code>&lt;time&gt;</code>. Manfaatnya: **aksesibilitas** (screen reader), **SEO**, dan kode yang lebih mudah dirawat.

> **Jebakan:** <code>&lt;b&gt;</code> dan <code>&lt;i&gt;</code> hanya gaya visual. <code>&lt;strong&gt;</code> dan <code>&lt;em&gt;</code> memberi makna penekanan.

### Form

~~~html
<form action="/daftar" method="POST">
  <label for="email">Email</label>
  <input id="email" name="email" type="email" required placeholder="nama@mail.com">
  <input type="password" name="pw" minlength="8">
  <select name="kota"><option value="bdg">Bandung</option></select>
  <textarea name="pesan"></textarea>
  <button type="submit">Kirim</button>
</form>
~~~

- Atribut <code>name</code> menjadi kunci data yang dikirim ke server.
- <code>method="GET"</code> mengirim data lewat URL (query string). <code>POST</code> mengirimnya di body request.
- Tipe input HTML5: email, number, date, tel, url, range, color, file, checkbox, radio.
- Validasi bawaan: <code>required</code>, <code>min</code>/<code>max</code>, <code>minlength</code>, <code>pattern</code>. Validasi di sisi klien **tidak menggantikan** validasi di server.

### Tag dan atribut lain

<code>&lt;a href target="_blank" rel="noopener"&gt;</code>, <code>&lt;img src alt loading="lazy"&gt;</code>, <code>&lt;table&gt;</code> (<code>thead</code>, <code>tbody</code>, <code>tr</code>, <code>th</code>, <code>td</code>), <code>&lt;video&gt;</code>/<code>&lt;audio&gt;</code>, <code>&lt;iframe&gt;</code>, atribut global <code>id</code> (unik per halaman), <code>class</code> (boleh berulang), dan <code>data-*</code> untuk data kustom.

## 3. CSS

### Sintaks dan cara memasang

~~~css
selector {
  properti: nilai;
}
~~~

Tiga cara memasang CSS: **inline** (<code>style="..."</code>), **internal** (<code>&lt;style&gt;</code>), dan **eksternal** (<code>&lt;link&gt;</code>, cara yang disarankan).

### Selector

| Selector | Contoh | Memilih |
|---|---|---|
| Universal | <code>*</code> | Semua elemen |
| Tag | <code>p</code> | Semua &lt;p&gt; |
| Class | <code>.kartu</code> | class="kartu" |
| ID | <code>#utama</code> | id="utama" |
| Atribut | <code>input[type="email"]</code> | Input bertipe email |
| Keturunan | <code>nav a</code> | &lt;a&gt; di dalam nav (di level mana pun) |
| Anak langsung | <code>ul &gt; li</code> | li yang langsung di bawah ul |
| Saudara berikutnya | <code>h2 + p</code> | p tepat setelah h2 |
| Pseudo-class | <code>a:hover</code>, <code>li:first-child</code>, <code>li:nth-child(2n)</code>, <code>input:focus</code> | Keadaan atau posisi |
| Pseudo-element | <code>p::first-line</code>, <code>.x::before</code> | Bagian dari elemen |

### Cascade dan specificity

> **Teori:** "Cascading" berarti beberapa aturan bisa berlaku untuk elemen yang sama, dan browser memilih pemenangnya berdasarkan **(1) origin dan !important, (2) specificity, (3) urutan kemunculan** (aturan yang ditulis belakangan menang jika specificity-nya sama).

Specificity dihitung sebagai (inline, ID, class/atribut/pseudo-class, tag/pseudo-element):

| Selector | Specificity |
|---|---|
| <code>p</code> | (0,0,0,1) |
| <code>.menu a</code> | (0,0,1,1) |
| <code>#nav .item:hover</code> | (0,1,2,0) |
| <code>style="..."</code> | (1,0,0,0) |
| <code>!important</code> | Mengalahkan semuanya (hindari) |

**Inheritance:** properti teks seperti <code>color</code>, <code>font-family</code>, dan <code>line-height</code> diwariskan ke elemen anak. Properti box seperti <code>margin</code>, <code>padding</code>, dan <code>border</code> tidak diwariskan.

### Box model

Setiap elemen adalah kotak berlapis dari dalam ke luar: **content → padding → border → margin**.

~~~css
.kotak { width: 200px; padding: 20px; border: 5px solid; margin: 10px; }
/* content-box (default): lebar tampak = 200 + 2*20 + 2*5 = 250px */
/* border-box: lebar tampak = 200px (padding & border sudah termasuk) */
* { box-sizing: border-box; }
~~~

**Margin collapsing:** margin vertikal dua elemen block yang bersebelahan tidak dijumlahkan; yang dipakai adalah margin terbesar.

### Display dan position

| <code>display</code> | Perilaku |
|---|---|
| <code>block</code> | Lebar penuh, bisa diatur width/height |
| <code>inline</code> | Sebaris; width/height dan margin vertikal diabaikan |
| <code>inline-block</code> | Sebaris tetapi bisa diatur ukurannya |
| <code>none</code> | Dihapus dari layout (berbeda dengan <code>visibility: hidden</code> yang tetap memakan ruang) |
| <code>flex</code> / <code>grid</code> | Container tata letak modern |

| <code>position</code> | Acuan | Tetap di alur dokumen? |
|---|---|---|
| <code>static</code> | Default, tidak bisa digeser top/left | Ya |
| <code>relative</code> | Posisi asalnya sendiri | Ya (ruang asal tetap terpakai) |
| <code>absolute</code> | Ancestor terdekat yang <code>position</code>-nya bukan static | **Tidak** |
| <code>fixed</code> | Viewport, tidak ikut scroll | Tidak |
| <code>sticky</code> | Relative sampai batas scroll tertentu, lalu menempel | Ya |

<code>z-index</code> mengatur tumpukan dan hanya berlaku pada elemen yang positioned (atau item flex/grid).

### Flexbox (satu dimensi)

~~~css
.container {
  display: flex;
  flex-direction: row;          /* row | column: menentukan SUMBU UTAMA */
  justify-content: space-between; /* perataan di sumbu utama */
  align-items: center;          /* perataan di sumbu silang */
  flex-wrap: wrap;              /* boleh pindah baris */
  gap: 16px;
}
.item { flex: 1; }              /* flex-grow:1 -> membagi ruang sisa sama rata */
~~~

| Nilai justify-content | Hasil |
|---|---|
| <code>flex-start</code> / <code>flex-end</code> / <code>center</code> | Rata awal / akhir / tengah |
| <code>space-between</code> | Item pertama dan terakhir menempel tepi, jarak di antaranya sama |
| <code>space-around</code> | Jarak di sekitar setiap item sama (tepi mendapat setengahnya) |
| <code>space-evenly</code> | Semua jarak sama persis |

> **Jebakan:** Jika <code>flex-direction: column</code>, maka <code>justify-content</code> mengatur arah **vertikal** dan <code>align-items</code> arah **horizontal**.

### Grid (dua dimensi)

~~~css
.galeri {
  display: grid;
  grid-template-columns: repeat(3, 1fr);   /* 3 kolom sama lebar */
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); /* responsif otomatis */
  gap: 12px;
}
.besar { grid-column: 1 / 3; }  /* membentang dari garis 1 sampai 3 = 2 kolom */
~~~

Satuan <code>fr</code> berarti satu bagian dari ruang yang tersisa. Gunakan **flexbox** untuk satu baris/kolom (navbar, deretan tombol) dan **grid** untuk tata letak dua dimensi (galeri, kerangka halaman).

### Satuan

| Satuan | Relatif terhadap |
|---|---|
| <code>px</code> | Absolut |
| <code>%</code> | Ukuran elemen induk |
| <code>em</code> | Font-size elemen itu sendiri atau induknya (bisa menumpuk) |
| <code>rem</code> | Font-size **root** (html), biasanya 16px |
| <code>vw</code> / <code>vh</code> | 1% lebar / tinggi viewport |

### Responsive design

> **Teori:** Istilah *responsive web design* dipopulerkan Ethan Marcotte (2010) dengan tiga bahan: **fluid grid**, **gambar fleksibel**, dan **media query**. Pendekatan **mobile-first** menulis gaya untuk layar kecil lebih dulu, lalu menambah aturan untuk layar besar dengan <code>min-width</code>.

~~~css
.kolom { width: 100%; }                      /* HP */
@media (min-width: 768px) { .kolom { width: 50%; } }   /* tablet */
@media (min-width: 1024px) { .kolom { width: 33.33%; } } /* desktop */
img { max-width: 100%; height: auto; }
~~~

### Lain-lain yang sering keluar

- **Transition** (<code>transition: all .3s ease</code>) vs **animation** (<code>@keyframes</code>).
- **Custom property / variabel CSS:** <code>--warna: #0fb5a6;</code> lalu <code>color: var(--warna);</code>.
- **Preprocessor** (Sass/SCSS) dan **framework CSS** (Tailwind yang utility-first, Bootstrap yang berbasis komponen).

## 4. JavaScript di Browser

Konsep inti bahasa (tipe, scope, closure, operator) ada di Bab 2.2. Bagian ini fokus pada fitur modern dan interaksi dengan browser.

### Fitur ES6+ yang wajib dikenali

~~~javascript
const { nama, umur = 17 } = user;        // destructuring objek + nilai default
const [pertama, ...sisa] = [1, 2, 3];    // destructuring array + rest
const gabung = { ...a, ...b };           // spread
const kali = (x, y = 2) => x * y;        // arrow function + default param
const salam = "Halo " + nama;            // (template literal juga umum dipakai)
user?.alamat?.kota;                      // optional chaining -> undefined jika null
nilai ?? "default";                      // nullish coalescing: hanya untuk null/undefined
import { fungsi } from "./modul.js";     // ES modules
class Akun { #saldo = 0; }               // field privat
~~~

> **Jebakan:** <code>0 || 10</code> menghasilkan 10, sedangkan <code>0 ?? 10</code> menghasilkan 0. Operator <code>??</code> hanya mengganti null/undefined.

### this

| Konteks | Nilai <code>this</code> |
|---|---|
| Method objek (<code>obj.f()</code>) | Objek tersebut |
| Fungsi biasa (strict mode) | <code>undefined</code> |
| Arrow function | **Mewarisi** this dari scope luarnya (tidak punya this sendiri) |
| Event handler (function biasa) | Elemen yang memicu event |
| <code>new F()</code> | Objek baru |
| <code>f.call(x)</code> / <code>apply</code> / <code>bind</code> | x |

### DOM

~~~javascript
// memilih elemen
document.getElementById("judul");
document.querySelector(".kartu");        // elemen PERTAMA yang cocok
document.querySelectorAll("li");         // NodeList berisi semua yang cocok

// mengubah
el.textContent = "Teks aman";            // teks biasa
el.innerHTML = "<b>HTML</b>";            // di-parse sebagai HTML, rawan XSS
el.classList.add("aktif"); el.classList.toggle("buka");
el.style.color = "red";
el.setAttribute("data-id", "7");

// membuat dan menghapus
const li = document.createElement("li");
li.textContent = "Baru";
ul.appendChild(li);
li.remove();
~~~

### Event

~~~javascript
btn.addEventListener("click", (e) => {
  e.preventDefault();      // mencegah aksi bawaan (submit form, pindah link)
  e.stopPropagation();     // menghentikan bubbling
  console.log(e.target);   // elemen yang diklik
});
~~~

- **Event propagation** punya tiga fase: capturing (dari atas ke target) → target → **bubbling** (dari target naik ke atas, ini default).
- **Event delegation:** pasang satu listener di elemen induk, lalu periksa <code>e.target</code>. Cara ini efisien untuk daftar yang item-nya dinamis.
- Event umum: click, input, change, submit, keydown, load, <code>DOMContentLoaded</code>, scroll, resize.

### Penyimpanan di browser

| | Kapasitas | Masa berlaku | Dikirim ke server? |
|---|---|---|---|
| **Cookie** | ± 4 KB | Sesuai expires | **Ya**, di setiap request |
| **localStorage** | ± 5–10 MB | Permanen sampai dihapus | Tidak |
| **sessionStorage** | ± 5 MB | Sampai tab ditutup | Tidak |
| **IndexedDB** | Besar | Permanen | Tidak |

localStorage hanya menyimpan string. Gunakan <code>JSON.stringify</code> dan <code>JSON.parse</code> untuk objek.

## 5. Asynchronous JavaScript dan Event Loop

> **Teori:** JavaScript berjalan di **satu thread**. Operasi lambat (timer, jaringan) diserahkan ke browser (Web API), lalu callback-nya dimasukkan ke antrean. **Event loop** mengambil tugas dari antrean hanya ketika **call stack kosong**. **Microtask** (Promise, <code>queueMicrotask</code>) selalu dikosongkan lebih dulu sebelum **macrotask** berikutnya (setTimeout, event).

~~~javascript
console.log("1");
setTimeout(() => console.log("2"), 0);       // macrotask
Promise.resolve().then(() => console.log("3")); // microtask
console.log("4");
// Output: 1, 4, 3, 2
~~~

### Evolusi penanganan asinkron

~~~javascript
// 1. Callback (bisa menjadi "callback hell" jika bersarang)
ambil(url, function (data) { ... });

// 2. Promise: pending -> fulfilled / rejected
fetch("/api/produk")
  .then(res => res.json())
  .then(data => tampilkan(data))
  .catch(err => console.error(err));

// 3. async/await: gaya sinkron di atas Promise
async function muat() {
  try {
    const res = await fetch("/api/produk");
    if (!res.ok) throw new Error("HTTP " + res.status); // fetch TIDAK reject untuk 404/500!
    const data = await res.json();
    return data;
  } catch (err) {
    console.error(err);
  }
}

// menjalankan paralel
const [a, b] = await Promise.all([fetch(u1), fetch(u2)]);
~~~

> **Jebakan:** <code>fetch</code> hanya me-*reject* saat terjadi kegagalan jaringan. Status 404 atau 500 tetap *resolve*, jadi selalu periksa <code>res.ok</code>.

**AJAX** adalah istilah umum untuk mengambil data dari server tanpa me-reload halaman, dulu dengan XMLHttpRequest dan sekarang dengan <code>fetch</code>. **JSON** adalah format pertukaran data standar.

## 6. Framework dan React

Framework/library UI populer: **React** (Meta), **Vue**, **Angular** (Google), dan **Svelte**. Semuanya berbasis **komponen**.

> **Teori:** React memakai pendekatan **deklaratif**: kamu mendeskripsikan tampilan untuk setiap state, dan React yang mengurus perubahan DOM-nya. React memakai **Virtual DOM**: setiap kali state berubah, React membuat pohon virtual baru, membandingkannya dengan yang lama (**diffing/reconciliation**), lalu hanya menerapkan perubahan yang diperlukan ke DOM asli. **Data mengalir satu arah**, dari induk ke anak lewat props.

~~~jsx
import { useState, useEffect } from "react";

function Counter({ awal }) {                 // props: dari induk, read-only
  const [jumlah, setJumlah] = useState(awal); // state lokal

  useEffect(() => {                           // efek samping
    document.title = "Klik: " + jumlah;
  }, [jumlah]);                                // dijalankan ulang saat jumlah berubah

  return (
    <button onClick={() => setJumlah(jumlah + 1)}>
      Diklik {jumlah} kali
    </button>
  );
}

function Daftar({ items }) {
  return <ul>{items.map(it => <li key={it.id}>{it.nama}</li>)}</ul>;
}
~~~

| Konsep | Penjelasan |
|---|---|
| **JSX** | Sintaks mirip HTML di dalam JS; memakai <code>className</code>, bukan <code>class</code> |
| **Props** | Data dari induk ke anak, read-only |
| **State** | Data internal komponen; mengubahnya lewat setter memicu re-render |
| **useEffect** | Efek samping; <code>[]</code> = sekali setelah mount; tanpa array = setiap render |
| **key** | Identitas unik item di list untuk reconciliation |
| **Lifting state up** | Memindahkan state ke induk bersama supaya bisa dipakai beberapa anak |
| **Context / Redux / Zustand** | State global untuk menghindari *prop drilling* |
| **Controlled component** | Nilai input dikendalikan oleh state |

**SPA vs MPA:** Single Page Application memuat satu halaman lalu mengganti konten lewat JS (seperti situs ini). Multi Page Application memuat halaman baru dari server. **CSR vs SSR:** Client-Side Rendering merender di browser, sedangkan Server-Side Rendering (misalnya Next.js) mengirim HTML yang sudah jadi sehingga lebih baik untuk SEO dan muat awal.

## 7. Tooling

- **npm/yarn/pnpm:** pengelola paket. <code>package.json</code> mencatat dependensi dan script.
- **Bundler** (Vite, Webpack): menggabungkan dan mengoptimalkan file JS/CSS.
- **Transpiler** (Babel, TypeScript compiler): mengubah sintaks modern menjadi kode yang kompatibel dengan browser lama.
- **TypeScript:** JavaScript dengan tipe statis.
- **Linter dan formatter:** ESLint, Prettier.
- **DevTools browser:** tab Elements, Console, Network, Application (storage), Lighthouse.

## 8. Performa Web

> **Teori:** **Core Web Vitals** dari Google mengukur pengalaman pengguna:
> - **LCP** (Largest Contentful Paint): kecepatan konten utama tampil, baik ≤ 2,5 detik.
> - **INP** (Interaction to Next Paint): responsivitas terhadap interaksi, baik ≤ 200 ms. INP menggantikan FID sejak 2024.
> - **CLS** (Cumulative Layout Shift): stabilitas tata letak, baik ≤ 0,1.

Teknik optimasi: kompres dan ubah gambar ke format modern (WebP/AVIF), <code>loading="lazy"</code>, minifikasi, *code splitting*, caching dan CDN, <code>defer</code> pada script, pemberian ukuran pada gambar agar tidak terjadi layout shift, serta debounce/throttle untuk event yang sering terpicu.

## 9. Aksesibilitas (a11y)

> **Teori:** Panduan **WCAG** (Web Content Accessibility Guidelines) dari W3C berpijak pada empat prinsip **POUR**: **Perceivable**, **Operable**, **Understandable**, dan **Robust**.

- Teks <code>alt</code> pada gambar informatif (<code>alt=""</code> untuk gambar dekoratif).
- Setiap input punya <code>&lt;label&gt;</code>.
- Kontras warna minimal 4,5:1 untuk teks normal (level AA).
- Semua fungsi bisa dioperasikan dengan **keyboard** (Tab, Enter) dan fokusnya terlihat.
- Gunakan HTML semantik lebih dulu; atribut **ARIA** (<code>aria-label</code>, <code>role</code>) hanya bila tidak ada elemen semantik yang sesuai.

## 10. Keamanan di Sisi Klien

| Ancaman | Penjelasan | Pencegahan |
|---|---|---|
| **XSS** | Script penyerang berjalan di halaman korban | Escape output, gunakan <code>textContent</code>, Content Security Policy, sanitasi HTML |
| **CSRF** | Situs lain memicu request atas nama pengguna yang sedang login | CSRF token, cookie <code>SameSite</code> |
| **Clickjacking** | Halaman dibungkus iframe tak terlihat | Header <code>X-Frame-Options</code> / CSP <code>frame-ancestors</code> |
| Menyimpan rahasia di frontend | Semua kode frontend bisa dibaca pengguna | API key rahasia hanya disimpan di server |

**Same-Origin Policy:** browser membatasi skrip dari satu origin (protokol + domain + port) untuk membaca respons dari origin lain. **CORS** adalah mekanisme bagi server untuk mengizinkan pengecualian (dibahas di Bab 2.5).

## Ringkasan Cepat

- Render: DOM + CSSOM → render tree → layout → paint → composite. Script biasa memblokir parsing; gunakan <code>defer</code>.
- Specificity: inline > ID > class > tag; jika seri, yang ditulis terakhir menang.
- Box model: content → padding → border → margin. <code>border-box</code> memasukkan padding dan border ke width.
- <code>absolute</code> mengacu pada ancestor positioned terdekat. Flex untuk satu dimensi, grid untuk dua dimensi.
- <code>rem</code> mengacu ke root; mobile-first memakai <code>min-width</code>.
- Event loop: sinkron → microtask (Promise) → macrotask (setTimeout). <code>fetch</code> tidak reject untuk 404.
- React: props read-only, setter state memicu re-render, key pada list, Virtual DOM.
- LCP ≤ 2,5 s, INP ≤ 200 ms, CLS ≤ 0,1. WCAG: POUR. XSS dicegah dengan escape output.
`});
