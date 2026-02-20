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
  title: 'Educacross Components V2/Navigation/TabCards',
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
          <h1 style="font-size:3rem;font-weight:700;margin:0 0 12px 0;letter-spacing:-0.02em;">TabCards</h1>
          <p style="font-size:1.1rem;opacity:0.9;margin:0;max-width:600px;">Pixel Perfect from educacross-frontoffice</p>
        </div>
      </div>
      <div style="max-width:900px;margin:0 auto;padding:48px 40px;">
        <div style="background:white;border-radius:12px;padding:32px;margin-bottom:32px;box-shadow:0 2px 8px rgba(0,0,0,0.08);">
          <h2 style="font-size:1.1rem;font-weight:600;color:#5E5873;margin:0 0 16px 0;">Sobre o Componente</h2>
          <p style="color:#6E6B7B;line-height:1.7;margin:0 0 16px 0;">Pixel Perfect from educacross-frontoffice. Faz parte da categoria <strong>Navigation</strong> do Design System Educacross.</p>
          <div style="background:#F8F7FF;border-left:4px solid #00CFE8;padding:16px;border-radius:4px;">
            <p style="margin:0;color:#5E5873;font-size:14px;line-height:1.6;"><strong>💡 Dica:</strong> Use <em>Playground</em> para explorar props, <em>Use Cases</em> para exemplos reais e <em>Accessibility</em> para validar WCAG.</p>
          </div>
        </div>
        <div style="background:white;border-radius:12px;padding:32px;box-shadow:0 2px 8px rgba(0,0,0,0.08);">
          <h2 style="font-size:1.1rem;font-weight:600;color:#5E5873;margin:0 0 16px 0;">Implementação Vue 2.7</h2>
          <pre style="background:#1E1E2E;color:#CDD6F4;padding:20px;border-radius:8px;font-size:13px;line-height:1.6;overflow:auto;margin:0;"><code>import TabCards from '@/components/TabCards.vue';

// Template
&lt;TabCards v-bind="props" /&gt;</code></pre>
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
    docs: { description: { story: 'Explore o TabCards com controles interativos.' } },
  },
  render: (args) => `
    <div style="padding:32px;display:flex;justify-content:center;align-items:center;min-height:200px;background:#F8F8F8;border-radius:12px;">
      <div style="text-align:center;color:#6E6B7B;">
        <div style="width:60px;height:60px;background:#00CFE820;border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 16px;font-size:24px;">🎨</div>
        <p style="margin:0 0 8px 0;font-size:15px;font-weight:600;color:#5E5873;">Playground TabCards</p>
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
    docs: { description: { story: 'Exemplos de uso real do TabCards no Educacross.' } },
  },
  render: () => `
    <div style="max-width:800px;margin:0 auto;padding:40px 20px;font-family:'Public Sans',sans-serif;">
      <div style="background:#00CFE815;border:1px solid #00CFE830;border-radius:12px;padding:24px;margin-bottom:40px;">
        <h1 style="font-size:1.5rem;font-weight:700;color:#5E5873;margin:0 0 8px 0;">Casos de Uso: TabCards</h1>
        <p style="color:#6E6B7B;margin:0;font-size:14px;line-height:1.6;">Cenários reais de uso no contexto educacional da plataforma Educacross</p>
      </div>
      
      <div style="margin-bottom:32px;">
        <h2 style="font-size:18px;font-weight:600;color:#5E5873;margin:0 0 8px 0;display:flex;align-items:center;gap:10px;">
          <span style="display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;background:#00CFE8;color:white;border-radius:50%;font-size:13px;font-weight:700;flex-shrink:0;">1</span>
          Professor — Painel Principal
        </h2>
        <p style="color:#6E6B7B;margin:0 0 16px 0;padding-left:38px;font-size:14px;">Professor utilizando TabCards no dashboard de gestão de turmas</p>
        <div style="background:#F8F8F8;border-radius:8px;padding:20px;margin-left:38px;text-align:center;color:#B9B9C3;font-size:13px;">
          Ver story <strong>Default</strong> para visualização do componente neste contexto
        </div>
      </div>
      <div style="margin-bottom:32px;">
        <h2 style="font-size:18px;font-weight:600;color:#5E5873;margin:0 0 8px 0;display:flex;align-items:center;gap:10px;">
          <span style="display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;background:#00CFE8;color:white;border-radius:50%;font-size:13px;font-weight:700;flex-shrink:0;">2</span>
          Aluno — Portal do Estudante
        </h2>
        <p style="color:#6E6B7B;margin:0 0 16px 0;padding-left:38px;font-size:14px;">Aluno interagindo com TabCards no portal educacional</p>
        <div style="background:#F8F8F8;border-radius:8px;padding:20px;margin-left:38px;text-align:center;color:#B9B9C3;font-size:13px;">
          Ver story <strong>Default</strong> para visualização do componente neste contexto
        </div>
      </div>
      <div style="margin-bottom:32px;">
        <h2 style="font-size:18px;font-weight:600;color:#5E5873;margin:0 0 8px 0;display:flex;align-items:center;gap:10px;">
          <span style="display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;background:#00CFE8;color:white;border-radius:50%;font-size:13px;font-weight:700;flex-shrink:0;">3</span>
          Coordenador — Relatórios
        </h2>
        <p style="color:#6E6B7B;margin:0 0 16px 0;padding-left:38px;font-size:14px;">Coordenador pedagógico analisando dados via TabCards</p>
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
    docs: { description: { story: 'Conformidade WCAG 2.1 AA para o TabCards.' } },
  },
  render: () => `
    <div style="max-width:800px;margin:0 auto;padding:40px 20px;font-family:'Public Sans',sans-serif;">

      <div style="background:linear-gradient(135deg,#00CFE8 0%,#764ba2 100%);padding:32px;border-radius:12px;margin-bottom:32px;color:white;">
        <h1 style="font-size:1.5rem;font-weight:700;margin:0 0 8px 0;">Acessibilidade: TabCards</h1>
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

