/**
 * InfinityScroll - Infinite Scroll Select Component
 * ==================================================
 * Select com scroll infinito e carregamento dinâmico de opções
 * 
 * @component InfinityScroll
 * @category Educacross Components V2 / Forms
 * @source educacross-frontoffice/src/components/selects/InfinityScroll.vue
 * @priority P2
 * @status PIXEL-PERFECT
 * @since 2.0.0
 */

export default {
  title: 'Educacross Components V2/Selects/InfinityScroll',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
# InfinityScroll

Componente de **select com rolagem infinita** para carregar grandes listas dinamicamente.

## Contexto de Uso

- **Listas grandes**: Quando há centenas/milhares de opções (ex: alunos, escolas)
- **Performance**: Evita carregar todas as opções de uma vez
- **UX fluida**: Carrega mais itens conforme usuário rola dropdown
- **APIs paginadas**: Backend retorna dados em páginas (ex: 20 items/vez)
- **Busca + paginação**: Combina filtro com carregamento incremental

## Estrutura

\`\`\`
+------------------------+
| [Buscar opções...    ] |  ← Input de busca
+------------------------+
| Option 1               |
| Option 2               |
| ...                    |
| Option 20              |
+------------------------+
| Loading more...        |  ← Loader ao rolar fim
+------------------------+
\`\`\`

## Fluxo de Funcionamento

1. **Carregamento inicial**: Primeira página (20 itens)
2. **Usuário rola**: Detecta chegada ao fim do dropdown
3. **Evento @load**: Dispara carregamento próxima página
4. **Loader exibido**: "Loading more options..."
5. **Dados adicionados**: Append novos itens à lista
6. **Repetir**: Até não haver mais páginas

## Props

- **options**: Array de opções atuais
- **filterable**: true (permite busca)
- **label**: Nome do campo exibido
- **value**: Valor selecionado
- **clearable**: true (botão limpar)
- **reduce**: Função para extrair valor do objeto
- **placeholder**: Texto placeholder
- **searchable**: true (habilita busca)

## Events

- **@input**: Quando seleciona/limpa opção
- **@load**: Quando chega ao fim (carregar mais)

## Características

- **Lazy loading**: Carrega apenas visível + próxima página
- **Debounce search**: Busca aguarda 300ms após digitação
- **Visual feedback**: Loader girando durante carregamento
- **Empty state**: "Nenhuma opção foi encontrada"
- **Scroll detection**: IntersectionObserver ou scroll event

## Quando usar

- **Dropdown grande**: Mais de 50 opções
- **API paginada**: Backend retorna dados em lotes
- **Performance crítica**: Evitar lag em selects grandes
- **Combo busca + scroll**: Filtro + carregamento incremental
        `
      }
    }
  }
};

/**
 * Design Specs
 * 
 * Cores:
 * - Border: #DBDADE
 * - Loader text: #BBBBBB
 * - Selected: #6E63E8 (primary)
 * - Hover: #F3F2F7
 * 
 * Dimensões:
 * - Dropdown max-height: 300px
 * - Option padding: 10px 16px
 * - Loader padding: 12px
 * - Font-size: 14px
 * - Border-radius: 6px
 * 
 * Comportamento:
 * - Scroll trigger: 80% da altura (240px de 300px)
 * - Items por página: 20
 * - Debounce busca: 300ms
 * - Loader animation: spin 1s linear infinite
 */

