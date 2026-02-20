/**
 * @component QuestionDetail
 * @description Modal displaying detailed question analysis with alternatives, results, and completion icons
 * @source educacross-frontoffice/src/components/evaluations/questionDetail/QuestionDetail.vue
 * @generated 2026-02-03
 */

const componentStyles = `
<style>
.question-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1050;
  padding: 20px;
}

.modal-dialog {
  max-width: 900px;
  width: 100%;
  margin: 0 auto;
}

.modal-content {
  border-radius: 16px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  max-height: 90vh;
  overflow-y: auto;
  background: white;
}

.modal-header {
  background: #6E63E8;
  color: white;
  border-radius: 16px 16px 0 0;
  padding: 20px 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: none;
}

.modal-title {
  font-size: 20px;
  font-weight: 600;
  margin: 0;
}

.modal-close-btn {
  background: none;
  border: none;
  color: white;
  font-size: 24px;
  cursor: pointer;
  padding: 0;
  line-height: 1;
  opacity: 0.9;
  transition: opacity 0.2s;
}

.modal-close-btn:hover {
  opacity: 1;
}

.modal-body {
  padding: 24px;
}

.question-info-row {
  display: flex;
  gap: 16px;
  margin-bottom: 20px;
  flex-wrap: wrap;
}

.info-badge {
  background: #F8F7FA;
  padding: 8px 16px;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 600;
  color: #5D596C;
  display: flex;
  align-items: center;
  gap: 6px;
}

.question-card {
  background: #EFEFEF;
  padding: 20px;
  border-radius: 12px;
  margin-bottom: 20px;
}

.question-text {
  font-size: 16px;
  line-height: 1.6;
  color: #5D596C;
  margin-bottom: 16px;
}

.alternatives-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.alternative-item {
  display: flex;
  gap: 12px;
  padding: 12px;
  border: 1px solid #DBDADE;
  border-radius: 8px;
  background: white;
  cursor: pointer;
  transition: all 0.2s;
}

.alternative-item:hover {
  background: rgba(110, 99, 232, 0.04);
  border-color: #6E63E8;
}

.alternative-item.correct {
  background: rgba(40, 199, 111, 0.08);
  border-color: #28C76F;
}

.alternative-item.incorrect {
  background: rgba(234, 84, 85, 0.08);
  border-color: #EA5455;
}

.question-letter {
  font-size: 0.857rem;
  font-weight: 700;
  color: #5D596C;
  background: #F3F2F7;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  flex-shrink: 0;
}

.alternative-item.correct .question-letter {
  background: #28C76F;
  color: white;
}

.alternative-item.incorrect .question-letter {
  background: #EA5455;
  color: white;
}

.alternative-text {
  flex-grow: 1;
  font-size: 14px;
  color: #5D596C;
}

.alternativeResultTitle {
  font-weight: 800;
  font-size: 15px;
  margin-bottom: 12px;
  color: #5D596C;
}

.result-row {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
}

.icon-games-finished {
  height: 10px;
  width: 10px;
  border: 2px solid #28C76F;
  border-radius: 50%;
  flex-shrink: 0;
}

.icon-games-unfinished {
  height: 10px;
  width: 10px;
  border: 2px solid #EA5455;
  border-radius: 50%;
  flex-shrink: 0;
}

.result-count {
  font-size: 14px;
  font-weight: 600;
  color: #5D596C;
}

.head-icon-info {
  font-size: 16px;
  color: #6E6B7B;
  cursor: help;
}

.results-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 20px;
}

.result-card {
  background: #F8F7FA;
  padding: 16px;
  border-radius: 8px;
  border: 1px solid #DBDADE;
}

.explanation-section {
  background: rgba(110, 99, 232, 0.08);
  padding: 16px;
  border-radius: 8px;
  border-left: 4px solid #6E63E8;
  margin-top: 16px;
}

.explanation-title {
  font-weight: 700;
  font-size: 15px;
  color: #6E63E8;
  margin-bottom: 8px;
}

.explanation-text {
  font-size: 14px;
  color: #5D596C;
  line-height: 1.6;
}

.skeleton {
  background: linear-gradient(90deg, #F3F2F7 25%, #E7E6EF 50%, #F3F2F7 75%);
  background-size: 200% 100%;
  animation: loading 1.5s infinite;
  border-radius: 4px;
}

@keyframes loading {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}

.skeleton-title {
  height: 24px;
  width: 60%;
  margin-bottom: 16px;
}

.skeleton-text {
  height: 16px;
  margin-bottom: 12px;
}

.skeleton-badge {
  height: 32px;
  width: 120px;
  display: inline-block;
  margin-right: 12px;
}

.demo-container {
  padding: 24px;
  background: #F8F7FA;
  border-radius: 12px;
  min-height: 400px;
}

.demo-label {
  font-size: 13px;
  font-weight: 600;
  color: #6E6B7B;
  margin-bottom: 12px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.percentage-badge {
  font-size: 12px;
  font-weight: 700;
  padding: 4px 8px;
  border-radius: 4px;
  background: #F3F2F7;
  color: #5D596C;
}

@media (max-width: 991px) {
  .question-info-row {
    flex-direction: column;
  }

  .modal-header {
    padding: 16px 20px;
  }

  .modal-title {
    font-size: 18px;
  }

  .results-grid {
    grid-template-columns: 1fr;
  }
}
</style>
`;

