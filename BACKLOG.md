# 📋 Backlog - Vuexy Storybook Design System

**Última Atualização**: 31 de janeiro de 2026  
**Status Atual**: 95.3% Completo (61/64 componentes)  
**Fase**: Bootstrap JS Loaders Implementation

---

## 🎯 Objetivo Final

Completar 100% dos componentes com interatividade JavaScript real usando Bootstrap JS e vendor libraries do Vuexy.

---

## 📊 Status Overview

```
✅ Completo:       61/64 componentes (95.3%)
🔄 Em Progresso:    1/64 componentes (Dropdown)
📋 Backlog:        15 tarefas organizadas
⏱️ Tempo Estimado: 8-12 horas
```

---

## 🚀 Sprint 1: Quick Wins (1-2 horas)

### Task 1.1: Corrigir Status DONE Headers
**Prioridade**: 🔴 Alta | **Estimativa**: 15 minutos | **Impacto**: 95.3% → 100%

**Objetivo**: Adicionar marcador "Status: ✅ DONE" nos headers dos componentes faltantes.

**Arquivos**:
1. `src/stories/atoms/actions/Button.stories.js`
2. `src/stories/molecules/forms/SearchField.stories.js`
3. `src/stories/organisms/data-display/DataTable.stories.js`

**Critérios de Aceitação**:
- [ ] Header de cada arquivo contém `Status: ✅ DONE`
- [ ] Validação PowerShell confirma 64/64 componentes
- [ ] Commit: `chore: adicionar status markers faltantes (100%)`

**Comandos de Validação**:
```powershell
# Verificar contagem final
$all = Get-ChildItem -Path "src\stories" -Recurse -Filter "*.stories.js"
$done = $all | Where-Object { (Get-Content $_.FullName -Raw) -match 'Status:.*DONE' }
Write-Host "Status: $($done.Count)/$($all.Count) componentes"
```

---

### Task 1.2: Commit Dropdown Interactive
**Prioridade**: 🔴 Alta | **Estimativa**: 10 minutos

**Objetivo**: Commitar a implementação do Dropdown com Bootstrap JS.

**Arquivos Modificados**:
- `src/stories/molecules/navigation/Dropdown.stories.js`
- `INTEGRATION_SUMMARY.md`
- `agent_helpers/tarefas.md`

**Critérios de Aceitação**:
- [ ] Git status limpo
- [ ] Commit message: `feat: adicionar Bootstrap JS loader ao Dropdown`
- [ ] Push para origin/main bem-sucedido

**Comandos**:
```bash
git add .
git commit -m "feat: adicionar Bootstrap JS loader ao Dropdown

- Implementar Interactive story com loader para /vuexy/js/bootstrap.js
- 6 variações funcionais: Básico, Ícones, Split Button, Right Aligned, Active/Disabled, Sizes
- Documentação completa com instruções de teste
- Atualizar documentação de progresso (INTEGRATION_SUMMARY.md, tarefas.md)"
git push origin main
```

---

## 🎨 Sprint 2: Bootstrap JS Components (3-4 horas)

### Task 2.1: Tooltip Interactive
**Prioridade**: 🟡 Média | **Estimativa**: 30 minutos

**Objetivo**: Adicionar Bootstrap JS loader ao Tooltip para interatividade real.

**Arquivo**: `src/stories/molecules/feedback/Tooltip.stories.js`

**Implementação**:
```javascript
export const Interactive = {
  parameters: {
    docs: {
      description: {
        story: `
### Tooltip com Bootstrap JS Real

