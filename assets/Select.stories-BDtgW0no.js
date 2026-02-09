import{f as B,a as J}from"./snippets-m8t1HIl1.js";const V={title:"Vuexy/Atoms/Forms/Select",tags:["autodocs"],parameters:{docs:{description:{component:`
# Select Dropdown

Select dropdown estilizado do Vuexy para seleção de opções usando Bootstrap 5.

## Quando usar
- Seleção única entre múltiplas opções
- Filtros e formulários
- Configurações com opções predefinidas

## Variantes
- **Tamanhos**: sm (pequeno), default, lg (grande)
- **Tipos**: single, multiple
- **Estados**: default, disabled, valid, invalid

## Acessibilidade
- Sempre associe com \`<label>\`
- Use \`disabled\` para desabilitar
- Primeira opção como placeholder
        `}}},argTypes:{size:{control:"select",options:["sm","default","lg"],description:"Tamanho do select",table:{defaultValue:{summary:"default"}}},disabled:{control:"boolean",description:"Estado desabilitado",table:{defaultValue:{summary:!1}}},multiple:{control:"boolean",description:"Seleção múltipla",table:{defaultValue:{summary:!1}}},state:{control:"select",options:["default","valid","invalid"],description:"Estado de validação",table:{defaultValue:{summary:"default"}}}}},o=({size:a="default",disabled:t=!1,multiple:e=!1,state:s="default"})=>`<select 
  class="${["form-select",a==="sm"?"form-select-sm":a==="lg"?"form-select-lg":"",s==="valid"?"is-valid":s==="invalid"?"is-invalid":""].filter(Boolean).join(" ")}"
  ${t?"disabled":""}
  ${e?'multiple size="4"':""}
>
  <option ${e?"":"selected"}>Choose an option...</option>
  <option value="1">Option 1</option>
  <option value="2">Option 2</option>
  <option value="3">Option 3</option>
  ${e?'<option value="4">Option 4</option>':""}
</select>`,p=a=>{const t=o(a),e=a.state==="valid"?"Looks good!":a.state==="invalid"?"Please select a valid option.":"";return`
    <div style="max-width: 400px;">
      ${t}
      ${a.state!=="default"?`<div class="${a.state==="valid"?"valid":"invalid"}-feedback d-block">${e}</div>`:""}
    </div>
    
    <hr class="my-5" />
    
    <details>
      <summary><strong>Code Snippets</strong></summary>
      <div class="mt-3">
        <h6>HTML</h6>
        <pre><code>${B(t).replace(/</g,"&lt;").replace(/>/g,"&gt;")}</code></pre>
        <h6>React</h6>
        <pre><code>${J(t,"Select").replace(/</g,"&lt;").replace(/>/g,"&gt;")}</code></pre>
      </div>
    </details>
  `},d=()=>`
  <div class="row g-4">
    <div class="col-12">
      <h5>Tamanhos</h5>
      <div class="d-flex flex-column gap-3" style="max-width: 400px;">
        ${o({size:"sm"})}
        ${o({size:"default"})}
        ${o({size:"lg"})}
      </div>
    </div>
    <div class="col-12 mt-4">
      <h5>Estados</h5>
      <div class="d-flex flex-column gap-3" style="max-width: 400px;">
        ${o({})}
        ${o({disabled:!0})}
        ${o({state:"valid"})}
        ${o({state:"invalid"})}
      </div>
    </div>
    <div class="col-12 mt-4">
      <h5>Multiple Select</h5>
      <div style="max-width: 400px;">
        ${o({multiple:!0})}
      </div>
    </div>
  </div>
`,l=p.bind({});l.args={size:"default",disabled:!1,multiple:!1,state:"default"};const i=p.bind({});i.args={...l.args,size:"lg"};const r=p.bind({});r.args={...l.args,multiple:!0};const c=p.bind({});c.args={...l.args,disabled:!0};const n={parameters:{docs:{description:{story:`
### Select Avançado com Select2

Implementação oficial usando Select2 do Vuexy:

- ✅ **Search** - busca/filtro de opções
- ✅ **Multi-select** - seleção múltipla com tags
- ✅ **Tags Mode** - criar novas opções dinamicamente
- ✅ **Placeholder** - texto antes de selecionar
- ✅ **Clear** - botão X para limpar seleção
- ✅ **Disabled Options** - opções desabilitadas
- ✅ **Optgroups** - opções agrupadas
- ✅ **Templating** - customizar visual das opções

**Casos de uso:**
- Seleção com muitas opções (países, cidades)
- Multi-select (categorias, tags, permissões)
- Autocomplete/typeahead
- Formulários avançados

### Como testar:
1. Digite para buscar opções
2. Teste multi-select (várias opções, badges)
3. Tags mode (digite e pressione Enter)
4. Clear button (X para limpar)
        `}}},loaders:[async()=>typeof window<"u"?(window.jQuery||await new Promise((a,t)=>{const e=document.createElement("script");e.src="/vuexy/vendors/libs/jquery/jquery.js",e.onload=()=>{console.log("✅ jQuery carregado"),a()},e.onerror=()=>t(new Error("Failed to load jQuery")),document.head.appendChild(e)}),document.querySelector('link[href*="select2.css"]')?{select2Loaded:!0}:new Promise((a,t)=>{const e=document.createElement("link");e.rel="stylesheet",e.href="/vuexy/vendors/libs/select2/select2.css",e.onload=()=>{if(window.jQuery.fn.select2)a({select2Loaded:!0});else{const s=document.createElement("script");s.src="/vuexy/vendors/libs/select2/select2.js",s.onload=()=>{console.log("✅ Select2 CSS + JS carregados"),a({select2Loaded:!0})},s.onerror=()=>t(new Error("Failed to load Select2 JS")),document.head.appendChild(s)}},e.onerror=()=>t(new Error("Failed to load Select2 CSS")),document.head.appendChild(e)})):{}],render:()=>(setTimeout(()=>{if(window.jQuery&&window.jQuery.fn.select2){let t=function(e){if(!e.id)return e.text;const u={html:"ti-brand-html5",css:"ti-brand-css3",js:"ti-brand-javascript",react:"ti-brand-react",vue:"ti-brand-vue",angular:"ti-brand-angular"}[e.id]||"ti-code";return a('<span><i class="ti '+u+' me-2"></i>'+e.text+"</span>")};const a=window.jQuery;a("#select2-basic").select2({placeholder:"Selecione um país",allowClear:!0}),a("#select2-multi").select2({placeholder:"Selecione categorias",allowClear:!0}),a("#select2-tags").select2({placeholder:"Digite e pressione Enter",tags:!0,tokenSeparators:[","],allowClear:!0}),a("#select2-optgroup").select2({placeholder:"Selecione uma cidade",allowClear:!0}),a("#select2-disabled").select2({placeholder:"Algumas opções desabilitadas",allowClear:!0}),a("#select2-template").select2({placeholder:"Selecione tecnologias",allowClear:!0,templateResult:t,templateSelection:t}),a("#select2-ajax").select2({placeholder:"Digite para buscar usuário",allowClear:!0,minimumInputLength:1,ajax:{delay:250,transport:function(e,s,u){var g;const v=[{id:1,text:"João Silva",email:"joao@example.com"},{id:2,text:"Maria Santos",email:"maria@example.com"},{id:3,text:"Pedro Oliveira",email:"pedro@example.com"},{id:4,text:"Ana Costa",email:"ana@example.com"},{id:5,text:"Carlos Ferreira",email:"carlos@example.com"}],m=((g=e.data.term)==null?void 0:g.toLowerCase())||"",L=v.filter(x=>x.text.toLowerCase().includes(m)||x.email.toLowerCase().includes(m));setTimeout(()=>{s({results:L})},500)}},templateResult:function(e){return e.id?a("<div><div>"+e.text+'</div><small class="text-muted">'+e.email+"</small></div>"):e.text},templateSelection:function(e){return e.text}}),console.log("✅ Select2 inicializado em 7 variações")}},100),`
      <div style="padding: 30px;">
        <h5 class="mb-4">Select Avançado com Select2</h5>
        
        <div class="row g-4">
          <!-- 1. Basic with Search -->
          <div class="col-md-6">
            <div class="card">
              <div class="card-body">
                <h6 class="card-title">
                  <i class="ti tabler-search me-2 text-primary"></i>
                  Search/Filter
                </h6>
                <p class="text-muted small">Digite para filtrar opções</p>
                <label class="form-label">País</label>
                <select class="form-select" id="select2-basic" style="width: 100%;">
                  <option></option>
                  <option value="br">Brasil</option>
                  <option value="ar">Argentina</option>
                  <option value="cl">Chile</option>
                  <option value="co">Colômbia</option>
                  <option value="mx">México</option>
                  <option value="pe">Peru</option>
                  <option value="uy">Uruguai</option>
                  <option value="us">Estados Unidos</option>
                  <option value="ca">Canadá</option>
                  <option value="uk">Reino Unido</option>
                  <option value="de">Alemanha</option>
                  <option value="fr">França</option>
                  <option value="it">Itália</option>
                  <option value="es">Espanha</option>
                  <option value="pt">Portugal</option>
                </select>
                <small class="text-muted">12+ países - use busca</small>
              </div>
            </div>
          </div>

          <!-- 2. Multi-select -->
          <div class="col-md-6">
            <div class="card">
              <div class="card-body">
                <h6 class="card-title">
                  <i class="ti tabler-checkbox me-2 text-success"></i>
                  Multi-select
                </h6>
                <p class="text-muted small">Selecione múltiplas opções</p>
                <label class="form-label">Categorias</label>
                <select class="form-select" id="select2-multi" multiple style="width: 100%;">
                  <option value="tech">Tecnologia</option>
                  <option value="business">Negócios</option>
                  <option value="design">Design</option>
                  <option value="marketing">Marketing</option>
                  <option value="sales">Vendas</option>
                  <option value="support">Suporte</option>
                  <option value="finance">Financeiro</option>
                  <option value="hr">Recursos Humanos</option>
                </select>
                <small class="text-muted">Aparece como badges</small>
              </div>
            </div>
          </div>

          <!-- 3. Tags Mode -->
          <div class="col-md-6">
            <div class="card">
              <div class="card-body">
                <h6 class="card-title">
                  <i class="ti tabler-tag me-2 text-info"></i>
                  Tags Mode
                </h6>
                <p class="text-muted small">Crie novas opções dinamicamente</p>
                <label class="form-label">Habilidades</label>
                <select class="form-select" id="select2-tags" multiple style="width: 100%;">
                  <option value="JavaScript">JavaScript</option>
                  <option value="Python">Python</option>
                  <option value="Java">Java</option>
                  <option value="C#">C#</option>
                </select>
                <small class="text-muted">Digite qualquer skill e Enter</small>
              </div>
            </div>
          </div>

          <!-- 4. With Optgroups -->
          <div class="col-md-6">
            <div class="card">
              <div class="card-body">
                <h6 class="card-title">
                  <i class="ti tabler-folder me-2 text-warning"></i>
                  Com Grupos
                </h6>
                <p class="text-muted small">Opções organizadas em grupos</p>
                <label class="form-label">Cidade</label>
                <select class="form-select" id="select2-optgroup" style="width: 100%;">
                  <option></option>
                  <optgroup label="Sudeste">
                    <option value="sp">São Paulo</option>
                    <option value="rj">Rio de Janeiro</option>
                    <option value="mg">Belo Horizonte</option>
                    <option value="es">Vitória</option>
                  </optgroup>
                  <optgroup label="Sul">
                    <option value="pr">Curitiba</option>
                    <option value="sc">Florianópolis</option>
                    <option value="rs">Porto Alegre</option>
                  </optgroup>
                  <optgroup label="Nordeste">
                    <option value="ba">Salvador</option>
                    <option value="pe">Recife</option>
                    <option value="ce">Fortaleza</option>
                  </optgroup>
                </select>
                <small class="text-muted">Agrupadas por região</small>
              </div>
            </div>
          </div>

          <!-- 5. Disabled Options -->
          <div class="col-md-6">
            <div class="card">
              <div class="card-body">
                <h6 class="card-title">
                  <i class="ti tabler-lock me-2 text-danger"></i>
                  Opções Desabilitadas
                </h6>
                <p class="text-muted small">Algumas opções não podem ser selecionadas</p>
                <label class="form-label">Plano</label>
                <select class="form-select" id="select2-disabled" style="width: 100%;">
                  <option></option>
                  <option value="free">Free (Atual)</option>
                  <option value="basic" disabled>Basic (Em breve)</option>
                  <option value="pro">Pro</option>
                  <option value="enterprise" disabled>Enterprise (Contactar)</option>
                </select>
                <small class="text-muted">"Basic" e "Enterprise" desabilitados</small>
              </div>
            </div>
          </div>

          <!-- 6. Custom Template -->
          <div class="col-md-6">
            <div class="card">
              <div class="card-body">
                <h6 class="card-title">
                  <i class="ti tabler-palette me-2 text-purple"></i>
                  Template Customizado
                </h6>
                <p class="text-muted small">Opções com ícones</p>
                <label class="form-label">Tecnologia</label>
                <select class="form-select" id="select2-template" multiple style="width: 100%;">
                  <option value="html">HTML</option>
                  <option value="css">CSS</option>
                  <option value="js">JavaScript</option>
                  <option value="react">React</option>
                  <option value="vue">Vue.js</option>
                  <option value="angular">Angular</option>
                </select>
                <small class="text-muted">Cada opção com ícone próprio</small>
              </div>
            </div>
          </div>

          <!-- 7. Ajax (simulated) -->
          <div class="col-12">
            <div class="card border-primary">
              <div class="card-body">
                <h6 class="card-title">
                  <i class="ti tabler-cloud-search me-2 text-primary"></i>
                  Ajax Search (Simulado)
                </h6>
                <p class="text-muted">Busca usuários conforme você digita</p>
                <label class="form-label">Buscar Usuário</label>
                <select class="form-select" id="select2-ajax" style="width: 100%;">
                  <option></option>
                </select>
                <small class="text-muted">Digite nome ou email (João, Maria, Pedro, Ana, Carlos). Simula delay de 500ms.</small>
              </div>
            </div>
          </div>

          <!-- Use Case: Formulário de Permissões -->
          <div class="col-12">
            <div class="card bg-label-secondary">
              <div class="card-body">
                <h6 class="card-title">
                  <i class="ti tabler-forms me-2"></i>
                  Exemplo: Configuração de Permissões
                </h6>
                <div class="row g-3">
                  <div class="col-md-6">
                    <label class="form-label">Usuário</label>
                    <select class="form-select">
                      <option>João Silva (Admin)</option>
                      <option>Maria Santos (Editor)</option>
                      <option>Pedro Oliveira (Viewer)</option>
                    </select>
                  </div>
                  <div class="col-md-6">
                    <label class="form-label">Permissões</label>
                    <select class="form-select" multiple>
                      <option>Read</option>
                      <option>Write</option>
                      <option>Delete</option>
                      <option>Share</option>
                    </select>
                  </div>
                  <div class="col-12">
                    <button class="btn btn-primary">
                      <i class="ti tabler-check me-2"></i>
                      Salvar Permissões
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="alert alert-info mt-4">
          <strong>💡 Teste a interatividade:</strong>
          <ul class="mb-0 mt-2">
            <li><strong>Search:</strong> Digite no campo para filtrar opções (ex: "Bra" mostra Brasil)</li>
            <li><strong>Multi-select:</strong> Selecione várias, aparecem como badges, X para remover individual</li>
            <li><strong>Tags Mode:</strong> Digite texto livre, pressione Enter, vira tag (ex: "Ruby" + Enter)</li>
            <li><strong>Optgroups:</strong> Grupos aparecem como headers, opções indentadas</li>
            <li><strong>Disabled:</strong> Opções cinzas não são clicáveis</li>
            <li><strong>Template:</strong> Ícones aparecem tanto na lista quanto na seleção</li>
            <li><strong>Ajax:</strong> Espere 500ms após digitar, simula busca no servidor</li>
            <li><strong>Clear:</strong> Botão X no canto direito limpa seleção (allowClear: true)</li>
            <li><strong>Keyboard:</strong> Use setas ↑↓ para navegar, Enter para selecionar, Esc para fechar</li>
          </ul>
        </div>
      </div>
    `)};var b,h,f;d.parameters={...d.parameters,docs:{...(b=d.parameters)==null?void 0:b.docs,source:{originalSource:`() => \`
  <div class="row g-4">
    <div class="col-12">
      <h5>Tamanhos</h5>
      <div class="d-flex flex-column gap-3" style="max-width: 400px;">
        \${createSelect({
  size: 'sm'
})}
        \${createSelect({
  size: 'default'
})}
        \${createSelect({
  size: 'lg'
})}
      </div>
    </div>
    <div class="col-12 mt-4">
      <h5>Estados</h5>
      <div class="d-flex flex-column gap-3" style="max-width: 400px;">
        \${createSelect({})}
        \${createSelect({
  disabled: true
})}
        \${createSelect({
  state: 'valid'
})}
        \${createSelect({
  state: 'invalid'
})}
      </div>
    </div>
    <div class="col-12 mt-4">
      <h5>Multiple Select</h5>
      <div style="max-width: 400px;">
        \${createSelect({
  multiple: true
})}
      </div>
    </div>
  </div>
\``,...(f=(h=d.parameters)==null?void 0:h.docs)==null?void 0:f.source}}};var S,y,E;l.parameters={...l.parameters,docs:{...(S=l.parameters)==null?void 0:S.docs,source:{originalSource:`args => {
  const markup = createSelect(args);
  const feedbackMsg = args.state === 'valid' ? 'Looks good!' : args.state === 'invalid' ? 'Please select a valid option.' : '';
  return \`
    <div style="max-width: 400px;">
      \${markup}
      \${args.state !== 'default' ? \`<div class="\${args.state === 'valid' ? 'valid' : 'invalid'}-feedback d-block">\${feedbackMsg}</div>\` : ''}
    </div>
    
    <hr class="my-5" />
    
    <details>
      <summary><strong>Code Snippets</strong></summary>
      <div class="mt-3">
        <h6>HTML</h6>
        <pre><code>\${formatHtmlSnippet(markup).replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
        <h6>React</h6>
        <pre><code>\${formatReactSnippet(markup, 'Select').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
      </div>
    </details>
  \`;
}`,...(E=(y=l.parameters)==null?void 0:y.docs)==null?void 0:E.source}}};var w,C,k;i.parameters={...i.parameters,docs:{...(w=i.parameters)==null?void 0:w.docs,source:{originalSource:`args => {
  const markup = createSelect(args);
  const feedbackMsg = args.state === 'valid' ? 'Looks good!' : args.state === 'invalid' ? 'Please select a valid option.' : '';
  return \`
    <div style="max-width: 400px;">
      \${markup}
      \${args.state !== 'default' ? \`<div class="\${args.state === 'valid' ? 'valid' : 'invalid'}-feedback d-block">\${feedbackMsg}</div>\` : ''}
    </div>
    
    <hr class="my-5" />
    
    <details>
      <summary><strong>Code Snippets</strong></summary>
      <div class="mt-3">
        <h6>HTML</h6>
        <pre><code>\${formatHtmlSnippet(markup).replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
        <h6>React</h6>
        <pre><code>\${formatReactSnippet(markup, 'Select').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
      </div>
    </details>
  \`;
}`,...(k=(C=i.parameters)==null?void 0:C.docs)==null?void 0:k.source}}};var $,F,j;r.parameters={...r.parameters,docs:{...($=r.parameters)==null?void 0:$.docs,source:{originalSource:`args => {
  const markup = createSelect(args);
  const feedbackMsg = args.state === 'valid' ? 'Looks good!' : args.state === 'invalid' ? 'Please select a valid option.' : '';
  return \`
    <div style="max-width: 400px;">
      \${markup}
      \${args.state !== 'default' ? \`<div class="\${args.state === 'valid' ? 'valid' : 'invalid'}-feedback d-block">\${feedbackMsg}</div>\` : ''}
    </div>
    
    <hr class="my-5" />
    
    <details>
      <summary><strong>Code Snippets</strong></summary>
      <div class="mt-3">
        <h6>HTML</h6>
        <pre><code>\${formatHtmlSnippet(markup).replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
        <h6>React</h6>
        <pre><code>\${formatReactSnippet(markup, 'Select').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
      </div>
    </details>
  \`;
}`,...(j=(F=r.parameters)==null?void 0:F.docs)==null?void 0:j.source}}};var M,T,A;c.parameters={...c.parameters,docs:{...(M=c.parameters)==null?void 0:M.docs,source:{originalSource:`args => {
  const markup = createSelect(args);
  const feedbackMsg = args.state === 'valid' ? 'Looks good!' : args.state === 'invalid' ? 'Please select a valid option.' : '';
  return \`
    <div style="max-width: 400px;">
      \${markup}
      \${args.state !== 'default' ? \`<div class="\${args.state === 'valid' ? 'valid' : 'invalid'}-feedback d-block">\${feedbackMsg}</div>\` : ''}
    </div>
    
    <hr class="my-5" />
    
    <details>
      <summary><strong>Code Snippets</strong></summary>
      <div class="mt-3">
        <h6>HTML</h6>
        <pre><code>\${formatHtmlSnippet(markup).replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
        <h6>React</h6>
        <pre><code>\${formatReactSnippet(markup, 'Select').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
      </div>
    </details>
  \`;
}`,...(A=(T=c.parameters)==null?void 0:T.docs)==null?void 0:A.source}}};var D,P,O,R,z;n.parameters={...n.parameters,docs:{...(D=n.parameters)==null?void 0:D.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: \`
### Select Avançado com Select2

Implementação oficial usando Select2 do Vuexy:

- ✅ **Search** - busca/filtro de opções
- ✅ **Multi-select** - seleção múltipla com tags
- ✅ **Tags Mode** - criar novas opções dinamicamente
- ✅ **Placeholder** - texto antes de selecionar
- ✅ **Clear** - botão X para limpar seleção
- ✅ **Disabled Options** - opções desabilitadas
- ✅ **Optgroups** - opções agrupadas
- ✅ **Templating** - customizar visual das opções

**Casos de uso:**
- Seleção com muitas opções (países, cidades)
- Multi-select (categorias, tags, permissões)
- Autocomplete/typeahead
- Formulários avançados

### Como testar:
1. Digite para buscar opções
2. Teste multi-select (várias opções, badges)
3. Tags mode (digite e pressione Enter)
4. Clear button (X para limpar)
        \`
      }
    }
  },
  loaders: [async () => {
    if (typeof window !== 'undefined') {
      // Load jQuery first (Select2 depends on it)
      if (!window.jQuery) {
        await new Promise((resolve, reject) => {
          const script = document.createElement('script');
          script.src = '/vuexy/vendors/libs/jquery/jquery.js';
          script.onload = () => {
            console.log('✅ jQuery carregado');
            resolve();
          };
          script.onerror = () => reject(new Error('Failed to load jQuery'));
          document.head.appendChild(script);
        });
      }

      // Load CSS
      if (!document.querySelector('link[href*="select2.css"]')) {
        return new Promise((resolve, reject) => {
          const link = document.createElement('link');
          link.rel = 'stylesheet';
          link.href = '/vuexy/vendors/libs/select2/select2.css';
          link.onload = () => {
            // Load JS after CSS
            if (!window.jQuery.fn.select2) {
              const script = document.createElement('script');
              script.src = '/vuexy/vendors/libs/select2/select2.js';
              script.onload = () => {
                console.log('✅ Select2 CSS + JS carregados');
                resolve({
                  select2Loaded: true
                });
              };
              script.onerror = () => reject(new Error('Failed to load Select2 JS'));
              document.head.appendChild(script);
            } else {
              resolve({
                select2Loaded: true
              });
            }
          };
          link.onerror = () => reject(new Error('Failed to load Select2 CSS'));
          document.head.appendChild(link);
        });
      }
      return {
        select2Loaded: true
      };
    }
    return {};
  }],
  render: () => {
    // Initialize Select2 after render
    setTimeout(() => {
      if (window.jQuery && window.jQuery.fn.select2) {
        const $ = window.jQuery;

        // 1. Basic with Search
        $('#select2-basic').select2({
          placeholder: 'Selecione um país',
          allowClear: true
        });

        // 2. Multi-select
        $('#select2-multi').select2({
          placeholder: 'Selecione categorias',
          allowClear: true
        });

        // 3. Tags Mode
        $('#select2-tags').select2({
          placeholder: 'Digite e pressione Enter',
          tags: true,
          tokenSeparators: [','],
          allowClear: true
        });

        // 4. With Optgroups
        $('#select2-optgroup').select2({
          placeholder: 'Selecione uma cidade',
          allowClear: true
        });

        // 5. Disabled Options
        $('#select2-disabled').select2({
          placeholder: 'Algumas opções desabilitadas',
          allowClear: true
        });

        // 6. Templating (icons)
        function formatState(state) {
          if (!state.id) return state.text;
          const icons = {
            'html': 'ti-brand-html5',
            'css': 'ti-brand-css3',
            'js': 'ti-brand-javascript',
            'react': 'ti-brand-react',
            'vue': 'ti-brand-vue',
            'angular': 'ti-brand-angular'
          };
          const icon = icons[state.id] || 'ti-code';
          return $('<span><i class="ti ' + icon + ' me-2"></i>' + state.text + '</span>');
        }
        $('#select2-template').select2({
          placeholder: 'Selecione tecnologias',
          allowClear: true,
          templateResult: formatState,
          templateSelection: formatState
        });

        // 7. Ajax (simulated - static data)
        $('#select2-ajax').select2({
          placeholder: 'Digite para buscar usuário',
          allowClear: true,
          minimumInputLength: 1,
          ajax: {
            delay: 250,
            transport: function (params, success, failure) {
              // Simulated data
              const users = [{
                id: 1,
                text: 'João Silva',
                email: 'joao@example.com'
              }, {
                id: 2,
                text: 'Maria Santos',
                email: 'maria@example.com'
              }, {
                id: 3,
                text: 'Pedro Oliveira',
                email: 'pedro@example.com'
              }, {
                id: 4,
                text: 'Ana Costa',
                email: 'ana@example.com'
              }, {
                id: 5,
                text: 'Carlos Ferreira',
                email: 'carlos@example.com'
              }];
              const term = params.data.term?.toLowerCase() || '';
              const filtered = users.filter(u => u.text.toLowerCase().includes(term) || u.email.toLowerCase().includes(term));
              setTimeout(() => {
                success({
                  results: filtered
                });
              }, 500);
            }
          },
          templateResult: function (user) {
            if (!user.id) return user.text;
            return $('<div><div>' + user.text + '</div><small class="text-muted">' + user.email + '</small></div>');
          },
          templateSelection: function (user) {
            return user.text;
          }
        });
        console.log('✅ Select2 inicializado em 7 variações');
      }
    }, 100);
    return \`
      <div style="padding: 30px;">
        <h5 class="mb-4">Select Avançado com Select2</h5>
        
        <div class="row g-4">
          <!-- 1. Basic with Search -->
          <div class="col-md-6">
            <div class="card">
              <div class="card-body">
                <h6 class="card-title">
                  <i class="ti tabler-search me-2 text-primary"></i>
                  Search/Filter
                </h6>
                <p class="text-muted small">Digite para filtrar opções</p>
                <label class="form-label">País</label>
                <select class="form-select" id="select2-basic" style="width: 100%;">
                  <option></option>
                  <option value="br">Brasil</option>
                  <option value="ar">Argentina</option>
                  <option value="cl">Chile</option>
                  <option value="co">Colômbia</option>
                  <option value="mx">México</option>
                  <option value="pe">Peru</option>
                  <option value="uy">Uruguai</option>
                  <option value="us">Estados Unidos</option>
                  <option value="ca">Canadá</option>
                  <option value="uk">Reino Unido</option>
                  <option value="de">Alemanha</option>
                  <option value="fr">França</option>
                  <option value="it">Itália</option>
                  <option value="es">Espanha</option>
                  <option value="pt">Portugal</option>
                </select>
                <small class="text-muted">12+ países - use busca</small>
              </div>
            </div>
          </div>

          <!-- 2. Multi-select -->
          <div class="col-md-6">
            <div class="card">
              <div class="card-body">
                <h6 class="card-title">
                  <i class="ti tabler-checkbox me-2 text-success"></i>
                  Multi-select
                </h6>
                <p class="text-muted small">Selecione múltiplas opções</p>
                <label class="form-label">Categorias</label>
                <select class="form-select" id="select2-multi" multiple style="width: 100%;">
                  <option value="tech">Tecnologia</option>
                  <option value="business">Negócios</option>
                  <option value="design">Design</option>
                  <option value="marketing">Marketing</option>
                  <option value="sales">Vendas</option>
                  <option value="support">Suporte</option>
                  <option value="finance">Financeiro</option>
                  <option value="hr">Recursos Humanos</option>
                </select>
                <small class="text-muted">Aparece como badges</small>
              </div>
            </div>
          </div>

          <!-- 3. Tags Mode -->
          <div class="col-md-6">
            <div class="card">
              <div class="card-body">
                <h6 class="card-title">
                  <i class="ti tabler-tag me-2 text-info"></i>
                  Tags Mode
                </h6>
                <p class="text-muted small">Crie novas opções dinamicamente</p>
                <label class="form-label">Habilidades</label>
                <select class="form-select" id="select2-tags" multiple style="width: 100%;">
                  <option value="JavaScript">JavaScript</option>
                  <option value="Python">Python</option>
                  <option value="Java">Java</option>
                  <option value="C#">C#</option>
                </select>
                <small class="text-muted">Digite qualquer skill e Enter</small>
              </div>
            </div>
          </div>

          <!-- 4. With Optgroups -->
          <div class="col-md-6">
            <div class="card">
              <div class="card-body">
                <h6 class="card-title">
                  <i class="ti tabler-folder me-2 text-warning"></i>
                  Com Grupos
                </h6>
                <p class="text-muted small">Opções organizadas em grupos</p>
                <label class="form-label">Cidade</label>
                <select class="form-select" id="select2-optgroup" style="width: 100%;">
                  <option></option>
                  <optgroup label="Sudeste">
                    <option value="sp">São Paulo</option>
                    <option value="rj">Rio de Janeiro</option>
                    <option value="mg">Belo Horizonte</option>
                    <option value="es">Vitória</option>
                  </optgroup>
                  <optgroup label="Sul">
                    <option value="pr">Curitiba</option>
                    <option value="sc">Florianópolis</option>
                    <option value="rs">Porto Alegre</option>
                  </optgroup>
                  <optgroup label="Nordeste">
                    <option value="ba">Salvador</option>
                    <option value="pe">Recife</option>
                    <option value="ce">Fortaleza</option>
                  </optgroup>
                </select>
                <small class="text-muted">Agrupadas por região</small>
              </div>
            </div>
          </div>

          <!-- 5. Disabled Options -->
          <div class="col-md-6">
            <div class="card">
              <div class="card-body">
                <h6 class="card-title">
                  <i class="ti tabler-lock me-2 text-danger"></i>
                  Opções Desabilitadas
                </h6>
                <p class="text-muted small">Algumas opções não podem ser selecionadas</p>
                <label class="form-label">Plano</label>
                <select class="form-select" id="select2-disabled" style="width: 100%;">
                  <option></option>
                  <option value="free">Free (Atual)</option>
                  <option value="basic" disabled>Basic (Em breve)</option>
                  <option value="pro">Pro</option>
                  <option value="enterprise" disabled>Enterprise (Contactar)</option>
                </select>
                <small class="text-muted">"Basic" e "Enterprise" desabilitados</small>
              </div>
            </div>
          </div>

          <!-- 6. Custom Template -->
          <div class="col-md-6">
            <div class="card">
              <div class="card-body">
                <h6 class="card-title">
                  <i class="ti tabler-palette me-2 text-purple"></i>
                  Template Customizado
                </h6>
                <p class="text-muted small">Opções com ícones</p>
                <label class="form-label">Tecnologia</label>
                <select class="form-select" id="select2-template" multiple style="width: 100%;">
                  <option value="html">HTML</option>
                  <option value="css">CSS</option>
                  <option value="js">JavaScript</option>
                  <option value="react">React</option>
                  <option value="vue">Vue.js</option>
                  <option value="angular">Angular</option>
                </select>
                <small class="text-muted">Cada opção com ícone próprio</small>
              </div>
            </div>
          </div>

          <!-- 7. Ajax (simulated) -->
          <div class="col-12">
            <div class="card border-primary">
              <div class="card-body">
                <h6 class="card-title">
                  <i class="ti tabler-cloud-search me-2 text-primary"></i>
                  Ajax Search (Simulado)
                </h6>
                <p class="text-muted">Busca usuários conforme você digita</p>
                <label class="form-label">Buscar Usuário</label>
                <select class="form-select" id="select2-ajax" style="width: 100%;">
                  <option></option>
                </select>
                <small class="text-muted">Digite nome ou email (João, Maria, Pedro, Ana, Carlos). Simula delay de 500ms.</small>
              </div>
            </div>
          </div>

          <!-- Use Case: Formulário de Permissões -->
          <div class="col-12">
            <div class="card bg-label-secondary">
              <div class="card-body">
                <h6 class="card-title">
                  <i class="ti tabler-forms me-2"></i>
                  Exemplo: Configuração de Permissões
                </h6>
                <div class="row g-3">
                  <div class="col-md-6">
                    <label class="form-label">Usuário</label>
                    <select class="form-select">
                      <option>João Silva (Admin)</option>
                      <option>Maria Santos (Editor)</option>
                      <option>Pedro Oliveira (Viewer)</option>
                    </select>
                  </div>
                  <div class="col-md-6">
                    <label class="form-label">Permissões</label>
                    <select class="form-select" multiple>
                      <option>Read</option>
                      <option>Write</option>
                      <option>Delete</option>
                      <option>Share</option>
                    </select>
                  </div>
                  <div class="col-12">
                    <button class="btn btn-primary">
                      <i class="ti tabler-check me-2"></i>
                      Salvar Permissões
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="alert alert-info mt-4">
          <strong>💡 Teste a interatividade:</strong>
          <ul class="mb-0 mt-2">
            <li><strong>Search:</strong> Digite no campo para filtrar opções (ex: "Bra" mostra Brasil)</li>
            <li><strong>Multi-select:</strong> Selecione várias, aparecem como badges, X para remover individual</li>
            <li><strong>Tags Mode:</strong> Digite texto livre, pressione Enter, vira tag (ex: "Ruby" + Enter)</li>
            <li><strong>Optgroups:</strong> Grupos aparecem como headers, opções indentadas</li>
            <li><strong>Disabled:</strong> Opções cinzas não são clicáveis</li>
            <li><strong>Template:</strong> Ícones aparecem tanto na lista quanto na seleção</li>
            <li><strong>Ajax:</strong> Espere 500ms após digitar, simula busca no servidor</li>
            <li><strong>Clear:</strong> Botão X no canto direito limpa seleção (allowClear: true)</li>
            <li><strong>Keyboard:</strong> Use setas ↑↓ para navegar, Enter para selecionar, Esc para fechar</li>
          </ul>
        </div>
      </div>
    \`;
  }
}`,...(O=(P=n.parameters)==null?void 0:P.docs)==null?void 0:O.source},description:{story:`====================================
INTERACTIVE STORY - Select2 Real
====================================`,...(z=(R=n.parameters)==null?void 0:R.docs)==null?void 0:z.description}}};const Q=["Overview","Default","Sizes","Multiple","Disabled","InteractiveSelect2"];export{l as Default,c as Disabled,n as InteractiveSelect2,r as Multiple,d as Overview,i as Sizes,Q as __namedExportsOrder,V as default};
