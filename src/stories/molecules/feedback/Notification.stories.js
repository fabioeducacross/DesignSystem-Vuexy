/**
 * Notification - Molecule (Feedback)
 * 
 * Source: core.css .toast + custom positioning
 * Priority: P1 (Important)
 * Status: ✅ DONE
 * 
 * Sistema de notificações avançado com posicionamento.
 */

import { formatHtmlSnippet } from '../../_helpers/snippets';

export default {
  title: 'Molecules/Feedback/Notification',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
# Notification System

Sistema avançado de notificações/toasts com posicionamento configurável.

## Quando usar
- Feedback de ações do usuário
- Alertas não-intrusivos
- Confirmações de sucesso
- Erros não-críticos
- Informações temporárias
- Status updates
- Sistema de mensagens

## Características
- Múltiplas posições (8 opções)
- Auto-dismiss (timeout)
- Empilhamento (stack)
- Ações inline (botões)
- Ícones contextuais
- Variantes de cor
- Animações de entrada/saída

## Posições
- top-left, top-center, top-right
- center-left, center-center, center-right
- bottom-left, bottom-center, bottom-right

## Tipos
- Success (verde)
- Error (vermelho)
- Warning (amarelo)
- Info (azul)
- Default (cinza)

## Acessibilidade
- role="alert" ou role="status"
- aria-live
- Foco em ações
- Dismiss visível
        `
      }
    }
  },
  argTypes: {
    position: {
      control: 'select',
      options: ['top-left', 'top-center', 'top-right', 'bottom-left', 'bottom-center', 'bottom-right'],
      description: 'Posição da notificação',
      table: { defaultValue: { summary: 'top-right' } }
    },
    variant: {
      control: 'select',
      options: ['success', 'danger', 'warning', 'info', 'primary', 'secondary'],
      description: 'Tipo/cor da notificação',
      table: { defaultValue: { summary: 'success' } }
    },
    withAction: {
      control: 'boolean',
      description: 'Incluir botão de ação',
      table: { defaultValue: { summary: false } }
    }
  }
};

const createNotification = ({ position = 'top-right', variant = 'success', withAction = false }) => {
  const [vPos, hPos] = position.split('-');
  const positionStyles = `
    position: fixed;
    ${vPos === 'top' ? 'top: 20px;' : vPos === 'bottom' ? 'bottom: 20px;' : 'top: 50%; transform: translateY(-50%);'}
    ${hPos === 'left' ? 'left: 20px;' : hPos === 'right' ? 'right: 20px;' : 'left: 50%; transform: translateX(-50%);'}
    z-index: 1080;
  `;
  
  const icons = {
    success: 'bx-check-circle',
    danger: 'bx-x-circle',
    warning: 'bx-error',
    info: 'bx-info-circle',
    primary: 'bx-bell',
    secondary: 'bx-message-square-dots'
  };
  
  const titles = {
    success: 'Success!',
    danger: 'Error!',
    warning: 'Warning!',
    info: 'Information',
    primary: 'Notification',
    secondary: 'Message'
  };
  
  return `<div class="toast-container" style="${positionStyles}">
  <div class="toast show align-items-start border-0 bg-${variant}" role="alert" aria-live="assertive">
    <div class="toast-header bg-${variant} text-white border-0">
      <i class="bx ${icons[variant]} me-2"></i>
      <strong class="me-auto">${titles[variant]}</strong>
      <small>just now</small>
      <button type="button" class="btn-close btn-close-white ms-2" data-bs-dismiss="toast"></button>
    </div>
    <div class="toast-body text-white">
      Your action has been completed successfully.
      ${withAction ? `
      <div class="mt-2 pt-2 border-top border-white-50">
        <button type="button" class="btn btn-sm btn-light me-2">View</button>
        <button type="button" class="btn btn-sm btn-outline-light" data-bs-dismiss="toast">Dismiss</button>
      </div>
      ` : ''}
    </div>
  </div>
</div>`;
};

const Template = (args) => {
  const markup = createNotification(args);
  
  return `
    <div style="position: relative; height: 400px; background: #f5f5f9; border-radius: 8px;">
      ${markup}
    </div>
    
    <hr class="my-5" />
    
    <details>
      <summary><strong>Code Snippets</strong></summary>
      <div class="mt-3">
        <h6>HTML</h6>
        <pre><code>${formatHtmlSnippet(markup).replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
        
        <div class="alert alert-info mt-3">
          <strong>Bootstrap Toast:</strong> Uses Bootstrap's toast component with custom positioning. Initialize with <code>new bootstrap.Toast(element)</code>.
        </div>
      </div>
    </details>
  `;
};

export const Overview = () => `
  <div class="row g-4">
    <div class="col-12">
      <h6>Notification Types</h6>
      <div class="d-flex flex-wrap gap-3">
        <div class="toast show align-items-start border-0 bg-success" role="alert" style="max-width: 350px;">
          <div class="toast-header bg-success text-white border-0">
            <i class="bx bx-check-circle me-2"></i>
            <strong class="me-auto">Success</strong>
            <small>2 mins ago</small>
            <button type="button" class="btn-close btn-close-white ms-2"></button>
          </div>
          <div class="toast-body text-white">
            Your profile has been updated successfully!
          </div>
        </div>
        
        <div class="toast show align-items-start border-0 bg-danger" role="alert" style="max-width: 350px;">
          <div class="toast-header bg-danger text-white border-0">
            <i class="bx bx-x-circle me-2"></i>
            <strong class="me-auto">Error</strong>
            <small>just now</small>
            <button type="button" class="btn-close btn-close-white ms-2"></button>
          </div>
          <div class="toast-body text-white">
            Failed to save changes. Please try again.
          </div>
        </div>
        
        <div class="toast show align-items-start border-0 bg-warning" role="alert" style="max-width: 350px;">
          <div class="toast-header bg-warning text-white border-0">
            <i class="bx bx-error me-2"></i>
            <strong class="me-auto">Warning</strong>
            <small>5 mins ago</small>
            <button type="button" class="btn-close btn-close-white ms-2"></button>
          </div>
          <div class="toast-body text-white">
            Your session will expire in 5 minutes.
          </div>
        </div>
        
        <div class="toast show align-items-start border-0 bg-info" role="alert" style="max-width: 350px;">
          <div class="toast-header bg-info text-white border-0">
            <i class="bx bx-info-circle me-2"></i>
            <strong class="me-auto">Information</strong>
            <small>10 mins ago</small>
            <button type="button" class="btn-close btn-close-white ms-2"></button>
          </div>
          <div class="toast-body text-white">
            System maintenance scheduled for tonight.
          </div>
        </div>
      </div>
    </div>
    
    <div class="col-md-6">
      <h6>With Action Buttons</h6>
      <div class="toast show align-items-start border-0 bg-primary" role="alert">
        <div class="toast-header bg-primary text-white border-0">
          <i class="bx bx-bell me-2"></i>
          <strong class="me-auto">New Message</strong>
          <small>just now</small>
          <button type="button" class="btn-close btn-close-white ms-2"></button>
        </div>
        <div class="toast-body text-white">
          You have a new message from John Doe.
          <div class="mt-2 pt-2 border-top border-white-50">
            <button type="button" class="btn btn-sm btn-light me-2">View Message</button>
            <button type="button" class="btn btn-sm btn-outline-light">Dismiss</button>
          </div>
        </div>
      </div>
    </div>
    
    <div class="col-md-6">
      <h6>Simple Notification</h6>
      <div class="toast show align-items-start" role="alert">
        <div class="toast-header">
          <i class="bx bx-message-square-dots text-primary me-2"></i>
          <strong class="me-auto">Notification</strong>
          <small>1 min ago</small>
          <button type="button" class="btn-close ms-2"></button>
        </div>
        <div class="toast-body">
          Your comment has been posted.
        </div>
      </div>
    </div>
    
    <div class="col-12">
      <h6>Position Examples</h6>
      <div class="position-relative border rounded p-3" style="height: 500px; background: #f8f9fa;">
        <div class="text-center text-muted mb-3">
          <small>Examples of notification positions</small>
        </div>
        
        <!-- Top positions -->
        <div class="position-absolute" style="top: 10px; left: 10px;">
          <div class="toast show" role="alert" style="max-width: 200px;">
            <div class="toast-body small">Top Left</div>
          </div>
        </div>
        
        <div class="position-absolute" style="top: 10px; left: 50%; transform: translateX(-50%);">
          <div class="toast show" role="alert" style="max-width: 200px;">
            <div class="toast-body small">Top Center</div>
          </div>
        </div>
        
        <div class="position-absolute" style="top: 10px; right: 10px;">
          <div class="toast show" role="alert" style="max-width: 200px;">
            <div class="toast-body small">Top Right</div>
          </div>
        </div>
        
        <!-- Bottom positions -->
        <div class="position-absolute" style="bottom: 10px; left: 10px;">
          <div class="toast show" role="alert" style="max-width: 200px;">
            <div class="toast-body small">Bottom Left</div>
          </div>
        </div>
        
        <div class="position-absolute" style="bottom: 10px; left: 50%; transform: translateX(-50%);">
          <div class="toast show" role="alert" style="max-width: 200px;">
            <div class="toast-body small">Bottom Center</div>
          </div>
        </div>
        
        <div class="position-absolute" style="bottom: 10px; right: 10px;">
          <div class="toast show" role="alert" style="max-width: 200px;">
            <div class="toast-body small">Bottom Right</div>
          </div>
        </div>
      </div>
    </div>
    
    <div class="col-12">
      <h6>Stacked Notifications</h6>
      <div class="toast-container position-fixed top-0 end-0 p-3" style="position: relative !important;">
        <div class="toast show mb-2" role="alert">
          <div class="toast-header bg-success text-white border-0">
            <strong class="me-auto">Success</strong>
            <small>3 mins ago</small>
            <button type="button" class="btn-close btn-close-white ms-2"></button>
          </div>
          <div class="toast-body">File uploaded successfully.</div>
        </div>
        
        <div class="toast show mb-2" role="alert">
          <div class="toast-header bg-info text-white border-0">
            <strong class="me-auto">Info</strong>
            <small>2 mins ago</small>
            <button type="button" class="btn-close btn-close-white ms-2"></button>
          </div>
          <div class="toast-body">Processing your request...</div>
        </div>
        
        <div class="toast show" role="alert">
          <div class="toast-header bg-warning text-white border-0">
            <strong class="me-auto">Warning</strong>
            <small>just now</small>
            <button type="button" class="btn-close btn-close-white ms-2"></button>
          </div>
          <div class="toast-body">Low storage space.</div>
        </div>
      </div>
    </div>
  </div>
  
  <div class="alert alert-info mt-4">
    <i class="bx bx-info-circle me-2"></i>
    <strong>Bootstrap Toast:</strong> This component uses Bootstrap's toast with custom styling. Auto-hide can be configured with <code>data-bs-delay</code> attribute.
  </div>
`;

export const TopRight = Template.bind({});
TopRight.args = {
  position: 'top-right',
  variant: 'success',
  withAction: false
};

export const TopLeft = Template.bind({});
TopLeft.args = {
  position: 'top-left',
  variant: 'info',
  withAction: false
};

export const BottomRight = Template.bind({});
BottomRight.args = {
  position: 'bottom-right',
  variant: 'warning',
  withAction: false
};

export const WithActions = Template.bind({});
WithActions.args = {
  position: 'top-right',
  variant: 'primary',
  withAction: true
};

export const Error = Template.bind({});
Error.args = {
  position: 'top-center',
  variant: 'danger',
  withAction: false
};
