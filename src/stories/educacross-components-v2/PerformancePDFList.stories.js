/**
 * PerformancePDFList - PDF Performance Report List Component
 * =========================================
 * 
 * Displays performance metrics in list format optimized for PDF export.
 * Shows student performance data with scores and status indicators.
 * 
 * @component PerformancePDFList
 * @source educacross-frontoffice\src\components\PDFs\event\performance\PerformancePDFList.vue
 */

export default {
  title: 'Educacross Components V2/PDF/PerformancePDFList',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
# PerformancePDFList

Componente de **lista de desempenho otimizada para PDF** com métricas de performance.

## Contexto de Uso

- **Relatórios PDF**: Boletins e reports exportáveis
- **Performance tracking**: Lista de notas e desempenho
- **Avaliações**: Resultados de provas/atividades
- **Comparativos**: Performance entre alunos/turmas
- **Histórico acadêmico**: Registro de desempenho

## Características

- **PDF-optimized**: Fontes e espaçamentos para impressão
- **Compact layout**: Maximiza densidade de informação
- **Status colors**: Verde/amarelo/vermelho para proficiência
- **Table format**: Estrutura tabular clara
- **Print-friendly**: Cores mantidas em impressão

## Events

- **@setInfos**: Envia informações de configuração do PDF
        `
      }
    }
  }
};

const performancePDFListStyles = `
<style>
  .performance-pdf-container {
    font-family: Arial, sans-serif;
    max-width: 800px;
    background: white;
    padding: 24px;
  }
  
  .pdf-header {
    margin-bottom: 20px;
    border-bottom: 2px solid #5D596C;
    padding-bottom: 12px;
  }
  
  .pdf-title {
    font-size: 18px;
    font-weight: 700;
    color: #5D596C;
    margin: 0 0 8px 0;
  }
  
  .pdf-subtitle {
    font-size: 12px;
    color: #6E6B7B;
    margin: 0;
  }
  
  .performance-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 11px;
  }
  
  .performance-table thead {
    background: #F8F7FA;
  }
  
  .performance-table th {
    padding: 8px 12px;
    text-align: left;
    font-weight: 700;
    color: #5D596C;
    border-bottom: 2px solid #DBDADE;
    text-transform: uppercase;
    font-size: 10px;
    letter-spacing: 0.5px;
  }
  
  .performance-table td {
    padding: 10px 12px;
    border-bottom: 1px solid #F3F2F7;
    color: #5D596C;
  }
  
  .performance-table tbody tr:hover {
    background: #F8F8F8;
  }
  
  .status-badge {
    padding: 4px 8px;
    border-radius: 4px;
    font-size: 10px;
    font-weight: 600;
    text-align: center;
    display: inline-block;
  }
  
  .status-proficient {
    background: #E8F5E9;
    color: #2E7D32;
  }
  
  .status-basic {
    background: #FFF3E0;
    color: #E65100;
  }
  
  .status-below-basic {
    background: #FFEBEE;
    color: #C62828;
  }
  
  .score-cell {
    font-weight: 700;
    font-size: 12px;
  }
  
  @media print {
    .performance-pdf-container {
      padding: 0;
    }
    
    .performance-table {
      page-break-inside: avoid;
    }
    
    .status-badge {
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }
  }
