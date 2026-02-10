/**
 * Story File Parser
 * 
 * Parser robusto para arquivos .stories.js do Storybook usando Babel AST.
 * Extrai metadados do export default e de cada named export (stories).
 */

import { parse } from '@babel/parser';
import traverse from '@babel/traverse';

// @ts-ignore - @babel/traverse types mismatch
const traverseDefault = traverse.default || traverse;
import * as t from '@babel/types';
import { readFile } from 'fs/promises';
import { 
  ParsedStoryFile, 
  StoryFileDefault, 
  StoryMetadata,
  ArgTypes 
} from '../types/story.js';
import { logger, startTimer } from '../utils/logger.js';

/**
 * Parse de arquivo .stories.js a partir do filepath
 */
export async function parseStoryFile(filepath: string): Promise<ParsedStoryFile> {
  const timer = startTimer(`Parse story: ${filepath}`);
  
  try {
    const code = await readFile(filepath, 'utf-8');
    const result = parseStoryCode(code, filepath);
    timer.end();
    return result;
  } catch (error) {
    timer.end();
    logger.error(`Failed to parse story file: ${filepath}`, error);
    throw error;
  }
}

/**
 * Parse de código .stories.js (string)
 */
export function parseStoryCode(code: string, filepath: string): ParsedStoryFile {
  const errors: ParsedStoryFile['errors'] = [];
  
  try {
    const ast = parse(code, {
      sourceType: 'module',
      plugins: ['jsx', 'typescript']
    });
    
    let defaultExport: StoryFileDefault | null = null;
    const stories: StoryMetadata[] = [];
    
    traverseDefault(ast, {
      ExportDefaultDeclaration(path: any) {
        try {
          defaultExport = extractDefaultExport(path.node.declaration);
        } catch (error) {
          errors.push({
            message: `Failed to parse export default: ${error instanceof Error ? error.message : 'Unknown error'}`,
            line: path.node.loc?.start.line,
            column: path.node.loc?.start.column
          });
        }
      },
      
      ExportNamedDeclaration(path: any) {
        try {
          if (path.node.declaration && t.isVariableDeclaration(path.node.declaration)) {
            for (const decl of path.node.declaration.declarations) {
              if (t.isVariableDeclarator(decl) && t.isIdentifier(decl.id)) {
                const story = extractStory(decl.id.name, decl.init);
                if (story) {
                  stories.push(story);
                }
              }
            }
          }
        } catch (error) {
          errors.push({
            message: `Failed to parse named export: ${error instanceof Error ? error.message : 'Unknown error'}`,
            line: path.node.loc?.start.line,
            column: path.node.loc?.start.column
          });
        }
      }
    });
    
    if (!defaultExport) {
      errors.push({
        message: 'No export default found in story file'
      });
      defaultExport = {
        title: 'Unknown',
        tags: []
      };
    }
    
    return {
      default: defaultExport,
      stories,
      filepath,
      parsedAt: new Date(),
      errors: errors.length > 0 ? errors : undefined
    };
  } catch (error) {
    logger.error(`Parse error in ${filepath}:`, error);
    throw new Error(`Failed to parse ${filepath}: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Extrai metadados do export default
 */
function extractDefaultExport(node: t.Expression | t.Declaration): StoryFileDefault {
  const result: StoryFileDefault = {
    title: '',
    tags: []
  };
  
  if (!t.isObjectExpression(node)) {
    return result;
  }
  
  for (const prop of node.properties) {
    if (!t.isObjectProperty(prop) || !t.isIdentifier(prop.key)) {
      continue;
    }
    
    const keyName = prop.key.name;
    
    switch (keyName) {
      case 'title':
        if (t.isStringLiteral(prop.value)) {
          result.title = prop.value.value;
        }
        break;
      
      case 'tags':
        if (t.isArrayExpression(prop.value)) {
          result.tags = prop.value.elements
            .filter(el => t.isStringLiteral(el))
            .map(el => (el as t.StringLiteral).value);
        }
        break;
      
      case 'argTypes':
        if (t.isObjectExpression(prop.value)) {
          result.argTypes = extractArgTypes(prop.value);
        }
        break;
      
      case 'args':
        if (t.isObjectExpression(prop.value)) {
          result.args = extractLiteralObject(prop.value);
        }
        break;
      
      case 'parameters':
        if (t.isObjectExpression(prop.value)) {
          result.parameters = extractLiteralObject(prop.value) as any;
        }
        break;
    }
  }
  
  return result;
}

/**
 * Extrai argTypes do objeto
 */
function extractArgTypes(node: t.ObjectExpression): ArgTypes {
  const argTypes: ArgTypes = {};
  
  for (const prop of node.properties) {
    if (!t.isObjectProperty(prop)) continue;
    
    let key: string;
    if (t.isIdentifier(prop.key)) {
      key = prop.key.name;
    } else if (t.isStringLiteral(prop.key)) {
      key = prop.key.value;
    } else {
      continue;
    }
    
    if (t.isObjectExpression(prop.value)) {
      argTypes[key] = extractLiteralObject(prop.value) as any;
    }
  }
  
  return argTypes;
}

/**
 * Extrai metadados de uma story (named export)
 */
function extractStory(name: string, init: t.Expression | null | undefined): StoryMetadata | null {
  if (!init || !t.isObjectExpression(init)) {
    return null;
  }
  
  const story: StoryMetadata = { name };
  
  for (const prop of init.properties) {
    if (!t.isObjectProperty(prop) || !t.isIdentifier(prop.key)) {
      continue;
    }
    
    const keyName = prop.key.name;
    
    switch (keyName) {
      case 'args':
        if (t.isObjectExpression(prop.value)) {
          story.args = extractLiteralObject(prop.value);
        }
        break;
      
      case 'parameters':
        if (t.isObjectExpression(prop.value)) {
          story.parameters = extractLiteralObject(prop.value) as any;
        }
        break;
      
      case 'render':
        // Extrair função render como string (simplificado)
        if (t.isArrowFunctionExpression(prop.value) || t.isFunctionExpression(prop.value)) {
          story.render = '<render function>'; // Placeholder
        }
        break;
      
      case 'tags':
        if (t.isArrayExpression(prop.value)) {
          story.tags = prop.value.elements
            .filter(el => t.isStringLiteral(el))
            .map(el => (el as t.StringLiteral).value);
        }
        break;
    }
  }
  
  return story;
}

/**
 * Extrai objeto com valores literais
 */
function extractLiteralObject(node: t.ObjectExpression, depth = 0): Record<string, unknown> {
  if (depth > 3) {
    return {}; // Limite de profundidade para evitar recursão infinita
  }
  
  const result: Record<string, unknown> = {};
  
  for (const prop of node.properties) {
    if (t.isSpreadElement(prop)) {
      continue; // Ignorar spread operators
    }
    
    if (!t.isObjectProperty(prop)) {
      continue;
    }
    
    let key: string;
    if (t.isIdentifier(prop.key)) {
      key = prop.key.name;
    } else if (t.isStringLiteral(prop.key)) {
      key = prop.key.value;
    } else {
      continue;
    }
    
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
      result[key] = extractLiteralArray(value, depth + 1);
    } else if (t.isObjectExpression(value)) {
      result[key] = extractLiteralObject(value, depth + 1);
    } else {
      // Valores não-literais (funções, etc) - ignorar ou placeholder
      result[key] = '<complex value>';
    }
  }
  
  return result;
}

/**
 * Extrai array com valores literais
 */
function extractLiteralArray(node: t.ArrayExpression, depth = 0): unknown[] {
  if (depth > 3) {
    return [];
  }
  
  const result: unknown[] = [];
  
  for (const el of node.elements) {
    if (!el) continue;
    
    if (t.isSpreadElement(el)) {
      continue;
    }
    
    if (t.isStringLiteral(el)) {
      result.push(el.value);
    } else if (t.isNumericLiteral(el)) {
      result.push(el.value);
    } else if (t.isBooleanLiteral(el)) {
      result.push(el.value);
    } else if (t.isNullLiteral(el)) {
      result.push(null);
    } else if (t.isArrayExpression(el)) {
      result.push(extractLiteralArray(el, depth + 1));
    } else if (t.isObjectExpression(el)) {
      result.push(extractLiteralObject(el, depth + 1));
    }
  }
  
  return result;
}

/**
 * Helper para extrair apenas title de um arquivo (leve)
 */
export async function extractStoryTitle(filepath: string): Promise<string> {
  try {
    const code = await readFile(filepath, 'utf-8');
    const titleMatch = code.match(/title:\s*['"](.+?)['"]/);
    return titleMatch ? titleMatch[1] : 'Unknown';
  } catch {
    return 'Unknown';
  }
}
