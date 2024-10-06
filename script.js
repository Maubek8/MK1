let startTime;
let timerInterval;

const startButton = document.getElementById("startButton");
const analyzeButton = document.getElementById("analyzeButton");
const timerDisplay = document.getElementById("timer");

startButton.addEventListener("click", function() {
    startTime = Date.now();
    timerInterval = setInterval(updateTimer, 1000);
    analyzeButton.disabled = false;
    startButton.disabled = true;
});

function updateTimer() {
    const elapsedTime = Date.now() - startTime;
    const totalSeconds = Math.floor(elapsedTime / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    timerDisplay.textContent = `${pad(minutes)}:${pad(seconds)}`;
}

function pad(unit) {
    return unit.toString().padStart(2, "0");
}

analyzeButton.addEventListener("click", function() {
    clearInterval(timerInterval);
    alert("Analisando os dados do protocolo...");
    // Aqui você pode adicionar a lógica de análise para o protocolo VO2-VT.
});
