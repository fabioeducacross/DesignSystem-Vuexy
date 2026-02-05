/**
 * BadgeList - Lista de Badges/Conquistas
 * ========================================
 * Lista de badges de conquistas educacionais,
 * usada em perfis de alunos e gamificação.
 * 
 * @component BadgeList
 * @usage Perfil de aluno, sistema de gamificação, conquistas
 */

export default {
  title: 'Front-office/BadgeList',
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['grid', 'list', 'compact'],
      description: 'Layout de exibição dos badges',
    },
    showProgress: {
      control: 'boolean',
      description: 'Se mostra barra de progresso de conquistas',
    },
    loading: {
      control: 'boolean',
      description: 'Estado de carregamento',
    },
  },
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Lista de badges/conquistas educacionais, mostrando progresso e realizações do estudante em diferentes áreas.',
      },
    },
  },
};

// Estilos Figma CSS
const componentStyles = `
/* Badge Item */
.badge-item {
  display: flex;
  align-items: center;
  padding: 16px;
  border-radius: 8px;
  background: white;
  border: 1px solid #ebe9f1;
  transition: all 0.2s;
  cursor: pointer;
  position: relative;
}

.badge-item:hover {
  border-color: #7367f0;
  box-shadow: 0 4px 12px rgba(115, 103, 240, 0.15);
  transform: translateY(-2px);
}

.badge-item.locked {
  opacity: 0.6;
  cursor: default;
  background: #f8f8f8;
}

.badge-item.locked:hover {
  border-color: #ebe9f1;
  box-shadow: none;
  transform: none;
}

/* Badge Icon */
.badge-icon {
  width: 56px;
  height: 56px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32px;
  flex-shrink: 0;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  position: relative;
}

.badge-item.locked .badge-icon {
  background: #e0e0e0;
  filter: grayscale(100%);
}

.badge-icon .lock-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.badge-icon .lock-overlay .material-symbols-outlined {
  font-size: 24px;
  color: white;
}

/* Badge Info */
.badge-info {
  flex: 1;
  margin-left: 16px;
  min-width: 0;
}

.badge-info h6 {
  margin: 0 0 4px 0;
  font-weight: 600;
  color: #5e5873;
  font-size: 14px;
}

.badge-item.locked .badge-info h6 {
  color: #b9b9c3;
}

.badge-info p {
  margin: 0;
  font-size: 13px;
  color: #b9b9c3;
}

.badge-info .badge-date {
  margin-top: 4px;
  font-size: 11px;
  color: #b9b9c3;
  display: flex;
  align-items: center;
  gap: 4px;
}

.badge-info .badge-date .material-symbols-outlined {
  font-size: 14px;
}

/* Badge Meta */
.badge-meta {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-left: 12px;
}

.badge-rarity {
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
}

.badge-rarity.common {
  background: rgba(130, 134, 139, 0.12);
  color: #82868b;
}

.badge-rarity.rare {
  background: rgba(0, 207, 232, 0.12);
  color: #00cfe8;
}

.badge-rarity.epic {
  background: rgba(115, 103, 240, 0.12);
  color: #7367f0;
}

.badge-rarity.legendary {
  background: linear-gradient(135deg, #ff9f43, #ff6b6b);
  color: white;
}

/* Layouts */
.badge-list-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 16px;
}

.badge-list-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.badge-list-compact .badge-item {
  padding: 12px;
}

.badge-list-compact .badge-icon {
  width: 40px;
  height: 40px;
  font-size: 24px;
}

.badge-list-compact .badge-info h6 {
  font-size: 13px;
}

.badge-list-compact .badge-info p {
  font-size: 12px;
}

/* Progress Section */
.badge-progress {
  background: white;
  border: 1px solid #ebe9f1;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 24px;
}

.badge-progress h5 {
  margin: 0 0 16px 0;
  font-weight: 600;
  color: #5e5873;
}

.progress-stats {
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
}

.progress-stats span {
  font-size: 14px;
  color: #6e6b7b;
}

.progress-stats .count {
  font-weight: 600;
  color: #7367f0;
}

.progress {
  height: 8px;
  border-radius: 4px;
  background: #ebe9f1;
}

.progress-bar {
  background: linear-gradient(90deg, #7367f0, #9e95f5);
  border-radius: 4px;
}

/* Empty State */
.badge-empty {
  text-align: center;
  padding: 60px 20px;
  background: white;
  border: 2px dashed #ebe9f1;
  border-radius: 8px;
}

.badge-empty .empty-icon {
  font-size: 64px;
  color: #b9b9c3;
  margin-bottom: 16px;
}

.badge-empty h5 {
  color: #5e5873;
  margin-bottom: 8px;
}

.badge-empty p {
  color: #b9b9c3;
  margin-bottom: 24px;
}

/* Loading skeleton */
.badge-skeleton {
  display: flex;
  align-items: center;
  padding: 16px;
  border-radius: 8px;
  background: white;
  border: 1px solid #ebe9f1;
}

.badge-skeleton .skeleton-icon {
  width: 56px;
  height: 56px;
  border-radius: 12px;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
}

.badge-skeleton .skeleton-content {
  flex: 1;
  margin-left: 16px;
}

.badge-skeleton .skeleton-line {
  height: 12px;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
  border-radius: 4px;
  margin-bottom: 8px;
}

.badge-skeleton .skeleton-line.short {
  width: 60%;
}

@keyframes shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}

/* Badge Categories */
.badge-categories {
  display: flex;
  gap: 8px;
  margin-bottom: 20px;
  flex-wrap: wrap;
}

.category-chip {
  padding: 6px 16px;
  border-radius: 20px;
  font-size: 13px;
  font-weight: 500;
  border: 1px solid #ebe9f1;
  background: white;
  cursor: pointer;
  transition: all 0.2s;
}

.category-chip:hover,
.category-chip.active {
  background: #7367f0;
  color: white;
  border-color: #7367f0;
}
`;

