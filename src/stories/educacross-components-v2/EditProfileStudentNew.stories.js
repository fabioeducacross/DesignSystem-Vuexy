/**
 * EditProfileStudentNew - Modal de Edição de Perfil do Estudante
 * 
 * Versão simplificada (Fase 1 - Refatoração Emergencial)
 * - CSS inline removido → utiliza classes Vuexy nativas
 * - Multi-framework docs removido
 * - Estrutura modular com stories independentes
 */

export default {
  title: 'Educacross Components V2/Modals/EditProfileStudentNew',
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    showMascotSelector: {
      control: 'boolean',
      description: 'Exibe seletor de mascotes',
    },
    formLayout: {
      control: 'select',
      options: ['single', 'double'],
      description: 'Layout do formulário (coluna única ou dupla)',
    },
  },
};

/**
 * Modal de edição de perfil - Layout padrão
 */
export const Default = {
  args: {
    showMascotSelector: true,
    formLayout: 'double',
  },
  render: (args) => {
    return `
      <div class="modal-dialog modal-lg modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">
              <i class="bi bi-person-circle me-2"></i>
              Editar Perfil do Estudante
            </h5>
            <button type="button" class="btn-close"></button>
          </div>
          <div class="modal-body p-4">
            <form>
              ${args.formLayout === 'double' ? `
                <div class="row g-3">
                  <div class="col-md-6">
                    <label for="firstName" class="form-label">Nome</label>
                    <input type="text" class="form-control" id="firstName" value="João" required>
                  </div>
                  <div class="col-md-6">
                    <label for="lastName" class="form-label">Sobrenome</label>
                    <input type="text" class="form-control" id="lastName" value="Silva" required>
                  </div>
                </div>
              ` : `
                <div class="mb-3">
                  <label for="fullName" class="form-label">Nome Completo</label>
                  <input type="text" class="form-control" id="fullName" value="João Silva" required>
                </div>
              `}
              
              <div class="mb-3">
                <label for="email" class="form-label">E-mail</label>
                <input type="email" class="form-control" id="email" value="joao.silva@exemplo.com" disabled>
                <small class="text-muted">O e-mail não pode ser alterado</small>
              </div>
              
              <div class="mb-3">
                <label for="birthDate" class="form-label">Data de Nascimento</label>
                <input type="date" class="form-control" id="birthDate" value="2010-05-15">
              </div>
              
              ${args.showMascotSelector ? `
                <div class="mb-3">
                  <label class="form-label">Escolha seu Mascote</label>
                  <div class="d-flex gap-3 flex-wrap">
                    <div class="mascot-option">
                      <input type="radio" class="btn-check" name="mascot" id="mascot1" checked>
                      <label class="btn btn-outline-primary" for="mascot1">
                        <i class="bi bi-emoji-smile" style="font-size: 2rem;"></i>
                        <div class="small mt-1">Feliz</div>
                      </label>
                    </div>
                    <div class="mascot-option">
                      <input type="radio" class="btn-check" name="mascot" id="mascot2">
                      <label class="btn btn-outline-primary" for="mascot2">
                        <i class="bi bi-emoji-laughing" style="font-size: 2rem;"></i>
                        <div class="small mt-1">Rindo</div>
                      </label>
                    </div>
                    <div class="mascot-option">
                      <input type="radio" class="btn-check" name="mascot" id="mascot3">
                      <label class="btn btn-outline-primary" for="mascot3">
                        <i class="bi bi-emoji-sunglasses" style="font-size: 2rem;"></i>
                        <div class="small mt-1">Legal</div>
                      </label>
                    </div>
                    <div class="mascot-option">
                      <input type="radio" class="btn-check" name="mascot" id="mascot4">
                      <label class="btn btn-outline-primary" for="mascot4">
                        <i class="bi bi-emoji-heart-eyes" style="font-size: 2rem;"></i>
                        <div class="small mt-1">Apaixonado</div>
                      </label>
                    </div>
                  </div>
                </div>
              ` : ''}
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary">Cancelar</button>
            <button type="button" class="btn btn-primary">Salvar Alterações</button>
          </div>
        </div>
      </div>
    `;
  },
};

/**
 * Formulário em coluna única (mobile-first)
 */
export const SingleColumn = {
  args: {
    showMascotSelector: true,
    formLayout: 'single',
  },
  render: Default.render,
};

/**
 * Sem seletor de mascotes
 */
export const WithoutMascot = {
  args: {
    showMascotSelector: false,
    formLayout: 'double',
  },
  render: Default.render,
};

/**
 * Modal compacto com campos essenciais
 */
export const Compact = {
  args: {
    showMascotSelector: false,
    formLayout: 'single',
  },
  render: (args) => {
    return `
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Editar Perfil</h5>
            <button type="button" class="btn-close"></button>
          </div>
          <div class="modal-body p-3">
            <form>
              <div class="mb-3">
                <label for="name" class="form-label">Nome</label>
                <input type="text" class="form-control form-control-sm" id="name" value="João Silva">
              </div>
              <div class="mb-3">
                <label for="birthdate" class="form-label">Data de Nascimento</label>
                <input type="date" class="form-control form-control-sm" id="birthdate" value="2010-05-15">
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-sm btn-secondary">Cancelar</button>
            <button type="button" class="btn btn-sm btn-primary">Salvar</button>
          </div>
        </div>
      </div>
    `;
  },
};

