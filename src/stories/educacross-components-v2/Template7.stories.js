/**
 * Template7 - Triple Content Header Layout Component
 * =========================================
 * 
 * Layout template with 3 sequential content cards + grid alternatives (2 or 4 columns).
 * More contextual than Template1/2, ideal for step-by-step instructions.
 * 
 * @component Template7
 * @source educacross-frontoffice\src\components\evaluations\questionDetail\templates\Template7.vue
 */

export default {
  title: 'Front-office/Templates/Template7',
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# Template7

Template com **3 cards de conteúdo sequenciais** antes das alternativas, ideal para contexto progressivo.

## Quando usar

- **Instruções multi-etapa**: Apresentar informações em 3 blocos (contexto → exemplo → pergunta)
- **Progressão de conceitos**: Introdução → Desenvolvimento → Conclusão antes das alternativas
- **Triple context**: Quando precisa separar teoria, exemplo prático e enunciado
- **Narrativa estruturada**: História dividida em 3 atos + pergunta final
- **Casos complexos**: Situação problema + dados + análise + alternativas
- **Storytelling educacional**: 3 cards sequenciais criam fluxo de leitura natural

## Diferença dos outros Templates

| Template | Content Cards | Alternatives Grid | Fluxo de leitura |
|----------|--------------|-------------------|------------------|
| **Template1/5** | 2 cards | 4 cols → 2 → 1 | Básico (contexto + pergunta) |
| **Template2** | 2 cards | 2 cols → 1 | Alternativas médias |
| **Template3** | 2 cards | 1 col sempre | Alternativas longas |
| **Template4** | 2 cards split | Grid 2×2 in 50% | Split lateral |
| **Template6** | 2 cards | 1 col stack | Resposta única |
| **Template7** | **3 cards** | **2/4 cols adaptativo** | **Triple context progressivo** |

**Vantagem do Template7**: 3 cards permitem separar melhor contexto (card 1), exemplo (card 2), pergunta (card 3).

## Estrutura

\`\`\`
+--------------------------------+
| Card 1: Introdução/Contexto    |
+--------------------------------+
| Card 2: Exemplo/Desenvolvimento|
+--------------------------------+
| Card 3: Pergunta Final         |
+--------------------------------+
| [Alt A] [Alt B] [Alt C] [Alt D]|  ← Grid 4 cols (ou 2 cols)
+--------------------------------+
\`\`\`

## Variantes

1. **Default**: 3 cards sequenciais + 4 alternativas grid
2. **PassoAPasso**: Tutorial 3 etapas + 4 alternativas
3. **TresAtos**: Storytelling narrativo + 4 alternativas
4. **ContextoExemploPergunta**: Estrutura acadêmica clássica
5. **SituacaoProblema**: Caso complexo dividido em 3 partes
6. **DuasAlternativas**: 3 cards + apenas 2 alternativas largas
7. **SeisAlternativas**: 3 cards + 6 alternativas grid 3×2
8. **Responsive**: Demo de comportamento 4→2→1 cols

## Características visuais

- 3 cards sequenciais full-width
- Alternatives: Grid lg-3 (4 cols) ou md-6 (2 cols) ou cols-12 (1 col)
- Padding uniforme 20px nos cards
- Gap 24px entre cards
- Responsive: 4→2→1 colunas
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
 * - Container: max-width 1200px
 * - Content cards: 3× full-width (cols-12), padding 20px
 * - Alternative grid: lg-3 (4 cols 25%) → md-6 (2 cols 50%) → cols-12 (1 col 100%)
 * - Alternative min-height: 120px
 * - Gap between cards: 24px
 * - Gap between alternatives: 16px
 * 
 * Tipografia:
 * - Content font-size: 15px
 * - Line-height: 1.7
 * - Card title: 16px bold
 * 
 * Layout:
 * - 3 cards sequenciais empilhados verticalmente
 * - Alternatives grid abaixo com breakpoints responsivos
 * - Desktop: 4 colunas lg-3 (25% each)
 * - Tablet: 2 colunas md-6 (50% each)
 * - Mobile: 1 coluna cols-12 (100%)
 */

// Estilos base do template
const template7Styles = `
<style>
  .template7-container {
    background: #F8F7FA;
    min-height: 100vh;
    padding: 24px;
    max-width: 1200px;
    margin: 0 auto;
  }
  
  .template7-row {
    display: flex;
    flex-wrap: wrap;
    margin: -12px;
  }
  
  .template7-col {
    padding: 12px;
  }
  
  .template7-col-full {
    width: 100%;
  }
  
  .template7-col-fourth {
    width: 100%;
  }
  
  @media (min-width: 768px) {
    .template7-col-half {
      width: 50%;
    }
  }
  
  @media (min-width: 992px) {
    .template7-col-fourth {
      width: 25%;
    }
  }
  
  .template7-card {
    background: #FFFFFF;
    border: 1px solid #DBDADE;
    border-radius: 8px;
    padding: 20px;
    margin-bottom: 24px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.06);
    transition: all 0.2s;
  }
  
  .template7-card:hover {
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  }
  
  .card-header-triple {
    font-size: 13px;
    font-weight: 600;
    color: #6E63E8;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    margin-bottom: 12px;
    display: flex;
    align-items: center;
    gap: 8px;
  }
  
  .card-step-number {
    width: 28px;
    height: 28px;
    background: #6E63E8;
    color: white;
    border-radius: 50%;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    font-weight: 700;
  }
  
  .question-content-area {
    font-size: 15px;
    line-height: 1.7;
    color: #5D596C;
  }
  
  .alternatives-grid-seven {
    display: grid;
    grid-template-columns: 1fr;
    gap: 16px;
    margin-top: 24px;
  }
  
  @media (min-width: 768px) {
    .alternatives-grid-seven {
      grid-template-columns: repeat(2, 1fr);
    }
  }
  
  @media (min-width: 992px) {
    .alternatives-grid-seven {
      grid-template-columns: repeat(4, 1fr);
    }
  }
  
  .alternative-card {
    background: #FFFFFF;
    border: 2px solid #DBDADE;
    border-radius: 8px;
    padding: 16px;
    min-height: 120px;
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
  
  @media (max-width: 767px) {
    .template7-container {
      padding: 16px;
    }
    
    .template7-card {
      padding: 16px;
      margin-bottom: 16px;
    }
    
    .alternative-card {
      min-height: 100px;
      padding: 14px;
    }
  }
</style>
`;

// Story: Default
export const Default = {
  render: () => `
    ${template7Styles}
    <div class="template7-container">
      <div class="template7-row">
        <div class="template7-col template7-col-full">
          <div class="template7-card">
            <div class="card-header-triple">
              <span class="card-step-number">1</span>
              Contexto
            </div>
            <div class="question-content-area">
              Template7 apresenta informações em 3 blocos sequenciais antes das alternativas.
              Ideal para criar fluxo de leitura progressivo.
            </div>
          </div>
          
          <div class="template7-card">
            <div class="card-header-triple">
              <span class="card-step-number">2</span>
              Desenvolvimento
            </div>
            <div class="question-content-area">
              O segundo card desenvolve o conceito apresentado no primeiro card,
              adicionando exemplos e detalhes importantes.
            </div>
          </div>
          
          <div class="template7-card">
            <div class="card-header-triple">
              <span class="card-step-number">3</span>
              Pergunta
            </div>
            <div class="question-content-area">
              <strong>Com base nas informações acima, selecione a alternativa correta:</strong>
            </div>
          </div>
          
          <div class="alternatives-grid-seven">
            <div class="alternative-card">
              <div class="alternative-label">Alternativa A</div>
              <div class="alternative-text">Primeira opção de resposta</div>
            </div>
            <div class="alternative-card">
              <div class="alternative-label">Alternativa B</div>
              <div class="alternative-text">Segunda opção de resposta</div>
            </div>
            <div class="alternative-card">
              <div class="alternative-label">Alternativa C</div>
              <div class="alternative-text">Terceira opção de resposta</div>
            </div>
            <div class="alternative-card">
              <div class="alternative-label">Alternativa D</div>
              <div class="alternative-text">Quarta opção de resposta</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
};

