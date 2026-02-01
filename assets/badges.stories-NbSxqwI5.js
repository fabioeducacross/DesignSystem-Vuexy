const x={title:"Educacross/Badges",parameters:{layout:"padded",docs:{description:{component:`Educacross Components - Badges

Componentes de badge extraídos do educacross-frontoffice
Contém: BadgeStatus, CellStatus, ConditionalValueDisplay`}}}},a={render:()=>`
    <style>
      .badge-light-success {
        background-color: rgba(40, 199, 111, 0.12);
        color: #28C76F;
        border: 1px solid #28C76F;
      }
      
      .badge-light-warning {
        background-color: rgba(255, 159, 67, 0.12);
        color: #FF9F43;
        border: 1px solid #FF9F43;
      }
      
      .badge-light-danger {
        background-color: rgba(234, 84, 85, 0.12);
        color: #EA5455;
        border: 1px solid #EA5455;
      }
      
      .badge-light-info {
        background-color: rgba(0, 207, 232, 0.12);
        color: #00CFE8;
        border: 1px solid #00CFE8;
      }
      
      .badge-light-primary {
        background-color: rgba(115, 103, 240, 0.12);
        color: #7367F0;
        border: 1px solid #7367F0;
      }
      
      .badge-light-secondary {
        background-color: rgba(108, 117, 125, 0.12);
        color: #6C757D;
        border: 1px solid #6C757D;
      }
      
      .badge-demo-section {
        margin-bottom: 2rem;
      }
    </style>
    
    <div class="badge-demo">
      <h5 class="mb-3">Badges Pill</h5>
      <div class="badge-demo-section">
        <span class="badge badge-pill badge-light-success me-2">Ativo</span>
        <span class="badge badge-pill badge-light-warning me-2">Pendente</span>
        <span class="badge badge-pill badge-light-danger me-2">Inativo</span>
        <span class="badge badge-pill badge-light-info me-2">Em Progresso</span>
        <span class="badge badge-pill badge-light-primary me-2">Novo</span>
        <span class="badge badge-pill badge-light-secondary me-2">Rascunho</span>
      </div>
      
      <h5 class="mb-3">Badges com Ícone</h5>
      <div class="badge-demo-section">
        <span class="badge badge-pill badge-light-success me-2">
          <i class="ti ti-check me-1"></i>Concluído
        </span>
        <span class="badge badge-pill badge-light-warning me-2">
          <i class="ti ti-clock me-1"></i>Aguardando
        </span>
        <span class="badge badge-pill badge-light-danger me-2">
          <i class="ti ti-x me-1"></i>Cancelado
        </span>
      </div>
      
      <h5 class="mb-3">Status de Missão</h5>
      <div class="badge-demo-section">
        <span class="badge badge-pill badge-light-success me-2">
          <i class="ti ti-trophy me-1"></i>Missão Completa
        </span>
        <span class="badge badge-pill badge-light-info me-2">
          <i class="ti ti-player-play me-1"></i>Em Andamento
        </span>
        <span class="badge badge-pill badge-light-secondary me-2">
          <i class="ti ti-lock me-1"></i>Bloqueada
        </span>
      </div>
      
      <div class="alert alert-info mt-4">
        <strong>Uso Original:</strong> Usado para exibir status de missões, atividades de alunos, 
        e estados de processos no sistema Educacross.
      </div>
    </div>
  `},s={render:()=>`
    <style>
      .cell-status-badge {
        font-size: 0.75rem;
        padding: 0.35em 0.65em;
      }
    </style>
    
    <div>
      <h5 class="mb-3">Badges em Células de Tabela</h5>
      
      <table class="table">
        <thead>
          <tr>
            <th>Aluno</th>
            <th>Atividade</th>
            <th>Proficiência</th>
            <th>Presença</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>João Silva</td>
            <td><span class="badge badge-pill badge-light-success cell-status-badge">Concluída</span></td>
            <td><span class="badge badge-pill badge-light-success cell-status-badge">Avançado</span></td>
            <td><span class="badge badge-pill badge-light-success cell-status-badge">Presente</span></td>
          </tr>
          <tr>
            <td>Maria Santos</td>
            <td><span class="badge badge-pill badge-light-warning cell-status-badge">Em Progresso</span></td>
            <td><span class="badge badge-pill badge-light-info cell-status-badge">Intermediário</span></td>
            <td><span class="badge badge-pill badge-light-success cell-status-badge">Presente</span></td>
          </tr>
          <tr>
            <td>Pedro Oliveira</td>
            <td><span class="badge badge-pill badge-light-danger cell-status-badge">Não Iniciada</span></td>
            <td><span class="badge badge-pill badge-light-warning cell-status-badge">Básico</span></td>
            <td><span class="badge badge-pill badge-light-danger cell-status-badge">Ausente</span></td>
          </tr>
        </tbody>
      </table>
      
      <div class="alert alert-info">
        <strong>Uso Original:</strong> Usado em tabelas de acompanhamento de alunos, 
        relatórios de turma e dashboards de professores.
      </div>
    </div>
  `},e={render:()=>`
    <style>
      .stat-card {
        background: #fff;
        border-radius: 0.5rem;
        padding: 1.5rem;
        border: 1px solid #e9ecef;
        margin-bottom: 1rem;
      }
      
      .conditional-badge {
        font-size: 1.25rem;
        padding: 0.5em 1em;
      }
    </style>
    
    <div>
      <h5 class="mb-4">Badges Condicionais por Valor</h5>
      
      <div class="row">
        <div class="col-md-4">
          <div class="stat-card text-center">
            <h6 class="text-muted mb-2">Taxa de Conclusão</h6>
            <span class="badge badge-pill badge-light-success conditional-badge">85%</span>
            <small class="d-block mt-2 text-muted">Meta: 80%</small>
          </div>
        </div>
        
        <div class="col-md-4">
          <div class="stat-card text-center">
            <h6 class="text-muted mb-2">Engajamento</h6>
            <span class="badge badge-pill badge-light-warning conditional-badge">62%</span>
            <small class="d-block mt-2 text-muted">Meta: 70%</small>
          </div>
        </div>
        
        <div class="col-md-4">
          <div class="stat-card text-center">
            <h6 class="text-muted mb-2">Pontualidade</h6>
            <span class="badge badge-pill badge-light-danger conditional-badge">45%</span>
            <small class="d-block mt-2 text-muted">Meta: 80%</small>
          </div>
        </div>
      </div>
      
      <div class="alert alert-info">
        <strong>Regras de Cor:</strong>
        <ul class="mb-0 mt-2">
          <li><strong class="text-success">Verde:</strong> ≥ 80% (Excelente)</li>
          <li><strong class="text-info">Azul:</strong> 70-79% (Bom)</li>
          <li><strong class="text-warning">Amarelo:</strong> 50-69% (Regular)</li>
          <li><strong class="text-danger">Vermelho:</strong> < 50% (Crítico)</li>
        </ul>
      </div>
    </div>
  `};var d,n,l,t,i;a.parameters={...a.parameters,docs:{...(d=a.parameters)==null?void 0:d.docs,source:{originalSource:`{
  render: () => \`
    <style>
      .badge-light-success {
        background-color: rgba(40, 199, 111, 0.12);
        color: #28C76F;
        border: 1px solid #28C76F;
      }
      
      .badge-light-warning {
        background-color: rgba(255, 159, 67, 0.12);
        color: #FF9F43;
        border: 1px solid #FF9F43;
      }
      
      .badge-light-danger {
        background-color: rgba(234, 84, 85, 0.12);
        color: #EA5455;
        border: 1px solid #EA5455;
      }
      
      .badge-light-info {
        background-color: rgba(0, 207, 232, 0.12);
        color: #00CFE8;
        border: 1px solid #00CFE8;
      }
      
      .badge-light-primary {
        background-color: rgba(115, 103, 240, 0.12);
        color: #7367F0;
        border: 1px solid #7367F0;
      }
      
      .badge-light-secondary {
        background-color: rgba(108, 117, 125, 0.12);
        color: #6C757D;
        border: 1px solid #6C757D;
      }
      
      .badge-demo-section {
        margin-bottom: 2rem;
      }
    </style>
    
    <div class="badge-demo">
      <h5 class="mb-3">Badges Pill</h5>
      <div class="badge-demo-section">
        <span class="badge badge-pill badge-light-success me-2">Ativo</span>
        <span class="badge badge-pill badge-light-warning me-2">Pendente</span>
        <span class="badge badge-pill badge-light-danger me-2">Inativo</span>
        <span class="badge badge-pill badge-light-info me-2">Em Progresso</span>
        <span class="badge badge-pill badge-light-primary me-2">Novo</span>
        <span class="badge badge-pill badge-light-secondary me-2">Rascunho</span>
      </div>
      
      <h5 class="mb-3">Badges com Ícone</h5>
      <div class="badge-demo-section">
        <span class="badge badge-pill badge-light-success me-2">
          <i class="ti ti-check me-1"></i>Concluído
        </span>
        <span class="badge badge-pill badge-light-warning me-2">
          <i class="ti ti-clock me-1"></i>Aguardando
        </span>
        <span class="badge badge-pill badge-light-danger me-2">
          <i class="ti ti-x me-1"></i>Cancelado
        </span>
      </div>
      
      <h5 class="mb-3">Status de Missão</h5>
      <div class="badge-demo-section">
        <span class="badge badge-pill badge-light-success me-2">
          <i class="ti ti-trophy me-1"></i>Missão Completa
        </span>
        <span class="badge badge-pill badge-light-info me-2">
          <i class="ti ti-player-play me-1"></i>Em Andamento
        </span>
        <span class="badge badge-pill badge-light-secondary me-2">
          <i class="ti ti-lock me-1"></i>Bloqueada
        </span>
      </div>
      
      <div class="alert alert-info mt-4">
        <strong>Uso Original:</strong> Usado para exibir status de missões, atividades de alunos, 
        e estados de processos no sistema Educacross.
      </div>
    </div>
  \`
}`,...(l=(n=a.parameters)==null?void 0:n.docs)==null?void 0:l.source},description:{story:`BadgeStatus - Badge com variantes de status
Original: educacross-frontoffice/src/components/badge/BadgeStatus.vue`,...(i=(t=a.parameters)==null?void 0:t.docs)==null?void 0:i.description}}};var o,g,r,c,b;s.parameters={...s.parameters,docs:{...(o=s.parameters)==null?void 0:o.docs,source:{originalSource:`{
  render: () => \`
    <style>
      .cell-status-badge {
        font-size: 0.75rem;
        padding: 0.35em 0.65em;
      }
    </style>
    
    <div>
      <h5 class="mb-3">Badges em Células de Tabela</h5>
      
      <table class="table">
        <thead>
          <tr>
            <th>Aluno</th>
            <th>Atividade</th>
            <th>Proficiência</th>
            <th>Presença</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>João Silva</td>
            <td><span class="badge badge-pill badge-light-success cell-status-badge">Concluída</span></td>
            <td><span class="badge badge-pill badge-light-success cell-status-badge">Avançado</span></td>
            <td><span class="badge badge-pill badge-light-success cell-status-badge">Presente</span></td>
          </tr>
          <tr>
            <td>Maria Santos</td>
            <td><span class="badge badge-pill badge-light-warning cell-status-badge">Em Progresso</span></td>
            <td><span class="badge badge-pill badge-light-info cell-status-badge">Intermediário</span></td>
            <td><span class="badge badge-pill badge-light-success cell-status-badge">Presente</span></td>
          </tr>
          <tr>
            <td>Pedro Oliveira</td>
            <td><span class="badge badge-pill badge-light-danger cell-status-badge">Não Iniciada</span></td>
            <td><span class="badge badge-pill badge-light-warning cell-status-badge">Básico</span></td>
            <td><span class="badge badge-pill badge-light-danger cell-status-badge">Ausente</span></td>
          </tr>
        </tbody>
      </table>
      
      <div class="alert alert-info">
        <strong>Uso Original:</strong> Usado em tabelas de acompanhamento de alunos, 
        relatórios de turma e dashboards de professores.
      </div>
    </div>
  \`
}`,...(r=(g=s.parameters)==null?void 0:g.docs)==null?void 0:r.source},description:{story:`CellStatus - Badge para células de tabela
Original: educacross-frontoffice/src/components/badge/CellStatus.vue`,...(b=(c=s.parameters)==null?void 0:c.docs)==null?void 0:b.description}}};var p,m,u,h,v;e.parameters={...e.parameters,docs:{...(p=e.parameters)==null?void 0:p.docs,source:{originalSource:`{
  render: () => \`
    <style>
      .stat-card {
        background: #fff;
        border-radius: 0.5rem;
        padding: 1.5rem;
        border: 1px solid #e9ecef;
        margin-bottom: 1rem;
      }
      
      .conditional-badge {
        font-size: 1.25rem;
        padding: 0.5em 1em;
      }
    </style>
    
    <div>
      <h5 class="mb-4">Badges Condicionais por Valor</h5>
      
      <div class="row">
        <div class="col-md-4">
          <div class="stat-card text-center">
            <h6 class="text-muted mb-2">Taxa de Conclusão</h6>
            <span class="badge badge-pill badge-light-success conditional-badge">85%</span>
            <small class="d-block mt-2 text-muted">Meta: 80%</small>
          </div>
        </div>
        
        <div class="col-md-4">
          <div class="stat-card text-center">
            <h6 class="text-muted mb-2">Engajamento</h6>
            <span class="badge badge-pill badge-light-warning conditional-badge">62%</span>
            <small class="d-block mt-2 text-muted">Meta: 70%</small>
          </div>
        </div>
        
        <div class="col-md-4">
          <div class="stat-card text-center">
            <h6 class="text-muted mb-2">Pontualidade</h6>
            <span class="badge badge-pill badge-light-danger conditional-badge">45%</span>
            <small class="d-block mt-2 text-muted">Meta: 80%</small>
          </div>
        </div>
      </div>
      
      <div class="alert alert-info">
        <strong>Regras de Cor:</strong>
        <ul class="mb-0 mt-2">
          <li><strong class="text-success">Verde:</strong> ≥ 80% (Excelente)</li>
          <li><strong class="text-info">Azul:</strong> 70-79% (Bom)</li>
          <li><strong class="text-warning">Amarelo:</strong> 50-69% (Regular)</li>
          <li><strong class="text-danger">Vermelho:</strong> < 50% (Crítico)</li>
        </ul>
      </div>
    </div>
  \`
}`,...(u=(m=e.parameters)==null?void 0:m.docs)==null?void 0:u.source},description:{story:`ConditionalValueDisplay - Badge condicional baseado em valor
Original: educacross-frontoffice/src/components/badge/ConditionalValueDisplay.vue`,...(v=(h=e.parameters)==null?void 0:h.docs)==null?void 0:v.description}}};const f=["BadgeStatus","CellStatus","ConditionalValueDisplay"];export{a as BadgeStatus,s as CellStatus,e as ConditionalValueDisplay,f as __namedExportsOrder,x as default};
