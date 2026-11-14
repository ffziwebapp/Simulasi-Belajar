/* =========================================================
   Belajar & Simulasi Tes Pijak 2027 — aplikasi statis (SPA)
   Routing memakai hash: #beranda #modul #modul-<id> #simulasi #jadwal #sumber
   ========================================================= */
(function(){
"use strict";

const $view = document.getElementById("view");
const esc = s => String(s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const shuffle = a => {a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a};
const fmt = s => {s=Math.max(0,Math.ceil(s));return String(Math.floor(s/60)).padStart(2,"0")+":"+String(s%60).padStart(2,"0")};

/* ---------- penyimpanan lokal (aman bila diblokir) ---------- */
const mem = {};
const store = {
  get(k,d){try{const v=localStorage.getItem("pjk_"+k);return v===null?(k in mem?mem[k]:d):JSON.parse(v)}catch(e){return k in mem?mem[k]:d}},
  set(k,v){mem[k]=v;try{localStorage.setItem("pjk_"+k,JSON.stringify(v))}catch(e){}}
};

/* ---------- markdown ---------- */
if(window.marked){ marked.setOptions({gfm:true,breaks:false}); }
function md(src){ return window.marked ? marked.parse(src) : "<pre>"+esc(src)+"</pre>"; }
function mdInline(src){ return window.marked ? marked.parseInline(src) : esc(src); }
function slug(t){ return t.toLowerCase().replace(/<[^>]+>/g,"").replace(/[^a-z0-9\s-]/g,"").trim().replace(/\s+/g,"-").slice(0,60); }
function enhanceProse(root){
  // bungkus tabel agar bisa digulir di HP
  root.querySelectorAll("table").forEach(t=>{ const w=document.createElement("div"); w.className="tbl"; t.parentNode.insertBefore(w,t); w.appendChild(t); });
  // kotak berwarna dari blockquote berawalan kata kunci
  const map = {"teori":"teori","tips":"tips","awas":"awas","jebakan":"awas","ingat":"ingat","penting":"ingat","contoh":"contoh"};
  root.querySelectorAll("blockquote").forEach(b=>{
    const s=b.querySelector("strong"); if(!s) return;
    const k=s.textContent.toLowerCase().split(/[\s:]/)[0];
    if(map[k]) b.classList.add(map[k]);
  });
  // id untuk heading
  const used={};
  root.querySelectorAll("h2,h3").forEach(h=>{ let id=slug(h.textContent)||"bag"; while(used[id]) id+="-x"; used[id]=1; h.id="s-"+id; });
  // link eksternal buka tab baru
  root.querySelectorAll("a[href^='http']").forEach(a=>{a.target="_blank";a.rel="noopener"});
}

/* ---------- router ---------- */
let S = null, timerInt = null;
function route(){
  const h = (location.hash||"#beranda").slice(1);
  if(S && S.active){ if(h!=="simulasi"){ location.hash="simulasi"; return; } renderExamCurrent(); return; }
  const [r, ...rest] = h.split("-");
  const param = rest.join("-");
  document.querySelectorAll("[data-r]").forEach(a=>a.classList.toggle("on", a.dataset.r===r));
  document.body.classList.remove("in-exam");
  clearInterval(timerInt);
  window.scrollTo(0,0);
  if(r==="modul" && param) return pageChapter(param);
  ({beranda:pageHome, modul:pageModul, simulasi:pageSim, jadwal:pageJadwal, sumber:pageSumber}[r] || pageHome)();
}
window.addEventListener("hashchange", route);
// klik menu yang sama dengan halaman aktif (mis. dari hasil simulasi kembali ke menu) tetap memuat ulang tampilan
document.addEventListener("click", e => {
  const a = e.target.closest("a[href^='#']");
  if(a && a.getAttribute("href") === (location.hash || "#beranda")) { e.preventDefault(); route(); }
});

/* ---------- modal ---------- */
function modal(html){ document.getElementById("modal-root").innerHTML = `<div class="modal-bg"><div class="modal">${html}</div></div>`; }
function closeModal(){ document.getElementById("modal-root").innerHTML = ""; }

/* ---------- data bantu ---------- */
const readSet = () => new Set(store.get("read",[]));
const jadwalDone = () => store.get("jadwal",{});
function totalTasks(){ let n=0; JADWAL.minggu.forEach(w=>w.hari.forEach(d=>n+=d.tugas.length)); return n; }
function chapterByBlock(k){ return MODUL.find(m=>m.blok===k); }

/* =========================================================
   BERANDA
   ========================================================= */
function pageHome(){
  const read = readSet(), done = Object.values(jadwalDone()).filter(Boolean).length, tt = totalTasks();
  const hist = store.get("hist",[]);
  const last = hist[0];
  $view.innerHTML = `
  <section class="hero">
    <span class="tag">Persiapan Tes Seleksi</span>
    <h1>Pijak 2027 in collaboration with IBM SkillsBuild</h1>
    <p>Pelajari materi lengkap untuk kelima section Technical Assessment dan Traits Assessment, ikuti jadwal belajar 4 minggu, lalu uji diri dengan simulasi tes 70 menit yang memakai blok waktu terkunci.</p>
    <div class="row"><a class="btn" href="#modul">Mulai belajar</a><a class="btn ghost" href="#simulasi">Coba simulasi</a></div>
  </section>

  <div class="grid g3 mt">
    <div class="card stat"><b>${read.size}/${MODUL.length}</b><span>Bab modul selesai dibaca</span><div class="bar mt"><div style="width:${read.size/MODUL.length*100}%"></div></div></div>
    <div class="card stat"><b>${done}/${tt}</b><span>Tugas jadwal belajar selesai</span><div class="bar mt"><div style="width:${tt?done/tt*100:0}%"></div></div></div>
    <div class="card stat"><b>${last?esc(last.score):"–"}</b><span>${last?"Simulasi terakhir · "+esc(last.date):"Belum ada simulasi"}</span></div>
  </div>

  <div class="grid g4 mt">
    ${tile("#modul","Modul Materi",`${MODUL.length} bab dengan teori, contoh, dan pembahasan`,"var(--teal-l)","var(--teal-d)",'<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20V3H6.5A2.5 2.5 0 0 0 4 5.5z"/>')}
    ${tile("#simulasi","Simulasi Tes","6 blok · 70 menit · blok terkunci","var(--blue-l)","var(--blue)",'<circle cx="12" cy="13" r="8"/><path d="M12 9v4l2.5 2.5"/>')}
    ${tile("#jadwal","Jadwal Belajar","Rencana 28 hari dengan checklist","var(--purple-l)","var(--purple)",'<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M3 10h18"/>')}
    ${tile("#sumber","Sumber Tambahan","Kursus, dokumentasi, dan latihan gratis","var(--amber-l)","#8a5a00",'<path d="M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.7 1.7"/>')}
  </div>

  <div class="grid g2 mt">
    <div class="card">
      <span class="tag">Struktur tes</span>
      <h3 style="margin:0 0 10px">Blok waktu terkunci, total 70 menit</h3>
      <div class="scroll-x"><table class="t">
        <thead><tr><th>Section</th><th>Blok</th><th>Durasi/blok</th><th>Total</th></tr></thead>
        <tbody>
          <tr><td>Technical Assessment</td><td>5</td><td>10 menit</td><td>50 menit</td></tr>
          <tr><td>Traits Assessment</td><td>1</td><td>20 menit</td><td>20 menit</td></tr>
          <tr><td><b>Total</b></td><td><b>6</b></td><td></td><td><b>70 menit</b></td></tr>
        </tbody></table></div>
      <p class="muted small mt mb0">Setiap blok berjalan sendiri dan tidak bisa dibuka lagi setelah waktunya habis. Sisa waktu satu blok tidak pindah ke blok berikutnya.</p>
    </div>
    <div class="card">
      <span class="tag blue">Tentang program</span>
      <h3 style="margin:0 0 10px">Apa itu Pijak?</h3>
      <p class="small muted">Pijak adalah program kolaborasi IBM Indonesia (melalui IBM SkillsBuild) dan Dicoding Indonesia untuk memperluas akses pendidikan teknologi dan AI. Pada Pijak 2026, lebih dari 20.000 peserta mendapat akses materi SkillsBuild, lalu lebih dari 600 peserta terbaik masuk tahap pembelajaran intensif berbasis proyek dengan pendampingan praktisi.</p>
      <p class="small muted mb0">Tes seleksi ini kemungkinan besar menentukan siapa yang masuk tahap lanjutan. Selain itu, selesaikan juga kelas IBM SkillsBuild yang diwajibkan di dashboard pendaftaranmu.</p>
    </div>
  </div>
  <p class="notice mt">Situs ini adalah bahan belajar <b>tidak resmi</b>. Soal simulasi dibuat sendiri berdasarkan nama section dari modul Kode Etik, bukan soal asli tes. Informasi resmi selalu ada di dashboard Dicoding dan email program.</p>`;
}
function tile(href,t,d,bg,fg,path){
  return `<a class="tile" href="${href}"><div class="ic" style="background:${bg};color:${fg}"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${path}</svg></div><b>${t}</b><span>${d}</span></a>`;
}

/* =========================================================
   MODUL
   ========================================================= */
function pageModul(){
  const read = readSet();
  $view.innerHTML = `
  <h1 class="h-page">Modul Materi</h1>
  <p class="muted">Bacalah berurutan. Setiap bab berisi teori, contoh, jebakan yang sering keluar, dan latihan soal dengan pembahasan. Di akhir bab ada tombol untuk langsung berlatih di blok simulasi yang sesuai.</p>
  <div class="grid mt" style="gap:10px">
    ${MODUL.map((m,i)=>`<a class="ch ${read.has(m.id)?"done":""}" href="#modul-${m.id}">
      <div class="no">${read.has(m.id)?"✓":esc(m.no)}</div>
      <div><b>${esc(m.judul)}</b><p>${esc(m.ringkas)}</p><small>± ${m.menit} menit baca${m.blok?" · ada latihan blok":""}</small></div>
    </a>`).join("")}
  </div>`;
}

function pageChapter(id){
  const i = MODUL.findIndex(m=>m.id===id);
  if(i<0) return pageModul();
  document.querySelectorAll("[data-r]").forEach(a=>a.classList.toggle("on", a.dataset.r==="modul"));
  const m = MODUL[i], prev = MODUL[i-1], next = MODUL[i+1];
  const isRead = readSet().has(m.id);
  const blockIdx = m.blok ? PLAN.findIndex(p=>p.key===m.blok) : -1;
  $view.innerHTML = `
  <div class="reader">
    <aside class="toc card" id="toc"></aside>
    <article>
      <div class="chap-head">
        <a href="#modul" class="small" style="text-decoration:none">← Semua bab</a>
        <div class="mt"><span class="tag">Bab ${esc(m.no)}</span></div>
        <h1 class="h-page">${esc(m.judul)}</h1>
        <p class="muted mb0">${esc(m.ringkas)} · ± ${m.menit} menit baca</p>
      </div>
      <details class="toc-m card" id="tocm"><summary>Daftar isi bab</summary><div id="tocm-in" class="mt"></div></details>
      <div class="prose card mt" id="prose">${md(m.md)}</div>
      <div class="chap-foot">
        <div class="row">
          <button class="btn ${isRead?"ghost":""}" id="markRead">${isRead?"✓ Sudah dibaca":"Tandai selesai dibaca"}</button>
          ${blockIdx>=0?`<button class="btn navy" id="practice">Latihan blok ${esc(m.no)} (${PLAN[blockIdx].min} menit)</button>`:""}
        </div>
        <div class="row between mt">
          ${prev?`<a class="btn ghost sm" href="#modul-${prev.id}">← ${esc(prev.no)} ${esc(short(prev.judul))}</a>`:"<span></span>"}
          ${next?`<a class="btn ghost sm" href="#modul-${next.id}">${esc(next.no)} ${esc(short(next.judul))} →</a>`:`<a class="btn ghost sm" href="#jadwal">Lihat jadwal belajar →</a>`}
        </div>
      </div>
    </article>
  </div>`;
  const prose = document.getElementById("prose");
  enhanceProse(prose);
  const heads = [...prose.querySelectorAll("h2,h3")];
  const links = heads.map(h=>`<a href="javascript:void 0" data-to="${h.id}" class="${h.tagName==="H3"?"l3":""}">${esc(h.textContent)}</a>`).join("");
  document.getElementById("toc").innerHTML = `<div class="small" style="font-weight:700;margin:0 8px 6px">Isi bab</div>${links}`;
  document.getElementById("tocm-in").innerHTML = links;
  $view.querySelectorAll("[data-to]").forEach(a=>a.addEventListener("click",()=>{
    const el=document.getElementById(a.dataset.to); if(el) el.scrollIntoView({behavior:"smooth",block:"start"});
    const d=document.getElementById("tocm"); if(d) d.open=false;
  }));
  document.getElementById("markRead").onclick = ()=>{
    const s = readSet(); s.has(m.id)? s.delete(m.id): s.add(m.id); store.set("read",[...s]);
    const b=document.getElementById("markRead"); const on=s.has(m.id);
    b.textContent = on?"✓ Sudah dibaca":"Tandai selesai dibaca"; b.classList.toggle("ghost",on);
  };
  const pb = document.getElementById("practice");
  if(pb) pb.onclick = ()=>{ location.hash="simulasi"; setTimeout(()=>startSingle(blockIdx),0); };
}
const short = t => t.length>26? t.slice(0,24)+"…" : t;

/* =========================================================
   JADWAL
   ========================================================= */
function pageJadwal(){
  const done = jadwalDone(), tt = totalTasks();
  const n = Object.values(done).filter(Boolean).length;
  $view.innerHTML = `
  <h1 class="h-page">Jadwal Belajar 28 Hari</h1>
  <p class="muted">${esc(JADWAL.intro)}</p>
  <div class="card mt">
    <div class="row between"><b>Progres</b><span class="small muted">${n}/${tt} tugas</span></div>
    <div class="bar mt"><div style="width:${tt?n/tt*100:0}%"></div></div>
    <div class="row mt"><label class="small row" style="gap:6px"><span class="muted">Tanggal mulai:</span><input type="date" id="startDate" value="${esc(store.get("start",""))}" style="font:inherit;padding:6px 8px;border:1px solid var(--line);border-radius:8px"></label>
    <button class="btn ghost sm" id="resetJ">Atur ulang checklist</button></div>
  </div>
  <details class="card mt"><summary style="cursor:pointer;font-weight:700">Cara belajar yang efektif (dasar teori)</summary><div class="prose mt" id="teknik">${md(JADWAL.teknik)}</div></details>
  <div class="mt2" id="weeks">
    ${JADWAL.minggu.map((w,wi)=>{
      const wt = w.hari.reduce((a,d)=>a+d.tugas.length,0);
      const wd = w.hari.reduce((a,d,di)=>a+d.tugas.filter((_,ti)=>done[key(wi,di,ti)]).length,0);
      return `<details class="week" ${wd<wt&&wi===firstOpenWeek(done)?"open":""}>
        <summary><div><b>Minggu ${wi+1}: ${esc(w.judul)}</b><div class="small muted">${esc(w.tujuan)}</div></div><span class="pill ${wd===wt?"ok":"skip"}">${wd}/${wt}</span></summary>
        <div class="days">${w.hari.map((d,di)=>`<div class="day">
          <div class="day-h"><b>Hari ${wi*7+di+1}${dateOf(wi*7+di)}</b><span class="pill">${esc(d.fokus)}</span>${d.durasi?`<span class="small muted">${esc(d.durasi)}</span>`:""}</div>
          ${d.tugas.map((t,ti)=>{const k=key(wi,di,ti);return `<label class="task ${done[k]?"done":""}"><input type="checkbox" data-k="${k}" ${done[k]?"checked":""}><span>${mdInline(t)}</span></label>`}).join("")}
        </div>`).join("")}</div>
      </details>`;}).join("")}
  </div>`;
  const tek=document.getElementById("teknik"); enhanceProse(tek);
  $view.querySelectorAll("input[data-k]").forEach(cb=>cb.addEventListener("change",()=>{
    const d=jadwalDone(); d[cb.dataset.k]=cb.checked; store.set("jadwal",d);
    cb.closest(".task").classList.toggle("done",cb.checked);
    const y=window.scrollY; pageJadwalRefreshCounts(); window.scrollTo(0,y);
  }));
  document.getElementById("startDate").onchange = e=>{ store.set("start",e.target.value); const y=window.scrollY; pageJadwal(); window.scrollTo(0,y); };
  document.getElementById("resetJ").onclick = ()=>{
    modal(`<h3>Atur ulang checklist?</h3><p class="muted">Semua centang pada jadwal akan dihapus.</p><div class="row" style="justify-content:flex-end"><button class="btn ghost" id="mNo">Batal</button><button class="btn red" id="mYes">Atur ulang</button></div>`);
    document.getElementById("mNo").onclick=closeModal;
    document.getElementById("mYes").onclick=()=>{store.set("jadwal",{});closeModal();pageJadwal();};
  };
}
function pageJadwalRefreshCounts(){
  const done=jadwalDone(), tt=totalTasks(), n=Object.values(done).filter(Boolean).length;
  const bar=$view.querySelector(".card .bar>div"); if(bar) bar.style.width=(n/tt*100)+"%";
  const lbl=$view.querySelector(".card .row.between .small"); if(lbl) lbl.textContent=`${n}/${tt} tugas`;
  $view.querySelectorAll(".week").forEach((w,wi)=>{
    const wk=JADWAL.minggu[wi]; const wt=wk.hari.reduce((a,d)=>a+d.tugas.length,0);
    const wd=wk.hari.reduce((a,d,di)=>a+d.tugas.filter((_,ti)=>done[key(wi,di,ti)]).length,0);
    const p=w.querySelector("summary .pill"); p.textContent=`${wd}/${wt}`; p.className="pill "+(wd===wt?"ok":"skip");
  });
}
const key=(w,d,t)=>`${w}.${d}.${t}`;
function firstOpenWeek(done){
  for(let wi=0;wi<JADWAL.minggu.length;wi++){const w=JADWAL.minggu[wi];if(w.hari.some((d,di)=>d.tugas.some((_,ti)=>!done[key(wi,di,ti)])))return wi;}
  return 0;
}
function dateOf(idx){
  const s=store.get("start",""); if(!s) return "";
  const d=new Date(s+"T00:00:00"); if(isNaN(d)) return "";
  d.setDate(d.getDate()+idx);
  return " · "+d.toLocaleDateString("id-ID",{weekday:"short",day:"numeric",month:"short"});
}

/* =========================================================
   SUMBER
   ========================================================= */
function pageSumber(){
  $view.innerHTML = `
  <h1 class="h-page">Sumber Belajar Tambahan</h1>
  <p class="muted">${esc(SUMBER.intro)}</p>
  <div class="row mt small"><span class="src-k"><span class="lv id">ID</span> Bahasa Indonesia</span><span><span class="lv en">EN</span> Bahasa Inggris</span></div>
  <div class="tabs mt" id="stabs">${SUMBER.kategori.map((k,i)=>`<button class="${i===0?"on":""}" data-i="${i}">${esc(k.nama)}</button>`).join("")}</div>
  <div id="slist"></div>`;
  const show = i => {
    document.querySelectorAll("#stabs button").forEach((b,j)=>b.classList.toggle("on",j===i));
    const k=SUMBER.kategori[i];
    document.getElementById("slist").innerHTML = `<p class="muted small">${esc(k.ket||"")}</p><div class="grid g2">${k.item.map(s=>`
      <a class="src" href="${esc(s.url)}" target="_blank" rel="noopener">
        <span class="d">${esc(new URL(s.url).hostname.replace(/^www\./,""))}</span>
        <b>${esc(s.n)}<span class="lv ${s.lang}">${s.lang.toUpperCase()}</span></b>
        <p>${esc(s.d)}</p>
      </a>`).join("")}</div>`;
  };
  document.querySelectorAll("#stabs button").forEach(b=>b.onclick=()=>show(+b.dataset.i));
  show(0);
}

/* =========================================================
   SIMULASI
   ========================================================= */
const blockName = k => k==="traits" ? "Traits Assessment" : BANK[k].name;
/* ---------- rotasi soal: yang paling lama tidak muncul diprioritaskan ---------- */
const GEN_PER_BLOCK = 3;   // jumlah soal dengan angka acak per blok teknis
function qid(text){ let h=5381; for(let i=0;i<text.length;i++) h=((h<<5)+h+text.charCodeAt(i))|0; return (h>>>0).toString(36); }
function leastSeen(items, idOf, n){
  const seen = store.get("seen",{});
  return items.map(it=>({it, s:seen[idOf(it)]||0, r:Math.random()}))
              .sort((a,b)=>a.s-b.s || a.r-b.r).slice(0,n).map(x=>x.it);
}
function markSeen(ids){
  const seen = store.get("seen",{}), t = store.get("seenT",0)+1;
  ids.forEach(id=>seen[id]=t);
  store.set("seen",seen); store.set("seenT",t);
}
const techId = q => qid(q.q + "|" + (q.code||"") + "|" + q.o.join("|"));

function buildBlock(p){
  if(p.type==="tech"){
    const b = BANK[p.key];
    const gens = (window.GEN && GEN[p.key]) || [];
    const nGen = Math.min(GEN_PER_BLOCK, gens.length);
    const fromBank = leastSeen(b.qs, techId, b.take - nGen);
    const generated = shuffle(gens).slice(0, nGen).map(g=>{ try{ return g(); }catch(e){ return null; } }).filter(Boolean);
    const extra = generated.length < nGen ? leastSeen(b.qs.filter(q=>!fromBank.includes(q)), techId, nGen-generated.length) : [];
    markSeen([...fromBank, ...extra].map(techId));
    const qs = shuffle([...fromBank, ...extra, ...generated]).map(q=>({...q, order:shuffle(q.o.map((_,i)=>i)), ans:null, flag:false}));
    return {...p, name:b.name, qs};
  }
  // traits: 5 butir per dimensi (minimal 1 positif & 1 terbalik) + 1 soal situasional per dimensi
  const lid = x => "L" + qid(x[0]), sid = x => "S" + qid(x.q);
  const lk = [];
  Object.keys(DIMS).forEach(d=>{
    const pool = LIKERT.filter(x=>x[1]===d);
    const pos = leastSeen(pool.filter(x=>!x[2]), lid, 1), neg = leastSeen(pool.filter(x=>x[2]), lid, 1);
    const rest = leastSeen(pool.filter(x=>!pos.includes(x)&&!neg.includes(x)), lid, 3);
    lk.push(...pos, ...neg, ...rest);
  });
  const sj = Object.keys(DIMS).map(d=>leastSeen(SJT.filter(x=>x.d===d), sid, 1)[0]).filter(Boolean);
  markSeen([...lk.map(lid), ...sj.map(sid)]);
  return {...p, name:"Traits Assessment", qs:[
    ...shuffle(lk).map(([t,d,r])=>({kind:"likert",q:t,d,r,ans:null,flag:false})),
    ...shuffle(sj).map(x=>({kind:"sjt",...x,order:shuffle(x.o.map((_,i)=>i)),ans:null,flag:false}))
  ]};
}

function pageSim(){
  S = null;
  const hist = store.get("hist",[]);
  $view.innerHTML = `
  <h1 class="h-page">Simulasi Tes Seleksi</h1>
  <p class="muted">Formatnya mengikuti modul Kode Etik: 6 blok dengan total 70 menit. Setiap blok berjalan sendiri. Begitu waktunya habis atau kamu menekan <b>Selesai Blok</b>, blok itu tertutup dan sisa waktunya hangus.</p>
  <div class="grid g2 mt">
    <button class="mode" id="full"><span class="tag">Disarankan</span><b>Simulasi Penuh · 70 menit</b><span class="muted small">Keenam blok berurutan, waktu berjalan, blok terkunci. Hasil dan pembahasan lengkap ditampilkan di akhir.</span></button>
    <div class="mode" style="cursor:default"><b>Latihan per Blok</b><span class="muted small">Pilih satu blok untuk dilatih. Timer tetap berjalan.</span>
      <div class="blocklist">${PLAN.map((p,i)=>`<button class="blk" data-i="${i}"><b>${esc(blockName(p.key))}</b><small>${p.min} menit · ${p.type==="tech"?BANK[p.key].take+" soal dari "+BANK[p.key].qs.length+" + soal angka acak":"36 butir dari "+(LIKERT.length+SJT.length)}</small></button>`).join("")}</div>
    </div>
  </div>
  <div class="grid g2 mt">
    <div class="card"><h3 style="margin:0 0 8px">Aturan selama simulasi</h3>
      <ul class="rules muted small">
        <li>Kerjakan sendiri tanpa membuka sumber lain, persis seperti tes asli.</li>
        <li>Simulasi menghitung berapa kali kamu meninggalkan tab atau aplikasi.</li>
        <li>Di dalam satu blok kamu bebas berpindah soal dan menandai soal yang ragu.</li>
        <li>Traits Assessment tidak punya jawaban benar atau salah. Jawablah dengan jujur.</li>
        <li>Di laptop: tombol panah untuk pindah soal, angka 1–5 untuk memilih jawaban.</li>
      </ul></div>
    <div class="card"><h3 style="margin:0 0 8px">Riwayat di perangkat ini</h3>
      ${hist.length?`<div class="hist">${hist.map(h=>`<div><span>${esc(h.date)} · ${esc(h.label)}</span><b>${esc(h.score)}</b></div>`).join("")}</div>`:`<p class="muted small mb0">Belum ada simulasi.</p>`}
    </div>
  </div>
  <p class="notice mt">Soal latihan dibuat sendiri berdasarkan nama-nama section resmi, <b>bukan</b> soal asli tes Pijak.</p>`;
  document.getElementById("full").onclick = startFull;
  $view.querySelectorAll(".blk").forEach(b=>b.onclick=()=>startSingle(+b.dataset.i));
}

function startFull(){ S = {mode:"full", blocks:PLAN.map(buildBlock), bi:0, qi:0, tabOut:0, active:true, phase:"intro"}; renderExamCurrent(); }
function startSingle(i){ S = {mode:"single", blocks:[buildBlock(PLAN[i])], bi:0, qi:0, tabOut:0, active:true, phase:"intro"}; renderExamCurrent(); }

function renderExamCurrent(){
  document.body.classList.add("in-exam");
  document.querySelectorAll("[data-r]").forEach(a=>a.classList.toggle("on", a.dataset.r==="simulasi"));
  if(S.phase==="intro") intro(); else renderQ();
}

function intro(){
  clearInterval(timerInt);
  S.phase="intro";
  const b = S.blocks[S.bi], total = S.blocks.length;
  const ch = chapterByBlock(b.key);
  $view.innerHTML = `
  <div style="max-width:620px;margin:0 auto">
    <div class="card center">
      <div class="small muted">${S.mode==="full"?"Simulasi Penuh":"Latihan per Blok"} · Blok ${S.bi+1} dari ${total}</div>
      <div class="mt"><span class="tag">${b.type==="tech"?"Technical Assessment":"Traits Assessment"}${ch?" · "+esc(ch.no):""}</span></div>
      <h2 style="margin:4px 0 8px">${esc(b.name)}</h2>
      <p class="muted">${b.qs.length} ${b.type==="tech"?"soal pilihan ganda":"pernyataan (30 skala Likert + 6 situasional)"} · <b>${b.min} menit</b></p>
      ${b.type==="traits"?`<p class="muted small">Tidak ada jawaban benar atau salah. Tes kepribadian biasanya memasang pernyataan yang mirip atau berlawanan untuk mengecek konsistensi, jadi jawaban yang jujur lebih aman daripada jawaban yang “ideal”.</p>`:""}
      <p class="muted small">Timer langsung berjalan setelah kamu menekan Mulai. Blok ini terkunci begitu selesai.</p>
      <div class="row mt" style="justify-content:center">
        ${S.bi===0?`<button class="btn ghost" id="back">Batal</button>`:""}
        <button class="btn" id="go">Mulai Blok ${S.bi+1}</button>
      </div>
    </div>
  </div>`;
  const back=document.getElementById("back");
  if(back) back.onclick=()=>{ S=null; route(); };
  document.getElementById("go").onclick=beginBlock;
}
function beginBlock(){
  const b = S.blocks[S.bi];
  b.deadline = Date.now() + b.min*60*1000;
  b.startedAt = Date.now();
  S.qi = 0; S.phase="exam";
  renderQ();
  clearInterval(timerInt);
  timerInt = setInterval(tick, 250);
}
function tick(){
  if(!S||S.phase!=="exam") return;
  const b = S.blocks[S.bi];
  const left = (b.deadline - Date.now())/1000;
  const el = document.getElementById("timer");
  if(el){ el.textContent = fmt(left); el.className = "timer" + (left<=60?" crit":left<=180?" warn":""); }
  if(left<=0) endBlock(true);
}

function fmtOpt(t){
  const s = esc(t);
  return /^[\[\]<>"'#.\w(){}\-*=:;, ]+$/.test(t) && /[<>\[\]()"'=#.]/.test(t) && t.length<45 ? `<code>${s}</code>` : s;
}
function renderQ(){
  const b = S.blocks[S.bi], q = b.qs[S.qi], L = "ABCD";
  let body;
  if(b.type==="tech" || q.kind==="sjt"){
    body = `${q.code?`<pre class="code">${esc(q.code)}</pre>`:""}${q.order.map((oi,pos)=>`<button class="opt ${q.ans===oi?"sel":""}" data-v="${oi}"><span class="k">${L[pos]}</span><span>${fmtOpt(q.o[oi])}</span></button>`).join("")}`;
  } else {
    body = `<div class="likert">${LIKERT_LBL.map((l,i)=>`<button class="opt ${q.ans===i+1?"sel":""}" data-v="${i+1}"><span class="k">${i+1}</span><span>${l}</span></button>`).join("")}</div>`;
  }
  const answered = b.qs.filter(x=>x.ans!==null).length;
  $view.innerHTML = `
  <div class="exam-head"><div class="in">
    <div style="min-width:0"><div class="nm">${esc(b.name)}</div><div class="steps">${S.blocks.map((_,i)=>`<span class="${i<S.bi?"done":i===S.bi?"now":""}"></span>`).join("")}</div></div>
    <div id="timer" class="timer">${fmt((b.deadline-Date.now())/1000)}</div>
  </div></div>
  <div class="exam">
    <div class="card">
      <div class="qnum">${q.kind==="sjt"?"Situasional · ":q.kind==="likert"?"Pernyataan · ":""}Soal ${S.qi+1} dari ${b.qs.length}</div>
      <div class="qtext">${esc(q.q)}</div>
      ${body}
      <div class="qactions">
        <button class="btn ghost sm" id="prev" ${S.qi===0?"disabled":""}>← Sebelumnya</button>
        <button class="btn ghost sm flagbtn ${q.flag?"on":""}" id="flag">${q.flag?"★ Ragu":"☆ Ragu"}</button>
        ${S.qi<b.qs.length-1?`<button class="btn navy sm" id="next">Berikutnya →</button>`:`<button class="btn sm" id="fin">Selesai Blok</button>`}
      </div>
    </div>
    <div class="card" style="padding:16px">
      <div class="row between"><b class="small">Navigasi soal</b><span class="small muted">${answered}/${b.qs.length} terjawab</span></div>
      <div class="nav-grid mt">${b.qs.map((x,i)=>`<button class="${x.ans!==null?"ans":""} ${x.flag?"flag":""} ${i===S.qi?"cur":""}" data-g="${i}">${i+1}</button>`).join("")}</div>
      <div class="legend"><span><i style="background:var(--teal-l);border:1px solid var(--teal)"></i>Dijawab</span><span><i style="background:var(--amber)"></i>Ragu</span></div>
      <button class="btn red sm block" id="fin2">Selesai Blok</button>
    </div>
  </div>`;
  $view.querySelectorAll(".opt").forEach(o=>o.onclick=()=>pick(+o.dataset.v));
  $view.querySelectorAll("[data-g]").forEach(o=>o.onclick=()=>go(+o.dataset.g));
  const on=(id,f)=>{const e=document.getElementById(id); if(e) e.onclick=f;};
  on("prev",()=>go(S.qi-1)); on("next",()=>go(S.qi+1)); on("flag",toggleFlag); on("fin",confirmEnd); on("fin2",confirmEnd);
}
function pick(v){ const q=S.blocks[S.bi].qs[S.qi]; q.ans = q.ans===v?null:v; renderQ(); }
function toggleFlag(){ const q=S.blocks[S.bi].qs[S.qi]; q.flag=!q.flag; renderQ(); }
function go(i){ const b=S.blocks[S.bi]; if(i<0||i>=b.qs.length) return; S.qi=i; renderQ(); window.scrollTo(0,0); }

function confirmEnd(){
  const b=S.blocks[S.bi];
  const un=b.qs.filter(x=>x.ans===null).length, fl=b.qs.filter(x=>x.flag).length;
  modal(`<h3>Selesaikan blok ini?</h3>
    <p class="muted">Sisa waktu <b>${fmt((b.deadline-Date.now())/1000)}</b> akan hangus dan tidak dipindahkan ke blok berikutnya. Blok ini juga tidak bisa dibuka lagi.</p>
    ${un?`<p style="color:var(--red);font-weight:600">${un} soal belum dijawab.</p>`:""}
    ${fl?`<p style="color:#8a5a00;font-weight:600">${fl} soal masih ditandai ragu.</p>`:""}
    <div class="row" style="justify-content:flex-end"><button class="btn ghost" id="mNo">Kembali ke soal</button><button class="btn red" id="mYes">Ya, selesai</button></div>`);
  document.getElementById("mNo").onclick=closeModal;
  document.getElementById("mYes").onclick=()=>{closeModal();endBlock(false);};
}
function endBlock(timeout){
  const b=S.blocks[S.bi]; if(b.done) return;
  clearInterval(timerInt);
  b.done=true; b.timeout=timeout; b.used=Math.min(b.min*60,(Date.now()-b.startedAt)/1000);
  closeModal();
  if(S.bi < S.blocks.length-1){
    S.bi++; S.phase="intro";
    intro();
    if(timeout){ modal(`<h3>Waktu habis</h3><p class="muted">Blok <b>${esc(b.name)}</b> ditutup otomatis. Lanjut ke blok berikutnya.</p><div class="row" style="justify-content:flex-end"><button class="btn" id="mOk">Oke</button></div>`); document.getElementById("mOk").onclick=closeModal; }
  } else results();
}

/* ---------- penilaian ---------- */
function scoreTech(b){
  let c=0,w=0,s=0; b.qs.forEach(q=>{ if(q.ans===null) s++; else if(q.ans===q.a) c++; else w++; });
  return {c,w,s,n:b.qs.length,pct:Math.round(c/b.qs.length*100)};
}
function scoreTraits(b){
  const dim={}; Object.keys(DIMS).forEach(k=>dim[k]={sum:0,n:0});
  let lkAns=0, extreme=0; const pos=[], neg=[];
  b.qs.forEach(q=>{
    if(q.ans===null) return;
    if(q.kind==="likert"){
      lkAns++; const v=q.r?6-q.ans:q.ans;
      dim[q.d].sum+=(v-1)/4*100; dim[q.d].n++;
      if(q.ans===5||q.ans===1) extreme++;
      (q.r?neg:pos).push({d:q.d,v});
    } else { dim[q.d].sum+=q.s[q.ans]/3*100; dim[q.d].n++; }
  });
  const gaps=[];
  Object.keys(DIMS).forEach(d=>{
    const p=pos.filter(x=>x.d===d), n=neg.filter(x=>x.d===d);
    if(p.length&&n.length){ const ap=p.reduce((a,x)=>a+x.v,0)/p.length, an=n.reduce((a,x)=>a+x.v,0)/n.length; gaps.push(Math.abs(ap-an)); }
  });
  const gap=gaps.length?gaps.reduce((a,x)=>a+x,0)/gaps.length:0;
  const out={}; Object.keys(DIMS).forEach(k=>out[k]=dim[k].n?Math.round(dim[k].sum/dim[k].n):null);
  return {dims:out, consistency:Math.max(0,Math.round(100-gap/4*100)), extremeRate:lkAns?extreme/lkAns:0, answered:b.qs.filter(q=>q.ans!==null).length, n:b.qs.length};
}

/* ---------- hasil ---------- */
function results(){
  clearInterval(timerInt);
  S.active=false; S.phase="result";
  document.body.classList.remove("in-exam");
  const tech=S.blocks.filter(b=>b.type==="tech"), trait=S.blocks.find(b=>b.type==="traits");
  let tc=0,tn=0; tech.forEach(b=>{const s=scoreTech(b);tc+=s.c;tn+=s.n;});
  const techPct=tn?Math.round(tc/tn*100):null, tr=trait?scoreTraits(trait):null;
  const label=S.mode==="full"?"Simulasi penuh":S.blocks[0].name;
  const hist=store.get("hist",[]);
  hist.unshift({date:new Date().toLocaleString("id-ID",{dateStyle:"medium",timeStyle:"short"}),label,score:techPct!==null?`Teknis ${techPct}%`:`Konsistensi ${tr.consistency}%`});
  store.set("hist",hist.slice(0,15));

  const barCls=p=>p>=70?"":p>=50?"warn":"low";
  const verdict=p=>p>=80?"Sangat baik":p>=65?"Baik":p>=50?"Cukup, perlu penguatan":"Perlu banyak latihan";
  const weak=tech.filter(b=>scoreTech(b).pct<70).map(b=>chapterByBlock(b.key)).filter(Boolean);
  const replayIdx = S.mode==="full" ? -1 : PLAN.findIndex(p=>p.key===S.blocks[0].key);

  $view.innerHTML = `
  <h1 class="h-page">Hasil Simulasi</h1>
  <p class="muted">${esc(label)}</p>
  <div class="grid g2 mt">
    ${techPct!==null?`<div class="card">
      <span class="tag">Technical Assessment</span>
      <div class="row" style="align-items:flex-end;gap:14px"><div class="score-big">${techPct}%</div><div class="muted" style="padding-bottom:6px">${tc} dari ${tn} benar · ${verdict(techPct)}</div></div>
      <div class="mt">${tech.map(b=>{const s=scoreTech(b);return `<div class="res-row"><div><b>${esc(b.name)}</b><div class="muted" style="font-size:12px">${s.c} benar · ${s.w} salah · ${s.s} kosong · ${fmt(b.used)} dipakai${b.timeout?" · waktu habis":""}</div></div><div class="bar ${barCls(s.pct)}"><div style="width:${s.pct}%"></div></div><b>${s.pct}%</b></div>`}).join("")}</div>
    </div>`:""}
    ${tr?`<div class="card">
      <span class="tag">Traits Assessment</span>
      <p class="muted small">Profil kecenderungan, bukan skor lulus/gagal. ${tr.answered}/${tr.n} terjawab.</p>
      ${Object.keys(DIMS).map(k=>tr.dims[k]===null?"":`<div class="res-row"><div><b>${DIMS[k]}</b></div><div class="bar ${barCls(tr.dims[k])}"><div style="width:${tr.dims[k]}%"></div></div><b>${tr.dims[k]}</b></div>`).join("")}
      <div class="res-row"><div><b>Konsistensi jawaban</b><div class="muted" style="font-size:12px">Keselarasan pernyataan positif dan terbalik</div></div><div class="bar ${barCls(tr.consistency)}"><div style="width:${tr.consistency}%"></div></div><b>${tr.consistency}</b></div>
      ${tr.consistency<70?`<div class="notice mt">Konsistensi rendah: jawabanmu untuk pernyataan yang searah dan yang berlawanan saling bertentangan. Di tes asli, pola ini bisa terbaca sebagai menjawab asal atau berusaha terlihat ideal.</div>`:""}
      ${tr.extremeRate>0.85?`<div class="notice mt">Hampir semua jawabanmu ada di titik ekstrem (1 atau 5). Profil yang “terlalu sempurna” kadang ditandai oleh alat tes kepribadian.</div>`:""}
    </div>`:""}
  </div>
  <div class="card mt">
    <p class="mb0">Meninggalkan tab/aplikasi selama tes: <b style="color:${S.tabOut?"var(--red)":"var(--green)"}">${S.tabOut} kali</b>${S.tabOut?" — di tes asli, berpindah tab bisa dianggap pelanggaran kode etik.":" — bagus."}</p>
    ${weak.length?`<p class="mt mb0"><b>Pelajari ulang:</b> ${weak.map(m=>`<a href="#modul-${m.id}">Bab ${esc(m.no)} ${esc(m.judul)}</a>`).join(" · ")}</p>`:""}
  </div>
  ${tech.length?`<div class="card mt"><h3 style="margin:0 0 12px">Pembahasan soal teknis</h3>
    <div class="tabs" id="rtabs">${tech.map((b,i)=>`<button class="${i===0?"on":""}" data-i="${i}">${esc(b.name)}</button>`).join("")}</div>
    <div id="review"></div></div>`:""}
  <div class="row mt" style="justify-content:center">
    <a class="btn ghost" href="#simulasi" id="toSim">Kembali ke menu simulasi</a>
    <button class="btn" id="again">Ulangi dengan soal acak</button>
  </div>`;
  document.getElementById("toSim").onclick=e=>{e.preventDefault(); S=null; pageSim(); window.scrollTo(0,0);};
  document.getElementById("again").onclick=()=>{ replayIdx<0?startFull():startSingle(replayIdx); window.scrollTo(0,0); };
  $view.querySelectorAll("#rtabs button").forEach(b=>b.onclick=()=>showReview(tech,+b.dataset.i));
  if(tech.length) showReview(tech,0);
  window.scrollTo(0,0);
}
function showReview(tech,i){
  const b=tech[i], L="ABCD";
  document.querySelectorAll("#rtabs button").forEach((x,j)=>x.classList.toggle("on",j===i));
  document.getElementById("review").innerHTML = b.qs.map((q,n)=>{
    const st=q.ans===null?"skip":q.ans===q.a?"ok":"no";
    const letterOf=oi=>L[q.order.indexOf(oi)];
    return `<div class="rv ${st}">
      <div class="row between"><b>Soal ${n+1}</b><span class="pill ${st}">${st==="ok"?"Benar":st==="no"?"Salah":"Tidak dijawab"}</span></div>
      <p style="margin:6px 0">${esc(q.q)}</p>
      ${q.code?`<pre class="code">${esc(q.code)}</pre>`:""}
      ${q.ans!==null&&q.ans!==q.a?`<div class="small" style="color:var(--red)">Jawabanmu: ${letterOf(q.ans)}. ${fmtOpt(q.o[q.ans])}</div>`:""}
      <div class="small" style="color:var(--green);font-weight:600">Jawaban benar: ${letterOf(q.a)}. ${fmtOpt(q.o[q.a])}</div>
      <div class="ex">${esc(q.e)}</div>
    </div>`;}).join("");
}

/* ---------- anti-curang & keyboard ---------- */
document.addEventListener("visibilitychange",()=>{ if(document.hidden && S && S.active && S.phase==="exam") S.tabOut++; });
document.addEventListener("keydown",e=>{
  if(!S||!S.active||S.phase!=="exam"||document.getElementById("modal-root").innerHTML) return;
  if(/input|textarea/i.test((e.target.tagName||""))) return;
  const q=S.blocks[S.bi].qs[S.qi];
  if(e.key==="ArrowRight") go(S.qi+1);
  else if(e.key==="ArrowLeft") go(S.qi-1);
  else if(/^[1-5]$/.test(e.key)){ const k=+e.key; if(q.kind==="likert") pick(k); else if(q.order&&k<=q.order.length) pick(q.order[k-1]); }
});
window.addEventListener("beforeunload",e=>{ if(S&&S.active&&S.phase==="exam"){ e.preventDefault(); e.returnValue=""; } });

route();
})();