// Story: PassoAPasso
export const PassoAPasso = {
  render: () => `
    ${template7Styles}
    <div class="template7-container">
      <div class="template7-row">
        <div class="template7-col template7-col-full">
          <div class="template7-card">
            <div class="card-header-triple">
              <span class="card-step-number">1</span>
              Passo 1: Preparação
            </div>
            <div class="question-content-area">
              <strong>Plantando uma Árvore</strong><br><br>
              Primeiro, escolha um local adequado com boa incidência de luz solar e solo drenado.
              Cave um buraco com profundidade duas vezes maior que o torrão da muda.
            </div>
          </div>
          
          <div class="template7-card">
            <div class="card-header-triple">
              <span class="card-step-number">2</span>
              Passo 2: Plantio
            </div>
            <div class="question-content-area">
              Retire a muda do recipiente com cuidado, preservando as raízes. Posicione a muda
              no centro do buraco, mantendo o colo da planta (parte entre raízes e caule) no nível do solo.
              Preencha o buraco com terra fofa.
            </div>
          </div>
          
          <div class="template7-card">
            <div class="card-header-triple">
              <span class="card-step-number">3</span>
              Passo 3: Finalização
            </div>
            <div class="question-content-area">
              <strong>Após seguir os passos acima, qual é o cuidado ESSENCIAL nas primeiras semanas?</strong>
            </div>
          </div>
          
          <div class="alternatives-grid-seven">
            <div class="alternative-card">
              <div class="alternative-label">Alternativa A</div>
              <div class="alternative-text">Regar abundantemente todos os dias pela manhã</div>
            </div>
            <div class="alternative-card">
              <div class="alternative-label">Alternativa B</div>
              <div class="alternative-text">Adicionar fertilizante químico imediatamente</div>
            </div>
            <div class="alternative-card">
              <div class="alternative-label">Alternativa C</div>
              <div class="alternative-text">Expor ao sol direto durante 12 horas</div>
            </div>
            <div class="alternative-card">
              <div class="alternative-label">Alternativa D</div>
              <div class="alternative-text">Podar as folhas para estimular crescimento</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
};

// Story: TresAtos
export const TresAtos = {
  render: () => `
    ${template7Styles}
    <div class="template7-container">
      <div class="template7-row">
        <div class="template7-col template7-col-full">
          <div class="template7-card">
            <div class="card-header-triple">
              <i class="bi bi-book" style="font-size: 18px;"></i>
              Ato I: A Partida
            </div>
            <div class="question-content-area">
              <strong>O Pequeno Príncipe</strong><br><br>
              O pequeno príncipe vivia sozinho em um asteroide minúsculo, chamado B-612.
              Lá ele cuidava de sua rosa especial e limpava os vulcões. Um dia, decidiu viajar
              por outros planetas para aprender sobre o universo.
            </div>
          </div>
          
          <div class="template7-card">
            <div class="card-header-triple">
              <i class="bi bi-globe" style="font-size: 18px;"></i>
              Ato II: As Descobertas
            </div>
            <div class="question-content-area">
              Em sua jornada, o pequeno príncipe visitou seis planetas antes de chegar à Terra.
              Conheceu o rei, o vaidoso, o bêbado, o homem de negócios, o acendedor de lampiões
              e o geógrafo. Cada um ensinou-lhe algo sobre os adultos e suas preocupações vazias.
            </div>
          </div>
          
          <div class="template7-card">
            <div class="card-header-triple">
              <i class="bi bi-heart" style="font-size: 18px;"></i>
              Ato III: A Lição
            </div>
            <div class="question-content-area">
              <strong>Qual é a principal lição que o pequeno príncipe aprende em sua jornada?</strong>
            </div>
          </div>
          
          <div class="alternatives-grid-seven">
            <div class="alternative-card">
              <div class="alternative-label">Alternativa A</div>
              <div class="alternative-text">"O essencial é invisível aos olhos" - valores verdadeiros estão no coração</div>
            </div>
            <div class="alternative-card">
              <div class="alternative-label">Alternativa B</div>
              <div class="alternative-text">A importância de ter muitas rosas para não ficar sozinho</div>
            </div>
            <div class="alternative-card">
              <div class="alternative-label">Alternativa C</div>
              <div class="alternative-text">Os adultos sempre sabem o que é melhor para as crianças</div>
            </div>
            <div class="alternative-card">
              <div class="alternative-label">Alternativa D</div>
              <div class="alternative-text">Viajar pelo universo é perigoso e deve ser evitado</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
};

