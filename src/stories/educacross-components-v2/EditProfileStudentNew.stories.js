/**
 * EditProfileStudentNew - Modal de Edição de Perfil de Aluno
 * =============================================================
 * Modal para editar informações do aluno (senha e avatar/mascote) usado pelo responsável
 * na tela de gerenciamento de contas (ManageAccount).
 * 
 * @component EditProfileStudentNew
 * @category Educacross Components V2 / Modals
 * @source educacross-frontoffice/src/views/pages/auth-context/manage-account/EditProfileStudentsNew.vue
 * @priority P1 - Core UI
 * @status COMPLETE
 * @since 2.0.0
 */

export default {
  title: 'Front-office/Modals/EditProfileStudentNew',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
## EditProfileStudentNew - Edição de Perfil de Aluno

Modal para responsável editar dados do filho/aluno (senha e seleção de mascote).

### Estrutura

#### Lado Esquerdo (Avatar)
- **Avatar grande**: 190x190px com background colorido (#5AC4FF padrão)
- **Grid de mascotes**: 3x3 com 9 corujas (44x44px cada)
- **Seleção visual**: Border azul no mascote selecionado

#### Lado Direito (Formulário)
- **Nome completo**: Campo disabled (apenas visualização)
- **Usuário**: Campo disabled (não editável)
- **Senha**: Campo editável com toggle de visibilidade (olho)
- **Validação**: Required na senha
- **Ações**: Cancelar (outline-danger) + Salvar (primary)

### Comportamento

- Loading overlay durante busca inicial dos dados
- Spinner no botão Salvar durante processamento
- Seleção de mascote: Clique atualiza preview instantaneamente
- Validação: Botão Salvar só ativa se senha válida
- Toast de sucesso após salvar
- Emit 'save' e 'cancel' para controle do modal pai
        `
      }
    }
  }
};

const styles = `<style>
* { box-sizing: border-box; margin: 0; padding: 0; }

/* Bootstrap Modal Base Styles */
.modal {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1055;
  display: block;
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  outline: 0;
}

.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1050;
  width: 100vw;
  height: 100vh;
  background-color: #000;
  opacity: 0.5;
}

.modal-dialog {
  position: relative;
  width: auto;
  margin: 1.75rem auto;
  pointer-events: none;
  max-width: 800px;
}

.modal-dialog-centered {
  display: flex;
  align-items: center;
  min-height: calc(100% - 3.5rem);
}

.modal-content {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  pointer-events: auto;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 0.428rem;
  outline: 0;
  box-shadow: 0 0.25rem 0.5rem rgba(0, 0, 0, 0.5);
}

.modal-header {
  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem;
  border-bottom: 1px solid #EBE9F1;
  border-top-left-radius: 0.428rem;
  border-top-right-radius: 0.428rem;
}

.modal-title {
  margin-bottom: 0;
  line-height: 1.5;
  font-size: 1.285rem;
  font-weight: 600;
  color: #5E5873;
}

.btn-close {
  padding: 0.25rem 0.25rem;
  margin: -0.5rem -0.5rem -0.5rem auto;
  background: transparent;
  border: 0;
  border-radius: 0.285rem;
  opacity: 0.5;
  cursor: pointer;
  width: 1em;
  height: 1em;
  box-sizing: content-box;
}

.btn-close:hover {
  opacity: 0.75;
}

.btn-close::before {
  content: '×';
  font-size: 2rem;
  line-height: 1;
  color: #000;
}

.modal-body {
  position: relative;
  flex: 1 1 auto;
  padding: 1.5rem;
}

/* Component Specific Styles (from EditProfileStudentsNew.vue) */

/* Component Specific Styles (from EditProfileStudentsNew.vue) */
.list-pets {
  width: 210px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 6px;
}

.pet-container {
  border: 2px solid transparent;
  width: 52px;
  height: 52px;
  border-radius: 6px;
  opacity: 0.7;
  cursor: pointer;
  transition: all 0.2s ease;
}

.pet-container:hover {
  opacity: 0.85;
}

.pet-container.selected {
  opacity: 1;
  border-color: #7367F0;
}

.pet-img-container {
  border-radius: 4px;
  width: 44px;
  height: 44px;
  margin: 2px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.pet-img-container img {
  max-width: 90%;
  max-height: 90%;
}

.pet-img-selected-container {
  border-radius: 4px;
  width: 202px;
  height: 202px;
  margin-bottom: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}

.pet-img-selected-container img {
  max-width: 70%;
  max-height: 70%;
  object-fit: contain;
}

/* Layout */
.edit-container {
  display: grid;
  grid-template-columns: 210px 1fr;
  gap: 2rem;
}

.avatar-section {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.form-section {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-label {
  font-size: 0.857rem;
  font-weight: 500;
  color: #5E5873;
}

.form-control {
  padding: 0.714rem 1rem;
  border: 1px solid #D8D6DE;
  border-radius: 0.428rem;
  font-size: 1rem;
  color: #5E5873;
  transition: border-color 0.2s ease;
}

.form-control:focus {
  outline: none;
  border-color: #7367F0;
  box-shadow: 0 3px 10px 0 rgba(115, 103, 240, 0.1);
}

.form-control:disabled {
  background: #EFEFEF;
  cursor: not-allowed;
  opacity: 0.7;
}

.input-group {
  position: relative;
  display: flex;
}

.input-group .form-control {
  border-right: none;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}

.input-group-append {
  display: flex;
  align-items: center;
  padding: 0 0.714rem;
  background: #fff;
  border: 1px solid #D8D6DE;
  border-left: none;
  border-top-right-radius: 0.428rem;
  border-bottom-right-radius: 0.428rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.input-group:focus-within .input-group-append {
  border-color: #7367F0;
}

.input-group-append:hover {
  background: #F8F8F8;
}

.input-group-append .material-symbols-outlined {
  font-size: 20px;
  color: #6E6B7B;
}

.text-danger {
  color: #EA5455;
  font-size: 0.857rem;
  margin-top: 0.25rem;
}

.actions-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.75rem;
  margin-top: 1.5rem;
}

.btn {
  padding: 0.714rem 1.5rem;
  border-radius: 0.428rem;
  font-size: 1rem;
  font-weight: 500;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.btn-outline-danger {
  background: transparent;
  border: 1px solid #EA5455;
  color: #EA5455;
}

.btn-outline-danger:hover:not(:disabled) {
  background: #EA5455;
  color: #fff;
  box-shadow: 0 8px 25px -8px #EA5455;
}

.btn-primary {
  background: #7367F0;
  color: #fff;
}

.btn-primary:hover:not(:disabled) {
  background: #5E50EE;
  box-shadow: 0 8px 25px -8px #7367F0;
}

.spinner {
  width: 14px;
  height: 14px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top-color: #fff;
  border-radius: 50%;
  animation: spin 0.6s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
  border-radius: 0.428rem;
}

.overlay .spinner {
  width: 40px;
  height: 40px;
  border-width: 4px;
  border-color: rgba(115, 103, 240, 0.2);
  border-top-color: #7367F0;
}

@media (max-width: 768px) {
  .edit-container {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  
  .actions-container {
    grid-template-columns: 1fr;
  }
}
</style>`;

// Mascotes Educacross originais (corujinhas PNG)
const mascotImages = {
  1: '<img src="/profile-corujinhas/1.png" alt="Corujinha 1" style="max-width: 90%; max-height: 90%;">',
  2: '<img src="/profile-corujinhas/2.png" alt="Corujinha 2" style="max-width: 90%; max-height: 90%;">',
  3: '<img src="/profile-corujinhas/3.png" alt="Corujinha 3" style="max-width: 90%; max-height: 90%;">',
  4: '<img src="/profile-corujinhas/4.png" alt="Corujinha 4" style="max-width: 90%; max-height: 90%;">',
  5: '<img src="/profile-corujinhas/5.png" alt="Corujinha 5" style="max-width: 90%; max-height: 90%;">',
  6: '<img src="/profile-corujinhas/6.png" alt="Corujinha 6" style="max-width: 90%; max-height: 90%;">',
  7: '<img src="/profile-corujinhas/7.png" alt="Corujinha 7" style="max-width: 90%; max-height: 90%;">',
  8: '<img src="/profile-corujinhas/8.png" alt="Corujinha 8" style="max-width: 90%; max-height: 90%;">',
};

const generateMascotGrid = (selectedId) => {
  return [1, 2, 3, 4, 5, 6, 7, 8].map(id => `
    <div class="pet-container ${id === selectedId ? 'selected' : ''}" data-mascot="${id}">
      <div class="pet-img-container" style="background-color: #5AC4FF;">
        ${mascotImages[id]}
      </div>
    </div>
  `).join('');
};

export const Default = {
  name: 'Editar Aluno',
  render: () => {
    setTimeout(() => {
      // Close button
      const closeBtn = document.querySelector('.btn-close');
      if (closeBtn) {
        closeBtn.addEventListener('click', () => {
          alert('Modal fechado (emit cancel)');
        });
      }

      // Toggle password visibility
      const eyeIcons = document.querySelectorAll('.input-group-append');
      eyeIcons.forEach(icon => {
        icon.addEventListener('click', (e) => {
          const input = e.currentTarget.previousElementSibling;
          if (input.type === 'password') {
            input.type = 'text';
            e.currentTarget.querySelector('.material-symbols-outlined').textContent = 'visibility';
          } else {
            input.type = 'password';
            e.currentTarget.querySelector('.material-symbols-outlined').textContent = 'visibility_off';
          }
        });
      });

      // Mascot selection
      const mascotItems = document.querySelectorAll('.pet-container');
      const selectedAvatar = document.querySelector('.pet-img-selected-container');
      
      mascotItems.forEach(item => {
        item.addEventListener('click', () => {
          mascotItems.forEach(m => m.classList.remove('selected'));
          item.classList.add('selected');
          const mascotId = parseInt(item.dataset.mascot);
          selectedAvatar.innerHTML = mascotImages[mascotId];
        });
      });
    }, 100);

    return `
      ${styles}
      <div class="modal-backdrop"></div>
      <div class="modal" tabindex="-1">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <!-- Modal Header -->
            <div class="modal-header">
              <h5 class="modal-title">Editar usuário</h5>
              <button type="button" class="btn-close" aria-label="Close"></button>
            </div>

            <!-- Modal Body -->
            <div class="modal-body">
              <div class="edit-container">
                <!-- Avatar Section -->
                <div class="avatar-section">
                  <div class="pet-img-selected-container" style="background-color: #5AC4FF;">
                    ${mascotImages[7]}
                  </div>
                  
                  <div class="list-pets">
                    ${generateMascotGrid(7)}
                  </div>
                </div>

                <!-- Form Section -->
                <div class="form-section">
                  <div class="form-group">
                    <label class="form-label">Nome completo</label>
                    <input type="text" class="form-control" value="Fabio 2º Ano" disabled>
                  </div>

                  <div class="form-group">
                    <label class="form-label">Usuário</label>
                    <input type="text" class="form-control" value="maria0983" disabled>
                  </div>

                  <div class="form-group">
                    <label class="form-label">Senha</label>
                    <div class="input-group">
                      <input type="password" class="form-control" value="abc123" placeholder="Digite sua senha">
                      <div class="input-group-append">
                        <span class="material-symbols-outlined">visibility_off</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Actions -->
              <div class="actions-container">
                <button class="btn btn-outline-danger">Cancelar</button>
                <button class="btn btn-primary">Salvar</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <p style="margin-top: 2rem; text-align: center; color: #6E6B7B; font-size: 0.857rem;">
        <strong>Contexto:</strong> Responsável editando senha e mascote do filho "Fabio 2º Ano".<br>
        <strong>Interação:</strong> Clique nos mascotes para trocar, clique no olho para mostrar senha, X para fechar.
      </p>
    `;
  }
};

export const Loading = {
  name: 'Carregando Dados',
  render: () => `
    ${styles}
    <div class="modal-backdrop"></div>
    <div class="modal" tabindex="-1">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content" style="position: relative;">
          <div class="overlay">
            <div class="spinner"></div>
          </div>
          
          <div class="modal-header">
            <h5 class="modal-title">Editar usuário</h5>
            <button type="button" class="btn-close" aria-label="Close"></button>
          </div>

          <div class="modal-body" style="opacity: 0.3;">
            <div class="edit-container">
              <div class="avatar-section">
                <div class="pet-img-selected-container" style="background-color: #5AC4FF;"></div>
                
                <div class="list-pets">
                  ${generateMascotGrid(1)}
                </div>
              </div>

              <div class="form-section">
                <div class="form-group">
                  <label class="form-label">Nome completo</label>
                  <input type="text" class="form-control" disabled>
                </div>
                <div class="form-group">
                  <label class="form-label">Usuário</label>
                  <input type="text" class="form-control" disabled>
                </div>
                <div class="form-group">
                  <label class="form-label">Senha</label>
                  <input type="password" class="form-control" disabled>
                </div>
              </div>
            </div>

            <div class="actions-container">
              <button class="btn btn-outline-danger" disabled>Cancelar</button>
              <button class="btn btn-primary" disabled>Salvar</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <p style="margin-top: 2rem; text-align: center; color: #6E6B7B; font-size: 0.857rem;">
      <strong>Estado:</strong> Buscando dados do aluno. Overlay com spinner.
    </p>
  `
};

export const Saving = {
  name: 'Salvando Alterações',
  render: () => `
    ${styles}
    <div class="modal-backdrop"></div>
    <div class="modal" tabindex="-1">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Editar usuário</h5>
            <button type="button" class="btn-close" disabled style="opacity: 0.6;" aria-label="Close"></button>
          </div>

          <div class="modal-body">
            <div class="edit-container">
              <div class="avatar-section">
                <div class="pet-img-selected-container" style="background-color: #5AC4FF;">
                  ${mascotImages[3]}
                </div>
                
                <div class="list-pets">
                  ${generateMascotGrid(3)}
                </div>
              </div>

              <div class="form-section">
                <div class="form-group">
                  <label class="form-label">Nome completo</label>
                  <input type="text" class="form-control" value="Alice 5º Ano" disabled>
                </div>
                <div class="form-group">
                  <label class="form-label">Usuário</label>
                  <input type="text" class="form-control" value="alice5234" disabled>
                </div>
                <div class="form-group">
                  <label class="form-label">Senha</label>
                  <div class="input-group">
                    <input type="text" class="form-control" value="senha123" disabled>
                    <div class="input-group-append" style="pointer-events: none; opacity: 0.6;">
                      <span class="material-symbols-outlined">visibility</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="actions-container">
              <button class="btn btn-outline-danger" disabled>Cancelar</button>
              <button class="btn btn-primary" disabled>
                <span class="spinner"></span>
                Salvar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <p style="margin-top: 2rem; text-align: center; color: #6E6B7B; font-size: 0.857rem;">
      <strong>Estado:</strong> Salvando alterações. Spinner no botão + todos os campos disabled.
    </p>
  `
};

export const WithError = {
  name: 'Com Erro de Validação',
  render: () => `
    ${styles}
    <div class="modal-backdrop"></div>
    <div class="modal" tabindex="-1">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Editar usuário</h5>
            <button type="button" class="btn-close" aria-label="Close"></button>
          </div>

          <div class="modal-body">
            <div class="edit-container">
              <div class="avatar-section">
                <div class="pet-img-selected-container" style="background-color: #5AC4FF;">
                  ${mascotImages[5]}
                </div>
                
                <div class="list-pets">
                  ${generateMascotGrid(5)}
                </div>
              </div>

              <div class="form-section">
                <div class="form-group">
                  <label class="form-label">Nome completo</label>
                  <input type="text" class="form-control" value="Maria 3º Ano" disabled>
                </div>
                <div class="form-group">
                  <label class="form-label">Usuário</label>
                  <input type="text" class="form-control" value="maria8976" disabled>
                </div>
                <div class="form-group">
                  <label class="form-label">Senha</label>
                  <div class="input-group">
                    <input type="password" class="form-control" value="" placeholder="Digite sua senha" style="border-color: #EA5455;">
                    <div class="input-group-append" style="border-color: #EA5455;">
                      <span class="material-symbols-outlined">visibility_off</span>
                    </div>
                  </div>
                  <small class="text-danger">Senha é obrigatória</small>
                </div>
              </div>
            </div>

            <div class="actions-container">
              <button class="btn btn-outline-danger">Cancelar</button>
              <button class="btn btn-primary" disabled>Salvar</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <p style="margin-top: 2rem; text-align: center; color: #6E6B7B; font-size: 0.857rem;">
      <strong>Estado:</strong> Campo senha vazio. Erro de validação exibido. Botão Salvar disabled.
    </p>
  `
};

export const AllMascots = {
  name: 'Todos os Mascotes',
  render: () => `
    ${styles}
    <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 2rem; padding: 2rem; max-width: 1200px; margin: 0 auto;">
      ${[1, 2, 3, 4, 5, 6, 7, 8].map(id => `
        <div class="modal-content" style="max-width: 250px;">
          <div class="avatar-section">
            <div class="pet-img-selected-container" style="background-color: #5AC4FF;">
              ${mascotImages[id]}
            </div>
            <p style="font-size: 0.857rem; font-weight: 600; color: #5E5873; text-align: center; margin-top: 0.5rem;">
              Corujinha ${id}
            </p>
          </div>
        </div>
      `).join('')}
    </div>
    
    <p style="margin-top: 2rem; text-align: center; color: #6E6B7B; font-size: 0.857rem;">
      <strong>Contexto:</strong> 8 corujinhas disponíveis para seleção. Cada aluno pode ter sua própria.
    </p>
  `
};