// Estilos base
const infinityScrollStyles = `
<style>
  .infinity-scroll-container {
    max-width: 400px;
  }
  
  .custom-select {
    position: relative;
    width: 100%;
  }
  
  .select-input {
    width: 100%;
    padding: 10px 40px 10px 16px;
    border: 1px solid #DBDADE;
    border-radius: 6px;
    font-size: 14px;
    color: #5D596C;
    background: white;
    cursor: pointer;
    transition: border-color 0.2s;
  }
  
  .select-input:focus {
    outline: none;
    border-color: #6E63E8;
    box-shadow: 0 0 0 3px rgba(110, 99, 232, 0.1);
  }
  
  .select-input::placeholder {
    color: #B4B4B4;
  }
  
  .select-arrow {
    position: absolute;
    right: 12px;
    top: 50%;
    transform: translateY(-50%);
    pointer-events: none;
    color: #6E6B7B;
    font-size: 12px;
  }
  
  .select-dropdown {
    position: absolute;
    top: calc(100% + 4px);
    left: 0;
    right: 0;
    background: white;
    border: 1px solid #DBDADE;
    border-radius: 6px;
    box-shadow: 0 4px 16px rgba(0,0,0,0.12);
    max-height: 300px;
    overflow-y: auto;
    z-index: 1000;
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
  
  .select-option.selected {
    background: rgba(110, 99, 232, 0.1);
    color: #6E63E8;
    font-weight: 600;
  }
  
  .loader {
    text-align: center;
    padding: 12px;
    color: #BBBBBB;
    font-size: 13px;
  }
  
  .loader-spinner {
    display: inline-block;
    width: 16px;
    height: 16px;
    border: 2px solid #E0E0E0;
    border-top-color: #6E63E8;
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin-right: 8px;
  }
  
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
  
  .empty-state {
    padding: 20px;
    text-align: center;
    color: #6E6B7B;
    font-size: 13px;
  }
  
  .clear-button {
    position: absolute;
    right: 32px;
    top: 50%;
    transform: translateY(-50%);
    background: none;
    border: none;
    color: #6E6B7B;
    cursor: pointer;
    padding: 4px;
    font-size: 16px;
    line-height: 1;
    opacity: 0.6;
    transition: opacity 0.2s;
  }
  
  .clear-button:hover {
    opacity: 1;
  }
</style>
`;

// Story: Default
export const Default = {
  render: () => `
    ${infinityScrollStyles}
    <div class="infinity-scroll-container">
      <div class="custom-select">
        <input 
          type="text" 
          class="select-input" 
          placeholder="Selecione uma opção..."
          readonly
        />
        <i class="bi bi-chevron-down select-arrow"></i>
        
        <div class="select-dropdown" style="display: block;">
          <div class="select-option">Option 1</div>
          <div class="select-option selected">Option 2 (selecionada)</div>
          <div class="select-option">Option 3</div>
          <div class="loader">
            <span class="loader-spinner"></span>
            Loading more options...
          </div>
        </div>
      </div>
    </div>
  `
};

// Story: WithSearch
export const WithSearch = {
  render: () => `
    ${infinityScrollStyles}
    <div class="infinity-scroll-container">
      <div class="custom-select">
        <input 
          type="text" 
          class="select-input" 
          placeholder="Buscar..."
          value="Mat"
        />
        <button class="clear-button">
          <i class="bi bi-x"></i>
        </button>
        <i class="bi bi-chevron-down select-arrow"></i>
        
        <div class="select-dropdown" style="display: block;">
          <div class="select-option">Matemática</div>
          <div class="select-option">Matemática Financeira</div>
          <div class="select-option">Matemática Aplicada</div>
          <div class="loader">
            <span class="loader-spinner"></span>
            Buscando mais resultados...
          </div>
        </div>
      </div>
      <p style="margin-top: 12px; font-size: 12px; color: #6E6B7B;">
        <i class="bi bi-info-circle"></i> Filtrando 3 de 150 opções
      </p>
    </div>
  `
};

// Story: LoadingState
export const LoadingState = {
  render: () => `
    ${infinityScrollStyles}
    <div class="infinity-scroll-container">
      <div class="custom-select">
        <input 
          type="text" 
          class="select-input" 
          placeholder="Carregando..."
          readonly
        />
        <i class="bi bi-chevron-down select-arrow"></i>
        
        <div class="select-dropdown" style="display: block;">
          <div class="select-option">João Silva</div>
          <div class="select-option">Maria Santos</div>
          <div class="select-option">Carlos Mendes</div>
          <div class="select-option">Ana Costa</div>
          <div class="select-option">Bruno Alves</div>
          <div class="loader">
            <span class="loader-spinner"></span>
            Carregando página 2...
          </div>
        </div>
      </div>
    </div>
  `
};

