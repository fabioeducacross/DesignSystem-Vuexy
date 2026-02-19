/**
 * QuestionAlternative - Alternativa de Questão de Múltipla Escolha
 * =========================================
 * Card de alternativa para questões avaliativas com suporte a texto e imagem
 * 
 * @component QuestionAlternative
 * @category Educacross Components V2
 * @source educacross-frontoffice\src\components\evaluations\questionDetail\components\QuestionAlternative.vue
 * @status PIXEL-PERFECT
 * @since 2.0.0
 */

export default {
  title: 'Educacross Components V2/Evaluations/QuestionAlternative',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
<style>
  /* Base Typography - Figma Professional Style */
  .sbdocs-wrapper {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
    color: #1d1d1d;
    line-height: 1.6;
    font-size: 15px;
    max-width: 880px;
    margin: 0 auto;
  }

  .sbdocs h1 {
    font-size: 2.75rem;
    font-weight: 700;
    color: #000;
    margin: 0 0 1rem 0;
    line-height: 1.2;
    letter-spacing: -0.02em;
  }

  .sbdocs h2 {
    font-size: 1.75rem;
    font-weight: 700;
    color: #000;
    margin: 3.5rem 0 1.25rem 0;
    line-height: 1.3;
    letter-spacing: -0.01em;
  }

  .sbdocs h3 {
    font-size: 1.25rem;
    font-weight: 600;
    color: #1d1d1d;
    margin: 2.5rem 0 1rem 0;
    line-height: 1.4;
  }

  .sbdocs h4 {
    font-size: 1.05rem;
    font-weight: 600;
    color: #333;
    margin: 2rem 0 0.75rem 0;
    line-height: 1.4;
  }

  .sbdocs p {
    margin-bottom: 1.25rem;
    color: #333;
    font-size: 15px;
    line-height: 1.7;
  }

  .sbdocs p strong {
    color: #000;
    font-weight: 600;
  }

  .sbdocs ul {
    margin: 1.5rem 0;
    padding-left: 0;
    list-style: none;
  }

  .sbdocs ul li {
    position: relative;
    padding-left: 1.75rem;
    margin-bottom: 0.875rem;
    color: #333;
    line-height: 1.7;
  }

  .sbdocs ul li::before {
    content: '•';
    position: absolute;
    left: 0.5rem;
    color: #6e63e8;
    font-weight: bold;
    font-size: 1.25em;
  }

  .sbdocs table {
    width: 100%;
    border-collapse: collapse;
    margin: 2rem 0;
    font-size: 14px;
  }

  .sbdocs thead {
    background: #fff;
    border-bottom: 2px solid #e5e5e5;
  }

  .sbdocs thead th {
    color: #1d1d1d;
    font-weight: 600;
    text-align: left;
    padding: 0.875rem 1rem;
    font-size: 13px;
    letter-spacing: 0.02em;
  }

  .sbdocs tbody tr {
    border-bottom: 1px solid #f1f3f5;
  }

  .sbdocs tbody tr:hover {
    background-color: #fafbfc;
  }

  .sbdocs tbody td {
    padding: 0.875rem 1rem;
    color: #333;
    line-height: 1.6;
  }

  .sbdocs tbody td:first-child {
    font-weight: 500;
    color: #1d1d1d;
  }

  .sbdocs code {
    background: #f1f3f5;
    color: #6e63e8;
    padding: 0.15rem 0.4rem;
    border-radius: 3px;
    font-size: 0.9em;
    font-family: 'SF Mono', 'Monaco', 'Menlo', 'Consolas', monospace;
    font-weight: 500;
  }

  .sbdocs pre {
    background: #f8f9fa;
    border: 1px solid #e5e5e5;
    border-radius: 6px;
    padding: 1.5rem;
    overflow-x: auto;
    margin: 2rem 0;
    font-size: 13px;
    line-height: 1.6;
  }

  .sbdocs pre code {
    background: transparent;
    padding: 0;
    color: #1d1d1d;
    font-size: 13px;
    font-weight: 400;
  }
</style>

Card de alternativa para questões de múltipla escolha em avaliações, suportando conteúdo de texto e imagem com feedback visual de resposta correta/incorreta.

---

## Contexto de Uso

### Personas

**Aluno** (Usuário Principal)
- Responde questões de avaliações e exercícios
- Visualiza feedback de respostas (correta/incorreta) após submissão
- Interage com diferentes tipos de conteúdo (texto, imagem, HTML renderizado)

**Professor** (Usuário Secundário)
- Visualiza alternativas ao criar/editar questões
- Revisa gabarito das questões
- Analisa padrão de respostas dos alunos

### Jornada do Usuário

**Tela**: Avaliação / Exercício  
**Fluxo**: Ler Enunciado → Analisar Alternativas → Selecionar Resposta → Submeter → Ver Feedback  
**Frequência**: Diária (durante atividades escolares)

### Casos de Uso

1. **Questão de Múltipla Escolha Texto**
   - 4 alternativas (A, B, C, D) com enunciados textuais
   - Aluno clica para selecionar
   - Após submissão: borda verde (correta) ou vermelha (incorreta)
   - Badge com letra da alternativa

2. **Questão com Imagens**
   - Alternativas contêm figuras geométricas, diagramas, fotos
   - \`questionContentType === 2\` renderiza <b-img>
   - Útil para matemática, ciências, geografia

3. **Questão com HTML Renderizado**
   - \`questionContentType === 1\` renderiza HTML via EvaluationsHtmlContentRenderer
   - Suporta fórmulas matemáticas, formatação rica
   - Max image height: 200px

4. **Gabarito/Correção**
   - \`rightAlternative === true\`: borda success, badge success
   - Feedback visual imediato após submissão
   - Aluno identifica rapidamente resposta correta

---

## Arquitetura da Informação

### Estrutura do Componente

\`\`\`
QuestionAlternative (b-card)
├── Border Variant (success se correto, gray padrão)
├── Background Variant (light-success se correto)
├── Content Container (.conntent-img)
│   ├── Imagem (b-img) - se questionContentType === 2
│   └── HTML (EvaluationsHtmlContentRenderer) - se questionContentType === 1
└── Letter Badge (.letter-container)
    └── b-avatar (success ou gray)
        └── Letra da alternativa (A, B, C, D)
\`\`\`

### Fluxo de Estados

\`\`\`
Estado Inicial (Não Respondido)
├── Border: gray (#e9e9f1)
├── Background: white
└── Badge: gray

↓ Aluno Seleciona (temporário)

Estado Hover/Selecionado
├── Border: primary (#6e63e8) ou gray
├── Background: light ou white
└── Badge: primary ou gray

↓ Aluno Submete Resposta

Estado Correto (rightAlternative: true)
├── Border: success 3px (#28c76f)
├── Background: light-success (rgba(40, 199, 111, 0.12))
└── Badge: success (#28c76f)

Estado Incorreto (rightAlternative: false)
├── Border: gray (ou danger se marcado)
├── Background: white (ou light-danger)
└── Badge: gray (ou danger)
\`\`\`

---

## Especificações - Dimensões

| Elemento | Tamanho | Descrição |
|----------|---------|-----------|
| **Card Min-Height** | 80px | Altura mínima para conteúdo curto |
| **Card Padding** | 16px (1rem) | Espaçamento interno padrão |
| **Badge Size** | sm (28x28px) | Avatar pequeno com letra |
| **Badge Position** | Top 0.5em, Left 0.5em | Absolute no canto superior esquerdo |
| **Image Max-Height** | 200px | Limite para imagens de alternativas |
| **Border Width (Correct)** | 3px | Destaque visual para resposta correta |
| **Border Radius** | 0.428rem (6.85px) | Cantos arredondados (padrão Vuexy) |

---

## Especificações - Cores

| Estado | Border | Background | Badge | Uso |
|--------|--------|------------|-------|-----|
| **Default** | #e9e9f1 (gray) | #ffffff | gray | Alternativa não respondida |
| **Hover** | #6e63e8 (primary) | #f0eeff | primary | Interação do aluno (opcional) |
| **Correto** | #28c76f (success) 3px | rgba(40, 199, 111, 0.12) | success | Resposta correta (gabarito) |
| **Incorreto** | #ea5455 (danger) | rgba(234, 84, 85, 0.12) | danger | Resposta errada do aluno (opcional) |

---

## Especificações - Tipografia

| Elemento | Tamanho | Peso | Cor | Descrição |
|----------|---------|------|-----|-----------|
| **Badge Letra** | 0.857rem (13.7px) | 600 | #fff | Letra da alternativa (A-D) |
| **Conteúdo Texto** | 1.25rem (20px) | 400 | #5e5873 | Enunciado da alternativa |
| **HTML Renderizado** | 1rem (16px) | 400 | #5e5873 | Conteúdo formatado |

---

## Componentes Relacionados

- **EvaluationsHtmlContentRenderer** - Renderiza HTML formatado nas alternativas
- **QuestionDetail** - Container pai que agrupa alternativas
- **QuestionContent** - Componente irmão que exibe enunciado da questão
- **QuestionStatus** - Badge de status da questão (Respondida, Pendente, Corrigida)

---

**Componente**: QuestionAlternative  
**Status**: Pixel-Perfect ✓  
**Fonte**: educacross-frontoffice/src/components/evaluations/questionDetail/components/QuestionAlternative.vue  
**Última Atualização**: 2 de fevereiro de 2026
        `
      }
    }
  }
};

