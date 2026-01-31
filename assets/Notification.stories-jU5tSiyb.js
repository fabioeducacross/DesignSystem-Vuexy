import{f as z}from"./snippets-m8t1HIl1.js";const D={title:"Molecules/Feedback/Notification",tags:["autodocs"],parameters:{docs:{description:{component:`
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
        `}}},argTypes:{position:{control:"select",options:["top-left","top-center","top-right","bottom-left","bottom-center","bottom-right"],description:"Posição da notificação",table:{defaultValue:{summary:"top-right"}}},variant:{control:"select",options:["success","danger","warning","info","primary","secondary"],description:"Tipo/cor da notificação",table:{defaultValue:{summary:"success"}}},withAction:{control:"boolean",description:"Incluir botão de ação",table:{defaultValue:{summary:!1}}}}},F=({position:c="top-right",variant:t="success",withAction:M=!1})=>{const[d,m]=c.split("-"),H=`
    position: fixed;
    ${d==="top"?"top: 20px;":d==="bottom"?"bottom: 20px;":"top: 50%; transform: translateY(-50%);"}
    ${m==="left"?"left: 20px;":m==="right"?"right: 20px;":"left: 50%; transform: translateX(-50%);"}
    z-index: 1080;
  `,W={success:"bx-check-circle",danger:"bx-x-circle",warning:"bx-error",info:"bx-info-circle",primary:"bx-bell",secondary:"bx-message-square-dots"},P={success:"Success!",danger:"Error!",warning:"Warning!",info:"Information",primary:"Notification",secondary:"Message"};return`<div class="toast-container" style="${H}">
  <div class="toast show align-items-start border-0 bg-${t}" role="alert" aria-live="assertive">
    <div class="toast-header bg-${t} text-white border-0">
      <i class="bx ${W[t]} me-2"></i>
      <strong class="me-auto">${P[t]}</strong>
      <small>just now</small>
      <button type="button" class="btn-close btn-close-white ms-2" onclick="this.closest('.toast').style.opacity='0'; setTimeout(() => this.closest('.toast').remove(), 300)" aria-label="Close"></button>
    </div>
    <div class="toast-body text-white">
      Your action has been completed successfully.
      ${M?`
      <div class="mt-2 pt-2 border-top border-white-50">
        <button type="button" class="btn btn-sm btn-light me-2">View</button>
        <button type="button" class="btn btn-sm btn-outline-light" onclick="this.closest('.toast').style.opacity='0'; setTimeout(() => this.closest('.toast').remove(), 300)">Dismiss</button>
      </div>
      `:""}
    </div>
  </div>
</div>`},a=c=>{const t=F(c);return`
    <div style="position: relative; height: 400px; background: #f5f5f9; border-radius: 8px;">
      ${t}
    </div>
    
    <hr class="my-5" />
    
    <details>
      <summary><strong>Code Snippets</strong></summary>
      <div class="mt-3">
        <h6>HTML</h6>
        <pre><code>${z(t).replace(/</g,"&lt;").replace(/>/g,"&gt;")}</code></pre>
        
        <div class="alert alert-info mt-3">
          <strong>Bootstrap Toast:</strong> Uses Bootstrap's toast component with custom positioning. Initialize with <code>new bootstrap.Toast(element)</code>.
        </div>
      </div>
    </details>
  `},r=()=>`
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
`,s=a.bind({});s.args={position:"top-right",variant:"success",withAction:!1};const o=a.bind({});o.args={position:"top-left",variant:"info",withAction:!1};const i=a.bind({});i.args={position:"bottom-right",variant:"warning",withAction:!1};const n=a.bind({});n.args={position:"top-right",variant:"primary",withAction:!0};const e=a.bind({});e.args={position:"top-center",variant:"danger",withAction:!1};const l={render:()=>`
      <div class="p-4">
        <h6 class="mb-3">Interactive Notifications</h6>
        
        <div class="d-flex flex-wrap gap-2 mb-4">
          <button class="btn btn-success" onclick="showNotification('success', 'Success!', 'Operation completed successfully.')">Show Success</button>
          <button class="btn btn-danger" onclick="showNotification('danger', 'Error!', 'Something went wrong.')">Show Error</button>
          <button class="btn btn-warning" onclick="showNotification('warning', 'Warning!', 'Please review your input.')">Show Warning</button>
          <button class="btn btn-info" onclick="showNotification('info', 'Info', 'New message received.')">Show Info</button>
        </div>
        
        <div id="notification-container" style="position: fixed; top: 20px; right: 20px; z-index: 1080; min-width: 300px;"></div>
        
        <script>
          let notificationId = 0;
          
          function showNotification(variant, title, message) {
            const container = document.getElementById('notification-container');
            const id = 'notification-' + (notificationId++);
            
            const icons = {
              success: 'ri-checkbox-circle-line',
              danger: 'ri-close-circle-line',
              warning: 'ri-error-warning-line',
              info: 'ri-information-line'
            };
            
            const notification = document.createElement('div');
            notification.id = id;
            notification.className = 'toast align-items-center text-white bg-' + variant + ' border-0 mb-2';
            notification.setAttribute('role', 'alert');
            notification.setAttribute('aria-live', 'assertive');
            notification.setAttribute('aria-atomic', 'true');
            notification.style.opacity = '0';
            notification.style.transition = 'opacity 0.3s';
            
            notification.innerHTML = 
              '<div class="d-flex">' +
                '<div class="toast-body">' +
                  '<i class="' + icons[variant] + ' me-2"></i>' +
                  '<strong>' + title + '</strong> ' + message +
                '</div>' +
                '<button type="button" class="btn-close btn-close-white me-2 m-auto" onclick="dismissNotification('' + id + '')" aria-label="Close"></button>' +
              '</div>';
            
            container.appendChild(notification);
            
            // Fade in
            setTimeout(() => {
              notification.style.opacity = '1';
            }, 10);
            
            // Auto dismiss after 5s
            setTimeout(() => {
              dismissNotification(id);
            }, 5000);
          }
          
          function dismissNotification(id) {
            const notification = document.getElementById(id);
            if (notification) {
              notification.style.opacity = '0';
              setTimeout(() => notification.remove(), 300);
            }
          }
        <\/script>
        
        <p class="text-muted mt-4 small">
          <i class="ri-information-line"></i> Interactive demo with auto-dismiss (5s). Click buttons to show notifications.
        </p>
      </div>
    `,parameters:{docs:{description:{story:"Demo interativo com notificações funcionais usando state controlado. Auto-dismiss após 5 segundos."}}}};var b,p,u;r.parameters={...r.parameters,docs:{...(b=r.parameters)==null?void 0:b.docs,source:{originalSource:`() => \`
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
\``,...(u=(p=r.parameters)==null?void 0:p.docs)==null?void 0:u.source}}};var v,g,h;s.parameters={...s.parameters,docs:{...(v=s.parameters)==null?void 0:v.docs,source:{originalSource:`args => {
  const markup = createNotification(args);
  return \`
    <div style="position: relative; height: 400px; background: #f5f5f9; border-radius: 8px;">
      \${markup}
    </div>
    
    <hr class="my-5" />
    
    <details>
      <summary><strong>Code Snippets</strong></summary>
      <div class="mt-3">
        <h6>HTML</h6>
        <pre><code>\${formatHtmlSnippet(markup).replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
        
        <div class="alert alert-info mt-3">
          <strong>Bootstrap Toast:</strong> Uses Bootstrap's toast component with custom positioning. Initialize with <code>new bootstrap.Toast(element)</code>.
        </div>
      </div>
    </details>
  \`;
}`,...(h=(g=s.parameters)==null?void 0:g.docs)==null?void 0:h.source}}};var f,w,x;o.parameters={...o.parameters,docs:{...(f=o.parameters)==null?void 0:f.docs,source:{originalSource:`args => {
  const markup = createNotification(args);
  return \`
    <div style="position: relative; height: 400px; background: #f5f5f9; border-radius: 8px;">
      \${markup}
    </div>
    
    <hr class="my-5" />
    
    <details>
      <summary><strong>Code Snippets</strong></summary>
      <div class="mt-3">
        <h6>HTML</h6>
        <pre><code>\${formatHtmlSnippet(markup).replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
        
        <div class="alert alert-info mt-3">
          <strong>Bootstrap Toast:</strong> Uses Bootstrap's toast component with custom positioning. Initialize with <code>new bootstrap.Toast(element)</code>.
        </div>
      </div>
    </details>
  \`;
}`,...(x=(w=o.parameters)==null?void 0:w.docs)==null?void 0:x.source}}};var y,S,T;i.parameters={...i.parameters,docs:{...(y=i.parameters)==null?void 0:y.docs,source:{originalSource:`args => {
  const markup = createNotification(args);
  return \`
    <div style="position: relative; height: 400px; background: #f5f5f9; border-radius: 8px;">
      \${markup}
    </div>
    
    <hr class="my-5" />
    
    <details>
      <summary><strong>Code Snippets</strong></summary>
      <div class="mt-3">
        <h6>HTML</h6>
        <pre><code>\${formatHtmlSnippet(markup).replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
        
        <div class="alert alert-info mt-3">
          <strong>Bootstrap Toast:</strong> Uses Bootstrap's toast component with custom positioning. Initialize with <code>new bootstrap.Toast(element)</code>.
        </div>
      </div>
    </details>
  \`;
}`,...(T=(S=i.parameters)==null?void 0:S.docs)==null?void 0:T.source}}};var k,N,B;n.parameters={...n.parameters,docs:{...(k=n.parameters)==null?void 0:k.docs,source:{originalSource:`args => {
  const markup = createNotification(args);
  return \`
    <div style="position: relative; height: 400px; background: #f5f5f9; border-radius: 8px;">
      \${markup}
    </div>
    
    <hr class="my-5" />
    
    <details>
      <summary><strong>Code Snippets</strong></summary>
      <div class="mt-3">
        <h6>HTML</h6>
        <pre><code>\${formatHtmlSnippet(markup).replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
        
        <div class="alert alert-info mt-3">
          <strong>Bootstrap Toast:</strong> Uses Bootstrap's toast component with custom positioning. Initialize with <code>new bootstrap.Toast(element)</code>.
        </div>
      </div>
    </details>
  \`;
}`,...(B=(N=n.parameters)==null?void 0:N.docs)==null?void 0:B.source}}};var I,A,E;e.parameters={...e.parameters,docs:{...(I=e.parameters)==null?void 0:I.docs,source:{originalSource:`args => {
  const markup = createNotification(args);
  return \`
    <div style="position: relative; height: 400px; background: #f5f5f9; border-radius: 8px;">
      \${markup}
    </div>
    
    <hr class="my-5" />
    
    <details>
      <summary><strong>Code Snippets</strong></summary>
      <div class="mt-3">
        <h6>HTML</h6>
        <pre><code>\${formatHtmlSnippet(markup).replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
        
        <div class="alert alert-info mt-3">
          <strong>Bootstrap Toast:</strong> Uses Bootstrap's toast component with custom positioning. Initialize with <code>new bootstrap.Toast(element)</code>.
        </div>
      </div>
    </details>
  \`;
}`,...(E=(A=e.parameters)==null?void 0:A.docs)==null?void 0:E.source}}};var $,C,L;l.parameters={...l.parameters,docs:{...($=l.parameters)==null?void 0:$.docs,source:{originalSource:`{
  render: () => {
    return \`
      <div class="p-4">
        <h6 class="mb-3">Interactive Notifications</h6>
        
        <div class="d-flex flex-wrap gap-2 mb-4">
          <button class="btn btn-success" onclick="showNotification('success', 'Success!', 'Operation completed successfully.')">Show Success</button>
          <button class="btn btn-danger" onclick="showNotification('danger', 'Error!', 'Something went wrong.')">Show Error</button>
          <button class="btn btn-warning" onclick="showNotification('warning', 'Warning!', 'Please review your input.')">Show Warning</button>
          <button class="btn btn-info" onclick="showNotification('info', 'Info', 'New message received.')">Show Info</button>
        </div>
        
        <div id="notification-container" style="position: fixed; top: 20px; right: 20px; z-index: 1080; min-width: 300px;"></div>
        
        <script>
          let notificationId = 0;
          
          function showNotification(variant, title, message) {
            const container = document.getElementById('notification-container');
            const id = 'notification-' + (notificationId++);
            
            const icons = {
              success: 'ri-checkbox-circle-line',
              danger: 'ri-close-circle-line',
              warning: 'ri-error-warning-line',
              info: 'ri-information-line'
            };
            
            const notification = document.createElement('div');
            notification.id = id;
            notification.className = 'toast align-items-center text-white bg-' + variant + ' border-0 mb-2';
            notification.setAttribute('role', 'alert');
            notification.setAttribute('aria-live', 'assertive');
            notification.setAttribute('aria-atomic', 'true');
            notification.style.opacity = '0';
            notification.style.transition = 'opacity 0.3s';
            
            notification.innerHTML = 
              '<div class="d-flex">' +
                '<div class="toast-body">' +
                  '<i class="' + icons[variant] + ' me-2"></i>' +
                  '<strong>' + title + '</strong> ' + message +
                '</div>' +
                '<button type="button" class="btn-close btn-close-white me-2 m-auto" onclick="dismissNotification(\\'' + id + '\\')" aria-label="Close"></button>' +
              '</div>';
            
            container.appendChild(notification);
            
            // Fade in
            setTimeout(() => {
              notification.style.opacity = '1';
            }, 10);
            
            // Auto dismiss after 5s
            setTimeout(() => {
              dismissNotification(id);
            }, 5000);
          }
          
          function dismissNotification(id) {
            const notification = document.getElementById(id);
            if (notification) {
              notification.style.opacity = '0';
              setTimeout(() => notification.remove(), 300);
            }
          }
        <\/script>
        
        <p class="text-muted mt-4 small">
          <i class="ri-information-line"></i> Interactive demo with auto-dismiss (5s). Click buttons to show notifications.
        </p>
      </div>
    \`;
  },
  parameters: {
    docs: {
      description: {
        story: 'Demo interativo com notificações funcionais usando state controlado. Auto-dismiss após 5 segundos.'
      }
    }
  }
}`,...(L=(C=l.parameters)==null?void 0:C.docs)==null?void 0:L.source}}};const R=["Overview","TopRight","TopLeft","BottomRight","WithActions","Error","Interactive"];export{i as BottomRight,e as Error,l as Interactive,r as Overview,o as TopLeft,s as TopRight,n as WithActions,R as __namedExportsOrder,D as default};
