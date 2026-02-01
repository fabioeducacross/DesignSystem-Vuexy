const re={title:"Educacross/Components/EmptyState",parameters:{layout:"padded",docs:{description:{component:`Empty State - Estados vazios

Para quando não há dados para exibir
Inspirado nos padrões do sistema Educacross`}}}},e={render:()=>`
    <div style="max-width: 500px; margin: 0 auto;">
      <div class="card">
        <div class="card-body text-center py-5">
          <div class="mb-4">
            <i class="bi bi-inbox text-muted" style="font-size: 64px;"></i>
          </div>
          <h5 class="text-muted mb-2">Nenhum item encontrado</h5>
          <p class="text-muted mb-4">
            Não há dados para exibir no momento.
          </p>
          <button class="btn btn-primary">
            <i class="bi bi-plus me-2"></i>Adicionar Novo
          </button>
        </div>
      </div>
    </div>
  `},t={render:()=>`
    <div style="max-width: 500px; margin: 0 auto;">
      <div class="card">
        <div class="card-body text-center py-5">
          <div class="mb-4">
            <img src="/vuexy/img/educacross/users/Aluno.svg" alt="Aluno" style="width: 80px; height: 80px; opacity: 0.5;">
          </div>
          <h5 class="text-muted mb-2">Nenhum aluno cadastrado</h5>
          <p class="text-muted mb-4">
            Esta turma ainda não possui alunos matriculados.<br>
            Comece adicionando o primeiro aluno.
          </p>
          <div class="d-flex justify-content-center gap-2">
            <button class="btn btn-primary">
              <i class="bi bi-person-plus me-2"></i>Adicionar Aluno
            </button>
            <button class="btn btn-outline-secondary">
              <i class="bi bi-upload me-2"></i>Importar Lista
            </button>
          </div>
        </div>
      </div>
    </div>
  `},s={render:()=>`
    <div style="max-width: 500px; margin: 0 auto;">
      <div class="card">
        <div class="card-body text-center py-5">
          <div class="mb-4">
            <img src="/vuexy/img/educacross/metrics/Jogos.svg" alt="Jogos" style="width: 80px; height: 80px; opacity: 0.5;">
          </div>
          <h5 class="text-muted mb-2">Nenhuma atividade realizada</h5>
          <p class="text-muted mb-4">
            O aluno ainda não completou nenhuma atividade.<br>
            Incentive-o a começar sua jornada de aprendizado!
          </p>
          <button class="btn btn-primary">
            <i class="bi bi-controller me-2"></i>Ver Jogos Disponíveis
          </button>
        </div>
      </div>
    </div>
  `},a={render:()=>`
    <div style="max-width: 500px; margin: 0 auto;">
      <div class="card">
        <div class="card-body text-center py-5">
          <div class="mb-4">
            <i class="bi bi-search text-muted" style="font-size: 64px;"></i>
          </div>
          <h5 class="text-muted mb-2">Nenhum resultado encontrado</h5>
          <p class="text-muted mb-4">
            Não encontramos resultados para "<strong>matemática 5º ano</strong>".<br>
            Tente usar termos diferentes ou remover filtros.
          </p>
          <div class="d-flex justify-content-center gap-2">
            <button class="btn btn-outline-primary">
              <i class="bi bi-arrow-counterclockwise me-2"></i>Limpar Filtros
            </button>
            <button class="btn btn-outline-secondary">
              <i class="bi bi-question-circle me-2"></i>Ajuda
            </button>
          </div>
        </div>
      </div>
    </div>
  `},n={render:()=>`
    <div style="max-width: 500px; margin: 0 auto;">
      <div class="card">
        <div class="card-body text-center py-5">
          <div class="mb-4">
            <img src="/vuexy/img/educacross/gamification/Troféu-Ouro.svg" alt="Troféu" style="width: 80px; height: 80px; opacity: 0.3; filter: grayscale(100%);">
          </div>
          <h5 class="text-muted mb-2">Nenhum troféu conquistado</h5>
          <p class="text-muted mb-4">
            Continue jogando e completando atividades<br>
            para ganhar seus primeiros troféus!
          </p>
          <div class="d-flex justify-content-center gap-3">
            <div class="text-center">
              <img src="/vuexy/img/educacross/gamification/Troféu-Ouro.svg" alt="Ouro" style="width: 40px; opacity: 0.3; filter: grayscale(100%);">
              <small class="d-block text-muted mt-1">Ouro</small>
            </div>
            <div class="text-center">
              <img src="/vuexy/img/educacross/gamification/Trofeu-Prata.svg" alt="Prata" style="width: 40px; opacity: 0.3; filter: grayscale(100%);">
              <small class="d-block text-muted mt-1">Prata</small>
            </div>
            <div class="text-center">
              <img src="/vuexy/img/educacross/gamification/Trofeu-bronze.svg" alt="Bronze" style="width: 40px; opacity: 0.3; filter: grayscale(100%);">
              <small class="d-block text-muted mt-1">Bronze</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  `},i={render:()=>`
    <div style="max-width: 500px; margin: 0 auto;">
      <div class="card">
        <div class="card-body text-center py-5">
          <div class="mb-4">
            <i class="bi bi-calendar-x text-muted" style="font-size: 64px;"></i>
          </div>
          <h5 class="text-muted mb-2">Nenhum evento programado</h5>
          <p class="text-muted mb-4">
            Não há eventos agendados para este período.<br>
            Crie um novo evento para engajar seus alunos!
          </p>
          <button class="btn btn-primary">
            <i class="bi bi-calendar-plus me-2"></i>Criar Evento
          </button>
        </div>
      </div>
    </div>
  `},r={render:()=>`
    <div style="max-width: 500px; margin: 0 auto;">
      <div class="card border-danger">
        <div class="card-body text-center py-5">
          <div class="mb-4">
            <i class="bi bi-exclamation-triangle text-danger" style="font-size: 64px;"></i>
          </div>
          <h5 class="text-danger mb-2">Algo deu errado</h5>
          <p class="text-muted mb-4">
            Não foi possível carregar os dados.<br>
            Por favor, tente novamente.
          </p>
          <div class="d-flex justify-content-center gap-2">
            <button class="btn btn-danger">
              <i class="bi bi-arrow-clockwise me-2"></i>Tentar Novamente
            </button>
            <button class="btn btn-outline-secondary">
              <i class="bi bi-headset me-2"></i>Suporte
            </button>
          </div>
          <div class="mt-4">
            <small class="text-muted">Código do erro: ERR_NETWORK_500</small>
          </div>
        </div>
      </div>
    </div>
  `},o={render:()=>`
    <div style="max-width: 500px; margin: 0 auto;">
      <div class="card" style="border-color: #6c757d;">
        <div class="card-body text-center py-5">
          <div class="mb-4">
            <i class="bi bi-wifi-off text-secondary" style="font-size: 64px;"></i>
          </div>
          <h5 class="text-muted mb-2">Você está offline</h5>
          <p class="text-muted mb-4">
            Verifique sua conexão com a internet<br>
            para acessar este conteúdo.
          </p>
          <button class="btn btn-secondary">
            <i class="bi bi-arrow-clockwise me-2"></i>Verificar Conexão
          </button>
        </div>
      </div>
    </div>
  `},d={render:()=>`
    <div style="max-width: 500px; margin: 0 auto;">
      <div class="card" style="background: linear-gradient(135deg, #f8f9fa, #e9ecef);">
        <div class="card-body text-center py-5">
          <div class="mb-4">
            <i class="bi bi-rocket-takeoff" style="font-size: 64px; color: var(--edu-primary, #0C5257);"></i>
          </div>
          <h5 style="color: var(--edu-primary);" class="mb-2">Em Breve!</h5>
          <p class="text-muted mb-4">
            Estamos trabalhando em algo incrível.<br>
            Fique ligado para novidades!
          </p>
          <div class="d-flex justify-content-center align-items-center gap-3">
            <img src="/vuexy/img/educacross/logos/Belinha.svg" alt="Belinha" style="width: 50px;">
            <span class="text-muted">A Belinha está preparando tudo para você!</span>
          </div>
        </div>
      </div>
    </div>
  `},c={render:()=>`
    <div>
      <h5 class="mb-4">Estado Vazio Inline (para tabelas)</h5>
      
      <div class="card">
        <div class="card-header">
          <h6 class="mb-0">Lista de Alunos</h6>
        </div>
        <table class="table mb-0">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Turma</th>
              <th>Progresso</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colspan="4" class="text-center py-5">
                <i class="bi bi-inbox text-muted fs-1 d-block mb-2"></i>
                <span class="text-muted">Nenhum aluno encontrado</span>
                <button class="btn btn-sm btn-link">Adicionar aluno</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <div class="card mt-4">
        <div class="card-header d-flex justify-content-between align-items-center">
          <h6 class="mb-0">Resultados da Busca</h6>
          <span class="badge bg-secondary">0 resultados</span>
        </div>
        <div class="card-body text-center py-4">
          <div class="d-flex align-items-center justify-content-center gap-2 text-muted">
            <i class="bi bi-search"></i>
            <span>Nenhum resultado para "algebra avançada"</span>
          </div>
        </div>
      </div>
    </div>
  `};var l,m,u,p,b;e.parameters={...e.parameters,docs:{...(l=e.parameters)==null?void 0:l.docs,source:{originalSource:`{
  render: () => \`
    <div style="max-width: 500px; margin: 0 auto;">
      <div class="card">
        <div class="card-body text-center py-5">
          <div class="mb-4">
            <i class="bi bi-inbox text-muted" style="font-size: 64px;"></i>
          </div>
          <h5 class="text-muted mb-2">Nenhum item encontrado</h5>
          <p class="text-muted mb-4">
            Não há dados para exibir no momento.
          </p>
          <button class="btn btn-primary">
            <i class="bi bi-plus me-2"></i>Adicionar Novo
          </button>
        </div>
      </div>
    </div>
  \`
}`,...(u=(m=e.parameters)==null?void 0:m.docs)==null?void 0:u.source},description:{story:"Default - Estado vazio básico",...(b=(p=e.parameters)==null?void 0:p.docs)==null?void 0:b.description}}};var v,x,y,g,h;t.parameters={...t.parameters,docs:{...(v=t.parameters)==null?void 0:v.docs,source:{originalSource:`{
  render: () => \`
    <div style="max-width: 500px; margin: 0 auto;">
      <div class="card">
        <div class="card-body text-center py-5">
          <div class="mb-4">
            <img src="/vuexy/img/educacross/users/Aluno.svg" alt="Aluno" style="width: 80px; height: 80px; opacity: 0.5;">
          </div>
          <h5 class="text-muted mb-2">Nenhum aluno cadastrado</h5>
          <p class="text-muted mb-4">
            Esta turma ainda não possui alunos matriculados.<br>
            Comece adicionando o primeiro aluno.
          </p>
          <div class="d-flex justify-content-center gap-2">
            <button class="btn btn-primary">
              <i class="bi bi-person-plus me-2"></i>Adicionar Aluno
            </button>
            <button class="btn btn-outline-secondary">
              <i class="bi bi-upload me-2"></i>Importar Lista
            </button>
          </div>
        </div>
      </div>
    </div>
  \`
}`,...(y=(x=t.parameters)==null?void 0:x.docs)==null?void 0:y.source},description:{story:"NoStudents - Sem alunos",...(h=(g=t.parameters)==null?void 0:g.docs)==null?void 0:h.description}}};var f,E,w,N,S;s.parameters={...s.parameters,docs:{...(f=s.parameters)==null?void 0:f.docs,source:{originalSource:`{
  render: () => \`
    <div style="max-width: 500px; margin: 0 auto;">
      <div class="card">
        <div class="card-body text-center py-5">
          <div class="mb-4">
            <img src="/vuexy/img/educacross/metrics/Jogos.svg" alt="Jogos" style="width: 80px; height: 80px; opacity: 0.5;">
          </div>
          <h5 class="text-muted mb-2">Nenhuma atividade realizada</h5>
          <p class="text-muted mb-4">
            O aluno ainda não completou nenhuma atividade.<br>
            Incentive-o a começar sua jornada de aprendizado!
          </p>
          <button class="btn btn-primary">
            <i class="bi bi-controller me-2"></i>Ver Jogos Disponíveis
          </button>
        </div>
      </div>
    </div>
  \`
}`,...(w=(E=s.parameters)==null?void 0:E.docs)==null?void 0:w.source},description:{story:"NoActivities - Sem atividades",...(S=(N=s.parameters)==null?void 0:N.docs)==null?void 0:S.description}}};var A,z,j,k,T;a.parameters={...a.parameters,docs:{...(A=a.parameters)==null?void 0:A.docs,source:{originalSource:`{
  render: () => \`
    <div style="max-width: 500px; margin: 0 auto;">
      <div class="card">
        <div class="card-body text-center py-5">
          <div class="mb-4">
            <i class="bi bi-search text-muted" style="font-size: 64px;"></i>
          </div>
          <h5 class="text-muted mb-2">Nenhum resultado encontrado</h5>
          <p class="text-muted mb-4">
            Não encontramos resultados para "<strong>matemática 5º ano</strong>".<br>
            Tente usar termos diferentes ou remover filtros.
          </p>
          <div class="d-flex justify-content-center gap-2">
            <button class="btn btn-outline-primary">
              <i class="bi bi-arrow-counterclockwise me-2"></i>Limpar Filtros
            </button>
            <button class="btn btn-outline-secondary">
              <i class="bi bi-question-circle me-2"></i>Ajuda
            </button>
          </div>
        </div>
      </div>
    </div>
  \`
}`,...(j=(z=a.parameters)==null?void 0:z.docs)==null?void 0:j.source},description:{story:"NoResults - Sem resultados de busca",...(T=(k=a.parameters)==null?void 0:k.docs)==null?void 0:T.description}}};var C,O,B,P,R;n.parameters={...n.parameters,docs:{...(C=n.parameters)==null?void 0:C.docs,source:{originalSource:`{
  render: () => \`
    <div style="max-width: 500px; margin: 0 auto;">
      <div class="card">
        <div class="card-body text-center py-5">
          <div class="mb-4">
            <img src="/vuexy/img/educacross/gamification/Troféu-Ouro.svg" alt="Troféu" style="width: 80px; height: 80px; opacity: 0.3; filter: grayscale(100%);">
          </div>
          <h5 class="text-muted mb-2">Nenhum troféu conquistado</h5>
          <p class="text-muted mb-4">
            Continue jogando e completando atividades<br>
            para ganhar seus primeiros troféus!
          </p>
          <div class="d-flex justify-content-center gap-3">
            <div class="text-center">
              <img src="/vuexy/img/educacross/gamification/Troféu-Ouro.svg" alt="Ouro" style="width: 40px; opacity: 0.3; filter: grayscale(100%);">
              <small class="d-block text-muted mt-1">Ouro</small>
            </div>
            <div class="text-center">
              <img src="/vuexy/img/educacross/gamification/Trofeu-Prata.svg" alt="Prata" style="width: 40px; opacity: 0.3; filter: grayscale(100%);">
              <small class="d-block text-muted mt-1">Prata</small>
            </div>
            <div class="text-center">
              <img src="/vuexy/img/educacross/gamification/Trofeu-bronze.svg" alt="Bronze" style="width: 40px; opacity: 0.3; filter: grayscale(100%);">
              <small class="d-block text-muted mt-1">Bronze</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  \`
}`,...(B=(O=n.parameters)==null?void 0:O.docs)==null?void 0:B.source},description:{story:"NoTrophies - Sem troféus/conquistas",...(R=(P=n.parameters)==null?void 0:P.docs)==null?void 0:R.description}}};var q,I,V,D,F;i.parameters={...i.parameters,docs:{...(q=i.parameters)==null?void 0:q.docs,source:{originalSource:`{
  render: () => \`
    <div style="max-width: 500px; margin: 0 auto;">
      <div class="card">
        <div class="card-body text-center py-5">
          <div class="mb-4">
            <i class="bi bi-calendar-x text-muted" style="font-size: 64px;"></i>
          </div>
          <h5 class="text-muted mb-2">Nenhum evento programado</h5>
          <p class="text-muted mb-4">
            Não há eventos agendados para este período.<br>
            Crie um novo evento para engajar seus alunos!
          </p>
          <button class="btn btn-primary">
            <i class="bi bi-calendar-plus me-2"></i>Criar Evento
          </button>
        </div>
      </div>
    </div>
  \`
}`,...(V=(I=i.parameters)==null?void 0:I.docs)==null?void 0:V.source},description:{story:"NoEvents - Sem eventos",...(F=(D=i.parameters)==null?void 0:D.docs)==null?void 0:F.description}}};var _,J,L,K,W;r.parameters={...r.parameters,docs:{...(_=r.parameters)==null?void 0:_.docs,source:{originalSource:`{
  render: () => \`
    <div style="max-width: 500px; margin: 0 auto;">
      <div class="card border-danger">
        <div class="card-body text-center py-5">
          <div class="mb-4">
            <i class="bi bi-exclamation-triangle text-danger" style="font-size: 64px;"></i>
          </div>
          <h5 class="text-danger mb-2">Algo deu errado</h5>
          <p class="text-muted mb-4">
            Não foi possível carregar os dados.<br>
            Por favor, tente novamente.
          </p>
          <div class="d-flex justify-content-center gap-2">
            <button class="btn btn-danger">
              <i class="bi bi-arrow-clockwise me-2"></i>Tentar Novamente
            </button>
            <button class="btn btn-outline-secondary">
              <i class="bi bi-headset me-2"></i>Suporte
            </button>
          </div>
          <div class="mt-4">
            <small class="text-muted">Código do erro: ERR_NETWORK_500</small>
          </div>
        </div>
      </div>
    </div>
  \`
}`,...(L=(J=r.parameters)==null?void 0:J.docs)==null?void 0:L.source},description:{story:"ErrorState - Estado de erro",...(W=(K=r.parameters)==null?void 0:K.docs)==null?void 0:W.description}}};var G,H,M,Q,U;o.parameters={...o.parameters,docs:{...(G=o.parameters)==null?void 0:G.docs,source:{originalSource:`{
  render: () => \`
    <div style="max-width: 500px; margin: 0 auto;">
      <div class="card" style="border-color: #6c757d;">
        <div class="card-body text-center py-5">
          <div class="mb-4">
            <i class="bi bi-wifi-off text-secondary" style="font-size: 64px;"></i>
          </div>
          <h5 class="text-muted mb-2">Você está offline</h5>
          <p class="text-muted mb-4">
            Verifique sua conexão com a internet<br>
            para acessar este conteúdo.
          </p>
          <button class="btn btn-secondary">
            <i class="bi bi-arrow-clockwise me-2"></i>Verificar Conexão
          </button>
        </div>
      </div>
    </div>
  \`
}`,...(M=(H=o.parameters)==null?void 0:H.docs)==null?void 0:M.source},description:{story:"OfflineState - Estado offline",...(U=(Q=o.parameters)==null?void 0:Q.docs)==null?void 0:U.description}}};var X,Y,Z,$,ee;d.parameters={...d.parameters,docs:{...(X=d.parameters)==null?void 0:X.docs,source:{originalSource:`{
  render: () => \`
    <div style="max-width: 500px; margin: 0 auto;">
      <div class="card" style="background: linear-gradient(135deg, #f8f9fa, #e9ecef);">
        <div class="card-body text-center py-5">
          <div class="mb-4">
            <i class="bi bi-rocket-takeoff" style="font-size: 64px; color: var(--edu-primary, #0C5257);"></i>
          </div>
          <h5 style="color: var(--edu-primary);" class="mb-2">Em Breve!</h5>
          <p class="text-muted mb-4">
            Estamos trabalhando em algo incrível.<br>
            Fique ligado para novidades!
          </p>
          <div class="d-flex justify-content-center align-items-center gap-3">
            <img src="/vuexy/img/educacross/logos/Belinha.svg" alt="Belinha" style="width: 50px;">
            <span class="text-muted">A Belinha está preparando tudo para você!</span>
          </div>
        </div>
      </div>
    </div>
  \`
}`,...(Z=(Y=d.parameters)==null?void 0:Y.docs)==null?void 0:Z.source},description:{story:"ComingSoon - Em breve",...(ee=($=d.parameters)==null?void 0:$.docs)==null?void 0:ee.description}}};var te,se,ae,ne,ie;c.parameters={...c.parameters,docs:{...(te=c.parameters)==null?void 0:te.docs,source:{originalSource:`{
  render: () => \`
    <div>
      <h5 class="mb-4">Estado Vazio Inline (para tabelas)</h5>
      
      <div class="card">
        <div class="card-header">
          <h6 class="mb-0">Lista de Alunos</h6>
        </div>
        <table class="table mb-0">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Turma</th>
              <th>Progresso</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colspan="4" class="text-center py-5">
                <i class="bi bi-inbox text-muted fs-1 d-block mb-2"></i>
                <span class="text-muted">Nenhum aluno encontrado</span>
                <button class="btn btn-sm btn-link">Adicionar aluno</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <div class="card mt-4">
        <div class="card-header d-flex justify-content-between align-items-center">
          <h6 class="mb-0">Resultados da Busca</h6>
          <span class="badge bg-secondary">0 resultados</span>
        </div>
        <div class="card-body text-center py-4">
          <div class="d-flex align-items-center justify-content-center gap-2 text-muted">
            <i class="bi bi-search"></i>
            <span>Nenhum resultado para "algebra avançada"</span>
          </div>
        </div>
      </div>
    </div>
  \`
}`,...(ae=(se=c.parameters)==null?void 0:se.docs)==null?void 0:ae.source},description:{story:"InlineEmpty - Estado vazio inline (para tabelas)",...(ie=(ne=c.parameters)==null?void 0:ne.docs)==null?void 0:ie.description}}};const oe=["Default","NoStudents","NoActivities","NoResults","NoTrophies","NoEvents","ErrorState","OfflineState","ComingSoon","InlineEmpty"];export{d as ComingSoon,e as Default,r as ErrorState,c as InlineEmpty,s as NoActivities,i as NoEvents,a as NoResults,t as NoStudents,n as NoTrophies,o as OfflineState,oe as __namedExportsOrder,re as default};
