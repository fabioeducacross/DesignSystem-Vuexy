/**
 * Debug do parseVueFile para entender a estrutura retornada
 */

import { parseVueFile } from '../../dist/parsers/vue-parser.js';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '../..');

async function debugParser() {
  console.log('\n🔍 DEBUG DO PARSER VUE\n');
  
  // Testar com ESelect.vue (sabemos que tem 23 props)
  const eselectPath = join(rootDir, '../educacross-frontoffice/src/components/selects/ESelect.vue');
  
  console.log('📂 Parseando:', eselectPath, '\n');
  
  const result = await parseVueFile(eselectPath);
  
  console.log('📦 Estrutura retornada pelo parseVueFile:');
  console.log(JSON.stringify(Object.keys(result), null, 2));
  console.log('\n');
  
  console.log('🔑 result.component:');
  console.log('   Existe?', !!result.component);
  if (result.component) {
    console.log('   Keys:', Object.keys(result.component));
    console.log('   Props count:', result.component.props?.length || 0);
    console.log('   Events count:', result.component.events?.length || 0);
    console.log('   Slots count:', result.component.slots?.length || 0);
  }
  console.log('\n');
  
  console.log('🔑 result direto (sem .component):');
  console.log('   result.props:', result.props?.length || 0);
  console.log('   result.events:', result.events?.length || 0);
  console.log('   result.slots:', result.slots?.length || 0);
  console.log('\n');
  
  console.log('📋 Estrutura completa (primeiros 20 caracteres de cada campo):');
  for (const [key, value] of Object.entries(result)) {
    if (typeof value === 'string') {
      console.log(`   ${key}: "${value.substring(0, 50)}..."`);
    } else if (Array.isArray(value)) {
      console.log(`   ${key}: Array[${value.length}]`);
      if (value.length > 0 && value[0].name) {
        console.log(`      Primeiro item: ${value[0].name}`);
      }
    } else if (typeof value === 'object' && value !== null) {
      console.log(`   ${key}: Object { ${Object.keys(value).slice(0, 3).join(', ')} }`);
    } else {
      console.log(`   ${key}:`, value);
    }
  }
  
  console.log('\n');
  console.log('✅ Se result.component existe, usar result.component');
  console.log('✅ Se não, usar result diretamente (props, events, slots no root)');
}

debugParser().catch(console.error);
