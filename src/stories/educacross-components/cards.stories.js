/**
 * Educacross Components - Cards
 * 
 * Componentes de card extraídos do educacross-frontoffice
 * MediaCard é usado em dashboards e relatórios
 */

export default {
  title: 'Educacross/Cards',
  parameters: {
    layout: 'padded',
  },
};

/**
 * MediaCard - Card com ícone e estatísticas
 * Original: educacross-frontoffice/src/components/card/MediaCard.vue
 */
export const MediaCard = {
  render: () => `
    <style>
      .media-card-demo .card {
        margin-bottom: 1.5rem;
      }
      
      .media-card-icon {
        width: 48px;
        height: 48px;
        border-radius: 0.5rem;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.5rem;
        margin-right: 1rem;
      }
      
      .media-card-icon.bg-light-primary {
        background-color: rgba(115, 103, 240, 0.12);
        color: #7367F0;
      }
      
      .media-card-icon.bg-light-success {
        background-color: rgba(40, 199, 111, 0.12);
        color: #28C76F;
      }
      
      .media-card-icon.bg-light-warning {
        background-color: rgba(255, 159, 67, 0.12);
        color: #FF9F43;
      }
      
      .media-card-icon.bg-light-danger {
        background-color: rgba(234, 84, 85, 0.12);
        color: #EA5455;
      }
      
      .media-card-icon.bg-light-info {
        background-color: rgba(0, 207, 232, 0.12);
        color: #00CFE8;
      }
    </style>
    
    <div class="media-card-demo">
      <h5 class="mb-4">Media Cards - Estatísticas com Ícones</h5>
      
      <div class="row">
        <div class="col-md-6 col-lg-4">
          <div class="card">
            <div class="card-body d-flex align-items-center">
              <div class="media-card-icon bg-light-primary">
                <i class="ti ti-users"></i>
              </div>
              <div class="flex-grow-1">
                <h6 class="mb-1">Total de Alunos</h6>
                <h3 class="mb-0">1,245</h3>
              </div>
              <div class="text-end">
                <i class="ti ti-info-circle text-muted" title="Ver detalhes"></i>
              </div>
            </div>
          </div>
        </div>
        
        <div class="col-md-6 col-lg-4">
          <div class="card">
            <div class="card-body d-flex align-items-center">
              <div class="media-card-icon bg-light-success">
                <i class="ti ti-check"></i>
              </div>
              <div class="flex-grow-1">
                <h6 class="mb-1">Atividades Concluídas</h6>
                <h3 class="mb-0">892</h3>
              </div>
              <div class="text-end">
                <i class="ti ti-info-circle text-muted" title="Ver detalhes"></i>
              </div>
            </div>
          </div>
        </div>
        
        <div class="col-md-6 col-lg-4">
          <div class="card">
            <div class="card-body d-flex align-items-center">
              <div class="media-card-icon bg-light-warning">
                <i class="ti ti-clock"></i>
              </div>
              <div class="flex-grow-1">
                <h6 class="mb-1">Em Progresso</h6>
                <h3 class="mb-0">156</h3>
              </div>
              <div class="text-end">
                <i class="ti ti-info-circle text-muted" title="Ver detalhes"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <h6 class="mb-3">Com Background Colorido</h6>
      
      <div class="row">
        <div class="col-md-6">
          <div class="card bg-light-success">
            <div class="card-body d-flex align-items-center">
              <div class="media-card-icon bg-success text-white">
                <i class="ti ti-trophy"></i>
              </div>
              <div class="flex-grow-1">
                <h6 class="mb-1">Taxa de Conclusão</h6>
                <h3 class="mb-0">87.5%</h3>
                <small class="text-muted">Acima da meta</small>
              </div>
            </div>
          </div>
        </div>
        
        <div class="col-md-6">
          <div class="card bg-light-info">
            <div class="card-body d-flex align-items-center">
              <div class="media-card-icon bg-info text-white">
                <i class="ti ti-book"></i>
              </div>
              <div class="flex-grow-1">
                <h6 class="mb-1">Missões Disponíveis</h6>
                <h3 class="mb-0">24</h3>
                <small class="text-muted">+6 esta semana</small>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div class="alert alert-info">
        <strong>Uso Original:</strong> Usado em dashboards de professores e coordenadores 
        para mostrar estatísticas rápidas. Pode ter tooltip e ser clicável para ver detalhes.
      </div>
    </div>
  `,
};

/**
 * MediaCardIcon - Ícone para MediaCard
 * Original: educacross-frontoffice/src/components/card/MediaCardIcon.vue
 */