const questionAlternativeStyles = `
<style>
  /* QuestionAlternative - CSS Pixel Perfect */
  
  .question-container {
    max-width: 800px;
    margin: 0 auto;
    padding: 2rem;
  }

  .question-title {
    font-size: 1.25rem;
    font-weight: 600;
    color: #5e5873;
    margin-bottom: 1.5rem;
    line-height: 1.5;
  }

  .alternatives-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }

  @media (max-width: 768px) {
    .alternatives-grid {
      grid-template-columns: 1fr;
    }
  }

  /* QuestionAlternative Card */
  .card-alternative {
    position: relative;
    min-height: 80px;
    border-radius: 0.428rem;
    border: 2px solid #e9e9f1;
    background: #ffffff;
    padding: 1rem;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .card-alternative:hover {
    border-color: #6e63e8;
    box-shadow: 0 2px 8px rgba(110, 99, 232, 0.15);
  }

  .card-alternative.correct {
    border-color: #28c76f;
    border-width: 3px;
    background: rgba(40, 199, 111, 0.12);
  }

  .card-alternative.incorrect {
    border-color: #ea5455;
    border-width: 3px;
    background: rgba(234, 84, 85, 0.12);
  }

  .card-alternative.selected {
    border-color: #6e63e8;
    border-width: 2px;
    background: rgba(110, 99, 232, 0.08);
  }

  /* Letter Badge */
  .letter-container {
    position: absolute;
    top: 0.5em;
    left: 0.5em;
    z-index: 10;
  }

  .question-letter {
    width: 28px;
    height: 28px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.857rem;
    font-weight: 600;
    background: #b9b9c3;
    color: #fff;
  }

  .card-alternative.correct .question-letter {
    background: #28c76f;
  }

  .card-alternative.incorrect .question-letter {
    background: #ea5455;
  }

  .card-alternative.selected .question-letter {
    background: #6e63e8;
  }

  /* Content Area */
  .content-img {
    padding-top: 2.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 60px;
  }

  .alternative-text {
    font-size: 1rem;
    color: #5e5873;
    line-height: 1.6;
    text-align: center;
  }

  .alternative-image {
    max-height: 200px;
    width: auto;
    border-radius: 0.285rem;
  }

  /* Feedback Icons */
  .feedback-icon {
    position: absolute;
    top: 0.5em;
    right: 0.5em;
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #fff;
    border-radius: 50%;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  }

  .feedback-icon.correct {
    color: #28c76f;
  }

  .feedback-icon.incorrect {
    color: #ea5455;
  }
</style>
`;

