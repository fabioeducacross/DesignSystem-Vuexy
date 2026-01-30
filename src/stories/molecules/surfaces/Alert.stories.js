/**
 * Alert - Molecule (Surfaces)
 * 
 * Source: packages/vuexy_theme/public/vuexy/css/core.css (.alert)
 * Priority: P0 (Critical)
 * Status: ✅ DONE
 */

import { formatHtmlSnippet, formatReactSnippet } from '../../_helpers/snippets';

export default {
  title: 'Molecules/Surfaces/Alert',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
## Alert (Molecule - Surfaces)

Mensagem de alerta/notificação inline do Vuexy.

### TODO - Implementação Pendente
- [ ] Adicionar markup HTML do Vuexy usando \`.alert\`
- [ ] Implementar cores (.alert-primary, .alert-success, .alert-danger, etc)
- [ ] Adicionar botão de fechar (.alert-dismissible)
- [ ] Implementar ícones no alert
- [ ] Adicionar variação solid vs outlined
- [ ] Implementar alert com título + descrição
- [ ] Incluir snippets multi-stack

### Composição
- **Icon** (opcional) - ícone de status
- **Content** - título e/ou mensagem
- **Close Button** (opcional) - botão para fechar

### Fonte Vuexy
- **CSS**: \`core.css\` → \`.alert\`, \`.alert-{variant}\`
- **Cores**: primary, secondary, success, danger, warning, info, dark, light
- **Variações**: default, dismissible, with-icon, solid

### Controles Esperados
- \`variant\`: select (primary, success, danger, warning, info)
- \`title\`: string (título opcional)
- \`message\`: string
- \`dismissible\`: boolean (mostra botão fechar)
- \`icon\`: string (classe do ícone)
- \`solid\`: boolean (fundo sólido vs suave)

### Stories Esperadas
1. Overview - Grid com todas cores
2. Basic - Alert simples com mensagem
3. WithIcon - Alert com ícone
4. WithTitle - Alert com título + mensagem
5. Dismissible - Alert com botão fechar
6. Solid - Variação solid vs default
        `
      }
    }
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'danger', 'warning', 'info'],
      description: 'Cor do alert',
      table: { defaultValue: { summary: 'primary' } }
    },
    title: { 
      control: 'text',
      description: 'Título do alert (opcional)',
      table: { defaultValue: { summary: '' } }
    },
    message: { 
      control: 'text',
      description: 'Mensagem do alert',
      table: { defaultValue: { summary: '' } }
    },
    dismissible: { 
      control: 'boolean',
      description: 'Mostra botão de fechar',
      table: { defaultValue: { summary: false } }
    },
    icon: { 
      control: 'text',
      description: 'Classe do ícone (ex: bx bx-info-circle)',
      table: { defaultValue: { summary: '' } }
    }
  },
  parameters: {
    docs: {
      description: {
        component: `
# Alert

Mensagem de notificação inline do Vuexy para feedback contextual.

## Quando usar
- Mensagens de sucesso após ações
- Avisos e erros
- Informações importantes na página

## Variantes
- **Primary**: Informação padrão
- **Success**: Ação bem-sucedida
- **Danger**: Erro ou ação destrutiva
- **Warning**: Atenção necessária
- **Info**: Dica ou informação adicional
- **Secondary**: Mensagem secundária

## Acessibilidade
- Use \`role="alert"\` para leitores de tela
- Botão fechar deve ter \`aria-label="Close"\`
        `
      }
    }
  }
};

const createAlert = ({ variant = 'primary', title = '', message = '', dismissible = false, icon = '' }) => {
  const alertClass = `alert-${variant}`;
  const dismissClass = dismissible ? 'alert-dismissible fade show' : '';
  const classes = ['alert', alertClass, dismissClass].filter(Boolean).join(' ');
  
  const iconHtml = icon ? `<i class="${icon} me-2"></i>` : '';
  const titleHtml = title ? `<h5 class="alert-heading mb-1">${title}</h5>` : '';
  const closeBtn = dismissible
    ? '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>'
    : '';

  return `<div class="${classes}" role="alert">
  <div class="d-flex align-items-start">
    ${iconHtml}
    <div class="flex-grow-1">
      ${titleHtml}
      <div>${message}</div>
    </div>
  </div>
  ${closeBtn}
</div>`;
};

const Template = (args) => {
  const markup = createAlert(args);
  
  return `
    <div style="max-width: 600px;">
      ${markup}
    </div>
    
    <hr class="my-5" />
    
    <details>
      <summary><strong>Code Snippets</strong></summary>
      <div class="mt-3">
        <h6>HTML</h6>
        <pre><code>${formatHtmlSnippet(markup).replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
        <h6>React</h6>
        <pre><code>${formatReactSnippet(markup, 'Alert').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
      </div>
    </details>
  `;
};

export const Overview = () => `
  <div class="row g-3">
    <div class="col-12">
      <h5>Cores</h5>
      <div class="d-flex flex-column gap-3" style="max-width: 600px;">
        ${createAlert({ variant: 'primary', message: 'A simple primary alert—check it out!' })}
        ${createAlert({ variant: 'secondary', message: 'A simple secondary alert—check it out!' })}
        ${createAlert({ variant: 'success', message: 'A simple success alert—check it out!' })}
        ${createAlert({ variant: 'danger', message: 'A simple danger alert—check it out!' })}
        ${createAlert({ variant: 'warning', message: 'A simple warning alert—check it out!' })}
        ${createAlert({ variant: 'info', message: 'A simple info alert—check it out!' })}
      </div>
    </div>
    <div class="col-12 mt-4">
      <h5>Com Ícone e Título</h5>
      <div class="d-flex flex-column gap-3" style="max-width: 600px;">
        ${createAlert({ variant: 'success', title: 'Well done!', message: 'You successfully read this important alert message.', icon: 'bx bx-check-circle' })}
        ${createAlert({ variant: 'danger', title: 'Oh snap!', message: 'Change a few things up and try submitting again.', icon: 'bx bx-x-circle' })}
      </div>
    </div>
    <div class="col-12 mt-4">
      <h5>Dismissible</h5>
      <div style="max-width: 600px;">
        ${createAlert({ variant: 'warning', message: 'This alert can be closed by clicking the close button.', dismissible: true, icon: 'bx bx-error' })}
      </div>
    </div>
  </div>
`;

export const Default = Template.bind({});
Default.args = {
  variant: 'primary',
  title: '',
  message: 'This is a primary alert—check it out!',
  dismissible: false,
  icon: ''
};

export const WithIcon = Template.bind({});
WithIcon.args = {
  variant: 'success',
  title: '',
  message: 'Well done! You successfully read this important alert message.',
  dismissible: false,
  icon: 'bx bx-check-circle'
};

export const Dismissible = Template.bind({});
Dismissible.args = {
  variant: 'warning',
  title: 'Warning!',
  message: 'You can close this alert by clicking the close button.',
  dismissible: true,
  icon: 'bx bx-error'
};
