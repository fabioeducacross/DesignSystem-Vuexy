/**
 * Calendar - Organism (Productivity)
 * 
 * Source: packages/vuexy_theme/public/vuexy/css/pages/app-calendar.css
 * Priority: P1 (Important)
 * Status: ✅ DONE
 * 
 * Interface de calendário para eventos e agendamentos.
 */

import { formatHtmlSnippet } from '../../_helpers/snippets';

export default {
  title: 'Vuexy/Organisms/Productivity/Calendar',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
# Calendar

Interface de calendário completa para gerenciamento de eventos.

## Quando usar
- Agendamento de eventos
- Gerenciamento de compromissos
- Visualização de disponibilidade
- Sistemas de reserva
- Dashboards com eventos
- Aplicações de produtividade

## Características
- Múltiplas visualizações (month, week, day)
- Criação/edição de eventos
- Categorias com cores
- Drag & drop de eventos
- Modal de detalhes
- Filtro por categoria
- Navegação entre datas
- Biblioteca: FullCalendar

## Funcionalidades
- Add/Edit/Delete eventos
- Eventos recorrentes
- All-day events
- Time-based events
- Event colors/categories
- Responsive design

## Componentes relacionados
- Modal para criação de evento
- Sidebar com filtros
- Toolbar de navegação

## Acessibilidade
- Navegação por teclado
- Screen reader support
- Focus visible
- Color + icon para categorias
        `
      }
    }
  },
  argTypes: {
    view: {
      control: 'select',
      options: ['month', 'week', 'day'],
      description: 'Visualização do calendário',
      table: { defaultValue: { summary: 'month' } }
    },
    withSidebar: {
      control: 'boolean',
      description: 'Incluir sidebar com filtros',
      table: { defaultValue: { summary: true } }
    }
  }
};

const createCalendar = ({ view = 'month', withSidebar = true }) => {
  return `<div class="app-calendar">
  <div class="row g-0">
    
    ${withSidebar ? `
    <!-- Sidebar -->
    <div class="col-lg-3 col-md-4 app-calendar-sidebar border-end bg-light">
      <div class="p-4">
        <!-- Add Event Button -->
        <button class="btn btn-primary w-100 mb-4" onclick="alert('Add Event - Use Modal component para funcionalidade real')">
          <i class="bx bx-plus me-1"></i>
          Add Event
        </button>
        
        <!-- Mini Calendar Navigation -->
        <div class="mini-calendar bg-white rounded border p-3 mb-4">
          <div class="d-flex justify-content-between align-items-center mb-2">
            <h6 class="mb-0">February 2026</h6>
            <div>
              <button class="btn btn-sm btn-link p-0 me-1"><i class="bx bx-chevron-left"></i></button>
              <button class="btn btn-sm btn-link p-0"><i class="bx bx-chevron-right"></i></button>
            </div>
          </div>
          <table class="table table-sm text-center mb-0">
            <thead>
              <tr>
                <th class="text-muted fw-normal p-1" style="font-size: 0.75rem;">Sun</th>
                <th class="text-muted fw-normal p-1" style="font-size: 0.75rem;">Mon</th>
                <th class="text-muted fw-normal p-1" style="font-size: 0.75rem;">Tue</th>
                <th class="text-muted fw-normal p-1" style="font-size: 0.75rem;">Wed</th>
                <th class="text-muted fw-normal p-1" style="font-size: 0.75rem;">Thu</th>
                <th class="text-muted fw-normal p-1" style="font-size: 0.75rem;">Fri</th>
                <th class="text-muted fw-normal p-1" style="font-size: 0.75rem;">Sat</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="p-1"><span class="text-muted" style="font-size: 0.75rem; line-height: 1.5;">26</span></td>
                <td class="p-1"><span class="text-muted" style="font-size: 0.75rem; line-height: 1.5;">27</span></td>
                <td class="p-1"><span class="text-muted" style="font-size: 0.75rem; line-height: 1.5;">28</span></td>
                <td class="p-1"><span class="text-muted" style="font-size: 0.75rem; line-height: 1.5;">29</span></td>
                <td class="p-1"><span class="text-muted" style="font-size: 0.75rem; line-height: 1.5;">30</span></td>
                <td class="p-1"><span class="text-muted" style="font-size: 0.75rem; line-height: 1.5;">31</span></td>
                <td class="p-1"><span style="font-size: 0.75rem; line-height: 1.5;">1</span></td>
              </tr>
              <tr>
                <td class="p-1"><span style="font-size: 0.75rem; line-height: 1.5;">2</span></td>
                <td class="p-1"><span style="font-size: 0.75rem; line-height: 1.5;">3</span></td>
                <td class="p-1"><span style="font-size: 0.75rem; line-height: 1.5;">4</span></td>
                <td class="p-1"><span style="font-size: 0.75rem; line-height: 1.5;">5</span></td>
                <td class="p-1"><span style="font-size: 0.75rem; line-height: 1.5;">6</span></td>
                <td class="p-1"><span style="font-size: 0.75rem; line-height: 1.5;">7</span></td>
                <td class="p-1"><span style="font-size: 0.75rem; line-height: 1.5;">8</span></td>
              </tr>
              <tr>
                <td class="p-1"><span style="font-size: 0.75rem; line-height: 1.5;">9</span></td>
                <td class="p-1"><span style="font-size: 0.75rem; line-height: 1.5;">10</span></td>
                <td class="p-1"><span class="bg-primary text-white rounded-circle d-inline-block" style="font-size: 0.75rem; line-height: 1.5; width: 24px; height: 24px; line-height: 24px;">11</span></td>
                <td class="p-1"><span style="font-size: 0.75rem; line-height: 1.5;">12</span></td>
                <td class="p-1"><span style="font-size: 0.75rem; line-height: 1.5;">13</span></td>
                <td class="p-1"><span style="font-size: 0.75rem; line-height: 1.5;">14</span></td>
                <td class="p-1"><span style="font-size: 0.75rem; line-height: 1.5;">15</span></td>
              </tr>
              <tr>
                <td class="p-1"><span style="font-size: 0.75rem; line-height: 1.5;">16</span></td>
                <td class="p-1"><span style="font-size: 0.75rem; line-height: 1.5;">17</span></td>
                <td class="p-1"><span style="font-size: 0.75rem; line-height: 1.5;">18</span></td>
                <td class="p-1"><span style="font-size: 0.75rem; line-height: 1.5;">19</span></td>
                <td class="p-1"><span style="font-size: 0.75rem; line-height: 1.5;">20</span></td>
                <td class="p-1"><span style="font-size: 0.75rem; line-height: 1.5;">21</span></td>
                <td class="p-1"><span style="font-size: 0.75rem; line-height: 1.5;">22</span></td>
              </tr>
              <tr>
                <td class="p-1"><span style="font-size: 0.75rem; line-height: 1.5;">23</span></td>
                <td class="p-1"><span style="font-size: 0.75rem; line-height: 1.5;">24</span></td>
                <td class="p-1"><span style="font-size: 0.75rem; line-height: 1.5;">25</span></td>
                <td class="p-1"><span style="font-size: 0.75rem; line-height: 1.5;">26</span></td>
                <td class="p-1"><span style="font-size: 0.75rem; line-height: 1.5;">27</span></td>
                <td class="p-1"><span style="font-size: 0.75rem; line-height: 1.5;">28</span></td>
                <td class="p-1"><span class="text-muted" style="font-size: 0.75rem; line-height: 1.5;">1</span></td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <!-- Event Filters -->
        <h6 class="mb-3">Event Filters</h6>
        
        <div class="form-check mb-3">
          <input class="form-check-input" type="checkbox" id="selectAll" checked>
          <label class="form-check-label fw-medium" for="selectAll">View All</label>
        </div>
        
        <!-- Filter Categories -->
        <div class="form-check mb-2">
          <input class="form-check-input input-filter" type="checkbox" id="personal" checked>
          <label class="form-check-label d-flex align-items-center" for="personal">
            <span class="badge badge-dot bg-danger me-2"></span>
            Personal
          </label>
        </div>
        
        <div class="form-check mb-2">
          <input class="form-check-input input-filter" type="checkbox" id="business" checked>
          <label class="form-check-label d-flex align-items-center" for="business">
            <span class="badge badge-dot bg-primary me-2"></span>
            Business
          </label>
        </div>
        
        <div class="form-check mb-2">
          <input class="form-check-input input-filter" type="checkbox" id="family" checked>
          <label class="form-check-label d-flex align-items-center" for="family">
            <span class="badge badge-dot bg-warning me-2"></span>
            Family
          </label>
        </div>
        
        <div class="form-check mb-2">
          <input class="form-check-input input-filter" type="checkbox" id="holiday" checked>
          <label class="form-check-label d-flex align-items-center" for="holiday">
            <span class="badge badge-dot bg-success me-2"></span>
            Holiday
          </label>
        </div>
        
        <div class="form-check mb-2">
          <input class="form-check-input input-filter" type="checkbox" id="etc" checked>
          <label class="form-check-label d-flex align-items-center" for="etc">
            <span class="badge badge-dot bg-info me-2"></span>
            ETC
          </label>
        </div>
      </div>
    </div>
    ` : ''}
    
    <!-- Calendar Area -->
    <div class="${withSidebar ? 'col-lg-9 col-md-8' : 'col-12'}">
      <div class="card">
        <div class="card-body">
          <!-- Calendar Toolbar -->
          <div class="d-flex justify-content-between align-items-center mb-4">
            <div>
              <button class="btn btn-sm btn-outline-secondary me-2">
                <i class="bx bx-chevron-left"></i>
              </button>
              <button class="btn btn-sm btn-outline-secondary me-3">
                <i class="bx bx-chevron-right"></i>
              </button>
              <button class="btn btn-sm btn-label-secondary me-3">Today</button>
              <h5 class="d-inline-block mb-0">February 2026</h5>
            </div>
            <div class="btn-group" role="group">
              <button type="button" class="btn btn-sm ${view === 'month' ? 'btn-primary' : 'btn-outline-primary'}">Month</button>
              <button type="button" class="btn btn-sm ${view === 'week' ? 'btn-primary' : 'btn-outline-primary'}">Week</button>
              <button type="button" class="btn btn-sm ${view === 'day' ? 'btn-primary' : 'btn-outline-primary'}">Day</button>
            </div>
          </div>
          
          <!-- Calendar Grid (Month View) -->
          <div class="calendar-grid">
            <!-- Days Header -->
            <div class="d-flex border-bottom">
              <div class="calendar-day-header flex-fill text-center p-2 fw-semibold">Sun</div>
              <div class="calendar-day-header flex-fill text-center p-2 fw-semibold">Mon</div>
              <div class="calendar-day-header flex-fill text-center p-2 fw-semibold">Tue</div>
              <div class="calendar-day-header flex-fill text-center p-2 fw-semibold">Wed</div>
              <div class="calendar-day-header flex-fill text-center p-2 fw-semibold">Thu</div>
              <div class="calendar-day-header flex-fill text-center p-2 fw-semibold">Fri</div>
              <div class="calendar-day-header flex-fill text-center p-2 fw-semibold">Sat</div>
            </div>
            
            <!-- Sample Week -->
            <div class="d-flex">
              <div class="calendar-day flex-fill p-2 border-end border-bottom" style="min-height: 120px;">
                <div class="text-muted small">1</div>
                <div class="calendar-event bg-primary-subtle p-1 mb-1 small rounded cursor-pointer">
                  <strong>Team Meeting</strong>
                  <div class="text-muted">10:00 AM</div>
                </div>
              </div>
              <div class="calendar-day flex-fill p-2 border-end border-bottom" style="min-height: 120px;">
                <div class="text-muted small">2</div>
              </div>
              <div class="calendar-day flex-fill p-2 border-end border-bottom" style="min-height: 120px;">
                <div class="text-muted small">3</div>
                <div class="calendar-event bg-success-subtle p-1 mb-1 small rounded cursor-pointer">
                  <strong>Client Call</strong>
                  <div class="text-muted">2:00 PM</div>
                </div>
              </div>
              <div class="calendar-day flex-fill p-2 border-end border-bottom" style="min-height: 120px;">
                <div class="text-muted small">4</div>
              </div>
              <div class="calendar-day flex-fill p-2 border-end border-bottom" style="min-height: 120px;">
                <div class="text-muted small">5</div>
                <div class="calendar-event bg-warning-subtle p-1 mb-1 small rounded cursor-pointer">
                  <strong>Family Dinner</strong>
                  <div class="text-muted">7:00 PM</div>
                </div>
              </div>
              <div class="calendar-day flex-fill p-2 border-end border-bottom" style="min-height: 120px;">
                <div class="text-muted small">6</div>
              </div>
              <div class="calendar-day flex-fill p-2 border-end border-bottom" style="min-height: 120px;">
                <div class="text-muted small">7</div>
                <div class="calendar-event bg-danger-subtle p-1 mb-1 small rounded cursor-pointer">
                  <strong>Christmas</strong>
                  <div class="text-muted">All Day</div>
                </div>
              </div>
            </div>
            
            <!-- More weeks... (simplified for demo) -->
            <div class="text-center p-5 text-muted">
              <i class="bx bx-calendar bx-lg mb-2"></i>
              <p>More weeks would appear here in full calendar</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<!-- Add Event Modal (simplified) -->
<div class="modal fade" id="addEventModal" tabindex="-1" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Add Event</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
      </div>
      <div class="modal-body">
        <form>
          <div class="mb-3">
            <label class="form-label">Title</label>
            <input type="text" class="form-control" placeholder="Event title">
          </div>
          <div class="mb-3">
            <label class="form-label">Calendar</label>
            <select class="form-select">
              <option>Personal</option>
              <option>Business</option>
              <option>Family</option>
              <option>Holiday</option>
              <option>ETC</option>
            </select>
          </div>
          <div class="row">
            <div class="col-md-6 mb-3">
              <label class="form-label">Start Date</label>
              <input type="date" class="form-control">
            </div>
            <div class="col-md-6 mb-3">
              <label class="form-label">End Date</label>
              <input type="date" class="form-control">
            </div>
          </div>
          <div class="mb-3">
            <div class="form-check">
              <input class="form-check-input" type="checkbox" id="allDay">
              <label class="form-check-label" for="allDay">All Day</label>
            </div>
          </div>
        </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-label-secondary" data-bs-dismiss="modal">Cancel</button>
        <button type="button" class="btn btn-primary">Add Event</button>
      </div>
    </div>
  </div>
</div>

<style>
.app-calendar {
  background-color: #fff;
}

.app-calendar-sidebar {
  background-color: #f8f9fa;
  min-height: 600px;
}

.calendar-event {
  cursor: pointer;
  transition: all 0.2s;
}

.calendar-event:hover {
  transform: translateY(-2px);
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.badge-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  display: inline-block;
}

.calendar-day {
  position: relative;
}

.calendar-day:hover {
  background-color: #f8f9fa;
}
</style>`;
};

const Template = (args) => {
  const markup = createCalendar(args);
  
  return `
    ${markup}
    
    <hr class="my-5" />
    
    <details>
      <summary><strong>Code Snippets</strong></summary>
      <div class="mt-3">
        <h6>HTML</h6>
        <pre><code>${formatHtmlSnippet(markup).replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
        
        <div class="alert alert-warning mt-3">
          <strong>FullCalendar Required:</strong>
          <pre class="mb-0"><code>// Include FullCalendar library
&lt;link rel="stylesheet" href="path/to/fullcalendar.min.css"&gt;
&lt;script src="path/to/fullcalendar.min.js"&gt;&lt;/script&gt;

// Initialize
var calendar = new FullCalendar.Calendar(element, {
  initialView: 'dayGridMonth',
  events: [...],
  // ...options
});</code></pre>
        </div>
      </div>
    </details>
  `;
};

export const Overview = () => createCalendar({ view: 'month', withSidebar: true });

export const WithSidebar = Template.bind({});
WithSidebar.args = {
  view: 'month',
  withSidebar: true
};

export const NoSidebar = Template.bind({});
NoSidebar.args = {
  view: 'month',
  withSidebar: false
};

export const WeekView = Template.bind({});
WeekView.args = {
  view: 'week',
  withSidebar: true
};

export const DayView = Template.bind({});
DayView.args = {
  view: 'day',
  withSidebar: true
};

/**
 * ====================================
 * INTERACTIVE STORY - FullCalendar Real
 * ====================================
 */

export const Interactive = {
  parameters: {
    docs: {
      description: {
        story: `
### Calendar com FullCalendar Real

Implementação oficial usando FullCalendar do Vuexy:

- ✅ **Month View** - visualização mensal completa
- ✅ **Week View** - visualização semanal com horas
- ✅ **Day View** - visualização diária detalhada
- ✅ **List View** - lista de eventos  
- ✅ **Drag & Drop** - arraste eventos entre datas
- ✅ **Resize Events** - redimensione duração
- ✅ **Add/Edit/Delete** - gerencie eventos
- ✅ **Categories** - cores por categoria
- ✅ **All-day Events** - eventos de dia inteiro

**Casos de uso:**
- Sistema de agendamento
- Calendário de eventos
- Dashboard de compromissos
- Reserva de recursos
- Planejamento de projetos

### Como testar:
1. Navegue entre views (Month/Week/Day/List)
2. Clique em uma data vazia para criar evento
3. Clique em um evento para ver detalhes
4. Arraste eventos entre datas
5. Redimensione eventos (nas bordas)
        `
      }
    }
  },
  loaders: [
    async () => {
      if (typeof window !== 'undefined') {
        // Load CSS
        if (!document.querySelector('link[href*="fullcalendar.css"]')) {
          return new Promise((resolve, reject) => {
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = '/vuexy/vendors/libs/fullcalendar/fullcalendar.css';
            link.onload = () => {
              // Load JS after CSS
              if (!window.FullCalendar) {
                const script = document.createElement('script');
                script.src = '/vuexy/vendors/libs/fullcalendar/fullcalendar.js';
                script.onload = () => {
                  console.log('✅ FullCalendar CSS + JS carregados');
                  resolve({ fullcalendarLoaded: true });
                };
                script.onerror = () => reject(new Error('Failed to load FullCalendar JS'));
                document.head.appendChild(script);
              } else {
                resolve({ fullcalendarLoaded: true });
              }
            };
            link.onerror = () => reject(new Error('Failed to load FullCalendar CSS'));
            document.head.appendChild(link);
          });
        }
        return { fullcalendarLoaded: true };
      }
      return {};
    }
  ],
  render: () => {
    // Initialize FullCalendar after render
    setTimeout(() => {
      if (window.FullCalendar) {
        const calendarEl = document.getElementById('fullcalendar-interactive');
        
        // Sample events (matching Vuexy demo - February 2026)
        const events = [
          {
            id: '1',
            title: 'Design Review',
            start: '2026-02-11T11:55:00',
            end: '2026-02-11T13:00:00',
            backgroundColor: '#7367f0',
            borderColor: '#7367f0',
            extendedProps: { category: 'Business' }
          },
          {
            id: '2',
            title: 'Team Meeting',
            start: '2026-02-13T09:00:00',
            end: '2026-02-13T10:30:00',
            backgroundColor: '#7367f0',
            borderColor: '#7367f0',
            extendedProps: { category: 'Business' }
          },
          {
            id: '3',
            title: 'Client Call',
            start: '2026-02-17T14:00:00',
            end: '2026-02-17T15:30:00',
            backgroundColor: '#28c76f',
            borderColor: '#28c76f',
            extendedProps: { category: 'Business' }
          },
          {
            id: '4',
            title: 'Family Trip',
            start: '2026-02-19',
            allDay: true,
            backgroundColor: '#ff9f43',
            borderColor: '#ff9f43',
            extendedProps: { category: 'Family' }
          },
          {
            id: '5',
            title: 'Doctor Appointment',
            start: '2026-02-24T10:00:00',
            end: '2026-02-24T11:00:00',
            backgroundColor: '#ea5455',
            borderColor: '#ea5455',
            extendedProps: { category: 'Personal' }
          },
          {
            id: '6',
            title: 'Workshop',
            start: '2026-02-26T15:00:00',
            end: '2026-02-26T17:00:00',
            backgroundColor: '#00cfe8',
            borderColor: '#00cfe8',
            extendedProps: { category: 'ETC' }
          },
          {
            id: '7',
            title: 'Holiday Event',
            start: '2026-02-28',
            allDay: true,
            backgroundColor: '#28c76f',
            borderColor: '#28c76f',
            extendedProps: { category: 'Holiday' }
          }
        ];

        const calendar = new FullCalendar.Calendar(calendarEl, {
          initialView: 'dayGridMonth',
          initialDate: '2026-02-11', // February 2026
          locale: 'pt-br',
          headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
          },
          buttonText: {
            today: 'Hoje',
            month: 'Mês',
            week: 'Semana',
            day: 'Dia',
            list: 'Lista'
          },
          editable: true,
          droppable: true,
          eventResizableFromStart: true,
          dayMaxEvents: true,
          navLinks: true,
          height: 'auto',
          events: events,
          
          // Event click - show details
          eventClick: function(info) {
            const event = info.event;
            const modal = document.getElementById('event-modal');
            const modalTitle = document.getElementById('modal-event-title');
            const modalCategory = document.getElementById('modal-event-category');
            const modalTime = document.getElementById('modal-event-time');
            const deleteBtn = document.getElementById('modal-delete-btn');
            
            modalTitle.textContent = event.title;
            modalCategory.textContent = event.extendedProps.category || 'Sem categoria';
            
            if (event.allDay) {
              modalTime.textContent = 'Dia inteiro';
            } else {
              const start = event.start.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
              const end = event.end ? event.end.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }) : '';
              modalTime.textContent = end ? (start + ' - ' + end) : start;
            }
            
            deleteBtn.onclick = () => {
              if (confirm('Deseja excluir este evento?')) {
                event.remove();
                modal.style.display = 'none';
              }
            };
            
            modal.style.display = 'block';
          },
          
          // Date click - create new event
          dateClick: function(info) {
            const title = prompt('Título do evento:');
            if (title) {
              const colors = ['#7367f0', '#28c76f', '#ea5455', '#ff9f43', '#00cfe8'];
              const randomColor = colors[Math.floor(Math.random() * colors.length)];
              
              calendar.addEvent({
                title: title,
                start: info.date,
                allDay: info.allDay,
                backgroundColor: randomColor,
                borderColor: randomColor
              });
            }
          },
          
          // Event drag/resize
          eventDrop: function(info) {
            console.log('Evento movido:', info.event.title);
          },
          
          eventResize: function(info) {
            console.log('Evento redimensionado:', info.event.title);
          }
        });

        calendar.render();
        
        // Modal close handlers
        document.getElementById('modal-close-btn').onclick = () => {
          document.getElementById('event-modal').style.display = 'none';
        };
        
        document.getElementById('event-modal').onclick = (e) => {
          if (e.target.id === 'event-modal') {
            document.getElementById('event-modal').style.display = 'none';
          }
        };
        
        console.log('✅ FullCalendar inicializado com', events.length, 'eventos');
      }
    }, 100);

    return `
      <style>
        #fullcalendar-interactive {
          max-width: 1200px;
          margin: 0 auto;
        }
        .fc {
          font-size: 14px;
        }
        .fc-event {
          cursor: pointer;
        }
        #event-modal {
          display: none;
          position: fixed;
          z-index: 9999;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0,0,0,0.4);
        }
        #event-modal-content {
          background-color: #fff;
          margin: 10% auto;
          padding: 0;
          border-radius: 8px;
          width: 90%;
          max-width: 500px;
          box-shadow: 0 4px 24px 0 rgba(34,41,47,0.1);
        }
      </style>
      
      <div style="padding: 30px;">
        <div class="row mb-4">
          <div class="col-12">
            <div class="d-flex justify-content-between align-items-center">
              <h5 class="mb-0">
                <i class="ti tabler-calendar-event me-2 text-primary"></i>
                Calendar Interativo com FullCalendar
              </h5>
              <div class="d-flex gap-2">
                <span class="badge bg-label-primary">
                  <i class="ti tabler-circle-filled me-1" style="font-size: 8px;"></i>
                  Reunião
                </span>
                <span class="badge bg-label-success">
                  <i class="ti tabler-circle-filled me-1" style="font-size: 8px;"></i>
                  Cliente
                </span>
                <span class="badge bg-label-danger">
                  <i class="ti tabler-circle-filled me-1" style="font-size: 8px;"></i>
                  Importante
                </span>
                <span class="badge bg-label-warning">
                  <i class="ti tabler-circle-filled me-1" style="font-size: 8px;"></i>
                  Dev
                </span>
                <span class="badge bg-label-info">
                  <i class="ti tabler-circle-filled me-1" style="font-size: 8px;"></i>
                  Treinamento
                </span>
              </div>
            </div>
          </div>
        </div>
        
        <div class="card">
          <div class="card-body">
            <div id="fullcalendar-interactive"></div>
          </div>
        </div>
        
        <div class="alert alert-info mt-4">
          <strong>💡 Teste a interatividade:</strong>
          <ul class="mb-0 mt-2">
            <li><strong>Views:</strong> Alterne entre Mês, Semana, Dia, Lista usando os botões</li>
            <li><strong>Navegação:</strong> Use setas ← → para navegar entre períodos, "Hoje" para voltar</li>
            <li><strong>Criar Evento:</strong> Clique em uma data vazia (aparecerá prompt)</li>
            <li><strong>Ver Detalhes:</strong> Clique em um evento existente (abre modal)</li>
            <li><strong>Drag & Drop:</strong> Arraste eventos para outras datas/horas</li>
            <li><strong>Redimensionar:</strong> Nas views Week/Day, arraste as bordas superior/inferior do evento</li>
            <li><strong>Excluir:</strong> Clique no evento → botão "Excluir Evento"</li>
            <li><strong>All-day vs Timed:</strong> Eventos no topo (ex: Workshop) são dia inteiro, com hora ficam no grid</li>
            <li><strong>Cores:</strong> Cada categoria tem cor diferente para fácil identificação</li>
            <li><strong>Responsive:</strong> Funciona em mobile com touch (arraste com dedo)</li>
          </ul>
        </div>
        
        <div class="row g-3 mt-2">
          <div class="col-md-4">
            <div class="card border-primary">
              <div class="card-body">
                <h6 class="text-primary mb-2">
                  <i class="ti tabler-click me-1"></i>
                  Interações
                </h6>
                <ul class="list-unstyled small mb-0">
                  <li>• Click em data: criar evento</li>
                  <li>• Click em evento: detalhes</li>
                  <li>• Drag: mover evento</li>
                  <li>• Resize: alterar duração</li>
                </ul>
              </div>
            </div>
          </div>
          <div class="col-md-4">
            <div class="card border-success">
              <div class="card-body">
                <h6 class="text-success mb-2">
                  <i class="ti tabler-layout me-1"></i>
                  Views Disponíveis
                </h6>
                <ul class="list-unstyled small mb-0">
                  <li>• Month: visão mensal</li>
                  <li>• Week: semana com horas</li>
                  <li>• Day: dia detalhado</li>
                  <li>• List: lista de eventos</li>
                </ul>
              </div>
            </div>
          </div>
          <div class="col-md-4">
            <div class="card border-info">
              <div class="card-body">
                <h6 class="text-info mb-2">
                  <i class="ti tabler-palette me-1"></i>
                  Categorias
                </h6>
                <ul class="list-unstyled small mb-0">
                  <li>• 🔵 Reunião</li>
                  <li>• 🟢 Cliente</li>
                  <li>• 🔴 Importante</li>
                  <li>• 🟠 Desenvolvimento</li>
                  <li>• 🔵 Treinamento</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Event Details Modal -->
      <div id="event-modal">
        <div id="event-modal-content">
          <div class="card mb-0">
            <div class="card-header d-flex justify-content-between align-items-center">
              <h5 class="mb-0">Detalhes do Evento</h5>
              <button type="button" class="btn-close" id="modal-close-btn"></button>
            </div>
            <div class="card-body">
              <h6 id="modal-event-title" class="mb-3"></h6>
              <div class="mb-2">
                <small class="text-muted">Categoria:</small>
                <span id="modal-event-category" class="badge bg-label-primary ms-2"></span>
              </div>
              <div class="mb-3">
                <small class="text-muted">Horário:</small>
                <span id="modal-event-time" class="ms-2"></span>
              </div>
              <div class="d-flex gap-2">
                <button class="btn btn-sm btn-outline-primary" id="modal-close-btn-footer">Fechar</button>
                <button class="btn btn-sm btn-danger" id="modal-delete-btn">Excluir Evento</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }
};

// Footer close button
setTimeout(() => {
  const footerCloseBtn = document.getElementById('modal-close-btn-footer');
  if (footerCloseBtn) {
    footerCloseBtn.onclick = () => {
      document.getElementById('event-modal').style.display = 'none';
    };
  }
}, 150);
