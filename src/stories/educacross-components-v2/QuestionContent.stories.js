/**
 * QuestionContent - Question Display Component
 * 
 * Componente para exibição de questões de avaliação/missão com alternativas, imagens, fórmulas e feedback.
 * Suporta múltipla escolha, dissertativa, verdadeiro/falso com feedback visual correto/incorreto.
 * 
 * @component QuestionContent
 * @category Educacross Components V2
 * @subcategory Feedback
 * @priority P2
 * @status EXPANDED
 * @since v2.0
 * 
 * Key Features:
 * - ✅ Question header: número circular 40px roxo #6E63E8 + meta (tipo, pontos) right
 * - ✅ Question text: font-size 15px, line-height 1.8, margin 16×0
 * - ✅ Image opcional: max-width 100%, border-radius 8px, margin 16×0
 * - ✅ Formula opcional: monospace, background #F8F8F8, padding 16px, text-align center
 * - ✅ Alternatives: radio inputs com labels padding 12px border 2px #D8D6DE, hover border roxo
 * - ✅ Explanation: background verde #E8F5E9, border-left 4px #28C76F, padding 16px, icon lightbulb
 * - ✅ Feedback correto: background verde #E8F5E9 + checkmark verde
 * - ✅ Feedback incorreto: background vermelho #FFEBEE + X vermelho + "Resposta correta" arrow
 * 
 * Real-world usage:
 * - Questões múltipla escolha (A, B, C, D com radio)
 * - Questões com imagem (pizza SVG frações, gráficos)
 * - Questões com fórmula matemática (monospace centered)
 * - Questões dissertativas (textarea 200px height)
 * - Feedback explicação (após resposta correta)
 * - Feedback erro (após resposta incorreta + mostrar correta)
 * - Verdadeiro ou Falso (badge laranja)
 */

export default {
  title: 'Front-office/Feedback/QuestionContent',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
# QuestionContent

Componente para **exibição de questões** de avaliação/missão com alternativas, imagens, fórmulas e feedback.

## Quando usar

- ✅ Avaliações aplicadas (aluno respondendo questões)
- ✅ Revisão de respostas (professor corrigindo)
- ✅ Feedback pós-resposta (explicação + correção)
- ✅ Banco de questões (preview de questões)
- ✅ Relatórios de desempenho (questões com respostas)
- ✅ Impressão de avaliações (PDF)

## Tipos de questões

- **Múltipla escolha**: 4 alternativas (A, B, C, D) com radio inputs
- **Dissertativa**: Textarea com contador de linhas (mínimo 10 linhas)
- **Verdadeiro ou Falso**: 2 opções (badge laranja)
- **Com imagem**: Imagem + alternativas (pizza frações, gráficos)
- **Com fórmula**: Fórmula matemática monospace centered

## Variantes

- **Default**: Q1 Múltipla Escolha + "3/4 + 1/2" + 4 alternativas
- **ComImagem**: Q2 + pizza SVG 3/4 colorida + "Observe figura" + 4 frações
- **ComFormula**: Q3 + monospace "2x + 5 = 13" + 4 alternativas x=2/4/6/8
- **Dissertativa**: Q4 + textarea 200px + contador "0 / 10 linhas" + badge cyan
- **ComExplicacao**: Q5 + alternativas + C) 45 selected verde + explicação lightbulb "Para resolver..."
- **ComFeedback**: Q6 substantivo próprio + B) Brasil selected + feedback correto verde checkmark
- **FeedbackErro**: Q7 capital Brasil + A) São Paulo selected vermelho X + B) Brasília arrow "Resposta correta"
- **VerdadeiroOuFalso**: Q8 badge laranja "V ou F" + "Água ferve 100°C" + 2 alternativas Verdadeiro/Falso

## Características visuais

