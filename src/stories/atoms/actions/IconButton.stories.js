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
