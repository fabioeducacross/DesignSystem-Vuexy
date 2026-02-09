const Z={title:"Educacross Components V2/Cards/SubjectCard",tags:["autodocs"],parameters:{layout:"padded",docs:{description:{component:`
Card de disciplina/matéria escolar com progresso e estatísticas.

### Features
- ✅ Card por disciplina (Matemática, Português, Ciências, História, Geografia)
- ✅ Ícone e cor específicos por matéria
- ✅ Barra de progresso animada
- ✅ Estatísticas (missões, alunos)
- ✅ Estados: default, hover, active, disabled, loading
- ✅ Acessibilidade completa
- ✅ Contexto educacional (Professor/Coordenador/Aluno)
        `}}},argTypes:{subject:{control:"text",description:"Nome da disciplina",table:{type:{summary:"string"}}},icon:{control:"select",options:["bi-calculator","bi-book","bi-lightbulb","bi-clock-history","bi-globe"],description:"Ícone da disciplina",table:{type:{summary:"string"}}},color:{control:"select",options:["primary","success","info","warning","danger"],description:"Cor da disciplina",table:{type:{summary:"string"},defaultValue:{summary:"primary"}}},description:{control:"text",description:"Descrição breve",table:{type:{summary:"string"}}},progress:{control:{type:"range",min:0,max:100,step:1},description:"Progresso (0-100)",table:{type:{summary:"number"}}},missionsCount:{control:"number",description:"Quantidade de missões",table:{type:{summary:"number"}}},studentsCount:{control:"number",description:"Quantidade de alunos",table:{type:{summary:"number"}}},disabled:{control:"boolean",description:"Desabilitado",table:{type:{summary:"boolean"},defaultValue:{summary:"false"}}},loading:{control:"boolean",description:"Carregamento",table:{type:{summary:"boolean"},defaultValue:{summary:"false"}}}}},a=`
/* Card Container */
.subject-card {
  background: white;
  border: 1px solid #EBE9F1;
  border-radius: 12px;
  padding: 24px;
  min-height: 200px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  transition: all 0.2s ease;
  cursor: pointer;
}

.subject-card:hover:not(.disabled) {
  box-shadow: 0 4px 24px rgba(34, 41, 47, 0.12);
  transform: scale(1.02);
}

.subject-card.disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.subject-card.active {
  border-color: var(--subject-color);
  background: rgba(var(--subject-color-rgb), 0.05);
}

/* Header */
.subject-header {
  display: flex;
  align-items: flex-start;
  gap: 16px;
}

.subject-icon-container {
  width: 56px;
  height: 56px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
  flex-shrink: 0;
}

.subject-icon-container.primary {
  background: rgba(110, 99, 232, 0.12);
  color: #6E63E8;
}

.subject-icon-container.success {
  background: rgba(40, 199, 111, 0.12);
  color: #28C76F;
}

.subject-icon-container.info {
  background: rgba(0, 207, 232, 0.12);
  color: #00CFE8;
}

.subject-icon-container.warning {
  background: rgba(255, 159, 67, 0.12);
  color: #FF9F43;
}

.subject-icon-container.danger {
  background: rgba(234, 84, 85, 0.12);
  color: #EA5455;
}

.subject-info {
  flex: 1;
  min-width: 0;
}

.subject-name {
  font-size: 18px;
  font-weight: 600;
  color: #5E5873;
  margin: 0 0 4px 0;
}

.subject-description {
  font-size: 13px;
  font-weight: 400;
  color: #6E6B7B;
  margin: 0;
  line-height: 1.4;
}

/* Progress */
.subject-progress {
  margin-top: 8px;
}

.progress-label {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.progress-text {
  font-size: 12px;
  font-weight: 500;
  color: #6E6B7B;
  margin: 0;
}

.progress-percent {
  font-size: 12px;
  font-weight: 600;
  margin: 0;
}

.progress-percent.primary { color: #6E63E8; }
.progress-percent.success { color: #28C76F; }
.progress-percent.info { color: #00CFE8; }
.progress-percent.warning { color: #FF9F43; }
.progress-percent.danger { color: #EA5455; }

.progress-bar-container {
  height: 6px;
  background: #F3F2F7;
  border-radius: 3px;
  overflow: hidden;
}

.progress-bar-fill {
  height: 100%;
  border-radius: 3px;
  transition: width 1s ease-out;
}

.progress-bar-fill.primary { background: #6E63E8; }
.progress-bar-fill.success { background: #28C76F; }
.progress-bar-fill.info { background: #00CFE8; }
.progress-bar-fill.warning { background: #FF9F43; }
.progress-bar-fill.danger { background: #EA5455; }

/* Stats */
.subject-stats {
  display: flex;
  gap: 24px;
  padding-top: 16px;
  border-top: 1px solid #EBE9F1;
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 8px;
}

.stat-icon {
  font-size: 18px;
  color: #B9B9C3;
}

.stat-value {
  font-size: 14px;
  font-weight: 500;
  color: #5E5873;
  margin: 0;
}

.stat-label {
  font-size: 12px;
  font-weight: 400;
  color: #B9B9C3;
  margin: 0 0 0 4px;
}

/* Loading Skeleton */
.subject-skeleton {
  background: white;
  border: 1px solid #EBE9F1;
  border-radius: 12px;
  padding: 24px;
  min-height: 200px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.skeleton-header {
  display: flex;
  gap: 16px;
}

.skeleton-icon-subject {
  width: 56px;
  height: 56px;
  border-radius: 12px;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: skeleton-loading 1.5s infinite;
}

.skeleton-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.skeleton-name {
  width: 150px;
  height: 18px;
  border-radius: 4px;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: skeleton-loading 1.5s infinite;
}

.skeleton-description {
  width: 200px;
  height: 13px;
  border-radius: 4px;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: skeleton-loading 1.5s infinite;
}

.skeleton-progress {
  width: 100%;
  height: 6px;
  border-radius: 3px;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: skeleton-loading 1.5s infinite;
  margin-top: 16px;
}

.skeleton-stats {
  display: flex;
  gap: 24px;
  padding-top: 16px;
  border-top: 1px solid #EBE9F1;
}

.skeleton-stat {
  width: 80px;
  height: 14px;
  border-radius: 4px;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: skeleton-loading 1.5s infinite;
}

@keyframes skeleton-loading {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}
`,e={args:{subject:"Matemática",icon:"bi-calculator",color:"primary",description:"5º Ano EF - Números e Operações",progress:75,missionsCount:12,studentsCount:34,disabled:!1,loading:!1},render:s=>s.loading?`
        <style>${a}</style>
        <div class="subject-skeleton">
          <div class="skeleton-header">
            <div class="skeleton-icon-subject"></div>
            <div class="skeleton-info">
              <div class="skeleton-name"></div>
              <div class="skeleton-description"></div>
            </div>
          </div>
          <div class="skeleton-progress"></div>
          <div class="skeleton-stats">
            <div class="skeleton-stat"></div>
            <div class="skeleton-stat"></div>
          </div>
        </div>
      `:`
      <style>${a}</style>
      <div class="subject-card ${s.disabled?"disabled":""}" 
           role="button" 
           tabindex="${s.disabled?"-1":"0"}"
           aria-label="${s.subject}: ${s.description}, ${s.progress}% concluído"
           aria-disabled="${s.disabled}">
        <div class="subject-header">
          <div class="subject-icon-container ${s.color}">
            <i class="${s.icon}"></i>
          </div>
          <div class="subject-info">
            <h3 class="subject-name">${s.subject}</h3>
            <p class="subject-description">${s.description}</p>
          </div>
        </div>
        
        <div class="subject-progress">
          <div class="progress-label">
            <p class="progress-text">Progresso</p>
            <p class="progress-percent ${s.color}">${s.progress}%</p>
          </div>
          <div class="progress-bar-container">
            <div class="progress-bar-fill ${s.color}" style="width: ${s.progress}%"></div>
          </div>
        </div>
        
        <div class="subject-stats">
          <div class="stat-item">
            <i class="bi-book stat-icon"></i>
            <p class="stat-value">${s.missionsCount}</p>
            <span class="stat-label">missões</span>
          </div>
          <div class="stat-item">
            <i class="bi-people stat-icon"></i>
            <p class="stat-value">${s.studentsCount}</p>
            <span class="stat-label">alunos</span>
          </div>
        </div>
      </div>
    `},t={render:()=>`
    <style>
      ${a}
      .subjects-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
        gap: 24px;
      }
    </style>
    <div class="subjects-grid">
      <div class="subject-card">
        <div class="subject-header">
          <div class="subject-icon-container primary">
            <i class="bi-calculator"></i>
          </div>
          <div class="subject-info">
            <h3 class="subject-name">Matemática</h3>
            <p class="subject-description">5º Ano EF - Números e Operações</p>
          </div>
        </div>
        <div class="subject-progress">
          <div class="progress-label">
            <p class="progress-text">Progresso</p>
            <p class="progress-percent primary">75%</p>
          </div>
          <div class="progress-bar-container">
            <div class="progress-bar-fill primary" style="width: 75%"></div>
          </div>
        </div>
        <div class="subject-stats">
          <div class="stat-item">
            <i class="bi-book stat-icon"></i>
            <p class="stat-value">12</p>
            <span class="stat-label">missões</span>
          </div>
          <div class="stat-item">
            <i class="bi-people stat-icon"></i>
            <p class="stat-value">34</p>
            <span class="stat-label">alunos</span>
          </div>
        </div>
      </div>
      
      <div class="subject-card">
        <div class="subject-header">
          <div class="subject-icon-container success">
            <i class="bi-book"></i>
          </div>
          <div class="subject-info">
            <h3 class="subject-name">Português</h3>
            <p class="subject-description">5º Ano EF - Leitura e Interpretação</p>
          </div>
        </div>
        <div class="subject-progress">
          <div class="progress-label">
            <p class="progress-text">Progresso</p>
            <p class="progress-percent success">82%</p>
          </div>
          <div class="progress-bar-container">
            <div class="progress-bar-fill success" style="width: 82%"></div>
          </div>
        </div>
        <div class="subject-stats">
          <div class="stat-item">
            <i class="bi-book stat-icon"></i>
            <p class="stat-value">18</p>
            <span class="stat-label">missões</span>
          </div>
          <div class="stat-item">
            <i class="bi-people stat-icon"></i>
            <p class="stat-value">34</p>
            <span class="stat-label">alunos</span>
          </div>
        </div>
      </div>
      
      <div class="subject-card">
        <div class="subject-header">
          <div class="subject-icon-container info">
            <i class="bi-lightbulb"></i>
          </div>
          <div class="subject-info">
            <h3 class="subject-name">Ciências</h3>
            <p class="subject-description">5º Ano EF - Matéria e Energia</p>
          </div>
        </div>
        <div class="subject-progress">
          <div class="progress-label">
            <p class="progress-text">Progresso</p>
            <p class="progress-percent info">65%</p>
          </div>
          <div class="progress-bar-container">
            <div class="progress-bar-fill info" style="width: 65%"></div>
          </div>
        </div>
        <div class="subject-stats">
          <div class="stat-item">
            <i class="bi-book stat-icon"></i>
            <p class="stat-value">10</p>
            <span class="stat-label">missões</span>
          </div>
          <div class="stat-item">
            <i class="bi-people stat-icon"></i>
            <p class="stat-value">34</p>
            <span class="stat-label">alunos</span>
          </div>
        </div>
      </div>
      
      <div class="subject-card">
        <div class="subject-header">
          <div class="subject-icon-container warning">
            <i class="bi-clock-history"></i>
          </div>
          <div class="subject-info">
            <h3 class="subject-name">História</h3>
            <p class="subject-description">5º Ano EF - Brasil Colônia</p>
          </div>
        </div>
        <div class="subject-progress">
          <div class="progress-label">
            <p class="progress-text">Progresso</p>
            <p class="progress-percent warning">58%</p>
          </div>
          <div class="progress-bar-container">
            <div class="progress-bar-fill warning" style="width: 58%"></div>
          </div>
        </div>
        <div class="subject-stats">
          <div class="stat-item">
            <i class="bi-book stat-icon"></i>
            <p class="stat-value">8</p>
            <span class="stat-label">missões</span>
          </div>
          <div class="stat-item">
            <i class="bi-people stat-icon"></i>
            <p class="stat-value">34</p>
            <span class="stat-label">alunos</span>
          </div>
        </div>
      </div>
      
      <div class="subject-card">
        <div class="subject-header">
          <div class="subject-icon-container danger">
            <i class="bi-globe"></i>
          </div>
          <div class="subject-info">
            <h3 class="subject-name">Geografia</h3>
            <p class="subject-description">5º Ano EF - Regiões do Brasil</p>
          </div>
        </div>
        <div class="subject-progress">
          <div class="progress-label">
            <p class="progress-text">Progresso</p>
            <p class="progress-percent danger">42%</p>
          </div>
          <div class="progress-bar-container">
            <div class="progress-bar-fill danger" style="width: 42%"></div>
          </div>
        </div>
        <div class="subject-stats">
          <div class="stat-item">
            <i class="bi-book stat-icon"></i>
            <p class="stat-value">6</p>
            <span class="stat-label">missões</span>
          </div>
          <div class="stat-item">
            <i class="bi-people stat-icon"></i>
            <p class="stat-value">34</p>
            <span class="stat-label">alunos</span>
          </div>
        </div>
      </div>
    </div>
  `},c={render:()=>`
    <style>
      ${a}
      .progress-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
        gap: 24px;
      }
    </style>
    <div class="progress-grid">
      <div class="subject-card">
        <div class="subject-header">
          <div class="subject-icon-container success">
            <i class="bi-check-circle"></i>
          </div>
          <div class="subject-info">
            <h3 class="subject-name">Completo</h3>
            <p class="subject-description">Todas as missões concluídas</p>
          </div>
        </div>
        <div class="subject-progress">
          <div class="progress-label">
            <p class="progress-text">Progresso</p>
            <p class="progress-percent success">100%</p>
          </div>
          <div class="progress-bar-container">
            <div class="progress-bar-fill success" style="width: 100%"></div>
          </div>
        </div>
        <div class="subject-stats">
          <div class="stat-item">
            <i class="bi-book stat-icon"></i>
            <p class="stat-value">20/20</p>
            <span class="stat-label">missões</span>
          </div>
        </div>
      </div>
      
      <div class="subject-card">
        <div class="subject-header">
          <div class="subject-icon-container warning">
            <i class="bi-hourglass-split"></i>
          </div>
          <div class="subject-info">
            <h3 class="subject-name">Em Andamento</h3>
            <p class="subject-description">Metade concluída</p>
          </div>
        </div>
        <div class="subject-progress">
          <div class="progress-label">
            <p class="progress-text">Progresso</p>
            <p class="progress-percent warning">50%</p>
          </div>
          <div class="progress-bar-container">
            <div class="progress-bar-fill warning" style="width: 50%"></div>
          </div>
        </div>
        <div class="subject-stats">
          <div class="stat-item">
            <i class="bi-book stat-icon"></i>
            <p class="stat-value">10/20</p>
            <span class="stat-label">missões</span>
          </div>
        </div>
      </div>
      
      <div class="subject-card">
        <div class="subject-header">
          <div class="subject-icon-container danger">
            <i class="bi-exclamation-triangle"></i>
          </div>
          <div class="subject-info">
            <h3 class="subject-name">Iniciando</h3>
            <p class="subject-description">Poucas missões concluídas</p>
          </div>
        </div>
        <div class="subject-progress">
          <div class="progress-label">
            <p class="progress-text">Progresso</p>
            <p class="progress-percent danger">15%</p>
          </div>
          <div class="progress-bar-container">
            <div class="progress-bar-fill danger" style="width: 15%"></div>
          </div>
        </div>
        <div class="subject-stats">
          <div class="stat-item">
            <i class="bi-book stat-icon"></i>
            <p class="stat-value">3/20</p>
            <span class="stat-label">missões</span>
          </div>
        </div>
      </div>
    </div>
  `},n={render:()=>`
    <style>${a}</style>
    <div class="subject-card">
      <div class="subject-header">
        <div class="subject-icon-container primary">
          <i class="bi-calculator"></i>
        </div>
        <div class="subject-info">
          <h3 class="subject-name">Matemática</h3>
          <p class="subject-description">Estatísticas detalhadas</p>
        </div>
      </div>
      <div class="subject-progress">
        <div class="progress-label">
          <p class="progress-text">Progresso</p>
          <p class="progress-percent primary">75%</p>
        </div>
        <div class="progress-bar-container">
          <div class="progress-bar-fill primary" style="width: 75%"></div>
        </div>
      </div>
      <div class="subject-stats">
        <div class="stat-item">
          <i class="bi-book stat-icon"></i>
          <p class="stat-value">12</p>
          <span class="stat-label">missões</span>
        </div>
        <div class="stat-item">
          <i class="bi-people stat-icon"></i>
          <p class="stat-value">34</p>
          <span class="stat-label">alunos</span>
        </div>
        <div class="stat-item">
          <i class="bi-check-circle stat-icon"></i>
          <p class="stat-value">9</p>
          <span class="stat-label">concluídas</span>
        </div>
      </div>
    </div>
  `},l={render:()=>(setTimeout(()=>{const s=document.querySelector(".subject-card.interactive");s==null||s.addEventListener("click",()=>{alert("Navegando para Matemática")})},100),`
      <style>
        ${a}
        .click-hint {
          text-align: center;
          color: #6E6B7B;
          font-size: 14px;
          margin-bottom: 16px;
        }
      </style>
      <p class="click-hint">💡 Clique no card para interagir</p>
      <div class="subject-card interactive" tabindex="0">
        <div class="subject-header">
          <div class="subject-icon-container primary">
            <i class="bi-calculator"></i>
          </div>
          <div class="subject-info">
            <h3 class="subject-name">Matemática</h3>
            <p class="subject-description">5º Ano EF - Clique para ver detalhes</p>
          </div>
        </div>
        <div class="subject-progress">
          <div class="progress-label">
            <p class="progress-text">Progresso</p>
            <p class="progress-percent primary">75%</p>
          </div>
          <div class="progress-bar-container">
            <div class="progress-bar-fill primary" style="width: 75%"></div>
          </div>
        </div>
        <div class="subject-stats">
          <div class="stat-item">
            <i class="bi-book stat-icon"></i>
            <p class="stat-value">12</p>
            <span class="stat-label">missões</span>
          </div>
          <div class="stat-item">
            <i class="bi-people stat-icon"></i>
            <p class="stat-value">34</p>
            <span class="stat-label">alunos</span>
          </div>
        </div>
      </div>
    `)},r={render:()=>`
    <style>
      ${a}
      .hover-hint {
        text-align: center;
        color: #6E6B7B;
        font-size: 14px;
        margin-bottom: 16px;
      }
    </style>
    <p class="hover-hint">🖱️ Passe o mouse sobre os cards</p>
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 24px;">
      <div class="subject-card">
        <div class="subject-header">
          <div class="subject-icon-container primary">
            <i class="bi-calculator"></i>
          </div>
          <div class="subject-info">
            <h3 class="subject-name">Matemática</h3>
            <p class="subject-description">Hover para ver efeito</p>
          </div>
        </div>
        <div class="subject-progress">
          <div class="progress-label">
            <p class="progress-text">Progresso</p>
            <p class="progress-percent primary">75%</p>
          </div>
          <div class="progress-bar-container">
            <div class="progress-bar-fill primary" style="width: 75%"></div>
          </div>
        </div>
        <div class="subject-stats">
          <div class="stat-item">
            <i class="bi-book stat-icon"></i>
            <p class="stat-value">12</p>
            <span class="stat-label">missões</span>
          </div>
        </div>
      </div>
      
      <div class="subject-card">
        <div class="subject-header">
          <div class="subject-icon-container success">
            <i class="bi-book"></i>
          </div>
          <div class="subject-info">
            <h3 class="subject-name">Português</h3>
            <p class="subject-description">Hover para ver efeito</p>
          </div>
        </div>
        <div class="subject-progress">
          <div class="progress-label">
            <p class="progress-text">Progresso</p>
            <p class="progress-percent success">82%</p>
          </div>
          <div class="progress-bar-container">
            <div class="progress-bar-fill success" style="width: 82%"></div>
          </div>
        </div>
        <div class="subject-stats">
          <div class="stat-item">
            <i class="bi-book stat-icon"></i>
            <p class="stat-value">18</p>
            <span class="stat-label">missões</span>
          </div>
        </div>
      </div>
    </div>
  `},d={render:()=>`
    <style>${a}</style>
    <div class="subject-card disabled">
      <div class="subject-header">
        <div class="subject-icon-container primary">
          <i class="bi-calculator"></i>
        </div>
        <div class="subject-info">
          <h3 class="subject-name">Matemática</h3>
          <p class="subject-description">Disciplina desabilitada</p>
        </div>
      </div>
      <div class="subject-progress">
        <div class="progress-label">
          <p class="progress-text">Progresso</p>
          <p class="progress-percent primary">0%</p>
        </div>
        <div class="progress-bar-container">
          <div class="progress-bar-fill primary" style="width: 0%"></div>
        </div>
      </div>
      <div class="subject-stats">
        <div class="stat-item">
          <i class="bi-book stat-icon"></i>
          <p class="stat-value">0</p>
          <span class="stat-label">missões</span>
        </div>
        <div class="stat-item">
          <i class="bi-people stat-icon"></i>
          <p class="stat-value">0</p>
          <span class="stat-label">alunos</span>
        </div>
      </div>
    </div>
  `},o={render:()=>`
    <style>
      ${a}
      .disciplinas-title {
        font-size: 24px;
        font-weight: 600;
        color: #5E5873;
        margin-bottom: 24px;
      }
      .disciplinas-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
        gap: 24px;
      }
    </style>
    <div>
      <h2 class="disciplinas-title">Minhas Disciplinas - Professor João Silva</h2>
      <div class="disciplinas-grid">
        <div class="subject-card">
          <div class="subject-header">
            <div class="subject-icon-container primary">
              <i class="bi-calculator"></i>
            </div>
            <div class="subject-info">
              <h3 class="subject-name">Matemática</h3>
              <p class="subject-description">5º Ano A - Turma da Manhã</p>
            </div>
          </div>
          <div class="subject-progress">
            <div class="progress-label">
              <p class="progress-text">Progresso da Turma</p>
              <p class="progress-percent primary">75%</p>
            </div>
            <div class="progress-bar-container">
              <div class="progress-bar-fill primary" style="width: 75%"></div>
            </div>
          </div>
          <div class="subject-stats">
            <div class="stat-item">
              <i class="bi-book stat-icon"></i>
              <p class="stat-value">12</p>
              <span class="stat-label">missões</span>
            </div>
            <div class="stat-item">
              <i class="bi-people stat-icon"></i>
              <p class="stat-value">34</p>
              <span class="stat-label">alunos</span>
            </div>
          </div>
        </div>
        
        <div class="subject-card">
          <div class="subject-header">
            <div class="subject-icon-container primary">
              <i class="bi-calculator"></i>
            </div>
            <div class="subject-info">
              <h3 class="subject-name">Matemática</h3>
              <p class="subject-description">5º Ano B - Turma da Tarde</p>
            </div>
          </div>
          <div class="subject-progress">
            <div class="progress-label">
              <p class="progress-text">Progresso da Turma</p>
              <p class="progress-percent primary">68%</p>
            </div>
            <div class="progress-bar-container">
              <div class="progress-bar-fill primary" style="width: 68%"></div>
            </div>
          </div>
          <div class="subject-stats">
            <div class="stat-item">
              <i class="bi-book stat-icon"></i>
              <p class="stat-value">12</p>
              <span class="stat-label">missões</span>
            </div>
            <div class="stat-item">
              <i class="bi-people stat-icon"></i>
              <p class="stat-value">32</p>
              <span class="stat-label">alunos</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `},p={render:()=>`
    <style>
      ${a}
      .dashboard-title {
        font-size: 24px;
        font-weight: 600;
        color: #5E5873;
        margin-bottom: 8px;
      }
      .dashboard-subtitle {
        font-size: 14px;
        color: #6E6B7B;
        margin-bottom: 24px;
      }
      .dashboard-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
        gap: 24px;
      }
    </style>
    <div>
      <h2 class="dashboard-title">Dashboard do Professor</h2>
      <p class="dashboard-subtitle">Visão geral das suas disciplinas e turmas</p>
      <div class="dashboard-grid">
        <div class="subject-card">
          <div class="subject-header">
            <div class="subject-icon-container primary">
              <i class="bi-calculator"></i>
            </div>
            <div class="subject-info">
              <h3 class="subject-name">Matemática 5º A</h3>
              <p class="subject-description">34 alunos · 12 missões aplicadas</p>
            </div>
          </div>
          <div class="subject-progress">
            <div class="progress-label">
              <p class="progress-text">Conclusão Média</p>
              <p class="progress-percent primary">75%</p>
            </div>
            <div class="progress-bar-container">
              <div class="progress-bar-fill primary" style="width: 75%"></div>
            </div>
          </div>
          <div class="subject-stats">
            <div class="stat-item">
              <i class="bi-check-circle stat-icon"></i>
              <p class="stat-value">9/12</p>
              <span class="stat-label">concluídas</span>
            </div>
            <div class="stat-item">
              <i class="bi-trophy stat-icon"></i>
              <p class="stat-value">7.8</p>
              <span class="stat-label">média</span>
            </div>
          </div>
        </div>
        
        <div class="subject-card">
          <div class="subject-header">
            <div class="subject-icon-container success">
              <i class="bi-book"></i>
            </div>
            <div class="subject-info">
              <h3 class="subject-name">Português 5º A</h3>
              <p class="subject-description">34 alunos · 18 missões aplicadas</p>
            </div>
          </div>
          <div class="subject-progress">
            <div class="progress-label">
              <p class="progress-text">Conclusão Média</p>
              <p class="progress-percent success">82%</p>
            </div>
            <div class="progress-bar-container">
              <div class="progress-bar-fill success" style="width: 82%"></div>
            </div>
          </div>
          <div class="subject-stats">
            <div class="stat-item">
              <i class="bi-check-circle stat-icon"></i>
              <p class="stat-value">15/18</p>
              <span class="stat-label">concluídas</span>
            </div>
            <div class="stat-item">
              <i class="bi-trophy stat-icon"></i>
              <p class="stat-value">8.2</p>
              <span class="stat-label">média</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `},v={render:()=>(setTimeout(()=>{const s=document.querySelectorAll(".subject-card.selectable");s.forEach(i=>{i.addEventListener("click",()=>{s.forEach(g=>g.classList.remove("active")),i.classList.add("active")})})},100),`
      <style>
        ${a}
        .selection-title {
          font-size: 24px;
          font-weight: 600;
          color: #5E5873;
          margin-bottom: 8px;
        }
        .selection-subtitle {
          font-size: 14px;
          color: #6E6B7B;
          margin-bottom: 24px;
        }
        .selection-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 20px;
        }
      </style>
      <div>
        <h2 class="selection-title">Selecione a Disciplina</h2>
        <p class="selection-subtitle">Escolha a matéria para criar uma nova missão</p>
        <div class="selection-grid">
          <div class="subject-card selectable" tabindex="0">
            <div class="subject-header">
              <div class="subject-icon-container primary">
                <i class="bi-calculator"></i>
              </div>
              <div class="subject-info">
                <h3 class="subject-name">Matemática</h3>
                <p class="subject-description">5º Ano EF</p>
              </div>
            </div>
            <div class="subject-stats">
              <div class="stat-item">
                <i class="bi-book stat-icon"></i>
                <p class="stat-value">12</p>
                <span class="stat-label">missões</span>
              </div>
            </div>
          </div>
          
          <div class="subject-card selectable" tabindex="0">
            <div class="subject-header">
              <div class="subject-icon-container success">
                <i class="bi-book"></i>
              </div>
              <div class="subject-info">
                <h3 class="subject-name">Português</h3>
                <p class="subject-description">5º Ano EF</p>
              </div>
            </div>
            <div class="subject-stats">
              <div class="stat-item">
                <i class="bi-book stat-icon"></i>
                <p class="stat-value">18</p>
                <span class="stat-label">missões</span>
              </div>
            </div>
          </div>
          
          <div class="subject-card selectable" tabindex="0">
            <div class="subject-header">
              <div class="subject-icon-container info">
                <i class="bi-lightbulb"></i>
              </div>
              <div class="subject-info">
                <h3 class="subject-name">Ciências</h3>
                <p class="subject-description">5º Ano EF</p>
              </div>
            </div>
            <div class="subject-stats">
              <div class="stat-item">
                <i class="bi-book stat-icon"></i>
                <p class="stat-value">10</p>
                <span class="stat-label">missões</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    `)},b={render:()=>(setTimeout(()=>{document.querySelectorAll(".subject-card.interactive-card").forEach((i,g)=>{i.addEventListener("click",()=>{const Y=i.querySelector(".subject-name").textContent;alert(`Abrindo ${Y}`)})})},100),`
      <style>
        ${a}
        .interactive-title {
          font-size: 24px;
          font-weight: 600;
          color: #5E5873;
          margin-bottom: 8px;
        }
        .interactive-subtitle {
          font-size: 14px;
          color: #6E6B7B;
          margin-bottom: 24px;
        }
        .interactive-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 24px;
        }
      </style>
      <div>
        <h2 class="interactive-title">Grade de Disciplinas Interativa</h2>
        <p class="interactive-subtitle">💡 Clique em qualquer card para abrir a disciplina</p>
        <div class="interactive-grid">
          <div class="subject-card interactive-card" tabindex="0">
            <div class="subject-header">
              <div class="subject-icon-container primary">
                <i class="bi-calculator"></i>
              </div>
              <div class="subject-info">
                <h3 class="subject-name">Matemática</h3>
                <p class="subject-description">5º Ano EF</p>
              </div>
            </div>
            <div class="subject-progress">
              <div class="progress-label">
                <p class="progress-text">Progresso</p>
                <p class="progress-percent primary">75%</p>
              </div>
              <div class="progress-bar-container">
                <div class="progress-bar-fill primary" style="width: 75%"></div>
              </div>
            </div>
            <div class="subject-stats">
              <div class="stat-item">
                <i class="bi-book stat-icon"></i>
                <p class="stat-value">12</p>
                <span class="stat-label">missões</span>
              </div>
              <div class="stat-item">
                <i class="bi-people stat-icon"></i>
                <p class="stat-value">34</p>
                <span class="stat-label">alunos</span>
              </div>
            </div>
          </div>
          
          <div class="subject-card interactive-card" tabindex="0">
            <div class="subject-header">
              <div class="subject-icon-container success">
                <i class="bi-book"></i>
              </div>
              <div class="subject-info">
                <h3 class="subject-name">Português</h3>
                <p class="subject-description">5º Ano EF</p>
              </div>
            </div>
            <div class="subject-progress">
              <div class="progress-label">
                <p class="progress-text">Progresso</p>
                <p class="progress-percent success">82%</p>
              </div>
              <div class="progress-bar-container">
                <div class="progress-bar-fill success" style="width: 82%"></div>
              </div>
            </div>
            <div class="subject-stats">
              <div class="stat-item">
                <i class="bi-book stat-icon"></i>
                <p class="stat-value">18</p>
                <span class="stat-label">missões</span>
              </div>
              <div class="stat-item">
                <i class="bi-people stat-icon"></i>
                <p class="stat-value">34</p>
                <span class="stat-label">alunos</span>
              </div>
            </div>
          </div>
          
          <div class="subject-card interactive-card" tabindex="0">
            <div class="subject-header">
              <div class="subject-icon-container info">
                <i class="bi-lightbulb"></i>
              </div>
              <div class="subject-info">
                <h3 class="subject-name">Ciências</h3>
                <p class="subject-description">5º Ano EF</p>
              </div>
            </div>
            <div class="subject-progress">
              <div class="progress-label">
                <p class="progress-text">Progresso</p>
                <p class="progress-percent info">65%</p>
              </div>
              <div class="progress-bar-container">
                <div class="progress-bar-fill info" style="width: 65%"></div>
              </div>
            </div>
            <div class="subject-stats">
              <div class="stat-item">
                <i class="bi-book stat-icon"></i>
                <p class="stat-value">10</p>
                <span class="stat-label">missões</span>
              </div>
              <div class="stat-item">
                <i class="bi-people stat-icon"></i>
                <p class="stat-value">34</p>
                <span class="stat-label">alunos</span>
              </div>
            </div>
          </div>
          
          <div class="subject-card interactive-card" tabindex="0">
            <div class="subject-header">
              <div class="subject-icon-container warning">
                <i class="bi-clock-history"></i>
              </div>
              <div class="subject-info">
                <h3 class="subject-name">História</h3>
                <p class="subject-description">5º Ano EF</p>
              </div>
            </div>
            <div class="subject-progress">
              <div class="progress-label">
                <p class="progress-text">Progresso</p>
                <p class="progress-percent warning">58%</p>
              </div>
              <div class="progress-bar-container">
                <div class="progress-bar-fill warning" style="width: 58%"></div>
              </div>
            </div>
            <div class="subject-stats">
              <div class="stat-item">
                <i class="bi-book stat-icon"></i>
                <p class="stat-value">8</p>
                <span class="stat-label">missões</span>
              </div>
              <div class="stat-item">
                <i class="bi-people stat-icon"></i>
                <p class="stat-value">34</p>
                <span class="stat-label">alunos</span>
              </div>
            </div>
          </div>
          
          <div class="subject-card interactive-card" tabindex="0">
            <div class="subject-header">
              <div class="subject-icon-container danger">
                <i class="bi-globe"></i>
              </div>
              <div class="subject-info">
                <h3 class="subject-name">Geografia</h3>
                <p class="subject-description">5º Ano EF</p>
              </div>
            </div>
            <div class="subject-progress">
              <div class="progress-label">
                <p class="progress-text">Progresso</p>
                <p class="progress-percent danger">42%</p>
              </div>
              <div class="progress-bar-container">
                <div class="progress-bar-fill danger" style="width: 42%"></div>
              </div>
            </div>
            <div class="subject-stats">
              <div class="stat-item">
                <i class="bi-book stat-icon"></i>
                <p class="stat-value">6</p>
                <span class="stat-label">missões</span>
              </div>
              <div class="stat-item">
                <i class="bi-people stat-icon"></i>
                <p class="stat-value">34</p>
                <span class="stat-label">alunos</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    `)},u={render:()=>`
    <style>
      ${a}
      .loading-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
        gap: 24px;
      }
    </style>
    <div class="loading-grid">
      <div class="subject-skeleton">
        <div class="skeleton-header">
          <div class="skeleton-icon-subject"></div>
          <div class="skeleton-info">
            <div class="skeleton-name"></div>
            <div class="skeleton-description"></div>
          </div>
        </div>
        <div class="skeleton-progress"></div>
        <div class="skeleton-stats">
          <div class="skeleton-stat"></div>
          <div class="skeleton-stat"></div>
        </div>
      </div>
      
      <div class="subject-skeleton">
        <div class="skeleton-header">
          <div class="skeleton-icon-subject"></div>
          <div class="skeleton-info">
            <div class="skeleton-name"></div>
            <div class="skeleton-description"></div>
          </div>
        </div>
        <div class="skeleton-progress"></div>
        <div class="skeleton-stats">
          <div class="skeleton-stat"></div>
          <div class="skeleton-stat"></div>
        </div>
      </div>
      
      <div class="subject-skeleton">
        <div class="skeleton-header">
          <div class="skeleton-icon-subject"></div>
          <div class="skeleton-info">
            <div class="skeleton-name"></div>
            <div class="skeleton-description"></div>
          </div>
        </div>
        <div class="skeleton-progress"></div>
        <div class="skeleton-stats">
          <div class="skeleton-stat"></div>
          <div class="skeleton-stat"></div>
        </div>
      </div>
    </div>
  `};var m,j,h;e.parameters={...e.parameters,docs:{...(m=e.parameters)==null?void 0:m.docs,source:{originalSource:`{
  args: {
    subject: 'Matemática',
    icon: 'bi-calculator',
    color: 'primary',
    description: '5º Ano EF - Números e Operações',
    progress: 75,
    missionsCount: 12,
    studentsCount: 34,
    disabled: false,
    loading: false
  },
  render: args => {
    if (args.loading) {
      return \`
        <style>\${componentStyles}</style>
        <div class="subject-skeleton">
          <div class="skeleton-header">
            <div class="skeleton-icon-subject"></div>
            <div class="skeleton-info">
              <div class="skeleton-name"></div>
              <div class="skeleton-description"></div>
            </div>
          </div>
          <div class="skeleton-progress"></div>
          <div class="skeleton-stats">
            <div class="skeleton-stat"></div>
            <div class="skeleton-stat"></div>
          </div>
        </div>
      \`;
    }
    return \`
      <style>\${componentStyles}</style>
      <div class="subject-card \${args.disabled ? 'disabled' : ''}" 
           role="button" 
           tabindex="\${args.disabled ? '-1' : '0'}"
           aria-label="\${args.subject}: \${args.description}, \${args.progress}% concluído"
           aria-disabled="\${args.disabled}">
        <div class="subject-header">
          <div class="subject-icon-container \${args.color}">
            <i class="\${args.icon}"></i>
          </div>
          <div class="subject-info">
            <h3 class="subject-name">\${args.subject}</h3>
            <p class="subject-description">\${args.description}</p>
          </div>
        </div>
        
        <div class="subject-progress">
          <div class="progress-label">
            <p class="progress-text">Progresso</p>
            <p class="progress-percent \${args.color}">\${args.progress}%</p>
          </div>
          <div class="progress-bar-container">
            <div class="progress-bar-fill \${args.color}" style="width: \${args.progress}%"></div>
          </div>
        </div>
        
        <div class="subject-stats">
          <div class="stat-item">
            <i class="bi-book stat-icon"></i>
            <p class="stat-value">\${args.missionsCount}</p>
            <span class="stat-label">missões</span>
          </div>
          <div class="stat-item">
            <i class="bi-people stat-icon"></i>
            <p class="stat-value">\${args.studentsCount}</p>
            <span class="stat-label">alunos</span>
          </div>
        </div>
      </div>
    \`;
  }
}`,...(h=(j=e.parameters)==null?void 0:j.docs)==null?void 0:h.source}}};var x,f,y;t.parameters={...t.parameters,docs:{...(x=t.parameters)==null?void 0:x.docs,source:{originalSource:`{
  render: () => \`
    <style>
      \${componentStyles}
      .subjects-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
        gap: 24px;
      }
    </style>
    <div class="subjects-grid">
      <div class="subject-card">
        <div class="subject-header">
          <div class="subject-icon-container primary">
            <i class="bi-calculator"></i>
          </div>
          <div class="subject-info">
            <h3 class="subject-name">Matemática</h3>
            <p class="subject-description">5º Ano EF - Números e Operações</p>
          </div>
        </div>
        <div class="subject-progress">
          <div class="progress-label">
            <p class="progress-text">Progresso</p>
            <p class="progress-percent primary">75%</p>
          </div>
          <div class="progress-bar-container">
            <div class="progress-bar-fill primary" style="width: 75%"></div>
          </div>
        </div>
        <div class="subject-stats">
          <div class="stat-item">
            <i class="bi-book stat-icon"></i>
            <p class="stat-value">12</p>
            <span class="stat-label">missões</span>
          </div>
          <div class="stat-item">
            <i class="bi-people stat-icon"></i>
            <p class="stat-value">34</p>
            <span class="stat-label">alunos</span>
          </div>
        </div>
      </div>
      
      <div class="subject-card">
        <div class="subject-header">
          <div class="subject-icon-container success">
            <i class="bi-book"></i>
          </div>
          <div class="subject-info">
            <h3 class="subject-name">Português</h3>
            <p class="subject-description">5º Ano EF - Leitura e Interpretação</p>
          </div>
        </div>
        <div class="subject-progress">
          <div class="progress-label">
            <p class="progress-text">Progresso</p>
            <p class="progress-percent success">82%</p>
          </div>
          <div class="progress-bar-container">
            <div class="progress-bar-fill success" style="width: 82%"></div>
          </div>
        </div>
        <div class="subject-stats">
          <div class="stat-item">
            <i class="bi-book stat-icon"></i>
            <p class="stat-value">18</p>
            <span class="stat-label">missões</span>
          </div>
          <div class="stat-item">
            <i class="bi-people stat-icon"></i>
            <p class="stat-value">34</p>
            <span class="stat-label">alunos</span>
          </div>
        </div>
      </div>
      
      <div class="subject-card">
        <div class="subject-header">
          <div class="subject-icon-container info">
            <i class="bi-lightbulb"></i>
          </div>
          <div class="subject-info">
            <h3 class="subject-name">Ciências</h3>
            <p class="subject-description">5º Ano EF - Matéria e Energia</p>
          </div>
        </div>
        <div class="subject-progress">
          <div class="progress-label">
            <p class="progress-text">Progresso</p>
            <p class="progress-percent info">65%</p>
          </div>
          <div class="progress-bar-container">
            <div class="progress-bar-fill info" style="width: 65%"></div>
          </div>
        </div>
        <div class="subject-stats">
          <div class="stat-item">
            <i class="bi-book stat-icon"></i>
            <p class="stat-value">10</p>
            <span class="stat-label">missões</span>
          </div>
          <div class="stat-item">
            <i class="bi-people stat-icon"></i>
            <p class="stat-value">34</p>
            <span class="stat-label">alunos</span>
          </div>
        </div>
      </div>
      
      <div class="subject-card">
        <div class="subject-header">
          <div class="subject-icon-container warning">
            <i class="bi-clock-history"></i>
          </div>
          <div class="subject-info">
            <h3 class="subject-name">História</h3>
            <p class="subject-description">5º Ano EF - Brasil Colônia</p>
          </div>
        </div>
        <div class="subject-progress">
          <div class="progress-label">
            <p class="progress-text">Progresso</p>
            <p class="progress-percent warning">58%</p>
          </div>
          <div class="progress-bar-container">
            <div class="progress-bar-fill warning" style="width: 58%"></div>
          </div>
        </div>
        <div class="subject-stats">
          <div class="stat-item">
            <i class="bi-book stat-icon"></i>
            <p class="stat-value">8</p>
            <span class="stat-label">missões</span>
          </div>
          <div class="stat-item">
            <i class="bi-people stat-icon"></i>
            <p class="stat-value">34</p>
            <span class="stat-label">alunos</span>
          </div>
        </div>
      </div>
      
      <div class="subject-card">
        <div class="subject-header">
          <div class="subject-icon-container danger">
            <i class="bi-globe"></i>
          </div>
          <div class="subject-info">
            <h3 class="subject-name">Geografia</h3>
            <p class="subject-description">5º Ano EF - Regiões do Brasil</p>
          </div>
        </div>
        <div class="subject-progress">
          <div class="progress-label">
            <p class="progress-text">Progresso</p>
            <p class="progress-percent danger">42%</p>
          </div>
          <div class="progress-bar-container">
            <div class="progress-bar-fill danger" style="width: 42%"></div>
          </div>
        </div>
        <div class="subject-stats">
          <div class="stat-item">
            <i class="bi-book stat-icon"></i>
            <p class="stat-value">6</p>
            <span class="stat-label">missões</span>
          </div>
          <div class="stat-item">
            <i class="bi-people stat-icon"></i>
            <p class="stat-value">34</p>
            <span class="stat-label">alunos</span>
          </div>
        </div>
      </div>
    </div>
  \`
}`,...(y=(f=t.parameters)==null?void 0:f.docs)==null?void 0:y.source}}};var k,E,w;c.parameters={...c.parameters,docs:{...(k=c.parameters)==null?void 0:k.docs,source:{originalSource:`{
  render: () => \`
    <style>
      \${componentStyles}
      .progress-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
        gap: 24px;
      }
    </style>
    <div class="progress-grid">
      <div class="subject-card">
        <div class="subject-header">
          <div class="subject-icon-container success">
            <i class="bi-check-circle"></i>
          </div>
          <div class="subject-info">
            <h3 class="subject-name">Completo</h3>
            <p class="subject-description">Todas as missões concluídas</p>
          </div>
        </div>
        <div class="subject-progress">
          <div class="progress-label">
            <p class="progress-text">Progresso</p>
            <p class="progress-percent success">100%</p>
          </div>
          <div class="progress-bar-container">
            <div class="progress-bar-fill success" style="width: 100%"></div>
          </div>
        </div>
        <div class="subject-stats">
          <div class="stat-item">
            <i class="bi-book stat-icon"></i>
            <p class="stat-value">20/20</p>
            <span class="stat-label">missões</span>
          </div>
        </div>
      </div>
      
      <div class="subject-card">
        <div class="subject-header">
          <div class="subject-icon-container warning">
            <i class="bi-hourglass-split"></i>
          </div>
          <div class="subject-info">
            <h3 class="subject-name">Em Andamento</h3>
            <p class="subject-description">Metade concluída</p>
          </div>
        </div>
        <div class="subject-progress">
          <div class="progress-label">
            <p class="progress-text">Progresso</p>
            <p class="progress-percent warning">50%</p>
          </div>
          <div class="progress-bar-container">
            <div class="progress-bar-fill warning" style="width: 50%"></div>
          </div>
        </div>
        <div class="subject-stats">
          <div class="stat-item">
            <i class="bi-book stat-icon"></i>
            <p class="stat-value">10/20</p>
            <span class="stat-label">missões</span>
          </div>
        </div>
      </div>
      
      <div class="subject-card">
        <div class="subject-header">
          <div class="subject-icon-container danger">
            <i class="bi-exclamation-triangle"></i>
          </div>
          <div class="subject-info">
            <h3 class="subject-name">Iniciando</h3>
            <p class="subject-description">Poucas missões concluídas</p>
          </div>
        </div>
        <div class="subject-progress">
          <div class="progress-label">
            <p class="progress-text">Progresso</p>
            <p class="progress-percent danger">15%</p>
          </div>
          <div class="progress-bar-container">
            <div class="progress-bar-fill danger" style="width: 15%"></div>
          </div>
        </div>
        <div class="subject-stats">
          <div class="stat-item">
            <i class="bi-book stat-icon"></i>
            <p class="stat-value">3/20</p>
            <span class="stat-label">missões</span>
          </div>
        </div>
      </div>
    </div>
  \`
}`,...(w=(E=c.parameters)==null?void 0:E.docs)==null?void 0:w.source}}};var F,A,P;n.parameters={...n.parameters,docs:{...(F=n.parameters)==null?void 0:F.docs,source:{originalSource:`{
  render: () => \`
    <style>\${componentStyles}</style>
    <div class="subject-card">
      <div class="subject-header">
        <div class="subject-icon-container primary">
          <i class="bi-calculator"></i>
        </div>
        <div class="subject-info">
          <h3 class="subject-name">Matemática</h3>
          <p class="subject-description">Estatísticas detalhadas</p>
        </div>
      </div>
      <div class="subject-progress">
        <div class="progress-label">
          <p class="progress-text">Progresso</p>
          <p class="progress-percent primary">75%</p>
        </div>
        <div class="progress-bar-container">
          <div class="progress-bar-fill primary" style="width: 75%"></div>
        </div>
      </div>
      <div class="subject-stats">
        <div class="stat-item">
          <i class="bi-book stat-icon"></i>
          <p class="stat-value">12</p>
          <span class="stat-label">missões</span>
        </div>
        <div class="stat-item">
          <i class="bi-people stat-icon"></i>
          <p class="stat-value">34</p>
          <span class="stat-label">alunos</span>
        </div>
        <div class="stat-item">
          <i class="bi-check-circle stat-icon"></i>
          <p class="stat-value">9</p>
          <span class="stat-label">concluídas</span>
        </div>
      </div>
    </div>
  \`
}`,...(P=(A=n.parameters)==null?void 0:A.docs)==null?void 0:P.source}}};var B,$,C;l.parameters={...l.parameters,docs:{...(B=l.parameters)==null?void 0:B.docs,source:{originalSource:`{
  render: () => {
    setTimeout(() => {
      const card = document.querySelector('.subject-card.interactive');
      card?.addEventListener('click', () => {
        alert('Navegando para Matemática');
      });
    }, 100);
    return \`
      <style>
        \${componentStyles}
        .click-hint {
          text-align: center;
          color: #6E6B7B;
          font-size: 14px;
          margin-bottom: 16px;
        }
      </style>
      <p class="click-hint">💡 Clique no card para interagir</p>
      <div class="subject-card interactive" tabindex="0">
        <div class="subject-header">
          <div class="subject-icon-container primary">
            <i class="bi-calculator"></i>
          </div>
          <div class="subject-info">
            <h3 class="subject-name">Matemática</h3>
            <p class="subject-description">5º Ano EF - Clique para ver detalhes</p>
          </div>
        </div>
        <div class="subject-progress">
          <div class="progress-label">
            <p class="progress-text">Progresso</p>
            <p class="progress-percent primary">75%</p>
          </div>
          <div class="progress-bar-container">
            <div class="progress-bar-fill primary" style="width: 75%"></div>
          </div>
        </div>
        <div class="subject-stats">
          <div class="stat-item">
            <i class="bi-book stat-icon"></i>
            <p class="stat-value">12</p>
            <span class="stat-label">missões</span>
          </div>
          <div class="stat-item">
            <i class="bi-people stat-icon"></i>
            <p class="stat-value">34</p>
            <span class="stat-label">alunos</span>
          </div>
        </div>
      </div>
    \`;
  }
}`,...(C=($=l.parameters)==null?void 0:$.docs)==null?void 0:C.source}}};var S,M,D;r.parameters={...r.parameters,docs:{...(S=r.parameters)==null?void 0:S.docs,source:{originalSource:`{
  render: () => \`
    <style>
      \${componentStyles}
      .hover-hint {
        text-align: center;
        color: #6E6B7B;
        font-size: 14px;
        margin-bottom: 16px;
      }
    </style>
    <p class="hover-hint">🖱️ Passe o mouse sobre os cards</p>
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 24px;">
      <div class="subject-card">
        <div class="subject-header">
          <div class="subject-icon-container primary">
            <i class="bi-calculator"></i>
          </div>
          <div class="subject-info">
            <h3 class="subject-name">Matemática</h3>
            <p class="subject-description">Hover para ver efeito</p>
          </div>
        </div>
        <div class="subject-progress">
          <div class="progress-label">
            <p class="progress-text">Progresso</p>
            <p class="progress-percent primary">75%</p>
          </div>
          <div class="progress-bar-container">
            <div class="progress-bar-fill primary" style="width: 75%"></div>
          </div>
        </div>
        <div class="subject-stats">
          <div class="stat-item">
            <i class="bi-book stat-icon"></i>
            <p class="stat-value">12</p>
            <span class="stat-label">missões</span>
          </div>
        </div>
      </div>
      
      <div class="subject-card">
        <div class="subject-header">
          <div class="subject-icon-container success">
            <i class="bi-book"></i>
          </div>
          <div class="subject-info">
            <h3 class="subject-name">Português</h3>
            <p class="subject-description">Hover para ver efeito</p>
          </div>
        </div>
        <div class="subject-progress">
          <div class="progress-label">
            <p class="progress-text">Progresso</p>
            <p class="progress-percent success">82%</p>
          </div>
          <div class="progress-bar-container">
            <div class="progress-bar-fill success" style="width: 82%"></div>
          </div>
        </div>
        <div class="subject-stats">
          <div class="stat-item">
            <i class="bi-book stat-icon"></i>
            <p class="stat-value">18</p>
            <span class="stat-label">missões</span>
          </div>
        </div>
      </div>
    </div>
  \`
}`,...(D=(M=r.parameters)==null?void 0:M.docs)==null?void 0:D.source}}};var z,T,q;d.parameters={...d.parameters,docs:{...(z=d.parameters)==null?void 0:z.docs,source:{originalSource:`{
  render: () => \`
    <style>\${componentStyles}</style>
    <div class="subject-card disabled">
      <div class="subject-header">
        <div class="subject-icon-container primary">
          <i class="bi-calculator"></i>
        </div>
        <div class="subject-info">
          <h3 class="subject-name">Matemática</h3>
          <p class="subject-description">Disciplina desabilitada</p>
        </div>
      </div>
      <div class="subject-progress">
        <div class="progress-label">
          <p class="progress-text">Progresso</p>
          <p class="progress-percent primary">0%</p>
        </div>
        <div class="progress-bar-container">
          <div class="progress-bar-fill primary" style="width: 0%"></div>
        </div>
      </div>
      <div class="subject-stats">
        <div class="stat-item">
          <i class="bi-book stat-icon"></i>
          <p class="stat-value">0</p>
          <span class="stat-label">missões</span>
        </div>
        <div class="stat-item">
          <i class="bi-people stat-icon"></i>
          <p class="stat-value">0</p>
          <span class="stat-label">alunos</span>
        </div>
      </div>
    </div>
  \`
}`,...(q=(T=d.parameters)==null?void 0:T.docs)==null?void 0:q.source}}};var L,H,G;o.parameters={...o.parameters,docs:{...(L=o.parameters)==null?void 0:L.docs,source:{originalSource:`{
  render: () => \`
    <style>
      \${componentStyles}
      .disciplinas-title {
        font-size: 24px;
        font-weight: 600;
        color: #5E5873;
        margin-bottom: 24px;
      }
      .disciplinas-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
        gap: 24px;
      }
    </style>
    <div>
      <h2 class="disciplinas-title">Minhas Disciplinas - Professor João Silva</h2>
      <div class="disciplinas-grid">
        <div class="subject-card">
          <div class="subject-header">
            <div class="subject-icon-container primary">
              <i class="bi-calculator"></i>
            </div>
            <div class="subject-info">
              <h3 class="subject-name">Matemática</h3>
              <p class="subject-description">5º Ano A - Turma da Manhã</p>
            </div>
          </div>
          <div class="subject-progress">
            <div class="progress-label">
              <p class="progress-text">Progresso da Turma</p>
              <p class="progress-percent primary">75%</p>
            </div>
            <div class="progress-bar-container">
              <div class="progress-bar-fill primary" style="width: 75%"></div>
            </div>
          </div>
          <div class="subject-stats">
            <div class="stat-item">
              <i class="bi-book stat-icon"></i>
              <p class="stat-value">12</p>
              <span class="stat-label">missões</span>
            </div>
            <div class="stat-item">
              <i class="bi-people stat-icon"></i>
              <p class="stat-value">34</p>
              <span class="stat-label">alunos</span>
            </div>
          </div>
        </div>
        
        <div class="subject-card">
          <div class="subject-header">
            <div class="subject-icon-container primary">
              <i class="bi-calculator"></i>
            </div>
            <div class="subject-info">
              <h3 class="subject-name">Matemática</h3>
              <p class="subject-description">5º Ano B - Turma da Tarde</p>
            </div>
          </div>
          <div class="subject-progress">
            <div class="progress-label">
              <p class="progress-text">Progresso da Turma</p>
              <p class="progress-percent primary">68%</p>
            </div>
            <div class="progress-bar-container">
              <div class="progress-bar-fill primary" style="width: 68%"></div>
            </div>
          </div>
          <div class="subject-stats">
            <div class="stat-item">
              <i class="bi-book stat-icon"></i>
              <p class="stat-value">12</p>
              <span class="stat-label">missões</span>
            </div>
            <div class="stat-item">
              <i class="bi-people stat-icon"></i>
              <p class="stat-value">32</p>
              <span class="stat-label">alunos</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  \`
}`,...(G=(H=o.parameters)==null?void 0:H.docs)==null?void 0:G.source}}};var I,N,V;p.parameters={...p.parameters,docs:{...(I=p.parameters)==null?void 0:I.docs,source:{originalSource:`{
  render: () => \`
    <style>
      \${componentStyles}
      .dashboard-title {
        font-size: 24px;
        font-weight: 600;
        color: #5E5873;
        margin-bottom: 8px;
      }
      .dashboard-subtitle {
        font-size: 14px;
        color: #6E6B7B;
        margin-bottom: 24px;
      }
      .dashboard-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
        gap: 24px;
      }
    </style>
    <div>
      <h2 class="dashboard-title">Dashboard do Professor</h2>
      <p class="dashboard-subtitle">Visão geral das suas disciplinas e turmas</p>
      <div class="dashboard-grid">
        <div class="subject-card">
          <div class="subject-header">
            <div class="subject-icon-container primary">
              <i class="bi-calculator"></i>
            </div>
            <div class="subject-info">
              <h3 class="subject-name">Matemática 5º A</h3>
              <p class="subject-description">34 alunos · 12 missões aplicadas</p>
            </div>
          </div>
          <div class="subject-progress">
            <div class="progress-label">
              <p class="progress-text">Conclusão Média</p>
              <p class="progress-percent primary">75%</p>
            </div>
            <div class="progress-bar-container">
              <div class="progress-bar-fill primary" style="width: 75%"></div>
            </div>
          </div>
          <div class="subject-stats">
            <div class="stat-item">
              <i class="bi-check-circle stat-icon"></i>
              <p class="stat-value">9/12</p>
              <span class="stat-label">concluídas</span>
            </div>
            <div class="stat-item">
              <i class="bi-trophy stat-icon"></i>
              <p class="stat-value">7.8</p>
              <span class="stat-label">média</span>
            </div>
          </div>
        </div>
        
        <div class="subject-card">
          <div class="subject-header">
            <div class="subject-icon-container success">
              <i class="bi-book"></i>
            </div>
            <div class="subject-info">
              <h3 class="subject-name">Português 5º A</h3>
              <p class="subject-description">34 alunos · 18 missões aplicadas</p>
            </div>
          </div>
          <div class="subject-progress">
            <div class="progress-label">
              <p class="progress-text">Conclusão Média</p>
              <p class="progress-percent success">82%</p>
            </div>
            <div class="progress-bar-container">
              <div class="progress-bar-fill success" style="width: 82%"></div>
            </div>
          </div>
          <div class="subject-stats">
            <div class="stat-item">
              <i class="bi-check-circle stat-icon"></i>
              <p class="stat-value">15/18</p>
              <span class="stat-label">concluídas</span>
            </div>
            <div class="stat-item">
              <i class="bi-trophy stat-icon"></i>
              <p class="stat-value">8.2</p>
              <span class="stat-label">média</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  \`
}`,...(V=(N=p.parameters)==null?void 0:N.docs)==null?void 0:V.source}}};var O,W,_;v.parameters={...v.parameters,docs:{...(O=v.parameters)==null?void 0:O.docs,source:{originalSource:`{
  render: () => {
    setTimeout(() => {
      const cards = document.querySelectorAll('.subject-card.selectable');
      cards.forEach(card => {
        card.addEventListener('click', () => {
          cards.forEach(c => c.classList.remove('active'));
          card.classList.add('active');
        });
      });
    }, 100);
    return \`
      <style>
        \${componentStyles}
        .selection-title {
          font-size: 24px;
          font-weight: 600;
          color: #5E5873;
          margin-bottom: 8px;
        }
        .selection-subtitle {
          font-size: 14px;
          color: #6E6B7B;
          margin-bottom: 24px;
        }
        .selection-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 20px;
        }
      </style>
      <div>
        <h2 class="selection-title">Selecione a Disciplina</h2>
        <p class="selection-subtitle">Escolha a matéria para criar uma nova missão</p>
        <div class="selection-grid">
          <div class="subject-card selectable" tabindex="0">
            <div class="subject-header">
              <div class="subject-icon-container primary">
                <i class="bi-calculator"></i>
              </div>
              <div class="subject-info">
                <h3 class="subject-name">Matemática</h3>
                <p class="subject-description">5º Ano EF</p>
              </div>
            </div>
            <div class="subject-stats">
              <div class="stat-item">
                <i class="bi-book stat-icon"></i>
                <p class="stat-value">12</p>
                <span class="stat-label">missões</span>
              </div>
            </div>
          </div>
          
          <div class="subject-card selectable" tabindex="0">
            <div class="subject-header">
              <div class="subject-icon-container success">
                <i class="bi-book"></i>
              </div>
              <div class="subject-info">
                <h3 class="subject-name">Português</h3>
                <p class="subject-description">5º Ano EF</p>
              </div>
            </div>
            <div class="subject-stats">
              <div class="stat-item">
                <i class="bi-book stat-icon"></i>
                <p class="stat-value">18</p>
                <span class="stat-label">missões</span>
              </div>
            </div>
          </div>
          
          <div class="subject-card selectable" tabindex="0">
            <div class="subject-header">
              <div class="subject-icon-container info">
                <i class="bi-lightbulb"></i>
              </div>
              <div class="subject-info">
                <h3 class="subject-name">Ciências</h3>
                <p class="subject-description">5º Ano EF</p>
              </div>
            </div>
            <div class="subject-stats">
              <div class="stat-item">
                <i class="bi-book stat-icon"></i>
                <p class="stat-value">10</p>
                <span class="stat-label">missões</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    \`;
  }
}`,...(_=(W=v.parameters)==null?void 0:W.docs)==null?void 0:_.source}}};var J,Q,R;b.parameters={...b.parameters,docs:{...(J=b.parameters)==null?void 0:J.docs,source:{originalSource:`{
  render: () => {
    setTimeout(() => {
      const cards = document.querySelectorAll('.subject-card.interactive-card');
      cards.forEach((card, index) => {
        card.addEventListener('click', () => {
          const subject = card.querySelector('.subject-name').textContent;
          alert(\`Abrindo \${subject}\`);
        });
      });
    }, 100);
    return \`
      <style>
        \${componentStyles}
        .interactive-title {
          font-size: 24px;
          font-weight: 600;
          color: #5E5873;
          margin-bottom: 8px;
        }
        .interactive-subtitle {
          font-size: 14px;
          color: #6E6B7B;
          margin-bottom: 24px;
        }
        .interactive-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 24px;
        }
      </style>
      <div>
        <h2 class="interactive-title">Grade de Disciplinas Interativa</h2>
        <p class="interactive-subtitle">💡 Clique em qualquer card para abrir a disciplina</p>
        <div class="interactive-grid">
          <div class="subject-card interactive-card" tabindex="0">
            <div class="subject-header">
              <div class="subject-icon-container primary">
                <i class="bi-calculator"></i>
              </div>
              <div class="subject-info">
                <h3 class="subject-name">Matemática</h3>
                <p class="subject-description">5º Ano EF</p>
              </div>
            </div>
            <div class="subject-progress">
              <div class="progress-label">
                <p class="progress-text">Progresso</p>
                <p class="progress-percent primary">75%</p>
              </div>
              <div class="progress-bar-container">
                <div class="progress-bar-fill primary" style="width: 75%"></div>
              </div>
            </div>
            <div class="subject-stats">
              <div class="stat-item">
                <i class="bi-book stat-icon"></i>
                <p class="stat-value">12</p>
                <span class="stat-label">missões</span>
              </div>
              <div class="stat-item">
                <i class="bi-people stat-icon"></i>
                <p class="stat-value">34</p>
                <span class="stat-label">alunos</span>
              </div>
            </div>
          </div>
          
          <div class="subject-card interactive-card" tabindex="0">
            <div class="subject-header">
              <div class="subject-icon-container success">
                <i class="bi-book"></i>
              </div>
              <div class="subject-info">
                <h3 class="subject-name">Português</h3>
                <p class="subject-description">5º Ano EF</p>
              </div>
            </div>
            <div class="subject-progress">
              <div class="progress-label">
                <p class="progress-text">Progresso</p>
                <p class="progress-percent success">82%</p>
              </div>
              <div class="progress-bar-container">
                <div class="progress-bar-fill success" style="width: 82%"></div>
              </div>
            </div>
            <div class="subject-stats">
              <div class="stat-item">
                <i class="bi-book stat-icon"></i>
                <p class="stat-value">18</p>
                <span class="stat-label">missões</span>
              </div>
              <div class="stat-item">
                <i class="bi-people stat-icon"></i>
                <p class="stat-value">34</p>
                <span class="stat-label">alunos</span>
              </div>
            </div>
          </div>
          
          <div class="subject-card interactive-card" tabindex="0">
            <div class="subject-header">
              <div class="subject-icon-container info">
                <i class="bi-lightbulb"></i>
              </div>
              <div class="subject-info">
                <h3 class="subject-name">Ciências</h3>
                <p class="subject-description">5º Ano EF</p>
              </div>
            </div>
            <div class="subject-progress">
              <div class="progress-label">
                <p class="progress-text">Progresso</p>
                <p class="progress-percent info">65%</p>
              </div>
              <div class="progress-bar-container">
                <div class="progress-bar-fill info" style="width: 65%"></div>
              </div>
            </div>
            <div class="subject-stats">
              <div class="stat-item">
                <i class="bi-book stat-icon"></i>
                <p class="stat-value">10</p>
                <span class="stat-label">missões</span>
              </div>
              <div class="stat-item">
                <i class="bi-people stat-icon"></i>
                <p class="stat-value">34</p>
                <span class="stat-label">alunos</span>
              </div>
            </div>
          </div>
          
          <div class="subject-card interactive-card" tabindex="0">
            <div class="subject-header">
              <div class="subject-icon-container warning">
                <i class="bi-clock-history"></i>
              </div>
              <div class="subject-info">
                <h3 class="subject-name">História</h3>
                <p class="subject-description">5º Ano EF</p>
              </div>
            </div>
            <div class="subject-progress">
              <div class="progress-label">
                <p class="progress-text">Progresso</p>
                <p class="progress-percent warning">58%</p>
              </div>
              <div class="progress-bar-container">
                <div class="progress-bar-fill warning" style="width: 58%"></div>
              </div>
            </div>
            <div class="subject-stats">
              <div class="stat-item">
                <i class="bi-book stat-icon"></i>
                <p class="stat-value">8</p>
                <span class="stat-label">missões</span>
              </div>
              <div class="stat-item">
                <i class="bi-people stat-icon"></i>
                <p class="stat-value">34</p>
                <span class="stat-label">alunos</span>
              </div>
            </div>
          </div>
          
          <div class="subject-card interactive-card" tabindex="0">
            <div class="subject-header">
              <div class="subject-icon-container danger">
                <i class="bi-globe"></i>
              </div>
              <div class="subject-info">
                <h3 class="subject-name">Geografia</h3>
                <p class="subject-description">5º Ano EF</p>
              </div>
            </div>
            <div class="subject-progress">
              <div class="progress-label">
                <p class="progress-text">Progresso</p>
                <p class="progress-percent danger">42%</p>
              </div>
              <div class="progress-bar-container">
                <div class="progress-bar-fill danger" style="width: 42%"></div>
              </div>
            </div>
            <div class="subject-stats">
              <div class="stat-item">
                <i class="bi-book stat-icon"></i>
                <p class="stat-value">6</p>
                <span class="stat-label">missões</span>
              </div>
              <div class="stat-item">
                <i class="bi-people stat-icon"></i>
                <p class="stat-value">34</p>
                <span class="stat-label">alunos</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    \`;
  }
}`,...(R=(Q=b.parameters)==null?void 0:Q.docs)==null?void 0:R.source}}};var K,U,X;u.parameters={...u.parameters,docs:{...(K=u.parameters)==null?void 0:K.docs,source:{originalSource:`{
  render: () => \`
    <style>
      \${componentStyles}
      .loading-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
        gap: 24px;
      }
    </style>
    <div class="loading-grid">
      <div class="subject-skeleton">
        <div class="skeleton-header">
          <div class="skeleton-icon-subject"></div>
          <div class="skeleton-info">
            <div class="skeleton-name"></div>
            <div class="skeleton-description"></div>
          </div>
        </div>
        <div class="skeleton-progress"></div>
        <div class="skeleton-stats">
          <div class="skeleton-stat"></div>
          <div class="skeleton-stat"></div>
        </div>
      </div>
      
      <div class="subject-skeleton">
        <div class="skeleton-header">
          <div class="skeleton-icon-subject"></div>
          <div class="skeleton-info">
            <div class="skeleton-name"></div>
            <div class="skeleton-description"></div>
          </div>
        </div>
        <div class="skeleton-progress"></div>
        <div class="skeleton-stats">
          <div class="skeleton-stat"></div>
          <div class="skeleton-stat"></div>
        </div>
      </div>
      
      <div class="subject-skeleton">
        <div class="skeleton-header">
          <div class="skeleton-icon-subject"></div>
          <div class="skeleton-info">
            <div class="skeleton-name"></div>
            <div class="skeleton-description"></div>
          </div>
        </div>
        <div class="skeleton-progress"></div>
        <div class="skeleton-stats">
          <div class="skeleton-stat"></div>
          <div class="skeleton-stat"></div>
        </div>
      </div>
    </div>
  \`
}`,...(X=(U=u.parameters)==null?void 0:U.docs)==null?void 0:X.source}}};const ss=["Default","AllSubjects","WithProgress","WithCounts","Clickable","Hover","Disabled","ListaDisciplinas","DashboardProfessor","SelecionarMateria","InteractiveGrid","LoadingSkeleton"];export{t as AllSubjects,l as Clickable,p as DashboardProfessor,e as Default,d as Disabled,r as Hover,b as InteractiveGrid,o as ListaDisciplinas,u as LoadingSkeleton,v as SelecionarMateria,n as WithCounts,c as WithProgress,ss as __namedExportsOrder,Z as default};
