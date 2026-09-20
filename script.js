// Spec Showcase Dataset
const vehicles = [
  {
    id: "r15",
    name: "Yamaha YZF-R15 V4",
    category: "Superbike",
    engine: "155cc, Liquid-Cooled, SOHC, 4-Valve, VVA",
    power: "18.4 PS @ 10,000 RPM",
    torque: "14.2 Nm @ 7,500 RPM",
    topSpeed: "140 km/h",
    weight: "142 kg",
    features: ["Variable Valve Actuation (VVA)", "Assist & Slipper Clutch", "Traction Control System"]
  },
  {
    id: "duke390",
    name: "KTM Duke 390",
    category: "Sports Roadster",
    engine: "398.7cc, Single Cylinder, Liquid-Cooled",
    power: "46 PS @ 8,500 RPM",
    torque: "39 Nm @ 6,500 RPM",
    topSpeed: "167 km/h",
    weight: "168 kg",
    features: ["Cornering ABS", "Launch Control", "5-inch TFT Display with Navigation"]
  },
  {
    id: "classic350",
    name: "Royal Enfield Classic 350",
    category: "Modern Classic",
    engine: "349cc, Air-Oil Cooled, 4-Stroke, Single Cylinder",
    power: "20.2 PS @ 6,100 RPM",
    torque: "27 Nm @ 4,000 RPM",
    topSpeed: "115 km/h",
    weight: "195 kg",
    features: ["J-series Engine", "Dual-Channel ABS", "Tripper Navigation Unit"]
  }
];

// Track Selected Vehicles for Comparison
let selectedIds = [];

// DOM Elements
const showcaseGrid = document.getElementById("showcase");
const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");
const specModal = document.getElementById("specModal");
const modalDetails = document.getElementById("modalDetails");
const compareBar = document.getElementById("compareBar");
const compareCount = document.getElementById("compareCount");
const compareBtn = document.getElementById("compareBtn");
const compareModal = document.getElementById("compareModal");
const compareTableContainer = document.getElementById("compareTableContainer");
const toggleFormBtn = document.getElementById("toggleFormBtn");
const addVehicleForm = document.getElementById("addVehicleForm");

