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
  title: 'Vuexy/Molecules/Forms/Datepicker',
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
    <i class="bx bx-info-circle mr-2"></i>
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

/**
 * ====================================
 * INTERACTIVE STORY - Flatpickr Real
 * ====================================
 */

export const Interactive = {
  parameters: {
    docs: {
      description: {
        story: `
### Datepicker com Flatpickr Real

Implementação oficial usando Flatpickr do Vuexy:

- ✅ **Date Picker** - seleção de data única
- ✅ **Range Picker** - seleção de período (início/fim)
- ✅ **Time Picker** - seleção de hora
- ✅ **DateTime Picker** - data + hora juntos
- ✅ **Inline Calendar** - calendário sempre visível
- ✅ **Locale pt-BR** - formatação brasileira
- ✅ **Min/Max dates** - restrições de data
- ✅ **Disable dates** - desabilitar datas específicas

**Casos de uso:**
- Formulários de reserva
- Filtros de data
- Agendamento de eventos
- Campos de data de nascimento
- Seleção de período de relatórios

### Como testar:
1. Clique nos inputs para abrir calendário
2. Navegue entre meses com setas
3. Teste range picker (selecione 2 datas)
4. Teste time picker (ajuste hora/minuto)
        `
      }
    }
  },
  loaders: [
    async () => {
      if (typeof window !== 'undefined') {
        // Load CSS
        if (!document.querySelector('link[href*="flatpickr.css"]')) {
          return new Promise((resolve, reject) => {
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = '/vuexy/vendors/libs/flatpickr/flatpickr.css';
            link.onload = () => {
              // Load JS after CSS
              if (!window.flatpickr) {
                const script = document.createElement('script');
                script.src = '/vuexy/vendors/libs/flatpickr/flatpickr.js';
                script.onload = () => {
                  console.log('✅ Flatpickr CSS + JS carregados');
                  resolve({ flatpickrLoaded: true });
                };
                script.onerror = () => reject(new Error('Failed to load Flatpickr JS'));
                document.head.appendChild(script);
              } else {
                resolve({ flatpickrLoaded: true });
              }
            };
            link.onerror = () => reject(new Error('Failed to load Flatpickr CSS'));
            document.head.appendChild(link);
          });
        }
        return { flatpickrLoaded: true };
      }
      return {};
    }
  ],
  render: () => {
    // Initialize Flatpickr after render
    setTimeout(() => {
      if (window.flatpickr) {
        // 1. Basic Date Picker
        window.flatpickr("#datepicker-basic", {
          dateFormat: "d/m/Y",
          locale: {
            firstDayOfWeek: 0,
            weekdays: {
              shorthand: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
              longhand: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
            },
            months: {
              shorthand: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
              longhand: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
            },
          },
          defaultDate: new Date()
        });

        // 2. Range Picker
        window.flatpickr("#datepicker-range", {
          mode: "range",
          dateFormat: "d/m/Y",
          locale: {
            firstDayOfWeek: 0,
            weekdays: {
              shorthand: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
              longhand: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
            },
            months: {
              shorthand: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
              longhand: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
            },
            rangeSeparator: ' até '
          }
        });

        // 3. Time Picker
        window.flatpickr("#datepicker-time", {
          enableTime: true,
          noCalendar: true,
          dateFormat: "H:i",
          time_24hr: true,
          defaultDate: "14:30"
        });

        // 4. DateTime Picker
        window.flatpickr("#datepicker-datetime", {
          enableTime: true,
          dateFormat: "d/m/Y H:i",
          time_24hr: true,
          locale: {
            firstDayOfWeek: 0,
            weekdays: {
              shorthand: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
              longhand: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
            },
            months: {
              shorthand: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
              longhand: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
            },
          },
          defaultDate: new Date()
        });

        // 5. Inline Calendar
        window.flatpickr("#datepicker-inline", {
          inline: true,
          dateFormat: "d/m/Y",
          locale: {
            firstDayOfWeek: 0,
            weekdays: {
              shorthand: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
              longhand: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
            },
            months: {
              shorthand: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
              longhand: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
            },
          },
          defaultDate: new Date(),
          onChange: function(selectedDates, dateStr) {
            document.getElementById('inline-result').textContent = dateStr;
          }
        });

        // 6. With Min/Max
        const today = new Date();
        const maxDate = new Date();
        maxDate.setMonth(maxDate.getMonth() + 3);
        
        window.flatpickr("#datepicker-minmax", {
          dateFormat: "d/m/Y",
          minDate: today,
          maxDate: maxDate,
          locale: {
            firstDayOfWeek: 0,
            weekdays: {
              shorthand: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
              longhand: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
            },
            months: {
              shorthand: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
              longhand: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
            },
          }
        });

        // 7. Disable Weekends
        window.flatpickr("#datepicker-noweekends", {
          dateFormat: "d/m/Y",
          disable: [
            function(date) {
              return (date.getDay() === 0 || date.getDay() === 6);
            }
          ],
          locale: {
            firstDayOfWeek: 0,
            weekdays: {
              shorthand: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
              longhand: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
            },
            months: {
              shorthand: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
              longhand: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
            },
          }
        });

        console.log('✅ Flatpickr inicializado em todos os campos');
      }
    }, 100);

    return `
      <div style="padding: 30px;">
        <h5 class="mb-4">Datepickers Interativos com Flatpickr</h5>
        
        <div class="row g-4">
          <!-- 1. Basic Date Picker -->
          <div class="col-md-6">
            <div class="card">
              <div class="card-body">
                <h6 class="card-title">
                  <i class="ti tabler-calendar mr-2 text-primary"></i>
                  Date Picker Básico
                </h6>
                <p class="text-muted small">Seleção de data única</p>
                <div class="mb-3">
                  <label class="form-label">Selecione uma data</label>
                  <input 
                    type="text" 
                    class="form-control" 
                    id="datepicker-basic"
                    placeholder="dd/mm/aaaa"
                    readonly
                  >
                  <small class="text-muted">Formato: DD/MM/YYYY</small>
                </div>
              </div>
            </div>
          </div>

          <!-- 2. Range Picker -->
          <div class="col-md-6">
            <div class="card">
              <div class="card-body">
                <h6 class="card-title">
                  <i class="ti tabler-calendar-event mr-2 text-success"></i>
                  Range Picker
                </h6>
                <p class="text-muted small">Selecione período (início e fim)</p>
                <div class="mb-3">
                  <label class="form-label">Selecione o período</label>
                  <input 
                    type="text" 
                    class="form-control" 
                    id="datepicker-range"
                    placeholder="dd/mm/aaaa até dd/mm/aaaa"
                    readonly
                  >
                  <small class="text-muted">Clique para selecionar data inicial e final</small>
                </div>
              </div>
            </div>
          </div>

          <!-- 3. Time Picker -->
          <div class="col-md-6">
            <div class="card">
              <div class="card-body">
                <h6 class="card-title">
                  <i class="ti tabler-clock mr-2 text-info"></i>
                  Time Picker
                </h6>
                <p class="text-muted small">Seleção de hora</p>
                <div class="mb-3">
                  <label class="form-label">Selecione a hora</label>
                  <input 
                    type="text" 
                    class="form-control" 
                    id="datepicker-time"
                    placeholder="HH:mm"
                    readonly
                  >
                  <small class="text-muted">Formato 24 horas</small>
                </div>
              </div>
            </div>
          </div>

          <!-- 4. DateTime Picker -->
          <div class="col-md-6">
            <div class="card">
              <div class="card-body">
                <h6 class="card-title">
                  <i class="ti tabler-calendar-time mr-2 text-warning"></i>
                  DateTime Picker
                </h6>
                <p class="text-muted small">Data + hora juntos</p>
                <div class="mb-3">
                  <label class="form-label">Agendamento</label>
                  <input 
                    type="text" 
                    class="form-control" 
                    id="datepicker-datetime"
                    placeholder="dd/mm/aaaa HH:mm"
                    readonly
                  >
                  <small class="text-muted">Selecione data e hora do agendamento</small>
                </div>
              </div>
            </div>
          </div>

          <!-- 5. Inline Calendar -->
          <div class="col-md-6">
            <div class="card">
              <div class="card-body">
                <h6 class="card-title">
                  <i class="ti tabler-calendar-month mr-2 text-danger"></i>
                  Inline Calendar
                </h6>
                <p class="text-muted small">Calendário sempre visível</p>
                <input type="text" id="datepicker-inline" style="display:none;">
                <div class="alert alert-primary mt-3">
                  <strong>Selecionado:</strong> <span id="inline-result">Nenhuma data</span>
                </div>
              </div>
            </div>
          </div>

          <!-- 6. Min/Max Dates -->
          <div class="col-md-6">
            <div class="card">
              <div class="card-body">
                <h6 class="card-title">
                  <i class="ti tabler-calendar-check mr-2 text-purple"></i>
                  Com Restrições
                </h6>
                <p class="text-muted small">Apenas próximos 3 meses</p>
                <div class="mb-3">
                  <label class="form-label">Data de reserva</label>
                  <input 
                    type="text" 
                    class="form-control" 
                    id="datepicker-minmax"
                    placeholder="dd/mm/aaaa"
                    readonly
                  >
                  <small class="text-muted">Min: Hoje | Max: +3 meses</small>
                </div>
              </div>
            </div>
          </div>

          <!-- 7. Disable Weekends -->
          <div class="col-md-6">
            <div class="card">
              <div class="card-body">
                <h6 class="card-title">
                  <i class="ti tabler-calendar-minus mr-2 text-secondary"></i>
                  Sem Fins de Semana
                </h6>
                <p class="text-muted small">Apenas dias úteis</p>
                <div class="mb-3">
                  <label class="form-label">Data de entrega</label>
                  <input 
                    type="text" 
                    class="form-control" 
                    id="datepicker-noweekends"
                    placeholder="dd/mm/aaaa"
                    readonly
                  >
                  <small class="text-muted">Sábados e domingos desabilitados</small>
                </div>
              </div>
            </div>
          </div>

          <!-- Use Case: Formulário de Reserva -->
          <div class="col-12">
            <div class="card border-primary">
              <div class="card-body">
                <h6 class="card-title">
                  <i class="ti tabler-forms mr-2 text-primary"></i>
                  Exemplo: Formulário de Reserva de Hotel
                </h6>
                <div class="row g-3">
                  <div class="col-md-4">
                    <label class="form-label">Check-in</label>
                    <input 
                      type="text" 
                      class="form-control" 
                      id="checkin"
                      placeholder="dd/mm/aaaa"
                      readonly
                    >
                  </div>
                  <div class="col-md-4">
                    <label class="form-label">Check-out</label>
                    <input 
                      type="text" 
                      class="form-control" 
                      id="checkout"
                      placeholder="dd/mm/aaaa"
                      readonly
                    >
                  </div>
                  <div class="col-md-4">
                    <label class="form-label">Hóspedes</label>
                    <select class="custom-select">
                      <option>1 pessoa</option>
                      <option>2 pessoas</option>
                      <option>3 pessoas</option>
                      <option>4+ pessoas</option>
                    </select>
                  </div>
                  <div class="col-12">
                    <button class="btn btn-primary">
                      <i class="ti tabler-search mr-2"></i>
                      Buscar Disponibilidade
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="alert alert-info mt-4">
          <strong>💡 Teste a interatividade:</strong>
          <ul class="mb-0 mt-2">
            <li><strong>Date Picker:</strong> Clique no input, navegue pelos meses, selecione uma data</li>
            <li><strong>Range Picker:</strong> Selecione data inicial, depois final (mostra "até")</li>
            <li><strong>Time Picker:</strong> Ajuste hora e minuto com controles</li>
            <li><strong>DateTime:</strong> Combine data + hora no mesmo picker</li>
            <li><strong>Inline:</strong> Calendário sempre visível, sem popup</li>
            <li><strong>Restrições:</strong> Tente selecionar datas fora do range permitido</li>
            <li><strong>Sem Fins de Semana:</strong> Note que sáb/dom aparecem desabilitados</li>
            <li><strong>Locale pt-BR:</strong> Nomes dos meses/dias em português, formato DD/MM/YYYY</li>
          </ul>
        </div>
      </div>
    `;
  }
};

// Initialize check-in/check-out dependency
setTimeout(() => {
  if (window.flatpickr) {
    const checkinFp = window.flatpickr("#checkin", {
      dateFormat: "d/m/Y",
      minDate: "today",
      locale: {
        firstDayOfWeek: 0,
        weekdays: {
          shorthand: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
          longhand: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
        },
        months: {
          shorthand: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
          longhand: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
        },
      },
      onChange: function(selectedDates) {
        if (selectedDates.length > 0) {
          const minCheckout = new Date(selectedDates[0]);
          minCheckout.setDate(minCheckout.getDate() + 1);
          checkoutFp.set('minDate', minCheckout);
        }
      }
    });

    const checkoutFp = window.flatpickr("#checkout", {
      dateFormat: "d/m/Y",
      minDate: "today",
      locale: {
        firstDayOfWeek: 0,
        weekdays: {
          shorthand: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
          longhand: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
        },
        months: {
          shorthand: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
          longhand: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
        },
      }
    });
  }
}, 150);
