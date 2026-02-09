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