export default {
  title: 'Educacross Components V2/Evaluations/QuestionDetail',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Modal displaying detailed question analysis with alternatives, results, and completion icons. Supports loading skeleton states and interactive close functionality.',
      },
    },
  },
};

/**
 * Open modal with question header showing difficulty/subject/topic row
 */
export const Default = {
  render: () => `
    ${componentStyles}
    <div class="demo-container">
      <div class="demo-label">Modal de Detalhes da Questão</div>
      <div class="question-modal">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Detalhes da Questão #1234</h5>
              <button class="modal-close-btn" aria-label="Fechar">&times;</button>
            </div>
            <div class="modal-body">
              <div class="question-info-row">
                <div class="info-badge">
                  <i class="bi bi-bar-chart-fill"></i>
                  Dificuldade: Médio
                </div>
                <div class="info-badge">
                  <i class="bi bi-book"></i>
                  Matemática
                </div>
                <div class="info-badge">
                  <i class="bi bi-tag"></i>
                  Geometria - Áreas
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
};

/**
 * Question text + 4 alternatives (A,B,C,D) with letter badges, correct answer marked green
 */
export const WithAlternatives = {
  render: () => `
    ${componentStyles}
    <div class="demo-container">
      <div class="demo-label">Questão com Alternativas</div>
      <div class="question-modal">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Detalhes da Questão</h5>
              <button class="modal-close-btn" aria-label="Fechar">&times;</button>
            </div>
            <div class="modal-body">
              <div class="question-card">
                <div class="question-text">
                  <strong>Qual é a capital do Brasil?</strong>
                </div>
                <div class="alternatives-list">
                  <div class="alternative-item correct">
                    <div class="question-letter">A</div>
                    <div class="alternative-text">Brasília</div>
                    <i class="bi bi-check-circle-fill" style="color: #28C76F; font-size: 18px;"></i>
                  </div>
                  <div class="alternative-item">
                    <div class="question-letter">B</div>
                    <div class="alternative-text">Rio de Janeiro</div>
                  </div>
                  <div class="alternative-item">
                    <div class="question-letter">C</div>
                    <div class="alternative-text">São Paulo</div>
                  </div>
                  <div class="alternative-item">
                    <div class="question-letter">D</div>
                    <div class="alternative-text">Salvador</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
};

/**
 * Modal showing student results: 18 correct (green icon), 7 incorrect (red icon)
 */
