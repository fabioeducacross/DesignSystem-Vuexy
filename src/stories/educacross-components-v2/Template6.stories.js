/**
 * Template6 - Stacked Single Column Alternatives Layout Component
 * =========================================
 * 
 * Layout template with single-column stacked alternatives (full-width each).
 * Similar to Template3 but simplified structure without secondary content card.
 * 
 * @component Template6
 * @source educacross-frontoffice\src\components\evaluations\questionDetail\templates\Template6.vue
 */

export default {
  title: 'Front-office/Templates/Template6',
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# Template6

Template com alternativas empilhadas full-width (cols-12 sempre), ideal para respostas únicas grandes.

## Quando usar

- **Uma alternativa grande**: Questão com resposta dissertativa ou texto extenso único
- **Upload de arquivo**: Área de drop para envio de documentos/imagens
- **Resposta aberta**: Campo de texto longo sem múltiplas escolhas
- **Slider/Range**: Alternativa única com controle deslizante
- **Ranking/Ordenação**: Lista de itens para ordenar verticalmente
- **Simplificado**: Quando não precisa de grid (sempre 1 coluna)

## Diferenças dos Templates 3 e 1-5

| Template | Content Cards | Alternatives Layout | Quando usar |
|----------|--------------|---------------------|-------------|
| **Template1/5** | 2 cards | Grid 4 cols → 2 → 1 | Múltipla escolha padrão |
| **Template2** | 2 cards | Grid 2 cols → 1 | Alternativas médias |
| **Template3** | 2 cards | Stack 1 col (sempre) | Textos longos |
| **Template4** | 2 cards split | Grid 2×2 in 50% | Split-view lado a lado |
| **Template6** | **2 cards** | **Stack 1 col (sempre)** | **Resposta única grande** |

**Template6 vs Template3:**
- **Template3**: Múltiplas alternativas empilhadas (A, B, C, D...)
- **Template6**: Tipicamente 1 alternativa grande (textarea, upload, etc.)

## Estrutura

\`\`\`
+--------------------------------+
| Card 1: Question Content       |
+--------------------------------+
| Card 2: Additional Content     |
+--------------------------------+
| Alternative 1 (100% width)     |
+--------------------------------+
| Alternative 2 (100% width)     |  ← Opcional
+--------------------------------+
\`\`\`

## Variantes

1. **Default**: Uma alternativa full-width básica
2. **ComTextarea**: Campo de texto grande para resposta dissertativa
3. **ComUpload**: Área de drag & drop para envio de arquivos
4. **ComSlider**: Range slider para escala de resposta
5. **ComOrdenacao**: Lista de itens para ordenar
6. **ComRanking**: Classificação de prioridades 1-5
7. **ComCalendario**: Seletor de data/horário full-width
8. **Responsive**: Sempre 1 coluna (já otimizado mobile)

## Características visuais

- Alternatives: Sempre 100% width (cols-12)
- Não usa grid - stack vertical simples
- Ideal para 1-3 alternativas grandes
- Min-height flexível (varia por tipo)
- Padding generoso 24px
- Gap vertical 20px entre alternativas
- Mobile-first: já é 1 coluna sempre
        `
      }
    }
  }
};

/**
 * Props API
 * 
 * Componente estrutural sem props - recebe QuestionContent e QuestionAlternative como children
 */

/**
 * Design Specs
 * 
 * Cores:
 * - Card background: #FFFFFF
 * - Body background: #F8F7FA
 * - Border color: #DBDADE
 * - Focus border: #6E63E8
 * - Upload area: #F8F8F8 (drag hover #E8E8FF)
 * 
 * Dimensões:
 * - Container: 100% width max-width 900px
 * - Content cards: padding 20px, border-radius 8px
 * - Alternative width: 100% (cols-12 sempre)
 * - Alternative padding: 24px
 * - Gap vertical: 20px entre alternativas
 * - Textarea min-height: 200px
 * - Upload area min-height: 150px
 * 
 * Tipografia:
 * - Alternative text: 15px
 * - Line-height: 1.8
 * - Textarea: 14px font-size
 * 
 * Layout:
 * - Sempre 1 coluna independente de breakpoint
 * - Não usa grid CSS
 * - Stack vertical simples com flex-direction: column
 */

