/**
 * Stepper - Molecule (Navigation)
 * 
 * Source: packages/vuexy_theme/public/vuexy/vendors/libs/bs-stepper/
 * Priority: P1 (Important)
 * Status: ✅ DONE
 * 
 * Indicador de etapas para processos multi-step.
 */

import { formatHtmlSnippet, formatReactSnippet, formatVue2Snippet, formatVue3Snippet } from '../../_helpers/snippets';

export default {
  title: 'Vuexy/Molecules/Navigation/Stepper',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
# Stepper

Indicador visual de progresso em processos multi-etapa (wizards).

## Quando usar
- Formulários multi-etapa
- Processos de checkout
- Onboarding de usuários
- Configuração guiada
- Processos de cadastro
- Instalação/configuração de sistemas

## Características
- Biblioteca: BS Stepper
- Estados: Completed, Active, Upcoming
- Navegação: Linear, Non-linear
- Orientação: Horizontal, Vertical
- Validação por etapa
- Labels e descrições opcionais

## Comportamento
- Etapas completadas marcadas visualmente
- Etapa ativa destacada
- Navegação via botões Next/Previous
- Validação antes de avançar (opcional)
- Click direto nas etapas (non-linear)

## Acessibilidade
- Estados claramente diferenciados
- Navegação por teclado
- Labels descritivos
- Indicação visual de progresso
        `
      }
    }
  },
  argTypes: {
    vertical: {
      control: 'boolean',
      description: 'Orientação vertical',
      table: { defaultValue: { summary: false } }
    },
    linear: {
      control: 'boolean',
      description: 'Navegação linear (sequencial)',
      table: { defaultValue: { summary: true } }
    }
  }
};

const createStepper = ({ vertical = false, linear = true }) => {
  const orientationClass = vertical ? 'bs-stepper-vertical' : '';
  const linearAttr = linear ? 'linear' : '';
  
  return `<div class="bs-stepper ${orientationClass}" id="stepper1" data-${linearAttr}>
  <div class="bs-stepper-header">
    <div class="step" data-target="#step-1">
      <button type="button" class="step-trigger">
        <span class="bs-stepper-circle">1</span>
        <span class="bs-stepper-label">
          <span class="bs-stepper-title">Account Details</span>
          <span class="bs-stepper-subtitle">Setup your account</span>
        </span>
      </button>
    </div>
    <div class="line"></div>
    <div class="step" data-target="#step-2">
      <button type="button" class="step-trigger">
        <span class="bs-stepper-circle">2</span>
        <span class="bs-stepper-label">
          <span class="bs-stepper-title">Personal Info</span>
          <span class="bs-stepper-subtitle">Add personal info</span>
        </span>
      </button>
    </div>
    <div class="line"></div>
    <div class="step" data-target="#step-3">
      <button type="button" class="step-trigger">
        <span class="bs-stepper-circle">3</span>
        <span class="bs-stepper-label">
          <span class="bs-stepper-title">Review</span>
          <span class="bs-stepper-subtitle">Review and submit</span>
        </span>
      </button>
    </div>
  </div>
  <div class="bs-stepper-content">
    <div id="step-1" class="content">
      <h5>Account Details</h5>
      <p class="text-muted">Enter your account details</p>
      <div class="mb-3">
        <input type="text" class="form-control" placeholder="Username">
      </div>
      <div class="mb-3">
        <input type="email" class="form-control" placeholder="Email">
      </div>
      <button class="btn btn-primary" onclick="stepper1.next()">Next</button>
    </div>
    <div id="step-2" class="content">
      <h5>Personal Info</h5>
      <p class="text-muted">Add your personal information</p>
      <div class="mb-3">
        <input type="text" class="form-control" placeholder="First Name">
      </div>
      <div class="mb-3">
        <input type="text" class="form-control" placeholder="Last Name">
      </div>
      <button class="btn btn-secondary mr-2" onclick="stepper1.previous()">Previous</button>
      <button class="btn btn-primary" onclick="stepper1.next()">Next</button>
    </div>
    <div id="step-3" class="content">
      <h5>Review</h5>
      <p class="text-muted">Review your information and submit</p>
      <div class="alert alert-info">
        <strong>Ready to submit!</strong> Please review your information before submitting.
      </div>
      <button class="btn btn-secondary mr-2" onclick="stepper1.previous()">Previous</button>
      <button class="btn btn-success">Submit</button>
    </div>
  </div>
</div>`;
};

const Template = (args) => {
  const markup = createStepper(args);
  
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
        
        <div class="alert alert-warning mt-3">
          <strong>BS Stepper Required:</strong>
          <pre class="mb-0"><code>// Include BS Stepper library
&lt;link rel="stylesheet" href="path/to/bs-stepper.min.css"&gt;
&lt;script src="path/to/bs-stepper.min.js"&gt;&lt;/script&gt;

// Initialize
var stepper1 = new Stepper(document.querySelector('#stepper1'));</code></pre>
        </div>
      </div>
    </details>
  `;
};