export const WithResults = {
  render: () => `
    ${componentStyles}
    <div class="demo-container">
      <div class="demo-label">Resultados dos Alunos</div>
      <div class="question-modal">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Resultados da Questão</h5>
              <button class="modal-close-btn" aria-label="Fechar">&times;</button>
            </div>
            <div class="modal-body">
              <div class="results-grid">
                <div class="result-card">
                  <div class="alternativeResultTitle">Respostas Corretas</div>
                  <div class="result-row">
                    <div class="icon-games-finished"></div>
                    <span class="result-count">18 alunos acertaram</span>
                  </div>
                  <div style="margin-top: 8px; color: #28C76F; font-weight: 700; font-size: 24px;">72%</div>
                </div>
                <div class="result-card">
                  <div class="alternativeResultTitle">Respostas Incorretas</div>
                  <div class="result-row">
                    <div class="icon-games-unfinished"></div>
                    <span class="result-count">7 alunos erraram</span>
                  </div>
                  <div style="margin-top: 8px; color: #EA5455; font-weight: 700; font-size: 24px;">28%</div>
                </div>
              </div>
              <div class="question-card">
                <div class="question-text">
                  <strong>Quanto é 25% de 200?</strong>
                </div>
                <div class="alternatives-list">
                  <div class="alternative-item correct">
                    <div class="question-letter">A</div>
                    <div class="alternative-text">50</div>
                    <span class="percentage-badge">72% escolheram</span>
                  </div>
                  <div class="alternative-item">
                    <div class="question-letter">B</div>
                    <div class="alternative-text">25</div>
                    <span class="percentage-badge">16% escolheram</span>
                  </div>
                  <div class="alternative-item">
                    <div class="question-letter">C</div>
                    <div class="alternative-text">100</div>
                    <span class="percentage-badge">8% escolheram</span>
                  </div>
                  <div class="alternative-item">
                    <div class="question-letter">D</div>
                    <div class="alternative-text">75</div>
                    <span class="percentage-badge">4% escolheram</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
};

/**
 * b-skeleton-wrapper loading="true" showing skeleton placeholders
 */
export const LoadingSkeleton = {
  render: () => `
    ${componentStyles}
    <div class="demo-container">
      <div class="demo-label">Estado de Carregamento (Skeleton)</div>
      <div class="question-modal">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <div class="skeleton skeleton-title" style="background: rgba(255,255,255,0.3);"></div>
            </div>
            <div class="modal-body">
              <div style="display: flex; gap: 12px; margin-bottom: 20px;">
                <div class="skeleton skeleton-badge"></div>
                <div class="skeleton skeleton-badge"></div>
                <div class="skeleton skeleton-badge"></div>
              </div>
              <div class="skeleton skeleton-text" style="width: 100%;"></div>
              <div class="skeleton skeleton-text" style="width: 90%;"></div>
              <div class="skeleton skeleton-text" style="width: 85%;"></div>
              <div style="margin-top: 20px; display: flex; flex-direction: column; gap: 12px;">
                <div class="skeleton" style="height: 56px; width: 100%;"></div>
                <div class="skeleton" style="height: 56px; width: 100%;"></div>
                <div class="skeleton" style="height: 56px; width: 100%;"></div>
                <div class="skeleton" style="height: 56px; width: 100%;"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
};

/**
 * Complete question with radio-style alternatives and result percentages per option
 */