- **Number circle**: 40×40px, background #6E63E8, color #fff, font-size 18px, weight 700
- **Meta**: font-size 13px, color #6E6B7B, text-align right (tipo, pontos)
- **Text**: font-size 15px, line-height 1.8, color #5E5873
- **Alternative**: padding 12px, border 2px #D8D6DE, border-radius 6px, hover border #6E63E8
- **Alternative selected**: border #6E63E8, background #F8F8F8
- **Feedback correto**: background #E8F5E9, color #28C76F, border-left 4px #28C76F
- **Feedback incorreto**: background #FFEBEE, color #EA5455, border-left 4px #EA5455
        `
      }
    }
  }
};

/**
 * ## Props API (sem props - display only component)
 * 
 * | Prop | Type | Default | Description |
 * |------|------|---------|-------------|
 * | number | Number | 1 | Número da questão (exibido no círculo roxo) |
 * | type | String | 'multiple' | Tipo: 'multiple', 'essay', 'truefalse' |
 * | text | String | '' | Texto da questão (enunciado) |
 * | image | String | null | URL da imagem opcional |
 * | formula | String | null | Fórmula matemática opcional (monospace) |
 * | alternatives | Array | [] | Lista de alternativas [{id, text}] |
 * | selectedId | String | null | ID da alternativa selecionada |
 * | correctId | String | null | ID da alternativa correta (para feedback) |
 * | explanation | String | null | Texto de explicação após resposta |
 * | feedback | Object | null | Feedback {type: 'correct'/'incorrect', message} |
 * | points | Number | 10 | Pontos da questão |
 * | minLines | Number | 10 | Mínimo de linhas (dissertativa) |
 * 
 * ## Design Specs
 * 
 * **Cores:**
 * - Number circle: background `#6E63E8`, color `#fff`
 * - Meta badge: background `#E8F5E9` (múltipla escolha verde), `#E0F7FA` (dissertativa cyan), `#FFF8E1` (V ou F laranja)
 * - Alternative: border `2px #D8D6DE`, hover border `2px #6E63E8`
 * - Alternative selected: border `2px #6E63E8`, background `#F8F8F8`
 * - Explanation: background `#E8F5E9`, border-left `4px #28C76F`, color `#28C76F`
 * - Feedback correto: background `#E8F5E9`, border-left `4px #28C76F`, color `#28C76F`
 * - Feedback incorreto: background `#FFEBEE`, border-left `4px #EA5455`, color `#EA5455`
 * 
 * **Dimensões:**
 * - Container: padding `20px`, background `#fff`, border `1px #D8D6DE`, border-radius `8px`
 * - Number circle: `40×40px`, border-radius `50%`, font-size `18px`
 * - Question text: font-size `15px`, line-height `1.8`, margin `16px 0`
 * - Image: max-width `100%`, border-radius `8px`, margin `16px 0`
 * - Formula: padding `16px`, border-radius `6px`, font-size `16px`, margin `16px 0`
 * - Alternative: padding `12px`, border-radius `6px`, gap `12px`, margin-bottom `10px`
 * - Radio: width `18px`, height `18px`
 * - Explanation/Feedback: padding `16px`, border-radius `6px`, margin-top `20px`
 * 
 * **Tipografia:**
 * - Number: font-size `18px`, font-weight `700`
 * - Meta: font-size `13px`, font-weight `500`
 * - Question text: font-size `15px`, line-height `1.8`
 * - Alternative: font-size `15px`, line-height `1.6`
 * - Formula: font-family `'Courier New', monospace`, font-size `16px`
 * 
 * **Animações:**
 * - Alternative hover: transition `border .2s`
 */

