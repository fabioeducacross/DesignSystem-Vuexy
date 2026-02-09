const s=`
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
`,K={title:"Educacross Components V2/Evaluations/QuestionDetail",tags:["autodocs"],parameters:{docs:{description:{component:"Modal displaying detailed question analysis with alternatives, results, and completion icons. Supports loading skeleton states and interactive close functionality."}}}},i={render:()=>`
    ${s}
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
  `},e={render:()=>`
    ${s}
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
  `},a={render:()=>`
    ${s}
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
  `},t={render:()=>`
    ${s}
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
  `},n={render:()=>`
    ${s}
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
  `},l={render:()=>`
    ${s}
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
  `},d={render:()=>`
    ${s}
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
  `},o={render:()=>(setTimeout(()=>{const c=document.getElementById("question-modal-close"),r=document.getElementById("interactive-question-modal");c&&r&&c.addEventListener("click",()=>{r.style.opacity="0",r.style.transition="opacity 0.3s ease",setTimeout(()=>{alert("Modal fechado! Evento @input emitido."),r.style.display="none"},300)})},100),`
      ${s}
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
    `)};var v,m,u,p,g;i.parameters={...i.parameters,docs:{...(v=i.parameters)==null?void 0:v.docs,source:{originalSource:`{
  render: () => \`
    \${componentStyles}
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
  \`
}`,...(u=(m=i.parameters)==null?void 0:m.docs)==null?void 0:u.source},description:{story:"Open modal with question header showing difficulty/subject/topic row",...(g=(p=i.parameters)==null?void 0:p.docs)==null?void 0:g.description}}};var b,x,h,f,y;e.parameters={...e.parameters,docs:{...(b=e.parameters)==null?void 0:b.docs,source:{originalSource:`{
  render: () => \`
    \${componentStyles}
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
  \`
}`,...(h=(x=e.parameters)==null?void 0:x.docs)==null?void 0:h.source},description:{story:"Question text + 4 alternatives (A,B,C,D) with letter badges, correct answer marked green",...(y=(f=e.parameters)==null?void 0:f.docs)==null?void 0:y.description}}};var q,k,E,w,C;a.parameters={...a.parameters,docs:{...(q=a.parameters)==null?void 0:q.docs,source:{originalSource:`{
  render: () => \`
    \${componentStyles}
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
  \`
}`,...(E=(k=a.parameters)==null?void 0:k.docs)==null?void 0:E.source},description:{story:"Modal showing student results: 18 correct (green icon), 7 incorrect (red icon)",...(C=(w=a.parameters)==null?void 0:w.docs)==null?void 0:C.description}}};var F,D,S,A,B;t.parameters={...t.parameters,docs:{...(F=t.parameters)==null?void 0:F.docs,source:{originalSource:`{
  render: () => \`
    \${componentStyles}
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
  \`
}`,...(S=(D=t.parameters)==null?void 0:D.docs)==null?void 0:S.source},description:{story:'b-skeleton-wrapper loading="true" showing skeleton placeholders',...(B=(A=t.parameters)==null?void 0:A.docs)==null?void 0:B.description}}};var Q,z,R,M,$;n.parameters={...n.parameters,docs:{...(Q=n.parameters)==null?void 0:Q.docs,source:{originalSource:`{
  render: () => \`
    \${componentStyles}
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
  \`
}`,...(R=(z=n.parameters)==null?void 0:z.docs)==null?void 0:R.source},description:{story:"Complete question with radio-style alternatives and result percentages per option",...($=(M=n.parameters)==null?void 0:M.docs)==null?void 0:$.description}}};var T,I,P,G,J;l.parameters={...l.parameters,docs:{...(T=l.parameters)==null?void 0:T.docs,source:{originalSource:`{
  render: () => \`
    \${componentStyles}
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
  \`
}`,...(P=(I=l.parameters)==null?void 0:I.docs)==null?void 0:P.source},description:{story:"Question + alternatives + explanation section with detailed feedback",...(J=(G=l.parameters)==null?void 0:G.docs)==null?void 0:J.description}}};var L,W,j,N,O;d.parameters={...d.parameters,docs:{...(L=d.parameters)==null?void 0:L.docs,source:{originalSource:`{
  render: () => \`
    \${componentStyles}
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
  \`
}`,...(j=(W=d.parameters)==null?void 0:W.docs)==null?void 0:j.source},description:{story:"Modal showing game-based question with icon-games-finished/unfinished indicators",...(O=(N=d.parameters)==null?void 0:N.docs)==null?void 0:O.description}}};var X,_,U,V,H;o.parameters={...o.parameters,docs:{...(X=o.parameters)==null?void 0:X.docs,source:{originalSource:`{
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
    return \`
      \${componentStyles}
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
    \`;
  }
}`,...(U=(_=o.parameters)==null?void 0:_.docs)==null?void 0:U.source},description:{story:"Modal with close button emitting @input event, setTimeout closing modal",...(H=(V=o.parameters)==null?void 0:V.docs)==null?void 0:H.description}}};const Y=["Default","WithAlternatives","WithResults","LoadingSkeleton","MultipleChoice","WithExplanation","GameCompletion","Interactive"];export{i as Default,d as GameCompletion,o as Interactive,t as LoadingSkeleton,n as MultipleChoice,e as WithAlternatives,l as WithExplanation,a as WithResults,Y as __namedExportsOrder,K as default};
