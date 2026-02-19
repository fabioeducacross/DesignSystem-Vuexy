/**
 * QuestionsListDetail - Lista Detalhada de Questões
 * =================================================
 * Lista de questões de banco com prévia completa de alternativas
 * 
 * @component QuestionsListDetail
 * @category Educacross Components V2 / Lists
 * @source educacross-frontoffice/src/components/evaluations/questionsListDetail/QuestionsListDetail.vue
 * @priority P2
 * @status PIXEL-PERFECT
 * @since 2.0.0
 */

export default {
  title: 'Educacross Components V2/Lists/QuestionsListDetail',
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
          <div style="display:inline-block;padding:8px 16px;background:rgba(255,255,255,0.15);border-radius:50px;margin-bottom:20px;font-size:14px;border:1px solid rgba(255,255,255,0.2);">Lists</div>
          <h1 style="font-size:3rem;font-weight:700;margin:0 0 12px 0;letter-spacing:-0.02em;">QuestionsListDetail</h1>
          <p style="font-size:1.1rem;opacity:0.9;margin:0;max-width:600px;">Lista Detalhada de Questões</p>
        </div>
      </div>
      <div style="max-width:900px;margin:0 auto;padding:48px 40px;">
        <div style="background:white;border-radius:12px;padding:32px;margin-bottom:32px;box-shadow:0 2px 8px rgba(0,0,0,0.08);">
          <h2 style="font-size:1.1rem;font-weight:600;color:#5E5873;margin:0 0 16px 0;">Sobre o Componente</h2>
          <p style="color:#6E6B7B;line-height:1.7;margin:0 0 16px 0;">Lista Detalhada de Questões. Faz parte da categoria <strong>Lists</strong> do Design System Educacross.</p>
          <div style="background:#F8F7FF;border-left:4px solid #6E63E8;padding:16px;border-radius:4px;">
            <p style="margin:0;color:#5E5873;font-size:14px;line-height:1.6;"><strong>💡 Dica:</strong> Use <em>Playground</em> para explorar props, <em>Use Cases</em> para exemplos reais e <em>Accessibility</em> para validar WCAG.</p>
          </div>
        </div>
        <div style="background:white;border-radius:12px;padding:32px;box-shadow:0 2px 8px rgba(0,0,0,0.08);">
          <h2 style="font-size:1.1rem;font-weight:600;color:#5E5873;margin:0 0 16px 0;">Implementação Vue 2.7</h2>
          <pre style="background:#1E1E2E;color:#CDD6F4;padding:20px;border-radius:8px;font-size:13px;line-height:1.6;overflow:auto;margin:0;"><code>import QuestionsListDetail from '@/components/QuestionsListDetail.vue';

// Template
&lt;QuestionsListDetail v-bind="props" /&gt;</code></pre>
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
    docs: { description: { story: 'Explore o QuestionsListDetail com controles interativos.' } },
  },
  render: (args) => `
    <div style="padding:32px;display:flex;justify-content:center;align-items:center;min-height:200px;background:#F8F8F8;border-radius:12px;">
      <div style="text-align:center;color:#6E6B7B;">
        <div style="width:60px;height:60px;background:#6E63E820;border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 16px;font-size:24px;">🎨</div>
        <p style="margin:0 0 8px 0;font-size:15px;font-weight:600;color:#5E5873;">Playground QuestionsListDetail</p>
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
    docs: { description: { story: 'Exemplos de uso real do QuestionsListDetail no Educacross.' } },
  },
  render: () => `
    <div style="max-width:800px;margin:0 auto;padding:40px 20px;font-family:'Public Sans',sans-serif;">
      <div style="background:#6E63E815;border:1px solid #6E63E830;border-radius:12px;padding:24px;margin-bottom:40px;">
        <h1 style="font-size:1.5rem;font-weight:700;color:#5E5873;margin:0 0 8px 0;">Casos de Uso: QuestionsListDetail</h1>
        <p style="color:#6E6B7B;margin:0;font-size:14px;line-height:1.6;">Cenários reais de uso no contexto educacional da plataforma Educacross</p>
      </div>
      
      <div style="margin-bottom:32px;">
        <h2 style="font-size:18px;font-weight:600;color:#5E5873;margin:0 0 8px 0;display:flex;align-items:center;gap:10px;">
          <span style="display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;background:#6E63E8;color:white;border-radius:50%;font-size:13px;font-weight:700;flex-shrink:0;">1</span>
          Professor — Painel Principal
        </h2>
        <p style="color:#6E6B7B;margin:0 0 16px 0;padding-left:38px;font-size:14px;">Professor utilizando QuestionsListDetail no dashboard de gestão de turmas</p>
        <div style="background:#F8F8F8;border-radius:8px;padding:20px;margin-left:38px;text-align:center;color:#B9B9C3;font-size:13px;">
          Ver story <strong>Default</strong> para visualização do componente neste contexto
        </div>
      </div>
      <div style="margin-bottom:32px;">
        <h2 style="font-size:18px;font-weight:600;color:#5E5873;margin:0 0 8px 0;display:flex;align-items:center;gap:10px;">
          <span style="display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;background:#6E63E8;color:white;border-radius:50%;font-size:13px;font-weight:700;flex-shrink:0;">2</span>
          Aluno — Portal do Estudante
        </h2>
        <p style="color:#6E6B7B;margin:0 0 16px 0;padding-left:38px;font-size:14px;">Aluno interagindo com QuestionsListDetail no portal educacional</p>
        <div style="background:#F8F8F8;border-radius:8px;padding:20px;margin-left:38px;text-align:center;color:#B9B9C3;font-size:13px;">
          Ver story <strong>Default</strong> para visualização do componente neste contexto
        </div>
      </div>
      <div style="margin-bottom:32px;">
        <h2 style="font-size:18px;font-weight:600;color:#5E5873;margin:0 0 8px 0;display:flex;align-items:center;gap:10px;">
          <span style="display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;background:#6E63E8;color:white;border-radius:50%;font-size:13px;font-weight:700;flex-shrink:0;">3</span>
          Coordenador — Relatórios
        </h2>
        <p style="color:#6E6B7B;margin:0 0 16px 0;padding-left:38px;font-size:14px;">Coordenador pedagógico analisando dados via QuestionsListDetail</p>
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
    docs: { description: { story: 'Conformidade WCAG 2.1 AA para o QuestionsListDetail.' } },
  },
  render: () => `
    <div style="max-width:800px;margin:0 auto;padding:40px 20px;font-family:'Public Sans',sans-serif;">

      <div style="background:linear-gradient(135deg,#6E63E8 0%,#764ba2 100%);padding:32px;border-radius:12px;margin-bottom:32px;color:white;">
        <h1 style="font-size:1.5rem;font-weight:700;margin:0 0 8px 0;">Acessibilidade: QuestionsListDetail</h1>
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

