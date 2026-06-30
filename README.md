# ScrumMentors - Website com Integração Nativa WhatsApp

Este é um boilerplate completo e estruturado para um website desenvolvido em **Node.js** com integração nativa com o **WhatsApp**. Ele fornece uma interface de dashboard premium com design moderno (glassmorphism), sincronização de status em tempo real via **WebSockets (Socket.io)**, e endpoints de **API REST** para envio de mensagens automatizadas.

A integração é feita de forma nativa utilizando a biblioteca `whatsapp-web.js` que se conecta via cliente web sem a necessidade de APIs oficiais ou pagas.

---

## 📂 Estrutura de Pastas do Projeto

O projeto segue um design modular e limpo, dividindo responsabilidades entre backend (API/Serviços) e frontend (Dashboard estático):

```
MentoriasScrum/
├── public/                 # Assets do Frontend (Arquivos Estáticos)
│   ├── css/
│   │   └── style.css       # Design System CSS (Glassmorphism, Neon, Animações)
│   ├── js/
│   │   └── main.js         # Lógica do Cliente (WebSockets, Formulários, UI State)
│   └── index.html          # Dashboard Web da Aplicação
├── src/                    # Código Fonte do Backend
│   ├── config/
│   │   └── whatsapp.js     # Configuração do Puppeteer e inicialização do cliente WhatsApp
│   ├── controllers/
│   │   └── messageController.js # Lógica de controle para requisições de mensagens
│   ├── routes/
│   │   └── api.js          # Definição das rotas REST (/api/status, /api/send)
│   ├── services/
│   │   ├── socketService.js   # Gerenciamento de conexões WebSocket em tempo real
│   │   └── whatsappService.js # Lifecycle, hooks de eventos e wrapper do WhatsApp
│   └── server.js           # Ponto de entrada do Servidor (Express + Socket.io)
├── .env.example            # Template de variáveis de ambiente
├── .gitignore              # Arquivos e pastas omitidos no Git (como sessões e node_modules)
├── package.json            # Manifest do Node.js, scripts e dependências
└── README.md               # Documentação do projeto (este arquivo)
```

---

## ⚡ Tecnologias Utilizadas

- **Backend:** Node.js, Express (API HTTP)
- **Real-time:** Socket.io (WebSocket para sincronização do QR Code e status de rede)
- **WhatsApp Client:** `whatsapp-web.js` (Biblioteca nativa via Puppeteer)
- **QR Generation:** `qrcode` (Conversão de strings em imagens Base64)
- **Configuração:** `dotenv` (Variaveis de ambiente)
- **Frontend:** Vanilla HTML5, Vanilla CSS3 (Custom properties, grid, flexbox, glassmorphism) e Vanilla JS

---

## ⚙️ Pré-requisitos & Instalação

### 1. Clonar ou Acessar a Pasta do Projeto

Certifique-se de estar na pasta raiz do projeto:

```bash
cd /home/ricardo/Projetos/MentoriasScrum
```

### 2. Instalar Dependências do Node.js

Instale os pacotes necessários definidos no `package.json`:

```bash
npm install
```

> [!NOTE]
> Durante a instalação da biblioteca `whatsapp-web.js`, o Puppeteer irá baixar automaticamente uma versão leve do Chromium. Em sistemas Linux headless (servidores sem interface gráfica), pode ser necessário instalar algumas bibliotecas do sistema para o Chromium rodar. Consulte a seção de [Solução de Problemas](#-solução-de-problemas-em-servidores-linux) caso tenha problemas ao iniciar.

### 3. Configurar Variáveis de Ambiente

Duplique o arquivo `.env.example` e salve como `.env`:

```bash
cp .env.example .env
```

Se preferir, ajuste a porta padrão (`PORT=3000`) dentro do arquivo `.env`.

---

## 🚀 Como Executar

### Modo de Desenvolvimento (com Hot Reload)

Usa o `nodemon` para reiniciar o servidor automaticamente a cada alteração nos arquivos:

```bash
npm run dev
```

### Modo de Produção

Inicia o servidor de forma padrão:

```bash
npm start
```

---

## 🖥️ Como Usar o Dashboard

1. Inicie o servidor e abra o navegador no endereço: **`http://localhost:3000`**
2. O dashboard apresentará o status **"Inicializando"** enquanto o navegador em segundo plano carrega a página do WhatsApp Web.
3. Assim que carregado, um **QR Code** dinâmico surgirá na tela acompanhado de instruções.
4. Abra o WhatsApp no seu smartphone, vá em **Aparelhos Conectados** > **Conectar um aparelho**, e escaneie o código na tela.
5. O painel mudará instantaneamente para o status verde **"Conectado"** e exibirá uma tela de sucesso.
6. A partir desse momento, você poderá testar o envio preenchendo o formulário ao lado ou enviando requisições REST para a API!

---

## 📡 API Endpoints (Integração Externa)

Você pode integrar este serviço com qualquer outro sistema ou backend enviando requisições HTTP para os endpoints disponíveis:

### 1. Verificar Conexão

Retorna o status atual da sessão do WhatsApp.

- **URL:** `/api/status`
- **Método:** `GET`
- **Resposta de Exemplo (Sucesso):**
    ```json
    {
        "success": true,
        "status": "CONNECTED",
        "isConnected": true
    }
    ```

### 2. Enviar Mensagem de Texto

Envia uma mensagem de texto simples para um número.

- **URL:** `/api/send`
- **Método:** `POST`
- **Headers:** `Content-Type: application/json`
- **Corpo da Requisição (JSON):**
    ```json
    {
        "number": "5511999999999",
        "message": "Olá! Esta é uma mensagem de teste enviada pela API nativa."
    }
    ```
- **Resposta de Exemplo (Sucesso):**
    ```json
    {
        "success": true,
        "message": "Message dispatched successfully.",
        "data": {
            "id": "true_5511999999999@c.us_3EB0C5F9D67117C6440D",
            "to": "5511999999999@c.us",
            "body": "Olá! Esta é uma mensagem de teste enviada pela API nativa.",
            "timestamp": 1690000000
        }
    }
    ```

---

## 🛠️ Solução de Problemas em Servidores Linux

Se você hospedar este projeto em um VPS Linux (como Ubuntu Server) e o backend falhar ao iniciar com erros relacionados ao Puppeteer ou Chromium (ex: `error while loading shared libraries: libnss3.so`), você precisará instalar as dependências de sistema do Chromium.

Execute o comando abaixo no terminal do servidor para instalar todas as dependências necessárias:

```bash
sudo apt-get update && sudo apt-get install -y \
    ca-certificates \
    fonts-liberation \
    libasound2 \
    libatk-bridge2.0-0 \
    libatk1.0-0 \
    libc6 \
    libcairo2 \
    libcups2 \
    libdbus-1-3 \
    libexpat1 \
    libfontconfig1 \
    libgbm1 \
    libgcc1 \
    libgconf-2-4 \
    libgdk-pixbuf2.0-0 \
    libglib2.0-0 \
    libgtk-3-0 \
    libnspr4 \
    libnss3 \
    libpango-1.0-0 \
    libpangocairo-1.0-0 \
    libstdc++6 \
    libx11-6 \
    libx11-xcb1 \
    libxcb1 \
    libxcomposite1 \
    libxcursor1 \
    libxdamage1 \
    libxext6 \
    libxfixes3 \
    libxi6 \
    libxrandr2 \
    libxrender1 \
    libxss1 \
    libxtst6 \
    lsb-release \
    wget \
    xdg-utils
```
