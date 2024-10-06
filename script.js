document.getElementById('analyzeButton').addEventListener('click', function() {
    // Coleta dos dados da Tabela Preliminar
    const rows = document.querySelectorAll('#preliminary-table tbody tr');
    const detailedTable = document.querySelector('#detailed-table tbody');
    const detailedHeader = document.getElementById('detailed-header');
    const printButton = document.getElementById('printButton');

    // Limpa a tabela detalhada
    detailedTable.innerHTML = '';

    rows.forEach((row, index) => {
        const fc = row.querySelectorAll('input')[0].value || 'N/A';
        const pse = row.querySelectorAll('input')[1].value || 'N/A';
        
        // Geração dinâmica de linhas da tabela detalhada
        const newRow = `
            <tr>
                <td>${row.querySelector('td').innerText}</td>
                <td>${fc}</td>
                <td>${parseFloat(fc) + 10} (estimado)</td>
                <td>${pse}</td>
            </tr>`;
        
        detailedTable.innerHTML += newRow;
    });

    // Exibe a tabela detalhada e o botão de imprimir
    detailedHeader.style.display = 'block';
    detailedTable.parentElement.style.display = 'block';
    printButton.style.display = 'inline-block';
});

// Função para imprimir
document.getElementById('printButton').addEventListener('click', function() {
    window.print();
});
