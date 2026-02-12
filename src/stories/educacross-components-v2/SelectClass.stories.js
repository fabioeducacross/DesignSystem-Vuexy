/**
 * SelectClass Component - Pixel Perfect from educacross-frontoffice
 *
 * @component SelectClass
 * @category Educacross Components V2
 * @source educacross-frontoffice/src/layouts/components/SelectClass.vue
 * @priority P0
 * @status PIXEL-PERFECT
 * @since 2.0.0
 */

export default {
  title: 'Educacross Components V2/Forms/SelectClass',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
## SelectClass - Seletor de Turmas Educacross (Pixel Perfect)

Componente extraído diretamente de \`educacross-frontoffice/src/layouts/components/SelectClass.vue\`.

Dropdown especializado para seleção de turmas/classes com estados complexos e ordenação inteligente.

### Props do Componente Real

| Prop | Tipo | Default | Descrição |
|------|------|---------|-----------|
| \`action\` | String | - | Ação para validação de permissão |
| \`resource\` | String | - | Recurso para validação de permissão |
| \`disabled\` | Boolean | false | Desabilita o componente |
| \`hidden\` | Boolean | false | Oculta o componente |
| \`sort\` | Boolean | false | Ordena turmas (habilitadas → sem alunos → desabilitadas) |

### Estrutura dos Dados

\`\`\`javascript
// Turma selecionada atual
classe: {
  Name: '1º Ano A - Manhã',
  SerieName: '1º Ano',
  ClassId: 123
}

// Lista de turmas disponíveis
classesList: [
  {
    Name: '1º Ano A - Manhã',
    SerieName: '1º Ano', 
    ClassId: 123,
    Students: true, // tem alunos
    Order: 1,
    disabledModule: { disabled: false, adminDisabled: false }
  }
]
\`\`\`

### Estados das Turmas

1. **Habilitadas** - Turmas com alunos e módulo ativo
2. **Sem Alunos** - Turmas criadas mas sem estudantes matriculados
3. **Módulo Desabilitado** - Turmas com módulo bloqueado pelo admin
4. **Módulo Indisponível** - Turmas com módulo não disponível para o ano

### Events

- \`@change(turma)\` - Emitido quando uma turma é selecionada
- Atualiza automaticamente as permissões do usuário

### Layout Responsivo

- Desktop: Mostra badge do ano da série
- Mobile: Badge do ano fica oculto (\`d-none d-md-block\`)

### Funcionalidades

- Ordenação inteligente quando \`sort=true\`
- Tooltips explicativos para turmas desabilitadas
- Scroll automático em listas longas
- Integração com sistema de permissões ACL
        `,
      },
    },
  },
  argTypes: {
    selectedClass: {
      control: 'text',
      description: 'Nome da turma selecionada'
    },
    selectedSerie: {
      control: 'text', 
      description: 'Série da turma selecionada'
    },
    disabled: {
      control: 'boolean',
      description: 'Desabilita o componente'
    },
    showTooltip: {
      control: 'boolean',
      description: 'Mostra tooltip de função desabilitada'
    },
    sort: {
      control: 'boolean',
      description: 'Ordena turmas por status'
    }
  },
};

