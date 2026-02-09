const V={title:"Educacross Components V2/Legends/LegendEnum",tags:["autodocs"],parameters:{layout:"padded",docs:{description:{component:`
# LegendEnum

Componente de legenda para **status baseados em enumeração** com badges coloridos.

## Contexto de Uso

- **Níveis de proficiência**: Below Basic, Basic, Proficient, Advanced
- **Sistema semáforo**: Vermelho (danger), Amarelo (warning), Verde (success), Azul (primary)
- **Legendas de avaliação**: Explicar escala de performance
- **Dashboards educacionais**: Mostrar categorias de status
- **Relatórios**: Identificar níveis em gráficos e tabelas

## Estrutura

\`\`\`
+--------------------------------+
| Label: [Badge Status] Value    |  ← Status enum com cor semáforo
+--------------------------------+
| Description text (optional)    |  ← Explicação do nível
+--------------------------------+
\`\`\`

## Status Enum Colors

| Status | Color | CSS Variable | Hex | Significado |
|--------|-------|--------------|-----|-------------|
| **Below Basic** | 🔴 Vermelho | --legend-below-basic | #EA5455 | Abaixo do básico |
| **Basic** | 🟡 Amarelo | --legend-basic | #FF9F43 | Básico |
| **Proficient** | 🟢 Verde | --legend-proficient | #28C76F | Proficiente |
| **Advanced** | 🔵 Azul | --legend-advanced | #6E63E8 | Avançado |

## Características

- **Badge semáforo**: Sistema de cores universalmente reconhecido
- **Slot enum-component**: Permite customização do componente de status
- **Card wrapper**: Apresentação organizada com border discreto
- **Flexbox layout**: Centralizado com gap-2 (16px)
- **Responsive**: flex-wrap para empilhar em mobile
- **Typography**: text-sm (14px) para labels

## Quando usar

- **Explicar legendas**: Antes de gráficos ou tabelas com cores
- **Onboarding**: Ensinar usuários sobre sistema de níveis
- **Relatórios**: Cabeçalho de dashboards com escala
- **Avaliações**: Mostrar critérios de classificação
        `}}}},s=`
<style>
  .legend-enum-container {
    background: #FFFFFF;
    border: 1px solid #D8D6DE;
    border-radius: 8px;
    box-shadow: none;
    padding: 20px;
    max-width: 600px;
  }
  
  .legend-enum-row {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 16px;
    flex-wrap: wrap;
    font-size: 14px;
    color: #5D596C;
  }
  
  .legend-label {
    font-weight: 500;
    color: #5D596C;
  }
  
  .status-badge {
    display: inline-flex;
    align-items: center;
    padding: 6px 12px;
    border-radius: 4px;
    font-size: 13px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.3px;
  }
  
  .status-below-basic {
    background: rgba(234, 84, 85, 0.12);
    color: #EA5455;
    border: 1px solid #EA5455;
  }
  
  .status-basic {
    background: rgba(255, 159, 67, 0.12);
    color: #FF9F43;
    border: 1px solid #FF9F43;
  }
  
  .status-proficient {
    background: rgba(40, 199, 111, 0.12);
    color: #28C76F;
    border: 1px solid #28C76F;
  }
  
  .status-advanced {
    background: rgba(110, 99, 232, 0.12);
    color: #6E63E8;
    border: 1px solid #6E63E8;
  }
  
  .legend-description {
    margin-top: 12px;
    margin-bottom: 0;
    font-size: 13px;
    color: #6E6B7B;
    text-align: center;
  }
  
  .legend-divider {
    margin: 16px 0;
    border: none;
    border-top: 1px solid #E0E0E0;
  }
  
  @media (max-width: 576px) {
    .legend-enum-row {
      flex-direction: column;
      align-items: flex-start;
      gap: 12px;
    }
    
    .legend-enum-container {
      padding: 16px;
    }
  }
</style>
`,a={render:()=>`
    ${s}
    <div class="legend-enum-container">
      <div class="legend-enum-row">
        <span class="legend-label">Status:</span>
        <span class="status-badge status-proficient">Proficient</span>
      </div>
      <p class="legend-description">
        Status enum badge com cor semáforo verde (proficiente)
      </p>
    </div>
  `},e={render:()=>`
    ${s}
    <div style="display: flex; flex-direction: column; gap: 16px; max-width: 700px;">
      <div class="legend-enum-container">
        <div class="legend-enum-row">
          <span class="legend-label">Below Basic:</span>
          <span class="status-badge status-below-basic">Below Basic</span>
        </div>
        <p class="legend-description">
          🔴 Vermelho (#EA5455) - Abaixo do nível básico esperado
        </p>
      </div>
      
      <div class="legend-enum-container">
        <div class="legend-enum-row">
          <span class="legend-label">Basic:</span>
          <span class="status-badge status-basic">Basic</span>
        </div>
        <p class="legend-description">
          🟡 Amarelo (#FF9F43) - Nível básico de proficiência
        </p>
      </div>
      
      <div class="legend-enum-container">
        <div class="legend-enum-row">
          <span class="legend-label">Proficient:</span>
          <span class="status-badge status-proficient">Proficient</span>
        </div>
        <p class="legend-description">
          🟢 Verde (#28C76F) - Proficiente, domínio adequado
        </p>
      </div>
      
      <div class="legend-enum-container">
        <div class="legend-enum-row">
          <span class="legend-label">Advanced:</span>
          <span class="status-badge status-advanced">Advanced</span>
        </div>
        <p class="legend-description">
          🔵 Azul (#6E63E8) - Avançado, excelência
        </p>
      </div>
    </div>
  `},n={render:()=>`
    ${s}
    <div class="legend-enum-container">
      <div class="legend-enum-row">
        <span class="legend-label">Níveis:</span>
        <span class="status-badge status-below-basic">Below Basic</span>
        <span class="status-badge status-basic">Basic</span>
        <span class="status-badge status-proficient">Proficient</span>
        <span class="status-badge status-advanced">Advanced</span>
      </div>
      <hr class="legend-divider">
      <p class="legend-description">
        Sistema semáforo com 4 níveis de proficiência (vermelho → amarelo → verde → azul)
      </p>
    </div>
  `},t={render:()=>`
    ${s}
    <style>
      .metric-card {
        background: #F8F7FA;
        border: 1px solid #E0E0E0;
        border-radius: 8px;
        padding: 16px;
        text-align: center;
      }
      
      .metric-value {
        font-size: 32px;
        font-weight: 700;
        margin: 8px 0;
      }
      
      .metric-label {
        font-size: 13px;
        color: #6E6B7B;
        text-transform: uppercase;
        letter-spacing: 0.5px;
      }
    </style>
    <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; max-width: 800px; margin-bottom: 24px;">
      <div class="metric-card">
        <div class="metric-label">Below Basic</div>
        <div class="metric-value" style="color: #EA5455;">12</div>
        <span class="status-badge status-below-basic">15%</span>
      </div>
      <div class="metric-card">
        <div class="metric-label">Basic</div>
        <div class="metric-value" style="color: #FF9F43;">23</div>
        <span class="status-badge status-basic">29%</span>
      </div>
      <div class="metric-card">
        <div class="metric-label">Proficient</div>
        <div class="metric-value" style="color: #28C76F;">35</div>
        <span class="status-badge status-proficient">44%</span>
      </div>
      <div class="metric-card">
        <div class="metric-label">Advanced</div>
        <div class="metric-value" style="color: #6E63E8;">10</div>
        <span class="status-badge status-advanced">12%</span>
      </div>
    </div>
    
    <div class="legend-enum-container">
      <div class="legend-enum-row">
        <span class="legend-label">Legenda:</span>
        <span class="status-badge status-below-basic">Below Basic</span>
        <span class="status-badge status-basic">Basic</span>
        <span class="status-badge status-proficient">Proficient</span>
        <span class="status-badge status-advanced">Advanced</span>
      </div>
      <p class="legend-description">
        Dashboard de proficiência: 80 alunos distribuídos em 4 níveis
      </p>
    </div>
  `},i={render:()=>`
    ${s}
    <style>
      .proficiency-table {
        width: 100%;
        border-collapse: collapse;
        margin-bottom: 24px;
        background: white;
        border: 1px solid #E0E0E0;
        border-radius: 8px;
        overflow: hidden;
      }
      
      .proficiency-table th {
        background: #F8F7FA;
        padding: 12px 16px;
        text-align: left;
        font-weight: 600;
        font-size: 13px;
        color: #5D596C;
        text-transform: uppercase;
        border-bottom: 2px solid #E0E0E0;
      }
      
      .proficiency-table td {
        padding: 12px 16px;
        border-bottom: 1px solid #F0F0F0;
        font-size: 14px;
        color: #5D596C;
      }
      
      .proficiency-table tr:last-child td {
        border-bottom: none;
      }
    </style>
    
    <table class="proficiency-table">
      <thead>
        <tr>
          <th>Aluno</th>
          <th>Disciplina</th>
          <th>Nota</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Ana Silva</td>
          <td>Matemática</td>
          <td>9.2</td>
          <td><span class="status-badge status-advanced">Advanced</span></td>
        </tr>
        <tr>
          <td>Bruno Costa</td>
          <td>Português</td>
          <td>7.8</td>
          <td><span class="status-badge status-proficient">Proficient</span></td>
        </tr>
        <tr>
          <td>Carlos Mendes</td>
          <td>História</td>
          <td>6.1</td>
          <td><span class="status-badge status-basic">Basic</span></td>
        </tr>
        <tr>
          <td>Diana Alves</td>
          <td>Ciências</td>
          <td>4.5</td>
          <td><span class="status-badge status-below-basic">Below Basic</span></td>
        </tr>
      </tbody>
    </table>
    
    <div class="legend-enum-container">
      <div class="legend-enum-row">
        <span class="legend-label">Critérios:</span>
        <span class="status-badge status-below-basic">&lt; 5.0</span>
        <span class="status-badge status-basic">5.0 - 6.9</span>
        <span class="status-badge status-proficient">7.0 - 8.9</span>
        <span class="status-badge status-advanced">≥ 9.0</span>
      </div>
    </div>
  `},d={render:()=>`
    ${s}
    <style>
      .status-badge-compact {
        display: inline-flex;
        align-items: center;
        padding: 4px 8px;
        border-radius: 3px;
        font-size: 11px;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.2px;
      }
    </style>
    <div class="legend-enum-container" style="padding: 12px;">
      <div class="legend-enum-row" style="font-size: 12px; gap: 12px;">
        <span class="legend-label" style="font-size: 12px;">Status:</span>
        <span class="status-badge-compact status-below-basic">Below</span>
        <span class="status-badge-compact status-basic">Basic</span>
        <span class="status-badge-compact status-proficient">Prof.</span>
        <span class="status-badge-compact status-advanced">Adv.</span>
      </div>
    </div>
  `},l={render:()=>`
    ${s}
    <div style="display: flex; flex-direction: column; gap: 16px; max-width: 700px;">
      <div class="legend-enum-container">
        <div class="legend-enum-row">
          <span class="legend-label">Below Basic:</span>
          <span class="status-badge status-below-basic">
            <i class="bi bi-x-circle-fill" style="margin-right: 6px;"></i>
            Below Basic
          </span>
        </div>
      </div>
      
      <div class="legend-enum-container">
        <div class="legend-enum-row">
          <span class="legend-label">Basic:</span>
          <span class="status-badge status-basic">
            <i class="bi bi-exclamation-triangle-fill" style="margin-right: 6px;"></i>
            Basic
          </span>
        </div>
      </div>
      
      <div class="legend-enum-container">
        <div class="legend-enum-row">
          <span class="legend-label">Proficient:</span>
          <span class="status-badge status-proficient">
            <i class="bi bi-check-circle-fill" style="margin-right: 6px;"></i>
            Proficient
          </span>
        </div>
      </div>
      
      <div class="legend-enum-container">
        <div class="legend-enum-row">
          <span class="legend-label">Advanced:</span>
          <span class="status-badge status-advanced">
            <i class="bi bi-star-fill" style="margin-right: 6px;"></i>
            Advanced
          </span>
        </div>
      </div>
    </div>
  `},c={render:()=>`
    ${s}
    <div style="background: #E3F2FD; border-left: 4px solid #2196F3; padding: 16px; border-radius: 6px; margin-bottom: 24px; max-width: 700px;">
      <h4 style="font-size: 14px; font-weight: 600; color: #1565C0; margin: 0 0 8px 0;">
        <i class="bi bi-phone"></i> LegendEnum: Responsivo
      </h4>
      <ul style="margin: 0; padding-left: 20px; font-size: 13px; color: #1976D2;">
        <li>Desktop: flex-row com badges lado a lado</li>
        <li>Mobile (&lt;576px): flex-column empilhado</li>
        <li>Gap responsivo: 16px → 12px mobile</li>
        <li>Padding: 20px → 16px mobile</li>
      </ul>
    </div>
    
    <div class="legend-enum-container">
      <div class="legend-enum-row">
        <span class="legend-label">Níveis de Proficiência:</span>
        <span class="status-badge status-below-basic">
          <i class="bi bi-x-circle-fill" style="margin-right: 6px;"></i>
          Below Basic
        </span>
        <span class="status-badge status-basic">
          <i class="bi bi-exclamation-triangle-fill" style="margin-right: 6px;"></i>
          Basic
        </span>
        <span class="status-badge status-proficient">
          <i class="bi bi-check-circle-fill" style="margin-right: 6px;"></i>
          Proficient
        </span>
        <span class="status-badge status-advanced">
          <i class="bi bi-star-fill" style="margin-right: 6px;"></i>
          Advanced
        </span>
      </div>
      <hr class="legend-divider">
      <p class="legend-description">
        Em mobile, badges empilham verticalmente para melhor legibilidade
      </p>
    </div>
  `};var r,o,p;a.parameters={...a.parameters,docs:{...(r=a.parameters)==null?void 0:r.docs,source:{originalSource:`{
  render: () => \`
    \${legendStyles}
    <div class="legend-enum-container">
      <div class="legend-enum-row">
        <span class="legend-label">Status:</span>
        <span class="status-badge status-proficient">Proficient</span>
      </div>
      <p class="legend-description">
        Status enum badge com cor semáforo verde (proficiente)
      </p>
    </div>
  \`
}`,...(p=(o=a.parameters)==null?void 0:o.docs)==null?void 0:p.source}}};var u,g,b;e.parameters={...e.parameters,docs:{...(u=e.parameters)==null?void 0:u.docs,source:{originalSource:`{
  render: () => \`
    \${legendStyles}
    <div style="display: flex; flex-direction: column; gap: 16px; max-width: 700px;">
      <div class="legend-enum-container">
        <div class="legend-enum-row">
          <span class="legend-label">Below Basic:</span>
          <span class="status-badge status-below-basic">Below Basic</span>
        </div>
        <p class="legend-description">
          🔴 Vermelho (#EA5455) - Abaixo do nível básico esperado
        </p>
      </div>
      
      <div class="legend-enum-container">
        <div class="legend-enum-row">
          <span class="legend-label">Basic:</span>
          <span class="status-badge status-basic">Basic</span>
        </div>
        <p class="legend-description">
          🟡 Amarelo (#FF9F43) - Nível básico de proficiência
        </p>
      </div>
      
      <div class="legend-enum-container">
        <div class="legend-enum-row">
          <span class="legend-label">Proficient:</span>
          <span class="status-badge status-proficient">Proficient</span>
        </div>
        <p class="legend-description">
          🟢 Verde (#28C76F) - Proficiente, domínio adequado
        </p>
      </div>
      
      <div class="legend-enum-container">
        <div class="legend-enum-row">
          <span class="legend-label">Advanced:</span>
          <span class="status-badge status-advanced">Advanced</span>
        </div>
        <p class="legend-description">
          🔵 Azul (#6E63E8) - Avançado, excelência
        </p>
      </div>
    </div>
  \`
}`,...(b=(g=e.parameters)==null?void 0:g.docs)==null?void 0:b.source}}};var m,v,x;n.parameters={...n.parameters,docs:{...(m=n.parameters)==null?void 0:m.docs,source:{originalSource:`{
  render: () => \`
    \${legendStyles}
    <div class="legend-enum-container">
      <div class="legend-enum-row">
        <span class="legend-label">Níveis:</span>
        <span class="status-badge status-below-basic">Below Basic</span>
        <span class="status-badge status-basic">Basic</span>
        <span class="status-badge status-proficient">Proficient</span>
        <span class="status-badge status-advanced">Advanced</span>
      </div>
      <hr class="legend-divider">
      <p class="legend-description">
        Sistema semáforo com 4 níveis de proficiência (vermelho → amarelo → verde → azul)
      </p>
    </div>
  \`
}`,...(x=(v=n.parameters)==null?void 0:v.docs)==null?void 0:x.source}}};var f,w,h;t.parameters={...t.parameters,docs:{...(f=t.parameters)==null?void 0:f.docs,source:{originalSource:`{
  render: () => \`
    \${legendStyles}
    <style>
      .metric-card {
        background: #F8F7FA;
        border: 1px solid #E0E0E0;
        border-radius: 8px;
        padding: 16px;
        text-align: center;
      }
      
      .metric-value {
        font-size: 32px;
        font-weight: 700;
        margin: 8px 0;
      }
      
      .metric-label {
        font-size: 13px;
        color: #6E6B7B;
        text-transform: uppercase;
        letter-spacing: 0.5px;
      }
    </style>
    <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; max-width: 800px; margin-bottom: 24px;">
      <div class="metric-card">
        <div class="metric-label">Below Basic</div>
        <div class="metric-value" style="color: #EA5455;">12</div>
        <span class="status-badge status-below-basic">15%</span>
      </div>
      <div class="metric-card">
        <div class="metric-label">Basic</div>
        <div class="metric-value" style="color: #FF9F43;">23</div>
        <span class="status-badge status-basic">29%</span>
      </div>
      <div class="metric-card">
        <div class="metric-label">Proficient</div>
        <div class="metric-value" style="color: #28C76F;">35</div>
        <span class="status-badge status-proficient">44%</span>
      </div>
      <div class="metric-card">
        <div class="metric-label">Advanced</div>
        <div class="metric-value" style="color: #6E63E8;">10</div>
        <span class="status-badge status-advanced">12%</span>
      </div>
    </div>
    
    <div class="legend-enum-container">
      <div class="legend-enum-row">
        <span class="legend-label">Legenda:</span>
        <span class="status-badge status-below-basic">Below Basic</span>
        <span class="status-badge status-basic">Basic</span>
        <span class="status-badge status-proficient">Proficient</span>
        <span class="status-badge status-advanced">Advanced</span>
      </div>
      <p class="legend-description">
        Dashboard de proficiência: 80 alunos distribuídos em 4 níveis
      </p>
    </div>
  \`
}`,...(h=(w=t.parameters)==null?void 0:w.docs)==null?void 0:h.source}}};var y,E,B;i.parameters={...i.parameters,docs:{...(y=i.parameters)==null?void 0:y.docs,source:{originalSource:`{
  render: () => \`
    \${legendStyles}
    <style>
      .proficiency-table {
        width: 100%;
        border-collapse: collapse;
        margin-bottom: 24px;
        background: white;
        border: 1px solid #E0E0E0;
        border-radius: 8px;
        overflow: hidden;
      }
      
      .proficiency-table th {
        background: #F8F7FA;
        padding: 12px 16px;
        text-align: left;
        font-weight: 600;
        font-size: 13px;
        color: #5D596C;
        text-transform: uppercase;
        border-bottom: 2px solid #E0E0E0;
      }
      
      .proficiency-table td {
        padding: 12px 16px;
        border-bottom: 1px solid #F0F0F0;
        font-size: 14px;
        color: #5D596C;
      }
      
      .proficiency-table tr:last-child td {
        border-bottom: none;
      }
    </style>
    
    <table class="proficiency-table">
      <thead>
        <tr>
          <th>Aluno</th>
          <th>Disciplina</th>
          <th>Nota</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Ana Silva</td>
          <td>Matemática</td>
          <td>9.2</td>
          <td><span class="status-badge status-advanced">Advanced</span></td>
        </tr>
        <tr>
          <td>Bruno Costa</td>
          <td>Português</td>
          <td>7.8</td>
          <td><span class="status-badge status-proficient">Proficient</span></td>
        </tr>
        <tr>
          <td>Carlos Mendes</td>
          <td>História</td>
          <td>6.1</td>
          <td><span class="status-badge status-basic">Basic</span></td>
        </tr>
        <tr>
          <td>Diana Alves</td>
          <td>Ciências</td>
          <td>4.5</td>
          <td><span class="status-badge status-below-basic">Below Basic</span></td>
        </tr>
      </tbody>
    </table>
    
    <div class="legend-enum-container">
      <div class="legend-enum-row">
        <span class="legend-label">Critérios:</span>
        <span class="status-badge status-below-basic">&lt; 5.0</span>
        <span class="status-badge status-basic">5.0 - 6.9</span>
        <span class="status-badge status-proficient">7.0 - 8.9</span>
        <span class="status-badge status-advanced">≥ 9.0</span>
      </div>
    </div>
  \`
}`,...(B=(E=i.parameters)==null?void 0:E.docs)==null?void 0:B.source}}};var A,F,D;d.parameters={...d.parameters,docs:{...(A=d.parameters)==null?void 0:A.docs,source:{originalSource:`{
  render: () => \`
    \${legendStyles}
    <style>
      .status-badge-compact {
        display: inline-flex;
        align-items: center;
        padding: 4px 8px;
        border-radius: 3px;
        font-size: 11px;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.2px;
      }
    </style>
    <div class="legend-enum-container" style="padding: 12px;">
      <div class="legend-enum-row" style="font-size: 12px; gap: 12px;">
        <span class="legend-label" style="font-size: 12px;">Status:</span>
        <span class="status-badge-compact status-below-basic">Below</span>
        <span class="status-badge-compact status-basic">Basic</span>
        <span class="status-badge-compact status-proficient">Prof.</span>
        <span class="status-badge-compact status-advanced">Adv.</span>
      </div>
    </div>
  \`
}`,...(D=(F=d.parameters)==null?void 0:F.docs)==null?void 0:D.source}}};var S,C,P;l.parameters={...l.parameters,docs:{...(S=l.parameters)==null?void 0:S.docs,source:{originalSource:`{
  render: () => \`
    \${legendStyles}
    <div style="display: flex; flex-direction: column; gap: 16px; max-width: 700px;">
      <div class="legend-enum-container">
        <div class="legend-enum-row">
          <span class="legend-label">Below Basic:</span>
          <span class="status-badge status-below-basic">
            <i class="bi bi-x-circle-fill" style="margin-right: 6px;"></i>
            Below Basic
          </span>
        </div>
      </div>
      
      <div class="legend-enum-container">
        <div class="legend-enum-row">
          <span class="legend-label">Basic:</span>
          <span class="status-badge status-basic">
            <i class="bi bi-exclamation-triangle-fill" style="margin-right: 6px;"></i>
            Basic
          </span>
        </div>
      </div>
      
      <div class="legend-enum-container">
        <div class="legend-enum-row">
          <span class="legend-label">Proficient:</span>
          <span class="status-badge status-proficient">
            <i class="bi bi-check-circle-fill" style="margin-right: 6px;"></i>
            Proficient
          </span>
        </div>
      </div>
      
      <div class="legend-enum-container">
        <div class="legend-enum-row">
          <span class="legend-label">Advanced:</span>
          <span class="status-badge status-advanced">
            <i class="bi bi-star-fill" style="margin-right: 6px;"></i>
            Advanced
          </span>
        </div>
      </div>
    </div>
  \`
}`,...(P=(C=l.parameters)==null?void 0:C.docs)==null?void 0:P.source}}};var z,k,$;c.parameters={...c.parameters,docs:{...(z=c.parameters)==null?void 0:z.docs,source:{originalSource:`{
  render: () => \`
    \${legendStyles}
    <div style="background: #E3F2FD; border-left: 4px solid #2196F3; padding: 16px; border-radius: 6px; margin-bottom: 24px; max-width: 700px;">
      <h4 style="font-size: 14px; font-weight: 600; color: #1565C0; margin: 0 0 8px 0;">
        <i class="bi bi-phone"></i> LegendEnum: Responsivo
      </h4>
      <ul style="margin: 0; padding-left: 20px; font-size: 13px; color: #1976D2;">
        <li>Desktop: flex-row com badges lado a lado</li>
        <li>Mobile (&lt;576px): flex-column empilhado</li>
        <li>Gap responsivo: 16px → 12px mobile</li>
        <li>Padding: 20px → 16px mobile</li>
      </ul>
    </div>
    
    <div class="legend-enum-container">
      <div class="legend-enum-row">
        <span class="legend-label">Níveis de Proficiência:</span>
        <span class="status-badge status-below-basic">
          <i class="bi bi-x-circle-fill" style="margin-right: 6px;"></i>
          Below Basic
        </span>
        <span class="status-badge status-basic">
          <i class="bi bi-exclamation-triangle-fill" style="margin-right: 6px;"></i>
          Basic
        </span>
        <span class="status-badge status-proficient">
          <i class="bi bi-check-circle-fill" style="margin-right: 6px;"></i>
          Proficient
        </span>
        <span class="status-badge status-advanced">
          <i class="bi bi-star-fill" style="margin-right: 6px;"></i>
          Advanced
        </span>
      </div>
      <hr class="legend-divider">
      <p class="legend-description">
        Em mobile, badges empilham verticalmente para melhor legibilidade
      </p>
    </div>
  \`
}`,...($=(k=c.parameters)==null?void 0:k.docs)==null?void 0:$.source}}};const M=["Default","AllStatuses","MultipleStatuses","WithMetrics","InTable","CompactVariant","WithIcons","Responsive"];export{e as AllStatuses,d as CompactVariant,a as Default,i as InTable,n as MultipleStatuses,c as Responsive,l as WithIcons,t as WithMetrics,M as __namedExportsOrder,V as default};