export const Overview = () => `
  <div class="row g-4">
    <div class="col-12">
      <h5>Horizontal Stepper</h5>
      <div class="card">
        <div class="card-body">
          <div class="bs-stepper">
            <div class="bs-stepper-header">
              <div class="step active" data-target="#horizontal-step-1">
                <button type="button" class="step-trigger">
                  <span class="bs-stepper-circle">1</span>
                  <span class="bs-stepper-label">First Step</span>
                </button>
              </div>
              <div class="line"></div>
              <div class="step" data-target="#horizontal-step-2">
                <button type="button" class="step-trigger">
                  <span class="bs-stepper-circle">2</span>
                  <span class="bs-stepper-label">Second Step</span>
                </button>
              </div>
              <div class="line"></div>
              <div class="step" data-target="#horizontal-step-3">
                <button type="button" class="step-trigger">
                  <span class="bs-stepper-circle">3</span>
                  <span class="bs-stepper-label">Third Step</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <div class="col-md-6 mt-5">
      <h5>With Icons</h5>
      <div class="card">
        <div class="card-body">
          <div class="bs-stepper">
            <div class="bs-stepper-header">
              <div class="step completed">
                <button type="button" class="step-trigger">
                  <span class="bs-stepper-circle">
                    <i class="bx bx-check"></i>
                  </span>
                  <span class="bs-stepper-label">Account</span>
                </button>
              </div>
              <div class="line"></div>
              <div class="step active">
                <button type="button" class="step-trigger">
                  <span class="bs-stepper-circle">
                    <i class="bx bx-user"></i>
                  </span>
                  <span class="bs-stepper-label">Profile</span>
                </button>
              </div>
              <div class="line"></div>
              <div class="step">
                <button type="button" class="step-trigger">
                  <span class="bs-stepper-circle">
                    <i class="bx bx-check-circle"></i>
                  </span>
                  <span class="bs-stepper-label">Done</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <div class="col-md-6 mt-5">
      <h5>Vertical Stepper</h5>
      <div class="card">
        <div class="card-body">
          <div class="bs-stepper bs-stepper-vertical">
            <div class="bs-stepper-header">
              <div class="step completed">
                <button type="button" class="step-trigger">
                  <span class="bs-stepper-circle">1</span>
                  <span class="bs-stepper-label">Completed</span>
                </button>
              </div>
              <div class="line"></div>
              <div class="step active">
                <button type="button" class="step-trigger">
                  <span class="bs-stepper-circle">2</span>
                  <span class="bs-stepper-label">Active</span>
                </button>
              </div>
              <div class="line"></div>
              <div class="step">
                <button type="button" class="step-trigger">
                  <span class="bs-stepper-circle">3</span>
                  <span class="bs-stepper-label">Pending</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <div class="col-12 mt-5">
      <h5>Checkout Process Example</h5>
      <div class="card">
        <div class="card-body">
          <div class="bs-stepper">
            <div class="bs-stepper-header">
              <div class="step completed">
                <button type="button" class="step-trigger">
                  <span class="bs-stepper-circle">
                    <i class="bx bx-cart"></i>
                  </span>
                  <span class="bs-stepper-label">
                    <span class="bs-stepper-title">Cart</span>
                    <span class="bs-stepper-subtitle">Review items</span>
                  </span>
                </button>
              </div>
              <div class="line"></div>
              <div class="step active">
                <button type="button" class="step-trigger">
                  <span class="bs-stepper-circle">
                    <i class="bx bx-map"></i>
                  </span>
                  <span class="bs-stepper-label">
                    <span class="bs-stepper-title">Address</span>
                    <span class="bs-stepper-subtitle">Shipping info</span>
                  </span>
                </button>
              </div>
              <div class="line"></div>
              <div class="step">
                <button type="button" class="step-trigger">
                  <span class="bs-stepper-circle">
                    <i class="bx bx-credit-card"></i>
                  </span>
                  <span class="bs-stepper-label">
                    <span class="bs-stepper-title">Payment</span>
                    <span class="bs-stepper-subtitle">Payment method</span>
                  </span>
                </button>
              </div>
              <div class="line"></div>
              <div class="step">
                <button type="button" class="step-trigger">
                  <span class="bs-stepper-circle">
                    <i class="bx bx-check-circle"></i>
                  </span>
                  <span class="bs-stepper-label">
                    <span class="bs-stepper-title">Confirm</span>
                    <span class="bs-stepper-subtitle">Review & submit</span>
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <div class="col-12 mt-5">
      <h5>Progress States</h5>
      <div class="row g-3">
        <div class="col-md-4">
          <div class="card">
            <div class="card-body">
              <h6>Completed</h6>
              <div class="bs-stepper">
                <div class="bs-stepper-header">
                  <div class="step completed">
                    <button type="button" class="step-trigger">
                      <span class="bs-stepper-circle bg-success">
                        <i class="bx bx-check text-white"></i>
                      </span>
                      <span class="bs-stepper-label">Done</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="col-md-4">
          <div class="card">
            <div class="card-body">
              <h6>Active</h6>
              <div class="bs-stepper">
                <div class="bs-stepper-header">
                  <div class="step active">
                    <button type="button" class="step-trigger">
                      <span class="bs-stepper-circle bg-primary">2</span>
                      <span class="bs-stepper-label">Current</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="col-md-4">
          <div class="card">
            <div class="card-body">
              <h6>Upcoming</h6>
              <div class="bs-stepper">
                <div class="bs-stepper-header">
                  <div class="step">
                    <button type="button" class="step-trigger">
                      <span class="bs-stepper-circle">3</span>
                      <span class="bs-stepper-label">Pending</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  
  <div class="alert alert-info mt-5">
    <i class="bx bx-info-circle mr-2"></i>
    <strong>BS Stepper Library Required:</strong> This component requires the BS Stepper library. Include the CSS and JS files, then initialize with <code>new Stepper(element)</code>.
  </div>
`;

