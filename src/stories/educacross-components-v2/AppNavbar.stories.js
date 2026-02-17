/**
 * AppNavbar - Header de Navegação Principal
 * ============================================
 * Barra de navegação superior com logo, botão "Como Jogar?" e dropdown usuário
 * 
 * @component AppNavbar
 * @category Doc-Only / Educacross Components V2 / Navigation
 * @source educacross-frontoffice/src/views/pages/auth-context/manage-account/ManageAccount.vue (linhas 6-68)
 * @note Documentação de trecho de código de ManageAccount.vue (linhas 6-68). Não é componente reutilizável.
 * @priority P2
 * @status PIXEL-PERFECT
 * @since 2.0.0
 * 
 * @features
 * - Logo centralizado (whitelabel support)
 * - Botão "Como Jogar?" com ícone joystick
 * - Dropdown do usuário com avatar e menu
 * - Layout responsivo com 3 colunas (flex: 1-1-1)
 * - Menu dropdown: Editar conta + Sair
 */

export default {
  title: 'Educacross Components V2/Navigation/AppNavbar',
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
## AppNavbar - Barra de Navegação Principal

Header de navegação usado em páginas autenticadas do Educacross (ManageAccount, contextos de usuário).

### Estrutura

- **Coluna Esquerda**: Espaço vazio (flex: 1)
- **Coluna Central**: Logo Educacross centralizado (flex: 1)
- **Coluna Direita**: Botão "Como Jogar?" + Dropdown usuário (flex: 1)

### Componentes

1. **Logo**: Imagem do Educacross (whitelabel support via \`mainLogo\`)
2. **Botão "Como Jogar?"**: Ícone joystick + texto (texto oculto em mobile)
3. **User Dropdown**: Avatar + nome (nome oculto em mobile) + menu com "Editar conta" e "Sair"

### Responsividade

- **Desktop**: Logo + botão com texto + nome do usuário
- **Mobile**: Logo + botão apenas com ícone + avatar sem nome

### Integração

Usado em:
- ManageAccountPage (seleção de perfis)
- Contextos autenticados (aluno, professor, etc.)
        `,
      },
    },
  },
};

