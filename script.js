function hitungBunga() {
    var modalAwalInput = document.getElementById("modalAwal");
    var Mo = parseFloat(modalAwalInput.value.replace(/\./g, '').replace(/,/g, '.')); // Mengganti titik atau koma dengan titik desimal
    var i = parseFloat(document.getElementById("bunga").value) / 100;
    var n = parseFloat(document.getElementById("periode").value);
    var jenisBunga = document.getElementById("jenisBunga").value;
    
    if (jenisBunga === "bungaTunggal") {
        var B = Mo * i;
        var Mn = Mo * (1 + n * i);

        // Memformat hasil dengan titik ribuan
        document.getElementById("hasilBunga").innerHTML = "Bunga Tunggal: " + formatRibuan(B);
        document.getElementById("hasilModalAkhir").innerHTML = "Modal Akhir (Bunga Tunggal): " + formatRibuan(Mn);
    } else if (jenisBunga === "bungaMajemuk") {
        var Bm = (Mo * Math.pow((1 + i), n)) - Mo;
        var MnMajemuk = Mo * Math.pow((1 + i), n);

        // Memformat hasil dengan titik ribuan
        document.getElementById("hasilBunga").innerHTML = "Bunga Majemuk: " + formatRibuan(Bm);
        document.getElementById("hasilModalAkhir").innerHTML = "Modal Akhir (Bunga Majemuk): " + formatRibuan(MnMajemuk);
    } else if (jenisBunga === "anuitas") {
        var A = (Mo * i * Math.pow(1 + i, n)) / (Math.pow(1 + i, n) - 1);
        var A1 = (Mo * i) / (Math.pow(1 + i, n) - 1);

        // Menghitung dan mengisi tabel anuitas
        var tabelAnuitas = document.getElementById("tabelAnuitas");
        tabelAnuitas.innerHTML = ""; // Mengosongkan tabel sebelum mengisi

        for (var bulan = 1; bulan <= n; bulan++) {
            var An = A1 * Math.pow(1 + i, bulan - 1);
            var Bn = A - An;

            var row = document.createElement("tr");
            var cellBulan = document.createElement("td");
            var cellAngsuranPokok = document.createElement("td");
            var cellBunga = document.createElement("td");
            var cellAnuitas = document.createElement("td");

            cellBulan.textContent = bulan;
            cellAngsuranPokok.textContent = formatRibuan(An - Bn);
            cellBunga.textContent = formatRibuan(Bn);
            cellAnuitas.textContent = formatRibuan(A);

            row.appendChild(cellBulan);
            row.appendChild(cellAngsuranPokok);
            row.appendChild(cellBunga);
            row.appendChild(cellAnuitas);

            tabelAnuitas.appendChild(row);
        }
        // Memformat hasil dengan titik ribuan
        document.getElementById("hasilBunga").innerHTML = "Anuitas: " + formatRibuan(A);
        document.getElementById("hasilModalAkhir").innerHTML = "";

        // Tambahkan hasil A1, An, dan Bn ke dalam hasil
        document.getElementById("hasilBunga").innerHTML += "<br>Anuitas Bulan Pertama (A1): " + formatRibuan(A1);
        document.getElementById("hasilBunga").innerHTML += "<br>Anuitas Bulan Terakhir (An): " + formatRibuan(An);
        document.getElementById("hasilBunga").innerHTML += "<br>Besar Bunga Bulan Terakhir (Bn): " + formatRibuan(Bn);
    }
}

function formatRibuan(nilai) {
    return nilai.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

function formatModalAwal(input) {
    // Fungsi ini akan memformat input modal awal dengan titik ribuan
    var value = input.value.replace(/\./g, ''); // Menghilangkan titik yang ada
    value = value.replace(/\B(?=(\d{3})+(?!\d))/g, '.'); // Menambahkan titik sebagai pemisah ribuan
    input.value = value;
}

function ubahLabel(select) {
    var labelBunga = document.querySelector('label[for="bunga"]');
    var labelPeriode = document.querySelector('label[for="periode"]');
    var labelModalAwal = document.querySelector('label[for="modalAwal"]');
    
    if (select.value === "anuitas") {
        labelBunga.textContent = "Periode Bunga (Bulan%)";
        labelPeriode.textContent = "Periode (Bulan)";
        labelModalAwal.textContent = "Jumlah Pinjaman";
    } else {
        labelBunga.textContent = "Bunga (%)";
        labelPeriode.textContent = "Periode (Tahun)";
        labelModalAwal.textContent = "Modal Awal";
    }
}
