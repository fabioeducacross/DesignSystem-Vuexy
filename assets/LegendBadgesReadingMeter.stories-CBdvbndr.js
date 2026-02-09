const S={title:"Educacross Components V2/Legends/LegendBadgesReadingMeter",tags:["autodocs"],parameters:{layout:"padded",docs:{description:{component:`
# LegendBadgesReadingMeter

Badges de níveis para **medidor de leitura** (Reading Meter) do Educacross.

## Contexto de Uso

- **Reading meter**: Medir proficiência de leitura dos alunos
- **Níveis progressivos**: Iniciante → Intermediário → Avançado
- **Gamificação**: Badges motivacionais para progresso
- **Dashboards de leitura**: Mostrar nível atual do aluno
- **Relatórios pedagógicos**: Acompanhar evolução de leitura

## Estrutura

\`\`\`
+-------------------+
| 🔰 Iniciante     |  ← Badge pill nível básico
+-------------------+
| 📚 Intermediário |  ← Badge pill nível médio
+-------------------+
| 🏆 Avançado      |  ← Badge pill nível alto
+-------------------+
\`\`\`

## Reading Meter Levels

| Nível | Color | Hex | Icon | Critério |
|-------|-------|-----|------|----------|
| **Iniciante** | 🟡 Amarelo | #FF9F43 | 🔰 | 0-30 livros |
| **Intermediário** | 🔵 Azul | #6E63E8 | 📚 | 31-60 livros |
| **Avançado** | 🟢 Verde | #28C76F | 🏆 | 61+ livros |

## Características

- **Badge pill**: border-radius alto (pill shape)
- **Font-size compacto**: font-10 (10px) para badges discretos
- **d-flex align-items-center**: Alinhamento vertical perfeito
- **Gap-1**: Espaçamento 8px entre múltiplos badges
- **Variant colors**: warning (amarelo), primary (azul), success (verde)
- **Gamificação**: Sistema visual motivacional para leitura

## Quando usar

- **Perfil do aluno**: Mostrar nível de leitura atual
- **Dashboard leitura**: Badges em cards de estatísticas
- **Conquistas**: Sistema de badges por marcos de leitura
- **Relatórios**: Indicar progresso em leitura
- **Gamificação**: Motivar alunos com níveis visíveis
        `}}}},e=`
<style>
  .reading-meter-container {
    display: flex;
    align-items: center;
    gap: 8px;
    flex-wrap: wrap;
  }
  
  .reading-badge {
    display: inline-flex;
    align-items: center;
    padding: 6px 12px;
    border-radius: 50rem;
    font-size: 10px;
    font-weight: 600;
    line-height: 1.2;
    text-transform: capitalize;
    white-space: nowrap;
  }
  
  .reading-badge-iniciante {
    background: #FF9F43;
    color: white;
  }
  
  .reading-badge-intermediario {
    background: #6E63E8;
    color: white;
  }
  
  .reading-badge-avancado {
    background: #28C76F;
    color: white;
  }
  
  .reading-badge-icon {
    font-size: 12px;
    margin-right: 4px;
  }
  
  .reading-meter-card {
    background: white;
    border: 1px solid #E0E0E0;
    border-radius: 8px;
    padding: 20px;
    max-width: 400px;
  }
  
  .reading-meter-label {
    font-size: 13px;
    font-weight: 500;
    color: #5D596C;
    margin-bottom: 12px;
  }
  
  .reading-progress-bar {
    background: #F0F0F0;
    height: 8px;
    border-radius: 4px;
    overflow: hidden;
    margin: 12px 0;
  }
  
  .reading-progress-fill {
    height: 100%;
    transition: width 0.3s;
  }
  
  @media (max-width: 576px) {
    .reading-badge {
      font-size: 9px;
      padding: 5px 10px;
    }
  }
</style>
`,a={render:()=>`
    ${e}
    <div class="reading-meter-container">
      <span class="reading-badge reading-badge-intermediario">
        Intermediário
      </span>
    </div>
  `},n={render:()=>`
    ${e}
    <div style="display: flex; flex-direction: column; gap: 16px; max-width: 500px;">
      <div class="reading-meter-card">
        <div class="reading-meter-label">Nível Iniciante</div>
        <span class="reading-badge reading-badge-iniciante">
          🔰 Iniciante
        </span>
        <p style="margin: 12px 0 0 0; font-size: 12px; color: #6E6B7B;">
          0-30 livros lidos • Começando a jornada de leitura
        </p>
      </div>
      
      <div class="reading-meter-card">
        <div class="reading-meter-label">Nível Intermediário</div>
        <span class="reading-badge reading-badge-intermediario">
          📚 Intermediário
        </span>
        <p style="margin: 12px 0 0 0; font-size: 12px; color: #6E6B7B;">
          31-60 livros lidos • Leitor regular e consistente
        </p>
      </div>
      
      <div class="reading-meter-card">
        <div class="reading-meter-label">Nível Avançado</div>
        <span class="reading-badge reading-badge-avancado">
          🏆 Avançado
        </span>
        <p style="margin: 12px 0 0 0; font-size: 12px; color: #6E6B7B;">
          61+ livros lidos • Leitor experiente e dedicado
        </p>
      </div>
    </div>
  `},i={render:()=>`
    ${e}
    <div style="display: flex; flex-direction: column; gap: 20px; max-width: 600px;">
      <div class="reading-meter-card">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
          <span class="reading-badge reading-badge-iniciante">
            🔰 Iniciante
          </span>
          <span style="font-size: 20px; font-weight: 700; color: #FF9F43;">18</span>
        </div>
        <div class="reading-progress-bar">
          <div class="reading-progress-fill" style="width: 60%; background: #FF9F43;"></div>
        </div>
        <div style="display: flex; justify-content: space-between; font-size: 11px; color: #6E6B7B;">
          <span>18 de 30 livros</span>
          <span>60% concluído</span>
        </div>
      </div>
      
      <div class="reading-meter-card">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
          <span class="reading-badge reading-badge-intermediario">
            📚 Intermediário
          </span>
          <span style="font-size: 20px; font-weight: 700; color: #6E63E8;">47</span>
        </div>
        <div class="reading-progress-bar">
          <div class="reading-progress-fill" style="width: 53%; background: #6E63E8;"></div>
        </div>
        <div style="display: flex; justify-content: space-between; font-size: 11px; color: #6E6B7B;">
          <span>47 de 60 livros</span>
          <span>78% concluído</span>
        </div>
      </div>
      
      <div class="reading-meter-card">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
          <span class="reading-badge reading-badge-avancado">
            🏆 Avançado
          </span>
          <span style="font-size: 20px; font-weight: 700; color: #28C76F;">87</span>
        </div>
        <div class="reading-progress-bar">
          <div class="reading-progress-fill" style="width: 100%; background: #28C76F;"></div>
        </div>
        <div style="display: flex; justify-content: space-between; font-size: 11px; color: #6E6B7B;">
          <span>87 livros lidos</span>
          <span>Nível máximo alcançado! 🎉</span>
        </div>
      </div>
    </div>
  `},s={render:()=>`
    ${e}
    <style>
      .profile-card {
        background: white;
        border: 1px solid #E0E0E0;
        border-radius: 12px;
        padding: 24px;
        max-width: 500px;
        box-shadow: 0 2px 8px rgba(0,0,0,0.08);
      }
      
      .profile-header {
        display: flex;
        align-items: center;
        gap: 16px;
        margin-bottom: 20px;
        padding-bottom: 20px;
        border-bottom: 2px solid #F0F0F0;
      }
      
      .profile-avatar {
        width: 64px;
        height: 64px;
        border-radius: 50%;
        background: linear-gradient(135deg, #6E63E8 0%, #8B83F5 100%);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 28px;
        color: white;
        font-weight: 700;
      }
      
      .profile-info {
        flex: 1;
      }
      
      .profile-name {
        font-size: 18px;
        font-weight: 700;
        color: #5D596C;
        margin: 0 0 4px 0;
      }
      
      .profile-subtitle {
        font-size: 13px;
        color: #6E6B7B;
        margin: 0;
      }
      
      .stat-row {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 12px 0;
        border-bottom: 1px solid #F0F0F0;
      }
      
      .stat-row:last-child {
        border-bottom: none;
      }
      
      .stat-label {
        font-size: 13px;
        color: #6E6B7B;
      }
      
      .stat-value {
        font-size: 16px;
        font-weight: 600;
        color: #5D596C;
      }
    </style>
    
    <div class="profile-card">
      <div class="profile-header">
        <div class="profile-avatar">MS</div>
        <div class="profile-info">
          <h3 class="profile-name">Maria Silva</h3>
          <p class="profile-subtitle">5º Ano A • Matrícula: 2026001</p>
        </div>
      </div>
      
      <div class="stat-row">
        <span class="stat-label">Nível de Leitura</span>
        <span class="reading-badge reading-badge-intermediario">
          📚 Intermediário
        </span>
      </div>
      
      <div class="stat-row">
        <span class="stat-label">Livros Lidos</span>
        <span class="stat-value" style="color: #6E63E8;">42 livros</span>
      </div>
      
      <div class="stat-row">
        <span class="stat-label">Meta Atual</span>
        <span class="stat-value">60 livros</span>
      </div>
      
      <div class="stat-row">
        <span class="stat-label">Progresso</span>
        <div style="flex: 1; margin-left: 16px;">
          <div class="reading-progress-bar">
            <div class="reading-progress-fill" style="width: 70%; background: #6E63E8;"></div>
          </div>
        </div>
      </div>
      
      <div style="margin-top: 16px; padding: 12px; background: #F3F2F7; border-radius: 6px; text-align: center;">
        <p style="margin: 0; font-size: 12px; color: #6E6B7B;">
          Faltam apenas <strong style="color: #6E63E8;">18 livros</strong> para o nível Avançado! 🎯
        </p>
      </div>
    </div>
  `},d={render:()=>`
    ${e}
    <div class="reading-meter-card">
      <div class="reading-meter-label">Níveis do Reading Meter</div>
      <div class="reading-meter-container">
        <span class="reading-badge reading-badge-iniciante">
          🔰 Iniciante
        </span>
        <span class="reading-badge reading-badge-intermediario">
          📚 Intermediário
        </span>
        <span class="reading-badge reading-badge-avancado">
          🏆 Avançado
        </span>
      </div>
      <p style="margin: 16px 0 0 0; font-size: 12px; color: #6E6B7B; text-align: center;">
        Sistema de 3 níveis progressivos de proficiência em leitura
      </p>
    </div>
  `},r={render:()=>`
    ${e}
    <style>
      .dashboard-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 16px;
        max-width: 800px;
      }
      
      .dashboard-card {
        background: white;
        border: 1px solid #E0E0E0;
        border-radius: 8px;
        padding: 20px;
        text-align: center;
      }
      
      .dashboard-badge-large {
        font-size: 40px;
        margin-bottom: 12px;
      }
      
      .dashboard-count {
        font-size: 32px;
        font-weight: 700;
        margin: 8px 0;
      }
      
      .dashboard-label {
        font-size: 12px;
        color: #6E6B7B;
        text-transform: uppercase;
        letter-spacing: 0.5px;
      }
      
      @media (max-width: 768px) {
        .dashboard-grid {
          grid-template-columns: 1fr;
        }
      }
    </style>
    
    <div style="max-width: 800px;">
      <h3 style="font-size: 18px; font-weight: 700; color: #5D596C; margin: 0 0 20px 0;">
        Dashboard de Leitura - Turma 5º Ano A
      </h3>
      
      <div class="dashboard-grid">
        <div class="dashboard-card">
          <div class="dashboard-badge-large">🔰</div>
          <div class="dashboard-count" style="color: #FF9F43;">12</div>
          <div class="dashboard-label">Alunos Iniciantes</div>
          <div style="margin-top: 12px;">
            <span class="reading-badge reading-badge-iniciante">Iniciante</span>
          </div>
          <p style="margin: 12px 0 0 0; font-size: 11px; color: #6E6B7B;">
            0-30 livros
          </p>
        </div>
        
        <div class="dashboard-card">
          <div class="dashboard-badge-large">📚</div>
          <div class="dashboard-count" style="color: #6E63E8;">18</div>
          <div class="dashboard-label">Alunos Intermediários</div>
          <div style="margin-top: 12px;">
            <span class="reading-badge reading-badge-intermediario">Intermediário</span>
          </div>
          <p style="margin: 12px 0 0 0; font-size: 11px; color: #6E6B7B;">
            31-60 livros
          </p>
        </div>
        
        <div class="dashboard-card">
          <div class="dashboard-badge-large">🏆</div>
          <div class="dashboard-count" style="color: #28C76F;">8</div>
          <div class="dashboard-label">Alunos Avançados</div>
          <div style="margin-top: 12px;">
            <span class="reading-badge reading-badge-avancado">Avançado</span>
          </div>
          <p style="margin: 12px 0 0 0; font-size: 11px; color: #6E6B7B;">
            61+ livros
          </p>
        </div>
      </div>
      
      <div style="margin-top: 24px; padding: 16px; background: #F8F7FA; border-radius: 8px; border-left: 4px solid #6E63E8;">
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <div>
            <h4 style="font-size: 14px; font-weight: 600; color: #5D596C; margin: 0 0 4px 0;">
              Média da Turma
            </h4>
            <p style="margin: 0; font-size: 12px; color: #6E6B7B;">
              Total de 38 alunos
            </p>
          </div>
          <div style="text-align: right;">
            <div style="font-size: 24px; font-weight: 700; color: #6E63E8;">42</div>
            <div style="font-size: 11px; color: #6E6B7B;">livros/aluno</div>
          </div>
        </div>
      </div>
    </div>
  `},t={render:()=>`
    ${e}
    <style>
      .achievement-list {
        max-width: 500px;
      }
      
      .achievement-item {
        background: white;
        border: 1px solid #E0E0E0;
        border-radius: 8px;
        padding: 16px;
        margin-bottom: 12px;
        display: flex;
        align-items: center;
        gap: 16px;
        transition: transform 0.2s, box-shadow 0.2s;
      }
      
      .achievement-item:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0,0,0,0.1);
      }
      
      .achievement-icon {
        width: 48px;
        height: 48px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 24px;
        flex-shrink: 0;
      }
      
      .achievement-content {
        flex: 1;
      }
      
      .achievement-title {
        font-size: 14px;
        font-weight: 600;
        color: #5D596C;
        margin: 0 0 4px 0;
      }
      
      .achievement-desc {
        font-size: 12px;
        color: #6E6B7B;
        margin: 0;
      }
    </style>
    
    <div class="achievement-list">
      <h3 style="font-size: 18px; font-weight: 700; color: #5D596C; margin: 0 0 20px 0;">
        Conquistas de Leitura
      </h3>
      
      <div class="achievement-item">
        <div class="achievement-icon" style="background: rgba(255,159,67,0.12);">
          🔰
        </div>
        <div class="achievement-content">
          <h4 class="achievement-title">Primeiro Passo</h4>
          <p class="achievement-desc">Complete 10 livros e alcance o nível Iniciante</p>
        </div>
        <span class="reading-badge reading-badge-iniciante">Iniciante</span>
      </div>
      
      <div class="achievement-item">
        <div class="achievement-icon" style="background: rgba(110,99,232,0.12);">
          📚
        </div>
        <div class="achievement-content">
          <h4 class="achievement-title">Leitor Dedicado</h4>
          <p class="achievement-desc">Leia 40 livros e atinja o nível Intermediário</p>
        </div>
        <span class="reading-badge reading-badge-intermediario">Intermediário</span>
      </div>
      
      <div class="achievement-item">
        <div class="achievement-icon" style="background: rgba(40,199,111,0.12);">
          🏆
        </div>
        <div class="achievement-content">
          <h4 class="achievement-title">Mestre da Leitura</h4>
          <p class="achievement-desc">Leia 70 livros e conquiste o nível Avançado</p>
        </div>
        <span class="reading-badge reading-badge-avancado">Avançado</span>
      </div>
      
      <div class="achievement-item" style="border: 2px solid #FFD700; background: linear-gradient(135deg, #FFF8E1 0%, #FFECB3 100%);">
        <div class="achievement-icon" style="background: #FFD700;">
          ⭐
        </div>
        <div class="achievement-content">
          <h4 class="achievement-title" style="color: #F57F17;">Leitor do Ano</h4>
          <p class="achievement-desc" style="color: #F9A825;">Leia 100 livros e torne-se Leitor do Ano!</p>
        </div>
        <span class="reading-badge" style="background: #FFD700; color: #5D596C; font-weight: 700;">
          ⭐ Especial
        </span>
      </div>
    </div>
  `},o={render:()=>`
    ${e}
    <div style="background: #FFF3E0; border-left: 4px solid #FF9F43; padding: 16px; border-radius: 6px; margin-bottom: 24px; max-width: 700px;">
      <h4 style="font-size: 14px; font-weight: 600; color: #F57F17; margin: 0 0 8px 0;">
        <i class="bi bi-book"></i> LegendBadgesReadingMeter: Responsivo
      </h4>
      <ul style="margin: 0; padding-left: 20px; font-size: 13px; color: #F9A825;">
        <li><strong>Pill shape:</strong> border-radius 50rem para formato arredondado</li>
        <li><strong>Font-size compacto:</strong> 10px desktop → 9px mobile</li>
        <li><strong>Flex wrap:</strong> Badges empilham quando necessário</li>
        <li><strong>Gap:</strong> 8px entre badges para espaçamento uniforme</li>
      </ul>
    </div>
    
    <div style="display: flex; flex-direction: column; gap: 20px; max-width: 600px;">
      <div class="reading-meter-card">
        <div class="reading-meter-label">Desktop: Badges lado a lado</div>
        <div class="reading-meter-container">
          <span class="reading-badge reading-badge-iniciante">
            🔰 Iniciante
          </span>
          <span class="reading-badge reading-badge-intermediario">
            📚 Intermediário
          </span>
          <span class="reading-badge reading-badge-avancado">
            🏆 Avançado
          </span>
        </div>
      </div>
      
      <div class="reading-meter-card" style="max-width: 300px;">
        <div class="reading-meter-label">Mobile: Flex wrap automático</div>
        <div class="reading-meter-container">
          <span class="reading-badge reading-badge-iniciante">
            🔰 Iniciante
          </span>
          <span class="reading-badge reading-badge-intermediario">
            📚 Intermediário
          </span>
          <span class="reading-badge reading-badge-avancado">
            🏆 Avançado
          </span>
        </div>
        <p style="margin: 12px 0 0 0; font-size: 11px; color: #6E6B7B;">
          Em telas pequenas, badges empilham preservando legibilidade
        </p>
      </div>
    </div>
  `};var l,c,p;a.parameters={...a.parameters,docs:{...(l=a.parameters)==null?void 0:l.docs,source:{originalSource:`{
  render: () => \`
    \${badgesStyles}
    <div class="reading-meter-container">
      <span class="reading-badge reading-badge-intermediario">
        Intermediário
      </span>
    </div>
  \`
}`,...(p=(c=a.parameters)==null?void 0:c.docs)==null?void 0:p.source}}};var g,v,m;n.parameters={...n.parameters,docs:{...(g=n.parameters)==null?void 0:g.docs,source:{originalSource:`{
  render: () => \`
    \${badgesStyles}
    <div style="display: flex; flex-direction: column; gap: 16px; max-width: 500px;">
      <div class="reading-meter-card">
        <div class="reading-meter-label">Nível Iniciante</div>
        <span class="reading-badge reading-badge-iniciante">
          🔰 Iniciante
        </span>
        <p style="margin: 12px 0 0 0; font-size: 12px; color: #6E6B7B;">
          0-30 livros lidos • Começando a jornada de leitura
        </p>
      </div>
      
      <div class="reading-meter-card">
        <div class="reading-meter-label">Nível Intermediário</div>
        <span class="reading-badge reading-badge-intermediario">
          📚 Intermediário
        </span>
        <p style="margin: 12px 0 0 0; font-size: 12px; color: #6E6B7B;">
          31-60 livros lidos • Leitor regular e consistente
        </p>
      </div>
      
      <div class="reading-meter-card">
        <div class="reading-meter-label">Nível Avançado</div>
        <span class="reading-badge reading-badge-avancado">
          🏆 Avançado
        </span>
        <p style="margin: 12px 0 0 0; font-size: 12px; color: #6E6B7B;">
          61+ livros lidos • Leitor experiente e dedicado
        </p>
      </div>
    </div>
  \`
}`,...(m=(v=n.parameters)==null?void 0:v.docs)==null?void 0:m.source}}};var x,b,u;i.parameters={...i.parameters,docs:{...(x=i.parameters)==null?void 0:x.docs,source:{originalSource:`{
  render: () => \`
    \${badgesStyles}
    <div style="display: flex; flex-direction: column; gap: 20px; max-width: 600px;">
      <div class="reading-meter-card">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
          <span class="reading-badge reading-badge-iniciante">
            🔰 Iniciante
          </span>
          <span style="font-size: 20px; font-weight: 700; color: #FF9F43;">18</span>
        </div>
        <div class="reading-progress-bar">
          <div class="reading-progress-fill" style="width: 60%; background: #FF9F43;"></div>
        </div>
        <div style="display: flex; justify-content: space-between; font-size: 11px; color: #6E6B7B;">
          <span>18 de 30 livros</span>
          <span>60% concluído</span>
        </div>
      </div>
      
      <div class="reading-meter-card">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
          <span class="reading-badge reading-badge-intermediario">
            📚 Intermediário
          </span>
          <span style="font-size: 20px; font-weight: 700; color: #6E63E8;">47</span>
        </div>
        <div class="reading-progress-bar">
          <div class="reading-progress-fill" style="width: 53%; background: #6E63E8;"></div>
        </div>
        <div style="display: flex; justify-content: space-between; font-size: 11px; color: #6E6B7B;">
          <span>47 de 60 livros</span>
          <span>78% concluído</span>
        </div>
      </div>
      
      <div class="reading-meter-card">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
          <span class="reading-badge reading-badge-avancado">
            🏆 Avançado
          </span>
          <span style="font-size: 20px; font-weight: 700; color: #28C76F;">87</span>
        </div>
        <div class="reading-progress-bar">
          <div class="reading-progress-fill" style="width: 100%; background: #28C76F;"></div>
        </div>
        <div style="display: flex; justify-content: space-between; font-size: 11px; color: #6E6B7B;">
          <span>87 livros lidos</span>
          <span>Nível máximo alcançado! 🎉</span>
        </div>
      </div>
    </div>
  \`
}`,...(u=(b=i.parameters)==null?void 0:b.docs)==null?void 0:u.source}}};var h,f,y;s.parameters={...s.parameters,docs:{...(h=s.parameters)==null?void 0:h.docs,source:{originalSource:`{
  render: () => \`
    \${badgesStyles}
    <style>
      .profile-card {
        background: white;
        border: 1px solid #E0E0E0;
        border-radius: 12px;
        padding: 24px;
        max-width: 500px;
        box-shadow: 0 2px 8px rgba(0,0,0,0.08);
      }
      
      .profile-header {
        display: flex;
        align-items: center;
        gap: 16px;
        margin-bottom: 20px;
        padding-bottom: 20px;
        border-bottom: 2px solid #F0F0F0;
      }
      
      .profile-avatar {
        width: 64px;
        height: 64px;
        border-radius: 50%;
        background: linear-gradient(135deg, #6E63E8 0%, #8B83F5 100%);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 28px;
        color: white;
        font-weight: 700;
      }
      
      .profile-info {
        flex: 1;
      }
      
      .profile-name {
        font-size: 18px;
        font-weight: 700;
        color: #5D596C;
        margin: 0 0 4px 0;
      }
      
      .profile-subtitle {
        font-size: 13px;
        color: #6E6B7B;
        margin: 0;
      }
      
      .stat-row {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 12px 0;
        border-bottom: 1px solid #F0F0F0;
      }
      
      .stat-row:last-child {
        border-bottom: none;
      }
      
      .stat-label {
        font-size: 13px;
        color: #6E6B7B;
      }
      
      .stat-value {
        font-size: 16px;
        font-weight: 600;
        color: #5D596C;
      }
    </style>
    
    <div class="profile-card">
      <div class="profile-header">
        <div class="profile-avatar">MS</div>
        <div class="profile-info">
          <h3 class="profile-name">Maria Silva</h3>
          <p class="profile-subtitle">5º Ano A • Matrícula: 2026001</p>
        </div>
      </div>
      
      <div class="stat-row">
        <span class="stat-label">Nível de Leitura</span>
        <span class="reading-badge reading-badge-intermediario">
          📚 Intermediário
        </span>
      </div>
      
      <div class="stat-row">
        <span class="stat-label">Livros Lidos</span>
        <span class="stat-value" style="color: #6E63E8;">42 livros</span>
      </div>
      
      <div class="stat-row">
        <span class="stat-label">Meta Atual</span>
        <span class="stat-value">60 livros</span>
      </div>
      
      <div class="stat-row">
        <span class="stat-label">Progresso</span>
        <div style="flex: 1; margin-left: 16px;">
          <div class="reading-progress-bar">
            <div class="reading-progress-fill" style="width: 70%; background: #6E63E8;"></div>
          </div>
        </div>
      </div>
      
      <div style="margin-top: 16px; padding: 12px; background: #F3F2F7; border-radius: 6px; text-align: center;">
        <p style="margin: 0; font-size: 12px; color: #6E6B7B;">
          Faltam apenas <strong style="color: #6E63E8;">18 livros</strong> para o nível Avançado! 🎯
        </p>
      </div>
    </div>
  \`
}`,...(y=(f=s.parameters)==null?void 0:f.docs)==null?void 0:y.source}}};var E,F,D;d.parameters={...d.parameters,docs:{...(E=d.parameters)==null?void 0:E.docs,source:{originalSource:`{
  render: () => \`
    \${badgesStyles}
    <div class="reading-meter-card">
      <div class="reading-meter-label">Níveis do Reading Meter</div>
      <div class="reading-meter-container">
        <span class="reading-badge reading-badge-iniciante">
          🔰 Iniciante
        </span>
        <span class="reading-badge reading-badge-intermediario">
          📚 Intermediário
        </span>
        <span class="reading-badge reading-badge-avancado">
          🏆 Avançado
        </span>
      </div>
      <p style="margin: 16px 0 0 0; font-size: 12px; color: #6E6B7B; text-align: center;">
        Sistema de 3 níveis progressivos de proficiência em leitura
      </p>
    </div>
  \`
}`,...(D=(F=d.parameters)==null?void 0:F.docs)==null?void 0:D.source}}};var w,B,z;r.parameters={...r.parameters,docs:{...(w=r.parameters)==null?void 0:w.docs,source:{originalSource:`{
  render: () => \`
    \${badgesStyles}
    <style>
      .dashboard-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 16px;
        max-width: 800px;
      }
      
      .dashboard-card {
        background: white;
        border: 1px solid #E0E0E0;
        border-radius: 8px;
        padding: 20px;
        text-align: center;
      }
      
      .dashboard-badge-large {
        font-size: 40px;
        margin-bottom: 12px;
      }
      
      .dashboard-count {
        font-size: 32px;
        font-weight: 700;
        margin: 8px 0;
      }
      
      .dashboard-label {
        font-size: 12px;
        color: #6E6B7B;
        text-transform: uppercase;
        letter-spacing: 0.5px;
      }
      
      @media (max-width: 768px) {
        .dashboard-grid {
          grid-template-columns: 1fr;
        }
      }
    </style>
    
    <div style="max-width: 800px;">
      <h3 style="font-size: 18px; font-weight: 700; color: #5D596C; margin: 0 0 20px 0;">
        Dashboard de Leitura - Turma 5º Ano A
      </h3>
      
      <div class="dashboard-grid">
        <div class="dashboard-card">
          <div class="dashboard-badge-large">🔰</div>
          <div class="dashboard-count" style="color: #FF9F43;">12</div>
          <div class="dashboard-label">Alunos Iniciantes</div>
          <div style="margin-top: 12px;">
            <span class="reading-badge reading-badge-iniciante">Iniciante</span>
          </div>
          <p style="margin: 12px 0 0 0; font-size: 11px; color: #6E6B7B;">
            0-30 livros
          </p>
        </div>
        
        <div class="dashboard-card">
          <div class="dashboard-badge-large">📚</div>
          <div class="dashboard-count" style="color: #6E63E8;">18</div>
          <div class="dashboard-label">Alunos Intermediários</div>
          <div style="margin-top: 12px;">
            <span class="reading-badge reading-badge-intermediario">Intermediário</span>
          </div>
          <p style="margin: 12px 0 0 0; font-size: 11px; color: #6E6B7B;">
            31-60 livros
          </p>
        </div>
        
        <div class="dashboard-card">
          <div class="dashboard-badge-large">🏆</div>
          <div class="dashboard-count" style="color: #28C76F;">8</div>
          <div class="dashboard-label">Alunos Avançados</div>
          <div style="margin-top: 12px;">
            <span class="reading-badge reading-badge-avancado">Avançado</span>
          </div>
          <p style="margin: 12px 0 0 0; font-size: 11px; color: #6E6B7B;">
            61+ livros
          </p>
        </div>
      </div>
      
      <div style="margin-top: 24px; padding: 16px; background: #F8F7FA; border-radius: 8px; border-left: 4px solid #6E63E8;">
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <div>
            <h4 style="font-size: 14px; font-weight: 600; color: #5D596C; margin: 0 0 4px 0;">
              Média da Turma
            </h4>
            <p style="margin: 0; font-size: 12px; color: #6E6B7B;">
              Total de 38 alunos
            </p>
          </div>
          <div style="text-align: right;">
            <div style="font-size: 24px; font-weight: 700; color: #6E63E8;">42</div>
            <div style="font-size: 11px; color: #6E6B7B;">livros/aluno</div>
          </div>
        </div>
      </div>
    </div>
  \`
}`,...(z=(B=r.parameters)==null?void 0:B.docs)==null?void 0:z.source}}};var A,C,I;t.parameters={...t.parameters,docs:{...(A=t.parameters)==null?void 0:A.docs,source:{originalSource:`{
  render: () => \`
    \${badgesStyles}
    <style>
      .achievement-list {
        max-width: 500px;
      }
      
      .achievement-item {
        background: white;
        border: 1px solid #E0E0E0;
        border-radius: 8px;
        padding: 16px;
        margin-bottom: 12px;
        display: flex;
        align-items: center;
        gap: 16px;
        transition: transform 0.2s, box-shadow 0.2s;
      }
      
      .achievement-item:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0,0,0,0.1);
      }
      
      .achievement-icon {
        width: 48px;
        height: 48px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 24px;
        flex-shrink: 0;
      }
      
      .achievement-content {
        flex: 1;
      }
      
      .achievement-title {
        font-size: 14px;
        font-weight: 600;
        color: #5D596C;
        margin: 0 0 4px 0;
      }
      
      .achievement-desc {
        font-size: 12px;
        color: #6E6B7B;
        margin: 0;
      }
    </style>
    
    <div class="achievement-list">
      <h3 style="font-size: 18px; font-weight: 700; color: #5D596C; margin: 0 0 20px 0;">
        Conquistas de Leitura
      </h3>
      
      <div class="achievement-item">
        <div class="achievement-icon" style="background: rgba(255,159,67,0.12);">
          🔰
        </div>
        <div class="achievement-content">
          <h4 class="achievement-title">Primeiro Passo</h4>
          <p class="achievement-desc">Complete 10 livros e alcance o nível Iniciante</p>
        </div>
        <span class="reading-badge reading-badge-iniciante">Iniciante</span>
      </div>
      
      <div class="achievement-item">
        <div class="achievement-icon" style="background: rgba(110,99,232,0.12);">
          📚
        </div>
        <div class="achievement-content">
          <h4 class="achievement-title">Leitor Dedicado</h4>
          <p class="achievement-desc">Leia 40 livros e atinja o nível Intermediário</p>
        </div>
        <span class="reading-badge reading-badge-intermediario">Intermediário</span>
      </div>
      
      <div class="achievement-item">
        <div class="achievement-icon" style="background: rgba(40,199,111,0.12);">
          🏆
        </div>
        <div class="achievement-content">
          <h4 class="achievement-title">Mestre da Leitura</h4>
          <p class="achievement-desc">Leia 70 livros e conquiste o nível Avançado</p>
        </div>
        <span class="reading-badge reading-badge-avancado">Avançado</span>
      </div>
      
      <div class="achievement-item" style="border: 2px solid #FFD700; background: linear-gradient(135deg, #FFF8E1 0%, #FFECB3 100%);">
        <div class="achievement-icon" style="background: #FFD700;">
          ⭐
        </div>
        <div class="achievement-content">
          <h4 class="achievement-title" style="color: #F57F17;">Leitor do Ano</h4>
          <p class="achievement-desc" style="color: #F9A825;">Leia 100 livros e torne-se Leitor do Ano!</p>
        </div>
        <span class="reading-badge" style="background: #FFD700; color: #5D596C; font-weight: 700;">
          ⭐ Especial
        </span>
      </div>
    </div>
  \`
}`,...(I=(C=t.parameters)==null?void 0:C.docs)==null?void 0:I.source}}};var k,L,M;o.parameters={...o.parameters,docs:{...(k=o.parameters)==null?void 0:k.docs,source:{originalSource:`{
  render: () => \`
    \${badgesStyles}
    <div style="background: #FFF3E0; border-left: 4px solid #FF9F43; padding: 16px; border-radius: 6px; margin-bottom: 24px; max-width: 700px;">
      <h4 style="font-size: 14px; font-weight: 600; color: #F57F17; margin: 0 0 8px 0;">
        <i class="bi bi-book"></i> LegendBadgesReadingMeter: Responsivo
      </h4>
      <ul style="margin: 0; padding-left: 20px; font-size: 13px; color: #F9A825;">
        <li><strong>Pill shape:</strong> border-radius 50rem para formato arredondado</li>
        <li><strong>Font-size compacto:</strong> 10px desktop → 9px mobile</li>
        <li><strong>Flex wrap:</strong> Badges empilham quando necessário</li>
        <li><strong>Gap:</strong> 8px entre badges para espaçamento uniforme</li>
      </ul>
    </div>
    
    <div style="display: flex; flex-direction: column; gap: 20px; max-width: 600px;">
      <div class="reading-meter-card">
        <div class="reading-meter-label">Desktop: Badges lado a lado</div>
        <div class="reading-meter-container">
          <span class="reading-badge reading-badge-iniciante">
            🔰 Iniciante
          </span>
          <span class="reading-badge reading-badge-intermediario">
            📚 Intermediário
          </span>
          <span class="reading-badge reading-badge-avancado">
            🏆 Avançado
          </span>
        </div>
      </div>
      
      <div class="reading-meter-card" style="max-width: 300px;">
        <div class="reading-meter-label">Mobile: Flex wrap automático</div>
        <div class="reading-meter-container">
          <span class="reading-badge reading-badge-iniciante">
            🔰 Iniciante
          </span>
          <span class="reading-badge reading-badge-intermediario">
            📚 Intermediário
          </span>
          <span class="reading-badge reading-badge-avancado">
            🏆 Avançado
          </span>
        </div>
        <p style="margin: 12px 0 0 0; font-size: 11px; color: #6E6B7B;">
          Em telas pequenas, badges empilham preservando legibilidade
        </p>
      </div>
    </div>
  \`
}`,...(M=(L=o.parameters)==null?void 0:L.docs)==null?void 0:M.source}}};const j=["Default","AllLevels","WithProgress","InStudentProfile","MultipleBadges","Dashboard","WithAchievements","Responsive"];export{n as AllLevels,r as Dashboard,a as Default,s as InStudentProfile,d as MultipleBadges,o as Responsive,t as WithAchievements,i as WithProgress,j as __namedExportsOrder,S as default};
