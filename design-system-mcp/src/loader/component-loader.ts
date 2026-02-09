/**
 * Component Loader
 * 
 * Carrega e agrega componentes do Design System.
 * Combina metadata de .stories.js com implementação .vue.
 */

import { readdir } from 'fs/promises';
import { join, basename } from 'path';
import { Component, ComponentStats } from '../types/component.js';
import { parseStoryFile } from '../parsers/story-parser.js';
import { parseVueFile } from '../parsers/vue-parser.js';
import { logger, Timer } from '../utils/logger.js';

/**
 * Configuração do loader
 */
export interface LoaderConfig {
  /** Diretório com stories */
  storiesPath: string;
  
  /** Diretório com componentes Vue */
  componentsPath: string;
  
  /** Base URL do Storybook */
  storybookBaseUrl: string;
}

/**
 * Resultado do carregamento
 */
export interface LoadResult {
  /** Componentes carregados com sucesso */
  components: Component[];
  
  /** Erros encontrados */
  errors: Array<{
    file: string;
    error: string;
  }>;
  
  /** Estatísticas agregadas */
  stats: ComponentStats;
}

/**
 * Carrega componentes do Design System
 */
export class ComponentLoader {
  private config: LoaderConfig;
  
  constructor(config: LoaderConfig) {
    this.config = config;
  }
  
  /**
   * Carrega todos os componentes
   */
  async loadAll(): Promise<LoadResult> {
    const timer = new Timer('ComponentLoader.loadAll');
    
    logger.info('Loading components', {
      storiesPath: this.config.storiesPath,
      componentsPath: this.config.componentsPath
    });
    
    const components: Component[] = [];
    const errors: Array<{ file: string; error: string }> = [];
    
    try {
      // Ler arquivos .stories.js
      const storyFiles = await this.findStoryFiles();
      logger.info(`Found ${storyFiles.length} story files`);
      
      // Processar cada story file
      for (const storyFile of storyFiles) {
        try {
          const component = await this.loadComponent(storyFile);
          if (component) {
            components.push(component);
          }
        } catch (error) {
          logger.error(`Failed to load ${storyFile}:`, error);
          errors.push({
            file: storyFile,
            error: error instanceof Error ? error.message : String(error)
          });
        }
      }
      
      // Calcular stats
      const stats = this.computeStats(components);
      
      const elapsed = timer.end();
      logger.info(`Loaded ${components.length} components in ${elapsed}ms`, stats);
      
      return { components, errors, stats };
      
    } catch (error) {
      logger.error('Failed to load components:', error);
      throw error;
    }
  }
  
  /**
   * Carrega um componente específico
   */
  async loadComponent(storyFilePath: string): Promise<Component | null> {
    const timer = new Timer(`ComponentLoader.loadComponent(${basename(storyFilePath)})`);
    
    // Parse story file
    const storyData = await parseStoryFile(storyFilePath);
    
    if (!storyData.metadata) {
      logger.warn(`No metadata in ${storyFilePath}`);
      return null;
    }
    
    if (storyData.errors.length > 0) {
      logger.warn(`Story file has errors:`, {
        file: storyFilePath,
        errors: storyData.errors
      });
    }
    
    // Extrair nome do componente
    const componentName = this.extractComponentName(storyFilePath);
    
    // Buscar arquivo .vue correspondente
    const vueFilePath = await this.findVueFile(componentName);
    
    // Parse Vue file (se existir)
    let vueData = null;
    if (vueFilePath) {
      vueData = await parseVueFile(vueFilePath);
      
      if (vueData.warnings.length > 0) {
        logger.debug(`Vue file has warnings:`, {
          file: vueFilePath,
          warnings: vueData.warnings
        });
      }
    }
    
    // Extrair categoria do title
    const category = this.extractCategory(storyData.metadata.title);
    
    // Montar objeto Component
    const component: Component = {
      name: componentName,
      category,
      priority: this.inferPriority(storyData, vueData),
      metadata: {
        title: storyData.metadata.title,
        description: this.extractDescription(storyData),
        tags: storyData.metadata.tags || []
      },
      stories: storyData.stories.map(story => ({
        name: story.name,
        args: story.args,
        parameters: story.parameters
      })),
      props: vueData?.props || [],
      events: vueData?.events || [],
      slots: vueData?.slots || [],
      paths: {
        storyFile: storyFilePath,
        vueFile: vueFilePath || undefined,
        storybookUrl: this.buildStorybookUrl(storyData.metadata.title)
      },
      stats: {
        storiesCount: storyData.stories.length,
        propsCount: vueData?.props.length || 0,
        eventsCount: vueData?.events.length || 0,
        slotsCount: vueData?.slots.length || 0
      }
    };
    
    timer.end();
    return component;
  }
  
