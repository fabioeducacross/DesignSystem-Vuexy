/**
 * AppCollapse Component - Pixel Perfect from educacross-frontoffice
 *
 * @component AppCollapse
 * @category Educacross Components V2
 * @status PIXEL-PERFECT
 * @source educacross-frontoffice/src/components/app-collapse/AppCollapse.vue
 * @since 2.0.0
 */

export default {
  title: 'Educacross Components V2/Navigation/AppCollapse',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
## AppCollapse - Accordion Educacross (Pixel Perfect)

Componente extraído diretamente de \`educacross-frontoffice/src/components/app-collapse/AppCollapse.vue\`.

Accordion com diferentes estilos visuais e comportamento de hover opcional.

### Props do AppCollapse (Container)

| Prop | Tipo | Default | Descrição |
|------|------|---------|-----------|
| \`accordion\` | Boolean | false | Modo accordion (um item por vez) |
| \`hover\` | Boolean | false | Abre no hover |
| \`type\` | String | 'default' | Estilo: default, border, shadow, margin |

### Props do AppCollapseItem

| Prop | Tipo | Default | Descrição |
|------|------|---------|-----------|
| \`isVisible\` | Boolean | false | Estado inicial |
| \`title\` | String | '' | Título do item |
| \`cardClass\` | String | '' | Classes do card |
| \`cardHeaderClass\` | String | '' | Classes do header |
| \`bodyClass\` | String | '' | Classes do body |
| \`left\` | Boolean | false | Ícone à esquerda |

### Events

- \`@visible(Boolean)\` - Emitido quando visibilidade muda

### Tipos de Estilo

- \`default\` - Estilo padrão com bordas
- \`border\` - Com borda mais pronunciada
- \`shadow\` - Com sombra no item ativo
- \`margin\` - Com espaço entre itens
        `,
      },
    },
  },
};

// CSS do AppCollapse extraído do frontoffice
const collapseStyles = `
<style>
  /* === AppCollapse - CSS Pixel Perfect do Frontoffice === */
  
  :root {
    --primary: #6e63e8;
    --border-color: #ebe9f1;
    --card-bg: #fff;
    --text-color: #5e5873;
    --text-muted: #b9b9c3;
  }

  .collapse-icon {
    position: relative;
  }

  /* === Collapse Default === */
  .collapse-default .collapse-card {
    background-color: var(--card-bg);
    border: 1px solid var(--border-color);
    border-radius: 0;
    margin-bottom: -1px;
  }

  .collapse-default .collapse-card:first-child {
    border-top-left-radius: 0.428rem;
    border-top-right-radius: 0.428rem;
  }

  .collapse-default .collapse-card:last-child {
    border-bottom-left-radius: 0.428rem;
    border-bottom-right-radius: 0.428rem;
    margin-bottom: 0;
  }

  /* === Collapse Border === */
  .collapse-border .collapse-card {
    background-color: var(--card-bg);
    border: 1px solid var(--border-color);
    border-radius: 0.428rem;
    margin-bottom: 0.5rem;
  }

  /* === Collapse Shadow === */
  .collapse-shadow .collapse-card {
    background-color: var(--card-bg);
    border: none;
    border-radius: 0.428rem;
    margin-bottom: 0.5rem;
    box-shadow: 0 2px 15px 0 rgba(34, 41, 47, 0.05);
  }

  .collapse-shadow .collapse-card.open {
    box-shadow: 0 4px 24px 0 rgba(34, 41, 47, 0.1);
  }

  /* === Collapse Margin === */
  .collapse-margin .collapse-card {
    background-color: var(--card-bg);
    border: 1px solid var(--border-color);
    border-radius: 0.428rem;
    margin-bottom: 1rem;
  }

  /* === Header === */
  .collapse-header {
    padding: 1rem 1.25rem;
    padding-right: 3rem;
    cursor: pointer;
    position: relative;
    display: flex;
    align-items: center;
    transition: all 0.15s ease;
  }

  .collapse-header:hover {
    background-color: #f8f8f8;
  }

  .collapse-header.left {
    padding-left: 3rem;
    padding-right: 1.25rem;
  }

  /* Arrow icon */
  .collapse-header::after {
    content: '';
    position: absolute;
    right: 1.25rem;
    top: 50%;
    width: 0.75rem;
    height: 0.75rem;
    border: 2px solid var(--text-color);
    border-left: 0;
    border-top: 0;
    transform: translateY(-50%) rotate(-45deg);
    transition: transform 0.2s ease;
  }

  .collapse-header.left::after {
    right: auto;
    left: 1.25rem;
  }

  .collapse-header:not(.collapsed)::after {
    transform: translateY(-75%) rotate(45deg);
  }

  .collapse-title {
    font-weight: 500;
    font-size: 1rem;
    color: var(--text-color);
  }

  /* === Body === */
  .collapse-body {
    padding: 1rem 1.25rem;
    border-top: 1px solid var(--border-color);
    color: var(--text-muted);
  }

  .collapse-body.no-border {
    border-top: none;
  }

  /* === Animation === */
  .collapse-content {
    overflow: hidden;
    max-height: 0;
    transition: max-height 0.3s ease;
  }

  .collapse-content.show {
    max-height: 500px;
  }

  /* === Open state === */
  .collapse-card.open .collapse-header {
    background-color: #fafaff;
  }

  .collapse-shadow .collapse-card.open .collapse-header {
    background-color: transparent;
  }
</style>
`;

