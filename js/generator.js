/* =========================================================
   Generator soal: angka dan nilai diacak setiap kali dibuat,
   sehingga soal sejenis tidak pernah persis sama.
   Setiap generator mengembalikan {q, code?, o:[4 opsi], a:0, e}
   ========================================================= */
(function(){
const R = (a,b) => a + Math.floor(Math.random()*(b-a+1));
const pick = arr => arr[Math.floor(Math.random()*arr.length)];
const shuf = a => {a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a};
const fmtList = a => "[" + a.join(", ") + "]";

// rakit soal: opsi benar di indeks 0, pengecoh unik, isi otomatis bila kurang
function mk(q, correct, wrongs, e, code, filler){
  const c = String(correct), o = [c];
  wrongs.forEach(w => { const s = String(w); if(!o.includes(s) && o.length < 4) o.push(s); });
  const generic = ["Tidak dapat ditentukan", "Terjadi error", "Tidak ada output"];
  const num = c.match(/^(-?\d+)(.*)$/);
  let n = 1, g = 0;
  while(o.length < 4 && n < 50){
    let s;
    if(filler) s = String(filler(n));
    else if(num) s = (parseInt(num[1],10) + (n % 2 ? Math.ceil(n/2) : -Math.ceil(n/2))) + num[2];
    else s = generic[g++ % generic.length];
    if(!o.includes(s)) o.push(s);
    n++;
  }
  const out = {q, o, a:0, e, gen:true};
  if(code) out.code = code;
  return out;
}

window.GEN = {
/* ---------------- LOGIKA ---------------- */
logic: [
  () => { // deret selisih bertingkat
    const a=R(1,6), d=R(2,5), s=R(1,3); const t=[a]; let diff=d;
    for(let i=1;i<6;i++){ t.push(t[i-1]+diff); diff+=s; }
    const ans=t[5], last=t[4];
    return mk(`Lanjutkan deret: ${t.slice(0,5).join(", ")}, …`, ans, [ans+s, ans-s, last+(t[4]-t[3])],
      `Selisih antarsukunya ${t.slice(1,5).map((x,i)=>x-t[i]).join(", ")} (naik ${s}), sehingga selisih berikutnya ${ans-last} dan suku berikutnya ${last} + ${ans-last} = ${ans}.`);
  },
  () => { // deret geometri
    const a=R(1,5), r=R(2,3); const t=[a]; for(let i=1;i<6;i++) t.push(t[i-1]*r);
    const ans=t[5];
    return mk(`Lanjutkan deret: ${t.slice(0,5).join(", ")}, …`, ans, [t[4]+(t[4]-t[3]), ans+r, t[4]*(r+1)],
      `Setiap suku dikali ${r}: ${t[4]} × ${r} = ${ans}.`);
  },
  () => { // jabat tangan / kombinasi C(n,2)
    const n=R(5,14), ans=n*(n-1)/2;
    return mk(`Dalam sebuah pertemuan ada ${n} orang, dan setiap orang berjabat tangan tepat satu kali dengan setiap orang lainnya. Berapa total jabat tangan?`, ans, [n*(n-1), n*n, (n-1)*(n-2)/2],
      `Kombinasi C(${n},2) = ${n} × ${n-1} / 2 = ${ans}. Jabat tangan A–B sama dengan B–A, sehingga dibagi 2.`);
  },
  () => { // permutasi ketua & wakil
    const n=R(5,10), ans=n*(n-1);
    return mk(`Dari ${n} anggota tim akan dipilih seorang ketua dan seorang wakil ketua (tidak boleh rangkap). Berapa banyak susunan yang mungkin?`, ans, [ans/2, n*n, 2*n],
      `Jabatan membuat urutan penting, sehingga dipakai permutasi P(${n},2) = ${n} × ${n-1} = ${ans}.`);
  },
  () => { // caesar cipher
    const words=["DATA","KODE","LOOP","BYTE","JSON","CLOUD","LOGIKA","SERVER","PIXEL","QUERY","ARRAY","STACK"];
    const [w1,w2]=shuf(words); const k=R(1,3);
    const enc=(w,s)=>w.split("").map(ch=>String.fromCharCode((ch.charCodeAt(0)-65+s+26)%26+65)).join("");
    const ans=enc(w2,k);
    return mk(`Jika ${w1} dikodekan menjadi ${enc(w1,k)}, maka ${w2} dikodekan menjadi…`, ans, [enc(w2,k+1), enc(w2,-k), ans.split("").reverse().join("")],
      `Setiap huruf digeser +${k} pada alfabet (misalnya ${w1[0]} → ${enc(w1[0],k)}). Dengan aturan yang sama, ${w2} menjadi ${ans}.`);
  },
  () => { // pseudocode jumlah kelipatan
    const n=R(10,24), m=R(2,5); let tot=0, cnt=0, totLt=0;
    for(let i=1;i<=n;i++) if(i%m===0){ tot+=i; cnt++; if(i<n) totLt+=i; }
    return mk("Berapa nilai total yang ditampilkan oleh pseudocode berikut?", tot, [totLt===tot?tot+m:totLt, cnt, tot-m],
      `Yang dijumlahkan hanya kelipatan ${m} dari 1 sampai ${n} (batas <= ikut dihitung). Hasilnya ${tot}.`,
      `total ← 0\nUNTUK i ← 1 SAMPAI ${n}\n    JIKA i MOD ${m} = 0 MAKA\n        total ← total + i\nTAMPILKAN total`);
  },
  () => { // binary search langkah maksimum
    const n=pick([16,30,64,100,500,1000,2000,4096,10000,50000]); const ans=Math.ceil(Math.log2(n+1));
    return mk(`Pada daftar berisi ${n.toLocaleString("id-ID")} data yang sudah terurut, binary search membutuhkan paling banyak sekitar berapa kali perbandingan?`, ans, [Math.round(n/2), ans*2, Math.round(Math.sqrt(n))],
      `Setiap perbandingan membuang separuh data, sehingga jumlah langkahnya sekitar ⌈log₂(${n}+1)⌉ = ${ans}.`);
  },
  () => { // himpunan
    const tot=R(30,50), a=R(12,25), b=R(10,22), both=R(3,Math.min(a,b)-2); const union=a+b-both;
    if(union>tot) return GEN.logic[2]();
    const none=tot-union;
    return mk(`Dari ${tot} peserta, ${a} menguasai Python, ${b} menguasai JavaScript, dan ${both} menguasai keduanya. Berapa peserta yang tidak menguasai keduanya?`, none, [tot-a-b, tot-a-b+2*both, union],
      `Yang menguasai minimal satu bahasa = ${a} + ${b} − ${both} = ${union}. Yang tidak menguasai keduanya = ${tot} − ${union} = ${none}.`);
  }
],

/* ---------------- PEMROGRAMAN ---------------- */
prog: [
  () => { // range python
    const st=R(0,4), sp=R(2,4), en=st+sp*R(3,4)+R(0,sp-1);
    const r=(a,b,c)=>{const o=[];for(let i=a;c>0?i<b:i>b;i+=c)o.push(i);return o;};
    const ans=r(st,en,sp);
    const inc=r(st,en+1,sp);
    return mk("Apa output kode Python berikut?", fmtList(ans), [fmtList(inc.length!==ans.length?inc:ans.concat(ans[ans.length-1]+sp)), fmtList(r(st+1,en,sp)), fmtList(r(0,en,sp))],
      `range(${st}, ${en}, ${sp}) dimulai dari ${st}, bertambah ${sp}, dan berhenti sebelum ${en} (nilai stop tidak ikut).`,
      `print(list(range(${st}, ${en}, ${sp})))`);
  },
  () => { // floor division & modulo python (termasuk negatif)
    const a=pick([R(11,40), -R(7,29)]), b=R(3,7);
    const fd=Math.floor(a/b), md=((a%b)+b)%b, td=Math.trunc(a/b), jm=a%b;
    return mk("Apa output kode Python berikut?", `${fd} ${md}`, [`${td} ${jm}`, `${td} ${md}`, `${fd} ${jm}`, `${(a/b).toFixed(1)} ${md}`],
      `Di Python, // membulatkan ke bawah (ke arah minus tak hingga): ${a} // ${b} = ${fd}. Hasil % mengikuti tanda pembagi: ${a} % ${b} = ${md}.${a<0?" Untuk bilangan negatif hasilnya berbeda dari JavaScript.":""}`,
      `print(${a} // ${b}, ${a} % ${b})`);
  },
  () => { // loop continue JS
    const n=R(6,12), k=R(2,4); let s=0, all=0, mul=0;
    for(let i=1;i<=n;i++){ all+=i; if(i%k===0){mul+=i;continue;} s+=i; }
    return mk("Apa output kode JavaScript berikut?", s, [all, mul, s-(n%k?n:0)||s+1],
      `continue melewati bilangan kelipatan ${k}. Total 1..${n} = ${all}, dikurangi kelipatan ${k} (${mul}), hasilnya ${s}.`,
      `let s = 0;\nfor (let i = 1; i <= ${n}; i++) {\n  if (i % ${k} === 0) continue;\n  s += i;\n}\nconsole.log(s);`);
  },
  () => { // koersi JS
    const x=R(2,9), y=R(2,9);
    return mk("Apa output kode JavaScript berikut?", `${x}${y} ${x-y}`, [`${x+y} ${x-y}`, `${x}${y} ${x}${y}`, `${x+y} NaN`],
      `\"${x}\" + ${y} menggabungkan string menjadi \"${x}${y}\", sedangkan operator - memaksa konversi ke angka sehingga ${x} − ${y} = ${x-y}.`,
      `console.log("${x}" + ${y}, "${x}" - ${y});`);
  },
  () => { // slicing python
    const arr=Array.from({length:6},()=>R(1,9)*10); const a=R(1,3), b=R(a+2,5);
    const ans=arr.slice(a,b);
    return mk("Apa output kode Python berikut?", fmtList(ans), [fmtList(arr.slice(a,b+1)), fmtList(arr.slice(a-1,b)), fmtList(arr.slice(a+1,b+1))],
      `Slicing [${a}:${b}] mengambil indeks ${a} sampai ${b-1}. Indeks ${b} tidak ikut, dan indeks dimulai dari 0.`,
      `x = ${fmtList(arr)}\nprint(x[${a}:${b}])`);
  },
  () => { // while doubling
    const n=R(10,300); let x=1,c=0; while(x<n){x*=2;c++;}
    return mk("Apa output kode Python berikut?", c, [c+1, c-1, Math.round(n/2)],
      `x berlipat dua sampai tidak lagi < ${n}: 1 → ${Array.from({length:c},(_,i)=>2**(i+1)).join(" → ")}. Loop berjalan ${c} kali.`,
      `x, c = 1, 0\nwhile x < ${n}:\n    x *= 2\n    c += 1\nprint(c)`);
  },
  () => { // referensi list python
    const a=R(1,5), b=R(6,9);
    return mk("Apa output kode Python berikut?", `[${a}, ${b}] [${a}, ${b}]`, [`[${a}] [${a}, ${b}]`, `[${a}, ${b}] [${a}]`, `[${a}] [${b}]`],
      "b = a tidak menyalin list, sehingga a dan b menunjuk objek yang sama. append lewat b terlihat juga lewat a.",
      `a = [${a}]\nb = a\nb.append(${b})\nprint(a, b)`);
  }
],

/* ---------------- DATA & SISTEM ---------------- */
data: [
  () => { // biner -> desimal
    const n=R(9,120), b=n.toString(2); const rev=parseInt(b.split("").reverse().join(""),2);
    return mk(`Bilangan biner ${b} sama dengan berapa dalam desimal?`, n, [n+1, n-1, rev!==n?rev:n+2],
      `Jumlahkan pangkat 2 untuk setiap bit bernilai 1: ${b.split("").map((d,i)=>d==="1"?2**(b.length-1-i):null).filter(x=>x!==null).join(" + ")} = ${n}.`);
  },
  () => { // desimal -> biner
    const n=R(9,63), b=n.toString(2);
    return mk(`Bilangan desimal ${n} sama dengan berapa dalam biner?`, b, [(n+1).toString(2), (n-1).toString(2), b.split("").reverse().join("")!==b?b.split("").reverse().join(""):(n+2).toString(2)],
      `Bagi 2 berulang lalu baca sisanya dari bawah, atau cari pangkat 2: ${n} = ${b.split("").map((d,i)=>d==="1"?2**(b.length-1-i):null).filter(x=>x!==null).join(" + ")} → ${b}₂.`);
  },
  () => { // hex -> desimal
    const n=R(26,255), h=n.toString(16).toUpperCase(); const hi=Math.floor(n/16), lo=n%16;
    return mk(`Bilangan heksadesimal ${h} sama dengan berapa dalam desimal?`, n, [hi*10+lo, n+16, n-1],
      `${h} = ${hi} × 16 + ${lo} = ${n}. (A=10, B=11, … F=15.)`);
  },
  () => { // CIDR
    const p=R(24,29), total=2**(32-p), ans=total-2;
    return mk(`Berapa jumlah alamat host yang dapat dipakai pada jaringan 10.0.0.0/${p}?`, ans, [total, total-1, total/2],
      `/${p} menyisakan ${32-p} bit host = 2^${32-p} = ${total} alamat, dikurangi alamat network dan broadcast = ${ans}.`);
  },
  () => { // FCFS avg waiting
    const b=[R(2,9),R(1,6),R(1,8)]; const w=[0,b[0],b[0]+b[1]];
    const avg=(w[0]+w[1]+w[2])/3; const s=[...b].sort((x,y)=>x-y); const sjf=(0+s[0]+s[0]+s[1])/3;
    const ta=(b[0]+(b[0]+b[1])+(b[0]+b[1]+b[2]))/3;
    const f=v=>(Math.round(v*100)/100).toString().replace(".",",");
    return mk(`Tiga proses tiba bersamaan dengan burst time P1 = ${b[0]}, P2 = ${b[1]}, P3 = ${b[2]}. Dengan penjadwalan FCFS (urutan P1, P2, P3), berapa rata-rata waktu tunggunya?`, f(avg), [f(sjf), f(ta), f(avg+1)],
      `Waktu tunggu P1 = 0, P2 = ${w[1]}, P3 = ${w[2]}. Rata-rata = (0 + ${w[1]} + ${w[2]}) / 3 = ${f(avg)}.`);
  },
  () => { // SQL COUNT WHERE
    const names=shuf(["Buku","Pena","Tas","Map","Spidol","Penggaris","Kertas","Tinta"]).slice(0,6);
    const harga=names.map(()=>R(1,20)*1000); const X=pick(harga);
    const gt=harga.filter(h=>h>X).length, ge=harga.filter(h=>h>=X).length, lt=harga.filter(h=>h<X).length;
    const rows=names.map((n,i)=>`| ${n.padEnd(10)}| ${String(harga[i]).padStart(6)} |`).join("\n");
    return mk("Berapa hasil query berikut terhadap tabel produk di atas?", gt, [ge, lt, harga.length],
      `Hanya baris dengan harga lebih besar dari ${X} (tidak termasuk ${X} sendiri) yang dihitung: ${gt} baris.`,
      `-- tabel produk\n| nama      |  harga |\n${rows}\n\nSELECT COUNT(*) FROM produk WHERE harga > ${X};`);
  },
  () => { // SQL GROUP BY HAVING
    const kota=["Bogor","Depok","Bandung","Malang"]; const cnt=kota.map(()=>R(1,7)); const th=R(2,5);
    const ok=kota.filter((_,i)=>cnt[i]>th);
    const ans=ok.length?ok.join(", "):"(tidak ada baris)";
    const ge=kota.filter((_,i)=>cnt[i]>=th).join(", ")||"(tidak ada baris)";
    return mk(`Tabel pelanggan berisi jumlah pelanggan per kota: ${kota.map((k,i)=>k+" "+cnt[i]).join(", ")}. Kota apa saja yang dihasilkan query berikut?`, ans, [ge, kota.join(", "), kota.filter((_,i)=>cnt[i]<=th).join(", ")||"(tidak ada baris)"],
      `HAVING menyaring kelompok setelah GROUP BY. Yang lolos hanya kota dengan jumlah pelanggan > ${th}: ${ans}.`,
      `SELECT kota, COUNT(*)\nFROM pelanggan\nGROUP BY kota\nHAVING COUNT(*) > ${th};`);
  }
],

/* ---------------- FRONTEND ---------------- */
fe: [
  () => { // box model content-box
    const w=R(10,30)*10, p=R(1,4)*5, b=R(1,5), m=R(1,4)*5; const ans=w+2*p+2*b;
    return mk("Dengan box-sizing default (content-box), berapa lebar elemen yang tampak di layar (tanpa margin)?", ans+"px", [w+"px", (w+2*p)+"px", (ans+2*m)+"px"],
      `content-box: width hanya untuk konten. Lebar tampak = ${w} + 2×${p} (padding) + 2×${b} (border) = ${ans}px. Margin berada di luar kotak.`,
      `.kotak {\n  width: ${w}px;\n  padding: ${p}px;\n  border: ${b}px solid #333;\n  margin: ${m}px;\n}`);
  },
  () => { // border-box
    const w=R(15,30)*10, p=R(1,4)*5, b=R(1,5); const ans=w-2*p-2*b;
    return mk("Berapa lebar area konten (content) elemen berikut?", ans+"px", [w+"px", (w-2*p)+"px", (w+2*p+2*b)+"px"],
      `border-box: width ${w}px sudah termasuk padding dan border, sehingga konten = ${w} − 2×${p} − 2×${b} = ${ans}px.`,
      `.kotak {\n  box-sizing: border-box;\n  width: ${w}px;\n  padding: ${p}px;\n  border: ${b}px solid #333;\n}`);
  },
  () => { // event loop
    const L=shuf(["A","B","C","D","E","F","G"]).slice(0,4); const [s1,to,pr,s2]=L;
    return mk("Apa urutan output kode JavaScript berikut?", `${s1} ${s2} ${pr} ${to}`, [`${s1} ${to} ${pr} ${s2}`, `${s1} ${s2} ${to} ${pr}`, `${s1} ${pr} ${s2} ${to}`],
      `Kode sinkron dijalankan dulu (${s1}, ${s2}), lalu microtask Promise (${pr}), baru macrotask setTimeout (${to}), walaupun delay-nya 0.`,
      `console.log("${s1}");\nsetTimeout(() => console.log("${to}"), 0);\nPromise.resolve().then(() => console.log("${pr}"));\nconsole.log("${s2}");`);
  },
  () => { // specificity
    const i=R(0,1), c=R(0,3), t=R(1,3);
    const ids=["#menu","#utama"].slice(0,i), cls=[".kartu",".aktif",":hover","[type=\"text\"]"].slice(0,c), tags=["nav","ul","li","a"].slice(0,t);
    let sel=[...ids, ...tags.map((tg,k)=>tg+(cls[k]||"")), ...cls.slice(tags.length)].join(" ");
    return mk(`Berapa specificity selector CSS berikut, dalam format (ID, class/atribut/pseudo-class, tag)?`, `(${i}, ${c}, ${t})`, [`(${i}, ${t}, ${c})`, `(${i+1}, ${c}, ${t})`, `(0, ${i+c}, ${t})`],
      `Hitung: ${i} ID, ${c} class/atribut/pseudo-class, dan ${t} tag, sehingga (${i}, ${c}, ${t}).`,
      sel + " { color: red; }");
  },
  () => { // grid column width
    const n=R(2,4), g=pick([10,16,20,24]); const col=R(10,30)*10; const W=col*n+g*(n-1);
    return mk(`Container selebar ${W}px memakai grid-template-columns: repeat(${n}, 1fr) dan gap: ${g}px. Berapa lebar setiap kolom?`, col+"px", [Math.round(W/n)+"px", Math.round((W-g*n)/n)+"px", (col+g)+"px"],
      `Ruang untuk kolom = ${W} − ${n-1}×${g} (gap) = ${W-g*(n-1)}px, dibagi ${n} kolom = ${col}px.`);
  },
  () => { // ?? vs ||
    const v=pick(["0","\"\"","false","null","undefined"]);
    const nullish = v==="null"||v==="undefined";
    const or = "\"default\"", nc = nullish ? "\"default\"" : v;
    const show=s=>s==='""'?'"" (string kosong)':s;
    return mk("Apa nilai a dan b setelah kode JavaScript berikut dijalankan?", `a = ${show(or)}, b = ${show(nc)}`, [`a = ${show(v)}, b = ${show(or)}`, `a = ${show(v)}, b = ${show(v)}`, `a = ${show(or)}, b = ${show(nullish?v:or)}`],
      `|| mengganti semua nilai falsy (termasuk ${v}). ?? hanya mengganti null atau undefined${nullish?", dan "+v+" termasuk di dalamnya":", sehingga "+v+" tetap dipertahankan"}.`,
      `const x = ${v};\nconst a = x || "default";\nconst b = x ?? "default";`);
  }
],

/* ---------------- BACKEND ---------------- */
be: [
  () => { // skenario status code
    const S=[
      ["Login berhasil tetapi pengguna biasa mencoba membuka endpoint khusus admin.","403 Forbidden",["401 Unauthorized","404 Not Found","400 Bad Request"]],
      ["Request ke endpoint yang butuh login dikirim tanpa token.","401 Unauthorized",["403 Forbidden","400 Bad Request","500 Internal Server Error"]],
      ["POST /api/produk berhasil membuat produk baru.","201 Created",["200 OK","204 No Content","202 Accepted"]],
      ["DELETE /api/produk/9 berhasil dan server tidak mengirim body.","204 No Content",["200 OK","404 Not Found","201 Created"]],
      ["GET /api/produk/999 dan produk dengan id 999 tidak ada.","404 Not Found",["400 Bad Request","204 No Content","500 Internal Server Error"]],
      ["Body request berisi harga bernilai negatif sehingga gagal validasi.","400 Bad Request",["500 Internal Server Error","409 Conflict","403 Forbidden"]],
      ["Klien mengirim 500 request dalam satu menit, melebihi batas 100 request/menit.","429 Too Many Requests",["503 Service Unavailable","403 Forbidden","400 Bad Request"]],
      ["Terjadi exception yang tidak tertangani di kode server.","500 Internal Server Error",["503 Service Unavailable","400 Bad Request","502 Bad Gateway"]],
      ["Mendaftar dengan username yang sudah dipakai orang lain.","409 Conflict",["400 Bad Request","403 Forbidden","200 OK"]],
      ["Halaman dipindahkan secara permanen ke URL baru.","301 Moved Permanently",["302 Found","404 Not Found","307 Temporary Redirect"]],
      ["Browser meminta file yang belum berubah sejak terakhir di-cache (ETag cocok).","304 Not Modified",["200 OK","301 Moved Permanently","204 No Content"]],
      ["Server sedang maintenance terjadwal.","503 Service Unavailable",["500 Internal Server Error","404 Not Found","502 Bad Gateway"]],
      ["Klien mengirim DELETE ke endpoint yang hanya mendukung GET dan POST.","405 Method Not Allowed",["403 Forbidden","400 Bad Request","404 Not Found"]]
    ];
    const [sc,ans,w]=pick(S);
    return mk(`Kode status HTTP yang paling tepat untuk situasi berikut: ${sc}`, ans, w,
      `Jawaban yang tepat adalah ${ans}. Ingat: 401 = belum terautentikasi, 403 = tidak berhak, 4xx = kesalahan klien, 5xx = kesalahan server.`);
  },
  () => { // pagination offset
    const L=pick([10,20,25,50]), p=R(2,9), ans=(p-1)*L;
    return mk(`API menerima ?page=${p}&limit=${L}, dengan halaman pertama adalah page=1. Berapa nilai OFFSET pada query SQL-nya?`, ans, [p*L, ans+1, p+L],
      `OFFSET = (page − 1) × limit = (${p} − 1) × ${L} = ${ans}. Query-nya: LIMIT ${L} OFFSET ${ans}.`);
  },
  () => { // jumlah halaman
    const T=R(45,480), L=pick([10,20,25,50]), ans=Math.ceil(T/L);
    return mk(`Sebuah endpoint punya ${T} data dan mengembalikan ${L} data per halaman. Berapa total halaman yang dibutuhkan?`, ans, [Math.floor(T/L)===ans?ans+1:Math.floor(T/L), ans+1, Math.round(T/L/2)],
      `⌈${T} / ${L}⌉ = ${ans}. Halaman terakhir berisi sisa ${T - (ans-1)*L} data.`);
  },
  () => { // rate limit
    const Lm=pick([60,100,120]), N=Lm+R(10,90), ans=N-Lm;
    return mk(`Rate limit API adalah ${Lm} request per menit per klien. Dalam satu menit sebuah klien mengirim ${N} request. Berapa request yang mendapat respons 429 Too Many Requests?`, ans, [N, Lm, ans+1],
      `${Lm} request pertama dilayani; sisanya, ${N} − ${Lm} = ${ans}, ditolak dengan status 429.`);
  },
  () => { // cache hit ratio
    const h=R(60,950), m=R(20,300); const ans=Math.round(h/(h+m)*100);
    return mk(`Dalam satu jam, cache Redis melayani ${h} cache hit dan ${m} cache miss. Berapa persen cache hit ratio-nya (dibulatkan)?`, ans+"%", [Math.round(m/(h+m)*100)+"%", Math.round(h/m*100)+"%", (ans+5)+"%"],
      `Hit ratio = hit / (hit + miss) = ${h} / ${h+m} ≈ ${ans}%. Setiap cache miss berarti data harus diambil dari database.`);
  },
  () => { // idempotensi
    const n=R(2,5);
    const S=[
      [`Klien mengirim request POST /api/pesanan yang sama sebanyak ${n} kali karena tombol diklik berulang. Tanpa pengaman tambahan, berapa pesanan yang mungkin tercipta?`, String(n), ["1","0",String(n+1)], `POST tidak idempotent: setiap request bisa membuat resource baru, sehingga bisa tercipta ${n} pesanan. Solusinya memakai idempotency key atau menonaktifkan tombol setelah diklik.`],
      [`Klien mengirim DELETE /api/pesanan/7 sebanyak ${n} kali. Bagaimana keadaan akhir resource di server?`, "Pesanan 7 terhapus, sama seperti jika DELETE dikirim sekali", [`${n} pesanan ikut terhapus`, "Server error", "Pesanan 7 dibuat ulang"], "DELETE bersifat idempotent: hasil akhir di server sama walau diulang. Request berikutnya mungkin mendapat 404, tetapi keadaan datanya tidak berubah."],
      [`Klien mengirim PUT /api/profil/3 dengan body yang sama sebanyak ${n} kali. Bagaimana hasil akhirnya?`, "Profil 3 berisi data yang sama seperti setelah PUT pertama", [`Tercipta ${n} profil baru`, "Profil 3 terhapus", `Data diulang ${n} kali dalam profil`], "PUT idempotent: mengganti resource dengan representasi yang sama berkali-kali menghasilkan keadaan yang sama."]
    ];
    const [q,ans,w,e]=pick(S);
    return mk(q, ans, w, e);
  }
]
};
})();
