/**
 * InputGroup - Molecule
 * Status: ✅ DONE
 */
import { formatHtmlSnippet } from '../../_helpers/snippets';
export default {
  title: 'Molecules/Forms/InputGroup',
  tags: ['autodocs'],
  parameters: { docs: { description: { component: '# Input Group - Input com addon/button' } } },
  argTypes: {
    prepend: { control: 'text', table: { defaultValue: { summary: '' } } },
    append: { control: 'text', table: { defaultValue: { summary: '' } } },
    placeholder: { control: 'text', table: { defaultValue: { summary: '' } } }
  }
};
const createInputGroup = ({ prepend = '@', append = '', placeholder = 'Username' }) => 
  `<div class="input-group">
  ${prepend ? `<span class="input-group-text">${prepend}</span>` : ''}
  <input type="text" class="form-control" placeholder="${placeholder}">
  ${append ? `<span class="input-group-text">${append}</span>` : ''}
</div>`;
const Template = (args) => `${createInputGroup(args)}<hr/><details><summary><strong>Code</strong></summary><pre><code>${formatHtmlSnippet(createInputGroup(args)).replace(/</g, '&lt;')}</code></pre></details>`;
export const Overview = () => `<div class="d-flex flex-column gap-3" style="max-width:400px">${createInputGroup({prepend:'@', placeholder:'Username'})}${createInputGroup({append:'.com', placeholder:'Website'})}${createInputGroup({prepend:'$', append:'.00', placeholder:'0.00'})}</div>`;
export const Default = Template.bind({});
Default.args = { prepend: '@', append: '', placeholder: 'Username' };
