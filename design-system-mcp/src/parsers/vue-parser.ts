/**
 * Vue SFC Parser
 * 
 * Parser robusto para arquivos .vue usando @vue/compiler-sfc e TypeScript AST.
 * Extrai props, events, slots e metadados avançados.
 */

import { parse, compileScript } from '@vue/compiler-sfc';
import ts from 'typescript';
import { readFile } from 'fs/promises';
import { 
  ParsedVueFile,
  VueComponent,
  VueProp,
  VueEvent,
  VueSlot 
} from '../types/vue.js';
import { logger, startTimer } from '../utils/logger.js';

/**
 * Parse de arquivo .vue a partir do filepath
 */
export async function parseVueFile(filepath: string): Promise<ParsedVueFile> {
  const timer = startTimer(`Parse Vue: ${filepath}`);
  
  try {
    const code = await readFile(filepath, 'utf-8');
    const result = parseVueCode(code, filepath);
    timer.end();
    return result;
  } catch (error) {
    timer.end();
    logger.error(`Failed to parse Vue file: ${filepath}`, error);
    throw error;
  }
}

/**
 * Parse de código .vue (string)
 */
export function parseVueCode(code: string, filepath: string): ParsedVueFile {
  const warnings: ParsedVueFile['warnings'] = [];
  const errors: ParsedVueFile['errors'] = [];
  
  try {
    const { descriptor, errors: parseErrors } = parse(code, { filename: filepath });
    
    if (parseErrors.length > 0) {
      parseErrors.forEach(err => {
        errors.push({
          message: err.message,
          line: err.loc?.start.line,
          severity: 'error'
        });
      });
    }
    
    const component: VueComponent = {
      props: [],
      events: [],
      slots: []
    };
    
    // Extrair props e events do script
    if (descriptor.scriptSetup) {
      try {
        const propsResult = extractPropsFromScriptSetup(descriptor.scriptSetup.content);
        component.props = propsResult.props;
        if (propsResult.warnings) {
          warnings.push(...propsResult.warnings);
        }
        
        const eventsResult = extractEventsFromScriptSetup(descriptor.scriptSetup.content);
        component.events = eventsResult.events;
        if (eventsResult.warnings) {
          warnings.push(...eventsResult.warnings);
        }
      } catch (error) {
        warnings.push({
          message: `Failed to extract props/events: ${error instanceof Error ? error.message : 'Unknown error'}`,
          severity: 'warning'
        });
      }
    }
    
    // Extrair slots do template
    if (descriptor.template) {
      try {
        component.slots = extractSlotsFromTemplate(descriptor.template.content);
      } catch (error) {
        warnings.push({
          message: `Failed to extract slots: ${error instanceof Error ? error.message : 'Unknown error'}`,
          severity: 'warning'
        });
      }
    }
    
    return {
      component,
      filepath,
      parsedAt: new Date(),
      warnings: warnings.length > 0 ? warnings : undefined,
      errors: errors.length > 0 ? errors : undefined
    };
  } catch (error) {
    logger.error(`Parse error in ${filepath}:`, error);
    throw new Error(`Failed to parse ${filepath}: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Extrai props de <script setup>
 */
function extractPropsFromScriptSetup(code: string): {
  props: VueProp[];
  warnings?: ParsedVueFile['warnings'];
} {
  const props: VueProp[] = [];
  const warnings: ParsedVueFile['warnings'] = [];
  
  // Buscar defineProps<{ ... }>() - props tipados
  const typedPropsMatch = code.match(/defineProps<\{([^}]+)\}>\(\s*\)/s);
  
  if (typedPropsMatch) {
    try {
      const propsInterface = `interface Props {${typedPropsMatch[1]}}`;
      const sourceFile = ts.createSourceFile(
        'temp.ts',
        propsInterface,
        ts.ScriptTarget.Latest,
        true
      );
      
      ts.forEachChild(sourceFile, node => {
        if (ts.isInterfaceDeclaration(node)) {
          node.members.forEach(member => {
            if (ts.isPropertySignature(member) && ts.isIdentifier(member.name)) {
              const name = member.name.text;
              const type = member.type?.getText(sourceFile) || 'unknown';
              const required = !member.questionToken;
              
              // Detectar v-model prop
              const isVModel = name === 'modelValue' || name.startsWith('model');
              
              props.push({ name, type, required, isVModel });
            }
          });
        }
      });
    } catch (error) {
      warnings.push({
        message: `Failed to parse TypeScript props: ${error instanceof Error ? error.message : 'Unknown error'}`,
        severity: 'warning'
      });
    }
  } else {
    // Buscar defineProps({ ... }) - props runtime
    const runtimePropsMatch = code.match(/defineProps\(\s*\{([^}]+)\}\s*\)/s);
    
    if (runtimePropsMatch) {
      // Simplificado: extrair apenas nomes
      const propNames = [...runtimePropsMatch[1].matchAll(/(\w+)\s*:/g)];
      props.push(...propNames.map(m => ({
        name: m[1],
        type: 'unknown',
        required: false,
        isVModel: m[1] === 'modelValue'
      })));
    }
  }
  
  return { props, warnings: warnings.length > 0 ? warnings : undefined };
}

/**
 * Extrai events de <script setup>
 */
function extractEventsFromScriptSetup(code: string): {
  events: VueEvent[];
  warnings?: ParsedVueFile['warnings'];
} {
  const events: VueEvent[] = [];
  const warnings: ParsedVueFile['warnings'] = [];
  
  // Buscar defineEmits<{ ... }>()
  const emitsMatch = code.match(/defineEmits<\{([^}]+)\}>\(\s*\)/s);
  
  if (emitsMatch) {
    try {
      const emitsContent = emitsMatch[1];
      
      // Extrair nomes de eventos: 'eventName': ...
      const eventMatches = [...emitsContent.matchAll(/'([^']+)'|"([^"]+)"/g)];
      
      for (const match of eventMatches) {
        const name = match[1] || match[2];
        
        // Tentar extrair payload type
        const payloadMatch = emitsContent.match(
          new RegExp(`['"]${name}['"]\\s*:\\s*\\[([^\\]]+)\\]`)
        );
        
        const payload = payloadMatch 
          ? payloadMatch[1].split(',').map(p => ({
              name: p.trim().split(':')[0],
              type: p.trim().split(':')[1] || 'unknown'
            }))
          : undefined;
        
        const isVModelUpdate = name.startsWith('update:');
        
        events.push({ name, payload, isVModelUpdate });
      }
    } catch (error) {
      warnings.push({
        message: `Failed to parse events: ${error instanceof Error ? error.message : 'Unknown error'}`,
        severity: 'warning'
      });
    }
  } else {
    // Buscar defineEmits(['event1', 'event2']) - runtime
    const runtimeEmitsMatch = code.match(/defineEmits\(\s*\[([^\]]+)\]\s*\)/s);
    
    if (runtimeEmitsMatch) {
      const eventNames = [...runtimeEmitsMatch[1].matchAll(/'([^']+)'|"([^"]+)"/g)];
      events.push(...eventNames.map(m => ({ 
        name: m[1] || m[2],
        isVModelUpdate: (m[1] || m[2]).startsWith('update:')
      })));
    }
  }
  
  return { events, warnings: warnings.length > 0 ? warnings : undefined };
}

/**
 * Extrai slots do template Vue
 */
function extractSlotsFromTemplate(template: string): VueSlot[] {
  const slots: VueSlot[] = [];
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
  const hasDefaultSlot = template.match(/<slot(?:\s+(?!name=)[^>]*)?>/);
  if (hasDefaultSlot && !seen.has('default')) {
    slots.push({ name: 'default' });
    seen.add('default');
  }
  
  return slots;
}

/**
 * Helper para extrair apenas nome do componente (leve)
 */
export async function extractComponentName(filepath: string): Promise<string> {
  const parts = filepath.split(/[/\\]/);
  const filename = parts[parts.length - 1];
  return filename.replace('.vue', '');
}

/**
 * Helper para validar se arquivo é Vue SFC válido
 */
export async function isValidVueFile(filepath: string): Promise<boolean> {
  try {
    const code = await readFile(filepath, 'utf-8');
    return code.includes('<template>') || code.includes('<script');
  } catch {
    return false;
  }
}
