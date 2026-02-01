/**
 * ProgressBarHorizontal Component - Pixel Perfect from educacross-frontoffice
 *
 * @component ProgressBarHorizontal
 * @category Educacross Components V2
 * @status PIXEL-PERFECT
 * @source educacross-frontoffice/src/components/progessBar/ProgressBarHorizontal.vue
 * @since 2.0.0
 */

export default {
  title: 'Educacross Components V2/Feedback/ProgressBar',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
## ProgressBarHorizontal - Barra de Progresso Educacross (Pixel Perfect)

Componente extraído diretamente de \`educacross-frontoffice/src/components/progessBar/ProgressBarHorizontal.vue\`.

Usa o sistema de **rangeColors** para determinar automaticamente a cor baseada no valor.

### Props do Componente Real

| Prop | Tipo | Default | Descrição |
|------|------|---------|-----------|
| \`value\` | Number | 0 | Valor do progresso (0-100) |
| \`label\` | String | '' | Label superior |
| \`progressBarColors\` | Array | progressBarEnum | Configuração de cores |
| \`sufix\` | String | '' | Sufixo após o valor |
| \`sufixClass\` | String | '' | Classe do sufixo |
| \`positionBottom\` | Boolean | false | Valor abaixo da barra |
| \`progressBarContainerClass\` | String | 'mb-2' | Classe do container |
| \`labelClass\` | String | '' | Classe do label |

### Sistema de Cores (progressBarEnum)

| Range | Variante | Cor | Background |
|-------|----------|-----|------------|
| 0-30% | legend-below-basic | Vermelho | bg-progress-bar-legend-below-basic |
| 30-70% | legend-basic | Amarelo | bg-progress-bar-legend-basic |
| 70-100% | legend-proficient | Verde | bg-progress-bar-legend-proficient |

### Função getColors()

\`\`\`javascript
import { getColors, progressBarEnum } from '@/consts/rangeColors'

// Retorna: { textVariant, variant, background, min, max }
const colors = getColors(value, progressBarEnum)
\`\`\`
        `,
      },
    },
  },
};

// CSS do ProgressBar com cores de Legend
const progressBarStyles = `
<style>
  /* === ProgressBar - CSS Pixel Perfect do Frontoffice === */
  
  /* Variáveis de cores do sistema de proficiência */
  :root {
    --legend-below-basic: #ea5455;
    --legend-basic: #ff9f43;
    --legend-proficient: #28c76f;
    --legend-advanced: #6e63e8;
  }

  /* Container */
  .progress-bar-container {
    margin-bottom: 1rem;
  }

  .progress-bar-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.5rem;
  }

  .progress-bar-label {
    font-weight: 600;
    color: #5e5873;
  }

  .progress-bar-value {
    font-weight: 600;
  }

  /* Background wrapper */
  .progress-bar-bg {
    border-radius: 0.5rem;
    overflow: hidden;
  }

  .bg-progress-bar-legend-below-basic {
    background-color: rgba(234, 84, 85, 0.12);
  }

  .bg-progress-bar-legend-basic {
    background-color: rgba(255, 159, 67, 0.12);
  }

  .bg-progress-bar-legend-proficient {
    background-color: rgba(40, 199, 111, 0.12);
  }

  .bg-progress-bar-legend-advanced {
    background-color: rgba(110, 99, 232, 0.12);
  }

  /* Progress bar */
  .progress {
    display: flex;
    height: 5px;
    overflow: hidden;
    font-size: 0.75rem;
    background-color: transparent;
    border-radius: 0.357rem;
  }

  .progress-bar {
    display: flex;
    flex-direction: column;
    justify-content: center;
    overflow: hidden;
    color: #fff;
    text-align: center;
    white-space: nowrap;
    transition: width 0.6s ease;
    border-radius: 0.357rem;
  }

  .progress-bar.bg-legend-below-basic {
    background-color: var(--legend-below-basic);
  }

  .progress-bar.bg-legend-basic {
    background-color: var(--legend-basic);
  }

  .progress-bar.bg-legend-proficient {
    background-color: var(--legend-proficient);
  }

  .progress-bar.bg-legend-advanced {
    background-color: var(--legend-advanced);
  }

  /* Text variants */
  .text-legend-below-basic {
    color: var(--legend-below-basic) !important;
  }

  .text-legend-basic {
    color: var(--legend-basic) !important;
  }

  .text-legend-proficient {
    color: var(--legend-proficient) !important;
  }

  .text-legend-advanced {
    color: var(--legend-advanced) !important;
  }

  /* Sufix */
  .progress-bar-sufix {
    font-size: 0.857rem;
    color: #b9b9c3;
    margin-top: 0.25rem;
  }
</style>
`;

