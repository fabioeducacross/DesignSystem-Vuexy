import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  ListResourcesRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import axios from "axios";

// CONFIGURAÇÃO DO REPOSITÓRIO
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const REPO_OWNER = "fabioeducacross";
const REPO_NAME = "DesignSystem-Vuexy";
const DEFAULT_BRANCH = "main";
const V2_BRANCH = "v1.2"; // Alterar para "main" após o merge final

const server = new Server(
  { name: "educacross-ds-server", version: "1.2.0" },
  { capabilities: { resources: {}, tools: {} } }
);

/**
 * Helper para buscar arquivos via GitHub API
 */
async function getFileContent(path, branch) {
  if (!GITHUB_TOKEN) {
    throw new Error("GITHUB_TOKEN não configurado no ambiente.");
  }
  
  const url = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${path}?ref=${branch}`;
  
  try {
    const response = await axios.get(url, {
      headers: { 
        Authorization: `token ${GITHUB_TOKEN}`,
        Accept: "application/vnd.github.v3.raw" // Pega o conteúdo puro (raw)
      }
    });
    return response.data;
  } catch (error) {
    return null;
  }
}

server.setRequestHandler(ListResourcesRequestSchema, async () => {
  return {
    resources: [
      {
        uri: "design-system://production/components",
        name: "Educacross V2 - Componentes Reais",
        mimeType: "application/json",
        description: "Componentes validados e em uso no frontoffice (Branch v1.2 ou main)",
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
        description: "Busca o código-fonte real e documentação de um componente",
        inputSchema: {
          type: "object",
          properties: {
            library: { 
              type: "string", 
              enum: ["production", "reference"],
              description: "production = Educacross V2 | reference = Vuexy Core" 
            },
            componentName: { type: "string", description: "Nome exato (ex: ProgressBar)" },
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
    const isProd = args.library === "production";
    const folder = isProd ? "src/stories/educacross-components-v2" : "src/stories/atoms";
    const filename = `${args.componentName}.stories.js`;
    const path = `${folder}/${filename}`;

    // Lógica de Transição: Tenta na branch de produção (v1.2) primeiro, depois na main
    let content = await getFileContent(path, isProd ? V2_BRANCH : DEFAULT_BRANCH);
    
    if (!content && isProd) {
      // Fallback para main caso o merge já tenha ocorrido
      content = await getFileContent(path, DEFAULT_BRANCH);
    }

    if (!content) {
      return { content: [{ type: "text", text: `Componente ${args.componentName} não encontrado em ${path}` }] };
    }

    return {
      content: [
        { type: "text", text: `--- BIBLIOTECA: ${args.library.toUpperCase()} ---\n\n${content}` }
      ],
    };
  }
  throw new Error("Tool not found");
});

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

main().catch(console.error);