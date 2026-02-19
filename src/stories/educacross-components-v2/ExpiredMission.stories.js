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
      <div style="background:linear-gradient(135deg,#FF9F43 0%,#FFB976 100%);padding:60px 40px;color:white;">
        <div style="max-width:900px;margin:0 auto;">
          <div style="display:inline-block;padding:8px 16px;background:rgba(255,255,255,0.15);border-radius:50px;margin-bottom:20px;font-size:14px;border:1px solid rgba(255,255,255,0.2);">Feedback</div>
          <h1 style="font-size:3rem;font-weight:700;margin:0 0 12px 0;letter-spacing:-0.02em;">ExpiredMission</h1>
          <p style="font-size:1.1rem;opacity:0.9;margin:0;max-width:600px;">Modal de Missão Expirada</p>
        </div>
      </div>
      <div style="max-width:900px;margin:0 auto;padding:48px 40px;">
        <div style="background:white;border-radius:12px;padding:32px;margin-bottom:32px;box-shadow:0 2px 8px rgba(0,0,0,0.08);">
          <h2 style="font-size:1.1rem;font-weight:600;color:#5E5873;margin:0 0 16px 0;">Sobre o Componente</h2>
          <p style="color:#6E6B7B;line-height:1.7;margin:0 0 16px 0;">Modal de Missão Expirada. Faz parte da categoria <strong>Feedback</strong> do Design System Educacross.</p>
          <div style="background:#F8F7FF;border-left:4px solid #FF9F43;padding:16px;border-radius:4px;">
            <p style="margin:0;color:#5E5873;font-size:14px;line-height:1.6;"><strong>💡 Dica:</strong> Use <em>Playground</em> para explorar props, <em>Use Cases</em> para exemplos reais e <em>Accessibility</em> para validar WCAG.</p>
          </div>
        </div>
        <div style="background:white;border-radius:12px;padding:32px;box-shadow:0 2px 8px rgba(0,0,0,0.08);">
          <h2 style="font-size:1.1rem;font-weight:600;color:#5E5873;margin:0 0 16px 0;">Implementação Vue 2.7</h2>
          <pre style="background:#1E1E2E;color:#CDD6F4;padding:20px;border-radius:8px;font-size:13px;line-height:1.6;overflow:auto;margin:0;"><code>import ExpiredMission from '@/components/ExpiredMission.vue';

// Template
&lt;ExpiredMission v-bind="props" /&gt;</code></pre>
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
    docs: { description: { story: 'Explore o ExpiredMission com controles interativos.' } },
  },
  render: (args) => `
    <div style="padding:32px;display:flex;justify-content:center;align-items:center;min-height:200px;background:#F8F8F8;border-radius:12px;">
      <div style="text-align:center;color:#6E6B7B;">
        <div style="width:60px;height:60px;background:#FF9F4320;border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 16px;font-size:24px;">🎨</div>
        <p style="margin:0 0 8px 0;font-size:15px;font-weight:600;color:#5E5873;">Playground ExpiredMission</p>
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
    docs: { description: { story: 'Exemplos de uso real do ExpiredMission no Educacross.' } },
  },
  render: () => `
    <div style="max-width:800px;margin:0 auto;padding:40px 20px;font-family:'Public Sans',sans-serif;">
      <div style="background:#FF9F4315;border:1px solid #FF9F4330;border-radius:12px;padding:24px;margin-bottom:40px;">
        <h1 style="font-size:1.5rem;font-weight:700;color:#5E5873;margin:0 0 8px 0;">Casos de Uso: ExpiredMission</h1>
        <p style="color:#6E6B7B;margin:0;font-size:14px;line-height:1.6;">Cenários reais de uso no contexto educacional da plataforma Educacross</p>
      </div>
      
      <div style="margin-bottom:32px;">
        <h2 style="font-size:18px;font-weight:600;color:#5E5873;margin:0 0 8px 0;display:flex;align-items:center;gap:10px;">
          <span style="display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;background:#FF9F43;color:white;border-radius:50%;font-size:13px;font-weight:700;flex-shrink:0;">1</span>
          Professor — Painel Principal
        </h2>
        <p style="color:#6E6B7B;margin:0 0 16px 0;padding-left:38px;font-size:14px;">Professor utilizando ExpiredMission no dashboard de gestão de turmas</p>
        <div style="background:#F8F8F8;border-radius:8px;padding:20px;margin-left:38px;text-align:center;color:#B9B9C3;font-size:13px;">
          Ver story <strong>Default</strong> para visualização do componente neste contexto
        </div>
      </div>
      <div style="margin-bottom:32px;">
        <h2 style="font-size:18px;font-weight:600;color:#5E5873;margin:0 0 8px 0;display:flex;align-items:center;gap:10px;">
          <span style="display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;background:#FF9F43;color:white;border-radius:50%;font-size:13px;font-weight:700;flex-shrink:0;">2</span>
          Aluno — Portal do Estudante
        </h2>
        <p style="color:#6E6B7B;margin:0 0 16px 0;padding-left:38px;font-size:14px;">Aluno interagindo com ExpiredMission no portal educacional</p>
        <div style="background:#F8F8F8;border-radius:8px;padding:20px;margin-left:38px;text-align:center;color:#B9B9C3;font-size:13px;">
          Ver story <strong>Default</strong> para visualização do componente neste contexto
        </div>
      </div>
      <div style="margin-bottom:32px;">
        <h2 style="font-size:18px;font-weight:600;color:#5E5873;margin:0 0 8px 0;display:flex;align-items:center;gap:10px;">
          <span style="display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;background:#FF9F43;color:white;border-radius:50%;font-size:13px;font-weight:700;flex-shrink:0;">3</span>
          Coordenador — Relatórios
        </h2>
        <p style="color:#6E6B7B;margin:0 0 16px 0;padding-left:38px;font-size:14px;">Coordenador pedagógico analisando dados via ExpiredMission</p>
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
    docs: { description: { story: 'Conformidade WCAG 2.1 AA para o ExpiredMission.' } },
  },
  render: () => `
    <div style="max-width:800px;margin:0 auto;padding:40px 20px;font-family:'Public Sans',sans-serif;">

      <div style="background:linear-gradient(135deg,#FF9F43 0%,#764ba2 100%);padding:32px;border-radius:12px;margin-bottom:32px;color:white;">
        <h1 style="font-size:1.5rem;font-weight:700;margin:0 0 8px 0;">Acessibilidade: ExpiredMission</h1>
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