const styles = `<style>
.question-content {
  padding: 20px;
  background: #fff;
  border: 1px solid #D8D6DE;
  border-radius: 8px;
}

.question-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 16px;
  border-bottom: 1px solid #E8E8E8;
  margin-bottom: 16px;
}

.question-number {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #6E63E8;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  font-weight: 700;
}

.question-meta {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 4px;
  font-size: 13px;
  color: #6E6B7B;
}

.question-badge {
  padding: 4px 10px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
}

.question-badge.multiple {
  background: #E8F5E9;
  color: #28C76F;
}

.question-badge.essay {
  background: #E0F7FA;
  color: #00CFE8;
}

.question-badge.truefalse {
  background: #FFF8E1;
  color: #FF9800;
}

.question-text {
  font-size: 15px;
  line-height: 1.8;
  color: #5E5873;
  margin: 0 0 16px;
}

.question-image {
  max-width: 100%;
  border-radius: 8px;
  margin: 16px 0;
  display: block;
}

.question-formula {
  background: #F8F8F8;
  padding: 16px;
  border-radius: 6px;
  font-family: 'Courier New', monospace;
  font-size: 16px;
  text-align: center;
  margin: 16px 0;
  color: #5E5873;
}

.question-alternatives {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin: 16px 0;
}

.question-alt {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  border: 2px solid #D8D6DE;
  border-radius: 6px;
  cursor: pointer;
  transition: border .2s;
}

.question-alt:hover {
  border-color: #6E63E8;
}

.question-alt.selected {
  border-color: #6E63E8;
  background: #F8F8F8;
}

.question-alt input[type="radio"] {
  width: 18px;
  height: 18px;
  cursor: pointer;
}

.question-alt label {
  flex: 1;
  font-size: 15px;
  line-height: 1.6;
  color: #5E5873;
  cursor: pointer;
  margin: 0;
}

.question-textarea {
  width: 100%;
  min-height: 200px;
  padding: 12px;
  border: 2px solid #D8D6DE;
  border-radius: 6px;
  font-size: 14px;
  line-height: 1.6;
  color: #5E5873;
  font-family: system-ui;
  resize: vertical;
}

.question-textarea:focus {
  outline: none;
  border-color: #6E63E8;
}

.question-explanation {
  background: #E8F5E9;
  border-left: 4px solid #28C76F;
  padding: 16px;
  border-radius: 6px;
  margin-top: 20px;
  display: flex;
  gap: 12px;
}

.question-explanation i {
  color: #28C76F;
  font-size: 20px;
}

.question-explanation-text {
  flex: 1;
  font-size: 14px;
  line-height: 1.6;
  color: #28C76F;
  margin: 0;
}

.feedback-correct {
  background: #E8F5E9;
  border-left: 4px solid #28C76F;
  padding: 16px;
  border-radius: 6px;
  margin-top: 20px;
  display: flex;
  align-items: center;
  gap: 12px;
}

.feedback-correct i {
  color: #28C76F;
  font-size: 24px;
}

.feedback-correct-text {
  flex: 1;
  font-size: 15px;
  font-weight: 500;
  color: #28C76F;
  margin: 0;
}

.feedback-incorrect {
  background: #FFEBEE;
  border-left: 4px solid #EA5455;
  padding: 16px;
  border-radius: 6px;
  margin-top: 20px;
}

.feedback-incorrect-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
}

.feedback-incorrect-header i {
  color: #EA5455;
  font-size: 24px;
}

.feedback-incorrect-title {
  flex: 1;
  font-size: 15px;
  font-weight: 600;
  color: #EA5455;
  margin: 0;
}

.feedback-incorrect-correct {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 12px;
  background: #fff;
  border-radius: 6px;
  font-size: 14px;
  color: #5E5873;
}

.feedback-incorrect-correct i {
  color: #28C76F;
  font-size: 16px;
}
</style>`;

/**
 * Story: Default
 * 
 * Q1 múltipla escolha: "Quanto é 3/4 + 1/2?" + 4 alternativas (A-D) com radio.
 * 
 * Educational context: Questão padrão múltipla escolha (Matemática 5º ano).
 */
export const Default = {
  render: () => `
    ${styles}
    <div class="question-content" style="max-width: 700px">
      <div class="question-header">
        <div class="question-number">1</div>
        <div class="question-meta">
          <span class="question-badge multiple">Múltipla Escolha</span>
          <span>Valor: 10 pontos</span>
        </div>
      </div>
      
      <p class="question-text">
        Quanto é 3/4 + 1/2?
      </p>
      
      <div class="question-alternatives">
        <div class="question-alt">
          <input type="radio" name="q1" id="q1a" value="A">
          <label for="q1a"><strong>A)</strong> 4/6</label>
        </div>
        <div class="question-alt">
          <input type="radio" name="q1" id="q1b" value="B">
          <label for="q1b"><strong>B)</strong> 5/4</label>
        </div>
        <div class="question-alt">
          <input type="radio" name="q1" id="q1c" value="C">
          <label for="q1c"><strong>C)</strong> 1/2</label>
        </div>
        <div class="question-alt">
          <input type="radio" name="q1" id="q1d" value="D">
          <label for="q1d"><strong>D)</strong> 3/6</label>
        </div>
      </div>
    </div>
    <p style="margin-top: 16px; font-size: 13px; color: #6E6B7B">
      <strong>Contexto:</strong> Questão padrão múltipla escolha (4 alternativas A-D).
    </p>
  `
};

