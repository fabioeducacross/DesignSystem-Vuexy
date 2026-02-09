#!/usr/bin/env node

/**
 * Demo Interativo do Design System MCP Server
 * 
 * Mostra exemplos reais de uso das 7 tools MCP:
 * 1. listComponents - Listagem com paginação
 * 2. getComponent - Detalhes completos
 * 3. searchComponents - Busca textual
 * 4. getStats - Estatísticas agregadas
 * 5. getComponentsByCategory - Filtro por categoria
 * 6. getCacheStats - Métricas de cache
 * 7. getSearchIndexStats - Métricas de índice
 */

import { spawn } from 'child_process';
import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = join(__dirname, '../..');

console.log('🎯 DEMO INTERATIVO - Design System MCP Server\n');
console.log('═'.repeat(60));

// Inicia o servidor MCP
const serverPath = join(projectRoot, 'dist', 'index.js');
const serverProcess = spawn('node', [serverPath], {
  stdio: ['pipe', 'pipe', 'pipe'],
  cwd: projectRoot
});

// Cria cliente MCP
const transport = new StdioClientTransport({
  command: 'node',
  args: [serverPath],
});

const client = new Client(
  { name: 'demo-client', version: '1.0.0' },
  { capabilities: {} }
);

await client.connect(transport);
console.log('✅ Conectado ao servidor MCP\n');

// Função helper para formatar JSON
function prettyPrint(title, data, maxLines = 20) {
  console.log(`\n${'─'.repeat(60)}`);
  console.log(`📋 ${title}`);
  console.log('─'.repeat(60));
  
  const lines = JSON.stringify(data, null, 2).split('\n');
  if (lines.length > maxLines) {
    console.log(lines.slice(0, maxLines).join('\n'));
    console.log(`... (${lines.length - maxLines} linhas omitidas)`);
  } else {
    console.log(lines.join('\n'));
  }
}

