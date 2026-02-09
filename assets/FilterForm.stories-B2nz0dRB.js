const te={title:"Vuexy/Organisms/Forms/FilterForm",tags:["autodocs"],parameters:{layout:"fullscreen",docs:{description:{component:`
## FilterForm - Formulário de Filtros Cascateados

Formulário complexo de filtros usado para pesquisa de jogos/conteúdos educacionais.

### Características:
- **Filtros cascateados** - Cada filtro depende do anterior
- **Estados dinâmicos** - Campos desabilitados até dependências serem satisfeitas
- **Expansível** - Seção de filtros avançados pode ser recolhida
- **Ícones SVG** - Áreas de conhecimento com ícones coloridos
- **Seleção múltipla** - Campo de habilidades suporta múltiplas seleções

### Fluxo de Dependências:
\`\`\`
Área de conhecimento
        ↓
  Matriz/Currículo  →  Temática  →  Habilidades
\`\`\`

### Campos:
| Campo | Tipo | Dependência | Múltiplo |
|-------|------|-------------|----------|
| Área de conhecimento | ESelect com ícones | Nenhuma | Não |
| Busca | AutoSuggest | Nenhuma | - |
| Matriz/Currículo | ESelect | Área | Não |
| Temática | ESelect | Matriz | Não |
| Habilidades | ESelect | Temática | Sim |
        `}}}},o=`
<style>
  :root {
    --edu-primary: #6e63e8;
    --edu-success: #28c76f;
    --edu-warning: #ff9f43;
    --edu-danger: #ea5455;
    --edu-text: #5e5873;
    --edu-text-muted: #b9b9c3;
    --edu-border: #d8d6de;
    --edu-bg-light: #f8f8f8;
    --edu-white: #fff;
  }

  * { box-sizing: border-box; }

  .filter-form-container {
    font-family: 'Public Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    color: var(--edu-text);
  }

  .card {
    background: var(--edu-white);
    border-radius: 0.428rem;
    box-shadow: 0 4px 24px 0 rgba(34, 41, 47, 0.1);
    margin: 1.5rem;
  }

  .card-body {
    padding: 1.5rem;
  }

  .row {
    display: flex;
    flex-wrap: wrap;
    margin: 0 -0.75rem;
  }

  .col-auto { flex: 0 0 auto; padding: 0 0.75rem; }
  .col-md { flex: 1; min-width: 200px; padding: 0 0.75rem; }
  .col-lg-3 { flex: 0 0 25%; max-width: 25%; padding: 0 0.75rem; }
  .col-lg { flex: 1; padding: 0 0.75rem; }

  .form-group {
    margin-bottom: 1rem;
  }

  .form-group label {
    display: block;
    margin-bottom: 0.2857rem;
    font-size: 0.857rem;
    font-weight: 400;
    color: var(--edu-text);
  }

  /* ESelect Styles */
  .e-select-wrapper {
    position: relative;
    width: 100%;
  }

  .e-select-wrapper.cursor-pointer { cursor: pointer; }

  .e-select-wrapper.disabled {
    cursor: not-allowed;
    opacity: 0.65;
  }

  .e-select-wrapper.disabled .e-select-container {
    pointer-events: none;
    background-color: #efefef;
  }

  .e-select-container {
    position: relative;
    display: flex;
    align-items: center;
    min-height: 38px;
    padding: 0.438rem 2rem 0.438rem 1rem;
    font-size: 1rem;
    color: var(--edu-text);
    background-color: var(--edu-white);
    border: 1px solid var(--edu-border);
    border-radius: 0.357rem;
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  }

  .e-select-container:focus,
  .e-select-container:hover:not([aria-disabled="true"]) {
    border-color: var(--edu-primary);
    box-shadow: 0 3px 10px 0 rgba(110, 99, 232, 0.1);
  }

  .e-select-container .text-muted {
    color: var(--edu-text-muted) !important;
  }

  .opt-content {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .selected-option-single {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .icon-container {
    position: absolute;
    right: 0.5rem;
    top: 50%;
    transform: translateY(-50%);
    display: flex;
    align-items: center;
  }

  .drop-icon {
    font-size: 1.5rem;
    color: var(--edu-text-muted);
    transition: transform 0.2s;
  }

  .drop-icon.rotate { transform: rotate(180deg); }

  .options-container {
    display: none;
    position: absolute;
    top: calc(100% + 2px);
    left: 0;
    right: 0;
    max-height: 200px;
    overflow-y: auto;
    background: var(--edu-white);
    border: 1px solid var(--edu-border);
    border-radius: 0.357rem;
    box-shadow: 0 5px 25px rgba(34, 41, 47, 0.1);
    z-index: 1050;
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .options-container.show { display: block; }

  .option {
    display: flex;
    align-items: center;
    padding: 0.5rem 1rem;
    cursor: pointer;
    transition: background-color 0.15s;
  }

  .option:hover { background-color: var(--edu-bg-light); }
  .option.selected { background-color: rgba(110, 99, 232, 0.08); }

  /* AutoSuggest/Search Input */
  .autosuggest-input {
    width: 100%;
    min-height: 38px;
    padding: 0.438rem 1rem;
    font-size: 1rem;
    color: var(--edu-text);
    background-color: var(--edu-white);
    border: 1px solid var(--edu-border);
    border-radius: 0.357rem;
    transition: border-color 0.15s ease-in-out;
  }

  .autosuggest-input:focus {
    outline: none;
    border-color: var(--edu-primary);
    box-shadow: 0 3px 10px 0 rgba(110, 99, 232, 0.1);
  }

  .autosuggest-input::placeholder {
    color: var(--edu-text-muted);
  }

  /* Expandable Section */
  .expand-section {
    padding-top: 1rem;
  }

  .expand-content {
    overflow: hidden;
    transition: max-height 0.3s ease;
  }

  .expand-content.collapsed {
    max-height: 0;
    padding: 0;
  }

  /* Actions */
  .filter-actions {
    display: flex;
    justify-content: flex-end;
    padding: 0.5rem 0;
  }

  .clear-link {
    display: flex;
    align-items: center;
    gap: 0.25rem;
    color: var(--edu-primary);
    text-decoration: none;
    font-size: 0.875rem;
  }

  .clear-link:hover { text-decoration: underline; }

  .toggle-filters {
    display: flex;
    justify-content: center;
    padding: 0.5rem 0;
  }

  .toggle-btn {
    display: flex;
    align-items: center;
    gap: 0.25rem;
    background: none;
    border: none;
    color: var(--edu-primary);
    font-size: 0.875rem;
    font-weight: 600;
    cursor: pointer;
    padding: 0;
  }

  .toggle-btn:hover { text-decoration: underline; }

  /* Badge para seleção múltipla */
  .badge-selection {
    display: inline-flex;
    align-items: center;
    padding: 0.35rem 0.6rem;
    font-size: 0.85rem;
    font-weight: 500;
    border-radius: 0.357rem;
    background-color: rgba(110, 99, 232, 0.12);
    color: var(--edu-primary);
  }

  /* Responsive */
  @media (max-width: 992px) {
    .col-lg-3, .col-lg { flex: 0 0 50%; max-width: 50%; }
  }

  @media (max-width: 768px) {
    .col-auto, .col-md, .col-lg-3, .col-lg { flex: 0 0 100%; max-width: 100%; }
  }

  /* Material Symbols */
  .material-symbols-outlined {
    font-family: 'Material Symbols Outlined';
    font-size: 24px;
    line-height: 1;
  }
</style>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" rel="stylesheet" />
<link href="https://fonts.googleapis.com/css2?family=Public+Sans:wght@400;500;600;700&display=swap" rel="stylesheet" />
`,a={math:`<svg width="32" height="32" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="44" height="44" rx="5" fill="#00BDB8"/>
<path d="M16.9278 29.7H18.4556V27.0111H21.1444V25.4833H18.4556V22.7944H16.9278V25.4833H14.2389V27.0111H16.9278V29.7ZM23.4972 28.6306H29.6389V27.1333H23.4972V28.6306ZM23.4972 25.3611H29.6389V23.8333H23.4972V25.3611ZM24.6278 20.3806L26.4917 18.5167L28.3556 20.3806L29.4556 19.2806L27.5917 17.4167L29.4556 15.5528L28.3556 14.4528L26.4917 16.3167L24.6278 14.4528L23.5278 15.5528L25.3917 17.4167L23.5278 19.2806L24.6278 20.3806ZM14.6972 18.1806H20.6861V16.6528H14.6972V18.1806ZM12.8333 33C12.3444 33 11.9167 32.8167 11.55 32.45C11.1833 32.0833 11 31.6556 11 31.1667V12.8333C11 12.3444 11.1833 11.9167 11.55 11.55C11.9167 11.1833 12.3444 11 12.8333 11H31.1667C31.6556 11 32.0833 11.1833 32.45 11.55C32.8167 11.9167 33 12.3444 33 12.8333V31.1667C33 31.6556 32.8167 32.0833 32.45 32.45C32.0833 32.8167 31.6556 33 31.1667 33H12.8333ZM12.8333 31.1667H31.1667V12.8333H12.8333V31.1667Z" fill="white"/>
</svg>`,portuguese:`<svg width="32" height="32" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="44" height="44" rx="5" fill="#EC6300"/>
<g clip-path="url(#clip0_lp_filter)">
<path d="M27.3631 18.8828L24.4657 11.487C24.3047 11.0929 23.8583 10.8997 23.4608 11.052L16.065 13.9494C15.6674 14.1067 15.4726 14.5567 15.63 14.9543L18.5491 22.3501C18.7065 22.7477 19.1564 22.9424 19.5541 22.7851L26.9281 19.8877C27.3257 19.7303 27.5204 19.2804 27.3631 18.8828ZM19.3235 21.9368L16.4957 14.7411L23.6913 11.909L26.5191 19.109L19.3235 21.9368Z" fill="#F5F5F5"/>
<path d="M20.2196 23.5248H12.2974C11.8697 23.5248 11.523 23.8715 11.523 24.2992V32.2257C11.523 32.6534 11.8697 33.0001 12.2974 33.0001H20.2196C20.6473 33.0001 20.9939 32.6534 20.9939 32.2257V24.2992C20.9939 23.8715 20.6472 23.5248 20.2196 23.5248ZM20.1238 32.1256H12.3931V24.3949H20.1238V32.1256Z" fill="#F5F5F5"/>
<path d="M31.9183 23.4812L24.2615 21.4452C23.844 21.3433 23.4219 21.595 23.3131 22.0107L21.2771 29.6675C21.1665 30.0807 21.4117 30.5052 21.8249 30.6158L29.482 32.6519C29.8952 32.7626 30.3197 32.5173 30.4303 32.1042L32.449 24.4296C32.5609 24.0216 32.3246 23.5993 31.9183 23.4812ZM29.6169 31.7471L22.1428 29.785L24.131 22.3153L31.6007 24.3034L29.6169 31.7471Z" fill="#F5F5F5"/>
<path d="M24.0961 17.7778C24.0171 17.6275 23.9125 17.492 23.7872 17.3775L21.612 15.0848L21.3553 14.8064C21.2908 14.7395 21.2193 14.6798 21.1421 14.628C21.064 14.5749 20.9747 14.5406 20.8811 14.528C20.6585 14.5124 20.4408 14.5988 20.2894 14.7629C20.2296 14.8363 20.1879 14.9227 20.1676 15.0152C20.1455 15.124 20.1353 15.2349 20.1372 15.3459V15.6721V18.8393C20.1459 18.9698 20.1531 19.0698 20.1589 19.1395C20.1622 19.2049 20.1755 19.2694 20.1981 19.3309C20.2404 19.4329 20.3243 19.5121 20.4287 19.5484C20.5346 19.5919 20.6534 19.5919 20.7593 19.5484C20.867 19.5178 20.953 19.4366 20.9899 19.3309C21.0225 19.1633 21.0342 18.9923 21.0247 18.8219V18.1998L22.7431 17.5254L23.152 17.9605L23.3391 18.1476C23.3924 18.2039 23.4523 18.2535 23.5175 18.2955C23.5664 18.3249 23.6215 18.3428 23.6784 18.3477C23.7423 18.3523 23.8064 18.3419 23.8655 18.3172C23.9677 18.2752 24.0502 18.1959 24.0961 18.0953C24.1394 17.9939 24.1394 17.8792 24.0961 17.7778ZM20.9855 17.4602L20.9246 15.4851L22.2471 16.9642L20.9855 17.4602Z" fill="#F5F5F5"/>
<path d="M17.3441 27.923C17.7585 27.7683 18.0304 27.3691 18.0228 26.9268C18.0232 26.7992 18.001 26.6725 17.9575 26.5526C17.9148 26.4337 17.8515 26.3232 17.7705 26.2263C17.6906 26.1298 17.595 26.0474 17.4877 25.9827C17.3542 25.9028 17.2064 25.8496 17.0526 25.8261C16.8669 25.7977 16.6793 25.7847 16.4914 25.7869H15.0471C14.8904 25.7699 14.7335 25.8169 14.612 25.9175C14.5128 26.0395 14.4659 26.1959 14.4815 26.3525V29.7633C14.4656 29.9192 14.5108 30.0751 14.6077 30.1983C14.729 30.3025 14.8882 30.3513 15.0471 30.3332H16.4349C16.6374 30.3269 16.8393 30.308 17.0396 30.2766C17.2038 30.2573 17.3647 30.2164 17.5181 30.1548C17.7329 30.0653 17.9162 29.9139 18.0445 29.7198C18.1756 29.5147 18.2437 29.2757 18.2403 29.0324C18.2503 28.4941 17.8724 28.0264 17.3441 27.923ZM15.4082 26.4874H16.1347C16.3878 26.4743 16.6409 26.5128 16.8786 26.6005C17.0431 26.6799 17.1405 26.8537 17.1222 27.0355C17.1232 27.138 17.0961 27.2388 17.0439 27.327C16.9841 27.4439 16.8811 27.5328 16.7568 27.575C16.5845 27.6248 16.4053 27.6468 16.226 27.6402H15.3864L15.4082 26.4874ZM17.305 28.9715C17.305 29.4181 16.9946 29.6414 16.374 29.6414H15.3864L15.4082 28.3189H16.3522C16.6028 28.3031 16.8528 28.3573 17.0744 28.4755C17.2341 28.5879 17.3219 28.7769 17.305 28.9715Z" fill="#F5F5F5"/>
<path d="M29.051 25.7608C28.9401 25.4863 28.7621 25.244 28.5333 25.056C28.2809 24.8455 27.9831 24.6966 27.6632 24.621C27.3802 24.5427 27.0847 24.5206 26.7931 24.5557C26.5127 24.5899 26.2429 24.6833 26.0014 24.8298C25.7515 24.9837 25.5366 25.1882 25.3705 25.4302C25.1835 25.7056 25.0465 26.012 24.966 26.3351C24.9094 26.5412 24.8744 26.7525 24.8615 26.9659C24.8503 27.1654 24.8634 27.3656 24.9007 27.5619C24.9358 27.7483 24.9942 27.9295 25.0747 28.1013C25.1584 28.2776 25.27 28.4393 25.4053 28.5799C25.5401 28.7179 25.6957 28.8339 25.8665 28.9236C26.0614 29.0249 26.2672 29.1037 26.4799 29.1585C26.7525 29.2368 27.0381 29.259 27.3195 29.2238C27.5566 29.1873 27.7835 29.1013 27.9852 28.9714C28.1519 28.8672 28.2991 28.7348 28.4202 28.5799C28.5232 28.4516 28.5987 28.3035 28.6421 28.1448C28.6726 28.0423 28.6584 27.9317 28.6029 27.8403C28.5501 27.7487 28.4621 27.6827 28.3593 27.6576C28.2588 27.6214 28.147 27.6359 28.0591 27.6967C27.9751 27.7656 27.903 27.8479 27.8459 27.9404C27.7109 28.137 27.5199 28.2885 27.2978 28.3754C27.0716 28.4492 26.8279 28.4492 26.6017 28.3754C26.3962 28.3355 26.2053 28.2408 26.0492 28.1013C25.8982 27.9295 25.804 27.7153 25.7795 27.4879C25.7503 27.1953 25.7784 26.8997 25.8621 26.6178C25.9397 26.181 26.1638 25.7836 26.4973 25.4911C26.776 25.2741 27.1425 25.2061 27.4805 25.3083C27.6867 25.3557 27.8734 25.465 28.0156 25.6216C28.1548 25.7951 28.2503 25.9995 28.294 26.2176C28.3162 26.3331 28.3558 26.4446 28.4115 26.5482C28.4676 26.6262 28.5519 26.6792 28.6464 26.6961C28.7459 26.7237 28.8524 26.7061 28.9379 26.6483C29.0263 26.5948 29.0903 26.509 29.1163 26.409C29.1621 26.1914 29.1393 25.9649 29.051 25.7608Z" fill="#F5F5F5"/>
</g>
<defs>
<clipPath id="clip0_lp_filter">
<rect width="22" height="22" fill="white" transform="translate(11 11)"/>
</clipPath>
</defs>
</svg>`,owls:`<svg width="32" height="32" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="44" height="44" rx="5" fill="#56124F"/>
<path d="M5.5914 16.5892C6.65723 13.5995 10.4764 14.211 12.2528 14.8905C13.0522 14.0751 15.2505 14.0977 16.2497 14.211C21.5788 11.2212 27.5741 12.9652 29.9056 14.211C31.5043 12.852 34.3465 13.1917 35.5678 13.5315C41.9628 15.434 39.3521 22.297 37.2426 25.3546C38.8414 26.4418 38.2491 28.3788 37.916 29.0582C34.4521 34.4941 30.1276 31.4244 28.2402 29.4992C24.2434 32.2171 19.6914 31.3111 17.915 30.5184C13.1188 34.867 8.81109 29.1594 7.25676 25.7621C6.25755 23.9501 4.52558 19.5789 5.5914 16.5892Z" fill="#BF3089"/>
<path d="M14.353 29.0919C17.7978 29.0919 20.5904 26.2745 20.5904 22.799C20.5904 19.3236 17.7978 16.5062 14.353 16.5062C10.9081 16.5062 8.11548 19.3236 8.11548 22.799C8.11548 26.2745 10.9081 29.0919 14.353 29.0919Z" fill="#0A5B59"/>
<path d="M14.7185 29.1368C17.8341 29.1368 20.3598 26.4437 20.3598 23.1216C20.3598 19.7994 17.8341 17.1063 14.7185 17.1063C11.6029 17.1063 9.07727 19.7994 9.07727 23.1216C9.07727 26.4437 11.6029 29.1368 14.7185 29.1368Z" fill="#F2EEE3"/>
<path d="M16.0029 26.871C17.8266 26.871 19.3051 25.3794 19.3051 23.5394C19.3051 21.6995 17.8266 20.2079 16.0029 20.2079C14.1791 20.2079 12.7007 21.6995 12.7007 23.5394C12.7007 25.3794 14.1791 26.871 16.0029 26.871Z" fill="#FAB84A"/>
<path d="M16.0031 25.9917C17.371 25.9917 18.4798 24.873 18.4798 23.493C18.4798 22.1131 17.371 20.9944 16.0031 20.9944C14.6353 20.9944 13.5265 22.1131 13.5265 23.493C13.5265 24.873 14.6353 25.9917 16.0031 25.9917Z" fill="#201E1E"/>
<path d="M14.6267 22.7057C15.0573 22.7057 15.4064 22.3535 15.4064 21.9191C15.4064 21.4846 15.0573 21.1324 14.6267 21.1324C14.1961 21.1324 13.847 21.4846 13.847 21.9191C13.847 22.3535 14.1961 22.7057 14.6267 22.7057Z" fill="#FEFEFE"/>
<path d="M30.4052 29.0919C33.8501 29.0919 36.6427 26.2745 36.6427 22.799C36.6427 19.3236 33.8501 16.5062 30.4052 16.5062C26.9603 16.5062 24.1677 19.3236 24.1677 22.799C24.1677 26.2745 26.9603 29.0919 30.4052 29.0919Z" fill="#0A5B59"/>
<path d="M29.9918 29.1368C33.1074 29.1368 35.6331 26.4437 35.6331 23.1216C35.6331 19.7994 33.1074 17.1063 29.9918 17.1063C26.8763 17.1063 24.3506 19.7994 24.3506 23.1216C24.3506 26.4437 26.8763 29.1368 29.9918 29.1368Z" fill="#F2EEE3"/>
<path d="M28.8905 26.871C30.7142 26.871 32.1926 25.3794 32.1926 23.5394C32.1926 21.6995 30.7142 20.2079 28.8905 20.2079C27.0667 20.2079 25.5883 21.6995 25.5883 23.5394C25.5883 25.3794 27.0667 26.871 28.8905 26.871Z" fill="#FAB84A"/>
<path d="M28.9371 26.0365C30.3049 26.0365 31.4137 24.9178 31.4137 23.5378C31.4137 22.1579 30.3049 21.0392 28.9371 21.0392C27.5693 21.0392 26.4604 22.1579 26.4604 23.5378C26.4604 24.9178 27.5693 26.0365 28.9371 26.0365Z" fill="#201E1E"/>
<path d="M27.5607 22.7057C27.9913 22.7057 28.3404 22.3535 28.3404 21.9191C28.3404 21.4846 27.9913 21.1324 27.5607 21.1324C27.1301 21.1324 26.781 21.4846 26.781 21.9191C26.781 22.3535 27.1301 22.7057 27.5607 22.7057Z" fill="#FEFEFE"/>
</svg>`,mathEnglish:`<svg width="32" height="32" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="44" height="44" rx="5" fill="#00BDB8"/>
<path d="M16.9278 29.7H18.4556V27.0111H21.1444V25.4833H18.4556V22.7944H16.9278V25.4833H14.2389V27.0111H16.9278V29.7ZM23.4972 28.6306H29.6389V27.1333H23.4972V28.6306ZM23.4972 25.3611H29.6389V23.8333H23.4972V25.3611ZM24.6278 20.3806L26.4917 18.5167L28.3556 20.3806L29.4556 19.2806L27.5917 17.4167L29.4556 15.5528L28.3556 14.4528L26.4917 16.3167L24.6278 14.4528L23.5278 15.5528L25.3917 17.4167L23.5278 19.2806L24.6278 20.3806ZM14.6972 18.1806H20.6861V16.6528H14.6972V18.1806ZM12.8333 33C12.3444 33 11.9167 32.8167 11.55 32.45C11.1833 32.0833 11 31.6556 11 31.1667V12.8333C11 12.3444 11.1833 11.9167 11.55 11.55C11.9167 11.1833 12.3444 11 12.8333 11H31.1667C31.6556 11 32.0833 11.1833 32.45 11.55C32.8167 11.9167 33 12.3444 33 12.8333V31.1667C33 31.6556 32.8167 32.0833 32.45 32.45C32.0833 32.8167 31.6556 33 31.1667 33H12.8333ZM12.8333 31.1667H31.1667V12.8333H12.8333V31.1667Z" fill="white"/>
<!-- Flag overlay -->
<circle cx="35" cy="9" r="7" fill="#012169"/>
<path d="M28 2L42 16M42 2L28 16" stroke="white" stroke-width="1.5"/>
<path d="M35 2V16M28 9H42" stroke="white" stroke-width="2.5"/>
<path d="M35 2V16M28 9H42" stroke="#C8102E" stroke-width="1.5"/>
</svg>`},u={name:"Formulário Completo",render:()=>`
    ${o}
    <div class="filter-form-container">
      <div class="card">
        <div class="card-body">
          <!-- Row Principal -->
          <div class="row">
            <!-- Área de conhecimento -->
            <div class="col-auto">
              <div class="form-group">
                <label>Área de conhecimento</label>
                <div class="e-select-wrapper cursor-pointer" style="min-width: 215px;">
                  <div class="e-select-container" role="combobox" tabindex="0">
                    <div class="opt-content">
                      ${a.math}
                      <span>Matemática</span>
                    </div>
                    <div class="icon-container">
                      <span class="material-symbols-outlined drop-icon">expand_more</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Campo de Busca -->
            <div class="col-md">
              <div class="form-group">
                <label><span style="visibility: hidden;">‍</span></label>
                <input type="text" class="autosuggest-input" placeholder="Pesquisar pelo nome do jogo ou conteúdo" />
              </div>
            </div>
          </div>

          <!-- Seção de Filtros Avançados -->
          <section class="expand-section">
            <div class="expand-content">
              <div class="row" style="align-items: flex-end;">
                <!-- Matriz/Currículo -->
                <div class="col-lg-3">
                  <div class="form-group">
                    <label>Matriz/Currículo</label>
                    <div class="e-select-wrapper cursor-pointer">
                      <div class="e-select-container" role="combobox" tabindex="0">
                        <span class="selected-option-single">Todos</span>
                        <div class="icon-container">
                          <span class="material-symbols-outlined drop-icon">expand_more</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Temática (Disabled) -->
                <div class="col-lg">
                  <div class="form-group">
                    <label>Temática</label>
                    <div class="e-select-wrapper cursor-pointer disabled">
                      <div class="e-select-container" role="combobox" aria-disabled="true" tabindex="0">
                        <span class="text-muted">Defina a matriz/currículo</span>
                        <div class="icon-container">
                          <span class="material-symbols-outlined drop-icon">expand_more</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Habilidades (Disabled) -->
                <div class="col-lg">
                  <div class="form-group">
                    <label>Habilidades</label>
                    <div class="e-select-wrapper cursor-pointer disabled">
                      <div class="e-select-container" role="combobox" aria-disabled="true" tabindex="0">
                        <span class="text-muted">Defina a matriz/currículo e uma temática</span>
                        <div class="icon-container">
                          <span class="material-symbols-outlined drop-icon">expand_more</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Ações -->
              <div class="filter-actions">
                <a href="#" class="clear-link">
                  <span class="material-symbols-outlined" style="font-size: 18px;">cancel</span>
                  Limpar busca
                </a>
              </div>
            </div>

            <!-- Toggle -->
            <div class="toggle-filters">
              <button class="toggle-btn">
                <span class="material-symbols-outlined" style="font-size: 16px;">filter_alt_off</span>
                <span>Menos filtros</span>
                <span class="material-symbols-outlined" style="font-size: 16px;">keyboard_arrow_up</span>
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  `},v={name:"Dropdown Aberto",render:()=>`
    ${o}
    <div class="filter-form-container">
      <div class="card">
        <div class="card-body" style="min-height: 350px;">
          <div class="row">
            <div class="col-auto">
              <div class="form-group">
                <label>Área de conhecimento</label>
                <div class="e-select-wrapper cursor-pointer" style="min-width: 215px;">
                  <div class="e-select-container" role="combobox" tabindex="0" style="border-color: var(--edu-primary);">
                    <div class="opt-content">
                      ${a.math}
                      <span>Matemática</span>
                    </div>
                    <div class="icon-container">
                      <span class="material-symbols-outlined drop-icon rotate">expand_more</span>
                    </div>
                  </div>
                  <ul class="options-container show">
                    <li class="option selected">
                      <div class="opt-content">
                        ${a.math}
                        <span>Matemática</span>
                      </div>
                    </li>
                    <li class="option">
                      <div class="opt-content">
                        ${a.portuguese}
                        <span>Língua Portuguesa</span>
                      </div>
                    </li>
                    <li class="option">
                      <div class="opt-content">
                        ${a.owls}
                        <span>Liga das Corujinhas</span>
                      </div>
                    </li>
                    <li class="option">
                      <div class="opt-content">
                        ${a.mathEnglish}
                        <span>Matemática Inglês</span>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="col-md">
              <div class="form-group">
                <label><span style="visibility: hidden;">‍</span></label>
                <input type="text" class="autosuggest-input" placeholder="Pesquisar pelo nome do jogo ou conteúdo" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `},b={name:"Filtros Ativos",render:()=>`
    ${o}
    <div class="filter-form-container">
      <div class="card">
        <div class="card-body">
          <div class="row">
            <div class="col-auto">
              <div class="form-group">
                <label>Área de conhecimento</label>
                <div class="e-select-wrapper cursor-pointer" style="min-width: 215px;">
                  <div class="e-select-container" role="combobox" tabindex="0">
                    <div class="opt-content">
                      ${a.math}
                      <span>Matemática</span>
                    </div>
                    <div class="icon-container">
                      <span class="material-symbols-outlined drop-icon">expand_more</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-md">
              <div class="form-group">
                <label><span style="visibility: hidden;">‍</span></label>
                <input type="text" class="autosuggest-input" value="Frações" />
              </div>
            </div>
          </div>

          <section class="expand-section">
            <div class="expand-content">
              <div class="row" style="align-items: flex-end;">
                <div class="col-lg-3">
                  <div class="form-group">
                    <label>Matriz/Currículo</label>
                    <div class="e-select-wrapper cursor-pointer">
                      <div class="e-select-container" role="combobox" tabindex="0">
                        <span class="selected-option-single">BNCC 5º Ano</span>
                        <div class="icon-container">
                          <span class="material-symbols-outlined drop-icon">expand_more</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="col-lg">
                  <div class="form-group">
                    <label>Temática</label>
                    <div class="e-select-wrapper cursor-pointer">
                      <div class="e-select-container" role="combobox" tabindex="0">
                        <span class="selected-option-single">Números e Operações</span>
                        <div class="icon-container">
                          <span class="material-symbols-outlined drop-icon">expand_more</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="col-lg">
                  <div class="form-group">
                    <label>Habilidades</label>
                    <div class="e-select-wrapper cursor-pointer">
                      <div class="e-select-container" role="combobox" tabindex="0">
                        <span class="badge-selection">3 selecionadas</span>
                        <div class="icon-container">
                          <span class="material-symbols-outlined drop-icon">expand_more</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="filter-actions">
                <a href="#" class="clear-link">
                  <span class="material-symbols-outlined" style="font-size: 18px;">cancel</span>
                  Limpar busca
                </a>
              </div>
            </div>

            <div class="toggle-filters">
              <button class="toggle-btn">
                <span class="material-symbols-outlined" style="font-size: 16px;">filter_alt_off</span>
                <span>Menos filtros</span>
                <span class="material-symbols-outlined" style="font-size: 16px;">keyboard_arrow_up</span>
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  `},g={name:"Filtros Recolhidos",render:()=>`
    ${o}
    <div class="filter-form-container">
      <div class="card">
        <div class="card-body">
          <div class="row">
            <div class="col-auto">
              <div class="form-group" style="margin-bottom: 0;">
                <label>Área de conhecimento</label>
                <div class="e-select-wrapper cursor-pointer" style="min-width: 215px;">
                  <div class="e-select-container" role="combobox" tabindex="0">
                    <div class="opt-content">
                      ${a.math}
                      <span>Matemática</span>
                    </div>
                    <div class="icon-container">
                      <span class="material-symbols-outlined drop-icon">expand_more</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-md">
              <div class="form-group" style="margin-bottom: 0;">
                <label><span style="visibility: hidden;">‍</span></label>
                <input type="text" class="autosuggest-input" placeholder="Pesquisar pelo nome do jogo ou conteúdo" />
              </div>
            </div>
          </div>

          <section class="expand-section">
            <div class="expand-content collapsed"></div>
            <div class="toggle-filters">
              <button class="toggle-btn">
                <span class="material-symbols-outlined" style="font-size: 16px;">filter_alt</span>
                <span>Mais filtros</span>
                <span class="material-symbols-outlined" style="font-size: 16px;">keyboard_arrow_down</span>
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  `},x={name:"Anatomia",render:()=>`
    ${o}
    <style>
      .anatomy-container {
        padding: 2rem;
        background: #f5f7fa;
      }
      .anatomy-label {
        position: absolute;
        background: #ea5455;
        color: white;
        padding: 0.25rem 0.5rem;
        border-radius: 4px;
        font-size: 0.75rem;
        font-weight: 600;
        z-index: 100;
        white-space: nowrap;
      }
      .anatomy-box {
        position: relative;
        border: 2px dashed #ea5455;
        border-radius: 8px;
        padding: 0.5rem;
        margin: 0.25rem;
      }
      .info-table {
        width: 100%;
        border-collapse: collapse;
        margin-top: 2rem;
        background: white;
        border-radius: 8px;
        overflow: hidden;
      }
      .info-table th, .info-table td {
        padding: 0.75rem 1rem;
        text-align: left;
        border-bottom: 1px solid #eee;
      }
      .info-table th {
        background: var(--edu-primary);
        color: white;
        font-weight: 600;
      }
      .info-table tr:last-child td { border-bottom: none; }
      .info-table .badge {
        display: inline-block;
        padding: 0.25rem 0.5rem;
        border-radius: 4px;
        font-size: 0.75rem;
        font-weight: 600;
      }
      .badge-required { background: #ea5455; color: white; }
      .badge-optional { background: #28c76f; color: white; }
      .badge-cascade { background: #ff9f43; color: white; }
    </style>

    <div class="anatomy-container">
      <h3 style="margin-bottom: 1.5rem; color: var(--edu-text);">📋 Anatomia do FilterForm</h3>

      <div class="card" style="margin: 0; position: relative;">
        <div class="anatomy-box" style="margin: 0;">
          <span class="anatomy-label" style="top: -12px; left: 10px;">Card Container</span>

          <div class="card-body" style="position: relative;">
            <span class="anatomy-label" style="top: 5px; right: 10px;">Card Body</span>

            <div class="row" style="position: relative;">
              <span class="anatomy-label" style="top: -10px; left: 50%; transform: translateX(-50%);">Row Principal</span>

              <div class="col-auto">
                <div class="anatomy-box">
                  <span class="anatomy-label" style="top: -10px; left: 5px;">1. Área de Conhecimento</span>
                  <div class="form-group" style="margin-bottom: 0;">
                    <label>Área de conhecimento</label>
                    <div class="e-select-wrapper cursor-pointer" style="min-width: 200px;">
                      <div class="e-select-container">
                        <div class="opt-content">
                          ${a.math}
                          <span>Matemática</span>
                        </div>
                        <div class="icon-container">
                          <span class="material-symbols-outlined drop-icon">expand_more</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="col-md">
                <div class="anatomy-box">
                  <span class="anatomy-label" style="top: -10px; left: 5px;">2. Campo de Busca</span>
                  <div class="form-group" style="margin-bottom: 0;">
                    <label><span style="visibility: hidden;">‍</span></label>
                    <input type="text" class="autosuggest-input" placeholder="Pesquisar..." />
                  </div>
                </div>
              </div>
            </div>

            <section class="expand-section" style="position: relative; margin-top: 1rem;">
              <div class="anatomy-box">
                <span class="anatomy-label" style="top: -10px; left: 5px;">Filtros Avançados (Expansível)</span>

                <div class="row" style="align-items: flex-end;">
                  <div class="col-lg-3">
                    <div class="anatomy-box" style="border-color: #ff9f43;">
                      <span class="anatomy-label" style="background: #ff9f43; top: -10px; left: 5px;">3. Matriz</span>
                      <div class="form-group" style="margin-bottom: 0;">
                        <label>Matriz/Currículo</label>
                        <div class="e-select-wrapper cursor-pointer">
                          <div class="e-select-container">
                            <span>Todos</span>
                            <div class="icon-container">
                              <span class="material-symbols-outlined drop-icon">expand_more</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="col-lg">
                    <div class="anatomy-box" style="border-color: #ff9f43;">
                      <span class="anatomy-label" style="background: #ff9f43; top: -10px; left: 5px;">4. Temática (cascata)</span>
                      <div class="form-group" style="margin-bottom: 0;">
                        <label>Temática</label>
                        <div class="e-select-wrapper disabled">
                          <div class="e-select-container">
                            <span class="text-muted">Depende de Matriz</span>
                            <div class="icon-container">
                              <span class="material-symbols-outlined drop-icon">expand_more</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="col-lg">
                    <div class="anatomy-box" style="border-color: #ff9f43;">
                      <span class="anatomy-label" style="background: #ff9f43; top: -10px; left: 5px;">5. Habilidades (cascata)</span>
                      <div class="form-group" style="margin-bottom: 0;">
                        <label>Habilidades</label>
                        <div class="e-select-wrapper disabled">
                          <div class="e-select-container">
                            <span class="text-muted">Depende de Temática</span>
                            <div class="icon-container">
                              <span class="material-symbols-outlined drop-icon">expand_more</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="row" style="margin-top: 1rem;">
                  <div class="col-md" style="text-align: right;">
                    <div class="anatomy-box" style="display: inline-block; border-color: #28c76f;">
                      <span class="anatomy-label" style="background: #28c76f; top: -10px; left: 5px;">6. Limpar</span>
                      <a href="#" class="clear-link">
                        <span class="material-symbols-outlined" style="font-size: 18px;">cancel</span>
                        Limpar busca
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div class="anatomy-box" style="margin-top: 0.5rem; border-color: #6e63e8;">
                <span class="anatomy-label" style="background: #6e63e8; top: -10px; left: 5px;">7. Toggle</span>
                <div class="toggle-filters" style="padding: 0.25rem 0;">
                  <button class="toggle-btn">
                    <span class="material-symbols-outlined" style="font-size: 16px;">filter_alt_off</span>
                    <span>Menos filtros</span>
                    <span class="material-symbols-outlined" style="font-size: 16px;">keyboard_arrow_up</span>
                  </button>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>

      <table class="info-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Campo</th>
            <th>Tipo</th>
            <th>Dependência</th>
            <th>Obrigatório</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Área de conhecimento</td>
            <td>ESelect com ícones SVG</td>
            <td>-</td>
            <td><span class="badge badge-required">Sim</span></td>
          </tr>
          <tr>
            <td>2</td>
            <td>Busca</td>
            <td>AutoSuggest (input)</td>
            <td>-</td>
            <td><span class="badge badge-optional">Não</span></td>
          </tr>
          <tr>
            <td>3</td>
            <td>Matriz/Currículo</td>
            <td>ESelect simples</td>
            <td>-</td>
            <td><span class="badge badge-optional">Não</span></td>
          </tr>
          <tr>
            <td>4</td>
            <td>Temática</td>
            <td>ESelect simples</td>
            <td><span class="badge badge-cascade">Matriz</span></td>
            <td><span class="badge badge-optional">Não</span></td>
          </tr>
          <tr>
            <td>5</td>
            <td>Habilidades</td>
            <td>ESelect múltiplo</td>
            <td><span class="badge badge-cascade">Temática</span></td>
            <td><span class="badge badge-optional">Não</span></td>
          </tr>
          <tr>
            <td>6</td>
            <td>Limpar busca</td>
            <td>Link/Ação</td>
            <td>-</td>
            <td>-</td>
          </tr>
          <tr>
            <td>7</td>
            <td>Toggle filtros</td>
            <td>Botão</td>
            <td>-</td>
            <td>-</td>
          </tr>
        </tbody>
      </table>
    </div>
  `},f={name:"Opções dos Dropdowns",render:()=>`
    ${o}
    <style>
      .options-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 1.5rem;
        padding: 2rem;
        background: #f5f7fa;
      }
      .options-card {
        background: white;
        border-radius: 8px;
        overflow: hidden;
        box-shadow: 0 2px 8px rgba(0,0,0,0.08);
      }
      .options-card-header {
        background: var(--edu-primary);
        color: white;
        padding: 0.75rem 1rem;
        font-weight: 600;
      }
      .options-list {
        list-style: none;
        padding: 0;
        margin: 0;
        max-height: 300px;
        overflow-y: auto;
      }
      .options-list li {
        padding: 0.5rem 1rem;
        border-bottom: 1px solid #eee;
        display: flex;
        align-items: center;
        gap: 0.5rem;
      }
      .options-list li:last-child { border-bottom: none; }
      .options-list li.selected { background: rgba(110, 99, 232, 0.08); }
    </style>

    <div class="options-grid">
      <!-- Área de Conhecimento -->
      <div class="options-card">
        <div class="options-card-header">📚 Área de Conhecimento</div>
        <ul class="options-list">
          <li class="selected">
            ${a.math}
            <span>Matemática</span>
          </li>
          <li>
            ${a.portuguese}
            <span>Língua Portuguesa</span>
          </li>
          <li>
            ${a.owls}
            <span>Liga das Corujinhas</span>
          </li>
          <li>
            ${a.mathEnglish}
            <span>Matemática Inglês</span>
          </li>
        </ul>
      </div>

      <!-- Matriz/Currículo -->
      <div class="options-card">
        <div class="options-card-header">📋 Matriz/Currículo</div>
        <ul class="options-list">
          <li class="selected">Todos</li>
          <li>BNCC 1º Ano</li>
          <li>BNCC 2º Ano</li>
          <li>BNCC 3º Ano</li>
          <li>BNCC 4º Ano</li>
          <li>BNCC 5º Ano</li>
          <li>BNCC 6º Ano</li>
          <li>BNCC 7º Ano</li>
          <li>BNCC 8º Ano</li>
          <li>BNCC 9º Ano</li>
          <li>Currículo Paulista 1º Ano</li>
          <li>Currículo Paulista 2º Ano</li>
          <li>Currículo paulista 3º Ano</li>
          <li>Currículo paulista 4º Ano</li>
          <li>Currículo paulista 5º Ano</li>
          <li>Currículo paulista 6º Ano</li>
          <li>Currículo Paulista 7º Ano</li>
          <li>Currículo Paulista 8º Ano</li>
          <li>Currículo Paulista 9º Ano</li>
        </ul>
      </div>

      <!-- Estados dos Campos -->
      <div class="options-card">
        <div class="options-card-header">🔄 Estados dos Campos</div>
        <ul class="options-list">
          <li style="background: #e8f5e9;">
            <span style="color: #28c76f;">●</span>
            <strong>Habilitado:</strong> Campo disponível
          </li>
          <li style="background: #ffebee;">
            <span style="color: #ea5455;">●</span>
            <strong>Desabilitado:</strong> Depende de outro campo
          </li>
          <li style="background: #e3f2fd;">
            <span style="color: #6e63e8;">●</span>
            <strong>Selecionado:</strong> Opção ativa
          </li>
          <li style="background: #fff3e0;">
            <span style="color: #ff9f43;">●</span>
            <strong>Cascata:</strong> Aguardando dependência
          </li>
        </ul>
      </div>
    </div>
  `},r={name:"🎮 Interativo",parameters:{docs:{description:{story:`
### Demo Interativo do Formulário de Filtros

Clique nos dropdowns para ver as dependências cascateadas em ação:
- **Área de conhecimento** → sempre habilitado
- **Matriz/Currículo** → habilita após selecionar área
- **Temática** → habilita após selecionar matriz
- **Habilidades** → habilita após selecionar temática
        `}}},render:()=>`
    ${o}
    <style>
      .demo-feedback {
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: #333;
        color: white;
        padding: 12px 20px;
        border-radius: 8px;
        font-size: 14px;
        opacity: 0;
        transform: translateY(20px);
        transition: all 0.3s ease;
        z-index: 9999;
      }
      .demo-feedback.show {
        opacity: 1;
        transform: translateY(0);
      }
      .demo-feedback.success { background: #28c76f; }
      .demo-feedback.info { background: #6e63e8; }
      .demo-feedback.warning { background: #ff9f43; }
    </style>

    <div class="filter-form-container" id="interactive-form">
      <div class="card">
        <div class="card-body">
          <!-- Row Principal -->
          <div class="row">
            <!-- Área de conhecimento -->
            <div class="col-auto">
              <div class="form-group">
                <label>Área de conhecimento</label>
                <div class="e-select-wrapper cursor-pointer" id="select-area" style="min-width: 215px;">
                  <div class="e-select-container" role="combobox" tabindex="0" id="trigger-area">
                    <div class="opt-content" id="display-area">
                      <span class="text-muted">Selecione...</span>
                    </div>
                    <div class="icon-container">
                      <span class="material-symbols-outlined drop-icon" id="icon-area">expand_more</span>
                    </div>
                  </div>
                  <ul role="listbox" class="options-container" id="options-area">
                    <li class="option" data-value="math" data-label="Matemática">
                      <div class="opt-content">
                        ${a.math}
                        <span>Matemática</span>
                      </div>
                    </li>
                    <li class="option" data-value="port" data-label="Língua Portuguesa">
                      <div class="opt-content">
                        ${a.portuguese}
                        <span>Língua Portuguesa</span>
                      </div>
                    </li>
                    <li class="option" data-value="owls" data-label="Liga das Corujinhas">
                      <div class="opt-content">
                        ${a.owls}
                        <span>Liga das Corujinhas</span>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <!-- Campo de Busca -->
            <div class="col-md">
              <div class="form-group">
                <label><span style="visibility: hidden;">‍</span></label>
                <input type="text" class="autosuggest-input" id="search-input" placeholder="Pesquisar pelo nome do jogo ou conteúdo" />
              </div>
            </div>
          </div>

          <!-- Seção de Filtros Avançados -->
          <section class="expand-section">
            <div class="expand-content" id="advanced-filters">
              <div class="row" style="align-items: flex-end;">
                <!-- Matriz/Currículo -->
                <div class="col-lg-3">
                  <div class="form-group">
                    <label>Matriz/Currículo</label>
                    <div class="e-select-wrapper cursor-pointer disabled" id="select-matriz">
                      <div class="e-select-container" role="combobox" tabindex="0" id="trigger-matriz">
                        <span class="text-muted" id="display-matriz">Selecione a área primeiro</span>
                        <div class="icon-container">
                          <span class="material-symbols-outlined drop-icon" id="icon-matriz">expand_more</span>
                        </div>
                      </div>
                      <ul role="listbox" class="options-container" id="options-matriz">
                        <li class="option" data-value="todos" data-label="Todos"><span>Todos</span></li>
                        <li class="option" data-value="bncc1" data-label="BNCC 1º Ano"><span>BNCC 1º Ano</span></li>
                        <li class="option" data-value="bncc2" data-label="BNCC 2º Ano"><span>BNCC 2º Ano</span></li>
                        <li class="option" data-value="bncc3" data-label="BNCC 3º Ano"><span>BNCC 3º Ano</span></li>
                        <li class="option" data-value="cp1" data-label="Currículo Paulista 1º Ano"><span>Currículo Paulista 1º Ano</span></li>
                        <li class="option" data-value="cp2" data-label="Currículo Paulista 2º Ano"><span>Currículo Paulista 2º Ano</span></li>
                      </ul>
                    </div>
                  </div>
                </div>

                <!-- Temática -->
                <div class="col-lg">
                  <div class="form-group">
                    <label>Temática</label>
                    <div class="e-select-wrapper cursor-pointer disabled" id="select-tematica">
                      <div class="e-select-container" role="combobox" tabindex="0" id="trigger-tematica">
                        <span class="text-muted" id="display-tematica">Selecione a matriz primeiro</span>
                        <div class="icon-container">
                          <span class="material-symbols-outlined drop-icon" id="icon-tematica">expand_more</span>
                        </div>
                      </div>
                      <ul role="listbox" class="options-container" id="options-tematica">
                        <li class="option" data-value="num" data-label="Números"><span>Números</span></li>
                        <li class="option" data-value="geo" data-label="Geometria"><span>Geometria</span></li>
                        <li class="option" data-value="med" data-label="Grandezas e Medidas"><span>Grandezas e Medidas</span></li>
                        <li class="option" data-value="prob" data-label="Probabilidade"><span>Probabilidade</span></li>
                        <li class="option" data-value="alg" data-label="Álgebra"><span>Álgebra</span></li>
                      </ul>
                    </div>
                  </div>
                </div>

                <!-- Habilidades -->
                <div class="col-lg">
                  <div class="form-group">
                    <label>Habilidades</label>
                    <div class="e-select-wrapper cursor-pointer disabled" id="select-habilidades">
                      <div class="e-select-container" role="combobox" tabindex="0" id="trigger-habilidades">
                        <span class="text-muted" id="display-habilidades">Selecione a temática primeiro</span>
                        <div class="icon-container">
                          <span class="material-symbols-outlined drop-icon" id="icon-habilidades">expand_more</span>
                        </div>
                      </div>
                      <ul role="listbox" class="options-container" id="options-habilidades">
                        <li class="option" data-value="h1" data-label="EF01MA01"><span>EF01MA01 - Utilizar números naturais</span></li>
                        <li class="option" data-value="h2" data-label="EF01MA02"><span>EF01MA02 - Contar de maneira exata</span></li>
                        <li class="option" data-value="h3" data-label="EF01MA03"><span>EF01MA03 - Estimar e comparar</span></li>
                        <li class="option" data-value="h4" data-label="EF01MA04"><span>EF01MA04 - Contar elementos de coleção</span></li>
                      </ul>
                    </div>
                  </div>
                </div>

                <!-- Ações -->
                <div class="col-auto" style="display: flex; align-items: flex-end; padding-bottom: 1rem;">
                  <a href="#" class="clear-link" id="btn-limpar">
                    <span class="material-symbols-outlined" style="font-size: 18px;">close</span>
                    Limpar busca
                  </a>
                </div>
              </div>
            </div>

            <!-- Toggle -->
            <div class="toggle-filters">
              <button class="toggle-btn" id="btn-toggle">
                <span class="material-symbols-outlined" id="toggle-icon" style="font-size: 18px;">expand_more</span>
                <span id="toggle-text">Menos filtros</span>
              </button>
            </div>
          </section>
        </div>
      </div>
      
      <!-- Estado atual -->
      <div style="margin: 1rem 1.5rem; padding: 1rem; background: white; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.08);">
        <strong style="color: #5e5873; font-size: 0.9rem;">📊 Estado atual do formulário:</strong>
        <pre id="form-state" style="margin-top: 0.5rem; font-size: 0.85rem; color: #6e63e8; background: #f8f8f8; padding: 1rem; border-radius: 6px; overflow-x: auto;">{
  "area": null,
  "matriz": null,
  "tematica": null,
  "habilidades": [],
  "busca": ""
}</pre>
      </div>
    </div>
    
    <div class="demo-feedback" id="feedback"></div>
  `,play:async({canvasElement:e})=>{const i={area:null,matriz:null,tematica:null,habilidades:[],busca:""},y=e.querySelector("#feedback"),J=e.querySelector("#form-state");function c(n,s="info"){y.textContent=n,y.className="demo-feedback show "+s,setTimeout(()=>y.classList.remove("show"),2500)}function h(){J.textContent=JSON.stringify(i,null,2)}function p(n,s,C,ee){const ae=e.querySelector("#select-"+n),ne=e.querySelector("#trigger-"+n),m=e.querySelector("#options-"+n),E=e.querySelector("#icon-"+n),A=e.querySelector("#display-"+n);let d=!1;ne.addEventListener("click",t=>{ae.classList.contains("disabled")||(t.stopPropagation(),d=!d,m.classList.toggle("show",d),E.classList.toggle("rotate",d))}),m.querySelectorAll(".option").forEach(t=>{t.addEventListener("click",se=>{se.stopPropagation(),m.querySelectorAll(".option").forEach(w=>w.classList.remove("selected")),t.classList.add("selected");const S=t.querySelector(".opt-content");if(A.innerHTML=S?S.innerHTML:t.textContent,A.classList.remove("text-muted"),i[s]={value:t.dataset.value,label:t.dataset.label},h(),d=!1,m.classList.remove("show"),E.classList.remove("rotate"),C){const w=e.querySelector("#select-"+C),ie=e.querySelector("#display-"+C);w.classList.remove("disabled"),ie.textContent=ee||"Selecione...",c("✅ "+s.charAt(0).toUpperCase()+s.slice(1)+" selecionado! Próximo campo habilitado.","success")}else c("✅ "+s.charAt(0).toUpperCase()+s.slice(1)+" selecionado!","success")})})}p("area","area","matriz","Selecione a matriz..."),p("matriz","matriz","tematica","Selecione a temática..."),p("tematica","tematica","habilidades","Selecione habilidades..."),p("habilidades","habilidades",null,null);const W=e.querySelector("#btn-toggle"),K=e.querySelector("#advanced-filters"),X=e.querySelector("#toggle-icon"),Q=e.querySelector("#toggle-text");let l=!0;W.addEventListener("click",()=>{l=!l,K.classList.toggle("collapsed",!l),X.textContent=l?"expand_less":"expand_more",Q.textContent=l?"Menos filtros":"Mais filtros",c(l?"📂 Filtros expandidos":"📁 Filtros recolhidos","info")}),e.querySelector("#btn-limpar").addEventListener("click",n=>{n.preventDefault(),i.area=null,i.matriz=null,i.tematica=null,i.habilidades=[],i.busca="",e.querySelector("#display-area").innerHTML='<span class="text-muted">Selecione...</span>',e.querySelector("#display-matriz").innerHTML='<span class="text-muted">Selecione a área primeiro</span>',e.querySelector("#display-tematica").innerHTML='<span class="text-muted">Selecione a matriz primeiro</span>',e.querySelector("#display-habilidades").innerHTML='<span class="text-muted">Selecione a temática primeiro</span>',e.querySelector("#select-matriz").classList.add("disabled"),e.querySelector("#select-tematica").classList.add("disabled"),e.querySelector("#select-habilidades").classList.add("disabled"),e.querySelectorAll(".option.selected").forEach(s=>s.classList.remove("selected")),e.querySelector("#search-input").value="",h(),c("🧹 Formulário limpo!","warning")}),e.querySelector("#search-input").addEventListener("input",n=>{i.busca=n.target.value,h()}),e.addEventListener("click",n=>{n.target.closest(".e-select-wrapper")||(e.querySelectorAll(".options-container.show").forEach(s=>{s.classList.remove("show")}),e.querySelectorAll(".drop-icon.rotate").forEach(s=>{s.classList.remove("rotate")}))})}};var L,M,F;u.parameters={...u.parameters,docs:{...(L=u.parameters)==null?void 0:L.docs,source:{originalSource:`{
  name: 'Formulário Completo',
  render: () => \`
    \${filterFormCSS}
    <div class="filter-form-container">
      <div class="card">
        <div class="card-body">
          <!-- Row Principal -->
          <div class="row">
            <!-- Área de conhecimento -->
            <div class="col-auto">
              <div class="form-group">
                <label>Área de conhecimento</label>
                <div class="e-select-wrapper cursor-pointer" style="min-width: 215px;">
                  <div class="e-select-container" role="combobox" tabindex="0">
                    <div class="opt-content">
                      \${icons.math}
                      <span>Matemática</span>
                    </div>
                    <div class="icon-container">
                      <span class="material-symbols-outlined drop-icon">expand_more</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Campo de Busca -->
            <div class="col-md">
              <div class="form-group">
                <label><span style="visibility: hidden;">‍</span></label>
                <input type="text" class="autosuggest-input" placeholder="Pesquisar pelo nome do jogo ou conteúdo" />
              </div>
            </div>
          </div>

          <!-- Seção de Filtros Avançados -->
          <section class="expand-section">
            <div class="expand-content">
              <div class="row" style="align-items: flex-end;">
                <!-- Matriz/Currículo -->
                <div class="col-lg-3">
                  <div class="form-group">
                    <label>Matriz/Currículo</label>
                    <div class="e-select-wrapper cursor-pointer">
                      <div class="e-select-container" role="combobox" tabindex="0">
                        <span class="selected-option-single">Todos</span>
                        <div class="icon-container">
                          <span class="material-symbols-outlined drop-icon">expand_more</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Temática (Disabled) -->
                <div class="col-lg">
                  <div class="form-group">
                    <label>Temática</label>
                    <div class="e-select-wrapper cursor-pointer disabled">
                      <div class="e-select-container" role="combobox" aria-disabled="true" tabindex="0">
                        <span class="text-muted">Defina a matriz/currículo</span>
                        <div class="icon-container">
                          <span class="material-symbols-outlined drop-icon">expand_more</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Habilidades (Disabled) -->
                <div class="col-lg">
                  <div class="form-group">
                    <label>Habilidades</label>
                    <div class="e-select-wrapper cursor-pointer disabled">
                      <div class="e-select-container" role="combobox" aria-disabled="true" tabindex="0">
                        <span class="text-muted">Defina a matriz/currículo e uma temática</span>
                        <div class="icon-container">
                          <span class="material-symbols-outlined drop-icon">expand_more</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Ações -->
              <div class="filter-actions">
                <a href="#" class="clear-link">
                  <span class="material-symbols-outlined" style="font-size: 18px;">cancel</span>
                  Limpar busca
                </a>
              </div>
            </div>

            <!-- Toggle -->
            <div class="toggle-filters">
              <button class="toggle-btn">
                <span class="material-symbols-outlined" style="font-size: 16px;">filter_alt_off</span>
                <span>Menos filtros</span>
                <span class="material-symbols-outlined" style="font-size: 16px;">keyboard_arrow_up</span>
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  \`
}`,...(F=(M=u.parameters)==null?void 0:M.docs)==null?void 0:F.source}}};var k,z,D;v.parameters={...v.parameters,docs:{...(k=v.parameters)==null?void 0:k.docs,source:{originalSource:`{
  name: 'Dropdown Aberto',
  render: () => \`
    \${filterFormCSS}
    <div class="filter-form-container">
      <div class="card">
        <div class="card-body" style="min-height: 350px;">
          <div class="row">
            <div class="col-auto">
              <div class="form-group">
                <label>Área de conhecimento</label>
                <div class="e-select-wrapper cursor-pointer" style="min-width: 215px;">
                  <div class="e-select-container" role="combobox" tabindex="0" style="border-color: var(--edu-primary);">
                    <div class="opt-content">
                      \${icons.math}
                      <span>Matemática</span>
                    </div>
                    <div class="icon-container">
                      <span class="material-symbols-outlined drop-icon rotate">expand_more</span>
                    </div>
                  </div>
                  <ul class="options-container show">
                    <li class="option selected">
                      <div class="opt-content">
                        \${icons.math}
                        <span>Matemática</span>
                      </div>
                    </li>
                    <li class="option">
                      <div class="opt-content">
                        \${icons.portuguese}
                        <span>Língua Portuguesa</span>
                      </div>
                    </li>
                    <li class="option">
                      <div class="opt-content">
                        \${icons.owls}
                        <span>Liga das Corujinhas</span>
                      </div>
                    </li>
                    <li class="option">
                      <div class="opt-content">
                        \${icons.mathEnglish}
                        <span>Matemática Inglês</span>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="col-md">
              <div class="form-group">
                <label><span style="visibility: hidden;">‍</span></label>
                <input type="text" class="autosuggest-input" placeholder="Pesquisar pelo nome do jogo ou conteúdo" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  \`
}`,...(D=(z=v.parameters)==null?void 0:z.docs)==null?void 0:D.source}}};var B,H,_;b.parameters={...b.parameters,docs:{...(B=b.parameters)==null?void 0:B.docs,source:{originalSource:`{
  name: 'Filtros Ativos',
  render: () => \`
    \${filterFormCSS}
    <div class="filter-form-container">
      <div class="card">
        <div class="card-body">
          <div class="row">
            <div class="col-auto">
              <div class="form-group">
                <label>Área de conhecimento</label>
                <div class="e-select-wrapper cursor-pointer" style="min-width: 215px;">
                  <div class="e-select-container" role="combobox" tabindex="0">
                    <div class="opt-content">
                      \${icons.math}
                      <span>Matemática</span>
                    </div>
                    <div class="icon-container">
                      <span class="material-symbols-outlined drop-icon">expand_more</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-md">
              <div class="form-group">
                <label><span style="visibility: hidden;">‍</span></label>
                <input type="text" class="autosuggest-input" value="Frações" />
              </div>
            </div>
          </div>

          <section class="expand-section">
            <div class="expand-content">
              <div class="row" style="align-items: flex-end;">
                <div class="col-lg-3">
                  <div class="form-group">
                    <label>Matriz/Currículo</label>
                    <div class="e-select-wrapper cursor-pointer">
                      <div class="e-select-container" role="combobox" tabindex="0">
                        <span class="selected-option-single">BNCC 5º Ano</span>
                        <div class="icon-container">
                          <span class="material-symbols-outlined drop-icon">expand_more</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="col-lg">
                  <div class="form-group">
                    <label>Temática</label>
                    <div class="e-select-wrapper cursor-pointer">
                      <div class="e-select-container" role="combobox" tabindex="0">
                        <span class="selected-option-single">Números e Operações</span>
                        <div class="icon-container">
                          <span class="material-symbols-outlined drop-icon">expand_more</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="col-lg">
                  <div class="form-group">
                    <label>Habilidades</label>
                    <div class="e-select-wrapper cursor-pointer">
                      <div class="e-select-container" role="combobox" tabindex="0">
                        <span class="badge-selection">3 selecionadas</span>
                        <div class="icon-container">
                          <span class="material-symbols-outlined drop-icon">expand_more</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="filter-actions">
                <a href="#" class="clear-link">
                  <span class="material-symbols-outlined" style="font-size: 18px;">cancel</span>
                  Limpar busca
                </a>
              </div>
            </div>

            <div class="toggle-filters">
              <button class="toggle-btn">
                <span class="material-symbols-outlined" style="font-size: 16px;">filter_alt_off</span>
                <span>Menos filtros</span>
                <span class="material-symbols-outlined" style="font-size: 16px;">keyboard_arrow_up</span>
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  \`
}`,...(_=(H=b.parameters)==null?void 0:H.docs)==null?void 0:_.source}}};var q,T,P;g.parameters={...g.parameters,docs:{...(q=g.parameters)==null?void 0:q.docs,source:{originalSource:`{
  name: 'Filtros Recolhidos',
  render: () => \`
    \${filterFormCSS}
    <div class="filter-form-container">
      <div class="card">
        <div class="card-body">
          <div class="row">
            <div class="col-auto">
              <div class="form-group" style="margin-bottom: 0;">
                <label>Área de conhecimento</label>
                <div class="e-select-wrapper cursor-pointer" style="min-width: 215px;">
                  <div class="e-select-container" role="combobox" tabindex="0">
                    <div class="opt-content">
                      \${icons.math}
                      <span>Matemática</span>
                    </div>
                    <div class="icon-container">
                      <span class="material-symbols-outlined drop-icon">expand_more</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-md">
              <div class="form-group" style="margin-bottom: 0;">
                <label><span style="visibility: hidden;">‍</span></label>
                <input type="text" class="autosuggest-input" placeholder="Pesquisar pelo nome do jogo ou conteúdo" />
              </div>
            </div>
          </div>

          <section class="expand-section">
            <div class="expand-content collapsed"></div>
            <div class="toggle-filters">
              <button class="toggle-btn">
                <span class="material-symbols-outlined" style="font-size: 16px;">filter_alt</span>
                <span>Mais filtros</span>
                <span class="material-symbols-outlined" style="font-size: 16px;">keyboard_arrow_down</span>
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  \`
}`,...(P=(T=g.parameters)==null?void 0:T.docs)==null?void 0:P.source}}};var N,V,$;x.parameters={...x.parameters,docs:{...(N=x.parameters)==null?void 0:N.docs,source:{originalSource:`{
  name: 'Anatomia',
  render: () => \`
    \${filterFormCSS}
    <style>
      .anatomy-container {
        padding: 2rem;
        background: #f5f7fa;
      }
      .anatomy-label {
        position: absolute;
        background: #ea5455;
        color: white;
        padding: 0.25rem 0.5rem;
        border-radius: 4px;
        font-size: 0.75rem;
        font-weight: 600;
        z-index: 100;
        white-space: nowrap;
      }
      .anatomy-box {
        position: relative;
        border: 2px dashed #ea5455;
        border-radius: 8px;
        padding: 0.5rem;
        margin: 0.25rem;
      }
      .info-table {
        width: 100%;
        border-collapse: collapse;
        margin-top: 2rem;
        background: white;
        border-radius: 8px;
        overflow: hidden;
      }
      .info-table th, .info-table td {
        padding: 0.75rem 1rem;
        text-align: left;
        border-bottom: 1px solid #eee;
      }
      .info-table th {
        background: var(--edu-primary);
        color: white;
        font-weight: 600;
      }
      .info-table tr:last-child td { border-bottom: none; }
      .info-table .badge {
        display: inline-block;
        padding: 0.25rem 0.5rem;
        border-radius: 4px;
        font-size: 0.75rem;
        font-weight: 600;
      }
      .badge-required { background: #ea5455; color: white; }
      .badge-optional { background: #28c76f; color: white; }
      .badge-cascade { background: #ff9f43; color: white; }
    </style>

    <div class="anatomy-container">
      <h3 style="margin-bottom: 1.5rem; color: var(--edu-text);">📋 Anatomia do FilterForm</h3>

      <div class="card" style="margin: 0; position: relative;">
        <div class="anatomy-box" style="margin: 0;">
          <span class="anatomy-label" style="top: -12px; left: 10px;">Card Container</span>

          <div class="card-body" style="position: relative;">
            <span class="anatomy-label" style="top: 5px; right: 10px;">Card Body</span>

            <div class="row" style="position: relative;">
              <span class="anatomy-label" style="top: -10px; left: 50%; transform: translateX(-50%);">Row Principal</span>

              <div class="col-auto">
                <div class="anatomy-box">
                  <span class="anatomy-label" style="top: -10px; left: 5px;">1. Área de Conhecimento</span>
                  <div class="form-group" style="margin-bottom: 0;">
                    <label>Área de conhecimento</label>
                    <div class="e-select-wrapper cursor-pointer" style="min-width: 200px;">
                      <div class="e-select-container">
                        <div class="opt-content">
                          \${icons.math}
                          <span>Matemática</span>
                        </div>
                        <div class="icon-container">
                          <span class="material-symbols-outlined drop-icon">expand_more</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="col-md">
                <div class="anatomy-box">
                  <span class="anatomy-label" style="top: -10px; left: 5px;">2. Campo de Busca</span>
                  <div class="form-group" style="margin-bottom: 0;">
                    <label><span style="visibility: hidden;">‍</span></label>
                    <input type="text" class="autosuggest-input" placeholder="Pesquisar..." />
                  </div>
                </div>
              </div>
            </div>

            <section class="expand-section" style="position: relative; margin-top: 1rem;">
              <div class="anatomy-box">
                <span class="anatomy-label" style="top: -10px; left: 5px;">Filtros Avançados (Expansível)</span>

                <div class="row" style="align-items: flex-end;">
                  <div class="col-lg-3">
                    <div class="anatomy-box" style="border-color: #ff9f43;">
                      <span class="anatomy-label" style="background: #ff9f43; top: -10px; left: 5px;">3. Matriz</span>
                      <div class="form-group" style="margin-bottom: 0;">
                        <label>Matriz/Currículo</label>
                        <div class="e-select-wrapper cursor-pointer">
                          <div class="e-select-container">
                            <span>Todos</span>
                            <div class="icon-container">
                              <span class="material-symbols-outlined drop-icon">expand_more</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="col-lg">
                    <div class="anatomy-box" style="border-color: #ff9f43;">
                      <span class="anatomy-label" style="background: #ff9f43; top: -10px; left: 5px;">4. Temática (cascata)</span>
                      <div class="form-group" style="margin-bottom: 0;">
                        <label>Temática</label>
                        <div class="e-select-wrapper disabled">
                          <div class="e-select-container">
                            <span class="text-muted">Depende de Matriz</span>
                            <div class="icon-container">
                              <span class="material-symbols-outlined drop-icon">expand_more</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="col-lg">
                    <div class="anatomy-box" style="border-color: #ff9f43;">
                      <span class="anatomy-label" style="background: #ff9f43; top: -10px; left: 5px;">5. Habilidades (cascata)</span>
                      <div class="form-group" style="margin-bottom: 0;">
                        <label>Habilidades</label>
                        <div class="e-select-wrapper disabled">
                          <div class="e-select-container">
                            <span class="text-muted">Depende de Temática</span>
                            <div class="icon-container">
                              <span class="material-symbols-outlined drop-icon">expand_more</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="row" style="margin-top: 1rem;">
                  <div class="col-md" style="text-align: right;">
                    <div class="anatomy-box" style="display: inline-block; border-color: #28c76f;">
                      <span class="anatomy-label" style="background: #28c76f; top: -10px; left: 5px;">6. Limpar</span>
                      <a href="#" class="clear-link">
                        <span class="material-symbols-outlined" style="font-size: 18px;">cancel</span>
                        Limpar busca
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div class="anatomy-box" style="margin-top: 0.5rem; border-color: #6e63e8;">
                <span class="anatomy-label" style="background: #6e63e8; top: -10px; left: 5px;">7. Toggle</span>
                <div class="toggle-filters" style="padding: 0.25rem 0;">
                  <button class="toggle-btn">
                    <span class="material-symbols-outlined" style="font-size: 16px;">filter_alt_off</span>
                    <span>Menos filtros</span>
                    <span class="material-symbols-outlined" style="font-size: 16px;">keyboard_arrow_up</span>
                  </button>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>

      <table class="info-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Campo</th>
            <th>Tipo</th>
            <th>Dependência</th>
            <th>Obrigatório</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Área de conhecimento</td>
            <td>ESelect com ícones SVG</td>
            <td>-</td>
            <td><span class="badge badge-required">Sim</span></td>
          </tr>
          <tr>
            <td>2</td>
            <td>Busca</td>
            <td>AutoSuggest (input)</td>
            <td>-</td>
            <td><span class="badge badge-optional">Não</span></td>
          </tr>
          <tr>
            <td>3</td>
            <td>Matriz/Currículo</td>
            <td>ESelect simples</td>
            <td>-</td>
            <td><span class="badge badge-optional">Não</span></td>
          </tr>
          <tr>
            <td>4</td>
            <td>Temática</td>
            <td>ESelect simples</td>
            <td><span class="badge badge-cascade">Matriz</span></td>
            <td><span class="badge badge-optional">Não</span></td>
          </tr>
          <tr>
            <td>5</td>
            <td>Habilidades</td>
            <td>ESelect múltiplo</td>
            <td><span class="badge badge-cascade">Temática</span></td>
            <td><span class="badge badge-optional">Não</span></td>
          </tr>
          <tr>
            <td>6</td>
            <td>Limpar busca</td>
            <td>Link/Ação</td>
            <td>-</td>
            <td>-</td>
          </tr>
          <tr>
            <td>7</td>
            <td>Toggle filtros</td>
            <td>Botão</td>
            <td>-</td>
            <td>-</td>
          </tr>
        </tbody>
      </table>
    </div>
  \`
}`,...($=(V=x.parameters)==null?void 0:V.docs)==null?void 0:$.source}}};var Z,O,I;f.parameters={...f.parameters,docs:{...(Z=f.parameters)==null?void 0:Z.docs,source:{originalSource:`{
  name: 'Opções dos Dropdowns',
  render: () => \`
    \${filterFormCSS}
    <style>
      .options-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 1.5rem;
        padding: 2rem;
        background: #f5f7fa;
      }
      .options-card {
        background: white;
        border-radius: 8px;
        overflow: hidden;
        box-shadow: 0 2px 8px rgba(0,0,0,0.08);
      }
      .options-card-header {
        background: var(--edu-primary);
        color: white;
        padding: 0.75rem 1rem;
        font-weight: 600;
      }
      .options-list {
        list-style: none;
        padding: 0;
        margin: 0;
        max-height: 300px;
        overflow-y: auto;
      }
      .options-list li {
        padding: 0.5rem 1rem;
        border-bottom: 1px solid #eee;
        display: flex;
        align-items: center;
        gap: 0.5rem;
      }
      .options-list li:last-child { border-bottom: none; }
      .options-list li.selected { background: rgba(110, 99, 232, 0.08); }
    </style>

    <div class="options-grid">
      <!-- Área de Conhecimento -->
      <div class="options-card">
        <div class="options-card-header">📚 Área de Conhecimento</div>
        <ul class="options-list">
          <li class="selected">
            \${icons.math}
            <span>Matemática</span>
          </li>
          <li>
            \${icons.portuguese}
            <span>Língua Portuguesa</span>
          </li>
          <li>
            \${icons.owls}
            <span>Liga das Corujinhas</span>
          </li>
          <li>
            \${icons.mathEnglish}
            <span>Matemática Inglês</span>
          </li>
        </ul>
      </div>

      <!-- Matriz/Currículo -->
      <div class="options-card">
        <div class="options-card-header">📋 Matriz/Currículo</div>
        <ul class="options-list">
          <li class="selected">Todos</li>
          <li>BNCC 1º Ano</li>
          <li>BNCC 2º Ano</li>
          <li>BNCC 3º Ano</li>
          <li>BNCC 4º Ano</li>
          <li>BNCC 5º Ano</li>
          <li>BNCC 6º Ano</li>
          <li>BNCC 7º Ano</li>
          <li>BNCC 8º Ano</li>
          <li>BNCC 9º Ano</li>
          <li>Currículo Paulista 1º Ano</li>
          <li>Currículo Paulista 2º Ano</li>
          <li>Currículo paulista 3º Ano</li>
          <li>Currículo paulista 4º Ano</li>
          <li>Currículo paulista 5º Ano</li>
          <li>Currículo paulista 6º Ano</li>
          <li>Currículo Paulista 7º Ano</li>
          <li>Currículo Paulista 8º Ano</li>
          <li>Currículo Paulista 9º Ano</li>
        </ul>
      </div>

      <!-- Estados dos Campos -->
      <div class="options-card">
        <div class="options-card-header">🔄 Estados dos Campos</div>
        <ul class="options-list">
          <li style="background: #e8f5e9;">
            <span style="color: #28c76f;">●</span>
            <strong>Habilitado:</strong> Campo disponível
          </li>
          <li style="background: #ffebee;">
            <span style="color: #ea5455;">●</span>
            <strong>Desabilitado:</strong> Depende de outro campo
          </li>
          <li style="background: #e3f2fd;">
            <span style="color: #6e63e8;">●</span>
            <strong>Selecionado:</strong> Opção ativa
          </li>
          <li style="background: #fff3e0;">
            <span style="color: #ff9f43;">●</span>
            <strong>Cascata:</strong> Aguardando dependência
          </li>
        </ul>
      </div>
    </div>
  \`
}`,...(I=(O=f.parameters)==null?void 0:O.docs)==null?void 0:I.source}}};var j,R,G,U,Y;r.parameters={...r.parameters,docs:{...(j=r.parameters)==null?void 0:j.docs,source:{originalSource:`{
  name: '🎮 Interativo',
  parameters: {
    docs: {
      description: {
        story: \`
### Demo Interativo do Formulário de Filtros

Clique nos dropdowns para ver as dependências cascateadas em ação:
- **Área de conhecimento** → sempre habilitado
- **Matriz/Currículo** → habilita após selecionar área
- **Temática** → habilita após selecionar matriz
- **Habilidades** → habilita após selecionar temática
        \`
      }
    }
  },
  render: () => \`
    \${filterFormCSS}
    <style>
      .demo-feedback {
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: #333;
        color: white;
        padding: 12px 20px;
        border-radius: 8px;
        font-size: 14px;
        opacity: 0;
        transform: translateY(20px);
        transition: all 0.3s ease;
        z-index: 9999;
      }
      .demo-feedback.show {
        opacity: 1;
        transform: translateY(0);
      }
      .demo-feedback.success { background: #28c76f; }
      .demo-feedback.info { background: #6e63e8; }
      .demo-feedback.warning { background: #ff9f43; }
    </style>

    <div class="filter-form-container" id="interactive-form">
      <div class="card">
        <div class="card-body">
          <!-- Row Principal -->
          <div class="row">
            <!-- Área de conhecimento -->
            <div class="col-auto">
              <div class="form-group">
                <label>Área de conhecimento</label>
                <div class="e-select-wrapper cursor-pointer" id="select-area" style="min-width: 215px;">
                  <div class="e-select-container" role="combobox" tabindex="0" id="trigger-area">
                    <div class="opt-content" id="display-area">
                      <span class="text-muted">Selecione...</span>
                    </div>
                    <div class="icon-container">
                      <span class="material-symbols-outlined drop-icon" id="icon-area">expand_more</span>
                    </div>
                  </div>
                  <ul role="listbox" class="options-container" id="options-area">
                    <li class="option" data-value="math" data-label="Matemática">
                      <div class="opt-content">
                        \${icons.math}
                        <span>Matemática</span>
                      </div>
                    </li>
                    <li class="option" data-value="port" data-label="Língua Portuguesa">
                      <div class="opt-content">
                        \${icons.portuguese}
                        <span>Língua Portuguesa</span>
                      </div>
                    </li>
                    <li class="option" data-value="owls" data-label="Liga das Corujinhas">
                      <div class="opt-content">
                        \${icons.owls}
                        <span>Liga das Corujinhas</span>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <!-- Campo de Busca -->
            <div class="col-md">
              <div class="form-group">
                <label><span style="visibility: hidden;">‍</span></label>
                <input type="text" class="autosuggest-input" id="search-input" placeholder="Pesquisar pelo nome do jogo ou conteúdo" />
              </div>
            </div>
          </div>

          <!-- Seção de Filtros Avançados -->
          <section class="expand-section">
            <div class="expand-content" id="advanced-filters">
              <div class="row" style="align-items: flex-end;">
                <!-- Matriz/Currículo -->
                <div class="col-lg-3">
                  <div class="form-group">
                    <label>Matriz/Currículo</label>
                    <div class="e-select-wrapper cursor-pointer disabled" id="select-matriz">
                      <div class="e-select-container" role="combobox" tabindex="0" id="trigger-matriz">
                        <span class="text-muted" id="display-matriz">Selecione a área primeiro</span>
                        <div class="icon-container">
                          <span class="material-symbols-outlined drop-icon" id="icon-matriz">expand_more</span>
                        </div>
                      </div>
                      <ul role="listbox" class="options-container" id="options-matriz">
                        <li class="option" data-value="todos" data-label="Todos"><span>Todos</span></li>
                        <li class="option" data-value="bncc1" data-label="BNCC 1º Ano"><span>BNCC 1º Ano</span></li>
                        <li class="option" data-value="bncc2" data-label="BNCC 2º Ano"><span>BNCC 2º Ano</span></li>
                        <li class="option" data-value="bncc3" data-label="BNCC 3º Ano"><span>BNCC 3º Ano</span></li>
                        <li class="option" data-value="cp1" data-label="Currículo Paulista 1º Ano"><span>Currículo Paulista 1º Ano</span></li>
                        <li class="option" data-value="cp2" data-label="Currículo Paulista 2º Ano"><span>Currículo Paulista 2º Ano</span></li>
                      </ul>
                    </div>
                  </div>
                </div>

                <!-- Temática -->
                <div class="col-lg">
                  <div class="form-group">
                    <label>Temática</label>
                    <div class="e-select-wrapper cursor-pointer disabled" id="select-tematica">
                      <div class="e-select-container" role="combobox" tabindex="0" id="trigger-tematica">
                        <span class="text-muted" id="display-tematica">Selecione a matriz primeiro</span>
                        <div class="icon-container">
                          <span class="material-symbols-outlined drop-icon" id="icon-tematica">expand_more</span>
                        </div>
                      </div>
                      <ul role="listbox" class="options-container" id="options-tematica">
                        <li class="option" data-value="num" data-label="Números"><span>Números</span></li>
                        <li class="option" data-value="geo" data-label="Geometria"><span>Geometria</span></li>
                        <li class="option" data-value="med" data-label="Grandezas e Medidas"><span>Grandezas e Medidas</span></li>
                        <li class="option" data-value="prob" data-label="Probabilidade"><span>Probabilidade</span></li>
                        <li class="option" data-value="alg" data-label="Álgebra"><span>Álgebra</span></li>
                      </ul>
                    </div>
                  </div>
                </div>

                <!-- Habilidades -->
                <div class="col-lg">
                  <div class="form-group">
                    <label>Habilidades</label>
                    <div class="e-select-wrapper cursor-pointer disabled" id="select-habilidades">
                      <div class="e-select-container" role="combobox" tabindex="0" id="trigger-habilidades">
                        <span class="text-muted" id="display-habilidades">Selecione a temática primeiro</span>
                        <div class="icon-container">
                          <span class="material-symbols-outlined drop-icon" id="icon-habilidades">expand_more</span>
                        </div>
                      </div>
                      <ul role="listbox" class="options-container" id="options-habilidades">
                        <li class="option" data-value="h1" data-label="EF01MA01"><span>EF01MA01 - Utilizar números naturais</span></li>
                        <li class="option" data-value="h2" data-label="EF01MA02"><span>EF01MA02 - Contar de maneira exata</span></li>
                        <li class="option" data-value="h3" data-label="EF01MA03"><span>EF01MA03 - Estimar e comparar</span></li>
                        <li class="option" data-value="h4" data-label="EF01MA04"><span>EF01MA04 - Contar elementos de coleção</span></li>
                      </ul>
                    </div>
                  </div>
                </div>

                <!-- Ações -->
                <div class="col-auto" style="display: flex; align-items: flex-end; padding-bottom: 1rem;">
                  <a href="#" class="clear-link" id="btn-limpar">
                    <span class="material-symbols-outlined" style="font-size: 18px;">close</span>
                    Limpar busca
                  </a>
                </div>
              </div>
            </div>

            <!-- Toggle -->
            <div class="toggle-filters">
              <button class="toggle-btn" id="btn-toggle">
                <span class="material-symbols-outlined" id="toggle-icon" style="font-size: 18px;">expand_more</span>
                <span id="toggle-text">Menos filtros</span>
              </button>
            </div>
          </section>
        </div>
      </div>
      
      <!-- Estado atual -->
      <div style="margin: 1rem 1.5rem; padding: 1rem; background: white; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.08);">
        <strong style="color: #5e5873; font-size: 0.9rem;">📊 Estado atual do formulário:</strong>
        <pre id="form-state" style="margin-top: 0.5rem; font-size: 0.85rem; color: #6e63e8; background: #f8f8f8; padding: 1rem; border-radius: 6px; overflow-x: auto;">{
  "area": null,
  "matriz": null,
  "tematica": null,
  "habilidades": [],
  "busca": ""
}</pre>
      </div>
    </div>
    
    <div class="demo-feedback" id="feedback"></div>
  \`,
  play: async ({
    canvasElement
  }) => {
    // Estado do formulário
    const state = {
      area: null,
      matriz: null,
      tematica: null,
      habilidades: [],
      busca: ''
    };

    // Elementos
    const feedback = canvasElement.querySelector('#feedback');
    const formState = canvasElement.querySelector('#form-state');

    // Feedback helper
    function showFeedback(message, type = 'info') {
      feedback.textContent = message;
      feedback.className = 'demo-feedback show ' + type;
      setTimeout(() => feedback.classList.remove('show'), 2500);
    }

    // Atualizar estado visual
    function updateStateDisplay() {
      formState.textContent = JSON.stringify(state, null, 2);
    }

    // Criar handler para select
    function createSelectHandler(id, stateKey, nextSelectId, nextPlaceholder) {
      const wrapper = canvasElement.querySelector('#select-' + id);
      const trigger = canvasElement.querySelector('#trigger-' + id);
      const options = canvasElement.querySelector('#options-' + id);
      const icon = canvasElement.querySelector('#icon-' + id);
      const display = canvasElement.querySelector('#display-' + id);
      let isOpen = false;
      trigger.addEventListener('click', e => {
        if (wrapper.classList.contains('disabled')) return;
        e.stopPropagation();
        isOpen = !isOpen;
        options.classList.toggle('show', isOpen);
        icon.classList.toggle('rotate', isOpen);
      });
      options.querySelectorAll('.option').forEach(opt => {
        opt.addEventListener('click', e => {
          e.stopPropagation();

          // Atualizar seleção visual
          options.querySelectorAll('.option').forEach(o => o.classList.remove('selected'));
          opt.classList.add('selected');

          // Atualizar display
          const content = opt.querySelector('.opt-content');
          display.innerHTML = content ? content.innerHTML : opt.textContent;
          display.classList.remove('text-muted');

          // Atualizar estado
          state[stateKey] = {
            value: opt.dataset.value,
            label: opt.dataset.label
          };
          updateStateDisplay();

          // Fechar dropdown
          isOpen = false;
          options.classList.remove('show');
          icon.classList.remove('rotate');

          // Habilitar próximo select
          if (nextSelectId) {
            const nextWrapper = canvasElement.querySelector('#select-' + nextSelectId);
            const nextDisplay = canvasElement.querySelector('#display-' + nextSelectId);
            nextWrapper.classList.remove('disabled');
            nextDisplay.textContent = nextPlaceholder || 'Selecione...';
            showFeedback('✅ ' + stateKey.charAt(0).toUpperCase() + stateKey.slice(1) + ' selecionado! Próximo campo habilitado.', 'success');
          } else {
            showFeedback('✅ ' + stateKey.charAt(0).toUpperCase() + stateKey.slice(1) + ' selecionado!', 'success');
          }
        });
      });
    }

    // Inicializar selects
    createSelectHandler('area', 'area', 'matriz', 'Selecione a matriz...');
    createSelectHandler('matriz', 'matriz', 'tematica', 'Selecione a temática...');
    createSelectHandler('tematica', 'tematica', 'habilidades', 'Selecione habilidades...');
    createSelectHandler('habilidades', 'habilidades', null, null);

    // Toggle filtros avançados
    const toggleBtn = canvasElement.querySelector('#btn-toggle');
    const advancedFilters = canvasElement.querySelector('#advanced-filters');
    const toggleIcon = canvasElement.querySelector('#toggle-icon');
    const toggleText = canvasElement.querySelector('#toggle-text');
    let filtersExpanded = true;
    toggleBtn.addEventListener('click', () => {
      filtersExpanded = !filtersExpanded;
      advancedFilters.classList.toggle('collapsed', !filtersExpanded);
      toggleIcon.textContent = filtersExpanded ? 'expand_less' : 'expand_more';
      toggleText.textContent = filtersExpanded ? 'Menos filtros' : 'Mais filtros';
      showFeedback(filtersExpanded ? '📂 Filtros expandidos' : '📁 Filtros recolhidos', 'info');
    });

    // Limpar busca
    canvasElement.querySelector('#btn-limpar').addEventListener('click', e => {
      e.preventDefault();

      // Resetar estado
      state.area = null;
      state.matriz = null;
      state.tematica = null;
      state.habilidades = [];
      state.busca = '';

      // Resetar visuais
      canvasElement.querySelector('#display-area').innerHTML = '<span class="text-muted">Selecione...</span>';
      canvasElement.querySelector('#display-matriz').innerHTML = '<span class="text-muted">Selecione a área primeiro</span>';
      canvasElement.querySelector('#display-tematica').innerHTML = '<span class="text-muted">Selecione a matriz primeiro</span>';
      canvasElement.querySelector('#display-habilidades').innerHTML = '<span class="text-muted">Selecione a temática primeiro</span>';

      // Desabilitar campos dependentes
      canvasElement.querySelector('#select-matriz').classList.add('disabled');
      canvasElement.querySelector('#select-tematica').classList.add('disabled');
      canvasElement.querySelector('#select-habilidades').classList.add('disabled');

      // Limpar seleções
      canvasElement.querySelectorAll('.option.selected').forEach(o => o.classList.remove('selected'));

      // Limpar busca
      canvasElement.querySelector('#search-input').value = '';
      updateStateDisplay();
      showFeedback('🧹 Formulário limpo!', 'warning');
    });

    // Campo de busca
    canvasElement.querySelector('#search-input').addEventListener('input', e => {
      state.busca = e.target.value;
      updateStateDisplay();
    });

    // Fechar dropdowns ao clicar fora
    canvasElement.addEventListener('click', e => {
      if (!e.target.closest('.e-select-wrapper')) {
        canvasElement.querySelectorAll('.options-container.show').forEach(opt => {
          opt.classList.remove('show');
        });
        canvasElement.querySelectorAll('.drop-icon.rotate').forEach(icon => {
          icon.classList.remove('rotate');
        });
      }
    });
  }
}`,...(G=(R=r.parameters)==null?void 0:R.docs)==null?void 0:G.source},description:{story:`Story Interativa - FilterForm com JavaScript
Demonstra dependências cascateadas e comportamento real`,...(Y=(U=r.parameters)==null?void 0:U.docs)==null?void 0:Y.description}}};const oe=["Complete","DropdownOpened","FiltersActive","FiltersCollapsed","Anatomy","DropdownOptions","Interactive"];export{x as Anatomy,u as Complete,v as DropdownOpened,f as DropdownOptions,b as FiltersActive,g as FiltersCollapsed,r as Interactive,oe as __namedExportsOrder,te as default};
