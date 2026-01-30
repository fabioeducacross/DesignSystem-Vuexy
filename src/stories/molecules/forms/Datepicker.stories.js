/**
 * Datepicker - Molecule (Forms)
 * 
 * Source: packages/vuexy_theme/public/vuexy/vendors/libs/flatpickr/
 * Priority: P1 (Important)
 * Status: ✅ DONE
 * 
 * Seletor de data com calendário dropdown.
 */

import { formatHtmlSnippet } from '../../_helpers/snippets';

export default {
  title: 'Molecules/Forms/Datepicker',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
# Datepicker

Seletor de data interativo com calendário dropdown.

## Quando usar
- Seleção de datas únicas
- Seleção de período (range)
- Agendamento
- Filtros de data
- Formulários com data
- Reservas e bookings

## Características
- Biblioteca: Flatpickr
- Formatos: DD/MM/YYYY, MM/DD/YYYY, etc
- Modos: Single, Range, Multiple
- Features: Min/max date, disable dates
- Inline ou dropdown
- Suporte a hora (datetime)
- Localização (i18n)

## Funcionalidades
- Navegação por mês/ano
- Seleção rápida (hoje, ontem, etc)
- Restrições de data
- Formato customizável
- Eventos de mudança
- Mobile-friendly

## Acessibilidade
- Navegação por teclado
- Labels descritivos
- ARIA attributes
- Screen reader support
        `
      }
    }
  },
  argTypes: {
    mode: {
      control: 'select',
      options: ['single', 'range', 'multiple'],
      description: 'Modo de seleção',
      table: { defaultValue: { summary: 'single' } }
    },
    enableTime: {
      control: 'boolean',
      description: 'Incluir seleção de hora',
      table: { defaultValue: { summary: false } }
    },
    inline: {
      control: 'boolean',
      description: 'Calendário sempre visível',
      table: { defaultValue: { summary: false } }
    }
  }
};

const createDatepicker = ({ mode = 'single', enableTime = false, inline = false }) => {
  const inputClass = inline ? 'd-none' : 'form-control';
  const placeholder = mode === 'range' ? 'Select date range' : 'Select date';
  
  return `<div class="mb-3">
  <label class="form-label">Date Picker (${mode})</label>
  <input type="text" 
         class="${inputClass} flatpickr-input" 
         placeholder="${placeholder}"
         data-mode="${mode}"
         ${enableTime ? 'data-enable-time="true"' : ''}
         ${inline ? 'data-inline="true"' : ''}
         readonly>
  ${inline ? '<div class="flatpickr-calendar inline"></div>' : ''}
</div>`;
};

const Template = (args) => {
  const markup = createDatepicker(args);
  
  return `
    <div style="max-width: 400px;">
      ${markup}
    </div>
    
    <hr class="my-5" />
    
    <details>
      <summary><strong>Code Snippets</strong></summary>
      <div class="mt-3">
        <h6>HTML</h6>
        <pre><code>${formatHtmlSnippet(markup).replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
        
        <div class="alert alert-warning mt-3">
          <strong>Flatpickr Required:</strong>
          <pre class="mb-0"><code>// Include Flatpickr library
&lt;link rel="stylesheet" href="path/to/flatpickr.min.css"&gt;
&lt;script src="path/to/flatpickr.min.js"&gt;&lt;/script&gt;

// Initialize
flatpickr(".flatpickr-input", {
  mode: "${args.mode || 'single'}",
  enableTime: ${args.enableTime || false},
  dateFormat: "Y-m-d",
  // ...more options
});</code></pre>
        </div>
      </div>
    </details>
  `;
};

export const Overview = () => `
  <div class="row g-4">
    <div class="col-md-6">
      <h6>Single Date</h6>
      <div class="card">
        <div class="card-body">
          <label class="form-label">Select Date</label>
          <input type="text" 
                 class="form-control flatpickr-input" 
                 placeholder="YYYY-MM-DD"
                 readonly>
        </div>
      </div>
    </div>
    
    <div class="col-md-6">
      <h6>Date Range</h6>
      <div class="card">
        <div class="card-body">
          <label class="form-label">Select Date Range</label>
          <input type="text" 
                 class="form-control flatpickr-input" 
                 placeholder="Start date to End date"
                 data-mode="range"
                 readonly>
        </div>
      </div>
    </div>
    
    <div class="col-md-6">
      <h6>With Time</h6>
      <div class="card">
        <div class="card-body">
          <label class="form-label">Select Date & Time</label>
          <input type="text" 
                 class="form-control flatpickr-input" 
                 placeholder="YYYY-MM-DD HH:MM"
                 data-enable-time="true"
                 readonly>
        </div>
      </div>
    </div>
    
    <div class="col-md-6">
      <h6>Multiple Dates</h6>
      <div class="card">
        <div class="card-body">
          <label class="form-label">Select Multiple Dates</label>
          <input type="text" 
                 class="form-control flatpickr-input" 
                 placeholder="Select dates"
                 data-mode="multiple"
                 readonly>
        </div>
      </div>
    </div>
    
    <div class="col-md-6">
      <h6>With Input Group</h6>
      <div class="card">
        <div class="card-body">
          <label class="form-label">Booking Date</label>
          <div class="input-group">
            <span class="input-group-text">
              <i class="bx bx-calendar"></i>
            </span>
            <input type="text" 
                   class="form-control flatpickr-input" 
                   placeholder="Select date"
                   readonly>
          </div>
        </div>
      </div>
    </div>
    
    <div class="col-md-6">
      <h6>Inline Calendar</h6>
      <div class="card">
        <div class="card-body">
          <label class="form-label mb-3">Event Date</label>
          <div class="border rounded p-3 text-center" style="min-height: 280px;">
            <div class="text-muted">
              <i class="bx bx-calendar bx-lg mb-2"></i>
              <p>Inline calendar would appear here</p>
              <small>Requires Flatpickr initialization</small>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <div class="col-12">
      <h6>In Form Context</h6>
      <div class="card">
        <div class="card-body">
          <form>
            <div class="row">
              <div class="col-md-6 mb-3">
                <label class="form-label">Check-in Date</label>
                <div class="input-group">
                  <span class="input-group-text">
                    <i class="bx bx-calendar-check"></i>
                  </span>
                  <input type="text" 
                         class="form-control flatpickr-input" 
                         placeholder="Select check-in date"
                         readonly>
                </div>
              </div>
              
              <div class="col-md-6 mb-3">
                <label class="form-label">Check-out Date</label>
                <div class="input-group">
                  <span class="input-group-text">
                    <i class="bx bx-calendar-x"></i>
                  </span>
                  <input type="text" 
                         class="form-control flatpickr-input" 
                         placeholder="Select check-out date"
                         readonly>
                </div>
              </div>
              
              <div class="col-md-6 mb-3">
                <label class="form-label">Birth Date</label>
                <input type="text" 
                       class="form-control flatpickr-input" 
                       placeholder="DD/MM/YYYY"
                       readonly>
              </div>
              
              <div class="col-md-6 mb-3">
                <label class="form-label">Meeting Schedule</label>
                <input type="text" 
                       class="form-control flatpickr-input" 
                       placeholder="Select date and time"
                       data-enable-time="true"
                       readonly>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
  
  <div class="alert alert-info mt-4">
    <i class="bx bx-info-circle me-2"></i>
    <strong>Flatpickr Library Required:</strong> This component requires the Flatpickr library. Include the CSS and JS files, then initialize with <code>flatpickr(selector, options)</code>.
  </div>
`;

export const Single = Template.bind({});
Single.args = {
  mode: 'single',
  enableTime: false,
  inline: false
};

export const Range = Template.bind({});
Range.args = {
  mode: 'range',
  enableTime: false,
  inline: false
};

export const WithTime = Template.bind({});
WithTime.args = {
  mode: 'single',
  enableTime: true,
  inline: false
};

export const Multiple = Template.bind({});
Multiple.args = {
  mode: 'multiple',
  enableTime: false,
  inline: false
};

export const Inline = Template.bind({});
Inline.args = {
  mode: 'single',
  enableTime: false,
  inline: true
};
