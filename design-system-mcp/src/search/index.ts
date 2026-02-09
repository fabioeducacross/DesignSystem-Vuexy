/**
 * Search Index
 * 
 * Índice invertido para busca textual rápida em componentes.
 * Usa tokenização simples e scoring por TF-IDF básico.
 */

import { Component } from '../types/component.js';
import { logger } from '../utils/logger.js';

/**
 * Resultado de busca com score
 */
export interface SearchResult {
  /** Componente encontrado */
  component: Component;
  
  /** Score de relevância (0-1) */
  score: number;
  
  /** Termos que matcharam */
  matchedTerms: string[];
  
  /** Campos onde houve match */
  matchedFields: string[];
}

/**
 * Token com metadados
 */
interface IndexToken {
  /** Componentes que contêm este token */
  componentNames: Set<string>;
  
  /** Frequência do token (IDF) */
  documentFrequency: number;
}

/**
 * Índice invertido para busca textual
 */
export class SearchIndex {
  private index = new Map<string, IndexToken>();
  private components = new Map<string, Component>();
  private totalDocuments = 0;
  
  /**
   * Adiciona componente ao índice
   */
  addComponent(component: Component): void {
    // Remover se já existe
    this.removeComponent(component.name);
    
    // Armazenar componente
    this.components.set(component.name, component);
    this.totalDocuments++;
    
    // Extrair tokens
    const tokens = this.tokenize(component);
    
    // Atualizar índice
    for (const token of tokens) {
      let entry = this.index.get(token);
      
      if (!entry) {
        entry = {
          componentNames: new Set(),
          documentFrequency: 0
        };
        this.index.set(token, entry);
      }
      
      entry.componentNames.add(component.name);
      entry.documentFrequency = entry.componentNames.size;
    }
    
    logger.debug(`Indexed component: ${component.name} (${tokens.size} tokens)`);
  }
  
  /**
   * Remove componente do índice
   */
  removeComponent(name: string): void {
    const component = this.components.get(name);
    if (!component) return;
    
    // Remover componente
    this.components.delete(name);
    this.totalDocuments--;
    
    // Remover de tokens
    for (const [token, entry] of this.index.entries()) {
      if (entry.componentNames.has(name)) {
        entry.componentNames.delete(name);
        entry.documentFrequency = entry.componentNames.size;
        
        // Remover token se vazio
        if (entry.componentNames.size === 0) {
          this.index.delete(token);
        }
      }
    }
    
    logger.debug(`Removed from index: ${name}`);
  }
  
  /**
   * Busca componentes por query
   */
  search(query: string, limit: number = 20): SearchResult[] {
    const queryTokens = this.tokenizeQuery(query);
    
    if (queryTokens.length === 0) {
      return [];
    }
    
    logger.debug(`Searching for: "${query}" (${queryTokens.length} tokens)`);
    
    // Coletar componentes candidatos
    const candidates = new Map<string, {
      component: Component;
      matchedTerms: Set<string>;
      matchedFields: Set<string>;
    }>();
    
    for (const token of queryTokens) {
      const entry = this.index.get(token);
      if (!entry) continue;
      
      for (const componentName of entry.componentNames) {
        const component = this.components.get(componentName);
        if (!component) continue;
        
        let candidate = candidates.get(componentName);
        if (!candidate) {
          candidate = {
            component,
            matchedTerms: new Set(),
            matchedFields: new Set()
          };
          candidates.set(componentName, candidate);
        }
        
        candidate.matchedTerms.add(token);
        
        // Identificar campo onde houve match
        const fields = this.getMatchedFields(component, token);
        fields.forEach(f => candidate!.matchedFields.add(f));
      }
    }
    
    // Calcular scores e ordenar
    const results: SearchResult[] = Array.from(candidates.values()).map(candidate => {
      const score = this.calculateScore(
        candidate.component,
        queryTokens,
        candidate.matchedTerms,
        candidate.matchedFields
      );
      
      return {
        component: candidate.component,
        score,
        matchedTerms: Array.from(candidate.matchedTerms),
        matchedFields: Array.from(candidate.matchedFields)
      };
    });
    
    results.sort((a, b) => b.score - a.score);
    
    logger.debug(`Search found ${results.length} results`);
    
    return results.slice(0, limit);
  }
  
  /**
   * Busca por categoria
   */
  searchByCategory(category: string): Component[] {
    return Array.from(this.components.values())
      .filter(c => c.category === category);
  }
  
  /**
   * Busca por tags
   */
  searchByTags(tags: string[]): Component[] {
    return Array.from(this.components.values())
      .filter(c => tags.some(tag => c.metadata.tags.includes(tag)));
  }
  
  /**
   * Busca por prioridade
   */
  searchByPriority(priority: 'P0' | 'P1' | 'P2'): Component[] {
    return Array.from(this.components.values())
      .filter(c => c.priority === priority);
  }
  