/**
 * Story: ComImagem
 * 
 * Q2 com imagem: pizza SVG 3/4 colorida + "Observe a figura" + 4 alternativas frações.
 * 
 * Educational context: Questão com representação visual (pizza frações).
 */
export const ComImagem = {
  render: () => `
    ${styles}
    <div class="question-content" style="max-width: 700px">
      <div class="question-header">
        <div class="question-number">2</div>
        <div class="question-meta">
          <span class="question-badge multiple">Múltipla Escolha</span>
          <span>Valor: 10 pontos</span>
        </div>
      </div>
      
      <p class="question-text">
        Observe a figura abaixo. Qual fração representa a parte colorida da pizza?
      </p>
      
      <svg class="question-image" width="200" height="200" viewBox="0 0 200 200">
        <circle cx="100" cy="100" r="80" fill="#E8E8E8"/>
        <path d="M 100 100 L 180 100 A 80 80 0 0 1 100 180 Z" fill="#FF9800"/>
        <path d="M 100 100 L 100 180 A 80 80 0 0 1 20 100 Z" fill="#FF9800"/>
        <path d="M 100 100 L 20 100 A 80 80 0 0 1 100 20 Z" fill="#FF9800"/>
      </svg>
      
      <div class="question-alternatives">
        <div class="question-alt">
          <input type="radio" name="q2" id="q2a" value="A">
          <label for="q2a"><strong>A)</strong> 1/2</label>
        </div>
        <div class="question-alt">
          <input type="radio" name="q2" id="q2b" value="B">
          <label for="q2b"><strong>B)</strong> 2/4</label>
        </div>
        <div class="question-alt">
          <input type="radio" name="q2" id="q2c" value="C">
          <label for="q2c"><strong>C)</strong> 3/4</label>
        </div>
        <div class="question-alt">
          <input type="radio" name="q2" id="q2d" value="D">
          <label for="q2d"><strong>D)</strong> 4/4</label>
        </div>
      </div>
    </div>
    <p style="margin-top: 16px; font-size: 13px; color: #6E6B7B">
      <strong>Contexto:</strong> Questão com imagem (pizza 3/4 colorida representação visual).
    </p>
  `
};

/**
 * Story: ComFormula
 * 
 * Q3 com fórmula matemática: "2x + 5 = 13" monospace centered + 4 alternativas x=2/4/6/8.
 * 
 * Educational context: Questão com equação matemática (álgebra).
 */
export const ComFormula = {
  render: () => `
    ${styles}
    <div class="question-content" style="max-width: 700px">
      <div class="question-header">
        <div class="question-number">3</div>
        <div class="question-meta">
          <span class="question-badge multiple">Múltipla Escolha</span>
          <span>Valor: 10 pontos</span>
        </div>
      </div>
      
      <div class="question-formula">
        2x + 5 = 13
      </div>
      
      <p class="question-text">
        Qual é o valor de x na equação acima?
      </p>
      
      <div class="question-alternatives">
        <div class="question-alt">
          <input type="radio" name="q3" id="q3a" value="A">
          <label for="q3a"><strong>A)</strong> x = 2</label>
        </div>
        <div class="question-alt">
          <input type="radio" name="q3" id="q3b" value="B">
          <label for="q3b"><strong>B)</strong> x = 4</label>
        </div>
        <div class="question-alt">
          <input type="radio" name="q3" id="q3c" value="C">
          <label for="q3c"><strong>C)</strong> x = 6</label>
        </div>
        <div class="question-alt">
          <input type="radio" name="q3" id="q3d" value="D">
          <label for="q3d"><strong>D)</strong> x = 8</label>
        </div>
      </div>
    </div>
    <p style="margin-top: 16px; font-size: 13px; color: #6E6B7B">
      <strong>Contexto:</strong> Questão com fórmula matemática (monospace centered).
    </p>
  `
};

/**
 * Story: Dissertativa
 * 
 * Q4 dissertativa: textarea 200px + contador "0 / 10 linhas" + badge cyan.
 * 
 * Educational context: Questão dissertativa (Ciências - ciclo da água).
 */