Demonstra tooltips funcionando com Bootstrap JS:
- ✅ Hover mostra tooltip
- ✅ Focus mostra tooltip (acessibilidade)
- ✅ Posicionamento automático (top, bottom, left, right)
- ✅ Multiple tooltips na mesma página
        `
      }
    }
  },
  loaders: [
    async () => {
      if (typeof window !== 'undefined' && !window.bootstrap) {
        return new Promise((resolve, reject) => {
          const script = document.createElement('script');
          script.src = '/vuexy/js/bootstrap.js';
          script.onload = () => {
            console.log('✅ Bootstrap JS carregado para Tooltip');
            resolve({ bootstrapLoaded: true });
          };
          script.onerror = () => reject(new Error('Failed to load Bootstrap JS'));
          document.head.appendChild(script);
        });
      }
      return { bootstrapLoaded: true };
    }
  ],
  render: () => {
    setTimeout(() => {
      if (typeof bootstrap !== 'undefined') {
        const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
        [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));
      }
    }, 100);
    
    return `
      <div style="padding: 50px; text-align: center;">
        <h5 class="mb-4">Tooltips Interativos</h5>
        
        <div class="d-flex gap-3 justify-content-center flex-wrap">
          <button type="button" class="btn btn-primary" 
                  data-bs-toggle="tooltip" 
                  data-bs-placement="top" 
                  title="Tooltip no topo">
            Top
          </button>
          
          <button type="button" class="btn btn-secondary" 
                  data-bs-toggle="tooltip" 
                  data-bs-placement="right" 
                  title="Tooltip à direita">
            Right
          </button>
          
          <button type="button" class="btn btn-success" 
                  data-bs-toggle="tooltip" 
                  data-bs-placement="bottom" 
                  title="Tooltip embaixo">
            Bottom
          </button>
          
          <button type="button" class="btn btn-danger" 
                  data-bs-toggle="tooltip" 
                  data-bs-placement="left" 
                  title="Tooltip à esquerda">
            Left
          </button>
        </div>
        
        <div class="alert alert-info mt-4">
          <strong>💡 Teste:</strong> Passe o mouse sobre os botões para ver os tooltips
        </div>
      </div>
    `;
  }
};
```

**Critérios de Aceitação**:
- [ ] Tooltips aparecem no hover
- [ ] 4 posicionamentos funcionando (top, right, bottom, left)
- [ ] Console log confirma carregamento do Bootstrap JS
- [ ] Documentação atualizada

---

### Task 2.2: Popover Interactive
**Prioridade**: 🟡 Média | **Estimativa**: 30 minutos

**Objetivo**: Adicionar Bootstrap JS loader ao Popover.

**Arquivo**: `src/stories/molecules/feedback/Popover.stories.js`

**Template** (similar ao Tooltip):
```javascript
export const Interactive = {
  // Loader igual ao Tooltip
  // render com bootstrap.Popover initialization
  // 4 posicionamentos + dismiss on next click
};
```

**Critérios de Aceitação**:
- [ ] Popovers abrem no click
- [ ] Fecham ao clicar fora
- [ ] Title e content renderizando
- [ ] 4 posicionamentos funcionando

---

### Task 2.3: Modal Enhanced
**Prioridade**: 🟡 Média | **Estimativa**: 45 minutos

**Objetivo**: Adicionar Bootstrap JS ao Modal Interactive existente (já tem versão custom).

**Arquivo**: `src/stories/organisms/feedback/Modal.stories.js`

**Estratégia**:
- Modal já tem Interactive story com custom JS
- Criar nova story "InteractiveBootstrap" com Bootstrap JS oficial
- Comparar comportamentos (custom vs Bootstrap)

**Critérios de Aceitação**:
- [ ] Modal abre/fecha com Bootstrap JS
- [ ] Backdrop funciona
- [ ] Escape key funciona (com Bootstrap)
- [ ] Documentação compara custom vs Bootstrap

---

### Task 2.4: Offcanvas Interactive
**Prioridade**: 🟡 Média | **Estimativa**: 40 minutos

**Objetivo**: Adicionar Bootstrap JS loader ao Offcanvas.

**Arquivo**: `src/stories/organisms/navigation/Offcanvas.stories.js`

**Funcionalidades**:
- Slide in/out (left, right, top, bottom)
- Backdrop
- Escape key
- Scroll behavior

**Critérios de Aceitação**:
- [ ] Offcanvas abre das 4 direções
- [ ] Backdrop funciona
- [ ] Body scroll lock funciona
- [ ] Close button funciona

---

### Task 2.5: Collapse/Accordion Enhanced
**Prioridade**: 🟢 Baixa | **Estimativa**: 30 minutos

**Objetivo**: Adicionar Bootstrap JS ao Accordion se necessário.

