/**
 * Pagination - Organism (Data Display)
 * 
 * Source: packages/vuexy_theme/public/vuexy/css/core.css (.pagination, .page-item, .page-link)
 * Priority: P0 (Critical)
 * Status: ✅ DONE
 * 
 * Componente completo de paginação com ellipsis e navegação.
 */

import { formatHtmlSnippet, formatReactSnippet, formatVue2Snippet, formatVue3Snippet } from '../../_helpers/snippets';

export default {
  title: 'Vuexy/Organisms/Data Display/Pagination',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
# Pagination

Sistema completo de paginação do Vuexy para navegação entre páginas de dados.

## Quando usar
- Tabelas com muitos registros
- Listas longas que precisam ser divididas
- Resultados de busca paginados

## Composição
- **Previous/Next** - Botões de navegação
- **Page Numbers** - Links para páginas específicas
- **Ellipsis** - Indicador (...) para páginas ocultas
- **Active State** - Página atual destacada

## Variantes
- Small: .pagination-sm
- Large: .pagination-lg
- Rounded: .pagination-rounded

## Acessibilidade
- \`role="navigation"\` no wrapper
- \`aria-label\` nos botões previous/next
- \`aria-current="page"\` na página ativa
- \`aria-disabled\` em botões desabilitados
        `
      }
    }
  },
  argTypes: {
    totalPages: {
      control: { type: 'number', min: 1, max: 100 },
      description: 'Total de páginas',
      table: { defaultValue: { summary: 10 } }
    },
    currentPage: {
      control: { type: 'number', min: 1 },
      description: 'Página atual',
      table: { defaultValue: { summary: 1 } }
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Tamanho da paginação',
      table: { defaultValue: { summary: 'md' } }
    },
    showFirstLast: {
      control: 'boolean',
      description: 'Mostra botões First/Last',
      table: { defaultValue: { summary: true } }
    },
    maxVisible: {
      control: { type: 'number', min: 3, max: 10 },
      description: 'Número máximo de páginas visíveis',
      table: { defaultValue: { summary: 7 } }
    }
  }
};

const generatePageNumbers = (currentPage, totalPages, maxVisible) => {
  const pages = [];
  
  if (totalPages <= maxVisible) {
    // Mostra todas as páginas
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
  } else {
    // Algoritmo com ellipsis
    const halfVisible = Math.floor(maxVisible / 2);
    let startPage = Math.max(1, currentPage - halfVisible);
    let endPage = Math.min(totalPages, currentPage + halfVisible);
    
    // Ajusta se estiver no início
    if (currentPage <= halfVisible) {
      endPage = maxVisible;
    }
    
    // Ajusta se estiver no fim
    if (currentPage > totalPages - halfVisible) {
      startPage = totalPages - maxVisible + 1;
    }
    
    // Adiciona primeira página e ellipsis
    if (startPage > 1) {
      pages.push(1);
      if (startPage > 2) pages.push('...');
    }
    
    // Adiciona páginas do meio
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    
    // Adiciona ellipsis e última página
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) pages.push('...');
      pages.push(totalPages);
    }
  }
  
  return pages;
};

