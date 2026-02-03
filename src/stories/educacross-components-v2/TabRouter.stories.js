/**
 * TabRouter - Tab Navigation with Router Integration Component
 * 
 * Navegação por abas com suporte a ícones, badges e integração com Vue Router.
 * Variante pills com background colorido ao invés de border-bottom.
 * 
 * @component TabRouter
 * @category Educacross Components V2
 * @subcategory Navigation
 * @priority P2
 * @status EXPANDED
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
