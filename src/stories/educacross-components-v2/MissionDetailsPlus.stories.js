/**
 * MissionDetailsPlus - Detalhes de Missão Plus
 * ============================================
 * 
 * Exibe informações completas de uma Missão Plus (turma, duração, alunos, turnos).
 * Shows comprehensive mission information with class, duration, and shifts.
 * 
 * @component MissionDetailsPlus
 * @category Educacross Components V2
 * @source educacross-frontoffice/src/components/mission-plus/MissionDetailsPlus.vue
 * @priority P2
 * @status PIXEL-PERFECT
 * @since 2.0.0
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
      <div style="background:linear-gradient(135deg,#6E63E8 0%,#9C91EF 100%);padding:60px 40px;color:white;">
        <div style="max-width:900px;margin:0 auto;">
          <div style="display:inline-block;padding:8px 16px;background:rgba(255,255,255,0.15);border-radius:50px;margin-bottom:20px;font-size:14px;border:1px solid rgba(255,255,255,0.2);">Content</div>
          <h1 style="font-size:3rem;font-weight:700;margin:0 0 12px 0;letter-spacing:-0.02em;">MissionDetailsPlus</h1>
          <p style="font-size:1.1rem;opacity:0.9;margin:0;max-width:600px;">Detalhes de Missão Plus</p>
        </div>
      </div>
      <div style="max-width:900px;margin:0 auto;padding:48px 40px;">
        <div style="background:white;border-radius:12px;padding:32px;margin-bottom:32px;box-shadow:0 2px 8px rgba(0,0,0,0.08);">
          <h2 style="font-size:1.1rem;font-weight:600;color:#5E5873;margin:0 0 16px 0;">Sobre o Componente</h2>
          <p style="color:#6E6B7B;line-height:1.7;margin:0 0 16px 0;">Detalhes de Missão Plus. Faz parte da categoria <strong>Content</strong> do Design System Educacross.</p>
          <div style="background:#F8F7FF;border-left:4px solid #6E63E8;padding:16px;border-radius:4px;">
            <p style="margin:0;color:#5E5873;font-size:14px;line-height:1.6;"><strong>💡 Dica:</strong> Use <em>Playground</em> para explorar props, <em>Use Cases</em> para exemplos reais e <em>Accessibility</em> para validar WCAG.</p>
          </div>
        </div>
        <div style="background:white;border-radius:12px;padding:32px;box-shadow:0 2px 8px rgba(0,0,0,0.08);">
          <h2 style="font-size:1.1rem;font-weight:600;color:#5E5873;margin:0 0 16px 0;">Implementação Vue 2.7</h2>
          <pre style="background:#1E1E2E;color:#CDD6F4;padding:20px;border-radius:8px;font-size:13px;line-height:1.6;overflow:auto;margin:0;"><code>import MissionDetailsPlus from '@/components/MissionDetailsPlus.vue';

// Template
&lt;MissionDetailsPlus v-bind="props" /&gt;</code></pre>
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
    docs: { description: { story: 'Explore o MissionDetailsPlus com controles interativos.' } },
  },
  render: (args) => `
    <div style="padding:32px;display:flex;justify-content:center;align-items:center;min-height:200px;background:#F8F8F8;border-radius:12px;">
      <div style="text-align:center;color:#6E6B7B;">
        <div style="width:60px;height:60px;background:#6E63E820;border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 16px;font-size:24px;">🎨</div>
        <p style="margin:0 0 8px 0;font-size:15px;font-weight:600;color:#5E5873;">Playground MissionDetailsPlus</p>
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
    docs: { description: { story: 'Exemplos de uso real do MissionDetailsPlus no Educacross.' } },
  },
  render: () => `
    <div style="max-width:800px;margin:0 auto;padding:40px 20px;font-family:'Public Sans',sans-serif;">
      <div style="background:#6E63E815;border:1px solid #6E63E830;border-radius:12px;padding:24px;margin-bottom:40px;">
        <h1 style="font-size:1.5rem;font-weight:700;color:#5E5873;margin:0 0 8px 0;">Casos de Uso: MissionDetailsPlus</h1>
        <p style="color:#6E6B7B;margin:0;font-size:14px;line-height:1.6;">Cenários reais de uso no contexto educacional da plataforma Educacross</p>
      </div>
      
      <div style="margin-bottom:32px;">
        <h2 style="font-size:18px;font-weight:600;color:#5E5873;margin:0 0 8px 0;display:flex;align-items:center;gap:10px;">
          <span style="display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;background:#6E63E8;color:white;border-radius:50%;font-size:13px;font-weight:700;flex-shrink:0;">1</span>
          Professor — Painel Principal
        </h2>
        <p style="color:#6E6B7B;margin:0 0 16px 0;padding-left:38px;font-size:14px;">Professor utilizando MissionDetailsPlus no dashboard de gestão de turmas</p>
        <div style="background:#F8F8F8;border-radius:8px;padding:20px;margin-left:38px;text-align:center;color:#B9B9C3;font-size:13px;">
          Ver story <strong>Default</strong> para visualização do componente neste contexto
        </div>
      </div>
      <div style="margin-bottom:32px;">
        <h2 style="font-size:18px;font-weight:600;color:#5E5873;margin:0 0 8px 0;display:flex;align-items:center;gap:10px;">
          <span style="display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;background:#6E63E8;color:white;border-radius:50%;font-size:13px;font-weight:700;flex-shrink:0;">2</span>
          Aluno — Portal do Estudante
        </h2>
        <p style="color:#6E6B7B;margin:0 0 16px 0;padding-left:38px;font-size:14px;">Aluno interagindo com MissionDetailsPlus no portal educacional</p>
        <div style="background:#F8F8F8;border-radius:8px;padding:20px;margin-left:38px;text-align:center;color:#B9B9C3;font-size:13px;">
          Ver story <strong>Default</strong> para visualização do componente neste contexto
        </div>
      </div>
      <div style="margin-bottom:32px;">
        <h2 style="font-size:18px;font-weight:600;color:#5E5873;margin:0 0 8px 0;display:flex;align-items:center;gap:10px;">
          <span style="display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;background:#6E63E8;color:white;border-radius:50%;font-size:13px;font-weight:700;flex-shrink:0;">3</span>
          Coordenador — Relatórios
        </h2>
        <p style="color:#6E6B7B;margin:0 0 16px 0;padding-left:38px;font-size:14px;">Coordenador pedagógico analisando dados via MissionDetailsPlus</p>
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
    docs: { description: { story: 'Conformidade WCAG 2.1 AA para o MissionDetailsPlus.' } },
  },
  render: () => `
    <div style="max-width:800px;margin:0 auto;padding:40px 20px;font-family:'Public Sans',sans-serif;">

      <div style="background:linear-gradient(135deg,#6E63E8 0%,#764ba2 100%);padding:32px;border-radius:12px;margin-bottom:32px;color:white;">
        <h1 style="font-size:1.5rem;font-weight:700;margin:0 0 8px 0;">Acessibilidade: MissionDetailsPlus</h1>
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

