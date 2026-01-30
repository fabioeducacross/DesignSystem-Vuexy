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
  title: 'Molecules/Navigation/Stepper',
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
      <button class="btn btn-secondary me-2" onclick="stepper1.previous()">Previous</button>
      <button class="btn btn-primary" onclick="stepper1.next()">Next</button>
    </div>
    <div id="step-3" class="content">
      <h5>Review</h5>
      <p class="text-muted">Review your information and submit</p>
      <div class="alert alert-info">
        <strong>Ready to submit!</strong> Please review your information before submitting.
      </div>
      <button class="btn btn-secondary me-2" onclick="stepper1.previous()">Previous</button>
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
    <i class="bx bx-info-circle me-2"></i>
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
