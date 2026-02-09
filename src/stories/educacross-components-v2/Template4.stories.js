/**
 * Template4 - Split Content Layout Component
 * =========================================
 * 
 * Layout template with split view: left content area, right alternatives grid.
 * Ideal for questions requiring side-by-side comparison or reference material.
 * 
 * @component Template4
 * @category Educacross Components V2
 * @source educacross-frontoffice\src\components\evaluations\questionDetail\templates\Template4.vue
 * @priority P2
 * @status PIXEL-PERFECT
 * @since 2.0.0
 */

export default {
  title: 'Educacross Components V2/Templates/Template4',
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# Template4

Template com layout split-view: conteúdo à esquerda (50%), alternativas grid à direita (50%).

## Quando usar

- **Referência visual**: Questões que requerem consulta constante a imagem/texto enquanto responde
- **Comparação lado a lado**: Material de referência e alternativas visíveis simultaneamente
- **Leitura de gráficos**: Gráfico à esquerda, interpretação nas alternativas à direita
- **Mapas e diagramas**: Material visual grande que deve permanecer visível
- **Textos longos**: Texto de apoio extenso que não cabe em um card pequeno
- **Split-screen UX**: Interface que aproveita largura de telas wide

## Estrutura do Layout

\`\`\`
+--------------------------------+
| Card Header (100%)             |
+--------------------------------+
| Content Left (50%) | Alt Grid  |
| - QuestionContent  | (50%)     |
| - QuestionContent  | - 2x2 Grid|
|                    |           |
+--------------------------------+
\`\`\`

## Diferenças dos Templates Anteriores

| Aspecto | Template1-3 | Template4 |
|---------|------------|-----------|
| **Layout** | Vertical (content → alternatives) | Horizontal split 50/50 |
| **Content cards** | Full-width | Left column (50%) |
| **Alternatives** | Below content | Right column grid 2×2 |
| **Uso** | Sequential reading | Side-by-side comparison |
| **Screen** | Works on narrow | Needs wider screens |

## Variantes

1. **Default**: Split básico com texto à esquerda, grid 2×2 à direita
2. **ComImagem**: Imagem grande fixa à esquerda, alternativas à direita
3. **ComGrafico**: Gráfico/chart à esquerda, interpretação à direita
4. **ComMapa**: Mapa geográfico à esquerda, questões sobre ele à direita
5. **ComTabela**: Tabela de dados à esquerda, análise à direita
6. **ComTextoLongo**: Texto extenso à esquerda para consulta, respostas à direita
7. **DuasAlternativas**: Split 50/50 com apenas 2 alternativas grandes
8. **Responsive**: Mobile empilha conteúdo acima, alternativas abaixo

## Características visuais

- Split view: 2 colunas de 6 cols (lg-6 cada = 50% width)
- Mobile: Empilha verticalmente (12 cols cada)
- Alternatives grid: 2×2 dentro da coluna direita (md-6)
- Match-height nas colunas para mesma altura
- Scroll independente se necessário
- Gap: 24px entre colunas
        `
      }
    }
  }
};

/**
 * Props API
 * 
 * Componente estrutural sem props - recebe QuestionContent (left) e QuestionAlternative (right grid) como children
 */

/**
 * Design Specs
 * 
 * Cores:
 * - Card background: #FFFFFF
 * - Body background: #F8F7FA
 * - Border color: #DBDADE
 * - Split divider: transparent (gap cria separação)
 * 
 * Dimensões:
 * - Container: 100% width max-width 1400px
 * - Header card: 100% width (cols-12)
 * - Split columns: 50% each (lg-6)
 * - Left content: padding 20px, pode ter múltiplos QuestionContent
 * - Right grid: 2×2 alternatives (md-6 = 50% cada)
 * - Gap between columns: 24px
 * - Card padding: 20px
 * 
 * Responsividade:
 * - xs/sm/md (<992px): Empilha verticalmente, content 100% + alternatives 100%
 * - lg+ (≥992px): Split 50/50 horizontal
 * - Alternatives grid: 2 cols (md-6) → 1 col mobile
 * 
 * Layout Structure:
 * - section → b-row (header) → b-col 12
 * - section → b-row (main) → b-col lg-6 (content) + b-col lg-6 (alternatives)
 * - Match-height: Equaliza altura das duas colunas principais
 */

