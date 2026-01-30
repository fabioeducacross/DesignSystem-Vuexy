/**
 * Badge - Atom (Feedback)
 * 
 * Source: packages/vuexy_theme/public/vuexy/css/core.css (.badge)
 * Priority: P0 (Critical)
 * Status: ✅ DONE
 */

import { formatHtmlSnippet, formatReactSnippet } from '../../_helpers/snippets';

export default {
  title: 'Atoms/Feedback/Badge',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
# Badge

Badge/tag do Vuexy para indicadores de status e contadores usando Bootstrap 5.

## Quando usar
- Indicadores de status
- Contadores e notificações
- Tags e categorias

## Variantes
- **Cores**: primary, secondary, success, danger, warning, info, dark, light
- **Tipos**: solid (sólido), light (suave)
- **Formatos**: square (padrão), pill (arredondado)

## Acessibilidade
- Use texto descritivo
- Evite depender apenas de cor
- Para badges vazios, adicione \`aria-label\`
        `
      }
    }
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'dark', 'light'],
      description: 'Cor do badge',
      table: { defaultValue: { summary: 'primary' } }
    },
    type: { 
      control: 'select',
      options: ['solid', 'light'],
      description: 'Tipo (sólido ou suave)',
      table: { defaultValue: { summary: 'solid' } }
    },
    shape: { 
      control: 'select',
      options: ['square', 'pill'],
      description: 'Formato do badge',
      table: { defaultValue: { summary: 'square' } }
    },
    label: { 
      control: 'text',
      description: 'Texto do badge',
      table: { defaultValue: { summary: 'Badge' } }
    }
  }
};

const createBadge = ({ variant = 'primary', type = 'solid', shape = 'square', label = 'Badge' }) => {
  const bgClass = type === 'solid' ? `bg-${variant}` : `bg-label-${variant}`;
  const shapeClass = shape === 'pill' ? 'rounded-pill' : '';
  const classes = ['badge', bgClass, shapeClass].filter(Boolean).join(' ');
  
  return `<span class="${classes}">${label}</span>`;
};

const Template = (args) => {
  const markup = createBadge(args);
  
  return `
    <div>
      ${markup}
    </div>
    
    <hr class="my-5" />
    
    <details>
      <summary><strong>Code Snippets</strong></summary>
      <div class="mt-3">
        <h6>HTML</h6>
        <pre><code>${formatHtmlSnippet(markup).replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
        <h6>React</h6>
        <pre><code>${formatReactSnippet(markup, 'Badge').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
      </div>
    </details>
  `;
};

export const Overview = () => `
  <div class="row g-4">
    <div class="col-12">
      <h5>Cores (Solid)</h5>
      <div class="d-flex flex-wrap gap-2">
        ${createBadge({ variant: 'primary', label: 'Primary' })}
        ${createBadge({ variant: 'secondary', label: 'Secondary' })}
        ${createBadge({ variant: 'success', label: 'Success' })}
        ${createBadge({ variant: 'danger', label: 'Danger' })}
        ${createBadge({ variant: 'warning', label: 'Warning' })}
        ${createBadge({ variant: 'info', label: 'Info' })}
        ${createBadge({ variant: 'dark', label: 'Dark' })}
      </div>
    </div>
    <div class="col-12 mt-4">
      <h5>Cores (Light)</h5>
      <div class="d-flex flex-wrap gap-2">
        ${createBadge({ variant: 'primary', type: 'light', label: 'Primary' })}
        ${createBadge({ variant: 'secondary', type: 'light', label: 'Secondary' })}
        ${createBadge({ variant: 'success', type: 'light', label: 'Success' })}
        ${createBadge({ variant: 'danger', type: 'light', label: 'Danger' })}
        ${createBadge({ variant: 'warning', type: 'light', label: 'Warning' })}
        ${createBadge({ variant: 'info', type: 'light', label: 'Info' })}
        ${createBadge({ variant: 'dark', type: 'light', label: 'Dark' })}
      </div>
    </div>
    <div class="col-12 mt-4">
      <h5>Formato Pill</h5>
      <div class="d-flex flex-wrap gap-2">
        ${createBadge({ variant: 'primary', shape: 'pill', label: 'Pill Primary' })}
        ${createBadge({ variant: 'success', shape: 'pill', label: 'Pill Success' })}
        ${createBadge({ variant: 'danger', shape: 'pill', label: 'Pill Danger' })}
      </div>
    </div>
  </div>
`;

export const Default = Template.bind({});
Default.args = {
  variant: 'primary',
  type: 'solid',
  shape: 'square',
  label: 'Badge'
};

export const Light = Template.bind({});
Light.args = {
  ...Default.args,
  type: 'light',
  label: 'Light Badge'
};

export const Pill = Template.bind({});
Pill.args = {
  ...Default.args,
  shape: 'pill',
  label: 'Pill Badge'
};
