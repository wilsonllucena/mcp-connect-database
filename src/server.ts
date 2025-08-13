import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { buscarClientesPorOrigem, listarClientes, obterMetricasClientes, quantidadeClientes, quantidadeClientesAtivosPorOrigem } from "./helpers";
import z from "zod";


const server = new McpServer({
  name: "mcp-connect-database",
  version: "1.0.0",
  capabilities: {
    resources: {},
    tools: {
      "listar-clientes": {
        name: "listar-clientes",
        description: "Lista todos os clientes cadastrados no sistema",
      },
      "quantidade-clientes": {
        name: "quantidade-clientes",
        description: "Retorna a quantidade total de clientes cadastrados",
      },
      "buscar-clientes-por-origem": {
        name: "buscar-clientes-por-origem",
        description: "Busca clientes por origem",
      },
      "quantidade-clientes-ativos-por-origem": {
        name: "quantidade-clientes-ativos-por-origem",
        description: "Retorna a quantidade total de clientes ativos cadastrados por origem",
      },
      "obter-metricas": {
        name: "obter-metricas-clientes",
        description: "Obtém métricas de clientes",
      },
    },
  },
});

server.tool(
  "listar-clientes",
  "Lista todos os clientes cadastrados no sistema",
  {},
  async () => {
    try {
      const clientes = await listarClientes();
      
      if (clientes.length === 0) {
        return {
          content: [
            {
              type: "text",
              text: "Nenhum cliente encontrado no sistema.",
            },
          ],
        };
      }

      // Formatar a lista de usuários de forma mais legível
      const clientesFormatados = clientes.map((cliente, index) => {
        return `${index + 1}. **${cliente.nome}**\n` +
               `   📧 Email: ${cliente.email}\n` +
               `   📍 Endereço: ${cliente.bairro}, ${cliente.cidade} - ${cliente.estado}\n` +
               `   📮 CEP: ${cliente.cep}\n` +
               `   ✅ Ativo: ${cliente.ativo ? 'Sim' : 'Não'}\n` +
               `   🏢 Origem: ${cliente.origem}\n` +
               `   📅 Criado em: ${cliente.data_criacao}\n` +
               `   📅 Atualizado em: ${cliente.data_atualizacao}\n`;
      }).join('\n');

      return {
        content: [
          {
            type: "text",
            text: `📋 **Lista de Clientes (${clientes.length} encontrados)**\n\n${clientesFormatados}`,
          },
        ],
      };
    } catch (error) {
      return {
        content: [
          {
            type: "text",
            text: `❌ Erro ao listar clientes: ${error instanceof Error ? error.message : 'Erro desconhecido'}`,
          },
        ],
      };
    }
  },
);

server.tool(
  "quantidade-clientes",
  "Retorna a quantidade total de clientes cadastrados",
  {},
  async () => {
    try {
      const quantidade = await quantidadeClientes();
      return {
        content: [
          {
            type: "text",
            text: `📊 Quantidade total de clientes: ${quantidade}`,
          },
        ],
      };
    } catch (error) {
      return {
        content: [
          {
            type: "text",
            text: `❌ Erro ao contar clientes: ${error instanceof Error ? error.message : 'Erro desconhecido'}`,
          },
        ],
      };
    }
  },
);

server.tool(
  "buscar-clientes-por-origem",
  "Busca clientes por origem",
  {
    origem: z.string().describe("Origem dos clientes"),
  },
  async (params) => {
    try {
      const clientes = await buscarClientesPorOrigem(params.origem);
      if (clientes.length === 0) {
        return {
          content: [
            {
              type: "text",
              text: `Nenhum cliente encontrado com a origem ${params.origem}.`,
            },
          ],
        };
      }

      const clientesFormatados = clientes.map((cliente, index) => {
        return `${index + 1}. **${cliente.nome}**\n` +
               `   📧 Email: ${cliente.email}\n` +
               `   📍 Endereço: ${cliente.bairro}, ${cliente.cidade} - ${cliente.estado}\n` +
               `   📮 CEP: ${cliente.cep}\n` +
               `   ✅ Ativo: ${cliente.ativo ? 'Sim' : 'Não'}\n` +
               `   🏢 Origem: ${cliente.origem}\n` +
               `   📅 Criado em: ${cliente.data_criacao}\n` +
               `   📅 Atualizado em: ${cliente.data_atualizacao}\n`;
      }).join('\n');
      return {
        content: [
          {
            type: "text",
            text: `📋 **Clientes encontrados (${clientes.length})**\n\n${clientesFormatados}`,
          },
        ],
      };
    } catch (error) {
      return {
        content: [
          {
            type: "text",
            text: `❌ Erro ao buscar clientes por origem: ${error instanceof Error ? error.message : 'Erro desconhecido'}`,
          },
        ],
      };
    }
  },
);

server.tool(
  "quantidade-clientes-ativos-por-origem",
  "Retorna a quantidade total de clientes ativos cadastrados por origem",
  {
    origem: z.string().describe("Origem dos clientes"),
  },
  async (params) => {
    try {
      const quantidade = await quantidadeClientesAtivosPorOrigem(params.origem);
      return {
        content: [
          {
            type: "text",
            text: `📊 Quantidade total de clientes ativos (${params.origem}): ${quantidade}`,
          },
        ],
      };
    } catch (error) {
      return {
        content: [
          {
            type: "text",
            text: `❌ Erro ao contar clientes ativos por origem: ${error instanceof Error ? error.message : 'Erro desconhecido'}`,
          },
        ],
      };
    }
  },
);

server.tool(
  "obter-metricas-clientes",
  "Obtém métricas de clientes",
  {},
  async () => {
    try {
      const metrica = await obterMetricasClientes();
      return {
        content: [
          {
            type: "text",
            text: `📊 Métricas de clientes: ${JSON.stringify(metrica)}`,
          },
        ],
      };
    } catch (error) {
      return {
        content: [
          {
            type: "text",
            text: `❌ Erro ao obter métricas de clientes: ${error instanceof Error ? error.message : 'Erro desconhecido'}`,
          },
        ],
      };
    }
  },
);



async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.log("MCP Database Server running on stdio");
}

main().catch((error) => {
  console.error("Fatal error in main():", error);
  process.exit(1);
});