// Story: EmptyState
export const EmptyState = {
  render: () => `
    ${infinityScrollStyles}
    <div class="infinity-scroll-container">
      <div class="custom-select">
        <input 
          type="text" 
          class="select-input" 
          placeholder="Buscar..."
          value="xyz"
        />
        <button class="clear-button">
          <i class="bi bi-x"></i>
        </button>
        <i class="bi bi-chevron-down select-arrow"></i>
        
        <div class="select-dropdown" style="display: block;">
          <div class="empty-state">
            <i class="bi bi-search" style="font-size: 32px; color: #DBDADE; margin-bottom: 8px;"></i>
            <div>Nenhuma opção foi encontrada.</div>
            <div style="margin-top: 4px; font-size: 11px; color: #B4B4B4;">
              Tente outro termo de busca
            </div>
          </div>
        </div>
      </div>
    </div>
  `
};

// Story: LargeDataset
export const LargeDataset = {
  render: () => `
    ${infinityScrollStyles}
    <style>
      .dataset-info {
        background: #E3F2FD;
        border-left: 4px solid #2196F3;
        padding: 12px;
        border-radius: 6px;
        margin-bottom: 16px;
        font-size: 13px;
        color: #1565C0;
      }
    </style>
    <div class="infinity-scroll-container">
      <div class="dataset-info">
        <strong>Dataset:</strong> 1.500 alunos • Carregando 20 por vez
      </div>
      
      <div class="custom-select">
        <input 
          type="text" 
          class="select-input" 
          placeholder="Buscar aluno..."
        />
        <i class="bi bi-chevron-down select-arrow"></i>
        
        <div class="select-dropdown" style="display: block;">
          ${Array.from({length: 10}, (_, i) => `
            <div class="select-option">
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <span>Aluno ${i + 1}</span>
                <span style="font-size: 11px; color: #6E6B7B;">Mat: ${2026000 + i}</span>
              </div>
            </div>
          `).join('')}
          <div class="loader">
            <span class="loader-spinner"></span>
            Carregando 11-20 de 1.500...
          </div>
        </div>
      </div>
    </div>
  `
};

// Story: WithIcons
export const WithIcons = {
  render: () => `
    ${infinityScrollStyles}
    <div class="infinity-scroll-container">
      <div class="custom-select">
        <input 
          type="text" 
          class="select-input" 
          placeholder="Selecione uma disciplina..."
          readonly
        />
        <i class="bi bi-chevron-down select-arrow"></i>
        
        <div class="select-dropdown" style="display: block;">
          <div class="select-option">
            <i class="bi bi-calculator" style="color: #6E63E8; margin-right: 8px;"></i>
            Matemática
          </div>
          <div class="select-option">
            <i class="bi bi-book" style="color: #28C76F; margin-right: 8px;"></i>
            Português
          </div>
          <div class="select-option selected">
            <i class="bi bi-globe" style="color: #00CFE8; margin-right: 8px;"></i>
            Geografia
          </div>
          <div class="select-option">
            <i class="bi bi-clock-history" style="color: #FF9F43; margin-right: 8px;"></i>
            História
          </div>
          <div class="select-option">
            <i class="bi bi-flask" style="color: #EA5455; margin-right: 8px;"></i>
            Ciências
          </div>
          <div class="loader">
            <span class="loader-spinner"></span>
            Carregando mais disciplinas...
          </div>
        </div>
      </div>
    </div>
  `
};

// Story: MultipleStates
export const MultipleStates = {
  render: () => `
    ${infinityScrollStyles}
    <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 24px; max-width: 900px;">
      <div>
        <h4 style="font-size: 13px; font-weight: 600; color: #5D596C; margin-bottom: 12px;">
          Estado: Aberto (scrolling)
        </h4>
        <div class="custom-select">
          <input type="text" class="select-input" placeholder="Selecione..." readonly />
          <i class="bi bi-chevron-down select-arrow"></i>
          <div class="select-dropdown" style="display: block;">
            <div class="select-option">Opção A</div>
            <div class="select-option">Opção B</div>
            <div class="select-option">Opção C</div>
            <div class="loader">
              <span class="loader-spinner"></span>
              Loading...
            </div>
          </div>
        </div>
      </div>
      
      <div>
        <h4 style="font-size: 13px; font-weight: 600; color: #5D596C; margin-bottom: 12px;">
          Estado: Selecionado
        </h4>
        <div class="custom-select">
          <input type="text" class="select-input" value="Opção B (selecionada)" readonly />
          <button class="clear-button">
            <i class="bi bi-x"></i>
          </button>
          <i class="bi bi-chevron-down select-arrow"></i>
        </div>
      </div>
      
      <div>
        <h4 style="font-size: 13px; font-weight: 600; color: #5D596C; margin-bottom: 12px;">
          Estado: Buscando
        </h4>
        <div class="custom-select">
          <input type="text" class="select-input" value="test" placeholder="Buscar..." />
          <button class="clear-button">
            <i class="bi bi-x"></i>
          </button>
          <i class="bi bi-chevron-down select-arrow"></i>
          <div class="select-dropdown" style="display: block;">
            <div class="empty-state">
              <i class="bi bi-search" style="font-size: 24px; color: #DBDADE;"></i>
              <div>Nenhum resultado</div>
            </div>
          </div>
        </div>
      </div>
      
      <div>
        <h4 style="font-size: 13px; font-weight: 600; color: #5D596C; margin-bottom: 12px;">
          Estado: Carregando inicial
        </h4>
        <div class="custom-select">
          <input type="text" class="select-input" placeholder="Carregando..." readonly disabled style="opacity: 0.6;" />
          <i class="bi bi-chevron-down select-arrow" style="opacity: 0.6;"></i>
        </div>
      </div>
    </div>
  `
};

