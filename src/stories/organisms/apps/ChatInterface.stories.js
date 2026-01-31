/**
 * Chat Interface - Organism (Apps)
 * 
 * Source: packages/vuexy_theme/public/vuexy/css/pages/app-chat.css
 * Priority: P1 (Important)
 * Status: ✅ DONE
 * 
 * Interface completa de chat/mensagens.
 */

import { formatHtmlSnippet } from '../../_helpers/snippets';

export default {
  title: 'Organisms/Apps/ChatInterface',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
# Chat Interface

Interface completa de chat/mensagens em tempo real.

## Quando usar
- Aplicativos de mensagens
- Suporte ao cliente
- Chat em equipe
- Mensagens diretas
- Chat de comunidade
- Live chat

## Características
- Lista de conversas (sidebar)
- Área de mensagens
- Input de mensagem
- Indicadores de status (online/offline)
- Timestamp das mensagens
- Typing indicators
- Read receipts
- Anexar arquivos
- Emojis
- Busca de conversas

## Layout
- Sidebar: lista de chats
- Main area: mensagens
- Header: info do contato
- Footer: input de mensagem

## Elementos
- Contact list
- Message bubbles
- Avatar com status
- Timestamp
- Message input
- Attachment button
- Emoji picker
- Search bar

## Acessibilidade
- Navegação por teclado
- ARIA labels
- Focus management
- Screen reader support
        `
      }
    }
  },
  argTypes: {
    showSidebar: {
      control: 'boolean',
      description: 'Mostrar sidebar de conversas',
      table: { defaultValue: { summary: true } }
    }
  }
};

const createChatInterface = ({ showSidebar = true }) => {
  return `<div class="app-chat">
  <div class="row g-0">
    
    ${showSidebar ? `
    <!-- Chat Sidebar -->
    <div class="col-lg-4 col-xl-3 app-chat-sidebar border-end">
      <div class="d-flex flex-column h-100">
        <!-- Sidebar Header -->
        <div class="p-3 border-bottom">
          <div class="d-flex align-items-center mb-3">
            <div class="flex-shrink-0 position-relative me-3">
              <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40'%3E%3Ccircle cx='20' cy='20' r='20' fill='%23696cff'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial' font-size='14' fill='white' text-anchor='middle' dy='.35em'%3EJD%3C/text%3E%3C/svg%3E" 
                   alt="Avatar" 
                   class="rounded-circle"
                   style="width: 40px; height: 40px;">
              <span class="position-absolute bottom-0 end-0 badge rounded-pill bg-success p-1">
                <span class="visually-hidden">online</span>
              </span>
            </div>
            <div class="flex-grow-1">
              <h6 class="mb-0">John Doe</h6>
              <small class="text-muted">Available</small>
            </div>
          </div>
          
          <div class="input-group">
            <span class="input-group-text">
              <i class="bx bx-search"></i>
            </span>
            <input type="text" class="form-control" placeholder="Search conversations...">
          </div>
        </div>
        
        <!-- Chat List -->
        <div class="flex-grow-1 overflow-auto">
          <ul class="list-unstyled mb-0">
            <!-- Active Chat -->
            <li class="chat-contact-list-item active">
              <div class="d-flex align-items-start p-3">
                <div class="flex-shrink-0 position-relative me-3">
                  <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40'%3E%3Ccircle cx='20' cy='20' r='20' fill='%2356ca00'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial' font-size='14' fill='white' text-anchor='middle' dy='.35em'%3EJS%3C/text%3E%3C/svg%3E" 
                       alt="Avatar" 
                       class="rounded-circle"
                       style="width: 40px; height: 40px;">
                  <span class="position-absolute bottom-0 end-0 badge rounded-pill bg-success p-1"></span>
                </div>
                <div class="flex-grow-1 overflow-hidden">
                  <div class="d-flex justify-content-between align-items-center mb-1">
                    <h6 class="mb-0">Jane Smith</h6>
                    <small class="text-muted">10:30 AM</small>
                  </div>
                  <p class="text-muted text-truncate mb-0 small">
                    That sounds great! Let me check...
                  </p>
                </div>
                <span class="badge bg-primary rounded-pill ms-2">3</span>
              </div>
            </li>
            
            <!-- Other Chats -->
            <li class="chat-contact-list-item">
              <div class="d-flex align-items-start p-3">
                <div class="flex-shrink-0 position-relative me-3">
                  <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40'%3E%3Ccircle cx='20' cy='20' r='20' fill='%23ffb400'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial' font-size='14' fill='white' text-anchor='middle' dy='.35em'%3EMB%3C/text%3E%3C/svg%3E" 
                       alt="Avatar" 
                       class="rounded-circle"
                       style="width: 40px; height: 40px;">
                  <span class="position-absolute bottom-0 end-0 badge rounded-pill bg-secondary p-1"></span>
                </div>
                <div class="flex-grow-1 overflow-hidden">
                  <div class="d-flex justify-content-between align-items-center mb-1">
                    <h6 class="mb-0">Bob Johnson</h6>
                    <small class="text-muted">Yesterday</small>
                  </div>
                  <p class="text-muted text-truncate mb-0 small">
                    Thanks for the update!
                  </p>
                </div>
              </div>
            </li>
            
            <li class="chat-contact-list-item">
              <div class="d-flex align-items-start p-3">
                <div class="flex-shrink-0 position-relative me-3">
                  <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40'%3E%3Ccircle cx='20' cy='20' r='20' fill='%23ff4c51'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial' font-size='14' fill='white' text-anchor='middle' dy='.35em'%3ERP%3C/text%3E%3C/svg%3E" 
                       alt="Avatar" 
                       class="rounded-circle"
                       style="width: 40px; height: 40px;">
                  <span class="position-absolute bottom-0 end-0 badge rounded-pill bg-success p-1"></span>
                </div>
                <div class="flex-grow-1 overflow-hidden">
                  <div class="d-flex justify-content-between align-items-center mb-1">
                    <h6 class="mb-0">Alice Brown</h6>
                    <small class="text-muted">2 days ago</small>
                  </div>
                  <p class="text-muted text-truncate mb-0 small">
                    <i class="bx bx-check-double text-primary"></i> See you tomorrow!
                  </p>
                </div>
                <span class="badge bg-label-success rounded-pill ms-2">
                  <i class="bx bx-check"></i>
                </span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    ` : ''}
    
    <!-- Chat Area -->
    <div class="${showSidebar ? 'col-lg-8 col-xl-9' : 'col-12'} app-chat-area">
      <div class="d-flex flex-column h-100">
        <!-- Chat Header -->
        <div class="p-3 border-bottom">
          <div class="d-flex align-items-center">
            <div class="flex-shrink-0 position-relative me-3">
              <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40'%3E%3Ccircle cx='20' cy='20' r='20' fill='%2356ca00'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial' font-size='14' fill='white' text-anchor='middle' dy='.35em'%3EJS%3C/text%3E%3C/svg%3E" 
                   alt="Avatar" 
                   class="rounded-circle"
                   style="width: 40px; height: 40px;">
              <span class="position-absolute bottom-0 end-0 badge rounded-pill bg-success p-1"></span>
            </div>
            <div class="flex-grow-1">
              <h6 class="mb-0">Jane Smith</h6>
              <small class="text-success">
                <i class="bx bx-circle"></i> Online
              </small>
            </div>
            <div class="d-flex gap-2">
              <button class="btn btn-sm btn-icon btn-label-secondary">
                <i class="bx bx-phone"></i>
              </button>
              <button class="btn btn-sm btn-icon btn-label-secondary">
                <i class="bx bx-video"></i>
              </button>
              <button class="btn btn-sm btn-icon btn-label-secondary">
                <i class="bx bx-info-circle"></i>
              </button>
            </div>
          </div>
        </div>
        
        <!-- Chat Messages -->
        <div class="flex-grow-1 overflow-auto p-3" style="background-color: #f8f9fa;">
          <div class="chat-history">
            <!-- Date Divider -->
            <div class="text-center mb-4">
              <span class="badge bg-label-secondary">Today</span>
            </div>
            
            <!-- Received Message -->
            <div class="chat-message-received mb-3">
              <div class="d-flex align-items-start">
                <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40'%3E%3Ccircle cx='20' cy='20' r='20' fill='%2356ca00'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial' font-size='14' fill='white' text-anchor='middle' dy='.35em'%3EJS%3C/text%3E%3C/svg%3E" 
                     alt="Avatar" 
                     class="rounded-circle me-2"
                     style="width: 32px; height: 32px;">
                <div>
                  <div class="bg-white p-3 rounded shadow-sm" style="max-width: 400px;">
                    <p class="mb-0">Hi! How are you doing today?</p>
                  </div>
                  <small class="text-muted ms-2">10:28 AM</small>
                </div>
              </div>
            </div>
            
            <!-- Sent Message -->
            <div class="chat-message-sent mb-3">
              <div class="d-flex align-items-start justify-content-end">
                <div class="text-end">
                  <div class="bg-primary text-white p-3 rounded shadow-sm" style="max-width: 400px;">
                    <p class="mb-0">Hey! I'm doing great, thanks! Working on some new features.</p>
                  </div>
                  <small class="text-muted me-2">10:29 AM</small>
                </div>
                <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40'%3E%3Ccircle cx='20' cy='20' r='20' fill='%23696cff'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial' font-size='14' fill='white' text-anchor='middle' dy='.35em'%3EJD%3C/text%3E%3C/svg%3E" 
                     alt="Avatar" 
                     class="rounded-circle ms-2"
                     style="width: 32px; height: 32px;">
              </div>
            </div>
            
            <!-- Received Message -->
            <div class="chat-message-received mb-3">
              <div class="d-flex align-items-start">
                <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40'%3E%3Ccircle cx='20' cy='20' r='20' fill='%2356ca00'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial' font-size='14' fill='white' text-anchor='middle' dy='.35em'%3EJS%3C/text%3E%3C/svg%3E" 
                     alt="Avatar" 
                     class="rounded-circle me-2"
                     style="width: 32px; height: 32px;">
                <div>
                  <div class="bg-white p-3 rounded shadow-sm" style="max-width: 400px;">
                    <p class="mb-0">That sounds great! Let me check the design files and get back to you.</p>
                  </div>
                  <small class="text-muted ms-2">10:30 AM</small>
                </div>
              </div>
            </div>
            
            <!-- Typing Indicator -->
            <div class="chat-message-received">
              <div class="d-flex align-items-start">
                <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40'%3E%3Ccircle cx='20' cy='20' r='20' fill='%2356ca00'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial' font-size='14' fill='white' text-anchor='middle' dy='.35em'%3EJS%3C/text%3E%3C/svg%3E" 
                     alt="Avatar" 
                     class="rounded-circle me-2"
                     style="width: 32px; height: 32px;">
                <div>
                  <div class="bg-white p-3 rounded shadow-sm">
                    <div class="typing-indicator">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Message Input -->
        <div class="p-3 border-top">
          <form class="d-flex gap-2">
            <button type="button" class="btn btn-icon btn-label-secondary">
              <i class="bx bx-paperclip"></i>
            </button>
            <input type="text" 
                   class="form-control" 
                   placeholder="Type a message..."
                   value="Sure, I'll send them over in a moment">
            <button type="button" class="btn btn-icon btn-label-secondary">
              <i class="bx bx-smile"></i>
            </button>
            <button type="submit" class="btn btn-primary">
              <i class="bx bx-send"></i>
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</div>

<style>
.app-chat {
  height: 600px;
  border: 1px solid #d9dee3;
  border-radius: 0.375rem;
  overflow: hidden;
  background-color: #fff;
}

.app-chat-sidebar {
  background-color: #fff;
}

.chat-contact-list-item {
  cursor: pointer;
  transition: background-color 0.2s;
  border-bottom: 1px solid #f0f0f0;
}

.chat-contact-list-item:hover {
  background-color: #f8f9fa;
}

.chat-contact-list-item.active {
  background-color: rgba(105, 108, 255, 0.08);
  border-left: 3px solid #696cff;
}

.app-chat-area {
  background-color: #fff;
}

.typing-indicator {
  display: flex;
  gap: 4px;
}

.typing-indicator span {
  width: 8px;
  height: 8px;
  background-color: #697a8d;
  border-radius: 50%;
  animation: typing 1.4s infinite;
}

.typing-indicator span:nth-child(2) {
  animation-delay: 0.2s;
}

.typing-indicator span:nth-child(3) {
  animation-delay: 0.4s;
}

@keyframes typing {
  0%, 60%, 100% {
    transform: translateY(0);
  }
  30% {
    transform: translateY(-10px);
  }
}

.chat-history {
  min-height: 100%;
}
</style>`;
};

const Template = (args) => {
  const markup = createChatInterface(args);
  
  return `
    ${markup}
    
    <hr class="my-5" />
    
    <details>
      <summary><strong>Code Snippets</strong></summary>
      <div class="mt-3">
        <h6>HTML</h6>
        <pre><code>${formatHtmlSnippet(markup).replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
        
        <div class="alert alert-info mt-3">
          <strong>Real-time Chat:</strong> This component requires WebSocket or similar real-time technology for actual messaging functionality.
        </div>
      </div>
    </details>
  `;
};

export const Overview = () => createChatInterface({ showSidebar: true });

export const WithSidebar = Template.bind({});
WithSidebar.args = {
  showSidebar: true
};

export const ChatOnly = Template.bind({});
ChatOnly.args = {
  showSidebar: false
};

// Interactive Demo
export const Interactive = () => {
  const containerId = 'chat-interactive-' + Math.random().toString(36).substr(2, 9);
  
  return `
    <div id="${containerId}" style="max-width: 600px;">
      <div class="alert alert-info mb-4">
        <i class="bx bx-info-circle me-2"></i>
        <strong>Interactive Demo:</strong> Type a message and click send to see it appear in the chat.
      </div>
      
      <div class="card">
        <div class="card-header d-flex align-items-center">
          <div class="avatar avatar-sm me-3">
            <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40'%3E%3Ccircle cx='20' cy='20' r='20' fill='%23696cff'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial' font-size='14' fill='white' text-anchor='middle' dy='.35em'%3EJD%3C/text%3E%3C/svg%3E" alt="User" class="rounded-circle">
          </div>
          <div>
            <h6 class="mb-0">John Doe</h6>
            <small class="text-success">Online</small>
          </div>
        </div>
        <div class="card-body" id="chatMessages-${containerId}" style="height: 300px; overflow-y: auto;">
          <div class="mb-3">
            <div class="d-flex">
              <div class="avatar avatar-sm me-2">
                <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40'%3E%3Ccircle cx='20' cy='20' r='20' fill='%2356ca00'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial' font-size='14' fill='white' text-anchor='middle' dy='.35em'%3EJS%3C/text%3E%3C/svg%3E" alt="Me" class="rounded-circle">
              </div>
              <div class="flex-grow-1">
                <div class="bg-light p-2 rounded">
                  <p class="mb-0">Hello! How can I help you?</p>
                </div>
                <small class="text-muted">10:30 AM</small>
              </div>
            </div>
          </div>
        </div>
        <div class="card-footer">
          <div class="input-group">
            <input type="text" id="messageInput-${containerId}" class="form-control" placeholder="Type a message..." onkeypress="if(event.key === 'Enter') document.getElementById('sendBtn-${containerId}').click();">
            <button class="btn btn-primary" id="sendBtn-${containerId}" onclick="
              const input = document.getElementById('messageInput-${containerId}');
              const msg = input.value.trim();
              if (msg) {
                const chat = document.getElementById('chatMessages-${containerId}');
                const time = new Date().toLocaleTimeString('en-US', {hour: '2-digit', minute:'2-digit'});
                const html = '<div class=\'mb-3\'><div class=\'d-flex flex-row-reverse\'><div class=\'avatar avatar-sm ms-2\'><img src=\'data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40'%3E%3Ccircle cx='20' cy='20' r='20' fill='%2356ca00'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial' font-size='14' fill='white' text-anchor='middle' dy='.35em'%3EJS%3C/text%3E%3C/svg%3E\' class=\'rounded-circle\'></div><div class=\'flex-grow-1 text-end\'><div class=\'bg-primary text-white p-2 rounded d-inline-block\' style=\'max-width: 70%\'><p class=\'mb-0\'>' + msg + '</p></div><div><small class=\'text-muted\'>' + time + '</small></div></div></div></div>';
                chat.insertAdjacentHTML('beforeend', html);
                chat.scrollTop = chat.scrollHeight;
                input.value = '';
              }
            ">
              <i class="bx bx-send"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  `;
};