// CSS do SelectClass extraído do frontoffice
const selectClassStyles = `
<style>
  /* === SelectClass - CSS Pixel Perfect do Frontoffice === */
  
  @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200');

  :root {
    --primary: #7367f0;
    --text-primary: #7367f0;
    --text-muted: #82868b;
    --border-color: #b9b9c3;
    --badge-light-primary-bg: rgba(115, 103, 240, 0.12);
    --badge-light-primary-color: #7367f0;
    --badge-light-secondary-bg: rgba(130, 134, 139, 0.12);
    --badge-light-secondary-color: #82868b;
    --dropdown-bg: #fff;
    --font-14: 0.875rem;
    --font-sm: 0.8125rem;
  }

  /* Container principal */
  .select-class-container {
    position: relative;
    width: 100%;
  }

  /* Customização do trigger do dropdown */
  .select-container {
    background: #fff;
    padding: 10px 20px;
    border: 1px solid var(--border-color);
    border-radius: 100px;
    cursor: pointer;
    transition: all 0.15s ease;
  }

  .select-container:hover {
    border-color: var(--primary);
  }

  /* Estilos de texto e badges */
  .text-primary {
    color: var(--text-primary) !important;
  }

  .text-muted {
    color: var(--text-muted) !important;
  }

  .font-14 {
    font-size: var(--font-14) !important;
  }

  .text-sm {
    font-size: var(--font-sm) !important;
  }

  /* Badges */
  .badge {
    display: inline-block;
    padding: 0.25rem 0.5rem;
    font-size: 0.75rem;
    font-weight: 500;
    line-height: 1;
    text-align: center;
    border-radius: 50rem;
    transition: all 0.15s ease;
  }

  .badge-pill {
    border-radius: 50rem;
  }

  .badge-light-primary {
    background-color: var(--badge-light-primary-bg);
    color: var(--badge-light-primary-color);
  }

  .badge-light-secondary {
    background-color: var(--badge-light-secondary-bg);
    color: var(--badge-light-secondary-color);
  }

  .badge-disabled {
    opacity: 0.65;
  }

  /* Material Icons */
  .material-symbols-outlined {
    font-family: 'Material Symbols Outlined';
    font-weight: normal;
    font-style: normal;
    font-size: 19px;
    line-height: 1;
    letter-spacing: normal;
    text-transform: none;
    display: inline-block;
    white-space: nowrap;
    word-wrap: normal;
    direction: ltr;
    -webkit-font-smoothing: antialiased;
    text-rendering: optimizeLegibility;
    -moz-osx-font-smoothing: grayscale;
    font-feature-settings: 'liga';
  }

  /* Dropdown customizado */
  .dropdown {
    position: relative;
    display: inline-block;
  }

  .dropdown-toggle {
    background: transparent;
    border: none;
    padding: 0;
    cursor: pointer;
    color: inherit;
    text-decoration: none;
  }

  .dropdown-toggle:focus {
    outline: none;
    box-shadow: none;
  }

  .dropdown-toggle::after {
    display: none; /* Remove o caret padrão do Bootstrap */
  }

  .dropdown-menu {
    position: absolute;
    top: 100%;
    left: 0;
    z-index: 1000;
    display: none;
    float: left;
    min-width: 300px;
    padding: 0.5rem 0;
    margin: 2px 0 0;
    font-size: 0.875rem;
    color: #6e6b7b;
    text-align: left;
    list-style: none;
    background-color: var(--dropdown-bg);
    background-clip: padding-box;
    border: 1px solid rgba(0, 0, 0, 0.15);
    border-radius: 0.25rem;
    box-shadow: 0 8px 25px rgba(34, 41, 47, 0.15);
    max-height: calc(80vh - 150px);
    overflow-y: auto;
  }

  /* Quando dropdown está aberto */
  .dropdown.show .dropdown-menu {
    display: block;
  }

  .dropdown-item {
    display: block;
    width: 100%;
    padding: 0.65rem 1.28rem;
    clear: both;
    font-weight: 400;
    color: #6e6b7b;
    text-align: inherit;
    text-decoration: none;
    white-space: nowrap;
    background-color: transparent;
    border: 0;
    cursor: pointer;
    transition: all 0.15s ease;
  }

  .dropdown-item:hover,
  .dropdown-item:focus {
    color: var(--primary);
    text-decoration: none;
    background-color: rgba(115, 103, 240, 0.04);
  }

  .dropdown-item.disabled,
  .dropdown-item:disabled {
    color: #b9b9c3;
    pointer-events: none;
    background-color: transparent;
  }

  /* Classes utilitárias */
  .d-flex {
    display: flex !important;
  }

  .d-none {
    display: none !important;
  }

  .align-items-center {
    align-items: center !important;
  }

  .align-items-start {
    align-items: flex-start !important;
  }

  .justify-content-between {
    justify-content: space-between !important;
  }

  .flex-column {
    flex-direction: column !important;
  }

  .flex-nowrap {
    flex-wrap: nowrap !important;
  }

  .text-left {
    text-align: left !important;
  }

  .gap-2 {
    gap: 0.5rem !important;
  }

  .ml-1 {
    margin-left: 0.25rem !important;
  }

  .mr-1 {
    margin-right: 0.25rem !important;
  }

  .font-weight-normal {
    font-weight: 400 !important;
  }

  .italic {
    font-style: italic !important;
  }

  /* Responsividade */
  @media (min-width: 768px) {
    .d-md-block {
      display: block !important;
    }
    
    .dropdown-menu {
      max-height: calc(80vh - 110px);
    }
  }

  /* Estados especiais */
  .disabled-state .select-container {
    background-color: #f8f8f8;
    color: #b9b9c3;
    cursor: not-allowed;
  }

  .disabled-state .dropdown-toggle {
    pointer-events: none;
  }

  /* Tooltip customizado */
  .tooltip {
    position: absolute;
    z-index: 1070;
    display: block;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
    font-style: normal;
    font-weight: 400;
    line-height: 1.5;
    text-decoration: none;
    text-shadow: none;
    text-transform: none;
    letter-spacing: normal;
    word-break: normal;
    word-spacing: normal;
    white-space: normal;
    line-break: auto;
    font-size: 0.875rem;
    word-wrap: break-word;
    opacity: 0;
  }

  .tooltip.show {
    opacity: 0.9;
  }

  .tooltip-inner {
    max-width: 200px;
    padding: 0.25rem 0.5rem;
    color: #fff;
    text-align: center;
    background-color: #000;
    border-radius: 0.25rem;
  }
</style>
`;

