/**
 * SelectInfinityScrollModelo - Infinity Scroll Select Template
 * =========================================
 * 
 * Template/model component for implementing infinity scroll in v-select.
 * Shows best practices for loader placement and loading states.
 * 
 * @component SelectInfinityScrollModelo
 * @source educacross-frontoffice\src\components\selects\SelectInfinityScrollModelo.vue
 */

export default {
  title: 'Front-office/Selects/SelectInfinityScrollModelo',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
# SelectInfinityScrollModelo

**Modelo/template** para implementação de select com infinity scroll.

## Diferença vs InfinityScroll

| Aspecto | InfinityScroll | SelectInfinityScrollModelo |
|---------|----------------|----------------------------|
| **Tipo** | Componente completo | Template/modelo |
| **Props** | Todas props funcionais | Props básicas (modelo) |
| **Uso** | Instanciar diretamente | Copiar/adaptar código |
| **Loader** | Customizável | Modelo padrão |
| **Eventos** | @input, @load | Documentação apenas |

## Contexto de Uso

- **Documentação**: Mostrar padrão de implementação
- **Referência**: Desenvolvedores copiarem estrutura
- **Loader placement**: Onde/como colocar "Loading more..."
- **Template base**: Ponto de partida para customização
- **Best practices**: Padrões recomendados Educacross

## Estrutura do Loader

\`\`\`html
<v-select ...props>
  <template #list-footer>
    <li class="loader">
      Loading more options...
    </li>
  </template>
</v-select>
\`\`\`

## Características do Modelo

- **Slot list-footer**: Loader no final da lista
- **li.loader**: Tag <li> para semanticamente correto
- **Text-align center**: Loader centralizado
- **Color #BBBBBB**: Cinza discreto para loader
- **Minimal markup**: HTML mínimo para clareza

## Quando usar

- **Como referência**: Copiar estrutura para novo componente
- **Documentação**: Mostrar padrão Educacross para infinity scroll
- **Onboarding**: Ensinar devs a implementar infinity scroll
- **Code review**: Comparar implementação com modelo

## Relação com InfinityScroll

SelectInfinityScrollModelo é o **template simplificado** do InfinityScroll completo:

1. **InfinityScroll**: Componente production-ready com todas features
2. **SelectInfinityScrollModelo**: Modelo educacional/referência

Use InfinityScroll em produção, SelectInfinityScrollModelo para aprender/documentar.
        `
      }
    }
  }
};

/**
 * Design Specs
 * 
 * Cores:
 * - Loader text: #BBBBBB
 * - Border: #DBDADE
 * 
 * Dimensões:
 * - Loader padding: 12px
 * - Font-size: 13px
 * - Text-align: center
 * 
 * HTML Structure:
 * <v-select>
 *   <template #list-footer>
 *     <li class="loader">Loading...</li>
 *   </template>
 * </v-select>
 */

// Estilos base
const modeloStyles = `
<style>
  .modelo-container {
    max-width: 500px;
  }
  
  .loader {
    text-align: center;
    padding: 12px;
    color: #BBBBBB;
    font-size: 13px;
    list-style: none;
  }
  
  .code-block {
    background: #F3F2F7;
    border: 1px solid #DBDADE;
    border-radius: 6px;
    padding: 16px;
    font-family: 'Courier New', monospace;
    font-size: 12px;
    color: #5D596C;
    overflow-x: auto;
    line-height: 1.6;
  }
  
  .code-comment {
    color: #6E6B7B;
    font-style: italic;
  }
  
  .code-tag {
    color: #EA5455;
  }
  
  .code-attr {
    color: #FF9F43;
  }
  
  .code-string {
    color: #28C76F;
  }
  
  .info-box {
    background: #E3F2FD;
    border-left: 4px solid #2196F3;
    padding: 16px;
    border-radius: 6px;
    margin-bottom: 20px;
  }
  
  .info-title {
    font-size: 14px;
    font-weight: 600;
    color: #1565C0;
    margin: 0 0 8px 0;
  }
  
  .info-text {
    font-size: 13px;
    color: #1976D2;
    margin: 0;
  }
  
  .select-preview {
    background: white;
    border: 1px solid #DBDADE;
    border-radius: 6px;
    padding: 12px;
    margin-bottom: 20px;
  }
  
  .select-input {
    width: 100%;
    padding: 10px 16px;
    border: 1px solid #DBDADE;
    border-radius: 6px;
    font-size: 14px;
    color: #5D596C;
  }
  
  .select-dropdown {
    background: white;
    border: 1px solid #DBDADE;
    border-radius: 6px;
    margin-top: 8px;
    max-height: 250px;
    overflow-y: auto;
  }
  
  .select-option {
    padding: 10px 16px;
    font-size: 14px;
    color: #5D596C;
    cursor: pointer;
    transition: background 0.15s;
  }
  
  .select-option:hover {
    background: #F3F2F7;
  }
</style>
`;