const createPagination = ({ 
  totalPages = 10, 
  currentPage = 1, 
  size = 'md', 
  showFirstLast = true,
  maxVisible = 7 
}) => {
  const sizeClass = size !== 'md' ? `pagination-${size}` : '';
  const pages = generatePageNumbers(currentPage, totalPages, maxVisible);
  
  const firstButton = showFirstLast ? `
    <li class="page-item ${currentPage === 1 ? 'disabled' : ''}">
      <a class="page-link" href="#" aria-label="First">
        <i class="tf-icon bx bx-chevrons-left"></i>
      </a>
    </li>` : '';
  
  const lastButton = showFirstLast ? `
    <li class="page-item ${currentPage === totalPages ? 'disabled' : ''}">
      <a class="page-link" href="#" aria-label="Last">
        <i class="tf-icon bx bx-chevrons-right"></i>
      </a>
    </li>` : '';
  
  const pageItems = pages.map(page => {
    if (page === '...') {
      return `
        <li class="page-item disabled">
          <span class="page-link">...</span>
        </li>`;
    }
    
    const isActive = page === currentPage;
    return `
      <li class="page-item ${isActive ? 'active' : ''}">
        <a class="page-link" href="#" ${isActive ? 'aria-current="page"' : ''}>${page}</a>
      </li>`;
  }).join('');
  
  return `<nav aria-label="Page navigation">
  <ul class="pagination ${sizeClass}">
    ${firstButton}
    
    <li class="page-item ${currentPage === 1 ? 'disabled' : ''}">
      <a class="page-link" href="#" aria-label="Previous">
        <i class="tf-icon bx bx-chevron-left"></i>
      </a>
    </li>
    
    ${pageItems}
    
    <li class="page-item ${currentPage === totalPages ? 'disabled' : ''}">
      <a class="page-link" href="#" aria-label="Next">
        <i class="tf-icon bx bx-chevron-right"></i>
      </a>
    </li>
    
    ${lastButton}
  </ul>
</nav>`;
};

const Template = (args) => {
  const markup = createPagination(args);
  
  return `
    <div>
      ${markup}
    </div>
    
    <div class="mt-4">
      <p class="text-muted mb-2"><strong>Info:</strong> Página ${args.currentPage} de ${args.totalPages}</p>
      <p class="text-muted"><small>Total de ${args.totalPages * 10} items (10 por página)</small></p>
    </div>
    
    <hr class="my-5" />
    
    <details>
      <summary><strong>Code Snippets</strong></summary>
      <div class="mt-3">
        <h6>HTML</h6>
        <pre><code>${formatHtmlSnippet(markup).replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
        <h6>React</h6>
        <pre><code>${formatReactSnippet(markup, 'Pagination').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
        <h6>Vue 3</h6>
        <pre><code>${formatVue3Snippet(markup, 'Pagination').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
      </div>
    </details>
  `;
};

export const Overview = () => `
  <div class="row g-4">
    <div class="col-12">
      <h5>First Page</h5>
      ${createPagination({ currentPage: 1, totalPages: 10 })}
    </div>
    
    <div class="col-12">
      <h5>Middle Page</h5>
      ${createPagination({ currentPage: 5, totalPages: 10 })}
    </div>
    
    <div class="col-12">
      <h5>Last Page</h5>
      ${createPagination({ currentPage: 10, totalPages: 10 })}
    </div>
    
    <div class="col-12 mt-5">
      <h5>Sizes</h5>
      <div class="mb-3">
        <small class="text-muted d-block mb-2">Small</small>
        ${createPagination({ currentPage: 3, totalPages: 8, size: 'sm' })}
      </div>
      <div class="mb-3">
        <small class="text-muted d-block mb-2">Medium (Default)</small>
        ${createPagination({ currentPage: 3, totalPages: 8, size: 'md' })}
      </div>
      <div>
        <small class="text-muted d-block mb-2">Large</small>
        ${createPagination({ currentPage: 3, totalPages: 8, size: 'lg' })}
      </div>
    </div>
  </div>
`;

export const FirstPage = Template.bind({});
FirstPage.args = {
  totalPages: 15,
  currentPage: 1,
  size: 'md',
  showFirstLast: true,
  maxVisible: 7
};

export const MiddlePage = Template.bind({});
MiddlePage.args = {
  ...FirstPage.args,
  currentPage: 8
};

export const LastPage = Template.bind({});
LastPage.args = {
  ...FirstPage.args,
  currentPage: 15
};

export const SmallSize = Template.bind({});
SmallSize.args = {
  ...FirstPage.args,
  size: 'sm',
  currentPage: 5
};

export const ManyPages = Template.bind({});
ManyPages.args = {
  totalPages: 100,
  currentPage: 50,
  size: 'md',
  showFirstLast: true,
  maxVisible: 7
};