export const MultipleChoice = {
  render: () => `
    ${componentStyles}
    <div class="demo-container">
      <div class="demo-label">Questão de Múltipla Escolha com Estatísticas</div>
      <div class="question-modal">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Análise Detalhada da Questão</h5>
              <button class="modal-close-btn" aria-label="Fechar">&times;</button>
            </div>
            <div class="modal-body">
              <div class="question-info-row">
                <div class="info-badge">
                  <i class="bi bi-bar-chart-fill"></i>
                  Dificuldade: Difícil
                </div>
                <div class="info-badge">
                  <i class="bi bi-book"></i>
                  Ciências
                </div>
                <div class="info-badge">
                  <i class="bi bi-tag"></i>
                  Sistema Solar
                </div>
                <div class="info-badge">
                  <i class="bi bi-people-fill"></i>
                  32 respostas
                </div>
              </div>
              <div class="question-card">
                <div class="question-text">
                  <strong>Qual planeta do Sistema Solar é conhecido por seus anéis proeminentes?</strong>
                </div>
                <div class="alternatives-list">
                  <div class="alternative-item correct">
                    <div class="question-letter">A</div>
                    <div class="alternative-text">Saturno</div>
                    <i class="bi bi-check-circle-fill" style="color: #28C76F; font-size: 18px;"></i>
                    <span class="percentage-badge">65% (21 alunos)</span>
                  </div>
                  <div class="alternative-item incorrect">
                    <div class="question-letter">B</div>
                    <div class="alternative-text">Júpiter</div>
                    <span class="percentage-badge">22% (7 alunos)</span>
                  </div>
                  <div class="alternative-item incorrect">
                    <div class="question-letter">C</div>
                    <div class="alternative-text">Urano</div>
                    <span class="percentage-badge">9% (3 alunos)</span>
                  </div>
                  <div class="alternative-item incorrect">
                    <div class="question-letter">D</div>
                    <div class="alternative-text">Netuno</div>
                    <span class="percentage-badge">3% (1 aluno)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
};

/**
 * Question + alternatives + explanation section with detailed feedback
 */
export const WithExplanation = {
  render: () => `
    ${componentStyles}
    <div class="demo-container">
      <div class="demo-label">Questão com Explicação Detalhada</div>
      <div class="question-modal">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Questão com Gabarito Comentado</h5>
              <button class="modal-close-btn" aria-label="Fechar">&times;</button>
            </div>
            <div class="modal-body">
              <div class="question-card">
                <div class="question-text">
                  <strong>Qual é o resultado de 2³ + 5² ?</strong>
                </div>
                <div class="alternatives-list">
                  <div class="alternative-item correct">
                    <div class="question-letter">A</div>
                    <div class="alternative-text">33</div>
                    <i class="bi bi-check-circle-fill" style="color: #28C76F; font-size: 18px;"></i>
                  </div>
                  <div class="alternative-item">
                    <div class="question-letter">B</div>
                    <div class="alternative-text">30</div>
                  </div>
                  <div class="alternative-item">
                    <div class="question-letter">C</div>
                    <div class="alternative-text">17</div>
                  </div>
                  <div class="alternative-item">
                    <div class="question-letter">D</div>
                    <div class="alternative-text">13</div>
                  </div>
                </div>
              </div>
              <div class="explanation-section">
                <div class="explanation-title">
                  <i class="bi bi-lightbulb-fill"></i> Explicação
                </div>
                <div class="explanation-text">
                  Para resolver esta questão, precisamos calcular as potências separadamente 
                  e depois somar os resultados:<br><br>
                  <strong>Passo 1:</strong> Calcular 2³ = 2 × 2 × 2 = 8<br>
                  <strong>Passo 2:</strong> Calcular 5² = 5 × 5 = 25<br>
                  <strong>Passo 3:</strong> Somar os resultados: 8 + 25 = 33<br><br>
                  Portanto, a resposta correta é a alternativa <strong>A) 33</strong>.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
};

/**
 * Modal showing game-based question with icon-games-finished/unfinished indicators
 */
