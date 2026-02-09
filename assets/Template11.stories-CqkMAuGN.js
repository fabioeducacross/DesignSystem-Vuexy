const H={title:"Educacross Components V2/Templates/Template11",tags:["autodocs"],parameters:{layout:"fullscreen",docs:{description:{component:`
# Template11

**⚠️ Template11 = Template8 = Template10** (estrutura IDÊNTICA)

Terceiro alias do mesmo layout header + split.

## Hierarquia de Aliases

\`\`\`
Template8 (PRIMARY)
   ↓ alias
Template10 (Secondary alias)
   ↓ alias
Template11 (Tertiary alias)
\`\`\`

Todos os 3 templates têm estrutura 100% idêntica:
- Header card full-width gradient azul
- Split lg-6 + lg-6 (content left + alternatives right)
- Alternatives grid 2×2 (md-6)
- Responsive empilha <992px

## Por que 3 aliases?

1. **Template8**: Versão principal documentada
2. **Template10**: Primeira variante para contextos específicos
3. **Template11**: Terceira opção para máxima compatibilidade de migração

**Cenários de uso:**
- Sistema legado pode referenciar Template8, 10 ou 11 indistintamente
- Banco de dados antigo pode ter registros com qualquer um dos 3
- Permite migração gradual sem quebrar código existente
- Facilita A/B testing mantendo 3 nomes diferentes

## ⚠️ IMPORTANTE

**Para NOVOS projetos:**
✅ Use **Template8** (versão primary)

**Template11 existe apenas para:**
- Código legado que referencia Template11
- Migração de sistema antigo
- Compatibilidade com dados históricos
- Evitar quebra de funcionalidade existente

## Comparação Completa

| Template | Structure | Status | Quando usar |
|----------|-----------|--------|-------------|
| **Template8** | Header + Split | ✅ PRIMARY | Sempre em novos projetos |
| **Template10** | Header + Split | ⚠️ Alias #1 | Legacy compatibility |
| **Template11** | Header + Split | ⚠️ Alias #2 | Legacy compatibility |
| **Template4** | Split sem header | ✅ Diferente | Quando não precisa header |

## Documentação

Template11 não repete documentação completa.

**Ver documentação detalhada em:**
- [Template8.stories.js](../Template8/Template8.stories.js) - Documentação completa
- [Template10.stories.js](../Template10/Template10.stories.js) - Primeiro alias

Template11 fornece apenas stories básicas com avisos de redirecionamento.
        `}}}},p=`
<style>
  .template11-container {
    background: #F8F7FA;
    min-height: 100vh;
    padding: 24px;
    max-width: 1400px;
    margin: 0 auto;
  }
  
  .template11-section {
    margin-bottom: 24px;
  }
  
  .template11-row {
    display: flex;
    flex-wrap: wrap;
    margin: -12px;
  }
  
  .template11-col {
    padding: 12px;
    width: 100%;
  }
  
  @media (min-width: 992px) {
    .template11-col-half {
      width: 50%;
    }
  }
  
  .template11-header {
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
  
  .template11-card {
    background: #FFFFFF;
    border: 1px solid #DBDADE;
    border-radius: 8px;
    padding: 20px;
    margin-bottom: 20px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.06);
    height: 100%;
  }
  
  .template11-card:last-child {
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
    background: #FFEBEE;
    border-left: 4px solid #EA5455;
    padding: 16px;
    border-radius: 6px;
    margin-bottom: 24px;
  }
  
  .alias-warning h4 {
    font-size: 14px;
    font-weight: 600;
    color: #C62828;
    margin: 0 0 8px 0;
    display: flex;
    align-items: center;
    gap: 8px;
  }
  
  .alias-warning p {
    margin: 0;
    font-size: 13px;
    color: #C62828;
  }
  
  @media (max-width: 991px) {
    .template11-container {
      padding: 16px;
    }
    
    .template11-header {
      padding: 20px;
    }
    
    .template11-card {
      padding: 16px;
      margin-bottom: 16px;
    }
    
    .alternatives-grid-split {
      grid-template-columns: 1fr;
      margin-top: 16px;
    }
  }
</style>
`,t={render:()=>`
    ${p}
    <div class="template11-container">
      <div class="alias-warning">
        <h4>
          <i class="bi bi-exclamation-triangle-fill"></i>
          Template11 = Template8 = Template10 (Terceiro Alias)
        </h4>
        <p>
          <strong>⚠️ ATENÇÃO:</strong> Template11 é o TERCEIRO alias do Template8.
          Para novos projetos, use <strong>Template8</strong>.
          Template11 mantido apenas para compatibilidade com sistema legado.
        </p>
      </div>
      
      <div class="template11-section">
        <div class="template11-header">
          <div class="header-title">
            <i class="bi bi-info-circle-fill"></i>
            Contexto Geral
          </div>
          <div class="header-content">
            Template11 = Template8 = Template10. Estrutura idêntica: header + split view.
          </div>
        </div>
      </div>
      
      <div class="template11-row">
        <div class="template11-col template11-col-half">
          <div class="template11-card">
            <div class="question-content-area">
              <strong>Conteúdo Principal:</strong> Lado esquerdo (50%) com informações detalhadas.
            </div>
          </div>
          <div class="template11-card">
            <div class="question-content-area">
              Múltiplos cards empilhados verticalmente.
            </div>
          </div>
        </div>
        
        <div class="template11-col template11-col-half">
          <div class="alternatives-grid-split">
            <div class="alternative-card">
              <div class="alternative-label">Alternativa A</div>
              <div class="alternative-text">Lado direito (50%) grid 2×2</div>
            </div>
            <div class="alternative-card">
              <div class="alternative-label">Alternativa B</div>
              <div class="alternative-text">Facilita comparação</div>
            </div>
            <div class="alternative-card">
              <div class="alternative-label">Alternativa C</div>
              <div class="alternative-text">Referência sempre visível</div>
            </div>
            <div class="alternative-card">
              <div class="alternative-label">Alternativa D</div>
              <div class="alternative-text">Ideal para análise</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `},a={render:()=>`
    ${p}
    <div class="template11-container">
      <div class="alias-warning">
        <h4>
          <i class="bi bi-diagram-3-fill"></i>
          Hierarquia de Templates Aliases
        </h4>
        <p>
          Visualização da relação entre Template8, Template10 e Template11.
        </p>
      </div>
      
      <div class="template11-section">
        <div class="template11-header">
          <div class="header-title">
            <i class="bi bi-diagram-2"></i>
            Diagrama de Relacionamento
          </div>
          <div class="header-content">
            Template8 é a versão PRIMARY. Template10 e Template11 são aliases.
          </div>
        </div>
      </div>
      
      <div class="template11-row">
        <div class="template11-col">
          <div class="template11-card">
            <svg viewBox="0 0 500 300" style="width: 100%; height: auto;">
              <!-- Template8 PRIMARY -->
              <rect x="175" y="30" width="150" height="60" fill="#28C76F" stroke="#1E7E34" stroke-width="2" rx="8"/>
              <text x="250" y="55" text-anchor="middle" font-size="14" font-weight="bold" fill="white">Template8</text>
              <text x="250" y="75" text-anchor="middle" font-size="11" fill="white">PRIMARY VERSION</text>
              
              <!-- Setas -->
              <line x1="250" y1="90" x2="180" y2="140" stroke="#6E63E8" stroke-width="2" marker-end="url(#arrow)"/>
              <line x1="250" y1="90" x2="320" y2="140" stroke="#6E63E8" stroke-width="2" marker-end="url(#arrow)"/>
              <text x="200" y="120" font-size="10" fill="#6E63E8">alias</text>
              <text x="300" y="120" font-size="10" fill="#6E63E8">alias</text>
              
              <!-- Template10 ALIAS -->
              <rect x="50" y="150" width="150" height="60" fill="#FF9800" stroke="#E65100" stroke-width="2" rx="8"/>
              <text x="125" y="175" text-anchor="middle" font-size="14" font-weight="bold" fill="white">Template10</text>
              <text x="125" y="195" text-anchor="middle" font-size="11" fill="white">ALIAS #1</text>
              
              <!-- Template11 ALIAS -->
              <rect x="300" y="150" width="150" height="60" fill="#EA5455" stroke="#C62828" stroke-width="2" rx="8"/>
              <text x="375" y="175" text-anchor="middle" font-size="14" font-weight="bold" fill="white">Template11</text>
              <text x="375" y="195" text-anchor="middle" font-size="11" fill="white">ALIAS #2</text>
              
              <!-- Seta de Template11 para Template10 -->
              <line x1="300" y1="180" x2="210" y2="180" stroke="#B0BEC5" stroke-width="1" stroke-dasharray="5,5"/>
              <text x="255" y="175" text-anchor="middle" font-size="10" fill="#6E6B7B">mesma estrutura</text>
              
              <!-- Legenda -->
              <text x="250" y="250" text-anchor="middle" font-size="12" font-weight="bold" fill="#5D596C">Recomendação:</text>
              <text x="250" y="270" text-anchor="middle" font-size="11" fill="#28C76F">✅ Use Template8 em novos projetos</text>
              <text x="250" y="290" text-anchor="middle" font-size="11" fill="#EA5455">⚠️ Template10/11 apenas para legacy</text>
            </svg>
          </div>
        </div>
      </div>
    </div>
  `},e={render:()=>`
    ${p}
    <div class="template11-container">
      <div style="background: linear-gradient(135deg, #E8F5E9 0%, #C8E6C9 100%); border: 2px solid #28C76F; border-radius: 12px; padding: 32px; text-align: center;">
        <i class="bi bi-arrow-right-circle-fill" style="font-size: 48px; color: #28C76F; margin-bottom: 16px;"></i>
        <h3 style="font-size: 20px; font-weight: 700; color: #2E7D32; margin-bottom: 12px;">
          Documentação Completa em Template8
        </h3>
        <p style="font-size: 15px; color: #558B2F; margin-bottom: 20px;">
          Template11 é um alias. Para ver todas as variantes (ComGrafico, ComMapa, ComInstrucoes, ComComparacao, 
          ComTimeline, ComDashboard, Responsive), consulte:
        </p>
        <div style="background: white; border-radius: 8px; padding: 16px; display: inline-block;">
          <code style="font-size: 14px; color: #6E63E8;">
            src/stories/educacross-components-v2/<strong>Template8.stories.js</strong>
          </code>
        </div>
        <p style="font-size: 13px; color: #558B2F; margin-top: 20px;">
          Template8 contém 8 stories completas com exemplos detalhados de uso.
        </p>
      </div>
    </div>
  `},i={render:()=>e.render()},r={render:()=>e.render()},s={render:()=>e.render()},l={render:()=>e.render()},o={render:()=>e.render()},n={render:()=>e.render()},d={render:()=>e.render()};var m,c,x;t.parameters={...t.parameters,docs:{...(m=t.parameters)==null?void 0:m.docs,source:{originalSource:`{
  render: () => \`
    \${template11Styles}
    <div class="template11-container">
      <div class="alias-warning">
        <h4>
          <i class="bi bi-exclamation-triangle-fill"></i>
          Template11 = Template8 = Template10 (Terceiro Alias)
        </h4>
        <p>
          <strong>⚠️ ATENÇÃO:</strong> Template11 é o TERCEIRO alias do Template8.
          Para novos projetos, use <strong>Template8</strong>.
          Template11 mantido apenas para compatibilidade com sistema legado.
        </p>
      </div>
      
      <div class="template11-section">
        <div class="template11-header">
          <div class="header-title">
            <i class="bi bi-info-circle-fill"></i>
            Contexto Geral
          </div>
          <div class="header-content">
            Template11 = Template8 = Template10. Estrutura idêntica: header + split view.
          </div>
        </div>
      </div>
      
      <div class="template11-row">
        <div class="template11-col template11-col-half">
          <div class="template11-card">
            <div class="question-content-area">
              <strong>Conteúdo Principal:</strong> Lado esquerdo (50%) com informações detalhadas.
            </div>
          </div>
          <div class="template11-card">
            <div class="question-content-area">
              Múltiplos cards empilhados verticalmente.
            </div>
          </div>
        </div>
        
        <div class="template11-col template11-col-half">
          <div class="alternatives-grid-split">
            <div class="alternative-card">
              <div class="alternative-label">Alternativa A</div>
              <div class="alternative-text">Lado direito (50%) grid 2×2</div>
            </div>
            <div class="alternative-card">
              <div class="alternative-label">Alternativa B</div>
              <div class="alternative-text">Facilita comparação</div>
            </div>
            <div class="alternative-card">
              <div class="alternative-label">Alternativa C</div>
              <div class="alternative-text">Referência sempre visível</div>
            </div>
            <div class="alternative-card">
              <div class="alternative-label">Alternativa D</div>
              <div class="alternative-text">Ideal para análise</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  \`
}`,...(x=(c=t.parameters)==null?void 0:c.docs)==null?void 0:x.source}}};var v,g,h;a.parameters={...a.parameters,docs:{...(v=a.parameters)==null?void 0:v.docs,source:{originalSource:`{
  render: () => \`
    \${template11Styles}
    <div class="template11-container">
      <div class="alias-warning">
        <h4>
          <i class="bi bi-diagram-3-fill"></i>
          Hierarquia de Templates Aliases
        </h4>
        <p>
          Visualização da relação entre Template8, Template10 e Template11.
        </p>
      </div>
      
      <div class="template11-section">
        <div class="template11-header">
          <div class="header-title">
            <i class="bi bi-diagram-2"></i>
            Diagrama de Relacionamento
          </div>
          <div class="header-content">
            Template8 é a versão PRIMARY. Template10 e Template11 são aliases.
          </div>
        </div>
      </div>
      
      <div class="template11-row">
        <div class="template11-col">
          <div class="template11-card">
            <svg viewBox="0 0 500 300" style="width: 100%; height: auto;">
              <!-- Template8 PRIMARY -->
              <rect x="175" y="30" width="150" height="60" fill="#28C76F" stroke="#1E7E34" stroke-width="2" rx="8"/>
              <text x="250" y="55" text-anchor="middle" font-size="14" font-weight="bold" fill="white">Template8</text>
              <text x="250" y="75" text-anchor="middle" font-size="11" fill="white">PRIMARY VERSION</text>
              
              <!-- Setas -->
              <line x1="250" y1="90" x2="180" y2="140" stroke="#6E63E8" stroke-width="2" marker-end="url(#arrow)"/>
              <line x1="250" y1="90" x2="320" y2="140" stroke="#6E63E8" stroke-width="2" marker-end="url(#arrow)"/>
              <text x="200" y="120" font-size="10" fill="#6E63E8">alias</text>
              <text x="300" y="120" font-size="10" fill="#6E63E8">alias</text>
              
              <!-- Template10 ALIAS -->
              <rect x="50" y="150" width="150" height="60" fill="#FF9800" stroke="#E65100" stroke-width="2" rx="8"/>
              <text x="125" y="175" text-anchor="middle" font-size="14" font-weight="bold" fill="white">Template10</text>
              <text x="125" y="195" text-anchor="middle" font-size="11" fill="white">ALIAS #1</text>
              
              <!-- Template11 ALIAS -->
              <rect x="300" y="150" width="150" height="60" fill="#EA5455" stroke="#C62828" stroke-width="2" rx="8"/>
              <text x="375" y="175" text-anchor="middle" font-size="14" font-weight="bold" fill="white">Template11</text>
              <text x="375" y="195" text-anchor="middle" font-size="11" fill="white">ALIAS #2</text>
              
              <!-- Seta de Template11 para Template10 -->
              <line x1="300" y1="180" x2="210" y2="180" stroke="#B0BEC5" stroke-width="1" stroke-dasharray="5,5"/>
              <text x="255" y="175" text-anchor="middle" font-size="10" fill="#6E6B7B">mesma estrutura</text>
              
              <!-- Legenda -->
              <text x="250" y="250" text-anchor="middle" font-size="12" font-weight="bold" fill="#5D596C">Recomendação:</text>
              <text x="250" y="270" text-anchor="middle" font-size="11" fill="#28C76F">✅ Use Template8 em novos projetos</text>
              <text x="250" y="290" text-anchor="middle" font-size="11" fill="#EA5455">⚠️ Template10/11 apenas para legacy</text>
            </svg>
          </div>
        </div>
      </div>
    </div>
  \`
}`,...(h=(g=a.parameters)==null?void 0:g.docs)==null?void 0:h.source}}};var u,f,T;e.parameters={...e.parameters,docs:{...(u=e.parameters)==null?void 0:u.docs,source:{originalSource:`{
  render: () => \`
    \${template11Styles}
    <div class="template11-container">
      <div style="background: linear-gradient(135deg, #E8F5E9 0%, #C8E6C9 100%); border: 2px solid #28C76F; border-radius: 12px; padding: 32px; text-align: center;">
        <i class="bi bi-arrow-right-circle-fill" style="font-size: 48px; color: #28C76F; margin-bottom: 16px;"></i>
        <h3 style="font-size: 20px; font-weight: 700; color: #2E7D32; margin-bottom: 12px;">
          Documentação Completa em Template8
        </h3>
        <p style="font-size: 15px; color: #558B2F; margin-bottom: 20px;">
          Template11 é um alias. Para ver todas as variantes (ComGrafico, ComMapa, ComInstrucoes, ComComparacao, 
          ComTimeline, ComDashboard, Responsive), consulte:
        </p>
        <div style="background: white; border-radius: 8px; padding: 16px; display: inline-block;">
          <code style="font-size: 14px; color: #6E63E8;">
            src/stories/educacross-components-v2/<strong>Template8.stories.js</strong>
          </code>
        </div>
        <p style="font-size: 13px; color: #558B2F; margin-top: 20px;">
          Template8 contém 8 stories completas com exemplos detalhados de uso.
        </p>
      </div>
    </div>
  \`
}`,...(T=(f=e.parameters)==null?void 0:f.docs)==null?void 0:T.source}}};var b,E,y;i.parameters={...i.parameters,docs:{...(b=i.parameters)==null?void 0:b.docs,source:{originalSource:`{
  render: () => VerTemplate8.render()
}`,...(y=(E=i.parameters)==null?void 0:E.docs)==null?void 0:y.source}}};var w,C,A;r.parameters={...r.parameters,docs:{...(w=r.parameters)==null?void 0:w.docs,source:{originalSource:`{
  render: () => VerTemplate8.render()
}`,...(A=(C=r.parameters)==null?void 0:C.docs)==null?void 0:A.source}}};var F,z,k;s.parameters={...s.parameters,docs:{...(F=s.parameters)==null?void 0:F.docs,source:{originalSource:`{
  render: () => VerTemplate8.render()
}`,...(k=(z=s.parameters)==null?void 0:z.docs)==null?void 0:k.source}}};var S,R,D;l.parameters={...l.parameters,docs:{...(S=l.parameters)==null?void 0:S.docs,source:{originalSource:`{
  render: () => VerTemplate8.render()
}`,...(D=(R=l.parameters)==null?void 0:R.docs)==null?void 0:D.source}}};var I,B,P;o.parameters={...o.parameters,docs:{...(I=o.parameters)==null?void 0:I.docs,source:{originalSource:`{
  render: () => VerTemplate8.render()
}`,...(P=(B=o.parameters)==null?void 0:B.docs)==null?void 0:P.source}}};var V,q,L;n.parameters={...n.parameters,docs:{...(V=n.parameters)==null?void 0:V.docs,source:{originalSource:`{
  render: () => VerTemplate8.render()
}`,...(L=(q=n.parameters)==null?void 0:q.docs)==null?void 0:L.source}}};var M,j,O;d.parameters={...d.parameters,docs:{...(M=d.parameters)==null?void 0:M.docs,source:{originalSource:`{
  render: () => VerTemplate8.render()
}`,...(O=(j=d.parameters)==null?void 0:j.docs)==null?void 0:O.source}}};const Y=["Default","HierarchyDiagram","VerTemplate8","ComGrafico","ComMapa","ComInstrucoes","ComComparacao","ComTimeline","ComDashboard","Responsive"];export{l as ComComparacao,n as ComDashboard,i as ComGrafico,s as ComInstrucoes,r as ComMapa,o as ComTimeline,t as Default,a as HierarchyDiagram,d as Responsive,e as VerTemplate8,Y as __namedExportsOrder,H as default};
