# Panduan Deploy ke GitHub Pages

Panduan ini membawa situs **Belajar & Simulasi Tes Pijak 2027** online di alamat seperti `https://USERNAME.github.io/pijak-belajar/`, sehingga bisa dibuka dari HP kapan saja. Langkahnya ditulis untuk Windows, dengan catatan untuk Mac/Linux.

> **Istilah singkat**
> - **Repository (repo):** folder proyek di GitHub, mirip folder Google Drive untuk kode.
> - **Commit:** menyimpan perubahan beserta catatannya.
> - **Push:** mengirim commit dari komputer ke GitHub.
> - **Personal Access Token:** "password khusus" untuk Git di terminal. GitHub tidak menerima password akun biasa.

---

## Tahap 1 — Ekstrak ZIP dan kenali folder kerjanya

1. Ekstrak `pijak-belajar.zip`, misalnya ke `Documents`. Hasilnya folder **`pijak-belajar`**.
2. Buka folder itu. Kamu **harus** langsung melihat `index.html`, folder `css`, dan folder `js` di dalamnya.

```
pijak-belajar\          ← INI folder kerja (tempat git init dijalankan)
├── index.html
├── README.md
├── PANDUAN-DEPLOY.md
├── css\
└── js\
```

> ⚠️ Jika setelah diekstrak muncul folder `pijak-belajar` lagi di dalam `pijak-belajar`, gunakan folder **yang di dalam**, yaitu folder yang langsung berisi `index.html`.

## Tahap 2 — Install Git

- **Windows:** unduh dari <https://git-scm.com/download/win> dan install dengan pengaturan default.
- **Mac:** buka Terminal dan ketik `git --version`. Jika belum ada, macOS akan menawarkan instalasi.

Cek di PowerShell:

```powershell
git --version
```

Hasil yang benar berbentuk `git version 2.xx.x`.

## Tahap 3 — Akun GitHub dan identitas Git

1. Daftar di <https://github.com> jika belum punya akun. Username-mu akan menjadi bagian dari alamat situs.
2. Atur identitas Git (cukup sekali di komputer ini):

```powershell
git config --global user.name "Nama Kamu"
git config --global user.email "email-akun-github@contoh.com"
```

## Tahap 4 — Buat repository kosong di GitHub

1. Di github.com, klik **+** → **New repository**.
2. **Repository name:** `pijak-belajar`.
3. Pilih **Public**, karena GitHub Pages gratis hanya untuk repo publik. Ini aman, karena situs ini tidak berisi data rahasia.
4. **Jangan** centang *Add a README*, *.gitignore*, atau *license*.
5. Klik **Create repository**, lalu biarkan halamannya tetap terbuka.

## Tahap 5 — Buka PowerShell di folder kerja dan verifikasi

1. Buka folder `pijak-belajar` (yang berisi `index.html`) di File Explorer.
2. Klik address bar, ketik `powershell`, lalu tekan Enter. PowerShell akan terbuka langsung di folder itu.
3. Jalankan:

```powershell
dir
```

**Wajib** terlihat `index.html`, `css`, dan `js`. Jika belum terlihat, kamu berada di folder yang salah, jadi **jangan lanjut** sebelum benar.

## Tahap 6 — Kirim ke GitHub

Jalankan perintah ini **satu per satu**:

```powershell
git init
git add .
git commit -m "Upload pertama"
git branch -M main
git remote add origin https://github.com/USERNAME/pijak-belajar.git
git push -u origin main
```

- Ganti `USERNAME` dengan username GitHub-mu.
- Perhatikan **titik** di akhir `git add .`.
- Saat `git push`, mungkin muncul jendela login GitHub di browser. Jika diminta lewat terminal, isi **Username** dengan username GitHub dan **Password** dengan **Personal Access Token** (lihat Tahap 6b).
- Saat mengetik atau menempel token, layar **tidak menampilkan apa pun**. Itu normal. Tempel dengan klik kanan lalu tekan Enter.

Tanda berhasil: muncul `Writing objects: 100%` dan `* [new branch] main -> main`.

### Tahap 6b — Membuat Personal Access Token (jika diminta)

1. Buka <https://github.com/settings/tokens> → **Generate new token** → **Generate new token (classic)**.
2. **Note:** `git-push`. **Expiration:** 90 days. Centang scope **repo**.
3. Klik **Generate token**, lalu **salin** token yang berawalan `ghp_...`. Token hanya tampil sekali.
4. Jalankan lagi `git push -u origin main`, lalu tempel token sebagai password.

> Jika terminal terasa merepotkan, pakai **GitHub Desktop** (<https://desktop.github.com>): login lewat browser → **File → Add local repository** → pilih folder `pijak-belajar` → **Publish repository** (hilangkan centang *Keep this code private*).

## Tahap 7 — Aktifkan GitHub Pages

1. Buka `https://github.com/USERNAME/pijak-belajar`. Pastikan `index.html` serta folder `css` dan `js` terlihat di halaman utama repo.
2. Buka **Settings** → **Pages** (menu kiri).
3. **Source:** *Deploy from a branch*. **Branch:** `main`, folder `/ (root)`. Klik **Save**.
4. Tunggu 1–2 menit lalu muat ulang halaman. Akan muncul: *Your site is live at `https://USERNAME.github.io/pijak-belajar/`*.
5. Centang **Enforce HTTPS** jika tersedia.

Buka alamat tersebut di HP. Agar terasa seperti aplikasi, pilih **Tambahkan ke layar utama** (Add to Home Screen) dari menu browser.

## Tahap 8 — Memperbarui situs

Setelah mengubah file, jalankan dari folder kerja yang sama:

```powershell
git add .
git commit -m "Perbarui materi"
git push
```

Situs diperbarui dalam 1–2 menit. Jika yang tampil masih versi lama, tekan **Ctrl+Shift+R** atau buka jendela Incognito.

---

## Masalah yang sering terjadi

| Yang terlihat | Penyebab | Solusi |
|---|---|---|
| Halaman 404 di GitHub Pages | `index.html` tidak berada di root repo, atau Pages belum diaktifkan | Pastikan `index.html` terlihat di halaman utama repo; cek Settings → Pages: `main` / `(root)` |
| Repo berisi folder `pijak-belajar` di dalamnya | `git init` dijalankan satu level terlalu tinggi | Masuk ke folder yang berisi `index.html`, lalu ulangi Tahap 6 dengan `git push -u origin main --force` (menimpa isi repo dengan versi yang benar) |
| Tampilan polos tanpa warna | Folder `css`/`js` tidak ikut, misalnya karena upload lewat web | Selalu push lewat terminal atau GitHub Desktop, jangan lewat *Upload files* |
| `Password authentication is not supported` | GitHub menolak password akun | Pakai Personal Access Token (Tahap 6b) |
| `remote origin already exists` | Perintah remote sudah pernah dijalankan | Lewati, langsung `git push -u origin main` |
| `src refspec main does not match any` | Belum ada commit | Jalankan `git add .` lalu `git commit -m "Upload pertama"` |
| Progres belajar hilang | Progres tersimpan per browser/perangkat | Gunakan browser yang sama; data hilang jika riwayat atau cache browser dihapus |
