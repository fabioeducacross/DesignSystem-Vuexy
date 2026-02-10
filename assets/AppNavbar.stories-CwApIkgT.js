const g={title:"Educacross Components V2/Navigation/AppNavbar",tags:["autodocs"],parameters:{layout:"fullscreen",docs:{description:{component:`
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
        `}}}},m=`
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
      .md:gap-3 {
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
`,e={render:()=>`
    ${m}
    <div class="navbar-container d-flex align-items-center justify-content-between gap-2 bg-white p-50">
      <div class="flex-1"></div>
      
      <div class="navbar-column d-flex justify-content-center flex-1">
        <div class="logo-container">
          <img src="/educacross-assets/logo-educacross.svg" alt="logo" />
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
                  <img src="https://blob.educacross.com.br/accountpicture/23005008-6435-4325-8f3b-831f06ac1b23.png" alt="avatar">
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
  `},n={render:()=>`
    ${m}
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
  `};var a,t,o,i,s;e.parameters={...e.parameters,docs:{...(a=e.parameters)==null?void 0:a.docs,source:{originalSource:`{
  render: () => \`
    \${styles}
    <div class="navbar-container d-flex align-items-center justify-content-between gap-2 bg-white p-50">
      <div class="flex-1"></div>
      
      <div class="navbar-column d-flex justify-content-center flex-1">
        <div class="logo-container">
          <img src="/educacross-assets/logo-educacross.svg" alt="logo" />
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
                  <img src="https://blob.educacross.com.br/accountpicture/23005008-6435-4325-8f3b-831f06ac1b23.png" alt="avatar">
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
  \`
}`,...(o=(t=e.parameters)==null?void 0:t.docs)==null?void 0:o.source},description:{story:"Variação padrão do navbar - exatamente como no código real",...(s=(i=e.parameters)==null?void 0:i.docs)==null?void 0:s.description}}};var r,l,d,c,p;n.parameters={...n.parameters,docs:{...(r=n.parameters)==null?void 0:r.docs,source:{originalSource:`{
  render: () => \`
    \${styles}
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
  \`
}`,...(d=(l=n.parameters)==null?void 0:l.docs)==null?void 0:d.source},description:{story:"Navbar com menu lateral (contexto Professor/Aluno dentro da plataforma)",...(p=(c=n.parameters)==null?void 0:c.docs)==null?void 0:p.description}}};const u=["Default","WithSidebarMenu"];export{e as Default,n as WithSidebarMenu,u as __namedExportsOrder,g as default};
