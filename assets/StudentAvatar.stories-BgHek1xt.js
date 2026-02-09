const Q={title:"Educacross Components V2/StudentAvatar",tags:["autodocs"],argTypes:{src:{control:"text",description:"URL da foto do estudante"},name:{control:"text",description:"Nome do estudante (usado para iniciais)"},size:{control:"select",options:["sm","md","lg","xl"],description:"Tamanho do avatar"},status:{control:"select",options:["none","online","offline","away"],description:"Status de presença (online/offline)"},badge:{control:"text",description:'Badge de conquista/posição (ex: "1º", "🏆")'}},parameters:{layout:"padded",docs:{description:{component:"Avatar de estudante com foto, iniciais, status e badges de conquista. Usado em contextos educacionais como listas de alunos, rankings e perfis."}}}},t=`
/* Avatar base */
.student-avatar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  font-weight: 600;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  overflow: hidden;
  position: relative;
  flex-shrink: 0;
}

/* Sizes */
.student-avatar.size-sm {
  width: 32px;
  height: 32px;
  font-size: 12px;
}

.student-avatar.size-md {
  width: 40px;
  height: 40px;
  font-size: 14px;
}

.student-avatar.size-lg {
  width: 56px;
  height: 56px;
  font-size: 18px;
}

.student-avatar.size-xl {
  width: 80px;
  height: 80px;
  font-size: 28px;
}

/* Photo */
.student-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Loading state */
.student-avatar.loading {
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
}

@keyframes shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}

/* Status indicator */
.student-avatar .status-indicator {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: 2px solid white;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
}

.student-avatar.size-sm .status-indicator {
  width: 8px;
  height: 8px;
  border-width: 1.5px;
}

.student-avatar.size-lg .status-indicator {
  width: 14px;
  height: 14px;
}

.student-avatar.size-xl .status-indicator {
  width: 18px;
  height: 18px;
  border-width: 3px;
}

.status-indicator.online {
  background-color: #28c76f;
}

.status-indicator.offline {
  background-color: #82868b;
}

.status-indicator.away {
  background-color: #ff9f43;
}

/* Badge (posição/conquista) */
.student-avatar .badge-overlay {
  position: absolute;
  top: -4px;
  right: -4px;
  background: #ff9f43;
  color: white;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  font-weight: 700;
  border: 2px solid white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.student-avatar.size-sm .badge-overlay {
  width: 16px;
  height: 16px;
  font-size: 8px;
  top: -2px;
  right: -2px;
}

.student-avatar.size-lg .badge-overlay {
  width: 24px;
  height: 24px;
  font-size: 12px;
  top: -6px;
  right: -6px;
}

.student-avatar.size-xl .badge-overlay {
  width: 32px;
  height: 32px;
  font-size: 14px;
  top: -8px;
  right: -8px;
}

/* Placeholder SVG para foto quebrada */
.student-avatar .avatar-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

/* Avatar Group */
.avatar-group {
  display: flex;
  align-items: center;
}

.avatar-group .student-avatar {
  margin-left: -8px;
  border: 2px solid white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.avatar-group .student-avatar:first-child {
  margin-left: 0;
}

.avatar-group .avatar-count {
  margin-left: 8px;
  color: #6e6b7b;
  font-weight: 600;
  font-size: 14px;
}

/* Avatar com nome */
.avatar-with-name {
  display: inline-flex;
  align-items: center;
  gap: 12px;
}

.avatar-with-name .student-name {
  font-weight: 500;
  color: #5e5873;
}

.avatar-with-name .student-info {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.avatar-with-name .student-subtitle {
  font-size: 12px;
  color: #b9b9c3;
}
`,K=e=>{if(!e)return"?";const n=e.trim().split(" ");return n.length===1?n[0].substring(0,2).toUpperCase():(n[0][0]+n[n.length-1][0]).toUpperCase()},a=e=>{const{src:n,name:v,size:V="md",status:x="none",badge:u}=e,N=K(v);return`
<div class="student-avatar size-${V} ${e.loading?"loading":""}">
  ${n&&!e.loading?`<img src="${n}" alt="${v||"Estudante"}" />`:""}
  ${!n&&!e.loading?`<span>${N}</span>`:""}
  ${x!=="none"?`<span class="status-indicator ${x}"></span>`:""}
  ${u?`<span class="badge-overlay">${u}</span>`:""}
</div>
  `},s={args:{name:"Maria Silva",size:"md",status:"none"},render:e=>`
    <style>${t}</style>
    ${a(e)}
  `},i={render:()=>`
    <style>${t}</style>
    <div style="display: flex; gap: 16px; align-items: center;">
      ${a({src:"https://i.pravatar.cc/150?img=1",name:"Ana Carolina",size:"md"})}
      ${a({src:"https://i.pravatar.cc/150?img=5",name:"João Pedro",size:"md"})}
      ${a({src:"https://i.pravatar.cc/150?img=9",name:"Beatriz Santos",size:"md"})}
      ${a({src:"https://i.pravatar.cc/150?img=12",name:"Lucas Oliveira",size:"md"})}
    </div>
  `},r={render:()=>`
    <style>${t}</style>
    <div style="display: flex; gap: 16px; align-items: center;">
      ${a({name:"Maria Silva",size:"md"})}
      ${a({name:"Pedro Henrique",size:"md"})}
      ${a({name:"Ana Carolina",size:"md"})}
      ${a({name:"João",size:"md"})}
    </div>
  `},o={render:()=>`
    <style>${t}</style>
    <div style="display: flex; gap: 24px; align-items: center;">
      <div style="text-align: center;">
        ${a({name:"Maria Silva",size:"sm"})}
        <p style="margin-top: 8px; font-size: 12px; color: #6e6b7b;">Small (32px)</p>
      </div>
      <div style="text-align: center;">
        ${a({name:"Maria Silva",size:"md"})}
        <p style="margin-top: 8px; font-size: 12px; color: #6e6b7b;">Medium (40px)</p>
      </div>
      <div style="text-align: center;">
        ${a({name:"Maria Silva",size:"lg"})}
        <p style="margin-top: 8px; font-size: 12px; color: #6e6b7b;">Large (56px)</p>
      </div>
      <div style="text-align: center;">
        ${a({name:"Maria Silva",size:"xl"})}
        <p style="margin-top: 8px; font-size: 12px; color: #6e6b7b;">Extra Large (80px)</p>
      </div>
    </div>
  `},d={render:()=>`
    <style>${t}</style>
    <div style="display: flex; gap: 24px; align-items: center;">
      <div style="text-align: center;">
        ${a({src:"https://i.pravatar.cc/150?img=1",name:"Ana Online",size:"md",status:"online"})}
        <p style="margin-top: 8px; font-size: 12px; color: #6e6b7b;">Online</p>
      </div>
      <div style="text-align: center;">
        ${a({src:"https://i.pravatar.cc/150?img=5",name:"João Away",size:"md",status:"away"})}
        <p style="margin-top: 8px; font-size: 12px; color: #6e6b7b;">Ausente</p>
      </div>
      <div style="text-align: center;">
        ${a({src:"https://i.pravatar.cc/150?img=9",name:"Maria Offline",size:"md",status:"offline"})}
        <p style="margin-top: 8px; font-size: 12px; color: #6e6b7b;">Offline</p>
      </div>
    </div>
  `},p={render:()=>`
    <style>${t}</style>
    <div style="display: flex; gap: 16px; align-items: center;">
      ${a({size:"sm",loading:!0})}
      ${a({size:"md",loading:!0})}
      ${a({size:"lg",loading:!0})}
      ${a({size:"xl",loading:!0})}
    </div>
  `},l={render:()=>`
    <style>${t}</style>
    <div class="avatar-group">
      ${a({src:"https://i.pravatar.cc/150?img=1",name:"Ana",size:"md"})}
      ${a({src:"https://i.pravatar.cc/150?img=5",name:"João",size:"md"})}
      ${a({src:"https://i.pravatar.cc/150?img=9",name:"Maria",size:"md"})}
      ${a({src:"https://i.pravatar.cc/150?img=12",name:"Pedro",size:"md"})}
      <span class="avatar-count">+12</span>
    </div>
  `},c={render:()=>`
    <style>${t}</style>
    <div style="display: flex; gap: 24px; align-items: center;">
      <div style="text-align: center;">
        ${a({src:"https://i.pravatar.cc/150?img=1",name:"1º Lugar",size:"lg",badge:"1º"})}
        <p style="margin-top: 8px; font-size: 12px; color: #6e6b7b;">1º Lugar</p>
      </div>
      <div style="text-align: center;">
        ${a({src:"https://i.pravatar.cc/150?img=5",name:"2º Lugar",size:"lg",badge:"2º"})}
        <p style="margin-top: 8px; font-size: 12px; color: #6e6b7b;">2º Lugar</p>
      </div>
      <div style="text-align: center;">
        ${a({src:"https://i.pravatar.cc/150?img=9",name:"3º Lugar",size:"lg",badge:"3º"})}
        <p style="margin-top: 8px; font-size: 12px; color: #6e6b7b;">3º Lugar</p>
      </div>
      <div style="text-align: center;">
        ${a({name:"Conquista",size:"lg",badge:"🏆"})}
        <p style="margin-top: 8px; font-size: 12px; color: #6e6b7b;">Troféu</p>
      </div>
    </div>
  `},m={render:()=>`
    <style>${t}</style>
    <div class="card" style="max-width: 500px;">
      <div class="card-header">
        <h5 class="mb-0">5º Ano A - Turma 2024</h5>
      </div>
      <div class="list-group list-group-flush">
        ${[{src:"https://i.pravatar.cc/150?img=1",name:"Ana Carolina Silva",status:"online"},{src:"https://i.pravatar.cc/150?img=5",name:"Bruno Santos Oliveira",status:"online"},{name:"Carlos Eduardo Lima",status:"away"},{src:"https://i.pravatar.cc/150?img=9",name:"Daniela Costa Santos",status:"offline"},{name:"Eduardo Alves Pereira",status:"online"}].map(e=>`
          <div class="list-group-item">
            <div class="avatar-with-name">
              ${a({...e,size:"md"})}
              <span class="student-name">${e.name}</span>
            </div>
          </div>
        `).join("")}
      </div>
    </div>
  `},g={render:()=>`
    <style>${t}</style>
    <div class="card" style="max-width: 600px;">
      <div class="card-header">
        <h5 class="mb-0">🏆 Ranking de Proficiência - Matemática</h5>
      </div>
      <div class="card-body p-0">
        <table class="table table-hover mb-0">
          <thead>
            <tr>
              <th style="width: 80px;">Posição</th>
              <th>Estudante</th>
              <th class="text-end">Pontos</th>
            </tr>
          </thead>
          <tbody>
            ${[{pos:"1º",src:"https://i.pravatar.cc/150?img=1",name:"Ana Carolina Silva",points:985,badge:"🥇"},{pos:"2º",src:"https://i.pravatar.cc/150?img=5",name:"Bruno Santos",points:972,badge:"🥈"},{pos:"3º",src:"https://i.pravatar.cc/150?img=9",name:"Camila Costa",points:968,badge:"🥉"},{pos:"4º",name:"Daniel Alves",points:945},{pos:"5º",src:"https://i.pravatar.cc/150?img=12",name:"Eduardo Lima",points:932}].map(e=>`
              <tr>
                <td class="text-center">${e.pos}</td>
                <td>
                  <div class="avatar-with-name">
                    ${a({...e,size:"md",badge:e.badge})}
                    <div class="student-info">
                      <span class="student-name">${e.name}</span>
                    </div>
                  </div>
                </td>
                <td class="text-end">
                  <span class="badge bg-primary">${e.points} pts</span>
                </td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>
    </div>
  `};var h,y,b;s.parameters={...s.parameters,docs:{...(h=s.parameters)==null?void 0:h.docs,source:{originalSource:`{
  args: {
    name: 'Maria Silva',
    size: 'md',
    status: 'none'
  },
  render: args => \`
    <style>\${componentStyles}</style>
    \${renderAvatar(args)}
  \`
}`,...(b=(y=s.parameters)==null?void 0:y.docs)==null?void 0:b.source}}};var f,z,$;i.parameters={...i.parameters,docs:{...(f=i.parameters)==null?void 0:f.docs,source:{originalSource:`{
  render: () => \`
    <style>\${componentStyles}</style>
    <div style="display: flex; gap: 16px; align-items: center;">
      \${renderAvatar({
    src: 'https://i.pravatar.cc/150?img=1',
    name: 'Ana Carolina',
    size: 'md'
  })}
      \${renderAvatar({
    src: 'https://i.pravatar.cc/150?img=5',
    name: 'João Pedro',
    size: 'md'
  })}
      \${renderAvatar({
    src: 'https://i.pravatar.cc/150?img=9',
    name: 'Beatriz Santos',
    size: 'md'
  })}
      \${renderAvatar({
    src: 'https://i.pravatar.cc/150?img=12',
    name: 'Lucas Oliveira',
    size: 'md'
  })}
    </div>
  \`
}`,...($=(z=i.parameters)==null?void 0:z.docs)==null?void 0:$.source}}};var A,S,w;r.parameters={...r.parameters,docs:{...(A=r.parameters)==null?void 0:A.docs,source:{originalSource:`{
  render: () => \`
    <style>\${componentStyles}</style>
    <div style="display: flex; gap: 16px; align-items: center;">
      \${renderAvatar({
    name: 'Maria Silva',
    size: 'md'
  })}
      \${renderAvatar({
    name: 'Pedro Henrique',
    size: 'md'
  })}
      \${renderAvatar({
    name: 'Ana Carolina',
    size: 'md'
  })}
      \${renderAvatar({
    name: 'João',
    size: 'md'
  })}
    </div>
  \`
}`,...(w=(S=r.parameters)==null?void 0:S.docs)==null?void 0:w.source}}};var L,B,C;o.parameters={...o.parameters,docs:{...(L=o.parameters)==null?void 0:L.docs,source:{originalSource:`{
  render: () => \`
    <style>\${componentStyles}</style>
    <div style="display: flex; gap: 24px; align-items: center;">
      <div style="text-align: center;">
        \${renderAvatar({
    name: 'Maria Silva',
    size: 'sm'
  })}
        <p style="margin-top: 8px; font-size: 12px; color: #6e6b7b;">Small (32px)</p>
      </div>
      <div style="text-align: center;">
        \${renderAvatar({
    name: 'Maria Silva',
    size: 'md'
  })}
        <p style="margin-top: 8px; font-size: 12px; color: #6e6b7b;">Medium (40px)</p>
      </div>
      <div style="text-align: center;">
        \${renderAvatar({
    name: 'Maria Silva',
    size: 'lg'
  })}
        <p style="margin-top: 8px; font-size: 12px; color: #6e6b7b;">Large (56px)</p>
      </div>
      <div style="text-align: center;">
        \${renderAvatar({
    name: 'Maria Silva',
    size: 'xl'
  })}
        <p style="margin-top: 8px; font-size: 12px; color: #6e6b7b;">Extra Large (80px)</p>
      </div>
    </div>
  \`
}`,...(C=(B=o.parameters)==null?void 0:B.docs)==null?void 0:C.source}}};var E,D,M;d.parameters={...d.parameters,docs:{...(E=d.parameters)==null?void 0:E.docs,source:{originalSource:`{
  render: () => \`
    <style>\${componentStyles}</style>
    <div style="display: flex; gap: 24px; align-items: center;">
      <div style="text-align: center;">
        \${renderAvatar({
    src: 'https://i.pravatar.cc/150?img=1',
    name: 'Ana Online',
    size: 'md',
    status: 'online'
  })}
        <p style="margin-top: 8px; font-size: 12px; color: #6e6b7b;">Online</p>
      </div>
      <div style="text-align: center;">
        \${renderAvatar({
    src: 'https://i.pravatar.cc/150?img=5',
    name: 'João Away',
    size: 'md',
    status: 'away'
  })}
        <p style="margin-top: 8px; font-size: 12px; color: #6e6b7b;">Ausente</p>
      </div>
      <div style="text-align: center;">
        \${renderAvatar({
    src: 'https://i.pravatar.cc/150?img=9',
    name: 'Maria Offline',
    size: 'md',
    status: 'offline'
  })}
        <p style="margin-top: 8px; font-size: 12px; color: #6e6b7b;">Offline</p>
      </div>
    </div>
  \`
}`,...(M=(D=d.parameters)==null?void 0:D.docs)==null?void 0:M.source}}};var P,k,O;p.parameters={...p.parameters,docs:{...(P=p.parameters)==null?void 0:P.docs,source:{originalSource:`{
  render: () => \`
    <style>\${componentStyles}</style>
    <div style="display: flex; gap: 16px; align-items: center;">
      \${renderAvatar({
    size: 'sm',
    loading: true
  })}
      \${renderAvatar({
    size: 'md',
    loading: true
  })}
      \${renderAvatar({
    size: 'lg',
    loading: true
  })}
      \${renderAvatar({
    size: 'xl',
    loading: true
  })}
    </div>
  \`
}`,...(O=(k=p.parameters)==null?void 0:k.docs)==null?void 0:O.source}}};var j,q,J;l.parameters={...l.parameters,docs:{...(j=l.parameters)==null?void 0:j.docs,source:{originalSource:`{
  render: () => \`
    <style>\${componentStyles}</style>
    <div class="avatar-group">
      \${renderAvatar({
    src: 'https://i.pravatar.cc/150?img=1',
    name: 'Ana',
    size: 'md'
  })}
      \${renderAvatar({
    src: 'https://i.pravatar.cc/150?img=5',
    name: 'João',
    size: 'md'
  })}
      \${renderAvatar({
    src: 'https://i.pravatar.cc/150?img=9',
    name: 'Maria',
    size: 'md'
  })}
      \${renderAvatar({
    src: 'https://i.pravatar.cc/150?img=12',
    name: 'Pedro',
    size: 'md'
  })}
      <span class="avatar-count">+12</span>
    </div>
  \`
}`,...(J=(q=l.parameters)==null?void 0:q.docs)==null?void 0:J.source}}};var W,T,R;c.parameters={...c.parameters,docs:{...(W=c.parameters)==null?void 0:W.docs,source:{originalSource:`{
  render: () => \`
    <style>\${componentStyles}</style>
    <div style="display: flex; gap: 24px; align-items: center;">
      <div style="text-align: center;">
        \${renderAvatar({
    src: 'https://i.pravatar.cc/150?img=1',
    name: '1º Lugar',
    size: 'lg',
    badge: '1º'
  })}
        <p style="margin-top: 8px; font-size: 12px; color: #6e6b7b;">1º Lugar</p>
      </div>
      <div style="text-align: center;">
        \${renderAvatar({
    src: 'https://i.pravatar.cc/150?img=5',
    name: '2º Lugar',
    size: 'lg',
    badge: '2º'
  })}
        <p style="margin-top: 8px; font-size: 12px; color: #6e6b7b;">2º Lugar</p>
      </div>
      <div style="text-align: center;">
        \${renderAvatar({
    src: 'https://i.pravatar.cc/150?img=9',
    name: '3º Lugar',
    size: 'lg',
    badge: '3º'
  })}
        <p style="margin-top: 8px; font-size: 12px; color: #6e6b7b;">3º Lugar</p>
      </div>
      <div style="text-align: center;">
        \${renderAvatar({
    name: 'Conquista',
    size: 'lg',
    badge: '🏆'
  })}
        <p style="margin-top: 8px; font-size: 12px; color: #6e6b7b;">Troféu</p>
      </div>
    </div>
  \`
}`,...(R=(T=c.parameters)==null?void 0:T.docs)==null?void 0:R.source}}};var G,U,I;m.parameters={...m.parameters,docs:{...(G=m.parameters)==null?void 0:G.docs,source:{originalSource:`{
  render: () => \`
    <style>\${componentStyles}</style>
    <div class="card" style="max-width: 500px;">
      <div class="card-header">
        <h5 class="mb-0">5º Ano A - Turma 2024</h5>
      </div>
      <div class="list-group list-group-flush">
        \${[{
    src: 'https://i.pravatar.cc/150?img=1',
    name: 'Ana Carolina Silva',
    status: 'online'
  }, {
    src: 'https://i.pravatar.cc/150?img=5',
    name: 'Bruno Santos Oliveira',
    status: 'online'
  }, {
    name: 'Carlos Eduardo Lima',
    status: 'away'
  }, {
    src: 'https://i.pravatar.cc/150?img=9',
    name: 'Daniela Costa Santos',
    status: 'offline'
  }, {
    name: 'Eduardo Alves Pereira',
    status: 'online'
  }].map(student => \`
          <div class="list-group-item">
            <div class="avatar-with-name">
              \${renderAvatar({
    ...student,
    size: 'md'
  })}
              <span class="student-name">\${student.name}</span>
            </div>
          </div>
        \`).join('')}
      </div>
    </div>
  \`
}`,...(I=(U=m.parameters)==null?void 0:U.docs)==null?void 0:I.source}}};var _,F,H;g.parameters={...g.parameters,docs:{...(_=g.parameters)==null?void 0:_.docs,source:{originalSource:`{
  render: () => \`
    <style>\${componentStyles}</style>
    <div class="card" style="max-width: 600px;">
      <div class="card-header">
        <h5 class="mb-0">🏆 Ranking de Proficiência - Matemática</h5>
      </div>
      <div class="card-body p-0">
        <table class="table table-hover mb-0">
          <thead>
            <tr>
              <th style="width: 80px;">Posição</th>
              <th>Estudante</th>
              <th class="text-end">Pontos</th>
            </tr>
          </thead>
          <tbody>
            \${[{
    pos: '1º',
    src: 'https://i.pravatar.cc/150?img=1',
    name: 'Ana Carolina Silva',
    points: 985,
    badge: '🥇'
  }, {
    pos: '2º',
    src: 'https://i.pravatar.cc/150?img=5',
    name: 'Bruno Santos',
    points: 972,
    badge: '🥈'
  }, {
    pos: '3º',
    src: 'https://i.pravatar.cc/150?img=9',
    name: 'Camila Costa',
    points: 968,
    badge: '🥉'
  }, {
    pos: '4º',
    name: 'Daniel Alves',
    points: 945
  }, {
    pos: '5º',
    src: 'https://i.pravatar.cc/150?img=12',
    name: 'Eduardo Lima',
    points: 932
  }].map(student => \`
              <tr>
                <td class="text-center">\${student.pos}</td>
                <td>
                  <div class="avatar-with-name">
                    \${renderAvatar({
    ...student,
    size: 'md',
    badge: student.badge
  })}
                    <div class="student-info">
                      <span class="student-name">\${student.name}</span>
                    </div>
                  </div>
                </td>
                <td class="text-end">
                  <span class="badge bg-primary">\${student.points} pts</span>
                </td>
              </tr>
            \`).join('')}
          </tbody>
        </table>
      </div>
    </div>
  \`
}`,...(H=(F=g.parameters)==null?void 0:F.docs)==null?void 0:H.source}}};const X=["Default","WithPhoto","WithInitials","AllSizes","WithStatus","Loading","Group","WithBadge","ListaDeAlunos","RankingProficiencia"];export{o as AllSizes,s as Default,l as Group,m as ListaDeAlunos,p as Loading,g as RankingProficiencia,c as WithBadge,r as WithInitials,i as WithPhoto,d as WithStatus,X as __namedExportsOrder,Q as default};
