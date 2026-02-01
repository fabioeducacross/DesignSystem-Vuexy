const E={title:"Educacross/Components/Navigation",parameters:{layout:"fullscreen",docs:{description:{component:`
## Navigation Components

Elementos de navegação para o sistema.

### Uso no Educacross
- **Sidebar**: Menu lateral principal
- **Navbar**: Barra superior
- **Breadcrumbs**: Navegação hierárquica
- **Menu Mobile**: Navegação responsiva

### Componentes
- Sidebar com menu colapsável
- Top navbar com busca e perfil
- Menu de navegação
        `}}}},a={name:"🔝 Navbar",render:()=>`
    <nav class="navbar navbar-expand-lg bg-white border-bottom shadow-sm">
      <div class="container-fluid px-4">
        <!-- Brand -->
        <a class="navbar-brand d-flex align-items-center gap-2" href="#">
          <img src="/vuexy/img/educacross/logo/logo-educacross.svg" alt="Educacross" height="32">
        </a>
        
        <!-- Mobile toggle -->
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span class="navbar-toggler-icon"></span>
        </button>
        
        <!-- Nav content -->
        <div class="collapse navbar-collapse" id="navbarNav">
          <!-- Search -->
          <form class="d-flex mx-auto" style="max-width: 400px; width: 100%;">
            <div class="input-group">
              <span class="input-group-text bg-transparent border-end-0">
                <i class="bi bi-search text-muted"></i>
              </span>
              <input type="search" class="form-control border-start-0" placeholder="Buscar alunos, turmas...">
            </div>
          </form>
          
          <!-- Right side -->
          <ul class="navbar-nav ms-auto align-items-center gap-3">
            <!-- Notificações -->
            <li class="nav-item dropdown">
              <a class="nav-link position-relative" href="#" data-bs-toggle="dropdown">
                <i class="bi bi-bell fs-5"></i>
                <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" style="font-size: 0.65rem;">
                  3
                </span>
              </a>
              <ul class="dropdown-menu dropdown-menu-end" style="width: 300px;">
                <li class="dropdown-header d-flex justify-content-between align-items-center">
                  <span>Notificações</span>
                  <a href="#" class="text-primary small">Marcar como lidas</a>
                </li>
                <li><hr class="dropdown-divider"></li>
                <li>
                  <a class="dropdown-item d-flex gap-2 py-2" href="#">
                    <i class="bi bi-person-plus text-primary"></i>
                    <div>
                      <div class="small fw-medium">Novo aluno cadastrado</div>
                      <small class="text-muted">João Silva - 5º Ano A</small>
                    </div>
                  </a>
                </li>
                <li>
                  <a class="dropdown-item d-flex gap-2 py-2" href="#">
                    <i class="bi bi-trophy text-warning"></i>
                    <div>
                      <div class="small fw-medium">Meta alcançada!</div>
                      <small class="text-muted">Turma 5º Ano A atingiu 80%</small>
                    </div>
                  </a>
                </li>
                <li><hr class="dropdown-divider"></li>
                <li class="text-center py-2">
                  <a href="#" class="small text-primary">Ver todas</a>
                </li>
              </ul>
            </li>
            
            <!-- Perfil -->
            <li class="nav-item dropdown">
              <a class="nav-link d-flex align-items-center gap-2" href="#" data-bs-toggle="dropdown">
                <img src="/vuexy/img/educacross/avatars/Avatar-1.svg" alt="Avatar" class="rounded-circle" width="36" height="36">
                <div class="d-none d-lg-block text-start">
                  <div class="small fw-medium lh-sm">Prof. Maria</div>
                  <small class="text-muted">Escola ABC</small>
                </div>
                <i class="bi bi-chevron-down small"></i>
              </a>
              <ul class="dropdown-menu dropdown-menu-end">
                <li>
                  <a class="dropdown-item" href="#">
                    <i class="bi bi-person me-2"></i> Meu Perfil
                  </a>
                </li>
                <li>
                  <a class="dropdown-item" href="#">
                    <i class="bi bi-gear me-2"></i> Configurações
                  </a>
                </li>
                <li><hr class="dropdown-divider"></li>
                <li>
                  <a class="dropdown-item text-danger" href="#">
                    <i class="bi bi-box-arrow-right me-2"></i> Sair
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  `},s={name:"📋 Sidebar Menu",render:()=>`
    <div class="d-flex">
      <aside class="bg-white border-end" style="width: 260px; min-height: 500px;">
        <div class="p-3">
          <!-- Logo -->
          <div class="d-flex align-items-center gap-2 mb-4 px-2">
            <img src="/vuexy/img/educacross/logo/logo-educacross.svg" alt="Educacross" height="32">
          </div>
          
          <!-- Menu -->
          <nav class="nav flex-column gap-1">
            <!-- Dashboard -->
            <a class="nav-link d-flex align-items-center gap-3 px-3 py-2 rounded bg-primary text-white" href="#">
              <i class="bi bi-grid-1x2-fill"></i>
              <span>Dashboard</span>
            </a>
            
            <!-- Alunos -->
            <a class="nav-link d-flex align-items-center gap-3 px-3 py-2 rounded text-body" href="#">
              <i class="bi bi-people"></i>
              <span>Alunos</span>
              <span class="badge bg-primary ms-auto">245</span>
            </a>
            
            <!-- Turmas -->
            <a class="nav-link d-flex align-items-center gap-3 px-3 py-2 rounded text-body" href="#">
              <i class="bi bi-collection"></i>
              <span>Turmas</span>
            </a>
            
            <!-- Jogos (com submenu) -->
            <div class="nav-item">
              <a class="nav-link d-flex align-items-center gap-3 px-3 py-2 rounded text-body" href="#" data-bs-toggle="collapse" data-bs-target="#gamesSubmenu">
                <i class="bi bi-controller"></i>
                <span>Jogos</span>
                <i class="bi bi-chevron-down ms-auto small"></i>
              </a>
              <div class="collapse show" id="gamesSubmenu">
                <nav class="nav flex-column ms-4 ps-3 border-start">
                  <a class="nav-link py-2 text-body small" href="#">Matemática</a>
                  <a class="nav-link py-2 text-body small" href="#">Língua Portuguesa</a>
                  <a class="nav-link py-2 text-body small" href="#">Liga das Corujinhas</a>
                </nav>
              </div>
            </div>
            
            <!-- Relatórios -->
            <a class="nav-link d-flex align-items-center gap-3 px-3 py-2 rounded text-body" href="#">
              <i class="bi bi-bar-chart"></i>
              <span>Relatórios</span>
            </a>
            
            <!-- Divisor -->
            <hr class="my-3">
            
            <!-- Configurações -->
            <a class="nav-link d-flex align-items-center gap-3 px-3 py-2 rounded text-body" href="#">
              <i class="bi bi-gear"></i>
              <span>Configurações</span>
            </a>
            
            <!-- Ajuda -->
            <a class="nav-link d-flex align-items-center gap-3 px-3 py-2 rounded text-body" href="#">
              <i class="bi bi-question-circle"></i>
              <span>Ajuda</span>
            </a>
          </nav>
        </div>
      </aside>
      
      <!-- Content placeholder -->
      <div class="flex-grow-1 bg-light p-4">
        <div class="text-muted">Conteúdo da página</div>
      </div>
    </div>
  `},n={name:"📌 Sidebar Compacto",render:()=>`
    <div class="d-flex">
      <aside class="bg-white border-end text-center" style="width: 72px; min-height: 500px;">
        <div class="py-3">
          <!-- Logo -->
          <div class="mb-4">
            <img src="/vuexy/img/educacross/logo/isotipo-educacross.svg" alt="Educacross" width="32" height="32">
          </div>
          
          <!-- Menu -->
          <nav class="nav flex-column align-items-center gap-2">
            <a class="nav-link p-2 rounded bg-primary text-white" href="#" data-bs-toggle="tooltip" title="Dashboard">
              <i class="bi bi-grid-1x2-fill fs-5"></i>
            </a>
            
            <a class="nav-link p-2 rounded text-body" href="#" data-bs-toggle="tooltip" title="Alunos">
              <i class="bi bi-people fs-5"></i>
            </a>
            
            <a class="nav-link p-2 rounded text-body" href="#" data-bs-toggle="tooltip" title="Turmas">
              <i class="bi bi-collection fs-5"></i>
            </a>
            
            <a class="nav-link p-2 rounded text-body" href="#" data-bs-toggle="tooltip" title="Jogos">
              <i class="bi bi-controller fs-5"></i>
            </a>
            
            <a class="nav-link p-2 rounded text-body" href="#" data-bs-toggle="tooltip" title="Relatórios">
              <i class="bi bi-bar-chart fs-5"></i>
            </a>
            
            <hr class="w-50 my-2">
            
            <a class="nav-link p-2 rounded text-body" href="#" data-bs-toggle="tooltip" title="Configurações">
              <i class="bi bi-gear fs-5"></i>
            </a>
          </nav>
        </div>
      </aside>
      
      <!-- Content placeholder -->
      <div class="flex-grow-1 bg-light p-4">
        <div class="text-muted">Sidebar compacto (collapsed)</div>
      </div>
    </div>
  `},e={name:"📱 Bottom Navigation",render:()=>`
    <div style="max-width: 375px; margin: 0 auto;">
      <!-- Content -->
      <div class="bg-light p-4" style="min-height: 400px;">
        <p class="text-muted">Conteúdo da página mobile</p>
      </div>
      
      <!-- Bottom Nav -->
      <nav class="navbar fixed-bottom bg-white border-top shadow-sm" style="position: relative;">
        <div class="container-fluid justify-content-around">
          <a class="nav-link text-center text-primary" href="#">
            <i class="bi bi-house-fill d-block fs-5"></i>
            <small>Início</small>
          </a>
          <a class="nav-link text-center text-muted" href="#">
            <i class="bi bi-controller d-block fs-5"></i>
            <small>Jogos</small>
          </a>
          <a class="nav-link text-center text-muted position-relative" href="#">
            <i class="bi bi-trophy d-block fs-5"></i>
            <small>Ranking</small>
            <span class="position-absolute top-0 start-50 badge rounded-pill bg-danger" style="font-size: 0.6rem; transform: translateX(20%);">
              Novo
            </span>
          </a>
          <a class="nav-link text-center text-muted" href="#">
            <i class="bi bi-person d-block fs-5"></i>
            <small>Perfil</small>
          </a>
        </div>
      </nav>
    </div>
  `},i={name:"📄 Page Header",render:()=>`
    <div class="bg-white border-bottom p-4">
      <!-- Breadcrumb + Actions -->
      <div class="d-flex justify-content-between align-items-center mb-3">
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb mb-0">
            <li class="breadcrumb-item"><a href="#">Dashboard</a></li>
            <li class="breadcrumb-item"><a href="#">Turmas</a></li>
            <li class="breadcrumb-item active">5º Ano A</li>
          </ol>
        </nav>
        <div class="d-flex gap-2">
          <button class="btn btn-outline-secondary btn-sm">
            <i class="bi bi-download me-1"></i> Exportar
          </button>
          <button class="btn btn-primary btn-sm">
            <i class="bi bi-plus-lg me-1"></i> Adicionar Aluno
          </button>
        </div>
      </div>
      
      <!-- Title + Info -->
      <div class="d-flex justify-content-between align-items-end">
        <div>
          <h4 class="mb-1">5º Ano A</h4>
          <div class="d-flex gap-3 text-muted small">
            <span><i class="bi bi-people me-1"></i> 32 alunos</span>
            <span><i class="bi bi-person me-1"></i> Prof. Maria Santos</span>
            <span><i class="bi bi-calendar me-1"></i> Período: 2024</span>
          </div>
        </div>
        <div class="d-flex gap-2">
          <span class="badge bg-success">Ativa</span>
        </div>
      </div>
    </div>
  `},l={name:"🔖 Tabs Navigation",render:()=>`
    <div class="bg-white">
      <!-- Page Header -->
      <div class="border-bottom p-4 pb-0">
        <h4 class="mb-3">Relatório da Turma</h4>
        
        <!-- Tabs -->
        <ul class="nav nav-tabs">
          <li class="nav-item">
            <a class="nav-link active" href="#">
              <i class="bi bi-graph-up me-1"></i> Visão Geral
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">
              <i class="bi bi-people me-1"></i> Por Aluno
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">
              <i class="bi bi-lightbulb me-1"></i> Por Habilidade
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">
              <i class="bi bi-controller me-1"></i> Por Jogo
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">
              <i class="bi bi-clock-history me-1"></i> Histórico
            </a>
          </li>
        </ul>
      </div>
      
      <!-- Tab Content -->
      <div class="p-4">
        <div class="text-muted">Conteúdo da aba selecionada</div>
      </div>
    </div>
  `},t={name:"📂 Submenu Dropdown",render:()=>`
    <div class="d-flex gap-4">
      <!-- Navegação horizontal com submenu -->
      <nav class="navbar navbar-expand bg-white border rounded p-2">
        <ul class="navbar-nav gap-1">
          <li class="nav-item">
            <a class="nav-link px-3 py-2 rounded active bg-primary text-white" href="#">Dashboard</a>
          </li>
          
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle px-3 py-2" href="#" data-bs-toggle="dropdown">
              Relatórios
            </a>
            <ul class="dropdown-menu">
              <li><a class="dropdown-item" href="#">Por Turma</a></li>
              <li><a class="dropdown-item" href="#">Por Aluno</a></li>
              <li><a class="dropdown-item" href="#">Por Habilidade</a></li>
              <li><hr class="dropdown-divider"></li>
              <li><a class="dropdown-item" href="#">Comparativo</a></li>
            </ul>
          </li>
          
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle px-3 py-2" href="#" data-bs-toggle="dropdown">
              Configurações
            </a>
            <ul class="dropdown-menu">
              <li>
                <a class="dropdown-item d-flex align-items-center gap-2" href="#">
                  <i class="bi bi-person"></i> Perfil
                </a>
              </li>
              <li>
                <a class="dropdown-item d-flex align-items-center gap-2" href="#">
                  <i class="bi bi-bell"></i> Notificações
                </a>
              </li>
              <li>
                <a class="dropdown-item d-flex align-items-center gap-2" href="#">
                  <i class="bi bi-shield-lock"></i> Segurança
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
    </div>
  `};var o,r,d;a.parameters={...a.parameters,docs:{...(o=a.parameters)==null?void 0:o.docs,source:{originalSource:`{
  name: '🔝 Navbar',
  render: () => \`
    <nav class="navbar navbar-expand-lg bg-white border-bottom shadow-sm">
      <div class="container-fluid px-4">
        <!-- Brand -->
        <a class="navbar-brand d-flex align-items-center gap-2" href="#">
          <img src="/vuexy/img/educacross/logo/logo-educacross.svg" alt="Educacross" height="32">
        </a>
        
        <!-- Mobile toggle -->
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span class="navbar-toggler-icon"></span>
        </button>
        
        <!-- Nav content -->
        <div class="collapse navbar-collapse" id="navbarNav">
          <!-- Search -->
          <form class="d-flex mx-auto" style="max-width: 400px; width: 100%;">
            <div class="input-group">
              <span class="input-group-text bg-transparent border-end-0">
                <i class="bi bi-search text-muted"></i>
              </span>
              <input type="search" class="form-control border-start-0" placeholder="Buscar alunos, turmas...">
            </div>
          </form>
          
          <!-- Right side -->
          <ul class="navbar-nav ms-auto align-items-center gap-3">
            <!-- Notificações -->
            <li class="nav-item dropdown">
              <a class="nav-link position-relative" href="#" data-bs-toggle="dropdown">
                <i class="bi bi-bell fs-5"></i>
                <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" style="font-size: 0.65rem;">
                  3
                </span>
              </a>
              <ul class="dropdown-menu dropdown-menu-end" style="width: 300px;">
                <li class="dropdown-header d-flex justify-content-between align-items-center">
                  <span>Notificações</span>
                  <a href="#" class="text-primary small">Marcar como lidas</a>
                </li>
                <li><hr class="dropdown-divider"></li>
                <li>
                  <a class="dropdown-item d-flex gap-2 py-2" href="#">
                    <i class="bi bi-person-plus text-primary"></i>
                    <div>
                      <div class="small fw-medium">Novo aluno cadastrado</div>
                      <small class="text-muted">João Silva - 5º Ano A</small>
                    </div>
                  </a>
                </li>
                <li>
                  <a class="dropdown-item d-flex gap-2 py-2" href="#">
                    <i class="bi bi-trophy text-warning"></i>
                    <div>
                      <div class="small fw-medium">Meta alcançada!</div>
                      <small class="text-muted">Turma 5º Ano A atingiu 80%</small>
                    </div>
                  </a>
                </li>
                <li><hr class="dropdown-divider"></li>
                <li class="text-center py-2">
                  <a href="#" class="small text-primary">Ver todas</a>
                </li>
              </ul>
            </li>
            
            <!-- Perfil -->
            <li class="nav-item dropdown">
              <a class="nav-link d-flex align-items-center gap-2" href="#" data-bs-toggle="dropdown">
                <img src="/vuexy/img/educacross/avatars/Avatar-1.svg" alt="Avatar" class="rounded-circle" width="36" height="36">
                <div class="d-none d-lg-block text-start">
                  <div class="small fw-medium lh-sm">Prof. Maria</div>
                  <small class="text-muted">Escola ABC</small>
                </div>
                <i class="bi bi-chevron-down small"></i>
              </a>
              <ul class="dropdown-menu dropdown-menu-end">
                <li>
                  <a class="dropdown-item" href="#">
                    <i class="bi bi-person me-2"></i> Meu Perfil
                  </a>
                </li>
                <li>
                  <a class="dropdown-item" href="#">
                    <i class="bi bi-gear me-2"></i> Configurações
                  </a>
                </li>
                <li><hr class="dropdown-divider"></li>
                <li>
                  <a class="dropdown-item text-danger" href="#">
                    <i class="bi bi-box-arrow-right me-2"></i> Sair
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  \`
}`,...(d=(r=a.parameters)==null?void 0:r.docs)==null?void 0:d.source}}};var c,p,b;s.parameters={...s.parameters,docs:{...(c=s.parameters)==null?void 0:c.docs,source:{originalSource:`{
  name: '📋 Sidebar Menu',
  render: () => \`
    <div class="d-flex">
      <aside class="bg-white border-end" style="width: 260px; min-height: 500px;">
        <div class="p-3">
          <!-- Logo -->
          <div class="d-flex align-items-center gap-2 mb-4 px-2">
            <img src="/vuexy/img/educacross/logo/logo-educacross.svg" alt="Educacross" height="32">
          </div>
          
          <!-- Menu -->
          <nav class="nav flex-column gap-1">
            <!-- Dashboard -->
            <a class="nav-link d-flex align-items-center gap-3 px-3 py-2 rounded bg-primary text-white" href="#">
              <i class="bi bi-grid-1x2-fill"></i>
              <span>Dashboard</span>
            </a>
            
            <!-- Alunos -->
            <a class="nav-link d-flex align-items-center gap-3 px-3 py-2 rounded text-body" href="#">
              <i class="bi bi-people"></i>
              <span>Alunos</span>
              <span class="badge bg-primary ms-auto">245</span>
            </a>
            
            <!-- Turmas -->
            <a class="nav-link d-flex align-items-center gap-3 px-3 py-2 rounded text-body" href="#">
              <i class="bi bi-collection"></i>
              <span>Turmas</span>
            </a>
            
            <!-- Jogos (com submenu) -->
            <div class="nav-item">
              <a class="nav-link d-flex align-items-center gap-3 px-3 py-2 rounded text-body" href="#" data-bs-toggle="collapse" data-bs-target="#gamesSubmenu">
                <i class="bi bi-controller"></i>
                <span>Jogos</span>
                <i class="bi bi-chevron-down ms-auto small"></i>
              </a>
              <div class="collapse show" id="gamesSubmenu">
                <nav class="nav flex-column ms-4 ps-3 border-start">
                  <a class="nav-link py-2 text-body small" href="#">Matemática</a>
                  <a class="nav-link py-2 text-body small" href="#">Língua Portuguesa</a>
                  <a class="nav-link py-2 text-body small" href="#">Liga das Corujinhas</a>
                </nav>
              </div>
            </div>
            
            <!-- Relatórios -->
            <a class="nav-link d-flex align-items-center gap-3 px-3 py-2 rounded text-body" href="#">
              <i class="bi bi-bar-chart"></i>
              <span>Relatórios</span>
            </a>
            
            <!-- Divisor -->
            <hr class="my-3">
            
            <!-- Configurações -->
            <a class="nav-link d-flex align-items-center gap-3 px-3 py-2 rounded text-body" href="#">
              <i class="bi bi-gear"></i>
              <span>Configurações</span>
            </a>
            
            <!-- Ajuda -->
            <a class="nav-link d-flex align-items-center gap-3 px-3 py-2 rounded text-body" href="#">
              <i class="bi bi-question-circle"></i>
              <span>Ajuda</span>
            </a>
          </nav>
        </div>
      </aside>
      
      <!-- Content placeholder -->
      <div class="flex-grow-1 bg-light p-4">
        <div class="text-muted">Conteúdo da página</div>
      </div>
    </div>
  \`
}`,...(b=(p=s.parameters)==null?void 0:p.docs)==null?void 0:b.source}}};var m,v,g;n.parameters={...n.parameters,docs:{...(m=n.parameters)==null?void 0:m.docs,source:{originalSource:`{
  name: '📌 Sidebar Compacto',
  render: () => \`
    <div class="d-flex">
      <aside class="bg-white border-end text-center" style="width: 72px; min-height: 500px;">
        <div class="py-3">
          <!-- Logo -->
          <div class="mb-4">
            <img src="/vuexy/img/educacross/logo/isotipo-educacross.svg" alt="Educacross" width="32" height="32">
          </div>
          
          <!-- Menu -->
          <nav class="nav flex-column align-items-center gap-2">
            <a class="nav-link p-2 rounded bg-primary text-white" href="#" data-bs-toggle="tooltip" title="Dashboard">
              <i class="bi bi-grid-1x2-fill fs-5"></i>
            </a>
            
            <a class="nav-link p-2 rounded text-body" href="#" data-bs-toggle="tooltip" title="Alunos">
              <i class="bi bi-people fs-5"></i>
            </a>
            
            <a class="nav-link p-2 rounded text-body" href="#" data-bs-toggle="tooltip" title="Turmas">
              <i class="bi bi-collection fs-5"></i>
            </a>
            
            <a class="nav-link p-2 rounded text-body" href="#" data-bs-toggle="tooltip" title="Jogos">
              <i class="bi bi-controller fs-5"></i>
            </a>
            
            <a class="nav-link p-2 rounded text-body" href="#" data-bs-toggle="tooltip" title="Relatórios">
              <i class="bi bi-bar-chart fs-5"></i>
            </a>
            
            <hr class="w-50 my-2">
            
            <a class="nav-link p-2 rounded text-body" href="#" data-bs-toggle="tooltip" title="Configurações">
              <i class="bi bi-gear fs-5"></i>
            </a>
          </nav>
        </div>
      </aside>
      
      <!-- Content placeholder -->
      <div class="flex-grow-1 bg-light p-4">
        <div class="text-muted">Sidebar compacto (collapsed)</div>
      </div>
    </div>
  \`
}`,...(g=(v=n.parameters)==null?void 0:v.docs)==null?void 0:g.source}}};var u,x,f;e.parameters={...e.parameters,docs:{...(u=e.parameters)==null?void 0:u.docs,source:{originalSource:`{
  name: '📱 Bottom Navigation',
  render: () => \`
    <div style="max-width: 375px; margin: 0 auto;">
      <!-- Content -->
      <div class="bg-light p-4" style="min-height: 400px;">
        <p class="text-muted">Conteúdo da página mobile</p>
      </div>
      
      <!-- Bottom Nav -->
      <nav class="navbar fixed-bottom bg-white border-top shadow-sm" style="position: relative;">
        <div class="container-fluid justify-content-around">
          <a class="nav-link text-center text-primary" href="#">
            <i class="bi bi-house-fill d-block fs-5"></i>
            <small>Início</small>
          </a>
          <a class="nav-link text-center text-muted" href="#">
            <i class="bi bi-controller d-block fs-5"></i>
            <small>Jogos</small>
          </a>
          <a class="nav-link text-center text-muted position-relative" href="#">
            <i class="bi bi-trophy d-block fs-5"></i>
            <small>Ranking</small>
            <span class="position-absolute top-0 start-50 badge rounded-pill bg-danger" style="font-size: 0.6rem; transform: translateX(20%);">
              Novo
            </span>
          </a>
          <a class="nav-link text-center text-muted" href="#">
            <i class="bi bi-person d-block fs-5"></i>
            <small>Perfil</small>
          </a>
        </div>
      </nav>
    </div>
  \`
}`,...(f=(x=e.parameters)==null?void 0:x.docs)==null?void 0:f.source}}};var h,w,y;i.parameters={...i.parameters,docs:{...(h=i.parameters)==null?void 0:h.docs,source:{originalSource:`{
  name: '📄 Page Header',
  render: () => \`
    <div class="bg-white border-bottom p-4">
      <!-- Breadcrumb + Actions -->
      <div class="d-flex justify-content-between align-items-center mb-3">
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb mb-0">
            <li class="breadcrumb-item"><a href="#">Dashboard</a></li>
            <li class="breadcrumb-item"><a href="#">Turmas</a></li>
            <li class="breadcrumb-item active">5º Ano A</li>
          </ol>
        </nav>
        <div class="d-flex gap-2">
          <button class="btn btn-outline-secondary btn-sm">
            <i class="bi bi-download me-1"></i> Exportar
          </button>
          <button class="btn btn-primary btn-sm">
            <i class="bi bi-plus-lg me-1"></i> Adicionar Aluno
          </button>
        </div>
      </div>
      
      <!-- Title + Info -->
      <div class="d-flex justify-content-between align-items-end">
        <div>
          <h4 class="mb-1">5º Ano A</h4>
          <div class="d-flex gap-3 text-muted small">
            <span><i class="bi bi-people me-1"></i> 32 alunos</span>
            <span><i class="bi bi-person me-1"></i> Prof. Maria Santos</span>
            <span><i class="bi bi-calendar me-1"></i> Período: 2024</span>
          </div>
        </div>
        <div class="d-flex gap-2">
          <span class="badge bg-success">Ativa</span>
        </div>
      </div>
    </div>
  \`
}`,...(y=(w=i.parameters)==null?void 0:w.docs)==null?void 0:y.source}}};var k,A,C;l.parameters={...l.parameters,docs:{...(k=l.parameters)==null?void 0:k.docs,source:{originalSource:`{
  name: '🔖 Tabs Navigation',
  render: () => \`
    <div class="bg-white">
      <!-- Page Header -->
      <div class="border-bottom p-4 pb-0">
        <h4 class="mb-3">Relatório da Turma</h4>
        
        <!-- Tabs -->
        <ul class="nav nav-tabs">
          <li class="nav-item">
            <a class="nav-link active" href="#">
              <i class="bi bi-graph-up me-1"></i> Visão Geral
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">
              <i class="bi bi-people me-1"></i> Por Aluno
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">
              <i class="bi bi-lightbulb me-1"></i> Por Habilidade
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">
              <i class="bi bi-controller me-1"></i> Por Jogo
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">
              <i class="bi bi-clock-history me-1"></i> Histórico
            </a>
          </li>
        </ul>
      </div>
      
      <!-- Tab Content -->
      <div class="p-4">
        <div class="text-muted">Conteúdo da aba selecionada</div>
      </div>
    </div>
  \`
}`,...(C=(A=l.parameters)==null?void 0:A.docs)==null?void 0:C.source}}};var D,N,S;t.parameters={...t.parameters,docs:{...(D=t.parameters)==null?void 0:D.docs,source:{originalSource:`{
  name: '📂 Submenu Dropdown',
  render: () => \`
    <div class="d-flex gap-4">
      <!-- Navegação horizontal com submenu -->
      <nav class="navbar navbar-expand bg-white border rounded p-2">
        <ul class="navbar-nav gap-1">
          <li class="nav-item">
            <a class="nav-link px-3 py-2 rounded active bg-primary text-white" href="#">Dashboard</a>
          </li>
          
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle px-3 py-2" href="#" data-bs-toggle="dropdown">
              Relatórios
            </a>
            <ul class="dropdown-menu">
              <li><a class="dropdown-item" href="#">Por Turma</a></li>
              <li><a class="dropdown-item" href="#">Por Aluno</a></li>
              <li><a class="dropdown-item" href="#">Por Habilidade</a></li>
              <li><hr class="dropdown-divider"></li>
              <li><a class="dropdown-item" href="#">Comparativo</a></li>
            </ul>
          </li>
          
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle px-3 py-2" href="#" data-bs-toggle="dropdown">
              Configurações
            </a>
            <ul class="dropdown-menu">
              <li>
                <a class="dropdown-item d-flex align-items-center gap-2" href="#">
                  <i class="bi bi-person"></i> Perfil
                </a>
              </li>
              <li>
                <a class="dropdown-item d-flex align-items-center gap-2" href="#">
                  <i class="bi bi-bell"></i> Notificações
                </a>
              </li>
              <li>
                <a class="dropdown-item d-flex align-items-center gap-2" href="#">
                  <i class="bi bi-shield-lock"></i> Segurança
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
    </div>
  \`
}`,...(S=(N=t.parameters)==null?void 0:N.docs)==null?void 0:S.source}}};const P=["Navbar","SidebarMenu","CompactSidebar","BottomNavigation","PageHeader","TabsNavigation","SubmenuDropdown"];export{e as BottomNavigation,n as CompactSidebar,a as Navbar,i as PageHeader,s as SidebarMenu,t as SubmenuDropdown,l as TabsNavigation,P as __namedExportsOrder,E as default};