**Arquivo**: `src/stories/organisms/surfaces/Accordion.stories.js`

**Critérios de Aceitação**:
- [ ] Accordion expande/colapsa suavemente
- [ ] Apenas um item aberto por vez (se single)
- [ ] Animação de transição suave

---

## 📦 Sprint 3: Vendor Libraries (4-6 horas)

### Task 3.1: Datepicker com Flatpickr
**Prioridade**: 🟡 Média | **Estimativa**: 1 hora

**Objetivo**: Adicionar Flatpickr library ao Datepicker.

**Arquivo**: `src/stories/molecules/forms/Datepicker.stories.js`

**Vendor Path**: `/vuexy/vendors/libs/flatpickr/flatpickr.js`

**Loaders** (2 arquivos):
```javascript
loaders: [
  async () => {
    // Loader para CSS
    if (!document.querySelector('link[href*="flatpickr.css"]')) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = '/vuexy/vendors/libs/flatpickr/flatpickr.css';
      document.head.appendChild(link);
    }
    
    // Loader para JS
    if (typeof window !== 'undefined' && !window.flatpickr) {
      return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = '/vuexy/vendors/libs/flatpickr/flatpickr.js';
        script.onload = () => {
          console.log('✅ Flatpickr carregado');
          resolve({ flatpickrLoaded: true });
        };
        script.onerror = () => reject(new Error('Failed to load Flatpickr'));
        document.head.appendChild(script);
      });
    }
    return { flatpickrLoaded: true };
  }
]
```

**Funcionalidades**:
- Date picker básico
- Range picker (start + end date)
- Time picker
- Date + Time picker
- Inline calendar
- Localization (pt-BR)

**Critérios de Aceitação**:
- [ ] Flatpickr CSS e JS carregam sem erros
- [ ] 6 variações funcionando
- [ ] Formatação de data correta
- [ ] Locale pt-BR (se disponível)

---

### Task 3.2: Calendar com FullCalendar
**Prioridade**: 🟡 Média | **Estimativa**: 1.5 horas

**Objetivo**: Adicionar FullCalendar ao Calendar component.

**Arquivo**: `src/stories/organisms/data-display/Calendar.stories.js`

**Vendor Path**: `/vuexy/vendors/libs/fullcalendar/index.global.min.js`

**Funcionalidades**:
- Month view
- Week view
- Day view
- List view
- Event creation
- Drag & drop events
- Resize events

**Critérios de Aceitação**:
- [ ] FullCalendar renderiza corretamente
- [ ] 4 views funcionando
- [ ] Events são clicáveis
- [ ] Navegação entre meses funciona

---

### Task 3.3: Select Advanced com Select2
**Prioridade**: 🟢 Baixa | **Estimativa**: 45 minutos

**Objetivo**: Adicionar Select2 ao Select component (se existir advanced variant).

**Arquivo**: `src/stories/molecules/forms/Select.stories.js` ou criar novo

**Vendor Path**: `/vuexy/vendors/libs/select2/select2.js`

**Funcionalidades**:
- Search/filter options
- Multi-select
- Tags
- Ajax loading (simulado)
- Custom templates

**Critérios de Aceitação**:
- [ ] Select2 CSS e JS carregam
- [ ] Search funciona
- [ ] Multi-select funciona
- [ ] Clear button funciona

---

### Task 3.4: WYSIWYG Editor com Quill
**Prioridade**: 🟢 Baixa | **Estimativa**: 1 hora

**Objetivo**: Adicionar Quill editor (se componente existir).

**Arquivo**: Verificar se existe `RichTextEditor.stories.js` ou similar

**Vendor Paths**:
- `/vuexy/vendors/libs/quill/katex.js`
- `/vuexy/vendors/libs/quill/quill.js`

**Funcionalidades**:
- Rich text formatting
- Bold, italic, underline
- Lists (ordered, unordered)
- Links
- Images (opcional)
- Code blocks

**Critérios de Aceitação**:
- [ ] Quill renderiza corretamente
- [ ] Toolbar funciona
- [ ] Formatting aplica-se ao texto
- [ ] Content pode ser recuperado

---

### Task 3.5: Charts com ApexCharts
**Prioridade**: 🟢 Baixa | **Estimativa**: 1 hora