// Estilos base do template
const template6Styles = `
<style>
  .template6-container {
    background: #F8F7FA;
    min-height: 100vh;
    padding: 24px;
    max-width: 900px;
    margin: 0 auto;
  }
  
  .template6-row {
    display: flex;
    flex-wrap: wrap;
    margin: -12px;
  }
  
  .template6-col {
    padding: 12px;
    width: 100%;
  }
  
  .template6-card {
    background: #FFFFFF;
    border: 1px solid #DBDADE;
    border-radius: 8px;
    padding: 20px;
    margin-bottom: 24px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.06);
  }
  
  .question-content-area {
    font-size: 15px;
    line-height: 1.8;
    color: #5D596C;
    margin-bottom: 16px;
  }
  
  .question-content-area:last-child {
    margin-bottom: 0;
  }
  
  .alternatives-stack {
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin-top: 24px;
  }
  
  .alternative-fullwidth {
    background: #FFFFFF;
    border: 2px solid #DBDADE;
    border-radius: 8px;
    padding: 24px;
    width: 100%;
    transition: all 0.2s;
  }
  
  .alternative-fullwidth:hover {
    border-color: #6E63E8;
    box-shadow: 0 4px 12px rgba(110,99,232,0.15);
  }
  
  .alternative-textarea {
    width: 100%;
    min-height: 200px;
    padding: 16px;
    border: 2px solid #DBDADE;
    border-radius: 8px;
    font-size: 14px;
    line-height: 1.7;
    color: #5D596C;
    font-family: inherit;
    resize: vertical;
    transition: border-color 0.2s;
  }
  
  .alternative-textarea:focus {
    outline: none;
    border-color: #6E63E8;
    box-shadow: 0 0 0 3px rgba(110,99,232,0.1);
  }
  
  .alternative-textarea::placeholder {
    color: #B0B0B0;
  }
  
  .upload-area {
    min-height: 150px;
    border: 2px dashed #DBDADE;
    border-radius: 8px;
    background: #F8F8F8;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 12px;
    padding: 32px;
    cursor: pointer;
    transition: all 0.2s;
  }
  
  .upload-area:hover {
    border-color: #6E63E8;
    background: #E8E8FF;
  }
  
  .upload-icon {
    font-size: 48px;
    color: #B0B0B0;
  }
  
  .upload-text {
    font-size: 15px;
    font-weight: 600;
    color: #5D596C;
    text-align: center;
  }
  
  .upload-hint {
    font-size: 13px;
    color: #6E6B7B;
    text-align: center;
  }
  
  .slider-container {
    padding: 24px;
  }
  
  .slider-input {
    width: 100%;
    height: 8px;
    -webkit-appearance: none;
    appearance: none;
    background: #E8E8E8;
    border-radius: 4px;
    outline: none;
    margin: 16px 0;
  }
  
  .slider-input::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 24px;
    height: 24px;
    background: #6E63E8;
    border-radius: 50%;
    cursor: pointer;
    box-shadow: 0 2px 4px rgba(0,0,0,0.2);
  }
  
  .slider-input::-moz-range-thumb {
    width: 24px;
    height: 24px;
    background: #6E63E8;
    border-radius: 50%;
    cursor: pointer;
    border: none;
    box-shadow: 0 2px 4px rgba(0,0,0,0.2);
  }
  
  .slider-labels {
    display: flex;
    justify-content: space-between;
    font-size: 13px;
    color: #6E6B7B;
    margin-top: 8px;
  }
  
  .slider-value {
    text-align: center;
    font-size: 32px;
    font-weight: 700;
    color: #6E63E8;
    margin-bottom: 16px;
  }
  
  .sortable-item {
    background: #FFFFFF;
    border: 2px solid #DBDADE;
    border-radius: 6px;
    padding: 16px;
    margin-bottom: 12px;
    cursor: move;
    display: flex;
    align-items: center;
    gap: 12px;
    transition: all 0.2s;
  }
  
  .sortable-item:hover {
    border-color: #6E63E8;
    box-shadow: 0 2px 8px rgba(110,99,232,0.15);
  }
  
  .sortable-handle {
    font-size: 20px;
    color: #B0B0B0;
  }
  
  .sortable-text {
    flex: 1;
    font-size: 15px;
    color: #5D596C;
  }
  
  @media (max-width: 767px) {
    .template6-container {
      padding: 16px;
    }
    
    .template6-card {
      padding: 16px;
      margin-bottom: 16px;
    }
    
    .alternative-fullwidth {
      padding: 16px;
    }
    
    .upload-area {
      padding: 24px 16px;
      min-height: 120px;
    }
  }
</style>
`;

