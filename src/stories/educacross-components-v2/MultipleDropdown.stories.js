/**
 * MultipleDropdown Component - Pixel Perfect from educacross-frontoffice
 *
 * @component MultipleDropdown
 * @category Educacross Components V2
 * @status PIXEL-PERFECT
 * @source educacross-frontoffice/src/components/selects/MultipleDropdown.vue
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