try {
  // ========================================
  // 1. ListComponents - Primeiros 5
  // ========================================
  console.log('\n\n🔧 TOOL 1: listComponents (primeiros 5)');
  const listResult = await client.callTool({
    name: 'listComponents',
    arguments: {
      page: 1,
      limit: 5
    }
  });
  const listData = JSON.parse(listResult.content[0].text);
  prettyPrint(
    'Primeiros 5 Componentes',
    {
      total: listData.pagination.total,
      componentes: listData.components.map(c => ({
        nome: c.name,
        categoria: c.category,
        prioridade: c.priority,
        stories: c.stats.storiesCount,
        props: c.stats.propsCount
      }))
    }
  );

  // ========================================
  // 2. GetComponent - Detalhes completos
  // ========================================
  console.log('\n\n🔧 TOOL 2: getComponent (exemplo: Button)');
  const getResult = await client.callTool({
    name: 'getComponent',
    arguments: { name: 'Button' }
  });
  const getData = JSON.parse(getResult.content[0].text);
  
  if (getData.component) {
    prettyPrint(
      'Detalhes do Componente Button',
      {
        nome: getData.component.name,
        categoria: getData.component.category,
        prioridade: getData.component.priority,
        metadata: {
          title: getData.component.metadata.title,
          description: getData.component.metadata.description?.substring(0, 100) + '...',
          tags: getData.component.metadata.tags
        },
        stats: getData.component.stats,
        stories: getData.component.stories.map(s => s.name),
        props: getData.component.props?.slice(0, 3).map(p => ({
          nome: p.name,
          tipo: p.type,
          required: p.required
        }))
      },
      25
    );
  } else {
    console.log('⚠️  Componente Button não encontrado (pode não existir no DS)');
  }

  // ========================================
  // 3. SearchComponents - Busca
  // ========================================
  console.log('\n\n🔧 TOOL 3: searchComponents (query: "modal")');
  const searchResult = await client.callTool({
    name: 'searchComponents',
    arguments: {
      query: 'modal',
      limit: 5
    }
  });
  const searchData = JSON.parse(searchResult.content[0].text);
  prettyPrint(
    'Resultados de Busca para "modal"',
    {
      total: searchData.total,
      resultados: searchData.results.map(r => ({
        nome: r.component.name,
        categoria: r.component.category,
        score: r.score.toFixed(3),
        termos_encontrados: r.matchedTerms,
        campos_match: r.matchedFields
      }))
    }
  );

  // ========================================
  // 4. GetStats - Estatísticas gerais
  // ========================================
  console.log('\n\n🔧 TOOL 4: getStats (estatísticas agregadas)');
  const statsResult = await client.callTool({
    name: 'getStats',
    arguments: {}
  });
  const statsData = JSON.parse(statsResult.content[0].text);
  prettyPrint(
    'Estatísticas do Design System',
    {
      totais: {
        componentes: statsData.totalComponents,
        stories: statsData.totalStories
      },
      por_categoria: Object.entries(statsData.categoryCounts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 10)
        .reduce((obj, [k, v]) => ({ ...obj, [k]: v }), {}),
      por_prioridade: statsData.priorityCounts,
      cache: {
        items: statsData.cache.itemsCount,
        hits: statsData.cache.totalHits,
        misses: statsData.cache.totalMisses,
        hit_rate: `${(statsData.cache.hitRate * 100).toFixed(1)}%`
      },
      search: {
        documentos: statsData.search.totalDocuments,
        tokens: statsData.search.totalTokens,
        media_tokens: statsData.search.averageTokensPerDocument.toFixed(2)
      }
    },
    35
  );

  // ========================================
  // 5. GetComponentsByCategory - Filtro
  // ========================================
  console.log('\n\n🔧 TOOL 5: getComponentsByCategory (categoria: Forms)');
  const categoryResult = await client.callTool({
    name: 'getComponentsByCategory',
    arguments: { category: 'Forms' }
  });
  const categoryData = JSON.parse(categoryResult.content[0].text);
  prettyPrint(
    'Componentes da Categoria "Forms"',
    {
      categoria: categoryData.category,
      total: categoryData.total,
      componentes: categoryData.components.slice(0, 5).map(c => ({
        nome: c.name,
        prioridade: c.priority,
        stories: c.stats.storiesCount
      }))
    }
  );

  // ========================================
  // 6. GetCacheStats - Cache
  // ========================================
  console.log('\n\n🔧 TOOL 6: getCacheStats (métricas de cache)');
  const cacheStatsResult = await client.callTool({
    name: 'getCacheStats',
    arguments: {}
  });
  const cacheStatsData = JSON.parse(cacheStatsResult.content[0].text);
  prettyPrint(
    'Estatísticas do Cache',
    {
      items_no_cache: cacheStatsData.itemsCount,
      hits: cacheStatsData.totalHits,
      misses: cacheStatsData.totalMisses,
      hit_rate: `${(cacheStatsData.hitRate * 100).toFixed(1)}%`,
      memoria_usada: `${(cacheStatsData.memoryUsage / 1024).toFixed(2)} KB`,
      top_items: cacheStatsData.topItems.slice(0, 5).map(item => ({
        componente: item.key,
        acessos: item.hits
      }))
    }
  );

  // ========================================
  // 7. GetSearchIndexStats - Índice
  // ========================================
  console.log('\n\n🔧 TOOL 7: getSearchIndexStats (métricas do índice)');
  const indexStatsResult = await client.callTool({
    name: 'getSearchIndexStats',
    arguments: {}
  });
  const indexStatsData = JSON.parse(indexStatsResult.content[0].text);
  prettyPrint(
    'Estatísticas do Índice de Busca',
    {
      documentos_indexados: indexStatsData.totalDocuments,
      tokens_unicos: indexStatsData.totalTokens,
      media_tokens_por_doc: indexStatsData.averageTokensPerDocument.toFixed(2),
      eficiencia: indexStatsData.averageTokensPerDocument < 5 
        ? 'Ótima (poucos tokens por documento)'
        : 'Normal'
    }
  );

  // ========================================
  // RESUMO FINAL
  // ========================================
  console.log('\n\n' + '═'.repeat(60));
  console.log('🎉 DEMO COMPLETO!');
  console.log('═'.repeat(60));
  console.log('\n✅ Todas as 7 tools MCP funcionando perfeitamente!');
  console.log('\n📊 Resumo:');
  console.log(`   • ${statsData.totalComponents} componentes carregados`);
  console.log(`   • ${statsData.totalStories} stories processadas`);
  console.log(`   • ${Object.keys(statsData.categoryCounts).length} categorias`);
  console.log(`   • ${cacheStatsData.itemsCount} items em cache`);
  console.log(`   • ${indexStatsData.totalDocuments} documentos indexados`);
  console.log(`   • ${(cacheStatsData.hitRate * 100).toFixed(1)}% cache hit rate`);
  
  console.log('\n💡 Para usar no Claude Desktop:');
  console.log('   1. Configure claude_desktop_config.json');
  console.log('   2. As tools estarão disponíveis para o Claude');
  console.log('   3. Pergunte sobre componentes e o Claude usará estas tools!');
  
  console.log('\n📚 Documentação:');
  console.log('   • README.md - Overview completo');
  console.log('   • QUICK_START.md - Guia de uso');
  console.log('   • docs/PHASE3_E2E_TESTING.md - Detalhes técnicos');
  console.log('\n');

} catch (error) {
  console.error('\n❌ Erro:', error.message);
  console.error(error);
} finally {
  await client.close();
  serverProcess.kill();
  process.exit(0);
}
