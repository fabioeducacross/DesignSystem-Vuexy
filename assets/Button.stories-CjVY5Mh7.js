import{c as Y}from"./snippets-m8t1HIl1.js";const nn={title:"Vuexy/Atoms/Actions/Button",tags:["autodocs"],argTypes:{variant:{control:{type:"select"},options:["primary","secondary","success","danger","warning","info","dark"],description:"Visual variant (color scheme)",table:{defaultValue:{summary:"primary"}}},size:{control:{type:"select"},options:["sm","md","lg"],description:"Button size",table:{defaultValue:{summary:"md"}}},outline:{control:"boolean",description:"Outline style (transparent background)",table:{defaultValue:{summary:!1}}},disabled:{control:"boolean",description:"Disabled state",table:{defaultValue:{summary:!1}}},label:{control:"text",description:"Button text",table:{defaultValue:{summary:"Button"}}},icon:{control:"text",description:'Icon class (optional, e.g., "bx bx-user")',table:{defaultValue:{summary:""}}},iconOnly:{control:"boolean",description:"Icon only button (no text)",table:{defaultValue:{summary:!1}}}},parameters:{docs:{description:{component:`
# Button

Botão do Vuexy com múltiplas variantes, tamanhos e estados.

## Quando usar
- Ações primárias e secundárias
- Formulários (submit, cancel)
- Navegação e CTAs

## Variantes
- **Primary**: Ação principal (CTA)
- **Secondary**: Ação secundária
- **Success**: Confirmação positiva
- **Danger**: Ações destrutivas
- **Warning**: Avisos que requerem atenção
- **Info**: Informações adicionais
- **Dark**: Contraste alternativo

## Estados
- Default, Hover, Focus, Active, Disabled
- Outline (variante transparente)

## Acessibilidade
- Use \`disabled\` attribute para desabilitar
- Sempre forneça texto descritivo
- Ícones sozinhos devem ter \`aria-label\`
        `}}}},n=({variant:t="primary",size:e="md",outline:d=!1,disabled:u=!1,label:r="Button",icon:o="",iconOnly:a=!1})=>{const i=e==="md"?"":`btn-${e}`,S=["btn",d?`btn-outline-${t}`:`btn-${t}`,i].filter(Boolean).join(" "),l=o?`<i class="${o}"></i>`:"";return`<button type="button" class="${S}" ${u?"disabled":""}>
  ${l}${o&&!a?" ":""}${a?"":r}
</button>`},p={render:()=>{const t=[{html:n({variant:"primary",label:"Primary"}),label:"Primary"},{html:n({variant:"secondary",label:"Secondary"}),label:"Secondary"},{html:n({variant:"success",label:"Success"}),label:"Success"},{html:n({variant:"danger",label:"Danger"}),label:"Danger"},{html:n({variant:"warning",label:"Warning"}),label:"Warning"},{html:n({variant:"info",label:"Info"}),label:"Info"},{html:n({variant:"dark",label:"Dark"}),label:"Dark"},{html:n({variant:"primary",outline:!0,label:"Outline"}),label:"Outline Primary"}];return Y(t,4)},parameters:{docs:{source:{code:`<!-- Solid Buttons -->
<button type="button" class="btn btn-primary">Primary</button>
<button type="button" class="btn btn-secondary">Secondary</button>
<button type="button" class="btn btn-success">Success</button>
<button type="button" class="btn btn-danger">Danger</button>

<!-- Outline Buttons -->
<button type="button" class="btn btn-outline-primary">Outline Primary</button>
<button type="button" class="btn btn-outline-secondary">Outline Secondary</button>`,language:"html"},description:{story:"Visão geral de todas as variantes disponíveis."}}}},g={args:{variant:"primary",size:"md",outline:!1,disabled:!1,label:"Primary Button",icon:"",iconOnly:!1},render:t=>n(t),parameters:{docs:{source:{code:n({variant:"primary",label:"Primary Button"})},description:{story:"Botão principal usado para ações primárias (CTAs)."}}}},y={args:{variant:"primary",outline:!0,label:"Outline Button"},render:t=>n(t),parameters:{docs:{source:{code:n({variant:"primary",outline:!0,label:"Outline Button"})},description:{story:"Variante outline com fundo transparente."}}}},v={render:()=>`
      <div style="display: flex; align-items: center; gap: 1rem;">
        ${n({size:"sm",label:"Small"})}
        ${n({size:"md",label:"Medium"})}
        ${n({size:"lg",label:"Large"})}
      </div>
    `,parameters:{docs:{source:{code:`<button type="button" class="btn btn-primary btn-sm">Small</button>
<button type="button" class="btn btn-primary">Medium</button>
<button type="button" class="btn btn-primary btn-lg">Large</button>`},description:{story:"Três tamanhos disponíveis: small (sm), medium (padrão) e large (lg)."}}}},x={args:{variant:"primary",disabled:!0,label:"Disabled Button"},render:t=>n(t),parameters:{docs:{source:{code:n({variant:"primary",disabled:!0,label:"Disabled Button"})},description:{story:"Estado desabilitado. Use o atributo `disabled` para prevenir interação."}}}},f={render:()=>`
      <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
        ${n({variant:"primary",icon:"bx bx-user",label:"Profile"})}
        ${n({variant:"success",icon:"bx bx-check",label:"Confirm"})}
        ${n({variant:"danger",icon:"bx bx-trash",label:"Delete"})}
        ${n({variant:"info",icon:"bx bx-download",label:"Download"})}
      </div>
    `,parameters:{docs:{source:{code:`<!-- Buttons with icons -->
<button type="button" class="btn btn-primary">
  <i class="bx bx-user"></i> Profile
</button>
<button type="button" class="btn btn-success">
  <i class="bx bx-check"></i> Confirm
</button>`},description:{story:"Botões com ícones usando Boxicons do Vuexy."}}}},h={render:()=>`
      <div style="display: flex; gap: 0.5rem;">
        ${n({variant:"primary",icon:"bx bx-plus",iconOnly:!0,size:"sm"})}
        ${n({variant:"danger",icon:"bx bx-trash",iconOnly:!0,size:"sm"})}
        ${n({variant:"info",icon:"bx bx-edit",iconOnly:!0,size:"sm"})}
        ${n({variant:"success",icon:"bx bx-check",iconOnly:!0,size:"sm"})}
      </div>
    `,parameters:{docs:{source:{code:`<!-- Icon-only buttons (adicione aria-label para acessibilidade) -->
<button type="button" class="btn btn-primary btn-sm" aria-label="Add">
  <i class="bx bx-plus"></i>
</button>
<button type="button" class="btn btn-danger btn-sm" aria-label="Delete">
  <i class="bx bx-trash"></i>
</button>`},description:{story:"Botões apenas com ícone. Sempre adicione `aria-label` para acessibilidade."}}}},B={render:()=>{const t=["primary","secondary","success","danger","warning","info","dark"];return`
      <div style="display: flex; flex-direction: column; gap: 1rem;">
        <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
          ${t.map(e=>n({variant:e,label:e.charAt(0).toUpperCase()+e.slice(1)})).join("")}
        </div>
        <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
          ${t.map(e=>n({variant:e,outline:!0,label:`Outline ${e}`})).join("")}
        </div>
      </div>
    `},parameters:{docs:{description:{story:"Todas as variantes de cor disponíveis (solid e outline)."}}}},c=()=>{const t="button-interactive-"+Math.random().toString(36).substr(2,9),e=`
    <div id="${t}" style="max-width: 600px;">
      <div class="alert alert-info mb-3">
        <i class="bx bx-info-circle me-2"></i>
        <strong>Interactive Demo:</strong> Click buttons to see actions. Count updates on each click.
      </div>
      
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">Button Actions</h5>
          <p class="text-muted">Click counter: <span id="click-count-${t}" class="badge bg-primary">0</span></p>
          
          <div class="d-flex flex-column gap-3">
            <!-- Primary Actions -->
            <div>
              <h6>Primary Actions</h6>
              <div class="d-flex gap-2 flex-wrap">
                <button type="button" class="btn btn-primary" data-action="save">
                  <i class="bx bx-save me-1"></i> Save
                </button>
                <button type="button" class="btn btn-success" data-action="submit">
                  <i class="bx bx-check me-1"></i> Submit
                </button>
                <button type="button" class="btn btn-danger" data-action="delete">
                  <i class="bx bx-trash me-1"></i> Delete
                </button>
              </div>
            </div>
            
            <!-- Secondary Actions -->
            <div>
              <h6>Secondary Actions</h6>
              <div class="d-flex gap-2 flex-wrap">
                <button type="button" class="btn btn-outline-primary" data-action="edit">
                  <i class="bx bx-edit me-1"></i> Edit
                </button>
                <button type="button" class="btn btn-outline-secondary" data-action="cancel">
                  Cancel
                </button>
              </div>
            </div>
            
            <!-- Toggle State -->
            <div>
              <h6>Toggle State</h6>
              <button type="button" class="btn btn-outline-info" data-action="toggle" id="toggle-btn-${t}">
                <i class="bx bx-heart me-1"></i> Like
              </button>
            </div>
            
            <!-- Disabled State -->
            <div>
              <h6>Disabled State</h6>
              <button type="button" class="btn btn-primary" disabled>
                <i class="bx bx-loader-alt bx-spin me-1"></i> Loading...
              </button>
            </div>
          </div>
          
          <div class="mt-3" id="log-${t}" style="max-height: 150px; overflow-y: auto; font-size: 0.85rem; background: #f8f9fa; padding: 10px; border-radius: 4px;">
            <div class="text-muted">Action log:</div>
          </div>
        </div>
      </div>
    </div>
  `;return setTimeout(()=>{const d=document.getElementById(t);if(!d)return;let u=0,r=!1;const o=document.getElementById(`click-count-${t}`),a=document.getElementById(`toggle-btn-${t}`),i=document.getElementById(`log-${t}`),s=(l,b="info")=>{const m=new Date().toLocaleTimeString(),X={info:"text-info",success:"text-success",danger:"text-danger",warning:"text-warning"}[b]||"text-muted",k=document.createElement("div");k.className=X,k.innerHTML=`<small>[${m}] ${l}</small>`,i.appendChild(k),i.scrollTop=i.scrollHeight};d.querySelectorAll("button[data-action]").forEach(l=>{l.addEventListener("click",b=>{const m=b.currentTarget.getAttribute("data-action");switch(u++,o.textContent=u,m){case"save":s("💾 Save action triggered","success");break;case"submit":s("✅ Submit action triggered","success");break;case"delete":s("🗑️ Delete action triggered (confirmation required)","danger");break;case"edit":s("✏️ Edit action triggered","info");break;case"cancel":s("❌ Cancel action triggered","warning");break;case"toggle":r=!r,r?(a.classList.remove("btn-outline-info"),a.classList.add("btn-info"),a.innerHTML='<i class="bx bxs-heart me-1"></i> Liked',s("❤️ Liked","success")):(a.classList.remove("btn-info"),a.classList.add("btn-outline-info"),a.innerHTML='<i class="bx bx-heart me-1"></i> Like',s("🤍 Unliked","info"));break}})}),s("Interactive demo ready! Click any button.","info")},100),e};c.parameters={docs:{description:{story:`
**Interactive Demo:** Demonstração completa de interatividade com botões.

Funcionalidades:
- Click counter atualiza em tempo real
- Diferentes ações com feedback visual
- Toggle state (like/unlike)
- Action log com timestamp
- Disabled state para loading

**Nota:** Esta é uma demonstração de interatividade local no Storybook. Em produção, os handlers seriam conectados à lógica da aplicação.
      `}}};var D,$,E;p.parameters={...p.parameters,docs:{...(D=p.parameters)==null?void 0:D.docs,source:{originalSource:`{
  render: () => {
    const variants = [{
      html: createButton({
        variant: 'primary',
        label: 'Primary'
      }),
      label: 'Primary'
    }, {
      html: createButton({
        variant: 'secondary',
        label: 'Secondary'
      }),
      label: 'Secondary'
    }, {
      html: createButton({
        variant: 'success',
        label: 'Success'
      }),
      label: 'Success'
    }, {
      html: createButton({
        variant: 'danger',
        label: 'Danger'
      }),
      label: 'Danger'
    }, {
      html: createButton({
        variant: 'warning',
        label: 'Warning'
      }),
      label: 'Warning'
    }, {
      html: createButton({
        variant: 'info',
        label: 'Info'
      }),
      label: 'Info'
    }, {
      html: createButton({
        variant: 'dark',
        label: 'Dark'
      }),
      label: 'Dark'
    }, {
      html: createButton({
        variant: 'primary',
        outline: true,
        label: 'Outline'
      }),
      label: 'Outline Primary'
    }];
    return createOverviewGrid(variants, 4);
  },
  parameters: {
    docs: {
      source: {
        code: \`<!-- Solid Buttons -->
<button type="button" class="btn btn-primary">Primary</button>
<button type="button" class="btn btn-secondary">Secondary</button>
<button type="button" class="btn btn-success">Success</button>
<button type="button" class="btn btn-danger">Danger</button>

<!-- Outline Buttons -->
<button type="button" class="btn btn-outline-primary">Outline Primary</button>
<button type="button" class="btn btn-outline-secondary">Outline Secondary</button>\`,
        language: 'html'
      },
      description: {
        story: 'Visão geral de todas as variantes disponíveis.'
      }
    }
  }
}`,...(E=($=p.parameters)==null?void 0:$.docs)==null?void 0:E.source}}};var L,C,w;g.parameters={...g.parameters,docs:{...(L=g.parameters)==null?void 0:L.docs,source:{originalSource:`{
  args: {
    variant: 'primary',
    size: 'md',
    outline: false,
    disabled: false,
    label: 'Primary Button',
    icon: '',
    iconOnly: false
  },
  render: args => createButton(args),
  parameters: {
    docs: {
      source: {
        code: createButton({
          variant: 'primary',
          label: 'Primary Button'
        })
      },
      description: {
        story: 'Botão principal usado para ações primárias (CTAs).'
      }
    }
  }
}`,...(w=(C=g.parameters)==null?void 0:C.docs)==null?void 0:w.source}}};var I,A,O;y.parameters={...y.parameters,docs:{...(I=y.parameters)==null?void 0:I.docs,source:{originalSource:`{
  args: {
    variant: 'primary',
    outline: true,
    label: 'Outline Button'
  },
  render: args => createButton(args),
  parameters: {
    docs: {
      source: {
        code: createButton({
          variant: 'primary',
          outline: true,
          label: 'Outline Button'
        })
      },
      description: {
        story: 'Variante outline com fundo transparente.'
      }
    }
  }
}`,...(O=(A=y.parameters)==null?void 0:A.docs)==null?void 0:O.source}}};var T,P,z;v.parameters={...v.parameters,docs:{...(T=v.parameters)==null?void 0:T.docs,source:{originalSource:`{
  render: () => {
    return \`
      <div style="display: flex; align-items: center; gap: 1rem;">
        \${createButton({
      size: 'sm',
      label: 'Small'
    })}
        \${createButton({
      size: 'md',
      label: 'Medium'
    })}
        \${createButton({
      size: 'lg',
      label: 'Large'
    })}
      </div>
    \`;
  },
  parameters: {
    docs: {
      source: {
        code: \`<button type="button" class="btn btn-primary btn-sm">Small</button>
<button type="button" class="btn btn-primary">Medium</button>
<button type="button" class="btn btn-primary btn-lg">Large</button>\`
      },
      description: {
        story: 'Três tamanhos disponíveis: small (sm), medium (padrão) e large (lg).'
      }
    }
  }
}`,...(z=(P=v.parameters)==null?void 0:P.docs)==null?void 0:z.source}}};var V,F,H;x.parameters={...x.parameters,docs:{...(V=x.parameters)==null?void 0:V.docs,source:{originalSource:`{
  args: {
    variant: 'primary',
    disabled: true,
    label: 'Disabled Button'
  },
  render: args => createButton(args),
  parameters: {
    docs: {
      source: {
        code: createButton({
          variant: 'primary',
          disabled: true,
          label: 'Disabled Button'
        })
      },
      description: {
        story: 'Estado desabilitado. Use o atributo \`disabled\` para prevenir interação.'
      }
    }
  }
}`,...(H=(F=x.parameters)==null?void 0:F.docs)==null?void 0:H.source}}};var M,U,W;f.parameters={...f.parameters,docs:{...(M=f.parameters)==null?void 0:M.docs,source:{originalSource:`{
  render: () => {
    return \`
      <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
        \${createButton({
      variant: 'primary',
      icon: 'bx bx-user',
      label: 'Profile'
    })}
        \${createButton({
      variant: 'success',
      icon: 'bx bx-check',
      label: 'Confirm'
    })}
        \${createButton({
      variant: 'danger',
      icon: 'bx bx-trash',
      label: 'Delete'
    })}
        \${createButton({
      variant: 'info',
      icon: 'bx bx-download',
      label: 'Download'
    })}
      </div>
    \`;
  },
  parameters: {
    docs: {
      source: {
        code: \`<!-- Buttons with icons -->
<button type="button" class="btn btn-primary">
  <i class="bx bx-user"></i> Profile
</button>
<button type="button" class="btn btn-success">
  <i class="bx bx-check"></i> Confirm
</button>\`
      },
      description: {
        story: 'Botões com ícones usando Boxicons do Vuexy.'
      }
    }
  }
}`,...(W=(U=f.parameters)==null?void 0:U.docs)==null?void 0:W.source}}};var q,j,N;h.parameters={...h.parameters,docs:{...(q=h.parameters)==null?void 0:q.docs,source:{originalSource:`{
  render: () => {
    return \`
      <div style="display: flex; gap: 0.5rem;">
        \${createButton({
      variant: 'primary',
      icon: 'bx bx-plus',
      iconOnly: true,
      size: 'sm'
    })}
        \${createButton({
      variant: 'danger',
      icon: 'bx bx-trash',
      iconOnly: true,
      size: 'sm'
    })}
        \${createButton({
      variant: 'info',
      icon: 'bx bx-edit',
      iconOnly: true,
      size: 'sm'
    })}
        \${createButton({
      variant: 'success',
      icon: 'bx bx-check',
      iconOnly: true,
      size: 'sm'
    })}
      </div>
    \`;
  },
  parameters: {
    docs: {
      source: {
        code: \`<!-- Icon-only buttons (adicione aria-label para acessibilidade) -->
<button type="button" class="btn btn-primary btn-sm" aria-label="Add">
  <i class="bx bx-plus"></i>
</button>
<button type="button" class="btn btn-danger btn-sm" aria-label="Delete">
  <i class="bx bx-trash"></i>
</button>\`
      },
      description: {
        story: 'Botões apenas com ícone. Sempre adicione \`aria-label\` para acessibilidade.'
      }
    }
  }
}`,...(N=(j=h.parameters)==null?void 0:j.docs)==null?void 0:N.source}}};var _,G,Q;B.parameters={...B.parameters,docs:{...(_=B.parameters)==null?void 0:_.docs,source:{originalSource:`{
  render: () => {
    const variants = ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'dark'];
    return \`
      <div style="display: flex; flex-direction: column; gap: 1rem;">
        <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
          \${variants.map(v => createButton({
      variant: v,
      label: v.charAt(0).toUpperCase() + v.slice(1)
    })).join('')}
        </div>
        <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
          \${variants.map(v => createButton({
      variant: v,
      outline: true,
      label: \`Outline \${v}\`
    })).join('')}
        </div>
      </div>
    \`;
  },
  parameters: {
    docs: {
      description: {
        story: 'Todas as variantes de cor disponíveis (solid e outline).'
      }
    }
  }
}`,...(Q=(G=B.parameters)==null?void 0:G.docs)==null?void 0:Q.source}}};var J,K,R;c.parameters={...c.parameters,docs:{...(J=c.parameters)==null?void 0:J.docs,source:{originalSource:`() => {
  const containerId = 'button-interactive-' + Math.random().toString(36).substr(2, 9);
  const markup = \`
    <div id="\${containerId}" style="max-width: 600px;">
      <div class="alert alert-info mb-3">
        <i class="bx bx-info-circle me-2"></i>
        <strong>Interactive Demo:</strong> Click buttons to see actions. Count updates on each click.
      </div>
      
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">Button Actions</h5>
          <p class="text-muted">Click counter: <span id="click-count-\${containerId}" class="badge bg-primary">0</span></p>
          
          <div class="d-flex flex-column gap-3">
            <!-- Primary Actions -->
            <div>
              <h6>Primary Actions</h6>
              <div class="d-flex gap-2 flex-wrap">
                <button type="button" class="btn btn-primary" data-action="save">
                  <i class="bx bx-save me-1"></i> Save
                </button>
                <button type="button" class="btn btn-success" data-action="submit">
                  <i class="bx bx-check me-1"></i> Submit
                </button>
                <button type="button" class="btn btn-danger" data-action="delete">
                  <i class="bx bx-trash me-1"></i> Delete
                </button>
              </div>
            </div>
            
            <!-- Secondary Actions -->
            <div>
              <h6>Secondary Actions</h6>
              <div class="d-flex gap-2 flex-wrap">
                <button type="button" class="btn btn-outline-primary" data-action="edit">
                  <i class="bx bx-edit me-1"></i> Edit
                </button>
                <button type="button" class="btn btn-outline-secondary" data-action="cancel">
                  Cancel
                </button>
              </div>
            </div>
            
            <!-- Toggle State -->
            <div>
              <h6>Toggle State</h6>
              <button type="button" class="btn btn-outline-info" data-action="toggle" id="toggle-btn-\${containerId}">
                <i class="bx bx-heart me-1"></i> Like
              </button>
            </div>
            
            <!-- Disabled State -->
            <div>
              <h6>Disabled State</h6>
              <button type="button" class="btn btn-primary" disabled>
                <i class="bx bx-loader-alt bx-spin me-1"></i> Loading...
              </button>
            </div>
          </div>
          
          <div class="mt-3" id="log-\${containerId}" style="max-height: 150px; overflow-y: auto; font-size: 0.85rem; background: #f8f9fa; padding: 10px; border-radius: 4px;">
            <div class="text-muted">Action log:</div>
          </div>
        </div>
      </div>
    </div>
  \`;
  setTimeout(() => {
    const container = document.getElementById(containerId);
    if (!container) return;
    let clickCount = 0;
    let isLiked = false;
    const countBadge = document.getElementById(\`click-count-\${containerId}\`);
    const toggleBtn = document.getElementById(\`toggle-btn-\${containerId}\`);
    const logContainer = document.getElementById(\`log-\${containerId}\`);
    const addLog = (message, type = 'info') => {
      const timestamp = new Date().toLocaleTimeString();
      const colorClass = {
        'info': 'text-info',
        'success': 'text-success',
        'danger': 'text-danger',
        'warning': 'text-warning'
      }[type] || 'text-muted';
      const logEntry = document.createElement('div');
      logEntry.className = colorClass;
      logEntry.innerHTML = \`<small>[\${timestamp}] \${message}</small>\`;
      logContainer.appendChild(logEntry);
      logContainer.scrollTop = logContainer.scrollHeight;
    };

    // Attach click handlers to all buttons
    const buttons = container.querySelectorAll('button[data-action]');
    buttons.forEach(button => {
      button.addEventListener('click', e => {
        const action = e.currentTarget.getAttribute('data-action');

        // Update counter
        clickCount++;
        countBadge.textContent = clickCount;

        // Handle specific actions
        switch (action) {
          case 'save':
            addLog('💾 Save action triggered', 'success');
            break;
          case 'submit':
            addLog('✅ Submit action triggered', 'success');
            break;
          case 'delete':
            addLog('🗑️ Delete action triggered (confirmation required)', 'danger');
            break;
          case 'edit':
            addLog('✏️ Edit action triggered', 'info');
            break;
          case 'cancel':
            addLog('❌ Cancel action triggered', 'warning');
            break;
          case 'toggle':
            isLiked = !isLiked;
            if (isLiked) {
              toggleBtn.classList.remove('btn-outline-info');
              toggleBtn.classList.add('btn-info');
              toggleBtn.innerHTML = '<i class="bx bxs-heart me-1"></i> Liked';
              addLog('❤️ Liked', 'success');
            } else {
              toggleBtn.classList.remove('btn-info');
              toggleBtn.classList.add('btn-outline-info');
              toggleBtn.innerHTML = '<i class="bx bx-heart me-1"></i> Like';
              addLog('🤍 Unliked', 'info');
            }
            break;
        }
      });
    });
    addLog('Interactive demo ready! Click any button.', 'info');
  }, 100);
  return markup;
}`,...(R=(K=c.parameters)==null?void 0:K.docs)==null?void 0:R.source}}};const tn=["Overview","Primary","Outline","Sizes","Disabled","WithIcon","IconOnly","AllVariants","Interactive"];export{B as AllVariants,x as Disabled,h as IconOnly,c as Interactive,y as Outline,p as Overview,g as Primary,v as Sizes,f as WithIcon,tn as __namedExportsOrder,nn as default};