/**
 * Default - Exemplo básico
 */
export const Default = {
  render: () => `
    ${progressBarStyles}
    <div class="p-4" style="max-width: 400px;">
      <div class="progress-bar-container">
        <div class="progress-bar-header">
          <span class="progress-bar-label">Progresso</span>
          <span class="progress-bar-value text-legend-proficient">75%</span>
        </div>
        <div class="progress-bar-bg bg-progress-bar-legend-proficient rounded-lg">
          <div class="progress">
            <div class="progress-bar bg-legend-proficient" role="progressbar" style="width: 75%;" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"></div>
          </div>
        </div>
      </div>
    </div>
  `,
};

/**
 * ColorRanges - Demonstração das faixas de cores
 */
export const ColorRanges = {
  render: () => `
    ${progressBarStyles}
    <div class="p-4" style="max-width: 500px;">
      <h6 class="mb-4">Sistema de Cores por Faixa de Valor</h6>
      
      <!-- 0-30%: Abaixo do Básico (Vermelho) -->
      <div class="progress-bar-container">
        <div class="progress-bar-header">
          <span class="progress-bar-label">Aluno 1 - Abaixo do Básico</span>
          <span class="progress-bar-value text-legend-below-basic">15%</span>
        </div>
        <div class="progress-bar-bg bg-progress-bar-legend-below-basic rounded-lg">
          <div class="progress">
            <div class="progress-bar bg-legend-below-basic" style="width: 15%;"></div>
          </div>
        </div>
        <div class="progress-bar-sufix">Range: 0-30%</div>
      </div>

      <!-- 30-70%: Básico (Amarelo) -->
      <div class="progress-bar-container">
        <div class="progress-bar-header">
          <span class="progress-bar-label">Aluno 2 - Básico</span>
          <span class="progress-bar-value text-legend-basic">45%</span>
        </div>
        <div class="progress-bar-bg bg-progress-bar-legend-basic rounded-lg">
          <div class="progress">
            <div class="progress-bar bg-legend-basic" style="width: 45%;"></div>
          </div>
        </div>
        <div class="progress-bar-sufix">Range: 30-70%</div>
      </div>

      <!-- 70-100%: Proficiente (Verde) -->
      <div class="progress-bar-container">
        <div class="progress-bar-header">
          <span class="progress-bar-label">Aluno 3 - Proficiente</span>
          <span class="progress-bar-value text-legend-proficient">85%</span>
        </div>
        <div class="progress-bar-bg bg-progress-bar-legend-proficient rounded-lg">
          <div class="progress">
            <div class="progress-bar bg-legend-proficient" style="width: 85%;"></div>
          </div>
        </div>
        <div class="progress-bar-sufix">Range: 70-100%</div>
      </div>
    </div>
  `,
};

/**
 * WithSufix - Com sufixo
 */
export const WithSufix = {
  render: () => `
    ${progressBarStyles}
    <div class="p-4" style="max-width: 400px;">
      <div class="progress-bar-container">
        <div class="progress-bar-header">
          <span class="progress-bar-label">Acertos</span>
          <span class="progress-bar-value text-legend-proficient">72%</span>
        </div>
        <div class="progress-bar-bg bg-progress-bar-legend-proficient rounded-lg">
          <div class="progress">
            <div class="progress-bar bg-legend-proficient" style="width: 72%;"></div>
          </div>
        </div>
        <div class="progress-bar-sufix">72 de 100 questões</div>
      </div>
    </div>
  `,
};

/**
 * PositionBottom - Valor abaixo da barra
 */
export const PositionBottom = {
  render: () => `
    ${progressBarStyles}
    <div class="p-4" style="max-width: 400px;">
      <div class="progress-bar-container">
        <div class="progress-bar-header">
          <span class="progress-bar-label">Matemática</span>
        </div>
        <div class="progress-bar-bg bg-progress-bar-legend-basic rounded-lg">
          <div class="progress">
            <div class="progress-bar bg-legend-basic" style="width: 55%;"></div>
          </div>
        </div>
        <h6 class="font-weight-bold text-legend-basic mt-1">55%</h6>
      </div>
    </div>
  `,
};

/**
 * InCard - Dentro de um card
 */
