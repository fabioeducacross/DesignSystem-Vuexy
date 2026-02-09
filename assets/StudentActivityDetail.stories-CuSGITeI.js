const ii={title:"Educacross Components V2/Feedback/StudentActivityDetail",tags:["autodocs"],parameters:{docs:{description:{component:`
# StudentActivityDetail

Visualização **detalhada de atividade** do aluno com estatísticas, grid de questões, timeline de progresso e feedback do professor.

## Quando usar

- ✅ Visualização de resultado de missão concluída
- ✅ Análise de desempenho por tipo de questão
- ✅ Timeline de tentativas e pausas
- ✅ Feedback do professor para aluno
- ✅ Comparação com média da turma
- ✅ Acompanhamento de atividade em progresso

## Variantes

- **Default**: Header + 4 stats (nota, questões, acerto, tempo)
- **ComQuestoes**: Grid 15 questões com cores por status + legenda
- **ComTimeline**: Histórico com dots coloridos + connecting lines
- **ComDetalhamento**: Breakdown por tipo (Múltipla Escolha, V/F, Dissertativa)
- **ComFeedback**: Feedback professora + pontos fortes/melhorar
- **EmProgresso**: Badge "60% Concluído" + progress bar gradient
- **Vazio**: SVG empty state + mensagem "Atividade não iniciada"
- **Comparacao**: Grid 2 colunas (aluno vs. média turma)

## Características visuais

- **Status badges**: Concluída (green), Em Progresso (cyan), status customizáveis
- **Stats cards**: 32px value, grid auto-fit minmax(150px, 1fr)
- **Question boxes**: 48×48px, colors por status (correct green, partial orange, incorrect red)
- **Timeline dots**: 12×12px circle, border 3px white, shadow 2px colored
- **Progress bars**: 6px altura subjects, 12px altura overall progress
        `}}}},t=`<style>
.activity-detail {
  background: #fff;
  border: 1px solid #D8D6DE;
  border-radius: 8px;
  padding: 24px;
}

.activity-header {
  display: flex;
  justify-content: space-between;
  align-items: start;
  margin-bottom: 24px;
  padding-bottom: 20px;
  border-bottom: 2px solid #E8E8E8;
}

.activity-title {
  font-size: 24px;
  font-weight: 700;
  color: #5E5873;
  margin: 0 0 8px;
}

.activity-meta {
  font-size: 14px;
  color: #6E6B7B;
}

.activity-badge {
  padding: 6px 14px;
  border-radius: 20px;
  font-size: 13px;
  font-weight: 600;
  white-space: nowrap;
}

.activity-section {
  margin-bottom: 24px;
}

.section-title {
  font-size: 16px;
  font-weight: 600;
  color: #5E5873;
  margin: 0 0 12px;
}

.activity-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 16px;
}

.stat-card {
  padding: 16px;
  background: #F8F8F8;
  border-radius: 8px;
  text-align: center;
}

.stat-card-value {
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 6px;
}

.stat-card-label {
  font-size: 13px;
  color: #6E6B7B;
}

.activity-timeline {
  position: relative;
  padding-left: 32px;
}

.timeline-item {
  position: relative;
  padding-bottom: 24px;
}

.timeline-item:last-child {
  padding-bottom: 0;
}

.timeline-dot {
  position: absolute;
  left: -32px;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: 3px solid #fff;
  box-shadow: 0 0 0 2px;
}

.timeline-line {
  position: absolute;
  left: -27px;
  top: 12px;
  bottom: -12px;
  width: 2px;
  background: #E8E8E8;
}

.timeline-item:last-child .timeline-line {
  display: none;
}

.timeline-content {
  background: #F8F8F8;
  padding: 12px;
  border-radius: 6px;
}

.question-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 12px;
}

.question-box {
  width: 48px;
  height: 48px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 16px;
  cursor: pointer;
  transition: transform 0.2s;
}

.question-box:hover {
  transform: scale(1.05);
}

.progress-bar-container {
  background: #E8E8E8;
  height: 6px;
  border-radius: 3px;
  overflow: hidden;
}

.progress-bar {
  height: 100%;
  transition: width 0.3s ease;
}

.feedback-section {
  background: #FFF8E1;
  border-left: 4px solid #FF9F43;
  padding: 16px;
  border-radius: 6px;
}

.teacher-avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
}

.point-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
  border-radius: 6px;
  margin-bottom: 8px;
}

.point-item:last-child {
  margin-bottom: 0;
}
</style>`,s={render:()=>`
    ${t}
    <div class="activity-detail">
      <div class="activity-header">
        <div>
          <h1 class="activity-title">Missão: Frações Básicas</h1>
          <div class="activity-meta">
            <i class="bi bi-calendar3"></i> Iniciada em 05/02/2026 • <i class="bi bi-clock"></i> 2h 15min
          </div>
        </div>
        <span class="activity-badge" style="background: #E8F5E9; color: #28C76F">
          <i class="bi bi-check-circle-fill"></i> Concluída
        </span>
      </div>
      
      <div class="activity-stats">
        <div class="stat-card">
          <div class="stat-card-value" style="color: #28C76F">8.5</div>
          <div class="stat-card-label">Nota Final</div>
        </div>
        <div class="stat-card">
          <div class="stat-card-value" style="color: #6E63E8">12/15</div>
          <div class="stat-card-label">Questões Certas</div>
        </div>
        <div class="stat-card">
          <div class="stat-card-value" style="color: #FF9F43">85%</div>
          <div class="stat-card-label">Taxa de Acerto</div>
        </div>
        <div class="stat-card">
          <div class="stat-card-value" style="color: #00CFE8">2h 15m</div>
          <div class="stat-card-label">Tempo Total</div>
        </div>
      </div>
    </div>
  `},e={render:()=>`
    ${t}
    <div class="activity-detail">
      <div class="activity-header">
        <div>
          <h1 class="activity-title">Operações com Frações</h1>
          <div class="activity-meta">João Silva • 5º Ano A</div>
        </div>
        <span class="activity-badge" style="background: #E8F5E9; color: #28C76F">Completa</span>
      </div>
      
      <div class="activity-section">
        <h3 class="section-title">Desempenho por Questão</h3>
        <div class="question-grid">
          ${Array(15).fill(0).map((i,a)=>{const v=["correct","correct","partial","incorrect","correct","correct","correct","partial","correct","correct","incorrect","correct","correct","correct","partial"][a],Y={correct:"#E8F5E9",partial:"#FFF8E1",incorrect:"#FFEBEE"},Z={correct:"#28C76F",partial:"#FF9F43",incorrect:"#EA5455"};return`
              <div class="question-box" style="background: ${Y[v]}; color: ${Z[v]}" 
                   title="Questão ${a+1}: ${v==="correct"?"Correta":v==="partial"?"Parcial":"Incorreta"}">
                ${a+1}
              </div>
            `}).join("")}
        </div>
        
        <div style="margin-top: 16px; display: flex; gap: 16px; font-size: 13px">
          <div style="display: flex; align-items: center; gap: 6px">
            <div style="width: 16px; height: 16px; background: #E8F5E9; border-radius: 3px"></div>
            <span>12 Corretas</span>
          </div>
          <div style="display: flex; align-items: center; gap: 6px">
            <div style="width: 16px; height: 16px; background: #FFF8E1; border-radius: 3px"></div>
            <span>2 Parciais</span>
          </div>
          <div style="display: flex; align-items: center; gap: 6px">
            <div style="width: 16px; height: 16px; background: #FFEBEE; border-radius: 3px"></div>
            <span>1 Incorreta</span>
          </div>
        </div>
      </div>
    </div>
  `},o={render:()=>`
    ${t}
    <div class="activity-detail">
      <div class="activity-header">
        <div>
          <h1 class="activity-title">Verbos e Conjugações</h1>
          <div class="activity-meta">Ana Costa • 5º Ano A</div>
        </div>
        <span class="activity-badge" style="background: #E0F7FA; color: #00CFE8">
          <i class="bi bi-hourglass-split"></i> Em Progresso
        </span>
      </div>
      
      <div class="activity-section">
        <h3 class="section-title">Histórico de Tentativas</h3>
        <div class="activity-timeline">
          ${[{t:"10:45",a:"Iniciou a missão",d:"Primeira tentativa",c:"#6E63E8"},{t:"11:30",a:"Completou 8 questões",d:"Taxa de acerto: 87%",c:"#28C76F"},{t:"12:15",a:"Pausa para intervalo",d:"45 minutos",c:"#FF9F43"},{t:"13:00",a:"Retomou atividade",d:"Questões 9-15",c:"#6E63E8"}].map((i,a)=>`
            <div class="timeline-item">
              <div class="timeline-dot" style="background: ${i.c}; box-shadow: 0 0 0 2px ${i.c}"></div>
              <div class="timeline-line"></div>
              <div style="display: flex; justify-content: space-between; margin-bottom: 6px">
                <span style="font-size: 14px; font-weight: 600; color: #5E5873">${i.a}</span>
                <span style="font-size: 12px; color: #6E6B7B">${i.t}</span>
              </div>
              <div class="timeline-content">
                <div style="font-size: 13px; color: #6E6B7B">${i.d}</div>
              </div>
            </div>
          `).join("")}
        </div>
      </div>
    </div>
  `},n={render:()=>`
    ${t}
    <div class="activity-detail" style="max-width: 800px">
      <div class="activity-header">
        <div>
          <h1 class="activity-title">Ciclo da Água</h1>
          <div class="activity-meta">Bruno Oliveira • 5º Ano B • Ciências</div>
        </div>
        <span class="activity-badge" style="background: #E8F5E9; color: #28C76F">9.2/10</span>
      </div>
      
      <div class="activity-stats">
        ${[{l:"Nota",v:"9.2",c:"#28C76F"},{l:"Acertos",v:"10/12",c:"#6E63E8"},{l:"Tempo",v:"1h 45m",c:"#FF9F43"},{l:"Tentativa",v:"1ª",c:"#00CFE8"}].map(i=>`
          <div class="stat-card">
            <div class="stat-card-value" style="color: ${i.c}">${i.v}</div>
            <div class="stat-card-label">${i.l}</div>
          </div>
        `).join("")}
      </div>
      
      <div class="activity-section">
        <h3 class="section-title">Detalhamento por Tipo</h3>
        <div style="display: flex; flex-direction: column; gap: 12px">
          ${[{t:"Múltipla Escolha",c:8,e:0,p:0,total:8,icon:"bi-list-check",color:"#28C76F"},{t:"Verdadeiro ou Falso",c:2,e:1,p:0,total:3,icon:"bi-toggle-on",color:"#FF9F43"},{t:"Dissertativa",c:0,e:0,p:1,total:1,icon:"bi-file-text",color:"#00CFE8"}].map(i=>`
            <div style="padding: 16px; background: #F8F8F8; border-radius: 8px">
              <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px">
                <div style="display: flex; align-items: center; gap: 10px">
                  <i class="bi ${i.icon}" style="font-size: 20px; color: ${i.color}"></i>
                  <span style="font-weight: 600; color: #5E5873">${i.t}</span>
                </div>
                <span style="font-size: 14px; color: #6E6B7B">${i.c+i.e+i.p}/${i.total} questões</span>
              </div>
              <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; text-align: center">
                ${[{l:"Corretas",v:i.c,c:"#28C76F"},{l:"Incorretas",v:i.e,c:"#EA5455"},{l:"Parciais",v:i.p,c:"#FF9F43"}].map(a=>`
                  <div>
                    <div style="font-size: 20px; font-weight: 700; color: ${a.c}">${a.v}</div>
                    <div style="font-size: 11px; color: #6E6B7B">${a.l}</div>
                  </div>
                `).join("")}
              </div>
            </div>
          `).join("")}
        </div>
      </div>
    </div>
  `},d={render:()=>`
    ${t}
    <div class="activity-detail" style="max-width: 700px">
      <div class="activity-header">
        <div>
          <h1 class="activity-title">Geografia do Brasil</h1>
          <div class="activity-meta">Diana Santos • 5º Ano A</div>
        </div>
        <span class="activity-badge" style="background: #FFF8E1; color: #FF9F43">7.5/10</span>
      </div>
      
      <div class="activity-section">
        <h3 class="section-title">Feedback da Professora</h3>
        <div class="feedback-section">
          <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 12px">
            <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40'%3E%3Ccircle fill='%23FF9F43' cx='20' cy='20' r='20'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='white' font-size='16' font-weight='bold'%3EMS%3C/text%3E%3C/svg%3E" 
                 class="teacher-avatar">
            <div>
              <div style="font-weight: 600; color: #5E5873">Prof. Maria Silva</div>
              <div style="font-size: 12px; color: #6E6B7B">08/02/2026 às 14:30</div>
            </div>
          </div>
          <p style="margin: 0; font-size: 14px; line-height: 1.6; color: #5E5873">
            Bom trabalho, Diana! Você demonstrou compreensão dos conceitos principais, mas precisa revisar as regiões geográficas. 
            Recomendo estudar os mapas com mais atenção. Continue assim!
          </p>
        </div>
      </div>
      
      <div class="activity-section">
        <h3 class="section-title">Pontos de Melhoria</h3>
        <div>
          ${["Revisar localização das capitais (3 erros)","Estudar biomas brasileiros (2 erros)","Praticar interpretação de mapas"].map(i=>`
            <div class="point-item" style="background: #F8F8F8">
              <i class="bi bi-exclamation-circle" style="color: #FF9F43; font-size: 18px"></i>
              <span style="font-size: 14px; color: #5E5873">${i}</span>
            </div>
          `).join("")}
        </div>
      </div>
    </div>
  `},c={render:()=>`
    ${t}
    <div class="activity-detail">
      <div class="activity-header">
        <div>
          <h1 class="activity-title">Sistema Solar</h1>
          <div class="activity-meta">Eduardo Lima • 5º Ano B • Ciências</div>
        </div>
        <span class="activity-badge" style="background: #E3F2FD; color: #00CFE8">
          <i class="bi bi-play-circle"></i> 60% Concluído
        </span>
      </div>
      
      <div class="activity-stats">
        <div class="stat-card">
          <div class="stat-card-value" style="color: #00CFE8">9/15</div>
          <div class="stat-card-label">Questões</div>
        </div>
        <div class="stat-card">
          <div class="stat-card-value" style="color: #28C76F">88%</div>
          <div class="stat-card-label">Acerto até agora</div>
        </div>
        <div class="stat-card">
          <div class="stat-card-value" style="color: #6E63E8">45min</div>
          <div class="stat-card-label">Tempo decorrido</div>
        </div>
        <div class="stat-card">
          <div class="stat-card-value" style="color: #FF9F43">6</div>
          <div class="stat-card-label">Restantes</div>
        </div>
      </div>
      
      <div class="activity-section">
        <h3 class="section-title">Progresso</h3>
        <div style="margin-bottom: 12px; display: flex; justify-content: space-between; font-size: 14px">
          <span style="color: #5E5873; font-weight: 600">9 de 15 questões</span>
          <span style="color: #00CFE8; font-weight: 700">60%</span>
        </div>
        <div style="background: #E8E8E8; height: 12px; border-radius: 6px; overflow: hidden">
          <div style="width: 60%; height: 100%; background: linear-gradient(90deg, #00CFE8, #6E63E8); transition: 0.3s"></div>
        </div>
      </div>
    </div>
  `},r={render:()=>`
    ${t}
    <div class="activity-detail" style="min-height: 400px; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center">
      <svg viewBox="0 0 24 24" width="120" height="120" fill="none" stroke="currentColor" stroke-width="1.5" style="opacity: 0.3; margin-bottom: 24px">
        <rect x="3" y="3" width="18" height="18" rx="2"/>
        <path d="M3 9h18M9 21V9"/>
      </svg>
      <h3 style="margin: 0 0 12px; font-size: 20px; font-weight: 600; color: #5E5873">Atividade não iniciada</h3>
      <p style="margin: 0; font-size: 14px; color: #6E6B7B; max-width: 400px">
        O aluno ainda não começou esta atividade. Aguarde o início para visualizar os detalhes.
      </p>
    </div>
  `},l={render:()=>`
    ${t}
    <div class="activity-detail" style="max-width: 800px">
      <div class="activity-header">
        <div>
          <h1 class="activity-title">Comparação de Desempenho</h1>
          <div class="activity-meta">Fernanda Costa vs. Média da Turma</div>
        </div>
      </div>
      
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px">
        <div>
          <h4 style="margin: 0 0 12px; font-size: 14px; font-weight: 600; color: #5E5873">Fernanda Costa</h4>
          <div class="activity-stats" style="grid-template-columns: 1fr">
            <div class="stat-card">
              <div class="stat-card-value" style="color: #28C76F">9.5</div>
              <div class="stat-card-label">Nota</div>
            </div>
            <div class="stat-card">
              <div class="stat-card-value" style="color: #6E63E8">95%</div>
              <div class="stat-card-label">Acerto</div>
            </div>
            <div class="stat-card">
              <div class="stat-card-value" style="color: #00CFE8">1h 30m</div>
              <div class="stat-card-label">Tempo</div>
            </div>
          </div>
        </div>
        
        <div>
          <h4 style="margin: 0 0 12px; font-size: 14px; font-weight: 600; color: #5E5873">Média da Turma</h4>
          <div class="activity-stats" style="grid-template-columns: 1fr">
            <div class="stat-card">
              <div class="stat-card-value" style="color: #FF9F43">7.8</div>
              <div class="stat-card-label">Nota</div>
            </div>
            <div class="stat-card">
              <div class="stat-card-value" style="color: #6E63E8">78%</div>
              <div class="stat-card-label">Acerto</div>
            </div>
            <div class="stat-card">
              <div class="stat-card-value" style="color: #00CFE8">2h 15m</div>
              <div class="stat-card-label">Tempo</div>
            </div>
          </div>
        </div>
      </div>
      
      <div style="margin-top: 20px; padding: 16px; background: #E8F5E9; border-radius: 8px; text-align: center">
        <i class="bi bi-trophy-fill" style="font-size: 32px; color: #FFD700; margin-bottom: 8px"></i>
        <div style="font-size: 16px; font-weight: 700; color: #28C76F">Desempenho Acima da Média!</div>
        <div style="font-size: 13px; color: #6E6B7B; margin-top: 4px">+1.7 pontos • 45 minutos mais rápido</div>
      </div>
    </div>
  `};var p,m,x,y,u;s.parameters={...s.parameters,docs:{...(p=s.parameters)==null?void 0:p.docs,source:{originalSource:`{
  render: () => \`
    \${styles}
    <div class="activity-detail">
      <div class="activity-header">
        <div>
          <h1 class="activity-title">Missão: Frações Básicas</h1>
          <div class="activity-meta">
            <i class="bi bi-calendar3"></i> Iniciada em 05/02/2026 • <i class="bi bi-clock"></i> 2h 15min
          </div>
        </div>
        <span class="activity-badge" style="background: #E8F5E9; color: #28C76F">
          <i class="bi bi-check-circle-fill"></i> Concluída
        </span>
      </div>
      
      <div class="activity-stats">
        <div class="stat-card">
          <div class="stat-card-value" style="color: #28C76F">8.5</div>
          <div class="stat-card-label">Nota Final</div>
        </div>
        <div class="stat-card">
          <div class="stat-card-value" style="color: #6E63E8">12/15</div>
          <div class="stat-card-label">Questões Certas</div>
        </div>
        <div class="stat-card">
          <div class="stat-card-value" style="color: #FF9F43">85%</div>
          <div class="stat-card-label">Taxa de Acerto</div>
        </div>
        <div class="stat-card">
          <div class="stat-card-value" style="color: #00CFE8">2h 15m</div>
          <div class="stat-card-label">Tempo Total</div>
        </div>
      </div>
    </div>
  \`
}`,...(x=(m=s.parameters)==null?void 0:m.docs)==null?void 0:x.source},description:{story:`Story: Default

Header "Missão: Frações Básicas" + badge verde "Concluída" + 4 stats (8.5, 12/15, 85%, 2h 15min).

Educational context: Aluno visualizando resumo de missão concluída.`,...(u=(y=s.parameters)==null?void 0:y.docs)==null?void 0:u.description}}};var g,h,E,F,b;e.parameters={...e.parameters,docs:{...(g=e.parameters)==null?void 0:g.docs,source:{originalSource:`{
  render: () => \`
    \${styles}
    <div class="activity-detail">
      <div class="activity-header">
        <div>
          <h1 class="activity-title">Operações com Frações</h1>
          <div class="activity-meta">João Silva • 5º Ano A</div>
        </div>
        <span class="activity-badge" style="background: #E8F5E9; color: #28C76F">Completa</span>
      </div>
      
      <div class="activity-section">
        <h3 class="section-title">Desempenho por Questão</h3>
        <div class="question-grid">
          \${Array(15).fill(0).map((_, i) => {
    const status = ['correct', 'correct', 'partial', 'incorrect', 'correct', 'correct', 'correct', 'partial', 'correct', 'correct', 'incorrect', 'correct', 'correct', 'correct', 'partial'][i];
    const colors = {
      correct: '#E8F5E9',
      partial: '#FFF8E1',
      incorrect: '#FFEBEE'
    };
    const textColors = {
      correct: '#28C76F',
      partial: '#FF9F43',
      incorrect: '#EA5455'
    };
    return \`
              <div class="question-box" style="background: \${colors[status]}; color: \${textColors[status]}" 
                   title="Questão \${i + 1}: \${status === 'correct' ? 'Correta' : status === 'partial' ? 'Parcial' : 'Incorreta'}">
                \${i + 1}
              </div>
            \`;
  }).join('')}
        </div>
        
        <div style="margin-top: 16px; display: flex; gap: 16px; font-size: 13px">
          <div style="display: flex; align-items: center; gap: 6px">
            <div style="width: 16px; height: 16px; background: #E8F5E9; border-radius: 3px"></div>
            <span>12 Corretas</span>
          </div>
          <div style="display: flex; align-items: center; gap: 6px">
            <div style="width: 16px; height: 16px; background: #FFF8E1; border-radius: 3px"></div>
            <span>2 Parciais</span>
          </div>
          <div style="display: flex; align-items: center; gap: 6px">
            <div style="width: 16px; height: 16px; background: #FFEBEE; border-radius: 3px"></div>
            <span>1 Incorreta</span>
          </div>
        </div>
      </div>
    </div>
  \`
}`,...(E=(h=e.parameters)==null?void 0:h.docs)==null?void 0:E.source},description:{story:`Story: ComQuestoes

Grid 15 questões coloridas por status (12 corretas verdes, 2 parciais laranjas, 1 incorreta vermelha) + legenda.

Educational context: Professor analisando quais questões o aluno acertou/errou.`,...(b=(F=e.parameters)==null?void 0:F.docs)==null?void 0:b.description}}};var f,C,w,$,k;o.parameters={...o.parameters,docs:{...(f=o.parameters)==null?void 0:f.docs,source:{originalSource:`{
  render: () => \`
    \${styles}
    <div class="activity-detail">
      <div class="activity-header">
        <div>
          <h1 class="activity-title">Verbos e Conjugações</h1>
          <div class="activity-meta">Ana Costa • 5º Ano A</div>
        </div>
        <span class="activity-badge" style="background: #E0F7FA; color: #00CFE8">
          <i class="bi bi-hourglass-split"></i> Em Progresso
        </span>
      </div>
      
      <div class="activity-section">
        <h3 class="section-title">Histórico de Tentativas</h3>
        <div class="activity-timeline">
          \${[{
    t: '10:45',
    a: 'Iniciou a missão',
    d: 'Primeira tentativa',
    c: '#6E63E8'
  }, {
    t: '11:30',
    a: 'Completou 8 questões',
    d: 'Taxa de acerto: 87%',
    c: '#28C76F'
  }, {
    t: '12:15',
    a: 'Pausa para intervalo',
    d: '45 minutos',
    c: '#FF9F43'
  }, {
    t: '13:00',
    a: 'Retomou atividade',
    d: 'Questões 9-15',
    c: '#6E63E8'
  }].map((item, i) => \`
            <div class="timeline-item">
              <div class="timeline-dot" style="background: \${item.c}; box-shadow: 0 0 0 2px \${item.c}"></div>
              <div class="timeline-line"></div>
              <div style="display: flex; justify-content: space-between; margin-bottom: 6px">
                <span style="font-size: 14px; font-weight: 600; color: #5E5873">\${item.a}</span>
                <span style="font-size: 12px; color: #6E6B7B">\${item.t}</span>
              </div>
              <div class="timeline-content">
                <div style="font-size: 13px; color: #6E6B7B">\${item.d}</div>
              </div>
            </div>
          \`).join('')}
        </div>
      </div>
    </div>
  \`
}`,...(w=(C=o.parameters)==null?void 0:C.docs)==null?void 0:w.source},description:{story:`Story: ComTimeline

Badge "Em Progresso" cyan + timeline 4 eventos com dots coloridos e connecting lines.

Educational context: Sistema mostrando histórico de tentativas e pausas do aluno.`,...(k=($=o.parameters)==null?void 0:$.docs)==null?void 0:k.description}}};var z,A,B,D,S;n.parameters={...n.parameters,docs:{...(z=n.parameters)==null?void 0:z.docs,source:{originalSource:`{
  render: () => \`
    \${styles}
    <div class="activity-detail" style="max-width: 800px">
      <div class="activity-header">
        <div>
          <h1 class="activity-title">Ciclo da Água</h1>
          <div class="activity-meta">Bruno Oliveira • 5º Ano B • Ciências</div>
        </div>
        <span class="activity-badge" style="background: #E8F5E9; color: #28C76F">9.2/10</span>
      </div>
      
      <div class="activity-stats">
        \${[{
    l: 'Nota',
    v: '9.2',
    c: '#28C76F'
  }, {
    l: 'Acertos',
    v: '10/12',
    c: '#6E63E8'
  }, {
    l: 'Tempo',
    v: '1h 45m',
    c: '#FF9F43'
  }, {
    l: 'Tentativa',
    v: '1ª',
    c: '#00CFE8'
  }].map(s => \`
          <div class="stat-card">
            <div class="stat-card-value" style="color: \${s.c}">\${s.v}</div>
            <div class="stat-card-label">\${s.l}</div>
          </div>
        \`).join('')}
      </div>
      
      <div class="activity-section">
        <h3 class="section-title">Detalhamento por Tipo</h3>
        <div style="display: flex; flex-direction: column; gap: 12px">
          \${[{
    t: 'Múltipla Escolha',
    c: 8,
    e: 0,
    p: 0,
    total: 8,
    icon: 'bi-list-check',
    color: '#28C76F'
  }, {
    t: 'Verdadeiro ou Falso',
    c: 2,
    e: 1,
    p: 0,
    total: 3,
    icon: 'bi-toggle-on',
    color: '#FF9F43'
  }, {
    t: 'Dissertativa',
    c: 0,
    e: 0,
    p: 1,
    total: 1,
    icon: 'bi-file-text',
    color: '#00CFE8'
  }].map(q => \`
            <div style="padding: 16px; background: #F8F8F8; border-radius: 8px">
              <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px">
                <div style="display: flex; align-items: center; gap: 10px">
                  <i class="bi \${q.icon}" style="font-size: 20px; color: \${q.color}"></i>
                  <span style="font-weight: 600; color: #5E5873">\${q.t}</span>
                </div>
                <span style="font-size: 14px; color: #6E6B7B">\${q.c + q.e + q.p}/\${q.total} questões</span>
              </div>
              <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; text-align: center">
                \${[{
    l: 'Corretas',
    v: q.c,
    c: '#28C76F'
  }, {
    l: 'Incorretas',
    v: q.e,
    c: '#EA5455'
  }, {
    l: 'Parciais',
    v: q.p,
    c: '#FF9F43'
  }].map(s => \`
                  <div>
                    <div style="font-size: 20px; font-weight: 700; color: \${s.c}">\${s.v}</div>
                    <div style="font-size: 11px; color: #6E6B7B">\${s.l}</div>
                  </div>
                \`).join('')}
              </div>
            </div>
          \`).join('')}
        </div>
      </div>
    </div>
  \`
}`,...(B=(A=n.parameters)==null?void 0:A.docs)==null?void 0:B.source},description:{story:`Story: ComDetalhamento

4 stats + breakdown por tipo de questão (Múltipla Escolha 8/8, V/F 2/3, Dissertativa 0/1).
Grid 3 colunas mostrando corretas/incorretas/parciais por tipo.

Educational context: Professor analisando desempenho por tipo de questão.`,...(S=(D=n.parameters)==null?void 0:D.docs)==null?void 0:S.description}}};var T,P,j,q,M;d.parameters={...d.parameters,docs:{...(T=d.parameters)==null?void 0:T.docs,source:{originalSource:`{
  render: () => \`
    \${styles}
    <div class="activity-detail" style="max-width: 700px">
      <div class="activity-header">
        <div>
          <h1 class="activity-title">Geografia do Brasil</h1>
          <div class="activity-meta">Diana Santos • 5º Ano A</div>
        </div>
        <span class="activity-badge" style="background: #FFF8E1; color: #FF9F43">7.5/10</span>
      </div>
      
      <div class="activity-section">
        <h3 class="section-title">Feedback da Professora</h3>
        <div class="feedback-section">
          <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 12px">
            <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40'%3E%3Ccircle fill='%23FF9F43' cx='20' cy='20' r='20'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='white' font-size='16' font-weight='bold'%3EMS%3C/text%3E%3C/svg%3E" 
                 class="teacher-avatar">
            <div>
              <div style="font-weight: 600; color: #5E5873">Prof. Maria Silva</div>
              <div style="font-size: 12px; color: #6E6B7B">08/02/2026 às 14:30</div>
            </div>
          </div>
          <p style="margin: 0; font-size: 14px; line-height: 1.6; color: #5E5873">
            Bom trabalho, Diana! Você demonstrou compreensão dos conceitos principais, mas precisa revisar as regiões geográficas. 
            Recomendo estudar os mapas com mais atenção. Continue assim!
          </p>
        </div>
      </div>
      
      <div class="activity-section">
        <h3 class="section-title">Pontos de Melhoria</h3>
        <div>
          \${['Revisar localização das capitais (3 erros)', 'Estudar biomas brasileiros (2 erros)', 'Praticar interpretação de mapas'].map(p => \`
            <div class="point-item" style="background: #F8F8F8">
              <i class="bi bi-exclamation-circle" style="color: #FF9F43; font-size: 18px"></i>
              <span style="font-size: 14px; color: #5E5873">\${p}</span>
            </div>
          \`).join('')}
        </div>
      </div>
    </div>
  \`
}`,...(j=(P=d.parameters)==null?void 0:P.docs)==null?void 0:j.source},description:{story:`Story: ComFeedback

Badge nota 7.5/10 laranja + feedback professora com avatar + pontos fortes (3 verdes) + pontos a melhorar (3 vermelhos).

Educational context: Professor fornecendo feedback detalhado para aluno.`,...(M=(q=d.parameters)==null?void 0:q.docs)==null?void 0:M.description}}};var V,Q,I,G,N;c.parameters={...c.parameters,docs:{...(V=c.parameters)==null?void 0:V.docs,source:{originalSource:`{
  render: () => \`
    \${styles}
    <div class="activity-detail">
      <div class="activity-header">
        <div>
          <h1 class="activity-title">Sistema Solar</h1>
          <div class="activity-meta">Eduardo Lima • 5º Ano B • Ciências</div>
        </div>
        <span class="activity-badge" style="background: #E3F2FD; color: #00CFE8">
          <i class="bi bi-play-circle"></i> 60% Concluído
        </span>
      </div>
      
      <div class="activity-stats">
        <div class="stat-card">
          <div class="stat-card-value" style="color: #00CFE8">9/15</div>
          <div class="stat-card-label">Questões</div>
        </div>
        <div class="stat-card">
          <div class="stat-card-value" style="color: #28C76F">88%</div>
          <div class="stat-card-label">Acerto até agora</div>
        </div>
        <div class="stat-card">
          <div class="stat-card-value" style="color: #6E63E8">45min</div>
          <div class="stat-card-label">Tempo decorrido</div>
        </div>
        <div class="stat-card">
          <div class="stat-card-value" style="color: #FF9F43">6</div>
          <div class="stat-card-label">Restantes</div>
        </div>
      </div>
      
      <div class="activity-section">
        <h3 class="section-title">Progresso</h3>
        <div style="margin-bottom: 12px; display: flex; justify-content: space-between; font-size: 14px">
          <span style="color: #5E5873; font-weight: 600">9 de 15 questões</span>
          <span style="color: #00CFE8; font-weight: 700">60%</span>
        </div>
        <div style="background: #E8E8E8; height: 12px; border-radius: 6px; overflow: hidden">
          <div style="width: 60%; height: 100%; background: linear-gradient(90deg, #00CFE8, #6E63E8); transition: 0.3s"></div>
        </div>
      </div>
    </div>
  \`
}`,...(I=(Q=c.parameters)==null?void 0:Q.docs)==null?void 0:I.source},description:{story:`Story: EmProgresso

Badge "60% Concluído" cyan + 4 stats parciais + progress bar 12px com gradient cyan→roxo.

Educational context: Aluno visualizando progresso de missão ainda não finalizada.`,...(N=(G=c.parameters)==null?void 0:G.docs)==null?void 0:N.description}}};var R,O,H,_,J;r.parameters={...r.parameters,docs:{...(R=r.parameters)==null?void 0:R.docs,source:{originalSource:`{
  render: () => \`
    \${styles}
    <div class="activity-detail" style="min-height: 400px; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center">
      <svg viewBox="0 0 24 24" width="120" height="120" fill="none" stroke="currentColor" stroke-width="1.5" style="opacity: 0.3; margin-bottom: 24px">
        <rect x="3" y="3" width="18" height="18" rx="2"/>
        <path d="M3 9h18M9 21V9"/>
      </svg>
      <h3 style="margin: 0 0 12px; font-size: 20px; font-weight: 600; color: #5E5873">Atividade não iniciada</h3>
      <p style="margin: 0; font-size: 14px; color: #6E6B7B; max-width: 400px">
        O aluno ainda não começou esta atividade. Aguarde o início para visualizar os detalhes.
      </p>
    </div>
  \`
}`,...(H=(O=r.parameters)==null?void 0:O.docs)==null?void 0:H.source},description:{story:`Story: Vazio

SVG empty state (grid icon opacity 0.3) + mensagem "Atividade não iniciada".

Educational context: Sistema exibindo estado vazio quando aluno ainda não começou atividade.`,...(J=(_=r.parameters)==null?void 0:_.docs)==null?void 0:J.description}}};var L,K,U,W,X;l.parameters={...l.parameters,docs:{...(L=l.parameters)==null?void 0:L.docs,source:{originalSource:`{
  render: () => \`
    \${styles}
    <div class="activity-detail" style="max-width: 800px">
      <div class="activity-header">
        <div>
          <h1 class="activity-title">Comparação de Desempenho</h1>
          <div class="activity-meta">Fernanda Costa vs. Média da Turma</div>
        </div>
      </div>
      
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px">
        <div>
          <h4 style="margin: 0 0 12px; font-size: 14px; font-weight: 600; color: #5E5873">Fernanda Costa</h4>
          <div class="activity-stats" style="grid-template-columns: 1fr">
            <div class="stat-card">
              <div class="stat-card-value" style="color: #28C76F">9.5</div>
              <div class="stat-card-label">Nota</div>
            </div>
            <div class="stat-card">
              <div class="stat-card-value" style="color: #6E63E8">95%</div>
              <div class="stat-card-label">Acerto</div>
            </div>
            <div class="stat-card">
              <div class="stat-card-value" style="color: #00CFE8">1h 30m</div>
              <div class="stat-card-label">Tempo</div>
            </div>
          </div>
        </div>
        
        <div>
          <h4 style="margin: 0 0 12px; font-size: 14px; font-weight: 600; color: #5E5873">Média da Turma</h4>
          <div class="activity-stats" style="grid-template-columns: 1fr">
            <div class="stat-card">
              <div class="stat-card-value" style="color: #FF9F43">7.8</div>
              <div class="stat-card-label">Nota</div>
            </div>
            <div class="stat-card">
              <div class="stat-card-value" style="color: #6E63E8">78%</div>
              <div class="stat-card-label">Acerto</div>
            </div>
            <div class="stat-card">
              <div class="stat-card-value" style="color: #00CFE8">2h 15m</div>
              <div class="stat-card-label">Tempo</div>
            </div>
          </div>
        </div>
      </div>
      
      <div style="margin-top: 20px; padding: 16px; background: #E8F5E9; border-radius: 8px; text-align: center">
        <i class="bi bi-trophy-fill" style="font-size: 32px; color: #FFD700; margin-bottom: 8px"></i>
        <div style="font-size: 16px; font-weight: 700; color: #28C76F">Desempenho Acima da Média!</div>
        <div style="font-size: 13px; color: #6E6B7B; margin-top: 4px">+1.7 pontos • 45 minutos mais rápido</div>
      </div>
    </div>
  \`
}`,...(U=(K=l.parameters)==null?void 0:K.docs)==null?void 0:U.source},description:{story:`Story: Comparacao

Grid 2 colunas comparando Fernanda Costa (9.5, 95%, 1h30m) vs. Média da Turma (7.8, 78%, 2h15m).
Badge destaque "Desempenho Acima da Média!" com trophy icon.

Educational context: Sistema exibindo comparação de desempenho individual vs. turma.`,...(X=(W=l.parameters)==null?void 0:W.docs)==null?void 0:X.description}}};const ai=["Default","ComQuestoes","ComTimeline","ComDetalhamento","ComFeedback","EmProgresso","Vazio","Comparacao"];export{n as ComDetalhamento,d as ComFeedback,e as ComQuestoes,o as ComTimeline,l as Comparacao,s as Default,c as EmProgresso,r as Vazio,ai as __namedExportsOrder,ii as default};
