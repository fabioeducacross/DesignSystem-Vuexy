import{f as H}from"./snippets-m8t1HIl1.js";const U={title:"Vuexy/Organisms/Commerce/PricingTable",tags:["autodocs"],parameters:{docs:{description:{component:`
# Pricing Table

Tabelas de comparação para planos e preços de serviços.

## Quando usar
- Páginas de pricing
- Comparação de planos
- Upgrade/downgrade de conta
- Landing pages
- SaaS products
- Subscription services

## Características
- Layout responsivo em grid
- Plano destacado (popular/recommended)
- Lista de features por plano
- Call-to-action buttons
- Preços com período (mensal/anual)
- Badge de recomendação
- Suporte a billing toggle (monthly/yearly)

## Elementos
- Card de plano
- Título do plano
- Preço + período
- Lista de features
- Botão de ação
- Badge opcional (popular, best value)
- Ícones de features

## Variações
- 2, 3 ou 4 colunas
- Com/sem plano gratuito
- Mensal vs Anual
- Features limitadas vs ilimitadas

## Acessibilidade
- Contraste adequado
- Destaque visual do plano recomendado
- Botões claramente identificados
        `}}},argTypes:{columns:{control:"select",options:[2,3,4],description:"Número de colunas",table:{defaultValue:{summary:3}}},period:{control:"select",options:["monthly","yearly"],description:"Período de cobrança",table:{defaultValue:{summary:"monthly"}}}}},q=({columns:e=3,period:c="monthly"})=>{const u=c==="yearly",d=u?.8:1,B=[{name:"Basic",price:Math.round(19*d),description:"A simple start for everyone",features:[{text:"100 responses a month",included:!0},{text:"Unlimited forms and surveys",included:!0},{text:"Unlimited fields",included:!0},{text:"Basic reporting and analytics",included:!0},{text:"Up to 2 subdomains",included:!0}],cta:"Start Free Trial",variant:"outline-primary"},{name:"Standard",price:Math.round(49*d),description:"For small to medium businesses",features:[{text:"Unlimited responses",included:!0},{text:"Unlimited forms and surveys",included:!0},{text:"Instagram profile page",included:!0},{text:"Google Docs integration",included:!0},{text:'Custom "Thank you" page',included:!0}],popular:!0,cta:"Get Started",variant:"primary"},{name:"Enterprise",price:Math.round(99*d),description:"Solution for big organizations",features:[{text:"PayPal payments",included:!0},{text:"Logic Jumps",included:!0},{text:"File upload with 5GB storage",included:!0},{text:"Custom domain support",included:!0},{text:"Stripe integration",included:!0}],cta:"Contact Us",variant:"outline-primary"}],M=e===2?"col-md-6":e===3?"col-lg-4":"col-lg-3";return`<div class="pricing-wrapper">
  <div class="container">
    <!-- Header -->
    <div class="text-center mb-5">
      <h2 class="mb-2">Pricing Plans</h2>
      <p class="text-muted mb-4">
        All plans include 40+ advanced tools and features to boost your product.
        <br>
        Choose the best plan to fit your needs.
      </p>
      
      <!-- Billing Toggle -->
      <div class="d-flex align-items-center justify-content-center gap-3">
        <label class="switch">
          <span class="switch-label">Monthly</span>
        </label>
        <div class="form-check form-switch mb-0">
          <input class="form-check-input" type="checkbox" id="pricingSwitch" ${u?"checked":""}>
        </div>
        <label class="switch">
          <span class="switch-label">Annually</span>
        </label>
        <span class="badge bg-label-primary">Save 20%</span>
      </div>
    </div>
    
    <!-- Pricing Cards -->
    <div class="row g-4 justify-content-center">
      ${B.slice(0,e).map(s=>`
      <div class="${M}">
        <div class="card ${s.popular?"border-primary shadow-lg":""}">
          ${s.popular?`
          <div class="position-absolute top-0 start-50 translate-middle">
            <span class="badge bg-primary rounded-pill px-3 py-2">Popular</span>
          </div>
          `:""}
          
          <div class="card-body ${s.popular?"pt-5":""}">
            <div class="text-center mb-4">
              <h3 class="mb-2">${s.name}</h3>
              <p class="text-muted mb-4">${s.description}</p>
              
              <div class="mb-4">
                <sup class="h5 text-muted fw-normal">$</sup>
                <span class="display-3 fw-bold">${s.price}</span>
                <sub class="h5 text-muted fw-normal">/month</sub>
              </div>
            </div>
            
            <ul class="list-unstyled mb-4">
              ${s.features.map(m=>`
              <li class="mb-3">
                <i class="bx bx-check text-${m.included?"success":"muted"} me-2"></i>
                <span class="${m.included?"":"text-muted"}">${m.text}</span>
              </li>
              `).join("")}
            </ul>
            
            <button class="btn btn-${s.variant} w-100">
              ${s.cta}
            </button>
          </div>
        </div>
      </div>
      `).join("")}
    </div>
    
    <!-- FAQ Link -->
    <div class="text-center mt-5">
      <p class="text-muted">
        Still not convinced? Start with a 14-day FREE trial!
      </p>
    </div>
  </div>
</div>

<style>
.pricing-wrapper {
  padding: 3rem 0;
}

.card {
  position: relative;
  transition: transform 0.3s ease;
}

.card:hover {
  transform: translateY(-10px);
}

.card.border-primary {
  border-width: 2px;
}

.switch-label {
  font-weight: 500;
  color: #697a8d;
}
</style>`},o=e=>{const c=q(e);return`
    ${c}
    
    <hr class="my-5" />
    
    <details>
      <summary><strong>Code Snippets</strong></summary>
      <div class="mt-3">
        <h6>HTML</h6>
        <pre><code>${H(c).replace(/</g,"&lt;").replace(/>/g,"&gt;")}</code></pre>
      </div>
    </details>
  `},n=()=>q({columns:3,period:"monthly"}),t=o.bind({});t.args={columns:3,period:"monthly"};const a=o.bind({});a.args={columns:3,period:"yearly"};const r=o.bind({});r.args={columns:2,period:"monthly"};const i=o.bind({});i.args={columns:4,period:"monthly"};const l=()=>{const e="pricing-interactive-"+Math.random().toString(36).substr(2,9);return`
    <div id="${e}" style="max-width: 1200px;">
      <div class="alert alert-info mb-4">
        <i class="bx bx-info-circle me-2"></i>
        <strong>Interactive Demo:</strong> Click on "Select Plan" buttons to see selection feedback.
      </div>
      
      <div class="row g-4">
        <div class="col-md-4">
          <div class="card" id="basic-${e}">
            <div class="card-body text-center">
              <h5 class="card-title">Basic</h5>
              <div class="my-4">
                <h2 class="mb-0">$9<small class="text-muted">/mo</small></h2>
              </div>
              <ul class="list-unstyled text-start mb-4">
                <li class="mb-2"><i class="bx bx-check text-success me-2"></i>10 Projects</li>
                <li class="mb-2"><i class="bx bx-check text-success me-2"></i>5GB Storage</li>
                <li class="mb-2"><i class="bx bx-check text-success me-2"></i>Email Support</li>
              </ul>
              <button class="btn btn-outline-primary w-100" onclick="
                document.querySelectorAll('[id*="pricing-interactive"] .card').forEach(c => c.classList.remove('border-primary'));
                document.querySelectorAll('[id*="pricing-interactive"] .btn').forEach(b => { b.classList.remove('btn-primary'); b.classList.add('btn-outline-primary'); b.textContent = 'Select Plan'; });
                this.classList.remove('btn-outline-primary');
                this.classList.add('btn-primary');
                this.textContent = '✓ Selected';
                this.closest('.card').classList.add('border-primary');
              ">Select Plan</button>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="card border-primary" id="pro-${e}">
            <div class="card-body text-center">
              <span class="badge bg-primary mb-2">Popular</span>
              <h5 class="card-title">Professional</h5>
              <div class="my-4">
                <h2 class="mb-0">$29<small class="text-muted">/mo</small></h2>
              </div>
              <ul class="list-unstyled text-start mb-4">
                <li class="mb-2"><i class="bx bx-check text-success me-2"></i>Unlimited Projects</li>
                <li class="mb-2"><i class="bx bx-check text-success me-2"></i>50GB Storage</li>
                <li class="mb-2"><i class="bx bx-check text-success me-2"></i>Priority Support</li>
                <li class="mb-2"><i class="bx bx-check text-success me-2"></i>Advanced Features</li>
              </ul>
              <button class="btn btn-primary w-100" onclick="
                document.querySelectorAll('[id*="pricing-interactive"] .card').forEach(c => c.classList.remove('border-primary'));
                document.querySelectorAll('[id*="pricing-interactive"] .btn').forEach(b => { b.classList.remove('btn-primary'); b.classList.add('btn-outline-primary'); b.textContent = 'Select Plan'; });
                this.classList.remove('btn-outline-primary');
                this.classList.add('btn-primary');
                this.textContent = '✓ Selected';
                this.closest('.card').classList.add('border-primary');
              ">✓ Selected</button>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="card" id="enterprise-${e}">
            <div class="card-body text-center">
              <h5 class="card-title">Enterprise</h5>
              <div class="my-4">
                <h2 class="mb-0">$99<small class="text-muted">/mo</small></h2>
              </div>
              <ul class="list-unstyled text-start mb-4">
                <li class="mb-2"><i class="bx bx-check text-success me-2"></i>Everything in Pro</li>
                <li class="mb-2"><i class="bx bx-check text-success me-2"></i>Unlimited Storage</li>
                <li class="mb-2"><i class="bx bx-check text-success me-2"></i>24/7 Support</li>
                <li class="mb-2"><i class="bx bx-check text-success me-2"></i>Custom Solutions</li>
              </ul>
              <button class="btn btn-outline-primary w-100" onclick="
                document.querySelectorAll('[id*="pricing-interactive"] .card').forEach(c => c.classList.remove('border-primary'));
                document.querySelectorAll('[id*="pricing-interactive"] .btn').forEach(b => { b.classList.remove('btn-primary'); b.classList.add('btn-outline-primary'); b.textContent = 'Select Plan'; });
                this.classList.remove('btn-outline-primary');
                this.classList.add('btn-primary');
                this.textContent = '✓ Selected';
                this.closest('.card').classList.add('border-primary');
              ">Select Plan</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `};var p,b,v;n.parameters={...n.parameters,docs:{...(p=n.parameters)==null?void 0:p.docs,source:{originalSource:`() => createPricingTable({
  columns: 3,
  period: 'monthly'
})`,...(v=(b=n.parameters)==null?void 0:b.docs)==null?void 0:v.source}}};var y,h,x;t.parameters={...t.parameters,docs:{...(y=t.parameters)==null?void 0:y.docs,source:{originalSource:`args => {
  const markup = createPricingTable(args);
  return \`
    \${markup}
    
    <hr class="my-5" />
    
    <details>
      <summary><strong>Code Snippets</strong></summary>
      <div class="mt-3">
        <h6>HTML</h6>
        <pre><code>\${formatHtmlSnippet(markup).replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
      </div>
    </details>
  \`;
}`,...(x=(h=t.parameters)==null?void 0:h.docs)==null?void 0:x.source}}};var g,S,f;a.parameters={...a.parameters,docs:{...(g=a.parameters)==null?void 0:g.docs,source:{originalSource:`args => {
  const markup = createPricingTable(args);
  return \`
    \${markup}
    
    <hr class="my-5" />
    
    <details>
      <summary><strong>Code Snippets</strong></summary>
      <div class="mt-3">
        <h6>HTML</h6>
        <pre><code>\${formatHtmlSnippet(markup).replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
      </div>
    </details>
  \`;
}`,...(f=(S=a.parameters)==null?void 0:S.docs)==null?void 0:f.source}}};var k,L,P;r.parameters={...r.parameters,docs:{...(k=r.parameters)==null?void 0:k.docs,source:{originalSource:`args => {
  const markup = createPricingTable(args);
  return \`
    \${markup}
    
    <hr class="my-5" />
    
    <details>
      <summary><strong>Code Snippets</strong></summary>
      <div class="mt-3">
        <h6>HTML</h6>
        <pre><code>\${formatHtmlSnippet(markup).replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
      </div>
    </details>
  \`;
}`,...(P=(L=r.parameters)==null?void 0:L.docs)==null?void 0:P.source}}};var C,$,w;i.parameters={...i.parameters,docs:{...(C=i.parameters)==null?void 0:C.docs,source:{originalSource:`args => {
  const markup = createPricingTable(args);
  return \`
    \${markup}
    
    <hr class="my-5" />
    
    <details>
      <summary><strong>Code Snippets</strong></summary>
      <div class="mt-3">
        <h6>HTML</h6>
        <pre><code>\${formatHtmlSnippet(markup).replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
      </div>
    </details>
  \`;
}`,...(w=($=i.parameters)==null?void 0:$.docs)==null?void 0:w.source}}};var T,E,A;l.parameters={...l.parameters,docs:{...(T=l.parameters)==null?void 0:T.docs,source:{originalSource:`() => {
  const containerId = 'pricing-interactive-' + Math.random().toString(36).substr(2, 9);
  return \`
    <div id="\${containerId}" style="max-width: 1200px;">
      <div class="alert alert-info mb-4">
        <i class="bx bx-info-circle me-2"></i>
        <strong>Interactive Demo:</strong> Click on "Select Plan" buttons to see selection feedback.
      </div>
      
      <div class="row g-4">
        <div class="col-md-4">
          <div class="card" id="basic-\${containerId}">
            <div class="card-body text-center">
              <h5 class="card-title">Basic</h5>
              <div class="my-4">
                <h2 class="mb-0">$9<small class="text-muted">/mo</small></h2>
              </div>
              <ul class="list-unstyled text-start mb-4">
                <li class="mb-2"><i class="bx bx-check text-success me-2"></i>10 Projects</li>
                <li class="mb-2"><i class="bx bx-check text-success me-2"></i>5GB Storage</li>
                <li class="mb-2"><i class="bx bx-check text-success me-2"></i>Email Support</li>
              </ul>
              <button class="btn btn-outline-primary w-100" onclick="
                document.querySelectorAll('[id*=\\"pricing-interactive\\"] .card').forEach(c => c.classList.remove('border-primary'));
                document.querySelectorAll('[id*=\\"pricing-interactive\\"] .btn').forEach(b => { b.classList.remove('btn-primary'); b.classList.add('btn-outline-primary'); b.textContent = 'Select Plan'; });
                this.classList.remove('btn-outline-primary');
                this.classList.add('btn-primary');
                this.textContent = '✓ Selected';
                this.closest('.card').classList.add('border-primary');
              ">Select Plan</button>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="card border-primary" id="pro-\${containerId}">
            <div class="card-body text-center">
              <span class="badge bg-primary mb-2">Popular</span>
              <h5 class="card-title">Professional</h5>
              <div class="my-4">
                <h2 class="mb-0">$29<small class="text-muted">/mo</small></h2>
              </div>
              <ul class="list-unstyled text-start mb-4">
                <li class="mb-2"><i class="bx bx-check text-success me-2"></i>Unlimited Projects</li>
                <li class="mb-2"><i class="bx bx-check text-success me-2"></i>50GB Storage</li>
                <li class="mb-2"><i class="bx bx-check text-success me-2"></i>Priority Support</li>
                <li class="mb-2"><i class="bx bx-check text-success me-2"></i>Advanced Features</li>
              </ul>
              <button class="btn btn-primary w-100" onclick="
                document.querySelectorAll('[id*=\\"pricing-interactive\\"] .card').forEach(c => c.classList.remove('border-primary'));
                document.querySelectorAll('[id*=\\"pricing-interactive\\"] .btn').forEach(b => { b.classList.remove('btn-primary'); b.classList.add('btn-outline-primary'); b.textContent = 'Select Plan'; });
                this.classList.remove('btn-outline-primary');
                this.classList.add('btn-primary');
                this.textContent = '✓ Selected';
                this.closest('.card').classList.add('border-primary');
              ">✓ Selected</button>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="card" id="enterprise-\${containerId}">
            <div class="card-body text-center">
              <h5 class="card-title">Enterprise</h5>
              <div class="my-4">
                <h2 class="mb-0">$99<small class="text-muted">/mo</small></h2>
              </div>
              <ul class="list-unstyled text-start mb-4">
                <li class="mb-2"><i class="bx bx-check text-success me-2"></i>Everything in Pro</li>
                <li class="mb-2"><i class="bx bx-check text-success me-2"></i>Unlimited Storage</li>
                <li class="mb-2"><i class="bx bx-check text-success me-2"></i>24/7 Support</li>
                <li class="mb-2"><i class="bx bx-check text-success me-2"></i>Custom Solutions</li>
              </ul>
              <button class="btn btn-outline-primary w-100" onclick="
                document.querySelectorAll('[id*=\\"pricing-interactive\\"] .card').forEach(c => c.classList.remove('border-primary'));
                document.querySelectorAll('[id*=\\"pricing-interactive\\"] .btn').forEach(b => { b.classList.remove('btn-primary'); b.classList.add('btn-outline-primary'); b.textContent = 'Select Plan'; });
                this.classList.remove('btn-outline-primary');
                this.classList.add('btn-primary');
                this.textContent = '✓ Selected';
                this.closest('.card').classList.add('border-primary');
              ">Select Plan</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  \`;
}`,...(A=(E=l.parameters)==null?void 0:E.docs)==null?void 0:A.source}}};const F=["Overview","ThreeColumns","YearlyPricing","TwoColumns","FourColumns","Interactive"];export{i as FourColumns,l as Interactive,n as Overview,t as ThreeColumns,r as TwoColumns,a as YearlyPricing,F as __namedExportsOrder,U as default};