// Estilos base do template
const template4Styles = `
<style>
  .template4-container {
    background: #F8F7FA;
    min-height: 100vh;
    padding: 24px;
    max-width: 1400px;
    margin: 0 auto;
  }
  
  .template4-row {
    display: flex;
    flex-wrap: wrap;
    margin: -12px;
  }
  
  .template4-col {
    padding: 12px;
  }
  
  .template4-col-full {
    width: 100%;
  }
  
  .template4-col-half {
    width: 100%;
  }
  
  @media (min-width: 992px) {
    .template4-col-half {
      width: 50%;
    }
  }
  
  .template4-card {
    background: #FFFFFF;
    border: 1px solid #DBDADE;
    border-radius: 8px;
    padding: 20px;
    margin-bottom: 24px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.06);
    height: 100%;
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
  
  .question-content-image-large {
    max-width: 100%;
    height: auto;
    border-radius: 8px;
    display: block;
    margin: 16px 0;
  }
  
  .alternatives-grid-split {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
    height: 100%;
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
    min-height: 140px;
  }
  
  .alternative-card:hover {
    border-color: #6E63E8;
    box-shadow: 0 4px 12px rgba(110,99,232,0.15);
    transform: translateY(-2px);
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
  
  .content-with-image {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
  
  .chart-container {
    background: #F8F8F8;
    border-radius: 8px;
    padding: 20px;
    margin: 16px 0;
  }
  
  @media (max-width: 991px) {
    .template4-container {
      padding: 16px;
    }
    
    .template4-card {
      padding: 16px;
      margin-bottom: 16px;
    }
    
    .alternatives-grid-split {
      grid-template-columns: 1fr;
    }
  }
</style>
`;

