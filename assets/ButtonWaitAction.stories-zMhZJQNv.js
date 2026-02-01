const G={title:"Educacross Components V2/Forms/ButtonWaitAction",tags:["autodocs"],parameters:{docs:{description:{component:`
## ButtonWaitAction - Botão com Estado de Loading Educacross (Pixel Perfect)

Componente extraído diretamente de \`educacross-frontoffice/src/components/form/button/ButtonWaitAction.vue\`.

Este botão gerencia automaticamente o estado de loading durante ações assíncronas.

### Props do Componente Real

| Prop | Tipo | Default | Descrição |
|------|------|---------|-----------|
| \`label\` | String | required | Texto do botão |
| \`variant\` | String | 'primary' | Variante Bootstrap (primary, success, danger, etc.) |
| \`disabled\` | Boolean | false | Estado desabilitado |

### Comportamento

1. Ao clicar, o botão entra em estado de loading
2. Emite evento \`@click\` com uma Promise resolve
3. Quando a Promise é resolvida, o loading para
4. Durante loading, o botão fica desabilitado

### Events

- \`@click(resolve)\` - Emitido com função resolve para controlar o loading
        `}}}},n=`
<style>
  /* === ButtonWaitAction - CSS Pixel Perfect do Frontoffice === */
  
  :root {
    --primary: #6e63e8;
    --success: #28c76f;
    --danger: #ea5455;
    --warning: #ff9f43;
    --info: #00cfe8;
    --secondary: #82868b;
  }

  .btn-wait-action {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    font-weight: 500;
    padding: 0.786rem 1.5rem;
    border-radius: 0.358rem;
    border: none;
    cursor: pointer;
    transition: all 0.15s ease-in-out;
  }

  .btn-wait-action:disabled {
    opacity: 0.65;
    cursor: not-allowed;
  }

  /* Variants */
  .btn-wait-action.btn-primary {
    background-color: var(--primary);
    color: white;
  }
  .btn-wait-action.btn-primary:hover:not(:disabled) {
    background-color: #5a51d6;
    box-shadow: 0 8px 25px -8px rgba(110, 99, 232, 0.8);
  }

  .btn-wait-action.btn-success {
    background-color: var(--success);
    color: white;
  }
  .btn-wait-action.btn-success:hover:not(:disabled) {
    background-color: #24b263;
    box-shadow: 0 8px 25px -8px rgba(40, 199, 111, 0.8);
  }

  .btn-wait-action.btn-danger {
    background-color: var(--danger);
    color: white;
  }
  .btn-wait-action.btn-danger:hover:not(:disabled) {
    background-color: #e73d3e;
    box-shadow: 0 8px 25px -8px rgba(234, 84, 85, 0.8);
  }

  .btn-wait-action.btn-warning {
    background-color: var(--warning);
    color: white;
  }
  .btn-wait-action.btn-warning:hover:not(:disabled) {
    background-color: #ff8510;
    box-shadow: 0 8px 25px -8px rgba(255, 159, 67, 0.8);
  }

  .btn-wait-action.btn-info {
    background-color: var(--info);
    color: white;
  }

  .btn-wait-action.btn-secondary {
    background-color: var(--secondary);
    color: white;
  }

  /* Spinner */
  .btn-spinner {
    width: 1rem;
    height: 1rem;
    border: 2px solid rgba(255, 255, 255, 0.3);
    border-top-color: white;
    border-radius: 50%;
    animation: spin 0.75s linear infinite;
  }

  @keyframes spin {
    to { transform: rotate(360deg); }
  }

  /* Outline variants */
  .btn-wait-action.btn-outline-primary {
    background-color: transparent;
    border: 1px solid var(--primary);
    color: var(--primary);
  }
  .btn-wait-action.btn-outline-primary:hover:not(:disabled) {
    background-color: var(--primary);
    color: white;
  }
  .btn-wait-action.btn-outline-primary .btn-spinner {
    border-color: rgba(110, 99, 232, 0.3);
    border-top-color: var(--primary);
  }

  .btn-wait-action.btn-outline-success {
    background-color: transparent;
    border: 1px solid var(--success);
    color: var(--success);
  }
  .btn-wait-action.btn-outline-success:hover:not(:disabled) {
    background-color: var(--success);
    color: white;
  }

  .btn-wait-action.btn-outline-danger {
    background-color: transparent;
    border: 1px solid var(--danger);
    color: var(--danger);
  }
  .btn-wait-action.btn-outline-danger:hover:not(:disabled) {
    background-color: var(--danger);
    color: white;
  }

  /* Size variants */
  .btn-wait-action.btn-sm {
    padding: 0.486rem 1rem;
    font-size: 0.9rem;
  }

  .btn-wait-action.btn-lg {
    padding: 1rem 2rem;
    font-size: 1.1rem;
  }

  .btn-wait-action.btn-sm .btn-spinner {
    width: 0.8rem;
    height: 0.8rem;
  }

  .btn-wait-action.btn-lg .btn-spinner {
    width: 1.2rem;
    height: 1.2rem;
  }
</style>
`,t={render:()=>`
    ${n}
    <div class="p-4 d-flex gap-3">
      <button class="btn-wait-action btn-primary">
        Salvar
      </button>
      <button class="btn-wait-action btn-success">
        Confirmar
      </button>
      <button class="btn-wait-action btn-danger">
        Excluir
      </button>
      <button class="btn-wait-action btn-warning">
        Atenção
      </button>
    </div>
  `},a={render:()=>`
    ${n}
    <div class="p-4 d-flex gap-3">
      <button class="btn-wait-action btn-primary" disabled>
        <span class="btn-spinner"></span>
        Salvando...
      </button>
      <button class="btn-wait-action btn-success" disabled>
        <span class="btn-spinner"></span>
        Processando...
      </button>
      <button class="btn-wait-action btn-danger" disabled>
        <span class="btn-spinner"></span>
        Excluindo...
      </button>
    </div>
  `},o={render:()=>`
    ${n}
    <div class="p-4 d-flex gap-3">
      <button class="btn-wait-action btn-primary" disabled>
        Desabilitado
      </button>
      <button class="btn-wait-action btn-success" disabled>
        Desabilitado
      </button>
      <button class="btn-wait-action btn-danger" disabled>
        Desabilitado
      </button>
    </div>
  `},s={render:()=>`
    ${n}
    <div class="p-4">
      <div class="d-flex gap-3 mb-3">
        <button class="btn-wait-action btn-outline-primary">
          Primary
        </button>
        <button class="btn-wait-action btn-outline-success">
          Success
        </button>
        <button class="btn-wait-action btn-outline-danger">
          Danger
        </button>
      </div>
      <div class="d-flex gap-3">
        <button class="btn-wait-action btn-outline-primary" disabled>
          <span class="btn-spinner"></span>
          Loading...
        </button>
        <button class="btn-wait-action btn-outline-success" disabled>
          <span class="btn-spinner"></span>
          Loading...
        </button>
        <button class="btn-wait-action btn-outline-danger" disabled>
          <span class="btn-spinner"></span>
          Loading...
        </button>
      </div>
    </div>
  `},e={render:()=>`
    ${n}
    <div class="p-4 d-flex align-items-center gap-3">
      <button class="btn-wait-action btn-primary btn-sm">
        Pequeno
      </button>
      <button class="btn-wait-action btn-primary">
        Normal
      </button>
      <button class="btn-wait-action btn-primary btn-lg">
        Grande
      </button>
    </div>
    <div class="p-4 d-flex align-items-center gap-3">
      <button class="btn-wait-action btn-primary btn-sm" disabled>
        <span class="btn-spinner"></span>
        Carregando
      </button>
      <button class="btn-wait-action btn-primary" disabled>
        <span class="btn-spinner"></span>
        Carregando
      </button>
      <button class="btn-wait-action btn-primary btn-lg" disabled>
        <span class="btn-spinner"></span>
        Carregando
      </button>
    </div>
  `},i={render:()=>`
    ${n}
    <div class="p-4 d-flex gap-3">
      <button class="btn-wait-action btn-primary">
        <span class="material-symbols-outlined" style="font-size: 18px;">save</span>
        Salvar
      </button>
      <button class="btn-wait-action btn-success">
        <span class="material-symbols-outlined" style="font-size: 18px;">check</span>
        Confirmar
      </button>
      <button class="btn-wait-action btn-danger">
        <span class="material-symbols-outlined" style="font-size: 18px;">delete</span>
        Excluir
      </button>
    </div>
  `},r={render:()=>`
    ${n}
    <style>
      .form-demo {
        max-width: 400px;
        padding: 1.5rem;
        border: 1px solid #ebe9f1;
        border-radius: 0.428rem;
        background: white;
      }
      .form-demo .form-label {
        font-weight: 500;
        color: #5e5873;
        margin-bottom: 0.25rem;
      }
      .form-demo .form-control {
        width: 100%;
        padding: 0.571rem 1rem;
        border: 1px solid #d8d6de;
        border-radius: 0.357rem;
        margin-bottom: 1rem;
      }
      .form-demo .btn-group {
        display: flex;
        gap: 0.5rem;
        justify-content: flex-end;
      }
    </style>
    <div class="p-4">
      <div class="form-demo">
        <h5 class="mb-3">Editar Aluno</h5>
        <div>
          <label class="form-label">Nome</label>
          <input type="text" class="form-control" value="João Silva" />
        </div>
        <div>
          <label class="form-label">Email</label>
          <input type="email" class="form-control" value="joao@escola.com" />
        </div>
        <div class="btn-group">
          <button class="btn-wait-action btn-outline-secondary">
            Cancelar
          </button>
          <button class="btn-wait-action btn-primary" disabled>
            <span class="btn-spinner"></span>
            Salvando...
          </button>
        </div>
      </div>
    </div>
  `};var c,b,d,l,p;t.parameters={...t.parameters,docs:{...(c=t.parameters)==null?void 0:c.docs,source:{originalSource:`{
  render: () => \`
    \${buttonWaitStyles}
    <div class="p-4 d-flex gap-3">
      <button class="btn-wait-action btn-primary">
        Salvar
      </button>
      <button class="btn-wait-action btn-success">
        Confirmar
      </button>
      <button class="btn-wait-action btn-danger">
        Excluir
      </button>
      <button class="btn-wait-action btn-warning">
        Atenção
      </button>
    </div>
  \`
}`,...(d=(b=t.parameters)==null?void 0:b.docs)==null?void 0:d.source},description:{story:"Default - Botão normal",...(p=(l=t.parameters)==null?void 0:l.docs)==null?void 0:p.description}}};var u,m,g,w,v;a.parameters={...a.parameters,docs:{...(u=a.parameters)==null?void 0:u.docs,source:{originalSource:`{
  render: () => \`
    \${buttonWaitStyles}
    <div class="p-4 d-flex gap-3">
      <button class="btn-wait-action btn-primary" disabled>
        <span class="btn-spinner"></span>
        Salvando...
      </button>
      <button class="btn-wait-action btn-success" disabled>
        <span class="btn-spinner"></span>
        Processando...
      </button>
      <button class="btn-wait-action btn-danger" disabled>
        <span class="btn-spinner"></span>
        Excluindo...
      </button>
    </div>
  \`
}`,...(g=(m=a.parameters)==null?void 0:m.docs)==null?void 0:g.source},description:{story:"Loading - Estado de carregamento",...(v=(w=a.parameters)==null?void 0:w.docs)==null?void 0:v.description}}};var f,y,x,h,S;o.parameters={...o.parameters,docs:{...(f=o.parameters)==null?void 0:f.docs,source:{originalSource:`{
  render: () => \`
    \${buttonWaitStyles}
    <div class="p-4 d-flex gap-3">
      <button class="btn-wait-action btn-primary" disabled>
        Desabilitado
      </button>
      <button class="btn-wait-action btn-success" disabled>
        Desabilitado
      </button>
      <button class="btn-wait-action btn-danger" disabled>
        Desabilitado
      </button>
    </div>
  \`
}`,...(x=(y=o.parameters)==null?void 0:y.docs)==null?void 0:x.source},description:{story:"Disabled - Estado desabilitado",...(S=(h=o.parameters)==null?void 0:h.docs)==null?void 0:S.description}}};var E,k,C,D,W;s.parameters={...s.parameters,docs:{...(E=s.parameters)==null?void 0:E.docs,source:{originalSource:`{
  render: () => \`
    \${buttonWaitStyles}
    <div class="p-4">
      <div class="d-flex gap-3 mb-3">
        <button class="btn-wait-action btn-outline-primary">
          Primary
        </button>
        <button class="btn-wait-action btn-outline-success">
          Success
        </button>
        <button class="btn-wait-action btn-outline-danger">
          Danger
        </button>
      </div>
      <div class="d-flex gap-3">
        <button class="btn-wait-action btn-outline-primary" disabled>
          <span class="btn-spinner"></span>
          Loading...
        </button>
        <button class="btn-wait-action btn-outline-success" disabled>
          <span class="btn-spinner"></span>
          Loading...
        </button>
        <button class="btn-wait-action btn-outline-danger" disabled>
          <span class="btn-spinner"></span>
          Loading...
        </button>
      </div>
    </div>
  \`
}`,...(C=(k=s.parameters)==null?void 0:k.docs)==null?void 0:C.source},description:{story:"OutlineVariants - Variantes outline",...(W=(D=s.parameters)==null?void 0:D.docs)==null?void 0:W.description}}};var P,$,z,A,L;e.parameters={...e.parameters,docs:{...(P=e.parameters)==null?void 0:P.docs,source:{originalSource:`{
  render: () => \`
    \${buttonWaitStyles}
    <div class="p-4 d-flex align-items-center gap-3">
      <button class="btn-wait-action btn-primary btn-sm">
        Pequeno
      </button>
      <button class="btn-wait-action btn-primary">
        Normal
      </button>
      <button class="btn-wait-action btn-primary btn-lg">
        Grande
      </button>
    </div>
    <div class="p-4 d-flex align-items-center gap-3">
      <button class="btn-wait-action btn-primary btn-sm" disabled>
        <span class="btn-spinner"></span>
        Carregando
      </button>
      <button class="btn-wait-action btn-primary" disabled>
        <span class="btn-spinner"></span>
        Carregando
      </button>
      <button class="btn-wait-action btn-primary btn-lg" disabled>
        <span class="btn-spinner"></span>
        Carregando
      </button>
    </div>
  \`
}`,...(z=($=e.parameters)==null?void 0:$.docs)==null?void 0:z.source},description:{story:"Sizes - Tamanhos diferentes",...(L=(A=e.parameters)==null?void 0:A.docs)==null?void 0:L.description}}};var B,V,I,j,O;i.parameters={...i.parameters,docs:{...(B=i.parameters)==null?void 0:B.docs,source:{originalSource:`{
  render: () => \`
    \${buttonWaitStyles}
    <div class="p-4 d-flex gap-3">
      <button class="btn-wait-action btn-primary">
        <span class="material-symbols-outlined" style="font-size: 18px;">save</span>
        Salvar
      </button>
      <button class="btn-wait-action btn-success">
        <span class="material-symbols-outlined" style="font-size: 18px;">check</span>
        Confirmar
      </button>
      <button class="btn-wait-action btn-danger">
        <span class="material-symbols-outlined" style="font-size: 18px;">delete</span>
        Excluir
      </button>
    </div>
  \`
}`,...(I=(V=i.parameters)==null?void 0:V.docs)==null?void 0:I.source},description:{story:"WithIcons - Com ícones",...(O=(j=i.parameters)==null?void 0:j.docs)==null?void 0:O.description}}};var N,q,T,_,F;r.parameters={...r.parameters,docs:{...(N=r.parameters)==null?void 0:N.docs,source:{originalSource:`{
  render: () => \`
    \${buttonWaitStyles}
    <style>
      .form-demo {
        max-width: 400px;
        padding: 1.5rem;
        border: 1px solid #ebe9f1;
        border-radius: 0.428rem;
        background: white;
      }
      .form-demo .form-label {
        font-weight: 500;
        color: #5e5873;
        margin-bottom: 0.25rem;
      }
      .form-demo .form-control {
        width: 100%;
        padding: 0.571rem 1rem;
        border: 1px solid #d8d6de;
        border-radius: 0.357rem;
        margin-bottom: 1rem;
      }
      .form-demo .btn-group {
        display: flex;
        gap: 0.5rem;
        justify-content: flex-end;
      }
    </style>
    <div class="p-4">
      <div class="form-demo">
        <h5 class="mb-3">Editar Aluno</h5>
        <div>
          <label class="form-label">Nome</label>
          <input type="text" class="form-control" value="João Silva" />
        </div>
        <div>
          <label class="form-label">Email</label>
          <input type="email" class="form-control" value="joao@escola.com" />
        </div>
        <div class="btn-group">
          <button class="btn-wait-action btn-outline-secondary">
            Cancelar
          </button>
          <button class="btn-wait-action btn-primary" disabled>
            <span class="btn-spinner"></span>
            Salvando...
          </button>
        </div>
      </div>
    </div>
  \`
}`,...(T=(q=r.parameters)==null?void 0:q.docs)==null?void 0:T.source},description:{story:"InContext - Uso em formulário",...(F=(_=r.parameters)==null?void 0:_.docs)==null?void 0:F.description}}};const J=["Default","Loading","Disabled","OutlineVariants","Sizes","WithIcons","InContext"];export{t as Default,o as Disabled,r as InContext,a as Loading,s as OutlineVariants,e as Sizes,i as WithIcons,J as __namedExportsOrder,G as default};
