/**
 * ExpiredMission - Modal de Missão Expirada
 * ==========================================
 * Modal/alerta exibido quando professor tenta enviar missão com prazo expirado
 * 
 * @component ExpiredMission
 * @category Educacross Components V2 / Feedback
 * @source educacross-frontoffice/src/components/mission-plus/ExpiredMission.vue
 * @priority P2
 * @status PIXEL-PERFECT
 * @since 2.0.0
 */

export default {
  title: 'Educacross Components V2/Feedback/ExpiredMission',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
Modal de feedback quando uma missão está expirada.

## Contexto de Uso

### Professor
- Alerta ao tentar enviar missão expirada
- Opção de editar prazo antes de enviar
- Evita erro de envio de missão inválida

## Props API

| Prop | Tipo | Default | Descrição |
|------|------|---------|-----------|
| \`missionName\` | String | - | Nome da missão expirada |
| \`expirationDate\` | String | - | Data de expiração |
| \`loading\` | Boolean | false | Estado de loading no botão |

## Events

- **close**: Fecha o modal (cancelar)
- **edit**: Abre edição da missão
        `,
      },
    },
  },
  argTypes: {
    missionName: { control: 'text' },
    expirationDate: { control: 'text' },
    loading: { control: 'boolean' },
  },
};

const styles = `
<style>
  .expired-mission-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
  }

  .expired-mission {
    background: white;
    border-radius: 0.5rem;
    padding: 2rem;
    max-width: 500px;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
    text-align: center;
  }

  .expired-mission img {
    max-width: 150px;
    margin-bottom: 1rem;
  }

  .expired-mission h2 {
    font-size: 1.5rem;
    color: #5d596c;
    margin-bottom: 1rem;
  }

  .expired-mission p {
    color: #6e6b7b;
    line-height: 1.6;
    margin-bottom: 1.5rem;
  }

  .expired-mission .buttons {
    display: flex;
    gap: 1rem;
    justify-content: center;
  }

  .btn {
    padding: 0.5rem 1.5rem;
    border-radius: 0.357rem;
    font-weight: 500;
    border: 1px solid;
    cursor: pointer;
    transition: all 0.2s;
  }

  .btn-outline {
    background: transparent;
    color: #6e63e8;
    border-color: #6e63e8;
  }

  .btn-outline:hover {
    background: #6e63e8;
    color: white;
  }

  .btn-primary {
    background: #6e63e8;
    color: white;
    border-color: #6e63e8;
  }

  .btn-primary:hover {
    background: #5a52c7;
  }

  .btn-primary:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
</style>
`;

const modal = (missionName = 'Missão de Matemática', expirationDate = '15/01/2026', loading = false) => `
  <div class="expired-mission-overlay">
    <div class="expired-mission">
      <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='150' height='150'%3E%3Crect fill='%23ffebee' width='150' height='150' rx='10'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='0.3em' font-size='60'%3E⚠️%3C/text%3E%3C/svg%3E" alt="Missão expirada" />
      <h2>Missão expirada</h2>
      <p>
        Opss... o prazo de duração da missão que você deseja enviar está expirado.
        ${missionName ? `<br/><strong>${missionName}</strong> expirou em <strong>${expirationDate}</strong>.` : ''}
        <br/>Por favor, ajuste o prazo de duração antes de enviá-la aos seus alunos.
      </p>
      <div class="buttons">
        <button class="btn btn-outline">Cancelar</button>
        <button class="btn btn-primary" ${loading ? 'disabled' : ''}>
          ${loading ? 'Carregando...' : 'Editar missão'}
        </button>
      </div>
    </div>
  </div>
`;

export const Default = {
  args: { missionName: 'Missão de Matemática', expirationDate: '15/01/2026', loading: false },
  render: (args) => `${styles}${modal(args.missionName, args.expirationDate, args.loading)}`,
};

export const WithCustomMission = {
  render: () => `${styles}${modal('Missão de Português - Verbos', '20/12/2025', false)}`,
};

export const LoadingState = {
  render: () => `${styles}${modal('Missão de Ciências', '10/01/2026', true)}`,
};

export const MinimalInfo = {
  render: () => `${styles}${modal('', '', false)}`,
};

