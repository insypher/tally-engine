// 1. MASTER ITEM LIST
const rateBook = {};
const defaultInventory = {
  Azzaro: "ROLLS",
  Batik: "ROLLS",
  "Bedsheet 2 Pillow": "PIECES",
  "Bedsheet 4 Pillow": "PIECES",
  "Bed Sheet 58 X 90": "PIECES",
  "Bed Sheet 80 x 90": "PIECES",
  "Bed Sheet Twiga 60x90": "PIECES",
  "Blankets Big": "PIECES",
  "Blanket Small": "PIECES",
  "Blue Chip 44": "ROLLS",
  "Boskey 36": "ROLLS",
  "Boss Pan": "ROLLS",
  "Canvas in Meter Meduim": "METRES",
  "Canvas in Meters Hard": "METRES",
  "Canvas Mix 44": "ROLLS",
  "Canvas Mix 60": "ROLLS",
  Cashmere: "ROLLS",
  "Checks Suiting - 2": "ROLLS",
  "Check Suiting": "ROLLS",
  "Chui Suiting": "ROLLS",
  "C J 10": "ROLLS",
  Coolwool: "ROLLS",
  "Cotton Suiting": "ROLLS",
  "Delta Don": "ROLLS",
  Drill: "ROLLS",
  "Drill 30mtr Mix": "ROLLS",
  "Drill 50mtr": "ROLLS",
  "Drill Nikil Mtr": "METRES",
  "Fancy Suiting": "ROLLS",
  Fuhua: "ROLLS",
  "Gabardine (Roll)": "ROLLS",
  "Galaxy - 2": "ROLLS",
  "Galaxy Spun 58": "ROLLS",
  "Hotel Checks": "ROLLS",
  Hybrid: "ROLLS",
  "India Mix": "ROLLS",
  "India Mix 100 Mtr": "ROLLS",
  "Istem 1": "ROLLS",
  "Istem 2": "ROLLS",
  "Istem 786": "ROLLS",
  "Istem China": "ROLLS",
  "Istem KHK": "ROLLS",
  "Istem Ribbon": "ROLLS",
  "Istem RTL": "ROLLS",
  "John Player": "ROLLS",
  Kaniki: "ROLLS",
  "Kenya Checks ( 30mtr )": "ROLLS",
  "Kenya Suiting": "METRES",
  "Kilimanjaro Twill": "ROLLS",
  "Linning 58": "ROLLS",
  "Madruf 40mtr 36'": "ROLLS",
  "Majesty 58": "ROLLS",
  "Majesty 58 James": "ROLLS",
  "Marekani 60": "ROLLS",
  "Marikani 48": "ROLLS",
  "Milky Dyed 44 30yds": "ROLLS",
  "Milky Dyed 60 60yds": "ROLLS",
  "Milky India 90 30mtr": "ROLLS",
  "Milky White 44": "ROLLS",
  "Minimat 30yds": "ROLLS",
  "Minimat Chinese": "ROLLS",
  "Mix Suiting Meters": "METRES",
  "M - Net": "METRES",
  "Mumtaz 58": "ROLLS",
  Mwaki: "ROLLS",
  Nyota: "ROLLS",
  "Opel White": "ROLLS",
  "Pepsi 58": "ROLLS",
  "P Tex Mix": "ROLLS",
  "RF-5000": "ROLLS",
  "Rotto 42": "ROLLS",
  "Samaki Suiting": "ROLLS",
  "Satan Royal": "ROLLS",
  "Sharting 58": "ROLLS",
  "Shuka 30mtr": "ROLLS",
  "Shuka 50mtr": "ROLLS",
  Simba: "ROLLS",
  "SNZ Fabric": "ROLLS",
  "Stiff 100y": "ROLLS",
  "Stiff 25y": "ROLLS",
  "Stiff 50y": "ROLLS",
  "Stiff Net (WB)": "ROLLS",
  "Stock Lot Indiamix": "ROLLS",
  "Stripe 44": "ROLLS",
  "Tc 44 China": "ROLLS",
  "Tc Checks 44": "ROLLS",
  "Tc Checks 44 (Pan)": "ROLLS",
  "Tc Checks 58": "ROLLS",
  "Tc China 36": "ROLLS",
  "Tc Florida": "ROLLS",
  "Tc India 36": "ROLLS",
  "Tc Korabo": "ROLLS",
  "Tc Kurabo 2": "ROLLS",
  "Tc Malaika 36": "ROLLS",
  Tembo: "ROLLS",
  "Thai Toray Mix": "ROLLS",
  TNH: "ROLLS",
  "Trivera Suiting": "ROLLS",
  TTL: "ROLLS",
  Tuxedo: "ROLLS",
  Twiga: "ROLLS",
  "VIP Checks": "ROLLS",
  "Viscus Masai": "ROLLS",
  "Viscus Mix": "ROLLS",
  "Win Berry": "ROLLS",
  "W.Parker": "ROLLS",
};

