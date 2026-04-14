cat > /workspaces/Fintech/api/index.js << 'EOF'
import { Pix } from 'pix-payload';

export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).send('Method Not Allowed');

    const { valor, descricao } = req.body;

    try {
        const pix = new Pix(
            'SUA_CHAVE_PIX_AQUI',        // ← substitua pela sua chave
            descricao || 'Pagamento Online',
            'SEU NOME AQUI',             // ← seu nome completo
            'SAO PAULO',                 // ← sua cidade
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
EOF