**Objetivo**: Adicionar ApexCharts (se componente existir).

**Arquivo**: Verificar se existe `Chart.stories.js` ou similar

**Vendor Path**: `/vuexy/vendors/libs/apex-charts/apexcharts.js`

**Tipos de Charts**:
- Line chart
- Bar chart
- Pie chart
- Area chart
- Donut chart

**Critérios de Aceitação**:
- [ ] ApexCharts carrega sem erros
- [ ] 5 tipos de charts renderizam
- [ ] Dados são customizáveis
- [ ] Animações funcionam

---

### Task 3.6: DataTables Enhanced
**Prioridade**: 🟢 Baixa | **Estimativa**: 1.5 horas

**Objetivo**: Adicionar DataTables JS ao DataTable component existente.

**Arquivo**: `src/stories/organisms/data-display/DataTable.stories.js`

**Vendor Path**: `/vuexy/vendors/libs/datatables-bs5/datatables-bootstrap5.js`

**Funcionalidades**:
- Pagination
- Sorting (todas as colunas)
- Search/filter
- Export (CSV, Excel, PDF)
- Responsive mode
- Row selection

**Critérios de Aceitação**:
- [ ] DataTables JS carrega
- [ ] Sorting funciona
- [ ] Search funciona
- [ ] Pagination funciona
- [ ] Responsive em mobile

---

### Task 3.7: Stepper com BS Stepper
**Prioridade**: 🟢 Baixa | **Estimativa**: 45 minutos

**Objetivo**: Adicionar BS Stepper ao Stepper component existente.

**Arquivo**: `src/stories/molecules/navigation/Stepper.stories.js`

**Vendor Path**: `/vuexy/vendors/libs/bs-stepper/bs-stepper.js`

**Funcionalidades**:
- Linear stepper (não pode pular)
- Non-linear stepper (pode pular)
- Vertical stepper
- Horizontal stepper
- Validation por step

**Critérios de Aceitação**:
- [ ] BS Stepper carrega
- [ ] Next/Previous funciona
- [ ] Validação funciona (se implementada)
- [ ] Estados visual corretos (active, completed, disabled)

---

## 🔍 Sprint 4: Validação e Refinamentos (1-2 horas)

### Task 4.1: Teste de Regressão
**Prioridade**: 🔴 Alta | **Estimativa**: 1 hora

**Objetivo**: Testar todos os 64 componentes para garantir que nada quebrou.

**Checklist**:
- [ ] Todos os componentes renderizam sem erros
- [ ] Nenhum 404 no console
- [ ] CSS carrega corretamente
- [ ] Interactive stories funcionam
- [ ] Loaders não conflitam entre si
- [ ] Storybook inicia em < 3 segundos

**Comandos**:
```bash
npm run storybook
# Navegar manualmente por cada categoria
# Verificar console do navegador
```

---

### Task 4.2: Documentação Final
**Prioridade**: 🟡 Média | **Estimativa**: 30 minutos

**Objetivo**: Atualizar toda documentação para refletir 100% completion.

**Arquivos**:
- `README.md` - Adicionar seção "Interactive Components"
- `INTEGRATION_SUMMARY.md` - Marcar 100% completo
- `agent_helpers/tarefas.md` - Atualizar status final
- `BACKLOG.md` - Marcar todas as tasks como completas

**Critérios de Aceitação**:
- [ ] README menciona 64 componentes completos
- [ ] Lista de componentes com loaders
- [ ] Instruções de uso dos loaders
- [ ] Screenshots (opcional)

---

### Task 4.3: Performance Optimization
**Prioridade**: 🟢 Baixa | **Estimativa**: 30 minutos

**Objetivo**: Otimizar loaders para evitar carregamentos duplicados.

**Estratégia**:
1. Criar loader helper em `src/stories/_helpers/loaders.js`
2. Singleton pattern para Bootstrap JS
3. Cache de vendor libraries
4. Lazy loading quando possível

