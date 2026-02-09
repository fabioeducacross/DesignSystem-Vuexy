const L={title:"Educacross Components V2/Templates/Template10",tags:["autodocs"],parameters:{layout:"fullscreen",docs:{description:{component:`
# Template10

**⚠️ Template10 = Template8** (estrutura idêntica)

Template com header + split view mantido para compatibilidade.

## Relação com Template8

Template10 tem **estrutura IDÊNTICA ao Template8**:
- Header card full-width
- Split lg-6 + lg-6 (content left + alternatives right)
- Alternatives grid 2×2 (md-6)

**Por que existe Template10 separado?**
1. **Roteamento legado**: Sistema antigo referencia Template10
2. **Compatibilidade**: Manter ambos evita quebra de código existente
3. **Migração gradual**: Permite transição controlada Template10 → Template8
4. **Organização**: Diferentes contextos educacionais podem usar nomes distintos

## ⚠️ Recomendação

**Para NOVOS projetos, use Template8.**

Template10 mantido apenas para:
- Código legado que já referencia Template10
- Migração gradual de sistema antigo
- Compatibilidade com banco de dados existente

## Diferenças vs outros Templates

| Template | Structure | Use Case | Status |
|----------|-----------|----------|--------|
| **Template8** | Header + Split | Primary version | ✅ Usar em novos projetos |
| **Template10** | Header + Split | Alias Template8 | ⚠️ Legacy compatibility |
| **Template11** | Header + Split | Outro alias | ⚠️ Legacy compatibility |
| **Template4** | Split (sem header) | Split puro | Diferente (sem header) |

## Variantes (idênticas Template8)

1. **Default**: Header + split básico
2. **ComGrafico**: Header + gráfico left + análise right
3. **ComMapa**: Header + mapa left + perguntas right
4. **ComInstrucoes**: Header regras + atividade split
5. **ComComparacao**: Header intro + comparação split
6. **ComTimeline**: Header contexto + timeline split
7. **ComDashboard**: Header métricas + dados split
8. **Responsive**: Header + split empilha mobile

Consulte [Template8.stories.js](../Template8/Template8.stories.js) para documentação completa.
        `}}}},o=`
<style>
  .template10-container {
    background: #F8F7FA;
    min-height: 100vh;
    padding: 24px;
    max-width: 1400px;
    margin: 0 auto;
  }
  
  .template10-section {
    margin-bottom: 24px;
  }
  
  .template10-row {
    display: flex;
    flex-wrap: wrap;
    margin: -12px;
  }
  
  .template10-col {
    padding: 12px;
    width: 100%;
  }
  
  @media (min-width: 992px) {
    .template10-col-half {
      width: 50%;
    }
  }
  
  .template10-header {
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
  
  .template10-card {
    background: #FFFFFF;
    border: 1px solid #DBDADE;
    border-radius: 8px;
    padding: 20px;
    margin-bottom: 20px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.06);
    height: 100%;
  }
  
  .template10-card:last-child {
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
  }
  
  .alternative-text {
    font-size: 15px;
    line-height: 1.6;
    color: #5D596C;
  }
  
  .alias-warning {
    background: #FFF8E1;
    border-left: 4px solid #FF9800;
    padding: 16px;
    border-radius: 6px;
    margin-bottom: 24px;
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
    margin: 0;
    font-size: 13px;
    color: #F57F17;
  }
  
  @media (max-width: 991px) {
    .template10-container {
      padding: 16px;
    }
    
    .template10-header {
      padding: 20px;
    }
    
    .template10-card {
      padding: 16px;
      margin-bottom: 16px;
    }
    
    .alternatives-grid-split {
      grid-template-columns: 1fr;
      margin-top: 16px;
    }
  }
</style>
`,e={render:()=>`
    ${o}
    <div class="template10-container">
      <div class="alias-warning">
        <h4>
          <i class="bi bi-info-circle-fill"></i>
          Template10 = Template8 (Estrutura Idêntica)
        </h4>
        <p>
          Este template tem a mesma estrutura do Template8. Para novos projetos, 
          <strong>use Template8</strong>. Template10 mantido para compatibilidade com código legado.
        </p>
      </div>
      
      <div class="template10-section">
        <div class="template10-header">
          <div class="header-title">
            <i class="bi bi-info-circle-fill"></i>
            Contexto Geral
          </div>
          <div class="header-content">
            Template10 combina header destacado com split view abaixo, estrutura idêntica ao Template8.
          </div>
        </div>
      </div>
      
      <div class="template10-row">
        <div class="template10-col template10-col-half">
          <div class="template10-card">
            <div class="question-content-area">
              <strong>Conteúdo Principal:</strong> Lado esquerdo (50%) com informações detalhadas.
            </div>
          </div>
          <div class="template10-card">
            <div class="question-content-area">
              Múltiplos cards empilhados verticalmente com informações complementares.
            </div>
          </div>
        </div>
        
        <div class="template10-col template10-col-half">
          <div class="alternatives-grid-split">
            <div class="alternative-card">
              <div class="alternative-label">Alternativa A</div>
              <div class="alternative-text">Lado direito (50%) com grid 2×2</div>
            </div>
            <div class="alternative-card">
              <div class="alternative-label">Alternativa B</div>
              <div class="alternative-text">Facilita comparação lado a lado</div>
            </div>
            <div class="alternative-card">
              <div class="alternative-label">Alternativa C</div>
              <div class="alternative-text">Mantém referência sempre visível</div>
            </div>
            <div class="alternative-card">
              <div class="alternative-label">Alternativa D</div>
              <div class="alternative-text">Ideal para análise e interpretação</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `},t={render:()=>`
    ${o}
    <div class="template10-container">
      <div class="alias-warning">
        <h4>
          <i class="bi bi-arrow-left-right"></i>
          Comparação: Template8 vs Template10 vs Template11
        </h4>
        <p>
          Template8, Template10 e Template11 são <strong>IDÊNTICOS</strong> na estrutura.
          Todos usam header + split (50% content + 50% alternatives).
        </p>
      </div>
      
      <div class="template10-section">
        <div class="template10-header">
          <div class="header-title">
            <i class="bi bi-table"></i>
            Tabela Comparativa
          </div>
          <div class="header-content">
            Análise das diferenças entre templates similares do sistema
          </div>
        </div>
      </div>
      
      <div class="template10-row">
        <div class="template10-col">
          <div class="template10-card">
            <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
              <thead>
                <tr style="background: #F3F2F7;">
                  <th style="padding: 12px; border: 1px solid #DBDADE; text-align: left;">Template</th>
                  <th style="padding: 12px; border: 1px solid #DBDADE; text-align: center;">Structure</th>
                  <th style="padding: 12px; border: 1px solid #DBDADE; text-align: center;">Status</th>
                  <th style="padding: 12px; border: 1px solid #DBDADE; text-align: center;">Recomendação</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style="padding: 10px; border: 1px solid #DBDADE;"><strong style="color: #28C76F;">Template8</strong></td>
                  <td style="padding: 10px; border: 1px solid #DBDADE; text-align: center;">Header + Split</td>
                  <td style="padding: 10px; border: 1px solid #DBDADE; text-align: center;">✅ Primary</td>
                  <td style="padding: 10px; border: 1px solid #DBDADE; text-align: center;"><strong style="color: #28C76F;">Usar em novos projetos</strong></td>
                </tr>
                <tr style="background: #FAFAFA;">
                  <td style="padding: 10px; border: 1px solid #DBDADE;"><strong style="color: #FF9800;">Template10</strong></td>
                  <td style="padding: 10px; border: 1px solid #DBDADE; text-align: center;">Header + Split (idêntico)</td>
                  <td style="padding: 10px; border: 1px solid #DBDADE; text-align: center;">⚠️ Alias</td>
                  <td style="padding: 10px; border: 1px solid #DBDADE; text-align: center;">Legacy compatibility</td>
                </tr>
                <tr>
                  <td style="padding: 10px; border: 1px solid #DBDADE;"><strong style="color: #FF9800;">Template11</strong></td>
                  <td style="padding: 10px; border: 1px solid #DBDADE; text-align: center;">Header + Split (idêntico)</td>
                  <td style="padding: 10px; border: 1px solid #DBDADE; text-align: center;">⚠️ Alias</td>
                  <td style="padding: 10px; border: 1px solid #DBDADE; text-align: center;">Legacy compatibility</td>
                </tr>
                <tr style="background: #FAFAFA;">
                  <td style="padding: 10px; border: 1px solid #DBDADE;"><strong>Template4</strong></td>
                  <td style="padding: 10px; border: 1px solid #DBDADE; text-align: center;">Split (sem header)</td>
                  <td style="padding: 10px; border: 1px solid #DBDADE; text-align: center;">✅ Diferente</td>
                  <td style="padding: 10px; border: 1px solid #DBDADE; text-align: center;">Quando não precisa header</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  `},a={render:()=>`
    ${o}
    <div class="template10-container">
      <div class="alias-warning">
        <h4><i class="bi bi-info-circle-fill"></i> Template10 = Template8</h4>
        <p>Esta story é idêntica à ComGrafico do Template8. Use Template8 em novos projetos.</p>
      </div>
      
      <div class="template10-section">
        <div class="template10-header">
          <div class="header-title">
            <i class="bi bi-bar-chart-fill"></i>
            Análise de Vendas - Q1 2026
          </div>
          <div class="header-content">
            Crescimento de 18% no primeiro trimestre. Analise o gráfico e responda.
          </div>
        </div>
      </div>
      
      <div class="template10-row">
        <div class="template10-col template10-col-half">
          <div class="template10-card">
            <svg viewBox="0 0 400 250" style="width: 100%; height: auto;">
              <text x="200" y="20" text-anchor="middle" font-size="14" font-weight="bold" fill="#5D596C">Vendas Mensais (milhares R$)</text>
              <line x1="50" y1="200" x2="350" y2="200" stroke="#DBDADE" stroke-width="2"/>
              <line x1="50" y1="50" x2="50" y2="200" stroke="#DBDADE" stroke-width="2"/>
              <rect x="80" y="110" width="60" height="90" fill="#6E63E8" opacity="0.8"/>
              <rect x="170" y="80" width="60" height="120" fill="#28C76F" opacity="0.8"/>
              <rect x="260" y="130" width="60" height="70" fill="#FF9800" opacity="0.8"/>
              <text x="110" y="220" text-anchor="middle" font-size="12" fill="#5D596C">Jan</text>
              <text x="200" y="220" text-anchor="middle" font-size="12" fill="#5D596C">Fev</text>
              <text x="290" y="220" text-anchor="middle" font-size="12" fill="#5D596C">Mar</text>
              <text x="110" y="100" text-anchor="middle" font-size="12" font-weight="bold" fill="#6E63E8">450k</text>
              <text x="200" y="70" text-anchor="middle" font-size="12" font-weight="bold" fill="#28C76F">600k</text>
              <text x="290" y="120" text-anchor="middle" font-size="12" font-weight="bold" fill="#FF9800">350k</text>
            </svg>
          </div>
        </div>
        
        <div class="template10-col template10-col-half">
          <div class="alternatives-grid-split">
            <div class="alternative-card">
              <div class="alternative-label">Alternativa A</div>
              <div class="alternative-text">Fevereiro teve melhor desempenho (600k)</div>
            </div>
            <div class="alternative-card">
              <div class="alternative-label">Alternativa B</div>
              <div class="alternative-text">Março superou Janeiro em 22%</div>
            </div>
            <div class="alternative-card">
              <div class="alternative-label">Alternativa C</div>
              <div class="alternative-text">Média mensal foi R$ 466,7k</div>
            </div>
            <div class="alternative-card">
              <div class="alternative-label">Alternativa D</div>
              <div class="alternative-text">Jan + Mar ≠ Fevereiro</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `},i={render:()=>e.render().replace("Template10 = Template8","Template10 = Template8 (ComMapa)").replace("Contexto Geral","Geografia do Brasil")},l={render:()=>e.render().replace("Template10 = Template8","Template10 = Template8 (ComInstrucoes)").replace("Contexto Geral","Instruções: Experimento")},r={render:()=>e.render().replace("Template10 = Template8","Template10 = Template8 (ComComparacao)").replace("Contexto Geral","Comparação de Dados")},d={render:()=>e.render().replace("Template10 = Template8","Template10 = Template8 (ComTimeline)").replace("Contexto Geral","Linha do Tempo")},s={render:()=>e.render().replace("Template10 = Template8","Template10 = Template8 (ComDashboard)").replace("Contexto Geral","Dashboard Escolar")},n={render:()=>`
    ${o}
    <div class="template10-container">
      <div class="alias-warning">
        <h4><i class="bi bi-info-circle-fill"></i> Template10 = Template8</h4>
        <p>Comportamento responsivo idêntico ao Template8. Header 100% + split empilha <992px.</p>
      </div>
      
      <div style="background: #E3F2FD; border-left: 4px solid #2196F3; padding: 16px; border-radius: 6px; margin-bottom: 24px;">
        <h4 style="font-size: 14px; font-weight: 600; color: #1565C0; margin: 0 0 8px 0;">
          <i class="bi bi-arrows-fullscreen"></i> Responsivo
        </h4>
        <ul style="margin: 0; padding-left: 20px; font-size: 13px; color: #1976D2;">
          <li>Desktop (≥992px): Header 100% + Split 50/50</li>
          <li>Mobile (<992px): Header → Content → Alternatives (empilhado vertical)</li>
        </ul>
      </div>
      
      <div class="template10-section">
        <div class="template10-header">
          <div class="header-title">
            <i class="bi bi-display"></i>
            Header Responsivo
          </div>
          <div class="header-content">
            Template10 mantém 100% da largura em qualquer dispositivo
          </div>
        </div>
      </div>
      
      <div class="template10-row">
        <div class="template10-col template10-col-half">
          <div class="template10-card">
            <div class="question-content-area">
              <i class="bi bi-laptop" style="font-size: 20px; color: #6E63E8; margin-right: 8px;"></i>
              <strong>Desktop:</strong> Split 50/50 lado a lado
            </div>
          </div>
        </div>
        
        <div class="template10-col template10-col-half">
          <div class="alternatives-grid-split">
            <div class="alternative-card">
              <div class="alternative-label">Layout A</div>
              <div class="alternative-text">Desktop: lado a lado</div>
            </div>
            <div class="alternative-card">
              <div class="alternative-label">Layout B</div>
              <div class="alternative-text">Mobile: empilhado</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `};var p,c,m;e.parameters={...e.parameters,docs:{...(p=e.parameters)==null?void 0:p.docs,source:{originalSource:`{
  render: () => \`
    \${template10Styles}
    <div class="template10-container">
      <div class="alias-warning">
        <h4>
          <i class="bi bi-info-circle-fill"></i>
          Template10 = Template8 (Estrutura Idêntica)
        </h4>
        <p>
          Este template tem a mesma estrutura do Template8. Para novos projetos, 
          <strong>use Template8</strong>. Template10 mantido para compatibilidade com código legado.
        </p>
      </div>
      
      <div class="template10-section">
        <div class="template10-header">
          <div class="header-title">
            <i class="bi bi-info-circle-fill"></i>
            Contexto Geral
          </div>
          <div class="header-content">
            Template10 combina header destacado com split view abaixo, estrutura idêntica ao Template8.
          </div>
        </div>
      </div>
      
      <div class="template10-row">
        <div class="template10-col template10-col-half">
          <div class="template10-card">
            <div class="question-content-area">
              <strong>Conteúdo Principal:</strong> Lado esquerdo (50%) com informações detalhadas.
            </div>
          </div>
          <div class="template10-card">
            <div class="question-content-area">
              Múltiplos cards empilhados verticalmente com informações complementares.
            </div>
          </div>
        </div>
        
        <div class="template10-col template10-col-half">
          <div class="alternatives-grid-split">
            <div class="alternative-card">
              <div class="alternative-label">Alternativa A</div>
              <div class="alternative-text">Lado direito (50%) com grid 2×2</div>
            </div>
            <div class="alternative-card">
              <div class="alternative-label">Alternativa B</div>
              <div class="alternative-text">Facilita comparação lado a lado</div>
            </div>
            <div class="alternative-card">
              <div class="alternative-label">Alternativa C</div>
              <div class="alternative-text">Mantém referência sempre visível</div>
            </div>
            <div class="alternative-card">
              <div class="alternative-label">Alternativa D</div>
              <div class="alternative-text">Ideal para análise e interpretação</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  \`
}`,...(m=(c=e.parameters)==null?void 0:c.docs)==null?void 0:m.source}}};var v,x,g;t.parameters={...t.parameters,docs:{...(v=t.parameters)==null?void 0:v.docs,source:{originalSource:`{
  render: () => \`
    \${template10Styles}
    <div class="template10-container">
      <div class="alias-warning">
        <h4>
          <i class="bi bi-arrow-left-right"></i>
          Comparação: Template8 vs Template10 vs Template11
        </h4>
        <p>
          Template8, Template10 e Template11 são <strong>IDÊNTICOS</strong> na estrutura.
          Todos usam header + split (50% content + 50% alternatives).
        </p>
      </div>
      
      <div class="template10-section">
        <div class="template10-header">
          <div class="header-title">
            <i class="bi bi-table"></i>
            Tabela Comparativa
          </div>
          <div class="header-content">
            Análise das diferenças entre templates similares do sistema
          </div>
        </div>
      </div>
      
      <div class="template10-row">
        <div class="template10-col">
          <div class="template10-card">
            <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
              <thead>
                <tr style="background: #F3F2F7;">
                  <th style="padding: 12px; border: 1px solid #DBDADE; text-align: left;">Template</th>
                  <th style="padding: 12px; border: 1px solid #DBDADE; text-align: center;">Structure</th>
                  <th style="padding: 12px; border: 1px solid #DBDADE; text-align: center;">Status</th>
                  <th style="padding: 12px; border: 1px solid #DBDADE; text-align: center;">Recomendação</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style="padding: 10px; border: 1px solid #DBDADE;"><strong style="color: #28C76F;">Template8</strong></td>
                  <td style="padding: 10px; border: 1px solid #DBDADE; text-align: center;">Header + Split</td>
                  <td style="padding: 10px; border: 1px solid #DBDADE; text-align: center;">✅ Primary</td>
                  <td style="padding: 10px; border: 1px solid #DBDADE; text-align: center;"><strong style="color: #28C76F;">Usar em novos projetos</strong></td>
                </tr>
                <tr style="background: #FAFAFA;">
                  <td style="padding: 10px; border: 1px solid #DBDADE;"><strong style="color: #FF9800;">Template10</strong></td>
                  <td style="padding: 10px; border: 1px solid #DBDADE; text-align: center;">Header + Split (idêntico)</td>
                  <td style="padding: 10px; border: 1px solid #DBDADE; text-align: center;">⚠️ Alias</td>
                  <td style="padding: 10px; border: 1px solid #DBDADE; text-align: center;">Legacy compatibility</td>
                </tr>
                <tr>
                  <td style="padding: 10px; border: 1px solid #DBDADE;"><strong style="color: #FF9800;">Template11</strong></td>
                  <td style="padding: 10px; border: 1px solid #DBDADE; text-align: center;">Header + Split (idêntico)</td>
                  <td style="padding: 10px; border: 1px solid #DBDADE; text-align: center;">⚠️ Alias</td>
                  <td style="padding: 10px; border: 1px solid #DBDADE; text-align: center;">Legacy compatibility</td>
                </tr>
                <tr style="background: #FAFAFA;">
                  <td style="padding: 10px; border: 1px solid #DBDADE;"><strong>Template4</strong></td>
                  <td style="padding: 10px; border: 1px solid #DBDADE; text-align: center;">Split (sem header)</td>
                  <td style="padding: 10px; border: 1px solid #DBDADE; text-align: center;">✅ Diferente</td>
                  <td style="padding: 10px; border: 1px solid #DBDADE; text-align: center;">Quando não precisa header</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  \`
}`,...(g=(x=t.parameters)==null?void 0:x.docs)==null?void 0:g.source}}};var h,b,D;a.parameters={...a.parameters,docs:{...(h=a.parameters)==null?void 0:h.docs,source:{originalSource:`{
  render: () => \`
    \${template10Styles}
    <div class="template10-container">
      <div class="alias-warning">
        <h4><i class="bi bi-info-circle-fill"></i> Template10 = Template8</h4>
        <p>Esta story é idêntica à ComGrafico do Template8. Use Template8 em novos projetos.</p>
      </div>
      
      <div class="template10-section">
        <div class="template10-header">
          <div class="header-title">
            <i class="bi bi-bar-chart-fill"></i>
            Análise de Vendas - Q1 2026
          </div>
          <div class="header-content">
            Crescimento de 18% no primeiro trimestre. Analise o gráfico e responda.
          </div>
        </div>
      </div>
      
      <div class="template10-row">
        <div class="template10-col template10-col-half">
          <div class="template10-card">
            <svg viewBox="0 0 400 250" style="width: 100%; height: auto;">
              <text x="200" y="20" text-anchor="middle" font-size="14" font-weight="bold" fill="#5D596C">Vendas Mensais (milhares R$)</text>
              <line x1="50" y1="200" x2="350" y2="200" stroke="#DBDADE" stroke-width="2"/>
              <line x1="50" y1="50" x2="50" y2="200" stroke="#DBDADE" stroke-width="2"/>
              <rect x="80" y="110" width="60" height="90" fill="#6E63E8" opacity="0.8"/>
              <rect x="170" y="80" width="60" height="120" fill="#28C76F" opacity="0.8"/>
              <rect x="260" y="130" width="60" height="70" fill="#FF9800" opacity="0.8"/>
              <text x="110" y="220" text-anchor="middle" font-size="12" fill="#5D596C">Jan</text>
              <text x="200" y="220" text-anchor="middle" font-size="12" fill="#5D596C">Fev</text>
              <text x="290" y="220" text-anchor="middle" font-size="12" fill="#5D596C">Mar</text>
              <text x="110" y="100" text-anchor="middle" font-size="12" font-weight="bold" fill="#6E63E8">450k</text>
              <text x="200" y="70" text-anchor="middle" font-size="12" font-weight="bold" fill="#28C76F">600k</text>
              <text x="290" y="120" text-anchor="middle" font-size="12" font-weight="bold" fill="#FF9800">350k</text>
            </svg>
          </div>
        </div>
        
        <div class="template10-col template10-col-half">
          <div class="alternatives-grid-split">
            <div class="alternative-card">
              <div class="alternative-label">Alternativa A</div>
              <div class="alternative-text">Fevereiro teve melhor desempenho (600k)</div>
            </div>
            <div class="alternative-card">
              <div class="alternative-label">Alternativa B</div>
              <div class="alternative-text">Março superou Janeiro em 22%</div>
            </div>
            <div class="alternative-card">
              <div class="alternative-label">Alternativa C</div>
              <div class="alternative-text">Média mensal foi R$ 466,7k</div>
            </div>
            <div class="alternative-card">
              <div class="alternative-label">Alternativa D</div>
              <div class="alternative-text">Jan + Mar ≠ Fevereiro</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  \`
}`,...(D=(b=a.parameters)==null?void 0:b.docs)==null?void 0:D.source}}};var u,f,y;i.parameters={...i.parameters,docs:{...(u=i.parameters)==null?void 0:u.docs,source:{originalSource:`{
  render: () => Default.render().replace('Template10 = Template8', 'Template10 = Template8 (ComMapa)').replace('Contexto Geral', 'Geografia do Brasil')
}`,...(y=(f=i.parameters)==null?void 0:f.docs)==null?void 0:y.source}}};var T,E,A;l.parameters={...l.parameters,docs:{...(T=l.parameters)==null?void 0:T.docs,source:{originalSource:`{
  render: () => Default.render().replace('Template10 = Template8', 'Template10 = Template8 (ComInstrucoes)').replace('Contexto Geral', 'Instruções: Experimento')
}`,...(A=(E=l.parameters)==null?void 0:E.docs)==null?void 0:A.source}}};var C,F,w;r.parameters={...r.parameters,docs:{...(C=r.parameters)==null?void 0:C.docs,source:{originalSource:`{
  render: () => Default.render().replace('Template10 = Template8', 'Template10 = Template8 (ComComparacao)').replace('Contexto Geral', 'Comparação de Dados')
}`,...(w=(F=r.parameters)==null?void 0:F.docs)==null?void 0:w.source}}};var B,S,k;d.parameters={...d.parameters,docs:{...(B=d.parameters)==null?void 0:B.docs,source:{originalSource:`{
  render: () => Default.render().replace('Template10 = Template8', 'Template10 = Template8 (ComTimeline)').replace('Contexto Geral', 'Linha do Tempo')
}`,...(k=(S=d.parameters)==null?void 0:S.docs)==null?void 0:k.source}}};var z,H,M;s.parameters={...s.parameters,docs:{...(z=s.parameters)==null?void 0:z.docs,source:{originalSource:`{
  render: () => Default.render().replace('Template10 = Template8', 'Template10 = Template8 (ComDashboard)').replace('Contexto Geral', 'Dashboard Escolar')
}`,...(M=(H=s.parameters)==null?void 0:H.docs)==null?void 0:M.source}}};var G,I,q;n.parameters={...n.parameters,docs:{...(G=n.parameters)==null?void 0:G.docs,source:{originalSource:`{
  render: () => \`
    \${template10Styles}
    <div class="template10-container">
      <div class="alias-warning">
        <h4><i class="bi bi-info-circle-fill"></i> Template10 = Template8</h4>
        <p>Comportamento responsivo idêntico ao Template8. Header 100% + split empilha <992px.</p>
      </div>
      
      <div style="background: #E3F2FD; border-left: 4px solid #2196F3; padding: 16px; border-radius: 6px; margin-bottom: 24px;">
        <h4 style="font-size: 14px; font-weight: 600; color: #1565C0; margin: 0 0 8px 0;">
          <i class="bi bi-arrows-fullscreen"></i> Responsivo
        </h4>
        <ul style="margin: 0; padding-left: 20px; font-size: 13px; color: #1976D2;">
          <li>Desktop (≥992px): Header 100% + Split 50/50</li>
          <li>Mobile (<992px): Header → Content → Alternatives (empilhado vertical)</li>
        </ul>
      </div>
      
      <div class="template10-section">
        <div class="template10-header">
          <div class="header-title">
            <i class="bi bi-display"></i>
            Header Responsivo
          </div>
          <div class="header-content">
            Template10 mantém 100% da largura em qualquer dispositivo
          </div>
        </div>
      </div>
      
      <div class="template10-row">
        <div class="template10-col template10-col-half">
          <div class="template10-card">
            <div class="question-content-area">
              <i class="bi bi-laptop" style="font-size: 20px; color: #6E63E8; margin-right: 8px;"></i>
              <strong>Desktop:</strong> Split 50/50 lado a lado
            </div>
          </div>
        </div>
        
        <div class="template10-col template10-col-half">
          <div class="alternatives-grid-split">
            <div class="alternative-card">
              <div class="alternative-label">Layout A</div>
              <div class="alternative-text">Desktop: lado a lado</div>
            </div>
            <div class="alternative-card">
              <div class="alternative-label">Layout B</div>
              <div class="alternative-text">Mobile: empilhado</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  \`
}`,...(q=(I=n.parameters)==null?void 0:I.docs)==null?void 0:q.source}}};const R=["Default","ComparacaoTemplates","ComGrafico","ComMapa","ComInstrucoes","ComComparacao","ComTimeline","ComDashboard","Responsive"];export{r as ComComparacao,s as ComDashboard,a as ComGrafico,l as ComInstrucoes,i as ComMapa,d as ComTimeline,t as ComparacaoTemplates,e as Default,n as Responsive,R as __namedExportsOrder,L as default};
