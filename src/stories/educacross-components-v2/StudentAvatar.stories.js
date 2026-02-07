/**
 * StudentAvatar - Avatar de Estudante
 * =====================================
 * 
 * Avatar de estudante com foto ou iniciais, usado em listas,
 * rankings, perfis e visualizações de turma.
 * 
 * @component StudentAvatar
 * @category Educacross Components V2
 * @source educacross-frontoffice/src/components/student/StudentAvatar.vue
 * @priority P2
 * @status PIXEL-PERFECT
 * @since 2.0.0
 * @usage Lista de alunos, ranking de proficiência, perfil de estudante
 */

export default {
  title: 'Front-office/StudentAvatar',
  tags: ['autodocs'],
  argTypes: {
    src: {
      control: 'text',
      description: 'URL da foto do estudante',
    },
    name: {
      control: 'text',
      description: 'Nome do estudante (usado para iniciais)',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl'],
      description: 'Tamanho do avatar',
    },
    status: {
      control: 'select',
      options: ['none', 'online', 'offline', 'away'],
      description: 'Status de presença (online/offline)',
    },
    badge: {
      control: 'text',
      description: 'Badge de conquista/posição (ex: "1º", "🏆")',
    },
  },
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Avatar de estudante com foto, iniciais, status e badges de conquista. Usado em contextos educacionais como listas de alunos, rankings e perfis.',
      },
    },
  },
};

// Estilos Figma CSS
const componentStyles = `
/* Avatar base */
.student-avatar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  font-weight: 600;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  overflow: hidden;
  position: relative;
  flex-shrink: 0;
}

/* Sizes */
.student-avatar.size-sm {
  width: 32px;
  height: 32px;
  font-size: 12px;
}

.student-avatar.size-md {
  width: 40px;
  height: 40px;
  font-size: 14px;
}

.student-avatar.size-lg {
  width: 56px;
  height: 56px;
  font-size: 18px;
}

.student-avatar.size-xl {
  width: 80px;
  height: 80px;
  font-size: 28px;
}

/* Photo */
.student-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Loading state */
.student-avatar.loading {
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
}

@keyframes shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}

/* Status indicator */
.student-avatar .status-indicator {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: 2px solid white;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
}

.student-avatar.size-sm .status-indicator {
  width: 8px;
  height: 8px;
  border-width: 1.5px;
}

.student-avatar.size-lg .status-indicator {
  width: 14px;
  height: 14px;
}

.student-avatar.size-xl .status-indicator {
  width: 18px;
  height: 18px;
  border-width: 3px;
}

.status-indicator.online {
  background-color: #28c76f;
}

.status-indicator.offline {
  background-color: #82868b;
}

.status-indicator.away {
  background-color: #ff9f43;
}

/* Badge (posição/conquista) */
.student-avatar .badge-overlay {
  position: absolute;
  top: -4px;
  right: -4px;
  background: #ff9f43;
  color: white;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  font-weight: 700;
  border: 2px solid white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.student-avatar.size-sm .badge-overlay {
  width: 16px;
  height: 16px;
  font-size: 8px;
  top: -2px;
  right: -2px;
}

.student-avatar.size-lg .badge-overlay {
  width: 24px;
  height: 24px;
  font-size: 12px;
  top: -6px;
  right: -6px;
}

.student-avatar.size-xl .badge-overlay {
  width: 32px;
  height: 32px;
  font-size: 14px;
  top: -8px;
  right: -8px;
}

/* Placeholder SVG para foto quebrada */
.student-avatar .avatar-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

/* Avatar Group */
.avatar-group {
  display: flex;
  align-items: center;
}

.avatar-group .student-avatar {
  margin-left: -8px;
  border: 2px solid white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.avatar-group .student-avatar:first-child {
  margin-left: 0;
}

.avatar-group .avatar-count {
  margin-left: 8px;
  color: #6e6b7b;
  font-weight: 600;
  font-size: 14px;
}

/* Avatar com nome */
.avatar-with-name {
  display: inline-flex;
  align-items: center;
  gap: 12px;
}

.avatar-with-name .student-name {
  font-weight: 500;
  color: #5e5873;
}

.avatar-with-name .student-info {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.avatar-with-name .student-subtitle {
  font-size: 12px;
  color: #b9b9c3;
}
`;

// SVG Placeholder para foto quebrada
const avatarPlaceholderSvg = `
<svg width="100%" height="100%" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <rect width="100" height="100" fill="url(#grad)" />
  <circle cx="50" cy="35" r="18" fill="white" opacity="0.9"/>
  <path d="M25 75 Q25 55 50 55 Q75 55 75 75 L75 90 L25 90 Z" fill="white" opacity="0.9"/>
  <defs>
    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#667eea;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#764ba2;stop-opacity:1" />
    </linearGradient>
  </defs>
</svg>
`;

