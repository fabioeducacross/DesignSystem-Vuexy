const j={title:"Educacross/Components/Charts",parameters:{layout:"padded",docs:{description:{component:`
## Charts & Data Visualization

Representações visuais de dados e métricas.

### Uso no Educacross
- **Dashboard**: Gráficos de desempenho geral
- **Relatórios**: Progressão e comparativos
- **Perfil de aluno**: Histórico e evolução

### Tipos de Gráficos
- Barras (progresso, comparativo)
- Linha (evolução temporal)
- Pizza/Donut (distribuição)
- Área (métricas cumulativas)

> **Nota**: Estes são mockups CSS/HTML. 
> Para implementação real, recomendamos ApexCharts.
        `}}}},s={name:"📊 Gráfico de Barras",render:()=>`
    <div class="card" style="max-width: 600px;">
      <div class="card-header d-flex justify-content-between align-items-center">
        <h6 class="mb-0">Desempenho por Habilidade</h6>
        <select class="form-select form-select-sm" style="width: auto;">
          <option>Esta semana</option>
          <option>Este mês</option>
        </select>
      </div>
      <div class="card-body">
        <!-- Bar chart mockup -->
        <div class="d-flex flex-column gap-3">
          <!-- Adição -->
          <div>
            <div class="d-flex justify-content-between mb-1">
              <span class="small">Adição</span>
              <span class="small fw-medium">92%</span>
            </div>
            <div class="progress" style="height: 24px;">
              <div class="progress-bar bg-success" style="width: 92%"></div>
            </div>
          </div>
          
          <!-- Subtração -->
          <div>
            <div class="d-flex justify-content-between mb-1">
              <span class="small">Subtração</span>
              <span class="small fw-medium">85%</span>
            </div>
            <div class="progress" style="height: 24px;">
              <div class="progress-bar bg-success" style="width: 85%"></div>
            </div>
          </div>
          
          <!-- Multiplicação -->
          <div>
            <div class="d-flex justify-content-between mb-1">
              <span class="small">Multiplicação</span>
              <span class="small fw-medium">73%</span>
            </div>
            <div class="progress" style="height: 24px;">
              <div class="progress-bar bg-warning" style="width: 73%"></div>
            </div>
          </div>
          
          <!-- Divisão -->
          <div>
            <div class="d-flex justify-content-between mb-1">
              <span class="small">Divisão</span>
              <span class="small fw-medium">58%</span>
            </div>
            <div class="progress" style="height: 24px;">
              <div class="progress-bar bg-danger" style="width: 58%"></div>
            </div>
          </div>
          
          <!-- Frações -->
          <div>
            <div class="d-flex justify-content-between mb-1">
              <span class="small">Frações</span>
              <span class="small fw-medium">45%</span>
            </div>
            <div class="progress" style="height: 24px;">
              <div class="progress-bar bg-danger" style="width: 45%"></div>
            </div>
          </div>
        </div>
        
        <!-- Legend -->
        <div class="d-flex justify-content-center gap-4 mt-4 pt-3 border-top">
          <div class="d-flex align-items-center gap-2">
            <span class="badge bg-success">&nbsp;</span>
            <small class="text-muted">≥80%</small>
          </div>
          <div class="d-flex align-items-center gap-2">
            <span class="badge bg-warning">&nbsp;</span>
            <small class="text-muted">60-79%</small>
          </div>
          <div class="d-flex align-items-center gap-2">
            <span class="badge bg-danger">&nbsp;</span>
            <small class="text-muted">&lt;60%</small>
          </div>
        </div>
      </div>
    </div>
  `},a={name:"🍩 Gráfico Donut",render:()=>`
    <div class="card" style="max-width: 400px;">
      <div class="card-header">
        <h6 class="mb-0">Distribuição de Níveis</h6>
      </div>
      <div class="card-body text-center">
        <!-- Donut mockup using CSS -->
        <div class="position-relative d-inline-block mb-4">
          <svg viewBox="0 0 36 36" style="width: 180px; height: 180px; transform: rotate(-90deg);">
            <!-- Background circle -->
            <circle cx="18" cy="18" r="15.9" fill="none" stroke="#e9ecef" stroke-width="3"></circle>
            <!-- Avançado (35%) -->
            <circle cx="18" cy="18" r="15.9" fill="none" stroke="#28a745" stroke-width="3"
              stroke-dasharray="35 65" stroke-dashoffset="0"></circle>
            <!-- Proficiente (40%) -->
            <circle cx="18" cy="18" r="15.9" fill="none" stroke="#007bff" stroke-width="3"
              stroke-dasharray="40 60" stroke-dashoffset="-35"></circle>
            <!-- Básico (18%) -->
            <circle cx="18" cy="18" r="15.9" fill="none" stroke="#ffc107" stroke-width="3"
              stroke-dasharray="18 82" stroke-dashoffset="-75"></circle>
            <!-- Abaixo (7%) -->
            <circle cx="18" cy="18" r="15.9" fill="none" stroke="#dc3545" stroke-width="3"
              stroke-dasharray="7 93" stroke-dashoffset="-93"></circle>
          </svg>
          <!-- Center text -->
          <div class="position-absolute top-50 start-50 translate-middle text-center">
            <div class="fs-4 fw-bold">245</div>
            <small class="text-muted">alunos</small>
          </div>
        </div>
        
        <!-- Legend -->
        <div class="d-flex flex-wrap justify-content-center gap-3">
          <div class="d-flex align-items-center gap-2">
            <span class="rounded-circle bg-success" style="width: 12px; height: 12px;"></span>
            <small>Avançado (35%)</small>
          </div>
          <div class="d-flex align-items-center gap-2">
            <span class="rounded-circle bg-primary" style="width: 12px; height: 12px;"></span>
            <small>Proficiente (40%)</small>
          </div>
          <div class="d-flex align-items-center gap-2">
            <span class="rounded-circle bg-warning" style="width: 12px; height: 12px;"></span>
            <small>Básico (18%)</small>
          </div>
          <div class="d-flex align-items-center gap-2">
            <span class="rounded-circle bg-danger" style="width: 12px; height: 12px;"></span>
            <small>Abaixo (7%)</small>
          </div>
        </div>
      </div>
    </div>
  `},e={name:"📈 Gráfico de Linha",render:()=>`
    <div class="card" style="max-width: 600px;">
      <div class="card-header d-flex justify-content-between align-items-center">
        <h6 class="mb-0">Evolução do Desempenho</h6>
        <div class="d-flex gap-2">
          <span class="badge bg-light text-dark">Semana</span>
          <span class="badge bg-primary">Mês</span>
          <span class="badge bg-light text-dark">Ano</span>
        </div>
      </div>
      <div class="card-body">
        <!-- Line chart mockup -->
        <svg viewBox="0 0 400 150" style="width: 100%; height: 150px;">
          <!-- Grid lines -->
          <line x1="0" y1="0" x2="400" y2="0" stroke="#f0f0f0" stroke-width="1"/>
          <line x1="0" y1="37.5" x2="400" y2="37.5" stroke="#f0f0f0" stroke-width="1"/>
          <line x1="0" y1="75" x2="400" y2="75" stroke="#f0f0f0" stroke-width="1"/>
          <line x1="0" y1="112.5" x2="400" y2="112.5" stroke="#f0f0f0" stroke-width="1"/>
          <line x1="0" y1="150" x2="400" y2="150" stroke="#f0f0f0" stroke-width="1"/>
          
          <!-- Area fill -->
          <path d="M 0 120 L 50 100 L 100 90 L 150 95 L 200 70 L 250 60 L 300 45 L 350 40 L 400 30 L 400 150 L 0 150 Z" 
                fill="url(#gradient)" opacity="0.3"/>
          
          <!-- Line -->
          <polyline points="0,120 50,100 100,90 150,95 200,70 250,60 300,45 350,40 400,30" 
                    fill="none" stroke="#7367f0" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
          
          <!-- Points -->
          <circle cx="0" cy="120" r="4" fill="#7367f0"/>
          <circle cx="50" cy="100" r="4" fill="#7367f0"/>
          <circle cx="100" cy="90" r="4" fill="#7367f0"/>
          <circle cx="150" cy="95" r="4" fill="#7367f0"/>
          <circle cx="200" cy="70" r="4" fill="#7367f0"/>
          <circle cx="250" cy="60" r="4" fill="#7367f0"/>
          <circle cx="300" cy="45" r="4" fill="#7367f0"/>
          <circle cx="350" cy="40" r="4" fill="#7367f0"/>
          <circle cx="400" cy="30" r="6" fill="#7367f0" stroke="white" stroke-width="2"/>
          
          <!-- Gradient definition -->
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" style="stop-color:#7367f0;stop-opacity:0.5"/>
              <stop offset="100%" style="stop-color:#7367f0;stop-opacity:0"/>
            </linearGradient>
          </defs>
        </svg>
        
        <!-- X axis labels -->
        <div class="d-flex justify-content-between mt-2 text-muted small">
          <span>Semana 1</span>
          <span>Semana 2</span>
          <span>Semana 3</span>
          <span>Semana 4</span>
        </div>
        
        <!-- Stats -->
        <div class="row text-center mt-4 pt-3 border-top">
          <div class="col">
            <div class="text-muted small">Início</div>
            <div class="fw-bold">65%</div>
          </div>
          <div class="col">
            <div class="text-muted small">Atual</div>
            <div class="fw-bold text-primary">82%</div>
          </div>
          <div class="col">
            <div class="text-muted small">Evolução</div>
            <div class="fw-bold text-success">
              <i class="bi bi-arrow-up"></i> +17%
            </div>
          </div>
        </div>
      </div>
    </div>
  `},i={name:"🔢 Stat Cards",render:()=>`
    <div class="row g-4" style="max-width: 900px;">
      <!-- Card 1 -->
      <div class="col-sm-6 col-lg-3">
        <div class="card border-start border-primary border-4">
          <div class="card-body">
            <div class="d-flex justify-content-between align-items-center mb-2">
              <span class="text-muted small">Total de Alunos</span>
              <span class="avatar avatar-sm bg-primary bg-opacity-10 rounded">
                <i class="bi bi-people text-primary"></i>
              </span>
            </div>
            <h3 class="mb-0">245</h3>
            <small class="text-success">
              <i class="bi bi-arrow-up"></i> +12% este mês
            </small>
          </div>
        </div>
      </div>
      
      <!-- Card 2 -->
      <div class="col-sm-6 col-lg-3">
        <div class="card border-start border-success border-4">
          <div class="card-body">
            <div class="d-flex justify-content-between align-items-center mb-2">
              <span class="text-muted small">Jogos Completos</span>
              <span class="avatar avatar-sm bg-success bg-opacity-10 rounded">
                <i class="bi bi-controller text-success"></i>
              </span>
            </div>
            <h3 class="mb-0">1.892</h3>
            <small class="text-success">
              <i class="bi bi-arrow-up"></i> +8% esta semana
            </small>
          </div>
        </div>
      </div>
      
      <!-- Card 3 -->
      <div class="col-sm-6 col-lg-3">
        <div class="card border-start border-warning border-4">
          <div class="card-body">
            <div class="d-flex justify-content-between align-items-center mb-2">
              <span class="text-muted small">Taxa de Acerto</span>
              <span class="avatar avatar-sm bg-warning bg-opacity-10 rounded">
                <i class="bi bi-bullseye text-warning"></i>
              </span>
            </div>
            <h3 class="mb-0">78%</h3>
            <small class="text-muted">
              <i class="bi bi-dash"></i> Estável
            </small>
          </div>
        </div>
      </div>
      
      <!-- Card 4 -->
      <div class="col-sm-6 col-lg-3">
        <div class="card border-start border-info border-4">
          <div class="card-body">
            <div class="d-flex justify-content-between align-items-center mb-2">
              <span class="text-muted small">Tempo Médio</span>
              <span class="avatar avatar-sm bg-info bg-opacity-10 rounded">
                <i class="bi bi-clock text-info"></i>
              </span>
            </div>
            <h3 class="mb-0">42min</h3>
            <small class="text-danger">
              <i class="bi bi-arrow-down"></i> -5% vs meta
            </small>
          </div>
        </div>
      </div>
    </div>
  `},l={name:"⚖️ Comparativo",render:()=>`
    <div class="card" style="max-width: 500px;">
      <div class="card-header">
        <h6 class="mb-0">Comparativo: Turma vs Escola</h6>
      </div>
      <div class="card-body">
        <div class="d-flex flex-column gap-4">
          <!-- Métrica 1 -->
          <div>
            <div class="d-flex justify-content-between mb-2">
              <span class="small">Taxa de Acerto</span>
            </div>
            <div class="d-flex gap-2 align-items-center">
              <div class="flex-grow-1">
                <div class="d-flex justify-content-between mb-1">
                  <small class="text-primary">Turma 5º A</small>
                  <small class="fw-medium">85%</small>
                </div>
                <div class="progress" style="height: 8px;">
                  <div class="progress-bar bg-primary" style="width: 85%"></div>
                </div>
              </div>
            </div>
            <div class="d-flex gap-2 align-items-center mt-1">
              <div class="flex-grow-1">
                <div class="d-flex justify-content-between mb-1">
                  <small class="text-secondary">Média Escola</small>
                  <small class="fw-medium text-muted">72%</small>
                </div>
                <div class="progress" style="height: 8px;">
                  <div class="progress-bar bg-secondary" style="width: 72%"></div>
                </div>
              </div>
            </div>
            <div class="text-end mt-1">
              <span class="badge bg-success-subtle text-success">+13% acima</span>
            </div>
          </div>
          
          <hr class="my-0">
          
          <!-- Métrica 2 -->
          <div>
            <div class="d-flex justify-content-between mb-2">
              <span class="small">Engajamento</span>
            </div>
            <div class="d-flex gap-2 align-items-center">
              <div class="flex-grow-1">
                <div class="d-flex justify-content-between mb-1">
                  <small class="text-primary">Turma 5º A</small>
                  <small class="fw-medium">92%</small>
                </div>
                <div class="progress" style="height: 8px;">
                  <div class="progress-bar bg-primary" style="width: 92%"></div>
                </div>
              </div>
            </div>
            <div class="d-flex gap-2 align-items-center mt-1">
              <div class="flex-grow-1">
                <div class="d-flex justify-content-between mb-1">
                  <small class="text-secondary">Média Escola</small>
                  <small class="fw-medium text-muted">78%</small>
                </div>
                <div class="progress" style="height: 8px;">
                  <div class="progress-bar bg-secondary" style="width: 78%"></div>
                </div>
              </div>
            </div>
            <div class="text-end mt-1">
              <span class="badge bg-success-subtle text-success">+14% acima</span>
            </div>
          </div>
          
          <hr class="my-0">
          
          <!-- Métrica 3 -->
          <div>
            <div class="d-flex justify-content-between mb-2">
              <span class="small">Tempo de Uso</span>
            </div>
            <div class="d-flex gap-2 align-items-center">
              <div class="flex-grow-1">
                <div class="d-flex justify-content-between mb-1">
                  <small class="text-primary">Turma 5º A</small>
                  <small class="fw-medium">45min</small>
                </div>
                <div class="progress" style="height: 8px;">
                  <div class="progress-bar bg-primary" style="width: 60%"></div>
                </div>
              </div>
            </div>
            <div class="d-flex gap-2 align-items-center mt-1">
              <div class="flex-grow-1">
                <div class="d-flex justify-content-between mb-1">
                  <small class="text-secondary">Média Escola</small>
                  <small class="fw-medium text-muted">52min</small>
                </div>
                <div class="progress" style="height: 8px;">
                  <div class="progress-bar bg-secondary" style="width: 69%"></div>
                </div>
              </div>
            </div>
            <div class="text-end mt-1">
              <span class="badge bg-warning-subtle text-warning">-7min abaixo</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `},n={name:"📉 Mini Charts",render:()=>`
    <div class="row g-4" style="max-width: 800px;">
      <!-- Mini chart 1 -->
      <div class="col-md-4">
        <div class="card">
          <div class="card-body">
            <div class="d-flex justify-content-between align-items-start mb-3">
              <div>
                <small class="text-muted">Acertos/dia</small>
                <h4 class="mb-0">156</h4>
              </div>
              <span class="badge bg-success-subtle text-success">+12%</span>
            </div>
            <svg viewBox="0 0 100 30" style="width: 100%; height: 30px;">
              <polyline points="0,25 15,20 30,22 45,15 60,18 75,10 90,12 100,5" 
                        fill="none" stroke="#28a745" stroke-width="2" stroke-linecap="round"/>
            </svg>
          </div>
        </div>
      </div>
      
      <!-- Mini chart 2 -->
      <div class="col-md-4">
        <div class="card">
          <div class="card-body">
            <div class="d-flex justify-content-between align-items-start mb-3">
              <div>
                <small class="text-muted">Tempo médio</small>
                <h4 class="mb-0">8min</h4>
              </div>
              <span class="badge bg-warning-subtle text-warning">-2%</span>
            </div>
            <svg viewBox="0 0 100 30" style="width: 100%; height: 30px;">
              <polyline points="0,10 15,15 30,12 45,18 60,16 75,20 90,18 100,22" 
                        fill="none" stroke="#ffc107" stroke-width="2" stroke-linecap="round"/>
            </svg>
          </div>
        </div>
      </div>
      
      <!-- Mini chart 3 -->
      <div class="col-md-4">
        <div class="card">
          <div class="card-body">
            <div class="d-flex justify-content-between align-items-start mb-3">
              <div>
                <small class="text-muted">Jogos/aluno</small>
                <h4 class="mb-0">3.2</h4>
              </div>
              <span class="badge bg-primary-subtle text-primary">Estável</span>
            </div>
            <svg viewBox="0 0 100 30" style="width: 100%; height: 30px;">
              <polyline points="0,15 15,14 30,16 45,15 60,14 75,15 90,14 100,15" 
                        fill="none" stroke="#7367f0" stroke-width="2" stroke-linecap="round"/>
            </svg>
          </div>
        </div>
      </div>
    </div>
  `};var t,d,c;s.parameters={...s.parameters,docs:{...(t=s.parameters)==null?void 0:t.docs,source:{originalSource:`{
  name: '📊 Gráfico de Barras',
  render: () => \`
    <div class="card" style="max-width: 600px;">
      <div class="card-header d-flex justify-content-between align-items-center">
        <h6 class="mb-0">Desempenho por Habilidade</h6>
        <select class="form-select form-select-sm" style="width: auto;">
          <option>Esta semana</option>
          <option>Este mês</option>
        </select>
      </div>
      <div class="card-body">
        <!-- Bar chart mockup -->
        <div class="d-flex flex-column gap-3">
          <!-- Adição -->
          <div>
            <div class="d-flex justify-content-between mb-1">
              <span class="small">Adição</span>
              <span class="small fw-medium">92%</span>
            </div>
            <div class="progress" style="height: 24px;">
              <div class="progress-bar bg-success" style="width: 92%"></div>
            </div>
          </div>
          
          <!-- Subtração -->
          <div>
            <div class="d-flex justify-content-between mb-1">
              <span class="small">Subtração</span>
              <span class="small fw-medium">85%</span>
            </div>
            <div class="progress" style="height: 24px;">
              <div class="progress-bar bg-success" style="width: 85%"></div>
            </div>
          </div>
          
          <!-- Multiplicação -->
          <div>
            <div class="d-flex justify-content-between mb-1">
              <span class="small">Multiplicação</span>
              <span class="small fw-medium">73%</span>
            </div>
            <div class="progress" style="height: 24px;">
              <div class="progress-bar bg-warning" style="width: 73%"></div>
            </div>
          </div>
          
          <!-- Divisão -->
          <div>
            <div class="d-flex justify-content-between mb-1">
              <span class="small">Divisão</span>
              <span class="small fw-medium">58%</span>
            </div>
            <div class="progress" style="height: 24px;">
              <div class="progress-bar bg-danger" style="width: 58%"></div>
            </div>
          </div>
          
          <!-- Frações -->
          <div>
            <div class="d-flex justify-content-between mb-1">
              <span class="small">Frações</span>
              <span class="small fw-medium">45%</span>
            </div>
            <div class="progress" style="height: 24px;">
              <div class="progress-bar bg-danger" style="width: 45%"></div>
            </div>
          </div>
        </div>
        
        <!-- Legend -->
        <div class="d-flex justify-content-center gap-4 mt-4 pt-3 border-top">
          <div class="d-flex align-items-center gap-2">
            <span class="badge bg-success">&nbsp;</span>
            <small class="text-muted">≥80%</small>
          </div>
          <div class="d-flex align-items-center gap-2">
            <span class="badge bg-warning">&nbsp;</span>
            <small class="text-muted">60-79%</small>
          </div>
          <div class="d-flex align-items-center gap-2">
            <span class="badge bg-danger">&nbsp;</span>
            <small class="text-muted">&lt;60%</small>
          </div>
        </div>
      </div>
    </div>
  \`
}`,...(c=(d=s.parameters)==null?void 0:d.docs)==null?void 0:c.source}}};var r,o,v;a.parameters={...a.parameters,docs:{...(r=a.parameters)==null?void 0:r.docs,source:{originalSource:`{
  name: '🍩 Gráfico Donut',
  render: () => \`
    <div class="card" style="max-width: 400px;">
      <div class="card-header">
        <h6 class="mb-0">Distribuição de Níveis</h6>
      </div>
      <div class="card-body text-center">
        <!-- Donut mockup using CSS -->
        <div class="position-relative d-inline-block mb-4">
          <svg viewBox="0 0 36 36" style="width: 180px; height: 180px; transform: rotate(-90deg);">
            <!-- Background circle -->
            <circle cx="18" cy="18" r="15.9" fill="none" stroke="#e9ecef" stroke-width="3"></circle>
            <!-- Avançado (35%) -->
            <circle cx="18" cy="18" r="15.9" fill="none" stroke="#28a745" stroke-width="3"
              stroke-dasharray="35 65" stroke-dashoffset="0"></circle>
            <!-- Proficiente (40%) -->
            <circle cx="18" cy="18" r="15.9" fill="none" stroke="#007bff" stroke-width="3"
              stroke-dasharray="40 60" stroke-dashoffset="-35"></circle>
            <!-- Básico (18%) -->
            <circle cx="18" cy="18" r="15.9" fill="none" stroke="#ffc107" stroke-width="3"
              stroke-dasharray="18 82" stroke-dashoffset="-75"></circle>
            <!-- Abaixo (7%) -->
            <circle cx="18" cy="18" r="15.9" fill="none" stroke="#dc3545" stroke-width="3"
              stroke-dasharray="7 93" stroke-dashoffset="-93"></circle>
          </svg>
          <!-- Center text -->
          <div class="position-absolute top-50 start-50 translate-middle text-center">
            <div class="fs-4 fw-bold">245</div>
            <small class="text-muted">alunos</small>
          </div>
        </div>
        
        <!-- Legend -->
        <div class="d-flex flex-wrap justify-content-center gap-3">
          <div class="d-flex align-items-center gap-2">
            <span class="rounded-circle bg-success" style="width: 12px; height: 12px;"></span>
            <small>Avançado (35%)</small>
          </div>
          <div class="d-flex align-items-center gap-2">
            <span class="rounded-circle bg-primary" style="width: 12px; height: 12px;"></span>
            <small>Proficiente (40%)</small>
          </div>
          <div class="d-flex align-items-center gap-2">
            <span class="rounded-circle bg-warning" style="width: 12px; height: 12px;"></span>
            <small>Básico (18%)</small>
          </div>
          <div class="d-flex align-items-center gap-2">
            <span class="rounded-circle bg-danger" style="width: 12px; height: 12px;"></span>
            <small>Abaixo (7%)</small>
          </div>
        </div>
      </div>
    </div>
  \`
}`,...(v=(o=a.parameters)==null?void 0:o.docs)==null?void 0:v.source}}};var m,p,x;e.parameters={...e.parameters,docs:{...(m=e.parameters)==null?void 0:m.docs,source:{originalSource:`{
  name: '📈 Gráfico de Linha',
  render: () => \`
    <div class="card" style="max-width: 600px;">
      <div class="card-header d-flex justify-content-between align-items-center">
        <h6 class="mb-0">Evolução do Desempenho</h6>
        <div class="d-flex gap-2">
          <span class="badge bg-light text-dark">Semana</span>
          <span class="badge bg-primary">Mês</span>
          <span class="badge bg-light text-dark">Ano</span>
        </div>
      </div>
      <div class="card-body">
        <!-- Line chart mockup -->
        <svg viewBox="0 0 400 150" style="width: 100%; height: 150px;">
          <!-- Grid lines -->
          <line x1="0" y1="0" x2="400" y2="0" stroke="#f0f0f0" stroke-width="1"/>
          <line x1="0" y1="37.5" x2="400" y2="37.5" stroke="#f0f0f0" stroke-width="1"/>
          <line x1="0" y1="75" x2="400" y2="75" stroke="#f0f0f0" stroke-width="1"/>
          <line x1="0" y1="112.5" x2="400" y2="112.5" stroke="#f0f0f0" stroke-width="1"/>
          <line x1="0" y1="150" x2="400" y2="150" stroke="#f0f0f0" stroke-width="1"/>
          
          <!-- Area fill -->
          <path d="M 0 120 L 50 100 L 100 90 L 150 95 L 200 70 L 250 60 L 300 45 L 350 40 L 400 30 L 400 150 L 0 150 Z" 
                fill="url(#gradient)" opacity="0.3"/>
          
          <!-- Line -->
          <polyline points="0,120 50,100 100,90 150,95 200,70 250,60 300,45 350,40 400,30" 
                    fill="none" stroke="#7367f0" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
          
          <!-- Points -->
          <circle cx="0" cy="120" r="4" fill="#7367f0"/>
          <circle cx="50" cy="100" r="4" fill="#7367f0"/>
          <circle cx="100" cy="90" r="4" fill="#7367f0"/>
          <circle cx="150" cy="95" r="4" fill="#7367f0"/>
          <circle cx="200" cy="70" r="4" fill="#7367f0"/>
          <circle cx="250" cy="60" r="4" fill="#7367f0"/>
          <circle cx="300" cy="45" r="4" fill="#7367f0"/>
          <circle cx="350" cy="40" r="4" fill="#7367f0"/>
          <circle cx="400" cy="30" r="6" fill="#7367f0" stroke="white" stroke-width="2"/>
          
          <!-- Gradient definition -->
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" style="stop-color:#7367f0;stop-opacity:0.5"/>
              <stop offset="100%" style="stop-color:#7367f0;stop-opacity:0"/>
            </linearGradient>
          </defs>
        </svg>
        
        <!-- X axis labels -->
        <div class="d-flex justify-content-between mt-2 text-muted small">
          <span>Semana 1</span>
          <span>Semana 2</span>
          <span>Semana 3</span>
          <span>Semana 4</span>
        </div>
        
        <!-- Stats -->
        <div class="row text-center mt-4 pt-3 border-top">
          <div class="col">
            <div class="text-muted small">Início</div>
            <div class="fw-bold">65%</div>
          </div>
          <div class="col">
            <div class="text-muted small">Atual</div>
            <div class="fw-bold text-primary">82%</div>
          </div>
          <div class="col">
            <div class="text-muted small">Evolução</div>
            <div class="fw-bold text-success">
              <i class="bi bi-arrow-up"></i> +17%
            </div>
          </div>
        </div>
      </div>
    </div>
  \`
}`,...(x=(p=e.parameters)==null?void 0:p.docs)==null?void 0:x.source}}};var b,g,f;i.parameters={...i.parameters,docs:{...(b=i.parameters)==null?void 0:b.docs,source:{originalSource:`{
  name: '🔢 Stat Cards',
  render: () => \`
    <div class="row g-4" style="max-width: 900px;">
      <!-- Card 1 -->
      <div class="col-sm-6 col-lg-3">
        <div class="card border-start border-primary border-4">
          <div class="card-body">
            <div class="d-flex justify-content-between align-items-center mb-2">
              <span class="text-muted small">Total de Alunos</span>
              <span class="avatar avatar-sm bg-primary bg-opacity-10 rounded">
                <i class="bi bi-people text-primary"></i>
              </span>
            </div>
            <h3 class="mb-0">245</h3>
            <small class="text-success">
              <i class="bi bi-arrow-up"></i> +12% este mês
            </small>
          </div>
        </div>
      </div>
      
      <!-- Card 2 -->
      <div class="col-sm-6 col-lg-3">
        <div class="card border-start border-success border-4">
          <div class="card-body">
            <div class="d-flex justify-content-between align-items-center mb-2">
              <span class="text-muted small">Jogos Completos</span>
              <span class="avatar avatar-sm bg-success bg-opacity-10 rounded">
                <i class="bi bi-controller text-success"></i>
              </span>
            </div>
            <h3 class="mb-0">1.892</h3>
            <small class="text-success">
              <i class="bi bi-arrow-up"></i> +8% esta semana
            </small>
          </div>
        </div>
      </div>
      
      <!-- Card 3 -->
      <div class="col-sm-6 col-lg-3">
        <div class="card border-start border-warning border-4">
          <div class="card-body">
            <div class="d-flex justify-content-between align-items-center mb-2">
              <span class="text-muted small">Taxa de Acerto</span>
              <span class="avatar avatar-sm bg-warning bg-opacity-10 rounded">
                <i class="bi bi-bullseye text-warning"></i>
              </span>
            </div>
            <h3 class="mb-0">78%</h3>
            <small class="text-muted">
              <i class="bi bi-dash"></i> Estável
            </small>
          </div>
        </div>
      </div>
      
      <!-- Card 4 -->
      <div class="col-sm-6 col-lg-3">
        <div class="card border-start border-info border-4">
          <div class="card-body">
            <div class="d-flex justify-content-between align-items-center mb-2">
              <span class="text-muted small">Tempo Médio</span>
              <span class="avatar avatar-sm bg-info bg-opacity-10 rounded">
                <i class="bi bi-clock text-info"></i>
              </span>
            </div>
            <h3 class="mb-0">42min</h3>
            <small class="text-danger">
              <i class="bi bi-arrow-down"></i> -5% vs meta
            </small>
          </div>
        </div>
      </div>
    </div>
  \`
}`,...(f=(g=i.parameters)==null?void 0:g.docs)==null?void 0:f.source}}};var u,y,h;l.parameters={...l.parameters,docs:{...(u=l.parameters)==null?void 0:u.docs,source:{originalSource:`{
  name: '⚖️ Comparativo',
  render: () => \`
    <div class="card" style="max-width: 500px;">
      <div class="card-header">
        <h6 class="mb-0">Comparativo: Turma vs Escola</h6>
      </div>
      <div class="card-body">
        <div class="d-flex flex-column gap-4">
          <!-- Métrica 1 -->
          <div>
            <div class="d-flex justify-content-between mb-2">
              <span class="small">Taxa de Acerto</span>
            </div>
            <div class="d-flex gap-2 align-items-center">
              <div class="flex-grow-1">
                <div class="d-flex justify-content-between mb-1">
                  <small class="text-primary">Turma 5º A</small>
                  <small class="fw-medium">85%</small>
                </div>
                <div class="progress" style="height: 8px;">
                  <div class="progress-bar bg-primary" style="width: 85%"></div>
                </div>
              </div>
            </div>
            <div class="d-flex gap-2 align-items-center mt-1">
              <div class="flex-grow-1">
                <div class="d-flex justify-content-between mb-1">
                  <small class="text-secondary">Média Escola</small>
                  <small class="fw-medium text-muted">72%</small>
                </div>
                <div class="progress" style="height: 8px;">
                  <div class="progress-bar bg-secondary" style="width: 72%"></div>
                </div>
              </div>
            </div>
            <div class="text-end mt-1">
              <span class="badge bg-success-subtle text-success">+13% acima</span>
            </div>
          </div>
          
          <hr class="my-0">
          
          <!-- Métrica 2 -->
          <div>
            <div class="d-flex justify-content-between mb-2">
              <span class="small">Engajamento</span>
            </div>
            <div class="d-flex gap-2 align-items-center">
              <div class="flex-grow-1">
                <div class="d-flex justify-content-between mb-1">
                  <small class="text-primary">Turma 5º A</small>
                  <small class="fw-medium">92%</small>
                </div>
                <div class="progress" style="height: 8px;">
                  <div class="progress-bar bg-primary" style="width: 92%"></div>
                </div>
              </div>
            </div>
            <div class="d-flex gap-2 align-items-center mt-1">
              <div class="flex-grow-1">
                <div class="d-flex justify-content-between mb-1">
                  <small class="text-secondary">Média Escola</small>
                  <small class="fw-medium text-muted">78%</small>
                </div>
                <div class="progress" style="height: 8px;">
                  <div class="progress-bar bg-secondary" style="width: 78%"></div>
                </div>
              </div>
            </div>
            <div class="text-end mt-1">
              <span class="badge bg-success-subtle text-success">+14% acima</span>
            </div>
          </div>
          
          <hr class="my-0">
          
          <!-- Métrica 3 -->
          <div>
            <div class="d-flex justify-content-between mb-2">
              <span class="small">Tempo de Uso</span>
            </div>
            <div class="d-flex gap-2 align-items-center">
              <div class="flex-grow-1">
                <div class="d-flex justify-content-between mb-1">
                  <small class="text-primary">Turma 5º A</small>
                  <small class="fw-medium">45min</small>
                </div>
                <div class="progress" style="height: 8px;">
                  <div class="progress-bar bg-primary" style="width: 60%"></div>
                </div>
              </div>
            </div>
            <div class="d-flex gap-2 align-items-center mt-1">
              <div class="flex-grow-1">
                <div class="d-flex justify-content-between mb-1">
                  <small class="text-secondary">Média Escola</small>
                  <small class="fw-medium text-muted">52min</small>
                </div>
                <div class="progress" style="height: 8px;">
                  <div class="progress-bar bg-secondary" style="width: 69%"></div>
                </div>
              </div>
            </div>
            <div class="text-end mt-1">
              <span class="badge bg-warning-subtle text-warning">-7min abaixo</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  \`
}`,...(h=(y=l.parameters)==null?void 0:y.docs)==null?void 0:h.source}}};var w,k,E;n.parameters={...n.parameters,docs:{...(w=n.parameters)==null?void 0:w.docs,source:{originalSource:`{
  name: '📉 Mini Charts',
  render: () => \`
    <div class="row g-4" style="max-width: 800px;">
      <!-- Mini chart 1 -->
      <div class="col-md-4">
        <div class="card">
          <div class="card-body">
            <div class="d-flex justify-content-between align-items-start mb-3">
              <div>
                <small class="text-muted">Acertos/dia</small>
                <h4 class="mb-0">156</h4>
              </div>
              <span class="badge bg-success-subtle text-success">+12%</span>
            </div>
            <svg viewBox="0 0 100 30" style="width: 100%; height: 30px;">
              <polyline points="0,25 15,20 30,22 45,15 60,18 75,10 90,12 100,5" 
                        fill="none" stroke="#28a745" stroke-width="2" stroke-linecap="round"/>
            </svg>
          </div>
        </div>
      </div>
      
      <!-- Mini chart 2 -->
      <div class="col-md-4">
        <div class="card">
          <div class="card-body">
            <div class="d-flex justify-content-between align-items-start mb-3">
              <div>
                <small class="text-muted">Tempo médio</small>
                <h4 class="mb-0">8min</h4>
              </div>
              <span class="badge bg-warning-subtle text-warning">-2%</span>
            </div>
            <svg viewBox="0 0 100 30" style="width: 100%; height: 30px;">
              <polyline points="0,10 15,15 30,12 45,18 60,16 75,20 90,18 100,22" 
                        fill="none" stroke="#ffc107" stroke-width="2" stroke-linecap="round"/>
            </svg>
          </div>
        </div>
      </div>
      
      <!-- Mini chart 3 -->
      <div class="col-md-4">
        <div class="card">
          <div class="card-body">
            <div class="d-flex justify-content-between align-items-start mb-3">
              <div>
                <small class="text-muted">Jogos/aluno</small>
                <h4 class="mb-0">3.2</h4>
              </div>
              <span class="badge bg-primary-subtle text-primary">Estável</span>
            </div>
            <svg viewBox="0 0 100 30" style="width: 100%; height: 30px;">
              <polyline points="0,15 15,14 30,16 45,15 60,14 75,15 90,14 100,15" 
                        fill="none" stroke="#7367f0" stroke-width="2" stroke-linecap="round"/>
            </svg>
          </div>
        </div>
      </div>
    </div>
  \`
}`,...(E=(k=n.parameters)==null?void 0:k.docs)==null?void 0:E.source}}};const C=["BarChartVisual","DonutChartVisual","LineChartVisual","StatCards","ComparisonChart","MiniCharts"];export{s as BarChartVisual,l as ComparisonChart,a as DonutChartVisual,e as LineChartVisual,n as MiniCharts,i as StatCards,C as __namedExportsOrder,j as default};
