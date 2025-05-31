const resistorInput = document.getElementById("resistor");
const capacitorInput = document.getElementById("capacitor");
const capUnitSelect = document.getElementById("capUnit");
const centerFreqInput = document.getElementById("centerFreq");
const autoMode = document.getElementById("autoMode");
const freqSlider = document.getElementById("frequencyRange");
const rangeValue = document.getElementById("rangeValue");
const oscFreqInput = document.getElementById("oscFreq");
let chart, oscChart;

function getCapacitanceInFarads() {
  return parseFloat(capacitorInput.value) * parseFloat(capUnitSelect.value);
}

function updateFrequencyResponse() {
  const R = parseFloat(resistorInput.value);
  const C = getCapacitanceInFarads();
  let f0 = parseFloat(centerFreqInput.value);
  if (autoMode.checked) {
    f0 = 1 / (2 * Math.PI * R * C);
    centerFreqInput.value = f0.toFixed(2);
  }
  const maxFreq = parseFloat(freqSlider.value);
  const frequencies = [];
  const gain = [];
  for (let f = 10; f <= maxFreq; f += 10) {
    const omega = 2 * Math.PI * f;
    const omega0 = 2 * Math.PI * f0;
    const Q = 1;
    const H = 1 / (1 + Q * (omega0 / omega - omega / omega0));
    frequencies.push(f);
    gain.push(Math.abs(H));
  }
  chart.data.labels = frequencies;
  chart.data.datasets[0].data = gain;
  chart.update();
}

function setupChart() {
  const ctx = document.getElementById("responseChart").getContext("2d");
  chart = new Chart(ctx, {
    type: "line",
    data: { labels: [], datasets: [{ label: "Gain vs Frequency", borderColor: "#e74c3c", data: [], fill: false }] },
    options: { responsive: true, scales: { x: { type: "linear", title: { display: true, text: "Frequency (Hz)" } }, y: { title: { display: true, text: "Gain" }, min: 0, max: 1.2 } } }
  });
}

setupChart();
updateFrequencyResponse();
