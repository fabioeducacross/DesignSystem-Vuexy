const Y={title:"Educacross Components V2/Evaluations/QuestionAlternative",tags:["autodocs"],parameters:{layout:"centered",docs:{description:{component:`
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

# QuestionAlternative

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
        `}}}},i=`
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
`,s={render:()=>`
      ${i}
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
    `},r={render:()=>`
      ${i}
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
    `},d={render:()=>`
      ${i}
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
    `},c={render:()=>`
      ${i}
      <div class="question-container">
        <h4 class="question-title">Qual figura representa um triângulo?</h4>
        
        <div class="alternatives-grid">
          <div class="card-alternative">
            <div class="letter-container">
              <div class="question-letter">A</div>
            </div>
            <div class="content-img">
              <svg width="120" height="120" viewBox="0 0 120 120">
                <rect x="30" y="30" width="60" height="60" fill="none" stroke="#6e63e8" stroke-width="3"/>
              </svg>
            </div>
          </div>
          
          <div class="card-alternative correct">
            <div class="letter-container">
              <div class="question-letter">B</div>
            </div>
            <div class="content-img">
              <svg width="120" height="120" viewBox="0 0 120 120">
                <polygon points="60,20 100,100 20,100" fill="none" stroke="#28c76f" stroke-width="3"/>
              </svg>
            </div>
            <div class="feedback-icon correct">✓</div>
          </div>
          
          <div class="card-alternative">
            <div class="letter-container">
              <div class="question-letter">C</div>
            </div>
            <div class="content-img">
              <svg width="120" height="120" viewBox="0 0 120 120">
                <circle cx="60" cy="60" r="40" fill="none" stroke="#ff9f43" stroke-width="3"/>
              </svg>
            </div>
          </div>
          
          <div class="card-alternative">
            <div class="letter-container">
              <div class="question-letter">D</div>
            </div>
            <div class="content-img">
              <svg width="120" height="120" viewBox="0 0 120 120">
                <polygon points="60,20 100,50 90,100 30,100 20,50" fill="none" stroke="#00cfe8" stroke-width="3"/>
              </svg>
            </div>
          </div>
        </div>
      </div>
    `},o={render:()=>`
      ${i}
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
    `},l={render:()=>{const K=`
      ${i}
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
    `;return setTimeout(()=>{const m=document.getElementById("interactive-question");if(!m)return;const n=m.querySelectorAll(".card-alternative"),u=document.getElementById("submit-btn"),X=document.getElementById("reset-btn");let p=null;n.forEach((e,a)=>{e.addEventListener("click",()=>{e.classList.contains("correct")||e.classList.contains("incorrect")||(n.forEach(t=>t.classList.remove("selected")),e.classList.add("selected"),p=a,u.disabled=!1)})}),u.addEventListener("click",()=>{if(p===null)return;const e=n[p],a=e.dataset.correct==="true";n.forEach(t=>{t.classList.remove("selected"),t.dataset.correct==="true"?(t.classList.add("correct"),t.innerHTML+='<div class="feedback-icon correct">✓</div>'):t===e&&!a&&(t.classList.add("incorrect"),t.innerHTML+='<div class="feedback-icon incorrect">✗</div>')}),u.disabled=!0}),X.addEventListener("click",()=>{n.forEach(e=>{e.classList.remove("selected","correct","incorrect");const a=e.querySelector(".feedback-icon");a&&a.remove()}),p=null,u.disabled=!0})},100),K}},v={render:()=>`
      ${i}
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
    `};var g,f,x,b,h;s.parameters={...s.parameters,docs:{...(g=s.parameters)==null?void 0:g.docs,source:{originalSource:`{
  render: () => {
    return \`
      \${questionAlternativeStyles}
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
    \`;
  }
}`,...(x=(f=s.parameters)==null?void 0:f.docs)==null?void 0:x.source},description:{story:"Default - 4 alternativas de texto (questão de Geografia)",...(h=(b=s.parameters)==null?void 0:b.docs)==null?void 0:h.description}}};var q,y,E,k,A;r.parameters={...r.parameters,docs:{...(q=r.parameters)==null?void 0:q.docs,source:{originalSource:`{
  render: () => {
    return \`
      \${questionAlternativeStyles}
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
    \`;
  }
}`,...(E=(y=r.parameters)==null?void 0:y.docs)==null?void 0:E.source},description:{story:"AllStates - Estados: Default, Selected, Correct, Incorrect",...(A=(k=r.parameters)==null?void 0:k.docs)==null?void 0:A.description}}};var B,C,w,S,Q;d.parameters={...d.parameters,docs:{...(B=d.parameters)==null?void 0:B.docs,source:{originalSource:`{
  render: () => {
    return \`
      \${questionAlternativeStyles}
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
    \`;
  }
}`,...(w=(C=d.parameters)==null?void 0:C.docs)==null?void 0:w.source},description:{story:"MathQuestion - Questão de Matemática",...(Q=(S=d.parameters)==null?void 0:S.docs)==null?void 0:Q.description}}};var L,I,D,z,R;c.parameters={...c.parameters,docs:{...(L=c.parameters)==null?void 0:L.docs,source:{originalSource:`{
  render: () => {
    return \`
      \${questionAlternativeStyles}
      <div class="question-container">
        <h4 class="question-title">Qual figura representa um triângulo?</h4>
        
        <div class="alternatives-grid">
          <div class="card-alternative">
            <div class="letter-container">
              <div class="question-letter">A</div>
            </div>
            <div class="content-img">
              <svg width="120" height="120" viewBox="0 0 120 120">
                <rect x="30" y="30" width="60" height="60" fill="none" stroke="#6e63e8" stroke-width="3"/>
              </svg>
            </div>
          </div>
          
          <div class="card-alternative correct">
            <div class="letter-container">
              <div class="question-letter">B</div>
            </div>
            <div class="content-img">
              <svg width="120" height="120" viewBox="0 0 120 120">
                <polygon points="60,20 100,100 20,100" fill="none" stroke="#28c76f" stroke-width="3"/>
              </svg>
            </div>
            <div class="feedback-icon correct">✓</div>
          </div>
          
          <div class="card-alternative">
            <div class="letter-container">
              <div class="question-letter">C</div>
            </div>
            <div class="content-img">
              <svg width="120" height="120" viewBox="0 0 120 120">
                <circle cx="60" cy="60" r="40" fill="none" stroke="#ff9f43" stroke-width="3"/>
              </svg>
            </div>
          </div>
          
          <div class="card-alternative">
            <div class="letter-container">
              <div class="question-letter">D</div>
            </div>
            <div class="content-img">
              <svg width="120" height="120" viewBox="0 0 120 120">
                <polygon points="60,20 100,50 90,100 30,100 20,50" fill="none" stroke="#00cfe8" stroke-width="3"/>
              </svg>
            </div>
          </div>
        </div>
      </div>
    \`;
  }
}`,...(D=(I=c.parameters)==null?void 0:I.docs)==null?void 0:D.source},description:{story:"ImageAlternatives - Questão com figuras geométricas",...(R=(z=c.parameters)==null?void 0:z.docs)==null?void 0:R.description}}};var T,M,H,P,$;o.parameters={...o.parameters,docs:{...(T=o.parameters)==null?void 0:T.docs,source:{originalSource:`{
  render: () => {
    return \`
      \${questionAlternativeStyles}
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
    \`;
  }
}`,...(H=(M=o.parameters)==null?void 0:M.docs)==null?void 0:H.source},description:{story:"ScienceQuestion - Questão de Ciências com texto longo",...($=(P=o.parameters)==null?void 0:P.docs)==null?void 0:$.description}}};var F,V,U,j,O;l.parameters={...l.parameters,docs:{...(F=l.parameters)==null?void 0:F.docs,source:{originalSource:`{
  render: () => {
    const html = \`
      \${questionAlternativeStyles}
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
    \`;
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
}`,...(U=(V=l.parameters)==null?void 0:V.docs)==null?void 0:U.source},description:{story:"InteractiveQuestion - Questão interativa (clicável)",...(O=(j=l.parameters)==null?void 0:j.docs)==null?void 0:O.description}}};var J,N,_,G,W;v.parameters={...v.parameters,docs:{...(J=v.parameters)==null?void 0:J.docs,source:{originalSource:`{
  render: () => {
    return \`
      \${questionAlternativeStyles}
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
    \`;
  }
}`,...(_=(N=v.parameters)==null?void 0:N.docs)==null?void 0:_.source},description:{story:"PortugueseQuestion - Questão de Português (interpretação)",...(W=(G=v.parameters)==null?void 0:G.docs)==null?void 0:W.description}}};const Z=["Default","AllStates","MathQuestion","ImageAlternatives","ScienceQuestion","InteractiveQuestion","PortugueseQuestion"];export{r as AllStates,s as Default,c as ImageAlternatives,l as InteractiveQuestion,d as MathQuestion,v as PortugueseQuestion,o as ScienceQuestion,Z as __namedExportsOrder,Y as default};
