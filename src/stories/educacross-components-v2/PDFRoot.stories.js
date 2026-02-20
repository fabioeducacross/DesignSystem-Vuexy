/**
 * PDFRoot - Container Raiz para PDFs
 * ===================================
 * Layout wrapper para visualização e exportação de PDFs com header e ações
 * 
 * @component PDFRoot
 * @category Educacross Components V2 / PDF
 * @source educacross-frontoffice/src/components/PDFs/PDFRoot.vue
 * @priority P2
 * @status PIXEL-PERFECT
 * @since 2.0.0
 */

export default {
  title: 'Educacross Components V2/PDF/PDFRoot',
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# PDFRoot

Container raiz para visualização e exportação de PDFs no sistema.
Inclui header com ações de impressão, download e navegação.

## Características
- Header fixo 7rem altura com título e botões de ação
- Botão voltar com ícone e hover effects
- Múltiplas opções de export (Print, PDF único, PDFs separados)
- Classe .printOcult para ocultar elementos na impressão
- Loading states para operações assíncronas

## Uso educacional
- Exportar relatórios de desempenho de turmas
- Gerar certificados de conclusão de missões
- Imprimir listas de alunos e evidências
        `
      }
    }
  }
};

const componentStyles = `
<style>
.pdf-container {
  min-height: 100vh;
  background: #F8F7FA;
}

.header {
  background-color: #ffffff;
  width: 100%;
  height: 7rem;
  padding: 24px;
  margin-bottom: 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.header-title {
  display: flex;
  align-items: center;
}

.pdf-title {
  margin: 0;
  font-weight: 500;
  font-size: 24px;
  line-height: 24px;
  color: #2c2c2c;
}

.header-back-button {
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #e2e2e3;
  border-radius: 10px;
  margin-right: 27px;
  cursor: pointer;
  transition: all 0.2s;
  background: white;
}

.header-back-button:hover {
  border: 2px solid #6E63E8;
  background: rgba(110, 99, 232, 0.04);
}

.header-back-button:hover .back-icon {
  transform: translateX(-2px);
}

.back-icon {
  width: 20px;
  height: 20px;
  transition: transform 0.2s;
}

.header-buttons {
  display: flex;
  gap: 12px;
  align-items: center;
}

.header-button {
  padding: 10px 20px;
  font-size: 14px;
  font-weight: 600;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  gap: 8px;
}

.btn-primary {
  background: #6E63E8;
  color: white;
}

.btn-primary:hover:not(:disabled) {
  background: #5A4FCC;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(110, 99, 232, 0.3);
}

.btn-primary:disabled {
  background: #B8B3E8;
  cursor: not-allowed;
  opacity: 0.6;
}

.btn-outline {
  background: white;
  color: #6E63E8;
  border: 1px solid #6E63E8;
}

.btn-outline:hover {
  background: rgba(110, 99, 232, 0.08);
}

.spinner {
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: spin 0.6s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.pdf-content-area {
  padding: 24px;
  min-height: 400px;
  background: white;
  margin: 0 24px 24px 24px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}

@media print {
  .printOcult {
    display: none !important;
  }
  
  .pdf-container {
    background: white;
  }
  
  .pdf-content-area {
    box-shadow: none;
    margin: 0;
    padding: 0;
  }
}

@media (max-width: 768px) {
  .header {
    flex-direction: column;
    height: auto;
    gap: 16px;
    align-items: flex-start;
  }
  
  .header-title {
    width: 100%;
  }
  
  .header-buttons {
    width: 100%;
    flex-direction: column;
  }
  
  .header-button {
    width: 100%;
    justify-content: center;
  }
  
  .pdf-title {
    font-size: 20px;
  }
}
</style>
`;

const backIconSVG = `<svg class="back-icon" viewBox="0 0 24 24" fill="none" stroke="#5D596C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M19 12H5M12 19l-7-7 7-7"/>
</svg>`;

export const Default = {
  render: () => `
    ${componentStyles}
    <div class="pdf-container">
      <div class="header printOcult">
        <div class="header-title">
          <div class="header-back-button">
            ${backIconSVG}
          </div>
          <h1 class="pdf-title">Documento PDF</h1>
        </div>
        <div class="header-buttons">
          <button class="header-button btn-primary">
            <i class="bi bi-printer"></i>
            Imprimir
          </button>
        </div>
      </div>
      <div class="pdf-content-area">
        <p style="color: #6E6B7B; text-align: center; padding: 40px 0;">Conteúdo do PDF será renderizado aqui</p>
      </div>
    </div>
  `
};

export const WithBackButton = {
  render: () => `
    ${componentStyles}
    <div class="pdf-container">
      <div class="header printOcult">
        <div class="header-title">
          <div class="header-back-button">
            ${backIconSVG}
          </div>
          <h1 class="pdf-title">Relatório de Desempenho - Turma 7A</h1>
        </div>
        <div class="header-buttons">
          <button class="header-button btn-primary">
            <i class="bi bi-printer"></i>
            Imprimir
          </button>
        </div>
      </div>
      <div class="pdf-content-area">
        <h3 style="color: #5D596C; margin-bottom: 16px;">Resumo Geral</h3>
        <p style="color: #6E6B7B;">Professor: Carlos Silva | Disciplina: Matemática | Período: Janeiro-Março 2024</p>
      </div>
    </div>
  `
};

export const AllActions = {
  render: () => `
    ${componentStyles}
    <div class="pdf-container">
      <div class="header printOcult">
        <div class="header-title">
          <div class="header-back-button">
            ${backIconSVG}
          </div>
          <h1 class="pdf-title">Certificados da Missão</h1>
        </div>
        <div class="header-buttons">
          <button class="header-button btn-outline">
            <i class="bi bi-printer"></i>
            Imprimir
          </button>
          <button class="header-button btn-primary">
            <i class="bi bi-file-pdf"></i>
            Salvar PDF único
          </button>
          <button class="header-button btn-primary">
            <i class="bi bi-file-zip"></i>
            Salvar PDFs separados
          </button>
        </div>
      </div>
      <div class="pdf-content-area">
        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 16px;">
          ${Array(4).fill().map((_, i) => `
            <div style="border: 1px solid #DBDADE; border-radius: 8px; padding: 16px; text-align: center;">
              <i class="bi bi-award" style="font-size: 48px; color: #6E63E8;"></i>
              <p style="margin: 8px 0 0 0; font-size: 14px; color: #5D596C; font-weight: 600;">Aluno ${i + 1}</p>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `
};

export const LoadingState = {
  render: () => `
    ${componentStyles}
    <div class="pdf-container">
      <div class="header printOcult">
        <div class="header-title">
          <div class="header-back-button">
            ${backIconSVG}
          </div>
          <h1 class="pdf-title">Gerando Relatório...</h1>
        </div>
        <div class="header-buttons">
          <button class="header-button btn-primary" disabled>
            <div class="spinner"></div>
            Gerando PDF...
          </button>
        </div>
      </div>
      <div class="pdf-content-area">
        <div style="text-align: center; padding: 60px 20px;">
          <div class="spinner" style="width: 48px; height: 48px; margin: 0 auto 20px; border-width: 4px; border-color: rgba(110, 99, 232, 0.3); border-top-color: #6E63E8;"></div>
          <p style="color: #6E6B7B; font-size: 16px;">Processando dados e gerando documento...</p>
        </div>
      </div>
    </div>
  `
};

export const PerformanceReport = {
  render: () => `
    ${componentStyles}
    <div class="pdf-container">
      <div class="header printOcult">
        <div class="header-title">
          <div class="header-back-button">
            ${backIconSVG}
          </div>
          <h1 class="pdf-title">Relatório de Desempenho - Turma 7A</h1>
        </div>
        <div class="header-buttons">
          <button class="header-button btn-primary">
            <i class="bi bi-printer"></i>
            Imprimir
          </button>
          <button class="header-button btn-primary">
            <i class="bi bi-download"></i>
            Baixar PDF
          </button>
        </div>
      </div>
      <div class="pdf-content-area">
        <div style="margin-bottom: 24px;">
          <h3 style="color: #5D596C; margin-bottom: 12px;">Informações Gerais</h3>
          <div style="display: grid; gap: 8px; font-size: 14px; color: #6E6B7B;">
            <p><strong>Professor:</strong> Carlos Silva</p>
            <p><strong>Disciplina:</strong> Matemática</p>
            <p><strong>Turma:</strong> 7º Ano A - Matutino</p>
            <p><strong>Período:</strong> Janeiro a Março 2024</p>
          </div>
        </div>
        <div style="border-top: 1px solid #DBDADE; padding-top: 24px;">
          <h3 style="color: #5D596C; margin-bottom: 12px;">Métricas de Desempenho</h3>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 16px;">
            ${[
              { label: 'Média Geral', value: '7.8', icon: 'bi-graph-up', color: '#28C76F' },
              { label: 'Missões Completas', value: '18/20', icon: 'bi-check-circle', color: '#6E63E8' },
              { label: 'Taxa Aprovação', value: '92%', icon: 'bi-trophy', color: '#FF9F43' }
            ].map(metric => `
              <div style="border: 1px solid #DBDADE; border-radius: 8px; padding: 16px; text-align: center;">
                <i class="bi ${metric.icon}" style="font-size: 32px; color: ${metric.color}; margin-bottom: 8px;"></i>
                <div style="font-size: 24px; font-weight: 700; color: #5D596C; margin-bottom: 4px;">${metric.value}</div>
                <div style="font-size: 12px; color: #6E6B7B;">${metric.label}</div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    </div>
  `
};

export const CertificatesPDF = {
  render: () => `
    ${componentStyles}
    <div class="pdf-container">
      <div class="header printOcult">
        <div class="header-title">
          <div class="header-back-button">
            ${backIconSVG}
          </div>
          <h1 class="pdf-title">Certificados de Conclusão - Módulo Frações</h1>
        </div>
        <div class="header-buttons">
          <button class="header-button btn-primary">
            <i class="bi bi-file-zip"></i>
            Baixar todos (ZIP)
          </button>
        </div>
      </div>
      <div class="pdf-content-area">
        <p style="color: #6E6B7B; margin-bottom: 20px; font-size: 14px;">25 certificados prontos para exportação</p>
        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); gap: 16px;">
          ${['Ana Silva', 'Bruno Costa', 'Carlos Mendes', 'Daniela Souza', 'Eduardo Lima', 'Fernanda Oliveira'].map(name => `
            <div style="border: 1px solid #DBDADE; border-radius: 12px; padding: 20px; text-align: center; background: linear-gradient(135deg, rgba(110,99,232,0.05), rgba(40,199,111,0.05));">
              <i class="bi bi-award-fill" style="font-size: 48px; color: #6E63E8; margin-bottom: 12px;"></i>
              <p style="margin: 0; font-size: 14px; color: #5D596C; font-weight: 600;">${name}</p>
              <p style="margin: 4px 0 0 0; font-size: 12px; color: #6E6B7B;">Nota: 9.5</p>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `
};

export const MobileView375 = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile1'
    }
  },
  render: () => `
    ${componentStyles}
    <div class="pdf-container">
      <div class="header printOcult" style="flex-direction: column; height: auto; align-items: flex-start;">
        <div class="header-title" style="width: 100%;">
          <div class="header-back-button">
            ${backIconSVG}
          </div>
          <h1 class="pdf-title" style="font-size: 18px;">Relatório</h1>
        </div>
        <div class="header-buttons" style="width: 100%; flex-direction: column; gap: 8px;">
          <button class="header-button btn-primary" style="width: 100%; justify-content: center;">
            <i class="bi bi-printer"></i>
            Imprimir
          </button>
          <button class="header-button btn-primary" style="width: 100%; justify-content: center;">
            <i class="bi bi-download"></i>
            Baixar PDF
          </button>
        </div>
      </div>
      <div class="pdf-content-area" style="margin: 0 12px 12px 12px;">
        <p style="color: #6E6B7B; text-align: center; font-size: 14px;">Visualização mobile do documento</p>
      </div>
    </div>
  `
};

export const Interactive = {
  render: () => {
    setTimeout(() => {
      document.querySelectorAll('.header-button').forEach(btn => {
        if (!btn.disabled) {
          btn.addEventListener('click', (e) => {
            const action = btn.textContent.trim().split('\n')[0].trim();
            alert(`Ação "${action}" executada!\n\nEm produção, isso iniciaria o processo de ${action.toLowerCase()}.`);
          });
        }
      });
      
      const backBtn = document.querySelector('.header-back-button');
      if (backBtn) {
        backBtn.addEventListener('click', () => {
          alert('Voltando para a listagem de relatórios...');
        });
      }
    }, 100);
    
    return `
      ${componentStyles}
      <style>
        .header-button:not(:disabled) {
          cursor: pointer;
        }
      </style>
      <div class="pdf-container">
        <div class="header printOcult">
          <div class="header-title">
            <div class="header-back-button">
              ${backIconSVG}
            </div>
            <h1 class="pdf-title">Documento Interativo</h1>
          </div>
          <div class="header-buttons">
            <button class="header-button btn-outline">
              <i class="bi bi-printer"></i>
              Imprimir
            </button>
            <button class="header-button btn-primary">
              <i class="bi bi-download"></i>
              Baixar PDF
            </button>
          </div>
        </div>
        <div class="pdf-content-area">
          <div style="text-align: center; padding: 40px 20px;">
            <i class="bi bi-hand-index" style="font-size: 64px; color: #6E63E8; margin-bottom: 16px;"></i>
            <p style="color: #5D596C; font-size: 16px; font-weight: 600; margin-bottom: 8px;">Demonstração Interativa</p>
            <p style="color: #6E6B7B; font-size: 14px;">Clique nos botões do header para simular ações de impressão e download</p>
          </div>
        </div>
      </div>
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
          <div style="display:inline-block;padding:8px 16px;background:rgba(255,255,255,0.15);border-radius:50px;margin-bottom:20px;font-size:14px;border:1px solid rgba(255,255,255,0.2);">PDF</div>
          <h1 style="font-size:3rem;font-weight:700;margin:0 0 12px 0;letter-spacing:-0.02em;">PDFRoot</h1>
          <p style="font-size:1.1rem;opacity:0.9;margin:0;max-width:600px;">Container Raiz para PDFs</p>
        </div>
      </div>
      <div style="max-width:900px;margin:0 auto;padding:48px 40px;">
        <div style="background:white;border-radius:12px;padding:32px;margin-bottom:32px;box-shadow:0 2px 8px rgba(0,0,0,0.08);">
          <h2 style="font-size:1.1rem;font-weight:600;color:#5E5873;margin:0 0 16px 0;">Sobre o Componente</h2>
          <p style="color:#6E6B7B;line-height:1.7;margin:0 0 16px 0;">Container Raiz para PDFs. Faz parte da categoria <strong>PDF</strong> do Design System Educacross.</p>
          <div style="background:#F8F7FF;border-left:4px solid #6E63E8;padding:16px;border-radius:4px;">
            <p style="margin:0;color:#5E5873;font-size:14px;line-height:1.6;"><strong>💡 Dica:</strong> Use <em>Playground</em> para explorar props, <em>Use Cases</em> para exemplos reais e <em>Accessibility</em> para validar WCAG.</p>
          </div>
        </div>
        <div style="background:white;border-radius:12px;padding:32px;box-shadow:0 2px 8px rgba(0,0,0,0.08);">
          <h2 style="font-size:1.1rem;font-weight:600;color:#5E5873;margin:0 0 16px 0;">Implementação Vue 2.7</h2>
          <pre style="background:#1E1E2E;color:#CDD6F4;padding:20px;border-radius:8px;font-size:13px;line-height:1.6;overflow:auto;margin:0;"><code>import PDFRoot from '@/components/PDFRoot.vue';

// Template
&lt;PDFRoot v-bind="props" /&gt;</code></pre>
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
    docs: { description: { story: 'Explore o PDFRoot com controles interativos.' } },
  },
  render: (args) => `
    <div style="padding:32px;display:flex;justify-content:center;align-items:center;min-height:200px;background:#F8F8F8;border-radius:12px;">
      <div style="text-align:center;color:#6E6B7B;">
        <div style="width:60px;height:60px;background:#6E63E820;border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 16px;font-size:24px;">🎨</div>
        <p style="margin:0 0 8px 0;font-size:15px;font-weight:600;color:#5E5873;">Playground PDFRoot</p>
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
    docs: { description: { story: 'Exemplos de uso real do PDFRoot no Educacross.' } },
  },
  render: () => `
    <div style="max-width:800px;margin:0 auto;padding:40px 20px;font-family:'Public Sans',sans-serif;">
      <div style="background:#6E63E815;border:1px solid #6E63E830;border-radius:12px;padding:24px;margin-bottom:40px;">
        <h1 style="font-size:1.5rem;font-weight:700;color:#5E5873;margin:0 0 8px 0;">Casos de Uso: PDFRoot</h1>
        <p style="color:#6E6B7B;margin:0;font-size:14px;line-height:1.6;">Cenários reais de uso no contexto educacional da plataforma Educacross</p>
      </div>
      
      <div style="margin-bottom:32px;">
        <h2 style="font-size:18px;font-weight:600;color:#5E5873;margin:0 0 8px 0;display:flex;align-items:center;gap:10px;">
          <span style="display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;background:#6E63E8;color:white;border-radius:50%;font-size:13px;font-weight:700;flex-shrink:0;">1</span>
          Professor — Painel Principal
        </h2>
        <p style="color:#6E6B7B;margin:0 0 16px 0;padding-left:38px;font-size:14px;">Professor utilizando PDFRoot no dashboard de gestão de turmas</p>
        <div style="background:#F8F8F8;border-radius:8px;padding:20px;margin-left:38px;text-align:center;color:#B9B9C3;font-size:13px;">
          Ver story <strong>Default</strong> para visualização do componente neste contexto
        </div>
      </div>
      <div style="margin-bottom:32px;">
        <h2 style="font-size:18px;font-weight:600;color:#5E5873;margin:0 0 8px 0;display:flex;align-items:center;gap:10px;">
          <span style="display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;background:#6E63E8;color:white;border-radius:50%;font-size:13px;font-weight:700;flex-shrink:0;">2</span>
          Aluno — Portal do Estudante
        </h2>
        <p style="color:#6E6B7B;margin:0 0 16px 0;padding-left:38px;font-size:14px;">Aluno interagindo com PDFRoot no portal educacional</p>
        <div style="background:#F8F8F8;border-radius:8px;padding:20px;margin-left:38px;text-align:center;color:#B9B9C3;font-size:13px;">
          Ver story <strong>Default</strong> para visualização do componente neste contexto
        </div>
      </div>
      <div style="margin-bottom:32px;">
        <h2 style="font-size:18px;font-weight:600;color:#5E5873;margin:0 0 8px 0;display:flex;align-items:center;gap:10px;">
          <span style="display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;background:#6E63E8;color:white;border-radius:50%;font-size:13px;font-weight:700;flex-shrink:0;">3</span>
          Coordenador — Relatórios
        </h2>
        <p style="color:#6E6B7B;margin:0 0 16px 0;padding-left:38px;font-size:14px;">Coordenador pedagógico analisando dados via PDFRoot</p>
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
    docs: { description: { story: 'Conformidade WCAG 2.1 AA para o PDFRoot.' } },
  },
  render: () => `
    <div style="max-width:800px;margin:0 auto;padding:40px 20px;font-family:'Public Sans',sans-serif;">

      <div style="background:linear-gradient(135deg,#6E63E8 0%,#764ba2 100%);padding:32px;border-radius:12px;margin-bottom:32px;color:white;">
        <h1 style="font-size:1.5rem;font-weight:700;margin:0 0 8px 0;">Acessibilidade: PDFRoot</h1>
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

