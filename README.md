# Deep Space Store

![image](https://github.com/user-attachments/assets/d17e2d7e-861b-43ec-9a8d-96d0add44c93)

## Descrição do Projeto

Deep Space Store é uma aplicação que emula um e-coomerce. Este projeto foi desenvolvido usando Vue.js para o frontend e `json-server` para simular um backend. Ele inclui funcionalidades como registro de usuários, login, adição de produtos ao carrinho, e finalização de compras com diferentes métodos de pagamento.

## Tecnologias Utilizadas

- **Frontend:** Vue.js, Vuetify
- **Backend:** json-server
- **Gerenciamento de Estado:** Vuex
- **Testes:** Cypress, Mocha
- **Contêineres:** Docker
- **Outros:** Axios, ESLint

## Funcionalidades Principais

- Registro e autenticação de usuários
- Adição e remoção de produtos no carrinho
- Finalização de compra com confirmação de pedido
- Diferentes métodos de pagamento, incluindo Pix, Boleto e Cartão de Crédito

## Vídeo de Demonstração

[Vídeo de Demonstração](https://github.com/user-attachments/assets/56b8a245-c179-4b31-a8e0-32a13d2bb5e7)

## Como Rodar o Projeto

### Pré-requisitos

- **Node.js** (versão 14 ou superior)
- **Docker** (opcional, para rodar a aplicação em contêineres)

### Passos para Rodar o Projeto Localmente

1. **Clone o repositório:**

   ```bash
   git clone https://github.com/Fernando9200/deep-space-store.git
   cd deep-space-store

2. **Instale as dependências**

   ```bash
   npm install
   
3. **Instale o json-server**

   ```bash
   npm install json-server@^0.17.1

4. **Instale o mocha**

   ```bash
   npm install --save-dev mocha

5. **Instale o cypress**

   ```bash
   npm install cypress --save-dev

6. **Inicie o servidor JSON:**
   
   Em uma aba do terminal, execute:
   ```bash
   npm run mock-server

7. **Inicie o servidor de desenvolvimento Vue:**

   Em outra aba do terminal, execute:
   ```bash
   npm run serve

8. **Acesse a aplicação:**  
   Abra o navegador e vá para `http://localhost:8080`

9. **Para facilitar o teste do aplicativo, você pode usar a conta de teste abaixo:**

- **Email:** `testaccount@hotmail.com`
- **Senha:** `123456`
   
   Se preferir, pode registrar a sua própria conta, que ficará salva no `db.json`

## Rodando com Docker  

Caso prefira, é possível rodar a aplicação utilizando Docker. Certifique-se de ter o programa instalado no seu computador.

**Construir e rodar a aplicação:**

```bash
docker-compose up --build frontend json-server
```

## Testes

O projeto utiliza Cypress para testes de ponta a ponta e Mocha para testes unitários. Abaixo estão as instruções para rodar cada um dos conjuntos de testes.

1. **Certifique-se de que o aplicativo está rodando**

2. **Execute os testes Cypress:**

   ```bash
   npx cypress run
   ```
3. **Execute os testes unitários:**

   ```bash
   npm test
   ```

## Contato
Para dúvidas ou suporte, por favor entre em contato com `fernando91.sosa@hotmail.com`