// Story: ContextoExemploPergunta
export const ContextoExemploPergunta = {
  render: () => `
    ${template7Styles}
    <div class="template7-container">
      <div class="template7-row">
        <div class="template7-col template7-col-full">
          <div class="template7-card">
            <div class="card-header-triple">
              <i class="bi bi-lightbulb" style="font-size: 18px;"></i>
              Teoria: Energia Cinética
            </div>
            <div class="question-content-area">
              <strong>Conceito:</strong> Energia cinética é a energia associada ao movimento de um corpo.
              É calculada pela fórmula: <strong>Ec = ½mv²</strong>, onde <em>m</em> é a massa (kg)
              e <em>v</em> é a velocidade (m/s).
            </div>
          </div>
          
          <div class="template7-card">
            <div class="card-header-triple">
              <i class="bi bi-calculator" style="font-size: 18px;"></i>
              Exemplo Resolvido
            </div>
            <div class="question-content-area">
              Um carro de massa 1000 kg se desloca a 20 m/s. Sua energia cinética é:<br><br>
              <code style="background: #F3F2F7; padding: 8px 12px; border-radius: 4px; display: block; margin: 8px 0;">
              Ec = ½ × 1000 × 20²<br>
              Ec = ½ × 1000 × 400<br>
              Ec = 200.000 J (ou 200 kJ)
              </code>
            </div>
          </div>
          
          <div class="template7-card">
            <div class="card-header-triple">
              <i class="bi bi-question-circle" style="font-size: 18px;"></i>
              Aplique o Conceito
            </div>
            <div class="question-content-area">
              <strong>Se a velocidade do carro DUPLICAR (passar de 20 m/s para 40 m/s),
              sua energia cinética será:</strong>
            </div>
          </div>
          
          <div class="alternatives-grid-seven">
            <div class="alternative-card">
              <div class="alternative-label">Alternativa A</div>
              <div class="alternative-text">Também duplicará (400 kJ)</div>
            </div>
            <div class="alternative-card">
              <div class="alternative-label">Alternativa B</div>
              <div class="alternative-text">Triplicará (600 kJ)</div>
            </div>
            <div class="alternative-card">
              <div class="alternative-label">Alternativa C</div>
              <div class="alternative-text">Quadruplicará (800 kJ)</div>
            </div>
            <div class="alternative-card">
              <div class="alternative-label">Alternativa D</div>
              <div class="alternative-text">Permanecerá a mesma (200 kJ)</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
};

// Story: SituacaoProblema
export const SituacaoProblema = {
  render: () => `
    ${template7Styles}
    <div class="template7-container">
      <div class="template7-row">
        <div class="template7-col template7-col-full">
          <div class="template7-card">
            <div class="card-header-triple">
              <i class="bi bi-exclamation-triangle" style="font-size: 18px; color: #FF9800;"></i>
              Situação
            </div>
            <div class="question-content-area">
              Uma empresa de logística precisa transportar 1200 caixas de um depósito para lojas distribuídas
              em 3 cidades. Cada caminhão comporta 80 caixas e custa R$ 500,00 por viagem.
              A empresa tem prazo de 5 dias úteis para concluir todas as entregas.
            </div>
          </div>
          
          <div class="template7-card">
            <div class="card-header-triple">
              <i class="bi bi-bar-chart" style="font-size: 18px; color: #28C76F;"></i>
              Dados Adicionais
            </div>
            <div class="question-content-area">
              <strong>Distribuição:</strong><br>
              • Cidade A: 400 caixas (33%)<br>
              • Cidade B: 480 caixas (40%)<br>
              • Cidade C: 320 caixas (27%)<br><br>
              <strong>Recursos:</strong> 3 caminhões disponíveis simultaneamente
            </div>
          </div>
          
          <div class="template7-card">
            <div class="card-header-triple">
              <i class="bi bi-patch-question" style="font-size: 18px; color: #6E63E8;"></i>
              Problema
            </div>
            <div class="question-content-area">
              <strong>Qual é o CUSTO TOTAL para transportar todas as caixas?</strong>
            </div>
          </div>
          
          <div class="alternatives-grid-seven">
            <div class="alternative-card">
              <div class="alternative-label">Alternativa A</div>
              <div class="alternative-text">R$ 6.000,00 (12 viagens × R$ 500)</div>
            </div>
            <div class="alternative-card">
              <div class="alternative-label">Alternativa B</div>
              <div class="alternative-text">R$ 7.500,00 (15 viagens × R$ 500)</div>
            </div>
            <div class="alternative-card">
              <div class="alternative-label">Alternativa C</div>
              <div class="alternative-text">R$ 8.000,00 (16 viagens × R$ 500)</div>
            </div>
            <div class="alternative-card">
              <div class="alternative-label">Alternativa D</div>
              <div class="alternative-text">R$ 9.000,00 (18 viagens × R$ 500)</div>
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
    ${template7Styles}
    <style>
      .alternatives-grid-two {
        display: grid;
        grid-template-columns: 1fr;
        gap: 20px;
        margin-top: 24px;
      }
      
      @media (min-width: 768px) {
        .alternatives-grid-two {
          grid-template-columns: repeat(2, 1fr);
        }
      }
      
      .alternative-large {
        background: #FFFFFF;
        border: 2px solid #DBDADE;
        border-radius: 8px;
        padding: 24px;
        min-height: 160px;
        cursor: pointer;
        transition: all 0.2s;
        display: flex;
        flex-direction: column;
        justify-content: center;
      }
      
      .alternative-large:hover {
        border-color: #6E63E8;
        transform: translateY(-3px);
        box-shadow: 0 6px 16px rgba(110,99,232,0.2);
      }
    </style>
    <div class="template7-container">
      <div class="template7-row">
        <div class="template7-col template7-col-full">
          <div class="template7-card">
            <div class="card-header-triple">
              <span class="card-step-number">1</span>
              Definição
            </div>
            <div class="question-content-area">
              <strong>Fotossíntese:</strong> Processo pelo qual plantas, algas e algumas bactérias
              convertem luz solar, água e CO₂ em glicose e oxigênio.
            </div>
          </div>
          
          <div class="template7-card">
            <div class="card-header-triple">
              <span class="card-step-number">2</span>
              Equação
            </div>
            <div class="question-content-area">
              <code style="background: #E8F5E9; padding: 12px; border-radius: 6px; display: block; font-size: 16px; color: #2E7D32;">
              6 CO₂ + 6 H₂O + Luz → C₆H₁₂O₆ + 6 O₂
              </code>
            </div>
          </div>
          
          <div class="template7-card">
            <div class="card-header-triple">
              <span class="card-step-number">3</span>
              Questão
            </div>
            <div class="question-content-area">
              <strong>A fotossíntese é um processo anabólico ou catabólico?</strong>
            </div>
          </div>
          
          <div class="alternatives-grid-two">
            <div class="alternative-large">
              <div class="alternative-label" style="font-size: 14px; margin-bottom: 12px;">
                <i class="bi bi-check-circle" style="color: #28C76F; margin-right: 8px;"></i>
                Alternativa A
              </div>
              <div class="alternative-text" style="font-size: 16px;">
                <strong>Anabólico</strong><br>
                Constrói moléculas complexas (glicose) a partir de moléculas simples (CO₂ e H₂O),
                requerendo energia luminosa.
              </div>
            </div>
            <div class="alternative-large">
              <div class="alternative-label" style="font-size: 14px; margin-bottom: 12px;">
                <i class="bi bi-x-circle" style="color: #EA5455; margin-right: 8px;"></i>
                Alternativa B
              </div>
              <div class="alternative-text" style="font-size: 16px;">
                <strong>Catabólico</strong><br>
                Quebra moléculas complexas em moléculas simples, liberando energia armazenada.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
};

