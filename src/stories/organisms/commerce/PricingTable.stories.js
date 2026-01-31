/**
 * Pricing Table - Organism (Commerce)
 * 
 * Source: packages/vuexy_theme/public/vuexy/css/pages/page-pricing.css
 * Priority: P1 (Important)
 * Status: ✅ DONE
 * 
 * Tabelas de comparação de preços/planos.
 */

import { formatHtmlSnippet } from '../../_helpers/snippets';

export default {
  title: 'Organisms/Commerce/PricingTable',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
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
        `
      }
    }
  },
  argTypes: {
    columns: {
      control: 'select',
      options: [2, 3, 4],
      description: 'Número de colunas',
      table: { defaultValue: { summary: 3 } }
    },
    period: {
      control: 'select',
      options: ['monthly', 'yearly'],
      description: 'Período de cobrança',
      table: { defaultValue: { summary: 'monthly' } }
    }
  }
};

const createPricingTable = ({ columns = 3, period = 'monthly' }) => {
  const isYearly = period === 'yearly';
  const discount = isYearly ? 0.8 : 1; // 20% off yearly
  
  const plans = [
    {
      name: 'Basic',
      price: Math.round(19 * discount),
      description: 'A simple start for everyone',
      features: [
        { text: '100 responses a month', included: true },
        { text: 'Unlimited forms and surveys', included: true },
        { text: 'Unlimited fields', included: true },
        { text: 'Basic reporting and analytics', included: true },
        { text: 'Up to 2 subdomains', included: true }
      ],
      cta: 'Start Free Trial',
      variant: 'outline-primary'
    },
    {
      name: 'Standard',
      price: Math.round(49 * discount),
      description: 'For small to medium businesses',
      features: [
        { text: 'Unlimited responses', included: true },
        { text: 'Unlimited forms and surveys', included: true },
        { text: 'Instagram profile page', included: true },
        { text: 'Google Docs integration', included: true },
        { text: 'Custom "Thank you" page', included: true }
      ],
      popular: true,
      cta: 'Get Started',
      variant: 'primary'
    },
    {
      name: 'Enterprise',
      price: Math.round(99 * discount),
      description: 'Solution for big organizations',
      features: [
        { text: 'PayPal payments', included: true },
        { text: 'Logic Jumps', included: true },
        { text: 'File upload with 5GB storage', included: true },
        { text: 'Custom domain support', included: true },
        { text: 'Stripe integration', included: true }
      ],
      cta: 'Contact Us',
      variant: 'outline-primary'
    }
  ];
  
  const colClass = columns === 2 ? 'col-md-6' : columns === 3 ? 'col-lg-4' : 'col-lg-3';
  
  return `<div class="pricing-wrapper">
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
          <input class="form-check-input" type="checkbox" id="pricingSwitch" ${isYearly ? 'checked' : ''}>
        </div>
        <label class="switch">
          <span class="switch-label">Annually</span>
        </label>
        <span class="badge bg-label-primary">Save 20%</span>
      </div>
    </div>
    
    <!-- Pricing Cards -->
    <div class="row g-4 justify-content-center">
      ${plans.slice(0, columns).map(plan => `
      <div class="${colClass}">
        <div class="card ${plan.popular ? 'border-primary shadow-lg' : ''}">
          ${plan.popular ? `
          <div class="position-absolute top-0 start-50 translate-middle">
            <span class="badge bg-primary rounded-pill px-3 py-2">Popular</span>
          </div>
          ` : ''}
          
          <div class="card-body ${plan.popular ? 'pt-5' : ''}">
            <div class="text-center mb-4">
              <h3 class="mb-2">${plan.name}</h3>
              <p class="text-muted mb-4">${plan.description}</p>
              
              <div class="mb-4">
                <sup class="h5 text-muted fw-normal">$</sup>
                <span class="display-3 fw-bold">${plan.price}</span>
                <sub class="h5 text-muted fw-normal">/month</sub>
              </div>
            </div>
            
            <ul class="list-unstyled mb-4">
              ${plan.features.map(feature => `
              <li class="mb-3">
                <i class="bx bx-check text-${feature.included ? 'success' : 'muted'} me-2"></i>
                <span class="${!feature.included ? 'text-muted' : ''}">${feature.text}</span>
              </li>
              `).join('')}
            </ul>
            
            <button class="btn btn-${plan.variant} w-100">
              ${plan.cta}
            </button>
          </div>
        </div>
      </div>
      `).join('')}
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
</style>`;
};

const Template = (args) => {
  const markup = createPricingTable(args);
  
  return `
    ${markup}
    
    <hr class="my-5" />
    
    <details>
      <summary><strong>Code Snippets</strong></summary>
      <div class="mt-3">
        <h6>HTML</h6>
        <pre><code>${formatHtmlSnippet(markup).replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
      </div>
    </details>
  `;
};

export const Overview = () => createPricingTable({ columns: 3, period: 'monthly' });

export const ThreeColumns = Template.bind({});
ThreeColumns.args = {
  columns: 3,
  period: 'monthly'
};

export const YearlyPricing = Template.bind({});
YearlyPricing.args = {
  columns: 3,
  period: 'yearly'
};

export const TwoColumns = Template.bind({});
TwoColumns.args = {
  columns: 2,
  period: 'monthly'
};

export const FourColumns = Template.bind({});
FourColumns.args = {
  columns: 4,
  period: 'monthly'
};

// Interactive Demo
export const Interactive = () => {
  const containerId = 'pricing-interactive-' + Math.random().toString(36).substr(2, 9);
  
  return `
    <div id="${containerId}" style="max-width: 1200px;">
      <div class="alert alert-info mb-4">
        <i class="bx bx-info-circle me-2"></i>
        <strong>Interactive Demo:</strong> Click on "Select Plan" buttons to see selection feedback.
      </div>
      
      <div class="row g-4">
        <div class="col-md-4">
          <div class="card" id="basic-${containerId}">
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
                document.querySelectorAll('[id*=\"pricing-interactive\"] .card').forEach(c => c.classList.remove('border-primary'));
                document.querySelectorAll('[id*=\"pricing-interactive\"] .btn').forEach(b => { b.classList.remove('btn-primary'); b.classList.add('btn-outline-primary'); b.textContent = 'Select Plan'; });
                this.classList.remove('btn-outline-primary');
                this.classList.add('btn-primary');
                this.textContent = '✓ Selected';
                this.closest('.card').classList.add('border-primary');
              ">Select Plan</button>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="card border-primary" id="pro-${containerId}">
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
                document.querySelectorAll('[id*=\"pricing-interactive\"] .card').forEach(c => c.classList.remove('border-primary'));
                document.querySelectorAll('[id*=\"pricing-interactive\"] .btn').forEach(b => { b.classList.remove('btn-primary'); b.classList.add('btn-outline-primary'); b.textContent = 'Select Plan'; });
                this.classList.remove('btn-outline-primary');
                this.classList.add('btn-primary');
                this.textContent = '✓ Selected';
                this.closest('.card').classList.add('border-primary');
              ">✓ Selected</button>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="card" id="enterprise-${containerId}">
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
                document.querySelectorAll('[id*=\"pricing-interactive\"] .card').forEach(c => c.classList.remove('border-primary'));
                document.querySelectorAll('[id*=\"pricing-interactive\"] .btn').forEach(b => { b.classList.remove('btn-primary'); b.classList.add('btn-outline-primary'); b.textContent = 'Select Plan'; });
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
  `;
};
