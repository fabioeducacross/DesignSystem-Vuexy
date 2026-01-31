export default {
  title: 'Foundations/Icons',
  parameters: {
    docs: {
      description: {
        component: 'Sistema de iconografia usando Bootstrap Icons. Compatível com todos os componentes do Design System.',
      },
    },
  },
};

// Bootstrap Icons mais comuns
const iconsList = [
  // Ações
  { name: 'plus', category: 'Ações', usage: 'Adicionar item' },
  { name: 'x', category: 'Ações', usage: 'Fechar/Remover' },
  { name: 'trash', category: 'Ações', usage: 'Deletar' },
  { name: 'pencil', category: 'Ações', usage: 'Editar' },
  { name: 'check', category: 'Ações', usage: 'Confirmar' },
  { name: 'download', category: 'Ações', usage: 'Baixar' },
  { name:'upload', category: 'Ações', usage: 'Upload' },
  { name: 'search', category: 'Ações', usage: 'Buscar' },
  
  // Navegação
  { name: 'chevron-left', category: 'Navegação', usage: 'Voltar' },
  { name: 'chevron-right', category: 'Navegação', usage: 'Avançar' },
  { name: 'chevron-up', category: 'Navegação', usage: 'Expandir/Colapsar' },
  { name: 'chevron-down', category: 'Navegação', usage: 'Expandir/Colapsar' },
  { name: 'arrow-left', category: 'Navegação', usage: 'Retornar' },
  { name: 'arrow-right', category: 'Navegação', usage: 'Próximo' },
  { name: 'house', category: 'Navegação', usage: 'Home' },
  { name: 'list', category: 'Navegação', usage: 'Menu' },
  
  // Usuário
  { name: 'person', category: 'Usuário', usage: 'Perfil' },
  { name: 'people', category: 'Usuário', usage: 'Equipe' },
  { name: 'person-circle', category: 'Usuário', usage: 'Avatar' },
  { name: 'box-arrow-right', category: 'Usuário', usage: 'Logout' },
  
  // Comunicação
  { name: 'bell', category: 'Comunicação', usage: 'Notificações' },
  { name: 'envelope', category: 'Comunicação', usage: 'Email/Mensagens' },
  { name: 'chat', category: 'Comunicação', usage: 'Chat' },
  { name: 'telephone', category: 'Comunicação', usage: 'Telefone' },
  
  // Status
  { name: 'check-circle', category: 'Status', usage: 'Sucesso' },
  { name: 'x-circle', category: 'Status', usage: 'Erro' },
  { name: 'exclamation-triangle', category: 'Status', usage: 'Aviso' },
  { name: 'info-circle', category: 'Status', usage: 'Informação' },
  
  // Configuração
  { name: 'gear', category: 'Configuração', usage: 'Settings' },
  { name: 'sliders', category: 'Configuração', usage: 'Filtros' },
  { name: 'three-dots-vertical', category: 'Configuração', usage: 'Menu opções' },
  
  // Arquivos
  { name: 'file-earmark', category: 'Arquivos', usage: 'Documento' },
  { name: 'folder', category: 'Arquivos', usage: 'Pasta' },
  { name: 'image', category: 'Arquivos', usage: 'Imagem' },
  
  // Interface
  { name: 'eye', category: 'Interface', usage: 'Visualizar' },
  { name: 'eye-slash', category: 'Interface', usage: 'Ocultar' },
  { name: 'star', category: 'Interface', usage: 'Favorito' },
  { name: 'heart', category: 'Interface', usage: 'Curtir' },
  { name: 'share', category: 'Interface', usage: 'Compartilhar' },
  { name: 'lock', category: 'Interface', usage: 'Bloqueado' },
  { name: 'unlock', category: 'Interface', usage: 'Desbloqueado' },
];