/**
 * Estado padrão - Turner selecionada
 */
export const Default = {
  args: {
    selectedClass: '1º Ano A - Manhã',
    selectedSerie: '1º Ano',
    disabled: false,
    showTooltip: false,
    sort: false
  },
  render: (args) => `
    ${selectClassStyles}
    <div class="p-4" style="min-height: 300px;">
      <div class="select-class-container">
        <div class="dropdown">
          <button class="dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
            <div class="d-flex align-items-center gap-2 select-container">
              <span class="text-primary font-14">${args.selectedClass}</span>
              <span class="badge badge-light-primary badge-pill d-none d-md-block">
                <span class="font-14">${args.selectedSerie}</span>
              </span>
              <span class="material-symbols-outlined text-primary ml-1" style="font-size: 19px;">
                keyboard_arrow_down
              </span>
            </div>
          </button>
          <ul class="dropdown-menu">
            <li><a class="dropdown-item" href="#">
              <div class="d-flex align-items-center gap-2 flex-nowrap justify-content-between">
                <div class="d-flex align-items-start flex-column text-left">
                  <span>1º Ano A - Manhã</span>
                </div>
                <div>
                  <span class="badge badge-light-primary badge-pill">1º Ano</span>
                </div>
              </div>
            </a></li>
            <li><a class="dropdown-item" href="#">
              <div class="d-flex align-items-center gap-2 flex-nowrap justify-content-between">
                <div class="d-flex align-items-start flex-column text-left">
                  <span>1º Ano B - Manhã</span>
                </div>
                <div>
                  <span class="badge badge-light-primary badge-pill">1º Ano</span>
                </div>
              </div>
            </a></li>
            <li><a class="dropdown-item" href="#">
              <div class="d-flex align-items-center gap-2 flex-nowrap justify-content-between">
                <div class="d-flex align-items-start flex-column text-left">
                  <span>2º Ano A - Tarde</span>
                </div>
                <div>
                  <span class="badge badge-light-primary badge-pill">2º Ano</span>
                </div>
              </div>
            </a></li>
            <li><a class="dropdown-item" href="#">
              <div class="d-flex align-items-center gap-2 flex-nowrap justify-content-between">
                <div class="d-flex align-items-start flex-column text-left">
                  <span>3º Ano B - Manhã</span>
                </div>
                <div>
                  <span class="badge badge-light-primary badge-pill">3º Ano</span>
                </div>
              </div>
            </a></li>
          </ul>
        </div>
      </div>

      <div class="mt-4">
        <strong>Contexto:</strong> Seleção de turma no cabeçalho da aplicação. Professor escolhendo contexto de trabalho.
      </div>
    </div>
  `,
};

/**
 * Com turmas desabilitadas e sem alunos
 */