// Story: Default
export const Default = {
  render: () => `
    ${template6Styles}
    <div class="template6-container">
      <div class="template6-row">
        <div class="template6-col">
          <div class="template6-card">
            <div class="question-content-area">
              <strong>Questão 1:</strong> Responda à pergunta abaixo.
            </div>
            <div class="question-content-area">
              Sua resposta será avaliada considerando clareza e objetividade.
            </div>
          </div>
          
          <div class="alternatives-stack">
            <div class="alternative-fullwidth">
              <div style="font-size: 15px; line-height: 1.7; color: #5D596C;">
                Área de resposta única full-width. Template6 é ideal para respostas abertas,
                uploads, ou qualquer alternativa que necessite todo o espaço horizontal disponível.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
};

// Story: ComTextarea
export const ComTextarea = {
  render: () => `
    ${template6Styles}
    <div class="template6-container">
      <div class="template6-row">
        <div class="template6-col">
          <div class="template6-card">
            <div class="question-content-area">
              <strong>Questão 2:</strong> Explique com suas palavras o processo de fotossíntese.
            </div>
            <div class="question-content-area">
              <span style="display: inline-block; padding: 4px 12px; background: #E0F7FA; color: #00838F; border-radius: 4px; font-size: 11px; font-weight: 600; text-transform: uppercase;">
                Dissertativa
              </span>
              <span style="margin-left: 12px; font-size: 13px; color: #6E6B7B;">
                Mínimo: 10 linhas
              </span>
            </div>
          </div>
          
          <div class="alternatives-stack">
            <div class="alternative-fullwidth">
              <textarea 
                class="alternative-textarea" 
                placeholder="Digite sua resposta aqui...

Use este espaço para desenvolver sua explicação de forma detalhada. Organize suas ideias em parágrafos e apresente os conceitos de forma clara e sequencial."
                maxlength="2000"
              ></textarea>
              <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 12px;">
                <span style="font-size: 13px; color: #6E6B7B;">
                  <i class="bi bi-text-paragraph" style="margin-right: 6px;"></i>
                  0 / 10 linhas mínimas
                </span>
                <span style="font-size: 13px; color: #B0B0B0;">
                  0 / 2000 caracteres
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
};

