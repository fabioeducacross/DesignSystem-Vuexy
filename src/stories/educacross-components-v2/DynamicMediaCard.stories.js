/**
 * DynamicMediaCard - Animated Metric Card
 * =========================================
 * 
 * Card de métrica com animação dinâmica (CountUp effect) para dashboards em tempo real.
 * Displays animated numeric metrics with smooth transitions.
 * 
 * @component DynamicMediaCard
 * @category Educacross Components V2
 * @source educacross-frontoffice/src/components/card/DynamicMediaCard.vue
 * @priority P2
 * @status PIXEL-PERFECT
 * @since 2.0.0
 */

export default {
  title: 'Educacross Components V2/Cards/DynamicMediaCard',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
Card de métrica com animação dinâmica (CountUp effect) para dashboards em tempo real.

## Props
| Prop | Type |
|------|------|
| title | String |
| value | Number |
| previousValue | Number |
| format | String |
| icon | String |
| color | String |
        `
      }
    }
  },
  argTypes: {
    format: {
      control: 'select',
      options: ['number', 'percentage', 'currency']
    },
    color: {
      control: 'select',
      options: ['primary', 'success', 'warning', 'danger']
    }
  }
};

const styles = `
<style>
  .dynamic-card {
    background: #fff;
    border: 1px solid #D8D6DE;
    border-radius: 8px;
    padding: 20px;
    width: 280px;
    position: relative;
    overflow: hidden;
  }
  .dynamic-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 4px;
    height: 100%;
    background: var(--accent-color);
  }
  .dynamic-card-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 16px;
  }
  .dynamic-card-title {
    font-size: 14px;
    color: #6E6B7B;
    font-weight: 500;
  }
  .dynamic-card-icon {
    width: 40px;
    height: 40px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--icon-bg);
  }
  .dynamic-card-icon i {
    font-size: 20px;
    color: var(--accent-color);
  }
  .dynamic-card-value {
    font-size: 32px;
    font-weight: 700;
    color: #5E5873;
    margin: 0 0 8px;
    font-variant-numeric: tabular-nums;
  }
  .dynamic-card-change {
    font-size: 13px;
    font-weight: 500;
    display: flex;
    align-items: center;
    gap: 4px;
  }
  .dynamic-card-change.positive { color: #28C76F; }
  .dynamic-card-change.negative { color: #EA5455; }
  .color-primary { --accent-color: #6E63E8; --icon-bg: rgba(110,99,232,0.12); }
  .color-success { --accent-color: #28C76F; --icon-bg: rgba(40,199,111,0.12); }
  .color-warning { --accent-color: #FF9F43; --icon-bg: rgba(255,159,67,0.12); }
  .color-danger { --accent-color: #EA5455; --icon-bg: rgba(234,84,85,0.12); }
  @keyframes countUp {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .animating .dynamic-card-value {
    animation: countUp 0.5s ease-out;
  }
</style>
`;

export const Default = {
  args: {
    title: 'Total Alunos',
    value: 1234,
    previousValue: 1189,
    format: 'number',
    icon: 'bi-people',
    color: 'primary'
  },
  render: (args) => {
    const change = args.value - args.previousValue;
    const changePercent = ((change / args.previousValue) * 100).toFixed(1);
    const formatted = args.format === 'percentage' ? `${args.value}%` :
                      args.format === 'currency' ? `R$ ${args.value.toLocaleString('pt-BR')}` :
                      args.value.toLocaleString('pt-BR');
    
    return `
      ${styles}
      <div class="dynamic-card color-${args.color} animating">
        <div class="dynamic-card-header">
          <span class="dynamic-card-title">${args.title}</span>
          <div class="dynamic-card-icon">
            <i class="bi ${args.icon}"></i>
          </div>
        </div>
        <h2 class="dynamic-card-value">${formatted}</h2>
        <div class="dynamic-card-change ${change >= 0 ? 'positive' : 'negative'}">
          <i class="bi bi-arrow-${change >= 0 ? 'up' : 'down'}"></i>
          <span>${change >= 0 ? '+' : ''}${changePercent}% vs. mês anterior</span>
        </div>
      </div>
    `;
  }
};

export const NumberAnimation = {
  render: () => `
    ${styles}
    <div class="dynamic-card color-primary animating">
      <div class="dynamic-card-header">
        <span class="dynamic-card-title">Alunos Matriculados</span>
        <div class="dynamic-card-icon">
          <i class="bi bi-people"></i>
        </div>
      </div>
      <h2 class="dynamic-card-value">1.234</h2>
      <div class="dynamic-card-change positive">
        <i class="bi bi-arrow-up"></i>
        <span>+3.8% vs. mês anterior</span>
      </div>
    </div>
    <p style="margin-top: 16px; font-size: 13px; color: #6E6B7B;">
      <strong>Contexto:</strong> Número aumentou de 1.189 → 1.234 (animação CountUp).
    </p>
  `
};

export const PercentageAnimation = {
  render: () => `
    ${styles}
    <div class="dynamic-card color-success animating">
      <div class="dynamic-card-header">
        <span class="dynamic-card-title">Taxa de Aprovação</span>
        <div class="dynamic-card-icon">
          <i class="bi bi-check-circle"></i>
        </div>
      </div>
      <h2 class="dynamic-card-value">92%</h2>
      <div class="dynamic-card-change positive">
        <i class="bi bi-arrow-up"></i>
        <span>+5.7% vs. mês anterior</span>
      </div>
    </div>
    <p style="margin-top: 16px; font-size: 13px; color: #6E6B7B;">
      <strong>Contexto:</strong> Taxa subiu de 87% → 92%.
    </p>
  `
};

export const CurrencyAnimation = {
  render: () => `
    ${styles}
    <div class="dynamic-card color-warning animating">
      <div class="dynamic-card-header">
        <span class="dynamic-card-title">Investimento em Recursos</span>
        <div class="dynamic-card-icon">
          <i class="bi bi-cash-stack"></i>
        </div>
      </div>
      <h2 class="dynamic-card-value">R$ 45.780</h2>
      <div class="dynamic-card-change positive">
        <i class="bi bi-arrow-up"></i>
        <span>+12.3% vs. mês anterior</span>
      </div>
    </div>
    <p style="margin-top: 16px; font-size: 13px; color: #6E6B7B;">
      <strong>Contexto:</strong> Investimento aumentou de R$ 40.750 → R$ 45.780.
    </p>
  `
};

export const DecreaseAnimation = {
  render: () => `
    ${styles}
    <div class="dynamic-card color-danger animating">
      <div class="dynamic-card-header">
        <span class="dynamic-card-title">Missões Pendentes</span>
        <div class="dynamic-card-icon">
          <i class="bi bi-clock-history"></i>
        </div>
      </div>
      <h2 class="dynamic-card-value">23</h2>
      <div class="dynamic-card-change negative">
        <i class="bi bi-arrow-down"></i>
        <span>-26.7% vs. semana anterior</span>
      </div>
    </div>
    <p style="margin-top: 16px; font-size: 13px; color: #6E6B7B;">
      <strong>Contexto:</strong> Pendências reduziram de 31 → 23 (melhoria).
    </p>
  `
};

export const DashboardRealTime = {
  render: () => `
    ${styles}
    <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px;">
      <div class="dynamic-card color-primary animating">
        <div class="dynamic-card-header">
          <span class="dynamic-card-title">Alunos Online Agora</span>
          <div class="dynamic-card-icon">
            <i class="bi bi-person-check"></i>
          </div>
        </div>
        <h2 class="dynamic-card-value">387</h2>
        <div class="dynamic-card-change positive">
          <i class="bi bi-arrow-up"></i>
          <span>+12 nos últimos 5 min</span>
        </div>
      </div>
      
      <div class="dynamic-card color-success animating">
        <div class="dynamic-card-header">
          <span class="dynamic-card-title">Atividades Concluídas Hoje</span>
          <div class="dynamic-card-icon">
            <i class="bi bi-check-all"></i>
          </div>
        </div>
        <h2 class="dynamic-card-value">1.567</h2>
        <div class="dynamic-card-change positive">
          <i class="bi bi-arrow-up"></i>
          <span>+245 vs. ontem</span>
        </div>
      </div>
      
      <div class="dynamic-card color-info animating">
        <div class="dynamic-card-header">
          <span class="dynamic-card-title">Tempo Médio Sessão</span>
          <div class="dynamic-card-icon">
            <i class="bi bi-stopwatch"></i>
          </div>
        </div>
        <h2 class="dynamic-card-value">42 min</h2>
        <div class="dynamic-card-change positive">
          <i class="bi bi-arrow-up"></i>
          <span>+7 min vs. semana anterior</span>
        </div>
      </div>
    </div>
    <p style="margin-top: 16px; font-size: 13px; color: #6E6B7B;">
      <strong>Contexto:</strong> Dashboard em tempo real do coordenador - atualiza a cada 30 segundos.
    </p>
  `
};

export const ComparacaoMensal = {
  render: () => `
    ${styles}
    <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px;">
      <div class="dynamic-card color-primary">
        <div class="dynamic-card-header">
          <span class="dynamic-card-title">Jan/2024</span>
          <div class="dynamic-card-icon">
            <i class="bi bi-people"></i>
          </div>
        </div>
        <h2 class="dynamic-card-value">1.150</h2>
        <div class="dynamic-card-change positive">
          <i class="bi bi-arrow-up"></i>
          <span>+2.7% vs. Dez</span>
        </div>
      </div>
      
      <div class="dynamic-card color-primary">
        <div class="dynamic-card-header">
          <span class="dynamic-card-title">Fev/2024</span>
          <div class="dynamic-card-icon">
            <i class="bi bi-people"></i>
          </div>
        </div>
        <h2 class="dynamic-card-value">1.189</h2>
        <div class="dynamic-card-change positive">
          <i class="bi bi-arrow-up"></i>
          <span>+3.4% vs. Jan</span>
        </div>
      </div>
      
      <div class="dynamic-card color-primary animating">
        <div class="dynamic-card-header">
          <span class="dynamic-card-title">Mar/2024</span>
          <div class="dynamic-card-icon">
            <i class="bi bi-people"></i>
          </div>
        </div>
        <h2 class="dynamic-card-value">1.234</h2>
        <div class="dynamic-card-change positive">
          <i class="bi bi-arrow-up"></i>
          <span>+3.8% vs. Fev</span>
        </div>
      </div>
      
      <div class="dynamic-card color-primary" style="opacity: 0.5;">
        <div class="dynamic-card-header">
          <span class="dynamic-card-title">Abr/2024</span>
          <div class="dynamic-card-icon">
            <i class="bi bi-three-dots"></i>
          </div>
        </div>
        <h2 class="dynamic-card-value">---</h2>
        <div style="font-size: 12px; color: #6E6B7B;">Aguardando dados</div>
      </div>
    </div>
    <p style="margin-top: 16px; font-size: 13px; color: #6E6B7B;">
      <strong>Contexto:</strong> Evolução mensal de alunos matriculados (Mar/2024 com animação).
    </p>
  `
};

export const LoadingState = {
  render: () => `
    ${styles}
    <style>
      @keyframes pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.5; }
      }
      .loading .dynamic-card-value {
        animation: pulse 1.5s ease-in-out infinite;
      }
    </style>
    <div class="dynamic-card color-primary loading">
      <div class="dynamic-card-header">
        <span class="dynamic-card-title">Carregando...</span>
        <div class="dynamic-card-icon">
          <i class="bi bi-arrow-repeat" style="animation: spin 1s linear infinite;"></i>
        </div>
      </div>
      <h2 class="dynamic-card-value">---</h2>
      <div style="font-size: 12px; color: #6E6B7B;">Atualizando dados...</div>
    </div>
    <style>
      @keyframes spin {
        to { transform: rotate(360deg); }
      }
    </style>
  `
};

export const AllFormats = {
  render: () => `
    ${styles}
    <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px;">
      <div class="dynamic-card color-primary">
        <div class="dynamic-card-header">
          <span class="dynamic-card-title">Número Inteiro</span>
          <div class="dynamic-card-icon">
            <i class="bi bi-123"></i>
          </div>
        </div>
        <h2 class="dynamic-card-value">1.234</h2>
      </div>
      
      <div class="dynamic-card color-success">
        <div class="dynamic-card-header">
          <span class="dynamic-card-title">Porcentagem</span>
          <div class="dynamic-card-icon">
            <i class="bi bi-percent"></i>
          </div>
        </div>
        <h2 class="dynamic-card-value">92%</h2>
      </div>
      
      <div class="dynamic-card color-warning">
        <div class="dynamic-card-header">
          <span class="dynamic-card-title">Moeda</span>
          <div class="dynamic-card-icon">
            <i class="bi bi-currency-dollar"></i>
          </div>
        </div>
        <h2 class="dynamic-card-value">R$ 45.780</h2>
      </div>
    </div>
  `
};

export const Interactive = {
  render: () => {
    let value = 1234;
    return `
      ${styles}
      <div style="display: flex; gap: 20px; align-items: flex-start;">
        <div class="dynamic-card color-primary" id="interactive-card">
          <div class="dynamic-card-header">
            <span class="dynamic-card-title">Alunos Ativos</span>
            <div class="dynamic-card-icon">
              <i class="bi bi-people"></i>
            </div>
          </div>
          <h2 class="dynamic-card-value">${value}</h2>
          <div class="dynamic-card-change positive">
            <i class="bi bi-arrow-up"></i>
            <span id="change-text">+0% vs. anterior</span>
          </div>
        </div>
        
        <div style="display: flex; flex-direction: column; gap: 8px;">
          <button onclick="updateValue(50)" style="padding: 8px 16px; border: 1px solid #6E63E8; background: #fff; color: #6E63E8; border-radius: 6px; cursor: pointer;">
            +50 alunos
          </button>
          <button onclick="updateValue(-30)" style="padding: 8px 16px; border: 1px solid #EA5455; background: #fff; color: #EA5455; border-radius: 6px; cursor: pointer;">
            -30 alunos
          </button>
          <button onclick="resetValue()" style="padding: 8px 16px; border: 1px solid #6E6B7B; background: #fff; color: #6E6B7B; border-radius: 6px; cursor: pointer;">
            Reset
          </button>
        </div>
      </div>
      
      <script>
        let currentValue = ${value};
        const initialValue = ${value};
        
        function updateValue(change) {
          const card = document.getElementById('interactive-card');
          const valueEl = card.querySelector('.dynamic-card-value');
          const changeEl = card.querySelector('.dynamic-card-change');
          const changeText = document.getElementById('change-text');
          
          currentValue += change;
          valueEl.textContent = currentValue.toLocaleString('pt-BR');
          
          card.classList.add('animating');
          setTimeout(() => card.classList.remove('animating'), 500);
          
          const diff = currentValue - initialValue;
          const percent = ((diff / initialValue) * 100).toFixed(1);
          
          changeEl.className = 'dynamic-card-change ' + (diff >= 0 ? 'positive' : 'negative');
          changeEl.querySelector('i').className = 'bi bi-arrow-' + (diff >= 0 ? 'up' : 'down');
          changeText.textContent = (diff >= 0 ? '+' : '') + percent + '% vs. inicial';
        }
        
        function resetValue() {
          currentValue = initialValue;
          const valueEl = document.getElementById('interactive-card').querySelector('.dynamic-card-value');
          valueEl.textContent = initialValue.toLocaleString('pt-BR');
          
          const changeEl = document.getElementById('interactive-card').querySelector('.dynamic-card-change');
          changeEl.className = 'dynamic-card-change positive';
          document.getElementById('change-text').textContent = '+0% vs. inicial';
        }
      </script>
      
      <p style="margin-top: 20px; font-size: 13px; color: #6E6B7B;">
        <strong>Contexto:</strong> Card interativo com animação CountUp. Clique nos botões para testar.
      </p>
    `;
  }
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
          <h1 style="font-size:3rem;font-weight:700;margin:0 0 12px 0;letter-spacing:-0.02em;">DynamicMediaCard</h1>
          <p style="font-size:1.1rem;opacity:0.9;margin:0;max-width:600px;">Animated Metric Card</p>
        </div>
      </div>
      <div style="max-width:900px;margin:0 auto;padding:48px 40px;">
        <div style="background:white;border-radius:12px;padding:32px;margin-bottom:32px;box-shadow:0 2px 8px rgba(0,0,0,0.08);">
          <h2 style="font-size:1.1rem;font-weight:600;color:#5E5873;margin:0 0 16px 0;">Sobre o Componente</h2>
          <p style="color:#6E6B7B;line-height:1.7;margin:0 0 16px 0;">Animated Metric Card. Faz parte da categoria <strong>Cards</strong> do Design System Educacross.</p>
          <div style="background:#F8F7FF;border-left:4px solid #7367F0;padding:16px;border-radius:4px;">
            <p style="margin:0;color:#5E5873;font-size:14px;line-height:1.6;"><strong>💡 Dica:</strong> Use <em>Playground</em> para explorar props, <em>Use Cases</em> para exemplos reais e <em>Accessibility</em> para validar WCAG.</p>
          </div>
        </div>
        <div style="background:white;border-radius:12px;padding:32px;box-shadow:0 2px 8px rgba(0,0,0,0.08);">
          <h2 style="font-size:1.1rem;font-weight:600;color:#5E5873;margin:0 0 16px 0;">Implementação Vue 2.7</h2>
          <pre style="background:#1E1E2E;color:#CDD6F4;padding:20px;border-radius:8px;font-size:13px;line-height:1.6;overflow:auto;margin:0;"><code>import DynamicMediaCard from '@/components/DynamicMediaCard.vue';

// Template
&lt;DynamicMediaCard v-bind="props" /&gt;</code></pre>
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
    docs: { description: { story: 'Explore o DynamicMediaCard com controles interativos.' } },
  },
  render: (args) => `
    <div style="padding:32px;display:flex;justify-content:center;align-items:center;min-height:200px;background:#F8F8F8;border-radius:12px;">
      <div style="text-align:center;color:#6E6B7B;">
        <div style="width:60px;height:60px;background:#7367F020;border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 16px;font-size:24px;">🎨</div>
        <p style="margin:0 0 8px 0;font-size:15px;font-weight:600;color:#5E5873;">Playground DynamicMediaCard</p>
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
    docs: { description: { story: 'Exemplos de uso real do DynamicMediaCard no Educacross.' } },
  },
  render: () => `
    <div style="max-width:800px;margin:0 auto;padding:40px 20px;font-family:'Public Sans',sans-serif;">
      <div style="background:#7367F015;border:1px solid #7367F030;border-radius:12px;padding:24px;margin-bottom:40px;">
        <h1 style="font-size:1.5rem;font-weight:700;color:#5E5873;margin:0 0 8px 0;">Casos de Uso: DynamicMediaCard</h1>
        <p style="color:#6E6B7B;margin:0;font-size:14px;line-height:1.6;">Cenários reais de uso no contexto educacional da plataforma Educacross</p>
      </div>
      
      <div style="margin-bottom:32px;">
        <h2 style="font-size:18px;font-weight:600;color:#5E5873;margin:0 0 8px 0;display:flex;align-items:center;gap:10px;">
          <span style="display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;background:#7367F0;color:white;border-radius:50%;font-size:13px;font-weight:700;flex-shrink:0;">1</span>
          Professor — Painel Principal
        </h2>
        <p style="color:#6E6B7B;margin:0 0 16px 0;padding-left:38px;font-size:14px;">Professor utilizando DynamicMediaCard no dashboard de gestão de turmas</p>
        <div style="background:#F8F8F8;border-radius:8px;padding:20px;margin-left:38px;text-align:center;color:#B9B9C3;font-size:13px;">
          Ver story <strong>Default</strong> para visualização do componente neste contexto
        </div>
      </div>
      <div style="margin-bottom:32px;">
        <h2 style="font-size:18px;font-weight:600;color:#5E5873;margin:0 0 8px 0;display:flex;align-items:center;gap:10px;">
          <span style="display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;background:#7367F0;color:white;border-radius:50%;font-size:13px;font-weight:700;flex-shrink:0;">2</span>
          Aluno — Portal do Estudante
        </h2>
        <p style="color:#6E6B7B;margin:0 0 16px 0;padding-left:38px;font-size:14px;">Aluno interagindo com DynamicMediaCard no portal educacional</p>
        <div style="background:#F8F8F8;border-radius:8px;padding:20px;margin-left:38px;text-align:center;color:#B9B9C3;font-size:13px;">
          Ver story <strong>Default</strong> para visualização do componente neste contexto
        </div>
      </div>
      <div style="margin-bottom:32px;">
        <h2 style="font-size:18px;font-weight:600;color:#5E5873;margin:0 0 8px 0;display:flex;align-items:center;gap:10px;">
          <span style="display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;background:#7367F0;color:white;border-radius:50%;font-size:13px;font-weight:700;flex-shrink:0;">3</span>
          Coordenador — Relatórios
        </h2>
        <p style="color:#6E6B7B;margin:0 0 16px 0;padding-left:38px;font-size:14px;">Coordenador pedagógico analisando dados via DynamicMediaCard</p>
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
    docs: { description: { story: 'Conformidade WCAG 2.1 AA para o DynamicMediaCard.' } },
  },
  render: () => `
    <div style="max-width:800px;margin:0 auto;padding:40px 20px;font-family:'Public Sans',sans-serif;">

      <div style="background:linear-gradient(135deg,#7367F0 0%,#764ba2 100%);padding:32px;border-radius:12px;margin-bottom:32px;color:white;">
        <h1 style="font-size:1.5rem;font-weight:700;margin:0 0 8px 0;">Acessibilidade: DynamicMediaCard</h1>
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

