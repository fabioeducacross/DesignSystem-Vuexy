import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  ListResourcesRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";

const server = new Server(
  {
    name: "educacross-ds-server",
    version: "1.1.0",
  },
  {
    capabilities: {
      resources: {},
      tools: {},
    },
  }
);

server.setRequestHandler(ListResourcesRequestSchema, async () => {
  return {
    resources: [
      {
        uri: "design-system://production/components",
        name: "Educacross V2 - Componentes Reais",
        mimeType: "application/json",
        description: "Componentes validados e em uso no frontoffice (Branch v1.2)",
      },
      {
        uri: "design-system://reference/vuexy-core",
        name: "Vuexy Core - Componentes Base",
        mimeType: "application/json",
        description: "Componentes originais do template Vuexy para referência (Branch main)",
      }
    ],
  };
});

server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: "get_component_context",
        description: "Busca o código, stories e documentação de um componente",
        inputSchema: {
          type: "object",
          properties: {
            library: { 
              type: "string", 
              enum: ["production", "reference"],
              description: "Use 'production' para componentes Educacross ou 'reference' para Vuexy original" 
            },
            componentName: { type: "string", description: "Nome do componente (ex: ProgressBar ou Button)" },
          },
          required: ["library", "componentName"],
        },
      },
    ],
  };
});

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  if (name === "get_component_context") {
    // A implementação real fará o fetch dos arquivos .stories.js via API do GitHub futuramente
    return {
      content: [
        {
          type: "text",
          text: `[MCP] Contexto solicitado para ${args.componentName} na biblioteca ${args.library}.`,
        },
      ],
    };
  }

  throw new Error(`Ferramenta não encontrada: ${name}`);
});

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

main().catch(console.error);