export const EstadosComplexos = {
  render: () => `
    ${selectClassStyles}
    <div class="p-4" style="min-height: 400px;">
      <div class="select-class-container">
        <div class="dropdown show">
          <button class="dropdown-toggle" type="button">
            <div class="d-flex align-items-center gap-2 select-container">
              <span class="text-primary font-14">1º Ano A - Manhã</span>
              <span class="badge badge-light-primary badge-pill d-none d-md-block">
                <span class="font-14">1º Ano</span>
              </span>
              <span class="material-symbols-outlined text-primary ml-1" style="font-size: 19px;">
                keyboard_arrow_down
              </span>
            </div>
          </button>
          <ul class="dropdown-menu">
            <!-- Turmas habilitadas -->
            <li><a class="dropdown-item" href="#">
              <div class="d-flex align-items-center gap-2 flex-nowrap justify-content-between">
                <div class="d-flex align-items-start flex-column text-left">
                  <span>1º Ano A - Manhã</span>
                </div>
                <div>
                  <span class="badge badge-light-primary badge-pill">1º Ano</span>
                </div>
              </div>
            </a></li>
            <li><a class="dropdown-item" href="#">
              <div class="d-flex align-items-center gap-2 flex-nowrap justify-content-between">
                <div class="d-flex align-items-start flex-column text-left">
                  <span>2º Ano B - Tarde</span>
                </div>
                <div>
                  <span class="badge badge-light-primary badge-pill">2º Ano</span>
                </div>
              </div>
            </a></li>
            
            <!-- Turmas sem alunos -->
            <li><a class="dropdown-item disabled" href="#" tabindex="-1" aria-disabled="true">
              <div class="d-flex align-items-center gap-2 flex-nowrap justify-content-between">
                <div class="d-flex align-items-start flex-column text-left">
                  <span>1º Ano C - Manhã</span>
                  <span class="text-muted text-sm">Turma sem alunos</span>
                </div>
                <div>
                  <span class="badge badge-light-secondary badge-pill badge-disabled">1º Ano</span>
                </div>
              </div>
            </a></li>
            
            <!-- Módulo indisponível -->
            <li><a class="dropdown-item disabled" href="#" tabindex="-1" aria-disabled="true">
              <div class="d-flex align-items-center gap-2 flex-nowrap justify-content-between">
                <div class="d-flex align-items-start flex-column text-left">
                  <span>G2 TES - Manhã</span>
                </div>
                <div>
                  <span class="badge badge-light-secondary badge-pill mr-1 font-weight-normal italic">
                    módulo indisponível
                  </span>
                  <span class="badge badge-light-secondary badge-pill">G2</span>
                </div>
              </div>
            </a></li>
            
            <!-- Módulo desabilitado pelo admin -->
            <li><a class="dropdown-item disabled" href="#" tabindex="-1" aria-disabled="true">
              <div class="d-flex align-items-center gap-2 flex-nowrap justify-content-between">
                <div class="d-flex align-items-start flex-column text-left">
                  <span>5º Ano X - Noite</span>
                  <span class="text-muted text-sm">Turma sem alunos</span>
                </div>
                <div>
                  <span class="badge badge-light-secondary badge-pill mr-1 font-weight-normal italic">
                    módulo desabilitado pelo administrador
                  </span>
                  <span class="badge badge-light-secondary badge-pill badge-disabled">5º Ano</span>
                </div>
              </div>
            </a></li>
          </ul>
        </div>
      </div>

      <div class="mt-4">
        <strong>Contexto:</strong> Lista completa com todos os estados possíveis das turmas. Administrador visualizando todas as turmas da escola.
      </div>
    </div>
  `,
};

/**
 * Estado desabilitado com tooltip
 */
export const Desabilitado = {
  args: {
    selectedClass: '1º Ano A - Manhã',
    selectedSerie: '1º Ano',
    disabled: true,
    showTooltip: true
  },
  render: (args) => `
    ${selectClassStyles}
    <div class="p-4">
      <div class="select-class-container disabled-state">
        <div class="dropdown">
          <button class="dropdown-toggle" type="button" disabled>
            <div class="d-flex align-items-center gap-2 select-container">
              <span class="text-primary font-14">${args.selectedClass}</span>
              <span class="badge badge-light-primary badge-pill d-none d-md-block">
                <span class="font-14">${args.selectedSerie}</span>
              </span>
              <span class="material-symbols-outlined text-primary ml-1" style="font-size: 19px;">
                keyboard_arrow_down
              </span>
            </div>
          </button>
        </div>
        ${args.showTooltip ? `
        <div class="tooltip show" style="position: absolute; top: 100%; left: 50%; transform: translateX(-50%); margin-top: 8px;">
          <div class="tooltip-inner">Função desabilitada</div>
        </div>
        ` : ''}
      </div>

      <div class="mt-4">
        <strong>Contexto:</strong> Componente desabilitado por falta de permissão. Usuário sem acesso a essa funcionalidade.
      </div>
    </div>
  `,
};

/**
 * Lista completa realística (como o HTML original)
 */
