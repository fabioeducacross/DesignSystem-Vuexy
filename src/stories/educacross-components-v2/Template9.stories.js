/**
 * Template9 - Triple Content + Wide Alternatives Layout Component
 * =========================================
 * 
 * Layout template with 3 content cards + grid 2-column alternatives (md-6).
 * Similar to Template7 but with wider alternatives (2 cols instead of 4).
 * 
 * @component Template9
 * @source educacross-frontoffice\src\components\evaluations\questionDetail\templates\Template9.vue
 */

export default {
  title: 'Educacross Components V2/Templates/Template9',
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# Template9

Template com **3 cards sequenciais + alternativas grid 2 colunas** (50% cada).

## Quando usar

- **Triple context + alternativas médias**: 3 blocos de contexto + alternativas que precisam mais espaço
- **Textos mais longos nas alternativas**: 2 colunas permitem parágrafos maiores que 4 colunas
- **Comparação binária**: 3 cards progressivos + apenas 2 alternativas grandes lado a lado
- **Storytelling + escolha**: Narrativa em 3 atos + decisão entre 2 ou 4 opções médias
- **Hybrid Templates 2+7**: Une 3 cards contextuais com alternativas largas

## Diferença dos outros Templates

| Template | Content Cards | Alternatives Layout | Alternative Width | Quando usar |
|----------|--------------|---------------------|-------------------|-------------|
| **Template1/5** | 2 cards | Grid 4 cols | 25% (lg-3) | Alternativas curtas |
| **Template2** | 2 cards | Grid 2 cols | 50% (md-6) | Alternativas médias |
| **Template7** | 3 cards | Grid 4 cols → 2 → 1 | 25%→50%→100% | Triple + curtas |
| **Template9** | **3 cards** | **Grid 2 cols** | **50% (md-6)** | **Triple + médias** |

**Vantagem do Template9**: Combina contexto progressivo de 3 cards com alternativas mais espaçosas (2 cols).

## Estrutura

```
+--------------------------------+
| Card 1: Contexto/Introdução    |  ← Full-width
+--------------------------------+
| Card 2: Desenvolvimento        |  ← Full-width
+--------------------------------+
| Card 3: Pergunta               |  ← Full-width
+--------------------------------+
| Alternative A  | Alternative B |  ← Grid 2 cols (50% each)
+--------------------------------+
| Alternative C  | Alternative D |  ← md-6 → cols-12 mobile
+--------------------------------+
```

## Variantes

1. **Default**: 3 cards + 4 alternativas grid 2×2
2. **ComTextosMedios**: 3 cards + 4 alternativas com parágrafos médios
3. **ComImagens**: 3 cards + 2 alternativas grandes com imagens
4. **ComComparacao**: 3 cards + 2 alternativas comparativas lado a lado
5. **ComListas**: 3 cards + 4 alternativas com bullet points
6. **ComCitacoes**: 3 cards + 2 alternativas com citações longas
7. **ComTabelas**: 3 cards + 4 alternativas com mini-tabelas
8. **Responsive**: Demo 2 cols → 1 col mobile

## Características visuais

- 3 content cards sequenciais full-width
- Alternatives: Grid md-6 (2 cols 50%) → cols-12 (1 col 100%)
- Alternative min-height: 140px (mais que Template7)
- Padding uniforme 20px nos cards, 20px nas alternatives
- Gap 24px entre cards, 20px entre alternatives
- Responsive: 2→1 colunas
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
 * - Badge colors: #E3F2FD (azul), #E8F5E9 (verde), #FFF8E1 (amarelo)
 * 
 * Dimensões:
 * - Container: max-width 1200px
 * - Content cards: 3× full-width (cols-12), padding 20px
 * - Alternative grid: md-6 (2 cols 50%) → cols-12 (1 col 100%)
 * - Alternative min-height: 140px (vs 120px Template7)
 * - Gap between cards: 24px
 * - Gap between alternatives: 20px (vs 16px Template7)
 * 
 * Tipografia:
 * - Content font-size: 15px
 * - Alternative font-size: 15px
 * - Line-height: 1.7 (alternatives 1.6 for readability)
 * - Card header: 13px uppercase bold
 * 
 * Layout:
 * - 3 cards empilhados verticalmente
 * - Alternatives grid: Desktop 2 cols (md-6 = 50%), Mobile 1 col (cols-12 = 100%)
 * - Breakpoint: 768px (md)
 */

// Estilos base do template
const template9Styles = `
<style>
  .template9-container {
    background: #F8F7FA;
    min-height: 100vh;
    padding: 24px;
    max-width: 1200px;
    margin: 0 auto;
  }
  
  .template9-row {
    display: flex;
    flex-wrap: wrap;
    margin: -12px;
  }
  
  .template9-col {
    padding: 12px;
    width: 100%;
  }
  
  @media (min-width: 768px) {
    .template9-col-half {
      width: 50%;
    }
  }
  
  .template9-card {
    background: #FFFFFF;
    border: 1px solid #DBDADE;
    border-radius: 8px;
    padding: 20px;
    margin-bottom: 24px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.06);
    transition: all 0.2s;
  }
  
  .template9-card:hover {
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  }
  
  .card-badge {
    display: inline-block;
    padding: 6px 12px;
    border-radius: 20px;
    font-size: 11px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    margin-bottom: 12px;
  }
  
  .card-badge-blue {
    background: #E3F2FD;
    color: #1565C0;
  }
  
  .card-badge-green {
    background: #E8F5E9;
    color: #2E7D32;
  }
  
  .card-badge-yellow {
    background: #FFF8E1;
    color: #F57F17;
  }
  
  .question-content-area {
    font-size: 15px;
    line-height: 1.7;
    color: #5D596C;
  }
  
  .alternatives-grid-nine {
    display: grid;
    grid-template-columns: 1fr;
    gap: 20px;
    margin-top: 24px;
  }
  
  @media (min-width: 768px) {
    .alternatives-grid-nine {
      grid-template-columns: repeat(2, 1fr);
    }
  }
  
  .alternative-wide {
    background: #FFFFFF;
    border: 2px solid #DBDADE;
    border-radius: 8px;
    padding: 20px;
    min-height: 140px;
    cursor: pointer;
    transition: all 0.2s;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  
  .alternative-wide:hover {
    border-color: #6E63E8;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(110,99,232,0.15);
  }
  
  .alternative-label {
    font-size: 13px;
    font-weight: 600;
    color: #6E6B7B;
    margin-bottom: 10px;
    text-transform: uppercase;
    letter-spacing: 0.3px;
  }
  
  .alternative-text {
    font-size: 15px;
    line-height: 1.6;
    color: #5D596C;
  }
  
  @media (max-width: 767px) {
    .template9-container {
      padding: 16px;
    }
    
    .template9-card {
      padding: 16px;
      margin-bottom: 16px;
    }
    
    .alternative-wide {
      min-height: 120px;
      padding: 16px;
    }
    
    .alternatives-grid-nine {
      gap: 16px;
    }
  }
</style>
`;

// Story: Default
export const Default = {
  render: () => `
    ${template9Styles}
    <div class="template9-container">
      <div class="template9-row">
        <div class="template9-col">
          <div class="template9-card">
            <span class="card-badge card-badge-blue">Card 1: Introdução</span>
            <div class="question-content-area">
              Template9 combina 3 cards sequenciais com alternativas em grid de 2 colunas (50% cada).
              Ideal quando as alternativas precisam mais espaço que o Template7 (4 colunas).
            </div>
          </div>
          
          <div class="template9-card">
            <span class="card-badge card-badge-green">Card 2: Desenvolvimento</span>
            <div class="question-content-area">
              O segundo card desenvolve o conceito, apresentando detalhes, exemplos ou
              informações complementares. As alternativas mais largas permitem textos médios.
            </div>
          </div>
          
          <div class="template9-card">
            <span class="card-badge card-badge-yellow">Card 3: Pergunta</span>
            <div class="question-content-area">
              <strong>Com base nas informações acima, selecione a alternativa correta:</strong>
            </div>
          </div>
          
          <div class="alternatives-grid-nine">
            <div class="alternative-wide">
              <div class="alternative-label">Alternativa A</div>
              <div class="alternative-text">
                Template9 usa 2 colunas (50% cada) para alternativas, permitindo textos mais longos
                que o Template7 (4 colunas × 25%).
              </div>
            </div>
            <div class="alternative-wide">
              <div class="alternative-label">Alternativa B</div>
              <div class="alternative-text">
                As 3 cards de conteúdo criam fluxo progressivo: introdução → desenvolvimento → pergunta,
                melhorando compreensão gradual.
              </div>
            </div>
            <div class="alternative-wide">
              <div class="alternative-label">Alternativa C</div>
              <div class="alternative-text">
                Em dispositivos móveis (<768px), as alternativas empilham verticalmente ocupando
                100% da largura (cols-12).
              </div>
            </div>
            <div class="alternative-wide">
              <div class="alternative-label">Alternativa D</div>
              <div class="alternative-text">
                Template9 é ideal para questões que requerem contexto progressivo (3 etapas) e
                alternativas com texto médio (2 cols).
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
};

// Story: ComTextosMedios
export const ComTextosMedios = {
  render: () => `
    ${template9Styles}
    <div class="template9-container">
      <div class="template9-row">
        <div class="template9-col">
          <div class="template9-card">
            <span class="card-badge card-badge-blue">Conceito</span>
            <div class="question-content-area">
              <strong>Aquecimento Global:</strong> Aumento da temperatura média da Terra causado
              pelo excesso de gases de efeito estufa na atmosfera, principalmente CO₂.
            </div>
          </div>
          
          <div class="template9-card">
            <span class="card-badge card-badge-green">Causas</span>
            <div class="question-content-area">
              Principais fontes: queima de combustíveis fósseis (petróleo, carvão, gás natural),
              desmatamento, atividades industriais e agropecuária intensiva.
            </div>
          </div>
          
          <div class="template9-card">
            <span class="card-badge card-badge-yellow">Pergunta</span>
            <div class="question-content-area">
              <strong>Qual das alternativas apresenta uma CONSEQUÊNCIA do aquecimento global?</strong>
            </div>
          </div>
          
          <div class="alternatives-grid-nine">
            <div class="alternative-wide">
              <div class="alternative-label">Alternativa A</div>
              <div class="alternative-text">
                <strong>Derretimento de geleiras:</strong> O aumento da temperatura causa degelo
                das calotas polares e geleiras de montanha, elevando o nível dos oceanos e
                ameaçando cidades costeiras e ilhas.
              </div>
            </div>
            <div class="alternative-wide">
              <div class="alternative-label">Alternativa B</div>
              <div class="alternative-text">
                <strong>Redução da camada de ozônio:</strong> Fenômeno causado por CFCs
                (clorofluorcarbonos), não relacionado diretamente ao aquecimento global,
                mas sim à radiação ultravioleta.
              </div>
            </div>
            <div class="alternative-wide">
              <div class="alternative-label">Alternativa C</div>
              <div class="alternative-text">
                <strong>Aumento da biodiversidade:</strong> Na verdade, o aquecimento global
                causa perda de biodiversidade, não aumento, pois muitas espécies não conseguem
                se adaptar rapidamente às mudanças climáticas.
              </div>
            </div>
            <div class="alternative-wide">
              <div class="alternative-label">Alternativa D</div>
              <div class="alternative-text">
                <strong>Resfriamento dos oceanos:</strong> Os oceanos estão aquecendo, não
                resfriando. O aquecimento das águas afeta correntes marinhas e ecossistemas
                aquáticos, causando branqueamento de corais.
              </div>
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
    ${template9Styles}
    <div class="template9-container">
      <div class="template9-row">
        <div class="template9-col">
          <div class="template9-card">
            <span class="card-badge card-badge-blue">Contexto Histórico</span>
            <div class="question-content-area">
              A Revolução Industrial (século XVIII) transformou a produção manual em mecanizada,
              iniciando na Inglaterra com máquinas a vapor e tecelagem automatizada.
            </div>
          </div>
          
          <div class="template9-card">
            <span class="card-badge card-badge-green">Impactos Sociais</span>
            <div class="question-content-area">
              Migração campo-cidade, surgimento do proletariado urbano, jornadas de trabalho
              excessivas (14-16h), trabalho infantil e péssimas condições nas fábricas.
            </div>
          </div>
          
          <div class="template9-card">
            <span class="card-badge card-badge-yellow">Comparação</span>
            <div class="question-content-area">
              <strong>Qual imagem representa ANTES da Revolução Industrial?</strong>
            </div>
          </div>
          
          <div class="alternatives-grid-nine">
            <div class="alternative-wide" style="min-height: 300px;">
              <div class="alternative-label">Alternativa A - Produção Manual</div>
              <svg viewBox="0 0 200 150" style="width: 100%; height: auto; margin: 12px 0;">
                <rect x="10" y="10" width="180" height="130" fill="#FFF8E1" stroke="#DBDADE" stroke-width="2"/>
                <!-- Casa artesão -->
                <rect x="30" y="60" width="60" height="50" fill="#D7CCC8"/>
                <path d="M 25,60 L 60,35 L 95,60 Z" fill="#8D6E63"/>
                <!-- Artesão trabalhando -->
                <circle cx="60" cy="90" r="8" fill="#5D596C"/>
                <line x1="60" y1="98" x2="60" y2="110" stroke="#5D596C" stroke-width="3"/>
                <line x1="60" y1="103" x2="70" y2="108" stroke="#5D596C" stroke-width="3"/>
                <!-- Mesa trabalho -->
                <rect x="70" y="105" width="40" height="5" fill="#8D6E63"/>
                <text x="100" y="140" font-size="10" fill="#5D596C">Oficina familiar artesanal</text>
              </svg>
              <div class="alternative-text" style="font-size: 14px;">
                Produção artesanal em pequenas oficinas familiares, trabalho manual sem máquinas.
              </div>
            </div>
            <div class="alternative-wide" style="min-height: 300px;">
              <div class="alternative-label">Alternativa B - Produção Industrial</div>
              <svg viewBox="0 0 200 150" style="width: 100%; height: auto; margin: 12px 0;">
                <rect x="10" y="10" width="180" height="130" fill="#E3F2FD" stroke="#DBDADE" stroke-width="2"/>
                <!-- Fábrica -->
                <rect x="20" y="50" width="80" height="60" fill="#90A4AE"/>
                <rect x="110" y="40" width="60" height="70" fill="#78909C"/>
                <!-- Chaminés fumegantes -->
                <rect x="40" y="30" width="8" height="20" fill="#5D596C"/>
                <rect x="70" y="25" width="8" height="25" fill="#5D596C"/>
                <rect x="130" y="20" width="8" height="20" fill="#5D596C"/>
                <!-- Fumaça -->
                <circle cx="44" cy="22" r="6" fill="#B0BEC5" opacity="0.7"/>
                <circle cx="74" cy="17" r="7" fill="#B0BEC5" opacity="0.7"/>
                <circle cx="134" cy="12" r="6" fill="#B0BEC5" opacity="0.7"/>
                <!-- Janelas -->
                <rect x="30" y="60" width="10" height="10" fill="#FDD835"/>
                <rect x="45" y="60" width="10" height="10" fill="#FDD835"/>
                <rect x="30" y="75" width="10" height="10" fill="#FDD835"/>
                <text x="100" y="140" font-size="10" fill="#5D596C" text-anchor="middle">Fábrica mecanizada</text>
              </svg>
              <div class="alternative-text" style="font-size: 14px;">
                Grande fábrica com chaminés, produção em massa, máquinas a vapor, muitos operários.
              </div>
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
    ${template9Styles}
    <div class="template9-container">
      <div class="template9-row">
        <div class="template9-col">
          <div class="template9-card">
            <span class="card-badge card-badge-blue">Definição</span>
            <div class="question-content-area">
              <strong>Energia Renovável vs Não Renovável:</strong> Fontes renováveis se regeneram
              naturalmente (sol, vento, água). Não renováveis esgotam com o tempo (petróleo, carvão).
            </div>
          </div>
          
          <div class="template9-card">
            <span class="card-badge card-badge-green">Contexto Ambiental</span>
            <div class="question-content-area">
              A transição para energias renováveis é essencial para combater mudanças climáticas
              e reduzir dependência de combustíveis fósseis.
            </div>
          </div>
          
          <div class="template9-card">
            <span class="card-badge card-badge-yellow">Comparação</span>
            <div class="question-content-area">
              <strong>Qual alternativa apresenta APENAS vantagens de energias renováveis?</strong>
            </div>
          </div>
          
          <div class="alternatives-grid-nine">
            <div class="alternative-wide">
              <div class="alternative-label">Alternativa A</div>
              <div class="alternative-text">
                <strong>✅ Vantagens Reais:</strong><br>
                • Não emitem CO₂ na geração<br>
                • Fontes inesgotáveis (sol, vento)<br>
                • Reduzem dependência externa<br>
                • Criam empregos verdes
              </div>
            </div>
            <div class="alternative-wide">
              <div class="alternative-label">Alternativa B</div>
              <div class="alternative-text">
                <strong>❌ Incluem Desvantagens:</strong><br>
                • Renováveis são sempre mais baratas ❌<br>
                • Funcionam 24h sem interrupção ❌<br>
                • Não precisam de área grande ❌<br>
                • Instalação tem custo zero ❌
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
};

// Story: ComListas
export const ComListas = {
  render: () => `
    ${template9Styles}
    <div class="template9-container">
      <div class="template9-row">
        <div class="template9-col">
          <div class="template9-card">
            <span class="card-badge card-badge-blue">Introdução</span>
            <div class="question-content-area">
              <strong>Sistemas do Corpo Humano:</strong> Conjunto de órgãos que trabalham juntos
              para realizar funções específicas essenciais à vida.
            </div>
          </div>
          
          <div class="template9-card">
            <span class="card-badge card-badge-green">Exemplos</span>
            <div class="question-content-area">
              Sistema Circulatório (coração, vasos), Respiratório (pulmões, traqueia),
              Digestório (estômago, intestinos), Nervoso (cérebro, medula), Muscular (músculos).
            </div>
          </div>
          
          <div class="template9-card">
            <span class="card-badge card-badge-yellow">Questão</span>
            <div class="question-content-area">
              <strong>Qual lista apresenta APENAS órgãos do Sistema Respiratório?</strong>
            </div>
          </div>
          
          <div class="alternatives-grid-nine">
            <div class="alternative-wide">
              <div class="alternative-label">Alternativa A</div>
              <div class="alternative-text">
                <strong>✅ Sistema Respiratório:</strong><br>
                1. Fossas nasais<br>
                2. Faringe<br>
                3. Laringe<br>
                4. Traqueia<br>
                5. Brônquios<br>
                6. Pulmões<br>
                7. Alvéolos pulmonares
              </div>
            </div>
            <div class="alternative-wide">
              <div class="alternative-label">Alternativa B</div>
              <div class="alternative-text">
                <strong>❌ Mistura sistemas:</strong><br>
                1. Pulmões (Respiratório) ✅<br>
                2. Coração (Circulatório) ❌<br>
                3. Traqueia (Respiratório) ✅<br>
                4. Estômago (Digestório) ❌<br>
                5. Brônquios (Respiratório) ✅<br>
                6. Fígado (Digestório) ❌
              </div>
            </div>
            <div class="alternative-wide">
              <div class="alternative-label">Alternativa C</div>
              <div class="alternative-text">
                <strong>❌ Sistema Circulatório:</strong><br>
                1. Coração<br>
                2. Artérias<br>
                3. Veias<br>
                4. Capilares<br>
                5. Sangue<br>
                6. Linfa<br>
                (Sistema errado, apesar de correto internamente)
              </div>
            </div>
            <div class="alternative-wide">
              <div class="alternative-label">Alternativa D</div>
              <div class="alternative-text">
                <strong>❌ Lista incompleta:</strong><br>
                1. Pulmões ✅<br>
                2. Traqueia ✅<br>
                3. Brônquios ✅<br>
                <br>
                (Faltam: fossas nasais, faringe, laringe, alvéolos - lista muito curta)
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
};

// Story: ComCitacoes
export const ComCitacoes = {
  render: () => `
    ${template9Styles}
    <div class="template9-container">
      <div class="template9-row">
        <div class="template9-col">
          <div class="template9-card">
            <span class="card-badge card-badge-blue">Contexto Literário</span>
            <div class="question-content-area">
              <strong>Machado de Assis</strong> é considerado o maior escritor brasileiro,
              mestre do Realismo. Suas obras analisam a psicologia humana com ironia e profundidade.
            </div>
          </div>
          
          <div class="template9-card">
            <span class="card-badge card-badge-green">Obras Principais</span>
            <div class="question-content-area">
              Memórias Póstumas de Brás Cubas (1881), Quincas Borba (1891), Dom Casmurro (1899),
              Esaú e Jacó (1904), Memorial de Aires (1908).
            </div>
          </div>
          
          <div class="template9-card">
            <span class="card-badge card-badge-yellow">Análise</span>
            <div class="question-content-area">
              <strong>Qual citação reflete o estilo machadiano de ironia e pessimismo?</strong>
            </div>
          </div>
          
          <div class="alternatives-grid-nine">
            <div class="alternative-wide" style="min-height: 180px;">
              <div class="alternative-label">Alternativa A - Machado de Assis</div>
              <div class="alternative-text">
                <em style="display: block; padding: 12px; background: #F3F2F7; border-left: 4px solid #6E63E8; border-radius: 4px; margin: 8px 0;">
                "Ao vencedor as batatas! Essa frase resume toda a filosofia humana.
                Na luta pela vida, quem vence leva tudo; quem perde não tem nem o consolo da compaixão."
                </em>
                <strong style="color: #28C76F;">✅ Típico:</strong> Ironia, pessimismo, análise crua da natureza humana.
              </div>
            </div>
            <div class="alternative-wide" style="min-height: 180px;">
              <div class="alternative-label">Alternativa B - Estilo Romântico</div>
              <div class="alternative-text">
                <em style="display: block; padding: 12px; background: #F3F2F7; border-left: 4px solid #FF9800; border-radius: 4px; margin: 8px 0;">
                "O amor verdadeiro supera todos os obstáculos! A natureza exuberante reflete
                a beleza da alma apaixonada que jamais se rende."
                </em>
                <strong style="color: #EA5455;">❌ Diferente:</strong> Idealismo romântico, não realismo machadiano.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
};

// Story: ComTabelas
export const ComTabelas = {
  render: () => `
    ${template9Styles}
    <div class="template9-container">
      <div class="template9-row">
        <div class="template9-col">
          <div class="template9-card">
            <span class="card-badge card-badge-blue">Dados Demográficos</span>
            <div class="question-content-area">
              <strong>População Mundial:</strong> Distribuição da população global por continentes
              e projeções de crescimento para 2030.
            </div>
          </div>
          
          <div class="template9-card">
            <span class="card-badge card-badge-green">Contexto</span>
            <div class="question-content-area">
              A população mundial atingiu 8 bilhões em 2022 e continua crescendo, principalmente
              na Ásia e África, enquanto Europa e América apresentam crescimento lento.
            </div>
          </div>
          
          <div class="template9-card">
            <span class="card-badge card-badge-yellow">Análise</span>
            <div class="question-content-area">
              <strong>Com base nas tabelas, qual alternativa está CORRETA?</strong>
            </div>
          </div>
          
          <div class="alternatives-grid-nine">
            <div class="alternative-wide">
              <div class="alternative-label">Alternativa A</div>
              <div class="alternative-text">
                <table style="width: 100%; font-size: 12px; border-collapse: collapse;">
                  <thead>
                    <tr style="background: #E8F5E9;">
                      <th style="padding: 6px; border: 1px solid #DBDADE; text-align: left;">Continente</th>
                      <th style="padding: 6px; border: 1px solid #DBDADE; text-align: center;">2026</th>
                      <th style="padding: 6px; border: 1px solid #DBDADE; text-align: center;">2030</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td style="padding: 6px; border: 1px solid #DBDADE;">Ásia</td>
                      <td style="padding: 6px; border: 1px solid #DBDADE; text-align: center;">4.7 bi</td>
                      <td style="padding: 6px; border: 1px solid #DBDADE; text-align: center;">4.9 bi</td>
                    </tr>
                    <tr>
                      <td style="padding: 6px; border: 1px solid #DBDADE;">África</td>
                      <td style="padding: 6px; border: 1px solid #DBDADE; text-align: center;">1.4 bi</td>
                      <td style="padding: 6px; border: 1px solid #DBDADE; text-align: center;">1.7 bi</td>
                    </tr>
                  </tbody>
                </table>
                <strong style="margin-top: 8px; display: block; color: #28C76F;">✅ Ásia e África têm maior crescimento</strong>
              </div>
            </div>
            <div class="alternative-wide">
              <div class="alternative-label">Alternativa B</div>
              <div class="alternative-text">
                <table style="width: 100%; font-size: 12px; border-collapse: collapse;">
                  <thead>
                    <tr style="background: #FFEBEE;">
                      <th style="padding: 6px; border: 1px solid #DBDADE; text-align: left;">Continente</th>
                      <th style="padding: 6px; border: 1px solid #DBDADE; text-align: center;">2026</th>
                      <th style="padding: 6px; border: 1px solid #DBDADE; text-align: center;">2030</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td style="padding: 6px; border: 1px solid #DBDADE;">Europa</td>
                      <td style="padding: 6px; border: 1px solid #DBDADE; text-align: center;">750 mi</td>
                      <td style="padding: 6px; border: 1px solid #DBDADE; text-align: center;">900 mi</td>
                    </tr>
                    <tr>
                      <td style="padding: 6px; border: 1px solid #DBDADE;">Oceania</td>
                      <td style="padding: 6px; border: 1px solid #DBDADE; text-align: center;">45 mi</td>
                      <td style="padding: 6px; border: 1px solid #DBDADE; text-align: center;">80 mi</td>
                    </tr>
                  </tbody>
                </table>
                <strong style="margin-top: 8px; display: block; color: #EA5455;">❌ Crescimento exagerado irreal</strong>
              </div>
            </div>
            <div class="alternative-wide">
              <div class="alternative-label">Alternativa C</div>
              <div class="alternative-text">
                <table style="width: 100%; font-size: 12px; border-collapse: collapse;">
                  <thead>
                    <tr style="background: #FFF8E1;">
                      <th style="padding: 6px; border: 1px solid #DBDADE; text-align: left;">Região</th>
                      <th style="padding: 6px; border: 1px solid #DBDADE; text-align: center;">Taxa Natalidade</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td style="padding: 6px; border: 1px solid #DBDADE;">África Subsaariana</td>
                      <td style="padding: 6px; border: 1px solid #DBDADE; text-align: center;">35‰</td>
                    </tr>
                    <tr>
                      <td style="padding: 6px; border: 1px solid #DBDADE;">Europa Ocidental</td>
                      <td style="padding: 6px; border: 1px solid #DBDADE; text-align: center;">10‰</td>
                    </tr>
                  </tbody>
                </table>
                <strong style="margin-top: 8px; display: block; color: #6E63E8;">⚠️ Contexto diferente (natalidade, não população)</strong>
              </div>
            </div>
            <div class="alternative-wide">
              <div class="alternative-label">Alternativa D</div>
              <div class="alternative-text">
                <strong>Sem tabela:</strong> "A população da Antártida crescerá 50% até 2030,
                ultrapassando 10 milhões de habitantes com novas cidades sustentáveis."
                <br><br>
                <strong style="color: #EA5455;">❌ Afirmação absurda sem dados (Antártida não tem população permanente)</strong>
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
    ${template9Styles}
    <style>
      .responsive-info-nine {
        background: #E8F5E9;
        border-left: 4px solid #28C76F;
        padding: 16px;
        border-radius: 6px;
        margin: 24px 0;
      }
      
      .responsive-info-nine h4 {
        font-size: 14px;
        font-weight: 600;
        color: #2E7D32;
        margin: 0 0 8px 0;
        display: flex;
        align-items: center;
        gap: 8px;
      }
      
      .responsive-info-nine ul {
        margin: 0;
        padding-left: 20px;
      }
      
      .responsive-info-nine li {
        font-size: 13px;
        color: #558B2F;
        margin-bottom: 4px;
      }
    </style>
    <div class="template9-container">
      <div class="responsive-info-nine">
        <h4>
          <i class="bi bi-grid-3x2"></i>
          Template9: Comportamento Responsivo
        </h4>
        <ul>
          <li>✅ Desktop/Tablet (≥768px): 2 colunas (md-6 = 50% cada)</li>
          <li>✅ Mobile (<768px): 1 coluna (cols-12 = 100%)</li>
          <li>✅ 3 cards sequenciais sempre full-width todos os dispositivos</li>
          <li>✅ Alternatives padding: 20px desktop → 16px mobile</li>
          <li>✅ Gap entre alternatives: 20px desktop → 16px mobile</li>
        </ul>
      </div>
      
      <div class="template9-row">
        <div class="template9-col">
          <div class="template9-card">
            <span class="card-badge card-badge-blue">Layout Desktop</span>
            <div class="question-content-area">
              <i class="bi bi-laptop" style="font-size: 20px; margin-right: 8px; color: #6E63E8;"></i>
              Em telas ≥768px, as alternativas aparecem lado a lado em 2 colunas (50% cada).
              Permite ler duas alternativas simultaneamente facilitando comparação.
            </div>
          </div>
          
          <div class="template9-card">
            <span class="card-badge card-badge-green">Layout Mobile</span>
            <div class="question-content-area">
              <i class="bi bi-phone" style="font-size: 20px; margin-right: 8px; color: #28C76F;"></i>
              Em telas <768px, as alternativas empilham verticalmente ocupando 100% da largura.
              Textos médios ficam legíveis sem necessidade de scroll horizontal.
            </div>
          </div>
          
          <div class="template9-card">
            <span class="card-badge card-badge-yellow">Pergunta Demo</span>
            <div class="question-content-area">
              <strong>Em qual breakpoint as alternativas mudam de 2 colunas para 1 coluna?</strong>
            </div>
          </div>
          
          <div class="alternatives-grid-nine">
            <div class="alternative-wide">
              <div class="alternative-label">Alternativa A</div>
              <div class="alternative-text">
                <strong>✅ 768px (md breakpoint):</strong> Abaixo de 768px muda de 2 cols (md-6)
                para 1 col (cols-12). É o breakpoint tablet-mobile do Bootstrap.
              </div>
            </div>
            <div class="alternative-wide">
              <div class="alternative-label">Alternativa B</div>
              <div class="alternative-text">
                <strong>❌ 992px (lg breakpoint):</strong> Template9 usa md-6, não lg-3.
                O breakpoint 992px é usado por Template1/7 (lg-3 → md-6 → cols-12).
              </div>
            </div>
            <div class="alternative-wide">
              <div class="alternative-label">Alternativa C</div>
              <div class="alternative-text">
                <strong>❌ 576px (sm breakpoint):</strong> Template9 pula direto de md (768px)
                para cols-12. Não usa breakpoint sm intermediário.
              </div>
            </div>
            <div class="alternative-wide">
              <div class="alternative-label">Alternativa D</div>
              <div class="alternative-text">
                <strong>❌ 1200px (xl breakpoint):</strong> Template9 não usa breakpoint xl.
                Mantém 2 colunas de 768px até 4K+.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
};
