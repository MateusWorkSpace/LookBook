# Lookbook LuxeLink

<<<<<<< HEAD
Criado por **MateusDang**.
=======

## Run Locally
>>>>>>> e491abbb4b9dc99d991a058801f9ac473d5f0969

## Descrição

<<<<<<< HEAD
O Lookbook LuxeLink é uma aplicação web elegante projetada para personal shoppers de luxo e boutiques. A ferramenta permite a criação e o compartilhamento de lookbooks digitais privados e temporários com clientes VIP. O objetivo é otimizar a comunicação com o cliente, substituindo o compartilhamento caótico de fotos por uma experiência de "revista digital" profissional, organizada e interativa.

## Funcionalidades Principais

-   **Autenticação de Usuário:** Sistema seguro de registro e login para personal shoppers.
-   **Dashboard Intuitiva:** Um painel central para visualizar, gerenciar, editar e deletar todos os lookbooks.
-   **Criação de Lookbooks:** Interface fácil de usar para criar novos lookbooks, com upload de múltiplas imagens, adição de títulos, descrições e preços para cada item.
-   **Links Compartilháveis:** Geração de URLs únicas e privadas para cada lookbook, permitindo o compartilhamento exclusivo com clientes.
-   **Visualização do Cliente:** Uma página de cliente limpa e focada no produto, com design inspirado em revistas de luxo.
-   **Integração com IA (Gemini):** Geração automática de mensagens personalizadas para o WhatsApp, facilitando o início da conversa de compra pelo cliente.
-   **Integração de Pagamentos (Stripe):** Sistema de assinaturas com um plano "Free" (limitado a 3 lookbooks) e um plano "Pro" (ilimitado), gerenciado através do Stripe Checkout.
-   **Gerenciamento de Perfil:** Os usuários podem atualizar suas informações pessoais, como nome e número do WhatsApp.
-   **Landing Page Atraente:** Uma página de marketing em árabe para atrair e converter novos usuários.

## Tecnologias Utilizadas

-   **Frontend:**
    -   React
    -   TypeScript
    -   Tailwind CSS
-   **Backend:**
    -   Node.js
    -   Express
-   **Banco de Dados:**
    -   SQLite
-   **APIs e Serviços Externos:**
    -   **Google Gemini API:** Para geração de texto por IA.
    -   **Stripe API:** Para processamento de pagamentos e gerenciamento de assinaturas.

## Estrutura do Projeto

```
/
|-- backend/                # Contém todo o código do servidor Node.js
|   |-- database.js         # Configuração e inicialização do SQLite
|   |-- server.js           # Arquivo principal do servidor Express com as rotas da API
|   |-- package.json        # Dependências do backend
|-- components/             # Componentes React reutilizáveis (ícones, etc.)
|-- hooks/                  # Hooks React customizados (ex: useLocalStorage)
|-- views/                  # Componentes de página completos (Dashboard, Login, etc.)
|-- App.tsx                 # Componente principal que gerencia a navegação e o estado
|-- index.html              # Ponto de entrada da aplicação
|-- index.tsx               # Ponto de montagem do React
|-- types.ts                # Definições de tipos TypeScript
|-- README.md               # Este arquivo
```

## Configuração e Instalação Local

Siga estes passos para rodar o projeto em sua máquina.

### Pré-requisitos

-   [Node.js](https://nodejs.org/) (versão 16 ou superior)
-   npm (geralmente instalado com o Node.js)

### 1. Configurar o Backend

O backend é responsável por toda a lógica de negócio, banco de dados e comunicação com APIs externas.

1.  Navegue até a pasta do backend:
    ```sh
    cd backend
    ```

2.  Instale as dependências:
    ```sh
    npm install
    ```

3.  **Configurar Variáveis de Ambiente (MUITO IMPORTANTE):**
    No arquivo `backend/server.js`, você precisará substituir os valores de placeholder pelas suas chaves reais:
    -   `STRIPE_SECRET_KEY`: Sua chave secreta do Stripe (encontrada no painel do Stripe).
    -   `STRIPE_WEBHOOK_SECRET`: A chave secreta do seu endpoint de webhook do Stripe.
    -   `price_...`: No endpoint `/api/create-checkout-session`, substitua o `priceId` pelo ID do preço do seu produto "Pro" criado no Stripe.

4.  Inicie o servidor backend:
    ```sh
    npm start
    ```
    O servidor será executado em `http://localhost:3001` e criará um arquivo `database.sqlite` automaticamente.

### 2. Configurar o Frontend

O frontend é uma aplicação React que consome a API do backend.

1.  **Chave da API Gemini:**
    Você precisa de uma chave de API para o Google Gemini. Ela deve ser configurada como uma variável de ambiente acessível pelo `process.env.API_KEY` no frontend.

2.  **Abra o `index.html`:**
    Para rodar o frontend, basta servir o arquivo `index.html` através de um servidor de desenvolvimento local. Se você estiver usando um ambiente como o Vite, o comando seria `npm run dev`. Caso contrário, uma extensão como "Live Server" no VS Code pode ser utilizada.

### Como Usar a Aplicação

1.  Acesse a aplicação no seu navegador.
2.  Você verá a landing page. Clique para se registrar e criar uma nova conta.
3.  Após o login, você será direcionado para a Dashboard.
4.  Clique em "Criar Novo Lookbook" para começar.
5.  Adicione imagens e detalhes aos seus itens.
6.  Salve o lookbook e, na dashboard, clique no ícone de compartilhar para obter o link do cliente.
7.  Para testar a monetização, clique no banner de "Upgrade" para ser redirecionado ao checkout do Stripe.
=======
0. Backend Server:

cd backend
npm install
npm stat

1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

MateusDang
>>>>>>> e491abbb4b9dc99d991a058801f9ac473d5f0969
