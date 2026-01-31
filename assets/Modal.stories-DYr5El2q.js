import{f as W,a as G,d as Z}from"./snippets-m8t1HIl1.js";const ta={title:"Organisms/Feedback/Modal",tags:["autodocs"],parameters:{docs:{description:{component:`
# Modal

Dialog modal do Vuexy para exibir conteúdo em overlay.

## Quando usar
- Confirmações importantes
- Formulários que precisam de foco
- Detalhes adicionais sem sair da página
- Alertas críticos

## Composição
- **Backdrop** - Overlay escuro (.modal-backdrop)
- **Dialog** - Container do modal (.modal-dialog)
- **Header** - Título e botão fechar
- **Body** - Conteúdo principal
- **Footer** - Ações (botões)

## Tamanhos
- Small: .modal-sm (300px)
- Default: sem classe (500px)
- Large: .modal-lg (800px)
- Extra Large: .modal-xl (1140px)
- Fullscreen: .modal-fullscreen

## Acessibilidade
- \`role="dialog"\` no modal
- \`aria-labelledby\` aponta para o título
- \`aria-hidden="true"\` quando fechado
- Foco automático no abrir
- ESC fecha o modal
        `}}},argTypes:{isOpen:{control:"boolean",description:"Estado do modal (aberto/fechado)",table:{defaultValue:{summary:!1}}},title:{control:"text",description:"Título do modal",table:{defaultValue:{summary:"Modal Title"}}},size:{control:"select",options:["sm","md","lg","xl","fullscreen"],description:"Tamanho do modal",table:{defaultValue:{summary:"md"}}},centered:{control:"boolean",description:"Centraliza verticalmente",table:{defaultValue:{summary:!1}}},scrollable:{control:"boolean",description:"Habilita scroll no body",table:{defaultValue:{summary:!1}}},showFooter:{control:"boolean",description:"Mostra footer com botões",table:{defaultValue:{summary:!0}}}}},r=({isOpen:e=!1,title:t="Modal Title",size:a="md",centered:f=!1,scrollable:v=!1,showFooter:o=!0})=>{const n=a!=="md"?`modal-${a}`:"";return`${e?'<div class="modal-backdrop fade show"></div>':""}
<div class="modal fade ${e?"show":""}" 
     id="exampleModal" 
     tabindex="-1" 
     aria-labelledby="exampleModalLabel" 
     aria-hidden="${!e}" 
     style="${e?"display: block;":"display: none;"}">
  <div class="modal-dialog ${n} ${f?"modal-dialog-centered":""} ${v?"modal-dialog-scrollable":""}">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">${t}</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      
      <div class="modal-body">
        <p>This is a modal dialog. It overlays the page content and requires user interaction before returning to the main content.</p>
        
        <div class="mb-3">
          <label for="modalInput" class="form-label">Example Input</label>
          <input type="text" class="form-control" id="modalInput" placeholder="Enter something...">
        </div>
        
        <div class="alert alert-info" role="alert">
          <div class="alert-body">
            <i class="bx bx-info-circle me-2"></i>
            Modal content can include any components: forms, cards, alerts, etc.
          </div>
        </div>
        
        ${v?`
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
        <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
        <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
        <p>Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        `:""}
      </div>
      
      ${o?`
    <div class="modal-footer">
      <button type="button" class="btn btn-label-secondary" data-bs-dismiss="modal">Close</button>
      <button type="button" class="btn btn-primary">Save changes</button>
    </div>`:""}
    </div>
  </div>
</div>`},d=e=>{const t=r(e);return`
    <div>
      ${e.isOpen?"":`
        <button type="button" class="btn btn-primary" onclick="alert('In Storybook, use controls to toggle isOpen')">
          Open Modal (use controls)
        </button>
      `}
      
      ${t}
    </div>
    
    <div class="mt-4">
      <p class="text-muted"><strong>Nota:</strong> Modal requer Bootstrap JS para funcionar. Use o control "isOpen" acima para visualizar.</p>
      ${e.isOpen?'<p class="text-success"><strong>✓ Modal aberto</strong> - Clique no backdrop ou ESC para fechar (funcional apenas com JS)</p>':""}
    </div>
    
    <hr class="my-5" />
    
    <details>
      <summary><strong>Code Snippets</strong></summary>
      <div class="mt-3">
        <h6>HTML</h6>
        <pre><code>${W(t).replace(/</g,"&lt;").replace(/>/g,"&gt;")}</code></pre>
        <h6>React</h6>
        <pre><code>${G(t,"Modal").replace(/</g,"&lt;").replace(/>/g,"&gt;")}</code></pre>
        <h6>Vue 3</h6>
        <pre><code>${Z(t,"Modal").replace(/</g,"&lt;").replace(/>/g,"&gt;")}</code></pre>
      </div>
    </details>
  `},y=()=>`
  <div class="row g-4">
    <div class="col-12">
      <h5>Sizes</h5>
      <div class="d-flex gap-2 mb-4">
        <button class="btn btn-sm btn-outline-primary">Small Modal</button>
        <button class="btn btn-sm btn-outline-primary">Default Modal</button>
        <button class="btn btn-sm btn-outline-primary">Large Modal</button>
        <button class="btn btn-sm btn-outline-primary">XL Modal</button>
      </div>
      <p class="text-muted"><small>Use os controles acima para visualizar cada tamanho com isOpen=true</small></p>
    </div>
    
    <div class="col-6">
      <h5>Small</h5>
      <div style="transform: scale(0.6); transform-origin: top left; width: 166%; height: 400px; overflow: hidden;">
        ${r({isOpen:!0,title:"Small Modal",size:"sm"})}
      </div>
    </div>
    
    <div class="col-6">
      <h5>Default</h5>
      <div style="transform: scale(0.6); transform-origin: top left; width: 166%; height: 400px; overflow: hidden;">
        ${r({isOpen:!0,title:"Default Modal",size:"md"})}
      </div>
    </div>
    
    <div class="col-6">
      <h5>Large</h5>
      <div style="transform: scale(0.5); transform-origin: top left; width: 200%; height: 400px; overflow: hidden;">
        ${r({isOpen:!0,title:"Large Modal",size:"lg"})}
      </div>
    </div>
    
    <div class="col-6">
      <h5>Centered</h5>
      <div style="transform: scale(0.6); transform-origin: top left; width: 166%; height: 400px; overflow: hidden;">
        ${r({isOpen:!0,title:"Centered Modal",centered:!0})}
      </div>
    </div>
  </div>
`,s=d.bind({});s.args={isOpen:!1,title:"My Modal",size:"md",centered:!1,scrollable:!1,showFooter:!0};const l=d.bind({});l.args={...s.args,isOpen:!0};const c=d.bind({});c.args={...l.args,size:"lg",title:"Large Modal Dialog"};const m=d.bind({});m.args={...l.args,centered:!0,title:"Centered Modal"};const p=d.bind({});p.args={...l.args,scrollable:!0,title:"Scrollable Modal"};const u=d.bind({});u.args={...l.args,showFooter:!1,title:"Modal Without Footer"};const b=()=>{const e="modal-interactive-"+Math.random().toString(36).substr(2,9),t=`
    <div id="${e}">
      <button class="btn btn-primary" data-action="open-modal">
        <i class="bx bx-plus me-1"></i> Open Modal
      </button>
      
      <!-- Modal -->
      <div class="modal fade" data-modal-element tabindex="-1" style="display: none;" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Interactive Modal</h5>
              <button type="button" class="btn-close" data-action="close-modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <p>This is an interactive modal demo. You can:</p>
              <ul>
                <li>Click the "Open Modal" button to open</li>
                <li>Click the X button to close</li>
                <li>Click the "Close" button to close</li>
                <li>Click outside the modal to close (backdrop is dismissible)</li>
              </ul>
              <div class="alert alert-primary mt-3" role="alert">
                <div class="alert-body">
                  <i class="bx bx-info-circle me-2"></i>
                  All interactions are handled via Storybook state without external scripts.
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-label-secondary" data-action="close-modal">Close</button>
              <button type="button" class="btn btn-primary">Save changes</button>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Backdrop -->
      <div class="modal-backdrop fade" data-modal-backdrop style="display: none;"></div>
    </div>
  `;return setTimeout(()=>{const a=document.getElementById(e);if(!a)return;const f=a.querySelector('[data-action="open-modal"]'),v=a.querySelectorAll('[data-action="close-modal"]'),o=a.querySelector("[data-modal-element]"),n=a.querySelector("[data-modal-backdrop]"),S=()=>{o.style.display="block",n.style.display="block",setTimeout(()=>{o.classList.add("show"),n.classList.add("show"),o.setAttribute("aria-hidden","false")},10)},g=()=>{o.classList.remove("show"),n.classList.remove("show"),o.setAttribute("aria-hidden","true"),setTimeout(()=>{o.style.display="none",n.style.display="none"},300)};f.addEventListener("click",S),v.forEach(h=>{h.addEventListener("click",g)}),n.addEventListener("click",g);const x=h=>{h.key==="Escape"&&o.classList.contains("show")&&g()};document.addEventListener("keydown",x),a._cleanup=()=>{document.removeEventListener("keydown",x)}},100),t};b.parameters={docs:{description:{story:"Interactive modal with open/close functionality, dismissible backdrop, and **Escape key** support for closing."}}};const i={parameters:{docs:{description:{story:`
### Modal com Bootstrap JS Real

Implementação oficial usando Bootstrap JS do Vuexy:

- ✅ **Open/Close** com animações suaves do Bootstrap
- ✅ **Backdrop** com blur e dismiss on click
- ✅ **Escape key** para fechar
- ✅ **Focus management** automático
- ✅ **Body scroll lock** quando modal aberto
- ✅ **Múltiplos tamanhos** (sm, default, lg, xl, fullscreen)
- ✅ **Stacked modals** suportado

**Comparação:** Esta story usa Bootstrap JS oficial vs a "Interactive" que usa JavaScript custom.

### Como testar:
1. Clique nos botões para abrir modals
2. Pressione Escape para fechar
3. Clique no backdrop para fechar
4. Teste os diferentes tamanhos
        `}}},loaders:[async()=>typeof window<"u"&&!window.bootstrap?new Promise((e,t)=>{const a=document.createElement("script");a.src="/vuexy/js/bootstrap.js",a.onload=()=>{console.log("✅ Bootstrap JS carregado para Modal"),e({bootstrapLoaded:!0})},a.onerror=()=>t(new Error("Failed to load Bootstrap JS")),document.head.appendChild(a)}):{bootstrapLoaded:!0}],render:()=>`
      <div style="padding: 30px;">
        <h5 class="mb-4">Modals com Bootstrap JS</h5>
        
        <!-- Trigger Buttons -->
        <div class="row g-3 mb-4">
          <div class="col-md-4">
            <button type="button" class="btn btn-primary w-100" data-bs-toggle="modal" data-bs-target="#modalBasic">
              <i class="ti ti-square me-1"></i> Default Modal
            </button>
          </div>
          
          <div class="col-md-4">
            <button type="button" class="btn btn-success w-100" data-bs-toggle="modal" data-bs-target="#modalLarge">
              <i class="ti ti-square me-1"></i> Large Modal
            </button>
          </div>
          
          <div class="col-md-4">
            <button type="button" class="btn btn-warning w-100" data-bs-toggle="modal" data-bs-target="#modalSmall">
              <i class="ti ti-square me-1"></i> Small Modal
            </button>
          </div>
          
          <div class="col-md-4">
            <button type="button" class="btn btn-info w-100" data-bs-toggle="modal" data-bs-target="#modalCentered">
              <i class="ti ti-align-center me-1"></i> Centered
            </button>
          </div>
          
          <div class="col-md-4">
            <button type="button" class="btn btn-danger w-100" data-bs-toggle="modal" data-bs-target="#modalScrollable">
              <i class="ti ti-scroll me-1"></i> Scrollable
            </button>
          </div>
          
          <div class="col-md-4">
            <button type="button" class="btn btn-dark w-100" data-bs-toggle="modal" data-bs-target="#modalFullscreen">
              <i class="ti ti-maximize me-1"></i> Fullscreen
            </button>
          </div>
        </div>
        
        <!-- Modal 1: Basic -->
        <div class="modal fade" id="modalBasic" tabindex="-1" aria-labelledby="modalBasicLabel" aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="modalBasicLabel">Default Modal</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                <p>Este é um modal padrão do Bootstrap. Ele tem largura de 500px e pode conter qualquer conteúdo.</p>
                <p class="mb-0">Você pode fechá-lo clicando no X, no backdrop, ou pressionando Escape.</p>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-label-secondary" data-bs-dismiss="modal">Cancelar</button>
                <button type="button" class="btn btn-primary">Confirmar</button>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Modal 2: Large -->
        <div class="modal fade" id="modalLarge" tabindex="-1" aria-labelledby="modalLargeLabel" aria-hidden="true">
          <div class="modal-dialog modal-lg">
            <div class="modal-content">
              <div class="modal-header bg-success text-white">
                <h5 class="modal-title" id="modalLargeLabel">Large Modal (800px)</h5>
                <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                <div class="row">
                  <div class="col-md-6">
                    <h6>Coluna 1</h6>
                    <p>Modals largos são perfeitos para formulários complexos ou conteúdo que precisa de mais espaço horizontal.</p>
                    <ul>
                      <li>Largura: 800px</li>
                      <li>Classe: .modal-lg</li>
                      <li>Ideal para formulários</li>
                    </ul>
                  </div>
                  <div class="col-md-6">
                    <h6>Coluna 2</h6>
                    <p>Você pode usar o grid do Bootstrap dentro dos modals para criar layouts complexos.</p>
                    <div class="alert alert-info mb-0">
                      <strong>Dica:</strong> Use .modal-xl para 1140px
                    </div>
                  </div>
                </div>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">Fechar</button>
                <button type="button" class="btn btn-success">Salvar</button>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Modal 3: Small -->
        <div class="modal fade" id="modalSmall" tabindex="-1" aria-labelledby="modalSmallLabel" aria-hidden="true">
          <div class="modal-dialog modal-sm">
            <div class="modal-content">
              <div class="modal-header bg-warning">
                <h5 class="modal-title" id="modalSmallLabel">Small Modal</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                <p class="mb-2"><strong>Confirmar ação?</strong></p>
                <p class="mb-0 text-muted">Modals pequenos (300px) são ideais para confirmações simples.</p>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-sm btn-label-secondary" data-bs-dismiss="modal">Não</button>
                <button type="button" class="btn btn-sm btn-warning">Sim</button>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Modal 4: Centered -->
        <div class="modal fade" id="modalCentered" tabindex="-1" aria-labelledby="modalCenteredLabel" aria-hidden="true">
          <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
              <div class="modal-header bg-info text-white">
                <h5 class="modal-title" id="modalCenteredLabel">Vertically Centered</h5>
                <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body text-center py-4">
                <i class="ti ti-info-circle" style="font-size: 48px; color: var(--bs-info);"></i>
                <h6 class="mt-3">Modal Centralizado</h6>
                <p class="mb-0">Este modal está centralizado verticalmente na tela usando .modal-dialog-centered</p>
              </div>
              <div class="modal-footer justify-content-center">
                <button type="button" class="btn btn-info" data-bs-dismiss="modal">Entendi</button>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Modal 5: Scrollable -->
        <div class="modal fade" id="modalScrollable" tabindex="-1" aria-labelledby="modalScrollableLabel" aria-hidden="true">
          <div class="modal-dialog modal-dialog-scrollable">
            <div class="modal-content">
              <div class="modal-header bg-danger text-white">
                <h5 class="modal-title" id="modalScrollableLabel">Scrollable Modal</h5>
                <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                <p>Este modal tem conteúdo scrollável quando o conteúdo excede a altura máxima.</p>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
                <p>Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.</p>
                <p>Totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>
                <p class="mb-0">Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.</p>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Fechar</button>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Modal 6: Fullscreen -->
        <div class="modal fade" id="modalFullscreen" tabindex="-1" aria-labelledby="modalFullscreenLabel" aria-hidden="true">
          <div class="modal-dialog modal-fullscreen">
            <div class="modal-content">
              <div class="modal-header bg-dark text-white">
                <h5 class="modal-title" id="modalFullscreenLabel">Fullscreen Modal</h5>
                <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                <div class="container-fluid">
                  <div class="row">
                    <div class="col-12 text-center py-5">
                      <i class="ti ti-maximize" style="font-size: 64px;"></i>
                      <h3 class="mt-3">Modal Fullscreen</h3>
                      <p class="lead">Este modal ocupa toda a tela do navegador</p>
                      <p>Ideal para formulários complexos, editores, ou visualizações que precisam de máximo espaço.</p>
                      <div class="alert alert-dark mt-4">
                        <strong>Breakpoint variants:</strong>
                        <ul class="mb-0">
                          <li>.modal-fullscreen-sm-down - Fullscreen em telas < 576px</li>
                          <li>.modal-fullscreen-md-down - Fullscreen em telas < 768px</li>
                          <li>.modal-fullscreen-lg-down - Fullscreen em telas < 992px</li>
                          <li>.modal-fullscreen-xl-down - Fullscreen em telas < 1200px</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-dark" data-bs-dismiss="modal">Fechar Fullscreen</button>
              </div>
            </div>
          </div>
        </div>
        
        <div class="alert alert-info mt-4">
          <strong>💡 Teste a interatividade:</strong>
          <ul class="mb-0 mt-2">
            <li><strong>Abrir:</strong> Clique nos botões para abrir diferentes modals</li>
            <li><strong>Fechar:</strong> Use X, backdrop (click fora), ou Escape key</li>
            <li><strong>Focus:</strong> Note como o foco vai automaticamente para o modal</li>
            <li><strong>Scroll:</strong> O body da página trava quando modal está aberto</li>
            <li><strong>Tamanhos:</strong> Teste todos os 6 tipos de modals</li>
          </ul>
        </div>
      </div>
    `};var M,k,C;y.parameters={...y.parameters,docs:{...(M=y.parameters)==null?void 0:M.docs,source:{originalSource:`() => \`
  <div class="row g-4">
    <div class="col-12">
      <h5>Sizes</h5>
      <div class="d-flex gap-2 mb-4">
        <button class="btn btn-sm btn-outline-primary">Small Modal</button>
        <button class="btn btn-sm btn-outline-primary">Default Modal</button>
        <button class="btn btn-sm btn-outline-primary">Large Modal</button>
        <button class="btn btn-sm btn-outline-primary">XL Modal</button>
      </div>
      <p class="text-muted"><small>Use os controles acima para visualizar cada tamanho com isOpen=true</small></p>
    </div>
    
    <div class="col-6">
      <h5>Small</h5>
      <div style="transform: scale(0.6); transform-origin: top left; width: 166%; height: 400px; overflow: hidden;">
        \${createModal({
  isOpen: true,
  title: 'Small Modal',
  size: 'sm'
})}
      </div>
    </div>
    
    <div class="col-6">
      <h5>Default</h5>
      <div style="transform: scale(0.6); transform-origin: top left; width: 166%; height: 400px; overflow: hidden;">
        \${createModal({
  isOpen: true,
  title: 'Default Modal',
  size: 'md'
})}
      </div>
    </div>
    
    <div class="col-6">
      <h5>Large</h5>
      <div style="transform: scale(0.5); transform-origin: top left; width: 200%; height: 400px; overflow: hidden;">
        \${createModal({
  isOpen: true,
  title: 'Large Modal',
  size: 'lg'
})}
      </div>
    </div>
    
    <div class="col-6">
      <h5>Centered</h5>
      <div style="transform: scale(0.6); transform-origin: top left; width: 166%; height: 400px; overflow: hidden;">
        \${createModal({
  isOpen: true,
  title: 'Centered Modal',
  centered: true
})}
      </div>
    </div>
  </div>
\``,...(C=(k=y.parameters)==null?void 0:k.docs)==null?void 0:C.source}}};var w,E,L;s.parameters={...s.parameters,docs:{...(w=s.parameters)==null?void 0:w.docs,source:{originalSource:`args => {
  const markup = createModal(args);
  return \`
    <div>
      \${args.isOpen ? '' : \`
        <button type="button" class="btn btn-primary" onclick="alert('In Storybook, use controls to toggle isOpen')">
          Open Modal (use controls)
        </button>
      \`}
      
      \${markup}
    </div>
    
    <div class="mt-4">
      <p class="text-muted"><strong>Nota:</strong> Modal requer Bootstrap JS para funcionar. Use o control "isOpen" acima para visualizar.</p>
      \${args.isOpen ? '<p class="text-success"><strong>✓ Modal aberto</strong> - Clique no backdrop ou ESC para fechar (funcional apenas com JS)</p>' : ''}
    </div>
    
    <hr class="my-5" />
    
    <details>
      <summary><strong>Code Snippets</strong></summary>
      <div class="mt-3">
        <h6>HTML</h6>
        <pre><code>\${formatHtmlSnippet(markup).replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
        <h6>React</h6>
        <pre><code>\${formatReactSnippet(markup, 'Modal').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
        <h6>Vue 3</h6>
        <pre><code>\${formatVue3Snippet(markup, 'Modal').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
      </div>
    </details>
  \`;
}`,...(L=(E=s.parameters)==null?void 0:E.docs)==null?void 0:L.source}}};var q,O,$;l.parameters={...l.parameters,docs:{...(q=l.parameters)==null?void 0:q.docs,source:{originalSource:`args => {
  const markup = createModal(args);
  return \`
    <div>
      \${args.isOpen ? '' : \`
        <button type="button" class="btn btn-primary" onclick="alert('In Storybook, use controls to toggle isOpen')">
          Open Modal (use controls)
        </button>
      \`}
      
      \${markup}
    </div>
    
    <div class="mt-4">
      <p class="text-muted"><strong>Nota:</strong> Modal requer Bootstrap JS para funcionar. Use o control "isOpen" acima para visualizar.</p>
      \${args.isOpen ? '<p class="text-success"><strong>✓ Modal aberto</strong> - Clique no backdrop ou ESC para fechar (funcional apenas com JS)</p>' : ''}
    </div>
    
    <hr class="my-5" />
    
    <details>
      <summary><strong>Code Snippets</strong></summary>
      <div class="mt-3">
        <h6>HTML</h6>
        <pre><code>\${formatHtmlSnippet(markup).replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
        <h6>React</h6>
        <pre><code>\${formatReactSnippet(markup, 'Modal').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
        <h6>Vue 3</h6>
        <pre><code>\${formatVue3Snippet(markup, 'Modal').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
      </div>
    </details>
  \`;
}`,...($=(O=l.parameters)==null?void 0:O.docs)==null?void 0:$.source}}};var F,B,T;c.parameters={...c.parameters,docs:{...(F=c.parameters)==null?void 0:F.docs,source:{originalSource:`args => {
  const markup = createModal(args);
  return \`
    <div>
      \${args.isOpen ? '' : \`
        <button type="button" class="btn btn-primary" onclick="alert('In Storybook, use controls to toggle isOpen')">
          Open Modal (use controls)
        </button>
      \`}
      
      \${markup}
    </div>
    
    <div class="mt-4">
      <p class="text-muted"><strong>Nota:</strong> Modal requer Bootstrap JS para funcionar. Use o control "isOpen" acima para visualizar.</p>
      \${args.isOpen ? '<p class="text-success"><strong>✓ Modal aberto</strong> - Clique no backdrop ou ESC para fechar (funcional apenas com JS)</p>' : ''}
    </div>
    
    <hr class="my-5" />
    
    <details>
      <summary><strong>Code Snippets</strong></summary>
      <div class="mt-3">
        <h6>HTML</h6>
        <pre><code>\${formatHtmlSnippet(markup).replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
        <h6>React</h6>
        <pre><code>\${formatReactSnippet(markup, 'Modal').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
        <h6>Vue 3</h6>
        <pre><code>\${formatVue3Snippet(markup, 'Modal').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
      </div>
    </details>
  \`;
}`,...(T=(B=c.parameters)==null?void 0:B.docs)==null?void 0:T.source}}};var z,I,V;m.parameters={...m.parameters,docs:{...(z=m.parameters)==null?void 0:z.docs,source:{originalSource:`args => {
  const markup = createModal(args);
  return \`
    <div>
      \${args.isOpen ? '' : \`
        <button type="button" class="btn btn-primary" onclick="alert('In Storybook, use controls to toggle isOpen')">
          Open Modal (use controls)
        </button>
      \`}
      
      \${markup}
    </div>
    
    <div class="mt-4">
      <p class="text-muted"><strong>Nota:</strong> Modal requer Bootstrap JS para funcionar. Use o control "isOpen" acima para visualizar.</p>
      \${args.isOpen ? '<p class="text-success"><strong>✓ Modal aberto</strong> - Clique no backdrop ou ESC para fechar (funcional apenas com JS)</p>' : ''}
    </div>
    
    <hr class="my-5" />
    
    <details>
      <summary><strong>Code Snippets</strong></summary>
      <div class="mt-3">
        <h6>HTML</h6>
        <pre><code>\${formatHtmlSnippet(markup).replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
        <h6>React</h6>
        <pre><code>\${formatReactSnippet(markup, 'Modal').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
        <h6>Vue 3</h6>
        <pre><code>\${formatVue3Snippet(markup, 'Modal').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
      </div>
    </details>
  \`;
}`,...(V=(I=m.parameters)==null?void 0:I.docs)==null?void 0:V.source}}};var J,A,D;p.parameters={...p.parameters,docs:{...(J=p.parameters)==null?void 0:J.docs,source:{originalSource:`args => {
  const markup = createModal(args);
  return \`
    <div>
      \${args.isOpen ? '' : \`
        <button type="button" class="btn btn-primary" onclick="alert('In Storybook, use controls to toggle isOpen')">
          Open Modal (use controls)
        </button>
      \`}
      
      \${markup}
    </div>
    
    <div class="mt-4">
      <p class="text-muted"><strong>Nota:</strong> Modal requer Bootstrap JS para funcionar. Use o control "isOpen" acima para visualizar.</p>
      \${args.isOpen ? '<p class="text-success"><strong>✓ Modal aberto</strong> - Clique no backdrop ou ESC para fechar (funcional apenas com JS)</p>' : ''}
    </div>
    
    <hr class="my-5" />
    
    <details>
      <summary><strong>Code Snippets</strong></summary>
      <div class="mt-3">
        <h6>HTML</h6>
        <pre><code>\${formatHtmlSnippet(markup).replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
        <h6>React</h6>
        <pre><code>\${formatReactSnippet(markup, 'Modal').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
        <h6>Vue 3</h6>
        <pre><code>\${formatVue3Snippet(markup, 'Modal').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
      </div>
    </details>
  \`;
}`,...(D=(A=p.parameters)==null?void 0:A.docs)==null?void 0:D.source}}};var H,R,N;u.parameters={...u.parameters,docs:{...(H=u.parameters)==null?void 0:H.docs,source:{originalSource:`args => {
  const markup = createModal(args);
  return \`
    <div>
      \${args.isOpen ? '' : \`
        <button type="button" class="btn btn-primary" onclick="alert('In Storybook, use controls to toggle isOpen')">
          Open Modal (use controls)
        </button>
      \`}
      
      \${markup}
    </div>
    
    <div class="mt-4">
      <p class="text-muted"><strong>Nota:</strong> Modal requer Bootstrap JS para funcionar. Use o control "isOpen" acima para visualizar.</p>
      \${args.isOpen ? '<p class="text-success"><strong>✓ Modal aberto</strong> - Clique no backdrop ou ESC para fechar (funcional apenas com JS)</p>' : ''}
    </div>
    
    <hr class="my-5" />
    
    <details>
      <summary><strong>Code Snippets</strong></summary>
      <div class="mt-3">
        <h6>HTML</h6>
        <pre><code>\${formatHtmlSnippet(markup).replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
        <h6>React</h6>
        <pre><code>\${formatReactSnippet(markup, 'Modal').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
        <h6>Vue 3</h6>
        <pre><code>\${formatVue3Snippet(markup, 'Modal').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
      </div>
    </details>
  \`;
}`,...(N=(R=u.parameters)==null?void 0:R.docs)==null?void 0:N.source}}};var U,j,X;b.parameters={...b.parameters,docs:{...(U=b.parameters)==null?void 0:U.docs,source:{originalSource:`() => {
  const containerId = 'modal-interactive-' + Math.random().toString(36).substr(2, 9);
  const markup = \`
    <div id="\${containerId}">
      <button class="btn btn-primary" data-action="open-modal">
        <i class="bx bx-plus me-1"></i> Open Modal
      </button>
      
      <!-- Modal -->
      <div class="modal fade" data-modal-element tabindex="-1" style="display: none;" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Interactive Modal</h5>
              <button type="button" class="btn-close" data-action="close-modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <p>This is an interactive modal demo. You can:</p>
              <ul>
                <li>Click the "Open Modal" button to open</li>
                <li>Click the X button to close</li>
                <li>Click the "Close" button to close</li>
                <li>Click outside the modal to close (backdrop is dismissible)</li>
              </ul>
              <div class="alert alert-primary mt-3" role="alert">
                <div class="alert-body">
                  <i class="bx bx-info-circle me-2"></i>
                  All interactions are handled via Storybook state without external scripts.
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-label-secondary" data-action="close-modal">Close</button>
              <button type="button" class="btn btn-primary">Save changes</button>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Backdrop -->
      <div class="modal-backdrop fade" data-modal-backdrop style="display: none;"></div>
    </div>
  \`;
  setTimeout(() => {
    const container = document.getElementById(containerId);
    if (!container) return;
    const openBtn = container.querySelector('[data-action="open-modal"]');
    const closeButtons = container.querySelectorAll('[data-action="close-modal"]');
    const modal = container.querySelector('[data-modal-element]');
    const backdrop = container.querySelector('[data-modal-backdrop]');
    const openModal = () => {
      modal.style.display = 'block';
      backdrop.style.display = 'block';
      setTimeout(() => {
        modal.classList.add('show');
        backdrop.classList.add('show');
        modal.setAttribute('aria-hidden', 'false');
      }, 10);
    };
    const closeModal = () => {
      modal.classList.remove('show');
      backdrop.classList.remove('show');
      modal.setAttribute('aria-hidden', 'true');
      setTimeout(() => {
        modal.style.display = 'none';
        backdrop.style.display = 'none';
      }, 300);
    };
    openBtn.addEventListener('click', openModal);
    closeButtons.forEach(btn => {
      btn.addEventListener('click', closeModal);
    });

    // Click outside to close (dismissible)
    backdrop.addEventListener('click', closeModal);

    // Keyboard support: Escape to close
    const handleKeydown = e => {
      if (e.key === 'Escape' && modal.classList.contains('show')) {
        closeModal();
      }
    };
    document.addEventListener('keydown', handleKeydown);

    // Cleanup
    container._cleanup = () => {
      document.removeEventListener('keydown', handleKeydown);
    };
  }, 100);
  return markup;
}`,...(X=(j=b.parameters)==null?void 0:j.docs)==null?void 0:X.source}}};var K,P,_,Y,Q;i.parameters={...i.parameters,docs:{...(K=i.parameters)==null?void 0:K.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: \`
### Modal com Bootstrap JS Real

Implementação oficial usando Bootstrap JS do Vuexy:

- ✅ **Open/Close** com animações suaves do Bootstrap
- ✅ **Backdrop** com blur e dismiss on click
- ✅ **Escape key** para fechar
- ✅ **Focus management** automático
- ✅ **Body scroll lock** quando modal aberto
- ✅ **Múltiplos tamanhos** (sm, default, lg, xl, fullscreen)
- ✅ **Stacked modals** suportado

**Comparação:** Esta story usa Bootstrap JS oficial vs a "Interactive" que usa JavaScript custom.

### Como testar:
1. Clique nos botões para abrir modals
2. Pressione Escape para fechar
3. Clique no backdrop para fechar
4. Teste os diferentes tamanhos
        \`
      }
    }
  },
  loaders: [async () => {
    if (typeof window !== 'undefined' && !window.bootstrap) {
      return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = '/vuexy/js/bootstrap.js';
        script.onload = () => {
          console.log('✅ Bootstrap JS carregado para Modal');
          resolve({
            bootstrapLoaded: true
          });
        };
        script.onerror = () => reject(new Error('Failed to load Bootstrap JS'));
        document.head.appendChild(script);
      });
    }
    return {
      bootstrapLoaded: true
    };
  }],
  render: () => {
    return \`
      <div style="padding: 30px;">
        <h5 class="mb-4">Modals com Bootstrap JS</h5>
        
        <!-- Trigger Buttons -->
        <div class="row g-3 mb-4">
          <div class="col-md-4">
            <button type="button" class="btn btn-primary w-100" data-bs-toggle="modal" data-bs-target="#modalBasic">
              <i class="ti ti-square me-1"></i> Default Modal
            </button>
          </div>
          
          <div class="col-md-4">
            <button type="button" class="btn btn-success w-100" data-bs-toggle="modal" data-bs-target="#modalLarge">
              <i class="ti ti-square me-1"></i> Large Modal
            </button>
          </div>
          
          <div class="col-md-4">
            <button type="button" class="btn btn-warning w-100" data-bs-toggle="modal" data-bs-target="#modalSmall">
              <i class="ti ti-square me-1"></i> Small Modal
            </button>
          </div>
          
          <div class="col-md-4">
            <button type="button" class="btn btn-info w-100" data-bs-toggle="modal" data-bs-target="#modalCentered">
              <i class="ti ti-align-center me-1"></i> Centered
            </button>
          </div>
          
          <div class="col-md-4">
            <button type="button" class="btn btn-danger w-100" data-bs-toggle="modal" data-bs-target="#modalScrollable">
              <i class="ti ti-scroll me-1"></i> Scrollable
            </button>
          </div>
          
          <div class="col-md-4">
            <button type="button" class="btn btn-dark w-100" data-bs-toggle="modal" data-bs-target="#modalFullscreen">
              <i class="ti ti-maximize me-1"></i> Fullscreen
            </button>
          </div>
        </div>
        
        <!-- Modal 1: Basic -->
        <div class="modal fade" id="modalBasic" tabindex="-1" aria-labelledby="modalBasicLabel" aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="modalBasicLabel">Default Modal</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                <p>Este é um modal padrão do Bootstrap. Ele tem largura de 500px e pode conter qualquer conteúdo.</p>
                <p class="mb-0">Você pode fechá-lo clicando no X, no backdrop, ou pressionando Escape.</p>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-label-secondary" data-bs-dismiss="modal">Cancelar</button>
                <button type="button" class="btn btn-primary">Confirmar</button>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Modal 2: Large -->
        <div class="modal fade" id="modalLarge" tabindex="-1" aria-labelledby="modalLargeLabel" aria-hidden="true">
          <div class="modal-dialog modal-lg">
            <div class="modal-content">
              <div class="modal-header bg-success text-white">
                <h5 class="modal-title" id="modalLargeLabel">Large Modal (800px)</h5>
                <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                <div class="row">
                  <div class="col-md-6">
                    <h6>Coluna 1</h6>
                    <p>Modals largos são perfeitos para formulários complexos ou conteúdo que precisa de mais espaço horizontal.</p>
                    <ul>
                      <li>Largura: 800px</li>
                      <li>Classe: .modal-lg</li>
                      <li>Ideal para formulários</li>
                    </ul>
                  </div>
                  <div class="col-md-6">
                    <h6>Coluna 2</h6>
                    <p>Você pode usar o grid do Bootstrap dentro dos modals para criar layouts complexos.</p>
                    <div class="alert alert-info mb-0">
                      <strong>Dica:</strong> Use .modal-xl para 1140px
                    </div>
                  </div>
                </div>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">Fechar</button>
                <button type="button" class="btn btn-success">Salvar</button>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Modal 3: Small -->
        <div class="modal fade" id="modalSmall" tabindex="-1" aria-labelledby="modalSmallLabel" aria-hidden="true">
          <div class="modal-dialog modal-sm">
            <div class="modal-content">
              <div class="modal-header bg-warning">
                <h5 class="modal-title" id="modalSmallLabel">Small Modal</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                <p class="mb-2"><strong>Confirmar ação?</strong></p>
                <p class="mb-0 text-muted">Modals pequenos (300px) são ideais para confirmações simples.</p>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-sm btn-label-secondary" data-bs-dismiss="modal">Não</button>
                <button type="button" class="btn btn-sm btn-warning">Sim</button>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Modal 4: Centered -->
        <div class="modal fade" id="modalCentered" tabindex="-1" aria-labelledby="modalCenteredLabel" aria-hidden="true">
          <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
              <div class="modal-header bg-info text-white">
                <h5 class="modal-title" id="modalCenteredLabel">Vertically Centered</h5>
                <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body text-center py-4">
                <i class="ti ti-info-circle" style="font-size: 48px; color: var(--bs-info);"></i>
                <h6 class="mt-3">Modal Centralizado</h6>
                <p class="mb-0">Este modal está centralizado verticalmente na tela usando .modal-dialog-centered</p>
              </div>
              <div class="modal-footer justify-content-center">
                <button type="button" class="btn btn-info" data-bs-dismiss="modal">Entendi</button>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Modal 5: Scrollable -->
        <div class="modal fade" id="modalScrollable" tabindex="-1" aria-labelledby="modalScrollableLabel" aria-hidden="true">
          <div class="modal-dialog modal-dialog-scrollable">
            <div class="modal-content">
              <div class="modal-header bg-danger text-white">
                <h5 class="modal-title" id="modalScrollableLabel">Scrollable Modal</h5>
                <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                <p>Este modal tem conteúdo scrollável quando o conteúdo excede a altura máxima.</p>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
                <p>Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.</p>
                <p>Totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>
                <p class="mb-0">Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.</p>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Fechar</button>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Modal 6: Fullscreen -->
        <div class="modal fade" id="modalFullscreen" tabindex="-1" aria-labelledby="modalFullscreenLabel" aria-hidden="true">
          <div class="modal-dialog modal-fullscreen">
            <div class="modal-content">
              <div class="modal-header bg-dark text-white">
                <h5 class="modal-title" id="modalFullscreenLabel">Fullscreen Modal</h5>
                <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                <div class="container-fluid">
                  <div class="row">
                    <div class="col-12 text-center py-5">
                      <i class="ti ti-maximize" style="font-size: 64px;"></i>
                      <h3 class="mt-3">Modal Fullscreen</h3>
                      <p class="lead">Este modal ocupa toda a tela do navegador</p>
                      <p>Ideal para formulários complexos, editores, ou visualizações que precisam de máximo espaço.</p>
                      <div class="alert alert-dark mt-4">
                        <strong>Breakpoint variants:</strong>
                        <ul class="mb-0">
                          <li>.modal-fullscreen-sm-down - Fullscreen em telas < 576px</li>
                          <li>.modal-fullscreen-md-down - Fullscreen em telas < 768px</li>
                          <li>.modal-fullscreen-lg-down - Fullscreen em telas < 992px</li>
                          <li>.modal-fullscreen-xl-down - Fullscreen em telas < 1200px</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-dark" data-bs-dismiss="modal">Fechar Fullscreen</button>
              </div>
            </div>
          </div>
        </div>
        
        <div class="alert alert-info mt-4">
          <strong>💡 Teste a interatividade:</strong>
          <ul class="mb-0 mt-2">
            <li><strong>Abrir:</strong> Clique nos botões para abrir diferentes modals</li>
            <li><strong>Fechar:</strong> Use X, backdrop (click fora), ou Escape key</li>
            <li><strong>Focus:</strong> Note como o foco vai automaticamente para o modal</li>
            <li><strong>Scroll:</strong> O body da página trava quando modal está aberto</li>
            <li><strong>Tamanhos:</strong> Teste todos os 6 tipos de modals</li>
          </ul>
        </div>
      </div>
    \`;
  }
}`,...(_=(P=i.parameters)==null?void 0:P.docs)==null?void 0:_.source},description:{story:`====================================
INTERACTIVE BOOTSTRAP - Bootstrap JS Real
====================================`,...(Q=(Y=i.parameters)==null?void 0:Y.docs)==null?void 0:Q.description}}};const oa=["Overview","Closed","Open","OpenLarge","Centered","Scrollable","NoFooter","Interactive","InteractiveBootstrap"];export{m as Centered,s as Closed,b as Interactive,i as InteractiveBootstrap,u as NoFooter,l as Open,c as OpenLarge,y as Overview,p as Scrollable,oa as __namedExportsOrder,ta as default};