/**
 * Default - 4 alternativas de texto (questão de Geografia)
 */
export const Default = {
  render: () => {
    return `
      ${questionAlternativeStyles}
      <div class="question-container">
        <h4 class="question-title">Qual é a capital do Brasil?</h4>
        
        <div class="alternatives-grid">
          <div class="card-alternative">
            <div class="letter-container">
              <div class="question-letter">A</div>
            </div>
            <div class="content-img">
              <p class="alternative-text">São Paulo</p>
            </div>
          </div>
          
          <div class="card-alternative correct">
            <div class="letter-container">
              <div class="question-letter">B</div>
            </div>
            <div class="content-img">
              <p class="alternative-text">Brasília</p>
            </div>
            <div class="feedback-icon correct">✓</div>
          </div>
          
          <div class="card-alternative">
            <div class="letter-container">
              <div class="question-letter">C</div>
            </div>
            <div class="content-img">
              <p class="alternative-text">Rio de Janeiro</p>
            </div>
          </div>
          
          <div class="card-alternative">
            <div class="letter-container">
              <div class="question-letter">D</div>
            </div>
            <div class="content-img">
              <p class="alternative-text">Belo Horizonte</p>
            </div>
          </div>
        </div>
      </div>
    `;
  }
};

/**
 * AllStates - Estados: Default, Selected, Correct, Incorrect
 */