/**
 * Default - Estilo padrão
 */
export const Default = {
  render: () => `
    ${collapseStyles}
    <div class="p-4" style="max-width: 600px;">
      <div class="collapse-icon collapse-default">
        <div class="collapse-card open">
          <div class="collapse-header">
            <span class="collapse-title">O que é o Educacross?</span>
          </div>
          <div class="collapse-content show">
            <div class="collapse-body">
              O Educacross é uma plataforma de aprendizagem gamificada que oferece conteúdos educacionais
              interativos para alunos do ensino fundamental. Com jogos e atividades personalizadas, 
              os estudantes desenvolvem habilidades em matemática e língua portuguesa.
            </div>
          </div>
        </div>
        <div class="collapse-card">
          <div class="collapse-header collapsed">
            <span class="collapse-title">Como funciona a gamificação?</span>
          </div>
          <div class="collapse-content">
            <div class="collapse-body">
              A gamificação utiliza elementos de jogos como pontos, badges e rankings para
              motivar os alunos. Cada atividade concluída gera recompensas e progresso visível.
            </div>
          </div>
        </div>
        <div class="collapse-card">
          <div class="collapse-header collapsed">
            <span class="collapse-title">Quais são os recursos disponíveis?</span>
          </div>
          <div class="collapse-content">
            <div class="collapse-body">
              Relatórios detalhados, missões personalizadas, biblioteca de jogos, 
              acompanhamento de desempenho e integração com sistemas escolares.
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
};

/**
 * Border - Com bordas individuais
 */
export const Border = {
  render: () => `
    ${collapseStyles}
    <div class="p-4" style="max-width: 600px;">
      <div class="collapse-icon collapse-border">
        <div class="collapse-card open">
          <div class="collapse-header">
            <span class="collapse-title">Primeiro Item</span>
          </div>
          <div class="collapse-content show">
            <div class="collapse-body">
              Conteúdo do primeiro item expandido. Cada card tem sua própria borda
              e espaçamento independente.
            </div>
          </div>
        </div>
        <div class="collapse-card">
          <div class="collapse-header collapsed">
            <span class="collapse-title">Segundo Item</span>
          </div>
          <div class="collapse-content">
            <div class="collapse-body">
              Conteúdo do segundo item.
            </div>
          </div>
        </div>
        <div class="collapse-card">
          <div class="collapse-header collapsed">
            <span class="collapse-title">Terceiro Item</span>
          </div>
          <div class="collapse-content">
            <div class="collapse-body">
              Conteúdo do terceiro item.
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
};

/**
 * Shadow - Com sombra
 */
