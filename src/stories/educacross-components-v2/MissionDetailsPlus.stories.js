/**
 * MissionDetailsPlus - Detalhes de Missão Plus
 * ============================================
 * Exibe informações completas de uma Missão Plus (turma, duração, alunos, turnos).
 *
 * @component MissionDetailsPlus
 * @source educacross-frontoffice/src/components/mission-plus/MissionDetailsPlus.vue
 */

export default {
  title: 'Educacross Components V2/Content/MissionDetailsPlus',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
Visualização completa dos detalhes de uma Missão Plus com informações de turma, período, alunos e conteúdo por turno.

## Contexto de Uso

### Professor
- Visualiza detalhes antes de enviar missão
- Confirma turmas e alunos selecionados
- Revisa conteúdo de cada turno

### Coordenador
- Analisa missões criadas pelos professores
- Monitora distribuição de conteúdo
- Acompanha calendário de missões

## Props API

| Prop | Tipo | Default | Descrição |
|------|------|---------|-----------|
| \`missionName\` | String | - | Nome da missão |
| \`className\` | String | - | Nome da turma |
| \`startDate\` | String | - | Data de início |
| \`endDate\` | String | - | Data de término |
| \`studentsInfo\` | String | - | Info dos alunos (ex: "28 alunos") |
| \`rounds\` | Array | [] | Array de turnos com temática e imagem |
| \`loading\` | Boolean | false | Estado de carregamento |
        `,
      },
    },
  },
  argTypes: {
    missionName: { control: 'text' },
    className: { control: 'text' },
    startDate: { control: 'text' },
    endDate: { control: 'text' },
    studentsInfo: { control: 'text' },
    loading: { control: 'boolean' },
  },
};

const styles = `
<style>
  :root {
    --primary: #6e63e8;
    --card-bg: #fff;
    --border-color: #dbdade;
    --text-color: #5d596c;
  }

  .mission-details {
    max-width: 600px;
    margin: 0 auto;
    padding: 2rem;
  }

  .mission-header {
    text-align: center;
    margin-bottom: 2rem;
  }

  .mission-title {
    color: var(--primary);
    font-size: 1.75rem;
    font-weight: 600;
    margin-bottom: 1rem;
  }

  .mission-badge {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    background: rgba(110, 99, 232, 0.12);
    color: var(--primary);
    padding: 0.35rem 1rem;
    border-radius: 50rem;
    font-size: 0.875rem;
    font-weight: 500;
  }

  .info-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1rem;
    margin-bottom: 1.5rem;
  }

  .info-card {
    background: var(--card-bg);
    padding: 1rem;
    border-radius: 0.5rem;
    border: 1px solid var(--border-color);
    box-shadow: none;
  }

  .info-label {
    color: var(--text-color);
    font-weight: 600;
    font-size: 0.875rem;
    margin-bottom: 0.5rem;
  }

  .info-value {
    color: var(--primary);
    font-weight: 600;
    margin: 0;
  }

  .rounds-container {
    background: var(--card-bg);
    padding: 1.5rem;
    border-radius: 0.5rem;
    border: 1px solid var(--border-color);
  }

  .rounds-title {
    font-weight: 600;
    margin-bottom: 1rem;
    color: var(--text-color);
  }

  .rounds-scroll {
    display: flex;
    gap: 1rem;
    overflow-x: auto;
    padding-bottom: 0.5rem;
  }

  .round-card {
    min-width: 150px;
    text-align: center;
    background: var(--card-bg);
    border: 2px solid var(--primary);
    border-radius: 0.5rem;
    padding: 1rem;
  }

  .round-number {
    font-size: 0.75rem;
    text-transform: uppercase;
    color: var(--text-color);
    margin-bottom: 0.5rem;
  }

  .round-image {
    width: 100px;
    height: 100px;
    margin: 0 auto 0.75rem;
    border-radius: 0.5rem;
    background: #f0f0f0;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2.5rem;
  }

  .round-theme {
    font-size: 0.875rem;
    color: var(--text-color);
    word-wrap: break-word;
  }

  .loading-overlay {
    position: relative;
    opacity: 0.6;
  }
</style>
`;