// Story: Default
export const Default = {
  render: () => `
    ${modeloStyles}
    <div class="modelo-container">
      <div class="info-box">
        <h4 class="info-title">
          <i class="bi bi-code-square"></i> Template Modelo
        </h4>
        <p class="info-text">
          Estrutura base para implementar infinity scroll em v-select
        </p>
      </div>
      
      <div class="select-preview">
        <input type="text" class="select-input" placeholder="Selecione..." readonly />
        <div class="select-dropdown">
          <div class="select-option">Opção 1</div>
          <div class="select-option">Opção 2</div>
          <div class="select-option">Opção 3</div>
          <li class="loader">Loading more options...</li>
        </div>
      </div>
    </div>
  `
};

// Story: CodeExample
export const CodeExample = {
  render: () => `
    ${modeloStyles}
    <div style="max-width: 700px;">
      <div class="info-box">
        <h4 class="info-title">
          <i class="bi bi-file-code"></i> Exemplo de Código
        </h4>
        <p class="info-text">
          Template Vue.js para copiar e adaptar
        </p>
      </div>
      
      <div class="code-block">
<span class="code-tag">&lt;template&gt;</span>
  <span class="code-tag">&lt;v-select</span>
    <span class="code-attr">:options</span>=<span class="code-string">"options"</span>
    <span class="code-attr">:filterable</span>=<span class="code-string">"true"</span>
    <span class="code-attr">label</span>=<span class="code-string">"name"</span>
    <span class="code-attr">v-model</span>=<span class="code-string">"selected"</span>
    <span class="code-attr">@open</span>=<span class="code-string">"onOpen"</span>
    <span class="code-attr">@search</span>=<span class="code-string">"onSearch"</span>
  <span class="code-tag">&gt;</span>
    <span class="code-comment">&lt;!-- Slot para loader no final da lista --&gt;</span>
    <span class="code-tag">&lt;template</span> <span class="code-attr">#list-footer</span><span class="code-tag">&gt;</span>
      <span class="code-tag">&lt;li</span> <span class="code-attr">class</span>=<span class="code-string">"loader"</span> <span class="code-attr">v-if</span>=<span class="code-string">"loading"</span><span class="code-tag">&gt;</span>
        Loading more options...
      <span class="code-tag">&lt;/li&gt;</span>
    <span class="code-tag">&lt;/template&gt;</span>
    
    <span class="code-comment">&lt;!-- Slot para mensagem vazia --&gt;</span>
    <span class="code-tag">&lt;template</span> <span class="code-attr">#no-options</span><span class="code-tag">&gt;</span>
      Nenhuma opção foi encontrada.
    <span class="code-tag">&lt;/template&gt;</span>
  <span class="code-tag">&lt;/v-select&gt;</span>
<span class="code-tag">&lt;/template&gt;</span>

<span class="code-tag">&lt;style</span> <span class="code-attr">scoped</span><span class="code-tag">&gt;</span>
.loader {
  text-align: center;
  color: #BBBBBB;
}
<span class="code-tag">&lt;/style&gt;</span>
      </div>
    </div>
  `
};

