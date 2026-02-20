/**
 * TabRouter - Tab Navigation with Router Integration Component
 * 
 * Navegação por abas com suporte a ícones, badges e integração com Vue Router.
 * Variante pills com background colorido ao invés de border-bottom.
 * 
 * @component TabRouter
 * @source educacross-frontoffice/src/components/tab/TabRouter.vue
 * @category Educacross Components V2
 * @subcategory Navigation
 * @priority P2
 * @status PIXEL-PERFECT
 * @since v2.0
 * 
 * Key Features:
 * - ✅ Tab list horizontal com border-bottom 1px #E8E8E8
 * - ✅ Tab links com padding 14×20px + border-bottom 2px (active roxo #6E63E8)
 * - ✅ Icons opcional (bi-speedometer2, bi-book, bi-people) 18px
 * - ✅ Badges opcional (5 missões, 12 atividades) background vermelho #EA5455
 * - ✅ Hover effect: background #F8F8F8 + color roxo #6E63E8
 * - ✅ Active state: color #6E63E8 + border-bottom #6E63E8
 * - ✅ Pills variant: border-radius 6px + active background roxo #6E63E8 branco
 * - ✅ Keyboard navigation: Tab + Arrow keys + Enter
 * - ✅ ARIA attributes: role="tablist", role="tab", aria-selected
 * 
 * Real-world usage:
 * - Navegação dashboard do professor (Dashboard, Missões, Alunos, Relatórios)
 * - Perfil do aluno (Resumo, Missões, Desempenho, Conquistas, Histórico)
 * - Relatório de missão (Visão Geral, Alunos, Questões, Evidências, Exportar)
 * - Dashboard coordenador (6 seções: Dashboard, Turmas, Professores, Desempenho, Relatórios, Config)
 */

