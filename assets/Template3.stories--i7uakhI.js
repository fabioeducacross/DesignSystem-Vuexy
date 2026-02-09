const Q={title:"Educacross Components V2/Templates/Template3",tags:["autodocs"],parameters:{layout:"fullscreen",docs:{description:{component:`
# Template3

Template de layout com alternativas em coluna única full-width, ideal para textos muito longos ou leitura sequencial.

## Quando usar

- **Textos extensos**: Alternativas com 300+ caracteres que precisam largura total
- **Leitura sequencial**: Questões onde ordem e fluxo de leitura são importantes
- **Comparação vertical**: Alternativas que devem ser lidas uma após outra
- **Tabelas em alternativas**: Quando alternativas contêm tabelas ou dados estruturados
- **Código ou fórmulas longas**: Alternativas com trechos de código ou fórmulas complexas
- **Acessibilidade**: Melhor para leitores de tela com navegação vertical simples

## Diferenças dos Templates 1 e 2

| Característica | Template1 | Template2 | Template3 |
|---------------|-----------|-----------|-----------|
| **Colunas Desktop** | 4 cols (25%) | 2 cols (50%) | 1 col (100%) |
| **Largura alternativa** | ~200px | ~400px | ~800px+ |
| **Texto recomendado** | 50-100 chars | 100-300 chars | 300+ chars |
| **Uso ideal** | Opções curtas | Textos médios | Textos longos |
| **Leitura** | Horizontal | Mista | Vertical |
| **Mobile** | 1 col | 1 col | 1 col (igual) |

## Variantes

1. **Default**: Layout full-width com alternativas texto
2. **TextosLongos**: Alternativas com parágrafos extensos
3. **ComTabelas**: Alternativas contendo tabelas comparativas
4. **ComCodigo**: Alternativas com blocos de código
5. **ComFormulasComplexas**: Alternativas com fórmulas matemáticas extensas
6. **ComListas**: Alternativas com listas de itens
7. **ComCitacoes**: Alternativas com citações ou trechos literários longos
8. **MobileOptimized**: Demonstração otimização para dispositivos móveis

## Características visuais

- Alternativas 100% width (cols-12)
- Min-height 100px (menor que Template2 devido largura maior)
- Padding 24px (máximo dos 3 templates)
- Gap vertical 16px entre alternativas
- Ideal para 2-4 alternativas (evitar muitas opções)
- Scroll vertical natural para muitas alternativas
        `}}}},a=`
<style>
  .template3-container {
    background: #F8F7FA;
    min-height: 100vh;
    padding: 24px;
    max-width: 1000px;
    margin: 0 auto;
  }
  
  .template3-row {
    display: flex;
    flex-wrap: wrap;
    margin: -12px;
  }
  
  .template3-col {
    padding: 12px;
    width: 100%;
  }
  
  .template3-card {
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
  
  .alternatives-grid-fullwidth {
    display: flex;
    flex-direction: column;
    gap: 16px;
    margin-top: 24px;
  }
  
  .alternative-card-full {
    background: #FFFFFF;
    border: 2px solid #DBDADE;
    border-radius: 8px;
    padding: 24px;
    cursor: pointer;
    transition: all 0.2s;
    display: flex;
    gap: 20px;
    min-height: 100px;
    width: 100%;
  }
  
  .alternative-card-full:hover {
    border-color: #6E63E8;
    box-shadow: 0 4px 12px rgba(110,99,232,0.15);
    transform: translateY(-2px);
  }
  
  .alternative-label {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    background: #F3F2F7;
    border-radius: 50%;
    font-size: 16px;
    font-weight: 700;
    color: #5D596C;
    flex-shrink: 0;
  }
  
  .alternative-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
  
  .alternative-text-full {
    font-size: 15px;
    line-height: 1.8;
    color: #5D596C;
  }
  
  .alternative-table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 8px;
  }
  
  .alternative-table th,
  .alternative-table td {
    padding: 8px 12px;
    text-align: left;
    border: 1px solid #E8E8E8;
    font-size: 14px;
  }
  
  .alternative-table th {
    background: #F8F8F8;
    font-weight: 600;
    color: #5D596C;
  }
  
  .alternative-table td {
    color: #6E6B7B;
  }
  
  .alternative-code {
    background: #F8F8F8;
    border: 1px solid #E8E8E8;
    border-radius: 6px;
    padding: 16px;
    font-family: 'Courier New', monospace;
    font-size: 14px;
    line-height: 1.6;
    color: #5D596C;
    overflow-x: auto;
    margin-top: 8px;
  }
  
  .alternative-list {
    margin: 8px 0 0 0;
    padding-left: 20px;
  }
  
  .alternative-list li {
    margin-bottom: 8px;
    line-height: 1.6;
    color: #6E6B7B;
  }
  
  .alternative-quote {
    background: #F3F2F7;
    border-left: 4px solid #6E63E8;
    padding: 16px;
    border-radius: 6px;
    font-style: italic;
    color: #5D596C;
    margin-top: 8px;
  }
  
  @media (max-width: 767px) {
    .template3-container {
      padding: 16px;
    }
    
    .template3-card {
      padding: 16px;
      margin-bottom: 16px;
    }
    
    .alternative-card-full {
      padding: 16px;
      gap: 16px;
      flex-direction: column;
    }
    
    .alternative-label {
      width: 36px;
      height: 36px;
      font-size: 14px;
    }
  }
</style>
`,e={render:()=>`
    ${a}
    <div class="template3-container">
      <div class="template3-row">
        <div class="template3-col">
          <div class="template3-card">
            <div class="question-content-area">
              <strong>Questão 1:</strong> Leia as afirmações sobre o sistema solar e escolha a alternativa correta.
            </div>
          </div>
          
          <div class="alternatives-grid-fullwidth">
            <div class="alternative-card-full">
              <span class="alternative-label">A</span>
              <div class="alternative-content">
                <span class="alternative-text-full">
                  O sistema solar é composto por oito planetas que orbitam o Sol em trajetórias elípticas.
                </span>
              </div>
            </div>
            <div class="alternative-card-full">
              <span class="alternative-label">B</span>
              <div class="alternative-content">
                <span class="alternative-text-full">
                  Todos os planetas do sistema solar possuem anéis visíveis similares aos de Saturno.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `},s={render:()=>`
    ${a}
    <div class="template3-container">
      <div class="template3-row">
        <div class="template3-col">
          <div class="template3-card">
            <div class="question-content-area">
              <strong>Questão 2:</strong> Qual das alternativas explica corretamente o processo de fotossíntese e sua importância para os ecossistemas?
            </div>
          </div>
          
          <div class="alternatives-grid-fullwidth">
            <div class="alternative-card-full">
              <span class="alternative-label">A</span>
              <div class="alternative-content">
                <span class="alternative-text-full">
                  A fotossíntese é o processo pelo qual as plantas verdes, algas e algumas bactérias convertem 
                  energia luminosa do sol em energia química armazenada na forma de glicose. Durante este processo, 
                  a clorofila presente nas folhas captura a luz solar e utiliza essa energia para combinar dióxido 
                  de carbono (CO₂) absorvido do ar com água (H₂O) absorvida pelas raízes, produzindo glicose 
                  (C₆H₁₂O₆) e liberando oxigênio (O₂) como subproduto. Este processo é fundamental para a vida na 
                  Terra, pois fornece a base da cadeia alimentar e produz o oxigênio que respiramos.
                </span>
              </div>
            </div>
            <div class="alternative-card-full">
              <span class="alternative-label">B</span>
              <div class="alternative-content">
                <span class="alternative-text-full">
                  A fotossíntese é um processo de respiração celular onde as plantas consomem oxigênio e liberam 
                  dióxido de carbono durante a noite. As folhas verdes absorvem energia térmica do solo e utilizam 
                  essa energia para quebrar moléculas de água em hidrogênio e oxigênio. O hidrogênio é então 
                  combinado com nitrogênio do ar para formar proteínas, enquanto o oxigênio é liberado. Este 
                  processo ocorre principalmente durante a noite quando a temperatura está mais baixa, permitindo 
                  que as plantas cresçam e se desenvolvam adequadamente.
                </span>
              </div>
            </div>
            <div class="alternative-card-full">
              <span class="alternative-label">C</span>
              <div class="alternative-content">
                <span class="alternative-text-full">
                  A fotossíntese é um mecanismo de defesa das plantas contra predadores herbívoros. Quando uma 
                  planta detecta a presença de um animal que pode comê-la, ela ativa rapidamente o processo 
                  fotossintético para produzir substâncias químicas tóxicas que afastam o predador. A luz solar 
                  serve como sinal de ativação para este mecanismo de defesa, e a clorofila atua como um sensor 
                  que detecta mudanças na intensidade luminosa causadas pela sombra do animal se aproximando.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `},t={render:()=>`
    ${a}
    <div class="template3-container">
      <div class="template3-row">
        <div class="template3-col">
          <div class="template3-card">
            <div class="question-content-area">
              <strong>Questão 3:</strong> Observe os dados de população e identifique qual alternativa apresenta informações corretas.
            </div>
          </div>
          
          <div class="alternatives-grid-fullwidth">
            <div class="alternative-card-full">
              <span class="alternative-label">A</span>
              <div class="alternative-content">
                <span class="alternative-text-full"><strong>População das Regiões Brasileiras (2020)</strong></span>
                <table class="alternative-table">
                  <thead>
                    <tr>
                      <th>Região</th>
                      <th>População</th>
                      <th>% do Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Sudeste</td>
                      <td>89.012.240</td>
                      <td>42,1%</td>
                    </tr>
                    <tr>
                      <td>Nordeste</td>
                      <td>57.667.842</td>
                      <td>27,3%</td>
                    </tr>
                    <tr>
                      <td>Sul</td>
                      <td>30.192.315</td>
                      <td>14,3%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div class="alternative-card-full">
              <span class="alternative-label">B</span>
              <div class="alternative-content">
                <span class="alternative-text-full"><strong>População das Regiões Brasileiras (2020) - Dados Incorretos</strong></span>
                <table class="alternative-table">
                  <thead>
                    <tr>
                      <th>Região</th>
                      <th>População</th>
                      <th>% do Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Norte</td>
                      <td>95.000.000</td>
                      <td>55,0%</td>
                    </tr>
                    <tr>
                      <td>Centro-Oeste</td>
                      <td>78.000.000</td>
                      <td>35,0%</td>
                    </tr>
                    <tr>
                      <td>Sul</td>
                      <td>5.000.000</td>
                      <td>2,5%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `},n={render:()=>`
    ${a}
    <div class="template3-container">
      <div class="template3-row">
        <div class="template3-col">
          <div class="template3-card">
            <div class="question-content-area">
              <strong>Questão 4:</strong> Qual dos códigos Python abaixo calcula corretamente a soma dos números de 1 a 10?
            </div>
          </div>
          
          <div class="alternatives-grid-fullwidth">
            <div class="alternative-card-full">
              <span class="alternative-label">A</span>
              <div class="alternative-content">
                <span class="alternative-text-full"><strong>Código A - Loop For</strong></span>
                <div class="alternative-code">soma = 0
for i in range(1, 11):
    soma = soma + i
print(f"A soma é: {soma}")</div>
                <span class="alternative-text-full" style="font-size: 13px; color: #6E6B7B;">
                  Este código utiliza um loop for para iterar de 1 a 10 e acumula a soma.
                </span>
              </div>
            </div>
            <div class="alternative-card-full">
              <span class="alternative-label">B</span>
              <div class="alternative-content">
                <span class="alternative-text-full"><strong>Código B - While Loop</strong></span>
                <div class="alternative-code">soma = 0
i = 1
while i < 10:
    soma = soma + i
    i = i + 1
print(f"A soma é: {soma}")</div>
                <span class="alternative-text-full" style="font-size: 13px; color: #6E6B7B;">
                  Este código usa while mas tem erro: não inclui o número 10 na soma.
                </span>
              </div>
            </div>
            <div class="alternative-card-full">
              <span class="alternative-label">C</span>
              <div class="alternative-content">
                <span class="alternative-text-full"><strong>Código C - Sum Function</strong></span>
                <div class="alternative-code">numeros = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
soma = sum(numeros)
print(f"A soma é: {soma}")</div>
                <span class="alternative-text-full" style="font-size: 13px; color: #6E6B7B;">
                  Este código usa a função sum() do Python com uma lista de números.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `},o={render:()=>`
    ${a}
    <div class="template3-container">
      <div class="template3-row">
        <div class="template3-col">
          <div class="template3-card">
            <div class="question-content-area">
              <strong>Questão 5:</strong> Qual fórmula representa corretamente a equação de segundo grau e sua resolução por Bhaskara?
            </div>
          </div>
          
          <div class="alternatives-grid-fullwidth">
            <div class="alternative-card-full">
              <span class="alternative-label">A</span>
              <div class="alternative-content">
                <span class="alternative-text-full"><strong>Fórmula de Bhaskara Completa</strong></span>
                <div class="alternative-code">Equação: ax² + bx + c = 0

Onde:
  a ≠ 0 (coeficiente de x²)
  b = coeficiente de x
  c = termo independente

Discriminante (Δ):
  Δ = b² - 4ac

Raízes:
  x₁ = (-b + √Δ) / 2a
  x₂ = (-b - √Δ) / 2a

Condições:
  Δ > 0 → duas raízes reais distintas
  Δ = 0 → duas raízes reais iguais
  Δ < 0 → não há raízes reais</div>
              </div>
            </div>
            <div class="alternative-card-full">
              <span class="alternative-label">B</span>
              <div class="alternative-content">
                <span class="alternative-text-full"><strong>Fórmula Incorreta</strong></span>
                <div class="alternative-code">Equação: ax + b = 0

Solução:
  x = -b / a

Esta é a fórmula para equação de primeiro grau,
não de segundo grau.</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `},i={render:()=>`
    ${a}
    <div class="template3-container">
      <div class="template3-row">
        <div class="template3-col">
          <div class="template3-card">
            <div class="question-content-area">
              <strong>Questão 6:</strong> Qual alternativa lista corretamente as características dos seres vivos?
            </div>
          </div>
          
          <div class="alternatives-grid-fullwidth">
            <div class="alternative-card-full">
              <span class="alternative-label">A</span>
              <div class="alternative-content">
                <span class="alternative-text-full"><strong>Características dos Seres Vivos - Correto</strong></span>
                <ul class="alternative-list">
                  <li><strong>Organização celular:</strong> Todos os seres vivos são compostos por células</li>
                  <li><strong>Metabolismo:</strong> Realizam reações químicas para obtenção de energia</li>
                  <li><strong>Crescimento:</strong> Aumentam de tamanho ao longo do tempo</li>
                  <li><strong>Reprodução:</strong> Capacidade de gerar descendentes</li>
                  <li><strong>Resposta a estímulos:</strong> Reagem a mudanças no ambiente</li>
                  <li><strong>Evolução:</strong> Sofrem modificações ao longo das gerações</li>
                  <li><strong>Homeostase:</strong> Mantêm equilíbrio interno constante</li>
                </ul>
              </div>
            </div>
            <div class="alternative-card-full">
              <span class="alternative-label">B</span>
              <div class="alternative-content">
                <span class="alternative-text-full"><strong>Características dos Seres Vivos - Incorreto</strong></span>
                <ul class="alternative-list">
                  <li><strong>Fotossíntese obrigatória:</strong> Todos os seres vivos realizam fotossíntese</li>
                  <li><strong>Presença de clorofila:</strong> Todos possuem pigmento verde</li>
                  <li><strong>Vida eterna:</strong> Seres vivos não morrem naturalmente</li>
                  <li><strong>Tamanho microscópico:</strong> Todos são invisíveis a olho nu</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `},l={render:()=>`
    ${a}
    <div class="template3-container">
      <div class="template3-row">
        <div class="template3-col">
          <div class="template3-card">
            <div class="question-content-area">
              <strong>Questão 7:</strong> Qual trecho literário utiliza figuras de linguagem de forma mais expressiva?
            </div>
          </div>
          
          <div class="alternatives-grid-fullwidth">
            <div class="alternative-card-full">
              <span class="alternative-label">A</span>
              <div class="alternative-content">
                <span class="alternative-text-full"><strong>Trecho 1 - "Dom Casmurro" (Machado de Assis)</strong></span>
                <div class="alternative-quote">
                  "Capitu deu-me as costas, voltando-se para o espelhinho. Peguei-lhe dos cabelos, colhi-os todos 
                  e entrei a alisá-los com o pente, desde a raiz até as pontas. Que fios de seda! Não era a primeira 
                  vez que eu os penteava; não digo que não tivesse receio de algum escrúpulo familiar; mas tudo 
                  calamos. Era uma festa da minha imaginação; os fios de ouro, os arames dourados, a mina de diamantes..."
                </div>
                <span class="alternative-text-full" style="font-size: 13px; color: #6E6B7B; margin-top: 8px;">
                  Este trecho utiliza metáforas ("fios de ouro", "mina de diamantes") e metonímia para expressar 
                  a beleza e o valor atribuído aos cabelos de Capitu pelo narrador.
                </span>
              </div>
            </div>
            <div class="alternative-card-full">
              <span class="alternative-label">B</span>
              <div class="alternative-content">
                <span class="alternative-text-full"><strong>Trecho 2 - Texto Descritivo Simples</strong></span>
                <div class="alternative-quote">
                  "Maria estava na frente do espelho. João pegou o pente e começou a pentear os cabelos dela. 
                  Os cabelos eram longos e macios. Eles eram de cor castanha. João gostava muito dos cabelos de Maria."
                </div>
                <span class="alternative-text-full" style="font-size: 13px; color: #6E6B7B; margin-top: 8px;">
                  Este trecho usa linguagem denotativa sem figuras de linguagem elaboradas, apresentando uma 
                  descrição literal e objetiva da cena.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `},r={render:()=>`
    ${a}
    <style>
      .mobile-demo {
        background: #F3F2F7;
        padding: 12px;
        border-radius: 6px;
        margin-bottom: 16px;
        text-align: center;
        font-size: 13px;
        font-weight: 600;
        color: #6E6B7B;
      }
      
      .layout-advantages {
        background: #E8F5E9;
        border-left: 4px solid #28C76F;
        padding: 16px;
        border-radius: 6px;
        margin-bottom: 16px;
      }
      
      .layout-advantages h4 {
        font-size: 14px;
        font-weight: 600;
        color: #2E7D32;
        margin: 0 0 8px 0;
      }
      
      .layout-advantages ul {
        margin: 0;
        padding-left: 20px;
      }
      
      .layout-advantages li {
        font-size: 13px;
        color: #558B2F;
        margin-bottom: 4px;
      }
    </style>
    <div class="template3-container">
      <div class="mobile-demo">
        <i class="bi bi-phone" style="margin-right: 8px;"></i>
        Template3: Sempre 1 coluna - Otimizado para mobile e acessibilidade
      </div>
      
      <div class="layout-advantages">
        <h4><i class="bi bi-check-circle-fill" style="margin-right: 6px;"></i>Vantagens do Layout Full-Width</h4>
        <ul>
          <li>✅ Comportamento consistente em todos os dispositivos</li>
          <li>✅ Melhor para leitores de tela (navegação linear)</li>
          <li>✅ Ideal para textos longos e estruturas complexas</li>
          <li>✅ Não requer reorganização em mobile</li>
          <li>✅ Foco na leitura sequencial vertical</li>
        </ul>
      </div>
      
      <div class="template3-row">
        <div class="template3-col">
          <div class="template3-card">
            <div class="question-content-area">
              <strong>Questão Mobile-Optimized:</strong> Template3 mantém layout consistente em todas as resoluções.
            </div>
            <div class="question-content-area">
              • <strong>Desktop/Tablet/Mobile:</strong> Sempre 1 coluna (100% width)<br>
              • <strong>Padding responsivo:</strong> 24px desktop → 16px mobile<br>
              • <strong>Label flexível:</strong> 40px desktop → 36px mobile<br>
              • <strong>Acessibilidade:</strong> Navegação linear ideal para leitores de tela
            </div>
          </div>
          
          <div class="alternatives-grid-fullwidth">
            <div class="alternative-card-full">
              <span class="alternative-label">A</span>
              <div class="alternative-content">
                <span class="alternative-text-full">
                  <strong>Alternativa A:</strong> Esta alternativa ocupa 100% da largura disponível em qualquer 
                  dispositivo, garantindo consistência visual e facilidade de leitura tanto em desktop quanto em 
                  smartphones. O padding se ajusta automaticamente para otimizar o espaço em telas menores.
                </span>
              </div>
            </div>
            <div class="alternative-card-full">
              <span class="alternative-label">B</span>
              <div class="alternative-content">
                <span class="alternative-text-full">
                  <strong>Alternativa B:</strong> O layout vertical elimina a necessidade de reorganização de colunas 
                  em diferentes breakpoints, resultando em código mais simples e manutenção mais fácil. A experiência 
                  do usuário permanece idêntica independentemente do dispositivo utilizado.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `};var d,c,v;e.parameters={...e.parameters,docs:{...(d=e.parameters)==null?void 0:d.docs,source:{originalSource:`{
  render: () => \`
    \${template3Styles}
    <div class="template3-container">
      <div class="template3-row">
        <div class="template3-col">
          <div class="template3-card">
            <div class="question-content-area">
              <strong>Questão 1:</strong> Leia as afirmações sobre o sistema solar e escolha a alternativa correta.
            </div>
          </div>
          
          <div class="alternatives-grid-fullwidth">
            <div class="alternative-card-full">
              <span class="alternative-label">A</span>
              <div class="alternative-content">
                <span class="alternative-text-full">
                  O sistema solar é composto por oito planetas que orbitam o Sol em trajetórias elípticas.
                </span>
              </div>
            </div>
            <div class="alternative-card-full">
              <span class="alternative-label">B</span>
              <div class="alternative-content">
                <span class="alternative-text-full">
                  Todos os planetas do sistema solar possuem anéis visíveis similares aos de Saturno.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  \`
}`,...(v=(c=e.parameters)==null?void 0:c.docs)==null?void 0:v.source}}};var p,m,u;s.parameters={...s.parameters,docs:{...(p=s.parameters)==null?void 0:p.docs,source:{originalSource:`{
  render: () => \`
    \${template3Styles}
    <div class="template3-container">
      <div class="template3-row">
        <div class="template3-col">
          <div class="template3-card">
            <div class="question-content-area">
              <strong>Questão 2:</strong> Qual das alternativas explica corretamente o processo de fotossíntese e sua importância para os ecossistemas?
            </div>
          </div>
          
          <div class="alternatives-grid-fullwidth">
            <div class="alternative-card-full">
              <span class="alternative-label">A</span>
              <div class="alternative-content">
                <span class="alternative-text-full">
                  A fotossíntese é o processo pelo qual as plantas verdes, algas e algumas bactérias convertem 
                  energia luminosa do sol em energia química armazenada na forma de glicose. Durante este processo, 
                  a clorofila presente nas folhas captura a luz solar e utiliza essa energia para combinar dióxido 
                  de carbono (CO₂) absorvido do ar com água (H₂O) absorvida pelas raízes, produzindo glicose 
                  (C₆H₁₂O₆) e liberando oxigênio (O₂) como subproduto. Este processo é fundamental para a vida na 
                  Terra, pois fornece a base da cadeia alimentar e produz o oxigênio que respiramos.
                </span>
              </div>
            </div>
            <div class="alternative-card-full">
              <span class="alternative-label">B</span>
              <div class="alternative-content">
                <span class="alternative-text-full">
                  A fotossíntese é um processo de respiração celular onde as plantas consomem oxigênio e liberam 
                  dióxido de carbono durante a noite. As folhas verdes absorvem energia térmica do solo e utilizam 
                  essa energia para quebrar moléculas de água em hidrogênio e oxigênio. O hidrogênio é então 
                  combinado com nitrogênio do ar para formar proteínas, enquanto o oxigênio é liberado. Este 
                  processo ocorre principalmente durante a noite quando a temperatura está mais baixa, permitindo 
                  que as plantas cresçam e se desenvolvam adequadamente.
                </span>
              </div>
            </div>
            <div class="alternative-card-full">
              <span class="alternative-label">C</span>
              <div class="alternative-content">
                <span class="alternative-text-full">
                  A fotossíntese é um mecanismo de defesa das plantas contra predadores herbívoros. Quando uma 
                  planta detecta a presença de um animal que pode comê-la, ela ativa rapidamente o processo 
                  fotossintético para produzir substâncias químicas tóxicas que afastam o predador. A luz solar 
                  serve como sinal de ativação para este mecanismo de defesa, e a clorofila atua como um sensor 
                  que detecta mudanças na intensidade luminosa causadas pela sombra do animal se aproximando.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  \`
}`,...(u=(m=s.parameters)==null?void 0:m.docs)==null?void 0:u.source}}};var x,g,f;t.parameters={...t.parameters,docs:{...(x=t.parameters)==null?void 0:x.docs,source:{originalSource:`{
  render: () => \`
    \${template3Styles}
    <div class="template3-container">
      <div class="template3-row">
        <div class="template3-col">
          <div class="template3-card">
            <div class="question-content-area">
              <strong>Questão 3:</strong> Observe os dados de população e identifique qual alternativa apresenta informações corretas.
            </div>
          </div>
          
          <div class="alternatives-grid-fullwidth">
            <div class="alternative-card-full">
              <span class="alternative-label">A</span>
              <div class="alternative-content">
                <span class="alternative-text-full"><strong>População das Regiões Brasileiras (2020)</strong></span>
                <table class="alternative-table">
                  <thead>
                    <tr>
                      <th>Região</th>
                      <th>População</th>
                      <th>% do Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Sudeste</td>
                      <td>89.012.240</td>
                      <td>42,1%</td>
                    </tr>
                    <tr>
                      <td>Nordeste</td>
                      <td>57.667.842</td>
                      <td>27,3%</td>
                    </tr>
                    <tr>
                      <td>Sul</td>
                      <td>30.192.315</td>
                      <td>14,3%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div class="alternative-card-full">
              <span class="alternative-label">B</span>
              <div class="alternative-content">
                <span class="alternative-text-full"><strong>População das Regiões Brasileiras (2020) - Dados Incorretos</strong></span>
                <table class="alternative-table">
                  <thead>
                    <tr>
                      <th>Região</th>
                      <th>População</th>
                      <th>% do Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Norte</td>
                      <td>95.000.000</td>
                      <td>55,0%</td>
                    </tr>
                    <tr>
                      <td>Centro-Oeste</td>
                      <td>78.000.000</td>
                      <td>35,0%</td>
                    </tr>
                    <tr>
                      <td>Sul</td>
                      <td>5.000.000</td>
                      <td>2,5%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  \`
}`,...(f=(g=t.parameters)==null?void 0:g.docs)==null?void 0:f.source}}};var b,E,h;n.parameters={...n.parameters,docs:{...(b=n.parameters)==null?void 0:b.docs,source:{originalSource:`{
  render: () => \`
    \${template3Styles}
    <div class="template3-container">
      <div class="template3-row">
        <div class="template3-col">
          <div class="template3-card">
            <div class="question-content-area">
              <strong>Questão 4:</strong> Qual dos códigos Python abaixo calcula corretamente a soma dos números de 1 a 10?
            </div>
          </div>
          
          <div class="alternatives-grid-fullwidth">
            <div class="alternative-card-full">
              <span class="alternative-label">A</span>
              <div class="alternative-content">
                <span class="alternative-text-full"><strong>Código A - Loop For</strong></span>
                <div class="alternative-code">soma = 0
for i in range(1, 11):
    soma = soma + i
print(f"A soma é: {soma}")</div>
                <span class="alternative-text-full" style="font-size: 13px; color: #6E6B7B;">
                  Este código utiliza um loop for para iterar de 1 a 10 e acumula a soma.
                </span>
              </div>
            </div>
            <div class="alternative-card-full">
              <span class="alternative-label">B</span>
              <div class="alternative-content">
                <span class="alternative-text-full"><strong>Código B - While Loop</strong></span>
                <div class="alternative-code">soma = 0
i = 1
while i < 10:
    soma = soma + i
    i = i + 1
print(f"A soma é: {soma}")</div>
                <span class="alternative-text-full" style="font-size: 13px; color: #6E6B7B;">
                  Este código usa while mas tem erro: não inclui o número 10 na soma.
                </span>
              </div>
            </div>
            <div class="alternative-card-full">
              <span class="alternative-label">C</span>
              <div class="alternative-content">
                <span class="alternative-text-full"><strong>Código C - Sum Function</strong></span>
                <div class="alternative-code">numeros = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
soma = sum(numeros)
print(f"A soma é: {soma}")</div>
                <span class="alternative-text-full" style="font-size: 13px; color: #6E6B7B;">
                  Este código usa a função sum() do Python com uma lista de números.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  \`
}`,...(h=(E=n.parameters)==null?void 0:E.docs)==null?void 0:h.source}}};var F,q,z;o.parameters={...o.parameters,docs:{...(F=o.parameters)==null?void 0:F.docs,source:{originalSource:`{
  render: () => \`
    \${template3Styles}
    <div class="template3-container">
      <div class="template3-row">
        <div class="template3-col">
          <div class="template3-card">
            <div class="question-content-area">
              <strong>Questão 5:</strong> Qual fórmula representa corretamente a equação de segundo grau e sua resolução por Bhaskara?
            </div>
          </div>
          
          <div class="alternatives-grid-fullwidth">
            <div class="alternative-card-full">
              <span class="alternative-label">A</span>
              <div class="alternative-content">
                <span class="alternative-text-full"><strong>Fórmula de Bhaskara Completa</strong></span>
                <div class="alternative-code">Equação: ax² + bx + c = 0

Onde:
  a ≠ 0 (coeficiente de x²)
  b = coeficiente de x
  c = termo independente

Discriminante (Δ):
  Δ = b² - 4ac

Raízes:
  x₁ = (-b + √Δ) / 2a
  x₂ = (-b - √Δ) / 2a

Condições:
  Δ > 0 → duas raízes reais distintas
  Δ = 0 → duas raízes reais iguais
  Δ < 0 → não há raízes reais</div>
              </div>
            </div>
            <div class="alternative-card-full">
              <span class="alternative-label">B</span>
              <div class="alternative-content">
                <span class="alternative-text-full"><strong>Fórmula Incorreta</strong></span>
                <div class="alternative-code">Equação: ax + b = 0

Solução:
  x = -b / a

Esta é a fórmula para equação de primeiro grau,
não de segundo grau.</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  \`
}`,...(z=(q=o.parameters)==null?void 0:q.docs)==null?void 0:z.source}}};var A,C,y;i.parameters={...i.parameters,docs:{...(A=i.parameters)==null?void 0:A.docs,source:{originalSource:`{
  render: () => \`
    \${template3Styles}
    <div class="template3-container">
      <div class="template3-row">
        <div class="template3-col">
          <div class="template3-card">
            <div class="question-content-area">
              <strong>Questão 6:</strong> Qual alternativa lista corretamente as características dos seres vivos?
            </div>
          </div>
          
          <div class="alternatives-grid-fullwidth">
            <div class="alternative-card-full">
              <span class="alternative-label">A</span>
              <div class="alternative-content">
                <span class="alternative-text-full"><strong>Características dos Seres Vivos - Correto</strong></span>
                <ul class="alternative-list">
                  <li><strong>Organização celular:</strong> Todos os seres vivos são compostos por células</li>
                  <li><strong>Metabolismo:</strong> Realizam reações químicas para obtenção de energia</li>
                  <li><strong>Crescimento:</strong> Aumentam de tamanho ao longo do tempo</li>
                  <li><strong>Reprodução:</strong> Capacidade de gerar descendentes</li>
                  <li><strong>Resposta a estímulos:</strong> Reagem a mudanças no ambiente</li>
                  <li><strong>Evolução:</strong> Sofrem modificações ao longo das gerações</li>
                  <li><strong>Homeostase:</strong> Mantêm equilíbrio interno constante</li>
                </ul>
              </div>
            </div>
            <div class="alternative-card-full">
              <span class="alternative-label">B</span>
              <div class="alternative-content">
                <span class="alternative-text-full"><strong>Características dos Seres Vivos - Incorreto</strong></span>
                <ul class="alternative-list">
                  <li><strong>Fotossíntese obrigatória:</strong> Todos os seres vivos realizam fotossíntese</li>
                  <li><strong>Presença de clorofila:</strong> Todos possuem pigmento verde</li>
                  <li><strong>Vida eterna:</strong> Seres vivos não morrem naturalmente</li>
                  <li><strong>Tamanho microscópico:</strong> Todos são invisíveis a olho nu</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  \`
}`,...(y=(C=i.parameters)==null?void 0:C.docs)==null?void 0:y.source}}};var B,w,D;l.parameters={...l.parameters,docs:{...(B=l.parameters)==null?void 0:B.docs,source:{originalSource:`{
  render: () => \`
    \${template3Styles}
    <div class="template3-container">
      <div class="template3-row">
        <div class="template3-col">
          <div class="template3-card">
            <div class="question-content-area">
              <strong>Questão 7:</strong> Qual trecho literário utiliza figuras de linguagem de forma mais expressiva?
            </div>
          </div>
          
          <div class="alternatives-grid-fullwidth">
            <div class="alternative-card-full">
              <span class="alternative-label">A</span>
              <div class="alternative-content">
                <span class="alternative-text-full"><strong>Trecho 1 - "Dom Casmurro" (Machado de Assis)</strong></span>
                <div class="alternative-quote">
                  "Capitu deu-me as costas, voltando-se para o espelhinho. Peguei-lhe dos cabelos, colhi-os todos 
                  e entrei a alisá-los com o pente, desde a raiz até as pontas. Que fios de seda! Não era a primeira 
                  vez que eu os penteava; não digo que não tivesse receio de algum escrúpulo familiar; mas tudo 
                  calamos. Era uma festa da minha imaginação; os fios de ouro, os arames dourados, a mina de diamantes..."
                </div>
                <span class="alternative-text-full" style="font-size: 13px; color: #6E6B7B; margin-top: 8px;">
                  Este trecho utiliza metáforas ("fios de ouro", "mina de diamantes") e metonímia para expressar 
                  a beleza e o valor atribuído aos cabelos de Capitu pelo narrador.
                </span>
              </div>
            </div>
            <div class="alternative-card-full">
              <span class="alternative-label">B</span>
              <div class="alternative-content">
                <span class="alternative-text-full"><strong>Trecho 2 - Texto Descritivo Simples</strong></span>
                <div class="alternative-quote">
                  "Maria estava na frente do espelho. João pegou o pente e começou a pentear os cabelos dela. 
                  Os cabelos eram longos e macios. Eles eram de cor castanha. João gostava muito dos cabelos de Maria."
                </div>
                <span class="alternative-text-full" style="font-size: 13px; color: #6E6B7B; margin-top: 8px;">
                  Este trecho usa linguagem denotativa sem figuras de linguagem elaboradas, apresentando uma 
                  descrição literal e objetiva da cena.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  \`
}`,...(D=(w=l.parameters)==null?void 0:w.docs)==null?void 0:D.source}}};var T,S,O;r.parameters={...r.parameters,docs:{...(T=r.parameters)==null?void 0:T.docs,source:{originalSource:`{
  render: () => \`
    \${template3Styles}
    <style>
      .mobile-demo {
        background: #F3F2F7;
        padding: 12px;
        border-radius: 6px;
        margin-bottom: 16px;
        text-align: center;
        font-size: 13px;
        font-weight: 600;
        color: #6E6B7B;
      }
      
      .layout-advantages {
        background: #E8F5E9;
        border-left: 4px solid #28C76F;
        padding: 16px;
        border-radius: 6px;
        margin-bottom: 16px;
      }
      
      .layout-advantages h4 {
        font-size: 14px;
        font-weight: 600;
        color: #2E7D32;
        margin: 0 0 8px 0;
      }
      
      .layout-advantages ul {
        margin: 0;
        padding-left: 20px;
      }
      
      .layout-advantages li {
        font-size: 13px;
        color: #558B2F;
        margin-bottom: 4px;
      }
    </style>
    <div class="template3-container">
      <div class="mobile-demo">
        <i class="bi bi-phone" style="margin-right: 8px;"></i>
        Template3: Sempre 1 coluna - Otimizado para mobile e acessibilidade
      </div>
      
      <div class="layout-advantages">
        <h4><i class="bi bi-check-circle-fill" style="margin-right: 6px;"></i>Vantagens do Layout Full-Width</h4>
        <ul>
          <li>✅ Comportamento consistente em todos os dispositivos</li>
          <li>✅ Melhor para leitores de tela (navegação linear)</li>
          <li>✅ Ideal para textos longos e estruturas complexas</li>
          <li>✅ Não requer reorganização em mobile</li>
          <li>✅ Foco na leitura sequencial vertical</li>
        </ul>
      </div>
      
      <div class="template3-row">
        <div class="template3-col">
          <div class="template3-card">
            <div class="question-content-area">
              <strong>Questão Mobile-Optimized:</strong> Template3 mantém layout consistente em todas as resoluções.
            </div>
            <div class="question-content-area">
              • <strong>Desktop/Tablet/Mobile:</strong> Sempre 1 coluna (100% width)<br>
              • <strong>Padding responsivo:</strong> 24px desktop → 16px mobile<br>
              • <strong>Label flexível:</strong> 40px desktop → 36px mobile<br>
              • <strong>Acessibilidade:</strong> Navegação linear ideal para leitores de tela
            </div>
          </div>
          
          <div class="alternatives-grid-fullwidth">
            <div class="alternative-card-full">
              <span class="alternative-label">A</span>
              <div class="alternative-content">
                <span class="alternative-text-full">
                  <strong>Alternativa A:</strong> Esta alternativa ocupa 100% da largura disponível em qualquer 
                  dispositivo, garantindo consistência visual e facilidade de leitura tanto em desktop quanto em 
                  smartphones. O padding se ajusta automaticamente para otimizar o espaço em telas menores.
                </span>
              </div>
            </div>
            <div class="alternative-card-full">
              <span class="alternative-label">B</span>
              <div class="alternative-content">
                <span class="alternative-text-full">
                  <strong>Alternativa B:</strong> O layout vertical elimina a necessidade de reorganização de colunas 
                  em diferentes breakpoints, resultando em código mais simples e manutenção mais fácil. A experiência 
                  do usuário permanece idêntica independentemente do dispositivo utilizado.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  \`
}`,...(O=(S=r.parameters)==null?void 0:S.docs)==null?void 0:O.source}}};const k=["Default","TextosLongos","ComTabelas","ComCodigo","ComFormulasComplexas","ComListas","ComCitacoes","MobileOptimized"];export{l as ComCitacoes,n as ComCodigo,o as ComFormulasComplexas,i as ComListas,t as ComTabelas,e as Default,r as MobileOptimized,s as TextosLongos,k as __namedExportsOrder,Q as default};