**Exemplo**:
```javascript
// src/stories/_helpers/loaders.js
export const loadBootstrapJS = (() => {
  let loadingPromise = null;
  
  return async () => {
    if (window.bootstrap) {
      return { bootstrapLoaded: true };
    }
    
    if (!loadingPromise) {
      loadingPromise = new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = '/vuexy/js/bootstrap.js';
        script.onload = () => resolve({ bootstrapLoaded: true });
        script.onerror = () => reject(new Error('Failed to load Bootstrap JS'));
        document.head.appendChild(script);
      });
    }
    
    return loadingPromise;
  };
})();
```

**Critérios de Aceitação**:
- [ ] Helper file criado
- [ ] Loaders refatorados para usar helper
- [ ] Console mostra apenas 1 carregamento por library
- [ ] Performance não degrada

---

## 📈 Métricas de Sucesso

### Critérios de Conclusão Geral:
- ✅ 64/64 componentes com Status: DONE
- ✅ 18+ componentes com Interactive stories
- ✅ 13+ componentes com Bootstrap/vendor loaders
- ✅ 0 erros de console no Storybook
- ✅ Documentação 100% atualizada
- ✅ Todos os commits pushed para GitHub

### KPIs:
- **Coverage**: 100% dos componentes implementados
- **Interatividade**: 28% com Interactive stories (18/64)
- **JS Loaders**: 20% com loaders (13/64)
- **Tempo Total**: 8-12 horas estimadas
- **Erros**: 0 compilation/runtime errors

---

## 🗓️ Timeline Sugerido

### Dia 1 (2-3 horas)
- ✅ Sprint 1 completo (Task 1.1 + 1.2)
- ✅ Task 2.1 (Tooltip)
- ✅ Task 2.2 (Popover)

### Dia 2 (3-4 horas)
- ✅ Task 2.3 (Modal Enhanced)
- ✅ Task 2.4 (Offcanvas)
- ✅ Task 3.1 (Datepicker)

### Dia 3 (3-4 horas)
- ✅ Task 3.2 (Calendar)
- ✅ Task 3.3 (Select2)
- ✅ Task 3.6 (DataTables)

### Dia 4 (2 horas)
- ✅ Task 4.1 (Teste de Regressão)
- ✅ Task 4.2 (Documentação Final)
- ✅ Commit final + push

---

## 🚨 Riscos e Mitigações

### Risco 1: Vendor Libraries Faltando
**Probabilidade**: Baixa | **Impacto**: Alto

**Mitigação**:
- Verificar existência de arquivos antes de implementar
- Usar CDN como fallback se necessário
- Documentar libraries ausentes

### Risco 2: Conflitos entre Libraries
**Probabilidade**: Média | **Impacto**: Médio

**Mitigação**:
- Testar cada loader individualmente
- Usar namespaces quando disponível
- Implementar cleanup functions

### Risco 3: Performance Degradation
**Probabilidade**: Baixa | **Impacto**: Médio

**Mitigação**:
- Lazy loading de libraries pesadas
- Singleton pattern para loaders compartilhados
- Monitorar tempo de carregamento do Storybook

---

## 📞 Próximos Passos Imediatos

1. **Executar Task 1.1** (15 min) - Corrigir 3 headers → 100%
2. **Executar Task 1.2** (10 min) - Commit Dropdown
3. **Executar Task 2.1** (30 min) - Tooltip Interactive
4. **Review** - Validar Dropdown + Tooltip funcionando

**Comando de início**:
```bash
# Task 1.1
# Editar Button.stories.js, SearchField.stories.js, DataTable.stories.js

# Task 1.2
git add .
git commit -m "feat: adicionar Bootstrap JS loader ao Dropdown"
git push origin main

# Task 2.1
# Editar Tooltip.stories.js
# Testar no Storybook
```

---

## ✅ Definition of Done

Uma task está completa quando:
- [ ] Código implementado e testado no Storybook
- [ ] Console sem erros 404 ou runtime
- [ ] Interactive story funciona conforme esperado
- [ ] Documentação no story atualizada
- [ ] Commit criado com mensagem descritiva
- [ ] Push para GitHub bem-sucedido
- [ ] Backlog atualizado com ✅

---

**Documento mantido por**: GitHub Copilot  
**Última revisão**: 31 de janeiro de 2026  
**Versão**: 1.0
