import{f as e}from"./feather-Jf-owMTG.js";import"./_commonjsHelpers-CqkleIqs.js";const ve={title:"Vuexy/Atoms/Data Display/Icon",tags:["autodocs"],parameters:{docs:{description:{component:`
## Feather Icons - Biblioteca Oficial Educacross

O Design System Educacross utiliza **Feather Icons** como biblioteca oficial de ícones.

### Componente Vue: FeatherIcon.vue

\`\`\`vue
<template>
  <FeatherIcon icon="home" size="24" />
  <FeatherIcon icon="user" size="18" />

  <!-- Com badge -->
  <FeatherIcon
    icon="bell"
    badge="5"
    badge-classes="badge-primary"
  />
</template>

<script setup>
import FeatherIcon from '@core/components/feather-icon/FeatherIcon.vue'
<\/script>
\`\`\`

### Props do Componente

| Prop | Tipo | Default | Descrição |
|------|------|---------|-----------|
| \`icon\` | String / Object | - | Nome do ícone (obrigatório) |
| \`size\` | String | '14' | Tamanho em pixels |
| \`badge\` | String / Number | null | Badge para notificações |
| \`badgeClasses\` | String / Array | 'badge-primary' | Classes do badge |

### Uso em HTML puro

\`\`\`html
<!-- SVG inline -->
<i data-feather="home"></i>
<i data-feather="user"></i>

<!-- Com JavaScript -->
<script>
  feather.replace()
<\/script>
\`\`\`

### Tamanhos

\`\`\`vue
<FeatherIcon icon="star" size="12" />  <!-- Extra small -->
<FeatherIcon icon="star" size="16" />  <!-- Small -->
<FeatherIcon icon="star" size="24" />  <!-- Medium (default) -->
<FeatherIcon icon="star" size="32" />  <!-- Large -->
<FeatherIcon icon="star" size="48" />  <!-- Extra large -->
\`\`\`

### Documentação completa
- [Feather Icons](https://feathericons.com/)
- [Vue Feather Icons](https://github.com/egoist/vue-feather-icons)
        `}}}},he=(t,s)=>{const a=e.icons[t]?e.icons[t].toSvg({width:24,height:24}):"";return`
<div class="d-flex flex-column align-items-center p-3 border rounded"
     style="min-width: 100px; cursor: pointer;"
     onclick="
       navigator.clipboard.writeText('${t}');
       const toast = document.createElement('div');
       toast.textContent = 'Copiado: ${t}';
       toast.style.cssText = 'position: fixed; top: 20px; right: 20px; background: #28a745; color: white; padding: 12px 24px; border-radius: 4px; z-index: 9999;';
       document.body.appendChild(toast);
       setTimeout(() => toast.remove(), 2000);
     ">
  ${a}
  <small class="text-muted text-center mt-2">${t}</small>
</div>
`},w=(t,s="24",a="")=>`
<div class="d-flex align-items-center gap-3 p-3 bg-light rounded">
  <div>
    ${e.icons[t].toSvg({width:s,height:s})}
  </div>
  <div class="font-monospace small">
    <div>&lt;FeatherIcon</div>
    <div class="ms-3">icon="${t}"</div>
    <div class="ms-3">size="${s}"</div>
    ${a?`<div class="ms-3">${a}</div>`:""}
    <div>/&gt;</div>
  </div>
</div>
`,n=t=>`
<div class="d-flex flex-wrap gap-3">
  ${t.map(s=>he(s)).join("")}
</div>
`,o={render:()=>`
<div class="mb-4">
  <h5 class="mb-3">Componente Vue - FeatherIcon.vue</h5>

  <div class="alert alert-info">
    <strong>Componente Oficial:</strong>
    <code>educacross-frontoffice/src/@core/components/feather-icon/FeatherIcon.vue</code>
  </div>

  <h6 class="mt-4 mb-3">Exemplos de Uso</h6>

  ${w("home","24")}
  ${w("user","18")}
  ${w("bell","24",'badge="5" badge-classes="badge-primary"')}

  <div class="mt-4">
    <h6 class="mb-3">Tamanhos Disponíveis</h6>
    <div class="d-flex gap-4 align-items-center">
      ${e.icons.star.toSvg({width:12,height:12})}
      <span class="text-muted">12px</span>
      ${e.icons.star.toSvg({width:16,height:16})}
      <span class="text-muted">16px</span>
      ${e.icons.star.toSvg({width:24,height:24})}
      <span class="text-muted">24px (padrão)</span>
      ${e.icons.star.toSvg({width:32,height:32})}
      <span class="text-muted">32px</span>
      ${e.icons.star.toSvg({width:48,height:48})}
      <span class="text-muted">48px</span>
    </div>
  </div>
</div>
  `},c={render:()=>`
<div class="mb-4">
  <h5 class="mb-3">Ícones Mais Usados</h5>
  <p class="text-muted small">Clique em um ícone para copiar o nome</p>
  ${n(["home","user","settings","search","bell","mail","calendar","file","folder","heart","star","check","x","plus","minus","edit-2","trash-2","download","upload","refresh-cw"])}
</div>
  `},i={render:()=>`
<div class="mb-4">
  <h5 class="mb-3">Navegação</h5>
  ${n(["menu","arrow-left","arrow-right","arrow-up","arrow-down","chevron-left","chevron-right","chevron-up","chevron-down","chevrons-left","chevrons-right","external-link","link","log-out","log-in"])}
</div>
  `},r={render:()=>`
<div class="mb-4">
  <h5 class="mb-3">Ações</h5>
  ${n(["plus","minus","edit","edit-2","trash","trash-2","copy","clipboard","share","share-2","send","download","upload","printer","eye","eye-off","lock","unlock"])}
</div>
  `},l={render:()=>`
<div class="mb-4">
  <h5 class="mb-3">Status & Feedback</h5>
  ${n(["check","check-circle","x","x-circle","alert-circle","alert-triangle","info","help-circle","loader","clock"])}
</div>
  `},d={render:()=>`
<div class="mb-4">
  <h5 class="mb-3">Mídia</h5>
  ${n(["image","camera","video","music","mic","play","pause","stop-circle","volume-2","volume-x"])}
</div>
  `},m={render:()=>`
<div class="mb-4">
  <h5 class="mb-3">Comunicação</h5>
  ${n(["mail","inbox","send","message-circle","message-square","phone","phone-call","at-sign","bell","bell-off"])}
</div>
  `},h={render:()=>`
<div class="mb-4">
  <h5 class="mb-3">Comércio & Finanças</h5>
  ${n(["shopping-cart","shopping-bag","credit-card","dollar-sign","tag","percent","gift","truck","package"])}
</div>
  `},p={render:()=>`
<div class="mb-4">
  <h5 class="mb-3">Gráficos & Dados</h5>
  ${n(["bar-chart","bar-chart-2","pie-chart","activity","trending-up","trending-down","database","server"])}
</div>
  `},g={render:()=>`
<div class="mb-4">
  <h5 class="mb-3">Arquivos & Documentos</h5>
  ${n(["file","file-text","file-plus","file-minus","folder","folder-plus","archive","save","paperclip"])}
</div>
  `},v={render:()=>`
<div class="mb-4">
  <h5 class="mb-3">Desenvolvimento</h5>
  ${n(["code","terminal","git-branch","git-commit","git-merge","github","gitlab","package","box"])}
</div>
  `},u={render:()=>`
<div class="mb-4">
  <h5 class="mb-3">Tamanhos</h5>
  <div class="d-flex gap-4 align-items-end">
    <div class="text-center">
      ${e.icons.star.toSvg({width:12,height:12})}
      <small class="text-muted d-block mt-2">12px</small>
    </div>
    <div class="text-center">
      ${e.icons.star.toSvg({width:16,height:16})}
      <small class="text-muted d-block mt-2">16px</small>
    </div>
    <div class="text-center">
      ${e.icons.star.toSvg({width:24,height:24})}
      <small class="text-muted d-block mt-2">24px</small>
    </div>
    <div class="text-center">
      ${e.icons.star.toSvg({width:32,height:32})}
      <small class="text-muted d-block mt-2">32px</small>
    </div>
    <div class="text-center">
      ${e.icons.star.toSvg({width:48,height:48})}
      <small class="text-muted d-block mt-2">48px</small>
    </div>
    <div class="text-center">
      ${e.icons.star.toSvg({width:64,height:64})}
      <small class="text-muted d-block mt-2">64px</small>
    </div>
  </div>
</div>
  `},b={render:()=>`
<div class="mb-4">
  <h5 class="mb-3">Cores</h5>
  <div class="d-flex gap-4 align-items-center flex-wrap">
    <div class="text-center">
      ${e.icons.heart.toSvg({width:32,height:32,class:"text-primary"})}
      <small class="text-muted d-block">primary</small>
    </div>
    <div class="text-center">
      ${e.icons.heart.toSvg({width:32,height:32,class:"text-secondary"})}
      <small class="text-muted d-block">secondary</small>
    </div>
    <div class="text-center">
      ${e.icons.heart.toSvg({width:32,height:32,class:"text-success"})}
      <small class="text-muted d-block">success</small>
    </div>
    <div class="text-center">
      ${e.icons.heart.toSvg({width:32,height:32,class:"text-danger"})}
      <small class="text-muted d-block">danger</small>
    </div>
    <div class="text-center">
      ${e.icons.heart.toSvg({width:32,height:32,class:"text-warning"})}
      <small class="text-muted d-block">warning</small>
    </div>
    <div class="text-center">
      ${e.icons.heart.toSvg({width:32,height:32,class:"text-info"})}
      <small class="text-muted d-block">info</small>
    </div>
    <div class="text-center">
      ${e.icons.heart.toSvg({width:32,height:32,class:"text-dark"})}
      <small class="text-muted d-block">dark</small>
    </div>
    <div class="text-center bg-dark p-2 rounded">
      ${e.icons.heart.toSvg({width:32,height:32,class:"text-light"})}
      <small class="text-light d-block">light</small>
    </div>
  </div>
</div>
  `},x={render:()=>`
<div class="d-flex gap-3 flex-wrap">
  <button class="btn btn-primary">
    ${e.icons.plus.toSvg({width:16,height:16,class:"me-2"})}
    Adicionar
  </button>
  <button class="btn btn-success">
    ${e.icons.check.toSvg({width:16,height:16,class:"me-2"})}
    Salvar
  </button>
  <button class="btn btn-danger">
    ${e.icons["trash-2"].toSvg({width:16,height:16,class:"me-2"})}
    Excluir
  </button>
  <button class="btn btn-outline-primary">
    ${e.icons.download.toSvg({width:16,height:16,class:"me-2"})}
    Download
  </button>
  <button class="btn btn-icon btn-primary">
    ${e.icons.settings.toSvg({width:20,height:20})}
  </button>
  <button class="btn btn-icon btn-outline-secondary">
    ${e.icons.bell.toSvg({width:20,height:20})}
  </button>
</div>
  `},f={render:()=>{const t=Object.keys(e.icons).slice(0,100);return`
<div class="card">
  <div class="card-header">
    <h5 class="card-title mb-0">Buscar Ícone Feather</h5>
  </div>
  <div class="card-body">
    <div class="input-group mb-4">
      <span class="input-group-text">${e.icons.search.toSvg({width:16,height:16})}</span>
      <input type="text" class="form-control" id="icon-search" placeholder="Digite o nome do ícone..." oninput="
        const query = this.value.toLowerCase();
        const icons = document.querySelectorAll('#icon-grid > div');
        let count = 0;
        icons.forEach(icon => {
          const name = icon.dataset.name;
          const visible = name.includes(query);
          icon.style.display = visible ? 'flex' : 'none';
          if (visible) count++;
        });
        document.getElementById('icon-count').textContent = count + ' ícones encontrados';
      ">
    </div>

    <p class="text-muted small mb-3" id="icon-count">${t.length} ícones encontrados</p>

    <div id="icon-grid" class="d-flex flex-wrap gap-2" style="max-height: 500px; overflow-y: auto;">
      ${t.map(s=>{const a=e.icons[s].toSvg({width:24,height:24});return`
          <div data-name="${s}"
               class="d-flex flex-column align-items-center p-2 border rounded"
               style="width: 90px; cursor: pointer; transition: all 0.2s;"
               onmouseover="this.style.borderColor='#7367f0'; this.style.backgroundColor='#f8f7ff';"
               onmouseout="this.style.borderColor=''; this.style.backgroundColor='';"
               onclick="
                 navigator.clipboard.writeText('${s}');
                 const toast = document.createElement('div');
                 toast.innerHTML = '${e.icons.check.toSvg({width:16,height:16})} Copiado: <strong>${s}</strong>';
                 toast.style.cssText = 'position: fixed; top: 20px; right: 20px; background: #28a745; color: white; padding: 12px 24px; border-radius: 4px; z-index: 9999; display: flex; align-items: center; gap: 8px;';
                 document.body.appendChild(toast);
                 setTimeout(() => toast.remove(), 2000);
               ">
            ${a}
            <small class="text-muted text-center mt-1" style="font-size: 9px; word-break: break-all;">${s}</small>
          </div>
        `}).join("")}
    </div>

    <div class="mt-4 p-3 bg-light rounded">
      <p class="small mb-2">
        ${e.icons.info.toSvg({width:16,height:16,class:"me-2"})}
        <strong>Dica:</strong> Clique em um ícone para copiar o nome.
      </p>
      <p class="small mb-0">
        <a href="https://feathericons.com/" target="_blank" class="text-decoration-none">
          ${e.icons["external-link"].toSvg({width:14,height:14,class:"me-1"})}
          Ver todos os ${Object.keys(e.icons).length} ícones no site oficial →
        </a>
      </p>
    </div>
  </div>
</div>
    `}};var $,S,k;o.parameters={...o.parameters,docs:{...($=o.parameters)==null?void 0:$.docs,source:{originalSource:`{
  render: () => \`
<div class="mb-4">
  <h5 class="mb-3">Componente Vue - FeatherIcon.vue</h5>

  <div class="alert alert-info">
    <strong>Componente Oficial:</strong>
    <code>educacross-frontoffice/src/@core/components/feather-icon/FeatherIcon.vue</code>
  </div>

  <h6 class="mt-4 mb-3">Exemplos de Uso</h6>

  \${vueExample('home', '24')}
  \${vueExample('user', '18')}
  \${vueExample('bell', '24', 'badge="5" badge-classes="badge-primary"')}

  <div class="mt-4">
    <h6 class="mb-3">Tamanhos Disponíveis</h6>
    <div class="d-flex gap-4 align-items-center">
      \${feather.icons.star.toSvg({
    width: 12,
    height: 12
  })}
      <span class="text-muted">12px</span>
      \${feather.icons.star.toSvg({
    width: 16,
    height: 16
  })}
      <span class="text-muted">16px</span>
      \${feather.icons.star.toSvg({
    width: 24,
    height: 24
  })}
      <span class="text-muted">24px (padrão)</span>
      \${feather.icons.star.toSvg({
    width: 32,
    height: 32
  })}
      <span class="text-muted">32px</span>
      \${feather.icons.star.toSvg({
    width: 48,
    height: 48
  })}
      <span class="text-muted">48px</span>
    </div>
  </div>
</div>
  \`
}`,...(k=(S=o.parameters)==null?void 0:S.docs)==null?void 0:k.source}}};var y,C,I;c.parameters={...c.parameters,docs:{...(y=c.parameters)==null?void 0:y.docs,source:{originalSource:`{
  render: () => \`
<div class="mb-4">
  <h5 class="mb-3">Ícones Mais Usados</h5>
  <p class="text-muted small">Clique em um ícone para copiar o nome</p>
  \${iconGrid(['home', 'user', 'settings', 'search', 'bell', 'mail', 'calendar', 'file', 'folder', 'heart', 'star', 'check', 'x', 'plus', 'minus', 'edit-2', 'trash-2', 'download', 'upload', 'refresh-cw'])}
</div>
  \`
}`,...(I=(C=c.parameters)==null?void 0:C.docs)==null?void 0:I.source}}};var E,D,F;i.parameters={...i.parameters,docs:{...(E=i.parameters)==null?void 0:E.docs,source:{originalSource:`{
  render: () => \`
<div class="mb-4">
  <h5 class="mb-3">Navegação</h5>
  \${iconGrid(['menu', 'arrow-left', 'arrow-right', 'arrow-up', 'arrow-down', 'chevron-left', 'chevron-right', 'chevron-up', 'chevron-down', 'chevrons-left', 'chevrons-right', 'external-link', 'link', 'log-out', 'log-in'])}
</div>
  \`
}`,...(F=(D=i.parameters)==null?void 0:D.docs)==null?void 0:F.source}}};var T,z,q;r.parameters={...r.parameters,docs:{...(T=r.parameters)==null?void 0:T.docs,source:{originalSource:`{
  render: () => \`
<div class="mb-4">
  <h5 class="mb-3">Ações</h5>
  \${iconGrid(['plus', 'minus', 'edit', 'edit-2', 'trash', 'trash-2', 'copy', 'clipboard', 'share', 'share-2', 'send', 'download', 'upload', 'printer', 'eye', 'eye-off', 'lock', 'unlock'])}
</div>
  \`
}`,...(q=(z=r.parameters)==null?void 0:z.docs)==null?void 0:q.source}}};var G,A,M;l.parameters={...l.parameters,docs:{...(G=l.parameters)==null?void 0:G.docs,source:{originalSource:`{
  render: () => \`
<div class="mb-4">
  <h5 class="mb-3">Status & Feedback</h5>
  \${iconGrid(['check', 'check-circle', 'x', 'x-circle', 'alert-circle', 'alert-triangle', 'info', 'help-circle', 'loader', 'clock'])}
</div>
  \`
}`,...(M=(A=l.parameters)==null?void 0:A.docs)==null?void 0:M.source}}};var O,V,B;d.parameters={...d.parameters,docs:{...(O=d.parameters)==null?void 0:O.docs,source:{originalSource:`{
  render: () => \`
<div class="mb-4">
  <h5 class="mb-3">Mídia</h5>
  \${iconGrid(['image', 'camera', 'video', 'music', 'mic', 'play', 'pause', 'stop-circle', 'volume-2', 'volume-x'])}
</div>
  \`
}`,...(B=(V=d.parameters)==null?void 0:V.docs)==null?void 0:B.source}}};var j,L,U;m.parameters={...m.parameters,docs:{...(j=m.parameters)==null?void 0:j.docs,source:{originalSource:`{
  render: () => \`
<div class="mb-4">
  <h5 class="mb-3">Comunicação</h5>
  \${iconGrid(['mail', 'inbox', 'send', 'message-circle', 'message-square', 'phone', 'phone-call', 'at-sign', 'bell', 'bell-off'])}
</div>
  \`
}`,...(U=(L=m.parameters)==null?void 0:L.docs)==null?void 0:U.source}}};var _,H,N;h.parameters={...h.parameters,docs:{...(_=h.parameters)==null?void 0:_.docs,source:{originalSource:`{
  render: () => \`
<div class="mb-4">
  <h5 class="mb-3">Comércio & Finanças</h5>
  \${iconGrid(['shopping-cart', 'shopping-bag', 'credit-card', 'dollar-sign', 'tag', 'percent', 'gift', 'truck', 'package'])}
</div>
  \`
}`,...(N=(H=h.parameters)==null?void 0:H.docs)==null?void 0:N.source}}};var P,W,J;p.parameters={...p.parameters,docs:{...(P=p.parameters)==null?void 0:P.docs,source:{originalSource:`{
  render: () => \`
<div class="mb-4">
  <h5 class="mb-3">Gráficos & Dados</h5>
  \${iconGrid(['bar-chart', 'bar-chart-2', 'pie-chart', 'activity', 'trending-up', 'trending-down', 'database', 'server'])}
</div>
  \`
}`,...(J=(W=p.parameters)==null?void 0:W.docs)==null?void 0:J.source}}};var K,Q,R;g.parameters={...g.parameters,docs:{...(K=g.parameters)==null?void 0:K.docs,source:{originalSource:`{
  render: () => \`
<div class="mb-4">
  <h5 class="mb-3">Arquivos & Documentos</h5>
  \${iconGrid(['file', 'file-text', 'file-plus', 'file-minus', 'folder', 'folder-plus', 'archive', 'save', 'paperclip'])}
</div>
  \`
}`,...(R=(Q=g.parameters)==null?void 0:Q.docs)==null?void 0:R.source}}};var X,Y,Z;v.parameters={...v.parameters,docs:{...(X=v.parameters)==null?void 0:X.docs,source:{originalSource:`{
  render: () => \`
<div class="mb-4">
  <h5 class="mb-3">Desenvolvimento</h5>
  \${iconGrid(['code', 'terminal', 'git-branch', 'git-commit', 'git-merge', 'github', 'gitlab', 'package', 'box'])}
</div>
  \`
}`,...(Z=(Y=v.parameters)==null?void 0:Y.docs)==null?void 0:Z.source}}};var ee,te,se;u.parameters={...u.parameters,docs:{...(ee=u.parameters)==null?void 0:ee.docs,source:{originalSource:`{
  render: () => \`
<div class="mb-4">
  <h5 class="mb-3">Tamanhos</h5>
  <div class="d-flex gap-4 align-items-end">
    <div class="text-center">
      \${feather.icons.star.toSvg({
    width: 12,
    height: 12
  })}
      <small class="text-muted d-block mt-2">12px</small>
    </div>
    <div class="text-center">
      \${feather.icons.star.toSvg({
    width: 16,
    height: 16
  })}
      <small class="text-muted d-block mt-2">16px</small>
    </div>
    <div class="text-center">
      \${feather.icons.star.toSvg({
    width: 24,
    height: 24
  })}
      <small class="text-muted d-block mt-2">24px</small>
    </div>
    <div class="text-center">
      \${feather.icons.star.toSvg({
    width: 32,
    height: 32
  })}
      <small class="text-muted d-block mt-2">32px</small>
    </div>
    <div class="text-center">
      \${feather.icons.star.toSvg({
    width: 48,
    height: 48
  })}
      <small class="text-muted d-block mt-2">48px</small>
    </div>
    <div class="text-center">
      \${feather.icons.star.toSvg({
    width: 64,
    height: 64
  })}
      <small class="text-muted d-block mt-2">64px</small>
    </div>
  </div>
</div>
  \`
}`,...(se=(te=u.parameters)==null?void 0:te.docs)==null?void 0:se.source}}};var ne,ae,oe;b.parameters={...b.parameters,docs:{...(ne=b.parameters)==null?void 0:ne.docs,source:{originalSource:`{
  render: () => \`
<div class="mb-4">
  <h5 class="mb-3">Cores</h5>
  <div class="d-flex gap-4 align-items-center flex-wrap">
    <div class="text-center">
      \${feather.icons.heart.toSvg({
    width: 32,
    height: 32,
    class: 'text-primary'
  })}
      <small class="text-muted d-block">primary</small>
    </div>
    <div class="text-center">
      \${feather.icons.heart.toSvg({
    width: 32,
    height: 32,
    class: 'text-secondary'
  })}
      <small class="text-muted d-block">secondary</small>
    </div>
    <div class="text-center">
      \${feather.icons.heart.toSvg({
    width: 32,
    height: 32,
    class: 'text-success'
  })}
      <small class="text-muted d-block">success</small>
    </div>
    <div class="text-center">
      \${feather.icons.heart.toSvg({
    width: 32,
    height: 32,
    class: 'text-danger'
  })}
      <small class="text-muted d-block">danger</small>
    </div>
    <div class="text-center">
      \${feather.icons.heart.toSvg({
    width: 32,
    height: 32,
    class: 'text-warning'
  })}
      <small class="text-muted d-block">warning</small>
    </div>
    <div class="text-center">
      \${feather.icons.heart.toSvg({
    width: 32,
    height: 32,
    class: 'text-info'
  })}
      <small class="text-muted d-block">info</small>
    </div>
    <div class="text-center">
      \${feather.icons.heart.toSvg({
    width: 32,
    height: 32,
    class: 'text-dark'
  })}
      <small class="text-muted d-block">dark</small>
    </div>
    <div class="text-center bg-dark p-2 rounded">
      \${feather.icons.heart.toSvg({
    width: 32,
    height: 32,
    class: 'text-light'
  })}
      <small class="text-light d-block">light</small>
    </div>
  </div>
</div>
  \`
}`,...(oe=(ae=b.parameters)==null?void 0:ae.docs)==null?void 0:oe.source}}};var ce,ie,re;x.parameters={...x.parameters,docs:{...(ce=x.parameters)==null?void 0:ce.docs,source:{originalSource:`{
  render: () => \`
<div class="d-flex gap-3 flex-wrap">
  <button class="btn btn-primary">
    \${feather.icons.plus.toSvg({
    width: 16,
    height: 16,
    class: 'me-2'
  })}
    Adicionar
  </button>
  <button class="btn btn-success">
    \${feather.icons.check.toSvg({
    width: 16,
    height: 16,
    class: 'me-2'
  })}
    Salvar
  </button>
  <button class="btn btn-danger">
    \${feather.icons['trash-2'].toSvg({
    width: 16,
    height: 16,
    class: 'me-2'
  })}
    Excluir
  </button>
  <button class="btn btn-outline-primary">
    \${feather.icons.download.toSvg({
    width: 16,
    height: 16,
    class: 'me-2'
  })}
    Download
  </button>
  <button class="btn btn-icon btn-primary">
    \${feather.icons.settings.toSvg({
    width: 20,
    height: 20
  })}
  </button>
  <button class="btn btn-icon btn-outline-secondary">
    \${feather.icons.bell.toSvg({
    width: 20,
    height: 20
  })}
  </button>
</div>
  \`
}`,...(re=(ie=x.parameters)==null?void 0:ie.docs)==null?void 0:re.source}}};var le,de,me;f.parameters={...f.parameters,docs:{...(le=f.parameters)==null?void 0:le.docs,source:{originalSource:`{
  render: () => {
    const allIcons = Object.keys(feather.icons).slice(0, 100); // Primeiros 100 ícones

    return \`
<div class="card">
  <div class="card-header">
    <h5 class="card-title mb-0">Buscar Ícone Feather</h5>
  </div>
  <div class="card-body">
    <div class="input-group mb-4">
      <span class="input-group-text">\${feather.icons.search.toSvg({
      width: 16,
      height: 16
    })}</span>
      <input type="text" class="form-control" id="icon-search" placeholder="Digite o nome do ícone..." oninput="
        const query = this.value.toLowerCase();
        const icons = document.querySelectorAll('#icon-grid > div');
        let count = 0;
        icons.forEach(icon => {
          const name = icon.dataset.name;
          const visible = name.includes(query);
          icon.style.display = visible ? 'flex' : 'none';
          if (visible) count++;
        });
        document.getElementById('icon-count').textContent = count + ' ícones encontrados';
      ">
    </div>

    <p class="text-muted small mb-3" id="icon-count">\${allIcons.length} ícones encontrados</p>

    <div id="icon-grid" class="d-flex flex-wrap gap-2" style="max-height: 500px; overflow-y: auto;">
      \${allIcons.map(iconName => {
      const svg = feather.icons[iconName].toSvg({
        width: 24,
        height: 24
      });
      return \`
          <div data-name="\${iconName}"
               class="d-flex flex-column align-items-center p-2 border rounded"
               style="width: 90px; cursor: pointer; transition: all 0.2s;"
               onmouseover="this.style.borderColor='#7367f0'; this.style.backgroundColor='#f8f7ff';"
               onmouseout="this.style.borderColor=''; this.style.backgroundColor='';"
               onclick="
                 navigator.clipboard.writeText('\${iconName}');
                 const toast = document.createElement('div');
                 toast.innerHTML = '\${feather.icons.check.toSvg({
        width: 16,
        height: 16
      })} Copiado: <strong>\${iconName}</strong>';
                 toast.style.cssText = 'position: fixed; top: 20px; right: 20px; background: #28a745; color: white; padding: 12px 24px; border-radius: 4px; z-index: 9999; display: flex; align-items: center; gap: 8px;';
                 document.body.appendChild(toast);
                 setTimeout(() => toast.remove(), 2000);
               ">
            \${svg}
            <small class="text-muted text-center mt-1" style="font-size: 9px; word-break: break-all;">\${iconName}</small>
          </div>
        \`;
    }).join('')}
    </div>

    <div class="mt-4 p-3 bg-light rounded">
      <p class="small mb-2">
        \${feather.icons.info.toSvg({
      width: 16,
      height: 16,
      class: 'me-2'
    })}
        <strong>Dica:</strong> Clique em um ícone para copiar o nome.
      </p>
      <p class="small mb-0">
        <a href="https://feathericons.com/" target="_blank" class="text-decoration-none">
          \${feather.icons['external-link'].toSvg({
      width: 14,
      height: 14,
      class: 'me-1'
    })}
          Ver todos os \${Object.keys(feather.icons).length} ícones no site oficial →
        </a>
      </p>
    </div>
  </div>
</div>
    \`;
  }
}`,...(me=(de=f.parameters)==null?void 0:de.docs)==null?void 0:me.source}}};const ue=["VueComponent","CommonIcons","NavigationIcons","ActionIcons","StatusIcons","MediaIcons","CommunicationIcons","CommerceIcons","ChartIcons","FileIcons","DevIcons","Sizes","Colors","WithButtons","Interactive"];export{r as ActionIcons,p as ChartIcons,b as Colors,h as CommerceIcons,c as CommonIcons,m as CommunicationIcons,v as DevIcons,g as FileIcons,f as Interactive,d as MediaIcons,i as NavigationIcons,u as Sizes,l as StatusIcons,o as VueComponent,x as WithButtons,ue as __namedExportsOrder,ve as default};
