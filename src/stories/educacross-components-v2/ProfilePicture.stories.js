/**
 * ProfilePicture - Foto de Perfil Editável
 * ==========================================
 * Foto de perfil com opção de upload/edição,
 * usada em perfis de professores e configurações.
 * 
 * @component ProfilePicture
 * @usage Perfil de professor, configurações de conta
 */

export default {
  title: 'Educacross Components V2/ProfilePicture',
  tags: ['autodocs'],
  argTypes: {
    src: {
      control: 'text',
      description: 'URL da foto de perfil',
    },
    editable: {
      control: 'boolean',
      description: 'Se permite edição (mostra botão de upload)',
    },
    loading: {
      control: 'boolean',
      description: 'Estado de carregamento',
    },
    shape: {
      control: 'select',
      options: ['circle', 'square', 'rounded'],
      description: 'Formato da foto de perfil',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl'],
      description: 'Tamanho da foto',
    },
  },
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Componente de foto de perfil editável com upload, usado em configurações e perfis de usuários.',
      },
    },
  },
};

// Estilos Figma CSS
const componentStyles = `
/* Profile Picture Container */
.profile-picture-container {
  position: relative;
  display: inline-block;
}

.profile-picture {
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  position: relative;
}

/* Shapes */
.profile-picture.shape-circle {
  border-radius: 50%;
}

.profile-picture.shape-square {
  border-radius: 0;
}

.profile-picture.shape-rounded {
  border-radius: 12px;
}

/* Sizes */
.profile-picture.size-sm {
  width: 64px;
  height: 64px;
}

.profile-picture.size-md {
  width: 96px;
  height: 96px;
}

.profile-picture.size-lg {
  width: 128px;
  height: 128px;
}

.profile-picture.size-xl {
  width: 160px;
  height: 160px;
}

/* Image */
.profile-picture img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Placeholder */
.profile-picture .placeholder-icon {
  width: 50%;
  height: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.profile-picture .placeholder-icon .material-symbols-outlined {
  font-size: 48px;
  color: white;
  opacity: 0.9;
}

.profile-picture.size-sm .placeholder-icon .material-symbols-outlined {
  font-size: 32px;
}

.profile-picture.size-lg .placeholder-icon .material-symbols-outlined {
  font-size: 64px;
}

.profile-picture.size-xl .placeholder-icon .material-symbols-outlined {
  font-size: 80px;
}

/* Edit button */
.edit-button {
  position: absolute;
  bottom: 4px;
  right: 4px;
  background: #7367f0;
  color: white;
  border: 3px solid white;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 0 2px 8px rgba(115, 103, 240, 0.4);
}

.edit-button:hover {
  background: #5e50ee;
  transform: scale(1.1);
}

.profile-picture.size-sm ~ .edit-button {
  width: 28px;
  height: 28px;
  border-width: 2px;
}

.profile-picture.size-sm ~ .edit-button .material-symbols-outlined {
  font-size: 16px;
}

.profile-picture.size-lg ~ .edit-button,
.profile-picture.size-xl ~ .edit-button {
  width: 44px;
  height: 44px;
  bottom: 8px;
  right: 8px;
}

.edit-button .material-symbols-outlined {
  font-size: 20px;
}

/* Loading state */
.profile-picture.loading {
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
}

@keyframes shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}

/* Upload state */
.profile-picture.upload-state {
  border: 2px dashed #7367f0;
  background: rgba(115, 103, 240, 0.05);
}

.profile-picture.upload-state .upload-info {
  text-align: center;
  padding: 16px;
}

.profile-picture.upload-state .upload-info .material-symbols-outlined {
  font-size: 48px;
  color: #7367f0;
  margin-bottom: 8px;
}

.profile-picture.upload-state .upload-info p {
  margin: 0;
  font-size: 13px;
  color: #6e6b7b;
}

/* Error state */
.profile-picture.error-state {
  border: 2px solid #ea5455;
  background: rgba(234, 84, 85, 0.05);
}

.profile-picture.error-state .error-icon {
  color: #ea5455;
}

/* Upload overlay */
.upload-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.2s;
  cursor: pointer;
}

.profile-picture-container:hover .upload-overlay {
  opacity: 1;
}

.upload-overlay .material-symbols-outlined {
  font-size: 32px;
  color: white;
}

/* Profile info wrapper */
.profile-picture-wrapper {
  display: flex;
  align-items: center;
  gap: 24px;
}

.profile-info {
  flex: 1;
}

.profile-info h5 {
  margin: 0 0 4px 0;
  color: #5e5873;
  font-weight: 600;
}

.profile-info p {
  margin: 0;
  color: #b9b9c3;
  font-size: 14px;
}

.profile-actions {
  display: flex;
  gap: 8px;
  margin-top: 12px;
}
`;

