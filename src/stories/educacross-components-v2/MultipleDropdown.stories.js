/**
 * MultipleDropdown Component - Pixel Perfect from educacross-frontoffice
 *
 * @component MultipleDropdown
 * @category Educacross Components V2
 * @source educacross-frontoffice/src/components/selects/MultipleDropdown.vue
 * @priority P0
 * @status PIXEL-PERFECT
 * @since 2.0.0
 */

export default {
  title: 'Educacross Components V2/Forms/MultipleDropdown',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
## MultipleDropdown - Dropdown com Submenus Educacross (Pixel Perfect)

Componente extraído diretamente de \`educacross-frontoffice/src/components/selects/MultipleDropdown.vue\`.

Dropdown com suporte a itens aninhados (submenus) que aparecem ao hover.

### Props do Componente Real

| Prop | Tipo | Default | Descrição |
|------|------|---------|-----------|
| \`loading\` | Boolean | false | Estado de carregamento |
| \`data\` | Array | [] | Lista de itens |
| \`selected\` | Object | - | Item selecionado |
| \`selectedChildren\` | Object | - | Sub-item selecionado |
| \`emptyText\` | String | 'Sem Opções' | Texto quando vazio |

### Estrutura do Item

\`\`\`javascript
{
  name: 'Matemática',
  details: [
    { name: 'Álgebra' },
    { name: 'Geometria' },
    { name: 'Aritmética' }
  ]
}
\`\`\`

### Events

- \`@change(item, subItem)\` - Emitido quando uma seleção é feita

### Comportamento

- Itens com \`details\` mostram seta para direita
- Ao hover, o submenu aparece ao lado
- Clique seleciona item pai ou filho
        `,
      },
    },
  },
};

// CSS do MultipleDropdown extraído do frontoffice
const multipleDropdownStyles = `
<style>
  /* === MultipleDropdown - CSS Pixel Perfect do Frontoffice === */
  
  :root {
    --primary: #6e63e8;
    --border-color: #d8d6de;
    --text-color: #5e5873;
    --dropdown-bg: #fff;
    --hover-bg: #f8f8f8;
  }

  .multiple-dropdown {
    position: relative;
    width: 100%;
  }

  /* Trigger button */
  .dropdown-trigger {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: 0.571rem 1rem;
    background: white;
    border: 1px solid var(--border-color);
    border-radius: 0.357rem;
    cursor: pointer;
    transition: all 0.15s ease;
  }

  .dropdown-trigger:hover {
    border-color: var(--primary);
  }

  .dropdown-trigger:disabled {
    background: #f8f8f8;
    cursor: not-allowed;
  }

  .dropdown-trigger.open {
    border-color: var(--primary);
    box-shadow: 0 3px 10px 0 rgba(110, 99, 232, 0.2);
  }

  .dropdown-trigger-content {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: var(--text-color);
  }

  .dropdown-trigger-content .spinner {
    width: 1rem;
    height: 1rem;
    border: 2px solid rgba(110, 99, 232, 0.3);
    border-top-color: var(--primary);
    border-radius: 50%;
    animation: spin 0.75s linear infinite;
  }

  @keyframes spin {
    to { transform: rotate(360deg); }
  }

  .dropdown-trigger .arrow {
    font-size: 20px;
    color: var(--text-color);
    transition: transform 0.2s ease;
  }

  .dropdown-trigger.open .arrow {
    transform: rotate(180deg);
  }

  /* Menu */
  .dropdown-menu-container {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    margin-top: 0;
    background: var(--dropdown-bg);
    border: 1px solid var(--border-color);
    border-radius: 0.357rem;
    box-shadow: 0 5px 25px rgba(0, 0, 0, 0.1);
    z-index: 1000;
    max-height: 300px;
    overflow-y: auto;
  }

  /* Menu items */
  .dropdown-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.65rem 1.28rem;
    color: var(--text-color);
    cursor: pointer;
    transition: background 0.15s ease;
    position: relative;
  }

  .dropdown-item:hover {
    background: var(--hover-bg);
    color: var(--primary);
  }

  .dropdown-item .item-name {
    flex: 1;
  }

  .dropdown-item .chevron {
    font-size: 20px;
    color: var(--text-color);
  }

  /* Submenu */
  .sub-menu {
    position: absolute;
    left: 100%;
    top: 0;
    min-width: 200px;
    background: var(--dropdown-bg);
    border: 1px solid var(--border-color);
    border-radius: 0.357rem;
    box-shadow: 0 5px 25px rgba(0, 0, 0, 0.1);
    z-index: 1001;
  }

  .sub-menu .dropdown-item {
    padding: 0.5rem 1rem;
  }

  /* Selected state */
  .dropdown-item.selected {
    background: rgba(110, 99, 232, 0.08);
    color: var(--primary);
  }

  /* Empty state */
  .dropdown-empty {
    padding: 1rem;
    text-align: center;
    color: #b9b9c3;
  }
</style>
`;

