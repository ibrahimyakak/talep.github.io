let talepNumarasi = 1; // Başlangıç talep numarası
const onayBekleyenTable = document.getElementById("onayBekleyenTable").querySelector("tbody");
const kontrolEdilecekTable = document.getElementById("kontrolEdilecekTable").querySelector("tbody");
const tamamlanmisTable = document.getElementById("tamamlanmisTable").querySelector("tbody");
const redEdilenTable = document.getElementById("redEdilenTable").querySelector("tbody");

// Talep oluşturma formu
document.getElementById("talepForm").addEventListener("submit", (e) => {
    e.preventDefault();

    // Form bilgilerini al
    const talepEden = document.getElementById("talepEden").value;
    const talepTarihi = document.getElementById("talepTarihi").value;
    const tedarikci = document.getElementById("tedarikci").value;
    const tedarikciNotu = document.getElementById("tedarikciNotu").value;

    // Ürün listesi bilgilerini al
    const urunListesi = Array.from(document.querySelectorAll("#urunListesi .urun")).map((urun) => {
        return {
            urunAdi: urun.querySelector(".urunAdi").value,
            urunMiktari: urun.querySelector(".urunMiktari").value,
            birim: urun.querySelector(".birim").value,
            toplamTutar: urun.querySelector(".toplamTutar").value,
            tedarikNedeni: urun.querySelector(".tedarikNedeni").value,
        };
    });

    if (urunListesi.length === 0) {
        alert("Lütfen en az bir ürün ekleyin.");
        return;
    }

    // Onay bekleyen talepler listesine her ürünü ayrı satır olarak ekle
    urunListesi.forEach((urun) => {
        const newRow = onayBekleyenTable.insertRow();
        newRow.innerHTML = `
            <td>${talepNumarasi}</td>
            <td>${talepTarihi}</td>
            <td>${talepEden}</td>
            <td>${tedarikci}</td>
            <td>${urun.urunAdi}</td>
            <td>${urun.tedarikNedeni}</td>
            <td>${urun.urunMiktari} ${urun.birim}</td>
            <td>${parseFloat(urun.toplamTutar).toFixed(2)} ₺</td>
            <td>${tedarikciNotu}</td>
            <td><input type="text" class="onaylayan" placeholder="Onaylayan" required></td>
            <td><textarea class="redNedeni" placeholder="Red Nedeni"></textarea></td>
            <td>
                <button class="onayla">Onayla</button>
                <button class="redEt">Red Et</button>
            </td>
        `;
    });

    talepNumarasi++;
    document.getElementById("talepForm").reset();
    document.querySelector("#urunListesi").innerHTML = "";
});

// Ürün ekle butonu
document.getElementById("urunEkle").addEventListener("click", () => {
    const urunHTML = `
        <div class="urun">
            <label>Ürün Adı:</label>
            <input type="text" class="urunAdi" required>
            <label>Ürün Miktarı:</label>
            <input type="number" class="urunMiktari" required>
            <label>Birim:</label>
            <input type="text" class="birim" required>
            <label>Toplam Tutar:</label>
            <input type="number" class="toplamTutar" required>
            <label>Tedarik Nedeni:</label>
            <input type="text" class="tedarikNedeni" required>
            <button type="button" class="urunSil">Sil</button>
        </div>
    `;
    document.getElementById("urunListesi").insertAdjacentHTML('beforeend', urunHTML);
});

// Ürün silme
document.getElementById("urunListesi").addEventListener("click", (e) => {
    if (e.target.classList.contains("urunSil")) {
        e.target.closest(".urun").remove();
    }
});

// Onay bekleyen taleplerde onaylama ve red etme
onayBekleyenTable.addEventListener("click", (e) => {
    if (e.target.classList.contains("onayla")) {
        const row = e.target.closest("tr");
        const onaylayan = row.querySelector(".onaylayan").value;
        const onayTarihi = new Date().toLocaleDateString();

        if (!onaylayan) {
            alert("Lütfen onaylayan bilgisini giriniz.");
            return;
        }

        const newRow = kontrolEdilecekTable.insertRow();
        newRow.innerHTML = `
            <td>${row.cells[0].innerText}</td>
            <td>${row.cells[1].innerText}</td>
            <td>${row.cells[2].innerText}</td>
            <td>${row.cells[3].innerText}</td>
            <td>${row.cells[4].innerText}</td>
            <td>${row.cells[5].innerText}</td>
            <td>${row.cells[6].innerText}</td>
            <td>${row.cells[7].innerText}</td>
            <td>${row.cells[8].innerText}</td>
            <td>${onaylayan}</td>
            <td>${onayTarihi}</td>
            <td><input type="file" class="dosya"></td>
            <td><button class="kontrolEdildi">Kontrol Edildi</button></td>
            <td><input type="date" class="kontrolTarihi" required></td>
        `;
        row.remove();
    }

    if (e.target.classList.contains("redEt")) {
        const row = e.target.closest("tr");
        alert(`Talep Red Edildi: ${row.cells[0].innerText}`);
        row.remove();
    }
});

// Kontrol Edildi işlemi
kontrolEdilecekTable.addEventListener("click", (e) => {
    if (e.target.classList.contains("kontrolEdildi")) {
        const row = e.target.closest("tr");
        const kontrolEden = prompt("Kontrol eden ismini giriniz:");
        const kontrolTarihi = new Date().toLocaleDateString();
        const dosya = row.querySelector(".dosya").files[0]?.name || "Yüklenmedi";
        const kontrolTarihiInput = row.querySelector(".kontrolTarihi").value;

        if (!kontrolEden) {
            alert("Lütfen kontrol eden bilgisini giriniz.");
            return;
        }

        if (!kontrolTarihiInput) {
            alert("Lütfen kontrol tarihi seçiniz.");
            return;
        }

        const newRow = tamamlanmisTable.insertRow();
        newRow.innerHTML = `
            <td>${row.cells[0].innerText}</td>
            <td>${row.cells[1].innerText}</td>
            <td>${row.cells[2].innerText}</td>
            <td>${row.cells[3].innerText}</td>
            <td>${row.cells[4].innerText}</td>
            <td>${row.cells[5].innerText}</td>
            <td>${row.cells[6].innerText}</td>
            <td>${row.cells[7].innerText}</td>
            <td>${row.cells[8].innerText}</td>
            <td>${row.cells[9].innerText}</td>
            <td>${row.cells[10].innerText}</td>
            <td>${kontrolEden}</td>
            <td>${kontrolTarihiInput}</td>
            <td>${dosya}</td>
            <td><input type="checkbox" checked >E-Fatura</td>
        `;
        row.remove();
    }
});
