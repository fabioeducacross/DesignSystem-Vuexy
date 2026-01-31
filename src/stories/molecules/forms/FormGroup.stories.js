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

export const Interactive = {
  render: () => {
    return `
      <div class="p-4" style="max-width: 500px;">
        <h5>Interactive FormGroup Demo</h5>
        <p class="text-muted">Trigger validation states</p>
        
        <div class="mb-3">
          <label class="form-label">Email address</label>
          <input type="email" class="form-control" id="emailInput" placeholder="email@example.com">
          <div class="valid-feedback" id="validFeedback" style="display:none;">Looks good!</div>
          <div class="invalid-feedback" id="invalidFeedback" style="display:none;">Please enter a valid email.</div>
        </div>
        
        <div class="btn-group" role="group">
          <button class="btn btn-outline-success btn-sm" onclick="
            const input = document.getElementById('emailInput');
            input.classList.remove('is-invalid');
            input.classList.add('is-valid');
            document.getElementById('validFeedback').style.display = 'block';
            document.getElementById('invalidFeedback').style.display = 'none';
          ">Show Valid</button>
          
          <button class="btn btn-outline-danger btn-sm" onclick="
            const input = document.getElementById('emailInput');
            input.classList.remove('is-valid');
            input.classList.add('is-invalid');
            document.getElementById('validFeedback').style.display = 'none';
            document.getElementById('invalidFeedback').style.display = 'block';
          ">Show Invalid</button>
          
          <button class="btn btn-outline-secondary btn-sm" onclick="
            const input = document.getElementById('emailInput');
            input.classList.remove('is-valid', 'is-invalid');
            document.getElementById('validFeedback').style.display = 'none';
            document.getElementById('invalidFeedback').style.display = 'none';
          ">Reset</button>
        </div>
        
        <small class="d-block mt-3 text-muted">Interactive demo via controlled state</small>
      </div>
    `;
  }
};
