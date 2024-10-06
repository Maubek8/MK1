let startTime;
let timerInterval;
let pausedTime;
let isPaused = false;

const startButton = document.getElementById("startButton");
const pauseButton = document.getElementById("pauseButton");
const analyzeButton = document.getElementById("analyzeButton");
const timerDisplay = document.getElementById("timer");

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
    document.body.style.backgroundColor = "#FFFFFF"; // Branco quando começa
});

pauseButton.addEventListener("click", function() {
    clearInterval(timerInterval);
    pausedTime = Date.now() - startTime;
    isPaused = true;
    startButton.disabled = false;
    pauseButton.disabled = true;
    document.body.style.backgroundColor = "#FFEB3B"; // Amarelo para pausa
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
    document.body.style.backgroundColor = "#4CAF50"; // Verde ao terminar
    alert("Analisando os dados do protocolo...");
    // Aqui você pode adicionar a lógica de análise para o protocolo VO2-VT.
});