// Story: SeisAlternativas
export const SeisAlternativas = {
  render: () => `
    ${template7Styles}
    <style>
      .alternatives-grid-six {
        display: grid;
        grid-template-columns: 1fr;
        gap: 16px;
        margin-top: 24px;
      }
      
      @media (min-width: 768px) {
        .alternatives-grid-six {
          grid-template-columns: repeat(2, 1fr);
        }
      }
      
      @media (min-width: 992px) {
        .alternatives-grid-six {
          grid-template-columns: repeat(3, 1fr);
        }
      }
    </style>
    <div class="template7-container">
      <div class="template7-row">
        <div class="template7-col template7-col-full">
          <div class="template7-card">
            <div class="card-header-triple">
              <i class="bi bi-globe-americas" style="font-size: 18px;"></i>
              Geografia: Continentes
            </div>
            <div class="question-content-area">
              O planeta Terra é dividido em grandes massas de terra chamadas continentes,
              separadas por oceanos. Cada continente possui características únicas.
            </div>
          </div>
          
          <div class="template7-card">
            <div class="card-header-triple">
              <i class="bi bi-rulers" style="font-size: 18px;"></i>
              Dados Geográficos
            </div>
            <div class="question-content-area">
              <strong>Áreas aproximadas:</strong><br>
              Ásia: 44 milhões km² • África: 30 milhões km² • América do Norte: 24 milhões km²<br>
              América do Sul: 18 milhões km² • Antártida: 14 milhões km² • Europa: 10 milhões km² • Oceania: 9 milhões km²
            </div>
          </div>
          
          <div class="template7-card">
            <div class="card-header-triple">
              <i class="bi bi-award" style="font-size: 18px;"></i>
              Pergunta
            </div>
            <div class="question-content-area">
              <strong>Quantos continentes existem na Terra?</strong>
            </div>
          </div>
          
          <div class="alternatives-grid-six">
            <div class="alternative-card">
              <div class="alternative-label">Alternativa A</div>
              <div class="alternative-text">4 continentes</div>
            </div>
            <div class="alternative-card">
              <div class="alternative-label">Alternativa B</div>
              <div class="alternative-text">5 continentes</div>
            </div>
            <div class="alternative-card">
              <div class="alternative-label">Alternativa C</div>
              <div class="alternative-text">6 continentes</div>
            </div>
            <div class="alternative-card">
              <div class="alternative-label">Alternativa D</div>
              <div class="alternative-text">7 continentes</div>
            </div>
            <div class="alternative-card">
              <div class="alternative-label">Alternativa E</div>
              <div class="alternative-text">8 continentes</div>
            </div>
            <div class="alternative-card">
              <div class="alternative-label">Alternativa F</div>
              <div class="alternative-text">9 continentes</div>
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
    ${template7Styles}
    <style>
      .responsive-demo {
        background: #E3F2FD;
        border-left: 4px solid #2196F3;
        padding: 16px;
        border-radius: 6px;
        margin: 24px 0;
      }
      
      .responsive-demo h4 {
        font-size: 14px;
        font-weight: 600;
        color: #1565C0;
        margin: 0 0 8px 0;
        display: flex;
        align-items: center;
        gap: 8px;
      }
      
      .responsive-demo ul {
        margin: 0;
        padding-left: 20px;
      }
      
      .responsive-demo li {
        font-size: 13px;
        color: #1976D2;
        margin-bottom: 4px;
      }
    </style>
    <div class="template7-container">
      <div class="responsive-demo">
        <h4>
          <i class="bi bi-arrows-angle-expand"></i>
          Template7: Comportamento Responsivo
        </h4>
        <ul>
          <li>✅ Desktop (≥992px): 4 colunas (lg-3 = 25% cada)</li>
          <li>✅ Tablet (768-991px): 2 colunas (md-6 = 50% cada)</li>
          <li>✅ Mobile (<768px): 1 coluna (cols-12 = 100%)</li>
          <li>✅ 3 cards sequenciais sempre full-width</li>
          <li>✅ Grid de alternativas adapta automaticamente</li>
        </ul>
      </div>
      
      <div class="template7-row">
        <div class="template7-col template7-col-full">
          <div class="template7-card">
            <div class="card-header-triple">
              <i class="bi bi-laptop" style="font-size: 18px;"></i>
              Card 1: Desktop
            </div>
            <div class="question-content-area">
              Em telas grandes (≥992px), as alternativas aparecem lado a lado em 4 colunas (25% cada).
            </div>
          </div>
          
          <div class="template7-card">
            <div class="card-header-triple">
              <i class="bi bi-tablet" style="font-size: 18px;"></i>
              Card 2: Tablet
            </div>
            <div class="question-content-area">
              Em tablets (768-991px), as alternativas se reorganizam em 2 colunas (50% cada).
            </div>
          </div>
          
          <div class="template7-card">
            <div class="card-header-triple">
              <i class="bi bi-phone" style="font-size: 18px;"></i>
              Card 3: Mobile
            </div>
            <div class="question-content-area">
              <strong>Em dispositivos móveis (<768px), quantas colunas aparecem?</strong>
            </div>
          </div>
          
          <div class="alternatives-grid-seven">
            <div class="alternative-card">
              <div class="alternative-label">Alternativa A</div>
              <div class="alternative-text">
                <i class="bi bi-check-circle-fill" style="color: #28C76F; margin-right: 6px;"></i>
                1 coluna (100% width)
              </div>
            </div>
            <div class="alternative-card">
              <div class="alternative-label">Alternativa B</div>
              <div class="alternative-text">2 colunas (50% each)</div>
            </div>
            <div class="alternative-card">
              <div class="alternative-label">Alternativa C</div>
              <div class="alternative-text">3 colunas (33% each)</div>
            </div>
            <div class="alternative-card">
              <div class="alternative-label">Alternativa D</div>
              <div class="alternative-text">4 colunas (25% each)</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
};


