/**
 * TabCards Component - Pixel Perfect from educacross-frontoffice
 *
 * @component TabCards
 * @category Educacross Components V2
 * @status PIXEL-PERFECT
 * @source educacross-frontoffice/src/components/tab/TabCards.vue
 * @since 2.0.0
 */

export default {
  title: 'Front-office/Navigation/TabCards',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
## TabCards - Tabs em Formato de Cards Educacross (Pixel Perfect)

Componente extraído diretamente de \`educacross-frontoffice/src/components/tab/TabCards.vue\`.

Este componente usa tabs em formato de cards horizontais com scroll, ideal para navegação entre seções com dados.

### Props do Componente Real

| Prop | Tipo | Default | Descrição |
|------|------|---------|-----------|
| \`loading\` | Boolean | true | Estado de carregamento |
| \`items\` | Array | required | Lista de itens/tabs |
| \`currentItem\` | Number | - | ID do item selecionado |
| \`keyId\` | String | 'id' | Campo usado como identificador |
| \`md\` | Number | 3 | Largura das colunas (Bootstrap) |
| \`sm\` | Number | 6 | Largura das colunas (Bootstrap) |

### Events

- \`@click\` - Emitido quando um card é clicado (passa o item)

### Slots

- \`#item\` - Conteúdo customizado do card (\`{ item }\`)

### Características Visuais

- Cards com scroll horizontal
- Estado ativo com bordas arredondadas especiais
- Transição suave entre estados
- Skeleton loading
- Integração com \`<router-view>\` para navegação
        `,
      },
    },
  },
};

// CSS do TabCards extraído do frontoffice
const tabCardsStyles = `
<style>
  /* === TabCards - CSS Pixel Perfect do Frontoffice === */
  
  :root {
    --primary: #6e63e8;
    --border-color: #ebe9f1;
    --card-bg: #fff;
    --text-muted: #b9b9c3;
  }

  /* Container com scroll horizontal */
  .tab-cards-container {
    display: flex;
    flex-wrap: nowrap;
    overflow-x: auto;
    gap: 0;
    padding-bottom: 0;
  }

  .tab-cards-container::-webkit-scrollbar {
    height: 4px;
  }

  .tab-cards-container::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  .tab-cards-container::-webkit-scrollbar-thumb {
    background: #c1c1c1;
    border-radius: 4px;
  }

  /* Card individual */
  .tab-card-item {
    flex: 0 0 auto;
    min-width: 200px;
    max-width: 250px;
  }

  .tab-card {
    background-color: var(--card-bg);
    border: 1px solid var(--border-color);
    border-radius: 0.428rem;
    padding: 1rem;
    margin-bottom: 0.5rem;
    cursor: pointer;
    transition: none;
  }

  .tab-card:hover {
    border-color: var(--primary);
  }

  /* Estado ativo - bordas especiais */
  .tab-card-item.active .tab-card {
    margin-bottom: 0 !important;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
    border-bottom-color: var(--card-bg);
    position: relative;
    z-index: 1;
  }

  /* Pseudo elementos para conectar com conteúdo abaixo */
  .tab-card-item.active .tab-card::before {
    content: '';
    position: absolute;
    background: transparent;
    bottom: 0;
    left: -0.856rem;
    height: 0.428rem;
    width: 0.856rem;
    border-bottom-right-radius: 0.428rem;
    box-shadow: 0.428rem 0 0 0 var(--card-bg);
  }

  .tab-card-item.active .tab-card::after {
    content: '';
    position: absolute;
    background: transparent;
    bottom: 0;
    right: -0.856rem;
    height: 0.428rem;
    width: 0.856rem;
    border-bottom-left-radius: 0.428rem;
    box-shadow: -0.428rem 0 0 0 var(--card-bg);
  }

  /* Primeiro e último item ativo */
  .tab-card-item.active:first-child .tab-card::before {
    display: none;
  }

  .tab-card-item.active:last-child .tab-card::after {
    display: none;
  }

  /* Conteúdo do card */
  .tab-card-content {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  .tab-card-title {
    font-weight: 600;
    color: #5e5873;
    font-size: 0.9rem;
  }

  .tab-card-subtitle {
    color: var(--text-muted);
    font-size: 0.85rem;
  }

  .tab-card-value {
    font-weight: 700;
    font-size: 1.25rem;
    color: var(--primary);
    margin-top: 0.25rem;
  }

  /* Skeleton loading */
  .tab-card-skeleton {
    background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
    background-size: 200% 100%;
    animation: skeleton-loading 1.5s infinite;
    border-radius: 0.428rem;
    height: 75px;
  }

  @keyframes skeleton-loading {
    0% { background-position: 200% 0; }
    100% { background-position: -200% 0; }
  }

  /* Área de conteúdo conectada */
  .tab-content-area {
    background-color: var(--card-bg);
    border: 1px solid var(--border-color);
    border-radius: 0.428rem;
    padding: 1.5rem;
    margin-top: -1px;
  }

  .tab-content-area.connected-left {
    border-top-left-radius: 0;
  }

  .tab-content-area.connected-right {
    border-top-right-radius: 0;
  }
</style>
`;

