import{f as B,a as _}from"./snippets-m8t1HIl1.js";const P={title:"Atoms/Forms/Checkbox",tags:["autodocs"],parameters:{docs:{description:{component:`
# Checkbox

Checkbox estilizado do Vuexy para seleção múltipla usando Bootstrap 5.

## Quando usar
- Seleção múltipla de itens
- Ativação de opções on/off
- Formulários com múltiplas escolhas

## Variantes
- **Estados**: unchecked, checked, indeterminate, disabled
- **Layout**: block (padrão), inline

## Acessibilidade
- Use \`<label>\` associado com \`htmlFor\`
- Estado indeterminate requer JavaScript
- \`disabled\` para desabilitar interação
        `}}},argTypes:{checked:{control:"boolean",description:"Estado marcado",table:{defaultValue:{summary:!1}}},indeterminate:{control:"boolean",description:"Estado indeterminado (parcial)",table:{defaultValue:{summary:!1}}},disabled:{control:"boolean",description:"Estado desabilitado",table:{defaultValue:{summary:!1}}},label:{control:"text",description:"Texto do label",table:{defaultValue:{summary:"Checkbox Label"}}},inline:{control:"boolean",description:"Layout inline",table:{defaultValue:{summary:!1}}}}},c=({checked:e=!1,indeterminate:s=!1,disabled:t=!1,label:g="Checkbox Label",inline:r=!1,id:d="checkbox-1"})=>`<div class="form-check ${r?"form-check-inline":""}">
  <input 
    class="form-check-input" 
    type="checkbox" 
    ${e?"checked":""}
    ${t?"disabled":""}
    ${s?'data-indeterminate="true"':""}
    id="${d}"
  >
  <label class="form-check-label" for="${d}">
    ${g}
  </label>
</div>`,f=e=>{const s=c(e);return`
    <div style="max-width: 400px;">
      ${s}
    </div>
    
    <hr class="my-5" />
    
    <details>
      <summary><strong>Code Snippets</strong></summary>
      <div class="mt-3">
        <h6>HTML</h6>
        <pre><code>${B(s).replace(/</g,"&lt;").replace(/>/g,"&gt;")}</code></pre>
        <h6>React</h6>
        <pre><code>${_(s,"Checkbox").replace(/</g,"&lt;").replace(/>/g,"&gt;")}</code></pre>
      </div>
    </details>
  `},p=()=>`
  <div class="row g-4">
    <div class="col-12">
      <h5>Estados</h5>
      <div class="d-flex flex-column gap-2">
        ${c({label:"Unchecked",id:"cb-1"})}
        ${c({label:"Checked",checked:!0,id:"cb-2"})}
        ${c({label:"Indeterminate",indeterminate:!0,id:"cb-3"})}
        ${c({label:"Disabled",disabled:!0,id:"cb-4"})}
        ${c({label:"Disabled Checked",checked:!0,disabled:!0,id:"cb-5"})}
      </div>
    </div>
    <div class="col-12 mt-4">
      <h5>Inline Layout</h5>
      <div>
        ${c({label:"Option 1",inline:!0,id:"cb-inline-1"})}
        ${c({label:"Option 2",inline:!0,id:"cb-inline-2"})}
        ${c({label:"Option 3",inline:!0,id:"cb-inline-3"})}
      </div>
    </div>
  </div>
`,n=f.bind({});n.args={checked:!1,indeterminate:!1,disabled:!1,label:"Checkbox Label",inline:!1,id:"checkbox-default"};const b=f.bind({});b.args={...n.args,checked:!0,label:"Checked Checkbox",id:"checkbox-checked"};const m=f.bind({});m.args={...n.args,indeterminate:!0,label:"Indeterminate Checkbox",id:"checkbox-indeterminate"};const h=f.bind({});h.args={...n.args,disabled:!0,label:"Disabled Checkbox",id:"checkbox-disabled"};const u=()=>{const e="checkbox-interactive-"+Math.random().toString(36).substr(2,9),s=`
    <div id="${e}" style="max-width: 600px;">
      <div class="alert alert-info mb-3">
        <i class="bx bx-info-circle me-2"></i>
        <strong>Interactive Demo:</strong> Select/deselect checkboxes to see real-time updates.
      </div>
      
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">Checkbox Interactions</h5>
          
          <!-- Single checkbox -->
          <div class="mb-4">
            <h6>Single Selection</h6>
            <div class="form-check">
              <input class="form-check-input" type="checkbox" id="agree-${e}" data-checkbox="agree">
              <label class="form-check-label" for="agree-${e}">
                I agree to the terms and conditions
              </label>
            </div>
            <div class="mt-2">
              <span class="badge bg-secondary" id="agree-status-${e}">Not agreed</span>
            </div>
          </div>
          
          <!-- Multiple checkboxes (features) -->
          <div class="mb-4">
            <h6>Select Features</h6>
            <div class="d-flex flex-column gap-2">
              <div class="form-check">
                <input class="form-check-input" type="checkbox" id="feature-email-${e}" data-feature="email" checked>
                <label class="form-check-label" for="feature-email-${e}">
                  Email notifications
                </label>
              </div>
              <div class="form-check">
                <input class="form-check-input" type="checkbox" id="feature-sms-${e}" data-feature="sms">
                <label class="form-check-label" for="feature-sms-${e}">
                  SMS notifications
                </label>
              </div>
              <div class="form-check">
                <input class="form-check-input" type="checkbox" id="feature-push-${e}" data-feature="push" checked>
                <label class="form-check-label" for="feature-push-${e}">
                  Push notifications
                </label>
              </div>
              <div class="form-check">
                <input class="form-check-input" type="checkbox" id="feature-newsletter-${e}" data-feature="newsletter">
                <label class="form-check-label" for="feature-newsletter-${e}">
                  Newsletter
                </label>
              </div>
            </div>
            <div class="mt-2">
              <small class="text-muted">Selected: <span class="badge bg-primary" id="feature-count-${e}">2</span> features</small>
            </div>
          </div>
          
          <!-- Select All / Indeterminate -->
          <div class="mb-4">
            <h6>Select All (Indeterminate State)</h6>
            <div class="form-check mb-2">
              <input class="form-check-input" type="checkbox" id="select-all-${e}" data-checkbox="select-all">
              <label class="form-check-label fw-bold" for="select-all-${e}">
                Select All Tasks
              </label>
            </div>
            <div class="ms-4 d-flex flex-column gap-2">
              <div class="form-check">
                <input class="form-check-input task-checkbox" type="checkbox" id="task-1-${e}" data-task="task">
                <label class="form-check-label" for="task-1-${e}">
                  Review pull requests
                </label>
              </div>
              <div class="form-check">
                <input class="form-check-input task-checkbox" type="checkbox" id="task-2-${e}" data-task="task">
                <label class="form-check-label" for="task-2-${e}">
                  Update documentation
                </label>
              </div>
              <div class="form-check">
                <input class="form-check-input task-checkbox" type="checkbox" id="task-3-${e}" data-task="task">
                <label class="form-check-label" for="task-3-${e}">
                  Deploy to production
                </label>
              </div>
            </div>
            <div class="mt-2">
              <span class="badge bg-info" id="task-status-${e}">0 / 3 tasks completed</span>
            </div>
          </div>
          
          <!-- Disabled state -->
          <div class="mb-3">
            <h6>Disabled State</h6>
            <div class="form-check">
              <input class="form-check-input" type="checkbox" id="disabled-1-${e}" disabled>
              <label class="form-check-label text-muted" for="disabled-1-${e}">
                This option is disabled
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;return setTimeout(()=>{const t=document.getElementById(e);if(!t)return;e.split("-")[2];const g=t.querySelector(`#agree-${e}`),r=t.querySelector(`#agree-status-${e}`);g.addEventListener("change",a=>{a.target.checked?(r.textContent="✅ Agreed",r.className="badge bg-success"):(r.textContent="Not agreed",r.className="badge bg-secondary")});const d=t.querySelectorAll("[data-feature]"),$=t.querySelector(`#feature-count-${e}`),C=()=>{const a=Array.from(d).filter(i=>i.checked).length;$.textContent=a};d.forEach(a=>{a.addEventListener("change",C)});const l=t.querySelector(`#select-all-${e}`),k=t.querySelectorAll(".task-checkbox"),o=t.querySelector(`#task-status-${e}`),x=()=>{const a=Array.from(k).filter(v=>v.checked).length,i=k.length;a===0?(l.checked=!1,l.indeterminate=!1,o.textContent="0 / 3 tasks completed",o.className="badge bg-secondary"):a===i?(l.checked=!0,l.indeterminate=!1,o.textContent="✅ All tasks completed!",o.className="badge bg-success"):(l.checked=!1,l.indeterminate=!0,o.textContent=`${a} / ${i} tasks completed`,o.className="badge bg-info")};l.addEventListener("change",a=>{const i=a.target.checked;k.forEach(v=>{v.checked=i}),x()}),k.forEach(a=>{a.addEventListener("change",x)}),x()},100),s};u.parameters={docs:{description:{story:`
**Interactive Demo:** Demonstração completa de funcionalidades de checkbox.

Funcionalidades:
- **Single selection**: Toggle simples com feedback de estado
- **Multiple selection**: Contador de seleções múltiplas
- **Select All**: Estado indeterminado quando parcialmente selecionado
- **Task completion**: Tracking de progresso com badges
- **Disabled state**: Checkboxes desabilitados

**Estado Indeterminado:** O checkbox "Select All" mostra estado indeterminado quando apenas algumas tarefas estão selecionadas.
      `}}};var S,y,I;p.parameters={...p.parameters,docs:{...(S=p.parameters)==null?void 0:S.docs,source:{originalSource:`() => \`
  <div class="row g-4">
    <div class="col-12">
      <h5>Estados</h5>
      <div class="d-flex flex-column gap-2">
        \${createCheckbox({
  label: 'Unchecked',
  id: 'cb-1'
})}
        \${createCheckbox({
  label: 'Checked',
  checked: true,
  id: 'cb-2'
})}
        \${createCheckbox({
  label: 'Indeterminate',
  indeterminate: true,
  id: 'cb-3'
})}
        \${createCheckbox({
  label: 'Disabled',
  disabled: true,
  id: 'cb-4'
})}
        \${createCheckbox({
  label: 'Disabled Checked',
  checked: true,
  disabled: true,
  id: 'cb-5'
})}
      </div>
    </div>
    <div class="col-12 mt-4">
      <h5>Inline Layout</h5>
      <div>
        \${createCheckbox({
  label: 'Option 1',
  inline: true,
  id: 'cb-inline-1'
})}
        \${createCheckbox({
  label: 'Option 2',
  inline: true,
  id: 'cb-inline-2'
})}
        \${createCheckbox({
  label: 'Option 3',
  inline: true,
  id: 'cb-inline-3'
})}
      </div>
    </div>
  </div>
\``,...(I=(y=p.parameters)==null?void 0:y.docs)==null?void 0:I.source}}};var A,E,w;n.parameters={...n.parameters,docs:{...(A=n.parameters)==null?void 0:A.docs,source:{originalSource:`args => {
  const markup = createCheckbox(args);
  return \`
    <div style="max-width: 400px;">
      \${markup}
    </div>
    
    <hr class="my-5" />
    
    <details>
      <summary><strong>Code Snippets</strong></summary>
      <div class="mt-3">
        <h6>HTML</h6>
        <pre><code>\${formatHtmlSnippet(markup).replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
        <h6>React</h6>
        <pre><code>\${formatReactSnippet(markup, 'Checkbox').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
      </div>
    </details>
  \`;
}`,...(w=(E=n.parameters)==null?void 0:E.docs)==null?void 0:w.source}}};var D,L,q;b.parameters={...b.parameters,docs:{...(D=b.parameters)==null?void 0:D.docs,source:{originalSource:`args => {
  const markup = createCheckbox(args);
  return \`
    <div style="max-width: 400px;">
      \${markup}
    </div>
    
    <hr class="my-5" />
    
    <details>
      <summary><strong>Code Snippets</strong></summary>
      <div class="mt-3">
        <h6>HTML</h6>
        <pre><code>\${formatHtmlSnippet(markup).replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
        <h6>React</h6>
        <pre><code>\${formatReactSnippet(markup, 'Checkbox').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
      </div>
    </details>
  \`;
}`,...(q=(L=b.parameters)==null?void 0:L.docs)==null?void 0:q.source}}};var T,N,M;m.parameters={...m.parameters,docs:{...(T=m.parameters)==null?void 0:T.docs,source:{originalSource:`args => {
  const markup = createCheckbox(args);
  return \`
    <div style="max-width: 400px;">
      \${markup}
    </div>
    
    <hr class="my-5" />
    
    <details>
      <summary><strong>Code Snippets</strong></summary>
      <div class="mt-3">
        <h6>HTML</h6>
        <pre><code>\${formatHtmlSnippet(markup).replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
        <h6>React</h6>
        <pre><code>\${formatReactSnippet(markup, 'Checkbox').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
      </div>
    </details>
  \`;
}`,...(M=(N=m.parameters)==null?void 0:N.docs)==null?void 0:M.source}}};var R,F,H;h.parameters={...h.parameters,docs:{...(R=h.parameters)==null?void 0:R.docs,source:{originalSource:`args => {
  const markup = createCheckbox(args);
  return \`
    <div style="max-width: 400px;">
      \${markup}
    </div>
    
    <hr class="my-5" />
    
    <details>
      <summary><strong>Code Snippets</strong></summary>
      <div class="mt-3">
        <h6>HTML</h6>
        <pre><code>\${formatHtmlSnippet(markup).replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
        <h6>React</h6>
        <pre><code>\${formatReactSnippet(markup, 'Checkbox').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
      </div>
    </details>
  \`;
}`,...(H=(F=h.parameters)==null?void 0:F.docs)==null?void 0:H.source}}};var O,V,U;u.parameters={...u.parameters,docs:{...(O=u.parameters)==null?void 0:O.docs,source:{originalSource:`() => {
  const containerId = 'checkbox-interactive-' + Math.random().toString(36).substr(2, 9);
  const markup = \`
    <div id="\${containerId}" style="max-width: 600px;">
      <div class="alert alert-info mb-3">
        <i class="bx bx-info-circle me-2"></i>
        <strong>Interactive Demo:</strong> Select/deselect checkboxes to see real-time updates.
      </div>
      
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">Checkbox Interactions</h5>
          
          <!-- Single checkbox -->
          <div class="mb-4">
            <h6>Single Selection</h6>
            <div class="form-check">
              <input class="form-check-input" type="checkbox" id="agree-\${containerId}" data-checkbox="agree">
              <label class="form-check-label" for="agree-\${containerId}">
                I agree to the terms and conditions
              </label>
            </div>
            <div class="mt-2">
              <span class="badge bg-secondary" id="agree-status-\${containerId}">Not agreed</span>
            </div>
          </div>
          
          <!-- Multiple checkboxes (features) -->
          <div class="mb-4">
            <h6>Select Features</h6>
            <div class="d-flex flex-column gap-2">
              <div class="form-check">
                <input class="form-check-input" type="checkbox" id="feature-email-\${containerId}" data-feature="email" checked>
                <label class="form-check-label" for="feature-email-\${containerId}">
                  Email notifications
                </label>
              </div>
              <div class="form-check">
                <input class="form-check-input" type="checkbox" id="feature-sms-\${containerId}" data-feature="sms">
                <label class="form-check-label" for="feature-sms-\${containerId}">
                  SMS notifications
                </label>
              </div>
              <div class="form-check">
                <input class="form-check-input" type="checkbox" id="feature-push-\${containerId}" data-feature="push" checked>
                <label class="form-check-label" for="feature-push-\${containerId}">
                  Push notifications
                </label>
              </div>
              <div class="form-check">
                <input class="form-check-input" type="checkbox" id="feature-newsletter-\${containerId}" data-feature="newsletter">
                <label class="form-check-label" for="feature-newsletter-\${containerId}">
                  Newsletter
                </label>
              </div>
            </div>
            <div class="mt-2">
              <small class="text-muted">Selected: <span class="badge bg-primary" id="feature-count-\${containerId}">2</span> features</small>
            </div>
          </div>
          
          <!-- Select All / Indeterminate -->
          <div class="mb-4">
            <h6>Select All (Indeterminate State)</h6>
            <div class="form-check mb-2">
              <input class="form-check-input" type="checkbox" id="select-all-\${containerId}" data-checkbox="select-all">
              <label class="form-check-label fw-bold" for="select-all-\${containerId}">
                Select All Tasks
              </label>
            </div>
            <div class="ms-4 d-flex flex-column gap-2">
              <div class="form-check">
                <input class="form-check-input task-checkbox" type="checkbox" id="task-1-\${containerId}" data-task="task">
                <label class="form-check-label" for="task-1-\${containerId}">
                  Review pull requests
                </label>
              </div>
              <div class="form-check">
                <input class="form-check-input task-checkbox" type="checkbox" id="task-2-\${containerId}" data-task="task">
                <label class="form-check-label" for="task-2-\${containerId}">
                  Update documentation
                </label>
              </div>
              <div class="form-check">
                <input class="form-check-input task-checkbox" type="checkbox" id="task-3-\${containerId}" data-task="task">
                <label class="form-check-label" for="task-3-\${containerId}">
                  Deploy to production
                </label>
              </div>
            </div>
            <div class="mt-2">
              <span class="badge bg-info" id="task-status-\${containerId}">0 / 3 tasks completed</span>
            </div>
          </div>
          
          <!-- Disabled state -->
          <div class="mb-3">
            <h6>Disabled State</h6>
            <div class="form-check">
              <input class="form-check-input" type="checkbox" id="disabled-1-\${containerId}" disabled>
              <label class="form-check-label text-muted" for="disabled-1-\${containerId}">
                This option is disabled
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  \`;
  setTimeout(() => {
    const container = document.getElementById(containerId);
    if (!container) return;
    const idSuffix = containerId.split('-')[2];

    // Single agree checkbox
    const agreeCheckbox = container.querySelector(\`#agree-\${containerId}\`);
    const agreeStatus = container.querySelector(\`#agree-status-\${containerId}\`);
    agreeCheckbox.addEventListener('change', e => {
      if (e.target.checked) {
        agreeStatus.textContent = '✅ Agreed';
        agreeStatus.className = 'badge bg-success';
      } else {
        agreeStatus.textContent = 'Not agreed';
        agreeStatus.className = 'badge bg-secondary';
      }
    });

    // Feature checkboxes
    const featureCheckboxes = container.querySelectorAll('[data-feature]');
    const featureCount = container.querySelector(\`#feature-count-\${containerId}\`);
    const updateFeatureCount = () => {
      const count = Array.from(featureCheckboxes).filter(cb => cb.checked).length;
      featureCount.textContent = count;
    };
    featureCheckboxes.forEach(checkbox => {
      checkbox.addEventListener('change', updateFeatureCount);
    });

    // Select All with indeterminate state
    const selectAllCheckbox = container.querySelector(\`#select-all-\${containerId}\`);
    const taskCheckboxes = container.querySelectorAll('.task-checkbox');
    const taskStatus = container.querySelector(\`#task-status-\${containerId}\`);
    const updateSelectAll = () => {
      const checkedCount = Array.from(taskCheckboxes).filter(cb => cb.checked).length;
      const totalCount = taskCheckboxes.length;
      if (checkedCount === 0) {
        selectAllCheckbox.checked = false;
        selectAllCheckbox.indeterminate = false;
        taskStatus.textContent = '0 / 3 tasks completed';
        taskStatus.className = 'badge bg-secondary';
      } else if (checkedCount === totalCount) {
        selectAllCheckbox.checked = true;
        selectAllCheckbox.indeterminate = false;
        taskStatus.textContent = '✅ All tasks completed!';
        taskStatus.className = 'badge bg-success';
      } else {
        selectAllCheckbox.checked = false;
        selectAllCheckbox.indeterminate = true;
        taskStatus.textContent = \`\${checkedCount} / \${totalCount} tasks completed\`;
        taskStatus.className = 'badge bg-info';
      }
    };
    selectAllCheckbox.addEventListener('change', e => {
      const isChecked = e.target.checked;
      taskCheckboxes.forEach(checkbox => {
        checkbox.checked = isChecked;
      });
      updateSelectAll();
    });
    taskCheckboxes.forEach(checkbox => {
      checkbox.addEventListener('change', updateSelectAll);
    });

    // Initialize
    updateSelectAll();
  }, 100);
  return markup;
}`,...(U=(V=u.parameters)==null?void 0:V.docs)==null?void 0:U.source}}};const J=["Overview","Default","Checked","Indeterminate","Disabled","Interactive"];export{b as Checked,n as Default,h as Disabled,m as Indeterminate,u as Interactive,p as Overview,J as __namedExportsOrder,P as default};
