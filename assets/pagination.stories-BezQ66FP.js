const E={title:"Educacross/Components/Pagination",parameters:{layout:"padded",docs:{description:{component:`
## Pagination

Componentes de paginação para navegação em listas e tabelas.

### Uso no Educacross
- **Tabelas**: Navegação em listas de alunos, jogos, relatórios
- **Resultados**: Paginação de busca
- **Histórico**: Navegação em logs de atividades

### Variantes
- Básica (números)
- Com ícones (setas)
- Com primeiro/último
- Tamanhos (sm, default, lg)
- Com informações (mostrando X de Y)
        `}}}},a={name:"📄 Básica",render:()=>`
    <nav>
      <ul class="pagination">
        <li class="page-item disabled">
          <a class="page-link" href="#">Anterior</a>
        </li>
        <li class="page-item active">
          <a class="page-link" href="#">1</a>
        </li>
        <li class="page-item">
          <a class="page-link" href="#">2</a>
        </li>
        <li class="page-item">
          <a class="page-link" href="#">3</a>
        </li>
        <li class="page-item">
          <a class="page-link" href="#">4</a>
        </li>
        <li class="page-item">
          <a class="page-link" href="#">5</a>
        </li>
        <li class="page-item">
          <a class="page-link" href="#">Próximo</a>
        </li>
      </ul>
    </nav>
  `},s={name:"🔀 Com Ícones",render:()=>`
    <div class="d-flex flex-column gap-4">
      <!-- Setas simples -->
      <div>
        <h6 class="text-muted mb-3">Setas Simples</h6>
        <nav>
          <ul class="pagination mb-0">
            <li class="page-item">
              <a class="page-link" href="#"><i class="bi bi-chevron-left"></i></a>
            </li>
            <li class="page-item active">
              <a class="page-link" href="#">1</a>
            </li>
            <li class="page-item">
              <a class="page-link" href="#">2</a>
            </li>
            <li class="page-item">
              <a class="page-link" href="#">3</a>
            </li>
            <li class="page-item">
              <a class="page-link" href="#"><i class="bi bi-chevron-right"></i></a>
            </li>
          </ul>
        </nav>
      </div>
      
      <!-- Com primeiro e último -->
      <div>
        <h6 class="text-muted mb-3">Com Primeiro/Último</h6>
        <nav>
          <ul class="pagination mb-0">
            <li class="page-item">
              <a class="page-link" href="#"><i class="bi bi-chevron-double-left"></i></a>
            </li>
            <li class="page-item">
              <a class="page-link" href="#"><i class="bi bi-chevron-left"></i></a>
            </li>
            <li class="page-item">
              <a class="page-link" href="#">1</a>
            </li>
            <li class="page-item active">
              <a class="page-link" href="#">2</a>
            </li>
            <li class="page-item">
              <a class="page-link" href="#">3</a>
            </li>
            <li class="page-item">
              <a class="page-link" href="#"><i class="bi bi-chevron-right"></i></a>
            </li>
            <li class="page-item">
              <a class="page-link" href="#"><i class="bi bi-chevron-double-right"></i></a>
            </li>
          </ul>
        </nav>
      </div>
      
      <!-- Arredondado -->
      <div>
        <h6 class="text-muted mb-3">Arredondado</h6>
        <nav>
          <ul class="pagination pagination-rounded mb-0">
            <li class="page-item">
              <a class="page-link rounded-circle" href="#"><i class="bi bi-arrow-left"></i></a>
            </li>
            <li class="page-item active">
              <a class="page-link rounded-circle" href="#">1</a>
            </li>
            <li class="page-item">
              <a class="page-link rounded-circle" href="#">2</a>
            </li>
            <li class="page-item">
              <a class="page-link rounded-circle" href="#">3</a>
            </li>
            <li class="page-item">
              <a class="page-link rounded-circle" href="#"><i class="bi bi-arrow-right"></i></a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  `},i={name:"📐 Tamanhos",render:()=>`
    <div class="d-flex flex-column gap-4">
      <!-- Small -->
      <div>
        <h6 class="text-muted mb-3">Small (pagination-sm)</h6>
        <nav>
          <ul class="pagination pagination-sm mb-0">
            <li class="page-item"><a class="page-link" href="#"><i class="bi bi-chevron-left"></i></a></li>
            <li class="page-item active"><a class="page-link" href="#">1</a></li>
            <li class="page-item"><a class="page-link" href="#">2</a></li>
            <li class="page-item"><a class="page-link" href="#">3</a></li>
            <li class="page-item"><a class="page-link" href="#"><i class="bi bi-chevron-right"></i></a></li>
          </ul>
        </nav>
      </div>
      
      <!-- Default -->
      <div>
        <h6 class="text-muted mb-3">Default</h6>
        <nav>
          <ul class="pagination mb-0">
            <li class="page-item"><a class="page-link" href="#"><i class="bi bi-chevron-left"></i></a></li>
            <li class="page-item active"><a class="page-link" href="#">1</a></li>
            <li class="page-item"><a class="page-link" href="#">2</a></li>
            <li class="page-item"><a class="page-link" href="#">3</a></li>
            <li class="page-item"><a class="page-link" href="#"><i class="bi bi-chevron-right"></i></a></li>
          </ul>
        </nav>
      </div>
      
      <!-- Large -->
      <div>
        <h6 class="text-muted mb-3">Large (pagination-lg)</h6>
        <nav>
          <ul class="pagination pagination-lg mb-0">
            <li class="page-item"><a class="page-link" href="#"><i class="bi bi-chevron-left"></i></a></li>
            <li class="page-item active"><a class="page-link" href="#">1</a></li>
            <li class="page-item"><a class="page-link" href="#">2</a></li>
            <li class="page-item"><a class="page-link" href="#">3</a></li>
            <li class="page-item"><a class="page-link" href="#"><i class="bi bi-chevron-right"></i></a></li>
          </ul>
        </nav>
      </div>
    </div>
  `},e={name:"📊 Com Informações",render:()=>`
    <div class="d-flex flex-column gap-4">
      <!-- Simples -->
      <div>
        <h6 class="text-muted mb-3">Com Contagem</h6>
        <div class="d-flex justify-content-between align-items-center">
          <span class="text-muted">Mostrando 1-10 de 45 alunos</span>
          <nav>
            <ul class="pagination mb-0">
              <li class="page-item disabled"><a class="page-link" href="#"><i class="bi bi-chevron-left"></i></a></li>
              <li class="page-item active"><a class="page-link" href="#">1</a></li>
              <li class="page-item"><a class="page-link" href="#">2</a></li>
              <li class="page-item"><a class="page-link" href="#">3</a></li>
              <li class="page-item"><a class="page-link" href="#">4</a></li>
              <li class="page-item"><a class="page-link" href="#">5</a></li>
              <li class="page-item"><a class="page-link" href="#"><i class="bi bi-chevron-right"></i></a></li>
            </ul>
          </nav>
        </div>
      </div>
      
      <!-- Com seletor de itens -->
      <div>
        <h6 class="text-muted mb-3">Com Seletor de Itens por Página</h6>
        <div class="d-flex justify-content-between align-items-center flex-wrap gap-3">
          <div class="d-flex align-items-center gap-2">
            <span class="text-muted">Exibir</span>
            <select class="form-select form-select-sm" style="width: 70px;">
              <option>10</option>
              <option>25</option>
              <option>50</option>
              <option>100</option>
            </select>
            <span class="text-muted">itens</span>
          </div>
          <span class="text-muted">Mostrando 1-10 de 150 resultados</span>
          <nav>
            <ul class="pagination pagination-sm mb-0">
              <li class="page-item disabled"><a class="page-link" href="#"><i class="bi bi-chevron-left"></i></a></li>
              <li class="page-item active"><a class="page-link" href="#">1</a></li>
              <li class="page-item"><a class="page-link" href="#">2</a></li>
              <li class="page-item"><a class="page-link" href="#">...</a></li>
              <li class="page-item"><a class="page-link" href="#">15</a></li>
              <li class="page-item"><a class="page-link" href="#"><i class="bi bi-chevron-right"></i></a></li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  `},l={name:"📋 Em Tabela",render:()=>`
    <div class="card">
      <div class="card-header d-flex justify-content-between align-items-center">
        <h5 class="mb-0">Lista de Alunos</h5>
        <div class="d-flex align-items-center gap-2">
          <input type="search" class="form-control form-control-sm" placeholder="Buscar..." style="width: 200px;">
        </div>
      </div>
      <div class="card-body p-0">
        <table class="table mb-0">
          <thead>
            <tr>
              <th>Aluno</th>
              <th>Turma</th>
              <th>Progresso</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <div class="d-flex align-items-center gap-2">
                  <div class="avatar avatar-sm">
                    <span class="avatar-initial rounded-circle bg-primary">MS</span>
                  </div>
                  <span>Maria Silva</span>
                </div>
              </td>
              <td>5º Ano A</td>
              <td>
                <div class="progress" style="height: 6px; width: 80px;">
                  <div class="progress-bar bg-success" style="width: 85%"></div>
                </div>
              </td>
              <td><span class="badge bg-success">Ativo</span></td>
            </tr>
            <tr>
              <td>
                <div class="d-flex align-items-center gap-2">
                  <div class="avatar avatar-sm">
                    <span class="avatar-initial rounded-circle bg-info">JO</span>
                  </div>
                  <span>João Oliveira</span>
                </div>
              </td>
              <td>5º Ano A</td>
              <td>
                <div class="progress" style="height: 6px; width: 80px;">
                  <div class="progress-bar bg-warning" style="width: 45%"></div>
                </div>
              </td>
              <td><span class="badge bg-success">Ativo</span></td>
            </tr>
            <tr>
              <td>
                <div class="d-flex align-items-center gap-2">
                  <div class="avatar avatar-sm">
                    <span class="avatar-initial rounded-circle bg-warning">AC</span>
                  </div>
                  <span>Ana Costa</span>
                </div>
              </td>
              <td>5º Ano B</td>
              <td>
                <div class="progress" style="height: 6px; width: 80px;">
                  <div class="progress-bar bg-success" style="width: 92%"></div>
                </div>
              </td>
              <td><span class="badge bg-success">Ativo</span></td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="card-footer d-flex justify-content-between align-items-center">
        <span class="text-muted small">Mostrando 1-3 de 45 alunos</span>
        <nav>
          <ul class="pagination pagination-sm mb-0">
            <li class="page-item disabled">
              <a class="page-link" href="#"><i class="bi bi-chevron-left"></i></a>
            </li>
            <li class="page-item active">
              <a class="page-link" href="#">1</a>
            </li>
            <li class="page-item">
              <a class="page-link" href="#">2</a>
            </li>
            <li class="page-item">
              <a class="page-link" href="#">3</a>
            </li>
            <li class="page-item">
              <a class="page-link" href="#">...</a>
            </li>
            <li class="page-item">
              <a class="page-link" href="#">15</a>
            </li>
            <li class="page-item">
              <a class="page-link" href="#"><i class="bi bi-chevron-right"></i></a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  `},n={name:"↔️ Simples",render:()=>`
    <div class="d-flex flex-column gap-4">
      <!-- Apenas texto -->
      <div>
        <h6 class="text-muted mb-3">Apenas Texto</h6>
        <nav class="d-flex justify-content-between">
          <a href="#" class="btn btn-outline-secondary">
            <i class="bi bi-arrow-left me-1"></i> Anterior
          </a>
          <a href="#" class="btn btn-outline-secondary">
            Próximo <i class="bi bi-arrow-right ms-1"></i>
          </a>
        </nav>
      </div>
      
      <!-- Com contexto -->
      <div>
        <h6 class="text-muted mb-3">Com Contexto</h6>
        <nav class="d-flex justify-content-between align-items-center">
          <a href="#" class="btn btn-outline-secondary">
            <i class="bi bi-chevron-left me-1"></i>
            <div class="text-start">
              <small class="d-block text-muted">Anterior</small>
              <span>Jogo de Adição</span>
            </div>
          </a>
          <span class="text-muted">Página 3 de 10</span>
          <a href="#" class="btn btn-outline-secondary">
            <div class="text-end">
              <small class="d-block text-muted">Próximo</small>
              <span>Jogo de Subtração</span>
            </div>
            <i class="bi bi-chevron-right ms-1"></i>
          </a>
        </nav>
      </div>
    </div>
  `},t={name:"🎨 Estados",render:()=>`
    <div class="d-flex flex-column gap-4">
      <!-- Primeiro item -->
      <div>
        <h6 class="text-muted mb-3">Primeira Página (Anterior Desabilitado)</h6>
        <nav>
          <ul class="pagination mb-0">
            <li class="page-item disabled">
              <a class="page-link" href="#"><i class="bi bi-chevron-left"></i></a>
            </li>
            <li class="page-item active">
              <a class="page-link" href="#">1</a>
            </li>
            <li class="page-item">
              <a class="page-link" href="#">2</a>
            </li>
            <li class="page-item">
              <a class="page-link" href="#">3</a>
            </li>
            <li class="page-item">
              <a class="page-link" href="#"><i class="bi bi-chevron-right"></i></a>
            </li>
          </ul>
        </nav>
      </div>
      
      <!-- Último item -->
      <div>
        <h6 class="text-muted mb-3">Última Página (Próximo Desabilitado)</h6>
        <nav>
          <ul class="pagination mb-0">
            <li class="page-item">
              <a class="page-link" href="#"><i class="bi bi-chevron-left"></i></a>
            </li>
            <li class="page-item">
              <a class="page-link" href="#">1</a>
            </li>
            <li class="page-item">
              <a class="page-link" href="#">2</a>
            </li>
            <li class="page-item active">
              <a class="page-link" href="#">3</a>
            </li>
            <li class="page-item disabled">
              <a class="page-link" href="#"><i class="bi bi-chevron-right"></i></a>
            </li>
          </ul>
        </nav>
      </div>
      
      <!-- Página única -->
      <div>
        <h6 class="text-muted mb-3">Página Única</h6>
        <nav>
          <ul class="pagination mb-0">
            <li class="page-item disabled">
              <a class="page-link" href="#"><i class="bi bi-chevron-left"></i></a>
            </li>
            <li class="page-item active">
              <a class="page-link" href="#">1</a>
            </li>
            <li class="page-item disabled">
              <a class="page-link" href="#"><i class="bi bi-chevron-right"></i></a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  `};var c,r,p;a.parameters={...a.parameters,docs:{...(c=a.parameters)==null?void 0:c.docs,source:{originalSource:`{
  name: '📄 Básica',
  render: () => \`
    <nav>
      <ul class="pagination">
        <li class="page-item disabled">
          <a class="page-link" href="#">Anterior</a>
        </li>
        <li class="page-item active">
          <a class="page-link" href="#">1</a>
        </li>
        <li class="page-item">
          <a class="page-link" href="#">2</a>
        </li>
        <li class="page-item">
          <a class="page-link" href="#">3</a>
        </li>
        <li class="page-item">
          <a class="page-link" href="#">4</a>
        </li>
        <li class="page-item">
          <a class="page-link" href="#">5</a>
        </li>
        <li class="page-item">
          <a class="page-link" href="#">Próximo</a>
        </li>
      </ul>
    </nav>
  \`
}`,...(p=(r=a.parameters)==null?void 0:r.docs)==null?void 0:p.source}}};var d,g,o;s.parameters={...s.parameters,docs:{...(d=s.parameters)==null?void 0:d.docs,source:{originalSource:`{
  name: '🔀 Com Ícones',
  render: () => \`
    <div class="d-flex flex-column gap-4">
      <!-- Setas simples -->
      <div>
        <h6 class="text-muted mb-3">Setas Simples</h6>
        <nav>
          <ul class="pagination mb-0">
            <li class="page-item">
              <a class="page-link" href="#"><i class="bi bi-chevron-left"></i></a>
            </li>
            <li class="page-item active">
              <a class="page-link" href="#">1</a>
            </li>
            <li class="page-item">
              <a class="page-link" href="#">2</a>
            </li>
            <li class="page-item">
              <a class="page-link" href="#">3</a>
            </li>
            <li class="page-item">
              <a class="page-link" href="#"><i class="bi bi-chevron-right"></i></a>
            </li>
          </ul>
        </nav>
      </div>
      
      <!-- Com primeiro e último -->
      <div>
        <h6 class="text-muted mb-3">Com Primeiro/Último</h6>
        <nav>
          <ul class="pagination mb-0">
            <li class="page-item">
              <a class="page-link" href="#"><i class="bi bi-chevron-double-left"></i></a>
            </li>
            <li class="page-item">
              <a class="page-link" href="#"><i class="bi bi-chevron-left"></i></a>
            </li>
            <li class="page-item">
              <a class="page-link" href="#">1</a>
            </li>
            <li class="page-item active">
              <a class="page-link" href="#">2</a>
            </li>
            <li class="page-item">
              <a class="page-link" href="#">3</a>
            </li>
            <li class="page-item">
              <a class="page-link" href="#"><i class="bi bi-chevron-right"></i></a>
            </li>
            <li class="page-item">
              <a class="page-link" href="#"><i class="bi bi-chevron-double-right"></i></a>
            </li>
          </ul>
        </nav>
      </div>
      
      <!-- Arredondado -->
      <div>
        <h6 class="text-muted mb-3">Arredondado</h6>
        <nav>
          <ul class="pagination pagination-rounded mb-0">
            <li class="page-item">
              <a class="page-link rounded-circle" href="#"><i class="bi bi-arrow-left"></i></a>
            </li>
            <li class="page-item active">
              <a class="page-link rounded-circle" href="#">1</a>
            </li>
            <li class="page-item">
              <a class="page-link rounded-circle" href="#">2</a>
            </li>
            <li class="page-item">
              <a class="page-link rounded-circle" href="#">3</a>
            </li>
            <li class="page-item">
              <a class="page-link rounded-circle" href="#"><i class="bi bi-arrow-right"></i></a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  \`
}`,...(o=(g=s.parameters)==null?void 0:g.docs)==null?void 0:o.source}}};var m,h,v;i.parameters={...i.parameters,docs:{...(m=i.parameters)==null?void 0:m.docs,source:{originalSource:`{
  name: '📐 Tamanhos',
  render: () => \`
    <div class="d-flex flex-column gap-4">
      <!-- Small -->
      <div>
        <h6 class="text-muted mb-3">Small (pagination-sm)</h6>
        <nav>
          <ul class="pagination pagination-sm mb-0">
            <li class="page-item"><a class="page-link" href="#"><i class="bi bi-chevron-left"></i></a></li>
            <li class="page-item active"><a class="page-link" href="#">1</a></li>
            <li class="page-item"><a class="page-link" href="#">2</a></li>
            <li class="page-item"><a class="page-link" href="#">3</a></li>
            <li class="page-item"><a class="page-link" href="#"><i class="bi bi-chevron-right"></i></a></li>
          </ul>
        </nav>
      </div>
      
      <!-- Default -->
      <div>
        <h6 class="text-muted mb-3">Default</h6>
        <nav>
          <ul class="pagination mb-0">
            <li class="page-item"><a class="page-link" href="#"><i class="bi bi-chevron-left"></i></a></li>
            <li class="page-item active"><a class="page-link" href="#">1</a></li>
            <li class="page-item"><a class="page-link" href="#">2</a></li>
            <li class="page-item"><a class="page-link" href="#">3</a></li>
            <li class="page-item"><a class="page-link" href="#"><i class="bi bi-chevron-right"></i></a></li>
          </ul>
        </nav>
      </div>
      
      <!-- Large -->
      <div>
        <h6 class="text-muted mb-3">Large (pagination-lg)</h6>
        <nav>
          <ul class="pagination pagination-lg mb-0">
            <li class="page-item"><a class="page-link" href="#"><i class="bi bi-chevron-left"></i></a></li>
            <li class="page-item active"><a class="page-link" href="#">1</a></li>
            <li class="page-item"><a class="page-link" href="#">2</a></li>
            <li class="page-item"><a class="page-link" href="#">3</a></li>
            <li class="page-item"><a class="page-link" href="#"><i class="bi bi-chevron-right"></i></a></li>
          </ul>
        </nav>
      </div>
    </div>
  \`
}`,...(v=(h=i.parameters)==null?void 0:h.docs)==null?void 0:v.source}}};var b,f,u;e.parameters={...e.parameters,docs:{...(b=e.parameters)==null?void 0:b.docs,source:{originalSource:`{
  name: '📊 Com Informações',
  render: () => \`
    <div class="d-flex flex-column gap-4">
      <!-- Simples -->
      <div>
        <h6 class="text-muted mb-3">Com Contagem</h6>
        <div class="d-flex justify-content-between align-items-center">
          <span class="text-muted">Mostrando 1-10 de 45 alunos</span>
          <nav>
            <ul class="pagination mb-0">
              <li class="page-item disabled"><a class="page-link" href="#"><i class="bi bi-chevron-left"></i></a></li>
              <li class="page-item active"><a class="page-link" href="#">1</a></li>
              <li class="page-item"><a class="page-link" href="#">2</a></li>
              <li class="page-item"><a class="page-link" href="#">3</a></li>
              <li class="page-item"><a class="page-link" href="#">4</a></li>
              <li class="page-item"><a class="page-link" href="#">5</a></li>
              <li class="page-item"><a class="page-link" href="#"><i class="bi bi-chevron-right"></i></a></li>
            </ul>
          </nav>
        </div>
      </div>
      
      <!-- Com seletor de itens -->
      <div>
        <h6 class="text-muted mb-3">Com Seletor de Itens por Página</h6>
        <div class="d-flex justify-content-between align-items-center flex-wrap gap-3">
          <div class="d-flex align-items-center gap-2">
            <span class="text-muted">Exibir</span>
            <select class="form-select form-select-sm" style="width: 70px;">
              <option>10</option>
              <option>25</option>
              <option>50</option>
              <option>100</option>
            </select>
            <span class="text-muted">itens</span>
          </div>
          <span class="text-muted">Mostrando 1-10 de 150 resultados</span>
          <nav>
            <ul class="pagination pagination-sm mb-0">
              <li class="page-item disabled"><a class="page-link" href="#"><i class="bi bi-chevron-left"></i></a></li>
              <li class="page-item active"><a class="page-link" href="#">1</a></li>
              <li class="page-item"><a class="page-link" href="#">2</a></li>
              <li class="page-item"><a class="page-link" href="#">...</a></li>
              <li class="page-item"><a class="page-link" href="#">15</a></li>
              <li class="page-item"><a class="page-link" href="#"><i class="bi bi-chevron-right"></i></a></li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  \`
}`,...(u=(f=e.parameters)==null?void 0:f.docs)==null?void 0:u.source}}};var x,k,A;l.parameters={...l.parameters,docs:{...(x=l.parameters)==null?void 0:x.docs,source:{originalSource:`{
  name: '📋 Em Tabela',
  render: () => \`
    <div class="card">
      <div class="card-header d-flex justify-content-between align-items-center">
        <h5 class="mb-0">Lista de Alunos</h5>
        <div class="d-flex align-items-center gap-2">
          <input type="search" class="form-control form-control-sm" placeholder="Buscar..." style="width: 200px;">
        </div>
      </div>
      <div class="card-body p-0">
        <table class="table mb-0">
          <thead>
            <tr>
              <th>Aluno</th>
              <th>Turma</th>
              <th>Progresso</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <div class="d-flex align-items-center gap-2">
                  <div class="avatar avatar-sm">
                    <span class="avatar-initial rounded-circle bg-primary">MS</span>
                  </div>
                  <span>Maria Silva</span>
                </div>
              </td>
              <td>5º Ano A</td>
              <td>
                <div class="progress" style="height: 6px; width: 80px;">
                  <div class="progress-bar bg-success" style="width: 85%"></div>
                </div>
              </td>
              <td><span class="badge bg-success">Ativo</span></td>
            </tr>
            <tr>
              <td>
                <div class="d-flex align-items-center gap-2">
                  <div class="avatar avatar-sm">
                    <span class="avatar-initial rounded-circle bg-info">JO</span>
                  </div>
                  <span>João Oliveira</span>
                </div>
              </td>
              <td>5º Ano A</td>
              <td>
                <div class="progress" style="height: 6px; width: 80px;">
                  <div class="progress-bar bg-warning" style="width: 45%"></div>
                </div>
              </td>
              <td><span class="badge bg-success">Ativo</span></td>
            </tr>
            <tr>
              <td>
                <div class="d-flex align-items-center gap-2">
                  <div class="avatar avatar-sm">
                    <span class="avatar-initial rounded-circle bg-warning">AC</span>
                  </div>
                  <span>Ana Costa</span>
                </div>
              </td>
              <td>5º Ano B</td>
              <td>
                <div class="progress" style="height: 6px; width: 80px;">
                  <div class="progress-bar bg-success" style="width: 92%"></div>
                </div>
              </td>
              <td><span class="badge bg-success">Ativo</span></td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="card-footer d-flex justify-content-between align-items-center">
        <span class="text-muted small">Mostrando 1-3 de 45 alunos</span>
        <nav>
          <ul class="pagination pagination-sm mb-0">
            <li class="page-item disabled">
              <a class="page-link" href="#"><i class="bi bi-chevron-left"></i></a>
            </li>
            <li class="page-item active">
              <a class="page-link" href="#">1</a>
            </li>
            <li class="page-item">
              <a class="page-link" href="#">2</a>
            </li>
            <li class="page-item">
              <a class="page-link" href="#">3</a>
            </li>
            <li class="page-item">
              <a class="page-link" href="#">...</a>
            </li>
            <li class="page-item">
              <a class="page-link" href="#">15</a>
            </li>
            <li class="page-item">
              <a class="page-link" href="#"><i class="bi bi-chevron-right"></i></a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  \`
}`,...(A=(k=l.parameters)==null?void 0:k.docs)==null?void 0:A.source}}};var y,w,C;n.parameters={...n.parameters,docs:{...(y=n.parameters)==null?void 0:y.docs,source:{originalSource:`{
  name: '↔️ Simples',
  render: () => \`
    <div class="d-flex flex-column gap-4">
      <!-- Apenas texto -->
      <div>
        <h6 class="text-muted mb-3">Apenas Texto</h6>
        <nav class="d-flex justify-content-between">
          <a href="#" class="btn btn-outline-secondary">
            <i class="bi bi-arrow-left me-1"></i> Anterior
          </a>
          <a href="#" class="btn btn-outline-secondary">
            Próximo <i class="bi bi-arrow-right ms-1"></i>
          </a>
        </nav>
      </div>
      
      <!-- Com contexto -->
      <div>
        <h6 class="text-muted mb-3">Com Contexto</h6>
        <nav class="d-flex justify-content-between align-items-center">
          <a href="#" class="btn btn-outline-secondary">
            <i class="bi bi-chevron-left me-1"></i>
            <div class="text-start">
              <small class="d-block text-muted">Anterior</small>
              <span>Jogo de Adição</span>
            </div>
          </a>
          <span class="text-muted">Página 3 de 10</span>
          <a href="#" class="btn btn-outline-secondary">
            <div class="text-end">
              <small class="d-block text-muted">Próximo</small>
              <span>Jogo de Subtração</span>
            </div>
            <i class="bi bi-chevron-right ms-1"></i>
          </a>
        </nav>
      </div>
    </div>
  \`
}`,...(C=(w=n.parameters)==null?void 0:w.docs)==null?void 0:C.source}}};var S,D,P;t.parameters={...t.parameters,docs:{...(S=t.parameters)==null?void 0:S.docs,source:{originalSource:`{
  name: '🎨 Estados',
  render: () => \`
    <div class="d-flex flex-column gap-4">
      <!-- Primeiro item -->
      <div>
        <h6 class="text-muted mb-3">Primeira Página (Anterior Desabilitado)</h6>
        <nav>
          <ul class="pagination mb-0">
            <li class="page-item disabled">
              <a class="page-link" href="#"><i class="bi bi-chevron-left"></i></a>
            </li>
            <li class="page-item active">
              <a class="page-link" href="#">1</a>
            </li>
            <li class="page-item">
              <a class="page-link" href="#">2</a>
            </li>
            <li class="page-item">
              <a class="page-link" href="#">3</a>
            </li>
            <li class="page-item">
              <a class="page-link" href="#"><i class="bi bi-chevron-right"></i></a>
            </li>
          </ul>
        </nav>
      </div>
      
      <!-- Último item -->
      <div>
        <h6 class="text-muted mb-3">Última Página (Próximo Desabilitado)</h6>
        <nav>
          <ul class="pagination mb-0">
            <li class="page-item">
              <a class="page-link" href="#"><i class="bi bi-chevron-left"></i></a>
            </li>
            <li class="page-item">
              <a class="page-link" href="#">1</a>
            </li>
            <li class="page-item">
              <a class="page-link" href="#">2</a>
            </li>
            <li class="page-item active">
              <a class="page-link" href="#">3</a>
            </li>
            <li class="page-item disabled">
              <a class="page-link" href="#"><i class="bi bi-chevron-right"></i></a>
            </li>
          </ul>
        </nav>
      </div>
      
      <!-- Página única -->
      <div>
        <h6 class="text-muted mb-3">Página Única</h6>
        <nav>
          <ul class="pagination mb-0">
            <li class="page-item disabled">
              <a class="page-link" href="#"><i class="bi bi-chevron-left"></i></a>
            </li>
            <li class="page-item active">
              <a class="page-link" href="#">1</a>
            </li>
            <li class="page-item disabled">
              <a class="page-link" href="#"><i class="bi bi-chevron-right"></i></a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  \`
}`,...(P=(D=t.parameters)==null?void 0:D.docs)==null?void 0:P.source}}};const j=["Basic","WithIcons","Sizes","WithInfo","InTable","Simple","States"];export{a as Basic,l as InTable,n as Simple,i as Sizes,t as States,s as WithIcons,e as WithInfo,j as __namedExportsOrder,E as default};