export const MediaCardIcon = {
  render: () => `
    <style>
      .icon-demo .media-card-icon {
        width: 48px;
        height: 48px;
        border-radius: 0.5rem;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.5rem;
      }
      
      .icon-demo .bg-light-primary { background-color: rgba(115, 103, 240, 0.12); color: #7367F0; }
      .icon-demo .bg-light-success { background-color: rgba(40, 199, 111, 0.12); color: #28C76F; }
      .icon-demo .bg-light-warning { background-color: rgba(255, 159, 67, 0.12); color: #FF9F43; }
      .icon-demo .bg-light-danger { background-color: rgba(234, 84, 85, 0.12); color: #EA5455; }
      .icon-demo .bg-light-info { background-color: rgba(0, 207, 232, 0.12); color: #00CFE8; }
    </style>
    
    <div class="icon-demo">
      <h5 class="mb-3">Media Card Icons - Variantes de Ícones</h5>
      
      <div class="row g-3">
        <div class="col-auto">
          <div class="media-card-icon bg-light-primary">
            <i class="ti ti-users"></i>
          </div>
          <small class="d-block text-center mt-1">Primary</small>
        </div>
        
        <div class="col-auto">
          <div class="media-card-icon bg-light-success">
            <i class="ti ti-check"></i>
          </div>
          <small class="d-block text-center mt-1">Success</small>
        </div>
        
        <div class="col-auto">
          <div class="media-card-icon bg-light-warning">
            <i class="ti ti-alert-triangle"></i>
          </div>
          <small class="d-block text-center mt-1">Warning</small>
        </div>
        
        <div class="col-auto">
          <div class="media-card-icon bg-light-danger">
            <i class="ti ti-x"></i>
          </div>
          <small class="d-block text-center mt-1">Danger</small>
        </div>
        
        <div class="col-auto">
          <div class="media-card-icon bg-light-info">
            <i class="ti ti-info-circle"></i>
          </div>
          <small class="d-block text-center mt-1">Info</small>
        </div>
      </div>
      
      <h6 class="mt-4 mb-3">Ícones Sólidos</h6>
      
      <div class="row g-3">
        <div class="col-auto">
          <div class="media-card-icon bg-primary text-white">
            <i class="ti ti-star"></i>
          </div>
        </div>
        
        <div class="col-auto">
          <div class="media-card-icon bg-success text-white">
            <i class="ti ti-trophy"></i>
          </div>
        </div>
        
        <div class="col-auto">
          <div class="media-card-icon bg-warning text-white">
            <i class="ti ti-flame"></i>
          </div>
        </div>
        
        <div class="col-auto">
          <div class="media-card-icon bg-danger text-white">
            <i class="ti ti-ban"></i>
          </div>
        </div>
      </div>
    </div>
  `,
};

/**
 * LoadingCard - Card com estado de carregamento
 * Original: Variante do MediaCard com loading=true
 */
export const LoadingCard = {
  render: () => `
    <style>
      .skeleton {
        background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
        background-size: 200% 100%;
        animation: skeleton-loading 1.5s infinite;
        border-radius: 0.25rem;
      }
      
      @keyframes skeleton-loading {
        0% { background-position: 200% 0; }
        100% { background-position: -200% 0; }
      }
      
      .skeleton-icon {
        width: 48px;
        height: 48px;
        border-radius: 0.5rem;
      }
      
      .skeleton-text {
        height: 1rem;
        margin-bottom: 0.5rem;
      }
      
      .skeleton-text-lg {
        height: 1.5rem;
        width: 50%;
      }
    </style>
    
    <div>
      <h5 class="mb-4">Cards com Loading State</h5>
      
      <div class="row">
        <div class="col-md-6 col-lg-4">
          <div class="card">
            <div class="card-body d-flex align-items-center">
              <div class="skeleton skeleton-icon me-3"></div>
              <div class="flex-grow-1">
                <div class="skeleton skeleton-text" style="width: 60%"></div>
                <div class="skeleton skeleton-text-lg"></div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="col-md-6 col-lg-4">
          <div class="card">
            <div class="card-body d-flex align-items-center">
              <div class="skeleton skeleton-icon me-3"></div>
              <div class="flex-grow-1">
                <div class="skeleton skeleton-text" style="width: 70%"></div>
                <div class="skeleton skeleton-text-lg"></div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="col-md-6 col-lg-4">
          <div class="card">
            <div class="card-body d-flex align-items-center">
              <div class="skeleton skeleton-icon me-3"></div>
              <div class="flex-grow-1">
                <div class="skeleton skeleton-text" style="width: 55%"></div>
                <div class="skeleton skeleton-text-lg"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div class="alert alert-info mt-4">
        <strong>Uso Original:</strong> Estado de carregamento enquanto dados estão sendo 
        buscados da API. Usa skeleton animation para indicar loading.
      </div>
    </div>
  `,
};
