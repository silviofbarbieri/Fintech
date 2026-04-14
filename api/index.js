import { Pix } from 'pix-payload';

export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).send('Method Not Allowed');

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
}
