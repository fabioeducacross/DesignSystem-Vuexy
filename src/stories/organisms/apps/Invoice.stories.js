/**
 * Invoice - Organism (Apps)
 * 
 * Source: packages/vuexy_theme/public/vuexy/css/pages/app-invoice.css
 * Priority: P2 (Nice-to-have)
 * Status: ✅ DONE
 * 
 * Template de fatura/nota fiscal para impressão.
 */

import { formatHtmlSnippet } from '../../_helpers/snippets';

export default {
  title: 'Vuexy/Organisms/Apps/Invoice',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
# Invoice

Template de fatura/nota fiscal profissional.

## Quando usar
- Emissão de faturas
- Notas fiscais
- Recibos
- Cotações
- Ordens de compra

## Características
- Header com logo e info da empresa
- Dados do cliente
- Número da fatura
- Data de emissão e vencimento
- Tabela de itens
- Subtotal, tax, desconto
- Total
- Notas e termos
- Botões de ação (Download, Print, Send)

## Elementos incluídos
- Company logo e info
- Invoice number e date
- Bill To / Ship To
- Items table (descrição, qty, preço, total)
- Totals breakdown
- Payment info
- Notes section
- Footer com termos

## Layout
- A4 format ready
- Print-friendly
- Professional design
- Clear hierarchy

## Acessibilidade
- Print styles
- Clear contrast
- Readable fonts
- Logical structure
        `
      }
    },
    layout: 'fullscreen'
  },
  argTypes: {
    status: {
      control: 'select',
      options: ['paid', 'pending', 'overdue'],
      description: 'Status do pagamento',
      table: { defaultValue: { summary: 'paid' } }
    }
  }
};

const createInvoice = ({ status = 'paid' }) => {
  const statusBadge = {
    paid: '<span class="badge bg-success">Paid</span>',
    pending: '<span class="badge bg-warning">Pending</span>',
    overdue: '<span class="badge bg-danger">Overdue</span>'
  };
  
  return `<div class="invoice-wrapper">
  <div class="invoice-container">
    <!-- Invoice Actions (No Print) -->
    <div class="invoice-actions d-print-none mb-4">
      <div class="d-flex justify-content-end gap-2">
        <button class="btn btn-label-secondary">
          <i class="bx bx-send me-1"></i> Send Invoice
        </button>
        <button class="btn btn-label-secondary" onclick="window.print()">
          <i class="bx bx-printer me-1"></i> Print
        </button>
        <button class="btn btn-primary">
          <i class="bx bx-download me-1"></i> Download
        </button>
      </div>
    </div>
    
    <!-- Invoice Card -->
    <div class="card invoice-card">
      <div class="card-body">
        <!-- Header -->
        <div class="row mb-4">
          <div class="col-md-6">
            <div class="d-flex align-items-center mb-3">
              <div class="avatar avatar-lg bg-label-primary rounded me-3">
                <span class="avatar-initial">V</span>
              </div>
              <div>
                <h5 class="mb-0">Vuexy Inc.</h5>
                <p class="text-muted mb-0">Design System Solutions</p>
              </div>
            </div>
            <div>
              <p class="mb-1">123 Business Street, Suite 100</p>
              <p class="mb-1">San Francisco, CA 94102</p>
              <p class="mb-1">+1 (234) 567-8900</p>
              <p class="mb-0">info@vuexy.com</p>
            </div>
          </div>
          
          <div class="col-md-6 text-md-end">
            <h2 class="mb-3">INVOICE</h2>
            <div class="mb-2">
              <strong>Invoice #:</strong> INV-2024-0089
            </div>
            <div class="mb-2">
              <strong>Date:</strong> January 30, 2026
            </div>
            <div class="mb-2">
              <strong>Due Date:</strong> February 15, 2026
            </div>
            <div>
              <strong>Status:</strong> ${statusBadge[status]}
            </div>
          </div>
        </div>
        
        <hr class="my-4">
        
        <!-- Bill To / Ship To -->
        <div class="row mb-4">
          <div class="col-md-6">
            <h6 class="mb-3">Bill To:</h6>
            <h6>Acme Corporation</h6>
            <p class="mb-1">John Doe</p>
            <p class="mb-1">456 Client Avenue</p>
            <p class="mb-1">New York, NY 10001</p>
            <p class="mb-1">+1 (987) 654-3210</p>
            <p class="mb-0">john.doe@acme.com</p>
          </div>
          
          <div class="col-md-6">
            <h6 class="mb-3">Ship To:</h6>
            <p class="mb-1">456 Client Avenue</p>
            <p class="mb-1">New York, NY 10001</p>
            <p class="mb-1">United States</p>
          </div>
        </div>
        
        <hr class="my-4">
        
        <!-- Items Table -->
        <div class="table-responsive mb-4">
          <table class="table table-borderless">
            <thead>
              <tr class="border-bottom">
                <th class="text-uppercase small text-muted pb-3">Description</th>
                <th class="text-uppercase small text-muted pb-3 text-end">Qty</th>
                <th class="text-uppercase small text-muted pb-3 text-end">Rate</th>
                <th class="text-uppercase small text-muted pb-3 text-end">Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr class="border-bottom">
                <td class="py-3">
                  <h6 class="mb-1">Design System Implementation</h6>
                  <small class="text-muted">Complete Vuexy theme integration with custom components</small>
                </td>
                <td class="py-3 text-end">1</td>
                <td class="py-3 text-end">$5,000.00</td>
                <td class="py-3 text-end">$5,000.00</td>
              </tr>
              <tr class="border-bottom">
                <td class="py-3">
                  <h6 class="mb-1">UI/UX Consulting</h6>
                  <small class="text-muted">User interface and experience consulting services (20 hours)</small>
                </td>
                <td class="py-3 text-end">20</td>
                <td class="py-3 text-end">$150.00</td>
                <td class="py-3 text-end">$3,000.00</td>
              </tr>
              <tr class="border-bottom">
                <td class="py-3">
                  <h6 class="mb-1">Component Development</h6>
                  <small class="text-muted">Custom React/Vue components development</small>
                </td>
                <td class="py-3 text-end">1</td>
                <td class="py-3 text-end">$2,500.00</td>
                <td class="py-3 text-end">$2,500.00</td>
              </tr>
              <tr class="border-bottom">
                <td class="py-3">
                  <h6 class="mb-1">Documentation & Training</h6>
                  <small class="text-muted">System documentation and team training sessions</small>
                </td>
                <td class="py-3 text-end">1</td>
                <td class="py-3 text-end">$1,500.00</td>
                <td class="py-3 text-end">$1,500.00</td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <!-- Totals -->
        <div class="row">
          <div class="col-md-7 col-lg-8">
            <div class="mb-4">
              <h6>Notes:</h6>
              <p class="text-muted mb-0">
                Thank you for your business! Payment is due within 15 days of invoice date. 
                Please include invoice number with your payment.
              </p>
            </div>
          </div>
          
          <div class="col-md-5 col-lg-4">
            <div class="invoice-totals">
              <div class="d-flex justify-content-between mb-2">
                <span>Subtotal:</span>
                <span class="fw-semibold">$12,000.00</span>
              </div>
              <div class="d-flex justify-content-between mb-2">
                <span>Discount (10%):</span>
                <span class="fw-semibold text-success">-$1,200.00</span>
              </div>
              <div class="d-flex justify-content-between mb-2">
                <span>Tax (8%):</span>
                <span class="fw-semibold">$864.00</span>
              </div>
              <hr class="my-3">
              <div class="d-flex justify-content-between">
                <h5 class="mb-0">Total:</h5>
                <h5 class="mb-0 text-primary">$11,664.00</h5>
              </div>
            </div>
          </div>
        </div>
        
        <hr class="my-4">
        
        <!-- Footer -->
        <div class="row">
          <div class="col-12">
            <h6 class="mb-3">Payment Information:</h6>
            <div class="row">
              <div class="col-md-6">
                <p class="mb-1"><strong>Bank Name:</strong> Chase Bank</p>
                <p class="mb-1"><strong>Account Name:</strong> Vuexy Inc.</p>
                <p class="mb-1"><strong>Account Number:</strong> 1234567890</p>
                <p class="mb-0"><strong>Routing Number:</strong> 021000021</p>
              </div>
              <div class="col-md-6">
                <p class="mb-1"><strong>Payment Terms:</strong> Net 15</p>
                <p class="mb-1"><strong>Late Fee:</strong> 5% per month</p>
              </div>
            </div>
          </div>
        </div>
        
        <div class="text-center mt-5 pt-4 border-top">
          <p class="text-muted mb-0">
            <small>This is a computer-generated invoice and does not require a signature.</small>
          </p>
        </div>
      </div>
    </div>
  </div>
</div>

<style>
.invoice-wrapper {
  background-color: #f8f9fa;
  min-height: 100vh;
  padding: 2rem 0;
}

.invoice-container {
  max-width: 900px;
  margin: 0 auto;
  padding: 0 1rem;
}

.invoice-card {
  box-shadow: 0 4px 24px 0 rgba(34, 41, 47, 0.1);
}

.avatar-lg {
  width: 3rem;
  height: 3rem;
  font-size: 1.25rem;
}

.avatar-initial {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background-color: rgba(105, 108, 255, 0.12);
  color: #696cff;
  font-weight: 600;
  border-radius: inherit;
}

.invoice-totals {
  background-color: #f8f9fa;
  padding: 1.5rem;
  border-radius: 0.375rem;
}

@media print {
  .invoice-wrapper {
    background-color: #fff;
    padding: 0;
  }
  
  .invoice-actions {
    display: none !important;
  }
  
  .invoice-card {
    box-shadow: none;
    border: none;
  }
  
  .card-body {
    padding: 0;
  }
}

@media (max-width: 768px) {
  .invoice-wrapper {
    padding: 1rem 0;
  }
  
  .invoice-card .card-body {
    padding: 1.5rem;
  }
}
</style>`;
};

const Template = (args) => {
  const markup = createInvoice(args);
  
  return `
    ${markup}
    
    <hr class="my-5" />
    
    <details>
      <summary><strong>Code Snippets</strong></summary>
      <div class="mt-3">
        <h6>HTML</h6>
        <pre><code>${formatHtmlSnippet(markup).replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
        
        <div class="alert alert-info mt-3">
          <strong>Print Ready:</strong> This invoice template includes print-specific styles. Use window.print() or the Print button.
        </div>
      </div>
    </details>
  `;
};

export const Overview = () => createInvoice({ status: 'paid' });

export const Paid = Template.bind({});
Paid.args = {
  status: 'paid'
};

export const Pending = Template.bind({});
Pending.args = {
  status: 'pending'
};

export const Overdue = Template.bind({});
Overdue.args = {
  status: 'overdue'
};

// Interactive Demo
export const Interactive = () => {
  const containerId = 'invoice-interactive-' + Math.random().toString(36).substr(2, 9);
  
  return `
    <div id="${containerId}" style="max-width: 800px;">
      <div class="alert alert-info mb-4">
        <i class="bx bx-info-circle me-2"></i>
        <strong>Interactive Demo:</strong> Change invoice status using the buttons.
      </div>
      
      <div class="card">
        <div class="card-header d-flex justify-content-between align-items-center">
          <h5 class="mb-0">Invoice #INV-2024-001</h5>
          <span id="statusBadge-${containerId}" class="badge bg-success">Paid</span>
        </div>
        <div class="card-body">
          <div class="row mb-4">
            <div class="col-md-6">
              <p class="mb-1"><strong>Client:</strong> Acme Corporation</p>
              <p class="mb-1"><strong>Date:</strong> January 31, 2026</p>
              <p class="mb-0"><strong>Due Date:</strong> February 15, 2026</p>
            </div>
            <div class="col-md-6 text-md-end">
              <h3 class="mb-0">$5,250.00</h3>
              <small class="text-muted">Total Amount</small>
            </div>
          </div>
          
          <table class="table table-sm">
            <thead>
              <tr>
                <th>Description</th>
                <th class="text-end">Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Web Design Services</td>
                <td class="text-end">$3,500.00</td>
              </tr>
              <tr>
                <td>Development Services</td>
                <td class="text-end">$1,500.00</td>
              </tr>
              <tr>
                <td>Consulting</td>
                <td class="text-end">$250.00</td>
              </tr>
            </tbody>
          </table>
          
          <div class="mt-4 pt-3 border-top">
            <p class="mb-3"><strong>Change Status:</strong></p>
            <div class="btn-group" role="group">
              <button class="btn btn-outline-success" onclick="
                document.getElementById('statusBadge-${containerId}').className = 'badge bg-success';
                document.getElementById('statusBadge-${containerId}').textContent = 'Paid';
              ">Paid</button>
              <button class="btn btn-outline-warning" onclick="
                document.getElementById('statusBadge-${containerId}').className = 'badge bg-warning';
                document.getElementById('statusBadge-${containerId}').textContent = 'Pending';
              ">Pending</button>
              <button class="btn btn-outline-danger" onclick="
                document.getElementById('statusBadge-${containerId}').className = 'badge bg-danger';
                document.getElementById('statusBadge-${containerId}').textContent = 'Overdue';
              ">Overdue</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
};
