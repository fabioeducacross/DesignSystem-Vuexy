/**
 * Debug completo do fluxo de carregamento
 */

import { ComponentLoader } from '../../dist/loader/component-loader.js';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '../..');

async function debugLoadFlow() {
  console.log('\n🔍 DEBUG DO FLUXO DE CARREGAMENTO\n');
  
  const loader = new ComponentLoader({
    storiesPath: join(rootDir, '../src/stories/educacross-components-v2'),
    componentsPath: join(rootDir, '../educacross-frontoffice/src/components')
  });

  console.log('⏳ Carregando apenas 3 componentes para debug...\n');
  
  // Acessar método privado via reflexão (hack para debug)
  const findVueFiles = loader['findVueFiles'].bind(loader);
  const extractComponentNameFromPath = loader['extractComponentNameFromPath'].bind(loader);
  const parseVueFile = (await import('../../dist/parsers/vue-parser.js')).parseVueFile;
  
  const vueFiles = await findVueFiles();
  
  // Pegar apenas ESelect, MediaCard e QuestionDetail para debug
  const eselectFile = vueFiles.find(f => f.includes('ESelect.vue'));
  const mediaFile = vueFiles.find(f => f.includes('MediaCard') && !f.includes('Dynamic'));
  const questionFile = vueFiles.find(f => f.includes('QuestionDetail.vue'));
  
  const testFiles = [eselectFile, mediaFile, questionFile].filter(Boolean);
  
  console.log(`🎯 Testando ${testFiles.length} componentes:\n`);
  
  for (const file of testFiles) {
    console.log(`\n📂 ${file.split('\\').pop() || file.split('/').pop()}\n`);
    
    try {
      const parsed = await parseVueFile(file);
      const componentName = extractComponentNameFromPath(file);
      
      // Simulando o que FASE 1 faz
      const vueData = {
        filepath: file,
        parsed
      };
      
      console.log('   1️⃣ Nome extraído:', componentName);
      console.log('   2️⃣ vueData.filepath:', vueData.filepath.substring(vueData.filepath.length - 50));
      console.log('   3️⃣ vueData.parsed existe?', !!vueData.parsed);
      console.log('   4️⃣ vueData.parsed.component existe?', !!vueData.parsed.component);
      console.log('   5️⃣ Props:', vueData.parsed?.component?.props?.length || 0);
      console.log('   6️⃣ Events:', vueData.parsed?.component?.events?.length || 0);
      console.log('   7️⃣ Slots:', vueData.parsed?.component?.slots?.length || 0);
      
      // Simular o que buildComponent faz
      const vueComponent = vueData?.parsed?.component || { props: [], events: [], slots: [] };
      const vuePath = vueData?.filepath || '';
      
      console.log('   ✅ Após extração em buildComponent:');
      console.log('      vueComponent.props.length:', vueComponent.props.length);
      console.log('      vuePath:', vuePath.substring(vuePath.length - 50));
      
      if (vueComponent.props.length > 0) {
        console.log('      Primeiros 3 props:', vueComponent.props.slice(0, 3).map(p => p.name).join(', '));
      }
      
    } catch (error) {
      console.log('   ❌ ERRO:', error.message);
      console.log('      Stack:', error.stack?.substring(0, 200));
    }
  }
  
  console.log('\n' + '='.repeat(60));
  console.log('🔬 DIAGNÓSTICO:');
  console.log('Se os props aparecem aqui mas não no loader, o problema');
  console.log('está em como o buildComponent é chamado no loadAll().');
  console.log('='.repeat(60) + '\n');
}

debugLoadFlow().catch(console.error);