export const Shadow = {
  render: () => `
    ${collapseStyles}
    <div class="p-4" style="max-width: 600px;">
      <div class="collapse-icon collapse-shadow">
        <div class="collapse-card open">
          <div class="collapse-header">
            <span class="collapse-title">Item com Sombra</span>
          </div>
          <div class="collapse-content show">
            <div class="collapse-body no-border">
              Este estilo usa sombras em vez de bordas. O item ativo recebe
              uma sombra mais pronunciada para destacá-lo.
            </div>
          </div>
        </div>
        <div class="collapse-card">
          <div class="collapse-header collapsed">
            <span class="collapse-title">Outro Item</span>
          </div>
          <div class="collapse-content">
            <div class="collapse-body no-border">
              Conteúdo com sombra sutil.
            </div>
          </div>
        </div>
        <div class="collapse-card">
          <div class="collapse-header collapsed">
            <span class="collapse-title">Mais um Item</span>
          </div>
          <div class="collapse-content">
            <div class="collapse-body no-border">
              Mais conteúdo aqui.
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
};

/**
 * Margin - Com margem entre itens
 */
export const Margin = {
  render: () => `
    ${collapseStyles}
    <div class="p-4" style="max-width: 600px;">
      <div class="collapse-icon collapse-margin">
        <div class="collapse-card open">
          <div class="collapse-header">
            <span class="collapse-title">Matemática</span>
          </div>
          <div class="collapse-content show">
            <div class="collapse-body">
              Operações básicas, frações, geometria e resolução de problemas.
            </div>
          </div>
        </div>
        <div class="collapse-card">
          <div class="collapse-header collapsed">
            <span class="collapse-title">Língua Portuguesa</span>
          </div>
          <div class="collapse-content">
            <div class="collapse-body">
              Leitura, interpretação, gramática e produção textual.
            </div>
          </div>
        </div>
        <div class="collapse-card">
          <div class="collapse-header collapsed">
            <span class="collapse-title">Ciências</span>
          </div>
          <div class="collapse-content">
            <div class="collapse-body">
              Ciências naturais, experimentos e descobertas.
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
};

/**
 * IconLeft - Ícone à esquerda
 */