export const AllIcons = {
  render: () => {
    // Agrupar por categoria
    const categories = {};
    iconsList.forEach(icon => {
      if (!categories[icon.category]) {
        categories[icon.category] = [];
      }
      categories[icon.category].push(icon);
    });

    return `
      <div class="p-4">
        <h4 class="mb-4">Bootstrap Icons - Catálogo Completo</h4>
        
        ${Object.keys(categories).map(category => `
          <div class="mb-5">
            <h5 class="text-primary mb-3">
              <i class="bi bi-${categories[category][0].name}"></i>
              ${category}
            </h5>
            <div class="row g-3">
              ${categories[category].map(icon => `
                <div class="col-6 col-md-4 col-lg-3">
                  <div class="card h-100 hover-shadow" style="cursor: pointer;" 
                       onclick="navigator.clipboard.writeText('<i class=\\'bi bi-${icon.name}\\'></i>'); alert('Copiado: <i class=\\'bi bi-${icon.name}\\'></i>')">
                    <div class="card-body text-center">
                      <i class="bi bi-${icon.name}" style="font-size: 2rem; color: #696cff;"></i>
                      <p class="mb-1 mt-2 small fw-semibold">${icon.name}</p>
                      <p class="mb-0 text-muted" style="font-size: 0.75rem;">${icon.usage}</p>
                    </div>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        `).join('')}

        <div class="alert alert-info mt-4">
          <h6 class="alert-heading">
            <i class="bi bi-info-circle me-2"></i>
            Como usar
          </h6>
          <p class="mb-2">Clique em qualquer ícone para copiar o código HTML.</p>
          <p class="mb-0">Bootstrap Icons já está incluído no tema via CDN no preview-head.html</p>
        </div>
      </div>

      <style>
        .hover-shadow:hover {
          box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
          transform: translateY(-2px);
          transition: all 0.2s ease;
        }
      </style>
    `;
  },
};

export const InButtons = {
  render: () => `
    <div class="p-4">
      <h5 class="mb-4">Ícones em Botões</h5>
      
      <div class="d-flex flex-wrap gap-2 mb-4">
        <button class="btn btn-primary">
          <i class="bi bi-plus me-1"></i>
          Adicionar
        </button>
        <button class="btn btn-success">
          <i class="bi bi-check me-1"></i>
          Confirmar
        </button>
        <button class="btn btn-danger">
          <i class="bi bi-trash me-1"></i>
          Deletar
        </button>
        <button class="btn btn-secondary">
          <i class="bi bi-download me-1"></i>
          Download
        </button>
      </div>

      <h6 class="mb-3">Icon-only buttons</h6>
      <div class="d-flex flex-wrap gap-2 mb-4">
        <button class="btn btn-primary btn-icon">
          <i class="bi bi-pencil"></i>
        </button>
        <button class="btn btn-success btn-icon">
          <i class="bi bi-check"></i>
        </button>
        <button class="btn btn-danger btn-icon">
          <i class="bi bi-trash"></i>
        </button>
        <button class="btn btn-secondary btn-icon">
          <i class="bi bi-three-dots-vertical"></i>
        </button>
      </div>

      <div class="alert alert-secondary">
        <strong>Código:</strong>
        <pre class="mb-0 mt-2"><code>&lt;button class="btn btn-primary"&gt;
  &lt;i class="bi bi-plus me-1"&gt;&lt;/i&gt;
  Adicionar
&lt;/button&gt;</code></pre>
      </div>
    </div>
  `,
};

export const InInputGroups = {
  render: () => `
    <div class="p-4">
      <h5 class="mb-4">Ícones em Input Groups</h5>
      
      <div class="mb-3">
        <label class="form-label">Busca</label>
        <div class="input-group">
          <span class="input-group-text">
            <i class="bi bi-search"></i>
          </span>
          <input type="text" class="form-control" placeholder="Buscar...">
        </div>
      </div>

      <div class="mb-3">
        <label class="form-label">Email</label>
        <div class="input-group">
          <span class="input-group-text">
            <i class="bi bi-envelope"></i>
          </span>
          <input type="email" class="form-control" placeholder="seu@email.com">
        </div>
      </div>

      <div class="mb-3">
        <label class="form-label">Senha</label>
        <div class="input-group">
          <span class="input-group-text">
            <i class="bi bi-lock"></i>
          </span>
          <input type="password" class="form-control" placeholder="••••••">
          <button class="btn btn-outline-secondary" type="button">
            <i class="bi bi-eye"></i>
          </button>
        </div>
      </div>

      <div class="alert alert-secondary mt-4">
        <strong>Código:</strong>
        <pre class="mb-0 mt-2"><code>&lt;div class="input-group"&gt;
  &lt;span class="input-group-text"&gt;
    &lt;i class="bi bi-search"&gt;&lt;/i&gt;
  &lt;/span&gt;
  &lt;input type="text" class="form-control"&gt;
&lt;/div&gt;</code></pre>
      </div>
    </div>
  `,
};

export const InNavigation = {
  render: () => `
    <div class="p-4">
      <h5 class="mb-4">Ícones em Navegação</h5>
      
      <nav class="nav nav-pills flex-column mb-4" style="max-width: 250px;">
        <a class="nav-link active" href="#">
          <i class="bi bi-house me-2"></i>
          Dashboard
        </a>
        <a class="nav-link" href="#">
          <i class="bi bi-people me-2"></i>
          Usuários
        </a>
        <a class="nav-link" href="#">
          <i class="bi bi-gear me-2"></i>
          Configurações
        </a>
        <a class="nav-link" href="#">
          <i class="bi bi-box-arrow-right me-2"></i>
          Sair
        </a>
      </nav>

      <h6 class="mb-3">Breadcrumb com ícones</h6>
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <a href="#"><i class="bi bi-house"></i></a>
          </li>
          <li class="breadcrumb-item">
            <a href="#">
              <i class="bi bi-folder me-1"></i>
              Projetos
            </a>
          </li>
          <li class="breadcrumb-item active">
            <i class="bi bi-file-earmark me-1"></i>
            Detalhes
          </li>
        </ol>
      </nav>

      <div class="alert alert-secondary mt-4">
        <strong>Código:</strong>
        <pre class="mb-0 mt-2"><code>&lt;a class="nav-link" href="#"&gt;
  &lt;i class="bi bi-house me-2"&gt;&lt;/i&gt;
  Dashboard
&lt;/a&gt;</code></pre>
      </div>
    </div>
  `,
};

export const Interactive = {
  render: () => {
    setTimeout(() => {
      // Adicionar interatividade de cópia
      const cards = document.querySelectorAll('.icon-copy-card');
      cards.forEach(card => {
        card.addEventListener('click', function() {
          const iconClass = this.dataset.icon;
          navigator.clipboard.writeText(`<i class="bi bi-${iconClass}"></i>`);
          
          // Feedback visual
          const original = this.innerHTML;
          this.innerHTML = '<div class="text-success"><i class="bi bi-check-circle"></i><br>Copiado!</div>';
          setTimeout(() => {
            this.innerHTML = original;
          }, 1000);
        });
      });
    }, 100);

    return `
      <div class="p-4">
        <h5 class="mb-4">
          <i class="bi bi-stars text-primary me-2"></i>
          Playground Interativo de Ícones
        </h5>
        
        <div class="row g-3 mb-4">
          ${['plus', 'search', 'bell', 'heart', 'star', 'gear', 'trash', 'pencil', 'eye', 'download', 'share', 'lock'].map(icon => `
            <div class="col-4 col-md-3 col-lg-2">
              <div class="card text-center icon-copy-card" data-icon="${icon}" 
                   style="cursor: pointer; transition: all 0.2s;">
                <div class="card-body py-4">
                  <i class="bi bi-${icon}" style="font-size: 2.5rem; color: #696cff;"></i>
                  <p class="mb-0 mt-2 small">${icon}</p>
                </div>
              </div>
            </div>
          `).join('')}
        </div>

        <div class="alert alert-success">
          <i class="bi bi-lightbulb me-2"></i>
          <strong>Dica:</strong> Clique em qualquer ícone para copiar o código HTML!
        </div>

        <div class="card">
          <div class="card-header">
            <h6 class="mb-0">
              <i class="bi bi-code-square me-2"></i>
              Referência Rápida
            </h6>
          </div>
          <div class="card-body">
            <table class="table table-sm">
              <thead>
                <tr>
                  <th>Uso</th>
                  <th>Classe</th>
                  <th>Visualização</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Adicionar</td>
                  <td><code>bi bi-plus</code></td>
                  <td><i class="bi bi-plus"></i></td>
                </tr>
                <tr>
                  <td>Editar</td>
                  <td><code>bi bi-pencil</code></td>
                  <td><i class="bi bi-pencil"></i></td>
                </tr>
                <tr>
                  <td>Deletar</td>
                  <td><code>bi bi-trash</code></td>
                  <td><i class="bi bi-trash"></i></td>
                </tr>
                <tr>
                  <td>Buscar</td>
                  <td><code>bi bi-search</code></td>
                  <td><i class="bi bi-search"></i></td>
                </tr>
                <tr>
                  <td>Configurações</td>
                  <td><code>bi bi-gear</code></td>
                  <td><i class="bi bi-gear"></i></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <style>
        .icon-copy-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 0.5rem 1rem rgba(105, 108, 255, 0.2);
        }
        .icon-copy-card:active {
          transform: translateY(-2px);
        }
      </style>
    `;
  },
};