const styles = `
  <link rel="stylesheet" href="/vuexy/css/core.css">
  <style>
    body {
      margin: 0;
      padding: 0;
    }

    .navbar-container {
      background-color: white;
      padding: 12px 24px;
      border-bottom: 1px solid #ebe9f1;
      min-height: 64px;
      box-sizing: border-box;
    }

    .flex-1 {
      flex: 1 1 0%;
      min-width: 0;
    }

    .gap-2 {
      gap: 0.5rem;
    }

    .gap-1 {
      gap: 0.25rem;
    }

    .p-50 {
      padding: 0.5rem;
    }

    @media (min-width: 768px) {
      .md\:gap-3 {
        gap: 1rem !important;
      }
    }

    .logo-container {
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .logo-container img {
      height: 40px;
      max-width: 100%;
    }

    .user-nav {
      display: flex;
      align-items: center;
      margin-right: 12px;
    }

    .user-name {
      line-height: 1.5rem;
      margin-bottom: 0;
    }

    .mr-50 {
      margin-right: 0.5rem !important;
    }

    .mb-0 {
      margin-bottom: 0 !important;
    }

    .b-avatar {
      width: 40px;
      height: 40px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      vertical-align: middle;
      position: relative;
    }

    .b-avatar-img {
      width: 100%;
      height: 100%;
      display: flex;
    }

    .b-avatar img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 50%;
    }

    .badge-light-primary {
      background-color: rgba(115, 103, 240, 0.12) !important;
    }

    .navbar-nav {
      list-style: none;
      margin: 0;
      padding: 0;
      display: flex;
      align-items: center;
    }

    .nav-item {
      position: relative;
    }

    .nav-link {
      padding: 0;
      display: flex;
      align-items: center;
      text-decoration: none;
      cursor: pointer;
    }

    .dropdown-menu {
      min-width: 12rem;
      margin-top: 0.5rem;
      position: absolute;
      right: 0;
      background: white;
      border: 1px solid rgba(0,0,0,0.15);
      border-radius: 0.428rem;
      box-shadow: 0 4px 24px 0 rgba(34, 41, 47, 0.1);
      z-index: 1000;
      padding: 0.5rem 0;
      display: none;
    }

    .dropdown-menu.show {
      display: block;
    }

    .dropdown-menu li {
      list-style: none;
    }

    .dropdown-item {
      display: flex;
      align-items: center;
      padding: 0.5rem 1.5rem;
      color: #6e6b7b;
      text-decoration: none;
      cursor: pointer;
      transition: background-color 0.2s;
      border: none;
      background: none;
      width: 100%;
      text-align: left;
      font-size: 0.95rem;
    }

    .dropdown-item:hover {
      background-color: rgba(115, 103, 240, 0.08);
      color: #7367f0;
    }

    .feather {
      width: 16px;
      height: 16px;
      margin-right: 0.5rem;
      stroke: currentColor;
    }

    .btn.btn-primary {
      background-color: #7367f0;
      border-color: #7367f0;
      color: white;
    }

    .btn.btn-sm {
      padding: 0.5rem 1rem;
      font-size: 0.875rem;
    }

    .btn.rounded-pill {
      border-radius: 50rem;
    }

    .text-nowrap {
      white-space: nowrap;
    }

    .material-symbols-outlined {
      font-family: 'Material Symbols Outlined';
      font-weight: normal;
      font-style: normal;
      line-height: 1;
      letter-spacing: normal;
      text-transform: none;
      display: inline-block;
      white-space: nowrap;
      word-wrap: normal;
      direction: ltr;
      font-feature-settings: 'liga';
      -webkit-font-smoothing: antialiased;
    }

    .align-middle {
      vertical-align: middle;
    }

    .text-body {
      color: #6e6b7b;
    }

    .text-primary {
      color: #7367f0 !important;
    }

    .cursor-pointer {
      cursor: pointer;
    }

    .btn-outline-primary {
      color: #7367f0;
      border-color: #7367f0;
      background-color: transparent;
    }

    .btn-outline-primary:hover {
      background-color: rgba(115, 103, 240, 0.08);
    }

    .gap-2 {
      gap: 0.5rem !important;
    }

    .flex-nowrap {
      flex-wrap: nowrap !important;
    }

    .permissionUser {
      font-size: 0.75rem;
      color: #7367f0;
    }

    .profileName {
      max-width: 150px;
    }

    .text-truncate {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .ml-50 {
      margin-left: 0.5rem !important;
    }

    @media (max-width: 767.98px) {
      .d-md-inline {
        display: none !important;
      }
    }

    @media (min-width: 768px) {
      .d-md-inline {
        display: inline !important;
      }
    }

    @media (max-width: 1199.98px) {
      .d-xl-flex {
        display: none !important;
      }
    }

    @media (min-width: 1200px) {
      .d-xl-flex {
        display: flex !important;
      }
      
      .d-lg-inline {
        display: inline !important;
      }
    }

    @media (max-width: 1199.98px) {
      .d-lg-inline {
        display: none !important;
      }
    }
      color: white;
      border: none;
      border-radius: 50px;
      font-size: 14px;
      font-weight: 500;
      cursor: pointer;
      white-space: nowrap;
      transition: background-color 0.2s;
    }

    .btn-how-to-play:hover {
      background-color: #5e50ee;
    }

    .btn-how-to-play .icon {
      font-size: 20px;
    }

    .user-dropdown {
      position: relative;
      display: inline-block;
    }

    .user-dropdown-toggle {
      display: flex;
      align-items: center;
      gap: 12px;
      cursor: pointer;
      padding: 4px;
      border-radius: 8px;
      transition: background-color 0.2s;
    }

    .user-dropdown-toggle:hover {
      background-color: #f5f5f5;
    }

    .user-info {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      line-height: 1.2;
    }

    .user-name {
      font-size: 14px;
      font-weight: 500;
      color: #333;
      margin: 0;
    }

    .user-avatar {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-weight: 600;
      font-size: 14px;
      flex-shrink: 0;
    }

    .user-avatar img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      object-fit: cover;
    }

    .dropdown-menu {
      position: absolute;
      top: calc(100% + 8px);
      right: 0;
      background: white;
      border: 1px solid #e0e0e0;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      min-width: 200px;
      z-index: 1000;
      display: none;
      overflow: hidden;
    }

    .dropdown-menu.show {
      display: block;
    }

    .dropdown-item {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 12px 16px;
      color: #333;
      text-decoration: none;
      cursor: pointer;
      transition: background-color 0.2s;
      border: none;
      background: none;
      width: 100%;
      text-align: left;
      font-size: 14px;
    }

    .dropdown-item:hover {
      background-color: #f5f5f5;
    }

    .dropdown-item .material-symbols-outlined {
      font-size: 18px;
      color: #666;
    }

    /* Responsivo */
    @media (max-width: 768px) {
      .btn-how-to-play .text {
        display: none;
      }

      .btn-how-to-play {
        padding: 8px 12px;
      }

      .user-info {
        display: none;
      }

      .user-dropdown-toggle {
        gap: 0;
      }
    }

    /* Material Symbols Icons */
    .material-symbols-outlined {
      font-family: 'Material Symbols Outlined';
      font-weight: normal;
      font-style: normal;
      font-size: 24px;
      line-height: 1;
      letter-spacing: normal;
      text-transform: none;
      display: inline-block;
      white-space: nowrap;
      word-wrap: normal;
      direction: ltr;
      -webkit-font-feature-settings: 'liga';
      -webkit-font-smoothing: antialiased;
    }
  </style>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
`;