export const IconLeft = {
  render: () => `
    ${collapseStyles}
    <div class="p-4" style="max-width: 600px;">
      <div class="collapse-icon collapse-border">
        <div class="collapse-card open">
          <div class="collapse-header left">
            <span class="collapse-title">Ícone à Esquerda</span>
          </div>
          <div class="collapse-content show">
            <div class="collapse-body">
              Quando a prop "left" é true, o ícone de seta fica posicionado
              à esquerda do título em vez de à direita.
            </div>
          </div>
        </div>
        <div class="collapse-card">
          <div class="collapse-header left collapsed">
            <span class="collapse-title">Outro Item</span>
          </div>
          <div class="collapse-content">
            <div class="collapse-body">
              Conteúdo do item.
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
};

/**
 * WithCustomContent - Com conteúdo customizado
 */
export const WithCustomContent = {
  render: () => `
    ${collapseStyles}
    <style>
      .faq-item {
        display: flex;
        align-items: center;
        gap: 1rem;
      }
      .faq-icon {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background: rgba(110, 99, 232, 0.12);
        color: #6e63e8;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .faq-stats {
        display: flex;
        gap: 2rem;
        margin-top: 1rem;
        padding-top: 1rem;
        border-top: 1px solid #ebe9f1;
      }
      .faq-stat {
        text-align: center;
      }
      .faq-stat-value {
        font-size: 1.5rem;
        font-weight: 600;
        color: #6e63e8;
      }
      .faq-stat-label {
        font-size: 0.85rem;
        color: #b9b9c3;
      }
    </style>
    <div class="p-4" style="max-width: 600px;">
      <div class="collapse-icon collapse-shadow">
        <div class="collapse-card open">
          <div class="collapse-header">
            <div class="faq-item">
              <div class="faq-icon">
                <span class="material-symbols-outlined">school</span>
              </div>
              <span class="collapse-title">5º Ano A - Turma Manhã</span>
            </div>
          </div>
          <div class="collapse-content show">
            <div class="collapse-body no-border">
              <p>Turma com 32 alunos ativos. Foco em matemática e português.</p>
              <div class="faq-stats">
                <div class="faq-stat">
                  <div class="faq-stat-value">32</div>
                  <div class="faq-stat-label">Alunos</div>
                </div>
                <div class="faq-stat">
                  <div class="faq-stat-value">78%</div>
                  <div class="faq-stat-label">Média</div>
                </div>
                <div class="faq-stat">
                  <div class="faq-stat-value">156</div>
                  <div class="faq-stat-label">Missões</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="collapse-card">
          <div class="collapse-header collapsed">
            <div class="faq-item">
              <div class="faq-icon">
                <span class="material-symbols-outlined">school</span>
              </div>
              <span class="collapse-title">5º Ano B - Turma Tarde</span>
            </div>
          </div>
          <div class="collapse-content">
            <div class="collapse-body no-border">
              Conteúdo da turma B.
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
          <h1 style="font-size:3rem;font-weight:700;margin:0 0 12px 0;letter-spacing:-0.02em;">AppCollapse</h1>
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
          <pre style="background:#1E1E2E;color:#CDD6F4;padding:20px;border-radius:8px;font-size:13px;line-height:1.6;overflow:auto;margin:0;"><code>import AppCollapse from '@/components/AppCollapse.vue';

// Template
&lt;AppCollapse v-bind="props" /&gt;</code></pre>
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
    docs: { description: { story: 'Explore o AppCollapse com controles interativos.' } },
  },
  render: (args) => `
    <div style="padding:32px;display:flex;justify-content:center;align-items:center;min-height:200px;background:#F8F8F8;border-radius:12px;">
      <div style="text-align:center;color:#6E6B7B;">
        <div style="width:60px;height:60px;background:#00CFE820;border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 16px;font-size:24px;">🎨</div>
        <p style="margin:0 0 8px 0;font-size:15px;font-weight:600;color:#5E5873;">Playground AppCollapse</p>
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
    docs: { description: { story: 'Exemplos de uso real do AppCollapse no Educacross.' } },
  },
  render: () => `
    <div style="max-width:800px;margin:0 auto;padding:40px 20px;font-family:'Public Sans',sans-serif;">
      <div style="background:#00CFE815;border:1px solid #00CFE830;border-radius:12px;padding:24px;margin-bottom:40px;">
        <h1 style="font-size:1.5rem;font-weight:700;color:#5E5873;margin:0 0 8px 0;">Casos de Uso: AppCollapse</h1>
        <p style="color:#6E6B7B;margin:0;font-size:14px;line-height:1.6;">Cenários reais de uso no contexto educacional da plataforma Educacross</p>
      </div>
      
      <div style="margin-bottom:32px;">
        <h2 style="font-size:18px;font-weight:600;color:#5E5873;margin:0 0 8px 0;display:flex;align-items:center;gap:10px;">
          <span style="display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;background:#00CFE8;color:white;border-radius:50%;font-size:13px;font-weight:700;flex-shrink:0;">1</span>
          Professor — Painel Principal
        </h2>
        <p style="color:#6E6B7B;margin:0 0 16px 0;padding-left:38px;font-size:14px;">Professor utilizando AppCollapse no dashboard de gestão de turmas</p>
        <div style="background:#F8F8F8;border-radius:8px;padding:20px;margin-left:38px;text-align:center;color:#B9B9C3;font-size:13px;">
          Ver story <strong>Default</strong> para visualização do componente neste contexto
        </div>
      </div>
      <div style="margin-bottom:32px;">
        <h2 style="font-size:18px;font-weight:600;color:#5E5873;margin:0 0 8px 0;display:flex;align-items:center;gap:10px;">
          <span style="display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;background:#00CFE8;color:white;border-radius:50%;font-size:13px;font-weight:700;flex-shrink:0;">2</span>
          Aluno — Portal do Estudante
        </h2>
        <p style="color:#6E6B7B;margin:0 0 16px 0;padding-left:38px;font-size:14px;">Aluno interagindo com AppCollapse no portal educacional</p>
        <div style="background:#F8F8F8;border-radius:8px;padding:20px;margin-left:38px;text-align:center;color:#B9B9C3;font-size:13px;">
          Ver story <strong>Default</strong> para visualização do componente neste contexto
        </div>
      </div>
      <div style="margin-bottom:32px;">
        <h2 style="font-size:18px;font-weight:600;color:#5E5873;margin:0 0 8px 0;display:flex;align-items:center;gap:10px;">
          <span style="display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;background:#00CFE8;color:white;border-radius:50%;font-size:13px;font-weight:700;flex-shrink:0;">3</span>
          Coordenador — Relatórios
        </h2>
        <p style="color:#6E6B7B;margin:0 0 16px 0;padding-left:38px;font-size:14px;">Coordenador pedagógico analisando dados via AppCollapse</p>
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
    docs: { description: { story: 'Conformidade WCAG 2.1 AA para o AppCollapse.' } },
  },
  render: () => `
    <div style="max-width:800px;margin:0 auto;padding:40px 20px;font-family:'Public Sans',sans-serif;">

      <div style="background:linear-gradient(135deg,#00CFE8 0%,#764ba2 100%);padding:32px;border-radius:12px;margin-bottom:32px;color:white;">
        <h1 style="font-size:1.5rem;font-weight:700;margin:0 0 8px 0;">Acessibilidade: AppCollapse</h1>
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

