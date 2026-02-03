/**
 * QuestionStatus - Question Answer Status Badge
 * ==============================================
 * Badge para indicar status de resposta de questão (correta, incorreta, parcial, pendente, não respondida)
 * 
 * @component QuestionStatus
 * @category Educacross Components V2 / Data Display
 * @source educacross-frontoffice (resultado de missões, visualização de questões)
 * @priority P1 - Core UI
 * @status EXPANDED
 * @since 2.0.0
 */

export default {
  title: 'Educacross Components V2/Data Display/QuestionStatus',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
## QuestionStatus - Status de Resposta de Questão

Badge visual para indicar o status de correção de uma questão: correta (verde), incorreta (vermelho), parcialmente correta (amarelo), pendente (cinza), não respondida (azul).

### Casos de Uso

**Professor**: Corrigir missões, analisar respostas dos alunos, identificar questões com maior dificuldade, visualizar resultado geral da turma

**Coordenador**: Relatórios de desempenho por questão, análise de qualidade das avaliações, estatísticas de acertos/erros

**Aluno**: Visualizar resultado da missão, entender feedback das respostas, revisar questões erradas, acompanhar status de correção
        `
      }
    }
  }
};

const css = `<style>
  .question-status {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 4px 12px;
    border-radius: 12px;
    font-size: 13px;
    font-weight: 600;
    white-space: nowrap;
  }
  
  .question-status i {
    font-size: 14px;
  }
  
  /* Status colors */
  .status-correct {
    background: #E8F5E9;
    color: #28C76F;
  }
  
  .status-incorrect {
    background: #FFEBEE;
    color: #EA5455;
  }
  
  .status-partial {
    background: #FFF8E1;
    color: #FF9F43;
  }
  
  .status-pending {
    background: #F3F2F7;
    color: #6E6B7B;
  }
  
  .status-skipped {
    background: #E3F2FD;
    color: #00CFE8;
  }
  
  /* With score */
  .status-with-score {
    display: inline-flex;
    align-items: center;
    gap: 8px;
  }
  
  .status-score {
    font-size: 16px;
    font-weight: 700;
  }
  
  /* Compact variant */
  .question-status-compact {
    padding: 2px 8px;
    font-size: 11px;
  }
  
  .question-status-compact i {
    font-size: 11px;
  }
</style>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.0/font/bootstrap-icons.css">`;

export const Default = {
  render: () => `
    ${css}
    <div style="display: flex; flex-direction: column; gap: 12px;">
      <span class="question-status status-correct">
        <i class="bi bi-check-circle-fill"></i>
        Correta
      </span>
      
      <span class="question-status status-incorrect">
        <i class="bi bi-x-circle-fill"></i>
        Incorreta
      </span>
      
      <span class="question-status status-partial">
        <i class="bi bi-dash-circle-fill"></i>
        Parcialmente Correta
      </span>
      
      <span class="question-status status-pending">
        <i class="bi bi-clock"></i>
        Pendente de Correção
      </span>
      
      <span class="question-status status-skipped">
        <i class="bi bi-skip-forward"></i>
        Não Respondida
      </span>
    </div>
  `
};

export const WithScore = {
  render: () => `
    ${css}
    <div style="display: flex; flex-direction: column; gap: 16px;">
      <div class="status-with-score">
        <span class="question-status status-correct">
          <i class="bi bi-check-circle-fill"></i>
          Correta
        </span>
        <span class="status-score" style="color: #28C76F;">10/10</span>
      </div>
      
      <div class="status-with-score">
        <span class="question-status status-partial">
          <i class="bi bi-dash-circle-fill"></i>
          Parcialmente Correta
        </span>
        <span class="status-score" style="color: #FF9F43;">5/10</span>
      </div>
      
      <div class="status-with-score">
        <span class="question-status status-incorrect">
          <i class="bi bi-x-circle-fill"></i>
          Incorreta
        </span>
        <span class="status-score" style="color: #EA5455;">0/10</span>
      </div>
      
      <div class="status-with-score">
        <span class="question-status status-pending">
          <i class="bi bi-clock"></i>
          Pendente
        </span>
        <span class="status-score" style="color: #6E6B7B;">-</span>
      </div>
    </div>
    <p style="margin-top: 16px; font-size: 13px; color: #6E6B7B;">
      <strong>Contexto:</strong> Status com pontuação. Usado em resultado detalhado de missão.
    </p>
  `
};

export const ResultadoIndividual = {
  render: () => `
    ${css}
    <div style="background: #fff; border: 1px solid #D8D6DE; border-radius: 8px; padding: 20px; max-width: 650px;">
      <h3 style="margin: 0 0 16px; font-size: 18px; font-weight: 600; color: #5E5873;">
        Resultado: João Silva - Missão "Frações Básicas"
      </h3>
      <div style="display: flex; flex-direction: column; gap: 12px;">
        ${[
          { n: 1, s: 'correct', t: '10/10' },
          { n: 2, s: 'correct', t: '10/10' },
          { n: 3, s: 'partial', t: '5/10' },
          { n: 4, s: 'incorrect', t: '0/10' },
          { n: 5, s: 'correct', t: '10/10' },
          { n: 6, s: 'skipped', t: '0/10' },
          { n: 7, s: 'pending', t: '-' },
          { n: 8, s: 'pending', t: '-' }
        ].map(q => {
          const statusConfig = {
            correct: { icon: 'check-circle-fill', label: 'Correta', color: '#28C76F' },
            incorrect: { icon: 'x-circle-fill', label: 'Incorreta', color: '#EA5455' },
            partial: { icon: 'dash-circle-fill', label: 'Parcial', color: '#FF9F43' },
            skipped: { icon: 'skip-forward', label: 'Não Resp.', color: '#00CFE8' },
            pending: { icon: 'clock', label: 'Pendente', color: '#6E6B7B' }
          };
          const config = statusConfig[q.s];
          return `
            <div style="display: flex; align-items: center; justify-content: space-between; padding: 12px; background: #F8F8F8; border-radius: 6px;">
              <div style="display: flex; align-items: center; gap: 12px;">
                <span style="width: 32px; height: 32px; border-radius: 50%; background: #6E63E8; color: #fff; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 14px;">${q.n}</span>
                <span class="question-status status-${q.s}">
                  <i class="bi bi-${config.icon}"></i>
                  ${config.label}
                </span>
              </div>
              <span style="font-size: 16px; font-weight: 700; color: ${config.color};">${q.t}</span>
            </div>
          `;
        }).join('')}
      </div>
      <div style="margin-top: 16px; padding-top: 16px; border-top: 1px solid #E8E8E8; display: flex; justify-content: space-between; font-size: 18px; font-weight: 700;">
        <span style="color: #5E5873;">Total:</span>
        <span style="color: #6E63E8;">55/80 pontos (69%)</span>
      </div>
    </div>
    <p style="margin-top: 16px; font-size: 13px; color: #6E6B7B;">
      <strong>Contexto:</strong> Resultado individual de aluno. Professora visualizando detalhes de correção.
    </p>
  `
};

export const DesempenhoPorQuestao = {
  render: () => `
    ${css}
    <div style="background: #fff; border: 1px solid #D8D6DE; border-radius: 8px; padding: 20px; max-width: 900px;">
      <h3 style="margin: 0 0 16px; font-size: 18px; font-weight: 600; color: #5E5873;">
        Desempenho por Questão - Turma 5º A (28 alunos)
      </h3>
      <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px;">
        ${[1, 2, 3, 4, 5, 6, 7, 8].map(n => {
          const correct = Math.floor(Math.random() * 20) + 8;
          const incorrect = Math.floor(Math.random() * 8) + 2;
          const partial = 28 - correct - incorrect;
          return `
            <div style="background: #F8F8F8; border-radius: 8px; padding: 16px;">
              <div style="font-size: 32px; font-weight: 700; color: #6E63E8; margin-bottom: 12px;">Q${n}</div>
              <div style="display: flex; flex-direction: column; gap: 8px;">
                <div style="display: flex; justify-content: space-between; align-items: center;">
                  <span class="question-status question-status-compact status-correct">
                    <i class="bi bi-check-circle-fill"></i>
                    ${correct}
                  </span>
                  <span style="font-size: 12px; font-weight: 600; color: #28C76F;">${Math.round(correct / 28 * 100)}%</span>
                </div>
                <div style="display: flex; justify-content: space-between; align-items: center;">
                  <span class="question-status question-status-compact status-partial">
                    <i class="bi bi-dash-circle-fill"></i>
                    ${partial}
                  </span>
                  <span style="font-size: 12px; font-weight: 600; color: #FF9F43;">${Math.round(partial / 28 * 100)}%</span>
                </div>
                <div style="display: flex; justify-content: space-between; align-items: center;">
                  <span class="question-status question-status-compact status-incorrect">
                    <i class="bi bi-x-circle-fill"></i>
                    ${incorrect}
                  </span>
                  <span style="font-size: 12px; font-weight: 600; color: #EA5455;">${Math.round(incorrect / 28 * 100)}%</span>
                </div>
              </div>
            </div>
          `;
        }).join('')}
      </div>
    </div>
    <p style="margin-top: 16px; font-size: 13px; color: #6E6B7B;">
      <strong>Contexto:</strong> Dashboard de desempenho da turma por questão. Coordenador identificando questões difíceis.
    </p>
  `
};

export const TabelaDeCorrecao = {
  render: () => `
    ${css}
    <div style="background: #fff; border: 1px solid #D8D6DE; border-radius: 8px; padding: 20px; max-width: 850px;">
      <h3 style="margin: 0 0 16px; font-size: 18px; font-weight: 600; color: #5E5873;">
        Correção Pendente - Missão "Operações com Frações"
      </h3>
      <table style="width: 100%; border-collapse: collapse;">
        <thead>
          <tr style="border-bottom: 2px solid #E8E8E8;">
            <th style="padding: 12px; text-align: left; font-size: 13px; font-weight: 600; color: #6E6B7B;">Aluno</th>
            <th style="padding: 12px; text-align: center; font-size: 13px; font-weight: 600; color: #6E6B7B;">Q1</th>
            <th style="padding: 12px; text-align: center; font-size: 13px; font-weight: 600; color: #6E6B7B;">Q2</th>
            <th style="padding: 12px; text-align: center; font-size: 13px; font-weight: 600; color: #6E6B7B;">Q3</th>
            <th style="padding: 12px; text-align: center; font-size: 13px; font-weight: 600; color: #6E6B7B;">Q4</th>
            <th style="padding: 12px; text-align: center; font-size: 13px; font-weight: 600; color: #6E6B7B;">Status</th>
          </tr>
        </thead>
        <tbody>
          ${[
            { nome: 'Ana Silva', respostas: ['correct', 'correct', 'pending', 'pending'], corrigido: false },
            { nome: 'Bruno Costa', respostas: ['correct', 'incorrect', 'partial', 'pending'], corrigido: false },
            { nome: 'Carlos Mendes', respostas: ['correct', 'correct', 'correct', 'correct'], corrigido: true },
            { nome: 'Diana Santos', respostas: ['incorrect', 'pending', 'pending', 'pending'], corrigido: false },
            { nome: 'Eduardo Lima', respostas: ['skipped', 'skipped', 'skipped', 'skipped'], corrigido: true }
          ].map(aluno => {
            const statusIcons = {
              correct: 'check-circle-fill',
              incorrect: 'x-circle-fill',
              partial: 'dash-circle-fill',
              pending: 'clock',
              skipped: 'skip-forward'
            };
            return `
              <tr style="border-bottom: 1px solid #F3F2F7;">
                <td style="padding: 12px; font-size: 14px; color: #5E5873; font-weight: 600;">${aluno.nome}</td>
                ${aluno.respostas.map(status => `
                  <td style="padding: 12px; text-align: center;">
                    <span class="question-status question-status-compact status-${status}">
                      <i class="bi bi-${statusIcons[status]}"></i>
                    </span>
                  </td>
                `).join('')}
                <td style="padding: 12px; text-align: center;">
                  ${aluno.corrigido 
                    ? '<span style="color: #28C76F; font-weight: 600; font-size: 12px;">✓ Corrigido</span>' 
                    : '<span style="color: #FF9F43; font-weight: 600; font-size: 12px;">⏳ Pendente</span>'}
                </td>
              </tr>
            `;
          }).join('')}
        </tbody>
      </table>
    </div>
    <p style="margin-top: 16px; font-size: 13px; color: #6E6B7B;">
      <strong>Contexto:</strong> Tabela de correção. Professora visualizando status de cada questão por aluno.
    </p>
  `
};

export const FeedbackAluno = {
  render: () => `
    ${css}
    <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 12px; padding: 24px; max-width: 500px; color: #fff;">
      <h2 style="margin: 0 0 20px; font-size: 24px; font-weight: 700;">Sua Missão foi Corrigida! 🎉</h2>
      <div style="background: rgba(255,255,255,0.15); backdrop-filter: blur(10px); border-radius: 10px; padding: 20px; margin-bottom: 20px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
          <span style="font-size: 16px;">Questões Corretas:</span>
          <span class="question-status status-correct">
            <i class="bi bi-check-circle-fill"></i>
            6 de 8
          </span>
        </div>
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
          <span style="font-size: 16px;">Parcialmente Corretas:</span>
          <span class="question-status status-partial">
            <i class="bi bi-dash-circle-fill"></i>
            1
          </span>
        </div>
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <span style="font-size: 16px;">Incorretas:</span>
          <span class="question-status status-incorrect">
            <i class="bi bi-x-circle-fill"></i>
            1
          </span>
        </div>
      </div>
      <div style="text-align: center;">
        <div style="font-size: 48px; font-weight: 700; margin-bottom: 8px;">85/100</div>
        <div style="font-size: 18px; opacity: 0.9;">Parabéns! Ótimo resultado! 🌟</div>
      </div>
    </div>
    <p style="margin-top: 16px; font-size: 13px; color: #6E6B7B;">
      <strong>Contexto:</strong> Feedback de resultado. Aluno visualizando sua pontuação após correção.
    </p>
  `
};
