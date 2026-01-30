/**
 * PaginationItem - Molecule
 * Status: ✅ DONE
 */
import { formatHtmlSnippet } from '../../_helpers/snippets';

export default {
  title: 'Molecules/Navigation/PaginationItem',
  tags: ['autodocs'],
  parameters: { 
    docs: { 
      description: { 
        component: '# Pagination - Navegação por páginas' 
      } 
    } 
  },
  argTypes: {
    totalPages: { control: 'number', table: { defaultValue: { summary: 5 } } },
    currentPage: { control: 'number', table: { defaultValue: { summary: 1 } } }
  }
};

const createPagination = ({ totalPages = 5, currentPage = 1 }) => {
  return `<nav>
  <ul class="pagination">
    <li class="page-item${currentPage === 1 ? ' disabled' : ''}">
      <a class="page-link" href="#">Previous</a>
    </li>
    ${Array.from({length:totalPages}, (_, i) => i+1).map(page => 
      `<li class="page-item${page === currentPage ? ' active' : ''}"><a class="page-link" href="#">${page}</a></li>`
    ).join('\n')}
    <li class="page-item${currentPage === totalPages ? ' disabled' : ''}">
      <a class="page-link" href="#">Next</a>
    </li>
  </ul>
</nav>`;
};

const Template = (args) => {
  const markup = createPagination(args);
  return `
    <div>
      ${markup}
      <hr/>
      <details>
        <summary><strong>Code</strong></summary>
        <pre><code>${formatHtmlSnippet(markup).replace(/</g, '&lt;')}</code></pre>
      </details>
    </div>
  `;
};

export const Overview = () => {
  return `
    <div class="d-flex flex-column gap-3">
      ${createPagination({totalPages:5, currentPage:1})}
      ${createPagination({totalPages:5, currentPage:3})}
      ${createPagination({totalPages:10, currentPage:5})}
    </div>
  `;
};

export const Default = Template.bind({});
Default.args = { totalPages: 5, currentPage: 1 };

Default.args = { totalPages: 5, currentPage: 1 };
