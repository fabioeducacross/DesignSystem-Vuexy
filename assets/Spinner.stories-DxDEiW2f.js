const F={title:"Atoms/Feedback/Spinner",tags:["autodocs"],parameters:{docs:{description:{component:`
## Spinner - Loading Indicators

Indicadores de carregamento para estados de loading em botões, cards, páginas, etc.

### Variantes
- **Border**: Spinner circular com borda animada
- **Grow**: Spinner que "pulsa" crescendo

### Tamanhos
- **Default**: Tamanho padrão (2rem)
- **Small**: Tamanho reduzido (1rem) para botões

### Cores
Suporta todas as cores do tema: primary, secondary, success, danger, warning, info, light, dark
        `}}},argTypes:{variant:{control:"select",options:["border","grow"],description:"Tipo de animação do spinner"},color:{control:"select",options:["primary","secondary","success","danger","warning","info","light","dark"],description:"Cor do spinner"},size:{control:"select",options:["default","sm"],description:"Tamanho do spinner"}}},A=({variant:o="border",color:$="primary",size:j="default"})=>{const l=o==="border"?"spinner-border":"spinner-grow",I=j==="sm"?`${l}-sm`:"",q=`text-${$}`;return`<div class="${l} ${I} ${q}" role="status">
  <span class="visually-hidden">Carregando...</span>
</div>`},s={args:{variant:"border",color:"primary",size:"default"},render:o=>A(o)},n={render:()=>`
<div class="d-flex gap-3 align-items-center flex-wrap">
  <div class="spinner-border text-primary" role="status">
    <span class="visually-hidden">Carregando...</span>
  </div>
  <div class="spinner-border text-secondary" role="status">
    <span class="visually-hidden">Carregando...</span>
  </div>
  <div class="spinner-border text-success" role="status">
    <span class="visually-hidden">Carregando...</span>
  </div>
  <div class="spinner-border text-danger" role="status">
    <span class="visually-hidden">Carregando...</span>
  </div>
  <div class="spinner-border text-warning" role="status">
    <span class="visually-hidden">Carregando...</span>
  </div>
  <div class="spinner-border text-info" role="status">
    <span class="visually-hidden">Carregando...</span>
  </div>
  <div class="spinner-border text-dark" role="status">
    <span class="visually-hidden">Carregando...</span>
  </div>
</div>
  `},a={render:()=>`
<div class="d-flex gap-3 align-items-center flex-wrap">
  <div class="spinner-grow text-primary" role="status">
    <span class="visually-hidden">Carregando...</span>
  </div>
  <div class="spinner-grow text-secondary" role="status">
    <span class="visually-hidden">Carregando...</span>
  </div>
  <div class="spinner-grow text-success" role="status">
    <span class="visually-hidden">Carregando...</span>
  </div>
  <div class="spinner-grow text-danger" role="status">
    <span class="visually-hidden">Carregando...</span>
  </div>
  <div class="spinner-grow text-warning" role="status">
    <span class="visually-hidden">Carregando...</span>
  </div>
  <div class="spinner-grow text-info" role="status">
    <span class="visually-hidden">Carregando...</span>
  </div>
  <div class="spinner-grow text-dark" role="status">
    <span class="visually-hidden">Carregando...</span>
  </div>
</div>
  `},e={render:()=>`
<div class="d-flex gap-4 align-items-center">
  <div>
    <p class="text-muted mb-2">Default</p>
    <div class="spinner-border text-primary" role="status">
      <span class="visually-hidden">Carregando...</span>
    </div>
  </div>
  <div>
    <p class="text-muted mb-2">Small</p>
    <div class="spinner-border spinner-border-sm text-primary" role="status">
      <span class="visually-hidden">Carregando...</span>
    </div>
  </div>
  <div>
    <p class="text-muted mb-2">Custom (3rem)</p>
    <div class="spinner-border text-primary" style="width: 3rem; height: 3rem;" role="status">
      <span class="visually-hidden">Carregando...</span>
    </div>
  </div>
</div>
  `},r={render:()=>`
<div class="d-flex gap-3 flex-wrap">
  <button class="btn btn-primary" type="button" disabled>
    <span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
    Carregando...
  </button>
  
  <button class="btn btn-outline-primary" type="button" disabled>
    <span class="spinner-grow spinner-grow-sm me-2" role="status" aria-hidden="true"></span>
    Processando...
  </button>
  
  <button class="btn btn-success" type="button" disabled>
    <span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
    Salvando...
  </button>
  
  <button class="btn btn-danger" type="button" disabled>
    <span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
    Excluindo...
  </button>
</div>
  `},d={render:()=>`
<div class="card">
  <div class="card-body d-flex justify-content-center align-items-center" style="min-height: 200px;">
    <div class="text-center">
      <div class="spinner-border text-primary mb-3" style="width: 3rem; height: 3rem;" role="status">
        <span class="visually-hidden">Carregando...</span>
      </div>
      <p class="text-muted mb-0">Carregando dados...</p>
    </div>
  </div>
</div>
  `},t={render:()=>`
<div class="position-relative">
  <div class="card">
    <div class="card-body">
      <h5 class="card-title">Conteúdo do Card</h5>
      <p class="card-text">Este é um exemplo de loading overlay sobre um card.</p>
      <p class="card-text">O conteúdo fica visível mas não interativo.</p>
    </div>
  </div>
  
  <!-- Overlay -->
  <div class="position-absolute top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center" 
       style="background: rgba(255,255,255,0.8); border-radius: inherit;">
    <div class="spinner-border text-primary" role="status">
      <span class="visually-hidden">Carregando...</span>
    </div>
  </div>
</div>
  `},i={render:()=>`
<div class="card">
  <div class="card-header">
    <h5 class="card-title mb-0">Teste de Loading States</h5>
  </div>
  <div class="card-body">
    <div id="spinner-content">
      <p>Clique no botão para simular um carregamento.</p>
      <button class="btn btn-primary" id="spinner-btn" onclick="
        const btn = this;
        const originalText = btn.innerHTML;
        btn.disabled = true;
        btn.innerHTML = '<span class=\\'spinner-border spinner-border-sm me-2\\' role=\\'status\\'></span>Carregando...';
        
        setTimeout(() => {
          btn.disabled = false;
          btn.innerHTML = originalText;
        }, 2000);
      ">
        Carregar Dados
      </button>
    </div>
  </div>
</div>
  `};var c,p,u;s.parameters={...s.parameters,docs:{...(c=s.parameters)==null?void 0:c.docs,source:{originalSource:`{
  args: {
    variant: 'border',
    color: 'primary',
    size: 'default'
  },
  render: args => createSpinner(args)
}`,...(u=(p=s.parameters)==null?void 0:p.docs)==null?void 0:u.source}}};var v,m,b;n.parameters={...n.parameters,docs:{...(v=n.parameters)==null?void 0:v.docs,source:{originalSource:`{
  render: () => \`
<div class="d-flex gap-3 align-items-center flex-wrap">
  <div class="spinner-border text-primary" role="status">
    <span class="visually-hidden">Carregando...</span>
  </div>
  <div class="spinner-border text-secondary" role="status">
    <span class="visually-hidden">Carregando...</span>
  </div>
  <div class="spinner-border text-success" role="status">
    <span class="visually-hidden">Carregando...</span>
  </div>
  <div class="spinner-border text-danger" role="status">
    <span class="visually-hidden">Carregando...</span>
  </div>
  <div class="spinner-border text-warning" role="status">
    <span class="visually-hidden">Carregando...</span>
  </div>
  <div class="spinner-border text-info" role="status">
    <span class="visually-hidden">Carregando...</span>
  </div>
  <div class="spinner-border text-dark" role="status">
    <span class="visually-hidden">Carregando...</span>
  </div>
</div>
  \`
}`,...(b=(m=n.parameters)==null?void 0:m.docs)==null?void 0:b.source}}};var g,y,x;a.parameters={...a.parameters,docs:{...(g=a.parameters)==null?void 0:g.docs,source:{originalSource:`{
  render: () => \`
<div class="d-flex gap-3 align-items-center flex-wrap">
  <div class="spinner-grow text-primary" role="status">
    <span class="visually-hidden">Carregando...</span>
  </div>
  <div class="spinner-grow text-secondary" role="status">
    <span class="visually-hidden">Carregando...</span>
  </div>
  <div class="spinner-grow text-success" role="status">
    <span class="visually-hidden">Carregando...</span>
  </div>
  <div class="spinner-grow text-danger" role="status">
    <span class="visually-hidden">Carregando...</span>
  </div>
  <div class="spinner-grow text-warning" role="status">
    <span class="visually-hidden">Carregando...</span>
  </div>
  <div class="spinner-grow text-info" role="status">
    <span class="visually-hidden">Carregando...</span>
  </div>
  <div class="spinner-grow text-dark" role="status">
    <span class="visually-hidden">Carregando...</span>
  </div>
</div>
  \`
}`,...(x=(y=a.parameters)==null?void 0:y.docs)==null?void 0:x.source}}};var h,C,f;e.parameters={...e.parameters,docs:{...(h=e.parameters)==null?void 0:h.docs,source:{originalSource:`{
  render: () => \`
<div class="d-flex gap-4 align-items-center">
  <div>
    <p class="text-muted mb-2">Default</p>
    <div class="spinner-border text-primary" role="status">
      <span class="visually-hidden">Carregando...</span>
    </div>
  </div>
  <div>
    <p class="text-muted mb-2">Small</p>
    <div class="spinner-border spinner-border-sm text-primary" role="status">
      <span class="visually-hidden">Carregando...</span>
    </div>
  </div>
  <div>
    <p class="text-muted mb-2">Custom (3rem)</p>
    <div class="spinner-border text-primary" style="width: 3rem; height: 3rem;" role="status">
      <span class="visually-hidden">Carregando...</span>
    </div>
  </div>
</div>
  \`
}`,...(f=(C=e.parameters)==null?void 0:C.docs)==null?void 0:f.source}}};var w,S,T;r.parameters={...r.parameters,docs:{...(w=r.parameters)==null?void 0:w.docs,source:{originalSource:`{
  render: () => \`
<div class="d-flex gap-3 flex-wrap">
  <button class="btn btn-primary" type="button" disabled>
    <span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
    Carregando...
  </button>
  
  <button class="btn btn-outline-primary" type="button" disabled>
    <span class="spinner-grow spinner-grow-sm me-2" role="status" aria-hidden="true"></span>
    Processando...
  </button>
  
  <button class="btn btn-success" type="button" disabled>
    <span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
    Salvando...
  </button>
  
  <button class="btn btn-danger" type="button" disabled>
    <span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
    Excluindo...
  </button>
</div>
  \`
}`,...(T=(S=r.parameters)==null?void 0:S.docs)==null?void 0:T.source}}};var L,k,E;d.parameters={...d.parameters,docs:{...(L=d.parameters)==null?void 0:L.docs,source:{originalSource:`{
  render: () => \`
<div class="card">
  <div class="card-body d-flex justify-content-center align-items-center" style="min-height: 200px;">
    <div class="text-center">
      <div class="spinner-border text-primary mb-3" style="width: 3rem; height: 3rem;" role="status">
        <span class="visually-hidden">Carregando...</span>
      </div>
      <p class="text-muted mb-0">Carregando dados...</p>
    </div>
  </div>
</div>
  \`
}`,...(E=(k=d.parameters)==null?void 0:k.docs)==null?void 0:E.source}}};var D,z,O;t.parameters={...t.parameters,docs:{...(D=t.parameters)==null?void 0:D.docs,source:{originalSource:`{
  render: () => \`
<div class="position-relative">
  <div class="card">
    <div class="card-body">
      <h5 class="card-title">Conteúdo do Card</h5>
      <p class="card-text">Este é um exemplo de loading overlay sobre um card.</p>
      <p class="card-text">O conteúdo fica visível mas não interativo.</p>
    </div>
  </div>
  
  <!-- Overlay -->
  <div class="position-absolute top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center" 
       style="background: rgba(255,255,255,0.8); border-radius: inherit;">
    <div class="spinner-border text-primary" role="status">
      <span class="visually-hidden">Carregando...</span>
    </div>
  </div>
</div>
  \`
}`,...(O=(z=t.parameters)==null?void 0:z.docs)==null?void 0:O.source}}};var H,M,B;i.parameters={...i.parameters,docs:{...(H=i.parameters)==null?void 0:H.docs,source:{originalSource:`{
  render: () => \`
<div class="card">
  <div class="card-header">
    <h5 class="card-title mb-0">Teste de Loading States</h5>
  </div>
  <div class="card-body">
    <div id="spinner-content">
      <p>Clique no botão para simular um carregamento.</p>
      <button class="btn btn-primary" id="spinner-btn" onclick="
        const btn = this;
        const originalText = btn.innerHTML;
        btn.disabled = true;
        btn.innerHTML = '<span class=\\\\'spinner-border spinner-border-sm me-2\\\\' role=\\\\'status\\\\'></span>Carregando...';
        
        setTimeout(() => {
          btn.disabled = false;
          btn.innerHTML = originalText;
        }, 2000);
      ">
        Carregar Dados
      </button>
    </div>
  </div>
</div>
  \`
}`,...(B=(M=i.parameters)==null?void 0:M.docs)==null?void 0:B.source}}};const G=["Default","SpinnerBorder","SpinnerGrow","Sizes","ButtonsWithSpinner","CenteredLoading","OverlayLoading","Interactive"];export{r as ButtonsWithSpinner,d as CenteredLoading,s as Default,i as Interactive,t as OverlayLoading,e as Sizes,n as SpinnerBorder,a as SpinnerGrow,G as __namedExportsOrder,F as default};
