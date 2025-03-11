// ======== COUNTDOWN IDUL FITRI ========

// Variabel global untuk mengecek apakah waktu Idul Fitri telah tiba
let countdownEidFinished = false;

// Fungsi untuk menentukan waktu Idul Fitri (1 Syawal)
function getEidTime() {
  const eidDate = new Date(2025, 03, 1, 0, 0, 0); // 22 April 2025 pukul 00:00 (gantilah sesuai tahun)
  return eidDate;
}

const countdownEidEl = document.getElementById('countdown-eid');
const nameInputEid = document.getElementById('nameInput');
const greetBtnEid = document.getElementById('greetBtn');
const greetingEidEl = document.getElementById('greeting');

// Fungsi untuk mengupdate hitungan mundur menuju Idul Fitri
function updateCountdownEid() {
  const eidTime = getEidTime();
  const now = newDate().getTime();
  const distance = eidTime.getTime() - now;
  
  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);
  
  countdownEidEl.innerHTML = `Hitungan Mundur ke Idul Fitri: ${days} Hari ${hours} Jam ${minutes} Menit ${seconds} Detik`;
  
  // Jika waktu Idul Fitri telah tiba
  if (distance < 0) {
    clearInterval(countdownEidInterval);
    countdownEidEl.innerHTML = "Selamat Idul Fitri! 🌙✨";
    countdownEidFinished = true;
    
    // Aktifkan input dan tombol ucapan
    nameInputEid.removeAttribute("disabled");
    nameInputEid.placeholder = "Masukkan Nama Anda";
    greetBtnEid.removeAttribute("disabled");
  }
}

// Jalankan update countdown setiap detik
const countdownEidInterval = setInterval(updateCountdownEid, 1000);
updateCountdownEid();

// Event listener untuk tombol Kirim Ucapan
greetBtnEid.addEventListener('click', function() {
  if (!countdownEidFinished) {
    greetingEidEl.innerHTML = "Masih menunggu Idul Fitri";
    return;
  }
  const nameValue = nameInputEid.value.trim();
  if (nameValue !== "") {
    greetingEidEl.innerHTML = `Selamat Idul Fitri, ${nameValue}! 🌙✨`;
  } else {
    greetingEidEl.innerHTML = "Selamat Idul Fitri! 🌙✨";
  }
});