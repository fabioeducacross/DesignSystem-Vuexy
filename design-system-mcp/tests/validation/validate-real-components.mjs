/**
 * SCRIPT DE VALIDAÇÃO - Testa parser com componentes REAIS
 * 
 * Objetivo: PROVAR que conseguimos parsear os 117 componentes antes de mudar o código
 */

import { parseVueFile } from '../../dist/parsers/vue-parser.js';
import { existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const ROOT = join(__dirname, '..', '..', '..');
const COMPONENTS_PATH = join(ROOT, 'educacross-frontoffice', 'src', 'components');

// Componentes reais confirmados da investigação
const TEST_COMPONENTS = [
  // Collapse
  'app-collapse/AppCollapse.vue',
  'app-collapse/AppCollapseItem.vue',
  
  // Cards
  'card/MediaCard.vue',
  'card/DynamicMediaCard.vue',
  'card/MediaCardIcon.vue',
  
  // Player
  'player/AlbumCover.vue',
  
  // Selects
  'selects/ESelect.vue',
  
  // Badge
  'badge/BadgeStatus.vue',
  'badge/CellStatus.vue',
  'badge/ConditionalValueDisplay.vue',
  
  // Charts
  'chart/BarChart.vue',
  'chart/DefaultChart.vue',
  'chart/PieChart.vue',
  'chart/RadialBar.vue',
  'chart/RadialBarChart.vue',
  
  // Language
  'app-language-selector/AppLanguageSelector.vue',
  
  // Cells
  'cells/PerformanceCell.vue',
  
  // DeepLink
  'deeplink/BackgroundSpace.vue',
  'deeplink/IntermediateRedirectLoginDeepLink.vue',
  'deeplink/NewDeepLink.vue',
  
  // Descriptors
  'descriptors/DescriptorTag.vue',
  
  // Divider
  'divider/Divider.vue',
  'divider/VerticalDivider.vue',
  
  // Evaluations
  'evaluations/questionDetail/QuestionDetail.vue',
  'evaluations/questionDetail/components/QuestionAlternative.vue',
  'evaluations/questionDetail/components/QuestionContent.vue',
  
  // Templates
  'evaluations/questionDetail/templates/Template1.vue',
  'evaluations/questionDetail/templates/Template2.vue',
  'evaluations/questionDetail/templates/Template3.vue',
  
  // Root
  'FixedStickyFooter.vue',
];

console.log('╔════════════════════════════════════════════════════════════════╗');
console.log('║  VALIDAÇÃO DE COMPONENTES REAIS - Parser Vue                  ║');
console.log('╚════════════════════════════════════════════════════════════════╝\n');

const results = {
  success: [],
  partial: [],
  failed: [],
};

async function runValidation() {
  for (const componentPath of TEST_COMPONENTS) {
    const fullPath = join(COMPONENTS_PATH, componentPath);
    const componentName = componentPath.split('/').pop().replace('.vue', '');
    
    console.log(`\n📄 Testando: ${componentName}`);
    console.log(`   Path: ${componentPath}`);

    if (!existsSync(fullPath)) {
      console.log(`   ❌ ERRO: Arquivo não existe!`);
      results.failed.push({ name: componentName, reason: 'Arquivo não encontrado' });
      continue;
    }

    try {
      // parseVueFile é async e recebe apenas o filepath
      const parsed = await parseVueFile(fullPath);

      // parseVueFile retorna { component: { props, events, slots } }
      const component = parsed.component;
      const hasProps = component.props.length > 0;
      const hasEvents = component.events.length > 0;
      const hasSlots = component.slots.length > 0;
      const hasAny = hasProps || hasEvents || hasSlots;

      console.log(`   Props: ${component.props.length}`);
      console.log(`   Events: ${component.events.length}`);
      console.log(`   Slots: ${component.slots.length}`);

      if (hasAny) {
        console.log(`   ✅ SUCESSO - Metadata extraída`);
        results.success.push({
          name: componentName,
          props: component.props.length,
          events: component.events.length,
          slots: component.slots.length,
        });

        // Mostrar detalhes das props (primeiras 3)
        if (component.props.length > 0) {
          console.log(`   📋 Props encontradas:`);
          component.props.slice(0, 3).forEach(prop => {
            console.log(`      - ${prop.name}: ${prop.type || 'any'} ${prop.required ? '(obrigatória)' : ''}`);
          });
          if (component.props.length > 3) {
            console.log(`      ... e mais ${component.props.length - 3} props`);
          }
        }
      } else {
        console.log(`   ⚠️  PARCIAL - Parser funcionou, mas nenhuma metadata encontrada`);
        results.partial.push({
          name: componentName,
          reason: 'Sem props/events/slots definidos explicitamente',
        });
      }
    } catch (error) {
      console.log(`   ❌ FALHA - ${error.message}`);
      results.failed.push({
        name: componentName,
        reason: error.message,
      });
    }
  }

  // Resumo final
  console.log('\n\n╔════════════════════════════════════════════════════════════════╗');
  console.log('║  RESUMO DA VALIDAÇÃO                                          ║');
  console.log('╚════════════════════════════════════════════════════════════════╝\n');

  const total = TEST_COMPONENTS.length;
  const successCount = results.success.length;
  const partialCount = results.partial.length;
  const failedCount = results.failed.length;
  const successRate = ((successCount / total) * 100).toFixed(1);

  console.log(`✅ Sucesso completo:   ${successCount}/${total} (${successRate}%)`);
  console.log(`⚠️  Sucesso parcial:    ${partialCount}/${total}`);
  console.log(`❌ Falhas:             ${failedCount}/${total}\n`);

  if (results.failed.length > 0) {
    console.log('❌ COMPONENTES COM FALHA:');
    results.failed.forEach(({ name, reason }) => {
      console.log(`   - ${name}: ${reason}`);
    });
    console.log('');
  }

  if (results.partial.length > 0) {
    console.log('⚠️  COMPONENTES PARCIAIS (funcionou mas sem metadata):');
    results.partial.forEach(({ name, reason }) => {
      console.log(`   - ${name}: ${reason}`);
    });
    console.log('');
  }

  if (results.success.length > 0) {
    console.log('✅ COMPONENTES COM SUCESSO:');
    results.success.forEach(({ name, props, events, slots }) => {
      console.log(`   - ${name}: ${props} props, ${events} events, ${slots} slots`);
    });
    console.log('');
  }

  // Decisão final
  console.log('╔════════════════════════════════════════════════════════════════╗');
  console.log('║  DECISÃO TÉCNICA                                              ║');
  console.log('╚════════════════════════════════════════════════════════════════╝\n');

  if (successRate >= 70) {
    console.log(`✅ VALIDAÇÃO APROVADA (${successRate}%)`);
    console.log(`   → Parser funciona com componentes reais`);
    console.log(`   → RECOMENDAÇÃO: Prosseguir com Opção A (Redesign)\n`);
    process.exit(0);
  } else if (successRate >= 40) {
    console.log(`⚠️  VALIDAÇÃO PARCIAL (${successRate}%)`);
    console.log(`   → Parser funciona mas precisa ajustes`);
    console.log(`   → RECOMENDAÇÃO: Investigar falhas antes de continuar\n`);
    process.exit(1);
  } else {
    console.log(`❌ VALIDAÇÃO REPROVADA (${successRate}%)`);
    console.log(`   → Parser não está funcionando adequadamente`);
    console.log(`   → RECOMENDAÇÃO: Revisar estratégia (considerar Opção B ou C)\n`);
    process.exit(2);
  }
}

// Executar validação
runValidation().catch((error) => {
  console.error('\n❌ ERRO FATAL NA VALIDAÇÃO:', error.message);
  console.error(error.stack);
  process.exit(3);
});