// Story: LoaderVariations
export const LoaderVariations = {
  render: () => `
    ${modeloStyles}
    <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 24px; max-width: 900px;">
      <div>
        <h4 style="font-size: 13px; font-weight: 600; color: #5D596C; margin-bottom: 12px;">
          Loader Simples (texto)
        </h4>
        <div class="select-dropdown">
          <div class="select-option">Opção 1</div>
          <div class="select-option">Opção 2</div>
          <li class="loader">Loading more options...</li>
        </div>
      </div>
      
      <div>
        <h4 style="font-size: 13px; font-weight: 600; color: #5D596C; margin-bottom: 12px;">
          Loader com Spinner
        </h4>
        <div class="select-dropdown">
          <div class="select-option">Opção 1</div>
          <div class="select-option">Opção 2</div>
          <li class="loader">
            <span style="display: inline-block; width: 14px; height: 14px; border: 2px solid #E0E0E0; border-top-color: #6E63E8; border-radius: 50%; animation: spin 1s linear infinite; margin-right: 8px;"></span>
            Carregando...
          </li>
        </div>
      </div>
      
      <div>
        <h4 style="font-size: 13px; font-weight: 600; color: #5D596C; margin-bottom: 12px;">
          Loader com Dots
        </h4>
        <div class="select-dropdown">
          <div class="select-option">Opção 1</div>
          <div class="select-option">Opção 2</div>
          <li class="loader">
            Loading<span style="animation: dots 1.5s infinite;">...</span>
          </li>
        </div>
      </div>
      
      <div>
        <h4 style="font-size: 13px; font-weight: 600; color: #5D596C; margin-bottom: 12px;">
          Loader com Progresso
        </h4>
        <div class="select-dropdown">
          <div class="select-option">Opção 1</div>
          <div class="select-option">Opção 2</div>
          <li class="loader">
            Carregando 21-40 de 200...
          </li>
        </div>
      </div>
    </div>
    
    <style>
      @keyframes spin {
        to { transform: rotate(360deg); }
      }
      @keyframes dots {
        0%, 20% { content: '.'; }
        40% { content: '..'; }
        60%, 100% { content: '...'; }
      }
    </style>
  `
};

// Story: SlotPositions
export const SlotPositions = {
  render: () => `
    ${modeloStyles}
    <div style="max-width: 700px;">
      <div class="info-box">
        <h4 class="info-title">
          <i class="bi bi-layout-three-columns"></i> Posições de Slots
        </h4>
        <p class="info-text">
          v-select oferece múltiplos slots para customização
        </p>
      </div>
      
      <div class="code-block" style="margin-bottom: 24px;">
<span class="code-comment">&lt;!-- Slot #list-header: Topo da lista --&gt;</span>
<span class="code-tag">&lt;template</span> <span class="code-attr">#list-header</span><span class="code-tag">&gt;</span>
  <span class="code-tag">&lt;li</span> <span class="code-attr">class</span>=<span class="code-string">"header"</span><span class="code-tag">&gt;</span>Escolha uma opção:<span class="code-tag">&lt;/li&gt;</span>
<span class="code-tag">&lt;/template&gt;</span>

<span class="code-comment">&lt;!-- Slot #list-footer: Final da lista (LOADER) --&gt;</span>
<span class="code-tag">&lt;template</span> <span class="code-attr">#list-footer</span><span class="code-tag">&gt;</span>
  <span class="code-tag">&lt;li</span> <span class="code-attr">class</span>=<span class="code-string">"loader"</span><span class="code-tag">&gt;</span>Loading more...<span class="code-tag">&lt;/li&gt;</span>
<span class="code-tag">&lt;/template&gt;</span>

<span class="code-comment">&lt;!-- Slot #no-options: Lista vazia --&gt;</span>
<span class="code-tag">&lt;template</span> <span class="code-attr">#no-options</span><span class="code-tag">&gt;</span>
  Nenhuma opção encontrada.
<span class="code-tag">&lt;/template&gt;</span>
      </div>
      
      <div class="select-dropdown">
        <li style="padding: 10px 16px; background: #F3F2F7; font-weight: 600; font-size: 12px; color: #5D596C; list-style: none;">
          ↑ list-header
        </li>
        <div class="select-option">Opção 1</div>
        <div class="select-option">Opção 2</div>
        <div class="select-option">Opção 3</div>
        <li class="loader">
          ↓ list-footer (LOADER)
        </li>
      </div>
    </div>
  `
};

