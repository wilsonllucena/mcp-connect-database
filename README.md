# MCP Connect Database

Este projeto é um servidor MCP (Model Context Protocol) que fornece uma interface para conectar e consultar um banco de dados SQLite com informações de clientes. O servidor oferece ferramentas para listar, buscar e contar clientes através do protocolo MCP.

## 📋 Sobre o Projeto

O **MCP Connect Database** é um servidor que implementa o Model Context Protocol para fornecer acesso a dados de clientes armazenados em um banco SQLite. Ele oferece as seguintes funcionalidades:

- **Listar clientes**: Exibe todos os clientes cadastrados no sistema
- **Quantidade de clientes**: Retorna o total de clientes cadastrados
- **Buscar por origem**: Filtra clientes ativos por origem (facebook, instagram, tiktok)
- **Quantidade por origem**: Conta clientes ativos por origem específica
- **Métricas avançadas**: Fornece análises detalhadas incluindo distribuição por origem e crescimento mensal

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

- **Node.js**: versão 16 ou superior (recomendado: 18+)
- **npm**: versão 7 ou superior (ou yarn)
- **Claude Desktop**: versão mais recente
- **Sistema Operacional**: macOS, Windows ou Linux

### Compatibilidade

- ✅ **Claude Desktop**: Totalmente compatível
- ✅ **MCP SDK**: v1.17.2+
- ✅ **SQLite**: v5.1.7+
- ✅ **TypeScript**: v5.9.2+

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

### 5. obter-metricas-clientes
- **Descrição**: Obtém métricas completas dos clientes
- **Parâmetros**: Nenhum
- **Retorno**: Objeto JSON com métricas detalhadas incluindo:
  - Total de clientes
  - Clientes ativos
  - Distribuição por origem
  - Crescimento mensal (últimos 12 meses)

## 💡 Exemplo de Uso

O servidor formatará as respostas de forma legível, incluindo emojis e formatação markdown para melhor visualização dos dados. 

### Exemplos de Respostas:

**Listagem de Clientes:**
```
📋 Lista de Clientes (50 encontrados)

1. **João Silva**
   📧 Email: joao.silva@email.com
   📍 Endereço: Centro, São Paulo - SP
   📮 CEP: 01234-567
   ✅ Ativo: Sim
   🏢 Origem: facebook
   📅 Criado em: 2024-01-15
```

**Métricas de Clientes:**
```
📊 Métricas de clientes: {
  "totalClientes": 50,
  "clientesAtivos": 42,
  "clientesPorOrigem": [
    {"origem": "facebook", "quantidade": 18},
    {"origem": "instagram", "quantidade": 16},
    {"origem": "tiktok", "quantidade": 8}
  ],
  "crescimentoMensal": [
    {"mes": "2024-01", "quantidade": 15},
    {"mes": "2023-12", "quantidade": 12}
  ]
}
```


## 🖥️ Configuração para Claude Desktop

Para usar este servidor MCP com o Claude Desktop, adicione a seguinte configuração ao arquivo de configuração do Claude:

### macOS
Edite o arquivo `~/Library/Application Support/Claude/claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "mcp-connect-database": {
      "command": "node",
      "args": ["/caminho/absoluto/para/mcp-connect-database/build/server.js"],
      "env": {}
    }
  }
}
```

### Windows
Edite o arquivo `%APPDATA%\Claude\claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "mcp-connect-database": {
      "command": "node",
      "args": ["C:\\caminho\\absoluto\\para\\mcp-connect-database\\build\\server.js"],
      "env": {}
    }
  }
}
```

### Passos para Configuração:

1. **Compile o projeto**:
   ```bash
   npm run build
   ```

2. **Encontre o caminho absoluto do projeto**:
   ```bash
   pwd
   ```

3. **Substitua `/caminho/absoluto/para/mcp-connect-database`** pelo caminho real do seu projeto

4. **Reinicie o Claude Desktop** para carregar a nova configuração

5. **Teste a conexão** perguntando ao Claude para listar os clientes ou obter métricas

### Exemplo de Uso no Claude Desktop:

```
Por favor, liste todos os clientes cadastrados no sistema.
```

```
Mostre as métricas dos clientes.
```

```
Busque clientes da origem "facebook".
```

## 🔧 Troubleshooting

### Problemas Comuns:

1. **Erro "Cannot find module"**:
   - Certifique-se de que executou `npm install` e `npm run build`
   - Verifique se o caminho no arquivo de configuração está correto

2. **Claude Desktop não reconhece o servidor**:
   - Verifique se o arquivo `claude_desktop_config.json` está no local correto
   - Reinicie completamente o Claude Desktop
   - Verifique se a sintaxe JSON está correta (sem vírgulas extras)

3. **Banco de dados não encontrado**:
   - Execute `npm run seed` para criar e popular o banco
   - Certifique-se de que o arquivo `mcp.sqlite` existe no diretório raiz

4. **Permissões no macOS/Linux**:
   ```bash
   chmod +x build/server.js
   ```

### Logs de Debug:

Para verificar se o servidor está funcionando, você pode testá-lo diretamente:

```bash
# Teste direto do servidor
node build/server.js
```

## 🔄 Desenvolvimento

Para desenvolvimento, você pode usar:

```bash
# Executar em modo de desenvolvimento
npx ts-node src/server.ts

# Recriar dados de teste
npm run seed

# Executar com watch mode (reinicia automaticamente)
npx ts-node --watch src/server.ts
```

### Estrutura de Desenvolvimento:

- `src/server.ts`: Servidor MCP principal com definição das ferramentas
- `src/helpers.ts`: Funções de acesso ao banco de dados SQLite
- `seed.ts`: Script para popular o banco com dados de teste
- `build/`: Diretório com arquivos compilados para produção

## 🤝 Contribuição

Contribuições são bem-vindas! Para contribuir:

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-funcionalidade`)
3. Commit suas mudanças (`git commit -am 'Adiciona nova funcionalidade'`)
4. Push para a branch (`git push origin feature/nova-funcionalidade`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença ISC. Veja o arquivo `package.json` para mais detalhes.

## 🆘 Suporte

Se você encontrar problemas ou tiver dúvidas:

1. Verifique a seção de [Troubleshooting](#-troubleshooting)
2. Consulte a documentação do [Model Context Protocol](https://modelcontextprotocol.io/)
3. Abra uma issue no repositório do projeto