let inventoryData =
  JSON.parse(localStorage.getItem("masterInventory")) || defaultInventory;
let masterList = Object.keys(inventoryData);

async function syncFromGitHub() {
  const URL =
    "https://raw.githubusercontent.com/insypher/tally-engine/refs/heads/main/items.json";
  try {
    const response = await fetch(URL);
    const data = await response.json(); // Expected format: {"Azzaro": "ROLLS", "Batik": "ROLLS"}

    localStorage.setItem("masterInventory", JSON.stringify(data));
    alert("Master list and Units synced!");
    location.reload();
  } catch (error) {
    alert("Sync failed! Check your internet or GitHub URL.");
  }
}

// Use this for your search logic:
let focusedIndex = -1;

// 1. NAVIGATION (Only triggered by KEYDOWN)
function handleNavigation(e) {
  const results = document.getElementById("searchResults");
  const items = results.querySelectorAll(".result-item");
  if (items.length === 0) return;

  if (e.key === "ArrowDown") {
    e.preventDefault();
    focusedIndex = (focusedIndex + 1) % items.length;
    updateHighlight(items);
  } else if (e.key === "ArrowUp") {
    e.preventDefault();
    focusedIndex = (focusedIndex - 1 + items.length) % items.length;
    updateHighlight(items);
  } else if (e.key === "Enter") {
    if (focusedIndex >= 0 && items[focusedIndex]) {
      e.preventDefault();
      items[focusedIndex].click();
    }
  }
}

function updateHighlight(items) {
  items.forEach((el, idx) => {
    if (idx === focusedIndex) {
      el.classList.add("result-active");
      el.scrollIntoView({ block: "nearest" });
    } else {
      el.classList.remove("result-active");
    }
  });
}

// 2. SEARCH (Only triggered by KEYUP)
function handleSearch(e) {
  // Ignore navigation keys here
  if (e.key === "ArrowDown" || e.key === "ArrowUp" || e.key === "Enter") return;

  const searchInput = document.getElementById("masterSearch");
  const results = document.getElementById("searchResults");
  const val = searchInput.value.toLowerCase();

  // Reset focus ONLY when typing new characters
  focusedIndex = -1;

  results.innerHTML = "";
  if (!val) return;

  masterList
    .filter((i) => i.toLowerCase().includes(val))
    .forEach((item) => {
      const div = document.createElement("div");
      div.className = "result-item";
      div.innerText = item;
      div.onclick = () => {
        addItem(item, "0000");
        searchInput.value = "";
        results.innerHTML = "";
      };
      results.appendChild(div);
    });
}

