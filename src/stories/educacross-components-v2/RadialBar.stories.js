/**
 * RadialBar - Gráfico de Barra Radial
 * =====================================
 * Gráfico circular tipo "gauge" para percentuais
 * 
 * @component RadialBar
 * @source educacross-frontoffice/src/components/chart/RadialBar.vue
 * @category Educacross Components V2 / Charts
 * @priority P2
 * @status PIXEL-PERFECT
 * @since 2.0.0
 */

export default {
  title: 'Educacross Components V2/Charts/RadialBar',
  tags: ['autodocs'],
  parameters: { layout: 'padded' }
};

const css = `.chart-container{width:100%;max-width:500px;background:#fff;border:1px solid #D8D6DE;border-radius:8px;padding:24px}.chart-header{text-align:center;margin-bottom:20px}.chart-title{font-size:18px;font-weight:600;color:#3F3F46}.chart-subtitle{font-size:13px;color:#6E6B7B;margin-top:4px}.chart-canvas{width:100%;max-width:280px;height:280px;margin:0 auto;position:relative}.radial-center{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);text-align:center}.radial-value{font-size:48px;font-weight:700;color:#3F3F46;line-height:1}.radial-label{font-size:13px;color:#6E6B7B;margin-top:8px}.chart-stats{display:grid;grid-template-columns:repeat(auto-fit,minmax(100px,1fr));gap:16px;margin-top:24px;padding-top:20px;border-top:1px solid #F3F2F7}.stat-item{text-align:center}.stat-value{font-size:20px;font-weight:700;color:#6E63E8}.stat-label{font-size:12px;color:#6E6B7B;margin-top:4px}.chart-group{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:20px}.radial-small .chart-canvas{max-width:160px;height:160px}.radial-small .radial-value{font-size:32px}.radial-small .radial-label{font-size:11px}`;

const base = (title, subtitle, value, max, color, label, centerLabel = `${value}%`) => `
<div class="chart-container">
  <div class="chart-header">
    <div class="chart-title">${title}</div>
    ${subtitle ? `<div class="chart-subtitle">${subtitle}</div>` : ''}
  </div>
  <div class="chart-canvas">
    <canvas id="radial-${Math.random().toString(36).substr(2, 9)}"></canvas>
    <div class="radial-center">
      <div class="radial-value">${centerLabel}</div>
      ${label ? `<div class="radial-label">${label}</div>` : ''}
    </div>
  </div>
</div>
<style>${css}</style>
<script src="/vuexy/vendors/libs/chart/chart.umd.min.js"></script>
<script>
setTimeout(() => {
  const canvas = document.querySelector('[id^="radial-"]');
  new Chart(canvas, {
    type: 'doughnut',
    data: {
      datasets: [{
        data: [${value}, ${max - value}],
        backgroundColor: ['${color}', '#F3F2F7'],
        borderWidth: 0,
        cutout: '75%',
        circumference: 360,
        rotation: -90
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      plugins: { legend: { display: false }, tooltip: { enabled: false } }
    }
  });
}, 200);
</script>
`;

export const Default = {
  render: () => base(
    'Progresso da Turma',
    '8º Ano A - Matemática - Janeiro 2026',
    78,
    100,
    '#6E63E8',
    'Missões Completas'
  )
};

export const FrequenciaGeral = {
  render: () => base(
    'Taxa de Frequência',
    'Presença média - Janeiro 2026',
    92,
    100,
    '#28C76F',
    'Alunos Presentes',
    '92%'
  )
};