// Helper: Render Profile Picture
const renderProfilePicture = (args) => {
  const { src, editable, loading, shape = 'circle', size = 'md', error, uploadState } = args;
  
  return `
<div class="profile-picture-container">
  <div class="profile-picture shape-${shape} size-${size} ${loading ? 'loading' : ''} ${uploadState ? 'upload-state' : ''} ${error ? 'error-state' : ''}">
    ${src && !loading && !uploadState && !error ? `<img src="${src}" alt="Foto de perfil" />` : ''}
    ${!src && !loading && !uploadState && !error ? `
      <div class="placeholder-icon">
        <span class="material-symbols-outlined">person</span>
      </div>
    ` : ''}
    ${uploadState && !loading ? `
      <div class="upload-info">
        <span class="material-symbols-outlined">cloud_upload</span>
        <p>Soltar imagem aqui</p>
      </div>
    ` : ''}
    ${error && !loading ? `
      <div class="placeholder-icon error-icon">
        <span class="material-symbols-outlined">error</span>
      </div>
    ` : ''}
    ${editable && src && !loading && !uploadState && !error ? `
      <div class="upload-overlay">
        <span class="material-symbols-outlined">photo_camera</span>
      </div>
    ` : ''}
  </div>
  ${editable && !loading && !uploadState ? `
    <button class="edit-button">
      <span class="material-symbols-outlined">photo_camera</span>
    </button>
  ` : ''}
</div>
  `;
};

// ========== STORIES ==========

export const Default = {
  args: {
    src: 'https://i.pravatar.cc/300?img=5',
    editable: false,
    loading: false,
    shape: 'circle',
    size: 'md',
  },
  render: (args) => `
    <style>${componentStyles}</style>
    ${renderProfilePicture(args)}
  `,
};

export const Editable = {
  render: () => `
    <style>${componentStyles}</style>
    <div style="display: flex; gap: 32px; align-items: center;">
      ${renderProfilePicture({ src: 'https://i.pravatar.cc/300?img=5', editable: true, shape: 'circle', size: 'md' })}
      ${renderProfilePicture({ src: 'https://i.pravatar.cc/300?img=1', editable: true, shape: 'circle', size: 'lg' })}
    </div>
    <p style="margin-top: 16px; color: #6e6b7b; font-size: 14px;">
      Passe o mouse sobre a foto para ver o overlay de upload
    </p>
  `,
};

export const Loading = {
  render: () => `
    <style>${componentStyles}</style>
    <div style="display: flex; gap: 24px; align-items: center;">
      ${renderProfilePicture({ loading: true, shape: 'circle', size: 'sm' })}
      ${renderProfilePicture({ loading: true, shape: 'circle', size: 'md' })}
      ${renderProfilePicture({ loading: true, shape: 'circle', size: 'lg' })}
      ${renderProfilePicture({ loading: true, shape: 'circle', size: 'xl' })}
    </div>
  `,
};

