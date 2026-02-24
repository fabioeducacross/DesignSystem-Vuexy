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
  title: 'Vuexy/Organisms/Content/Accordion',
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
              <i class="bx bx-help-circle mr-2"></i>
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
              <i class="bx bx-package mr-2"></i>
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
              <i class="bx bx-credit-card mr-2"></i>
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
                <li><i class="bx bx-check text-success mr-1"></i>High-quality materials</li>
                <li><i class="bx bx-check text-success mr-1"></i>2-year warranty</li>
                <li><i class="bx bx-check text-success mr-1"></i>Free shipping worldwide</li>
                <li><i class="bx bx-check text-success mr-1"></i>24/7 customer support</li>
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
                <div class="mr-3">
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
    <i class="bx bx-info-circle mr-2"></i>
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

/**
 * ====================================
 * INTERACTIVE STORY - Bootstrap JS Real
 * ====================================
 */

export const Interactive = {
  parameters: {
    docs: {
      description: {
        story: `
### Accordion com Bootstrap JS Real

Implementação oficial usando Bootstrap JS do Vuexy:

- ✅ **Expand/Collapse** com animações suaves
- ✅ **Single mode** - apenas um item aberto por vez (padrão)
- ✅ **Always open mode** - múltiplos itens abertos
- ✅ **Flush variant** - sem bordas
- ✅ **Ícones dinâmicos** que rotacionam
- ✅ **Keyboard navigation** (Tab, Enter, Space)

**Casos de uso:**
- FAQs
- Documentação
- Menus de navegação
- Configurações/preferências

### Como testar:
1. Clique nos headers para expand/collapse
2. Note as animações suaves
3. Teste single vs always open mode
4. Use teclado (Tab + Enter)
        `
      }
    }
  },
  loaders: [
    async () => {
      if (typeof window !== 'undefined' && !window.bootstrap) {
        return new Promise((resolve, reject) => {
          const script = document.createElement('script');
          script.src = '/vuexy/js/bootstrap.js';
          script.onload = () => {
            console.log('✅ Bootstrap JS carregado para Accordion');
            resolve({ bootstrapLoaded: true });
          };
          script.onerror = () => reject(new Error('Failed to load Bootstrap JS'));
          document.head.appendChild(script);
        });
      }
      return { bootstrapLoaded: true };
    }
  ],
  render: () => {
    return `
      <div style="padding: 30px;">
        <h5 class="mb-4">Accordions Interativos com Bootstrap JS</h5>
        
        <!-- Accordion 1: FAQ Single Mode -->
        <div class="row g-4">
          <div class="col-lg-6">
            <h6>FAQ - Single Mode</h6>
            <p class="text-muted small">Apenas um item aberto por vez</p>
            <div class="accordion" id="accordionFAQ">
              <div class="accordion-item">
                <h2 class="accordion-header">
                  <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#faq1">
                    <i class="ti tabler-help mr-2"></i>
                    Como faço meu pedido?
                  </button>
                </h2>
                <div id="faq1" class="accordion-collapse collapse show" data-bs-parent="#accordionFAQ">
                  <div class="accordion-body">
                    <p class="mb-2">Para fazer um pedido, siga estes passos:</p>
                    <ol class="mb-0">
                      <li>Navegue pelos produtos</li>
                      <li>Adicione itens ao carrinho</li>
                      <li>Clique em "Finalizar Compra"</li>
                      <li>Preencha suas informações</li>
                      <li>Confirme o pagamento</li>
                    </ol>
                  </div>
                </div>
              </div>
              
              <div class="accordion-item">
                <h2 class="accordion-header">
                  <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq2">
                    <i class="ti tabler-truck mr-2"></i>
                    Quais são as opções de entrega?
                  </button>
                </h2>
                <div id="faq2" class="accordion-collapse collapse" data-bs-parent="#accordionFAQ">
                  <div class="accordion-body">
                    <ul class="mb-0">
                      <li><strong>Padrão:</strong> 5-7 dias úteis (Grátis acima de R$ 100)</li>
                      <li><strong>Expressa:</strong> 2-3 dias úteis (R$ 25)</li>
                      <li><strong>Sedex:</strong> 1-2 dias úteis (R$ 40)</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div class="accordion-item">
                <h2 class="accordion-header">
                  <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq3">
                    <i class="ti tabler-credit-card mr-2"></i>
                    Quais formas de pagamento aceitam?
                  </button>
                </h2>
                <div id="faq3" class="accordion-collapse collapse" data-bs-parent="#accordionFAQ">
                  <div class="accordion-body">
                    <div class="row g-2">
                      <div class="col-6">
                        <div class="bg-label-primary p-2 rounded text-center">
                          <i class="ti tabler-credit-card"></i> Cartões
                        </div>
                      </div>
                      <div class="col-6">
                        <div class="bg-label-success p-2 rounded text-center">
                          <i class="ti tabler-brand-paypal"></i> PayPal
                        </div>
                      </div>
                      <div class="col-6">
                        <div class="bg-label-info p-2 rounded text-center">
                          <i class="ti tabler-qrcode"></i> Pix
                        </div>
                      </div>
                      <div class="col-6">
                        <div class="bg-label-warning p-2 rounded text-center">
                          <i class="ti tabler-barcode"></i> Boleto
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div class="accordion-item">
                <h2 class="accordion-header">
                  <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq4">
                    <i class="ti tabler-rotate-clockwise mr-2"></i>
                    Como funciona a política de devolução?
                  </button>
                </h2>
                <div id="faq4" class="accordion-collapse collapse" data-bs-parent="#accordionFAQ">
                  <div class="accordion-body">
                    <div class="alert alert-info mb-2">
                      <strong>📦 30 dias para devolução</strong>
                    </div>
                    <p class="mb-2">Você tem 30 dias a partir da data de entrega para solicitar devolução ou troca. O produto deve estar:</p>
                    <ul class="mb-0">
                      <li>Em sua embalagem original</li>
                      <li>Sem sinais de uso</li>
                      <li>Com todos os acessórios</li>
                      <li>Com nota fiscal</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Accordion 2: Always Open Mode -->
          <div class="col-lg-6">
            <h6>Configurações - Always Open</h6>
            <p class="text-muted small">Múltiplos itens podem estar abertos</p>
            <div class="accordion" id="accordionSettings">
              <div class="accordion-item">
                <h2 class="accordion-header">
                  <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#settings1">
                    <i class="ti tabler-user mr-2"></i>
                    Perfil
                  </button>
                </h2>
                <div id="settings1" class="accordion-collapse collapse show">
                  <div class="accordion-body">
                    <div class="mb-3">
                      <label class="form-label">Nome Completo</label>
                      <input type="text" class="form-control" value="João Silva">
                    </div>
                    <div class="mb-3">
                      <label class="form-label">Email</label>
                      <input type="email" class="form-control" value="joao@example.com">
                    </div>
                    <button class="btn btn-sm btn-primary">Salvar</button>
                  </div>
                </div>
              </div>
              
              <div class="accordion-item">
                <h2 class="accordion-header">
                  <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#settings2">
                    <i class="ti tabler-bell mr-2"></i>
                    Notificações
                  </button>
                </h2>
                <div id="settings2" class="accordion-collapse collapse">
                  <div class="accordion-body">
                    <div class="form-check form-switch mb-2">
                      <input class="form-check-input" type="checkbox" id="notif1" checked>
                      <label class="form-check-label" for="notif1">Email de novidades</label>
                    </div>
                    <div class="form-check form-switch mb-2">
                      <input class="form-check-input" type="checkbox" id="notif2" checked>
                      <label class="form-check-label" for="notif2">Notificações push</label>
                    </div>
                    <div class="form-check form-switch">
                      <input class="form-check-input" type="checkbox" id="notif3">
                      <label class="form-check-label" for="notif3">SMS</label>
                    </div>
                  </div>
                </div>
              </div>
              
              <div class="accordion-item">
                <h2 class="accordion-header">
                  <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#settings3">
                    <i class="ti tabler-lock mr-2"></i>
                    Privacidade
                  </button>
                </h2>
                <div id="settings3" class="accordion-collapse collapse">
                  <div class="accordion-body">
                    <div class="form-check mb-2">
                      <input class="form-check-input" type="checkbox" id="priv1" checked>
                      <label class="form-check-label" for="priv1">Perfil público</label>
                    </div>
                    <div class="form-check mb-2">
                      <input class="form-check-input" type="checkbox" id="priv2">
                      <label class="form-check-label" for="priv2">Permitir mensagens de desconhecidos</label>
                    </div>
                    <div class="form-check">
                      <input class="form-check-input" type="checkbox" id="priv3" checked>
                      <label class="form-check-label" for="priv3">Ocultar email</label>
                    </div>
                  </div>
                </div>
              </div>
              
              <div class="accordion-item">
                <h2 class="accordion-header">
                  <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#settings4">
                    <i class="ti tabler-shield mr-2"></i>
                    Segurança
                  </button>
                </h2>
                <div id="settings4" class="accordion-collapse collapse">
                  <div class="accordion-body">
                    <button class="btn btn-sm btn-outline-primary w-100 mb-2">
                      <i class="ti tabler-key mr-1"></i> Alterar Senha
                    </button>
                    <button class="btn btn-sm btn-outline-success w-100 mb-2">
                      <i class="ti tabler-device-mobile mr-1"></i> Autenticação 2FA
                    </button>
                    <button class="btn btn-sm btn-outline-danger w-100">
                      <i class="ti tabler-logout mr-1"></i> Sair de todos dispositivos
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Accordion 3: Flush Variant -->
        <div class="row g-4 mt-1">
          <div class="col-12">
            <h6>Documentação - Flush Variant</h6>
            <p class="text-muted small">Sem bordas laterais</p>
            <div class="accordion accordion-flush" id="accordionDocs">
              <div class="accordion-item">
                <h2 class="accordion-header">
                  <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#docs1">
                    <i class="ti tabler-book mr-2"></i>
                    Introdução
                  </button>
                </h2>
                <div id="docs1" class="accordion-collapse collapse show" data-bs-parent="#accordionDocs">
                  <div class="accordion-body">
                    <p>Bem-vindo à documentação oficial. Aqui você encontrará tudo que precisa para começar a usar nosso produto.</p>
                    <div class="d-flex gap-2">
                      <button class="btn btn-sm btn-primary">Começar Agora</button>
                      <button class="btn btn-sm btn-outline-secondary">Ver Tutorial</button>
                    </div>
                  </div>
                </div>
              </div>
              
              <div class="accordion-item">
                <h2 class="accordion-header">
                  <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#docs2">
                    <i class="ti tabler-code mr-2"></i>
                    API Reference
                  </button>
                </h2>
                <div id="docs2" class="accordion-collapse collapse" data-bs-parent="#accordionDocs">
                  <div class="accordion-body">
                    <div class="bg-dark text-white p-3 rounded">
                      <code>
                        GET /api/v1/users<br>
                        POST /api/v1/users<br>
                        PUT /api/v1/users/:id<br>
                        DELETE /api/v1/users/:id
                      </code>
                    </div>
                  </div>
                </div>
              </div>
              
              <div class="accordion-item">
                <h2 class="accordion-header">
                  <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#docs3">
                    <i class="ti tabler-puzzle mr-2"></i>
                    Exemplos
                  </button>
                </h2>
                <div id="docs3" class="accordion-collapse collapse" data-bs-parent="#accordionDocs">
                  <div class="accordion-body">
                    <p class="mb-2">Veja exemplos práticos de implementação:</p>
                    <ul class="list-group">
                      <li class="list-group-item">
                        <a href="javascript:void(0);" class="text-decoration-none">
                          <i class="ti tabler-file-code mr-2"></i>Exemplo 1: Setup Básico
                        </a>
                      </li>
                      <li class="list-group-item">
                        <a href="javascript:void(0);" class="text-decoration-none">
                          <i class="ti tabler-file-code mr-2"></i>Exemplo 2: Autenticação
                        </a>
                      </li>
                      <li class="list-group-item">
                        <a href="javascript:void(0);" class="text-decoration-none">
                          <i class="ti tabler-file-code mr-2"></i>Exemplo 3: CRUD Operations
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="alert alert-info mt-4">
          <strong>💡 Teste a interatividade:</strong>
          <ul class="mb-0 mt-2">
            <li><strong>Single Mode (FAQ):</strong> Apenas um item aberto - outros fecham automaticamente</li>
            <li><strong>Always Open (Configurações):</strong> Múltiplos itens podem estar abertos</li>
            <li><strong>Flush (Documentação):</strong> Variante sem bordas laterais</li>
            <li><strong>Animações:</strong> Note as transições suaves ao expand/collapse</li>
            <li><strong>Teclado:</strong> Use Tab para navegar e Enter/Space para abrir/fechar</li>
            <li><strong>Conteúdo Rico:</strong> Formulários, listas, cards - tudo funciona dentro do accordion</li>
          </ul>
        </div>
      </div>
    `;
  }
};
