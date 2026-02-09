const Q={title:"Educacross Components V2/Mission/MissionAndQuestionItem",tags:["autodocs"],parameters:{layout:"padded",docs:{description:{component:`
# MissionAndQuestionItem

Card de **missão ou questão** com imagem preview e status.

## Contexto de Uso

- **Lista de missões**: Biblioteca do professor
- **Questões disponíveis**: Banco de questões
- **Seleção de conteúdo**: Escolher para adicionar
- **Preview rápido**: Ver antes de abrir
- **Status tracking**: Acompanhar progresso

## Características

- **Image preview**: Thumbnail 100×100px
- **Visibility icon**: Ícone de visualização
- **Status indicators**: Badge de status/progresso
- **Hover effects**: Destaque ao passar mouse
- **Event @open:details**: Abre detalhes completos
- **Responsive**: Grid adaptativo mobile

## Props

- Nenhuma prop definida (data injetada via slot/context)
        `}}}},i=`
<style>
  .mission-card {
    background: white;
    border: 1px solid #DBDADE;
    border-radius: 12px;
    padding: 16px;
    transition: all 0.2s;
    cursor: pointer;
    height: 100%;
    display: flex;
    flex-direction: column;
  }
  
  .mission-card:hover {
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    transform: translateY(-2px);
  }
  
  .mission-media {
    display: flex;
    gap: 16px;
    margin-bottom: 12px;
  }
  
  .image-container {
    position: relative;
  }
  
  .mission-image {
    width: 100px;
    height: 100px;
    border: 1px solid #D8D6DE;
    border-radius: 8px;
    object-fit: cover;
  }
  
  .visibility-overlay {
    position: absolute;
    bottom: 8px;
    right: 8px;
    background: rgba(110, 99, 232, 0.9);
    color: white;
    padding: 4px;
    border-radius: 4px;
    font-size: 20px;
    display: flex;
    align-items: center;
  }
  
  .mission-content {
    flex: 1;
  }
  
  .mission-title {
    font-size: 16px;
    font-weight: 600;
    color: #5D596C;
    margin-bottom: 8px;
  }
  
  .mission-meta {
    font-size: 13px;
    color: #6E6B7B;
    display: flex;
    flex-direction: column;
    gap: 4px;
  }
  
  .status-badge {
    padding: 4px 12px;
    border-radius: 12px;
    font-size: 12px;
    font-weight: 600;
    display: inline-block;
    margin-top: 8px;
  }
  
  .status-completed {
    background: #E8F5E9;
    color: #2E7D32;
  }
  
  .status-progress {
    background: #FFF3E0;
    color: #E65100;
  }
  
  .status-locked {
    background: #F3F2F7;
    color: #6E6B7B;
  }
  
  .mission-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 16px;
    padding: 16px;
  }
  
  @media (max-width: 768px) {
    .mission-media {
      flex-direction: column;
      align-items: center;
      text-align: center;
    }
    
    .mission-grid {
      grid-template-columns: 1fr;
    }
  }
</style>
`,s={render:()=>`
    ${i}
    <div class="mission-card">
      <div class="mission-media">
        <div class="image-container">
          <img 
            src="data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Crect fill='%236E63E8' width='100' height='100'/%3E%3Ctext x='50%25' y='50%25' fill='white' font-size='14' text-anchor='middle' dy='.3em'%3EMissão%3C/text%3E%3C/svg%3E"
            class="mission-image"
            alt="Preview"
          />
          <div class="visibility-overlay">
            <i class="bi bi-eye"></i>
          </div>
        </div>
        
        <div class="mission-content">
          <h3 class="mission-title">Equações do 1º Grau</h3>
          <div class="mission-meta">
            <div><i class="bi bi-book"></i> Matemática • 7º Ano</div>
            <div><i class="bi bi-clock"></i> 45 minutos</div>
            <div><i class="bi bi-trophy"></i> 100 pontos</div>
          </div>
          <span class="status-badge status-progress">Em progresso</span>
        </div>
      </div>
    </div>
  `},e={render:()=>`
    ${i}
    <div class="mission-card">
      <div class="mission-media">
        <div class="image-container">
          <img 
            src="data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Crect fill='%2328C76F' width='100' height='100'/%3E%3Ctext x='50%25' y='50%25' fill='white' font-size='40' text-anchor='middle' dy='.3em'%3E?%3C/text%3E%3C/svg%3E"
            class="mission-image"
            alt="Questão"
          />
          <div class="visibility-overlay">
            <i class="bi bi-eye"></i>
          </div>
        </div>
        
        <div class="mission-content">
          <h3 class="mission-title">Questão: Resolução de Equações</h3>
          <div class="mission-meta">
            <div><i class="bi bi-patch-question"></i> Múltipla escolha</div>
            <div><i class="bi bi-speedometer2"></i> Dificuldade: Média</div>
            <div><i class="bi bi-star"></i> 20 pontos</div>
          </div>
        </div>
      </div>
    </div>
  `},t={render:()=>`
    ${i}
    <div class="mission-card">
      <div class="mission-media">
        <div class="image-container">
          <img 
            src="data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Crect fill='%2328C76F' width='100' height='100'/%3E%3Ctext x='50%25' y='50%25' fill='white' font-size='50' text-anchor='middle' dy='.3em'%3E✓%3C/text%3E%3C/svg%3E"
            class="mission-image"
            alt="Completo"
          />
          <div class="visibility-overlay">
            <i class="bi bi-check-circle-fill"></i>
          </div>
        </div>
        
        <div class="mission-content">
          <h3 class="mission-title">Frações e Números Decimais</h3>
          <div class="mission-meta">
            <div><i class="bi bi-book"></i> Matemática • 6º Ano</div>
            <div><i class="bi bi-check-lg"></i> Concluída em 12/01/2026</div>
            <div><i class="bi bi-trophy"></i> 95/100 pontos</div>
          </div>
          <span class="status-badge status-completed">
            <i class="bi bi-check-lg"></i> Concluída
          </span>
        </div>
      </div>
    </div>
  `},a={render:()=>`
    ${i}
    <style>
      .progress-bar-container {
        background: #E0E0E0;
        height: 8px;
        border-radius: 4px;
        overflow: hidden;
        margin-top: 8px;
      }
      .progress-bar {
        height: 100%;
        background: #FF9F43;
        transition: width 0.3s;
      }
    </style>
    <div class="mission-card">
      <div class="mission-media">
        <div class="image-container">
          <img 
            src="data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Crect fill='%23FF9F43' width='100' height='100'/%3E%3Ctext x='50%25' y='50%25' fill='white' font-size='14' text-anchor='middle' dy='.3em'%3E65%25%3C/text%3E%3C/svg%3E"
            class="mission-image"
            alt="Em progresso"
          />
          <div class="visibility-overlay" style="background: rgba(255,159,67,0.9);">
            <i class="bi bi-clock-history"></i>
          </div>
        </div>
        
        <div class="mission-content">
          <h3 class="mission-title">Verbos Irregulares</h3>
          <div class="mission-meta">
            <div><i class="bi bi-book"></i> Português • 8º Ano</div>
            <div><i class="bi bi-clock"></i> Iniciada há 2 dias</div>
            <div><i class="bi bi-people"></i> 18/28 alunos</div>
          </div>
          <div class="progress-bar-container">
            <div class="progress-bar" style="width: 65%;"></div>
          </div>
          <span class="status-badge status-progress">
            <i class="bi bi-clock"></i> 65% concluído
          </span>
        </div>
      </div>
    </div>
  `},n={render:()=>`
    ${i}
    <div class="mission-card" style="opacity: 0.7; cursor: not-allowed;">
      <div class="mission-media">
        <div class="image-container">
          <img 
            src="data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Crect fill='%236E6B7B' width='100' height='100'/%3E%3Ctext x='50%25' y='50%25' fill='white' font-size='40' text-anchor='middle' dy='.3em'%3E🔒%3C/text%3E%3C/svg%3E"
            class="mission-image"
            alt="Bloqueado"
          />
          <div class="visibility-overlay" style="background: rgba(110,107,123,0.9);">
            <i class="bi bi-lock-fill"></i>
          </div>
        </div>
        
        <div class="mission-content">
          <h3 class="mission-title">Trigonometria Avançada</h3>
          <div class="mission-meta">
            <div><i class="bi bi-book"></i> Matemática • 9º Ano</div>
            <div><i class="bi bi-info-circle"></i> Requer missão anterior</div>
            <div><i class="bi bi-lock"></i> Desbloqueio: Funções Básicas</div>
          </div>
          <span class="status-badge status-locked">
            <i class="bi bi-lock"></i> Bloqueada
          </span>
        </div>
      </div>
    </div>
  `},d={render:()=>`
    ${i}
    <div class="mission-grid">
      <div class="mission-card">
        <div class="mission-media" style="flex-direction: column; align-items: center;">
          <div class="image-container">
            <img 
              src="data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Crect fill='%236E63E8' width='100' height='100'/%3E%3Ctext x='50%25' y='50%25' fill='white' font-size='12' text-anchor='middle' dy='.3em'%3EMat%3C/text%3E%3C/svg%3E"
              class="mission-image"
              alt="Matemática"
            />
            <div class="visibility-overlay"><i class="bi bi-eye"></i></div>
          </div>
          <div class="mission-content" style="text-align: center;">
            <h3 class="mission-title">Geometria Plana</h3>
            <div class="mission-meta" style="align-items: center;">
              <div>Matemática • 7º Ano</div>
              <span class="status-badge status-progress">Ativa</span>
            </div>
          </div>
        </div>
      </div>
      
      <div class="mission-card">
        <div class="mission-media" style="flex-direction: column; align-items: center;">
          <div class="image-container">
            <img 
              src="data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Crect fill='%2328C76F' width='100' height='100'/%3E%3Ctext x='50%25' y='50%25' fill='white' font-size='12' text-anchor='middle' dy='.3em'%3EPort%3C/text%3E%3C/svg%3E"
              class="mission-image"
              alt="Português"
            />
            <div class="visibility-overlay"><i class="bi bi-eye"></i></div>
          </div>
          <div class="mission-content" style="text-align: center;">
            <h3 class="mission-title">Sintaxe</h3>
            <div class="mission-meta" style="align-items: center;">
              <div>Português • 8º Ano</div>
              <span class="status-badge status-completed">Completa</span>
            </div>
          </div>
        </div>
      </div>
      
      <div class="mission-card">
        <div class="mission-media" style="flex-direction: column; align-items: center;">
          <div class="image-container">
            <img 
              src="data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Crect fill='%2300CFE8' width='100' height='100'/%3E%3Ctext x='50%25' y='50%25' fill='white' font-size='12' text-anchor='middle' dy='.3em'%3EGeo%3C/text%3E%3C/svg%3E"
              class="mission-image"
              alt="Geografia"
            />
            <div class="visibility-overlay"><i class="bi bi-eye"></i></div>
          </div>
          <div class="mission-content" style="text-align: center;">
            <h3 class="mission-title">Relevo</h3>
            <div class="mission-meta" style="align-items: center;">
              <div>Geografia • 7º Ano</div>
              <span class="status-badge status-progress">Ativa</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `},o={render:()=>`
    ${i}
    <div style="max-width: 375px; margin: 0 auto;">
      <div class="mission-card">
        <div class="mission-media" style="flex-direction: column; align-items: center; text-align: center;">
          <div class="image-container">
            <img 
              src="data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Crect fill='%236E63E8' width='100' height='100'/%3E%3Ctext x='50%25' y='50%25' fill='white' font-size='14' text-anchor='middle' dy='.3em'%3EMobile%3C/text%3E%3C/svg%3E"
              class="mission-image"
              alt="Mobile"
            />
            <div class="visibility-overlay"><i class="bi bi-eye"></i></div>
          </div>
          
          <div class="mission-content">
            <h3 class="mission-title">Estudo de Física</h3>
            <div class="mission-meta" style="align-items: center;">
              <div><i class="bi bi-book"></i> Física • 9º Ano</div>
              <div><i class="bi bi-clock"></i> 60 minutos</div>
            </div>
            <span class="status-badge status-progress">Em andamento</span>
          </div>
        </div>
      </div>
    </div>
  `},l={render:()=>(setTimeout(()=>{const c=document.getElementById("interactiveMissionCard");c&&c.addEventListener("click",()=>{alert(`Event: open:details triggered!

Abrindo detalhes da missão...`)})},100),`
      ${i}
      <div class="mission-card" id="interactiveMissionCard">
        <div class="mission-media">
          <div class="image-container">
            <img 
              src="data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Crect fill='%236E63E8' width='100' height='100'/%3E%3Ctext x='50%25' y='50%25' fill='white' font-size='12' text-anchor='middle' dy='.3em'%3EClick%3C/text%3E%3C/svg%3E"
              class="mission-image"
              alt="Interativo"
            />
            <div class="visibility-overlay"><i class="bi bi-eye"></i></div>
          </div>
          
          <div class="mission-content">
            <h3 class="mission-title">Missão Interativa - Clique para detalhes</h3>
            <div class="mission-meta">
              <div><i class="bi bi-cursor"></i> Clique no card inteiro</div>
              <div><i class="bi bi-box-arrow-up-right"></i> Emite evento @open:details</div>
            </div>
            <span class="status-badge status-progress">
              <i class="bi bi-hand-index"></i> Clique aqui
            </span>
          </div>
        </div>
      </div>
    `)};var r,m,v;s.parameters={...s.parameters,docs:{...(r=s.parameters)==null?void 0:r.docs,source:{originalSource:`{
  render: () => \`
    \${missionAndQuestionItemStyles}
    <div class="mission-card">
      <div class="mission-media">
        <div class="image-container">
          <img 
            src="data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Crect fill='%236E63E8' width='100' height='100'/%3E%3Ctext x='50%25' y='50%25' fill='white' font-size='14' text-anchor='middle' dy='.3em'%3EMissão%3C/text%3E%3C/svg%3E"
            class="mission-image"
            alt="Preview"
          />
          <div class="visibility-overlay">
            <i class="bi bi-eye"></i>
          </div>
        </div>
        
        <div class="mission-content">
          <h3 class="mission-title">Equações do 1º Grau</h3>
          <div class="mission-meta">
            <div><i class="bi bi-book"></i> Matemática • 7º Ano</div>
            <div><i class="bi bi-clock"></i> 45 minutos</div>
            <div><i class="bi bi-trophy"></i> 100 pontos</div>
          </div>
          <span class="status-badge status-progress">Em progresso</span>
        </div>
      </div>
    </div>
  \`
}`,...(v=(m=s.parameters)==null?void 0:m.docs)==null?void 0:v.source}}};var g,h,b;e.parameters={...e.parameters,docs:{...(g=e.parameters)==null?void 0:g.docs,source:{originalSource:`{
  render: () => \`
    \${missionAndQuestionItemStyles}
    <div class="mission-card">
      <div class="mission-media">
        <div class="image-container">
          <img 
            src="data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Crect fill='%2328C76F' width='100' height='100'/%3E%3Ctext x='50%25' y='50%25' fill='white' font-size='40' text-anchor='middle' dy='.3em'%3E?%3C/text%3E%3C/svg%3E"
            class="mission-image"
            alt="Questão"
          />
          <div class="visibility-overlay">
            <i class="bi bi-eye"></i>
          </div>
        </div>
        
        <div class="mission-content">
          <h3 class="mission-title">Questão: Resolução de Equações</h3>
          <div class="mission-meta">
            <div><i class="bi bi-patch-question"></i> Múltipla escolha</div>
            <div><i class="bi bi-speedometer2"></i> Dificuldade: Média</div>
            <div><i class="bi bi-star"></i> 20 pontos</div>
          </div>
        </div>
      </div>
    </div>
  \`
}`,...(b=(h=e.parameters)==null?void 0:h.docs)==null?void 0:b.source}}};var x,p,u;t.parameters={...t.parameters,docs:{...(x=t.parameters)==null?void 0:x.docs,source:{originalSource:`{
  render: () => \`
    \${missionAndQuestionItemStyles}
    <div class="mission-card">
      <div class="mission-media">
        <div class="image-container">
          <img 
            src="data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Crect fill='%2328C76F' width='100' height='100'/%3E%3Ctext x='50%25' y='50%25' fill='white' font-size='50' text-anchor='middle' dy='.3em'%3E✓%3C/text%3E%3C/svg%3E"
            class="mission-image"
            alt="Completo"
          />
          <div class="visibility-overlay">
            <i class="bi bi-check-circle-fill"></i>
          </div>
        </div>
        
        <div class="mission-content">
          <h3 class="mission-title">Frações e Números Decimais</h3>
          <div class="mission-meta">
            <div><i class="bi bi-book"></i> Matemática • 6º Ano</div>
            <div><i class="bi bi-check-lg"></i> Concluída em 12/01/2026</div>
            <div><i class="bi bi-trophy"></i> 95/100 pontos</div>
          </div>
          <span class="status-badge status-completed">
            <i class="bi bi-check-lg"></i> Concluída
          </span>
        </div>
      </div>
    </div>
  \`
}`,...(u=(p=t.parameters)==null?void 0:p.docs)==null?void 0:u.source}}};var E,w,y;a.parameters={...a.parameters,docs:{...(E=a.parameters)==null?void 0:E.docs,source:{originalSource:`{
  render: () => \`
    \${missionAndQuestionItemStyles}
    <style>
      .progress-bar-container {
        background: #E0E0E0;
        height: 8px;
        border-radius: 4px;
        overflow: hidden;
        margin-top: 8px;
      }
      .progress-bar {
        height: 100%;
        background: #FF9F43;
        transition: width 0.3s;
      }
    </style>
    <div class="mission-card">
      <div class="mission-media">
        <div class="image-container">
          <img 
            src="data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Crect fill='%23FF9F43' width='100' height='100'/%3E%3Ctext x='50%25' y='50%25' fill='white' font-size='14' text-anchor='middle' dy='.3em'%3E65%25%3C/text%3E%3C/svg%3E"
            class="mission-image"
            alt="Em progresso"
          />
          <div class="visibility-overlay" style="background: rgba(255,159,67,0.9);">
            <i class="bi bi-clock-history"></i>
          </div>
        </div>
        
        <div class="mission-content">
          <h3 class="mission-title">Verbos Irregulares</h3>
          <div class="mission-meta">
            <div><i class="bi bi-book"></i> Português • 8º Ano</div>
            <div><i class="bi bi-clock"></i> Iniciada há 2 dias</div>
            <div><i class="bi bi-people"></i> 18/28 alunos</div>
          </div>
          <div class="progress-bar-container">
            <div class="progress-bar" style="width: 65%;"></div>
          </div>
          <span class="status-badge status-progress">
            <i class="bi bi-clock"></i> 65% concluído
          </span>
        </div>
      </div>
    </div>
  \`
}`,...(y=(w=a.parameters)==null?void 0:w.docs)==null?void 0:y.source}}};var C,f,k;n.parameters={...n.parameters,docs:{...(C=n.parameters)==null?void 0:C.docs,source:{originalSource:`{
  render: () => \`
    \${missionAndQuestionItemStyles}
    <div class="mission-card" style="opacity: 0.7; cursor: not-allowed;">
      <div class="mission-media">
        <div class="image-container">
          <img 
            src="data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Crect fill='%236E6B7B' width='100' height='100'/%3E%3Ctext x='50%25' y='50%25' fill='white' font-size='40' text-anchor='middle' dy='.3em'%3E🔒%3C/text%3E%3C/svg%3E"
            class="mission-image"
            alt="Bloqueado"
          />
          <div class="visibility-overlay" style="background: rgba(110,107,123,0.9);">
            <i class="bi bi-lock-fill"></i>
          </div>
        </div>
        
        <div class="mission-content">
          <h3 class="mission-title">Trigonometria Avançada</h3>
          <div class="mission-meta">
            <div><i class="bi bi-book"></i> Matemática • 9º Ano</div>
            <div><i class="bi bi-info-circle"></i> Requer missão anterior</div>
            <div><i class="bi bi-lock"></i> Desbloqueio: Funções Básicas</div>
          </div>
          <span class="status-badge status-locked">
            <i class="bi bi-lock"></i> Bloqueada
          </span>
        </div>
      </div>
    </div>
  \`
}`,...(k=(f=n.parameters)==null?void 0:f.docs)==null?void 0:k.source}}};var A,F,M;d.parameters={...d.parameters,docs:{...(A=d.parameters)==null?void 0:A.docs,source:{originalSource:`{
  render: () => \`
    \${missionAndQuestionItemStyles}
    <div class="mission-grid">
      <div class="mission-card">
        <div class="mission-media" style="flex-direction: column; align-items: center;">
          <div class="image-container">
            <img 
              src="data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Crect fill='%236E63E8' width='100' height='100'/%3E%3Ctext x='50%25' y='50%25' fill='white' font-size='12' text-anchor='middle' dy='.3em'%3EMat%3C/text%3E%3C/svg%3E"
              class="mission-image"
              alt="Matemática"
            />
            <div class="visibility-overlay"><i class="bi bi-eye"></i></div>
          </div>
          <div class="mission-content" style="text-align: center;">
            <h3 class="mission-title">Geometria Plana</h3>
            <div class="mission-meta" style="align-items: center;">
              <div>Matemática • 7º Ano</div>
              <span class="status-badge status-progress">Ativa</span>
            </div>
          </div>
        </div>
      </div>
      
      <div class="mission-card">
        <div class="mission-media" style="flex-direction: column; align-items: center;">
          <div class="image-container">
            <img 
              src="data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Crect fill='%2328C76F' width='100' height='100'/%3E%3Ctext x='50%25' y='50%25' fill='white' font-size='12' text-anchor='middle' dy='.3em'%3EPort%3C/text%3E%3C/svg%3E"
              class="mission-image"
              alt="Português"
            />
            <div class="visibility-overlay"><i class="bi bi-eye"></i></div>
          </div>
          <div class="mission-content" style="text-align: center;">
            <h3 class="mission-title">Sintaxe</h3>
            <div class="mission-meta" style="align-items: center;">
              <div>Português • 8º Ano</div>
              <span class="status-badge status-completed">Completa</span>
            </div>
          </div>
        </div>
      </div>
      
      <div class="mission-card">
        <div class="mission-media" style="flex-direction: column; align-items: center;">
          <div class="image-container">
            <img 
              src="data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Crect fill='%2300CFE8' width='100' height='100'/%3E%3Ctext x='50%25' y='50%25' fill='white' font-size='12' text-anchor='middle' dy='.3em'%3EGeo%3C/text%3E%3C/svg%3E"
              class="mission-image"
              alt="Geografia"
            />
            <div class="visibility-overlay"><i class="bi bi-eye"></i></div>
          </div>
          <div class="mission-content" style="text-align: center;">
            <h3 class="mission-title">Relevo</h3>
            <div class="mission-meta" style="align-items: center;">
              <div>Geografia • 7º Ano</div>
              <span class="status-badge status-progress">Ativa</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  \`
}`,...(M=(F=d.parameters)==null?void 0:F.docs)==null?void 0:M.source}}};var B,I,D;o.parameters={...o.parameters,docs:{...(B=o.parameters)==null?void 0:B.docs,source:{originalSource:`{
  render: () => \`
    \${missionAndQuestionItemStyles}
    <div style="max-width: 375px; margin: 0 auto;">
      <div class="mission-card">
        <div class="mission-media" style="flex-direction: column; align-items: center; text-align: center;">
          <div class="image-container">
            <img 
              src="data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Crect fill='%236E63E8' width='100' height='100'/%3E%3Ctext x='50%25' y='50%25' fill='white' font-size='14' text-anchor='middle' dy='.3em'%3EMobile%3C/text%3E%3C/svg%3E"
              class="mission-image"
              alt="Mobile"
            />
            <div class="visibility-overlay"><i class="bi bi-eye"></i></div>
          </div>
          
          <div class="mission-content">
            <h3 class="mission-title">Estudo de Física</h3>
            <div class="mission-meta" style="align-items: center;">
              <div><i class="bi bi-book"></i> Física • 9º Ano</div>
              <div><i class="bi bi-clock"></i> 60 minutos</div>
            </div>
            <span class="status-badge status-progress">Em andamento</span>
          </div>
        </div>
      </div>
    </div>
  \`
}`,...(D=(I=o.parameters)==null?void 0:I.docs)==null?void 0:D.source}}};var q,z,S;l.parameters={...l.parameters,docs:{...(q=l.parameters)==null?void 0:q.docs,source:{originalSource:`{
  render: () => {
    setTimeout(() => {
      const card = document.getElementById('interactiveMissionCard');
      if (card) {
        card.addEventListener('click', () => {
          alert('Event: open:details triggered!\\n\\nAbrindo detalhes da missão...');
        });
      }
    }, 100);
    return \`
      \${missionAndQuestionItemStyles}
      <div class="mission-card" id="interactiveMissionCard">
        <div class="mission-media">
          <div class="image-container">
            <img 
              src="data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Crect fill='%236E63E8' width='100' height='100'/%3E%3Ctext x='50%25' y='50%25' fill='white' font-size='12' text-anchor='middle' dy='.3em'%3EClick%3C/text%3E%3C/svg%3E"
              class="mission-image"
              alt="Interativo"
            />
            <div class="visibility-overlay"><i class="bi bi-eye"></i></div>
          </div>
          
          <div class="mission-content">
            <h3 class="mission-title">Missão Interativa - Clique para detalhes</h3>
            <div class="mission-meta">
              <div><i class="bi bi-cursor"></i> Clique no card inteiro</div>
              <div><i class="bi bi-box-arrow-up-right"></i> Emite evento @open:details</div>
            </div>
            <span class="status-badge status-progress">
              <i class="bi bi-hand-index"></i> Clique aqui
            </span>
          </div>
        </div>
      </div>
    \`;
  }
}`,...(S=(z=l.parameters)==null?void 0:z.docs)==null?void 0:S.source}}};const P=["Default","WithQuestion","Completed","InProgress","Locked","GridView","MobileView","Interactive"];export{t as Completed,s as Default,d as GridView,a as InProgress,l as Interactive,n as Locked,o as MobileView,e as WithQuestion,P as __namedExportsOrder,Q as default};
