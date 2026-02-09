import{f}from"./snippets-m8t1HIl1.js";const x={title:"Vuexy/Molecules/Navigation/PaginationItem",tags:["autodocs"],parameters:{docs:{description:{component:"# Pagination - Navegação por páginas"}}},argTypes:{totalPages:{control:"number",table:{defaultValue:{summary:5}}},currentPage:{control:"number",table:{defaultValue:{summary:1}}}}},i=({totalPages:t=5,currentPage:e=1})=>`<nav>
  <ul class="pagination">
    <li class="page-item${e===1?" disabled":""}">
      <a class="page-link" href="#">Previous</a>
    </li>
    ${Array.from({length:t},(r,P)=>P+1).map(r=>`<li class="page-item${r===e?" active":""}"><a class="page-link" href="#">${r}</a></li>`).join(`
`)}
    <li class="page-item${e===t?" disabled":""}">
      <a class="page-link" href="#">Next</a>
    </li>
  </ul>
</nav>`,k=t=>{const e=i(t);return`
    <div>
      ${e}
      <hr/>
      <details>
        <summary><strong>Code</strong></summary>
        <pre><code>${f(e).replace(/</g,"&lt;")}</code></pre>
      </details>
    </div>
  `},n=()=>`
    <div class="d-flex flex-column gap-3">
      ${i({totalPages:5,currentPage:1})}
      ${i({totalPages:5,currentPage:3})}
      ${i({totalPages:10,currentPage:5})}
    </div>
  `,a=k.bind({});a.args={totalPages:5,currentPage:1};const l={render:()=>`
      <div class="p-4">
        <h5>Interactive Pagination Demo</h5>
        <p class="text-muted">Navigate between pages</p>
        
        <nav>
          <ul class="pagination" id="pagination">
            <li class="page-item" id="prevBtn">
              <a class="page-link" href="#" onclick="event.preventDefault(); changePage(-1);">Previous</a>
            </li>
            <li class="page-item active" data-page="1">
              <a class="page-link" href="#" onclick="event.preventDefault(); goToPage(1);">1</a>
            </li>
            <li class="page-item" data-page="2">
              <a class="page-link" href="#" onclick="event.preventDefault(); goToPage(2);">2</a>
            </li>
            <li class="page-item" data-page="3">
              <a class="page-link" href="#" onclick="event.preventDefault(); goToPage(3);">3</a>
            </li>
            <li class="page-item" data-page="4">
              <a class="page-link" href="#" onclick="event.preventDefault(); goToPage(4);">4</a>
            </li>
            <li class="page-item" data-page="5">
              <a class="page-link" href="#" onclick="event.preventDefault(); goToPage(5);">5</a>
            </li>
            <li class="page-item" id="nextBtn">
              <a class="page-link" href="#" onclick="event.preventDefault(); changePage(1);">Next</a>
            </li>
          </ul>
        </nav>
        
        <div class="alert alert-info">Current page: <strong id="currentPage">1</strong> of 5</div>
        
        <script>
          let current = 1;
          const total = 5;
          
          function updatePagination() {
            document.querySelectorAll('.page-item[data-page]').forEach(item => {
              item.classList.remove('active');
              if (parseInt(item.dataset.page) === current) {
                item.classList.add('active');
              }
            });
            
            document.getElementById('prevBtn').classList.toggle('disabled', current === 1);
            document.getElementById('nextBtn').classList.toggle('disabled', current === total);
            document.getElementById('currentPage').textContent = current;
          }
          
          function goToPage(page) {
            current = page;
            updatePagination();
          }
          
          function changePage(delta) {
            const newPage = current + delta;
            if (newPage >= 1 && newPage <= total) {
              current = newPage;
              updatePagination();
            }
          }
        <\/script>
        
        <small class="d-block mt-3 text-muted">Interactive demo via controlled state</small>
      </div>
    `};var s,c,o;n.parameters={...n.parameters,docs:{...(s=n.parameters)==null?void 0:s.docs,source:{originalSource:`() => {
  return \`
    <div class="d-flex flex-column gap-3">
      \${createPagination({
    totalPages: 5,
    currentPage: 1
  })}
      \${createPagination({
    totalPages: 5,
    currentPage: 3
  })}
      \${createPagination({
    totalPages: 10,
    currentPage: 5
  })}
    </div>
  \`;
}`,...(o=(c=n.parameters)==null?void 0:c.docs)==null?void 0:o.source}}};var g,p,d;a.parameters={...a.parameters,docs:{...(g=a.parameters)==null?void 0:g.docs,source:{originalSource:`args => {
  const markup = createPagination(args);
  return \`
    <div>
      \${markup}
      <hr/>
      <details>
        <summary><strong>Code</strong></summary>
        <pre><code>\${formatHtmlSnippet(markup).replace(/</g, '&lt;')}</code></pre>
      </details>
    </div>
  \`;
}`,...(d=(p=a.parameters)==null?void 0:p.docs)==null?void 0:d.source}}};var u,m,v;l.parameters={...l.parameters,docs:{...(u=l.parameters)==null?void 0:u.docs,source:{originalSource:`{
  render: () => {
    return \`
      <div class="p-4">
        <h5>Interactive Pagination Demo</h5>
        <p class="text-muted">Navigate between pages</p>
        
        <nav>
          <ul class="pagination" id="pagination">
            <li class="page-item" id="prevBtn">
              <a class="page-link" href="#" onclick="event.preventDefault(); changePage(-1);">Previous</a>
            </li>
            <li class="page-item active" data-page="1">
              <a class="page-link" href="#" onclick="event.preventDefault(); goToPage(1);">1</a>
            </li>
            <li class="page-item" data-page="2">
              <a class="page-link" href="#" onclick="event.preventDefault(); goToPage(2);">2</a>
            </li>
            <li class="page-item" data-page="3">
              <a class="page-link" href="#" onclick="event.preventDefault(); goToPage(3);">3</a>
            </li>
            <li class="page-item" data-page="4">
              <a class="page-link" href="#" onclick="event.preventDefault(); goToPage(4);">4</a>
            </li>
            <li class="page-item" data-page="5">
              <a class="page-link" href="#" onclick="event.preventDefault(); goToPage(5);">5</a>
            </li>
            <li class="page-item" id="nextBtn">
              <a class="page-link" href="#" onclick="event.preventDefault(); changePage(1);">Next</a>
            </li>
          </ul>
        </nav>
        
        <div class="alert alert-info">Current page: <strong id="currentPage">1</strong> of 5</div>
        
        <script>
          let current = 1;
          const total = 5;
          
          function updatePagination() {
            document.querySelectorAll('.page-item[data-page]').forEach(item => {
              item.classList.remove('active');
              if (parseInt(item.dataset.page) === current) {
                item.classList.add('active');
              }
            });
            
            document.getElementById('prevBtn').classList.toggle('disabled', current === 1);
            document.getElementById('nextBtn').classList.toggle('disabled', current === total);
            document.getElementById('currentPage').textContent = current;
          }
          
          function goToPage(page) {
            current = page;
            updatePagination();
          }
          
          function changePage(delta) {
            const newPage = current + delta;
            if (newPage >= 1 && newPage <= total) {
              current = newPage;
              updatePagination();
            }
          }
        <\/script>
        
        <small class="d-block mt-3 text-muted">Interactive demo via controlled state</small>
      </div>
    \`;
  }
}`,...(v=(m=l.parameters)==null?void 0:m.docs)==null?void 0:v.source}}};const D=["Overview","Default","Interactive"];export{a as Default,l as Interactive,n as Overview,D as __namedExportsOrder,x as default};