// Dados de conquistas educacionais
const badges = {
  unlocked: [
    {
      id: 1,
      icon: '📚',
      title: 'Leitor Expert',
      description: 'Completou 50 atividades de leitura',
      date: '15/01/2024',
      rarity: 'epic',
    },
    {
      id: 2,
      icon: '🧮',
      title: 'Matemático',
      description: 'Resolveu 100 problemas de matemática',
      date: '10/01/2024',
      rarity: 'rare',
    },
    {
      id: 3,
      icon: '⭐',
      title: 'Primeira Conquista',
      description: 'Completou sua primeira missão',
      date: '02/01/2024',
      rarity: 'common',
    },
    {
      id: 4,
      icon: '🎯',
      title: 'Focado',
      description: 'Estudou 7 dias seguidos',
      date: '20/01/2024',
      rarity: 'rare',
    },
    {
      id: 5,
      icon: '🏆',
      title: 'Campeão',
      description: 'Ficou em 1º no ranking da turma',
      date: '25/01/2024',
      rarity: 'legendary',
    },
  ],
  locked: [
    {
      id: 6,
      icon: '🌟',
      title: 'Mestre da Gramática',
      description: 'Complete 200 atividades de português',
      rarity: 'legendary',
    },
    {
      id: 7,
      icon: '🔥',
      title: 'Sequência de Fogo',
      description: 'Estude 30 dias consecutivos',
      rarity: 'epic',
    },
    {
      id: 8,
      icon: '💯',
      title: 'Perfeccionista',
      description: 'Acerte 10 missões com 100% de precisão',
      rarity: 'rare',
    },
  ],
};

// Helper: Render Badge Item
const renderBadge = (badge, locked = false) => `
<div class="badge-item ${locked ? 'locked' : ''}">
  <div class="badge-icon">
    ${badge.icon}
    ${locked ? `
      <div class="lock-overlay">
        <span class="material-symbols-outlined">lock</span>
      </div>
    ` : ''}
  </div>
  <div class="badge-info">
    <h6>${badge.title}</h6>
    <p>${badge.description}</p>
    ${!locked && badge.date ? `
      <div class="badge-date">
        <span class="material-symbols-outlined">calendar_today</span>
        ${badge.date}
      </div>
    ` : ''}
  </div>
  ${!locked ? `
    <div class="badge-meta">
      <span class="badge-rarity ${badge.rarity}">${badge.rarity}</span>
    </div>
  ` : ''}
</div>
`;