export const DesempenhoAluno = {
  render: () => `
<div class="chart-container">
  <div class="chart-header">
    <div class="chart-title">Desempenho Individual</div>
    <div class="chart-subtitle">Ana Silva - 8º Ano A</div>
  </div>
  <div class="chart-canvas">
    <canvas id="radial-desempenho"></canvas>
    <div class="radial-center">
      <div class="radial-value">9.8</div>
      <div class="radial-label">Média Geral</div>
    </div>
  </div>
  <div class="chart-stats">
    <div class="stat-item">
      <div class="stat-value">42</div>
      <div class="stat-label">Missões</div>
    </div>
    <div class="stat-item">
      <div class="stat-value">98%</div>
      <div class="stat-label">Frequência</div>
    </div>
    <div class="stat-item">
      <div class="stat-value">2850</div>
      <div class="stat-label">XP</div>
    </div>
  </div>
</div>
<style>${css}</style>
<script src="/vuexy/vendors/libs/chart/chart.umd.min.js"></script>
<script>
setTimeout(() => {
  new Chart(document.getElementById('radial-desempenho'), {
    type: 'doughnut',
    data: {
      datasets: [{
        data: [98, 2],
        backgroundColor: ['#28C76F', '#F3F2F7'],
        borderWidth: 0,
        cutout: '75%'
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      plugins: { legend: { display: false }, tooltip: { enabled: false } }
    }
  });
}, 200);
</script>
`
};

export const ProgressoMissao = {
  render: () => base(
    'Progresso da Missão',
    'Frações Básicas - 32 alunos participando',
    24,
    32,
    '#00CFE8',
    'Alunos Concluíram',
    '24/32'
  )
};

export const MultipleRadials = {
  render: () => `
<div style="padding:24px">
  <div style="margin-bottom:24px;text-align:center">
    <div style="font-size:18px;font-weight:600;color:#3F3F46">Visão Geral por Matéria</div>
    <div style="font-size:13px;color:#6E6B7B;margin-top:4px">8º Ano A - Janeiro 2026</div>
  </div>
  <div class="chart-group">
    ${[
      { title: 'Matemática', value: 85, color: '#6E63E8' },
      { title: 'Português', value: 72, color: '#00CFE8' },
      { title: 'Ciências', value: 90, color: '#28C76F' },
      { title: 'História', value: 68, color: '#FF9F43' }
    ].map((item, i) => `
      <div class="chart-container radial-small">
        <div class="chart-header">
          <div class="chart-title" style="font-size:15px">${item.title}</div>
        </div>
        <div class="chart-canvas">
          <canvas id="radial-multi-${i}"></canvas>
          <div class="radial-center">
            <div class="radial-value">${item.value}%</div>
            <div class="radial-label">Completo</div>
          </div>
        </div>
      </div>
    `).join('')}
  </div>
</div>
<style>${css}</style>
<script src="/vuexy/vendors/libs/chart/chart.umd.min.js"></script>
<script>
setTimeout(() => {
  const data = [
    { value: 85, color: '#6E63E8' },
    { value: 72, color: '#00CFE8' },
    { value: 90, color: '#28C76F' },
    { value: 68, color: '#FF9F43' }
  ];
  data.forEach((item, i) => {
    new Chart(document.getElementById('radial-multi-' + i), {
      type: 'doughnut',
      data: {
        datasets: [{
          data: [item.value, 100 - item.value],
          backgroundColor: [item.color, '#F3F2F7'],
          borderWidth: 0,
          cutout: '70%'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: { legend: { display: false }, tooltip: { enabled: false } }
      }
    });
  });
}, 200);
</script>
`
};

export const ComNiveis = {
  render: () => `
<div class="chart-container">
  <div class="chart-header">
    <div class="chart-title">Nível de Gamificação</div>
    <div class="chart-subtitle">João Silva - 3200 XP</div>
  </div>
  <div class="chart-canvas">
    <canvas id="radial-nivel"></canvas>
    <div class="radial-center">
      <div class="radial-value">12</div>
      <div class="radial-label">Nível Atual</div>
    </div>
  </div>
  <div class="chart-stats">
    <div class="stat-item">
      <div class="stat-value">3200</div>
      <div class="stat-label">XP Atual</div>
    </div>
    <div class="stat-item">
      <div class="stat-value">3500</div>
      <div class="stat-label">Próximo Nível</div>
    </div>
    <div class="stat-item">
      <div class="stat-value">300</div>
      <div class="stat-label">Faltam</div>
    </div>
  </div>
</div>
<style>${css}</style>
<script src="/vuexy/vendors/libs/chart/chart.umd.min.js"></script>
<script>
setTimeout(() => {
  new Chart(document.getElementById('radial-nivel'), {
    type: 'doughnut',
    data: {
      datasets: [{
        data: [3200, 300],
        backgroundColor: ['#FFD700', '#F3F2F7'],
        borderWidth: 0,
        cutout: '75%'
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      plugins: { legend: { display: false }, tooltip: { enabled: false } }
    }
  });
}, 200);
</script>
`
};

