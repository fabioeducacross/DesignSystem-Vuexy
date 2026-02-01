/**
 * BadgeStatus Component - Pixel Perfect from educacross-frontoffice
 *
 * @component BadgeStatus
 * @category Educacross Components V2
 * @status PIXEL-PERFECT
 * @source educacross-frontoffice/src/components/badge/BadgeStatus.vue
 * @since 2.0.0
 */

export default {
  title: 'Educacross Components V2/Feedback/BadgeStatus',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
## BadgeStatus - Badge de Proficiência Educacross (Pixel Perfect)

Componente extraído diretamente de \`educacross-frontoffice/src/components/badge/BadgeStatus.vue\`.

Este componente usa o sistema de **Legends** para determinar automaticamente a variante de cor baseado no valor e tipo de enum.

### Props do Componente Real

| Prop | Tipo | Default | Descrição |
|------|------|---------|-----------|
| \`value\` | Any | - | Valor para determinar a variante |
| \`enum\` | String | null | Tipo de enum (proficiency, progress, etc) |
| \`pill\` | Boolean | true | Estilo pill (arredondado) |
| \`badgeClass\` | String | '' | Classes CSS adicionais |

### Enums Disponíveis (LEGENDS)

- \`proficiency\` - Abaixo do Básico, Básico, Proficiente, Avançado
- \`proficiencyWithInProgress\` - Inclui "Em Andamento"
- \`proficiencyWithNotCompleted\` - Inclui "Não fizeram"
- \`progress\` - Progresso de atividades
- \`learningPerformance\` - Desempenho de aprendizagem
- \`accuracyPerformance\` - Precisão
- \`participation\` - Participação
- \`eventProgress\` - Progresso de eventos
- \`UserStatusEnum\` - Status do usuário

### Sistema de Variantes

| ID | Label | Variante CSS | Cor |
|----|-------|--------------|-----|
| 1 | Abaixo do Básico | legend-below-basic | Vermelho |
| 2 | Básico | legend-basic | Amarelo |
| 3 | Proficiente | legend-proficient | Verde |
| 4 | Avançado | legend-advanced | Roxo/Primary |
| 0 | Em Andamento | legend-in-progress | Cinza |
| 0 | Não fizeram | legend-not-completed | Cinza escuro |
        `,
      },
    },
  },
};

// CSS do BadgeStatus com variantes de Legend
const badgeStatusStyles = `
<style>
  /* === BadgeStatus - CSS Pixel Perfect do Frontoffice === */
  
  /* Variáveis de cores do sistema de proficiência */
  :root {
    --legend-below-basic: #ea5455;
    --legend-basic: #ff9f43;
    --legend-proficient: #28c76f;
    --legend-advanced: #6e63e8;
    --legend-in-progress: #82868b;
    --legend-not-completed: #4b4b4b;
  }

  /* Badge base */
  .badge-status {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.25rem;
    padding: 0.35rem 0.75rem;
    font-size: 0.85rem;
    font-weight: 500;
    line-height: 1;
    text-transform: uppercase;
    border-radius: 0.357rem;
    border: 1px solid transparent;
  }

  .badge-status.badge-pill {
    border-radius: 50rem;
    padding: 0.35rem 1rem;
  }

  .badge-status .material-symbols-outlined {
    font-size: 12px;
  }

  /* Variante: Abaixo do Básico */
  .badge-light-legend-below-basic {
    background-color: rgba(234, 84, 85, 0.12);
    color: var(--legend-below-basic);
    border-color: var(--legend-below-basic);
  }

  .text-legend-below-basic {
    color: var(--legend-below-basic) !important;
  }

  .bg-light-legend-below-basic {
    background-color: rgba(234, 84, 85, 0.12) !important;
  }

  /* Variante: Básico */
  .badge-light-legend-basic {
    background-color: rgba(255, 159, 67, 0.12);
    color: var(--legend-basic);
    border-color: var(--legend-basic);
  }

  .text-legend-basic {
    color: var(--legend-basic) !important;
  }

  .bg-light-legend-basic {
    background-color: rgba(255, 159, 67, 0.12) !important;
  }

  /* Variante: Proficiente */
  .badge-light-legend-proficient {
    background-color: rgba(40, 199, 111, 0.12);
    color: var(--legend-proficient);
    border-color: var(--legend-proficient);
  }

  .text-legend-proficient {
    color: var(--legend-proficient) !important;
  }

  .bg-light-legend-proficient {
    background-color: rgba(40, 199, 111, 0.12) !important;
  }

  /* Variante: Avançado */
  .badge-light-legend-advanced {
    background-color: rgba(110, 99, 232, 0.12);
    color: var(--legend-advanced);
    border-color: var(--legend-advanced);
  }

  .text-legend-advanced {
    color: var(--legend-advanced) !important;
  }

  .bg-light-legend-advanced {
    background-color: rgba(110, 99, 232, 0.12) !important;
  }

  /* Variante: Em Andamento */
  .badge-light-legend-in-progress {
    background-color: rgba(130, 134, 139, 0.12);
    color: var(--legend-in-progress);
    border-color: var(--legend-in-progress);
  }

  .text-legend-in-progress {
    color: var(--legend-in-progress) !important;
  }

  .bg-light-legend-in-progress {
    background-color: rgba(130, 134, 139, 0.12) !important;
  }

  /* Variante: Não fizeram */
  .badge-light-legend-not-completed {
    background-color: rgba(75, 75, 75, 0.12);
    color: var(--legend-not-completed);
    border-color: var(--legend-not-completed);
  }

  .text-legend-not-completed {
    color: var(--legend-not-completed) !important;
  }

  .bg-light-legend-not-completed {
    background-color: rgba(75, 75, 75, 0.12) !important;
  }

  /* Casos especiais */
  .badge-light-dark-gray,
  .badge-light-light-gray {
    background: #fff;
  }

  .whitespace-normal {
    white-space: normal !important;
  }
</style>
`;