// Helper: Gera iniciais do nome
const getInitials = (name) => {
  if (!name) return '?';
  const parts = name.trim().split(' ');
  if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
};

// Helper: Render Avatar
const renderAvatar = (args) => {
  const { src, name, size = 'md', status = 'none', badge } = args;
  const initials = getInitials(name);
  
  return `
<div class="student-avatar size-${size} ${args.loading ? 'loading' : ''}">
  ${src && !args.loading ? `<img src="${src}" alt="${name || 'Estudante'}" />` : ''}
  ${!src && !args.loading ? `<span>${initials}</span>` : ''}
  ${status !== 'none' ? `<span class="status-indicator ${status}"></span>` : ''}
  ${badge ? `<span class="badge-overlay">${badge}</span>` : ''}
</div>
  `;
};

// ========== STORIES ==========

export const Default = {
  args: {
    name: 'Maria Silva',
    size: 'md',
    status: 'none',
  },
  render: (args) => `
    <style>${componentStyles}</style>
    ${renderAvatar(args)}
  `,
};

export const WithPhoto = {
  render: () => `
    <style>${componentStyles}</style>
    <div style="display: flex; gap: 16px; align-items: center;">
      ${renderAvatar({ src: 'https://i.pravatar.cc/150?img=1', name: 'Ana Carolina', size: 'md' })}
      ${renderAvatar({ src: 'https://i.pravatar.cc/150?img=5', name: 'João Pedro', size: 'md' })}
      ${renderAvatar({ src: 'https://i.pravatar.cc/150?img=9', name: 'Beatriz Santos', size: 'md' })}
      ${renderAvatar({ src: 'https://i.pravatar.cc/150?img=12', name: 'Lucas Oliveira', size: 'md' })}
    </div>
  `,
};

export const WithInitials = {
  render: () => `
    <style>${componentStyles}</style>
    <div style="display: flex; gap: 16px; align-items: center;">
      ${renderAvatar({ name: 'Maria Silva', size: 'md' })}
      ${renderAvatar({ name: 'Pedro Henrique', size: 'md' })}
      ${renderAvatar({ name: 'Ana Carolina', size: 'md' })}
      ${renderAvatar({ name: 'João', size: 'md' })}
    </div>
  `,
};

export const AllSizes = {
  render: () => `
    <style>${componentStyles}</style>
    <div style="display: flex; gap: 24px; align-items: center;">
      <div style="text-align: center;">
        ${renderAvatar({ name: 'Maria Silva', size: 'sm' })}
        <p style="margin-top: 8px; font-size: 12px; color: #6e6b7b;">Small (32px)</p>
      </div>
      <div style="text-align: center;">
        ${renderAvatar({ name: 'Maria Silva', size: 'md' })}
        <p style="margin-top: 8px; font-size: 12px; color: #6e6b7b;">Medium (40px)</p>
      </div>
      <div style="text-align: center;">
        ${renderAvatar({ name: 'Maria Silva', size: 'lg' })}
        <p style="margin-top: 8px; font-size: 12px; color: #6e6b7b;">Large (56px)</p>
      </div>
      <div style="text-align: center;">
        ${renderAvatar({ name: 'Maria Silva', size: 'xl' })}
        <p style="margin-top: 8px; font-size: 12px; color: #6e6b7b;">Extra Large (80px)</p>
      </div>
    </div>
  `,
};

export const WithStatus = {
  render: () => `
    <style>${componentStyles}</style>
    <div style="display: flex; gap: 24px; align-items: center;">
      <div style="text-align: center;">
        ${renderAvatar({ src: 'https://i.pravatar.cc/150?img=1', name: 'Ana Online', size: 'md', status: 'online' })}
        <p style="margin-top: 8px; font-size: 12px; color: #6e6b7b;">Online</p>
      </div>
      <div style="text-align: center;">
        ${renderAvatar({ src: 'https://i.pravatar.cc/150?img=5', name: 'João Away', size: 'md', status: 'away' })}
        <p style="margin-top: 8px; font-size: 12px; color: #6e6b7b;">Ausente</p>
      </div>
      <div style="text-align: center;">
        ${renderAvatar({ src: 'https://i.pravatar.cc/150?img=9', name: 'Maria Offline', size: 'md', status: 'offline' })}
        <p style="margin-top: 8px; font-size: 12px; color: #6e6b7b;">Offline</p>
      </div>
    </div>
  `,
};

export const Loading = {
  render: () => `
    <style>${componentStyles}</style>
    <div style="display: flex; gap: 16px; align-items: center;">
      ${renderAvatar({ size: 'sm', loading: true })}
      ${renderAvatar({ size: 'md', loading: true })}
      ${renderAvatar({ size: 'lg', loading: true })}
      ${renderAvatar({ size: 'xl', loading: true })}
    </div>
  `,
};