export const Dissertativa = {
  render: () => `
    ${styles}
    <div class="question-content" style="max-width: 700px">
      <div class="question-header">
        <div class="question-number">4</div>
        <div class="question-meta">
          <span class="question-badge essay">Dissertativa</span>
          <span>Mínimo: 10 linhas</span>
        </div>
      </div>
      
      <p class="question-text">
        Explique com suas palavras o ciclo da água e sua importância para a vida na Terra.
      </p>
      
      <textarea class="question-textarea" placeholder="Digite sua resposta aqui..."></textarea>
      
      <div style="text-align: right; margin-top: 8px; font-size: 13px; color: #6E6B7B">
        <span id="line-counter">0 / 10 linhas</span>
      </div>
    </div>
    <p style="margin-top: 16px; font-size: 13px; color: #6E6B7B">
      <strong>Contexto:</strong> Questão dissertativa (Ciências - mínimo 10 linhas).
    </p>
  `
};

/**
 * Story: ComExplicacao
 * 
 * Q5 com alternativas + C) 45 selected verde checkmark + explicação lightbulb verde "Para resolver...".
 * 
 * Educational context: Questão respondida com explicação didática (feedback positivo).
 */
export const ComExplicacao = {
  render: () => `
    ${styles}
    <div class="question-content" style="max-width: 700px">
      <div class="question-header">
        <div class="question-number">5</div>
        <div class="question-meta">
          <span class="question-badge multiple">Múltipla Escolha</span>
          <span>Valor: 10 pontos</span>
        </div>
      </div>
      
      <p class="question-text">
        Quanto é 15 × 3?
      </p>
      
      <div class="question-alternatives">
        <div class="question-alt">
          <input type="radio" name="q5" id="q5a" value="A">
          <label for="q5a"><strong>A)</strong> 35</label>
        </div>
        <div class="question-alt">
          <input type="radio" name="q5" id="q5b" value="B">
          <label for="q5b"><strong>B)</strong> 40</label>
        </div>
        <div class="question-alt selected">
          <input type="radio" name="q5" id="q5c" value="C" checked>
          <label for="q5c"><strong>C)</strong> 45 <i class="bi bi-check-circle" style="color: #28C76F; margin-left: 8px"></i></label>
        </div>
        <div class="question-alt">
          <input type="radio" name="q5" id="q5d" value="D">
          <label for="q5d"><strong>D)</strong> 50</label>
        </div>
      </div>
      
      <div class="question-explanation">
        <i class="bi bi-lightbulb"></i>
        <p class="question-explanation-text">
          <strong>Explicação:</strong> Para resolver 15 × 3, podemos pensar em 15 grupos de 3 ou 3 grupos de 15. 
          Somando: 15 + 15 + 15 = 45.
        </p>
      </div>
    </div>
    <p style="margin-top: 16px; font-size: 13px; color: #6E6B7B">
      <strong>Contexto:</strong> Questão com explicação didática (feedback positivo lightbulb verde).
    </p>
  `
};

/**
 * Story: ComFeedback
 * 
 * Q6 substantivo próprio + B) Brasil selected + feedback correto verde "Correto! Brasil é substantivo próprio".
 * 
 * Educational context: Questão respondida corretamente (feedback visual verde checkmark).
 */
export const ComFeedback = {
  render: () => `
    ${styles}
    <div class="question-content" style="max-width: 700px">
      <div class="question-header">
        <div class="question-number">6</div>
        <div class="question-meta">
          <span class="question-badge multiple">Múltipla Escolha</span>
          <span>Valor: 10 pontos</span>
        </div>
      </div>
      
      <p class="question-text">
        Qual das palavras abaixo é um substantivo próprio?
      </p>
      
      <div class="question-alternatives">
        <div class="question-alt">
          <input type="radio" name="q6" id="q6a" value="A">
          <label for="q6a"><strong>A)</strong> cidade</label>
        </div>
        <div class="question-alt selected">
          <input type="radio" name="q6" id="q6b" value="B" checked>
          <label for="q6b"><strong>B)</strong> Brasil <i class="bi bi-check-circle" style="color: #28C76F; margin-left: 8px"></i></label>
        </div>
        <div class="question-alt">
          <input type="radio" name="q6" id="q6c" value="C">
          <label for="q6c"><strong>C)</strong> pessoa</label>
        </div>
        <div class="question-alt">
          <input type="radio" name="q6" id="q6d" value="D">
          <label for="q6d"><strong>D)</strong> país</label>
        </div>
      </div>
      
      <div class="feedback-correct">
        <i class="bi bi-check-circle-fill"></i>
        <p class="feedback-correct-text">Correto! Brasil é um substantivo próprio, pois nomeia um país específico.</p>
      </div>
    </div>
    <p style="margin-top: 16px; font-size: 13px; color: #6E6B7B">
      <strong>Contexto:</strong> Questão respondida corretamente (feedback verde checkmark).
    </p>
  `
};