// Render Cards
function renderCards(data) {
  showcaseGrid.innerHTML = "";

  if (data.length === 0) {
    showcaseGrid.innerHTML = `<p class="no-results">No specs found matching your criteria.</p>`;
    return;
  }

  data.forEach((item) => {
    const isChecked = selectedIds.includes(item.id) ? "checked" : "";
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <div class="card-header">
        <div class="card-top-row">
          <span class="badge">${item.category}</span>
          <label class="compare-checkbox-label">
            <input type="checkbox" ${isChecked} onchange="toggleCompare('${item.id}')"> Select
          </label>
        </div>
        <h3>${item.name}</h3>
      </div>
      <div class="card-body">
        <p><strong>Engine:</strong> ${item.engine}</p>
        <p><strong>Power:</strong> ${item.power}</p>
        <p><strong>Top Speed:</strong> ${item.topSpeed}</p>
      </div>
      <div class="card-footer">
        <button class="spec-btn" onclick="openSpecModal('${item.id}')">View Detailed Specs</button>
      </div>
    `;
    showcaseGrid.appendChild(card);
  });
}

// Toggle Selection for Comparison
window.toggleCompare = function (id) {
  if (selectedIds.includes(id)) {
    selectedIds = selectedIds.filter((item) => item !== id);
  } else {
    if (selectedIds.length >= 3) {
      alert("You can compare up to 3 vehicles at a time.");
      filterVehicles();
      return;
    }
    selectedIds.push(id);
  }
  updateCompareBar();
};

function updateCompareBar() {
  const count = selectedIds.length;
  compareCount.textContent = `${count} vehicle${count === 1 ? "" : "s"} selected for comparison`;

  if (count > 0) {
    compareBar.classList.add("active");
  } else {
    compareBar.classList.remove("active");
  }

  compareBtn.disabled = count < 2;
}

// Search & Filter Logic
function filterVehicles() {
  const searchTerm = searchInput.value.toLowerCase().trim();
  const selectedCategory = categoryFilter.value;

  const filtered = vehicles.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm) ||
      item.engine.toLowerCase().includes(searchTerm);

    const matchesCategory =
      selectedCategory === "all" || item.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  renderCards(filtered);
}

// Open Detail Modal
window.openSpecModal = function (id) {
  const item = vehicles.find((v) => v.id === id);
  if (!item) return;

  const featuresList = item.features
    .map((feature) => `<li>${feature}</li>`)
    .join("");

  modalDetails.innerHTML = `
    <h2>${item.name}</h2>
    <p class="badge" style="margin-top: 0.5rem;">${item.category}</p>
    <hr style="border-color: var(--border); margin: 1rem 0;">
    <p><strong>Engine Specs:</strong> ${item.engine}</p>
    <p><strong>Max Power:</strong> ${item.power}</p>
    <p><strong>Peak Torque:</strong> ${item.torque}</p>
    <p><strong>Top Speed:</strong> ${item.topSpeed}</p>
    <p><strong>Kerb Weight:</strong> ${item.weight}</p>
    <h4 style="margin-top: 1rem; color: var(--primary);">Key Technology & Features:</h4>
    <ul style="padding-left: 1.2rem; color: var(--text-muted); margin-top: 0.5rem;">
      ${featuresList}
    </ul>
  `;

  specModal.style.display = "flex";
};

// Generate Comparison Table
compareBtn.addEventListener("click", () => {
  const selectedVehicles = vehicles.filter((v) => selectedIds.includes(v.id));

  let tableHTML = `
    <table class="compare-table">
      <thead>
        <tr>
          <th>Specification</th>
          ${selectedVehicles.map((v) => `<th>${v.name}</th>`).join("")}
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>Category</strong></td>
          ${selectedVehicles.map((v) => `<td>${v.category}</td>`).join("")}
        </tr>
        <tr>
          <td><strong>Engine</strong></td>
          ${selectedVehicles.map((v) => `<td>${v.engine}</td>`).join("")}
        </tr>
        <tr>
          <td><strong>Power</strong></td>
          ${selectedVehicles.map((v) => `<td>${v.power}</td>`).join("")}
        </tr>
        <tr>
          <td><strong>Torque</strong></td>
          ${selectedVehicles.map((v) => `<td>${v.torque}</td>`).join("")}
        </tr>
        <tr>
          <td><strong>Top Speed</strong></td>
          ${selectedVehicles.map((v) => `<td>${v.topSpeed}</td>`).join("")}
        </tr>
        <tr>
          <td><strong>Kerb Weight</strong></td>
          ${selectedVehicles.map((v) => `<td>${v.weight}</td>`).join("")}
        </tr>
      </tbody>
    </table>
  `;

  compareTableContainer.innerHTML = tableHTML;
  compareModal.style.display = "flex";
});

// Form Toggle & Submission
toggleFormBtn.addEventListener("click", () => {
  addVehicleForm.classList.toggle("hidden");
  toggleFormBtn.textContent = addVehicleForm.classList.contains("hidden")
    ? "+ Add New Vehicle"
    : "- Close Form";
});

addVehicleForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("vName").value;
  const category = document.getElementById("vCategory").value;
  const engine = document.getElementById("vEngine").value;
  const power = document.getElementById("vPower").value;
  const torque = document.getElementById("vTorque").value;
  const topSpeed = document.getElementById("vTopSpeed").value;
  const weight = document.getElementById("vWeight").value;
  const featuresInput = document.getElementById("vFeatures").value;

  const features = featuresInput.split(",").map((f) => f.trim()).filter((f) => f.length > 0);

  const newVehicle = {
    id: "custom_" + Date.now(),
    name,
    category,
    engine,
    power,
    torque,
    topSpeed,
    weight,
    features
  };

  vehicles.unshift(newVehicle);
  filterVehicles();
  addVehicleForm.reset();
  addVehicleForm.classList.add("hidden");
  toggleFormBtn.textContent = "+ Add New Vehicle";
});

// Event Listeners for Filters & Modal Close
searchInput.addEventListener("input", filterVehicles);
categoryFilter.addEventListener("change", filterVehicles);

document.querySelectorAll(".close-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    specModal.style.display = "none";
    compareModal.style.display = "none";
  });
});

window.addEventListener("click", (e) => {
  if (e.target === specModal) specModal.style.display = "none";
  if (e.target === compareModal) compareModal.style.display = "none";
});

// Initial Render
document.addEventListener("DOMContentLoaded", () => {
  renderCards(vehicles);
});