export const Group = {
  render: () => `
    <style>${componentStyles}</style>
    <div class="avatar-group">
      ${renderAvatar({ src: 'https://i.pravatar.cc/150?img=1', name: 'Ana', size: 'md' })}
      ${renderAvatar({ src: 'https://i.pravatar.cc/150?img=5', name: 'João', size: 'md' })}
      ${renderAvatar({ src: 'https://i.pravatar.cc/150?img=9', name: 'Maria', size: 'md' })}
      ${renderAvatar({ src: 'https://i.pravatar.cc/150?img=12', name: 'Pedro', size: 'md' })}
      <span class="avatar-count">+12</span>
    </div>
  `,
};

export const WithBadge = {
  render: () => `
    <style>${componentStyles}</style>
    <div style="display: flex; gap: 24px; align-items: center;">
      <div style="text-align: center;">
        ${renderAvatar({ src: 'https://i.pravatar.cc/150?img=1', name: '1º Lugar', size: 'lg', badge: '1º' })}
        <p style="margin-top: 8px; font-size: 12px; color: #6e6b7b;">1º Lugar</p>
      </div>
      <div style="text-align: center;">
        ${renderAvatar({ src: 'https://i.pravatar.cc/150?img=5', name: '2º Lugar', size: 'lg', badge: '2º' })}
        <p style="margin-top: 8px; font-size: 12px; color: #6e6b7b;">2º Lugar</p>
      </div>
      <div style="text-align: center;">
        ${renderAvatar({ src: 'https://i.pravatar.cc/150?img=9', name: '3º Lugar', size: 'lg', badge: '3º' })}
        <p style="margin-top: 8px; font-size: 12px; color: #6e6b7b;">3º Lugar</p>
      </div>
      <div style="text-align: center;">
        ${renderAvatar({ name: 'Conquista', size: 'lg', badge: '🏆' })}
        <p style="margin-top: 8px; font-size: 12px; color: #6e6b7b;">Troféu</p>
      </div>
    </div>
  `,
};

export const ListaDeAlunos = {
  render: () => `
    <style>${componentStyles}</style>
    <div class="card" style="max-width: 500px;">
      <div class="card-header">
        <h5 class="mb-0">5º Ano A - Turma 2024</h5>
      </div>
      <div class="list-group list-group-flush">
        ${[
          { src: 'https://i.pravatar.cc/150?img=1', name: 'Ana Carolina Silva', status: 'online' },
          { src: 'https://i.pravatar.cc/150?img=5', name: 'Bruno Santos Oliveira', status: 'online' },
          { name: 'Carlos Eduardo Lima', status: 'away' },
          { src: 'https://i.pravatar.cc/150?img=9', name: 'Daniela Costa Santos', status: 'offline' },
          { name: 'Eduardo Alves Pereira', status: 'online' },
        ].map(student => `
          <div class="list-group-item">
            <div class="avatar-with-name">
              ${renderAvatar({ ...student, size: 'md' })}
              <span class="student-name">${student.name}</span>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `,
};

export const RankingProficiencia = {
  render: () => `
    <style>${componentStyles}</style>
    <div class="card" style="max-width: 600px;">
      <div class="card-header">
        <h5 class="mb-0">🏆 Ranking de Proficiência - Matemática</h5>
      </div>
      <div class="card-body p-0">
        <table class="table table-hover mb-0">
          <thead>
            <tr>
              <th style="width: 80px;">Posição</th>
              <th>Estudante</th>
              <th class="text-end">Pontos</th>
            </tr>
          </thead>
          <tbody>
            ${[
              { pos: '1º', src: 'https://i.pravatar.cc/150?img=1', name: 'Ana Carolina Silva', points: 985, badge: '🥇' },
              { pos: '2º', src: 'https://i.pravatar.cc/150?img=5', name: 'Bruno Santos', points: 972, badge: '🥈' },
              { pos: '3º', src: 'https://i.pravatar.cc/150?img=9', name: 'Camila Costa', points: 968, badge: '🥉' },
              { pos: '4º', name: 'Daniel Alves', points: 945 },
              { pos: '5º', src: 'https://i.pravatar.cc/150?img=12', name: 'Eduardo Lima', points: 932 },
            ].map(student => `
              <tr>
                <td class="text-center">${student.pos}</td>
                <td>
                  <div class="avatar-with-name">
                    ${renderAvatar({ ...student, size: 'md', badge: student.badge })}
                    <div class="student-info">
                      <span class="student-name">${student.name}</span>
                    </div>
                  </div>
                </td>
                <td class="text-end">
                  <span class="badge bg-primary">${student.points} pts</span>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `,
};
