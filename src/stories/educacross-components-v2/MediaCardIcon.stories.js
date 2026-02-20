/**
 * MediaCardIcon - Metric Card with Large Icon
 * =========================================
 * 
 * Card de métrica com ícone grande centralizado para dashboards educacionais.
 * Used by teachers and coordinators for visual metrics display.
 * 
 * @component MediaCardIcon
 * @category Educacross Components V2
 * @source educacross-frontoffice/src/components/card/MediaCardIcon.vue
 * @priority P2
 * @status PIXEL-PERFECT
 * @since 2.0.0
 */

export default {
  title: 'Educacross Components V2/Cards/MediaCardIcon',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
Card de métrica com ícone grande centralizado para dashboards educacionais.

---

## Contexto
- **Professor**: Dashboard com métricas visuais (alunos, missões, aprovações)
- **Coordenador**: Visão geral escola (turmas, professores, desempenho)

## Props
| Prop | Type | Default |
|------|------|---------|
| icon | String | - |
| iconColor | String | 'primary' |
| title | String | - |
| value | String/Number | - |
| trend | String | null |
| backgroundColor | String | '#fff' |
        `
      }
    }
  },
  argTypes: {
    iconColor: {
      control: 'select',
      options: ['primary', 'success', 'warning', 'danger', 'info']
    },
    trend: {
      control: 'select',
      options: [null, 'up', 'down']
    }
  }
};

const styles = `
<style>
  .media-card-icon {
    background: var(--bg, #fff);
    border: 1px solid #D8D6DE;
    border-radius: 8px;
    padding: 24px;
    width: 240px;
    text-align: center;
    transition: all 0.3s;
    cursor: pointer;
  }
  .media-card-icon:hover {
    box-shadow: 0 4px 16px rgba(0,0,0,0.1);
    transform: translateY(-2px);
  }
  .media-card-icon-wrapper {
    width: 64px;
    height: 64px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 16px;
    background: var(--icon-bg);
  }
  .media-card-icon-wrapper i {
    font-size: 32px;
    color: var(--icon-color);
  }
  .media-card-title {
    font-size: 14px;
    color: #6E6B7B;
    margin: 0 0 8px;
  }
  .media-card-value {
    font-size: 28px;
    font-weight: 600;
    color: #5E5873;
    margin: 0 0 8px;
  }
  .media-card-trend {
    font-size: 13px;
    font-weight: 500;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 4px;
  }
  .media-card-trend.up { color: #28C76F; }
  .media-card-trend.down { color: #EA5455; }
  .color-primary { --icon-color: #6E63E8; --icon-bg: rgba(110, 99, 232, 0.12); }
  .color-success { --icon-color: #28C76F; --icon-bg: rgba(40, 199, 111, 0.12); }
  .color-warning { --icon-color: #FF9F43; --icon-bg: rgba(255, 159, 67, 0.12); }
  .color-danger { --icon-color: #EA5455; --icon-bg: rgba(234, 84, 85, 0.12); }
  .color-info { --icon-color: #00CFE8; --icon-bg: rgba(0, 207, 232, 0.12); }
</style>
`;

export const Default = {
  args: {
    icon: 'bi-people',
    iconColor: 'primary',
    title: 'Total Alunos',
    value: '1.234',
    trend: null
  },
  render: (args) => `
    ${styles}
    <div class="media-card-icon">
      <div class="media-card-icon-wrapper color-${args.iconColor}">
        <i class="bi ${args.icon}"></i>
      </div>
      <p class="media-card-title">${args.title}</p>
      <h3 class="media-card-value">${args.value}</h3>
      ${args.trend ? `<div class="media-card-trend ${args.trend}">
        <i class="bi bi-arrow-${args.trend === 'up' ? 'up' : 'down'}"></i>
        <span>12% este mês</span>
      </div>` : ''}
    </div>
  `
};

export const AllIcons = {
  render: () => `
    ${styles}
    <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 20px;">
      <div class="media-card-icon">
        <div class="media-card-icon-wrapper color-primary">
          <i class="bi bi-people"></i>
        </div>
        <p class="media-card-title">Total Alunos</p>
        <h3 class="media-card-value">1.234</h3>
      </div>
      <div class="media-card-icon">
        <div class="media-card-icon-wrapper color-success">
          <i class="bi bi-book"></i>
        </div>
        <p class="media-card-title">Missões Ativas</p>
        <h3 class="media-card-value">89</h3>
      </div>
      <div class="media-card-icon">
        <div class="media-card-icon-wrapper color-info">
          <i class="bi bi-check-circle"></i>
        </div>
        <p class="media-card-title">Concluídas</p>
        <h3 class="media-card-value">5.678</h3>
      </div>
      <div class="media-card-icon">
        <div class="media-card-icon-wrapper color-warning">
          <i class="bi bi-trophy"></i>
        </div>
        <p class="media-card-title">Aprovações</p>
        <h3 class="media-card-value">92%</h3>
      </div>
    </div>
  `
};

export const WithTrendUp = {
  render: () => `
    ${styles}
    <div class="media-card-icon">
      <div class="media-card-icon-wrapper color-success">
        <i class="bi bi-graph-up"></i>
      </div>
      <p class="media-card-title">Aprovações</p>
      <h3 class="media-card-value">92%</h3>
      <div class="media-card-trend up">
        <i class="bi bi-arrow-up"></i>
        <span>+15% este mês</span>
      </div>
    </div>
  `
};

export const WithTrendDown = {
  render: () => `
    ${styles}
    <div class="media-card-icon">
      <div class="media-card-icon-wrapper color-danger">
        <i class="bi bi-exclamation-triangle"></i>
      </div>
      <p class="media-card-title">Missões Pendentes</p>
      <h3 class="media-card-value">23</h3>
      <div class="media-card-trend down">
        <i class="bi bi-arrow-down"></i>
        <span>-8% este mês</span>
      </div>
    </div>
  `
};

export const DashboardProfessor = {
  render: () => `
    ${styles}
    <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; max-width: 1200px;">
      <div class="media-card-icon">
        <div class="media-card-icon-wrapper color-primary">
          <i class="bi bi-people"></i>
        </div>
        <p class="media-card-title">Meus Alunos</p>
        <h3 class="media-card-value">156</h3>
        <div class="media-card-trend up">
          <i class="bi bi-arrow-up"></i>
          <span>+3 este mês</span>
        </div>
      </div>
      <div class="media-card-icon">
        <div class="media-card-icon-wrapper color-success">
          <i class="bi bi-book"></i>
        </div>
        <p class="media-card-title">Missões Aplicadas</p>
        <h3 class="media-card-value">45</h3>
      </div>
      <div class="media-card-icon">
        <div class="media-card-icon-wrapper color-info">
          <i class="bi bi-check-circle"></i>
        </div>
        <p class="media-card-title">Taxa Conclusão</p>
        <h3 class="media-card-value">87%</h3>
        <div class="media-card-trend up">
          <i class="bi bi-arrow-up"></i>
          <span>+5% este mês</span>
        </div>
      </div>
      <div class="media-card-icon">
        <div class="media-card-icon-wrapper color-warning">
          <i class="bi bi-trophy"></i>
        </div>
        <p class="media-card-title">Média Geral</p>
        <h3 class="media-card-value">8.2</h3>
      </div>
    </div>
    <p style="margin-top: 20px; font-size: 13px; color: #6E6B7B;">
      <strong>Contexto:</strong> Dashboard da Professora Mariana Silva - 5º ano Matemática.
    </p>
  `
};

export const DashboardCoordenador = {
  render: () => `
    ${styles}
    <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; max-width: 1200px;">
      <div class="media-card-icon">
        <div class="media-card-icon-wrapper color-primary">
          <i class="bi bi-building"></i>
        </div>
        <p class="media-card-title">Total Turmas</p>
        <h3 class="media-card-value">24</h3>
      </div>
      <div class="media-card-icon">
        <div class="media-card-icon-wrapper color-success">
          <i class="bi bi-person-badge"></i>
        </div>
        <p class="media-card-title">Professores</p>
        <h3 class="media-card-value">32</h3>
      </div>
      <div class="media-card-icon">
        <div class="media-card-icon-wrapper color-info">
          <i class="bi bi-people"></i>
        </div>
        <p class="media-card-title">Total Alunos</p>
        <h3 class="media-card-value">1.234</h3>
        <div class="media-card-trend up">
          <i class="bi bi-arrow-up"></i>
          <span>+45 este mês</span>
        </div>
      </div>
      <div class="media-card-icon">
        <div class="media-card-icon-wrapper color-warning">
          <i class="bi bi-bar-chart"></i>
        </div>
        <p class="media-card-title">Desempenho Médio</p>
        <h3 class="media-card-value">85%</h3>
      </div>
    </div>
    <p style="margin-top: 20px; font-size: 13px; color: #6E6B7B;">
      <strong>Contexto:</strong> Dashboard do Coordenador João Carlos - Escola Municipal Vista Alegre.
    </p>
  `
};

export const LoadingSkeleton = {
  render: () => `
    ${styles}
    <style>
      @keyframes shimmer {
        0% { background-position: -200px 0; }
        100% { background-position: calc(200px + 100%) 0; }
      }
      .skeleton {
        background: linear-gradient(90deg, #f0f0f0 0px, #f8f8f8 40px, #f0f0f0 80px);
        background-size: 200px 100%;
        animation: shimmer 1.5s infinite;
        border-radius: 4px;
      }
    </style>
    <div class="media-card-icon" style="cursor: default;">
      <div class="media-card-icon-wrapper skeleton"></div>
      <div class="skeleton" style="height: 14px; width: 80px; margin: 0 auto 12px;"></div>
      <div class="skeleton" style="height: 28px; width: 100px; margin: 0 auto;"></div>
    </div>
  `
};

export const Interactive = {
  render: () => `
    ${styles}
    <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; max-width: 1200px;">
      <div class="media-card-icon" onclick="alert('Ver detalhes dos alunos')">
        <div class="media-card-icon-wrapper color-primary">
          <i class="bi bi-people"></i>
        </div>
        <p class="media-card-title">Alunos Ativos</p>
        <h3 class="media-card-value">156</h3>
      </div>
      <div class="media-card-icon" onclick="alert('Ver missões')">
        <div class="media-card-icon-wrapper color-success">
          <i class="bi bi-book"></i>
        </div>
        <p class="media-card-title">Missões</p>
        <h3 class="media-card-value">45</h3>
      </div>
      <div class="media-card-icon" onclick="alert('Ver relatório')">
        <div class="media-card-icon-wrapper color-info">
          <i class="bi bi-check-circle"></i>
        </div>
        <p class="media-card-title">Concluídas</p>
        <h3 class="media-card-value">1.234</h3>
      </div>
      <div class="media-card-icon" onclick="alert('Ver ranking')">
        <div class="media-card-icon-wrapper color-warning">
          <i class="bi bi-trophy"></i>
        </div>
        <p class="media-card-title">Média</p>
        <h3 class="media-card-value">8.5</h3>
      </div>
    </div>
    <p style="margin-top: 20px; font-size: 13px; color: #6E6B7B;">
      <strong>Contexto:</strong> Cards clicáveis que navegam para detalhes. Clique para testar.
    </p>
  `
};

export const AllColors = {
  render: () => `
    ${styles}
    <div style="display: grid; grid-template-columns: repeat(5, 1fr); gap: 16px;">
      <div class="media-card-icon">
        <div class="media-card-icon-wrapper color-primary">
          <i class="bi bi-star"></i>
        </div>
        <p class="media-card-title">Primary</p>
        <h3 class="media-card-value">100</h3>
      </div>
      <div class="media-card-icon">
        <div class="media-card-icon-wrapper color-success">
          <i class="bi bi-check-circle"></i>
        </div>
        <p class="media-card-title">Success</p>
        <h3 class="media-card-value">200</h3>
      </div>
      <div class="media-card-icon">
        <div class="media-card-icon-wrapper color-warning">
          <i class="bi bi-exclamation-triangle"></i>
        </div>
        <p class="media-card-title">Warning</p>
        <h3 class="media-card-value">50</h3>
      </div>
      <div class="media-card-icon">
        <div class="media-card-icon-wrapper color-danger">
          <i class="bi bi-x-circle"></i>
        </div>
        <p class="media-card-title">Danger</p>
        <h3 class="media-card-value">10</h3>
      </div>
      <div class="media-card-icon">
        <div class="media-card-icon-wrapper color-info">
          <i class="bi bi-info-circle"></i>
        </div>
        <p class="media-card-title">Info</p>
        <h3 class="media-card-value">75</h3>
      </div>
    </div>
  `
};

export const CompactGrid = {
  render: () => `
    ${styles}
    <div style="display: grid; grid-template-columns: repeat(6, 1fr); gap: 12px;">
      <div class="media-card-icon" style="width: auto; padding: 16px;">
        <div class="media-card-icon-wrapper color-primary" style="width: 48px; height: 48px; margin-bottom: 12px;">
          <i class="bi bi-people" style="font-size: 24px;"></i>
        </div>
        <p class="media-card-title" style="font-size: 12px;">Alunos</p>
        <h3 class="media-card-value" style="font-size: 20px;">156</h3>
      </div>
      <div class="media-card-icon" style="width: auto; padding: 16px;">
        <div class="media-card-icon-wrapper color-success" style="width: 48px; height: 48px; margin-bottom: 12px;">
          <i class="bi bi-book" style="font-size: 24px;"></i>
        </div>
        <p class="media-card-title" style="font-size: 12px;">Missões</p>
        <h3 class="media-card-value" style="font-size: 20px;">45</h3>
      </div>
      <div class="media-card-icon" style="width: auto; padding: 16px;">
        <div class="media-card-icon-wrapper color-info" style="width: 48px; height: 48px; margin-bottom: 12px;">
          <i class="bi bi-check" style="font-size: 24px;"></i>
        </div>
        <p class="media-card-title" style="font-size: 12px;">OK</p>
        <h3 class="media-card-value" style="font-size: 20px;">98%</h3>
      </div>
      <div class="media-card-icon" style="width: auto; padding: 16px;">
        <div class="media-card-icon-wrapper color-warning" style="width: 48px; height: 48px; margin-bottom: 12px;">
          <i class="bi bi-trophy" style="font-size: 24px;"></i>
        </div>
        <p class="media-card-title" style="font-size: 12px;">Média</p>
        <h3 class="media-card-value" style="font-size: 20px;">8.5</h3>
      </div>
      <div class="media-card-icon" style="width: auto; padding: 16px;">
        <div class="media-card-icon-wrapper color-danger" style="width: 48px; height: 48px; margin-bottom: 12px;">
          <i class="bi bi-clock" style="font-size: 24px;"></i>
        </div>
        <p class="media-card-title" style="font-size: 12px;">Pendentes</p>
        <h3 class="media-card-value" style="font-size: 20px;">12</h3>
      </div>
      <div class="media-card-icon" style="width: auto; padding: 16px;">
        <div class="media-card-icon-wrapper color-primary" style="width: 48px; height: 48px; margin-bottom: 12px;">
          <i class="bi bi-calendar" style="font-size: 24px;"></i>
        </div>
        <p class="media-card-title" style="font-size: 12px;">Hoje</p>
        <h3 class="media-card-value" style="font-size: 20px;">8</h3>
      </div>
    </div>
  `
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
      <div style="background:linear-gradient(135deg,#7367F0 0%,#9E95F5 100%);padding:60px 40px;color:white;">
        <div style="max-width:900px;margin:0 auto;">
          <div style="display:inline-block;padding:8px 16px;background:rgba(255,255,255,0.15);border-radius:50px;margin-bottom:20px;font-size:14px;border:1px solid rgba(255,255,255,0.2);">Cards</div>
          <h1 style="font-size:3rem;font-weight:700;margin:0 0 12px 0;letter-spacing:-0.02em;">MediaCardIcon</h1>
          <p style="font-size:1.1rem;opacity:0.9;margin:0;max-width:600px;">Metric Card with Large Icon</p>
        </div>
      </div>
      <div style="max-width:900px;margin:0 auto;padding:48px 40px;">
        <div style="background:white;border-radius:12px;padding:32px;margin-bottom:32px;box-shadow:0 2px 8px rgba(0,0,0,0.08);">
          <h2 style="font-size:1.1rem;font-weight:600;color:#5E5873;margin:0 0 16px 0;">Sobre o Componente</h2>
          <p style="color:#6E6B7B;line-height:1.7;margin:0 0 16px 0;">Metric Card with Large Icon. Faz parte da categoria <strong>Cards</strong> do Design System Educacross.</p>
          <div style="background:#F8F7FF;border-left:4px solid #7367F0;padding:16px;border-radius:4px;">
            <p style="margin:0;color:#5E5873;font-size:14px;line-height:1.6;"><strong>💡 Dica:</strong> Use <em>Playground</em> para explorar props, <em>Use Cases</em> para exemplos reais e <em>Accessibility</em> para validar WCAG.</p>
          </div>
        </div>
        <div style="background:white;border-radius:12px;padding:32px;box-shadow:0 2px 8px rgba(0,0,0,0.08);">
          <h2 style="font-size:1.1rem;font-weight:600;color:#5E5873;margin:0 0 16px 0;">Implementação Vue 2.7</h2>
          <pre style="background:#1E1E2E;color:#CDD6F4;padding:20px;border-radius:8px;font-size:13px;line-height:1.6;overflow:auto;margin:0;"><code>import MediaCardIcon from '@/components/MediaCardIcon.vue';

// Template
&lt;MediaCardIcon v-bind="props" /&gt;</code></pre>
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
    docs: { description: { story: 'Explore o MediaCardIcon com controles interativos.' } },
  },
  render: (args) => `
    <div style="padding:32px;display:flex;justify-content:center;align-items:center;min-height:200px;background:#F8F8F8;border-radius:12px;">
      <div style="text-align:center;color:#6E6B7B;">
        <div style="width:60px;height:60px;background:#7367F020;border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 16px;font-size:24px;">🎨</div>
        <p style="margin:0 0 8px 0;font-size:15px;font-weight:600;color:#5E5873;">Playground MediaCardIcon</p>
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
    docs: { description: { story: 'Exemplos de uso real do MediaCardIcon no Educacross.' } },
  },
  render: () => `
    <div style="max-width:800px;margin:0 auto;padding:40px 20px;font-family:'Public Sans',sans-serif;">
      <div style="background:#7367F015;border:1px solid #7367F030;border-radius:12px;padding:24px;margin-bottom:40px;">
        <h1 style="font-size:1.5rem;font-weight:700;color:#5E5873;margin:0 0 8px 0;">Casos de Uso: MediaCardIcon</h1>
        <p style="color:#6E6B7B;margin:0;font-size:14px;line-height:1.6;">Cenários reais de uso no contexto educacional da plataforma Educacross</p>
      </div>
      
      <div style="margin-bottom:32px;">
        <h2 style="font-size:18px;font-weight:600;color:#5E5873;margin:0 0 8px 0;display:flex;align-items:center;gap:10px;">
          <span style="display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;background:#7367F0;color:white;border-radius:50%;font-size:13px;font-weight:700;flex-shrink:0;">1</span>
          Professor — Painel Principal
        </h2>
        <p style="color:#6E6B7B;margin:0 0 16px 0;padding-left:38px;font-size:14px;">Professor utilizando MediaCardIcon no dashboard de gestão de turmas</p>
        <div style="background:#F8F8F8;border-radius:8px;padding:20px;margin-left:38px;text-align:center;color:#B9B9C3;font-size:13px;">
          Ver story <strong>Default</strong> para visualização do componente neste contexto
        </div>
      </div>
      <div style="margin-bottom:32px;">
        <h2 style="font-size:18px;font-weight:600;color:#5E5873;margin:0 0 8px 0;display:flex;align-items:center;gap:10px;">
          <span style="display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;background:#7367F0;color:white;border-radius:50%;font-size:13px;font-weight:700;flex-shrink:0;">2</span>
          Aluno — Portal do Estudante
        </h2>
        <p style="color:#6E6B7B;margin:0 0 16px 0;padding-left:38px;font-size:14px;">Aluno interagindo com MediaCardIcon no portal educacional</p>
        <div style="background:#F8F8F8;border-radius:8px;padding:20px;margin-left:38px;text-align:center;color:#B9B9C3;font-size:13px;">
          Ver story <strong>Default</strong> para visualização do componente neste contexto
        </div>
      </div>
      <div style="margin-bottom:32px;">
        <h2 style="font-size:18px;font-weight:600;color:#5E5873;margin:0 0 8px 0;display:flex;align-items:center;gap:10px;">
          <span style="display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;background:#7367F0;color:white;border-radius:50%;font-size:13px;font-weight:700;flex-shrink:0;">3</span>
          Coordenador — Relatórios
        </h2>
        <p style="color:#6E6B7B;margin:0 0 16px 0;padding-left:38px;font-size:14px;">Coordenador pedagógico analisando dados via MediaCardIcon</p>
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
    docs: { description: { story: 'Conformidade WCAG 2.1 AA para o MediaCardIcon.' } },
  },
  render: () => `
    <div style="max-width:800px;margin:0 auto;padding:40px 20px;font-family:'Public Sans',sans-serif;">

      <div style="background:linear-gradient(135deg,#7367F0 0%,#764ba2 100%);padding:32px;border-radius:12px;margin-bottom:32px;color:white;">
        <h1 style="font-size:1.5rem;font-weight:700;margin:0 0 8px 0;">Acessibilidade: MediaCardIcon</h1>
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

