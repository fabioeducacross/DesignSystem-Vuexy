const i={title:"📚 Getting Started",parameters:{previewTabs:{canvas:{hidden:!0}},viewMode:"docs",layout:"fullscreen"}},e={render:()=>`
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
    
    <style>
      .intro-page {
        font-family: 'Public Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        background: #f8f9fa;
        min-height: 100vh;
      }
      
      .hero-section {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        position: relative;
        overflow: hidden;
        padding: 80px 0;
      }
      
      .hero-pattern {
        position: absolute;
        inset: 0;
        opacity: 0.08;
        background-image: 
          radial-gradient(circle at 20% 50%, rgba(255,255,255,0.15) 0%, transparent 50%),
          radial-gradient(circle at 80% 80%, rgba(255,255,255,0.15) 0%, transparent 50%),
          repeating-linear-gradient(
            45deg,
            transparent,
            transparent 40px,
            rgba(255,255,255,0.03) 40px,
            rgba(255,255,255,0.03) 80px
          );
      }
      
      .hero-content {
        position: relative;
        z-index: 2;
      }
      
      .badge-custom {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        padding: 8px 16px;
        background: rgba(255,255,255,0.15);
        backdrop-filter: blur(10px);
        border-radius: 50px;
        color: white;
        font-size: 0.875rem;
        font-weight: 500;
        letter-spacing: 0.5px;
        border: 1px solid rgba(255,255,255,0.2);
      }
      
      .badge-icon {
        font-size: 20px;
      }
      
      .hero-title {
        font-size: clamp(2.5rem, 5vw, 3.5rem);
        font-weight: 700;
        color: white;
        line-height: 1.2;
        margin: 24px 0;
        text-shadow: 0 2px 20px rgba(0,0,0,0.1);
      }
      
      .hero-subtitle {
        font-size: 1.25rem;
        color: rgba(255,255,255,0.9);
        line-height: 1.6;
        max-width: 600px;
        margin: 0 auto 32px;
      }
      
      .btn-hero {
        display: inline-flex;
        align-items: center;
        gap: 10px;
        padding: 14px 32px;
        font-size: 1rem;
        font-weight: 600;
        border-radius: 12px;
        text-decoration: none;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        border: none;
        line-height: 1.5;
      }
      
      .btn-primary-hero {
        background: white;
        color: #667eea;
        box-shadow: 0 4px 20px rgba(0,0,0,0.15);
      }
      
      .btn-primary-hero:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 30px rgba(0,0,0,0.2);
        color: #667eea;
      }
      
      .btn-secondary-hero {
        background: rgba(255,255,255,0.15);
        color: white;
        border: 1px solid rgba(255,255,255,0.3);
        backdrop-filter: blur(10px);
      }
      
      .btn-secondary-hero:hover {
        background: rgba(255,255,255,0.25);
        color: white;
      }
      
      .btn-icon {
        font-size: 20px;
        display: inline-flex;
        align-items: center;
        line-height: 1;
      }
      
      .stats-card {
        background: white;
        border-radius: 20px;
        padding: 40px;
        margin-top: -50px;
        position: relative;
        z-index: 10;
        box-shadow: 0 10px 40px rgba(0,0,0,0.08);
      }
      
      .stat-item {
        text-align: center;
        padding: 16px;
      }
      
      .stat-value {
        font-size: 2.5rem;
        font-weight: 700;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        line-height: 1;
        margin-bottom: 8px;
      }
      
      .stat-label {
        color: #6c757d;
        font-size: 0.9rem;
        font-weight: 500;
      }
      
      .section-header {
        text-align: center;
        margin-bottom: 48px;
      }
      
      .section-badge {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        padding: 6px 16px;
        background: linear-gradient(135deg, #667eea15 0%, #764ba215 100%);
        color: #667eea;
        border-radius: 50px;
        font-size: 0.875rem;
        font-weight: 600;
        margin-bottom: 16px;
      }
      
      .section-badge .material-symbols-outlined {
        font-size: 18px;
      }
      
      .section-title {
        font-size: clamp(1.75rem, 4vw, 2.5rem);
        font-weight: 700;
        color: #2d3748;
        margin-bottom: 12px;
      }
      
      .section-subtitle {
        font-size: 1.125rem;
        color: #6c757d;
        max-width: 600px;
        margin: 0 auto;
      }
      
      .feature-card {
        background: white;
        border-radius: 16px;
        padding: 32px;
        height: 100%;
        transition: all 0.3s ease;
        border: 1px solid #e9ecef;
      }
      
      .feature-card:hover {
        transform: translateY(-4px);
        box-shadow: 0 12px 40px rgba(0,0,0,0.1);
        border-color: #667eea;
      }
      
      .feature-icon {
        width: 64px;
        height: 64px;
        border-radius: 16px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 20px;
      }
      
      .feature-icon .material-symbols-outlined {
        font-size: 36px;
      }
      
      .feature-title {
        font-size: 1.25rem;
        font-weight: 700;
        color: #2d3748;
        margin-bottom: 12px;
      }
      
      .feature-description {
        color: #6c757d;
        line-height: 1.6;
        margin-bottom: 16px;
      }
      
      .feature-list {
        list-style: none;
        padding: 0;
        margin: 0;
      }
      
      .feature-list li {
        padding: 6px 0;
        color: #6c757d;
        font-size: 0.9rem;
        display: flex;
        align-items: center;
        gap: 8px;
      }
      
      .feature-list li .material-symbols-outlined {
        color: #28c76f;
        font-size: 18px;
        flex-shrink: 0;
      }
      
      .atomic-card {
        background: white;
        border-radius: 16px;
        overflow: hidden;
        transition: all 0.3s ease;
        border: 2px solid transparent;
      }
      
      .atomic-card:hover {
        transform: translateY(-4px);
        box-shadow: 0 12px 40px rgba(0,0,0,0.1);
      }
      
      .atomic-header {
        padding: 32px 24px;
        text-align: center;
        position: relative;
      }
      
      .atomic-icon {
        font-size: 48px;
        margin-bottom: 12px;
      }
      
      .atomic-body {
        padding: 24px;
        border-top: 1px solid #e9ecef;
      }
      
      .atomic-title {
        font-size: 1.125rem;
        font-weight: 700;
        color: #2d3748;
        margin-bottom: 8px;
      }
      
      .atomic-description {
        color: #6c757d;
        font-size: 0.9rem;
        margin-bottom: 16px;
      }
      
      .atomic-examples {
        font-size: 0.8rem;
        color: #868e96;
      }
      
      .cta-section {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        padding: 80px 0;
        position: relative;
        overflow: hidden;
      }
      
      .cta-pattern {
        position: absolute;
        inset: 0;
        opacity: 0.05;
        background: repeating-linear-gradient(
          45deg,
          transparent,
          transparent 60px,
          rgba(255,255,255,0.1) 60px,
          rgba(255,255,255,0.1) 120px
        );
      }
      
      .tech-badge {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        padding: 10px 20px;
        background: white;
        border-radius: 50px;
        font-size: 0.875rem;
        font-weight: 600;
        color: #2d3748;
        margin: 4px;
        box-shadow: 0 2px 8px rgba(0,0,0,0.08);
      }
      
      .tech-badge .material-symbols-outlined {
        font-size: 18px;
      }
    </style>

    <div class="intro-page">
      <!-- Hero Section -->
      <section class="hero-section">
        <div class="hero-pattern"></div>
        <div class="container hero-content">
          <div class="row justify-content-center">
            <div class="col-lg-10 text-center">
              <div class="badge-custom">
                <span class="material-symbols-outlined badge-icon">palette</span>
                <span>Educacross Design System v10.9.0</span>
              </div>
              
              <h1 class="hero-title">
                Design System<br/>
                Educacross Platform
              </h1>
              
              <p class="hero-subtitle">
                Biblioteca completa de componentes UI baseada no template Vuexy, 
                organizada com princípios de Atomic Design e documentada para Vue 2.7
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- Stats Section -->
      <div class="container">
        <div class="stats-card">
          <div class="row g-0">
            <div class="col-6 col-md-3">
              <div class="stat-item">
                <div class="stat-value">220+</div>
                <div class="stat-label">Componentes</div>
              </div>
            </div>
            <div class="col-6 col-md-3">
              <div class="stat-item">
                <div class="stat-value">111</div>
                <div class="stat-label">Educacross Real</div>
              </div>
            </div>
            <div class="col-6 col-md-3">
              <div class="stat-item">
                <div class="stat-value">8000+</div>
                <div class="stat-label">Ícones</div>
              </div>
            </div>
            <div class="col-6 col-md-3">
              <div class="stat-item">
                <div class="stat-value">100%</div>
                <div class="stat-label">Responsive</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Dual Structure Section -->
      <section style="padding: 80px 0;">
        <div class="container">
          <div class="section-header">
            <div class="section-badge">
              <span class="material-symbols-outlined">auto_awesome</span>
              <span>Estrutura Dual</span>
            </div>
            <h2 class="section-title">Dois Universos de Componentes</h2>
            <p class="section-subtitle">
              Design system híbrido com componentes genéricos Vuexy e componentes reais do Educacross Platform
            </p>
          </div>

          <div class="row g-4">
            <div class="col-md-6">
              <div class="feature-card">
                <div class="feature-icon" style="background: linear-gradient(135deg, #667eea15 0%, #764ba215 100%); color: #667eea;">
                  <span class="material-symbols-outlined">dashboard_customize</span>
                </div>
                <h3 class="feature-title">Vuexy Generic Components</h3>
                <p class="feature-description">
                  Componentes do template Vuexy organizados por Atomic Design (Atoms → Molecules → Organisms → Templates)
                </p>
                <ul class="feature-list">
                  <li>
                    <span class="material-symbols-outlined">check_circle</span>
                    <span>Buttons, Cards, Forms, Tables</span>
                  </li>
                  <li>
                    <span class="material-symbols-outlined">check_circle</span>
                    <span>Modals, Dropdowns, Tooltips</span>
                  </li>
                  <li>
                    <span class="material-symbols-outlined">check_circle</span>
                    <span>Charts, Invoices, E-commerce</span>
                  </li>
                  <li>
                    <span class="material-symbols-outlined">check_circle</span>
                    <span>220+ componentes base do template</span>
                  </li>
                  <li>
                    <span class="material-symbols-outlined">check_circle</span>
                    <span>Documentação de referência</span>
                  </li>
                </ul>
              </div>
            </div>

            <div class="col-md-6">
              <div class="feature-card">
                <div class="feature-icon" style="background: linear-gradient(135deg, #28c76f15 0%, #48da8915 100%); color: #28c76f;">
                  <span class="material-symbols-outlined">verified</span>
                </div>
                <h3 class="feature-title">Educacross Real Components</h3>
                <p class="feature-description">
                  111 componentes reais extraídos do educacross-frontoffice e documentados no Storybook
                </p>
                <ul class="feature-list">
                  <li>
                    <span class="material-symbols-outlined">check_circle</span>
                    <span>AppNavbar, Sidebar, ManageAccountPage</span>
                  </li>
                  <li>
                    <span class="material-symbols-outlined">check_circle</span>
                    <span>EditProfileStudentNew, UserCard</span>
                  </li>
                  <li>
                    <span class="material-symbols-outlined">check_circle</span>
                    <span>AcceptOrRejectAccess Modal</span>
                  </li>
                  <li>
                    <span class="material-symbols-outlined">check_circle</span>
                    <span>Componentes em produção</span>
                  </li>
                  <li>
                    <span class="material-symbols-outlined">check_circle</span>
                    <span>Código Vue 2.7 real</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Atomic Design Section -->
      <section style="padding: 80px 0; background: white;">
        <div class="container">
          <div class="section-header">
            <div class="section-badge">
              <span class="material-symbols-outlined">account_tree</span>
              <span>Atomic Design</span>
            </div>
            <h2 class="section-title">Princípios de Organização</h2>
            <p class="section-subtitle">
              Componentes organizados de forma hierárquica do mais simples ao mais complexo
            </p>
          </div>

          <div class="row g-4">
            <div class="col-md-3">
              <div class="atomic-card">
                <div class="atomic-header" style="background: linear-gradient(135deg, #ea545515 0%, #f0818215 100%);">
                  <div class="atomic-icon">
                    <span class="material-symbols-outlined" style="font-size: 48px; color: #ea5455;">scatter_plot</span>
                  </div>
                </div>
                <div class="atomic-body">
                  <h4 class="atomic-title">Atoms</h4>
                  <p class="atomic-description">Elementos mais básicos e indivisíveis</p>
                  <div class="atomic-examples">
                    <strong>Exemplos:</strong> Buttons, Inputs, Labels, Badges, Icons
                  </div>
                </div>
              </div>
            </div>

            <div class="col-md-3">
              <div class="atomic-card">
                <div class="atomic-header" style="background: linear-gradient(135deg, #7367f015 0%, #9e95f515 100%);">
                  <div class="atomic-icon">
                    <span class="material-symbols-outlined" style="font-size: 48px; color: #7367f0;">category</span>
                  </div>
                </div>
                <div class="atomic-body">
                  <h4 class="atomic-title">Molecules</h4>
                  <p class="atomic-description">Grupos de átomos funcionando juntos</p>
                  <div class="atomic-examples">
                    <strong>Exemplos:</strong> Form Groups, Search Bars, Cards, Alerts
                  </div>
                </div>
              </div>
            </div>

            <div class="col-md-3">
              <div class="atomic-card">
                <div class="atomic-header" style="background: linear-gradient(135deg, #00cfe815 0%, #4dd4e815 100%);">
                  <div class="atomic-icon">
                    <span class="material-symbols-outlined" style="font-size: 48px; color: #00cfe8;">view_module</span>
                  </div>
                </div>
                <div class="atomic-body">
                  <h4 class="atomic-title">Organisms</h4>
                  <p class="atomic-description">Seções complexas de interface</p>
                  <div class="atomic-examples">
                    <strong>Exemplos:</strong> Headers, Navigation, Data Tables, Forms
                  </div>
                </div>
              </div>
            </div>

            <div class="col-md-3">
              <div class="atomic-card">
                <div class="atomic-header" style="background: linear-gradient(135deg, #28c76f15 0%, #48da8915 100%);">
                  <div class="atomic-icon">
                    <span class="material-symbols-outlined" style="font-size: 48px; color: #28c76f;">web</span>
                  </div>
                </div>
                <div class="atomic-body">
                  <h4 class="atomic-title">Templates</h4>
                  <p class="atomic-description">Layouts de página completos</p>
                  <div class="atomic-examples">
                    <strong>Exemplos:</strong> Dashboard, Profile, Invoice, E-commerce
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Technology Stack -->
      <section style="padding: 80px 0; background: #f8f9fa;">
        <div class="container">
          <div class="section-header">
            <div class="section-badge">
              <span class="material-symbols-outlined">code</span>
              <span>Stack Tecnológico</span>
            </div>
            <h2 class="section-title">Frameworks & Bibliotecas</h2>
            <p class="section-subtitle">
              Componentes compatíveis com múltiplos frameworks e bibliotecas modernas
            </p>
          </div>

          <div class="text-center">
            <div class="tech-badge">
              <span class="material-symbols-outlined" style="color: #42b883;">language</span>
              <span>Vue 2.7</span>
            </div>
            <div class="tech-badge">
              <span class="material-symbols-outlined" style="color: #61dafb;">code</span>
              <span>React</span>
            </div>
            <div class="tech-badge">
              <span class="material-symbols-outlined" style="color: #e34f26;">html</span>
              <span>HTML5</span>
            </div>
            <div class="tech-badge">
              <span class="material-symbols-outlined" style="color: #7952b3;">view_quilt</span>
              <span>Bootstrap 5</span>
            </div>
            <div class="tech-badge">
              <span class="material-symbols-outlined" style="color: #ff6384;">show_chart</span>
              <span>ApexCharts</span>
            </div>
            <div class="tech-badge">
              <span class="material-symbols-outlined" style="color: #667eea;">interests</span>
              <span>Tabler Icons</span>
            </div>
            <div class="tech-badge">
              <span class="material-symbols-outlined" style="color: #4285f4;">psychology</span>
              <span>Material Symbols</span>
            </div>
            <div class="tech-badge">
              <span class="material-symbols-outlined" style="color: #ff6b35;">star</span>
              <span>Font Awesome</span>
            </div>
          </div>
        </div>
      </section>

      <!-- Features Section -->
      <section style="padding: 80px 0; background: white;">
        <div class="container">
          <div class="section-header">
            <div class="section-badge">
              <span class="material-symbols-outlined">workspace_premium</span>
              <span>Recursos</span>
            </div>
            <h2 class="section-title">Tudo que Você Precisa</h2>
            <p class="section-subtitle">
              Funcionalidades modernas para desenvolvimento ágil e escalável
            </p>
          </div>

          <div class="row g-4">
            <div class="col-md-4">
              <div class="feature-card">
                <div class="feature-icon" style="background: linear-gradient(135deg, #667eea15 0%, #764ba215 100%); color: #667eea;">
                  <span class="material-symbols-outlined">menu_book</span>
                </div>
                <h4 class="feature-title">Documentação Completa</h4>
                <p class="feature-description">
                  Cada componente com exemplos de código em HTML, React, Vue 2 e Vue 3
                </p>
              </div>
            </div>

            <div class="col-md-4">
              <div class="feature-card">
                <div class="feature-icon" style="background: linear-gradient(135deg, #28c76f15 0%, #48da8915 100%); color: #28c76f;">
                  <span class="material-symbols-outlined">devices</span>
                </div>
                <h4 class="feature-title">Responsivo</h4>
                <p class="feature-description">
                  Todos os componentes otimizados para mobile, tablet e desktop
                </p>
              </div>
            </div>

            <div class="col-md-4">
              <div class="feature-card">
                <div class="feature-icon" style="background: linear-gradient(135deg, #00cfe815 0%, #4dd4e815 100%); color: #00cfe8;">
                  <span class="material-symbols-outlined">accessibility_new</span>
                </div>
                <h4 class="feature-title">Acessível</h4>
                <p class="feature-description">
                  Componentes seguindo padrões WCAG 2.1 e boas práticas de acessibilidade
                </p>
              </div>
            </div>

            <div class="col-md-4">
              <div class="feature-card">
                <div class="feature-icon" style="background: linear-gradient(135deg, #ff9f4315 0%, #ffcb8b15 100%); color: #ff9f43;">
                  <span class="material-symbols-outlined">tune</span>
                </div>
                <h4 class="feature-title">Customizável</h4>
                <p class="feature-description">
                  Variáveis CSS e props configuráveis para adaptar ao seu design
                </p>
              </div>
            </div>

            <div class="col-md-4">
              <div class="feature-card">
                <div class="feature-icon" style="background: linear-gradient(135deg, #ea545515 0%, #f0818215 100%); color: #ea5455;">
                  <span class="material-symbols-outlined">speed</span>
                </div>
                <h4 class="feature-title">Performance</h4>
                <p class="feature-description">
                  Componentes otimizados com lazy loading e code splitting
                </p>
              </div>
            </div>

            <div class="col-md-4">
              <div class="feature-card">
                <div class="feature-icon" style="background: linear-gradient(135deg, #7367f015 0%, #9e95f515 100%); color: #7367f0;">
                  <span class="material-symbols-outlined">science</span>
                </div>
                <h4 class="feature-title">Testado</h4>
                <p class="feature-description">
                  Testes visuais automatizados com Playwright para garantir qualidade
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- MCP Server Section -->
      <section style="padding: 80px 0; background: #f8f9fa;">
        <div class="container">
          <div class="section-header">
            <div class="section-badge">
              <span class="material-symbols-outlined">smart_toy</span>
              <span>AI-Powered Documentation</span>
            </div>
            <h2 class="section-title">Acesse o Design System via IA</h2>
            <p class="section-subtitle">
              Consulte 233 componentes documentados em qualquer IDE ou plataforma com suporte MCP
            </p>
          </div>

          <!-- Stats Grid -->
          <div class="row g-4 mb-5">
            <div class="col-md-3 col-6">
              <div class="feature-card" style="text-align: center; padding: 32px 24px;">
                <div class="stat-value" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);">233</div>
                <div class="stat-label">Componentes</div>
              </div>
            </div>
            <div class="col-md-3 col-6">
              <div class="feature-card" style="text-align: center; padding: 32px 24px;">
                <div class="stat-value" style="background: linear-gradient(135deg, #28c76f 0%, #48da89 100%);">96.7%</div>
                <div class="stat-label">Parser Success</div>
              </div>
            </div>
            <div class="col-md-3 col-6">
              <div class="feature-card" style="text-align: center; padding: 32px 24px;">
                <div class="stat-value" style="background: linear-gradient(135deg, #00cfe8 0%, #4dd4e8 100%);">11ms</div>
                <div class="stat-label">Init Time</div>
              </div>
            </div>
            <div class="col-md-3 col-6">
              <div class="feature-card" style="text-align: center; padding: 32px 24px;">
                <div class="stat-value" style="background: linear-gradient(135deg, #ff9f43 0%, #ffcb8b 100%);">7</div>
                <div class="stat-label">MCP Tools</div>
              </div>
            </div>
          </div>

          <!-- What is MCP -->
          <div class="feature-card" style="padding: 40px; margin-bottom: 40px;">
            <div style="display: flex; align-items: start; gap: 24px;">
              <div class="feature-icon" style="background: linear-gradient(135deg, #667eea15 0%, #764ba215 100%); color: #667eea;">
                <span class="material-symbols-outlined">integration_instructions</span>
              </div>
              <div>
                <h3 class="feature-title" style="font-size: 1.5rem;">Documentação Inteligente</h3>
                <p class="feature-description" style="margin: 0;">
                  Use o <strong>Model Context Protocol (MCP)</strong> para acessar a documentação dos 233 componentes 
                  <strong>em qualquer IDE ou plataforma</strong>. Seu assistente de IA (GitHub Copilot, Cursor, Windsurf, 
                  Cline, etc.) pode consultar props, events, slots e gerar código automaticamente em 4 frameworks (Vue 3, Vue 2, React, Vanilla). 
                  <strong>Funciona onde você trabalha</strong> - VS Code, WebStorm, Neovim, ou qualquer ferramenta com suporte MCP.
                </p>
              </div>
            </div>
          </div>

          <!-- Platform Support -->
          <div class="row g-4 mb-5">
            <div class="col-md-6">
              <div class="feature-card">
                <div class="feature-icon" style="background: linear-gradient(135deg, #667eea15 0%, #764ba215 100%); color: #667eea;">
                  <span class="material-symbols-outlined">devices</span>
                </div>
                <h4 class="feature-title">IDEs & Editores Suportados</h4>
                <p class="feature-description">Funciona em qualquer ferramenta com suporte MCP:</p>
                <div style="display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 16px;">
                  <span class="tech-badge">VS Code</span>
                  <span class="tech-badge">Cursor</span>
                  <span class="tech-badge">Windsurf</span>
                  <span class="tech-badge">Cline</span>
                  <span class="tech-badge">WebStorm</span>
                  <span class="tech-badge">Neovim</span>
                  <span class="tech-badge">Zed</span>
                </div>
                <p style="font-size: 0.85rem; color: #868e96; margin: 0;">
                  + Qualquer plataforma rodando Claude Desktop, Continue.dev ou cliente MCP customizado
                </p>
              </div>
            </div>

            <div class="col-md-6">
              <div class="feature-card">
                <div class="feature-icon" style="background: linear-gradient(135deg, #28c76f15 0%, #48da8915 100%); color: #28c76f;">
                  <span class="material-symbols-outlined">terminal</span>
                </div>
                <h4 class="feature-title">Como Configurar</h4>
                <div class="feature-description">
                  <p style="margin-bottom: 16px; font-size: 1.05rem;"><strong>Opção 1: Servidor Local</strong></p>
                  <div style="background: #f8f9fa; border-radius: 8px; padding: 16px; font-family: monospace; font-size: 0.9rem; line-height: 1.8; color: #2d3748; border: 1px solid #e9ecef;">
                    <div># Clone o repositório</div>
                    <div>git clone [repo-url]</div>
                    <div style="margin-top: 8px;"># Configure MCP</div>
                    <div>node design-system-mcp/dist/index.js</div>
                  </div>
                  <p style="margin-top: 16px; font-size: 0.95rem; color: #6c757d;">
                    <strong>Opção 2:</strong> Use <code style="background: #f8f9fa; padding: 2px 6px; border-radius: 4px; color: #667eea;">npx</code> para rodar diretamente
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- Use Cases -->
          <h3 class="section-title" style="text-align: center; margin-bottom: 48px;">
            <span class="material-symbols-outlined" style="vertical-align: middle; margin-right: 8px; color: #ff9f43;">deployed_code</span>
            Casos de Uso Reais
          </h3>
          
          <div class="row g-4 mb-5">
            <div class="col-md-6">
              <div class="feature-card">
                <div class="feature-icon" style="background: linear-gradient(135deg, #667eea15 0%, #764ba215 100%); color: #667eea;">
                  🎨
                </div>
                <h4 class="feature-title">Desenvolvendo Nova Feature</h4>
                <div class="feature-description">
                  <strong>Você:</strong> "Preciso criar um formulário com dropdown. Quais componentes usar?"<br><br>
                  <strong>IA:</strong> Sugere ESelect (7 props), mostra exemplo Vue 3, lista props required e optional
                </div>
              </div>
            </div>

            <div class="col-md-6">
              <div class="feature-card">
                <div class="feature-icon" style="background: linear-gradient(135deg, #28c76f15 0%, #48da8915 100%); color: #28c76f;">
                  🔍
                </div>
                <h4 class="feature-title">Explorando Componentes</h4>
                <div class="feature-description">
                  <strong>Você:</strong> "Quais componentes exibem progresso ou loading?"<br><br>
                  <strong>IA:</strong> Lista ProgressBar, LoadingSpinner, Skeleton com links para Storybook
                </div>
              </div>
            </div>

            <div class="col-md-6">
              <div class="feature-card">
                <div class="feature-icon" style="background: linear-gradient(135deg, #00cfe815 0%, #4dd4e815 100%); color: #00cfe8;">
                  ⚡
                </div>
                <h4 class="feature-title">Migrando de Vue 2 para Vue 3</h4>
                <div class="feature-description">
                  <strong>Você:</strong> "Como fica MediaCard em Vue 3?"<br><br>
                  <strong>IA:</strong> Gera código com Composition API, &lt;script setup&gt;, defineProps
                </div>
              </div>
            </div>

            <div class="col-md-6">
              <div class="feature-card">
                <div class="feature-icon" style="background: linear-gradient(135deg, #ff9f4315 0%, #ffcb8b15 100%); color: #ff9f43;">
                  🔧
                </div>
                <h4 class="feature-title">Depurando Problemas</h4>
                <div class="feature-description">
                  <strong>Você:</strong> "Por que meu ESelect não funciona? Quais eventos ele emite?"<br><br>
                  <strong>IA:</strong> Lista eventos (change, input, blur), mostra payload esperado
                </div>
              </div>
            </div>
          </div>

          <!-- Integration Guide -->
          <div class="feature-card" style="padding: 40px; margin-bottom: 60px;">
            <div style="display: flex; align-items: start; gap: 20px; margin-bottom: 32px;">
              <div class="feature-icon" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; flex-shrink: 0;">
                <span class="material-symbols-outlined" style="font-size: 32px;">integration_instructions</span>
              </div>
              <div style="flex: 1;">
                <h3 class="section-title" style="margin-bottom: 12px; text-align: left;">Guia de Integração</h3>
                <p style="color: #6c757d; font-size: 1.05rem; line-height: 1.7; margin: 0;">
                  Use o Design System em seu projeto com ajuda da IA. Funciona em qualquer IDE ou plataforma de desenvolvimento.
                </p>
              </div>
            </div>

            <div class="row g-4">
              <div class="col-md-6">
                <div style="background: #f8f9fa; border-radius: 12px; padding: 24px; height: 100%;">
                  <h5 style="color: #667eea; font-size: 1.125rem; margin-bottom: 16px; font-weight: 600;">📋 Para Desenvolvedores</h5>
                  <div style="color: #2d3748; line-height: 1.8;">
                    <p style="margin-bottom: 16px;"><strong>1. Configure seu ambiente:</strong></p>
                    <ul style="padding-left: 24px; margin-bottom: 24px; color: #6c757d;">
                      <li>Instale extensão MCP na sua IDE (VS Code, Cursor, etc.)</li>
                      <li>Configure o servidor MCP do Design System</li>
                      <li>Recarregue a IDE para ativar</li>
                    </ul>

                    <p style="margin-bottom: 16px;"><strong>2. Pergunte naturalmente:</strong></p>
                    <ul style="padding-left: 24px; color: #6c757d;">
                      <li>"Como criar um formulário com campos de texto e dropdown?"</li>
                      <li>"Preciso exibir uma lista de cards. Qual componente usar?"</li>
                      <li>"Como fazer paginação de tabela?"</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div class="col-md-6">
                <div style="background: #f8f9fa; border-radius: 12px; padding: 24px; height: 100%;">
                  <h5 style="color: #28c76f; font-size: 1.125rem; margin-bottom: 16px; font-weight: 600;">🤖 Para Agentes de IA</h5>
                  <p style="color: #6c757d; margin-bottom: 16px;">
                    Se você é um assistente de IA ajudando desenvolvedores, use estas ferramentas MCP:
                  </p>
                  <div style="font-family: 'Courier New', monospace; color: #2d3748; font-size: 0.9rem; line-height: 1.8;">
                    <div style="margin-bottom: 12px;">
                      <div style="color: #667eea; margin-bottom: 4px;">listComponents()</div>
                      <div style="color: #868e96; font-size: 0.85rem; padding-left: 16px;">→ Lista componentes com filtros</div>
                    </div>
                    <div style="margin-bottom: 12px;">
                      <div style="color: #667eea; margin-bottom: 4px;">getComponent()</div>
                      <div style="color: #868e96; font-size: 0.85rem; padding-left: 16px;">→ Detalhes: props, events, slots</div>
                    </div>
                    <div style="margin-bottom: 12px;">
                      <div style="color: #667eea; margin-bottom: 4px;">searchComponents()</div>
                      <div style="color: #868e96; font-size: 0.85rem; padding-left: 16px;">→ Busca textual com relevância</div>
                    </div>
                    <div>
                      <div style="color: #667eea; margin-bottom: 4px;">getStats()</div>
                      <div style="color: #868e96; font-size: 0.85rem; padding-left: 16px;">→ 233 componentes, 29 categorias</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Benefits Grid -->
          <div class="row g-4 mb-5">
            <div class="col-md-4">
              <div class="feature-card" style="text-align: center; padding: 32px;">
                <div class="feature-icon" style="background: linear-gradient(135deg, #667eea15 0%, #764ba215 100%); color: #667eea; width: 64px; height: 64px; margin: 0 auto 20px;">
                  <span class="material-symbols-outlined" style="font-size: 36px;">speed</span>
                </div>
                <h5 class="feature-title" style="margin-bottom: 12px;">10x Mais Rápido</h5>
                <p class="feature-description" style="margin: 0;">
                  Não procure na documentação. Pergunte e receba código pronto
                </p>
              </div>
            </div>

            <div class="col-md-4">
              <div class="feature-card" style="text-align: center; padding: 32px;">
                <div class="feature-icon" style="background: linear-gradient(135deg, #28c76f15 0%, #48da8915 100%); color: #28c76f; width: 64px; height: 64px; margin: 0 auto 20px;">
                  <span class="material-symbols-outlined" style="font-size: 36px;">check_circle</span>
                </div>
                <h5 class="feature-title" style="margin-bottom: 12px;">Sempre Atualizado</h5>
                <p class="feature-description" style="margin: 0;">
                  IA acessa versão mais recente dos 233 componentes
                </p>
              </div>
            </div>

            <div class="col-md-4">
              <div class="feature-card" style="text-align: center; padding: 32px;">
                <div class="feature-icon" style="background: linear-gradient(135deg, #00cfe815 0%, #4dd4e815 100%); color: #00cfe8; width: 64px; height: 64px; margin: 0 auto 20px;">
                  <span class="material-symbols-outlined" style="font-size: 36px;">workspace_premium</span>
                </div>
                <h5 class="feature-title" style="margin-bottom: 12px;">Zero Erros</h5>
                <p class="feature-description" style="margin: 0;">
                  Props, events e slots garantidos. Código testado e validado
                </p>
              </div>
            </div>
          </div>

          <!-- Action Buttons -->
          <div style="text-align: center; padding: 40px 0;">
            <a href="https://github.com/fabioeducacross/DesignSystem-Vuexy/tree/main/design-system-mcp" target="_blank" class="btn-hero btn-primary-hero" style="margin: 8px;">
              <span class="material-symbols-outlined btn-icon">description</span>
              Ver Documentação MCP
            </a>
            <a href="?path=/story/educacross-components-v2-navigation-appnavbar--default" class="btn-hero btn-secondary-hero" style="margin: 8px;">
              <span class="material-symbols-outlined btn-icon">widgets</span>
              Ver Componentes
            </a>
          </div>
        </section>

      <!-- Final CTA -->
      <section style="padding: 80px 0; background: white;">
        <div class="container text-center">
          <h2 style="font-size: 2.5rem; font-weight: 700; margin-bottom: 16px;">Pronto para Começar?</h2>
          <p style="font-size: 1.25rem; color: #666; margin-bottom: 32px;">
            Explore os 233 componentes e construa interfaces incríveis
          </p>
          <div>
            <a href="?path=/story/educacross-components-v2-navigation-appnavbar--default" class="btn-hero btn-primary-hero">
              <span class="material-symbols-outlined btn-icon">explore</span>
              Explorar Componentes
            </a>
          </div>
        </div>
      </section>

    </div>
  `};var a,n,s;e.parameters={...e.parameters,docs:{...(a=e.parameters)==null?void 0:a.docs,source:{originalSource:`{
  render: () => \`
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
    
    <style>
      .intro-page {
        font-family: 'Public Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        background: #f8f9fa;
        min-height: 100vh;
      }
      
      .hero-section {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        position: relative;
        overflow: hidden;
        padding: 80px 0;
      }
      
      .hero-pattern {
        position: absolute;
        inset: 0;
        opacity: 0.08;
        background-image: 
          radial-gradient(circle at 20% 50%, rgba(255,255,255,0.15) 0%, transparent 50%),
          radial-gradient(circle at 80% 80%, rgba(255,255,255,0.15) 0%, transparent 50%),
          repeating-linear-gradient(
            45deg,
            transparent,
            transparent 40px,
            rgba(255,255,255,0.03) 40px,
            rgba(255,255,255,0.03) 80px
          );
      }
      
      .hero-content {
        position: relative;
        z-index: 2;
      }
      
      .badge-custom {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        padding: 8px 16px;
        background: rgba(255,255,255,0.15);
        backdrop-filter: blur(10px);
        border-radius: 50px;
        color: white;
        font-size: 0.875rem;
        font-weight: 500;
        letter-spacing: 0.5px;
        border: 1px solid rgba(255,255,255,0.2);
      }
      
      .badge-icon {
        font-size: 20px;
      }
      
      .hero-title {
        font-size: clamp(2.5rem, 5vw, 3.5rem);
        font-weight: 700;
        color: white;
        line-height: 1.2;
        margin: 24px 0;
        text-shadow: 0 2px 20px rgba(0,0,0,0.1);
      }
      
      .hero-subtitle {
        font-size: 1.25rem;
        color: rgba(255,255,255,0.9);
        line-height: 1.6;
        max-width: 600px;
        margin: 0 auto 32px;
      }
      
      .btn-hero {
        display: inline-flex;
        align-items: center;
        gap: 10px;
        padding: 14px 32px;
        font-size: 1rem;
        font-weight: 600;
        border-radius: 12px;
        text-decoration: none;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        border: none;
        line-height: 1.5;
      }
      
      .btn-primary-hero {
        background: white;
        color: #667eea;
        box-shadow: 0 4px 20px rgba(0,0,0,0.15);
      }
      
      .btn-primary-hero:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 30px rgba(0,0,0,0.2);
        color: #667eea;
      }
      
      .btn-secondary-hero {
        background: rgba(255,255,255,0.15);
        color: white;
        border: 1px solid rgba(255,255,255,0.3);
        backdrop-filter: blur(10px);
      }
      
      .btn-secondary-hero:hover {
        background: rgba(255,255,255,0.25);
        color: white;
      }
      
      .btn-icon {
        font-size: 20px;
        display: inline-flex;
        align-items: center;
        line-height: 1;
      }
      
      .stats-card {
        background: white;
        border-radius: 20px;
        padding: 40px;
        margin-top: -50px;
        position: relative;
        z-index: 10;
        box-shadow: 0 10px 40px rgba(0,0,0,0.08);
      }
      
      .stat-item {
        text-align: center;
        padding: 16px;
      }
      
      .stat-value {
        font-size: 2.5rem;
        font-weight: 700;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        line-height: 1;
        margin-bottom: 8px;
      }
      
      .stat-label {
        color: #6c757d;
        font-size: 0.9rem;
        font-weight: 500;
      }
      
      .section-header {
        text-align: center;
        margin-bottom: 48px;
      }
      
      .section-badge {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        padding: 6px 16px;
        background: linear-gradient(135deg, #667eea15 0%, #764ba215 100%);
        color: #667eea;
        border-radius: 50px;
        font-size: 0.875rem;
        font-weight: 600;
        margin-bottom: 16px;
      }
      
      .section-badge .material-symbols-outlined {
        font-size: 18px;
      }
      
      .section-title {
        font-size: clamp(1.75rem, 4vw, 2.5rem);
        font-weight: 700;
        color: #2d3748;
        margin-bottom: 12px;
      }
      
      .section-subtitle {
        font-size: 1.125rem;
        color: #6c757d;
        max-width: 600px;
        margin: 0 auto;
      }
      
      .feature-card {
        background: white;
        border-radius: 16px;
        padding: 32px;
        height: 100%;
        transition: all 0.3s ease;
        border: 1px solid #e9ecef;
      }
      
      .feature-card:hover {
        transform: translateY(-4px);
        box-shadow: 0 12px 40px rgba(0,0,0,0.1);
        border-color: #667eea;
      }
      
      .feature-icon {
        width: 64px;
        height: 64px;
        border-radius: 16px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 20px;
      }
      
      .feature-icon .material-symbols-outlined {
        font-size: 36px;
      }
      
      .feature-title {
        font-size: 1.25rem;
        font-weight: 700;
        color: #2d3748;
        margin-bottom: 12px;
      }
      
      .feature-description {
        color: #6c757d;
        line-height: 1.6;
        margin-bottom: 16px;
      }
      
      .feature-list {
        list-style: none;
        padding: 0;
        margin: 0;
      }
      
      .feature-list li {
        padding: 6px 0;
        color: #6c757d;
        font-size: 0.9rem;
        display: flex;
        align-items: center;
        gap: 8px;
      }
      
      .feature-list li .material-symbols-outlined {
        color: #28c76f;
        font-size: 18px;
        flex-shrink: 0;
      }
      
      .atomic-card {
        background: white;
        border-radius: 16px;
        overflow: hidden;
        transition: all 0.3s ease;
        border: 2px solid transparent;
      }
      
      .atomic-card:hover {
        transform: translateY(-4px);
        box-shadow: 0 12px 40px rgba(0,0,0,0.1);
      }
      
      .atomic-header {
        padding: 32px 24px;
        text-align: center;
        position: relative;
      }
      
      .atomic-icon {
        font-size: 48px;
        margin-bottom: 12px;
      }
      
      .atomic-body {
        padding: 24px;
        border-top: 1px solid #e9ecef;
      }
      
      .atomic-title {
        font-size: 1.125rem;
        font-weight: 700;
        color: #2d3748;
        margin-bottom: 8px;
      }
      
      .atomic-description {
        color: #6c757d;
        font-size: 0.9rem;
        margin-bottom: 16px;
      }
      
      .atomic-examples {
        font-size: 0.8rem;
        color: #868e96;
      }
      
      .cta-section {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        padding: 80px 0;
        position: relative;
        overflow: hidden;
      }
      
      .cta-pattern {
        position: absolute;
        inset: 0;
        opacity: 0.05;
        background: repeating-linear-gradient(
          45deg,
          transparent,
          transparent 60px,
          rgba(255,255,255,0.1) 60px,
          rgba(255,255,255,0.1) 120px
        );
      }
      
      .tech-badge {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        padding: 10px 20px;
        background: white;
        border-radius: 50px;
        font-size: 0.875rem;
        font-weight: 600;
        color: #2d3748;
        margin: 4px;
        box-shadow: 0 2px 8px rgba(0,0,0,0.08);
      }
      
      .tech-badge .material-symbols-outlined {
        font-size: 18px;
      }
    </style>

    <div class="intro-page">
      <!-- Hero Section -->
      <section class="hero-section">
        <div class="hero-pattern"></div>
        <div class="container hero-content">
          <div class="row justify-content-center">
            <div class="col-lg-10 text-center">
              <div class="badge-custom">
                <span class="material-symbols-outlined badge-icon">palette</span>
                <span>Educacross Design System v10.9.0</span>
              </div>
              
              <h1 class="hero-title">
                Design System<br/>
                Educacross Platform
              </h1>
              
              <p class="hero-subtitle">
                Biblioteca completa de componentes UI baseada no template Vuexy, 
                organizada com princípios de Atomic Design e documentada para Vue 2.7
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- Stats Section -->
      <div class="container">
        <div class="stats-card">
          <div class="row g-0">
            <div class="col-6 col-md-3">
              <div class="stat-item">
                <div class="stat-value">220+</div>
                <div class="stat-label">Componentes</div>
              </div>
            </div>
            <div class="col-6 col-md-3">
              <div class="stat-item">
                <div class="stat-value">111</div>
                <div class="stat-label">Educacross Real</div>
              </div>
            </div>
            <div class="col-6 col-md-3">
              <div class="stat-item">
                <div class="stat-value">8000+</div>
                <div class="stat-label">Ícones</div>
              </div>
            </div>
            <div class="col-6 col-md-3">
              <div class="stat-item">
                <div class="stat-value">100%</div>
                <div class="stat-label">Responsive</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Dual Structure Section -->
      <section style="padding: 80px 0;">
        <div class="container">
          <div class="section-header">
            <div class="section-badge">
              <span class="material-symbols-outlined">auto_awesome</span>
              <span>Estrutura Dual</span>
            </div>
            <h2 class="section-title">Dois Universos de Componentes</h2>
            <p class="section-subtitle">
              Design system híbrido com componentes genéricos Vuexy e componentes reais do Educacross Platform
            </p>
          </div>

          <div class="row g-4">
            <div class="col-md-6">
              <div class="feature-card">
                <div class="feature-icon" style="background: linear-gradient(135deg, #667eea15 0%, #764ba215 100%); color: #667eea;">
                  <span class="material-symbols-outlined">dashboard_customize</span>
                </div>
                <h3 class="feature-title">Vuexy Generic Components</h3>
                <p class="feature-description">
                  Componentes do template Vuexy organizados por Atomic Design (Atoms → Molecules → Organisms → Templates)
                </p>
                <ul class="feature-list">
                  <li>
                    <span class="material-symbols-outlined">check_circle</span>
                    <span>Buttons, Cards, Forms, Tables</span>
                  </li>
                  <li>
                    <span class="material-symbols-outlined">check_circle</span>
                    <span>Modals, Dropdowns, Tooltips</span>
                  </li>
                  <li>
                    <span class="material-symbols-outlined">check_circle</span>
                    <span>Charts, Invoices, E-commerce</span>
                  </li>
                  <li>
                    <span class="material-symbols-outlined">check_circle</span>
                    <span>220+ componentes base do template</span>
                  </li>
                  <li>
                    <span class="material-symbols-outlined">check_circle</span>
                    <span>Documentação de referência</span>
                  </li>
                </ul>
              </div>
            </div>

            <div class="col-md-6">
              <div class="feature-card">
                <div class="feature-icon" style="background: linear-gradient(135deg, #28c76f15 0%, #48da8915 100%); color: #28c76f;">
                  <span class="material-symbols-outlined">verified</span>
                </div>
                <h3 class="feature-title">Educacross Real Components</h3>
                <p class="feature-description">
                  111 componentes reais extraídos do educacross-frontoffice e documentados no Storybook
                </p>
                <ul class="feature-list">
                  <li>
                    <span class="material-symbols-outlined">check_circle</span>
                    <span>AppNavbar, Sidebar, ManageAccountPage</span>
                  </li>
                  <li>
                    <span class="material-symbols-outlined">check_circle</span>
                    <span>EditProfileStudentNew, UserCard</span>
                  </li>
                  <li>
                    <span class="material-symbols-outlined">check_circle</span>
                    <span>AcceptOrRejectAccess Modal</span>
                  </li>
                  <li>
                    <span class="material-symbols-outlined">check_circle</span>
                    <span>Componentes em produção</span>
                  </li>
                  <li>
                    <span class="material-symbols-outlined">check_circle</span>
                    <span>Código Vue 2.7 real</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Atomic Design Section -->
      <section style="padding: 80px 0; background: white;">
        <div class="container">
          <div class="section-header">
            <div class="section-badge">
              <span class="material-symbols-outlined">account_tree</span>
              <span>Atomic Design</span>
            </div>
            <h2 class="section-title">Princípios de Organização</h2>
            <p class="section-subtitle">
              Componentes organizados de forma hierárquica do mais simples ao mais complexo
            </p>
          </div>

          <div class="row g-4">
            <div class="col-md-3">
              <div class="atomic-card">
                <div class="atomic-header" style="background: linear-gradient(135deg, #ea545515 0%, #f0818215 100%);">
                  <div class="atomic-icon">
                    <span class="material-symbols-outlined" style="font-size: 48px; color: #ea5455;">scatter_plot</span>
                  </div>
                </div>
                <div class="atomic-body">
                  <h4 class="atomic-title">Atoms</h4>
                  <p class="atomic-description">Elementos mais básicos e indivisíveis</p>
                  <div class="atomic-examples">
                    <strong>Exemplos:</strong> Buttons, Inputs, Labels, Badges, Icons
                  </div>
                </div>
              </div>
            </div>

            <div class="col-md-3">
              <div class="atomic-card">
                <div class="atomic-header" style="background: linear-gradient(135deg, #7367f015 0%, #9e95f515 100%);">
                  <div class="atomic-icon">
                    <span class="material-symbols-outlined" style="font-size: 48px; color: #7367f0;">category</span>
                  </div>
                </div>
                <div class="atomic-body">
                  <h4 class="atomic-title">Molecules</h4>
                  <p class="atomic-description">Grupos de átomos funcionando juntos</p>
                  <div class="atomic-examples">
                    <strong>Exemplos:</strong> Form Groups, Search Bars, Cards, Alerts
                  </div>
                </div>
              </div>
            </div>

            <div class="col-md-3">
              <div class="atomic-card">
                <div class="atomic-header" style="background: linear-gradient(135deg, #00cfe815 0%, #4dd4e815 100%);">
                  <div class="atomic-icon">
                    <span class="material-symbols-outlined" style="font-size: 48px; color: #00cfe8;">view_module</span>
                  </div>
                </div>
                <div class="atomic-body">
                  <h4 class="atomic-title">Organisms</h4>
                  <p class="atomic-description">Seções complexas de interface</p>
                  <div class="atomic-examples">
                    <strong>Exemplos:</strong> Headers, Navigation, Data Tables, Forms
                  </div>
                </div>
              </div>
            </div>

            <div class="col-md-3">
              <div class="atomic-card">
                <div class="atomic-header" style="background: linear-gradient(135deg, #28c76f15 0%, #48da8915 100%);">
                  <div class="atomic-icon">
                    <span class="material-symbols-outlined" style="font-size: 48px; color: #28c76f;">web</span>
                  </div>
                </div>
                <div class="atomic-body">
                  <h4 class="atomic-title">Templates</h4>
                  <p class="atomic-description">Layouts de página completos</p>
                  <div class="atomic-examples">
                    <strong>Exemplos:</strong> Dashboard, Profile, Invoice, E-commerce
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Technology Stack -->
      <section style="padding: 80px 0; background: #f8f9fa;">
        <div class="container">
          <div class="section-header">
            <div class="section-badge">
              <span class="material-symbols-outlined">code</span>
              <span>Stack Tecnológico</span>
            </div>
            <h2 class="section-title">Frameworks & Bibliotecas</h2>
            <p class="section-subtitle">
              Componentes compatíveis com múltiplos frameworks e bibliotecas modernas
            </p>
          </div>

          <div class="text-center">
            <div class="tech-badge">
              <span class="material-symbols-outlined" style="color: #42b883;">language</span>
              <span>Vue 2.7</span>
            </div>
            <div class="tech-badge">
              <span class="material-symbols-outlined" style="color: #61dafb;">code</span>
              <span>React</span>
            </div>
            <div class="tech-badge">
              <span class="material-symbols-outlined" style="color: #e34f26;">html</span>
              <span>HTML5</span>
            </div>
            <div class="tech-badge">
              <span class="material-symbols-outlined" style="color: #7952b3;">view_quilt</span>
              <span>Bootstrap 5</span>
            </div>
            <div class="tech-badge">
              <span class="material-symbols-outlined" style="color: #ff6384;">show_chart</span>
              <span>ApexCharts</span>
            </div>
            <div class="tech-badge">
              <span class="material-symbols-outlined" style="color: #667eea;">interests</span>
              <span>Tabler Icons</span>
            </div>
            <div class="tech-badge">
              <span class="material-symbols-outlined" style="color: #4285f4;">psychology</span>
              <span>Material Symbols</span>
            </div>
            <div class="tech-badge">
              <span class="material-symbols-outlined" style="color: #ff6b35;">star</span>
              <span>Font Awesome</span>
            </div>
          </div>
        </div>
      </section>

      <!-- Features Section -->
      <section style="padding: 80px 0; background: white;">
        <div class="container">
          <div class="section-header">
            <div class="section-badge">
              <span class="material-symbols-outlined">workspace_premium</span>
              <span>Recursos</span>
            </div>
            <h2 class="section-title">Tudo que Você Precisa</h2>
            <p class="section-subtitle">
              Funcionalidades modernas para desenvolvimento ágil e escalável
            </p>
          </div>

          <div class="row g-4">
            <div class="col-md-4">
              <div class="feature-card">
                <div class="feature-icon" style="background: linear-gradient(135deg, #667eea15 0%, #764ba215 100%); color: #667eea;">
                  <span class="material-symbols-outlined">menu_book</span>
                </div>
                <h4 class="feature-title">Documentação Completa</h4>
                <p class="feature-description">
                  Cada componente com exemplos de código em HTML, React, Vue 2 e Vue 3
                </p>
              </div>
            </div>

            <div class="col-md-4">
              <div class="feature-card">
                <div class="feature-icon" style="background: linear-gradient(135deg, #28c76f15 0%, #48da8915 100%); color: #28c76f;">
                  <span class="material-symbols-outlined">devices</span>
                </div>
                <h4 class="feature-title">Responsivo</h4>
                <p class="feature-description">
                  Todos os componentes otimizados para mobile, tablet e desktop
                </p>
              </div>
            </div>

            <div class="col-md-4">
              <div class="feature-card">
                <div class="feature-icon" style="background: linear-gradient(135deg, #00cfe815 0%, #4dd4e815 100%); color: #00cfe8;">
                  <span class="material-symbols-outlined">accessibility_new</span>
                </div>
                <h4 class="feature-title">Acessível</h4>
                <p class="feature-description">
                  Componentes seguindo padrões WCAG 2.1 e boas práticas de acessibilidade
                </p>
              </div>
            </div>

            <div class="col-md-4">
              <div class="feature-card">
                <div class="feature-icon" style="background: linear-gradient(135deg, #ff9f4315 0%, #ffcb8b15 100%); color: #ff9f43;">
                  <span class="material-symbols-outlined">tune</span>
                </div>
                <h4 class="feature-title">Customizável</h4>
                <p class="feature-description">
                  Variáveis CSS e props configuráveis para adaptar ao seu design
                </p>
              </div>
            </div>

            <div class="col-md-4">
              <div class="feature-card">
                <div class="feature-icon" style="background: linear-gradient(135deg, #ea545515 0%, #f0818215 100%); color: #ea5455;">
                  <span class="material-symbols-outlined">speed</span>
                </div>
                <h4 class="feature-title">Performance</h4>
                <p class="feature-description">
                  Componentes otimizados com lazy loading e code splitting
                </p>
              </div>
            </div>

            <div class="col-md-4">
              <div class="feature-card">
                <div class="feature-icon" style="background: linear-gradient(135deg, #7367f015 0%, #9e95f515 100%); color: #7367f0;">
                  <span class="material-symbols-outlined">science</span>
                </div>
                <h4 class="feature-title">Testado</h4>
                <p class="feature-description">
                  Testes visuais automatizados com Playwright para garantir qualidade
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- MCP Server Section -->
      <section style="padding: 80px 0; background: #f8f9fa;">
        <div class="container">
          <div class="section-header">
            <div class="section-badge">
              <span class="material-symbols-outlined">smart_toy</span>
              <span>AI-Powered Documentation</span>
            </div>
            <h2 class="section-title">Acesse o Design System via IA</h2>
            <p class="section-subtitle">
              Consulte 233 componentes documentados em qualquer IDE ou plataforma com suporte MCP
            </p>
          </div>

          <!-- Stats Grid -->
          <div class="row g-4 mb-5">
            <div class="col-md-3 col-6">
              <div class="feature-card" style="text-align: center; padding: 32px 24px;">
                <div class="stat-value" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);">233</div>
                <div class="stat-label">Componentes</div>
              </div>
            </div>
            <div class="col-md-3 col-6">
              <div class="feature-card" style="text-align: center; padding: 32px 24px;">
                <div class="stat-value" style="background: linear-gradient(135deg, #28c76f 0%, #48da89 100%);">96.7%</div>
                <div class="stat-label">Parser Success</div>
              </div>
            </div>
            <div class="col-md-3 col-6">
              <div class="feature-card" style="text-align: center; padding: 32px 24px;">
                <div class="stat-value" style="background: linear-gradient(135deg, #00cfe8 0%, #4dd4e8 100%);">11ms</div>
                <div class="stat-label">Init Time</div>
              </div>
            </div>
            <div class="col-md-3 col-6">
              <div class="feature-card" style="text-align: center; padding: 32px 24px;">
                <div class="stat-value" style="background: linear-gradient(135deg, #ff9f43 0%, #ffcb8b 100%);">7</div>
                <div class="stat-label">MCP Tools</div>
              </div>
            </div>
          </div>

          <!-- What is MCP -->
          <div class="feature-card" style="padding: 40px; margin-bottom: 40px;">
            <div style="display: flex; align-items: start; gap: 24px;">
              <div class="feature-icon" style="background: linear-gradient(135deg, #667eea15 0%, #764ba215 100%); color: #667eea;">
                <span class="material-symbols-outlined">integration_instructions</span>
              </div>
              <div>
                <h3 class="feature-title" style="font-size: 1.5rem;">Documentação Inteligente</h3>
                <p class="feature-description" style="margin: 0;">
                  Use o <strong>Model Context Protocol (MCP)</strong> para acessar a documentação dos 233 componentes 
                  <strong>em qualquer IDE ou plataforma</strong>. Seu assistente de IA (GitHub Copilot, Cursor, Windsurf, 
                  Cline, etc.) pode consultar props, events, slots e gerar código automaticamente em 4 frameworks (Vue 3, Vue 2, React, Vanilla). 
                  <strong>Funciona onde você trabalha</strong> - VS Code, WebStorm, Neovim, ou qualquer ferramenta com suporte MCP.
                </p>
              </div>
            </div>
          </div>

          <!-- Platform Support -->
          <div class="row g-4 mb-5">
            <div class="col-md-6">
              <div class="feature-card">
                <div class="feature-icon" style="background: linear-gradient(135deg, #667eea15 0%, #764ba215 100%); color: #667eea;">
                  <span class="material-symbols-outlined">devices</span>
                </div>
                <h4 class="feature-title">IDEs & Editores Suportados</h4>
                <p class="feature-description">Funciona em qualquer ferramenta com suporte MCP:</p>
                <div style="display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 16px;">
                  <span class="tech-badge">VS Code</span>
                  <span class="tech-badge">Cursor</span>
                  <span class="tech-badge">Windsurf</span>
                  <span class="tech-badge">Cline</span>
                  <span class="tech-badge">WebStorm</span>
                  <span class="tech-badge">Neovim</span>
                  <span class="tech-badge">Zed</span>
                </div>
                <p style="font-size: 0.85rem; color: #868e96; margin: 0;">
                  + Qualquer plataforma rodando Claude Desktop, Continue.dev ou cliente MCP customizado
                </p>
              </div>
            </div>

            <div class="col-md-6">
              <div class="feature-card">
                <div class="feature-icon" style="background: linear-gradient(135deg, #28c76f15 0%, #48da8915 100%); color: #28c76f;">
                  <span class="material-symbols-outlined">terminal</span>
                </div>
                <h4 class="feature-title">Como Configurar</h4>
                <div class="feature-description">
                  <p style="margin-bottom: 16px; font-size: 1.05rem;"><strong>Opção 1: Servidor Local</strong></p>
                  <div style="background: #f8f9fa; border-radius: 8px; padding: 16px; font-family: monospace; font-size: 0.9rem; line-height: 1.8; color: #2d3748; border: 1px solid #e9ecef;">
                    <div># Clone o repositório</div>
                    <div>git clone [repo-url]</div>
                    <div style="margin-top: 8px;"># Configure MCP</div>
                    <div>node design-system-mcp/dist/index.js</div>
                  </div>
                  <p style="margin-top: 16px; font-size: 0.95rem; color: #6c757d;">
                    <strong>Opção 2:</strong> Use <code style="background: #f8f9fa; padding: 2px 6px; border-radius: 4px; color: #667eea;">npx</code> para rodar diretamente
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- Use Cases -->
          <h3 class="section-title" style="text-align: center; margin-bottom: 48px;">
            <span class="material-symbols-outlined" style="vertical-align: middle; margin-right: 8px; color: #ff9f43;">deployed_code</span>
            Casos de Uso Reais
          </h3>
          
          <div class="row g-4 mb-5">
            <div class="col-md-6">
              <div class="feature-card">
                <div class="feature-icon" style="background: linear-gradient(135deg, #667eea15 0%, #764ba215 100%); color: #667eea;">
                  🎨
                </div>
                <h4 class="feature-title">Desenvolvendo Nova Feature</h4>
                <div class="feature-description">
                  <strong>Você:</strong> "Preciso criar um formulário com dropdown. Quais componentes usar?"<br><br>
                  <strong>IA:</strong> Sugere ESelect (7 props), mostra exemplo Vue 3, lista props required e optional
                </div>
              </div>
            </div>

            <div class="col-md-6">
              <div class="feature-card">
                <div class="feature-icon" style="background: linear-gradient(135deg, #28c76f15 0%, #48da8915 100%); color: #28c76f;">
                  🔍
                </div>
                <h4 class="feature-title">Explorando Componentes</h4>
                <div class="feature-description">
                  <strong>Você:</strong> "Quais componentes exibem progresso ou loading?"<br><br>
                  <strong>IA:</strong> Lista ProgressBar, LoadingSpinner, Skeleton com links para Storybook
                </div>
              </div>
            </div>

            <div class="col-md-6">
              <div class="feature-card">
                <div class="feature-icon" style="background: linear-gradient(135deg, #00cfe815 0%, #4dd4e815 100%); color: #00cfe8;">
                  ⚡
                </div>
                <h4 class="feature-title">Migrando de Vue 2 para Vue 3</h4>
                <div class="feature-description">
                  <strong>Você:</strong> "Como fica MediaCard em Vue 3?"<br><br>
                  <strong>IA:</strong> Gera código com Composition API, &lt;script setup&gt;, defineProps
                </div>
              </div>
            </div>

            <div class="col-md-6">
              <div class="feature-card">
                <div class="feature-icon" style="background: linear-gradient(135deg, #ff9f4315 0%, #ffcb8b15 100%); color: #ff9f43;">
                  🔧
                </div>
                <h4 class="feature-title">Depurando Problemas</h4>
                <div class="feature-description">
                  <strong>Você:</strong> "Por que meu ESelect não funciona? Quais eventos ele emite?"<br><br>
                  <strong>IA:</strong> Lista eventos (change, input, blur), mostra payload esperado
                </div>
              </div>
            </div>
          </div>

          <!-- Integration Guide -->
          <div class="feature-card" style="padding: 40px; margin-bottom: 60px;">
            <div style="display: flex; align-items: start; gap: 20px; margin-bottom: 32px;">
              <div class="feature-icon" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; flex-shrink: 0;">
                <span class="material-symbols-outlined" style="font-size: 32px;">integration_instructions</span>
              </div>
              <div style="flex: 1;">
                <h3 class="section-title" style="margin-bottom: 12px; text-align: left;">Guia de Integração</h3>
                <p style="color: #6c757d; font-size: 1.05rem; line-height: 1.7; margin: 0;">
                  Use o Design System em seu projeto com ajuda da IA. Funciona em qualquer IDE ou plataforma de desenvolvimento.
                </p>
              </div>
            </div>

            <div class="row g-4">
              <div class="col-md-6">
                <div style="background: #f8f9fa; border-radius: 12px; padding: 24px; height: 100%;">
                  <h5 style="color: #667eea; font-size: 1.125rem; margin-bottom: 16px; font-weight: 600;">📋 Para Desenvolvedores</h5>
                  <div style="color: #2d3748; line-height: 1.8;">
                    <p style="margin-bottom: 16px;"><strong>1. Configure seu ambiente:</strong></p>
                    <ul style="padding-left: 24px; margin-bottom: 24px; color: #6c757d;">
                      <li>Instale extensão MCP na sua IDE (VS Code, Cursor, etc.)</li>
                      <li>Configure o servidor MCP do Design System</li>
                      <li>Recarregue a IDE para ativar</li>
                    </ul>

                    <p style="margin-bottom: 16px;"><strong>2. Pergunte naturalmente:</strong></p>
                    <ul style="padding-left: 24px; color: #6c757d;">
                      <li>"Como criar um formulário com campos de texto e dropdown?"</li>
                      <li>"Preciso exibir uma lista de cards. Qual componente usar?"</li>
                      <li>"Como fazer paginação de tabela?"</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div class="col-md-6">
                <div style="background: #f8f9fa; border-radius: 12px; padding: 24px; height: 100%;">
                  <h5 style="color: #28c76f; font-size: 1.125rem; margin-bottom: 16px; font-weight: 600;">🤖 Para Agentes de IA</h5>
                  <p style="color: #6c757d; margin-bottom: 16px;">
                    Se você é um assistente de IA ajudando desenvolvedores, use estas ferramentas MCP:
                  </p>
                  <div style="font-family: 'Courier New', monospace; color: #2d3748; font-size: 0.9rem; line-height: 1.8;">
                    <div style="margin-bottom: 12px;">
                      <div style="color: #667eea; margin-bottom: 4px;">listComponents()</div>
                      <div style="color: #868e96; font-size: 0.85rem; padding-left: 16px;">→ Lista componentes com filtros</div>
                    </div>
                    <div style="margin-bottom: 12px;">
                      <div style="color: #667eea; margin-bottom: 4px;">getComponent()</div>
                      <div style="color: #868e96; font-size: 0.85rem; padding-left: 16px;">→ Detalhes: props, events, slots</div>
                    </div>
                    <div style="margin-bottom: 12px;">
                      <div style="color: #667eea; margin-bottom: 4px;">searchComponents()</div>
                      <div style="color: #868e96; font-size: 0.85rem; padding-left: 16px;">→ Busca textual com relevância</div>
                    </div>
                    <div>
                      <div style="color: #667eea; margin-bottom: 4px;">getStats()</div>
                      <div style="color: #868e96; font-size: 0.85rem; padding-left: 16px;">→ 233 componentes, 29 categorias</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Benefits Grid -->
          <div class="row g-4 mb-5">
            <div class="col-md-4">
              <div class="feature-card" style="text-align: center; padding: 32px;">
                <div class="feature-icon" style="background: linear-gradient(135deg, #667eea15 0%, #764ba215 100%); color: #667eea; width: 64px; height: 64px; margin: 0 auto 20px;">
                  <span class="material-symbols-outlined" style="font-size: 36px;">speed</span>
                </div>
                <h5 class="feature-title" style="margin-bottom: 12px;">10x Mais Rápido</h5>
                <p class="feature-description" style="margin: 0;">
                  Não procure na documentação. Pergunte e receba código pronto
                </p>
              </div>
            </div>

            <div class="col-md-4">
              <div class="feature-card" style="text-align: center; padding: 32px;">
                <div class="feature-icon" style="background: linear-gradient(135deg, #28c76f15 0%, #48da8915 100%); color: #28c76f; width: 64px; height: 64px; margin: 0 auto 20px;">
                  <span class="material-symbols-outlined" style="font-size: 36px;">check_circle</span>
                </div>
                <h5 class="feature-title" style="margin-bottom: 12px;">Sempre Atualizado</h5>
                <p class="feature-description" style="margin: 0;">
                  IA acessa versão mais recente dos 233 componentes
                </p>
              </div>
            </div>

            <div class="col-md-4">
              <div class="feature-card" style="text-align: center; padding: 32px;">
                <div class="feature-icon" style="background: linear-gradient(135deg, #00cfe815 0%, #4dd4e815 100%); color: #00cfe8; width: 64px; height: 64px; margin: 0 auto 20px;">
                  <span class="material-symbols-outlined" style="font-size: 36px;">workspace_premium</span>
                </div>
                <h5 class="feature-title" style="margin-bottom: 12px;">Zero Erros</h5>
                <p class="feature-description" style="margin: 0;">
                  Props, events e slots garantidos. Código testado e validado
                </p>
              </div>
            </div>
          </div>

          <!-- Action Buttons -->
          <div style="text-align: center; padding: 40px 0;">
            <a href="https://github.com/fabioeducacross/DesignSystem-Vuexy/tree/main/design-system-mcp" target="_blank" class="btn-hero btn-primary-hero" style="margin: 8px;">
              <span class="material-symbols-outlined btn-icon">description</span>
              Ver Documentação MCP
            </a>
            <a href="?path=/story/educacross-components-v2-navigation-appnavbar--default" class="btn-hero btn-secondary-hero" style="margin: 8px;">
              <span class="material-symbols-outlined btn-icon">widgets</span>
              Ver Componentes
            </a>
          </div>
        </section>

      <!-- Final CTA -->
      <section style="padding: 80px 0; background: white;">
        <div class="container text-center">
          <h2 style="font-size: 2.5rem; font-weight: 700; margin-bottom: 16px;">Pronto para Começar?</h2>
          <p style="font-size: 1.25rem; color: #666; margin-bottom: 32px;">
            Explore os 233 componentes e construa interfaces incríveis
          </p>
          <div>
            <a href="?path=/story/educacross-components-v2-navigation-appnavbar--default" class="btn-hero btn-primary-hero">
              <span class="material-symbols-outlined btn-icon">explore</span>
              Explorar Componentes
            </a>
          </div>
        </div>
      </section>

    </div>
  \`
}`,...(s=(n=e.parameters)==null?void 0:n.docs)==null?void 0:s.source}}};const t=["Introduction"];export{e as Introduction,t as __namedExportsOrder,i as default};
