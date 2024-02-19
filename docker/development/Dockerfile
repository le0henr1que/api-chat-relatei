# Use a imagem oficial do Node.js como base
FROM node:20 as base

WORKDIR /app

# Copie os arquivos de dependência do projeto
COPY package.json package-lock.json ./

# Instale as dependências do projeto
RUN npm ci

# Copie o código fonte do projeto
COPY . .

# Compile o projeto
RUN npm run build

# Inicie uma nova etapa de construção para as dependências de produção
FROM base as production

WORKDIR /app

# Copie os arquivos de dependência do projeto
COPY package.json package-lock.json ./

# Instale apenas as dependências de produção
RUN npm ci --only=production

# Copie o código compilado da etapa de base
COPY --from=base /app/dist ./dist

# Exponha a porta que o aplicativo usará
EXPOSE 5000

# Defina o comando para iniciar o aplicativo
CMD [ "npm", "run", "start" ]
