let timerInterval;
let seconds = 0;
let currentPhase = 0;
let isRunning = false;

// Fases do protocolo
const phases = [
    { name: 'Aquecimento', duration: 120, color: '#FF0000' }, // 2 minutos
    { name: 'Incremento 1', duration: 60, color: '#FFA500' }, // 1 minuto
    { name: 'Incremento 2', duration: 60, color: '#FFFF00' }, // 1 minuto
    { name: 'Incremento 3', duration: 60, color: '#008000' }, // 1 minuto
    { name: 'Resfriamento', duration: 120, color: '#0000FF' } // 2 minutos
];

// Fórmula para calcular a FC máxima (220 - idade)
function calcularFcMaxima(idade) {
    return 220 - idade;
}

// Função para calcular a FC estimada para cada fase com base na %FC máxima
function calcularFcEstimada(idade, porcentagem) {
    const fcMax = calcularFcMaxima(idade);
    return Math.round(fcMax * (porcentagem / 100));
}

// Função para atualizar as FC estimadas na tabela com base na idade do atleta
function atualizarFcEstimadas() {
    const idade = parseInt(document.getElementById('age').value);

    document.getElementById('fc-estimada-aquecimento').innerText = `${calcularFcEstimada(idade, 50)}-${calcularFcEstimada(idade, 60)}`;
    document.getElementById('fc-estimada-incremento1').innerText = `${calcularFcEstimada(idade, 60)}-${calcularFcEstimada(idade, 70)}`;
    document.getElementById('fc-estimada-incremento2').innerText = `${calcularFcEstimada(idade, 70)}-${calcularFcEstimada(idade, 80)}`;
    document.getElementById('fc-estimada-incremento3').innerText = `${calcularFcEstimada(idade, 80)}-${calcularFcEstimada(idade, 90)}`;
    document.getElementById('fc-estimada-resfriamento').innerText = `${calcularFcEstimada(idade, 50)}-${calcularFcEstimada(idade, 60)}`;
}

// Função para iniciar o cronômetro
function startTimer() {
    if (isRunning) return;
    isRunning = true;
    clearInterval(timerInterval);
    seconds = 0;
    currentPhase = 0;
    updatePhase();

    timerInterval = setInterval(function () {
        seconds++;

        const hrs = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        document.getElementById('timer').innerText = `${String(hrs).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;

        if (seconds >= phases[currentPhase].duration) {
            currentPhase++;
            if (currentPhase < phases.length) {
                seconds = 0;
                updatePhase();
                showPhaseMessage(`Prepare-se para ${phases[currentPhase].name}`);
            } else {
                clearInterval(timerInterval);
                isRunning = false;
                showPhaseMessage("Protocolo concluído!");
            }
        }
    }, 1000); // Atualização a cada segundo
}

// Função para atualizar a cor da fase e exibir fase atual
function updatePhase() {
    document.getElementById('timer').style.color = phases[currentPhase].color;
    document.getElementById('phase-message').innerText = `Fase Atual: ${phases[currentPhase].name}`;
}

// Função para exibir mensagem sobre a fase atual
function showPhaseMessage(message) {
    const phaseMessageElement = document.getElementById('phase-message');
    phaseMessageElement.innerText = message;
    phaseMessageElement.style.display = 'block';
    setTimeout(() => {
        phaseMessageElement.style.display = 'none';
    }, 5000); // Oculta após 5 segundos
}

// Função para analisar os dados e parar o cronômetro
function analyzeData() {
    clearInterval(timerInterval); // Para o cronômetro
    isRunning = false; // Garante que o cronômetro pare
    document.getElementById('printButton').style.display = 'inline-block';
    alert("Dados analisados. Pronto para impressão.");
}

// Função para imprimir o protocolo
function printProtocol() {
    window.print();
}

// Atualizar FC estimada ao mudar a idade
document.getElementById('age').addEventListener('input', atualizarFcEstimadas);

// Eventos dos botões
document.getElementById('startButton').addEventListener('click', startTimer);
document.getElementById('analyzeButton').addEventListener('click', analyzeData);
document.getElementById('printButton').addEventListener('click', printProtocol);

// Inicializar as FC estimadas ao carregar a página
window.onload = atualizarFcEstimadas;