/**
 * Variação padrão do navbar - exatamente como no código real
 */
export const Default = {
  render: () => `
    ${styles}
    <div class="navbar-container d-flex align-items-center justify-content-between gap-2 bg-white p-50">
      <div class="flex-1"></div>
      
      <div class="navbar-column d-flex justify-content-center flex-1">
        <div class="logo-container">
          <img src="/educacross-assets/logo-educacross.svg" alt="logo" onload="console.log('Logo Educacross loaded successfully')" onerror="console.error('Logo failed to load, trying fallback'); this.src='/vuexy/images/logos/logo.svg'; this.onerror=null;" />
        </div>
      </div>
      
      <div class="navbar-column d-flex justify-content-end align-items-center md:gap-3 gap-1 flex-1">
        <div>
          <button type="button" class="btn text-nowrap btn-primary btn-sm rounded-pill">
            <span class="material-symbols-outlined align-middle" style="font-size: 20px;">joystick</span>
            <span class="align-middle d-none d-md-inline"> Como Jogar?</span>
          </button>
        </div>
        
        <ul class="navbar-nav">
          <li class="nav-item dropdown dropdown-user">
            <a role="button" href="#" class="nav-link dropdown-toggle d-flex align-items-center dropdown-user-link" onclick="event.preventDefault(); this.nextElementSibling.classList.toggle('show');">
              <div class="d-xl-flex d-none user-nav">
                <p class="user-name d-flex flex-column justify-content-center align-items-end mb-0 mr-50" style="line-height: 1.5rem;">
                  <span class="text-body d-none d-lg-inline" style="font-weight: 500;">Fabio Alves</span>
                </p>
              </div>
              <span class="b-avatar badge-light-primary rounded-circle" style="width: 40px; height: 40px;">
                <span class="b-avatar-img">
                  <img src="/vuexy/images/avatars/1.png" alt="avatar" onload="console.log('Avatar loaded')" onerror="console.error('Avatar failed to load'); this.style.display='none'; this.parentElement.innerHTML='<div style=&quot;width: 40px; height: 40px; background: #7367f0; color: white; display: flex; align-items: center; justify-content: center; border-radius: 50%; font-weight: bold;&quot;>FA</div>';">
                </span>
              </span>
            </a>
            
            <ul class="dropdown-menu dropdown-menu-right">
              <li>
                <a href="#" class="dropdown-item d-flex align-items-center" onclick="event.preventDefault();">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16px" height="16px" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-50 feather feather-edit">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                  </svg>
                  <span>Editar conta</span>
                </a>
              </li>
              <li>
                <a href="#" class="dropdown-item d-flex align-items-center" onclick="event.preventDefault();">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16px" height="16px" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-50 feather feather-log-out">
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                    <polyline points="16 17 21 12 16 7"></polyline>
                    <line x1="21" y1="12" x2="9" y2="12"></line>
                  </svg>
                  <span>Sair</span>
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
    
    <div style="padding: 24px; background: #f8f8f8; min-height: 200px;">
      <p style="color: #666; text-align: center; margin-top: 60px;">
        <strong>Área de conteúdo da página</strong><br>
        Clique no avatar para abrir o menu dropdown
      </p>
    </div>
  `,
};

/**
 * Navbar com menu lateral (contexto Professor/Aluno dentro da plataforma)
 */