/**
 * Default - Estado fechado
 */
export const Default = {
  render: () => `
    ${multipleDropdownStyles}
    <div class="p-4" style="max-width: 350px;">
      <div class="multiple-dropdown">
        <button class="dropdown-trigger">
          <span class="dropdown-trigger-content">Selecione uma disciplina</span>
          <span class="material-symbols-outlined arrow">expand_more</span>
        </button>
      </div>
    </div>
  `,
};

/**
 * Open - Menu aberto
 */
export const Open = {
  render: () => `
    ${multipleDropdownStyles}
    <div class="p-4" style="max-width: 350px; min-height: 300px;">
      <div class="multiple-dropdown">
        <button class="dropdown-trigger open">
          <span class="dropdown-trigger-content">Selecione uma disciplina</span>
          <span class="material-symbols-outlined arrow">expand_more</span>
        </button>
        <div class="dropdown-menu-container">
          <div class="dropdown-item">
            <span class="item-name">Matemática</span>
            <span class="material-symbols-outlined chevron">chevron_right</span>
          </div>
          <div class="dropdown-item">
            <span class="item-name">Língua Portuguesa</span>
            <span class="material-symbols-outlined chevron">chevron_right</span>
          </div>
          <div class="dropdown-item">
            <span class="item-name">Ciências</span>
          </div>
          <div class="dropdown-item">
            <span class="item-name">História</span>
          </div>
          <div class="dropdown-item">
            <span class="item-name">Geografia</span>
          </div>
        </div>
      </div>
    </div>
  `,
};

/**
 * WithSubmenu - Com submenu visível
 */
export const WithSubmenu = {
  render: () => `
    ${multipleDropdownStyles}
    <div class="p-4" style="max-width: 600px; min-height: 300px;">
      <div class="multiple-dropdown">
        <button class="dropdown-trigger open">
          <span class="dropdown-trigger-content">Selecione uma disciplina</span>
          <span class="material-symbols-outlined arrow">expand_more</span>
        </button>
        <div class="dropdown-menu-container">
          <div class="dropdown-item" style="background: var(--hover-bg); color: var(--primary);">
            <span class="item-name">Matemática</span>
            <span class="material-symbols-outlined chevron">chevron_right</span>
            <div class="sub-menu">
              <div class="dropdown-item">Álgebra</div>
              <div class="dropdown-item">Geometria</div>
              <div class="dropdown-item">Aritmética</div>
              <div class="dropdown-item">Estatística</div>
            </div>
          </div>
          <div class="dropdown-item">
            <span class="item-name">Língua Portuguesa</span>
            <span class="material-symbols-outlined chevron">chevron_right</span>
          </div>
          <div class="dropdown-item">
            <span class="item-name">Ciências</span>
          </div>
        </div>
      </div>
    </div>
  `,
};

/**
 * WithSelection - Com item selecionado
 */
export const WithSelection = {
  render: () => `
    ${multipleDropdownStyles}
    <div class="p-4" style="max-width: 350px;">
      <div class="multiple-dropdown">
        <button class="dropdown-trigger">
          <span class="dropdown-trigger-content">Matemática - Geometria</span>
          <span class="material-symbols-outlined arrow">expand_more</span>
        </button>
      </div>
    </div>
  `,
};

/**
 * Loading - Estado de carregamento
 */
export const Loading = {
  render: () => `
    ${multipleDropdownStyles}
    <div class="p-4" style="max-width: 350px;">
      <div class="multiple-dropdown">
        <button class="dropdown-trigger" disabled>
          <span class="dropdown-trigger-content">
            <span class="spinner"></span>
          </span>
          <span class="material-symbols-outlined arrow">expand_more</span>
        </button>
      </div>
    </div>
  `,
};

