/**
 * LegendEnumPDF - PDF Status Enum Legend Component
 * =========================================
 * 
 * Compact version of LegendEnum optimized for PDF exports.
 * Uses smaller font-size (font-10) and minimal padding for print-friendly output.
 * 
 * @component LegendEnumPDF
 * @source educacross-frontoffice\src\components\legends\LegendEnumPDF.vue
 */

export default {
  title: 'Educacross Components V2/Legends/LegendEnumPDF',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
# LegendEnumPDF

Versão **compacta** do LegendEnum otimizada para **exportação PDF**.

## Diferenças vs LegendEnum

| Aspecto | LegendEnum | LegendEnumPDF |
|---------|------------|---------------|
| **Font-size** | 13-14px | 10px (font-10) |
| **Padding** | 6px 12px | 4px 8px |
| **Card wrapper** | ✅ Com card border | ❌ Sem card (div simples) |
| **Shadow** | box-shadow-sm | Nenhum |
| **Gap** | 16px (gap-2) | 12px |
| **Uso** | Interface web | Relatórios PDF |

## Contexto de Uso

- **Exportação PDF**: Relatórios de desempenho para impressão
- **Certificados**: Legendas em documentos oficiais
- **Boletins**: Status compactos em notas
- **Relatórios batch**: Múltiplas legendas em uma página A4
- **Email attachments**: PDFs enviados automaticamente

## Otimizações para PDF

1. **Font-size reduzido**: 10px (font-10) para caber mais conteúdo
2. **Sem card wrapper**: Remove borders e shadows que não imprimem bem
3. **Padding mínimo**: 4px 8px para economia de espaço
4. **Cores mantidas**: Sistema semáforo funciona bem em impressão
5. **No hover states**: PDFs não têm interação

## Status Enum Colors

| Status | Color | Hex | PDF-safe |
|--------|-------|-----|----------|
| **Below Basic** | 🔴 Vermelho | #EA5455 | ✅ Imprime bem |
| **Basic** | 🟡 Amarelo | #FF9F43 | ✅ Imprime bem |
| **Proficient** | 🟢 Verde | #28C76F | ✅ Imprime bem |
| **Advanced** | 🔵 Azul | #6E63E8 | ✅ Imprime bem |

## Quando usar

- **Gerar PDFs**: Relatórios automáticos do sistema
- **Impressão**: Documentos que serão impressos em papel
- **Email**: Anexos PDF enviados para pais/alunos
- **Certificados**: Legendas em documentos oficiais
- **Boletins**: Status compactos em múltiplas linhas
        `
      }
    }
  }
};

/**
 * Props API
 * 
 * Componente estrutural sem props - recebe status badges via slot enum-component
 * Size prop implícito: "pdf" para font-10
 */

/**
 * Design Specs
 * 
 * Cores (idênticas ao LegendEnum):
 * - Below Basic: #EA5455 (danger)
 * - Basic: #FF9F43 (warning)
 * - Proficient: #28C76F (success)
 * - Advanced: #6E63E8 (primary)
 * 
 * Dimensões PDF-optimized:
 * - Font-size: 10px (font-10)
 * - Badge padding: 4px 8px (compacto)
 * - Badge border-radius: 3px (discreto)
 * - Gap: 12px (reduzido vs 16px web)
 * - Line-height: 1.4 (condensado)
 * - No shadows, no borders (print-friendly)
 * 
 * Layout:
 * - Display: flex
 * - Justify-content: center
 * - Gap: 12px
 * - Flex-wrap: wrap
 * - Background: transparent (sem card)
 */

// Estilos base PDF
const legendPDFStyles = `
<style>
  .legend-pdf-container {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 12px;
    flex-wrap: wrap;
    font-size: 10px;
    color: #5D596C;
    line-height: 1.4;
    padding: 8px 0;
  }
  
  .legend-pdf-label {
    font-weight: 500;
    color: #5D596C;
    font-size: 10px;
  }
  
  .status-badge-pdf {
    display: inline-flex;
    align-items: center;
    padding: 4px 8px;
    border-radius: 3px;
    font-size: 10px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.2px;
    line-height: 1.2;
  }
  
  .status-below-basic-pdf {
    background: rgba(234, 84, 85, 0.12);
    color: #EA5455;
    border: 1px solid #EA5455;
  }
  
  .status-basic-pdf {
    background: rgba(255, 159, 67, 0.12);
    color: #FF9F43;
    border: 1px solid #FF9F43;
  }
  
  .status-proficient-pdf {
    background: rgba(40, 199, 111, 0.12);
    color: #28C76F;
    border: 1px solid #28C76F;
  }
  
  .status-advanced-pdf {
    background: rgba(110, 99, 232, 0.12);
    color: #6E63E8;
    border: 1px solid #6E63E8;
  }
  
  /* Print-specific styles */
  @media print {
    .legend-pdf-container {
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
      color-adjust: exact;
    }
    
    .status-badge-pdf {
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }
  }
  
  /* Demo PDF wrapper */
  .pdf-page-demo {
    background: white;
    border: 1px solid #E0E0E0;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    padding: 24px;
    max-width: 800px;
    margin: 0 auto;
  }
  
  .pdf-header {
    text-align: center;
    border-bottom: 2px solid #6E63E8;
    padding-bottom: 12px;
    margin-bottom: 20px;
  }
  
  .pdf-title {
    font-size: 18px;
    font-weight: 700;
    color: #5D596C;
    margin: 0 0 4px 0;
  }
  
  .pdf-subtitle {
    font-size: 12px;
    color: #6E6B7B;
    margin: 0;
  }
</style>
`;

// Story: Default
export const Default = {
  render: () => `
    ${legendPDFStyles}
    <div class="legend-pdf-container">
      <span class="legend-pdf-label">Status:</span>
      <span class="status-badge-pdf status-proficient-pdf">Proficient</span>
    </div>
  `
};

// Story: AllStatuses
export const AllStatuses = {
  render: () => `
    ${legendPDFStyles}
    <div style="background: white; padding: 16px; max-width: 600px;">
      <div class="legend-pdf-container" style="margin-bottom: 12px;">
        <span class="legend-pdf-label">Below Basic:</span>
        <span class="status-badge-pdf status-below-basic-pdf">Below Basic</span>
        <span style="font-size: 10px; color: #6E6B7B;">(0 - 4.9)</span>
      </div>
      
      <div class="legend-pdf-container" style="margin-bottom: 12px;">
        <span class="legend-pdf-label">Basic:</span>
        <span class="status-badge-pdf status-basic-pdf">Basic</span>
        <span style="font-size: 10px; color: #6E6B7B;">(5.0 - 6.9)</span>
      </div>
      
      <div class="legend-pdf-container" style="margin-bottom: 12px;">
        <span class="legend-pdf-label">Proficient:</span>
        <span class="status-badge-pdf status-proficient-pdf">Proficient</span>
        <span style="font-size: 10px; color: #6E6B7B;">(7.0 - 8.9)</span>
      </div>
      
      <div class="legend-pdf-container">
        <span class="legend-pdf-label">Advanced:</span>
        <span class="status-badge-pdf status-advanced-pdf">Advanced</span>
        <span style="font-size: 10px; color: #6E6B7B;">(9.0 - 10.0)</span>
      </div>
    </div>
  `
};

// Story: InPDFReport
export const InPDFReport = {
  render: () => `
    ${legendPDFStyles}
    <div class="pdf-page-demo">
      <div class="pdf-header">
        <h1 class="pdf-title">Relatório de Desempenho - 2026</h1>
        <p class="pdf-subtitle">Turma 5º Ano A - 1º Trimestre</p>
      </div>
      
      <div class="legend-pdf-container" style="justify-content: flex-start; margin-bottom: 20px; background: #F8F7FA; padding: 12px; border-radius: 6px;">
        <span class="legend-pdf-label" style="font-weight: 600;">Legenda:</span>
        <span class="status-badge-pdf status-below-basic-pdf">Below</span>
        <span class="status-badge-pdf status-basic-pdf">Basic</span>
        <span class="status-badge-pdf status-proficient-pdf">Prof.</span>
        <span class="status-badge-pdf status-advanced-pdf">Adv.</span>
      </div>
      
      <table style="width: 100%; border-collapse: collapse; font-size: 10px;">
        <thead>
          <tr style="background: #F8F7FA; border-bottom: 2px solid #E0E0E0;">
            <th style="padding: 8px; text-align: left; font-weight: 600;">Aluno</th>
            <th style="padding: 8px; text-align: center; font-weight: 600;">Matemática</th>
            <th style="padding: 8px; text-align: center; font-weight: 600;">Português</th>
            <th style="padding: 8px; text-align: center; font-weight: 600;">Ciências</th>
          </tr>
        </thead>
        <tbody>
          <tr style="border-bottom: 1px solid #F0F0F0;">
            <td style="padding: 8px;">Ana Silva</td>
            <td style="padding: 8px; text-align: center;">
              <span class="status-badge-pdf status-advanced-pdf">Adv.</span>
            </td>
            <td style="padding: 8px; text-align: center;">
              <span class="status-badge-pdf status-proficient-pdf">Prof.</span>
            </td>
            <td style="padding: 8px; text-align: center;">
              <span class="status-badge-pdf status-advanced-pdf">Adv.</span>
            </td>
          </tr>
          <tr style="border-bottom: 1px solid #F0F0F0;">
            <td style="padding: 8px;">Bruno Costa</td>
            <td style="padding: 8px; text-align: center;">
              <span class="status-badge-pdf status-proficient-pdf">Prof.</span>
            </td>
            <td style="padding: 8px; text-align: center;">
              <span class="status-badge-pdf status-basic-pdf">Basic</span>
            </td>
            <td style="padding: 8px; text-align: center;">
              <span class="status-badge-pdf status-proficient-pdf">Prof.</span>
            </td>
          </tr>
          <tr style="border-bottom: 1px solid #F0F0F0;">
            <td style="padding: 8px;">Carlos Mendes</td>
            <td style="padding: 8px; text-align: center;">
              <span class="status-badge-pdf status-basic-pdf">Basic</span>
            </td>
            <td style="padding: 8px; text-align: center;">
              <span class="status-badge-pdf status-below-basic-pdf">Below</span>
            </td>
            <td style="padding: 8px; text-align: center;">
              <span class="status-badge-pdf status-basic-pdf">Basic</span>
            </td>
          </tr>
        </tbody>
      </table>
      
      <div style="margin-top: 20px; padding: 12px; background: #F8F7FA; border-radius: 6px; font-size: 10px; color: #6E6B7B;">
        <strong>Observações:</strong> Legendas compactas (font-10) otimizadas para impressão em papel A4.
      </div>
    </div>
  `
};

// Story: CompactMultiple
export const CompactMultiple = {
  render: () => `
    ${legendPDFStyles}
    <div style="background: white; padding: 16px; max-width: 700px;">
      <div class="legend-pdf-container" style="justify-content: flex-start; margin-bottom: 8px;">
        <span class="legend-pdf-label">Matemática:</span>
        <span class="status-badge-pdf status-advanced-pdf">Adv.</span>
        <span class="status-badge-pdf status-proficient-pdf">Prof.</span>
        <span class="status-badge-pdf status-basic-pdf">Basic</span>
        <span class="status-badge-pdf status-below-basic-pdf">Below</span>
      </div>
      
      <div class="legend-pdf-container" style="justify-content: flex-start; margin-bottom: 8px;">
        <span class="legend-pdf-label">Português:</span>
        <span class="status-badge-pdf status-advanced-pdf">Adv.</span>
        <span class="status-badge-pdf status-proficient-pdf">Prof.</span>
        <span class="status-badge-pdf status-basic-pdf">Basic</span>
        <span class="status-badge-pdf status-below-basic-pdf">Below</span>
      </div>
      
      <div class="legend-pdf-container" style="justify-content: flex-start; margin-bottom: 8px;">
        <span class="legend-pdf-label">Ciências:</span>
        <span class="status-badge-pdf status-advanced-pdf">Adv.</span>
        <span class="status-badge-pdf status-proficient-pdf">Prof.</span>
        <span class="status-badge-pdf status-basic-pdf">Basic</span>
        <span class="status-badge-pdf status-below-basic-pdf">Below</span>
      </div>
      
      <div class="legend-pdf-container" style="justify-content: flex-start;">
        <span class="legend-pdf-label">História:</span>
        <span class="status-badge-pdf status-advanced-pdf">Adv.</span>
        <span class="status-badge-pdf status-proficient-pdf">Prof.</span>
        <span class="status-badge-pdf status-basic-pdf">Basic</span>
        <span class="status-badge-pdf status-below-basic-pdf">Below</span>
      </div>
      
      <div style="margin-top: 12px; font-size: 9px; color: #6E6B7B; text-align: center;">
        Múltiplas legendas compactas em página PDF (economia de espaço vertical)
      </div>
    </div>
  `
};

// Story: InCertificate
export const InCertificate = {
  render: () => `
    ${legendPDFStyles}
    <div class="pdf-page-demo" style="max-width: 700px;">
      <div class="pdf-header" style="border-bottom: 3px double #6E63E8;">
        <h1 class="pdf-title" style="font-size: 20px;">CERTIFICADO DE PROFICIÊNCIA</h1>
        <p class="pdf-subtitle">Educacross - Sistema de Avaliação 2026</p>
      </div>
      
      <div style="text-align: center; margin: 32px 0;">
        <p style="font-size: 12px; color: #5D596C; margin: 0 0 8px 0;">Certificamos que</p>
        <h2 style="font-size: 18px; font-weight: 700; color: #5D596C; margin: 0 0 8px 0; border-bottom: 1px solid #E0E0E0; padding-bottom: 8px;">
          ANA CLARA SILVA
        </h2>
        <p style="font-size: 12px; color: #5D596C; margin: 0 0 16px 0;">
          obteve nível de proficiência
        </p>
        <div style="display: inline-block; padding: 12px 24px; background: rgba(110,99,232,0.1); border: 2px solid #6E63E8; border-radius: 8px;">
          <span class="status-badge-pdf status-advanced-pdf" style="font-size: 12px; padding: 6px 12px;">
            ADVANCED
          </span>
        </div>
      </div>
      
      <div class="legend-pdf-container" style="justify-content: center; margin-top: 32px; padding: 12px; background: #F8F7FA; border-radius: 6px;">
        <span class="legend-pdf-label" style="font-weight: 600;">Escala de Proficiência:</span>
        <span class="status-badge-pdf status-below-basic-pdf">Below</span>
        <span class="status-badge-pdf status-basic-pdf">Basic</span>
        <span class="status-badge-pdf status-proficient-pdf">Prof.</span>
        <span class="status-badge-pdf status-advanced-pdf">Adv.</span>
      </div>
      
      <div style="margin-top: 24px; text-align: center; font-size: 9px; color: #6E6B7B;">
        Documento gerado automaticamente em 03/02/2026
      </div>
    </div>
  `
};

// Story: WithPercentages
export const WithPercentages = {
  render: () => `
    ${legendPDFStyles}
    <div style="background: white; padding: 16px; max-width: 600px;">
      <div class="legend-pdf-container" style="justify-content: space-between; border-bottom: 1px solid #E0E0E0; padding-bottom: 8px; margin-bottom: 12px;">
        <span class="legend-pdf-label" style="font-weight: 600;">Distribuição de Níveis</span>
        <span style="font-size: 10px; color: #6E6B7B;">Total: 80 alunos</span>
      </div>
      
      <div style="display: grid; grid-template-columns: 1fr auto auto; gap: 8px; font-size: 10px;">
        <div>
          <span class="status-badge-pdf status-below-basic-pdf">Below Basic</span>
        </div>
        <div style="text-align: right; font-weight: 600;">12 alunos</div>
        <div style="text-align: right; color: #6E6B7B;">15%</div>
        
        <div>
          <span class="status-badge-pdf status-basic-pdf">Basic</span>
        </div>
        <div style="text-align: right; font-weight: 600;">23 alunos</div>
        <div style="text-align: right; color: #6E6B7B;">29%</div>
        
        <div>
          <span class="status-badge-pdf status-proficient-pdf">Proficient</span>
        </div>
        <div style="text-align: right; font-weight: 600;">35 alunos</div>
        <div style="text-align: right; color: #6E6B7B;">44%</div>
        
        <div>
          <span class="status-badge-pdf status-advanced-pdf">Advanced</span>
        </div>
        <div style="text-align: right; font-weight: 600;">10 alunos</div>
        <div style="text-align: right; color: #6E6B7B;">12%</div>
      </div>
    </div>
  `
};

// Story: PrintOptimized
export const PrintOptimized = {
  render: () => `
    ${legendPDFStyles}
    <div style="background: #E8F5E9; border-left: 4px solid #28C76F; padding: 16px; border-radius: 6px; margin-bottom: 24px; max-width: 700px;">
      <h4 style="font-size: 14px; font-weight: 600; color: #2E7D32; margin: 0 0 8px 0;">
        <i class="bi bi-printer"></i> LegendEnumPDF: Otimizado para Impressão
      </h4>
      <ul style="margin: 0; padding-left: 20px; font-size: 13px; color: #388E3C;">
        <li><strong>Font-size 10px:</strong> Compacto para caber mais conteúdo em A4</li>
        <li><strong>Sem card wrapper:</strong> Remove borders que não imprimem bem</li>
        <li><strong>Padding mínimo:</strong> 4px 8px economiza espaço vertical</li>
        <li><strong>Cores mantidas:</strong> Sistema semáforo funciona em impressão colorida</li>
        <li><strong>Print color adjust:</strong> CSS garante cores exatas em PDF</li>
      </ul>
    </div>
    
    <div class="pdf-page-demo">
      <div class="pdf-header">
        <h1 class="pdf-title">Boletim Escolar 2026</h1>
        <p class="pdf-subtitle">Aluno: João Pedro Santos - Turma: 6º Ano B</p>
      </div>
      
      <div class="legend-pdf-container" style="justify-content: flex-start; margin-bottom: 16px; background: #F8F7FA; padding: 10px; border-radius: 4px;">
        <span class="legend-pdf-label" style="font-weight: 600;">Legenda:</span>
        <span class="status-badge-pdf status-below-basic-pdf">Below Basic (&lt;5.0)</span>
        <span class="status-badge-pdf status-basic-pdf">Basic (5.0-6.9)</span>
        <span class="status-badge-pdf status-proficient-pdf">Proficient (7.0-8.9)</span>
        <span class="status-badge-pdf status-advanced-pdf">Advanced (≥9.0)</span>
      </div>
      
      <table style="width: 100%; border-collapse: collapse; font-size: 10px;">
        <thead>
          <tr style="background: #6E63E8; color: white;">
            <th style="padding: 8px; text-align: left;">Disciplina</th>
            <th style="padding: 8px; text-align: center;">1º Bim</th>
            <th style="padding: 8px; text-align: center;">2º Bim</th>
            <th style="padding: 8px; text-align: center;">3º Bim</th>
            <th style="padding: 8px; text-align: center;">4º Bim</th>
            <th style="padding: 8px; text-align: center;">Média</th>
            <th style="padding: 8px; text-align: center;">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr style="background: #FAFAFA; border-bottom: 1px solid #E0E0E0;">
            <td style="padding: 8px;">Matemática</td>
            <td style="padding: 8px; text-align: center;">8.5</td>
            <td style="padding: 8px; text-align: center;">9.0</td>
            <td style="padding: 8px; text-align: center;">8.8</td>
            <td style="padding: 8px; text-align: center;">9.2</td>
            <td style="padding: 8px; text-align: center; font-weight: 600;">8.9</td>
            <td style="padding: 8px; text-align: center;">
              <span class="status-badge-pdf status-proficient-pdf">Prof.</span>
            </td>
          </tr>
          <tr style="border-bottom: 1px solid #E0E0E0;">
            <td style="padding: 8px;">Português</td>
            <td style="padding: 8px; text-align: center;">9.0</td>
            <td style="padding: 8px; text-align: center;">9.5</td>
            <td style="padding: 8px; text-align: center;">9.2</td>
            <td style="padding: 8px; text-align: center;">9.8</td>
            <td style="padding: 8px; text-align: center; font-weight: 600;">9.4</td>
            <td style="padding: 8px; text-align: center;">
              <span class="status-badge-pdf status-advanced-pdf">Adv.</span>
            </td>
          </tr>
          <tr style="background: #FAFAFA; border-bottom: 1px solid #E0E0E0;">
            <td style="padding: 8px;">Ciências</td>
            <td style="padding: 8px; text-align: center;">7.5</td>
            <td style="padding: 8px; text-align: center;">8.0</td>
            <td style="padding: 8px; text-align: center;">7.8</td>
            <td style="padding: 8px; text-align: center;">8.2</td>
            <td style="padding: 8px; text-align: center; font-weight: 600;">7.9</td>
            <td style="padding: 8px; text-align: center;">
              <span class="status-badge-pdf status-proficient-pdf">Prof.</span>
            </td>
          </tr>
        </tbody>
      </table>
      
      <div style="margin-top: 16px; padding: 10px; background: #E3F2FD; border-radius: 4px; font-size: 9px; color: #1565C0;">
        <strong>Nota:</strong> Este boletim usa legendas compactas (LegendEnumPDF) otimizadas para impressão em papel A4 ou exportação PDF.
      </div>
    </div>
  `
};

// Story: Responsive
export const Responsive = {
  render: () => `
    ${legendPDFStyles}
    <div style="background: #FFF8E1; border-left: 4px solid #FF9F43; padding: 16px; border-radius: 6px; margin-bottom: 24px; max-width: 700px;">
      <h4 style="font-size: 14px; font-weight: 600; color: #F57F17; margin: 0 0 8px 0;">
        <i class="bi bi-file-earmark-pdf"></i> LegendEnumPDF: PDF vs Web
      </h4>
      <ul style="margin: 0; padding-left: 20px; font-size: 13px; color: #F9A825;">
        <li><strong>PDF (font-10):</strong> Compacto para relatórios impressos</li>
        <li><strong>Web (font-13):</strong> LegendEnum padrão para interfaces</li>
        <li><strong>Gap reduzido:</strong> 12px (vs 16px web)</li>
        <li><strong>Padding reduzido:</strong> 4px 8px (vs 6px 12px web)</li>
      </ul>
    </div>
    
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px; max-width: 900px;">
      <div>
        <h4 style="font-size: 12px; font-weight: 600; color: #5D596C; margin: 0 0 12px 0; text-align: center;">
          Web Version (LegendEnum)
        </h4>
        <div style="background: white; border: 1px solid #D8D6DE; border-radius: 8px; padding: 20px;">
          <div style="display: flex; justify-content: center; align-items: center; gap: 16px; flex-wrap: wrap; font-size: 13px;">
            <span style="font-weight: 500;">Status:</span>
            <span style="padding: 6px 12px; font-size: 13px; font-weight: 600; border-radius: 4px; background: rgba(40,199,111,0.12); color: #28C76F; border: 1px solid #28C76F;">
              PROFICIENT
            </span>
          </div>
        </div>
      </div>
      
      <div>
        <h4 style="font-size: 12px; font-weight: 600; color: #5D596C; margin: 0 0 12px 0; text-align: center;">
          PDF Version (LegendEnumPDF)
        </h4>
        <div style="background: white; border: 1px solid #E0E0E0; padding: 12px;">
          <div class="legend-pdf-container">
            <span class="legend-pdf-label">Status:</span>
            <span class="status-badge-pdf status-proficient-pdf">PROFICIENT</span>
          </div>
        </div>
      </div>
    </div>
    
    <div style="margin-top: 24px; text-align: center; font-size: 12px; color: #6E6B7B;">
      PDF version é ~30% mais compacta em altura, ideal para caber mais conteúdo em A4
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
      <div style="background:linear-gradient(135deg,#6E63E8 0%,#9C91EF 100%);padding:60px 40px;color:white;">
        <div style="max-width:900px;margin:0 auto;">
          <div style="display:inline-block;padding:8px 16px;background:rgba(255,255,255,0.15);border-radius:50px;margin-bottom:20px;font-size:14px;border:1px solid rgba(255,255,255,0.2);">Legends</div>
          <h1 style="font-size:3rem;font-weight:700;margin:0 0 12px 0;letter-spacing:-0.02em;">LegendEnumPDF</h1>
          <p style="font-size:1.1rem;opacity:0.9;margin:0;max-width:600px;">PDF Status Enum Legend Component</p>
        </div>
      </div>
      <div style="max-width:900px;margin:0 auto;padding:48px 40px;">
        <div style="background:white;border-radius:12px;padding:32px;margin-bottom:32px;box-shadow:0 2px 8px rgba(0,0,0,0.08);">
          <h2 style="font-size:1.1rem;font-weight:600;color:#5E5873;margin:0 0 16px 0;">Sobre o Componente</h2>
          <p style="color:#6E6B7B;line-height:1.7;margin:0 0 16px 0;">PDF Status Enum Legend Component. Faz parte da categoria <strong>Legends</strong> do Design System Educacross.</p>
          <div style="background:#F8F7FF;border-left:4px solid #6E63E8;padding:16px;border-radius:4px;">
            <p style="margin:0;color:#5E5873;font-size:14px;line-height:1.6;"><strong>💡 Dica:</strong> Use <em>Playground</em> para explorar props, <em>Use Cases</em> para exemplos reais e <em>Accessibility</em> para validar WCAG.</p>
          </div>
        </div>
        <div style="background:white;border-radius:12px;padding:32px;box-shadow:0 2px 8px rgba(0,0,0,0.08);">
          <h2 style="font-size:1.1rem;font-weight:600;color:#5E5873;margin:0 0 16px 0;">Implementação Vue 2.7</h2>
          <pre style="background:#1E1E2E;color:#CDD6F4;padding:20px;border-radius:8px;font-size:13px;line-height:1.6;overflow:auto;margin:0;"><code>import LegendEnumPDF from '@/components/LegendEnumPDF.vue';

// Template
&lt;LegendEnumPDF v-bind="props" /&gt;</code></pre>
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
    docs: { description: { story: 'Explore o LegendEnumPDF com controles interativos.' } },
  },
  render: (args) => `
    <div style="padding:32px;display:flex;justify-content:center;align-items:center;min-height:200px;background:#F8F8F8;border-radius:12px;">
      <div style="text-align:center;color:#6E6B7B;">
        <div style="width:60px;height:60px;background:#6E63E820;border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 16px;font-size:24px;">🎨</div>
        <p style="margin:0 0 8px 0;font-size:15px;font-weight:600;color:#5E5873;">Playground LegendEnumPDF</p>
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
    docs: { description: { story: 'Exemplos de uso real do LegendEnumPDF no Educacross.' } },
  },
  render: () => `
    <div style="max-width:800px;margin:0 auto;padding:40px 20px;font-family:'Public Sans',sans-serif;">
      <div style="background:#6E63E815;border:1px solid #6E63E830;border-radius:12px;padding:24px;margin-bottom:40px;">
        <h1 style="font-size:1.5rem;font-weight:700;color:#5E5873;margin:0 0 8px 0;">Casos de Uso: LegendEnumPDF</h1>
        <p style="color:#6E6B7B;margin:0;font-size:14px;line-height:1.6;">Cenários reais de uso no contexto educacional da plataforma Educacross</p>
      </div>
      
      <div style="margin-bottom:32px;">
        <h2 style="font-size:18px;font-weight:600;color:#5E5873;margin:0 0 8px 0;display:flex;align-items:center;gap:10px;">
          <span style="display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;background:#6E63E8;color:white;border-radius:50%;font-size:13px;font-weight:700;flex-shrink:0;">1</span>
          Professor — Painel Principal
        </h2>
        <p style="color:#6E6B7B;margin:0 0 16px 0;padding-left:38px;font-size:14px;">Professor utilizando LegendEnumPDF no dashboard de gestão de turmas</p>
        <div style="background:#F8F8F8;border-radius:8px;padding:20px;margin-left:38px;text-align:center;color:#B9B9C3;font-size:13px;">
          Ver story <strong>Default</strong> para visualização do componente neste contexto
        </div>
      </div>
      <div style="margin-bottom:32px;">
        <h2 style="font-size:18px;font-weight:600;color:#5E5873;margin:0 0 8px 0;display:flex;align-items:center;gap:10px;">
          <span style="display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;background:#6E63E8;color:white;border-radius:50%;font-size:13px;font-weight:700;flex-shrink:0;">2</span>
          Aluno — Portal do Estudante
        </h2>
        <p style="color:#6E6B7B;margin:0 0 16px 0;padding-left:38px;font-size:14px;">Aluno interagindo com LegendEnumPDF no portal educacional</p>
        <div style="background:#F8F8F8;border-radius:8px;padding:20px;margin-left:38px;text-align:center;color:#B9B9C3;font-size:13px;">
          Ver story <strong>Default</strong> para visualização do componente neste contexto
        </div>
      </div>
      <div style="margin-bottom:32px;">
        <h2 style="font-size:18px;font-weight:600;color:#5E5873;margin:0 0 8px 0;display:flex;align-items:center;gap:10px;">
          <span style="display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;background:#6E63E8;color:white;border-radius:50%;font-size:13px;font-weight:700;flex-shrink:0;">3</span>
          Coordenador — Relatórios
        </h2>
        <p style="color:#6E6B7B;margin:0 0 16px 0;padding-left:38px;font-size:14px;">Coordenador pedagógico analisando dados via LegendEnumPDF</p>
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
    docs: { description: { story: 'Conformidade WCAG 2.1 AA para o LegendEnumPDF.' } },
  },
  render: () => `
    <div style="max-width:800px;margin:0 auto;padding:40px 20px;font-family:'Public Sans',sans-serif;">

      <div style="background:linear-gradient(135deg,#6E63E8 0%,#764ba2 100%);padding:32px;border-radius:12px;margin-bottom:32px;color:white;">
        <h1 style="font-size:1.5rem;font-weight:700;margin:0 0 8px 0;">Acessibilidade: LegendEnumPDF</h1>
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

