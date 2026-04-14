# 💸 Fintech — Gerador de Pagamento via Pix

Aplicação simples para gerar um payload Pix (copia e cola) via API, com frontend em HTML.

---

## 📁 Estrutura do Projeto

```
Fintech/
├── api/
│   └── index.js       # API que gera o payload Pix
├── index.html         # Frontend com botão de copiar
├── package.json
└── README.md
```

---

## ⚙️ Pré-requisitos

- Node.js v18+
- npm

---

## 🚀 Passo a Passo para Configurar

### 1. Clone o repositório

```bash
git clone https://github.com/SEU_USUARIO/Fintech.git
cd Fintech
```

### 2. Instale a dependência correta

> ⚠️ **Atenção:** O pacote `pix-payload-generator` **não existe** no npm e causará erro `MODULE_NOT_FOUND`. Use o pacote correto:

```bash
npm install pix-payload
```

### 3. Configure a API com seus dados Pix

Edite o arquivo `api/index.js` e substitua os campos abaixo:

```js
import { Pix } from 'pix-payload'; // ← import correto

export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).send('Method Not Allowed');

    const { valor, descricao } = req.body;

    try {
        const pix = new Pix(
            'SUA_CHAVE_PIX_AQUI',         // ← CPF, CNPJ, e-mail, telefone ou chave aleatória
            descricao || 'Pagamento Online',
            'SEU NOME COMPLETO',           // ← nome do titular da conta
            'SUA CIDADE',                  // ← cidade do titular (sem acentos)
            'TXID123',                     // ← ID da transação (pode ser fixo ou dinâmico)
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
```

### 4. Configure o valor no frontend

Edite o arquivo `index.html` e localize a chamada da função `gerarPix()`:

```js
body: JSON.stringify({
    valor: '10.00',              // ← altere para o valor desejado
    descricao: 'Pagamento Online'
})
```

### 5. Rode a aplicação

```bash
node api/index.js
```

Abra o `index.html` no navegador. O código Pix será gerado automaticamente ao carregar a página.

---

## 🐛 Erros Comuns

| Erro | Causa | Solução |
|------|-------|---------|
| `MODULE_NOT_FOUND: pix-payload-generator` | Pacote inexistente no npm | Instalar `pix-payload` e atualizar o import |
| `⏳ Gerando código Pix...` travado | API não está rodando ou retornando erro | Verificar o terminal e o console do navegador (F12) |
| `Cannot find module` genérico | `npm install` não foi executado | Rodar `npm install` na raiz do projeto |

---

## 🔄 Git — Sincronizando com o GitHub

Caso seu branch local e o remoto tenham divergido (erro de `diverged`):

```bash
# Opção recomendada (histórico limpo)
git pull --rebase origin main
git push origin main
```

Para enviar suas alterações normalmente:

```bash
git add .
git commit -m "Sua mensagem aqui"
git push origin main
```

---

## 🛠️ Tecnologias

- [Node.js](https://nodejs.org/)
- [pix-payload](https://www.npmjs.com/package/pix-payload)
- [Bootstrap 5](https://getbootstrap.com/)

---

## 📄 Licença

MIT
