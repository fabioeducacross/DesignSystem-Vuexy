/**
 * Timeline - Organism (Content)
 * 
 * Source: packages/vuexy_theme/public/vuexy/css/core.css (.list-group-timeline)
 * Priority: P1 (Important)
 * Status: ✅ DONE
 * 
 * Linha do tempo para exibir eventos cronológicos.
 */

import { formatHtmlSnippet, formatReactSnippet, formatVue2Snippet, formatVue3Snippet } from '../../_helpers/snippets';

export default {
  title: 'Organisms/Content/Timeline',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
# Timeline

Componente para exibir eventos em ordem cronológica com linha visual.

## Quando usar
- Histórico de atividades
- Feed de notificações
- Processo de onboarding
- Histórico de pedidos/transações
- Marcos de projeto (milestones)
- Activity feed

## Características
- Classe Vuexy: \`.list-group-timeline\`
- Variantes: Primary, Secondary, Success, Info, Warning, Danger, Light, Dark
- Linha vertical conectando eventos
- Ícones/avatares nos markers
- Suporta timestamps
- Custom content (text, images, badges)

## Estrutura
- Container: \`.list-group.list-group-timeline\`
- Items: \`.list-group-item\` com conteúdo
- Variantes: \`.list-group-timeline-primary\`, etc.
- Markers automáticos via ::before

## Acessibilidade
- Ordem cronológica lógica
- Timestamps legíveis
- Conteúdo semântico
        `
      }
    }
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'success', 'info', 'warning', 'danger'],
      description: 'Cor da linha e markers',
      table: { defaultValue: { summary: 'primary' } }
    }
  }
};

const createTimeline = ({ variant = 'primary' }) => {
  return `<ul class="list-group list-group-timeline list-group-timeline-${variant}">
  <li class="list-group-item">
    <span class="fw-medium">12 Invoices have been paid</span>
    <p class="mb-0 text-muted">Invoices have been paid to the company</p>
    <small class="text-muted">2 hours ago</small>
  </li>
  <li class="list-group-item">
    <span class="fw-medium">Client Meeting</span>
    <p class="mb-0 text-muted">Project meeting with john @10:15am</p>
    <small class="text-muted">5 hours ago</small>
  </li>
  <li class="list-group-item">
    <span class="fw-medium">Create a new project for client</span>
    <p class="mb-0 text-muted">Add files to new design folder</p>
    <small class="text-muted">Yesterday</small>
  </li>
</ul>`;
};

const Template = (args) => {
  const markup = createTimeline(args);
  
  return `
    <div style="max-width: 600px;">
      ${markup}
    </div>
    
    <hr class="my-5" />
    
    <details>
      <summary><strong>Code Snippets</strong></summary>
      <div class="mt-3">
        <h6>HTML</h6>
        <pre><code>${formatHtmlSnippet(markup).replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
        <h6>React</h6>
        <pre><code>${formatReactSnippet(markup, 'Timeline').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
      </div>
    </details>
  `;
};

