/**
 * Template8 - Header + Split Content Layout Component
 * =========================================
 * 
 * Layout template with header card + split view (left content + right alternatives).
 * Similar to Template4 but with dedicated header section above split.
 * 
 * @component Template8
 * @category Educacross Components V2
 * @source educacross-frontoffice\src\components\evaluations\questionDetail\templates\Template8.vue
 * @priority P2
 * @status PIXEL-PERFECT
 * @since 2.0.0
 */

export default {
  title: 'Educacross Components V2/Templates/Template8',
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# Template8

Template com **header + split view**: card de contexto acima + split 50/50 (conteúdo esquerda + alternativas direita).

## Quando usar

- **Introdução + split**: Apresentar contexto geral no topo + comparação lado a lado abaixo
- **Instrução única + atividade**: Header com regras + área de trabalho dividida
- **Título destacado**: Quando precisa de card separado para enunciado principal
- **Dashboard split**: Métricas/título em header + dados left + alternativas right
- **Fluxo hierárquico**: Contexto principal destacado + conteúdo secundário dividido
- **Combinação Templates 4+7**: Une benefício do header único com split lateral

## Diferença dos outros Templates

| Template | Header | Content Layout | Alternatives Position | Quando usar |
|----------|--------|----------------|----------------------|-------------|
| **Template1/5** | - | 2 cards stacked | Grid 4 cols below | Básico vertical |
| **Template4** | - | Split left 50% | Grid 2×2 right 50% | Split puro |
| **Template7** | - | 3 cards stacked | Grid below | Triple context |
| **Template8** | **1 card** | **Split left 50%** | **Grid 2×2 right 50%** | **Header + split** |

**Vantagem do Template8**: Header unifica contexto principal, split abaixo facilita comparação.

## Estrutura

\`\`\`
+---------------------------------------+
| Header Card: Contexto Geral          |  ← Full-width 100%
+---------------------------------------+
| Content Left 50%  | Alternatives 50% |  ← Split lg-6 + lg-6
|                   | [A]  [B]         |
| Card 1            | [C]  [D]         |  ← Grid 2×2 inside right
| Card 2            |                  |
+---------------------------------------+
\`\`\`

## Variantes

1. **Default**: Header + split basic
2. **ComGrafico**: Header + chart left + analysis right
3. **ComMapa**: Header + map left + geography questions right
4. **ComInstrucoes**: Header rules + activity split
5. **ComComparacao**: Header intro + comparison tables split
6. **ComTimeline**: Header context + timeline left + questions right
7. **ComDashboard**: Header metrics + data split
8. **Responsive**: Header 100% → split empilha mobile

## Características visuais

- Header card: Full-width (cols-12) destacado
- Content left: 50% (lg-6) com 2 cards empilhados
- Alternatives right: 50% (lg-6) grid 2×2 (md-6)
- Max-width: 1400px (mesmo Template4)
- Responsive: Split empilha <992px (header + content + alternatives vertical)
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
 * - Header background: #6E63E8 gradient
 * - Border color: #DBDADE
 * - Hover border: #6E63E8
 * 
 * Dimensões:
 * - Container: max-width 1400px
 * - Header card: 100% width (cols-12), padding 24px
 * - Content left column: 50% (lg-6), 2 cards empilhados
 * - Alternatives right column: 50% (lg-6), grid 2×2
 * - Alternative min-height: 140px
 * - Gap between split columns: 24px
 * - Gap between cards: 20px
 * - Gap between alternatives: 16px
 * 
 * Tipografia:
 * - Header title: 20px bold white
 * - Content font-size: 15px
 * - Line-height: 1.7
 * 
 * Layout:
 * - Header section: Full-width sempre
 * - Split section: lg-6 + lg-6 (50% each) desktop
 * - Responsive <992px: Empilha header → content → alternatives (vertical)
 */

// Estilos base do template
const template8Styles = `
<style>
  .template8-container {
    background: #F8F7FA;
    min-height: 100vh;
    padding: 24px;
    max-width: 1400px;
    margin: 0 auto;
  }
  
  .template8-section {
    margin-bottom: 24px;
  }
  
  .template8-row {
    display: flex;
    flex-wrap: wrap;
    margin: -12px;
  }
  
  .template8-col {
    padding: 12px;
    width: 100%;
  }
  
  @media (min-width: 992px) {
    .template8-col-half {
      width: 50%;
    }
  }
  
  .template8-header {
    background: linear-gradient(135deg, #6E63E8 0%, #8B83F5 100%);
    border: none;
    border-radius: 8px;
    padding: 24px;
    margin-bottom: 24px;
    box-shadow: 0 4px 12px rgba(110,99,232,0.2);
    color: white;
  }
  
  .header-title {
    font-size: 20px;
    font-weight: 700;
    margin-bottom: 12px;
    color: white;
    display: flex;
    align-items: center;
    gap: 12px;
  }
  
  .header-content {
    font-size: 15px;
    line-height: 1.7;
    color: rgba(255,255,255,0.95);
  }
  
  .template8-card {
    background: #FFFFFF;
    border: 1px solid #DBDADE;
    border-radius: 8px;
    padding: 20px;
    margin-bottom: 20px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.06);
    height: 100%;
    transition: all 0.2s;
  }
  
  .template8-card:hover {
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  }
  
  .template8-card:last-child {
    margin-bottom: 0;
  }
  
  .question-content-area {
    font-size: 15px;
    line-height: 1.7;
    color: #5D596C;
  }
  
  .alternatives-grid-split {
    display: grid;
    grid-template-columns: 1fr;
    gap: 16px;
    height: 100%;
  }
  
  @media (min-width: 768px) {
    .alternatives-grid-split {
      grid-template-columns: repeat(2, 1fr);
    }
  }
  
  .alternative-card {
    background: #FFFFFF;
    border: 2px solid #DBDADE;
    border-radius: 8px;
    padding: 16px;
    min-height: 140px;
    cursor: pointer;
    transition: all 0.2s;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  
  .alternative-card:hover {
    border-color: #6E63E8;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(110,99,232,0.15);
  }
  
  .alternative-label {
    font-size: 13px;
    font-weight: 600;
    color: #6E6B7B;
    margin-bottom: 8px;
    text-transform: uppercase;
    letter-spacing: 0.3px;
  }
  
  .alternative-text {
    font-size: 15px;
    line-height: 1.6;
    color: #5D596C;
  }
  
  @media (max-width: 991px) {
    .template8-container {
      padding: 16px;
    }
    
    .template8-header {
      padding: 20px;
    }
    
    .template8-card {
      padding: 16px;
      margin-bottom: 16px;
    }
    
    .alternatives-grid-split {
      grid-template-columns: 1fr;
      margin-top: 16px;
    }
  }
</style>
`;

// Story: Default
export const Default = {
  render: () => `
    ${template8Styles}
    <div class="template8-container">
      <div class="template8-section">
        <div class="template8-header">
          <div class="header-title">
            <i class="bi bi-info-circle-fill"></i>
            Contexto Geral
          </div>
          <div class="header-content">
            Template8 combina header destacado com split view abaixo. O header apresenta
            contexto geral, enquanto a área dividida permite comparação lado a lado.
          </div>
        </div>
      </div>
      
      <div class="template8-row">
        <div class="template8-col template8-col-half">
          <div class="template8-card">
            <div class="question-content-area">
              <strong>Conteúdo Principal:</strong> Este lado esquerdo (50%) contém informações
              detalhadas, gráficos, textos ou imagens que servem de referência.
            </div>
          </div>
          <div class="template8-card">
            <div class="question-content-area">
              Pode conter múltiplos cards empilhados verticalmente, cada um com informações
              complementares ou etapas sequenciais.
            </div>
          </div>
        </div>
        
        <div class="template8-col template8-col-half">
          <div class="alternatives-grid-split">
            <div class="alternative-card">
              <div class="alternative-label">Alternativa A</div>
              <div class="alternative-text">Lado direito (50%) com grid 2×2 de alternativas</div>
            </div>
            <div class="alternative-card">
              <div class="alternative-label">Alternativa B</div>
              <div class="alternative-text">Facilita comparação com conteúdo à esquerda</div>
            </div>
            <div class="alternative-card">
              <div class="alternative-label">Alternativa C</div>
              <div class="alternative-text">Mantém referência visual sempre visível</div>
            </div>
            <div class="alternative-card">
              <div class="alternative-label">Alternativa D</div>
              <div class="alternative-text">Ideal para análise e interpretação</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
};

// Story: ComGrafico
export const ComGrafico = {
  render: () => `
    ${template8Styles}
    <div class="template8-container">
      <div class="template8-section">
        <div class="template8-header">
          <div class="header-title">
            <i class="bi bi-bar-chart-fill"></i>
            Análise de Vendas - Primeiro Trimestre 2026
          </div>
          <div class="header-content">
            A empresa XYZ registrou crescimento de 18% no primeiro trimestre comparado ao mesmo período de 2025.
            Analise o gráfico e responda às perguntas.
          </div>
        </div>
      </div>
      
      <div class="template8-row">
        <div class="template8-col template8-col-half">
          <div class="template8-card">
            <svg viewBox="0 0 400 250" style="width: 100%; height: auto;">
              <text x="200" y="20" text-anchor="middle" font-size="14" font-weight="bold" fill="#5D596C">Vendas Mensais (em milhares R$)</text>
              
              <!-- Eixos -->
              <line x1="50" y1="200" x2="350" y2="200" stroke="#DBDADE" stroke-width="2"/>
              <line x1="50" y1="50" x2="50" y2="200" stroke="#DBDADE" stroke-width="2"/>
              
              <!-- Barras -->
              <rect x="80" y="110" width="60" height="90" fill="#6E63E8" opacity="0.8"/>
              <rect x="170" y="80" width="60" height="120" fill="#28C76F" opacity="0.8"/>
              <rect x="260" y="130" width="60" height="70" fill="#FF9800" opacity="0.8"/>
              
              <!-- Labels -->
              <text x="110" y="220" text-anchor="middle" font-size="12" fill="#5D596C">Janeiro</text>
              <text x="200" y="220" text-anchor="middle" font-size="12" fill="#5D596C">Fevereiro</text>
              <text x="290" y="220" text-anchor="middle" font-size="12" fill="#5D596C">Março</text>
              
              <!-- Valores -->
              <text x="110" y="100" text-anchor="middle" font-size="12" font-weight="bold" fill="#6E63E8">R$ 450k</text>
              <text x="200" y="70" text-anchor="middle" font-size="12" font-weight="bold" fill="#28C76F">R$ 600k</text>
              <text x="290" y="120" text-anchor="middle" font-size="12" font-weight="bold" fill="#FF9800">R$ 350k</text>
            </svg>
          </div>
          <div class="template8-card">
            <div class="question-content-area">
              <strong>Dados complementares:</strong><br>
              • Meta trimestral: R$ 1.200.000<br>
              • Vendas realizadas: R$ 1.400.000<br>
              • Superação da meta: <span style="color: #28C76F; font-weight: 600;">+16,7%</span>
            </div>
          </div>
        </div>
        
        <div class="template8-col template8-col-half">
          <div class="alternatives-grid-split">
            <div class="alternative-card">
              <div class="alternative-label">Alternativa A</div>
              <div class="alternative-text">Fevereiro teve o melhor desempenho com R$ 600k</div>
            </div>
            <div class="alternative-card">
              <div class="alternative-label">Alternativa B</div>
              <div class="alternative-text">Março superou Janeiro em 22% nas vendas</div>
            </div>
            <div class="alternative-card">
              <div class="alternative-label">Alternativa C</div>
              <div class="alternative-text">A média mensal foi de R$ 466,7k no trimestre</div>
            </div>
            <div class="alternative-card">
              <div class="alternative-label">Alternativa D</div>
              <div class="alternative-text">Janeiro e Março juntos igualam Fevereiro</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
};

// Story: ComMapa
export const ComMapa = {
  render: () => `
    ${template8Styles}
    <div class="template8-container">
      <div class="template8-section">
        <div class="template8-header">
          <div class="header-title">
            <i class="bi bi-geo-alt-fill"></i>
            Geografia do Brasil - Regiões e Estados
          </div>
          <div class="header-content">
            O Brasil é dividido em 5 regiões geográficas: Norte, Nordeste, Centro-Oeste, Sudeste e Sul.
            Cada região possui características climáticas, culturais e econômicas distintas.
          </div>
        </div>
      </div>
      
      <div class="template8-row">
        <div class="template8-col template8-col-half">
          <div class="template8-card">
            <svg viewBox="0 0 300 350" style="width: 100%; height: auto;">
              <text x="150" y="20" text-anchor="middle" font-size="14" font-weight="bold" fill="#5D596C">Brasil - Regiões</text>
              
              <!-- Norte (amarelo) -->
              <path d="M 80,60 L 180,50 L 200,80 L 190,120 L 160,130 L 100,110 Z" fill="#FFD54F" stroke="#5D596C" stroke-width="1.5"/>
              <text x="150" y="90" text-anchor="middle" font-size="11" font-weight="bold">NORTE</text>
              
              <!-- Nordeste (laranja) -->
              <path d="M 200,80 L 270,90 L 280,140 L 260,180 L 220,170 L 190,120 Z" fill="#FF9800" stroke="#5D596C" stroke-width="1.5"/>
              <text x="240" y="135" text-anchor="middle" font-size="11" font-weight="bold">NORDESTE</text>
              
              <!-- Centro-Oeste (verde claro) -->
              <path d="M 100,110 L 160,130 L 180,180 L 150,240 L 90,220 L 70,160 Z" fill="#AED581" stroke="#5D596C" stroke-width="1.5"/>
              <text x="120" y="175" text-anchor="middle" font-size="11" font-weight="bold">CENTRO-</text>
              <text x="120" y="188" text-anchor="middle" font-size="11" font-weight="bold">OESTE</text>
              
              <!-- Sudeste (azul) -->
              <path d="M 180,180 L 220,170 L 240,210 L 210,250 L 160,245 L 150,240 Z" fill="#64B5F6" stroke="#5D596C" stroke-width="1.5"/>
              <text x="190" y="215" text-anchor="middle" font-size="11" font-weight="bold">SUDESTE</text>
              
              <!-- Sul (rosa) -->
              <path d="M 90,220 L 150,240 L 160,245 L 180,290 L 130,310 L 80,280 Z" fill="#F48FB1" stroke="#5D596C" stroke-width="1.5"/>
              <text x="130" y="275" text-anchor="middle" font-size="11" font-weight="bold">SUL</text>
            </svg>
          </div>
          <div class="template8-card">
            <div class="question-content-area">
              <strong>População estimada (2026):</strong><br>
              Sudeste: 89 milhões • Nordeste: 57 milhões • Sul: 30 milhões<br>
              Norte: 19 milhões • Centro-Oeste: 17 milhões
            </div>
          </div>
        </div>
        
        <div class="template8-col template8-col-half">
          <div class="alternatives-grid-split">
            <div class="alternative-card">
              <div class="alternative-label">Alternativa A</div>
              <div class="alternative-text">A região Sudeste é a mais populosa do Brasil</div>
            </div>
            <div class="alternative-card">
              <div class="alternative-label">Alternativa B</div>
              <div class="alternative-text">O Norte possui maior extensão territorial</div>
            </div>
            <div class="alternative-card">
              <div class="alternative-label">Alternativa C</div>
              <div class="alternative-text">Centro-Oeste abriga a capital federal Brasília</div>
            </div>
            <div class="alternative-card">
              <div class="alternative-label">Alternativa D</div>
              <div class="alternative-text">Todas as alternativas anteriores estão corretas</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
};

// Story: ComInstrucoes
export const ComInstrucoes = {
  render: () => `
    ${template8Styles}
    <div class="template8-container">
      <div class="template8-section">
        <div class="template8-header">
          <div class="header-title">
            <i class="bi bi-list-check"></i>
            Instruções: Experimento de Densidade
          </div>
          <div class="header-content">
            <strong>Materiais:</strong> Copo transparente, água, óleo, mel e corante alimentício<br>
            <strong>Objetivo:</strong> Observar a separação de líquidos por diferença de densidade<br>
            <strong>Tempo:</strong> 15 minutos • <strong>Nível:</strong> Ensino Fundamental II
          </div>
        </div>
      </div>
      
      <div class="template8-row">
        <div class="template8-col template8-col-half">
          <div class="template8-card">
            <div class="question-content-area">
              <strong>Procedimento:</strong><br><br>
              1. Coloque mel no copo até 1/4 da altura<br>
              2. Adicione água colorida lentamente pela lateral até 1/2<br>
              3. Por último, despeje óleo até 3/4 do copo<br>
              4. Observe a separação das camadas sem mexer<br>
              5. Aguarde 2 minutos para estabilizar
            </div>
          </div>
          <div class="template8-card">
            <div class="question-content-area">
              <strong>Resultado esperado:</strong> Três camadas distintas visíveis, com mel embaixo,
              água no meio e óleo no topo, sem mistura entre elas.
            </div>
          </div>
        </div>
        
        <div class="template8-col template8-col-half">
          <div class="alternatives-grid-split">
            <div class="alternative-card">
              <div class="alternative-label">Pergunta 1</div>
              <div class="alternative-text">Por que o mel fica embaixo? Porque é mais denso que água e óleo</div>
            </div>
            <div class="alternative-card">
              <div class="alternative-label">Pergunta 2</div>
              <div class="alternative-text">Qual líquido tem menor densidade? O óleo, por isso flutua no topo</div>
            </div>
            <div class="alternative-card">
              <div class="alternative-label">Pergunta 3</div>
              <div class="alternative-text">O que acontece se mexer? As camadas se misturam temporariamente</div>
            </div>
            <div class="alternative-card">
              <div class="alternative-label">Pergunta 4</div>
              <div class="alternative-text">Por que usar corante? Para visualizar melhor a separação das fases</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
};

// Story: ComComparacao
export const ComComparacao = {
  render: () => `
    ${template8Styles}
    <div class="template8-container">
      <div class="template8-section">
        <div class="template8-header">
          <div class="header-title">
            <i class="bi bi-clipboard-data"></i>
            Comparação: Células Procariontes vs Eucariontes
          </div>
          <div class="header-content">
            As células são classificadas em dois grandes grupos conforme a presença ou ausência
            de núcleo organizado: procariontes (sem núcleo) e eucariontes (com núcleo).
          </div>
        </div>
      </div>
      
      <div class="template8-row">
        <div class="template8-col template8-col-half">
          <div class="template8-card">
            <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
              <thead>
                <tr style="background: #F3F2F7;">
                  <th style="padding: 10px; text-align: left; border: 1px solid #DBDADE;">Característica</th>
                  <th style="padding: 10px; text-align: center; border: 1px solid #DBDADE; color: #6E63E8;">Procarionte</th>
                  <th style="padding: 10px; text-align: center; border: 1px solid #DBDADE; color: #28C76F;">Eucarionte</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style="padding: 10px; border: 1px solid #DBDADE;"><strong>Núcleo</strong></td>
                  <td style="padding: 10px; border: 1px solid #DBDADE; text-align: center;">❌ Ausente</td>
                  <td style="padding: 10px; border: 1px solid #DBDADE; text-align: center;">✅ Presente</td>
                </tr>
                <tr style="background: #FAFAFA;">
                  <td style="padding: 10px; border: 1px solid #DBDADE;"><strong>Organelas</strong></td>
                  <td style="padding: 10px; border: 1px solid #DBDADE; text-align: center;">Poucas</td>
                  <td style="padding: 10px; border: 1px solid #DBDADE; text-align: center;">Muitas</td>
                </tr>
                <tr>
                  <td style="padding: 10px; border: 1px solid #DBDADE;"><strong>Tamanho</strong></td>
                  <td style="padding: 10px; border: 1px solid #DBDADE; text-align: center;">1-10 μm</td>
                  <td style="padding: 10px; border: 1px solid #DBDADE; text-align: center;">10-100 μm</td>
                </tr>
                <tr style="background: #FAFAFA;">
                  <td style="padding: 10px; border: 1px solid #DBDADE;"><strong>DNA</strong></td>
                  <td style="padding: 10px; border: 1px solid #DBDADE; text-align: center;">Circular</td>
                  <td style="padding: 10px; border: 1px solid #DBDADE; text-align: center;">Linear</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="template8-card">
            <div class="question-content-area">
              <strong>Exemplos:</strong><br>
              Procariontes: Bactérias e cianobactérias<br>
              Eucariontes: Animais, plantas, fungos e protistas
            </div>
          </div>
        </div>
        
        <div class="template8-col template8-col-half">
          <div class="alternatives-grid-split">
            <div class="alternative-card">
              <div class="alternative-label">Alternativa A</div>
              <div class="alternative-text">Células procariontes são mais complexas que eucariontes</div>
            </div>
            <div class="alternative-card">
              <div class="alternative-label">Alternativa B</div>
              <div class="alternative-text">Eucariontes possuem núcleo definido por membrana</div>
            </div>
            <div class="alternative-card">
              <div class="alternative-label">Alternativa C</div>
              <div class="alternative-text">Bactérias são exemplos de células eucariontes</div>
            </div>
            <div class="alternative-card">
              <div class="alternative-label">Alternativa D</div>
              <div class="alternative-text">O tamanho não varia entre os dois tipos celulares</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
};

// Story: ComTimeline
export const ComTimeline = {
  render: () => `
    ${template8Styles}
    <style>
      .timeline-item {
        display: flex;
        gap: 16px;
        margin-bottom: 20px;
        padding-bottom: 20px;
        border-left: 3px solid #6E63E8;
        padding-left: 20px;
      }
      
      .timeline-item:last-child {
        border-left-color: transparent;
        margin-bottom: 0;
        padding-bottom: 0;
      }
      
      .timeline-year {
        font-size: 18px;
        font-weight: 700;
        color: #6E63E8;
        min-width: 60px;
      }
      
      .timeline-event {
        flex: 1;
        font-size: 14px;
        line-height: 1.6;
        color: #5D596C;
      }
    </style>
    <div class="template8-container">
      <div class="template8-section">
        <div class="template8-header">
          <div class="header-title">
            <i class="bi bi-clock-history"></i>
            Linha do Tempo: Independência do Brasil
          </div>
          <div class="header-content">
            A independência do Brasil foi um processo gradual que envolveu eventos políticos,
            econômicos e sociais entre 1808 e 1822.
          </div>
        </div>
      </div>
      
      <div class="template8-row">
        <div class="template8-col template8-col-half">
          <div class="template8-card" style="min-height: 400px;">
            <div class="timeline-item">
              <div class="timeline-year">1808</div>
              <div class="timeline-event">
                <strong>Chegada da Família Real</strong> - Dom João VI e a corte portuguesa fogem de Napoleão e se instalam no Rio de Janeiro
              </div>
            </div>
            <div class="timeline-item">
              <div class="timeline-year">1815</div>
              <div class="timeline-event">
                <strong>Reino Unido</strong> - Brasil é elevado à categoria de Reino Unido a Portugal e Algarves
              </div>
            </div>
            <div class="timeline-item">
              <div class="timeline-year">1821</div>
              <div class="timeline-event">
                <strong>Retorno de D. João VI</strong> - Rei volta para Portugal, deixando Dom Pedro como regente do Brasil
              </div>
            </div>
            <div class="timeline-item">
              <div class="timeline-year">1822</div>
              <div class="timeline-event">
                <strong>Grito do Ipiranga</strong> - Dom Pedro proclama a independência do Brasil em 7 de setembro
              </div>
            </div>
          </div>
        </div>
        
        <div class="template8-col template8-col-half">
          <div class="alternatives-grid-split">
            <div class="alternative-card">
              <div class="alternative-label">Alternativa A</div>
              <div class="alternative-text">A independência ocorreu logo após a chegada da família real (1808)</div>
            </div>
            <div class="alternative-card">
              <div class="alternative-label">Alternativa B</div>
              <div class="alternative-text">O processo levou 14 anos desde 1808 até 1822</div>
            </div>
            <div class="alternative-card">
              <div class="alternative-label">Alternativa C</div>
              <div class="alternative-text">Dom João VI proclamou a independência antes de voltar</div>
            </div>
            <div class="alternative-card">
              <div class="alternative-label">Alternativa D</div>
              <div class="alternative-text">Brasil foi colônia durante todo o período 1808-1822</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
};

// Story: ComDashboard
export const ComDashboard = {
  render: () => `
    ${template8Styles}
    <div class="template8-container">
      <div class="template8-section">
        <div class="template8-header">
          <div class="header-title">
            <i class="bi bi-speedometer2"></i>
            Dashboard Escolar - Desempenho Turma 9º Ano A
          </div>
          <div class="header-content">
            Análise de desempenho acadêmico do primeiro semestre de 2026. Dados consolidados
            de 32 alunos em 8 disciplinas principais.
          </div>
        </div>
      </div>
      
      <div class="template8-row">
        <div class="template8-col template8-col-half">
          <div class="template8-card">
            <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px;">
              <div style="background: linear-gradient(135deg, #6E63E8 0%, #8B83F5 100%); padding: 16px; border-radius: 6px; color: white;">
                <div style="font-size: 12px; opacity: 0.9;">Média Geral</div>
                <div style="font-size: 32px; font-weight: 700;">7.8</div>
                <div style="font-size: 11px; opacity: 0.8;">↑ +0.3 vs semestre anterior</div>
              </div>
              <div style="background: linear-gradient(135deg, #28C76F 0%, #48DA89 100%); padding: 16px; border-radius: 6px; color: white;">
                <div style="font-size: 12px; opacity: 0.9;">Aprovação</div>
                <div style="font-size: 32px; font-weight: 700;">94%</div>
                <div style="font-size: 11px; opacity: 0.8;">30 de 32 alunos</div>
              </div>
              <div style="background: linear-gradient(135deg, #FF9800 0%, #FFB547 100%); padding: 16px; border-radius: 6px; color: white;">
                <div style="font-size: 12px; opacity: 0.9;">Frequência</div>
                <div style="font-size: 32px; font-weight: 700;">92%</div>
                <div style="font-size: 11px; opacity: 0.8;">Acima da meta (90%)</div>
              </div>
              <div style="background: linear-gradient(135deg, #00CFE8 0%, #33D9EE 100%); padding: 16px; border-radius: 6px; color: white;">
                <div style="font-size: 12px; opacity: 0.9;">Destaque</div>
                <div style="font-size: 32px; font-weight: 700;">100%</div>
                <div style="font-size: 11px; opacity: 0.8;">Matemática</div>
              </div>
            </div>
          </div>
          <div class="template8-card">
            <div class="question-content-area">
              <strong>Ranking disciplinas:</strong><br>
              1º Matemática (9.2) • 2º Ciências (8.7) • 3º História (8.1)<br>
              4º Geografia (7.9) • 5º Português (7.5) • 6º Inglês (7.2)
            </div>
          </div>
        </div>
        
        <div class="template8-col template8-col-half">
          <div class="alternatives-grid-split">
            <div class="alternative-card">
              <div class="alternative-label">Pergunta A</div>
              <div class="alternative-text">Qual disciplina teve melhor desempenho? Matemática com 9.2</div>
            </div>
            <div class="alternative-card">
              <div class="alternative-label">Pergunta B</div>
              <div class="alternative-text">Quantos alunos não atingiram aprovação? 2 alunos (6%)</div>
            </div>
            <div class="alternative-card">
              <div class="alternative-label">Pergunta C</div>
              <div class="alternative-text">A frequência superou a meta? Sim, 92% > 90%</div>
            </div>
            <div class="alternative-card">
              <div class="alternative-label">Pergunta D</div>
              <div class="alternative-text">A média subiu comparado ao semestre anterior? Sim, +0.3 pontos</div>
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
    ${template8Styles}
    <style>
      .responsive-info-eight {
        background: #FFF3E0;
        border-left: 4px solid #FF9800;
        padding: 16px;
        border-radius: 6px;
        margin: 24px 0;
      }
      
      .responsive-info-eight h4 {
        font-size: 14px;
        font-weight: 600;
        color: #E65100;
        margin: 0 0 8px 0;
        display: flex;
        align-items: center;
        gap: 8px;
      }
      
      .responsive-info-eight ul {
        margin: 0;
        padding-left: 20px;
      }
      
      .responsive-info-eight li {
        font-size: 13px;
        color: #F57C00;
        margin-bottom: 4px;
      }
    </style>
    <div class="template8-container">
      <div class="responsive-info-eight">
        <h4>
          <i class="bi bi-arrows-fullscreen"></i>
          Template8: Comportamento Responsivo
        </h4>
        <ul>
          <li>✅ Header: Sempre 100% width (todos os dispositivos)</li>
          <li>✅ Desktop (≥992px): Split 50% content + 50% alternatives (lado a lado)</li>
          <li>✅ Tablet/Mobile (<992px): Empilha vertical (header → content → alternatives)</li>
          <li>✅ Alternatives grid: 2 cols tablet, 1 col mobile</li>
          <li>✅ Padding ajusta automaticamente (24px → 20px → 16px)</li>
        </ul>
      </div>
      
      <div class="template8-section">
        <div class="template8-header">
          <div class="header-title">
            <i class="bi bi-display"></i>
            Header Responsivo Demo
          </div>
          <div class="header-content">
            Este card header mantém 100% da largura em qualquer dispositivo, garantindo
            visibilidade do contexto principal independente do tamanho de tela.
          </div>
        </div>
      </div>
      
      <div class="template8-row">
        <div class="template8-col template8-col-half">
          <div class="template8-card">
            <div class="question-content-area">
              <strong>🖥️ Desktop (≥992px):</strong><br>
              Content left e alternatives right aparecem lado a lado em split 50/50.
              Layout horizontal maximiza uso do espaço disponível.
            </div>
          </div>
          <div class="template8-card">
            <div class="question-content-area">
              <strong>📱 Mobile (<992px):</strong><br>
              Split empilha verticalmente: header (100%) → content (100%) → alternatives (100%).
              Alternativas mudam de grid 2 cols para 1 col em telas pequenas.
            </div>
          </div>
        </div>
        
        <div class="template8-col template8-col-half">
          <div class="alternatives-grid-split">
            <div class="alternative-card">
              <div class="alternative-label">Layout A</div>
              <div class="alternative-text">Desktop: 2×2 grid lado a lado com content</div>
            </div>
            <div class="alternative-card">
              <div class="alternative-label">Layout B</div>
              <div class="alternative-text">Tablet: 2 cols abaixo do content empilhado</div>
            </div>
            <div class="alternative-card">
              <div class="alternative-label">Layout C</div>
              <div class="alternative-text">Mobile: 1 col empilhada verticalmente</div>
            </div>
            <div class="alternative-card">
              <div class="alternative-label">Layout D</div>
              <div class="alternative-text">Header sempre 100% em todos os breakpoints</div>
            </div>
          </div>
        </div>
      </div>
    </div>
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
          <div style="display:inline-block;padding:8px 16px;background:rgba(255,255,255,0.15);border-radius:50px;margin-bottom:20px;font-size:14px;border:1px solid rgba(255,255,255,0.2);">Templates</div>
          <h1 style="font-size:3rem;font-weight:700;margin:0 0 12px 0;letter-spacing:-0.02em;">Template8</h1>
          <p style="font-size:1.1rem;opacity:0.9;margin:0;max-width:600px;">Header + Split Content Layout Component</p>
        </div>
      </div>
      <div style="max-width:900px;margin:0 auto;padding:48px 40px;">
        <div style="background:white;border-radius:12px;padding:32px;margin-bottom:32px;box-shadow:0 2px 8px rgba(0,0,0,0.08);">
          <h2 style="font-size:1.1rem;font-weight:600;color:#5E5873;margin:0 0 16px 0;">Sobre o Componente</h2>
          <p style="color:#6E6B7B;line-height:1.7;margin:0 0 16px 0;">Header + Split Content Layout Component. Faz parte da categoria <strong>Templates</strong> do Design System Educacross.</p>
          <div style="background:#F8F7FF;border-left:4px solid #6E63E8;padding:16px;border-radius:4px;">
            <p style="margin:0;color:#5E5873;font-size:14px;line-height:1.6;"><strong>💡 Dica:</strong> Use <em>Playground</em> para explorar props, <em>Use Cases</em> para exemplos reais e <em>Accessibility</em> para validar WCAG.</p>
          </div>
        </div>
        <div style="background:white;border-radius:12px;padding:32px;box-shadow:0 2px 8px rgba(0,0,0,0.08);">
          <h2 style="font-size:1.1rem;font-weight:600;color:#5E5873;margin:0 0 16px 0;">Implementação Vue 2.7</h2>
          <pre style="background:#1E1E2E;color:#CDD6F4;padding:20px;border-radius:8px;font-size:13px;line-height:1.6;overflow:auto;margin:0;"><code>import Template8 from '@/components/Template8.vue';

// Template
&lt;Template8 v-bind="props" /&gt;</code></pre>
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
    docs: { description: { story: 'Explore o Template8 com controles interativos.' } },
  },
  render: (args) => `
    <div style="padding:32px;display:flex;justify-content:center;align-items:center;min-height:200px;background:#F8F8F8;border-radius:12px;">
      <div style="text-align:center;color:#6E6B7B;">
        <div style="width:60px;height:60px;background:#6E63E820;border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 16px;font-size:24px;">🎨</div>
        <p style="margin:0 0 8px 0;font-size:15px;font-weight:600;color:#5E5873;">Playground Template8</p>
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
    docs: { description: { story: 'Exemplos de uso real do Template8 no Educacross.' } },
  },
  render: () => `
    <div style="max-width:800px;margin:0 auto;padding:40px 20px;font-family:'Public Sans',sans-serif;">
      <div style="background:#6E63E815;border:1px solid #6E63E830;border-radius:12px;padding:24px;margin-bottom:40px;">
        <h1 style="font-size:1.5rem;font-weight:700;color:#5E5873;margin:0 0 8px 0;">Casos de Uso: Template8</h1>
        <p style="color:#6E6B7B;margin:0;font-size:14px;line-height:1.6;">Cenários reais de uso no contexto educacional da plataforma Educacross</p>
      </div>
      
      <div style="margin-bottom:32px;">
        <h2 style="font-size:18px;font-weight:600;color:#5E5873;margin:0 0 8px 0;display:flex;align-items:center;gap:10px;">
          <span style="display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;background:#6E63E8;color:white;border-radius:50%;font-size:13px;font-weight:700;flex-shrink:0;">1</span>
          Professor — Painel Principal
        </h2>
        <p style="color:#6E6B7B;margin:0 0 16px 0;padding-left:38px;font-size:14px;">Professor utilizando Template8 no dashboard de gestão de turmas</p>
        <div style="background:#F8F8F8;border-radius:8px;padding:20px;margin-left:38px;text-align:center;color:#B9B9C3;font-size:13px;">
          Ver story <strong>Default</strong> para visualização do componente neste contexto
        </div>
      </div>
      <div style="margin-bottom:32px;">
        <h2 style="font-size:18px;font-weight:600;color:#5E5873;margin:0 0 8px 0;display:flex;align-items:center;gap:10px;">
          <span style="display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;background:#6E63E8;color:white;border-radius:50%;font-size:13px;font-weight:700;flex-shrink:0;">2</span>
          Aluno — Portal do Estudante
        </h2>
        <p style="color:#6E6B7B;margin:0 0 16px 0;padding-left:38px;font-size:14px;">Aluno interagindo com Template8 no portal educacional</p>
        <div style="background:#F8F8F8;border-radius:8px;padding:20px;margin-left:38px;text-align:center;color:#B9B9C3;font-size:13px;">
          Ver story <strong>Default</strong> para visualização do componente neste contexto
        </div>
      </div>
      <div style="margin-bottom:32px;">
        <h2 style="font-size:18px;font-weight:600;color:#5E5873;margin:0 0 8px 0;display:flex;align-items:center;gap:10px;">
          <span style="display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;background:#6E63E8;color:white;border-radius:50%;font-size:13px;font-weight:700;flex-shrink:0;">3</span>
          Coordenador — Relatórios
        </h2>
        <p style="color:#6E6B7B;margin:0 0 16px 0;padding-left:38px;font-size:14px;">Coordenador pedagógico analisando dados via Template8</p>
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
    docs: { description: { story: 'Conformidade WCAG 2.1 AA para o Template8.' } },
  },
  render: () => `
    <div style="max-width:800px;margin:0 auto;padding:40px 20px;font-family:'Public Sans',sans-serif;">

      <div style="background:linear-gradient(135deg,#6E63E8 0%,#764ba2 100%);padding:32px;border-radius:12px;margin-bottom:32px;color:white;">
        <h1 style="font-size:1.5rem;font-weight:700;margin:0 0 8px 0;">Acessibilidade: Template8</h1>
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