</style>
`;

export const Default = {
  render: () => `
    ${performancePDFListStyles}
    <div class="performance-pdf-container">
      <div class="pdf-header">
        <h1 class="pdf-title">Relatório de Desempenho - Matemática</h1>
        <p class="pdf-subtitle">Turma 7º A • 2º Bimestre • Gerado em 03/02/2026</p>
      </div>
      
      <table class="performance-table">
        <thead>
          <tr>
            <th>Aluno</th>
            <th>Matrícula</th>
            <th style="text-align: center;">Nota</th>
            <th style="text-align: center;">Proficiência</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Ana Clara Silva</td>
            <td>202601</td>
            <td class="score-cell" style="text-align: center; color: #28C76F;">9.5</td>
            <td style="text-align: center;"><span class="status-badge status-proficient">Avançado</span></td>
          </tr>
          <tr>
            <td>Bruno Oliveira Santos</td>
            <td>202602</td>
            <td class="score-cell" style="text-align: center; color: #28C76F;">8.2</td>
            <td style="text-align: center;"><span class="status-badge status-proficient">Proficiente</span></td>
          </tr>
          <tr>
            <td>Carlos Eduardo Lima</td>
            <td>202603</td>
            <td class="score-cell" style="text-align: center; color: #FF9F43;">6.5</td>
            <td style="text-align: center;"><span class="status-badge status-basic">Básico</span></td>
          </tr>
        </tbody>
      </table>
    </div>
  `
};

export const FullReport = {
  render: () => `
    ${performancePDFListStyles}
    <div class="performance-pdf-container">
      <div class="pdf-header">
        <h1 class="pdf-title">Desempenho Geral - Todas as Disciplinas</h1>
        <p class="pdf-subtitle">Turma 8º B • 1º Semestre • 30 alunos</p>
      </div>
      
      <table class="performance-table">
        <thead>
          <tr>
            <th>Aluno</th>
            <th>Mat</th>
            <th>Port</th>
            <th>Geo</th>
            <th>Hist</th>
            <th style="text-align: center;">Média</th>
            <th style="text-align: center;">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Ana Clara Silva</td>
            <td style="text-align: center;">9.5</td>
            <td style="text-align: center;">9.0</td>
            <td style="text-align: center;">8.8</td>
            <td style="text-align: center;">9.2</td>
            <td class="score-cell" style="text-align: center; color: #28C76F;">9.1</td>
            <td style="text-align: center;"><span class="status-badge status-proficient">Avançado</span></td>
          </tr>
          <tr>
            <td>Bruno Oliveira</td>
            <td style="text-align: center;">7.5</td>
            <td style="text-align: center;">8.0</td>
            <td style="text-align: center;">7.8</td>
            <td style="text-align: center;">7.2</td>
            <td class="score-cell" style="text-align: center; color: #28C76F;">7.6</td>
            <td style="text-align: center;"><span class="status-badge status-proficient">Proficiente</span></td>
          </tr>
          <tr>
            <td>Carlos Lima</td>
            <td style="text-align: center;">6.0</td>
            <td style="text-align: center;">6.5</td>
            <td style="text-align: center;">5.8</td>
            <td style="text-align: center;">6.2</td>
            <td class="score-cell" style="text-align: center; color: #FF9F43;">6.1</td>
            <td style="text-align: center;"><span class="status-badge status-basic">Básico</span></td>
          </tr>
          <tr>
            <td>Diana Santos</td>
            <td style="text-align: center;">4.5</td>
            <td style="text-align: center;">5.0</td>
            <td style="text-align: center;">4.8</td>
            <td style="text-align: center;">4.2</td>
            <td class="score-cell" style="text-align: center; color: #EA5455;">4.6</td>
            <td style="text-align: center;"><span class="status-badge status-below-basic">Abaixo</span></td>
          </tr>
        </tbody>
      </table>
    </div>
  `
};

export const WithStatistics = {
  render: () => `
    ${performancePDFListStyles}
    <style>
      .stats-row {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 16px;
        margin-bottom: 20px;
      }
      .stat-box {
        background: #F8F7FA;
        padding: 12px;
        border-radius: 8px;
        text-align: center;
      }
      .stat-value {
        font-size: 24px;
        font-weight: 700;
        color: #6E63E8;
        margin: 0;
      }
      .stat-label {
        font-size: 10px;
        color: #6E6B7B;
        text-transform: uppercase;
        margin: 4px 0 0 0;
      }
    </style>
    <div class="performance-pdf-container">
      <div class="pdf-header">
        <h1 class="pdf-title">Análise de Desempenho - Matemática</h1>
        <p class="pdf-subtitle">Turma 7º A • Análise detalhada com estatísticas</p>
      </div>
      
      <div class="stats-row">
        <div class="stat-box">
          <p class="stat-value">7.8</p>
          <p class="stat-label">Média Geral</p>
        </div>
        <div class="stat-box">
          <p class="stat-value" style="color: #28C76F;">9.5</p>
          <p class="stat-label">Maior Nota</p>
        </div>
        <div class="stat-box">
          <p class="stat-value" style="color: #EA5455;">4.2</p>
          <p class="stat-label">Menor Nota</p>
        </div>
        <div class="stat-box">
          <p class="stat-value">85%</p>
          <p class="stat-label">Taxa Aprovação</p>
        </div>
      </div>
      
      <table class="performance-table">
        <thead>
          <tr>
            <th>Aluno</th>
            <th style="text-align: center;">Nota</th>
            <th style="text-align: center;">Proficiência</th>
            <th style="text-align: center;">vs Média</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Ana Clara Silva</td>
            <td class="score-cell" style="text-align: center; color: #28C76F;">9.5</td>
            <td style="text-align: center;"><span class="status-badge status-proficient">Avançado</span></td>
            <td style="text-align: center; color: #28C76F; font-weight: 600;">+1.7</td>
          </tr>
          <tr>
            <td>Bruno Oliveira</td>
            <td class="score-cell" style="text-align: center; color: #28C76F;">8.2</td>
            <td style="text-align: center;"><span class="status-badge status-proficient">Proficiente</span></td>
            <td style="text-align: center; color: #28C76F; font-weight: 600;">+0.4</td>
          </tr>
          <tr>
            <td>Carlos Lima</td>
            <td class="score-cell" style="text-align: center; color: #FF9F43;">6.5</td>
            <td style="text-align: center;"><span class="status-badge status-basic">Básico</span></td>
            <td style="text-align: center; color: #EA5455; font-weight: 600;">-1.3</td>
          </tr>
        </tbody>
      </table>
    </div>
  `
};

export const CompactView = {
  render: () => `
    ${performancePDFListStyles}
    <div class="performance-pdf-container" style="font-size: 10px;">
      <table class="performance-table" style="font-size: 9px;">
        <thead>
          <tr>
            <th>Aluno</th>
            <th>Mat</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>Ana Clara Silva</td><td style="text-align: center; font-weight: 700;">9.5</td><td style="text-align: center;"><span class="status-badge status-proficient">Avanç</span></td></tr>
          <tr><td>Bruno Oliveira</td><td style="text-align: center; font-weight: 700;">8.2</td><td style="text-align: center;"><span class="status-badge status-proficient">Prof</span></td></tr>
          <tr><td>Carlos Lima</td><td style="text-align: center; font-weight: 700;">6.5</td><td style="text-align: center;"><span class="status-badge status-basic">Básico</span></td></tr>
          <tr><td>Diana Santos</td><td style="text-align: center; font-weight: 700;">4.6</td><td style="text-align: center;"><span class="status-badge status-below-basic">Abaixo</span></td></tr>
          <tr><td>Eduardo Costa</td><td style="text-align: center; font-weight: 700;">7.8</td><td style="text-align: center;"><span class="status-badge status-proficient">Prof</span></td></tr>
        </tbody>
      </table>
    </div>
  `
};

export const WithFooter = {
  render: () => `
    ${performancePDFListStyles}
    <style>
      .pdf-footer {
        margin-top: 20px;
        padding-top: 12px;
        border-top: 2px solid #DBDADE;
        font-size: 9px;
        color: #6E6B7B;
        display: flex;
        justify-content: space-between;
      }
    </style>
    <div class="performance-pdf-container">
      <div class="pdf-header">
        <h1 class="pdf-title">Boletim Escolar - 2º Bimestre</h1>
        <p class="pdf-subtitle">Escola Educacross • Ano Letivo 2026</p>
      </div>
      
      <table class="performance-table">
        <thead>
          <tr>
            <th>Disciplina</th>
            <th style="text-align: center;">Nota</th>
            <th style="text-align: center;">Proficiência</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>Matemática</td><td class="score-cell" style="text-align: center; color: #28C76F;">9.5</td><td style="text-align: center;"><span class="status-badge status-proficient">Avançado</span></td></tr>
          <tr><td>Português</td><td class="score-cell" style="text-align: center; color: #28C76F;">8.8</td><td style="text-align: center;"><span class="status-badge status-proficient">Proficiente</span></td></tr>
          <tr><td>Geografia</td><td class="score-cell" style="text-align: center; color: #28C76F;">8.2</td><td style="text-align: center;"><span class="status-badge status-proficient">Proficiente</span></td></tr>
          <tr><td>História</td><td class="score-cell" style="text-align: center; color: #FF9F43;">6.5</td><td style="text-align: center;"><span class="status-badge status-basic">Básico</span></td></tr>
        </tbody>
      </table>
      
      <div class="pdf-footer">
        <span>Aluno: Ana Clara Silva • Matrícula: 202601</span>
        <span>Página 1 de 1 • Gerado em 03/02/2026</span>
      </div>
    </div>
  `
};

export const MultiPage = {
  render: () => `
    ${performancePDFListStyles}
    <style>
      .page-break {
        border-top: 2px dashed #DBDADE;
        margin: 24px 0;
        padding-top: 24px;
        position: relative;
      }
      .page-break::before {
        content: 'Quebra de página';
        position: absolute;
        top: -10px;
        left: 50%;
        transform: translateX(-50%);
        background: white;
        padding: 0 8px;
        font-size: 10px;
        color: #6E6B7B;
      }
    </style>
    <div class="performance-pdf-container">
      <div class="pdf-header">
        <h1 class="pdf-title">Relatório Completo - Página 1</h1>
        <p class="pdf-subtitle">Desempenho 1º Bimestre</p>
      </div>
      <table class="performance-table">
        <tbody>
          <tr><td>Ana Clara</td><td style="text-align: center;">9.5</td></tr>
          <tr><td>Bruno Oliveira</td><td style="text-align: center;">8.2</td></tr>
        </tbody>
      </table>
      
      <div class="page-break"></div>
      
      <div class="pdf-header">
        <h1 class="pdf-title">Relatório Completo - Página 2</h1>
        <p class="pdf-subtitle">Desempenho 1º Bimestre (continuação)</p>
      </div>
      <table class="performance-table">
        <tbody>
          <tr><td>Carlos Lima</td><td style="text-align: center;">6.5</td></tr>
          <tr><td>Diana Santos</td><td style="text-align: center;">4.6</td></tr>
        </tbody>
      </table>
    </div>
  `
};

export const PrintPreview = {
  render: () => `
    ${performancePDFListStyles}
    <div style="background: #E3F2FD; padding: 16px; border-radius: 6px; margin-bottom: 16px;">
      <p style="margin: 0; font-size: 13px; color: #1565C0;">
        <i class="bi bi-printer"></i> <strong>Modo Impressão:</strong> Cores e layout otimizados para PDF/impressão
      </p>
    </div>
    <div style="box-shadow: 0 4px 16px rgba(0,0,0,0.1); background: white;">
      <div class="performance-pdf-container">
        <div class="pdf-header">
          <h1 class="pdf-title">Preview de Impressão</h1>
          <p class="pdf-subtitle">Relatório pronto para exportar</p>
        </div>
        <table class="performance-table">
          <thead>
            <tr><th>Aluno</th><th style="text-align: center;">Nota</th><th style="text-align: center;">Status</th></tr>
          </thead>
          <tbody>
            <tr><td>Ana Clara</td><td class="score-cell" style="text-align: center; color: #28C76F;">9.5</td><td style="text-align: center;"><span class="status-badge status-proficient">Avançado</span></td></tr>
            <tr><td>Bruno Oliveira</td><td class="score-cell" style="text-align: center; color: #28C76F;">8.2</td><td style="text-align: center;"><span class="status-badge status-proficient">Proficiente</span></td></tr>
          </tbody>
        </table>
      </div>
    </div>
  `
};

export const Responsive = {
  render: () => `
    ${performancePDFListStyles}
    <div style="background: #E3F2FD; padding: 16px; border-radius: 6px; margin-bottom: 16px;">
      <p style="margin: 0; font-size: 13px; color: #1565C0;">
        <i class="bi bi-file-pdf"></i> <strong>PerformancePDFList:</strong> Otimizado para A4 210×297mm @ 300dpi
      </p>
    </div>
    <div class="performance-pdf-container" style="border: 1px solid #DBDADE;">
      <div class="pdf-header">
        <h1 class="pdf-title">Formato A4 Standard</h1>
      </div>
      <table class="performance-table">
        <thead><tr><th>Aluno</th><th>Nota</th><th>Status</th></tr></thead>
        <tbody>
          <tr><td>Ana Clara Silva</td><td style="text-align: center;">9.5</td><td style="text-align: center;"><span class="status-badge status-proficient">Avançado</span></td></tr>
        </tbody>
      </table>
    </div>
  `
};
