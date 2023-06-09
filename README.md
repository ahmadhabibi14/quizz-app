# Challenge Frontend React.js

## TODO
- [x] Pertanyaan dan pilihan jawaban
- [x] Fetch quiz dari [Open Trivia DB](https://opentdb.com/)
- [x] Set Timer, jika timer habis maka soal akan di tutup
- [x] Login atau Autentikasi, pakai `Firebase`
- [ ] Simpan hasil pengerjaan di localstorage
- [x] Tampilkan hasil pengerjaan (jumlah benar, jumlah salah & jumlah jawab)
- [ ] Perbaiki copywriting dan UI
- [ ] Tampilan responsif

### Buat Aplikasi Kuis menggunakan teknologi React dengan kriteria berikut:
1. Memiliki fitur login
2. Untuk API soal bisa ambil dari [Open Trivia DB](https://opentdb.com/)
3. Jumlah & tipe soal bebas
4. Total soal & jumlah yang dikerjakan ditampilkan
5. Memiliki timer. Jumlah waktu pengerjaan kuis bebas
6. Satu halaman hanya menampilkan satu soal. Jadi ketika user telah memilih jawaban, langsung pindah soal
7. Jika timer habis, soal akan ditutup & menampilkan hasil pengerjaan (jumlah benar, jumlah salah & jumlah jawab)
8. Ketika browser ditutup, ada mekanisme resume kuis. Bisa menggunakan `localstoragebrowser` untuk menyimpan data (Nilai plus)
