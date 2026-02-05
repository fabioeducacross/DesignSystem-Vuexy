/**
 * EFormCheck - Educational Checkbox & Radio Components
 * ====================================================
 * Checkbox e radio buttons para formulários educacionais do Educacross
 * 
 * @component EFormCheck
 * @source educacross-frontoffice/src/components/form/EFormCheck.vue
 * @category Forms
 * @priority P1 - Core UI
 * 
 * ## Contexto Educacional
 * - **Professor**: Formulários de avaliação, configurações de turma
 * - **Coordenador**: Seleção de múltiplos alunos, configurações de permissões
 * - **Aluno**: Aceite de termos, preferências de configuração
 * 
 * ## Casos de Uso
 * - Formulário de avaliação com múltiplas opções
 * - Seleção de alunos para aplicar missão
 * - Configurações de privacidade do professor
 * - Filtros de busca em relatórios
 * - Aceite de termos e políticas
 * 
 * ## Props API
 * @prop {boolean} checked - Estado selecionado
 * @prop {string} label - Texto do label
 * @prop {boolean} disabled - Desabilita interação
 * @prop {string} variant - Variante visual: 'default', 'success', 'warning', 'danger', 'info'
 * @prop {string} size - Tamanho: 'sm', 'md', 'lg'
 * @prop {string} type - Tipo: 'checkbox', 'radio'
 * @prop {boolean} invalid - Estado de validação inválido
 * @prop {string} name - Atributo name para agrupamento de radios
 * 
 * ## Figma Design Specs
 * 
 * ### Dimensões
 * - **Small (sm)**: 16x16px checkbox/radio, label font-size 13px, gap 8px
 * - **Medium (md)**: 20x20px checkbox/radio, label font-size 14px, gap 10px
 * - **Large (lg)**: 24x24px checkbox/radio, label font-size 16px, gap 12px
 * 
 * ### Cores
 * - **Primary (default)**: #6E63E8 (var(--bs-primary))
 * - **Success**: #28C76F (var(--bs-success))
 * - **Warning**: #FF9F43 (var(--bs-warning))
 * - **Danger**: #EA5455 (var(--bs-danger))
 * - **Info**: #00CFE8 (var(--bs-info))
 * - **Disabled**: #B8C2CC (opacity 0.5)
 * - **Border**: #D8D6DE (1px solid)
 * - **Focus Ring**: rgba(110, 99, 232, 0.25) 0 0 0 4px
 * 
 * ### Tipografia
 * - **Font Family**: Inter, sans-serif
 * - **Font Weight**: 400 (regular)
 * - **Line Height**: 1.5
 * - **Color**: #5E5873 (body color)
 * 
 * ### Estados
 * - **Default**: Border cinza, fundo branco
 * - **Hover**: Border da cor variant, escala 1.05
 * - **Focus**: Ring de foco visível (outline)
 * - **Checked**: Fundo da cor variant, checkmark branco
 * - **Disabled**: Opacidade 0.5, cursor not-allowed
 * - **Invalid**: Border vermelho, checkmark vermelho
 * 
 * ### Acessibilidade
 * - Role: checkbox ou radio
 * - aria-checked: estado selecionado
 * - aria-disabled: estado desabilitado
 * - aria-invalid: estado inválido
 * - Keyboard: Space para toggle, Tab para navegação
 * - Focus visible: outline de 4px
 * 
 * ## Integração Vue 2.7
 * ```vue
 * <EFormCheck
 *   v-model="checked"
 *   label="Aceito os termos"
 *   variant="primary"
 *   size="md"
 *   :disabled="false"
 *   :invalid="false"
 * />
 * 
 * <EFormCheck
 *   v-model="selectedOption"
 *   type="radio"
 *   name="difficulty"
 *   label="Fácil"
 *   variant="success"
 * />
 * ```
 */