// ============ INTERACTIVE DEMO ============
export const Interactive = () => {
  const containerId = 'pagination-interactive-' + Math.random().toString(36).substr(2, 9);
  const totalPages = 15;
  
  const renderPagination = (currentPage) => {
    const pages = generatePageNumbers(currentPage, totalPages, 7);
    const showEllipsisStart = pages[0] > 1;
    const showEllipsisEnd = pages[pages.length - 1] < totalPages;
    
    return `
      <nav aria-label="Page navigation">
        <ul class="pagination" data-pagination>
          <!-- First -->
          <li class="page-item ${currentPage === 1 ? 'disabled' : ''}" data-page="first">
            <a class="page-link" href="javascript:void(0)">
              <i class="tf-icon bx bx-chevrons-left"></i>
            </a>
          </li>
          
          <!-- Previous -->
          <li class="page-item ${currentPage === 1 ? 'disabled' : ''}" data-page="prev">
            <a class="page-link" href="javascript:void(0)">
              <i class="tf-icon bx bx-chevron-left"></i>
            </a>
          </li>
          
          <!-- Ellipsis Start -->
          ${showEllipsisStart ? `
            <li class="page-item disabled">
              <span class="page-link">...</span>
            </li>` : ''}
          
          <!-- Pages -->
          ${pages.map(page => `
            <li class="page-item ${page === currentPage ? 'active' : ''}" data-page="${page}">
              <a class="page-link" href="javascript:void(0)">${page}</a>
            </li>`).join('')}
          
          <!-- Ellipsis End -->
          ${showEllipsisEnd ? `
            <li class="page-item disabled">
              <span class="page-link">...</span>
            </li>` : ''}
          
          <!-- Next -->
          <li class="page-item ${currentPage === totalPages ? 'disabled' : ''}" data-page="next">
            <a class="page-link" href="javascript:void(0)">
              <i class="tf-icon bx bx-chevron-right"></i>
            </a>
          </li>
          
          <!-- Last -->
          <li class="page-item ${currentPage === totalPages ? 'disabled' : ''}" data-page="last">
            <a class="page-link" href="javascript:void(0)">
              <i class="tf-icon bx bx-chevrons-right"></i>
            </a>
          </li>
        </ul>
      </nav>
      
      <div class="mt-3">
        <span class="badge bg-primary">Current Page: ${currentPage} of ${totalPages}</span>
      </div>
    `;
  };
  
  const markup = `<div id="${containerId}">${renderPagination(1)}</div>`;
  
  setTimeout(() => {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    let currentPage = 1;
    
    const updatePagination = (newPage) => {
      if (newPage < 1 || newPage > totalPages) return;
      currentPage = newPage;
      container.innerHTML = renderPagination(currentPage);
      attachListeners();
    };
    
    const attachListeners = () => {
      const items = container.querySelectorAll('.page-item:not(.disabled)');
      
      items.forEach(item => {
        const link = item.querySelector('.page-link');
        if (!link) return;
        
        link.addEventListener('click', (e) => {
          e.preventDefault();
          const pageAttr = item.getAttribute('data-page');
          
          if (pageAttr === 'first') {
            updatePagination(1);
          } else if (pageAttr === 'prev') {
            updatePagination(currentPage - 1);
          } else if (pageAttr === 'next') {
            updatePagination(currentPage + 1);
          } else if (pageAttr === 'last') {
            updatePagination(totalPages);
          } else {
            updatePagination(parseInt(pageAttr));
          }
        });
      });
    };
    
    attachListeners();
  }, 100);
  
  return `
    ${markup}
    <div class="alert alert-info mt-3">
      <strong>Interactive demo:</strong> Click on page numbers or navigation buttons. First/Previous are disabled on page 1, Next/Last are disabled on page ${totalPages}.
    </div>
  `;
};
Interactive.parameters = {
  docs: {
    description: {
      story: 'Interactive pagination demo with working page navigation and boundary limits.'
    }
  }
};