export const UploadState = {
  render: () => `
    <style>${componentStyles}</style>
    <div style="display: flex; gap: 24px; align-items: center;">
      ${renderProfilePicture({ uploadState: true, shape: 'circle', size: 'md' })}
      ${renderProfilePicture({ uploadState: true, shape: 'rounded', size: 'lg' })}
    </div>
    <p style="margin-top: 16px; color: #6e6b7b; font-size: 14px;">
      Estado durante upload de arquivo (drag & drop)
    </p>
  `,
};

export const Error = {
  render: () => `
    <style>${componentStyles}</style>
    <div style="display: flex; gap: 24px; align-items: center;">
      ${renderProfilePicture({ error: true, shape: 'circle', size: 'md' })}
      ${renderProfilePicture({ error: true, shape: 'rounded', size: 'lg' })}
    </div>
    <p style="margin-top: 16px; color: #ea5455; font-size: 14px;">
      ⚠️ Erro ao carregar a imagem ou arquivo inválido
    </p>
  `,
};

export const AllShapes = {
  render: () => `
    <style>${componentStyles}</style>
    <div style="display: flex; gap: 32px; align-items: center;">
      <div style="text-align: center;">
        ${renderProfilePicture({ src: 'https://i.pravatar.cc/300?img=5', shape: 'circle', size: 'lg' })}
        <p style="margin-top: 12px; font-size: 14px; color: #6e6b7b;">Circle</p>
      </div>
      <div style="text-align: center;">
        ${renderProfilePicture({ src: 'https://i.pravatar.cc/300?img=5', shape: 'rounded', size: 'lg' })}
        <p style="margin-top: 12px; font-size: 14px; color: #6e6b7b;">Rounded</p>
      </div>
      <div style="text-align: center;">
        ${renderProfilePicture({ src: 'https://i.pravatar.cc/300?img=5', shape: 'square', size: 'lg' })}
        <p style="margin-top: 12px; font-size: 14px; color: #6e6b7b;">Square</p>
      </div>
    </div>
  `,
};

export const AllSizes = {
  render: () => `
    <style>${componentStyles}</style>
    <div style="display: flex; gap: 32px; align-items: center;">
      <div style="text-align: center;">
        ${renderProfilePicture({ src: 'https://i.pravatar.cc/300?img=5', shape: 'circle', size: 'sm' })}
        <p style="margin-top: 12px; font-size: 12px; color: #6e6b7b;">Small (64px)</p>
      </div>
      <div style="text-align: center;">
        ${renderProfilePicture({ src: 'https://i.pravatar.cc/300?img=5', shape: 'circle', size: 'md' })}
        <p style="margin-top: 12px; font-size: 12px; color: #6e6b7b;">Medium (96px)</p>
      </div>
      <div style="text-align: center;">
        ${renderProfilePicture({ src: 'https://i.pravatar.cc/300?img=5', shape: 'circle', size: 'lg' })}
        <p style="margin-top: 12px; font-size: 12px; color: #6e6b7b;">Large (128px)</p>
      </div>
      <div style="text-align: center;">
        ${renderProfilePicture({ src: 'https://i.pravatar.cc/300?img=5', shape: 'circle', size: 'xl' })}
        <p style="margin-top: 12px; font-size: 12px; color: #6e6b7b;">XL (160px)</p>
      </div>
    </div>
  `,
};

