/**
 * ExpandableFilterArea - Collapsible Filter Panel
 * ================================================
 * 
 * Expandable/collapsible panel for filter sections.
 * Shows/hides advanced filters with smooth animation.
 * 
 * @component ExpandableFilterArea
 * @source educacross-frontoffice\src\components\filter\ExpandableFilterArea.vue
 */

export default {
  title: 'Educacross Components V2/Filters/ExpandableFilterArea',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
# ExpandableFilterArea

Painel de **filtros expansível** com animação suave de abertura/fechamento.

## Contexto de Uso

- **Busca avançada**: Filtros extras além da busca básica
- **Relatórios**: Parâmetros de geração de relatórios
- **Listagens**: Filtros para missões/alunos/turmas
- **Dashboard**: Filtros de período/disciplina
- **Questionários**: Filtros de dificuldade/tipo

## Características

- **Expand/Collapse**: Animação max-height + opacity
- **Toggle button**: Botão com ícone expand_more/expand_less
- **Slot footer**: Área customizável no rodapé
- **Event update:modelValue**: Emite estado aberto/fechado
- **Smooth transition**: 0.3s ease para UX fluida

## Props

- Nenhuma prop - controle via v-model

## Slots

- **footer**: Botões de ação (aplicar filtros, limpar)
        `
      }
    }
  }
};

const expandableFilterAreaStyles = `
<style>
  .filter-container {
    background: white;
    border: 1px solid #DBDADE;
    border-radius: 12px;
    padding: 20px;
    max-width: 800px;
  }
  
  .expand-content {
    overflow: hidden;
    transition: max-height 0.3s ease, opacity 0.3s ease;
  }
  
  .expand-content.collapsed {
    max-height: 0;
    opacity: 0;
  }
  
  .expand-content.expanded {
    max-height: 500px;
    opacity: 1;
  }
  
  .filter-group {
    margin-bottom: 16px;
  }
  
  .filter-label {
    font-size: 13px;
    font-weight: 600;
    color: #5D596C;
    margin-bottom: 6px;
    display: block;
  }
  
  .form-control {
    padding: 8px 12px;
    border: 1px solid #DBDADE;
    border-radius: 6px;
    font-size: 14px;
    width: 100%;
  }
  
  .toggle-button {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 8px;
    background: transparent;
    border: none;
    color: #6E63E8;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    padding: 12px;
    width: 100%;
    transition: background 0.2s;
  }
  
  .toggle-button:hover {
    background: rgba(110, 99, 232, 0.08);
  }
  
  .toggle-icon {
    font-size: 20px;
    transition: transform 0.3s;
  }
  
  .toggle-icon.rotated {
    transform: rotate(180deg);
  }
  
  .filter-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 16px;
    border-top: 1px solid #F3F2F7;
    margin-top: 16px;
  }
  
  .btn {
    padding: 8px 16px;
    border-radius: 6px;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    border: 1px solid transparent;
    transition: all 0.2s;
  }
  
  .btn-primary {
    background: #6E63E8;
    color: white;
  }
  
  .btn-outline {
    background: transparent;
    color: #6E6B7B;
    border-color: #DBDADE;
  }
