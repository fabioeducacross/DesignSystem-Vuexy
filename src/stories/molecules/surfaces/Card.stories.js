/**
 * Card - Molecule
 * Status: ✅ DONE
 */
import { formatHtmlSnippet } from '../../_helpers/snippets';
export default {
  title: 'Vuexy/Molecules/Surfaces/Card',
  tags: ['autodocs'],
  parameters: { docs: { description: { component: '# Card - Container de conteúdo do Vuexy' } } },
  argTypes: {
    title: { control: 'text', table: { defaultValue: { summary: 'Card Title' } } },
    body: { control: 'text', table: { defaultValue: { summary: 'Card body content' } } },
    footer: { control: 'text', table: { defaultValue: { summary: '' } } }
  }
};
const createCard = ({ title = 'Card Title', body = 'Card body content goes here. This is some example text.', footer = '' }) =>
  `<div class="card">
  <div class="card-header">${title}</div>
  <div class="card-body">${body}</div>
  ${footer ? `<div class="card-footer">${footer}</div>` : ''}
</div>`;
const Template = (args) => `${createCard(args)}<hr/><details><summary><strong>Code</strong></summary><pre><code>${formatHtmlSnippet(createCard(args)).replace(/</g, '&lt;')}</code></pre></details>`;
export const Overview = () => `<div class="row g-3"><div class="col-6">${createCard({title:'Simple Card', body:'Basic card with header and body'})}</div><div class="col-6">${createCard({title:'With Footer', body:'Card with footer', footer:'Card Footer'})}</div></div>`;
export const Default = Template.bind({});
Default.args = { title: 'Card Title', body: 'Card body content', footer: '' };

export const Interactive = {
  render: () => {
    return `
      <div class="p-4" style="max-width: 500px;">
        <h5>Interactive Card Demo</h5>
        <p class="text-muted">Expand/collapse card content</p>
        
        <div class="card">
          <div class="card-header d-flex justify-content-between align-items-center" onclick="toggleCard()" style="cursor:pointer;">
            <span>Collapsible Card</span>
            <i class="bx bx-chevron-down" id="chevron"></i>
          </div>
          <div class="card-body" id="cardBody">
            <h5 class="card-title">Card Content</h5>
            <p class="card-text">This is the card body content that can be collapsed. Click the header to toggle visibility.</p>
            <p class="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            <button class="btn btn-primary btn-sm">Action</button>
          </div>
        </div>
        
        <script>
          let isExpanded = true;
          
          function toggleCard() {
            const body = document.getElementById('cardBody');
            const chevron = document.getElementById('chevron');
            
            if (isExpanded) {
              body.style.display = 'none';
              chevron.className = 'bx bx-chevron-right';
            } else {
              body.style.display = 'block';
              chevron.className = 'bx bx-chevron-down';
            }
            
            isExpanded = !isExpanded;
          }
        </script>
        
        <small class="d-block mt-3 text-muted">Interactive demo via controlled state</small>
      </div>
    `;
  }
};