export const ListaCompleta = {
  render: () => `
    ${selectClassStyles}
    <div class="p-4" style="min-height: 500px;">
      <div class="row flex-column-reverse flex-md-row justify-content-between mb-1 no-gutters">
        <div class="d-flex justify-content-center justify-content-md-start col-auto">
          <div class="position-relative">
            <div class="dropdown show">
              <button class="dropdown-toggle" type="button">
                <div class="d-flex align-items-center gap-2 select-container">
                  <span class="text-primary font-14">1º Ano A - Manhã</span>
                  <span class="badge badge-light-primary badge-pill d-none d-md-block">
                    <span class="font-14">1º Ano</span>
                  </span>
                  <span class="material-symbols-outlined text-primary ml-1" style="font-size: 19px;">
                    keyboard_arrow_down
                  </span>
                </div>
              </button>
              <ul class="dropdown-menu" style="max-height: 300px; overflow-y: auto;">
                <!-- Turmas ativas -->
                <li><a class="dropdown-item" href="#">
                  <div class="d-flex align-items-center gap-2 flex-nowrap justify-content-between">
                    <div class="d-flex align-items-start flex-column text-left">
                      <span>1º Ano A - Manhã</span>
                    </div>
                    <div>
                      <span class="badge badge-light-primary badge-pill">1º Ano</span>
                    </div>
                  </div>
                </a></li>
                <li><a class="dropdown-item" href="#">
                  <div class="d-flex align-items-center gap-2 flex-nowrap justify-content-between">
                    <div class="d-flex align-items-start flex-column text-left">
                      <span>1º Ano B - Manhã</span>
                    </div>
                    <div>
                      <span class="badge badge-light-primary badge-pill">1º Ano</span>
                    </div>
                  </div>
                </a></li>
                <li><a class="dropdown-item" href="#">
                  <div class="d-flex align-items-center gap-2 flex-nowrap justify-content-between">
                    <div class="d-flex align-items-start flex-column text-left">
                      <span>2º Ano B - Manhã</span>
                    </div>
                    <div>
                      <span class="badge badge-light-primary badge-pill">2º Ano</span>
                    </div>
                  </div>
                </a></li>
                <li><a class="dropdown-item" href="#">
                  <div class="d-flex align-items-center gap-2 flex-nowrap justify-content-between">
                    <div class="d-flex align-items-start flex-column text-left">
                      <span>3º Ano RL3 - Manhã</span>
                    </div>
                    <div>
                      <span class="badge badge-light-primary badge-pill">3º Ano</span>
                    </div>
                  </div>
                </a></li>
                <li><a class="dropdown-item" href="#">
                  <div class="d-flex align-items-center gap-2 flex-nowrap justify-content-between">
                    <div class="d-flex align-items-start flex-column text-left">
                      <span>4º Ano A - Manhã</span>
                    </div>
                    <div>
                      <span class="badge badge-light-primary badge-pill">4º Ano</span>
                    </div>
                  </div>
                </a></li>
                <li><a class="dropdown-item" href="#">
                  <div class="d-flex align-items-center gap-2 flex-nowrap justify-content-between">
                    <div class="d-flex align-items-start flex-column text-left">
                      <span>5º Ano A - Tarde</span>
                    </div>
                    <div>
                      <span class="badge badge-light-primary badge-pill">5º Ano</span>
                    </div>
                  </div>
                </a></li>
                <li><a class="dropdown-item" href="#">
                  <div class="d-flex align-items-center gap-2 flex-nowrap justify-content-between">
                    <div class="d-flex align-items-start flex-column text-left">
                      <span>6º Ano A - Manhã</span>
                    </div>
                    <div>
                      <span class="badge badge-light-primary badge-pill">6º Ano</span>
                    </div>
                  </div>
                </a></li>
                
                <!-- Turmas sem alunos -->
                <li><a class="dropdown-item disabled" href="#" tabindex="-1" aria-disabled="true">
                  <div class="d-flex align-items-center gap-2 flex-nowrap justify-content-between">
                    <div class="d-flex align-items-start flex-column text-left">
                      <span>1º Ano CY - Manhã</span>
                      <span class="text-muted text-sm">Turma sem alunos</span>
                    </div>
                    <div>
                      <span class="badge badge-light-secondary badge-pill badge-disabled">1º Ano</span>
                    </div>
                  </div>
                </a></li>
                <li><a class="dropdown-item disabled" href="#" tabindex="-1" aria-disabled="true">
                  <div class="d-flex align-items-center gap-2 flex-nowrap justify-content-between">
                    <div class="d-flex align-items-start flex-column text-left">
                      <span>2º Ano H5 - Manhã</span>
                      <span class="text-muted text-sm">Turma sem alunos</span>
                    </div>
                    <div>
                      <span class="badge badge-light-secondary badge-pill badge-disabled">2º Ano</span>
                    </div>
                  </div>
                </a></li>
                
                <!-- Módulos indisponíveis -->
                <li><a class="dropdown-item disabled" href="#" tabindex="-1" aria-disabled="true">
                  <div class="d-flex align-items-center gap-2 flex-nowrap justify-content-between">
                    <div class="d-flex align-items-start flex-column text-left">
                      <span>G2 TES - Manhã</span>
                    </div>
                    <div>
                      <span class="badge badge-light-secondary badge-pill mr-1 font-weight-normal italic">
                        módulo indisponível
                      </span>
                      <span class="badge badge-light-secondary badge-pill">G2</span>
                    </div>
                  </div>
                </a></li>
                <li><a class="dropdown-item disabled" href="#" tabindex="-1" aria-disabled="true">
                  <div class="d-flex align-items-center gap-2 flex-nowrap justify-content-between">
                    <div class="d-flex align-items-start flex-column text-left">
                      <span>G3 TES - Tarde</span>
                    </div>
                    <div>
                      <span class="badge badge-light-secondary badge-pill mr-1 font-weight-normal italic">
                        módulo indisponível
                      </span>
                      <span class="badge badge-light-secondary badge-pill">G3</span>
                    </div>
                  </div>
                </a></li>
              </ul>
            </div>
          </div>
        </div>
        <div class="d-flex align-items-center justify-content-center justify-content-md-end mb-50 mb-md-0 col-auto">
          <span class="material-symbols-outlined text-primary">school</span>
          <p class="text-primary font-bold mb-0">&nbsp;Colégio Nova Jornada</p>
        </div>
      </div>

      <div class="mt-4">
        <strong>Contexto:</strong> Layout completo como aparece na aplicação real. Cabeçalho com seletor de turma e nome da escola.
      </div>
    </div>
  `,
};

