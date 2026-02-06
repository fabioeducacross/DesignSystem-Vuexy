export default {
  title: 'Front-office/Lists/QuestionsListDetail',
  tags: ['autodocs'],
  parameters: { layout: 'padded' }
};

const css = `.questions-list{max-width:900px;margin:0 auto;padding:24px}.list-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:24px;flex-wrap:wrap;gap:12px}.list-title{font-size:20px;font-weight:600;color:#3F3F46}.list-count{font-size:13px;color:#6E6B7B}.list-actions{display:flex;gap:8px}.action-btn{padding:8px 16px;border:1px solid #D8D6DE;border-radius:6px;background:#fff;font-size:13px;color:#6E6B7B;cursor:pointer;transition:.2s;display:flex;align-items:center;gap:6px}.action-btn:hover{border-color:#6E63E8;color:#6E63E8}.action-btn.primary{background:#6E63E8;color:#fff;border-color:#6E63E8}.question-item{background:#fff;border:1px solid #D8D6DE;border-radius:8px;padding:20px;margin-bottom:16px;transition:.2s}.question-item:hover{border-color:#6E63E8}.question-header{display:flex;justify-content:space-between;align-items:start;margin-bottom:16px}.question-number{width:36px;height:36px;border-radius:50%;background:#F3F2F7;display:flex;align-items:center;justify-content:center;font-weight:700;color:#6E63E8;flex-shrink:0}.question-type{padding:4px 10px;border-radius:12px;font-size:11px;font-weight:600;text-transform:uppercase;background:#E8F0FE;color:#6E63E8}.question-content{font-size:15px;color:#3F3F46;line-height:1.6;margin-bottom:16px}.question-image{width:100%;max-width:300px;height:150px;background:#F3F2F7;border-radius:6px;display:flex;align-items:center;justify-content:center;margin:12px 0;font-size:48px}.alternatives{display:flex;flex-direction:column;gap:8px}.alternative-item{padding:12px;border:1px solid #D8D6DE;border-radius:6px;display:flex;align-items:center;gap:12px;transition:.2s;cursor:pointer}.alternative-item:hover{background:#F8F8F8}.alternative-letter{width:28px;height:28px;border-radius:50%;background:#F3F2F7;display:flex;align-items:center;justify-content:center;font-weight:600;color:#6E6B7B;flex-shrink:0}.alternative-item.correct{background:#E8F5E9;border-color:#28C76F}.alternative-item.correct .alternative-letter{background:#28C76F;color:#fff}.question-footer{display:flex;justify-content:space-between;align-items:center;margin-top:16px;padding-top:16px;border-top:1px solid #F3F2F7;font-size:12px;color:#6E6B7B}.footer-meta{display:flex;gap:16px}.difficulty{display:flex;align-items:center;gap:4px}.diff-dot{width:8px;height:8px;border-radius:50%}.question-actions{display:flex;gap:8px}.icon-btn{width:32px;height:32px;border:1px solid #D8D6DE;border-radius:6px;background:#fff;display:flex;align-items:center;justify-content:center;cursor:pointer;transition:.2s}.icon-btn:hover{background:#F3F2F7;border-color:#6E63E8;color:#6E63E8}`;

export const Default = {
  render: () => `
<div class="questions-list">
  <div class="list-header">
    <div>
      <span class="list-title">Banco de Questões</span>
      <span class="list-count">15 questões</span>
    </div>
    <div class="list-actions">
      <button class="action-btn"><i class="bi bi-funnel"></i> Filtrar</button>
      <button class="action-btn primary"><i class="bi bi-plus-lg"></i> Nova Questão</button>
    </div>
  </div>
  
  ${[1, 2, 3].map(i => `
    <div class="question-item">
      <div class="question-header">
        <div class="question-number">${i}</div>
        <span class="question-type">Múltipla Escolha</span>
      </div>
      <div class="question-content">
        Qual é o resultado da operação: 3/4 + 1/2?
      </div>
      <div class="alternatives">
        ${['A', 'B', 'C', 'D'].map((letter, idx) => `
          <div class="alternative-item ${idx === 0 ? 'correct' : ''}">
            <div class="alternative-letter">${letter}</div>
            <span>${idx === 0 ? '5/4' : idx === 1 ? '4/6' : idx === 2 ? '3/6' : '1/2'}</span>
          </div>
        `).join('')}
      </div>
      <div class="question-footer">
        <div class="footer-meta">
          <div>📐 Matemática</div>
          <div class="difficulty">
            <span>Dificuldade:</span>
            <div class="diff-dot" style="background:#28C76F"></div>
            <div class="diff-dot" style="background:#28C76F"></div>
            <div class="diff-dot" style="background:#F3F2F7"></div>
          </div>
        </div>
        <div class="question-actions">
          <button class="icon-btn" title="Editar"><i class="bi bi-pencil"></i></button>
          <button class="icon-btn" title="Duplicar"><i class="bi bi-files"></i></button>
          <button class="icon-btn" title="Excluir"><i class="bi bi-trash"></i></button>
        </div>
      </div>
    </div>
  `).join('')}
</div>
<style>${css}</style>
`
};

