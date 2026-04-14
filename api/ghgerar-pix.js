import { Pix } from 'pix-payload-generator';

export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).send('Method Not Allowed');

    const { valor, descricao } = req.body;

    try {
        const pix = new Pix(
            'SUA_CHAVE_PIX_AQUI', // Pode ser CPF, CNPJ, Email ou Chave Aleatória
            descricao || 'Pagamento Online',
            'NOME DO TITULAR',
            'CIDADE DO TITULAR',
            'TXID_OPCIONAL', // ID da transação
            Number(valor)
        );

        const payload = pix.getPayload();

        res.status(200).json({
            copyAndPaste: payload,
            amount: valor
        });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao gerar payload Pix' });
    }
}
