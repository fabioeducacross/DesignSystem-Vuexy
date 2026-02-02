/**
 * BadgeStatus - Badge de Status de Proficiência
 * ==============================================
 * Badge educacional que exibe o nível de proficiência dos alunos.
 *
 * @component BadgeStatus
 * @source educacross-frontoffice/src/components/badge/BadgeStatus.vue
 */

export default {
  title: 'Educacross Components V2/Feedback/BadgeStatus',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
Badge de proficiência educacional para indicar desempenho dos alunos.

## Contexto de Uso

### Professor
- Visualiza proficiência dos alunos em atividades
- Monitora progresso em missões e avaliações

### Coordenador
- Analisa desempenho de turmas
- Gera relatórios de proficiência

### Aluno
- Visualiza seu próprio nível
- Acompanha evolução

## Props API

| Prop | Tipo | Default | Descrição |
|------|------|---------|-----------|
| \`level\` | String | 'proficient' | Nível: 'below-basic', 'basic', 'proficient', 'advanced' |
| \`label\` | String | - | Texto do badge |
| \`pill\` | Boolean | true | Estilo arredondado |

## Níveis de Proficiência

- **Abaixo do Básico** (Vermelho): < 50%
- **Básico** (Amarelo): 50-70%
- **Proficiente** (Verde): 70-90%
- **Avançado** (Roxo): > 90%
        `,
      },
    },
  },
  argTypes: {
    level: {
      control: 'select',
      options: ['below-basic', 'basic', 'proficient', 'advanced'],
    },
    label: {
      control: 'text',
    },
    pill: {
      control: 'boolean',
    },
  },
};

const styles = `
<style>
  :root {
    --legend-below-basic: #ea5455;
    --legend-basic: #ff9f43;
    --legend-proficient: #28c76f;
    --legend-advanced: #6e63e8;
  }

  .badge-status {
    display: inline-flex;
    align-items: center;
    gap: 0.25rem;
    padding: 0.35rem 0.75rem;
    font-size: 0.85rem;
    font-weight: 500;
    text-transform: uppercase;
    border-radius: 0.357rem;
    border: 1px solid;
  }

  .badge-status.pill {
    border-radius: 50rem;
    padding: 0.35rem 1rem;
  }

  .badge-below-basic {
    background: rgba(234, 84, 85, 0.12);
    color: var(--legend-below-basic);
    border-color: var(--legend-below-basic);
  }

  .badge-basic {
    background: rgba(255, 159, 67, 0.12);
    color: var(--legend-basic);
    border-color: var(--legend-basic);
  }

  .badge-proficient {
    background: rgba(40, 199, 111, 0.12);
    color: var(--legend-proficient);
    border-color: var(--legend-proficient);
  }

  .badge-advanced {
    background: rgba(110, 99, 232, 0.12);
    color: var(--legend-advanced);
    border-color: var(--legend-advanced);
  }
</style>
`;

const badge = (level, label, pill = true) => 
  `<span class="badge-status badge-${level} ${pill ? 'pill' : ''}">${label}</span>`;

export const Default = {
  args: { level: 'proficient', label: 'Proficiente', pill: true },
  render: (args) => `${styles}<div style="padding:2rem">${badge(args.level, args.label, args.pill)}</div>`,
};

export const AllLevels = {
  render: () => `
    ${styles}
    <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:1rem;padding:2rem;">
      <div style="text-align:center;padding:1rem;border:1px solid #ddd;border-radius:0.5rem;">
        <h4 style="font-size:0.875rem;margin-bottom:0.5rem;">Abaixo do Básico</h4>
        ${badge('below-basic', 'Abaixo do Básico')}
        <p style="font-size:0.75rem;color:#666;margin-top:0.5rem;">&lt; 50%</p>
      </div>
      <div style="text-align:center;padding:1rem;border:1px solid #ddd;border-radius:0.5rem;">
        <h4 style="font-size:0.875rem;margin-bottom:0.5rem;">Básico</h4>
        ${badge('basic', 'Básico')}
        <p style="font-size:0.75rem;color:#666;margin-top:0.5rem;">50-70%</p>
      </div>
      <div style="text-align:center;padding:1rem;border:1px solid #ddd;border-radius:0.5rem;">
        <h4 style="font-size:0.875rem;margin-bottom:0.5rem;">Proficiente</h4>
        ${badge('proficient', 'Proficiente')}
        <p style="font-size:0.75rem;color:#666;margin-top:0.5rem;">70-90%</p>
      </div>
      <div style="text-align:center;padding:1rem;border:1px solid #ddd;border-radius:0.5rem;">
        <h4 style="font-size:0.875rem;margin-bottom:0.5rem;">Avançado</h4>
        ${badge('advanced', 'Avançado')}
        <p style="font-size:0.75rem;color:#666;margin-top:0.5rem;">&gt; 90%</p>
      </div>
    </div>
  `,
};