/**
 * Versão mobile (badge oculto)
 */
export const LayoutMobile = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
  render: () => `
    ${selectClassStyles}
    <style>
      /* Força layout mobile */
      .d-md-block { display: none !important; }
    </style>
    <div class="p-3" style="max-width: 350px;">
      <div class="select-class-container">
        <div class="dropdown show">
          <button class="dropdown-toggle" type="button">
            <div class="d-flex align-items-center gap-2 select-container">
              <span class="text-primary font-14">1º Ano A - Manhã</span>
              <!-- Badge oculto em mobile -->
              <span class="badge badge-light-primary badge-pill d-none d-md-block">
                <span class="font-14">1º Ano</span>
              </span>
              <span class="material-symbols-outlined text-primary ml-1" style="font-size: 19px;">
                keyboard_arrow_down
              </span>
            </div>
          </button>
          <ul class="dropdown-menu">
            <li><a class="dropdown-item" href="#">
              <div class="d-flex align-items-center gap-2 flex-nowrap justify-content-between">
                <div class="d-flex align-items-start flex-column text-left">
                  <span>1º Ano A - Manhã</span>
                </div>
                <div>
                  <span class="badge badge-light-primary badge-pill">1º Ano</span>
                </div>
              </div>
            </a></li>
            <li><a class="dropdown-item" href="#">
              <div class="d-flex align-items-center gap-2 flex-nowrap justify-content-between">
                <div class="d-flex align-items-start flex-column text-left">
                  <span>2º Ano B - Tarde</span>
                </div>
                <div>
                  <span class="badge badge-light-primary badge-pill">2º Ano</span>
                </div>
              </div>
            </a></li>
            <li><a class="dropdown-item disabled" href="#" tabindex="-1" aria-disabled="true">
              <div class="d-flex align-items-center gap-2 flex-nowrap justify-content-between">
                <div class="d-flex align-items-start flex-column text-left">
                  <span>3º Ano C - Manhã</span>
                  <span class="text-muted text-sm">Turma sem alunos</span>
                </div>
                <div>
                  <span class="badge badge-light-secondary badge-pill badge-disabled">3º Ano</span>
                </div>
              </div>
            </a></li>
          </ul>
        </div>
      </div>

      <div class="mt-4">
        <strong>Contexto:</strong> Layout otimizado para mobile. Badge da série fica oculto para economizar espaço.
      </div>
    </div>
  `,
};

