let timerInterval;
let seconds = 0;

// Iniciar cronômetro
document.getElementById('startButton').addEventListener('click', function() {
    seconds = 0; // Resetar o cronômetro
    timerInterval = setInterval(function() {
        seconds++;
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        document.getElementById('timer').innerText = `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;

        // Mudar cores conforme o tempo
        if (minutes < 2) {
            document.getElementById('timer').style.color = '#FF0000'; // Vermelho durante o aquecimento
        } else {
            document.getElementById('timer').style.color = '#00FF00'; // Verde ao final
        }
    }, 1000);
});

// Analisar dados da tabela preliminar
document.getElementById('analyzeButton').addEventListener('click', function() {
    const rows = document.querySelectorAll('#preliminary-table tbody tr');
    
    rows.forEach((row, index) => {
        const fc = row.querySelectorAll('input')[0].value || 'N/A';
        const pse = row.querySelectorAll('input')[1].value || 'N/A';

        // Atualiza a tabela do Protocolo MMA
        document.getElementById(`fc-aquecimento`).value = fc; // Exemplo para Aquecimento
        document.getElementById(`pse-aquecimento`).value = pse; // Exemplo para Aquecimento

        // Aqui, você pode adicionar lógica para preencher os campos correspondentes nas linhas corretas
    });

    // Exibir o botão de imprimir
    document.getElementById('printButton').style.display = 'inline-block';
});

// Função para mostrar o gráfico em pop-up (você pode implementar a lógica do gráfico aqui)
function showGraph() {
    const popUp = document.getElementById('graph-popup');
    popUp.style.display = 'block';
}

// Função para fechar o pop-up
function closeGraph() {
    const popUp = document.getElementById('graph-popup');
    popUp.style.display = 'none';
}

// Adicionar evento de clique no botão de imprimir
document.getElementById('printButton').addEventListener('click', function() {
    window.print();
});