export const Overview = () => `
  <div class="row g-4">
    <div class="col-md-6">
      <h5>Default Timeline</h5>
      <ul class="list-group list-group-timeline">
        <li class="list-group-item">
          <span class="fw-medium">12 Invoices have been paid</span>
          <p class="mb-0 text-muted">Invoices have been paid to the company</p>
          <small class="text-muted">2 hours ago</small>
        </li>
        <li class="list-group-item">
          <span class="fw-medium">Client Meeting</span>
          <p class="mb-0 text-muted">Project meeting with john @10:15am</p>
          <small class="text-muted">5 hours ago</small>
        </li>
        <li class="list-group-item">
          <span class="fw-medium">Create a new project</span>
          <p class="mb-0 text-muted">Add files to new design folder</p>
          <small class="text-muted">Yesterday</small>
        </li>
      </ul>
    </div>
    
    <div class="col-md-6">
      <h5>Timeline Success</h5>
      <ul class="list-group list-group-timeline list-group-timeline-success">
        <li class="list-group-item">
          <span class="fw-medium">Order Placed</span>
          <p class="mb-0 text-muted">Your order #1234 has been placed</p>
          <small class="text-muted">Just now</small>
        </li>
        <li class="list-group-item">
          <span class="fw-medium">Payment Confirmed</span>
          <p class="mb-0 text-muted">Payment received successfully</p>
          <small class="text-muted">5 minutes ago</small>
        </li>
        <li class="list-group-item">
          <span class="fw-medium">Shipped</span>
          <p class="mb-0 text-muted">Your order has been shipped</p>
          <small class="text-muted">1 hour ago</small>
        </li>
      </ul>
    </div>
    
    <div class="col-12 mt-5">
      <h5>Variantes de Cores</h5>
      <div class="row g-3">
        <div class="col-md-6">
          <h6>Primary</h6>
          <ul class="list-group list-group-timeline list-group-timeline-primary">
            <li class="list-group-item">
              <span class="fw-medium">Task assigned</span>
              <small class="text-muted d-block">2 hours ago</small>
            </li>
            <li class="list-group-item">
              <span class="fw-medium">Task completed</span>
              <small class="text-muted d-block">5 hours ago</small>
            </li>
          </ul>
        </div>
        
        <div class="col-md-6">
          <h6>Warning</h6>
          <ul class="list-group list-group-timeline list-group-timeline-warning">
            <li class="list-group-item">
              <span class="fw-medium">Payment pending</span>
              <small class="text-muted d-block">2 hours ago</small>
            </li>
            <li class="list-group-item">
              <span class="fw-medium">Review required</span>
              <small class="text-muted d-block">5 hours ago</small>
            </li>
          </ul>
        </div>
        
        <div class="col-md-6">
          <h6>Danger</h6>
          <ul class="list-group list-group-timeline list-group-timeline-danger">
            <li class="list-group-item">
              <span class="fw-medium">Payment failed</span>
              <small class="text-muted d-block">2 hours ago</small>
            </li>
            <li class="list-group-item">
              <span class="fw-medium">Order cancelled</span>
              <small class="text-muted d-block">5 hours ago</small>
            </li>
          </ul>
        </div>
        
        <div class="col-md-6">
          <h6>Info</h6>
          <ul class="list-group list-group-timeline list-group-timeline-info">
            <li class="list-group-item">
              <span class="fw-medium">New message</span>
              <small class="text-muted d-block">2 hours ago</small>
            </li>
            <li class="list-group-item">
              <span class="fw-medium">Update available</span>
              <small class="text-muted d-block">5 hours ago</small>
            </li>
          </ul>
        </div>
      </div>
    </div>
    
    <div class="col-12 mt-5">
      <h5>Com Ícones e Badges</h5>
      <ul class="list-group list-group-timeline">
        <li class="list-group-item">
          <div class="d-flex align-items-start">
            <div class="me-3">
              <span class="badge bg-label-primary p-2">
                <i class="bx bx-cart fs-5"></i>
              </span>
            </div>
            <div class="flex-grow-1">
              <span class="fw-medium">New Order Received</span>
              <p class="mb-0 text-muted">Order #8934 from John Doe</p>
              <small class="text-muted">10 minutes ago</small>
            </div>
          </div>
        </li>
        <li class="list-group-item">
          <div class="d-flex align-items-start">
            <div class="me-3">
              <span class="badge bg-label-success p-2">
                <i class="bx bx-check fs-5"></i>
              </span>
            </div>
            <div class="flex-grow-1">
              <span class="fw-medium">Payment Confirmed</span>
              <p class="mb-0 text-muted">$250.00 received</p>
              <small class="text-muted">30 minutes ago</small>
            </div>
          </div>
        </li>
        <li class="list-group-item">
          <div class="d-flex align-items-start">
            <div class="me-3">
              <span class="badge bg-label-info p-2">
                <i class="bx bx-package fs-5"></i>
              </span>
            </div>
            <div class="flex-grow-1">
              <span class="fw-medium">Order Shipped</span>
              <p class="mb-0 text-muted">Tracking: ABC123456789</p>
              <small class="text-muted">2 hours ago</small>
            </div>
          </div>
        </li>
      </ul>
    </div>
    
    <div class="col-12 mt-5">
      <h5>Activity Feed com Avatares</h5>
      <ul class="list-group list-group-timeline list-group-timeline-primary">
        <li class="list-group-item">
          <div class="d-flex align-items-start">
            <div class="avatar avatar-sm me-3">
              <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40'%3E%3Ccircle cx='20' cy='20' r='20' fill='%23696cff'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial' font-size='14' fill='white' text-anchor='middle' dy='.35em'%3EJD%3C/text%3E%3C/svg%3E" alt="Avatar" class="rounded-circle">
            </div>
            <div class="flex-grow-1">
              <div class="d-flex justify-content-between align-items-center mb-1">
                <h6 class="mb-0">John Doe</h6>
                <small class="text-muted">2 hours ago</small>
              </div>
              <p class="mb-0 text-muted">Commented on <a href="#">Design System</a> project</p>
              <div class="bg-lighter p-2 rounded mt-2">
                <small>"Great work on the new components!"</small>
              </div>
            </div>
          </div>
        </li>
        <li class="list-group-item">
          <div class="d-flex align-items-start">
            <div class="avatar avatar-sm me-3">
              <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40'%3E%3Ccircle cx='20' cy='20' r='20' fill='%2356ca00'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial' font-size='14' fill='white' text-anchor='middle' dy='.35em'%3EJS%3C/text%3E%3C/svg%3E" alt="Avatar" class="rounded-circle">
            </div>
            <div class="flex-grow-1">
              <div class="d-flex justify-content-between align-items-center mb-1">
                <h6 class="mb-0">Jane Smith</h6>
                <small class="text-muted">5 hours ago</small>
              </div>
              <p class="mb-0 text-muted">Uploaded 3 files to <a href="#">Marketing</a> folder</p>
              <div class="d-flex gap-2 mt-2">
                <span class="badge bg-label-secondary">
                  <i class="bx bx-file me-1"></i>proposal.pdf
                </span>
                <span class="badge bg-label-secondary">
                  <i class="bx bx-image me-1"></i>banner.jpg
                </span>
              </div>
            </div>
          </div>
        </li>
        <li class="list-group-item">
          <div class="d-flex align-items-start">
            <div class="avatar avatar-sm me-3">
              <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40'%3E%3Ccircle cx='20' cy='20' r='20' fill='%23ffb400'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial' font-size='14' fill='white' text-anchor='middle' dy='.35em'%3EMB%3C/text%3E%3C/svg%3E" alt="Avatar" class="rounded-circle">
            </div>
            <div class="flex-grow-1">
              <div class="d-flex justify-content-between align-items-center mb-1">
                <h6 class="mb-0">Mike Johnson</h6>
                <small class="text-muted">Yesterday</small>
              </div>
              <p class="mb-0 text-muted">Created new task <span class="badge bg-primary">High Priority</span></p>
            </div>
          </div>
        </li>
      </ul>
    </div>
    
    <div class="col-12 mt-5">
      <h5>Order Tracking Example</h5>
      <div class="card">
        <div class="card-body">
          <h5 class="card-title mb-4">Order #8934 Tracking</h5>
          <ul class="list-group list-group-timeline list-group-timeline-success">
            <li class="list-group-item">
              <div class="d-flex justify-content-between align-items-start">
                <div>
                  <span class="fw-medium text-success">
                    <i class="bx bx-check-circle me-1"></i>Delivered
                  </span>
                  <p class="mb-0 text-muted">Package delivered to customer</p>
                  <small class="text-muted">Today, 10:30 AM</small>
                </div>
                <span class="badge bg-success">Complete</span>
              </div>
            </li>
            <li class="list-group-item">
              <div class="d-flex justify-content-between align-items-start">
                <div>
                  <span class="fw-medium text-success">
                    <i class="bx bx-check-circle me-1"></i>Out for Delivery
                  </span>
                  <p class="mb-0 text-muted">Driver: John Doe</p>
                  <small class="text-muted">Today, 8:00 AM</small>
                </div>
              </div>
            </li>
            <li class="list-group-item">
              <div class="d-flex justify-content-between align-items-start">
                <div>
                  <span class="fw-medium text-success">
                    <i class="bx bx-check-circle me-1"></i>In Transit
                  </span>
                  <p class="mb-0 text-muted">Arrived at local facility</p>
                  <small class="text-muted">Yesterday, 6:00 PM</small>
                </div>
              </div>
            </li>
            <li class="list-group-item">
              <div class="d-flex justify-content-between align-items-start">
                <div>
                  <span class="fw-medium text-success">
                    <i class="bx bx-check-circle me-1"></i>Shipped
                  </span>
                  <p class="mb-0 text-muted">Package shipped from warehouse</p>
                  <small class="text-muted">2 days ago</small>
                </div>
              </div>
            </li>
            <li class="list-group-item">
              <div class="d-flex justify-content-between align-items-start">
                <div>
                  <span class="fw-medium text-success">
                    <i class="bx bx-check-circle me-1"></i>Order Placed
                  </span>
                  <p class="mb-0 text-muted">Order confirmed and processing started</p>
                  <small class="text-muted">3 days ago</small>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
`;

