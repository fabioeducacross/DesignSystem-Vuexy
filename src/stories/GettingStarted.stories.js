/**
 * @component Getting Started
 * @description Página inicial do Design System Educacross
 * @brand Educacross Visual Identity - Baseado no site institucional
 * @category Getting Started
 * @status DONE
 * 
 * ============================================
 * PALETA OFICIAL EDUCACROSS (do site institucional)
 * ============================================
 * Teal Principal: #0C5257 (texto "educa")
 * Teal Escuro: #225054 (backgrounds, header)
 * Dourado: #FAB84A (CTAs, destaques)
 * Laranja: #E9934C (secundário quente)
 * Vermelho: #DF2B3C (texto "cross")
 * Creme: #F2EEE3 (face da coruja)
 * Branco: #FFFFFF (fundos de cards)
 * ============================================
 */

export default {
  title: '🦉 Getting Started',
  parameters: {
    previewTabs: {
      canvas: { hidden: true },
    },
    viewMode: 'docs',
    layout: 'fullscreen',
  },
};

// ============================================================================
// INTRODUCTION - Página principal baseada no site institucional Educacross
// ============================================================================
export const Introduction = {
  render: () => `
    <div class="bg-body" style="font-family: 'Public Sans', sans-serif;">
      
      <!-- ====================================== -->
      <!-- HERO SECTION - Estilo site institucional -->
      <!-- ====================================== -->
      <div style="background: linear-gradient(135deg, #225054 0%, #0C5257 100%); position: relative; overflow: hidden; min-height: 400px;">
        
        <div class="container py-5">
          <div class="row align-items-center">
            <div class="col-lg-7">
              <!-- Tagline -->
              <p class="mb-3" style="color: rgba(255,255,255,0.7); font-size: 0.9rem; text-transform: uppercase; letter-spacing: 2px;">
                Design System Educacross
              </p>
              
              <!-- Título principal - estilo do site -->
              <h1 class="display-4 fw-bold mb-3" style="color: white; line-height: 1.2;">
                Cada componente é <span style="color: #FAB84A;">único</span>,<br>
                assim como sua <span style="color: #FAB84A;">aplicação</span>.
              </h1>
              
              <!-- Descrição -->
              <p class="lead mb-4" style="color: rgba(255,255,255,0.85); font-size: 1.1rem;">
                Sistema de componentes UI baseado no Vuexy, organizado com 
                <strong style="color: white;">Atomic Design</strong> para criar 
                experiências de aprendizagem consistentes e escaláveis.
              </p>
              
              <!-- CTA Buttons - estilo do site -->
              <div class="d-flex gap-3 flex-wrap mb-4">
                <a href="#components" class="btn btn-lg px-4" style="background: #FAB84A; color: #1a1a1a; border: none; border-radius: 8px; font-weight: 600;">
                  Ver Componentes
                </a>
                <a href="#atomic" class="btn btn-lg px-4" style="background: transparent; color: white; border: 2px solid rgba(255,255,255,0.4); border-radius: 8px;">
                  Atomic Design
                </a>
              </div>
            </div>
            
            <!-- Belinha - Mascote REAL -->
            <div class="col-lg-5 text-center mt-4 mt-lg-0">
              <img src="/vuexy/img/educacross/belinha.svg" alt="Belinha - Mascote Educacross" style="max-width: 200px; filter: drop-shadow(0 10px 30px rgba(0,0,0,0.3)); animation: float 3s ease-in-out infinite;" />
            </div>
          </div>
        </div>
      </div>

      <!-- ====================================== -->
      <!-- STATS SECTION - Estilo do site institucional -->
      <!-- ====================================== -->
      <div style="background: white; margin-top: -30px; position: relative; z-index: 10;">
        <div class="container">
          <div class="row g-0 justify-content-center">
            <div class="col-lg-10">
              <div class="row g-4 p-4 rounded-4 shadow-lg" style="background: white; transform: translateY(-30px);">
                <!-- Stat 1 -->
                <div class="col-6 col-md-3 text-center">
                  <div class="d-flex align-items-center justify-content-center mb-2">
                    <span style="color: #FAB84A; font-size: 1.5rem;">+</span>
                    <span class="fw-bold" style="font-size: 2.5rem; color: #225054;">70</span>
                  </div>
                  <p class="text-muted mb-0 small">componentes</p>
                </div>
                
                <!-- Stat 2 -->
                <div class="col-6 col-md-3 text-center">
                  <div class="d-flex align-items-center justify-content-center mb-2">
                    <span style="color: #FAB84A; font-size: 1.5rem;">+</span>
                    <span class="fw-bold" style="font-size: 2.5rem; color: #225054;">8000</span>
                  </div>
                  <p class="text-muted mb-0 small">ícones disponíveis</p>
                </div>
                
                <!-- Stat 3 -->
                <div class="col-6 col-md-3 text-center">
                  <div class="d-flex align-items-center justify-content-center mb-2">
                    <span style="color: #FAB84A; font-size: 1.5rem;">+</span>
                    <span class="fw-bold" style="font-size: 2.5rem; color: #225054;">4</span>
                  </div>
                  <p class="text-muted mb-0 small">stacks suportadas</p>
                </div>
                
                <!-- Stat 4 -->
                <div class="col-6 col-md-3 text-center">
                  <span class="fw-bold" style="font-size: 2.5rem; color: #225054;">100%</span>
                  <p class="text-muted mb-0 small">acessível e responsivo</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- ====================================== -->
      <!-- LOGO SECTION -->
      <!-- ====================================== -->
      <div class="container py-4 text-center">
        <img src="/vuexy/img/educacross/logo-horizontal.svg" alt="Educacross" style="max-width: 280px;" />
      </div>

      <!-- ====================================== -->
      <!-- PROGRAMAS/FEATURES SECTION - Estilo do site -->
      <!-- ====================================== -->
      <div style="background: #f8f9fa;" class="py-5">
        <div class="container">
          <div class="row">
            <!-- Coluna esquerda - Descrição -->
            <div class="col-lg-5 mb-4 mb-lg-0">
              <span class="badge mb-3" style="background: rgba(12,82,87,0.1); color: #0C5257; font-size: 0.75rem;">
                Design System
              </span>
              <h2 class="fw-bold mb-4" style="color: #225054; font-size: 2rem; line-height: 1.3;">
                Componentes organizados para <span style="color: #0C5257;">personalizar</span> a experiência
              </h2>
              
              <!-- Lista de features -->
              <div class="d-flex flex-column gap-3">
                <div class="d-flex align-items-start">
                  <div class="rounded-circle me-3 d-flex align-items-center justify-content-center flex-shrink-0" style="width: 32px; height: 32px; background: rgba(250,184,74,0.2);">
                    <i class="ti tabler-atom-2" style="color: #FAB84A;"></i>
                  </div>
                  <div>
                    <strong style="color: #225054;">Atomic Design</strong>
                    <p class="text-muted small mb-0">Átomos, Moléculas, Organismos, Templates e Pages</p>
                  </div>
                </div>
                
                <div class="d-flex align-items-start">
                  <div class="rounded-circle me-3 d-flex align-items-center justify-content-center flex-shrink-0" style="width: 32px; height: 32px; background: rgba(40,199,111,0.15);">
                    <i class="ti tabler-accessible" style="color: #28C76F;"></i>
                  </div>
                  <div>
                    <strong style="color: #225054;">Acessibilidade</strong>
                    <p class="text-muted small mb-0">WCAG 2.1 para experiência inclusiva</p>
                  </div>
                </div>
                
                <div class="d-flex align-items-start">
                  <div class="rounded-circle me-3 d-flex align-items-center justify-content-center flex-shrink-0" style="width: 32px; height: 32px; background: rgba(0,207,232,0.15);">
                    <i class="ti tabler-devices" style="color: #00CFE8;"></i>
                  </div>
                  <div>
                    <strong style="color: #225054;">Responsivo</strong>
                    <p class="text-muted small mb-0">Funciona em desktop, tablet e mobile</p>
                  </div>
                </div>
                
                <div class="d-flex align-items-start">
                  <div class="rounded-circle me-3 d-flex align-items-center justify-content-center flex-shrink-0" style="width: 32px; height: 32px; background: rgba(115,103,240,0.15);">
                    <i class="ti tabler-code" style="color: #7367F0;"></i>
                  </div>
                  <div>
                    <strong style="color: #225054;">Multi-stack</strong>
                    <p class="text-muted small mb-0">HTML, React, Vue 2 e Vue 3</p>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Coluna direita - Cards de categorias -->
            <div class="col-lg-7">
              <div class="row g-3">
                <!-- Card Atoms -->
                <div class="col-6">
                  <div class="card border-0 shadow-sm h-100" style="border-radius: 16px; overflow: hidden;">
                    <div class="p-3" style="background: linear-gradient(135deg, #EA5455 0%, #F08182 100%);">
                      <img src="/vuexy/img/educacross/belinha.svg" alt="" style="width: 60px; opacity: 0.9;" />
                    </div>
                    <div class="card-body">
                      <h6 class="fw-bold mb-1" style="color: #225054;">Atoms</h6>
                      <p class="text-muted small mb-0">Buttons, Inputs, Labels, Badges</p>
                    </div>
                  </div>
                </div>
                
                <!-- Card Molecules -->
                <div class="col-6">
                  <div class="card border-0 shadow-sm h-100" style="border-radius: 16px; overflow: hidden;">
                    <div class="p-3" style="background: linear-gradient(135deg, #FF9F43 0%, #FFBE7C 100%);">
                      <img src="/vuexy/img/educacross/belinha.svg" alt="" style="width: 60px; opacity: 0.9;" />
                    </div>
                    <div class="card-body">
                      <h6 class="fw-bold mb-1" style="color: #225054;">Molecules</h6>
                      <p class="text-muted small mb-0">SearchField, FormGroup, InputGroup</p>
                    </div>
                  </div>
                </div>
                
                <!-- Card Organisms -->
                <div class="col-6">
                  <div class="card border-0 shadow-sm h-100" style="border-radius: 16px; overflow: hidden;">
                    <div class="p-3" style="background: linear-gradient(135deg, #28C76F 0%, #55DD92 100%);">
                      <img src="/vuexy/img/educacross/belinha.svg" alt="" style="width: 60px; opacity: 0.9;" />
                    </div>
                    <div class="card-body">
                      <h6 class="fw-bold mb-1" style="color: #225054;">Organisms</h6>
                      <p class="text-muted small mb-0">DataTable, Modal, Navbar, Sidebar</p>
                    </div>
                  </div>
                </div>
                
                <!-- Card Templates -->
                <div class="col-6">
                  <div class="card border-0 shadow-sm h-100" style="border-radius: 16px; overflow: hidden;">
                    <div class="p-3" style="background: linear-gradient(135deg, #00CFE8 0%, #4DE4F5 100%);">
                      <img src="/vuexy/img/educacross/belinha.svg" alt="" style="width: 60px; opacity: 0.9;" />
                    </div>
                    <div class="card-body">
                      <h6 class="fw-bold mb-1" style="color: #225054;">Templates</h6>
                      <p class="text-muted small mb-0">Dashboard, Login, Profile, Invoice</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- ====================================== -->
      <!-- SEÇÃO TEAL - Estilo do site institucional -->
      <!-- ====================================== -->
      <div style="background: #225054;" class="py-5">
        <div class="container">
          <div class="row align-items-center">
            <div class="col-lg-6 mb-4 mb-lg-0">
              <h2 class="fw-bold text-white mb-3" style="font-size: 2rem;">
                A Educação é <span style="color: #FAB84A;">H.I.G.I.A.</span><br>
                Física + Digital + Social.
              </h2>
              <p style="color: rgba(255,255,255,0.8);" class="mb-4">
                Este Design System garante que todas as interfaces da plataforma Educacross 
                mantenham a <strong class="text-white">mesma identidade visual</strong>, 
                promovendo consistência e qualidade em toda experiência de aprendizagem.
              </p>
              
              <div class="d-flex flex-wrap gap-2">
                <span class="badge py-2 px-3" style="background: rgba(255,255,255,0.15); color: white;">Gamificação</span>
                <span class="badge py-2 px-3" style="background: rgba(255,255,255,0.15); color: white;">Acessibilidade</span>
                <span class="badge py-2 px-3" style="background: rgba(255,255,255,0.15); color: white;">Responsivo</span>
                <span class="badge py-2 px-3" style="background: rgba(255,255,255,0.15); color: white;">Multi-idioma</span>
              </div>
            </div>
            
            <div class="col-lg-6 text-center">
              <img src="/vuexy/img/educacross/belinha.svg" alt="Belinha" style="max-width: 180px; filter: drop-shadow(0 10px 30px rgba(0,0,0,0.3));" />
            </div>
          </div>
        </div>
      </div>

      <!-- ====================================== -->
      <!-- ATOMIC DESIGN SECTION -->
      <!-- ====================================== -->
      <div id="atomic" style="background: white;" class="py-5">
        <div class="container">
          <div class="text-center mb-5">
            <span class="badge mb-2" style="background: rgba(250,184,74,0.15); color: #E9934C; font-size: 0.75rem;">Metodologia</span>
            <h2 class="fw-bold" style="color: #225054; font-size: 2rem;">
              Organização com Atomic Design
            </h2>
            <p class="text-muted mx-auto" style="max-width: 600px;">
              Metodologia de Brad Frost que organiza componentes em 5 níveis de complexidade crescente
            </p>
          </div>

          <!-- Atomic Design Visual -->
          <div class="row justify-content-center">
            <div class="col-lg-10">
              <div class="d-flex flex-wrap justify-content-center align-items-end gap-3">
                <!-- Atom -->
                <div class="text-center" style="flex: 1; min-width: 120px;">
                  <div class="rounded-circle mx-auto mb-3 d-flex align-items-center justify-content-center" style="width: 60px; height: 60px; background: linear-gradient(135deg, #EA5455 0%, #F08182 100%);">
                    <i class="ti tabler-atom-2 text-white fs-4"></i>
                  </div>
                  <h6 class="fw-bold mb-1" style="color: #225054;">Atoms</h6>
                  <small class="text-muted">Elementos base</small>
                </div>
                
                <!-- Arrow -->
                <div class="text-muted d-none d-md-block" style="padding-bottom: 40px;">→</div>
                
                <!-- Molecule -->
                <div class="text-center" style="flex: 1; min-width: 120px;">
                  <div class="rounded-circle mx-auto mb-3 d-flex align-items-center justify-content-center" style="width: 70px; height: 70px; background: linear-gradient(135deg, #FF9F43 0%, #FFBE7C 100%);">
                    <i class="ti tabler-hierarchy-2 text-white fs-4"></i>
                  </div>
                  <h6 class="fw-bold mb-1" style="color: #225054;">Molecules</h6>
                  <small class="text-muted">Combinações simples</small>
                </div>
                
                <!-- Arrow -->
                <div class="text-muted d-none d-md-block" style="padding-bottom: 40px;">→</div>
                
                <!-- Organism -->
                <div class="text-center" style="flex: 1; min-width: 120px;">
                  <div class="rounded-circle mx-auto mb-3 d-flex align-items-center justify-content-center" style="width: 80px; height: 80px; background: linear-gradient(135deg, #28C76F 0%, #55DD92 100%);">
                    <i class="ti tabler-box-multiple text-white fs-4"></i>
                  </div>
                  <h6 class="fw-bold mb-1" style="color: #225054;">Organisms</h6>
                  <small class="text-muted">Seções completas</small>
                </div>
                
                <!-- Arrow -->
                <div class="text-muted d-none d-md-block" style="padding-bottom: 40px;">→</div>
                
                <!-- Template -->
                <div class="text-center" style="flex: 1; min-width: 120px;">
                  <div class="rounded-circle mx-auto mb-3 d-flex align-items-center justify-content-center" style="width: 90px; height: 90px; background: linear-gradient(135deg, #00CFE8 0%, #4DE4F5 100%);">
                    <i class="ti tabler-layout text-white fs-4"></i>
                  </div>
                  <h6 class="fw-bold mb-1" style="color: #225054;">Templates</h6>
                  <small class="text-muted">Estruturas de página</small>
                </div>
                
                <!-- Arrow -->
                <div class="text-muted d-none d-md-block" style="padding-bottom: 40px;">→</div>
                
                <!-- Page -->
                <div class="text-center" style="flex: 1; min-width: 120px;">
                  <div class="rounded-circle mx-auto mb-3 d-flex align-items-center justify-content-center" style="width: 100px; height: 100px; background: linear-gradient(135deg, #7367F0 0%, #9E95F5 100%);">
                    <i class="ti tabler-file text-white fs-4"></i>
                  </div>
                  <h6 class="fw-bold mb-1" style="color: #225054;">Pages</h6>
                  <small class="text-muted">Instâncias reais</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- ====================================== -->
      <!-- HOW TO USE - PASSOS -->
      <!-- ====================================== -->
      <div style="background: #f8f9fa;" class="py-5">
        <div class="container">
          <div class="text-center mb-5">
            <span class="badge mb-2" style="background: rgba(12,82,87,0.1); color: #0C5257; font-size: 0.75rem;">Tutorial</span>
            <h2 class="fw-bold" style="color: #225054; font-size: 2rem;">
              Como usar o Design System
            </h2>
          </div>

          <div class="row g-4">
            <!-- Passo 1 -->
            <div class="col-md-6 col-lg-3">
              <div class="card border-0 shadow-sm h-100" style="border-radius: 16px;">
                <div class="card-body text-center p-4">
                  <div class="rounded-circle mx-auto mb-3 d-flex align-items-center justify-content-center" style="width: 48px; height: 48px; background: linear-gradient(135deg, #FAB84A 0%, #E9934C 100%); color: white; font-weight: bold;">
                    1
                  </div>
                  <h6 class="fw-bold" style="color: #225054;">Navegue pelo Menu</h6>
                  <p class="text-muted small mb-0">Use o menu lateral para explorar os componentes organizados por categoria</p>
                </div>
              </div>
            </div>
            
            <!-- Passo 2 -->
            <div class="col-md-6 col-lg-3">
              <div class="card border-0 shadow-sm h-100" style="border-radius: 16px;">
                <div class="card-body text-center p-4">
                  <div class="rounded-circle mx-auto mb-3 d-flex align-items-center justify-content-center" style="width: 48px; height: 48px; background: linear-gradient(135deg, #FAB84A 0%, #E9934C 100%); color: white; font-weight: bold;">
                    2
                  </div>
                  <h6 class="fw-bold" style="color: #225054;">Visualize no Canvas</h6>
                  <p class="text-muted small mb-0">Veja o componente renderizado em tempo real na aba Canvas</p>
                </div>
              </div>
            </div>
            
            <!-- Passo 3 -->
            <div class="col-md-6 col-lg-3">
              <div class="card border-0 shadow-sm h-100" style="border-radius: 16px;">
                <div class="card-body text-center p-4">
                  <div class="rounded-circle mx-auto mb-3 d-flex align-items-center justify-content-center" style="width: 48px; height: 48px; background: linear-gradient(135deg, #FAB84A 0%, #E9934C 100%); color: white; font-weight: bold;">
                    3
                  </div>
                  <h6 class="fw-bold" style="color: #225054;">Teste os Controls</h6>
                  <p class="text-muted small mb-0">Ajuste propriedades e veja mudanças instantâneas</p>
                </div>
              </div>
            </div>
            
            <!-- Passo 4 -->
            <div class="col-md-6 col-lg-3">
              <div class="card border-0 shadow-sm h-100" style="border-radius: 16px;">
                <div class="card-body text-center p-4">
                  <div class="rounded-circle mx-auto mb-3 d-flex align-items-center justify-content-center" style="width: 48px; height: 48px; background: linear-gradient(135deg, #FAB84A 0%, #E9934C 100%); color: white; font-weight: bold;">
                    4
                  </div>
                  <h6 class="fw-bold" style="color: #225054;">Copie o Código</h6>
                  <p class="text-muted small mb-0">Clique em "Show code" para copiar e integrar</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- ====================================== -->
      <!-- CTA FINAL - Estilo site institucional -->
      <!-- ====================================== -->
      <div style="background: linear-gradient(135deg, #225054 0%, #0C5257 100%);" class="py-5">
        <div class="container text-center">
          <img src="/vuexy/img/educacross/belinha.svg" alt="Belinha" style="max-width: 100px; margin-bottom: 1rem;" />
          <h2 class="fw-bold text-white mb-3" style="font-size: 1.8rem;">
            Pronto para explorar?
          </h2>
          <p style="color: rgba(255,255,255,0.8);" class="mb-4">
            Comece navegando pelos componentes e construa experiências educacionais incríveis
          </p>
          <div class="d-flex gap-3 justify-content-center flex-wrap">
            <button class="btn btn-lg px-4" style="background: #FAB84A; color: #1a1a1a; border: none; border-radius: 8px; font-weight: 600;" onclick="document.querySelector('[data-item-id*=atoms]')?.click()">
              <i class="ti tabler-atom-2 me-2"></i>
              Ver Atoms
            </button>
            <button class="btn btn-lg px-4" style="background: transparent; color: white; border: 2px solid rgba(255,255,255,0.4); border-radius: 8px;" onclick="document.querySelector('[data-item-id*=foundations]')?.click()">
              <i class="ti tabler-palette me-2"></i>
              Foundations
            </button>
          </div>
        </div>
      </div>

      <!-- ====================================== -->
      <!-- FOOTER -->
      <!-- ====================================== -->
      <div style="background: #1a1a1a;" class="py-4">
        <div class="container">
          <div class="row align-items-center">
            <div class="col-md-6 text-center text-md-start">
              <img src="/vuexy/img/educacross/logo-horizontal.svg" alt="Educacross" style="max-width: 150px; filter: brightness(0) invert(1); opacity: 0.7;" />
            </div>
            <div class="col-md-6 text-center text-md-end mt-3 mt-md-0">
              <p class="mb-0 small" style="color: rgba(255,255,255,0.5);">
                Design System v1.0 • Desenvolvido com ❤️ pela equipe Educacross
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Animation Keyframes -->
      <style>
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
      </style>
    </div>
  `,
};