function addItem(name, qty = 0) {
  const tbody = document.getElementById("activeItems");
  const row = document.createElement("tr");

  // Store the clean name in a data attribute
  row.setAttribute("data-name", name);

  const unit = inventoryData[name] || "ROLLS";
  const savedBook = JSON.parse(localStorage.getItem("tallyRateBook") || "{}");
  const savedRate = savedBook[name] ? savedBook[name].toFixed(2) : "0.00";

  row.innerHTML = `
      <td>${name} <small style="color: #666;">[${unit}]</small></td>
      <td><input type="number" class="qty" value="${qty}" oninput="calc()"></td>
      <td><input type="number" class="rate" value="${savedRate}" oninput="calc()"></td>
      <td class="row-total">0</td>
      <td><button class="btn-terminal" onclick="this.parentElement.parentElement.remove(); calc()">X</button></td>
  `;
  tbody.appendChild(row);
  calc();
}

// 3. CALCULATION ENGINE
function calc() {
  let grand = 0;
  document.querySelectorAll("#activeItems tr").forEach((row) => {
    const q = row.querySelector(".qty").value || 0;
    const r = row.querySelector(".rate").value || 0;
    const total = q * r;
    row.querySelector(".row-total").innerText = total.toLocaleString();
    grand += total;
  });
  document.getElementById("totalCubits").innerText =
    `TZS ${grand.toLocaleString()}`;
}

function GenerateXML() {
  const comp = document.getElementById("companyName").value;
  const destGodown = document.getElementById("destGodown").value;
  const srcGodown = document.getElementById("srcGodown").value;
  const date = document.getElementById("voucherDate").value.replace(/-/g, "");
  const nar = document.getElementById("narrationInput").value;

  let mastersXml = "";
  let vouchersXml = "";
  let addedMasters = new Set();

  document.querySelectorAll("#activeItems tr").forEach((row) => {
    // FIX: Read the clean name from the attribute, not the cell text
    const name = row.getAttribute("data-name");
    const qty = parseFloat(row.querySelector(".qty").value) || 0;
    const rate = parseFloat(row.querySelector(".rate").value) || 0;

    // Now this lookup will find "PIECES" because 'name' is just "Bedsheet 2 Pillow"
    const unit = inventoryData[name] || "ROLLS";

    if (qty <= 0) return;

    // 1. Accumulate Masters (Updated with dynamic unit)
    if (!addedMasters.has(name)) {
      mastersXml += `<TALLYMESSAGE xmlns:UDF="TallyUDF"><STOCKITEM NAME="${name}" ACTION="Create"><NAME>${name}</NAME><BASEUNITS>${unit}</BASEUNITS></STOCKITEM></TALLYMESSAGE>`;
      addedMasters.add(name);
    }

    // 2. Accumulate Vouchers (Replaced "ROLLS" with ${unit})
    vouchersXml += `
    <TALLYMESSAGE xmlns:UDF="TallyUDF">
      <VOUCHER VCHTYPE="Stock Journal" ACTION="Create">
        <DATE>${date}</DATE>
        <VOUCHERTYPENAME>Stock Journal</VOUCHERTYPENAME>
        <NARRATION>${nar}</NARRATION>
        <INVENTORYENTRIESIN.LIST>
          <STOCKITEMNAME>${name}</STOCKITEMNAME>
          <ISDEEMEDPOSITIVE>Yes</ISDEEMEDPOSITIVE>
          <RATE>${rate.toFixed(2)}/${unit}</RATE>
          <AMOUNT>-${(qty * rate).toFixed(2)}</AMOUNT>
          <ACTUALQTY>${qty} ${unit}</ACTUALQTY>
          <BILLEDQTY>${qty} ${unit}</BILLEDQTY>
          <BATCHALLOCATIONS.LIST>
            <GODOWNNAME>${destGodown}</GODOWNNAME>
            <BATCHNAME>Primary Batch</BATCHNAME>
            <AMOUNT>-${(qty * rate).toFixed(2)}</AMOUNT>
            <ACTUALQTY>${qty} ${unit}</ACTUALQTY>
            <BILLEDQTY>${qty} ${unit}</BILLEDQTY>
          </BATCHALLOCATIONS.LIST>
        </INVENTORYENTRIESIN.LIST>
        <INVENTORYENTRIESOUT.LIST>
          <STOCKITEMNAME>${name}</STOCKITEMNAME>
          <ISDEEMEDPOSITIVE>No</ISDEEMEDPOSITIVE>
          <RATE>${rate.toFixed(2)}/${unit}</RATE>
          <AMOUNT>${(qty * rate).toFixed(2)}</AMOUNT>
          <ACTUALQTY>${qty} ${unit}</ACTUALQTY>
          <BILLEDQTY>${qty} ${unit}</BILLEDQTY>
          <BATCHALLOCATIONS.LIST>
            <GODOWNNAME>${srcGodown}</GODOWNNAME>
            <BATCHNAME>Primary Batch</BATCHNAME>
            <AMOUNT>${(qty * rate).toFixed(2)}</AMOUNT>
            <ACTUALQTY>${qty} ${unit}</ACTUALQTY>
            <BILLEDQTY>${qty} ${unit}</BILLEDQTY>
          </BATCHALLOCATIONS.LIST>
        </INVENTORYENTRIESOUT.LIST>
      </VOUCHER>
    </TALLYMESSAGE>`;
  });

  const xml = `<ENVELOPE>
    <HEADER><TALLYREQUEST>Import Data</TALLYREQUEST></HEADER>
    <BODY>
        <IMPORTDATA>
            <REQUESTDESC><REPORTNAME>Vouchers</REPORTNAME><STATICVARIABLES><SVCURRENTCOMPANY>${comp}</SVCURRENTCOMPANY></STATICVARIABLES></REQUESTDESC>
            <REQUESTDATA>${mastersXml}${vouchersXml}</REQUESTDATA>
        </IMPORTDATA>
    </BODY>
</ENVELOPE>`;

  document.getElementById("xmlResult").value = xml;
}
// 5. EXCEL IMPORT ENGINE
function importExcel(event) {
  const file = event.target.files[0];
  const reader = new FileReader();
  reader.onload = function (e) {
    const data = new Uint8Array(e.target.result);
    const workbook = XLSX.read(data, { type: "array" });
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const rows = XLSX.utils.sheet_to_json(sheet, { header: 1, range: 6 });

    let updatedRates = {};

    rows.forEach((row, index) => {
      if (index === 0) return;
      const itemName = row[0]; // Column A
      const rateVal = parseFloat(row[2]); // Column C

      if (itemName && !isNaN(rateVal)) {
        updatedRates[itemName] = rateVal;
      }
    });

    // Save to browser memory permanently
    localStorage.setItem("tallyRateBook", JSON.stringify(updatedRates));

    alert("Rates updated and saved to browser memory!");
  };
  reader.readAsArrayBuffer(file);
}

