/**
 * ListTablePagination - Table Pagination Controls
 * ================================================
 * Controles de paginação para tabelas com múltiplas páginas
 * 
 * @component ListTablePagination
 * @category Educacross Components V2 / Tables
 * @source educacross-frontoffice (listas de alunos, missões, relatórios)
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