// Story: Default
export const Default = {
  render: () => `
    ${template4Styles}
    <div class="template4-container">
      <div class="template4-row">
        <div class="template4-col template4-col-full">
          <div class="template4-card">
            <div class="question-content-area">
              <strong>Questão 1:</strong> Analise o texto ao lado e responda à pergunta.
            </div>
          </div>
        </div>
      </div>
      
      <div class="template4-row">
        <div class="template4-col template4-col-half">
          <div class="template4-card">
            <div class="question-content-area">
              <h4 style="font-size: 16px; font-weight: 600; color: #5D596C; margin: 0 0 12px 0;">
                Texto de Referência
              </h4>
              <p style="margin-bottom: 12px;">
                A Revolução Industrial iniciou-se na Inglaterra no século XVIII e transformou profundamente 
                a sociedade europeia. A substituição do trabalho artesanal pelo trabalho fabril, impulsionada 
                pela invenção da máquina a vapor, provocou mudanças significativas nas relações de trabalho.
              </p>
              <p style="margin-bottom: 0;">
                O êxodo rural intensificou-se, com milhares de pessoas migrando do campo para as cidades em 
                busca de emprego nas fábricas. Surgiu uma nova classe social: o proletariado industrial.
              </p>
            </div>
          </div>
        </div>
        
        <div class="template4-col template4-col-half">
          <div class="alternatives-grid-split">
            <div class="alternative-card">
              <span class="alternative-label">A</span>
              <span class="alternative-text">A Revolução Industrial começou no século XIX na França</span>
            </div>
            <div class="alternative-card">
              <span class="alternative-label">B</span>
              <span class="alternative-text">A máquina a vapor foi fundamental para a industrialização</span>
            </div>
            <div class="alternative-card">
              <span class="alternative-label">C</span>
              <span class="alternative-text">O trabalho artesanal substituiu o trabalho fabril</span>
            </div>
            <div class="alternative-card">
              <span class="alternative-label">D</span>
              <span class="alternative-text">O êxodo rural diminuiu durante a Revolução Industrial</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
};

// Story: ComImagem
export const ComImagem = {
  render: () => `
    ${template4Styles}
    <div class="template4-container">
      <div class="template4-row">
        <div class="template4-col template4-col-full">
          <div class="template4-card">
            <div class="question-content-area">
              <strong>Questão 2:</strong> Observe a figura e identifique as partes da célula.
            </div>
          </div>
        </div>
      </div>
      
      <div class="template4-row">
        <div class="template4-col template4-col-half">
          <div class="template4-card">
            <div class="content-with-image">
              <h4 style="font-size: 16px; font-weight: 600; color: #5D596C; margin: 0;">
                Estrutura da Célula Animal
              </h4>
              <svg class="question-content-image-large" width="100%" height="300" viewBox="0 0 400 300">
                <ellipse cx="200" cy="150" rx="180" ry="130" fill="#E3F2FD" stroke="#1976D2" stroke-width="3"/>
                <circle cx="200" cy="150" r="50" fill="#90CAF9" stroke="#0D47A1" stroke-width="2"/>
                <text x="200" y="155" text-anchor="middle" font-size="14" fill="#0D47A1" font-weight="600">Núcleo</text>
                <circle cx="120" cy="100" r="15" fill="#FFE082" stroke="#F57F17" stroke-width="2"/>
                <text x="120" y="85" text-anchor="middle" font-size="12" fill="#F57F17">Mitocôndria</text>
                <rect x="260" y="130" width="40" height="25" rx="5" fill="#C5E1A5" stroke="#558B2F" stroke-width="2"/>
                <text x="280" y="120" text-anchor="middle" font-size="12" fill="#558B2F">Retículo</text>
                <circle cx="150" cy="200" r="12" fill="#FFAB91" stroke="#D84315" stroke-width="2"/>
                <text x="150" y="225" text-anchor="middle" font-size="12" fill="#D84315">Ribossomo</text>
              </svg>
              <p style="font-size: 13px; color: #6E6B7B; margin: 0;">
                A célula animal possui várias organelas com funções específicas essenciais para a vida celular.
              </p>
            </div>
          </div>
        </div>
        
        <div class="template4-col template4-col-half">
          <div class="alternatives-grid-split">
            <div class="alternative-card">
              <span class="alternative-label">A</span>
              <span class="alternative-text">O núcleo controla as atividades celulares e contém o DNA</span>
            </div>
            <div class="alternative-card">
              <span class="alternative-label">B</span>
              <span class="alternative-text">As mitocôndrias são responsáveis pela fotossíntese</span>
            </div>
            <div class="alternative-card">
              <span class="alternative-label">C</span>
              <span class="alternative-text">O retículo endoplasmático produz energia ATP</span>
            </div>
            <div class="alternative-card">
              <span class="alternative-label">D</span>
              <span class="alternative-text">Ribossomos sintetizam proteínas na célula</span>
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
    ${template4Styles}
    <div class="template4-container">
      <div class="template4-row">
        <div class="template4-col template4-col-full">
          <div class="template4-card">
            <div class="question-content-area">
              <strong>Questão 3:</strong> Analise o gráfico e responda qual foi o mês com maior crescimento.
            </div>
          </div>
        </div>
      </div>
      
      <div class="template4-row">
        <div class="template4-col template4-col-half">
          <div class="template4-card">
            <h4 style="font-size: 16px; font-weight: 600; color: #5D596C; margin: 0 0 16px 0;">
              Vendas Mensais - 2026
            </h4>
            <div class="chart-container">
              <svg width="100%" height="250" viewBox="0 0 400 250">
                <line x1="40" y1="200" x2="360" y2="200" stroke="#E8E8E8" stroke-width="2"/>
                <line x1="40" y1="40" x2="40" y2="200" stroke="#E8E8E8" stroke-width="2"/>
                
                <rect x="60" y="150" width="40" height="50" fill="#6E63E8"/>
                <text x="80" y="220" text-anchor="middle" font-size="12" fill="#6E6B7B">Jan</text>
                <text x="80" y="140" text-anchor="middle" font-size="12" fill="#5D596C" font-weight="600">50</text>
                
                <rect x="120" y="130" width="40" height="70" fill="#6E63E8"/>
                <text x="140" y="220" text-anchor="middle" font-size="12" fill="#6E6B7B">Fev</text>
                <text x="140" y="120" text-anchor="middle" font-size="12" fill="#5D596C" font-weight="600">70</text>
                
                <rect x="180" y="80" width="40" height="120" fill="#28C76F"/>
                <text x="200" y="220" text-anchor="middle" font-size="12" fill="#6E6B7B">Mar</text>
                <text x="200" y="70" text-anchor="middle" font-size="12" fill="#5D596C" font-weight="600">120</text>
                
                <rect x="240" y="110" width="40" height="90" fill="#6E63E8"/>
                <text x="260" y="220" text-anchor="middle" font-size="12" fill="#6E6B7B">Abr</text>
                <text x="260" y="100" text-anchor="middle" font-size="12" fill="#5D596C" font-weight="600">90</text>
                
                <rect x="300" y="120" width="40" height="80" fill="#6E63E8"/>
                <text x="320" y="220" text-anchor="middle" font-size="12" fill="#6E6B7B">Mai</text>
                <text x="320" y="110" text-anchor="middle" font-size="12" fill="#5D596C" font-weight="600">80</text>
              </svg>
            </div>
            <p style="font-size: 13px; color: #6E6B7B; margin: 12px 0 0 0;">
              Valores em milhares de reais. Março destacado em verde.
            </p>
          </div>
        </div>
        
        <div class="template4-col template4-col-half">
          <div class="alternatives-grid-split">
            <div class="alternative-card">
              <span class="alternative-label">A</span>
              <span class="alternative-text">Janeiro teve o maior crescimento com R$ 50.000</span>
            </div>
            <div class="alternative-card">
              <span class="alternative-label">B</span>
              <span class="alternative-text">Março apresentou o maior valor de vendas</span>
            </div>
            <div class="alternative-card">
              <span class="alternative-label">C</span>
              <span class="alternative-text">Maio foi o mês com menores vendas</span>
            </div>
            <div class="alternative-card">
              <span class="alternative-label">D</span>
              <span class="alternative-text">As vendas permaneceram constantes todos os meses</span>
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
    ${template4Styles}
    <div class="template4-container">
      <div class="template4-row">
        <div class="template4-col template4-col-full">
          <div class="template4-card">
            <div class="question-content-area">
              <strong>Questão 4:</strong> Observe o mapa do Brasil e identifique as regiões corretamente.
            </div>
          </div>
        </div>
      </div>
      
      <div class="template4-row">
        <div class="template4-col template4-col-half">
          <div class="template4-card">
            <h4 style="font-size: 16px; font-weight: 600; color: #5D596C; margin: 0 0 16px 0;">
              Regiões do Brasil
            </h4>
            <svg class="question-content-image-large" width="100%" height="350" viewBox="0 0 300 400">
              <path d="M 50,50 L 250,50 L 250,120 L 50,120 Z" fill="#FFE082" stroke="#F57F17" stroke-width="2"/>
              <text x="150" y="90" text-anchor="middle" font-size="14" fill="#F57F17" font-weight="600">Norte</text>
              
              <path d="M 50,120 L 200,120 L 200,200 L 50,200 Z" fill="#FFAB91" stroke="#D84315" stroke-width="2"/>
              <text x="125" y="165" text-anchor="middle" font-size="14" fill="#D84315" font-weight="600">Nordeste</text>
              
              <path d="M 70,200 L 170,200 L 170,280 L 70,280 Z" fill="#90CAF9" stroke="#1976D2" stroke-width="2"/>
              <text x="120" y="245" text-anchor="middle" font-size="14" fill="#1976D2" font-weight="600">Sudeste</text>
              
              <path d="M 200,120 L 250,120 L 250,240 L 200,240 Z" fill="#C5E1A5" stroke="#558B2F" stroke-width="2"/>
              <text x="225" y="185" text-anchor="middle" font-size="12" fill="#558B2F" font-weight="600">Centro-Oeste</text>
              
              <path d="M 70,280 L 170,280 L 170,350 L 70,350 Z" fill="#CE93D8" stroke="#7B1FA2" stroke-width="2"/>
              <text x="120" y="320" text-anchor="middle" font-size="14" fill="#7B1FA2" font-weight="600">Sul</text>
            </svg>
          </div>
        </div>
        
        <div class="template4-col template4-col-half">
          <div class="alternatives-grid-split">
            <div class="alternative-card">
              <span class="alternative-label">A</span>
              <span class="alternative-text">A região Nordeste está localizada no norte do Brasil</span>
            </div>
            <div class="alternative-card">
              <span class="alternative-label">B</span>
              <span class="alternative-text">O Sudeste é a região mais populosa do país</span>
            </div>
            <div class="alternative-card">
              <span class="alternative-label">C</span>
              <span class="alternative-text">A região Sul está acima da região Sudeste</span>
            </div>
            <div class="alternative-card">
              <span class="alternative-label">D</span>
              <span class="alternative-text">O Centro-Oeste fica no litoral brasileiro</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
};

