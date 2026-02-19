/**
 * PerformancePDF - Relatório de Desempenho em PDF
 * ================================================
 * Template de PDF para relatórios de desempenho de alunos/turmas
 * 
 * @component PerformancePDF
 * @category Educacross Components V2 / PDF
 * @source educacross-frontoffice/src/components/PDFs/event/performance/PerformancePDF.vue
 * @priority P2
 * @status PIXEL-PERFECT
 * @since 2.0.0
 * @generated 2026-02-01T21:06:31.171182
 * 
 * Props: None
 * Slots: None
 * Emits: None
 */

export default {
  title: 'Educacross Components V2/PDF/PerformancePDF',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
## PerformancePDF

Componente extraído pixel-perfect do frontoffice Educacross.

### Props
- Nenhuma prop definida

### Slots
- Nenhum slot definido

### Events
- Nenhum evento definido
        `
      }
    }
  }
};

// Estilos inline do componente
const componentStyles = `

:root {
  --primary: #6e63e8;
  --primary-rgb: 110, 99, 232;
  --success: #28c76f;
  --success-rgb: 40, 199, 111;
  --danger: #ea5455;
  --danger-rgb: 234, 84, 85;
  --warning: #ff9f43;
  --warning-rgb: 255, 159, 67;
  --info: #00cfe8;
  --info-rgb: 0, 207, 232;
  --secondary: #6c757d;
  --secondary-rgb: 108, 117, 125;
  --light: #f8f9fa;
  --dark: #343a40;
  --legend-below-basic: #ea5455;
  --legend-basic: #ff9f43;
  --legend-proficient: #28c76f;
  --legend-advanced: #6e63e8;
  --border-color: #dbdade;
  --body-bg: #f8f7fa;
  --card-bg: #ffffff;
  --text-color: #5d596c;
  --heading-color: #5d596c;
}




.performance-report {
  position: relative;
  box-sizing: border-box;
  width: 713px !important;
  height: 1008px !important;
  background-image: url(@/assets/images/pdf/performance-record/background.svg);
  background-size: cover;
  background-repeat: no-repeat;
  color: #000;

  border: none;
  margin-left: auto;
  margin-right: auto;

  text-align: center;

  -webkit-print-color-adjust: exact;

  page-break-after: auto;
  page-break-inside: avoid;

  /* Print-specific styles */
  @media print {
    margin-left: 0;
    margin-right: 0;
  }
}

.title-container {
  position: absolute;
  top: 124px;
  width: 100%;

  display: flex;
  justify-content: center;
  flex-direction: column;

  h4 {
    color: inherit;
  }
}

.student-info-container {
  position: absolute;
  top: 179px;
  left: 93px;

  width: 527px;
  height: 60px;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  h3 {
    color: inherit;
  }
}

.awards-container {
  position: absolute;

  width: 445px;

  display: flex;
  justify-content: space-between;

  top: 368px;
  left: 135px;
}

.awards {
  position: absolute;
  top: 368px;
  width: 35.2px;
  height: fit-content;
  margin-bottom: 0;

  text-align: center;
  line-height: normal;
  color: white;
  font-weight: 700;

  // left items
  &:nth-of-type(1) {
    left: 143.87px;
  }

  &:nth-of-type(2) {
    left: 200.45px;
  }

  &:nth-of-type(3) {
    left: 255.62px;
  }

  //rigth items
  &:nth-of-type(4) {
    right: 252.52px;
  }

  &:nth-of-type(5) {
    right: 195.94px;
  }

  &:nth-of-type(6) {
    right: 140.77px;
  }
}

.points-container {
  position: absolute;

  top: 508px;
  left: 180px;
  width: 370px;

  display: grid;
  grid-template-columns: 89px 89px;
  justify-content: space-between;

  h6 {
    color: white;
    font-weight: 700;
  }
}

.themes-performance-container {
  position: absolute;
  top: 613px;
  left: 107.7px;

  width: 500px;
  height: 64px;

  display: flex;
  justify-content: center;
  align-items: flex-start;
  gap: 10px;

  margin-top: 10px;
}

.theme {
  width: 91.5px;

  text-align: center;
}

.theme-performance {
  background-color: #efefef;
  border-radius: 6px;

  width: 100%;
  height: 25px;

  display: grid;
  grid-template-columns: repeat(4, 1fr);
}

.theme-performance-point {
  width: 100%;
  height: 100%;

  border-radius: 6px;
}

.legend-container {
  position: absolute;
  top: 687px;
  left: 199px;
}

.footer-container {
  position: absolute;
  top: 903px;
  left: 77px;

  display: flex;
  justify-content: space-between;
  width: 560px;

  color: inherit;
}

.logo-container {
  position: absolute;
  top: 945px;

  width: 100%;

  display: flex;
  justify-content: center;

  img {
    max-width: 155px;
  }
}

.HTMLtoPdf {
  .performance-report {
    margin: 0;
  }

  .title-container {
    top: 115px;
  }

  .student-info-container {
    top: 170px;
  }

  .awards {
    top: 362px;
  }

  .points-container {
    top: 502px;
  }

  .themes-performance-container {
    top: 606px;
  }

  .legend-container {
    top: 678px;
  }

  .footer-container {
    top: 896px;
  }

  .footer-container {
    top: 894px;
  }
}
`;

// Template base
const baseTemplate = `
<div class="performance-report print-component" :data-fileName="student.studentName">
    <div class="title-container">
      <h4 class="mb-0 font-medium">Sample Text</h4>
      <span class="font-10">
        Sample Text a Sample Text
      </span>
    </div>
    <div class="student-info-container">
      <h3 class="mb-0 font-medium">Sample Text</h3>
      <span class="font-10">Sample Text • Sample Text</span>
    </div>
    <h6 class="awards">
      Sample Text
    </h6>
    <h6 class="awards">
      Sample Text
    </h6>
    <h6 class="awards">
      Sample Text
    </h6>
    <h6 class="awards">
      Sample Text
    </h6>
    <h6 class="awards">
      Sample Text
    </h6>
    <h6 class="awards">
      Sample Text
    </h6>
    <div class="points-container">
      <h6>Sample Text</h6>
      <h6>Sample Text</h6>
    </div>
    <div class="themes-performance-container">
      <div
        class="theme font-10"
      >
        <div class="theme-performance">
          <div
            class="theme-performance-point"
            class=""
          ></div>
        </div>
        <span class="text-black">Sample Text</span>
      </div>
    </div>
    <!-- <div class="legend-container">
      <div class="LegendEnumPDF" legends="" class="shadow-none" />
    </div> -->
    <div class="footer-container">
      <span class="font-12 font-semibold">@Sample Text</span>
      <span class="font-12 font-semibold">Sample Text</span>
    </div>
    <div class="logo-container">
      <b-img src="">logo</b-img>
    </div>
  </div>
`;

// Story: Default
export const Default = {
  render: () => `
    <style>${componentStyles}</style>
    ${baseTemplate}
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
      <div style="background:linear-gradient(135deg,#6E63E8 0%,#9C91EF 100%);padding:60px 40px;color:white;">
        <div style="max-width:900px;margin:0 auto;">
          <div style="display:inline-block;padding:8px 16px;background:rgba(255,255,255,0.15);border-radius:50px;margin-bottom:20px;font-size:14px;border:1px solid rgba(255,255,255,0.2);">PDF</div>
          <h1 style="font-size:3rem;font-weight:700;margin:0 0 12px 0;letter-spacing:-0.02em;">PerformancePDF</h1>
          <p style="font-size:1.1rem;opacity:0.9;margin:0;max-width:600px;">Relatório de Desempenho em PDF</p>
        </div>
      </div>
      <div style="max-width:900px;margin:0 auto;padding:48px 40px;">
        <div style="background:white;border-radius:12px;padding:32px;margin-bottom:32px;box-shadow:0 2px 8px rgba(0,0,0,0.08);">
          <h2 style="font-size:1.1rem;font-weight:600;color:#5E5873;margin:0 0 16px 0;">Sobre o Componente</h2>
          <p style="color:#6E6B7B;line-height:1.7;margin:0 0 16px 0;">Relatório de Desempenho em PDF. Faz parte da categoria <strong>PDF</strong> do Design System Educacross.</p>
          <div style="background:#F8F7FF;border-left:4px solid #6E63E8;padding:16px;border-radius:4px;">
            <p style="margin:0;color:#5E5873;font-size:14px;line-height:1.6;"><strong>💡 Dica:</strong> Use <em>Playground</em> para explorar props, <em>Use Cases</em> para exemplos reais e <em>Accessibility</em> para validar WCAG.</p>
          </div>
        </div>
        <div style="background:white;border-radius:12px;padding:32px;box-shadow:0 2px 8px rgba(0,0,0,0.08);">
          <h2 style="font-size:1.1rem;font-weight:600;color:#5E5873;margin:0 0 16px 0;">Implementação Vue 2.7</h2>
          <pre style="background:#1E1E2E;color:#CDD6F4;padding:20px;border-radius:8px;font-size:13px;line-height:1.6;overflow:auto;margin:0;"><code>import PerformancePDF from '@/components/PerformancePDF.vue';

// Template
&lt;PerformancePDF v-bind="props" /&gt;</code></pre>
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
    docs: { description: { story: 'Explore o PerformancePDF com controles interativos.' } },
  },
  render: (args) => `
    <div style="padding:32px;display:flex;justify-content:center;align-items:center;min-height:200px;background:#F8F8F8;border-radius:12px;">
      <div style="text-align:center;color:#6E6B7B;">
        <div style="width:60px;height:60px;background:#6E63E820;border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 16px;font-size:24px;">🎨</div>
        <p style="margin:0 0 8px 0;font-size:15px;font-weight:600;color:#5E5873;">Playground PerformancePDF</p>
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
    docs: { description: { story: 'Exemplos de uso real do PerformancePDF no Educacross.' } },
  },
  render: () => `
    <div style="max-width:800px;margin:0 auto;padding:40px 20px;font-family:'Public Sans',sans-serif;">
      <div style="background:#6E63E815;border:1px solid #6E63E830;border-radius:12px;padding:24px;margin-bottom:40px;">
        <h1 style="font-size:1.5rem;font-weight:700;color:#5E5873;margin:0 0 8px 0;">Casos de Uso: PerformancePDF</h1>
        <p style="color:#6E6B7B;margin:0;font-size:14px;line-height:1.6;">Cenários reais de uso no contexto educacional da plataforma Educacross</p>
      </div>
      
      <div style="margin-bottom:32px;">
        <h2 style="font-size:18px;font-weight:600;color:#5E5873;margin:0 0 8px 0;display:flex;align-items:center;gap:10px;">
          <span style="display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;background:#6E63E8;color:white;border-radius:50%;font-size:13px;font-weight:700;flex-shrink:0;">1</span>
          Professor — Painel Principal
        </h2>
        <p style="color:#6E6B7B;margin:0 0 16px 0;padding-left:38px;font-size:14px;">Professor utilizando PerformancePDF no dashboard de gestão de turmas</p>
        <div style="background:#F8F8F8;border-radius:8px;padding:20px;margin-left:38px;text-align:center;color:#B9B9C3;font-size:13px;">
          Ver story <strong>Default</strong> para visualização do componente neste contexto
        </div>
      </div>
      <div style="margin-bottom:32px;">
        <h2 style="font-size:18px;font-weight:600;color:#5E5873;margin:0 0 8px 0;display:flex;align-items:center;gap:10px;">
          <span style="display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;background:#6E63E8;color:white;border-radius:50%;font-size:13px;font-weight:700;flex-shrink:0;">2</span>
          Aluno — Portal do Estudante
        </h2>
        <p style="color:#6E6B7B;margin:0 0 16px 0;padding-left:38px;font-size:14px;">Aluno interagindo com PerformancePDF no portal educacional</p>
        <div style="background:#F8F8F8;border-radius:8px;padding:20px;margin-left:38px;text-align:center;color:#B9B9C3;font-size:13px;">
          Ver story <strong>Default</strong> para visualização do componente neste contexto
        </div>
      </div>
      <div style="margin-bottom:32px;">
        <h2 style="font-size:18px;font-weight:600;color:#5E5873;margin:0 0 8px 0;display:flex;align-items:center;gap:10px;">
          <span style="display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;background:#6E63E8;color:white;border-radius:50%;font-size:13px;font-weight:700;flex-shrink:0;">3</span>
          Coordenador — Relatórios
        </h2>
        <p style="color:#6E6B7B;margin:0 0 16px 0;padding-left:38px;font-size:14px;">Coordenador pedagógico analisando dados via PerformancePDF</p>
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
    docs: { description: { story: 'Conformidade WCAG 2.1 AA para o PerformancePDF.' } },
  },
  render: () => `
    <div style="max-width:800px;margin:0 auto;padding:40px 20px;font-family:'Public Sans',sans-serif;">

      <div style="background:linear-gradient(135deg,#6E63E8 0%,#764ba2 100%);padding:32px;border-radius:12px;margin-bottom:32px;color:white;">
        <h1 style="font-size:1.5rem;font-weight:700;margin:0 0 8px 0;">Acessibilidade: PerformancePDF</h1>
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

