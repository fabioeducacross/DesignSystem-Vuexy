const K={title:"Educacross Components V2/Navigation/Sidebar",tags:["autodocs"],parameters:{docs:{description:{component:`
# Sidebar (Menu Vertical)

Menu de navegação lateral utilizado em toda a plataforma Educacross.

## Contextos de Uso

### 1. Professor (Teacher)
- Painel Inicial
- Missões da Escola (Criar Missão, Missões, Ranking)
- Sistema de Ensino
- Relatórios Gerais
- Explorar Jogos
- Turmas
- Grupos
- Alunos
- Expedição Leitura
- Eventos
- High Five

### 2. Administrador (Admin)
- Painel Inicial
- Missões da Escola (Missões, Missões Plus)
- Sistema de Ensino
- Relatórios Gerais
- Cadastros (Turmas, Grupos, Alunos)
- Super Trilhas
- EDUCACROSS
- Instituto J&F
- Avaliações
- Expedição Leitura
- Eventos
- High Five

### 3. Aluno (Student)
- Painel Inicial
- Missões da Escola
- Sistema de Ensino
- Treinos da Família
- High Five

## Características

- **Fundo**: Roxo escuro (#2D2850)
- **Item ativo**: Fundo roxo claro (#6D5DD3)
- **Ícones**: Material Symbols Outlined
- **Hover**: Expandir para mostrar texto completo
- **Responsive**: Colapsa em mobile

## Arquivos no Projeto

\`\`\`
educacross-frontoffice/src/@core/layouts/layout-vertical/components/
  vertical-nav-menu/
    ├── VerticalNavMenu.vue (Container principal)
    ├── components/
    │   ├── vertical-nav-menu-items/VerticalNavMenuItems.vue
    │   ├── vertical-nav-menu-link/VerticalNavMenuLink.vue
    │   └── vertical-nav-menu-group/VerticalNavMenuGroup.vue
    └── useVerticalNavMenu.js

educacross-frontoffice/src/navigation/vertical/
  ├── index.js (Configuração de rotas)
  ├── teacher.js (Menu do professor)
  ├── admin.js (Menu do admin)
  ├── student.js (Menu do aluno)
  └── networkManager.js (Menu do gestor de rede)
\`\`\`

## Integração com Vue Router

O sidebar usa \`vue-router\` para navegação. Cada item possui:
- \`route\`: Nome da rota
- \`icon\`: Ícone Material Symbols
- \`title\`: Título do item
- \`resource\`: Permissão necessária
- \`action\`: Ação permitida (READ, CREATE, etc.)

## ACL (Access Control List)

Utiliza \`@casl/ability\` para controlar permissões:
- Items só aparecem se o usuário tiver permissão (\`canViewVerticalNavMenuLink\`)
- Baseado em \`resource\` e \`action\` do item
        `}}}},i=`
<style>
  /* Load Google Fonts for Material Symbols */
  @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200');

  /* Sidebar container */
  .main-menu {
    position: fixed;
    left: 0;
    top: 64px;
    bottom: 0;
    width: 260px;
    background: #2D2850;
    transition: width 0.3s, transform 0.3s;
    z-index: 1000;
    overflow: hidden;
  }

  .main-menu.collapsed {
    width: 80px;
  }

  .main-menu-content {
    height: 100%;
    overflow-y: auto;
    padding: 20px 0;
  }

  /* Navigation list */
  .navigation {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .nav-item {
    margin: 4px 0;
    transition: all 0.2s;
  }

  .nav-item a {
    display: flex;
    align-items: center;
    padding: 12px 20px;
    color: rgba(255, 255, 255, 0.8);
    text-decoration: none;
    transition: all 0.2s;
    position: relative;
  }

  .nav-item a:hover {
    background: rgba(109, 93, 211, 0.2);
    color: #fff;
  }

  .nav-item.active a {
    background: #6D5DD3;
    color: #fff;
    border-radius: 6px;
    margin: 0 8px;
    padding-left: 12px;
    padding-right: 12px;
  }

  /* Icons */
  .nav-item .material-symbols-outlined {
    font-size: 24px;
    margin-right: 12px;
    min-width: 24px;
    transition: all 0.2s;
  }

  .collapsed .nav-item .material-symbols-outlined {
    margin-right: 0;
  }

  /* Menu title */
  .menu-title {
    font-size: 14px;
    font-weight: 400;
    white-space: nowrap;
    opacity: 1;
    transition: opacity 0.2s;
  }

  .collapsed .menu-title {
    opacity: 0;
    width: 0;
  }

  /* Group items (submenu) */
  .nav-group {
    position: relative;
  }

  .nav-group .group-toggle {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px 20px;
    color: rgba(255, 255, 255, 0.8);
    cursor: pointer;
    transition: all 0.2s;
  }

  .nav-group .group-toggle:hover {
    background: rgba(109, 93, 211, 0.2);
    color: #fff;
  }

  .nav-group .chevron {
    font-size: 18px;
    transition: transform 0.2s;
  }

  .nav-group.open .chevron {
    transform: rotate(90deg);
  }

  .nav-group .submenu {
    list-style: none;
    padding: 0;
    margin: 0;
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.3s;
  }

  .nav-group.open .submenu {
    max-height: 500px;
  }

  .nav-group .submenu .nav-item a {
    padding-left: 56px;
    font-size: 13px;
  }

  .submenu-marker {
    font-size: 16px;
    margin-right: 12px;
    opacity: 0.5;
    line-height: 1;
  }
    font-size: 13px;
  }

  /* Powered by footer (Somos Play only) */
  .powered-by-footer {
    bottom: 20px;
    left: 0;
    padding: 16px;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
  }

  .powered-text {
    color: rgba(255, 255, 255, 0.6);
    font-size: 11px;
    margin-right: 6px;
  }

  .logo-img {
    height: 20px;
    margin: 0 4px;
  }

  /* Scrollbar styling */
  .main-menu-content::-webkit-scrollbar {
    width: 6px;
  }

  .main-menu-content::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.05);
  }

  .main-menu-content::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.2);
    border-radius: 3px;
  }

  .main-menu-content::-webkit-scrollbar-thumb:hover {
    background: rgba(255, 255, 255, 0.3);
  }

  /* Story container adjustments */
  .story-container {
    margin: 0;
    padding: 0;
    height: 100vh;
    background: #f8f8f8;
  }

  .main-content-demo {
    margin-left: 260px;
    padding: 24px;
    transition: margin-left 0.3s;
  }

  .collapsed + .main-content-demo {
    margin-left: 80px;
  }
</style>
`,a=(s,o,t=!1,n=null)=>`
  <li class="nav-item${t?" active":""}">
    <a href="#" class="d-flex align-items-center">
      <span class="material-symbols-outlined">${s}</span>
      <span class="menu-title">${o}</span>
      ${n?`<span class="badge badge-pill badge-${n.variant} ml-auto">${n.text}</span>`:""}
    </a>
  </li>
`,e=(s,o,t,n=!1)=>`
  <li class="nav-group${n?" open":""}">
    <div class="group-toggle">
      <div class="d-flex align-items-center">
        <span class="material-symbols-outlined">${s}</span>
        <span class="menu-title">${o}</span>
      </div>
      <span class="material-symbols-outlined chevron">chevron_right</span>
    </div>
    <ul class="submenu">
      ${t.map(g=>`
        <li class="nav-item">
          <a href="#" class="d-flex align-items-center">
            <span class="submenu-marker">•</span>
            <span class="menu-title">${g.title}</span>
          </a>
        </li>
      `).join("")}
    </ul>
  </div>
`,r={render:()=>`
      ${i}
      <div class="story-container">
        <div class="main-menu">
          <div class="main-menu-content">
            <ul class="navigation">
              ${a("grid_view","Painel Inicial",!0)}
              
              ${e("flag","Missões da Escola",[{title:"Criar Missão"},{title:"Missões"}],!0)}
              
              ${e("pie_chart","Relatórios Gerais",[{title:"Relatório de Evidências"},{title:"Habilidades"},{title:"Acesso dos Alunos"}])}
              
              ${e("map","Explorar Jogos",[{title:"Configurações da Ilha"},{title:"Ranking de Conquistas"}])}
              
              ${a("work_outline","Turmas")}
              ${a("groups","Grupos")}
              ${a("group","Alunos")}
              
              ${e("quiz","Avaliações",[{title:"Complexidade Narrativa"},{title:"Fases da Escrita"},{title:"Fluência Leitora"},{title:"Fluência Leitora"},{title:"Avaliação Digital"},{title:"Simulados"}])}
              
              ${a("book_5","Expedição Leitura")}
              ${a("calendar_today","Eventos")}
              ${a("camera","High Five")}
              ${a("file_download","Ajudas e Materiais")}
              ${a("screen_search_desktop","Educateca")}
            </ul>
          </div>
        </div>

        <div class="main-content-demo">
          <h2>👨‍🏫 Perfil: Professor (Teacher)</h2>
          <p class="text-muted mb-4">Menu completo com todas as funcionalidades disponíveis para professores.</p>
          
          <div class="card" style="background: white; padding: 24px; border-radius: 8px; box-shadow: 0 2px 12px rgba(0,0,0,0.1); margin-bottom: 20px;">
            <h4 class="mb-3">🎯 Funcionalidades Principais</h4>
            <ul style="line-height: 1.8;">
              <li><strong>Missões da Escola:</strong> Criar missões personalizadas e gerenciar atividades dos alunos</li>
              <li><strong>Relatórios Gerais:</strong> Evidências, habilidades e análise de acessos</li>
              <li><strong>Explorar Jogos:</strong> Configurar ilhas e visualizar rankings de conquistas</li>
              <li><strong>Gestão:</strong> Turmas, grupos e alunos sob responsabilidade</li>
              <li><strong>Avaliações:</strong> Complexidade narrativa, fases da escrita, fluência leitora, avaliações digitais e simulados</li>
              <li><strong>Recursos:</strong> Expedição leitura, eventos, High Five e materiais de apoio</li>
            </ul>
          </div>
          
          <div class="card" style="background: #f8f9fa; padding: 20px; border-radius: 8px; border-left: 4px solid #7367F0;">
            <h5 class="mb-2">📊 Total de Menu Items</h5>
            <p class="mb-0"><strong>13 itens principais</strong> (6 com submenus) = <strong>~25 opções totais</strong></p>
          </div>
        </div>
      </div>
    `},l={render:()=>`
      ${i}
      <div class="story-container">
        <div class="main-menu">
          <div class="main-menu-content">
            <ul class="navigation">
              ${a("grid_view","Painel Inicial",!0)}
              
              ${e("pie_chart","Relatórios Gerais",[{title:"Visão Geral"},{title:"Volume de Acessos"},{title:"Acessos Mensais Alunos"},{title:"Acessos Professores"},{title:"Evidências Escolas"},{title:"Evidências Alunos"},{title:"Habilidades"},{title:"Ranking de Conquistas"}],!0)}
              
              ${e("flag","Missões da Escola",[{title:"Missões"},{title:"Missões Plus"}])}
              
              ${a("auto_stories","Sistema de Ensino")}
              
              ${e("how_to_reg","Cadastros",[{title:"Alunos"},{title:"Turmas"},{title:"Grupos"},{title:"Professores"},{title:"Coordenadores"},{title:"Diretores"}])}
              
              ${a("person_play","Gerenciador")}
              ${a("calendar_today","Eventos")}
              
              ${e("quiz","Avaliações",[{title:"Complexidade Narrativa"},{title:"Fases da Escrita"},{title:"Fluência Leitora"},{title:"Fluência Leitora"},{title:"Avaliação Digital"},{title:"Simulados"}])}
              
              ${a("book_5","Expedição Leitura")}
              ${a("file_download","Ajudas e Materiais")}
            </ul>
          </div>
        </div>

        <div class="main-content-demo">
          <h2>👨‍💼 Perfil: Administrador (Admin)</h2>
          <p class="text-muted mb-4">Menu completo com permissões administrativas para gestão escolar.</p>
          
          <div class="card" style="background: white; padding: 24px; border-radius: 8px; box-shadow: 0 2px 12px rgba(0,0,0,0.1); margin-bottom: 20px;">
            <h4 class="mb-3">🎯 Funcionalidades Administrativas</h4>
            <ul style="line-height: 1.8;">
              <li><strong>Relatórios Gerais:</strong> 8 tipos de relatórios detalhados (visão geral, acessos, evidências, habilidades, rankings)</li>
              <li><strong>Missões da Escola:</strong> Gestão completa de missões e missões Plus</li>
              <li><strong>Sistema de Ensino:</strong> Configuração e acompanhamento de conteúdos educacionais</li>
              <li><strong>Cadastros:</strong> 6 tipos de cadastros (alunos, turmas, grupos, professores, coordenadores, diretores)</li>
              <li><strong>Gerenciador:</strong> Controle de módulos e permissões do sistema</li>
              <li><strong>Avaliações:</strong> Complexidade narrativa, fases da escrita, fluência leitora, avaliações digitais e simulados</li>
              <li><strong>Recursos:</strong> Expedição leitura, eventos e materiais de apoio</li>
            </ul>
          </div>
          
          <div class="card" style="background: #f8f9fa; padding: 20px; border-radius: 8px; border-left: 4px solid #28C76F;">
            <h5 class="mb-2">📊 Total de Menu Items</h5>
            <p class="mb-0"><strong>11 itens principais</strong> (4 com submenus extensos) = <strong>~31 opções totais</strong></p>
          </div>
          
          <div class="alert" style="background: #fff3cd; padding: 15px; border-radius: 6px; margin-top: 20px; border-left: 4px solid #ffc107;">
            <strong>⚠️ Nota:</strong> Menu mais completo da plataforma, com acesso a todas as funcionalidades de gestão escolar.
          </div>
        </div>
      </div>
    `},d={render:()=>`
      ${i}
      <div class="story-container">
        <div class="main-menu">
          <div class="main-menu-content">
            <ul class="navigation">
              ${a("grid_view","Painel Inicial",!0)}
              
              ${e("pie_chart","Relatórios Gerais",[{title:"Visão Geral"},{title:"Volume de Acessos"},{title:"Acessos Mensais Alunos"},{title:"Acessos Professores"},{title:"Evidências Escolas"},{title:"Evidências Alunos"},{title:"Habilidades"},{title:"Ranking de Conquistas"}],!0)}
              
              ${e("flag","Missões da Escola",[{title:"Missões"},{title:"Missões Plus"}])}
              
              ${a("auto_stories","Sistema de Ensino")}
              
              ${e("how_to_reg","Cadastros",[{title:"Turmas"},{title:"Grupos"},{title:"Professores"},{title:"Alunos"},{title:"Coordenadores"},{title:"Diretores"},{title:"Migrar Alunos"},{title:"Transferir Alunos"}])}
              
              ${a("person_play","Gerenciador")}
              ${a("calendar_today","Eventos")}
              
              ${e("quiz","Avaliações",[{title:"Complexidade Narrativa"},{title:"Fases da Escrita"},{title:"Fluência Leitora"},{title:"Fluência Leitora"},{title:"Avaliação Digital"},{title:"Simulados"}])}
              
              ${a("book_5","Expedição Leitura")}
              ${a("file_download","Ajudas e Materiais")}
            </ul>
          </div>
        </div>

        <div class="main-content-demo">
          <h2>🌐 Perfil: Gestor de Rede (Network Manager)</h2>
          <p class="text-muted mb-4">Menu completo para gestão de múltiplas escolas e instituições da rede.</p>
          
          <div class="card" style="background: white; padding: 24px; border-radius: 8px; box-shadow: 0 2px 12px rgba(0,0,0,0.1); margin-bottom: 20px;">
            <h4 class="mb-3">🎯 Funcionalidades de Rede</h4>
            <ul style="line-height: 1.8;">
              <li><strong>Visão Consolidada:</strong> Relatórios gerais de todas as escolas da rede</li>
              <li><strong>Missões da Escola:</strong> Gestão de missões em múltiplas instituições</li>
              <li><strong>Sistema de Ensino:</strong> Configuração unificada para toda a rede</li>
              <li><strong>Cadastros Avançados:</strong> 8 tipos incluindo migração e transferência de alunos entre escolas</li>
              <li><strong>Gerenciador:</strong> Controle centralizado de módulos e permissões</li>
              <li><strong>Avaliações:</strong> Acompanhamento de todas as modalidades em nível de rede</li>
              <li><strong>Recursos:</strong> Expedição leitura, eventos e materiais para toda a rede</li>
            </ul>
          </div>
          
          <div class="card" style="background: #f8f9fa; padding: 20px; border-radius: 8px; border-left: 4px solid #00CFE8;">
            <h5 class="mb-2">📊 Total de Menu Items</h5>
            <p class="mb-0"><strong>11 itens principais</strong> (4 com submenus extensos) = <strong>~33 opções totais</strong></p>
          </div>
          
          <div class="alert" style="background: #e7f3ff; padding: 15px; border-radius: 6px; margin-top: 20px; border-left: 4px solid #0091ea;">
            <strong>🔑 Diferencial:</strong> Inclui funcionalidades exclusivas para gestão de rede como "Migrar Alunos" e "Transferir Alunos" entre instituições.
          </div>
        </div>
      </div>
    `},c={render:()=>`
      ${i}
      <div class="story-container">
        <div class="main-menu">
          <div class="main-menu-content">
            <ul class="navigation">
              ${a("home","Painel Inicial",!0)}
              ${a("flag","Missões da Escola")}
              ${a("supervisor_account","Treinos da Família")}
              ${a("camera","High Five")}
            </ul>
          </div>
        </div>

        <div class="main-content-demo">
          <h2>👦 Perfil: Aluno (Student)</h2>
          <p class="text-muted mb-4">Menu simplificado e intuitivo focado na experiência de aprendizado do estudante.</p>
          
          <div class="card" style="background: white; padding: 24px; border-radius: 8px; box-shadow: 0 2px 12px rgba(0,0,0,0.1); margin-bottom: 20px;">
            <h4 class="mb-3">🎯 Funcionalidades do Estudante</h4>
            <ul style="line-height: 1.8;">
              <li><strong>Painel Inicial:</strong> Visão geral do progresso e próximas atividades</li>
              <li><strong>Missões da Escola:</strong> Atividades e missões atribuídas pelos professores</li>
              <li><strong>Sistema de Ensino:</strong> Conteúdos educacionais organizados por disciplina (dinâmico via educationSystem)</li>
              <li><strong>Treinos da Família:</strong> Atividades compartilhadas com responsáveis</li>
              <li><strong>High Five:</strong> Compartilhar conquistas e interagir com colegas</li>
            </ul>
          </div>
          
          <div class="card" style="background: #f8f9fa; padding: 20px; border-radius: 8px; border-left: 4px solid #FF9F43;">
            <h5 class="mb-2">📊 Total de Menu Items</h5>
            <p class="mb-0"><strong>4 itens fixos</strong> + <strong>Sistema de Ensino dinâmico</strong> = <strong>~5-8 opções totais</strong></p>
          </div>
          
          <div class="alert" style="background: #fff4e6; padding: 15px; border-radius: 6px; margin-top: 20px; border-left: 4px solid #ff9800;">
            <strong>✨ Design Amigável:</strong> Interface simplificada e visualmente atrativa para engajar estudantes de todas as idades.
          </div>
          
          <div class="alert" style="background: #e8f5e9; padding: 15px; border-radius: 6px; margin-top: 15px; border-left: 4px solid #4caf50;">
            <strong>📚 Nota:</strong> O item "Sistema de Ensino" é adicionado dinamicamente baseado nos sistemas educacionais configurados para o aluno.
          </div>
        </div>
      </div>
    `},p={render:()=>`
      ${i}
      <style>
        .main-menu.collapsed {
          width: 80px;
        }
        .main-menu.collapsed .menu-title {
          opacity: 0;
          width: 0;
          margin: 0;
          overflow: hidden;
        }
        .main-menu.collapsed .nav-item-icon {
          margin-right: 0;
          display: flex;
          justify-content: center;
          width: 100%;
        }
        .main-menu.collapsed .group-submenu {
          display: none !important;
        }
        .main-menu.collapsed .group-toggle::after {
          display: none;
        }
        .main-menu.collapsed .nav-item {
          justify-content: center;
          padding: 0;
        }
        .main-menu.collapsed .nav-item a {
          justify-content: center;
        }
        /* Tooltip on hover */
        .main-menu.collapsed .nav-item {
          position: relative;
        }
        .main-menu.collapsed .nav-item:hover::after {
          content: attr(data-tooltip);
          position: absolute;
          left: 85px;
          background: #2D2850;
          color: white;
          padding: 8px 12px;
          border-radius: 6px;
          white-space: nowrap;
          z-index: 1000;
          font-size: 13px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        }
      </style>
      <div class="story-container">
        <div class="main-menu collapsed">
          <div class="main-menu-content">
            <ul class="navigation">
              <li class="nav-item active" data-tooltip="Painel Inicial">
                <a href="#" class="nav-link">
                  <span class="nav-item-icon material-symbols-outlined">grid_view</span>
                  <span class="menu-title">Painel Inicial</span>
                </a>
              </li>
              <li class="nav-item" data-tooltip="Missões da Escola">
                <a href="#" class="nav-link">
                  <span class="nav-item-icon material-symbols-outlined">flag</span>
                  <span class="menu-title">Missões</span>
                </a>
              </li>
              <li class="nav-item" data-tooltip="Relatórios Gerais">
                <a href="#" class="nav-link">
                  <span class="nav-item-icon material-symbols-outlined">pie_chart</span>
                  <span class="menu-title">Relatórios</span>
                </a>
              </li>
              <li class="nav-item" data-tooltip="Explorar Jogos">
                <a href="#" class="nav-link">
                  <span class="nav-item-icon material-symbols-outlined">map</span>
                  <span class="menu-title">Jogos</span>
                </a>
              </li>
              <li class="nav-item" data-tooltip="Turmas">
                <a href="#" class="nav-link">
                  <span class="nav-item-icon material-symbols-outlined">work_outline</span>
                  <span class="menu-title">Turmas</span>
                </a>
              </li>
              <li class="nav-item" data-tooltip="Grupos">
                <a href="#" class="nav-link">
                  <span class="nav-item-icon material-symbols-outlined">groups</span>
                  <span class="menu-title">Grupos</span>
                </a>
              </li>
              <li class="nav-item" data-tooltip="Alunos">
                <a href="#" class="nav-link">
                  <span class="nav-item-icon material-symbols-outlined">group</span>
                  <span class="menu-title">Alunos</span>
                </a>
              </li>
              <li class="nav-item" data-tooltip="Avaliações">
                <a href="#" class="nav-link">
                  <span class="nav-item-icon material-symbols-outlined">quiz</span>
                  <span class="menu-title">Avaliações</span>
                </a>
              </li>
              <li class="nav-item" data-tooltip="Expedição Leitura">
                <a href="#" class="nav-link">
                  <span class="nav-item-icon material-symbols-outlined">book_5</span>
                  <span class="menu-title">Leitura</span>
                </a>
              </li>
              <li class="nav-item" data-tooltip="Eventos">
                <a href="#" class="nav-link">
                  <span class="nav-item-icon material-symbols-outlined">calendar_today</span>
                  <span class="menu-title">Eventos</span>
                </a>
              </li>
              <li class="nav-item" data-tooltip="High Five">
                <a href="#" class="nav-link">
                  <span class="nav-item-icon material-symbols-outlined">camera</span>
                  <span class="menu-title">High Five</span>
                </a>
              </li>
              <li class="nav-item" data-tooltip="Ajudas e Materiais">
                <a href="#" class="nav-link">
                  <span class="nav-item-icon material-symbols-outlined">file_download</span>
                  <span class="menu-title">Materiais</span>
                </a>
              </li>
              <li class="nav-item" data-tooltip="Educateca">
                <a href="#" class="nav-link">
                  <span class="nav-item-icon material-symbols-outlined">screen_search_desktop</span>
                  <span class="menu-title">Educateca</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div class="main-content-demo">
          <h2>📱 Menu Colapsado (Collapsed State)</h2>
          <p class="text-muted mb-4">Estado minimizado do menu para mobile e tablets, mostrando apenas ícones com tooltips no hover.</p>
          
          <div class="card" style="background: white; padding: 24px; border-radius: 8px; box-shadow: 0 2px 12px rgba(0,0,0,0.1); margin-bottom: 20px;">
            <h4 class="mb-3">📐 Especificações Responsivas</h4>
            <ul style="line-height: 1.8;">
              <li><strong>Largura:</strong> 80px (colapsado) vs 260px (expandido)</li>
              <li><strong>Transição:</strong> 0.3s ease para smooth animation</li>
              <li><strong>Ícones:</strong> Centralizados, 24px, mantém espaçamento vertical</li>
              <li><strong>Labels:</strong> opacity: 0, width: 0 (escondidos mas acessíveis)</li>
              <li><strong>Tooltips:</strong> Aparecem no hover à direita dos ícones</li>
              <li><strong>Grupos:</strong> Submenus ficam ocultos no estado colapsado</li>
            </ul>
          </div>
          
          <div class="card" style="background: #f8f9fa; padding: 20px; border-radius: 8px; border-left: 4px solid #7367F0;">
            <h5 class="mb-2">📱 Breakpoints</h5>
            <p class="mb-2"><strong>Desktop:</strong> > 1200px - Menu expandido</p>
            <p class="mb-2"><strong>Tablet:</strong> 768px - 1199px - Menu pode colapsar</p>
            <p class="mb-0"><strong>Mobile:</strong> < 768px - Menu colapsado por padrão</p>
          </div>
          
          <div class="alert" style="background: #e3f2fd; padding: 15px; border-radius: 6px; margin-top: 20px; border-left: 4px solid #2196f3;">
            <strong>♿ Acessibilidade:</strong> Labels permanecem no DOM para screen readers, apenas visualmente ocultos.
          </div>
        </div>
      </div>
    `},u={render:()=>{const s=(o,t,n,g=!1)=>`
      <li class="nav-item ${g?"active":""}">
        <a href="#" class="nav-link">
          <span class="nav-item-icon material-symbols-outlined">${o}</span>
          <span class="menu-title">${t}</span>
          ${n?`<span class="badge badge-${n.variant}" style="margin-left: auto; font-size: 10px; padding: 4px 8px; border-radius: 12px;">${n.text}</span>`:""}
        </a>
      </li>
    `;return`
      ${i}
      <style>
        .badge {
          border-radius: 12px;
          font-weight: 600;
          min-width: 20px;
          text-align: center;
        }
        .badge-primary { background: #7367F0; color: white; }
        .badge-success { background: #28C76F; color: white; }
        .badge-warning { background: #FF9F43; color: white; }
        .badge-danger { background: #EA5455; color: white; }
        .badge-info { background: #00CFE8; color: white; }
      </style>
      <div class="story-container">
        <div class="main-menu">
          <div class="main-menu-content">
            <ul class="navigation">
              ${s("grid_view","Painel Inicial",null,!0)}
              ${s("flag","Missões da Escola",{text:"3",variant:"primary"})}
              ${s("pie_chart","Relatórios Gerais",{text:"12",variant:"warning"})}
              ${s("map","Explorar Jogos",{text:"Novo",variant:"success"})}
              ${s("work_outline","Turmas",null)}
              ${s("groups","Grupos",null)}
              ${s("group","Alunos",{text:"5",variant:"danger"})}
              ${s("quiz","Avaliações",{text:"2",variant:"info"})}
              ${s("book_5","Expedição Leitura",null)}
              ${s("calendar_today","Eventos",{text:"7",variant:"success"})}
              ${s("camera","High Five",{text:"15",variant:"primary"})}
              ${s("file_download","Ajudas e Materiais",null)}
              ${s("screen_search_desktop","Educateca",null)}
            </ul>
          </div>
        </div>

        <div class="main-content-demo">
          <h2>🔔 Menu com Badges e Notificações</h2>
          <p class="text-muted mb-4">Badges indicam novidades, pendências, contadores e status que requerem atenção do usuário.</p>
          
          <div class="card" style="background: white; padding: 24px; border-radius: 8px; box-shadow: 0 2px 12px rgba(0,0,0,0.1); margin-bottom: 20px;">
            <h4 class="mb-3">🎨 Cores e Significados dos Badges</h4>
            <ul style="line-height: 1.8;">
              <li><strong style="color: #7367F0;">Primary (Roxo #7367F0):</strong> Novidades gerais, novas missões disponíveis</li>
              <li><strong style="color: #28C76F;">Success (Verde #28C76F):</strong> Novos recursos, eventos confirmados</li>
              <li><strong style="color: #FF9F43;">Warning (Laranja #FF9F43):</strong> Ações pendentes, relatórios aguardando revisão</li>
              <li><strong style="color: #EA5455;">Danger (Vermelho #EA5455):</strong> Ações urgentes, alunos pendentes aprovação</li>
              <li><strong style="color: #00CFE8;">Info (Ciano #00CFE8):</strong> Informações, avaliações disponíveis</li>
            </ul>
          </div>
          
          <div class="card" style="background: #f8f9fa; padding: 20px; border-radius: 8px; border-left: 4px solid #7367F0; margin-bottom: 20px;">
            <h5 class="mb-2">💡 Casos de Uso</h5>
            <ul style="line-height: 1.8; margin-bottom: 0;">
              <li><strong>Missões (3):</strong> 3 novas missões criadas ou atribuídas</li>
              <li><strong>Relatórios (12):</strong> 12 relatórios aguardando revisão</li>
              <li><strong>Alunos (5):</strong> 5 cadastros de alunos pendentes aprovação</li>
              <li><strong>Avaliações (2):</strong> 2 avaliações disponíveis para correção</li>
              <li><strong>Eventos (7):</strong> 7 próximos eventos confirmados</li>
              <li><strong>High Five (15):</strong> 15 novos high fives não visualizados</li>
            </ul>
          </div>
          
          <div class="card" style="background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 12px rgba(0,0,0,0.1);">
            <h5 class="mb-2">🛠️ Implementação</h5>
            <p class="mb-2"><strong>Posicionamento:</strong> margin-left: auto (alinha à direita)</p>
            <p class="mb-2"><strong>Tamanho:</strong> 10px font-size, 4px 8px padding</p>
            <p class="mb-2"><strong>Formato:</strong> border-radius: 12px (arredondado)</p>
            <p class="mb-0"><strong>Atualização:</strong> Real-time via WebSocket ou polling periódico</p>
          </div>
        </div>
      </div>
    `}},m={render:()=>`
      ${i}
      <style>
        .powered-by-footer {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 16px 20px 20px;
          background: #2D2850;
        }
        .powered-by-footer hr {
          border: none;
          border-top: 1px solid rgba(255,255,255,0.12);
          margin: 0 0 16px 0;
        }
        .powered-text {
          color: rgba(255,255,255,0.6);
          font-size: 11px;
          margin-right: 6px;
        }
        .educacross-logo {
          width: 18px;
          height: 18px;
          margin: 0 6px 0 0;
        }
        .educacross-name {
          color: white;
          font-weight: 600;
          font-size: 12px;
        }
        .main-menu-content {
          padding-bottom: 80px; /* Space for footer */
        }
      </style>
      <div class="story-container">
        <div class="main-menu">
          <div class="main-menu-content">
            <ul class="navigation">
              ${a("grid_view","Painel Inicial",!0)}
              
              ${e("flag","Missões da Escola",[{title:"Criar Missão"},{title:"Missões"}])}
              
              ${e("pie_chart","Relatórios Gerais",[{title:"Relatório de Evidências"},{title:"Habilidades"},{title:"Acesso dos Alunos"}])}
              
              ${a("work_outline","Turmas")}
              ${a("groups","Grupos")}
              ${a("group","Alunos")}
              ${a("quiz","Avaliações")}
              ${a("book_5","Expedição Leitura")}
              ${a("calendar_today","Eventos")}
              ${a("camera","High Five")}
            </ul>
          </div>
          
          <!-- Powered by Footer for White Label -->
          <div class="powered-by-footer">
            <hr />
            <div class="d-flex align-items-center justify-content-center">
              <span class="powered-text">Powered by</span>
              <svg class="educacross-logo" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="32" height="32" rx="4" fill="#7367F0"/>
                <path d="M8 12h16M8 16h16M8 20h10" stroke="white" stroke-width="2" stroke-linecap="round"/>
              </svg>
              <span class="educacross-name">Educacross</span>
            </div>
          </div>
        </div>

        <div class="main-content-demo">
          <h2>🏷️ White Label: Somos Play (Powered By)</h2>
          <p class="text-muted mb-4">Menu configurado para marca white-label com rodapé "Powered by Educacross".</p>
          
          <div class="card" style="background: white; padding: 24px; border-radius: 8px; box-shadow: 0 2px 12px rgba(0,0,0,0.1); margin-bottom: 20px;">
            <h4 class="mb-3">🎨 Configuração White Label</h4>
            <ul style="line-height: 1.8;">
              <li><strong>Identificação:</strong> getWhitelabelConfig('Id') === WhitelabelEnum.SomosPlay</li>
              <li><strong>Rodapé:</strong> "Powered by Educacross" fixo na parte inferior</li>
              <li><strong>Logo:</strong> Logo mini Educacross (18x18px) com ícone roxo</li>
              <li><strong>Estilo:</strong> Discreto com texto rgba(255,255,255,0.6)</li>
              <li><strong>Divisor:</strong> Linha sutil rgba(255,255,255,0.12) acima do footer</li>
            </ul>
          </div>
          
          <div class="card" style="background: #f8f9fa; padding: 20px; border-radius: 8px; border-left: 4px solid #9C27B0; margin-bottom: 20px;">
            <h5 class="mb-2">🔧 Implementação Técnica</h5>
            <code style="background: #2D2850; color: #7367F0; padding: 12px; border-radius: 6px; display: block; font-size: 12px; line-height: 1.6;">
              // VerticalNavMenu.vue linha 154-162<br/>
              const isWhitelabelSomosPlay = computed(() => {<br/>
              &nbsp;&nbsp;return getWhitelabelConfig('Id') === WhitelabelEnum.SomosPlay;<br/>
              });<br/>
              <br/>
              // Template linha 24-40<br/>
              &lt;div v-if="isWhitelabelSomosPlay" class="powered-by-footer"&gt;...&lt;/div&gt;
            </code>
          </div>
          
          <div class="card" style="background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 12px rgba(0,0,0,0.1);">
            <h5 class="mb-2">📋 Especificações do Footer</h5>
            <p class="mb-2"><strong>Posição:</strong> position: absolute, bottom: 0, full width</p>
            <p class="mb-2"><strong>Padding:</strong> 16px 20px 20px (top, horizontal, bottom)</p>
            <p class="mb-2"><strong>Background:</strong> #2D2850 (mesmo do menu)</p>
            <p class="mb-2"><strong>Altura reservada:</strong> 80px padding-bottom na lista de navegação</p>
            <p class="mb-0"><strong>Z-index:</strong> Acima do conteúdo do menu, abaixo de overlays</p>
          </div>
          
          <div class="alert" style="background: #f3e5f5; padding: 15px; border-radius: 6px; margin-top: 20px; border-left: 4px solid #9c27b0;">
            <strong>🎯 Caso de Uso:</strong> Parceiros white-label como Somos Play, Crescer+, etc. que utilizam a plataforma Educacross mas mantêm sua própria identidade visual.
          </div>
        </div>
      </div>
    `};var v,x,b,h,f;r.parameters={...r.parameters,docs:{...(v=r.parameters)==null?void 0:v.docs,source:{originalSource:`{
  render: () => {
    return \`
      \${sidebarCSS}
      <div class="story-container">
        <div class="main-menu">
          <div class="main-menu-content">
            <ul class="navigation">
              \${createNavItem('grid_view', 'Painel Inicial', true)}
              
              \${createNavGroup('flag', 'Missões da Escola', [{
      title: 'Criar Missão'
    }, {
      title: 'Missões'
    }], true)}
              
              \${createNavGroup('pie_chart', 'Relatórios Gerais', [{
      title: 'Relatório de Evidências'
    }, {
      title: 'Habilidades'
    }, {
      title: 'Acesso dos Alunos'
    }])}
              
              \${createNavGroup('map', 'Explorar Jogos', [{
      title: 'Configurações da Ilha'
    }, {
      title: 'Ranking de Conquistas'
    }])}
              
              \${createNavItem('work_outline', 'Turmas')}
              \${createNavItem('groups', 'Grupos')}
              \${createNavItem('group', 'Alunos')}
              
              \${createNavGroup('quiz', 'Avaliações', [{
      title: 'Complexidade Narrativa'
    }, {
      title: 'Fases da Escrita'
    }, {
      title: 'Fluência Leitora'
    }, {
      title: 'Fluência Leitora'
    }, {
      title: 'Avaliação Digital'
    }, {
      title: 'Simulados'
    }])}
              
              \${createNavItem('book_5', 'Expedição Leitura')}
              \${createNavItem('calendar_today', 'Eventos')}
              \${createNavItem('camera', 'High Five')}
              \${createNavItem('file_download', 'Ajudas e Materiais')}
              \${createNavItem('screen_search_desktop', 'Educateca')}
            </ul>
          </div>
        </div>

        <div class="main-content-demo">
          <h2>👨‍🏫 Perfil: Professor (Teacher)</h2>
          <p class="text-muted mb-4">Menu completo com todas as funcionalidades disponíveis para professores.</p>
          
          <div class="card" style="background: white; padding: 24px; border-radius: 8px; box-shadow: 0 2px 12px rgba(0,0,0,0.1); margin-bottom: 20px;">
            <h4 class="mb-3">🎯 Funcionalidades Principais</h4>
            <ul style="line-height: 1.8;">
              <li><strong>Missões da Escola:</strong> Criar missões personalizadas e gerenciar atividades dos alunos</li>
              <li><strong>Relatórios Gerais:</strong> Evidências, habilidades e análise de acessos</li>
              <li><strong>Explorar Jogos:</strong> Configurar ilhas e visualizar rankings de conquistas</li>
              <li><strong>Gestão:</strong> Turmas, grupos e alunos sob responsabilidade</li>
              <li><strong>Avaliações:</strong> Complexidade narrativa, fases da escrita, fluência leitora, avaliações digitais e simulados</li>
              <li><strong>Recursos:</strong> Expedição leitura, eventos, High Five e materiais de apoio</li>
            </ul>
          </div>
          
          <div class="card" style="background: #f8f9fa; padding: 20px; border-radius: 8px; border-left: 4px solid #7367F0;">
            <h5 class="mb-2">📊 Total de Menu Items</h5>
            <p class="mb-0"><strong>13 itens principais</strong> (6 com submenus) = <strong>~25 opções totais</strong></p>
          </div>
        </div>
      </div>
    \`;
  }
}`,...(b=(x=r.parameters)==null?void 0:x.docs)==null?void 0:b.source},description:{story:"Story: 1. Professor (Teacher) - Menu Completo",...(f=(h=r.parameters)==null?void 0:h.docs)==null?void 0:f.description}}};var E,y,F,A,w;l.parameters={...l.parameters,docs:{...(E=l.parameters)==null?void 0:E.docs,source:{originalSource:`{
  render: () => {
    return \`
      \${sidebarCSS}
      <div class="story-container">
        <div class="main-menu">
          <div class="main-menu-content">
            <ul class="navigation">
              \${createNavItem('grid_view', 'Painel Inicial', true)}
              
              \${createNavGroup('pie_chart', 'Relatórios Gerais', [{
      title: 'Visão Geral'
    }, {
      title: 'Volume de Acessos'
    }, {
      title: 'Acessos Mensais Alunos'
    }, {
      title: 'Acessos Professores'
    }, {
      title: 'Evidências Escolas'
    }, {
      title: 'Evidências Alunos'
    }, {
      title: 'Habilidades'
    }, {
      title: 'Ranking de Conquistas'
    }], true)}
              
              \${createNavGroup('flag', 'Missões da Escola', [{
      title: 'Missões'
    }, {
      title: 'Missões Plus'
    }])}
              
              \${createNavItem('auto_stories', 'Sistema de Ensino')}
              
              \${createNavGroup('how_to_reg', 'Cadastros', [{
      title: 'Alunos'
    }, {
      title: 'Turmas'
    }, {
      title: 'Grupos'
    }, {
      title: 'Professores'
    }, {
      title: 'Coordenadores'
    }, {
      title: 'Diretores'
    }])}
              
              \${createNavItem('person_play', 'Gerenciador')}
              \${createNavItem('calendar_today', 'Eventos')}
              
              \${createNavGroup('quiz', 'Avaliações', [{
      title: 'Complexidade Narrativa'
    }, {
      title: 'Fases da Escrita'
    }, {
      title: 'Fluência Leitora'
    }, {
      title: 'Fluência Leitora'
    }, {
      title: 'Avaliação Digital'
    }, {
      title: 'Simulados'
    }])}
              
              \${createNavItem('book_5', 'Expedição Leitura')}
              \${createNavItem('file_download', 'Ajudas e Materiais')}
            </ul>
          </div>
        </div>

        <div class="main-content-demo">
          <h2>👨‍💼 Perfil: Administrador (Admin)</h2>
          <p class="text-muted mb-4">Menu completo com permissões administrativas para gestão escolar.</p>
          
          <div class="card" style="background: white; padding: 24px; border-radius: 8px; box-shadow: 0 2px 12px rgba(0,0,0,0.1); margin-bottom: 20px;">
            <h4 class="mb-3">🎯 Funcionalidades Administrativas</h4>
            <ul style="line-height: 1.8;">
              <li><strong>Relatórios Gerais:</strong> 8 tipos de relatórios detalhados (visão geral, acessos, evidências, habilidades, rankings)</li>
              <li><strong>Missões da Escola:</strong> Gestão completa de missões e missões Plus</li>
              <li><strong>Sistema de Ensino:</strong> Configuração e acompanhamento de conteúdos educacionais</li>
              <li><strong>Cadastros:</strong> 6 tipos de cadastros (alunos, turmas, grupos, professores, coordenadores, diretores)</li>
              <li><strong>Gerenciador:</strong> Controle de módulos e permissões do sistema</li>
              <li><strong>Avaliações:</strong> Complexidade narrativa, fases da escrita, fluência leitora, avaliações digitais e simulados</li>
              <li><strong>Recursos:</strong> Expedição leitura, eventos e materiais de apoio</li>
            </ul>
          </div>
          
          <div class="card" style="background: #f8f9fa; padding: 20px; border-radius: 8px; border-left: 4px solid #28C76F;">
            <h5 class="mb-2">📊 Total de Menu Items</h5>
            <p class="mb-0"><strong>11 itens principais</strong> (4 com submenus extensos) = <strong>~31 opções totais</strong></p>
          </div>
          
          <div class="alert" style="background: #fff3cd; padding: 15px; border-radius: 6px; margin-top: 20px; border-left: 4px solid #ffc107;">
            <strong>⚠️ Nota:</strong> Menu mais completo da plataforma, com acesso a todas as funcionalidades de gestão escolar.
          </div>
        </div>
      </div>
    \`;
  }
}`,...(F=(y=l.parameters)==null?void 0:y.docs)==null?void 0:F.source},description:{story:"Story: 2. Administrador (Admin) - Menu Completo",...(w=(A=l.parameters)==null?void 0:A.docs)==null?void 0:w.description}}};var k,$,C,M,D;d.parameters={...d.parameters,docs:{...(k=d.parameters)==null?void 0:k.docs,source:{originalSource:`{
  render: () => {
    return \`
      \${sidebarCSS}
      <div class="story-container">
        <div class="main-menu">
          <div class="main-menu-content">
            <ul class="navigation">
              \${createNavItem('grid_view', 'Painel Inicial', true)}
              
              \${createNavGroup('pie_chart', 'Relatórios Gerais', [{
      title: 'Visão Geral'
    }, {
      title: 'Volume de Acessos'
    }, {
      title: 'Acessos Mensais Alunos'
    }, {
      title: 'Acessos Professores'
    }, {
      title: 'Evidências Escolas'
    }, {
      title: 'Evidências Alunos'
    }, {
      title: 'Habilidades'
    }, {
      title: 'Ranking de Conquistas'
    }], true)}
              
              \${createNavGroup('flag', 'Missões da Escola', [{
      title: 'Missões'
    }, {
      title: 'Missões Plus'
    }])}
              
              \${createNavItem('auto_stories', 'Sistema de Ensino')}
              
              \${createNavGroup('how_to_reg', 'Cadastros', [{
      title: 'Turmas'
    }, {
      title: 'Grupos'
    }, {
      title: 'Professores'
    }, {
      title: 'Alunos'
    }, {
      title: 'Coordenadores'
    }, {
      title: 'Diretores'
    }, {
      title: 'Migrar Alunos'
    }, {
      title: 'Transferir Alunos'
    }])}
              
              \${createNavItem('person_play', 'Gerenciador')}
              \${createNavItem('calendar_today', 'Eventos')}
              
              \${createNavGroup('quiz', 'Avaliações', [{
      title: 'Complexidade Narrativa'
    }, {
      title: 'Fases da Escrita'
    }, {
      title: 'Fluência Leitora'
    }, {
      title: 'Fluência Leitora'
    }, {
      title: 'Avaliação Digital'
    }, {
      title: 'Simulados'
    }])}
              
              \${createNavItem('book_5', 'Expedição Leitura')}
              \${createNavItem('file_download', 'Ajudas e Materiais')}
            </ul>
          </div>
        </div>

        <div class="main-content-demo">
          <h2>🌐 Perfil: Gestor de Rede (Network Manager)</h2>
          <p class="text-muted mb-4">Menu completo para gestão de múltiplas escolas e instituições da rede.</p>
          
          <div class="card" style="background: white; padding: 24px; border-radius: 8px; box-shadow: 0 2px 12px rgba(0,0,0,0.1); margin-bottom: 20px;">
            <h4 class="mb-3">🎯 Funcionalidades de Rede</h4>
            <ul style="line-height: 1.8;">
              <li><strong>Visão Consolidada:</strong> Relatórios gerais de todas as escolas da rede</li>
              <li><strong>Missões da Escola:</strong> Gestão de missões em múltiplas instituições</li>
              <li><strong>Sistema de Ensino:</strong> Configuração unificada para toda a rede</li>
              <li><strong>Cadastros Avançados:</strong> 8 tipos incluindo migração e transferência de alunos entre escolas</li>
              <li><strong>Gerenciador:</strong> Controle centralizado de módulos e permissões</li>
              <li><strong>Avaliações:</strong> Acompanhamento de todas as modalidades em nível de rede</li>
              <li><strong>Recursos:</strong> Expedição leitura, eventos e materiais para toda a rede</li>
            </ul>
          </div>
          
          <div class="card" style="background: #f8f9fa; padding: 20px; border-radius: 8px; border-left: 4px solid #00CFE8;">
            <h5 class="mb-2">📊 Total de Menu Items</h5>
            <p class="mb-0"><strong>11 itens principais</strong> (4 com submenus extensos) = <strong>~33 opções totais</strong></p>
          </div>
          
          <div class="alert" style="background: #e7f3ff; padding: 15px; border-radius: 6px; margin-top: 20px; border-left: 4px solid #0091ea;">
            <strong>🔑 Diferencial:</strong> Inclui funcionalidades exclusivas para gestão de rede como "Migrar Alunos" e "Transferir Alunos" entre instituições.
          </div>
        </div>
      </div>
    \`;
  }
}`,...(C=($=d.parameters)==null?void 0:$.docs)==null?void 0:C.source},description:{story:"Story: 3. Gestor de Rede (Network Manager) - Menu Completo",...(D=(M=d.parameters)==null?void 0:M.docs)==null?void 0:D.description}}};var I,S,_,N,P;c.parameters={...c.parameters,docs:{...(I=c.parameters)==null?void 0:I.docs,source:{originalSource:`{
  render: () => {
    return \`
      \${sidebarCSS}
      <div class="story-container">
        <div class="main-menu">
          <div class="main-menu-content">
            <ul class="navigation">
              \${createNavItem('home', 'Painel Inicial', true)}
              \${createNavItem('flag', 'Missões da Escola')}
              \${createNavItem('supervisor_account', 'Treinos da Família')}
              \${createNavItem('camera', 'High Five')}
            </ul>
          </div>
        </div>

        <div class="main-content-demo">
          <h2>👦 Perfil: Aluno (Student)</h2>
          <p class="text-muted mb-4">Menu simplificado e intuitivo focado na experiência de aprendizado do estudante.</p>
          
          <div class="card" style="background: white; padding: 24px; border-radius: 8px; box-shadow: 0 2px 12px rgba(0,0,0,0.1); margin-bottom: 20px;">
            <h4 class="mb-3">🎯 Funcionalidades do Estudante</h4>
            <ul style="line-height: 1.8;">
              <li><strong>Painel Inicial:</strong> Visão geral do progresso e próximas atividades</li>
              <li><strong>Missões da Escola:</strong> Atividades e missões atribuídas pelos professores</li>
              <li><strong>Sistema de Ensino:</strong> Conteúdos educacionais organizados por disciplina (dinâmico via educationSystem)</li>
              <li><strong>Treinos da Família:</strong> Atividades compartilhadas com responsáveis</li>
              <li><strong>High Five:</strong> Compartilhar conquistas e interagir com colegas</li>
            </ul>
          </div>
          
          <div class="card" style="background: #f8f9fa; padding: 20px; border-radius: 8px; border-left: 4px solid #FF9F43;">
            <h5 class="mb-2">📊 Total de Menu Items</h5>
            <p class="mb-0"><strong>4 itens fixos</strong> + <strong>Sistema de Ensino dinâmico</strong> = <strong>~5-8 opções totais</strong></p>
          </div>
          
          <div class="alert" style="background: #fff4e6; padding: 15px; border-radius: 6px; margin-top: 20px; border-left: 4px solid #ff9800;">
            <strong>✨ Design Amigável:</strong> Interface simplificada e visualmente atrativa para engajar estudantes de todas as idades.
          </div>
          
          <div class="alert" style="background: #e8f5e9; padding: 15px; border-radius: 6px; margin-top: 15px; border-left: 4px solid #4caf50;">
            <strong>📚 Nota:</strong> O item "Sistema de Ensino" é adicionado dinamicamente baseado nos sistemas educacionais configurados para o aluno.
          </div>
        </div>
      </div>
    \`;
  }
}`,...(_=(S=c.parameters)==null?void 0:S.docs)==null?void 0:_.source},description:{story:"Story: 4. Aluno (Student) - Menu Simplificado",...(P=(N=c.parameters)==null?void 0:N.docs)==null?void 0:P.description}}};var G,R,z,L,T;p.parameters={...p.parameters,docs:{...(G=p.parameters)==null?void 0:G.docs,source:{originalSource:`{
  render: () => {
    return \`
      \${sidebarCSS}
      <style>
        .main-menu.collapsed {
          width: 80px;
        }
        .main-menu.collapsed .menu-title {
          opacity: 0;
          width: 0;
          margin: 0;
          overflow: hidden;
        }
        .main-menu.collapsed .nav-item-icon {
          margin-right: 0;
          display: flex;
          justify-content: center;
          width: 100%;
        }
        .main-menu.collapsed .group-submenu {
          display: none !important;
        }
        .main-menu.collapsed .group-toggle::after {
          display: none;
        }
        .main-menu.collapsed .nav-item {
          justify-content: center;
          padding: 0;
        }
        .main-menu.collapsed .nav-item a {
          justify-content: center;
        }
        /* Tooltip on hover */
        .main-menu.collapsed .nav-item {
          position: relative;
        }
        .main-menu.collapsed .nav-item:hover::after {
          content: attr(data-tooltip);
          position: absolute;
          left: 85px;
          background: #2D2850;
          color: white;
          padding: 8px 12px;
          border-radius: 6px;
          white-space: nowrap;
          z-index: 1000;
          font-size: 13px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        }
      </style>
      <div class="story-container">
        <div class="main-menu collapsed">
          <div class="main-menu-content">
            <ul class="navigation">
              <li class="nav-item active" data-tooltip="Painel Inicial">
                <a href="#" class="nav-link">
                  <span class="nav-item-icon material-symbols-outlined">grid_view</span>
                  <span class="menu-title">Painel Inicial</span>
                </a>
              </li>
              <li class="nav-item" data-tooltip="Missões da Escola">
                <a href="#" class="nav-link">
                  <span class="nav-item-icon material-symbols-outlined">flag</span>
                  <span class="menu-title">Missões</span>
                </a>
              </li>
              <li class="nav-item" data-tooltip="Relatórios Gerais">
                <a href="#" class="nav-link">
                  <span class="nav-item-icon material-symbols-outlined">pie_chart</span>
                  <span class="menu-title">Relatórios</span>
                </a>
              </li>
              <li class="nav-item" data-tooltip="Explorar Jogos">
                <a href="#" class="nav-link">
                  <span class="nav-item-icon material-symbols-outlined">map</span>
                  <span class="menu-title">Jogos</span>
                </a>
              </li>
              <li class="nav-item" data-tooltip="Turmas">
                <a href="#" class="nav-link">
                  <span class="nav-item-icon material-symbols-outlined">work_outline</span>
                  <span class="menu-title">Turmas</span>
                </a>
              </li>
              <li class="nav-item" data-tooltip="Grupos">
                <a href="#" class="nav-link">
                  <span class="nav-item-icon material-symbols-outlined">groups</span>
                  <span class="menu-title">Grupos</span>
                </a>
              </li>
              <li class="nav-item" data-tooltip="Alunos">
                <a href="#" class="nav-link">
                  <span class="nav-item-icon material-symbols-outlined">group</span>
                  <span class="menu-title">Alunos</span>
                </a>
              </li>
              <li class="nav-item" data-tooltip="Avaliações">
                <a href="#" class="nav-link">
                  <span class="nav-item-icon material-symbols-outlined">quiz</span>
                  <span class="menu-title">Avaliações</span>
                </a>
              </li>
              <li class="nav-item" data-tooltip="Expedição Leitura">
                <a href="#" class="nav-link">
                  <span class="nav-item-icon material-symbols-outlined">book_5</span>
                  <span class="menu-title">Leitura</span>
                </a>
              </li>
              <li class="nav-item" data-tooltip="Eventos">
                <a href="#" class="nav-link">
                  <span class="nav-item-icon material-symbols-outlined">calendar_today</span>
                  <span class="menu-title">Eventos</span>
                </a>
              </li>
              <li class="nav-item" data-tooltip="High Five">
                <a href="#" class="nav-link">
                  <span class="nav-item-icon material-symbols-outlined">camera</span>
                  <span class="menu-title">High Five</span>
                </a>
              </li>
              <li class="nav-item" data-tooltip="Ajudas e Materiais">
                <a href="#" class="nav-link">
                  <span class="nav-item-icon material-symbols-outlined">file_download</span>
                  <span class="menu-title">Materiais</span>
                </a>
              </li>
              <li class="nav-item" data-tooltip="Educateca">
                <a href="#" class="nav-link">
                  <span class="nav-item-icon material-symbols-outlined">screen_search_desktop</span>
                  <span class="menu-title">Educateca</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div class="main-content-demo">
          <h2>📱 Menu Colapsado (Collapsed State)</h2>
          <p class="text-muted mb-4">Estado minimizado do menu para mobile e tablets, mostrando apenas ícones com tooltips no hover.</p>
          
          <div class="card" style="background: white; padding: 24px; border-radius: 8px; box-shadow: 0 2px 12px rgba(0,0,0,0.1); margin-bottom: 20px;">
            <h4 class="mb-3">📐 Especificações Responsivas</h4>
            <ul style="line-height: 1.8;">
              <li><strong>Largura:</strong> 80px (colapsado) vs 260px (expandido)</li>
              <li><strong>Transição:</strong> 0.3s ease para smooth animation</li>
              <li><strong>Ícones:</strong> Centralizados, 24px, mantém espaçamento vertical</li>
              <li><strong>Labels:</strong> opacity: 0, width: 0 (escondidos mas acessíveis)</li>
              <li><strong>Tooltips:</strong> Aparecem no hover à direita dos ícones</li>
              <li><strong>Grupos:</strong> Submenus ficam ocultos no estado colapsado</li>
            </ul>
          </div>
          
          <div class="card" style="background: #f8f9fa; padding: 20px; border-radius: 8px; border-left: 4px solid #7367F0;">
            <h5 class="mb-2">📱 Breakpoints</h5>
            <p class="mb-2"><strong>Desktop:</strong> > 1200px - Menu expandido</p>
            <p class="mb-2"><strong>Tablet:</strong> 768px - 1199px - Menu pode colapsar</p>
            <p class="mb-0"><strong>Mobile:</strong> < 768px - Menu colapsado por padrão</p>
          </div>
          
          <div class="alert" style="background: #e3f2fd; padding: 15px; border-radius: 6px; margin-top: 20px; border-left: 4px solid #2196f3;">
            <strong>♿ Acessibilidade:</strong> Labels permanecem no DOM para screen readers, apenas visualmente ocultos.
          </div>
        </div>
      </div>
    \`;
  }
}`,...(z=(R=p.parameters)==null?void 0:R.docs)==null?void 0:z.source},description:{story:"Story: 5. Menu Colapsado (Collapsed State) - Professor Mobile",...(T=(L=p.parameters)==null?void 0:L.docs)==null?void 0:T.description}}};var B,W,j,H,q;u.parameters={...u.parameters,docs:{...(B=u.parameters)==null?void 0:B.docs,source:{originalSource:`{
  render: () => {
    const createNavItemWithBadge = (icon, title, badge, isActive = false) => \`
      <li class="nav-item \${isActive ? 'active' : ''}">
        <a href="#" class="nav-link">
          <span class="nav-item-icon material-symbols-outlined">\${icon}</span>
          <span class="menu-title">\${title}</span>
          \${badge ? \`<span class="badge badge-\${badge.variant}" style="margin-left: auto; font-size: 10px; padding: 4px 8px; border-radius: 12px;">\${badge.text}</span>\` : ''}
        </a>
      </li>
    \`;
    return \`
      \${sidebarCSS}
      <style>
        .badge {
          border-radius: 12px;
          font-weight: 600;
          min-width: 20px;
          text-align: center;
        }
        .badge-primary { background: #7367F0; color: white; }
        .badge-success { background: #28C76F; color: white; }
        .badge-warning { background: #FF9F43; color: white; }
        .badge-danger { background: #EA5455; color: white; }
        .badge-info { background: #00CFE8; color: white; }
      </style>
      <div class="story-container">
        <div class="main-menu">
          <div class="main-menu-content">
            <ul class="navigation">
              \${createNavItemWithBadge('grid_view', 'Painel Inicial', null, true)}
              \${createNavItemWithBadge('flag', 'Missões da Escola', {
      text: '3',
      variant: 'primary'
    })}
              \${createNavItemWithBadge('pie_chart', 'Relatórios Gerais', {
      text: '12',
      variant: 'warning'
    })}
              \${createNavItemWithBadge('map', 'Explorar Jogos', {
      text: 'Novo',
      variant: 'success'
    })}
              \${createNavItemWithBadge('work_outline', 'Turmas', null)}
              \${createNavItemWithBadge('groups', 'Grupos', null)}
              \${createNavItemWithBadge('group', 'Alunos', {
      text: '5',
      variant: 'danger'
    })}
              \${createNavItemWithBadge('quiz', 'Avaliações', {
      text: '2',
      variant: 'info'
    })}
              \${createNavItemWithBadge('book_5', 'Expedição Leitura', null)}
              \${createNavItemWithBadge('calendar_today', 'Eventos', {
      text: '7',
      variant: 'success'
    })}
              \${createNavItemWithBadge('camera', 'High Five', {
      text: '15',
      variant: 'primary'
    })}
              \${createNavItemWithBadge('file_download', 'Ajudas e Materiais', null)}
              \${createNavItemWithBadge('screen_search_desktop', 'Educateca', null)}
            </ul>
          </div>
        </div>

        <div class="main-content-demo">
          <h2>🔔 Menu com Badges e Notificações</h2>
          <p class="text-muted mb-4">Badges indicam novidades, pendências, contadores e status que requerem atenção do usuário.</p>
          
          <div class="card" style="background: white; padding: 24px; border-radius: 8px; box-shadow: 0 2px 12px rgba(0,0,0,0.1); margin-bottom: 20px;">
            <h4 class="mb-3">🎨 Cores e Significados dos Badges</h4>
            <ul style="line-height: 1.8;">
              <li><strong style="color: #7367F0;">Primary (Roxo #7367F0):</strong> Novidades gerais, novas missões disponíveis</li>
              <li><strong style="color: #28C76F;">Success (Verde #28C76F):</strong> Novos recursos, eventos confirmados</li>
              <li><strong style="color: #FF9F43;">Warning (Laranja #FF9F43):</strong> Ações pendentes, relatórios aguardando revisão</li>
              <li><strong style="color: #EA5455;">Danger (Vermelho #EA5455):</strong> Ações urgentes, alunos pendentes aprovação</li>
              <li><strong style="color: #00CFE8;">Info (Ciano #00CFE8):</strong> Informações, avaliações disponíveis</li>
            </ul>
          </div>
          
          <div class="card" style="background: #f8f9fa; padding: 20px; border-radius: 8px; border-left: 4px solid #7367F0; margin-bottom: 20px;">
            <h5 class="mb-2">💡 Casos de Uso</h5>
            <ul style="line-height: 1.8; margin-bottom: 0;">
              <li><strong>Missões (3):</strong> 3 novas missões criadas ou atribuídas</li>
              <li><strong>Relatórios (12):</strong> 12 relatórios aguardando revisão</li>
              <li><strong>Alunos (5):</strong> 5 cadastros de alunos pendentes aprovação</li>
              <li><strong>Avaliações (2):</strong> 2 avaliações disponíveis para correção</li>
              <li><strong>Eventos (7):</strong> 7 próximos eventos confirmados</li>
              <li><strong>High Five (15):</strong> 15 novos high fives não visualizados</li>
            </ul>
          </div>
          
          <div class="card" style="background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 12px rgba(0,0,0,0.1);">
            <h5 class="mb-2">🛠️ Implementação</h5>
            <p class="mb-2"><strong>Posicionamento:</strong> margin-left: auto (alinha à direita)</p>
            <p class="mb-2"><strong>Tamanho:</strong> 10px font-size, 4px 8px padding</p>
            <p class="mb-2"><strong>Formato:</strong> border-radius: 12px (arredondado)</p>
            <p class="mb-0"><strong>Atualização:</strong> Real-time via WebSocket ou polling periódico</p>
          </div>
        </div>
      </div>
    \`;
  }
}`,...(j=(W=u.parameters)==null?void 0:W.docs)==null?void 0:j.source},description:{story:"Story: 6. Com Badges e Notificações",...(q=(H=u.parameters)==null?void 0:H.docs)==null?void 0:q.description}}};var V,J,O,U,Z;m.parameters={...m.parameters,docs:{...(V=m.parameters)==null?void 0:V.docs,source:{originalSource:`{
  render: () => {
    return \`
      \${sidebarCSS}
      <style>
        .powered-by-footer {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 16px 20px 20px;
          background: #2D2850;
        }
        .powered-by-footer hr {
          border: none;
          border-top: 1px solid rgba(255,255,255,0.12);
          margin: 0 0 16px 0;
        }
        .powered-text {
          color: rgba(255,255,255,0.6);
          font-size: 11px;
          margin-right: 6px;
        }
        .educacross-logo {
          width: 18px;
          height: 18px;
          margin: 0 6px 0 0;
        }
        .educacross-name {
          color: white;
          font-weight: 600;
          font-size: 12px;
        }
        .main-menu-content {
          padding-bottom: 80px; /* Space for footer */
        }
      </style>
      <div class="story-container">
        <div class="main-menu">
          <div class="main-menu-content">
            <ul class="navigation">
              \${createNavItem('grid_view', 'Painel Inicial', true)}
              
              \${createNavGroup('flag', 'Missões da Escola', [{
      title: 'Criar Missão'
    }, {
      title: 'Missões'
    }])}
              
              \${createNavGroup('pie_chart', 'Relatórios Gerais', [{
      title: 'Relatório de Evidências'
    }, {
      title: 'Habilidades'
    }, {
      title: 'Acesso dos Alunos'
    }])}
              
              \${createNavItem('work_outline', 'Turmas')}
              \${createNavItem('groups', 'Grupos')}
              \${createNavItem('group', 'Alunos')}
              \${createNavItem('quiz', 'Avaliações')}
              \${createNavItem('book_5', 'Expedição Leitura')}
              \${createNavItem('calendar_today', 'Eventos')}
              \${createNavItem('camera', 'High Five')}
            </ul>
          </div>
          
          <!-- Powered by Footer for White Label -->
          <div class="powered-by-footer">
            <hr />
            <div class="d-flex align-items-center justify-content-center">
              <span class="powered-text">Powered by</span>
              <svg class="educacross-logo" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="32" height="32" rx="4" fill="#7367F0"/>
                <path d="M8 12h16M8 16h16M8 20h10" stroke="white" stroke-width="2" stroke-linecap="round"/>
              </svg>
              <span class="educacross-name">Educacross</span>
            </div>
          </div>
        </div>

        <div class="main-content-demo">
          <h2>🏷️ White Label: Somos Play (Powered By)</h2>
          <p class="text-muted mb-4">Menu configurado para marca white-label com rodapé "Powered by Educacross".</p>
          
          <div class="card" style="background: white; padding: 24px; border-radius: 8px; box-shadow: 0 2px 12px rgba(0,0,0,0.1); margin-bottom: 20px;">
            <h4 class="mb-3">🎨 Configuração White Label</h4>
            <ul style="line-height: 1.8;">
              <li><strong>Identificação:</strong> getWhitelabelConfig('Id') === WhitelabelEnum.SomosPlay</li>
              <li><strong>Rodapé:</strong> "Powered by Educacross" fixo na parte inferior</li>
              <li><strong>Logo:</strong> Logo mini Educacross (18x18px) com ícone roxo</li>
              <li><strong>Estilo:</strong> Discreto com texto rgba(255,255,255,0.6)</li>
              <li><strong>Divisor:</strong> Linha sutil rgba(255,255,255,0.12) acima do footer</li>
            </ul>
          </div>
          
          <div class="card" style="background: #f8f9fa; padding: 20px; border-radius: 8px; border-left: 4px solid #9C27B0; margin-bottom: 20px;">
            <h5 class="mb-2">🔧 Implementação Técnica</h5>
            <code style="background: #2D2850; color: #7367F0; padding: 12px; border-radius: 6px; display: block; font-size: 12px; line-height: 1.6;">
              // VerticalNavMenu.vue linha 154-162<br/>
              const isWhitelabelSomosPlay = computed(() => {<br/>
              &nbsp;&nbsp;return getWhitelabelConfig('Id') === WhitelabelEnum.SomosPlay;<br/>
              });<br/>
              <br/>
              // Template linha 24-40<br/>
              &lt;div v-if="isWhitelabelSomosPlay" class="powered-by-footer"&gt;...&lt;/div&gt;
            </code>
          </div>
          
          <div class="card" style="background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 12px rgba(0,0,0,0.1);">
            <h5 class="mb-2">📋 Especificações do Footer</h5>
            <p class="mb-2"><strong>Posição:</strong> position: absolute, bottom: 0, full width</p>
            <p class="mb-2"><strong>Padding:</strong> 16px 20px 20px (top, horizontal, bottom)</p>
            <p class="mb-2"><strong>Background:</strong> #2D2850 (mesmo do menu)</p>
            <p class="mb-2"><strong>Altura reservada:</strong> 80px padding-bottom na lista de navegação</p>
            <p class="mb-0"><strong>Z-index:</strong> Acima do conteúdo do menu, abaixo de overlays</p>
          </div>
          
          <div class="alert" style="background: #f3e5f5; padding: 15px; border-radius: 6px; margin-top: 20px; border-left: 4px solid #9c27b0;">
            <strong>🎯 Caso de Uso:</strong> Parceiros white-label como Somos Play, Crescer+, etc. que utilizam a plataforma Educacross mas mantêm sua própria identidade visual.
          </div>
        </div>
      </div>
    \`;
  }
}`,...(O=(J=m.parameters)==null?void 0:J.docs)==null?void 0:O.source},description:{story:"Story: 7. Somos Play (White Label com Powered By)",...(Z=(U=m.parameters)==null?void 0:U.docs)==null?void 0:Z.description}}};const Q=["Professor","Administrador","GestorRede","Aluno","CollapsedMobile","WithBadges","SomosPlayBrand"];export{l as Administrador,c as Aluno,p as CollapsedMobile,d as GestorRede,r as Professor,m as SomosPlayBrand,u as WithBadges,Q as __namedExportsOrder,K as default};
