# Usar uma imagem base do Node.js
FROM node:18

# Criar diretório de trabalho
WORKDIR /app

# Copiar arquivos package.json e package-lock.json
COPY package*.json ./

# Instalar dependências
RUN npm install

# Copiar o restante do projeto
COPY . .

# Expor portas para JSON Server e a aplicação Vue.js
EXPOSE 8080 3001

# Script para iniciar ambos os servidores
CMD ["sh", "-c", "npm run mock-server & npm run serve"]