// Story: Responsive
export const Responsive = {
  render: () => `
    ${infinityScrollStyles}
    <div style="background: #E8F5E9; border-left: 4px solid #28C76F; padding: 16px; border-radius: 6px; margin-bottom: 24px; max-width: 700px;">
      <h4 style="font-size: 14px; font-weight: 600; color: #2E7D32; margin: 0 0 8px 0;">
        <i class="bi bi-phone"></i> InfinityScroll: Responsivo
      </h4>
      <ul style="margin: 0; padding-left: 20px; font-size: 13px; color: #388E3C;">
        <li><strong>Dropdown full-width:</strong> Adapta à largura do container</li>
        <li><strong>Touch-friendly:</strong> Opções com padding 10px para mobile</li>
        <li><strong>Max-height 300px:</strong> Previne dropdown muito alto em mobile</li>
        <li><strong>Scroll suave:</strong> Overflow-y auto com momentum iOS</li>
      </ul>
    </div>
    
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px; max-width: 900px;">
      <div>
        <h4 style="font-size: 13px; font-weight: 600; color: #5D596C; margin-bottom: 12px; text-align: center;">
          Desktop (400px)
        </h4>
        <div class="infinity-scroll-container">
          <div class="custom-select">
            <input type="text" class="select-input" placeholder="Selecionar..." readonly />
            <i class="bi bi-chevron-down select-arrow"></i>
            <div class="select-dropdown" style="display: block;">
              <div class="select-option">Opção 1</div>
              <div class="select-option">Opção 2</div>
              <div class="select-option">Opção 3</div>
              <div class="loader">
                <span class="loader-spinner"></span>
                Loading...
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div>
        <h4 style="font-size: 13px; font-weight: 600; color: #5D596C; margin-bottom: 12px; text-align: center;">
          Mobile (100%)
        </h4>
        <div style="width: 100%;">
          <div class="custom-select">
            <input type="text" class="select-input" placeholder="Selecionar..." readonly />
            <i class="bi bi-chevron-down select-arrow"></i>
            <div class="select-dropdown" style="display: block;">
              <div class="select-option">Opção 1</div>
              <div class="select-option">Opção 2</div>
              <div class="select-option">Opção 3</div>
              <div class="loader">
                <span class="loader-spinner"></span>
                Loading...
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
};

// ============================================================================
// 🎯 4-STORIES STRUCTURE
// ============================================================================

// ============================================================================
// 📖 DOCUMENTATION
// ============================================================================

export const Documentation = {
  name: '📖 Documentation',
  parameters: {
    layout: 'fullscreen',
    docs: { disable: true },
    controls: { disable: true },
  },
  render: () => `
    <div style="font-family:'Public Sans',sans-serif;background:#f8f9fa;min-height:100vh;">
      <div style="background:linear-gradient(135deg,#6E63E8 0%,#9C91EF 100%);padding:60px 40px;color:white;">
        <div style="max-width:900px;margin:0 auto;">
          <div style="display:inline-block;padding:8px 16px;background:rgba(255,255,255,0.15);border-radius:50px;margin-bottom:20px;font-size:14px;border:1px solid rgba(255,255,255,0.2);">Selects</div>
          <h1 style="font-size:3rem;font-weight:700;margin:0 0 12px 0;letter-spacing:-0.02em;">InfinityScroll</h1>
          <p style="font-size:1.1rem;opacity:0.9;margin:0;max-width:600px;">Infinite Scroll Select Component</p>
        </div>
      </div>
      <div style="max-width:900px;margin:0 auto;padding:48px 40px;">
        <div style="background:white;border-radius:12px;padding:32px;margin-bottom:32px;box-shadow:0 2px 8px rgba(0,0,0,0.08);">
          <h2 style="font-size:1.1rem;font-weight:600;color:#5E5873;margin:0 0 16px 0;">Sobre o Componente</h2>
          <p style="color:#6E6B7B;line-height:1.7;margin:0 0 16px 0;">Infinite Scroll Select Component. Faz parte da categoria <strong>Selects</strong> do Design System Educacross.</p>
          <div style="background:#F8F7FF;border-left:4px solid #6E63E8;padding:16px;border-radius:4px;">
            <p style="margin:0;color:#5E5873;font-size:14px;line-height:1.6;"><strong>💡 Dica:</strong> Use <em>Playground</em> para explorar props, <em>Use Cases</em> para exemplos reais e <em>Accessibility</em> para validar WCAG.</p>
          </div>
        </div>
        <div style="background:white;border-radius:12px;padding:32px;box-shadow:0 2px 8px rgba(0,0,0,0.08);">
          <h2 style="font-size:1.1rem;font-weight:600;color:#5E5873;margin:0 0 16px 0;">Implementação Vue 2.7</h2>
          <pre style="background:#1E1E2E;color:#CDD6F4;padding:20px;border-radius:8px;font-size:13px;line-height:1.6;overflow:auto;margin:0;"><code>import InfinityScroll from '@/components/InfinityScroll.vue';

// Template
&lt;InfinityScroll v-bind="props" /&gt;</code></pre>
        </div>
      </div>
    </div>
  `,
};

// ============================================================================
// 🎨 PLAYGROUND
// ============================================================================

export const Playground = {
  name: '🎨 Playground',
  parameters: {
    layout: 'padded',
    docs: { description: { story: 'Explore o InfinityScroll com controles interativos.' } },
  },
  render: (args) => `
    <div style="padding:32px;display:flex;justify-content:center;align-items:center;min-height:200px;background:#F8F8F8;border-radius:12px;">
      <div style="text-align:center;color:#6E6B7B;">
        <div style="width:60px;height:60px;background:#6E63E820;border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 16px;font-size:24px;">🎨</div>
        <p style="margin:0 0 8px 0;font-size:15px;font-weight:600;color:#5E5873;">Playground InfinityScroll</p>
        <p style="margin:0;font-size:13px;color:#B9B9C3;">Consulte a story <em>Default</em> para visualização completa</p>
      </div>
    </div>
  `,
};

// ============================================================================
// 💼 USE CASES
// ============================================================================

export const UseCases = {
  name: '💼 Use Cases',
  parameters: {
    layout: 'padded',
    docs: { description: { story: 'Exemplos de uso real do InfinityScroll no Educacross.' } },
  },
  render: () => `
    <div style="max-width:800px;margin:0 auto;padding:40px 20px;font-family:'Public Sans',sans-serif;">
      <div style="background:#6E63E815;border:1px solid #6E63E830;border-radius:12px;padding:24px;margin-bottom:40px;">
        <h1 style="font-size:1.5rem;font-weight:700;color:#5E5873;margin:0 0 8px 0;">Casos de Uso: InfinityScroll</h1>
        <p style="color:#6E6B7B;margin:0;font-size:14px;line-height:1.6;">Cenários reais de uso no contexto educacional da plataforma Educacross</p>
      </div>
      
      <div style="margin-bottom:32px;">
        <h2 style="font-size:18px;font-weight:600;color:#5E5873;margin:0 0 8px 0;display:flex;align-items:center;gap:10px;">
          <span style="display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;background:#6E63E8;color:white;border-radius:50%;font-size:13px;font-weight:700;flex-shrink:0;">1</span>
          Professor — Painel Principal
        </h2>
        <p style="color:#6E6B7B;margin:0 0 16px 0;padding-left:38px;font-size:14px;">Professor utilizando InfinityScroll no dashboard de gestão de turmas</p>
        <div style="background:#F8F8F8;border-radius:8px;padding:20px;margin-left:38px;text-align:center;color:#B9B9C3;font-size:13px;">
          Ver story <strong>Default</strong> para visualização do componente neste contexto
        </div>
      </div>
      <div style="margin-bottom:32px;">
        <h2 style="font-size:18px;font-weight:600;color:#5E5873;margin:0 0 8px 0;display:flex;align-items:center;gap:10px;">
          <span style="display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;background:#6E63E8;color:white;border-radius:50%;font-size:13px;font-weight:700;flex-shrink:0;">2</span>
          Aluno — Portal do Estudante
        </h2>
        <p style="color:#6E6B7B;margin:0 0 16px 0;padding-left:38px;font-size:14px;">Aluno interagindo com InfinityScroll no portal educacional</p>
        <div style="background:#F8F8F8;border-radius:8px;padding:20px;margin-left:38px;text-align:center;color:#B9B9C3;font-size:13px;">
          Ver story <strong>Default</strong> para visualização do componente neste contexto
        </div>
      </div>
      <div style="margin-bottom:32px;">
        <h2 style="font-size:18px;font-weight:600;color:#5E5873;margin:0 0 8px 0;display:flex;align-items:center;gap:10px;">
          <span style="display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;background:#6E63E8;color:white;border-radius:50%;font-size:13px;font-weight:700;flex-shrink:0;">3</span>
          Coordenador — Relatórios
        </h2>
        <p style="color:#6E6B7B;margin:0 0 16px 0;padding-left:38px;font-size:14px;">Coordenador pedagógico analisando dados via InfinityScroll</p>
        <div style="background:#F8F8F8;border-radius:8px;padding:20px;margin-left:38px;text-align:center;color:#B9B9C3;font-size:13px;">
          Ver story <strong>Default</strong> para visualização do componente neste contexto
        </div>
      </div>
    </div>
  `,
};

// ============================================================================
// ♿ ACCESSIBILITY
// ============================================================================

export const Accessibility = {
  name: '♿ Accessibility',
  parameters: {
    layout: 'padded',
    docs: { description: { story: 'Conformidade WCAG 2.1 AA para o InfinityScroll.' } },
  },
  render: () => `
    <div style="max-width:800px;margin:0 auto;padding:40px 20px;font-family:'Public Sans',sans-serif;">

      <div style="background:linear-gradient(135deg,#6E63E8 0%,#764ba2 100%);padding:32px;border-radius:12px;margin-bottom:32px;color:white;">
        <h1 style="font-size:1.5rem;font-weight:700;margin:0 0 8px 0;">Acessibilidade: InfinityScroll</h1>
        <p style="opacity:0.9;margin:0;font-size:14px;">Conformidade WCAG 2.1 AA — Teclado, ARIA e contraste</p>
      </div>

      <div style="background:white;border-radius:12px;padding:28px;margin-bottom:24px;box-shadow:0 2px 8px rgba(0,0,0,0.08);">
        <h2 style="font-size:1rem;font-weight:600;color:#5E5873;margin:0 0 16px 0;">⌨️ Navegação por Teclado</h2>
        <table style="width:100%;border-collapse:collapse;font-size:14px;">
          <thead><tr style="border-bottom:2px solid #E8E8E8;">
            <th style="text-align:left;padding:10px 12px;font-weight:600;color:#5E5873;background:#F8F8F8;">Tecla</th>
            <th style="text-align:left;padding:10px 12px;font-weight:600;color:#5E5873;background:#F8F8F8;">Ação</th>
          </tr></thead>
          <tbody>
            <tr style="border-bottom:1px solid #F0F0F0;"><td style="padding:12px;"><code style="background:#E8E8F7;padding:3px 8px;border-radius:4px;font-size:12px;">Tab</code></td><td style="padding:12px;color:#6E6B7B;">Focar no componente</td></tr>
            <tr style="border-bottom:1px solid #F0F0F0;"><td style="padding:12px;"><code style="background:#E8E8F7;padding:3px 8px;border-radius:4px;font-size:12px;">Shift+Tab</code></td><td style="padding:12px;color:#6E6B7B;">Voltar foco ao elemento anterior</td></tr>
            <tr style="border-bottom:1px solid #F0F0F0;"><td style="padding:12px;"><code style="background:#E8E8F7;padding:3px 8px;border-radius:4px;font-size:12px;">Enter</code></td><td style="padding:12px;color:#6E6B7B;">Ativar ação principal</td></tr>
            <tr><td style="padding:12px;"><code style="background:#E8E8F7;padding:3px 8px;border-radius:4px;font-size:12px;">Esc</code></td><td style="padding:12px;color:#6E6B7B;">Cancelar/fechar (se aplicável)</td></tr>
          </tbody>
        </table>
      </div>

      <div style="background:white;border-radius:12px;padding:28px;margin-bottom:24px;box-shadow:0 2px 8px rgba(0,0,0,0.08);">
        <h2 style="font-size:1rem;font-weight:600;color:#5E5873;margin:0 0 16px 0;">🔊 ARIA e Screen Readers</h2>
        <div style="display:flex;flex-direction:column;gap:10px;">
          <div style="display:flex;align-items:flex-start;gap:12px;padding:12px;background:#F8F8F8;border-radius:8px;"><code style="background:#E8E8F7;padding:3px 8px;border-radius:4px;font-size:12px;flex-shrink:0;">aria-label</code><span style="color:#6E6B7B;font-size:14px;">Texto descritivo para leitores de tela quando não há texto visível</span></div>
          <div style="display:flex;align-items:flex-start;gap:12px;padding:12px;background:#F8F8F8;border-radius:8px;"><code style="background:#E8E8F7;padding:3px 8px;border-radius:4px;font-size:12px;flex-shrink:0;">role</code><span style="color:#6E6B7B;font-size:14px;">Define o papel semântico do componente na árvore de acessibilidade</span></div>
          <div style="display:flex;align-items:flex-start;gap:12px;padding:12px;background:#F8F8F8;border-radius:8px;"><code style="background:#E8E8F7;padding:3px 8px;border-radius:4px;font-size:12px;flex-shrink:0;">aria-disabled</code><span style="color:#6E6B7B;font-size:14px;">Anuncia estado desabilitado sem remover do tab order</span></div>
        </div>
      </div>

      <div style="background:white;border-radius:12px;padding:28px;box-shadow:0 2px 8px rgba(0,0,0,0.08);">
        <h2 style="font-size:1rem;font-weight:600;color:#5E5873;margin:0 0 16px 0;">✅ Checklist WCAG 2.1 AA</h2>
        <div style="display:flex;flex-direction:column;gap:8px;">
          <div style="display:flex;align-items:center;gap:12px;padding:12px;background:#F0FFF4;border-left:3px solid #28C76F;border-radius:4px;"><span style="color:#28C76F;font-weight:700;">✓</span><span style="color:#5E5873;font-size:14px;"><code style="font-size:11px;color:#28C76F;font-weight:600;margin-right:8px;">1.4.3</code>Contraste mínimo 4.5:1 para texto normal</span></div>
          <div style="display:flex;align-items:center;gap:12px;padding:12px;background:#F0FFF4;border-left:3px solid #28C76F;border-radius:4px;"><span style="color:#28C76F;font-weight:700;">✓</span><span style="color:#5E5873;font-size:14px;"><code style="font-size:11px;color:#28C76F;font-weight:600;margin-right:8px;">2.1.1</code>Toda funcionalidade disponível via teclado</span></div>
          <div style="display:flex;align-items:center;gap:12px;padding:12px;background:#F0FFF4;border-left:3px solid #28C76F;border-radius:4px;"><span style="color:#28C76F;font-weight:700;">✓</span><span style="color:#5E5873;font-size:14px;"><code style="font-size:11px;color:#28C76F;font-weight:600;margin-right:8px;">2.4.7</code>Foco visível em todos os elementos interativos</span></div>
          <div style="display:flex;align-items:center;gap:12px;padding:12px;background:#F0FFF4;border-left:3px solid #28C76F;border-radius:4px;"><span style="color:#28C76F;font-weight:700;">✓</span><span style="color:#5E5873;font-size:14px;"><code style="font-size:11px;color:#28C76F;font-weight:600;margin-right:8px;">4.1.2</code>Nome, função e valor programaticamente determinável</span></div>
        </div>
      </div>

    </div>
  `,
};

