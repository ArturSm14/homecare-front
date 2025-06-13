# HomeCare - Frontend

Este é o frontend da aplicação HomeCare, desenvolvido com React, TypeScript e Vite.

## Requisitos

- Node.js (versão recomendada: 18.x ou superior)
- npm ou yarn

## Configuração do Ambiente

1. Clone o repositório:
   ```bash
   git clone <url-do-repositorio>
   cd homecare-front
   ```

2. Instale as dependências:
   ```bash
   npm install
   # ou
   yarn
   ```

3. Configure as variáveis de ambiente:
   - Copie o arquivo de exemplo para criar seu arquivo de ambiente:
     ```bash
     # Linux/macOS
     cp .env.example .env
     
     # Windows (PowerShell)
     Copy-Item .env.example .env
     
     # Windows (CMD)
     copy .env.example .env
     ```

## Executando o Projeto

1. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   # ou
   yarn dev
   ```

2. Acesse a aplicação em [http://localhost:5173](http://localhost:5173)

## Scripts Disponíveis

- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm run build` - Compila o projeto para produção
- `npm run lint` - Executa a verificação de linting
- `npm run preview` - Visualiza a versão de produção localmente

## Tecnologias Principais

- React 19
- TypeScript
- Vite
- TailwindCSS
- Radix UI
- React Hook Form
- Zod (validação)
