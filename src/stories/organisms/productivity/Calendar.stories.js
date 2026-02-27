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
        const loadCss = (href) => new Promise((resolve, reject) => {
          if (document.querySelector(`link[href="${href}"]`)) return resolve();
          const link = document.createElement('link');
          link.rel = 'stylesheet';
          link.href = href;
          link.onload = resolve;
          link.onerror = () => reject(new Error(`Failed to load CSS: ${href}`));
          document.head.appendChild(link);
        });

        const loadScript = (src, check) => new Promise((resolve, reject) => {
          if (check()) return resolve();
          const script = document.createElement('script');
          script.src = src;
          script.onload = resolve;
          script.onerror = () => reject(new Error(`Failed to load JS: ${src}`));
          document.head.appendChild(script);
        });

        await loadCss('/vuexy/vendors/libs/fullcalendar/fullcalendar.css');
        await loadCss('/vuexy/vendors/libs/select2/select2.css');
        await loadCss('/vuexy/vendors/libs/flatpickr/flatpickr.css');
        await loadCss('/vuexy/vendors/libs/@form-validation/form-validation.css');

        await loadScript('/vuexy/vendors/libs/jquery/jquery.js', () => window.jQuery);
        await loadScript('/vuexy/vendors/libs/select2/select2.js', () => window.jQuery?.fn?.select2);
        await loadScript('/vuexy/vendors/libs/flatpickr/flatpickr.js', () => window.flatpickr);
        await loadScript('/vuexy/vendors/libs/@form-validation/bootstrap5.js', () => window.FormValidation?.plugins?.Bootstrap5);
        await loadScript('/vuexy/vendors/libs/@form-validation/auto-focus.js', () => window.FormValidation?.plugins?.AutoFocus);
        await loadScript('/vuexy/js/bootstrap.js', () => window.bootstrap);
        await loadScript('/vuexy/vendors/libs/fullcalendar/fullcalendar.js', () => window.Calendar);

        return { fullcalendarLoaded: true };
      }
      return {};
    }
  ],
  render: () => {
    setTimeout(() => {
      if (!window.Calendar || !window.flatpickr || !window.jQuery) return;

      const calendarEl = document.getElementById('fullcalendar-interactive');
      const inlineCalendarEl = document.getElementById('inline-calendar');
      const eventForm = document.getElementById('eventForm');
      const addEventBtn = document.getElementById('addEventBtn');
      const deleteBtn = document.getElementById('btnDeleteEvent');
      const allDaySwitch = document.getElementById('allDaySwitch');
      const selectAll = document.getElementById('selectAll');
      const filterInputs = Array.from(document.querySelectorAll('.input-filter'));
      const sidebar = document.getElementById('app-calendar-sidebar');
      const overlay = document.getElementById('app-overlay');
      const offcanvasEl = document.getElementById('addEventSidebar');
      const offcanvas = window.bootstrap?.Offcanvas ? new window.bootstrap.Offcanvas(offcanvasEl) : null;

      const calendarColors = {
        Business: 'primary',
        Holiday: 'success',
        Personal: 'danger',
        Family: 'warning',
        ETC: 'info'
      };

      let currentEvents = [
        { id: '1', title: 'Design Review', start: '2026-02-11T11:55:00', end: '2026-02-11T13:00:00', allDay: false, extendedProps: { calendar: 'Business', description: 'Revisão de telas' } },
        { id: '2', title: 'Team Meeting', start: '2026-02-13T09:00:00', end: '2026-02-13T10:30:00', allDay: false, extendedProps: { calendar: 'Business', description: 'Weekly sync' } },
        { id: '3', title: 'Client Call', start: '2026-02-17T14:00:00', end: '2026-02-17T15:30:00', allDay: false, extendedProps: { calendar: 'Business' } },
        { id: '4', title: 'Family Trip', start: '2026-02-19', end: '2026-02-20', allDay: true, extendedProps: { calendar: 'Family' } },
        { id: '5', title: 'Doctor Appointment', start: '2026-02-24T10:00:00', end: '2026-02-24T11:00:00', allDay: false, extendedProps: { calendar: 'Personal' } },
        { id: '6', title: 'Workshop', start: '2026-02-26', allDay: true, extendedProps: { calendar: 'ETC' } },
        { id: '7', title: 'Holiday Event', start: '2026-02-28', allDay: true, extendedProps: { calendar: 'Holiday' } }
      ];

      let editingId = null;

      const labelSelect = window.jQuery('#eventLabel');
      const guestsSelect = window.jQuery('#eventGuests');

      const renderBadge = (option) => {
        if (!option.id) return option.text;
        const color = option.element?.getAttribute('data-label') || 'primary';
        return window.jQuery('<span class="badge rounded-pill bg-label-' + color + '">' + option.text + '</span>');
      };

      labelSelect.wrap('<div class="position-relative"></div>').select2({
        placeholder: 'Selecione',
        dropdownParent: labelSelect.parent(),
        templateResult: renderBadge,
        templateSelection: renderBadge,
        minimumResultsForSearch: -1
      });

      guestsSelect.wrap('<div class="position-relative"></div>').select2({
        placeholder: 'Convidados',
        dropdownParent: guestsSelect.parent(),
        closeOnSelect: false
      });

      const startPicker = window.flatpickr('#eventStartDate', {
        enableTime: true,
        dateFormat: 'Y-m-d H:i',
        defaultDate: '2026-02-11 09:00'
      });

      const endPicker = window.flatpickr('#eventEndDate', {
        enableTime: true,
        dateFormat: 'Y-m-d H:i',
        defaultDate: '2026-02-11 10:00'
      });

      const inlineCalendar = window.flatpickr(inlineCalendarEl, {
        inline: true,
        defaultDate: '2026-02-11',
        onChange: (dates) => {
          if (dates[0]) {
            calendar.gotoDate(dates[0]);
            sidebar.classList.remove('show');
            overlay.classList.remove('show');
          }
        }
      });

      const fv = window.FormValidation?.formValidation(eventForm, {
        fields: {
          eventTitle: { validators: { notEmpty: { message: 'Informe o título' } } },
          eventStartDate: { validators: { notEmpty: { message: 'Informe a data inicial' } } },
          eventEndDate: { validators: { notEmpty: { message: 'Informe a data final' } } }
        },
        plugins: {
          trigger: new window.FormValidation.plugins.Trigger(),
          bootstrap5: new window.FormValidation.plugins.Bootstrap5({ rowSelector: '.mb-3' }),
          submitButton: new window.FormValidation.plugins.SubmitButton(),
          autoFocus: new window.FormValidation.plugins.AutoFocus()
        }
      });

      const selectedCalendars = () => {
        const active = filterInputs.filter((item) => item.checked).map((item) => item.getAttribute('data-value'));
        return active.length ? active : ['Business', 'Holiday', 'Personal', 'Family', 'ETC'];
      };

      const fetchEvents = (_info, success) => {
        const allowed = selectedCalendars();
        const filtered = currentEvents.filter((ev) => allowed.includes(ev.extendedProps.calendar));
        success(filtered);
      };

      const calendar = new window.Calendar(calendarEl, {
        plugins: [
          window.dayGridPlugin,
          window.timegridPlugin,
          window.interactionPlugin,
          window.listPlugin
        ].filter(Boolean),
        initialView: 'dayGridMonth',
        initialDate: '2026-02-11',
        locale: 'pt-br',
        headerToolbar: {
          left: 'sidebarToggle prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay,listMonth'
        },
        customButtons: {
          sidebarToggle: {
            text: 'Sidebar',
            click: () => {
              sidebar.classList.toggle('show');
              overlay.classList.toggle('show');
            }
          }
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
        events: fetchEvents,
        eventClassNames: (info) => {
          const color = calendarColors[info.event.extendedProps.calendar] || 'primary';
          return ['bg-label-' + color, 'text-dark'];
        },
        dateClick: (info) => {
          editingId = null;
          eventForm.reset();
          labelSelect.val('Business').trigger('change');
          guestsSelect.val(null).trigger('change');
          allDaySwitch.checked = info.allDay;
          startPicker.setDate(info.date);
          endPicker.setDate(info.date);
          deleteBtn.classList.add('d-none');
          if (offcanvas) offcanvas.show();
        },
        eventClick: (info) => {
          info.jsEvent.preventDefault(); // evita navegação quando evento tem url (mesmo href=undefined)
          const ev = info.event;
          editingId = ev.id;
          deleteBtn.classList.remove('d-none');
          document.getElementById('eventTitle').value = ev.title;
          labelSelect.val(ev.extendedProps.calendar).trigger('change');
          guestsSelect.val(ev.extendedProps.guests || []).trigger('change');
          document.getElementById('eventLocation').value = ev.extendedProps.location || '';
          document.getElementById('eventURL').value = ev.url || '';
          document.getElementById('eventDescription').value = ev.extendedProps.description || '';
          allDaySwitch.checked = ev.allDay;
          startPicker.setDate(ev.start);
          if (ev.end) endPicker.setDate(ev.end); else endPicker.clear();
          if (offcanvas) offcanvas.show();
        },
        eventDrop: (info) => {
          const ev = currentEvents.find((e) => e.id === info.event.id);
          if (!ev) return;
          ev.start = info.event.start;
          ev.end = info.event.end;
        },
        eventResize: (info) => {
          const ev = currentEvents.find((e) => e.id === info.event.id);
          if (!ev) return;
          ev.end = info.event.end;
        }
      });

      calendar.render();

      const closeSidebar = () => {
        sidebar.classList.remove('show');
        overlay.classList.remove('show');
      };

      overlay.addEventListener('click', closeSidebar);

      const syncSelectAll = () => {
        const allChecked = filterInputs.every((item) => item.checked);
        selectAll.checked = allChecked;
      };

      selectAll.addEventListener('change', (e) => {
        filterInputs.forEach((item) => { item.checked = e.target.checked; });
        calendar.refetchEvents();
      });

      filterInputs.forEach((input) => {
        input.addEventListener('change', () => {
          syncSelectAll();
          calendar.refetchEvents();
        });
      });

      addEventBtn.addEventListener('click', () => {
        editingId = null;
        eventForm.reset();
        labelSelect.val('Business').trigger('change');
        guestsSelect.val(null).trigger('change');
        allDaySwitch.checked = false;
        startPicker.setDate(new Date());
        endPicker.setDate(new Date());
        deleteBtn.classList.add('d-none');
        if (offcanvas) offcanvas.show();
      });

      const getFormData = () => {
        const startDate = startPicker.selectedDates[0];
        const endDate = endPicker.selectedDates[0];
        return {
          id: editingId || String(Date.now()),
          title: document.getElementById('eventTitle').value,
          start: startDate,
          end: endDate || startDate,
          allDay: allDaySwitch.checked,
          url: document.getElementById('eventURL').value || '', // string vazia evita href='undefined' no FullCalendar
          extendedProps: {
            calendar: labelSelect.val(),
            guests: guestsSelect.val() || [],
            location: document.getElementById('eventLocation').value,
            description: document.getElementById('eventDescription').value
          }
        };
      };

      const upsertEvent = (data) => {
        const existingIndex = currentEvents.findIndex((ev) => ev.id === data.id);
        if (existingIndex >= 0) currentEvents[existingIndex] = data; else currentEvents.push(data);
        calendar.refetchEvents();
      };

      const removeEvent = (id) => {
        currentEvents = currentEvents.filter((ev) => ev.id !== id);
        calendar.refetchEvents();
      };

      const submitHandler = () => {
        const payload = getFormData();
        upsertEvent(payload);
        if (offcanvas) offcanvas.hide();
      };

      if (fv) {
        fv.on('core.form.valid', submitHandler);
      } else {
        eventForm.addEventListener('submit', (e) => {
          e.preventDefault();
          submitHandler();
        });
      }

      deleteBtn.addEventListener('click', () => {
        if (!editingId) return;
        removeEvent(editingId);
        if (offcanvas) offcanvas.hide();
      });
    }, 50);

    return `
      <style>
        .app-calendar { background-color: #fff; }
        .app-calendar-sidebar { background-color: #f8f9fa; min-height: 100%; }
        .badge-dot { width: 8px; height: 8px; border-radius: 50%; display: inline-block; }
        .sidebar-header { border-bottom: 1px solid #e4e6ef; }
        .app-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.3); display: none; z-index: 1040; }
        .app-overlay.show { display: block; }
      </style>

      <div class="container-fluid py-4">
        <div class="row g-0">
          <div class="col-lg-3 col-md-4 border-end" id="app-calendar-sidebar">
            <div class="p-3 sidebar-header d-flex justify-content-between align-items-center">
              <h6 class="mb-0">Calendário</h6>
              <button type="button" class="btn btn-sm btn-icon btn-outline-secondary d-lg-none" id="btnCloseSidebar">
                <i class="ti tabler-x"></i>
              </button>
            </div>
            <div class="p-3">
              <button class="btn btn-primary w-100 mb-3" id="addEventBtn">
                <i class="bx bx-plus me-1"></i> Add Event
              </button>

              <div class="bg-white rounded border p-3 mb-4">
                <div class="d-flex justify-content-between align-items-center mb-2">
                  <h6 class="mb-0">Navegar</h6>
                </div>
                <div id="inline-calendar"></div>
              </div>

              <h6 class="mb-3">Event Filters</h6>
              <div class="form-check mb-2">
                <input class="form-check-input" type="checkbox" id="selectAll" data-value="all" checked>
                <label class="form-check-label fw-medium" for="selectAll">View All</label>
              </div>
              <div class="form-check mb-2">
                <input class="form-check-input input-filter" type="checkbox" data-value="Personal" id="personal" checked>
                <label class="form-check-label d-flex align-items-center" for="personal"><span class="badge badge-dot bg-danger me-2"></span>Personal</label>
              </div>
              <div class="form-check mb-2">
                <input class="form-check-input input-filter" type="checkbox" data-value="Business" id="business" checked>
                <label class="form-check-label d-flex align-items-center" for="business"><span class="badge badge-dot bg-primary me-2"></span>Business</label>
              </div>
              <div class="form-check mb-2">
                <input class="form-check-input input-filter" type="checkbox" data-value="Family" id="family" checked>
                <label class="form-check-label d-flex align-items-center" for="family"><span class="badge badge-dot bg-warning me-2"></span>Family</label>
              </div>
              <div class="form-check mb-2">
                <input class="form-check-input input-filter" type="checkbox" data-value="Holiday" id="holiday" checked>
                <label class="form-check-label d-flex align-items-center" for="holiday"><span class="badge badge-dot bg-success me-2"></span>Holiday</label>
              </div>
              <div class="form-check mb-2">
                <input class="form-check-input input-filter" type="checkbox" data-value="ETC" id="etc" checked>
                <label class="form-check-label d-flex align-items-center" for="etc"><span class="badge badge-dot bg-info me-2"></span>ETC</label>
              </div>
            </div>
          </div>

          <div class="col-lg-9 col-md-8">
            <div class="card">
              <div class="card-body">
                <div id="fullcalendar-interactive"></div>
              </div>
            </div>
            <div class="alert alert-info mt-3">
              <strong>Dicas:</strong> use filtros, arraste eventos, clique para editar.
            </div>
          </div>
        </div>
      </div>

      <div class="app-overlay" id="app-overlay"></div>

      <!-- Offcanvas Add/Edit Event -->
      <div class="offcanvas offcanvas-end event-sidebar" id="addEventSidebar" tabindex="-1">
        <div class="offcanvas-header">
          <h5 class="offcanvas-title">Add / Edit Event</h5>
          <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div class="offcanvas-body">
          <form id="eventForm">
            <div class="mb-3">
              <label class="form-label">Title</label>
              <input type="text" id="eventTitle" name="eventTitle" class="form-control" placeholder="Event title" required>
            </div>

            <div class="mb-3">
              <label class="form-label">Calendar</label>
              <select id="eventLabel" name="eventLabel" class="form-select">
                <option value="Business" data-label="primary" selected>Business</option>
                <option value="Holiday" data-label="success">Holiday</option>
                <option value="Personal" data-label="danger">Personal</option>
                <option value="Family" data-label="warning">Family</option>
                <option value="ETC" data-label="info">ETC</option>
              </select>
            </div>

            <div class="row">
              <div class="col-md-6 mb-3">
                <label class="form-label">Start Date</label>
                <input id="eventStartDate" name="eventStartDate" class="form-control" autocomplete="off">
              </div>
              <div class="col-md-6 mb-3">
                <label class="form-label">End Date</label>
                <input id="eventEndDate" name="eventEndDate" class="form-control" autocomplete="off">
              </div>
            </div>

            <div class="form-check form-switch mb-3">
              <input class="form-check-input" type="checkbox" id="allDaySwitch">
              <label class="form-check-label" for="allDaySwitch">All Day</label>
            </div>

            <div class="mb-3">
              <label class="form-label">Event URL</label>
              <input type="url" id="eventURL" class="form-control" placeholder="https://">
            </div>

            <div class="mb-3">
              <label class="form-label">Guests</label>
              <select id="eventGuests" class="form-select" multiple>
                <option value="alice">Alice</option>
                <option value="bob">Bob</option>
                <option value="carol">Carol</option>
                <option value="dave">Dave</option>
              </select>
            </div>

            <div class="mb-3">
              <label class="form-label">Location</label>
              <input type="text" id="eventLocation" class="form-control" placeholder="Room 1, Zoom, etc">
            </div>

            <div class="mb-3">
              <label class="form-label">Description</label>
              <textarea id="eventDescription" class="form-control" rows="3" placeholder="Details"></textarea>
            </div>

            <div class="d-flex justify-content-between align-items-center">
              <button type="button" class="btn btn-outline-danger d-none" id="btnDeleteEvent">Delete</button>
              <div class="d-flex gap-2 ms-auto">
                <button type="reset" class="btn btn-label-secondary">Reset</button>
                <button type="submit" class="btn btn-primary">Save</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    `;
  }
};
