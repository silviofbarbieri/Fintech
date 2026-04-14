import express from 'express';
import pkg from 'pix-payload';
const { Pix } = pkg;

const app = express();
app.use(express.json());

app.post('/api', (req, res) => {
    const { valor, descricao } = req.body;

    try {
        const pix = new Pix(
            'SUA_CHAVE_PIX_AQUI',
            descricao || 'Pagamento Online',
            'SEU NOME AQUI',
            'SAO PAULO',
            'TXID123',
            Number(valor)
        );

        const payload = pix.getPayload();

        res.status(200).json({
            copyAndPaste: payload,
            amount: valor
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao gerar payload Pix' });
    }
});

app.listen(3000, () => {
    console.log('Servidor rodando em http://localhost:3000');
});
