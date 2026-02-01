const R={title:"Educacross/Components/Tables",parameters:{layout:"padded",docs:{description:{component:`
## Tables

Tabelas para organização e exibição de dados.

### Uso no Educacross
- **Listagem de alunos**: Tabelas com dados dos estudantes
- **Rankings**: Classificação por pontuação
- **Relatórios**: Dados de desempenho
- **Histórico**: Registros de atividades

### Variantes
- Básica / Striped / Hover
- Com ações
- Responsiva
- Com seleção
        `}}}},t={name:"📊 Tabela Básica",render:()=>`
    <div class="card">
      <div class="table-responsive">
        <table class="table">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Turma</th>
              <th>Pontos XP</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>João Silva</td>
              <td>5º Ano A</td>
              <td>1.250</td>
              <td><span class="badge bg-success">Ativo</span></td>
            </tr>
            <tr>
              <td>Maria Santos</td>
              <td>5º Ano A</td>
              <td>1.180</td>
              <td><span class="badge bg-success">Ativo</span></td>
            </tr>
            <tr>
              <td>Pedro Costa</td>
              <td>5º Ano B</td>
              <td>980</td>
              <td><span class="badge bg-success">Ativo</span></td>
            </tr>
            <tr>
              <td>Ana Oliveira</td>
              <td>6º Ano A</td>
              <td>1.520</td>
              <td><span class="badge bg-warning">Pendente</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `},s={name:"🦓 Tabela Striped",render:()=>`
    <div class="card">
      <div class="table-responsive">
        <table class="table table-striped">
          <thead>
            <tr>
              <th>#</th>
              <th>Aluno</th>
              <th>Jogos Completos</th>
              <th>Tempo Total</th>
              <th>Média</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Lucas Ferreira</td>
              <td>45</td>
              <td>12h 30min</td>
              <td>85%</td>
            </tr>
            <tr>
              <td>2</td>
              <td>Julia Mendes</td>
              <td>42</td>
              <td>11h 45min</td>
              <td>92%</td>
            </tr>
            <tr>
              <td>3</td>
              <td>Gabriel Santos</td>
              <td>38</td>
              <td>10h 20min</td>
              <td>78%</td>
            </tr>
            <tr>
              <td>4</td>
              <td>Sofia Lima</td>
              <td>35</td>
              <td>9h 15min</td>
              <td>88%</td>
            </tr>
            <tr>
              <td>5</td>
              <td>Matheus Alves</td>
              <td>33</td>
              <td>8h 50min</td>
              <td>75%</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `},e={name:"👆 Tabela Hover",render:()=>`
    <div class="card">
      <div class="table-responsive">
        <table class="table table-hover">
          <thead>
            <tr>
              <th>Jogo</th>
              <th>Habilidade</th>
              <th>Jogadas</th>
              <th>Acertos</th>
              <th>Taxa</th>
            </tr>
          </thead>
          <tbody class="table-border-bottom-0">
            <tr style="cursor: pointer;">
              <td>
                <div class="d-flex align-items-center gap-2">
                  <span class="avatar avatar-sm bg-primary rounded">
                    <i class="bi bi-calculator text-white"></i>
                  </span>
                  Soma Veloz
                </div>
              </td>
              <td>Adição</td>
              <td>1.250</td>
              <td>1.100</td>
              <td><span class="text-success fw-semibold">88%</span></td>
            </tr>
            <tr style="cursor: pointer;">
              <td>
                <div class="d-flex align-items-center gap-2">
                  <span class="avatar avatar-sm bg-danger rounded">
                    <i class="bi bi-dash-lg text-white"></i>
                  </span>
                  Subtrai Fácil
                </div>
              </td>
              <td>Subtração</td>
              <td>980</td>
              <td>820</td>
              <td><span class="text-success fw-semibold">84%</span></td>
            </tr>
            <tr style="cursor: pointer;">
              <td>
                <div class="d-flex align-items-center gap-2">
                  <span class="avatar avatar-sm bg-success rounded">
                    <i class="bi bi-x-lg text-white"></i>
                  </span>
                  Multiplica Mania
                </div>
              </td>
              <td>Multiplicação</td>
              <td>750</td>
              <td>580</td>
              <td><span class="text-warning fw-semibold">77%</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `},a={name:"⚙️ Com Ações",render:()=>`
    <div class="card">
      <div class="card-header d-flex justify-content-between align-items-center">
        <h5 class="mb-0">Alunos da Turma</h5>
        <button class="btn btn-primary btn-sm">
          <i class="bi bi-plus-lg me-1"></i> Adicionar Aluno
        </button>
      </div>
      <div class="table-responsive">
        <table class="table">
          <thead>
            <tr>
              <th>Aluno</th>
              <th>E-mail</th>
              <th>Status</th>
              <th>Último Acesso</th>
              <th class="text-end">Ações</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <div class="d-flex align-items-center gap-2">
                  <img src="/vuexy/img/educacross/avatars/Avatar-1.svg" alt="" class="rounded-circle" width="32" height="32">
                  <div>
                    <div class="fw-medium">João Silva</div>
                    <small class="text-muted">5º Ano A</small>
                  </div>
                </div>
              </td>
              <td>joao.silva@escola.com</td>
              <td><span class="badge bg-success">Ativo</span></td>
              <td>Hoje, 14:30</td>
              <td class="text-end">
                <div class="dropdown">
                  <button class="btn btn-icon btn-sm" data-bs-toggle="dropdown">
                    <i class="bi bi-three-dots-vertical"></i>
                  </button>
                  <ul class="dropdown-menu dropdown-menu-end">
                    <li><a class="dropdown-item" href="#"><i class="bi bi-eye me-2"></i>Ver Perfil</a></li>
                    <li><a class="dropdown-item" href="#"><i class="bi bi-pencil me-2"></i>Editar</a></li>
                    <li><a class="dropdown-item" href="#"><i class="bi bi-bar-chart me-2"></i>Relatório</a></li>
                    <li><hr class="dropdown-divider"></li>
                    <li><a class="dropdown-item text-danger" href="#"><i class="bi bi-trash me-2"></i>Remover</a></li>
                  </ul>
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <div class="d-flex align-items-center gap-2">
                  <img src="/vuexy/img/educacross/avatars/Avatar-2.svg" alt="" class="rounded-circle" width="32" height="32">
                  <div>
                    <div class="fw-medium">Maria Santos</div>
                    <small class="text-muted">5º Ano A</small>
                  </div>
                </div>
              </td>
              <td>maria.santos@escola.com</td>
              <td><span class="badge bg-success">Ativo</span></td>
              <td>Ontem, 16:45</td>
              <td class="text-end">
                <div class="dropdown">
                  <button class="btn btn-icon btn-sm" data-bs-toggle="dropdown">
                    <i class="bi bi-three-dots-vertical"></i>
                  </button>
                  <ul class="dropdown-menu dropdown-menu-end">
                    <li><a class="dropdown-item" href="#"><i class="bi bi-eye me-2"></i>Ver Perfil</a></li>
                    <li><a class="dropdown-item" href="#"><i class="bi bi-pencil me-2"></i>Editar</a></li>
                    <li><a class="dropdown-item" href="#"><i class="bi bi-bar-chart me-2"></i>Relatório</a></li>
                    <li><hr class="dropdown-divider"></li>
                    <li><a class="dropdown-item text-danger" href="#"><i class="bi bi-trash me-2"></i>Remover</a></li>
                  </ul>
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <div class="d-flex align-items-center gap-2">
                  <img src="/vuexy/img/educacross/avatars/Avatar-3.svg" alt="" class="rounded-circle" width="32" height="32">
                  <div>
                    <div class="fw-medium">Pedro Costa</div>
                    <small class="text-muted">5º Ano A</small>
                  </div>
                </div>
              </td>
              <td>pedro.costa@escola.com</td>
              <td><span class="badge bg-warning">Inativo</span></td>
              <td>Há 5 dias</td>
              <td class="text-end">
                <div class="dropdown">
                  <button class="btn btn-icon btn-sm" data-bs-toggle="dropdown">
                    <i class="bi bi-three-dots-vertical"></i>
                  </button>
                  <ul class="dropdown-menu dropdown-menu-end">
                    <li><a class="dropdown-item" href="#"><i class="bi bi-eye me-2"></i>Ver Perfil</a></li>
                    <li><a class="dropdown-item" href="#"><i class="bi bi-pencil me-2"></i>Editar</a></li>
                    <li><a class="dropdown-item" href="#"><i class="bi bi-bar-chart me-2"></i>Relatório</a></li>
                    <li><hr class="dropdown-divider"></li>
                    <li><a class="dropdown-item text-danger" href="#"><i class="bi bi-trash me-2"></i>Remover</a></li>
                  </ul>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `},d={name:"☑️ Com Seleção",render:()=>`
    <div class="card">
      <div class="card-header d-flex justify-content-between align-items-center">
        <div class="d-flex align-items-center gap-3">
          <div class="form-check">
            <input class="form-check-input" type="checkbox" id="selectAll">
            <label class="form-check-label" for="selectAll">Selecionar todos</label>
          </div>
          <span class="text-muted">3 selecionados</span>
        </div>
        <div class="d-flex gap-2">
          <button class="btn btn-outline-primary btn-sm">
            <i class="bi bi-envelope me-1"></i> Enviar Mensagem
          </button>
          <button class="btn btn-outline-danger btn-sm">
            <i class="bi bi-trash me-1"></i> Remover
          </button>
        </div>
      </div>
      <div class="table-responsive">
        <table class="table">
          <thead>
            <tr>
              <th style="width: 40px;"></th>
              <th>Aluno</th>
              <th>Turma</th>
              <th>Pontos</th>
              <th>Progresso</th>
            </tr>
          </thead>
          <tbody>
            <tr class="table-active">
              <td>
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" checked>
                </div>
              </td>
              <td>
                <div class="d-flex align-items-center gap-2">
                  <img src="/vuexy/img/educacross/avatars/Avatar-1.svg" alt="" class="rounded-circle" width="32">
                  João Silva
                </div>
              </td>
              <td>5º Ano A</td>
              <td>1.250 XP</td>
              <td>
                <div class="d-flex align-items-center gap-2">
                  <div class="progress" style="width: 100px; height: 6px;">
                    <div class="progress-bar bg-success" style="width: 85%"></div>
                  </div>
                  <span class="text-muted small">85%</span>
                </div>
              </td>
            </tr>
            <tr class="table-active">
              <td>
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" checked>
                </div>
              </td>
              <td>
                <div class="d-flex align-items-center gap-2">
                  <img src="/vuexy/img/educacross/avatars/Avatar-2.svg" alt="" class="rounded-circle" width="32">
                  Maria Santos
                </div>
              </td>
              <td>5º Ano A</td>
              <td>1.180 XP</td>
              <td>
                <div class="d-flex align-items-center gap-2">
                  <div class="progress" style="width: 100px; height: 6px;">
                    <div class="progress-bar bg-success" style="width: 92%"></div>
                  </div>
                  <span class="text-muted small">92%</span>
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <div class="form-check">
                  <input class="form-check-input" type="checkbox">
                </div>
              </td>
              <td>
                <div class="d-flex align-items-center gap-2">
                  <img src="/vuexy/img/educacross/avatars/Avatar-3.svg" alt="" class="rounded-circle" width="32">
                  Pedro Costa
                </div>
              </td>
              <td>5º Ano B</td>
              <td>980 XP</td>
              <td>
                <div class="d-flex align-items-center gap-2">
                  <div class="progress" style="width: 100px; height: 6px;">
                    <div class="progress-bar bg-warning" style="width: 65%"></div>
                  </div>
                  <span class="text-muted small">65%</span>
                </div>
              </td>
            </tr>
            <tr class="table-active">
              <td>
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" checked>
                </div>
              </td>
              <td>
                <div class="d-flex align-items-center gap-2">
                  <img src="/vuexy/img/educacross/avatars/Avatar-4.svg" alt="" class="rounded-circle" width="32">
                  Ana Oliveira
                </div>
              </td>
              <td>6º Ano A</td>
              <td>1.520 XP</td>
              <td>
                <div class="d-flex align-items-center gap-2">
                  <div class="progress" style="width: 100px; height: 6px;">
                    <div class="progress-bar bg-success" style="width: 98%"></div>
                  </div>
                  <span class="text-muted small">98%</span>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `},n={name:"🏆 Ranking",render:()=>`
    <div class="card">
      <div class="card-header">
        <h5 class="mb-0">
          <i class="bi bi-trophy-fill text-warning me-2"></i>
          Ranking da Semana
        </h5>
      </div>
      <div class="table-responsive">
        <table class="table table-hover mb-0">
          <thead>
            <tr>
              <th class="text-center" style="width: 60px;">#</th>
              <th>Aluno</th>
              <th class="text-center">Jogos</th>
              <th class="text-center">Acertos</th>
              <th class="text-end">Pontos</th>
            </tr>
          </thead>
          <tbody>
            <!-- 1º Lugar -->
            <tr class="table-warning">
              <td class="text-center">
                <span class="fs-4">🥇</span>
              </td>
              <td>
                <div class="d-flex align-items-center gap-2">
                  <img src="/vuexy/img/educacross/avatars/Avatar-1.svg" alt="" class="rounded-circle" width="40">
                  <div>
                    <div class="fw-semibold">Maria Santos</div>
                    <small class="text-muted">5º Ano A</small>
                  </div>
                </div>
              </td>
              <td class="text-center">45</td>
              <td class="text-center"><span class="text-success fw-semibold">96%</span></td>
              <td class="text-end fw-bold text-primary">2.850 XP</td>
            </tr>
            <!-- 2º Lugar -->
            <tr>
              <td class="text-center">
                <span class="fs-4">🥈</span>
              </td>
              <td>
                <div class="d-flex align-items-center gap-2">
                  <img src="/vuexy/img/educacross/avatars/Avatar-2.svg" alt="" class="rounded-circle" width="40">
                  <div>
                    <div class="fw-semibold">João Silva</div>
                    <small class="text-muted">5º Ano A</small>
                  </div>
                </div>
              </td>
              <td class="text-center">42</td>
              <td class="text-center"><span class="text-success fw-semibold">91%</span></td>
              <td class="text-end fw-bold text-primary">2.620 XP</td>
            </tr>
            <!-- 3º Lugar -->
            <tr>
              <td class="text-center">
                <span class="fs-4">🥉</span>
              </td>
              <td>
                <div class="d-flex align-items-center gap-2">
                  <img src="/vuexy/img/educacross/avatars/Avatar-3.svg" alt="" class="rounded-circle" width="40">
                  <div>
                    <div class="fw-semibold">Ana Oliveira</div>
                    <small class="text-muted">6º Ano A</small>
                  </div>
                </div>
              </td>
              <td class="text-center">40</td>
              <td class="text-center"><span class="text-success fw-semibold">88%</span></td>
              <td class="text-end fw-bold text-primary">2.480 XP</td>
            </tr>
            <!-- 4º -->
            <tr>
              <td class="text-center fw-semibold text-muted">4</td>
              <td>
                <div class="d-flex align-items-center gap-2">
                  <img src="/vuexy/img/educacross/avatars/Avatar-4.svg" alt="" class="rounded-circle" width="40">
                  <div>
                    <div class="fw-semibold">Pedro Costa</div>
                    <small class="text-muted">5º Ano B</small>
                  </div>
                </div>
              </td>
              <td class="text-center">38</td>
              <td class="text-center"><span class="text-warning fw-semibold">79%</span></td>
              <td class="text-end fw-medium">2.150 XP</td>
            </tr>
            <!-- 5º -->
            <tr>
              <td class="text-center fw-semibold text-muted">5</td>
              <td>
                <div class="d-flex align-items-center gap-2">
                  <img src="/vuexy/img/educacross/avatars/Avatar-5.svg" alt="" class="rounded-circle" width="40">
                  <div>
                    <div class="fw-semibold">Lucas Ferreira</div>
                    <small class="text-muted">6º Ano B</small>
                  </div>
                </div>
              </td>
              <td class="text-center">35</td>
              <td class="text-center"><span class="text-warning fw-semibold">82%</span></td>
              <td class="text-end fw-medium">1.980 XP</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `},i={name:"📈 Relatório",render:()=>`
    <div class="card">
      <div class="card-header d-flex justify-content-between align-items-center">
        <h5 class="mb-0">Relatório de Desempenho por Habilidade</h5>
        <div class="d-flex gap-2">
          <button class="btn btn-outline-secondary btn-sm">
            <i class="bi bi-download me-1"></i> Exportar
          </button>
        </div>
      </div>
      <div class="table-responsive">
        <table class="table table-bordered mb-0">
          <thead class="table-light">
            <tr>
              <th rowspan="2" class="align-middle">Habilidade</th>
              <th colspan="3" class="text-center">Desempenho</th>
              <th rowspan="2" class="text-center align-middle">Tendência</th>
            </tr>
            <tr>
              <th class="text-center">Tentativas</th>
              <th class="text-center">Acertos</th>
              <th class="text-center">Taxa</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <div class="d-flex align-items-center gap-2">
                  <span class="badge bg-primary rounded-pill">EF05MA01</span>
                  Adição até 1000
                </div>
              </td>
              <td class="text-center">1.250</td>
              <td class="text-center">1.125</td>
              <td class="text-center">
                <span class="badge bg-success">90%</span>
              </td>
              <td class="text-center text-success">
                <i class="bi bi-arrow-up-right"></i> +5%
              </td>
            </tr>
            <tr>
              <td>
                <div class="d-flex align-items-center gap-2">
                  <span class="badge bg-primary rounded-pill">EF05MA02</span>
                  Subtração até 1000
                </div>
              </td>
              <td class="text-center">980</td>
              <td class="text-center">833</td>
              <td class="text-center">
                <span class="badge bg-success">85%</span>
              </td>
              <td class="text-center text-success">
                <i class="bi bi-arrow-up-right"></i> +3%
              </td>
            </tr>
            <tr>
              <td>
                <div class="d-flex align-items-center gap-2">
                  <span class="badge bg-primary rounded-pill">EF05MA03</span>
                  Multiplicação básica
                </div>
              </td>
              <td class="text-center">750</td>
              <td class="text-center">563</td>
              <td class="text-center">
                <span class="badge bg-warning">75%</span>
              </td>
              <td class="text-center text-muted">
                <i class="bi bi-dash"></i> 0%
              </td>
            </tr>
            <tr>
              <td>
                <div class="d-flex align-items-center gap-2">
                  <span class="badge bg-primary rounded-pill">EF05MA04</span>
                  Divisão básica
                </div>
              </td>
              <td class="text-center">620</td>
              <td class="text-center">409</td>
              <td class="text-center">
                <span class="badge bg-danger">66%</span>
              </td>
              <td class="text-center text-danger">
                <i class="bi bi-arrow-down-right"></i> -2%
              </td>
            </tr>
            <tr>
              <td>
                <div class="d-flex align-items-center gap-2">
                  <span class="badge bg-primary rounded-pill">EF05MA05</span>
                  Frações simples
                </div>
              </td>
              <td class="text-center">450</td>
              <td class="text-center">315</td>
              <td class="text-center">
                <span class="badge bg-warning">70%</span>
              </td>
              <td class="text-center text-success">
                <i class="bi bi-arrow-up-right"></i> +8%
              </td>
            </tr>
          </tbody>
          <tfoot class="table-light">
            <tr class="fw-bold">
              <td>Total</td>
              <td class="text-center">4.050</td>
              <td class="text-center">3.245</td>
              <td class="text-center">
                <span class="badge bg-success">80%</span>
              </td>
              <td class="text-center text-success">
                <i class="bi bi-arrow-up-right"></i> +3%
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  `},l={name:"📱 Tabela Compacta",render:()=>`
    <div class="card" style="max-width: 400px;">
      <div class="card-header">
        <h6 class="mb-0">Últimas Atividades</h6>
      </div>
      <div class="table-responsive">
        <table class="table table-sm mb-0">
          <thead>
            <tr>
              <th>Jogo</th>
              <th class="text-center">Pts</th>
              <th class="text-end">Hora</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Soma Veloz</td>
              <td class="text-center"><span class="text-success">+50</span></td>
              <td class="text-end text-muted">14:30</td>
            </tr>
            <tr>
              <td>Multi Mania</td>
              <td class="text-center"><span class="text-success">+75</span></td>
              <td class="text-end text-muted">14:15</td>
            </tr>
            <tr>
              <td>Divide Quest</td>
              <td class="text-center"><span class="text-success">+40</span></td>
              <td class="text-end text-muted">13:50</td>
            </tr>
            <tr>
              <td>Fração Fun</td>
              <td class="text-center"><span class="text-danger">+20</span></td>
              <td class="text-end text-muted">13:30</td>
            </tr>
            <tr>
              <td>Soma Veloz</td>
              <td class="text-center"><span class="text-success">+60</span></td>
              <td class="text-end text-muted">13:10</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `};var c,r,o;t.parameters={...t.parameters,docs:{...(c=t.parameters)==null?void 0:c.docs,source:{originalSource:`{
  name: '📊 Tabela Básica',
  render: () => \`
    <div class="card">
      <div class="table-responsive">
        <table class="table">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Turma</th>
              <th>Pontos XP</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>João Silva</td>
              <td>5º Ano A</td>
              <td>1.250</td>
              <td><span class="badge bg-success">Ativo</span></td>
            </tr>
            <tr>
              <td>Maria Santos</td>
              <td>5º Ano A</td>
              <td>1.180</td>
              <td><span class="badge bg-success">Ativo</span></td>
            </tr>
            <tr>
              <td>Pedro Costa</td>
              <td>5º Ano B</td>
              <td>980</td>
              <td><span class="badge bg-success">Ativo</span></td>
            </tr>
            <tr>
              <td>Ana Oliveira</td>
              <td>6º Ano A</td>
              <td>1.520</td>
              <td><span class="badge bg-warning">Pendente</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  \`
}`,...(o=(r=t.parameters)==null?void 0:r.docs)==null?void 0:o.source}}};var b,m,v;s.parameters={...s.parameters,docs:{...(b=s.parameters)==null?void 0:b.docs,source:{originalSource:`{
  name: '🦓 Tabela Striped',
  render: () => \`
    <div class="card">
      <div class="table-responsive">
        <table class="table table-striped">
          <thead>
            <tr>
              <th>#</th>
              <th>Aluno</th>
              <th>Jogos Completos</th>
              <th>Tempo Total</th>
              <th>Média</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Lucas Ferreira</td>
              <td>45</td>
              <td>12h 30min</td>
              <td>85%</td>
            </tr>
            <tr>
              <td>2</td>
              <td>Julia Mendes</td>
              <td>42</td>
              <td>11h 45min</td>
              <td>92%</td>
            </tr>
            <tr>
              <td>3</td>
              <td>Gabriel Santos</td>
              <td>38</td>
              <td>10h 20min</td>
              <td>78%</td>
            </tr>
            <tr>
              <td>4</td>
              <td>Sofia Lima</td>
              <td>35</td>
              <td>9h 15min</td>
              <td>88%</td>
            </tr>
            <tr>
              <td>5</td>
              <td>Matheus Alves</td>
              <td>33</td>
              <td>8h 50min</td>
              <td>75%</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  \`
}`,...(v=(m=s.parameters)==null?void 0:m.docs)==null?void 0:v.source}}};var p,x,h;e.parameters={...e.parameters,docs:{...(p=e.parameters)==null?void 0:p.docs,source:{originalSource:`{
  name: '👆 Tabela Hover',
  render: () => \`
    <div class="card">
      <div class="table-responsive">
        <table class="table table-hover">
          <thead>
            <tr>
              <th>Jogo</th>
              <th>Habilidade</th>
              <th>Jogadas</th>
              <th>Acertos</th>
              <th>Taxa</th>
            </tr>
          </thead>
          <tbody class="table-border-bottom-0">
            <tr style="cursor: pointer;">
              <td>
                <div class="d-flex align-items-center gap-2">
                  <span class="avatar avatar-sm bg-primary rounded">
                    <i class="bi bi-calculator text-white"></i>
                  </span>
                  Soma Veloz
                </div>
              </td>
              <td>Adição</td>
              <td>1.250</td>
              <td>1.100</td>
              <td><span class="text-success fw-semibold">88%</span></td>
            </tr>
            <tr style="cursor: pointer;">
              <td>
                <div class="d-flex align-items-center gap-2">
                  <span class="avatar avatar-sm bg-danger rounded">
                    <i class="bi bi-dash-lg text-white"></i>
                  </span>
                  Subtrai Fácil
                </div>
              </td>
              <td>Subtração</td>
              <td>980</td>
              <td>820</td>
              <td><span class="text-success fw-semibold">84%</span></td>
            </tr>
            <tr style="cursor: pointer;">
              <td>
                <div class="d-flex align-items-center gap-2">
                  <span class="avatar avatar-sm bg-success rounded">
                    <i class="bi bi-x-lg text-white"></i>
                  </span>
                  Multiplica Mania
                </div>
              </td>
              <td>Multiplicação</td>
              <td>750</td>
              <td>580</td>
              <td><span class="text-warning fw-semibold">77%</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  \`
}`,...(h=(x=e.parameters)==null?void 0:x.docs)==null?void 0:h.source}}};var g,u,w;a.parameters={...a.parameters,docs:{...(g=a.parameters)==null?void 0:g.docs,source:{originalSource:`{
  name: '⚙️ Com Ações',
  render: () => \`
    <div class="card">
      <div class="card-header d-flex justify-content-between align-items-center">
        <h5 class="mb-0">Alunos da Turma</h5>
        <button class="btn btn-primary btn-sm">
          <i class="bi bi-plus-lg me-1"></i> Adicionar Aluno
        </button>
      </div>
      <div class="table-responsive">
        <table class="table">
          <thead>
            <tr>
              <th>Aluno</th>
              <th>E-mail</th>
              <th>Status</th>
              <th>Último Acesso</th>
              <th class="text-end">Ações</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <div class="d-flex align-items-center gap-2">
                  <img src="/vuexy/img/educacross/avatars/Avatar-1.svg" alt="" class="rounded-circle" width="32" height="32">
                  <div>
                    <div class="fw-medium">João Silva</div>
                    <small class="text-muted">5º Ano A</small>
                  </div>
                </div>
              </td>
              <td>joao.silva@escola.com</td>
              <td><span class="badge bg-success">Ativo</span></td>
              <td>Hoje, 14:30</td>
              <td class="text-end">
                <div class="dropdown">
                  <button class="btn btn-icon btn-sm" data-bs-toggle="dropdown">
                    <i class="bi bi-three-dots-vertical"></i>
                  </button>
                  <ul class="dropdown-menu dropdown-menu-end">
                    <li><a class="dropdown-item" href="#"><i class="bi bi-eye me-2"></i>Ver Perfil</a></li>
                    <li><a class="dropdown-item" href="#"><i class="bi bi-pencil me-2"></i>Editar</a></li>
                    <li><a class="dropdown-item" href="#"><i class="bi bi-bar-chart me-2"></i>Relatório</a></li>
                    <li><hr class="dropdown-divider"></li>
                    <li><a class="dropdown-item text-danger" href="#"><i class="bi bi-trash me-2"></i>Remover</a></li>
                  </ul>
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <div class="d-flex align-items-center gap-2">
                  <img src="/vuexy/img/educacross/avatars/Avatar-2.svg" alt="" class="rounded-circle" width="32" height="32">
                  <div>
                    <div class="fw-medium">Maria Santos</div>
                    <small class="text-muted">5º Ano A</small>
                  </div>
                </div>
              </td>
              <td>maria.santos@escola.com</td>
              <td><span class="badge bg-success">Ativo</span></td>
              <td>Ontem, 16:45</td>
              <td class="text-end">
                <div class="dropdown">
                  <button class="btn btn-icon btn-sm" data-bs-toggle="dropdown">
                    <i class="bi bi-three-dots-vertical"></i>
                  </button>
                  <ul class="dropdown-menu dropdown-menu-end">
                    <li><a class="dropdown-item" href="#"><i class="bi bi-eye me-2"></i>Ver Perfil</a></li>
                    <li><a class="dropdown-item" href="#"><i class="bi bi-pencil me-2"></i>Editar</a></li>
                    <li><a class="dropdown-item" href="#"><i class="bi bi-bar-chart me-2"></i>Relatório</a></li>
                    <li><hr class="dropdown-divider"></li>
                    <li><a class="dropdown-item text-danger" href="#"><i class="bi bi-trash me-2"></i>Remover</a></li>
                  </ul>
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <div class="d-flex align-items-center gap-2">
                  <img src="/vuexy/img/educacross/avatars/Avatar-3.svg" alt="" class="rounded-circle" width="32" height="32">
                  <div>
                    <div class="fw-medium">Pedro Costa</div>
                    <small class="text-muted">5º Ano A</small>
                  </div>
                </div>
              </td>
              <td>pedro.costa@escola.com</td>
              <td><span class="badge bg-warning">Inativo</span></td>
              <td>Há 5 dias</td>
              <td class="text-end">
                <div class="dropdown">
                  <button class="btn btn-icon btn-sm" data-bs-toggle="dropdown">
                    <i class="bi bi-three-dots-vertical"></i>
                  </button>
                  <ul class="dropdown-menu dropdown-menu-end">
                    <li><a class="dropdown-item" href="#"><i class="bi bi-eye me-2"></i>Ver Perfil</a></li>
                    <li><a class="dropdown-item" href="#"><i class="bi bi-pencil me-2"></i>Editar</a></li>
                    <li><a class="dropdown-item" href="#"><i class="bi bi-bar-chart me-2"></i>Relatório</a></li>
                    <li><hr class="dropdown-divider"></li>
                    <li><a class="dropdown-item text-danger" href="#"><i class="bi bi-trash me-2"></i>Remover</a></li>
                  </ul>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  \`
}`,...(w=(u=a.parameters)==null?void 0:u.docs)==null?void 0:w.source}}};var f,A,y;d.parameters={...d.parameters,docs:{...(f=d.parameters)==null?void 0:f.docs,source:{originalSource:`{
  name: '☑️ Com Seleção',
  render: () => \`
    <div class="card">
      <div class="card-header d-flex justify-content-between align-items-center">
        <div class="d-flex align-items-center gap-3">
          <div class="form-check">
            <input class="form-check-input" type="checkbox" id="selectAll">
            <label class="form-check-label" for="selectAll">Selecionar todos</label>
          </div>
          <span class="text-muted">3 selecionados</span>
        </div>
        <div class="d-flex gap-2">
          <button class="btn btn-outline-primary btn-sm">
            <i class="bi bi-envelope me-1"></i> Enviar Mensagem
          </button>
          <button class="btn btn-outline-danger btn-sm">
            <i class="bi bi-trash me-1"></i> Remover
          </button>
        </div>
      </div>
      <div class="table-responsive">
        <table class="table">
          <thead>
            <tr>
              <th style="width: 40px;"></th>
              <th>Aluno</th>
              <th>Turma</th>
              <th>Pontos</th>
              <th>Progresso</th>
            </tr>
          </thead>
          <tbody>
            <tr class="table-active">
              <td>
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" checked>
                </div>
              </td>
              <td>
                <div class="d-flex align-items-center gap-2">
                  <img src="/vuexy/img/educacross/avatars/Avatar-1.svg" alt="" class="rounded-circle" width="32">
                  João Silva
                </div>
              </td>
              <td>5º Ano A</td>
              <td>1.250 XP</td>
              <td>
                <div class="d-flex align-items-center gap-2">
                  <div class="progress" style="width: 100px; height: 6px;">
                    <div class="progress-bar bg-success" style="width: 85%"></div>
                  </div>
                  <span class="text-muted small">85%</span>
                </div>
              </td>
            </tr>
            <tr class="table-active">
              <td>
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" checked>
                </div>
              </td>
              <td>
                <div class="d-flex align-items-center gap-2">
                  <img src="/vuexy/img/educacross/avatars/Avatar-2.svg" alt="" class="rounded-circle" width="32">
                  Maria Santos
                </div>
              </td>
              <td>5º Ano A</td>
              <td>1.180 XP</td>
              <td>
                <div class="d-flex align-items-center gap-2">
                  <div class="progress" style="width: 100px; height: 6px;">
                    <div class="progress-bar bg-success" style="width: 92%"></div>
                  </div>
                  <span class="text-muted small">92%</span>
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <div class="form-check">
                  <input class="form-check-input" type="checkbox">
                </div>
              </td>
              <td>
                <div class="d-flex align-items-center gap-2">
                  <img src="/vuexy/img/educacross/avatars/Avatar-3.svg" alt="" class="rounded-circle" width="32">
                  Pedro Costa
                </div>
              </td>
              <td>5º Ano B</td>
              <td>980 XP</td>
              <td>
                <div class="d-flex align-items-center gap-2">
                  <div class="progress" style="width: 100px; height: 6px;">
                    <div class="progress-bar bg-warning" style="width: 65%"></div>
                  </div>
                  <span class="text-muted small">65%</span>
                </div>
              </td>
            </tr>
            <tr class="table-active">
              <td>
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" checked>
                </div>
              </td>
              <td>
                <div class="d-flex align-items-center gap-2">
                  <img src="/vuexy/img/educacross/avatars/Avatar-4.svg" alt="" class="rounded-circle" width="32">
                  Ana Oliveira
                </div>
              </td>
              <td>6º Ano A</td>
              <td>1.520 XP</td>
              <td>
                <div class="d-flex align-items-center gap-2">
                  <div class="progress" style="width: 100px; height: 6px;">
                    <div class="progress-bar bg-success" style="width: 98%"></div>
                  </div>
                  <span class="text-muted small">98%</span>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  \`
}`,...(y=(A=d.parameters)==null?void 0:A.docs)==null?void 0:y.source}}};var E,S,T;n.parameters={...n.parameters,docs:{...(E=n.parameters)==null?void 0:E.docs,source:{originalSource:`{
  name: '🏆 Ranking',
  render: () => \`
    <div class="card">
      <div class="card-header">
        <h5 class="mb-0">
          <i class="bi bi-trophy-fill text-warning me-2"></i>
          Ranking da Semana
        </h5>
      </div>
      <div class="table-responsive">
        <table class="table table-hover mb-0">
          <thead>
            <tr>
              <th class="text-center" style="width: 60px;">#</th>
              <th>Aluno</th>
              <th class="text-center">Jogos</th>
              <th class="text-center">Acertos</th>
              <th class="text-end">Pontos</th>
            </tr>
          </thead>
          <tbody>
            <!-- 1º Lugar -->
            <tr class="table-warning">
              <td class="text-center">
                <span class="fs-4">🥇</span>
              </td>
              <td>
                <div class="d-flex align-items-center gap-2">
                  <img src="/vuexy/img/educacross/avatars/Avatar-1.svg" alt="" class="rounded-circle" width="40">
                  <div>
                    <div class="fw-semibold">Maria Santos</div>
                    <small class="text-muted">5º Ano A</small>
                  </div>
                </div>
              </td>
              <td class="text-center">45</td>
              <td class="text-center"><span class="text-success fw-semibold">96%</span></td>
              <td class="text-end fw-bold text-primary">2.850 XP</td>
            </tr>
            <!-- 2º Lugar -->
            <tr>
              <td class="text-center">
                <span class="fs-4">🥈</span>
              </td>
              <td>
                <div class="d-flex align-items-center gap-2">
                  <img src="/vuexy/img/educacross/avatars/Avatar-2.svg" alt="" class="rounded-circle" width="40">
                  <div>
                    <div class="fw-semibold">João Silva</div>
                    <small class="text-muted">5º Ano A</small>
                  </div>
                </div>
              </td>
              <td class="text-center">42</td>
              <td class="text-center"><span class="text-success fw-semibold">91%</span></td>
              <td class="text-end fw-bold text-primary">2.620 XP</td>
            </tr>
            <!-- 3º Lugar -->
            <tr>
              <td class="text-center">
                <span class="fs-4">🥉</span>
              </td>
              <td>
                <div class="d-flex align-items-center gap-2">
                  <img src="/vuexy/img/educacross/avatars/Avatar-3.svg" alt="" class="rounded-circle" width="40">
                  <div>
                    <div class="fw-semibold">Ana Oliveira</div>
                    <small class="text-muted">6º Ano A</small>
                  </div>
                </div>
              </td>
              <td class="text-center">40</td>
              <td class="text-center"><span class="text-success fw-semibold">88%</span></td>
              <td class="text-end fw-bold text-primary">2.480 XP</td>
            </tr>
            <!-- 4º -->
            <tr>
              <td class="text-center fw-semibold text-muted">4</td>
              <td>
                <div class="d-flex align-items-center gap-2">
                  <img src="/vuexy/img/educacross/avatars/Avatar-4.svg" alt="" class="rounded-circle" width="40">
                  <div>
                    <div class="fw-semibold">Pedro Costa</div>
                    <small class="text-muted">5º Ano B</small>
                  </div>
                </div>
              </td>
              <td class="text-center">38</td>
              <td class="text-center"><span class="text-warning fw-semibold">79%</span></td>
              <td class="text-end fw-medium">2.150 XP</td>
            </tr>
            <!-- 5º -->
            <tr>
              <td class="text-center fw-semibold text-muted">5</td>
              <td>
                <div class="d-flex align-items-center gap-2">
                  <img src="/vuexy/img/educacross/avatars/Avatar-5.svg" alt="" class="rounded-circle" width="40">
                  <div>
                    <div class="fw-semibold">Lucas Ferreira</div>
                    <small class="text-muted">6º Ano B</small>
                  </div>
                </div>
              </td>
              <td class="text-center">35</td>
              <td class="text-center"><span class="text-warning fw-semibold">82%</span></td>
              <td class="text-end fw-medium">1.980 XP</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  \`
}`,...(T=(S=n.parameters)==null?void 0:S.docs)==null?void 0:T.source}}};var P,k,M;i.parameters={...i.parameters,docs:{...(P=i.parameters)==null?void 0:P.docs,source:{originalSource:`{
  name: '📈 Relatório',
  render: () => \`
    <div class="card">
      <div class="card-header d-flex justify-content-between align-items-center">
        <h5 class="mb-0">Relatório de Desempenho por Habilidade</h5>
        <div class="d-flex gap-2">
          <button class="btn btn-outline-secondary btn-sm">
            <i class="bi bi-download me-1"></i> Exportar
          </button>
        </div>
      </div>
      <div class="table-responsive">
        <table class="table table-bordered mb-0">
          <thead class="table-light">
            <tr>
              <th rowspan="2" class="align-middle">Habilidade</th>
              <th colspan="3" class="text-center">Desempenho</th>
              <th rowspan="2" class="text-center align-middle">Tendência</th>
            </tr>
            <tr>
              <th class="text-center">Tentativas</th>
              <th class="text-center">Acertos</th>
              <th class="text-center">Taxa</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <div class="d-flex align-items-center gap-2">
                  <span class="badge bg-primary rounded-pill">EF05MA01</span>
                  Adição até 1000
                </div>
              </td>
              <td class="text-center">1.250</td>
              <td class="text-center">1.125</td>
              <td class="text-center">
                <span class="badge bg-success">90%</span>
              </td>
              <td class="text-center text-success">
                <i class="bi bi-arrow-up-right"></i> +5%
              </td>
            </tr>
            <tr>
              <td>
                <div class="d-flex align-items-center gap-2">
                  <span class="badge bg-primary rounded-pill">EF05MA02</span>
                  Subtração até 1000
                </div>
              </td>
              <td class="text-center">980</td>
              <td class="text-center">833</td>
              <td class="text-center">
                <span class="badge bg-success">85%</span>
              </td>
              <td class="text-center text-success">
                <i class="bi bi-arrow-up-right"></i> +3%
              </td>
            </tr>
            <tr>
              <td>
                <div class="d-flex align-items-center gap-2">
                  <span class="badge bg-primary rounded-pill">EF05MA03</span>
                  Multiplicação básica
                </div>
              </td>
              <td class="text-center">750</td>
              <td class="text-center">563</td>
              <td class="text-center">
                <span class="badge bg-warning">75%</span>
              </td>
              <td class="text-center text-muted">
                <i class="bi bi-dash"></i> 0%
              </td>
            </tr>
            <tr>
              <td>
                <div class="d-flex align-items-center gap-2">
                  <span class="badge bg-primary rounded-pill">EF05MA04</span>
                  Divisão básica
                </div>
              </td>
              <td class="text-center">620</td>
              <td class="text-center">409</td>
              <td class="text-center">
                <span class="badge bg-danger">66%</span>
              </td>
              <td class="text-center text-danger">
                <i class="bi bi-arrow-down-right"></i> -2%
              </td>
            </tr>
            <tr>
              <td>
                <div class="d-flex align-items-center gap-2">
                  <span class="badge bg-primary rounded-pill">EF05MA05</span>
                  Frações simples
                </div>
              </td>
              <td class="text-center">450</td>
              <td class="text-center">315</td>
              <td class="text-center">
                <span class="badge bg-warning">70%</span>
              </td>
              <td class="text-center text-success">
                <i class="bi bi-arrow-up-right"></i> +8%
              </td>
            </tr>
          </tbody>
          <tfoot class="table-light">
            <tr class="fw-bold">
              <td>Total</td>
              <td class="text-center">4.050</td>
              <td class="text-center">3.245</td>
              <td class="text-center">
                <span class="badge bg-success">80%</span>
              </td>
              <td class="text-center text-success">
                <i class="bi bi-arrow-up-right"></i> +3%
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  \`
}`,...(M=(k=i.parameters)==null?void 0:k.docs)==null?void 0:M.source}}};var D,F,B;l.parameters={...l.parameters,docs:{...(D=l.parameters)==null?void 0:D.docs,source:{originalSource:`{
  name: '📱 Tabela Compacta',
  render: () => \`
    <div class="card" style="max-width: 400px;">
      <div class="card-header">
        <h6 class="mb-0">Últimas Atividades</h6>
      </div>
      <div class="table-responsive">
        <table class="table table-sm mb-0">
          <thead>
            <tr>
              <th>Jogo</th>
              <th class="text-center">Pts</th>
              <th class="text-end">Hora</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Soma Veloz</td>
              <td class="text-center"><span class="text-success">+50</span></td>
              <td class="text-end text-muted">14:30</td>
            </tr>
            <tr>
              <td>Multi Mania</td>
              <td class="text-center"><span class="text-success">+75</span></td>
              <td class="text-end text-muted">14:15</td>
            </tr>
            <tr>
              <td>Divide Quest</td>
              <td class="text-center"><span class="text-success">+40</span></td>
              <td class="text-end text-muted">13:50</td>
            </tr>
            <tr>
              <td>Fração Fun</td>
              <td class="text-center"><span class="text-danger">+20</span></td>
              <td class="text-end text-muted">13:30</td>
            </tr>
            <tr>
              <td>Soma Veloz</td>
              <td class="text-center"><span class="text-success">+60</span></td>
              <td class="text-end text-muted">13:10</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  \`
}`,...(B=(F=l.parameters)==null?void 0:F.docs)==null?void 0:B.source}}};const C=["BasicTable","StripedTable","HoverTable","TableWithActions","SelectableTable","RankingTable","ReportTable","SmallTable"];export{t as BasicTable,e as HoverTable,n as RankingTable,i as ReportTable,d as SelectableTable,l as SmallTable,s as StripedTable,a as TableWithActions,C as __namedExportsOrder,R as default};
