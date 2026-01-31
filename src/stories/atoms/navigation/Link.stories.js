/**
 * Link - Atom (Navigation)
 * Status: ✅ DONE
 */
import { formatHtmlSnippet } from '../../_helpers/snippets';
export default {
  title: 'Atoms/Navigation/Link',
  tags: ['autodocs'],
  parameters: { docs: { description: { component: '# Link\nLink estilizado do Vuexy.' } } },
  argTypes: {
    href: { control: 'text', table: { defaultValue: { summary: '#' } } },
    text: { control: 'text', table: { defaultValue: { summary: 'Link' } } },
    color: { control: 'select', options: ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'dark'], table: { defaultValue: { summary: 'primary' } } }
  }
};
const createLink = ({ href = '#', text = 'Link', color = 'primary' }) => `<a href="${href}" class="link-${color}">${text}</a>`;
const Template = (args) => `<div>${createLink(args)}</div><hr/><details><summary><strong>Code</strong></summary><pre><code>${formatHtmlSnippet(createLink(args)).replace(/</g, '&lt;')}</code></pre></details>`;
export const Overview = () => `<div class="d-flex flex-column gap-2">${['primary','secondary','success','danger','warning','info','dark'].map(c => createLink({text: c, color: c})).join('\n')}</div>`;
export const Default = Template.bind({});
Default.args = { href: '#', text: 'Link Text', color: 'primary' };

export const Interactive = {
  render: () => {
    return `
      <div class="p-4">
        <h5>Interactive Link Demo</h5>
        <p class="text-muted">Toggle visited state</p>
        
        <style>
          #interactiveLink.visited { 
            color: #6f42c1 !important; 
            text-decoration: underline;
          }
        </style>
        
        <div class="mb-3">
          <a href="#" class="link-primary" id="interactiveLink" onclick="event.preventDefault();">Visit this link</a>
          <span class="badge bg-secondary ms-2" id="visitBadge">Not visited</span>
        </div>
        
        <button class="btn btn-outline-primary btn-sm" onclick="
          const link = document.getElementById('interactiveLink');
          const badge = document.getElementById('visitBadge');
          if (link.classList.contains('visited')) {
            link.classList.remove('visited');
            badge.textContent = 'Not visited';
            badge.className = 'badge bg-secondary ms-2';
          } else {
            link.classList.add('visited');
            badge.textContent = 'Visited';
            badge.className = 'badge bg-success ms-2';
          }
        ">Toggle Visited State</button>
        
        <small class="d-block mt-3 text-muted">Interactive demo via controlled state</small>
      </div>
    `;
  }
};