export const Default = Template.bind({});
Default.args = {
  vertical: false,
  linear: true
};

export const Vertical = Template.bind({});
Vertical.args = {
  vertical: true,
  linear: true
};

export const NonLinear = Template.bind({});
NonLinear.args = {
  vertical: false,
  linear: false
};

/**
 * ====================================
 * INTERACTIVE STORY - BS Stepper Real
 * ====================================
 */

export const Interactive = {
  parameters: {
    docs: {
      description: {
        story: `
### Stepper com BS Stepper Real

Implementação oficial usando BS Stepper do Vuexy:

- ✅ **Linear Mode** - obriga seguir ordem (1→2→3)
- ✅ **Non-linear Mode** - permite pular etapas
- ✅ **Validation** - valida antes de avançar
- ✅ **Buttons** - Previous/Next para navegação
- ✅ **Progress** - mostra etapa atual
- ✅ **Icons** - ícones em cada etapa
- ✅ **Completed State** - marca etapas concluídas

**Casos de uso:**
- Formulário multi-step
- Checkout de compra
- Onboarding de usuário
- Configuração guiada
- Processo de cadastro

### Como testar:
1. Use botões Next/Previous
2. Teste validação (campos obrigatórios)
3. No non-linear, clique direto nas etapas
        `
      }
    }
  },
  loaders: [
    async () => {
      if (typeof window !== 'undefined') {
        // Load BS Stepper CSS
        if (!document.querySelector('link[href*="bs-stepper"]')) {
          return new Promise((resolve, reject) => {
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = '/vuexy/vendors/libs/bs-stepper/bs-stepper.css';
            link.onload = () => {
              // Load JS after CSS
              if (!window.Stepper) {
                const script = document.createElement('script');
                script.src = '/vuexy/vendors/libs/bs-stepper/bs-stepper.js';
                script.onload = () => {
                  console.log('✅ BS Stepper CSS + JS carregados');
                  resolve({ bsStepperLoaded: true });
                };
                script.onerror = () => reject(new Error('Failed to load BS Stepper JS'));
                document.head.appendChild(script);
              } else {
                resolve({ bsStepperLoaded: true });
              }
            };
            link.onerror = () => reject(new Error('Failed to load BS Stepper CSS'));
            document.head.appendChild(link);
          });
        }
        return { bsStepperLoaded: true };
      }
      return {};
    }
  ],
  render: () => {
    // Initialize BS Stepper after render
    setTimeout(() => {
      if (window.Stepper) {
        // Linear Stepper with Validation
        const stepperLinear = new Stepper(document.querySelector('#stepper-linear'), {
          linear: true,
          animation: true
        });
        
        // Validation on step 1
        document.getElementById('btn-next-1').addEventListener('click', function() {
          const name = document.getElementById('input-name').value;
          const email = document.getElementById('input-email').value;
          
          if (!name || !email) {
            alert('Preencha todos os campos obrigatórios!');
            return;
          }
          
          stepperLinear.next();
        });
        
        // Validation on step 2
        document.getElementById('btn-next-2').addEventListener('click', function() {
          const address = document.getElementById('input-address').value;
          const city = document.getElementById('input-city').value;
          
          if (!address || !city) {
            alert('Preencha todos os campos obrigatórios!');
            return;
          }
          
          stepperLinear.next();
        });
        
        // Submit final
        document.getElementById('btn-submit').addEventListener('click', function() {
          const name = document.getElementById('input-name').value;
          const email = document.getElementById('input-email').value;
          const address = document.getElementById('input-address').value;
          const city = document.getElementById('input-city').value;
          
          alert('Cadastro completo!\n\nNome: ' + name + '\nEmail: ' + email + '\nEndereço: ' + address + '\nCidade: ' + city);
        });
        
        // Previous buttons
        document.getElementById('btn-prev-2').addEventListener('click', () => stepperLinear.previous());
        document.getElementById('btn-prev-3').addEventListener('click', () => stepperLinear.previous());
        
        // Non-linear Stepper
        const stepperNonLinear = new Stepper(document.querySelector('#stepper-nonlinear'), {
          linear: false,
          animation: true
        });
        
        document.querySelectorAll('.btn-next-nl').forEach(btn => {
          btn.addEventListener('click', () => stepperNonLinear.next());
        });
        
        document.querySelectorAll('.btn-prev-nl').forEach(btn => {
          btn.addEventListener('click', () => stepperNonLinear.previous());
        });
        
        console.log('BS Stepper: 2 instancias inicializadas');
      }
    }, 100);

    return `
      <style>
        .bs-stepper-header {
          padding: 1rem;
          border-bottom: 1px solid #ddd;
        }
        .bs-stepper-content {
          padding: 2rem;
        }
        .step {
          cursor: pointer;
        }
        .step.active .step-trigger {
          background-color: #696cff !important;
          color: white !important;
        }
        .step.completed .step-trigger {
          background-color: #71dd37 !important;
          color: white !important;
        }
      </style>
      
      <div style="padding: 30px;">
        <h5 class="mb-4">
          <i class="ti tabler-stairs mr-2 text-primary"></i>
          Stepper Interativo com BS Stepper
        </h5>
        
        <!-- Linear Stepper with Validation -->
        <div class="card mb-4">
          <div class="card-header">
            <h6 class="mb-0">
              <i class="ti tabler-lock mr-2"></i>
              Linear Mode (com validação)
            </h6>
          </div>
          <div class="card-body p-0">
            <div id="stepper-linear" class="bs-stepper">
              <div class="bs-stepper-header">
                <div class="step" data-target="#step-1">
                  <button type="button" class="step-trigger">
                    <span class="bs-stepper-circle">
                      <i class="ti tabler-user"></i>
                    </span>
                    <span class="bs-stepper-label">
                      <span class="bs-stepper-title">Dados Pessoais</span>
                      <span class="bs-stepper-subtitle">Nome e Email</span>
                    </span>
                  </button>
                </div>
                <div class="line"></div>
                <div class="step" data-target="#step-2">
                  <button type="button" class="step-trigger">
                    <span class="bs-stepper-circle">
                      <i class="ti tabler-home"></i>
                    </span>
                    <span class="bs-stepper-label">
                      <span class="bs-stepper-title">Endereço</span>
                      <span class="bs-stepper-subtitle">Localização</span>
                    </span>
                  </button>
                </div>
                <div class="line"></div>
                <div class="step" data-target="#step-3">
                  <button type="button" class="step-trigger">
                    <span class="bs-stepper-circle">
                      <i class="ti tabler-check"></i>
                    </span>
                    <span class="bs-stepper-label">
                      <span class="bs-stepper-title">Confirmação</span>
                      <span class="bs-stepper-subtitle">Revisar</span>
                    </span>
                  </button>
                </div>
              </div>
              <div class="bs-stepper-content">
                <div id="step-1" class="content">
                  <h6 class="mb-3">Etapa 1: Dados Pessoais</h6>
                  <div class="row g-3">
                    <div class="col-md-6">
                      <label class="form-label">Nome Completo *</label>
                      <input type="text" class="form-control" id="input-name" placeholder="João Silva">
                    </div>
                    <div class="col-md-6">
                      <label class="form-label">Email *</label>
                      <input type="email" class="form-control" id="input-email" placeholder="joao@example.com">
                    </div>
                  </div>
                  <div class="mt-3">
                    <button class="btn btn-primary" id="btn-next-1">
                      Próximo <i class="ti tabler-arrow-right ml-1"></i>
                    </button>
                  </div>
                </div>
                <div id="step-2" class="content">
                  <h6 class="mb-3">Etapa 2: Endereço</h6>
                  <div class="row g-3">
                    <div class="col-12">
                      <label class="form-label">Endereço *</label>
                      <input type="text" class="form-control" id="input-address" placeholder="Rua ABC, 123">
                    </div>
                    <div class="col-md-6">
                      <label class="form-label">Cidade *</label>
                      <input type="text" class="form-control" id="input-city" placeholder="São Paulo">
                    </div>
                    <div class="col-md-6">
                      <label class="form-label">CEP</label>
                      <input type="text" class="form-control" placeholder="00000-000">
                    </div>
                  </div>
                  <div class="mt-3">
                    <button class="btn btn-outline-secondary mr-2" id="btn-prev-2">
                      <i class="ti tabler-arrow-left mr-1"></i> Voltar
                    </button>
                    <button class="btn btn-primary" id="btn-next-2">
                      Próximo <i class="ti tabler-arrow-right ml-1"></i>
                    </button>
                  </div>
                </div>
                <div id="step-3" class="content">
                  <h6 class="mb-3">Etapa 3: Confirmação</h6>
                  <div class="alert alert-success">
                    <i class="ti tabler-circle-check mr-2"></i>
                    Todas as informações foram preenchidas!
                  </div>
                  <p>Revise seus dados e clique em "Finalizar" para concluir o cadastro.</p>
                  <div class="mt-3">
                    <button class="btn btn-outline-secondary mr-2" id="btn-prev-3">
                      <i class="ti tabler-arrow-left mr-1"></i> Voltar
                    </button>
                    <button class="btn btn-success" id="btn-submit">
                      <i class="ti tabler-check mr-1"></i> Finalizar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Non-linear Stepper -->
        <div class="card">
          <div class="card-header">
            <h6 class="mb-0">
              <i class="ti tabler-arrow-bounce mr-2"></i>
              Non-linear Mode (navegação livre)
            </h6>
          </div>
          <div class="card-body p-0">
            <div id="stepper-nonlinear" class="bs-stepper">
              <div class="bs-stepper-header">
                <div class="step" data-target="#nl-step-1">
                  <button type="button" class="step-trigger">
                    <span class="bs-stepper-circle">1</span>
                    <span class="bs-stepper-label">Escolha</span>
                  </button>
                </div>
                <div class="line"></div>
                <div class="step" data-target="#nl-step-2">
                  <button type="button" class="step-trigger">
                    <span class="bs-stepper-circle">2</span>
                    <span class="bs-stepper-label">Configuração</span>
                  </button>
                </div>
                <div class="line"></div>
                <div class="step" data-target="#nl-step-3">
                  <button type="button" class="step-trigger">
                    <span class="bs-stepper-circle">3</span>
                    <span class="bs-stepper-label">Resumo</span>
                  </button>
                </div>
              </div>
              <div class="bs-stepper-content">
                <div id="nl-step-1" class="content">
                  <h6 class="mb-3">Escolha seu Plano</h6>
                  <div class="row g-3">
                    <div class="col-md-4">
                      <div class="card border">
                        <div class="card-body text-center">
                          <h5>Free</h5>
                          <p class="text-muted">R$ 0/mês</p>
                        </div>
                      </div>
                    </div>
                    <div class="col-md-4">
                      <div class="card border-primary">
                        <div class="card-body text-center">
                          <h5 class="text-primary">Pro</h5>
                          <p class="text-muted">R$ 49/mês</p>
                        </div>
                      </div>
                    </div>
                    <div class="col-md-4">
                      <div class="card border">
                        <div class="card-body text-center">
                          <h5>Enterprise</h5>
                          <p class="text-muted">R$ 199/mês</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="mt-3">
                    <button class="btn btn-primary btn-next-nl">Próximo</button>
                  </div>
                </div>
                <div id="nl-step-2" class="content">
                  <h6 class="mb-3">Configurações</h6>
                  <div class="form-check mb-2">
                    <input class="form-check-input" type="checkbox" id="feature1">
                    <label class="form-check-label" for="feature1">Feature 1</label>
                  </div>
                  <div class="form-check mb-2">
                    <input class="form-check-input" type="checkbox" id="feature2">
                    <label class="form-check-label" for="feature2">Feature 2</label>
                  </div>
                  <div class="mt-3">
                    <button class="btn btn-outline-secondary mr-2 btn-prev-nl">Voltar</button>
                    <button class="btn btn-primary btn-next-nl">Próximo</button>
                  </div>
                </div>
                <div id="nl-step-3" class="content">
                  <h6 class="mb-3">Resumo do Pedido</h6>
                  <p>Clique direto nas etapas acima para navegar livremente!</p>
                  <div class="mt-3">
                    <button class="btn btn-outline-secondary mr-2 btn-prev-nl">Voltar</button>
                    <button class="btn btn-success">Confirmar</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="alert alert-info mt-4">
          <strong>💡 Teste a interatividade:</strong>
          <ul class="mb-0 mt-2">
            <li><strong>Linear Mode:</strong> Tente clicar na etapa 3 (não funciona - precisa ir em ordem)</li>
            <li><strong>Validação:</strong> Na etapa 1, clique "Próximo" sem preencher (mostra alerta)</li>
            <li><strong>Previous:</strong> Use botão "Voltar" para retornar etapa anterior</li>
            <li><strong>Non-linear:</strong> Na segunda tabela, clique direto em qualquer etapa (funciona!)</li>
            <li><strong>Icons:</strong> Ícones na etapa 1-2-3 do stepper linear</li>
            <li><strong>Subtitles:</strong> Descrições abaixo dos títulos das etapas</li>
            <li><strong>States:</strong> Ativo (azul), Completo (verde), Pendente (cinza)</li>
            <li><strong>Animation:</strong> Transição suave entre etapas</li>
          </ul>
        </div>
      </div>
    `;
  }
};