/**
 * Proficiency - Níveis de proficiência
 */
export const Proficiency = {
  render: () => `
    ${badgeStatusStyles}
    <div class="p-4">
      <h6 class="mb-3">Enum: proficiency</h6>
      <div class="d-flex flex-wrap gap-3">
        <span class="badge-status badge-pill badge-light-legend-below-basic border-legend-below-basic">
          Abaixo do Básico
        </span>
        <span class="badge-status badge-pill badge-light-legend-basic border-legend-basic">
          Básico
        </span>
        <span class="badge-status badge-pill badge-light-legend-proficient border-legend-proficient">
          Proficiente
        </span>
        <span class="badge-status badge-pill badge-light-legend-advanced border-legend-advanced">
          Avançado
        </span>
      </div>
    </div>
  `,
};

/**
 * ProficiencyWithInProgress - Com estado "Em Andamento"
 */
export const ProficiencyWithInProgress = {
  render: () => `
    ${badgeStatusStyles}
    <div class="p-4">
      <h6 class="mb-3">Enum: proficiencyWithInProgress</h6>
      <div class="d-flex flex-wrap gap-3">
        <span class="badge-status badge-pill badge-light-legend-in-progress border-legend-in-progress">
          Em Andamento
        </span>
        <span class="badge-status badge-pill badge-light-legend-below-basic border-legend-below-basic">
          Abaixo do Básico
        </span>
        <span class="badge-status badge-pill badge-light-legend-basic border-legend-basic">
          Básico
        </span>
        <span class="badge-status badge-pill badge-light-legend-proficient border-legend-proficient">
          Proficiente
        </span>
        <span class="badge-status badge-pill badge-light-legend-advanced border-legend-advanced">
          Avançado
        </span>
      </div>
    </div>
  `,
};

/**
 * ProficiencyWithNotCompleted - Com estado "Não fizeram"
 */
export const ProficiencyWithNotCompleted = {
  render: () => `
    ${badgeStatusStyles}
    <div class="p-4">
      <h6 class="mb-3">Enum: proficiencyWithNotCompleted</h6>
      <div class="d-flex flex-wrap gap-3">
        <span class="badge-status badge-pill badge-light-legend-not-completed border-legend-not-completed">
          Não fizeram
        </span>
        <span class="badge-status badge-pill badge-light-legend-below-basic border-legend-below-basic">
          Abaixo do Básico
        </span>
        <span class="badge-status badge-pill badge-light-legend-basic border-legend-basic">
          Básico
        </span>
        <span class="badge-status badge-pill badge-light-legend-proficient border-legend-proficient">
          Proficiente
        </span>
        <span class="badge-status badge-pill badge-light-legend-advanced border-legend-advanced">
          Avançado
        </span>
      </div>
    </div>
  `,
};

/**
 * WithIcon - Badge com ícone (quando pill=false)
 */
export const WithIcon = {
  render: () => `
    ${badgeStatusStyles}
    <div class="p-4">
      <h6 class="mb-3">Badges com ícone (pill=false)</h6>
      <div class="d-flex flex-wrap gap-3">
        <span class="badge-status badge-light-legend-below-basic border-legend-below-basic">
          <span class="material-symbols-outlined text-legend-below-basic" style="font-size: 12px;">person_edit</span>
          Abaixo do Básico
        </span>
        <span class="badge-status badge-light-legend-basic border-legend-basic">
          <span class="material-symbols-outlined text-legend-basic" style="font-size: 12px;">person_edit</span>
          Básico
        </span>
        <span class="badge-status badge-light-legend-proficient border-legend-proficient">
          <span class="material-symbols-outlined text-legend-proficient" style="font-size: 12px;">person_edit</span>
          Proficiente
        </span>
        <span class="badge-status badge-light-legend-advanced border-legend-advanced">
          <span class="material-symbols-outlined text-legend-advanced" style="font-size: 12px;">person_edit</span>
          Avançado
        </span>
      </div>
    </div>
  `,
};

/**
 * InContext - Badges em contexto de tabela
 */