const details = (args) => {
  const {
    missionName = 'Aventura Matemática',
    className = '5º Ano A',
    startDate = '20/01/2026',
    endDate = '27/01/2026',
    studentsInfo = '28 alunos selecionados',
    rounds = [
      { number: 1, theme: 'Frações e Decimais', icon: '🔢' },
      { number: 2, theme: 'Geometria Plana', icon: '📐' },
      { number: 3, theme: 'Medidas e Grandezas', icon: '📏' },
    ],
    loading = false,
  } = args;

  return `
    <div class="mission-details ${loading ? 'loading-overlay' : ''}">
      <div class="mission-header">
        <h1 class="mission-title">${missionName}</h1>
        <span class="mission-badge">
          ✨ Missão Plus
        </span>
      </div>

      <div class="info-grid">
        <div class="info-card">
          <div class="info-label">Turma:</div>
          <p class="info-value">${className}</p>
        </div>
        <div class="info-card">
          <div class="info-label">Duração:</div>
          <p class="info-value">${startDate} a ${endDate}</p>
        </div>
      </div>

      <div class="info-card" style="margin-bottom:1.5rem;">
        <div class="info-label">Alunos:</div>
        <p class="info-value">${studentsInfo}</p>
      </div>

      <div class="rounds-container">
        <div class="rounds-title">📚 Conteúdo por Turno</div>
        <div class="rounds-scroll">
          ${rounds.map(r => `
            <div class="round-card">
              <div class="round-number">Turno ${r.number}</div>
              <div class="round-image">${r.icon}</div>
              <div class="round-theme">${r.theme}</div>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;
};

export const Default = {
  args: {
    missionName: 'Aventura Matemática',
    className: '5º Ano A',
    startDate: '20/01/2026',
    endDate: '27/01/2026',
    studentsInfo: '28 alunos selecionados',
    loading: false,
  },
  render: (args) => `${styles}${details(args)}`,
};

export const PortugueseMission = {
  render: () => `${styles}${details({
    missionName: 'Exploradores da Língua Portuguesa',
    className: '6º Ano B',
    startDate: '15/02/2026',
    endDate: '22/02/2026',
    studentsInfo: '32 alunos selecionados',
    rounds: [
      { number: 1, theme: 'Verbos e Conjugações', icon: '📝' },
      { number: 2, theme: 'Interpretação de Textos', icon: '📖' },
      { number: 3, theme: 'Produção Textual', icon: '✍️' },
      { number: 4, theme: 'Gramática Aplicada', icon: '📚' },
    ],
  })}`,
};

export const ScienceMission = {
  render: () => `${styles}${details({
    missionName: 'Descobrindo o Sistema Solar',
    className: '7º Ano C',
    startDate: '10/03/2026',
    endDate: '17/03/2026',
    studentsInfo: '25 alunos selecionados',
    rounds: [
      { number: 1, theme: 'Planetas Internos', icon: '🌍' },
      { number: 2, theme: 'Planetas Externos', icon: '🪐' },
      { number: 3, theme: 'Satélites e Asteroides', icon: '🌙' },
    ],
  })}`,
};

export const LoadingState = {
  render: () => `${styles}${details({ loading: true })}`,
};

