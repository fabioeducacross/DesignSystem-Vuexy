const H={title:"Educacross Components V2/Templates/TemplateDefault",tags:["autodocs"],parameters:{layout:"fullscreen",docs:{description:{component:`
# TemplateDefault

Template padrão para exibição de questões em listas com **header azul destaque** + alternativas grid 2 colunas.

## Contexto

**TemplateDefault ≠ Templates 1-11**

Este template pertence ao contexto **questionsListDetail**, diferente dos Templates 1-11 que são do contexto **questionDetail**.

### Diferenças principais:

| Aspecto | Templates 1-11 | TemplateDefault |
|---------|----------------|-----------------|
| **Contexto** | questionDetail | questionsListDetail |
| **Header** | Sem destaque (ou gradient) | Card azul primary destacado |
| **Header Text** | Variável | Fixo: "Enunciado da Questão" |
| **Content Area** | 1-3 cards flexíveis | 1 card com header primary |
| **Alternatives Grid** | Variável (1-4 cols) | Fixo: 2 cols (md-2) |
| **Uso** | Visualização única de questão | Lista de múltiplas questões |

## Quando usar

- **Lista de questões**: Exibir múltiplas questões sequencialmente
- **Revisão de prova**: Mostrar todas as questões com destaque visual
- **Header padronizado**: Quando precisa uniformidade visual (header azul sempre)
- **Grid 2 colunas fixo**: Alternativas médias sem necessidade de variação de layout
- **Contexto de lista**: Diferente de visualização única isolada

## Estrutura

\`\`\`
+----------------------------------------+
| 🔵 Enunciado da Questão               |  ← Header AZUL primary fixo
| (header-bg-variant="primary")         |
+----------------------------------------+
| Content Area                           |  ← Body com padding reduzido
| (texto da questão)                     |
+----------------------------------------+
| [Alternative A]  [Alternative B]       |  ← Grid 2 cols (md-2)
| [Alternative C]  [Alternative D]       |
+----------------------------------------+
\`\`\`

## Variantes

1. **Default**: Header azul + 4 alternativas grid 2×2
2. **ComTexto**: Header + enunciado texto longo + 4 alternativas
3. **ComImagem**: Header + imagem questão + 4 alternativas
4. **DuasAlternativas**: Header + apenas 2 alternativas largas
5. **SeisAlternativas**: Header + 6 alternativas grid 3×2
6. **ComFormula**: Header + fórmula matemática + 4 alternativas
7. **ComTabela**: Header + tabela de dados + 4 alternativas
8. **Responsive**: Demo 2→1 cols mobile

## Características visuais

- **Header destaque**: bg-variant="primary" (azul #6E63E8) com texto branco
- **Header text**: "Enunciado da Questão" centralizado, h5 font-size
- **Body padding**: p-1 (reduzido para lista compacta)
- **Border**: light-gray, shadow-none (discreto)
- **Alternatives grid**: md-2 (2 cols 50%) → 1 col mobile
- **Gap**: gap-2 (16px) entre alternativas
- **Max-width**: 1000px para leitura confortável
        `}}}},a=`
<style>
  .template-default-container {
    background: #F8F7FA;
    min-height: 100vh;
    padding: 24px;
    max-width: 1000px;
    margin: 0 auto;
  }
  
  .template-default-card {
    background: #FFFFFF;
    border: 1px solid #E0E0E0;
    border-radius: 8px;
    margin-bottom: 24px;
    box-shadow: none;
    overflow: hidden;
  }
  
  .card-header-primary {
    background: #6E63E8;
    color: white;
    padding: 12px 24px;
    text-align: center;
    font-size: 20px;
    font-weight: 400;
    margin: 0;
  }
  
  .card-body-compact {
    padding: 8px 20px 20px;
  }
  
  .question-content-area {
    font-size: 15px;
    line-height: 1.7;
    color: #5D596C;
    margin-bottom: 16px;
  }
  
  .alternatives-grid-default {
    display: grid;
    grid-template-columns: 1fr;
    gap: 16px;
    margin-top: 20px;
  }
  
  @media (min-width: 768px) {
    .alternatives-grid-default {
      grid-template-columns: repeat(2, 1fr);
    }
  }
  
  .alternative-card-default {
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
  
  .alternative-card-default:hover {
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
    .template-default-container {
      padding: 16px;
    }
    
    .card-header-primary {
      font-size: 18px;
      padding: 10px 16px;
    }
    
    .card-body-compact {
      padding: 8px 16px 16px;
    }
    
    .alternative-card-default {
      min-height: 100px;
      padding: 14px;
    }
    
    .alternatives-grid-default {
      gap: 12px;
    }
  }
</style>
`,e={render:()=>`
    ${a}
    <div class="template-default-container">
      <div class="template-default-card">
        <h5 class="card-header-primary">
          Enunciado da Questão
        </h5>
        <div class="card-body-compact">
          <div class="question-content-area">
            TemplateDefault é usado no contexto de <strong>listas de questões</strong> (questionsListDetail),
            diferente dos Templates 1-11 que são para visualização única (questionDetail).
            O header azul destaca cada questão na lista.
          </div>
          
          <div class="alternatives-grid-default">
            <div class="alternative-card-default">
              <div class="alternative-label">Alternativa A</div>
              <div class="alternative-text">
                Header azul primary fixo com texto "Enunciado da Questão"
              </div>
            </div>
            <div class="alternative-card-default">
              <div class="alternative-label">Alternativa B</div>
              <div class="alternative-text">
                Grid 2 colunas (md-2) para alternativas médias
              </div>
            </div>
            <div class="alternative-card-default">
              <div class="alternative-label">Alternativa C</div>
              <div class="alternative-text">
                Body com padding reduzido (p-1) para lista compacta
              </div>
            </div>
            <div class="alternative-card-default">
              <div class="alternative-label">Alternativa D</div>
              <div class="alternative-text">
                Border discreto light-gray sem shadow para visual limpo
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `},t={render:()=>`
    ${a}
    <div class="template-default-container">
      <div class="template-default-card">
        <h5 class="card-header-primary">
          Enunciado da Questão
        </h5>
        <div class="card-body-compact">
          <div class="question-content-area">
            <strong>Leia o texto abaixo:</strong><br><br>
            A Revolução Industrial foi um período de grandes transformações econômicas, sociais
            e tecnológicas que começou na Inglaterra no século XVIII. A invenção da máquina a vapor
            por James Watt (1769) permitiu a mecanização da produção, substituindo o trabalho manual
            artesanal por processos industriais em larga escala.<br><br>
            As fábricas passaram a concentrar trabalhadores em um único local, surgindo assim
            o proletariado urbano. As jornadas de trabalho eram extenuantes, chegando a 14-16 horas
            diárias, incluindo mulheres e crianças em condições insalubres.
          </div>
          
          <div class="alternatives-grid-default">
            <div class="alternative-card-default">
              <div class="alternative-label">Alternativa A</div>
              <div class="alternative-text">
                A máquina a vapor foi inventada no século XIX durante a Segunda Revolução Industrial
              </div>
            </div>
            <div class="alternative-card-default">
              <div class="alternative-label">Alternativa B</div>
              <div class="alternative-text">
                A Revolução Industrial iniciou-se na Inglaterra no século XVIII com a mecanização
              </div>
            </div>
            <div class="alternative-card-default">
              <div class="alternative-label">Alternativa C</div>
              <div class="alternative-text">
                As jornadas de trabalho eram curtas (6-8h) com excelentes condições de higiene
              </div>
            </div>
            <div class="alternative-card-default">
              <div class="alternative-label">Alternativa D</div>
              <div class="alternative-text">
                A produção artesanal continuou predominante após a invenção das máquinas
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `},i={render:()=>`
    ${a}
    <div class="template-default-container">
      <div class="template-default-card">
        <h5 class="card-header-primary">
          Enunciado da Questão
        </h5>
        <div class="card-body-compact">
          <div class="question-content-area">
            <strong>Observe a imagem abaixo e responda:</strong><br><br>
            <svg viewBox="0 0 300 200" style="width: 100%; max-width: 400px; height: auto; display: block; margin: 16px auto; border: 2px solid #DBDADE; border-radius: 8px; background: #F8F8F8;">
              <rect x="50" y="30" width="80" height="100" fill="#4CAF50" opacity="0.7"/>
              <rect x="150" y="50" width="80" height="80" fill="#2196F3" opacity="0.7"/>
              <text x="90" y="145" text-anchor="middle" font-size="14" font-weight="bold" fill="#2E7D32">Área A</text>
              <text x="190" y="145" text-anchor="middle" font-size="14" font-weight="bold" fill="#1565C0">Área B</text>
              <text x="150" y="180" text-anchor="middle" font-size="12" fill="#5D596C">Comparação de áreas</text>
            </svg>
            <p>Considerando os retângulos acima, qual área é maior?</p>
          </div>
          
          <div class="alternatives-grid-default">
            <div class="alternative-card-default">
              <div class="alternative-label">Alternativa A</div>
              <div class="alternative-text">
                Área A (verde) é maior: 80 × 100 = 8.000 unidades²
              </div>
            </div>
            <div class="alternative-card-default">
              <div class="alternative-label">Alternativa B</div>
              <div class="alternative-text">
                Área B (azul) é maior: 80 × 80 = 6.400 unidades²
              </div>
            </div>
            <div class="alternative-card-default">
              <div class="alternative-label">Alternativa C</div>
              <div class="alternative-text">
                As duas áreas são exatamente iguais
              </div>
            </div>
            <div class="alternative-card-default">
              <div class="alternative-label">Alternativa D</div>
              <div class="alternative-text">
                Não é possível calcular sem mais informações
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `},d={render:()=>`
    ${a}
    <style>
      .alternatives-grid-two {
        display: grid;
        grid-template-columns: 1fr;
        gap: 20px;
        margin-top: 20px;
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
        padding: 20px;
        min-height: 140px;
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
    <div class="template-default-container">
      <div class="template-default-card">
        <h5 class="card-header-primary">
          Enunciado da Questão
        </h5>
        <div class="card-body-compact">
          <div class="question-content-area">
            <strong>Verdadeiro ou Falso?</strong><br><br>
            "A água é composta por dois átomos de hidrogênio (H) e um átomo de oxigênio (O),
            formando a molécula H₂O. É essencial para a vida e cobre aproximadamente 71% da
            superfície terrestre."
          </div>
          
          <div class="alternatives-grid-two">
            <div class="alternative-large">
              <div class="alternative-label" style="font-size: 14px; color: #28C76F; margin-bottom: 12px;">
                <i class="bi bi-check-circle-fill" style="font-size: 20px; margin-right: 8px;"></i>
                Verdadeiro
              </div>
              <div class="alternative-text" style="font-size: 16px;">
                A afirmação está correta. A água (H₂O) é formada por 2 átomos de hidrogênio e
                1 átomo de oxigênio, e realmente cobre cerca de 71% da superfície do planeta Terra.
              </div>
            </div>
            <div class="alternative-large">
              <div class="alternative-label" style="font-size: 14px; color: #EA5455; margin-bottom: 12px;">
                <i class="bi bi-x-circle-fill" style="font-size: 20px; margin-right: 8px;"></i>
                Falso
              </div>
              <div class="alternative-text" style="font-size: 16px;">
                A afirmação contém erros factuais sobre a composição química da água ou
                sobre a porcentagem de cobertura da superfície terrestre.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `},n={render:()=>`
    ${a}
    <style>
      .alternatives-grid-six {
        display: grid;
        grid-template-columns: 1fr;
        gap: 16px;
        margin-top: 20px;
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
    <div class="template-default-container">
      <div class="template-default-card">
        <h5 class="card-header-primary">
          Enunciado da Questão
        </h5>
        <div class="card-body-compact">
          <div class="question-content-area">
            <strong>Quantos continentes existem na Terra?</strong><br><br>
            Os continentes são grandes massas de terra separadas por oceanos. A classificação
            pode variar entre 5 e 7 continentes dependendo do critério geográfico utilizado.
          </div>
          
          <div class="alternatives-grid-six">
            <div class="alternative-card-default">
              <div class="alternative-label">Alternativa A</div>
              <div class="alternative-text">4 continentes</div>
            </div>
            <div class="alternative-card-default">
              <div class="alternative-label">Alternativa B</div>
              <div class="alternative-text">5 continentes</div>
            </div>
            <div class="alternative-card-default">
              <div class="alternative-label">Alternativa C</div>
              <div class="alternative-text">6 continentes</div>
            </div>
            <div class="alternative-card-default">
              <div class="alternative-label">Alternativa D</div>
              <div class="alternative-text">7 continentes</div>
            </div>
            <div class="alternative-card-default">
              <div class="alternative-label">Alternativa E</div>
              <div class="alternative-text">8 continentes</div>
            </div>
            <div class="alternative-card-default">
              <div class="alternative-label">Alternativa F</div>
              <div class="alternative-text">9 continentes</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `},l={render:()=>`
    ${a}
    <div class="template-default-container">
      <div class="template-default-card">
        <h5 class="card-header-primary">
          Enunciado da Questão
        </h5>
        <div class="card-body-compact">
          <div class="question-content-area">
            <strong>Resolva a equação quadrática:</strong><br><br>
            <div style="background: #F3F2F7; padding: 20px; border-radius: 8px; text-align: center; margin: 16px 0;">
              <code style="font-size: 20px; font-family: 'Times New Roman', serif; color: #6E63E8;">
                x² - 5x + 6 = 0
              </code>
            </div>
            <p>
              Use a fórmula de Bhaskara: <strong>x = (-b ± √(b² - 4ac)) / 2a</strong><br>
              Onde: a = 1, b = -5, c = 6
            </p>
          </div>
          
          <div class="alternatives-grid-default">
            <div class="alternative-card-default">
              <div class="alternative-label">Alternativa A</div>
              <div class="alternative-text">
                x₁ = 2 e x₂ = 3<br>
                <small style="color: #6E6B7B;">(2 - 5×2 + 6 = 0 ✓)</small>
              </div>
            </div>
            <div class="alternative-card-default">
              <div class="alternative-label">Alternativa B</div>
              <div class="alternative-text">
                x₁ = 1 e x₂ = 6<br>
                <small style="color: #6E6B7B;">(1 - 5×1 + 6 = 2 ✗)</small>
              </div>
            </div>
            <div class="alternative-card-default">
              <div class="alternative-label">Alternativa C</div>
              <div class="alternative-text">
                x₁ = -2 e x₂ = -3<br>
                <small style="color: #6E6B7B;">(4 + 10 + 6 = 20 ✗)</small>
              </div>
            </div>
            <div class="alternative-card-default">
              <div class="alternative-label">Alternativa D</div>
              <div class="alternative-text">
                Não possui raízes reais<br>
                <small style="color: #6E6B7B;">(Δ = 1 > 0, tem raízes ✗)</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `},s={render:()=>`
    ${a}
    <div class="template-default-container">
      <div class="template-default-card">
        <h5 class="card-header-primary">
          Enunciado da Questão
        </h5>
        <div class="card-body-compact">
          <div class="question-content-area">
            <strong>Analise a tabela de notas dos alunos:</strong><br><br>
            <table style="width: 100%; border-collapse: collapse; font-size: 14px; margin: 16px 0;">
              <thead>
                <tr style="background: #6E63E8; color: white;">
                  <th style="padding: 10px; border: 1px solid #5451B8; text-align: left;">Aluno</th>
                  <th style="padding: 10px; border: 1px solid #5451B8; text-align: center;">Matemática</th>
                  <th style="padding: 10px; border: 1px solid #5451B8; text-align: center;">Português</th>
                  <th style="padding: 10px; border: 1px solid #5451B8; text-align: center;">Média</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style="padding: 8px; border: 1px solid #DBDADE;">Ana</td>
                  <td style="padding: 8px; border: 1px solid #DBDADE; text-align: center;">8.5</td>
                  <td style="padding: 8px; border: 1px solid #DBDADE; text-align: center;">9.0</td>
                  <td style="padding: 8px; border: 1px solid #DBDADE; text-align: center; font-weight: 600;">8.75</td>
                </tr>
                <tr style="background: #FAFAFA;">
                  <td style="padding: 8px; border: 1px solid #DBDADE;">Bruno</td>
                  <td style="padding: 8px; border: 1px solid #DBDADE; text-align: center;">7.0</td>
                  <td style="padding: 8px; border: 1px solid #DBDADE; text-align: center;">8.5</td>
                  <td style="padding: 8px; border: 1px solid #DBDADE; text-align: center; font-weight: 600;">7.75</td>
                </tr>
                <tr>
                  <td style="padding: 8px; border: 1px solid #DBDADE;">Carlos</td>
                  <td style="padding: 8px; border: 1px solid #DBDADE; text-align: center;">9.5</td>
                  <td style="padding: 8px; border: 1px solid #DBDADE; text-align: center;">7.5</td>
                  <td style="padding: 8px; border: 1px solid #DBDADE; text-align: center; font-weight: 600;">8.50</td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <div class="alternatives-grid-default">
            <div class="alternative-card-default">
              <div class="alternative-label">Alternativa A</div>
              <div class="alternative-text">
                Ana teve a maior média geral (8.75)
              </div>
            </div>
            <div class="alternative-card-default">
              <div class="alternative-label">Alternativa B</div>
              <div class="alternative-text">
                Bruno teve melhor nota em Matemática
              </div>
            </div>
            <div class="alternative-card-default">
              <div class="alternative-label">Alternativa C</div>
              <div class="alternative-text">
                Carlos teve a maior nota em Matemática (9.5)
              </div>
            </div>
            <div class="alternative-card-default">
              <div class="alternative-label">Alternativa D</div>
              <div class="alternative-text">
                Todos os alunos tiveram média acima de 8.0
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `},r={render:()=>`
    ${a}
    <div class="template-default-container">
      <div style="background: #E3F2FD; border-left: 4px solid #2196F3; padding: 16px; border-radius: 6px; margin-bottom: 24px;">
        <h4 style="font-size: 14px; font-weight: 600; color: #1565C0; margin: 0 0 8px 0;">
          <i class="bi bi-phone"></i> TemplateDefault: Responsivo
        </h4>
        <ul style="margin: 0; padding-left: 20px; font-size: 13px; color: #1976D2;">
          <li>Desktop (≥768px): Grid 2 colunas (md-2 = 50% cada)</li>
          <li>Mobile (<768px): Grid 1 coluna (100% width)</li>
          <li>Header azul: 20px desktop → 18px mobile</li>
          <li>Body padding: compacto p-1 (8px) para lista</li>
        </ul>
      </div>
      
      <div class="template-default-card">
        <h5 class="card-header-primary">
          Enunciado da Questão
        </h5>
        <div class="card-body-compact">
          <div class="question-content-area">
            <strong>Demo de comportamento responsivo:</strong><br><br>
            <i class="bi bi-laptop" style="font-size: 24px; color: #6E63E8;"></i>
            <strong>Desktop:</strong> Alternativas lado a lado (2 cols 50%)<br><br>
            <i class="bi bi-phone" style="font-size: 24px; color: #28C76F;"></i>
            <strong>Mobile:</strong> Alternativas empilhadas (1 col 100%)
          </div>
          
          <div class="alternatives-grid-default">
            <div class="alternative-card-default">
              <div class="alternative-label">Layout A</div>
              <div class="alternative-text">
                Desktop: 2 colunas lado a lado facilitam comparação rápida
              </div>
            </div>
            <div class="alternative-card-default">
              <div class="alternative-label">Layout B</div>
              <div class="alternative-text">
                Mobile: 1 coluna empilhada garante leitura confortável sem scroll horizontal
              </div>
            </div>
            <div class="alternative-card-default">
              <div class="alternative-label">Layout C</div>
              <div class="alternative-text">
                Header azul sempre destaca o enunciado em qualquer dispositivo
              </div>
            </div>
            <div class="alternative-card-default">
              <div class="alternative-label">Layout D</div>
              <div class="alternative-text">
                Padding reduzido (p-1) mantém lista compacta otimizada para múltiplas questões
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `};var o,c,v;e.parameters={...e.parameters,docs:{...(o=e.parameters)==null?void 0:o.docs,source:{originalSource:`{
  render: () => \`
    \${templateDefaultStyles}
    <div class="template-default-container">
      <div class="template-default-card">
        <h5 class="card-header-primary">
          Enunciado da Questão
        </h5>
        <div class="card-body-compact">
          <div class="question-content-area">
            TemplateDefault é usado no contexto de <strong>listas de questões</strong> (questionsListDetail),
            diferente dos Templates 1-11 que são para visualização única (questionDetail).
            O header azul destaca cada questão na lista.
          </div>
          
          <div class="alternatives-grid-default">
            <div class="alternative-card-default">
              <div class="alternative-label">Alternativa A</div>
              <div class="alternative-text">
                Header azul primary fixo com texto "Enunciado da Questão"
              </div>
            </div>
            <div class="alternative-card-default">
              <div class="alternative-label">Alternativa B</div>
              <div class="alternative-text">
                Grid 2 colunas (md-2) para alternativas médias
              </div>
            </div>
            <div class="alternative-card-default">
              <div class="alternative-label">Alternativa C</div>
              <div class="alternative-text">
                Body com padding reduzido (p-1) para lista compacta
              </div>
            </div>
            <div class="alternative-card-default">
              <div class="alternative-label">Alternativa D</div>
              <div class="alternative-text">
                Border discreto light-gray sem shadow para visual limpo
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  \`
}`,...(v=(c=e.parameters)==null?void 0:c.docs)==null?void 0:v.source}}};var p,x,u;t.parameters={...t.parameters,docs:{...(p=t.parameters)==null?void 0:p.docs,source:{originalSource:`{
  render: () => \`
    \${templateDefaultStyles}
    <div class="template-default-container">
      <div class="template-default-card">
        <h5 class="card-header-primary">
          Enunciado da Questão
        </h5>
        <div class="card-body-compact">
          <div class="question-content-area">
            <strong>Leia o texto abaixo:</strong><br><br>
            A Revolução Industrial foi um período de grandes transformações econômicas, sociais
            e tecnológicas que começou na Inglaterra no século XVIII. A invenção da máquina a vapor
            por James Watt (1769) permitiu a mecanização da produção, substituindo o trabalho manual
            artesanal por processos industriais em larga escala.<br><br>
            As fábricas passaram a concentrar trabalhadores em um único local, surgindo assim
            o proletariado urbano. As jornadas de trabalho eram extenuantes, chegando a 14-16 horas
            diárias, incluindo mulheres e crianças em condições insalubres.
          </div>
          
          <div class="alternatives-grid-default">
            <div class="alternative-card-default">
              <div class="alternative-label">Alternativa A</div>
              <div class="alternative-text">
                A máquina a vapor foi inventada no século XIX durante a Segunda Revolução Industrial
              </div>
            </div>
            <div class="alternative-card-default">
              <div class="alternative-label">Alternativa B</div>
              <div class="alternative-text">
                A Revolução Industrial iniciou-se na Inglaterra no século XVIII com a mecanização
              </div>
            </div>
            <div class="alternative-card-default">
              <div class="alternative-label">Alternativa C</div>
              <div class="alternative-text">
                As jornadas de trabalho eram curtas (6-8h) com excelentes condições de higiene
              </div>
            </div>
            <div class="alternative-card-default">
              <div class="alternative-label">Alternativa D</div>
              <div class="alternative-text">
                A produção artesanal continuou predominante após a invenção das máquinas
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  \`
}`,...(u=(x=t.parameters)==null?void 0:x.docs)==null?void 0:u.source}}};var m,g,b;i.parameters={...i.parameters,docs:{...(m=i.parameters)==null?void 0:m.docs,source:{originalSource:`{
  render: () => \`
    \${templateDefaultStyles}
    <div class="template-default-container">
      <div class="template-default-card">
        <h5 class="card-header-primary">
          Enunciado da Questão
        </h5>
        <div class="card-body-compact">
          <div class="question-content-area">
            <strong>Observe a imagem abaixo e responda:</strong><br><br>
            <svg viewBox="0 0 300 200" style="width: 100%; max-width: 400px; height: auto; display: block; margin: 16px auto; border: 2px solid #DBDADE; border-radius: 8px; background: #F8F8F8;">
              <rect x="50" y="30" width="80" height="100" fill="#4CAF50" opacity="0.7"/>
              <rect x="150" y="50" width="80" height="80" fill="#2196F3" opacity="0.7"/>
              <text x="90" y="145" text-anchor="middle" font-size="14" font-weight="bold" fill="#2E7D32">Área A</text>
              <text x="190" y="145" text-anchor="middle" font-size="14" font-weight="bold" fill="#1565C0">Área B</text>
              <text x="150" y="180" text-anchor="middle" font-size="12" fill="#5D596C">Comparação de áreas</text>
            </svg>
            <p>Considerando os retângulos acima, qual área é maior?</p>
          </div>
          
          <div class="alternatives-grid-default">
            <div class="alternative-card-default">
              <div class="alternative-label">Alternativa A</div>
              <div class="alternative-text">
                Área A (verde) é maior: 80 × 100 = 8.000 unidades²
              </div>
            </div>
            <div class="alternative-card-default">
              <div class="alternative-label">Alternativa B</div>
              <div class="alternative-text">
                Área B (azul) é maior: 80 × 80 = 6.400 unidades²
              </div>
            </div>
            <div class="alternative-card-default">
              <div class="alternative-label">Alternativa C</div>
              <div class="alternative-text">
                As duas áreas são exatamente iguais
              </div>
            </div>
            <div class="alternative-card-default">
              <div class="alternative-label">Alternativa D</div>
              <div class="alternative-text">
                Não é possível calcular sem mais informações
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  \`
}`,...(b=(g=i.parameters)==null?void 0:g.docs)==null?void 0:b.source}}};var f,h,E;d.parameters={...d.parameters,docs:{...(f=d.parameters)==null?void 0:f.docs,source:{originalSource:`{
  render: () => \`
    \${templateDefaultStyles}
    <style>
      .alternatives-grid-two {
        display: grid;
        grid-template-columns: 1fr;
        gap: 20px;
        margin-top: 20px;
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
        padding: 20px;
        min-height: 140px;
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
    <div class="template-default-container">
      <div class="template-default-card">
        <h5 class="card-header-primary">
          Enunciado da Questão
        </h5>
        <div class="card-body-compact">
          <div class="question-content-area">
            <strong>Verdadeiro ou Falso?</strong><br><br>
            "A água é composta por dois átomos de hidrogênio (H) e um átomo de oxigênio (O),
            formando a molécula H₂O. É essencial para a vida e cobre aproximadamente 71% da
            superfície terrestre."
          </div>
          
          <div class="alternatives-grid-two">
            <div class="alternative-large">
              <div class="alternative-label" style="font-size: 14px; color: #28C76F; margin-bottom: 12px;">
                <i class="bi bi-check-circle-fill" style="font-size: 20px; margin-right: 8px;"></i>
                Verdadeiro
              </div>
              <div class="alternative-text" style="font-size: 16px;">
                A afirmação está correta. A água (H₂O) é formada por 2 átomos de hidrogênio e
                1 átomo de oxigênio, e realmente cobre cerca de 71% da superfície do planeta Terra.
              </div>
            </div>
            <div class="alternative-large">
              <div class="alternative-label" style="font-size: 14px; color: #EA5455; margin-bottom: 12px;">
                <i class="bi bi-x-circle-fill" style="font-size: 20px; margin-right: 8px;"></i>
                Falso
              </div>
              <div class="alternative-text" style="font-size: 16px;">
                A afirmação contém erros factuais sobre a composição química da água ou
                sobre a porcentagem de cobertura da superfície terrestre.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  \`
}`,...(E=(h=d.parameters)==null?void 0:h.docs)==null?void 0:E.source}}};var y,A,D;n.parameters={...n.parameters,docs:{...(y=n.parameters)==null?void 0:y.docs,source:{originalSource:`{
  render: () => \`
    \${templateDefaultStyles}
    <style>
      .alternatives-grid-six {
        display: grid;
        grid-template-columns: 1fr;
        gap: 16px;
        margin-top: 20px;
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
    <div class="template-default-container">
      <div class="template-default-card">
        <h5 class="card-header-primary">
          Enunciado da Questão
        </h5>
        <div class="card-body-compact">
          <div class="question-content-area">
            <strong>Quantos continentes existem na Terra?</strong><br><br>
            Os continentes são grandes massas de terra separadas por oceanos. A classificação
            pode variar entre 5 e 7 continentes dependendo do critério geográfico utilizado.
          </div>
          
          <div class="alternatives-grid-six">
            <div class="alternative-card-default">
              <div class="alternative-label">Alternativa A</div>
              <div class="alternative-text">4 continentes</div>
            </div>
            <div class="alternative-card-default">
              <div class="alternative-label">Alternativa B</div>
              <div class="alternative-text">5 continentes</div>
            </div>
            <div class="alternative-card-default">
              <div class="alternative-label">Alternativa C</div>
              <div class="alternative-text">6 continentes</div>
            </div>
            <div class="alternative-card-default">
              <div class="alternative-label">Alternativa D</div>
              <div class="alternative-text">7 continentes</div>
            </div>
            <div class="alternative-card-default">
              <div class="alternative-label">Alternativa E</div>
              <div class="alternative-text">8 continentes</div>
            </div>
            <div class="alternative-card-default">
              <div class="alternative-label">Alternativa F</div>
              <div class="alternative-text">9 continentes</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  \`
}`,...(D=(A=n.parameters)==null?void 0:A.docs)==null?void 0:D.source}}};var B,F,z;l.parameters={...l.parameters,docs:{...(B=l.parameters)==null?void 0:B.docs,source:{originalSource:`{
  render: () => \`
    \${templateDefaultStyles}
    <div class="template-default-container">
      <div class="template-default-card">
        <h5 class="card-header-primary">
          Enunciado da Questão
        </h5>
        <div class="card-body-compact">
          <div class="question-content-area">
            <strong>Resolva a equação quadrática:</strong><br><br>
            <div style="background: #F3F2F7; padding: 20px; border-radius: 8px; text-align: center; margin: 16px 0;">
              <code style="font-size: 20px; font-family: 'Times New Roman', serif; color: #6E63E8;">
                x² - 5x + 6 = 0
              </code>
            </div>
            <p>
              Use a fórmula de Bhaskara: <strong>x = (-b ± √(b² - 4ac)) / 2a</strong><br>
              Onde: a = 1, b = -5, c = 6
            </p>
          </div>
          
          <div class="alternatives-grid-default">
            <div class="alternative-card-default">
              <div class="alternative-label">Alternativa A</div>
              <div class="alternative-text">
                x₁ = 2 e x₂ = 3<br>
                <small style="color: #6E6B7B;">(2 - 5×2 + 6 = 0 ✓)</small>
              </div>
            </div>
            <div class="alternative-card-default">
              <div class="alternative-label">Alternativa B</div>
              <div class="alternative-text">
                x₁ = 1 e x₂ = 6<br>
                <small style="color: #6E6B7B;">(1 - 5×1 + 6 = 2 ✗)</small>
              </div>
            </div>
            <div class="alternative-card-default">
              <div class="alternative-label">Alternativa C</div>
              <div class="alternative-text">
                x₁ = -2 e x₂ = -3<br>
                <small style="color: #6E6B7B;">(4 + 10 + 6 = 20 ✗)</small>
              </div>
            </div>
            <div class="alternative-card-default">
              <div class="alternative-label">Alternativa D</div>
              <div class="alternative-text">
                Não possui raízes reais<br>
                <small style="color: #6E6B7B;">(Δ = 1 > 0, tem raízes ✗)</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  \`
}`,...(z=(F=l.parameters)==null?void 0:F.docs)==null?void 0:z.source}}};var q,C,w;s.parameters={...s.parameters,docs:{...(q=s.parameters)==null?void 0:q.docs,source:{originalSource:`{
  render: () => \`
    \${templateDefaultStyles}
    <div class="template-default-container">
      <div class="template-default-card">
        <h5 class="card-header-primary">
          Enunciado da Questão
        </h5>
        <div class="card-body-compact">
          <div class="question-content-area">
            <strong>Analise a tabela de notas dos alunos:</strong><br><br>
            <table style="width: 100%; border-collapse: collapse; font-size: 14px; margin: 16px 0;">
              <thead>
                <tr style="background: #6E63E8; color: white;">
                  <th style="padding: 10px; border: 1px solid #5451B8; text-align: left;">Aluno</th>
                  <th style="padding: 10px; border: 1px solid #5451B8; text-align: center;">Matemática</th>
                  <th style="padding: 10px; border: 1px solid #5451B8; text-align: center;">Português</th>
                  <th style="padding: 10px; border: 1px solid #5451B8; text-align: center;">Média</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style="padding: 8px; border: 1px solid #DBDADE;">Ana</td>
                  <td style="padding: 8px; border: 1px solid #DBDADE; text-align: center;">8.5</td>
                  <td style="padding: 8px; border: 1px solid #DBDADE; text-align: center;">9.0</td>
                  <td style="padding: 8px; border: 1px solid #DBDADE; text-align: center; font-weight: 600;">8.75</td>
                </tr>
                <tr style="background: #FAFAFA;">
                  <td style="padding: 8px; border: 1px solid #DBDADE;">Bruno</td>
                  <td style="padding: 8px; border: 1px solid #DBDADE; text-align: center;">7.0</td>
                  <td style="padding: 8px; border: 1px solid #DBDADE; text-align: center;">8.5</td>
                  <td style="padding: 8px; border: 1px solid #DBDADE; text-align: center; font-weight: 600;">7.75</td>
                </tr>
                <tr>
                  <td style="padding: 8px; border: 1px solid #DBDADE;">Carlos</td>
                  <td style="padding: 8px; border: 1px solid #DBDADE; text-align: center;">9.5</td>
                  <td style="padding: 8px; border: 1px solid #DBDADE; text-align: center;">7.5</td>
                  <td style="padding: 8px; border: 1px solid #DBDADE; text-align: center; font-weight: 600;">8.50</td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <div class="alternatives-grid-default">
            <div class="alternative-card-default">
              <div class="alternative-label">Alternativa A</div>
              <div class="alternative-text">
                Ana teve a maior média geral (8.75)
              </div>
            </div>
            <div class="alternative-card-default">
              <div class="alternative-label">Alternativa B</div>
              <div class="alternative-text">
                Bruno teve melhor nota em Matemática
              </div>
            </div>
            <div class="alternative-card-default">
              <div class="alternative-label">Alternativa C</div>
              <div class="alternative-text">
                Carlos teve a maior nota em Matemática (9.5)
              </div>
            </div>
            <div class="alternative-card-default">
              <div class="alternative-label">Alternativa D</div>
              <div class="alternative-text">
                Todos os alunos tiveram média acima de 8.0
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  \`
}`,...(w=(C=s.parameters)==null?void 0:C.docs)==null?void 0:w.source}}};var T,k,I;r.parameters={...r.parameters,docs:{...(T=r.parameters)==null?void 0:T.docs,source:{originalSource:`{
  render: () => \`
    \${templateDefaultStyles}
    <div class="template-default-container">
      <div style="background: #E3F2FD; border-left: 4px solid #2196F3; padding: 16px; border-radius: 6px; margin-bottom: 24px;">
        <h4 style="font-size: 14px; font-weight: 600; color: #1565C0; margin: 0 0 8px 0;">
          <i class="bi bi-phone"></i> TemplateDefault: Responsivo
        </h4>
        <ul style="margin: 0; padding-left: 20px; font-size: 13px; color: #1976D2;">
          <li>Desktop (≥768px): Grid 2 colunas (md-2 = 50% cada)</li>
          <li>Mobile (<768px): Grid 1 coluna (100% width)</li>
          <li>Header azul: 20px desktop → 18px mobile</li>
          <li>Body padding: compacto p-1 (8px) para lista</li>
        </ul>
      </div>
      
      <div class="template-default-card">
        <h5 class="card-header-primary">
          Enunciado da Questão
        </h5>
        <div class="card-body-compact">
          <div class="question-content-area">
            <strong>Demo de comportamento responsivo:</strong><br><br>
            <i class="bi bi-laptop" style="font-size: 24px; color: #6E63E8;"></i>
            <strong>Desktop:</strong> Alternativas lado a lado (2 cols 50%)<br><br>
            <i class="bi bi-phone" style="font-size: 24px; color: #28C76F;"></i>
            <strong>Mobile:</strong> Alternativas empilhadas (1 col 100%)
          </div>
          
          <div class="alternatives-grid-default">
            <div class="alternative-card-default">
              <div class="alternative-label">Layout A</div>
              <div class="alternative-text">
                Desktop: 2 colunas lado a lado facilitam comparação rápida
              </div>
            </div>
            <div class="alternative-card-default">
              <div class="alternative-label">Layout B</div>
              <div class="alternative-text">
                Mobile: 1 coluna empilhada garante leitura confortável sem scroll horizontal
              </div>
            </div>
            <div class="alternative-card-default">
              <div class="alternative-label">Layout C</div>
              <div class="alternative-text">
                Header azul sempre destaca o enunciado em qualquer dispositivo
              </div>
            </div>
            <div class="alternative-card-default">
              <div class="alternative-label">Layout D</div>
              <div class="alternative-text">
                Padding reduzido (p-1) mantém lista compacta otimizada para múltiplas questões
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  \`
}`,...(I=(k=r.parameters)==null?void 0:k.docs)==null?void 0:I.source}}};const Q=["Default","ComTexto","ComImagem","DuasAlternativas","SeisAlternativas","ComFormula","ComTabela","Responsive"];export{l as ComFormula,i as ComImagem,s as ComTabela,t as ComTexto,e as Default,d as DuasAlternativas,r as Responsive,n as SeisAlternativas,Q as __namedExportsOrder,H as default};
