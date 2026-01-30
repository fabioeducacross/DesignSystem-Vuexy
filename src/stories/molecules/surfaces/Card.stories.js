/**
 * Card - Molecule
 * Status: ✅ DONE
 */
import { formatHtmlSnippet } from '../../_helpers/snippets';
export default {
  title: 'Molecules/Surfaces/Card',
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
