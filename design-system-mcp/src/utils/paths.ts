/**
 * Path Configuration & Resolution
 * 
 * Gerencia caminhos relativos entre o MCP server e o projeto Storybook
 */

import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs/promises';

/**
 * Configuração de paths do projeto
 */
export interface PathConfig {
  /** Caminho para stories (educacross-components-v2) */
  storiesPath: string;
  
  /** Caminho para componentes Vue source */
  componentsPath: string;
  
  /** Diretório de cache (opcional) */
  cacheDir?: string;
  
  /** Root do workspace */
  workspaceRoot: string;
}

/**
 * Paths absolutos resolvidos
 */
export interface ResolvedPaths {
  /** Path absoluto para stories */
  stories: string;
  
  /** Path absoluto para componentes */
  components: string;
  
  /** Path absoluto para cache */
  cache?: string;
  
  /** Root absoluto do workspace */
  root: string;
}

/**
 * Obtém o diretório do módulo atual (ESM-safe)
 */
export function getDirname(importMetaUrl: string): string {
  return path.dirname(fileURLToPath(importMetaUrl));
}

/**
 * Carrega configuração de paths do .env ou usa defaults
 */
export function loadPathConfig(): PathConfig {
  const workspaceRoot = path.resolve(
    getDirname(import.meta.url),
    '../../../..'
  );
  
  return {
    storiesPath: process.env.STORIES_PATH || '../src/stories/educacross-components-v2',
    componentsPath: process.env.COMPONENTS_PATH || '../educacross-frontoffice/src/components',
    cacheDir: process.env.CACHE_DIR,
    workspaceRoot
  };
}

/**
 * Resolve paths relativos para absolutos
 */
export function resolvePaths(config: PathConfig): ResolvedPaths {
  const root = config.workspaceRoot;
  
  return {
    root,
    stories: path.resolve(root, config.storiesPath),
    components: path.resolve(root, config.componentsPath),
    cache: config.cacheDir ? path.resolve(root, config.cacheDir) : undefined
  };
}

/**
 * Valida que os paths existem
 */
export async function validatePaths(resolved: ResolvedPaths): Promise<{
  valid: boolean;
  errors: string[];
}> {
  const errors: string[] = [];
  
  try {
    await fs.access(resolved.stories);
  } catch {
    errors.push(`Stories path not found: ${resolved.stories}`);
  }
  
  try {
    await fs.access(resolved.components);
  } catch {
    errors.push(`Components path not found: ${resolved.components}`);
  }
  
  if (resolved.cache) {
    try {
      await fs.access(resolved.cache);
    } catch {
      // Cache dir pode não existir ainda, tentar criar
      try {
        await fs.mkdir(resolved.cache, { recursive: true });
      } catch (err) {
        errors.push(`Cannot create cache directory: ${resolved.cache}`);
      }
    }
  }
  
  return {
    valid: errors.length === 0,
    errors
  };
}

/**
 * Obtém path relativo de story para componente
 * 
 * Ex: dado story "ProgressBar.stories.js", retorna path para "ProgressBar.vue"
 */
export function getComponentPathFromStory(
  storyPath: string,
  resolved: ResolvedPaths
): string {
  const storyFilename = path.basename(storyPath, '.stories.js');
  return path.join(resolved.components, `${storyFilename}.vue`);
}

/**
 * Obtém path relativo de componente para story
 */
export function getStoryPathFromComponent(
  componentPath: string,
  resolved: ResolvedPaths
): string {
  const componentFilename = path.basename(componentPath, '.vue');
  return path.join(resolved.stories, `${componentFilename}.stories.js`);
}

/**
 * Lista todos os arquivos .stories.js recursivamente
 */
export async function findStoryFiles(storiesPath: string): Promise<string[]> {
  const stories: string[] = [];
  
  async function scan(dir: string) {
    const entries = await fs.readdir(dir, { withFileTypes: true });
    
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      
      if (entry.isDirectory()) {
        await scan(fullPath);
      } else if (entry.isFile() && entry.name.endsWith('.stories.js')) {
        stories.push(fullPath);
      }
    }
  }
  
  await scan(storiesPath);
  return stories;
}

/**
 * Lista todos os arquivos .vue recursivamente
 */
export async function findVueFiles(componentsPath: string): Promise<string[]> {
  const components: string[] = [];
  
  async function scan(dir: string) {
    const entries = await fs.readdir(dir, { withFileTypes: true });
    
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      
      if (entry.isDirectory()) {
        await scan(fullPath);
      } else if (entry.isFile() && entry.name.endsWith('.vue')) {
        components.push(fullPath);
      }
    }
  }
  
  await scan(componentsPath);
  return components;
}

/**
 * Extrai nome do componente de um path
 */
export function getComponentName(filepath: string): string {
  return path.basename(filepath, path.extname(filepath));
}

/**
 * Obtém URL do Storybook para uma story
 */
export function getStorybookUrl(
  storyTitle: string,
  storyName: string,
  baseUrl: string = 'http://localhost:6006'
): string {
  const path = storyTitle.toLowerCase().replace(/\s+/g, '-').replace(/\//g, '-');
  const story = storyName.toLowerCase().replace(/\s+/g, '-');
  return `${baseUrl}/?path=/story/${path}--${story}`;
}

/**
 * Normaliza path para comparação (cross-platform)
 */
export function normalizePath(filepath: string): string {
  return filepath.replace(/\\/g, '/');
}