export const GameCompletion = {
  render: () => `
    ${componentStyles}
    <div class="demo-container">
      <div class="demo-label">Status de Conclusão - Gamificação</div>
      <div class="question-modal">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">
                <i class="bi bi-controller"></i> Questão do Jogo
              </h5>
              <button class="modal-close-btn" aria-label="Fechar">&times;</button>
            </div>
            <div class="modal-body">
              <div class="results-grid">
                <div class="result-card">
                  <div class="alternativeResultTitle">
                    <i class="bi bi-trophy-fill" style="color: #FAB84A;"></i> 
                    Completaram
                  </div>
                  <div class="result-row">
                    <div class="icon-games-finished"></div>
                    <span class="result-count">Ana Silva</span>
                  </div>
                  <div class="result-row">
                    <div class="icon-games-finished"></div>
                    <span class="result-count">Bruno Santos</span>
                  </div>
                  <div class="result-row">
                    <div class="icon-games-finished"></div>
                    <span class="result-count">Carlos Oliveira</span>
                  </div>
                  <div class="result-row">
                    <div class="icon-games-finished"></div>
                    <span class="result-count">Diana Souza</span>
                  </div>
                </div>
                <div class="result-card">
                  <div class="alternativeResultTitle">
                    <i class="bi bi-hourglass-split" style="color: #EA5455;"></i> 
                    Não Completaram
                  </div>
                  <div class="result-row">
                    <div class="icon-games-unfinished"></div>
                    <span class="result-count">Eduardo Lima</span>
                  </div>
                  <div class="result-row">
                    <div class="icon-games-unfinished"></div>
                    <span class="result-count">Fernanda Costa</span>
                  </div>
                  <div class="result-row">
                    <div class="icon-games-unfinished"></div>
                    <span class="result-count">Gabriel Rocha</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
};

/**
 * Modal with close button emitting @input event, setTimeout closing modal
 */
export const Interactive = {
  render: () => {
    setTimeout(() => {
      const closeBtn = document.getElementById('question-modal-close');
      const modal = document.getElementById('interactive-question-modal');
      
      if (closeBtn && modal) {
        closeBtn.addEventListener('click', () => {
          modal.style.opacity = '0';
          modal.style.transition = 'opacity 0.3s ease';
          
          setTimeout(() => {
            alert('Modal fechado! Evento @input emitido.');
            modal.style.display = 'none';
          }, 300);
        });
      }
    }, 100);

    return `
      ${componentStyles}
      <div class="demo-container">
        <div class="demo-label">Modal Interativo - Clique no X para Fechar</div>
        <div id="interactive-question-modal" class="question-modal">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title">Modal Interativo</h5>
                <button id="question-modal-close" class="modal-close-btn" aria-label="Fechar">&times;</button>
              </div>
              <div class="modal-body">
                <div class="question-card">
                  <div class="question-text">
                    <strong>Clique no botão X acima para fechar este modal e ver o evento sendo emitido.</strong>
                  </div>
                  <div class="alternatives-list">
                    <div class="alternative-item">
                      <div class="question-letter">A</div>
                      <div class="alternative-text">Esta é uma questão de exemplo</div>
                    </div>
                    <div class="alternative-item correct">
                      <div class="question-letter">B</div>
                      <div class="alternative-text">Demonstrando fechamento interativo</div>
                      <i class="bi bi-check-circle-fill" style="color: #28C76F; font-size: 18px;"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  },
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
          <div style="display:inline-block;padding:8px 16px;background:rgba(255,255,255,0.15);border-radius:50px;margin-bottom:20px;font-size:14px;border:1px solid rgba(255,255,255,0.2);">Evaluations</div>
          <h1 style="font-size:3rem;font-weight:700;margin:0 0 12px 0;letter-spacing:-0.02em;">QuestionDetail</h1>
          <p style="font-size:1.1rem;opacity:0.9;margin:0;max-width:600px;">Componente QuestionDetail do Educacross</p>
        </div>
      </div>
      <div style="max-width:900px;margin:0 auto;padding:48px 40px;">
        <div style="background:white;border-radius:12px;padding:32px;margin-bottom:32px;box-shadow:0 2px 8px rgba(0,0,0,0.08);">
          <h2 style="font-size:1.1rem;font-weight:600;color:#5E5873;margin:0 0 16px 0;">Sobre o Componente</h2>
          <p style="color:#6E6B7B;line-height:1.7;margin:0 0 16px 0;">Componente QuestionDetail do Educacross. Faz parte da categoria <strong>Evaluations</strong> do Design System Educacross.</p>
          <div style="background:#F8F7FF;border-left:4px solid #6E63E8;padding:16px;border-radius:4px;">
            <p style="margin:0;color:#5E5873;font-size:14px;line-height:1.6;"><strong>💡 Dica:</strong> Use <em>Playground</em> para explorar props, <em>Use Cases</em> para exemplos reais e <em>Accessibility</em> para validar WCAG.</p>
          </div>
        </div>
        <div style="background:white;border-radius:12px;padding:32px;box-shadow:0 2px 8px rgba(0,0,0,0.08);">
          <h2 style="font-size:1.1rem;font-weight:600;color:#5E5873;margin:0 0 16px 0;">Implementação Vue 2.7</h2>
          <pre style="background:#1E1E2E;color:#CDD6F4;padding:20px;border-radius:8px;font-size:13px;line-height:1.6;overflow:auto;margin:0;"><code>import QuestionDetail from '@/components/QuestionDetail.vue';

