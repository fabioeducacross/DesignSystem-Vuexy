/**
 * Accordion - Organism (Content)
 * 
 * Source: packages/vuexy_theme/public/vuexy/css/core.css (.accordion)
 * Priority: P1 (Important)
 * Status: ✅ DONE
 * 
 * Painéis colapsáveis para organizar conteúdo.
 */

import { formatHtmlSnippet, formatReactSnippet, formatVue2Snippet, formatVue3Snippet } from '../../_helpers/snippets';

export default {
  title: 'Organisms/Content/Accordion',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
# Accordion

Painéis colapsáveis para organizar e ocultar conteúdo complexo.

## Quando usar
- FAQs (Perguntas Frequentes)
- Seções de ajuda/documentação
- Configurações avançadas
- Detalhes de produtos
- Filtros colapsáveis
- Menus de navegação expansíveis

## Características
- Classes Bootstrap: \`.accordion\`, \`.accordion-item\`, \`.accordion-header\`, \`.accordion-body\`
- Comportamento: Um ou múltiplos painéis abertos
- Flush variant (sem bordas)
- Always open (múltiplos abertos simultaneamente)
- Ícones customizáveis
- Transições suaves
- Requer Bootstrap JavaScript

## Comportamento
- Toggle via data-bs-toggle="collapse"
- Fecha outros painéis (por padrão)
- Navegação por teclado
- Animação de abertura/fechamento

## Acessibilidade
- \`role="button"\` nos headers
- \`aria-expanded\` indica estado
- \`aria-controls\` referencia o conteúdo
- Navegável por teclado (Enter/Space)
        `
      }
    }
  },
  argTypes: {
    flush: {
      control: 'boolean',
      description: 'Remove bordas e arredondamento',
      table: { defaultValue: { summary: false } }
    },
    alwaysOpen: {
      control: 'boolean',
      description: 'Permite múltiplos painéis abertos',
      table: { defaultValue: { summary: false } }
    }
  }
};

const createAccordion = ({ flush = false, alwaysOpen = false }) => {
  const flushClass = flush ? 'accordion-flush' : '';
  const dataParent = alwaysOpen ? '' : 'data-bs-parent="#accordionExample"';
  
  return `<div class="accordion ${flushClass}" id="accordionExample">
  <div class="accordion-item">
    <h2 class="accordion-header">
      <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
        Accordion Item #1
      </button>
    </h2>
    <div id="collapseOne" class="accordion-collapse collapse show" ${dataParent}>
      <div class="accordion-body">
        This is the first item's accordion body. It is shown by default, until the collapse plugin adds the appropriate classes.
      </div>
    </div>
  </div>
  <div class="accordion-item">
    <h2 class="accordion-header">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
        Accordion Item #2
      </button>
    </h2>
    <div id="collapseTwo" class="accordion-collapse collapse" ${dataParent}>
      <div class="accordion-body">
        This is the second item's accordion body. It is hidden by default.
      </div>
    </div>
  </div>
  <div class="accordion-item">
    <h2 class="accordion-header">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
        Accordion Item #3
      </button>
    </h2>
    <div id="collapseThree" class="accordion-collapse collapse" ${dataParent}>
      <div class="accordion-body">
        This is the third item's accordion body. It is hidden by default.
      </div>
    </div>
  </div>
</div>`;
};

