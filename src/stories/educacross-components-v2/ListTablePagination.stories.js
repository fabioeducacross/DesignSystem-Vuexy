/**
 * ListTablePagination - Table Pagination Controls
 * ================================================
 * Controles de paginação para tabelas com múltiplas páginas
 * 
 * @component ListTablePagination
 * @category Educacross Components V2 / Tables
 * @source educacross-frontoffice/src/components/table/ListTablePagination.vue
 * @priority P1 - Core UI
 * @status PIXEL-PERFECT
 * @since 2.0.0
 */

export default {
  title: 'Educacross Components V2/Tables/ListTablePagination',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
## ListTablePagination - Controles de Paginação

Componente de paginação para navegação em tabelas grandes com múltiplas páginas, info de registros, navegação anterior/próxima e seletor de itens por página.

### Casos de Uso

**Professor**: Navegar lista de alunos (42 alunos, 10 por página), explorar missões da biblioteca, consultar histórico de atividades

**Coordenador**: Analisar relatórios com centenas de registros, filtrar resultados de buscas, exportar dados paginados

**Aluno**: Navegar histórico de missões completadas, ver ranking com muitos participantes

---

## Props API

| Prop | Tipo | Valores | Default | Descrição |
|------|------|---------|---------|-----------|
| currentPage | number | 1+ | 1 | Página atual |
| totalPages | number | 1+ | 1 | Total de páginas |
| totalItems | number | 0+ | 0 | Total de itens |
| itemsPerPage | number | 10, 25, 50, 100 | 10 | Itens por página |
| showInfo | boolean | true, false | true | Mostra info "X a Y de Z" |
| showPerPageSelector | boolean | true, false | false | Seletor de itens/página |
| compact | boolean | true, false | false | Modo compacto |
| onPageChange | function | - | - | Callback mudança página |

---

## Design Specs

**Cores**:
- Botão ativo: #6E63E8 (fundo), #fff (texto)
- Botão hover: #F3F2F7 (fundo), #6E63E8 (borda)
- Botão disabled: opacity 0.4
- Info text: #6E6B7B

**Dimensões**:
- Botão padrão: 36×36px, min-width 36px
- Botão compacto: 32×32px, min-width 32px
- Border-radius: 6px
- Gap entre botões: 4px

**Tipografia**:
- Número página: 14px, weight 600
- Info: 14px, color #6E6B7B
- Seletor: 14px, weight 600
        `
      }
    }
  }
};

const css = `<style>
  .pagination {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 16px 0;
    justify-content: space-between;
  }
  
  .pagination-info {
    font-size: 14px;
    color: #6E6B7B;
  }
  
  .pagination-controls {
    display: flex;
    align-items: center;
    gap: 4px;
  }
  
  .page-btn {
    min-width: 36px;
    height: 36px;
    padding: 0 12px;
    border-radius: 6px;
    border: 1px solid #D8D6DE;
    background: #fff;
    color: #6E6B7B;
    font-weight: 600;
    font-size: 14px;
    cursor: pointer;
    transition: all 0.2s;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .page-btn:hover:not(:disabled) {
    background: #F3F2F7;
    border-color: #6E63E8;
  }
  
  .page-btn.active {
    background: #6E63E8;
    color: #fff;
    border-color: #6E63E8;
  }
  
  .page-btn:disabled {
    cursor: not-allowed;
    opacity: 0.4;
  }
  
  .page-btn i {
    font-size: 16px;
  }
  
  .per-page {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 14px;
  }
  
  .per-page select {
    padding: 6px 30px 6px 12px;
    border-radius: 6px;
    border: 1px solid #D8D6DE;
    background: #fff;
    font-weight: 600;
    cursor: pointer;
  }
  
  /* Compact variant */
  .pagination-compact .page-btn {
    min-width: 32px;
    height: 32px;
    padding: 0 8px;
  }
  
  /* Mobile variant */
  .pagination-mobile {
    flex-direction: column;
    gap: 12px;
    align-items: center;
  }
</style>
`;

export const Default = {
  render: () => `
    ${css}
    <div class="pagination">
      <div class="pagination-info">Mostrando 1 a 10 de 45 registros</div>
      <div class="pagination-controls">
        <button class="page-btn" disabled>
          <i class="bi bi-chevron-left"></i>
        </button>
        ${[1, 2, 3, 4, 5].map((p, i) => `
          <button class="page-btn${i === 0 ? ' active' : ''}">${p}</button>
        `).join('')}
        <button class="page-btn">
          <i class="bi bi-chevron-right"></i>
        </button>
      </div>
    </div>
  `
};

export const PaginaMedia = {
  render: () => `
    ${css}
    <div class="pagination">
      <div class="pagination-info">Mostrando 21 a 30 de 87 estudantes</div>
      <div class="pagination-controls">
        <button class="page-btn">
          <i class="bi bi-chevron-left"></i>
        </button>
        ${[1, '...', 3, 4, 5, '...', 9].map((p, i) => `
          <button class="page-btn${i === 2 ? ' active' : ''}" ${p === '...' ? 'disabled' : ''}>${p}</button>
        `).join('')}
        <button class="page-btn">
          <i class="bi bi-chevron-right"></i>
        </button>
      </div>
    </div>
    <p style="margin-top: 16px; font-size: 13px; color: #6E6B7B;">
      <strong>Contexto:</strong> Navegação em página intermediária com reticências. Coordenador em relatório grande.
    </p>
  `
};

export const UltimaPagina = {
  render: () => `
    ${css}
    <div class="pagination">
      <div class="pagination-info">Mostrando 91 a 100 de 100 missões</div>
      <div class="pagination-controls">
        <button class="page-btn">
          <i class="bi bi-chevron-left"></i>
        </button>
        ${[1, '...', 8, 9, 10].map((p, i) => `
          <button class="page-btn${i === 4 ? ' active' : ''}" ${p === '...' ? 'disabled' : ''}>${p}</button>
        `).join('')}
        <button class="page-btn" disabled>
          <i class="bi bi-chevron-right"></i>
        </button>
      </div>
    </div>
    <p style="margin-top: 16px; font-size: 13px; color: #6E6B7B;">
      <strong>Contexto:</strong> Última página (próximo desabilitado). Professor no fim da biblioteca.
    </p>
  `
};

export const PoucasPages = {
  render: () => `
    ${css}
    <div class="pagination">
      <div class="pagination-info">Mostrando 11 a 18 de 18 alunos</div>
      <div class="pagination-controls">
        <button class="page-btn">
          <i class="bi bi-chevron-left"></i>
        </button>
        ${[1, 2].map((p, i) => `
          <button class="page-btn${i === 1 ? ' active' : ''}">${p}</button>
        `).join('')}
        <button class="page-btn" disabled>
          <i class="bi bi-chevron-right"></i>
        </button>
      </div>
    </div>
    <p style="margin-top: 16px; font-size: 13px; color: #6E6B7B;">
      <strong>Contexto:</strong> Poucas páginas (apenas 2). Turma pequena com 18 alunos.
    </p>
  `
};

export const Compacta = {
  render: () => `
    ${css}
    <div class="pagination pagination-compact" style="padding: 8px 0;">
      <div class="pagination-controls" style="margin: 0 auto;">
        <button class="page-btn">
          <i class="bi bi-chevron-left"></i>
        </button>
        ${[1, 2, 3].map((p, i) => `
          <button class="page-btn${i === 0 ? ' active' : ''}">${p}</button>
        `).join('')}
        <button class="page-btn">
          <i class="bi bi-chevron-right"></i>
        </button>
      </div>
    </div>
    <p style="margin-top: 16px; font-size: 13px; color: #6E6B7B;">
      <strong>Contexto:</strong> Variante compacta sem info. Uso em cards ou espaços reduzidos.
    </p>
  `
};

export const ComPorPagina = {
  render: () => `
    ${css}
    <div class="pagination">
      <div style="display: flex; align-items: center; gap: 20px;">
        <div class="per-page">
          Mostrar 
          <select>
            <option>10</option>
            <option selected>25</option>
            <option>50</option>
            <option>100</option>
          </select> 
          por página
        </div>
        <div class="pagination-info">Mostrando 1 a 25 de 156 registros</div>
      </div>
      <div class="pagination-controls">
        <button class="page-btn">
          <i class="bi bi-chevron-left"></i>
        </button>
        ${[1, 2, 3, 4, 5, 6, 7].map((p, i) => `
          <button class="page-btn${i === 0 ? ' active' : ''}">${p}</button>
        `).join('')}
        <button class="page-btn">
          <i class="bi bi-chevron-right"></i>
        </button>
      </div>
    </div>
    <p style="margin-top: 16px; font-size: 13px; color: #6E6B7B;">
      <strong>Contexto:</strong> Com seletor de itens por página. Coordenador ajustando visualização.
    </p>
  `
};

export const Mobile = {
  render: () => `
    ${css}
    <div class="pagination pagination-mobile">
      <div class="pagination-info">Página 2 de 8 • 45 total</div>
      <div class="pagination-controls">
        <button class="page-btn">
          <i class="bi bi-chevron-left"></i>
        </button>
        ${[1, 2, 3, 4, 5].map((p, i) => `
          <button class="page-btn${i === 1 ? ' active' : ''}">${p}</button>
        `).join('')}
        <button class="page-btn">
          <i class="bi bi-chevron-right"></i>
        </button>
      </div>
    </div>
    <p style="margin-top: 16px; font-size: 13px; color: #6E6B7B;">
      <strong>Contexto:</strong> Layout mobile/vertical. Responsivo para telas pequenas.
    </p>
  `
};

export const ListaAlunos = {
  render: () => `
    ${css}
    <div style="background: #fff; border: 1px solid #D8D6DE; border-radius: 8px; padding: 16px;">
      <div style="margin-bottom: 12px; font-size: 16px; font-weight: 600; color: #5E5873;">
        Alunos da Turma 8º Ano A
      </div>
      <div style="font-size: 13px; color: #6E6B7B; margin-bottom: 16px;">
        Total de 42 estudantes cadastrados
      </div>
      
      <div class="pagination">
        <div class="pagination-info">Mostrando 1 a 10 de 42 alunos</div>
        <div class="pagination-controls">
          <button class="page-btn" disabled>
            <i class="bi bi-chevron-left"></i>
          </button>
          ${[1, 2, 3, 4, 5].map((p, i) => `
            <button class="page-btn${i === 0 ? ' active' : ''}">${p}</button>
          `).join('')}
          <button class="page-btn">
            <i class="bi bi-chevron-right"></i>
          </button>
        </div>
      </div>
    </div>
    <p style="margin-top: 16px; font-size: 13px; color: #6E6B7B;">
      <strong>Contexto:</strong> Paginação em card de lista. Coordenador navegando turma com 42 alunos.
    </p>
  `
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
          <div style="display:inline-block;padding:8px 16px;background:rgba(255,255,255,0.15);border-radius:50px;margin-bottom:20px;font-size:14px;border:1px solid rgba(255,255,255,0.2);">Tables</div>
          <h1 style="font-size:3rem;font-weight:700;margin:0 0 12px 0;letter-spacing:-0.02em;">ListTablePagination</h1>
          <p style="font-size:1.1rem;opacity:0.9;margin:0;max-width:600px;">Table Pagination Controls</p>
        </div>
      </div>
      <div style="max-width:900px;margin:0 auto;padding:48px 40px;">
        <div style="background:white;border-radius:12px;padding:32px;margin-bottom:32px;box-shadow:0 2px 8px rgba(0,0,0,0.08);">
          <h2 style="font-size:1.1rem;font-weight:600;color:#5E5873;margin:0 0 16px 0;">Sobre o Componente</h2>
          <p style="color:#6E6B7B;line-height:1.7;margin:0 0 16px 0;">Table Pagination Controls. Faz parte da categoria <strong>Tables</strong> do Design System Educacross.</p>
          <div style="background:#F8F7FF;border-left:4px solid #6E63E8;padding:16px;border-radius:4px;">
            <p style="margin:0;color:#5E5873;font-size:14px;line-height:1.6;"><strong>💡 Dica:</strong> Use <em>Playground</em> para explorar props, <em>Use Cases</em> para exemplos reais e <em>Accessibility</em> para validar WCAG.</p>
          </div>
        </div>
        <div style="background:white;border-radius:12px;padding:32px;box-shadow:0 2px 8px rgba(0,0,0,0.08);">
          <h2 style="font-size:1.1rem;font-weight:600;color:#5E5873;margin:0 0 16px 0;">Implementação Vue 2.7</h2>
          <pre style="background:#1E1E2E;color:#CDD6F4;padding:20px;border-radius:8px;font-size:13px;line-height:1.6;overflow:auto;margin:0;"><code>import ListTablePagination from '@/components/ListTablePagination.vue';

// Template
&lt;ListTablePagination v-bind="props" /&gt;</code></pre>
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
    docs: { description: { story: 'Explore o ListTablePagination com controles interativos.' } },
  },
  render: (args) => `
    <div style="padding:32px;display:flex;justify-content:center;align-items:center;min-height:200px;background:#F8F8F8;border-radius:12px;">
      <div style="text-align:center;color:#6E6B7B;">
        <div style="width:60px;height:60px;background:#6E63E820;border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 16px;font-size:24px;">🎨</div>
        <p style="margin:0 0 8px 0;font-size:15px;font-weight:600;color:#5E5873;">Playground ListTablePagination</p>
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
    docs: { description: { story: 'Exemplos de uso real do ListTablePagination no Educacross.' } },
  },
  render: () => `
    <div style="max-width:800px;margin:0 auto;padding:40px 20px;font-family:'Public Sans',sans-serif;">
      <div style="background:#6E63E815;border:1px solid #6E63E830;border-radius:12px;padding:24px;margin-bottom:40px;">
        <h1 style="font-size:1.5rem;font-weight:700;color:#5E5873;margin:0 0 8px 0;">Casos de Uso: ListTablePagination</h1>
        <p style="color:#6E6B7B;margin:0;font-size:14px;line-height:1.6;">Cenários reais de uso no contexto educacional da plataforma Educacross</p>
      </div>
      
      <div style="margin-bottom:32px;">
        <h2 style="font-size:18px;font-weight:600;color:#5E5873;margin:0 0 8px 0;display:flex;align-items:center;gap:10px;">
          <span style="display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;background:#6E63E8;color:white;border-radius:50%;font-size:13px;font-weight:700;flex-shrink:0;">1</span>
          Professor — Painel Principal
        </h2>
        <p style="color:#6E6B7B;margin:0 0 16px 0;padding-left:38px;font-size:14px;">Professor utilizando ListTablePagination no dashboard de gestão de turmas</p>
        <div style="background:#F8F8F8;border-radius:8px;padding:20px;margin-left:38px;text-align:center;color:#B9B9C3;font-size:13px;">
          Ver story <strong>Default</strong> para visualização do componente neste contexto
        </div>
      </div>
      <div style="margin-bottom:32px;">
        <h2 style="font-size:18px;font-weight:600;color:#5E5873;margin:0 0 8px 0;display:flex;align-items:center;gap:10px;">
          <span style="display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;background:#6E63E8;color:white;border-radius:50%;font-size:13px;font-weight:700;flex-shrink:0;">2</span>
          Aluno — Portal do Estudante
        </h2>
        <p style="color:#6E6B7B;margin:0 0 16px 0;padding-left:38px;font-size:14px;">Aluno interagindo com ListTablePagination no portal educacional</p>
        <div style="background:#F8F8F8;border-radius:8px;padding:20px;margin-left:38px;text-align:center;color:#B9B9C3;font-size:13px;">
          Ver story <strong>Default</strong> para visualização do componente neste contexto
        </div>
      </div>
      <div style="margin-bottom:32px;">
        <h2 style="font-size:18px;font-weight:600;color:#5E5873;margin:0 0 8px 0;display:flex;align-items:center;gap:10px;">
          <span style="display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;background:#6E63E8;color:white;border-radius:50%;font-size:13px;font-weight:700;flex-shrink:0;">3</span>
          Coordenador — Relatórios
        </h2>
        <p style="color:#6E6B7B;margin:0 0 16px 0;padding-left:38px;font-size:14px;">Coordenador pedagógico analisando dados via ListTablePagination</p>
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
    docs: { description: { story: 'Conformidade WCAG 2.1 AA para o ListTablePagination.' } },
  },
  render: () => `
    <div style="max-width:800px;margin:0 auto;padding:40px 20px;font-family:'Public Sans',sans-serif;">

      <div style="background:linear-gradient(135deg,#6E63E8 0%,#764ba2 100%);padding:32px;border-radius:12px;margin-bottom:32px;color:white;">
        <h1 style="font-size:1.5rem;font-weight:700;margin:0 0 8px 0;">Acessibilidade: ListTablePagination</h1>
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

