let chart, audioContext, oscillator, analyser, bufferLength, dataArray;

function updateChart() {
    const ctx = document.getElementById("responseChart").getContext("2d");
    const R = parseFloat(document.getElementById("rValue").value);
    const C = parseFloat(document.getElementById("cValue").value) * 1e-6;
    let fc = parseFloat(document.getElementById("fcValue").value);
    
    fc = 1 / (2 * Math.PI * R * C);
    document.getElementById("fcValue").value = fc.toFixed(2);

    const data = [];
    for (let f = fc / 10; f <= fc * 10; f += (fc * 10 - fc / 10) / 200) {
        const omega = 2 * Math.PI * f;
        const gain = Math.sqrt(1 / (1 + Math.pow(omega * R * C, 2)));
        const gainDb = 20 * Math.log10(gain);
        data.push({ x: f, y: gainDb });
    }

    if (chart) chart.destroy();
    chart = new Chart(ctx, {
        type: "line",
        data: {
            labels: data.map(point => point.x),
            datasets: [{
                label: "Gain (dB)",
                data: data,
                borderColor: "blue",
                borderWidth: 2,
                fill: false,
                pointRadius: 0
            }]
        },
        options: {
            responsive: true,
            animation: false,
            scales: {
                x: { type: "linear", title: { display: true, text: "Frequency (Hz)" } },
                y: { title: { display: true, text: "Gain (dB)" }, min: -40, max: 0 }
            }
        }
    });

    startOscilloscope(fc);
}

function startOscilloscope(frequency) {
    if (audioContext) {
        oscillator.stop();
        audioContext.close();
    }

    audioContext = new (window.AudioContext || window.webkitAudioContext)();
    oscillator = audioContext.createOscillator();
    analyser = audioContext.createAnalyser();

    oscillator.type = "sine";
    oscillator.frequency.value = frequency;
    oscillator.connect(analyser);
    analyser.connect(audioContext.destination);
    oscillator.start();

    bufferLength = analyser.frequencyBinCount;
    dataArray = new Uint8Array(bufferLength);
    drawOscilloscope();
}

function drawOscilloscope() {
    const oscCanvas = document.getElementById("oscilloscopeCanvas");
    const oscCtx = oscCanvas.getContext("2d");

    function update() {
        requestAnimationFrame(update);
        analyser.getByteTimeDomainData(dataArray);

        oscCtx.clearRect(0, 0, oscCanvas.width, oscCanvas.height);
        oscCtx.beginPath();

        const sliceWidth = oscCanvas.width / bufferLength;
        let x = 0;

        for (let i = 0; i < bufferLength; i++) {
            let y = (dataArray[i] / 255) * oscCanvas.height;
            if (i === 0) {
                oscCtx.moveTo(x, y);
            } else {
                oscCtx.lineTo(x, y);
            }
            x += sliceWidth;
        }

        oscCtx.strokeStyle = "green";
        oscCtx.lineWidth = 2;
        oscCtx.stroke();
    }
    update();
}

document.getElementById("rSlider").addEventListener("input", (e) => {
    document.getElementById("rValue").value = e.target.value;
    updateChart();
});

document.getElementById("cSlider").addEventListener("input", (e) => {
    document.getElementById("cValue").value = e.target.value;
    updateChart();
});

updateChart();