// Story: ComUpload
export const ComUpload = {
  render: () => `
    ${template6Styles}
    <div class="template6-container">
      <div class="template6-row">
        <div class="template6-col">
          <div class="template6-card">
            <div class="question-content-area">
              <strong>Questão 3:</strong> Envie seu trabalho sobre o Sistema Solar.
            </div>
            <div class="question-content-area">
              Formatos aceitos: PDF, DOCX, JPG, PNG (máximo 5 MB)
            </div>
          </div>
          
          <div class="alternatives-stack">
            <div class="alternative-fullwidth">
              <div class="upload-area">
                <i class="bi bi-cloud-upload upload-icon"></i>
                <div class="upload-text">
                  Arraste e solte seu arquivo aqui
                </div>
                <div class="upload-hint">
                  ou clique para selecionar do computador
                </div>
                <button style="margin-top: 12px; padding: 10px 24px; background: #6E63E8; color: white; border: none; border-radius: 6px; font-size: 14px; font-weight: 600; cursor: pointer;">
                  Selecionar Arquivo
                </button>
              </div>
              <div style="margin-top: 16px; padding: 12px; background: #E8F5E9; border-left: 4px solid #28C76F; border-radius: 6px; display: none;" id="upload-success">
                <div style="display: flex; align-items: center; gap: 12px;">
                  <i class="bi bi-check-circle-fill" style="font-size: 20px; color: #28C76F;"></i>
                  <div style="flex: 1;">
                    <div style="font-size: 14px; font-weight: 600; color: #2E7D32;">Sistema_Solar.pdf</div>
                    <div style="font-size: 13px; color: #558B2F;">2.4 MB • Enviado com sucesso</div>
                  </div>
                  <button style="padding: 6px 12px; background: transparent; border: 1px solid #28C76F; color: #28C76F; border-radius: 4px; font-size: 12px; cursor: pointer;">
                    Remover
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
};

// Story: ComSlider
export const ComSlider = {
  render: () => `
    ${template6Styles}
    <div class="template6-container">
      <div class="template6-row">
        <div class="template6-col">
          <div class="template6-card">
            <div class="question-content-area">
              <strong>Questão 4:</strong> Em uma escala de 0 a 10, qual seu nível de satisfação com a aula?
            </div>
            <div class="question-content-area">
              Use o controle deslizante para indicar sua avaliação.
            </div>
          </div>
          
          <div class="alternatives-stack">
            <div class="alternative-fullwidth">
              <div class="slider-container">
                <div class="slider-value" id="slider-value">5</div>
                <input 
                  type="range" 
                  class="slider-input" 
                  min="0" 
                  max="10" 
                  value="5" 
                  step="1"
                  oninput="document.getElementById('slider-value').textContent = this.value"
                />
                <div class="slider-labels">
                  <span>0<br><small style="color: #EA5455;">Muito insatisfeito</small></span>
                  <span>5<br><small style="color: #FF9800;">Neutro</small></span>
                  <span>10<br><small style="color: #28C76F;">Muito satisfeito</small></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
};

