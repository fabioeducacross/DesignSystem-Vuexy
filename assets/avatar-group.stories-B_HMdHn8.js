const M={title:"Educacross/Components/AvatarGroup",parameters:{layout:"padded",docs:{description:{component:`Avatar Group - Grupo de avatares empilhados

Para exibir múltiplos usuários de forma compacta
Baseado em: EAvatarGroup.vue do frontoffice`}}}},e=(S,B="#7367F0")=>`
  <div class="avatar-placeholder" style="
    width: 100%;
    height: 100%;
    background-color: ${B};
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-weight: 600;
    font-size: 0.75em;
    border-radius: 50%;
  ">${S}</div>
`,d={render:()=>`
    <div>
      <h5 class="mb-4">Avatar Group - Básico</h5>
      
      <div class="d-flex">
        <div class="avatar-group">
          <div class="avatar" style="width: 40px; height: 40px; margin-left: -10px; border: 2px solid white; border-radius: 50%; overflow: hidden;">
            ${e("JS","#7367F0")}
          </div>
          <div class="avatar" style="width: 40px; height: 40px; margin-left: -10px; border: 2px solid white; border-radius: 50%; overflow: hidden;">
            ${e("MC","#28C76F")}
          </div>
          <div class="avatar" style="width: 40px; height: 40px; margin-left: -10px; border: 2px solid white; border-radius: 50%; overflow: hidden;">
            ${e("AB","#FF9F43")}
          </div>
          <div class="avatar" style="width: 40px; height: 40px; margin-left: -10px; border: 2px solid white; border-radius: 50%; overflow: hidden;">
            ${e("LF","#EA5455")}
          </div>
        </div>
      </div>
      
      <p class="text-muted mt-3">
        <small>Avatares empilhados com sobreposição de 10px</small>
      </p>
    </div>
  `},i={render:()=>`
    <div>
      <h5 class="mb-4">Com Contador de Excedentes</h5>
      
      <div class="d-flex align-items-center">
        <div class="avatar-group d-flex">
          <div class="avatar" style="width: 40px; height: 40px; margin-left: 0; border: 2px solid white; border-radius: 50%; overflow: hidden; z-index: 5;">
            ${e("JS","#0C5257")}
          </div>
          <div class="avatar" style="width: 40px; height: 40px; margin-left: -12px; border: 2px solid white; border-radius: 50%; overflow: hidden; z-index: 4;">
            ${e("MC","#28C76F")}
          </div>
          <div class="avatar" style="width: 40px; height: 40px; margin-left: -12px; border: 2px solid white; border-radius: 50%; overflow: hidden; z-index: 3;">
            ${e("AB","#FAB84A")}
          </div>
          <div class="avatar" style="width: 40px; height: 40px; margin-left: -12px; border: 2px solid white; border-radius: 50%; overflow: hidden; z-index: 2;">
            ${e("LF","#CF4343")}
          </div>
          <div class="avatar d-flex align-items-center justify-content-center" style="width: 40px; height: 40px; margin-left: -12px; border: 2px solid white; border-radius: 50%; background-color: #e9ecef; z-index: 1;">
            <span class="text-muted fw-semibold" style="font-size: 12px;">+8</span>
          </div>
        </div>
        <span class="ms-2 text-muted small">12 alunos na turma</span>
      </div>
      
      <hr class="my-4">
      
      <h6>Exemplo com muitos excedentes</h6>
      <div class="d-flex align-items-center">
        <div class="avatar-group d-flex">
          <div class="avatar" style="width: 36px; height: 36px; margin-left: 0; border: 2px solid white; border-radius: 50%; overflow: hidden; z-index: 4;">
            ${e("P1","#7367F0")}
          </div>
          <div class="avatar" style="width: 36px; height: 36px; margin-left: -10px; border: 2px solid white; border-radius: 50%; overflow: hidden; z-index: 3;">
            ${e("P2","#00CFE8")}
          </div>
          <div class="avatar" style="width: 36px; height: 36px; margin-left: -10px; border: 2px solid white; border-radius: 50%; overflow: hidden; z-index: 2;">
            ${e("P3","#FF9F43")}
          </div>
          <div class="avatar d-flex align-items-center justify-content-center" style="width: 36px; height: 36px; margin-left: -10px; border: 2px solid white; border-radius: 50%; background-color: #0C5257; z-index: 1;">
            <span class="text-white fw-semibold" style="font-size: 11px;">+45</span>
          </div>
        </div>
      </div>
    </div>
  `},a={render:()=>`
    <div>
      <h5 class="mb-4">Tamanhos</h5>
      
      <div class="d-flex flex-column gap-4">
        <!-- XS -->
        <div>
          <small class="text-muted d-block mb-2">Extra Small (24px)</small>
          <div class="d-flex">
            <div class="avatar" style="width: 24px; height: 24px; margin-left: 0; border: 2px solid white; border-radius: 50%; overflow: hidden; z-index: 4;">
              ${e("A","#7367F0")}
            </div>
            <div class="avatar" style="width: 24px; height: 24px; margin-left: -8px; border: 2px solid white; border-radius: 50%; overflow: hidden; z-index: 3;">
              ${e("B","#28C76F")}
            </div>
            <div class="avatar" style="width: 24px; height: 24px; margin-left: -8px; border: 2px solid white; border-radius: 50%; overflow: hidden; z-index: 2;">
              ${e("C","#FF9F43")}
            </div>
          </div>
        </div>
        
        <!-- SM -->
        <div>
          <small class="text-muted d-block mb-2">Small (32px)</small>
          <div class="d-flex">
            <div class="avatar" style="width: 32px; height: 32px; margin-left: 0; border: 2px solid white; border-radius: 50%; overflow: hidden; z-index: 4;">
              ${e("JS","#7367F0")}
            </div>
            <div class="avatar" style="width: 32px; height: 32px; margin-left: -10px; border: 2px solid white; border-radius: 50%; overflow: hidden; z-index: 3;">
              ${e("MC","#28C76F")}
            </div>
            <div class="avatar" style="width: 32px; height: 32px; margin-left: -10px; border: 2px solid white; border-radius: 50%; overflow: hidden; z-index: 2;">
              ${e("AB","#FF9F43")}
            </div>
          </div>
        </div>
        
        <!-- MD (default) -->
        <div>
          <small class="text-muted d-block mb-2">Medium (40px) - Padrão</small>
          <div class="d-flex">
            <div class="avatar" style="width: 40px; height: 40px; margin-left: 0; border: 2px solid white; border-radius: 50%; overflow: hidden; z-index: 4;">
              ${e("JS","#7367F0")}
            </div>
            <div class="avatar" style="width: 40px; height: 40px; margin-left: -12px; border: 2px solid white; border-radius: 50%; overflow: hidden; z-index: 3;">
              ${e("MC","#28C76F")}
            </div>
            <div class="avatar" style="width: 40px; height: 40px; margin-left: -12px; border: 2px solid white; border-radius: 50%; overflow: hidden; z-index: 2;">
              ${e("AB","#FF9F43")}
            </div>
          </div>
        </div>
        
        <!-- LG -->
        <div>
          <small class="text-muted d-block mb-2">Large (48px)</small>
          <div class="d-flex">
            <div class="avatar" style="width: 48px; height: 48px; margin-left: 0; border: 3px solid white; border-radius: 50%; overflow: hidden; z-index: 4;">
              ${e("JS","#7367F0")}
            </div>
            <div class="avatar" style="width: 48px; height: 48px; margin-left: -14px; border: 3px solid white; border-radius: 50%; overflow: hidden; z-index: 3;">
              ${e("MC","#28C76F")}
            </div>
            <div class="avatar" style="width: 48px; height: 48px; margin-left: -14px; border: 3px solid white; border-radius: 50%; overflow: hidden; z-index: 2;">
              ${e("AB","#FF9F43")}
            </div>
          </div>
        </div>
        
        <!-- XL -->
        <div>
          <small class="text-muted d-block mb-2">Extra Large (56px)</small>
          <div class="d-flex">
            <div class="avatar" style="width: 56px; height: 56px; margin-left: 0; border: 3px solid white; border-radius: 50%; overflow: hidden; z-index: 4;">
              ${e("JS","#7367F0")}
            </div>
            <div class="avatar" style="width: 56px; height: 56px; margin-left: -16px; border: 3px solid white; border-radius: 50%; overflow: hidden; z-index: 3;">
              ${e("MC","#28C76F")}
            </div>
            <div class="avatar" style="width: 56px; height: 56px; margin-left: -16px; border: 3px solid white; border-radius: 50%; overflow: hidden; z-index: 2;">
              ${e("AB","#FF9F43")}
            </div>
          </div>
        </div>
      </div>
    </div>
  `},s={render:()=>`
    <div>
      <h5 class="mb-4">Tipos de Usuários Educacross</h5>
      
      <!-- Alunos -->
      <div class="card mb-3">
        <div class="card-body d-flex align-items-center justify-content-between">
          <div>
            <h6 class="mb-0">Alunos da Turma 5ºA</h6>
            <small class="text-muted">28 alunos matriculados</small>
          </div>
          <div class="d-flex align-items-center">
            <div class="avatar" style="width: 36px; height: 36px; margin-left: 0; border: 2px solid white; border-radius: 50%; overflow: hidden; z-index: 5;">
              <img src="/vuexy/img/educacross/users/Aluno.svg" alt="Aluno" style="width: 100%; height: 100%; object-fit: cover; padding: 4px; background: #E7F8FF;">
            </div>
            <div class="avatar" style="width: 36px; height: 36px; margin-left: -10px; border: 2px solid white; border-radius: 50%; overflow: hidden; z-index: 4;">
              <img src="/vuexy/img/educacross/users/Aluno.svg" alt="Aluno" style="width: 100%; height: 100%; object-fit: cover; padding: 4px; background: #FFF3E7;">
            </div>
            <div class="avatar" style="width: 36px; height: 36px; margin-left: -10px; border: 2px solid white; border-radius: 50%; overflow: hidden; z-index: 3;">
              <img src="/vuexy/img/educacross/users/Aluno.svg" alt="Aluno" style="width: 100%; height: 100%; object-fit: cover; padding: 4px; background: #E7FFE7;">
            </div>
            <div class="avatar d-flex align-items-center justify-content-center" style="width: 36px; height: 36px; margin-left: -10px; border: 2px solid white; border-radius: 50%; background-color: #0C5257; z-index: 2;">
              <span class="text-white fw-semibold" style="font-size: 11px;">+25</span>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Professores -->
      <div class="card mb-3">
        <div class="card-body d-flex align-items-center justify-content-between">
          <div>
            <h6 class="mb-0">Professores da Escola</h6>
            <small class="text-muted">15 professores ativos</small>
          </div>
          <div class="d-flex align-items-center">
            <div class="avatar" style="width: 36px; height: 36px; margin-left: 0; border: 2px solid white; border-radius: 50%; overflow: hidden; z-index: 5;">
              <img src="/vuexy/img/educacross/users/Professor.svg" alt="Professor" style="width: 100%; height: 100%; object-fit: cover; padding: 4px; background: #FFF8E7;">
            </div>
            <div class="avatar" style="width: 36px; height: 36px; margin-left: -10px; border: 2px solid white; border-radius: 50%; overflow: hidden; z-index: 4;">
              <img src="/vuexy/img/educacross/users/Professor.svg" alt="Professor" style="width: 100%; height: 100%; object-fit: cover; padding: 4px; background: #E7F0FF;">
            </div>
            <div class="avatar" style="width: 36px; height: 36px; margin-left: -10px; border: 2px solid white; border-radius: 50%; overflow: hidden; z-index: 3;">
              <img src="/vuexy/img/educacross/users/Professor.svg" alt="Professor" style="width: 100%; height: 100%; object-fit: cover; padding: 4px; background: #FFE7F0;">
            </div>
            <div class="avatar d-flex align-items-center justify-content-center" style="width: 36px; height: 36px; margin-left: -10px; border: 2px solid white; border-radius: 50%; background-color: #FAB84A; z-index: 2;">
              <span class="text-dark fw-semibold" style="font-size: 11px;">+12</span>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Mix de usuários -->
      <div class="card">
        <div class="card-body d-flex align-items-center justify-content-between">
          <div>
            <h6 class="mb-0">Equipe Pedagógica</h6>
            <small class="text-muted">Coordenadores, Diretores, Gestores</small>
          </div>
          <div class="d-flex align-items-center">
            <div class="avatar" style="width: 36px; height: 36px; margin-left: 0; border: 2px solid white; border-radius: 50%; overflow: hidden; z-index: 4; background: #f0f0f0;">
              <img src="/vuexy/img/educacross/users/Coordenadores.svg" alt="Coordenador" style="width: 100%; height: 100%; object-fit: cover; padding: 4px;">
            </div>
            <div class="avatar" style="width: 36px; height: 36px; margin-left: -10px; border: 2px solid white; border-radius: 50%; overflow: hidden; z-index: 3; background: #f0f0f0;">
              <img src="/vuexy/img/educacross/users/Diretor.svg" alt="Diretor" style="width: 100%; height: 100%; object-fit: cover; padding: 4px;">
            </div>
            <div class="avatar" style="width: 36px; height: 36px; margin-left: -10px; border: 2px solid white; border-radius: 50%; overflow: hidden; z-index: 2; background: #f0f0f0;">
              <img src="/vuexy/img/educacross/users/Gestor de rede.svg" alt="Gestor" style="width: 100%; height: 100%; object-fit: cover; padding: 4px;">
            </div>
          </div>
        </div>
      </div>
    </div>
  `},r={render:()=>`
    <div style="max-width: 500px;">
      <h5 class="mb-4">Casos de Uso</h5>
      
      <!-- Participantes de um evento -->
      <div class="card mb-3">
        <div class="card-header d-flex justify-content-between align-items-center">
          <span><i class="bi bi-calendar-event me-2"></i>Olimpíada de Matemática</span>
          <span class="badge bg-success">Ativo</span>
        </div>
        <div class="card-body">
          <div class="d-flex align-items-center justify-content-between">
            <div class="d-flex align-items-center">
              <div class="avatar" style="width: 32px; height: 32px; border: 2px solid white; border-radius: 50%; overflow: hidden; z-index: 5;">
                ${e("JS","#0C5257")}
              </div>
              <div class="avatar" style="width: 32px; height: 32px; margin-left: -8px; border: 2px solid white; border-radius: 50%; overflow: hidden; z-index: 4;">
                ${e("MC","#FAB84A")}
              </div>
              <div class="avatar" style="width: 32px; height: 32px; margin-left: -8px; border: 2px solid white; border-radius: 50%; overflow: hidden; z-index: 3;">
                ${e("AB","#CF4343")}
              </div>
              <div class="avatar d-flex align-items-center justify-content-center" style="width: 32px; height: 32px; margin-left: -8px; border: 2px solid white; border-radius: 50%; background-color: #e9ecef; z-index: 2;">
                <span class="text-muted fw-semibold" style="font-size: 10px;">+127</span>
              </div>
              <span class="ms-2 small text-muted">participantes</span>
            </div>
            <button class="btn btn-sm btn-outline-primary">Ver todos</button>
          </div>
        </div>
      </div>
      
      <!-- Ranking/Leaderboard -->
      <div class="card mb-3">
        <div class="card-header">
          <i class="bi bi-trophy-fill text-warning me-2"></i>Top 3 da Turma
        </div>
        <div class="card-body p-0">
          <div class="list-group list-group-flush">
            <div class="list-group-item d-flex align-items-center gap-3">
              <span class="badge rounded-pill" style="background: linear-gradient(45deg, #FFD700, #FFA500); color: #000; width: 24px;">1º</span>
              <div class="avatar" style="width: 40px; height: 40px; border-radius: 50%; overflow: hidden;">
                ${e("MA","#FFD700")}
              </div>
              <div class="flex-grow-1">
                <strong>Maria Alves</strong>
                <small class="text-muted d-block">2.450 pontos</small>
              </div>
              <img src="/vuexy/img/educacross/gamification/Troféu-Ouro.svg" alt="Ouro" style="width: 28px;">
            </div>
            <div class="list-group-item d-flex align-items-center gap-3">
              <span class="badge rounded-pill bg-secondary" style="width: 24px;">2º</span>
              <div class="avatar" style="width: 40px; height: 40px; border-radius: 50%; overflow: hidden;">
                ${e("JC","#C0C0C0")}
              </div>
              <div class="flex-grow-1">
                <strong>João Carlos</strong>
                <small class="text-muted d-block">2.180 pontos</small>
              </div>
              <img src="/vuexy/img/educacross/gamification/Trofeu-Prata.svg" alt="Prata" style="width: 28px;">
            </div>
            <div class="list-group-item d-flex align-items-center gap-3">
              <span class="badge rounded-pill" style="background: #CD7F32; width: 24px;">3º</span>
              <div class="avatar" style="width: 40px; height: 40px; border-radius: 50%; overflow: hidden;">
                ${e("LS","#CD7F32")}
              </div>
              <div class="flex-grow-1">
                <strong>Lucas Silva</strong>
                <small class="text-muted d-block">1.950 pontos</small>
              </div>
              <img src="/vuexy/img/educacross/gamification/Trofeu-bronze.svg" alt="Bronze" style="width: 28px;">
            </div>
          </div>
        </div>
      </div>
      
      <!-- Notificação/Activity -->
      <div class="alert alert-info d-flex align-items-center gap-2 mb-0">
        <div class="d-flex">
          <div class="avatar" style="width: 28px; height: 28px; border: 2px solid white; border-radius: 50%; overflow: hidden; z-index: 3;">
            ${e("A","#28C76F")}
          </div>
          <div class="avatar" style="width: 28px; height: 28px; margin-left: -8px; border: 2px solid white; border-radius: 50%; overflow: hidden; z-index: 2;">
            ${e("B","#FF9F43")}
          </div>
          <div class="avatar" style="width: 28px; height: 28px; margin-left: -8px; border: 2px solid white; border-radius: 50%; overflow: hidden; z-index: 1;">
            ${e("C","#7367F0")}
          </div>
        </div>
        <span class="small">3 alunos completaram a atividade agora</span>
      </div>
    </div>
  `};var t,l,o,n,v;d.parameters={...d.parameters,docs:{...(t=d.parameters)==null?void 0:t.docs,source:{originalSource:`{
  render: () => \`
    <div>
      <h5 class="mb-4">Avatar Group - Básico</h5>
      
      <div class="d-flex">
        <div class="avatar-group">
          <div class="avatar" style="width: 40px; height: 40px; margin-left: -10px; border: 2px solid white; border-radius: 50%; overflow: hidden;">
            \${avatarPlaceholder('JS', '#7367F0')}
          </div>
          <div class="avatar" style="width: 40px; height: 40px; margin-left: -10px; border: 2px solid white; border-radius: 50%; overflow: hidden;">
            \${avatarPlaceholder('MC', '#28C76F')}
          </div>
          <div class="avatar" style="width: 40px; height: 40px; margin-left: -10px; border: 2px solid white; border-radius: 50%; overflow: hidden;">
            \${avatarPlaceholder('AB', '#FF9F43')}
          </div>
          <div class="avatar" style="width: 40px; height: 40px; margin-left: -10px; border: 2px solid white; border-radius: 50%; overflow: hidden;">
            \${avatarPlaceholder('LF', '#EA5455')}
          </div>
        </div>
      </div>
      
      <p class="text-muted mt-3">
        <small>Avatares empilhados com sobreposição de 10px</small>
      </p>
    </div>
  \`
}`,...(o=(l=d.parameters)==null?void 0:l.docs)==null?void 0:o.source},description:{story:"Default - Grupo básico de avatares",...(v=(n=d.parameters)==null?void 0:n.docs)==null?void 0:v.description}}};var c,x,h,p,g;i.parameters={...i.parameters,docs:{...(c=i.parameters)==null?void 0:c.docs,source:{originalSource:`{
  render: () => \`
    <div>
      <h5 class="mb-4">Com Contador de Excedentes</h5>
      
      <div class="d-flex align-items-center">
        <div class="avatar-group d-flex">
          <div class="avatar" style="width: 40px; height: 40px; margin-left: 0; border: 2px solid white; border-radius: 50%; overflow: hidden; z-index: 5;">
            \${avatarPlaceholder('JS', '#0C5257')}
          </div>
          <div class="avatar" style="width: 40px; height: 40px; margin-left: -12px; border: 2px solid white; border-radius: 50%; overflow: hidden; z-index: 4;">
            \${avatarPlaceholder('MC', '#28C76F')}
          </div>
          <div class="avatar" style="width: 40px; height: 40px; margin-left: -12px; border: 2px solid white; border-radius: 50%; overflow: hidden; z-index: 3;">
            \${avatarPlaceholder('AB', '#FAB84A')}
          </div>
          <div class="avatar" style="width: 40px; height: 40px; margin-left: -12px; border: 2px solid white; border-radius: 50%; overflow: hidden; z-index: 2;">
            \${avatarPlaceholder('LF', '#CF4343')}
          </div>
          <div class="avatar d-flex align-items-center justify-content-center" style="width: 40px; height: 40px; margin-left: -12px; border: 2px solid white; border-radius: 50%; background-color: #e9ecef; z-index: 1;">
            <span class="text-muted fw-semibold" style="font-size: 12px;">+8</span>
          </div>
        </div>
        <span class="ms-2 text-muted small">12 alunos na turma</span>
      </div>
      
      <hr class="my-4">
      
      <h6>Exemplo com muitos excedentes</h6>
      <div class="d-flex align-items-center">
        <div class="avatar-group d-flex">
          <div class="avatar" style="width: 36px; height: 36px; margin-left: 0; border: 2px solid white; border-radius: 50%; overflow: hidden; z-index: 4;">
            \${avatarPlaceholder('P1', '#7367F0')}
          </div>
          <div class="avatar" style="width: 36px; height: 36px; margin-left: -10px; border: 2px solid white; border-radius: 50%; overflow: hidden; z-index: 3;">
            \${avatarPlaceholder('P2', '#00CFE8')}
          </div>
          <div class="avatar" style="width: 36px; height: 36px; margin-left: -10px; border: 2px solid white; border-radius: 50%; overflow: hidden; z-index: 2;">
            \${avatarPlaceholder('P3', '#FF9F43')}
          </div>
          <div class="avatar d-flex align-items-center justify-content-center" style="width: 36px; height: 36px; margin-left: -10px; border: 2px solid white; border-radius: 50%; background-color: #0C5257; z-index: 1;">
            <span class="text-white fw-semibold" style="font-size: 11px;">+45</span>
          </div>
        </div>
      </div>
    </div>
  \`
}`,...(h=(x=i.parameters)==null?void 0:x.docs)==null?void 0:h.source},description:{story:"WithCount - Com contador de excedentes",...(g=(p=i.parameters)==null?void 0:p.docs)==null?void 0:g.description}}};var m,u,f,b,w;a.parameters={...a.parameters,docs:{...(m=a.parameters)==null?void 0:m.docs,source:{originalSource:`{
  render: () => \`
    <div>
      <h5 class="mb-4">Tamanhos</h5>
      
      <div class="d-flex flex-column gap-4">
        <!-- XS -->
        <div>
          <small class="text-muted d-block mb-2">Extra Small (24px)</small>
          <div class="d-flex">
            <div class="avatar" style="width: 24px; height: 24px; margin-left: 0; border: 2px solid white; border-radius: 50%; overflow: hidden; z-index: 4;">
              \${avatarPlaceholder('A', '#7367F0')}
            </div>
            <div class="avatar" style="width: 24px; height: 24px; margin-left: -8px; border: 2px solid white; border-radius: 50%; overflow: hidden; z-index: 3;">
              \${avatarPlaceholder('B', '#28C76F')}
            </div>
            <div class="avatar" style="width: 24px; height: 24px; margin-left: -8px; border: 2px solid white; border-radius: 50%; overflow: hidden; z-index: 2;">
              \${avatarPlaceholder('C', '#FF9F43')}
            </div>
          </div>
        </div>
        
        <!-- SM -->
        <div>
          <small class="text-muted d-block mb-2">Small (32px)</small>
          <div class="d-flex">
            <div class="avatar" style="width: 32px; height: 32px; margin-left: 0; border: 2px solid white; border-radius: 50%; overflow: hidden; z-index: 4;">
              \${avatarPlaceholder('JS', '#7367F0')}
            </div>
            <div class="avatar" style="width: 32px; height: 32px; margin-left: -10px; border: 2px solid white; border-radius: 50%; overflow: hidden; z-index: 3;">
              \${avatarPlaceholder('MC', '#28C76F')}
            </div>
            <div class="avatar" style="width: 32px; height: 32px; margin-left: -10px; border: 2px solid white; border-radius: 50%; overflow: hidden; z-index: 2;">
              \${avatarPlaceholder('AB', '#FF9F43')}
            </div>
          </div>
        </div>
        
        <!-- MD (default) -->
        <div>
          <small class="text-muted d-block mb-2">Medium (40px) - Padrão</small>
          <div class="d-flex">
            <div class="avatar" style="width: 40px; height: 40px; margin-left: 0; border: 2px solid white; border-radius: 50%; overflow: hidden; z-index: 4;">
              \${avatarPlaceholder('JS', '#7367F0')}
            </div>
            <div class="avatar" style="width: 40px; height: 40px; margin-left: -12px; border: 2px solid white; border-radius: 50%; overflow: hidden; z-index: 3;">
              \${avatarPlaceholder('MC', '#28C76F')}
            </div>
            <div class="avatar" style="width: 40px; height: 40px; margin-left: -12px; border: 2px solid white; border-radius: 50%; overflow: hidden; z-index: 2;">
              \${avatarPlaceholder('AB', '#FF9F43')}
            </div>
          </div>
        </div>
        
        <!-- LG -->
        <div>
          <small class="text-muted d-block mb-2">Large (48px)</small>
          <div class="d-flex">
            <div class="avatar" style="width: 48px; height: 48px; margin-left: 0; border: 3px solid white; border-radius: 50%; overflow: hidden; z-index: 4;">
              \${avatarPlaceholder('JS', '#7367F0')}
            </div>
            <div class="avatar" style="width: 48px; height: 48px; margin-left: -14px; border: 3px solid white; border-radius: 50%; overflow: hidden; z-index: 3;">
              \${avatarPlaceholder('MC', '#28C76F')}
            </div>
            <div class="avatar" style="width: 48px; height: 48px; margin-left: -14px; border: 3px solid white; border-radius: 50%; overflow: hidden; z-index: 2;">
              \${avatarPlaceholder('AB', '#FF9F43')}
            </div>
          </div>
        </div>
        
        <!-- XL -->
        <div>
          <small class="text-muted d-block mb-2">Extra Large (56px)</small>
          <div class="d-flex">
            <div class="avatar" style="width: 56px; height: 56px; margin-left: 0; border: 3px solid white; border-radius: 50%; overflow: hidden; z-index: 4;">
              \${avatarPlaceholder('JS', '#7367F0')}
            </div>
            <div class="avatar" style="width: 56px; height: 56px; margin-left: -16px; border: 3px solid white; border-radius: 50%; overflow: hidden; z-index: 3;">
              \${avatarPlaceholder('MC', '#28C76F')}
            </div>
            <div class="avatar" style="width: 56px; height: 56px; margin-left: -16px; border: 3px solid white; border-radius: 50%; overflow: hidden; z-index: 2;">
              \${avatarPlaceholder('AB', '#FF9F43')}
            </div>
          </div>
        </div>
      </div>
    </div>
  \`
}`,...(f=(u=a.parameters)==null?void 0:u.docs)==null?void 0:f.source},description:{story:"Sizes - Tamanhos diferentes",...(w=(b=a.parameters)==null?void 0:b.docs)==null?void 0:w.description}}};var y,F,z,C,A;s.parameters={...s.parameters,docs:{...(y=s.parameters)==null?void 0:y.docs,source:{originalSource:`{
  render: () => \`
    <div>
      <h5 class="mb-4">Tipos de Usuários Educacross</h5>
      
      <!-- Alunos -->
      <div class="card mb-3">
        <div class="card-body d-flex align-items-center justify-content-between">
          <div>
            <h6 class="mb-0">Alunos da Turma 5ºA</h6>
            <small class="text-muted">28 alunos matriculados</small>
          </div>
          <div class="d-flex align-items-center">
            <div class="avatar" style="width: 36px; height: 36px; margin-left: 0; border: 2px solid white; border-radius: 50%; overflow: hidden; z-index: 5;">
              <img src="/vuexy/img/educacross/users/Aluno.svg" alt="Aluno" style="width: 100%; height: 100%; object-fit: cover; padding: 4px; background: #E7F8FF;">
            </div>
            <div class="avatar" style="width: 36px; height: 36px; margin-left: -10px; border: 2px solid white; border-radius: 50%; overflow: hidden; z-index: 4;">
              <img src="/vuexy/img/educacross/users/Aluno.svg" alt="Aluno" style="width: 100%; height: 100%; object-fit: cover; padding: 4px; background: #FFF3E7;">
            </div>
            <div class="avatar" style="width: 36px; height: 36px; margin-left: -10px; border: 2px solid white; border-radius: 50%; overflow: hidden; z-index: 3;">
              <img src="/vuexy/img/educacross/users/Aluno.svg" alt="Aluno" style="width: 100%; height: 100%; object-fit: cover; padding: 4px; background: #E7FFE7;">
            </div>
            <div class="avatar d-flex align-items-center justify-content-center" style="width: 36px; height: 36px; margin-left: -10px; border: 2px solid white; border-radius: 50%; background-color: #0C5257; z-index: 2;">
              <span class="text-white fw-semibold" style="font-size: 11px;">+25</span>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Professores -->
      <div class="card mb-3">
        <div class="card-body d-flex align-items-center justify-content-between">
          <div>
            <h6 class="mb-0">Professores da Escola</h6>
            <small class="text-muted">15 professores ativos</small>
          </div>
          <div class="d-flex align-items-center">
            <div class="avatar" style="width: 36px; height: 36px; margin-left: 0; border: 2px solid white; border-radius: 50%; overflow: hidden; z-index: 5;">
              <img src="/vuexy/img/educacross/users/Professor.svg" alt="Professor" style="width: 100%; height: 100%; object-fit: cover; padding: 4px; background: #FFF8E7;">
            </div>
            <div class="avatar" style="width: 36px; height: 36px; margin-left: -10px; border: 2px solid white; border-radius: 50%; overflow: hidden; z-index: 4;">
              <img src="/vuexy/img/educacross/users/Professor.svg" alt="Professor" style="width: 100%; height: 100%; object-fit: cover; padding: 4px; background: #E7F0FF;">
            </div>
            <div class="avatar" style="width: 36px; height: 36px; margin-left: -10px; border: 2px solid white; border-radius: 50%; overflow: hidden; z-index: 3;">
              <img src="/vuexy/img/educacross/users/Professor.svg" alt="Professor" style="width: 100%; height: 100%; object-fit: cover; padding: 4px; background: #FFE7F0;">
            </div>
            <div class="avatar d-flex align-items-center justify-content-center" style="width: 36px; height: 36px; margin-left: -10px; border: 2px solid white; border-radius: 50%; background-color: #FAB84A; z-index: 2;">
              <span class="text-dark fw-semibold" style="font-size: 11px;">+12</span>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Mix de usuários -->
      <div class="card">
        <div class="card-body d-flex align-items-center justify-content-between">
          <div>
            <h6 class="mb-0">Equipe Pedagógica</h6>
            <small class="text-muted">Coordenadores, Diretores, Gestores</small>
          </div>
          <div class="d-flex align-items-center">
            <div class="avatar" style="width: 36px; height: 36px; margin-left: 0; border: 2px solid white; border-radius: 50%; overflow: hidden; z-index: 4; background: #f0f0f0;">
              <img src="/vuexy/img/educacross/users/Coordenadores.svg" alt="Coordenador" style="width: 100%; height: 100%; object-fit: cover; padding: 4px;">
            </div>
            <div class="avatar" style="width: 36px; height: 36px; margin-left: -10px; border: 2px solid white; border-radius: 50%; overflow: hidden; z-index: 3; background: #f0f0f0;">
              <img src="/vuexy/img/educacross/users/Diretor.svg" alt="Diretor" style="width: 100%; height: 100%; object-fit: cover; padding: 4px;">
            </div>
            <div class="avatar" style="width: 36px; height: 36px; margin-left: -10px; border: 2px solid white; border-radius: 50%; overflow: hidden; z-index: 2; background: #f0f0f0;">
              <img src="/vuexy/img/educacross/users/Gestor de rede.svg" alt="Gestor" style="width: 100%; height: 100%; object-fit: cover; padding: 4px;">
            </div>
          </div>
        </div>
      </div>
    </div>
  \`
}`,...(z=(F=s.parameters)==null?void 0:F.docs)==null?void 0:z.source},description:{story:"UserTypes - Tipos de usuários Educacross",...(A=(C=s.parameters)==null?void 0:C.docs)==null?void 0:A.description}}};var $,P,k,E,j;r.parameters={...r.parameters,docs:{...($=r.parameters)==null?void 0:$.docs,source:{originalSource:`{
  render: () => \`
    <div style="max-width: 500px;">
      <h5 class="mb-4">Casos de Uso</h5>
      
      <!-- Participantes de um evento -->
      <div class="card mb-3">
        <div class="card-header d-flex justify-content-between align-items-center">
          <span><i class="bi bi-calendar-event me-2"></i>Olimpíada de Matemática</span>
          <span class="badge bg-success">Ativo</span>
        </div>
        <div class="card-body">
          <div class="d-flex align-items-center justify-content-between">
            <div class="d-flex align-items-center">
              <div class="avatar" style="width: 32px; height: 32px; border: 2px solid white; border-radius: 50%; overflow: hidden; z-index: 5;">
                \${avatarPlaceholder('JS', '#0C5257')}
              </div>
              <div class="avatar" style="width: 32px; height: 32px; margin-left: -8px; border: 2px solid white; border-radius: 50%; overflow: hidden; z-index: 4;">
                \${avatarPlaceholder('MC', '#FAB84A')}
              </div>
              <div class="avatar" style="width: 32px; height: 32px; margin-left: -8px; border: 2px solid white; border-radius: 50%; overflow: hidden; z-index: 3;">
                \${avatarPlaceholder('AB', '#CF4343')}
              </div>
              <div class="avatar d-flex align-items-center justify-content-center" style="width: 32px; height: 32px; margin-left: -8px; border: 2px solid white; border-radius: 50%; background-color: #e9ecef; z-index: 2;">
                <span class="text-muted fw-semibold" style="font-size: 10px;">+127</span>
              </div>
              <span class="ms-2 small text-muted">participantes</span>
            </div>
            <button class="btn btn-sm btn-outline-primary">Ver todos</button>
          </div>
        </div>
      </div>
      
      <!-- Ranking/Leaderboard -->
      <div class="card mb-3">
        <div class="card-header">
          <i class="bi bi-trophy-fill text-warning me-2"></i>Top 3 da Turma
        </div>
        <div class="card-body p-0">
          <div class="list-group list-group-flush">
            <div class="list-group-item d-flex align-items-center gap-3">
              <span class="badge rounded-pill" style="background: linear-gradient(45deg, #FFD700, #FFA500); color: #000; width: 24px;">1º</span>
              <div class="avatar" style="width: 40px; height: 40px; border-radius: 50%; overflow: hidden;">
                \${avatarPlaceholder('MA', '#FFD700')}
              </div>
              <div class="flex-grow-1">
                <strong>Maria Alves</strong>
                <small class="text-muted d-block">2.450 pontos</small>
              </div>
              <img src="/vuexy/img/educacross/gamification/Troféu-Ouro.svg" alt="Ouro" style="width: 28px;">
            </div>
            <div class="list-group-item d-flex align-items-center gap-3">
              <span class="badge rounded-pill bg-secondary" style="width: 24px;">2º</span>
              <div class="avatar" style="width: 40px; height: 40px; border-radius: 50%; overflow: hidden;">
                \${avatarPlaceholder('JC', '#C0C0C0')}
              </div>
              <div class="flex-grow-1">
                <strong>João Carlos</strong>
                <small class="text-muted d-block">2.180 pontos</small>
              </div>
              <img src="/vuexy/img/educacross/gamification/Trofeu-Prata.svg" alt="Prata" style="width: 28px;">
            </div>
            <div class="list-group-item d-flex align-items-center gap-3">
              <span class="badge rounded-pill" style="background: #CD7F32; width: 24px;">3º</span>
              <div class="avatar" style="width: 40px; height: 40px; border-radius: 50%; overflow: hidden;">
                \${avatarPlaceholder('LS', '#CD7F32')}
              </div>
              <div class="flex-grow-1">
                <strong>Lucas Silva</strong>
                <small class="text-muted d-block">1.950 pontos</small>
              </div>
              <img src="/vuexy/img/educacross/gamification/Trofeu-bronze.svg" alt="Bronze" style="width: 28px;">
            </div>
          </div>
        </div>
      </div>
      
      <!-- Notificação/Activity -->
      <div class="alert alert-info d-flex align-items-center gap-2 mb-0">
        <div class="d-flex">
          <div class="avatar" style="width: 28px; height: 28px; border: 2px solid white; border-radius: 50%; overflow: hidden; z-index: 3;">
            \${avatarPlaceholder('A', '#28C76F')}
          </div>
          <div class="avatar" style="width: 28px; height: 28px; margin-left: -8px; border: 2px solid white; border-radius: 50%; overflow: hidden; z-index: 2;">
            \${avatarPlaceholder('B', '#FF9F43')}
          </div>
          <div class="avatar" style="width: 28px; height: 28px; margin-left: -8px; border: 2px solid white; border-radius: 50%; overflow: hidden; z-index: 1;">
            \${avatarPlaceholder('C', '#7367F0')}
          </div>
        </div>
        <span class="small">3 alunos completaram a atividade agora</span>
      </div>
    </div>
  \`
}`,...(k=(P=r.parameters)==null?void 0:P.docs)==null?void 0:k.source},description:{story:"UseCases - Casos de uso no sistema",...(j=(E=r.parameters)==null?void 0:E.docs)==null?void 0:j.description}}};const T=["Default","WithCount","Sizes","UserTypes","UseCases"];export{d as Default,a as Sizes,r as UseCases,s as UserTypes,i as WithCount,T as __namedExportsOrder,M as default};
