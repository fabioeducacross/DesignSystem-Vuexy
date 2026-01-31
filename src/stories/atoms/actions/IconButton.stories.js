/**
 * IconButton - Atom (Actions)
 * Status: ✅ DONE
 */
import { formatHtmlSnippet } from '../../_helpers/snippets';
export default {
  title: 'Atoms/Actions/IconButton',
  tags: ['autodocs'],
  parameters: { docs: { description: { component: '# Icon Button - Botão apenas com ícone do Vuexy' } } },
  argTypes: {
    variant: { control: 'select', options: ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'dark'], table: { defaultValue: { summary: 'primary' } } },
    outline: { control: 'boolean', table: { defaultValue: { summary: false } } },
    size: { control: 'select', options: ['sm', 'default', 'lg'], table: { defaultValue: { summary: 'default' } } },
    icon: { control: 'text', table: { defaultValue: { summary: 'bx bx-heart' } } }
  }
};
const createIconButton = ({ variant = 'primary', outline = false, size = 'default', icon = 'bx bx-heart' }) => {
  const variantClass = outline ? `btn-outline-${variant}` : `btn-${variant}`;
  const sizeClass = size === 'sm' ? 'btn-sm' : size === 'lg' ? 'btn-lg' : '';
  return `<button type="button" class="btn btn-icon ${variantClass} ${sizeClass}"><i class="${icon}"></i></button>`;
};
const Template = (args) => `<div>${createIconButton(args)}</div><hr/><details><summary><strong>Code</strong></summary><pre><code>${formatHtmlSnippet(createIconButton(args)).replace(/</g, '&lt;')}</code></pre></details>`;
export const Overview = () => `<div class="d-flex gap-2">${['primary','success','danger','warning','info'].map(c => createIconButton({variant: c, icon: 'bx bx-heart'})).join('\n')}</div>`;
export const Default = Template.bind({});
Default.args = { variant: 'primary', outline: false, size: 'default', icon: 'bx bx-heart' };
export const Outline = Template.bind({});
Outline.args = { variant: 'primary', outline: true, size: 'default', icon: 'bx bx-star' };

export const Interactive = {
  render: () => {
    return `
      <div class="p-4">
        <h5>Interactive Icon Button Demo</h5>
        <p class="text-muted">Toggle state and change icon dynamically</p>
        
        <div class="d-flex gap-3 align-items-center mb-3">
          <button type="button" class="btn btn-icon btn-primary" id="iconBtn">
            <i class="bx bx-heart" id="iconEl"></i>
          </button>
          <span id="statusText" class="badge bg-success">Enabled</span>
        </div>
        
        <div class="btn-group" role="group">
          <button class="btn btn-outline-secondary btn-sm" onclick="
            const btn = document.getElementById('iconBtn');
            const status = document.getElementById('statusText');
            if (btn.disabled) {
              btn.disabled = false;
              status.textContent = 'Enabled';
              status.className = 'badge bg-success';
            } else {
              btn.disabled = true;
              status.textContent = 'Disabled';
              status.className = 'badge bg-secondary';
            }
          ">Toggle Disabled</button>
          
          <button class="btn btn-outline-secondary btn-sm" onclick="
            const icons = ['bx-heart', 'bx-star', 'bx-like', 'bx-bell', 'bx-bookmark'];
            const iconEl = document.getElementById('iconEl');
            const current = iconEl.className.split(' ').find(c => c.startsWith('bx-'));
            const currentIndex = icons.indexOf(current);
            const nextIndex = (currentIndex + 1) % icons.length;
            iconEl.className = 'bx ' + icons[nextIndex];
          ">Change Icon</button>
        </div>
        
        <small class="d-block mt-3 text-muted">Interactive demo via controlled state</small>
      </div>
    `;
  }
};