/**
 * Story: FeedbackErro
 * 
 * Q7 capital Brasil + A) São Paulo selected vermelho X + B) Brasília arrow "Resposta correta" + feedback incorreto.
 * 
 * Educational context: Questão respondida incorretamente (feedback vermelho + mostrar correta).
 */
export const FeedbackErro = {
  render: () => `
    ${styles}
    <div class="question-content" style="max-width: 700px">
      <div class="question-header">
        <div class="question-number">7</div>
        <div class="question-meta">
          <span class="question-badge multiple">Múltipla Escolha</span>
          <span>Valor: 10 pontos</span>
        </div>
      </div>
      
      <p class="question-text">
        Qual é a capital do Brasil?
      </p>
      
      <div class="question-alternatives">
        <div class="question-alt selected" style="border-color: #EA5455; background: #FFEBEE">
          <input type="radio" name="q7" id="q7a" value="A" checked>
          <label for="q7a"><strong>A)</strong> São Paulo <i class="bi bi-x-circle" style="color: #EA5455; margin-left: 8px"></i></label>
        </div>
        <div class="question-alt" style="border-color: #28C76F; background: #E8F5E9">
          <input type="radio" name="q7" id="q7b" value="B">
          <label for="q7b"><strong>B)</strong> Brasília <i class="bi bi-arrow-left" style="color: #28C76F; margin-left: 8px"></i> <small style="color: #28C76F; font-weight: 600">Resposta correta</small></label>
        </div>
        <div class="question-alt">
          <input type="radio" name="q7" id="q7c" value="C">
          <label for="q7c"><strong>C)</strong> Rio de Janeiro</label>
        </div>
        <div class="question-alt">
          <input type="radio" name="q7" id="q7d" value="D">
          <label for="q7d"><strong>D)</strong> Salvador</label>
        </div>
      </div>
      
      <div class="feedback-incorrect">
        <div class="feedback-incorrect-header">
          <i class="bi bi-x-circle-fill"></i>
          <p class="feedback-incorrect-title">Incorreto. A capital do Brasil é Brasília.</p>
        </div>
        <div class="feedback-incorrect-correct">
          <i class="bi bi-info-circle"></i>
          <span>Brasília foi inaugurada em 1960 como a capital federal do Brasil.</span>
        </div>
      </div>
    </div>
    <p style="margin-top: 16px; font-size: 13px; color: #6E6B7B">
      <strong>Contexto:</strong> Questão incorreta (feedback vermelho X + mostrar resposta correta).
    </p>
  `
};

/**
 * Story: VerdadeiroOuFalso
 * 
 * Q8 badge laranja "V ou F" + "Água ferve 100°C" + 2 alternativas Verdadeiro/Falso.
 * 
 * Educational context: Questão verdadeiro ou falso (Ciências).
 */
export const VerdadeiroOuFalso = {
  render: () => `
    ${styles}
    <div class="question-content" style="max-width: 700px">
      <div class="question-header">
        <div class="question-number">8</div>
        <div class="question-meta">
          <span class="question-badge truefalse">V ou F</span>
          <span>Valor: 5 pontos</span>
        </div>
      </div>
      
      <p class="question-text">
        A água ferve a 100°C ao nível do mar.
      </p>
      
      <div class="question-alternatives">
        <div class="question-alt">
          <input type="radio" name="q8" id="q8v" value="V">
          <label for="q8v"><strong>Verdadeiro</strong></label>
        </div>
        <div class="question-alt">
          <input type="radio" name="q8" id="q8f" value="F">
          <label for="q8f"><strong>Falso</strong></label>
        </div>
      </div>
    </div>
    <p style="margin-top: 16px; font-size: 13px; color: #6E6B7B">
      <strong>Contexto:</strong> Questão verdadeiro ou falso (badge laranja, 2 alternativas).
    </p>
  `
};