const Template = (args) => {
  const markup = createAccordion(args);
  
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
        <pre><code>${formatReactSnippet(markup, 'Accordion').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
      </div>
    </details>
  `;
};

export const Overview = () => `
  <div class="row g-4">
    <div class="col-12">
      <h5>Default Accordion</h5>
      <div class="accordion" id="accordionDefault">
        <div class="accordion-item">
          <h2 class="accordion-header">
            <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true">
              Accordion Item #1
            </button>
          </h2>
          <div id="collapseOne" class="accordion-collapse collapse show" data-bs-parent="#accordionDefault">
            <div class="accordion-body">
              This is the first item's accordion body. It is shown by default, until the collapse plugin adds the appropriate classes that we use to style each element.
            </div>
          </div>
        </div>
        <div class="accordion-item">
          <h2 class="accordion-header">
            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false">
              Accordion Item #2
            </button>
          </h2>
          <div id="collapseTwo" class="accordion-collapse collapse" data-bs-parent="#accordionDefault">
            <div class="accordion-body">
              This is the second item's accordion body. It is hidden by default, until the user clicks the button to reveal it.
            </div>
          </div>
        </div>
        <div class="accordion-item">
          <h2 class="accordion-header">
            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false">
              Accordion Item #3
            </button>
          </h2>
          <div id="collapseThree" class="accordion-collapse collapse" data-bs-parent="#accordionDefault">
            <div class="accordion-body">
              This is the third item's accordion body. It demonstrates the accordion's smooth transitions.
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <div class="col-12 mt-5">
      <h5>Flush Accordion (No Borders)</h5>
      <div class="accordion accordion-flush" id="accordionFlush">
        <div class="accordion-item">
          <h2 class="accordion-header">
            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false">
              Flush Item #1
            </button>
          </h2>
          <div id="flush-collapseOne" class="accordion-collapse collapse" data-bs-parent="#accordionFlush">
            <div class="accordion-body">Flush accordion removes borders and rounded corners.</div>
          </div>
        </div>
        <div class="accordion-item">
          <h2 class="accordion-header">
            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false">
              Flush Item #2
            </button>
          </h2>
          <div id="flush-collapseTwo" class="accordion-collapse collapse" data-bs-parent="#accordionFlush">
            <div class="accordion-body">Perfect for use inside cards or other containers.</div>
          </div>
        </div>
      </div>
    </div>
    
    <div class="col-12 mt-5">
      <h5>Always Open (Multiple Panels)</h5>
      <div class="accordion" id="accordionAlwaysOpen">
        <div class="accordion-item">
          <h2 class="accordion-header">
            <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#alwaysOpen-collapseOne" aria-expanded="true">
              Always Open Item #1
            </button>
          </h2>
          <div id="alwaysOpen-collapseOne" class="accordion-collapse collapse show">
            <div class="accordion-body">
              This accordion allows multiple panels to be open simultaneously.
            </div>
          </div>
        </div>
        <div class="accordion-item">
          <h2 class="accordion-header">
            <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#alwaysOpen-collapseTwo" aria-expanded="true">
              Always Open Item #2
            </button>
          </h2>
          <div id="alwaysOpen-collapseTwo" class="accordion-collapse collapse show">
            <div class="accordion-body">
              Notice how opening one doesn't close the others.
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <div class="col-12 mt-5">
      <h5>FAQ Example</h5>
      <div class="accordion" id="accordionFAQ">
        <div class="accordion-item">
          <h2 class="accordion-header">
            <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#faq1" aria-expanded="true">
              <i class="bx bx-help-circle me-2"></i>
              What is your return policy?
            </button>
          </h2>
          <div id="faq1" class="accordion-collapse collapse show" data-bs-parent="#accordionFAQ">
            <div class="accordion-body">
              We offer a 30-day return policy on all products. Items must be unused and in original packaging. Please contact our support team to initiate a return.
            </div>
          </div>
        </div>
        <div class="accordion-item">
          <h2 class="accordion-header">
            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq2" aria-expanded="false">
              <i class="bx bx-package me-2"></i>
              How long does shipping take?
            </button>
          </h2>
          <div id="faq2" class="accordion-collapse collapse" data-bs-parent="#accordionFAQ">
            <div class="accordion-body">
              Standard shipping takes 5-7 business days. Express shipping (2-3 days) and overnight shipping are also available at checkout.
            </div>
          </div>
        </div>
        <div class="accordion-item">
          <h2 class="accordion-header">
            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq3" aria-expanded="false">
              <i class="bx bx-credit-card me-2"></i>
              What payment methods do you accept?
            </button>
          </h2>
          <div id="faq3" class="accordion-collapse collapse" data-bs-parent="#accordionFAQ">
            <div class="accordion-body">
              We accept all major credit cards (Visa, MasterCard, American Express), PayPal, Apple Pay, and Google Pay.
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <div class="col-12 mt-5">
      <h5>With Rich Content</h5>
      <div class="accordion" id="accordionRich">
        <div class="accordion-item">
          <h2 class="accordion-header">
            <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#rich1" aria-expanded="true">
              Product Features
            </button>
          </h2>
          <div id="rich1" class="accordion-collapse collapse show" data-bs-parent="#accordionRich">
            <div class="accordion-body">
              <ul class="mb-0">
                <li><i class="bx bx-check text-success me-1"></i>High-quality materials</li>
                <li><i class="bx bx-check text-success me-1"></i>2-year warranty</li>
                <li><i class="bx bx-check text-success me-1"></i>Free shipping worldwide</li>
                <li><i class="bx bx-check text-success me-1"></i>24/7 customer support</li>
              </ul>
            </div>
          </div>
        </div>
        <div class="accordion-item">
          <h2 class="accordion-header">
            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#rich2" aria-expanded="false">
              Technical Specifications
            </button>
          </h2>
          <div id="rich2" class="accordion-collapse collapse" data-bs-parent="#accordionRich">
            <div class="accordion-body">
              <div class="table-responsive">
                <table class="table table-sm">
                  <tr>
                    <td class="fw-medium">Dimensions</td>
                    <td>10" x 8" x 2"</td>
                  </tr>
                  <tr>
                    <td class="fw-medium">Weight</td>
                    <td>1.5 lbs</td>
                  </tr>
                  <tr>
                    <td class="fw-medium">Material</td>
                    <td>Aluminum alloy</td>
                  </tr>
                  <tr>
                    <td class="fw-medium">Color</td>
                    <td>Space Gray, Silver</td>
                  </tr>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div class="accordion-item">
          <h2 class="accordion-header">
            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#rich3" aria-expanded="false">
              Customer Reviews
            </button>
          </h2>
          <div id="rich3" class="accordion-collapse collapse" data-bs-parent="#accordionRich">
            <div class="accordion-body">
              <div class="d-flex align-items-center mb-3">
                <div class="me-3">
                  <div class="avatar avatar-sm bg-label-primary">
                    <span class="avatar-initial rounded-circle">JD</span>
                  </div>
                </div>
                <div>
                  <h6 class="mb-0">John Doe</h6>
                  <div>
                    <i class="bx bxs-star text-warning"></i>
                    <i class="bx bxs-star text-warning"></i>
                    <i class="bx bxs-star text-warning"></i>
                    <i class="bx bxs-star text-warning"></i>
                    <i class="bx bxs-star text-warning"></i>
                  </div>
                  <small class="text-muted">Great product! Highly recommended.</small>
                </div>
              </div>
              <a href="#" class="btn btn-sm btn-outline-primary">View all reviews</a>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <div class="col-12 mt-5">
      <h5>In Card</h5>
      <div class="card">
        <div class="card-header">
          <h5 class="card-title mb-0">Settings</h5>
        </div>
        <div class="accordion accordion-flush" id="accordionCard">
          <div class="accordion-item">
            <h2 class="accordion-header">
              <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#card1">
                Account Settings
              </button>
            </h2>
            <div id="card1" class="accordion-collapse collapse" data-bs-parent="#accordionCard">
              <div class="accordion-body">
                Manage your account preferences and personal information here.
              </div>
            </div>
          </div>
          <div class="accordion-item">
            <h2 class="accordion-header">
              <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#card2">
                Privacy & Security
              </button>
            </h2>
            <div id="card2" class="accordion-collapse collapse" data-bs-parent="#accordionCard">
              <div class="accordion-body">
                Control your privacy settings and security preferences.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  
  <div class="alert alert-info mt-5">
    <i class="bx bx-info-circle me-2"></i>
    <strong>JavaScript Required:</strong> Accordion requires Bootstrap JavaScript. It's automatically initialized when using data-bs-toggle="collapse".
  </div>
`;

export const Default = Template.bind({});
Default.args = {
  flush: false,
  alwaysOpen: false
};

export const Flush = Template.bind({});
Flush.args = {
  flush: true,
  alwaysOpen: false
};

export const AlwaysOpen = Template.bind({});
AlwaysOpen.args = {
  flush: false,
  alwaysOpen: true
};
