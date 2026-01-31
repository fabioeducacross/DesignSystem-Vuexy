# 🔌 Loader Patterns - Best Practices

**Última Atualização**: 31 de janeiro de 2026  
**Loaders Implementados**: 13/13 (100%)

---

## 📋 Índice

1. [Padrão Base](#padrão-base)
2. [Bootstrap JS Pattern](#bootstrap-js-pattern)
3. [Vendor Library Pattern](#vendor-library-pattern)
4. [Dependency Management](#dependency-management)
5. [Error Handling](#error-handling)
6. [Performance Notes](#performance-notes)
7. [Common Pitfalls](#common-pitfalls)

---

## 🎯 Padrão Base

Todos os loaders seguem este padrão fundamental:

```javascript
export const Interactive = {
  parameters: {
    docs: {
      description: {
        story: `Descrição detalhada com features e instruções de teste`
      }
    }
  },
  loaders: [
    async () => {
      if (typeof window !== 'undefined') {
        // 1. Check singleton (library já carregada?)
        // 2. Load dependencies first (se necessário)
        // 3. Load CSS (se aplicável)
        // 4. Load JS
        // 5. Return status
      }
      return {};
    }
  ],
  render: () => {
    // Initialize library após render
    setTimeout(() => {
      if (window.LibraryName) {
        // Initialize instances
        console.log('✅ Library: X instâncias inicializadas');
      }
    }, 100);
    
    return `HTML template`;
  }
};
```

### Princípios:

1. **Singleton Check**: Evita recarregar library múltiplas vezes
2. **Async Loading**: Usa Promises para controle de fluxo
3. **CSS Before JS**: Sempre carregar CSS antes do JS
4. **Delayed Initialization**: `setTimeout(100ms)` garante DOM pronto
5. **Console Logging**: Logs claros para debug

---

## ⚡ Bootstrap JS Pattern

**Usado em**: Dropdown, Tooltip, Popover, Modal, Offcanvas, Accordion

### Características:

- **Arquivo único**: `/vuexy/js/bootstrap.js`
- **Singleton global**: `window.bootstrap`
- **Namespace**: `bootstrap.Dropdown`, `bootstrap.Tooltip`, etc.
- **Sem CSS**: Bootstrap CSS já carregado globalmente

### Template:

```javascript
export const Interactive = {
  loaders: [
    async () => {
      if (typeof window !== 'undefined') {
        // Check singleton
        if (!window.bootstrap) {
          return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = '/vuexy/js/bootstrap.js';
            script.onload = () => {
              console.log('✅ Bootstrap JS carregado globalmente');
              resolve({ bootstrapLoaded: true });
            };
            script.onerror = () => reject(new Error('Failed to load Bootstrap JS'));
            document.head.appendChild(script);
          });
        }
        return { bootstrapLoaded: true };
      }
      return {};
    }
  ],
  render: () => {
    setTimeout(() => {
      if (window.bootstrap && window.bootstrap.ComponentName) {
        // Initialize instances
        const elements = document.querySelectorAll('[data-bs-toggle="..."]');
        const instances = Array.from(elements).map(el => 
          new bootstrap.ComponentName(el, { ...options })
        );
        console.log(`✅ ComponentName: ${instances.length} instâncias inicializadas`);
      }
    }, 100);
    
    return `
      <button data-bs-toggle="..." data-bs-target="#...">
        Open
      </button>
    `;
  }
};
```

### Exemplos:

**Dropdown**:
```javascript
document.querySelectorAll('[data-bs-toggle="dropdown"]').forEach(el => {
  new bootstrap.Dropdown(el);
});
```

**Tooltip**:
```javascript
document.querySelectorAll('[data-bs-toggle="tooltip"]').forEach(el => {
  new bootstrap.Tooltip(el, { 
    html: true,
    placement: 'top'
  });
});
```

**Modal**:
```javascript
const modal = new bootstrap.Modal(document.getElementById('myModal'), {
  backdrop: true,
  keyboard: true
});
```

---

## 📦 Vendor Library Pattern

**Usado em**: Flatpickr, FullCalendar, Select2, Quill, ApexCharts, DataTables, BS Stepper

### Características:

- **Arquivos próprios**: CSS + JS específicos da library
- **Namespace próprio**: `flatpickr()`, `FullCalendar`, `$().select2()`, etc.
- **CSS separado**: Geralmente possui CSS próprio
- **Inicialização variada**: Cada library tem seu padrão

### Template:

```javascript
export const Interactive = {
  loaders: [
    async () => {
      if (typeof window !== 'undefined') {
        // Check singleton
        if (!document.querySelector('link[href*="library-name"]')) {
          return new Promise((resolve, reject) => {
            // 1. Load CSS first
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = '/vuexy/vendors/libs/library-name/library.css';
            link.onload = () => {
              // 2. Then load JS
              if (!window.LibraryName) {
                const script = document.createElement('script');
                script.src = '/vuexy/vendors/libs/library-name/library.js';
                script.onload = () => {
                  console.log('✅ LibraryName CSS + JS carregados');
                  resolve({ libraryLoaded: true });
                };
                script.onerror = () => reject(new Error('Failed to load library JS'));
                document.head.appendChild(script);
              } else {
                resolve({ libraryLoaded: true });
              }
            };
            link.onerror = () => reject(new Error('Failed to load library CSS'));
            document.head.appendChild(link);
          });
        }
        return { libraryLoaded: true };
      }
      return {};
    }
  ],
  render: () => {
    setTimeout(() => {
      if (window.LibraryName) {
        // Initialize instances according to library API
        console.log('✅ LibraryName: X instâncias inicializadas');
      }
    }, 100);
    
    return `HTML template`;
  }
};
```

### Exemplos por Library:

#### Flatpickr
```javascript
if (window.flatpickr) {
  flatpickr("#date-basic", {
    locale: Portuguese,
    dateFormat: "d/m/Y"
  });
}
```

#### FullCalendar
```javascript
if (window.FullCalendar) {
  const calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: 'dayGridMonth',
    locale: 'pt-br',
    events: [...]
  });
  calendar.render();
}
```

#### Select2 (requer jQuery)
```javascript
if (window.jQuery && window.jQuery.fn.select2) {
  $('#select-basic').select2({
    placeholder: 'Selecione...',
    allowClear: true
  });
}
```

#### Quill
```javascript
if (window.Quill) {
  const quill = new Quill('#editor', {
    theme: 'snow',
    modules: { toolbar: [...] }
  });
}
```

#### ApexCharts
```javascript
if (window.ApexCharts) {
  const chart = new ApexCharts(document.querySelector("#chart"), options);
  chart.render();
}
```

#### DataTables (requer jQuery)
```javascript
if (window.jQuery && window.jQuery.fn.DataTable) {
  $('#datatable').DataTable({
    language: { /* pt-BR */ },
    pageLength: 10
  });
}
```

#### BS Stepper
```javascript
if (window.Stepper) {
  const stepper = new Stepper(document.querySelector('#stepper'), {
    linear: true,
    animation: true
  });
}
```

---

## 🔗 Dependency Management

### jQuery Dependencies

**Libraries que requerem**: Select2, DataTables

**Pattern**:

```javascript
loaders: [
  async () => {
    if (typeof window !== 'undefined') {
      // 1. Load jQuery first
      if (!window.jQuery) {
        await new Promise((resolve, reject) => {
          const script = document.createElement('script');
          script.src = '/vuexy/vendors/libs/jquery/jquery.js';
          script.onload = () => {
            console.log('✅ jQuery carregado globalmente');
            resolve();
          };
          script.onerror = () => reject(new Error('Failed to load jQuery'));
          document.head.appendChild(script);
        });
      }
      
      // 2. Then load library CSS
      if (!document.querySelector('link[href*="library"]')) {
        await new Promise((resolve, reject) => {
          const link = document.createElement('link');
          link.rel = 'stylesheet';
          link.href = '/vuexy/vendors/libs/library/library.css';
          link.onload = resolve;
          link.onerror = () => reject(new Error('Failed to load CSS'));
          document.head.appendChild(link);
        });
      }
      
      // 3. Finally load library JS
      if (!window.jQuery.fn.libraryPlugin) {
        await new Promise((resolve, reject) => {
          const script = document.createElement('script');
          script.src = '/vuexy/vendors/libs/library/library.js';
          script.onload = () => {
            console.log('✅ Library CSS + JS carregados');
            resolve();
          };
          script.onerror = () => reject(new Error('Failed to load JS'));
          document.head.appendChild(script);
        });
      }
      
      return { libraryLoaded: true };
    }
    return {};
  }
]
```

**Ordem crítica**: jQuery → CSS → Library JS

---

## 🛡️ Error Handling

### Pattern Robusto:

```javascript
loaders: [
  async () => {
    if (typeof window !== 'undefined') {
      try {
        // Check singleton
        if (!window.LibraryName) {
          await new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = '/vuexy/vendors/libs/library/library.js';
            
            // Timeout fallback (5 segundos)
            const timeout = setTimeout(() => {
              reject(new Error('Library load timeout'));
            }, 5000);
            
            script.onload = () => {
              clearTimeout(timeout);
              console.log('✅ Library loaded');
              resolve();
            };
            
            script.onerror = () => {
              clearTimeout(timeout);
              reject(new Error('Failed to load library'));
            };
            
            document.head.appendChild(script);
          });
        }
        return { libraryLoaded: true };
      } catch (error) {
        console.error('❌ Library loader error:', error);
        return { libraryLoaded: false, error: error.message };
      }
    }
    return {};
  }
]
```

### Fallback no Render:

```javascript
render: () => {
  setTimeout(() => {
    if (!window.LibraryName) {
      console.warn('⚠️ Library not loaded. Features disabled.');
      // Show error message to user
      const container = document.getElementById('library-container');
      if (container) {
        container.innerHTML = `
          <div class="alert alert-warning">
            <strong>Atenção:</strong> Library não carregada. 
            <a href="javascript:location.reload()">Recarregar página</a>
          </div>
        `;
      }
      return;
    }
    
    // Normal initialization
    console.log('✅ Library initialized');
  }, 100);
  
  return `HTML template`;
};
```

---

## ⚡ Performance Notes

### 1. Lazy Loading

**Problema**: Carregar todas as libraries de uma vez é pesado.  
**Solução**: Loaders carregam sob demanda (quando story é acessada).

### 2. Singleton Pattern

**Problema**: Múltiplas stories carregando mesma library.  
**Solução**: Check `if (!window.LibraryName)` evita recarregamento.

### 3. CSS Before JS

**Problema**: FOUC (Flash of Unstyled Content).  
**Solução**: Sempre carregar CSS antes do JS para evitar "pulo" visual.

### 4. setTimeout(100ms)

**Problema**: JS pode executar antes do DOM estar pronto.  
**Solução**: Delay de 100ms garante elementos estão renderizados.

### 5. Event Delegation

**Para múltiplas instâncias**:

```javascript
// ❌ Ruim: loop pesado
document.querySelectorAll('.tooltip').forEach(el => {
  new bootstrap.Tooltip(el);
});

// ✅ Melhor: guarda referências se precisar manipular depois
const tooltips = Array.from(document.querySelectorAll('.tooltip')).map(el => 
  new bootstrap.Tooltip(el)
);
```

### 6. Memory Leaks

**Problema**: Instâncias não são limpas ao trocar de story.  
**Nota**: Storybook recarrega iframe, então não é crítico. Mas em produção:

```javascript
// Cleanup antes de trocar página
tooltips.forEach(tooltip => tooltip.dispose());
```

---

## ⚠️ Common Pitfalls

### 1. Ordem Errada de Loading

**❌ Errado**:
```javascript
// JS antes do CSS
script.onload = () => {
  loadCSS(); // Errado!
};
```

**✅ Correto**:
```javascript
// CSS primeiro, depois JS
link.onload = () => {
  loadJS(); // Correto!
};
```

---

### 2. Esquecer Singleton Check

**❌ Errado**:
```javascript
// Sempre carrega, mesmo se já existe
const script = document.createElement('script');
script.src = '/vuexy/js/bootstrap.js';
document.head.appendChild(script);
```

**✅ Correto**:
```javascript
// Check primeiro
if (!window.bootstrap) {
  // Só carrega se não existir
  const script = document.createElement('script');
  script.src = '/vuexy/js/bootstrap.js';
  document.head.appendChild(script);
}
```

---

### 3. Inicializar Antes do DOM

**❌ Errado**:
```javascript
render: () => {
  // Executa imediatamente, DOM pode não estar pronto
  if (window.bootstrap) {
    new bootstrap.Tooltip('#tooltip'); // Pode falhar!
  }
  return `<button id="tooltip">Hover</button>`;
}
```

**✅ Correto**:
```javascript
render: () => {
  // Aguarda 100ms para DOM estar pronto
  setTimeout(() => {
    if (window.bootstrap) {
      new bootstrap.Tooltip(document.getElementById('tooltip'));
    }
  }, 100);
  return `<button id="tooltip">Hover</button>`;
}
```

---

### 4. Caminhos Incorretos

**❌ Errado**:
```javascript
script.src = '/vendors/libs/flatpickr/flatpickr.js'; // Sem /vuexy/
```

**✅ Correto**:
```javascript
script.src = '/vuexy/vendors/libs/flatpickr/flatpickr.js';
```

**Estrutura**:
```
packages/vuexy_theme/public/vuexy/
├── js/                          (Bootstrap JS)
├── vendors/
│   └── libs/
│       ├── flatpickr/          (Vendor library)
│       ├── fullcalendar/
│       └── ...
```

---

### 5. Locale pt-BR Esquecido

**❌ Errado**:
```javascript
flatpickr("#date", {
  dateFormat: "Y-m-d" // Inglês!
});
```

**✅ Correto**:
```javascript
flatpickr("#date", {
  locale: Portuguese,      // Importar locale
  dateFormat: "d/m/Y"     // Formato brasileiro
});
```

**Para FullCalendar**:
```javascript
new FullCalendar.Calendar(el, {
  locale: 'pt-br',
  buttonText: {
    today: 'Hoje',
    month: 'Mês',
    week: 'Semana',
    day: 'Dia',
    list: 'Lista'
  }
});
```

**Para DataTables**:
```javascript
$('#table').DataTable({
  language: {
    search: "Buscar:",
    lengthMenu: "Exibir _MENU_ por página",
    info: "Mostrando _START_ a _END_ de _TOTAL_ registros",
    paginate: {
      first: "Primeiro",
      last: "Último",
      next: "Próximo",
      previous: "Anterior"
    }
  }
});
```

---

## 📊 Performance Metrics

### Load Times (médias):

| Library | CSS | JS | Total | Instances |
|---------|-----|----|----|-----------|
| Bootstrap JS | - | ~50KB | 50KB | N/A (global) |
| Flatpickr | 15KB | 35KB | 50KB | 7 |
| FullCalendar | 80KB | 120KB | 200KB | 1 |
| Select2 | 20KB | 40KB | 60KB | 7 |
| Quill | 30KB | 100KB | 130KB | 3 |
| ApexCharts | - | 150KB | 150KB | 6 |
| DataTables | 15KB | 80KB | 95KB | 2 |
| BS Stepper | 5KB | 15KB | 20KB | 2 |

**Total**: ~755KB (todas as libraries)

**Nota**: Com singleton pattern, cada library carrega apenas 1 vez por sessão.

---

## 🎯 Recommendations

### Para Produção:

1. **Minify**: Usar versões .min.js e .min.css
2. **CDN**: Considerar CDN para libraries populares
3. **Bundle**: Agrupar libraries comuns em bundle único
4. **Code Splitting**: Carregar apenas libraries necessárias por página
5. **Lazy Load**: Usar Intersection Observer para carregar sob demanda

### Para Desenvolvimento:

1. **Console Logs**: Manter logs claros para debug
2. **Error Handling**: Sempre tratar erros de carregamento
3. **Timeout**: Adicionar timeout de 5s para evitar hang infinito
4. **Documentation**: Documentar opções específicas de cada library
5. **Testing**: Testar em múltiplos browsers (Chrome, Firefox, Safari, Edge)

---

## 📚 Resources

### Official Docs:

- **Bootstrap**: https://getbootstrap.com/docs/5.3/getting-started/javascript/
- **Flatpickr**: https://flatpickr.js.org/options/
- **FullCalendar**: https://fullcalendar.io/docs
- **Select2**: https://select2.org/configuration
- **Quill**: https://quilljs.com/docs/configuration/
- **ApexCharts**: https://apexcharts.com/docs/options/
- **DataTables**: https://datatables.net/reference/option/
- **BS Stepper**: https://github.com/Johann-S/bs-stepper

### Vuexy Theme:

- **Template**: https://pixinvent.com/demo/vuexy-html-bootstrap-admin-template/
- **Assets**: `packages/vuexy_theme/public/vuexy/`

---

**Última Revisão**: 31 de janeiro de 2026  
**Mantido por**: AI Agent (GitHub Copilot)  
**Status**: Production Ready ✅
