const X={title:"Atoms/Data Display/Icon",tags:["autodocs"],parameters:{docs:{description:{component:`
## Ícones - Tabler Icons

O Vuexy utiliza **Tabler Icons** como biblioteca principal de ícones.

### Como usar
\`\`\`html
<i class="ti ti-[nome-do-icone]"></i>
<i class="ti ti-[nome-do-icone] ti-sm"></i>  <!-- Pequeno -->
<i class="ti ti-[nome-do-icone] ti-md"></i>  <!-- Médio -->
<i class="ti ti-[nome-do-icone] ti-lg"></i>  <!-- Grande -->
\`\`\`

### Tamanhos disponíveis
- **ti-xs**: Extra pequeno (0.75rem)
- **ti-sm**: Pequeno (0.875rem)
- **ti-md**: Médio (1.25rem)
- **ti-lg**: Grande (1.5rem)

### Documentação completa
[Tabler Icons](https://tabler-icons.io/)
        `}}}},e=(s,R)=>`
<div class="d-flex flex-column align-items-center p-3 border rounded" style="min-width: 100px;">
  <i class="ti ti-${s} ti-lg mb-2"></i>
  <small class="text-muted text-center">${R}</small>
</div>
`,n={render:()=>`
<div class="mb-4">
  <h5 class="mb-3">Ícones Mais Usados</h5>
  <div class="d-flex flex-wrap gap-3">
    ${e("home","home")}
    ${e("user","user")}
    ${e("settings","settings")}
    ${e("search","search")}
    ${e("bell","bell")}
    ${e("mail","mail")}
    ${e("calendar","calendar")}
    ${e("file","file")}
    ${e("folder","folder")}
    ${e("heart","heart")}
    ${e("star","star")}
    ${e("check","check")}
    ${e("x","x")}
    ${e("plus","plus")}
    ${e("minus","minus")}
    ${e("edit","edit")}
    ${e("trash","trash")}
    ${e("download","download")}
    ${e("upload","upload")}
    ${e("refresh","refresh")}
  </div>
</div>
  `},i={render:()=>`
<div class="mb-4">
  <h5 class="mb-3">Navegação</h5>
  <div class="d-flex flex-wrap gap-3">
    ${e("menu-2","menu-2")}
    ${e("arrow-left","arrow-left")}
    ${e("arrow-right","arrow-right")}
    ${e("arrow-up","arrow-up")}
    ${e("arrow-down","arrow-down")}
    ${e("chevron-left","chevron-left")}
    ${e("chevron-right","chevron-right")}
    ${e("chevron-up","chevron-up")}
    ${e("chevron-down","chevron-down")}
    ${e("external-link","external-link")}
    ${e("link","link")}
    ${e("logout","logout")}
    ${e("login","login")}
  </div>
</div>
  `},a={render:()=>`
<div class="mb-4">
  <h5 class="mb-3">Ações</h5>
  <div class="d-flex flex-wrap gap-3">
    ${e("plus","plus")}
    ${e("minus","minus")}
    ${e("edit","edit")}
    ${e("pencil","pencil")}
    ${e("trash","trash")}
    ${e("copy","copy")}
    ${e("clipboard","clipboard")}
    ${e("share","share")}
    ${e("send","send")}
    ${e("download","download")}
    ${e("upload","upload")}
    ${e("printer","printer")}
    ${e("eye","eye")}
    ${e("eye-off","eye-off")}
    ${e("lock","lock")}
    ${e("lock-open","lock-open")}
  </div>
</div>
  `},t={render:()=>`
<div class="mb-4">
  <h5 class="mb-3">Status & Feedback</h5>
  <div class="d-flex flex-wrap gap-3">
    ${e("check","check")}
    ${e("check-circle","check-circle")}
    ${e("x","x")}
    ${e("x-circle","x-circle")}
    ${e("alert-circle","alert-circle")}
    ${e("alert-triangle","alert-triangle")}
    ${e("info-circle","info-circle")}
    ${e("help-circle","help-circle")}
    ${e("loader","loader")}
    ${e("hourglass","hourglass")}
    ${e("clock","clock")}
  </div>
</div>
  `},c={render:()=>`
<div class="mb-4">
  <h5 class="mb-3">Mídia</h5>
  <div class="d-flex flex-wrap gap-3">
    ${e("photo","photo")}
    ${e("camera","camera")}
    ${e("video","video")}
    ${e("music","music")}
    ${e("microphone","microphone")}
    ${e("player-play","player-play")}
    ${e("player-pause","player-pause")}
    ${e("player-stop","player-stop")}
    ${e("volume","volume")}
    ${e("volume-off","volume-off")}
  </div>
</div>
  `},o={render:()=>`
<div class="mb-4">
  <h5 class="mb-3">Comunicação</h5>
  <div class="d-flex flex-wrap gap-3">
    ${e("mail","mail")}
    ${e("inbox","inbox")}
    ${e("send","send")}
    ${e("message","message")}
    ${e("message-circle","message-circle")}
    ${e("messages","messages")}
    ${e("phone","phone")}
    ${e("phone-call","phone-call")}
    ${e("at","at")}
    ${e("bell","bell")}
    ${e("bell-off","bell-off")}
  </div>
</div>
  `},l={render:()=>`
<div class="mb-4">
  <h5 class="mb-3">Comércio & Finanças</h5>
  <div class="d-flex flex-wrap gap-3">
    ${e("shopping-cart","shopping-cart")}
    ${e("shopping-bag","shopping-bag")}
    ${e("credit-card","credit-card")}
    ${e("wallet","wallet")}
    ${e("currency-dollar","currency-dollar")}
    ${e("receipt","receipt")}
    ${e("tag","tag")}
    ${e("discount","discount")}
    ${e("gift","gift")}
    ${e("truck","truck")}
    ${e("package","package")}
    ${e("building-store","building-store")}
  </div>
</div>
  `},r={render:()=>`
<div class="mb-4">
  <h5 class="mb-3">Gráficos & Dados</h5>
  <div class="d-flex flex-wrap gap-3">
    ${e("chart-bar","chart-bar")}
    ${e("chart-line","chart-line")}
    ${e("chart-pie","chart-pie")}
    ${e("chart-donut","chart-donut")}
    ${e("chart-area","chart-area")}
    ${e("trending-up","trending-up")}
    ${e("trending-down","trending-down")}
    ${e("report","report")}
    ${e("database","database")}
    ${e("table","table")}
  </div>
</div>
  `},d={render:()=>`
<div class="mb-4">
  <h5 class="mb-3">Tamanhos</h5>
  <div class="d-flex gap-4 align-items-end">
    <div class="text-center">
      <i class="ti ti-star ti-xs d-block mb-2"></i>
      <small class="text-muted">ti-xs</small>
    </div>
    <div class="text-center">
      <i class="ti ti-star ti-sm d-block mb-2"></i>
      <small class="text-muted">ti-sm</small>
    </div>
    <div class="text-center">
      <i class="ti ti-star d-block mb-2"></i>
      <small class="text-muted">default</small>
    </div>
    <div class="text-center">
      <i class="ti ti-star ti-md d-block mb-2"></i>
      <small class="text-muted">ti-md</small>
    </div>
    <div class="text-center">
      <i class="ti ti-star ti-lg d-block mb-2"></i>
      <small class="text-muted">ti-lg</small>
    </div>
    <div class="text-center">
      <i class="ti ti-star" style="font-size: 2rem;" ></i>
      <small class="text-muted d-block">2rem</small>
    </div>
    <div class="text-center">
      <i class="ti ti-star" style="font-size: 3rem;"></i>
      <small class="text-muted d-block">3rem</small>
    </div>
  </div>
</div>
  `},m={render:()=>`
<div class="mb-4">
  <h5 class="mb-3">Cores</h5>
  <div class="d-flex gap-4 align-items-center flex-wrap">
    <div class="text-center">
      <i class="ti ti-heart ti-lg text-primary"></i>
      <small class="text-muted d-block">primary</small>
    </div>
    <div class="text-center">
      <i class="ti ti-heart ti-lg text-secondary"></i>
      <small class="text-muted d-block">secondary</small>
    </div>
    <div class="text-center">
      <i class="ti ti-heart ti-lg text-success"></i>
      <small class="text-muted d-block">success</small>
    </div>
    <div class="text-center">
      <i class="ti ti-heart ti-lg text-danger"></i>
      <small class="text-muted d-block">danger</small>
    </div>
    <div class="text-center">
      <i class="ti ti-heart ti-lg text-warning"></i>
      <small class="text-muted d-block">warning</small>
    </div>
    <div class="text-center">
      <i class="ti ti-heart ti-lg text-info"></i>
      <small class="text-muted d-block">info</small>
    </div>
    <div class="text-center">
      <i class="ti ti-heart ti-lg text-dark"></i>
      <small class="text-muted d-block">dark</small>
    </div>
    <div class="text-center bg-dark p-2 rounded">
      <i class="ti ti-heart ti-lg text-light"></i>
      <small class="text-light d-block">light</small>
    </div>
  </div>
</div>
  `},p={render:()=>`
<div class="d-flex gap-3 flex-wrap">
  <button class="btn btn-primary">
    <i class="ti ti-plus me-2"></i>Adicionar
  </button>
  <button class="btn btn-success">
    <i class="ti ti-check me-2"></i>Salvar
  </button>
  <button class="btn btn-danger">
    <i class="ti ti-trash me-2"></i>Excluir
  </button>
  <button class="btn btn-outline-primary">
    <i class="ti ti-download me-2"></i>Download
  </button>
  <button class="btn btn-icon btn-primary">
    <i class="ti ti-settings"></i>
  </button>
  <button class="btn btn-icon btn-outline-secondary">
    <i class="ti ti-bell"></i>
  </button>
</div>
  `},x={render:()=>`
<div class="card">
  <div class="card-header">
    <h5 class="card-title mb-0">Buscar Ícone</h5>
  </div>
  <div class="card-body">
    <div class="input-group mb-4">
      <span class="input-group-text"><i class="ti ti-search"></i></span>
      <input type="text" class="form-control" id="icon-search" placeholder="Digite o nome do ícone..." oninput="
        const query = this.value.toLowerCase();
        const icons = document.querySelectorAll('#icon-grid > div');
        icons.forEach(icon => {
          const name = icon.dataset.name;
          icon.style.display = name.includes(query) ? 'flex' : 'none';
        });
      ">
    </div>
    
    <div id="icon-grid" class="d-flex flex-wrap gap-2">
      ${["home","user","settings","search","bell","mail","calendar","file","folder","heart","star","check","x","plus","minus","edit","trash","download","upload","refresh","menu-2","arrow-left","arrow-right","eye","lock","shopping-cart","credit-card","chart-bar","phone","message"].map(s=>`
        <div data-name="${s}" class="d-flex flex-column align-items-center p-2 border rounded" 
             style="width: 80px; cursor: pointer;" 
             onclick="navigator.clipboard.writeText('ti ti-${s}'); this.classList.add('border-primary'); setTimeout(() => this.classList.remove('border-primary'), 500);">
          <i class="ti ti-${s} ti-md"></i>
          <small class="text-muted text-center" style="font-size: 10px;">${s}</small>
        </div>
      `).join("")}
    </div>
    
    <p class="text-muted mt-3 small">
      <i class="ti ti-info-circle me-1"></i>
      Clique em um ícone para copiar a classe. 
      <a href="https://tabler-icons.io/" target="_blank">Ver todos os ícones →</a>
    </p>
  </div>
</div>
  `};var u,h,$;n.parameters={...n.parameters,docs:{...(u=n.parameters)==null?void 0:u.docs,source:{originalSource:`{
  render: () => \`
<div class="mb-4">
  <h5 class="mb-3">Ícones Mais Usados</h5>
  <div class="d-flex flex-wrap gap-3">
    \${iconBox('home', 'home')}
    \${iconBox('user', 'user')}
    \${iconBox('settings', 'settings')}
    \${iconBox('search', 'search')}
    \${iconBox('bell', 'bell')}
    \${iconBox('mail', 'mail')}
    \${iconBox('calendar', 'calendar')}
    \${iconBox('file', 'file')}
    \${iconBox('folder', 'folder')}
    \${iconBox('heart', 'heart')}
    \${iconBox('star', 'star')}
    \${iconBox('check', 'check')}
    \${iconBox('x', 'x')}
    \${iconBox('plus', 'plus')}
    \${iconBox('minus', 'minus')}
    \${iconBox('edit', 'edit')}
    \${iconBox('trash', 'trash')}
    \${iconBox('download', 'download')}
    \${iconBox('upload', 'upload')}
    \${iconBox('refresh', 'refresh')}
  </div>
</div>
  \`
}`,...($=(h=n.parameters)==null?void 0:h.docs)==null?void 0:$.source}}};var v,b,g;i.parameters={...i.parameters,docs:{...(v=i.parameters)==null?void 0:v.docs,source:{originalSource:`{
  render: () => \`
<div class="mb-4">
  <h5 class="mb-3">Navegação</h5>
  <div class="d-flex flex-wrap gap-3">
    \${iconBox('menu-2', 'menu-2')}
    \${iconBox('arrow-left', 'arrow-left')}
    \${iconBox('arrow-right', 'arrow-right')}
    \${iconBox('arrow-up', 'arrow-up')}
    \${iconBox('arrow-down', 'arrow-down')}
    \${iconBox('chevron-left', 'chevron-left')}
    \${iconBox('chevron-right', 'chevron-right')}
    \${iconBox('chevron-up', 'chevron-up')}
    \${iconBox('chevron-down', 'chevron-down')}
    \${iconBox('external-link', 'external-link')}
    \${iconBox('link', 'link')}
    \${iconBox('logout', 'logout')}
    \${iconBox('login', 'login')}
  </div>
</div>
  \`
}`,...(g=(b=i.parameters)==null?void 0:b.docs)==null?void 0:g.source}}};var f,B,k;a.parameters={...a.parameters,docs:{...(f=a.parameters)==null?void 0:f.docs,source:{originalSource:`{
  render: () => \`
<div class="mb-4">
  <h5 class="mb-3">Ações</h5>
  <div class="d-flex flex-wrap gap-3">
    \${iconBox('plus', 'plus')}
    \${iconBox('minus', 'minus')}
    \${iconBox('edit', 'edit')}
    \${iconBox('pencil', 'pencil')}
    \${iconBox('trash', 'trash')}
    \${iconBox('copy', 'copy')}
    \${iconBox('clipboard', 'clipboard')}
    \${iconBox('share', 'share')}
    \${iconBox('send', 'send')}
    \${iconBox('download', 'download')}
    \${iconBox('upload', 'upload')}
    \${iconBox('printer', 'printer')}
    \${iconBox('eye', 'eye')}
    \${iconBox('eye-off', 'eye-off')}
    \${iconBox('lock', 'lock')}
    \${iconBox('lock-open', 'lock-open')}
  </div>
</div>
  \`
}`,...(k=(B=a.parameters)==null?void 0:B.docs)==null?void 0:k.source}}};var w,y,C;t.parameters={...t.parameters,docs:{...(w=t.parameters)==null?void 0:w.docs,source:{originalSource:`{
  render: () => \`
<div class="mb-4">
  <h5 class="mb-3">Status & Feedback</h5>
  <div class="d-flex flex-wrap gap-3">
    \${iconBox('check', 'check')}
    \${iconBox('check-circle', 'check-circle')}
    \${iconBox('x', 'x')}
    \${iconBox('x-circle', 'x-circle')}
    \${iconBox('alert-circle', 'alert-circle')}
    \${iconBox('alert-triangle', 'alert-triangle')}
    \${iconBox('info-circle', 'info-circle')}
    \${iconBox('help-circle', 'help-circle')}
    \${iconBox('loader', 'loader')}
    \${iconBox('hourglass', 'hourglass')}
    \${iconBox('clock', 'clock')}
  </div>
</div>
  \`
}`,...(C=(y=t.parameters)==null?void 0:y.docs)==null?void 0:C.source}}};var I,S,E;c.parameters={...c.parameters,docs:{...(I=c.parameters)==null?void 0:I.docs,source:{originalSource:`{
  render: () => \`
<div class="mb-4">
  <h5 class="mb-3">Mídia</h5>
  <div class="d-flex flex-wrap gap-3">
    \${iconBox('photo', 'photo')}
    \${iconBox('camera', 'camera')}
    \${iconBox('video', 'video')}
    \${iconBox('music', 'music')}
    \${iconBox('microphone', 'microphone')}
    \${iconBox('player-play', 'player-play')}
    \${iconBox('player-pause', 'player-pause')}
    \${iconBox('player-stop', 'player-stop')}
    \${iconBox('volume', 'volume')}
    \${iconBox('volume-off', 'volume-off')}
  </div>
</div>
  \`
}`,...(E=(S=c.parameters)==null?void 0:S.docs)==null?void 0:E.source}}};var D,q,T;o.parameters={...o.parameters,docs:{...(D=o.parameters)==null?void 0:D.docs,source:{originalSource:`{
  render: () => \`
<div class="mb-4">
  <h5 class="mb-3">Comunicação</h5>
  <div class="d-flex flex-wrap gap-3">
    \${iconBox('mail', 'mail')}
    \${iconBox('inbox', 'inbox')}
    \${iconBox('send', 'send')}
    \${iconBox('message', 'message')}
    \${iconBox('message-circle', 'message-circle')}
    \${iconBox('messages', 'messages')}
    \${iconBox('phone', 'phone')}
    \${iconBox('phone-call', 'phone-call')}
    \${iconBox('at', 'at')}
    \${iconBox('bell', 'bell')}
    \${iconBox('bell-off', 'bell-off')}
  </div>
</div>
  \`
}`,...(T=(q=o.parameters)==null?void 0:q.docs)==null?void 0:T.source}}};var z,A,M;l.parameters={...l.parameters,docs:{...(z=l.parameters)==null?void 0:z.docs,source:{originalSource:`{
  render: () => \`
<div class="mb-4">
  <h5 class="mb-3">Comércio & Finanças</h5>
  <div class="d-flex flex-wrap gap-3">
    \${iconBox('shopping-cart', 'shopping-cart')}
    \${iconBox('shopping-bag', 'shopping-bag')}
    \${iconBox('credit-card', 'credit-card')}
    \${iconBox('wallet', 'wallet')}
    \${iconBox('currency-dollar', 'currency-dollar')}
    \${iconBox('receipt', 'receipt')}
    \${iconBox('tag', 'tag')}
    \${iconBox('discount', 'discount')}
    \${iconBox('gift', 'gift')}
    \${iconBox('truck', 'truck')}
    \${iconBox('package', 'package')}
    \${iconBox('building-store', 'building-store')}
  </div>
</div>
  \`
}`,...(M=(A=l.parameters)==null?void 0:A.docs)==null?void 0:M.source}}};var L,F,_;r.parameters={...r.parameters,docs:{...(L=r.parameters)==null?void 0:L.docs,source:{originalSource:`{
  render: () => \`
<div class="mb-4">
  <h5 class="mb-3">Gráficos & Dados</h5>
  <div class="d-flex flex-wrap gap-3">
    \${iconBox('chart-bar', 'chart-bar')}
    \${iconBox('chart-line', 'chart-line')}
    \${iconBox('chart-pie', 'chart-pie')}
    \${iconBox('chart-donut', 'chart-donut')}
    \${iconBox('chart-area', 'chart-area')}
    \${iconBox('trending-up', 'trending-up')}
    \${iconBox('trending-down', 'trending-down')}
    \${iconBox('report', 'report')}
    \${iconBox('database', 'database')}
    \${iconBox('table', 'table')}
  </div>
</div>
  \`
}`,...(_=(F=r.parameters)==null?void 0:F.docs)==null?void 0:_.source}}};var G,N,V;d.parameters={...d.parameters,docs:{...(G=d.parameters)==null?void 0:G.docs,source:{originalSource:`{
  render: () => \`
<div class="mb-4">
  <h5 class="mb-3">Tamanhos</h5>
  <div class="d-flex gap-4 align-items-end">
    <div class="text-center">
      <i class="ti ti-star ti-xs d-block mb-2"></i>
      <small class="text-muted">ti-xs</small>
    </div>
    <div class="text-center">
      <i class="ti ti-star ti-sm d-block mb-2"></i>
      <small class="text-muted">ti-sm</small>
    </div>
    <div class="text-center">
      <i class="ti ti-star d-block mb-2"></i>
      <small class="text-muted">default</small>
    </div>
    <div class="text-center">
      <i class="ti ti-star ti-md d-block mb-2"></i>
      <small class="text-muted">ti-md</small>
    </div>
    <div class="text-center">
      <i class="ti ti-star ti-lg d-block mb-2"></i>
      <small class="text-muted">ti-lg</small>
    </div>
    <div class="text-center">
      <i class="ti ti-star" style="font-size: 2rem;" ></i>
      <small class="text-muted d-block">2rem</small>
    </div>
    <div class="text-center">
      <i class="ti ti-star" style="font-size: 3rem;"></i>
      <small class="text-muted d-block">3rem</small>
    </div>
  </div>
</div>
  \`
}`,...(V=(N=d.parameters)==null?void 0:N.docs)==null?void 0:V.source}}};var j,O,P;m.parameters={...m.parameters,docs:{...(j=m.parameters)==null?void 0:j.docs,source:{originalSource:`{
  render: () => \`
<div class="mb-4">
  <h5 class="mb-3">Cores</h5>
  <div class="d-flex gap-4 align-items-center flex-wrap">
    <div class="text-center">
      <i class="ti ti-heart ti-lg text-primary"></i>
      <small class="text-muted d-block">primary</small>
    </div>
    <div class="text-center">
      <i class="ti ti-heart ti-lg text-secondary"></i>
      <small class="text-muted d-block">secondary</small>
    </div>
    <div class="text-center">
      <i class="ti ti-heart ti-lg text-success"></i>
      <small class="text-muted d-block">success</small>
    </div>
    <div class="text-center">
      <i class="ti ti-heart ti-lg text-danger"></i>
      <small class="text-muted d-block">danger</small>
    </div>
    <div class="text-center">
      <i class="ti ti-heart ti-lg text-warning"></i>
      <small class="text-muted d-block">warning</small>
    </div>
    <div class="text-center">
      <i class="ti ti-heart ti-lg text-info"></i>
      <small class="text-muted d-block">info</small>
    </div>
    <div class="text-center">
      <i class="ti ti-heart ti-lg text-dark"></i>
      <small class="text-muted d-block">dark</small>
    </div>
    <div class="text-center bg-dark p-2 rounded">
      <i class="ti ti-heart ti-lg text-light"></i>
      <small class="text-light d-block">light</small>
    </div>
  </div>
</div>
  \`
}`,...(P=(O=m.parameters)==null?void 0:O.docs)==null?void 0:P.source}}};var U,W,H;p.parameters={...p.parameters,docs:{...(U=p.parameters)==null?void 0:U.docs,source:{originalSource:`{
  render: () => \`
<div class="d-flex gap-3 flex-wrap">
  <button class="btn btn-primary">
    <i class="ti ti-plus me-2"></i>Adicionar
  </button>
  <button class="btn btn-success">
    <i class="ti ti-check me-2"></i>Salvar
  </button>
  <button class="btn btn-danger">
    <i class="ti ti-trash me-2"></i>Excluir
  </button>
  <button class="btn btn-outline-primary">
    <i class="ti ti-download me-2"></i>Download
  </button>
  <button class="btn btn-icon btn-primary">
    <i class="ti ti-settings"></i>
  </button>
  <button class="btn btn-icon btn-outline-secondary">
    <i class="ti ti-bell"></i>
  </button>
</div>
  \`
}`,...(H=(W=p.parameters)==null?void 0:W.docs)==null?void 0:H.source}}};var J,K,Q;x.parameters={...x.parameters,docs:{...(J=x.parameters)==null?void 0:J.docs,source:{originalSource:`{
  render: () => \`
<div class="card">
  <div class="card-header">
    <h5 class="card-title mb-0">Buscar Ícone</h5>
  </div>
  <div class="card-body">
    <div class="input-group mb-4">
      <span class="input-group-text"><i class="ti ti-search"></i></span>
      <input type="text" class="form-control" id="icon-search" placeholder="Digite o nome do ícone..." oninput="
        const query = this.value.toLowerCase();
        const icons = document.querySelectorAll('#icon-grid > div');
        icons.forEach(icon => {
          const name = icon.dataset.name;
          icon.style.display = name.includes(query) ? 'flex' : 'none';
        });
      ">
    </div>
    
    <div id="icon-grid" class="d-flex flex-wrap gap-2">
      \${['home', 'user', 'settings', 'search', 'bell', 'mail', 'calendar', 'file', 'folder', 'heart', 'star', 'check', 'x', 'plus', 'minus', 'edit', 'trash', 'download', 'upload', 'refresh', 'menu-2', 'arrow-left', 'arrow-right', 'eye', 'lock', 'shopping-cart', 'credit-card', 'chart-bar', 'phone', 'message'].map(icon => \`
        <div data-name="\${icon}" class="d-flex flex-column align-items-center p-2 border rounded" 
             style="width: 80px; cursor: pointer;" 
             onclick="navigator.clipboard.writeText('ti ti-\${icon}'); this.classList.add('border-primary'); setTimeout(() => this.classList.remove('border-primary'), 500);">
          <i class="ti ti-\${icon} ti-md"></i>
          <small class="text-muted text-center" style="font-size: 10px;">\${icon}</small>
        </div>
      \`).join('')}
    </div>
    
    <p class="text-muted mt-3 small">
      <i class="ti ti-info-circle me-1"></i>
      Clique em um ícone para copiar a classe. 
      <a href="https://tabler-icons.io/" target="_blank">Ver todos os ícones →</a>
    </p>
  </div>
</div>
  \`
}`,...(Q=(K=x.parameters)==null?void 0:K.docs)==null?void 0:Q.source}}};const Y=["CommonIcons","NavigationIcons","ActionIcons","StatusIcons","MediaIcons","CommunicationIcons","CommerceIcons","ChartIcons","Sizes","Colors","WithButtons","Interactive"];export{a as ActionIcons,r as ChartIcons,m as Colors,l as CommerceIcons,n as CommonIcons,o as CommunicationIcons,x as Interactive,c as MediaIcons,i as NavigationIcons,d as Sizes,t as StatusIcons,p as WithButtons,Y as __namedExportsOrder,X as default};