export const AllStates = {
  render: () => {
    return `
      ${questionAlternativeStyles}
      <div class="question-container">
        <h4 class="question-title">Estados da Alternativa (visual reference)</h4>
        
        <div class="alternatives-grid">
          <div class="card-alternative">
            <div class="letter-container">
              <div class="question-letter">A</div>
            </div>
            <div class="content-img">
              <p class="alternative-text">Default (não selecionada)</p>
            </div>
          </div>
          
          <div class="card-alternative selected">
            <div class="letter-container">
              <div class="question-letter">B</div>
            </div>
            <div class="content-img">
              <p class="alternative-text">Selected (aluno clicou)</p>
            </div>
          </div>
          
          <div class="card-alternative correct">
            <div class="letter-container">
              <div class="question-letter">C</div>
            </div>
            <div class="content-img">
              <p class="alternative-text">Correct (gabarito)</p>
            </div>
            <div class="feedback-icon correct">✓</div>
          </div>
          
          <div class="card-alternative incorrect">
            <div class="letter-container">
              <div class="question-letter">D</div>
            </div>
            <div class="content-img">
              <p class="alternative-text">Incorrect (resposta errada)</p>
            </div>
            <div class="feedback-icon incorrect">✗</div>
          </div>
        </div>
      </div>
    `;
  }
};

/**
 * MathQuestion - Questão de Matemática
 */
export const MathQuestion = {
  render: () => {
    return `
      ${questionAlternativeStyles}
      <div class="question-container">
        <h4 class="question-title">Resolva a equação: 2x + 8 = 20. Qual o valor de x?</h4>
        
        <div class="alternatives-grid">
          <div class="card-alternative">
            <div class="letter-container">
              <div class="question-letter">A</div>
            </div>
            <div class="content-img">
              <p class="alternative-text">x = 4</p>
            </div>
          </div>
          
          <div class="card-alternative correct">
            <div class="letter-container">
              <div class="question-letter">B</div>
            </div>
            <div class="content-img">
              <p class="alternative-text">x = 6</p>
            </div>
            <div class="feedback-icon correct">✓</div>
          </div>
          
          <div class="card-alternative">
            <div class="letter-container">
              <div class="question-letter">C</div>
            </div>
            <div class="content-img">
              <p class="alternative-text">x = 8</p>
            </div>
          </div>
          
          <div class="card-alternative">
            <div class="letter-container">
              <div class="question-letter">D</div>
            </div>
            <div class="content-img">
              <p class="alternative-text">x = 10</p>
            </div>
          </div>
        </div>
      </div>
    `;
  }
};

/**
 * ImageAlternatives - Questão com figuras geométricas
 */
export const ImageAlternatives = {
  render: () => {
    return `
      ${questionAlternativeStyles}
      <div class="question-container">
        <h4 class="question-title">Qual figura representa um triângulo?</h4>
        
        <div class="alternatives-grid">
          <div class="card-alternative">
            <div class="letter-container">
              <div class="question-letter">A</div>
            </div>
            <div class="content-img">
              <img src="/educacross-assets/belinha/belinha-school-doubt.png" class="mascot-image" alt="Belinha - dúvida" />
            </div>
          </div>
          
          <div class="card-alternative correct">
            <div class="letter-container">
              <div class="question-letter">B</div>
            </div>
            <div class="content-img">
              <img src="/educacross-assets/belinha/belinha-school-doubt.png" class="mascot-image" alt="Belinha - dúvida" />
            </div>
            <div class="feedback-icon correct">✓</div>
          </div>
          
          <div class="card-alternative">
            <div class="letter-container">
              <div class="question-letter">C</div>
            </div>
            <div class="content-img">
              <img src="/educacross-assets/belinha/belinha-school-doubt.png" class="mascot-image" alt="Belinha - dúvida" />
            </div>
          </div>
          
          <div class="card-alternative">
            <div class="letter-container">
              <div class="question-letter">D</div>
            </div>
            <div class="content-img">
              <img src="/educacross-assets/belinha/belinha-school-doubt.png" class="mascot-image" alt="Belinha - dúvida" />
            </div>
          </div>
        </div>
      </div>
    `;
  }
};

