/**
 * Kanban Board - Organism (Apps)
 * 
 * Source: packages/vuexy_theme/public/vuexy/css/pages/app-kanban.css
 * Priority: P2 (Nice-to-have)
 * Status: ✅ DONE
 * 
 * Quadro Kanban para gerenciamento de tarefas.
 */

import { formatHtmlSnippet } from '../../_helpers/snippets';

export default {
  title: 'Organisms/Apps/KanbanBoard',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
# Kanban Board

Quadro Kanban para visualização e gerenciamento de tarefas.

## Quando usar
- Gerenciamento de projetos
- Sprint planning
- Workflow visualization
- Task tracking
- Agile boards
- Pipeline management

## Características
- Múltiplas colunas (lanes)
- Cards arrastavéis
- Add new task
- Task details
- Labels/tags
- Assignees
- Due dates
- Progress indicators

## Colunas típicas
- Backlog
- To Do
- In Progress
- Review
- Done

## Card elements
- Title
- Description
- Labels
- Avatars
- Due date
- Attachments count
- Comments count

## Interações
- Drag and drop (requer JS)
- Add/edit/delete cards
- Filter por label
- Assign usuários
- Add comments

## Acessibilidade
- Keyboard navigation
- ARIA labels
- Focus management
- Screen reader support
        `
      }
    }
  },
  argTypes: {
    columns: {
      control: 'select',
      options: [3, 4, 5],
      description: 'Número de colunas',
      table: { defaultValue: { summary: 4 } }
    }
  }
};

const createKanbanBoard = ({ columns = 4 }) => {
  const lanes = [
    { title: 'Backlog', count: 3, color: 'secondary' },
    { title: 'To Do', count: 5, color: 'primary' },
    { title: 'In Progress', count: 4, color: 'info' },
    { title: 'Review', count: 2, color: 'warning' },
    { title: 'Done', count: 8, color: 'success' }
  ];
  
  const displayedLanes = lanes.slice(0, columns);
  
  return `<div class="kanban-board">
  <div class="d-flex gap-3 pb-3" style="overflow-x: auto;">
    ${displayedLanes.map((lane, laneIndex) => `
    <!-- ${lane.title} Column -->
    <div class="kanban-column">
      <div class="kanban-column-header">
        <div class="d-flex justify-content-between align-items-center mb-3">
          <div>
            <h6 class="mb-0">${lane.title}</h6>
            <span class="badge bg-label-${lane.color} rounded-pill">${lane.count} tasks</span>
          </div>
          <button class="btn btn-sm btn-icon btn-label-secondary">
            <i class="bx bx-plus"></i>
          </button>
        </div>
      </div>
      
      <div class="kanban-cards">
        ${laneIndex === 0 ? `
        <!-- Card 1 -->
        <div class="kanban-card">
          <div class="d-flex justify-content-between align-items-start mb-2">
            <span class="badge bg-label-danger">Bug</span>
            <div class="dropdown">
              <button class="btn btn-sm btn-icon" type="button" data-bs-toggle="dropdown">
                <i class="bx bx-dots-vertical-rounded"></i>
              </button>
              <ul class="dropdown-menu">
                <li><a class="dropdown-item" href="#">Edit</a></li>
                <li><a class="dropdown-item" href="#">Delete</a></li>
              </ul>
            </div>
          </div>
          <h6 class="mb-2">Fix login authentication</h6>
          <p class="text-muted small mb-3">Users unable to login with OAuth</p>
          <div class="d-flex justify-content-between align-items-center">
            <div class="d-flex gap-2">
              <span class="badge bg-light text-dark">
                <i class="bx bx-paperclip"></i> 3
              </span>
              <span class="badge bg-light text-dark">
                <i class="bx bx-message-square-dots"></i> 5
              </span>
            </div>
            <div class="avatar-group">
              <div class="avatar avatar-xs">
                <img src="https://demos.themeselection.com/materio-vuetify-vuejs-admin-template/demo-1/img/avatars/1.png" alt="Avatar" class="rounded-circle">
              </div>
            </div>
          </div>
        </div>
        
        <!-- Card 2 -->
        <div class="kanban-card">
          <div class="d-flex justify-content-between align-items-start mb-2">
            <span class="badge bg-label-info">Feature</span>
            <div class="dropdown">
              <button class="btn btn-sm btn-icon" type="button" data-bs-toggle="dropdown">
                <i class="bx bx-dots-vertical-rounded"></i>
              </button>
              <ul class="dropdown-menu">
                <li><a class="dropdown-item" href="#">Edit</a></li>
                <li><a class="dropdown-item" href="#">Delete</a></li>
              </ul>
            </div>
          </div>
          <h6 class="mb-2">Add dark mode</h6>
          <p class="text-muted small mb-3">Implement theme switcher</p>
          <div class="d-flex justify-content-between align-items-center">
            <small class="text-muted">
              <i class="bx bx-calendar"></i> Jan 30
            </small>
            <div class="avatar-group">
              <div class="avatar avatar-xs">
                <img src="https://demos.themeselection.com/materio-vuetify-vuejs-admin-template/demo-1/img/avatars/2.png" alt="Avatar" class="rounded-circle">
              </div>
              <div class="avatar avatar-xs">
                <img src="https://demos.themeselection.com/materio-vuetify-vuejs-admin-template/demo-1/img/avatars/3.png" alt="Avatar" class="rounded-circle">
              </div>
            </div>
          </div>
        </div>
        ` : ''}
        
        ${laneIndex === 1 ? `
        <!-- Card 1 -->
        <div class="kanban-card">
          <div class="d-flex justify-content-between align-items-start mb-2">
            <span class="badge bg-label-primary">Enhancement</span>
            <div class="dropdown">
              <button class="btn btn-sm btn-icon" type="button" data-bs-toggle="dropdown">
                <i class="bx bx-dots-vertical-rounded"></i>
              </button>
              <ul class="dropdown-menu">
                <li><a class="dropdown-item" href="#">Edit</a></li>
                <li><a class="dropdown-item" href="#">Delete</a></li>
              </ul>
            </div>
          </div>
          <h6 class="mb-2">Improve dashboard performance</h6>
          <div class="mb-3">
            <div class="d-flex justify-content-between mb-1">
              <small class="text-muted">Progress</small>
              <small class="text-muted">30%</small>
            </div>
            <div class="progress" style="height: 4px;">
              <div class="progress-bar" role="progressbar" style="width: 30%"></div>
            </div>
          </div>
          <div class="d-flex justify-content-between align-items-center">
            <div class="d-flex gap-2">
              <span class="badge bg-light text-dark">
                <i class="bx bx-check-square"></i> 3/10
              </span>
            </div>
            <div class="avatar-group">
              <div class="avatar avatar-xs">
                <img src="https://demos.themeselection.com/materio-vuetify-vuejs-admin-template/demo-1/img/avatars/4.png" alt="Avatar" class="rounded-circle">
              </div>
            </div>
          </div>
        </div>
        
        <!-- Card 2 -->
        <div class="kanban-card">
          <div class="d-flex justify-content-between align-items-start mb-2">
            <span class="badge bg-label-success">Documentation</span>
            <div class="dropdown">
              <button class="btn btn-sm btn-icon" type="button" data-bs-toggle="dropdown">
                <i class="bx bx-dots-vertical-rounded"></i>
              </button>
              <ul class="dropdown-menu">
                <li><a class="dropdown-item" href="#">Edit</a></li>
                <li><a class="dropdown-item" href="#">Delete</a></li>
              </ul>
            </div>
          </div>
          <h6 class="mb-2">Update API docs</h6>
          <p class="text-muted small mb-3">Add examples for new endpoints</p>
          <div class="d-flex justify-content-between align-items-center">
            <small class="text-muted">
              <i class="bx bx-calendar"></i> Feb 5
            </small>
            <div class="avatar-group">
              <div class="avatar avatar-xs">
                <img src="https://demos.themeselection.com/materio-vuetify-vuejs-admin-template/demo-1/img/avatars/5.png" alt="Avatar" class="rounded-circle">
              </div>
            </div>
          </div>
        </div>
        ` : ''}
        
        ${laneIndex === 2 ? `
        <!-- Card 1 -->
        <div class="kanban-card border-start border-3 border-info">
          <div class="d-flex justify-content-between align-items-start mb-2">
            <span class="badge bg-label-warning">In Progress</span>
            <div class="dropdown">
              <button class="btn btn-sm btn-icon" type="button" data-bs-toggle="dropdown">
                <i class="bx bx-dots-vertical-rounded"></i>
              </button>
              <ul class="dropdown-menu">
                <li><a class="dropdown-item" href="#">Edit</a></li>
                <li><a class="dropdown-item" href="#">Delete</a></li>
              </ul>
            </div>
          </div>
          <h6 class="mb-2">Redesign landing page</h6>
          <div class="mb-3">
            <div class="d-flex justify-content-between mb-1">
              <small class="text-muted">Progress</small>
              <small class="text-muted">65%</small>
            </div>
            <div class="progress" style="height: 4px;">
              <div class="progress-bar bg-info" role="progressbar" style="width: 65%"></div>
            </div>
          </div>
          <div class="d-flex justify-content-between align-items-center">
            <div class="d-flex gap-2">
              <span class="badge bg-light text-dark">
                <i class="bx bx-paperclip"></i> 8
              </span>
              <span class="badge bg-light text-dark">
                <i class="bx bx-message-square-dots"></i> 12
              </span>
            </div>
            <div class="avatar-group">
              <div class="avatar avatar-xs">
                <img src="https://demos.themeselection.com/materio-vuetify-vuejs-admin-template/demo-1/img/avatars/1.png" alt="Avatar" class="rounded-circle">
              </div>
              <div class="avatar avatar-xs">
                <img src="https://demos.themeselection.com/materio-vuetify-vuejs-admin-template/demo-1/img/avatars/2.png" alt="Avatar" class="rounded-circle">
              </div>
            </div>
          </div>
        </div>
        ` : ''}
        
        ${laneIndex === 3 ? `
        <!-- Card 1 -->
        <div class="kanban-card">
          <div class="d-flex justify-content-between align-items-start mb-2">
            <span class="badge bg-label-info">Feature</span>
            <div class="dropdown">
              <button class="btn btn-sm btn-icon" type="button" data-bs-toggle="dropdown">
                <i class="bx bx-dots-vertical-rounded"></i>
              </button>
              <ul class="dropdown-menu">
                <li><a class="dropdown-item" href="#">Edit</a></li>
                <li><a class="dropdown-item" href="#">Delete</a></li>
              </ul>
            </div>
          </div>
          <h6 class="mb-2">Email notifications</h6>
          <p class="text-muted small mb-3">Ready for testing</p>
          <div class="d-flex justify-content-between align-items-center">
            <small class="text-success">
              <i class="bx bx-check"></i> Ready
            </small>
            <div class="avatar-group">
              <div class="avatar avatar-xs">
                <img src="https://demos.themeselection.com/materio-vuetify-vuejs-admin-template/demo-1/img/avatars/3.png" alt="Avatar" class="rounded-circle">
              </div>
            </div>
          </div>
        </div>
        ` : ''}
        
        ${laneIndex === 4 ? `
        <!-- Card 1 -->
        <div class="kanban-card opacity-75">
          <div class="d-flex justify-content-between align-items-start mb-2">
            <span class="badge bg-label-success">Feature</span>
            <div class="dropdown">
              <button class="btn btn-sm btn-icon" type="button" data-bs-toggle="dropdown">
                <i class="bx bx-dots-vertical-rounded"></i>
              </button>
              <ul class="dropdown-menu">
                <li><a class="dropdown-item" href="#">Edit</a></li>
                <li><a class="dropdown-item" href="#">Delete</a></li>
              </ul>
            </div>
          </div>
          <h6 class="mb-2">User profile settings</h6>
          <p class="text-muted small mb-3">Completed and deployed</p>
          <div class="d-flex justify-content-between align-items-center">
            <small class="text-success">
              <i class="bx bx-check-circle"></i> Done
            </small>
            <div class="avatar-group">
              <div class="avatar avatar-xs">
                <img src="https://demos.themeselection.com/materio-vuetify-vuejs-admin-template/demo-1/img/avatars/4.png" alt="Avatar" class="rounded-circle">
              </div>
            </div>
          </div>
        </div>
        ` : ''}
        
        <!-- Add New Card Button -->
        <button class="btn btn-outline-secondary w-100 mt-3">
          <i class="bx bx-plus me-1"></i> Add Task
        </button>
      </div>
    </div>
    `).join('')}
  </div>
</div>

<style>
.kanban-board {
  padding: 1rem;
  background-color: #f8f9fa;
  min-height: 600px;
}

.kanban-column {
  min-width: 280px;
  max-width: 320px;
  background-color: #f0f2f8;
  border-radius: 0.375rem;
  padding: 1rem;
}

.kanban-column-header {
  margin-bottom: 1rem;
}

.kanban-cards {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.kanban-card {
  background-color: #fff;
  border-radius: 0.375rem;
  padding: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08);
  cursor: move;
  transition: all 0.3s;
}

.kanban-card:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.12);
  transform: translateY(-2px);
}

.avatar-group {
  display: flex;
  margin-left: -8px;
}

.avatar-group .avatar {
  margin-left: -8px;
  border: 2px solid #fff;
}

.avatar-xs {
  width: 28px;
  height: 28px;
}

@media (max-width: 768px) {
  .kanban-column {
    min-width: 260px;
  }
}
</style>`;
};

const Template = (args) => {
  const markup = createKanbanBoard(args);
  
  return `
    ${markup}
    
    <hr class="my-5" />
    
    <details>
      <summary><strong>Code Snippets</strong></summary>
      <div class="mt-3">
        <h6>HTML</h6>
        <pre><code>${formatHtmlSnippet(markup).replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
        
        <div class="alert alert-info mt-3">
          <strong>Drag & Drop:</strong> This component requires JavaScript library (e.g., jKanban, dragula) for drag-and-drop functionality.
        </div>
      </div>
    </details>
  `;
};

export const Overview = () => createKanbanBoard({ columns: 4 });

export const ThreeColumns = Template.bind({});
ThreeColumns.args = {
  columns: 3
};

export const FourColumns = Template.bind({});
FourColumns.args = {
  columns: 4
};

export const FiveColumns = Template.bind({});
FiveColumns.args = {
  columns: 5
};