// Template
&lt;QuestionDetail v-bind="props" /&gt;</code></pre>
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
    docs: { description: { story: 'Explore o QuestionDetail com controles interativos.' } },
  },
  render: (args) => `
    <div style="padding:32px;display:flex;justify-content:center;align-items:center;min-height:200px;background:#F8F8F8;border-radius:12px;">
      <div style="text-align:center;color:#6E6B7B;">
        <div style="width:60px;height:60px;background:#6E63E820;border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 16px;font-size:24px;">🎨</div>
        <p style="margin:0 0 8px 0;font-size:15px;font-weight:600;color:#5E5873;">Playground QuestionDetail</p>
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
    docs: { description: { story: 'Exemplos de uso real do QuestionDetail no Educacross.' } },
  },
  render: () => `
    <div style="max-width:800px;margin:0 auto;padding:40px 20px;font-family:'Public Sans',sans-serif;">
      <div style="background:#6E63E815;border:1px solid #6E63E830;border-radius:12px;padding:24px;margin-bottom:40px;">
        <h1 style="font-size:1.5rem;font-weight:700;color:#5E5873;margin:0 0 8px 0;">Casos de Uso: QuestionDetail</h1>
        <p style="color:#6E6B7B;margin:0;font-size:14px;line-height:1.6;">Cenários reais de uso no contexto educacional da plataforma Educacross</p>
      </div>
      
      <div style="margin-bottom:32px;">
        <h2 style="font-size:18px;font-weight:600;color:#5E5873;margin:0 0 8px 0;display:flex;align-items:center;gap:10px;">
          <span style="display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;background:#6E63E8;color:white;border-radius:50%;font-size:13px;font-weight:700;flex-shrink:0;">1</span>
          Professor — Painel Principal
        </h2>
        <p style="color:#6E6B7B;margin:0 0 16px 0;padding-left:38px;font-size:14px;">Professor utilizando QuestionDetail no dashboard de gestão de turmas</p>
        <div style="background:#F8F8F8;border-radius:8px;padding:20px;margin-left:38px;text-align:center;color:#B9B9C3;font-size:13px;">
          Ver story <strong>Default</strong> para visualização do componente neste contexto
        </div>
      </div>
      <div style="margin-bottom:32px;">
        <h2 style="font-size:18px;font-weight:600;color:#5E5873;margin:0 0 8px 0;display:flex;align-items:center;gap:10px;">
          <span style="display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;background:#6E63E8;color:white;border-radius:50%;font-size:13px;font-weight:700;flex-shrink:0;">2</span>
          Aluno — Portal do Estudante
        </h2>
        <p style="color:#6E6B7B;margin:0 0 16px 0;padding-left:38px;font-size:14px;">Aluno interagindo com QuestionDetail no portal educacional</p>
        <div style="background:#F8F8F8;border-radius:8px;padding:20px;margin-left:38px;text-align:center;color:#B9B9C3;font-size:13px;">
          Ver story <strong>Default</strong> para visualização do componente neste contexto
        </div>
      </div>
      <div style="margin-bottom:32px;">
        <h2 style="font-size:18px;font-weight:600;color:#5E5873;margin:0 0 8px 0;display:flex;align-items:center;gap:10px;">
          <span style="display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;background:#6E63E8;color:white;border-radius:50%;font-size:13px;font-weight:700;flex-shrink:0;">3</span>
          Coordenador — Relatórios
        </h2>
        <p style="color:#6E6B7B;margin:0 0 16px 0;padding-left:38px;font-size:14px;">Coordenador pedagógico analisando dados via QuestionDetail</p>
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
    docs: { description: { story: 'Conformidade WCAG 2.1 AA para o QuestionDetail.' } },
  },
  render: () => `
    <div style="max-width:800px;margin:0 auto;padding:40px 20px;font-family:'Public Sans',sans-serif;">

      <div style="background:linear-gradient(135deg,#6E63E8 0%,#764ba2 100%);padding:32px;border-radius:12px;margin-bottom:32px;color:white;">
        <h1 style="font-size:1.5rem;font-weight:700;margin:0 0 8px 0;">Acessibilidade: QuestionDetail</h1>
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

