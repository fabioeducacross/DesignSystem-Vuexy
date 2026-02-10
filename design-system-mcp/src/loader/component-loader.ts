/**
 * Component Loader
 * 
 * Carrega e agrega componentes do Design System.
 * Combina metadata de .stories.js com implementação .vue.
 */

import { readdir } from 'fs/promises';
import { join, basename, dirname } from 'path';
import { Component, ComponentCategory } from '../types/component.js';
import { GetStatsOutput } from '../types/mcp.js';
import { parseStoryFile } from '../parsers/story-parser.js';
import { parseVueFile } from '../parsers/vue-parser.js';
import { logger, startTimer } from '../utils/logger.js';
import { generateSnippets } from '../utils/snippet-generator.js';

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
  stats: GetStatsOutput;
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
   * 
   * Nova estratégia: Escaneia componentes .vue PRIMEIRO (fonte primária),
   * depois enriquece com metadados das stories (fonte secundária).
   */
  async loadAll(): Promise<LoadResult> {
    const timer = startTimer('ComponentLoader.loadAll');
    
    logger.info('Loading components from Vue files (primary source)', {
      componentsPath: this.config.componentsPath
    });
    
    const components: Component[] = [];
    const errors: Array<{ file: string; error: string }> = [];
    
    try {
      // FASE 1: Carregar componentes .vue (fonte primária)
      const vueFiles = await this.findVueFiles();
      logger.info(`Found ${vueFiles.length} Vue component files`);
      
      const vueComponentsMap = new Map<string, any>();
      
      for (const vueFile of vueFiles) {
        try {
          const parsed = await parseVueFile(vueFile);
          const componentName = this.extractComponentNameFromPath(vueFile);
          
          vueComponentsMap.set(componentName, {
            filepath: vueFile,
            parsed
          });
        } catch (error) {
          errors.push({
            file: vueFile,
            error: String(error)
          });
          logger.warn(`Failed to parse Vue file: ${vueFile}`, error);
        }
      }
      
      logger.info(`Parsed ${vueComponentsMap.size} Vue components`);
      
      // FASE 2: Carregar stories (fonte secundária para enriquecimento)
      logger.info('Loading stories for enrichment', {
        storiesPath: this.config.storiesPath
      });
      
      const storyFiles = await this.findStoryFiles();
      logger.info(`Found ${storyFiles.length} story files`);
      
      const storiesMap = new Map<string, any>();
      
      for (const storyFile of storyFiles) {
        try {
          const storyData = await parseStoryFile(storyFile);
          if (storyData.default) {
            const componentName = this.extractComponentName(storyFile);
            storiesMap.set(componentName, {
              filepath: storyFile,
              data: storyData
            });
          }
        } catch (error) {
          logger.debug(`Skipping story file: ${storyFile}`, error);
        }
      }
      
      logger.info(`Parsed ${storiesMap.size} story files`);
      
      // FASE 3: Combinar componentes Vue com stories
      for (const [componentName, vueData] of vueComponentsMap) {
        try {
          const story = storiesMap.get(componentName);
          const component = await this.buildComponent(componentName, vueData, story);
          components.push(component);
        } catch (error) {
          const err = error as Error;
          errors.push({
            file: vueData.filepath,
            error: String(error)
          });
          logger.warn(`Failed to build component ${componentName}:`, {
            error: err.message,
            stack: err.stack?.substring(0, 500),
            vueData: {
              hasFilepath: !!vueData?.filepath,
              hasParsed: !!vueData?.parsed,
              hasComponent: !!vueData?.parsed?.component,
              propsCount: vueData?.parsed?.component?.props?.length || 0
            }
          });
        }
      }
      
      logger.info(`Loaded ${components.length} components successfully`);
      
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
    const timer = startTimer(`ComponentLoader.loadComponent(${basename(storyFilePath)})`);
    
    // Parse story file
    const storyData = await parseStoryFile(storyFilePath);
    
    if (!storyData.default) {
      logger.warn(`No default export in ${storyFilePath}`);
      return null;
    }
    
    if (storyData.errors && storyData.errors.length > 0) {
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
      
      if (vueData.warnings && vueData.warnings.length > 0) {
        logger.debug(`Vue file has warnings:`, {
          file: vueFilePath,
          warnings: vueData.warnings
        });
      }
    }
    
    // Extrair categoria do title
    const category = this.extractCategory(storyData.default.title) as any;
    
    // Montar objeto Component
    const component: Component = {
      name: componentName,
      category,
      priority: this.inferPriority(storyData, vueData),
      metadata: {
        title: storyData.default.title,
        description: this.extractDescription(storyData),
        tags: storyData.default.tags || []
      },
      stories: storyData.stories.map(story => ({
        name: story.name,
        args: story.args,
        parameters: story.parameters
      })),
      vue: vueData?.component || { props: [], events: [], slots: [] },
      paths: {
        story: storyFilePath,
        component: vueFilePath || '',
        storybookUrl: this.buildStorybookUrl(storyData.default.title)
      },
      stats: {
        storiesCount: storyData.stories.length,
        propsCount: vueData?.component.props.length || 0,
        eventsCount: vueData?.component.events.length || 0,
        slotsCount: vueData?.component.slots.length || 0
      },
      parsedAt: new Date()
    };
    
    // Gerar code snippets multi-framework
    try {
      component.snippets = generateSnippets(component);
    } catch (error) {
      logger.warn(`Failed to generate snippets for ${componentName}:`, error);
      // Continue sem snippets em caso de erro
    }
    
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
   * Encontra todos os arquivos .vue recursivamente
   */
  private async findVueFiles(): Promise<string[]> {
    const files: string[] = [];
    
    const scanDir = async (dir: string): Promise<void> => {
      try {
        const entries = await readdir(dir, { withFileTypes: true });
        
        for (const entry of entries) {
          const fullPath = join(dir, entry.name);
          
          if (entry.isDirectory()) {
            // Ignorar node_modules, dist, etc
            if (!['node_modules', 'dist', '.git', 'coverage'].includes(entry.name)) {
              await scanDir(fullPath);
            }
          } else if (entry.name.endsWith('.vue')) {
            files.push(fullPath);
          }
        }
      } catch (error) {
        logger.warn(`Erro ao escanear diretório ${dir}:`, error);
      }
    };
    
    await scanDir(this.config.componentsPath);
    return files;
  }
  
  /**
   * Extrai nome do componente do path do arquivo .vue
   * Ex: "/path/to/components/forms/ESelect.vue" → "ESelect"
   * Ex: "/path/to/components/MediaCard/index.vue" → "MediaCard"
   */
  private extractComponentNameFromPath(vueFilePath: string): string {
    const fileName = basename(vueFilePath, '.vue');
    
    // Se o arquivo é index.vue, usar o nome do diretório pai
    if (fileName === 'index') {
      const parentDir = basename(dirname(vueFilePath));
      return parentDir;
    }
    
    return fileName;
  }
  
  /**
   * Monta objeto Component combinando dados do .vue e story opcional
   */
  private async buildComponent(
    name: string,
    vueData: any,
    story?: any
  ): Promise<Component> {
    const timer = startTimer(`Build component ${name}`);
    
    // Extrair categoria da story ou usar 'Other' como fallback
    const categoryStr = story 
      ? this.extractCategory(story.default?.title || '')
      : 'Other';
    const category = categoryStr as ComponentCategory;
    
    // Acessar dados do parser corretamente:
    // vueData = { filepath: "...", parsed: { component: {...}, filepath, parsedAt, ... } }
    const vueComponent = vueData?.parsed?.component || { props: [], events: [], slots: [] };
    const vuePath = vueData?.filepath || '';
    
    // Inferir prioridade usando dados do parser
    const priority = this.inferPriority(story, vueData?.parsed);
    
    // Montar objeto Component seguindo a estrutura correta
    const component: Component = {
      name,
      category,
      priority,
      metadata: {
        title: story?.default?.title || name,
        description: story ? this.extractDescription(story) : undefined,
        tags: story?.default?.tags || []
      },
      stories: story?.stories?.map((s: any) => ({
        name: s?.name || 'Unnamed',
        args: s?.args || {},
        parameters: s?.parameters || {}
      })) || [],
      vue: vueComponent,
      paths: {
        story: story?.filePath || '',
        component: vuePath,
        storybookUrl: story?.default?.title ? this.buildStorybookUrl(story.default.title) : undefined
      },
      stats: {
        storiesCount: story?.stories?.length || 0,
        propsCount: vueComponent.props?.length || 0,
        eventsCount: vueComponent.events?.length || 0,
        slotsCount: vueComponent.slots?.length || 0
      },
      parsedAt: new Date()
    };
    
    // Gerar code snippets multi-framework
    try {
      component.snippets = generateSnippets(component);
    } catch (error) {
      logger.warn(`Failed to generate snippets for ${name}:`, error);
      // Continue sem snippets em caso de erro
    }
    
    timer.end();
    return component;
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
    return storyData?.default?.parameters?.docs?.description?.component;
  }
  
  /**
   * Infere prioridade com base em metadata
   */
  private inferPriority(storyData: any, vueData: any): 'P0' | 'P1' | 'P2' {
    // Validação defensiva
    const storiesCount = storyData?.stories?.length || 0;
    const propsCount = vueData?.component?.props?.length || vueData?.props?.length || 0;
    
    // P0: Componentes com muitas props/stories
    if (storiesCount >= 5 || propsCount >= 8) {
      return 'P0';
    }
    
    // P1: Componentes médios
    if (storiesCount >= 2 || propsCount >= 3) {
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
  private computeStats(components: Component[]): GetStatsOutput {
    return {
      totalComponents: components.length,
      totalStories: components.reduce((sum, c) => sum + c.stats.storiesCount, 0),
      categoryCounts: this.groupByCategory(components),
      priorityCounts: {
        P0: components.filter(c => c.priority === 'P0').length,
        P1: components.filter(c => c.priority === 'P1').length,
        P2: components.filter(c => c.priority === 'P2').length
      },
      topTags: []
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
