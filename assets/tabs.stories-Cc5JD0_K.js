const T={title:"Educacross/Components/Tabs",parameters:{layout:"padded",docs:{description:{component:`
## Tabs

Abas para organizar conteúdo relacionado em seções.

### Uso no Educacross
- **Perfil de Aluno**: Dados, Progresso, Conquistas
- **Relatórios**: Visão Geral, Detalhado, Comparativo
- **Configurações**: Geral, Notificações, Privacidade
- **Filtros rápidos**: Por período, por status

### Variantes
- Horizontal (padrão)
- Vertical (sidebar)
- Pills (botões)
- Com ícones
- Com badges
        `}}}},a={name:"📑 Básico",render:()=>`
    <div class="card">
      <div class="card-header p-0">
        <ul class="nav nav-tabs" role="tablist">
          <li class="nav-item">
            <a class="nav-link active" href="#">Visão Geral</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Detalhes</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Histórico</a>
          </li>
          <li class="nav-item">
            <a class="nav-link disabled" href="#">Arquivado</a>
          </li>
        </ul>
      </div>
      <div class="card-body">
        <h5>Conteúdo da Visão Geral</h5>
        <p class="text-muted mb-0">O conteúdo de cada aba aparece aqui quando selecionada.</p>
      </div>
    </div>
  `},s={name:"🎯 Com Ícones",render:()=>`
    <div class="card">
      <div class="card-header p-0">
        <ul class="nav nav-tabs" role="tablist">
          <li class="nav-item">
            <a class="nav-link active" href="#">
              <i class="bi bi-house me-2"></i> Início
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">
              <i class="bi bi-person me-2"></i> Perfil
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">
              <i class="bi bi-graph-up me-2"></i> Progresso
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">
              <i class="bi bi-trophy me-2"></i> Conquistas
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">
              <i class="bi bi-gear me-2"></i> Configurações
            </a>
          </li>
        </ul>
      </div>
      <div class="card-body">
        <h5><i class="bi bi-house me-2 text-primary"></i>Página Inicial</h5>
        <p class="text-muted mb-0">Bem-vindo ao dashboard do aluno.</p>
      </div>
    </div>
  `},l={name:"🔢 Com Badges",render:()=>`
    <div class="card">
      <div class="card-header p-0">
        <ul class="nav nav-tabs" role="tablist">
          <li class="nav-item">
            <a class="nav-link active" href="#">
              Alunos
              <span class="badge bg-primary ms-2">45</span>
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">
              Pendentes
              <span class="badge bg-warning ms-2">8</span>
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">
              Alertas
              <span class="badge bg-danger ms-2">3</span>
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">
              Concluídos
              <span class="badge bg-success ms-2">120</span>
            </a>
          </li>
        </ul>
      </div>
      <div class="card-body">
        <h5>Lista de Alunos (45)</h5>
        <p class="text-muted mb-0">Exibindo todos os alunos ativos.</p>
      </div>
    </div>
  `},i={name:"💊 Pills",render:()=>`
    <div class="d-flex flex-column gap-4">
      <!-- Pills básicas -->
      <div>
        <h6 class="text-muted mb-3">Pills Básicas</h6>
        <ul class="nav nav-pills">
          <li class="nav-item">
            <a class="nav-link active" href="#">Todos</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Ativos</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Inativos</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Arquivados</a>
          </li>
        </ul>
      </div>
      
      <!-- Pills com ícones -->
      <div>
        <h6 class="text-muted mb-3">Pills com Ícones</h6>
        <ul class="nav nav-pills">
          <li class="nav-item">
            <a class="nav-link active" href="#">
              <i class="bi bi-grid me-1"></i> Grid
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">
              <i class="bi bi-list me-1"></i> Lista
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">
              <i class="bi bi-table me-1"></i> Tabela
            </a>
          </li>
        </ul>
      </div>
      
      <!-- Pills justified -->
      <div>
        <h6 class="text-muted mb-3">Pills Justified</h6>
        <ul class="nav nav-pills nav-fill">
          <li class="nav-item">
            <a class="nav-link active" href="#">Matemática</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Língua Portuguesa</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Liga das Corujinhas</a>
          </li>
        </ul>
      </div>
    </div>
  `},n={name:"📐 Vertical",render:()=>`
    <div class="card">
      <div class="card-body">
        <div class="row">
          <div class="col-md-3 border-end">
            <ul class="nav nav-pills flex-column">
              <li class="nav-item">
                <a class="nav-link active" href="#">
                  <i class="bi bi-person me-2"></i> Dados Pessoais
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">
                  <i class="bi bi-shield me-2"></i> Segurança
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">
                  <i class="bi bi-bell me-2"></i> Notificações
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">
                  <i class="bi bi-palette me-2"></i> Aparência
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">
                  <i class="bi bi-plug me-2"></i> Integrações
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link text-danger" href="#">
                  <i class="bi bi-trash me-2"></i> Excluir Conta
                </a>
              </li>
            </ul>
          </div>
          <div class="col-md-9">
            <h5><i class="bi bi-person me-2 text-primary"></i>Dados Pessoais</h5>
            <p class="text-muted">Atualize suas informações pessoais.</p>
            <hr>
            <form>
              <div class="mb-3">
                <label class="form-label">Nome Completo</label>
                <input type="text" class="form-control" value="Prof. João Silva">
              </div>
              <div class="mb-3">
                <label class="form-label">E-mail</label>
                <input type="email" class="form-control" value="joao.silva@escola.com">
              </div>
              <button class="btn btn-primary">Salvar Alterações</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  `},e={name:"🎓 Perfil do Aluno",render:()=>`
    <div class="card">
      <!-- Header do perfil -->
      <div class="card-body pb-0">
        <div class="d-flex align-items-center gap-3 mb-4">
          <div class="avatar avatar-xl">
            <span class="avatar-initial rounded-circle bg-primary fs-3">MS</span>
          </div>
          <div>
            <h4 class="mb-1">Maria Silva</h4>
            <div class="d-flex gap-2 flex-wrap">
              <span class="badge bg-label-primary">5º Ano A</span>
              <span class="badge bg-label-success">Avançado</span>
              <span class="badge bg-label-warning">
                <i class="bi bi-trophy me-1"></i> #3 Ranking
              </span>
            </div>
          </div>
        </div>
        
        <!-- Tabs -->
        <ul class="nav nav-tabs" role="tablist">
          <li class="nav-item">
            <a class="nav-link active" href="#">
              <i class="bi bi-graph-up me-2"></i> Desempenho
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">
              <i class="bi bi-controller me-2"></i> Jogos
              <span class="badge bg-primary ms-1">45</span>
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">
              <i class="bi bi-trophy me-2"></i> Conquistas
              <span class="badge bg-warning ms-1">12</span>
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">
              <i class="bi bi-calendar me-2"></i> Frequência
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">
              <i class="bi bi-file-text me-2"></i> Relatórios
            </a>
          </li>
        </ul>
      </div>
      
      <!-- Conteúdo -->
      <div class="card-body">
        <div class="row g-4">
          <div class="col-md-3">
            <div class="card bg-label-primary">
              <div class="card-body text-center">
                <h3 class="mb-1">1.250</h3>
                <small>Pontos XP</small>
              </div>
            </div>
          </div>
          <div class="col-md-3">
            <div class="card bg-label-success">
              <div class="card-body text-center">
                <h3 class="mb-1">87%</h3>
                <small>Taxa de Acerto</small>
              </div>
            </div>
          </div>
          <div class="col-md-3">
            <div class="card bg-label-info">
              <div class="card-body text-center">
                <h3 class="mb-1">45</h3>
                <small>Jogos</small>
              </div>
            </div>
          </div>
          <div class="col-md-3">
            <div class="card bg-label-warning">
              <div class="card-body text-center">
                <h3 class="mb-1">12</h3>
                <small>Troféus</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `},c={name:"📅 Filtro por Período",render:()=>`
    <div class="card">
      <div class="card-header">
        <div class="d-flex justify-content-between align-items-center flex-wrap gap-3">
          <h5 class="mb-0">Relatório de Atividades</h5>
          <ul class="nav nav-pills">
            <li class="nav-item">
              <a class="nav-link" href="#">Hoje</a>
            </li>
            <li class="nav-item">
              <a class="nav-link active" href="#">Esta Semana</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Este Mês</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Este Ano</a>
            </li>
          </ul>
        </div>
      </div>
      <div class="card-body">
        <div class="row g-3">
          <div class="col-md-4">
            <div class="d-flex align-items-center gap-3">
              <span class="badge bg-label-primary rounded-circle p-2">
                <i class="bi bi-controller fs-5"></i>
              </span>
              <div>
                <h5 class="mb-0">234</h5>
                <small class="text-muted">Jogos Realizados</small>
              </div>
            </div>
          </div>
          <div class="col-md-4">
            <div class="d-flex align-items-center gap-3">
              <span class="badge bg-label-success rounded-circle p-2">
                <i class="bi bi-people fs-5"></i>
              </span>
              <div>
                <h5 class="mb-0">45</h5>
                <small class="text-muted">Alunos Ativos</small>
              </div>
            </div>
          </div>
          <div class="col-md-4">
            <div class="d-flex align-items-center gap-3">
              <span class="badge bg-label-warning rounded-circle p-2">
                <i class="bi bi-clock fs-5"></i>
              </span>
              <div>
                <h5 class="mb-0">12h 30m</h5>
                <small class="text-muted">Tempo Total</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `},d={name:"📚 Disciplinas",render:()=>`
    <div class="card">
      <div class="card-header p-0">
        <ul class="nav nav-tabs nav-fill" role="tablist">
          <li class="nav-item">
            <a class="nav-link active d-flex align-items-center justify-content-center gap-2" href="#">
              <span class="badge bg-primary">MT</span>
              Matemática
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link d-flex align-items-center justify-content-center gap-2" href="#">
              <span class="badge bg-info">LP</span>
              Língua Portuguesa
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link d-flex align-items-center justify-content-center gap-2" href="#">
              <span class="badge bg-warning text-dark">LC</span>
              Liga das Corujinhas
            </a>
          </li>
        </ul>
      </div>
      <div class="card-body">
        <div class="d-flex align-items-center gap-3 mb-4">
          <img src="/vuexy/img/educacross/subjects/Matemática.svg" 
               alt="Matemática" 
               style="width: 48px; height: 48px;"
               onerror="this.outerHTML='<span class=\\'badge bg-primary p-3\\'><i class=\\'bi bi-calculator fs-3\\'></i></span>'">
          <div>
            <h5 class="mb-1">Matemática</h5>
            <p class="text-muted mb-0">Números, operações, geometria e mais</p>
          </div>
        </div>
        <div class="row g-3">
          <div class="col-md-4">
            <div class="card border">
              <div class="card-body text-center">
                <h4 class="mb-1">25</h4>
                <small class="text-muted">Jogos Disponíveis</small>
              </div>
            </div>
          </div>
          <div class="col-md-4">
            <div class="card border">
              <div class="card-body text-center">
                <h4 class="mb-1">18</h4>
                <small class="text-muted">Completados</small>
              </div>
            </div>
          </div>
          <div class="col-md-4">
            <div class="card border">
              <div class="card-body text-center">
                <h4 class="mb-1">92%</h4>
                <small class="text-muted">Aproveitamento</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `};var r,t,v;a.parameters={...a.parameters,docs:{...(r=a.parameters)==null?void 0:r.docs,source:{originalSource:`{
  name: '📑 Básico',
  render: () => \`
    <div class="card">
      <div class="card-header p-0">
        <ul class="nav nav-tabs" role="tablist">
          <li class="nav-item">
            <a class="nav-link active" href="#">Visão Geral</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Detalhes</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Histórico</a>
          </li>
          <li class="nav-item">
            <a class="nav-link disabled" href="#">Arquivado</a>
          </li>
        </ul>
      </div>
      <div class="card-body">
        <h5>Conteúdo da Visão Geral</h5>
        <p class="text-muted mb-0">O conteúdo de cada aba aparece aqui quando selecionada.</p>
      </div>
    </div>
  \`
}`,...(v=(t=a.parameters)==null?void 0:t.docs)==null?void 0:v.source}}};var o,m,b;s.parameters={...s.parameters,docs:{...(o=s.parameters)==null?void 0:o.docs,source:{originalSource:`{
  name: '🎯 Com Ícones',
  render: () => \`
    <div class="card">
      <div class="card-header p-0">
        <ul class="nav nav-tabs" role="tablist">
          <li class="nav-item">
            <a class="nav-link active" href="#">
              <i class="bi bi-house me-2"></i> Início
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">
              <i class="bi bi-person me-2"></i> Perfil
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">
              <i class="bi bi-graph-up me-2"></i> Progresso
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">
              <i class="bi bi-trophy me-2"></i> Conquistas
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">
              <i class="bi bi-gear me-2"></i> Configurações
            </a>
          </li>
        </ul>
      </div>
      <div class="card-body">
        <h5><i class="bi bi-house me-2 text-primary"></i>Página Inicial</h5>
        <p class="text-muted mb-0">Bem-vindo ao dashboard do aluno.</p>
      </div>
    </div>
  \`
}`,...(b=(m=s.parameters)==null?void 0:m.docs)==null?void 0:b.source}}};var p,u,h;l.parameters={...l.parameters,docs:{...(p=l.parameters)==null?void 0:p.docs,source:{originalSource:`{
  name: '🔢 Com Badges',
  render: () => \`
    <div class="card">
      <div class="card-header p-0">
        <ul class="nav nav-tabs" role="tablist">
          <li class="nav-item">
            <a class="nav-link active" href="#">
              Alunos
              <span class="badge bg-primary ms-2">45</span>
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">
              Pendentes
              <span class="badge bg-warning ms-2">8</span>
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">
              Alertas
              <span class="badge bg-danger ms-2">3</span>
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">
              Concluídos
              <span class="badge bg-success ms-2">120</span>
            </a>
          </li>
        </ul>
      </div>
      <div class="card-body">
        <h5>Lista de Alunos (45)</h5>
        <p class="text-muted mb-0">Exibindo todos os alunos ativos.</p>
      </div>
    </div>
  \`
}`,...(h=(u=l.parameters)==null?void 0:u.docs)==null?void 0:h.source}}};var g,f,x;i.parameters={...i.parameters,docs:{...(g=i.parameters)==null?void 0:g.docs,source:{originalSource:`{
  name: '💊 Pills',
  render: () => \`
    <div class="d-flex flex-column gap-4">
      <!-- Pills básicas -->
      <div>
        <h6 class="text-muted mb-3">Pills Básicas</h6>
        <ul class="nav nav-pills">
          <li class="nav-item">
            <a class="nav-link active" href="#">Todos</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Ativos</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Inativos</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Arquivados</a>
          </li>
        </ul>
      </div>
      
      <!-- Pills com ícones -->
      <div>
        <h6 class="text-muted mb-3">Pills com Ícones</h6>
        <ul class="nav nav-pills">
          <li class="nav-item">
            <a class="nav-link active" href="#">
              <i class="bi bi-grid me-1"></i> Grid
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">
              <i class="bi bi-list me-1"></i> Lista
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">
              <i class="bi bi-table me-1"></i> Tabela
            </a>
          </li>
        </ul>
      </div>
      
      <!-- Pills justified -->
      <div>
        <h6 class="text-muted mb-3">Pills Justified</h6>
        <ul class="nav nav-pills nav-fill">
          <li class="nav-item">
            <a class="nav-link active" href="#">Matemática</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Língua Portuguesa</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Liga das Corujinhas</a>
          </li>
        </ul>
      </div>
    </div>
  \`
}`,...(x=(f=i.parameters)==null?void 0:f.docs)==null?void 0:x.source}}};var k,y,P;n.parameters={...n.parameters,docs:{...(k=n.parameters)==null?void 0:k.docs,source:{originalSource:`{
  name: '📐 Vertical',
  render: () => \`
    <div class="card">
      <div class="card-body">
        <div class="row">
          <div class="col-md-3 border-end">
            <ul class="nav nav-pills flex-column">
              <li class="nav-item">
                <a class="nav-link active" href="#">
                  <i class="bi bi-person me-2"></i> Dados Pessoais
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">
                  <i class="bi bi-shield me-2"></i> Segurança
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">
                  <i class="bi bi-bell me-2"></i> Notificações
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">
                  <i class="bi bi-palette me-2"></i> Aparência
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">
                  <i class="bi bi-plug me-2"></i> Integrações
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link text-danger" href="#">
                  <i class="bi bi-trash me-2"></i> Excluir Conta
                </a>
              </li>
            </ul>
          </div>
          <div class="col-md-9">
            <h5><i class="bi bi-person me-2 text-primary"></i>Dados Pessoais</h5>
            <p class="text-muted">Atualize suas informações pessoais.</p>
            <hr>
            <form>
              <div class="mb-3">
                <label class="form-label">Nome Completo</label>
                <input type="text" class="form-control" value="Prof. João Silva">
              </div>
              <div class="mb-3">
                <label class="form-label">E-mail</label>
                <input type="email" class="form-control" value="joao.silva@escola.com">
              </div>
              <button class="btn btn-primary">Salvar Alterações</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  \`
}`,...(P=(y=n.parameters)==null?void 0:y.docs)==null?void 0:P.source}}};var A,D,E;e.parameters={...e.parameters,docs:{...(A=e.parameters)==null?void 0:A.docs,source:{originalSource:`{
  name: '🎓 Perfil do Aluno',
  render: () => \`
    <div class="card">
      <!-- Header do perfil -->
      <div class="card-body pb-0">
        <div class="d-flex align-items-center gap-3 mb-4">
          <div class="avatar avatar-xl">
            <span class="avatar-initial rounded-circle bg-primary fs-3">MS</span>
          </div>
          <div>
            <h4 class="mb-1">Maria Silva</h4>
            <div class="d-flex gap-2 flex-wrap">
              <span class="badge bg-label-primary">5º Ano A</span>
              <span class="badge bg-label-success">Avançado</span>
              <span class="badge bg-label-warning">
                <i class="bi bi-trophy me-1"></i> #3 Ranking
              </span>
            </div>
          </div>
        </div>
        
        <!-- Tabs -->
        <ul class="nav nav-tabs" role="tablist">
          <li class="nav-item">
            <a class="nav-link active" href="#">
              <i class="bi bi-graph-up me-2"></i> Desempenho
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">
              <i class="bi bi-controller me-2"></i> Jogos
              <span class="badge bg-primary ms-1">45</span>
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">
              <i class="bi bi-trophy me-2"></i> Conquistas
              <span class="badge bg-warning ms-1">12</span>
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">
              <i class="bi bi-calendar me-2"></i> Frequência
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">
              <i class="bi bi-file-text me-2"></i> Relatórios
            </a>
          </li>
        </ul>
      </div>
      
      <!-- Conteúdo -->
      <div class="card-body">
        <div class="row g-4">
          <div class="col-md-3">
            <div class="card bg-label-primary">
              <div class="card-body text-center">
                <h3 class="mb-1">1.250</h3>
                <small>Pontos XP</small>
              </div>
            </div>
          </div>
          <div class="col-md-3">
            <div class="card bg-label-success">
              <div class="card-body text-center">
                <h3 class="mb-1">87%</h3>
                <small>Taxa de Acerto</small>
              </div>
            </div>
          </div>
          <div class="col-md-3">
            <div class="card bg-label-info">
              <div class="card-body text-center">
                <h3 class="mb-1">45</h3>
                <small>Jogos</small>
              </div>
            </div>
          </div>
          <div class="col-md-3">
            <div class="card bg-label-warning">
              <div class="card-body text-center">
                <h3 class="mb-1">12</h3>
                <small>Troféus</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  \`
}`,...(E=(D=e.parameters)==null?void 0:D.docs)==null?void 0:E.source}}};var C,w,S;c.parameters={...c.parameters,docs:{...(C=c.parameters)==null?void 0:C.docs,source:{originalSource:`{
  name: '📅 Filtro por Período',
  render: () => \`
    <div class="card">
      <div class="card-header">
        <div class="d-flex justify-content-between align-items-center flex-wrap gap-3">
          <h5 class="mb-0">Relatório de Atividades</h5>
          <ul class="nav nav-pills">
            <li class="nav-item">
              <a class="nav-link" href="#">Hoje</a>
            </li>
            <li class="nav-item">
              <a class="nav-link active" href="#">Esta Semana</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Este Mês</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Este Ano</a>
            </li>
          </ul>
        </div>
      </div>
      <div class="card-body">
        <div class="row g-3">
          <div class="col-md-4">
            <div class="d-flex align-items-center gap-3">
              <span class="badge bg-label-primary rounded-circle p-2">
                <i class="bi bi-controller fs-5"></i>
              </span>
              <div>
                <h5 class="mb-0">234</h5>
                <small class="text-muted">Jogos Realizados</small>
              </div>
            </div>
          </div>
          <div class="col-md-4">
            <div class="d-flex align-items-center gap-3">
              <span class="badge bg-label-success rounded-circle p-2">
                <i class="bi bi-people fs-5"></i>
              </span>
              <div>
                <h5 class="mb-0">45</h5>
                <small class="text-muted">Alunos Ativos</small>
              </div>
            </div>
          </div>
          <div class="col-md-4">
            <div class="d-flex align-items-center gap-3">
              <span class="badge bg-label-warning rounded-circle p-2">
                <i class="bi bi-clock fs-5"></i>
              </span>
              <div>
                <h5 class="mb-0">12h 30m</h5>
                <small class="text-muted">Tempo Total</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  \`
}`,...(S=(w=c.parameters)==null?void 0:w.docs)==null?void 0:S.source}}};var F,j,M;d.parameters={...d.parameters,docs:{...(F=d.parameters)==null?void 0:F.docs,source:{originalSource:`{
  name: '📚 Disciplinas',
  render: () => \`
    <div class="card">
      <div class="card-header p-0">
        <ul class="nav nav-tabs nav-fill" role="tablist">
          <li class="nav-item">
            <a class="nav-link active d-flex align-items-center justify-content-center gap-2" href="#">
              <span class="badge bg-primary">MT</span>
              Matemática
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link d-flex align-items-center justify-content-center gap-2" href="#">
              <span class="badge bg-info">LP</span>
              Língua Portuguesa
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link d-flex align-items-center justify-content-center gap-2" href="#">
              <span class="badge bg-warning text-dark">LC</span>
              Liga das Corujinhas
            </a>
          </li>
        </ul>
      </div>
      <div class="card-body">
        <div class="d-flex align-items-center gap-3 mb-4">
          <img src="/vuexy/img/educacross/subjects/Matemática.svg" 
               alt="Matemática" 
               style="width: 48px; height: 48px;"
               onerror="this.outerHTML='<span class=\\\\'badge bg-primary p-3\\\\'><i class=\\\\'bi bi-calculator fs-3\\\\'></i></span>'">
          <div>
            <h5 class="mb-1">Matemática</h5>
            <p class="text-muted mb-0">Números, operações, geometria e mais</p>
          </div>
        </div>
        <div class="row g-3">
          <div class="col-md-4">
            <div class="card border">
              <div class="card-body text-center">
                <h4 class="mb-1">25</h4>
                <small class="text-muted">Jogos Disponíveis</small>
              </div>
            </div>
          </div>
          <div class="col-md-4">
            <div class="card border">
              <div class="card-body text-center">
                <h4 class="mb-1">18</h4>
                <small class="text-muted">Completados</small>
              </div>
            </div>
          </div>
          <div class="col-md-4">
            <div class="card border">
              <div class="card-body text-center">
                <h4 class="mb-1">92%</h4>
                <small class="text-muted">Aproveitamento</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  \`
}`,...(M=(j=d.parameters)==null?void 0:j.docs)==null?void 0:M.source}}};const L=["Basic","WithIcons","WithBadges","Pills","Vertical","StudentProfile","PeriodFilter","Subjects"];export{a as Basic,c as PeriodFilter,i as Pills,e as StudentProfile,d as Subjects,n as Vertical,l as WithBadges,s as WithIcons,L as __namedExportsOrder,T as default};