// ============================================================================
// BRAND GUIDELINES - Paleta de Cores e Identidade
// ============================================================================
export const BrandGuidelines = {
  render: () => `
    <div class="container py-5" style="max-width: 1000px;">
      <!-- Header -->
      <div class="text-center mb-5">
        <img src="/vuexy/img/educacross/logo-horizontal.svg" alt="Educacross" style="max-width: 250px;" class="mb-4" />
        <h1 class="fw-bold" style="color: #225054;">Diretrizes de Marca</h1>
        <p class="text-muted">Guia de identidade visual para manter consistência em todos os produtos</p>
      </div>

      <!-- Paleta Principal -->
      <div class="card border-0 shadow-sm mb-4" style="border-radius: 16px;">
        <div class="card-header bg-white border-bottom py-3" style="border-radius: 16px 16px 0 0;">
          <h5 class="mb-0 fw-bold" style="color: #225054;">
            <i class="ti tabler-palette me-2" style="color: #FAB84A;"></i>
            Paleta de Cores Principal
          </h5>
        </div>
        <div class="card-body">
          <div class="row g-3">
            <!-- Teal Principal -->
            <div class="col-md-4">
              <div class="rounded-3 p-4 text-center text-white" style="background: #0C5257;">
                <strong>Teal Principal</strong>
                <div class="mt-2 font-monospace small">#0C5257</div>
                <small class="opacity-75">Texto "educa" • CTAs</small>
              </div>
            </div>
            <!-- Teal Escuro -->
            <div class="col-md-4">
              <div class="rounded-3 p-4 text-center text-white" style="background: #225054;">
                <strong>Teal Escuro</strong>
                <div class="mt-2 font-monospace small">#225054</div>
                <small class="opacity-75">Headers • Backgrounds</small>
              </div>
            </div>
            <!-- Dourado -->
            <div class="col-md-4">
              <div class="rounded-3 p-4 text-center" style="background: #FAB84A; color: #1a1a1a;">
                <strong>Dourado</strong>
                <div class="mt-2 font-monospace small">#FAB84A</div>
                <small>CTAs • Destaques</small>
              </div>
            </div>
            <!-- Laranja -->
            <div class="col-md-4">
              <div class="rounded-3 p-4 text-center" style="background: #E9934C; color: #1a1a1a;">
                <strong>Laranja</strong>
                <div class="mt-2 font-monospace small">#E9934C</div>
                <small>Secundário quente</small>
              </div>
            </div>
            <!-- Vermelho -->
            <div class="col-md-4">
              <div class="rounded-3 p-4 text-center text-white" style="background: #DF2B3C;">
                <strong>Vermelho</strong>
                <div class="mt-2 font-monospace small">#DF2B3C</div>
                <small class="opacity-75">Texto "cross"</small>
              </div>
            </div>
            <!-- Creme -->
            <div class="col-md-4">
              <div class="rounded-3 p-4 text-center" style="background: #F2EEE3; color: #1a1a1a; border: 1px solid #ddd;">
                <strong>Creme</strong>
                <div class="mt-2 font-monospace small">#F2EEE3</div>
                <small>Face da coruja • Fundos</small>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Mascote Belinha -->
      <div class="card border-0 shadow-sm mb-4" style="border-radius: 16px;">
        <div class="card-header bg-white border-bottom py-3" style="border-radius: 16px 16px 0 0;">
          <h5 class="mb-0 fw-bold" style="color: #225054;">
            <i class="ti tabler-mood-happy me-2" style="color: #FAB84A;"></i>
            Mascote: Belinha
          </h5>
        </div>
        <div class="card-body">
          <div class="row align-items-center">
            <div class="col-md-4 text-center">
              <img src="/vuexy/img/educacross/belinha.svg" alt="Belinha" style="max-width: 150px;" />
            </div>
            <div class="col-md-8">
              <h6 class="fw-bold" style="color: #225054;">Elementos Identitários:</h6>
              <ul class="mb-0">
                <li><strong>Olhos:</strong> Dourado (#FAB84A) e Laranja (#E9934C) — representam sabedoria e atenção</li>
                <li><strong>Corpo:</strong> Teal escuro (#225054) — transmite confiança e segurança</li>
                <li><strong>Bico:</strong> Dourado — conecta com gamificação (estrelas, conquistas)</li>
                <li><strong>Face:</strong> Creme (#F2EEE3) — suavidade e acolhimento</li>
                <li><strong>Pés:</strong> Laranja (#E9934C) — detalhes de personalidade</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <!-- Logo -->
      <div class="card border-0 shadow-sm" style="border-radius: 16px;">
        <div class="card-header bg-white border-bottom py-3" style="border-radius: 16px 16px 0 0;">
          <h5 class="mb-0 fw-bold" style="color: #225054;">
            <i class="ti tabler-photo me-2" style="color: #FAB84A;"></i>
            Logo Educacross
          </h5>
        </div>
        <div class="card-body">
          <div class="row g-4">
            <div class="col-md-6">
              <div class="p-4 rounded-3 text-center" style="background: #f8f9fa;">
                <img src="/vuexy/img/educacross/logo-horizontal.svg" alt="Logo Horizontal" style="max-width: 100%;" />
              </div>
              <p class="text-center text-muted small mt-2">Versão Horizontal (preferencial)</p>
            </div>
            <div class="col-md-6">
              <div class="p-4 rounded-3 text-center" style="background: #225054;">
                <img src="/vuexy/img/educacross/logo-horizontal.svg" alt="Logo em fundo escuro" style="max-width: 100%;" />
              </div>
              <p class="text-center text-muted small mt-2">Sobre fundo escuro</p>
            </div>
          </div>
          <div class="alert mt-4 mb-0" style="background: rgba(250,184,74,0.1); border-left: 4px solid #FAB84A; border-radius: 8px;">
            <strong>Regra de uso:</strong> O texto "educa" sempre em <span style="color: #0C5257; font-weight: bold;">Teal (#0C5257)</span> 
            e "cross" sempre em <span style="color: #DF2B3C; font-weight: bold;">Vermelho (#DF2B3C)</span>.
          </div>
        </div>
      </div>
    </div>
  `,
};
