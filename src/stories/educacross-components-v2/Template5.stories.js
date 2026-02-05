/**
 * Template5 - Hybrid Layout Component (Same as Template1)
 * =========================================
 * 
 * Layout template identical to Template1: 2 content cards + 4-column alternatives grid.
 * Provides alternative naming/routing for same layout pattern.
 * 
 * @component Template5
 * @source educacross-frontoffice\src\components\evaluations\questionDetail\templates\Template5.vue
 */

export default {
  title: 'Front-office/Templates/Template5',
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# Template5

Template idêntico ao Template1: layout vertical com 2 cards de conteúdo e grid 4 colunas de alternativas.

## Quando usar

**Mesmo caso de uso do Template1:**
- **Avaliações padrão**: Questões de múltipla escolha com 4 alternativas curtas
- **Banco de questões**: Preview estruturado de questões
- **Impressão PDF**: Layout otimizado para exportação
- **Compatibilidade**: Sistema legado que referencia Template5 como alias

## Por que Template5 existe?

Template5 é **idêntico ao Template1** no código-fonte. Sua existência se deve a:

1. **Migração de sistema**: Sistema antigo usava Template5, mantido para compatibilidade
2. **Roteamento**: Permite URLs/rotas diferentes para mesmo layout
3. **A/B Testing**: Facilita testes com nomes diferentes mantendo layout igual
4. **Organização**: Diferentes áreas do sistema podem preferir nomes distintos

## Diferença dos Outros Templates

| Template | Layout | Quando usar |
|----------|--------|-------------|
| **Template1** | 2 cards + grid 4 cols | Questões padrão múltipla escolha |
| **Template2** | 2 cards + grid 2 cols | Alternativas longas |
| **Template3** | 2 cards + 1 col full | Textos muito extensos |
| **Template4** | Split 50/50 | Material referência lado a lado |
| **Template5** | ✅ **Idêntico Template1** | Alias/compatibilidade |

## Recomendação

⚠️ **Use Template1 para novos projetos.** Template5 mantido apenas para compatibilidade com código legado.

## Variantes

As mesmas 8 variantes do Template1:

1. **Default**: Grid padrão 4 alternativas
2. **ComImagem**: Pizza SVG 3/4 colorida
3. **ComFormula**: Equação matemática monospace
4. **ComContexto**: Texto longo de apoio
5. **DuasAlternativas**: V ou F com 2 opções
6. **SeisAlternativas**: Grid 3×2 expandido
7. **AlternativasImagens**: SVG formas geométricas
8. **Responsive**: 4→2→1 cols adaptativo

## Características visuais

**Idênticas ao Template1:**
- Grid responsivo: 4 cols (lg) → 2 cols (md) → 1 col (sm)
- Cards padding 20px, border-radius 8px
- Alternatives min-height 120px
- Gap 16px horizontal, 24px vertical
- Match-height para altura igual
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
 * **IDÊNTICO AO TEMPLATE1**
 * 
 * Cores:
 * - Card background: #FFFFFF
 * - Body background: #F8F7FA
 * - Border color: #DBDADE
 * 
 * Dimensões:
 * - Container: 100% width
 * - Content cards: padding 20px, border-radius 8px
 * - Grid gap: 16px horizontal, 24px vertical
 * - Alternatives: cols 12 (mobile), 6 (tablet), 3 (desktop)
 * 
 * Responsividade:
 * - xs (<576px): 1 col alternativas
 * - sm (≥576px): 1 col alternativas  
 * - md (≥768px): 2 cols alternativas
 * - lg (≥992px): 4 cols alternativas
 */

// Reutiliza os mesmos estilos do Template1
const template5Styles = `
<style>
  .template5-container {
    background: #F8F7FA;
    min-height: 100vh;
    padding: 24px;
  }
  
  .template5-row {
    display: flex;
    flex-wrap: wrap;
    margin: -12px;
  }
  
  .template5-col {
    padding: 12px;
    width: 100%;
  }
  
  .template5-card {
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
    
    .template5-container {
      padding: 16px;
    }
    
    .template5-card {
      padding: 16px;
      margin-bottom: 16px;
    }
  }
</style>
`;

// Story: Default (idêntico Template1)
export const Default = {
  render: () => `
    ${template5Styles}
    <div style="background: #FFF8E1; padding: 16px; border-radius: 6px; margin: 24px; border-left: 4px solid #FF9800;">
      <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 8px;">
        <i class="bi bi-info-circle-fill" style="font-size: 20px; color: #FF9800;"></i>
        <strong style="font-size: 14px; color: #F57F17;">Template5 = Template1</strong>
      </div>
      <p style="font-size: 13px; color: #F57F17; margin: 0;">
        Este template é idêntico ao Template1. Mantido para compatibilidade com sistema legado.
        Use <strong>Template1</strong> para novos projetos.
      </p>
    </div>
    
    <div class="template5-container">
      <div class="template5-row">
        <div class="template5-col">
          <div class="template5-card">
            <div class="question-content-area">
              <strong>Questão 1:</strong> Quanto é 3/4 + 1/2?
            </div>
            <div class="question-content-area">
              Para resolver, converta as frações ao mesmo denominador.
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
  `
};

// Story: ComImagem (idêntico Template1)
export const ComImagem = {
  render: () => `
    ${template5Styles}
    <div class="template5-container">
      <div class="template5-row">
        <div class="template5-col">
          <div class="template5-card">
            <div class="question-content-area">
              <strong>Questão 2:</strong> Qual fração está representada pela parte colorida?
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
  `
};

// Story: ComFormula
export const ComFormula = {
  render: () => `
    ${template5Styles}
    <div class="template5-container">
      <div class="template5-row">
        <div class="template5-col">
          <div class="template5-card">
            <div class="question-content-area">
              <strong>Questão 3:</strong> Resolva a equação:
            </div>
            <div class="question-content-formula">
              2x + 5 = 13
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
  `
};

// Story: ComContexto
export const ComContexto = {
  render: () => `
    ${template5Styles}
    <div class="template5-container">
      <div class="template5-row">
        <div class="template5-col">
          <div class="template5-card">
            <div class="question-content-area">
              <strong>Questão 4:</strong> Leia o texto:
            </div>
          </div>
          
          <div class="template5-card">
            <div class="question-content-area">
              <p style="margin-bottom: 12px;">
                <em>"A fotossíntese converte energia luminosa em energia química. A clorofila 
                captura luz solar para converter CO₂ e H₂O em glicose (C₆H₁₂O₆) e oxigênio (O₂)."</em>
              </p>
              <p><strong>Qual é o principal produto da fotossíntese?</strong></p>
            </div>
          </div>
          
          <div class="alternatives-grid">
            <div class="alternative-card">
              <span class="alternative-label">A</span>
              <span class="alternative-text">CO₂</span>
            </div>
            <div class="alternative-card">
              <span class="alternative-label">B</span>
              <span class="alternative-text">O₂</span>
            </div>
            <div class="alternative-card">
              <span class="alternative-label">C</span>
              <span class="alternative-text">Glicose</span>
            </div>
            <div class="alternative-card">
              <span class="alternative-label">D</span>
              <span class="alternative-text">H₂O</span>
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
    ${template5Styles}
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
    <div class="template5-container">
      <div class="template5-row">
        <div class="template5-col">
          <div class="template5-card">
            <div class="question-content-area">
              <strong>Questão 5:</strong> A água ferve a 100°C ao nível do mar?
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
  `
};

// Story: SeisAlternativas
export const SeisAlternativas = {
  render: () => `
    ${template5Styles}
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
    <div class="template5-container">
      <div class="template5-row">
        <div class="template5-col">
          <div class="template5-card">
            <div class="question-content-area">
              <strong>Questão 6:</strong> Qual número é primo?
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
  `
};

// Story: AlternativasImagens
export const AlternativasImagens = {
  render: () => `
    ${template5Styles}
    <div class="template5-container">
      <div class="template5-row">
        <div class="template5-col">
          <div class="template5-card">
            <div class="question-content-area">
              <strong>Questão 7:</strong> Qual figura tem 4 lados iguais?
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
  `
};

// Story: Responsive
export const Responsive = {
  render: () => `
    ${template5Styles}
    <style>
      .alias-warning {
        background: #FFF8E1;
        border-left: 4px solid #FF9800;
        padding: 16px;
        border-radius: 6px;
        margin: 24px;
      }
      
      .alias-warning h4 {
        font-size: 14px;
        font-weight: 600;
        color: #F57F17;
        margin: 0 0 8px 0;
        display: flex;
        align-items: center;
        gap: 8px;
      }
      
      .alias-warning p {
        font-size: 13px;
        color: #F57F17;
        margin: 0;
        line-height: 1.6;
      }
    </style>
    <div class="alias-warning">
      <h4>
        <i class="bi bi-arrow-left-right"></i>
        Template5 → Template1 (Alias)
      </h4>
      <p>
        <strong>Comportamento responsivo idêntico ao Template1:</strong><br>
        • Desktop (≥992px): 4 colunas<br>
        • Tablet (768-991px): 2 colunas<br>
        • Mobile (<768px): 1 coluna<br><br>
        ⚠️ Use <strong>Template1</strong> em novos projetos. Template5 existe apenas para compatibilidade legado.
      </p>
    </div>
    
    <div class="template5-container">
      <div class="template5-row">
        <div class="template5-col">
          <div class="template5-card">
            <div class="question-content-area">
              <strong>Questão Responsiva:</strong> Comportamento idêntico ao Template1
            </div>
            <div class="question-content-area">
              Grid adapta automaticamente: 4 → 2 → 1 colunas
            </div>
          </div>
          
          <div class="alternatives-grid">
            <div class="alternative-card">
              <span class="alternative-label">A</span>
              <span class="alternative-text">Desktop: 4 colunas lado a lado</span>
            </div>
            <div class="alternative-card">
              <span class="alternative-label">B</span>
              <span class="alternative-text">Tablet: 2 colunas (2×2 grid)</span>
            </div>
            <div class="alternative-card">
              <span class="alternative-label">C</span>
              <span class="alternative-text">Mobile: 1 coluna empilhada</span>
            </div>
            <div class="alternative-card">
              <span class="alternative-label">D</span>
              <span class="alternative-text">Redimensione para testar</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
};
