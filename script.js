let startTime;
let timerInterval;
let pausedTime;
let isPaused = false;

const startButton = document.getElementById("startButton");
const pauseButton = document.getElementById("pauseButton");
const analyzeButton = document.getElementById("analyzeButton");
const timerDisplay = document.getElementById("timer");
const resultsDiv = document.getElementById("results");

startButton.addEventListener("click", function() {
    if (!isPaused) {
        startTime = Date.now();
    } else {
        startTime = Date.now() - pausedTime;
    }
    timerInterval = setInterval(updateTimer, 1000);
    analyzeButton.disabled = false;
    startButton.disabled = true;
    pauseButton.disabled = false;
});

pauseButton.addEventListener("click", function() {
    clearInterval(timerInterval);
    pausedTime = Date.now() - startTime;
    isPaused = true;
    startButton.disabled = false;
    pauseButton.disabled = true;
});

function updateTimer() {
    const elapsedTime = Date.now() - startTime;
    const totalHours = Math.floor(elapsedTime / 3600000);
    const totalMinutes = Math.floor((elapsedTime % 3600000) / 60000);
    const totalSeconds = Math.floor((elapsedTime % 60000) / 1000);

    timerDisplay.textContent = `${pad(totalHours)}:${pad(totalMinutes)}:${pad(totalSeconds)}`;
}

function pad(unit) {
    return unit.toString().padStart(2, "0");
}

analyzeButton.addEventListener("click", function() {
    clearInterval(timerInterval);

    // Coletar os valores da tabela
    const phases = ['warmup', 'cad1', 'cad2', 'cad3', 'cad4', 'cooldown'];
    resultsDiv.innerHTML = "<h3>Resultados da Análise</h3><ul>";

    phases.forEach(phase => {
        const fcValue = document.querySelector(`input[name="fc-${phase}"]`).value || 'N/A';
        const borgValue = document.querySelector(`input[name="borg-${phase}"]`).value || 'N/A';
        resultsDiv.innerHTML += `<li>${phase.toUpperCase()}: FC: ${fcValue}, Borg: ${borgValue}</li>`;
    });

    resultsDiv.innerHTML += "</ul>";
});
