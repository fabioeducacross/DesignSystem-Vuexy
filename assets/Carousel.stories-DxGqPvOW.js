import{f as N,a as q}from"./snippets-m8t1HIl1.js";const F={title:"Organisms/Content/Carousel",tags:["autodocs"],parameters:{docs:{description:{component:`
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
        `}}},argTypes:{controls:{control:"boolean",description:"Mostra controles prev/next",table:{defaultValue:{summary:!0}}},indicators:{control:"boolean",description:"Mostra indicadores (dots)",table:{defaultValue:{summary:!0}}},fade:{control:"boolean",description:"Transição fade ao invés de slide",table:{defaultValue:{summary:!1}}}}},P=({controls:e=!0,indicators:t=!0,fade:s=!1})=>`<div id="carouselExample" class="carousel slide ${s?"carousel-fade":""}" data-bs-ride="carousel">
  ${t?`<div class="carousel-indicators">
    <button type="button" onclick="const carousel = this.closest('.carousel'); carousel.querySelector('.carousel-item.active').classList.remove('active'); carousel.querySelectorAll('.carousel-item')[0].classList.add('active'); this.closest('.carousel-indicators').querySelectorAll('button').forEach(b => b.classList.remove('active')); this.classList.add('active');" class="active" aria-current="true"></button>
    <button type="button" onclick="const carousel = this.closest('.carousel'); carousel.querySelector('.carousel-item.active').classList.remove('active'); carousel.querySelectorAll('.carousel-item')[1].classList.add('active'); this.closest('.carousel-indicators').querySelectorAll('button').forEach(b => b.classList.remove('active')); this.classList.add('active');"></button>
    <button type="button" onclick="const carousel = this.closest('.carousel'); carousel.querySelector('.carousel-item.active').classList.remove('active'); carousel.querySelectorAll('.carousel-item')[2].classList.add('active'); this.closest('.carousel-indicators').querySelectorAll('button').forEach(b => b.classList.remove('active')); this.classList.add('active');"></button>
  </div>`:""}
  <div class="carousel-inner">
    <div class="carousel-item active">
      <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='400'%3E%3Cdefs%3E%3ClinearGradient id='grad1' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%23696cff;stop-opacity:1'/%3E%3Cstop offset='100%25' style='stop-color:%238e92fd;stop-opacity:1'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='800' height='400' fill='url(%23grad1)'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial' font-size='24' fill='white' text-anchor='middle' dy='.35em'%3ESlide 1%3C/text%3E%3C/svg%3E" class="d-block w-100" alt="Slide 1">
    </div>
    <div class="carousel-item">
      <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='400'%3E%3Cdefs%3E%3ClinearGradient id='grad2' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%2356ca00;stop-opacity:1'/%3E%3Cstop offset='100%25' style='stop-color:%2371dd37;stop-opacity:1'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='800' height='400' fill='url(%23grad2)'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial' font-size='24' fill='white' text-anchor='middle' dy='.35em'%3ESlide 2%3C/text%3E%3C/svg%3E" class="d-block w-100" alt="Slide 2">
    </div>
    <div class="carousel-item">
      <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='400'%3E%3Cdefs%3E%3ClinearGradient id='grad3' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%23ffb400;stop-opacity:1'/%3E%3Cstop offset='100%25' style='stop-color:%23ffc107;stop-opacity:1'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='800' height='400' fill='url(%23grad3)'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial' font-size='24' fill='white' text-anchor='middle' dy='.35em'%3ESlide 3%3C/text%3E%3C/svg%3E" class="d-block w-100" alt="Slide 3">
    </div>
  </div>
  ${e?`<button class="carousel-control-prev" type="button" onclick="const carousel = this.closest('.carousel'); const items = carousel.querySelectorAll('.carousel-item'); const current = carousel.querySelector('.carousel-item.active'); const currentIdx = Array.from(items).indexOf(current); current.classList.remove('active'); items[(currentIdx - 1 + items.length) % items.length].classList.add('active');">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" onclick="const carousel = this.closest('.carousel'); const items = carousel.querySelectorAll('.carousel-item'); const current = carousel.querySelector('.carousel-item.active'); const currentIdx = Array.from(items).indexOf(current); current.classList.remove('active'); items[(currentIdx + 1) % items.length].classList.add('active');">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>`:""}
