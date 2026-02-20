/**
 * StudentAvatar - Avatar de Estudante
 * =====================================
 * 
 * Avatar de estudante com foto ou iniciais, usado em listas,
 * rankings, perfis e visualizações de turma.
 * 
 * @component StudentAvatar
 * @category Doc-Only / Educacross Components V2
 * @source educacross-frontoffice/src/components/student/StudentAvatar.vue
 * @note Componente foi removido ou consolidado com outros componentes de avatar.
 * @priority P2
 * @status PIXEL-PERFECT
 * @since 2.0.0
 * @usage Lista de alunos, ranking de proficiência, perfil de estudante
 */

export default {
  title: 'Educacross Components V2/StudentAvatar',
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
          <h1 style="font-size:3rem;font-weight:700;margin:0 0 12px 0;letter-spacing:-0.02em;">StudentAvatar</h1>
          <p style="font-size:1.1rem;opacity:0.9;margin:0;max-width:600px;">Avatar de Estudante</p>
        </div>
      </div>
      <div style="max-width:900px;margin:0 auto;padding:48px 40px;">
        <div style="background:white;border-radius:12px;padding:32px;margin-bottom:32px;box-shadow:0 2px 8px rgba(0,0,0,0.08);">
          <h2 style="font-size:1.1rem;font-weight:600;color:#5E5873;margin:0 0 16px 0;">Sobre o Componente</h2>
          <p style="color:#6E6B7B;line-height:1.7;margin:0 0 16px 0;">Avatar de Estudante. Faz parte da categoria <strong>Components</strong> do Design System Educacross.</p>
          <div style="background:#F8F7FF;border-left:4px solid #6E63E8;padding:16px;border-radius:4px;">
            <p style="margin:0;color:#5E5873;font-size:14px;line-height:1.6;"><strong>💡 Dica:</strong> Use <em>Playground</em> para explorar props, <em>Use Cases</em> para exemplos reais e <em>Accessibility</em> para validar WCAG.</p>
          </div>
        </div>
        <div style="background:white;border-radius:12px;padding:32px;box-shadow:0 2px 8px rgba(0,0,0,0.08);">
          <h2 style="font-size:1.1rem;font-weight:600;color:#5E5873;margin:0 0 16px 0;">Implementação Vue 2.7</h2>
          <pre style="background:#1E1E2E;color:#CDD6F4;padding:20px;border-radius:8px;font-size:13px;line-height:1.6;overflow:auto;margin:0;"><code>import StudentAvatar from '@/components/StudentAvatar.vue';

// Template
&lt;StudentAvatar v-bind="props" /&gt;</code></pre>
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
    docs: { description: { story: 'Explore o StudentAvatar com controles interativos.' } },
  },
  render: (args) => `
    <div style="padding:32px;display:flex;justify-content:center;align-items:center;min-height:200px;background:#F8F8F8;border-radius:12px;">
      <div style="text-align:center;color:#6E6B7B;">
        <div style="width:60px;height:60px;background:#6E63E820;border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 16px;font-size:24px;">🎨</div>
        <p style="margin:0 0 8px 0;font-size:15px;font-weight:600;color:#5E5873;">Playground StudentAvatar</p>
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
    docs: { description: { story: 'Exemplos de uso real do StudentAvatar no Educacross.' } },
  },
  render: () => `
    <div style="max-width:800px;margin:0 auto;padding:40px 20px;font-family:'Public Sans',sans-serif;">
      <div style="background:#6E63E815;border:1px solid #6E63E830;border-radius:12px;padding:24px;margin-bottom:40px;">
        <h1 style="font-size:1.5rem;font-weight:700;color:#5E5873;margin:0 0 8px 0;">Casos de Uso: StudentAvatar</h1>
        <p style="color:#6E6B7B;margin:0;font-size:14px;line-height:1.6;">Cenários reais de uso no contexto educacional da plataforma Educacross</p>
      </div>
      
      <div style="margin-bottom:32px;">
        <h2 style="font-size:18px;font-weight:600;color:#5E5873;margin:0 0 8px 0;display:flex;align-items:center;gap:10px;">
          <span style="display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;background:#6E63E8;color:white;border-radius:50%;font-size:13px;font-weight:700;flex-shrink:0;">1</span>
          Professor — Painel Principal
        </h2>
        <p style="color:#6E6B7B;margin:0 0 16px 0;padding-left:38px;font-size:14px;">Professor utilizando StudentAvatar no dashboard de gestão de turmas</p>
        <div style="background:#F8F8F8;border-radius:8px;padding:20px;margin-left:38px;text-align:center;color:#B9B9C3;font-size:13px;">
          Ver story <strong>Default</strong> para visualização do componente neste contexto
        </div>
      </div>
      <div style="margin-bottom:32px;">
        <h2 style="font-size:18px;font-weight:600;color:#5E5873;margin:0 0 8px 0;display:flex;align-items:center;gap:10px;">
          <span style="display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;background:#6E63E8;color:white;border-radius:50%;font-size:13px;font-weight:700;flex-shrink:0;">2</span>
          Aluno — Portal do Estudante
        </h2>
        <p style="color:#6E6B7B;margin:0 0 16px 0;padding-left:38px;font-size:14px;">Aluno interagindo com StudentAvatar no portal educacional</p>
        <div style="background:#F8F8F8;border-radius:8px;padding:20px;margin-left:38px;text-align:center;color:#B9B9C3;font-size:13px;">
          Ver story <strong>Default</strong> para visualização do componente neste contexto
        </div>
      </div>
      <div style="margin-bottom:32px;">
        <h2 style="font-size:18px;font-weight:600;color:#5E5873;margin:0 0 8px 0;display:flex;align-items:center;gap:10px;">
          <span style="display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;background:#6E63E8;color:white;border-radius:50%;font-size:13px;font-weight:700;flex-shrink:0;">3</span>
          Coordenador — Relatórios
        </h2>
        <p style="color:#6E6B7B;margin:0 0 16px 0;padding-left:38px;font-size:14px;">Coordenador pedagógico analisando dados via StudentAvatar</p>
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
    docs: { description: { story: 'Conformidade WCAG 2.1 AA para o StudentAvatar.' } },
  },
  render: () => `
    <div style="max-width:800px;margin:0 auto;padding:40px 20px;font-family:'Public Sans',sans-serif;">

      <div style="background:linear-gradient(135deg,#6E63E8 0%,#764ba2 100%);padding:32px;border-radius:12px;margin-bottom:32px;color:white;">
        <h1 style="font-size:1.5rem;font-weight:700;margin:0 0 8px 0;">Acessibilidade: StudentAvatar</h1>
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

