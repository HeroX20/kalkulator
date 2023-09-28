document.addEventListener('DOMContentLoaded', function () {
    const typeSelect = document.getElementById('type');
    const inputContainer = document.getElementById('input-container');
    const calculateButton = document.getElementById('calculate');
    const hasilBungaTunggal = document.getElementById('hasilBungaTunggal');
    const hasilModalAkhirTunggal = document.getElementById('hasilModalAkhirTunggal');
    const hasilBungaMajemuk = document.getElementById('hasilBungaMajemuk');
    const hasilModalAkhirMajemuk = document.getElementById('hasilModalAkhirMajemuk');

    // Tambahkan event listener untuk tombol "Hitung"
    calculateButton.addEventListener('click', calculate);

    // Fungsi untuk menghitung bunga tunggal
    function hitungBungaTunggal() {
        var Mo = parseFloat(document.getElementById("modalAwal").value.replace(/\./g, '').replace(/,/g, '.')); // Mengganti titik atau koma dengan titik desimal
        var i = parseFloat(document.getElementById("bunga").value) / 100;
        var n = parseFloat(document.getElementById("periode").value);
        
        var B = Mo * i;
        var Mn = Mo * (1 + n * i);

        // Memformat hasil dengan titik ribuan
        hasilBungaTunggal.innerHTML = "Bunga Tunggal: " + formatRibuan(B);
        hasilModalAkhirTunggal.innerHTML = "Modal Akhir (Bunga Tunggal): " + formatRibuan(Mn);
    }

    // Fungsi untuk menghitung bunga majemuk
    function hitungBungaMajemuk() {
        var Mo = parseFloat(document.getElementById("modalAwal").value.replace(/\./g, '').replace(/,/g, '.')); // Mengganti titik atau koma dengan titik desimal
        var i = parseFloat(document.getElementById("bunga").value) / 100;
        var n = parseFloat(document.getElementById("periode").value);
        
        var Bm = Mo * (Math.pow(1 + i, n) - 1);
        var MnMajemuk = Mo * Math.pow(1 + i, n);

        // Memformat hasil dengan titik ribuan
        hasilBungaMajemuk.innerHTML = "Bunga Majemuk: " + formatRibuan(Bm);
        hasilModalAkhirMajemuk.innerHTML = "Modal Akhir (Bunga Majemuk): " + formatRibuan(MnMajemuk);
    }

    // Fungsi untuk menghitung berdasarkan jenis perhitungan yang dipilih
    function calculate() {
        const type = typeSelect.value;

        if (type === 'bunga-tunggal') {
            hitungBungaTunggal();
            hasilBungaTunggal.style.display = 'block';
            hasilModalAkhirTunggal.style.display = 'block';
            hasilBungaMajemuk.style.display = 'none';
            hasilModalAkhirMajemuk.style.display = 'none';
        } else if (type === 'bunga-majemuk') {
            hitungBungaMajemuk();
            hasilBungaTunggal.style.display = 'none';
            hasilModalAkhirTunggal.style.display = 'none';
            hasilBungaMajemuk.style.display = 'block';
            hasilModalAkhirMajemuk.style.display = 'block';
        }
    }

    // Fungsi untuk memformat angka dengan titik ribuan
    function formatRibuan(angka) {
        return angka.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }

    // Tampilkan isian input awal
    calculate();
});