// Story: BestPractices
export const BestPractices = {
  render: () => `
    ${modeloStyles}
    <div style="max-width: 800px;">
      <h3 style="font-size: 18px; font-weight: 700; color: #5D596C; margin: 0 0 20px 0;">
        Best Practices - Infinity Scroll
      </h3>
      
      <div style="display: flex; flex-direction: column; gap: 16px;">
        <div style="background: white; border: 1px solid #E0E0E0; border-radius: 8px; padding: 16px; border-left: 4px solid #28C76F;">
          <h4 style="font-size: 14px; font-weight: 600; color: #28C76F; margin: 0 0 8px 0;">
            ✅ DO: Use list-footer slot
          </h4>
          <p style="font-size: 13px; color: #6E6B7B; margin: 0 0 8px 0;">
            Loader deve estar no final da lista usando slot #list-footer
          </p>
          <div class="code-block" style="font-size: 11px;">
&lt;template #list-footer&gt;
  &lt;li class="loader"&gt;Loading...&lt;/li&gt;
&lt;/template&gt;
          </div>
        </div>
        
        <div style="background: white; border: 1px solid #E0E0E0; border-radius: 8px; padding: 16px; border-left: 4px solid #EA5455;">
          <h4 style="font-size: 14px; font-weight: 600; color: #EA5455; margin: 0 0 8px 0;">
            ❌ DON'T: Loader fora do dropdown
          </h4>
          <p style="font-size: 13px; color: #6E6B7B; margin: 0 0 8px 0;">
            Não coloque loader fora do v-select, perde contexto visual
          </p>
          <div class="code-block" style="font-size: 11px; opacity: 0.6;">
&lt;v-select .../&gt;
&lt;div class="loader"&gt;Loading...&lt;/div&gt; <span class="code-comment">❌ Errado</span>
          </div>
        </div>
        
        <div style="background: white; border: 1px solid #E0E0E0; border-radius: 8px; padding: 16px; border-left: 4px solid #28C76F;">
          <h4 style="font-size: 14px; font-weight: 600; color: #28C76F; margin: 0 0 8px 0;">
            ✅ DO: Conditional rendering
          </h4>
          <p style="font-size: 13px; color: #6E6B7B; margin: 0 0 8px 0;">
            Mostrar loader apenas quando carregando (v-if="loading")
          </p>
          <div class="code-block" style="font-size: 11px;">
&lt;li class="loader" v-if="loading"&gt;
  Loading more options...
&lt;/li&gt;
          </div>
        </div>
        
        <div style="background: white; border: 1px solid #E0E0E0; border-radius: 8px; padding: 16px; border-left: 4px solid #FF9F43;">
          <h4 style="font-size: 14px; font-weight: 600; color: #FF9F43; margin: 0 0 8px 0;">
            ⚠️ CONSIDER: Debounce search
          </h4>
          <p style="font-size: 13px; color: #6E6B7B; margin: 0 0 8px 0;">
            Use debounce 300ms em buscas para evitar requisições excessivas
          </p>
          <div class="code-block" style="font-size: 11px;">
onSearch: debounce((search, loading) => {
  loading(true);
  fetchOptions(search).then(...);
}, 300)
          </div>
        </div>
        
        <div style="background: white; border: 1px solid #E0E0E0; border-radius: 8px; padding: 16px; border-left: 4px solid #6E63E8;">
          <h4 style="font-size: 14px; font-weight: 600; color: #6E63E8; margin: 0 0 8px 0;">
            💡 TIP: Show progress
          </h4>
          <p style="font-size: 13px; color: #6E6B7B; margin: 0;">
            Mostre progresso no loader: "Carregando 21-40 de 500..."
          </p>
        </div>
      </div>
    </div>
  `
};

