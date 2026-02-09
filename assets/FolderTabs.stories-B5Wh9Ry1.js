const ta={title:"Vuexy/Molecules/Navigation/FolderTabs",tags:["autodocs"],parameters:{docs:{description:{component:`
## FolderTabs - Tabs Estilo Pasta

Componente de navegação por abas com design exclusivo Educacross. 
As abas se sobrepõem levemente criando um efeito visual de "pastas de arquivo".

### Características
- **Sobreposição**: Cada aba sobrepõe a próxima com \`--offset: -10px\`
- **Z-index dinâmico**: Aba ativa fica sempre na frente
- **Border-radius**: Cantos arredondados apenas no topo (15px)
- **Box-shadow**: Sombra sutil para dar profundidade
- **Responsivo**: Scroll horizontal em mobile

### CSS Variables
- \`--offset\`: Quantidade de sobreposição (-10px)
- \`--index\`: Índice da aba para cálculo de posição

### Cores (Educacross)
- **Primary**: #6e63e8 (roxo)
- **Text**: #6e6b7b (cinza)
- **Background**: #fff (branco)
        `}}},argTypes:{tabs:{control:"object",description:"Array de objetos com { title, icon? }"},activeTab:{control:"number",description:"Índice da aba ativa"}}},a=`
<style>
  /* Cores Educacross */
  :root {
    --edu-primary: #6e63e8;
    --edu-text: #6e6b7b;
    --edu-white: #fff;
  }

  .tab-line {
    border: 1px solid var(--edu-primary);
    height: 1px;
    width: 100%;
    margin-bottom: 1rem;
  }

  .tabs-row {
    display: flex;
    flex-wrap: nowrap;
    overflow-x: auto;
    scrollbar-width: thin;
  }

  .tab-link {
    display: inline-flex;
    align-items: center;
    gap: 0.25rem;
    position: relative;
    padding: 14px 24px 10px 24px;
    border-radius: 15px 15px 0 0;
    box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.14);
    cursor: pointer;
    color: var(--edu-text);
    text-decoration: none;
    background: var(--edu-white);
    transform: translateX(calc(var(--index) * var(--offset)));
    white-space: nowrap;
    transition: all 0.2s ease;
    font-size: 14px;
    font-weight: 500;
  }

  .tab-link:hover {
    color: var(--edu-white) !important;
    background-color: var(--edu-primary);
  }

  .tab-link.active {
    background: var(--edu-primary);
    color: var(--edu-white);
  }

  .tab-link .tab-icon {
    font-size: 18px;
  }

  .tab-title {
    color: var(--edu-primary);
    font-weight: 700;
    text-transform: uppercase;
    font-size: 14px;
  }

  .tab-content {
    padding: 1.5rem;
    background: var(--edu-white);
    border-radius: 0 0 8px 8px;
    min-height: 150px;
  }
</style>
`,x=({tabs:s=["Jogos","Livros"],activeTab:Z=0,showLine:K=!0,tabTitle:u=""})=>{const Y=s.map((e,t)=>{const aa=typeof e=="string"?e:e.title,sa=typeof e=="object"&&e.icon?`<span class="tab-icon material-symbols-outlined">${e.icon}</span>`:"",f=t===Z,ea=f?s.length:s.length-t;return`<a class="tab-link${f?" active":""}" 
               style="--offset: -10px; --index: ${t}; z-index: ${ea};"
               onclick="
                 document.querySelectorAll('.tab-link').forEach((t, i) => {
                   t.classList.toggle('active', i === ${t});
                   t.style.zIndex = i === ${t} ? ${s.length} : ${s.length} - i;
                 });
                 document.querySelectorAll('.tab-panel').forEach((p, i) => {
                   p.style.display = i === ${t} ? 'block' : 'none';
                 });
               ">
      ${sa} ${aa}
    </a>`}).join("");return`
${a}
<div>
  <div class="d-flex flex-column-reverse flex-md-row justify-content-center justify-content-md-between align-items-md-baseline flex-nowrap">
    <div class="tabs-row">
      ${Y}
    </div>
    ${u?`
    <div class="d-flex align-items-center gap-1 tab-title">
      ${u}
    </div>
    `:""}
  </div>
  ${K?'<div class="tab-line"></div>':""}
</div>
  `},i={args:{tabs:["Jogos","Livros"],activeTab:0},render:s=>x(s)},n={render:()=>x({tabs:["Jogos","Livros","Atividades"],activeTab:0})},l={render:()=>`
${a}
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" rel="stylesheet">
<div>
  <div class="d-flex flex-column-reverse flex-md-row justify-content-md-between align-items-md-baseline">
    <div class="tabs-row">
      <a class="tab-link active" style="--offset: -10px; --index: 0; z-index: 3;">
        <span class="tab-icon material-symbols-outlined">sports_esports</span> Jogos
      </a>
      <a class="tab-link" style="--offset: -10px; --index: 1; z-index: 2;">
        <span class="tab-icon material-symbols-outlined">menu_book</span> Livros
      </a>
      <a class="tab-link" style="--offset: -10px; --index: 2; z-index: 1;">
        <span class="tab-icon material-symbols-outlined">assignment</span> Atividades
      </a>
    </div>
  </div>
  <div class="tab-line"></div>
</div>
  `},o={render:()=>x({tabs:["Jogos","Livros"],activeTab:0,tabTitle:"📚 Biblioteca Digital"})},d={render:()=>x({tabs:["Jogos","Livros","Atividades"],activeTab:1})},c={name:"Muitas Abas (Scroll)",render:()=>`
${a}
<div style="max-width: 400px;">
  <div class="tabs-row">
    <a class="tab-link active" style="--offset: -10px; --index: 0; z-index: 7;">Matemática</a>
    <a class="tab-link" style="--offset: -10px; --index: 1; z-index: 6;">Português</a>
    <a class="tab-link" style="--offset: -10px; --index: 2; z-index: 5;">Ciências</a>
    <a class="tab-link" style="--offset: -10px; --index: 3; z-index: 4;">História</a>
    <a class="tab-link" style="--offset: -10px; --index: 4; z-index: 3;">Geografia</a>
    <a class="tab-link" style="--offset: -10px; --index: 5; z-index: 2;">Inglês</a>
    <a class="tab-link" style="--offset: -10px; --index: 6; z-index: 1;">Artes</a>
  </div>
  <div class="tab-line"></div>
  <p class="text-muted mt-2"><small>↔️ Scroll horizontal para ver todas as abas</small></p>
</div>
  `},r={name:"Com Conteúdo",render:()=>`
${a}
<div>
  <div class="tabs-row">
    <a class="tab-link active" style="--offset: -10px; --index: 0; z-index: 2;" onclick="
      document.querySelectorAll('.tab-link').forEach((t, i) => t.classList.toggle('active', i === 0));
      document.querySelectorAll('.tab-panel').forEach((p, i) => p.style.display = i === 0 ? 'block' : 'none');
    ">Jogos</a>
    <a class="tab-link" style="--offset: -10px; --index: 1; z-index: 1;" onclick="
      document.querySelectorAll('.tab-link').forEach((t, i) => t.classList.toggle('active', i === 1));
      document.querySelectorAll('.tab-panel').forEach((p, i) => p.style.display = i === 1 ? 'block' : 'none');
    ">Livros</a>
  </div>
  <div class="tab-line"></div>
  
  <div class="tab-panel" style="display: block;">
    <div class="card">
      <div class="card-body">
        <h5>🎮 Jogos Educativos</h5>
        <p>Explore nossa coleção de jogos para aprender matemática, português e muito mais!</p>
        <div class="d-flex gap-2">
          <span class="badge bg-primary">Matemática</span>
          <span class="badge bg-success">Português</span>
          <span class="badge bg-warning">Ciências</span>
        </div>
      </div>
    </div>
  </div>
  
  <div class="tab-panel" style="display: none;">
    <div class="card">
      <div class="card-body">
        <h5>📚 Livros Digitais</h5>
        <p>Biblioteca completa com histórias interativas e atividades de leitura.</p>
        <div class="d-flex gap-2">
          <span class="badge bg-info">Fábulas</span>
          <span class="badge bg-secondary">Contos</span>
          <span class="badge bg-danger">Poesias</span>
        </div>
      </div>
    </div>
  </div>
</div>
  `},b={name:"Variantes de Cor",render:()=>`
${a}
<style>
  .tabs-teal .tab-link:hover,
  .tabs-teal .tab-link.active { background: #00bdb8 !important; }
  .tabs-teal .tab-line { border-color: #00bdb8; }
  
  .tabs-orange .tab-link:hover,
  .tabs-orange .tab-link.active { background: #ec6300 !important; }
  .tabs-orange .tab-line { border-color: #ec6300; }
  
  .tabs-success .tab-link:hover,
  .tabs-success .tab-link.active { background: #28c76f !important; }
  .tabs-success .tab-line { border-color: #28c76f; }
</style>

<div class="mb-4">
  <p class="text-muted mb-2">Primary (Padrão)</p>
  <div class="tabs-row">
    <a class="tab-link active" style="--offset: -10px; --index: 0; z-index: 2;">Jogos</a>
    <a class="tab-link" style="--offset: -10px; --index: 1; z-index: 1;">Livros</a>
  </div>
  <div class="tab-line"></div>
</div>

<div class="mb-4 tabs-teal">
  <p class="text-muted mb-2">Teal (Matemática)</p>
  <div class="tabs-row">
    <a class="tab-link active" style="--offset: -10px; --index: 0; z-index: 2;">Jogos</a>
    <a class="tab-link" style="--offset: -10px; --index: 1; z-index: 1;">Livros</a>
  </div>
  <div class="tab-line"></div>
</div>

<div class="mb-4 tabs-orange">
  <p class="text-muted mb-2">Orange (Português)</p>
  <div class="tabs-row">
    <a class="tab-link active" style="--offset: -10px; --index: 0; z-index: 2;">Jogos</a>
    <a class="tab-link" style="--offset: -10px; --index: 1; z-index: 1;">Livros</a>
  </div>
  <div class="tab-line"></div>
</div>

<div class="mb-4 tabs-success">
  <p class="text-muted mb-2">Success</p>
  <div class="tabs-row">
    <a class="tab-link active" style="--offset: -10px; --index: 0; z-index: 2;">Jogos</a>
    <a class="tab-link" style="--offset: -10px; --index: 1; z-index: 1;">Livros</a>
  </div>
  <div class="tab-line"></div>
</div>
  `},p={name:"Aba Única (Hidden)",render:()=>`
${a}
<div>
  <p class="text-muted mb-2">Com apenas 1 aba, as tabs ficam ocultas em mobile:</p>
  <div class="tabs-row d-none d-md-flex">
    <a class="tab-link active" style="--offset: -10px; --index: 0; z-index: 1;">Conteúdo</a>
  </div>
  <div class="tab-line d-none d-md-block"></div>
  <div class="card">
    <div class="card-body">
      <p class="mb-0">Conteúdo da página...</p>
    </div>
  </div>
</div>
  `},v={render:()=>`
${a}
<div class="card">
  <div class="card-header">
    <h5 class="card-title mb-0">Folder Tabs - Demonstração Interativa</h5>
  </div>
  <div class="card-body">
    <div class="tabs-row mb-0" id="demo-tabs">
      <a class="tab-link active" style="--offset: -10px; --index: 0; z-index: 3;" onclick="switchTab(0)">📊 Dashboard</a>
      <a class="tab-link" style="--offset: -10px; --index: 1; z-index: 2;" onclick="switchTab(1)">👤 Perfil</a>
      <a class="tab-link" style="--offset: -10px; --index: 2; z-index: 1;" onclick="switchTab(2)">⚙️ Configurações</a>
    </div>
    <div class="tab-line"></div>
    
    <div id="panel-0" class="tab-panel">
      <h6>Dashboard</h6>
      <p>Visualize suas estatísticas e progresso aqui.</p>
      <div class="row g-3">
        <div class="col-4">
          <div class="bg-primary text-white rounded p-3 text-center">
            <h4 class="mb-0">42</h4>
            <small>Jogos</small>
          </div>
        </div>
        <div class="col-4">
          <div class="bg-success text-white rounded p-3 text-center">
            <h4 class="mb-0">18</h4>
            <small>Livros</small>
          </div>
        </div>
        <div class="col-4">
          <div class="bg-warning text-dark rounded p-3 text-center">
            <h4 class="mb-0">7</h4>
            <small>Em progresso</small>
          </div>
        </div>
      </div>
    </div>
    
    <div id="panel-1" class="tab-panel" style="display: none;">
      <h6>Perfil do Aluno</h6>
      <p>Informações pessoais e conquistas.</p>
      <div class="d-flex align-items-center gap-3">
        <div class="avatar avatar-lg">
          <span class="avatar-initial rounded-circle bg-primary">JD</span>
        </div>
        <div>
          <h6 class="mb-0">João da Silva</h6>
          <small class="text-muted">3º Ano - Turma A</small>
        </div>
      </div>
    </div>
    
    <div id="panel-2" class="tab-panel" style="display: none;">
      <h6>Configurações</h6>
      <p>Personalize sua experiência.</p>
      <div class="form-check form-switch mb-2">
        <input class="form-check-input" type="checkbox" checked>
        <label class="form-check-label">Notificações</label>
      </div>
      <div class="form-check form-switch">
        <input class="form-check-input" type="checkbox">
        <label class="form-check-label">Modo escuro</label>
      </div>
    </div>
  </div>
</div>

<script>
  function switchTab(index) {
    // Update tab states
    document.querySelectorAll('#demo-tabs .tab-link').forEach((tab, i) => {
      tab.classList.toggle('active', i === index);
      tab.style.zIndex = i === index ? 3 : 3 - i;
    });
    
    // Update panel visibility
    for (let i = 0; i < 3; i++) {
      document.getElementById('panel-' + i).style.display = i === index ? 'block' : 'none';
    }
  }
<\/script>
  `},m={name:"Anatomia do Componente",render:()=>`
${a}
<style>
  .anatomy-highlight { outline: 2px dashed #ea5455; outline-offset: 2px; position: relative; }
  .anatomy-label { 
    position: absolute; 
    top: -20px; 
    left: 0; 
    background: #ea5455; 
    color: white; 
    font-size: 10px; 
    padding: 2px 6px; 
    border-radius: 3px;
    white-space: nowrap;
  }
</style>

<div class="mb-5">
  <h6 class="mb-3">Estrutura do Componente</h6>
  
  <div class="position-relative mb-4">
    <div class="anatomy-highlight p-2 mb-2" style="display: inline-block;">
      <span class="anatomy-label">.tabs-row</span>
      <div class="d-flex" style="gap: 0;">
        <div class="anatomy-highlight" style="display: inline-block; margin-right: -10px;">
          <span class="anatomy-label">.tab-link.active</span>
          <a class="tab-link active" style="--offset: 0; --index: 0; z-index: 2; position: relative;">Jogos</a>
        </div>
        <div class="anatomy-highlight" style="display: inline-block;">
          <span class="anatomy-label">.tab-link</span>
          <a class="tab-link" style="--offset: 0; --index: 1; z-index: 1; position: relative;">Livros</a>
        </div>
      </div>
    </div>
  </div>
  
  <div class="anatomy-highlight mb-4" style="width: 100%;">
    <span class="anatomy-label">.tab-line</span>
    <div class="tab-line" style="margin: 0;"></div>
  </div>
</div>

<div class="mt-4">
  <h6 class="mb-3">CSS Variables</h6>
  <table class="table table-sm">
    <thead>
      <tr>
        <th>Variable</th>
        <th>Valor</th>
        <th>Descrição</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><code>--offset</code></td>
        <td>-10px</td>
        <td>Sobreposição entre abas</td>
      </tr>
      <tr>
        <td><code>--index</code></td>
        <td>0, 1, 2...</td>
        <td>Posição da aba</td>
      </tr>
      <tr>
        <td><code>z-index</code></td>
        <td>Dinâmico</td>
        <td>Aba ativa = máximo</td>
      </tr>
    </tbody>
  </table>
</div>

<div class="mt-4">
  <h6 class="mb-3">Fórmula de Transform</h6>
  <code class="d-block p-3 bg-dark text-light rounded">
    transform: translateX(calc(var(--index) * var(--offset)));
  </code>
  <small class="text-muted d-block mt-2">
    Exemplo: Aba 2 → translateX(calc(1 * -10px)) → translateX(-10px)
  </small>
</div>
  `};var g,h,y;i.parameters={...i.parameters,docs:{...(g=i.parameters)==null?void 0:g.docs,source:{originalSource:`{
  args: {
    tabs: ['Jogos', 'Livros'],
    activeTab: 0
  },
  render: args => createFolderTabs(args)
}`,...(y=(h=i.parameters)==null?void 0:h.docs)==null?void 0:y.source}}};var k,w,z;n.parameters={...n.parameters,docs:{...(k=n.parameters)==null?void 0:k.docs,source:{originalSource:`{
  render: () => createFolderTabs({
    tabs: ['Jogos', 'Livros', 'Atividades'],
    activeTab: 0
  })
}`,...(z=(w=n.parameters)==null?void 0:w.docs)==null?void 0:z.source}}};var E,S,A;l.parameters={...l.parameters,docs:{...(E=l.parameters)==null?void 0:E.docs,source:{originalSource:`{
  render: () => \`
\${folderTabsCSS}
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" rel="stylesheet">
<div>
  <div class="d-flex flex-column-reverse flex-md-row justify-content-md-between align-items-md-baseline">
    <div class="tabs-row">
      <a class="tab-link active" style="--offset: -10px; --index: 0; z-index: 3;">
        <span class="tab-icon material-symbols-outlined">sports_esports</span> Jogos
      </a>
      <a class="tab-link" style="--offset: -10px; --index: 1; z-index: 2;">
        <span class="tab-icon material-symbols-outlined">menu_book</span> Livros
      </a>
      <a class="tab-link" style="--offset: -10px; --index: 2; z-index: 1;">
        <span class="tab-icon material-symbols-outlined">assignment</span> Atividades
      </a>
    </div>
  </div>
  <div class="tab-line"></div>
</div>
  \`
}`,...(A=(S=l.parameters)==null?void 0:S.docs)==null?void 0:A.source}}};var T,C,D;o.parameters={...o.parameters,docs:{...(T=o.parameters)==null?void 0:T.docs,source:{originalSource:`{
  render: () => createFolderTabs({
    tabs: ['Jogos', 'Livros'],
    activeTab: 0,
    tabTitle: '📚 Biblioteca Digital'
  })
}`,...(D=(C=o.parameters)==null?void 0:C.docs)==null?void 0:D.source}}};var L,F,J;d.parameters={...d.parameters,docs:{...(L=d.parameters)==null?void 0:L.docs,source:{originalSource:`{
  render: () => createFolderTabs({
    tabs: ['Jogos', 'Livros', 'Atividades'],
    activeTab: 1
  })
}`,...(J=(F=d.parameters)==null?void 0:F.docs)==null?void 0:J.source}}};var $,P,I;c.parameters={...c.parameters,docs:{...($=c.parameters)==null?void 0:$.docs,source:{originalSource:`{
  name: 'Muitas Abas (Scroll)',
  render: () => \`
\${folderTabsCSS}
<div style="max-width: 400px;">
  <div class="tabs-row">
    <a class="tab-link active" style="--offset: -10px; --index: 0; z-index: 7;">Matemática</a>
    <a class="tab-link" style="--offset: -10px; --index: 1; z-index: 6;">Português</a>
    <a class="tab-link" style="--offset: -10px; --index: 2; z-index: 5;">Ciências</a>
    <a class="tab-link" style="--offset: -10px; --index: 3; z-index: 4;">História</a>
    <a class="tab-link" style="--offset: -10px; --index: 4; z-index: 3;">Geografia</a>
    <a class="tab-link" style="--offset: -10px; --index: 5; z-index: 2;">Inglês</a>
    <a class="tab-link" style="--offset: -10px; --index: 6; z-index: 1;">Artes</a>
  </div>
  <div class="tab-line"></div>
  <p class="text-muted mt-2"><small>↔️ Scroll horizontal para ver todas as abas</small></p>
</div>
  \`
}`,...(I=(P=c.parameters)==null?void 0:P.docs)==null?void 0:I.source}}};var q,M,V;r.parameters={...r.parameters,docs:{...(q=r.parameters)==null?void 0:q.docs,source:{originalSource:`{
  name: 'Com Conteúdo',
  render: () => \`
\${folderTabsCSS}
<div>
  <div class="tabs-row">
    <a class="tab-link active" style="--offset: -10px; --index: 0; z-index: 2;" onclick="
      document.querySelectorAll('.tab-link').forEach((t, i) => t.classList.toggle('active', i === 0));
      document.querySelectorAll('.tab-panel').forEach((p, i) => p.style.display = i === 0 ? 'block' : 'none');
    ">Jogos</a>
    <a class="tab-link" style="--offset: -10px; --index: 1; z-index: 1;" onclick="
      document.querySelectorAll('.tab-link').forEach((t, i) => t.classList.toggle('active', i === 1));
      document.querySelectorAll('.tab-panel').forEach((p, i) => p.style.display = i === 1 ? 'block' : 'none');
    ">Livros</a>
  </div>
  <div class="tab-line"></div>
  
  <div class="tab-panel" style="display: block;">
    <div class="card">
      <div class="card-body">
        <h5>🎮 Jogos Educativos</h5>
        <p>Explore nossa coleção de jogos para aprender matemática, português e muito mais!</p>
        <div class="d-flex gap-2">
          <span class="badge bg-primary">Matemática</span>
          <span class="badge bg-success">Português</span>
          <span class="badge bg-warning">Ciências</span>
        </div>
      </div>
    </div>
  </div>
  
  <div class="tab-panel" style="display: none;">
    <div class="card">
      <div class="card-body">
        <h5>📚 Livros Digitais</h5>
        <p>Biblioteca completa com histórias interativas e atividades de leitura.</p>
        <div class="d-flex gap-2">
          <span class="badge bg-info">Fábulas</span>
          <span class="badge bg-secondary">Contos</span>
          <span class="badge bg-danger">Poesias</span>
        </div>
      </div>
    </div>
  </div>
</div>
  \`
}`,...(V=(M=r.parameters)==null?void 0:M.docs)==null?void 0:V.source}}};var j,B,X;b.parameters={...b.parameters,docs:{...(j=b.parameters)==null?void 0:j.docs,source:{originalSource:`{
  name: 'Variantes de Cor',
  render: () => \`
\${folderTabsCSS}
<style>
  .tabs-teal .tab-link:hover,
  .tabs-teal .tab-link.active { background: #00bdb8 !important; }
  .tabs-teal .tab-line { border-color: #00bdb8; }
  
  .tabs-orange .tab-link:hover,
  .tabs-orange .tab-link.active { background: #ec6300 !important; }
  .tabs-orange .tab-line { border-color: #ec6300; }
  
  .tabs-success .tab-link:hover,
  .tabs-success .tab-link.active { background: #28c76f !important; }
  .tabs-success .tab-line { border-color: #28c76f; }
</style>

<div class="mb-4">
  <p class="text-muted mb-2">Primary (Padrão)</p>
  <div class="tabs-row">
    <a class="tab-link active" style="--offset: -10px; --index: 0; z-index: 2;">Jogos</a>
    <a class="tab-link" style="--offset: -10px; --index: 1; z-index: 1;">Livros</a>
  </div>
  <div class="tab-line"></div>
</div>

<div class="mb-4 tabs-teal">
  <p class="text-muted mb-2">Teal (Matemática)</p>
  <div class="tabs-row">
    <a class="tab-link active" style="--offset: -10px; --index: 0; z-index: 2;">Jogos</a>
    <a class="tab-link" style="--offset: -10px; --index: 1; z-index: 1;">Livros</a>
  </div>
  <div class="tab-line"></div>
</div>

<div class="mb-4 tabs-orange">
  <p class="text-muted mb-2">Orange (Português)</p>
  <div class="tabs-row">
    <a class="tab-link active" style="--offset: -10px; --index: 0; z-index: 2;">Jogos</a>
    <a class="tab-link" style="--offset: -10px; --index: 1; z-index: 1;">Livros</a>
  </div>
  <div class="tab-line"></div>
</div>

<div class="mb-4 tabs-success">
  <p class="text-muted mb-2">Success</p>
  <div class="tabs-row">
    <a class="tab-link active" style="--offset: -10px; --index: 0; z-index: 2;">Jogos</a>
    <a class="tab-link" style="--offset: -10px; --index: 1; z-index: 1;">Livros</a>
  </div>
  <div class="tab-line"></div>
</div>
  \`
}`,...(X=(B=b.parameters)==null?void 0:B.docs)==null?void 0:X.source}}};var _,W,H;p.parameters={...p.parameters,docs:{...(_=p.parameters)==null?void 0:_.docs,source:{originalSource:`{
  name: 'Aba Única (Hidden)',
  render: () => \`
\${folderTabsCSS}
<div>
  <p class="text-muted mb-2">Com apenas 1 aba, as tabs ficam ocultas em mobile:</p>
  <div class="tabs-row d-none d-md-flex">
    <a class="tab-link active" style="--offset: -10px; --index: 0; z-index: 1;">Conteúdo</a>
  </div>
  <div class="tab-line d-none d-md-block"></div>
  <div class="card">
    <div class="card-body">
      <p class="mb-0">Conteúdo da página...</p>
    </div>
  </div>
</div>
  \`
}`,...(H=(W=p.parameters)==null?void 0:W.docs)==null?void 0:H.source}}};var O,G,U;v.parameters={...v.parameters,docs:{...(O=v.parameters)==null?void 0:O.docs,source:{originalSource:`{
  render: () => \`
\${folderTabsCSS}
<div class="card">
  <div class="card-header">
    <h5 class="card-title mb-0">Folder Tabs - Demonstração Interativa</h5>
  </div>
  <div class="card-body">
    <div class="tabs-row mb-0" id="demo-tabs">
      <a class="tab-link active" style="--offset: -10px; --index: 0; z-index: 3;" onclick="switchTab(0)">📊 Dashboard</a>
      <a class="tab-link" style="--offset: -10px; --index: 1; z-index: 2;" onclick="switchTab(1)">👤 Perfil</a>
      <a class="tab-link" style="--offset: -10px; --index: 2; z-index: 1;" onclick="switchTab(2)">⚙️ Configurações</a>
    </div>
    <div class="tab-line"></div>
    
    <div id="panel-0" class="tab-panel">
      <h6>Dashboard</h6>
      <p>Visualize suas estatísticas e progresso aqui.</p>
      <div class="row g-3">
        <div class="col-4">
          <div class="bg-primary text-white rounded p-3 text-center">
            <h4 class="mb-0">42</h4>
            <small>Jogos</small>
          </div>
        </div>
        <div class="col-4">
          <div class="bg-success text-white rounded p-3 text-center">
            <h4 class="mb-0">18</h4>
            <small>Livros</small>
          </div>
        </div>
        <div class="col-4">
          <div class="bg-warning text-dark rounded p-3 text-center">
            <h4 class="mb-0">7</h4>
            <small>Em progresso</small>
          </div>
        </div>
      </div>
    </div>
    
    <div id="panel-1" class="tab-panel" style="display: none;">
      <h6>Perfil do Aluno</h6>
      <p>Informações pessoais e conquistas.</p>
      <div class="d-flex align-items-center gap-3">
        <div class="avatar avatar-lg">
          <span class="avatar-initial rounded-circle bg-primary">JD</span>
        </div>
        <div>
          <h6 class="mb-0">João da Silva</h6>
          <small class="text-muted">3º Ano - Turma A</small>
        </div>
      </div>
    </div>
    
    <div id="panel-2" class="tab-panel" style="display: none;">
      <h6>Configurações</h6>
      <p>Personalize sua experiência.</p>
      <div class="form-check form-switch mb-2">
        <input class="form-check-input" type="checkbox" checked>
        <label class="form-check-label">Notificações</label>
      </div>
      <div class="form-check form-switch">
        <input class="form-check-input" type="checkbox">
        <label class="form-check-label">Modo escuro</label>
      </div>
    </div>
  </div>
</div>

<script>
  function switchTab(index) {
    // Update tab states
    document.querySelectorAll('#demo-tabs .tab-link').forEach((tab, i) => {
      tab.classList.toggle('active', i === index);
      tab.style.zIndex = i === index ? 3 : 3 - i;
    });
    
    // Update panel visibility
    for (let i = 0; i < 3; i++) {
      document.getElementById('panel-' + i).style.display = i === index ? 'block' : 'none';
    }
  }
<\/script>
  \`
}`,...(U=(G=v.parameters)==null?void 0:G.docs)==null?void 0:U.source}}};var N,R,Q;m.parameters={...m.parameters,docs:{...(N=m.parameters)==null?void 0:N.docs,source:{originalSource:`{
  name: 'Anatomia do Componente',
  render: () => \`
\${folderTabsCSS}
<style>
  .anatomy-highlight { outline: 2px dashed #ea5455; outline-offset: 2px; position: relative; }
  .anatomy-label { 
    position: absolute; 
    top: -20px; 
    left: 0; 
    background: #ea5455; 
    color: white; 
    font-size: 10px; 
    padding: 2px 6px; 
    border-radius: 3px;
    white-space: nowrap;
  }
</style>

<div class="mb-5">
  <h6 class="mb-3">Estrutura do Componente</h6>
  
  <div class="position-relative mb-4">
    <div class="anatomy-highlight p-2 mb-2" style="display: inline-block;">
      <span class="anatomy-label">.tabs-row</span>
      <div class="d-flex" style="gap: 0;">
        <div class="anatomy-highlight" style="display: inline-block; margin-right: -10px;">
          <span class="anatomy-label">.tab-link.active</span>
          <a class="tab-link active" style="--offset: 0; --index: 0; z-index: 2; position: relative;">Jogos</a>
        </div>
        <div class="anatomy-highlight" style="display: inline-block;">
          <span class="anatomy-label">.tab-link</span>
          <a class="tab-link" style="--offset: 0; --index: 1; z-index: 1; position: relative;">Livros</a>
        </div>
      </div>
    </div>
  </div>
  
  <div class="anatomy-highlight mb-4" style="width: 100%;">
    <span class="anatomy-label">.tab-line</span>
    <div class="tab-line" style="margin: 0;"></div>
  </div>
</div>

<div class="mt-4">
  <h6 class="mb-3">CSS Variables</h6>
  <table class="table table-sm">
    <thead>
      <tr>
        <th>Variable</th>
        <th>Valor</th>
        <th>Descrição</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><code>--offset</code></td>
        <td>-10px</td>
        <td>Sobreposição entre abas</td>
      </tr>
      <tr>
        <td><code>--index</code></td>
        <td>0, 1, 2...</td>
        <td>Posição da aba</td>
      </tr>
      <tr>
        <td><code>z-index</code></td>
        <td>Dinâmico</td>
        <td>Aba ativa = máximo</td>
      </tr>
    </tbody>
  </table>
</div>

<div class="mt-4">
  <h6 class="mb-3">Fórmula de Transform</h6>
  <code class="d-block p-3 bg-dark text-light rounded">
    transform: translateX(calc(var(--index) * var(--offset)));
  </code>
  <small class="text-muted d-block mt-2">
    Exemplo: Aba 2 → translateX(calc(1 * -10px)) → translateX(-10px)
  </small>
</div>
  \`
}`,...(Q=(R=m.parameters)==null?void 0:R.docs)==null?void 0:Q.source}}};const ia=["Default","ThreeTabs","WithIcons","WithTitle","SecondTabActive","ManyTabs","WithContent","ColorVariants","SingleTab","Interactive","Anatomy"];export{m as Anatomy,b as ColorVariants,i as Default,v as Interactive,c as ManyTabs,d as SecondTabActive,p as SingleTab,n as ThreeTabs,r as WithContent,l as WithIcons,o as WithTitle,ia as __namedExportsOrder,ta as default};
