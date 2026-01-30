/**
 * HelpText - Atom (Forms)
 * 
 * Source: packages/vuexy_theme/public/vuexy/css/core.css (.form-text)
 * Priority: P1 (Important)
 * Status: ✅ DONE
 * 
 * Texto auxiliar para explicar campos de formulário.
 */

import { formatHtmlSnippet, formatReactSnippet, formatVue2Snippet, formatVue3Snippet } from '../../_helpers/snippets';

export default {
  title: 'Atoms/Forms/HelpText',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
# Help Text

Texto auxiliar para fornecer contexto adicional em campos de formulário.

## Quando usar
- Explicar formato esperado (ex: "Use formato DD/MM/YYYY")
- Fornecer dicas ao usuário
- Mostrar requisitos de senha
- Exibir contador de caracteres

## Características
- Classe Bootstrap: \`.form-text\`
- Cor suave (muted)
- Fonte menor que o campo
- Associado via \`aria-describedby\`

## Acessibilidade
- Vinculado ao input via ID
- Anunciado por screen readers
- Não substitui o label obrigatório
        `
      }
    }
  },
  argTypes: {
    text: {
      control: 'text',
      description: 'Texto de ajuda',
      table: { defaultValue: { summary: 'Help text goes here' } }
    },
    muted: {
      control: 'boolean',
      description: 'Usa cor muted',
      table: { defaultValue: { summary: true } }
    },
    icon: {
      control: 'text',
      description: 'Ícone Boxicons (opcional)',
      table: { defaultValue: { summary: '' } }
    }
  }
};

const createHelpText = ({ text = 'Help text goes here', muted = true, icon = '' }) => {
  const mutedClass = muted ? 'text-muted' : '';
  const iconHtml = icon ? `<i class="bx ${icon} me-1"></i>` : '';
  
  return `<div class="form-text ${mutedClass}">
  ${iconHtml}${text}
</div>`;
};

const Template = (args) => {
  const markup = createHelpText(args);
  
  return `
    <div class="mb-3" style="max-width: 400px;">
      <label for="exampleInput" class="form-label">Email address</label>
      <input type="email" class="form-control" id="exampleInput" aria-describedby="emailHelp">
      ${markup}
    </div>
    
    <hr class="my-5" />
    
    <details>
      <summary><strong>Code Snippets</strong></summary>
      <div class="mt-3">
        <h6>HTML</h6>
        <pre><code>${formatHtmlSnippet(markup).replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
        <h6>React</h6>
        <pre><code>${formatReactSnippet(markup, 'HelpText').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
      </div>
    </details>
  `;
};

export const Overview = () => `
  <div class="row g-4">
    <div class="col-md-6">
      <h5>Basic Help Text</h5>
      <div class="mb-3">
        <label for="email1" class="form-label">Email</label>
        <input type="email" class="form-control" id="email1">
        ${createHelpText({ text: 'We\'ll never share your email with anyone else.' })}
      </div>
    </div>
    
    <div class="col-md-6">
      <h5>With Icon</h5>
      <div class="mb-3">
        <label for="password1" class="form-label">Password</label>
        <input type="password" class="form-control" id="password1">
        ${createHelpText({ text: 'Must be 8+ characters with uppercase, lowercase & number', icon: 'bx-info-circle' })}
      </div>
    </div>
    
    <div class="col-md-6">
      <h5>Character Counter</h5>
      <div class="mb-3">
        <label for="bio1" class="form-label">Bio</label>
        <textarea class="form-control" id="bio1" rows="3"></textarea>
        ${createHelpText({ text: '0 / 200 characters', icon: 'bx-text' })}
      </div>
    </div>
    
    <div class="col-md-6">
      <h5>Format Example</h5>
      <div class="mb-3">
        <label for="phone1" class="form-label">Phone</label>
        <input type="tel" class="form-control" id="phone1">
        ${createHelpText({ text: 'Format: (XX) XXXXX-XXXX', icon: 'bx-phone' })}
      </div>
    </div>
  </div>
`;

export const Default = Template.bind({});
Default.args = {
  text: 'We\'ll never share your email with anyone else.',
  muted: true,
  icon: ''
};

export const WithIcon = Template.bind({});
WithIcon.args = {
  ...Default.args,
  text: 'Must be 8+ characters with uppercase, lowercase and number',
  icon: 'bx-info-circle'
};

export const CharacterCounter = Template.bind({});
CharacterCounter.args = {
  ...Default.args,
  text: '0 / 200 characters',
  icon: 'bx-text'
};

export const FormatExample = Template.bind({});
FormatExample.args = {
  ...Default.args,
  text: 'Format: (XX) XXXXX-XXXX',
  icon: 'bx-phone'
};