// Helper: Render Loading Skeleton
const renderSkeleton = () => `
<div class="badge-skeleton">
  <div class="skeleton-icon"></div>
  <div class="skeleton-content">
    <div class="skeleton-line"></div>
    <div class="skeleton-line short"></div>
  </div>
</div>
`;

// ========== STORIES ==========

export const Default = {
  render: () => `
    <style>${componentStyles}</style>
    <div class="badge-list-list" style="max-width: 600px;">
      ${badges.unlocked.map(badge => renderBadge(badge)).join('')}
    </div>
  `,
};

export const Empty = {
  render: () => `
    <style>${componentStyles}</style>
    <div class="badge-empty" style="max-width: 500px;">
      <div class="empty-icon">🏆</div>
      <h5>Nenhuma conquista ainda</h5>
      <p>Complete missões e atividades para ganhar badges e conquistas!</p>
      <button class="btn btn-primary">
        <span class="material-symbols-outlined" style="font-size: 16px;">rocket_launch</span>
        Começar Missão
      </button>
    </div>
  `,
};

export const Loading = {
  render: () => `
    <style>${componentStyles}</style>
    <div class="badge-list-list" style="max-width: 600px;">
      ${renderSkeleton()}
      ${renderSkeleton()}
      ${renderSkeleton()}
      ${renderSkeleton()}
    </div>
  `,
};

export const AllVariants = {
  render: () => `
    <style>${componentStyles}</style>
    
    <h6 class="mb-3">List Layout</h6>
    <div class="badge-list-list mb-5" style="max-width: 600px;">
      ${badges.unlocked.slice(0, 3).map(badge => renderBadge(badge)).join('')}
    </div>
    
    <h6 class="mb-3">Grid Layout</h6>
    <div class="badge-list-grid mb-5" style="max-width: 900px;">
      ${badges.unlocked.map(badge => renderBadge(badge)).join('')}
    </div>
    
    <h6 class="mb-3">Compact Layout</h6>
    <div class="badge-list-list badge-list-compact" style="max-width: 500px;">
      ${badges.unlocked.slice(0, 3).map(badge => renderBadge(badge)).join('')}
    </div>
  `,
};

export const Compact = {
  render: () => `
    <style>${componentStyles}</style>
    <div class="badge-list-list badge-list-compact" style="max-width: 500px;">
      ${badges.unlocked.map(badge => renderBadge(badge)).join('')}
    </div>
  `,
};

export const Overflow = {
  render: () => `
    <style>${componentStyles}</style>
    <div class="card" style="max-width: 600px;">
      <div class="card-header d-flex justify-content-between align-items-center">
        <h5 class="mb-0">Conquistas Recentes</h5>
        <a href="#" class="text-primary" style="font-size: 14px; text-decoration: none;">
          Ver todas →
        </a>
      </div>
      <div class="card-body" style="max-height: 400px; overflow-y: auto;">
        <div class="badge-list-list">
          ${badges.unlocked.map(badge => renderBadge(badge)).join('')}
          ${badges.unlocked.map(badge => renderBadge(badge)).join('')}
        </div>
      </div>
    </div>
  `,
};

export const ComProgresso = {
  render: () => `
    <style>${componentStyles}</style>
    <div style="max-width: 700px;">
      <div class="badge-progress">
        <h5>🏆 Suas Conquistas</h5>
        <div class="progress-stats">
          <span>Desbloqueadas</span>
          <span class="count">5 de 8 (62%)</span>
        </div>
        <div class="progress">
          <div class="progress-bar" role="progressbar" style="width: 62%"></div>
        </div>
      </div>
      
      <div class="badge-list-list">
        ${badges.unlocked.map(badge => renderBadge(badge)).join('')}
        ${badges.locked.map(badge => renderBadge(badge, true)).join('')}
      </div>
    </div>
  `,
};

