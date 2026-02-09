const s=`
<style>
.progress-container {
  padding: 16px;
  background: white;
  border: 1px solid #DBDADE;
  border-radius: 8px;
  margin-bottom: 16px;
}

.progress-label {
  font-size: 14px;
  font-weight: 600;
  color: #5D596C;
  margin-bottom: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.progress-title {
  flex-grow: 1;
}

.bg-progress-bar-danger {
  background: rgba(234, 84, 85, 0.12);
  padding: 12px;
  border-radius: 8px;
  margin-bottom: 16px;
}

.bg-progress-bar-warning {
  background: rgba(250, 184, 74, 0.12);
  padding: 12px;
  border-radius: 8px;
  margin-bottom: 16px;
}

.bg-progress-bar-success {
  background: rgba(40, 199, 111, 0.12);
  padding: 12px;
  border-radius: 8px;
  margin-bottom: 16px;
}

.progress {
  height: 5px;
  border-radius: 4px;
  background-color: #F3F2F7;
  overflow: visible;
  position: relative;
}

.progress-bar {
  border-radius: 4px;
  transition: width 0.3s ease;
  height: 100%;
}

.progress-bar.bg-primary {
  background-color: #6E63E8;
}

.progress-bar.bg-danger {
  background-color: #EA5455;
}

.progress-bar.bg-warning {
  background-color: #FAB84A;
}

.progress-bar.bg-success {
  background-color: #28C76F;
}

.progress-percentage {
  font-size: 14px;
  font-weight: 700;
  color: #5D596C;
}

.progress-grid {
  display: grid;
  gap: 16px;
  max-width: 600px;
}

.demo-container {
  padding: 24px;
  background: #F8F7FA;
  border-radius: 12px;
}

.demo-label {
  font-size: 13px;
  font-weight: 600;
  color: #6E6B7B;
  margin-bottom: 12px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.progress-tooltip {
  position: relative;
  display: inline-block;
  cursor: help;
}

.progress-tooltip:hover .tooltip-text {
  visibility: visible;
  opacity: 1;
}

.tooltip-text {
  visibility: hidden;
  width: 220px;
  background-color: #5D596C;
  color: #fff;
  text-align: center;
  border-radius: 6px;
  padding: 8px 12px;
  position: absolute;
  z-index: 1;
  bottom: 125%;
  left: 50%;
  margin-left: -110px;
  opacity: 0;
  transition: opacity 0.3s;
  font-size: 12px;
  font-weight: 400;
}

.tooltip-text::after {
  content: "";
  position: absolute;
  top: 100%;
  left: 50%;
  margin-left: -5px;
  border-width: 5px;
  border-style: solid;
  border-color: #5D596C transparent transparent transparent;
}

.subject-icon {
  font-size: 18px;
  margin-right: 8px;
  vertical-align: middle;
}

.mobile-viewport {
  max-width: 375px;
  margin: 0 auto;
}

@media (max-width: 767px) {
  .progress-container {
    padding: 12px;
  }

  .progress-label {
    flex-direction: column;
    align-items: flex-start;
    gap: 4px;
  }

  .progress-percentage {
    font-size: 13px;
  }

  .subject-icon {
    font-size: 16px;
  }
}
</style>
`,Q={title:"Educacross Components V2/Feedback/ProgressBarHorizontal",tags:["autodocs"],parameters:{docs:{description:{component:"Horizontal progress bar for mission/lesson completion with colored backgrounds and tooltips. Supports danger, warning, and success states with right-content slot for percentages."}}}},r={render:()=>`
    ${s}
    <div class="demo-container">
      <div class="demo-label">Barra de Progresso Padrão</div>
      <div class="progress-container">
        <div class="progress-label">
          <span class="progress-title">Progresso da Missão</span>
        </div>
        <div class="progress">
          <div class="progress-bar bg-primary" role="progressbar" style="width: 50%;" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
        </div>
      </div>
    </div>
  `},e={render:()=>`
    ${s}
    <div class="demo-container">
      <div class="demo-label">Estado de Alerta - Progresso Baixo</div>
      <div class="bg-progress-bar-danger">
        <div class="progress-container" style="margin-bottom: 0; border: none; padding: 0;">
          <div class="progress-label">
            <span class="progress-title">
              <i class="bi bi-exclamation-triangle subject-icon"></i>
              Apenas 3 de 20 questões respondidas
            </span>
          </div>
          <div class="progress">
            <div class="progress-bar bg-danger" role="progressbar" style="width: 15%;" aria-valuenow="15" aria-valuemin="0" aria-valuemax="100"></div>
          </div>
        </div>
      </div>
    </div>
  `},a={render:()=>`
    ${s}
    <div class="demo-container">
      <div class="demo-label">Estado de Atenção - Progresso Médio</div>
      <div class="bg-progress-bar-warning">
        <div class="progress-container" style="margin-bottom: 0; border: none; padding: 0;">
          <div class="progress-label">
            <span class="progress-title">
              <i class="bi bi-clock-history subject-icon"></i>
              9 de 20 alunos concluíram a atividade
            </span>
          </div>
          <div class="progress">
            <div class="progress-bar bg-warning" role="progressbar" style="width: 45%;" aria-valuenow="45" aria-valuemin="0" aria-valuemax="100"></div>
          </div>
        </div>
      </div>
    </div>
  `},i={render:()=>`
    ${s}
    <div class="demo-container">
      <div class="demo-label">Estado de Sucesso - Progresso Alto</div>
      <div class="bg-progress-bar-success">
        <div class="progress-container" style="margin-bottom: 0; border: none; padding: 0;">
          <div class="progress-label">
            <span class="progress-title">
              <i class="bi bi-check-circle subject-icon"></i>
              17 de 20 missões completas
            </span>
          </div>
          <div class="progress">
            <div class="progress-bar bg-success" role="progressbar" style="width: 85%;" aria-valuenow="85" aria-valuemin="0" aria-valuemax="100"></div>
          </div>
        </div>
      </div>
    </div>
  `},o={render:()=>`
    ${s}
    <div class="demo-container">
      <div class="demo-label">Barra com Porcentagem à Direita</div>
      <div class="progress-container">
        <div class="progress-label">
          <span class="progress-title">
            <i class="bi bi-book subject-icon"></i>
            Lições Completadas
          </span>
          <span class="progress-percentage">75%</span>
        </div>
        <div class="progress">
          <div class="progress-bar bg-primary" role="progressbar" style="width: 75%;" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"></div>
        </div>
      </div>
    </div>
  `},n={render:()=>`
    ${s}
    <div class="demo-container">
      <div class="demo-label">Barra com Tooltip Informativo</div>
      <div class="progress-container">
        <div class="progress-label">
          <span class="progress-title progress-tooltip">
            <i class="bi bi-graph-up subject-icon"></i>
            Desempenho Geral do Aluno
            <span class="tooltip-text">32 questões corretas de 40 tentadas. Média de acerto: 80%</span>
          </span>
          <span class="progress-percentage">80%</span>
        </div>
        <div class="progress">
          <div class="progress-bar bg-success" role="progressbar" style="width: 80%;" aria-valuenow="80" aria-valuemin="0" aria-valuemax="100"></div>
        </div>
      </div>
    </div>
  `},d={render:()=>`
    ${s}
    <div class="demo-container">
      <div class="demo-label">Múltiplas Barras de Progresso por Disciplina</div>
      <div class="progress-grid">
        <div class="bg-progress-bar-success">
          <div class="progress-container" style="margin-bottom: 0; border: none; padding: 0;">
            <div class="progress-label">
              <span class="progress-title">
                <i class="bi bi-calculator subject-icon"></i>
                Matemática - 18 de 20 exercícios
              </span>
              <span class="progress-percentage">90%</span>
            </div>
            <div class="progress">
              <div class="progress-bar bg-success" role="progressbar" style="width: 90%;" aria-valuenow="90" aria-valuemin="0" aria-valuemax="100"></div>
            </div>
          </div>
        </div>

        <div class="bg-progress-bar-warning">
          <div class="progress-container" style="margin-bottom: 0; border: none; padding: 0;">
            <div class="progress-label">
              <span class="progress-title">
                <i class="bi bi-journal-text subject-icon"></i>
                Língua Portuguesa - 13 de 20 exercícios
              </span>
              <span class="progress-percentage">65%</span>
            </div>
            <div class="progress">
              <div class="progress-bar bg-warning" role="progressbar" style="width: 65%;" aria-valuenow="65" aria-valuemin="0" aria-valuemax="100"></div>
            </div>
          </div>
        </div>

        <div class="bg-progress-bar-danger">
          <div class="progress-container" style="margin-bottom: 0; border: none; padding: 0;">
            <div class="progress-label">
              <span class="progress-title">
                <i class="bi bi-atom subject-icon"></i>
                Ciências - 8 de 20 exercícios
              </span>
              <span class="progress-percentage">40%</span>
            </div>
            <div class="progress">
              <div class="progress-bar bg-danger" role="progressbar" style="width: 40%;" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `},l={render:()=>`
    ${s}
    <div class="demo-container mobile-viewport">
      <div class="demo-label">Visualização Mobile (375px)</div>
      
      <div class="progress-container">
        <div class="progress-label">
          <span class="progress-title">
            <i class="bi bi-trophy subject-icon"></i>
            Missões Completadas
          </span>
          <span class="progress-percentage">72%</span>
        </div>
        <div class="progress">
          <div class="progress-bar bg-success" role="progressbar" style="width: 72%;" aria-valuenow="72" aria-valuemin="0" aria-valuemax="100"></div>
        </div>
      </div>

      <div class="bg-progress-bar-warning">
        <div class="progress-container" style="margin-bottom: 0; border: none; padding: 0;">
          <div class="progress-label">
            <span class="progress-title">
              <i class="bi bi-clipboard-check subject-icon"></i>
              Atividades Entregues
            </span>
            <span class="progress-percentage">55%</span>
          </div>
          <div class="progress">
            <div class="progress-bar bg-warning" role="progressbar" style="width: 55%;" aria-valuenow="55" aria-valuemin="0" aria-valuemax="100"></div>
          </div>
        </div>
      </div>
    </div>
  `};var t,c,p,g,v;r.parameters={...r.parameters,docs:{...(t=r.parameters)==null?void 0:t.docs,source:{originalSource:`{
  render: () => \`
    \${componentStyles}
    <div class="demo-container">
      <div class="demo-label">Barra de Progresso Padrão</div>
      <div class="progress-container">
        <div class="progress-label">
          <span class="progress-title">Progresso da Missão</span>
        </div>
        <div class="progress">
          <div class="progress-bar bg-primary" role="progressbar" style="width: 50%;" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
        </div>
      </div>
    </div>
  \`
}`,...(p=(c=r.parameters)==null?void 0:c.docs)==null?void 0:p.source},description:{story:'Basic 50% progress bar with "Progresso" label, neutral color',...(v=(g=r.parameters)==null?void 0:g.docs)==null?void 0:v.description}}};var b,m,u,x,w;e.parameters={...e.parameters,docs:{...(b=e.parameters)==null?void 0:b.docs,source:{originalSource:`{
  render: () => \`
    \${componentStyles}
    <div class="demo-container">
      <div class="demo-label">Estado de Alerta - Progresso Baixo</div>
      <div class="bg-progress-bar-danger">
        <div class="progress-container" style="margin-bottom: 0; border: none; padding: 0;">
          <div class="progress-label">
            <span class="progress-title">
              <i class="bi bi-exclamation-triangle subject-icon"></i>
              Apenas 3 de 20 questões respondidas
            </span>
          </div>
          <div class="progress">
            <div class="progress-bar bg-danger" role="progressbar" style="width: 15%;" aria-valuenow="15" aria-valuemin="0" aria-valuemax="100"></div>
          </div>
        </div>
      </div>
    </div>
  \`
}`,...(u=(m=e.parameters)==null?void 0:m.docs)==null?void 0:u.source},description:{story:'Low progress (15%) with danger red bg, "Apenas 3 de 20 questões" label',...(w=(x=e.parameters)==null?void 0:x.docs)==null?void 0:w.description}}};var h,y,f,E,P;a.parameters={...a.parameters,docs:{...(h=a.parameters)==null?void 0:h.docs,source:{originalSource:`{
  render: () => \`
    \${componentStyles}
    <div class="demo-container">
      <div class="demo-label">Estado de Atenção - Progresso Médio</div>
      <div class="bg-progress-bar-warning">
        <div class="progress-container" style="margin-bottom: 0; border: none; padding: 0;">
          <div class="progress-label">
            <span class="progress-title">
              <i class="bi bi-clock-history subject-icon"></i>
              9 de 20 alunos concluíram a atividade
            </span>
          </div>
          <div class="progress">
            <div class="progress-bar bg-warning" role="progressbar" style="width: 45%;" aria-valuenow="45" aria-valuemin="0" aria-valuemax="100"></div>
          </div>
        </div>
      </div>
    </div>
  \`
}`,...(f=(y=a.parameters)==null?void 0:y.docs)==null?void 0:f.source},description:{story:'Medium progress (45%) with warning orange bg, "9 de 20 alunos concluíram"',...(P=(E=a.parameters)==null?void 0:E.docs)==null?void 0:P.description}}};var j,k,D,S,A;i.parameters={...i.parameters,docs:{...(j=i.parameters)==null?void 0:j.docs,source:{originalSource:`{
  render: () => \`
    \${componentStyles}
    <div class="demo-container">
      <div class="demo-label">Estado de Sucesso - Progresso Alto</div>
      <div class="bg-progress-bar-success">
        <div class="progress-container" style="margin-bottom: 0; border: none; padding: 0;">
          <div class="progress-label">
            <span class="progress-title">
              <i class="bi bi-check-circle subject-icon"></i>
              17 de 20 missões completas
            </span>
          </div>
          <div class="progress">
            <div class="progress-bar bg-success" role="progressbar" style="width: 85%;" aria-valuenow="85" aria-valuemin="0" aria-valuemax="100"></div>
          </div>
        </div>
      </div>
    </div>
  \`
}`,...(D=(k=i.parameters)==null?void 0:k.docs)==null?void 0:D.source},description:{story:'High progress (85%) with success green bg, "17 de 20 missões completas"',...(A=(S=i.parameters)==null?void 0:S.docs)==null?void 0:A.description}}};var M,B,F,$,C;o.parameters={...o.parameters,docs:{...(M=o.parameters)==null?void 0:M.docs,source:{originalSource:`{
  render: () => \`
    \${componentStyles}
    <div class="demo-container">
      <div class="demo-label">Barra com Porcentagem à Direita</div>
      <div class="progress-container">
        <div class="progress-label">
          <span class="progress-title">
            <i class="bi bi-book subject-icon"></i>
            Lições Completadas
          </span>
          <span class="progress-percentage">75%</span>
        </div>
        <div class="progress">
          <div class="progress-bar bg-primary" role="progressbar" style="width: 75%;" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"></div>
        </div>
      </div>
    </div>
  \`
}`,...(F=(B=o.parameters)==null?void 0:B.docs)==null?void 0:F.source},description:{story:'Progress with right-content slot showing "75%" percentage',...(C=($=o.parameters)==null?void 0:$.docs)==null?void 0:C.description}}};var z,W,q,L,V;n.parameters={...n.parameters,docs:{...(z=n.parameters)==null?void 0:z.docs,source:{originalSource:`{
  render: () => \`
    \${componentStyles}
    <div class="demo-container">
      <div class="demo-label">Barra com Tooltip Informativo</div>
      <div class="progress-container">
        <div class="progress-label">
          <span class="progress-title progress-tooltip">
            <i class="bi bi-graph-up subject-icon"></i>
            Desempenho Geral do Aluno
            <span class="tooltip-text">32 questões corretas de 40 tentadas. Média de acerto: 80%</span>
          </span>
          <span class="progress-percentage">80%</span>
        </div>
        <div class="progress">
          <div class="progress-bar bg-success" role="progressbar" style="width: 80%;" aria-valuenow="80" aria-valuemin="0" aria-valuemax="100"></div>
        </div>
      </div>
    </div>
  \`
}`,...(q=(W=n.parameters)==null?void 0:W.docs)==null?void 0:q.source},description:{story:"Progress bar with v-b-tooltip showing detailed stats on hover",...(V=(L=n.parameters)==null?void 0:L.docs)==null?void 0:V.description}}};var H,T,G,_,I;d.parameters={...d.parameters,docs:{...(H=d.parameters)==null?void 0:H.docs,source:{originalSource:`{
  render: () => \`
    \${componentStyles}
    <div class="demo-container">
      <div class="demo-label">Múltiplas Barras de Progresso por Disciplina</div>
      <div class="progress-grid">
        <div class="bg-progress-bar-success">
          <div class="progress-container" style="margin-bottom: 0; border: none; padding: 0;">
            <div class="progress-label">
              <span class="progress-title">
                <i class="bi bi-calculator subject-icon"></i>
                Matemática - 18 de 20 exercícios
              </span>
              <span class="progress-percentage">90%</span>
            </div>
            <div class="progress">
              <div class="progress-bar bg-success" role="progressbar" style="width: 90%;" aria-valuenow="90" aria-valuemin="0" aria-valuemax="100"></div>
            </div>
          </div>
        </div>

        <div class="bg-progress-bar-warning">
          <div class="progress-container" style="margin-bottom: 0; border: none; padding: 0;">
            <div class="progress-label">
              <span class="progress-title">
                <i class="bi bi-journal-text subject-icon"></i>
                Língua Portuguesa - 13 de 20 exercícios
              </span>
              <span class="progress-percentage">65%</span>
            </div>
            <div class="progress">
              <div class="progress-bar bg-warning" role="progressbar" style="width: 65%;" aria-valuenow="65" aria-valuemin="0" aria-valuemax="100"></div>
            </div>
          </div>
        </div>

        <div class="bg-progress-bar-danger">
          <div class="progress-container" style="margin-bottom: 0; border: none; padding: 0;">
            <div class="progress-label">
              <span class="progress-title">
                <i class="bi bi-atom subject-icon"></i>
                Ciências - 8 de 20 exercícios
              </span>
              <span class="progress-percentage">40%</span>
            </div>
            <div class="progress">
              <div class="progress-bar bg-danger" role="progressbar" style="width: 40%;" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  \`
}`,...(G=(T=d.parameters)==null?void 0:T.docs)==null?void 0:G.source},description:{story:"Grid with 3 progress bars (Math 90%, Portuguese 65%, Science 40%)",...(I=(_=d.parameters)==null?void 0:_.docs)==null?void 0:I.description}}};var R,O,J,K,N;l.parameters={...l.parameters,docs:{...(R=l.parameters)==null?void 0:R.docs,source:{originalSource:`{
  render: () => \`
    \${componentStyles}
    <div class="demo-container mobile-viewport">
      <div class="demo-label">Visualização Mobile (375px)</div>
      
      <div class="progress-container">
        <div class="progress-label">
          <span class="progress-title">
            <i class="bi bi-trophy subject-icon"></i>
            Missões Completadas
          </span>
          <span class="progress-percentage">72%</span>
        </div>
        <div class="progress">
          <div class="progress-bar bg-success" role="progressbar" style="width: 72%;" aria-valuenow="72" aria-valuemin="0" aria-valuemax="100"></div>
        </div>
      </div>

      <div class="bg-progress-bar-warning">
        <div class="progress-container" style="margin-bottom: 0; border: none; padding: 0;">
          <div class="progress-label">
            <span class="progress-title">
              <i class="bi bi-clipboard-check subject-icon"></i>
              Atividades Entregues
            </span>
            <span class="progress-percentage">55%</span>
          </div>
          <div class="progress">
            <div class="progress-bar bg-warning" role="progressbar" style="width: 55%;" aria-valuenow="55" aria-valuemin="0" aria-valuemax="100"></div>
          </div>
        </div>
      </div>
    </div>
  \`
}`,...(J=(O=l.parameters)==null?void 0:O.docs)==null?void 0:J.source},description:{story:"375px responsive layout with stacked label and bar",...(N=(K=l.parameters)==null?void 0:K.docs)==null?void 0:N.description}}};const U=["Default","Danger","Warning","Success","WithRightContent","WithTooltip","MultipleProgress","MobileView"];export{e as Danger,r as Default,l as MobileView,d as MultipleProgress,i as Success,a as Warning,o as WithRightContent,n as WithTooltip,U as __namedExportsOrder,Q as default};