  /**
   * Obtém estatísticas do índice
   */
  getStats() {
    return {
      totalDocuments: this.totalDocuments,
      totalTokens: this.index.size,
      averageTokensPerDocument: this.totalDocuments > 0 
        ? this.index.size / this.totalDocuments 
        : 0
    };
  }
  
  /**
   * Limpa o índice
   */
  clear(): void {
    this.index.clear();
    this.components.clear();
    this.totalDocuments = 0;
    logger.info('Search index cleared');
  }
  
  /**
   * Tokeniza componente para indexação
   */
  private tokenize(component: Component): Set<string> {
    const tokens = new Set<string>();
    
    // Nome do componente
    this.addTokens(tokens, component.name);
    
    // Categoria
    this.addTokens(tokens, component.category);
    
    // Metadata
    this.addTokens(tokens, component.metadata.title);
    if (component.metadata.description) {
      this.addTokens(tokens, component.metadata.description);
    }
    
    // Tags
    component.metadata.tags.forEach(tag => this.addTokens(tokens, tag));
    
    // Props (nomes) - validação defensiva
    if (component.vue?.props) {
      component.vue.props.forEach((prop: any) => this.addTokens(tokens, prop.name));
    }
    
    // Events (nomes) - validação defensiva
    if (component.vue?.events) {
      component.vue.events.forEach((event: any) => this.addTokens(tokens, event.name));
    }
    
    // Slots (nomes) - validação defensiva
    if (component.vue?.slots) {
      component.vue.slots.forEach((slot: any) => this.addTokens(tokens, slot.name));
    }
    
    return tokens;
  }
  
  /**
   * Tokeniza query do usuário
   */
  private tokenizeQuery(query: string): string[] {
    return this.normalizeText(query)
      .split(/\s+/)
      .filter(token => token.length >= 2); // Mínimo 2 chars
  }
  
  /**
   * Adiciona tokens normalizados ao set
   */
  private addTokens(tokens: Set<string>, text: string): void {
    const normalized = this.normalizeText(text);
    const words = normalized.split(/\s+/);
    
    words.forEach(word => {
      if (word.length >= 2) {
        tokens.add(word);
      }
    });
  }
  
  /**
   * Normaliza texto para busca
   */
  private normalizeText(text: string): string {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, ' ') // Remove pontuação
      .replace(/\s+/g, ' ') // Normaliza espaços
      .trim();
  }
  
  /**
   * Identifica campos onde houve match
   */
  private getMatchedFields(component: Component, token: string): string[] {
    const fields: string[] = [];
    
    if (this.normalizeText(component.name).includes(token)) {
      fields.push('name');
    }
    
    if (this.normalizeText(component.category).includes(token)) {
      fields.push('category');
    }
    
    if (this.normalizeText(component.metadata.title).includes(token)) {
      fields.push('title');
    }
    
    if (component.metadata.description && 
        this.normalizeText(component.metadata.description).includes(token)) {
      fields.push('description');
    }
    
    if (component.metadata.tags.some(tag => 
        this.normalizeText(tag).includes(token))) {
      fields.push('tags');
    }
    
    // Validação defensiva para evitar erros quando component.vue é undefined
    if (component.vue?.props?.some((prop: any) => 
        this.normalizeText(prop.name).includes(token))) {
      fields.push('props');
    }
    
    if (component.vue?.events?.some((event: any) => 
        this.normalizeText(event.name).includes(token))) {
      fields.push('events');
    }
    
    if (component.vue?.slots?.some((slot: any) => 
        this.normalizeText(slot.name).includes(token))) {
      fields.push('slots');
    }
    
    return fields;
  }
  
  /**
   * Calcula score de relevância
   */
  private calculateScore(
    component: Component,
    queryTokens: string[],
    matchedTerms: Set<string>,
    matchedFields: Set<string>
  ): number {
    let score = 0;
    
    // Base score: % de query tokens que matcharam
    const coverage = matchedTerms.size / queryTokens.length;
    score += coverage * 0.4;
    
    // Boost por campo
    const fieldBoosts = {
      name: 0.3,
      title: 0.2,
      category: 0.1,
      tags: 0.1,
      description: 0.05,
      props: 0.05,
      events: 0.05,
      slots: 0.05
    };
    
    for (const field of matchedFields) {
      score += fieldBoosts[field as keyof typeof fieldBoosts] || 0;
    }
    
    // Boost por prioridade
    const priorityBoosts = { P0: 0.1, P1: 0.05, P2: 0 };
    score += priorityBoosts[component.priority];
    
    // IDF scores para termos raros
    for (const term of matchedTerms) {
      const entry = this.index.get(term);
      if (entry) {
        const idf = Math.log(this.totalDocuments / entry.documentFrequency);
        score += idf * 0.05;
      }
    }
    
    // Normalizar score para 0-1
    return Math.min(1, score);
  }
}

/**
 * Instância global do índice de busca
 */
export const searchIndex = new SearchIndex();