  /**
   * Encontra todos os arquivos .stories.js
   */
  private async findStoryFiles(): Promise<string[]> {
    const files: string[] = [];
    
    const scanDir = async (dir: string): Promise<void> => {
      const entries = await readdir(dir, { withFileTypes: true });
      
      for (const entry of entries) {
        const fullPath = join(dir, entry.name);
        
        if (entry.isDirectory()) {
          await scanDir(fullPath);
        } else if (entry.name.endsWith('.stories.js')) {
          files.push(fullPath);
        }
      }
    };
    
    await scanDir(this.config.storiesPath);
    return files;
  }
  
  /**
   * Encontra arquivo .vue correspondente
   */
  private async findVueFile(componentName: string): Promise<string | null> {
    const possiblePaths = [
      join(this.config.componentsPath, `${componentName}.vue`),
      join(this.config.componentsPath, componentName, `${componentName}.vue`),
      join(this.config.componentsPath, componentName, 'index.vue')
    ];
    
    for (const vueFilePath of possiblePaths) {
      try {
        const { stat } = await import('fs/promises');
        await stat(vueFilePath);
        return vueFilePath;
      } catch {
        // Arquivo não existe, continuar
      }
    }
    
    logger.debug(`Vue file not found for ${componentName}`);
    return null;
  }
  
  /**
   * Extrai nome do componente do filepath
   */
  private extractComponentName(storyFilePath: string): string {
    return basename(storyFilePath).replace('.stories.js', '');
  }
  
  /**
   * Extrai categoria do title (ex: "Educacross Components V2/Forms/Input" → "Forms")
   */
  private extractCategory(title: string): string {
    const parts = title.split('/');
    
    // Se tem 3 partes: "Prefix/Category/Component"
    if (parts.length >= 3) {
      return parts[1];
    }
    
    // Se tem 2 partes: "Category/Component"
    if (parts.length === 2) {
      return parts[0];
    }
    
    // Fallback
    return 'Uncategorized';
  }
  
  /**
   * Extrai descrição do metadata
   */
  private extractDescription(storyData: any): string | undefined {
    return storyData.metadata.parameters?.docs?.description?.component;
  }
  
  /**
   * Infere prioridade com base em metadata
   */
  private inferPriority(storyData: any, vueData: any): 'P0' | 'P1' | 'P2' {
    // P0: Componentes com muitas props/stories
    if (storyData.stories.length >= 5 || vueData?.props.length >= 8) {
      return 'P0';
    }
    
    // P1: Componentes médios
    if (storyData.stories.length >= 2 || vueData?.props.length >= 3) {
      return 'P1';
    }
    
    // P2: Componentes simples
    return 'P2';
  }
  
  /**
   * Constrói URL do Storybook
   */
  private buildStorybookUrl(title: string): string {
    const path = title
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/\//g, '-');
    
    return `${this.config.storybookBaseUrl}/?path=/story/${path}--default`;
  }
  
  /**
   * Calcula estatísticas agregadas
   */
  private computeStats(components: Component[]): ComponentStats {
    return {
      totalComponents: components.length,
      byCategory: this.groupByCategory(components),
      byPriority: {
        P0: components.filter(c => c.priority === 'P0').length,
        P1: components.filter(c => c.priority === 'P1').length,
        P2: components.filter(c => c.priority === 'P2').length
      },
      totalStories: components.reduce((sum, c) => sum + c.stats.storiesCount, 0),
      totalProps: components.reduce((sum, c) => sum + c.stats.propsCount, 0),
      totalEvents: components.reduce((sum, c) => sum + c.stats.eventsCount, 0),
      totalSlots: components.reduce((sum, c) => sum + c.stats.slotsCount, 0)
    };
  }
  
  /**
   * Agrupa componentes por categoria
   */
  private groupByCategory(components: Component[]): Record<string, number> {
    const grouped: Record<string, number> = {};
    
    for (const component of components) {
      grouped[component.category] = (grouped[component.category] || 0) + 1;
    }
    
    return grouped;
  }
}
