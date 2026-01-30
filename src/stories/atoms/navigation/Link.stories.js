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
