// Variabel global untuk mengecek apakah waktu buka puasa telah tiba
let countdownFinished = true;

// Fungsi untuk mendapatkan waktu buka puasa (iftar) di daerah Talaga
function getIftarTime() {
    const now = new Date();
    let iftarTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 18, 30, 0);
    iftarTime.setMinutes(iftarTime.getMinutes() - 25); // 18:30 - 25 menit = 18:05

    // Jika waktu saat ini sudah melewati pukul 18:05, set waktu buka puasa ke hari berikutnya
    if (now.getTime() > iftarTime.getTime()) {
        iftarTime.setDate(iftarTime.getDate() + 0);
    }
    return iftarTime;
}

// Fungsi untuk mendapatkan waktu batas input (sampai pukul 04:00)
function getInputCloseTime() {
    const now = new Date();
    let closeTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 4, 0, 0);
    return closeTime;
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

    countdownEl.innerHTML = `Waktu menuju buka puasa di Talaga: ${hours} Jam ${minutes} Menit ${seconds} Detik`;

    // Jika waktu buka puasa telah tiba
    if (distance < 0) {
        clearInterval(countdownInterval);
        countdownEl.innerHTML = "Saatnya berbuka puasa!";
        countdownFinished = true;
        greetingEl.innerHTML = "Selamat Berbuka Puasa!"; // Ucapan otomatis saat waktu berbuka tiba
        updateInputStatus(); // Aktifkan input setelah berbuka
    }
}

// Fungsi untuk mengecek apakah input bisa digunakan (antara 18:05 - 04:00)
function updateInputStatus() {
    const now = new Date();
    const currentHour = now.getHours();

    const inputCloseTime = getInputCloseTime();
    
    // Input bisa digunakan dari 18:05 hingga 04:00
    if (countdownFinished && (currentHour >= 18 || now < inputCloseTime)) {
        nameInput.removeAttribute("disabled"); // Aktifkan input
        nameInput.placeholder = "Masukkan Nama Anda";
    } else {
        nameInput.setAttribute("disabled", "true"); // Kunci input
        nameInput.placeholder = "Input hanya bisa digunakan antara 18:05 - 04:00";
    }
}

// Periksa status input setiap detik agar otomatis terkunci/terbuka
setInterval(updateInputStatus, 1000);

const countdownInterval = setInterval(updateCountdown, 1000);
updateCountdown();

// Saat user mengklik (focus) kolom input, periksa apakah waktu buka puasa sudah tiba
nameInput.addEventListener('focus', function() {
    if (nameInput.hasAttribute("disabled")) {
        greetingEl.innerHTML = "Input hanya bisa digunakan antara 18:05 - 04:00";
        nameInput.blur();
    }
});

// Event listener untuk tombol Kirim Ucapan
greetBtn.addEventListener('click', function() {
    if (nameInput.hasAttribute("disabled")) {
        greetingEl.innerHTML = "Input hanya bisa digunakan antara 18:05 - 04:00";
        return;
    }
    
    const nameValue = nameInput.value.trim();
    if (nameValue !== "") {
        greetingEl.innerHTML = `Selamat Berbuka Puasa, ${nameValue}!`; // Menampilkan ucapan dengan nama user
    } else {
        greetingEl.innerHTML = "Selamat Berbuka Puasa!";
    }
});