export const ProfessorContext = {
  render: () => `
    ${styles}
    <style>
      .context-card {
        max-width: 800px;
        margin: 2rem auto;
        padding: 2rem;
        background: #f8f7fa;
        border-radius: 0.5rem;
      }
      .mission-card {
        background: white;
        padding: 1.5rem;
        border-radius: 0.5rem;
        margin-bottom: 1rem;
        border-left: 4px solid #ff9f43;
      }
      .mission-info {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      .expired-badge {
        background: rgba(255, 159, 67, 0.12);
        color: #ff9f43;
        padding: 0.25rem 0.75rem;
        border-radius: 0.357rem;
        font-size: 0.75rem;
        font-weight: 600;
      }
    </style>
    <div class="context-card">
      <h3 style="margin-bottom:1rem;">📋 Minhas Missões</h3>
      <div class="mission-card">
        <div class="mission-info">
          <div>
            <strong>Missão de Matemática - Frações</strong>
            <p style="font-size:0.875rem;color:#666;margin:0.5rem 0 0 0;">Expirou em 15/01/2026</p>
          </div>
          <span class="expired-badge">EXPIRADA</span>
        </div>
      </div>
    </div>
    ${modal('Missão de Matemática - Frações', '15/01/2026', false)}
  `,
};

export const MultipleExpired = {
  render: () => `
    ${styles}
    <style>
      .expired-list {
        max-width: 600px;
        margin: 2rem auto;
        padding: 1.5rem;
        background: white;
        border-radius: 0.5rem;
        box-shadow: 0 2px 8px rgba(0,0,0,0.1);
      }
      .expired-item {
        padding: 1rem;
        border-bottom: 1px solid #ebe9f1;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      .expired-item:last-child {
        border-bottom: none;
      }
      .warning-icon {
        color: #ff9f43;
        font-size: 1.5rem;
      }
    </style>
    <div class="expired-list">
      <h3 style="margin-bottom:1rem;">⚠️ Missões Expiradas (3)</h3>
      ${['Matemática - Frações|15/01/2026', 'Português - Verbos|10/01/2026', 'Ciências - Sistema Solar|05/01/2026'].map(s => {
        const [name, date] = s.split('|');
        return `
          <div class="expired-item">
            <div>
              <strong>${name}</strong>
              <p style="font-size:0.75rem;color:#666;margin:0.25rem 0 0 0;">Expirou em ${date}</p>
            </div>
            <span class="warning-icon">⚠️</span>
          </div>
        `;
      }).join('')}
    </div>
  `,
};

export const WithInstructions = {
  render: () => `
    ${styles}
    <style>
      .instructions {
        max-width: 600px;
        margin: 0 auto 2rem auto;
        padding: 1rem;
        background: #e8f4fd;
        border-left: 4px solid #00cfe8;
        border-radius: 0.357rem;
      }
    </style>
    <div class="instructions">
      <h4 style="margin:0 0 0.5rem 0;color:#00cfe8;">💡 Como resolver</h4>
      <ol style="margin:0.5rem 0 0 1.5rem;padding:0;">
        <li>Clique em "Editar missão"</li>
        <li>Atualize a data de expiração</li>
        <li>Salve as alterações</li>
        <li>Envie a missão aos alunos</li>
      </ol>
    </div>
    ${modal('Missão de Geografia', '01/01/2026', false)}
  `,
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
      .expired-mission {
        max-width: 320px;
        padding: 1.5rem;
      }
      .expired-mission h2 {
        font-size: 1.25rem;
      }
      .expired-mission .buttons {
        flex-direction: column;
      }
      .btn {
        width: 100%;
      }
    </style>
    ${modal('Missão Mobile', '20/01/2026', false)}
  `,
};

export const Interactive = {
  args: { missionName: 'Missão de Matemática', expirationDate: '15/01/2026', loading: false },
  render: (args) => `
    ${styles}
    <div style="text-align:center;padding:1rem;margin-bottom:1rem;">
      <strong>Preview Interativo</strong>
      <p style="color:#666;font-size:0.875rem;">Use os controles acima</p>
    </div>
    ${modal(args.missionName, args.expirationDate, args.loading)}
  `,
};
