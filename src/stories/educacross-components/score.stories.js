/**
 * Score / Rating - Componentes de pontuação e avaliação
 * 
 * Para exibir pontuações, estrelas, métricas
 * Inspirado no sistema de gamificação Educacross
 */

export default {
  title: 'Educacross/Components/Score',
  parameters: {
    layout: 'padded',
  },
};

/**
 * Stars - Avaliação por estrelas
 */
export const Stars = {
  render: () => `
    <div>
      <h5 class="mb-4">Avaliação por Estrelas</h5>
      
      <div class="d-flex flex-column gap-4">
        <!-- 5 estrelas cheias -->
        <div>
          <small class="text-muted d-block mb-2">5/5 Estrelas</small>
          <div class="d-flex gap-1">
            <i class="bi bi-star-fill text-warning fs-4"></i>
            <i class="bi bi-star-fill text-warning fs-4"></i>
            <i class="bi bi-star-fill text-warning fs-4"></i>
            <i class="bi bi-star-fill text-warning fs-4"></i>
            <i class="bi bi-star-fill text-warning fs-4"></i>
          </div>
        </div>
        
        <!-- 4 estrelas -->
        <div>
          <small class="text-muted d-block mb-2">4/5 Estrelas</small>
          <div class="d-flex gap-1">
            <i class="bi bi-star-fill text-warning fs-4"></i>
            <i class="bi bi-star-fill text-warning fs-4"></i>
            <i class="bi bi-star-fill text-warning fs-4"></i>
            <i class="bi bi-star-fill text-warning fs-4"></i>
            <i class="bi bi-star text-warning fs-4"></i>
          </div>
        </div>
        
        <!-- 3.5 estrelas -->
        <div>
          <small class="text-muted d-block mb-2">3.5/5 Estrelas</small>
          <div class="d-flex gap-1">
            <i class="bi bi-star-fill text-warning fs-4"></i>
            <i class="bi bi-star-fill text-warning fs-4"></i>
            <i class="bi bi-star-fill text-warning fs-4"></i>
            <i class="bi bi-star-half text-warning fs-4"></i>
            <i class="bi bi-star text-warning fs-4"></i>
          </div>
        </div>
        
        <!-- 2 estrelas -->
        <div>
          <small class="text-muted d-block mb-2">2/5 Estrelas</small>
          <div class="d-flex gap-1">
            <i class="bi bi-star-fill text-warning fs-4"></i>
            <i class="bi bi-star-fill text-warning fs-4"></i>
            <i class="bi bi-star text-warning fs-4"></i>
            <i class="bi bi-star text-warning fs-4"></i>
            <i class="bi bi-star text-warning fs-4"></i>
          </div>
        </div>
        
        <!-- Tamanhos -->
        <div class="mt-3">
          <small class="text-muted d-block mb-2">Tamanhos Diferentes</small>
          <div class="d-flex align-items-center gap-4">
            <div class="d-flex gap-1">
              <i class="bi bi-star-fill text-warning" style="font-size: 12px;"></i>
              <i class="bi bi-star-fill text-warning" style="font-size: 12px;"></i>
              <i class="bi bi-star-fill text-warning" style="font-size: 12px;"></i>
              <span class="small text-muted ms-1">Small</span>
            </div>
            <div class="d-flex gap-1">
              <i class="bi bi-star-fill text-warning fs-5"></i>
              <i class="bi bi-star-fill text-warning fs-5"></i>
              <i class="bi bi-star-fill text-warning fs-5"></i>
              <span class="text-muted ms-1">Medium</span>
            </div>
            <div class="d-flex gap-1">
              <i class="bi bi-star-fill text-warning fs-3"></i>
              <i class="bi bi-star-fill text-warning fs-3"></i>
              <i class="bi bi-star-fill text-warning fs-3"></i>
              <span class="text-muted ms-1">Large</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
};

/**
 * Points - Pontuação numérica
 */
export const Points = {
  render: () => `
    <div>
      <h5 class="mb-4">Pontuação Numérica</h5>
      
      <div class="row g-3">
        <!-- Pontos simples -->
        <div class="col-md-4">
          <div class="card text-center">
            <div class="card-body">
              <img src="/vuexy/img/educacross/gamification/Pontos-XP.svg" alt="XP" style="width: 48px; height: 48px;" class="mb-2">
              <h2 class="mb-0" style="color: var(--edu-primary, #0C5257);">2.450</h2>
              <small class="text-muted">Pontos XP</small>
            </div>
          </div>
        </div>
        
        <!-- Moedas -->
        <div class="col-md-4">
          <div class="card text-center">
            <div class="card-body">
              <img src="/vuexy/img/educacross/gamification/Moedas.svg" alt="Moedas" style="width: 48px; height: 48px;" class="mb-2">
              <h2 class="mb-0" style="color: var(--edu-gold, #FAB84A);">850</h2>
              <small class="text-muted">Moedas</small>
            </div>
          </div>
        </div>
        
        <!-- Estrelas -->
        <div class="col-md-4">
          <div class="card text-center">
            <div class="card-body">
              <img src="/vuexy/img/educacross/gamification/Estrelas.svg" alt="Estrelas" style="width: 48px; height: 48px;" class="mb-2">
              <h2 class="mb-0" style="color: var(--edu-red, #CF4343);">127</h2>
              <small class="text-muted">Estrelas</small>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Inline badges -->
      <h6 class="mt-4 mb-3">Pontuação Inline</h6>
      <div class="d-flex flex-wrap gap-3">
        <span class="badge d-flex align-items-center gap-2 px-3 py-2" style="background-color: #E7F8F8;">
          <img src="/vuexy/img/educacross/gamification/Pontos-XP.svg" alt="XP" style="width: 20px;">
          <span style="color: var(--edu-primary, #0C5257); font-weight: 600;">2.450 XP</span>
        </span>
        
        <span class="badge d-flex align-items-center gap-2 px-3 py-2" style="background-color: #FFF8E7;">
          <img src="/vuexy/img/educacross/gamification/Moedas.svg" alt="Moedas" style="width: 20px;">
          <span style="color: #B8860B; font-weight: 600;">850</span>
        </span>
        
        <span class="badge d-flex align-items-center gap-2 px-3 py-2" style="background-color: #FFE7E7;">
          <img src="/vuexy/img/educacross/gamification/Estrelas.svg" alt="Estrelas" style="width: 20px;">
          <span style="color: var(--edu-red, #CF4343); font-weight: 600;">127</span>
        </span>
      </div>
    </div>
  `,
};

/**
 * Percentage - Porcentagem/Acertos
 */
export const Percentage = {
  render: () => `
    <div>
      <h5 class="mb-4">Porcentagem de Acertos</h5>
      
      <div class="row g-3">
        <!-- Excelente -->
        <div class="col-md-3">
          <div class="card border-success">
            <div class="card-body text-center">
              <div class="mb-2">
                <span class="display-5 fw-bold text-success">95%</span>
              </div>
              <div class="progress" style="height: 8px;">
                <div class="progress-bar bg-success" style="width: 95%;"></div>
              </div>
              <small class="text-muted mt-2 d-block">Excelente</small>
            </div>
          </div>
        </div>
        
        <!-- Bom -->
        <div class="col-md-3">
          <div class="card border-info">
            <div class="card-body text-center">
              <div class="mb-2">
                <span class="display-5 fw-bold text-info">78%</span>
              </div>
              <div class="progress" style="height: 8px;">
                <div class="progress-bar bg-info" style="width: 78%;"></div>
              </div>
              <small class="text-muted mt-2 d-block">Bom</small>
            </div>
          </div>
        </div>
        
        <!-- Regular -->
        <div class="col-md-3">
          <div class="card border-warning">
            <div class="card-body text-center">
              <div class="mb-2">
                <span class="display-5 fw-bold text-warning">55%</span>
              </div>
              <div class="progress" style="height: 8px;">
                <div class="progress-bar bg-warning" style="width: 55%;"></div>
              </div>
              <small class="text-muted mt-2 d-block">Regular</small>
            </div>
          </div>
        </div>
        
        <!-- Precisa Melhorar -->
        <div class="col-md-3">
          <div class="card border-danger">
            <div class="card-body text-center">
              <div class="mb-2">
                <span class="display-5 fw-bold text-danger">32%</span>
              </div>
              <div class="progress" style="height: 8px;">
                <div class="progress-bar bg-danger" style="width: 32%;"></div>
              </div>
              <small class="text-muted mt-2 d-block">Precisa Melhorar</small>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Circular -->
      <h6 class="mt-4 mb-3">Estilo Circular</h6>
      <div class="d-flex gap-4 flex-wrap">
        <div class="text-center">
          <div class="position-relative d-inline-flex">
            <svg width="80" height="80" viewBox="0 0 80 80">
              <circle cx="40" cy="40" r="35" fill="none" stroke="#e9ecef" stroke-width="6"/>
              <circle cx="40" cy="40" r="35" fill="none" stroke="#28C76F" stroke-width="6" 
                stroke-dasharray="220" stroke-dashoffset="11" transform="rotate(-90 40 40)"
                stroke-linecap="round"/>
            </svg>
            <span class="position-absolute top-50 start-50 translate-middle fw-bold text-success">95%</span>
          </div>
          <small class="text-muted d-block mt-1">Matemática</small>
        </div>
        
        <div class="text-center">
          <div class="position-relative d-inline-flex">
            <svg width="80" height="80" viewBox="0 0 80 80">
              <circle cx="40" cy="40" r="35" fill="none" stroke="#e9ecef" stroke-width="6"/>
              <circle cx="40" cy="40" r="35" fill="none" stroke="#00CFE8" stroke-width="6" 
                stroke-dasharray="220" stroke-dashoffset="48" transform="rotate(-90 40 40)"
                stroke-linecap="round"/>
            </svg>
            <span class="position-absolute top-50 start-50 translate-middle fw-bold text-info">78%</span>
          </div>
          <small class="text-muted d-block mt-1">Português</small>
        </div>
        
        <div class="text-center">
          <div class="position-relative d-inline-flex">
            <svg width="80" height="80" viewBox="0 0 80 80">
              <circle cx="40" cy="40" r="35" fill="none" stroke="#e9ecef" stroke-width="6"/>
              <circle cx="40" cy="40" r="35" fill="none" stroke="#FF9F43" stroke-width="6" 
                stroke-dasharray="220" stroke-dashoffset="99" transform="rotate(-90 40 40)"
                stroke-linecap="round"/>
            </svg>
            <span class="position-absolute top-50 start-50 translate-middle fw-bold text-warning">55%</span>
          </div>
          <small class="text-muted d-block mt-1">Liga</small>
        </div>
      </div>
    </div>
  `,
};

/**
 * Proficiency - Níveis de proficiência
 */
export const Proficiency = {
  render: () => `
    <div>
      <h5 class="mb-4">Níveis de Proficiência</h5>
      
      <div class="row g-3">
        <div class="col-6 col-md">
          <div class="card h-100 text-center" style="border-color: #28C76F;">
            <div class="card-body">
              <img src="/vuexy/img/educacross/proficiency/avançado.svg" alt="Avançado" style="width: 60px; height: 60px;" class="mb-2">
              <h6 class="mb-1" style="color: #28C76F;">Avançado</h6>
              <small class="text-muted">90% - 100%</small>
            </div>
          </div>
        </div>
        
        <div class="col-6 col-md">
          <div class="card h-100 text-center" style="border-color: #00CFE8;">
            <div class="card-body">
              <img src="/vuexy/img/educacross/proficiency/proficiente.svg" alt="Proficiente" style="width: 60px; height: 60px;" class="mb-2">
              <h6 class="mb-1" style="color: #00CFE8;">Proficiente</h6>
              <small class="text-muted">70% - 89%</small>
            </div>
          </div>
        </div>
        
        <div class="col-6 col-md">
          <div class="card h-100 text-center" style="border-color: #FF9F43;">
            <div class="card-body">
              <img src="/vuexy/img/educacross/proficiency/básico.svg" alt="Básico" style="width: 60px; height: 60px;" class="mb-2">
              <h6 class="mb-1" style="color: #FF9F43;">Básico</h6>
              <small class="text-muted">50% - 69%</small>
            </div>
          </div>
        </div>
        
        <div class="col-6 col-md">
          <div class="card h-100 text-center" style="border-color: #EA5455;">
            <div class="card-body">
              <img src="/vuexy/img/educacross/proficiency/abaixo do básico.svg" alt="Abaixo do Básico" style="width: 60px; height: 60px;" class="mb-2">
              <h6 class="mb-1" style="color: #EA5455;">Abaixo do Básico</h6>
              <small class="text-muted">0% - 49%</small>
            </div>
          </div>
        </div>
        
        <div class="col-6 col-md">
          <div class="card h-100 text-center" style="border-color: #6c757d;">
            <div class="card-body">
              <img src="/vuexy/img/educacross/proficiency/não fizeram.svg" alt="Não Fizeram" style="width: 60px; height: 60px;" class="mb-2">
              <h6 class="mb-1 text-muted">Não Fizeram</h6>
              <small class="text-muted">Sem dados</small>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Badge inline -->
      <h6 class="mt-4 mb-3">Badges de Proficiência</h6>
      <div class="d-flex flex-wrap gap-2">
        <span class="badge d-flex align-items-center gap-1" style="background-color: rgba(40, 199, 111, 0.15); color: #28C76F;">
          <i class="bi bi-check-circle-fill"></i> Avançado
        </span>
        <span class="badge d-flex align-items-center gap-1" style="background-color: rgba(0, 207, 232, 0.15); color: #00CFE8;">
          <i class="bi bi-check-circle"></i> Proficiente
        </span>
        <span class="badge d-flex align-items-center gap-1" style="background-color: rgba(255, 159, 67, 0.15); color: #FF9F43;">
          <i class="bi bi-dash-circle"></i> Básico
        </span>
        <span class="badge d-flex align-items-center gap-1" style="background-color: rgba(234, 84, 85, 0.15); color: #EA5455;">
          <i class="bi bi-x-circle"></i> Abaixo
        </span>
      </div>
    </div>
  `,
};

/**
 * Trophies - Troféus e conquistas
 */
export const Trophies = {
  render: () => `
    <div>
      <h5 class="mb-4">Troféus e Conquistas</h5>
      
      <div class="row g-3 mb-4">
        <div class="col-4 col-md-2">
          <div class="text-center">
            <img src="/vuexy/img/educacross/gamification/Troféu-Ouro.svg" alt="Ouro" style="width: 64px; height: 64px;">
            <small class="d-block mt-2 fw-semibold" style="color: #FFD700;">Ouro</small>
            <small class="text-muted">1º Lugar</small>
          </div>
        </div>
        <div class="col-4 col-md-2">
          <div class="text-center">
            <img src="/vuexy/img/educacross/gamification/Trofeu-Prata.svg" alt="Prata" style="width: 64px; height: 64px;">
            <small class="d-block mt-2 fw-semibold" style="color: #C0C0C0;">Prata</small>
            <small class="text-muted">2º Lugar</small>
          </div>
        </div>
        <div class="col-4 col-md-2">
          <div class="text-center">
            <img src="/vuexy/img/educacross/gamification/Trofeu-bronze.svg" alt="Bronze" style="width: 64px; height: 64px;">
            <small class="d-block mt-2 fw-semibold" style="color: #CD7F32;">Bronze</small>
            <small class="text-muted">3º Lugar</small>
          </div>
        </div>
      </div>
      
      <h6 class="mb-3">Insígnias</h6>
      <div class="row g-3">
        <div class="col-4 col-md-2">
          <div class="text-center">
            <img src="/vuexy/img/educacross/gamification/Insignia-Ouro.svg" alt="Insígnia Ouro" style="width: 56px; height: 56px;">
            <small class="d-block mt-2">Ouro</small>
          </div>
        </div>
        <div class="col-4 col-md-2">
          <div class="text-center">
            <img src="/vuexy/img/educacross/gamification/Insignia-Prata.svg" alt="Insígnia Prata" style="width: 56px; height: 56px;">
            <small class="d-block mt-2">Prata</small>
          </div>
        </div>
        <div class="col-4 col-md-2">
          <div class="text-center">
            <img src="/vuexy/img/educacross/gamification/Insignia-Bronze.svg" alt="Insígnia Bronze" style="width: 56px; height: 56px;">
            <small class="d-block mt-2">Bronze</small>
          </div>
        </div>
      </div>
      
      <!-- Card de conquista -->
      <h6 class="mt-4 mb-3">Card de Conquista</h6>
      <div class="card" style="max-width: 350px;">
        <div class="card-body d-flex align-items-center gap-3">
          <img src="/vuexy/img/educacross/gamification/Troféu-Ouro.svg" alt="Troféu" style="width: 56px;">
          <div>
            <h6 class="mb-1">Campeão de Matemática!</h6>
            <p class="text-muted mb-0 small">Você ficou em 1º lugar na Olimpíada</p>
            <small class="text-success"><i class="bi bi-clock me-1"></i>Conquistado hoje</small>
          </div>
        </div>
      </div>
    </div>
  `,
};

/**
 * UseCases - Casos de uso no sistema
 */
export const UseCases = {
  render: () => `
    <div style="max-width: 500px;">
      <h5 class="mb-4">Casos de Uso</h5>
      
      <!-- Card de Aluno com Score -->
      <div class="card mb-3">
        <div class="card-body">
          <div class="d-flex align-items-center gap-3 mb-3">
            <div class="rounded-circle d-flex align-items-center justify-content-center" style="width: 56px; height: 56px; background: linear-gradient(135deg, #0C5257, #1a7a82);">
              <span class="text-white fw-bold fs-5">JS</span>
            </div>
            <div class="flex-grow-1">
              <h6 class="mb-0">João Silva</h6>
              <small class="text-muted">5º Ano - Turma A</small>
            </div>
            <div class="text-end">
              <div class="d-flex gap-1 justify-content-end mb-1">
                <i class="bi bi-star-fill text-warning"></i>
                <i class="bi bi-star-fill text-warning"></i>
                <i class="bi bi-star-fill text-warning"></i>
                <i class="bi bi-star-fill text-warning"></i>
                <i class="bi bi-star-half text-warning"></i>
              </div>
              <small class="text-muted">4.5/5</small>
            </div>
          </div>
          
          <hr>
          
          <div class="row text-center g-2">
            <div class="col">
              <div class="d-flex align-items-center justify-content-center gap-1">
                <img src="/vuexy/img/educacross/gamification/Pontos-XP.svg" alt="XP" style="width: 20px;">
                <strong style="color: var(--edu-primary);">2.450</strong>
              </div>
              <small class="text-muted d-block">Pontos</small>
            </div>
            <div class="col">
              <div class="d-flex align-items-center justify-content-center gap-1">
                <img src="/vuexy/img/educacross/metrics/Progresso.svg" alt="Progresso" style="width: 20px;">
                <strong class="text-success">85%</strong>
              </div>
              <small class="text-muted d-block">Progresso</small>
            </div>
            <div class="col">
              <div class="d-flex align-items-center justify-content-center gap-1">
                <img src="/vuexy/img/educacross/metrics/Jogos.svg" alt="Jogos" style="width: 20px;">
                <strong class="text-info">42</strong>
              </div>
              <small class="text-muted d-block">Jogos</small>
            </div>
            <div class="col">
              <div class="d-flex align-items-center justify-content-center gap-1">
                <img src="/vuexy/img/educacross/gamification/Troféu-Ouro.svg" alt="Troféus" style="width: 20px;">
                <strong class="text-warning">3</strong>
              </div>
              <small class="text-muted d-block">Troféus</small>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Resultado de jogo -->
      <div class="card mb-3">
        <div class="card-header d-flex justify-content-between align-items-center" style="background: linear-gradient(135deg, #28C76F, #40D68F);">
          <span class="text-white fw-semibold">
            <i class="bi bi-controller me-2"></i>Jogo Completado!
          </span>
          <i class="bi bi-check-circle-fill text-white fs-4"></i>
        </div>
        <div class="card-body text-center">
          <div class="d-flex justify-content-center gap-2 mb-3">
            <i class="bi bi-star-fill text-warning fs-1"></i>
            <i class="bi bi-star-fill text-warning fs-1"></i>
            <i class="bi bi-star-fill text-warning fs-1"></i>
          </div>
          <h4 class="mb-2">Excelente!</h4>
          <p class="text-muted mb-3">Você acertou 9 de 10 questões</p>
          
          <div class="d-flex justify-content-center gap-3">
            <div class="badge d-flex align-items-center gap-1 px-3 py-2" style="background-color: #E7F8F8;">
              <img src="/vuexy/img/educacross/gamification/Pontos-XP.svg" alt="XP" style="width: 16px;">
              <span style="color: var(--edu-primary);">+150 XP</span>
            </div>
            <div class="badge d-flex align-items-center gap-1 px-3 py-2" style="background-color: #FFF8E7;">
              <img src="/vuexy/img/educacross/gamification/Moedas.svg" alt="Moedas" style="width: 16px;">
              <span style="color: #B8860B;">+30</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
};
