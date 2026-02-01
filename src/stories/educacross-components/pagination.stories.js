/**
 * @file Pagination - Educacross Design System
 * @description Componentes de paginação para navegação em listas
 * 
 * Status: DONE
 * Phase: 1 - Componentes simples
 */

export default {
  title: 'Educacross/Components/Pagination',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
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
        `
      }
    }
  }
};

// Story: Paginação básica
export const Basic = {
  name: '📄 Básica',
  render: () => `
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
  `
};

// Story: Com ícones
export const WithIcons = {
  name: '🔀 Com Ícones',
  render: () => `
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
  `
};

// Story: Tamanhos
export const Sizes = {
  name: '📐 Tamanhos',
  render: () => `
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
  `
};

// Story: Com informações
export const WithInfo = {
  name: '📊 Com Informações',
  render: () => `
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
  `
};

// Story: Em contexto de tabela
export const InTable = {
  name: '📋 Em Tabela',
  render: () => `
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
  `
};

// Story: Paginação simples (anterior/próximo)
export const Simple = {
  name: '↔️ Simples',
  render: () => `
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
  `
};

// Story: Estados
export const States = {
  name: '🎨 Estados',
  render: () => `
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
  `
};