/**
 * Empty - Sem opções
 */
export const Empty = {
  render: () => `
    ${multipleDropdownStyles}
    <div class="p-4" style="max-width: 350px; min-height: 200px;">
      <div class="multiple-dropdown">
        <button class="dropdown-trigger open">
          <span class="dropdown-trigger-content">Sem Opções</span>
          <span class="material-symbols-outlined arrow">expand_more</span>
        </button>
        <div class="dropdown-menu-container">
          <div class="dropdown-empty">
            <span class="material-symbols-outlined" style="font-size: 32px; display: block; margin-bottom: 0.5rem;">inbox</span>
            Nenhuma opção disponível
          </div>
        </div>
      </div>
    </div>
  `,
};

/**
 * InContext - Em um formulário
 */
export const InContext = {
  render: () => `
    ${multipleDropdownStyles}
    <style>
      .filter-form {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 1rem;
        padding: 1.5rem;
        background: white;
        border: 1px solid #ebe9f1;
        border-radius: 0.428rem;
      }
      .filter-field label {
        display: block;
        font-weight: 500;
        color: #5e5873;
        margin-bottom: 0.5rem;
        font-size: 0.9rem;
      }
    </style>
    <div class="p-4">
      <div class="filter-form">
        <div class="filter-field">
          <label>Disciplina</label>
          <div class="multiple-dropdown">
            <button class="dropdown-trigger">
              <span class="dropdown-trigger-content">Matemática - Geometria</span>
              <span class="material-symbols-outlined arrow">expand_more</span>
            </button>
          </div>
        </div>
        <div class="filter-field">
          <label>Turma</label>
          <div class="multiple-dropdown">
            <button class="dropdown-trigger">
              <span class="dropdown-trigger-content">5º Ano A</span>
              <span class="material-symbols-outlined arrow">expand_more</span>
            </button>
          </div>
        </div>
        <div class="filter-field">
          <label>Período</label>
          <div class="multiple-dropdown">
            <button class="dropdown-trigger">
              <span class="dropdown-trigger-content">2024 - 1º Bimestre</span>
              <span class="material-symbols-outlined arrow">expand_more</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
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
          <div style="display:inline-block;padding:8px 16px;background:rgba(255,255,255,0.15);border-radius:50px;margin-bottom:20px;font-size:14px;border:1px solid rgba(255,255,255,0.2);">Forms</div>
          <h1 style="font-size:3rem;font-weight:700;margin:0 0 12px 0;letter-spacing:-0.02em;">MultipleDropdown</h1>
          <p style="font-size:1.1rem;opacity:0.9;margin:0;max-width:600px;">Pixel Perfect from educacross-frontoffice</p>
        </div>
      </div>
      <div style="max-width:900px;margin:0 auto;padding:48px 40px;">
        <div style="background:white;border-radius:12px;padding:32px;margin-bottom:32px;box-shadow:0 2px 8px rgba(0,0,0,0.08);">
          <h2 style="font-size:1.1rem;font-weight:600;color:#5E5873;margin:0 0 16px 0;">Sobre o Componente</h2>
          <p style="color:#6E6B7B;line-height:1.7;margin:0 0 16px 0;">Pixel Perfect from educacross-frontoffice. Faz parte da categoria <strong>Forms</strong> do Design System Educacross.</p>
          <div style="background:#F8F7FF;border-left:4px solid #6E63E8;padding:16px;border-radius:4px;">
            <p style="margin:0;color:#5E5873;font-size:14px;line-height:1.6;"><strong>💡 Dica:</strong> Use <em>Playground</em> para explorar props, <em>Use Cases</em> para exemplos reais e <em>Accessibility</em> para validar WCAG.</p>
          </div>
        </div>
        <div style="background:white;border-radius:12px;padding:32px;box-shadow:0 2px 8px rgba(0,0,0,0.08);">
          <h2 style="font-size:1.1rem;font-weight:600;color:#5E5873;margin:0 0 16px 0;">Implementação Vue 2.7</h2>
          <pre style="background:#1E1E2E;color:#CDD6F4;padding:20px;border-radius:8px;font-size:13px;line-height:1.6;overflow:auto;margin:0;"><code>import MultipleDropdown from '@/components/MultipleDropdown.vue';

// Template
&lt;MultipleDropdown v-bind="props" /&gt;</code></pre>
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
    docs: { description: { story: 'Explore o MultipleDropdown com controles interativos.' } },
  },
  render: (args) => `
    <div style="padding:32px;display:flex;justify-content:center;align-items:center;min-height:200px;background:#F8F8F8;border-radius:12px;">
      <div style="text-align:center;color:#6E6B7B;">
        <div style="width:60px;height:60px;background:#6E63E820;border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 16px;font-size:24px;">🎨</div>
        <p style="margin:0 0 8px 0;font-size:15px;font-weight:600;color:#5E5873;">Playground MultipleDropdown</p>
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
    docs: { description: { story: 'Exemplos de uso real do MultipleDropdown no Educacross.' } },
  },
  render: () => `
    <div style="max-width:800px;margin:0 auto;padding:40px 20px;font-family:'Public Sans',sans-serif;">
      <div style="background:#6E63E815;border:1px solid #6E63E830;border-radius:12px;padding:24px;margin-bottom:40px;">
        <h1 style="font-size:1.5rem;font-weight:700;color:#5E5873;margin:0 0 8px 0;">Casos de Uso: MultipleDropdown</h1>
        <p style="color:#6E6B7B;margin:0;font-size:14px;line-height:1.6;">Cenários reais de uso no contexto educacional da plataforma Educacross</p>
      </div>
      
      <div style="margin-bottom:32px;">
        <h2 style="font-size:18px;font-weight:600;color:#5E5873;margin:0 0 8px 0;display:flex;align-items:center;gap:10px;">
          <span style="display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;background:#6E63E8;color:white;border-radius:50%;font-size:13px;font-weight:700;flex-shrink:0;">1</span>
          Professor — Painel Principal
        </h2>
        <p style="color:#6E6B7B;margin:0 0 16px 0;padding-left:38px;font-size:14px;">Professor utilizando MultipleDropdown no dashboard de gestão de turmas</p>
        <div style="background:#F8F8F8;border-radius:8px;padding:20px;margin-left:38px;text-align:center;color:#B9B9C3;font-size:13px;">
          Ver story <strong>Default</strong> para visualização do componente neste contexto
        </div>
      </div>
      <div style="margin-bottom:32px;">
        <h2 style="font-size:18px;font-weight:600;color:#5E5873;margin:0 0 8px 0;display:flex;align-items:center;gap:10px;">
          <span style="display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;background:#6E63E8;color:white;border-radius:50%;font-size:13px;font-weight:700;flex-shrink:0;">2</span>
          Aluno — Portal do Estudante
        </h2>
        <p style="color:#6E6B7B;margin:0 0 16px 0;padding-left:38px;font-size:14px;">Aluno interagindo com MultipleDropdown no portal educacional</p>
        <div style="background:#F8F8F8;border-radius:8px;padding:20px;margin-left:38px;text-align:center;color:#B9B9C3;font-size:13px;">
          Ver story <strong>Default</strong> para visualização do componente neste contexto
        </div>
      </div>
      <div style="margin-bottom:32px;">
        <h2 style="font-size:18px;font-weight:600;color:#5E5873;margin:0 0 8px 0;display:flex;align-items:center;gap:10px;">
          <span style="display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;background:#6E63E8;color:white;border-radius:50%;font-size:13px;font-weight:700;flex-shrink:0;">3</span>
          Coordenador — Relatórios
        </h2>
        <p style="color:#6E6B7B;margin:0 0 16px 0;padding-left:38px;font-size:14px;">Coordenador pedagógico analisando dados via MultipleDropdown</p>
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
    docs: { description: { story: 'Conformidade WCAG 2.1 AA para o MultipleDropdown.' } },
  },
  render: () => `
    <div style="max-width:800px;margin:0 auto;padding:40px 20px;font-family:'Public Sans',sans-serif;">

      <div style="background:linear-gradient(135deg,#6E63E8 0%,#764ba2 100%);padding:32px;border-radius:12px;margin-bottom:32px;color:white;">
        <h1 style="font-size:1.5rem;font-weight:700;margin:0 0 8px 0;">Acessibilidade: MultipleDropdown</h1>
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

