/**
 * Breadcrumb - Molecule (Navigation)
 * 
 * Source: packages/vuexy_theme/public/vuexy/css/core.css (.breadcrumb)
 * Priority: P0 (Critical)
 * Status: ✅ DONE
 */

import { formatHtmlSnippet, formatReactSnippet } from '../../_helpers/snippets';

export default {
  title: 'Molecules/Navigation/Breadcrumb',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
# Breadcrumb

Navegação hierárquica do Vuexy mostrando o caminho atual da página.

## Quando usar
- Mostrar localização na hierarquia do site
- Navegação secundária
- Sites com estrutura profunda (3+ níveis)

## Acessibilidade
- Use \`<nav>\` com \`aria-label="breadcrumb"\`
- Último item deve ter \`aria-current="page"\`
- Links devem ser descritivos
        `
      }
    }
  },
  argTypes: {
    showIcons: { 
      control: 'boolean',
      description: 'Mostra ícones nos items',
      table: { defaultValue: { summary: false } }
    },
    items: {
      control: 'object',
      description: 'Array de items do breadcrumb',
      table: { defaultValue: { summary: '[]' } }
    }
  }
};

const createBreadcrumb = ({ items = [], showIcons = false }) => {
  if (items.length === 0) {
    items = [
      { label: 'Home', href: '#', icon: 'bx bx-home' },
      { label: 'Library', href: '#', icon: 'bx bx-library' },
      { label: 'Data', active: true, icon: 'bx bx-data' }
    ];
  }

  return `<nav aria-label="breadcrumb">
  <ol class="breadcrumb">
    ${items.map((item, index) => {
      const iconHtml = showIcons && item.icon ? `<i class="${item.icon} me-1"></i>` : '';
      const linkContent = `${iconHtml}${item.label}`;
      const activeClass = item.active ? 'active' : '';
      const ariaCurrent = item.active ? ' aria-current="page"' : '';

      return `<li class="breadcrumb-item ${activeClass}"${ariaCurrent}>
      ${item.href && !item.active ? `<a href="${item.href}">${linkContent}</a>` : linkContent}
    </li>`;
    }).join('\n    ')}
  </ol>
</nav>`;
};

const Template = (args) => {
  const markup = createBreadcrumb(args);
  
  return `
    <div>
      ${markup}
    </div>
    
    <hr class="my-5" />
    
    <details>
      <summary><strong>Code Snippets</strong></summary>
      <div class="mt-3">
        <h6>HTML</h6>
        <pre><code>${formatHtmlSnippet(markup).replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
        <h6>React</h6>
        <pre><code>${formatReactSnippet(markup, 'Breadcrumb').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
      </div>
    </details>
  `;
};

export const Overview = () => `
  <div class="row g-4">
    <div class="col-12">
      <h5>Básico</h5>
      ${createBreadcrumb({ items: [
        { label: 'Home', href: '#' },
        { label: 'Library', href: '#' },
        { label: 'Data', active: true }
      ]})}
    </div>
    <div class="col-12">
      <h5>Com Ícones</h5>
      ${createBreadcrumb({ 
        showIcons: true,
        items: [
          { label: 'Home', href: '#', icon: 'bx bx-home' },
          { label: 'Library', href: '#', icon: 'bx bx-library' },
          { label: 'Data', active: true, icon: 'bx bx-data' }
        ]
      })}
    </div>
    <div class="col-12">
      <h5>Caminho Longo</h5>
      ${createBreadcrumb({ items: [
        { label: 'Home', href: '#' },
        { label: 'Admin', href: '#' },
        { label: 'Users', href: '#' },
        { label: 'Settings', href: '#' },
        { label: 'Profile', active: true }
      ]})}
    </div>
  </div>
`;

export const Default = Template.bind({});
Default.args = {
  showIcons: false,
  items: [
    { label: 'Home', href: '#' },
    { label: 'Library', href: '#' },
    { label: 'Data', active: true }
  ]
};

export const WithIcons = Template.bind({});
WithIcons.args = {
  showIcons: true,
  items: [
    { label: 'Home', href: '#', icon: 'bx bx-home' },
    { label: 'Documents', href: '#', icon: 'bx bx-folder' },
    { label: 'Reports', href: '#', icon: 'bx bx-file' },
    { label: 'Annual Report', active: true, icon: 'bx bx-data' }
  ]
};

export const Interactive = {
  render: () => {
    return `
      <div class="p-4">
        <h5>Interactive Breadcrumb Demo</h5>
        <p class="text-muted">Navigate through the trail</p>
        
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb" id="breadcrumbList">
            <li class="breadcrumb-item"><a href="#" onclick="event.preventDefault(); navigate(0);">Home</a></li>
            <li class="breadcrumb-item"><a href="#" onclick="event.preventDefault(); navigate(1);">Library</a></li>
            <li class="breadcrumb-item"><a href="#" onclick="event.preventDefault(); navigate(2);">Documents</a></li>
            <li class="breadcrumb-item active" aria-current="page">Current Page</li>
          </ol>
        </nav>
        
        <div class="alert alert-info">Depth: <strong id="depth">4</strong> levels</div>
        
        <script>
          const items = ['Home', 'Library', 'Documents', 'Current Page'];
          let currentDepth = 3;
          
          function navigate(index) {
            currentDepth = index;
            const breadcrumb = document.getElementById('breadcrumbList');
            breadcrumb.innerHTML = '';
            
            for (let i = 0; i <= currentDepth; i++) {
              const li = document.createElement('li');
              li.className = 'breadcrumb-item';
              
              if (i === currentDepth) {
                li.classList.add('active');
                li.setAttribute('aria-current', 'page');
                li.textContent = items[i];
              } else {
                const a = document.createElement('a');
                a.href = '#';
                a.textContent = items[i];
                a.onclick = (e) => { e.preventDefault(); navigate(i); };
                li.appendChild(a);
              }
              
              breadcrumb.appendChild(li);
            }
            
            document.getElementById('depth').textContent = currentDepth + 1;
          }
        </script>
        
        <small class="d-block mt-3 text-muted">Interactive demo via controlled state</small>
      </div>
    `;
  }
};
