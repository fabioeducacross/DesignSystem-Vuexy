/**
 * MediaCard Component - Pixel Perfect from educacross-frontoffice
 *
 * @component MediaCard
 * @category Educacross Components V2
 * @status PIXEL-PERFECT
 * @source educacross-frontoffice/src/components/card/MediaCard.vue
 * @since 2.0.0
 */

export default {
  title: 'Educacross Components V2/Cards/MediaCard',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
## MediaCard - Card de Mídia Educacross (Pixel Perfect)

Componente extraído diretamente de \`educacross-frontoffice/src/components/card/MediaCard.vue\`.

Card com ícone lateral, título, descrição e suporte a skeleton loading.

### Props do Componente Real

| Prop | Tipo | Default | Descrição |
|------|------|---------|-----------|
| \`bgVariant\` | String | '' | Background Bootstrap (light, primary, etc.) |
| \`titleColor\` | String | '' | Cor do título |
| \`classVariant\` | String | '' | Classes CSS adicionais |
| \`verticalAlign\` | String | 'center' | Alinhamento vertical |
| \`tooltipText\` | String | - | Texto do tooltip de info |
| \`title\` | String | - | Título do card |
| \`icon\` | String | '' | Ícone Material Symbols |
| \`variant\` | String | '' | Variante de cor do ícone |
| \`rightAlign\` | Boolean | false | Alinha mídia à direita |
| \`loading\` | Boolean | false | Estado de carregamento |
| \`eventClick\` | Function | - | Callback de clique |
| \`borderVariant\` | String | '' | Cor da borda |

### Slots

- \`#aside\` - Conteúdo adicional ao lado do ícone
- \`#description\` - Conteúdo principal do card
        `,
      },
    },
  },
};

// CSS do MediaCard extraído do frontoffice
const mediaCardStyles = `
<style>
  /* === MediaCard - CSS Pixel Perfect do Frontoffice === */
  
  :root {
    --primary: #6e63e8;
    --success: #28c76f;
    --danger: #ea5455;
    --warning: #ff9f43;
    --info: #00cfe8;
  }

  .media-card {
    background: white;
    border: 1px solid #ebe9f1;
    border-radius: 0.428rem;
    padding: 1.5rem;
    transition: all 0.3s ease;
  }

  .media-card.clickable {
    cursor: pointer;
  }

  .media-card.clickable:hover {
    box-shadow: 0 4px 24px 0 rgba(34, 41, 47, 0.1);
  }

  .media-card-body {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .media-card-body.vertical-top {
    align-items: flex-start;
  }

  .media-card-body.right-align {
    flex-direction: row-reverse;
  }

  /* Icon wrapper */
  .media-card-icon {
    width: 48px;
    height: 48px;
    border-radius: 0.428rem;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  .media-card-icon.bg-light-primary {
    background-color: rgba(110, 99, 232, 0.12);
    color: var(--primary);
  }

  .media-card-icon.bg-light-success {
    background-color: rgba(40, 199, 111, 0.12);
    color: var(--success);
  }

  .media-card-icon.bg-light-danger {
    background-color: rgba(234, 84, 85, 0.12);
    color: var(--danger);
  }

  .media-card-icon.bg-light-warning {
    background-color: rgba(255, 159, 67, 0.12);
    color: var(--warning);
  }

  .media-card-icon.bg-light-info {
    background-color: rgba(0, 207, 232, 0.12);
    color: var(--info);
  }

  .media-card-icon .material-symbols-outlined {
    font-size: 24px;
  }

  /* Content */
  .media-card-content {
    flex: 1;
  }

  .media-card-title {
    font-size: 1rem;
    font-weight: 400;
    color: #5e5873;
    margin-bottom: 0.25rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .media-card-title .icon-visibility {
    font-size: 16px;
    color: var(--primary);
    cursor: pointer;
  }

  .media-card-title .icon-info {
    font-size: 16px;
    color: #b9b9c3;
    cursor: help;
  }

  .media-card-description {
    font-size: 1.5rem;
    font-weight: 600;
    color: #5e5873;
    margin: 0;
  }

  /* Border variants */
  .media-card.border-primary {
    border-color: var(--primary);
  }

  .media-card.border-success {
    border-color: var(--success);
  }

  .media-card.border-danger {
    border-color: var(--danger);
  }

  /* Skeleton loading */
  .media-card-skeleton {
    height: 75px;
    background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
    background-size: 200% 100%;
    animation: skeleton-loading 1.5s infinite;
    border-radius: 0.428rem;
  }

  @keyframes skeleton-loading {
    0% { background-position: 200% 0; }
    100% { background-position: -200% 0; }
  }

  /* Responsive - hide icon on mobile */
  @media (max-width: 991px) {
    .media-card-icon.hide-mobile {
      display: none;
    }
  }
</style>
`;

/**
 * Default - Card básico com ícone
 */
export const Default = {
  render: () => `
    ${mediaCardStyles}
    <div class="p-4" style="max-width: 350px;">
      <div class="media-card">
        <div class="media-card-body">
          <div class="media-card-icon bg-light-primary hide-mobile">
            <span class="material-symbols-outlined">school</span>
          </div>
          <div class="media-card-content">
            <h5 class="media-card-title">Total de Alunos</h5>
            <p class="media-card-description">1.234</p>
          </div>
        </div>
      </div>
    </div>
  `,
};