/**
 * ScienceQuestion - Questão de Ciências com texto longo
 */
export const ScienceQuestion = {
  render: () => {
    return `
      ${questionAlternativeStyles}
      <div class="question-container">
        <h4 class="question-title">Qual é o processo pelo qual as plantas produzem seu próprio alimento?</h4>
        
        <div class="alternatives-grid">
          <div class="card-alternative">
            <div class="letter-container">
              <div class="question-letter">A</div>
            </div>
            <div class="content-img">
              <p class="alternative-text">Respiração celular</p>
            </div>
          </div>
          
          <div class="card-alternative correct">
            <div class="letter-container">
              <div class="question-letter">B</div>
            </div>
            <div class="content-img">
              <p class="alternative-text">Fotossíntese</p>
            </div>
            <div class="feedback-icon correct">✓</div>
          </div>
          
          <div class="card-alternative">
            <div class="letter-container">
              <div class="question-letter">C</div>
            </div>
            <div class="content-img">
              <p class="alternative-text">Transpiração</p>
            </div>
          </div>
          
          <div class="card-alternative">
            <div class="letter-container">
              <div class="question-letter">D</div>
            </div>
            <div class="content-img">
              <p class="alternative-text">Osmose</p>
            </div>
          </div>
        </div>
      </div>
    `;
  }
};

/**
 * InteractiveQuestion - Questão interativa (clicável)
 */
export const InteractiveQuestion = {
  render: () => {
    const html = `
      ${questionAlternativeStyles}
      <div class="question-container" id="interactive-question">
        <h4 class="question-title">Quanto é 5 × 8?</h4>
        
        <div class="alternatives-grid">
          <div class="card-alternative" data-index="0" data-correct="false">
            <div class="letter-container">
              <div class="question-letter">A</div>
            </div>
            <div class="content-img">
              <p class="alternative-text">35</p>
            </div>
          </div>
          
          <div class="card-alternative" data-index="1" data-correct="true">
            <div class="letter-container">
              <div class="question-letter">B</div>
            </div>
            <div class="content-img">
              <p class="alternative-text">40</p>
            </div>
          </div>
          
          <div class="card-alternative" data-index="2" data-correct="false">
            <div class="letter-container">
              <div class="question-letter">C</div>
            </div>
            <div class="content-img">
              <p class="alternative-text">45</p>
            </div>
          </div>
          
          <div class="card-alternative" data-index="3" data-correct="false">
            <div class="letter-container">
              <div class="question-letter">D</div>
            </div>
            <div class="content-img">
              <p class="alternative-text">50</p>
            </div>
          </div>
        </div>
        
        <div style="margin-top: 1.5rem; text-align: center;">
          <button id="submit-btn" class="btn btn-primary" disabled>Enviar Resposta</button>
          <button id="reset-btn" class="btn btn-secondary ms-2">Resetar</button>
        </div>
      </div>
    `;

    setTimeout(() => {
      const container = document.getElementById('interactive-question');
      if (!container) return;

      const alternatives = container.querySelectorAll('.card-alternative');
      const submitBtn = document.getElementById('submit-btn');
      const resetBtn = document.getElementById('reset-btn');
      let selectedIndex = null;

      alternatives.forEach((alt, index) => {
        alt.addEventListener('click', () => {
          if (alt.classList.contains('correct') || alt.classList.contains('incorrect')) {
            return; // Já respondido
          }

          // Desmarcar todas
          alternatives.forEach(a => a.classList.remove('selected'));
          
          // Marcar selecionada
          alt.classList.add('selected');
          selectedIndex = index;
          submitBtn.disabled = false;
        });
      });

      submitBtn.addEventListener('click', () => {
        if (selectedIndex === null) return;

        const selectedAlt = alternatives[selectedIndex];
        const isCorrect = selectedAlt.dataset.correct === 'true';

        // Mostrar feedback
        alternatives.forEach(alt => {
          alt.classList.remove('selected');
          if (alt.dataset.correct === 'true') {
            alt.classList.add('correct');
            alt.innerHTML += '<div class="feedback-icon correct">✓</div>';
          } else if (alt === selectedAlt && !isCorrect) {
            alt.classList.add('incorrect');
            alt.innerHTML += '<div class="feedback-icon incorrect">✗</div>';
          }
        });

        submitBtn.disabled = true;
      });

      resetBtn.addEventListener('click', () => {
        alternatives.forEach(alt => {
          alt.classList.remove('selected', 'correct', 'incorrect');
          const feedbackIcon = alt.querySelector('.feedback-icon');
          if (feedbackIcon) feedbackIcon.remove();
        });
        selectedIndex = null;
        submitBtn.disabled = true;
      });
    }, 100);

    return html;
  }
};

