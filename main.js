//Your JavaScript goes in here
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
  const baseValue = parseFloat(capacitorInput.value);
  const multiplier = parseFloat(capUnitSelect.value);
  return baseValue * multiplier;
}

function updateFrequencyResponse() {
  const R = parseFloat(resistorInput.value);
  const C = getCapacitanceInFarads();
  let f0 = parseFloat(centerFreqInput.value);

  if (isNaN(R) || isNaN(C) || R === 0 || C === 0) return;

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

  updateOscilloscope();
  generateAudio();
}

function updateOscilloscope() {
  const t = [], Vin = [], Vout = [];
  const R = parseFloat(resistorInput.value);
  const C = getCapacitanceInFarads();
  const f = parseFloat(oscFreqInput.value);
  const f0 = parseFloat(centerFreqInput.value);
  const dt = 0.0001;
  const totalTime = 0.01;

  for (let i = 0; i < totalTime / dt; i++) {
    let time = i * dt;
    t.push(time * 1000);
    let input = Math.sin(2 * Math.PI * f * time);
    let gain = 1 / (1 + Math.pow((f / f0 - f0 / f), 2));
    let output = input * gain;
    Vin.push(input);
    Vout.push(output);
  }

  oscChart.data.labels = t;
  oscChart.data.datasets[0].data = Vin;
  oscChart.data.datasets[1].data = Vout;
  oscChart.update();
}

function exportChartAsImage() {
  const link = document.createElement('a');
  link.download = 'frequency_response.png';
  link.href = document.getElementById("responseChart").toDataURL("image/png");
  link.click();
}

function exportDataAsCSV() {
  let csv = "Frequency (Hz),Gain\n";
  chart.data.labels.forEach((f, i) => {
    csv += ${f},${chart.data.datasets[0].data[i]}\n;
  });
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "band_reject_data.csv";
  a.click();
  URL.revokeObjectURL(url);
}

function exportOscilloscopeAsImage() {
  const link = document.createElement('a');
  link.download = 'oscilloscope_waveform.png';
  link.href = document.getElementById("oscilloscope").toDataURL("image/png");
  link.click();
}

function generateAudio() {
  const ctx = new (window.AudioContext || window.webkitAudioContext)();
  const osc = ctx.createOscillator();
  const gainNode = ctx.createGain();
  const freq = parseFloat(oscFreqInput.value);
  osc.type = "sine";
  osc.frequency.setValueAtTime(freq, ctx.currentTime);
  osc.connect(gainNode);
  gainNode.connect(ctx.destination);
  osc.start();
  setTimeout(() => osc.stop(), 1000);

  const dest = ctx.createMediaStreamDestination();
  gainNode.connect(dest);
  const audio = document.getElementById("audioOutput");
  audio.srcObject = dest.stream;
}

function setupChart() {
  const ctx = document.getElementById("responseChart").getContext("2d");
  chart = new Chart(ctx, {
    type: "line",
    data: {
      labels: [],
      datasets: [{
        label: "Gain vs Frequency",
        borderColor: "#e74c3c",
        data: [],
        fill: false,
      }]
    },
    options: {
      responsive: true,
      scales: {
        x: { type: 'linear', title: { display: true, text: 'Frequency (Hz)' } },
        y: { title: { display: true, text: 'Gain' }, min: 0, max: 1.2 }
      },
      plugins: {
        zoom: {
          pan: { enabled: true },
          zoom: { wheel: { enabled: true } }
        }
      }
    }
  });

  const osc = document.getElementById("oscilloscope").getContext("2d");
  oscChart = new Chart(osc, {
    type: "line",
    data: {
      labels: [],
      datasets: [
        { label: "Input Signal", borderColor: "#2980b9", data: [], fill: false },
        { label: "Output Signal", borderColor: "#27ae60", data: [], fill: false }
      ]
    },
    options: {
      responsive: true,
      animation: false,
      scales: {
        x: { title: { display: true, text: 'Time (ms)' } },
        y: { title: { display: true, text: 'Voltage (V)' }, min: -1.5, max: 1.5 }
      }
    }
  });
}

[resistorInput, capacitorInput, capUnitSelect, centerFreqInput, autoMode, oscFreqInput].forEach(input => {
  input.addEventListener("input", updateFrequencyResponse);
});

freqSlider.addEventListener("input", () => {
  rangeValue.textContent = freqSlider.value;
  updateFrequencyResponse();
});

setupChart();
updateFrequencyResponse();