// 6. DOWNLOAD ENGINE
function DownloadXML() {
  const xml = document.getElementById("xmlResult").value;
  if (!xml) return alert("Generate XML first!");

  // 1. Get current date and time
  const now = new Date();

  // 2. Adjust for GMT+3 (3 hours * 60 minutes * 60 seconds * 1000 milliseconds)
  const gmtPlus3 = new Date(now.getTime() + 3 * 60 * 60 * 1000);

  // 3. Format as YYYY-MM-DD_HH-mm-ss
  // We use .toISOString().slice(0, 19) but replace the 'T' and ':' for a clean filename
  const ts = gmtPlus3
    .toISOString()
    .replace(/T/, "_")
    .replace(/:/g, "-")
    .slice(0, 19);

  const blob = new Blob([xml], { type: "text/xml" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);

  // Example result: Tally_Transfer_2026-06-05_14-23-01.xml
  link.download = `Stock_Journal_${ts}.xml`;
  link.click();
}
window.addEventListener("load", () => {
  const now = new Date();

  const gmtPlus3 = new Date(now.getTime() + 3 * 60 * 60 * 1000);

  // HTML input needs YYYY-MM-DD

  document.getElementById("voucherDate").value = gmtPlus3

    .toISOString()

    .split("T")[0];
});