export const Default = Template.bind({});
Default.args = {
  variant: 'primary'
};

export const Success = Template.bind({});
Success.args = {
  variant: 'success'
};

export const Warning = Template.bind({});
Warning.args = {
  variant: 'warning'
};

export const Danger = Template.bind({});
Danger.args = {
  variant: 'danger'
};

export const Info = Template.bind({});
Info.args = {
  variant: 'info'
};

export const Interactive = () => {
  return `
    <div class="card" style="max-width: 700px; margin: 0 auto;">
      <div class="card-body">
        <h5 class="card-title mb-3">📋 Activity Timeline</h5>
        
        <div class="btn-group mb-4" role="group">
          <button class="btn btn-sm btn-primary active" onclick="
            document.querySelectorAll('.timeline-item').forEach(item => item.style.display = 'block');
            document.querySelectorAll('.btn-group button').forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
          ">All</button>
          <button class="btn btn-sm btn-outline-primary" onclick="
            document.querySelectorAll('.timeline-item').forEach(item => {
              item.style.display = item.classList.contains('type-order') ? 'block' : 'none';
            });
            document.querySelectorAll('.btn-group button').forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
          ">📦 Orders</button>
          <button class="btn btn-sm btn-outline-primary" onclick="
            document.querySelectorAll('.timeline-item').forEach(item => {
              item.style.display = item.classList.contains('type-payment') ? 'block' : 'none';
            });
            document.querySelectorAll('.btn-group button').forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
          ">💳 Payments</button>
          <button class="btn btn-sm btn-outline-primary" onclick="
            document.querySelectorAll('.timeline-item').forEach(item => {
              item.style.display = item.classList.contains('type-comment') ? 'block' : 'none';
            });
            document.querySelectorAll('.btn-group button').forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
          ">💬 Comments</button>
        </div>
        
        <ul class="list-group list-group-timeline list-group-timeline-primary">
          <li class="list-group-item timeline-item type-order">
            <span class="fw-medium">📦 Order Placed</span>
            <p class="mb-0 text-muted">New order #1234 received</p>
            <small class="text-muted">2 hours ago</small>
          </li>
          <li class="list-group-item timeline-item type-payment">
            <span class="fw-medium">💳 Payment Confirmed</span>
            <p class="mb-0 text-muted">Payment of $250 processed</p>
            <small class="text-muted">3 hours ago</small>
          </li>
          <li class="list-group-item timeline-item type-comment">
            <span class="fw-medium">💬 New Comment</span>
            <p class="mb-0 text-muted">Customer left a review</p>
            <small class="text-muted">5 hours ago</small>
          </li>
          <li class="list-group-item timeline-item type-order">
            <span class="fw-medium">📦 Order Shipped</span>
            <p class="mb-0 text-muted">Package dispatched to customer</p>
            <small class="text-muted">1 day ago</small>
          </li>
          <li class="list-group-item timeline-item type-payment">
            <span class="fw-medium">💳 Refund Issued</span>
            <p class="mb-0 text-muted">Refund of $50 processed</p>
            <small class="text-muted">2 days ago</small>
          </li>
        </ul>
        
        <button class="btn btn-sm btn-outline-primary mt-3 w-100" onclick="
          const newItem = document.createElement('li');
          newItem.className = 'list-group-item timeline-item type-comment';
          newItem.innerHTML = '<span class=\"fw-medium\">✨ New Activity</span><p class=\"mb-0 text-muted\">Just added</p><small class=\"text-muted\">Just now</small>';
          document.querySelector('.list-group-timeline').insertBefore(newItem, document.querySelector('.list-group-timeline').firstChild);
        ">➕ Add New Activity</button>
      </div>
    </div>
  `;
};