export const WithSidebarMenu = {
  render: () => `
    ${styles}
    <div class="navbar-container d-flex align-items-center justify-content-between Teacher">
      <div class="navbar-column" style="flex: 0 0 auto;">
        <span class="material-symbols-outlined text-primary cursor-pointer" style="vertical-align: middle; cursor: pointer; font-size: 28px;" onclick="alert('Abrir menu lateral')">
          menu
        </span>
      </div>
      
      <div class="navbar-column d-flex justify-content-center" style="flex: 1 1 auto;">
        <div class="logo-container">
          <img src="/educacross-assets/logo-educacross.svg" alt="logo" class="d-sm-inline d-none" />
          <img src="/educacross-assets/logo-educacross-small.svg" alt="logo" class="d-sm-none" />
        </div>
      </div>
      
      <div class="navbar-column d-flex justify-content-end align-items-center" style="flex: 0 0 auto; gap: 12px;">
        <button type="button" class="btn d-flex align-items-center gap-2 btn-outline-primary rounded-pill">
          <span class="material-symbols-outlined text-primary" style="font-size: 14px; vertical-align: middle;">
            joystick
          </span>
          <span class="d-xl-inline d-none"> Visão aluno </span>
        </button>
        
        <ul class="navbar-nav">
          <li class="nav-item dropdown dropdown-user">
            <a role="button" href="#" class="nav-link dropdown-toggle d-flex align-items-center dropdown-user-link" onclick="event.preventDefault(); this.nextElementSibling.classList.toggle('show');">
              <div class="d-xl-flex d-none user-nav">
                <p class="user-name d-flex flex-column justify-content-center align-items-end mb-0 mr-50" style="line-height: 1.5rem;">
                  <span class="profileName d-inline-block text-truncate" style="font-weight: 500;">Fabio Alves</span>
                  <span class="permissionUser" style="font-weight: bold; color: #7367f0;">Professor</span>
                </p>
              </div>
              <span class="b-avatar badge-light-primary rounded-circle" style="width: 40px; height: 40px; margin-left: 8px;">
                <span class="b-avatar-img">
                  <img src="https://blob.educacross.com.br/accountpicture/23005008-6435-4325-8f3b-831f06ac1b23.png" alt="avatar">
                </span>
              </span>
            </a>
            
            <ul class="dropdown-menu dropdown-menu-right">
              <li>
                <a href="#" class="dropdown-item d-flex align-items-center" onclick="event.preventDefault();">
                  <span class="material-symbols-outlined mr-50">account_circle</span>
                  <span>Ir para a conta</span>
                </a>
              </li>
              <li>
                <a href="#" class="dropdown-item d-flex align-items-center" onclick="event.preventDefault();">
                  <span class="material-symbols-outlined mr-50">mail</span>
                  <span>Notificações</span>
                </a>
              </li>
              <li>
                <a href="#" class="dropdown-item d-flex align-items-center" onclick="event.preventDefault();">
                  <div class="d-flex align-items-center justify-content-between" style="width: 100%;">
                    <div class="d-flex align-items-center">
                      <img src="/img/br.6e895933.svg" alt="pt-BR" width="22" height="24" style="margin-right: 8px;" />
                      <span>PT</span>
                    </div>
                    <span class="material-symbols-outlined">expand_more</span>
                  </div>
                </a>
              </li>
              <li>
                <a href="#" class="dropdown-item d-flex align-items-center" onclick="event.preventDefault();">
                  <span class="material-symbols-outlined mr-50">logout</span>
                  <span>Sair</span>
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
    
    <div style="padding: 24px; background: #f8f8f8; min-height: 200px;">
      <p style="color: #666; text-align: center; margin-top: 60px;">
        <strong>Navbar com menu lateral</strong><br>
        Usado em contextos autenticados (Professor, Aluno, Coordenador)<br>
        Ícone de menu à esquerda + Botão "Visão aluno" + Menu expandido
      </p>
    </div>
  `,
};

/**
 * Versão para produção - garante que funcione em GitHub Pages
 */
