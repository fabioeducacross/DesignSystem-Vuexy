import{f as q,a as R}from"./snippets-m8t1HIl1.js";const F={title:"Molecules/Surfaces/Alert",tags:["autodocs"],parameters:{docs:{description:{component:`
## Alert (Molecule - Surfaces)

Mensagem de alerta/notificação inline do Vuexy.

### TODO - Implementação Pendente
- [ ] Adicionar markup HTML do Vuexy usando \`.alert\`
- [ ] Implementar cores (.alert-primary, .alert-success, .alert-danger, etc)
- [ ] Adicionar botão de fechar (.alert-dismissible)
- [ ] Implementar ícones no alert
- [ ] Adicionar variação solid vs outlined
- [ ] Implementar alert com título + descrição
- [ ] Incluir snippets multi-stack

### Composição
- **Icon** (opcional) - ícone de status
- **Content** - título e/ou mensagem
- **Close Button** (opcional) - botão para fechar

### Fonte Vuexy
- **CSS**: \`core.css\` → \`.alert\`, \`.alert-{variant}\`
- **Cores**: primary, secondary, success, danger, warning, info, dark, light
- **Variações**: default, dismissible, with-icon, solid

### Controles Esperados
- \`variant\`: select (primary, success, danger, warning, info)
- \`title\`: string (título opcional)
- \`message\`: string
- \`dismissible\`: boolean (mostra botão fechar)
- \`icon\`: string (classe do ícone)
- \`solid\`: boolean (fundo sólido vs suave)

### Stories Esperadas
1. Overview - Grid com todas cores
2. Basic - Alert simples com mensagem
3. WithIcon - Alert com ícone
4. WithTitle - Alert com título + mensagem
5. Dismissible - Alert com botão fechar
6. Solid - Variação solid vs default
        `}}},argTypes:{variant:{control:"select",options:["primary","secondary","success","danger","warning","info"],description:"Cor do alert",table:{defaultValue:{summary:"primary"}}},title:{control:"text",description:"Título do alert (opcional)",table:{defaultValue:{summary:""}}},message:{control:"text",description:"Mensagem do alert",table:{defaultValue:{summary:""}}},dismissible:{control:"boolean",description:"Mostra botão de fechar",table:{defaultValue:{summary:!1}}},icon:{control:"text",description:"Classe do ícone (ex: bx bx-info-circle)",table:{defaultValue:{summary:""}}}},parameters:{docs:{description:{component:`
# Alert

Mensagem de notificação inline do Vuexy para feedback contextual.

## Quando usar
- Mensagens de sucesso após ações
- Avisos e erros
- Informações importantes na página

## Variantes
- **Primary**: Informação padrão
- **Success**: Ação bem-sucedida
- **Danger**: Erro ou ação destrutiva
- **Warning**: Atenção necessária
- **Info**: Dica ou informação adicional
- **Secondary**: Mensagem secundária

## Acessibilidade
- Use \`role="alert"\` para leitores de tela
- Botão fechar deve ter \`aria-label="Close"\`
        `}}}},a=({variant:e="primary",title:s="",message:r="",dismissible:u=!1,icon:p=""})=>{const n=["alert",`alert-${e}`,u?"alert-dismissible fade show":""].filter(Boolean).join(" "),i=p?`<i class="${p} me-2"></i>`:"",o=s?`<h5 class="alert-heading mb-1">${s}</h5>`:"";return`<div class="${n}" role="alert">
  <div class="d-flex align-items-start">
    ${i}
    <div class="flex-grow-1">
      ${o}
      <div>${r}</div>
    </div>
  </div>
  ${u?'<button type="button" class="btn-close" onclick="this.parentElement.remove()" aria-label="Close"></button>':""}
</div>`},h=e=>{const s=a(e);return`
    <div style="max-width: 600px;">
      ${s}
    </div>
    
    <hr class="my-5" />
    
    <details>
      <summary><strong>Code Snippets</strong></summary>
      <div class="mt-3">
        <h6>HTML</h6>
        <pre><code>${q(s).replace(/</g,"&lt;").replace(/>/g,"&gt;")}</code></pre>
        <h6>React</h6>
        <pre><code>${R(s,"Alert").replace(/</g,"&lt;").replace(/>/g,"&gt;")}</code></pre>
      </div>
    </details>
  `},b=()=>`
  <div class="row g-3">
    <div class="col-12">
      <h5>Cores</h5>
      <div class="d-flex flex-column gap-3" style="max-width: 600px;">
        ${a({variant:"primary",message:"A simple primary alert—check it out!"})}
        ${a({variant:"secondary",message:"A simple secondary alert—check it out!"})}
        ${a({variant:"success",message:"A simple success alert—check it out!"})}
        ${a({variant:"danger",message:"A simple danger alert—check it out!"})}
        ${a({variant:"warning",message:"A simple warning alert—check it out!"})}
        ${a({variant:"info",message:"A simple info alert—check it out!"})}
      </div>
    </div>
    <div class="col-12 mt-4">
      <h5>Com Ícone e Título</h5>
      <div class="d-flex flex-column gap-3" style="max-width: 600px;">
        ${a({variant:"success",title:"Well done!",message:"You successfully read this important alert message.",icon:"bx bx-check-circle"})}
        ${a({variant:"danger",title:"Oh snap!",message:"Change a few things up and try submitting again.",icon:"bx bx-x-circle"})}
      </div>
    </div>
    <div class="col-12 mt-4">
      <h5>Dismissible</h5>
      <div style="max-width: 600px;">
        ${a({variant:"warning",message:"This alert can be closed by clicking the close button.",dismissible:!0,icon:"bx bx-error"})}
      </div>
    </div>
  </div>
`,l=h.bind({});l.args={variant:"primary",title:"",message:"This is a primary alert—check it out!",dismissible:!1,icon:""};const c=h.bind({});c.args={variant:"success",title:"",message:"Well done! You successfully read this important alert message.",dismissible:!1,icon:"bx bx-check-circle"};const d=h.bind({});d.args={variant:"warning",title:"Warning!",message:"You can close this alert by clicking the close button.",dismissible:!0,icon:"bx bx-error"};const m=()=>{const e="alert-interactive-"+Math.random().toString(36).substr(2,9),s=`
    <div id="${e}" style="max-width: 800px;">
      <div class="alert alert-info mb-3">
        <i class="bx bx-info-circle me-2"></i>
        <strong>Interactive Demo:</strong> Click buttons to trigger different alerts. Dismissible alerts can be closed.
      </div>
      
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">Alert Triggers</h5>
          
          <div class="d-flex flex-wrap gap-2 mb-4">
            <button class="btn btn-success btn-sm" data-alert="success">
              <i class="bx bx-check me-1"></i> Show Success
            </button>
            <button class="btn btn-danger btn-sm" data-alert="error">
              <i class="bx bx-x me-1"></i> Show Error
            </button>
            <button class="btn btn-warning btn-sm" data-alert="warning">
              <i class="bx bx-error me-1"></i> Show Warning
            </button>
            <button class="btn btn-info btn-sm" data-alert="info">
              <i class="bx bx-info-circle me-1"></i> Show Info
            </button>
            <button class="btn btn-secondary btn-sm" data-alert="auto">
              <i class="bx bx-time me-1"></i> Auto-close (3s)
            </button>
          </div>
          
          <div id="alert-container-${e}" class="d-flex flex-column gap-2">
            <!-- Alerts will be inserted here -->
          </div>
          
          <div class="mt-3">
            <small class="text-muted">Alerts shown: <span id="count-${e}" class="badge bg-primary">0</span></small>
          </div>
        </div>
      </div>
    </div>
  `;return setTimeout(()=>{const r=document.getElementById(e);if(!r)return;const u=r.querySelector(`#alert-container-${e}`),p=r.querySelector(`#count-${e}`),f=r.querySelectorAll("[data-alert]");let g=0;const n=(i,o,v,x=!0,W=!1)=>{g++,p.textContent=g;const V="alert-"+Math.random().toString(36).substr(2,9),O={success:"bx-check-circle",error:"bx-x-circle",warning:"bx-error",info:"bx-info-circle"},t=document.createElement("div");t.className=`alert alert-${i} alert-dismissible fade show`,t.id=V,t.setAttribute("role","alert"),t.innerHTML=`
        <i class="bx ${O[i]} me-2"></i>
        <strong>${o}</strong> ${v}
        ${x?'<button type="button" class="btn-close" onclick="this.parentElement.remove()" aria-label="Close"></button>':""}
      `,u.appendChild(t),x&&t.querySelector(".btn-close").addEventListener("click",()=>{t.classList.remove("show"),setTimeout(()=>t.remove(),300)}),W&&setTimeout(()=>{t.classList.remove("show"),setTimeout(()=>t.remove(),300)},3e3)};f.forEach(i=>{i.addEventListener("click",o=>{switch(o.currentTarget.getAttribute("data-alert")){case"success":n("success","Success!","Operation completed successfully.");break;case"error":n("danger","Error!","Something went wrong. Please try again.");break;case"warning":n("warning","Warning!","Please review your information before proceeding.");break;case"info":n("info","Info:","Here's some helpful information for you.");break;case"auto":n("secondary","Auto-close","This alert will close automatically in 3 seconds.",!0,!0);break}})})},100),s};m.parameters={docs:{description:{story:`
**Interactive Demo:** Demonstração de alerts dinâmicos com dismiss e auto-close.

Funcionalidades:
- Botões para disparar diferentes tipos de alerts
- Dismiss manual clicando no X
- Auto-close após 3 segundos (opção)
- Contador de alerts exibidos
- Animação de fade out

**Uso típico:** Feedback de ações do usuário (salvar, deletar, atualizar).
      `}}};var y,w,A;b.parameters={...b.parameters,docs:{...(y=b.parameters)==null?void 0:y.docs,source:{originalSource:`() => \`
  <div class="row g-3">
    <div class="col-12">
      <h5>Cores</h5>
      <div class="d-flex flex-column gap-3" style="max-width: 600px;">
        \${createAlert({
  variant: 'primary',
  message: 'A simple primary alert—check it out!'
})}
        \${createAlert({
  variant: 'secondary',
  message: 'A simple secondary alert—check it out!'
})}
        \${createAlert({
  variant: 'success',
  message: 'A simple success alert—check it out!'
})}
        \${createAlert({
  variant: 'danger',
  message: 'A simple danger alert—check it out!'
})}
        \${createAlert({
  variant: 'warning',
  message: 'A simple warning alert—check it out!'
})}
        \${createAlert({
  variant: 'info',
  message: 'A simple info alert—check it out!'
})}
      </div>
    </div>
    <div class="col-12 mt-4">
      <h5>Com Ícone e Título</h5>
      <div class="d-flex flex-column gap-3" style="max-width: 600px;">
        \${createAlert({
  variant: 'success',
  title: 'Well done!',
  message: 'You successfully read this important alert message.',
  icon: 'bx bx-check-circle'
})}
        \${createAlert({
  variant: 'danger',
  title: 'Oh snap!',
  message: 'Change a few things up and try submitting again.',
  icon: 'bx bx-x-circle'
})}
      </div>
    </div>
    <div class="col-12 mt-4">
      <h5>Dismissible</h5>
      <div style="max-width: 600px;">
        \${createAlert({
  variant: 'warning',
  message: 'This alert can be closed by clicking the close button.',
  dismissible: true,
  icon: 'bx bx-error'
})}
      </div>
    </div>
  </div>
\``,...(A=(w=b.parameters)==null?void 0:w.docs)==null?void 0:A.source}}};var k,$,S;l.parameters={...l.parameters,docs:{...(k=l.parameters)==null?void 0:k.docs,source:{originalSource:`args => {
  const markup = createAlert(args);
  return \`
    <div style="max-width: 600px;">
      \${markup}
    </div>
    
    <hr class="my-5" />
    
    <details>
      <summary><strong>Code Snippets</strong></summary>
      <div class="mt-3">
        <h6>HTML</h6>
        <pre><code>\${formatHtmlSnippet(markup).replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
        <h6>React</h6>
        <pre><code>\${formatReactSnippet(markup, 'Alert').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
      </div>
    </details>
  \`;
}`,...(S=($=l.parameters)==null?void 0:$.docs)==null?void 0:S.source}}};var C,T,I;c.parameters={...c.parameters,docs:{...(C=c.parameters)==null?void 0:C.docs,source:{originalSource:`args => {
  const markup = createAlert(args);
  return \`
    <div style="max-width: 600px;">
      \${markup}
    </div>
    
    <hr class="my-5" />
    
    <details>
      <summary><strong>Code Snippets</strong></summary>
      <div class="mt-3">
        <h6>HTML</h6>
        <pre><code>\${formatHtmlSnippet(markup).replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
        <h6>React</h6>
        <pre><code>\${formatReactSnippet(markup, 'Alert').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
      </div>
    </details>
  \`;
}`,...(I=(T=c.parameters)==null?void 0:T.docs)==null?void 0:I.source}}};var E,D,M;d.parameters={...d.parameters,docs:{...(E=d.parameters)==null?void 0:E.docs,source:{originalSource:`args => {
  const markup = createAlert(args);
  return \`
    <div style="max-width: 600px;">
      \${markup}
    </div>
    
    <hr class="my-5" />
    
    <details>
      <summary><strong>Code Snippets</strong></summary>
      <div class="mt-3">
        <h6>HTML</h6>
        <pre><code>\${formatHtmlSnippet(markup).replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
        <h6>React</h6>
        <pre><code>\${formatReactSnippet(markup, 'Alert').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
      </div>
    </details>
  \`;
}`,...(M=(D=d.parameters)==null?void 0:D.docs)==null?void 0:M.source}}};var B,H,L;m.parameters={...m.parameters,docs:{...(B=m.parameters)==null?void 0:B.docs,source:{originalSource:`() => {
  const containerId = 'alert-interactive-' + Math.random().toString(36).substr(2, 9);
  const markup = \`
    <div id="\${containerId}" style="max-width: 800px;">
      <div class="alert alert-info mb-3">
        <i class="bx bx-info-circle me-2"></i>
        <strong>Interactive Demo:</strong> Click buttons to trigger different alerts. Dismissible alerts can be closed.
      </div>
      
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">Alert Triggers</h5>
          
          <div class="d-flex flex-wrap gap-2 mb-4">
            <button class="btn btn-success btn-sm" data-alert="success">
              <i class="bx bx-check me-1"></i> Show Success
            </button>
            <button class="btn btn-danger btn-sm" data-alert="error">
              <i class="bx bx-x me-1"></i> Show Error
            </button>
            <button class="btn btn-warning btn-sm" data-alert="warning">
              <i class="bx bx-error me-1"></i> Show Warning
            </button>
            <button class="btn btn-info btn-sm" data-alert="info">
              <i class="bx bx-info-circle me-1"></i> Show Info
            </button>
            <button class="btn btn-secondary btn-sm" data-alert="auto">
              <i class="bx bx-time me-1"></i> Auto-close (3s)
            </button>
          </div>
          
          <div id="alert-container-\${containerId}" class="d-flex flex-column gap-2">
            <!-- Alerts will be inserted here -->
          </div>
          
          <div class="mt-3">
            <small class="text-muted">Alerts shown: <span id="count-\${containerId}" class="badge bg-primary">0</span></small>
          </div>
        </div>
      </div>
    </div>
  \`;
  setTimeout(() => {
    const container = document.getElementById(containerId);
    if (!container) return;
    const alertContainer = container.querySelector(\`#alert-container-\${containerId}\`);
    const countBadge = container.querySelector(\`#count-\${containerId}\`);
    const buttons = container.querySelectorAll('[data-alert]');
    let alertCount = 0;
    const createAlertElement = (variant, title, message, dismissible = true, autoClose = false) => {
      alertCount++;
      countBadge.textContent = alertCount;
      const alertId = 'alert-' + Math.random().toString(36).substr(2, 9);
      const icons = {
        success: 'bx-check-circle',
        error: 'bx-x-circle',
        warning: 'bx-error',
        info: 'bx-info-circle'
      };
      const alert = document.createElement('div');
      alert.className = \`alert alert-\${variant} alert-dismissible fade show\`;
      alert.id = alertId;
      alert.setAttribute('role', 'alert');
      alert.innerHTML = \`
        <i class="bx \${icons[variant]} me-2"></i>
        <strong>\${title}</strong> \${message}
        \${dismissible ? '<button type="button" class="btn-close" onclick="this.parentElement.remove()" aria-label="Close"></button>' : ''}
      \`;
      alertContainer.appendChild(alert);

      // Dismiss handler
      if (dismissible) {
        const closeBtn = alert.querySelector('.btn-close');
        closeBtn.addEventListener('click', () => {
          alert.classList.remove('show');
          setTimeout(() => alert.remove(), 300);
        });
      }

      // Auto-close
      if (autoClose) {
        setTimeout(() => {
          alert.classList.remove('show');
          setTimeout(() => alert.remove(), 300);
        }, 3000);
      }
    };
    buttons.forEach(button => {
      button.addEventListener('click', e => {
        const alertType = e.currentTarget.getAttribute('data-alert');
        switch (alertType) {
          case 'success':
            createAlertElement('success', 'Success!', 'Operation completed successfully.');
            break;
          case 'error':
            createAlertElement('danger', 'Error!', 'Something went wrong. Please try again.');
            break;
          case 'warning':
            createAlertElement('warning', 'Warning!', 'Please review your information before proceeding.');
            break;
          case 'info':
            createAlertElement('info', 'Info:', 'Here\\'s some helpful information for you.');
            break;
          case 'auto':
            createAlertElement('secondary', 'Auto-close', 'This alert will close automatically in 3 seconds.', true, true);
            break;
        }
      });
    });
  }, 100);
  return markup;
}`,...(L=(H=m.parameters)==null?void 0:H.docs)==null?void 0:L.source}}};const _=["Overview","Default","WithIcon","Dismissible","Interactive"];export{l as Default,d as Dismissible,m as Interactive,b as Overview,c as WithIcon,_ as __namedExportsOrder,F as default};
