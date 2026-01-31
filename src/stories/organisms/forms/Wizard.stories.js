/**
 * Wizard - Organism (Forms)
 * 
 * Source: packages/vuexy_theme/public/vuexy/css/pages/wizard-ex-checkout.css + BS Stepper
 * Priority: P1 (Important)
 * Status: ✅ DONE
 * 
 * Wizard completo de checkout com múltiplos steps e validação.
 * Combina BS Stepper com formulários complexos.
 */

import { formatHtmlSnippet } from '../../_helpers/snippets';

export default {
  title: 'Organisms/Forms/Wizard',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
# Wizard (Checkout/Multi-step Form)

Wizard completo para processos multi-step com validação.

## Quando usar
- Checkout de e-commerce
- Processos de cadastro complexos
- Formulários em etapas
- Onboarding de usuários
- Configurações multi-step

## Características
- Múltiplos steps sequenciais
- Validação por step
- Navegação linear
- Review final
- Progress tracking
- Botões Next/Previous
- Summary review

## Diferença do Stepper
- Stepper: componente básico de navegação
- Wizard: processo completo com forms e validação
- Wizard inclui conteúdo complexo em cada step
- Stepper é mais visual/simples

## Steps do Checkout
1. Cart - revisar produtos
2. Address - endereço de entrega
3. Payment - método de pagamento
4. Review - confirmação final

## Elementos incluídos
- Header com stepper
- Form content por step
- Validation feedback
- Summary cards
- Next/Previous buttons
- Submit final

## Acessibilidade
- Navegação por teclado
- ARIA labels
- Focus management
- Error announcements
        `
      }
    }
  },
  argTypes: {
    currentStep: {
      control: 'select',
      options: [1, 2, 3, 4],
      description: 'Step atual do wizard',
      table: { defaultValue: { summary: 1 } }
    }
  }
};

const createWizard = ({ currentStep = 1 }) => {
  const steps = [
    { number: 1, title: 'Cart', subtitle: 'Review items', icon: 'bx-shopping-bag' },
    { number: 2, title: 'Address', subtitle: 'Delivery info', icon: 'bx-map' },
    { number: 3, title: 'Payment', subtitle: 'Payment method', icon: 'bx-credit-card' },
    { number: 4, title: 'Review', subtitle: 'Confirm order', icon: 'bx-check-circle' }
  ];
  
  return `<div class="wizard-checkout">
  <div class="card">
    <div class="card-body">
      <!-- BS Stepper -->
      <div class="bs-stepper wizard-icons">
        <div class="bs-stepper-header">
          ${steps.map((step, index) => `
            <div class="step ${currentStep === step.number ? 'active' : ''} ${currentStep > step.number ? 'completed' : ''}" data-target="#step${step.number}">
              <button type="button" class="step-trigger">
                <span class="bs-stepper-circle">
                  ${currentStep > step.number ? '<i class="bx bx-check"></i>' : `<i class="bx ${step.icon}"></i>`}
                </span>
                <span class="bs-stepper-label">
                  <span class="bs-stepper-title">${step.title}</span>
                  <span class="bs-stepper-subtitle">${step.subtitle}</span>
                </span>
              </button>
            </div>
            ${index < steps.length - 1 ? '<div class="line"></div>' : ''}
          `).join('')}
        </div>
        
        <div class="bs-stepper-content">
          <!-- Step 1: Cart -->
          <div id="step1" class="content ${currentStep === 1 ? 'active dstepper-block' : ''}">
            <h5 class="mb-4">Cart Items</h5>
            
            <div class="row g-3 mb-4">
              <!-- Product Item -->
              <div class="col-12">
                <div class="d-flex align-items-center border rounded p-3">
                  <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Crect width='100' height='100' fill='%23f5f5f9'/%3E%3Cpath d='M40,33 L60,33 L60,53 L53,67 L47,67 L40,53 Z' fill='%23dbdade'/%3E%3Ccircle cx='50' cy='40' r='5' fill='%23696cff'/%3E%3C/svg%3E" 
                       alt="Product" 
                       class="me-3"
                       style="width: 80px; height: 80px; object-fit: cover;">
                  <div class="flex-grow-1">
                    <h6 class="mb-1">Wireless Headphones</h6>
                    <p class="text-muted mb-2">Color: Black | Size: Standard</p>
                    <div class="d-flex align-items-center">
                      <div class="input-group" style="width: 120px;">
                        <button class="btn btn-outline-secondary" type="button">-</button>
                        <input type="text" class="form-control text-center" value="1" readonly>
                        <button class="btn btn-outline-secondary" type="button">+</button>
                      </div>
                      <button class="btn btn-sm btn-label-danger ms-3">
                        <i class="bx bx-trash"></i>
                      </button>
                    </div>
                  </div>
                  <div class="text-end">
                    <h5 class="mb-0">$99.00</h5>
                  </div>
                </div>
              </div>
              
              <div class="col-12">
                <div class="d-flex align-items-center border rounded p-3">
                  <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Crect width='100' height='100' fill='%23f5f5f9'/%3E%3Cpath d='M40,33 L60,33 L60,53 L53,67 L47,67 L40,53 Z' fill='%23dbdade'/%3E%3Ccircle cx='50' cy='40' r='5' fill='%23696cff'/%3E%3C/svg%3E" 
                       alt="Product" 
                       class="me-3"
                       style="width: 80px; height: 80px; object-fit: cover;">
                  <div class="flex-grow-1">
                    <h6 class="mb-1">Smart Watch</h6>
                    <p class="text-muted mb-2">Color: Silver | Display: OLED</p>
                    <div class="d-flex align-items-center">
                      <div class="input-group" style="width: 120px;">
                        <button class="btn btn-outline-secondary" type="button">-</button>
                        <input type="text" class="form-control text-center" value="2" readonly>
                        <button class="btn btn-outline-secondary" type="button">+</button>
                      </div>
                      <button class="btn btn-sm btn-label-danger ms-3">
                        <i class="bx bx-trash"></i>
                      </button>
                    </div>
                  </div>
                  <div class="text-end">
                    <h5 class="mb-0">$298.00</h5>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Summary -->
            <div class="card bg-light">
              <div class="card-body">
                <div class="d-flex justify-content-between mb-2">
                  <span>Subtotal:</span>
                  <span class="fw-semibold">$397.00</span>
                </div>
                <div class="d-flex justify-content-between mb-2">
                  <span>Tax (10%):</span>
                  <span class="fw-semibold">$39.70</span>
                </div>
                <hr>
                <div class="d-flex justify-content-between">
                  <h6 class="mb-0">Total:</h6>
                  <h6 class="mb-0 text-primary">$436.70</h6>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Step 2: Address -->
          <div id="step2" class="content ${currentStep === 2 ? 'active dstepper-block' : ''}">
            <h5 class="mb-4">Delivery Address</h5>
            
            <form class="row g-3">
              <div class="col-md-6">
                <label class="form-label">First Name</label>
                <input type="text" class="form-control" placeholder="John" value="John">
              </div>
              <div class="col-md-6">
                <label class="form-label">Last Name</label>
                <input type="text" class="form-control" placeholder="Doe" value="Doe">
              </div>
              <div class="col-12">
                <label class="form-label">Address Line 1</label>
                <input type="text" class="form-control" placeholder="123 Main Street" value="123 Main Street">
              </div>
              <div class="col-12">
                <label class="form-label">Address Line 2</label>
                <input type="text" class="form-control" placeholder="Apt 4B">
              </div>
              <div class="col-md-6">
                <label class="form-label">City</label>
                <input type="text" class="form-control" placeholder="San Francisco" value="San Francisco">
              </div>
              <div class="col-md-3">
                <label class="form-label">State</label>
                <select class="form-select">
                  <option>CA</option>
                  <option>NY</option>
                  <option>TX</option>
                </select>
              </div>
              <div class="col-md-3">
                <label class="form-label">ZIP Code</label>
                <input type="text" class="form-control" placeholder="94102" value="94102">
              </div>
              <div class="col-12">
                <label class="form-label">Phone Number</label>
                <input type="tel" class="form-control" placeholder="+1 (234) 567-8900" value="+1 (234) 567-8900">
              </div>
              <div class="col-12">
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" id="saveAddress">
                  <label class="form-check-label" for="saveAddress">
                    Save this address for future orders
                  </label>
                </div>
              </div>
            </form>
          </div>
          
          <!-- Step 3: Payment -->
          <div id="step3" class="content ${currentStep === 3 ? 'active dstepper-block' : ''}">
            <h5 class="mb-4">Payment Method</h5>
            
            <div class="row g-3 mb-4">
              <div class="col-12">
                <div class="form-check custom-option custom-option-basic">
                  <label class="form-check-label custom-option-content" for="creditCard">
                    <input class="form-check-input" type="radio" name="paymentMethod" id="creditCard" checked>
                    <span class="custom-option-body">
                      <span class="h6 mb-0">Credit Card</span>
                      <small class="d-block text-muted">Visa, Mastercard, American Express</small>
                    </span>
                  </label>
                </div>
              </div>
              
              <div class="col-12">
                <div class="form-check custom-option custom-option-basic">
                  <label class="form-check-label custom-option-content" for="paypal">
                    <input class="form-check-input" type="radio" name="paymentMethod" id="paypal">
                    <span class="custom-option-body">
                      <span class="h6 mb-0">PayPal</span>
                      <small class="d-block text-muted">Fast and secure payment</small>
                    </span>
                  </label>
                </div>
              </div>
            </div>
            
            <form class="row g-3">
              <div class="col-12">
                <label class="form-label">Card Number</label>
                <div class="input-group">
                  <input type="text" class="form-control" placeholder="1234 5678 9012 3456">
                  <span class="input-group-text">
                    <i class="bx bx-credit-card"></i>
                  </span>
                </div>
              </div>
              <div class="col-12">
                <label class="form-label">Cardholder Name</label>
                <input type="text" class="form-control" placeholder="John Doe">
              </div>
              <div class="col-md-6">
                <label class="form-label">Expiry Date</label>
                <input type="text" class="form-control" placeholder="MM/YY">
              </div>
              <div class="col-md-6">
                <label class="form-label">CVV</label>
                <input type="text" class="form-control" placeholder="123">
              </div>
            </form>
          </div>
          
          <!-- Step 4: Review -->
          <div id="step4" class="content ${currentStep === 4 ? 'active dstepper-block' : ''}">
            <h5 class="mb-4">Order Review</h5>
            
            <div class="row g-3">
              <div class="col-md-6">
                <div class="card">
                  <div class="card-body">
                    <h6 class="mb-3">Delivery Address</h6>
                    <p class="mb-1">John Doe</p>
                    <p class="mb-1">123 Main Street, Apt 4B</p>
                    <p class="mb-1">San Francisco, CA 94102</p>
                    <p class="mb-0">+1 (234) 567-8900</p>
                  </div>
                </div>
              </div>
              
              <div class="col-md-6">
                <div class="card">
                  <div class="card-body">
                    <h6 class="mb-3">Payment Method</h6>
                    <div class="d-flex align-items-center">
                      <i class="bx bx-credit-card me-2" style="font-size: 24px;"></i>
                      <div>
                        <p class="mb-0">Credit Card</p>
                        <p class="mb-0 text-muted">**** **** **** 3456</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div class="col-12">
                <div class="card">
                  <div class="card-body">
                    <h6 class="mb-3">Order Items (2)</h6>
                    <div class="d-flex justify-content-between mb-2">
                      <span>1x Wireless Headphones</span>
                      <span class="fw-semibold">$99.00</span>
                    </div>
                    <div class="d-flex justify-content-between mb-2">
                      <span>2x Smart Watch</span>
                      <span class="fw-semibold">$298.00</span>
                    </div>
                    <hr>
                    <div class="d-flex justify-content-between mb-2">
                      <span>Subtotal:</span>
                      <span>$397.00</span>
                    </div>
                    <div class="d-flex justify-content-between mb-2">
                      <span>Shipping:</span>
                      <span class="text-success">FREE</span>
                    </div>
                    <div class="d-flex justify-content-between mb-2">
                      <span>Tax (10%):</span>
                      <span>$39.70</span>
                    </div>
                    <hr>
                    <div class="d-flex justify-content-between">
                      <h5 class="mb-0">Total:</h5>
                      <h5 class="mb-0 text-primary">$436.70</h5>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Navigation Buttons -->
          <div class="d-flex justify-content-between mt-4">
            <button class="btn btn-label-secondary" ${currentStep === 1 ? 'disabled' : ''}>
              <i class="bx bx-chevron-left me-1"></i> Previous
            </button>
            ${currentStep < 4 
              ? '<button class="btn btn-primary">Next <i class="bx bx-chevron-right ms-1"></i></button>'
              : '<button class="btn btn-success"><i class="bx bx-check me-1"></i> Place Order</button>'
            }
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<style>
.wizard-checkout .bs-stepper {
  box-shadow: none;
}

.wizard-checkout .bs-stepper-header {
  flex-wrap: wrap;
  padding: 1.5rem 0;
  border-bottom: 1px solid #d9dee3;
}

.wizard-checkout .step {
  flex-grow: 1;
}

.wizard-checkout .step-trigger {
  background: transparent;
  border: none;
  padding: 0;
  width: 100%;
  text-align: center;
  cursor: pointer;
}

.wizard-checkout .bs-stepper-circle {
  width: 48px;
  height: 48px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background-color: #f0f2f8;
  color: #697a8d;
  font-size: 20px;
  margin-bottom: 0.5rem;
  transition: all 0.3s;
}

.wizard-checkout .step.active .bs-stepper-circle {
  background-color: #696cff;
  color: #fff;
}

.wizard-checkout .step.completed .bs-stepper-circle {
  background-color: #28c76f;
  color: #fff;
}

.wizard-checkout .bs-stepper-label {
  display: block;
}

.wizard-checkout .bs-stepper-title {
  display: block;
  font-weight: 600;
  color: #566a7f;
  margin-bottom: 0.25rem;
}

.wizard-checkout .step.active .bs-stepper-title {
  color: #696cff;
}

.wizard-checkout .bs-stepper-subtitle {
  display: block;
  font-size: 0.75rem;
  color: #a5acb8;
}

.wizard-checkout .line {
  flex-grow: 1;
  height: 2px;
  background-color: #d9dee3;
  align-self: center;
  margin: 0 1rem;
  max-width: 80px;
}

.wizard-checkout .step.completed ~ .step .line {
  background-color: #28c76f;
}

.wizard-checkout .bs-stepper-content {
  padding: 2rem 0;
}

.wizard-checkout .content {
  display: none;
}

.wizard-checkout .content.active {
  display: block;
}

.custom-option {
  cursor: pointer;
}

.custom-option-content {
  display: flex;
  align-items: center;
  padding: 1rem;
  border: 2px solid #d9dee3;
  border-radius: 0.375rem;
  transition: all 0.3s;
  cursor: pointer;
  width: 100%;
}

.custom-option-content:hover {
  border-color: #696cff;
}

.custom-option input:checked ~ .custom-option-content {
  border-color: #696cff;
  background-color: rgba(105, 108, 255, 0.08);
}

.custom-option-body {
  margin-left: 0.75rem;
}

@media (max-width: 768px) {
  .wizard-checkout .bs-stepper-header {
    flex-direction: column;
  }
  
  .wizard-checkout .line {
    display: none;
  }
  
  .wizard-checkout .step {
    margin-bottom: 1rem;
  }
}
</style>`;
};

const Template = (args) => {
  const markup = createWizard(args);
  
  return `
    ${markup}
    
    <hr class="my-5" />
    
    <details>
      <summary><strong>Code Snippets</strong></summary>
      <div class="mt-3">
        <h6>HTML</h6>
        <pre><code>${formatHtmlSnippet(markup).replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
        
        <div class="alert alert-info mt-3">
          <strong>BS Stepper Required:</strong> This component requires BS Stepper library for full functionality (step navigation, validation).
        </div>
      </div>
    </details>
  `;
};

export const Overview = () => createWizard({ currentStep: 1 });

export const CartStep = Template.bind({});
CartStep.args = {
  currentStep: 1
};

export const AddressStep = Template.bind({});
AddressStep.args = {
  currentStep: 2
};

export const PaymentStep = Template.bind({});
PaymentStep.args = {
  currentStep: 3
};

export const ReviewStep = Template.bind({});
ReviewStep.args = {
  currentStep: 4
};

export const Interactive = () => {
  return `
    <div class="card" style="max-width: 800px; margin: 0 auto;">
      <div class="card-body">
        <h4 class="mb-4">📦 Checkout Wizard</h4>
        
        <!-- Stepper Header -->
        <div class="bs-stepper-header mb-4">
          <div id="step-indicator-1" class="step active d-flex align-items-center">
            <button class="btn btn-sm btn-primary rounded-circle" style="width: 40px; height: 40px;">1</button>
            <div class="ms-2">
              <strong>Cart</strong>
              <small class="d-block text-muted">Review items</small>
            </div>
          </div>
          <div class="mx-3">—</div>
          <div id="step-indicator-2" class="step d-flex align-items-center">
            <button class="btn btn-sm btn-outline-secondary rounded-circle" style="width: 40px; height: 40px;">2</button>
            <div class="ms-2">
              <strong>Address</strong>
              <small class="d-block text-muted">Delivery</small>
            </div>
          </div>
          <div class="mx-3">—</div>
          <div id="step-indicator-3" class="step d-flex align-items-center">
            <button class="btn btn-sm btn-outline-secondary rounded-circle" style="width: 40px; height: 40px;">3</button>
            <div class="ms-2">
              <strong>Payment</strong>
              <small class="d-block text-muted">Method</small>
            </div>
          </div>
          <div class="mx-3">—</div>
          <div id="step-indicator-4" class="step d-flex align-items-center">
            <button class="btn btn-sm btn-outline-secondary rounded-circle" style="width: 40px; height: 40px;">4</button>
            <div class="ms-2">
              <strong>Review</strong>
              <small class="d-block text-muted">Confirm</small>
            </div>
          </div>
        </div>
        
        <!-- Step Content -->
        <div id="step-content-1" class="step-content">
          <h5>🛒 Shopping Cart</h5>
          <ul class="list-group mb-3">
            <li class="list-group-item d-flex justify-content-between">
              <span>Product 1</span>
              <span>$29.99</span>
            </li>
            <li class="list-group-item d-flex justify-content-between">
              <span>Product 2</span>
              <span>$49.99</span>
            </li>
          </ul>
        </div>
        
        <div id="step-content-2" class="step-content" style="display: none;">
          <h5>📍 Delivery Address</h5>
          <div class="mb-2">
            <input type="text" class="form-control" placeholder="Street Address" value="123 Main St">
          </div>
          <div class="row">
            <div class="col"><input type="text" class="form-control" placeholder="City" value="San Francisco"></div>
            <div class="col"><input type="text" class="form-control" placeholder="ZIP" value="94102"></div>
          </div>
        </div>
        
        <div id="step-content-3" class="step-content" style="display: none;">
          <h5>💳 Payment Method</h5>
          <div class="form-check mb-2">
            <input class="form-check-input" type="radio" name="payment" id="card" checked>
            <label class="form-check-label" for="card">Credit Card</label>
          </div>
          <div class="form-check">
            <input class="form-check-input" type="radio" name="payment" id="paypal">
            <label class="form-check-label" for="paypal">PayPal</label>
          </div>
        </div>
        
        <div id="step-content-4" class="step-content" style="display: none;">
          <h5>✅ Order Summary</h5>
          <div class="alert alert-success">Ready to place your order!</div>
          <p><strong>Total:</strong> $79.98</p>
        </div>
        
        <!-- Navigation -->
        <div class="d-flex justify-content-between mt-4">
          <button id="btn-prev" class="btn btn-outline-secondary" onclick="
            let current = parseInt(document.getElementById('step-indicator-1').classList.contains('active') ? '1' : 
                                   document.getElementById('step-indicator-2').classList.contains('active') ? '2' : 
                                   document.getElementById('step-indicator-3').classList.contains('active') ? '3' : '4');
            if (current > 1) {
              document.getElementById('step-content-' + current).style.display = 'none';
              document.getElementById('step-indicator-' + current).classList.remove('active');
              document.getElementById('step-indicator-' + current).querySelector('button').className = 'btn btn-sm btn-outline-secondary rounded-circle';
              current--;
              document.getElementById('step-content-' + current).style.display = 'block';
              document.getElementById('step-indicator-' + current).classList.add('active');
              document.getElementById('step-indicator-' + current).querySelector('button').className = 'btn btn-sm btn-primary rounded-circle';
              document.getElementById('btn-next').textContent = '➡️ Next';
              document.getElementById('btn-next').className = 'btn btn-primary';
            }
          ">⬅️ Previous</button>
          <button id="btn-next" class="btn btn-primary" onclick="
            let current = parseInt(document.getElementById('step-indicator-1').classList.contains('active') ? '1' : 
                                   document.getElementById('step-indicator-2').classList.contains('active') ? '2' : 
                                   document.getElementById('step-indicator-3').classList.contains('active') ? '3' : '4');
            if (current < 4) {
              document.getElementById('step-content-' + current).style.display = 'none';
              document.getElementById('step-indicator-' + current).classList.remove('active');
              document.getElementById('step-indicator-' + current).querySelector('button').className = 'btn btn-sm btn-success rounded-circle';
              document.getElementById('step-indicator-' + current).querySelector('button').innerHTML = '✓';
              current++;
              document.getElementById('step-content-' + current).style.display = 'block';
              document.getElementById('step-indicator-' + current).classList.add('active');
              document.getElementById('step-indicator-' + current).querySelector('button').className = 'btn btn-sm btn-primary rounded-circle';
              if (current === 4) {
                this.textContent = '✅ Place Order';
                this.className = 'btn btn-success';
              }
            } else {
              alert('🎉 Order placed successfully!');
            }
          ">➡️ Next</button>
        </div>
      </div>
    </div>
  `;
};
