/**
 * FormGroup - Molecule
 * Status: ✅ DONE
 */
import { formatHtmlSnippet } from '../../_helpers/snippets';
export default {
  title: 'Molecules/Forms/FormGroup',
  tags: ['autodocs'],
  parameters: { docs: { description: { component: '# Form Group - Label + Input + Help Text' } } },
  argTypes: {
    label: { control: 'text', table: { defaultValue: { summary: 'Label' } } },
    placeholder: { control: 'text', table: { defaultValue: { summary: '' } } },
    helpText: { control: 'text', table: { defaultValue: { summary: '' } } },
    required: { control: 'boolean', table: { defaultValue: { summary: false } } }
  }
};
const createFormGroup = ({ label = 'Label', placeholder = 'Enter value...', helpText = '', required = false }) => 
  `<div class="mb-3">
  <label class="form-label">${label}${required ? ' <span class="text-danger">*</span>' : ''}</label>
  <input type="text" class="form-control" placeholder="${placeholder}">
  ${helpText ? `<div class="form-text">${helpText}</div>` : ''}
</div>`;
const Template = (args) => `${createFormGroup(args)}<hr/><details><summary><strong>Code</strong></summary><pre><code>${formatHtmlSnippet(createFormGroup(args)).replace(/</g, '&lt;')}</code></pre></details>`;
export const Overview = () => `<div style="max-width:400px">${createFormGroup({label:'Email', placeholder:'email@example.com', helpText:'We will never share your email'})}${createFormGroup({label:'Password', placeholder:'Enter password', required: true})}</div>`;
export const Default = Template.bind({});
Default.args = { label: 'Input Label', placeholder: 'Enter value...', helpText: '', required: false };