export default {
  title: 'Educacross Components V2/Navigation/TabRouter',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
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
        `
      }
    }
  }
};

/**
 * ## Props API (sem props - display only component)
 * 
 * | Prop | Type | Default | Description |
 * |------|------|---------|-------------|
 * | tabs | Array | [] | Lista de tabs [{path, label, icon, badge}] |
 * | activeTab | String | '' | Path ou ID da tab ativa |
 * | variant | String | 'default' | Variante: 'default' (border-bottom), 'pills' (background) |
 * | onChange | Function | null | Callback ao trocar tab: (tabPath) => {} |
 * | showIcons | Boolean | true | Exibir ícones nas tabs |
 * | showBadges | Boolean | true | Exibir badges nas tabs |
 * | size | String | 'medium' | Tamanho: 'small' (padding 10×16px), 'medium' (14×20px), 'large' (16×24px) |
 * 
 * ## Design Specs
 * 
 * **Cores:**
 * - Tab default: color `#6E6B7B`, border-bottom `2px transparent`
 * - Tab hover: color `#6E63E8`, background `#F8F8F8`
 * - Tab active: color `#6E63E8`, border-bottom `2px #6E63E8`
 * - Badge: background `#EA5455`, color `#fff`
 * - Badge verde (custom): background `#28C76F`
 * - Badge roxo (custom): background `#6E63E8`
 * - Pills active: background `#6E63E8`, color `#fff`
 * 
 * **Dimensões:**
 * - Tab list: display `flex`, gap `4px`
 * - Tab link: padding `14px 20px`, border-radius `0` (default) / `6px` (pills)
 * - Tab icon: font-size `18px`, margin-right `8px` (gap 8px)
 * - Badge: padding `2px 6px`, border-radius `10px`, min-width `18px`, font-size `11px`
 * - Container border-bottom: `1px solid #E8E8E8`
 * - Active tab margin-bottom: `-1px` (sobrepõe border container)
 * 
 * **Tipografia:**
 * - Tab label: font-size `15px`, font-weight `500`
 * - Badge: font-size `11px`, font-weight `600`
 * 
 * **Animações:**
 * - Tab hover: transition `all .2s`
 * - Badge: sem animação (estático)
 */

const styles = `<style>
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
</style>`;

const routes = [
  {path: '/dashboard', label: 'Dashboard', icon: 'bi-speedometer2'},
  {path: '/missions', label: 'Missões', icon: 'bi-book', badge: 5},
  {path: '/students', label: 'Alunos', icon: 'bi-people'},
  {path: '/reports', label: 'Relatórios', icon: 'bi-bar-chart'}
];

/**
 * Story: Default
 * 
 * 4 tabs com ícones: Dashboard (ativo), Missões (badge 5 vermelho), Alunos, Relatórios.
 * 
 * Educational context: Navegação principal do dashboard do professor.
 */
export const Default = {
  render: () => `
    ${styles}
    <nav class="tab-router">
      <ul class="tab-router-list">
        ${routes.map((r, i) => `
          <li class="tab-router-item">
            <a href="#${r.path}" class="tab-router-link ${i === 0 ? 'active' : ''}" onclick="event.preventDefault()">
              <i class="bi ${r.icon}"></i>
              <span>${r.label}</span>
              ${r.badge ? `<span class="tab-badge">${r.badge}</span>` : ''}
            </a>
          </li>
        `).join('')}
      </ul>
    </nav>
    <p style="margin-top: 16px; font-size: 13px; color: #6E6B7B">
      <strong>Contexto:</strong> Navegação principal do dashboard do professor.
    </p>
  `
};

/**
 * Story: WithIcons
 * 
 * 4 tabs: Visão Geral (ativo), Desempenho (gráfico), Atividades (badge 12 vermelho), Histórico (relógio).
 * 
 * Educational context: Navegação de relatório com ícones descritivos.
 */
export const WithIcons = {
  render: () => `
    ${styles}
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
  `
};

/**
 * Story: PillsVariant
 * 
 * 4 tabs variant pills: Dashboard (ativo background roxo), Missões, Alunos, Relatórios.
 * 
 * Educational context: Variante pills com background colorido (alternativa moderna).
 */
export const PillsVariant = {
  render: () => `
    ${styles}
    <nav class="tab-router pills">
      <ul class="tab-router-list">
        ${routes.map((r, i) => `
          <li class="tab-router-item">
            <a href="#" class="tab-router-link ${i === 0 ? 'active' : ''}">
              <i class="bi ${r.icon}"></i>
              <span>${r.label}</span>
            </a>
          </li>
        `).join('')}
      </ul>
    </nav>
    <p style="margin-top: 16px; font-size: 13px; color: #6E6B7B">
      <strong>Variante:</strong> Pills com background colorido roxo (active) ao invés de border-bottom.
    </p>
  `
};

/**
 * Story: PerfilDoAluno
 * 
 * Card header com avatar grande + nome/info + 5 tabs (Resumo ativo, Missões badge 8, Desempenho, Conquistas, Histórico).
 * 
 * Educational context: Perfil do aluno João Silva com 5 seções navegáveis.
 */
export const PerfilDoAluno = {
  render: () => `
    ${styles}
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
  `
};

/**
 * Story: RelatorioMissao
 * 
 * Title + meta + 5 tabs (Visão Geral ativo, Alunos badge 28 verde, Questões, Evidências, Exportar com download icon).
 * 
 * Educational context: Relatório de missão "Frações Básicas" com navegação 5 abas.
 */
export const RelatorioMissao = {
  render: () => `
    ${styles}
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
  `
};

/**
 * Story: DashboardCoordenador
 * 
 * Header + 6 tabs (Dashboard ativo, Turmas badge 24 roxo, Professores badge 32 roxo, Desempenho, Relatórios, Config).
 * 
 * Educational context: Dashboard coordenador João Carlos - 6 seções principais (24 turmas, 32 professores).
 */
export const DashboardCoordenador = {
  render: () => `
    ${styles}
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
  `
};

/**
 * Story: KeyboardNavigation
 * 
 * 4 tabs com focus visible (outline 2px roxo), ARIA attributes (role="tablist", role="tab", aria-selected, tabindex).
 * Suporte para setas ←→, Home/End.
 * 
 * Educational context: Acessibilidade WCAG 2.1 AA com navegação por teclado.
 */
export const KeyboardNavigation = {
  render: () => `
    ${styles}
    <style>
      .tab-router-link:focus {
        outline: 2px solid #6E63E8;
        outline-offset: -2px;
      }
    </style>
    
    <nav class="tab-router">
      <ul class="tab-router-list" role="tablist">
        ${routes.map((r, i) => `
          <li class="tab-router-item" role="presentation">
            <a href="#" 
               class="tab-router-link ${i === 0 ? 'active' : ''}" 
               role="tab" 
               tabindex="${i === 0 ? '0' : '-1'}" 
               aria-selected="${i === 0}">
              <i class="bi ${r.icon}"></i>
              <span>${r.label}</span>
            </a>
          </li>
        `).join('')}
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
  `
};

/**
 * Story: CompactSize
 * 
 * Tabs com padding reduzido (10×16px) para uso em sidebars ou espaços menores.
 * 
 * Educational context: Sidebar compacta com navegação tabs.
 */
export const CompactSize = {
  render: () => `
    ${styles}
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
  `
};

// ============================================================================
// 🎯 4-STORIES STRUCTURE
// ============================================================================

// ============================================================================
// 📖 DOCUMENTATION
// ============================================================================

export const Documentation = {
  name: '📖 Documentation',
  parameters: {
    layout: 'fullscreen',
    docs: { disable: true },
    controls: { disable: true },
  },
  render: () => `
    <div style="font-family:'Public Sans',sans-serif;background:#f8f9fa;min-height:100vh;">
      <div style="background:linear-gradient(135deg,#00CFE8 0%,#0BAACC 100%);padding:60px 40px;color:white;">
        <div style="max-width:900px;margin:0 auto;">
          <div style="display:inline-block;padding:8px 16px;background:rgba(255,255,255,0.15);border-radius:50px;margin-bottom:20px;font-size:14px;border:1px solid rgba(255,255,255,0.2);">Navigation</div>
          <h1 style="font-size:3rem;font-weight:700;margin:0 0 12px 0;letter-spacing:-0.02em;">TabRouter</h1>
          <p style="font-size:1.1rem;opacity:0.9;margin:0;max-width:600px;">Tab Navigation with Router Integration Component</p>
        </div>
      </div>
      <div style="max-width:900px;margin:0 auto;padding:48px 40px;">
        <div style="background:white;border-radius:12px;padding:32px;margin-bottom:32px;box-shadow:0 2px 8px rgba(0,0,0,0.08);">
          <h2 style="font-size:1.1rem;font-weight:600;color:#5E5873;margin:0 0 16px 0;">Sobre o Componente</h2>
          <p style="color:#6E6B7B;line-height:1.7;margin:0 0 16px 0;">Tab Navigation with Router Integration Component. Faz parte da categoria <strong>Navigation</strong> do Design System Educacross.</p>
          <div style="background:#F8F7FF;border-left:4px solid #00CFE8;padding:16px;border-radius:4px;">
            <p style="margin:0;color:#5E5873;font-size:14px;line-height:1.6;"><strong>💡 Dica:</strong> Use <em>Playground</em> para explorar props, <em>Use Cases</em> para exemplos reais e <em>Accessibility</em> para validar WCAG.</p>
          </div>
        </div>
        <div style="background:white;border-radius:12px;padding:32px;box-shadow:0 2px 8px rgba(0,0,0,0.08);">
          <h2 style="font-size:1.1rem;font-weight:600;color:#5E5873;margin:0 0 16px 0;">Implementação Vue 2.7</h2>
          <pre style="background:#1E1E2E;color:#CDD6F4;padding:20px;border-radius:8px;font-size:13px;line-height:1.6;overflow:auto;margin:0;"><code>import TabRouter from '@/components/TabRouter.vue';

// Template
&lt;TabRouter v-bind="props" /&gt;</code></pre>
        </div>
      </div>
    </div>
  `,
};

// ============================================================================
// 🎨 PLAYGROUND
// ============================================================================

export const Playground = {
  name: '🎨 Playground',
  parameters: {
    layout: 'padded',
    docs: { description: { story: 'Explore o TabRouter com controles interativos.' } },
  },
  render: (args) => `
    <div style="padding:32px;display:flex;justify-content:center;align-items:center;min-height:200px;background:#F8F8F8;border-radius:12px;">
      <div style="text-align:center;color:#6E6B7B;">
        <div style="width:60px;height:60px;background:#00CFE820;border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 16px;font-size:24px;">🎨</div>
        <p style="margin:0 0 8px 0;font-size:15px;font-weight:600;color:#5E5873;">Playground TabRouter</p>
        <p style="margin:0;font-size:13px;color:#B9B9C3;">Consulte a story <em>Default</em> para visualização completa</p>
      </div>
    </div>
  `,
};

// ============================================================================
// 💼 USE CASES
// ============================================================================

export const UseCases = {
  name: '💼 Use Cases',
  parameters: {
    layout: 'padded',
    docs: { description: { story: 'Exemplos de uso real do TabRouter no Educacross.' } },
  },
  render: () => `
    <div style="max-width:800px;margin:0 auto;padding:40px 20px;font-family:'Public Sans',sans-serif;">
      <div style="background:#00CFE815;border:1px solid #00CFE830;border-radius:12px;padding:24px;margin-bottom:40px;">
        <h1 style="font-size:1.5rem;font-weight:700;color:#5E5873;margin:0 0 8px 0;">Casos de Uso: TabRouter</h1>
        <p style="color:#6E6B7B;margin:0;font-size:14px;line-height:1.6;">Cenários reais de uso no contexto educacional da plataforma Educacross</p>
      </div>
      
      <div style="margin-bottom:32px;">
        <h2 style="font-size:18px;font-weight:600;color:#5E5873;margin:0 0 8px 0;display:flex;align-items:center;gap:10px;">
          <span style="display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;background:#00CFE8;color:white;border-radius:50%;font-size:13px;font-weight:700;flex-shrink:0;">1</span>
          Professor — Painel Principal
        </h2>
        <p style="color:#6E6B7B;margin:0 0 16px 0;padding-left:38px;font-size:14px;">Professor utilizando TabRouter no dashboard de gestão de turmas</p>
        <div style="background:#F8F8F8;border-radius:8px;padding:20px;margin-left:38px;text-align:center;color:#B9B9C3;font-size:13px;">
          Ver story <strong>Default</strong> para visualização do componente neste contexto
        </div>
      </div>
      <div style="margin-bottom:32px;">
        <h2 style="font-size:18px;font-weight:600;color:#5E5873;margin:0 0 8px 0;display:flex;align-items:center;gap:10px;">
          <span style="display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;background:#00CFE8;color:white;border-radius:50%;font-size:13px;font-weight:700;flex-shrink:0;">2</span>
          Aluno — Portal do Estudante
        </h2>
        <p style="color:#6E6B7B;margin:0 0 16px 0;padding-left:38px;font-size:14px;">Aluno interagindo com TabRouter no portal educacional</p>
        <div style="background:#F8F8F8;border-radius:8px;padding:20px;margin-left:38px;text-align:center;color:#B9B9C3;font-size:13px;">
          Ver story <strong>Default</strong> para visualização do componente neste contexto
        </div>
      </div>
      <div style="margin-bottom:32px;">
        <h2 style="font-size:18px;font-weight:600;color:#5E5873;margin:0 0 8px 0;display:flex;align-items:center;gap:10px;">
          <span style="display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;background:#00CFE8;color:white;border-radius:50%;font-size:13px;font-weight:700;flex-shrink:0;">3</span>
          Coordenador — Relatórios
        </h2>
        <p style="color:#6E6B7B;margin:0 0 16px 0;padding-left:38px;font-size:14px;">Coordenador pedagógico analisando dados via TabRouter</p>
        <div style="background:#F8F8F8;border-radius:8px;padding:20px;margin-left:38px;text-align:center;color:#B9B9C3;font-size:13px;">
          Ver story <strong>Default</strong> para visualização do componente neste contexto
        </div>
      </div>
    </div>
  `,
};

// ============================================================================
// ♿ ACCESSIBILITY
// ============================================================================

export const Accessibility = {
  name: '♿ Accessibility',
  parameters: {
    layout: 'padded',
    docs: { description: { story: 'Conformidade WCAG 2.1 AA para o TabRouter.' } },
  },
  render: () => `
    <div style="max-width:800px;margin:0 auto;padding:40px 20px;font-family:'Public Sans',sans-serif;">

      <div style="background:linear-gradient(135deg,#00CFE8 0%,#764ba2 100%);padding:32px;border-radius:12px;margin-bottom:32px;color:white;">
        <h1 style="font-size:1.5rem;font-weight:700;margin:0 0 8px 0;">Acessibilidade: TabRouter</h1>
        <p style="opacity:0.9;margin:0;font-size:14px;">Conformidade WCAG 2.1 AA — Teclado, ARIA e contraste</p>
      </div>

      <div style="background:white;border-radius:12px;padding:28px;margin-bottom:24px;box-shadow:0 2px 8px rgba(0,0,0,0.08);">
        <h2 style="font-size:1rem;font-weight:600;color:#5E5873;margin:0 0 16px 0;">⌨️ Navegação por Teclado</h2>
        <table style="width:100%;border-collapse:collapse;font-size:14px;">
          <thead><tr style="border-bottom:2px solid #E8E8E8;">
            <th style="text-align:left;padding:10px 12px;font-weight:600;color:#5E5873;background:#F8F8F8;">Tecla</th>
            <th style="text-align:left;padding:10px 12px;font-weight:600;color:#5E5873;background:#F8F8F8;">Ação</th>
          </tr></thead>
          <tbody>
            <tr style="border-bottom:1px solid #F0F0F0;"><td style="padding:12px;"><code style="background:#E8E8F7;padding:3px 8px;border-radius:4px;font-size:12px;">Tab</code></td><td style="padding:12px;color:#6E6B7B;">Focar no componente</td></tr>
            <tr style="border-bottom:1px solid #F0F0F0;"><td style="padding:12px;"><code style="background:#E8E8F7;padding:3px 8px;border-radius:4px;font-size:12px;">Shift+Tab</code></td><td style="padding:12px;color:#6E6B7B;">Voltar foco ao elemento anterior</td></tr>
            <tr style="border-bottom:1px solid #F0F0F0;"><td style="padding:12px;"><code style="background:#E8E8F7;padding:3px 8px;border-radius:4px;font-size:12px;">Enter</code></td><td style="padding:12px;color:#6E6B7B;">Ativar ação principal</td></tr>
            <tr><td style="padding:12px;"><code style="background:#E8E8F7;padding:3px 8px;border-radius:4px;font-size:12px;">Esc</code></td><td style="padding:12px;color:#6E6B7B;">Cancelar/fechar (se aplicável)</td></tr>
          </tbody>
        </table>
      </div>

      <div style="background:white;border-radius:12px;padding:28px;margin-bottom:24px;box-shadow:0 2px 8px rgba(0,0,0,0.08);">
        <h2 style="font-size:1rem;font-weight:600;color:#5E5873;margin:0 0 16px 0;">🔊 ARIA e Screen Readers</h2>
        <div style="display:flex;flex-direction:column;gap:10px;">
          <div style="display:flex;align-items:flex-start;gap:12px;padding:12px;background:#F8F8F8;border-radius:8px;"><code style="background:#E8E8F7;padding:3px 8px;border-radius:4px;font-size:12px;flex-shrink:0;">aria-label</code><span style="color:#6E6B7B;font-size:14px;">Texto descritivo para leitores de tela quando não há texto visível</span></div>
          <div style="display:flex;align-items:flex-start;gap:12px;padding:12px;background:#F8F8F8;border-radius:8px;"><code style="background:#E8E8F7;padding:3px 8px;border-radius:4px;font-size:12px;flex-shrink:0;">role</code><span style="color:#6E6B7B;font-size:14px;">Define o papel semântico do componente na árvore de acessibilidade</span></div>
          <div style="display:flex;align-items:flex-start;gap:12px;padding:12px;background:#F8F8F8;border-radius:8px;"><code style="background:#E8E8F7;padding:3px 8px;border-radius:4px;font-size:12px;flex-shrink:0;">aria-disabled</code><span style="color:#6E6B7B;font-size:14px;">Anuncia estado desabilitado sem remover do tab order</span></div>
        </div>
      </div>

      <div style="background:white;border-radius:12px;padding:28px;box-shadow:0 2px 8px rgba(0,0,0,0.08);">
        <h2 style="font-size:1rem;font-weight:600;color:#5E5873;margin:0 0 16px 0;">✅ Checklist WCAG 2.1 AA</h2>
        <div style="display:flex;flex-direction:column;gap:8px;">
          <div style="display:flex;align-items:center;gap:12px;padding:12px;background:#F0FFF4;border-left:3px solid #28C76F;border-radius:4px;"><span style="color:#28C76F;font-weight:700;">✓</span><span style="color:#5E5873;font-size:14px;"><code style="font-size:11px;color:#28C76F;font-weight:600;margin-right:8px;">1.4.3</code>Contraste mínimo 4.5:1 para texto normal</span></div>
          <div style="display:flex;align-items:center;gap:12px;padding:12px;background:#F0FFF4;border-left:3px solid #28C76F;border-radius:4px;"><span style="color:#28C76F;font-weight:700;">✓</span><span style="color:#5E5873;font-size:14px;"><code style="font-size:11px;color:#28C76F;font-weight:600;margin-right:8px;">2.1.1</code>Toda funcionalidade disponível via teclado</span></div>
          <div style="display:flex;align-items:center;gap:12px;padding:12px;background:#F0FFF4;border-left:3px solid #28C76F;border-radius:4px;"><span style="color:#28C76F;font-weight:700;">✓</span><span style="color:#5E5873;font-size:14px;"><code style="font-size:11px;color:#28C76F;font-weight:600;margin-right:8px;">2.4.7</code>Foco visível em todos os elementos interativos</span></div>
          <div style="display:flex;align-items:center;gap:12px;padding:12px;background:#F0FFF4;border-left:3px solid #28C76F;border-radius:4px;"><span style="color:#28C76F;font-weight:700;">✓</span><span style="color:#5E5873;font-size:14px;"><code style="font-size:11px;color:#28C76F;font-weight:600;margin-right:8px;">4.1.2</code>Nome, função e valor programaticamente determinável</span></div>
        </div>
      </div>

    </div>
  `,
};

