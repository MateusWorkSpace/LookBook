# LuxeLink Backend

Este é o servidor de backend para a aplicação LuxeLink. Ele usa Node.js, Express e SQLite para fornecer uma API RESTful para gerenciar perfis de shoppers e lookbooks.

## Configuração

### Pré-requisitos
- [Node.js](https://nodejs.org/) (versão 16 ou superior)
- npm (geralmente vem com o Node.js)

### Instalação

1.  Navegue até o diretório `backend` no seu terminal:
    ```sh
    cd backend
    ```

2.  Instale as dependências do projeto:
    ```sh
    npm install
    ```

## Executando o Servidor

Para iniciar o servidor de desenvolvimento, execute o seguinte comando:

```sh
npm start
```

O servidor será iniciado em `http://localhost:3001` por padrão.

Ao ser iniciado pela primeira vez, ele criará automaticamente um arquivo de banco de dados chamado `database.sqlite` neste diretório.

## API Endpoints

-   `GET /api/profile`: Obtém o perfil do personal shopper.
-   `POST /api/profile`: Cria ou atualiza o perfil.
-   `GET /api/lookbooks`: Obtém uma lista de todos os lookbooks.
-   `POST /api/lookbooks`: Cria um novo lookbook.
-   `GET /api/lookbook-details/:id`: Obtém os detalhes de um lookbook específico junto com o perfil do shopper (usado pela visualização do cliente).


MateusDang