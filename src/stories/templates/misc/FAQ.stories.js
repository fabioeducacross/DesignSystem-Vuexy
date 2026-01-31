/**
 * FAQ Page - Template (Misc)
 * 
 * Source: packages/vuexy_theme/public/vuexy/css/pages/page-faq.css
 * Priority: P1 (Important)
 * Status: ✅ DONE
 * 
 * Template de página de perguntas frequentes.
 */

import { formatHtmlSnippet } from '../../_helpers/snippets';

export default {
  title: 'Templates/Misc/FAQ',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
# FAQ Page Template

Template completo de página de Perguntas Frequentes (FAQ).

## Características
- Header com search
- Categorias de FAQs
- Accordion de perguntas
- Navegação por categorias
- Ilustração opcional
- Contact/support section
- Still have questions CTA

## Elementos incluídos
- Search bar (busca em FAQs)
- Category pills/tabs
- Accordion items
- Icon para cada categoria
- Contact card
- Ilustração de header

## Categorias comuns
- Getting Started
- Account & Billing
- Features
- Security & Privacy
- Technical Support
- Troubleshooting

## Estrutura
- Hero section com busca
- Grid de categorias
- Accordion expandido
- Contact/support footer
        `
      }
    },
    layout: 'fullscreen'
  },
  argTypes: {
    withSearch: {
      control: 'boolean',
      description: 'Incluir barra de busca',
      table: { defaultValue: { summary: true } }
    }
  }
};

const createFAQPage = ({ withSearch = true }) => {
  return `<div class="faq-wrapper">
  <!-- FAQ Header -->
  <div class="faq-header text-center py-5">
    <div class="container">
      <h1 class="mb-3">How can we help you? 🤔</h1>
      <p class="lead text-muted mb-4">
        Find answers to frequently asked questions below
      </p>
      
      ${withSearch ? `
      <div class="row justify-content-center">
        <div class="col-lg-6">
          <div class="input-group input-group-lg">
            <span class="input-group-text">
              <i class="bx bx-search"></i>
            </span>
            <input type="text" 
                   class="form-control" 
                   placeholder="Search for answers...">
          </div>
        </div>
      </div>
      ` : ''}
    </div>
  </div>
  
  <!-- FAQ Categories -->
  <div class="container py-5">
    <div class="row g-4 mb-5">
      <div class="col-md-4">
        <div class="card text-center h-100">
          <div class="card-body">
            <div class="avatar avatar-lg bg-label-primary mb-3">
              <i class="bx bx-rocket bx-md"></i>
            </div>
            <h5 class="mb-2">Getting Started</h5>
            <p class="text-muted">Learn the basics and get up and running quickly</p>
            <a href="#getting-started" class="btn btn-sm btn-outline-primary">
              8 articles
            </a>
          </div>
        </div>
      </div>
      
      <div class="col-md-4">
        <div class="card text-center h-100">
          <div class="card-body">
            <div class="avatar avatar-lg bg-label-success mb-3">
              <i class="bx bx-user bx-md"></i>
            </div>
            <h5 class="mb-2">Account & Billing</h5>
            <p class="text-muted">Manage your account settings and payments</p>
            <a href="#account" class="btn btn-sm btn-outline-success">
              12 articles
            </a>
          </div>
        </div>
      </div>
      
      <div class="col-md-4">
        <div class="card text-center h-100">
          <div class="card-body">
            <div class="avatar avatar-lg bg-label-info mb-3">
              <i class="bx bx-shield bx-md"></i>
            </div>
            <h5 class="mb-2">Security</h5>
            <p class="text-muted">Keep your account safe and secure</p>
            <a href="#security" class="btn btn-sm btn-outline-info">
              6 articles
            </a>
          </div>
        </div>
      </div>
    </div>
    
    <!-- FAQ Accordion -->
    <div class="row">
      <div class="col-lg-10 mx-auto">
        <h3 class="mb-4" id="getting-started">
          <i class="bx bx-rocket me-2"></i> Getting Started
        </h3>
        
        <div class="accordion mb-5" id="faqAccordionGettingStarted">
          <div class="accordion-item">
            <h2 class="accordion-header">
              <button class="accordion-button" 
                      type="button" 
                      onclick="const target = document.getElementById('faq-1'); target.classList.toggle('show'); this.classList.toggle('collapsed');">
                How do I create an account?
              </button>
            </h2>
            <div id="faq-1" class="accordion-collapse collapse show">
              <div class="accordion-body">
                Creating an account is simple! Click the "Sign Up" button in the top right corner, 
                fill in your email address and create a password. You'll receive a confirmation 
                email to verify your account.
              </div>
            </div>
          </div>
          
          <div class="accordion-item">
            <h2 class="accordion-header">
              <button class="accordion-button collapsed" 
                      type="button" 
                      onclick="const target = document.getElementById('faq-2'); target.classList.toggle('show'); this.classList.toggle('collapsed');">
                What features are included in the free plan?
              </button>
            </h2>
            <div id="faq-2" class="accordion-collapse collapse">
              <div class="accordion-body">
                The free plan includes basic features such as:
                <ul class="mt-2">
                  <li>Up to 100 entries per month</li>
                  <li>Basic reporting</li>
                  <li>Community support</li>
                  <li>1 GB storage</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div class="accordion-item">
            <h2 class="accordion-header">
              <button class="accordion-button collapsed" 
                      type="button" 
                      onclick="const target = document.getElementById('faq-3'); target.classList.toggle('show'); this.classList.toggle('collapsed');">
                How do I upgrade my account?
              </button>
            </h2>
            <div id="faq-3" class="accordion-collapse collapse">
              <div class="accordion-body">
                You can upgrade your account at any time by going to Settings > Billing and 
                selecting a plan that fits your needs. Payment is processed securely through Stripe.
              </div>
            </div>
          </div>
        </div>
        
        <h3 class="mb-4" id="account">
          <i class="bx bx-user me-2"></i> Account & Billing
        </h3>
        
        <div class="accordion mb-5" id="faqAccordionAccount">
          <div class="accordion-item">
            <h2 class="accordion-header">
              <button class="accordion-button collapsed" 
                      type="button" 
                      onclick="const target = document.getElementById('faq-4'); target.classList.toggle('show'); this.classList.toggle('collapsed');">
                How do I change my password?
              </button>
            </h2>
            <div id="faq-4" class="accordion-collapse collapse">
              <div class="accordion-body">
                Go to Settings > Security and click "Change Password". You'll need to enter 
                your current password and then your new password twice to confirm.
              </div>
            </div>
          </div>
          
          <div class="accordion-item">
            <h2 class="accordion-header">
              <button class="accordion-button collapsed" 
                      type="button" 
                      onclick="const target = document.getElementById('faq-5'); target.classList.toggle('show'); this.classList.toggle('collapsed');">
                Can I cancel my subscription anytime?
              </button>
            </h2>
            <div id="faq-5" class="accordion-collapse collapse">
              <div class="accordion-body">
                Yes! You can cancel your subscription at any time. Your account will remain 
                active until the end of your current billing period, and you won't be charged again.
              </div>
            </div>
          </div>
          
          <div class="accordion-item">
            <h2 class="accordion-header">
              <button class="accordion-button collapsed" 
                      type="button" 
                      data-bs-toggle="collapse" 
                      data-bs-target="#faq-6">
                What payment methods do you accept?
              </button>
            </h2>
            <div id="faq-6" class="accordion-collapse collapse" data-bs-parent="#faqAccordionAccount">
              <div class="accordion-body">
                We accept all major credit cards (Visa, MasterCard, American Express) and PayPal. 
                All payments are processed securely through our payment provider.
              </div>
            </div>
          </div>
        </div>
        
        <h3 class="mb-4" id="security">
          <i class="bx bx-shield me-2"></i> Security & Privacy
        </h3>
        
        <div class="accordion mb-5" id="faqAccordionSecurity">
          <div class="accordion-item">
            <h2 class="accordion-header">
              <button class="accordion-button collapsed" 
                      type="button" 
                      data-bs-toggle="collapse" 
                      data-bs-target="#faq-7">
                Is my data secure?
              </button>
            </h2>
            <div id="faq-7" class="accordion-collapse collapse" data-bs-parent="#faqAccordionSecurity">
              <div class="accordion-body">
                Yes! We take security very seriously. All data is encrypted in transit using 
                SSL/TLS and at rest using AES-256 encryption. We also perform regular security 
                audits and penetration testing.
              </div>
            </div>
          </div>
          
          <div class="accordion-item">
            <h2 class="accordion-header">
              <button class="accordion-button collapsed" 
                      type="button" 
                      data-bs-toggle="collapse" 
                      data-bs-target="#faq-8">
                Do you offer two-factor authentication?
              </button>
            </h2>
            <div id="faq-8" class="accordion-collapse collapse" data-bs-parent="#faqAccordionSecurity">
              <div class="accordion-body">
                Yes! We highly recommend enabling two-factor authentication (2FA) for added 
                security. You can enable it in Settings > Security. We support authenticator 
                apps like Google Authenticator and Authy.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  
  <!-- Contact Section -->
  <div class="bg-light py-5">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-lg-8 text-center">
          <div class="card">
            <div class="card-body p-5">
              <div class="avatar avatar-xl bg-label-primary mb-4">
                <i class="bx bx-help-circle bx-lg"></i>
              </div>
              <h4 class="mb-2">Still have questions?</h4>
              <p class="text-muted mb-4">
                Can't find the answer you're looking for? Our support team is here to help.
              </p>
              <div class="d-flex flex-wrap gap-3 justify-content-center">
                <a href="/contact" class="btn btn-primary">
                  <i class="bx bx-envelope me-1"></i> Contact Support
                </a>
                <a href="/community" class="btn btn-outline-secondary">
                  <i class="bx bx-chat me-1"></i> Join Community
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<style>
.faq-wrapper {
  background-color: #fff;
  min-height: 100vh;
}

.faq-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.faq-header .lead {
  color: rgba(255, 255, 255, 0.9);
}

.avatar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.375rem;
  height: 2.375rem;
  border-radius: 50%;
}