/**
 * Formulário completo com todos os campos
 */
export const Complete = {
  args: {
    showMascotSelector: true,
    formLayout: 'double',
  },
  render: (args) => {
    return `
      <div class="modal-dialog modal-xl modal-dialog-centered modal-dialog-scrollable">
        <div class="modal-content">
          <div class="modal-header bg-primary bg-opacity-10">
            <h5 class="modal-title text-primary">
              <i class="bi bi-person-circle me-2"></i>
              Editar Perfil Completo
            </h5>
            <button type="button" class="btn-close"></button>
          </div>
          <div class="modal-body p-4">
            <form>
              <div class="row g-3 mb-4">
                <div class="col-md-6">
                  <label for="firstName" class="form-label">Nome</label>
                  <input type="text" class="form-control" id="firstName" value="João" required>
                </div>
                <div class="col-md-6">
                  <label for="lastName" class="form-label">Sobrenome</label>
                  <input type="text" class="form-control" id="lastName" value="Silva" required>
                </div>
              </div>
              
              <div class="row g-3 mb-4">
                <div class="col-md-6">
                  <label for="email" class="form-label">E-mail</label>
                  <input type="email" class="form-control" id="email" value="joao.silva@exemplo.com" disabled>
                </div>
                <div class="col-md-6">
                  <label for="phone" class="form-label">Telefone</label>
                  <input type="tel" class="form-control" id="phone" value="(11) 98765-4321">
                </div>
              </div>
              
              <div class="row g-3 mb-4">
                <div class="col-md-6">
                  <label for="birthDate" class="form-label">Data de Nascimento</label>
                  <input type="date" class="form-control" id="birthDate" value="2010-05-15">
                </div>
                <div class="col-md-6">
                  <label for="school" class="form-label">Escola</label>
                  <input type="text" class="form-control" id="school" value="Escola Exemplo" disabled>
                </div>
              </div>
              
              <hr class="my-4">
              
              <h6 class="mb-3">Escolha seu Mascote Favorito</h6>
              <div class="d-flex gap-3 flex-wrap mb-3">
                <div class="mascot-option">
                  <input type="radio" class="btn-check" name="mascot" id="m1" checked>
                  <label class="btn btn-outline-primary p-3" for="m1">
                    <i class="bi bi-emoji-smile d-block" style="font-size: 2.5rem;"></i>
                    <div class="small mt-2">Feliz</div>
                  </label>
                </div>
                <div class="mascot-option">
                  <input type="radio" class="btn-check" name="mascot" id="m2">
                  <label class="btn btn-outline-primary p-3" for="m2">
                    <i class="bi bi-emoji-laughing d-block" style="font-size: 2.5rem;"></i>
                    <div class="small mt-2">Rindo</div>
                  </label>
                </div>
                <div class="mascot-option">
                  <input type="radio" class="btn-check" name="mascot" id="m3">
                  <label class="btn btn-outline-primary p-3" for="m3">
                    <i class="bi bi-emoji-sunglasses d-block" style="font-size: 2.5rem;"></i>
                    <div class="small mt-2">Legal</div>
                  </label>
                </div>
                <div class="mascot-option">
                  <input type="radio" class="btn-check" name="mascot" id="m4">
                  <label class="btn btn-outline-primary p-3" for="m4">
                    <i class="bi bi-emoji-heart-eyes d-block" style="font-size: 2.5rem;"></i>
                    <div class="small mt-2">Apaixonado</div>
                  </label>
                </div>
                <div class="mascot-option">
                  <input type="radio" class="btn-check" name="mascot" id="m5">
                  <label class="btn btn-outline-primary p-3" for="m5">
                    <i class="bi bi-emoji-wink d-block" style="font-size: 2.5rem;"></i>
                    <div class="small mt-2">Piscando</div>
                  </label>
                </div>
                <div class="mascot-option">
                  <input type="radio" class="btn-check" name="mascot" id="m6">
                  <label class="btn btn-outline-primary p-3" for="m6">
                    <i class="bi bi-emoji-laughing-fill d-block" style="font-size: 2.5rem;"></i>
                    <div class="small mt-2">Muito Feliz</div>
                  </label>
                </div>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary">Cancelar</button>
            <button type="button" class="btn btn-primary">
              <i class="bi bi-check-circle me-1"></i>
              Salvar Alterações
            </button>
          </div>
        </div>
      </div>
    `;
  },
};

/**
 * Overview de todas as variantes
 */
export const Overview = {
  render: () => {
    return `
      <div class="container py-4">
        <h3 class="mb-4">EditProfileStudentNew - Variantes</h3>
        
        <div class="row g-4">
          <div class="col-12">
            <h6 class="text-muted mb-3">Layout Dupla Coluna (Padrão)</h6>
            ${Default.render({ showMascotSelector: true, formLayout: 'double' })}
          </div>
          
          <div class="col-12">
            <h6 class="text-muted mb-3">Layout Coluna Única</h6>
            ${SingleColumn.render({ showMascotSelector: false, formLayout: 'single' })}
          </div>
          
          <div class="col-md-6">
            <h6 class="text-muted mb-3">Modal Compacto</h6>
            ${Compact.render({ showMascotSelector: false, formLayout: 'single' })}
          </div>
        </div>
      </div>
    `;
  },
};
