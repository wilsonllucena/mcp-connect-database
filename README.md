# MCP Connect Database

Este projeto é um servidor MCP (Model Context Protocol) que fornece uma interface para conectar e consultar um banco de dados SQLite com informações de clientes. O servidor oferece ferramentas para listar, buscar e contar clientes através do protocolo MCP.

## 📋 Sobre o Projeto

O **MCP Connect Database** é um servidor que implementa o Model Context Protocol para fornecer acesso a dados de clientes armazenados em um banco SQLite. Ele oferece as seguintes funcionalidades:

- **Listar clientes**: Exibe todos os clientes cadastrados no sistema
- **Quantidade de clientes**: Retorna o total de clientes cadastrados
- **Buscar por origem**: Filtra clientes ativos por origem (facebook, instagram, tiktok)
- **Quantidade por origem**: Conta clientes ativos por origem específica

### Estrutura dos Dados

Cada cliente possui os seguintes campos:
- ID (auto-incremento)
- Nome
- Email (único)
- Endereço (bairro, cidade, estado, CEP)
- Status ativo/inativo
- Origem (facebook, instagram, tiktok)
- Data de criação e atualização

## 🚀 Como Executar

### Pré-requisitos

- Node.js (versão 14 ou superior)
- npm ou yarn

### Instalação

1. Clone o repositório e navegue até o diretório:
```bash
cd mcp-connect-database
```

2. Instale as dependências:
```bash
npm install
```

### Configuração do Banco de Dados

3. Execute o seed para criar a tabela e popular com dados de exemplo:
```bash
npm run seed
```

Este comando irá:
- Criar a tabela `clientes` no arquivo `mcp.sqlite`
- Inserir 50 clientes fictícios usando a biblioteca Faker

### Compilação e Execução

4. Compile o projeto TypeScript:
```bash
npm run build
```

5. Execute o servidor:
```bash
npm start
```

O servidor será iniciado e ficará aguardando conexões via stdio para comunicação MCP.

## 🛠️ Scripts Disponíveis

- `npm run build`: Compila o TypeScript e torna o servidor executável
- `npm start`: Executa o servidor compilado
- `npm run seed`: Cria a tabela e popula com dados de exemplo

## 📁 Estrutura do Projeto

```
mcp-connect-database/
├── src/
│   ├── server.ts      # Servidor MCP principal
│   └── helpers.ts     # Funções de acesso ao banco de dados
├── build/             # Arquivos compilados
├── seed.ts           # Script para popular o banco
├── mcp.sqlite        # Banco de dados SQLite
└── package.json      # Configurações do projeto
├── tsconfig.json     # Configuração do TypeScript
├── .gitignore        # Arquivos a serem ignorados pelo Git
├── README.md         # Documentação do projeto
```


## 🔧 Tecnologias Utilizadas

- **TypeScript**: Linguagem principal
- **SQLite3**: Banco de dados
- **Model Context Protocol SDK**: Framework para servidor MCP
- **Faker.js**: Geração de dados fictícios
- **Zod**: Validação de esquemas

## 📖 Ferramentas MCP Disponíveis

Após executar o servidor, ele estará disponível para receber comandos MCP através de stdio. As ferramentas disponíveis são:

### 1. listar-clientes
- **Descrição**: Lista todos os clientes cadastrados no sistema
- **Parâmetros**: Nenhum
- **Retorno**: Lista formatada com todos os clientes e suas informações

### 2. quantidade-clientes
- **Descrição**: Retorna o total de clientes cadastrados
- **Parâmetros**: Nenhum
- **Retorno**: Número total de clientes no banco

### 3. buscar-clientes-por-origem
- **Descrição**: Busca clientes ativos por origem específica
- **Parâmetros**: 
  - `origem` (string): facebook, instagram ou tiktok
- **Retorno**: Lista de clientes ativos da origem especificada

### 4. quantidade-clientes-ativos-por-origem
- **Descrição**: Conta clientes ativos por origem específica
- **Parâmetros**: 
  - `origem` (string): facebook, instagram ou tiktok
- **Retorno**: Número de clientes ativos da origem especificada

## 💡 Exemplo de Uso

O servidor formatará as respostas de forma legível, incluindo emojis e formatação markdown para melhor visualização dos dados. Por exemplo:


## 🔄 Desenvolvimento

Para desenvolvimento, você pode usar:

```bash
# Executar em modo de desenvolvimento
npx ts-node src/server.ts

# Recriar dados de teste
npm run seed
```