import{f as _,a as Q,d as G}from"./snippets-m8t1HIl1.js";const K={title:"Organisms/Data Display/Pagination",tags:["autodocs"],parameters:{docs:{description:{component:`
# Pagination

Sistema completo de paginação do Vuexy para navegação entre páginas de dados.

## Quando usar
- Tabelas com muitos registros
- Listas longas que precisam ser divididas
- Resultados de busca paginados

## Composição
- **Previous/Next** - Botões de navegação
- **Page Numbers** - Links para páginas específicas
- **Ellipsis** - Indicador (...) para páginas ocultas
- **Active State** - Página atual destacada

## Variantes
- Small: .pagination-sm
- Large: .pagination-lg
- Rounded: .pagination-rounded

## Acessibilidade
- \`role="navigation"\` no wrapper
- \`aria-label\` nos botões previous/next
- \`aria-current="page"\` na página ativa
- \`aria-disabled\` em botões desabilitados
        `}}},argTypes:{totalPages:{control:{type:"number",min:1,max:100},description:"Total de páginas",table:{defaultValue:{summary:10}}},currentPage:{control:{type:"number",min:1},description:"Página atual",table:{defaultValue:{summary:1}}},size:{control:"select",options:["sm","md","lg"],description:"Tamanho da paginação",table:{defaultValue:{summary:"md"}}},showFirstLast:{control:"boolean",description:"Mostra botões First/Last",table:{defaultValue:{summary:!0}}},maxVisible:{control:{type:"number",min:3,max:10},description:"Número máximo de páginas visíveis",table:{defaultValue:{summary:7}}}}},O=(t,a,r)=>{const i=[];if(a<=r)for(let e=1;e<=a;e++)i.push(e);else{const e=Math.floor(r/2);let n=Math.max(1,t-e),s=Math.min(a,t+e);t<=e&&(s=r),t>a-e&&(n=a-r+1),n>1&&(i.push(1),n>2&&i.push("..."));for(let l=n;l<=s;l++)i.push(l);s<a&&(s<a-1&&i.push("..."),i.push(a))}return i},p=({totalPages:t=10,currentPage:a=1,size:r="md",showFirstLast:i=!0,maxVisible:e=7})=>{const n=r!=="md"?`pagination-${r}`:"",s=O(a,t,e),l=i?`
    <li class="page-item ${a===1?"disabled":""}">
      <a class="page-link" href="#" aria-label="First">
        <i class="tf-icon bx bx-chevrons-left"></i>
      </a>
    </li>`:"",o=i?`
    <li class="page-item ${a===t?"disabled":""}">
      <a class="page-link" href="#" aria-label="Last">
        <i class="tf-icon bx bx-chevrons-right"></i>
      </a>
    </li>`:"",f=s.map(g=>{if(g==="...")return`
        <li class="page-item disabled">
          <span class="page-link">...</span>
        </li>`;const $=g===a;return`
      <li class="page-item ${$?"active":""}">
        <a class="page-link" href="#" ${$?'aria-current="page"':""}>${g}</a>
      </li>`}).join("");return`<nav aria-label="Page navigation">
  <ul class="pagination ${n}">
    ${l}
    
    <li class="page-item ${a===1?"disabled":""}">
      <a class="page-link" href="#" aria-label="Previous">
        <i class="tf-icon bx bx-chevron-left"></i>
      </a>
    </li>
    
    ${f}
    
    <li class="page-item ${a===t?"disabled":""}">
      <a class="page-link" href="#" aria-label="Next">
        <i class="tf-icon bx bx-chevron-right"></i>
      </a>
    </li>
    
    ${o}
  </ul>
</nav>`},b=t=>{const a=p(t);return`
    <div>
      ${a}
    </div>
    
    <div class="mt-4">
      <p class="text-muted mb-2"><strong>Info:</strong> Página ${t.currentPage} de ${t.totalPages}</p>
      <p class="text-muted"><small>Total de ${t.totalPages*10} items (10 por página)</small></p>
    </div>
    
    <hr class="my-5" />
    
    <details>
      <summary><strong>Code Snippets</strong></summary>
      <div class="mt-3">
        <h6>HTML</h6>
        <pre><code>${_(a).replace(/</g,"&lt;").replace(/>/g,"&gt;")}</code></pre>
        <h6>React</h6>
        <pre><code>${Q(a,"Pagination").replace(/</g,"&lt;").replace(/>/g,"&gt;")}</code></pre>
        <h6>Vue 3</h6>
        <pre><code>${G(a,"Pagination").replace(/</g,"&lt;").replace(/>/g,"&gt;")}</code></pre>
      </div>
    </details>
  `},x=()=>`
  <div class="row g-4">
    <div class="col-12">
      <h5>First Page</h5>
      ${p({currentPage:1,totalPages:10})}
    </div>
    
    <div class="col-12">
      <h5>Middle Page</h5>
      ${p({currentPage:5,totalPages:10})}
    </div>
    
    <div class="col-12">
      <h5>Last Page</h5>
      ${p({currentPage:10,totalPages:10})}
    </div>
    
    <div class="col-12 mt-5">
      <h5>Sizes</h5>
      <div class="mb-3">
        <small class="text-muted d-block mb-2">Small</small>
        ${p({currentPage:3,totalPages:8,size:"sm"})}
      </div>
      <div class="mb-3">
        <small class="text-muted d-block mb-2">Medium (Default)</small>
        ${p({currentPage:3,totalPages:8,size:"md"})}
      </div>
      <div>
        <small class="text-muted d-block mb-2">Large</small>
        ${p({currentPage:3,totalPages:8,size:"lg"})}
      </div>
    </div>
  </div>
`,c=b.bind({});c.args={totalPages:15,currentPage:1,size:"md",showFirstLast:!0,maxVisible:7};const m=b.bind({});m.args={...c.args,currentPage:8};const u=b.bind({});u.args={...c.args,currentPage:15};const v=b.bind({});v.args={...c.args,size:"sm",currentPage:5};const P=b.bind({});P.args={totalPages:100,currentPage:50,size:"md",showFirstLast:!0,maxVisible:7};const h=()=>{const t="pagination-interactive-"+Math.random().toString(36).substr(2,9),a=15,r=e=>{const n=O(e,a,7),s=n[0]>1,l=n[n.length-1]<a;return`
      <nav aria-label="Page navigation">
        <ul class="pagination" data-pagination>
          <!-- First -->
          <li class="page-item ${e===1?"disabled":""}" data-page="first">
            <a class="page-link" href="javascript:void(0)">
              <i class="tf-icon bx bx-chevrons-left"></i>
            </a>
          </li>
          
          <!-- Previous -->
          <li class="page-item ${e===1?"disabled":""}" data-page="prev">
            <a class="page-link" href="javascript:void(0)">
              <i class="tf-icon bx bx-chevron-left"></i>
            </a>
          </li>
          
          <!-- Ellipsis Start -->
          ${s?`
            <li class="page-item disabled">
              <span class="page-link">...</span>
            </li>`:""}
          
          <!-- Pages -->
          ${n.map(o=>`
            <li class="page-item ${o===e?"active":""}" data-page="${o}">
              <a class="page-link" href="javascript:void(0)">${o}</a>
            </li>`).join("")}
          
          <!-- Ellipsis End -->
          ${l?`
            <li class="page-item disabled">
              <span class="page-link">...</span>
            </li>`:""}
          
          <!-- Next -->
          <li class="page-item ${e===a?"disabled":""}" data-page="next">
            <a class="page-link" href="javascript:void(0)">
              <i class="tf-icon bx bx-chevron-right"></i>
            </a>
          </li>
          
          <!-- Last -->
          <li class="page-item ${e===a?"disabled":""}" data-page="last">
            <a class="page-link" href="javascript:void(0)">
              <i class="tf-icon bx bx-chevrons-right"></i>
            </a>
          </li>
        </ul>
      </nav>
      
      <div class="mt-3">
        <span class="badge bg-primary">Current Page: ${e} of ${a}</span>
      </div>
    `},i=`<div id="${t}">${r(1)}</div>`;return setTimeout(()=>{const e=document.getElementById(t);if(!e)return;let n=1;const s=o=>{o<1||o>a||(n=o,e.innerHTML=r(n),l())},l=()=>{e.querySelectorAll(".page-item:not(.disabled)").forEach(f=>{const g=f.querySelector(".page-link");g&&g.addEventListener("click",$=>{$.preventDefault();const d=f.getAttribute("data-page");s(d==="first"?1:d==="prev"?n-1:d==="next"?n+1:d==="last"?a:parseInt(d))})})};l()},100),`
    ${i}
    <div class="alert alert-info mt-3">
      <strong>Interactive demo:</strong> Click on page numbers or navigation buttons. First/Previous are disabled on page 1, Next/Last are disabled on page ${a}.
    </div>
  `};h.parameters={docs:{description:{story:"Interactive pagination demo with working page navigation and boundary limits."}}};var k,S,y;x.parameters={...x.parameters,docs:{...(k=x.parameters)==null?void 0:k.docs,source:{originalSource:`() => \`
  <div class="row g-4">
    <div class="col-12">
      <h5>First Page</h5>
      \${createPagination({
  currentPage: 1,
  totalPages: 10
})}
    </div>
    
    <div class="col-12">
      <h5>Middle Page</h5>
      \${createPagination({
  currentPage: 5,
  totalPages: 10
})}
    </div>
    
    <div class="col-12">
      <h5>Last Page</h5>
      \${createPagination({
  currentPage: 10,
  totalPages: 10
})}
    </div>
    
    <div class="col-12 mt-5">
      <h5>Sizes</h5>
      <div class="mb-3">
        <small class="text-muted d-block mb-2">Small</small>
        \${createPagination({
  currentPage: 3,
  totalPages: 8,
  size: 'sm'
})}
      </div>
      <div class="mb-3">
        <small class="text-muted d-block mb-2">Medium (Default)</small>
        \${createPagination({
  currentPage: 3,
  totalPages: 8,
  size: 'md'
})}
      </div>
      <div>
        <small class="text-muted d-block mb-2">Large</small>
        \${createPagination({
  currentPage: 3,
  totalPages: 8,
  size: 'lg'
})}
      </div>
    </div>
  </div>
\``,...(y=(S=x.parameters)==null?void 0:S.docs)==null?void 0:y.source}}};var E,L,M;c.parameters={...c.parameters,docs:{...(E=c.parameters)==null?void 0:E.docs,source:{originalSource:`args => {
  const markup = createPagination(args);
  return \`
    <div>
      \${markup}
    </div>
    
    <div class="mt-4">
      <p class="text-muted mb-2"><strong>Info:</strong> Página \${args.currentPage} de \${args.totalPages}</p>
      <p class="text-muted"><small>Total de \${args.totalPages * 10} items (10 por página)</small></p>
    </div>
    
    <hr class="my-5" />
    
    <details>
      <summary><strong>Code Snippets</strong></summary>
      <div class="mt-3">
        <h6>HTML</h6>
        <pre><code>\${formatHtmlSnippet(markup).replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
        <h6>React</h6>
        <pre><code>\${formatReactSnippet(markup, 'Pagination').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
        <h6>Vue 3</h6>
        <pre><code>\${formatVue3Snippet(markup, 'Pagination').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
      </div>
    </details>
  \`;
}`,...(M=(L=c.parameters)==null?void 0:L.docs)==null?void 0:M.source}}};var I,T,V;m.parameters={...m.parameters,docs:{...(I=m.parameters)==null?void 0:I.docs,source:{originalSource:`args => {
  const markup = createPagination(args);
  return \`
    <div>
      \${markup}
    </div>
    
    <div class="mt-4">
      <p class="text-muted mb-2"><strong>Info:</strong> Página \${args.currentPage} de \${args.totalPages}</p>
      <p class="text-muted"><small>Total de \${args.totalPages * 10} items (10 por página)</small></p>
    </div>
    
    <hr class="my-5" />
    
    <details>
      <summary><strong>Code Snippets</strong></summary>
      <div class="mt-3">
        <h6>HTML</h6>
        <pre><code>\${formatHtmlSnippet(markup).replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
        <h6>React</h6>
        <pre><code>\${formatReactSnippet(markup, 'Pagination').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
        <h6>Vue 3</h6>
        <pre><code>\${formatVue3Snippet(markup, 'Pagination').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
      </div>
    </details>
  \`;
}`,...(V=(T=m.parameters)==null?void 0:T.docs)==null?void 0:V.source}}};var w,z,A;u.parameters={...u.parameters,docs:{...(w=u.parameters)==null?void 0:w.docs,source:{originalSource:`args => {
  const markup = createPagination(args);
  return \`
    <div>
      \${markup}
    </div>
    
    <div class="mt-4">
      <p class="text-muted mb-2"><strong>Info:</strong> Página \${args.currentPage} de \${args.totalPages}</p>
      <p class="text-muted"><small>Total de \${args.totalPages * 10} items (10 por página)</small></p>
    </div>
    
    <hr class="my-5" />
    
    <details>
      <summary><strong>Code Snippets</strong></summary>
      <div class="mt-3">
        <h6>HTML</h6>
        <pre><code>\${formatHtmlSnippet(markup).replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
        <h6>React</h6>
        <pre><code>\${formatReactSnippet(markup, 'Pagination').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
        <h6>Vue 3</h6>
        <pre><code>\${formatVue3Snippet(markup, 'Pagination').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
      </div>
    </details>
  \`;
}`,...(A=(z=u.parameters)==null?void 0:z.docs)==null?void 0:A.source}}};var H,R,j;v.parameters={...v.parameters,docs:{...(H=v.parameters)==null?void 0:H.docs,source:{originalSource:`args => {
  const markup = createPagination(args);
  return \`
    <div>
      \${markup}
    </div>
    
    <div class="mt-4">
      <p class="text-muted mb-2"><strong>Info:</strong> Página \${args.currentPage} de \${args.totalPages}</p>
      <p class="text-muted"><small>Total de \${args.totalPages * 10} items (10 por página)</small></p>
    </div>
    
    <hr class="my-5" />
    
    <details>
      <summary><strong>Code Snippets</strong></summary>
      <div class="mt-3">
        <h6>HTML</h6>
        <pre><code>\${formatHtmlSnippet(markup).replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
        <h6>React</h6>
        <pre><code>\${formatReactSnippet(markup, 'Pagination').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
        <h6>Vue 3</h6>
        <pre><code>\${formatVue3Snippet(markup, 'Pagination').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
      </div>
    </details>
  \`;
}`,...(j=(R=v.parameters)==null?void 0:R.docs)==null?void 0:j.source}}};var C,F,N;P.parameters={...P.parameters,docs:{...(C=P.parameters)==null?void 0:C.docs,source:{originalSource:`args => {
  const markup = createPagination(args);
  return \`
    <div>
      \${markup}
    </div>
    
    <div class="mt-4">
      <p class="text-muted mb-2"><strong>Info:</strong> Página \${args.currentPage} de \${args.totalPages}</p>
      <p class="text-muted"><small>Total de \${args.totalPages * 10} items (10 por página)</small></p>
    </div>
    
    <hr class="my-5" />
    
    <details>
      <summary><strong>Code Snippets</strong></summary>
      <div class="mt-3">
        <h6>HTML</h6>
        <pre><code>\${formatHtmlSnippet(markup).replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
        <h6>React</h6>
        <pre><code>\${formatReactSnippet(markup, 'Pagination').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
        <h6>Vue 3</h6>
        <pre><code>\${formatVue3Snippet(markup, 'Pagination').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
      </div>
    </details>
  \`;
}`,...(N=(F=P.parameters)==null?void 0:F.docs)==null?void 0:N.source}}};var D,q,B;h.parameters={...h.parameters,docs:{...(D=h.parameters)==null?void 0:D.docs,source:{originalSource:`() => {
  const containerId = 'pagination-interactive-' + Math.random().toString(36).substr(2, 9);
  const totalPages = 15;
  const renderPagination = currentPage => {
    const pages = generatePageNumbers(currentPage, totalPages, 7);
    const showEllipsisStart = pages[0] > 1;
    const showEllipsisEnd = pages[pages.length - 1] < totalPages;
    return \`
      <nav aria-label="Page navigation">
        <ul class="pagination" data-pagination>
          <!-- First -->
          <li class="page-item \${currentPage === 1 ? 'disabled' : ''}" data-page="first">
            <a class="page-link" href="javascript:void(0)">
              <i class="tf-icon bx bx-chevrons-left"></i>
            </a>
          </li>
          
          <!-- Previous -->
          <li class="page-item \${currentPage === 1 ? 'disabled' : ''}" data-page="prev">
            <a class="page-link" href="javascript:void(0)">
              <i class="tf-icon bx bx-chevron-left"></i>
            </a>
          </li>
          
          <!-- Ellipsis Start -->
          \${showEllipsisStart ? \`
            <li class="page-item disabled">
              <span class="page-link">...</span>
            </li>\` : ''}
          
          <!-- Pages -->
          \${pages.map(page => \`
            <li class="page-item \${page === currentPage ? 'active' : ''}" data-page="\${page}">
              <a class="page-link" href="javascript:void(0)">\${page}</a>
            </li>\`).join('')}
          
          <!-- Ellipsis End -->
          \${showEllipsisEnd ? \`
            <li class="page-item disabled">
              <span class="page-link">...</span>
            </li>\` : ''}
          
          <!-- Next -->
          <li class="page-item \${currentPage === totalPages ? 'disabled' : ''}" data-page="next">
            <a class="page-link" href="javascript:void(0)">
              <i class="tf-icon bx bx-chevron-right"></i>
            </a>
          </li>
          
          <!-- Last -->
          <li class="page-item \${currentPage === totalPages ? 'disabled' : ''}" data-page="last">
            <a class="page-link" href="javascript:void(0)">
              <i class="tf-icon bx bx-chevrons-right"></i>
            </a>
          </li>
        </ul>
      </nav>
      
      <div class="mt-3">
        <span class="badge bg-primary">Current Page: \${currentPage} of \${totalPages}</span>
      </div>
    \`;
  };
  const markup = \`<div id="\${containerId}">\${renderPagination(1)}</div>\`;
  setTimeout(() => {
    const container = document.getElementById(containerId);
    if (!container) return;
    let currentPage = 1;
    const updatePagination = newPage => {
      if (newPage < 1 || newPage > totalPages) return;
      currentPage = newPage;
      container.innerHTML = renderPagination(currentPage);
      attachListeners();
    };
    const attachListeners = () => {
      const items = container.querySelectorAll('.page-item:not(.disabled)');
      items.forEach(item => {
        const link = item.querySelector('.page-link');
        if (!link) return;
        link.addEventListener('click', e => {
          e.preventDefault();
          const pageAttr = item.getAttribute('data-page');
          if (pageAttr === 'first') {
            updatePagination(1);
          } else if (pageAttr === 'prev') {
            updatePagination(currentPage - 1);
          } else if (pageAttr === 'next') {
            updatePagination(currentPage + 1);
          } else if (pageAttr === 'last') {
            updatePagination(totalPages);
          } else {
            updatePagination(parseInt(pageAttr));
          }
        });
      });
    };
    attachListeners();
  }, 100);
  return \`
    \${markup}
    <div class="alert alert-info mt-3">
      <strong>Interactive demo:</strong> Click on page numbers or navigation buttons. First/Previous are disabled on page 1, Next/Last are disabled on page \${totalPages}.
    </div>
  \`;
}`,...(B=(q=h.parameters)==null?void 0:q.docs)==null?void 0:B.source}}};const U=["Overview","FirstPage","MiddlePage","LastPage","SmallSize","ManyPages","Interactive"];export{c as FirstPage,h as Interactive,u as LastPage,P as ManyPages,m as MiddlePage,x as Overview,v as SmallSize,U as __namedExportsOrder,K as default};
