// Format angka dengan titik sebagai pemisah ribuan
function formatAngka(value) {
  const angka = String(value).replace(/\D/g, "");
  if (!angka) return "";
  return Number(angka).toLocaleString("id-ID");
}

// Mengambil angka dari input yang sudah memakai titik
function ambilAngka(id) {
  const value = document.getElementById(id).value;
  return Number(value.replace(/\./g, "").replace(/,/g, ".")) || 0;
}

// Format hasil Rupiah dengan titik ribuan
function rupiah(angka) {
  return "Rp" + Math.round(angka).toLocaleString("id-ID");
}

// Format otomatis input angka saat diketik
["modal", "jumlah"].forEach(function(id) {
  const input = document.getElementById(id);

  input.addEventListener("input", function() {
    const posisiAkhir = this.selectionStart;
    const sebelum = this.value.length;

    this.value = formatAngka(this.value);

    const sesudah = this.value.length;
    this.setSelectionRange(
      Math.max(0, posisiAkhir + (sesudah - sebelum)),
      Math.max(0, posisiAkhir + (sesudah - sebelum))
    );
  });
});

// Persentase boleh menggunakan angka biasa atau koma desimal
["footCost", "upah", "umum", "lain"].forEach(function(id) {
  document.getElementById(id).addEventListener("input", function() {
    this.value = this.value.replace(/[^0-9,\.]/g, "");
  });
});

function hitung() {
  const modal = ambilAngka("modal");
  const footPersen = ambilAngka("footCost");
  const jumlah = ambilAngka("jumlah");
  const upahPersen = ambilAngka("upah");
  const umumPersen = ambilAngka("umum");
  const lainPersen = ambilAngka("lain");

  if (modal <= 0 || footPersen <= 0 || jumlah <= 0) {
    alert("Mohon isi Modal Awal, Foot Cost, dan Jumlah Biji dengan benar.");
    return;
  }

  const foot = (100 / footPersen) * modal;
  const harga = foot / jumlah;
  const labaKotor = foot - modal;
  const biayaUpah = modal * (upahPersen / 100);
  const biayaUmum = modal * (umumPersen / 100);
  const biayaLain = modal * (lainPersen / 100);
  const labaBersih = modal - (biayaUpah + biayaUmum + biayaLain);

  document.getElementById("hasilFoot").textContent = rupiah(foot);
  document.getElementById("hasilHarga").textContent = rupiah(harga);
  document.getElementById("hasilKotor").textContent = rupiah(labaKotor);
  document.getElementById("hasilUpah").textContent = rupiah(biayaUpah);
  document.getElementById("hasilUmum").textContent = rupiah(biayaUmum);
  document.getElementById("hasilLain").textContent = rupiah(biayaLain);
  document.getElementById("hasilBersih").textContent = rupiah(labaBersih);

  document.getElementById("hasil").style.display = "block";
  document.getElementById("hasil").scrollIntoView({
    behavior: "smooth",
    block: "start"
  });
}

function resetKalkulator() {
  ["modal", "footCost", "jumlah", "upah", "umum", "lain"].forEach(function(id) {
    document.getElementById(id).value = "";
  });

  document.getElementById("hasil").style.display = "none";

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}