export const PillVsSquare = {
  render: () => `
    ${styles}
    <div style="padding:2rem;">
      <h3 style="margin-bottom:1rem;">Pill (Arredondado)</h3>
      <div style="display:flex;gap:1rem;margin-bottom:2rem;">
        ${badge('below-basic', 'Abaixo', true)}
        ${badge('basic', 'Básico', true)}
        ${badge('proficient', 'Proficiente', true)}
        ${badge('advanced', 'Avançado', true)}
      </div>
      <h3 style="margin-bottom:1rem;">Square</h3>
      <div style="display:flex;gap:1rem;">
        ${badge('below-basic', 'Abaixo', false)}
        ${badge('basic', 'Básico', false)}
        ${badge('proficient', 'Proficiente', false)}
        ${badge('advanced', 'Avançado', false)}
      </div>
    </div>
  `,
};

export const ProfessorContext = {
  render: () => `
    ${styles}
    <div style="max-width:600px;margin:2rem auto;padding:1.5rem;background:#fff;border-radius:0.5rem;box-shadow:0 2px 8px rgba(0,0,0,0.1);">
      <h3 style="margin-bottom:1rem;">📊 Desempenho - Matemática</h3>
      ${['Maria Silva|advanced|Avançado', 'João Santos|proficient|Proficiente', 'Ana Costa|basic|Básico', 'Pedro Oliveira|below-basic|Abaixo do Básico'].map(s => {
        const [name, level, label] = s.split('|');
        return `<div style="display:flex;justify-content:space-between;padding:1rem;border-bottom:1px solid #eee;"><span>${name}</span>${badge(level, label)}</div>`;
      }).join('')}
    </div>
  `,
};

export const CoordinatorContext = {
  render: () => `
    ${styles}
    <div style="max-width:800px;margin:2rem auto;padding:2rem;background:#fff;border-radius:0.5rem;box-shadow:0 2px 8px rgba(0,0,0,0.1);">
      <h3 style="margin-bottom:1.5rem;">📈 Relatório de Proficiência</h3>
      ${['5º Ano A|8|12|6|2', '5º Ano B|5|15|8|4', '6º Ano A|10|14|4|1'].map(s => {
        const [turma, adv, prof, bas, ab] = s.split('|');
        return `
          <div style="display:grid;grid-template-columns:1fr 2fr;gap:1rem;padding:1rem;border-bottom:1px solid #eee;">
            <div style="font-weight:500;">${turma}</div>
            <div style="display:flex;gap:0.5rem;flex-wrap:wrap;">
              ${badge('advanced', adv + ' Avançados')}
              ${badge('proficient', prof + ' Proficientes')}
              ${badge('basic', bas + ' Básicos')}
              ${badge('below-basic', ab + ' Abaixo')}
            </div>
          </div>
        `;
      }).join('')}
    </div>
  `,
};

export const StudentContext = {
  render: () => `
    ${styles}
    <div style="max-width:500px;margin:2rem auto;padding:2rem;background:#fff;border-radius:0.5rem;box-shadow:0 2px 8px rgba(0,0,0,0.1);text-align:center;">
      <h3 style="margin-bottom:1.5rem;">🎯 Meu Desempenho</h3>
      ${['📐 Matemática|advanced|Avançado', '📖 Português|proficient|Proficiente', '🌍 Geografia|proficient|Proficiente', '🔬 Ciências|basic|Básico'].map(s => {
        const [subj, level, label] = s.split('|');
        return `<div style="display:flex;justify-content:space-between;padding:1rem;margin-bottom:0.5rem;background:#f8f7fa;border-radius:0.5rem;"><span>${subj}</span>${badge(level, label)}</div>`;
      }).join('')}
    </div>
  `,
};

export const CompactMode = {
  render: () => `
    ${styles}
    <div style="padding:2rem;">
      <p style="margin-bottom:1rem;">Modo compacto para tabelas:</p>
      <div style="display:flex;gap:0.5rem;">
        ${badge('advanced', 'A', false)}
        ${badge('proficient', 'P', false)}
        ${badge('basic', 'B', false)}
        ${badge('below-basic', 'AB', false)}
      </div>
    </div>
  `,
};

export const Interactive = {
  args: { level: 'proficient', label: 'Proficiente', pill: true },
  render: (args) => `
    ${styles}
    <div style="padding:2rem;text-align:center;">
      <strong>Preview Interativo</strong>
      <div style="margin:2rem 0;">${badge(args.level, args.label, args.pill)}</div>
      <p style="color:#666;font-size:0.875rem;">Use os controles acima</p>
    </div>
  `,
};
