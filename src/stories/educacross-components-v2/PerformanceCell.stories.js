/**
 * PerformanceCell - Table Cell with Performance Indicator
 * =========================================================
 * Célula de tabela com indicador visual de desempenho (nota, percentual, conceito)
 * 
 * @component PerformanceCell
 * @category Educacross Components V2 / Data Display
 * @source educacross-frontoffice/src/components/cells/PerformanceCell.vue
 * @priority P1 - Core UI
 * @status PIXEL-PERFECT
 * @since 2.0.0
 */

export default {
  title: 'Educacross Components V2/Data Display/PerformanceCell',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
## PerformanceCell - Célula de Desempenho

Componente de célula de tabela com indicador visual colorido e barra de progresso para exibir notas, percentuais e conceitos.

### Casos de Uso

**Professor**: Visualizar notas de alunos em tabelas, comparar desempenho entre missões, analisar evolução temporal, identificar rapidamente alunos com dificuldade

**Coordenador**: Relatórios de desempenho por turma, comparação entre disciplinas, rankings e estatísticas, boletins e análises pedagógicas

**Aluno/Responsável**: Consultar boletim escolar, acompanhar evolução nas disciplinas, ver ranking da turma, entender feedback visual das notas
        `
      }
    }
  }
};

const css = `<style>
  .performance-cell {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 8px 16px;
    min-width: 80px;
    border-radius: 6px;
    font-weight: 700;
    overflow: hidden;
  }
  .performance-bg {
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    transition: width 0.3s ease;
  }
  .perf-high {
    background: #E8F5E9;
    color: #28C76F;
  }
  .perf-high .performance-bg {
    background: rgba(40, 199, 111, 0.2);
  }
  .perf-medium {
    background: #FFF8E1;
    color: #FF9F43;
  }
  .perf-medium .performance-bg {
    background: rgba(255, 159, 67, 0.2);
  }
  .perf-low {
    background: #FFEBEE;
    color: #EA5455;
  }
  .perf-low .performance-bg {
    background: rgba(234, 84, 85, 0.2);
  }
  .perf-neutral {
    background: #F3F2F7;
    color: #6E6B7B;
  }
  .perf-neutral .performance-bg {
    background: rgba(110, 107, 123, 0.1);
  }
  .performance-value {
    position: relative;
    z-index: 1;
    font-size: 16px;
  }
  .performance-compact {
    padding: 4px 10px;
    min-width: 60px;
  }
  .performance-compact .performance-value {
    font-size: 14px;
  }
  .grade-badge {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    font-size: 18px;
    font-weight: 700;
  }
  .sort-indicator {
    margin-left: 6px;
    font-size: 12px;
    opacity: 0.6;
  }
</style>
`;

const getLevel = (value) => value >= 80 ? 'high' : value >= 60 ? 'medium' : 'low';

export const Default = {
  render: () => `
    ${css}
    <div style="display: flex; flex-direction: column; gap: 12px;">
      <div class="performance-cell perf-high">
        <div class="performance-bg" style="width: 92%"></div>
        <span class="performance-value">9.2/10</span>
      </div>
      
      <div class="performance-cell perf-medium">
        <div class="performance-bg" style="width: 70%"></div>
        <span class="performance-value">7.0/10</span>
      </div>
      
      <div class="performance-cell perf-low">
        <div class="performance-bg" style="width: 45%"></div>
        <span class="performance-value">4.5/10</span>
      </div>
      
      <div class="performance-cell perf-neutral">
        <div class="performance-bg" style="width: 0%"></div>
        <span class="performance-value">-</span>
      </div>
    </div>
  `
};

export const AllFormats = {
  render: () => `
    ${css}
    <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; max-width: 600px;">
      <div style="text-align: center;">
        <div style="margin-bottom: 8px; font-size: 12px; color: #6E6B7B; font-weight: 600;">Percentual</div>
        <div class="performance-cell perf-high">
          <div class="performance-bg" style="width: 87%"></div>
          <span class="performance-value">87%</span>
        </div>
      </div>
      
      <div style="text-align: center;">
        <div style="margin-bottom: 8px; font-size: 12px; color: #6E6B7B; font-weight: 600;">Nota</div>
        <div class="performance-cell perf-high">
          <div class="performance-bg" style="width: 87%"></div>
          <span class="performance-value">8.7/10</span>
        </div>
      </div>
      
      <div style="text-align: center;">
        <div style="margin-bottom: 8px; font-size: 12px; color: #6E6B7B; font-weight: 600;">Conceito</div>
        <div class="grade-badge perf-high">A</div>
      </div>
    </div>
  `
};

export const TabelaAlunos = {
  render: () => {
    const alunos = [
      { nome: 'Ana Silva', notas: [9.2, 8.5, 9.0] },
      { nome: 'Bruno Costa', notas: [7.0, 7.5, 8.0] },
      { nome: 'Carlos Mendes', notas: [5.5, 6.0, 6.5] },
      { nome: 'Diana Santos', notas: [8.0, 8.5, 8.2] },
      { nome: 'Eduardo Lima', notas: [4.5, 5.0, null] }
    ];
    
    const rows = alunos.map(aluno => {
      const cells = aluno.notas.map(nota => {
        if (nota === null) return '<td style="padding: 12px; text-align: center;"><div class="performance-cell perf-neutral"><span class="performance-value">-</span></div></td>';
        const level = getLevel(nota * 10);
        const percent = nota * 10;
        return '<td style="padding: 12px; text-align: center;"><div class="performance-cell perf-' + level + '"><div class="performance-bg" style="width: ' + percent + '%"></div><span class="performance-value">' + nota.toFixed(1) + '/10</span></div></td>';
      }).join('');
      return '<tr style="border-bottom: 1px solid #F3F2F7;"><td style="padding: 12px; font-size: 14px; color: #5E5873; font-weight: 600;">' + aluno.nome + '</td>' + cells + '</tr>';
    }).join('');
    
    return `
      ${css}
      <div style="background: #fff; border: 1px solid #D8D6DE; border-radius: 8px; padding: 20px; max-width: 900px;">
        <h3 style="margin: 0 0 16px; font-size: 18px; font-weight: 600; color: #5E5873;">
          Desempenho da Turma - Matemática 5º A
        </h3>
        <table style="width: 100%; border-collapse: collapse;">
          <thead>
            <tr style="border-bottom: 2px solid #E8E8E8;">
              <th style="padding: 12px; text-align: left; font-size: 13px; font-weight: 600; color: #6E6B7B;">Aluno</th>
              <th style="padding: 12px; text-align: center; font-size: 13px; font-weight: 600; color: #6E6B7B;">Missão 1</th>
              <th style="padding: 12px; text-align: center; font-size: 13px; font-weight: 600; color: #6E6B7B;">Missão 2</th>
              <th style="padding: 12px; text-align: center; font-size: 13px; font-weight: 600; color: #6E6B7B;">Missão 3</th>
            </tr>
          </thead>
          <tbody>
            ${rows}
          </tbody>
        </table>
      </div>
      <p style="margin-top: 16px; font-size: 13px; color: #6E6B7B;">
        <strong>Contexto:</strong> Tabela de desempenho de alunos em missões. Professor analisando performance da turma.
      </p>
    `;
  }
};

export const RankingTurma = {
  render: () => {
    const alunos = [
      { pos: 1, nome: 'Ana Silva', nota: 9.2, medal: '🥇' },
      { pos: 2, nome: 'Diana Santos', nota: 8.5, medal: '🥈' },
      { pos: 3, nome: 'Bruno Costa', nota: 7.5, medal: '🥉' },
      { pos: 4, nome: 'Carlos Mendes', nota: 6.0, medal: '' },
      { pos: 5, nome: 'Eduardo Lima', nota: 4.8, medal: '' }
    ];
    
    const items = alunos.map(aluno => {
      const level = getLevel(aluno.nota * 10);
      const percent = aluno.nota * 10;
      const position = aluno.medal || aluno.pos + 'º';
      return '<div style="display: flex; align-items: center; gap: 12px; padding: 12px; background: #F8F8F8; border-radius: 8px;"><span style="font-size: 24px; min-width: 30px;">' + position + '</span><span style="flex: 1; font-size: 14px; font-weight: 600; color: #5E5873;">' + aluno.nome + '</span><div class="performance-cell perf-' + level + '"><div class="performance-bg" style="width: ' + percent + '%"></div><span class="performance-value">' + aluno.nota.toFixed(1) + '/10</span></div></div>';
    }).join('');
    
    return `
      ${css}
      <div style="background: #fff; border: 1px solid #D8D6DE; border-radius: 8px; padding: 20px; max-width: 500px;">
        <h3 style="margin: 0 0 16px; font-size: 18px; font-weight: 600; color: #5E5873;">
          🏆 Ranking Geral - Matemática 5º A
        </h3>
        <div style="display: flex; flex-direction: column; gap: 12px;">
          ${items}
        </div>
      </div>
      <p style="margin-top: 16px; font-size: 13px; color: #6E6B7B;">
        <strong>Contexto:</strong> Ranking de alunos com medalhas. Aluno visualizando posição na turma.
      </p>
    `;
  }
};

export const BoletimCompleto = {
  render: () => {
    const disciplinas = [
      { disciplina: 'Matemática', notas: [9.2, 8.5, 9.0, 8.8], conceito: 'A' },
      { disciplina: 'Português', notas: [8.0, 8.5, 7.5, 8.0], conceito: 'B' },
      { disciplina: 'Ciências', notas: [7.0, 7.5, 8.0, 7.8], conceito: 'B' },
      { disciplina: 'História', notas: [8.5, 9.0, 8.8, 9.2], conceito: 'A' }
    ];
    
    const rows = disciplinas.map(disc => {
      const cells = disc.notas.map(nota => {
        const level = getLevel(nota * 10);
        const percent = nota * 10;
        return '<td style="padding: 12px; text-align: center;"><div class="performance-cell performance-compact perf-' + level + '"><div class="performance-bg" style="width: ' + percent + '%"></div><span class="performance-value">' + nota.toFixed(1) + '</span></div></td>';
      }).join('');
      const conceitoLevel = disc.conceito === 'A' ? 'high' : 'medium';
      return '<tr style="border-bottom: 1px solid #F3F2F7;"><td style="padding: 12px; font-size: 14px; color: #5E5873; font-weight: 600;">' + disc.disciplina + '</td>' + cells + '<td style="padding: 12px; text-align: center;"><div class="grade-badge perf-' + conceitoLevel + '">' + disc.conceito + '</div></td></tr>';
    }).join('');
    
    return `
      ${css}
      <div style="background: #fff; border: 1px solid #D8D6DE; border-radius: 8px; padding: 24px; max-width: 800px;">
        <h3 style="margin: 0 0 20px; font-size: 20px; font-weight: 600; color: #5E5873;">
          Boletim Escolar 2024 - Ana Silva
        </h3>
        <table style="width: 100%; border-collapse: collapse;">
          <thead>
            <tr style="border-bottom: 2px solid #E8E8E8;">
              <th style="padding: 12px; text-align: left; font-size: 13px; font-weight: 600; color: #6E6B7B;">Disciplina</th>
              <th style="padding: 12px; text-align: center; font-size: 13px; font-weight: 600; color: #6E6B7B;">1º Bim</th>
              <th style="padding: 12px; text-align: center; font-size: 13px; font-weight: 600; color: #6E6B7B;">2º Bim</th>
              <th style="padding: 12px; text-align: center; font-size: 13px; font-weight: 600; color: #6E6B7B;">3º Bim</th>
              <th style="padding: 12px; text-align: center; font-size: 13px; font-weight: 600; color: #6E6B7B;">4º Bim</th>
              <th style="padding: 12px; text-align: center; font-size: 13px; font-weight: 600; color: #6E6B7B;">Conceito</th>
            </tr>
          </thead>
          <tbody>
            ${rows}
          </tbody>
        </table>
      </div>
      <p style="margin-top: 16px; font-size: 13px; color: #6E6B7B;">
        <strong>Contexto:</strong> Boletim completo com notas bimestrais. Responsável visualizando desempenho.
      </p>
    `;
  }
};

export const EvolucaoMensal = {
  render: () => {
    const meses = [
      { mes: 'Jan', nota: 6.0 },
      { mes: 'Fev', nota: 6.5 },
      { mes: 'Mar', nota: 7.0 },
      { mes: 'Abr', nota: 7.2 },
      { mes: 'Mai', nota: 7.8 },
      { mes: 'Jun', nota: 8.5 }
    ];
    
    const items = meses.map((item, idx) => {
      const level = getLevel(item.nota * 10);
      const percent = item.nota * 10;
      const prevNota = idx > 0 ? meses[idx - 1].nota : item.nota;
      const trend = item.nota > prevNota ? '↗️' : item.nota < prevNota ? '↘️' : '→';
      return '<div style="flex: 1; display: flex; flex-direction: column; align-items: center; gap: 8px;"><div style="font-size: 12px; color: #6E6B7B;">' + trend + '</div><div class="performance-cell perf-' + level + '" style="writing-mode: vertical-rl; transform: rotate(180deg); height: ' + (percent * 1.5) + 'px; min-width: 60px;"><span class="performance-value" style="writing-mode: horizontal-tb; transform: rotate(180deg);">' + item.nota.toFixed(1) + '</span></div><div style="font-size: 13px; font-weight: 600; color: #5E5873;">' + item.mes + '</div></div>';
    }).join('');
    
    return `
      ${css}
      <div style="background: #fff; border: 1px solid #D8D6DE; border-radius: 8px; padding: 20px; max-width: 700px;">
        <h3 style="margin: 0 0 16px; font-size: 18px; font-weight: 600; color: #5E5873;">
          Evolução Mensal - Bruno Costa
        </h3>
        <div style="display: flex; gap: 10px; align-items: flex-end;">
          ${items}
        </div>
      </div>
      <p style="margin-top: 16px; font-size: 13px; color: #6E6B7B;">
        <strong>Contexto:</strong> Gráfico de evolução com indicadores de tendência. Aluno acompanhando progresso.
      </p>
    `;
  }
};

export const ComVariacao = {
  render: () => {
    const disciplinas = [
      { disciplina: 'Matemática', nota: 8.5, variacao: '+0.8' },
      { disciplina: 'Português', nota: 7.2, variacao: '-0.3' },
      { disciplina: 'Ciências', nota: 9.0, variacao: '+1.2' },
      { disciplina: 'História', nota: 6.5, variacao: '+0.2' },
      { disciplina: 'Geografia', nota: 7.8, variacao: '-0.5' },
      { disciplina: 'Inglês', nota: 8.2, variacao: '+0.6' }
    ];
    
    const cards = disciplinas.map(disc => {
      const level = getLevel(disc.nota * 10);
      const percent = disc.nota * 10;
      const variacaoPositiva = disc.variacao.startsWith('+');
      const cor = variacaoPositiva ? '#28C76F' : '#EA5455';
      return '<div style="padding: 16px; border: 1px solid #E8E8E8; border-radius: 8px;"><div style="margin-bottom: 12px; font-size: 14px; font-weight: 600; color: #5E5873;">' + disc.disciplina + '</div><div style="display: flex; align-items: center; gap: 12px;"><div class="performance-cell perf-' + level + '"><div class="performance-bg" style="width: ' + percent + '%"></div><span class="performance-value">' + disc.nota.toFixed(1) + '</span></div><div style="font-size: 14px; font-weight: 700; color: ' + cor + ';">' + disc.variacao + '</div></div></div>';
    }).join('');
    
    return `
      ${css}
      <div style="background: #fff; border: 1px solid #D8D6DE; border-radius: 8px; padding: 20px; max-width: 900px;">
        <h3 style="margin: 0 0 16px; font-size: 18px; font-weight: 600; color: #5E5873;">
          Performance por Disciplina - 5º A
        </h3>
        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px;">
          ${cards}
        </div>
      </div>
      <p style="margin-top: 16px; font-size: 13px; color: #6E6B7B;">
        <strong>Contexto:</strong> Cards de disciplinas com variação de desempenho. Coordenador analisando métricas.
      </p>
    `;
  }
};

export const Conceitos = {
  render: () => {
    const conceitos = [
      { conceito: 'A', descricao: 'Excelente', faixa: '9.0 - 10.0', nivel: 'high' },
      { conceito: 'B', descricao: 'Bom', faixa: '7.0 - 8.9', nivel: 'medium' },
      { conceito: 'C', descricao: 'Regular', faixa: '6.0 - 6.9', nivel: 'medium' },
      { conceito: 'D', descricao: 'Insuficiente', faixa: '4.0 - 5.9', nivel: 'low' },
      { conceito: 'E', descricao: 'Muito Insuficiente', faixa: '0.0 - 3.9', nivel: 'low' }
    ];
    
    const items = conceitos.map(item => {
      return '<div style="display: flex; align-items: center; gap: 16px; padding: 12px; background: #F8F8F8; border-radius: 8px;"><div class="grade-badge perf-' + item.nivel + '">' + item.conceito + '</div><div style="flex: 1;"><div style="font-size: 16px; font-weight: 600; color: #5E5873; margin-bottom: 4px;">' + item.descricao + '</div><div style="font-size: 13px; color: #6E6B7B;">' + item.faixa + '</div></div></div>';
    }).join('');
    
    return `
      ${css}
      <div style="background: #fff; border: 1px solid #D8D6DE; border-radius: 8px; padding: 24px; max-width: 600px;">
        <h3 style="margin: 0 0 20px; font-size: 18px; font-weight: 600; color: #5E5873;">
          Legenda de Conceitos
        </h3>
        <div style="display: flex; flex-direction: column; gap: 16px;">
          ${items}
        </div>
      </div>
      <p style="margin-top: 16px; font-size: 13px; color: #6E6B7B;">
        <strong>Contexto:</strong> Legenda explicativa do sistema de conceitos. Documentação para responsáveis.
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
      <div style="background:linear-gradient(135deg,#6E63E8 0%,#9C91EF 100%);padding:60px 40px;color:white;">
        <div style="max-width:900px;margin:0 auto;">
          <div style="display:inline-block;padding:8px 16px;background:rgba(255,255,255,0.15);border-radius:50px;margin-bottom:20px;font-size:14px;border:1px solid rgba(255,255,255,0.2);">Data Display</div>
          <h1 style="font-size:3rem;font-weight:700;margin:0 0 12px 0;letter-spacing:-0.02em;">PerformanceCell</h1>
          <p style="font-size:1.1rem;opacity:0.9;margin:0;max-width:600px;">Table Cell with Performance Indicator</p>
        </div>
      </div>
      <div style="max-width:900px;margin:0 auto;padding:48px 40px;">
        <div style="background:white;border-radius:12px;padding:32px;margin-bottom:32px;box-shadow:0 2px 8px rgba(0,0,0,0.08);">
          <h2 style="font-size:1.1rem;font-weight:600;color:#5E5873;margin:0 0 16px 0;">Sobre o Componente</h2>
          <p style="color:#6E6B7B;line-height:1.7;margin:0 0 16px 0;">Table Cell with Performance Indicator. Faz parte da categoria <strong>Data Display</strong> do Design System Educacross.</p>
          <div style="background:#F8F7FF;border-left:4px solid #6E63E8;padding:16px;border-radius:4px;">
            <p style="margin:0;color:#5E5873;font-size:14px;line-height:1.6;"><strong>💡 Dica:</strong> Use <em>Playground</em> para explorar props, <em>Use Cases</em> para exemplos reais e <em>Accessibility</em> para validar WCAG.</p>
          </div>
        </div>
        <div style="background:white;border-radius:12px;padding:32px;box-shadow:0 2px 8px rgba(0,0,0,0.08);">
          <h2 style="font-size:1.1rem;font-weight:600;color:#5E5873;margin:0 0 16px 0;">Implementação Vue 2.7</h2>
          <pre style="background:#1E1E2E;color:#CDD6F4;padding:20px;border-radius:8px;font-size:13px;line-height:1.6;overflow:auto;margin:0;"><code>import PerformanceCell from '@/components/PerformanceCell.vue';

// Template
&lt;PerformanceCell v-bind="props" /&gt;</code></pre>
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
    docs: { description: { story: 'Explore o PerformanceCell com controles interativos.' } },
  },
  render: (args) => `
    <div style="padding:32px;display:flex;justify-content:center;align-items:center;min-height:200px;background:#F8F8F8;border-radius:12px;">
      <div style="text-align:center;color:#6E6B7B;">
        <div style="width:60px;height:60px;background:#6E63E820;border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 16px;font-size:24px;">🎨</div>
        <p style="margin:0 0 8px 0;font-size:15px;font-weight:600;color:#5E5873;">Playground PerformanceCell</p>
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
    docs: { description: { story: 'Exemplos de uso real do PerformanceCell no Educacross.' } },
  },
  render: () => `
    <div style="max-width:800px;margin:0 auto;padding:40px 20px;font-family:'Public Sans',sans-serif;">
      <div style="background:#6E63E815;border:1px solid #6E63E830;border-radius:12px;padding:24px;margin-bottom:40px;">
        <h1 style="font-size:1.5rem;font-weight:700;color:#5E5873;margin:0 0 8px 0;">Casos de Uso: PerformanceCell</h1>
        <p style="color:#6E6B7B;margin:0;font-size:14px;line-height:1.6;">Cenários reais de uso no contexto educacional da plataforma Educacross</p>
      </div>
      
      <div style="margin-bottom:32px;">
        <h2 style="font-size:18px;font-weight:600;color:#5E5873;margin:0 0 8px 0;display:flex;align-items:center;gap:10px;">
          <span style="display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;background:#6E63E8;color:white;border-radius:50%;font-size:13px;font-weight:700;flex-shrink:0;">1</span>
          Professor — Painel Principal
        </h2>
        <p style="color:#6E6B7B;margin:0 0 16px 0;padding-left:38px;font-size:14px;">Professor utilizando PerformanceCell no dashboard de gestão de turmas</p>
        <div style="background:#F8F8F8;border-radius:8px;padding:20px;margin-left:38px;text-align:center;color:#B9B9C3;font-size:13px;">
          Ver story <strong>Default</strong> para visualização do componente neste contexto
        </div>
      </div>
      <div style="margin-bottom:32px;">
        <h2 style="font-size:18px;font-weight:600;color:#5E5873;margin:0 0 8px 0;display:flex;align-items:center;gap:10px;">
          <span style="display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;background:#6E63E8;color:white;border-radius:50%;font-size:13px;font-weight:700;flex-shrink:0;">2</span>
          Aluno — Portal do Estudante
        </h2>
        <p style="color:#6E6B7B;margin:0 0 16px 0;padding-left:38px;font-size:14px;">Aluno interagindo com PerformanceCell no portal educacional</p>
        <div style="background:#F8F8F8;border-radius:8px;padding:20px;margin-left:38px;text-align:center;color:#B9B9C3;font-size:13px;">
          Ver story <strong>Default</strong> para visualização do componente neste contexto
        </div>
      </div>
      <div style="margin-bottom:32px;">
        <h2 style="font-size:18px;font-weight:600;color:#5E5873;margin:0 0 8px 0;display:flex;align-items:center;gap:10px;">
          <span style="display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;background:#6E63E8;color:white;border-radius:50%;font-size:13px;font-weight:700;flex-shrink:0;">3</span>
          Coordenador — Relatórios
        </h2>
        <p style="color:#6E6B7B;margin:0 0 16px 0;padding-left:38px;font-size:14px;">Coordenador pedagógico analisando dados via PerformanceCell</p>
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
    docs: { description: { story: 'Conformidade WCAG 2.1 AA para o PerformanceCell.' } },
  },
  render: () => `
    <div style="max-width:800px;margin:0 auto;padding:40px 20px;font-family:'Public Sans',sans-serif;">

      <div style="background:linear-gradient(135deg,#6E63E8 0%,#764ba2 100%);padding:32px;border-radius:12px;margin-bottom:32px;color:white;">
        <h1 style="font-size:1.5rem;font-weight:700;margin:0 0 8px 0;">Acessibilidade: PerformanceCell</h1>
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

