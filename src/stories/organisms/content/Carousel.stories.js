/**
 * Carousel - Organism (Content)
 * 
 * Source: packages/vuexy_theme/public/vuexy/css/core.css (.carousel)
 * Priority: P1 (Important)
 * Status: ✅ DONE
 * 
 * Slider de imagens e conteúdo com navegação.
 */

import { formatHtmlSnippet, formatReactSnippet, formatVue2Snippet, formatVue3Snippet } from '../../_helpers/snippets';

export default {
  title: 'Organisms/Content/Carousel',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
# Carousel

Componente de slideshow para percorrer elementos (imagens ou conteúdo).

## Quando usar
- Galerias de imagens/produtos
- Banners promocionais rotativos
- Depoimentos de clientes
- Portfolios
- Tours guiados
- Onboarding screens

## Características
- Classes Bootstrap: \`.carousel\`, \`.carousel-inner\`, \`.carousel-item\`
- Controles: Prev/Next arrows
- Indicadores de posição (dots)
- Autoplay com intervalo configurável
- Transições: Slide, Fade
- Touch/swipe support (mobile)
- Captions (legendas)
- Requer Bootstrap JavaScript

## Comportamento
- Rotação automática opcional
- Pausa ao hover
- Navegação por teclado (←/→)
- Touch gestures (swipe)
- Loop infinito

## Acessibilidade
- \`role="region"\` e \`aria-roledescription="carousel"\`
- Controles com labels descritivos
- Indicadores com \`aria-label\`
- Estado atual via \`aria-current\`
        `
      }
    }
  },
  argTypes: {
    controls: {
      control: 'boolean',
      description: 'Mostra controles prev/next',
      table: { defaultValue: { summary: true } }
    },
    indicators: {
      control: 'boolean',
      description: 'Mostra indicadores (dots)',
      table: { defaultValue: { summary: true } }
    },
    fade: {
      control: 'boolean',
      description: 'Transição fade ao invés de slide',
      table: { defaultValue: { summary: false } }
    }
  }
};

const createCarousel = ({ controls = true, indicators = true, fade = false }) => {
  const fadeClass = fade ? 'carousel-fade' : '';
  const indicatorsHtml = indicators ? `<div class="carousel-indicators">
    <button type="button" data-bs-target="#carouselExample" data-bs-slide-to="0" class="active" aria-current="true"></button>
    <button type="button" data-bs-target="#carouselExample" data-bs-slide-to="1"></button>
    <button type="button" data-bs-target="#carouselExample" data-bs-slide-to="2"></button>
  </div>` : '';
  
  const controlsHtml = controls ? `<button class="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>` : '';
  
  return `<div id="carouselExample" class="carousel slide ${fadeClass}" data-bs-ride="carousel">
  ${indicatorsHtml}
  <div class="carousel-inner">
    <div class="carousel-item active">
      <img src="https://demos.themeselection.com/materio-bootstrap-html-admin-template/assets/img/pages/card-advance-1.png" class="d-block w-100" alt="Slide 1">
    </div>
    <div class="carousel-item">
      <img src="https://demos.themeselection.com/materio-bootstrap-html-admin-template/assets/img/pages/card-advance-2.png" class="d-block w-100" alt="Slide 2">
    </div>
    <div class="carousel-item">
      <img src="https://demos.themeselection.com/materio-bootstrap-html-admin-template/assets/img/pages/card-advance-3.png" class="d-block w-100" alt="Slide 3">
    </div>
  </div>
  ${controlsHtml}
</div>`;
};

const Template = (args) => {
  const markup = createCarousel(args);
  
  return `
    <div style="max-width: 800px;">
      ${markup}
    </div>
    
    <hr class="my-5" />
    
    <details>
      <summary><strong>Code Snippets</strong></summary>
      <div class="mt-3">
        <h6>HTML</h6>
        <pre><code>${formatHtmlSnippet(markup).replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
        <h6>React</h6>
        <pre><code>${formatReactSnippet(markup, 'Carousel').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
      </div>
    </details>
  `;
};