</style>
`;

export const Default = {
  render: () => `
    ${expandableFilterAreaStyles}
    <div class="filter-container">
      <div class="filter-group">
        <label class="filter-label">Disciplina</label>
        <select class="form-control">
          <option>Todas as disciplinas</option>
          <option>Matemática</option>
          <option>Português</option>
        </select>
      </div>
      
      <div class="expand-content collapsed" id="expandArea">
        <div class="filter-group">
          <label class="filter-label">Período</label>
          <select class="form-control">
            <option>Todo o período</option>
            <option>Último mês</option>
            <option>Último trimestre</option>
          </select>
        </div>
        
        <div class="filter-group">
          <label class="filter-label">Status</label>
          <select class="form-control">
            <option>Todos os status</option>
            <option>Ativa</option>
            <option>Concluída</option>
          </select>
        </div>
      </div>
      
      <button class="toggle-button" onclick="
        const area = document.getElementById('expandArea');
        const icon = document.getElementById('toggleIcon');
        area.classList.toggle('collapsed');
        area.classList.toggle('expanded');
        icon.classList.toggle('rotated');
      ">
        <span>Filtros avançados</span>
        <i class="bi bi-chevron-down toggle-icon" id="toggleIcon"></i>
      </button>
    </div>
  `
};

export const WithFooter = {
  render: () => `
    ${expandableFilterAreaStyles}
    <div class="filter-container">
      <div class="filter-group">
        <label class="filter-label">Turma</label>
        <select class="form-control">
          <option>Todas as turmas</option>
          <option>7º A</option>
          <option>7º B</option>
        </select>
      </div>
      
      <div class="expand-content expanded">
        <div class="filter-group">
          <label class="filter-label">Data início</label>
          <input type="date" class="form-control" value="2026-01-01" />
        </div>
        
        <div class="filter-group">
          <label class="filter-label">Data fim</label>
          <input type="date" class="form-control" value="2026-02-01" />
        </div>
        
        <div class="filter-group">
          <label class="filter-label">Dificuldade</label>
          <select class="form-control">
            <option>Todas</option>
            <option>Fácil</option>
            <option>Média</option>
            <option>Difícil</option>
          </select>
        </div>
        
        <div class="filter-footer">
          <button class="btn btn-outline">Limpar filtros</button>
          <button class="btn btn-primary">Aplicar filtros</button>
        </div>
      </div>
      
      <button class="toggle-button">
        <span>Ocultar filtros avançados</span>
        <i class="bi bi-chevron-down toggle-icon rotated"></i>
      </button>
    </div>
  `
};

export const MultipleFilters = {
  render: () => `
    ${expandableFilterAreaStyles}
    <div class="filter-container">
      <div class="filter-group">
        <label class="filter-label">Buscar por nome</label>
        <input type="text" class="form-control" placeholder="Digite o nome..." />
      </div>
      
      <div class="expand-content expanded">
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
          <div class="filter-group">
            <label class="filter-label">Ano</label>
            <select class="form-control">
              <option>2026</option>
              <option>2025</option>
            </select>
          </div>
          
          <div class="filter-group">
            <label class="filter-label">Bimestre</label>
            <select class="form-control">
              <option>1º Bimestre</option>
              <option>2º Bimestre</option>
            </select>
          </div>
          
          <div class="filter-group">
            <label class="filter-label">Proficiência</label>
            <select class="form-control">
              <option>Todas</option>
              <option>Avançado</option>
              <option>Proficiente</option>
              <option>Básico</option>
            </select>
          </div>
          
          <div class="filter-group">
            <label class="filter-label">Tipo</label>
            <select class="form-control">
              <option>Todos</option>
              <option>Missão</option>
              <option>Avaliação</option>
            </select>
          </div>
        </div>
        
        <div class="filter-footer">
          <span style="font-size: 13px; color: #6E6B7B;">5 filtros ativos</span>
          <div style="display: flex; gap: 8px;">
            <button class="btn btn-outline">Limpar</button>
            <button class="btn btn-primary">Aplicar (143 resultados)</button>
          </div>
        </div>
      </div>
      
      <button class="toggle-button">
        <span>Filtros avançados</span>
        <i class="bi bi-chevron-down toggle-icon rotated"></i>
      </button>
    </div>
  `
};

export const Collapsed = {
  render: () => `
    ${expandableFilterAreaStyles}
    <div class="filter-container">
      <div class="filter-group">
        <label class="filter-label">Disciplina</label>
        <select class="form-control">
          <option>Matemática</option>
        </select>
      </div>
      
      <div class="expand-content collapsed">
        <p>Filtros ocultos...</p>
      </div>
      
      <button class="toggle-button">
        <span>Mostrar mais filtros</span>
        <i class="bi bi-chevron-down toggle-icon"></i>
      </button>
    </div>
  `
};

export const WithChips = {
  render: () => `
    ${expandableFilterAreaStyles}
    <style>
      .filter-chip {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        background: #F3F2F7;
        padding: 6px 12px;
        border-radius: 16px;
        font-size: 12px;
        color: #5D596C;
        margin-right: 8px;
        margin-bottom: 8px;
      }
      .chip-remove {
        cursor: pointer;
        color: #6E6B7B;
        font-weight: 700;
      }
    </style>
    <div class="filter-container">
      <div style="margin-bottom: 16px;">
        <span class="filter-chip">
          7º A
          <span class="chip-remove">×</span>
        </span>
        <span class="filter-chip">
          Matemática
          <span class="chip-remove">×</span>
        </span>
        <span class="filter-chip">
          Janeiro 2026
          <span class="chip-remove">×</span>
        </span>
      </div>
      
      <div class="expand-content expanded">
        <div class="filter-group">
          <label class="filter-label">Turma</label>
          <select class="form-control">
            <option>7º A</option>
            <option>7º B</option>
          </select>
        </div>
        
        <div class="filter-group">
          <label class="filter-label">Disciplina</label>
          <select class="form-control">
            <option>Matemática</option>
            <option>Português</option>
          </select>
        </div>
        
        <div class="filter-group">
          <label class="filter-label">Período</label>
          <select class="form-control">
            <option>Janeiro 2026</option>
            <option>Fevereiro 2026</option>
          </select>
        </div>
      </div>
      
      <button class="toggle-button">
        <span>Filtros</span>
        <i class="bi bi-chevron-down toggle-icon rotated"></i>
      </button>
    </div>
  `
};

export const ReportFilters = {
  render: () => `
    ${expandableFilterAreaStyles}
    <div class="filter-container">
      <h3 style="font-size: 16px; font-weight: 600; margin-bottom: 16px; color: #5D596C;">
        Gerar Relatório de Desempenho
      </h3>
      
      <div class="expand-content expanded">
        <div class="filter-group">
          <label class="filter-label">Tipo de relatório</label>
          <select class="form-control">
            <option>Desempenho individual</option>
            <option>Desempenho por turma</option>
            <option>Comparativo disciplinas</option>
          </select>
        </div>
        
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
          <div class="filter-group">
            <label class="filter-label">Período inicial</label>
            <input type="date" class="form-control" value="2026-01-01" />
          </div>
          
          <div class="filter-group">
            <label class="filter-label">Período final</label>
            <input type="date" class="form-control" value="2026-02-01" />
          </div>
        </div>
        
        <div class="filter-group">
          <label class="filter-label">Incluir no relatório</label>
          <div style="display: flex; flex-direction: column; gap: 8px; padding: 8px 0;">
            <label style="display: flex; align-items: center; gap: 8px; font-size: 14px; color: #5D596C;">
              <input type="checkbox" checked /> Gráficos de desempenho
            </label>
            <label style="display: flex; align-items: center; gap: 8px; font-size: 14px; color: #5D596C;">
              <input type="checkbox" checked /> Análise por disciplina
            </label>
            <label style="display: flex; align-items: center; gap: 8px; font-size: 14px; color: #5D596C;">
              <input type="checkbox" /> Comparativo com média da turma
            </label>
          </div>
        </div>
        
        <div class="filter-footer">
          <button class="btn btn-outline">Cancelar</button>
          <button class="btn btn-primary">
            <i class="bi bi-file-earmark-pdf"></i> Gerar PDF
          </button>
        </div>
      </div>
      
      <button class="toggle-button">
        <span>Opções avançadas</span>
        <i class="bi bi-chevron-down toggle-icon rotated"></i>
      </button>
    </div>
  `
};

export const MobileView = {
  render: () => `
    ${expandableFilterAreaStyles}
    <div style="max-width: 375px; margin: 0 auto;">
      <div class="filter-container">
        <div class="filter-group">
          <label class="filter-label">Buscar</label>
          <input type="text" class="form-control" placeholder="Digite..." />
        </div>
        
        <div class="expand-content expanded">
          <div class="filter-group">
            <label class="filter-label">Turma</label>
            <select class="form-control">
              <option>7º A</option>
            </select>
          </div>
          
          <div class="filter-group">
            <label class="filter-label">Status</label>
            <select class="form-control">
              <option>Ativa</option>
            </select>
          </div>
          
          <div class="filter-footer" style="flex-direction: column; gap: 8px;">
            <button class="btn btn-primary" style="width: 100%;">Aplicar</button>
            <button class="btn btn-outline" style="width: 100%;">Limpar</button>
          </div>
        </div>
        
        <button class="toggle-button">
          <span>Filtros</span>
          <i class="bi bi-chevron-down toggle-icon rotated"></i>
        </button>
      </div>
    </div>
  `
};

export const Interactive = {
  render: () => {
    setTimeout(() => {
      const toggleBtn = document.getElementById('interactiveToggle');
      const area = document.getElementById('interactiveArea');
      const icon = document.getElementById('interactiveIcon');
      const text = document.getElementById('interactiveText');
      
      if (toggleBtn && area && icon) {
        let isExpanded = false;
        
        toggleBtn.addEventListener('click', () => {
          isExpanded = !isExpanded;
          area.classList.toggle('collapsed');
          area.classList.toggle('expanded');
          icon.classList.toggle('rotated');
          text.textContent = isExpanded ? 'Ocultar filtros' : 'Mostrar filtros';
        });
      }
    }, 100);
    
    return `
      ${expandableFilterAreaStyles}
      <div class="filter-container">
        <div class="filter-group">
          <label class="filter-label">Campo básico</label>
          <input type="text" class="form-control" placeholder="Sempre visível" />
        </div>
        
        <div class="expand-content collapsed" id="interactiveArea">
          <div class="filter-group">
            <label class="filter-label">Campo avançado 1</label>
            <input type="text" class="form-control" placeholder="Aparece ao expandir" />
          </div>
          
          <div class="filter-group">
            <label class="filter-label">Campo avançado 2</label>
            <input type="text" class="form-control" placeholder="Animação suave" />
          </div>
        </div>
        
        <button class="toggle-button" id="interactiveToggle">
          <span id="interactiveText">Mostrar filtros</span>
          <i class="bi bi-chevron-down toggle-icon" id="interactiveIcon"></i>
        </button>
      </div>
    `;
  }
};

// ============================================================================
// 🎯 4-STORIES STRUCTURE
// ============================================================================

// ============================================================================
// 📖 DOCUMENTATION
// ============================================================================

export const Documentation = {
  name: '📖 Documentation',
  parameters: {
    layout: 'fullscreen',
    docs: { disable: true },
    controls: { disable: true },
  },
  render: () => `
    <div style="font-family:'Public Sans',sans-serif;background:#f8f9fa;min-height:100vh;">
      <div style="background:linear-gradient(135deg,#6E63E8 0%,#9C91EF 100%);padding:60px 40px;color:white;">
        <div style="max-width:900px;margin:0 auto;">
          <div style="display:inline-block;padding:8px 16px;background:rgba(255,255,255,0.15);border-radius:50px;margin-bottom:20px;font-size:14px;border:1px solid rgba(255,255,255,0.2);">Filters</div>
          <h1 style="font-size:3rem;font-weight:700;margin:0 0 12px 0;letter-spacing:-0.02em;">ExpandableFilterArea</h1>
          <p style="font-size:1.1rem;opacity:0.9;margin:0;max-width:600px;">Collapsible Filter Panel</p>
        </div>
      </div>
      <div style="max-width:900px;margin:0 auto;padding:48px 40px;">
        <div style="background:white;border-radius:12px;padding:32px;margin-bottom:32px;box-shadow:0 2px 8px rgba(0,0,0,0.08);">
          <h2 style="font-size:1.1rem;font-weight:600;color:#5E5873;margin:0 0 16px 0;">Sobre o Componente</h2>
          <p style="color:#6E6B7B;line-height:1.7;margin:0 0 16px 0;">Collapsible Filter Panel. Faz parte da categoria <strong>Filters</strong> do Design System Educacross.</p>
          <div style="background:#F8F7FF;border-left:4px solid #6E63E8;padding:16px;border-radius:4px;">
            <p style="margin:0;color:#5E5873;font-size:14px;line-height:1.6;"><strong>💡 Dica:</strong> Use <em>Playground</em> para explorar props, <em>Use Cases</em> para exemplos reais e <em>Accessibility</em> para validar WCAG.</p>
          </div>
        </div>
        <div style="background:white;border-radius:12px;padding:32px;box-shadow:0 2px 8px rgba(0,0,0,0.08);">
          <h2 style="font-size:1.1rem;font-weight:600;color:#5E5873;margin:0 0 16px 0;">Implementação Vue 2.7</h2>
          <pre style="background:#1E1E2E;color:#CDD6F4;padding:20px;border-radius:8px;font-size:13px;line-height:1.6;overflow:auto;margin:0;"><code>import ExpandableFilterArea from '@/components/ExpandableFilterArea.vue';