/**
 * AllVariants - Todas as variantes de cor
 */
export const AllVariants = {
  render: () => `
    ${mediaCardStyles}
    <div class="p-4">
      <div class="row g-3">
        <div class="col-md-4">
          <div class="media-card">
            <div class="media-card-body">
              <div class="media-card-icon bg-light-primary">
                <span class="material-symbols-outlined">school</span>
              </div>
              <div class="media-card-content">
                <h5 class="media-card-title">Alunos Ativos</h5>
                <p class="media-card-description">1.234</p>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="media-card">
            <div class="media-card-body">
              <div class="media-card-icon bg-light-success">
                <span class="material-symbols-outlined">task_alt</span>
              </div>
              <div class="media-card-content">
                <h5 class="media-card-title">Atividades Concluídas</h5>
                <p class="media-card-description">5.678</p>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="media-card">
            <div class="media-card-body">
              <div class="media-card-icon bg-light-warning">
                <span class="material-symbols-outlined">pending</span>
              </div>
              <div class="media-card-content">
                <h5 class="media-card-title">Pendentes</h5>
                <p class="media-card-description">892</p>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="media-card">
            <div class="media-card-body">
              <div class="media-card-icon bg-light-danger">
                <span class="material-symbols-outlined">warning</span>
              </div>
              <div class="media-card-content">
                <h5 class="media-card-title">Atrasadas</h5>
                <p class="media-card-description">45</p>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="media-card">
            <div class="media-card-body">
              <div class="media-card-icon bg-light-info">
                <span class="material-symbols-outlined">info</span>
              </div>
              <div class="media-card-content">
                <h5 class="media-card-title">Total de Turmas</h5>
                <p class="media-card-description">42</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
};

/**
 * WithTooltip - Com ícone de informação
 */
export const WithTooltip = {
  render: () => `
    ${mediaCardStyles}
    <div class="p-4" style="max-width: 350px;">
      <div class="media-card">
        <div class="media-card-body">
          <div class="media-card-icon bg-light-primary">
            <span class="material-symbols-outlined">school</span>
          </div>
          <div class="media-card-content">
            <h5 class="media-card-title">
              Média de Proficiência
              <span class="material-symbols-outlined icon-info" title="Média calculada com base em todas as atividades">info</span>
            </h5>
            <p class="media-card-description">78%</p>
          </div>
        </div>
      </div>
    </div>
  `,
};

/**
 * Clickable - Com ação de clique
 */
export const Clickable = {
  render: () => `
    ${mediaCardStyles}
    <div class="p-4" style="max-width: 350px;">
      <div class="media-card clickable">
        <div class="media-card-body">
          <div class="media-card-icon bg-light-success">
            <span class="material-symbols-outlined">groups</span>
          </div>
          <div class="media-card-content">
            <h5 class="media-card-title">
              5º Ano A
              <span class="material-symbols-outlined icon-visibility">visibility</span>
            </h5>
            <p class="media-card-description">32 alunos</p>
          </div>
        </div>
      </div>
    </div>
  `,
};

/**
 * Loading - Estado de carregamento
 */
export const Loading = {
  render: () => `
    ${mediaCardStyles}
    <div class="p-4">
      <div class="row g-3">
        <div class="col-md-4">
          <div class="media-card">
            <div class="media-card-skeleton"></div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="media-card">
            <div class="media-card-skeleton"></div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="media-card">
            <div class="media-card-skeleton"></div>
          </div>
        </div>
      </div>
    </div>
  `,
};

/**
 * RightAligned - Ícone à direita
 */
export const RightAligned = {
  render: () => `
    ${mediaCardStyles}
    <div class="p-4" style="max-width: 350px;">
      <div class="media-card">
        <div class="media-card-body right-align">
          <div class="media-card-icon bg-light-primary">
            <span class="material-symbols-outlined">trending_up</span>
          </div>
          <div class="media-card-content" style="text-align: right;">
            <h5 class="media-card-title" style="justify-content: flex-end;">Crescimento</h5>
            <p class="media-card-description">+15%</p>
          </div>
        </div>
      </div>
    </div>
  `,
};

/**
 * WithBorder - Com borda colorida
 */
export const WithBorder = {
  render: () => `
    ${mediaCardStyles}
    <div class="p-4">
      <div class="row g-3">
        <div class="col-md-4">
          <div class="media-card border-primary">
            <div class="media-card-body">
              <div class="media-card-icon bg-light-primary">
                <span class="material-symbols-outlined">star</span>
              </div>
              <div class="media-card-content">
                <h5 class="media-card-title">Destaque</h5>
                <p class="media-card-description">Primary</p>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="media-card border-success">
            <div class="media-card-body">
              <div class="media-card-icon bg-light-success">
                <span class="material-symbols-outlined">check_circle</span>
              </div>
              <div class="media-card-content">
                <h5 class="media-card-title">Aprovado</h5>
                <p class="media-card-description">Success</p>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="media-card border-danger">
            <div class="media-card-body">
              <div class="media-card-icon bg-light-danger">
                <span class="material-symbols-outlined">error</span>
              </div>
              <div class="media-card-content">
                <h5 class="media-card-title">Atenção</h5>
                <p class="media-card-description">Danger</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
};
