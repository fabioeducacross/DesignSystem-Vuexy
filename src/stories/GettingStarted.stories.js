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

export const Introduction = {
  render: () => `
    <div class="bg-body" style="font-family: 'Public Sans', sans-serif;">
      
      <div style="background: linear-gradient(135deg, #696cff 0%, #5e5ce6 100%); position: relative; overflow: hidden;">
        <div style="position: absolute; inset: 0; opacity: 0.1; background: repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(255,255,255,0.1) 35px, rgba(255,255,255,0.1) 70px);"></div>
        
        <div class="container py-5">
          <div class="row align-items-center justify-content-center text-center">
            <div class="col-lg-8">
              <p class="mb-3" style="color: rgba(255,255,255,0.7); font-size: 0.9rem; text-transform: uppercase; letter-spacing: 2px;">
                Vuexy Design System
              </p>
              
              <h1 class="display-4 fw-bold mb-3" style="color: white; line-height: 1.2;">
                Build Beautiful Interfaces<br>with Consistent Components
              </h1>
              
              <p class="lead mb-4" style="color: rgba(255,255,255,0.85); font-size: 1.1rem; max-width: 600px; margin: 0 auto;">
                A comprehensive UI component library based on Vuexy theme, organized with Atomic Design principles.
              </p>
              
              <div class="d-flex gap-3 flex-wrap justify-content-center mb-4">
                <a href="#" class="btn btn-lg btn-warning px-4">Browse Components</a>
                <a href="#" class="btn btn-lg btn-outline-light px-4">Learn Atomic Design</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div style="background: white; margin-top: -30px; position: relative; z-index: 10;">
        <div class="container">
          <div class="row g-0 justify-content-center">
            <div class="col-lg-10">
              <div class="row g-4 p-4 rounded-4 shadow-lg" style="background: white; transform: translateY(-30px);">
                <div class="col-6 col-md-3 text-center">
                  <div class="mb-2">
                    <span class="fw-bold" style="font-size: 2.5rem; color: #696cff;">70+</span>
                  </div>
                  <p class="text-muted mb-0 small">Components</p>
                </div>
                
                <div class="col-6 col-md-3 text-center">
                  <div class="mb-2">
                    <span class="fw-bold" style="font-size: 2.5rem; color: #696cff;">8000+</span>
                  </div>
                  <p class="text-muted mb-0 small">Icons Available</p>
                </div>
                
                <div class="col-6 col-md-3 text-center">
                  <div class="mb-2">
                    <span class="fw-bold" style="font-size: 2.5rem; color: #696cff;">4</span>
                  </div>
                  <p class="text-muted mb-0 small">Framework Support</p>
                </div>
                
                <div class="col-6 col-md-3 text-center">
                  <span class="fw-bold" style="font-size: 2.5rem; color: #696cff;">100%</span>
                  <p class="text-muted mb-0 small">Accessible & Responsive</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div style="background: #f8f9fa;" class="py-5">
        <div class="container">
          <div class="text-center mb-5">
            <span class="badge bg-primary bg-opacity-10 text-primary mb-3">Design System</span>
            <h2 class="fw-bold mb-3" style="color: #5d596c;">Organized Components for Consistent Experiences</h2>
            <p class="text-muted lead">Build scalable applications with Atomic Design principles</p>
          </div>
          
          <div class="row g-4">
            <div class="col-md-3">
              <div class="card border-0 shadow-sm h-100" style="border-radius: 16px;">
                <div class="p-4 text-center" style="background: linear-gradient(135deg, #EA5455 0%, #F08182 100%);">
                  <i class="ti ti-atom-2" style="font-size: 3rem; color: white;"></i>
                </div>
                <div class="card-body">
                  <h6 class="fw-bold mb-1" style="color: #5d596c;">Atoms</h6>
                  <p class="text-muted small mb-0">Buttons, Inputs, Labels</p>
                </div>
              </div>
            </div>
            
            <div class="col-md-3">
              <div class="card border-0 shadow-sm h-100" style="border-radius: 16px;">
                <div class="p-4 text-center" style="background: linear-gradient(135deg, #7367F0 0%, #9E95F5 100%);">
                  <i class="ti ti-components" style="font-size: 3rem; color: white;"></i>
                </div>
                <div class="card-body">
                  <h6 class="fw-bold mb-1" style="color: #5d596c;">Molecules</h6>
                  <p class="text-muted small mb-0">Form Groups, Cards</p>
                </div>
              </div>
            </div>
            
            <div class="col-md-3">
              <div class="card border-0 shadow-sm h-100" style="border-radius: 16px;">
                <div class="p-4 text-center" style="background: linear-gradient(135deg, #00CFE8 0%, #4DD4E8 100%);">
                  <i class="ti ti-layout-grid" style="font-size: 3rem; color: white;"></i>
                </div>
                <div class="card-body">
                  <h6 class="fw-bold mb-1" style="color: #5d596c;">Organisms</h6>
                  <p class="text-muted small mb-0">Headers, Tables</p>
                </div>
              </div>
            </div>
            
            <div class="col-md-3">
              <div class="card border-0 shadow-sm h-100" style="border-radius: 16px;">
                <div class="p-4 text-center" style="background: linear-gradient(135deg, #28C76F 0%, #48DA89 100%);">
                  <i class="ti ti-template" style="font-size: 3rem; color: white;"></i>
                </div>
                <div class="card-body">
                  <h6 class="fw-bold mb-1" style="color: #5d596c;">Templates</h6>
                  <p class="text-muted small mb-0">Page Layouts</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="container py-5">
        <div class="row justify-content-center">
          <div class="col-lg-10">
            <div class="text-center mb-5">
              <h2 class="fw-bold" style="color: #5d596c;">Quick Start Guide</h2>
              <p class="text-muted">Get started with Vuexy components in minutes</p>
            </div>
            
            <div class="row g-4">
              <div class="col-md-4">
                <div class="text-center">
                  <div class="rounded-circle mx-auto mb-3 d-flex align-items-center justify-content-center" style="width: 60px; height: 60px; background: rgba(105,108,255,0.1);">
                    <span class="fw-bold" style="font-size: 1.5rem; color: #696cff;">1</span>
                  </div>
                  <h5 class="fw-bold mb-2" style="color: #5d596c;">Browse Components</h5>
                  <p class="text-muted small">Explore our library organized by Atomic Design</p>
                </div>
              </div>
              
              <div class="col-md-4">
                <div class="text-center">
                  <div class="rounded-circle mx-auto mb-3 d-flex align-items-center justify-content-center" style="width: 60px; height: 60px; background: rgba(105,108,255,0.1);">
                    <span class="fw-bold" style="font-size: 1.5rem; color: #696cff;">2</span>
                  </div>
                  <h5 class="fw-bold mb-2" style="color: #5d596c;">Choose Your Stack</h5>
                  <p class="text-muted small">View code in HTML, React, Vue 2, or Vue 3</p>
                </div>
              </div>
              
              <div class="col-md-4">
                <div class="text-center">
                  <div class="rounded-circle mx-auto mb-3 d-flex align-items-center justify-content-center" style="width: 60px; height: 60px; background: rgba(105,108,255,0.1);">
                    <span class="fw-bold" style="font-size: 1.5rem; color: #696cff;">3</span>
                  </div>
                  <h5 class="fw-bold mb-2" style="color: #5d596c;">Copy & Customize</h5>
                  <p class="text-muted small">Copy code and customize to your needs</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div style="background: linear-gradient(135deg, #696cff 0%, #5e5ce6 100%);" class="py-5 text-center">
        <div class="container">
          <div class="row justify-content-center">
            <div class="col-lg-8">
              <h2 class="fw-bold mb-3" style="color: white;">Ready to Build?</h2>
              <p class="mb-4" style="color: rgba(255,255,255,0.85);">Start exploring our component library</p>
              <a href="#" class="btn btn-lg btn-warning px-5">Explore Components</a>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  `,
};