export const PerfilProfessor = {
  render: () => `
    <style>${componentStyles}</style>
    <div class="card" style="max-width: 600px;">
      <div class="card-body">
        <div class="profile-picture-wrapper">
          ${renderProfilePicture({ src: 'https://i.pravatar.cc/300?img=5', editable: true, shape: 'circle', size: 'xl' })}
          <div class="profile-info">
            <h5>Prof. Carlos Eduardo Silva</h5>
            <p>Professor de Matemática</p>
            <p style="font-size: 13px; margin-top: 4px;">📧 carlos.silva@escola.edu.br</p>
            <div class="profile-actions">
              <button class="btn btn-sm btn-primary">
                <span class="material-symbols-outlined" style="font-size: 16px;">edit</span>
                Editar Perfil
              </button>
              <button class="btn btn-sm btn-outline-secondary">
                <span class="material-symbols-outlined" style="font-size: 16px;">settings</span>
                Configurações
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
};

export const ConfiguracoesConta = {
  render: () => `
    <style>${componentStyles}</style>
    <div class="card" style="max-width: 700px;">
      <div class="card-header">
        <h5 class="mb-0">Configurações da Conta</h5>
      </div>
      <div class="card-body">
        <div class="mb-4">
          <label class="form-label fw-semibold">Foto de Perfil</label>
          <div class="d-flex align-items-start gap-3">
            ${renderProfilePicture({ src: 'https://i.pravatar.cc/300?img=1', editable: true, shape: 'circle', size: 'lg' })}
            <div>
              <p class="text-muted mb-2" style="font-size: 14px;">
                Formatos aceitos: JPG, PNG ou GIF<br/>
                Tamanho máximo: 2MB<br/>
                Dimensões recomendadas: 400x400px
              </p>
              <div class="d-flex gap-2">
                <button class="btn btn-sm btn-primary">
                  <span class="material-symbols-outlined" style="font-size: 16px;">upload</span>
                  Carregar Nova Foto
                </button>
                <button class="btn btn-sm btn-outline-danger">
                  <span class="material-symbols-outlined" style="font-size: 16px;">delete</span>
                  Remover
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <hr />
        
        <div class="mb-3">
          <label class="form-label">Nome Completo</label>
          <input type="text" class="form-control" value="Maria Silva Santos" />
        </div>
        
        <div class="mb-3">
          <label class="form-label">Email</label>
          <input type="email" class="form-control" value="maria.santos@escola.edu.br" />
        </div>
        
        <div class="text-end">
          <button class="btn btn-secondary me-2">Cancelar</button>
          <button class="btn btn-primary">Salvar Alterações</button>
        </div>
      </div>
    </div>
  `,
};

export const SemFoto = {
  render: () => `
    <style>${componentStyles}</style>
    <div style="display: flex; gap: 24px; align-items: center;">
      ${renderProfilePicture({ editable: false, shape: 'circle', size: 'md' })}
      ${renderProfilePicture({ editable: true, shape: 'circle', size: 'md' })}
      ${renderProfilePicture({ editable: false, shape: 'rounded', size: 'lg' })}
    </div>
    <p style="margin-top: 16px; color: #6e6b7b; font-size: 14px;">
      Placeholder quando não há foto de perfil
    </p>
  `,
};

export const ProcessoDeUpload = {
  render: () => `
    <style>${componentStyles}</style>
    <div class="card" style="max-width: 500px;">
      <div class="card-body">
        <h5 class="mb-4">Processo de Upload de Foto</h5>
        
        <div style="display: grid; gap: 24px;">
          <div>
            <p class="fw-semibold mb-2">1. Estado inicial (sem foto)</p>
            ${renderProfilePicture({ editable: true, shape: 'circle', size: 'lg' })}
          </div>
          
          <div>
            <p class="fw-semibold mb-2">2. Upload em andamento</p>
            ${renderProfilePicture({ uploadState: true, shape: 'circle', size: 'lg' })}
          </div>
          
          <div>
            <p class="fw-semibold mb-2">3. Carregando...</p>
            ${renderProfilePicture({ loading: true, shape: 'circle', size: 'lg' })}
          </div>
          
          <div>
            <p class="fw-semibold mb-2">4. Foto carregada com sucesso</p>
            ${renderProfilePicture({ src: 'https://i.pravatar.cc/300?img=5', editable: true, shape: 'circle', size: 'lg' })}
          </div>
          
          <div>
            <p class="fw-semibold mb-2 text-danger">5. Erro no upload</p>
            ${renderProfilePicture({ error: true, shape: 'circle', size: 'lg' })}
          </div>
        </div>
      </div>
    </div>
  `,
};
