const Q={title:"Molecules/Forms/SearchField",tags:["autodocs"],argTypes:{placeholder:{control:"text",description:"Input placeholder text",table:{defaultValue:{summary:"Search..."}}},buttonLabel:{control:"text",description:"Button text",table:{defaultValue:{summary:"Search"}}},disabled:{control:"boolean",description:"Disabled state",table:{defaultValue:{summary:!1}}},size:{control:{type:"select"},options:["sm","md","lg"],description:"Component size",table:{defaultValue:{summary:"md"}}},value:{control:"text",description:"Input value",table:{defaultValue:{summary:""}}}},parameters:{docs:{description:{component:`
# SearchField

Campo de busca composto por Input + Ícone + Button usando input-group do Bootstrap/Vuexy.

## Composição (Atoms usados)
- **Input** (text)
- **Icon** (bx-search)
- **Button** (submit)

## Quando usar
- Barras de busca em headers
- Filtros de listagem
- Pesquisa em tabelas
- Formulários de busca

## Estados
- Default (vazio)
- With value (preenchido)
- Disabled
- Focus

## Variações
- Com botão de texto
- Com botão de ícone apenas
- Com dropdown de filtros (avançado)

## Acessibilidade
- Label visualmente oculto mas presente para screen readers
- Placeholder descritivo
- Button com texto ou aria-label
        `}}}},e=({placeholder:n="Search...",buttonLabel:a="Search",disabled:u=!1,size:m="md",value:N="",iconOnly:A=!1})=>`<div class="${["input-group",m==="md"?"":`input-group-${m}`].filter(Boolean).join(" ")}">
  <span class="input-group-text">
    <i class="bx bx-search"></i>
  </span>
  <input 
    type="text" 
    class="form-control" 
    placeholder="${n}"
    value="${N}"
    ${u?"disabled":""}
    aria-label="${n}"
  />
  <button 
    class="btn btn-primary" 
    type="button"
    ${u?"disabled":""}
  >
    ${A?'<i class="bx bx-search"></i>':a}
  </button>
</div>`,r={render:()=>`<div style="display: flex; flex-direction: column; gap: 1.5rem; padding: 2rem; max-width: 600px;">
      ${[{html:e({placeholder:"Default search"}),label:"Default"},{html:e({placeholder:"Small size",size:"sm"}),label:"Small"},{html:e({placeholder:"Large size",size:"lg"}),label:"Large"},{html:e({placeholder:"Icon button",iconOnly:!0}),label:"Icon Only"}].map(a=>`
        <div>
          ${a.html}
          <div style="margin-top: 0.5rem; font-size: 0.875rem; color: #6c757d;">
            ${a.label}
          </div>
        </div>
      `).join("")}
    </div>`,parameters:{docs:{source:{code:e({placeholder:"Search..."})},description:{story:"Visão geral das variações de tamanho e estilo do SearchField."}}}},t={args:{placeholder:"Search...",buttonLabel:"Search",disabled:!1,size:"md",value:""},render:n=>e(n),parameters:{docs:{source:{code:e({placeholder:"Search..."})},description:{story:"Campo de busca padrão com input, ícone e botão."}}}},s={args:{placeholder:"Search...",buttonLabel:"Search",value:"React components"},render:n=>e(n),parameters:{docs:{source:{code:e({placeholder:"Search...",value:"React components"})},description:{story:"Campo de busca com valor preenchido."}}}},o={args:{placeholder:"Search...",buttonLabel:"Search",disabled:!0},render:n=>e(n),parameters:{docs:{source:{code:e({placeholder:"Search...",disabled:!0})},description:{story:"Estado desabilitado - input e botão não interativos."}}}},l={render:()=>`
      <div style="display: flex; flex-direction: column; gap: 1rem; max-width: 600px;">
        ${e({size:"sm",placeholder:"Small search"})}
        ${e({size:"md",placeholder:"Medium search"})}
        ${e({size:"lg",placeholder:"Large search"})}
      </div>
    `,parameters:{docs:{source:{code:`<!-- Small -->
${e({size:"sm",placeholder:"Small"})}

<!-- Medium (default) -->
${e({size:"md",placeholder:"Medium"})}

<!-- Large -->
${e({size:"lg",placeholder:"Large"})}`},description:{story:"Três tamanhos disponíveis: sm, md (padrão) e lg."}}}},c={render:()=>e({placeholder:"Search...",iconOnly:!0}),parameters:{docs:{source:{code:`<div class="input-group">
  <span class="input-group-text">
    <i class="bx bx-search"></i>
  </span>
  <input 
    type="text" 
    class="form-control" 
    placeholder="Search..."
    aria-label="Search"
  />
  <button 
    class="btn btn-primary" 
    type="button"
    aria-label="Search"
  >
    <i class="bx bx-search"></i>
  </button>
</div>`},description:{story:"Variante com botão apenas de ícone (sem texto)."}}}},i={render:()=>`
      <nav class="navbar navbar-expand-lg bg-light">
        <div class="container-fluid">
          <a class="navbar-brand" href="#">Logo</a>
          <div class="d-flex ms-auto" style="width: 300px;">
            ${e({placeholder:"Search in navbar...",size:"sm",iconOnly:!0})}
          </div>
        </div>
      </nav>
    `,parameters:{docs:{description:{story:"Exemplo de uso em navbar - tamanho pequeno com botão de ícone."}}}},d={render:()=>`
      <div style="display: flex; flex-direction: column; gap: 2rem; padding: 2rem; max-width: 600px;">
        <div>
          <h4 style="margin-bottom: 1rem; font-size: 1rem; font-weight: 600;">Normal</h4>
          ${e({placeholder:"Type to search..."})}
        </div>
        
        <div>
          <h4 style="margin-bottom: 1rem; font-size: 1rem; font-weight: 600;">With Value</h4>
          ${e({placeholder:"Search...",value:"Current search query"})}
        </div>
        
        <div>
          <h4 style="margin-bottom: 1rem; font-size: 1rem; font-weight: 600;">Disabled</h4>
          ${e({placeholder:"Search...",disabled:!0})}
        </div>
        
        <div>
          <h4 style="margin-bottom: 1rem; font-size: 1rem; font-weight: 600;">Focused</h4>
          ${e({placeholder:"Search..."})}
          <p style="margin-top: 0.5rem; font-size: 0.875rem; color: #6c757d;">
            Click on input to see focus state
          </p>
        </div>
      </div>
    `,parameters:{docs:{description:{story:"Demonstração de todos os estados do componente."}}}},p={render:()=>`
      <div class="p-4" style="max-width: 600px;">
        <h5>Interactive Search Demo</h5>
        <p class="text-muted">Search with clear button</p>
        
        <div class="input-group">
          <span class="input-group-text">
            <i class="bx bx-search"></i>
          </span>
          <input 
            type="text" 
            class="form-control" 
            placeholder="Search items..." 
            id="searchInput"
          />
          <button class="btn btn-outline-secondary" id="clearBtn" style="display:none;" onclick="clearSearch()">
            <i class="bx bx-x"></i>
          </button>
          <button class="btn btn-primary" onclick="performSearch()">
            Search
          </button>
        </div>
        
        <div class="mt-3" id="results" style="display:none;">
          <div class="alert alert-info">
            <strong>Results for:</strong> <span id="query"></span>
          </div>
          <ul class="list-group" id="resultsList"></ul>
        </div>
        
        <script>
          const input = document.getElementById('searchInput');
          const clearBtn = document.getElementById('clearBtn');
          const results = document.getElementById('results');
          const query = document.getElementById('query');
          const resultsList = document.getElementById('resultsList');
          
          input.addEventListener('input', (e) => {
            clearBtn.style.display = e.target.value ? 'block' : 'none';
          });
          
          function performSearch() {
            const searchTerm = input.value;
            if (!searchTerm) return;
            
            query.textContent = searchTerm;
            results.style.display = 'block';
            
            const mockResults = [
              'Result 1 matching "' + searchTerm + '"',
              'Result 2 matching "' + searchTerm + '"',
              'Result 3 matching "' + searchTerm + '"'
            ];
            
            resultsList.innerHTML = mockResults.map(r => 
              '<li class="list-group-item">' + r + '</li>'
            ).join('');
          }
          
          function clearSearch() {
            input.value = '';
            clearBtn.style.display = 'none';
            results.style.display = 'none';
            input.focus();
          }
          
          input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') performSearch();
          });
        <\/script>
        
        <small class="d-block mt-3 text-muted">Interactive demo via controlled state</small>
      </div>
    `};var h,b,v;r.parameters={...r.parameters,docs:{...(h=r.parameters)==null?void 0:h.docs,source:{originalSource:`{
  render: () => {
    const variations = [{
      html: createSearchField({
        placeholder: 'Default search'
      }),
      label: 'Default'
    }, {
      html: createSearchField({
        placeholder: 'Small size',
        size: 'sm'
      }),
      label: 'Small'
    }, {
      html: createSearchField({
        placeholder: 'Large size',
        size: 'lg'
      }),
      label: 'Large'
    }, {
      html: createSearchField({
        placeholder: 'Icon button',
        iconOnly: true
      }),
      label: 'Icon Only'
    }];
    return \`<div style="display: flex; flex-direction: column; gap: 1.5rem; padding: 2rem; max-width: 600px;">
      \${variations.map(v => \`
        <div>
          \${v.html}
          <div style="margin-top: 0.5rem; font-size: 0.875rem; color: #6c757d;">
            \${v.label}
          </div>
        </div>
      \`).join('')}
    </div>\`;
  },
  parameters: {
    docs: {
      source: {
        code: createSearchField({
          placeholder: 'Search...'
        })
      },
      description: {
        story: 'Visão geral das variações de tamanho e estilo do SearchField.'
      }
    }
  }
}`,...(v=(b=r.parameters)==null?void 0:b.docs)==null?void 0:v.source}}};var y,g,S;t.parameters={...t.parameters,docs:{...(y=t.parameters)==null?void 0:y.docs,source:{originalSource:`{
  args: {
    placeholder: 'Search...',
    buttonLabel: 'Search',
    disabled: false,
    size: 'md',
    value: ''
  },
  render: args => createSearchField(args),
  parameters: {
    docs: {
      source: {
        code: createSearchField({
          placeholder: 'Search...'
        })
      },
      description: {
        story: 'Campo de busca padrão com input, ícone e botão.'
      }
    }
  }
}`,...(S=(g=t.parameters)==null?void 0:g.docs)==null?void 0:S.source}}};var x,f,z;s.parameters={...s.parameters,docs:{...(x=s.parameters)==null?void 0:x.docs,source:{originalSource:`{
  args: {
    placeholder: 'Search...',
    buttonLabel: 'Search',
    value: 'React components'
  },
  render: args => createSearchField(args),
  parameters: {
    docs: {
      source: {
        code: createSearchField({
          placeholder: 'Search...',
          value: 'React components'
        })
      },
      description: {
        story: 'Campo de busca com valor preenchido.'
      }
    }
  }
}`,...(z=(f=s.parameters)==null?void 0:f.docs)==null?void 0:z.source}}};var E,F,$;o.parameters={...o.parameters,docs:{...(E=o.parameters)==null?void 0:E.docs,source:{originalSource:`{
  args: {
    placeholder: 'Search...',
    buttonLabel: 'Search',
    disabled: true
  },
  render: args => createSearchField(args),
  parameters: {
    docs: {
      source: {
        code: createSearchField({
          placeholder: 'Search...',
          disabled: true
        })
      },
      description: {
        story: 'Estado desabilitado - input e botão não interativos.'
      }
    }
  }
}`,...($=(F=o.parameters)==null?void 0:F.docs)==null?void 0:$.source}}};var L,I,B;l.parameters={...l.parameters,docs:{...(L=l.parameters)==null?void 0:L.docs,source:{originalSource:`{
  render: () => {
    return \`
      <div style="display: flex; flex-direction: column; gap: 1rem; max-width: 600px;">
        \${createSearchField({
      size: 'sm',
      placeholder: 'Small search'
    })}
        \${createSearchField({
      size: 'md',
      placeholder: 'Medium search'
    })}
        \${createSearchField({
      size: 'lg',
      placeholder: 'Large search'
    })}
      </div>
    \`;
  },
  parameters: {
    docs: {
      source: {
        code: \`<!-- Small -->
\${createSearchField({
          size: 'sm',
          placeholder: 'Small'
        })}

<!-- Medium (default) -->
\${createSearchField({
          size: 'md',
          placeholder: 'Medium'
        })}

<!-- Large -->
\${createSearchField({
          size: 'lg',
          placeholder: 'Large'
        })}\`
      },
      description: {
        story: 'Três tamanhos disponíveis: sm, md (padrão) e lg.'
      }
    }
  }
}`,...(B=(I=l.parameters)==null?void 0:I.docs)==null?void 0:B.source}}};var w,D,C;c.parameters={...c.parameters,docs:{...(w=c.parameters)==null?void 0:w.docs,source:{originalSource:`{
  render: () => createSearchField({
    placeholder: 'Search...',
    iconOnly: true
  }),
  parameters: {
    docs: {
      source: {
        code: \`<div class="input-group">
  <span class="input-group-text">
    <i class="bx bx-search"></i>
  </span>
  <input 
    type="text" 
    class="form-control" 
    placeholder="Search..."
    aria-label="Search"
  />
  <button 
    class="btn btn-primary" 
    type="button"
    aria-label="Search"
  >
    <i class="bx bx-search"></i>
  </button>
</div>\`
      },
      description: {
        story: 'Variante com botão apenas de ícone (sem texto).'
      }
    }
  }
}`,...(C=(D=c.parameters)==null?void 0:D.docs)==null?void 0:C.source}}};var k,T,R;i.parameters={...i.parameters,docs:{...(k=i.parameters)==null?void 0:k.docs,source:{originalSource:`{
  render: () => {
    return \`
      <nav class="navbar navbar-expand-lg bg-light">
        <div class="container-fluid">
          <a class="navbar-brand" href="#">Logo</a>
          <div class="d-flex ms-auto" style="width: 300px;">
            \${createSearchField({
      placeholder: 'Search in navbar...',
      size: 'sm',
      iconOnly: true
    })}
          </div>
        </div>
      </nav>
    \`;
  },
  parameters: {
    docs: {
      description: {
        story: 'Exemplo de uso em navbar - tamanho pequeno com botão de ícone.'
      }
    }
  }
}`,...(R=(T=i.parameters)==null?void 0:T.docs)==null?void 0:R.source}}};var V,q,O;d.parameters={...d.parameters,docs:{...(V=d.parameters)==null?void 0:V.docs,source:{originalSource:`{
  render: () => {
    return \`
      <div style="display: flex; flex-direction: column; gap: 2rem; padding: 2rem; max-width: 600px;">
        <div>
          <h4 style="margin-bottom: 1rem; font-size: 1rem; font-weight: 600;">Normal</h4>
          \${createSearchField({
      placeholder: 'Type to search...'
    })}
        </div>
        
        <div>
          <h4 style="margin-bottom: 1rem; font-size: 1rem; font-weight: 600;">With Value</h4>
          \${createSearchField({
      placeholder: 'Search...',
      value: 'Current search query'
    })}
        </div>
        
        <div>
          <h4 style="margin-bottom: 1rem; font-size: 1rem; font-weight: 600;">Disabled</h4>
          \${createSearchField({
      placeholder: 'Search...',
      disabled: true
    })}
        </div>
        
        <div>
          <h4 style="margin-bottom: 1rem; font-size: 1rem; font-weight: 600;">Focused</h4>
          \${createSearchField({
      placeholder: 'Search...'
    })}
          <p style="margin-top: 0.5rem; font-size: 0.875rem; color: #6c757d;">
            Click on input to see focus state
          </p>
        </div>
      </div>
    \`;
  },
  parameters: {
    docs: {
      description: {
        story: 'Demonstração de todos os estados do componente.'
      }
    }
  }
}`,...(O=(q=d.parameters)==null?void 0:q.docs)==null?void 0:O.source}}};var M,j,W;p.parameters={...p.parameters,docs:{...(M=p.parameters)==null?void 0:M.docs,source:{originalSource:`{
  render: () => {
    return \`
      <div class="p-4" style="max-width: 600px;">
        <h5>Interactive Search Demo</h5>
        <p class="text-muted">Search with clear button</p>
        
        <div class="input-group">
          <span class="input-group-text">
            <i class="bx bx-search"></i>
          </span>
          <input 
            type="text" 
            class="form-control" 
            placeholder="Search items..." 
            id="searchInput"
          />
          <button class="btn btn-outline-secondary" id="clearBtn" style="display:none;" onclick="clearSearch()">
            <i class="bx bx-x"></i>
          </button>
          <button class="btn btn-primary" onclick="performSearch()">
            Search
          </button>
        </div>
        
        <div class="mt-3" id="results" style="display:none;">
          <div class="alert alert-info">
            <strong>Results for:</strong> <span id="query"></span>
          </div>
          <ul class="list-group" id="resultsList"></ul>
        </div>
        
        <script>
          const input = document.getElementById('searchInput');
          const clearBtn = document.getElementById('clearBtn');
          const results = document.getElementById('results');
          const query = document.getElementById('query');
          const resultsList = document.getElementById('resultsList');
          
          input.addEventListener('input', (e) => {
            clearBtn.style.display = e.target.value ? 'block' : 'none';
          });
          
          function performSearch() {
            const searchTerm = input.value;
            if (!searchTerm) return;
            
            query.textContent = searchTerm;
            results.style.display = 'block';
            
            const mockResults = [
              'Result 1 matching "' + searchTerm + '"',
              'Result 2 matching "' + searchTerm + '"',
              'Result 3 matching "' + searchTerm + '"'
            ];
            
            resultsList.innerHTML = mockResults.map(r => 
              '<li class="list-group-item">' + r + '</li>'
            ).join('');
          }
          
          function clearSearch() {
            input.value = '';
            clearBtn.style.display = 'none';
            results.style.display = 'none';
            input.focus();
          }
          
          input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') performSearch();
          });
        <\/script>
        
        <small class="d-block mt-3 text-muted">Interactive demo via controlled state</small>
      </div>
    \`;
  }
}`,...(W=(j=p.parameters)==null?void 0:j.docs)==null?void 0:W.source}}};const G=["Overview","Default","WithValue","Disabled","Sizes","IconOnlyButton","InNavbar","StatesDemo","Interactive"];export{t as Default,o as Disabled,c as IconOnlyButton,i as InNavbar,p as Interactive,r as Overview,l as Sizes,d as StatesDemo,s as WithValue,G as __namedExportsOrder,Q as default};
