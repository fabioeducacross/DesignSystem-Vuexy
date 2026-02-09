const k={title:"Educacross Components V2/Teachers/listInitialsTeacher",tags:["autodocs"],parameters:{layout:"padded",docs:{description:{component:`
# listInitialsTeacher

Componente de **lista de avatares de professores** com badge de overflow.

## Contexto de Uso

- **Turmas**: Mostrar professores atribuídos a uma turma
- **Disciplinas**: Listar docentes que lecionam matéria
- **Missões**: Exibir professores responsáveis por atividade
- **Projetos**: Mostrar equipe de professores colaboradores
- **Relatórios**: Indicar professores envolvidos em métrica

## Estrutura

\`\`\`
+-----------------------------------------------+
| [JM] [AS] [MC] [+5]  ← 3 avatars + overflow   |
|   ↑    ↑    ↑    ↑                            |
| João  Ana  Maria  Hover p/ ver outros 5       |
+-----------------------------------------------+
\`\`\`

## Características

- **Avatars inline**: d-flex flex-no-wrap com gap-2 (16px)
- **Initials**: Primeiras letras do nome (João Mendes = JM)
- **Tooltip**: Hover no avatar exibe nome completo
- **Overflow badge**: "+N" indica quantos professores não cabem
- **Popover on badge**: Hover no +N exibe lista completa dos demais
- **Responsive**: Ajusta quantidade visível conforme largura
- **Compact display**: Economiza espaço mostrando apenas essenciais

## Props

Componente estrutural que geralmente recebe:
- **teachers**: Array de professores [{name, avatar, id}]
- **maxVisible**: Máximo de avatars visíveis (padrão: 3)
- **size**: Tamanho dos avatars ('sm', 'md', 'lg')
- **variant**: Cor de fundo dos avatars (primary, success, etc)

## Events

Geralmente não emite eventos (componente de exibição)

## Badge Auxiliar

- **Position**: absolute, right: 0, bottom: 0
- **Size**: 14×14px
- **Border**: 2px solid white (separa do avatar)
- **Border-radius**: 50% (circular)
- **Font-size**: 11px
- **Background**: variant color (primary, secondary, etc)

## Quando usar

- **Múltiplos professores**: Quando há >3 professores para listar
- **Espaço limitado**: Cards/tabelas onde não cabe lista completa
- **Visual rápido**: Identificação rápida dos principais responsáveis
- **Hover details**: Detalhes completos via tooltip/popover sem poluir UI
        `}}}},a=`
<style>
  .teacher-list-container {
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    gap: 8px;
  }
  
  .avatars-group {
    display: flex;
    flex-wrap: nowrap;
    gap: 8px;
  }
  
  .teacher-avatar {
    position: relative;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    font-weight: 600;
    color: white;
    cursor: pointer;
    transition: transform 0.2s;
  }
  
  .teacher-avatar:hover {
    transform: scale(1.1);
    z-index: 10;
  }
  
  .avatar-primary { background: #6E63E8; }
  .avatar-success { background: #28C76F; }
  .avatar-info { background: #00CFE8; }
  .avatar-warning { background: #FF9F43; }
  .avatar-danger { background: #EA5455; }
  .avatar-secondary { background: #82868B; }
  
  .overflow-badge-container {
    position: relative;
    display: flex;
    align-items: center;
    margin-left: 4px;
  }
  
  .overflow-badge {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 6px 12px;
    background: #6E63E8;
    color: white;
    border-radius: 50rem;
    font-size: 12px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
  }
  
  .overflow-badge:hover {
    background: #5951D4;
    transform: scale(1.05);
  }
  
  .auxiliar-badge {
    position: absolute;
    right: -2px;
    bottom: -2px;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    border: 2px solid white;
    background: #FF9F43;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 10px;
    font-weight: 700;
    color: white;
  }
  
  .tooltip-box {
    position: absolute;
    bottom: calc(100% + 8px);
    left: 50%;
    transform: translateX(-50%);
    background: #5D596C;
    color: white;
    padding: 6px 12px;
    border-radius: 6px;
    font-size: 12px;
    white-space: nowrap;
    pointer-events: none;
    opacity: 0;
    transition: opacity 0.2s;
    z-index: 1000;
  }
  
  .tooltip-box::after {
    content: '';
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    border: 6px solid transparent;
    border-top-color: #5D596C;
  }
  
  .teacher-avatar:hover .tooltip-box {
    opacity: 1;
  }
  
  .popover-list {
    background: white;
    border: 1px solid #DBDADE;
    border-radius: 8px;
    box-shadow: 0 4px 16px rgba(0,0,0,0.12);
    padding: 12px;
    position: absolute;
    bottom: calc(100% + 8px);
    right: 0;
    min-width: 200px;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.2s;
    z-index: 1000;
  }
  
  .overflow-badge-container:hover .popover-list {
    opacity: 1;
    pointer-events: auto;
  }
  
  .popover-list ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }
  
  .popover-list li {
    padding: 6px 0;
    font-size: 13px;
    color: #5D596C;
    border-bottom: 1px solid #F3F2F7;
  }
  
  .popover-list li:last-child {
    border-bottom: none;
  }
  
  @media (max-width: 576px) {
    .teacher-avatar {
      width: 32px;
      height: 32px;
      font-size: 12px;
    }
    
    .auxiliar-badge {
      width: 14px;
      height: 14px;
      font-size: 9px;
    }
  }
</style>
`,i={render:()=>`
    ${a}
    <div class="teacher-list-container">
      <div class="avatars-group">
        <div class="teacher-avatar avatar-primary">
          <span>JM</span>
          <div class="tooltip-box">João Mendes</div>
        </div>
        <div class="teacher-avatar avatar-success">
          <span>AS</span>
          <div class="tooltip-box">Ana Silva</div>
        </div>
        <div class="teacher-avatar avatar-info">
          <span>MC</span>
          <div class="tooltip-box">Maria Costa</div>
        </div>
      </div>
      
      <div class="overflow-badge-container">
        <span class="overflow-badge">+5</span>
        <div class="popover-list">
          <ul>
            <li>Pedro Santos</li>
            <li>Carla Oliveira</li>
            <li>Lucas Ferreira</li>
            <li>Julia Almeida</li>
            <li>Bruno Rocha</li>
          </ul>
        </div>
      </div>
    </div>
  `},s={render:()=>`
    ${a}
    <div class="teacher-list-container">
      <div class="avatars-group">
        <div class="teacher-avatar avatar-primary">
          <span>RP</span>
          <div class="tooltip-box">Roberto Pereira</div>
        </div>
        <div class="teacher-avatar avatar-warning">
          <span>FM</span>
          <div class="tooltip-box">Fernanda Martins</div>
        </div>
      </div>
    </div>
    
    <p style="font-size: 13px; color: #6E6B7B; margin-top: 12px;">
      <i class="bi bi-info-circle"></i> Apenas 2 professores - sem badge de overflow
    </p>
  `},e={render:()=>`
    ${a}
    <div class="teacher-list-container">
      <div class="avatars-group">
        <div class="teacher-avatar avatar-primary">
          <span>JM</span>
          <div class="auxiliar-badge">2</div>
          <div class="tooltip-box">João Mendes (2 auxiliares)</div>
        </div>
        <div class="teacher-avatar avatar-success">
          <span>AS</span>
          <div class="tooltip-box">Ana Silva</div>
        </div>
        <div class="teacher-avatar avatar-info">
          <span>MC</span>
          <div class="auxiliar-badge">1</div>
          <div class="tooltip-box">Maria Costa (1 auxiliar)</div>
        </div>
      </div>
      
      <div class="overflow-badge-container">
        <span class="overflow-badge">+3</span>
        <div class="popover-list">
          <ul>
            <li>Pedro Santos (1 auxiliar)</li>
            <li>Carla Oliveira</li>
            <li>Lucas Ferreira</li>
          </ul>
        </div>
      </div>
    </div>
    
    <p style="font-size: 13px; color: #6E6B7B; margin-top: 12px;">
      <i class="bi bi-star-fill" style="color: #FF9F43;"></i> Badge laranja indica número de professores auxiliares
    </p>
  `},n={render:()=>`
    ${a}
    <div class="teacher-list-container">
      <div class="avatars-group">
        <div class="teacher-avatar avatar-primary">
          <span>AP</span>
          <div class="tooltip-box">André Pinto</div>
        </div>
        <div class="teacher-avatar avatar-success">
          <span>BS</span>
          <div class="tooltip-box">Beatriz Santos</div>
        </div>
      </div>
      
      <div class="overflow-badge-container">
        <span class="overflow-badge">+15</span>
        <div class="popover-list">
          <ul>
            <li>Carlos Lima</li>
            <li>Diana Souza</li>
            <li>Eduardo Martins</li>
            <li>Fátima Rocha</li>
            <li>Gabriel Alves</li>
            <li>Helena Costa</li>
            <li>Igor Santos</li>
            <li>Juliana Silva</li>
            <li>Kevin Oliveira</li>
            <li>Larissa Pereira</li>
            <li>... e mais 5</li>
          </ul>
        </div>
      </div>
    </div>
    
    <p style="font-size: 13px; color: #6E6B7B; margin-top: 12px;">
      <i class="bi bi-people-fill"></i> Total de 17 professores - mostra 2 + overflow +15
    </p>
  `},t={render:()=>`
    ${a}
    <style>
      .subject-card {
        background: white;
        border: 1px solid #E0E0E0;
        border-radius: 12px;
        padding: 20px;
        box-shadow: 0 2px 8px rgba(0,0,0,0.08);
        max-width: 400px;
      }
      
      .card-header-row {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 16px;
      }
      
      .subject-title {
        font-size: 18px;
        font-weight: 600;
        color: #5D596C;
        display: flex;
        align-items: center;
        gap: 8px;
      }
      
      .card-info {
        display: flex;
        gap: 16px;
        margin-top: 12px;
        padding-top: 12px;
        border-top: 1px solid #F3F2F7;
      }
      
      .info-item {
        font-size: 13px;
        color: #6E6B7B;
      }
      
      .info-label {
        font-weight: 600;
        color: #5D596C;
      }
    </style>
    
    <div class="subject-card">
      <div class="card-header-row">
        <h3 class="subject-title">
          <i class="bi bi-calculator" style="color: #6E63E8;"></i>
          Matemática Avançada
        </h3>
      </div>
      
      <div style="margin-bottom: 12px;">
        <span style="font-size: 12px; font-weight: 600; color: #6E6B7B; text-transform: uppercase; letter-spacing: 0.5px;">
          Professores
        </span>
      </div>
      
      <div class="teacher-list-container">
        <div class="avatars-group">
          <div class="teacher-avatar avatar-primary">
            <span>JM</span>
            <div class="tooltip-box">João Mendes</div>
          </div>
          <div class="teacher-avatar avatar-success">
            <span>AS</span>
            <div class="auxiliar-badge">1</div>
            <div class="tooltip-box">Ana Silva (1 auxiliar)</div>
          </div>
          <div class="teacher-avatar avatar-warning">
            <span>MC</span>
            <div class="tooltip-box">Maria Costa</div>
          </div>
        </div>
        
        <div class="overflow-badge-container">
          <span class="overflow-badge">+2</span>
          <div class="popover-list">
            <ul>
              <li>Pedro Santos</li>
              <li>Carla Oliveira</li>
            </ul>
          </div>
        </div>
      </div>
      
      <div class="card-info">
        <div class="info-item">
          <span class="info-label">Turmas:</span> 3
        </div>
        <div class="info-item">
          <span class="info-label">Alunos:</span> 85
        </div>
        <div class="info-item">
          <span class="info-label">Carga:</span> 4h/semana
        </div>
      </div>
    </div>
  `},r={render:()=>`
    ${a}
    <style>
      .data-table {
        width: 100%;
        border-collapse: collapse;
        background: white;
        border: 1px solid #E0E0E0;
        border-radius: 8px;
        overflow: hidden;
      }
      
      .data-table thead {
        background: #F8F7FA;
      }
      
      .data-table th {
        padding: 12px 16px;
        text-align: left;
        font-size: 12px;
        font-weight: 600;
        color: #6E6B7B;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        border-bottom: 1px solid #E0E0E0;
      }
      
      .data-table td {
        padding: 12px 16px;
        font-size: 14px;
        color: #5D596C;
        border-bottom: 1px solid #F3F2F7;
      }
      
      .data-table tbody tr:hover {
        background: #F8F8F8;
      }
    </style>
    
    <table class="data-table">
      <thead>
        <tr>
          <th>Disciplina</th>
          <th>Professores</th>
          <th>Turmas</th>
          <th>Alunos</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <div style="display: flex; align-items: center; gap: 8px;">
              <i class="bi bi-calculator" style="color: #6E63E8; font-size: 18px;"></i>
              <span style="font-weight: 500;">Matemática</span>
            </div>
          </td>
          <td>
            <div class="teacher-list-container">
              <div class="avatars-group">
                <div class="teacher-avatar avatar-primary">
                  <span>JM</span>
                  <div class="tooltip-box">João Mendes</div>
                </div>
                <div class="teacher-avatar avatar-success">
                  <span>AS</span>
                  <div class="tooltip-box">Ana Silva</div>
                </div>
              </div>
              <div class="overflow-badge-container">
                <span class="overflow-badge">+3</span>
                <div class="popover-list">
                  <ul>
                    <li>Maria Costa</li>
                    <li>Pedro Santos</li>
                    <li>Carla Oliveira</li>
                  </ul>
                </div>
              </div>
            </div>
          </td>
          <td>4</td>
          <td>120</td>
        </tr>
        <tr>
          <td>
            <div style="display: flex; align-items: center; gap: 8px;">
              <i class="bi bi-book" style="color: #28C76F; font-size: 18px;"></i>
              <span style="font-weight: 500;">Português</span>
            </div>
          </td>
          <td>
            <div class="teacher-list-container">
              <div class="avatars-group">
                <div class="teacher-avatar avatar-info">
                  <span>LF</span>
                  <div class="tooltip-box">Lucas Ferreira</div>
                </div>
                <div class="teacher-avatar avatar-warning">
                  <span>JA</span>
                  <div class="tooltip-box">Julia Almeida</div>
                </div>
              </div>
            </div>
          </td>
          <td>3</td>
          <td>90</td>
        </tr>
        <tr>
          <td>
            <div style="display: flex; align-items: center; gap: 8px;">
              <i class="bi bi-globe" style="color: #00CFE8; font-size: 18px;"></i>
              <span style="font-weight: 500;">Geografia</span>
            </div>
          </td>
          <td>
            <div class="teacher-list-container">
              <div class="avatars-group">
                <div class="teacher-avatar avatar-danger">
                  <span>BR</span>
                  <div class="tooltip-box">Bruno Rocha</div>
                </div>
              </div>
              <div class="overflow-badge-container">
                <span class="overflow-badge">+1</span>
                <div class="popover-list">
                  <ul>
                    <li>Fernanda Martins</li>
                  </ul>
                </div>
              </div>
            </div>
          </td>
          <td>2</td>
          <td>60</td>
        </tr>
      </tbody>
    </table>
  `},o={render:()=>`
    ${a}
    <style>
      .size-demo {
        margin-bottom: 24px;
      }
      
      .size-label {
        font-size: 12px;
        font-weight: 600;
        color: #6E6B7B;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        margin-bottom: 8px;
      }
      
      .avatar-sm {
        width: 32px;
        height: 32px;
        font-size: 12px;
      }
      
      .avatar-lg {
        width: 48px;
        height: 48px;
        font-size: 16px;
      }
      
      .badge-sm {
        width: 12px;
        height: 12px;
        font-size: 9px;
      }
      
      .badge-lg {
        width: 18px;
        height: 18px;
        font-size: 11px;
      }
    </style>
    
    <div class="size-demo">
      <div class="size-label">Small (32×32px)</div>
      <div class="teacher-list-container">
        <div class="avatars-group">
          <div class="teacher-avatar avatar-sm avatar-primary">
            <span>JM</span>
            <div class="tooltip-box">João Mendes</div>
          </div>
          <div class="teacher-avatar avatar-sm avatar-success">
            <span>AS</span>
            <div class="auxiliar-badge badge-sm">2</div>
            <div class="tooltip-box">Ana Silva</div>
          </div>
        </div>
        <div class="overflow-badge-container">
          <span class="overflow-badge" style="font-size: 11px; padding: 4px 10px;">+3</span>
        </div>
      </div>
    </div>
    
    <div class="size-demo">
      <div class="size-label">Medium (40×40px) - Default</div>
      <div class="teacher-list-container">
        <div class="avatars-group">
          <div class="teacher-avatar avatar-primary">
            <span>JM</span>
            <div class="tooltip-box">João Mendes</div>
          </div>
          <div class="teacher-avatar avatar-success">
            <span>AS</span>
            <div class="auxiliar-badge">2</div>
            <div class="tooltip-box">Ana Silva</div>
          </div>
        </div>
        <div class="overflow-badge-container">
          <span class="overflow-badge">+3</span>
        </div>
      </div>
    </div>
    
    <div class="size-demo">
      <div class="size-label">Large (48×48px)</div>
      <div class="teacher-list-container">
        <div class="avatars-group">
          <div class="teacher-avatar avatar-lg avatar-primary">
            <span>JM</span>
            <div class="tooltip-box">João Mendes</div>
          </div>
          <div class="teacher-avatar avatar-lg avatar-success">
            <span>AS</span>
            <div class="auxiliar-badge badge-lg">2</div>
            <div class="tooltip-box">Ana Silva</div>
          </div>
        </div>
        <div class="overflow-badge-container">
          <span class="overflow-badge" style="font-size: 13px; padding: 8px 14px;">+3</span>
        </div>
      </div>
    </div>
  `},l={render:()=>`
    ${a}
    <div style="background: #E3F2FD; border-left: 4px solid #2196F3; padding: 16px; border-radius: 6px; margin-bottom: 24px; max-width: 700px;">
      <h4 style="font-size: 14px; font-weight: 600; color: #1565C0; margin: 0 0 8px 0;">
        <i class="bi bi-phone"></i> listInitialsTeacher: Responsivo
      </h4>
      <ul style="margin: 0; padding-left: 20px; font-size: 13px; color: #1976D2;">
        <li><strong>Avatars reduzem:</strong> 40px → 32px em telas &lt;576px</li>
        <li><strong>Badge auxiliar menor:</strong> 16px → 14px em mobile</li>
        <li><strong>Gap mantido:</strong> 8px entre avatars em todas telas</li>
        <li><strong>Scroll horizontal:</strong> flex-nowrap previne quebra de linha</li>
      </ul>
    </div>
    
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px; max-width: 900px;">
      <div>
        <h4 style="font-size: 13px; font-weight: 600; color: #5D596C; margin-bottom: 12px; text-align: center;">
          Desktop (40×40px)
        </h4>
        <div class="teacher-list-container">
          <div class="avatars-group">
            <div class="teacher-avatar avatar-primary">
              <span>JM</span>
              <div class="tooltip-box">João Mendes</div>
            </div>
            <div class="teacher-avatar avatar-success">
              <span>AS</span>
              <div class="auxiliar-badge">2</div>
              <div class="tooltip-box">Ana Silva</div>
            </div>
            <div class="teacher-avatar avatar-info">
              <span>MC</span>
              <div class="tooltip-box">Maria Costa</div>
            </div>
          </div>
          <div class="overflow-badge-container">
            <span class="overflow-badge">+4</span>
          </div>
        </div>
      </div>
      
      <div>
        <h4 style="font-size: 13px; font-weight: 600; color: #5D596C; margin-bottom: 12px; text-align: center;">
          Mobile (&lt;576px - 32×32px)
        </h4>
        <div style="max-width: 300px;">
          <div class="teacher-list-container">
            <div class="avatars-group">
              <div class="teacher-avatar avatar-primary" style="width: 32px; height: 32px; font-size: 12px;">
                <span>JM</span>
                <div class="tooltip-box">João Mendes</div>
              </div>
              <div class="teacher-avatar avatar-success" style="width: 32px; height: 32px; font-size: 12px;">
                <span>AS</span>
                <div class="auxiliar-badge" style="width: 14px; height: 14px; font-size: 9px;">2</div>
                <div class="tooltip-box">Ana Silva</div>
              </div>
              <div class="teacher-avatar avatar-info" style="width: 32px; height: 32px; font-size: 12px;">
                <span>MC</span>
                <div class="tooltip-box">Maria Costa</div>
              </div>
            </div>
            <div class="overflow-badge-container">
              <span class="overflow-badge" style="font-size: 11px; padding: 5px 10px;">+4</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `};var d,v,p;i.parameters={...i.parameters,docs:{...(d=i.parameters)==null?void 0:d.docs,source:{originalSource:`{
  render: () => \`
    \${listInitialsTeacherStyles}
    <div class="teacher-list-container">
      <div class="avatars-group">
        <div class="teacher-avatar avatar-primary">
          <span>JM</span>
          <div class="tooltip-box">João Mendes</div>
        </div>
        <div class="teacher-avatar avatar-success">
          <span>AS</span>
          <div class="tooltip-box">Ana Silva</div>
        </div>
        <div class="teacher-avatar avatar-info">
          <span>MC</span>
          <div class="tooltip-box">Maria Costa</div>
        </div>
      </div>
      
      <div class="overflow-badge-container">
        <span class="overflow-badge">+5</span>
        <div class="popover-list">
          <ul>
            <li>Pedro Santos</li>
            <li>Carla Oliveira</li>
            <li>Lucas Ferreira</li>
            <li>Julia Almeida</li>
            <li>Bruno Rocha</li>
          </ul>
        </div>
      </div>
    </div>
  \`
}`,...(p=(v=i.parameters)==null?void 0:v.docs)==null?void 0:p.source}}};var c,x,g;s.parameters={...s.parameters,docs:{...(c=s.parameters)==null?void 0:c.docs,source:{originalSource:`{
  render: () => \`
    \${listInitialsTeacherStyles}
    <div class="teacher-list-container">
      <div class="avatars-group">
        <div class="teacher-avatar avatar-primary">
          <span>RP</span>
          <div class="tooltip-box">Roberto Pereira</div>
        </div>
        <div class="teacher-avatar avatar-warning">
          <span>FM</span>
          <div class="tooltip-box">Fernanda Martins</div>
        </div>
      </div>
    </div>
    
    <p style="font-size: 13px; color: #6E6B7B; margin-top: 12px;">
      <i class="bi bi-info-circle"></i> Apenas 2 professores - sem badge de overflow
    </p>
  \`
}`,...(g=(x=s.parameters)==null?void 0:x.docs)==null?void 0:g.source}}};var b,h,u;e.parameters={...e.parameters,docs:{...(b=e.parameters)==null?void 0:b.docs,source:{originalSource:`{
  render: () => \`
    \${listInitialsTeacherStyles}
    <div class="teacher-list-container">
      <div class="avatars-group">
        <div class="teacher-avatar avatar-primary">
          <span>JM</span>
          <div class="auxiliar-badge">2</div>
          <div class="tooltip-box">João Mendes (2 auxiliares)</div>
        </div>
        <div class="teacher-avatar avatar-success">
          <span>AS</span>
          <div class="tooltip-box">Ana Silva</div>
        </div>
        <div class="teacher-avatar avatar-info">
          <span>MC</span>
          <div class="auxiliar-badge">1</div>
          <div class="tooltip-box">Maria Costa (1 auxiliar)</div>
        </div>
      </div>
      
      <div class="overflow-badge-container">
        <span class="overflow-badge">+3</span>
        <div class="popover-list">
          <ul>
            <li>Pedro Santos (1 auxiliar)</li>
            <li>Carla Oliveira</li>
            <li>Lucas Ferreira</li>
          </ul>
        </div>
      </div>
    </div>
    
    <p style="font-size: 13px; color: #6E6B7B; margin-top: 12px;">
      <i class="bi bi-star-fill" style="color: #FF9F43;"></i> Badge laranja indica número de professores auxiliares
    </p>
  \`
}`,...(u=(h=e.parameters)==null?void 0:h.docs)==null?void 0:u.source}}};var f,m,w;n.parameters={...n.parameters,docs:{...(f=n.parameters)==null?void 0:f.docs,source:{originalSource:`{
  render: () => \`
    \${listInitialsTeacherStyles}
    <div class="teacher-list-container">
      <div class="avatars-group">
        <div class="teacher-avatar avatar-primary">
          <span>AP</span>
          <div class="tooltip-box">André Pinto</div>
        </div>
        <div class="teacher-avatar avatar-success">
          <span>BS</span>
          <div class="tooltip-box">Beatriz Santos</div>
        </div>
      </div>
      
      <div class="overflow-badge-container">
        <span class="overflow-badge">+15</span>
        <div class="popover-list">
          <ul>
            <li>Carlos Lima</li>
            <li>Diana Souza</li>
            <li>Eduardo Martins</li>
            <li>Fátima Rocha</li>
            <li>Gabriel Alves</li>
            <li>Helena Costa</li>
            <li>Igor Santos</li>
            <li>Juliana Silva</li>
            <li>Kevin Oliveira</li>
            <li>Larissa Pereira</li>
            <li>... e mais 5</li>
          </ul>
        </div>
      </div>
    </div>
    
    <p style="font-size: 13px; color: #6E6B7B; margin-top: 12px;">
      <i class="bi bi-people-fill"></i> Total de 17 professores - mostra 2 + overflow +15
    </p>
  \`
}`,...(w=(m=n.parameters)==null?void 0:m.docs)==null?void 0:w.source}}};var y,z,M;t.parameters={...t.parameters,docs:{...(y=t.parameters)==null?void 0:y.docs,source:{originalSource:`{
  render: () => \`
    \${listInitialsTeacherStyles}
    <style>
      .subject-card {
        background: white;
        border: 1px solid #E0E0E0;
        border-radius: 12px;
        padding: 20px;
        box-shadow: 0 2px 8px rgba(0,0,0,0.08);
        max-width: 400px;
      }
      
      .card-header-row {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 16px;
      }
      
      .subject-title {
        font-size: 18px;
        font-weight: 600;
        color: #5D596C;
        display: flex;
        align-items: center;
        gap: 8px;
      }
      
      .card-info {
        display: flex;
        gap: 16px;
        margin-top: 12px;
        padding-top: 12px;
        border-top: 1px solid #F3F2F7;
      }
      
      .info-item {
        font-size: 13px;
        color: #6E6B7B;
      }
      
      .info-label {
        font-weight: 600;
        color: #5D596C;
      }
    </style>
    
    <div class="subject-card">
      <div class="card-header-row">
        <h3 class="subject-title">
          <i class="bi bi-calculator" style="color: #6E63E8;"></i>
          Matemática Avançada
        </h3>
      </div>
      
      <div style="margin-bottom: 12px;">
        <span style="font-size: 12px; font-weight: 600; color: #6E6B7B; text-transform: uppercase; letter-spacing: 0.5px;">
          Professores
        </span>
      </div>
      
      <div class="teacher-list-container">
        <div class="avatars-group">
          <div class="teacher-avatar avatar-primary">
            <span>JM</span>
            <div class="tooltip-box">João Mendes</div>
          </div>
          <div class="teacher-avatar avatar-success">
            <span>AS</span>
            <div class="auxiliar-badge">1</div>
            <div class="tooltip-box">Ana Silva (1 auxiliar)</div>
          </div>
          <div class="teacher-avatar avatar-warning">
            <span>MC</span>
            <div class="tooltip-box">Maria Costa</div>
          </div>
        </div>
        
        <div class="overflow-badge-container">
          <span class="overflow-badge">+2</span>
          <div class="popover-list">
            <ul>
              <li>Pedro Santos</li>
              <li>Carla Oliveira</li>
            </ul>
          </div>
        </div>
      </div>
      
      <div class="card-info">
        <div class="info-item">
          <span class="info-label">Turmas:</span> 3
        </div>
        <div class="info-item">
          <span class="info-label">Alunos:</span> 85
        </div>
        <div class="info-item">
          <span class="info-label">Carga:</span> 4h/semana
        </div>
      </div>
    </div>
  \`
}`,...(M=(z=t.parameters)==null?void 0:z.docs)==null?void 0:M.source}}};var S,E,A;r.parameters={...r.parameters,docs:{...(S=r.parameters)==null?void 0:S.docs,source:{originalSource:`{
  render: () => \`
    \${listInitialsTeacherStyles}
    <style>
      .data-table {
        width: 100%;
        border-collapse: collapse;
        background: white;
        border: 1px solid #E0E0E0;
        border-radius: 8px;
        overflow: hidden;
      }
      
      .data-table thead {
        background: #F8F7FA;
      }
      
      .data-table th {
        padding: 12px 16px;
        text-align: left;
        font-size: 12px;
        font-weight: 600;
        color: #6E6B7B;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        border-bottom: 1px solid #E0E0E0;
      }
      
      .data-table td {
        padding: 12px 16px;
        font-size: 14px;
        color: #5D596C;
        border-bottom: 1px solid #F3F2F7;
      }
      
      .data-table tbody tr:hover {
        background: #F8F8F8;
      }
    </style>
    
    <table class="data-table">
      <thead>
        <tr>
          <th>Disciplina</th>
          <th>Professores</th>
          <th>Turmas</th>
          <th>Alunos</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <div style="display: flex; align-items: center; gap: 8px;">
              <i class="bi bi-calculator" style="color: #6E63E8; font-size: 18px;"></i>
              <span style="font-weight: 500;">Matemática</span>
            </div>
          </td>
          <td>
            <div class="teacher-list-container">
              <div class="avatars-group">
                <div class="teacher-avatar avatar-primary">
                  <span>JM</span>
                  <div class="tooltip-box">João Mendes</div>
                </div>
                <div class="teacher-avatar avatar-success">
                  <span>AS</span>
                  <div class="tooltip-box">Ana Silva</div>
                </div>
              </div>
              <div class="overflow-badge-container">
                <span class="overflow-badge">+3</span>
                <div class="popover-list">
                  <ul>
                    <li>Maria Costa</li>
                    <li>Pedro Santos</li>
                    <li>Carla Oliveira</li>
                  </ul>
                </div>
              </div>
            </div>
          </td>
          <td>4</td>
          <td>120</td>
        </tr>
        <tr>
          <td>
            <div style="display: flex; align-items: center; gap: 8px;">
              <i class="bi bi-book" style="color: #28C76F; font-size: 18px;"></i>
              <span style="font-weight: 500;">Português</span>
            </div>
          </td>
          <td>
            <div class="teacher-list-container">
              <div class="avatars-group">
                <div class="teacher-avatar avatar-info">
                  <span>LF</span>
                  <div class="tooltip-box">Lucas Ferreira</div>
                </div>
                <div class="teacher-avatar avatar-warning">
                  <span>JA</span>
                  <div class="tooltip-box">Julia Almeida</div>
                </div>
              </div>
            </div>
          </td>
          <td>3</td>
          <td>90</td>
        </tr>
        <tr>
          <td>
            <div style="display: flex; align-items: center; gap: 8px;">
              <i class="bi bi-globe" style="color: #00CFE8; font-size: 18px;"></i>
              <span style="font-weight: 500;">Geografia</span>
            </div>
          </td>
          <td>
            <div class="teacher-list-container">
              <div class="avatars-group">
                <div class="teacher-avatar avatar-danger">
                  <span>BR</span>
                  <div class="tooltip-box">Bruno Rocha</div>
                </div>
              </div>
              <div class="overflow-badge-container">
                <span class="overflow-badge">+1</span>
                <div class="popover-list">
                  <ul>
                    <li>Fernanda Martins</li>
                  </ul>
                </div>
              </div>
            </div>
          </td>
          <td>2</td>
          <td>60</td>
        </tr>
      </tbody>
    </table>
  \`
}`,...(A=(E=r.parameters)==null?void 0:E.docs)==null?void 0:A.source}}};var F,C,B;o.parameters={...o.parameters,docs:{...(F=o.parameters)==null?void 0:F.docs,source:{originalSource:`{
  render: () => \`
    \${listInitialsTeacherStyles}
    <style>
      .size-demo {
        margin-bottom: 24px;
      }
      
      .size-label {
        font-size: 12px;
        font-weight: 600;
        color: #6E6B7B;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        margin-bottom: 8px;
      }
      
      .avatar-sm {
        width: 32px;
        height: 32px;
        font-size: 12px;
      }
      
      .avatar-lg {
        width: 48px;
        height: 48px;
        font-size: 16px;
      }
      
      .badge-sm {
        width: 12px;
        height: 12px;
        font-size: 9px;
      }
      
      .badge-lg {
        width: 18px;
        height: 18px;
        font-size: 11px;
      }
    </style>
    
    <div class="size-demo">
      <div class="size-label">Small (32×32px)</div>
      <div class="teacher-list-container">
        <div class="avatars-group">
          <div class="teacher-avatar avatar-sm avatar-primary">
            <span>JM</span>
            <div class="tooltip-box">João Mendes</div>
          </div>
          <div class="teacher-avatar avatar-sm avatar-success">
            <span>AS</span>
            <div class="auxiliar-badge badge-sm">2</div>
            <div class="tooltip-box">Ana Silva</div>
          </div>
        </div>
        <div class="overflow-badge-container">
          <span class="overflow-badge" style="font-size: 11px; padding: 4px 10px;">+3</span>
        </div>
      </div>
    </div>
    
    <div class="size-demo">
      <div class="size-label">Medium (40×40px) - Default</div>
      <div class="teacher-list-container">
        <div class="avatars-group">
          <div class="teacher-avatar avatar-primary">
            <span>JM</span>
            <div class="tooltip-box">João Mendes</div>
          </div>
          <div class="teacher-avatar avatar-success">
            <span>AS</span>
            <div class="auxiliar-badge">2</div>
            <div class="tooltip-box">Ana Silva</div>
          </div>
        </div>
        <div class="overflow-badge-container">
          <span class="overflow-badge">+3</span>
        </div>
      </div>
    </div>
    
    <div class="size-demo">
      <div class="size-label">Large (48×48px)</div>
      <div class="teacher-list-container">
        <div class="avatars-group">
          <div class="teacher-avatar avatar-lg avatar-primary">
            <span>JM</span>
            <div class="tooltip-box">João Mendes</div>
          </div>
          <div class="teacher-avatar avatar-lg avatar-success">
            <span>AS</span>
            <div class="auxiliar-badge badge-lg">2</div>
            <div class="tooltip-box">Ana Silva</div>
          </div>
        </div>
        <div class="overflow-badge-container">
          <span class="overflow-badge" style="font-size: 13px; padding: 8px 14px;">+3</span>
        </div>
      </div>
    </div>
  \`
}`,...(B=(C=o.parameters)==null?void 0:C.docs)==null?void 0:B.source}}};var J,D,P;l.parameters={...l.parameters,docs:{...(J=l.parameters)==null?void 0:J.docs,source:{originalSource:`{
  render: () => \`
    \${listInitialsTeacherStyles}
    <div style="background: #E3F2FD; border-left: 4px solid #2196F3; padding: 16px; border-radius: 6px; margin-bottom: 24px; max-width: 700px;">
      <h4 style="font-size: 14px; font-weight: 600; color: #1565C0; margin: 0 0 8px 0;">
        <i class="bi bi-phone"></i> listInitialsTeacher: Responsivo
      </h4>
      <ul style="margin: 0; padding-left: 20px; font-size: 13px; color: #1976D2;">
        <li><strong>Avatars reduzem:</strong> 40px → 32px em telas &lt;576px</li>
        <li><strong>Badge auxiliar menor:</strong> 16px → 14px em mobile</li>
        <li><strong>Gap mantido:</strong> 8px entre avatars em todas telas</li>
        <li><strong>Scroll horizontal:</strong> flex-nowrap previne quebra de linha</li>
      </ul>
    </div>
    
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px; max-width: 900px;">
      <div>
        <h4 style="font-size: 13px; font-weight: 600; color: #5D596C; margin-bottom: 12px; text-align: center;">
          Desktop (40×40px)
        </h4>
        <div class="teacher-list-container">
          <div class="avatars-group">
            <div class="teacher-avatar avatar-primary">
              <span>JM</span>
              <div class="tooltip-box">João Mendes</div>
            </div>
            <div class="teacher-avatar avatar-success">
              <span>AS</span>
              <div class="auxiliar-badge">2</div>
              <div class="tooltip-box">Ana Silva</div>
            </div>
            <div class="teacher-avatar avatar-info">
              <span>MC</span>
              <div class="tooltip-box">Maria Costa</div>
            </div>
          </div>
          <div class="overflow-badge-container">
            <span class="overflow-badge">+4</span>
          </div>
        </div>
      </div>
      
      <div>
        <h4 style="font-size: 13px; font-weight: 600; color: #5D596C; margin-bottom: 12px; text-align: center;">
          Mobile (&lt;576px - 32×32px)
        </h4>
        <div style="max-width: 300px;">
          <div class="teacher-list-container">
            <div class="avatars-group">
              <div class="teacher-avatar avatar-primary" style="width: 32px; height: 32px; font-size: 12px;">
                <span>JM</span>
                <div class="tooltip-box">João Mendes</div>
              </div>
              <div class="teacher-avatar avatar-success" style="width: 32px; height: 32px; font-size: 12px;">
                <span>AS</span>
                <div class="auxiliar-badge" style="width: 14px; height: 14px; font-size: 9px;">2</div>
                <div class="tooltip-box">Ana Silva</div>
              </div>
              <div class="teacher-avatar avatar-info" style="width: 32px; height: 32px; font-size: 12px;">
                <span>MC</span>
                <div class="tooltip-box">Maria Costa</div>
              </div>
            </div>
            <div class="overflow-badge-container">
              <span class="overflow-badge" style="font-size: 11px; padding: 5px 10px;">+4</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  \`
}`,...(P=(D=l.parameters)==null?void 0:D.docs)==null?void 0:P.source}}};const T=["Default","SmallGroup","WithAuxiliarBadge","LargeOverflow","InCard","InTable","DifferentSizes","Responsive"];export{i as Default,o as DifferentSizes,t as InCard,r as InTable,n as LargeOverflow,l as Responsive,s as SmallGroup,e as WithAuxiliarBadge,T as __namedExportsOrder,k as default};
