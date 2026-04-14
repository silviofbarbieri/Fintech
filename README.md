# Fintech

1. Implementação no Backend (Vercel Function)
Você pode criar uma função que gera o código sem depender de uma API externa de banco (Pix Estático), ou usando um gateway (Pix Dinâmico). Abaixo, mostro como gerar o Copia e Cola Estático (onde você define o valor e a chave).

Instale a dependência: npm install pix-payload-generator

Arquivo: api/gerar-pix.js

JavaScript
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
2. Exibição no Frontend (Bootstrap)
No seu index.html, você precisa de um campo para o usuário copiar o código facilmente.

HTML
<div class="card p-4 shadow-sm">
    <h5>Pagamento via PIX</h5>
    <p>Clique no botão para copiar o código e pague no app do seu banco.</p>
    
    <div class="input-group mb-3">
        <input type="text" id="pixCode" class="form-control" readonly value="Aguardando geração...">
        <button class="btn btn-primary" type="button" onclick="copyToClipboard()">
            Copiar Código
        </button>
    </div>
    <div id="status" class="text-success small"></div>
</div>

<script>
function copyToClipboard() {
    const copyText = document.getElementById("pixCode");
    copyText.select();
    copyText.setSelectionRange(0, 99999); // Para mobile
    navigator.clipboard.writeText(copyText.value);
    
    document.getElementById("status").innerText = "Código copiado com sucesso!";
}
</script>
3. Segurança e Regras do Banco Central
Ao gerar o "Copia e Cola", atente-se a estes pontos para garantir a funcionalidade:

Chave PIX: Se for CPF/CNPJ, use apenas números. Se for chave aleatória, inclua os hífens.

Valor: Use o ponto como separador decimal (ex: 10.50). Se o valor for 0, alguns bancos tratam como "valor aberto", onde o pagador digita o quanto quer pagar.

Segurança no Vercel: Nunca deixe sua Chave PIX "hardcoded" no frontend. Sempre processe a geração na pasta /api para proteger a lógica e as informações da conta.

Confirmação: O "Copia e Cola" estático não avisa seu site automaticamente que foi pago. Para automação real (baixar o pedido no banco de dados após o pagamento), você precisará usar o Pix Dinâmico via API (como a do Mercado Pago ou do próprio banco via certificado mTLS).

Passo a Passo para Operação (README.md)
Geração: O cliente escolhe o produto -> O sistema chama a API no Vercel passando o valor.

Payload: A função retorna a string que começa sempre com 000201....

Interface: O usuário clica em "Copiar", abre o App do banco (Ex: Nubank), vai em Pix -> Pix Copia e Cola e cola o código.

Validação: O App do banco decodifica a string e mostra o Nome e o Valor que você configurou no backend.