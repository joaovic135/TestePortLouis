# API de Gerenciamento de Pedidos

Esta é uma API RESTful para gerenciar pedidos e recuperar pedidos pendentes.

## Uso

### Executando a API

Para executar a API, você tem duas opções:

1. **Usando Docker Compose**: 
    ```bash
    docker-compose up
    ```

    Este comando irá construir e iniciar os contêineres necessários para executar a aplicação.

2. **Executando sem Docker**:
    ```bash
    npm install
    npm run dev
    ```

    Isso instalará as dependências e iniciará a aplicação. Certifique-se de ter o Node.js e npm instalados localmente.

### Acessando a API

Assim que a API estiver em execução, você pode acessá-la em `http://localhost:3000`. 

Para recuperar informações sobre pedidos pendentes, faça uma solicitação GET para o endpoint `/pedidosPendentes`.

### Executando Testes

Para executar os testes, você pode usar o seguinte comando:
```bash
npx jest
```

## Tecnologias Utilizadas

- Node.js
- Express.js
- TypeScript
- Docker
- Jest


