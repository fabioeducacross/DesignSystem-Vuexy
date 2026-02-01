const y={title:"Educacross/Components/Breadcrumbs",parameters:{layout:"padded",docs:{description:{component:`
## Breadcrumbs

Navegação hierárquica que mostra o caminho até a página atual.

### Uso no Educacross
- **Navegação profunda**: Turma > Aluno > Relatório
- **Filtros aplicados**: Dashboard > Matemática > 5º Ano
- **Administração**: Configurações > Usuários > Editar

### Variantes
- Padrão (com /)
- Com setas
- Com ícones
- Responsivo (truncado)
        `}}}},a={name:"📍 Básico",render:()=>`
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><a href="#">Início</a></li>
        <li class="breadcrumb-item"><a href="#">Turmas</a></li>
        <li class="breadcrumb-item"><a href="#">5º Ano A</a></li>
        <li class="breadcrumb-item active" aria-current="page">Alunos</li>
      </ol>
    </nav>
  `},e={name:"🏠 Com Ícones",render:()=>`
    <div class="d-flex flex-column gap-4">
      <!-- Com ícone home -->
      <div>
        <h6 class="text-muted mb-2">Com Ícone Home</h6>
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb mb-0">
            <li class="breadcrumb-item">
              <a href="#"><i class="bi bi-house"></i></a>
            </li>
            <li class="breadcrumb-item"><a href="#">Turmas</a></li>
            <li class="breadcrumb-item"><a href="#">5º Ano A</a></li>
            <li class="breadcrumb-item active" aria-current="page">Alunos</li>
          </ol>
        </nav>
      </div>
      
      <!-- Com ícones em cada item -->
      <div>
        <h6 class="text-muted mb-2">Ícones em Cada Item</h6>
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb mb-0">
            <li class="breadcrumb-item">
              <a href="#"><i class="bi bi-house me-1"></i> Início</a>
            </li>
            <li class="breadcrumb-item">
              <a href="#"><i class="bi bi-people me-1"></i> Turmas</a>
            </li>
            <li class="breadcrumb-item">
              <a href="#"><i class="bi bi-folder me-1"></i> 5º Ano A</a>
            </li>
            <li class="breadcrumb-item active" aria-current="page">
              <i class="bi bi-person me-1"></i> Alunos
            </li>
          </ol>
        </nav>
      </div>
    </div>
  `},r={name:"➡️ Separadores",render:()=>`
    <div class="d-flex flex-column gap-4">
      <!-- Padrão (/) -->
      <div>
        <h6 class="text-muted mb-2">Padrão (/)</h6>
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb mb-0">
            <li class="breadcrumb-item"><a href="#">Início</a></li>
            <li class="breadcrumb-item"><a href="#">Turmas</a></li>
            <li class="breadcrumb-item active">5º Ano A</li>
          </ol>
        </nav>
      </div>
      
      <!-- Seta (>) -->
      <div>
        <h6 class="text-muted mb-2">Seta (>)</h6>
        <nav aria-label="breadcrumb" style="--bs-breadcrumb-divider: '>';">
          <ol class="breadcrumb mb-0">
            <li class="breadcrumb-item"><a href="#">Início</a></li>
            <li class="breadcrumb-item"><a href="#">Turmas</a></li>
            <li class="breadcrumb-item active">5º Ano A</li>
          </ol>
        </nav>
      </div>
      
      <!-- Chevron (›) -->
      <div>
        <h6 class="text-muted mb-2">Chevron (›)</h6>
        <nav aria-label="breadcrumb" style="--bs-breadcrumb-divider: '›';">
          <ol class="breadcrumb mb-0">
            <li class="breadcrumb-item"><a href="#">Início</a></li>
            <li class="breadcrumb-item"><a href="#">Turmas</a></li>
            <li class="breadcrumb-item active">5º Ano A</li>
          </ol>
        </nav>
      </div>
      
      <!-- Bullet (•) -->
      <div>
        <h6 class="text-muted mb-2">Bullet (•)</h6>
        <nav aria-label="breadcrumb" style="--bs-breadcrumb-divider: '•';">
          <ol class="breadcrumb mb-0">
            <li class="breadcrumb-item"><a href="#">Início</a></li>
            <li class="breadcrumb-item"><a href="#">Turmas</a></li>
            <li class="breadcrumb-item active">5º Ano A</li>
          </ol>
        </nav>
      </div>
    </div>
  `},i={name:"📄 No Cabeçalho",render:()=>`
    <div class="card">
      <div class="card-body">
        <!-- Breadcrumb + título -->
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb mb-2">
            <li class="breadcrumb-item">
              <a href="#"><i class="bi bi-house"></i></a>
            </li>
            <li class="breadcrumb-item"><a href="#">Turmas</a></li>
            <li class="breadcrumb-item"><a href="#">5º Ano A</a></li>
            <li class="breadcrumb-item active" aria-current="page">Alunos</li>
          </ol>
        </nav>
        
        <div class="d-flex justify-content-between align-items-center flex-wrap gap-3">
          <div>
            <h4 class="mb-1">Lista de Alunos</h4>
            <p class="text-muted mb-0">Gerencie os alunos da turma 5º Ano A</p>
          </div>
          <button class="btn btn-primary">
            <i class="bi bi-plus me-1"></i> Novo Aluno
          </button>
        </div>
      </div>
    </div>
  `},s={name:"📂 Com Dropdown",render:()=>`
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item">
          <a href="#"><i class="bi bi-house"></i></a>
        </li>
        <li class="breadcrumb-item">
          <div class="dropdown d-inline-block">
            <a href="#" class="dropdown-toggle text-decoration-none" data-bs-toggle="dropdown">
              Turmas
            </a>
            <ul class="dropdown-menu show position-absolute" style="top: 100%;">
              <li><a class="dropdown-item" href="#">Todas as Turmas</a></li>
              <li><hr class="dropdown-divider"></li>
              <li><a class="dropdown-item" href="#">5º Ano A</a></li>
              <li><a class="dropdown-item" href="#">5º Ano B</a></li>
              <li><a class="dropdown-item" href="#">6º Ano A</a></li>
            </ul>
          </div>
        </li>
        <li class="breadcrumb-item">
          <div class="dropdown d-inline-block">
            <a href="#" class="dropdown-toggle text-decoration-none" data-bs-toggle="dropdown">
              5º Ano A
            </a>
            <ul class="dropdown-menu show position-absolute" style="top: 100%; left: 0;">
              <li><a class="dropdown-item active" href="#">Alunos</a></li>
              <li><a class="dropdown-item" href="#">Jogos</a></li>
              <li><a class="dropdown-item" href="#">Relatórios</a></li>
              <li><a class="dropdown-item" href="#">Configurações</a></li>
            </ul>
          </div>
        </li>
        <li class="breadcrumb-item active" aria-current="page">Maria Silva</li>
      </ol>
    </nav>
  `},l={name:"💡 Casos de Uso",render:()=>`
    <div class="d-flex flex-column gap-4">
      <!-- Perfil de aluno -->
      <div class="card">
        <div class="card-body py-3">
          <nav aria-label="breadcrumb">
            <ol class="breadcrumb mb-0">
              <li class="breadcrumb-item"><a href="#"><i class="bi bi-house"></i></a></li>
              <li class="breadcrumb-item"><a href="#">Turmas</a></li>
              <li class="breadcrumb-item"><a href="#">5º Ano A</a></li>
              <li class="breadcrumb-item active">Maria Silva</li>
            </ol>
          </nav>
        </div>
      </div>
      
      <!-- Relatório -->
      <div class="card">
        <div class="card-body py-3">
          <nav aria-label="breadcrumb">
            <ol class="breadcrumb mb-0">
              <li class="breadcrumb-item"><a href="#"><i class="bi bi-house"></i></a></li>
              <li class="breadcrumb-item"><a href="#">Relatórios</a></li>
              <li class="breadcrumb-item"><a href="#">Desempenho</a></li>
              <li class="breadcrumb-item active">Matemática - Janeiro 2024</li>
            </ol>
          </nav>
        </div>
      </div>
      
      <!-- Jogo -->
      <div class="card">
        <div class="card-body py-3">
          <nav aria-label="breadcrumb">
            <ol class="breadcrumb mb-0">
              <li class="breadcrumb-item"><a href="#"><i class="bi bi-house"></i></a></li>
              <li class="breadcrumb-item"><a href="#">Jogos</a></li>
              <li class="breadcrumb-item"><a href="#">Matemática</a></li>
              <li class="breadcrumb-item active">Aventura dos Números</li>
            </ol>
          </nav>
        </div>
      </div>
      
      <!-- Configurações -->
      <div class="card">
        <div class="card-body py-3">
          <nav aria-label="breadcrumb">
            <ol class="breadcrumb mb-0">
              <li class="breadcrumb-item"><a href="#"><i class="bi bi-house"></i></a></li>
              <li class="breadcrumb-item"><a href="#">Configurações</a></li>
              <li class="breadcrumb-item"><a href="#">Escola</a></li>
              <li class="breadcrumb-item active">Dados Gerais</li>
            </ol>
          </nav>
        </div>
      </div>
    </div>
  `};var c,n,d;a.parameters={...a.parameters,docs:{...(c=a.parameters)==null?void 0:c.docs,source:{originalSource:`{
  name: '📍 Básico',
  render: () => \`
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><a href="#">Início</a></li>
        <li class="breadcrumb-item"><a href="#">Turmas</a></li>
        <li class="breadcrumb-item"><a href="#">5º Ano A</a></li>
        <li class="breadcrumb-item active" aria-current="page">Alunos</li>
      </ol>
    </nav>
  \`
}`,...(d=(n=a.parameters)==null?void 0:n.docs)==null?void 0:d.source}}};var b,o,m;e.parameters={...e.parameters,docs:{...(b=e.parameters)==null?void 0:b.docs,source:{originalSource:`{
  name: '🏠 Com Ícones',
  render: () => \`
    <div class="d-flex flex-column gap-4">
      <!-- Com ícone home -->
      <div>
        <h6 class="text-muted mb-2">Com Ícone Home</h6>
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb mb-0">
            <li class="breadcrumb-item">
              <a href="#"><i class="bi bi-house"></i></a>
            </li>
            <li class="breadcrumb-item"><a href="#">Turmas</a></li>
            <li class="breadcrumb-item"><a href="#">5º Ano A</a></li>
            <li class="breadcrumb-item active" aria-current="page">Alunos</li>
          </ol>
        </nav>
      </div>
      
      <!-- Com ícones em cada item -->
      <div>
        <h6 class="text-muted mb-2">Ícones em Cada Item</h6>
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb mb-0">
            <li class="breadcrumb-item">
              <a href="#"><i class="bi bi-house me-1"></i> Início</a>
            </li>
            <li class="breadcrumb-item">
              <a href="#"><i class="bi bi-people me-1"></i> Turmas</a>
            </li>
            <li class="breadcrumb-item">
              <a href="#"><i class="bi bi-folder me-1"></i> 5º Ano A</a>
            </li>
            <li class="breadcrumb-item active" aria-current="page">
              <i class="bi bi-person me-1"></i> Alunos
            </li>
          </ol>
        </nav>
      </div>
    </div>
  \`
}`,...(m=(o=e.parameters)==null?void 0:o.docs)==null?void 0:m.source}}};var t,u,v;r.parameters={...r.parameters,docs:{...(t=r.parameters)==null?void 0:t.docs,source:{originalSource:`{
  name: '➡️ Separadores',
  render: () => \`
    <div class="d-flex flex-column gap-4">
      <!-- Padrão (/) -->
      <div>
        <h6 class="text-muted mb-2">Padrão (/)</h6>
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb mb-0">
            <li class="breadcrumb-item"><a href="#">Início</a></li>
            <li class="breadcrumb-item"><a href="#">Turmas</a></li>
            <li class="breadcrumb-item active">5º Ano A</li>
          </ol>
        </nav>
      </div>
      
      <!-- Seta (>) -->
      <div>
        <h6 class="text-muted mb-2">Seta (>)</h6>
        <nav aria-label="breadcrumb" style="--bs-breadcrumb-divider: '>';">
          <ol class="breadcrumb mb-0">
            <li class="breadcrumb-item"><a href="#">Início</a></li>
            <li class="breadcrumb-item"><a href="#">Turmas</a></li>
            <li class="breadcrumb-item active">5º Ano A</li>
          </ol>
        </nav>
      </div>
      
      <!-- Chevron (›) -->
      <div>
        <h6 class="text-muted mb-2">Chevron (›)</h6>
        <nav aria-label="breadcrumb" style="--bs-breadcrumb-divider: '›';">
          <ol class="breadcrumb mb-0">
            <li class="breadcrumb-item"><a href="#">Início</a></li>
            <li class="breadcrumb-item"><a href="#">Turmas</a></li>
            <li class="breadcrumb-item active">5º Ano A</li>
          </ol>
        </nav>
      </div>
      
      <!-- Bullet (•) -->
      <div>
        <h6 class="text-muted mb-2">Bullet (•)</h6>
        <nav aria-label="breadcrumb" style="--bs-breadcrumb-divider: '•';">
          <ol class="breadcrumb mb-0">
            <li class="breadcrumb-item"><a href="#">Início</a></li>
            <li class="breadcrumb-item"><a href="#">Turmas</a></li>
            <li class="breadcrumb-item active">5º Ano A</li>
          </ol>
        </nav>
      </div>
    </div>
  \`
}`,...(v=(u=r.parameters)==null?void 0:u.docs)==null?void 0:v.source}}};var h,p,f;i.parameters={...i.parameters,docs:{...(h=i.parameters)==null?void 0:h.docs,source:{originalSource:`{
  name: '📄 No Cabeçalho',
  render: () => \`
    <div class="card">
      <div class="card-body">
        <!-- Breadcrumb + título -->
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb mb-2">
            <li class="breadcrumb-item">
              <a href="#"><i class="bi bi-house"></i></a>
            </li>
            <li class="breadcrumb-item"><a href="#">Turmas</a></li>
            <li class="breadcrumb-item"><a href="#">5º Ano A</a></li>
            <li class="breadcrumb-item active" aria-current="page">Alunos</li>
          </ol>
        </nav>
        
        <div class="d-flex justify-content-between align-items-center flex-wrap gap-3">
          <div>
            <h4 class="mb-1">Lista de Alunos</h4>
            <p class="text-muted mb-0">Gerencie os alunos da turma 5º Ano A</p>
          </div>
          <button class="btn btn-primary">
            <i class="bi bi-plus me-1"></i> Novo Aluno
          </button>
        </div>
      </div>
    </div>
  \`
}`,...(f=(p=i.parameters)==null?void 0:p.docs)==null?void 0:f.source}}};var A,x,g;s.parameters={...s.parameters,docs:{...(A=s.parameters)==null?void 0:A.docs,source:{originalSource:`{
  name: '📂 Com Dropdown',
  render: () => \`
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item">
          <a href="#"><i class="bi bi-house"></i></a>
        </li>
        <li class="breadcrumb-item">
          <div class="dropdown d-inline-block">
            <a href="#" class="dropdown-toggle text-decoration-none" data-bs-toggle="dropdown">
              Turmas
            </a>
            <ul class="dropdown-menu show position-absolute" style="top: 100%;">
              <li><a class="dropdown-item" href="#">Todas as Turmas</a></li>
              <li><hr class="dropdown-divider"></li>
              <li><a class="dropdown-item" href="#">5º Ano A</a></li>
              <li><a class="dropdown-item" href="#">5º Ano B</a></li>
              <li><a class="dropdown-item" href="#">6º Ano A</a></li>
            </ul>
          </div>
        </li>
        <li class="breadcrumb-item">
          <div class="dropdown d-inline-block">
            <a href="#" class="dropdown-toggle text-decoration-none" data-bs-toggle="dropdown">
              5º Ano A
            </a>
            <ul class="dropdown-menu show position-absolute" style="top: 100%; left: 0;">
              <li><a class="dropdown-item active" href="#">Alunos</a></li>
              <li><a class="dropdown-item" href="#">Jogos</a></li>
              <li><a class="dropdown-item" href="#">Relatórios</a></li>
              <li><a class="dropdown-item" href="#">Configurações</a></li>
            </ul>
          </div>
        </li>
        <li class="breadcrumb-item active" aria-current="page">Maria Silva</li>
      </ol>
    </nav>
  \`
}`,...(g=(x=s.parameters)==null?void 0:x.docs)==null?void 0:g.source}}};var w,C,D;l.parameters={...l.parameters,docs:{...(w=l.parameters)==null?void 0:w.docs,source:{originalSource:`{
  name: '💡 Casos de Uso',
  render: () => \`
    <div class="d-flex flex-column gap-4">
      <!-- Perfil de aluno -->
      <div class="card">
        <div class="card-body py-3">
          <nav aria-label="breadcrumb">
            <ol class="breadcrumb mb-0">
              <li class="breadcrumb-item"><a href="#"><i class="bi bi-house"></i></a></li>
              <li class="breadcrumb-item"><a href="#">Turmas</a></li>
              <li class="breadcrumb-item"><a href="#">5º Ano A</a></li>
              <li class="breadcrumb-item active">Maria Silva</li>
            </ol>
          </nav>
        </div>
      </div>
      
      <!-- Relatório -->
      <div class="card">
        <div class="card-body py-3">
          <nav aria-label="breadcrumb">
            <ol class="breadcrumb mb-0">
              <li class="breadcrumb-item"><a href="#"><i class="bi bi-house"></i></a></li>
              <li class="breadcrumb-item"><a href="#">Relatórios</a></li>
              <li class="breadcrumb-item"><a href="#">Desempenho</a></li>
              <li class="breadcrumb-item active">Matemática - Janeiro 2024</li>
            </ol>
          </nav>
        </div>
      </div>
      
      <!-- Jogo -->
      <div class="card">
        <div class="card-body py-3">
          <nav aria-label="breadcrumb">
            <ol class="breadcrumb mb-0">
              <li class="breadcrumb-item"><a href="#"><i class="bi bi-house"></i></a></li>
              <li class="breadcrumb-item"><a href="#">Jogos</a></li>
              <li class="breadcrumb-item"><a href="#">Matemática</a></li>
              <li class="breadcrumb-item active">Aventura dos Números</li>
            </ol>
          </nav>
        </div>
      </div>
      
      <!-- Configurações -->
      <div class="card">
        <div class="card-body py-3">
          <nav aria-label="breadcrumb">
            <ol class="breadcrumb mb-0">
              <li class="breadcrumb-item"><a href="#"><i class="bi bi-house"></i></a></li>
              <li class="breadcrumb-item"><a href="#">Configurações</a></li>
              <li class="breadcrumb-item"><a href="#">Escola</a></li>
              <li class="breadcrumb-item active">Dados Gerais</li>
            </ol>
          </nav>
        </div>
      </div>
    </div>
  \`
}`,...(D=(C=l.parameters)==null?void 0:C.docs)==null?void 0:D.source}}};const B=["Basic","WithIcons","Separators","InPageHeader","WithDropdown","UseCases"];export{a as Basic,i as InPageHeader,r as Separators,l as UseCases,s as WithDropdown,e as WithIcons,B as __namedExportsOrder,y as default};
