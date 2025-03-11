// Variabel global untuk mengecek apakah waktu buka puasa telah tiba
let countdownFinished = false;

// Fungsi untuk mendapatkan waktu buka puasa (iftar) di daerah Talaga.
// Waktu iftar asli diatur pukul 18:30, dikurangi 25 menit sehingga menjadi pukul 18:05.
function getIftarTime() {
  const now = new Date();
  let iftarTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 18, 30, 0);
  // Kurangi 25 menit: 18:30 - 25 menit = 18:05
  iftarTime.setMinutes(iftarTime.getMinutes() - 25);
  
  // Jika waktu saat ini sudah melewati pukul 18:05, set waktu buka puasa untuk hari berikutnya
  if (now.getTime() > iftarTime.getTime()) {
    iftarTime.setDate(iftarTime.getDate() + 1);
  }
  return iftarTime; 04, 00, 0)
}

const countdownEl = document.getElementById('countdown');
const nameInput = document.getElementById('nameInput');
const greetBtn = document.getElementById('greetBtn');
const greetingEl = document.getElementById('greeting');

// Fungsi untuk mengupdate hitungan mundur menuju waktu buka puasa
function updateCountdown() {
  const iftarTime = getIftarTime();
  const now = new Date().getTime();
  const distance = iftarTime.getTime() - now;
  
  const hours = Math.floor(distance / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);
  
  countdownEl.innerHTML =`Waktu menuju buka puasa di Talaga: ${hours} Jam ${minutes} Menit ${seconds} Detik`;
  
  // Jika waktu buka puasa telah tiba
  if (distance < 0) {
    clearInterval(countdownInterval);
    countdownEl.innerHTML = "Saatnya berbuka puasa!";
    countdownFinished = true;
    // Ubah placeholder agar mengindikasikan input sudah bisa diisi
    nameInput.placeholder = "Masukkan Nama Anda";
  }
}

const countdownInterval = setInterval(updateCountdown, 1000);
updateCountdown();

// Saat user mengklik (focus) kolom input, periksa apakah waktu buka puasa sudah tiba
nameInput.addEventListener('focus', function() {
  if (!countdownFinished) {
    greetingEl.innerHTML = "Masih menunggu buka puasa";
    // Menghapus fokus agar user tidak bisa mengetik
    nameInput.blur();
  }
});

// Event listener untuk tombol Kirim Ucapan
greetBtn.addEventListener('click', function() {
  if (!countdownFinished) {
    greetingEl.innerHTML = "Masih menunggu buka puasa";
    return;
  }
  const nameValue = nameInput.value.trim();
  if(nameValue !== "") {
    greetingEl.innerHTML ="Selamat Berbuka Puasa, ${nameValue}!";
  } else {
    greetingEl.innerHTML = "Selamat Berbuka Puasa!";
  }
});