.avatar-lg {
  width: 4rem;
  height: 4rem;
  font-size: 2rem;
}

.avatar-xl {
  width: 5rem;
  height: 5rem;
  font-size: 2.5rem;
}

.bg-label-primary {
  background-color: rgba(105, 108, 255, 0.12) !important;
  color: #696cff !important;
}

.bg-label-success {
  background-color: rgba(40, 199, 111, 0.12) !important;
  color: #28c76f !important;
}

.bg-label-info {
  background-color: rgba(0, 207, 232, 0.12) !important;
  color: #00cfe8 !important;
}
</style>`;
};

const Template = (args) => {
  const markup = createFAQPage(args);
  
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

export const Overview = () => createFAQPage({ withSearch: true });

export const WithSearch = Template.bind({});
WithSearch.args = {
  withSearch: true
};

export const NoSearch = Template.bind({});
NoSearch.args = {
  withSearch: false
};

// Interactive Story (accordion controlled state)
export const Interactive = {
  render: () => {
    return `
      <div class="container py-5">
        <h3 class="mb-4">Interactive FAQ Accordion</h3>
        
        <div class="accordion" id="faqAccordion">
          <div class="accordion-item mb-3">
            <h2 class="accordion-header" id="faq1">
              <button class="accordion-button collapsed" type="button" onclick="toggleAccordion('collapse1', this)">
                How do I get started?
              </button>
            </h2>
            <div id="collapse1" class="accordion-collapse collapse" style="display: none;">
              <div class="accordion-body">
                Getting started is easy! Simply sign up for an account, verify your email, and you'll be ready to go. Check out our Quick Start guide for step-by-step instructions.
              </div>
            </div>
          </div>
          
          <div class="accordion-item mb-3">
            <h2 class="accordion-header" id="faq2">
              <button class="accordion-button collapsed" type="button" onclick="toggleAccordion('collapse2', this)">
                What payment methods do you accept?
              </button>
            </h2>
            <div id="collapse2" class="accordion-collapse collapse" style="display: none;">
              <div class="accordion-body">
                We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and bank transfers for enterprise plans.
              </div>
            </div>
          </div>
          
          <div class="accordion-item mb-3">
            <h2 class="accordion-header" id="faq3">
              <button class="accordion-button collapsed" type="button" onclick="toggleAccordion('collapse3', this)">
                Is my data secure?
              </button>
            </h2>
            <div id="collapse3" class="accordion-collapse collapse" style="display: none;">
              <div class="accordion-body">
                Yes! We use industry-standard encryption (SSL/TLS) for all data transmission and storage. Your data is backed up daily and stored in secure data centers with 24/7 monitoring.
              </div>
            </div>
          </div>
          
          <div class="accordion-item mb-3">
            <h2 class="accordion-header" id="faq4">
              <button class="accordion-button collapsed" type="button" onclick="toggleAccordion('collapse4', this)">
                Can I cancel my subscription anytime?
              </button>
            </h2>
            <div id="collapse4" class="accordion-collapse collapse" style="display: none;">
              <div class="accordion-body">
                Absolutely! You can cancel your subscription at any time from your account settings. No questions asked, and no cancellation fees.
              </div>
            </div>
          </div>
        </div>
        
        <script>
          function toggleAccordion(collapseId, button) {
            const collapse = document.getElementById(collapseId);
            const isExpanded = collapse.style.display === 'block';
            
            // Close all others
            document.querySelectorAll('.accordion-collapse').forEach(item => {
              item.style.display = 'none';
              item.classList.remove('show');
            });
            document.querySelectorAll('.accordion-button').forEach(btn => {
              btn.classList.add('collapsed');
            });
            
            // Toggle clicked
            if (!isExpanded) {
              collapse.style.display = 'block';
              collapse.classList.add('show');
              button.classList.remove('collapsed');
            }
          }
        </script>
        
        <p class="text-muted mt-4 small">
          <i class="ri-information-line"></i> Interactive accordion using controlled state (no Bootstrap JS required)
        </p>
      </div>
    `;
  },
  parameters: {
    docs: {
      description: {
        story: 'Demo interativo com accordion funcional usando state controlado (classes/display). Clique para expandir/recolher.'
      }
    }
  }
};