// Story: ComOrdenacao
export const ComOrdenacao = {
  render: () => `
    ${template6Styles}
    <div class="template6-container">
      <div class="template6-row">
        <div class="template6-col">
          <div class="template6-card">
            <div class="question-content-area">
              <strong>Questão 5:</strong> Ordene os eventos da Revolução Francesa em ordem cronológica.
            </div>
            <div class="question-content-area">
              <i class="bi bi-arrows-move" style="margin-right: 6px;"></i>
              Arraste os itens para reorganizar
            </div>
          </div>
          
          <div class="alternatives-stack">
            <div class="alternative-fullwidth">
              <div class="sortable-item">
                <i class="bi bi-grip-vertical sortable-handle"></i>
                <span class="sortable-text">Queda da Bastilha (14 de julho de 1789)</span>
              </div>
              <div class="sortable-item">
                <i class="bi bi-grip-vertical sortable-handle"></i>
                <span class="sortable-text">Declaração dos Direitos do Homem e do Cidadão (agosto de 1789)</span>
              </div>
              <div class="sortable-item">
                <i class="bi bi-grip-vertical sortable-handle"></i>
                <span class="sortable-text">Execução de Luís XVI (21 de janeiro de 1793)</span>
              </div>
              <div class="sortable-item">
                <i class="bi bi-grip-vertical sortable-handle"></i>
                <span class="sortable-text">Golpe do 18 Brumário - Napoleão (9 de novembro de 1799)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
};

// Story: ComRanking
export const ComRanking = {
  render: () => `
    ${template6Styles}
    <style>
      .ranking-item {
        background: #FFFFFF;
        border: 2px solid #DBDADE;
        border-radius: 6px;
        padding: 16px;
        margin-bottom: 12px;
        display: flex;
        align-items: center;
        gap: 16px;
      }
      
      .ranking-number {
        width: 40px;
        height: 40px;
        background: #F3F2F7;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 18px;
        font-weight: 700;
        color: #6E63E8;
        flex-shrink: 0;
      }
      
      .ranking-text {
        flex: 1;
        font-size: 15px;
        color: #5D596C;
      }
      
      .ranking-stars {
        display: flex;
        gap: 4px;
      }
      
      .ranking-star {
        font-size: 20px;
        color: #D8D8D8;
        cursor: pointer;
        transition: color 0.2s;
      }
      
      .ranking-star.active {
        color: #FFD700;
      }
    </style>
    <div class="template6-container">
      <div class="template6-row">
        <div class="template6-col">
          <div class="template6-card">
            <div class="question-content-area">
              <strong>Questão 6:</strong> Classifique os tópicos abaixo por ordem de importância (1 a 5 estrelas).
            </div>
            <div class="question-content-area">
              <i class="bi bi-star-fill" style="color: #FFD700; margin-right: 6px;"></i>
              Clique nas estrelas para avaliar cada item
            </div>
          </div>
          
          <div class="alternatives-stack">
            <div class="alternative-fullwidth">
              <div class="ranking-item">
                <span class="ranking-number">1</span>
                <span class="ranking-text">Alimentação saudável</span>
                <div class="ranking-stars">
                  <i class="bi bi-star-fill ranking-star active"></i>
                  <i class="bi bi-star-fill ranking-star active"></i>
                  <i class="bi bi-star-fill ranking-star active"></i>
                  <i class="bi bi-star-fill ranking-star active"></i>
                  <i class="bi bi-star-fill ranking-star"></i>
                </div>
              </div>
              <div class="ranking-item">
                <span class="ranking-number">2</span>
                <span class="ranking-text">Exercícios físicos regulares</span>
                <div class="ranking-stars">
                  <i class="bi bi-star-fill ranking-star active"></i>
                  <i class="bi bi-star-fill ranking-star active"></i>
                  <i class="bi bi-star-fill ranking-star active"></i>
                  <i class="bi bi-star-fill ranking-star active"></i>
                  <i class="bi bi-star-fill ranking-star active"></i>
                </div>
              </div>
              <div class="ranking-item">
                <span class="ranking-number">3</span>
                <span class="ranking-text">Horas adequadas de sono</span>
                <div class="ranking-stars">
                  <i class="bi bi-star-fill ranking-star active"></i>
                  <i class="bi bi-star-fill ranking-star active"></i>
                  <i class="bi bi-star-fill ranking-star active"></i>
                  <i class="bi bi-star-fill ranking-star"></i>
                  <i class="bi bi-star-fill ranking-star"></i>
                </div>
              </div>
              <div class="ranking-item">
                <span class="ranking-number">4</span>
                <span class="ranking-text">Hidratação constante</span>
                <div class="ranking-stars">
                  <i class="bi bi-star-fill ranking-star active"></i>
                  <i class="bi bi-star-fill ranking-star active"></i>
                  <i class="bi bi-star-fill ranking-star"></i>
                  <i class="bi bi-star-fill ranking-star"></i>
                  <i class="bi bi-star-fill ranking-star"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
};

