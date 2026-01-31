/**
 * Email List - Organism (Apps)
 * 
 * Source: packages/vuexy_theme/public/vuexy/css/pages/app-email.css
 * Priority: P2 (Nice-to-have)
 * Status: ✅ DONE
 * 
 * Interface completa de listagem de emails.
 */

import { formatHtmlSnippet } from '../../_helpers/snippets';

export default {
  title: 'Organisms/Apps/EmailList',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
# Email List

Interface de email inbox/listagem de mensagens.

## Quando usar
- Cliente de email
- Inbox management
- Message viewing
- Email organization
- Support tickets

## Características
- Lista de emails
- Sidebar com pastas
- Email preview
- Filtros (All/Read/Unread)
- Bulk actions
- Search
- Labels/tags
- Star/favorite

## Elementos incluídos
- Sidebar com pastas (Inbox, Sent, Draft, Spam, Trash)
- Lista de emails com:
  - Checkbox para seleção
  - Avatar do remetente
  - Nome e assunto
  - Preview do corpo
  - Timestamp
  - Star/favorite icon
  - Labels coloridos
  - Attachment indicator
- Toolbar com ações (Delete, Archive, Mark as read)
- Pagination

## Folders
- Inbox (principal)
- Sent (enviados)
- Draft (rascunhos)
- Spam (lixo eletrônico)
- Trash (lixeira)

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
    selectedFolder: {
      control: 'select',
      options: ['inbox', 'sent', 'draft', 'spam', 'trash'],
      description: 'Pasta selecionada',
      table: { defaultValue: { summary: 'inbox' } }
    }
  }
};