// Story: ComTabela
export const ComTabela = {
  render: () => `
    ${template4Styles}
    <style>
      .data-table {
        width: 100%;
        border-collapse: collapse;
        margin: 16px 0;
      }
      
      .data-table th,
      .data-table td {
        padding: 10px 12px;
        text-align: left;
        border: 1px solid #E8E8E8;
        font-size: 14px;
      }
      
      .data-table th {
        background: #F8F8F8;
        font-weight: 600;
        color: #5D596C;
      }
      
      .data-table td {
        color: #6E6B7B;
      }
      
      .data-table tr:hover {
        background: #F8F8F8;
      }
    </style>
    <div class="template4-container">
      <div class="template4-row">
        <div class="template4-col template4-col-full">
          <div class="template4-card">
            <div class="question-content-area">
              <strong>Questão 5:</strong> Analise a tabela de notas e responda qual aluno teve a melhor média.
            </div>
          </div>
        </div>
      </div>
      
      <div class="template4-row">
        <div class="template4-col template4-col-half">
          <div class="template4-card">
            <h4 style="font-size: 16px; font-weight: 600; color: #5D596C; margin: 0 0 16px 0;">
              Notas do 1º Bimestre
            </h4>
            <table class="data-table">
              <thead>
                <tr>
                  <th>Aluno</th>
                  <th>Matemática</th>
                  <th>Português</th>
                  <th>Média</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Ana Silva</td>
                  <td>8.5</td>
                  <td>9.0</td>
                  <td style="font-weight: 600; color: #28C76F;">8.75</td>
                </tr>
                <tr>
                  <td>Bruno Costa</td>
                  <td>7.0</td>
                  <td>8.5</td>
                  <td style="font-weight: 600;">7.75</td>
                </tr>
                <tr>
                  <td>Carlos Souza</td>
                  <td>9.5</td>
                  <td>9.5</td>
                  <td style="font-weight: 600; color: #6E63E8;">9.5</td>
                </tr>
                <tr>
                  <td>Diana Lima</td>
                  <td>8.0</td>
                  <td>7.5</td>
                  <td style="font-weight: 600;">7.75</td>
                </tr>
              </tbody>
            </table>
            <p style="font-size: 13px; color: #6E6B7B; margin: 0;">
              Média calculada: (Matemática + Português) / 2
            </p>
          </div>
        </div>
        
        <div class="template4-col template4-col-half">
          <div class="alternatives-grid-split">
            <div class="alternative-card">
              <span class="alternative-label">A</span>
              <span class="alternative-text">Ana Silva teve a maior média com 8.75</span>
            </div>
            <div class="alternative-card">
              <span class="alternative-label">B</span>
              <span class="alternative-text">Carlos Souza obteve a melhor média geral</span>
            </div>
            <div class="alternative-card">
              <span class="alternative-label">C</span>
              <span class="alternative-text">Bruno e Diana empataram com médias iguais</span>
            </div>
            <div class="alternative-card">
              <span class="alternative-label">D</span>
              <span class="alternative-text">Todos os alunos tiveram média abaixo de 8.0</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
};

// Story: ComTextoLongo
export const ComTextoLongo = {
  render: () => `
    ${template4Styles}
    <div class="template4-container">
      <div class="template4-row">
        <div class="template4-col template4-col-full">
          <div class="template4-card">
            <div class="question-content-area">
              <strong>Questão 6:</strong> Leia o texto e identifique o tema principal.
            </div>
          </div>
        </div>
      </div>
      
      <div class="template4-row">
        <div class="template4-col template4-col-half">
          <div class="template4-card" style="max-height: 500px; overflow-y: auto;">
            <h4 style="font-size: 16px; font-weight: 600; color: #5D596C; margin: 0 0 12px 0;">
              A Importância da Água
            </h4>
            <div style="font-size: 14px; line-height: 1.8; color: #6E6B7B;">
              <p style="margin-bottom: 12px;">
                A água é um recurso natural essencial para a vida no planeta Terra. Cobre aproximadamente 
                71% da superfície terrestre, sendo encontrada em oceanos, rios, lagos, geleiras e lençóis 
                freáticos. Apesar de abundante, apenas 2,5% é água doce, e menos de 1% está disponível 
                para consumo humano.
              </p>
              <p style="margin-bottom: 12px;">
                O ciclo hidrológico, também conhecido como ciclo da água, é o processo contínuo de 
                circulação da água na Terra. Através da evaporação, condensação, precipitação e infiltração, 
                a água se move entre oceanos, atmosfera e continentes, mantendo o equilíbrio dos ecossistemas.
              </p>
              <p style="margin-bottom: 12px;">
                A poluição e o desperdício ameaçam a disponibilidade de água potável. Atividades industriais, 
                agrícolas e domésticas lançam poluentes nos corpos d'água, comprometendo sua qualidade. 
                O aquecimento global também afeta o ciclo da água, alterando padrões de chuva e provocando 
                secas e enchentes mais frequentes.
              </p>
              <p style="margin-bottom: 0;">
                A preservação dos recursos hídricos é fundamental para garantir a sobrevivência das futuras 
                gerações. Medidas como tratamento de efluentes, uso racional da água, proteção de nascentes 
                e educação ambiental são essenciais para a gestão sustentável desse recurso vital.
              </p>
            </div>
          </div>
        </div>
        
        <div class="template4-col template4-col-half">
          <div class="alternatives-grid-split">
            <div class="alternative-card">
              <span class="alternative-label">A</span>
              <span class="alternative-text">O texto fala sobre animais marinhos e sua alimentação</span>
            </div>
            <div class="alternative-card">
              <span class="alternative-label">B</span>
              <span class="alternative-text">A importância e preservação da água é o tema central</span>
            </div>
            <div class="alternative-card">
              <span class="alternative-label">C</span>
              <span class="alternative-text">O texto descreve diferentes tipos de plantas aquáticas</span>
            </div>
            <div class="alternative-card">
              <span class="alternative-label">D</span>
              <span class="alternative-text">O assunto principal é o clima tropical brasileiro</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
};

