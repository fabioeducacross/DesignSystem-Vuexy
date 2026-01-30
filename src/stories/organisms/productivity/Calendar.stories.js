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
  title: 'Organisms/Productivity/Calendar',
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
    <div class="col-lg-3 col-md-4 app-calendar-sidebar border-end">
      <div class="p-4">
        <button class="btn btn-primary w-100 mb-4" data-bs-toggle="modal" data-bs-target="#addEventModal">
          <i class="bx bx-plus me-1"></i>
          Add Event
        </button>
        
        <h5 class="mb-3">Event Filters</h5>
        
        <div class="form-check mb-2">
          <input class="form-check-input" type="checkbox" id="selectAll" checked>
          <label class="form-check-label" for="selectAll">View All</label>
        </div>
        
        <hr class="my-3">
        
        <div class="form-check mb-2">
          <input class="form-check-input input-filter" type="checkbox" id="personal" checked>
          <label class="form-check-label d-flex align-items-center" for="personal">
            <span class="badge badge-dot bg-primary me-2"></span>
            Personal
          </label>
        </div>
        
        <div class="form-check mb-2">
          <input class="form-check-input input-filter" type="checkbox" id="business" checked>
          <label class="form-check-label d-flex align-items-center" for="business">
            <span class="badge badge-dot bg-success me-2"></span>
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
            <span class="badge badge-dot bg-danger me-2"></span>
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
              <h5 class="d-inline-block mb-0">December 2024</h5>
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
