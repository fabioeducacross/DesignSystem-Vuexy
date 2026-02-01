/**
 * Dividers - Divisores visuais
 * 
 * Componentes para separar conteúdo visualmente
 * Baseado em: EDivider.vue do frontoffice
 */

export default {
  title: 'Educacross/Components/Dividers',
  parameters: {
    layout: 'padded',
  },
};

/**
 * Horizontal - Divisor horizontal padrão
 */
export const Horizontal = {
  render: () => `
    <div class="d-flex flex-column gap-3" style="max-width: 600px;">
      <h5>Divisor Horizontal Básico</h5>
      
      <p class="text-muted">Conteúdo acima do divisor</p>
      <hr>
      <p class="text-muted">Conteúdo abaixo do divisor</p>
      
      <h6 class="mt-4">Variações de Cor</h6>
      
      <div class="mb-3">
        <small class="text-muted">Default (border-color)</small>
        <hr>
      </div>
      
      <div class="mb-3">
        <small class="text-muted">Primary</small>
        <hr style="border-color: var(--edu-primary, #0C5257); opacity: 1;">
      </div>
      
      <div class="mb-3">
        <small class="text-muted">Gold (Educacross)</small>
        <hr style="border-color: var(--edu-gold, #FAB84A); opacity: 1;">
      </div>
      
      <div class="mb-3">
        <small class="text-muted">Red (Educacross)</small>
        <hr style="border-color: var(--edu-red, #CF4343); opacity: 1;">
      </div>
      
      <div class="mb-3">
        <small class="text-muted">Success</small>
        <hr class="border-success" style="opacity: 1;">
      </div>
      
      <div class="mb-3">
        <small class="text-muted">Danger</small>
        <hr class="border-danger" style="opacity: 1;">
      </div>
    </div>
  `,
};

/**
 * WithText - Divisor com texto central
 */
export const WithText = {
  render: () => `
    <div class="d-flex flex-column gap-4" style="max-width: 600px;">
      <h5>Divisor com Texto</h5>
      
      <!-- Divisor com texto simples -->
      <div class="d-flex align-items-center gap-3">
        <hr class="flex-grow-1">
        <span class="text-muted text-nowrap">OU</span>
        <hr class="flex-grow-1">
      </div>
      
      <!-- Divisor com texto estilizado -->
      <div class="d-flex align-items-center gap-3">
        <hr class="flex-grow-1" style="border-color: var(--edu-primary, #0C5257); opacity: 0.5;">
        <span class="badge bg-primary px-3">Seção 1</span>
        <hr class="flex-grow-1" style="border-color: var(--edu-primary, #0C5257); opacity: 0.5;">
      </div>
      
      <!-- Divisor com ícone -->
      <div class="d-flex align-items-center gap-3">
        <hr class="flex-grow-1">
        <i class="bi bi-star-fill text-warning"></i>
        <hr class="flex-grow-1">
      </div>
      
      <!-- Divisor com data -->
      <div class="d-flex align-items-center gap-3">
        <hr class="flex-grow-1">
        <span class="text-muted small">Hoje, 31 de Janeiro</span>
        <hr class="flex-grow-1">
      </div>
      
      <!-- Divisor estilo timeline -->
      <div class="d-flex align-items-center gap-3">
        <hr class="flex-grow-1" style="border-style: dashed;">
        <span class="badge rounded-pill" style="background-color: var(--edu-gold, #FAB84A); color: #000;">2026</span>
        <hr class="flex-grow-1" style="border-style: dashed;">
      </div>
    </div>
  `,
};

/**
 * Vertical - Divisor vertical
 */
export const Vertical = {
  render: () => `
    <div style="max-width: 600px;">
      <h5 class="mb-4">Divisor Vertical</h5>
      
      <!-- Inline com vr -->
      <div class="d-flex align-items-center gap-3 mb-4 p-3 bg-light rounded">
        <span>Item 1</span>
        <div class="vr" style="height: 20px;"></div>
        <span>Item 2</span>
        <div class="vr" style="height: 20px;"></div>
        <span>Item 3</span>
      </div>
      
      <!-- Com cores -->
      <div class="d-flex align-items-center gap-3 mb-4 p-3 bg-light rounded">
        <span class="text-primary fw-semibold">Português</span>
        <div class="vr" style="height: 20px; border-left: 2px solid var(--edu-primary, #0C5257);"></div>
        <span class="text-primary fw-semibold">Matemática</span>
        <div class="vr" style="height: 20px; border-left: 2px solid var(--edu-gold, #FAB84A);"></div>
        <span class="text-primary fw-semibold">Liga</span>
      </div>
      
      <!-- Alto (em colunas) -->
      <h6 class="mt-4 mb-3">Divisor em Colunas</h6>
      <div class="row" style="min-height: 150px;">
        <div class="col d-flex align-items-center justify-content-center bg-light">
          <span>Coluna 1</span>
        </div>
        <div class="col-auto d-flex align-items-stretch py-3">
          <div class="vr"></div>
        </div>
        <div class="col d-flex align-items-center justify-content-center bg-light">
          <span>Coluna 2</span>
        </div>
        <div class="col-auto d-flex align-items-stretch py-3">
          <div class="vr"></div>
        </div>
        <div class="col d-flex align-items-center justify-content-center bg-light">
          <span>Coluna 3</span>
        </div>
      </div>
    </div>
  `,
};

/**
 * Styles - Estilos de linha
 */
