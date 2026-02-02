const G={title:"Educacross Components V2/Layout/Divider",tags:["autodocs"],parameters:{docs:{description:{component:`
## Divider - Divisor Educacross (Pixel Perfect)

Componentes extraídos de:
- \`educacross-frontoffice/src/components/divider/Divider.vue\`
- \`educacross-frontoffice/src/components/divider/VerticalDivider.vue\`

Divisores horizontal e vertical para separação de conteúdo.

### Divider (Horizontal)

Divisor horizontal com texto opcional no centro.

### VerticalDivider

Divisor vertical com suporte a variantes de cor.

| Prop | Tipo | Default | Descrição |
|------|------|---------|-----------|
| \`variant\` | String | - | Variante Bootstrap de cor |

### Uso

O divisor horizontal aceita slot para texto centralizado.
O divisor vertical usa a prop variant para cor.
        `}}}},i=`
<style>
  /* === Divider - CSS Pixel Perfect do Frontoffice === */
  
  :root {
    --primary: #6e63e8;
    --secondary: #82868b;
    --success: #28c76f;
    --danger: #ea5455;
    --warning: #ff9f43;
    --info: #00cfe8;
    --grey-light: #ebe9f1;
    --white: #fff;
  }

  /* Horizontal Divider */
  .divider {
    text-align: center;
    vertical-align: middle;
    position: relative;
    margin: 1rem 0;
  }

  .divider > span {
    background: var(--white);
    position: relative;
    z-index: 2;
    padding: 0 1rem;
    color: #5e5873;
    font-size: 0.9rem;
  }

  .divider::before {
    content: '';
    display: block;
    width: 100%;
    height: 1px;
    background-color: var(--grey-light);
    position: absolute;
    top: 50%;
    left: 0;
    z-index: 1;
  }

  /* Divider with text variants */
  .divider.divider-primary > span {
    color: var(--primary);
  }

  .divider.divider-success > span {
    color: var(--success);
  }

  .divider.divider-danger > span {
    color: var(--danger);
  }

  .divider.divider-warning > span {
    color: var(--warning);
  }

  /* Divider line variants */
  .divider.divider-primary::before {
    background-color: var(--primary);
    opacity: 0.5;
  }

  .divider.divider-success::before {
    background-color: var(--success);
    opacity: 0.5;
  }

  .divider.divider-danger::before {
    background-color: var(--danger);
    opacity: 0.5;
  }

  /* Vertical Divider */
  .vertical-divider {
    width: 1px;
    min-height: 100%;
    display: inline-block;
  }

  .vertical-divider.bg-primary {
    background-color: var(--primary);
  }

  .vertical-divider.bg-secondary {
    background-color: var(--secondary);
  }

  .vertical-divider.bg-success {
    background-color: var(--success);
  }

  .vertical-divider.bg-danger {
    background-color: var(--danger);
  }

  .vertical-divider.bg-warning {
    background-color: var(--warning);
  }

  .vertical-divider.bg-info {
    background-color: var(--info);
  }

  .vertical-divider.bg-light {
    background-color: var(--grey-light);
  }

  /* Divider styles */
  .divider.divider-dashed::before {
    border-top: 1px dashed var(--grey-light);
    background: transparent;
  }

  .divider.divider-dotted::before {
    border-top: 1px dotted var(--grey-light);
    background: transparent;
  }
</style>
`,r={render:()=>`
    ${i}
    <div class="p-4">
      <p>Conteúdo acima do divisor</p>
      <div class="divider">
        <span></span>
      </div>
      <p>Conteúdo abaixo do divisor</p>
    </div>
  `},e={render:()=>`
    ${i}
    <div class="p-4">
      <p>Primeiro parágrafo de conteúdo.</p>
      <div class="divider">
        <span>OU</span>
      </div>
      <p>Segundo parágrafo de conteúdo.</p>
    </div>
  `},a={render:()=>`
    ${i}
    <div class="p-4">
      <div class="divider">
        <span>Padrão</span>
      </div>
      <div class="divider divider-primary">
        <span>Primary</span>
      </div>
      <div class="divider divider-success">
        <span>Success</span>
      </div>
      <div class="divider divider-danger">
        <span>Danger</span>
      </div>
      <div class="divider divider-warning">
        <span>Warning</span>
      </div>
    </div>
  `},n={render:()=>`
    ${i}
    <div class="p-4">
      <p class="text-muted">Linha sólida (padrão)</p>
      <div class="divider">
        <span></span>
      </div>
      
      <p class="text-muted mt-4">Linha tracejada</p>
      <div class="divider divider-dashed">
        <span>DASHED</span>
      </div>
      
      <p class="text-muted mt-4">Linha pontilhada</p>
      <div class="divider divider-dotted">
        <span>DOTTED</span>
      </div>
    </div>
  `},d={render:()=>`
    ${i}
    <style>
      .vertical-demo {
        display: flex;
        align-items: stretch;
        height: 100px;
        gap: 1rem;
      }
      .vertical-demo > div:not(.vertical-divider) {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        background: #f8f8f8;
        border-radius: 0.428rem;
      }
    </style>
    <div class="p-4">
      <div class="vertical-demo">
        <div>Seção A</div>
        <div class="vertical-divider bg-light"></div>
        <div>Seção B</div>
        <div class="vertical-divider bg-primary"></div>
        <div>Seção C</div>
      </div>
    </div>
  `},s={render:()=>`
    ${i}
    <style>
      .vertical-variants {
        display: flex;
        gap: 2rem;
        height: 60px;
      }
      .vertical-variant-item {
        display: flex;
        align-items: center;
        gap: 0.5rem;
      }
      .variant-label {
        font-size: 0.85rem;
        color: #5e5873;
      }
    </style>
    <div class="p-4">
      <div class="vertical-variants">
        <div class="vertical-variant-item">
          <div class="vertical-divider bg-primary" style="height: 100%;"></div>
          <span class="variant-label">Primary</span>
        </div>
        <div class="vertical-variant-item">
          <div class="vertical-divider bg-success" style="height: 100%;"></div>
          <span class="variant-label">Success</span>
        </div>
        <div class="vertical-variant-item">
          <div class="vertical-divider bg-danger" style="height: 100%;"></div>
          <span class="variant-label">Danger</span>
        </div>
        <div class="vertical-variant-item">
          <div class="vertical-divider bg-warning" style="height: 100%;"></div>
          <span class="variant-label">Warning</span>
        </div>
        <div class="vertical-variant-item">
          <div class="vertical-divider bg-info" style="height: 100%;"></div>
          <span class="variant-label">Info</span>
        </div>
        <div class="vertical-variant-item">
          <div class="vertical-divider bg-secondary" style="height: 100%;"></div>
          <span class="variant-label">Secondary</span>
        </div>
      </div>
    </div>
  `},t={render:()=>`
    ${i}
    <style>
      .auth-form {
        max-width: 400px;
        padding: 2rem;
        border: 1px solid #ebe9f1;
        border-radius: 0.428rem;
        background: white;
      }
      .auth-form h4 {
        text-align: center;
        margin-bottom: 1.5rem;
        color: #5e5873;
      }
      .auth-form .form-control {
        width: 100%;
        padding: 0.571rem 1rem;
        border: 1px solid #d8d6de;
        border-radius: 0.357rem;
        margin-bottom: 1rem;
      }
      .auth-form .btn {
        width: 100%;
        padding: 0.786rem 1.5rem;
        border: none;
        border-radius: 0.358rem;
        cursor: pointer;
        font-weight: 500;
      }
      .auth-form .btn-primary {
        background: #6e63e8;
        color: white;
      }
      .auth-form .btn-outline-secondary {
        background: transparent;
        border: 1px solid #82868b;
        color: #82868b;
      }
      .social-btns {
        display: flex;
        gap: 0.5rem;
      }
      .social-btns .btn {
        flex: 1;
      }
    </style>
    <div class="p-4">
      <div class="auth-form">
        <h4>Entrar</h4>
        <input type="email" class="form-control" placeholder="Email" />
        <input type="password" class="form-control" placeholder="Senha" />
        <button class="btn btn-primary">Entrar</button>
        
        <div class="divider" style="margin: 1.5rem 0;">
          <span>ou continue com</span>
        </div>
        
        <div class="social-btns">
          <button class="btn btn-outline-secondary">Google</button>
          <button class="btn btn-outline-secondary">Microsoft</button>
        </div>
      </div>
    </div>
  `};var o,c,v,l,p;r.parameters={...r.parameters,docs:{...(o=r.parameters)==null?void 0:o.docs,source:{originalSource:`{
  render: () => \`
    \${dividerStyles}
    <div class="p-4">
      <p>Conteúdo acima do divisor</p>
      <div class="divider">
        <span></span>
      </div>
      <p>Conteúdo abaixo do divisor</p>
    </div>
  \`
}`,...(v=(c=r.parameters)==null?void 0:c.docs)==null?void 0:v.source},description:{story:"Default - Divisor simples",...(p=(l=r.parameters)==null?void 0:l.docs)==null?void 0:p.description}}};var m,g,b,u,h;e.parameters={...e.parameters,docs:{...(m=e.parameters)==null?void 0:m.docs,source:{originalSource:`{
  render: () => \`
    \${dividerStyles}
    <div class="p-4">
      <p>Primeiro parágrafo de conteúdo.</p>
      <div class="divider">
        <span>OU</span>
      </div>
      <p>Segundo parágrafo de conteúdo.</p>
    </div>
  \`
}`,...(b=(g=e.parameters)==null?void 0:g.docs)==null?void 0:b.source},description:{story:"WithText - Com texto central",...(h=(u=e.parameters)==null?void 0:u.docs)==null?void 0:h.description}}};var y,f,x,D,S;a.parameters={...a.parameters,docs:{...(y=a.parameters)==null?void 0:y.docs,source:{originalSource:`{
  render: () => \`
    \${dividerStyles}
    <div class="p-4">
      <div class="divider">
        <span>Padrão</span>
      </div>
      <div class="divider divider-primary">
        <span>Primary</span>
      </div>
      <div class="divider divider-success">
        <span>Success</span>
      </div>
      <div class="divider divider-danger">
        <span>Danger</span>
      </div>
      <div class="divider divider-warning">
        <span>Warning</span>
      </div>
    </div>
  \`
}`,...(x=(f=a.parameters)==null?void 0:f.docs)==null?void 0:x.source},description:{story:"ColorVariants - Variantes de cor",...(S=(D=a.parameters)==null?void 0:D.docs)==null?void 0:S.description}}};var w,E,k,V,C;n.parameters={...n.parameters,docs:{...(w=n.parameters)==null?void 0:w.docs,source:{originalSource:`{
  render: () => \`
    \${dividerStyles}
    <div class="p-4">
      <p class="text-muted">Linha sólida (padrão)</p>
      <div class="divider">
        <span></span>
      </div>
      
      <p class="text-muted mt-4">Linha tracejada</p>
      <div class="divider divider-dashed">
        <span>DASHED</span>
      </div>
      
      <p class="text-muted mt-4">Linha pontilhada</p>
      <div class="divider divider-dotted">
        <span>DOTTED</span>
      </div>
    </div>
  \`
}`,...(k=(E=n.parameters)==null?void 0:E.docs)==null?void 0:k.source},description:{story:"DashedAndDotted - Estilos de linha",...(C=(V=n.parameters)==null?void 0:V.docs)==null?void 0:C.description}}};var $,P,z,A,T;d.parameters={...d.parameters,docs:{...($=d.parameters)==null?void 0:$.docs,source:{originalSource:`{
  render: () => \`
    \${dividerStyles}
    <style>
      .vertical-demo {
        display: flex;
        align-items: stretch;
        height: 100px;
        gap: 1rem;
      }
      .vertical-demo > div:not(.vertical-divider) {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        background: #f8f8f8;
        border-radius: 0.428rem;
      }
    </style>
    <div class="p-4">
      <div class="vertical-demo">
        <div>Seção A</div>
        <div class="vertical-divider bg-light"></div>
        <div>Seção B</div>
        <div class="vertical-divider bg-primary"></div>
        <div>Seção C</div>
      </div>
    </div>
  \`
}`,...(z=(P=d.parameters)==null?void 0:P.docs)==null?void 0:z.source},description:{story:"VerticalDivider - Divisor vertical",...(T=(A=d.parameters)==null?void 0:A.docs)==null?void 0:T.description}}};var L,O,W,F,I;s.parameters={...s.parameters,docs:{...(L=s.parameters)==null?void 0:L.docs,source:{originalSource:`{
  render: () => \`
    \${dividerStyles}
    <style>
      .vertical-variants {
        display: flex;
        gap: 2rem;
        height: 60px;
      }
      .vertical-variant-item {
        display: flex;
        align-items: center;
        gap: 0.5rem;
      }
      .variant-label {
        font-size: 0.85rem;
        color: #5e5873;
      }
    </style>
    <div class="p-4">
      <div class="vertical-variants">
        <div class="vertical-variant-item">
          <div class="vertical-divider bg-primary" style="height: 100%;"></div>
          <span class="variant-label">Primary</span>
        </div>
        <div class="vertical-variant-item">
          <div class="vertical-divider bg-success" style="height: 100%;"></div>
          <span class="variant-label">Success</span>
        </div>
        <div class="vertical-variant-item">
          <div class="vertical-divider bg-danger" style="height: 100%;"></div>
          <span class="variant-label">Danger</span>
        </div>
        <div class="vertical-variant-item">
          <div class="vertical-divider bg-warning" style="height: 100%;"></div>
          <span class="variant-label">Warning</span>
        </div>
        <div class="vertical-variant-item">
          <div class="vertical-divider bg-info" style="height: 100%;"></div>
          <span class="variant-label">Info</span>
        </div>
        <div class="vertical-variant-item">
          <div class="vertical-divider bg-secondary" style="height: 100%;"></div>
          <span class="variant-label">Secondary</span>
        </div>
      </div>
    </div>
  \`
}`,...(W=(O=s.parameters)==null?void 0:O.docs)==null?void 0:W.source},description:{story:"VerticalVariants - Variantes verticais",...(I=(F=s.parameters)==null?void 0:F.docs)==null?void 0:I.description}}};var j,H,U,B,_;t.parameters={...t.parameters,docs:{...(j=t.parameters)==null?void 0:j.docs,source:{originalSource:`{
  render: () => \`
    \${dividerStyles}
    <style>
      .auth-form {
        max-width: 400px;
        padding: 2rem;
        border: 1px solid #ebe9f1;
        border-radius: 0.428rem;
        background: white;
      }
      .auth-form h4 {
        text-align: center;
        margin-bottom: 1.5rem;
        color: #5e5873;
      }
      .auth-form .form-control {
        width: 100%;
        padding: 0.571rem 1rem;
        border: 1px solid #d8d6de;
        border-radius: 0.357rem;
        margin-bottom: 1rem;
      }
      .auth-form .btn {
        width: 100%;
        padding: 0.786rem 1.5rem;
        border: none;
        border-radius: 0.358rem;
        cursor: pointer;
        font-weight: 500;
      }
      .auth-form .btn-primary {
        background: #6e63e8;
        color: white;
      }
      .auth-form .btn-outline-secondary {
        background: transparent;
        border: 1px solid #82868b;
        color: #82868b;
      }
      .social-btns {
        display: flex;
        gap: 0.5rem;
      }
      .social-btns .btn {
        flex: 1;
      }
    </style>
    <div class="p-4">
      <div class="auth-form">
        <h4>Entrar</h4>
        <input type="email" class="form-control" placeholder="Email" />
        <input type="password" class="form-control" placeholder="Senha" />
        <button class="btn btn-primary">Entrar</button>
        
        <div class="divider" style="margin: 1.5rem 0;">
          <span>ou continue com</span>
        </div>
        
        <div class="social-btns">
          <button class="btn btn-outline-secondary">Google</button>
          <button class="btn btn-outline-secondary">Microsoft</button>
        </div>
      </div>
    </div>
  \`
}`,...(U=(H=t.parameters)==null?void 0:H.docs)==null?void 0:U.source},description:{story:"InContext - Uso em formulário",...(_=(B=t.parameters)==null?void 0:B.docs)==null?void 0:_.description}}};const M=["Default","WithText","ColorVariants","DashedAndDotted","VerticalDivider","VerticalVariants","InContext"];export{a as ColorVariants,n as DashedAndDotted,r as Default,t as InContext,d as VerticalDivider,s as VerticalVariants,e as WithText,M as __namedExportsOrder,G as default};