export const ProductionReady = {
  render: () => `
    ${styles}
    <div class="navbar-container d-flex align-items-center justify-content-between gap-2 bg-white p-50">
      <div class="flex-1"></div>
      
      <div class="navbar-column d-flex justify-content-center flex-1">
        <div class="logo-container">
          <svg width="231" height="33" viewBox="0 0 231 33" fill="none" xmlns="http://www.w3.org/2000/svg" style="height: 40px; width: auto;">
            <path d="M51.1604 16.041C50.6404 14.5984 47.3906 13.877 47.3906 13.877C46.8056 13.3525 47.4555 12.7623 47.4555 12.7623C47.7155 12.3689 48.2355 11.7787 48.2355 11.7787C47.3905 12.1721 46.4156 12.1066 46.4156 12.1066C46.1556 11.9098 46.5456 11.8443 46.5456 11.8443C48.8855 10.7951 48.5605 8.10656 48.5605 8.10656C47.7805 8.76229 46.4806 8.56557 46.4806 8.56557C45.5706 8.43442 45.5706 7.64754 45.5706 7.64754C45.7006 6.72951 46.9356 6.40164 46.9356 6.40164C45.5706 4.5 41.5409 5.09016 41.5409 5.09016C42.3858 2.27049 41.0859 0.565574 41.0859 0.565574C36.6011 4.95902 28.8665 5.28688 28.8665 5.28688C28.6715 5.28688 28.2165 4.89344 28.2165 4.89344C27.4366 4.04098 27.8916 2.27049 27.8916 2.27049C27.2416 2.66393 26.6566 4.30328 26.6566 4.30328C26.2666 4.82787 26.1367 4.04098 26.1367 4.04098C25.8767 2.0082 24.5767 1.15574 24.5767 1.15574C24.9017 2.27049 24.3817 4.04098 24.3817 4.04098C24.1218 4.56557 23.7968 4.36885 23.7968 4.36885C22.8868 3.90984 23.1468 2.59836 23.1468 2.59836C21.4569 3.51639 21.4569 5.09016 21.4569 5.09016C14.8272 4.69672 10.6675 0.5 10.6675 0.5C9.7575 2.59836 10.3425 4.63115 10.3425 4.63115C9.23753 3.84426 7.74261 4.04098 7.74261 4.04098C9.04254 5.28688 7.54762 5.54918 7.54762 5.54918C4.68777 5.41803 3.9728 6.86065 3.9728 6.86065C4.49278 7.05738 4.94775 7.77869 4.94775 7.77869C5.40273 8.95901 4.68777 9.28688 4.68777 9.28688C3.64782 9.81147 2.54288 8.10656 2.54288 8.10656C2.34789 11.6475 4.62277 12.1721 4.62277 12.1721C4.23279 12.6311 2.41289 12.3689 2.41289 12.3689C4.0378 13.1557 3.90781 13.877 3.90781 13.877C3.71282 14.5984 2.54288 14.5328 2.54288 14.5328C1.63293 14.6639 0.98296 15.2541 0.98296 15.2541C3.12785 15.9098 3.06285 17.4836 3.06285 17.4836C1.89291 18.5984 0.852966 17.2869 0.852966 17.2869C1.30794 19.9754 3.64782 20.2377 3.64782 20.2377C4.29779 20.6311 3.84281 20.8934 3.84281 20.8934C3.58282 21.2213 2.67287 22.1393 2.67287 22.1393C2.0879 22.6639 2.0879 24.1066 2.0879 24.1066C2.54288 23.582 4.23279 23.1885 4.23279 23.1885C5.85771 23.1229 5.46773 24.5656 5.46773 24.5656C5.46773 25.2213 4.16779 26.5328 4.16779 26.5328C5.07775 27.0574 7.28763 27.0574 7.28763 27.0574C8.39258 27.0574 8.32758 27.5164 8.32758 27.5164C8.39257 28.5 7.35263 29.7459 7.35263 29.7459C8.06759 29.0902 10.4725 28.5656 10.4725 28.5656C11.7074 28.4344 11.3174 29.0902 11.3824 29.0902C11.1224 30.6639 11.7074 32.041 11.7724 32.2377C12.2924 30.5984 13.4623 30.0082 13.5923 29.9426C14.5023 29.6148 14.3723 30.4016 14.3723 30.5328C14.6322 30.7295 15.8672 31.5164 17.7521 30.9918C18.792 30.7295 20.027 30.2705 21.1319 29.418C21.7169 29.0246 22.4318 28.3688 23.1468 27.3852C23.4718 26.9262 23.8618 26.4016 24.1868 25.7459H24.2518C24.9017 24.6311 25.4217 23.2541 25.8117 21.5492C25.8117 21.5492 26.2016 23.582 27.1766 25.7459H27.4366C27.4366 25.7459 28.9965 28.7623 31.2064 30.0738C33.6763 31.582 34.7162 32.041 36.8611 31.7787C37.1861 31.7131 37.3811 31.7131 37.4461 31.6475C37.3811 31.582 37.3811 31.5164 37.3161 31.4508C37.966 30.4672 38.551 30.9262 38.551 30.9262C38.876 31.1885 38.811 31.7131 38.811 31.7131C40.3709 31.0574 40.6309 29.0902 40.6309 29.0902C41.0859 28.2377 41.7358 28.7623 41.7358 28.7623C42.4508 29.0902 42.7108 30.2049 42.7108 30.2049C43.2958 28.6967 42.9058 27.1885 42.9058 27.1885C42.7758 26.5984 43.1658 26.7951 43.1658 26.7951C45.9606 27.3852 46.7406 26.6639 46.7406 26.6639C45.7656 26.2049 45.6356 24.7623 45.6356 24.7623C45.7006 23.6475 46.7406 23.9098 46.7406 23.9098C47.7805 24.1066 48.3655 24.8279 48.3655 24.8279C48.5605 23.0574 47.1306 21.6148 47.1306 21.6148C46.9356 21.0246 47.3256 20.7623 47.3256 20.7623C49.9904 19.7787 49.9904 18.2705 49.9904 18.2705C48.4305 18.5984 48.1055 17.2869 48.1055 17.2869C49.0155 15.3852 51.1604 16.041 51.1604 16.041Z" fill="#00B7BD"/>
            <path d="M65.6252 10.6539C64.5505 10.645 63.3959 10.7704 62.3833 11.1646C62.3833 11.1646 57.1875 13.1897 56.7168 18.9066C56.7168 18.9066 56.0772 23.6377 58.1999 26.7112C58.1999 26.7112 59.8343 29.4801 63.3159 30.2776C63.3159 30.2776 70.4656 32.3474 74.2137 25.8151C74.2137 25.8151 74.5336 25.2326 74.1339 24.7577L71.9312 23.4047C71.9312 23.4047 71.3184 23.136 70.8477 23.826C70.8477 23.826 69.844 25.7166 68.1388 26.299C68.1388 26.299 65.7494 27.1772 63.7777 26.299C63.7777 26.299 61.1308 25.4209 60.7489 21.1108H74.0895C74.0895 21.1108 74.7465 21.1646 74.8531 20.3851C74.8531 20.3851 75.3063 13.2255 69.471 11.1736C69.4444 11.1646 67.6768 10.6629 65.6252 10.6539ZM65.927 14.2649C67.4902 14.247 68.494 14.7937 68.494 14.7937C70.7233 15.86 70.67 18.3152 70.67 18.3152H60.98C61.7349 15.4658 63.2982 14.8206 63.2982 14.8206C64.2663 14.4174 65.1632 14.2739 65.927 14.2649Z" fill="#00B7BD"/>
            <path d="M91.4524 2.19414C91.4524 2.19414 90.9371 2.22105 90.8217 2.90206V14.2461C90.8217 14.2461 89.907 11.9164 87.6333 11.101C87.6333 11.101 84.6934 10.0884 82.0822 11.1188C82.0822 11.1188 78.8402 12.0328 77.3392 17.2568C77.3392 17.2568 76.5312 19.8734 77.2417 23.7353C77.2417 23.7353 77.8545 27.6331 81.567 29.8464C81.567 29.8464 84.2136 31.4593 88.086 29.8464C88.086 29.8464 89.7736 29.1833 90.8394 27.427V29.0489C90.8394 29.0489 90.8038 29.6671 91.4344 29.7657H94.1967C94.1967 29.7657 94.8272 29.6672 94.8094 28.9862V2.92883C94.8094 2.92883 94.8097 2.35543 94.1169 2.19414H91.4524ZM85.9988 14.3535C88.8055 14.3535 91.0791 17.1941 91.0791 20.7066C91.0791 24.2192 88.8055 27.0597 85.9988 27.0597C83.1922 27.0597 80.9186 24.2192 80.9186 20.7066C80.9186 17.1941 83.1922 14.3535 85.9988 14.3535Z" fill="#00B7BD"/>
            <path d="M98.5419 11.2709H101.091C101.091 11.2709 101.74 11.1903 101.819 12.0236L101.846 22.83C101.846 22.83 101.899 25.9035 104.475 26.5756C104.475 26.5756 106.429 27.0684 108.134 26.5756C108.134 26.5756 110.772 25.9842 110.79 22.8032V12.0416C110.79 12.0416 110.71 11.2977 111.456 11.2709H114.04C114.04 11.2709 114.804 11.1992 114.84 11.934V21.5846C114.84 21.5846 114.858 27.4178 111.394 29.3623C111.394 29.3623 106.811 32.0415 101.171 29.3623C101.171 29.3623 98.3465 28.2064 97.8758 22.4626V11.952C97.8669 11.952 97.8758 11.2977 98.5419 11.2709Z" fill="#00B7BD"/>
            <path d="M131.395 14.8925V12.1328C131.395 12.1328 131.439 11.7385 130.826 11.4607C130.826 11.4607 126.581 9.40874 121.811 11.7743C121.811 11.7743 118.427 13.2707 117.379 17.4373C117.379 17.4373 116.509 21.0843 117.379 23.7367C117.379 23.7367 118.356 28.1273 122.3 29.7044C122.3 29.7044 125.844 31.613 130.897 29.561C130.897 29.561 131.412 29.4265 131.403 28.8262V26.138C131.403 26.138 131.226 25.3047 130.444 25.5018C130.444 25.5018 130.205 25.5735 129.929 25.7706C129.929 25.7706 129.005 26.4517 127.895 26.6041C127.895 26.6041 125.586 27.0342 123.961 26.0664C123.961 26.0664 121.66 25.1972 121.163 21.3621C121.163 21.3621 120.985 19.767 121.163 19.104C121.163 19.104 121.678 15.3765 125.027 14.5969C125.027 14.5969 126.723 14.1398 128.801 14.6596C128.801 14.6596 129.849 15.0896 130.196 15.3853C130.187 15.3853 131.022 15.914 131.395 14.8925Z" fill="#00B7BD"/>
            <path d="M140.401 10.7063C139.557 10.7063 138.625 10.8138 137.728 11.1722C137.728 11.1722 134.495 12.0862 132.994 17.3102C132.994 17.3102 132.186 19.9267 132.896 23.7887C132.896 23.7887 133.509 27.6865 137.221 29.8998C137.221 29.8998 139.868 31.5127 143.732 29.8998C143.732 29.8998 145.419 29.2367 146.485 27.4804V29.1022C146.485 29.1022 146.449 29.7205 147.08 29.8191H149.842C149.842 29.8191 150.473 29.7206 150.455 29.0396V11.9967C150.455 11.9967 150.455 11.4231 149.763 11.2618H147.08C147.08 11.2618 146.565 11.2887 146.45 11.9697V14.2995C146.45 14.2995 145.535 11.9698 143.27 11.1543C143.279 11.1543 142.009 10.7153 140.401 10.7063ZM141.627 14.4069C144.433 14.4069 146.707 17.2475 146.707 20.76C146.707 24.2636 144.433 27.1131 141.627 27.1131C138.82 27.1131 136.547 24.2725 136.547 20.76C136.547 17.2564 138.82 14.4069 141.627 14.4069Z" fill="#00B7BD"/>
            <path d="M167.445 14.8821V12.1221C167.445 12.1221 167.49 11.7279 166.877 11.4501C166.877 11.4501 162.632 9.39814 157.862 11.7637C157.862 11.7637 154.478 13.2602 153.43 17.4269C153.43 17.4269 152.56 21.0737 153.43 23.7261C153.43 23.7261 154.407 28.1169 158.351 29.6939C158.351 29.6939 161.895 31.6024 166.948 29.5504C166.948 29.5504 167.463 29.4161 167.454 28.8157V26.1276C167.454 26.1276 167.277 25.2943 166.495 25.4914C166.495 25.4914 166.255 25.5631 165.98 25.7602C165.98 25.7602 165.056 26.4411 163.946 26.5934C163.946 26.5934 161.637 27.0236 160.012 26.0558C160.012 26.0558 157.711 25.1866 157.214 21.3515C157.214 21.3515 157.036 19.7566 157.214 19.1025C157.214 19.1025 157.729 15.375 161.077 14.5954C161.077 14.5954 162.774 14.1383 164.852 14.6581C164.852 14.6581 165.9 15.0881 166.246 15.3838C166.229 15.3749 167.072 15.8946 167.445 14.8821Z" fill="#DF2B3C"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M191.292 10.6165C185.918 10.6165 181.566 15.1147 181.566 20.6523C181.566 26.19 185.918 30.6882 191.292 30.6882C196.665 30.6882 201.017 26.19 201.017 20.6523C201.017 15.1147 196.665 10.6165 191.292 10.6165ZM191.292 14.38C194.338 14.38 196.808 17.1935 196.808 20.6613C196.808 24.129 194.338 26.9426 191.292 26.9426C188.245 26.9426 185.777 24.129 185.777 20.6613C185.777 17.1935 188.245 14.38 191.292 14.38Z" fill="#DF2B3C"/>
            <path d="M170.181 12.7667V29.6662C170.181 29.6662 170.128 30.4995 171.016 30.5353H173.583C173.583 30.5353 174.214 30.5354 174.285 29.7917V21.2255C174.285 21.2255 174.223 16.6287 176.354 15.3652C176.354 15.3652 177.616 14.6662 179.649 15.3024C179.649 15.3024 180.324 15.5981 180.715 15.1591L181.666 12.8921C181.666 12.8921 181.879 12.0319 181.275 11.8795C181.275 11.8795 178.353 10.4816 176.026 12.3006C176.026 12.3006 174.862 13.134 174.329 14.8902V12.7397C174.329 12.7397 174.356 11.987 173.619 11.9781H170.892C170.883 11.987 170.324 11.9871 170.181 12.7667Z" fill="#DF2B3C"/>
            <path d="M211.516 15.034C211.516 15.034 211.881 15.5269 212.618 15.1505L214.234 13.9139C214.234 13.9139 214.669 13.5198 214.332 12.9821C214.332 12.9821 213.088 10.9032 210.166 10.6613C210.166 10.6613 208.07 10.4821 206.889 10.8405C206.889 10.8405 203.114 11.5395 202.43 15.0431C202.43 15.0431 202.191 16.0556 202.493 17.4176C202.493 17.4176 202.865 19.6128 205.832 20.939C205.832 20.939 209.633 22.6863 209.829 22.7759C209.829 22.7759 211.978 23.6451 211.561 25.4193C211.561 25.4193 211.419 26.9427 209.713 27.2742C209.713 27.2742 206.613 28.0626 205.166 25.5537C205.166 25.5537 204.802 24.7562 204.091 24.9354L202.022 26.1093C202.022 26.1093 201.427 26.4856 201.809 27.1577C201.809 27.1577 202.661 28.7974 204.313 29.6755C204.313 29.6755 206.818 31.3512 211.241 30.2132C211.241 30.2132 214.305 29.2006 215.069 27.1666C215.069 27.1666 215.922 25.491 215.389 23.0806C215.389 23.0806 214.874 21.0108 212.431 19.7922C212.431 19.7922 209.056 18.2778 208.603 18.1434C208.603 18.1434 206.356 17.1846 206.392 15.9928C206.392 15.9928 206.019 14.6756 207.573 14.0394C207.573 14.0394 208.781 13.439 210.335 14.0394C210.326 14.0394 211.081 14.353 211.516 15.034Z" fill="#DF2B3C"/>
            <path d="M226.508 15.2215C226.508 15.2215 226.873 15.7143 227.61 15.3379L229.226 14.1015C229.226 14.1015 229.661 13.7072 229.324 13.1695C229.324 13.1695 228.081 11.0907 225.158 10.8487C225.158 10.8487 223.063 10.6695 221.881 11.0279C221.881 11.0279 218.106 11.7269 217.422 15.2305C217.422 15.2305 217.183 16.243 217.485 17.605C217.485 17.605 217.858 19.8003 220.824 21.1264C220.824 21.1264 224.625 22.8737 224.821 22.9633C224.821 22.9633 226.97 23.8326 226.553 25.6158C226.553 25.6158 226.411 27.139 224.714 27.4706C224.714 27.4706 221.615 28.2592 220.167 25.7502C220.167 25.7502 219.803 24.9527 219.092 25.1319L217.023 26.3057C217.023 26.3057 216.428 26.682 216.81 27.354C216.81 27.354 217.662 28.9939 219.314 29.8721C219.314 29.8721 221.819 31.5477 226.242 30.4097C226.242 30.4097 229.306 29.3972 230.07 27.3631C230.07 27.3631 230.923 25.6873 230.39 23.277C230.39 23.277 229.875 21.2071 227.432 19.9885C227.432 19.9885 224.057 18.4741 223.604 18.3397C223.604 18.3397 221.357 17.3809 221.393 16.1892C221.393 16.1892 221.019 14.8721 222.574 14.2359C222.574 14.2359 223.782 13.6355 225.336 14.2359C225.327 14.2269 226.082 14.5405 226.508 15.2215Z" fill="#DF2B3C"/>
          </svg>
        </div>
      </div>
      
      <div class="navbar-column d-flex justify-content-end align-items-center md:gap-3 gap-1 flex-1">
        <div>
          <button type="button" class="btn text-nowrap btn-primary btn-sm rounded-pill">
            <span style="font-size: 20px; margin-right: 8px;">🎮</span>
            <span class="align-middle d-none d-md-inline">Como Jogar?</span>
          </button>
        </div>
        
        <ul class="navbar-nav">
          <li class="nav-item dropdown dropdown-user">
            <a role="button" href="#" class="nav-link dropdown-toggle d-flex align-items-center dropdown-user-link" onclick="event.preventDefault(); this.nextElementSibling.classList.toggle('show');">
              <div class="d-xl-flex d-none user-nav">
                <p class="user-name d-flex flex-column justify-content-center align-items-end mb-0 mr-50" style="line-height: 1.5rem;">
                  <span class="text-body d-none d-lg-inline" style="font-weight: 500;">Fabio Alves</span>
                </p>
              </div>
              <span class="b-avatar badge-light-primary rounded-circle" style="width: 40px; height: 40px;">
                <div style="width: 40px; height: 40px; background: #7367f0; color: white; display: flex; align-items: center; justify-content: center; border-radius: 50%; font-weight: bold; font-size: 14px;">FA</div>
              </span>
            </a>
            
            <ul class="dropdown-menu dropdown-menu-right">
              <li>
                <a href="#" class="dropdown-item d-flex align-items-center" onclick="event.preventDefault();">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16px" height="16px" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-50 feather feather-edit">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                  </svg>
                  <span>Editar conta</span>
                </a>
              </li>
              <li>
                <a href="#" class="dropdown-item d-flex align-items-center" onclick="event.preventDefault();">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16px" height="16px" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-50 feather feather-log-out">
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                    <polyline points="16 17 21 12 16 7"></polyline>
                    <line x1="21" y1="12" x2="9" y2="12"></line>
                  </svg>
                  <span>Sair</span>
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
    
    <div style="padding: 24px; background: #f8f8f8; min-height: 200px;">
      <p style="color: #666; text-align: center; margin-top: 60px;">
        <strong>✅ Versão Production-Ready</strong><br>
        Logo incorporada inline, emoji como ícone, avatar CSS puro.<br>
        Funciona 100% em GitHub Pages sem dependências externas.
      </p>
    </div>
  `,
};
