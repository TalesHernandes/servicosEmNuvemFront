import express from 'express';
import fetch from 'node-fetch';

const app = express();
const PORT = 8081;

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    if (req.method === "OPTIONS") {
        res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
        return res.status(200).json({});
    }
    next();
});

app.use(express.json());

app.post('/verificar-nome', async (req, res) => {
    const { nome } = req.body;

    try {
        const response = await fetch(`http://12.0.2.21:25000/${nome}`);
        const data = await response.json();

        res.json(data);
    } catch (error) {
        console.error('Erro ao comunicar com a EC2 privada:', error);
        res.status(500).json({ error: 'Erro ao verificar o nome.' });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
