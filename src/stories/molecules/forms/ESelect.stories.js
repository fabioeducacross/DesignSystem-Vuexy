/**
 * ESelect Component - Educacross Custom Select/Dropdown
 *
 * @component ESelect
 * @category Molecules/Forms
 * @status DONE
 * @since 1.0.0
 */

export default {
  title: 'Vuexy/Molecules/Forms/ESelect',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
## ESelect - Select Customizado Educacross

Um componente de select/dropdown customizado com recursos avançados:

- **Ícones nas opções** - Suporte a ícones SVG
- **Busca integrada** - Campo de pesquisa opcional
- **Seleção múltipla** - Badges para múltiplas seleções
- **Variantes de cor** - Primary, success, warning, danger
- **Estado desabilitado** - Estilo visual para campos desabilitados
        `,
      },
    },
  },
};

// CSS do ESelect
const eSelectCSS = `
<style>
  :root {
    --edu-primary: #6e63e8;
    --edu-success: #28c76f;
    --edu-warning: #ff9f43;
    --edu-danger: #ea5455;
    --edu-text: #6e6b7b;
    --edu-text-muted: #b9b9c3;
    --edu-border: #d8d6de;
    --edu-bg-light: #f8f8f8;
    --edu-white: #fff;
  }

  .e-select-wrapper {
    position: relative;
    width: 100%;
  }

  .e-select-wrapper.cursor-pointer {
    cursor: pointer;
  }

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
    overflow: hidden;
    display: flex;
    flex-direction: row;
    align-items: center;
    padding-right: 30px;
    flex-wrap: nowrap;
    min-height: 38px;
    padding: 0.438rem 2rem 0.438rem 1rem;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.45;
    color: var(--edu-text);
    background-color: var(--edu-white);
    background-clip: padding-box;
    border: 1px solid var(--edu-border);
    border-radius: 0.357rem;
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  }

  .e-select-container:focus,
  .e-select-container:focus-within {
    border-color: var(--e-select-variant, var(--edu-primary));
    box-shadow: 0 3px 10px 0 rgba(110, 99, 232, 0.1);
    outline: none;
  }

  .selected-option-single {
    max-width: calc(100% - 30px);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: var(--edu-text);
  }

  .e-select-container .text-muted {
    color: var(--edu-text-muted) !important;
  }

  .selected-options-badge {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 5px;
  }

  .selected-options-badge .badge {
    display: inline-flex;
    align-items: center;
    padding: 0.35rem 0.6rem;
    font-size: 0.85rem;
    font-weight: 500;
    border-radius: 0.357rem;
  }

  .selected-options-badge .badge-primary {
    background-color: rgba(110, 99, 232, 0.12);
    color: var(--edu-primary);
  }

  .selected-options-badge .badge-success {
    background-color: rgba(40, 199, 111, 0.12);
    color: var(--edu-success);
  }

  .selected-options-badge .badge-warning {
    background-color: rgba(255, 159, 67, 0.12);
    color: var(--edu-warning);
  }

  .selected-options-badge .badge-danger {
    background-color: rgba(234, 84, 85, 0.12);
    color: var(--edu-danger);
  }

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
    color: var(--edu-text-muted);
  }

  .drop-icon.revert-drop-icon {
    transform: rotate(180deg);
  }

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
    border: 1px solid var(--edu-border);
    border-radius: 0.357rem;
    background-color: var(--edu-white);
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

  .option {
    cursor: pointer;
    position: relative;
    min-height: 38px;
    display: flex;
    align-items: center;
    border: 1px solid transparent;
    border-radius: 0;
    margin: 0;
    color: var(--edu-text);
    transition: background-color 0.15s ease;
    padding: 0 15px 0 1rem;
  }

  .option:hover {
    background-color: var(--edu-bg-light);
  }

  .option:first-of-type {
    border-top-left-radius: 0.357rem;
    border-top-right-radius: 0.357rem;
  }

  .option:last-of-type {
    border-bottom-left-radius: 0.357rem;
    border-bottom-right-radius: 0.357rem;
  }

  .option.selected {
    background-color: rgba(110, 99, 232, 0.08);
  }

  .option.bg-light-primary {
    background-color: rgba(110, 99, 232, 0.12) !important;
  }

  .option .opt-content {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .form-group label {
    display: block;
    margin-bottom: 0.2857rem;
    font-size: 0.857rem;
    color: var(--edu-text);
  }

  .demo-container {
    padding: 2rem;
    background: linear-gradient(135deg, #f5f7fa 0%, #e4e8ec 100%);
    border-radius: 8px;
    min-height: 200px;
  }

  .demo-row {
    display: flex;
    flex-wrap: wrap;
    gap: 1.5rem;
    margin-bottom: 1.5rem;
  }

  .demo-col {
    flex: 1;
    min-width: 200px;
    max-width: 300px;
  }
</style>
`;

// ============================================================================
// ÍCONES OFICIAIS - Assets/Áreas de conhecimento
// ============================================================================

/**
 * Ícone Matemática - Cor #00BDB8 (Cyan/Turquesa)
 * Arquivo original: Assets/Áreas de conhecimento/Matemática.svg
 */
const iconMath = `<svg width="32" height="32" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="44" height="44" rx="5" fill="#00BDB8"/>
<path d="M16.9278 29.7H18.4556V27.0111H21.1444V25.4833H18.4556V22.7944H16.9278V25.4833H14.2389V27.0111H16.9278V29.7ZM23.4972 28.6306H29.6389V27.1333H23.4972V28.6306ZM23.4972 25.3611H29.6389V23.8333H23.4972V25.3611ZM24.6278 20.3806L26.4917 18.5167L28.3556 20.3806L29.4556 19.2806L27.5917 17.4167L29.4556 15.5528L28.3556 14.4528L26.4917 16.3167L24.6278 14.4528L23.5278 15.5528L25.3917 17.4167L23.5278 19.2806L24.6278 20.3806ZM14.6972 18.1806H20.6861V16.6528H14.6972V18.1806ZM12.8333 33C12.3444 33 11.9167 32.8167 11.55 32.45C11.1833 32.0833 11 31.6556 11 31.1667V12.8333C11 12.3444 11.1833 11.9167 11.55 11.55C11.9167 11.1833 12.3444 11 12.8333 11H31.1667C31.6556 11 32.0833 11.1833 32.45 11.55C32.8167 11.9167 33 12.3444 33 12.8333V31.1667C33 31.6556 32.8167 32.0833 32.45 32.45C32.0833 32.8167 31.6556 33 31.1667 33H12.8333ZM12.8333 31.1667H31.1667V12.8333H12.8333V31.1667Z" fill="white"/>
</svg>`;

/**
 * Ícone Língua Portuguesa - Cor #EC6300 (Laranja)
 * Arquivo original: Assets/Áreas de conhecimento/Língua Portuguesa.svg
 */
const iconPort = `<svg width="32" height="32" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="44" height="44" rx="5" fill="#EC6300"/>
<g clip-path="url(#clip0_lp)">
<path d="M27.3631 18.8828L24.4657 11.487C24.3047 11.0929 23.8583 10.8997 23.4608 11.052L16.065 13.9494C15.6674 14.1067 15.4726 14.5567 15.63 14.9543L18.5491 22.3501C18.7065 22.7477 19.1564 22.9424 19.5541 22.7851L26.9281 19.8877C27.3257 19.7303 27.5204 19.2804 27.3631 18.8828ZM19.3235 21.9368L16.4957 14.7411L23.6913 11.909L26.5191 19.109L19.3235 21.9368Z" fill="#F5F5F5"/>
<path d="M20.2196 23.5248H12.2974C11.8697 23.5248 11.523 23.8715 11.523 24.2992V32.2257C11.523 32.6534 11.8697 33.0001 12.2974 33.0001H20.2196C20.6473 33.0001 20.9939 32.6534 20.9939 32.2257V24.2992C20.9939 23.8715 20.6472 23.5248 20.2196 23.5248ZM20.1238 32.1256H12.3931V24.3949H20.1238V32.1256Z" fill="#F5F5F5"/>
<path d="M31.9183 23.4812L24.2615 21.4452C23.844 21.3433 23.4219 21.595 23.3131 22.0107L21.2771 29.6675C21.1665 30.0807 21.4117 30.5052 21.8249 30.6158C21.825 30.6159 21.8251 30.6159 21.8252 30.6159L29.482 32.6519C29.8952 32.7626 30.3197 32.5173 30.4303 32.1042C30.4304 32.1041 30.4304 32.1039 30.4304 32.1038L32.449 24.4296C32.5609 24.0216 32.3246 23.5993 31.9183 23.4812ZM29.6169 31.7471L22.1428 29.785L24.131 22.3153L31.6007 24.3034L29.6169 31.7471Z" fill="#F5F5F5"/>
<path d="M24.0961 17.7778C24.0171 17.6275 23.9125 17.492 23.7872 17.3775L21.612 15.0848L21.3553 14.8064C21.2908 14.7395 21.2193 14.6798 21.1421 14.628C21.064 14.5749 20.9747 14.5406 20.8811 14.528C20.6585 14.5124 20.4408 14.5988 20.2894 14.7629C20.2296 14.8363 20.1879 14.9227 20.1676 15.0152C20.1455 15.124 20.1353 15.2349 20.1372 15.3459C20.1372 15.472 20.1372 15.5808 20.1372 15.6721V18.8393C20.1459 18.9698 20.1531 19.0698 20.1589 19.1395C20.1622 19.2049 20.1755 19.2694 20.1981 19.3309C20.2404 19.4329 20.3243 19.5121 20.4287 19.5484C20.5346 19.5919 20.6534 19.5919 20.7593 19.5484C20.867 19.5178 20.953 19.4366 20.9899 19.3309C21.0225 19.1633 21.0342 18.9923 21.0247 18.8219V18.1998L22.7431 17.5254L23.152 17.9605L23.3391 18.1476C23.3924 18.2039 23.4523 18.2535 23.5175 18.2955C23.5664 18.3249 23.6215 18.3428 23.6784 18.3477C23.7423 18.3523 23.8064 18.3419 23.8655 18.3172C23.9677 18.2752 24.0502 18.1959 24.0961 18.0953C24.1394 17.9939 24.1394 17.8792 24.0961 17.7778ZM20.9855 17.4602L20.9246 15.4851L22.2471 16.9642L20.9855 17.4602Z" fill="#F5F5F5"/>
<path d="M17.3441 27.923C17.7585 27.7683 18.0304 27.3691 18.0228 26.9268C18.0232 26.7992 18.001 26.6725 17.9575 26.5526C17.9148 26.4337 17.8515 26.3232 17.7705 26.2263C17.6906 26.1298 17.595 26.0474 17.4877 25.9827C17.3542 25.9028 17.2064 25.8496 17.0526 25.8261C16.8669 25.7977 16.6793 25.7847 16.4914 25.7869H15.0471C14.8904 25.7699 14.7335 25.8169 14.612 25.9175C14.5128 26.0395 14.4659 26.1959 14.4815 26.3525V29.7633C14.4656 29.9192 14.5108 30.0751 14.6077 30.1983C14.729 30.3025 14.8882 30.3513 15.0471 30.3332H16.4349C16.6374 30.3269 16.8393 30.308 17.0396 30.2766C17.2038 30.2573 17.3647 30.2164 17.5181 30.1548C17.7329 30.0653 17.9162 29.9139 18.0445 29.7198C18.1756 29.5147 18.2437 29.2757 18.2403 29.0324C18.2503 28.4941 17.8724 28.0264 17.3441 27.923ZM15.4082 26.4874H16.1347C16.3878 26.4743 16.6409 26.5128 16.8786 26.6005C17.0431 26.6799 17.1405 26.8537 17.1222 27.0355C17.1232 27.138 17.0961 27.2388 17.0439 27.327C16.9841 27.4439 16.8811 27.5328 16.7568 27.575C16.5845 27.6248 16.4053 27.6468 16.226 27.6402H15.3864L15.4082 26.4874ZM17.305 28.9715C17.305 29.4181 16.9946 29.6414 16.374 29.6414H15.3864L15.4082 28.3189H16.3522C16.6028 28.3031 16.8528 28.3573 17.0744 28.4755C17.2341 28.5879 17.3219 28.7769 17.305 28.9715Z" fill="#F5F5F5"/>
<path d="M29.051 25.7608C28.9401 25.4863 28.7621 25.244 28.5333 25.056C28.2809 24.8455 27.9831 24.6966 27.6632 24.621C27.3802 24.5427 27.0847 24.5206 26.7931 24.5557C26.5127 24.5899 26.2429 24.6833 26.0014 24.8298C25.7515 24.9837 25.5366 25.1882 25.3705 25.4302C25.1835 25.7056 25.0465 26.012 24.966 26.3351C24.9094 26.5412 24.8744 26.7525 24.8615 26.9659C24.8503 27.1654 24.8634 27.3656 24.9007 27.5619C24.9358 27.7483 24.9942 27.9295 25.0747 28.1013C25.1584 28.2776 25.27 28.4393 25.4053 28.5799C25.5401 28.7179 25.6957 28.8339 25.8665 28.9236C26.0614 29.0249 26.2672 29.1037 26.4799 29.1585C26.7525 29.2368 27.0381 29.259 27.3195 29.2238C27.5566 29.1873 27.7835 29.1013 27.9852 28.9714C28.1519 28.8672 28.2991 28.7348 28.4202 28.5799C28.5232 28.4516 28.5987 28.3035 28.6421 28.1448C28.6726 28.0423 28.6584 27.9317 28.6029 27.8403C28.5501 27.7487 28.4621 27.6827 28.3593 27.6576C28.2588 27.6214 28.147 27.6359 28.0591 27.6967C27.9751 27.7656 27.903 27.8479 27.8459 27.9404C27.7109 28.137 27.5199 28.2885 27.2978 28.3754C27.0716 28.4492 26.8279 28.4492 26.6017 28.3754C26.3962 28.3355 26.2053 28.2408 26.0492 28.1013C25.8982 27.9295 25.804 27.7153 25.7795 27.4879C25.7503 27.1953 25.7784 26.8997 25.8621 26.6178C25.9397 26.181 26.1638 25.7836 26.4973 25.4911C26.776 25.2741 27.1425 25.2061 27.4805 25.3083C27.6867 25.3557 27.8734 25.465 28.0156 25.6216C28.1548 25.7951 28.2503 25.9995 28.294 26.2176C28.3162 26.3331 28.3558 26.4446 28.4115 26.5482C28.4676 26.6262 28.5519 26.6792 28.6464 26.6961C28.7459 26.7237 28.8524 26.7061 28.9379 26.6483C29.0263 26.5948 29.0903 26.509 29.1163 26.409C29.1621 26.1914 29.1393 25.9649 29.051 25.7608Z" fill="#F5F5F5"/>
</g>
<defs>
<clipPath id="clip0_lp">
<rect width="22" height="22" fill="white" transform="translate(11 11)"/>
</clipPath>
</defs>
</svg>`;

/**
 * Ícone Liga das Corujinhas - Cor #56124F (Roxo/Púrpura)
 * Arquivo original: Assets/Áreas de conhecimento/Liga das Corujinhas.svg
 */
const iconLiga = `<svg width="32" height="32" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="44" height="44" rx="5" fill="#56124F"/>
<path d="M4.91819 17.9357C5.98401 14.946 9.80323 15.5576 11.5796 16.237C12.379 15.4216 14.5773 15.4443 15.5765 15.5575C20.9056 12.5678 26.9009 14.3118 29.2324 15.5575C30.8311 14.1986 33.6733 14.5383 34.8946 14.878C41.2896 16.7806 38.6694 23.3715 36.56 26.4291C38.1587 27.5163 37.8242 28.9477 37.4911 29.6272C34.0272 35.063 29.0294 33.3401 27.142 31.4149C23.1451 34.1328 19.0182 32.6577 17.2418 31.8649C12.4456 36.2136 8.13788 30.506 6.58354 27.1086C5.58433 25.2967 3.85236 20.9254 4.91819 17.9357Z" fill="#56124F"/>
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
</svg>`;

/**
 * Ícone Todas as Áreas - Cor #0C5257 (Verde escuro)
 * Arquivo original: Assets/Áreas de conhecimento/Todas.svg
 */
const iconTodas = `<svg width="32" height="32" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="44" height="44" rx="5" fill="#0C5257"/>
<path d="M22.378 23.9545C21.3232 24.3246 20.2683 26.3606 20.2683 26.3606C20.4059 28.304 22.3322 30.0623 22.378 30.1085C22.4239 30.0623 24.2585 28.304 24.3961 26.3606C24.3961 26.3606 23.387 24.3246 22.378 23.9545Z" fill="#0A5B59"/>
<path d="M20.3151 26.7778C20.3151 26.7778 21.3241 24.927 22.3331 24.6031V30.1556C22.3789 30.1556 20.4527 28.5824 20.3151 26.7778Z" fill="#FAB84A"/>
<path d="M24.3039 26.7778C24.3039 26.7778 23.3408 24.927 22.3318 24.6031V30.1556C22.3318 30.1556 24.1663 28.5361 24.3039 26.7778Z" fill="#E9934C"/>
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
</svg>`;

// Alias para compatibilidade (Ciências usa ícone genérico)
const iconScience = iconTodas;

// Stories
export const Default = {
  name: 'Default',
  render: () => `
    ${eSelectCSS}
    <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" rel="stylesheet" />
    
    <div class="demo-container">
      <div class="form-group">
        <label>Área de conhecimento</label>
        <div class="e-select-wrapper cursor-pointer" style="--e-select-variant: #6e63e8; min-width: 250px; max-width: 350px;">
          <div role="combobox" tabindex="0" class="e-select-container">
            <div class="opt-content">
              ${iconMath}
              <span>Matemática</span>
            </div>
            <div class="icon-container">
              <span class="material-symbols-outlined drop-icon">expand_more</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
};

export const Placeholder = {
  name: 'Placeholder',
  render: () => `
    ${eSelectCSS}
    <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" rel="stylesheet" />
    
    <div class="demo-container">
      <div class="form-group">
        <label>Selecione uma matéria</label>
        <div class="e-select-wrapper cursor-pointer" style="--e-select-variant: #6e63e8; min-width: 250px; max-width: 350px;">
          <div role="combobox" tabindex="0" class="e-select-container">
            <span class="text-muted">Selecione uma opção...</span>
            <div class="icon-container">
              <span class="material-symbols-outlined drop-icon">expand_more</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
};

export const Opened = {
  name: 'Dropdown Aberto',
  render: () => `
    ${eSelectCSS}
    <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" rel="stylesheet" />
    
    <div class="demo-container" style="min-height: 350px;">
      <div class="form-group">
        <label>Área de conhecimento</label>
        <div class="e-select-wrapper cursor-pointer" style="--e-select-variant: #6e63e8; min-width: 250px; max-width: 350px;">
          <div role="combobox" tabindex="0" class="e-select-container">
            <div class="opt-content">
              ${iconMath}
              <span>Matemática</span>
            </div>
            <div class="icon-container">
              <span class="material-symbols-outlined drop-icon revert-drop-icon">expand_more</span>
            </div>
          </div>
          <ul role="listbox" class="options-container opened">
            <li class="option selected bg-light-primary">
              <div class="opt-content">
                ${iconMath}
                <span>Matemática</span>
              </div>
            </li>
            <li class="option">
              <div class="opt-content">
                ${iconPort}
                <span>Língua Portuguesa</span>
              </div>
            </li>
            <li class="option">
              <div class="opt-content">
                ${iconScience}
                <span>Ciências</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  `,
};

export const Disabled = {
  name: 'Desabilitado',
  render: () => `
    ${eSelectCSS}
    <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" rel="stylesheet" />
    
    <div class="demo-container">
      <div class="form-group">
        <label>Temática</label>
        <div class="e-select-wrapper cursor-pointer disabled" style="--e-select-variant: #6e63e8; min-width: 250px; max-width: 350px;">
          <div role="combobox" aria-disabled="true" tabindex="0" class="e-select-container">
            <span class="text-muted">Defina a matriz/currículo</span>
            <div class="icon-container">
              <span class="material-symbols-outlined drop-icon">expand_more</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
};

export const MultipleBadge = {
  name: 'Seleção Múltipla',
  render: () => `
    ${eSelectCSS}
    <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" rel="stylesheet" />
    
    <div class="demo-container">
      <div class="form-group">
        <label>Habilidades</label>
        <div class="e-select-wrapper cursor-pointer" style="--e-select-variant: #6e63e8; min-width: 250px; max-width: 350px;">
          <div role="combobox" tabindex="0" class="e-select-container">
            <div class="selected-options-badge">
              <span class="badge badge-primary">3 selecionadas</span>
            </div>
            <div class="icon-container">
              <span class="material-symbols-outlined drop-icon">expand_more</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
};

export const Variants = {
  name: 'Variantes de Cor',
  render: () => `
    ${eSelectCSS}
    <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" rel="stylesheet" />
    
    <div class="demo-container">
      <div class="demo-row">
        <div class="demo-col">
          <div class="form-group">
            <label>Primary</label>
            <div class="e-select-wrapper cursor-pointer" style="--e-select-variant: #6e63e8;">
              <div class="e-select-container" style="border-color: #6e63e8;">
                <div class="selected-options-badge">
                  <span class="badge badge-primary">2 selecionados</span>
                </div>
                <div class="icon-container">
                  <span class="material-symbols-outlined drop-icon">expand_more</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="demo-col">
          <div class="form-group">
            <label>Success</label>
            <div class="e-select-wrapper cursor-pointer" style="--e-select-variant: #28c76f;">
              <div class="e-select-container" style="border-color: #28c76f;">
                <div class="selected-options-badge">
                  <span class="badge badge-success">2 selecionados</span>
                </div>
                <div class="icon-container">
                  <span class="material-symbols-outlined drop-icon">expand_more</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="demo-col">
          <div class="form-group">
            <label>Warning</label>
            <div class="e-select-wrapper cursor-pointer" style="--e-select-variant: #ff9f43;">
              <div class="e-select-container" style="border-color: #ff9f43;">
                <div class="selected-options-badge">
                  <span class="badge badge-warning">2 selecionados</span>
                </div>
                <div class="icon-container">
                  <span class="material-symbols-outlined drop-icon">expand_more</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="demo-col">
          <div class="form-group">
            <label>Danger</label>
            <div class="e-select-wrapper cursor-pointer" style="--e-select-variant: #ea5455;">
              <div class="e-select-container" style="border-color: #ea5455;">
                <div class="selected-options-badge">
                  <span class="badge badge-danger">2 selecionados</span>
                </div>
                <div class="icon-container">
                  <span class="material-symbols-outlined drop-icon">expand_more</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
};

export const FilterLayout = {
  name: 'Layout de Filtros',
  render: () => `
    ${eSelectCSS}
    <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" rel="stylesheet" />
    
    <div class="demo-container">
      <div style="background: white; padding: 1.5rem; border-radius: 8px; box-shadow: 0 4px 24px rgba(34, 41, 47, 0.1);">
        <div class="demo-row" style="align-items: flex-end;">
          <div class="demo-col">
            <div class="form-group" style="margin-bottom: 0;">
              <label>Área de conhecimento</label>
              <div class="e-select-wrapper cursor-pointer" style="--e-select-variant: #6e63e8;">
                <div class="e-select-container">
                  <div class="opt-content">
                    ${iconMath}
                    <span>Matemática</span>
                  </div>
                  <div class="icon-container">
                    <span class="material-symbols-outlined drop-icon">expand_more</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="demo-col">
            <div class="form-group" style="margin-bottom: 0;">
              <label>Matriz/Currículo</label>
              <div class="e-select-wrapper cursor-pointer" style="--e-select-variant: #6e63e8;">
                <div class="e-select-container">
                  <span class="selected-option-single">Todos</span>
                  <div class="icon-container">
                    <span class="material-symbols-outlined drop-icon">expand_more</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="demo-col">
            <div class="form-group" style="margin-bottom: 0;">
              <label>Temática</label>
              <div class="e-select-wrapper cursor-pointer disabled" style="--e-select-variant: #6e63e8;">
                <div class="e-select-container">
                  <span class="text-muted">Defina a matriz/currículo</span>
                  <div class="icon-container">
                    <span class="material-symbols-outlined drop-icon">expand_more</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="demo-col">
            <div class="form-group" style="margin-bottom: 0;">
              <label>Habilidades</label>
              <div class="e-select-wrapper cursor-pointer disabled" style="--e-select-variant: #6e63e8;">
                <div class="e-select-container">
                  <span class="text-muted">Defina matriz e temática</span>
                  <div class="icon-container">
                    <span class="material-symbols-outlined drop-icon">expand_more</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
};

/**
 * Story Interativa - ESelect com JavaScript
 * Demonstra o comportamento real do componente
 */
export const Interactive = {
  name: '🎮 Interativo',
  render: () => `
    ${eSelectCSS}
    <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" rel="stylesheet" />
    
    <div style="padding: 2rem; background: white; min-height: 400px;">
      <div class="form-group">
        <label>Área de conhecimento</label>
        <div class="e-select-wrapper cursor-pointer" id="select-area" style="--e-select-variant: #6e63e8; min-width: 250px; max-width: 350px;">
          <div role="combobox" tabindex="0" class="e-select-container" id="select-trigger">
            <span class="text-muted" id="selected-display">Selecione uma área...</span>
            <div class="icon-container">
              <span class="material-symbols-outlined drop-icon" id="drop-icon">expand_more</span>
            </div>
          </div>
          <ul role="listbox" class="options-container" id="options-list">
            <li class="option" data-value="math" data-label="Matemática">
              <div class="opt-content">
                ${iconMath}
                <span>Matemática</span>
              </div>
            </li>
            <li class="option" data-value="port" data-label="Língua Portuguesa">
              <div class="opt-content">
                ${iconPort}
                <span>Língua Portuguesa</span>
              </div>
            </li>
            <li class="option" data-value="liga" data-label="Liga das Corujinhas">
              <div class="opt-content">
                ${iconLiga}
                <span>Liga das Corujinhas</span>
              </div>
            </li>
            <li class="option" data-value="todas" data-label="Todas as Áreas">
              <div class="opt-content">
                ${iconTodas}
                <span>Todas as Áreas</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
      
      <div style="margin-top: 2rem; padding: 0.75rem; background: #f8f8f8; border-radius: 0.357rem; font-size: 0.85rem;">
        <strong style="color: #6e6b7b;">Valor selecionado:</strong>
        <code id="selected-value" style="display: inline; margin-left: 0.5rem; color: #6e63e8;">null</code>
      </div>
    </div>
  `,
  play: async ({ canvasElement }) => {
    // Inicializar interatividade via Storybook play function
    const trigger = canvasElement.querySelector('#select-trigger');
    const optionsList = canvasElement.querySelector('#options-list');
    const dropIcon = canvasElement.querySelector('#drop-icon');
    const selectedDisplay = canvasElement.querySelector('#selected-display');
    const selectedValue = canvasElement.querySelector('#selected-value');
    const options = canvasElement.querySelectorAll('#options-list .option');
    
    if (!trigger || !optionsList) return;
    
    let isOpen = false;
    
    // Toggle dropdown
    trigger.addEventListener('click', (e) => {
      e.stopPropagation();
      isOpen = !isOpen;
      
      if (isOpen) {
        optionsList.classList.add('opened');
        dropIcon.classList.add('revert-drop-icon');
      } else {
        optionsList.classList.remove('opened');
        dropIcon.classList.remove('revert-drop-icon');
      }
    });
    
    // Selecionar opção
    options.forEach(option => {
      option.addEventListener('click', (e) => {
        e.stopPropagation();
        
        // Remover seleção anterior
        options.forEach(opt => opt.classList.remove('selected', 'bg-light-primary'));
        
        // Adicionar seleção atual
        option.classList.add('selected', 'bg-light-primary');
        
        // Atualizar display com ícone + texto
        const optContent = option.querySelector('.opt-content');
        const iconSVG = optContent.querySelector('svg').outerHTML;
        const textLabel = option.dataset.label;
        
        selectedDisplay.className = 'opt-content';
        selectedDisplay.innerHTML = iconSVG + '<span>' + textLabel + '</span>';
        
        // Atualizar valor
        selectedValue.textContent = JSON.stringify({ value: option.dataset.value, label: textLabel }, null, 2);
        
        // Fechar dropdown
        isOpen = false;
        optionsList.classList.remove('opened');
        dropIcon.classList.remove('revert-drop-icon');
      });
    });
    
    // Fechar ao clicar fora
    document.addEventListener('click', (e) => {
      if (isOpen && !e.target.closest('#select-area')) {
        isOpen = false;
        optionsList.classList.remove('opened');
        dropIcon.classList.remove('revert-drop-icon');
      }
    });
    
    // Keyboard navigation
    trigger.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        trigger.click();
      }
      if (e.key === 'Escape' && isOpen) {
        isOpen = false;
        optionsList.classList.remove('opened');
        dropIcon.classList.remove('revert-drop-icon');
      }
    });
  }
};
