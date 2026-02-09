const Q={title:"Educacross Components V2/Global/HelpChat",tags:["autodocs"],parameters:{layout:"fullscreen",docs:{description:{component:`
# HelpChat - Central de Ajuda

Widget de chat interativo para suporte ao usuário com múltiplos canais de atendimento.

---

## 📋 Contexto de Uso

### Personas

**Professor, Coordenador, Aluno** (Todos os Usuários)
- Acessa chat flutuante em qualquer página
- Envia dúvidas sobre funcionalidades
- Escolhe canal preferido (chat, WhatsApp, FAQ)
- Visualiza tempo médio de resposta

**Equipe de Suporte**
- Atende via chat ao vivo
- Redireciona para WhatsApp quando necessário
- Monitora status de atendimentos

### Casos de Uso

1. **Dúvida sobre Funcionalidade**: Usuário clica no botão flutuante, envia mensagem, recebe resposta em 5-10 min
2. **Tutorial Guiado**: Bot Typebot orienta usuário passo a passo
3. **Atendimento Offline**: Usuário envia mensagem fora do horário, recebe resposta por e-mail
4. **Migração WhatsApp**: Chat oferece link direto para WhatsApp quando usuário prefere mobile

---

## 🎨 Props API

| Prop | Type | Default | Descrição |
|------|------|---------|-----------|
| open | Boolean | false | Controla visibilidade do widget |
| channel | String | 'chat' | Canal ativo: 'chat', 'whatsapp', 'typebot' |
| status | String | 'online' | Status: 'online', 'offline', 'away' |

---

## 🎨 Design Specs

### Dimensões

| Elemento | Width | Height | Mobile |
|----------|-------|--------|--------|
| Widget | 960px max | 540px | Full screen |
| Sidebar | 320px | 100% | Collapses to header |
| Floating Button | 64px | 64px | 56px |

### Cores

| Status | Color | Box Shadow |
|--------|-------|------------|
| Online | #28c76f | rgba(40,199,111,0.18) |
| Away | #ffb300 | rgba(255,179,0,0.25) |
| Offline | #d8d6de | none |

### Comportamento

- **Floating Button**: Fixed bottom-right, 24px margin
- **Auto-scroll**: Mensagens scrollam para última ao abrir
- **Quick Actions**: Pills clicáveis para respostas rápidas
        `}}}},R=`
:root {
  --primary: #6e63e8;
  --accent: #00cfe8;
  --success: #28c76f;
  --danger: #ea5455;
  --bg: #f5f7fb;
  --text: #4b465c;
  --muted: #817d92;
  --border: #e4e3ed;
  --card: #ffffff;
}

.help-shell {
  min-height: 100vh;
  background: radial-gradient(circle at 20% 20%, rgba(110, 99, 232, 0.08), transparent 35%),
    radial-gradient(circle at 80% 30%, rgba(0, 207, 232, 0.08), transparent 32%), var(--bg);
  display: grid;
  place-items: center;
  padding: 28px;
  font-family: 'Inter', 'Segoe UI', system-ui, -apple-system, sans-serif;
}

.help-widget {
  width: min(960px, 100%);
  display: grid;
  grid-template-columns: 320px 1fr;
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: 18px;
  overflow: hidden;
  box-shadow: 0 24px 60px rgba(0, 0, 0, 0.08);
}

.help-sidebar {
  background: linear-gradient(135deg, rgba(110, 99, 232, 0.95), rgba(0, 207, 232, 0.9));
  color: #fff;
  padding: 22px 18px;
  display: grid;
  gap: 12px;
}

.help-sidebar .agent {
  display: flex;
  align-items: center;
  gap: 12px;
}

.help-sidebar .agent .avatar {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.14);
  display: grid;
  place-items: center;
  font-weight: 800;
}

.help-sidebar .pill {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.16);
  font-weight: 700;
  font-size: 12px;
}

.help-sidebar .cta {
  padding: 12px 14px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.22);
  font-weight: 700;
  cursor: pointer;
  transition: background 0.15s ease;
}

.help-sidebar .cta:hover { background: rgba(255, 255, 255, 0.18); }

.chat-panel {
  padding: 16px 18px 18px;
  display: grid;
  grid-template-rows: auto 1fr auto;
  gap: 10px;
  height: 540px;
}

.chat-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 12px;
  border: 1px solid var(--border);
  border-radius: 12px;
  background: #fafbff;
}

.chat-header .status {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  color: var(--muted);
}

.status-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: var(--success);
  box-shadow: 0 0 0 6px rgba(40, 199, 111, 0.18);
}

.chat-body {
  border: 1px solid var(--border);
  border-radius: 14px;
  background: #fff;
  padding: 14px;
  overflow: hidden;
  display: grid;
  grid-template-rows: 1fr auto;
  gap: 10px;
}

.messages {
  overflow-y: auto;
  display: grid;
  gap: 10px;
  padding-right: 6px;
}

.bubble {
  max-width: 88%;
  padding: 12px 14px;
  border-radius: 12px;
  font-size: 14px;
  line-height: 1.5;
  display: grid;
  gap: 6px;
  position: relative;
}

.bubble.me { justify-self: end; background: rgba(110, 99, 232, 0.08); color: #372e7c; border: 1px solid rgba(110, 99, 232, 0.18); }
.bubble.bot { justify-self: start; background: #f6f7fb; border: 1px solid var(--border); }

.bubble small { color: #9b98aa; font-size: 12px; }

.quick-actions { display: flex; flex-wrap: wrap; gap: 8px; }
.quick-pill { padding: 8px 12px; background: #f0efff; color: #4b3cc4; border-radius: 12px; font-weight: 700; font-size: 12px; cursor: pointer; }

.chat-input {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 10px;
  align-items: center;
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 10px;
  background: #fafbff;
}

.chat-input input {
  border: none;
  background: transparent;
  font-size: 14px;
  color: var(--text);
  outline: none;
}

.chat-input button {
  border: none;
  background: var(--primary);
  color: #fff;
  padding: 10px 14px;
  border-radius: 10px;
  font-weight: 700;
  cursor: pointer;
  box-shadow: 0 8px 22px rgba(110, 99, 232, 0.3);
}

.floating-button {
  position: fixed;
  right: 24px;
  bottom: 24px;
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: linear-gradient(135deg, #6e63e8, #00cfe8);
  color: #fff;
  display: grid;
  place-items: center;
  font-size: 26px;
  box-shadow: 0 20px 36px rgba(110, 99, 232, 0.35);
}

.tag-list { display: grid; gap: 10px; }
.tag-list button { width: 100%; text-align: left; border: 1px solid var(--border); background: #fff; padding: 12px; border-radius: 10px; font-weight: 700; color: var(--text); cursor: pointer; }

.status-card {
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 14px;
  display: grid;
  gap: 6px;
  background: #fff;
}

.loading-skeleton {
  background: linear-gradient(90deg, #f1f2f7, #e8e9f2, #f1f2f7);
  background-size: 200% 100%;
  animation: shimmer 1.4s infinite;
  height: 14px;
  border-radius: 6px;
}

@keyframes shimmer { to { background-position: -200% 0; } }

@media (max-width: 780px) {
  .help-widget { grid-template-columns: 1fr; height: auto; }
  .help-shell { padding: 14px; }
  .help-sidebar { border-radius: 18px 18px 0 0; }
  .chat-panel { height: auto; }
}
`,e=(t,i="")=>`
<div class="help-shell ${i}">
  ${t}
</div>
<style>${R}</style>
<script>
  setTimeout(() => {
    const area = document.querySelector('.messages');
    if (area) area.scrollTop = area.scrollHeight;
  }, 120);
<\/script>
`,a=(t,i)=>`
  <div class="help-widget">
    <div class="help-sidebar">${t}</div>
    <div class="chat-panel">${i}</div>
  </div>
`,s=`
  <div class="agent">
    <div class="avatar">AC</div>
    <div>
      <div style="font-weight:800">Central de Ajuda</div>
      <div style="font-size:13px;opacity:0.9">Equipe Educacross</div>
    </div>
  </div>
  <div class="pill">⏱ Tempo médio: 5-10 min</div>
  <div class="tag-list">
    <button>Enviar via WhatsApp</button>
    <button>Acessar chat ao vivo</button>
    <button>FAQ e Documentação</button>
  </div>
  <div class="cta">Ver status dos atendimentos</div>
`,v=(t,i=!0,B="Digite sua mensagem...")=>`
  <div class="chat-header">
    <div style="font-weight:800">Precisando de ajuda?</div>
    <div class="status"><span class="status-dot"></span> Online agora</div>
  </div>
  <div class="chat-body">
    <div class="messages">
      ${t}
    </div>
    ${i?`
      <div class="quick-actions">
        ${["Falar com humano","Abrir tutorial","Reenviar boleto"].map(H=>`<span class="quick-pill">${H}</span>`).join("")}
      </div>
    `:""}
  </div>
  <div class="chat-input">
    <input type="text" placeholder="${B}" />
    <button>Enviar</button>
  </div>
`,U=`
  <div class="bubble bot">Olá! Somos a equipe Educacross. Escolha um canal de atendimento ou envie sua mensagem.<small>14:02</small></div>
  <div class="bubble me">Preciso de ajuda para importar alunos.<small>14:03</small></div>
  <div class="bubble bot">Claro! Já localizei um tutorial passo a passo. Deseja abrir agora ou falar com um atendente?<small>14:03</small></div>
`,r={render:()=>e(a(s,v(U)))},d={render:()=>e(a(`
    ${s}
    <div class="cta" style="background: rgba(255,255,255,0.2)">💬 Alternar para typebot</div>
  `,`
    <div class="chat-header">
      <div style="font-weight:800">Automatizado</div>
      <div class="status"><span class="status-dot"></span> Fluxo guiado</div>
    </div>
    <div class="chat-body">
      <div style="height: 100%; border-radius: 12px; overflow: hidden; border: 1px solid var(--border); background:#f6f7fb; display:grid; place-items:center; color: var(--muted); font-weight:700;">
        <div>
          <div style="font-size:32px; margin-bottom:8px;">🤖</div>
          <div>Embed do Typebot</div>
          <div style="font-size:13px; color:#9b98aa;">Ajuste a URL para produção</div>
        </div>
      </div>
    </div>
    <div class="chat-input">
      <input type="text" placeholder="Envie comando ou digite /humano" />
      <button>Enviar</button>
    </div>
  `))},o={render:()=>e(`
    <div style="position: relative; width: 100%; height: 400px; background: var(--bg); border:1px dashed var(--border); border-radius: 16px; display:grid; place-items:center; color: var(--muted);">
      Área da página
    </div>
    <div class="floating-button"><i class="bi bi-question-lg"></i></div>
  `)},n={render:()=>e(a(s,`
    <div class="chat-header">
      <div style="font-weight:800">Central indisponível</div>
      <div class="status"><span class="status-dot" style="background:#ffb300; box-shadow:0 0 0 6px rgba(255,179,0,0.25);"></span> Resposta em até 24h</div>
    </div>
    <div class="chat-body">
      <div class="messages">
        <div class="bubble bot">Estamos fora do horário de atendimento. Envie sua mensagem e responderemos por e-mail.</div>
      </div>
      <div class="status-card">
        <div style="font-weight:800">Canais alternativos</div>
        <div style="font-size:13px;color:var(--muted)">E-mail suporte@educacross.com • FAQ 24/7</div>
      </div>
    </div>
    <div class="chat-input">
      <input type="text" placeholder="Descreva seu problema" />
      <button style="background:#ff9f43">Enviar offline</button>
    </div>
  `))},l={render:()=>e(a(s,`
    <div class="chat-header">
      <div style="font-weight:800">Carregando histórico</div>
      <div class="status"><span class="status-dot" style="background:#6e63e8"></span> Sincronizando</div>
    </div>
    <div class="chat-body">
      <div class="messages">
        ${'<div class="loading-skeleton" style="width:78%; height:18px;"></div>'.repeat(4)}
      </div>
    </div>
    <div class="chat-input">
      <input type="text" placeholder="Aguarde..." disabled />
      <button disabled>...</button>
    </div>
  `))},p={render:()=>e(a(s,v(U)),"mobile")},c={render:()=>e(a(s,`
    <div class="chat-header">
      <div style="font-weight:800">Nenhuma conversa</div>
      <div class="status"><span class="status-dot" style="background:#d8d6de; box-shadow:none;"></span> Histórico limpo</div>
    </div>
    <div class="chat-body">
      <div class="messages" style="align-content:center; justify-items:center; text-align:center; color: var(--muted); gap:14px;">
        <div style="font-size:40px;">📭</div>
        <div style="font-weight:800;">Comece uma conversa</div>
        <div style="font-size:13px;">Selecione um canal ou envie uma mensagem inicial.</div>
      </div>
    </div>
    <div class="chat-input">
      <input type="text" placeholder="Pergunte algo para nossa equipe" />
      <button>Enviar</button>
    </div>
  `))},u={render:()=>e(a(`
    ${s}
    <div class="cta" style="background: rgba(255,255,255,0.24);">📱 Modo WhatsApp</div>
  `,`
    ${v(`
      <div class="bubble bot">Pronto para migrar para o WhatsApp? Clique para abrir no aplicativo.</div>
      <div class="bubble me">Sim, quero falar pelo celular.</div>
    `,!1,"Enviar número ou abra o link")}
    <div style="margin-top:8px; display:flex; gap:10px;">
      <button style="flex:1" class="quick-pill">Abrir link direto</button>
      <button style="flex:1" class="quick-pill">Enviar SMS</button>
    </div>
  `))};var b,g,h;r.parameters={...r.parameters,docs:{...(b=r.parameters)==null?void 0:b.docs,source:{originalSource:`{
  render: () => shell(widget(defaultSidebar, chatPanel(sampleMessages)))
}`,...(h=(g=r.parameters)==null?void 0:g.docs)==null?void 0:h.source}}};var m,f,x;d.parameters={...d.parameters,docs:{...(m=d.parameters)==null?void 0:m.docs,source:{originalSource:`{
  render: () => shell(widget(\`
    \${defaultSidebar}
    <div class="cta" style="background: rgba(255,255,255,0.2)">💬 Alternar para typebot</div>
  \`, \`
    <div class="chat-header">
      <div style="font-weight:800">Automatizado</div>
      <div class="status"><span class="status-dot"></span> Fluxo guiado</div>
    </div>
    <div class="chat-body">
      <div style="height: 100%; border-radius: 12px; overflow: hidden; border: 1px solid var(--border); background:#f6f7fb; display:grid; place-items:center; color: var(--muted); font-weight:700;">
        <div>
          <div style="font-size:32px; margin-bottom:8px;">🤖</div>
          <div>Embed do Typebot</div>
          <div style="font-size:13px; color:#9b98aa;">Ajuste a URL para produção</div>
        </div>
      </div>
    </div>
    <div class="chat-input">
      <input type="text" placeholder="Envie comando ou digite /humano" />
      <button>Enviar</button>
    </div>
  \`))
}`,...(x=(f=d.parameters)==null?void 0:f.docs)==null?void 0:x.source}}};var y,w,k;o.parameters={...o.parameters,docs:{...(y=o.parameters)==null?void 0:y.docs,source:{originalSource:`{
  render: () => shell(\`
    <div style="position: relative; width: 100%; height: 400px; background: var(--bg); border:1px dashed var(--border); border-radius: 16px; display:grid; place-items:center; color: var(--muted);">
      Área da página
    </div>
    <div class="floating-button"><i class="bi bi-question-lg"></i></div>
  \`)
}`,...(k=(w=o.parameters)==null?void 0:w.docs)==null?void 0:k.source}}};var A,E,S;n.parameters={...n.parameters,docs:{...(A=n.parameters)==null?void 0:A.docs,source:{originalSource:`{
  render: () => shell(widget(defaultSidebar, \`
    <div class="chat-header">
      <div style="font-weight:800">Central indisponível</div>
      <div class="status"><span class="status-dot" style="background:#ffb300; box-shadow:0 0 0 6px rgba(255,179,0,0.25);"></span> Resposta em até 24h</div>
    </div>
    <div class="chat-body">
      <div class="messages">
        <div class="bubble bot">Estamos fora do horário de atendimento. Envie sua mensagem e responderemos por e-mail.</div>
      </div>
      <div class="status-card">
        <div style="font-weight:800">Canais alternativos</div>
        <div style="font-size:13px;color:var(--muted)">E-mail suporte@educacross.com • FAQ 24/7</div>
      </div>
    </div>
    <div class="chat-input">
      <input type="text" placeholder="Descreva seu problema" />
      <button style="background:#ff9f43">Enviar offline</button>
    </div>
  \`))
}`,...(S=(E=n.parameters)==null?void 0:E.docs)==null?void 0:S.source}}};var C,z,D;l.parameters={...l.parameters,docs:{...(C=l.parameters)==null?void 0:C.docs,source:{originalSource:`{
  render: () => shell(widget(defaultSidebar, \`
    <div class="chat-header">
      <div style="font-weight:800">Carregando histórico</div>
      <div class="status"><span class="status-dot" style="background:#6e63e8"></span> Sincronizando</div>
    </div>
    <div class="chat-body">
      <div class="messages">
        \${'<div class="loading-skeleton" style="width:78%; height:18px;"></div>'.repeat(4)}
      </div>
    </div>
    <div class="chat-input">
      <input type="text" placeholder="Aguarde..." disabled />
      <button disabled>...</button>
    </div>
  \`))
}`,...(D=(z=l.parameters)==null?void 0:z.docs)==null?void 0:D.source}}};var q,F,$;p.parameters={...p.parameters,docs:{...(q=p.parameters)==null?void 0:q.docs,source:{originalSource:`{
  render: () => shell(widget(defaultSidebar, chatPanel(sampleMessages)), 'mobile')
}`,...($=(F=p.parameters)==null?void 0:F.docs)==null?void 0:$.source}}};var P,W,j;c.parameters={...c.parameters,docs:{...(P=c.parameters)==null?void 0:P.docs,source:{originalSource:`{
  render: () => shell(widget(defaultSidebar, \`
    <div class="chat-header">
      <div style="font-weight:800">Nenhuma conversa</div>
      <div class="status"><span class="status-dot" style="background:#d8d6de; box-shadow:none;"></span> Histórico limpo</div>
    </div>
    <div class="chat-body">
      <div class="messages" style="align-content:center; justify-items:center; text-align:center; color: var(--muted); gap:14px;">
        <div style="font-size:40px;">📭</div>
        <div style="font-weight:800;">Comece uma conversa</div>
        <div style="font-size:13px;">Selecione um canal ou envie uma mensagem inicial.</div>
      </div>
    </div>
    <div class="chat-input">
      <input type="text" placeholder="Pergunte algo para nossa equipe" />
      <button>Enviar</button>
    </div>
  \`))
}`,...(j=(W=c.parameters)==null?void 0:W.docs)==null?void 0:j.source}}};var M,T,O;u.parameters={...u.parameters,docs:{...(M=u.parameters)==null?void 0:M.docs,source:{originalSource:`{
  render: () => shell(widget(\`
    \${defaultSidebar}
    <div class="cta" style="background: rgba(255,255,255,0.24);">📱 Modo WhatsApp</div>
  \`, \`
    \${chatPanel(\`
      <div class="bubble bot">Pronto para migrar para o WhatsApp? Clique para abrir no aplicativo.</div>
      <div class="bubble me">Sim, quero falar pelo celular.</div>
    \`, false, 'Enviar número ou abra o link')}
    <div style="margin-top:8px; display:flex; gap:10px;">
      <button style="flex:1" class="quick-pill">Abrir link direto</button>
      <button style="flex:1" class="quick-pill">Enviar SMS</button>
    </div>
  \`))
}`,...(O=(T=u.parameters)==null?void 0:T.docs)==null?void 0:O.source}}};const V=["Default","BotComTypebot","FloatingFechado","StatusOffline","Carregando","MobileFull","Vazio","FluxoWhatsApp"];export{d as BotComTypebot,l as Carregando,r as Default,o as FloatingFechado,u as FluxoWhatsApp,p as MobileFull,n as StatusOffline,c as Vazio,V as __namedExportsOrder,Q as default};
