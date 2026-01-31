/**
 * @component Getting Started
 * @description Página inicial do Design System Educacross
 * @category Getting Started
 * @status DONE
 */

export default {
  title: '📚 Getting Started',
  parameters: {
    previewTabs: {
      canvas: { hidden: true },
    },
    viewMode: 'docs',
    layout: 'fullscreen',
  },
};

// ============================================================================
// INTRODUCTION - Página principal do Design System
// ============================================================================
export const Introduction = {
  render: () => `
    <div class="bg-body">
      <!-- Hero Section -->
      <div class="bg-primary bg-gradient py-5">
        <div class="container">
          <div class="row align-items-center">
            <div class="col-lg-7">
              <div class="d-flex align-items-center mb-3">
                <span class="badge bg-white text-primary me-2">v1.0</span>
                <span class="text-white-50">Design System</span>
              </div>
              <h1 class="display-4 fw-bold text-white mb-3">
                <i class="ti tabler-palette me-2"></i>
                Vuexy Design System
              </h1>
              <p class="lead text-white-50 mb-4">
                Sistema de design baseado no tema Vuexy utilizando <strong class="text-white">Atomic Design</strong> 
                para organização escalável de componentes.
              </p>
              <div class="d-flex gap-3 flex-wrap">
                <a href="#components" class="btn btn-light btn-lg">
                  <i class="ti tabler-layout-grid me-2"></i>
                  Ver Componentes
                </a>
                <a href="#atomic" class="btn btn-outline-light btn-lg">
                  <i class="ti tabler-book me-2"></i>
                  Atomic Design
                </a>
              </div>
            </div>
            <div class="col-lg-5 text-center mt-4 mt-lg-0">
              <div class="position-relative">
                <div class="bg-white rounded-4 p-4 shadow-lg" style="transform: rotate(-3deg);">
                  <div class="d-flex gap-2 mb-3">
                    <span class="badge bg-primary">Primary</span>
                    <span class="badge bg-success">Success</span>
                    <span class="badge bg-warning">Warning</span>
                    <span class="badge bg-danger">Danger</span>
                  </div>
                  <div class="d-flex gap-2 mb-3">
                    <button class="btn btn-primary btn-sm">Button</button>
                    <button class="btn btn-outline-secondary btn-sm">Outline</button>
                  </div>
                  <div class="input-group input-group-sm">
                    <span class="input-group-text"><i class="ti tabler-search"></i></span>
                    <input type="text" class="form-control" placeholder="Search...">
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Stats Section -->
      <div class="container py-5">
        <div class="row g-4 text-center">
          <div class="col-6 col-md-3">
            <div class="card border-0 shadow-sm h-100">
              <div class="card-body">
                <div class="avatar avatar-lg bg-label-primary mb-3 mx-auto">
                  <span class="avatar-initial rounded-circle">
                    <i class="ti tabler-components fs-3"></i>
                  </span>
                </div>
                <h2 class="fw-bold text-primary mb-1">70+</h2>
                <p class="text-muted mb-0">Componentes</p>
              </div>
            </div>
          </div>
          <div class="col-6 col-md-3">
            <div class="card border-0 shadow-sm h-100">
              <div class="card-body">
                <div class="avatar avatar-lg bg-label-success mb-3 mx-auto">
                  <span class="avatar-initial rounded-circle">
                    <i class="ti tabler-icons fs-3"></i>
                  </span>
                </div>
                <h2 class="fw-bold text-success mb-1">8000+</h2>
                <p class="text-muted mb-0">Ícones</p>
              </div>
            </div>
          </div>
          <div class="col-6 col-md-3">
            <div class="card border-0 shadow-sm h-100">
              <div class="card-body">
                <div class="avatar avatar-lg bg-label-info mb-3 mx-auto">
                  <span class="avatar-initial rounded-circle">
                    <i class="ti tabler-code fs-3"></i>
                  </span>
                </div>
                <h2 class="fw-bold text-info mb-1">4</h2>
                <p class="text-muted mb-0">Stacks</p>
              </div>
            </div>
          </div>
          <div class="col-6 col-md-3">
            <div class="card border-0 shadow-sm h-100">
              <div class="card-body">
                <div class="avatar avatar-lg bg-label-warning mb-3 mx-auto">
                  <span class="avatar-initial rounded-circle">
                    <i class="ti tabler-template fs-3"></i>
                  </span>
                </div>
                <h2 class="fw-bold text-warning mb-1">8</h2>
                <p class="text-muted mb-0">Templates</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Objetivo Section -->
      <div class="container pb-5">
        <div class="card border-0 shadow-sm bg-label-primary">
          <div class="card-body p-4 p-lg-5">
            <div class="row align-items-center">
              <div class="col-lg-8">
                <h2 class="fw-bold text-primary mb-3">
                  <i class="ti tabler-target me-2"></i>
                  Objetivo
                </h2>
                <p class="text-body mb-0 fs-5">
                  Catalogar e documentar todos os componentes visuais do Vuexy de forma organizada, 
                  mantendo <strong>fidelidade visual completa</strong> e fornecendo código reutilizável 
                  para múltiplos stacks: <span class="badge bg-primary me-1">HTML</span>
                  <span class="badge bg-info me-1">React</span>
                  <span class="badge bg-success me-1">Vue 2</span>
                  <span class="badge bg-secondary">Vue 3</span>
                </p>
              </div>
              <div class="col-lg-4 text-center mt-4 mt-lg-0">
                <i class="ti tabler-rocket text-primary" style="font-size: 6rem; opacity: 0.5;"></i>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Atomic Design Section -->
      <div class="bg-light py-5" id="atomic">
        <div class="container">
          <div class="text-center mb-5">
            <span class="badge bg-primary mb-2">Metodologia</span>
            <h2 class="display-6 fw-bold">
              <i class="ti tabler-atom me-2"></i>
              O que é Atomic Design?
            </h2>
            <p class="text-muted mx-auto" style="max-width: 600px;">
              Metodologia criada por Brad Frost que organiza componentes em 5 níveis de complexidade
            </p>
          </div>

          <div class="row g-4">
            <!-- Atoms -->
            <div class="col-md-6 col-lg-4">
              <div class="card h-100 border-0 shadow-sm border-start border-4 border-primary">
                <div class="card-body">
                  <div class="d-flex align-items-center mb-3">
                    <div class="avatar bg-label-primary me-3">
                      <span class="avatar-initial rounded"><i class="ti tabler-atom-2"></i></span>
                    </div>
                    <h5 class="fw-bold text-primary mb-0">Atoms</h5>
                  </div>
                  <p class="text-muted mb-3">
                    Elementos indivisíveis da interface (botões, inputs, labels, ícones).
                  </p>
                  <div class="d-flex flex-wrap gap-1">
                    <span class="badge bg-light text-body">Button</span>
                    <span class="badge bg-light text-body">Input</span>
                    <span class="badge bg-light text-body">Badge</span>
                    <span class="badge bg-light text-body">Avatar</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Molecules -->
            <div class="col-md-6 col-lg-4">
              <div class="card h-100 border-0 shadow-sm border-start border-4 border-info">
                <div class="card-body">
                  <div class="d-flex align-items-center mb-3">
                    <div class="avatar bg-label-info me-3">
                      <span class="avatar-initial rounded"><i class="ti tabler-hierarchy-2"></i></span>
                    </div>
                    <h5 class="fw-bold text-info mb-0">Molecules</h5>
                  </div>
                  <p class="text-muted mb-3">
                    Combinação de 2+ átomos formando componentes simples.
                  </p>
                  <div class="d-flex flex-wrap gap-1">
                    <span class="badge bg-light text-body">SearchField</span>
                    <span class="badge bg-light text-body">FormGroup</span>
                    <span class="badge bg-light text-body">MenuItem</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Organisms -->
            <div class="col-md-6 col-lg-4">
              <div class="card h-100 border-0 shadow-sm border-start border-4 border-success">
                <div class="card-body">
                  <div class="d-flex align-items-center mb-3">
                    <div class="avatar bg-label-success me-3">
                      <span class="avatar-initial rounded"><i class="ti tabler-box-multiple"></i></span>
                    </div>
                    <h5 class="fw-bold text-success mb-0">Organisms</h5>
                  </div>
                  <p class="text-muted mb-3">
                    Seções complexas com funcionalidade definida.
                  </p>
                  <div class="d-flex flex-wrap gap-1">
                    <span class="badge bg-light text-body">DataTable</span>
                    <span class="badge bg-light text-body">Navbar</span>
                    <span class="badge bg-light text-body">Modal</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Templates -->
            <div class="col-md-6 col-lg-6">
              <div class="card h-100 border-0 shadow-sm border-start border-4 border-warning">
                <div class="card-body">
                  <div class="d-flex align-items-center mb-3">
                    <div class="avatar bg-label-warning me-3">
                      <span class="avatar-initial rounded"><i class="ti tabler-layout"></i></span>
                    </div>
                    <h5 class="fw-bold text-warning mb-0">Templates</h5>
                  </div>
                  <p class="text-muted mb-3">
                    Estruturas de página com placeholders (layout de dashboard, layout de auth).
                  </p>
                  <div class="d-flex flex-wrap gap-1">
                    <span class="badge bg-light text-body">DashboardLayout</span>
                    <span class="badge bg-light text-body">AuthLayout</span>
                    <span class="badge bg-light text-body">LandingPage</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Pages -->
            <div class="col-md-6 col-lg-6">
              <div class="card h-100 border-0 shadow-sm border-start border-4 border-danger">
                <div class="card-body">
                  <div class="d-flex align-items-center mb-3">
                    <div class="avatar bg-label-danger me-3">
                      <span class="avatar-initial rounded"><i class="ti tabler-file"></i></span>
                    </div>
                    <h5 class="fw-bold text-danger mb-0">Pages</h5>
                  </div>
                  <p class="text-muted mb-3">
                    Instâncias de templates com conteúdo real (página de login, página de dashboard).
                  </p>
                  <div class="d-flex flex-wrap gap-1">
                    <span class="badge bg-light text-body">LoginPage</span>
                    <span class="badge bg-light text-body">DashboardPage</span>
                    <span class="badge bg-light text-body">ProfilePage</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Features Section -->
      <div class="container py-5" id="components">
        <div class="text-center mb-5">
          <span class="badge bg-success mb-2">Recursos</span>
          <h2 class="display-6 fw-bold">
            <i class="ti tabler-sparkles me-2"></i>
            Principais Recursos
          </h2>
        </div>

        <div class="row g-4">
          <div class="col-md-6">
            <div class="d-flex">
              <div class="flex-shrink-0">
                <div class="avatar bg-primary">
                  <span class="avatar-initial rounded"><i class="ti tabler-icons"></i></span>
                </div>
              </div>
              <div class="ms-3">
                <h5 class="fw-bold">4 Bibliotecas de Ícones</h5>
                <p class="text-muted mb-0">
                  Bootstrap Icons, Font Awesome, Tabler Icons e Flag Icons totalizando 8000+ ícones prontos para uso.
                </p>
              </div>
            </div>
          </div>

          <div class="col-md-6">
            <div class="d-flex">
              <div class="flex-shrink-0">
                <div class="avatar bg-success">
                  <span class="avatar-initial rounded"><i class="ti tabler-photo"></i></span>
                </div>
              </div>
              <div class="ms-3">
                <h5 class="fw-bold">Placeholders SVG Inline</h5>
                <p class="text-muted mb-0">
                  Sistema de placeholders SVG inline eliminando dependências externas de imagens.
                </p>
              </div>
            </div>
          </div>

          <div class="col-md-6">
            <div class="d-flex">
              <div class="flex-shrink-0">
                <div class="avatar bg-info">
                  <span class="avatar-initial rounded"><i class="ti tabler-atom"></i></span>
                </div>
              </div>
              <div class="ms-3">
                <h5 class="fw-bold">Atomic Design</h5>
                <p class="text-muted mb-0">
                  Organização em Atoms → Molecules → Organisms → Templates para escalabilidade.
                </p>
              </div>
            </div>
          </div>

          <div class="col-md-6">
            <div class="d-flex">
              <div class="flex-shrink-0">
                <div class="avatar bg-warning">
                  <span class="avatar-initial rounded"><i class="ti tabler-accessible"></i></span>
                </div>
              </div>
              <div class="ms-3">
                <h5 class="fw-bold">Acessibilidade WCAG 2.1</h5>
                <p class="text-muted mb-0">
                  Todos os componentes seguem as diretrizes de acessibilidade para uma experiência inclusiva.
                </p>
              </div>
            </div>
          </div>

          <div class="col-md-6">
            <div class="d-flex">
              <div class="flex-shrink-0">
                <div class="avatar bg-danger">
                  <span class="avatar-initial rounded"><i class="ti tabler-device-mobile"></i></span>
                </div>
              </div>
              <div class="ms-3">
                <h5 class="fw-bold">100% Responsivo</h5>
                <p class="text-muted mb-0">
                  Todos os componentes são responsivos e funcionam perfeitamente em qualquer dispositivo.
                </p>
              </div>
            </div>
          </div>

          <div class="col-md-6">
            <div class="d-flex">
              <div class="flex-shrink-0">
                <div class="avatar bg-secondary">
                  <span class="avatar-initial rounded"><i class="ti tabler-brand-bootstrap"></i></span>
                </div>
              </div>
              <div class="ms-3">
                <h5 class="fw-bold">Bootstrap 5.3 + jQuery</h5>
                <p class="text-muted mb-0">
                  Baseado no Bootstrap 5.3 com jQuery 3.7 para máxima compatibilidade.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- How to Use Section -->
      <div class="bg-light py-5">
        <div class="container">
          <div class="text-center mb-5">
            <span class="badge bg-info mb-2">Tutorial</span>
            <h2 class="display-6 fw-bold">
              <i class="ti tabler-rocket me-2"></i>
              Como Começar
            </h2>
          </div>

          <div class="row justify-content-center">
            <div class="col-lg-10">
              <div class="row g-4">
                <!-- Step 1 -->
                <div class="col-md-6">
                  <div class="card h-100 border-0 shadow-sm">
                    <div class="card-body">
                      <div class="d-flex align-items-center mb-3">
                        <span class="badge bg-primary rounded-circle me-3 p-2" style="width: 32px; height: 32px;">1</span>
                        <h5 class="fw-bold mb-0">Navegue pelo Menu</h5>
                      </div>
                      <p class="text-muted mb-0">
                        Use o menu lateral para explorar as categorias: Foundations, Atoms, Molecules, Organisms e Templates.
                      </p>
                    </div>
                  </div>
                </div>

                <!-- Step 2 -->
                <div class="col-md-6">
                  <div class="card h-100 border-0 shadow-sm">
                    <div class="card-body">
                      <div class="d-flex align-items-center mb-3">
                        <span class="badge bg-primary rounded-circle me-3 p-2" style="width: 32px; height: 32px;">2</span>
                        <h5 class="fw-bold mb-0">Visualize o Componente</h5>
                      </div>
                      <p class="text-muted mb-0">
                        Use a aba <strong>Canvas</strong> para ver o componente renderizado em tempo real.
                      </p>
                    </div>
                  </div>
                </div>

                <!-- Step 3 -->
                <div class="col-md-6">
                  <div class="card h-100 border-0 shadow-sm">
                    <div class="card-body">
                      <div class="d-flex align-items-center mb-3">
                        <span class="badge bg-primary rounded-circle me-3 p-2" style="width: 32px; height: 32px;">3</span>
                        <h5 class="fw-bold mb-0">Teste os Controls</h5>
                      </div>
                      <p class="text-muted mb-0">
                        Use a aba <strong>Controls</strong> para ajustar propriedades e ver mudanças ao vivo.
                      </p>
                    </div>
                  </div>
                </div>

                <!-- Step 4 -->
                <div class="col-md-6">
                  <div class="card h-100 border-0 shadow-sm">
                    <div class="card-body">
                      <div class="d-flex align-items-center mb-3">
                        <span class="badge bg-primary rounded-circle me-3 p-2" style="width: 32px; height: 32px;">4</span>
                        <h5 class="fw-bold mb-0">Copie o Código</h5>
                      </div>
                      <p class="text-muted mb-0">
                        Clique em <strong>Show code</strong> para copiar o HTML e integrar no seu projeto.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Call to Action -->
      <div class="container py-5">
        <div class="card border-0 bg-primary bg-gradient text-white">
          <div class="card-body p-5 text-center">
            <h2 class="display-6 fw-bold mb-3">
              <i class="ti tabler-sparkles me-2"></i>
              Pronto para explorar?
            </h2>
            <p class="lead mb-4 opacity-75">
              Comece navegando pelos componentes no menu lateral
            </p>
            <div class="d-flex gap-3 justify-content-center flex-wrap">
              <button class="btn btn-light btn-lg" onclick="document.querySelector('[data-item-id*=atoms]')?.click()">
                <i class="ti tabler-atom-2 me-2"></i>
                Ver Atoms
              </button>
              <button class="btn btn-outline-light btn-lg" onclick="document.querySelector('[data-item-id*=foundations]')?.click()">
                <i class="ti tabler-palette me-2"></i>
                Foundations
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Footer -->
      <div class="border-top py-4">
        <div class="container">
          <div class="row align-items-center">
            <div class="col-md-6 text-center text-md-start">
              <p class="text-muted mb-0">
                Desenvolvido com <span class="text-danger">❤️</span> pela equipe <strong>Educacross</strong>
              </p>
            </div>
            <div class="col-md-6 text-center text-md-end mt-3 mt-md-0">
              <a href="https://educacross.com" class="btn btn-sm btn-outline-primary" target="_blank">
                <i class="ti tabler-external-link me-1"></i>
                educacross.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
};

// ============================================================================
// INTERACTIVE WIZARD - Tutorial interativo
// ============================================================================
export const InteractiveWizard = {
  render: () => `
    <div class="container py-5" style="max-width: 800px;">
      <div class="card border-0 shadow">
        <div class="card-header bg-primary text-white py-4">
          <h4 class="mb-1">
            <i class="ti tabler-wand me-2"></i>
            Getting Started - Tutorial Interativo
          </h4>
          <p class="mb-0 opacity-75">Aprenda o básico em 4 passos simples</p>
        </div>
        
        <div class="card-body p-4">
          <!-- Progress -->
          <div class="mb-4">
            <div class="d-flex justify-content-between mb-2">
              <span class="text-muted small">Passo <span id="current-step" class="fw-bold">1</span> de 4</span>
              <span class="text-muted small"><span id="progress-percent" class="fw-bold">0</span>%</span>
            </div>
            <div class="progress" style="height: 8px;">
              <div id="progress-bar" class="progress-bar bg-primary progress-bar-striped progress-bar-animated" style="width: 0%"></div>
            </div>
          </div>

          <!-- Step 1: Welcome -->
          <div id="step-1" class="wizard-step">
            <div class="text-center py-4">
              <div class="avatar avatar-xl bg-label-primary mb-4 mx-auto" style="width: 80px; height: 80px;">
                <span class="avatar-initial rounded-circle" style="font-size: 2.5rem;">
                  <i class="ti tabler-hand-wave"></i>
                </span>
              </div>
              <h3 class="mb-3">Bem-vindo ao Vuexy Design System!</h3>
              <p class="text-muted mb-4">
                Este wizard vai te guiar pelos conceitos principais do Design System.
              </p>
              <div class="alert alert-primary d-flex align-items-center">
                <i class="ti tabler-bulb me-2 fs-4"></i>
                <div>
                  <strong>Dica:</strong> Este sistema usa a metodologia Atomic Design
                </div>
              </div>
            </div>
          </div>

          <!-- Step 2: Atomic Design -->
          <div id="step-2" class="wizard-step" style="display: none;">
            <h4 class="mb-4">
              <i class="ti tabler-atom me-2 text-primary"></i>
              Entendendo Atomic Design
            </h4>
            <div class="row g-3">
              <div class="col-6">
                <div class="card bg-label-primary h-100">
                  <div class="card-body text-center p-3">
                    <i class="ti tabler-atom-2 fs-2 text-primary"></i>
                    <h6 class="mb-1 mt-2">Atoms</h6>
                    <small class="text-muted">Botões, inputs</small>
                  </div>
                </div>
              </div>
              <div class="col-6">
                <div class="card bg-label-info h-100">
                  <div class="card-body text-center p-3">
                    <i class="ti tabler-hierarchy-2 fs-2 text-info"></i>
                    <h6 class="mb-1 mt-2">Molecules</h6>
                    <small class="text-muted">Combinações simples</small>
                  </div>
                </div>
              </div>
              <div class="col-6">
                <div class="card bg-label-success h-100">
                  <div class="card-body text-center p-3">
                    <i class="ti tabler-box-multiple fs-2 text-success"></i>
                    <h6 class="mb-1 mt-2">Organisms</h6>
                    <small class="text-muted">Seções complexas</small>
                  </div>
                </div>
              </div>
              <div class="col-6">
                <div class="card bg-label-warning h-100">
                  <div class="card-body text-center p-3">
                    <i class="ti tabler-layout fs-2 text-warning"></i>
                    <h6 class="mb-1 mt-2">Templates</h6>
                    <small class="text-muted">Layouts de página</small>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Step 3: Components -->
          <div id="step-3" class="wizard-step" style="display: none;">
            <h4 class="mb-4">
              <i class="ti tabler-layout-grid me-2 text-primary"></i>
              Explorando Componentes
            </h4>
            <p class="text-muted mb-3">Navegue pelo menu lateral para encontrar:</p>
            <ul class="list-group list-group-flush">
              <li class="list-group-item d-flex align-items-center">
                <span class="badge bg-label-primary me-3"><i class="ti tabler-palette"></i></span>
                <span><strong>Foundations</strong> - Cores, Tipografia, Ícones</span>
              </li>
              <li class="list-group-item d-flex align-items-center">
                <span class="badge bg-label-success me-3"><i class="ti tabler-atom-2"></i></span>
                <span><strong>Atoms</strong> - 17 componentes básicos</span>
              </li>
              <li class="list-group-item d-flex align-items-center">
                <span class="badge bg-label-info me-3"><i class="ti tabler-hierarchy-2"></i></span>
                <span><strong>Molecules</strong> - 18 combinações</span>
              </li>
              <li class="list-group-item d-flex align-items-center">
                <span class="badge bg-label-warning me-3"><i class="ti tabler-box-multiple"></i></span>
                <span><strong>Organisms</strong> - 22 seções complexas</span>
              </li>
              <li class="list-group-item d-flex align-items-center">
                <span class="badge bg-label-danger me-3"><i class="ti tabler-layout"></i></span>
                <span><strong>Templates</strong> - 8 layouts</span>
              </li>
            </ul>
          </div>

          <!-- Step 4: Done -->
          <div id="step-4" class="wizard-step" style="display: none;">
            <div class="text-center py-4">
              <div class="avatar avatar-xl bg-label-success mb-4 mx-auto" style="width: 100px; height: 100px;">
                <span class="avatar-initial rounded-circle" style="font-size: 3rem;">
                  <i class="ti tabler-check"></i>
                </span>
              </div>
              <h3 class="text-success mb-3">Tutorial Completo!</h3>
              <p class="text-muted mb-4">
                Você está pronto para explorar o Design System. Boa codificação!
              </p>
              <div class="d-flex gap-2 justify-content-center flex-wrap">
                <button class="btn btn-primary" onclick="document.querySelector('[data-item-id*=atoms]')?.click()">
                  <i class="ti tabler-rocket me-2"></i>
                  Começar a Explorar
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Navigation -->
        <div class="card-footer d-flex justify-content-between py-3">
          <button id="btn-prev" class="btn btn-outline-secondary" disabled onclick="
            const current = parseInt(document.getElementById('current-step').textContent);
            if (current > 1) {
              document.getElementById('step-' + current).style.display = 'none';
              document.getElementById('step-' + (current - 1)).style.display = 'block';
              document.getElementById('current-step').textContent = current - 1;
              const progress = ((current - 2) / 3) * 100;
              document.getElementById('progress-bar').style.width = progress + '%';
              document.getElementById('progress-percent').textContent = Math.round(progress);
              document.getElementById('btn-next').innerHTML = '<i class=\\'ti tabler-arrow-right me-1\\'></i> Próximo';
              document.getElementById('btn-next').className = 'btn btn-primary';
              if (current - 1 === 1) {
                document.getElementById('btn-prev').disabled = true;
              }
            }
          ">
            <i class="ti tabler-arrow-left me-1"></i> Anterior
          </button>
          <button id="btn-next" class="btn btn-primary" onclick="
            const current = parseInt(document.getElementById('current-step').textContent);
            if (current < 4) {
              document.getElementById('step-' + current).style.display = 'none';
              document.getElementById('step-' + (current + 1)).style.display = 'block';
              document.getElementById('current-step').textContent = current + 1;
              const progress = (current / 3) * 100;
              document.getElementById('progress-bar').style.width = progress + '%';
              document.getElementById('progress-percent').textContent = Math.round(progress);
              document.getElementById('btn-prev').disabled = false;
              if (current + 1 === 4) {
                this.innerHTML = '<i class=\\'ti tabler-check me-1\\'></i> Concluir';
                this.className = 'btn btn-success';
              }
            }
          ">
            <i class="ti tabler-arrow-right me-1"></i> Próximo
          </button>
        </div>
      </div>
    </div>
  `,
};