// Story: ComCalendario
export const ComCalendario = {
  render: () => `
    ${template6Styles}
    <style>
      .calendar-input {
        width: 100%;
        padding: 16px;
        border: 2px solid #DBDADE;
        border-radius: 8px;
        font-size: 16px;
        color: #5D596C;
        font-family: inherit;
        transition: border-color 0.2s;
      }
      
      .calendar-input:focus {
        outline: none;
        border-color: #6E63E8;
        box-shadow: 0 0 0 3px rgba(110,99,232,0.1);
      }
      
      .date-preview {
        margin-top: 16px;
        padding: 16px;
        background: #F3F2F7;
        border-radius: 6px;
        text-align: center;
      }
      
      .date-preview-large {
        font-size: 24px;
        font-weight: 700;
        color: #6E63E8;
        margin-bottom: 8px;
      }
      
      .date-preview-small {
        font-size: 13px;
        color: #6E6B7B;
      }
    </style>
    <div class="template6-container">
      <div class="template6-row">
        <div class="template6-col">
          <div class="template6-card">
            <div class="question-content-area">
              <strong>Questão 7:</strong> Selecione a data da próxima reunião de pais.
            </div>
            <div class="question-content-area">
              <i class="bi bi-calendar3" style="margin-right: 6px;"></i>
              Use o calendário para escolher uma data conveniente
            </div>
          </div>
          
          <div class="alternatives-stack">
            <div class="alternative-fullwidth">
              <input 
                type="date" 
                class="calendar-input"
                min="2026-02-03"
                value="2026-02-15"
              />
              <div class="date-preview">
                <div class="date-preview-large">
                  <i class="bi bi-calendar-check" style="margin-right: 8px;"></i>
                  15 de Fevereiro de 2026
                </div>
                <div class="date-preview-small">
                  Sábado • Horário sugerido: 14h00
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
};

// Story: Responsive
export const Responsive = {
  render: () => `
    ${template6Styles}
    <style>
      .responsive-info {
        background: #E8F5E9;
        border-left: 4px solid #28C76F;
        padding: 16px;
        border-radius: 6px;
        margin: 24px 0;
      }
      
      .responsive-info h4 {
        font-size: 14px;
        font-weight: 600;
        color: #2E7D32;
        margin: 0 0 8px 0;
        display: flex;
        align-items: center;
        gap: 8px;
      }
      
      .responsive-info ul {
        margin: 0;
        padding-left: 20px;
      }
      
      .responsive-info li {
        font-size: 13px;
        color: #558B2F;
        margin-bottom: 4px;
      }
    </style>
    <div class="template6-container">
      <div class="responsive-info">
        <h4>
          <i class="bi bi-phone"></i>
          Template6: Mobile-First Design
        </h4>
        <ul>
          <li>✅ Sempre 1 coluna (100% width) em todos os dispositivos</li>
          <li>✅ Não requer reorganização em mobile - já é otimizado</li>
          <li>✅ Padding ajusta automaticamente (24px → 16px mobile)</li>
          <li>✅ Ideal para respostas abertas, uploads, sliders</li>
          <li>✅ Comportamento consistente desktop/tablet/mobile</li>
        </ul>
      </div>
      
      <div class="template6-row">
        <div class="template6-col">
          <div class="template6-card">
            <div class="question-content-area">
              <strong>Questão Responsiva:</strong> Template6 não precisa adaptar layout - já é mobile-first!
            </div>
            <div class="question-content-area">
              Alternativas sempre ocupam 100% da largura disponível, sem quebras ou reorganização.
            </div>
          </div>
          
          <div class="alternatives-stack">
            <div class="alternative-fullwidth">
              <div style="display: flex; align-items: center; gap: 16px; margin-bottom: 16px;">
                <i class="bi bi-laptop" style="font-size: 32px; color: #6E63E8;"></i>
                <div style="flex: 1;">
                  <div style="font-size: 15px; font-weight: 600; color: #5D596C; margin-bottom: 4px;">
                    Desktop (≥768px)
                  </div>
                  <div style="font-size: 13px; color: #6E6B7B;">
                    Alternativa full-width • Padding 24px
                  </div>
                </div>
              </div>
              <div style="display: flex; align-items: center; gap: 16px;">
                <i class="bi bi-phone" style="font-size: 32px; color: #28C76F;"></i>
                <div style="flex: 1;">
                  <div style="font-size: 15px; font-weight: 600; color: #5D596C; margin-bottom: 4px;">
                    Mobile (<768px)
                  </div>
                  <div style="font-size: 13px; color: #6E6B7B;">
                    Alternativa full-width • Padding 16px
                  </div>
                </div>
              </div>
            </div>
            
            <div class="alternative-fullwidth">
              <textarea 
                class="alternative-textarea" 
                placeholder="Exemplo de textarea que funciona perfeitamente em qualquer dispositivo..."
                style="min-height: 120px;"
              ></textarea>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
};