export default {
  title: 'Front-office/Forms/EFormCheck',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
Componente de checkbox e radio button para formulários educacionais.

### Features
- ✅ Checkbox e Radio Button
- ✅ 5 variantes de cor (primary, success, warning, danger, info)
- ✅ 3 tamanhos (sm, md, lg)
- ✅ Estados: default, hover, focus, checked, disabled, invalid
- ✅ Acessibilidade completa (ARIA, keyboard)
- ✅ Focus ring visível
- ✅ Grupos de checkboxes e radios
- ✅ Contexto educacional (Professor/Coordenador/Aluno)
        `
      }
    }
  },
  argTypes: {
    checked: {
      control: 'boolean',
      description: 'Estado selecionado',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' }
      }
    },
    label: {
      control: 'text',
      description: 'Texto do label',
      table: {
        type: { summary: 'string' }
      }
    },
    type: {
      control: 'select',
      options: ['checkbox', 'radio'],
      description: 'Tipo de input',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'checkbox' }
      }
    },
    variant: {
      control: 'select',
      options: ['default', 'success', 'warning', 'danger', 'info'],
      description: 'Variante de cor',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'default' }
      }
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Tamanho do componente',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'md' }
      }
    },
    disabled: {
      control: 'boolean',
      description: 'Desabilita interação',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' }
      }
    },
    invalid: {
      control: 'boolean',
      description: 'Estado de validação inválido',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' }
      }
    }
  }
};

// Estilos do componente
const styles = `
<style>
  .e-form-check-wrapper {
    display: inline-flex;
    align-items: center;
    gap: var(--gap);
    cursor: pointer;
    font-family: Inter, sans-serif;
    line-height: 1.5;
  }
  
  .e-form-check-wrapper.disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  
  .e-form-check-input {
    appearance: none;
    width: var(--size);
    height: var(--size);
    border: 1px solid #D8D6DE;
    background-color: #fff;
    cursor: pointer;
    flex-shrink: 0;
    transition: all 0.2s ease;
    position: relative;
  }
  
  .e-form-check-input[type="checkbox"] {
    border-radius: 4px;
  }
  
  .e-form-check-input[type="radio"] {
    border-radius: 50%;
  }
  
  .e-form-check-input:hover:not(:disabled) {
    border-color: var(--color);
    transform: scale(1.05);
  }
  
  .e-form-check-input:focus {
    outline: 4px solid rgba(110, 99, 232, 0.25);
    outline-offset: 2px;
  }
  
  .e-form-check-input:checked {
    background-color: var(--color);
    border-color: var(--color);
  }
  
  .e-form-check-input:checked::after {
    content: '';
    position: absolute;
    display: block;
  }
  
  .e-form-check-input[type="checkbox"]:checked::after {
    left: 50%;
    top: 50%;
    transform: translate(-50%, -60%) rotate(45deg);
    width: 35%;
    height: 60%;
    border: solid white;
    border-width: 0 2px 2px 0;
  }
  
  .e-form-check-input[type="radio"]:checked::after {
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 50%;
    height: 50%;
    border-radius: 50%;
    background-color: white;
  }
  
  .e-form-check-input:disabled {
    cursor: not-allowed;
    background-color: #f8f8f8;
  }
  
  .e-form-check-input.invalid {
    border-color: #EA5455;
  }
  
  .e-form-check-input.invalid:checked {
    background-color: #EA5455;
    border-color: #EA5455;
  }
  
  .e-form-check-label {
    color: #5E5873;
    font-size: var(--font-size);
    user-select: none;
  }
  
  /* Sizes */
  .size-sm {
    --size: 16px;
    --font-size: 13px;
    --gap: 8px;
  }
  
  .size-md {
    --size: 20px;
    --font-size: 14px;
    --gap: 10px;
  }
  
  .size-lg {
    --size: 24px;
    --font-size: 16px;
    --gap: 12px;
  }
  
  /* Variants */
  .variant-default {
    --color: #6E63E8;
  }
  
  .variant-success {
    --color: #28C76F;
  }
  
  .variant-warning {
    --color: #FF9F43;
  }
  
  .variant-danger {
    --color: #EA5455;
  }
  
  .variant-info {
    --color: #00CFE8;
  }
  
  /* Groups */
  .e-form-check-group {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
  
  .e-form-check-group-inline {
    flex-direction: row;
    flex-wrap: wrap;
    gap: 16px;
  }
</style>
`;

const renderFormCheck = (args) => {
  const id = `check-${Math.random().toString(36).substr(2, 9)}`;
  const wrapperClasses = [
    'e-form-check-wrapper',
    `size-${args.size || 'md'}`,
    `variant-${args.variant || 'default'}`,
    args.disabled ? 'disabled' : ''
  ].filter(Boolean).join(' ');
  
  const inputClasses = [
    'e-form-check-input',
    args.invalid ? 'invalid' : ''
  ].filter(Boolean).join(' ');
  
  return `
    ${styles}
    <label class="${wrapperClasses}">
      <input
        type="${args.type || 'checkbox'}"
        id="${id}"
        class="${inputClasses}"
        ${args.checked ? 'checked' : ''}
        ${args.disabled ? 'disabled' : ''}
        ${args.name ? `name="${args.name}"` : ''}
        aria-checked="${args.checked || false}"
        aria-disabled="${args.disabled || false}"
        aria-invalid="${args.invalid || false}"
      />
      <span class="e-form-check-label">${args.label || ''}</span>
    </label>
  `;
};

// Stories
export const Checkbox = {
  args: {
    type: 'checkbox',
    label: 'Aceito os termos de uso',
    checked: false,
    variant: 'default',
    size: 'md',
    disabled: false,
    invalid: false
  },
  render: renderFormCheck
};

export const CheckboxChecked = {
  args: {
    type: 'checkbox',
    label: 'Li e concordo com os termos',
    checked: true,
    variant: 'default',
    size: 'md'
  },
  render: renderFormCheck
};

export const Radio = {
  args: {
    type: 'radio',
    label: 'Nível Fácil',
    checked: false,
    variant: 'default',
    size: 'md',
    name: 'difficulty'
  },
  render: renderFormCheck
};

export const RadioChecked = {
  args: {
    type: 'radio',
    label: 'Nível Intermediário',
    checked: true,
    variant: 'success',
    size: 'md',
    name: 'difficulty'
  },
  render: renderFormCheck
};

export const AllSizes = {
  render: () => `
    ${styles}
    <div style="display: flex; flex-direction: column; gap: 24px;">
      <div>
        <h3 style="margin-bottom: 12px; color: #5E5873; font-size: 14px; font-weight: 600;">Small (16px)</h3>
        ${renderFormCheck({ type: 'checkbox', label: 'Checkbox pequeno', size: 'sm', checked: true })}
      </div>
      <div>
        <h3 style="margin-bottom: 12px; color: #5E5873; font-size: 14px; font-weight: 600;">Medium (20px)</h3>
        ${renderFormCheck({ type: 'checkbox', label: 'Checkbox médio', size: 'md', checked: true })}
      </div>
      <div>
        <h3 style="margin-bottom: 12px; color: #5E5873; font-size: 14px; font-weight: 600;">Large (24px)</h3>
        ${renderFormCheck({ type: 'checkbox', label: 'Checkbox grande', size: 'lg', checked: true })}
      </div>
    </div>
  `
};

export const AllVariants = {
  render: () => `
    ${styles}
    <div style="display: flex; flex-direction: column; gap: 16px;">
      ${renderFormCheck({ type: 'checkbox', label: 'Primary (Padrão)', variant: 'default', checked: true })}
      ${renderFormCheck({ type: 'checkbox', label: 'Success (Aprovado)', variant: 'success', checked: true })}
      ${renderFormCheck({ type: 'checkbox', label: 'Warning (Atenção)', variant: 'warning', checked: true })}
      ${renderFormCheck({ type: 'checkbox', label: 'Danger (Erro)', variant: 'danger', checked: true })}
      ${renderFormCheck({ type: 'checkbox', label: 'Info (Informação)', variant: 'info', checked: true })}
    </div>
  `
};

export const Disabled = {
  render: () => `
    ${styles}
    <div style="display: flex; flex-direction: column; gap: 16px;">
      ${renderFormCheck({ type: 'checkbox', label: 'Desabilitado (não marcado)', disabled: true, checked: false })}
      ${renderFormCheck({ type: 'checkbox', label: 'Desabilitado (marcado)', disabled: true, checked: true })}
      ${renderFormCheck({ type: 'radio', label: 'Radio desabilitado', disabled: true, checked: false })}
      ${renderFormCheck({ type: 'radio', label: 'Radio desabilitado e marcado', disabled: true, checked: true })}
    </div>
  `
};

export const Invalid = {
  render: () => `
    ${styles}
    <div style="display: flex; flex-direction: column; gap: 16px;">
      <div>
        ${renderFormCheck({ type: 'checkbox', label: 'Você deve aceitar os termos', invalid: true, checked: false })}
        <small style="color: #EA5455; font-size: 12px; margin-left: 28px; display: block; margin-top: 4px;">
          Campo obrigatório
        </small>
      </div>
      <div>
        ${renderFormCheck({ type: 'radio', label: 'Opção inválida', invalid: true, checked: false })}
        <small style="color: #EA5455; font-size: 12px; margin-left: 28px; display: block; margin-top: 4px;">
          Selecione uma opção válida
        </small>
      </div>
    </div>
  `
};

export const CheckboxGroup = {
  render: () => `
    ${styles}
    <div class="e-form-check-group">
      <div style="margin-bottom: 8px; color: #5E5873; font-weight: 600; font-size: 14px;">
        Selecione os alunos para aplicar a missão:
      </div>
      ${renderFormCheck({ type: 'checkbox', label: 'Ana Silva (5A)', checked: true, variant: 'success' })}
      ${renderFormCheck({ type: 'checkbox', label: 'Bruno Santos (5A)', checked: true, variant: 'success' })}
      ${renderFormCheck({ type: 'checkbox', label: 'Carlos Oliveira (5A)', checked: false })}
      ${renderFormCheck({ type: 'checkbox', label: 'Diana Costa (5A)', checked: false })}
      ${renderFormCheck({ type: 'checkbox', label: 'Eduardo Lima (5A)', checked: true, variant: 'success' })}
    </div>
  `
};

export const RadioGroup = {
  render: () => `
    ${styles}
    <div class="e-form-check-group">
      <div style="margin-bottom: 8px; color: #5E5873; font-weight: 600; font-size: 14px;">
        Nível de dificuldade da missão:
      </div>
      ${renderFormCheck({ type: 'radio', name: 'difficulty', label: 'Fácil', checked: false, variant: 'success' })}
      ${renderFormCheck({ type: 'radio', name: 'difficulty', label: 'Intermediário', checked: true, variant: 'warning' })}
      ${renderFormCheck({ type: 'radio', name: 'difficulty', label: 'Difícil', checked: false, variant: 'danger' })}
    </div>
  `
};

export const FormularioDeAvaliacao = {
  render: () => `
    ${styles}
    <div style="max-width: 600px; padding: 24px; background: #fff; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
      <h2 style="margin: 0 0 24px 0; color: #5E5873; font-size: 18px; font-weight: 600;">
        📝 Avaliação Formativa - Matemática
      </h2>
      
      <div style="margin-bottom: 24px;">
        <div style="margin-bottom: 12px; color: #5E5873; font-weight: 600; font-size: 14px;">
          1. O aluno demonstrou compreensão dos conceitos?
        </div>
        <div class="e-form-check-group">
          ${renderFormCheck({ type: 'radio', name: 'q1', label: 'Sim, plenamente', checked: true, variant: 'success' })}
          ${renderFormCheck({ type: 'radio', name: 'q1', label: 'Parcialmente', checked: false, variant: 'warning' })}
          ${renderFormCheck({ type: 'radio', name: 'q1', label: 'Não demonstrou', checked: false, variant: 'danger' })}
        </div>
      </div>
      
      <div style="margin-bottom: 24px;">
        <div style="margin-bottom: 12px; color: #5E5873; font-weight: 600; font-size: 14px;">
          2. Habilidades observadas (múltipla escolha):
        </div>
        <div class="e-form-check-group">
          ${renderFormCheck({ type: 'checkbox', label: 'Raciocínio lógico', checked: true, variant: 'success' })}
          ${renderFormCheck({ type: 'checkbox', label: 'Resolução de problemas', checked: true, variant: 'success' })}
          ${renderFormCheck({ type: 'checkbox', label: 'Trabalho em equipe', checked: false })}
          ${renderFormCheck({ type: 'checkbox', label: 'Comunicação clara', checked: true, variant: 'success' })}
        </div>
      </div>
      
      <div style="margin-bottom: 0;">
        <div style="margin-bottom: 12px; color: #5E5873; font-weight: 600; font-size: 14px;">
          3. Necessita de reforço?
        </div>
        <div class="e-form-check-group">
          ${renderFormCheck({ type: 'radio', name: 'q3', label: 'Sim, urgente', checked: false, variant: 'danger' })}
          ${renderFormCheck({ type: 'radio', name: 'q3', label: 'Sim, futuramente', checked: false, variant: 'warning' })}
          ${renderFormCheck({ type: 'radio', name: 'q3', label: 'Não necessita', checked: true, variant: 'success' })}
        </div>
      </div>
    </div>
  `
};

export const ConfiguracoesDeProfessor = {
  render: () => `
    ${styles}
    <div style="max-width: 500px; padding: 24px; background: #fff; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
      <h2 style="margin: 0 0 24px 0; color: #5E5873; font-size: 18px; font-weight: 600;">
        ⚙️ Configurações de Notificações
      </h2>
      
      <div style="margin-bottom: 24px;">
        <div style="margin-bottom: 12px; color: #5E5873; font-weight: 500; font-size: 14px;">
          Notificações por E-mail
        </div>
        <div class="e-form-check-group">
          ${renderFormCheck({ type: 'checkbox', label: 'Alunos completam missões', checked: true, variant: 'success' })}
          ${renderFormCheck({ type: 'checkbox', label: 'Novas mensagens de alunos', checked: true, variant: 'info' })}
          ${renderFormCheck({ type: 'checkbox', label: 'Prazo de missões próximo', checked: true, variant: 'warning' })}
          ${renderFormCheck({ type: 'checkbox', label: 'Resumo semanal de turma', checked: false })}
        </div>
      </div>
      
      <div style="margin-bottom: 24px;">
        <div style="margin-bottom: 12px; color: #5E5873; font-weight: 500; font-size: 14px;">
          Privacidade
        </div>
        <div class="e-form-check-group">
          ${renderFormCheck({ type: 'checkbox', label: 'Permitir visualização de perfil por alunos', checked: true })}
          ${renderFormCheck({ type: 'checkbox', label: 'Exibir status online', checked: false })}
        </div>
      </div>
      
      <div style="margin-bottom: 0;">
        <div style="margin-bottom: 12px; color: #5E5873; font-weight: 500; font-size: 14px;">
          Acessibilidade
        </div>
        <div class="e-form-check-group">
          ${renderFormCheck({ type: 'checkbox', label: 'Modo de alto contraste', checked: false })}
          ${renderFormCheck({ type: 'checkbox', label: 'Atalhos de teclado', checked: true, variant: 'info' })}
          ${renderFormCheck({ type: 'checkbox', label: 'Leitor de tela otimizado', checked: true, variant: 'info' })}
        </div>
      </div>
    </div>
  `
};

export const KeyboardNavigation = {
  render: () => {
    setTimeout(() => {
      const checkboxes = document.querySelectorAll('.e-form-check-input');
      checkboxes.forEach(checkbox => {
        checkbox.addEventListener('keydown', (e) => {
          if (e.key === ' ') {
            e.preventDefault();
            checkbox.checked = !checkbox.checked;
          }
        });
      });
    }, 100);
    
    return `
      ${styles}
      <div style="max-width: 500px; padding: 24px; background: #F8F8F8; border-radius: 8px;">
        <div style="margin-bottom: 16px; padding: 12px; background: #E8F5E9; border-left: 4px solid #28C76F; border-radius: 4px;">
          <strong style="color: #28C76F;">♿ Acessibilidade:</strong>
          <ul style="margin: 8px 0 0 0; padding-left: 20px; color: #5E5873; font-size: 13px;">
            <li>Use <kbd>Tab</kbd> para navegar entre checkboxes</li>
            <li>Use <kbd>Space</kbd> para marcar/desmarcar</li>
            <li>Focus ring visível para cada elemento</li>
            <li>ARIA labels para leitores de tela</li>
          </ul>
        </div>
        
        <div class="e-form-check-group">
          ${renderFormCheck({ type: 'checkbox', label: 'Checkbox 1 - Use Tab para focar', checked: false })}
          ${renderFormCheck({ type: 'checkbox', label: 'Checkbox 2 - Use Space para marcar', checked: false })}
          ${renderFormCheck({ type: 'checkbox', label: 'Checkbox 3 - Acessível por teclado', checked: false })}
        </div>
      </div>
    `;
  }
};

