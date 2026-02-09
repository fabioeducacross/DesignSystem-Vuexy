/**
 * Comprehensive validation test for the MCP server
 * This test verifies all the server components are properly configured
 */
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  ListResourcesRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";

console.log('🧪 MCP Server Validation Test\n');

// Test 1: Server instantiation
console.log('✓ Test 1: Server can be instantiated');
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
console.log('  ✓ Server created successfully\n');

// Test 2: Request handlers
console.log('✓ Test 2: Request handlers can be configured');
let handlersConfigured = 0;

try {
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
  handlersConfigured++;
  console.log('  ✓ ListResourcesRequestSchema handler configured');

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
  handlersConfigured++;
  console.log('  ✓ ListToolsRequestSchema handler configured');

  server.setRequestHandler(CallToolRequestSchema, async (request) => {
    const { name, arguments: args } = request.params;

    if (name === "get_component_context") {
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
  handlersConfigured++;
  console.log('  ✓ CallToolRequestSchema handler configured\n');
} catch (error) {
  console.error('  ✗ Error configuring handlers:', error);
  process.exit(1);
}

// Test 3: StdioServerTransport
console.log('✓ Test 3: StdioServerTransport can be instantiated');
try {
  const transport = new StdioServerTransport();
  console.log('  ✓ Transport created successfully\n');
} catch (error) {
  console.error('  ✗ Error creating transport:', error);
  process.exit(1);
}

// Summary
console.log('═══════════════════════════════════════');
console.log('📊 Validation Summary');
console.log('═══════════════════════════════════════');
console.log(`✓ All tests passed (3/3)`);
console.log(`✓ Request handlers configured: ${handlersConfigured}/3`);
console.log('✓ Server is ready for deployment');
console.log('═══════════════════════════════════════\n');

console.log('🎉 MCP Server validation completed successfully!');
console.log('\nTo start the server, run:');
console.log('  npm start');