</div>`,p=e=>{const t=P(e);return`
    <div style="max-width: 800px;">
      ${t}
    </div>
    
    <hr class="my-5" />
    
    <details>
      <summary><strong>Code Snippets</strong></summary>
      <div class="mt-3">
        <h6>HTML</h6>
        <pre><code>${N(t).replace(/</g,"&lt;").replace(/>/g,"&gt;")}</code></pre>
        <h6>React</h6>
        <pre><code>${q(t,"Carousel").replace(/</g,"&lt;").replace(/>/g,"&gt;")}</code></pre>
      </div>
    </details>
  `},c=()=>{const e=v=>({prev:`const carousel = document.getElementById('${v}'); const items = carousel.querySelectorAll('.carousel-item'); const current = carousel.querySelector('.carousel-item.active'); const currentIdx = Array.from(items).indexOf(current); current.classList.remove('active'); items[(currentIdx - 1 + items.length) % items.length].classList.add('active');`,next:`const carousel = document.getElementById('${v}'); const items = carousel.querySelectorAll('.carousel-item'); const current = carousel.querySelector('.carousel-item.active'); const currentIdx = Array.from(items).indexOf(current); current.classList.remove('active'); items[(currentIdx + 1) % items.length].classList.add('active');`,indicator:T=>`const carousel = document.getElementById('${v}'); carousel.querySelector('.carousel-item.active').classList.remove('active'); carousel.querySelectorAll('.carousel-item')[${T}].classList.add('active'); this.closest('.carousel-indicators').querySelectorAll('button').forEach(b => b.classList.remove('active')); this.classList.add('active');`}),t=e("carouselDefault"),s=e("carouselCaptions"),u=e("carouselFade"),i=e("carouselTestimonials"),a=e("carouselProduct");return`
  <div class="row g-4">
    <div class="col-12">
      <h5>Default Carousel</h5>
      <div id="carouselDefault" class="carousel slide">
        <div class="carousel-indicators">
          <button type="button" onclick="${t.indicator(0)}" class="active" aria-current="true"></button>
          <button type="button" onclick="${t.indicator(1)}"></button>
          <button type="button" onclick="${t.indicator(2)}"></button>
        </div>
        <div class="carousel-inner rounded">
          <div class="carousel-item active">
            <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='400'%3E%3Cdefs%3E%3ClinearGradient id='grad1' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%23696cff;stop-opacity:1'/%3E%3Cstop offset='100%25' style='stop-color:%238e92fd;stop-opacity:1'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='800' height='400' fill='url(%23grad1)'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial' font-size='24' fill='white' text-anchor='middle' dy='.35em'%3ESlide 1%3C/text%3E%3C/svg%3E" class="d-block w-100" alt="Slide 1">
          </div>
          <div class="carousel-item">
            <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='400'%3E%3Cdefs%3E%3ClinearGradient id='grad2' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%2356ca00;stop-opacity:1'/%3E%3Cstop offset='100%25' style='stop-color:%2371dd37;stop-opacity:1'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='800' height='400' fill='url(%23grad2)'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial' font-size='24' fill='white' text-anchor='middle' dy='.35em'%3ESlide 2%3C/text%3E%3C/svg%3E" class="d-block w-100" alt="Slide 2">
          </div>
          <div class="carousel-item">
            <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='400'%3E%3Cdefs%3E%3ClinearGradient id='grad3' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%23ffb400;stop-opacity:1'/%3E%3Cstop offset='100%25' style='stop-color:%23ffc107;stop-opacity:1'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='800' height='400' fill='url(%23grad3)'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial' font-size='24' fill='white' text-anchor='middle' dy='.35em'%3ESlide 3%3C/text%3E%3C/svg%3E" class="d-block w-100" alt="Slide 3">
          </div>
        </div>
        <button class="carousel-control-prev" type="button" onclick="${t.prev}">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" onclick="${t.next}">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>
    </div>
    
    <div class="col-12 mt-5">
      <h5>With Captions</h5>
      <div id="carouselCaptions" class="carousel slide">
        <div class="carousel-indicators">
          <button type="button" onclick="${s.indicator(0)}" class="active"></button>
          <button type="button" onclick="${s.indicator(1)}"></button>
          <button type="button" onclick="${s.indicator(2)}"></button>
        </div>
        <div class="carousel-inner rounded">
          <div class="carousel-item active">
            <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='400'%3E%3Cdefs%3E%3ClinearGradient id='grad1' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%23696cff;stop-opacity:1'/%3E%3Cstop offset='100%25' style='stop-color:%238e92fd;stop-opacity:1'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='800' height='400' fill='url(%23grad1)'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial' font-size='24' fill='white' text-anchor='middle' dy='.35em'%3ESlide 1%3C/text%3E%3C/svg%3E" class="d-block w-100" alt="First slide">
            <div class="carousel-caption d-none d-md-block">
              <h5>First slide label</h5>
              <p>Some representative placeholder content for the first slide.</p>
            </div>
          </div>
          <div class="carousel-item">
            <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='400'%3E%3Cdefs%3E%3ClinearGradient id='grad2' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%2356ca00;stop-opacity:1'/%3E%3Cstop offset='100%25' style='stop-color:%2371dd37;stop-opacity:1'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='800' height='400' fill='url(%23grad2)'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial' font-size='24' fill='white' text-anchor='middle' dy='.35em'%3ESlide 2%3C/text%3E%3C/svg%3E" class="d-block w-100" alt="Second slide">
            <div class="carousel-caption d-none d-md-block">
              <h5>Second slide label</h5>
              <p>Some representative placeholder content for the second slide.</p>
            </div>
          </div>
          <div class="carousel-item">
            <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='400'%3E%3Cdefs%3E%3ClinearGradient id='grad3' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%23ffb400;stop-opacity:1'/%3E%3Cstop offset='100%25' style='stop-color:%23ffc107;stop-opacity:1'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='800' height='400' fill='url(%23grad3)'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial' font-size='24' fill='white' text-anchor='middle' dy='.35em'%3ESlide 3%3C/text%3E%3C/svg%3E" class="d-block w-100" alt="Third slide">
            <div class="carousel-caption d-none d-md-block">
              <h5>Third slide label</h5>
              <p>Some representative placeholder content for the third slide.</p>
            </div>
          </div>
        </div>
        <button class="carousel-control-prev" type="button" onclick="${s.prev}">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" onclick="${s.next}">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>
    </div>
    
    <div class="col-12 mt-5">
      <h5>Fade Transition</h5>
      <div id="carouselFade" class="carousel slide carousel-fade">
        <div class="carousel-inner rounded">
          <div class="carousel-item active">
            <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='400'%3E%3Cdefs%3E%3ClinearGradient id='grad1' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%23696cff;stop-opacity:1'/%3E%3Cstop offset='100%25' style='stop-color:%238e92fd;stop-opacity:1'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='800' height='400' fill='url(%23grad1)'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial' font-size='24' fill='white' text-anchor='middle' dy='.35em'%3ESlide 1%3C/text%3E%3C/svg%3E" class="d-block w-100" alt="Fade 1">
          </div>
          <div class="carousel-item">
            <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='400'%3E%3Cdefs%3E%3ClinearGradient id='grad2' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%2356ca00;stop-opacity:1'/%3E%3Cstop offset='100%25' style='stop-color:%2371dd37;stop-opacity:1'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='800' height='400' fill='url(%23grad2)'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial' font-size='24' fill='white' text-anchor='middle' dy='.35em'%3ESlide 2%3C/text%3E%3C/svg%3E" class="d-block w-100" alt="Fade 2">
          </div>
          <div class="carousel-item">
            <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='400'%3E%3Cdefs%3E%3ClinearGradient id='grad3' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%23ffb400;stop-opacity:1'/%3E%3Cstop offset='100%25' style='stop-color:%23ffc107;stop-opacity:1'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='800' height='400' fill='url(%23grad3)'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial' font-size='24' fill='white' text-anchor='middle' dy='.35em'%3ESlide 3%3C/text%3E%3C/svg%3E" class="d-block w-100" alt="Fade 3">
          </div>
        </div>
        <button class="carousel-control-prev" type="button" onclick="${u.prev}">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" onclick="${u.next}">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>
    </div>
    
    <div class="col-12 mt-5">
      <h5>Testimonials Carousel</h5>
      <div id="carouselTestimonials" class="carousel slide">
        <div class="carousel-indicators">
          <button type="button" onclick="${i.indicator(0)}" class="active"></button>
          <button type="button" onclick="${i.indicator(1)}"></button>
          <button type="button" onclick="${i.indicator(2)}"></button>
        </div>
        <div class="carousel-inner">
          <div class="carousel-item active">
            <div class="card">
              <div class="card-body text-center py-5">
                <div class="avatar avatar-lg mx-auto mb-3">
                  <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40'%3E%3Ccircle cx='20' cy='20' r='20' fill='%23696cff'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial' font-size='14' fill='white' text-anchor='middle' dy='.35em'%3EJD%3C/text%3E%3C/svg%3E" alt="Avatar" class="rounded-circle">
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
                  <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40'%3E%3Ccircle cx='20' cy='20' r='20' fill='%2356ca00'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial' font-size='14' fill='white' text-anchor='middle' dy='.35em'%3EJS%3C/text%3E%3C/svg%3E" alt="Avatar" class="rounded-circle">
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
                  <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40'%3E%3Ccircle cx='20' cy='20' r='20' fill='%23ffb400'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial' font-size='14' fill='white' text-anchor='middle' dy='.35em'%3EMB%3C/text%3E%3C/svg%3E" alt="Avatar" class="rounded-circle">
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
        <button class="carousel-control-prev" type="button" onclick="${i.prev}">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" onclick="${i.next}">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>
    </div>
    
    <div class="col-12 mt-5">
      <h5>Product Gallery</h5>
      <div class="row">
        <div class="col-md-8">
          <div id="carouselProduct" class="carousel slide">
            <div class="carousel-inner rounded">
              <div class="carousel-item active">
                <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='400'%3E%3Cdefs%3E%3ClinearGradient id='grad1' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%23696cff;stop-opacity:1'/%3E%3Cstop offset='100%25' style='stop-color:%238e92fd;stop-opacity:1'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='800' height='400' fill='url(%23grad1)'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial' font-size='24' fill='white' text-anchor='middle' dy='.35em'%3ESlide 1%3C/text%3E%3C/svg%3E" class="d-block w-100" alt="Product 1">
              </div>
              <div class="carousel-item">
                <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='400'%3E%3Cdefs%3E%3ClinearGradient id='grad2' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%2356ca00;stop-opacity:1'/%3E%3Cstop offset='100%25' style='stop-color:%2371dd37;stop-opacity:1'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='800' height='400' fill='url(%23grad2)'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial' font-size='24' fill='white' text-anchor='middle' dy='.35em'%3ESlide 2%3C/text%3E%3C/svg%3E" class="d-block w-100" alt="Product 2">
              </div>
              <div class="carousel-item">
                <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='400'%3E%3Cdefs%3E%3ClinearGradient id='grad3' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%23ffb400;stop-opacity:1'/%3E%3Cstop offset='100%25' style='stop-color:%23ffc107;stop-opacity:1'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='800' height='400' fill='url(%23grad3)'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial' font-size='24' fill='white' text-anchor='middle' dy='.35em'%3ESlide 3%3C/text%3E%3C/svg%3E" class="d-block w-100" alt="Product 3">
              </div>
            </div>
            <button class="carousel-control-prev" type="button" onclick="${a.prev}">
              <span class="carousel-control-prev-icon" aria-hidden="true"></span>
              <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next" type="button" onclick="${a.next}">
              <span class="carousel-control-next-icon" aria-hidden="true"></span>
              <span class="visually-hidden">Next</span>
            </button>
          </div>
        </div>
        <div class="col-md-4">
          <div class="d-grid gap-2">
            <button class="btn btn-sm btn-outline-secondary" onclick="${a.indicator(0)}">
              <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='400'%3E%3Cdefs%3E%3ClinearGradient id='grad1' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%23696cff;stop-opacity:1'/%3E%3Cstop offset='100%25' style='stop-color:%238e92fd;stop-opacity:1'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='800' height='400' fill='url(%23grad1)'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial' font-size='24' fill='white' text-anchor='middle' dy='.35em'%3ESlide 1%3C/text%3E%3C/svg%3E" class="w-100 rounded" alt="Thumb 1">
            </button>
            <button class="btn btn-sm btn-outline-secondary" onclick="${a.indicator(1)}">
              <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='400'%3E%3Cdefs%3E%3ClinearGradient id='grad2' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%2356ca00;stop-opacity:1'/%3E%3Cstop offset='100%25' style='stop-color:%2371dd37;stop-opacity:1'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='800' height='400' fill='url(%23grad2)'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial' font-size='24' fill='white' text-anchor='middle' dy='.35em'%3ESlide 2%3C/text%3E%3C/svg%3E" class="w-100 rounded" alt="Thumb 2">
            </button>
            <button class="btn btn-sm btn-outline-secondary" onclick="${a.indicator(2)}">
              <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='400'%3E%3Cdefs%3E%3ClinearGradient id='grad3' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%23ffb400;stop-opacity:1'/%3E%3Cstop offset='100%25' style='stop-color:%23ffc107;stop-opacity:1'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='800' height='400' fill='url(%23grad3)'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial' font-size='24' fill='white' text-anchor='middle' dy='.35em'%3ESlide 3%3C/text%3E%3C/svg%3E" class="w-100 rounded" alt="Thumb 3">
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  
  <div class="alert alert-info mt-5">
    <i class="bx bx-info-circle me-2"></i>
    <strong>State-Controlled Carousel:</strong> This carousel uses onclick handlers and classes toggle (no Bootstrap JS). All navigation is controlled via JavaScript state management.
  </div>