export const InCard = {
  render: () => `
    ${progressBarStyles}
    <style>
      .demo-card {
        background: #fff;
        border-radius: 0.428rem;
        box-shadow: 0 4px 24px 0 rgba(34, 41, 47, 0.1);
        padding: 1.5rem;
        max-width: 350px;
      }
      .demo-card-title {
        font-weight: 600;
        font-size: 1.1rem;
        color: #5e5873;
        margin-bottom: 1rem;
      }
    </style>
    <div class="p-4">
      <div class="demo-card">
        <div class="demo-card-title">Desempenho por Disciplina</div>
        
        <div class="progress-bar-container">
          <div class="progress-bar-header">
            <span class="progress-bar-label">Português</span>
            <span class="progress-bar-value text-legend-proficient">82%</span>
          </div>
          <div class="progress-bar-bg bg-progress-bar-legend-proficient rounded-lg">
            <div class="progress">
              <div class="progress-bar bg-legend-proficient" style="width: 82%;"></div>
            </div>
          </div>
        </div>

        <div class="progress-bar-container">
          <div class="progress-bar-header">
            <span class="progress-bar-label">Matemática</span>
            <span class="progress-bar-value text-legend-basic">58%</span>
          </div>
          <div class="progress-bar-bg bg-progress-bar-legend-basic rounded-lg">
            <div class="progress">
              <div class="progress-bar bg-legend-basic" style="width: 58%;"></div>
            </div>
          </div>
        </div>

        <div class="progress-bar-container">
          <div class="progress-bar-header">
            <span class="progress-bar-label">Ciências</span>
            <span class="progress-bar-value text-legend-below-basic">23%</span>
          </div>
          <div class="progress-bar-bg bg-progress-bar-legend-below-basic rounded-lg">
            <div class="progress">
              <div class="progress-bar bg-legend-below-basic" style="width: 23%;"></div>
            </div>
          </div>
        </div>

        <div class="progress-bar-container mb-0">
          <div class="progress-bar-header">
            <span class="progress-bar-label">História</span>
            <span class="progress-bar-value text-legend-proficient">91%</span>
          </div>
          <div class="progress-bar-bg bg-progress-bar-legend-proficient rounded-lg">
            <div class="progress">
              <div class="progress-bar bg-legend-proficient" style="width: 91%;"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
};

/**
 * AllStates - Todos os estados possíveis
 */
export const AllStates = {
  render: () => `
    ${progressBarStyles}
    <div class="p-4" style="max-width: 500px;">
      <h6 class="mb-3">Todos os Estados</h6>
      
      ${[0, 10, 25, 30, 45, 60, 70, 80, 90, 100].map(value => {
        let variant = 'legend-below-basic';
        if (value >= 70) variant = 'legend-proficient';
        else if (value >= 30) variant = 'legend-basic';
        
        return `
          <div class="progress-bar-container" style="margin-bottom: 0.75rem;">
            <div class="progress-bar-header">
              <span class="progress-bar-label" style="font-size: 0.875rem;">${value}%</span>
              <span class="progress-bar-value text-${variant}" style="font-size: 0.875rem;">${value}%</span>
            </div>
            <div class="progress-bar-bg bg-progress-bar-${variant} rounded-lg">
              <div class="progress">
                <div class="progress-bar bg-${variant}" style="width: ${value}%;"></div>
              </div>
            </div>
          </div>
        `;
      }).join('')}
    </div>
  `,
};

/**
 * Compact - Versão compacta
 */
export const Compact = {
  render: () => `
    ${progressBarStyles}
    <style>
      .progress-compact {
        display: flex;
        align-items: center;
        gap: 0.75rem;
      }
      .progress-compact .progress-bar-bg {
        flex: 1;
      }
      .progress-compact .progress-value {
        min-width: 40px;
        text-align: right;
        font-weight: 600;
        font-size: 0.875rem;
      }
    </style>
    <div class="p-4" style="max-width: 300px;">
      <h6 class="mb-3">Progresso Compacto</h6>
      
      <div class="progress-compact mb-2">
        <span style="min-width: 80px;">Português</span>
        <div class="progress-bar-bg bg-progress-bar-legend-proficient rounded-lg flex-grow-1">
          <div class="progress">
            <div class="progress-bar bg-legend-proficient" style="width: 85%;"></div>
          </div>
        </div>
        <span class="progress-value text-legend-proficient">85%</span>
      </div>
      
      <div class="progress-compact mb-2">
        <span style="min-width: 80px;">Matemática</span>
        <div class="progress-bar-bg bg-progress-bar-legend-basic rounded-lg flex-grow-1">
          <div class="progress">
            <div class="progress-bar bg-legend-basic" style="width: 52%;"></div>
          </div>
        </div>
        <span class="progress-value text-legend-basic">52%</span>
      </div>
      
      <div class="progress-compact">
        <span style="min-width: 80px;">Ciências</span>
        <div class="progress-bar-bg bg-progress-bar-legend-below-basic rounded-lg flex-grow-1">
          <div class="progress">
            <div class="progress-bar bg-legend-below-basic" style="width: 18%;"></div>
          </div>
        </div>
        <span class="progress-value text-legend-below-basic">18%</span>
      </div>
    </div>
  `,
};