export const InContext = {
  render: () => `
    ${badgeStatusStyles}
    <style>
      .demo-table {
        width: 100%;
        border-collapse: collapse;
      }
      .demo-table th, .demo-table td {
        padding: 0.75rem 1rem;
        border-bottom: 1px solid #ebe9f1;
        text-align: left;
      }
      .demo-table th {
        background-color: #f3f2f7;
        font-weight: 600;
        text-transform: uppercase;
        font-size: 0.857rem;
      }
    </style>
    <div class="p-4">
      <h6 class="mb-3">Badges em contexto de tabela</h6>
      <div class="card">
        <table class="demo-table">
          <thead>
            <tr>
              <th>Aluno</th>
              <th>Desempenho</th>
              <th>Proficiência</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Ana Silva</td>
              <td>85%</td>
              <td>
                <span class="badge-status badge-pill badge-light-legend-proficient border-legend-proficient">
                  Proficiente
                </span>
              </td>
            </tr>
            <tr>
              <td>Bruno Santos</td>
              <td>92%</td>
              <td>
                <span class="badge-status badge-pill badge-light-legend-advanced border-legend-advanced">
                  Avançado
                </span>
              </td>
            </tr>
            <tr>
              <td>Carla Oliveira</td>
              <td>45%</td>
              <td>
                <span class="badge-status badge-pill badge-light-legend-basic border-legend-basic">
                  Básico
                </span>
              </td>
            </tr>
            <tr>
              <td>Daniel Costa</td>
              <td>22%</td>
              <td>
                <span class="badge-status badge-pill badge-light-legend-below-basic border-legend-below-basic">
                  Abaixo do Básico
                </span>
              </td>
            </tr>
            <tr>
              <td>Elena Ferreira</td>
              <td>-</td>
              <td>
                <span class="badge-status badge-pill badge-light-legend-not-completed border-legend-not-completed">
                  Não fizeram
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `,
};

/**
 * AllVariants - Todas as variantes disponíveis
 */
export const AllVariants = {
  render: () => `
    ${badgeStatusStyles}
    <div class="p-4">
      <h5 class="mb-4">Todas as Variantes de Badge</h5>
      
      <div class="mb-4">
        <h6 class="text-muted mb-2">Pill (arredondado)</h6>
        <div class="d-flex flex-wrap gap-2">
          <span class="badge-status badge-pill badge-light-legend-below-basic">Abaixo do Básico</span>
          <span class="badge-status badge-pill badge-light-legend-basic">Básico</span>
          <span class="badge-status badge-pill badge-light-legend-proficient">Proficiente</span>
          <span class="badge-status badge-pill badge-light-legend-advanced">Avançado</span>
          <span class="badge-status badge-pill badge-light-legend-in-progress">Em Andamento</span>
          <span class="badge-status badge-pill badge-light-legend-not-completed">Não fizeram</span>
        </div>
      </div>
      
      <div class="mb-4">
        <h6 class="text-muted mb-2">Retangular com ícone</h6>
        <div class="d-flex flex-wrap gap-2">
          <span class="badge-status badge-light-legend-below-basic">
            <span class="material-symbols-outlined" style="font-size: 12px;">sentiment_dissatisfied</span>
            Abaixo do Básico
          </span>
          <span class="badge-status badge-light-legend-basic">
            <span class="material-symbols-outlined" style="font-size: 12px;">sentiment_neutral</span>
            Básico
          </span>
          <span class="badge-status badge-light-legend-proficient">
            <span class="material-symbols-outlined" style="font-size: 12px;">sentiment_satisfied</span>
            Proficiente
          </span>
          <span class="badge-status badge-light-legend-advanced">
            <span class="material-symbols-outlined" style="font-size: 12px;">sentiment_very_satisfied</span>
            Avançado
          </span>
          <span class="badge-status badge-light-legend-in-progress">
            <span class="material-symbols-outlined" style="font-size: 12px;">directions_walk</span>
            Em Andamento
          </span>
          <span class="badge-status badge-light-legend-not-completed">
            <span class="material-symbols-outlined" style="font-size: 12px;">no_accounts</span>
            Não fizeram
          </span>
        </div>
      </div>
      
      <div>
        <h6 class="text-muted mb-2">Com borda</h6>
        <div class="d-flex flex-wrap gap-2">
          <span class="badge-status badge-pill badge-light-legend-below-basic border-legend-below-basic" style="border-width: 1px; border-style: solid; border-color: var(--legend-below-basic);">Abaixo do Básico</span>
          <span class="badge-status badge-pill badge-light-legend-basic" style="border-width: 1px; border-style: solid; border-color: var(--legend-basic);">Básico</span>
          <span class="badge-status badge-pill badge-light-legend-proficient" style="border-width: 1px; border-style: solid; border-color: var(--legend-proficient);">Proficiente</span>
          <span class="badge-status badge-pill badge-light-legend-advanced" style="border-width: 1px; border-style: solid; border-color: var(--legend-advanced);">Avançado</span>
        </div>
      </div>
    </div>
  `,
};
