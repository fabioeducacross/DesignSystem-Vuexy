const ye={title:"Educacross Components V2/Forms/ESelect",tags:["autodocs"],parameters:{docs:{description:{component:"\n## ESelect - Select Customizado Educacross (Pixel Perfect)\n\nComponente extraído diretamente de `educacross-frontoffice/src/components/selects/ESelect.vue`.\n\n### Props do Componente Real\n\n| Prop | Tipo | Default | Descrição |\n|------|------|---------|-----------|\n| `value` | String/Number/Object/Array | null | Valor selecionado |\n| `options` | Array | required | Lista de opções |\n| `label` | String | 'name' | Campo usado como label |\n| `trackBy` | String | undefined | Campo para comparação |\n| `loading` | Boolean | false | Estado de carregamento |\n| `variant` | String | 'primary' | Cor do badge (primary/success/warning/danger) |\n| `state` | String/Boolean | null | Estado de validação |\n| `multiple` | Boolean | false | Permite múltipla seleção |\n| `closeOnSelect` | Boolean | true | Fecha ao selecionar |\n| `clearable` | Boolean | false | Permite limpar seleção |\n| `searchable` | Boolean | false | Campo de busca |\n| `placeholder` | String | 'selectAnOption' | Placeholder |\n| `paginated` | Boolean | false | Paginação infinita |\n| `disabled` | Boolean | false | Estado desabilitado |\n| `gender` | String | 'F' | Gênero para i18n |\n| `prefix` | String | '' | Prefixo para label |\n\n### Events\n\n- `@input` - Emitido quando valor muda\n- `@nextPage` - Paginação infinita\n- `@change` - Valor alterado (após fechar)\n- `@close` - Dropdown fechou\n- `@clear` - Seleção limpa\n        "}}}},e=`
<style>
  /* === ESelect - CSS Pixel Perfect do Frontoffice === */
  
  /* Variáveis CSS do tema Educacross */
  :root {
    --primary: #6e63e8;
    --success: #28c76f;
    --warning: #ff9f43;
    --danger: #ea5455;
    --body-color: #6e6b7b;
    --text-muted: #b9b9c3;
    --border-color: #d8d6de;
    --white: #fff;
  }

  /* Container principal */
  .e-select-wrapper {
    position: relative;
    cursor: pointer;
  }

  .e-select-wrapper.disabled {
    cursor: not-allowed;
  }

  .e-select-wrapper.disabled .e-select-container {
    background-color: #efefef;
    pointer-events: none;
  }

  /* Trigger do dropdown */
  .e-select-container {
    position: relative;
    overflow: hidden;
    display: flex;
    flex-direction: row;
    align-items: center;
    padding-right: 30px;
    flex-wrap: nowrap;
  }

  .e-select-container.form-control {
    min-height: 38px;
    padding: 0.438rem 2rem 0.438rem 1rem;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.45;
    color: var(--body-color);
    background-color: var(--white);
    background-clip: padding-box;
    border: 1px solid var(--border-color);
    border-radius: 0.357rem;
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  }

  .e-select-container.form-control:focus,
  .e-select-container.form-control:focus-within {
    border-color: var(--e-select-variant, var(--primary));
    box-shadow: 0 3px 10px 0 rgba(110, 99, 232, 0.1);
    outline: none;
  }

  .e-select-container.is-invalid {
    border-color: var(--danger) !important;
  }

  /* Opção selecionada (single) */
  .selected-option-single {
    max-width: calc(100% - 30px);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  /* Badge de múltipla seleção */
  .selected-options-badge {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 5px;
    max-width: 100%;
  }

  .selected-options-badge .badge {
    display: inline-flex;
    align-items: center;
    max-width: 100%;
    padding: 0.35rem 0.6rem;
    font-size: 0.85rem;
    font-weight: 500;
    line-height: 1;
    border-radius: 0.357rem;
  }

  .selected-options-badge .badge .text-truncate {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .selected-options-badge .badge-primary {
    background-color: rgba(110, 99, 232, 0.12);
    color: var(--primary);
  }

  .selected-options-badge .badge-success {
    background-color: rgba(40, 199, 111, 0.12);
    color: var(--success);
  }

  .selected-options-badge .badge-warning {
    background-color: rgba(255, 159, 67, 0.12);
    color: var(--warning);
  }

  .selected-options-badge .badge-danger {
    background-color: rgba(234, 84, 85, 0.12);
    color: var(--danger);
  }

  /* Ícones */
  .icon-container {
    position: absolute;
    top: 0;
    right: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    padding-right: 0.5rem;
  }

  .drop-icon {
    transition: transform 0.2s ease-in-out;
    font-size: 1.5rem;
    color: var(--text-muted);
  }

  .drop-icon.revert-drop-icon {
    transform: rotate(180deg);
  }

  .clear-button {
    border: none;
    background-color: transparent;
    transition: color 0.2s ease-in-out;
    font-size: 1rem;
    cursor: pointer;
  }

  .clear-button:hover {
    color: var(--danger);
  }

  /* Container de opções (dropdown) */
  .options-container {
    visibility: hidden;
    pointer-events: none;
    position: absolute;
    top: calc(100% + 1px);
    left: 0;
    min-width: 100%;
    max-height: calc(38px * 5);
    overflow-y: auto;
    scroll-behavior: smooth;
    border: 1px solid #ccc;
    border-radius: 4px;
    background-color: var(--white);
    z-index: 1050;
    box-shadow: 0 5px 25px rgba(34, 41, 47, 0.1);
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .options-container.opened {
    visibility: visible;
    pointer-events: all;
  }

  /* Opções individuais */
  .option {
    cursor: pointer;
    position: relative;
    min-height: 38px;
    display: flex;
    align-items: center;
    border: 1px solid var(--white);
    z-index: 4;
    border-radius: 6px;
    margin-top: 1px;
    margin-bottom: 1px;
    transition: background-color 0.15s ease;
  }

  .option:hover {
    background-color: #eee;
  }

  .option:first-of-type {
    border-top-left-radius: 6px;
    border-top-right-radius: 6px;
  }

  .option:last-of-type {
    border-bottom-left-radius: 6px;
    border-bottom-right-radius: 6px;
  }

  .option.selected {
    background-color: rgba(110, 99, 232, 0.08);
  }

  .option.selected:hover {
    border-width: 1px;
    border-style: solid;
    border-color: var(--e-select-variant, var(--primary));
  }

  .option-padding-single {
    padding: 0 15px 0 1rem;
  }

  .option-padding-multiple {
    padding: 0 15px 0 10px;
  }

  /* Campo de busca */
  .option-searchable {
    margin: 5px 10px;
  }

  .option-searchable .input-group-merge {
    display: flex;
    flex-wrap: nowrap;
  }

  .option-searchable .input-group-text {
    background-color: transparent;
    border-right: none;
    padding: 0.438rem 0.75rem;
    border: 1px solid var(--border-color);
    border-radius: 0.357rem 0 0 0.357rem;
  }

  .option-searchable .form-control {
    border-left: none;
    padding-left: 0;
  }

  /* Checkbox customizado (EFormCheck) */
  .e-form-check {
    display: inline-flex;
    align-items: center;
    margin-right: 0.5rem;
  }

  .e-form-check input[type="checkbox"] {
    width: 1.1rem;
    height: 1.1rem;
    margin: 0;
    cursor: pointer;
    accent-color: var(--primary);
  }

  /* Spinner de loading */
  .spinner-border-sm {
    width: 1rem;
    height: 1rem;
    border-width: 0.15em;
  }
</style>
`,a={render:()=>`
    ${e}
    <div class="p-4" style="min-height: 100px;">
      <label class="form-label">Selecione uma opção</label>
      <div class="e-select-wrapper" style="--e-select-variant: var(--primary);">
        <div role="combobox" 
             aria-expanded="false" 
             aria-haspopup="listbox" 
             tabindex="0" 
             class="e-select-container form-control">
          <span class="text-muted">Selecione uma opção</span>
          <div class="icon-container">
            <span class="material-symbols-outlined drop-icon">expand_more</span>
          </div>
        </div>
        <ul role="listbox" class="options-container">
          <li class="option option-padding-single">Opção 1</li>
          <li class="option option-padding-single">Opção 2</li>
          <li class="option option-padding-single">Opção 3</li>
        </ul>
      </div>
    </div>
  `},s={render:()=>`
    ${e}
    <div class="p-4" style="min-height: 300px;">
      <label class="form-label">Selecione uma disciplina</label>
      <div class="e-select-wrapper" style="--e-select-variant: var(--primary);">
        <div role="combobox" 
             aria-expanded="true" 
             aria-haspopup="listbox" 
             tabindex="0" 
             class="e-select-container form-control">
          <span class="text-muted">Selecione uma opção</span>
          <div class="icon-container">
            <span class="material-symbols-outlined drop-icon revert-drop-icon">expand_more</span>
          </div>
        </div>
        <ul role="listbox" class="options-container opened">
          <li role="option" aria-selected="false" tabindex="-1" class="option option-padding-single">
            Matemática
          </li>
          <li role="option" aria-selected="false" tabindex="-1" class="option option-padding-single">
            Português
          </li>
          <li role="option" aria-selected="false" tabindex="-1" class="option option-padding-single">
            Ciências
          </li>
          <li role="option" aria-selected="false" tabindex="-1" class="option option-padding-single">
            História
          </li>
          <li role="option" aria-selected="false" tabindex="-1" class="option option-padding-single">
            Geografia
          </li>
        </ul>
      </div>
    </div>
  `},n={render:()=>`
    ${e}
    <div class="p-4" style="min-height: 100px;">
      <label class="form-label">Disciplina</label>
      <div class="e-select-wrapper" style="--e-select-variant: var(--primary);">
        <div role="combobox" 
             aria-expanded="false" 
             aria-haspopup="listbox" 
             tabindex="0" 
             class="e-select-container form-control">
          <span class="selected-option-single">Matemática</span>
          <div class="icon-container">
            <span class="material-symbols-outlined drop-icon">expand_more</span>
          </div>
        </div>
      </div>
    </div>
  `},o={render:()=>`
    ${e}
    <div class="p-4" style="min-height: 100px;">
      <label class="form-label">Disciplinas</label>
      <div class="e-select-wrapper" style="--e-select-variant: var(--primary);">
        <div role="combobox" 
             aria-expanded="false" 
             aria-haspopup="listbox" 
             tabindex="0" 
             class="e-select-container form-control">
          <div class="selected-options-badge cursor-pointer mw-100">
            <span class="badge badge-primary">
              <span class="d-flex align-items-center font-normal mw-100">
                <span>3 disciplinas selecionadas</span>
                <span class="material-symbols-outlined clear-button ml-1 cursor-pointer" style="font-size: 14px;">close</span>
              </span>
            </span>
          </div>
          <div class="icon-container">
            <span class="material-symbols-outlined drop-icon">expand_more</span>
          </div>
        </div>
      </div>
    </div>
  `},i={render:()=>`
    ${e}
    <div class="p-4" style="min-height: 350px;">
      <label class="form-label">Selecione as turmas</label>
      <div class="e-select-wrapper" style="--e-select-variant: var(--primary);">
        <div role="combobox" 
             aria-expanded="true" 
             aria-haspopup="listbox" 
             tabindex="0" 
             class="e-select-container form-control">
          <div class="selected-options-badge cursor-pointer mw-100">
            <span class="badge badge-primary">
              <span class="d-flex align-items-center font-normal mw-100">
                <span>2 turmas selecionadas</span>
                <span class="material-symbols-outlined clear-button ml-1 cursor-pointer" style="font-size: 14px;">close</span>
              </span>
            </span>
          </div>
          <div class="icon-container">
            <span class="material-symbols-outlined drop-icon revert-drop-icon">expand_more</span>
          </div>
        </div>
        <ul role="listbox" class="options-container opened">
          <li role="option" 
              data-testid="select-all-option" 
              aria-label="Selecionar todos os itens" 
              aria-selected="false" 
              tabindex="-1" 
              class="option option-padding-multiple">
            <span class="e-form-check">
              <input type="checkbox">
            </span>
            <span>Selecionar todas</span>
          </li>
          <li role="option" aria-selected="true" tabindex="-1" class="option option-padding-multiple selected">
            <span class="e-form-check">
              <input type="checkbox" checked>
            </span>
            <span>5º Ano A</span>
          </li>
          <li role="option" aria-selected="true" tabindex="-1" class="option option-padding-multiple selected">
            <span class="e-form-check">
              <input type="checkbox" checked>
            </span>
            <span>5º Ano B</span>
          </li>
          <li role="option" aria-selected="false" tabindex="-1" class="option option-padding-multiple">
            <span class="e-form-check">
              <input type="checkbox">
            </span>
            <span>6º Ano A</span>
          </li>
          <li role="option" aria-selected="false" tabindex="-1" class="option option-padding-multiple">
            <span class="e-form-check">
              <input type="checkbox">
            </span>
            <span>6º Ano B</span>
          </li>
        </ul>
      </div>
    </div>
  `},l={render:()=>`
    ${e}
    <div class="p-4" style="min-height: 350px;">
      <label class="form-label">Buscar aluno</label>
      <div class="e-select-wrapper" style="--e-select-variant: var(--primary);">
        <div role="combobox" 
             aria-expanded="true" 
             aria-haspopup="listbox" 
             tabindex="0" 
             class="e-select-container form-control">
          <span class="text-muted">Digite para buscar...</span>
          <div class="icon-container">
            <span class="material-symbols-outlined drop-icon revert-drop-icon">expand_more</span>
          </div>
        </div>
        <ul role="listbox" class="options-container opened">
          <div class="option-searchable">
            <div class="input-group input-group-merge">
              <span class="input-group-text">
                <span class="material-symbols-outlined" style="font-size: 21px;">search</span>
              </span>
              <input type="text" 
                     class="form-control" 
                     placeholder="Buscar aluno..." 
                     autocomplete="off"
                     value="João">
            </div>
          </div>
          <li role="option" aria-selected="false" tabindex="-1" class="option option-padding-single">
            João Silva
          </li>
          <li role="option" aria-selected="false" tabindex="-1" class="option option-padding-single">
            João Pedro
          </li>
          <li role="option" aria-selected="false" tabindex="-1" class="option option-padding-single">
            João Lucas
          </li>
        </ul>
      </div>
    </div>
  `},r={render:()=>`
    ${e}
    <div class="p-4" style="min-height: 100px;">
      <label class="form-label">Carregando opções...</label>
      <div class="e-select-wrapper" style="--e-select-variant: var(--primary);">
        <div role="combobox" 
             aria-expanded="false" 
             aria-haspopup="listbox" 
             tabindex="0" 
             class="e-select-container form-control">
          <span class="text-muted">Carregando...</span>
          <div class="icon-container mr-2">
            <div class="spinner-border spinner-border-sm text-primary" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `},t={render:()=>`
    ${e}
    <div class="p-4" style="min-height: 100px;">
      <label class="form-label">Campo desabilitado</label>
      <div class="e-select-wrapper disabled" style="--e-select-variant: var(--primary);">
        <div role="combobox" 
             aria-expanded="false" 
             aria-haspopup="listbox" 
             aria-disabled="true"
             tabindex="0" 
             class="e-select-container form-control">
          <span class="text-muted">Selecione uma opção</span>
          <div class="icon-container">
            <span class="material-symbols-outlined drop-icon">expand_more</span>
          </div>
        </div>
      </div>
    </div>
  `},c={render:()=>`
    ${e}
    <div class="p-4" style="min-height: 100px;">
      <label class="form-label">Campo obrigatório</label>
      <div class="e-select-wrapper" style="--e-select-variant: var(--danger);">
        <div role="combobox" 
             aria-expanded="false" 
             aria-haspopup="listbox" 
             tabindex="0" 
             class="e-select-container form-control is-invalid">
          <span class="text-muted">Selecione uma opção</span>
          <div class="icon-container mr-2">
            <span class="material-symbols-outlined drop-icon">expand_more</span>
          </div>
        </div>
      </div>
      <div class="invalid-feedback d-block">Este campo é obrigatório</div>
    </div>
  `},d={render:()=>`
    ${e}
    <div class="p-4">
      <div class="row g-3">
        <div class="col-md-6 mb-3">
          <label class="form-label">Primary</label>
          <div class="e-select-wrapper" style="--e-select-variant: var(--primary);">
            <div class="e-select-container form-control">
              <div class="selected-options-badge">
                <span class="badge badge-primary">
                  <span class="d-flex align-items-center">
                    <span>3 opções selecionadas</span>
                    <span class="material-symbols-outlined clear-button ml-1" style="font-size: 14px;">close</span>
                  </span>
                </span>
              </div>
              <div class="icon-container">
                <span class="material-symbols-outlined drop-icon">expand_more</span>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-6 mb-3">
          <label class="form-label">Success</label>
          <div class="e-select-wrapper" style="--e-select-variant: var(--success);">
            <div class="e-select-container form-control">
              <div class="selected-options-badge">
                <span class="badge badge-success">
                  <span class="d-flex align-items-center">
                    <span>5 opções selecionadas</span>
                    <span class="material-symbols-outlined clear-button ml-1" style="font-size: 14px;">close</span>
                  </span>
                </span>
              </div>
              <div class="icon-container">
                <span class="material-symbols-outlined drop-icon">expand_more</span>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-6 mb-3">
          <label class="form-label">Warning</label>
          <div class="e-select-wrapper" style="--e-select-variant: var(--warning);">
            <div class="e-select-container form-control">
              <div class="selected-options-badge">
                <span class="badge badge-warning">
                  <span class="d-flex align-items-center">
                    <span>2 opções selecionadas</span>
                    <span class="material-symbols-outlined clear-button ml-1" style="font-size: 14px;">close</span>
                  </span>
                </span>
              </div>
              <div class="icon-container">
                <span class="material-symbols-outlined drop-icon">expand_more</span>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-6 mb-3">
          <label class="form-label">Danger</label>
          <div class="e-select-wrapper" style="--e-select-variant: var(--danger);">
            <div class="e-select-container form-control">
              <div class="selected-options-badge">
                <span class="badge badge-danger">
                  <span class="d-flex align-items-center">
                    <span>1 opção selecionada</span>
                    <span class="material-symbols-outlined clear-button ml-1" style="font-size: 14px;">close</span>
                  </span>
                </span>
              </div>
              <div class="icon-container">
                <span class="material-symbols-outlined drop-icon">expand_more</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `},p={render:()=>`
    ${e}
    <div class="p-4" style="min-height: 100px;">
      <label class="form-label">Selecione uma escola</label>
      <div class="e-select-wrapper" style="--e-select-variant: var(--primary);">
        <div role="combobox" 
             aria-expanded="false" 
             aria-haspopup="listbox" 
             tabindex="0" 
             class="e-select-container form-control">
          <span>Sem Opções</span>
          <div class="icon-container">
            <span class="material-symbols-outlined drop-icon">expand_more</span>
          </div>
        </div>
      </div>
    </div>
  `},m={render:()=>`
    ${e}
    <div class="p-4" style="min-height: 100px;">
      <label class="form-label">Turmas</label>
      <div class="e-select-wrapper" style="--e-select-variant: var(--primary);">
        <div role="combobox" 
             aria-expanded="false" 
             aria-haspopup="listbox" 
             tabindex="0" 
             class="e-select-container form-control">
          <div class="selected-options-badge cursor-pointer mw-100">
            <span class="badge badge-primary">
              <span class="d-flex align-items-center font-normal mw-100">
                <span>Todas as opções selecionadas</span>
                <span class="material-symbols-outlined clear-button ml-1 cursor-pointer" style="font-size: 14px;">close</span>
              </span>
            </span>
          </div>
          <div class="icon-container">
            <span class="material-symbols-outlined drop-icon">expand_more</span>
          </div>
        </div>
      </div>
    </div>
  `};var b,v,x,u,g;a.parameters={...a.parameters,docs:{...(b=a.parameters)==null?void 0:b.docs,source:{originalSource:`{
  render: () => \`
    \${eSelectStyles}
    <div class="p-4" style="min-height: 100px;">
      <label class="form-label">Selecione uma opção</label>
      <div class="e-select-wrapper" style="--e-select-variant: var(--primary);">
        <div role="combobox" 
             aria-expanded="false" 
             aria-haspopup="listbox" 
             tabindex="0" 
             class="e-select-container form-control">
          <span class="text-muted">Selecione uma opção</span>
          <div class="icon-container">
            <span class="material-symbols-outlined drop-icon">expand_more</span>
          </div>
        </div>
        <ul role="listbox" class="options-container">
          <li class="option option-padding-single">Opção 1</li>
          <li class="option option-padding-single">Opção 2</li>
          <li class="option option-padding-single">Opção 3</li>
        </ul>
      </div>
    </div>
  \`
}`,...(x=(v=a.parameters)==null?void 0:v.docs)==null?void 0:x.source},description:{story:"Default - Estado fechado com placeholder",...(g=(u=a.parameters)==null?void 0:u.docs)==null?void 0:g.description}}};var f,y,h,S,w;s.parameters={...s.parameters,docs:{...(f=s.parameters)==null?void 0:f.docs,source:{originalSource:`{
  render: () => \`
    \${eSelectStyles}
    <div class="p-4" style="min-height: 300px;">
      <label class="form-label">Selecione uma disciplina</label>
      <div class="e-select-wrapper" style="--e-select-variant: var(--primary);">
        <div role="combobox" 
             aria-expanded="true" 
             aria-haspopup="listbox" 
             tabindex="0" 
             class="e-select-container form-control">
          <span class="text-muted">Selecione uma opção</span>
          <div class="icon-container">
            <span class="material-symbols-outlined drop-icon revert-drop-icon">expand_more</span>
          </div>
        </div>
        <ul role="listbox" class="options-container opened">
          <li role="option" aria-selected="false" tabindex="-1" class="option option-padding-single">
            Matemática
          </li>
          <li role="option" aria-selected="false" tabindex="-1" class="option option-padding-single">
            Português
          </li>
          <li role="option" aria-selected="false" tabindex="-1" class="option option-padding-single">
            Ciências
          </li>
          <li role="option" aria-selected="false" tabindex="-1" class="option option-padding-single">
            História
          </li>
          <li role="option" aria-selected="false" tabindex="-1" class="option option-padding-single">
            Geografia
          </li>
        </ul>
      </div>
    </div>
  \`
}`,...(h=(y=s.parameters)==null?void 0:y.docs)==null?void 0:h.source},description:{story:"Opened - Dropdown aberto mostrando opções",...(w=(S=s.parameters)==null?void 0:S.docs)==null?void 0:w.description}}};var E,k,_,C,A;n.parameters={...n.parameters,docs:{...(E=n.parameters)==null?void 0:E.docs,source:{originalSource:`{
  render: () => \`
    \${eSelectStyles}
    <div class="p-4" style="min-height: 100px;">
      <label class="form-label">Disciplina</label>
      <div class="e-select-wrapper" style="--e-select-variant: var(--primary);">
        <div role="combobox" 
             aria-expanded="false" 
             aria-haspopup="listbox" 
             tabindex="0" 
             class="e-select-container form-control">
          <span class="selected-option-single">Matemática</span>
          <div class="icon-container">
            <span class="material-symbols-outlined drop-icon">expand_more</span>
          </div>
        </div>
      </div>
    </div>
  \`
}`,...(_=(k=n.parameters)==null?void 0:k.docs)==null?void 0:_.source},description:{story:"SingleSelected - Uma opção selecionada",...(A=(C=n.parameters)==null?void 0:C.docs)==null?void 0:A.description}}};var z,$,B,D,O;o.parameters={...o.parameters,docs:{...(z=o.parameters)==null?void 0:z.docs,source:{originalSource:`{
  render: () => \`
    \${eSelectStyles}
    <div class="p-4" style="min-height: 100px;">
      <label class="form-label">Disciplinas</label>
      <div class="e-select-wrapper" style="--e-select-variant: var(--primary);">
        <div role="combobox" 
             aria-expanded="false" 
             aria-haspopup="listbox" 
             tabindex="0" 
             class="e-select-container form-control">
          <div class="selected-options-badge cursor-pointer mw-100">
            <span class="badge badge-primary">
              <span class="d-flex align-items-center font-normal mw-100">
                <span>3 disciplinas selecionadas</span>
                <span class="material-symbols-outlined clear-button ml-1 cursor-pointer" style="font-size: 14px;">close</span>
              </span>
            </span>
          </div>
          <div class="icon-container">
            <span class="material-symbols-outlined drop-icon">expand_more</span>
          </div>
        </div>
      </div>
    </div>
  \`
}`,...(B=($=o.parameters)==null?void 0:$.docs)==null?void 0:B.source},description:{story:"MultipleSelected - Múltiplas opções selecionadas com badge",...(O=(D=o.parameters)==null?void 0:D.docs)==null?void 0:O.description}}};var F,P,M,J,L;i.parameters={...i.parameters,docs:{...(F=i.parameters)==null?void 0:F.docs,source:{originalSource:`{
  render: () => \`
    \${eSelectStyles}
    <div class="p-4" style="min-height: 350px;">
      <label class="form-label">Selecione as turmas</label>
      <div class="e-select-wrapper" style="--e-select-variant: var(--primary);">
        <div role="combobox" 
             aria-expanded="true" 
             aria-haspopup="listbox" 
             tabindex="0" 
             class="e-select-container form-control">
          <div class="selected-options-badge cursor-pointer mw-100">
            <span class="badge badge-primary">
              <span class="d-flex align-items-center font-normal mw-100">
                <span>2 turmas selecionadas</span>
                <span class="material-symbols-outlined clear-button ml-1 cursor-pointer" style="font-size: 14px;">close</span>
              </span>
            </span>
          </div>
          <div class="icon-container">
            <span class="material-symbols-outlined drop-icon revert-drop-icon">expand_more</span>
          </div>
        </div>
        <ul role="listbox" class="options-container opened">
          <li role="option" 
              data-testid="select-all-option" 
              aria-label="Selecionar todos os itens" 
              aria-selected="false" 
              tabindex="-1" 
              class="option option-padding-multiple">
            <span class="e-form-check">
              <input type="checkbox">
            </span>
            <span>Selecionar todas</span>
          </li>
          <li role="option" aria-selected="true" tabindex="-1" class="option option-padding-multiple selected">
            <span class="e-form-check">
              <input type="checkbox" checked>
            </span>
            <span>5º Ano A</span>
          </li>
          <li role="option" aria-selected="true" tabindex="-1" class="option option-padding-multiple selected">
            <span class="e-form-check">
              <input type="checkbox" checked>
            </span>
            <span>5º Ano B</span>
          </li>
          <li role="option" aria-selected="false" tabindex="-1" class="option option-padding-multiple">
            <span class="e-form-check">
              <input type="checkbox">
            </span>
            <span>6º Ano A</span>
          </li>
          <li role="option" aria-selected="false" tabindex="-1" class="option option-padding-multiple">
            <span class="e-form-check">
              <input type="checkbox">
            </span>
            <span>6º Ano B</span>
          </li>
        </ul>
      </div>
    </div>
  \`
}`,...(M=(P=i.parameters)==null?void 0:P.docs)==null?void 0:M.source},description:{story:"MultipleWithCheckboxes - Dropdown aberto com checkboxes",...(L=(J=i.parameters)==null?void 0:J.docs)==null?void 0:L.description}}};var T,V,W,N,G;l.parameters={...l.parameters,docs:{...(T=l.parameters)==null?void 0:T.docs,source:{originalSource:`{
  render: () => \`
    \${eSelectStyles}
    <div class="p-4" style="min-height: 350px;">
      <label class="form-label">Buscar aluno</label>
      <div class="e-select-wrapper" style="--e-select-variant: var(--primary);">
        <div role="combobox" 
             aria-expanded="true" 
             aria-haspopup="listbox" 
             tabindex="0" 
             class="e-select-container form-control">
          <span class="text-muted">Digite para buscar...</span>
          <div class="icon-container">
            <span class="material-symbols-outlined drop-icon revert-drop-icon">expand_more</span>
          </div>
        </div>
        <ul role="listbox" class="options-container opened">
          <div class="option-searchable">
            <div class="input-group input-group-merge">
              <span class="input-group-text">
                <span class="material-symbols-outlined" style="font-size: 21px;">search</span>
              </span>
              <input type="text" 
                     class="form-control" 
                     placeholder="Buscar aluno..." 
                     autocomplete="off"
                     value="João">
            </div>
          </div>
          <li role="option" aria-selected="false" tabindex="-1" class="option option-padding-single">
            João Silva
          </li>
          <li role="option" aria-selected="false" tabindex="-1" class="option option-padding-single">
            João Pedro
          </li>
          <li role="option" aria-selected="false" tabindex="-1" class="option option-padding-single">
            João Lucas
          </li>
        </ul>
      </div>
    </div>
  \`
}`,...(W=(V=l.parameters)==null?void 0:V.docs)==null?void 0:W.source},description:{story:"Searchable - Com campo de busca",...(G=(N=l.parameters)==null?void 0:N.docs)==null?void 0:G.description}}};var I,j,q,H,R;r.parameters={...r.parameters,docs:{...(I=r.parameters)==null?void 0:I.docs,source:{originalSource:`{
  render: () => \`
    \${eSelectStyles}
    <div class="p-4" style="min-height: 100px;">
      <label class="form-label">Carregando opções...</label>
      <div class="e-select-wrapper" style="--e-select-variant: var(--primary);">
        <div role="combobox" 
             aria-expanded="false" 
             aria-haspopup="listbox" 
             tabindex="0" 
             class="e-select-container form-control">
          <span class="text-muted">Carregando...</span>
          <div class="icon-container mr-2">
            <div class="spinner-border spinner-border-sm text-primary" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  \`
}`,...(q=(j=r.parameters)==null?void 0:j.docs)==null?void 0:q.source},description:{story:"Loading - Estado de carregamento",...(R=(H=r.parameters)==null?void 0:H.docs)==null?void 0:R.description}}};var U,K,Q,X,Y;t.parameters={...t.parameters,docs:{...(U=t.parameters)==null?void 0:U.docs,source:{originalSource:`{
  render: () => \`
    \${eSelectStyles}
    <div class="p-4" style="min-height: 100px;">
      <label class="form-label">Campo desabilitado</label>
      <div class="e-select-wrapper disabled" style="--e-select-variant: var(--primary);">
        <div role="combobox" 
             aria-expanded="false" 
             aria-haspopup="listbox" 
             aria-disabled="true"
             tabindex="0" 
             class="e-select-container form-control">
          <span class="text-muted">Selecione uma opção</span>
          <div class="icon-container">
            <span class="material-symbols-outlined drop-icon">expand_more</span>
          </div>
        </div>
      </div>
    </div>
  \`
}`,...(Q=(K=t.parameters)==null?void 0:K.docs)==null?void 0:Q.source},description:{story:"Disabled - Estado desabilitado",...(Y=(X=t.parameters)==null?void 0:X.docs)==null?void 0:Y.description}}};var Z,ee,ae,se,ne;c.parameters={...c.parameters,docs:{...(Z=c.parameters)==null?void 0:Z.docs,source:{originalSource:`{
  render: () => \`
    \${eSelectStyles}
    <div class="p-4" style="min-height: 100px;">
      <label class="form-label">Campo obrigatório</label>
      <div class="e-select-wrapper" style="--e-select-variant: var(--danger);">
        <div role="combobox" 
             aria-expanded="false" 
             aria-haspopup="listbox" 
             tabindex="0" 
             class="e-select-container form-control is-invalid">
          <span class="text-muted">Selecione uma opção</span>
          <div class="icon-container mr-2">
            <span class="material-symbols-outlined drop-icon">expand_more</span>
          </div>
        </div>
      </div>
      <div class="invalid-feedback d-block">Este campo é obrigatório</div>
    </div>
  \`
}`,...(ae=(ee=c.parameters)==null?void 0:ee.docs)==null?void 0:ae.source},description:{story:"Invalid - Estado de erro/validação",...(ne=(se=c.parameters)==null?void 0:se.docs)==null?void 0:ne.description}}};var oe,ie,le,re,te;d.parameters={...d.parameters,docs:{...(oe=d.parameters)==null?void 0:oe.docs,source:{originalSource:`{
  render: () => \`
    \${eSelectStyles}
    <div class="p-4">
      <div class="row g-3">
        <div class="col-md-6 mb-3">
          <label class="form-label">Primary</label>
          <div class="e-select-wrapper" style="--e-select-variant: var(--primary);">
            <div class="e-select-container form-control">
              <div class="selected-options-badge">
                <span class="badge badge-primary">
                  <span class="d-flex align-items-center">
                    <span>3 opções selecionadas</span>
                    <span class="material-symbols-outlined clear-button ml-1" style="font-size: 14px;">close</span>
                  </span>
                </span>
              </div>
              <div class="icon-container">
                <span class="material-symbols-outlined drop-icon">expand_more</span>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-6 mb-3">
          <label class="form-label">Success</label>
          <div class="e-select-wrapper" style="--e-select-variant: var(--success);">
            <div class="e-select-container form-control">
              <div class="selected-options-badge">
                <span class="badge badge-success">
                  <span class="d-flex align-items-center">
                    <span>5 opções selecionadas</span>
                    <span class="material-symbols-outlined clear-button ml-1" style="font-size: 14px;">close</span>
                  </span>
                </span>
              </div>
              <div class="icon-container">
                <span class="material-symbols-outlined drop-icon">expand_more</span>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-6 mb-3">
          <label class="form-label">Warning</label>
          <div class="e-select-wrapper" style="--e-select-variant: var(--warning);">
            <div class="e-select-container form-control">
              <div class="selected-options-badge">
                <span class="badge badge-warning">
                  <span class="d-flex align-items-center">
                    <span>2 opções selecionadas</span>
                    <span class="material-symbols-outlined clear-button ml-1" style="font-size: 14px;">close</span>
                  </span>
                </span>
              </div>
              <div class="icon-container">
                <span class="material-symbols-outlined drop-icon">expand_more</span>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-6 mb-3">
          <label class="form-label">Danger</label>
          <div class="e-select-wrapper" style="--e-select-variant: var(--danger);">
            <div class="e-select-container form-control">
              <div class="selected-options-badge">
                <span class="badge badge-danger">
                  <span class="d-flex align-items-center">
                    <span>1 opção selecionada</span>
                    <span class="material-symbols-outlined clear-button ml-1" style="font-size: 14px;">close</span>
                  </span>
                </span>
              </div>
              <div class="icon-container">
                <span class="material-symbols-outlined drop-icon">expand_more</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  \`
}`,...(le=(ie=d.parameters)==null?void 0:ie.docs)==null?void 0:le.source},description:{story:"Variants - Diferentes cores de badge",...(te=(re=d.parameters)==null?void 0:re.docs)==null?void 0:te.description}}};var ce,de,pe,me,be;p.parameters={...p.parameters,docs:{...(ce=p.parameters)==null?void 0:ce.docs,source:{originalSource:`{
  render: () => \`
    \${eSelectStyles}
    <div class="p-4" style="min-height: 100px;">
      <label class="form-label">Selecione uma escola</label>
      <div class="e-select-wrapper" style="--e-select-variant: var(--primary);">
        <div role="combobox" 
             aria-expanded="false" 
             aria-haspopup="listbox" 
             tabindex="0" 
             class="e-select-container form-control">
          <span>Sem Opções</span>
          <div class="icon-container">
            <span class="material-symbols-outlined drop-icon">expand_more</span>
          </div>
        </div>
      </div>
    </div>
  \`
}`,...(pe=(de=p.parameters)==null?void 0:de.docs)==null?void 0:pe.source},description:{story:"NoOptions - Sem opções disponíveis",...(be=(me=p.parameters)==null?void 0:me.docs)==null?void 0:be.description}}};var ve,xe,ue,ge,fe;m.parameters={...m.parameters,docs:{...(ve=m.parameters)==null?void 0:ve.docs,source:{originalSource:`{
  render: () => \`
    \${eSelectStyles}
    <div class="p-4" style="min-height: 100px;">
      <label class="form-label">Turmas</label>
      <div class="e-select-wrapper" style="--e-select-variant: var(--primary);">
        <div role="combobox" 
             aria-expanded="false" 
             aria-haspopup="listbox" 
             tabindex="0" 
             class="e-select-container form-control">
          <div class="selected-options-badge cursor-pointer mw-100">
            <span class="badge badge-primary">
              <span class="d-flex align-items-center font-normal mw-100">
                <span>Todas as opções selecionadas</span>
                <span class="material-symbols-outlined clear-button ml-1 cursor-pointer" style="font-size: 14px;">close</span>
              </span>
            </span>
          </div>
          <div class="icon-container">
            <span class="material-symbols-outlined drop-icon">expand_more</span>
          </div>
        </div>
      </div>
    </div>
  \`
}`,...(ue=(xe=m.parameters)==null?void 0:xe.docs)==null?void 0:ue.source},description:{story:"AllSelected - Todas as opções selecionadas",...(fe=(ge=m.parameters)==null?void 0:ge.docs)==null?void 0:fe.description}}};const he=["Default","Opened","SingleSelected","MultipleSelected","MultipleWithCheckboxes","Searchable","Loading","Disabled","Invalid","Variants","NoOptions","AllSelected"];export{m as AllSelected,a as Default,t as Disabled,c as Invalid,r as Loading,o as MultipleSelected,i as MultipleWithCheckboxes,p as NoOptions,s as Opened,l as Searchable,n as SingleSelected,d as Variants,he as __namedExportsOrder,ye as default};
