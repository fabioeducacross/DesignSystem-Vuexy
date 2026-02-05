/**
 * DynamicMediaCard - Animated Metric Card
 */

export default {
  title: 'Front-office/Cards/DynamicMediaCard',
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