`},o=p.bind({});o.args={controls:!0,indicators:!0,fade:!1};const l=p.bind({});l.args={controls:!1,indicators:!0,fade:!1};const n=p.bind({});n.args={controls:!0,indicators:!1,fade:!1};const r=p.bind({});r.args={controls:!0,indicators:!0,fade:!0};const d={render:()=>`
      <div class="p-4" style="max-width: 800px;">
        <div class="card">
          <div class="card-header d-flex justify-content-between align-items-center">
            <h6 class="mb-0">Interactive Carousel (Controlled)</h6>
            <button id="autoplayBtn" class="btn btn-sm btn-outline-primary" onclick="toggleAutoplay()">
              <i class="ri-play-fill"></i> Autoplay
            </button>
          </div>
          <div class="card-body p-0">
            <div class="position-relative">
              <!-- Carousel Images -->
              <div id="carouselContainer" style="overflow: hidden; position: relative; height: 400px;">
                <div class="carousel-slide active" style="position: absolute; width: 100%; height: 100%; transition: opacity 0.5s ease;">
                  <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='400'%3E%3Cdefs%3E%3ClinearGradient id='grad1' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%23696cff;stop-opacity:1'/%3E%3Cstop offset='100%25' style='stop-color:%238e92fd;stop-opacity:1'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='800' height='400' fill='url(%23grad1)'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial' font-size='24' fill='white' text-anchor='middle' dy='.35em'%3ESlide 1%3C/text%3E%3C/svg%3E" class="d-block w-100" alt="Slide 1" style="object-fit: cover; height: 100%;">
                  <div class="carousel-caption d-none d-md-block" style="background: rgba(0,0,0,0.5); padding: 20px; border-radius: 8px;">
                    <h5>First Slide</h5>
                    <p>Amazing product showcase</p>
                  </div>
                </div>
                <div class="carousel-slide" style="position: absolute; width: 100%; height: 100%; opacity: 0; transition: opacity 0.5s ease;">
                  <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='400'%3E%3Cdefs%3E%3ClinearGradient id='grad2' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%2356ca00;stop-opacity:1'/%3E%3Cstop offset='100%25' style='stop-color:%2371dd37;stop-opacity:1'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='800' height='400' fill='url(%23grad2)'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial' font-size='24' fill='white' text-anchor='middle' dy='.35em'%3ESlide 2%3C/text%3E%3C/svg%3E" class="d-block w-100" alt="Slide 2" style="object-fit: cover; height: 100%;">
                  <div class="carousel-caption d-none d-md-block" style="background: rgba(0,0,0,0.5); padding: 20px; border-radius: 8px;">
                    <h5>Second Slide</h5>
                    <p>Beautiful design elements</p>
                  </div>
                </div>
                <div class="carousel-slide" style="position: absolute; width: 100%; height: 100%; opacity: 0; transition: opacity 0.5s ease;">
                  <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='400'%3E%3Cdefs%3E%3ClinearGradient id='grad3' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%23ffb400;stop-opacity:1'/%3E%3Cstop offset='100%25' style='stop-color:%23ffc107;stop-opacity:1'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='800' height='400' fill='url(%23grad3)'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial' font-size='24' fill='white' text-anchor='middle' dy='.35em'%3ESlide 3%3C/text%3E%3C/svg%3E" class="d-block w-100" alt="Slide 3" style="object-fit: cover; height: 100%;">
                  <div class="carousel-caption d-none d-md-block" style="background: rgba(0,0,0,0.5); padding: 20px; border-radius: 8px;">
                    <h5>Third Slide</h5>
                    <p>Modern interface components</p>
                  </div>
                </div>
              </div>
              
              <!-- Controls -->
              <button class="btn btn-dark position-absolute top-50 start-0 translate-middle-y ms-2" onclick="prevSlide()" style="z-index: 10;">
                <i class="ri-arrow-left-s-line"></i>
              </button>
              <button class="btn btn-dark position-absolute top-50 end-0 translate-middle-y me-2" onclick="nextSlide()" style="z-index: 10;">
                <i class="ri-arrow-right-s-line"></i>
              </button>
              
              <!-- Indicators -->
              <div class="position-absolute bottom-0 start-50 translate-middle-x mb-3" style="z-index: 10;">
                <div class="btn-group" role="group">
                  <button class="btn btn-sm btn-primary" onclick="goToSlide(0)">1</button>
                  <button class="btn btn-sm btn-outline-primary" onclick="goToSlide(1)">2</button>
                  <button class="btn btn-sm btn-outline-primary" onclick="goToSlide(2)">3</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <p class="text-muted mt-3 small">
          <i class="ri-information-line"></i> Interactive demo via controlled state (no Bootstrap JS required)
        </p>
      </div>
      
      <script>
        let currentSlide = 0;
        let autoplayInterval = null;
        const slides = document.querySelectorAll('.carousel-slide');
        const indicators = document.querySelectorAll('.btn-group button');
        
        function showSlide(index) {
          slides.forEach((slide, i) => {
            if (i === index) {
              slide.style.opacity = '1';
              slide.style.zIndex = '1';
              slide.classList.add('active');
            } else {
              slide.style.opacity = '0';
              slide.style.zIndex = '0';
              slide.classList.remove('active');
            }
          });
          
          indicators.forEach((btn, i) => {
            if (i === index) {
              btn.classList.remove('btn-outline-primary');
              btn.classList.add('btn-primary');
            } else {
              btn.classList.remove('btn-primary');
              btn.classList.add('btn-outline-primary');
            }
          });
          
          currentSlide = index;
        }
        
        function nextSlide() {
          const next = (currentSlide + 1) % slides.length;
          showSlide(next);
        }
        
        function prevSlide() {
          const prev = (currentSlide - 1 + slides.length) % slides.length;
          showSlide(prev);
        }
        
        function goToSlide(index) {
          showSlide(index);
        }
        
        function toggleAutoplay() {
          const btn = document.getElementById('autoplayBtn');
          if (autoplayInterval) {
            clearInterval(autoplayInterval);
            autoplayInterval = null;
            btn.innerHTML = '<i class="ri-play-fill"></i> Autoplay';
            btn.classList.remove('btn-primary');
            btn.classList.add('btn-outline-primary');
          } else {
            autoplayInterval = setInterval(nextSlide, 3000);
            btn.innerHTML = '<i class="ri-pause-fill"></i> Pause';
            btn.classList.remove('btn-outline-primary');
            btn.classList.add('btn-primary');
          }
        }
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
          if (e.key === 'ArrowLeft') prevSlide();
          if (e.key === 'ArrowRight') nextSlide();
        });
      <\/script>
    `,parameters:{docs:{description:{story:"Demo interativo com controle de estado manual (sem Bootstrap JS). Use setas do teclado, botões de navegação ou indicadores para navegar. Autoplay opcional."}}}};var m,g,f;c.parameters={...c.parameters,docs:{...(m=c.parameters)==null?void 0:m.docs,source:{originalSource:`() => {
  // Helper function to create carousel navigation handlers
  const createCarouselNavigation = carouselId => {
    return {
      prev: \`const carousel = document.getElementById('\${carouselId}'); const items = carousel.querySelectorAll('.carousel-item'); const current = carousel.querySelector('.carousel-item.active'); const currentIdx = Array.from(items).indexOf(current); current.classList.remove('active'); items[(currentIdx - 1 + items.length) % items.length].classList.add('active');\`,
      next: \`const carousel = document.getElementById('\${carouselId}'); const items = carousel.querySelectorAll('.carousel-item'); const current = carousel.querySelector('.carousel-item.active'); const currentIdx = Array.from(items).indexOf(current); current.classList.remove('active'); items[(currentIdx + 1) % items.length].classList.add('active');\`,
      indicator: index => \`const carousel = document.getElementById('\${carouselId}'); carousel.querySelector('.carousel-item.active').classList.remove('active'); carousel.querySelectorAll('.carousel-item')[\${index}].classList.add('active'); this.closest('.carousel-indicators').querySelectorAll('button').forEach(b => b.classList.remove('active')); this.classList.add('active');\`
    };
  };
  const defaultNav = createCarouselNavigation('carouselDefault');
  const captionsNav = createCarouselNavigation('carouselCaptions');
  const fadeNav = createCarouselNavigation('carouselFade');
  const testimonialsNav = createCarouselNavigation('carouselTestimonials');
  const productNav = createCarouselNavigation('carouselProduct');
  return \`
  <div class="row g-4">
    <div class="col-12">
      <h5>Default Carousel</h5>
      <div id="carouselDefault" class="carousel slide">
        <div class="carousel-indicators">
          <button type="button" onclick="\${defaultNav.indicator(0)}" class="active" aria-current="true"></button>
          <button type="button" onclick="\${defaultNav.indicator(1)}"></button>
          <button type="button" onclick="\${defaultNav.indicator(2)}"></button>
        </div>
        <div class="carousel-inner rounded">
          <div class="carousel-item active">
            <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='400'%3E%3Cdefs%3E%3ClinearGradient id='grad1' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%23696cff;stop-opacity:1'/%3E%3Cstop offset='100%25' style='stop-color:%238e92fd;stop-opacity:1'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='800' height='400' fill='url(%23grad1)'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial' font-size='24' fill='white' text-anchor='middle' dy='.35em'%3ESlide 1%3C/text%3E%3C/svg%3E" class="d-block w-100" alt="Slide 1">
          </div>
          <div class="carousel-item">
            <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='400'%3E%3Cdefs%3E%3ClinearGradient id='grad2' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%2356ca00;stop-opacity:1'/%3E%3Cstop offset='100%25' style='stop-color:%2371dd37;stop-opacity:1'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='800' height='400' fill='url(%23grad2)'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial' font-size='24' fill='white' text-anchor='middle' dy='.35em'%3ESlide 2%3C/text%3E%3C/svg%3E" class="d-block w-100" alt="Slide 2">
          </div>
          <div class="carousel-item">
            <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='400'%3E%3Cdefs%3E%3ClinearGradient id='grad3' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%23ffb400;stop-opacity:1'/%3E%3Cstop offset='100%25' style='stop-color:%23ffc107;stop-opacity:1'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='800' height='400' fill='url(%23grad3)'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial' font-size='24' fill='white' text-anchor='middle' dy='.35em'%3ESlide 3%3C/text%3E%3C/svg%3E" class="d-block w-100" alt="Slide 3">
          </div>
        </div>
        <button class="carousel-control-prev" type="button" onclick="\${defaultNav.prev}">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" onclick="\${defaultNav.next}">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>
    </div>
    
    <div class="col-12 mt-5">
      <h5>With Captions</h5>
      <div id="carouselCaptions" class="carousel slide">
        <div class="carousel-indicators">
          <button type="button" onclick="\${captionsNav.indicator(0)}" class="active"></button>
          <button type="button" onclick="\${captionsNav.indicator(1)}"></button>
          <button type="button" onclick="\${captionsNav.indicator(2)}"></button>
        </div>
        <div class="carousel-inner rounded">
          <div class="carousel-item active">
            <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='400'%3E%3Cdefs%3E%3ClinearGradient id='grad1' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%23696cff;stop-opacity:1'/%3E%3Cstop offset='100%25' style='stop-color:%238e92fd;stop-opacity:1'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='800' height='400' fill='url(%23grad1)'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial' font-size='24' fill='white' text-anchor='middle' dy='.35em'%3ESlide 1%3C/text%3E%3C/svg%3E" class="d-block w-100" alt="First slide">
            <div class="carousel-caption d-none d-md-block">
              <h5>First slide label</h5>
              <p>Some representative placeholder content for the first slide.</p>
            </div>
          </div>
          <div class="carousel-item">
            <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='400'%3E%3Cdefs%3E%3ClinearGradient id='grad2' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%2356ca00;stop-opacity:1'/%3E%3Cstop offset='100%25' style='stop-color:%2371dd37;stop-opacity:1'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='800' height='400' fill='url(%23grad2)'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial' font-size='24' fill='white' text-anchor='middle' dy='.35em'%3ESlide 2%3C/text%3E%3C/svg%3E" class="d-block w-100" alt="Second slide">
            <div class="carousel-caption d-none d-md-block">
              <h5>Second slide label</h5>
              <p>Some representative placeholder content for the second slide.</p>
            </div>
          </div>
          <div class="carousel-item">
            <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='400'%3E%3Cdefs%3E%3ClinearGradient id='grad3' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%23ffb400;stop-opacity:1'/%3E%3Cstop offset='100%25' style='stop-color:%23ffc107;stop-opacity:1'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='800' height='400' fill='url(%23grad3)'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial' font-size='24' fill='white' text-anchor='middle' dy='.35em'%3ESlide 3%3C/text%3E%3C/svg%3E" class="d-block w-100" alt="Third slide">
            <div class="carousel-caption d-none d-md-block">
              <h5>Third slide label</h5>
              <p>Some representative placeholder content for the third slide.</p>
            </div>
          </div>
        </div>
        <button class="carousel-control-prev" type="button" onclick="\${captionsNav.prev}">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" onclick="\${captionsNav.next}">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>
    </div>
    
    <div class="col-12 mt-5">
      <h5>Fade Transition</h5>
      <div id="carouselFade" class="carousel slide carousel-fade">
        <div class="carousel-inner rounded">
          <div class="carousel-item active">
            <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='400'%3E%3Cdefs%3E%3ClinearGradient id='grad1' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%23696cff;stop-opacity:1'/%3E%3Cstop offset='100%25' style='stop-color:%238e92fd;stop-opacity:1'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='800' height='400' fill='url(%23grad1)'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial' font-size='24' fill='white' text-anchor='middle' dy='.35em'%3ESlide 1%3C/text%3E%3C/svg%3E" class="d-block w-100" alt="Fade 1">
          </div>
          <div class="carousel-item">
            <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='400'%3E%3Cdefs%3E%3ClinearGradient id='grad2' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%2356ca00;stop-opacity:1'/%3E%3Cstop offset='100%25' style='stop-color:%2371dd37;stop-opacity:1'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='800' height='400' fill='url(%23grad2)'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial' font-size='24' fill='white' text-anchor='middle' dy='.35em'%3ESlide 2%3C/text%3E%3C/svg%3E" class="d-block w-100" alt="Fade 2">
          </div>
          <div class="carousel-item">
            <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='400'%3E%3Cdefs%3E%3ClinearGradient id='grad3' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%23ffb400;stop-opacity:1'/%3E%3Cstop offset='100%25' style='stop-color:%23ffc107;stop-opacity:1'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='800' height='400' fill='url(%23grad3)'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial' font-size='24' fill='white' text-anchor='middle' dy='.35em'%3ESlide 3%3C/text%3E%3C/svg%3E" class="d-block w-100" alt="Fade 3">
          </div>
        </div>
        <button class="carousel-control-prev" type="button" onclick="\${fadeNav.prev}">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" onclick="\${fadeNav.next}">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>
    </div>
    
    <div class="col-12 mt-5">
      <h5>Testimonials Carousel</h5>
      <div id="carouselTestimonials" class="carousel slide">
        <div class="carousel-indicators">
          <button type="button" onclick="\${testimonialsNav.indicator(0)}" class="active"></button>
          <button type="button" onclick="\${testimonialsNav.indicator(1)}"></button>
          <button type="button" onclick="\${testimonialsNav.indicator(2)}"></button>
        </div>
        <div class="carousel-inner">
          <div class="carousel-item active">
            <div class="card">
              <div class="card-body text-center py-5">
                <div class="avatar avatar-lg mx-auto mb-3">
                  <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40'%3E%3Ccircle cx='20' cy='20' r='20' fill='%23696cff'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial' font-size='14' fill='white' text-anchor='middle' dy='.35em'%3EJD%3C/text%3E%3C/svg%3E" alt="Avatar" class="rounded-circle">
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
                  <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40'%3E%3Ccircle cx='20' cy='20' r='20' fill='%2356ca00'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial' font-size='14' fill='white' text-anchor='middle' dy='.35em'%3EJS%3C/text%3E%3C/svg%3E" alt="Avatar" class="rounded-circle">
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
                  <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40'%3E%3Ccircle cx='20' cy='20' r='20' fill='%23ffb400'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial' font-size='14' fill='white' text-anchor='middle' dy='.35em'%3EMB%3C/text%3E%3C/svg%3E" alt="Avatar" class="rounded-circle">
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
        <button class="carousel-control-prev" type="button" onclick="\${testimonialsNav.prev}">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" onclick="\${testimonialsNav.next}">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>
    </div>
    
    <div class="col-12 mt-5">
      <h5>Product Gallery</h5>
      <div class="row">
        <div class="col-md-8">
          <div id="carouselProduct" class="carousel slide">
            <div class="carousel-inner rounded">
              <div class="carousel-item active">
                <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='400'%3E%3Cdefs%3E%3ClinearGradient id='grad1' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%23696cff;stop-opacity:1'/%3E%3Cstop offset='100%25' style='stop-color:%238e92fd;stop-opacity:1'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='800' height='400' fill='url(%23grad1)'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial' font-size='24' fill='white' text-anchor='middle' dy='.35em'%3ESlide 1%3C/text%3E%3C/svg%3E" class="d-block w-100" alt="Product 1">
              </div>
              <div class="carousel-item">
                <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='400'%3E%3Cdefs%3E%3ClinearGradient id='grad2' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%2356ca00;stop-opacity:1'/%3E%3Cstop offset='100%25' style='stop-color:%2371dd37;stop-opacity:1'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='800' height='400' fill='url(%23grad2)'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial' font-size='24' fill='white' text-anchor='middle' dy='.35em'%3ESlide 2%3C/text%3E%3C/svg%3E" class="d-block w-100" alt="Product 2">
              </div>
              <div class="carousel-item">
                <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='400'%3E%3Cdefs%3E%3ClinearGradient id='grad3' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%23ffb400;stop-opacity:1'/%3E%3Cstop offset='100%25' style='stop-color:%23ffc107;stop-opacity:1'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='800' height='400' fill='url(%23grad3)'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial' font-size='24' fill='white' text-anchor='middle' dy='.35em'%3ESlide 3%3C/text%3E%3C/svg%3E" class="d-block w-100" alt="Product 3">
              </div>
            </div>
            <button class="carousel-control-prev" type="button" onclick="\${productNav.prev}">
              <span class="carousel-control-prev-icon" aria-hidden="true"></span>
              <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next" type="button" onclick="\${productNav.next}">
              <span class="carousel-control-next-icon" aria-hidden="true"></span>
              <span class="visually-hidden">Next</span>
            </button>
          </div>
        </div>
        <div class="col-md-4">
          <div class="d-grid gap-2">
            <button class="btn btn-sm btn-outline-secondary" onclick="\${productNav.indicator(0)}">
              <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='400'%3E%3Cdefs%3E%3ClinearGradient id='grad1' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%23696cff;stop-opacity:1'/%3E%3Cstop offset='100%25' style='stop-color:%238e92fd;stop-opacity:1'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='800' height='400' fill='url(%23grad1)'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial' font-size='24' fill='white' text-anchor='middle' dy='.35em'%3ESlide 1%3C/text%3E%3C/svg%3E" class="w-100 rounded" alt="Thumb 1">
            </button>
            <button class="btn btn-sm btn-outline-secondary" onclick="\${productNav.indicator(1)}">
              <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='400'%3E%3Cdefs%3E%3ClinearGradient id='grad2' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%2356ca00;stop-opacity:1'/%3E%3Cstop offset='100%25' style='stop-color:%2371dd37;stop-opacity:1'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='800' height='400' fill='url(%23grad2)'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial' font-size='24' fill='white' text-anchor='middle' dy='.35em'%3ESlide 2%3C/text%3E%3C/svg%3E" class="w-100 rounded" alt="Thumb 2">
            </button>
            <button class="btn btn-sm btn-outline-secondary" onclick="\${productNav.indicator(2)}">
              <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='400'%3E%3Cdefs%3E%3ClinearGradient id='grad3' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%23ffb400;stop-opacity:1'/%3E%3Cstop offset='100%25' style='stop-color:%23ffc107;stop-opacity:1'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='800' height='400' fill='url(%23grad3)'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial' font-size='24' fill='white' text-anchor='middle' dy='.35em'%3ESlide 3%3C/text%3E%3C/svg%3E" class="w-100 rounded" alt="Thumb 3">
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  
  <div class="alert alert-info mt-5">
    <i class="bx bx-info-circle me-2"></i>
    <strong>State-Controlled Carousel:</strong> This carousel uses onclick handlers and classes toggle (no Bootstrap JS). All navigation is controlled via JavaScript state management.
  </div>
\`;
}`,...(f=(g=c.parameters)==null?void 0:g.docs)==null?void 0:f.source}}};var h,y,x;o.parameters={...o.parameters,docs:{...(h=o.parameters)==null?void 0:h.docs,source:{originalSource:`args => {
  const markup = createCarousel(args);
  return \`
    <div style="max-width: 800px;">
      \${markup}
    </div>
    
    <hr class="my-5" />
    
    <details>
      <summary><strong>Code Snippets</strong></summary>
      <div class="mt-3">
        <h6>HTML</h6>
        <pre><code>\${formatHtmlSnippet(markup).replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
        <h6>React</h6>
        <pre><code>\${formatReactSnippet(markup, 'Carousel').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
      </div>
    </details>
  \`;
}`,...(x=(y=o.parameters)==null?void 0:y.docs)==null?void 0:x.source}}};var C,b,E;l.parameters={...l.parameters,docs:{...(C=l.parameters)==null?void 0:C.docs,source:{originalSource:`args => {
  const markup = createCarousel(args);
  return \`
    <div style="max-width: 800px;">
      \${markup}
    </div>
    
    <hr class="my-5" />
    
    <details>
      <summary><strong>Code Snippets</strong></summary>
      <div class="mt-3">
        <h6>HTML</h6>
        <pre><code>\${formatHtmlSnippet(markup).replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
        <h6>React</h6>
        <pre><code>\${formatReactSnippet(markup, 'Carousel').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
      </div>
    </details>
  \`;
}`,...(E=(b=l.parameters)==null?void 0:b.docs)==null?void 0:E.source}}};var w,S,k;n.parameters={...n.parameters,docs:{...(w=n.parameters)==null?void 0:w.docs,source:{originalSource:`args => {
  const markup = createCarousel(args);
  return \`
    <div style="max-width: 800px;">
      \${markup}
    </div>
    
    <hr class="my-5" />
    
    <details>
      <summary><strong>Code Snippets</strong></summary>
      <div class="mt-3">
        <h6>HTML</h6>
        <pre><code>\${formatHtmlSnippet(markup).replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
        <h6>React</h6>
        <pre><code>\${formatReactSnippet(markup, 'Carousel').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
      </div>
    </details>
  \`;
}`,...(k=(S=n.parameters)==null?void 0:S.docs)==null?void 0:k.source}}};var A,G,L;r.parameters={...r.parameters,docs:{...(A=r.parameters)==null?void 0:A.docs,source:{originalSource:`args => {
  const markup = createCarousel(args);
  return \`
    <div style="max-width: 800px;">
      \${markup}
    </div>
    
    <hr class="my-5" />
    
    <details>
      <summary><strong>Code Snippets</strong></summary>
      <div class="mt-3">
        <h6>HTML</h6>
        <pre><code>\${formatHtmlSnippet(markup).replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
        <h6>React</h6>
        <pre><code>\${formatReactSnippet(markup, 'Carousel').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
      </div>
    </details>
  \`;
}`,...(L=(G=r.parameters)==null?void 0:G.docs)==null?void 0:L.source}}};var $,z,I;d.parameters={...d.parameters,docs:{...($=d.parameters)==null?void 0:$.docs,source:{originalSource:`{
  render: () => {
    return \`
      <div class="p-4" style="max-width: 800px;">
        <div class="card">
          <div class="card-header d-flex justify-content-between align-items-center">
            <h6 class="mb-0">Interactive Carousel (Controlled)</h6>
            <button id="autoplayBtn" class="btn btn-sm btn-outline-primary" onclick="toggleAutoplay()">
              <i class="ri-play-fill"></i> Autoplay
            </button>
          </div>
          <div class="card-body p-0">
            <div class="position-relative">
              <!-- Carousel Images -->
              <div id="carouselContainer" style="overflow: hidden; position: relative; height: 400px;">
                <div class="carousel-slide active" style="position: absolute; width: 100%; height: 100%; transition: opacity 0.5s ease;">
                  <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='400'%3E%3Cdefs%3E%3ClinearGradient id='grad1' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%23696cff;stop-opacity:1'/%3E%3Cstop offset='100%25' style='stop-color:%238e92fd;stop-opacity:1'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='800' height='400' fill='url(%23grad1)'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial' font-size='24' fill='white' text-anchor='middle' dy='.35em'%3ESlide 1%3C/text%3E%3C/svg%3E" class="d-block w-100" alt="Slide 1" style="object-fit: cover; height: 100%;">
                  <div class="carousel-caption d-none d-md-block" style="background: rgba(0,0,0,0.5); padding: 20px; border-radius: 8px;">
                    <h5>First Slide</h5>
                    <p>Amazing product showcase</p>
                  </div>
                </div>
                <div class="carousel-slide" style="position: absolute; width: 100%; height: 100%; opacity: 0; transition: opacity 0.5s ease;">
                  <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='400'%3E%3Cdefs%3E%3ClinearGradient id='grad2' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%2356ca00;stop-opacity:1'/%3E%3Cstop offset='100%25' style='stop-color:%2371dd37;stop-opacity:1'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='800' height='400' fill='url(%23grad2)'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial' font-size='24' fill='white' text-anchor='middle' dy='.35em'%3ESlide 2%3C/text%3E%3C/svg%3E" class="d-block w-100" alt="Slide 2" style="object-fit: cover; height: 100%;">
                  <div class="carousel-caption d-none d-md-block" style="background: rgba(0,0,0,0.5); padding: 20px; border-radius: 8px;">
                    <h5>Second Slide</h5>
                    <p>Beautiful design elements</p>
                  </div>
                </div>
                <div class="carousel-slide" style="position: absolute; width: 100%; height: 100%; opacity: 0; transition: opacity 0.5s ease;">
                  <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='400'%3E%3Cdefs%3E%3ClinearGradient id='grad3' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%23ffb400;stop-opacity:1'/%3E%3Cstop offset='100%25' style='stop-color:%23ffc107;stop-opacity:1'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='800' height='400' fill='url(%23grad3)'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial' font-size='24' fill='white' text-anchor='middle' dy='.35em'%3ESlide 3%3C/text%3E%3C/svg%3E" class="d-block w-100" alt="Slide 3" style="object-fit: cover; height: 100%;">
                  <div class="carousel-caption d-none d-md-block" style="background: rgba(0,0,0,0.5); padding: 20px; border-radius: 8px;">
                    <h5>Third Slide</h5>
                    <p>Modern interface components</p>
                  </div>
                </div>
              </div>
              
              <!-- Controls -->
              <button class="btn btn-dark position-absolute top-50 start-0 translate-middle-y ms-2" onclick="prevSlide()" style="z-index: 10;">
                <i class="ri-arrow-left-s-line"></i>
              </button>
              <button class="btn btn-dark position-absolute top-50 end-0 translate-middle-y me-2" onclick="nextSlide()" style="z-index: 10;">
                <i class="ri-arrow-right-s-line"></i>
              </button>
              
              <!-- Indicators -->
              <div class="position-absolute bottom-0 start-50 translate-middle-x mb-3" style="z-index: 10;">
                <div class="btn-group" role="group">
                  <button class="btn btn-sm btn-primary" onclick="goToSlide(0)">1</button>
                  <button class="btn btn-sm btn-outline-primary" onclick="goToSlide(1)">2</button>
                  <button class="btn btn-sm btn-outline-primary" onclick="goToSlide(2)">3</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <p class="text-muted mt-3 small">
          <i class="ri-information-line"></i> Interactive demo via controlled state (no Bootstrap JS required)
        </p>
      </div>
      
      <script>
        let currentSlide = 0;
        let autoplayInterval = null;
        const slides = document.querySelectorAll('.carousel-slide');
        const indicators = document.querySelectorAll('.btn-group button');
        
        function showSlide(index) {
          slides.forEach((slide, i) => {
            if (i === index) {
              slide.style.opacity = '1';
              slide.style.zIndex = '1';
              slide.classList.add('active');
            } else {
              slide.style.opacity = '0';
              slide.style.zIndex = '0';
              slide.classList.remove('active');
            }
          });
          
          indicators.forEach((btn, i) => {
            if (i === index) {
              btn.classList.remove('btn-outline-primary');
              btn.classList.add('btn-primary');
            } else {
              btn.classList.remove('btn-primary');
              btn.classList.add('btn-outline-primary');
            }
          });
          
          currentSlide = index;
        }
        
        function nextSlide() {
          const next = (currentSlide + 1) % slides.length;
          showSlide(next);
        }
        
        function prevSlide() {
          const prev = (currentSlide - 1 + slides.length) % slides.length;
          showSlide(prev);
        }
        
        function goToSlide(index) {
          showSlide(index);
        }
        
        function toggleAutoplay() {
          const btn = document.getElementById('autoplayBtn');
          if (autoplayInterval) {
            clearInterval(autoplayInterval);
            autoplayInterval = null;
            btn.innerHTML = '<i class="ri-play-fill"></i> Autoplay';
            btn.classList.remove('btn-primary');
            btn.classList.add('btn-outline-primary');
          } else {
            autoplayInterval = setInterval(nextSlide, 3000);
            btn.innerHTML = '<i class="ri-pause-fill"></i> Pause';
            btn.classList.remove('btn-outline-primary');
            btn.classList.add('btn-primary');
          }
        }
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
          if (e.key === 'ArrowLeft') prevSlide();
          if (e.key === 'ArrowRight') nextSlide();
        });
      <\/script>
    \`;
  },
  parameters: {
    docs: {
      description: {
        story: 'Demo interativo com controle de estado manual (sem Bootstrap JS). Use setas do teclado, botões de navegação ou indicadores para navegar. Autoplay opcional.'
      }
    }
  }
}`,...(I=(z=d.parameters)==null?void 0:z.docs)==null?void 0:I.source}}};const H=["Overview","Default","WithoutControls","WithoutIndicators","FadeTransition","Interactive"];export{o as Default,r as FadeTransition,d as Interactive,c as Overview,l as WithoutControls,n as WithoutIndicators,H as __namedExportsOrder,F as default};
