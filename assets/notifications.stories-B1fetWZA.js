const S={title:"Educacross/Components/Notifications",parameters:{layout:"padded",docs:{description:{component:`
## Notification System

Sistema completo de notificações para feedback do usuário.

### Uso no Educacross
- **Sucesso**: Ações completadas (aluno cadastrado, dados salvos)
- **Erro**: Falhas de validação ou sistema
- **Aviso**: Alertas importantes
- **Info**: Informações contextuais

### Tipos
- Toast notifications (temporárias)
- Banners (persistentes)
- Inline alerts
- Notification center
        `}}}},s={name:"📍 Posições de Toast",render:()=>`
    <div class="position-relative bg-light rounded" style="height: 400px;">
      <!-- Top Left -->
      <div class="position-absolute top-0 start-0 p-3">
        <div class="toast show" role="alert">
          <div class="toast-header">
            <i class="bi bi-info-circle text-primary me-2"></i>
            <strong class="me-auto">Top Left</strong>
            <small>Agora</small>
            <button type="button" class="btn-close btn-close-sm"></button>
          </div>
          <div class="toast-body">
            Toast no canto superior esquerdo.
          </div>
        </div>
      </div>
      
      <!-- Top Right -->
      <div class="position-absolute top-0 end-0 p-3">
        <div class="toast show border-start border-success border-3" role="alert">
          <div class="toast-header">
            <i class="bi bi-check-circle text-success me-2"></i>
            <strong class="me-auto">Top Right</strong>
            <small>Agora</small>
            <button type="button" class="btn-close btn-close-sm"></button>
          </div>
          <div class="toast-body">
            Posição mais comum para notificações.
          </div>
        </div>
      </div>
      
      <!-- Bottom Left -->
      <div class="position-absolute bottom-0 start-0 p-3">
        <div class="toast show" role="alert">
          <div class="toast-body d-flex align-items-center gap-2">
            <i class="bi bi-download text-primary"></i>
            <span>Baixando relatório...</span>
            <div class="spinner-border spinner-border-sm ms-auto"></div>
          </div>
        </div>
      </div>
      
      <!-- Bottom Right -->
      <div class="position-absolute bottom-0 end-0 p-3">
        <div class="toast show border-start border-danger border-3" role="alert">
          <div class="toast-header">
            <i class="bi bi-exclamation-circle text-danger me-2"></i>
            <strong class="me-auto">Bottom Right</strong>
            <button type="button" class="btn-close btn-close-sm"></button>
          </div>
          <div class="toast-body">
            Toast no canto inferior direito.
          </div>
        </div>
      </div>
      
      <!-- Center info -->
      <div class="position-absolute top-50 start-50 translate-middle text-center text-muted">
        <i class="bi bi-arrows-move fs-1"></i>
        <p class="mb-0 mt-2">Toasts podem aparecer em qualquer canto</p>
      </div>
    </div>
  `},a={name:"🔔 Tipos de Toast",render:()=>`
    <div class="d-flex flex-column gap-3" style="max-width: 350px;">
      <!-- Success -->
      <div class="toast show border-start border-success border-3" role="alert">
        <div class="toast-header">
          <i class="bi bi-check-circle-fill text-success me-2"></i>
          <strong class="me-auto">Sucesso</strong>
          <small class="text-muted">Agora</small>
          <button type="button" class="btn-close btn-close-sm"></button>
        </div>
        <div class="toast-body">
          Aluno cadastrado com sucesso!
        </div>
      </div>
      
      <!-- Error -->
      <div class="toast show border-start border-danger border-3" role="alert">
        <div class="toast-header">
          <i class="bi bi-x-circle-fill text-danger me-2"></i>
          <strong class="me-auto">Erro</strong>
          <small class="text-muted">Agora</small>
          <button type="button" class="btn-close btn-close-sm"></button>
        </div>
        <div class="toast-body">
          Não foi possível salvar os dados. Tente novamente.
        </div>
      </div>
      
      <!-- Warning -->
      <div class="toast show border-start border-warning border-3" role="alert">
        <div class="toast-header">
          <i class="bi bi-exclamation-triangle-fill text-warning me-2"></i>
          <strong class="me-auto">Atenção</strong>
          <small class="text-muted">5 min</small>
          <button type="button" class="btn-close btn-close-sm"></button>
        </div>
        <div class="toast-body">
          Sua sessão expira em 5 minutos.
        </div>
      </div>
      
      <!-- Info -->
      <div class="toast show border-start border-info border-3" role="alert">
        <div class="toast-header">
          <i class="bi bi-info-circle-fill text-info me-2"></i>
          <strong class="me-auto">Informação</strong>
          <small class="text-muted">Agora</small>
          <button type="button" class="btn-close btn-close-sm"></button>
        </div>
        <div class="toast-body">
          Novos jogos estão disponíveis para sua turma.
        </div>
      </div>
    </div>
  `},t={name:"🎯 Toast com Ações",render:()=>`
    <div class="d-flex flex-column gap-3" style="max-width: 380px;">
      <!-- Undo action -->
      <div class="toast show" role="alert">
        <div class="toast-body d-flex align-items-center justify-content-between gap-3">
          <div class="d-flex align-items-center gap-2">
            <i class="bi bi-trash text-danger"></i>
            <span>Aluno removido da turma</span>
          </div>
          <button class="btn btn-sm btn-link text-primary p-0">Desfazer</button>
        </div>
      </div>
      
      <!-- With progress -->
      <div class="toast show" role="alert">
        <div class="toast-header">
          <i class="bi bi-cloud-upload text-primary me-2"></i>
          <strong class="me-auto">Enviando arquivo</strong>
          <small>75%</small>
        </div>
        <div class="toast-body">
          <div class="progress" style="height: 4px;">
            <div class="progress-bar" style="width: 75%"></div>
          </div>
          <small class="text-muted mt-1 d-block">relatorio-turma.pdf</small>
        </div>
      </div>
      
      <!-- Confirm action -->
      <div class="toast show border-start border-warning border-3" role="alert">
        <div class="toast-header">
          <i class="bi bi-question-circle text-warning me-2"></i>
          <strong class="me-auto">Confirmar ação</strong>
          <button type="button" class="btn-close btn-close-sm"></button>
        </div>
        <div class="toast-body">
          <p class="mb-3">Deseja enviar o relatório por e-mail para todos os responsáveis?</p>
          <div class="d-flex gap-2">
            <button class="btn btn-sm btn-primary">Enviar</button>
            <button class="btn btn-sm btn-outline-secondary">Cancelar</button>
          </div>
        </div>
      </div>
      
      <!-- Achievement -->
      <div class="toast show bg-gradient" role="alert" style="background: linear-gradient(135deg, #7367f0 0%, #9e95f5 100%);">
        <div class="toast-body text-white d-flex align-items-center gap-3">
          <span class="fs-2">🏆</span>
          <div>
            <div class="fw-bold">Conquista Desbloqueada!</div>
            <small class="opacity-75">Turma atingiu 100% de participação</small>
          </div>
        </div>
      </div>
    </div>
  `},e={name:"📬 Central de Notificações",render:()=>`
    <div class="card" style="max-width: 400px;">
      <div class="card-header d-flex justify-content-between align-items-center">
        <h6 class="mb-0">
          <i class="bi bi-bell me-2"></i>
          Notificações
        </h6>
        <div class="d-flex align-items-center gap-2">
          <span class="badge bg-primary rounded-pill">5 novas</span>
          <a href="#" class="small text-primary">Marcar todas como lidas</a>
        </div>
      </div>
      
      <div class="list-group list-group-flush" style="max-height: 400px; overflow-y: auto;">
        <!-- Não lida -->
        <a href="#" class="list-group-item list-group-item-action bg-primary bg-opacity-10">
          <div class="d-flex gap-3">
            <div class="flex-shrink-0">
              <span class="avatar avatar-sm bg-success rounded-circle">
                <i class="bi bi-person-plus text-white"></i>
              </span>
            </div>
            <div class="flex-grow-1">
              <div class="d-flex justify-content-between">
                <strong class="small">Novo aluno cadastrado</strong>
                <small class="text-muted">2 min</small>
              </div>
              <p class="mb-0 small text-muted">
                Maria Silva foi adicionada ao 5º Ano A
              </p>
            </div>
          </div>
        </a>
        
        <!-- Não lida - conquista -->
        <a href="#" class="list-group-item list-group-item-action bg-primary bg-opacity-10">
          <div class="d-flex gap-3">
            <div class="flex-shrink-0">
              <span class="avatar avatar-sm bg-warning rounded-circle">
                <i class="bi bi-trophy text-white"></i>
              </span>
            </div>
            <div class="flex-grow-1">
              <div class="d-flex justify-content-between">
                <strong class="small">Meta alcançada!</strong>
                <small class="text-muted">15 min</small>
              </div>
              <p class="mb-0 small text-muted">
                A turma 5º Ano A atingiu 80% de desempenho
              </p>
            </div>
          </div>
        </a>
        
        <!-- Lida -->
        <a href="#" class="list-group-item list-group-item-action">
          <div class="d-flex gap-3">
            <div class="flex-shrink-0">
              <span class="avatar avatar-sm bg-info rounded-circle">
                <i class="bi bi-controller text-white"></i>
              </span>
            </div>
            <div class="flex-grow-1">
              <div class="d-flex justify-content-between">
                <span class="small">Novos jogos disponíveis</span>
                <small class="text-muted">1h</small>
              </div>
              <p class="mb-0 small text-muted">
                3 novos jogos de matemática foram liberados
              </p>
            </div>
          </div>
        </a>
        
        <!-- Lida -->
        <a href="#" class="list-group-item list-group-item-action">
          <div class="d-flex gap-3">
            <div class="flex-shrink-0">
              <span class="avatar avatar-sm bg-primary rounded-circle">
                <i class="bi bi-file-earmark-text text-white"></i>
              </span>
            </div>
            <div class="flex-grow-1">
              <div class="d-flex justify-content-between">
                <span class="small">Relatório gerado</span>
                <small class="text-muted">3h</small>
              </div>
              <p class="mb-0 small text-muted">
                Seu relatório mensal está pronto para download
              </p>
            </div>
          </div>
        </a>
        
        <!-- Lida -->
        <a href="#" class="list-group-item list-group-item-action">
          <div class="d-flex gap-3">
            <div class="flex-shrink-0">
              <span class="avatar avatar-sm bg-secondary rounded-circle">
                <i class="bi bi-megaphone text-white"></i>
              </span>
            </div>
            <div class="flex-grow-1">
              <div class="d-flex justify-content-between">
                <span class="small">Manutenção programada</span>
                <small class="text-muted">Ontem</small>
              </div>
              <p class="mb-0 small text-muted">
                O sistema ficará indisponível das 2h às 4h
              </p>
            </div>
          </div>
        </a>
      </div>
      
      <div class="card-footer text-center">
        <a href="#" class="small text-primary">Ver todas as notificações</a>
      </div>
    </div>
  `},i={name:"📝 Mensagens Inline",render:()=>`
    <div class="d-flex flex-column gap-4" style="max-width: 500px;">
      <!-- Em formulário -->
      <div class="card">
        <div class="card-header">
          <h6 class="mb-0">Cadastro de Aluno</h6>
        </div>
        <div class="card-body">
          <!-- Alert de erro -->
          <div class="alert alert-danger d-flex align-items-start gap-2 mb-4">
            <i class="bi bi-exclamation-circle-fill mt-1"></i>
            <div>
              <strong>Erro ao salvar</strong>
              <ul class="mb-0 ps-3 mt-1">
                <li>O campo nome é obrigatório</li>
                <li>E-mail inválido</li>
              </ul>
            </div>
          </div>
          
          <div class="mb-3">
            <label class="form-label">Nome</label>
            <input type="text" class="form-control is-invalid">
            <div class="invalid-feedback">
              <i class="bi bi-exclamation-circle me-1"></i>
              Campo obrigatório
            </div>
          </div>
          
          <div class="mb-3">
            <label class="form-label">E-mail</label>
            <input type="email" class="form-control is-invalid" value="email@invalido">
            <div class="invalid-feedback">
              <i class="bi bi-exclamation-circle me-1"></i>
              Formato de e-mail inválido
            </div>
          </div>
        </div>
      </div>
      
      <!-- Mensagem de sucesso inline -->
      <div class="card">
        <div class="card-body">
          <div class="alert alert-success d-flex align-items-center gap-2 mb-0">
            <i class="bi bi-check-circle-fill"></i>
            <div>
              <strong>Dados salvos com sucesso!</strong>
              <span class="d-block small">As alterações foram aplicadas.</span>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Dica/Hint -->
      <div class="card">
        <div class="card-body">
          <div class="alert alert-info d-flex gap-2 mb-0">
            <i class="bi bi-lightbulb"></i>
            <div>
              <strong>Dica:</strong> Você pode importar alunos em massa usando um arquivo CSV. 
              <a href="#" class="alert-link">Saiba mais</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  `},n={name:"🚩 Banners",render:()=>`
    <div class="d-flex flex-column gap-3">
      <!-- Trial expiring -->
      <div class="alert alert-warning d-flex align-items-center justify-content-between mb-0">
        <div class="d-flex align-items-center gap-2">
          <i class="bi bi-clock-history fs-5"></i>
          <span>Seu período de teste expira em <strong>3 dias</strong>. Atualize para continuar usando todas as funcionalidades.</span>
        </div>
        <div class="d-flex gap-2">
          <button class="btn btn-warning btn-sm">Atualizar agora</button>
          <button class="btn btn-outline-dark btn-sm">Lembrar depois</button>
        </div>
      </div>
      
      <!-- Maintenance -->
      <div class="alert alert-info d-flex align-items-center justify-content-between mb-0">
        <div class="d-flex align-items-center gap-2">
          <i class="bi bi-tools fs-5"></i>
          <span>Manutenção programada para <strong>sábado, 20h às 22h</strong>. O sistema ficará indisponível.</span>
        </div>
        <button type="button" class="btn-close"></button>
      </div>
      
      <!-- New feature -->
      <div class="alert mb-0 text-white" style="background: linear-gradient(135deg, #7367f0 0%, #9e95f5 100%);">
        <div class="d-flex align-items-center justify-content-between">
          <div class="d-flex align-items-center gap-3">
            <span class="fs-3">🎉</span>
            <div>
              <strong>Novidade!</strong> Agora você pode gerar relatórios em PDF diretamente do dashboard.
              <a href="#" class="text-white text-decoration-underline">Experimentar</a>
            </div>
          </div>
          <button type="button" class="btn-close btn-close-white"></button>
        </div>
      </div>
      
      <!-- Error/Critical -->
      <div class="alert alert-danger d-flex align-items-center justify-content-between mb-0">
        <div class="d-flex align-items-center gap-2">
          <i class="bi bi-exclamation-octagon-fill fs-5"></i>
          <span><strong>Atenção:</strong> Detectamos problemas de conexão. Algumas funcionalidades podem não funcionar corretamente.</span>
        </div>
        <button class="btn btn-danger btn-sm">Tentar novamente</button>
      </div>
    </div>
  `},l={name:"📊 Mensagens de Status",render:()=>`
    <div class="row g-4" style="max-width: 800px;">
      <!-- Processing -->
      <div class="col-md-6">
        <div class="card">
          <div class="card-body text-center py-4">
            <div class="spinner-border text-primary mb-3" role="status"></div>
            <h6>Processando...</h6>
            <p class="text-muted small mb-0">Gerando relatório da turma</p>
          </div>
        </div>
      </div>
      
      <!-- Success -->
      <div class="col-md-6">
        <div class="card border-success">
          <div class="card-body text-center py-4">
            <div class="rounded-circle bg-success bg-opacity-10 d-inline-flex p-3 mb-3">
              <i class="bi bi-check-lg fs-1 text-success"></i>
            </div>
            <h6 class="text-success">Concluído!</h6>
            <p class="text-muted small mb-0">Relatório gerado com sucesso</p>
          </div>
        </div>
      </div>
      
      <!-- Error -->
      <div class="col-md-6">
        <div class="card border-danger">
          <div class="card-body text-center py-4">
            <div class="rounded-circle bg-danger bg-opacity-10 d-inline-flex p-3 mb-3">
              <i class="bi bi-x-lg fs-1 text-danger"></i>
            </div>
            <h6 class="text-danger">Erro</h6>
            <p class="text-muted small mb-3">Não foi possível processar sua solicitação</p>
            <button class="btn btn-outline-danger btn-sm">Tentar novamente</button>
          </div>
        </div>
      </div>
      
      <!-- Empty state -->
      <div class="col-md-6">
        <div class="card">
          <div class="card-body text-center py-4">
            <div class="rounded-circle bg-light d-inline-flex p-3 mb-3">
              <i class="bi bi-inbox fs-1 text-muted"></i>
            </div>
            <h6>Nenhuma notificação</h6>
            <p class="text-muted small mb-0">Você não tem novas notificações</p>
          </div>
        </div>
      </div>
    </div>
  `};var o,d,r;s.parameters={...s.parameters,docs:{...(o=s.parameters)==null?void 0:o.docs,source:{originalSource:`{
  name: '📍 Posições de Toast',
  render: () => \`
    <div class="position-relative bg-light rounded" style="height: 400px;">
      <!-- Top Left -->
      <div class="position-absolute top-0 start-0 p-3">
        <div class="toast show" role="alert">
          <div class="toast-header">
            <i class="bi bi-info-circle text-primary me-2"></i>
            <strong class="me-auto">Top Left</strong>
            <small>Agora</small>
            <button type="button" class="btn-close btn-close-sm"></button>
          </div>
          <div class="toast-body">
            Toast no canto superior esquerdo.
          </div>
        </div>
      </div>
      
      <!-- Top Right -->
      <div class="position-absolute top-0 end-0 p-3">
        <div class="toast show border-start border-success border-3" role="alert">
          <div class="toast-header">
            <i class="bi bi-check-circle text-success me-2"></i>
            <strong class="me-auto">Top Right</strong>
            <small>Agora</small>
            <button type="button" class="btn-close btn-close-sm"></button>
          </div>
          <div class="toast-body">
            Posição mais comum para notificações.
          </div>
        </div>
      </div>
      
      <!-- Bottom Left -->
      <div class="position-absolute bottom-0 start-0 p-3">
        <div class="toast show" role="alert">
          <div class="toast-body d-flex align-items-center gap-2">
            <i class="bi bi-download text-primary"></i>
            <span>Baixando relatório...</span>
            <div class="spinner-border spinner-border-sm ms-auto"></div>
          </div>
        </div>
      </div>
      
      <!-- Bottom Right -->
      <div class="position-absolute bottom-0 end-0 p-3">
        <div class="toast show border-start border-danger border-3" role="alert">
          <div class="toast-header">
            <i class="bi bi-exclamation-circle text-danger me-2"></i>
            <strong class="me-auto">Bottom Right</strong>
            <button type="button" class="btn-close btn-close-sm"></button>
          </div>
          <div class="toast-body">
            Toast no canto inferior direito.
          </div>
        </div>
      </div>
      
      <!-- Center info -->
      <div class="position-absolute top-50 start-50 translate-middle text-center text-muted">
        <i class="bi bi-arrows-move fs-1"></i>
        <p class="mb-0 mt-2">Toasts podem aparecer em qualquer canto</p>
      </div>
    </div>
  \`
}`,...(r=(d=s.parameters)==null?void 0:d.docs)==null?void 0:r.source}}};var c,m,v;a.parameters={...a.parameters,docs:{...(c=a.parameters)==null?void 0:c.docs,source:{originalSource:`{
  name: '🔔 Tipos de Toast',
  render: () => \`
    <div class="d-flex flex-column gap-3" style="max-width: 350px;">
      <!-- Success -->
      <div class="toast show border-start border-success border-3" role="alert">
        <div class="toast-header">
          <i class="bi bi-check-circle-fill text-success me-2"></i>
          <strong class="me-auto">Sucesso</strong>
          <small class="text-muted">Agora</small>
          <button type="button" class="btn-close btn-close-sm"></button>
        </div>
        <div class="toast-body">
          Aluno cadastrado com sucesso!
        </div>
      </div>
      
      <!-- Error -->
      <div class="toast show border-start border-danger border-3" role="alert">
        <div class="toast-header">
          <i class="bi bi-x-circle-fill text-danger me-2"></i>
          <strong class="me-auto">Erro</strong>
          <small class="text-muted">Agora</small>
          <button type="button" class="btn-close btn-close-sm"></button>
        </div>
        <div class="toast-body">
          Não foi possível salvar os dados. Tente novamente.
        </div>
      </div>
      
      <!-- Warning -->
      <div class="toast show border-start border-warning border-3" role="alert">
        <div class="toast-header">
          <i class="bi bi-exclamation-triangle-fill text-warning me-2"></i>
          <strong class="me-auto">Atenção</strong>
          <small class="text-muted">5 min</small>
          <button type="button" class="btn-close btn-close-sm"></button>
        </div>
        <div class="toast-body">
          Sua sessão expira em 5 minutos.
        </div>
      </div>
      
      <!-- Info -->
      <div class="toast show border-start border-info border-3" role="alert">
        <div class="toast-header">
          <i class="bi bi-info-circle-fill text-info me-2"></i>
          <strong class="me-auto">Informação</strong>
          <small class="text-muted">Agora</small>
          <button type="button" class="btn-close btn-close-sm"></button>
        </div>
        <div class="toast-body">
          Novos jogos estão disponíveis para sua turma.
        </div>
      </div>
    </div>
  \`
}`,...(v=(m=a.parameters)==null?void 0:m.docs)==null?void 0:v.source}}};var b,p,u;t.parameters={...t.parameters,docs:{...(b=t.parameters)==null?void 0:b.docs,source:{originalSource:`{
  name: '🎯 Toast com Ações',
  render: () => \`
    <div class="d-flex flex-column gap-3" style="max-width: 380px;">
      <!-- Undo action -->
      <div class="toast show" role="alert">
        <div class="toast-body d-flex align-items-center justify-content-between gap-3">
          <div class="d-flex align-items-center gap-2">
            <i class="bi bi-trash text-danger"></i>
            <span>Aluno removido da turma</span>
          </div>
          <button class="btn btn-sm btn-link text-primary p-0">Desfazer</button>
        </div>
      </div>
      
      <!-- With progress -->
      <div class="toast show" role="alert">
        <div class="toast-header">
          <i class="bi bi-cloud-upload text-primary me-2"></i>
          <strong class="me-auto">Enviando arquivo</strong>
          <small>75%</small>
        </div>
        <div class="toast-body">
          <div class="progress" style="height: 4px;">
            <div class="progress-bar" style="width: 75%"></div>
          </div>
          <small class="text-muted mt-1 d-block">relatorio-turma.pdf</small>
        </div>
      </div>
      
      <!-- Confirm action -->
      <div class="toast show border-start border-warning border-3" role="alert">
        <div class="toast-header">
          <i class="bi bi-question-circle text-warning me-2"></i>
          <strong class="me-auto">Confirmar ação</strong>
          <button type="button" class="btn-close btn-close-sm"></button>
        </div>
        <div class="toast-body">
          <p class="mb-3">Deseja enviar o relatório por e-mail para todos os responsáveis?</p>
          <div class="d-flex gap-2">
            <button class="btn btn-sm btn-primary">Enviar</button>
            <button class="btn btn-sm btn-outline-secondary">Cancelar</button>
          </div>
        </div>
      </div>
      
      <!-- Achievement -->
      <div class="toast show bg-gradient" role="alert" style="background: linear-gradient(135deg, #7367f0 0%, #9e95f5 100%);">
        <div class="toast-body text-white d-flex align-items-center gap-3">
          <span class="fs-2">🏆</span>
          <div>
            <div class="fw-bold">Conquista Desbloqueada!</div>
            <small class="opacity-75">Turma atingiu 100% de participação</small>
          </div>
        </div>
      </div>
    </div>
  \`
}`,...(u=(p=t.parameters)==null?void 0:p.docs)==null?void 0:u.source}}};var g,x,f;e.parameters={...e.parameters,docs:{...(g=e.parameters)==null?void 0:g.docs,source:{originalSource:`{
  name: '📬 Central de Notificações',
  render: () => \`
    <div class="card" style="max-width: 400px;">
      <div class="card-header d-flex justify-content-between align-items-center">
        <h6 class="mb-0">
          <i class="bi bi-bell me-2"></i>
          Notificações
        </h6>
        <div class="d-flex align-items-center gap-2">
          <span class="badge bg-primary rounded-pill">5 novas</span>
          <a href="#" class="small text-primary">Marcar todas como lidas</a>
        </div>
      </div>
      
      <div class="list-group list-group-flush" style="max-height: 400px; overflow-y: auto;">
        <!-- Não lida -->
        <a href="#" class="list-group-item list-group-item-action bg-primary bg-opacity-10">
          <div class="d-flex gap-3">
            <div class="flex-shrink-0">
              <span class="avatar avatar-sm bg-success rounded-circle">
                <i class="bi bi-person-plus text-white"></i>
              </span>
            </div>
            <div class="flex-grow-1">
              <div class="d-flex justify-content-between">
                <strong class="small">Novo aluno cadastrado</strong>
                <small class="text-muted">2 min</small>
              </div>
              <p class="mb-0 small text-muted">
                Maria Silva foi adicionada ao 5º Ano A
              </p>
            </div>
          </div>
        </a>
        
        <!-- Não lida - conquista -->
        <a href="#" class="list-group-item list-group-item-action bg-primary bg-opacity-10">
          <div class="d-flex gap-3">
            <div class="flex-shrink-0">
              <span class="avatar avatar-sm bg-warning rounded-circle">
                <i class="bi bi-trophy text-white"></i>
              </span>
            </div>
            <div class="flex-grow-1">
              <div class="d-flex justify-content-between">
                <strong class="small">Meta alcançada!</strong>
                <small class="text-muted">15 min</small>
              </div>
              <p class="mb-0 small text-muted">
                A turma 5º Ano A atingiu 80% de desempenho
              </p>
            </div>
          </div>
        </a>
        
        <!-- Lida -->
        <a href="#" class="list-group-item list-group-item-action">
          <div class="d-flex gap-3">
            <div class="flex-shrink-0">
              <span class="avatar avatar-sm bg-info rounded-circle">
                <i class="bi bi-controller text-white"></i>
              </span>
            </div>
            <div class="flex-grow-1">
              <div class="d-flex justify-content-between">
                <span class="small">Novos jogos disponíveis</span>
                <small class="text-muted">1h</small>
              </div>
              <p class="mb-0 small text-muted">
                3 novos jogos de matemática foram liberados
              </p>
            </div>
          </div>
        </a>
        
        <!-- Lida -->
        <a href="#" class="list-group-item list-group-item-action">
          <div class="d-flex gap-3">
            <div class="flex-shrink-0">
              <span class="avatar avatar-sm bg-primary rounded-circle">
                <i class="bi bi-file-earmark-text text-white"></i>
              </span>
            </div>
            <div class="flex-grow-1">
              <div class="d-flex justify-content-between">
                <span class="small">Relatório gerado</span>
                <small class="text-muted">3h</small>
              </div>
              <p class="mb-0 small text-muted">
                Seu relatório mensal está pronto para download
              </p>
            </div>
          </div>
        </a>
        
        <!-- Lida -->
        <a href="#" class="list-group-item list-group-item-action">
          <div class="d-flex gap-3">
            <div class="flex-shrink-0">
              <span class="avatar avatar-sm bg-secondary rounded-circle">
                <i class="bi bi-megaphone text-white"></i>
              </span>
            </div>
            <div class="flex-grow-1">
              <div class="d-flex justify-content-between">
                <span class="small">Manutenção programada</span>
                <small class="text-muted">Ontem</small>
              </div>
              <p class="mb-0 small text-muted">
                O sistema ficará indisponível das 2h às 4h
              </p>
            </div>
          </div>
        </a>
      </div>
      
      <div class="card-footer text-center">
        <a href="#" class="small text-primary">Ver todas as notificações</a>
      </div>
    </div>
  \`
}`,...(f=(x=e.parameters)==null?void 0:x.docs)==null?void 0:f.source}}};var h,y,w;i.parameters={...i.parameters,docs:{...(h=i.parameters)==null?void 0:h.docs,source:{originalSource:`{
  name: '📝 Mensagens Inline',
  render: () => \`
    <div class="d-flex flex-column gap-4" style="max-width: 500px;">
      <!-- Em formulário -->
      <div class="card">
        <div class="card-header">
          <h6 class="mb-0">Cadastro de Aluno</h6>
        </div>
        <div class="card-body">
          <!-- Alert de erro -->
          <div class="alert alert-danger d-flex align-items-start gap-2 mb-4">
            <i class="bi bi-exclamation-circle-fill mt-1"></i>
            <div>
              <strong>Erro ao salvar</strong>
              <ul class="mb-0 ps-3 mt-1">
                <li>O campo nome é obrigatório</li>
                <li>E-mail inválido</li>
              </ul>
            </div>
          </div>
          
          <div class="mb-3">
            <label class="form-label">Nome</label>
            <input type="text" class="form-control is-invalid">
            <div class="invalid-feedback">
              <i class="bi bi-exclamation-circle me-1"></i>
              Campo obrigatório
            </div>
          </div>
          
          <div class="mb-3">
            <label class="form-label">E-mail</label>
            <input type="email" class="form-control is-invalid" value="email@invalido">
            <div class="invalid-feedback">
              <i class="bi bi-exclamation-circle me-1"></i>
              Formato de e-mail inválido
            </div>
          </div>
        </div>
      </div>
      
      <!-- Mensagem de sucesso inline -->
      <div class="card">
        <div class="card-body">
          <div class="alert alert-success d-flex align-items-center gap-2 mb-0">
            <i class="bi bi-check-circle-fill"></i>
            <div>
              <strong>Dados salvos com sucesso!</strong>
              <span class="d-block small">As alterações foram aplicadas.</span>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Dica/Hint -->
      <div class="card">
        <div class="card-body">
          <div class="alert alert-info d-flex gap-2 mb-0">
            <i class="bi bi-lightbulb"></i>
            <div>
              <strong>Dica:</strong> Você pode importar alunos em massa usando um arquivo CSV. 
              <a href="#" class="alert-link">Saiba mais</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  \`
}`,...(w=(y=i.parameters)==null?void 0:y.docs)==null?void 0:w.source}}};var E,A,D;n.parameters={...n.parameters,docs:{...(E=n.parameters)==null?void 0:E.docs,source:{originalSource:`{
  name: '🚩 Banners',
  render: () => \`
    <div class="d-flex flex-column gap-3">
      <!-- Trial expiring -->
      <div class="alert alert-warning d-flex align-items-center justify-content-between mb-0">
        <div class="d-flex align-items-center gap-2">
          <i class="bi bi-clock-history fs-5"></i>
          <span>Seu período de teste expira em <strong>3 dias</strong>. Atualize para continuar usando todas as funcionalidades.</span>
        </div>
        <div class="d-flex gap-2">
          <button class="btn btn-warning btn-sm">Atualizar agora</button>
          <button class="btn btn-outline-dark btn-sm">Lembrar depois</button>
        </div>
      </div>
      
      <!-- Maintenance -->
      <div class="alert alert-info d-flex align-items-center justify-content-between mb-0">
        <div class="d-flex align-items-center gap-2">
          <i class="bi bi-tools fs-5"></i>
          <span>Manutenção programada para <strong>sábado, 20h às 22h</strong>. O sistema ficará indisponível.</span>
        </div>
        <button type="button" class="btn-close"></button>
      </div>
      
      <!-- New feature -->
      <div class="alert mb-0 text-white" style="background: linear-gradient(135deg, #7367f0 0%, #9e95f5 100%);">
        <div class="d-flex align-items-center justify-content-between">
          <div class="d-flex align-items-center gap-3">
            <span class="fs-3">🎉</span>
            <div>
              <strong>Novidade!</strong> Agora você pode gerar relatórios em PDF diretamente do dashboard.
              <a href="#" class="text-white text-decoration-underline">Experimentar</a>
            </div>
          </div>
          <button type="button" class="btn-close btn-close-white"></button>
        </div>
      </div>
      
      <!-- Error/Critical -->
      <div class="alert alert-danger d-flex align-items-center justify-content-between mb-0">
        <div class="d-flex align-items-center gap-2">
          <i class="bi bi-exclamation-octagon-fill fs-5"></i>
          <span><strong>Atenção:</strong> Detectamos problemas de conexão. Algumas funcionalidades podem não funcionar corretamente.</span>
        </div>
        <button class="btn btn-danger btn-sm">Tentar novamente</button>
      </div>
    </div>
  \`
}`,...(D=(A=n.parameters)==null?void 0:A.docs)==null?void 0:D.source}}};var T,k,C;l.parameters={...l.parameters,docs:{...(T=l.parameters)==null?void 0:T.docs,source:{originalSource:`{
  name: '📊 Mensagens de Status',
  render: () => \`
    <div class="row g-4" style="max-width: 800px;">
      <!-- Processing -->
      <div class="col-md-6">
        <div class="card">
          <div class="card-body text-center py-4">
            <div class="spinner-border text-primary mb-3" role="status"></div>
            <h6>Processando...</h6>
            <p class="text-muted small mb-0">Gerando relatório da turma</p>
          </div>
        </div>
      </div>
      
      <!-- Success -->
      <div class="col-md-6">
        <div class="card border-success">
          <div class="card-body text-center py-4">
            <div class="rounded-circle bg-success bg-opacity-10 d-inline-flex p-3 mb-3">
              <i class="bi bi-check-lg fs-1 text-success"></i>
            </div>
            <h6 class="text-success">Concluído!</h6>
            <p class="text-muted small mb-0">Relatório gerado com sucesso</p>
          </div>
        </div>
      </div>
      
      <!-- Error -->
      <div class="col-md-6">
        <div class="card border-danger">
          <div class="card-body text-center py-4">
            <div class="rounded-circle bg-danger bg-opacity-10 d-inline-flex p-3 mb-3">
              <i class="bi bi-x-lg fs-1 text-danger"></i>
            </div>
            <h6 class="text-danger">Erro</h6>
            <p class="text-muted small mb-3">Não foi possível processar sua solicitação</p>
            <button class="btn btn-outline-danger btn-sm">Tentar novamente</button>
          </div>
        </div>
      </div>
      
      <!-- Empty state -->
      <div class="col-md-6">
        <div class="card">
          <div class="card-body text-center py-4">
            <div class="rounded-circle bg-light d-inline-flex p-3 mb-3">
              <i class="bi bi-inbox fs-1 text-muted"></i>
            </div>
            <h6>Nenhuma notificação</h6>
            <p class="text-muted small mb-0">Você não tem novas notificações</p>
          </div>
        </div>
      </div>
    </div>
  \`
}`,...(C=(k=l.parameters)==null?void 0:k.docs)==null?void 0:C.source}}};const N=["ToastPositions","ToastTypes","ToastsWithActions","NotificationCenter","InlineMessages","Banners","StatusMessages"];export{n as Banners,i as InlineMessages,e as NotificationCenter,l as StatusMessages,s as ToastPositions,a as ToastTypes,t as ToastsWithActions,N as __namedExportsOrder,S as default};