// Story: DuasAlternativas
export const DuasAlternativas = {
  render: () => `
    ${template4Styles}
    <style>
      .alternatives-grid-two-large {
        display: grid;
        grid-template-columns: 1fr;
        gap: 20px;
        height: 100%;
      }
      
      .alternative-card-large {
        min-height: 180px;
        padding: 24px;
      }
    </style>
    <div class="template4-container">
      <div class="template4-row">
        <div class="template4-col template4-col-full">
          <div class="template4-card">
            <div class="question-content-area">
              <strong>Questão 7:</strong> Qual afirmação está correta sobre o Sol?
            </div>
          </div>
        </div>
      </div>
      
      <div class="template4-row">
        <div class="template4-col template4-col-half">
          <div class="template4-card">
            <h4 style="font-size: 16px; font-weight: 600; color: #5D596C; margin: 0 0 16px 0;">
              <i class="bi bi-brightness-high-fill" style="color: #FF9800; margin-right: 8px;"></i>
              O Sol
            </h4>
            <svg width="100%" height="200" viewBox="0 0 300 200">
              <circle cx="150" cy="100" r="60" fill="#FFC107" opacity="0.3"/>
              <circle cx="150" cy="100" r="45" fill="#FFC107"/>
              <line x1="150" y1="30" x2="150" y2="10" stroke="#FFC107" stroke-width="3"/>
              <line x1="150" y1="170" x2="150" y2="190" stroke="#FFC107" stroke-width="3"/>
              <line x1="80" y1="100" x2="60" y2="100" stroke="#FFC107" stroke-width="3"/>
              <line x1="220" y1="100" x2="240" y2="100" stroke="#FFC107" stroke-width="3"/>
              <line x1="100" y1="50" x2="85" y2="35" stroke="#FFC107" stroke-width="3"/>
              <line x1="200" y1="50" x2="215" y2="35" stroke="#FFC107" stroke-width="3"/>
              <line x1="100" y1="150" x2="85" y2="165" stroke="#FFC107" stroke-width="3"/>
              <line x1="200" y1="150" x2="215" y2="165" stroke="#FFC107" stroke-width="3"/>
            </svg>
            <p style="font-size: 14px; line-height: 1.6; color: #6E6B7B; margin: 16px 0 0 0;">
              O Sol é a estrela central do Sistema Solar e fonte de energia para a Terra.
            </p>
          </div>
        </div>
        
        <div class="template4-col template4-col-half">
          <div class="alternatives-grid-two-large">
            <div class="alternative-card alternative-card-large">
              <span class="alternative-label">V</span>
              <div class="alternative-text">
                <strong>Verdadeiro</strong><br><br>
                O Sol é uma estrela de tamanho médio que gera energia através de reações de fusão nuclear 
                em seu núcleo, convertendo hidrogênio em hélio e liberando luz e calor que sustentam a vida 
                na Terra.
              </div>
            </div>
            <div class="alternative-card alternative-card-large">
              <span class="alternative-label">F</span>
              <div class="alternative-text">
                <strong>Falso</strong><br><br>
                O Sol é um planeta rochoso que orbita a Terra, refletindo a luz da Lua. Ele está mais 
                próximo da Terra do que qualquer outro corpo celeste e não produz luz própria.
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
    ${template4Styles}
    <style>
      .responsive-demo {
        background: #F3F2F7;
        padding: 12px;
        border-radius: 6px;
        margin-bottom: 16px;
        text-align: center;
        font-size: 13px;
        font-weight: 600;
        color: #6E6B7B;
      }
      
      .layout-info {
        background: #E8F5E9;
        border-left: 4px solid #28C76F;
        padding: 16px;
        border-radius: 6px;
        margin-bottom: 16px;
      }
      
      .layout-info h4 {
        font-size: 14px;
        font-weight: 600;
        color: #2E7D32;
        margin: 0 0 8px 0;
      }
      
      .layout-info ul {
        margin: 0;
        padding-left: 20px;
      }
      
      .layout-info li {
        font-size: 13px;
        color: #558B2F;
        margin-bottom: 4px;
      }
    </style>
    <div class="template4-container">
      <div class="responsive-demo">
        <i class="bi bi-phone" style="margin-right: 8px;"></i>
        Template4: Split 50/50 desktop (≥992px) → Empilhado mobile (<992px)
      </div>
      
      <div class="layout-info">
        <h4><i class="bi bi-check-circle-fill" style="margin-right: 6px;"></i>Comportamento Responsivo</h4>
        <ul>
          <li>💻 Desktop (≥992px): 2 colunas lado a lado (50% + 50%)</li>
          <li>📱 Tablet/Mobile (<992px): Empilha verticalmente (100% + 100%)</li>
          <li>📐 Alternatives grid: 2×2 desktop → 1 col mobile</li>
          <li>↕️ Content área: Pode ter scroll se necessário</li>
        </ul>
      </div>
      
      <div class="template4-row">
        <div class="template4-col template4-col-full">
          <div class="template4-card">
            <div class="question-content-area">
              <strong>Questão Responsiva:</strong> Este template adapta o layout de split horizontal para vertical em telas menores.
            </div>
          </div>
        </div>
      </div>
      
      <div class="template4-row">
        <div class="template4-col template4-col-half">
          <div class="template4-card">
            <h4 style="font-size: 16px; font-weight: 600; color: #5D596C; margin: 0 0 12px 0;">
              Área de Conteúdo (Esquerda)
            </h4>
            <p style="font-size: 14px; line-height: 1.7; color: #6E6B7B; margin-bottom: 12px;">
              Esta área ocupa 50% da largura em desktop, permitindo que o usuário visualize o material 
              de referência enquanto lê as alternativas à direita.
            </p>
            <p style="font-size: 14px; line-height: 1.7; color: #6E6B7B; margin: 0;">
              Em mobile, esta área aparece primeiro (acima), ocupando 100% da largura, seguida pelas 
              alternativas abaixo. Ideal para questões que requerem consulta constante ao material.
            </p>
          </div>
        </div>
        
        <div class="template4-col template4-col-half">
          <div class="alternatives-grid-split">
            <div class="alternative-card">
              <span class="alternative-label">A</span>
              <span class="alternative-text">Grid 2×2 em desktop para visualização rápida das opções</span>
            </div>
            <div class="alternative-card">
              <span class="alternative-label">B</span>
              <span class="alternative-text">Em mobile, alterna para 1 coluna vertical empilhada</span>
            </div>
            <div class="alternative-card">
              <span class="alternative-label">C</span>
              <span class="alternative-text">Layout split ideal para comparação lado a lado</span>
            </div>
            <div class="alternative-card">
              <span class="alternative-label">D</span>
              <span class="alternative-text">Redimensione para ver o comportamento responsivo</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
};


