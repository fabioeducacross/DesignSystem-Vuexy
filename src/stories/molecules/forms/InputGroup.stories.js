/**
 * InputGroup - Molecule
 * Status: ✅ DONE
 */
import { formatHtmlSnippet } from '../../_helpers/snippets';
export default {
  title: 'Vuexy/Molecules/Forms/InputGroup',
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

export const Interactive = {
  render: () => {
    const code = `<div class="input-group mb-3">
  <span class="input-group-text">
    <i class="bx bx-user"></i>
  </span>
  <input type="text" class="form-control" placeholder="Username">
</div>

<div class="input-group mb-3">
  <span class="input-group-text">$</span>
  <input type="number" class="form-control" placeholder="0.00">
  <span class="input-group-text">.00</span>
</div>

<div class="input-group">
  <input type="text" class="form-control" placeholder="Search...">
  <button class="btn btn-primary">
    <i class="bx bx-search"></i>
  </button>
</div>`;
    
    return `
      <div class="p-4" style="max-width: 500px;">
        <h5>Interactive InputGroup Demo</h5>
        <p class="text-muted">Click addon to focus input</p>
        
        <div class="input-group mb-3">
          <span class="input-group-text" onclick="document.getElementById('inp1').focus()" style="cursor:pointer;">
            <i class="bx bx-user"></i>
          </span>
          <input type="text" class="form-control" id="inp1" placeholder="Username">
        </div>
        
        <div class="input-group mb-3">
          <span class="input-group-text" onclick="document.getElementById('inp2').focus()" style="cursor:pointer;">$</span>
          <input type="number" class="form-control" id="inp2" placeholder="0.00">
          <span class="input-group-text">.00</span>
        </div>
        
        <div class="input-group">
          <input type="text" class="form-control" id="inp3" placeholder="Search...">
          <button class="btn btn-primary" onclick="alert('Searching: ' + document.getElementById('inp3').value)">
            <i class="bx bx-search"></i>
          </button>
        </div>
        
        <small class="d-block mt-3 text-muted">Interactive demo via controlled state</small>
      </div>
    `;
  },
  parameters: {
    docs: {
      source: {
        code: `<div class="input-group mb-3">
  <span class="input-group-text">
    <i class="bx bx-user"></i>
  </span>
  <input type="text" class="form-control" placeholder="Username">
</div>

<div class="input-group mb-3">
  <span class="input-group-text">$</span>
  <input type="number" class="form-control" placeholder="0.00">
  <span class="input-group-text">.00</span>
</div>

<div class="input-group">
  <input type="text" class="form-control" placeholder="Search...">
  <button class="btn btn-primary">
    <i class="bx bx-search"></i>
  </button>
</div>`
      }
    }
  }
};
