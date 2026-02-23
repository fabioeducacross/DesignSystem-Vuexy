/**
 * EditProfileStudentNew - Modal de Edição de Perfil do Estudante
 * ==================================================================
 * Story alinhada ao componente real do frontoffice:
 * educacross-frontoffice/src/views/pages/auth-context/manage-account/EditProfileStudentsNew.vue
 */

export default {
  title: 'Educacross Components V2/Modals/EditProfileStudentNew',
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    loading: {
      control: 'boolean',
      description: 'Exibe estado de carregamento do overlay',
    },
    loadingSave: {
      control: 'boolean',
      description: 'Exibe estado de carregamento no botão Salvar',
    },
    selectedPetId: {
      control: 'select',
      options: [1, 2, 3, 4, 5, 6, 7, 8],
      description: 'Pet atualmente selecionado',
    },
  },
};

const resolvePetImage = (id) => {
  return `/educacross-assets/images/images-educa/profile-corujinhas/${id}.png`;
};

const baseStudent = {
  name: 'João Silva',
  userName: 'joao.silva',
  password: '',
  imageId: 2,
  backgroundColor: '#5AC4FF',
  pets: Array.from({ length: 8 }, (_, index) => {
    const id = index + 1;
    return {
      id,
      imageUrl: resolvePetImage(id),
    };
  }),
};

const styles = `
  <style>
    .edit-student-wrapper {
      width: 100%;
      max-width: 856px;
      position: relative;
    }

    .overlay-layer {
      position: absolute;
      inset: 0;
      background: rgba(255, 255, 255, 0.86);
      z-index: 20;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 0.5rem;
    }

    .pet-img-selected-container {
      border-radius: 0.25rem;
      width: 202px;
      height: 202px;
      margin-bottom: 4px;
      display: flex;
      justify-content: center;
      align-items: center;
      background: #5ac4ff;
    }

    .pet-img-selected-container img {
      max-width: 100%;
      max-height: 100%;
      object-fit: contain;
    }

    .list-pets {
      width: 210px;
      row-gap: 0.5rem;
    }

    .pet-container {
      border: 2px solid transparent;
      width: 52px;
      height: 52px;
      border-radius: 6px;
      opacity: 0.7;
      transition: all 0.15s ease;
      cursor: pointer;
      margin: 0 auto;
    }

    .pet-container.selected {
      opacity: 1;
      border-color: var(--bs-primary);
    }

    .pet-img-container {
      border-radius: 4px;
      width: 44px;
      height: 44px;
      margin: 2px;
      display: flex;
      justify-content: center;
      align-items: center;
      background: #5ac4ff;
    }

    .pet-img-container img {
      max-width: 100%;
      max-height: 100%;
      border-radius: 3px;
      object-fit: contain;
    }

    .eye-toggle {
      cursor: pointer;
      color: #6e6b7b;
      user-select: none;
    }

  </style>
`;

const petItem = (pet, selectedPetId, backgroundColor) => `
  <div class="col-3 d-flex justify-content-center">
    <div class="pet-container ${pet.id === selectedPetId ? 'selected' : ''}">
      <div class="pet-img-container" style="background-color: ${backgroundColor}">
        <img src="${pet.imageUrl}" alt="Pet ${pet.id}" />
      </div>
    </div>
  </div>
`;

const renderModal = ({ loading = false, loadingSave = false, selectedPetId = 2 } = {}) => {
  const student = {
    ...baseStudent,
    imageId: selectedPetId,
  };
  const selectedPet = student.pets.find((item) => item.id === student.imageId) || student.pets[0];

  return `
    ${styles}
    <div class="edit-student-wrapper">
      ${loading ? `
        <div class="overlay-layer">
          <div class="spinner-border text-primary" role="status" aria-label="Carregando"></div>
        </div>
      ` : ''}

      <div class="modal-dialog modal-lg modal-dialog-centered m-0">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Editar Perfil</h5>
            <button type="button" class="btn-close" aria-label="Fechar"></button>
          </div>

          <div class="modal-body">
            <div class="row gap-3 gap-md-0">
              <div class="col-12 col-md-auto d-flex flex-column align-items-center mb-1 mb-md-0">
                <div class="pet-img-selected-container" style="background-color: ${student.backgroundColor}">
                  <img src="${selectedPet.imageUrl}" alt="Pet selecionado" />
                </div>

                <div class="row list-pets mb-1">
                  ${student.pets.map((pet) => petItem(pet, student.imageId, student.backgroundColor)).join('')}
                </div>
              </div>

              <div class="col-12 col-md">
                <div class="mb-3">
                  <label class="form-label" for="fullName">Nome completo</label>
                  <input id="fullName" class="form-control" value="${student.name}" disabled />
                </div>

                <div class="mb-3">
                  <label class="form-label" for="userName">Usuário</label>
                  <input id="userName" class="form-control" value="${student.userName}" disabled />
                </div>

                <div class="mb-3">
                  <label class="form-label" for="password">Senha</label>
                  <div class="input-group input-group-merge">
                    <input id="password" class="form-control" type="password" placeholder="Digite sua senha" value="${student.password}" />
                    <span class="input-group-text eye-toggle">
                      <span class="material-symbols-outlined" style="font-size:20px">visibility_off</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="modal-footer pt-0 border-0">
            <div class="row w-100 g-2">
              <div class="col-12 col-md-6">
                <button class="btn btn-outline-danger w-100" ${loadingSave ? 'disabled' : ''}>Cancelar</button>
              </div>
              <div class="col-12 col-md-6">
                <button class="btn btn-primary w-100" ${loadingSave ? 'disabled' : ''}>
                  ${loadingSave ? '<span class="spinner-border spinner-border-sm me-50" role="status" aria-hidden="true"></span>' : ''}
                  Salvar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
};

export const Default = {
  args: {
    loading: false,
    loadingSave: false,
    selectedPetId: 2,
  },
  render: (args) => renderModal(args),
};

export const SingleColumn = {
  args: {
    ...Default.args,
  },
  render: (args) => renderModal(args),
};

export const WithoutMascot = {
  args: {
    ...Default.args,
  },
  render: (args) => renderModal(args),
};

export const Compact = {
  args: {
    loading: false,
    loadingSave: false,
    selectedPetId: 1,
  },
  render: (args) => renderModal(args),
};

export const LoadingData = {
  args: {
    loading: true,
    loadingSave: false,
    selectedPetId: 2,
  },
  render: (args) => renderModal(args),
};

export const Saving = {
  args: {
    loading: false,
    loadingSave: true,
    selectedPetId: 5,
  },
  render: (args) => renderModal(args),
};

export const DifferentPetSelected = {
  args: {
    loading: false,
    loadingSave: false,
    selectedPetId: 7,
  },
  render: (args) => renderModal(args),
};

export const Overview = {
  parameters: {
    layout: 'padded',
    controls: { disable: true },
  },
  render: () => `
    <div class="container py-3">
      <h4 class="mb-3">EditProfileStudentNew — Estados Principais</h4>
      <div class="mb-4">${renderModal(Default.args)}</div>
      <div class="mb-4">${renderModal(Saving.args)}</div>
    </div>
  `,
};
