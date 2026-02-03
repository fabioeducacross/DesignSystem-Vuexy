/**
 * Template2 - Two Column Alternatives Layout Component
 * =========================================
 * 
 * Layout template for questions with 2-column alternatives grid.
 * Ideal for questions with longer alternative texts or image-based options.
 * 
 * @component Template2
 * @source educacross-frontoffice\src\components\evaluations\questionDetail\templates\Template2.vue
 */

export default {
  title: 'Educacross Components V2/Templates/Template2',
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# Template2

Template de layout com grid de alternativas em 2 colunas, ideal para textos longos ou imagens.

## Quando usar

- **Alternativas longas**: Questões com textos de alternativas extensos que precisam mais espaço
- **Questões com imagens**: Alternativas que incluem imagens ou diagramas grandes
- **Comparações**: Questões que pedem comparação entre duas opções lado a lado
- **Leitura vertical**: Layout que facilita leitura vertical para textos longos
- **Questões dissertativas**: Alternativas com múltiplos parágrafos ou explicações detalhadas
- **Mobile otimizado**: 2 cols desktop → 1 col mobile com melhor legibilidade

## Diferenças do Template1

- **Grid**: 2 colunas (md-6) vs 4 colunas (lg-3) do Template1
- **Espaço**: Mais largura por alternativa (50% vs 25%)
- **Altura**: Cards mais altos para acomodar conteúdo extenso
- **Uso**: Textos longos vs alternativas curtas
- **Responsividade**: 2→1 cols vs 4→2→1 cols

## Variantes

1. **Default**: Layout padrão 2 colunas com alternativas texto
2. **AlternativasLongas**: Cards com textos de múltiplas linhas
3. **ComImagens**: Cada alternativa com imagem grande
4. **ComparacaoTextos**: Duas alternativas lado a lado para comparação
5. **ComDiagramas**: Alternativas com diagramas ou gráficos
6. **Mista**: Combinação de texto, imagem e ícones
7. **TresAlternativas**: Grid com 3 alternativas (2+1 layout)
8. **Responsive**: Demonstração comportamento mobile 2→1 cols

## Características visuais

- Grid 2 colunas desktop (md-6 = 50% width cada)
- Mobile 1 coluna (cols-12 = 100% width)
- Min-height 140px por alternativa (vs 120px Template1)
- Padding aumentado 20px (vs 16px)
- Melhor para textos 100-300 caracteres
- Suporta imagens até 400px width
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
 * - Hover border: #6E63E8
 * 
 * Dimensões:
 * - Container: 100% width max-width 1200px
 * - Content cards: padding 20px, border-radius 8px
 * - Grid: 2 cols (≥768px), 1 col (<768px)
 * - Alternative min-height: 140px (vs 120px Template1)
 * - Alternative padding: 20px (vs 16px)
 * - Grid gap: 20px (vs 16px)
 * 
 * Tipografia:
 * - Alternative text: 15px (vs 14px Template1)
 * - Line-height: 1.7 (vs 1.6) para textos longos
 * - Max characters recomendado: 200-300 por alternativa
 * 
 * Responsividade:
 * - xs/sm (<768px): 1 col (width 100%)
 * - md+ (≥768px): 2 cols (width 50%)
 */

// Estilos base do template
const template2Styles = `
<style>
  .template2-container {
    background: #F8F7FA;
    min-height: 100vh;
    padding: 24px;
    max-width: 1200px;
    margin: 0 auto;
  }
  
  .template2-row {
    display: flex;
    flex-wrap: wrap;
    margin: -12px;
  }
  
  .template2-col {
    padding: 12px;
    width: 100%;
  }
  
  .template2-card {
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
  
  .alternatives-grid-2col {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
    margin-top: 24px;
  }
  
  .alternative-card-wide {
    background: #FFFFFF;
    border: 2px solid #DBDADE;
    border-radius: 8px;
    padding: 20px;
    cursor: pointer;
    transition: all 0.2s;
    display: flex;
    flex-direction: column;
    min-height: 140px;
  }
  
  .alternative-card-wide:hover {
    border-color: #6E63E8;
    box-shadow: 0 4px 12px rgba(110,99,232,0.15);
    transform: translateY(-2px);
  }
  
  .alternative-label {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    background: #F3F2F7;
    border-radius: 50%;
    font-size: 15px;
    font-weight: 700;
    color: #5D596C;
    margin-bottom: 12px;
    flex-shrink: 0;
  }
  
  .alternative-text-long {
    font-size: 15px;
    line-height: 1.7;
    color: #5D596C;
    flex: 1;
  }
  
  .alternative-image-large {
    max-width: 100%;
    height: auto;
    border-radius: 6px;
    margin-top: 12px;
  }
  
  @media (max-width: 767px) {
    .alternatives-grid-2col {
      grid-template-columns: 1fr;
    }
    
    .template2-container {
      padding: 16px;
    }
    
    .template2-card {
      padding: 16px;
      margin-bottom: 16px;
    }
    
    .alternative-card-wide {
      padding: 16px;
      min-height: 120px;
    }
  }
</style>
`;

// Story: Default
export const Default = {
  render: () => `
    ${template2Styles}
    <div class="template2-container">
      <div class="template2-row">
        <div class="template2-col">
          <div class="template2-card">
            <div class="question-content-area">
              <strong>Questão 1:</strong> Qual das alternativas apresenta a definição correta de fotossíntese?
            </div>
            <div class="question-content-area">
              Leia atentamente cada definição antes de escolher sua resposta.
            </div>
          </div>
          
          <div class="alternatives-grid-2col">
            <div class="alternative-card-wide">
              <span class="alternative-label">A</span>
              <span class="alternative-text-long">Processo de respiração celular onde glicose é quebrada</span>
            </div>
            <div class="alternative-card-wide">
              <span class="alternative-label">B</span>
              <span class="alternative-text-long">Conversão de energia luminosa em energia química pelas plantas</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
};

// Story: AlternativasLongas
export const AlternativasLongas = {
  render: () => `
    ${template2Styles}
    <div class="template2-container">
      <div class="template2-row">
        <div class="template2-col">
          <div class="template2-card">
            <div class="question-content-area">
              <strong>Questão 2:</strong> Qual afirmação descreve melhor o processo de evolução das espécies?
            </div>
          </div>
          
          <div class="alternatives-grid-2col">
            <div class="alternative-card-wide">
              <span class="alternative-label">A</span>
              <span class="alternative-text-long">
                As espécies evoluem através de mutações aleatórias que, quando benéficas ao ambiente, 
                são selecionadas naturalmente e passadas para as próximas gerações, resultando em 
                adaptações que aumentam a sobrevivência.
              </span>
            </div>
            <div class="alternative-card-wide">
              <span class="alternative-label">B</span>
              <span class="alternative-text-long">
                As espécies permanecem inalteradas desde sua criação, sem sofrer modificações 
                significativas ao longo do tempo, mantendo suas características originais intactas 
                através das gerações.
              </span>
            </div>
            <div class="alternative-card-wide">
              <span class="alternative-label">C</span>
              <span class="alternative-text-long">
                A evolução ocorre quando indivíduos desenvolvem características durante sua vida 
                em resposta ao ambiente e transmitem essas características adquiridas diretamente 
                para seus descendentes.
              </span>
            </div>
            <div class="alternative-card-wide">
              <span class="alternative-label">D</span>
              <span class="alternative-text-long">
                Todas as espécies evoluem na mesma velocidade e na mesma direção, buscando sempre 
                formas mais complexas e perfeitas de organização, seguindo um plano pré-determinado 
                de desenvolvimento.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
};

// Story: ComImagens
export const ComImagens = {
  render: () => `
    ${template2Styles}
    <div class="template2-container">
      <div class="template2-row">
        <div class="template2-col">
          <div class="template2-card">
            <div class="question-content-area">
              <strong>Questão 3:</strong> Qual dos biomas abaixo é caracterizado por vegetação rasteira e clima frio?
            </div>
          </div>
          
          <div class="alternatives-grid-2col">
            <div class="alternative-card-wide">
              <span class="alternative-label">A</span>
              <span class="alternative-text-long">Floresta Amazônica</span>
              <svg class="alternative-image-large" width="100%" height="120" viewBox="0 0 400 120">
                <rect width="400" height="120" fill="#E8F5E9"/>
                <rect x="50" y="40" width="30" height="80" fill="#2E7D32"/>
                <circle cx="65" cy="35" r="25" fill="#4CAF50"/>
                <rect x="150" y="30" width="30" height="90" fill="#2E7D32"/>
                <circle cx="165" cy="25" r="30" fill="#4CAF50"/>
                <rect x="250" y="45" width="30" height="75" fill="#2E7D32"/>
                <circle cx="265" cy="40" r="22" fill="#4CAF50"/>
                <rect x="350" y="35" width="30" height="85" fill="#2E7D32"/>
                <circle cx="365" cy="30" r="28" fill="#4CAF50"/>
                <line x1="0" y1="120" x2="400" y2="120" stroke="#795548" stroke-width="8"/>
              </svg>
            </div>
            <div class="alternative-card-wide">
              <span class="alternative-label">B</span>
              <span class="alternative-text-long">Tundra</span>
              <svg class="alternative-image-large" width="100%" height="120" viewBox="0 0 400 120">
                <rect width="400" height="120" fill="#E3F2FD"/>
                <ellipse cx="100" cy="95" rx="80" ry="15" fill="#90CAF9"/>
                <ellipse cx="250" cy="100" rx="60" ry="12" fill="#90CAF9"/>
                <rect x="50" y="90" width="8" height="20" fill="#8D6E63"/>
                <rect x="120" y="85" width="6" height="25" fill="#8D6E63"/>
                <rect x="280" y="92" width="7" height="18" fill="#8D6E63"/>
                <line x1="0" y1="110" x2="400" y2="110" stroke="#B0BEC5" stroke-width="10"/>
                <circle cx="50" cy="20" r="3" fill="#BBDEFB" opacity="0.7"/>
                <circle cx="150" cy="35" r="3" fill="#BBDEFB" opacity="0.7"/>
                <circle cx="250" cy="25" r="3" fill="#BBDEFB" opacity="0.7"/>
                <circle cx="350" cy="40" r="3" fill="#BBDEFB" opacity="0.7"/>
              </svg>
            </div>
            <div class="alternative-card-wide">
              <span class="alternative-label">C</span>
              <span class="alternative-text-long">Deserto</span>
              <svg class="alternative-image-large" width="100%" height="120" viewBox="0 0 400 120">
                <rect width="400" height="120" fill="#FFF8E1"/>
                <path d="M0,90 Q100,70 200,90 T400,90 L400,120 L0,120 Z" fill="#FFE082"/>
                <path d="M0,100 Q80,85 160,100 T320,100 L400,100 L400,120 L0,120 Z" fill="#FFD54F"/>
                <circle cx="350" cy="30" r="25" fill="#FFC107" opacity="0.8"/>
                <path d="M180,85 L185,70 L190,85 L195,80 L200,90 L190,88 Z" fill="#AED581"/>
                <path d="M240,80 L245,65 L250,80 L255,75 L260,85 L250,83 Z" fill="#AED581"/>
              </svg>
            </div>
            <div class="alternative-card-wide">
              <span class="alternative-label">D</span>
              <span class="alternative-text-long">Savana</span>
              <svg class="alternative-image-large" width="100%" height="120" viewBox="0 0 400 120">
                <rect width="400" height="120" fill="#FFF9C4"/>
                <rect x="100" y="60" width="20" height="60" fill="#8D6E63"/>
                <circle cx="110" cy="55" r="30" fill="#9CCC65"/>
                <rect x="280" y="65" width="18" height="55" fill="#8D6E63"/>
                <circle cx="289" cy="60" r="28" fill="#9CCC65"/>
                <line x1="0" y1="120" x2="400" y2="120" stroke="#C5E1A5" stroke-width="8"/>
                <rect x="20" y="110" width="3" height="10" fill="#7CB342"/>
                <rect x="50" y="108" width="3" height="12" fill="#7CB342"/>
                <rect x="180" y="112" width="3" height="8" fill="#7CB342"/>
                <rect x="350" y="109" width="3" height="11" fill="#7CB342"/>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
};

// Story: ComparacaoTextos
export const ComparacaoTextos = {
  render: () => `
    ${template2Styles}
    <style>
      .comparison-card {
        background: #F8F8F8;
        padding: 16px;
        border-radius: 6px;
        margin-top: 12px;
        border-left: 4px solid #6E63E8;
      }
    </style>
    <div class="template2-container">
      <div class="template2-row">
        <div class="template2-col">
          <div class="template2-card">
            <div class="question-content-area">
              <strong>Questão 4:</strong> Compare os dois trechos literários e identifique qual utiliza linguagem metafórica.
            </div>
          </div>
          
          <div class="alternatives-grid-2col">
            <div class="alternative-card-wide">
              <span class="alternative-label">A</span>
              <span class="alternative-text-long"><strong>Trecho 1:</strong></span>
              <div class="comparison-card">
                "O sol estava forte naquela tarde de verão. A temperatura chegava a 35 graus. 
                As pessoas procuravam sombra embaixo das árvores do parque."
              </div>
            </div>
            <div class="alternative-card-wide">
              <span class="alternative-label">B</span>
              <span class="alternative-text-long"><strong>Trecho 2:</strong></span>
              <div class="comparison-card">
                "O sol era uma bola de fogo no céu. Seus raios beijavam a terra sedenta. 
                As árvores erguiam seus braços verdes buscando o abraço da brisa."
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
};

// Story: ComDiagramas
export const ComDiagramas = {
  render: () => `
    ${template2Styles}
    <div class="template2-container">
      <div class="template2-row">
        <div class="template2-col">
          <div class="template2-card">
            <div class="question-content-area">
              <strong>Questão 5:</strong> Qual diagrama representa corretamente a cadeia alimentar?
            </div>
            <div class="question-content-area">
              Observe a direção das setas que indicam o fluxo de energia.
            </div>
          </div>
          
          <div class="alternatives-grid-2col">
            <div class="alternative-card-wide">
              <span class="alternative-label">A</span>
              <span class="alternative-text-long">Cadeia Linear</span>
              <svg class="alternative-image-large" width="100%" height="100" viewBox="0 0 400 100">
                <rect x="20" y="30" width="60" height="40" fill="#AED581" stroke="#558B2F" stroke-width="2" rx="4"/>
                <text x="50" y="55" text-anchor="middle" font-size="12" fill="#33691E">Planta</text>
                <path d="M 85 50 L 110 50" stroke="#5D596C" stroke-width="2" marker-end="url(#arrow)"/>
                <rect x="115" y="30" width="60" height="40" fill="#FFE082" stroke="#F57F17" stroke-width="2" rx="4"/>
                <text x="145" y="55" text-anchor="middle" font-size="12" fill="#F57F17">Herbívoro</text>
                <path d="M 180 50 L 205 50" stroke="#5D596C" stroke-width="2" marker-end="url(#arrow)"/>
                <rect x="210" y="30" width="60" height="40" fill="#FFAB91" stroke="#D84315" stroke-width="2" rx="4"/>
                <text x="240" y="55" text-anchor="middle" font-size="12" fill="#D84315">Carnívoro</text>
                <defs>
                  <marker id="arrow" markerWidth="10" markerHeight="10" refX="5" refY="3" orient="auto">
                    <polygon points="0 0, 10 3, 0 6" fill="#5D596C"/>
                  </marker>
                </defs>
              </svg>
            </div>
            <div class="alternative-card-wide">
              <span class="alternative-label">B</span>
              <span class="alternative-text-long">Cadeia Reversa</span>
              <svg class="alternative-image-large" width="100%" height="100" viewBox="0 0 400 100">
                <rect x="20" y="30" width="60" height="40" fill="#FFAB91" stroke="#D84315" stroke-width="2" rx="4"/>
                <text x="50" y="55" text-anchor="middle" font-size="12" fill="#D84315">Carnívoro</text>
                <path d="M 85 50 L 110 50" stroke="#EA5455" stroke-width="2" marker-end="url(#arrowRed)"/>
                <rect x="115" y="30" width="60" height="40" fill="#FFE082" stroke="#F57F17" stroke-width="2" rx="4"/>
                <text x="145" y="55" text-anchor="middle" font-size="12" fill="#F57F17">Herbívoro</text>
                <path d="M 180 50 L 205 50" stroke="#EA5455" stroke-width="2" marker-end="url(#arrowRed)"/>
                <rect x="210" y="30" width="60" height="40" fill="#AED581" stroke="#558B2F" stroke-width="2" rx="4"/>
                <text x="240" y="55" text-anchor="middle" font-size="12" fill="#33691E">Planta</text>
                <defs>
                  <marker id="arrowRed" markerWidth="10" markerHeight="10" refX="5" refY="3" orient="auto">
                    <polygon points="0 0, 10 3, 0 6" fill="#EA5455"/>
                  </marker>
                </defs>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
};

// Story: Mista
export const Mista = {
  render: () => `
    ${template2Styles}
    <div class="template2-container">
      <div class="template2-row">
        <div class="template2-col">
          <div class="template2-card">
            <div class="question-content-area">
              <strong>Questão 6:</strong> Qual das opções representa corretamente o ciclo da água?
            </div>
          </div>
          
          <div class="alternatives-grid-2col">
            <div class="alternative-card-wide">
              <span class="alternative-label">A</span>
              <span class="alternative-text-long">
                <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 8px;">
                  <i class="bi bi-droplet-fill" style="font-size: 24px; color: #00CFE8;"></i>
                  <strong>Evaporação → Condensação → Precipitação</strong>
                </div>
                Água dos oceanos evapora, forma nuvens e retorna como chuva, completando o ciclo natural.
              </span>
            </div>
            <div class="alternative-card-wide">
              <span class="alternative-label">B</span>
              <span class="alternative-text-long">
                <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 8px;">
                  <i class="bi bi-cloud-rain-fill" style="font-size: 24px; color: #6E63E8;"></i>
                  <strong>Precipitação → Evaporação → Condensação</strong>
                </div>
                Chuva cai primeiro, depois evapora e forma nuvens no processo reverso.
              </span>
            </div>
            <div class="alternative-card-wide">
              <span class="alternative-label">C</span>
              <span class="alternative-text-long">
                <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 8px;">
                  <i class="bi bi-cloud-fill" style="font-size: 24px; color: #B0BEC5;"></i>
                  <strong>Condensação → Precipitação → Evaporação</strong>
                </div>
                Nuvens se formam primeiro, chovem e depois a água evapora dos rios.
              </span>
            </div>
            <div class="alternative-card-wide">
              <span class="alternative-label">D</span>
              <span class="alternative-text-long">
                <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 8px;">
                  <i class="bi bi-water" style="font-size: 24px; color: #FF9800;"></i>
                  <strong>Evaporação → Precipitação → Condensação</strong>
                </div>
                Água evapora, cai como chuva e depois condensa no solo.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
};

// Story: TresAlternativas
export const TresAlternativas = {
  render: () => `
    ${template2Styles}
    <style>
      .alternatives-grid-three {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 20px;
        margin-top: 24px;
      }
      
      .alternatives-grid-three .alternative-card-wide:last-child {
        grid-column: 1 / -1;
        max-width: calc(50% - 10px);
      }
      
      @media (max-width: 767px) {
        .alternatives-grid-three {
          grid-template-columns: 1fr;
        }
        
        .alternatives-grid-three .alternative-card-wide:last-child {
          grid-column: 1;
          max-width: 100%;
        }
      }
    </style>
    <div class="template2-container">
      <div class="template2-row">
        <div class="template2-col">
          <div class="template2-card">
            <div class="question-content-area">
              <strong>Questão 7:</strong> Qual dos estados físicos da matéria possui forma e volume definidos?
            </div>
          </div>
          
          <div class="alternatives-grid-three">
            <div class="alternative-card-wide">
              <span class="alternative-label">A</span>
              <span class="alternative-text-long">
                <strong>Sólido</strong><br>
                Partículas muito próximas e organizadas, mantém forma e volume fixos.
              </span>
            </div>
            <div class="alternative-card-wide">
              <span class="alternative-label">B</span>
              <span class="alternative-text-long">
                <strong>Líquido</strong><br>
                Partículas próximas mas móveis, volume fixo mas forma variável.
              </span>
            </div>
            <div class="alternative-card-wide">
              <span class="alternative-label">C</span>
              <span class="alternative-text-long">
                <strong>Gasoso</strong><br>
                Partículas muito afastadas e livres, forma e volume variáveis.
              </span>
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
    ${template2Styles}
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
    <div class="template2-container">
      <div class="viewport-demo">
        <i class="bi bi-phone" style="margin-right: 8px;"></i>
        Template2: 2 colunas desktop (≥768px) → 1 coluna mobile (<768px)
      </div>
      
      <div class="template2-row">
        <div class="template2-col">
          <div class="template2-card">
            <div class="question-content-area">
              <strong>Questão Responsiva:</strong> Template2 otimizado para alternativas longas com comportamento responsivo simplificado.
            </div>
            <div class="question-content-area">
              • <strong>Desktop/Tablet (≥768px):</strong> 2 colunas (50% width cada)<br>
              • <strong>Mobile (<768px):</strong> 1 coluna (100% width)<br>
              • <strong>Diferença Template1:</strong> Menos colunas = mais espaço para texto longo
            </div>
          </div>
          
          <div class="alternatives-grid-2col">
            <div class="alternative-card-wide">
              <span class="alternative-label">A</span>
              <span class="alternative-text-long">
                Alternativa A com texto extenso para demonstrar como o layout Template2 
                acomoda melhor conteúdos longos com suas 2 colunas no desktop.
              </span>
            </div>
            <div class="alternative-card-wide">
              <span class="alternative-label">B</span>
              <span class="alternative-text-long">
                Alternativa B também com texto longo mostrando como cada card tem mais 
                largura disponível (50% vs 25% do Template1).
              </span>
            </div>
            <div class="alternative-card-wide">
              <span class="alternative-label">C</span>
              <span class="alternative-text-long">
                Alternativa C demonstrando que em mobile todas as alternativas ocupam 
                100% da largura para melhor legibilidade.
              </span>
            </div>
            <div class="alternative-card-wide">
              <span class="alternative-label">D</span>
              <span class="alternative-text-long">
                Alternativa D completando o exemplo com mais texto para mostrar como o 
                padding aumentado (20px vs 16px) melhora a leitura.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
};
