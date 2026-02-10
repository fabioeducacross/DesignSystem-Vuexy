/**
 * Proof of Concept: Story Parser
 * 
 * Objetivo: Validar que conseguimos extrair metadados de arquivos .stories.js
 * usando Babel Parser
 */

import { parse } from '@babel/parser';
import * as t from '@babel/types';

export interface StoryFile {
  title: string;
  tags: string[];
  argTypes?: Record<string, unknown>;
  stories: Array<{
    name: string;
    args?: Record<string, unknown>;
  }>;
}

/**
 * Parse de arquivo .stories.js usando Babel AST
 */
export function parseStoryFile(code: string): StoryFile {
  const ast = parse(code, {
    sourceType: 'module',
    plugins: ['jsx']
  });
  
  let title = '';
  let tags: string[] = [];
  let argTypes: Record<string, unknown> | undefined;
  const stories: StoryFile['stories'] = [];
  
  // Traverse AST procurando exports
  for (const node of ast.program.body) {
    // export default { title, tags, argTypes, ... }
    if (t.isExportDefaultDeclaration(node) && t.isObjectExpression(node.declaration)) {
      const props = node.declaration.properties;
      
      for (const prop of props) {
        if (t.isObjectProperty(prop) && t.isIdentifier(prop.key)) {
          const keyName = prop.key.name;
          
          // Extrair title
          if (keyName === 'title' && t.isStringLiteral(prop.value)) {
            title = prop.value.value;
          }
          
          // Extrair tags
          if (keyName === 'tags' && t.isArrayExpression(prop.value)) {
            tags = prop.value.elements
              .filter(el => t.isStringLiteral(el))
              .map(el => (el as t.StringLiteral).value);
          }
          
          // Extrair argTypes (simplificado - apenas estrutura)
          if (keyName === 'argTypes' && t.isObjectExpression(prop.value)) {
            argTypes = {}; // TODO: extrair estrutura completa se necessário
          }
        }
      }
    }
    
    // export const StoryName = { args, ... }
    if (t.isExportNamedDeclaration(node) && t.isVariableDeclaration(node.declaration)) {
      for (const decl of node.declaration.declarations) {
        if (t.isVariableDeclarator(decl) && t.isIdentifier(decl.id)) {
          const name = decl.id.name;
          let args: Record<string, unknown> | undefined;
          
          // Extrair args do objeto da story
          if (t.isObjectExpression(decl.init)) {
            const argsProperty = decl.init.properties.find(
              p => t.isObjectProperty(p) && 
                   t.isIdentifier(p.key) && 
                   p.key.name === 'args'
            );
            
            if (argsProperty && t.isObjectProperty(argsProperty) && t.isObjectExpression(argsProperty.value)) {
              // Extrair valores literais de args
              args = extractLiteralObject(argsProperty.value);
            }
          }
          
          stories.push({ name, args });
        }
      }
    }
  }
  
  return { title, tags, argTypes, stories };
}

/**
 * Helper para extrair objeto com valores literais
 */
function extractLiteralObject(node: t.ObjectExpression): Record<string, unknown> {
  const result: Record<string, unknown> = {};
  
  for (const prop of node.properties) {
    if (t.isObjectProperty(prop) && t.isIdentifier(prop.key)) {
      const key = prop.key.name;
      const value = prop.value;
      
      if (t.isStringLiteral(value)) {
        result[key] = value.value;
      } else if (t.isNumericLiteral(value)) {
        result[key] = value.value;
      } else if (t.isBooleanLiteral(value)) {
        result[key] = value.value;
      } else if (t.isNullLiteral(value)) {
        result[key] = null;
      } else if (t.isArrayExpression(value)) {
        // Simplificado: apenas arrays de literais
        result[key] = value.elements
          .filter(el => t.isStringLiteral(el) || t.isNumericLiteral(el))
          .map(el => {
            if (t.isStringLiteral(el)) return el.value;
            if (t.isNumericLiteral(el)) return el.value;
            return null;
          });
      }
      // Objetos aninhados e outros tipos: ignorar por ora
    }
  }
  
  return result;
}

/**
 * Helper para extrair apenas nomes de stories (mais leve)
 */
export function extractStoryNames(code: string): string[] {
  const storyNames: string[] = [];
  const regex = /export\s+const\s+(\w+)\s*=/g;
  
  let match;
  while ((match = regex.exec(code)) !== null) {
    storyNames.push(match[1]);
  }
  
  return storyNames;
}

/**
 * Exemplo de uso
 */
if (import.meta.url === `file://${process.argv[1]}`) {
  const exampleCode = `
export default {
  title: 'Components/DataDisplay/ProgressBar',
  tags: ['autodocs', 'responsive'],
  argTypes: {
    value: { control: 'number' },
    variant: { control: 'select', options: ['primary', 'success', 'danger'] }
  }
};

export const Default = {
  args: { value: 50, max: 100 },
  render: (args) => \`<progress-bar :value="\${args.value}"></progress-bar>\`
};

export const WithLabel = {
  args: { value: 75, showLabel: true }
};
  `.trim();
  
  try {
    const result = parseStoryFile(exampleCode);
    console.log('✅ Story Parser PoC - Resultado:');
    console.log(JSON.stringify(result, null, 2));
    
    console.log('\n📊 Estatísticas:');
    console.log(`- Title: ${result.title}`);
    console.log(`- Tags: ${result.tags.length}`);
    console.log(`- Stories: ${result.stories.length}`);
    console.log(`- Story names: ${result.stories.map(s => s.name).join(', ')}`);
  } catch (error) {
    console.error('❌ Erro no parse:', error);
    process.exit(1);
  }
}
