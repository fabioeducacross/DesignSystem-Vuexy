const Y={title:"Educacross Components V2/Navigation/TabRouter",tags:["autodocs"],parameters:{docs:{description:{component:`
# TabRouter

Componente de **navegação por abas** (tabs) com suporte a ícones, badges e integração com Vue Router.

## Quando usar

- ✅ Navegação principal do dashboard (4-6 seções)
- ✅ Perfil de entidade (aluno, professor, turma) com múltiplas abas
- ✅ Relatórios com diferentes visualizações (tabelas, gráficos, detalhes)
- ✅ Formulários multi-step (wizard navigation)
- ✅ Páginas de configurações (conta, preferências, notificações)
- ✅ Interfaces admin com múltiplos painéis

## Variantes

- **Default**: Tabs com ícones + labels + badges (Dashboard, Missões badge 5, Alunos, Relatórios)
- **WithIcons**: Visão Geral, Desempenho, Atividades badge 12, Histórico
- **PillsVariant**: Background colorido roxo (active) ao invés de border-bottom
- **PerfilDoAluno**: Card header + 5 tabs (Resumo, Missões badge 8, Desempenho, Conquistas, Histórico)
- **RelatorioMissao**: Title + meta + 5 tabs (Visão Geral, Alunos badge 28 verde, Questões, Evidências, Exportar)
- **DashboardCoordenador**: 6 tabs (Dashboard, Turmas badge 24, Professores badge 32, Desempenho, Relatórios, Config)
- **KeyboardNavigation**: Focus visible + ARIA attributes + setas ←→

## Características visuais

- **Tab border-bottom**: 1px #E8E8E8 (list container)
- **Tab active**: color #6E63E8, border-bottom 2px #6E63E8
- **Tab hover**: color #6E63E8, background #F8F8F8
- **Badge**: background #EA5455 (vermelho), color #fff, padding 2×6px, border-radius 10px
- **Pills active**: background #6E63E8, color #fff (sem border-bottom)
        `}}}},s=`<style>
.tab-router {
  border-bottom: 1px solid #E8E8E8;
}

.tab-router-list {
  display: flex;
  gap: 4px;
  list-style: none;
  margin: 0;
  padding: 0;
}

.tab-router-item {
  position: relative;
}

.tab-router-link {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 14px 20px;
  color: #6E6B7B;
  text-decoration: none;
  font-size: 15px;
  font-weight: 500;
  border-bottom: 2px solid transparent;
  transition: all .2s;
  cursor: pointer;
}

.tab-router-link:hover {
  color: #6E63E8;
  background: #F8F8F8;
}

.tab-router-link.active {
  color: #6E63E8;
  border-bottom-color: #6E63E8;
}

.tab-router-link:focus {
  outline: 2px solid #6E63E8;
  outline-offset: -2px;
}

.tab-router-link i {
  font-size: 18px;
}

.tab-badge {
  background: #EA5455;
  color: #fff;
  font-size: 11px;
  font-weight: 600;
  padding: 2px 6px;
  border-radius: 10px;
  min-width: 18px;
  text-align: center;
}

.tab-router.pills .tab-router-link {
  border-radius: 6px;
  border-bottom: none;
}

.tab-router.pills .tab-router-link.active {
  background: #6E63E8;
  color: #fff;
}

.tab-router.pills .tab-router-link.active .tab-badge {
  background: rgba(255,255,255,0.2);
  color: #fff;
}
</style>`,b=[{path:"/dashboard",label:"Dashboard",icon:"bi-speedometer2"},{path:"/missions",label:"Missões",icon:"bi-book",badge:5},{path:"/students",label:"Alunos",icon:"bi-people"},{path:"/reports",label:"Relatórios",icon:"bi-bar-chart"}],r={render:()=>`
    ${s}
    <nav class="tab-router">
      <ul class="tab-router-list">
        ${b.map((a,e)=>`
          <li class="tab-router-item">
            <a href="#${a.path}" class="tab-router-link ${e===0?"active":""}" onclick="event.preventDefault()">
              <i class="bi ${a.icon}"></i>
              <span>${a.label}</span>
              ${a.badge?`<span class="tab-badge">${a.badge}</span>`:""}
            </a>
          </li>
        `).join("")}
      </ul>
    </nav>
    <p style="margin-top: 16px; font-size: 13px; color: #6E6B7B">
      <strong>Contexto:</strong> Navegação principal do dashboard do professor.
    </p>
  `},t={render:()=>`
    ${s}
    <nav class="tab-router">
      <ul class="tab-router-list">
        <li class="tab-router-item">
          <a href="#" class="tab-router-link active">
            <i class="bi bi-grid"></i>
            <span>Visão Geral</span>
          </a>
        </li>
        <li class="tab-router-item">
          <a href="#" class="tab-router-link">
            <i class="bi bi-graph-up"></i>
            <span>Desempenho</span>
          </a>
        </li>
        <li class="tab-router-item">
          <a href="#" class="tab-router-link">
            <i class="bi bi-list-check"></i>
            <span>Atividades</span>
            <span class="tab-badge">12</span>
          </a>
        </li>
        <li class="tab-router-item">
          <a href="#" class="tab-router-link">
            <i class="bi bi-clock-history"></i>
            <span>Histórico</span>
          </a>
        </li>
      </ul>
    </nav>
    <p style="margin-top: 16px; font-size: 13px; color: #6E6B7B">
      <strong>Contexto:</strong> Navegação de relatório com ícones descritivos (badge 12 atividades pendentes).
    </p>
  `},i={render:()=>`
    ${s}
    <nav class="tab-router pills">
      <ul class="tab-router-list">
        ${b.map((a,e)=>`
          <li class="tab-router-item">
            <a href="#" class="tab-router-link ${e===0?"active":""}">
              <i class="bi ${a.icon}"></i>
              <span>${a.label}</span>
            </a>
          </li>
        `).join("")}
      </ul>
    </nav>
    <p style="margin-top: 16px; font-size: 13px; color: #6E6B7B">
      <strong>Variante:</strong> Pills com background colorido roxo (active) ao invés de border-bottom.
    </p>
  `},o={render:()=>`
    ${s}
    <div style="max-width: 800px">
      <div style="margin-bottom: 20px; padding: 20px; background: #fff; border: 1px solid #D8D6DE; border-radius: 8px 8px 0 0">
        <div style="display: flex; align-items: center; gap: 16px">
          <div style="width: 64px; height: 64px; border-radius: 50%; background: linear-gradient(135deg, #6E63E8, #28C76F); display: flex; align-items: center; justify-content: center; color: #fff; font-size: 24px; font-weight: 700">
            JS
          </div>
          <div>
            <h2 style="margin: 0 0 4px; font-size: 20px; font-weight: 600; color: #5E5873">João Silva</h2>
            <p style="margin: 0; font-size: 14px; color: #6E6B7B">
              5º A • Matrícula: 2024001234 • <span style="color: #28C76F">●</span> Ativo
            </p>
          </div>
        </div>
      </div>
      
      <nav class="tab-router">
        <ul class="tab-router-list">
          <li class="tab-router-item">
            <a href="#" class="tab-router-link active">
              <i class="bi bi-person"></i>
              <span>Resumo</span>
            </a>
          </li>
          <li class="tab-router-item">
            <a href="#" class="tab-router-link">
              <i class="bi bi-book"></i>
              <span>Missões</span>
              <span class="tab-badge">8</span>
            </a>
          </li>
          <li class="tab-router-item">
            <a href="#" class="tab-router-link">
              <i class="bi bi-graph-up"></i>
              <span>Desempenho</span>
            </a>
          </li>
          <li class="tab-router-item">
            <a href="#" class="tab-router-link">
              <i class="bi bi-trophy"></i>
              <span>Conquistas</span>
            </a>
          </li>
          <li class="tab-router-item">
            <a href="#" class="tab-router-link">
              <i class="bi bi-clock-history"></i>
              <span>Histórico</span>
            </a>
          </li>
        </ul>
      </nav>
    </div>
    <p style="margin-top: 16px; font-size: 13px; color: #6E6B7B">
      <strong>Contexto:</strong> Perfil do aluno João Silva com 5 seções navegáveis (8 missões pendentes).
    </p>
  `},n={render:()=>`
    ${s}
    <div style="max-width: 900px">
      <div style="margin-bottom: 16px">
        <h2 style="margin: 0 0 4px; font-size: 20px; font-weight: 600; color: #5E5873">Missão: Frações Básicas</h2>
        <p style="margin: 0; font-size: 14px; color: #6E6B7B">5º A • Matemática • Aplicada em 15/01/2024</p>
      </div>
      
      <nav class="tab-router">
        <ul class="tab-router-list">
          <li class="tab-router-item">
            <a href="#" class="tab-router-link active">
              <i class="bi bi-grid"></i>
              <span>Visão Geral</span>
            </a>
          </li>
          <li class="tab-router-item">
            <a href="#" class="tab-router-link">
              <i class="bi bi-people"></i>
              <span>Alunos</span>
              <span class="tab-badge" style="background: #28C76F">28</span>
            </a>
          </li>
          <li class="tab-router-item">
            <a href="#" class="tab-router-link">
              <i class="bi bi-list-ol"></i>
              <span>Questões</span>
            </a>
          </li>
          <li class="tab-router-item">
            <a href="#" class="tab-router-link">
              <i class="bi bi-file-earmark-text"></i>
              <span>Evidências</span>
            </a>
          </li>
          <li class="tab-router-item">
            <a href="#" class="tab-router-link">
              <i class="bi bi-download"></i>
              <span>Exportar</span>
            </a>
          </li>
        </ul>
      </nav>
    </div>
    <p style="margin-top: 16px; font-size: 13px; color: #6E6B7B">
      <strong>Contexto:</strong> Relatório de missão "Frações Básicas" com navegação 5 abas (28 alunos participaram).
    </p>
  `},l={render:()=>`
    ${s}
    <div style="max-width: 1200px">
      <div style="margin-bottom: 20px">
        <h1 style="margin: 0 0 4px; font-size: 24px; font-weight: 700; color: #5E5873">Painel do Coordenador</h1>
        <p style="margin: 0; font-size: 14px; color: #6E6B7B">
          João Carlos • Escola Municipal Vista Alegre • 24 turmas, 32 professores
        </p>
      </div>
      
      <nav class="tab-router">
        <ul class="tab-router-list">
          <li class="tab-router-item">
            <a href="#" class="tab-router-link active">
              <i class="bi bi-speedometer2"></i>
              <span>Dashboard</span>
            </a>
          </li>
          <li class="tab-router-item">
            <a href="#" class="tab-router-link">
              <i class="bi bi-grid-3x3"></i>
              <span>Turmas</span>
              <span class="tab-badge" style="background: #6E63E8">24</span>
            </a>
          </li>
          <li class="tab-router-item">
            <a href="#" class="tab-router-link">
              <i class="bi bi-person-badge"></i>
              <span>Professores</span>
              <span class="tab-badge" style="background: #6E63E8">32</span>
            </a>
          </li>
          <li class="tab-router-item">
            <a href="#" class="tab-router-link">
              <i class="bi bi-graph-up-arrow"></i>
              <span>Desempenho</span>
            </a>
          </li>
          <li class="tab-router-item">
            <a href="#" class="tab-router-link">
              <i class="bi bi-file-bar-graph"></i>
              <span>Relatórios</span>
            </a>
          </li>
          <li class="tab-router-item">
            <a href="#" class="tab-router-link">
              <i class="bi bi-gear"></i>
              <span>Configurações</span>
            </a>
          </li>
        </ul>
      </nav>
    </div>
    <p style="margin-top: 16px; font-size: 13px; color: #6E6B7B">
      <strong>Contexto:</strong> Dashboard coordenador João Carlos - 6 seções principais (24 turmas, 32 professores).
    </p>
  `},c={render:()=>`
    ${s}
    <style>
      .tab-router-link:focus {
        outline: 2px solid #6E63E8;
        outline-offset: -2px;
      }
    </style>
    
    <nav class="tab-router">
      <ul class="tab-router-list" role="tablist">
        ${b.map((a,e)=>`
          <li class="tab-router-item" role="presentation">
            <a href="#" 
               class="tab-router-link ${e===0?"active":""}" 
               role="tab" 
               tabindex="${e===0?"0":"-1"}" 
               aria-selected="${e===0}">
              <i class="bi ${a.icon}"></i>
              <span>${a.label}</span>
            </a>
          </li>
        `).join("")}
      </ul>
    </nav>
    
    <div style="margin-top: 20px; padding: 16px; background: #F8F8F8; border-radius: 8px; font-size: 13px; color: #6E6B7B">
      <strong>WCAG 2.1 AA - Navegação por Teclado:</strong>
      <ul style="margin: 8px 0 0; padding-left: 20px">
        <li><kbd>←</kbd> <kbd>→</kbd> - Navegar entre tabs (Arrow Left/Right)</li>
        <li><kbd>Home</kbd> - Ir para primeira tab</li>
        <li><kbd>End</kbd> - Ir para última tab</li>
        <li><kbd>Enter</kbd> / <kbd>Espaço</kbd> - Ativar tab</li>
        <li><strong>role="tablist"</strong> + <strong>role="tab"</strong></li>
        <li><strong>aria-selected</strong> indica tab ativa</li>
        <li>Outline focus 2px roxo visível em cada tab</li>
      </ul>
    </div>
  `},p={render:()=>`
    ${s}
    <style>
      .tab-router-compact .tab-router-link {
        padding: 10px 16px;
        font-size: 14px;
      }
      .tab-router-compact .tab-router-link i {
        font-size: 16px;
      }
    </style>
    
    <nav class="tab-router tab-router-compact" style="max-width: 400px">
      <ul class="tab-router-list">
        <li class="tab-router-item">
          <a href="#" class="tab-router-link active">
            <i class="bi bi-house"></i>
            <span>Início</span>
          </a>
        </li>
        <li class="tab-router-item">
          <a href="#" class="tab-router-link">
            <i class="bi bi-book"></i>
            <span>Biblioteca</span>
            <span class="tab-badge">3</span>
          </a>
        </li>
        <li class="tab-router-item">
          <a href="#" class="tab-router-link">
            <i class="bi bi-star"></i>
            <span>Favoritos</span>
          </a>
        </li>
      </ul>
    </nav>
    <p style="margin-top: 16px; font-size: 13px; color: #6E6B7B">
      <strong>Variante:</strong> Compact size (padding 10×16px) para sidebars ou espaços menores.
    </p>
  `};var d,u,m,x,g;r.parameters={...r.parameters,docs:{...(d=r.parameters)==null?void 0:d.docs,source:{originalSource:`{
  render: () => \`
    \${styles}
    <nav class="tab-router">
      <ul class="tab-router-list">
        \${routes.map((r, i) => \`
          <li class="tab-router-item">
            <a href="#\${r.path}" class="tab-router-link \${i === 0 ? 'active' : ''}" onclick="event.preventDefault()">
              <i class="bi \${r.icon}"></i>
              <span>\${r.label}</span>
              \${r.badge ? \`<span class="tab-badge">\${r.badge}</span>\` : ''}
            </a>
          </li>
        \`).join('')}
      </ul>
    </nav>
    <p style="margin-top: 16px; font-size: 13px; color: #6E6B7B">
      <strong>Contexto:</strong> Navegação principal do dashboard do professor.
    </p>
  \`
}`,...(m=(u=r.parameters)==null?void 0:u.docs)==null?void 0:m.source},description:{story:`Story: Default

4 tabs com ícones: Dashboard (ativo), Missões (badge 5 vermelho), Alunos, Relatórios.

Educational context: Navegação principal do dashboard do professor.`,...(g=(x=r.parameters)==null?void 0:x.docs)==null?void 0:g.description}}};var f,v,h,E,k;t.parameters={...t.parameters,docs:{...(f=t.parameters)==null?void 0:f.docs,source:{originalSource:`{
  render: () => \`
    \${styles}
    <nav class="tab-router">
      <ul class="tab-router-list">
        <li class="tab-router-item">
          <a href="#" class="tab-router-link active">
            <i class="bi bi-grid"></i>
            <span>Visão Geral</span>
          </a>
        </li>
        <li class="tab-router-item">
          <a href="#" class="tab-router-link">
            <i class="bi bi-graph-up"></i>
            <span>Desempenho</span>
          </a>
        </li>
        <li class="tab-router-item">
          <a href="#" class="tab-router-link">
            <i class="bi bi-list-check"></i>
            <span>Atividades</span>
            <span class="tab-badge">12</span>
          </a>
        </li>
        <li class="tab-router-item">
          <a href="#" class="tab-router-link">
            <i class="bi bi-clock-history"></i>
            <span>Histórico</span>
          </a>
        </li>
      </ul>
    </nav>
    <p style="margin-top: 16px; font-size: 13px; color: #6E6B7B">
      <strong>Contexto:</strong> Navegação de relatório com ícones descritivos (badge 12 atividades pendentes).
    </p>
  \`
}`,...(h=(v=t.parameters)==null?void 0:v.docs)==null?void 0:h.source},description:{story:`Story: WithIcons

4 tabs: Visão Geral (ativo), Desempenho (gráfico), Atividades (badge 12 vermelho), Histórico (relógio).

Educational context: Navegação de relatório com ícones descritivos.`,...(k=(E=t.parameters)==null?void 0:E.docs)==null?void 0:k.description}}};var y,B,F,A,D;i.parameters={...i.parameters,docs:{...(y=i.parameters)==null?void 0:y.docs,source:{originalSource:`{
  render: () => \`
    \${styles}
    <nav class="tab-router pills">
      <ul class="tab-router-list">
        \${routes.map((r, i) => \`
          <li class="tab-router-item">
            <a href="#" class="tab-router-link \${i === 0 ? 'active' : ''}">
              <i class="bi \${r.icon}"></i>
              <span>\${r.label}</span>
            </a>
          </li>
        \`).join('')}
      </ul>
    </nav>
    <p style="margin-top: 16px; font-size: 13px; color: #6E6B7B">
      <strong>Variante:</strong> Pills com background colorido roxo (active) ao invés de border-bottom.
    </p>
  \`
}`,...(F=(B=i.parameters)==null?void 0:B.docs)==null?void 0:F.source},description:{story:`Story: PillsVariant

4 tabs variant pills: Dashboard (ativo background roxo), Missões, Alunos, Relatórios.

Educational context: Variante pills com background colorido (alternativa moderna).`,...(D=(A=i.parameters)==null?void 0:A.docs)==null?void 0:D.description}}};var $,C,z,w,R;o.parameters={...o.parameters,docs:{...($=o.parameters)==null?void 0:$.docs,source:{originalSource:`{
  render: () => \`
    \${styles}
    <div style="max-width: 800px">
      <div style="margin-bottom: 20px; padding: 20px; background: #fff; border: 1px solid #D8D6DE; border-radius: 8px 8px 0 0">
        <div style="display: flex; align-items: center; gap: 16px">
          <div style="width: 64px; height: 64px; border-radius: 50%; background: linear-gradient(135deg, #6E63E8, #28C76F); display: flex; align-items: center; justify-content: center; color: #fff; font-size: 24px; font-weight: 700">
            JS
          </div>
          <div>
            <h2 style="margin: 0 0 4px; font-size: 20px; font-weight: 600; color: #5E5873">João Silva</h2>
            <p style="margin: 0; font-size: 14px; color: #6E6B7B">
              5º A • Matrícula: 2024001234 • <span style="color: #28C76F">●</span> Ativo
            </p>
          </div>
        </div>
      </div>
      
      <nav class="tab-router">
        <ul class="tab-router-list">
          <li class="tab-router-item">
            <a href="#" class="tab-router-link active">
              <i class="bi bi-person"></i>
              <span>Resumo</span>
            </a>
          </li>
          <li class="tab-router-item">
            <a href="#" class="tab-router-link">
              <i class="bi bi-book"></i>
              <span>Missões</span>
              <span class="tab-badge">8</span>
            </a>
          </li>
          <li class="tab-router-item">
            <a href="#" class="tab-router-link">
              <i class="bi bi-graph-up"></i>
              <span>Desempenho</span>
            </a>
          </li>
          <li class="tab-router-item">
            <a href="#" class="tab-router-link">
              <i class="bi bi-trophy"></i>
              <span>Conquistas</span>
            </a>
          </li>
          <li class="tab-router-item">
            <a href="#" class="tab-router-link">
              <i class="bi bi-clock-history"></i>
              <span>Histórico</span>
            </a>
          </li>
        </ul>
      </nav>
    </div>
    <p style="margin-top: 16px; font-size: 13px; color: #6E6B7B">
      <strong>Contexto:</strong> Perfil do aluno João Silva com 5 seções navegáveis (8 missões pendentes).
    </p>
  \`
}`,...(z=(C=o.parameters)==null?void 0:C.docs)==null?void 0:z.source},description:{story:`Story: PerfilDoAluno

Card header com avatar grande + nome/info + 5 tabs (Resumo ativo, Missões badge 8, Desempenho, Conquistas, Histórico).

Educational context: Perfil do aluno João Silva com 5 seções navegáveis.`,...(R=(w=o.parameters)==null?void 0:w.docs)==null?void 0:R.description}}};var S,P,V,M,N;n.parameters={...n.parameters,docs:{...(S=n.parameters)==null?void 0:S.docs,source:{originalSource:`{
  render: () => \`
    \${styles}
    <div style="max-width: 900px">
      <div style="margin-bottom: 16px">
        <h2 style="margin: 0 0 4px; font-size: 20px; font-weight: 600; color: #5E5873">Missão: Frações Básicas</h2>
        <p style="margin: 0; font-size: 14px; color: #6E6B7B">5º A • Matemática • Aplicada em 15/01/2024</p>
      </div>
      
      <nav class="tab-router">
        <ul class="tab-router-list">
          <li class="tab-router-item">
            <a href="#" class="tab-router-link active">
              <i class="bi bi-grid"></i>
              <span>Visão Geral</span>
            </a>
          </li>
          <li class="tab-router-item">
            <a href="#" class="tab-router-link">
              <i class="bi bi-people"></i>
              <span>Alunos</span>
              <span class="tab-badge" style="background: #28C76F">28</span>
            </a>
          </li>
          <li class="tab-router-item">
            <a href="#" class="tab-router-link">
              <i class="bi bi-list-ol"></i>
              <span>Questões</span>
            </a>
          </li>
          <li class="tab-router-item">
            <a href="#" class="tab-router-link">
              <i class="bi bi-file-earmark-text"></i>
              <span>Evidências</span>
            </a>
          </li>
          <li class="tab-router-item">
            <a href="#" class="tab-router-link">
              <i class="bi bi-download"></i>
              <span>Exportar</span>
            </a>
          </li>
        </ul>
      </nav>
    </div>
    <p style="margin-top: 16px; font-size: 13px; color: #6E6B7B">
      <strong>Contexto:</strong> Relatório de missão "Frações Básicas" com navegação 5 abas (28 alunos participaram).
    </p>
  \`
}`,...(V=(P=n.parameters)==null?void 0:P.docs)==null?void 0:V.source},description:{story:`Story: RelatorioMissao

Title + meta + 5 tabs (Visão Geral ativo, Alunos badge 28 verde, Questões, Evidências, Exportar com download icon).

Educational context: Relatório de missão "Frações Básicas" com navegação 5 abas.`,...(N=(M=n.parameters)==null?void 0:M.docs)==null?void 0:N.description}}};var T,I,H,J,G;l.parameters={...l.parameters,docs:{...(T=l.parameters)==null?void 0:T.docs,source:{originalSource:`{
  render: () => \`
    \${styles}
    <div style="max-width: 1200px">
      <div style="margin-bottom: 20px">
        <h1 style="margin: 0 0 4px; font-size: 24px; font-weight: 700; color: #5E5873">Painel do Coordenador</h1>
        <p style="margin: 0; font-size: 14px; color: #6E6B7B">
          João Carlos • Escola Municipal Vista Alegre • 24 turmas, 32 professores
        </p>
      </div>
      
      <nav class="tab-router">
        <ul class="tab-router-list">
          <li class="tab-router-item">
            <a href="#" class="tab-router-link active">
              <i class="bi bi-speedometer2"></i>
              <span>Dashboard</span>
            </a>
          </li>
          <li class="tab-router-item">
            <a href="#" class="tab-router-link">
              <i class="bi bi-grid-3x3"></i>
              <span>Turmas</span>
              <span class="tab-badge" style="background: #6E63E8">24</span>
            </a>
          </li>
          <li class="tab-router-item">
            <a href="#" class="tab-router-link">
              <i class="bi bi-person-badge"></i>
              <span>Professores</span>
              <span class="tab-badge" style="background: #6E63E8">32</span>
            </a>
          </li>
          <li class="tab-router-item">
            <a href="#" class="tab-router-link">
              <i class="bi bi-graph-up-arrow"></i>
              <span>Desempenho</span>
            </a>
          </li>
          <li class="tab-router-item">
            <a href="#" class="tab-router-link">
              <i class="bi bi-file-bar-graph"></i>
              <span>Relatórios</span>
            </a>
          </li>
          <li class="tab-router-item">
            <a href="#" class="tab-router-link">
              <i class="bi bi-gear"></i>
              <span>Configurações</span>
            </a>
          </li>
        </ul>
      </nav>
    </div>
    <p style="margin-top: 16px; font-size: 13px; color: #6E6B7B">
      <strong>Contexto:</strong> Dashboard coordenador João Carlos - 6 seções principais (24 turmas, 32 professores).
    </p>
  \`
}`,...(H=(I=l.parameters)==null?void 0:I.docs)==null?void 0:H.source},description:{story:`Story: DashboardCoordenador

Header + 6 tabs (Dashboard ativo, Turmas badge 24 roxo, Professores badge 32 roxo, Desempenho, Relatórios, Config).

Educational context: Dashboard coordenador João Carlos - 6 seções principais (24 turmas, 32 professores).`,...(G=(J=l.parameters)==null?void 0:J.docs)==null?void 0:G.description}}};var j,W,Q,q,K;c.parameters={...c.parameters,docs:{...(j=c.parameters)==null?void 0:j.docs,source:{originalSource:`{
  render: () => \`
    \${styles}
    <style>
      .tab-router-link:focus {
        outline: 2px solid #6E63E8;
        outline-offset: -2px;
      }
    </style>
    
    <nav class="tab-router">
      <ul class="tab-router-list" role="tablist">
        \${routes.map((r, i) => \`
          <li class="tab-router-item" role="presentation">
            <a href="#" 
               class="tab-router-link \${i === 0 ? 'active' : ''}" 
               role="tab" 
               tabindex="\${i === 0 ? '0' : '-1'}" 
               aria-selected="\${i === 0}">
              <i class="bi \${r.icon}"></i>
              <span>\${r.label}</span>
            </a>
          </li>
        \`).join('')}
      </ul>
    </nav>
    
    <div style="margin-top: 20px; padding: 16px; background: #F8F8F8; border-radius: 8px; font-size: 13px; color: #6E6B7B">
      <strong>WCAG 2.1 AA - Navegação por Teclado:</strong>
      <ul style="margin: 8px 0 0; padding-left: 20px">
        <li><kbd>←</kbd> <kbd>→</kbd> - Navegar entre tabs (Arrow Left/Right)</li>
        <li><kbd>Home</kbd> - Ir para primeira tab</li>
        <li><kbd>End</kbd> - Ir para última tab</li>
        <li><kbd>Enter</kbd> / <kbd>Espaço</kbd> - Ativar tab</li>
        <li><strong>role="tablist"</strong> + <strong>role="tab"</strong></li>
        <li><strong>aria-selected</strong> indica tab ativa</li>
        <li>Outline focus 2px roxo visível em cada tab</li>
      </ul>
    </div>
  \`
}`,...(Q=(W=c.parameters)==null?void 0:W.docs)==null?void 0:Q.source},description:{story:`Story: KeyboardNavigation

4 tabs com focus visible (outline 2px roxo), ARIA attributes (role="tablist", role="tab", aria-selected, tabindex).
Suporte para setas ←→, Home/End.

Educational context: Acessibilidade WCAG 2.1 AA com navegação por teclado.`,...(K=(q=c.parameters)==null?void 0:q.docs)==null?void 0:K.description}}};var O,_,L,U,X;p.parameters={...p.parameters,docs:{...(O=p.parameters)==null?void 0:O.docs,source:{originalSource:`{
  render: () => \`
    \${styles}
    <style>
      .tab-router-compact .tab-router-link {
        padding: 10px 16px;
        font-size: 14px;
      }
      .tab-router-compact .tab-router-link i {
        font-size: 16px;
      }
    </style>
    
    <nav class="tab-router tab-router-compact" style="max-width: 400px">
      <ul class="tab-router-list">
        <li class="tab-router-item">
          <a href="#" class="tab-router-link active">
            <i class="bi bi-house"></i>
            <span>Início</span>
          </a>
        </li>
        <li class="tab-router-item">
          <a href="#" class="tab-router-link">
            <i class="bi bi-book"></i>
            <span>Biblioteca</span>
            <span class="tab-badge">3</span>
          </a>
        </li>
        <li class="tab-router-item">
          <a href="#" class="tab-router-link">
            <i class="bi bi-star"></i>
            <span>Favoritos</span>
          </a>
        </li>
      </ul>
    </nav>
    <p style="margin-top: 16px; font-size: 13px; color: #6E6B7B">
      <strong>Variante:</strong> Compact size (padding 10×16px) para sidebars ou espaços menores.
    </p>
  \`
}`,...(L=(_=p.parameters)==null?void 0:_.docs)==null?void 0:L.source},description:{story:`Story: CompactSize

Tabs com padding reduzido (10×16px) para uso em sidebars ou espaços menores.

Educational context: Sidebar compacta com navegação tabs.`,...(X=(U=p.parameters)==null?void 0:U.docs)==null?void 0:X.description}}};const Z=["Default","WithIcons","PillsVariant","PerfilDoAluno","RelatorioMissao","DashboardCoordenador","KeyboardNavigation","CompactSize"];export{p as CompactSize,l as DashboardCoordenador,r as Default,c as KeyboardNavigation,o as PerfilDoAluno,i as PillsVariant,n as RelatorioMissao,t as WithIcons,Z as __namedExportsOrder,Y as default};
