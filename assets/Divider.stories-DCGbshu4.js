const P={title:"Vuexy/Atoms/Data Display/Divider",tags:["autodocs"],parameters:{docs:{description:{component:`
## Divider - Separadores Visuais

Linhas horizontais para separar conteúdo visualmente.

### Variantes
- **Default**: Linha simples \`<hr>\`
- **With Text**: Divisor com texto central
- **Styled**: Divisores com estilos customizados
        `}}}},s={render:()=>`
<div>
  <p>Conteúdo acima do divisor</p>
  <hr>
  <p>Conteúdo abaixo do divisor</p>
</div>
  `},e={render:()=>`
<div>
  <p>Margem padrão</p>
  <hr>
  
  <p>Margem pequena (my-2)</p>
  <hr class="my-2">
  
  <p>Margem grande (my-5)</p>
  <hr class="my-5">
  
  <p>Fim</p>
</div>
  `},a={render:()=>`
<div class="d-flex flex-column gap-3">
  <div>
    <small class="text-muted">Primary</small>
    <hr class="border-primary border-2 opacity-100">
  </div>
  <div>
    <small class="text-muted">Success</small>
    <hr class="border-success border-2 opacity-100">
  </div>
  <div>
    <small class="text-muted">Danger</small>
    <hr class="border-danger border-2 opacity-100">
  </div>
  <div>
    <small class="text-muted">Warning</small>
    <hr class="border-warning border-2 opacity-100">
  </div>
  <div>
    <small class="text-muted">Info</small>
    <hr class="border-info border-2 opacity-100">
  </div>
</div>
  `},r={render:()=>`
<div class="d-flex flex-column gap-3">
  <div>
    <small class="text-muted">border-1 (padrão)</small>
    <hr class="border-1 opacity-100">
  </div>
  <div>
    <small class="text-muted">border-2</small>
    <hr class="border-2 opacity-100">
  </div>
  <div>
    <small class="text-muted">border-3</small>
    <hr class="border-3 opacity-100">
  </div>
  <div>
    <small class="text-muted">border-4</small>
    <hr class="border-4 opacity-100">
  </div>
  <div>
    <small class="text-muted">border-5</small>
    <hr class="border-5 opacity-100">
  </div>
</div>
  `},d={render:()=>`
<div class="d-flex flex-column gap-4">
  <!-- Divisor com texto central -->
  <div class="d-flex align-items-center">
    <hr class="flex-grow-1 m-0">
    <span class="px-3 text-muted">ou</span>
    <hr class="flex-grow-1 m-0">
  </div>
  
  <!-- Divisor com texto e ícone -->
  <div class="d-flex align-items-center">
    <hr class="flex-grow-1 m-0">
    <span class="px-3 text-muted">
      <i class="ti ti-star me-1"></i>Destaque
    </span>
    <hr class="flex-grow-1 m-0">
  </div>
  
  <!-- Divisor com badge -->
  <div class="d-flex align-items-center">
    <hr class="flex-grow-1 m-0 border-primary opacity-50">
    <span class="badge bg-primary mx-3">NOVO</span>
    <hr class="flex-grow-1 m-0 border-primary opacity-50">
  </div>
</div>
  `},n={render:()=>`
<div class="dropdown-menu d-block position-static" style="max-width: 200px;">
  <a class="dropdown-item" href="#">Perfil</a>
  <a class="dropdown-item" href="#">Configurações</a>
  <div class="dropdown-divider"></div>
  <a class="dropdown-item" href="#">Ajuda</a>
  <div class="dropdown-divider"></div>
  <a class="dropdown-item text-danger" href="#">Sair</a>
</div>
  `},t={render:()=>`
<div class="d-flex align-items-center gap-3">
  <span>Item 1</span>
  <div class="vr"></div>
  <span>Item 2</span>
  <div class="vr"></div>
  <span>Item 3</span>
</div>

<div class="d-flex align-items-center gap-3 mt-4">
  <button class="btn btn-sm btn-outline-primary">Editar</button>
  <div class="vr"></div>
  <button class="btn btn-sm btn-outline-success">Salvar</button>
  <div class="vr"></div>
  <button class="btn btn-sm btn-outline-danger">Excluir</button>
</div>
  `},i={render:()=>`
<div class="card" style="max-width: 400px;">
  <div class="card-header">
    <h5 class="card-title mb-0">Detalhes do Pedido</h5>
  </div>
  <div class="card-body">
    <div class="d-flex justify-content-between mb-2">
      <span>Subtotal</span>
      <span>R$ 150,00</span>
    </div>
    <div class="d-flex justify-content-between mb-2">
      <span>Frete</span>
      <span>R$ 15,00</span>
    </div>
    <div class="d-flex justify-content-between mb-2">
      <span>Desconto</span>
      <span class="text-success">-R$ 10,00</span>
    </div>
    
    <hr class="my-3">
    
    <div class="d-flex justify-content-between">
      <strong>Total</strong>
      <strong class="text-primary">R$ 155,00</strong>
    </div>
  </div>
</div>
  `},l={render:()=>`
<div class="d-flex flex-column gap-3">
  <div>
    <small class="text-muted">Linha tracejada</small>
    <hr style="border-style: dashed;">
  </div>
  <div>
    <small class="text-muted">Linha pontilhada</small>
    <hr style="border-style: dotted;">
  </div>
  <div>
    <small class="text-muted">Linha dupla</small>
    <hr style="border-style: double; border-width: 4px;">
  </div>
</div>
  `};var o,c,m;s.parameters={...s.parameters,docs:{...(o=s.parameters)==null?void 0:o.docs,source:{originalSource:`{
  render: () => \`
<div>
  <p>Conteúdo acima do divisor</p>
  <hr>
  <p>Conteúdo abaixo do divisor</p>
</div>
  \`
}`,...(m=(c=s.parameters)==null?void 0:c.docs)==null?void 0:m.source}}};var p,v,u;e.parameters={...e.parameters,docs:{...(p=e.parameters)==null?void 0:p.docs,source:{originalSource:`{
  render: () => \`
<div>
  <p>Margem padrão</p>
  <hr>
  
  <p>Margem pequena (my-2)</p>
  <hr class="my-2">
  
  <p>Margem grande (my-5)</p>
  <hr class="my-5">
  
  <p>Fim</p>
</div>
  \`
}`,...(u=(v=e.parameters)==null?void 0:v.docs)==null?void 0:u.source}}};var x,b,h;a.parameters={...a.parameters,docs:{...(x=a.parameters)==null?void 0:x.docs,source:{originalSource:`{
  render: () => \`
<div class="d-flex flex-column gap-3">
  <div>
    <small class="text-muted">Primary</small>
    <hr class="border-primary border-2 opacity-100">
  </div>
  <div>
    <small class="text-muted">Success</small>
    <hr class="border-success border-2 opacity-100">
  </div>
  <div>
    <small class="text-muted">Danger</small>
    <hr class="border-danger border-2 opacity-100">
  </div>
  <div>
    <small class="text-muted">Warning</small>
    <hr class="border-warning border-2 opacity-100">
  </div>
  <div>
    <small class="text-muted">Info</small>
    <hr class="border-info border-2 opacity-100">
  </div>
</div>
  \`
}`,...(h=(b=a.parameters)==null?void 0:b.docs)==null?void 0:h.source}}};var g,y,f;r.parameters={...r.parameters,docs:{...(g=r.parameters)==null?void 0:g.docs,source:{originalSource:`{
  render: () => \`
<div class="d-flex flex-column gap-3">
  <div>
    <small class="text-muted">border-1 (padrão)</small>
    <hr class="border-1 opacity-100">
  </div>
  <div>
    <small class="text-muted">border-2</small>
    <hr class="border-2 opacity-100">
  </div>
  <div>
    <small class="text-muted">border-3</small>
    <hr class="border-3 opacity-100">
  </div>
  <div>
    <small class="text-muted">border-4</small>
    <hr class="border-4 opacity-100">
  </div>
  <div>
    <small class="text-muted">border-5</small>
    <hr class="border-5 opacity-100">
  </div>
</div>
  \`
}`,...(f=(y=r.parameters)==null?void 0:y.docs)==null?void 0:f.source}}};var w,D,S;d.parameters={...d.parameters,docs:{...(w=d.parameters)==null?void 0:w.docs,source:{originalSource:`{
  render: () => \`
<div class="d-flex flex-column gap-4">
  <!-- Divisor com texto central -->
  <div class="d-flex align-items-center">
    <hr class="flex-grow-1 m-0">
    <span class="px-3 text-muted">ou</span>
    <hr class="flex-grow-1 m-0">
  </div>
  
  <!-- Divisor com texto e ícone -->
  <div class="d-flex align-items-center">
    <hr class="flex-grow-1 m-0">
    <span class="px-3 text-muted">
      <i class="ti ti-star me-1"></i>Destaque
    </span>
    <hr class="flex-grow-1 m-0">
  </div>
  
  <!-- Divisor com badge -->
  <div class="d-flex align-items-center">
    <hr class="flex-grow-1 m-0 border-primary opacity-50">
    <span class="badge bg-primary mx-3">NOVO</span>
    <hr class="flex-grow-1 m-0 border-primary opacity-50">
  </div>
</div>
  \`
}`,...(S=(D=d.parameters)==null?void 0:D.docs)==null?void 0:S.source}}};var j,C,I;n.parameters={...n.parameters,docs:{...(j=n.parameters)==null?void 0:j.docs,source:{originalSource:`{
  render: () => \`
<div class="dropdown-menu d-block position-static" style="max-width: 200px;">
  <a class="dropdown-item" href="#">Perfil</a>
  <a class="dropdown-item" href="#">Configurações</a>
  <div class="dropdown-divider"></div>
  <a class="dropdown-item" href="#">Ajuda</a>
  <div class="dropdown-divider"></div>
  <a class="dropdown-item text-danger" href="#">Sair</a>
</div>
  \`
}`,...(I=(C=n.parameters)==null?void 0:C.docs)==null?void 0:I.source}}};var E,L,M;t.parameters={...t.parameters,docs:{...(E=t.parameters)==null?void 0:E.docs,source:{originalSource:`{
  render: () => \`
<div class="d-flex align-items-center gap-3">
  <span>Item 1</span>
  <div class="vr"></div>
  <span>Item 2</span>
  <div class="vr"></div>
  <span>Item 3</span>
</div>

<div class="d-flex align-items-center gap-3 mt-4">
  <button class="btn btn-sm btn-outline-primary">Editar</button>
  <div class="vr"></div>
  <button class="btn btn-sm btn-outline-success">Salvar</button>
  <div class="vr"></div>
  <button class="btn btn-sm btn-outline-danger">Excluir</button>
</div>
  \`
}`,...(M=(L=t.parameters)==null?void 0:L.docs)==null?void 0:M.source}}};var R,$,F;i.parameters={...i.parameters,docs:{...(R=i.parameters)==null?void 0:R.docs,source:{originalSource:`{
  render: () => \`
<div class="card" style="max-width: 400px;">
  <div class="card-header">
    <h5 class="card-title mb-0">Detalhes do Pedido</h5>
  </div>
  <div class="card-body">
    <div class="d-flex justify-content-between mb-2">
      <span>Subtotal</span>
      <span>R$ 150,00</span>
    </div>
    <div class="d-flex justify-content-between mb-2">
      <span>Frete</span>
      <span>R$ 15,00</span>
    </div>
    <div class="d-flex justify-content-between mb-2">
      <span>Desconto</span>
      <span class="text-success">-R$ 10,00</span>
    </div>
    
    <hr class="my-3">
    
    <div class="d-flex justify-content-between">
      <strong>Total</strong>
      <strong class="text-primary">R$ 155,00</strong>
    </div>
  </div>
</div>
  \`
}`,...(F=($=i.parameters)==null?void 0:$.docs)==null?void 0:F.source}}};var T,V,W;l.parameters={...l.parameters,docs:{...(T=l.parameters)==null?void 0:T.docs,source:{originalSource:`{
  render: () => \`
<div class="d-flex flex-column gap-3">
  <div>
    <small class="text-muted">Linha tracejada</small>
    <hr style="border-style: dashed;">
  </div>
  <div>
    <small class="text-muted">Linha pontilhada</small>
    <hr style="border-style: dotted;">
  </div>
  <div>
    <small class="text-muted">Linha dupla</small>
    <hr style="border-style: double; border-width: 4px;">
  </div>
</div>
  \`
}`,...(W=(V=l.parameters)==null?void 0:V.docs)==null?void 0:W.source}}};const A=["Default","WithMargins","Colored","Thickness","WithText","DropdownDivider","VerticalDivider","InCard","Dashed"];export{a as Colored,l as Dashed,s as Default,n as DropdownDivider,i as InCard,r as Thickness,t as VerticalDivider,e as WithMargins,d as WithText,A as __namedExportsOrder,P as default};