export const ProfessorContext = {
  render: () => `
    ${styles}
    <style>
      .context-container {
        background: #f8f7fa;
        padding: 2rem;
        min-height: 100vh;
      }
      .action-bar {
        max-width: 600px;
        margin: 0 auto 2rem auto;
        display: flex;
        gap: 1rem;
      }
      .btn {
        padding: 0.5rem 1.5rem;
        border-radius: 0.357rem;
        font-weight: 500;
        border: 1px solid;
        cursor: pointer;
      }
      .btn-primary {
        background: var(--primary);
        color: white;
        border-color: var(--primary);
      }
      .btn-outline {
        background: transparent;
        color: var(--primary);
        border-color: var(--primary);
      }
    </style>
    <div class="context-container">
      <div class="action-bar">
        <button class="btn btn-outline">Editar</button>
        <button class="btn btn-primary">Enviar aos Alunos</button>
      </div>
      ${details({
        missionName: 'Missão de Matemática - Frações',
        className: '5º Ano A, 5º Ano B',
        startDate: '20/01/2026',
        endDate: '27/01/2026',
        studentsInfo: '56 alunos em 2 turmas',
        rounds: [
          { number: 1, theme: 'Introdução às Frações', icon: '🔢' },
          { number: 2, theme: 'Operações com Frações', icon: '➗' },
          { number: 3, theme: 'Frações Equivalentes', icon: '⚖️' },
        ],
      })}
    </div>
  `,
};

export const CoordinatorContext = {
  render: () => `
    ${styles}
    <style>
      .coordinator-view {
        background: #f8f7fa;
        padding: 2rem;
      }
      .mission-stats {
        max-width: 600px;
        margin: 0 auto 2rem auto;
        background: white;
        padding: 1.5rem;
        border-radius: 0.5rem;
        border: 1px solid var(--border-color);
      }
      .stat-row {
        display: flex;
        justify-content: space-between;
        padding: 0.75rem 0;
        border-bottom: 1px solid #ebe9f1;
      }
      .stat-row:last-child {
        border-bottom: none;
      }
    </style>
    <div class="coordinator-view">
      <div class="mission-stats">
        <h3 style="margin-bottom:1rem;">📊 Estatísticas</h3>
        <div class="stat-row">
          <span>Professor Responsável:</span>
          <strong>Maria Santos</strong>
        </div>
        <div class="stat-row">
          <span>Data de Criação:</span>
          <strong>15/01/2026</strong>
        </div>
        <div class="stat-row">
          <span>Status:</span>
          <strong style="color:#28c76f;">Agendada</strong>
        </div>
      </div>
      ${details({})}
    </div>
  `,
};

export const WithManyRounds = {
  render: () => `${styles}${details({
    missionName: 'Jornada Completa de Matemática',
    className: '8º Ano A',
    startDate: '01/04/2026',
    endDate: '30/04/2026',
    studentsInfo: '30 alunos selecionados',
    rounds: [
      { number: 1, theme: 'Álgebra Básica', icon: '🔢' },
      { number: 2, theme: 'Equações 1º Grau', icon: '📊' },
      { number: 3, theme: 'Geometria Analítica', icon: '📐' },
      { number: 4, theme: 'Funções', icon: '📈' },
      { number: 5, theme: 'Trigonometria', icon: '📏' },
      { number: 6, theme: 'Revisão Geral', icon: '📚' },
    ],
  })}`,
};

export const ShortDuration = {
  render: () => `${styles}${details({
    missionName: 'Missão Relâmpago',
    className: '9º Ano A',
    startDate: '20/01/2026',
    endDate: '21/01/2026',
    studentsInfo: '15 alunos selecionados',
    rounds: [
      { number: 1, theme: 'Revisão Expressa', icon: '⚡' },
    ],
  })}`,
};

export const MobileView = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
  render: () => `
    ${styles}
    <style>
      .mission-details {
        padding: 1rem;
      }
      .info-grid {
        grid-template-columns: 1fr;
      }
      .round-card {
        min-width: 120px;
      }
    </style>
    ${details({})}
  `,
};

export const Interactive = {
  args: {
    missionName: 'Aventura Matemática',
    className: '5º Ano A',
    startDate: '20/01/2026',
    endDate: '27/01/2026',
    studentsInfo: '28 alunos selecionados',
    loading: false,
  },
  render: (args) => `
    ${styles}
    <div style="text-align:center;padding:1rem;margin-bottom:1rem;background:#f8f7fa;">
      <strong>Preview Interativo</strong>
      <p style="color:#666;font-size:0.875rem;">Use os controles acima</p>
    </div>
    ${details(args)}
  `,
};
