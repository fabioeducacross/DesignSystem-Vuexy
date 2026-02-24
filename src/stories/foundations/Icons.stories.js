export default {
  title: 'Vuexy/Foundations/Icons',
  parameters: {
    docs: {
      description: {
        component: 'Sistema de iconografia do Vuexy com 4 bibliotecas: Bootstrap Icons, Font Awesome 6.7.2, Tabler Icons (5000+), e Flag Icons.',
      },
    },
  },
};

// Story mostrando todas as bibliotecas disponíveis
export const AllLibraries = {
  render: () => `
    <div style="padding: 2rem;">
      <h1 style="margin-bottom: 1rem;">Bibliotecas de Ícones do Vuexy</h1>
      <p style="color: #6c757d; margin-bottom: 3rem;">
        O tema Vuexy inclui 4 bibliotecas de ícones completas, todas carregadas localmente (exceto Bootstrap Icons via CDN).
      </p>
      
      <div style="display: grid; gap: 2rem;">
        <!-- Bootstrap Icons -->
        <div style="padding: 2rem; background: #f8f7fa; border-radius: 12px; border-left: 4px solid #7367f0;">
          <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1rem;">
            <i class="bi bi-bootstrap" style="font-size: 2rem; color: #7367f0;"></i>
            <div>
              <h3 style="margin: 0;">Bootstrap Icons</h3>
              <p style="margin: 0; color: #6c757d; font-size: 0.875rem;">Via CDN • 2000+ ícones • Recomendado</p>
            </div>
          </div>
          <p style="color: #6c757d; margin-bottom: 1rem;">
            Biblioteca oficial do Bootstrap com ícones modernos e simples. <strong>Preferida para o Design System.</strong>
          </p>
          <div style="display: flex; gap: 1rem; align-items: center; flex-wrap: wrap;">
            <code style="background: white; padding: 0.5rem 1rem; border-radius: 6px;">&lt;i class="bi bi-heart"&gt;&lt;/i&gt;</code>
            <div style="display: flex; gap: 0.5rem; font-size: 1.5rem;">
              <i class="bi bi-heart-fill" style="color: #ff4c51;"></i>
              <i class="bi bi-star-fill" style="color: #ff9f43;"></i>
              <i class="bi bi-check-circle-fill" style="color: #28c76f;"></i>
              <i class="bi bi-info-circle-fill" style="color: #00bad1;"></i>
            </div>
          </div>
        </div>

        <!-- Font Awesome -->
        <div style="padding: 2rem; background: #f8f7fa; border-radius: 12px; border-left: 4px solid #00bad1;">
          <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1rem;">
            <i class="fa-brands fa-font-awesome" style="font-size: 2rem; color: #00bad1;"></i>
            <div>
              <h3 style="margin: 0;">Font Awesome 6.7.2</h3>
              <p style="margin: 0; color: #6c757d; font-size: 0.875rem;">Local • 2000+ ícones • Solid, Regular, Brands</p>
            </div>
          </div>
          <p style="color: #6c757d; margin-bottom: 1rem;">
            Biblioteca completa incluindo ícones de marcas (brands). Versão gratuita local.
          </p>
          <div style="display: flex; gap: 1rem; align-items: center; flex-wrap: wrap;">
            <code style="background: white; padding: 0.5rem 1rem; border-radius: 6px;">&lt;i class="fa-solid fa-heart"&gt;&lt;/i&gt;</code>
            <div style="display: flex; gap: 0.5rem; font-size: 1.5rem;">
              <i class="fa-brands fa-github"></i>
              <i class="fa-brands fa-twitter" style="color: #1da1f2;"></i>
              <i class="fa-brands fa-facebook" style="color: #1877f2;"></i>
              <i class="fa-brands fa-linkedin" style="color: #0a66c2;"></i>
            </div>
          </div>
        </div>

        <!-- Tabler Icons -->
        <div style="padding: 2rem; background: #f8f7fa; border-radius: 12px; border-left: 4px solid #28c76f;">
          <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1rem;">
            <i class="ti tabler-brand-tabler" style="font-size: 2rem; color: #28c76f;"></i>
            <div>
              <h3 style="margin: 0;">Tabler Icons (Iconify)</h3>
              <p style="margin: 0; color: #6c757d; font-size: 0.875rem;">Local • 5000+ ícones • Design minimalista</p>
            </div>
          </div>
          <p style="color: #6c757d; margin-bottom: 1rem;">
            Biblioteca massiva com ícones de alta qualidade, estilo outline consistente.
          </p>
          <div style="display: flex; gap: 1rem; align-items: center; flex-wrap: wrap;">
            <code style="background: white; padding: 0.5rem 1rem; border-radius: 6px;">&lt;i class="ti tabler-heart"&gt;&lt;/i&gt;</code>
            <div style="display: flex; gap: 0.5rem; font-size: 1.5rem; color: #28c76f;">
              <i class="ti tabler-heart"></i>
              <i class="ti tabler-star"></i>
              <i class="ti tabler-circle-check"></i>
              <i class="ti tabler-info-circle"></i>
            </div>
          </div>
        </div>

        <!-- Flag Icons -->
        <div style="padding: 2rem; background: #f8f7fa; border-radius: 12px; border-left: 4px solid #ff9f43;">
          <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1rem;">
            <span class="fi fi-br" style="font-size: 2rem;"></span>
            <div>
              <h3 style="margin: 0;">Flag Icons</h3>
              <p style="margin: 0; color: #6c757d; font-size: 0.875rem;">Local • 250+ bandeiras • Países e regiões</p>
            </div>
          </div>
          <p style="color: #6c757d; margin-bottom: 1rem;">
            Bandeiras de todos os países em formato vetorial (1x1 e 4x3).
          </p>
          <div style="display: flex; gap: 1rem; align-items: center; flex-wrap: wrap;">
            <code style="background: white; padding: 0.5rem 1rem; border-radius: 6px;">&lt;span class="fi fi-br"&gt;&lt;/span&gt;</code>
            <div style="display: flex; gap: 0.5rem; font-size: 1.5rem;">
              <span class="fi fi-br"></span>
              <span class="fi fi-us"></span>
              <span class="fi fi-gb"></span>
              <span class="fi fi-fr"></span>
              <span class="fi fi-de"></span>
            </div>
          </div>
        </div>
      </div>

      <div style="margin-top: 3rem; padding: 1.5rem; background: #e9e7fd; border-radius: 12px;">
        <h4 style="margin-bottom: 1rem;">📌 Recomendação de Uso</h4>
        <ul style="line-height: 1.8;">
          <li><strong>Bootstrap Icons:</strong> Use como padrão para UI do Design System (consistência)</li>
          <li><strong>Font Awesome:</strong> Use para ícones de marcas (social media, logos)</li>
          <li><strong>Tabler Icons:</strong> Use quando precisar de ícones específicos não disponíveis no Bootstrap</li>
          <li><strong>Flag Icons:</strong> Use apenas para seletores de país/idioma</li>
        </ul>
      </div>
    </div>
  `,
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
            <i class="bi bi-info-circle mr-2"></i>
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
          <i class="ti tabler-plus mr-1"></i>
          Adicionar
        </button>
        <button class="btn btn-success">
          <i class="ti tabler-check mr-1"></i>
          Confirmar
        </button>
        <button class="btn btn-danger">
          <i class="ti tabler-trash mr-1"></i>
          Deletar
        </button>
        <button class="btn btn-secondary">
          <i class="ti tabler-download mr-1"></i>
          Download
        </button>
      </div>

      <h6 class="mb-3">Icon-only buttons</h6>
      <div class="d-flex flex-wrap gap-2 mb-4">
        <button class="btn btn-primary btn-icon">
          <i class="ti tabler-pencil"></i>
        </button>
        <button class="btn btn-success btn-icon">
          <i class="ti tabler-check"></i>
        </button>
        <button class="btn btn-danger btn-icon">
          <i class="ti tabler-trash"></i>
        </button>
        <button class="btn btn-secondary btn-icon">
          <i class="ti tabler-dots-vertical"></i>
        </button>
      </div>

      <div class="alert alert-secondary">
        <strong>Código:</strong>
        <pre class="mb-0 mt-2"><code>&lt;button class="btn btn-primary"&gt;
  &lt;i class="ti tabler-plus mr-1"&gt;&lt;/i&gt;
  Adicionar
&lt;/button&gt;</code></pre>
      </div>
    </div>
  `,
  parameters: {
    docs: {
      source: {
        code: `<button class="btn btn-primary">
  <i class="ti tabler-plus mr-1"></i>
  Adicionar
</button>

<button class="btn btn-icon btn-primary">
  <i class="ti tabler-pencil"></i>
</button>`
      }
    }
  }
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
          <i class="bi bi-house mr-2"></i>
          Dashboard
        </a>
        <a class="nav-link" href="#">
          <i class="bi bi-people mr-2"></i>
          Usuários
        </a>
        <a class="nav-link" href="#">
          <i class="bi bi-gear mr-2"></i>
          Configurações
        </a>
        <a class="nav-link" href="#">
          <i class="bi bi-box-arrow-right mr-2"></i>
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
              <i class="bi bi-folder mr-1"></i>
              Projetos
            </a>
          </li>
          <li class="breadcrumb-item active">
            <i class="bi bi-file-earmark mr-1"></i>
            Detalhes
          </li>
        </ol>
      </nav>

      <div class="alert alert-secondary mt-4">
        <strong>Código:</strong>
        <pre class="mb-0 mt-2"><code>&lt;a class="nav-link" href="#"&gt;
  &lt;i class="bi bi-house mr-2"&gt;&lt;/i&gt;
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
          <i class="bi bi-stars text-primary mr-2"></i>
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
          <i class="bi bi-lightbulb mr-2"></i>
          <strong>Dica:</strong> Clique em qualquer ícone para copiar o código HTML!
        </div>

        <div class="card">
          <div class="card-header">
            <h6 class="mb-0">
              <i class="bi bi-code-square mr-2"></i>
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