export const Overview = () => `
  <div class="row g-4">
    <div class="col-12">
      <h5>Default Carousel</h5>
      <div id="carouselDefault" class="carousel slide" data-bs-ride="carousel">
        <div class="carousel-indicators">
          <button type="button" data-bs-target="#carouselDefault" data-bs-slide-to="0" class="active"></button>
          <button type="button" data-bs-target="#carouselDefault" data-bs-slide-to="1"></button>
          <button type="button" data-bs-target="#carouselDefault" data-bs-slide-to="2"></button>
        </div>
        <div class="carousel-inner rounded">
          <div class="carousel-item active">
            <img src="https://demos.themeselection.com/materio-bootstrap-html-admin-template/assets/img/pages/card-advance-1.png" class="d-block w-100" alt="Slide 1">
          </div>
          <div class="carousel-item">
            <img src="https://demos.themeselection.com/materio-bootstrap-html-admin-template/assets/img/pages/card-advance-2.png" class="d-block w-100" alt="Slide 2">
          </div>
          <div class="carousel-item">
            <img src="https://demos.themeselection.com/materio-bootstrap-html-admin-template/assets/img/pages/card-advance-3.png" class="d-block w-100" alt="Slide 3">
          </div>
        </div>
        <button class="carousel-control-prev" type="button" data-bs-target="#carouselDefault" data-bs-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#carouselDefault" data-bs-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>
    </div>
    
    <div class="col-12 mt-5">
      <h5>With Captions</h5>
      <div id="carouselCaptions" class="carousel slide" data-bs-ride="carousel">
        <div class="carousel-indicators">
          <button type="button" data-bs-target="#carouselCaptions" data-bs-slide-to="0" class="active"></button>
          <button type="button" data-bs-target="#carouselCaptions" data-bs-slide-to="1"></button>
          <button type="button" data-bs-target="#carouselCaptions" data-bs-slide-to="2"></button>
        </div>
        <div class="carousel-inner rounded">
          <div class="carousel-item active">
            <img src="https://demos.themeselection.com/materio-bootstrap-html-admin-template/assets/img/pages/card-advance-1.png" class="d-block w-100" alt="First slide">
            <div class="carousel-caption d-none d-md-block">
              <h5>First slide label</h5>
              <p>Some representative placeholder content for the first slide.</p>
            </div>
          </div>
          <div class="carousel-item">
            <img src="https://demos.themeselection.com/materio-bootstrap-html-admin-template/assets/img/pages/card-advance-2.png" class="d-block w-100" alt="Second slide">
            <div class="carousel-caption d-none d-md-block">
              <h5>Second slide label</h5>
              <p>Some representative placeholder content for the second slide.</p>
            </div>
          </div>
          <div class="carousel-item">
            <img src="https://demos.themeselection.com/materio-bootstrap-html-admin-template/assets/img/pages/card-advance-3.png" class="d-block w-100" alt="Third slide">
            <div class="carousel-caption d-none d-md-block">
              <h5>Third slide label</h5>
              <p>Some representative placeholder content for the third slide.</p>
            </div>
          </div>
        </div>
        <button class="carousel-control-prev" type="button" data-bs-target="#carouselCaptions" data-bs-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#carouselCaptions" data-bs-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>
    </div>
    
    <div class="col-12 mt-5">
      <h5>Fade Transition</h5>
      <div id="carouselFade" class="carousel slide carousel-fade" data-bs-ride="carousel">
        <div class="carousel-inner rounded">
          <div class="carousel-item active">
            <img src="https://demos.themeselection.com/materio-bootstrap-html-admin-template/assets/img/pages/card-advance-1.png" class="d-block w-100" alt="Fade 1">
          </div>
          <div class="carousel-item">
            <img src="https://demos.themeselection.com/materio-bootstrap-html-admin-template/assets/img/pages/card-advance-2.png" class="d-block w-100" alt="Fade 2">
          </div>
          <div class="carousel-item">
            <img src="https://demos.themeselection.com/materio-bootstrap-html-admin-template/assets/img/pages/card-advance-3.png" class="d-block w-100" alt="Fade 3">
          </div>
        </div>
        <button class="carousel-control-prev" type="button" data-bs-target="#carouselFade" data-bs-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#carouselFade" data-bs-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>
    </div>
    
    <div class="col-12 mt-5">
      <h5>Testimonials Carousel</h5>
      <div id="carouselTestimonials" class="carousel slide" data-bs-ride="carousel">
        <div class="carousel-indicators">
          <button type="button" data-bs-target="#carouselTestimonials" data-bs-slide-to="0" class="active"></button>
          <button type="button" data-bs-target="#carouselTestimonials" data-bs-slide-to="1"></button>
          <button type="button" data-bs-target="#carouselTestimonials" data-bs-slide-to="2"></button>
        </div>
        <div class="carousel-inner">
          <div class="carousel-item active">
            <div class="card">
              <div class="card-body text-center py-5">
                <div class="avatar avatar-lg mx-auto mb-3">
                  <img src="https://demos.themeselection.com/materio-bootstrap-html-admin-template/assets/img/avatars/1.png" alt="Avatar" class="rounded-circle">
                </div>
                <p class="mb-3 fs-5">"This product has completely transformed how we work. Highly recommend to anyone looking for a solution."</p>
                <h6 class="mb-0">John Doe</h6>
                <small class="text-muted">CEO, Company Inc.</small>
                <div class="mt-2">
                  <i class="bx bxs-star text-warning"></i>
                  <i class="bx bxs-star text-warning"></i>
                  <i class="bx bxs-star text-warning"></i>
                  <i class="bx bxs-star text-warning"></i>
                  <i class="bx bxs-star text-warning"></i>
                </div>
              </div>
            </div>
          </div>
          <div class="carousel-item">
            <div class="card">
              <div class="card-body text-center py-5">
                <div class="avatar avatar-lg mx-auto mb-3">
                  <img src="https://demos.themeselection.com/materio-bootstrap-html-admin-template/assets/img/avatars/2.png" alt="Avatar" class="rounded-circle">
                </div>
                <p class="mb-3 fs-5">"Outstanding quality and excellent customer service. Worth every penny!"</p>
                <h6 class="mb-0">Jane Smith</h6>
                <small class="text-muted">Product Manager, Tech Corp</small>
                <div class="mt-2">
                  <i class="bx bxs-star text-warning"></i>
                  <i class="bx bxs-star text-warning"></i>
                  <i class="bx bxs-star text-warning"></i>
                  <i class="bx bxs-star text-warning"></i>
                  <i class="bx bxs-star text-warning"></i>
                </div>
              </div>
            </div>
          </div>
          <div class="carousel-item">
            <div class="card">
              <div class="card-body text-center py-5">
                <div class="avatar avatar-lg mx-auto mb-3">
                  <img src="https://demos.themeselection.com/materio-bootstrap-html-admin-template/assets/img/avatars/3.png" alt="Avatar" class="rounded-circle">
                </div>
                <p class="mb-3 fs-5">"Best investment we've made this year. The team loves it!"</p>
                <h6 class="mb-0">Mike Johnson</h6>
                <small class="text-muted">CTO, Startup LLC</small>
                <div class="mt-2">
                  <i class="bx bxs-star text-warning"></i>
                  <i class="bx bxs-star text-warning"></i>
                  <i class="bx bxs-star text-warning"></i>
                  <i class="bx bxs-star text-warning"></i>
                  <i class="bx bxs-star-half text-warning"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
        <button class="carousel-control-prev" type="button" data-bs-target="#carouselTestimonials" data-bs-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#carouselTestimonials" data-bs-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>
    </div>
    
    <div class="col-12 mt-5">
      <h5>Product Gallery</h5>
      <div class="row">
        <div class="col-md-8">
          <div id="carouselProduct" class="carousel slide" data-bs-ride="carousel">
            <div class="carousel-inner rounded">
              <div class="carousel-item active">
                <img src="https://demos.themeselection.com/materio-bootstrap-html-admin-template/assets/img/pages/card-advance-1.png" class="d-block w-100" alt="Product 1">
              </div>
              <div class="carousel-item">
                <img src="https://demos.themeselection.com/materio-bootstrap-html-admin-template/assets/img/pages/card-advance-2.png" class="d-block w-100" alt="Product 2">
              </div>
              <div class="carousel-item">
                <img src="https://demos.themeselection.com/materio-bootstrap-html-admin-template/assets/img/pages/card-advance-3.png" class="d-block w-100" alt="Product 3">
              </div>
            </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#carouselProduct" data-bs-slide="prev">
              <span class="carousel-control-prev-icon" aria-hidden="true"></span>
              <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#carouselProduct" data-bs-slide="next">
              <span class="carousel-control-next-icon" aria-hidden="true"></span>
              <span class="visually-hidden">Next</span>
            </button>
          </div>
        </div>
        <div class="col-md-4">
          <div class="d-grid gap-2">
            <button class="btn btn-sm btn-outline-secondary" data-bs-target="#carouselProduct" data-bs-slide-to="0">
              <img src="https://demos.themeselection.com/materio-bootstrap-html-admin-template/assets/img/pages/card-advance-1.png" class="w-100 rounded" alt="Thumb 1">
            </button>
            <button class="btn btn-sm btn-outline-secondary" data-bs-target="#carouselProduct" data-bs-slide-to="1">
              <img src="https://demos.themeselection.com/materio-bootstrap-html-admin-template/assets/img/pages/card-advance-2.png" class="w-100 rounded" alt="Thumb 2">
            </button>
            <button class="btn btn-sm btn-outline-secondary" data-bs-target="#carouselProduct" data-bs-slide-to="2">
              <img src="https://demos.themeselection.com/materio-bootstrap-html-admin-template/assets/img/pages/card-advance-3.png" class="w-100 rounded" alt="Thumb 3">
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  
  <div class="alert alert-info mt-5">
    <i class="bx bx-info-circle me-2"></i>
    <strong>JavaScript Required:</strong> Carousel requires Bootstrap JavaScript. Auto-rotation starts with <code>data-bs-ride="carousel"</code>.
  </div>
`;

export const Default = Template.bind({});
Default.args = {
  controls: true,
  indicators: true,
  fade: false
};

export const WithoutControls = Template.bind({});
WithoutControls.args = {
  controls: false,
  indicators: true,
  fade: false
};

export const WithoutIndicators = Template.bind({});
WithoutIndicators.args = {
  controls: true,
  indicators: false,
  fade: false
};

export const FadeTransition = Template.bind({});
FadeTransition.args = {
  controls: true,
  indicators: true,
  fade: true
};