const createEmailList = ({ selectedFolder = 'inbox' }) => {
  const folders = [
    { id: 'inbox', icon: 'bx-envelope', label: 'Inbox', count: 24 },
    { id: 'sent', icon: 'bx-send', label: 'Sent', count: 0 },
    { id: 'draft', icon: 'bx-edit', label: 'Draft', count: 3 },
    { id: 'spam', icon: 'bx-error-circle', label: 'Spam', count: 8 },
    { id: 'trash', icon: 'bx-trash', label: 'Trash', count: 0 }
  ];
  
  return `<div class="email-app">
  <div class="row g-0">
    <!-- Sidebar -->
    <div class="col-lg-3 col-xl-2 email-sidebar border-end">
      <div class="p-3">
        <button class="btn btn-primary w-100 mb-4">
          <i class="bx bx-plus me-1"></i> Compose
        </button>
        
        <ul class="list-unstyled mb-0">
          ${folders.map(folder => `
          <li class="mb-1">
            <a href="#" class="d-flex align-items-center text-decoration-none p-2 rounded ${selectedFolder === folder.id ? 'active' : ''}">
              <i class="bx ${folder.icon} me-2"></i>
              <span class="flex-grow-1">${folder.label}</span>
              ${folder.count > 0 ? `<span class="badge bg-label-primary rounded-pill">${folder.count}</span>` : ''}
            </a>
          </li>
          `).join('')}
        </ul>
        
        <hr class="my-3">
        
        <h6 class="text-muted text-uppercase small mb-3">Labels</h6>
        <ul class="list-unstyled mb-0">
          <li class="mb-1">
            <a href="#" class="d-flex align-items-center text-decoration-none p-2 rounded">
              <span class="badge bg-danger me-2" style="width: 8px; height: 8px; padding: 0;"></span>
              <span>Personal</span>
            </a>
          </li>
          <li class="mb-1">
            <a href="#" class="d-flex align-items-center text-decoration-none p-2 rounded">
              <span class="badge bg-primary me-2" style="width: 8px; height: 8px; padding: 0;"></span>
              <span>Work</span>
            </a>
          </li>
          <li class="mb-1">
            <a href="#" class="d-flex align-items-center text-decoration-none p-2 rounded">
              <span class="badge bg-success me-2" style="width: 8px; height: 8px; padding: 0;"></span>
              <span>Important</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
    
    <!-- Email List -->
    <div class="col-lg-9 col-xl-10 email-list-area">
      <!-- Toolbar -->
      <div class="email-toolbar p-3 border-bottom">
        <div class="d-flex align-items-center gap-2">
          <div class="form-check">
            <input class="form-check-input" type="checkbox" id="selectAll">
          </div>
          
          <button class="btn btn-sm btn-icon btn-label-secondary" title="Delete">
            <i class="bx bx-trash"></i>
          </button>
          <button class="btn btn-sm btn-icon btn-label-secondary" title="Archive">
            <i class="bx bx-archive"></i>
          </button>
          <button class="btn btn-sm btn-icon btn-label-secondary" title="Mark as read">
            <i class="bx bx-envelope-open"></i>
          </button>
          
          <div class="ms-auto d-flex gap-2">
            <div class="input-group" style="width: 250px;">
              <input type="text" class="form-control form-control-sm" placeholder="Search emails...">
              <button class="btn btn-sm btn-label-secondary" type="button">
                <i class="bx bx-search"></i>
              </button>
            </div>
            
            <div class="btn-group" role="group">
              <button type="button" class="btn btn-sm btn-label-secondary" title="Previous">
                <i class="bx bx-chevron-left"></i>
              </button>
              <button type="button" class="btn btn-sm btn-label-secondary" title="Next">
                <i class="bx bx-chevron-right"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Email Items -->
      <div class="email-items">
        <!-- Email 1 - Unread -->
        <div class="email-item unread">
          <div class="d-flex align-items-center p-3">
            <div class="form-check me-3">
              <input class="form-check-input" type="checkbox">
            </div>
            
            <button class="btn btn-sm btn-icon me-3 star-btn">
              <i class="bx bx-star"></i>
            </button>
            
            <img src="https://demos.themeselection.com/materio-vuetify-vuejs-admin-template/demo-1/img/avatars/1.png" 
                 alt="Avatar" 
                 class="rounded-circle me-3"
                 style="width: 40px; height: 40px;">
            
            <div class="flex-grow-1 overflow-hidden">
              <div class="d-flex align-items-center mb-1">
                <h6 class="mb-0 me-2">Sarah Johnson</h6>
                <span class="badge bg-danger me-2">Personal</span>
                ${selectedFolder === 'inbox' ? '<i class="bx bx-paperclip text-muted"></i>' : ''}
              </div>
              <div class="email-subject mb-1">Project Update - Q1 Review Meeting</div>
              <p class="email-preview text-muted mb-0">
                Hi team, I wanted to give you a quick update on the Q1 project progress...
              </p>
            </div>
            
            <div class="text-end" style="min-width: 100px;">
              <small class="text-muted">10:30 AM</small>
            </div>
          </div>
        </div>
        
        <!-- Email 2 - Read with Star -->
        <div class="email-item">
          <div class="d-flex align-items-center p-3">
            <div class="form-check me-3">
              <input class="form-check-input" type="checkbox">
            </div>
            
            <button class="btn btn-sm btn-icon me-3 star-btn starred">
              <i class="bx bxs-star text-warning"></i>
            </button>
            
            <img src="https://demos.themeselection.com/materio-vuetify-vuejs-admin-template/demo-1/img/avatars/2.png" 
                 alt="Avatar" 
                 class="rounded-circle me-3"
                 style="width: 40px; height: 40px;">
            
            <div class="flex-grow-1 overflow-hidden">
              <div class="d-flex align-items-center mb-1">
                <h6 class="mb-0 me-2">Mike Wilson</h6>
                <span class="badge bg-primary me-2">Work</span>
              </div>
              <div class="email-subject mb-1">Re: Design System Documentation</div>
              <p class="email-preview text-muted mb-0">
                Thanks for sending the documentation. I've reviewed it and have some feedback...
              </p>
            </div>
            
            <div class="text-end" style="min-width: 100px;">
              <small class="text-muted">Yesterday</small>
            </div>
          </div>
        </div>
        
        <!-- Email 3 - Read -->
        <div class="email-item">
          <div class="d-flex align-items-center p-3">
            <div class="form-check me-3">
              <input class="form-check-input" type="checkbox">
            </div>
            
            <button class="btn btn-sm btn-icon me-3 star-btn">
              <i class="bx bx-star"></i>
            </button>
            
            <img src="https://demos.themeselection.com/materio-vuetify-vuejs-admin-template/demo-1/img/avatars/3.png" 
                 alt="Avatar" 
                 class="rounded-circle me-3"
                 style="width: 40px; height: 40px;">
            
            <div class="flex-grow-1 overflow-hidden">
              <div class="d-flex align-items-center mb-1">
                <h6 class="mb-0 me-2">Emily Chen</h6>
                <span class="badge bg-success me-2">Important</span>
                <i class="bx bx-paperclip text-muted"></i>
              </div>
              <div class="email-subject mb-1">Budget Approval Required</div>
              <p class="email-preview text-muted mb-0">
                Please review and approve the Q2 budget proposal attached to this email...
              </p>
            </div>
            
            <div class="text-end" style="min-width: 100px;">
              <small class="text-muted">Jan 28</small>
            </div>
          </div>
        </div>
        
        <!-- Email 4 - Read -->
        <div class="email-item">
          <div class="d-flex align-items-center p-3">
            <div class="form-check me-3">
              <input class="form-check-input" type="checkbox">
            </div>
            
            <button class="btn btn-sm btn-icon me-3 star-btn">
              <i class="bx bx-star"></i>
            </button>
            
            <img src="https://demos.themeselection.com/materio-vuetify-vuejs-admin-template/demo-1/img/avatars/4.png" 
                 alt="Avatar" 
                 class="rounded-circle me-3"
                 style="width: 40px; height: 40px;">
            
            <div class="flex-grow-1 overflow-hidden">
              <div class="d-flex align-items-center mb-1">
                <h6 class="mb-0 me-2">David Lee</h6>
              </div>
              <div class="email-subject mb-1">Weekly Team Sync Notes</div>
              <p class="email-preview text-muted mb-0">
                Here are the notes from today's team sync meeting. Action items for next week...
              </p>
            </div>
            
            <div class="text-end" style="min-width: 100px;">
              <small class="text-muted">Jan 27</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<style>
.email-app {
  height: 700px;
  border: 1px solid #d9dee3;
  border-radius: 0.375rem;
  overflow: hidden;
  background-color: #fff;
}

.email-sidebar {
  background-color: #fff;
  height: 700px;
  overflow-y: auto;
}

.email-sidebar a {
  color: #697a8d;
  transition: all 0.2s;
}

.email-sidebar a:hover {
  background-color: #f8f9fa;
}

.email-sidebar a.active {
  background-color: rgba(105, 108, 255, 0.08);
  color: #696cff;
  font-weight: 600;
}

.email-list-area {
  background-color: #fff;
  height: 700px;
  display: flex;
  flex-direction: column;
}

.email-toolbar {
  flex-shrink: 0;
}

.email-items {
  flex-grow: 1;
  overflow-y: auto;
}

.email-item {
  border-bottom: 1px solid #f0f0f0;
  transition: background-color 0.2s;
  cursor: pointer;
}

.email-item:hover {
  background-color: #f8f9fa;
}

.email-item.unread {
  background-color: rgba(105, 108, 255, 0.04);
}

.email-item.unread h6 {
  font-weight: 700;
}

.email-item.unread .email-subject {
  font-weight: 600;
}

.email-subject {
  font-size: 0.9375rem;
  color: #566a7f;
}

.email-preview {
  font-size: 0.875rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.star-btn {
  border: none;
  background: transparent;
  padding: 0.25rem;
  color: #a5acb8;
}

.star-btn:hover {
  color: #ffc107;
}

.star-btn.starred {
  color: #ffc107;
}

@media (max-width: 992px) {
  .email-sidebar {
    border-bottom: 1px solid #d9dee3;
    border-right: none;
    height: auto;
    max-height: 300px;
  }
  
  .email-app {
    height: auto;
  }
  
  .email-list-area {
    height: 500px;
  }
}
</style>`;
};