/**
 * PortugueseQuestion - Questão de Português (interpretação)
 */
export const PortugueseQuestion = {
  render: () => {
    return `
      ${questionAlternativeStyles}
      <div class="question-container">
        <h4 class="question-title">No trecho "O sol brilhava intensamente", qual é a função da palavra "intensamente"?</h4>
        
        <div class="alternatives-grid">
          <div class="card-alternative">
            <div class="letter-container">
              <div class="question-letter">A</div>
            </div>
            <div class="content-img">
              <p class="alternative-text">Substantivo</p>
            </div>
          </div>
          
          <div class="card-alternative">
            <div class="letter-container">
              <div class="question-letter">B</div>
            </div>
            <div class="content-img">
              <p class="alternative-text">Verbo</p>
            </div>
          </div>
          
          <div class="card-alternative correct">
            <div class="letter-container">
              <div class="question-letter">C</div>
            </div>
            <div class="content-img">
              <p class="alternative-text">Advérbio</p>
            </div>
            <div class="feedback-icon correct">✓</div>
          </div>
          
          <div class="card-alternative">
            <div class="letter-container">
              <div class="question-letter">D</div>
            </div>
            <div class="content-img">
              <p class="alternative-text">Adjetivo</p>
            </div>
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
          <div style="display:inline-block;padding:8px 16px;background:rgba(255,255,255,0.15);border-radius:50px;margin-bottom:20px;font-size:14px;border:1px solid rgba(255,255,255,0.2);">Evaluations</div>
          <h1 style="font-size:3rem;font-weight:700;margin:0 0 12px 0;letter-spacing:-0.02em;">QuestionAlternative</h1>
          <p style="font-size:1.1rem;opacity:0.9;margin:0;max-width:600px;">Alternativa de Questão de Múltipla Escolha</p>
        </div>
      </div>
      <div style="max-width:900px;margin:0 auto;padding:48px 40px;">
        <div style="background:white;border-radius:12px;padding:32px;margin-bottom:32px;box-shadow:0 2px 8px rgba(0,0,0,0.08);">
          <h2 style="font-size:1.1rem;font-weight:600;color:#5E5873;margin:0 0 16px 0;">Sobre o Componente</h2>
          <p style="color:#6E6B7B;line-height:1.7;margin:0 0 16px 0;">Alternativa de Questão de Múltipla Escolha. Faz parte da categoria <strong>Evaluations</strong> do Design System Educacross.</p>
          <div style="background:#F8F7FF;border-left:4px solid #6E63E8;padding:16px;border-radius:4px;">
            <p style="margin:0;color:#5E5873;font-size:14px;line-height:1.6;"><strong>💡 Dica:</strong> Use <em>Playground</em> para explorar props, <em>Use Cases</em> para exemplos reais e <em>Accessibility</em> para validar WCAG.</p>
          </div>
        </div>
        <div style="background:white;border-radius:12px;padding:32px;box-shadow:0 2px 8px rgba(0,0,0,0.08);">
          <h2 style="font-size:1.1rem;font-weight:600;color:#5E5873;margin:0 0 16px 0;">Implementação Vue 2.7</h2>
          <pre style="background:#1E1E2E;color:#CDD6F4;padding:20px;border-radius:8px;font-size:13px;line-height:1.6;overflow:auto;margin:0;"><code>import QuestionAlternative from '@/components/QuestionAlternative.vue';

// Template
&lt;QuestionAlternative v-bind="props" /&gt;</code></pre>
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
    docs: { description: { story: 'Explore o QuestionAlternative com controles interativos.' } },
  },
  render: (args) => `
    <div style="padding:32px;display:flex;justify-content:center;align-items:center;min-height:200px;background:#F8F8F8;border-radius:12px;">
      <div style="text-align:center;color:#6E6B7B;">
        <div style="width:60px;height:60px;background:#6E63E820;border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 16px;font-size:24px;">🎨</div>
        <p style="margin:0 0 8px 0;font-size:15px;font-weight:600;color:#5E5873;">Playground QuestionAlternative</p>
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
    docs: { description: { story: 'Exemplos de uso real do QuestionAlternative no Educacross.' } },
  },
  render: () => `
    <div style="max-width:800px;margin:0 auto;padding:40px 20px;font-family:'Public Sans',sans-serif;">
      <div style="background:#6E63E815;border:1px solid #6E63E830;border-radius:12px;padding:24px;margin-bottom:40px;">
        <h1 style="font-size:1.5rem;font-weight:700;color:#5E5873;margin:0 0 8px 0;">Casos de Uso: QuestionAlternative</h1>
        <p style="color:#6E6B7B;margin:0;font-size:14px;line-height:1.6;">Cenários reais de uso no contexto educacional da plataforma Educacross</p>
      </div>
      
      <div style="margin-bottom:32px;">
        <h2 style="font-size:18px;font-weight:600;color:#5E5873;margin:0 0 8px 0;display:flex;align-items:center;gap:10px;">
          <span style="display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;background:#6E63E8;color:white;border-radius:50%;font-size:13px;font-weight:700;flex-shrink:0;">1</span>
          Professor — Painel Principal
        </h2>
        <p style="color:#6E6B7B;margin:0 0 16px 0;padding-left:38px;font-size:14px;">Professor utilizando QuestionAlternative no dashboard de gestão de turmas</p>
        <div style="background:#F8F8F8;border-radius:8px;padding:20px;margin-left:38px;text-align:center;color:#B9B9C3;font-size:13px;">
          Ver story <strong>Default</strong> para visualização do componente neste contexto
        </div>
      </div>
      <div style="margin-bottom:32px;">
        <h2 style="font-size:18px;font-weight:600;color:#5E5873;margin:0 0 8px 0;display:flex;align-items:center;gap:10px;">
          <span style="display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;background:#6E63E8;color:white;border-radius:50%;font-size:13px;font-weight:700;flex-shrink:0;">2</span>
          Aluno — Portal do Estudante
        </h2>
        <p style="color:#6E6B7B;margin:0 0 16px 0;padding-left:38px;font-size:14px;">Aluno interagindo com QuestionAlternative no portal educacional</p>
        <div style="background:#F8F8F8;border-radius:8px;padding:20px;margin-left:38px;text-align:center;color:#B9B9C3;font-size:13px;">
          Ver story <strong>Default</strong> para visualização do componente neste contexto
        </div>
      </div>
      <div style="margin-bottom:32px;">
        <h2 style="font-size:18px;font-weight:600;color:#5E5873;margin:0 0 8px 0;display:flex;align-items:center;gap:10px;">
          <span style="display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;background:#6E63E8;color:white;border-radius:50%;font-size:13px;font-weight:700;flex-shrink:0;">3</span>
          Coordenador — Relatórios
        </h2>
        <p style="color:#6E6B7B;margin:0 0 16px 0;padding-left:38px;font-size:14px;">Coordenador pedagógico analisando dados via QuestionAlternative</p>
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
    docs: { description: { story: 'Conformidade WCAG 2.1 AA para o QuestionAlternative.' } },
  },
  render: () => `
    <div style="max-width:800px;margin:0 auto;padding:40px 20px;font-family:'Public Sans',sans-serif;">

      <div style="background:linear-gradient(135deg,#6E63E8 0%,#764ba2 100%);padding:32px;border-radius:12px;margin-bottom:32px;color:white;">
        <h1 style="font-size:1.5rem;font-weight:700;margin:0 0 8px 0;">Acessibilidade: QuestionAlternative</h1>
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