export const ComImagem = {
  render: () => `
<div class="questions-list">
  <div class="list-header">
    <span class="list-title">Questões com Imagem</span>
  </div>
  
  <div class="question-item">
    <div class="question-header">
      <div class="question-number">1</div>
      <span class="question-type">Múltipla Escolha</span>
    </div>
    <div class="question-content">
      Observe a figura abaixo e identifique o tipo de triângulo:
    </div>
    <div class="question-image">📐</div>
    <div class="alternatives">
      ${['Equilátero', 'Isósceles', 'Escaleno', 'Retângulo'].map((text, idx) => `
        <div class="alternative-item ${idx === 0 ? 'correct' : ''}">
          <div class="alternative-letter">${String.fromCharCode(65 + idx)}</div>
          <span>${text}</span>
        </div>
      `).join('')}
    </div>
    <div class="question-footer">
      <div class="footer-meta">
        <div>📐 Matemática • Geometria</div>
        <div class="difficulty">
          <span>Média</span>
          <div class="diff-dot" style="background:#FF9F43"></div>
          <div class="diff-dot" style="background:#FF9F43"></div>
          <div class="diff-dot" style="background:#F3F2F7"></div>
        </div>
      </div>
      <div class="question-actions">
        <button class="icon-btn"><i class="bi bi-pencil"></i></button>
        <button class="icon-btn"><i class="bi bi-files"></i></button>
        <button class="icon-btn"><i class="bi bi-trash"></i></button>
      </div>
    </div>
  </div>
</div>
<style>${css}</style>
`
};

export const VerdadeiroFalso = {
  render: () => `
<div class="questions-list">
  <div class="list-header">
    <span class="list-title">Questões V ou F</span>
  </div>
  
  ${[1, 2].map(i => `
    <div class="question-item">
      <div class="question-header">
        <div class="question-number">${i}</div>
        <span class="question-type" style="background:#E8F5E9;color:#28C76F">Verdadeiro/Falso</span>
      </div>
      <div class="question-content">
        ${i === 1 ? 'A fotossíntese é o processo pelo qual as plantas produzem seu próprio alimento.' : 'O Sol é o planeta mais próximo da Terra.'}
      </div>
      <div class="alternatives">
        ${['Verdadeiro', 'Falso'].map((text, idx) => `
          <div class="alternative-item ${(i === 1 && idx === 0) || (i === 2 && idx === 1) ? 'correct' : ''}">
            <div class="alternative-letter">${idx === 0 ? 'V' : 'F'}</div>
            <span>${text}</span>
          </div>
        `).join('')}
      </div>
      <div class="question-footer">
        <div class="footer-meta">
          <div>🔬 Ciências</div>
          <div class="difficulty">
            <span>Fácil</span>
            <div class="diff-dot" style="background:#28C76F"></div>
            <div class="diff-dot" style="background:#F3F2F7"></div>
            <div class="diff-dot" style="background:#F3F2F7"></div>
          </div>
        </div>
        <div class="question-actions">
          <button class="icon-btn"><i class="bi bi-pencil"></i></button>
          <button class="icon-btn"><i class="bi bi-trash"></i></button>
        </div>
      </div>
    </div>
  `).join('')}
</div>
<style>${css}</style>
`
};

export const PorDisciplina = {
  render: () => `
<div class="questions-list">
  <div class="list-header">
    <div>
      <span class="list-title">Matemática</span>
      <span class="list-count">8 questões</span>
    </div>
    <div class="list-actions">
      <button class="action-btn"><i class="bi bi-download"></i> Exportar</button>
    </div>
  </div>
  
  ${[
    { q: 'Resolva a equação: 2x + 5 = 15', topic: 'Equações', diff: 2, color: '#FF9F43' },
    { q: 'Calcule a área de um triângulo com base 8cm e altura 5cm', topic: 'Geometria', diff: 1, color: '#28C76F' },
    { q: 'Qual é o valor de π (pi) com 2 casas decimais?', topic: 'Constantes', diff: 1, color: '#28C76F' }
  ].map((item, i) => `
    <div class="question-item">
      <div class="question-header">
        <div class="question-number">${i + 1}</div>
        <span class="question-type">📐 ${item.topic}</span>
      </div>
      <div class="question-content">${item.q}</div>
      <div class="question-footer">
        <div class="difficulty">
          ${[1, 2, 3].map(d => `
            <div class="diff-dot" style="background:${d <= item.diff ? item.color : '#F3F2F7'}"></div>
          `).join('')}
        </div>
        <div class="question-actions">
          <button class="icon-btn"><i class="bi bi-eye"></i></button>
          <button class="icon-btn"><i class="bi bi-pencil"></i></button>
        </div>
      </div>
    </div>
  `).join('')}
</div>
<style>${css}</style>
`
};