// Loader para Bootstrap JS (necessário para funcionalidade de dropdown)
export const Interactive = {
  loaders: [
    async () => {
      if (typeof window !== 'undefined' && !window.bootstrap) {
        return new Promise((resolve) => {
          const script = document.createElement('script');
          script.src = '/vuexy/js/bootstrap.js';
          script.onload = () => resolve({ bootstrapLoaded: true });
          document.head.appendChild(script);
        });
      }
      return {};
    }
  ],
  render: () => {
    setTimeout(() => {
      if (window.bootstrap?.Dropdown) {
        document.querySelectorAll('[data-bs-toggle="dropdown"]').forEach(el => {
          new bootstrap.Dropdown(el);
        });
      }
    }, 100);
    
    return `
      ${selectClassStyles}
      <div class="p-4" style="min-height: 300px;">
        <div class="select-class-container">
          <div class="dropdown">
            <button class="dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
              <div class="d-flex align-items-center gap-2 select-container">
                <span class="text-primary font-14">1º Ano A - Manhã</span>
                <span class="badge badge-light-primary badge-pill d-none d-md-block">
                  <span class="font-14">1º Ano</span>
                </span>
                <span class="material-symbols-outlined text-primary ml-1" style="font-size: 19px;">
                  keyboard_arrow_down
                </span>
              </div>
            </button>
            <ul class="dropdown-menu">
              <li><a class="dropdown-item" href="#" onclick="updateSelected(this, '1º Ano A - Manhã', '1º Ano')">
                <div class="d-flex align-items-center gap-2 flex-nowrap justify-content-between">
                  <div class="d-flex align-items-start flex-column text-left">
                    <span>1º Ano A - Manhã</span>
                  </div>
                  <div>
                    <span class="badge badge-light-primary badge-pill">1º Ano</span>
                  </div>
                </div>
              </a></li>
              <li><a class="dropdown-item" href="#" onclick="updateSelected(this, '1º Ano B - Manhã', '1º Ano')">
                <div class="d-flex align-items-center gap-2 flex-nowrap justify-content-between">
                  <div class="d-flex align-items-start flex-column text-left">
                    <span>1º Ano B - Manhã</span>
                  </div>
                  <div>
                    <span class="badge badge-light-primary badge-pill">1º Ano</span>
                  </div>
                </div>
              </a></li>
              <li><a class="dropdown-item" href="#" onclick="updateSelected(this, '2º Ano A - Tarde', '2º Ano')">
                <div class="d-flex align-items-center gap-2 flex-nowrap justify-content-between">
                  <div class="d-flex align-items-start flex-column text-left">
                    <span>2º Ano A - Tarde</span>
                  </div>
                  <div>
                    <span class="badge badge-light-primary badge-pill">2º Ano</span>
                  </div>
                </div>
              </a></li>
              <li><a class="dropdown-item disabled" href="#" tabindex="-1" aria-disabled="true">
                <div class="d-flex align-items-center gap-2 flex-nowrap justify-content-between">
                  <div class="d-flex align-items-start flex-column text-left">
                    <span>3º Ano X - Manhã</span>
                    <span class="text-muted text-sm">Turma sem alunos</span>
                  </div>
                  <div>
                    <span class="badge badge-light-secondary badge-pill badge-disabled">3º Ano</span>
                  </div>
                </div>
              </a></li>
            </ul>
          </div>
        </div>

        <div class="mt-4">
          <strong>Contexto:</strong> Componente totalmente funcional. Clique para selecionar uma turma.
        </div>
      </div>

      <script>
        function updateSelected(element, className, serieName) {
          event.preventDefault();
          const trigger = element.closest('.dropdown').querySelector('.dropdown-toggle');
          const classSpan = trigger.querySelector('span.font-14');
          const badgeSpan = trigger.querySelector('.badge span.font-14');
          
          classSpan.textContent = className;
          badgeSpan.textContent = serieName;
          
          // Fecha o dropdown
          if (window.bootstrap?.Dropdown) {
            const dropdown = bootstrap.Dropdown.getInstance(trigger);
            if (dropdown) dropdown.hide();
          }
        }
      </script>
    `;
  },
};