export const PerfilDoAluno = {
  render: () => `
    <style>${componentStyles}</style>
    <div class="card" style="max-width: 800px;">
      <div class="card-header">
        <h5 class="mb-0">Perfil de Ana Carolina Silva</h5>
      </div>
      <div class="card-body">
        <!-- Estatísticas -->
        <div class="row mb-4">
          <div class="col-4 text-center">
            <h3 class="mb-0 text-primary">5</h3>
            <p class="text-muted mb-0" style="font-size: 13px;">Conquistas</p>
          </div>
          <div class="col-4 text-center">
            <h3 class="mb-0 text-success">985</h3>
            <p class="text-muted mb-0" style="font-size: 13px;">Pontos XP</p>
          </div>
          <div class="col-4 text-center">
            <h3 class="mb-0 text-info">12</h3>
            <p class="text-muted mb-0" style="font-size: 13px;">Dias Seguidos</p>
          </div>
        </div>
        
        <hr />
        
        <!-- Progresso -->
        <div class="badge-progress">
          <h5>🏆 Conquistas Desbloqueadas</h5>
          <div class="progress-stats">
            <span>Progresso</span>
            <span class="count">5 de 8 (62%)</span>
          </div>
          <div class="progress">
            <div class="progress-bar" role="progressbar" style="width: 62%"></div>
          </div>
        </div>
        
        <!-- Lista de Conquistas -->
        <div class="badge-list-grid">
          ${badges.unlocked.slice(0, 4).map(badge => renderBadge(badge)).join('')}
        </div>
        
        <div class="text-center mt-3">
          <button class="btn btn-outline-primary">Ver Todas as Conquistas</button>
        </div>
      </div>
    </div>
  `,
};

export const ComCategorias = {
  render: () => `
    <style>${componentStyles}</style>
    <div style="max-width: 800px;">
      <div class="badge-categories">
        <button class="category-chip active">Todas</button>
        <button class="category-chip">📚 Leitura</button>
        <button class="category-chip">🧮 Matemática</button>
        <button class="category-chip">🎯 Progresso</button>
        <button class="category-chip">🏆 Ranking</button>
      </div>
      
      <div class="badge-list-grid">
        ${badges.unlocked.map(badge => renderBadge(badge)).join('')}
      </div>
    </div>
  `,
};

export const Raridadesex = {
  render: () => `
    <style>${componentStyles}</style>
    <div class="badge-list-list" style="max-width: 600px;">
      ${renderBadge({ 
        icon: '⭐', 
        title: 'Comum', 
        description: 'Conquista comum - fácil de obter',
        date: '01/01/2024',
        rarity: 'common' 
      })}
      ${renderBadge({ 
        icon: '💎', 
        title: 'Rara', 
        description: 'Conquista rara - requer esforço',
        date: '05/01/2024',
        rarity: 'rare' 
      })}
      ${renderBadge({ 
        icon: '👑', 
        title: 'Épica', 
        description: 'Conquista épica - grande feito',
        date: '10/01/2024',
        rarity: 'epic' 
      })}
      ${renderBadge({ 
        icon: '🌟', 
        title: 'Lendária', 
        description: 'Conquista lendária - extremamente rara',
        date: '15/01/2024',
        rarity: 'legendary' 
      })}
    </div>
  `,
};

export const Bloqueadas = {
  render: () => `
    <style>${componentStyles}</style>
    <div style="max-width: 700px;">
      <h6 class="mb-3">Conquistas a Desbloquear</h6>
      <div class="badge-list-list">
        ${badges.locked.map(badge => renderBadge(badge, true)).join('')}
      </div>
      <p class="text-muted mt-3" style="font-size: 13px; text-align: center;">
        💡 Complete as tarefas para desbloquear essas conquistas
      </p>
    </div>
  `,
};