export const ComEstatisticas = {
  render: () => `
<div class="questions-list">
  <div class="list-header">
    <span class="list-title">Questões Mais Utilizadas</span>
  </div>
  
  ${[
    { q: 'Qual é a capital do Brasil?', uses: 42, correct: 95, subject: 'Geografia' },
    { q: 'Conjugue o verbo "fazer" no pretérito perfeito', uses: 38, correct: 78, subject: 'Português' }
  ].map((item, i) => `
    <div class="question-item">
      <div class="question-header">
        <div class="question-number">${i + 1}</div>
        <span class="question-type">${item.subject}</span>
      </div>
      <div class="question-content">${item.q}</div>
      <div class="question-footer">
        <div class="footer-meta">
          <div style="display:flex;align-items:center;gap:8px">
            <i class="bi bi-clipboard-check"></i>
            <span>${item.uses} usos</span>
          </div>
          <div style="display:flex;align-items:center;gap:8px">
            <i class="bi bi-check-circle" style="color:#28C76F"></i>
            <span>${item.correct}% acertos</span>
          </div>
        </div>
        <div class="question-actions">
          <button class="icon-btn"><i class="bi bi-eye"></i></button>
          <button class="icon-btn"><i class="bi bi-plus-circle"></i></button>
        </div>
      </div>
    </div>
  `).join('')}
</div>
<style>${css}</style>
`
};

export const ModoEdicao = {
  render: () => `
<div class="questions-list">
  <div class="list-header">
    <div>
      <span class="list-title">Seleção de Questões</span>
      <span class="list-count">3 selecionadas</span>
    </div>
    <div class="list-actions">
      <button class="action-btn">Cancelar</button>
      <button class="action-btn primary">Adicionar à Prova</button>
    </div>
  </div>
  
  ${[1, 2, 3].map(i => `
    <div class="question-item" style="border-color:#6E63E8;background:#6E63E810">
      <div style="display:flex;gap:16px">
        <input type="checkbox" checked style="width:20px;height:20px;margin-top:4px;cursor:pointer">
        <div style="flex:1">
          <div class="question-header" style="margin-bottom:8px">
            <div class="question-number">${i}</div>
            <span class="question-type">Múltipla Escolha</span>
          </div>
          <div class="question-content">
            Questão ${i}: Lorem ipsum dolor sit amet, consectetur adipiscing elit?
          </div>
        </div>
      </div>
    </div>
  `).join('')}
</div>
<style>${css}</style>
`
};

export const Compacta = {
  render: () => `
<div class="questions-list" style="max-width:600px;padding:16px">
  ${[1, 2, 3, 4].map(i => `
    <div class="question-item" style="padding:12px;margin-bottom:8px">
      <div style="display:flex;gap:12px;align-items:center">
        <div class="question-number" style="width:28px;height:28px;font-size:13px">${i}</div>
        <div style="flex:1">
          <div style="font-size:14px;color:#3F3F46;margin-bottom:4px">
            Questão curta exemplo ${i}
          </div>
          <div style="font-size:11px;color:#6E6B7B">Matemática • Média</div>
        </div>
        <button class="icon-btn" style="width:28px;height:28px"><i class="bi bi-eye"></i></button>
      </div>
    </div>
  `).join('')}
</div>
<style>${css}</style>
`
};

export const Vazio = {
  render: () => `
<div class="questions-list">
  <div class="list-header">
    <span class="list-title">Banco de Questões</span>
  </div>
  <div style="text-align:center;padding:80px 20px;color:#6E6B7B">
    <svg viewBox="0 0 24 24" fill="currentColor" style="width:100px;height:100px;opacity:0.3;margin-bottom:20px">
      <path d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm4 18H6V4h7v5h5v11z"/>
      <path d="M8 15h8v2H8zm0-4h8v2H8zm0-4h5v2H8z"/>
    </svg>
    <div style="font-size:16px;font-weight:600;margin-bottom:8px">Nenhuma Questão Encontrada</div>
    <div style="font-size:14px;margin-bottom:20px">Comece criando questões para seu banco</div>
    <button class="action-btn primary"><i class="bi bi-plus-lg"></i> Criar Primeira Questão</button>
  </div>
</div>
<style>${css}</style>
`
};
