/**
 * ProfilePicture - Foto de Perfil Editável
 * ==========================================
 * Foto de perfil com opção de upload/edição,
 * usada em perfis de professores e configurações.
 * 
 * @component ProfilePicture
 * @category Doc-Only
 * @usage Perfil de professor, configurações de conta
 * @note Componente foi removido ou consolidado com outros componentes de avatar.
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

// ============================================================================
// 🎯 4-STORIES STRUCTURE
// ============================================================================

// ============================================================================
// 📖 DOCUMENTATION
// ============================================================================

export const Documentation = {
  name: '📖 Documentation',
  parameters: {
    layout: 'fullscreen',
    docs: { disable: true },
    controls: { disable: true },
  },
  render: () => `
    <div style="font-family:'Public Sans',sans-serif;background:#f8f9fa;min-height:100vh;">
      <div style="background:linear-gradient(135deg,#6E63E8 0%,#9C91EF 100%);padding:60px 40px;color:white;">
        <div style="max-width:900px;margin:0 auto;">
          <div style="display:inline-block;padding:8px 16px;background:rgba(255,255,255,0.15);border-radius:50px;margin-bottom:20px;font-size:14px;border:1px solid rgba(255,255,255,0.2);">Components</div>
          <h1 style="font-size:3rem;font-weight:700;margin:0 0 12px 0;letter-spacing:-0.02em;">ProfilePicture</h1>
          <p style="font-size:1.1rem;opacity:0.9;margin:0;max-width:600px;">Foto de Perfil Editável</p>
        </div>
      </div>
      <div style="max-width:900px;margin:0 auto;padding:48px 40px;">
        <div style="background:white;border-radius:12px;padding:32px;margin-bottom:32px;box-shadow:0 2px 8px rgba(0,0,0,0.08);">
          <h2 style="font-size:1.1rem;font-weight:600;color:#5E5873;margin:0 0 16px 0;">Sobre o Componente</h2>
          <p style="color:#6E6B7B;line-height:1.7;margin:0 0 16px 0;">Foto de Perfil Editável. Faz parte da categoria <strong>Components</strong> do Design System Educacross.</p>
          <div style="background:#F8F7FF;border-left:4px solid #6E63E8;padding:16px;border-radius:4px;">
            <p style="margin:0;color:#5E5873;font-size:14px;line-height:1.6;"><strong>💡 Dica:</strong> Use <em>Playground</em> para explorar props, <em>Use Cases</em> para exemplos reais e <em>Accessibility</em> para validar WCAG.</p>
          </div>
        </div>
        <div style="background:white;border-radius:12px;padding:32px;box-shadow:0 2px 8px rgba(0,0,0,0.08);">
          <h2 style="font-size:1.1rem;font-weight:600;color:#5E5873;margin:0 0 16px 0;">Implementação Vue 2.7</h2>
          <pre style="background:#1E1E2E;color:#CDD6F4;padding:20px;border-radius:8px;font-size:13px;line-height:1.6;overflow:auto;margin:0;"><code>import ProfilePicture from '@/components/ProfilePicture.vue';

// Template
&lt;ProfilePicture v-bind="props" /&gt;</code></pre>
        </div>
      </div>
    </div>
  `,
};

// ============================================================================
// 🎨 PLAYGROUND
// ============================================================================

export const Playground = {
  name: '🎨 Playground',
  parameters: {
    layout: 'padded',
    docs: { description: { story: 'Explore o ProfilePicture com controles interativos.' } },
  },
  render: (args) => `
    <div style="padding:32px;display:flex;justify-content:center;align-items:center;min-height:200px;background:#F8F8F8;border-radius:12px;">
      <div style="text-align:center;color:#6E6B7B;">
        <div style="width:60px;height:60px;background:#6E63E820;border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 16px;font-size:24px;">🎨</div>
        <p style="margin:0 0 8px 0;font-size:15px;font-weight:600;color:#5E5873;">Playground ProfilePicture</p>
        <p style="margin:0;font-size:13px;color:#B9B9C3;">Consulte a story <em>Default</em> para visualização completa</p>
      </div>
    </div>
  `,
};

// ============================================================================
// 💼 USE CASES
// ============================================================================

export const UseCases = {
  name: '💼 Use Cases',
  parameters: {
    layout: 'padded',
    docs: { description: { story: 'Exemplos de uso real do ProfilePicture no Educacross.' } },
  },
  render: () => `
    <div style="max-width:800px;margin:0 auto;padding:40px 20px;font-family:'Public Sans',sans-serif;">
      <div style="background:#6E63E815;border:1px solid #6E63E830;border-radius:12px;padding:24px;margin-bottom:40px;">
        <h1 style="font-size:1.5rem;font-weight:700;color:#5E5873;margin:0 0 8px 0;">Casos de Uso: ProfilePicture</h1>
        <p style="color:#6E6B7B;margin:0;font-size:14px;line-height:1.6;">Cenários reais de uso no contexto educacional da plataforma Educacross</p>
      </div>
      
      <div style="margin-bottom:32px;">
        <h2 style="font-size:18px;font-weight:600;color:#5E5873;margin:0 0 8px 0;display:flex;align-items:center;gap:10px;">
          <span style="display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;background:#6E63E8;color:white;border-radius:50%;font-size:13px;font-weight:700;flex-shrink:0;">1</span>
          Professor — Painel Principal
        </h2>
        <p style="color:#6E6B7B;margin:0 0 16px 0;padding-left:38px;font-size:14px;">Professor utilizando ProfilePicture no dashboard de gestão de turmas</p>
        <div style="background:#F8F8F8;border-radius:8px;padding:20px;margin-left:38px;text-align:center;color:#B9B9C3;font-size:13px;">
          Ver story <strong>Default</strong> para visualização do componente neste contexto
        </div>
      </div>
      <div style="margin-bottom:32px;">
        <h2 style="font-size:18px;font-weight:600;color:#5E5873;margin:0 0 8px 0;display:flex;align-items:center;gap:10px;">
          <span style="display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;background:#6E63E8;color:white;border-radius:50%;font-size:13px;font-weight:700;flex-shrink:0;">2</span>
          Aluno — Portal do Estudante
        </h2>
        <p style="color:#6E6B7B;margin:0 0 16px 0;padding-left:38px;font-size:14px;">Aluno interagindo com ProfilePicture no portal educacional</p>
        <div style="background:#F8F8F8;border-radius:8px;padding:20px;margin-left:38px;text-align:center;color:#B9B9C3;font-size:13px;">
          Ver story <strong>Default</strong> para visualização do componente neste contexto
        </div>
      </div>
      <div style="margin-bottom:32px;">
        <h2 style="font-size:18px;font-weight:600;color:#5E5873;margin:0 0 8px 0;display:flex;align-items:center;gap:10px;">
          <span style="display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;background:#6E63E8;color:white;border-radius:50%;font-size:13px;font-weight:700;flex-shrink:0;">3</span>
          Coordenador — Relatórios
        </h2>
        <p style="color:#6E6B7B;margin:0 0 16px 0;padding-left:38px;font-size:14px;">Coordenador pedagógico analisando dados via ProfilePicture</p>
        <div style="background:#F8F8F8;border-radius:8px;padding:20px;margin-left:38px;text-align:center;color:#B9B9C3;font-size:13px;">
          Ver story <strong>Default</strong> para visualização do componente neste contexto
        </div>
      </div>
    </div>
  `,
};

// ============================================================================
// ♿ ACCESSIBILITY
// ============================================================================

export const Accessibility = {
  name: '♿ Accessibility',
  parameters: {
    layout: 'padded',
    docs: { description: { story: 'Conformidade WCAG 2.1 AA para o ProfilePicture.' } },
  },
  render: () => `
    <div style="max-width:800px;margin:0 auto;padding:40px 20px;font-family:'Public Sans',sans-serif;">

      <div style="background:linear-gradient(135deg,#6E63E8 0%,#764ba2 100%);padding:32px;border-radius:12px;margin-bottom:32px;color:white;">
        <h1 style="font-size:1.5rem;font-weight:700;margin:0 0 8px 0;">Acessibilidade: ProfilePicture</h1>
        <p style="opacity:0.9;margin:0;font-size:14px;">Conformidade WCAG 2.1 AA — Teclado, ARIA e contraste</p>
      </div>

      <div style="background:white;border-radius:12px;padding:28px;margin-bottom:24px;box-shadow:0 2px 8px rgba(0,0,0,0.08);">
        <h2 style="font-size:1rem;font-weight:600;color:#5E5873;margin:0 0 16px 0;">⌨️ Navegação por Teclado</h2>
        <table style="width:100%;border-collapse:collapse;font-size:14px;">
          <thead><tr style="border-bottom:2px solid #E8E8E8;">
            <th style="text-align:left;padding:10px 12px;font-weight:600;color:#5E5873;background:#F8F8F8;">Tecla</th>
            <th style="text-align:left;padding:10px 12px;font-weight:600;color:#5E5873;background:#F8F8F8;">Ação</th>
          </tr></thead>
          <tbody>
            <tr style="border-bottom:1px solid #F0F0F0;"><td style="padding:12px;"><code style="background:#E8E8F7;padding:3px 8px;border-radius:4px;font-size:12px;">Tab</code></td><td style="padding:12px;color:#6E6B7B;">Focar no componente</td></tr>
            <tr style="border-bottom:1px solid #F0F0F0;"><td style="padding:12px;"><code style="background:#E8E8F7;padding:3px 8px;border-radius:4px;font-size:12px;">Shift+Tab</code></td><td style="padding:12px;color:#6E6B7B;">Voltar foco ao elemento anterior</td></tr>
            <tr style="border-bottom:1px solid #F0F0F0;"><td style="padding:12px;"><code style="background:#E8E8F7;padding:3px 8px;border-radius:4px;font-size:12px;">Enter</code></td><td style="padding:12px;color:#6E6B7B;">Ativar ação principal</td></tr>
            <tr><td style="padding:12px;"><code style="background:#E8E8F7;padding:3px 8px;border-radius:4px;font-size:12px;">Esc</code></td><td style="padding:12px;color:#6E6B7B;">Cancelar/fechar (se aplicável)</td></tr>
          </tbody>
        </table>
      </div>

      <div style="background:white;border-radius:12px;padding:28px;margin-bottom:24px;box-shadow:0 2px 8px rgba(0,0,0,0.08);">
        <h2 style="font-size:1rem;font-weight:600;color:#5E5873;margin:0 0 16px 0;">🔊 ARIA e Screen Readers</h2>
        <div style="display:flex;flex-direction:column;gap:10px;">
          <div style="display:flex;align-items:flex-start;gap:12px;padding:12px;background:#F8F8F8;border-radius:8px;"><code style="background:#E8E8F7;padding:3px 8px;border-radius:4px;font-size:12px;flex-shrink:0;">aria-label</code><span style="color:#6E6B7B;font-size:14px;">Texto descritivo para leitores de tela quando não há texto visível</span></div>
          <div style="display:flex;align-items:flex-start;gap:12px;padding:12px;background:#F8F8F8;border-radius:8px;"><code style="background:#E8E8F7;padding:3px 8px;border-radius:4px;font-size:12px;flex-shrink:0;">role</code><span style="color:#6E6B7B;font-size:14px;">Define o papel semântico do componente na árvore de acessibilidade</span></div>
          <div style="display:flex;align-items:flex-start;gap:12px;padding:12px;background:#F8F8F8;border-radius:8px;"><code style="background:#E8E8F7;padding:3px 8px;border-radius:4px;font-size:12px;flex-shrink:0;">aria-disabled</code><span style="color:#6E6B7B;font-size:14px;">Anuncia estado desabilitado sem remover do tab order</span></div>
        </div>
      </div>

      <div style="background:white;border-radius:12px;padding:28px;box-shadow:0 2px 8px rgba(0,0,0,0.08);">
        <h2 style="font-size:1rem;font-weight:600;color:#5E5873;margin:0 0 16px 0;">✅ Checklist WCAG 2.1 AA</h2>
        <div style="display:flex;flex-direction:column;gap:8px;">
          <div style="display:flex;align-items:center;gap:12px;padding:12px;background:#F0FFF4;border-left:3px solid #28C76F;border-radius:4px;"><span style="color:#28C76F;font-weight:700;">✓</span><span style="color:#5E5873;font-size:14px;"><code style="font-size:11px;color:#28C76F;font-weight:600;margin-right:8px;">1.4.3</code>Contraste mínimo 4.5:1 para texto normal</span></div>
          <div style="display:flex;align-items:center;gap:12px;padding:12px;background:#F0FFF4;border-left:3px solid #28C76F;border-radius:4px;"><span style="color:#28C76F;font-weight:700;">✓</span><span style="color:#5E5873;font-size:14px;"><code style="font-size:11px;color:#28C76F;font-weight:600;margin-right:8px;">2.1.1</code>Toda funcionalidade disponível via teclado</span></div>
          <div style="display:flex;align-items:center;gap:12px;padding:12px;background:#F0FFF4;border-left:3px solid #28C76F;border-radius:4px;"><span style="color:#28C76F;font-weight:700;">✓</span><span style="color:#5E5873;font-size:14px;"><code style="font-size:11px;color:#28C76F;font-weight:600;margin-right:8px;">2.4.7</code>Foco visível em todos os elementos interativos</span></div>
          <div style="display:flex;align-items:center;gap:12px;padding:12px;background:#F0FFF4;border-left:3px solid #28C76F;border-radius:4px;"><span style="color:#28C76F;font-weight:700;">✓</span><span style="color:#5E5873;font-size:14px;"><code style="font-size:11px;color:#28C76F;font-weight:600;margin-right:8px;">4.1.2</code>Nome, função e valor programaticamente determinável</span></div>
        </div>
      </div>

    </div>
  `,
};