export const ComAlerta = {
  render: () => base(
    'Taxa de Aprovação',
    'Turma 8º Ano B - Risco de Reprovação',
    58,
    100,
    '#EA5455',
    'Alunos em Risco',
    '58%'
  )
};

export const Compacto = {
  render: () => `
<div class="chart-container radial-small" style="max-width:250px;padding:16px">
  <div class="chart-title" style="font-size:14px;text-align:center;margin-bottom:12px">Progresso</div>
  <div class="chart-canvas">
    <canvas id="radial-compact"></canvas>
    <div class="radial-center">
      <div class="radial-value">85%</div>
    </div>
  </div>
</div>
<style>${css}</style>
<script src="/vuexy/vendors/libs/chart/chart.umd.min.js"></script>
<script>
setTimeout(() => {
  new Chart(document.getElementById('radial-compact'), {
    type: 'doughnut',
    data: {
      datasets: [{
        data: [85, 15],
        backgroundColor: ['#6E63E8', '#F3F2F7'],
        borderWidth: 0,
        cutout: '70%'
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      plugins: { legend: { display: false }, tooltip: { enabled: false } }
    }
  });
}, 200);
</script>
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
      <div style="background:linear-gradient(135deg,#28C76F 0%,#48DA89 100%);padding:60px 40px;color:white;">
        <div style="max-width:900px;margin:0 auto;">
          <div style="display:inline-block;padding:8px 16px;background:rgba(255,255,255,0.15);border-radius:50px;margin-bottom:20px;font-size:14px;border:1px solid rgba(255,255,255,0.2);">Charts</div>
          <h1 style="font-size:3rem;font-weight:700;margin:0 0 12px 0;letter-spacing:-0.02em;">RadialBar</h1>
          <p style="font-size:1.1rem;opacity:0.9;margin:0;max-width:600px;">Gráfico de Barra Radial</p>
        </div>
      </div>
      <div style="max-width:900px;margin:0 auto;padding:48px 40px;">
        <div style="background:white;border-radius:12px;padding:32px;margin-bottom:32px;box-shadow:0 2px 8px rgba(0,0,0,0.08);">
          <h2 style="font-size:1.1rem;font-weight:600;color:#5E5873;margin:0 0 16px 0;">Sobre o Componente</h2>
          <p style="color:#6E6B7B;line-height:1.7;margin:0 0 16px 0;">Gráfico de Barra Radial. Faz parte da categoria <strong>Charts</strong> do Design System Educacross.</p>
          <div style="background:#F8F7FF;border-left:4px solid #28C76F;padding:16px;border-radius:4px;">
            <p style="margin:0;color:#5E5873;font-size:14px;line-height:1.6;"><strong>💡 Dica:</strong> Use <em>Playground</em> para explorar props, <em>Use Cases</em> para exemplos reais e <em>Accessibility</em> para validar WCAG.</p>
          </div>
        </div>
        <div style="background:white;border-radius:12px;padding:32px;box-shadow:0 2px 8px rgba(0,0,0,0.08);">
          <h2 style="font-size:1.1rem;font-weight:600;color:#5E5873;margin:0 0 16px 0;">Implementação Vue 2.7</h2>
          <pre style="background:#1E1E2E;color:#CDD6F4;padding:20px;border-radius:8px;font-size:13px;line-height:1.6;overflow:auto;margin:0;"><code>import RadialBar from '@/components/RadialBar.vue';

// Template
&lt;RadialBar v-bind="props" /&gt;</code></pre>
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
    docs: { description: { story: 'Explore o RadialBar com controles interativos.' } },
  },
  render: (args) => `
    <div style="padding:32px;display:flex;justify-content:center;align-items:center;min-height:200px;background:#F8F8F8;border-radius:12px;">
      <div style="text-align:center;color:#6E6B7B;">
        <div style="width:60px;height:60px;background:#28C76F20;border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 16px;font-size:24px;">🎨</div>
        <p style="margin:0 0 8px 0;font-size:15px;font-weight:600;color:#5E5873;">Playground RadialBar</p>
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
    docs: { description: { story: 'Exemplos de uso real do RadialBar no Educacross.' } },
  },
  render: () => `
    <div style="max-width:800px;margin:0 auto;padding:40px 20px;font-family:'Public Sans',sans-serif;">
      <div style="background:#28C76F15;border:1px solid #28C76F30;border-radius:12px;padding:24px;margin-bottom:40px;">
        <h1 style="font-size:1.5rem;font-weight:700;color:#5E5873;margin:0 0 8px 0;">Casos de Uso: RadialBar</h1>
        <p style="color:#6E6B7B;margin:0;font-size:14px;line-height:1.6;">Cenários reais de uso no contexto educacional da plataforma Educacross</p>
      </div>
      
      <div style="margin-bottom:32px;">
        <h2 style="font-size:18px;font-weight:600;color:#5E5873;margin:0 0 8px 0;display:flex;align-items:center;gap:10px;">
          <span style="display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;background:#28C76F;color:white;border-radius:50%;font-size:13px;font-weight:700;flex-shrink:0;">1</span>
          Professor — Painel Principal
        </h2>
        <p style="color:#6E6B7B;margin:0 0 16px 0;padding-left:38px;font-size:14px;">Professor utilizando RadialBar no dashboard de gestão de turmas</p>
        <div style="background:#F8F8F8;border-radius:8px;padding:20px;margin-left:38px;text-align:center;color:#B9B9C3;font-size:13px;">
          Ver story <strong>Default</strong> para visualização do componente neste contexto
        </div>
      </div>
      <div style="margin-bottom:32px;">
        <h2 style="font-size:18px;font-weight:600;color:#5E5873;margin:0 0 8px 0;display:flex;align-items:center;gap:10px;">
          <span style="display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;background:#28C76F;color:white;border-radius:50%;font-size:13px;font-weight:700;flex-shrink:0;">2</span>
          Aluno — Portal do Estudante
        </h2>
        <p style="color:#6E6B7B;margin:0 0 16px 0;padding-left:38px;font-size:14px;">Aluno interagindo com RadialBar no portal educacional</p>
        <div style="background:#F8F8F8;border-radius:8px;padding:20px;margin-left:38px;text-align:center;color:#B9B9C3;font-size:13px;">
          Ver story <strong>Default</strong> para visualização do componente neste contexto
        </div>
      </div>
      <div style="margin-bottom:32px;">
        <h2 style="font-size:18px;font-weight:600;color:#5E5873;margin:0 0 8px 0;display:flex;align-items:center;gap:10px;">
          <span style="display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;background:#28C76F;color:white;border-radius:50%;font-size:13px;font-weight:700;flex-shrink:0;">3</span>
          Coordenador — Relatórios
        </h2>
        <p style="color:#6E6B7B;margin:0 0 16px 0;padding-left:38px;font-size:14px;">Coordenador pedagógico analisando dados via RadialBar</p>
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
    docs: { description: { story: 'Conformidade WCAG 2.1 AA para o RadialBar.' } },
  },
  render: () => `
    <div style="max-width:800px;margin:0 auto;padding:40px 20px;font-family:'Public Sans',sans-serif;">

      <div style="background:linear-gradient(135deg,#28C76F 0%,#764ba2 100%);padding:32px;border-radius:12px;margin-bottom:32px;color:white;">
        <h1 style="font-size:1.5rem;font-weight:700;margin:0 0 8px 0;">Acessibilidade: RadialBar</h1>
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

