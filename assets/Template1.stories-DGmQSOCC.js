const z={title:"Educacross Components V2/Templates/Template1",tags:["autodocs"],parameters:{layout:"fullscreen",docs:{description:{component:`
# Template1

Template de layout para exibição de questões com 2 cards de conteúdo e grid de alternativas 4 colunas.

## Quando usar

- **Avaliações aplicadas**: Layout padrão para questões com múltiplas alternativas
- **Banco de questões**: Preview de estrutura visual
- **Impressão PDF**: Template para exportação de avaliações
- **Edição questões**: Interface de criação/edição de questões
- **Revisão conteúdo**: Visualização para revisão pedagógica
- **Telas responsivas**: Layout que adapta de 4 cols desktop → 2 cols tablet → 1 col mobile

## Estrutura do Layout

- **Content Area 1**: Card superior com QuestionContent (enunciado, imagem, fórmula)
- **Content Area 2**: Segundo card QuestionContent (texto adicional, contexto)
- **Alternatives Grid**: Grid responsivo 4 cols (lg) → 2 cols (md) → 1 col (sm) com QuestionAlternative

## Variantes

1. **Default**: Layout padrão com 2 cards conteúdo + grid 4 alternativas
2. **ComImagem**: Content area 1 com imagem grande centralizada
3. **ComFormula**: Content area 1 com fórmula matemática LaTeX
4. **ComContexto**: Content area 2 expandido com texto longo contexto
5. **DuasAlternativas**: Grid com apenas 2 alternativas lado a lado
6. **SeisAlternativas**: Grid estendido com 6 alternativas (3×2)
7. **AlternativasImagens**: Alternativas com preview de imagens
8. **Responsive**: Demonstração comportamento mobile/tablet/desktop

## Características visuais

- Grid responsivo: 12 cols (lg) → 6 cols (md) → 12 cols (sm)
- Cards com espaçamento padrão Bootstrap
- Match-height para alternativas mesma altura
- Gap entre cards 24px vertical
- Alternatives grid gap 16px
- Border-radius 8px nos cards
        `}}}},a=`
<style>
  .template1-container {
    background: #F8F7FA;
    min-height: 100vh;
    padding: 24px;
  }
  
  .template1-row {
    display: flex;
    flex-wrap: wrap;
    margin: -12px;
  }
  
  .template1-col {
    padding: 12px;
    width: 100%;
  }
  
  .template1-card {
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
  
  .question-content-image {
    max-width: 100%;
    height: auto;
    border-radius: 8px;
    display: block;
    margin: 16px auto;
  }
  
  .question-content-formula {
    background: #F8F8F8;
    padding: 16px;
    border-radius: 6px;
    font-family: 'Courier New', monospace;
    font-size: 16px;
    text-align: center;
    margin: 16px 0;
    border: 1px solid #E8E8E8;
  }
  
  .alternatives-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 16px;
    margin-top: 24px;
  }
  
  .alternative-card {
    background: #FFFFFF;
    border: 2px solid #DBDADE;
    border-radius: 8px;
    padding: 16px;
    cursor: pointer;
    transition: all 0.2s;
    display: flex;
    flex-direction: column;
    min-height: 120px;
  }
  
  .alternative-card:hover {
    border-color: #6E63E8;
    box-shadow: 0 4px 12px rgba(110,99,232,0.15);
  }
  
  .alternative-label {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    background: #F3F2F7;
    border-radius: 50%;
    font-size: 14px;
    font-weight: 700;
    color: #5D596C;
    margin-bottom: 12px;
  }
  
  .alternative-text {
    font-size: 14px;
    line-height: 1.6;
    color: #5D596C;
    flex: 1;
  }
  
  .alternative-image {
    max-width: 100%;
    height: auto;
    border-radius: 6px;
    margin-top: 8px;
  }
  
  @media (max-width: 1199px) {
    .alternatives-grid {
      grid-template-columns: repeat(3, 1fr);
    }
  }
  
  @media (max-width: 991px) {
    .alternatives-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }
  
  @media (max-width: 767px) {
    .alternatives-grid {
      grid-template-columns: 1fr;
    }
    
    .template1-container {
      padding: 16px;
    }
    
    .template1-card {
      padding: 16px;
      margin-bottom: 16px;
    }
  }
</style>
`,e={render:()=>`
    ${a}
    <div class="template1-container">
      <div class="template1-row">
        <div class="template1-col">
          <div class="template1-card">
            <div class="question-content-area">
              <strong>Questão 1:</strong> Quanto é 3/4 + 1/2?
            </div>
            <div class="question-content-area">
              Para resolver esta questão, você deve somar as frações convertendo-as ao mesmo denominador.
            </div>
          </div>
          
          <div class="alternatives-grid">
            <div class="alternative-card">
              <span class="alternative-label">A</span>
              <span class="alternative-text">5/6</span>
            </div>
            <div class="alternative-card">
              <span class="alternative-label">B</span>
              <span class="alternative-text">1/2</span>
            </div>
            <div class="alternative-card">
              <span class="alternative-label">C</span>
              <span class="alternative-text">5/4</span>
            </div>
            <div class="alternative-card">
              <span class="alternative-label">D</span>
              <span class="alternative-text">7/8</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `},s={render:()=>`
    ${a}
    <div class="template1-container">
      <div class="template1-row">
        <div class="template1-col">
          <div class="template1-card">
            <div class="question-content-area">
              <strong>Questão 2:</strong> Observe a figura abaixo e identifique qual fração está representada pela parte colorida.
            </div>
            <div class="question-content-area">
              <svg class="question-content-image" width="200" height="200" viewBox="0 0 200 200">
                <circle cx="100" cy="100" r="80" fill="#E8E8E8"/>
                <path d="M100,100 L100,20 A80,80 0 0,1 180,100 Z" fill="#FF9800"/>
                <path d="M100,100 L180,100 A80,80 0 0,1 100,180 Z" fill="#FF9800"/>
                <path d="M100,100 L100,180 A80,80 0 0,1 20,100 Z" fill="#FF9800"/>
              </svg>
            </div>
          </div>
          
          <div class="alternatives-grid">
            <div class="alternative-card">
              <span class="alternative-label">A</span>
              <span class="alternative-text">1/2</span>
            </div>
            <div class="alternative-card">
              <span class="alternative-label">B</span>
              <span class="alternative-text">2/4</span>
            </div>
            <div class="alternative-card">
              <span class="alternative-label">C</span>
              <span class="alternative-text">3/4</span>
            </div>
            <div class="alternative-card">
              <span class="alternative-label">D</span>
              <span class="alternative-text">4/4</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `},t={render:()=>`
    ${a}
    <div class="template1-container">
      <div class="template1-row">
        <div class="template1-col">
          <div class="template1-card">
            <div class="question-content-area">
              <strong>Questão 3:</strong> Resolva a equação abaixo:
            </div>
            <div class="question-content-formula">
              2x + 5 = 13
            </div>
            <div class="question-content-area">
              Encontre o valor de x que satisfaz a equação.
            </div>
          </div>
          
          <div class="alternatives-grid">
            <div class="alternative-card">
              <span class="alternative-label">A</span>
              <span class="alternative-text">x = 2</span>
            </div>
            <div class="alternative-card">
              <span class="alternative-label">B</span>
              <span class="alternative-text">x = 4</span>
            </div>
            <div class="alternative-card">
              <span class="alternative-label">C</span>
              <span class="alternative-text">x = 6</span>
            </div>
            <div class="alternative-card">
              <span class="alternative-label">D</span>
              <span class="alternative-text">x = 8</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `},n={render:()=>`
    ${a}
    <div class="template1-container">
      <div class="template1-row">
        <div class="template1-col">
          <div class="template1-card">
            <div class="question-content-area">
              <strong>Questão 4:</strong> Leia o texto abaixo com atenção.
            </div>
          </div>
          
          <div class="template1-card">
            <div class="question-content-area">
              <p style="margin-bottom: 12px;">
                <em>"A fotossíntese é o processo pelo qual as plantas verdes, algas e algumas bactérias 
                convertem energia luminosa em energia química. Durante este processo, a luz solar é 
                capturada pela clorofila presente nas folhas e utilizada para converter dióxido de 
                carbono (CO₂) e água (H₂O) em glicose (C₆H₁₂O₆) e oxigênio (O₂)."</em>
              </p>
              <p><strong>Pergunta:</strong> Qual é o principal produto da fotossíntese utilizado pelas plantas como fonte de energia?</p>
            </div>
          </div>
          
          <div class="alternatives-grid">
            <div class="alternative-card">
              <span class="alternative-label">A</span>
              <span class="alternative-text">Dióxido de carbono</span>
            </div>
            <div class="alternative-card">
              <span class="alternative-label">B</span>
              <span class="alternative-text">Oxigênio</span>
            </div>
            <div class="alternative-card">
              <span class="alternative-label">C</span>
              <span class="alternative-text">Glicose</span>
            </div>
            <div class="alternative-card">
              <span class="alternative-label">D</span>
              <span class="alternative-text">Água</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `},i={render:()=>`
    ${a}
    <style>
      .alternatives-grid-two {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 16px;
        margin-top: 24px;
      }
      
      @media (max-width: 767px) {
        .alternatives-grid-two {
          grid-template-columns: 1fr;
        }
      }
    </style>
    <div class="template1-container">
      <div class="template1-row">
        <div class="template1-col">
          <div class="template1-card">
            <div class="question-content-area">
              <strong>Questão 5:</strong> A água ferve a 100°C ao nível do mar?
            </div>
            <div class="question-content-area">
              <span style="display: inline-block; padding: 4px 12px; background: #FFF8E1; color: #FF9800; border-radius: 4px; font-size: 11px; font-weight: 600;">VERDADEIRO OU FALSO</span>
            </div>
          </div>
          
          <div class="alternatives-grid-two">
            <div class="alternative-card">
              <span class="alternative-label">V</span>
              <span class="alternative-text">Verdadeiro</span>
            </div>
            <div class="alternative-card">
              <span class="alternative-label">F</span>
              <span class="alternative-text">Falso</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `},l={render:()=>`
    ${a}
    <style>
      .alternatives-grid-six {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 16px;
        margin-top: 24px;
      }
      
      @media (max-width: 991px) {
        .alternatives-grid-six {
          grid-template-columns: repeat(2, 1fr);
        }
      }
      
      @media (max-width: 767px) {
        .alternatives-grid-six {
          grid-template-columns: 1fr;
        }
      }
    </style>
    <div class="template1-container">
      <div class="template1-row">
        <div class="template1-col">
          <div class="template1-card">
            <div class="question-content-area">
              <strong>Questão 6:</strong> Qual das opções abaixo representa um número primo?
            </div>
            <div class="question-content-area">
              Números primos são divisíveis apenas por 1 e por eles mesmos.
            </div>
          </div>
          
          <div class="alternatives-grid-six">
            <div class="alternative-card">
              <span class="alternative-label">A</span>
              <span class="alternative-text">15</span>
            </div>
            <div class="alternative-card">
              <span class="alternative-label">B</span>
              <span class="alternative-text">17</span>
            </div>
            <div class="alternative-card">
              <span class="alternative-label">C</span>
              <span class="alternative-text">21</span>
            </div>
            <div class="alternative-card">
              <span class="alternative-label">D</span>
              <span class="alternative-text">25</span>
            </div>
            <div class="alternative-card">
              <span class="alternative-label">E</span>
              <span class="alternative-text">28</span>
            </div>
            <div class="alternative-card">
              <span class="alternative-label">F</span>
              <span class="alternative-text">32</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `},r={render:()=>`
    ${a}
    <div class="template1-container">
      <div class="template1-row">
        <div class="template1-col">
          <div class="template1-card">
            <div class="question-content-area">
              <strong>Questão 7:</strong> Qual figura geométrica possui 4 lados iguais?
            </div>
          </div>
          
          <div class="alternatives-grid">
            <div class="alternative-card">
              <span class="alternative-label">A</span>
              <span class="alternative-text">Triângulo</span>
              <svg class="alternative-image" width="80" height="80" viewBox="0 0 80 80">
                <polygon points="40,10 70,60 10,60" fill="none" stroke="#6E63E8" stroke-width="2"/>
              </svg>
            </div>
            <div class="alternative-card">
              <span class="alternative-label">B</span>
              <span class="alternative-text">Quadrado</span>
              <svg class="alternative-image" width="80" height="80" viewBox="0 0 80 80">
                <rect x="15" y="15" width="50" height="50" fill="none" stroke="#28C76F" stroke-width="2"/>
              </svg>
            </div>
            <div class="alternative-card">
              <span class="alternative-label">C</span>
              <span class="alternative-text">Círculo</span>
              <svg class="alternative-image" width="80" height="80" viewBox="0 0 80 80">
                <circle cx="40" cy="40" r="25" fill="none" stroke="#FF9800" stroke-width="2"/>
              </svg>
            </div>
            <div class="alternative-card">
              <span class="alternative-label">D</span>
              <span class="alternative-text">Retângulo</span>
              <svg class="alternative-image" width="80" height="80" viewBox="0 0 80 80">
                <rect x="10" y="25" width="60" height="30" fill="none" stroke="#EA5455" stroke-width="2"/>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  `},d={render:()=>`
    ${a}
    <style>
      .viewport-demo {
        background: #F3F2F7;
        padding: 12px;
        border-radius: 6px;
        margin-bottom: 16px;
        text-align: center;
        font-size: 13px;
        font-weight: 600;
        color: #6E6B7B;
      }
    </style>
    <div class="template1-container">
      <div class="viewport-demo">
        <i class="bi bi-phone" style="margin-right: 8px;"></i>
        Redimensione a janela para ver o comportamento responsivo (4 cols → 2 cols → 1 col)
      </div>
      
      <div class="template1-row">
        <div class="template1-col">
          <div class="template1-card">
            <div class="question-content-area">
              <strong>Questão Responsiva:</strong> Este template adapta automaticamente o layout baseado no tamanho da tela.
            </div>
            <div class="question-content-area">
              • <strong>Desktop (≥992px):</strong> 4 colunas de alternativas<br>
              • <strong>Tablet (768-991px):</strong> 2 colunas de alternativas<br>
              • <strong>Mobile (<768px):</strong> 1 coluna de alternativas
            </div>
          </div>
          
          <div class="alternatives-grid">
            <div class="alternative-card">
              <span class="alternative-label">A</span>
              <span class="alternative-text">Alternativa A - Primeira opção de resposta</span>
            </div>
            <div class="alternative-card">
              <span class="alternative-label">B</span>
              <span class="alternative-text">Alternativa B - Segunda opção de resposta</span>
            </div>
            <div class="alternative-card">
              <span class="alternative-label">C</span>
              <span class="alternative-text">Alternativa C - Terceira opção de resposta</span>
            </div>
            <div class="alternative-card">
              <span class="alternative-label">D</span>
              <span class="alternative-text">Alternativa D - Quarta opção de resposta</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `};var o,c,v;e.parameters={...e.parameters,docs:{...(o=e.parameters)==null?void 0:o.docs,source:{originalSource:`{
  render: () => \`
    \${templateStyles}
    <div class="template1-container">
      <div class="template1-row">
        <div class="template1-col">
          <div class="template1-card">
            <div class="question-content-area">
              <strong>Questão 1:</strong> Quanto é 3/4 + 1/2?
            </div>
            <div class="question-content-area">
              Para resolver esta questão, você deve somar as frações convertendo-as ao mesmo denominador.
            </div>
          </div>
          
          <div class="alternatives-grid">
            <div class="alternative-card">
              <span class="alternative-label">A</span>
              <span class="alternative-text">5/6</span>
            </div>
            <div class="alternative-card">
              <span class="alternative-label">B</span>
              <span class="alternative-text">1/2</span>
            </div>
            <div class="alternative-card">
              <span class="alternative-label">C</span>
              <span class="alternative-text">5/4</span>
            </div>
            <div class="alternative-card">
              <span class="alternative-label">D</span>
              <span class="alternative-text">7/8</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  \`
}`,...(v=(c=e.parameters)==null?void 0:c.docs)==null?void 0:v.source}}};var p,m,x;s.parameters={...s.parameters,docs:{...(p=s.parameters)==null?void 0:p.docs,source:{originalSource:`{
  render: () => \`
    \${templateStyles}
    <div class="template1-container">
      <div class="template1-row">
        <div class="template1-col">
          <div class="template1-card">
            <div class="question-content-area">
              <strong>Questão 2:</strong> Observe a figura abaixo e identifique qual fração está representada pela parte colorida.
            </div>
            <div class="question-content-area">
              <svg class="question-content-image" width="200" height="200" viewBox="0 0 200 200">
                <circle cx="100" cy="100" r="80" fill="#E8E8E8"/>
                <path d="M100,100 L100,20 A80,80 0 0,1 180,100 Z" fill="#FF9800"/>
                <path d="M100,100 L180,100 A80,80 0 0,1 100,180 Z" fill="#FF9800"/>
                <path d="M100,100 L100,180 A80,80 0 0,1 20,100 Z" fill="#FF9800"/>
              </svg>
            </div>
          </div>
          
          <div class="alternatives-grid">
            <div class="alternative-card">
              <span class="alternative-label">A</span>
              <span class="alternative-text">1/2</span>
            </div>
            <div class="alternative-card">
              <span class="alternative-label">B</span>
              <span class="alternative-text">2/4</span>
            </div>
            <div class="alternative-card">
              <span class="alternative-label">C</span>
              <span class="alternative-text">3/4</span>
            </div>
            <div class="alternative-card">
              <span class="alternative-label">D</span>
              <span class="alternative-text">4/4</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  \`
}`,...(x=(m=s.parameters)==null?void 0:m.docs)==null?void 0:x.source}}};var g,u,b;t.parameters={...t.parameters,docs:{...(g=t.parameters)==null?void 0:g.docs,source:{originalSource:`{
  render: () => \`
    \${templateStyles}
    <div class="template1-container">
      <div class="template1-row">
        <div class="template1-col">
          <div class="template1-card">
            <div class="question-content-area">
              <strong>Questão 3:</strong> Resolva a equação abaixo:
            </div>
            <div class="question-content-formula">
              2x + 5 = 13
            </div>
            <div class="question-content-area">
              Encontre o valor de x que satisfaz a equação.
            </div>
          </div>
          
          <div class="alternatives-grid">
            <div class="alternative-card">
              <span class="alternative-label">A</span>
              <span class="alternative-text">x = 2</span>
            </div>
            <div class="alternative-card">
              <span class="alternative-label">B</span>
              <span class="alternative-text">x = 4</span>
            </div>
            <div class="alternative-card">
              <span class="alternative-label">C</span>
              <span class="alternative-text">x = 6</span>
            </div>
            <div class="alternative-card">
              <span class="alternative-label">D</span>
              <span class="alternative-text">x = 8</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  \`
}`,...(b=(u=t.parameters)==null?void 0:u.docs)==null?void 0:b.source}}};var h,f,E;n.parameters={...n.parameters,docs:{...(h=n.parameters)==null?void 0:h.docs,source:{originalSource:`{
  render: () => \`
    \${templateStyles}
    <div class="template1-container">
      <div class="template1-row">
        <div class="template1-col">
          <div class="template1-card">
            <div class="question-content-area">
              <strong>Questão 4:</strong> Leia o texto abaixo com atenção.
            </div>
          </div>
          
          <div class="template1-card">
            <div class="question-content-area">
              <p style="margin-bottom: 12px;">
                <em>"A fotossíntese é o processo pelo qual as plantas verdes, algas e algumas bactérias 
                convertem energia luminosa em energia química. Durante este processo, a luz solar é 
                capturada pela clorofila presente nas folhas e utilizada para converter dióxido de 
                carbono (CO₂) e água (H₂O) em glicose (C₆H₁₂O₆) e oxigênio (O₂)."</em>
              </p>
              <p><strong>Pergunta:</strong> Qual é o principal produto da fotossíntese utilizado pelas plantas como fonte de energia?</p>
            </div>
          </div>
          
          <div class="alternatives-grid">
            <div class="alternative-card">
              <span class="alternative-label">A</span>
              <span class="alternative-text">Dióxido de carbono</span>
            </div>
            <div class="alternative-card">
              <span class="alternative-label">B</span>
              <span class="alternative-text">Oxigênio</span>
            </div>
            <div class="alternative-card">
              <span class="alternative-label">C</span>
              <span class="alternative-text">Glicose</span>
            </div>
            <div class="alternative-card">
              <span class="alternative-label">D</span>
              <span class="alternative-text">Água</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  \`
}`,...(E=(f=n.parameters)==null?void 0:f.docs)==null?void 0:E.source}}};var w,F,A;i.parameters={...i.parameters,docs:{...(w=i.parameters)==null?void 0:w.docs,source:{originalSource:`{
  render: () => \`
    \${templateStyles}
    <style>
      .alternatives-grid-two {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 16px;
        margin-top: 24px;
      }
      
      @media (max-width: 767px) {
        .alternatives-grid-two {
          grid-template-columns: 1fr;
        }
      }
    </style>
    <div class="template1-container">
      <div class="template1-row">
        <div class="template1-col">
          <div class="template1-card">
            <div class="question-content-area">
              <strong>Questão 5:</strong> A água ferve a 100°C ao nível do mar?
            </div>
            <div class="question-content-area">
              <span style="display: inline-block; padding: 4px 12px; background: #FFF8E1; color: #FF9800; border-radius: 4px; font-size: 11px; font-weight: 600;">VERDADEIRO OU FALSO</span>
            </div>
          </div>
          
          <div class="alternatives-grid-two">
            <div class="alternative-card">
              <span class="alternative-label">V</span>
              <span class="alternative-text">Verdadeiro</span>
            </div>
            <div class="alternative-card">
              <span class="alternative-label">F</span>
              <span class="alternative-text">Falso</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  \`
}`,...(A=(F=i.parameters)==null?void 0:F.docs)==null?void 0:A.source}}};var q,y,C;l.parameters={...l.parameters,docs:{...(q=l.parameters)==null?void 0:q.docs,source:{originalSource:`{
  render: () => \`
    \${templateStyles}
    <style>
      .alternatives-grid-six {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 16px;
        margin-top: 24px;
      }
      
      @media (max-width: 991px) {
        .alternatives-grid-six {
          grid-template-columns: repeat(2, 1fr);
        }
      }
      
      @media (max-width: 767px) {
        .alternatives-grid-six {
          grid-template-columns: 1fr;
        }
      }
    </style>
    <div class="template1-container">
      <div class="template1-row">
        <div class="template1-col">
          <div class="template1-card">
            <div class="question-content-area">
              <strong>Questão 6:</strong> Qual das opções abaixo representa um número primo?
            </div>
            <div class="question-content-area">
              Números primos são divisíveis apenas por 1 e por eles mesmos.
            </div>
          </div>
          
          <div class="alternatives-grid-six">
            <div class="alternative-card">
              <span class="alternative-label">A</span>
              <span class="alternative-text">15</span>
            </div>
            <div class="alternative-card">
              <span class="alternative-label">B</span>
              <span class="alternative-text">17</span>
            </div>
            <div class="alternative-card">
              <span class="alternative-label">C</span>
              <span class="alternative-text">21</span>
            </div>
            <div class="alternative-card">
              <span class="alternative-label">D</span>
              <span class="alternative-text">25</span>
            </div>
            <div class="alternative-card">
              <span class="alternative-label">E</span>
              <span class="alternative-text">28</span>
            </div>
            <div class="alternative-card">
              <span class="alternative-label">F</span>
              <span class="alternative-text">32</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  \`
}`,...(C=(y=l.parameters)==null?void 0:y.docs)==null?void 0:C.source}}};var D,B,k;r.parameters={...r.parameters,docs:{...(D=r.parameters)==null?void 0:D.docs,source:{originalSource:`{
  render: () => \`
    \${templateStyles}
    <div class="template1-container">
      <div class="template1-row">
        <div class="template1-col">
          <div class="template1-card">
            <div class="question-content-area">
              <strong>Questão 7:</strong> Qual figura geométrica possui 4 lados iguais?
            </div>
          </div>
          
          <div class="alternatives-grid">
            <div class="alternative-card">
              <span class="alternative-label">A</span>
              <span class="alternative-text">Triângulo</span>
              <svg class="alternative-image" width="80" height="80" viewBox="0 0 80 80">
                <polygon points="40,10 70,60 10,60" fill="none" stroke="#6E63E8" stroke-width="2"/>
              </svg>
            </div>
            <div class="alternative-card">
              <span class="alternative-label">B</span>
              <span class="alternative-text">Quadrado</span>
              <svg class="alternative-image" width="80" height="80" viewBox="0 0 80 80">
                <rect x="15" y="15" width="50" height="50" fill="none" stroke="#28C76F" stroke-width="2"/>
              </svg>
            </div>
            <div class="alternative-card">
              <span class="alternative-label">C</span>
              <span class="alternative-text">Círculo</span>
              <svg class="alternative-image" width="80" height="80" viewBox="0 0 80 80">
                <circle cx="40" cy="40" r="25" fill="none" stroke="#FF9800" stroke-width="2"/>
              </svg>
            </div>
            <div class="alternative-card">
              <span class="alternative-label">D</span>
              <span class="alternative-text">Retângulo</span>
              <svg class="alternative-image" width="80" height="80" viewBox="0 0 80 80">
                <rect x="10" y="25" width="60" height="30" fill="none" stroke="#EA5455" stroke-width="2"/>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  \`
}`,...(k=(B=r.parameters)==null?void 0:B.docs)==null?void 0:k.source}}};var Q,S,O;d.parameters={...d.parameters,docs:{...(Q=d.parameters)==null?void 0:Q.docs,source:{originalSource:`{
  render: () => \`
    \${templateStyles}
    <style>
      .viewport-demo {
        background: #F3F2F7;
        padding: 12px;
        border-radius: 6px;
        margin-bottom: 16px;
        text-align: center;
        font-size: 13px;
        font-weight: 600;
        color: #6E6B7B;
      }
    </style>
    <div class="template1-container">
      <div class="viewport-demo">
        <i class="bi bi-phone" style="margin-right: 8px;"></i>
        Redimensione a janela para ver o comportamento responsivo (4 cols → 2 cols → 1 col)
      </div>
      
      <div class="template1-row">
        <div class="template1-col">
          <div class="template1-card">
            <div class="question-content-area">
              <strong>Questão Responsiva:</strong> Este template adapta automaticamente o layout baseado no tamanho da tela.
            </div>
            <div class="question-content-area">
              • <strong>Desktop (≥992px):</strong> 4 colunas de alternativas<br>
              • <strong>Tablet (768-991px):</strong> 2 colunas de alternativas<br>
              • <strong>Mobile (<768px):</strong> 1 coluna de alternativas
            </div>
          </div>
          
          <div class="alternatives-grid">
            <div class="alternative-card">
              <span class="alternative-label">A</span>
              <span class="alternative-text">Alternativa A - Primeira opção de resposta</span>
            </div>
            <div class="alternative-card">
              <span class="alternative-label">B</span>
              <span class="alternative-text">Alternativa B - Segunda opção de resposta</span>
            </div>
            <div class="alternative-card">
              <span class="alternative-label">C</span>
              <span class="alternative-text">Alternativa C - Terceira opção de resposta</span>
            </div>
            <div class="alternative-card">
              <span class="alternative-label">D</span>
              <span class="alternative-text">Alternativa D - Quarta opção de resposta</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  \`
}`,...(O=(S=d.parameters)==null?void 0:S.docs)==null?void 0:O.source}}};const R=["Default","ComImagem","ComFormula","ComContexto","DuasAlternativas","SeisAlternativas","AlternativasImagens","Responsive"];export{r as AlternativasImagens,n as ComContexto,t as ComFormula,s as ComImagem,e as Default,i as DuasAlternativas,d as Responsive,l as SeisAlternativas,R as __namedExportsOrder,z as default};
