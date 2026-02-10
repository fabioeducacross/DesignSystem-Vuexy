/**
 * Teste de qualidade dos componentes carregados
 * Verifica se os componentes estão sendo carregados corretamente dos arquivos .vue
 */

import { ComponentLoader } from '../../dist/loader/component-loader.js';
import { logger } from '../../dist/utils/logger.js';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '../..');

async function testComponentQuality() {
  console.log('\n🔍 TESTE DE QUALIDADE DOS COMPONENTES\n');
  
  const loader = new ComponentLoader({
    storiesPath: join(rootDir, '../src/stories/educacross-components-v2'),
    componentsPath: join(rootDir, '../educacross-frontoffice/src/components')
  });

  console.log('⏳ Carregando componentes...\n');
  const result = await loader.loadAll();
  
  console.log(`✅ Total carregado: ${result.components.length} componentes`);
  console.log(`⚠️  Erros: ${result.errors.length}\n`);
  
  // Analisar componentes carregados
  const withProps = result.components.filter(c => c.vue.props.length > 0);
  const withEvents = result.components.filter(c => c.vue.events.length > 0);
  const withSlots = result.components.filter(c => c.vue.slots.length > 0);
  const withSnippets = result.components.filter(c => c.snippets);
  
  console.log('📊 ESTATÍSTICAS DE QUALIDADE:\n');
  console.log(`   Props: ${withProps.length}/${result.components.length} componentes (${((withProps.length/result.components.length)*100).toFixed(1)}%)`);
  console.log(`   Events: ${withEvents.length}/${result.components.length} componentes (${((withEvents.length/result.components.length)*100).toFixed(1)}%)`);
  console.log(`   Slots: ${withSlots.length}/${result.components.length} componentes (${((withSlots.length/result.components.length)*100).toFixed(1)}%)`);
  console.log(`   Snippets: ${withSnippets.length}/${result.components.length} componentes (${((withSnippets.length/result.components.length)*100).toFixed(1)}%)\n`);
  
  // Top 10 componentes com mais props
  console.log('🏆 TOP 10 COMPONENTES COM MAIS PROPS:\n');
  const sortedByProps = [...result.components]
    .sort((a, b) => b.vue.props.length - a.vue.props.length)
    .slice(0, 10);
  
  sortedByProps.forEach((comp, i) => {
    console.log(`   ${i+1}. ${comp.name}: ${comp.vue.props.length} props, ${comp.vue.events.length} events, ${comp.vue.slots.length} slots`);
    if (comp.vue.props.length > 0) {
      const firstProps = comp.vue.props.slice(0, 3).map(p => p.name).join(', ');
      console.log(`      Props: ${firstProps}${comp.vue.props.length > 3 ? ', ...' : ''}`);
    }
  });
  
  console.log('\n');
  
  // Componentes críticos (ESelect, MediaCard, etc)
  console.log('🎯 COMPONENTES CRÍTICOS:\n');
  const critical = ['ESelect', 'MediaCard', 'DynamicMediaCard', 'QuestionDetail', 'ListTable'];
  
  for (const name of critical) {
    const comp = result.components.find(c => c.name === name);
    if (comp) {
      console.log(`   ✅ ${name}: ${comp.vue.props.length} props, ${comp.vue.events.length} events, ${comp.vue.slots.length} slots`);
      if (comp.vue.props.length > 0) {
        const propNames = comp.vue.props.slice(0, 5).map(p => `${p.name}${p.required ? '*' : ''}`).join(', ');
        console.log(`      Props: ${propNames}${comp.vue.props.length > 5 ? ', ...' : ''}`);
      }
    } else {
      console.log(`   ❌ ${name}: NÃO ENCONTRADO`);
    }
  }
  
  console.log('\n');
  
  // Verificar snippets de um componente específico
  const eselect = result.components.find(c => c.name === 'ESelect');
  if (eselect && eselect.snippets) {
    console.log('📝 SNIPPETS DO ESelect:\n');
    console.log('   ✅ Vue3:', eselect.snippets.basic.vue3.code.length, 'caracteres');
    console.log('   ✅ Vue2:', eselect.snippets.basic.vue2.code.length, 'caracteres');
    console.log('   ✅ React:', eselect.snippets.basic.react.code.length, 'caracteres');
    console.log('   ✅ Vanilla:', eselect.snippets.basic.vanilla.code.length, 'caracteres');
    console.log('\n   Preview Vue3:');
    console.log('   ' + eselect.snippets.basic.vue3.code.split('\n').slice(0, 8).join('\n   '));
    console.log('   ...\n');
  }
  
  // Erros detalhados
  if (result.errors.length > 0) {
    console.log('⚠️  ERROS ENCONTRADOS:\n');
    result.errors.slice(0, 10).forEach((err, i) => {
      console.log(`   ${i+1}. ${err.file}`);
      console.log(`      ${err.error.split('\n')[0]}`);
    });
    if (result.errors.length > 10) {
      console.log(`   ... e mais ${result.errors.length - 10} erros\n`);
    }
  }
  
  // Resultado final
  console.log('\n' + '='.repeat(60));
  if (withProps.length >= 100 && withSnippets.length >= 100) {
    console.log('✅ TESTE PASSOU! Componentes carregados com qualidade');
  } else {
    console.log('⚠️  ATENÇÃO: Qualidade dos dados abaixo do esperado');
  }
  console.log('='.repeat(60) + '\n');
}

testComponentQuality().catch(console.error);