/**
 * Default - Tabs normais
 */
export const Default = {
  render: () => `
    ${tabCardsStyles}
    <div class="p-4">
      <div class="row tab-cards-container mb-0">
        <div class="col-12 col-sm-6 col-md-3 tab-card-item">
          <div class="tab-card">
            <div class="tab-card-content">
              <span class="tab-card-title">Alunos Ativos</span>
              <span class="tab-card-subtitle">Este mês</span>
              <span class="tab-card-value">1.234</span>
            </div>
          </div>
        </div>
        <div class="col-12 col-sm-6 col-md-3 tab-card-item">
          <div class="tab-card">
            <div class="tab-card-content">
              <span class="tab-card-title">Atividades</span>
              <span class="tab-card-subtitle">Concluídas</span>
              <span class="tab-card-value">5.678</span>
            </div>
          </div>
        </div>
        <div class="col-12 col-sm-6 col-md-3 tab-card-item">
          <div class="tab-card">
            <div class="tab-card-content">
              <span class="tab-card-title">Média Geral</span>
              <span class="tab-card-subtitle">Desempenho</span>
              <span class="tab-card-value">78%</span>
            </div>
          </div>
        </div>
        <div class="col-12 col-sm-6 col-md-3 tab-card-item">
          <div class="tab-card">
            <div class="tab-card-content">
              <span class="tab-card-title">Turmas</span>
              <span class="tab-card-subtitle">Total</span>
              <span class="tab-card-value">42</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
};

/**
 * ActiveState - Com item ativo selecionado
 */
export const ActiveState = {
  render: () => `
    ${tabCardsStyles}
    <div class="p-4">
      <div class="row tab-cards-container mb-0" style="margin-bottom: 0 !important;">
        <div class="col-12 col-sm-6 col-md-3 tab-card-item">
          <div class="tab-card">
            <div class="tab-card-content">
              <span class="tab-card-title">5º Ano A</span>
              <span class="tab-card-subtitle">32 alunos</span>
              <span class="tab-card-value">85%</span>
            </div>
          </div>
        </div>
        <div class="col-12 col-sm-6 col-md-3 tab-card-item active">
          <div class="tab-card">
            <div class="tab-card-content">
              <span class="tab-card-title">5º Ano B</span>
              <span class="tab-card-subtitle">28 alunos</span>
              <span class="tab-card-value">72%</span>
            </div>
          </div>
        </div>
        <div class="col-12 col-sm-6 col-md-3 tab-card-item">
          <div class="tab-card">
            <div class="tab-card-content">
              <span class="tab-card-title">6º Ano A</span>
              <span class="tab-card-subtitle">30 alunos</span>
              <span class="tab-card-value">68%</span>
            </div>
          </div>
        </div>
        <div class="col-12 col-sm-6 col-md-3 tab-card-item">
          <div class="tab-card">
            <div class="tab-card-content">
              <span class="tab-card-title">6º Ano B</span>
              <span class="tab-card-subtitle">31 alunos</span>
              <span class="tab-card-value">79%</span>
            </div>
          </div>
        </div>
      </div>
      <div class="tab-content-area connected-left" style="border-top-left-radius: 0.428rem;">
        <h5>Detalhes: 5º Ano B</h5>
        <p class="text-muted mb-0">Conteúdo detalhado da turma selecionada...</p>
      </div>
    </div>
  `,
};

/**
 * Loading - Estado de carregamento
 */
export const Loading = {
  render: () => `
    ${tabCardsStyles}
    <div class="p-4">
      <div class="row tab-cards-container">
        <div class="col-12 col-sm-6 col-md-3 tab-card-item">
          <div class="tab-card p-0">
            <div class="tab-card-skeleton"></div>
          </div>
        </div>
        <div class="col-12 col-sm-6 col-md-3 tab-card-item">
          <div class="tab-card p-0">
            <div class="tab-card-skeleton"></div>
          </div>
        </div>
        <div class="col-12 col-sm-6 col-md-3 tab-card-item">
          <div class="tab-card p-0">
            <div class="tab-card-skeleton"></div>
          </div>
        </div>
        <div class="col-12 col-sm-6 col-md-3 tab-card-item">
          <div class="tab-card p-0">
            <div class="tab-card-skeleton"></div>
          </div>
        </div>
      </div>
    </div>
  `,
};

/**
 * WithIcons - Cards com ícones
 */
export const WithIcons = {
  render: () => `
    ${tabCardsStyles}
    <style>
      .tab-card-icon {
        display: flex;
        align-items: center;
        gap: 0.75rem;
      }
      .tab-card-icon .icon-wrapper {
        width: 48px;
        height: 48px;
        border-radius: 0.428rem;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .tab-card-icon .icon-wrapper.bg-light-primary {
        background-color: rgba(110, 99, 232, 0.12);
        color: #6e63e8;
      }
      .tab-card-icon .icon-wrapper.bg-light-success {
        background-color: rgba(40, 199, 111, 0.12);
        color: #28c76f;
      }
      .tab-card-icon .icon-wrapper.bg-light-warning {
        background-color: rgba(255, 159, 67, 0.12);
        color: #ff9f43;
      }
      .tab-card-icon .icon-wrapper.bg-light-danger {
        background-color: rgba(234, 84, 85, 0.12);
        color: #ea5455;
      }
    </style>
    <div class="p-4">
      <div class="row tab-cards-container">
        <div class="col-12 col-sm-6 col-md-3 tab-card-item active">
          <div class="tab-card">
            <div class="tab-card-icon">
              <div class="icon-wrapper bg-light-primary">
                <span class="material-symbols-outlined">school</span>
              </div>
              <div class="tab-card-content">
                <span class="tab-card-title">Alunos</span>
                <span class="tab-card-value" style="font-size: 1.1rem;">1.234</span>
              </div>
            </div>
          </div>
        </div>
        <div class="col-12 col-sm-6 col-md-3 tab-card-item">
          <div class="tab-card">
            <div class="tab-card-icon">
              <div class="icon-wrapper bg-light-success">
                <span class="material-symbols-outlined">task_alt</span>
              </div>
              <div class="tab-card-content">
                <span class="tab-card-title">Concluídas</span>
                <span class="tab-card-value" style="font-size: 1.1rem;">5.678</span>
              </div>
            </div>
          </div>
        </div>
        <div class="col-12 col-sm-6 col-md-3 tab-card-item">
          <div class="tab-card">
            <div class="tab-card-icon">
              <div class="icon-wrapper bg-light-warning">
                <span class="material-symbols-outlined">pending</span>
              </div>
              <div class="tab-card-content">
                <span class="tab-card-title">Pendentes</span>
                <span class="tab-card-value" style="font-size: 1.1rem;">892</span>
              </div>
            </div>
          </div>
        </div>
        <div class="col-12 col-sm-6 col-md-3 tab-card-item">
          <div class="tab-card">
            <div class="tab-card-icon">
              <div class="icon-wrapper bg-light-danger">
                <span class="material-symbols-outlined">warning</span>
              </div>
              <div class="tab-card-content">
                <span class="tab-card-title">Atrasadas</span>
                <span class="tab-card-value" style="font-size: 1.1rem;">45</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
};

/**
 * HorizontalScroll - Com scroll horizontal (muitos itens)
 */
export const HorizontalScroll = {
  render: () => `
    ${tabCardsStyles}
    <div class="p-4">
      <p class="text-muted mb-2">← Role horizontalmente para ver mais →</p>
      <div class="row flex-nowrap overflow-auto tab-cards-container" style="gap: 1rem;">
        ${['1º Ano A', '1º Ano B', '2º Ano A', '2º Ano B', '3º Ano A', '3º Ano B', '4º Ano A', '4º Ano B'].map((turma, idx) => `
          <div class="tab-card-item ${idx === 2 ? 'active' : ''}" style="min-width: 180px; flex: 0 0 auto;">
            <div class="tab-card">
              <div class="tab-card-content">
                <span class="tab-card-title">${turma}</span>
                <span class="tab-card-subtitle">${25 + Math.floor(Math.random() * 10)} alunos</span>
                <span class="tab-card-value">${60 + Math.floor(Math.random() * 35)}%</span>
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `,
};

/**
 * Compact - Versão compacta
 */
export const Compact = {
  render: () => `
    ${tabCardsStyles}
    <style>
      .tab-card-compact {
        padding: 0.75rem;
      }
      .tab-card-compact .tab-card-title {
        font-size: 0.85rem;
      }
      .tab-card-compact .tab-card-value {
        font-size: 1rem;
        margin-top: 0;
      }
    </style>
    <div class="p-4">
      <div class="row tab-cards-container">
        <div class="col-6 col-md-2 tab-card-item active">
          <div class="tab-card tab-card-compact">
            <div class="tab-card-content">
              <span class="tab-card-title">Janeiro</span>
              <span class="tab-card-value">85%</span>
            </div>
          </div>
        </div>
        <div class="col-6 col-md-2 tab-card-item">
          <div class="tab-card tab-card-compact">
            <div class="tab-card-content">
              <span class="tab-card-title">Fevereiro</span>
              <span class="tab-card-value">72%</span>
            </div>
          </div>
        </div>
        <div class="col-6 col-md-2 tab-card-item">
          <div class="tab-card tab-card-compact">
            <div class="tab-card-content">
              <span class="tab-card-title">Março</span>
              <span class="tab-card-value">68%</span>
            </div>
          </div>
        </div>
        <div class="col-6 col-md-2 tab-card-item">
          <div class="tab-card tab-card-compact">
            <div class="tab-card-content">
              <span class="tab-card-title">Abril</span>
              <span class="tab-card-value">79%</span>
            </div>
          </div>
        </div>
        <div class="col-6 col-md-2 tab-card-item">
          <div class="tab-card tab-card-compact">
            <div class="tab-card-content">
              <span class="tab-card-title">Maio</span>
              <span class="tab-card-value">91%</span>
            </div>
          </div>
        </div>
        <div class="col-6 col-md-2 tab-card-item">
          <div class="tab-card tab-card-compact">
            <div class="tab-card-content">
              <span class="tab-card-title">Junho</span>
              <span class="tab-card-value">88%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
};