// Story: ImplementationGuide
export const ImplementationGuide = {
  render: () => `
    ${modeloStyles}
    <div style="max-width: 800px;">
      <h3 style="font-size: 18px; font-weight: 700; color: #5D596C; margin: 0 0 20px 0;">
        Guia de Implementação
      </h3>
      
      <div style="background: white; border: 1px solid #E0E0E0; border-radius: 8px; padding: 20px; margin-bottom: 20px;">
        <h4 style="font-size: 15px; font-weight: 600; color: #5D596C; margin: 0 0 12px 0;">
          1. Setup básico
        </h4>
        <div class="code-block">
data() {
  return {
    options: [],
    page: 1,
    hasMore: true,
    loading: false
  }
}
        </div>
      </div>
      
      <div style="background: white; border: 1px solid #E0E0E0; border-radius: 8px; padding: 20px; margin-bottom: 20px;">
        <h4 style="font-size: 15px; font-weight: 600; color: #5D596C; margin: 0 0 12px 0;">
          2. Método de carregamento
        </h4>
        <div class="code-block">
async loadMore() {
  if (!this.hasMore || this.loading) return;
  
  this.loading = true;
  const data = await api.getOptions(this.page);
  
  this.options.push(...data.items);
  this.page++;
  this.hasMore = data.hasMore;
  this.loading = false;
}
        </div>
      </div>
      
      <div style="background: white; border: 1px solid #E0E0E0; border-radius: 8px; padding: 20px; margin-bottom: 20px;">
        <h4 style="font-size: 15px; font-weight: 600; color: #5D596C; margin: 0 0 12px 0;">
          3. Template com loader
        </h4>
        <div class="code-block">
&lt;v-select
  :options="options"
  @open="loadMore"
&gt;
  &lt;template #list-footer&gt;
    &lt;li class="loader" v-if="loading"&gt;
      Loading more options...
    &lt;/li&gt;
  &lt;/template&gt;
&lt;/v-select&gt;
        </div>
      </div>
      
      <div style="background: #E8F5E9; border-left: 4px solid #28C76F; padding: 16px; border-radius: 6px;">
        <h4 style="font-size: 14px; font-weight: 600; color: #2E7D32; margin: 0 0 8px 0;">
          <i class="bi bi-check-circle-fill"></i> Pronto!
        </h4>
        <p style="font-size: 13px; color: #388E3C; margin: 0;">
          Agora você tem um select com infinity scroll funcional seguindo o modelo Educacross.
        </p>
      </div>
    </div>
  `
};