const Template = (args) => {
  const markup = createEmailList(args);
  
  return `
    ${markup}
    
    <hr class="my-5" />
    
    <details>
      <summary><strong>Code Snippets</strong></summary>
      <div class="mt-3">
        <h6>HTML</h6>
        <pre><code>${formatHtmlSnippet(markup).replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
      </div>
    </details>
  `;
};

export const Overview = () => createEmailList({ selectedFolder: 'inbox' });

export const Inbox = Template.bind({});
Inbox.args = {
  selectedFolder: 'inbox'
};

export const Sent = Template.bind({});
Sent.args = {
  selectedFolder: 'sent'
};

export const Draft = Template.bind({});
Draft.args = {
  selectedFolder: 'draft'
};

// Interactive Demo
export const Interactive = () => {
  const containerId = 'email-interactive-' + Math.random().toString(36).substr(2, 9);
  
  return `
    <div id="${containerId}" style="max-width: 800px;">
      <div class="alert alert-info mb-4">
        <i class="bx bx-info-circle me-2"></i>
        <strong>Interactive Demo:</strong> Click on emails to mark as read/unread.
      </div>
      
      <div class="card">
        <div class="card-header">
          <h5 class="mb-0">Inbox (3)</h5>
        </div>
        <div class="list-group list-group-flush">
          <a href="javascript:void(0)" class="list-group-item list-group-item-action" onclick="this.classList.toggle('bg-light'); this.querySelector('.badge').classList.toggle('d-none');">
            <div class="d-flex align-items-center">
              <span class="badge bg-primary me-2">New</span>
              <div class="flex-grow-1">
                <div class="d-flex justify-content-between">
                  <h6 class="mb-1">Project Update</h6>
                  <small class="text-muted">5 mins ago</small>
                </div>
                <p class="mb-0 text-muted">The new features are ready for review...</p>
              </div>
            </div>
          </a>
          <a href="javascript:void(0)" class="list-group-item list-group-item-action" onclick="this.classList.toggle('bg-light'); this.querySelector('.badge').classList.toggle('d-none');">
            <div class="d-flex align-items-center">
              <span class="badge bg-primary me-2">New</span>
              <div class="flex-grow-1">
                <div class="d-flex justify-content-between">
                  <h6 class="mb-1">Meeting Reminder</h6>
                  <small class="text-muted">1 hour ago</small>
                </div>
                <p class="mb-0 text-muted">Don't forget the team meeting at 3 PM...</p>
              </div>
            </div>
          </a>
          <a href="javascript:void(0)" class="list-group-item list-group-item-action bg-light" onclick="this.classList.toggle('bg-light'); this.querySelector('.badge').classList.toggle('d-none');">
            <div class="d-flex align-items-center">
              <span class="badge bg-primary me-2 d-none">New</span>
              <div class="flex-grow-1">
                <div class="d-flex justify-content-between">
                  <h6 class="mb-1">Weekly Report</h6>
                  <small class="text-muted">Yesterday</small>
                </div>
                <p class="mb-0 text-muted">Here's your weekly summary...</p>
              </div>
            </div>
          </a>
        </div>
      </div>
    </div>
  `;
};
