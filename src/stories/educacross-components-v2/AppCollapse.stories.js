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