// Story: Comparison
export const Comparison = {
  render: () => `
    ${modeloStyles}
    <div style="max-width: 900px;">
      <h3 style="font-size: 18px; font-weight: 700; color: #5D596C; margin: 0 0 20px 0;">
        SelectInfinityScrollModelo vs InfinityScroll
      </h3>
      
      <table style="width: 100%; border-collapse: collapse; background: white; border: 1px solid #E0E0E0; border-radius: 8px; overflow: hidden;">
        <thead>
          <tr style="background: #F3F2F7;">
            <th style="padding: 12px; text-align: left; font-size: 13px; font-weight: 600; color: #5D596C; border-bottom: 2px solid #E0E0E0;">
              Aspecto
            </th>
            <th style="padding: 12px; text-align: left; font-size: 13px; font-weight: 600; color: #5D596C; border-bottom: 2px solid #E0E0E0;">
              InfinityScroll
            </th>
            <th style="padding: 12px; text-align: left; font-size: 13px; font-weight: 600; color: #5D596C; border-bottom: 2px solid #E0E0E0;">
              SelectInfinityScrollModelo
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="padding: 12px; font-size: 13px; color: #5D596C; border-bottom: 1px solid #F0F0F0;">
              <strong>Tipo</strong>
            </td>
            <td style="padding: 12px; font-size: 13px; color: #5D596C; border-bottom: 1px solid #F0F0F0;">
              Componente completo
            </td>
            <td style="padding: 12px; font-size: 13px; color: #5D596C; border-bottom: 1px solid #F0F0F0;">
              Template/modelo
            </td>
          </tr>
          <tr style="background: #FAFAFA;">
            <td style="padding: 12px; font-size: 13px; color: #5D596C; border-bottom: 1px solid #F0F0F0;">
              <strong>Uso</strong>
            </td>
            <td style="padding: 12px; font-size: 13px; color: #5D596C; border-bottom: 1px solid #F0F0F0;">
              Instanciar diretamente
            </td>
            <td style="padding: 12px; font-size: 13px; color: #5D596C; border-bottom: 1px solid #F0F0F0;">
              Copiar e adaptar código
            </td>
          </tr>
          <tr>
            <td style="padding: 12px; font-size: 13px; color: #5D596C; border-bottom: 1px solid #F0F0F0;">
              <strong>Props</strong>
            </td>
            <td style="padding: 12px; font-size: 13px; color: #5D596C; border-bottom: 1px solid #F0F0F0;">
              Todas funcionais (options, filterable, etc)
            </td>
            <td style="padding: 12px; font-size: 13px; color: #5D596C; border-bottom: 1px solid #F0F0F0;">
              Props básicas (modelo)
            </td>
          </tr>
          <tr style="background: #FAFAFA;">
            <td style="padding: 12px; font-size: 13px; color: #5D596C; border-bottom: 1px solid #F0F0F0;">
              <strong>Eventos</strong>
            </td>
            <td style="padding: 12px; font-size: 13px; color: #5D596C; border-bottom: 1px solid #F0F0F0;">
              @input, @load implementados
            </td>
            <td style="padding: 12px; font-size: 13px; color: #5D596C; border-bottom: 1px solid #F0F0F0;">
              Documentação apenas
            </td>
          </tr>
          <tr>
            <td style="padding: 12px; font-size: 13px; color: #5D596C; border-bottom: 1px solid #F0F0F0;">
              <strong>Loader</strong>
            </td>
            <td style="padding: 12px; font-size: 13px; color: #5D596C; border-bottom: 1px solid #F0F0F0;">
              Customizável com spinner
            </td>
            <td style="padding: 12px; font-size: 13px; color: #5D596C; border-bottom: 1px solid #F0F0F0;">
              Modelo padrão simples
            </td>
          </tr>
          <tr style="background: #FAFAFA;">
            <td style="padding: 12px; font-size: 13px; color: #5D596C;">
              <strong>Finalidade</strong>
            </td>
            <td style="padding: 12px; font-size: 13px; color: #5D596C;">
              <span style="color: #28C76F; font-weight: 600;">✓ Produção</span>
            </td>
            <td style="padding: 12px; font-size: 13px; color: #5D596C;">
              <span style="color: #2196F3; font-weight: 600;">📘 Documentação</span>
            </td>
          </tr>
        </tbody>
      </table>
      
      <div style="margin-top: 20px; padding: 16px; background: #FFF3E0; border-left: 4px solid #FF9F43; border-radius: 6px;">
        <h4 style="font-size: 14px; font-weight: 600; color: #F57F17; margin: 0 0 8px 0;">
          <i class="bi bi-lightbulb"></i> Quando usar cada um?
        </h4>
        <ul style="margin: 0; padding-left: 20px; font-size: 13px; color: #F9A825;">
          <li><strong>InfinityScroll:</strong> Use em produção quando precisa de infinity scroll</li>
          <li><strong>SelectInfinityScrollModelo:</strong> Use para aprender, documentar ou criar novo componente customizado</li>
        </ul>
      </div>
    </div>
  `
};

// Story: Responsive
export const Responsive = {
  render: () => `
    ${modeloStyles}
    <div style="background: #E3F2FD; border-left: 4px solid #2196F3; padding: 16px; border-radius: 6px; margin-bottom: 24px; max-width: 700px;">
      <h4 style="font-size: 14px; font-weight: 600; color: #1565C0; margin: 0 0 8px 0;">
        <i class="bi bi-code-slash"></i> SelectInfinityScrollModelo: Template Responsivo
      </h4>
      <ul style="margin: 0; padding-left: 20px; font-size: 13px; color: #1976D2;">
        <li><strong>Loader centralizado:</strong> text-align center funciona em qualquer largura</li>
        <li><strong>Padding consistente:</strong> 12px vertical para touch-friendly</li>
        <li><strong>Font-size 13px:</strong> Legível em mobile sem zoom</li>
        <li><strong>Modelo adaptável:</strong> Copiar e ajustar para qualquer contexto</li>
      </ul>
    </div>
    
    <div class="select-dropdown">
      <div class="select-option">Opção 1</div>
      <div class="select-option">Opção 2</div>
      <div class="select-option">Opção 3</div>
      <li class="loader">Loading more options...</li>
    </div>
    
    <p style="margin-top: 16px; font-size: 12px; color: #6E6B7B; text-align: center;">
      Template modelo se adapta a qualquer largura de dropdown
    </p>
  `
};


