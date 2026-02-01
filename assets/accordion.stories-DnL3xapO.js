const k={title:"Educacross/Components/Accordion",parameters:{layout:"padded",docs:{description:{component:`
## Accordion

Painéis expansíveis para organizar conteúdo em seções colapsáveis.

### Uso no Educacross
- **FAQ**: Perguntas frequentes
- **Configurações**: Grupos de opções
- **Detalhes de aluno**: Informações agrupadas
- **Relatórios**: Seções expandíveis

### Variantes
- Padrão (apenas um aberto)
- Always open (múltiplos abertos)
- Com ícones
- Flush (sem bordas)
        `}}}},a={name:"📋 Básico",render:()=>`
    <div class="accordion" id="accordionBasic">
      <div class="accordion-item">
        <h2 class="accordion-header">
          <button class="accordion-button" type="button">
            O que é o Educacross?
          </button>
        </h2>
        <div class="accordion-collapse collapse show">
          <div class="accordion-body">
            O <strong>Educacross</strong> é uma plataforma de aprendizagem gamificada que 
            utiliza jogos educacionais para ensinar Matemática e Língua Portuguesa de forma 
            divertida e engajante para alunos do Ensino Fundamental.
          </div>
        </div>
      </div>
      
      <div class="accordion-item">
        <h2 class="accordion-header">
          <button class="accordion-button collapsed" type="button">
            Como funciona a pontuação?
          </button>
        </h2>
        <div class="accordion-collapse collapse">
          <div class="accordion-body">
            A pontuação é baseada em XP (pontos de experiência) que o aluno ganha ao 
            completar jogos e desafios. Quanto maior a taxa de acertos e menor o tempo, 
            mais pontos o aluno recebe.
          </div>
        </div>
      </div>
      
      <div class="accordion-item">
        <h2 class="accordion-header">
          <button class="accordion-button collapsed" type="button">
            Quem pode usar a plataforma?
          </button>
        </h2>
        <div class="accordion-collapse collapse">
          <div class="accordion-body">
            A plataforma é voltada para alunos do Ensino Fundamental (1º ao 9º ano), 
            professores, coordenadores e gestores escolares. Cada perfil tem acesso 
            a funcionalidades específicas.
          </div>
        </div>
      </div>
    </div>
  `},s={name:"🎯 Com Ícones",render:()=>`
    <div class="accordion" id="accordionIcons">
      <div class="accordion-item">
        <h2 class="accordion-header">
          <button class="accordion-button" type="button">
            <i class="bi bi-person-circle me-2 text-primary"></i>
            Dados do Aluno
          </button>
        </h2>
        <div class="accordion-collapse collapse show">
          <div class="accordion-body">
            <div class="row g-3">
              <div class="col-md-6">
                <label class="form-label text-muted small">Nome Completo</label>
                <p class="mb-0 fw-medium">Maria Silva Santos</p>
              </div>
              <div class="col-md-6">
                <label class="form-label text-muted small">Data de Nascimento</label>
                <p class="mb-0 fw-medium">15/03/2014</p>
              </div>
              <div class="col-md-6">
                <label class="form-label text-muted small">Turma</label>
                <p class="mb-0 fw-medium">5º Ano A</p>
              </div>
              <div class="col-md-6">
                <label class="form-label text-muted small">Matrícula</label>
                <p class="mb-0 fw-medium">2024001234</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div class="accordion-item">
        <h2 class="accordion-header">
          <button class="accordion-button collapsed" type="button">
            <i class="bi bi-graph-up me-2 text-success"></i>
            Desempenho
          </button>
        </h2>
        <div class="accordion-collapse collapse">
          <div class="accordion-body">
            <div class="row g-3">
              <div class="col-md-3 text-center">
                <h4 class="text-primary mb-1">1.250</h4>
                <small class="text-muted">Pontos XP</small>
              </div>
              <div class="col-md-3 text-center">
                <h4 class="text-success mb-1">87%</h4>
                <small class="text-muted">Acertos</small>
              </div>
              <div class="col-md-3 text-center">
                <h4 class="text-info mb-1">45</h4>
                <small class="text-muted">Jogos</small>
              </div>
              <div class="col-md-3 text-center">
                <h4 class="text-warning mb-1">#3</h4>
                <small class="text-muted">Ranking</small>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div class="accordion-item">
        <h2 class="accordion-header">
          <button class="accordion-button collapsed" type="button">
            <i class="bi bi-trophy me-2 text-warning"></i>
            Conquistas
            <span class="badge bg-warning text-dark ms-auto me-3">12</span>
          </button>
        </h2>
        <div class="accordion-collapse collapse">
          <div class="accordion-body">
            <div class="d-flex gap-3 flex-wrap">
              <div class="text-center">
                <span class="badge bg-warning rounded-circle p-3 mb-2">
                  <i class="bi bi-trophy-fill fs-4"></i>
                </span>
                <div class="small">Campeão MT</div>
              </div>
              <div class="text-center">
                <span class="badge bg-success rounded-circle p-3 mb-2">
                  <i class="bi bi-star-fill fs-4"></i>
                </span>
                <div class="small">5 Estrelas</div>
              </div>
              <div class="text-center">
                <span class="badge bg-primary rounded-circle p-3 mb-2">
                  <i class="bi bi-lightning-fill fs-4"></i>
                </span>
                <div class="small">Veloz</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div class="accordion-item">
        <h2 class="accordion-header">
          <button class="accordion-button collapsed" type="button">
            <i class="bi bi-people me-2 text-info"></i>
            Responsáveis
          </button>
        </h2>
        <div class="accordion-collapse collapse">
          <div class="accordion-body">
            <div class="d-flex align-items-center gap-3 mb-3">
              <div class="avatar">
                <span class="avatar-initial rounded-circle bg-secondary">JS</span>
              </div>
              <div>
                <p class="mb-0 fw-medium">João Silva</p>
                <small class="text-muted">joao.silva@email.com</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `},o={name:"❓ FAQ",render:()=>`
    <div class="card">
      <div class="card-header">
        <h5 class="mb-0">
          <i class="bi bi-question-circle me-2 text-primary"></i>
          Perguntas Frequentes
        </h5>
      </div>
      <div class="card-body p-0">
        <div class="accordion accordion-flush" id="accordionFAQ">
          <div class="accordion-item">
            <h2 class="accordion-header">
              <button class="accordion-button" type="button">
                Como criar uma conta para meu aluno?
              </button>
            </h2>
            <div class="accordion-collapse collapse show">
              <div class="accordion-body">
                <p>Para criar uma conta de aluno:</p>
                <ol class="mb-0">
                  <li>Acesse o menu "Alunos" no painel lateral</li>
                  <li>Clique em "Novo Aluno"</li>
                  <li>Preencha os dados solicitados</li>
                  <li>Clique em "Salvar"</li>
                </ol>
                <p class="mt-3 mb-0">
                  <i class="bi bi-lightbulb text-warning me-1"></i>
                  <strong>Dica:</strong> Você também pode importar alunos em massa via planilha Excel.
                </p>
              </div>
            </div>
          </div>
          
          <div class="accordion-item">
            <h2 class="accordion-header">
              <button class="accordion-button collapsed" type="button">
                O aluno esqueceu a senha. Como recuperar?
              </button>
            </h2>
            <div class="accordion-collapse collapse">
              <div class="accordion-body">
                <p>Existem duas formas de recuperar a senha:</p>
                <ul class="mb-0">
                  <li><strong>Pelo próprio aluno:</strong> Clique em "Esqueci minha senha" na tela de login</li>
                  <li><strong>Pelo professor/coordenador:</strong> Acesse o perfil do aluno e clique em "Redefinir Senha"</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div class="accordion-item">
            <h2 class="accordion-header">
              <button class="accordion-button collapsed" type="button">
                Como acompanhar o progresso dos alunos?
              </button>
            </h2>
            <div class="accordion-collapse collapse">
              <div class="accordion-body">
                <p>Você pode acompanhar o progresso de várias formas:</p>
                <ul class="mb-0">
                  <li><strong>Dashboard:</strong> Visão geral da turma na página inicial</li>
                  <li><strong>Relatórios:</strong> Relatórios detalhados por aluno ou turma</li>
                  <li><strong>Perfil do aluno:</strong> Dados individuais completos</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div class="accordion-item">
            <h2 class="accordion-header">
              <button class="accordion-button collapsed" type="button">
                Posso usar a plataforma no celular?
              </button>
            </h2>
            <div class="accordion-collapse collapse">
              <div class="accordion-body">
                <p class="mb-0">
                  Sim! A plataforma Educacross é totalmente responsiva e funciona em 
                  celulares, tablets e computadores. Recomendamos o uso de navegadores 
                  atualizados (Chrome, Firefox, Safari) para melhor experiência.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `},c={name:"⚙️ Configurações",render:()=>`
    <div class="card">
      <div class="card-header">
        <h5 class="mb-0">
          <i class="bi bi-gear me-2"></i>
          Configurações da Turma
        </h5>
      </div>
      <div class="card-body p-0">
        <div class="accordion accordion-flush" id="accordionSettings">
          <!-- Configurações Gerais -->
          <div class="accordion-item">
            <h2 class="accordion-header">
              <button class="accordion-button" type="button">
                <i class="bi bi-sliders me-2"></i>
                Configurações Gerais
              </button>
            </h2>
            <div class="accordion-collapse collapse show">
              <div class="accordion-body">
                <div class="mb-3">
                  <label class="form-label">Nome da Turma</label>
                  <input type="text" class="form-control" value="5º Ano A">
                </div>
                <div class="mb-3">
                  <label class="form-label">Ano Letivo</label>
                  <select class="form-select">
                    <option selected>2024</option>
                    <option>2025</option>
                  </select>
                </div>
                <div class="form-check form-switch">
                  <input class="form-check-input" type="checkbox" id="turmaAtiva" checked>
                  <label class="form-check-label" for="turmaAtiva">Turma ativa</label>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Jogos -->
          <div class="accordion-item">
            <h2 class="accordion-header">
              <button class="accordion-button collapsed" type="button">
                <i class="bi bi-controller me-2"></i>
                Configurações de Jogos
              </button>
            </h2>
            <div class="accordion-collapse collapse">
              <div class="accordion-body">
                <div class="mb-3">
                  <label class="form-label">Tentativas por questão</label>
                  <select class="form-select">
                    <option>1 tentativa</option>
                    <option>2 tentativas</option>
                    <option selected>3 tentativas</option>
                    <option>Ilimitadas</option>
                  </select>
                </div>
                <div class="form-check form-switch mb-2">
                  <input class="form-check-input" type="checkbox" id="mostrarDicas" checked>
                  <label class="form-check-label" for="mostrarDicas">Mostrar dicas</label>
                </div>
                <div class="form-check form-switch">
                  <input class="form-check-input" type="checkbox" id="tempoLimite">
                  <label class="form-check-label" for="tempoLimite">Ativar tempo limite</label>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Notificações -->
          <div class="accordion-item">
            <h2 class="accordion-header">
              <button class="accordion-button collapsed" type="button">
                <i class="bi bi-bell me-2"></i>
                Notificações
              </button>
            </h2>
            <div class="accordion-collapse collapse">
              <div class="accordion-body">
                <div class="form-check form-switch mb-2">
                  <input class="form-check-input" type="checkbox" id="notifConquistas" checked>
                  <label class="form-check-label" for="notifConquistas">Conquistas dos alunos</label>
                </div>
                <div class="form-check form-switch mb-2">
                  <input class="form-check-input" type="checkbox" id="notifAlertas" checked>
                  <label class="form-check-label" for="notifAlertas">Alertas de desempenho</label>
                </div>
                <div class="form-check form-switch">
                  <input class="form-check-input" type="checkbox" id="notifRelatorios">
                  <label class="form-check-label" for="notifRelatorios">Relatórios semanais</label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="card-footer">
        <button class="btn btn-primary">
          <i class="bi bi-check-lg me-1"></i> Salvar Configurações
        </button>
      </div>
    </div>
  `},i={name:"📄 Flush (Sem Bordas)",render:()=>`
    <div class="card">
      <div class="card-header">
        <h6 class="mb-0">Detalhes do Jogo</h6>
      </div>
      <div class="card-body p-0">
        <div class="accordion accordion-flush" id="accordionFlush">
          <div class="accordion-item">
            <h2 class="accordion-header">
              <button class="accordion-button py-3" type="button">
                Informações Básicas
              </button>
            </h2>
            <div class="accordion-collapse collapse show">
              <div class="accordion-body pt-0">
                <table class="table table-sm table-borderless mb-0">
                  <tr>
                    <td class="text-muted" style="width: 40%">Nome do Jogo</td>
                    <td>Aventura Matemática</td>
                  </tr>
                  <tr>
                    <td class="text-muted">Disciplina</td>
                    <td><span class="badge bg-primary">Matemática</span></td>
                  </tr>
                  <tr>
                    <td class="text-muted">Dificuldade</td>
                    <td>
                      <i class="bi bi-star-fill text-warning"></i>
                      <i class="bi bi-star-fill text-warning"></i>
                      <i class="bi bi-star text-muted"></i>
                    </td>
                  </tr>
                </table>
              </div>
            </div>
          </div>
          
          <div class="accordion-item">
            <h2 class="accordion-header">
              <button class="accordion-button collapsed py-3" type="button">
                Habilidades Trabalhadas
              </button>
            </h2>
            <div class="accordion-collapse collapse">
              <div class="accordion-body pt-0">
                <div class="d-flex gap-2 flex-wrap">
                  <span class="badge bg-label-primary">Adição</span>
                  <span class="badge bg-label-primary">Subtração</span>
                  <span class="badge bg-label-info">Raciocínio Lógico</span>
                  <span class="badge bg-label-success">Resolução de Problemas</span>
                </div>
              </div>
            </div>
          </div>
          
          <div class="accordion-item">
            <h2 class="accordion-header">
              <button class="accordion-button collapsed py-3" type="button">
                Estatísticas
              </button>
            </h2>
            <div class="accordion-collapse collapse">
              <div class="accordion-body pt-0">
                <div class="row g-2 text-center">
                  <div class="col-4">
                    <h5 class="mb-0">1.234</h5>
                    <small class="text-muted">Jogadores</small>
                  </div>
                  <div class="col-4">
                    <h5 class="mb-0">78%</h5>
                    <small class="text-muted">Média Acertos</small>
                  </div>
                  <div class="col-4">
                    <h5 class="mb-0">4.5</h5>
                    <small class="text-muted">Avaliação</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `},n={name:"📂 Múltiplos Abertos",render:()=>`
    <div class="accordion" id="accordionAlwaysOpen">
      <div class="accordion-item">
        <h2 class="accordion-header">
          <button class="accordion-button" type="button">
            <i class="bi bi-1-circle me-2 text-primary"></i>
            Primeiro Item (Aberto)
          </button>
        </h2>
        <div class="accordion-collapse collapse show">
          <div class="accordion-body">
            Este accordion permite manter múltiplos itens abertos simultaneamente.
            Útil quando o usuário precisa comparar informações de diferentes seções.
          </div>
        </div>
      </div>
      
      <div class="accordion-item">
        <h2 class="accordion-header">
          <button class="accordion-button" type="button">
            <i class="bi bi-2-circle me-2 text-success"></i>
            Segundo Item (Também Aberto)
          </button>
        </h2>
        <div class="accordion-collapse collapse show">
          <div class="accordion-body">
            Note que este item também está aberto. Em um accordion tradicional,
            apenas um item pode estar expandido por vez. Esta variante remove
            essa restrição.
          </div>
        </div>
      </div>
      
      <div class="accordion-item">
        <h2 class="accordion-header">
          <button class="accordion-button collapsed" type="button">
            <i class="bi bi-3-circle me-2 text-info"></i>
            Terceiro Item (Fechado)
          </button>
        </h2>
        <div class="accordion-collapse collapse">
          <div class="accordion-body">
            Este item está fechado por padrão, mas pode ser aberto sem
            fechar os outros itens.
          </div>
        </div>
      </div>
    </div>
  `};var e,l,d;a.parameters={...a.parameters,docs:{...(e=a.parameters)==null?void 0:e.docs,source:{originalSource:`{
  name: '📋 Básico',
  render: () => \`
    <div class="accordion" id="accordionBasic">
      <div class="accordion-item">
        <h2 class="accordion-header">
          <button class="accordion-button" type="button">
            O que é o Educacross?
          </button>
        </h2>
        <div class="accordion-collapse collapse show">
          <div class="accordion-body">
            O <strong>Educacross</strong> é uma plataforma de aprendizagem gamificada que 
            utiliza jogos educacionais para ensinar Matemática e Língua Portuguesa de forma 
            divertida e engajante para alunos do Ensino Fundamental.
          </div>
        </div>
      </div>
      
      <div class="accordion-item">
        <h2 class="accordion-header">
          <button class="accordion-button collapsed" type="button">
            Como funciona a pontuação?
          </button>
        </h2>
        <div class="accordion-collapse collapse">
          <div class="accordion-body">
            A pontuação é baseada em XP (pontos de experiência) que o aluno ganha ao 
            completar jogos e desafios. Quanto maior a taxa de acertos e menor o tempo, 
            mais pontos o aluno recebe.
          </div>
        </div>
      </div>
      
      <div class="accordion-item">
        <h2 class="accordion-header">
          <button class="accordion-button collapsed" type="button">
            Quem pode usar a plataforma?
          </button>
        </h2>
        <div class="accordion-collapse collapse">
          <div class="accordion-body">
            A plataforma é voltada para alunos do Ensino Fundamental (1º ao 9º ano), 
            professores, coordenadores e gestores escolares. Cada perfil tem acesso 
            a funcionalidades específicas.
          </div>
        </div>
      </div>
    </div>
  \`
}`,...(d=(l=a.parameters)==null?void 0:l.docs)==null?void 0:d.source}}};var t,r,m;s.parameters={...s.parameters,docs:{...(t=s.parameters)==null?void 0:t.docs,source:{originalSource:`{
  name: '🎯 Com Ícones',
  render: () => \`
    <div class="accordion" id="accordionIcons">
      <div class="accordion-item">
        <h2 class="accordion-header">
          <button class="accordion-button" type="button">
            <i class="bi bi-person-circle me-2 text-primary"></i>
            Dados do Aluno
          </button>
        </h2>
        <div class="accordion-collapse collapse show">
          <div class="accordion-body">
            <div class="row g-3">
              <div class="col-md-6">
                <label class="form-label text-muted small">Nome Completo</label>
                <p class="mb-0 fw-medium">Maria Silva Santos</p>
              </div>
              <div class="col-md-6">
                <label class="form-label text-muted small">Data de Nascimento</label>
                <p class="mb-0 fw-medium">15/03/2014</p>
              </div>
              <div class="col-md-6">
                <label class="form-label text-muted small">Turma</label>
                <p class="mb-0 fw-medium">5º Ano A</p>
              </div>
              <div class="col-md-6">
                <label class="form-label text-muted small">Matrícula</label>
                <p class="mb-0 fw-medium">2024001234</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div class="accordion-item">
        <h2 class="accordion-header">
          <button class="accordion-button collapsed" type="button">
            <i class="bi bi-graph-up me-2 text-success"></i>
            Desempenho
          </button>
        </h2>
        <div class="accordion-collapse collapse">
          <div class="accordion-body">
            <div class="row g-3">
              <div class="col-md-3 text-center">
                <h4 class="text-primary mb-1">1.250</h4>
                <small class="text-muted">Pontos XP</small>
              </div>
              <div class="col-md-3 text-center">
                <h4 class="text-success mb-1">87%</h4>
                <small class="text-muted">Acertos</small>
              </div>
              <div class="col-md-3 text-center">
                <h4 class="text-info mb-1">45</h4>
                <small class="text-muted">Jogos</small>
              </div>
              <div class="col-md-3 text-center">
                <h4 class="text-warning mb-1">#3</h4>
                <small class="text-muted">Ranking</small>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div class="accordion-item">
        <h2 class="accordion-header">
          <button class="accordion-button collapsed" type="button">
            <i class="bi bi-trophy me-2 text-warning"></i>
            Conquistas
            <span class="badge bg-warning text-dark ms-auto me-3">12</span>
          </button>
        </h2>
        <div class="accordion-collapse collapse">
          <div class="accordion-body">
            <div class="d-flex gap-3 flex-wrap">
              <div class="text-center">
                <span class="badge bg-warning rounded-circle p-3 mb-2">
                  <i class="bi bi-trophy-fill fs-4"></i>
                </span>
                <div class="small">Campeão MT</div>
              </div>
              <div class="text-center">
                <span class="badge bg-success rounded-circle p-3 mb-2">
                  <i class="bi bi-star-fill fs-4"></i>
                </span>
                <div class="small">5 Estrelas</div>
              </div>
              <div class="text-center">
                <span class="badge bg-primary rounded-circle p-3 mb-2">
                  <i class="bi bi-lightning-fill fs-4"></i>
                </span>
                <div class="small">Veloz</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div class="accordion-item">
        <h2 class="accordion-header">
          <button class="accordion-button collapsed" type="button">
            <i class="bi bi-people me-2 text-info"></i>
            Responsáveis
          </button>
        </h2>
        <div class="accordion-collapse collapse">
          <div class="accordion-body">
            <div class="d-flex align-items-center gap-3 mb-3">
              <div class="avatar">
                <span class="avatar-initial rounded-circle bg-secondary">JS</span>
              </div>
              <div>
                <p class="mb-0 fw-medium">João Silva</p>
                <small class="text-muted">joao.silva@email.com</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  \`
}`,...(m=(r=s.parameters)==null?void 0:r.docs)==null?void 0:m.source}}};var b,p,u;o.parameters={...o.parameters,docs:{...(b=o.parameters)==null?void 0:b.docs,source:{originalSource:`{
  name: '❓ FAQ',
  render: () => \`
    <div class="card">
      <div class="card-header">
        <h5 class="mb-0">
          <i class="bi bi-question-circle me-2 text-primary"></i>
          Perguntas Frequentes
        </h5>
      </div>
      <div class="card-body p-0">
        <div class="accordion accordion-flush" id="accordionFAQ">
          <div class="accordion-item">
            <h2 class="accordion-header">
              <button class="accordion-button" type="button">
                Como criar uma conta para meu aluno?
              </button>
            </h2>
            <div class="accordion-collapse collapse show">
              <div class="accordion-body">
                <p>Para criar uma conta de aluno:</p>
                <ol class="mb-0">
                  <li>Acesse o menu "Alunos" no painel lateral</li>
                  <li>Clique em "Novo Aluno"</li>
                  <li>Preencha os dados solicitados</li>
                  <li>Clique em "Salvar"</li>
                </ol>
                <p class="mt-3 mb-0">
                  <i class="bi bi-lightbulb text-warning me-1"></i>
                  <strong>Dica:</strong> Você também pode importar alunos em massa via planilha Excel.
                </p>
              </div>
            </div>
          </div>
          
          <div class="accordion-item">
            <h2 class="accordion-header">
              <button class="accordion-button collapsed" type="button">
                O aluno esqueceu a senha. Como recuperar?
              </button>
            </h2>
            <div class="accordion-collapse collapse">
              <div class="accordion-body">
                <p>Existem duas formas de recuperar a senha:</p>
                <ul class="mb-0">
                  <li><strong>Pelo próprio aluno:</strong> Clique em "Esqueci minha senha" na tela de login</li>
                  <li><strong>Pelo professor/coordenador:</strong> Acesse o perfil do aluno e clique em "Redefinir Senha"</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div class="accordion-item">
            <h2 class="accordion-header">
              <button class="accordion-button collapsed" type="button">
                Como acompanhar o progresso dos alunos?
              </button>
            </h2>
            <div class="accordion-collapse collapse">
              <div class="accordion-body">
                <p>Você pode acompanhar o progresso de várias formas:</p>
                <ul class="mb-0">
                  <li><strong>Dashboard:</strong> Visão geral da turma na página inicial</li>
                  <li><strong>Relatórios:</strong> Relatórios detalhados por aluno ou turma</li>
                  <li><strong>Perfil do aluno:</strong> Dados individuais completos</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div class="accordion-item">
            <h2 class="accordion-header">
              <button class="accordion-button collapsed" type="button">
                Posso usar a plataforma no celular?
              </button>
            </h2>
            <div class="accordion-collapse collapse">
              <div class="accordion-body">
                <p class="mb-0">
                  Sim! A plataforma Educacross é totalmente responsiva e funciona em 
                  celulares, tablets e computadores. Recomendamos o uso de navegadores 
                  atualizados (Chrome, Firefox, Safari) para melhor experiência.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  \`
}`,...(u=(p=o.parameters)==null?void 0:p.docs)==null?void 0:u.source}}};var v,h,f;c.parameters={...c.parameters,docs:{...(v=c.parameters)==null?void 0:v.docs,source:{originalSource:`{
  name: '⚙️ Configurações',
  render: () => \`
    <div class="card">
      <div class="card-header">
        <h5 class="mb-0">
          <i class="bi bi-gear me-2"></i>
          Configurações da Turma
        </h5>
      </div>
      <div class="card-body p-0">
        <div class="accordion accordion-flush" id="accordionSettings">
          <!-- Configurações Gerais -->
          <div class="accordion-item">
            <h2 class="accordion-header">
              <button class="accordion-button" type="button">
                <i class="bi bi-sliders me-2"></i>
                Configurações Gerais
              </button>
            </h2>
            <div class="accordion-collapse collapse show">
              <div class="accordion-body">
                <div class="mb-3">
                  <label class="form-label">Nome da Turma</label>
                  <input type="text" class="form-control" value="5º Ano A">
                </div>
                <div class="mb-3">
                  <label class="form-label">Ano Letivo</label>
                  <select class="form-select">
                    <option selected>2024</option>
                    <option>2025</option>
                  </select>
                </div>
                <div class="form-check form-switch">
                  <input class="form-check-input" type="checkbox" id="turmaAtiva" checked>
                  <label class="form-check-label" for="turmaAtiva">Turma ativa</label>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Jogos -->
          <div class="accordion-item">
            <h2 class="accordion-header">
              <button class="accordion-button collapsed" type="button">
                <i class="bi bi-controller me-2"></i>
                Configurações de Jogos
              </button>
            </h2>
            <div class="accordion-collapse collapse">
              <div class="accordion-body">
                <div class="mb-3">
                  <label class="form-label">Tentativas por questão</label>
                  <select class="form-select">
                    <option>1 tentativa</option>
                    <option>2 tentativas</option>
                    <option selected>3 tentativas</option>
                    <option>Ilimitadas</option>
                  </select>
                </div>
                <div class="form-check form-switch mb-2">
                  <input class="form-check-input" type="checkbox" id="mostrarDicas" checked>
                  <label class="form-check-label" for="mostrarDicas">Mostrar dicas</label>
                </div>
                <div class="form-check form-switch">
                  <input class="form-check-input" type="checkbox" id="tempoLimite">
                  <label class="form-check-label" for="tempoLimite">Ativar tempo limite</label>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Notificações -->
          <div class="accordion-item">
            <h2 class="accordion-header">
              <button class="accordion-button collapsed" type="button">
                <i class="bi bi-bell me-2"></i>
                Notificações
              </button>
            </h2>
            <div class="accordion-collapse collapse">
              <div class="accordion-body">
                <div class="form-check form-switch mb-2">
                  <input class="form-check-input" type="checkbox" id="notifConquistas" checked>
                  <label class="form-check-label" for="notifConquistas">Conquistas dos alunos</label>
                </div>
                <div class="form-check form-switch mb-2">
                  <input class="form-check-input" type="checkbox" id="notifAlertas" checked>
                  <label class="form-check-label" for="notifAlertas">Alertas de desempenho</label>
                </div>
                <div class="form-check form-switch">
                  <input class="form-check-input" type="checkbox" id="notifRelatorios">
                  <label class="form-check-label" for="notifRelatorios">Relatórios semanais</label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="card-footer">
        <button class="btn btn-primary">
          <i class="bi bi-check-lg me-1"></i> Salvar Configurações
        </button>
      </div>
    </div>
  \`
}`,...(f=(h=c.parameters)==null?void 0:h.docs)==null?void 0:f.source}}};var x,g,y;i.parameters={...i.parameters,docs:{...(x=i.parameters)==null?void 0:x.docs,source:{originalSource:`{
  name: '📄 Flush (Sem Bordas)',
  render: () => \`
    <div class="card">
      <div class="card-header">
        <h6 class="mb-0">Detalhes do Jogo</h6>
      </div>
      <div class="card-body p-0">
        <div class="accordion accordion-flush" id="accordionFlush">
          <div class="accordion-item">
            <h2 class="accordion-header">
              <button class="accordion-button py-3" type="button">
                Informações Básicas
              </button>
            </h2>
            <div class="accordion-collapse collapse show">
              <div class="accordion-body pt-0">
                <table class="table table-sm table-borderless mb-0">
                  <tr>
                    <td class="text-muted" style="width: 40%">Nome do Jogo</td>
                    <td>Aventura Matemática</td>
                  </tr>
                  <tr>
                    <td class="text-muted">Disciplina</td>
                    <td><span class="badge bg-primary">Matemática</span></td>
                  </tr>
                  <tr>
                    <td class="text-muted">Dificuldade</td>
                    <td>
                      <i class="bi bi-star-fill text-warning"></i>
                      <i class="bi bi-star-fill text-warning"></i>
                      <i class="bi bi-star text-muted"></i>
                    </td>
                  </tr>
                </table>
              </div>
            </div>
          </div>
          
          <div class="accordion-item">
            <h2 class="accordion-header">
              <button class="accordion-button collapsed py-3" type="button">
                Habilidades Trabalhadas
              </button>
            </h2>
            <div class="accordion-collapse collapse">
              <div class="accordion-body pt-0">
                <div class="d-flex gap-2 flex-wrap">
                  <span class="badge bg-label-primary">Adição</span>
                  <span class="badge bg-label-primary">Subtração</span>
                  <span class="badge bg-label-info">Raciocínio Lógico</span>
                  <span class="badge bg-label-success">Resolução de Problemas</span>
                </div>
              </div>
            </div>
          </div>
          
          <div class="accordion-item">
            <h2 class="accordion-header">
              <button class="accordion-button collapsed py-3" type="button">
                Estatísticas
              </button>
            </h2>
            <div class="accordion-collapse collapse">
              <div class="accordion-body pt-0">
                <div class="row g-2 text-center">
                  <div class="col-4">
                    <h5 class="mb-0">1.234</h5>
                    <small class="text-muted">Jogadores</small>
                  </div>
                  <div class="col-4">
                    <h5 class="mb-0">78%</h5>
                    <small class="text-muted">Média Acertos</small>
                  </div>
                  <div class="col-4">
                    <h5 class="mb-0">4.5</h5>
                    <small class="text-muted">Avaliação</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  \`
}`,...(y=(g=i.parameters)==null?void 0:g.docs)==null?void 0:y.source}}};var E,A,w;n.parameters={...n.parameters,docs:{...(E=n.parameters)==null?void 0:E.docs,source:{originalSource:`{
  name: '📂 Múltiplos Abertos',
  render: () => \`
    <div class="accordion" id="accordionAlwaysOpen">
      <div class="accordion-item">
        <h2 class="accordion-header">
          <button class="accordion-button" type="button">
            <i class="bi bi-1-circle me-2 text-primary"></i>
            Primeiro Item (Aberto)
          </button>
        </h2>
        <div class="accordion-collapse collapse show">
          <div class="accordion-body">
            Este accordion permite manter múltiplos itens abertos simultaneamente.
            Útil quando o usuário precisa comparar informações de diferentes seções.
          </div>
        </div>
      </div>
      
      <div class="accordion-item">
        <h2 class="accordion-header">
          <button class="accordion-button" type="button">
            <i class="bi bi-2-circle me-2 text-success"></i>
            Segundo Item (Também Aberto)
          </button>
        </h2>
        <div class="accordion-collapse collapse show">
          <div class="accordion-body">
            Note que este item também está aberto. Em um accordion tradicional,
            apenas um item pode estar expandido por vez. Esta variante remove
            essa restrição.
          </div>
        </div>
      </div>
      
      <div class="accordion-item">
        <h2 class="accordion-header">
          <button class="accordion-button collapsed" type="button">
            <i class="bi bi-3-circle me-2 text-info"></i>
            Terceiro Item (Fechado)
          </button>
        </h2>
        <div class="accordion-collapse collapse">
          <div class="accordion-body">
            Este item está fechado por padrão, mas pode ser aberto sem
            fechar os outros itens.
          </div>
        </div>
      </div>
    </div>
  \`
}`,...(w=(A=n.parameters)==null?void 0:A.docs)==null?void 0:w.source}}};const C=["Basic","WithIcons","FAQ","Settings","Flush","AlwaysOpen"];export{n as AlwaysOpen,a as Basic,o as FAQ,i as Flush,c as Settings,s as WithIcons,C as __namedExportsOrder,k as default};