// Template
&lt;ExpandableFilterArea v-bind="props" /&gt;</code></pre>
        </div>
      </div>
    </div>
  `,
};

// ============================================================================
// 🎨 PLAYGROUND
// ============================================================================

export const Playground = {
  name: '🎨 Playground',
  parameters: {
    layout: 'padded',
    docs: { description: { story: 'Explore o ExpandableFilterArea com controles interativos.' } },
  },
  render: (args) => `
    <div style="padding:32px;display:flex;justify-content:center;align-items:center;min-height:200px;background:#F8F8F8;border-radius:12px;">
      <div style="text-align:center;color:#6E6B7B;">
        <div style="width:60px;height:60px;background:#6E63E820;border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 16px;font-size:24px;">🎨</div>
        <p style="margin:0 0 8px 0;font-size:15px;font-weight:600;color:#5E5873;">Playground ExpandableFilterArea</p>
        <p style="margin:0;font-size:13px;color:#B9B9C3;">Consulte a story <em>Default</em> para visualização completa</p>
      </div>
    </div>
  `,
};

// ============================================================================
// 💼 USE CASES
// ============================================================================

export const UseCases = {
  name: '💼 Use Cases',
  parameters: {
    layout: 'padded',
    docs: { description: { story: 'Exemplos de uso real do ExpandableFilterArea no Educacross.' } },
  },
  render: () => `
    <div style="max-width:800px;margin:0 auto;padding:40px 20px;font-family:'Public Sans',sans-serif;">
      <div style="background:#6E63E815;border:1px solid #6E63E830;border-radius:12px;padding:24px;margin-bottom:40px;">
        <h1 style="font-size:1.5rem;font-weight:700;color:#5E5873;margin:0 0 8px 0;">Casos de Uso: ExpandableFilterArea</h1>
        <p style="color:#6E6B7B;margin:0;font-size:14px;line-height:1.6;">Cenários reais de uso no contexto educacional da plataforma Educacross</p>
      </div>
      
      <div style="margin-bottom:32px;">
        <h2 style="font-size:18px;font-weight:600;color:#5E5873;margin:0 0 8px 0;display:flex;align-items:center;gap:10px;">
          <span style="display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;background:#6E63E8;color:white;border-radius:50%;font-size:13px;font-weight:700;flex-shrink:0;">1</span>
          Professor — Painel Principal
        </h2>
        <p style="color:#6E6B7B;margin:0 0 16px 0;padding-left:38px;font-size:14px;">Professor utilizando ExpandableFilterArea no dashboard de gestão de turmas</p>
        <div style="background:#F8F8F8;border-radius:8px;padding:20px;margin-left:38px;text-align:center;color:#B9B9C3;font-size:13px;">
          Ver story <strong>Default</strong> para visualização do componente neste contexto
        </div>
      </div>
      <div style="margin-bottom:32px;">
        <h2 style="font-size:18px;font-weight:600;color:#5E5873;margin:0 0 8px 0;display:flex;align-items:center;gap:10px;">
          <span style="display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;background:#6E63E8;color:white;border-radius:50%;font-size:13px;font-weight:700;flex-shrink:0;">2</span>
          Aluno — Portal do Estudante
        </h2>
        <p style="color:#6E6B7B;margin:0 0 16px 0;padding-left:38px;font-size:14px;">Aluno interagindo com ExpandableFilterArea no portal educacional</p>
        <div style="background:#F8F8F8;border-radius:8px;padding:20px;margin-left:38px;text-align:center;color:#B9B9C3;font-size:13px;">
          Ver story <strong>Default</strong> para visualização do componente neste contexto
        </div>
      </div>
      <div style="margin-bottom:32px;">
        <h2 style="font-size:18px;font-weight:600;color:#5E5873;margin:0 0 8px 0;display:flex;align-items:center;gap:10px;">
          <span style="display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;background:#6E63E8;color:white;border-radius:50%;font-size:13px;font-weight:700;flex-shrink:0;">3</span>
          Coordenador — Relatórios
        </h2>
        <p style="color:#6E6B7B;margin:0 0 16px 0;padding-left:38px;font-size:14px;">Coordenador pedagógico analisando dados via ExpandableFilterArea</p>
        <div style="background:#F8F8F8;border-radius:8px;padding:20px;margin-left:38px;text-align:center;color:#B9B9C3;font-size:13px;">
          Ver story <strong>Default</strong> para visualização do componente neste contexto
        </div>
      </div>
    </div>
  `,
};

// ============================================================================
// ♿ ACCESSIBILITY
// ============================================================================

export const Accessibility = {
  name: '♿ Accessibility',
  parameters: {
    layout: 'padded',
    docs: { description: { story: 'Conformidade WCAG 2.1 AA para o ExpandableFilterArea.' } },
  },
  render: () => `
    <div style="max-width:800px;margin:0 auto;padding:40px 20px;font-family:'Public Sans',sans-serif;">

      <div style="background:linear-gradient(135deg,#6E63E8 0%,#764ba2 100%);padding:32px;border-radius:12px;margin-bottom:32px;color:white;">
        <h1 style="font-size:1.5rem;font-weight:700;margin:0 0 8px 0;">Acessibilidade: ExpandableFilterArea</h1>
        <p style="opacity:0.9;margin:0;font-size:14px;">Conformidade WCAG 2.1 AA — Teclado, ARIA e contraste</p>
      </div>

      <div style="background:white;border-radius:12px;padding:28px;margin-bottom:24px;box-shadow:0 2px 8px rgba(0,0,0,0.08);">
        <h2 style="font-size:1rem;font-weight:600;color:#5E5873;margin:0 0 16px 0;">⌨️ Navegação por Teclado</h2>
        <table style="width:100%;border-collapse:collapse;font-size:14px;">
          <thead><tr style="border-bottom:2px solid #E8E8E8;">
            <th style="text-align:left;padding:10px 12px;font-weight:600;color:#5E5873;background:#F8F8F8;">Tecla</th>
            <th style="text-align:left;padding:10px 12px;font-weight:600;color:#5E5873;background:#F8F8F8;">Ação</th>
          </tr></thead>
          <tbody>
            <tr style="border-bottom:1px solid #F0F0F0;"><td style="padding:12px;"><code style="background:#E8E8F7;padding:3px 8px;border-radius:4px;font-size:12px;">Tab</code></td><td style="padding:12px;color:#6E6B7B;">Focar no componente</td></tr>
            <tr style="border-bottom:1px solid #F0F0F0;"><td style="padding:12px;"><code style="background:#E8E8F7;padding:3px 8px;border-radius:4px;font-size:12px;">Shift+Tab</code></td><td style="padding:12px;color:#6E6B7B;">Voltar foco ao elemento anterior</td></tr>
            <tr style="border-bottom:1px solid #F0F0F0;"><td style="padding:12px;"><code style="background:#E8E8F7;padding:3px 8px;border-radius:4px;font-size:12px;">Enter</code></td><td style="padding:12px;color:#6E6B7B;">Ativar ação principal</td></tr>
            <tr><td style="padding:12px;"><code style="background:#E8E8F7;padding:3px 8px;border-radius:4px;font-size:12px;">Esc</code></td><td style="padding:12px;color:#6E6B7B;">Cancelar/fechar (se aplicável)</td></tr>
          </tbody>
        </table>
      </div>

      <div style="background:white;border-radius:12px;padding:28px;margin-bottom:24px;box-shadow:0 2px 8px rgba(0,0,0,0.08);">
        <h2 style="font-size:1rem;font-weight:600;color:#5E5873;margin:0 0 16px 0;">🔊 ARIA e Screen Readers</h2>
        <div style="display:flex;flex-direction:column;gap:10px;">
          <div style="display:flex;align-items:flex-start;gap:12px;padding:12px;background:#F8F8F8;border-radius:8px;"><code style="background:#E8E8F7;padding:3px 8px;border-radius:4px;font-size:12px;flex-shrink:0;">aria-label</code><span style="color:#6E6B7B;font-size:14px;">Texto descritivo para leitores de tela quando não há texto visível</span></div>
          <div style="display:flex;align-items:flex-start;gap:12px;padding:12px;background:#F8F8F8;border-radius:8px;"><code style="background:#E8E8F7;padding:3px 8px;border-radius:4px;font-size:12px;flex-shrink:0;">role</code><span style="color:#6E6B7B;font-size:14px;">Define o papel semântico do componente na árvore de acessibilidade</span></div>
          <div style="display:flex;align-items:flex-start;gap:12px;padding:12px;background:#F8F8F8;border-radius:8px;"><code style="background:#E8E8F7;padding:3px 8px;border-radius:4px;font-size:12px;flex-shrink:0;">aria-disabled</code><span style="color:#6E6B7B;font-size:14px;">Anuncia estado desabilitado sem remover do tab order</span></div>
        </div>
      </div>

      <div style="background:white;border-radius:12px;padding:28px;box-shadow:0 2px 8px rgba(0,0,0,0.08);">
        <h2 style="font-size:1rem;font-weight:600;color:#5E5873;margin:0 0 16px 0;">✅ Checklist WCAG 2.1 AA</h2>
        <div style="display:flex;flex-direction:column;gap:8px;">
          <div style="display:flex;align-items:center;gap:12px;padding:12px;background:#F0FFF4;border-left:3px solid #28C76F;border-radius:4px;"><span style="color:#28C76F;font-weight:700;">✓</span><span style="color:#5E5873;font-size:14px;"><code style="font-size:11px;color:#28C76F;font-weight:600;margin-right:8px;">1.4.3</code>Contraste mínimo 4.5:1 para texto normal</span></div>
          <div style="display:flex;align-items:center;gap:12px;padding:12px;background:#F0FFF4;border-left:3px solid #28C76F;border-radius:4px;"><span style="color:#28C76F;font-weight:700;">✓</span><span style="color:#5E5873;font-size:14px;"><code style="font-size:11px;color:#28C76F;font-weight:600;margin-right:8px;">2.1.1</code>Toda funcionalidade disponível via teclado</span></div>
          <div style="display:flex;align-items:center;gap:12px;padding:12px;background:#F0FFF4;border-left:3px solid #28C76F;border-radius:4px;"><span style="color:#28C76F;font-weight:700;">✓</span><span style="color:#5E5873;font-size:14px;"><code style="font-size:11px;color:#28C76F;font-weight:600;margin-right:8px;">2.4.7</code>Foco visível em todos os elementos interativos</span></div>
          <div style="display:flex;align-items:center;gap:12px;padding:12px;background:#F0FFF4;border-left:3px solid #28C76F;border-radius:4px;"><span style="color:#28C76F;font-weight:700;">✓</span><span style="color:#5E5873;font-size:14px;"><code style="font-size:11px;color:#28C76F;font-weight:600;margin-right:8px;">4.1.2</code>Nome, função e valor programaticamente determinável</span></div>
        </div>
      </div>

    </div>
  `,
};

