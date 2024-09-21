const checkButton = document.getElementById('checkButton');
const nameInput = document.getElementById('nameInput');
const resultDiv = document.getElementById('result');

checkButton.addEventListener('click', async () => {
    const name = nameInput.value;

    if (!name) {
        resultDiv.textContent = 'Por favor, insira um nome.';
        resultDiv.style.color = 'red';
        return;
    }

    try {
        const response = await fetch(`http://10.0.138.205:25000/${name}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        });

        const data = await response.json();
        console.log(data)

        // eu nao faco ideia de como tira esse erro de unresolved variable, mas ta funcionando, entao vai ficar ai
        if (data.nome === name) {
            resultDiv.textContent = `${name} está em nosso banco de dados!`;
            resultDiv.style.color = 'green';
        } else {
            resultDiv.textContent = `${name} não encontrado em nosso banco de dados.`;
            resultDiv.style.color = 'red';
        }

    } catch (error) {
        console.error('Erro ao verificar o nome:', error);
        resultDiv.textContent = 'Erro ao verificar o nome.';
        resultDiv.style.color = 'red';
    }
});
