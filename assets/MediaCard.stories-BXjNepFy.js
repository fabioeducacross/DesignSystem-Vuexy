const O={title:"Educacross Components V2/Cards/MediaCard",tags:["autodocs"],parameters:{docs:{description:{component:"\n## MediaCard - Card de Mídia Educacross (Pixel Perfect)\n\nComponente extraído diretamente de `educacross-frontoffice/src/components/card/MediaCard.vue`.\n\nCard com ícone lateral, título, descrição e suporte a skeleton loading.\n\n### Props do Componente Real\n\n| Prop | Tipo | Default | Descrição |\n|------|------|---------|-----------|\n| `bgVariant` | String | '' | Background Bootstrap (light, primary, etc.) |\n| `titleColor` | String | '' | Cor do título |\n| `classVariant` | String | '' | Classes CSS adicionais |\n| `verticalAlign` | String | 'center' | Alinhamento vertical |\n| `tooltipText` | String | - | Texto do tooltip de info |\n| `title` | String | - | Título do card |\n| `icon` | String | '' | Ícone Material Symbols |\n| `variant` | String | '' | Variante de cor do ícone |\n| `rightAlign` | Boolean | false | Alinha mídia à direita |\n| `loading` | Boolean | false | Estado de carregamento |\n| `eventClick` | Function | - | Callback de clique |\n| `borderVariant` | String | '' | Cor da borda |\n\n### Slots\n\n- `#aside` - Conteúdo adicional ao lado do ícone\n- `#description` - Conteúdo principal do card\n        "}}}},a=`
<style>
  /* === MediaCard - CSS Pixel Perfect do Frontoffice === */
  
  :root {
    --primary: #6e63e8;
    --success: #28c76f;
    --danger: #ea5455;
    --warning: #ff9f43;
    --info: #00cfe8;
  }

  .media-card {
    background: white;
    border: 1px solid #ebe9f1;
    border-radius: 0.428rem;
    padding: 1.5rem;
    transition: all 0.3s ease;
  }

  .media-card.clickable {
    cursor: pointer;
  }

  .media-card.clickable:hover {
    box-shadow: 0 4px 24px 0 rgba(34, 41, 47, 0.1);
  }

  .media-card-body {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .media-card-body.vertical-top {
    align-items: flex-start;
  }

  .media-card-body.right-align {
    flex-direction: row-reverse;
  }

  /* Icon wrapper */
  .media-card-icon {
    width: 48px;
    height: 48px;
    border-radius: 0.428rem;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  .media-card-icon.bg-light-primary {
    background-color: rgba(110, 99, 232, 0.12);
    color: var(--primary);
  }

  .media-card-icon.bg-light-success {
    background-color: rgba(40, 199, 111, 0.12);
    color: var(--success);
  }

  .media-card-icon.bg-light-danger {
    background-color: rgba(234, 84, 85, 0.12);
    color: var(--danger);
  }

  .media-card-icon.bg-light-warning {
    background-color: rgba(255, 159, 67, 0.12);
    color: var(--warning);
  }

  .media-card-icon.bg-light-info {
    background-color: rgba(0, 207, 232, 0.12);
    color: var(--info);
  }

  .media-card-icon .material-symbols-outlined {
    font-size: 24px;
  }

  /* Content */
  .media-card-content {
    flex: 1;
  }

  .media-card-title {
    font-size: 1rem;
    font-weight: 400;
    color: #5e5873;
    margin-bottom: 0.25rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .media-card-title .icon-visibility {
    font-size: 16px;
    color: var(--primary);
    cursor: pointer;
  }

  .media-card-title .icon-info {
    font-size: 16px;
    color: #b9b9c3;
    cursor: help;
  }

  .media-card-description {
    font-size: 1.5rem;
    font-weight: 600;
    color: #5e5873;
    margin: 0;
  }

  /* Border variants */
  .media-card.border-primary {
    border-color: var(--primary);
  }

  .media-card.border-success {
    border-color: var(--success);
  }

  .media-card.border-danger {
    border-color: var(--danger);
  }

  /* Skeleton loading */
  .media-card-skeleton {
    height: 75px;
    background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
    background-size: 200% 100%;
    animation: skeleton-loading 1.5s infinite;
    border-radius: 0.428rem;
  }

  @keyframes skeleton-loading {
    0% { background-position: 200% 0; }
    100% { background-position: -200% 0; }
  }

  /* Responsive - hide icon on mobile */
  @media (max-width: 991px) {
    .media-card-icon.hide-mobile {
      display: none;
    }
  }
</style>
`,d={render:()=>`
    ${a}
    <div class="p-4" style="max-width: 350px;">
      <div class="media-card">
        <div class="media-card-body">
          <div class="media-card-icon bg-light-primary hide-mobile">
            <span class="material-symbols-outlined">school</span>
          </div>
          <div class="media-card-content">
            <h5 class="media-card-title">Total de Alunos</h5>
            <p class="media-card-description">1.234</p>
          </div>
        </div>
      </div>
    </div>
  `},i={render:()=>`
    ${a}
    <div class="p-4">
      <div class="row g-3">
        <div class="col-md-4">
          <div class="media-card">
            <div class="media-card-body">
              <div class="media-card-icon bg-light-primary">
                <span class="material-symbols-outlined">school</span>
              </div>
              <div class="media-card-content">
                <h5 class="media-card-title">Alunos Ativos</h5>
                <p class="media-card-description">1.234</p>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="media-card">
            <div class="media-card-body">
              <div class="media-card-icon bg-light-success">
                <span class="material-symbols-outlined">task_alt</span>
              </div>
              <div class="media-card-content">
                <h5 class="media-card-title">Atividades Concluídas</h5>
                <p class="media-card-description">5.678</p>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="media-card">
            <div class="media-card-body">
              <div class="media-card-icon bg-light-warning">
                <span class="material-symbols-outlined">pending</span>
              </div>
              <div class="media-card-content">
                <h5 class="media-card-title">Pendentes</h5>
                <p class="media-card-description">892</p>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="media-card">
            <div class="media-card-body">
              <div class="media-card-icon bg-light-danger">
                <span class="material-symbols-outlined">warning</span>
              </div>
              <div class="media-card-content">
                <h5 class="media-card-title">Atrasadas</h5>
                <p class="media-card-description">45</p>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="media-card">
            <div class="media-card-body">
              <div class="media-card-icon bg-light-info">
                <span class="material-symbols-outlined">info</span>
              </div>
              <div class="media-card-content">
                <h5 class="media-card-title">Total de Turmas</h5>
                <p class="media-card-description">42</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `},s={render:()=>`
    ${a}
    <div class="p-4" style="max-width: 350px;">
      <div class="media-card">
        <div class="media-card-body">
          <div class="media-card-icon bg-light-primary">
            <span class="material-symbols-outlined">school</span>
          </div>
          <div class="media-card-content">
            <h5 class="media-card-title">
              Média de Proficiência
              <span class="material-symbols-outlined icon-info" title="Média calculada com base em todas as atividades">info</span>
            </h5>
            <p class="media-card-description">78%</p>
          </div>
        </div>
      </div>
    </div>
  `},e={render:()=>`
    ${a}
    <div class="p-4" style="max-width: 350px;">
      <div class="media-card clickable">
        <div class="media-card-body">
          <div class="media-card-icon bg-light-success">
            <span class="material-symbols-outlined">groups</span>
          </div>
          <div class="media-card-content">
            <h5 class="media-card-title">
              5º Ano A
              <span class="material-symbols-outlined icon-visibility">visibility</span>
            </h5>
            <p class="media-card-description">32 alunos</p>
          </div>
        </div>
      </div>
    </div>
  `},c={render:()=>`
    ${a}
    <div class="p-4">
      <div class="row g-3">
        <div class="col-md-4">
          <div class="media-card">
            <div class="media-card-skeleton"></div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="media-card">
            <div class="media-card-skeleton"></div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="media-card">
            <div class="media-card-skeleton"></div>
          </div>
        </div>
      </div>
    </div>
  `},r={render:()=>`
    ${a}
    <div class="p-4" style="max-width: 350px;">
      <div class="media-card">
        <div class="media-card-body right-align">
          <div class="media-card-icon bg-light-primary">
            <span class="material-symbols-outlined">trending_up</span>
          </div>
          <div class="media-card-content" style="text-align: right;">
            <h5 class="media-card-title" style="justify-content: flex-end;">Crescimento</h5>
            <p class="media-card-description">+15%</p>
          </div>
        </div>
      </div>
    </div>
  `},n={render:()=>`
    ${a}
    <div class="p-4">
      <div class="row g-3">
        <div class="col-md-4">
          <div class="media-card border-primary">
            <div class="media-card-body">
              <div class="media-card-icon bg-light-primary">
                <span class="material-symbols-outlined">star</span>
              </div>
              <div class="media-card-content">
                <h5 class="media-card-title">Destaque</h5>
                <p class="media-card-description">Primary</p>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="media-card border-success">
            <div class="media-card-body">
              <div class="media-card-icon bg-light-success">
                <span class="material-symbols-outlined">check_circle</span>
              </div>
              <div class="media-card-content">
                <h5 class="media-card-title">Aprovado</h5>
                <p class="media-card-description">Success</p>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="media-card border-danger">
            <div class="media-card-body">
              <div class="media-card-icon bg-light-danger">
                <span class="material-symbols-outlined">error</span>
              </div>
              <div class="media-card-content">
                <h5 class="media-card-title">Atenção</h5>
                <p class="media-card-description">Danger</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `};var l,o,t,m,v;d.parameters={...d.parameters,docs:{...(l=d.parameters)==null?void 0:l.docs,source:{originalSource:`{
  render: () => \`
    \${mediaCardStyles}
    <div class="p-4" style="max-width: 350px;">
      <div class="media-card">
        <div class="media-card-body">
          <div class="media-card-icon bg-light-primary hide-mobile">
            <span class="material-symbols-outlined">school</span>
          </div>
          <div class="media-card-content">
            <h5 class="media-card-title">Total de Alunos</h5>
            <p class="media-card-description">1.234</p>
          </div>
        </div>
      </div>
    </div>
  \`
}`,...(t=(o=d.parameters)==null?void 0:o.docs)==null?void 0:t.source},description:{story:"Default - Card básico com ícone",...(v=(m=d.parameters)==null?void 0:m.docs)==null?void 0:v.description}}};var p,g,b,h,u;i.parameters={...i.parameters,docs:{...(p=i.parameters)==null?void 0:p.docs,source:{originalSource:`{
  render: () => \`
    \${mediaCardStyles}
    <div class="p-4">
      <div class="row g-3">
        <div class="col-md-4">
          <div class="media-card">
            <div class="media-card-body">
              <div class="media-card-icon bg-light-primary">
                <span class="material-symbols-outlined">school</span>
              </div>
              <div class="media-card-content">
                <h5 class="media-card-title">Alunos Ativos</h5>
                <p class="media-card-description">1.234</p>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="media-card">
            <div class="media-card-body">
              <div class="media-card-icon bg-light-success">
                <span class="material-symbols-outlined">task_alt</span>
              </div>
              <div class="media-card-content">
                <h5 class="media-card-title">Atividades Concluídas</h5>
                <p class="media-card-description">5.678</p>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="media-card">
            <div class="media-card-body">
              <div class="media-card-icon bg-light-warning">
                <span class="material-symbols-outlined">pending</span>
              </div>
              <div class="media-card-content">
                <h5 class="media-card-title">Pendentes</h5>
                <p class="media-card-description">892</p>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="media-card">
            <div class="media-card-body">
              <div class="media-card-icon bg-light-danger">
                <span class="material-symbols-outlined">warning</span>
              </div>
              <div class="media-card-content">
                <h5 class="media-card-title">Atrasadas</h5>
                <p class="media-card-description">45</p>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="media-card">
            <div class="media-card-body">
              <div class="media-card-icon bg-light-info">
                <span class="material-symbols-outlined">info</span>
              </div>
              <div class="media-card-content">
                <h5 class="media-card-title">Total de Turmas</h5>
                <p class="media-card-description">42</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  \`
}`,...(b=(g=i.parameters)==null?void 0:g.docs)==null?void 0:b.source},description:{story:"AllVariants - Todas as variantes de cor",...(u=(h=i.parameters)==null?void 0:h.docs)==null?void 0:u.description}}};var y,f,x,C,k;s.parameters={...s.parameters,docs:{...(y=s.parameters)==null?void 0:y.docs,source:{originalSource:`{
  render: () => \`
    \${mediaCardStyles}
    <div class="p-4" style="max-width: 350px;">
      <div class="media-card">
        <div class="media-card-body">
          <div class="media-card-icon bg-light-primary">
            <span class="material-symbols-outlined">school</span>
          </div>
          <div class="media-card-content">
            <h5 class="media-card-title">
              Média de Proficiência
              <span class="material-symbols-outlined icon-info" title="Média calculada com base em todas as atividades">info</span>
            </h5>
            <p class="media-card-description">78%</p>
          </div>
        </div>
      </div>
    </div>
  \`
}`,...(x=(f=s.parameters)==null?void 0:f.docs)==null?void 0:x.source},description:{story:"WithTooltip - Com ícone de informação",...(k=(C=s.parameters)==null?void 0:C.docs)==null?void 0:k.description}}};var S,A,w,E,T;e.parameters={...e.parameters,docs:{...(S=e.parameters)==null?void 0:S.docs,source:{originalSource:`{
  render: () => \`
    \${mediaCardStyles}
    <div class="p-4" style="max-width: 350px;">
      <div class="media-card clickable">
        <div class="media-card-body">
          <div class="media-card-icon bg-light-success">
            <span class="material-symbols-outlined">groups</span>
          </div>
          <div class="media-card-content">
            <h5 class="media-card-title">
              5º Ano A
              <span class="material-symbols-outlined icon-visibility">visibility</span>
            </h5>
            <p class="media-card-description">32 alunos</p>
          </div>
        </div>
      </div>
    </div>
  \`
}`,...(w=(A=e.parameters)==null?void 0:A.docs)==null?void 0:w.source},description:{story:"Clickable - Com ação de clique",...(T=(E=e.parameters)==null?void 0:E.docs)==null?void 0:T.description}}};var $,D,P,M,B;c.parameters={...c.parameters,docs:{...($=c.parameters)==null?void 0:$.docs,source:{originalSource:`{
  render: () => \`
    \${mediaCardStyles}
    <div class="p-4">
      <div class="row g-3">
        <div class="col-md-4">
          <div class="media-card">
            <div class="media-card-skeleton"></div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="media-card">
            <div class="media-card-skeleton"></div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="media-card">
            <div class="media-card-skeleton"></div>
          </div>
        </div>
      </div>
    </div>
  \`
}`,...(P=(D=c.parameters)==null?void 0:D.docs)==null?void 0:P.source},description:{story:"Loading - Estado de carregamento",...(B=(M=c.parameters)==null?void 0:M.docs)==null?void 0:B.description}}};var _,V,z,W,R;r.parameters={...r.parameters,docs:{...(_=r.parameters)==null?void 0:_.docs,source:{originalSource:`{
  render: () => \`
    \${mediaCardStyles}
    <div class="p-4" style="max-width: 350px;">
      <div class="media-card">
        <div class="media-card-body right-align">
          <div class="media-card-icon bg-light-primary">
            <span class="material-symbols-outlined">trending_up</span>
          </div>
          <div class="media-card-content" style="text-align: right;">
            <h5 class="media-card-title" style="justify-content: flex-end;">Crescimento</h5>
            <p class="media-card-description">+15%</p>
          </div>
        </div>
      </div>
    </div>
  \`
}`,...(z=(V=r.parameters)==null?void 0:V.docs)==null?void 0:z.source},description:{story:"RightAligned - Ícone à direita",...(R=(W=r.parameters)==null?void 0:W.docs)==null?void 0:R.description}}};var q,j,L,F,I;n.parameters={...n.parameters,docs:{...(q=n.parameters)==null?void 0:q.docs,source:{originalSource:`{
  render: () => \`
    \${mediaCardStyles}
    <div class="p-4">
      <div class="row g-3">
        <div class="col-md-4">
          <div class="media-card border-primary">
            <div class="media-card-body">
              <div class="media-card-icon bg-light-primary">
                <span class="material-symbols-outlined">star</span>
              </div>
              <div class="media-card-content">
                <h5 class="media-card-title">Destaque</h5>
                <p class="media-card-description">Primary</p>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="media-card border-success">
            <div class="media-card-body">
              <div class="media-card-icon bg-light-success">
                <span class="material-symbols-outlined">check_circle</span>
              </div>
              <div class="media-card-content">
                <h5 class="media-card-title">Aprovado</h5>
                <p class="media-card-description">Success</p>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="media-card border-danger">
            <div class="media-card-body">
              <div class="media-card-icon bg-light-danger">
                <span class="material-symbols-outlined">error</span>
              </div>
              <div class="media-card-content">
                <h5 class="media-card-title">Atenção</h5>
                <p class="media-card-description">Danger</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  \`
}`,...(L=(j=n.parameters)==null?void 0:j.docs)==null?void 0:L.source},description:{story:"WithBorder - Com borda colorida",...(I=(F=n.parameters)==null?void 0:F.docs)==null?void 0:I.description}}};const G=["Default","AllVariants","WithTooltip","Clickable","Loading","RightAligned","WithBorder"];export{i as AllVariants,e as Clickable,d as Default,c as Loading,r as RightAligned,n as WithBorder,s as WithTooltip,G as __namedExportsOrder,O as default};
