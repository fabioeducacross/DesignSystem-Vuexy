/**
 * Proof of Concept: Vue SFC Parser
 * 
 * Objetivo: Validar extração de props, events e slots de componentes Vue
 * usando @vue/compiler-sfc + TypeScript Compiler API
 */

import { parse, compileScript } from '@vue/compiler-sfc';
import ts from 'typescript';

export interface VueComponent {
  props: Array<{
    name: string;
    type: string;
    required: boolean;
    default?: unknown;
  }>;
  events: Array<{
    name: string;
    payload?: string;
  }>;
  slots: Array<{
    name: string;
  }>;
}

/**
 * Parse de componente Vue SFC
 */
export function parseVueComponent(code: string, filename: string = 'Component.vue'): VueComponent {
  const { descriptor, errors } = parse(code, { filename });
  
  if (errors.length > 0) {
    throw new Error(`Parse errors: ${errors.map(e => e.message).join(', ')}`);
  }
  
  const props: VueComponent['props'] = [];
  const events: VueComponent['events'] = [];
  const slots: VueComponent['slots'] = [];
  
  // Extrair props do <script setup>
  if (descriptor.scriptSetup) {
    const extractedProps = extractPropsFromScriptSetup(descriptor.scriptSetup.content);
    props.push(...extractedProps);
  }
  
  // Extrair events do <script setup>
  if (descriptor.scriptSetup) {
    const extractedEvents = extractEventsFromScriptSetup(descriptor.scriptSetup.content);
    events.push(...extractedEvents);
  }
  
  // Extrair slots do template
  if (descriptor.template) {
    const extractedSlots = extractSlotsFromTemplate(descriptor.template.content);
    slots.push(...extractedSlots);
  }
  
  return { props, events, slots };
}

/**
 * Extrai props de <script setup> usando TypeScript AST
 */
function extractPropsFromScriptSetup(code: string): VueComponent['props'] {
  const props: VueComponent['props'] = [];
  
  // Buscar defineProps<{ ... }>() - props tipados
  const typedPropsMatch = code.match(/defineProps<\{([^}]+)\}>\(\s*\)/s);
  
  if (typedPropsMatch) {
    const propsInterface = `interface Props {${typedPropsMatch[1]}}`;
    const sourceFile = ts.createSourceFile(
      'temp.ts',
      propsInterface,
      ts.ScriptTarget.Latest,
      true
    );
    
    // Traverse TypeScript AST
    ts.forEachChild(sourceFile, node => {
      if (ts.isInterfaceDeclaration(node)) {
        node.members.forEach(member => {
          if (ts.isPropertySignature(member) && ts.isIdentifier(member.name)) {
            const name = member.name.text;
            const type = member.type?.getText(sourceFile) || 'unknown';
            const required = !member.questionToken;
            
            props.push({ name, type, required });
          }
        });
      }
    });
  } else {
    // Buscar defineProps({ ... }) - props runtime
    const runtimePropsMatch = code.match(/defineProps\(\s*\{([^}]+)\}\s*\)/s);
    
    if (runtimePropsMatch) {
      // Simplificado: extrair apenas nomes
      // TODO: parse completo de objeto runtime para extrair type, required, default
      const propNames = [...runtimePropsMatch[1].matchAll(/(\w+)\s*:/g)];
      props.push(...propNames.map(m => ({
        name: m[1],
        type: 'unknown',
        required: false
      })));
    }
  }
  
  return props;
}

/**
 * Extrai events de <script setup>
 */
function extractEventsFromScriptSetup(code: string): VueComponent['events'] {
  const events: VueComponent['events'] = [];
  
  // Buscar defineEmits<{ ... }>()
  const emitsMatch = code.match(/defineEmits<\{([^}]+)\}>\(\s*\)/s);
  
  if (emitsMatch) {
    const emitsContent = emitsMatch[1];
    
    // Extrair nomes de eventos: 'eventName': ...
    const eventMatches = [...emitsContent.matchAll(/'([^']+)'|"([^"]+)"/g)];
    
    for (const match of eventMatches) {
      const name = match[1] || match[2];
      
      // Tentar extrair payload type (simplificado)
      const payloadMatch = emitsContent.match(new RegExp(`['"]${name}['"]\\s*:\\s*\\[([^\\]]+)\\]`));
      const payload = payloadMatch ? payloadMatch[1].trim() : undefined;
      
      events.push({ name, payload });
    }
  } else {
    // Buscar defineEmits(['event1', 'event2']) - runtime
    const runtimeEmitsMatch = code.match(/defineEmits\(\s*\[([^\]]+)\]\s*\)/s);
    
    if (runtimeEmitsMatch) {
      const eventNames = [...runtimeEmitsMatch[1].matchAll(/'([^']+)'|"([^"]+)"/g)];
      events.push(...eventNames.map(m => ({ name: m[1] || m[2] })));
    }
  }
  
  return events;
}

/**
 * Extrai slots do template Vue
 */
function extractSlotsFromTemplate(template: string): VueComponent['slots'] {
  const slots: VueComponent['slots'] = [];
  const seen = new Set<string>();
  
  // Buscar <slot name="...">
  const namedSlotMatches = [...template.matchAll(/<slot\s+name=["']([^"']+)["']/g)];
  
  for (const match of namedSlotMatches) {
    const name = match[1];
    if (!seen.has(name)) {
      slots.push({ name });
      seen.add(name);
    }
  }
  
  // Buscar <slot> (default slot)
  if (template.includes('<slot>') || template.match(/<slot\s+[^>]*>/)) {
    if (!seen.has('default')) {
      // Só adicionar default se não houver name attribute
      const hasOnlyDefault = namedSlotMatches.length === 0;
      if (hasOnlyDefault || template.match(/<slot(?:\s+(?!name=)[^>]*)?>/)) {
        slots.push({ name: 'default' });
        seen.add('default');
      }
    }
  }
  
  return slots;
}

/**
 * Exemplo de uso
 */
if (import.meta.url === `file://${process.argv[1]}`) {
  const exampleCode = `
<template>
  <div class="progress-bar">
    <div class="progress-bar__fill" :style="fillStyle">
      <slot name="label">{{ label }}</slot>
    </div>
    <slot></slot>
  </div>
</template>

<script setup>
defineProps<{
  value: number;
  max?: number;
  variant?: 'primary' | 'success' | 'danger';
  label?: string;
}>();

defineEmits<{
  'complete': [];
  'update:value': [value: number];
}>();
</script>
  `.trim();
  
  try {
    const result = parseVueComponent(exampleCode, 'ProgressBar.vue');
    
    console.log('✅ Vue Parser PoC - Resultado:');
    console.log(JSON.stringify(result, null, 2));
    
    console.log('\n📊 Estatísticas:');
    console.log(`- Props: ${result.props.length}`);
    result.props.forEach(p => {
      console.log(`  • ${p.name}: ${p.type}${p.required ? ' (required)' : ' (optional)'}`);
    });
    
    console.log(`- Events: ${result.events.length}`);
    result.events.forEach(e => {
      console.log(`  • ${e.name}${e.payload ? ': ' + e.payload : ''}`);
    });
    
    console.log(`- Slots: ${result.slots.length}`);
    result.slots.forEach(s => {
      console.log(`  • ${s.name}`);
    });
  } catch (error) {
    console.error('❌ Erro no parse:', error);
    process.exit(1);
  }
}
