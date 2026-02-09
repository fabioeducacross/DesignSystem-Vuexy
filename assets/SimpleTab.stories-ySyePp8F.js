const Y={title:"Educacross Components V2/SimpleTab",tags:["autodocs"],argTypes:{variant:{control:"select",options:["default","pills","underline","boxed"],description:"Estilo visual das tabs"},orientation:{control:"select",options:["horizontal","vertical"],description:"Orientação das tabs"},size:{control:"select",options:["sm","md","lg"],description:"Tamanho das tabs"}},parameters:{layout:"padded",docs:{description:{component:"Tabs simples para navegação entre seções, com suporte a ícones, orientação vertical/horizontal e navegação por teclado."}}}},a=`
/* Tabs container */
.simple-tabs {
  display: flex;
  flex-direction: column;
}

.simple-tabs.orientation-vertical {
  flex-direction: row;
  gap: 24px;
}

/* Tab list */
.tab-list {
  display: flex;
  gap: 4px;
  border-bottom: 2px solid #ebe9f1;
  position: relative;
}

.simple-tabs.orientation-vertical .tab-list {
  flex-direction: column;
  border-bottom: none;
  border-right: 2px solid #ebe9f1;
  gap: 8px;
  min-width: 200px;
}

.tab-list.variant-pills {
  border-bottom: none;
  gap: 8px;
  background: #f8f8f8;
  padding: 4px;
  border-radius: 8px;
}

.tab-list.variant-underline {
  border-bottom: 1px solid #ebe9f1;
}

.tab-list.variant-boxed {
  border-bottom: none;
  gap: 8px;
}

/* Tab button */
.tab-button {
  padding: 12px 20px;
  background: none;
  border: none;
  color: #6e6b7b;
  font-weight: 500;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;
  position: relative;
  border-radius: 0;
  display: flex;
  align-items: center;
  gap: 8px;
  white-space: nowrap;
}

.tab-button:hover {
  color: #7367f0;
  background: rgba(115, 103, 240, 0.08);
}

.tab-button.active {
  color: #7367f0;
  font-weight: 600;
}

.tab-button.active::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  right: 0;
  height: 2px;
  background: #7367f0;
}

.simple-tabs.orientation-vertical .tab-button.active::after {
  bottom: 0;
  right: -2px;
  left: auto;
  top: 0;
  width: 2px;
  height: 100%;
}

/* Variant: Pills */
.tab-list.variant-pills .tab-button {
  border-radius: 6px;
  padding: 8px 16px;
}

.tab-list.variant-pills .tab-button.active {
  background: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08);
}

.tab-list.variant-pills .tab-button.active::after {
  display: none;
}

/* Variant: Underline */
.tab-list.variant-underline .tab-button {
  padding-bottom: 12px;
}

.tab-list.variant-underline .tab-button.active::after {
  height: 3px;
  border-radius: 2px 2px 0 0;
}

/* Variant: Boxed */
.tab-list.variant-boxed .tab-button {
  border: 1px solid #ebe9f1;
  border-radius: 6px;
  padding: 10px 16px;
  background: white;
}

.tab-list.variant-boxed .tab-button:hover {
  border-color: #7367f0;
}

.tab-list.variant-boxed .tab-button.active {
  background: #7367f0;
  color: white;
  border-color: #7367f0;
}

.tab-list.variant-boxed .tab-button.active::after {
  display: none;
}

/* Sizes */
.tab-button.size-sm {
  padding: 8px 16px;
  font-size: 13px;
}

.tab-button.size-lg {
  padding: 14px 24px;
  font-size: 15px;
}

/* Icons */
.tab-button .material-symbols-outlined {
  font-size: 18px;
}

.tab-button.size-sm .material-symbols-outlined {
  font-size: 16px;
}

.tab-button.size-lg .material-symbols-outlined {
  font-size: 20px;
}

/* Badge count */
.tab-badge {
  background: #ebe9f1;
  color: #6e6b7b;
  border-radius: 10px;
  padding: 2px 8px;
  font-size: 11px;
  font-weight: 600;
  margin-left: 4px;
}

.tab-button.active .tab-badge {
  background: #7367f0;
  color: white;
}

.tab-list.variant-pills .tab-button.active .tab-badge {
  background: #7367f0;
  color: white;
}

.tab-list.variant-boxed .tab-button.active .tab-badge {
  background: white;
  color: #7367f0;
}

/* Tab panel */
.tab-panel {
  padding: 24px 0;
  display: none;
}

.tab-panel.active {
  display: block;
}

.simple-tabs.orientation-vertical .tab-panel {
  flex: 1;
  padding: 0;
}

/* Compact mode */
.simple-tabs.compact .tab-button {
  padding: 8px 12px;
  font-size: 13px;
}

.simple-tabs.compact .tab-panel {
  padding: 16px 0;
}

/* Focus styles for keyboard navigation */
.tab-button:focus {
  outline: 2px solid #7367f0;
  outline-offset: 2px;
}

.tab-button:focus:not(:focus-visible) {
  outline: none;
}
`,e=(u,t=!1,x=null,f=null,Q="md")=>`
<button class="tab-button ${t?"active":""} size-${Q}" role="tab" aria-selected="${t}">
  ${x?`<span class="material-symbols-outlined">${x}</span>`:""}
  <span>${u}</span>
  ${f?`<span class="tab-badge">${f}</span>`:""}
</button>
`,s=(u,t=!1)=>`
<div class="tab-panel ${t?"active":""}" role="tabpanel">
  ${u}
</div>
`,n={render:()=>`
    <style>${a}</style>
    <div class="simple-tabs">
      <div class="tab-list" role="tablist">
        ${e("Visão Geral",!0)}
        ${e("Desempenho",!1)}
        ${e("Atividades",!1)}
        ${e("Relatórios",!1)}
      </div>
      ${s(`
        <div class="card">
          <div class="card-body">
            <h5>Visão Geral</h5>
            <p class="text-muted">Conteúdo da aba Visão Geral...</p>
          </div>
        </div>
      `,!0)}
    </div>
  `},i={render:()=>`
    <style>${a}</style>
    <div class="simple-tabs">
      <div class="tab-list" role="tablist">
        ${e("Resumo",!0)}
        ${e("Matemática",!1)}
        ${e("Português",!1)}
        ${e("Ciências",!1)}
        ${e("História",!1)}
        ${e("Geografia",!1)}
      </div>
      ${s(`
        <div class="card">
          <div class="card-body">
            <h5>Resumo Geral</h5>
            <div class="row">
              <div class="col-md-4 text-center mb-3">
                <h3 class="text-primary mb-0">28</h3>
                <p class="text-muted mb-0">Alunos</p>
              </div>
              <div class="col-md-4 text-center mb-3">
                <h3 class="text-success mb-0">85%</h3>
                <p class="text-muted mb-0">Aproveitamento</p>
              </div>
              <div class="col-md-4 text-center mb-3">
                <h3 class="text-info mb-0">142</h3>
                <p class="text-muted mb-0">Atividades</p>
              </div>
            </div>
          </div>
        </div>
      `,!0)}
    </div>
  `},d={render:()=>`
    <style>${a}</style>
    <div class="simple-tabs">
      <div class="tab-list" role="tablist">
        ${e("Dashboard",!0,"dashboard")}
        ${e("Alunos",!1,"groups","28")}
        ${e("Missões",!1,"assignment","12")}
        ${e("Relatórios",!1,"bar_chart")}
        ${e("Configurações",!1,"settings")}
      </div>
      ${s(`
        <div class="card">
          <div class="card-body">
            <h5>📊 Dashboard do Professor</h5>
            <p class="text-muted">Visão geral de todas as turmas e atividades...</p>
          </div>
        </div>
      `,!0)}
    </div>
  `},l={render:()=>`
    <style>${a}</style>
    <div class="simple-tabs orientation-vertical">
      <div class="tab-list" role="tablist">
        ${e("Perfil",!0,"person")}
        ${e("Segurança",!1,"lock")}
        ${e("Notificações",!1,"notifications","3")}
        ${e("Privacidade",!1,"shield")}
        ${e("Ajuda",!1,"help")}
      </div>
      <div>
        ${s(`
          <div class="card">
            <div class="card-body">
              <h5>Informações do Perfil</h5>
              <div class="mb-3">
                <label class="form-label">Nome Completo</label>
                <input type="text" class="form-control" value="Maria Silva Santos" />
              </div>
              <div class="mb-3">
                <label class="form-label">Email</label>
                <input type="email" class="form-control" value="maria@escola.edu.br" />
              </div>
              <button class="btn btn-primary">Salvar Alterações</button>
            </div>
          </div>
        `,!0)}
      </div>
    </div>
  `},r={render:()=>`
    <style>${a}</style>
    <div class="simple-tabs compact">
      <div class="tab-list" role="tablist">
        ${e("Hoje",!0,null,null,"sm")}
        ${e("Esta Semana",!1,null,null,"sm")}
        ${e("Este Mês",!1,null,null,"sm")}
        ${e("Este Ano",!1,null,null,"sm")}
      </div>
      ${s(`
        <div class="card">
          <div class="card-body">
            <p class="text-muted mb-0">Atividades de hoje: <strong>12 concluídas</strong></p>
          </div>
        </div>
      `,!0)}
    </div>
  `},o={render:()=>`
    <style>${a}</style>
    <div class="simple-tabs">
      <div class="tab-list variant-pills" role="tablist">
        ${e("Todas",!0,null,"24")}
        ${e("Ativas",!1,null,"8")}
        ${e("Pendentes",!1,null,"12")}
        ${e("Concluídas",!1,null,"4")}
      </div>
      ${s(`
        <div class="card">
          <div class="card-body">
            <h5>Todas as Missões (24)</h5>
            <p class="text-muted">Lista completa de missões...</p>
          </div>
        </div>
      `,!0)}
    </div>
  `},c={render:()=>`
    <style>${a}</style>
    <div class="simple-tabs">
      <div class="tab-list variant-underline" role="tablist">
        ${e("Turmas",!0,"groups")}
        ${e("Disciplinas",!1,"menu_book")}
        ${e("Alunos",!1,"person")}
      </div>
      ${s(`
        <div class="card">
          <div class="card-body">
            <h5>Gerenciar Turmas</h5>
            <p class="text-muted">Lista de todas as turmas...</p>
          </div>
        </div>
      `,!0)}
    </div>
  `},b={render:()=>`
    <style>${a}</style>
    <div class="simple-tabs">
      <div class="tab-list variant-boxed" role="tablist">
        ${e("Proficiência",!0,"trending_up")}
        ${e("Frequência",!1,"calendar_today")}
        ${e("Ranking",!1,"emoji_events")}
      </div>
      ${s(`
        <div class="card">
          <div class="card-body">
            <h5>📊 Relatório de Proficiência</h5>
            <p class="text-muted">Análise de proficiência dos alunos...</p>
          </div>
        </div>
      `,!0)}
    </div>
  `},v={render:()=>`
    <style>${a}</style>
    <div class="card" style="max-width: 1000px;">
      <div class="card-header">
        <h5 class="mb-0">Relatórios - 5º Ano A</h5>
      </div>
      <div class="card-body">
        <div class="simple-tabs">
          <div class="tab-list" role="tablist">
            ${e("Desempenho",!0,"bar_chart")}
            ${e("Proficiência",!1,"trending_up")}
            ${e("Atividades",!1,"assignment","142")}
            ${e("Frequência",!1,"calendar_today")}
          </div>
          ${s(`
            <div class="row g-3">
              <div class="col-md-3">
                <div class="card bg-light-primary text-center">
                  <div class="card-body">
                    <h3 class="text-primary mb-1">85%</h3>
                    <p class="mb-0 text-muted" style="font-size: 13px;">Média Geral</p>
                  </div>
                </div>
              </div>
              <div class="col-md-3">
                <div class="card bg-light-success text-center">
                  <div class="card-body">
                    <h3 class="text-success mb-1">28</h3>
                    <p class="mb-0 text-muted" style="font-size: 13px;">Alunos</p>
                  </div>
                </div>
              </div>
              <div class="col-md-3">
                <div class="card bg-light-info text-center">
                  <div class="card-body">
                    <h3 class="text-info mb-1">142</h3>
                    <p class="mb-0 text-muted" style="font-size: 13px;">Atividades</p>
                  </div>
                </div>
              </div>
              <div class="col-md-3">
                <div class="card bg-light-warning text-center">
                  <div class="card-body">
                    <h3 class="text-warning mb-1">92%</h3>
                    <p class="mb-0 text-muted" style="font-size: 13px;">Frequência</p>
                  </div>
                </div>
              </div>
            </div>
            <div class="card mt-3">
              <div class="card-body">
                <h6 class="mb-3">Desempenho por Disciplina</h6>
                <p class="text-muted">Gráfico de desempenho...</p>
              </div>
            </div>
          `,!0)}
        </div>
      </div>
    </div>
  `},p={render:()=>`
    <style>${a}</style>
    <div class="card" style="max-width: 900px;">
      <div class="card-header">
        <h5 class="mb-0">Ana Carolina Silva - 5º Ano A</h5>
      </div>
      <div class="card-body">
        <div class="simple-tabs">
          <div class="tab-list variant-underline" role="tablist">
            ${e("Visão Geral",!0,"dashboard")}
            ${e("Atividades",!1,"assignment","24")}
            ${e("Conquistas",!1,"emoji_events","12")}
            ${e("Relatórios",!1,"bar_chart")}
            ${e("Histórico",!1,"history")}
          </div>
          ${s(`
            <div class="row g-3 mb-3">
              <div class="col-md-4">
                <div class="card">
                  <div class="card-body text-center">
                    <h3 class="text-primary mb-1">985</h3>
                    <p class="mb-0 text-muted">Pontos XP</p>
                  </div>
                </div>
              </div>
              <div class="col-md-4">
                <div class="card">
                  <div class="card-body text-center">
                    <h3 class="text-success mb-1">87%</h3>
                    <p class="mb-0 text-muted">Taxa de Acerto</p>
                  </div>
                </div>
              </div>
              <div class="col-md-4">
                <div class="card">
                  <div class="card-body text-center">
                    <h3 class="text-info mb-1">1º</h3>
                    <p class="mb-0 text-muted">Ranking Turma</p>
                  </div>
                </div>
              </div>
            </div>
            <div class="card">
              <div class="card-body">
                <h6 class="mb-3">Progresso Recente</h6>
                <p class="text-muted">Últimas atividades e conquistas...</p>
              </div>
            </div>
          `,!0)}
        </div>
      </div>
    </div>
  `},m={render:()=>`
    <style>${a}</style>
    <div class="simple-tabs">
      <div class="tab-list" role="tablist">
        ${e("Tab 1",!0)}
        ${e("Tab 2",!1)}
        ${e("Tab 3",!1)}
        ${e("Tab 4",!1)}
      </div>
      ${s(`
        <div class="card">
          <div class="card-body">
            <h5>Navegação por Teclado</h5>
            <p class="text-muted mb-2">Use as teclas para navegar:</p>
            <ul class="text-muted">
              <li><kbd>←</kbd> <kbd>→</kbd> - Navegar entre tabs (horizontal)</li>
              <li><kbd>↑</kbd> <kbd>↓</kbd> - Navegar entre tabs (vertical)</li>
              <li><kbd>Home</kbd> - Primeira tab</li>
              <li><kbd>End</kbd> - Última tab</li>
              <li><kbd>Enter</kbd> ou <kbd>Space</kbd> - Ativar tab</li>
            </ul>
          </div>
        </div>
      `,!0)}
    </div>
    <script>
      // Exemplo de keyboard navigation (não funcional no Storybook, apenas demonstração)
      document.addEventListener('keydown', (e) => {
        const tabs = document.querySelectorAll('.tab-button');
        const activeTab = document.querySelector('.tab-button.active');
        const activeIndex = Array.from(tabs).indexOf(activeTab);
        
        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
          const nextIndex = (activeIndex + 1) % tabs.length;
          tabs[nextIndex].click();
        } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
          const prevIndex = (activeIndex - 1 + tabs.length) % tabs.length;
          tabs[prevIndex].click();
        } else if (e.key === 'Home') {
          tabs[0].click();
        } else if (e.key === 'End') {
          tabs[tabs.length - 1].click();
        }
      });
    <\/script>
  `};var h,y,g;n.parameters={...n.parameters,docs:{...(h=n.parameters)==null?void 0:h.docs,source:{originalSource:`{
  render: () => \`
    <style>\${componentStyles}</style>
    <div class="simple-tabs">
      <div class="tab-list" role="tablist">
        \${renderTab('Visão Geral', true)}
        \${renderTab('Desempenho', false)}
        \${renderTab('Atividades', false)}
        \${renderTab('Relatórios', false)}
      </div>
      \${renderPanel(\`
        <div class="card">
          <div class="card-body">
            <h5>Visão Geral</h5>
            <p class="text-muted">Conteúdo da aba Visão Geral...</p>
          </div>
        </div>
      \`, true)}
    </div>
  \`
}`,...(g=(y=n.parameters)==null?void 0:y.docs)==null?void 0:g.source}}};var $,T,k;i.parameters={...i.parameters,docs:{...($=i.parameters)==null?void 0:$.docs,source:{originalSource:`{
  render: () => \`
    <style>\${componentStyles}</style>
    <div class="simple-tabs">
      <div class="tab-list" role="tablist">
        \${renderTab('Resumo', true)}
        \${renderTab('Matemática', false)}
        \${renderTab('Português', false)}
        \${renderTab('Ciências', false)}
        \${renderTab('História', false)}
        \${renderTab('Geografia', false)}
      </div>
      \${renderPanel(\`
        <div class="card">
          <div class="card-body">
            <h5>Resumo Geral</h5>
            <div class="row">
              <div class="col-md-4 text-center mb-3">
                <h3 class="text-primary mb-0">28</h3>
                <p class="text-muted mb-0">Alunos</p>
              </div>
              <div class="col-md-4 text-center mb-3">
                <h3 class="text-success mb-0">85%</h3>
                <p class="text-muted mb-0">Aproveitamento</p>
              </div>
              <div class="col-md-4 text-center mb-3">
                <h3 class="text-info mb-0">142</h3>
                <p class="text-muted mb-0">Atividades</p>
              </div>
            </div>
          </div>
        </div>
      \`, true)}
    </div>
  \`
}`,...(k=(T=i.parameters)==null?void 0:T.docs)==null?void 0:k.source}}};var A,E,S;d.parameters={...d.parameters,docs:{...(A=d.parameters)==null?void 0:A.docs,source:{originalSource:`{
  render: () => \`
    <style>\${componentStyles}</style>
    <div class="simple-tabs">
      <div class="tab-list" role="tablist">
        \${renderTab('Dashboard', true, 'dashboard')}
        \${renderTab('Alunos', false, 'groups', '28')}
        \${renderTab('Missões', false, 'assignment', '12')}
        \${renderTab('Relatórios', false, 'bar_chart')}
        \${renderTab('Configurações', false, 'settings')}
      </div>
      \${renderPanel(\`
        <div class="card">
          <div class="card-body">
            <h5>📊 Dashboard do Professor</h5>
            <p class="text-muted">Visão geral de todas as turmas e atividades...</p>
          </div>
        </div>
      \`, true)}
    </div>
  \`
}`,...(S=(E=d.parameters)==null?void 0:E.docs)==null?void 0:S.source}}};var P,w,D;l.parameters={...l.parameters,docs:{...(P=l.parameters)==null?void 0:P.docs,source:{originalSource:`{
  render: () => \`
    <style>\${componentStyles}</style>
    <div class="simple-tabs orientation-vertical">
      <div class="tab-list" role="tablist">
        \${renderTab('Perfil', true, 'person')}
        \${renderTab('Segurança', false, 'lock')}
        \${renderTab('Notificações', false, 'notifications', '3')}
        \${renderTab('Privacidade', false, 'shield')}
        \${renderTab('Ajuda', false, 'help')}
      </div>
      <div>
        \${renderPanel(\`
          <div class="card">
            <div class="card-body">
              <h5>Informações do Perfil</h5>
              <div class="mb-3">
                <label class="form-label">Nome Completo</label>
                <input type="text" class="form-control" value="Maria Silva Santos" />
              </div>
              <div class="mb-3">
                <label class="form-label">Email</label>
                <input type="email" class="form-control" value="maria@escola.edu.br" />
              </div>
              <button class="btn btn-primary">Salvar Alterações</button>
            </div>
          </div>
        \`, true)}
      </div>
    </div>
  \`
}`,...(D=(w=l.parameters)==null?void 0:w.docs)==null?void 0:D.source}}};var z,C,R;r.parameters={...r.parameters,docs:{...(z=r.parameters)==null?void 0:z.docs,source:{originalSource:`{
  render: () => \`
    <style>\${componentStyles}</style>
    <div class="simple-tabs compact">
      <div class="tab-list" role="tablist">
        \${renderTab('Hoje', true, null, null, 'sm')}
        \${renderTab('Esta Semana', false, null, null, 'sm')}
        \${renderTab('Este Mês', false, null, null, 'sm')}
        \${renderTab('Este Ano', false, null, null, 'sm')}
      </div>
      \${renderPanel(\`
        <div class="card">
          <div class="card-body">
            <p class="text-muted mb-0">Atividades de hoje: <strong>12 concluídas</strong></p>
          </div>
        </div>
      \`, true)}
    </div>
  \`
}`,...(R=(C=r.parameters)==null?void 0:C.docs)==null?void 0:R.source}}};var _,F,I;o.parameters={...o.parameters,docs:{...(_=o.parameters)==null?void 0:_.docs,source:{originalSource:`{
  render: () => \`
    <style>\${componentStyles}</style>
    <div class="simple-tabs">
      <div class="tab-list variant-pills" role="tablist">
        \${renderTab('Todas', true, null, '24')}
        \${renderTab('Ativas', false, null, '8')}
        \${renderTab('Pendentes', false, null, '12')}
        \${renderTab('Concluídas', false, null, '4')}
      </div>
      \${renderPanel(\`
        <div class="card">
          <div class="card-body">
            <h5>Todas as Missões (24)</h5>
            <p class="text-muted">Lista completa de missões...</p>
          </div>
        </div>
      \`, true)}
    </div>
  \`
}`,...(I=(F=o.parameters)==null?void 0:F.docs)==null?void 0:I.source}}};var G,V,q;c.parameters={...c.parameters,docs:{...(G=c.parameters)==null?void 0:G.docs,source:{originalSource:`{
  render: () => \`
    <style>\${componentStyles}</style>
    <div class="simple-tabs">
      <div class="tab-list variant-underline" role="tablist">
        \${renderTab('Turmas', true, 'groups')}
        \${renderTab('Disciplinas', false, 'menu_book')}
        \${renderTab('Alunos', false, 'person')}
      </div>
      \${renderPanel(\`
        <div class="card">
          <div class="card-body">
            <h5>Gerenciar Turmas</h5>
            <p class="text-muted">Lista de todas as turmas...</p>
          </div>
        </div>
      \`, true)}
    </div>
  \`
}`,...(q=(V=c.parameters)==null?void 0:V.docs)==null?void 0:q.source}}};var M,N,j;b.parameters={...b.parameters,docs:{...(M=b.parameters)==null?void 0:M.docs,source:{originalSource:`{
  render: () => \`
    <style>\${componentStyles}</style>
    <div class="simple-tabs">
      <div class="tab-list variant-boxed" role="tablist">
        \${renderTab('Proficiência', true, 'trending_up')}
        \${renderTab('Frequência', false, 'calendar_today')}
        \${renderTab('Ranking', false, 'emoji_events')}
      </div>
      \${renderPanel(\`
        <div class="card">
          <div class="card-body">
            <h5>📊 Relatório de Proficiência</h5>
            <p class="text-muted">Análise de proficiência dos alunos...</p>
          </div>
        </div>
      \`, true)}
    </div>
  \`
}`,...(j=(N=b.parameters)==null?void 0:N.docs)==null?void 0:j.source}}};var H,L,B;v.parameters={...v.parameters,docs:{...(H=v.parameters)==null?void 0:H.docs,source:{originalSource:`{
  render: () => \`
    <style>\${componentStyles}</style>
    <div class="card" style="max-width: 1000px;">
      <div class="card-header">
        <h5 class="mb-0">Relatórios - 5º Ano A</h5>
      </div>
      <div class="card-body">
        <div class="simple-tabs">
          <div class="tab-list" role="tablist">
            \${renderTab('Desempenho', true, 'bar_chart')}
            \${renderTab('Proficiência', false, 'trending_up')}
            \${renderTab('Atividades', false, 'assignment', '142')}
            \${renderTab('Frequência', false, 'calendar_today')}
          </div>
          \${renderPanel(\`
            <div class="row g-3">
              <div class="col-md-3">
                <div class="card bg-light-primary text-center">
                  <div class="card-body">
                    <h3 class="text-primary mb-1">85%</h3>
                    <p class="mb-0 text-muted" style="font-size: 13px;">Média Geral</p>
                  </div>
                </div>
              </div>
              <div class="col-md-3">
                <div class="card bg-light-success text-center">
                  <div class="card-body">
                    <h3 class="text-success mb-1">28</h3>
                    <p class="mb-0 text-muted" style="font-size: 13px;">Alunos</p>
                  </div>
                </div>
              </div>
              <div class="col-md-3">
                <div class="card bg-light-info text-center">
                  <div class="card-body">
                    <h3 class="text-info mb-1">142</h3>
                    <p class="mb-0 text-muted" style="font-size: 13px;">Atividades</p>
                  </div>
                </div>
              </div>
              <div class="col-md-3">
                <div class="card bg-light-warning text-center">
                  <div class="card-body">
                    <h3 class="text-warning mb-1">92%</h3>
                    <p class="mb-0 text-muted" style="font-size: 13px;">Frequência</p>
                  </div>
                </div>
              </div>
            </div>
            <div class="card mt-3">
              <div class="card-body">
                <h6 class="mb-3">Desempenho por Disciplina</h6>
                <p class="text-muted">Gráfico de desempenho...</p>
              </div>
            </div>
          \`, true)}
        </div>
      </div>
    </div>
  \`
}`,...(B=(L=v.parameters)==null?void 0:L.docs)==null?void 0:B.source}}};var U,O,K;p.parameters={...p.parameters,docs:{...(U=p.parameters)==null?void 0:U.docs,source:{originalSource:`{
  render: () => \`
    <style>\${componentStyles}</style>
    <div class="card" style="max-width: 900px;">
      <div class="card-header">
        <h5 class="mb-0">Ana Carolina Silva - 5º Ano A</h5>
      </div>
      <div class="card-body">
        <div class="simple-tabs">
          <div class="tab-list variant-underline" role="tablist">
            \${renderTab('Visão Geral', true, 'dashboard')}
            \${renderTab('Atividades', false, 'assignment', '24')}
            \${renderTab('Conquistas', false, 'emoji_events', '12')}
            \${renderTab('Relatórios', false, 'bar_chart')}
            \${renderTab('Histórico', false, 'history')}
          </div>
          \${renderPanel(\`
            <div class="row g-3 mb-3">
              <div class="col-md-4">
                <div class="card">
                  <div class="card-body text-center">
                    <h3 class="text-primary mb-1">985</h3>
                    <p class="mb-0 text-muted">Pontos XP</p>
                  </div>
                </div>
              </div>
              <div class="col-md-4">
                <div class="card">
                  <div class="card-body text-center">
                    <h3 class="text-success mb-1">87%</h3>
                    <p class="mb-0 text-muted">Taxa de Acerto</p>
                  </div>
                </div>
              </div>
              <div class="col-md-4">
                <div class="card">
                  <div class="card-body text-center">
                    <h3 class="text-info mb-1">1º</h3>
                    <p class="mb-0 text-muted">Ranking Turma</p>
                  </div>
                </div>
              </div>
            </div>
            <div class="card">
              <div class="card-body">
                <h6 class="mb-3">Progresso Recente</h6>
                <p class="text-muted">Últimas atividades e conquistas...</p>
              </div>
            </div>
          \`, true)}
        </div>
      </div>
    </div>
  \`
}`,...(K=(O=p.parameters)==null?void 0:O.docs)==null?void 0:K.source}}};var W,X,J;m.parameters={...m.parameters,docs:{...(W=m.parameters)==null?void 0:W.docs,source:{originalSource:`{
  render: () => \`
    <style>\${componentStyles}</style>
    <div class="simple-tabs">
      <div class="tab-list" role="tablist">
        \${renderTab('Tab 1', true)}
        \${renderTab('Tab 2', false)}
        \${renderTab('Tab 3', false)}
        \${renderTab('Tab 4', false)}
      </div>
      \${renderPanel(\`
        <div class="card">
          <div class="card-body">
            <h5>Navegação por Teclado</h5>
            <p class="text-muted mb-2">Use as teclas para navegar:</p>
            <ul class="text-muted">
              <li><kbd>←</kbd> <kbd>→</kbd> - Navegar entre tabs (horizontal)</li>
              <li><kbd>↑</kbd> <kbd>↓</kbd> - Navegar entre tabs (vertical)</li>
              <li><kbd>Home</kbd> - Primeira tab</li>
              <li><kbd>End</kbd> - Última tab</li>
              <li><kbd>Enter</kbd> ou <kbd>Space</kbd> - Ativar tab</li>
            </ul>
          </div>
        </div>
      \`, true)}
    </div>
    <script>
      // Exemplo de keyboard navigation (não funcional no Storybook, apenas demonstração)
      document.addEventListener('keydown', (e) => {
        const tabs = document.querySelectorAll('.tab-button');
        const activeTab = document.querySelector('.tab-button.active');
        const activeIndex = Array.from(tabs).indexOf(activeTab);
        
        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
          const nextIndex = (activeIndex + 1) % tabs.length;
          tabs[nextIndex].click();
        } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
          const prevIndex = (activeIndex - 1 + tabs.length) % tabs.length;
          tabs[prevIndex].click();
        } else if (e.key === 'Home') {
          tabs[0].click();
        } else if (e.key === 'End') {
          tabs[tabs.length - 1].click();
        }
      });
    <\/script>
  \`
}`,...(J=(X=m.parameters)==null?void 0:X.docs)==null?void 0:J.source}}};const Z=["Default","Multiple","WithIcons","Vertical","Compact","Pills","Underline","Boxed","RelatorioProfessor","PerfilAluno","ComKeyboardNavigation"];export{b as Boxed,m as ComKeyboardNavigation,r as Compact,n as Default,i as Multiple,p as PerfilAluno,o as Pills,v as RelatorioProfessor,c as Underline,l as Vertical,d as WithIcons,Z as __namedExportsOrder,Y as default};