export const Styles = {
  render: () => `
    <div class="d-flex flex-column gap-4" style="max-width: 600px;">
      <h5>Estilos de Linha</h5>
      
      <div>
        <small class="text-muted d-block mb-2">Solid (padrão)</small>
        <hr style="border-style: solid;">
      </div>
      
      <div>
        <small class="text-muted d-block mb-2">Dashed</small>
        <hr style="border-style: dashed;">
      </div>
      
      <div>
        <small class="text-muted d-block mb-2">Dotted</small>
        <hr style="border-style: dotted;">
      </div>
      
      <div>
        <small class="text-muted d-block mb-2">Double</small>
        <hr style="border-style: double; border-width: 3px;">
      </div>
      
      <div>
        <small class="text-muted d-block mb-2">Thick (2px)</small>
        <hr style="border-width: 2px; opacity: 1;">
      </div>
      
      <div>
        <small class="text-muted d-block mb-2">Extra Thick (4px)</small>
        <hr style="border-width: 4px; opacity: 1;">
      </div>
      
      <div>
        <small class="text-muted d-block mb-2">Gradient Effect</small>
        <div style="height: 2px; background: linear-gradient(90deg, transparent, var(--edu-primary, #0C5257), var(--edu-gold, #FAB84A), var(--edu-red, #CF4343), transparent);"></div>
      </div>
    </div>
  `,
};

/**
 * Spacing - Variações de espaçamento
 */
export const Spacing = {
  render: () => `
    <div style="max-width: 600px;">
      <h5 class="mb-4">Espaçamento</h5>
      
      <div class="bg-light p-3 rounded">
        <p class="mb-0">Conteúdo acima</p>
      </div>
      
      <hr class="my-1">
      <small class="text-muted">my-1 (0.25rem)</small>
      
      <div class="bg-light p-3 rounded mt-3">
        <p class="mb-0">Conteúdo</p>
      </div>
      
      <hr class="my-2">
      <small class="text-muted">my-2 (0.5rem)</small>
      
      <div class="bg-light p-3 rounded mt-3">
        <p class="mb-0">Conteúdo</p>
      </div>
      
      <hr class="my-3">
      <small class="text-muted">my-3 (1rem) - Padrão</small>
      
      <div class="bg-light p-3 rounded mt-3">
        <p class="mb-0">Conteúdo</p>
      </div>
      
      <hr class="my-4">
      <small class="text-muted">my-4 (1.5rem)</small>
      
      <div class="bg-light p-3 rounded mt-4">
        <p class="mb-0">Conteúdo</p>
      </div>
      
      <hr class="my-5">
      <small class="text-muted">my-5 (3rem)</small>
      
      <div class="bg-light p-3 rounded mt-5">
        <p class="mb-0">Conteúdo abaixo</p>
      </div>
    </div>
  `,
};

/**
 * UseCases - Casos de uso reais
 */
export const UseCases = {
  render: () => `
    <div style="max-width: 600px;">
      <h5 class="mb-4">Casos de Uso</h5>
      
      <!-- Card com seções divididas -->
      <div class="card mb-4">
        <div class="card-header">
          <h6 class="mb-0">Perfil do Aluno</h6>
        </div>
        <div class="card-body">
          <div class="d-flex align-items-center gap-3 mb-3">
            <div class="avatar rounded-circle bg-primary text-white d-flex align-items-center justify-content-center" style="width: 48px; height: 48px;">
              <i class="bi bi-person-fill"></i>
            </div>
            <div>
              <h6 class="mb-0">João Silva</h6>
              <small class="text-muted">5º Ano - Turma A</small>
            </div>
          </div>
          
          <hr>
          
          <div class="row text-center">
            <div class="col">
              <h4 class="mb-0" style="color: var(--edu-primary);">85%</h4>
              <small class="text-muted">Progresso</small>
            </div>
            <div class="col-auto d-flex align-items-stretch py-2">
              <div class="vr"></div>
            </div>
            <div class="col">
              <h4 class="mb-0" style="color: var(--edu-gold);">1.250</h4>
              <small class="text-muted">Pontos</small>
            </div>
            <div class="col-auto d-flex align-items-stretch py-2">
              <div class="vr"></div>
            </div>
            <div class="col">
              <h4 class="mb-0" style="color: var(--edu-red);">42</h4>
              <small class="text-muted">Jogos</small>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Lista com divisores -->
      <div class="card mb-4">
        <div class="card-header">
          <h6 class="mb-0">Atividades Recentes</h6>
        </div>
        <ul class="list-group list-group-flush">
          <li class="list-group-item d-flex align-items-center gap-3">
            <i class="bi bi-controller text-primary"></i>
            <div>
              <span>Completou o jogo "Tabuada Ninja"</span>
              <small class="text-muted d-block">Há 2 horas</small>
            </div>
          </li>
          <li class="list-group-item d-flex align-items-center gap-3">
            <i class="bi bi-trophy-fill text-warning"></i>
            <div>
              <span>Ganhou medalha de Bronze</span>
              <small class="text-muted d-block">Há 3 horas</small>
            </div>
          </li>
          <li class="list-group-item d-flex align-items-center gap-3">
            <i class="bi bi-star-fill text-success"></i>
            <div>
              <span>Subiu de nível: Básico → Proficiente</span>
              <small class="text-muted d-block">Ontem</small>
            </div>
          </li>
        </ul>
      </div>
      
      <!-- Login social -->
      <div class="card">
        <div class="card-body">
          <button class="btn btn-primary w-100 mb-3">
            <i class="bi bi-box-arrow-in-right me-2"></i>
            Entrar com E-mail
          </button>
          
          <div class="d-flex align-items-center gap-3 mb-3">
            <hr class="flex-grow-1">
            <span class="text-muted small text-uppercase">ou</span>
            <hr class="flex-grow-1">
          </div>
          
          <button class="btn btn-outline-secondary w-100">
            <i class="bi bi-google me-2"></i>
            Continuar com Google
          </button>
        </div>
      </div>
    </div>
  `,
};
