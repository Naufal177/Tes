// ======== COUNTDOWN MENUJU BUKA PUASA & ADZAN MAGHRIB ========

// Variabel global (reset setiap refresh)
let adzanPlayed = false;

// Fungsi untuk mendapatkan waktu berbuka puasa (Maghrib) setiap hari
function getMaghribTime() {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), now.getDate(), 18, 5, 0); // Ganti dengan jam Maghrib sesuai lokasi
}

// Ambil elemen dari DOM
const countdownEl = document.getElementById("countdown");
const nameInput = document.getElementById("nameInput");
const greetBtn = document.getElementById("greetBtn");
const greetingEl = document.getElementById("greeting");
const adzanAudio = document.getElementById("adzanAudio");

// Fungsi untuk memperbarui countdown menuju buka puasa
function updateCountdown() {
    const maghribTime = getMaghribTime();
    const now = new Date().getTime();
    const distance = maghribTime.getTime() - now;

    if (distance <= 0) {
        countdownEl.innerHTML = "Selamat Berbuka Puasa! 🌙✨"; // Tampilkan pesan ketika waktu habis
        playAdzan(); // Panggil fungsi untuk memainkan adzan
        return;
    }

    const hours = Math.floor(distance / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    countdownEl.innerHTML = `Menuju Waktu Berbuka: ${hours} Jam ${minutes} Menit ${seconds} Detik`;
}

// Fungsi untuk memainkan Adzan hanya saat countdown habis
async function playAdzan() {
    if (!adzanPlayed) {
        try {
            await adzanAudio.play();
            console.log("Adzan dimainkan.");
            adzanPlayed = true; // Set agar tidak diputar berulang tanpa refresh
        } catch (error) {
            console.log("Gagal memutar adzan:", error);
        }
    }
}

// Fungsi untuk menampilkan ucapan berbuka puasa saat tombol ditekan
function updateGreeting() {
    const now = new Date();
    const maghribTime = getMaghribTime();

    const nameValue = nameInput.value.trim();
    if (now >= maghribTime) {
        greetingEl.innerHTML = nameValue 
            ? `Selamat Berbuka Puasa, ${nameValue}! 🌙✨` 
            : "Selamat Berbuka Puasa! 🌙✨";
    } else {
        greetingEl.innerHTML = nameValue 
            ? `Selamat Menunaikan Ibadah Puasa, ${nameValue}! 🌙✨` 
            : "Selamat Menunaikan Ibadah Puasa! 🌙✨";
    }
}

// Jalankan update countdown setiap detik
setInterval(updateCountdown, 1000);
updateCountdown();

// Event listener untuk tombol Kirim Ucapan
greetBtn.addEventListener("click", updateGreeting);
