/**
 * EInput - Educational Input Component
 * =====================================
 * Input básico com validação para formulários educacionais do Educacross
 * 
 * @component EInput
 * @source educacross-frontoffice/src/components/form/EInput.vue
 * @category Forms
 * @priority P1 - Core UI
 * 
 * ## Contexto Educacional
 * - **Professor**: Cadastro de alunos, criação de turmas, formulários de missão
 * - **Coordenador**: Busca de turmas, filtros de relatórios
 * - **Aluno**: Respostas de exercícios, perfil pessoal, busca de missões
 * 
 * ## Casos de Uso
 * - Cadastro de novo aluno (nome, email, matrícula)
 * - Busca de turma por nome ou código
 * - Criação de missão (título, pontuação)
 * - Respostas numéricas em exercícios
 * - Login e autenticação
 * - Formulários de configuração
 * 
 * ## Props API
 * @prop {string} value - Valor do input
 * @prop {string} placeholder - Texto placeholder
 * @prop {string} type - Tipo: 'text', 'email', 'number', 'password', 'tel', 'url', 'search'
 * @prop {boolean} disabled - Desabilita interação
 * @prop {string} state - Estado de validação: 'valid', 'invalid', 'warning'
 * @prop {string} size - Tamanho: 'sm', 'md', 'lg'
 * @prop {boolean} readonly - Apenas leitura
 * @prop {string} icon - Ícone Bootstrap Icons (ex: 'search', 'person', 'envelope')
 * @prop {string} iconPosition - Posição do ícone: 'left', 'right'
 * @prop {number} maxLength - Máximo de caracteres
 * 
 * ## Figma Design Specs
 * 
 * ### Dimensões
 * - **Small (sm)**: height 32px, padding 8px 12px, font-size 13px, icon 16px
 * - **Medium (md)**: height 38px, padding 10px 14px, font-size 14px, icon 18px
 * - **Large (lg)**: height 46px, padding 12px 16px, font-size 16px, icon 20px
 * - **Border**: 1px solid
 * - **Border Radius**: 6px
 * 
 * ### Cores
 * - **Border Default**: #D8D6DE
 * - **Border Focus**: #6E63E8 (primary)
 * - **Border Valid**: #28C76F (success)
 * - **Border Invalid**: #EA5455 (danger)
 * - **Border Warning**: #FF9F43
 * - **Background**: #FFFFFF
 * - **Background Disabled**: #F8F8F8
 * - **Text**: #5E5873
 * - **Placeholder**: #B8C2CC
 * - **Icon Color**: #6E6B7B
 * - **Focus Ring**: rgba(110, 99, 232, 0.25) 0 0 0 4px
 * 
 * ### Tipografia
 * - **Font Family**: Inter, sans-serif
 * - **Font Weight**: 400 (regular)
 * - **Line Height**: 1.5
 * - **Placeholder**: font-style italic (opcional)
 * 
 * ### Estados
 * - **Default**: Border cinza, fundo branco
 * - **Hover**: Border primária, leve escurecimento
 * - **Focus**: Border primária, focus ring visível
 * - **Valid**: Border verde, ícone de sucesso
 * - **Invalid**: Border vermelho, ícone de erro
 * - **Warning**: Border laranja, ícone de alerta
 * - **Disabled**: Fundo cinza, cursor not-allowed, opacidade 0.6
 * - **Readonly**: Fundo cinza claro, sem border focus
 * 
 * ### Acessibilidade
 * - aria-invalid: estado inválido
 * - aria-describedby: mensagem de erro/ajuda
 * - aria-label ou label associado
 * - Keyboard: Tab para navegação
 * - Focus visible: outline de 4px
 * - Autocomplete adequado (name, email, etc)
 * 
 * ## Integração Vue 2.7
 * ```vue
 * <EInput
 *   v-model="studentName"
 *   placeholder="Nome do aluno"
 *   :state="errors.name ? 'invalid' : 'valid'"
 *   size="md"
 *   icon="person"
 *   :disabled="loading"
 * />
 * 
 * <EInput
 *   v-model="searchQuery"
 *   type="search"
 *   placeholder="Buscar turmas..."
 *   icon="search"
 *   size="lg"
 * />
 * ```
 */

export default {
  title: 'Educacross Components V2/Forms/EInput',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
Componente de input básico com validação para formulários educacionais.

### Features
- ✅ 7 tipos de input (text, email, number, password, tel, url, search)
- ✅ 3 tamanhos (sm, md, lg)
- ✅ Estados de validação: default, valid, invalid, warning
- ✅ Ícones opcionais (esquerda/direita)
- ✅ Estados: default, hover, focus, disabled, readonly
- ✅ Contador de caracteres (maxLength)
- ✅ Acessibilidade completa (ARIA, keyboard)
- ✅ Focus ring visível
- ✅ Contexto educacional (Professor/Coordenador/Aluno)
        `
      }
    }
  },
  argTypes: {
    value: {
      control: 'text',
      description: 'Valor do input',
      table: {
        type: { summary: 'string' }
      }
    },
    placeholder: {
      control: 'text',
      description: 'Texto placeholder',
      table: {
        type: { summary: 'string' }
      }
    },
    type: {
      control: 'select',
      options: ['text', 'email', 'number', 'password', 'tel', 'url', 'search'],
      description: 'Tipo de input',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'text' }
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
    state: {
      control: 'select',
      options: ['default', 'valid', 'invalid', 'warning'],
      description: 'Estado de validação',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'default' }
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
    readonly: {
      control: 'boolean',
      description: 'Apenas leitura',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' }
      }
    },
    icon: {
      control: 'text',
      description: 'Ícone Bootstrap Icons (ex: search, person)',
      table: {
        type: { summary: 'string' }
      }
    },
    iconPosition: {
      control: 'select',
      options: ['left', 'right'],
      description: 'Posição do ícone',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'left' }
      }
    },
    maxLength: {
      control: 'number',
      description: 'Máximo de caracteres',
      table: {
        type: { summary: 'number' }
      }
    }
  }
};

// Estilos do componente
const styles = `
<style>
  .e-input-wrapper {
    display: inline-flex;
    flex-direction: column;
    gap: 6px;
    width: 100%;
  }
  
  .e-input-container {
    position: relative;
    display: flex;
    align-items: center;
  }
  
  .e-input {
    width: 100%;
    height: var(--height);
    padding: var(--padding);
    font-size: var(--font-size);
    font-family: Inter, sans-serif;
    line-height: 1.5;
    color: #5E5873;
    background-color: #fff;
    border: 1px solid #D8D6DE;
    border-radius: 6px;
    transition: border-color 0.2s, box-shadow 0.2s;
  }
  
  .e-input::placeholder {
    color: #B8C2CC;
  }
  
  .e-input:hover:not(:disabled):not([readonly]) {
    border-color: #6E63E8;
  }
  
  .e-input:focus {
    outline: none;
    border-color: #6E63E8;
    box-shadow: 0 0 0 4px rgba(110, 99, 232, 0.25);
  }
  
  .e-input:disabled {
    background-color: #F8F8F8;
    cursor: not-allowed;
    opacity: 0.6;
  }
  
  .e-input[readonly] {
    background-color: #FAFAFA;
    cursor: default;
  }
  
  .e-input.state-valid {
    border-color: #28C76F;
    padding-right: 40px;
  }
  
  .e-input.state-valid:focus {
    box-shadow: 0 0 0 4px rgba(40, 199, 111, 0.25);
  }
  
  .e-input.state-invalid {
    border-color: #EA5455;
    padding-right: 40px;
  }
  
  .e-input.state-invalid:focus {
    box-shadow: 0 0 0 4px rgba(234, 84, 85, 0.25);
  }
  
  .e-input.state-warning {
    border-color: #FF9F43;
    padding-right: 40px;
  }
  
  .e-input.state-warning:focus {
    box-shadow: 0 0 0 4px rgba(255, 159, 67, 0.25);
  }
  
  .e-input.has-icon-left {
    padding-left: calc(var(--padding-x) * 2 + var(--icon-size));
  }
  
  .e-input.has-icon-right {
    padding-right: calc(var(--padding-x) * 2 + var(--icon-size));
  }
  
  .e-input-icon {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    width: var(--icon-size);
    height: var(--icon-size);
    color: #6E6B7B;
    pointer-events: none;
  }
  
  .e-input-icon.left {
    left: var(--padding-x);
  }
  
  .e-input-icon.right {
    right: var(--padding-x);
  }
  
  .e-input-icon i {
    font-size: var(--icon-size);
  }
  
  .state-icon {
    position: absolute;
    right: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 18px;
    height: 18px;
    pointer-events: none;
  }
  
  .state-icon i {
    font-size: 18px;
  }
  
  .state-valid .state-icon {
    color: #28C76F;
  }
  
  .state-invalid .state-icon {
    color: #EA5455;
  }
  
  .state-warning .state-icon {
    color: #FF9F43;
  }
  
  .e-input-feedback {
    font-size: 12px;
    line-height: 1.4;
  }
  
  .e-input-feedback.valid {
    color: #28C76F;
  }
  
  .e-input-feedback.invalid {
    color: #EA5455;
  }
  
  .e-input-feedback.warning {
    color: #FF9F43;
  }
  
  .e-input-counter {
    font-size: 11px;
    color: #B8C2CC;
    text-align: right;
  }
  
  /* Sizes */
  .size-sm {
    --height: 32px;
    --padding: 8px 12px;
    --padding-x: 12px;
    --font-size: 13px;
    --icon-size: 16px;
  }
  
  .size-md {
    --height: 38px;
    --padding: 10px 14px;
    --padding-x: 14px;
    --font-size: 14px;
    --icon-size: 18px;
  }
  
  .size-lg {
    --height: 46px;
    --padding: 12px 16px;
    --padding-x: 16px;
    --font-size: 16px;
    --icon-size: 20px;
  }
</style>
`;

const renderInput = (args) => {
  const id = `input-${Math.random().toString(36).substr(2, 9)}`;
  const hasIcon = args.icon && !['valid', 'invalid', 'warning'].includes(args.state);
  const iconPos = args.iconPosition || 'left';
  
  const inputClasses = [
    'e-input',
    args.state && args.state !== 'default' ? `state-${args.state}` : '',
    hasIcon && iconPos === 'left' ? 'has-icon-left' : '',
    hasIcon && iconPos === 'right' ? 'has-icon-right' : ''
  ].filter(Boolean).join(' ');
  
  const stateIcon = {
    valid: 'bi-check-circle-fill',
    invalid: 'bi-x-circle-fill',
    warning: 'bi-exclamation-circle-fill'
  }[args.state];
  
  return `
    ${styles}
    <div class="e-input-wrapper size-${args.size || 'md'}">
      <div class="e-input-container">
        ${hasIcon && iconPos === 'left' ? `
          <span class="e-input-icon left">
            <i class="bi bi-${args.icon}"></i>
          </span>
        ` : ''}
        
        <input
          type="${args.type || 'text'}"
          id="${id}"
          class="${inputClasses}"
          placeholder="${args.placeholder || ''}"
          value="${args.value || ''}"
          ${args.disabled ? 'disabled' : ''}
          ${args.readonly ? 'readonly' : ''}
          ${args.maxLength ? `maxlength="${args.maxLength}"` : ''}
          aria-invalid="${args.state === 'invalid'}"
          ${args.feedback ? `aria-describedby="${id}-feedback"` : ''}
        />
        
        ${hasIcon && iconPos === 'right' ? `
          <span class="e-input-icon right">
            <i class="bi bi-${args.icon}"></i>
          </span>
        ` : ''}
        
        ${stateIcon ? `
          <span class="state-icon">
            <i class="bi ${stateIcon}"></i>
          </span>
        ` : ''}
      </div>
      
      ${args.feedback ? `
        <span id="${id}-feedback" class="e-input-feedback ${args.state}">
          ${args.feedback}
        </span>
      ` : ''}
      
      ${args.maxLength && args.value ? `
        <span class="e-input-counter">
          ${args.value.length}/${args.maxLength} caracteres
        </span>
      ` : ''}
    </div>
  `;
};

// Stories
export const Default = {
  args: {
    placeholder: 'Digite algo...',
    type: 'text',
    size: 'md',
    state: 'default',
    disabled: false,
    readonly: false
  },
  render: renderInput
};

export const AllTypes = {
  render: () => `
    ${styles}
    <div style="display: flex; flex-direction: column; gap: 16px; max-width: 400px;">
      <div>
        <label style="display: block; margin-bottom: 6px; color: #5E5873; font-size: 14px; font-weight: 500;">Text</label>
        ${renderInput({ type: 'text', placeholder: 'Nome completo', value: 'Ana Silva' })}
      </div>
      <div>
        <label style="display: block; margin-bottom: 6px; color: #5E5873; font-size: 14px; font-weight: 500;">Email</label>
        ${renderInput({ type: 'email', placeholder: 'seu@email.com', value: 'ana@escola.com.br', icon: 'envelope' })}
      </div>
      <div>
        <label style="display: block; margin-bottom: 6px; color: #5E5873; font-size: 14px; font-weight: 500;">Number</label>
        ${renderInput({ type: 'number', placeholder: 'Pontuação', value: '100', icon: 'star' })}
      </div>
      <div>
        <label style="display: block; margin-bottom: 6px; color: #5E5873; font-size: 14px; font-weight: 500;">Password</label>
        ${renderInput({ type: 'password', placeholder: 'Senha segura', value: 'password123', icon: 'lock' })}
      </div>
      <div>
        <label style="display: block; margin-bottom: 6px; color: #5E5873; font-size: 14px; font-weight: 500;">Tel</label>
        ${renderInput({ type: 'tel', placeholder: '(11) 98765-4321', icon: 'telephone' })}
      </div>
      <div>
        <label style="display: block; margin-bottom: 6px; color: #5E5873; font-size: 14px; font-weight: 500;">URL</label>
        ${renderInput({ type: 'url', placeholder: 'https://escola.com.br', icon: 'link-45deg' })}
      </div>
      <div>
        <label style="display: block; margin-bottom: 6px; color: #5E5873; font-size: 14px; font-weight: 500;">Search</label>
        ${renderInput({ type: 'search', placeholder: 'Buscar missões...', icon: 'search' })}
      </div>
    </div>
  `
};

export const AllSizes = {
  render: () => `
    ${styles}
    <div style="display: flex; flex-direction: column; gap: 16px; max-width: 400px;">
      <div>
        <label style="display: block; margin-bottom: 6px; color: #5E5873; font-size: 13px; font-weight: 500;">Small (32px)</label>
        ${renderInput({ size: 'sm', placeholder: 'Input pequeno', icon: 'person' })}
      </div>
      <div>
        <label style="display: block; margin-bottom: 6px; color: #5E5873; font-size: 14px; font-weight: 500;">Medium (38px)</label>
        ${renderInput({ size: 'md', placeholder: 'Input médio', icon: 'person' })}
      </div>
      <div>
        <label style="display: block; margin-bottom: 6px; color: #5E5873; font-size: 16px; font-weight: 500;">Large (46px)</label>
        ${renderInput({ size: 'lg', placeholder: 'Input grande', icon: 'person' })}
      </div>
    </div>
  `
};

export const ValidationStates = {
  render: () => `
    ${styles}
    <div style="display: flex; flex-direction: column; gap: 16px; max-width: 400px;">
      <div>
        <label style="display: block; margin-bottom: 6px; color: #5E5873; font-size: 14px; font-weight: 500;">Valid</label>
        ${renderInput({ 
          state: 'valid', 
          value: 'ana.silva@escola.com.br', 
          placeholder: 'Email válido',
          feedback: 'Email disponível e válido!'
        })}
      </div>
      <div>
        <label style="display: block; margin-bottom: 6px; color: #5E5873; font-size: 14px; font-weight: 500;">Invalid</label>
        ${renderInput({ 
          state: 'invalid', 
          value: 'email_invalido', 
          placeholder: 'Email inválido',
          feedback: 'Por favor, insira um email válido'
        })}
      </div>
      <div>
        <label style="display: block; margin-bottom: 6px; color: #5E5873; font-size: 14px; font-weight: 500;">Warning</label>
        ${renderInput({ 
          state: 'warning', 
          value: 'ana@gmail.com', 
          placeholder: 'Email com aviso',
          feedback: 'Recomendamos usar o email institucional'
        })}
      </div>
    </div>
  `
};

export const WithIcons = {
  render: () => `
    ${styles}
    <div style="display: flex; flex-direction: column; gap: 16px; max-width: 400px;">
      ${renderInput({ icon: 'search', iconPosition: 'left', placeholder: 'Buscar...', size: 'lg' })}
      ${renderInput({ icon: 'person', iconPosition: 'left', placeholder: 'Nome do aluno' })}
      ${renderInput({ icon: 'envelope', iconPosition: 'left', placeholder: 'Email' })}
      ${renderInput({ icon: 'geo-alt', iconPosition: 'left', placeholder: 'Cidade' })}
      ${renderInput({ icon: 'calendar', iconPosition: 'right', placeholder: 'Data de nascimento', iconPosition: 'right' })}
    </div>
  `
};

export const Disabled = {
  render: () => `
    ${styles}
    <div style="display: flex; flex-direction: column; gap: 16px; max-width: 400px;">
      ${renderInput({ disabled: true, placeholder: 'Input desabilitado' })}
      ${renderInput({ disabled: true, value: 'Valor desabilitado', icon: 'person' })}
    </div>
  `
};

export const Readonly = {
  render: () => `
    ${styles}
    <div style="display: flex; flex-direction: column; gap: 16px; max-width: 400px;">
      ${renderInput({ readonly: true, value: 'Campo somente leitura', icon: 'lock' })}
      ${renderInput({ readonly: true, value: '12345-678', placeholder: 'Matrícula', icon: 'hash' })}
    </div>
  `
};

export const WithMaxLength = {
  render: () => `
    ${styles}
    <div style="display: flex; flex-direction: column; gap: 16px; max-width: 400px;">
      ${renderInput({ 
        maxLength: 50, 
        value: 'Ana Silva Santos', 
        placeholder: 'Nome (máx. 50 caracteres)',
        icon: 'person'
      })}
      ${renderInput({ 
        maxLength: 100, 
        value: 'Missão de Matemática sobre Frações', 
        placeholder: 'Título da missão (máx. 100 caracteres)',
        icon: 'bookmark'
      })}
    </div>
  `
};

export const CadastroDeAluno = {
  render: () => `
    ${styles}
    <div style="max-width: 500px; padding: 24px; background: #fff; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
      <h2 style="margin: 0 0 24px 0; color: #5E5873; font-size: 18px; font-weight: 600;">
        👤 Cadastro de Novo Aluno
      </h2>
      
      <div style="display: flex; flex-direction: column; gap: 16px;">
        <div>
          <label style="display: block; margin-bottom: 6px; color: #5E5873; font-size: 14px; font-weight: 500;">
            Nome Completo <span style="color: #EA5455;">*</span>
          </label>
          ${renderInput({ 
            placeholder: 'Digite o nome completo',
            icon: 'person',
            value: 'Ana Beatriz Silva Santos',
            state: 'valid',
            maxLength: 100
          })}
        </div>
        
        <div>
          <label style="display: block; margin-bottom: 6px; color: #5E5873; font-size: 14px; font-weight: 500;">
            Email <span style="color: #EA5455;">*</span>
          </label>
          ${renderInput({ 
            type: 'email',
            placeholder: 'email@escola.com.br',
            icon: 'envelope',
            value: 'ana.santos',
            state: 'invalid',
            feedback: 'Por favor, insira um email válido'
          })}
        </div>
        
        <div>
          <label style="display: block; margin-bottom: 6px; color: #5E5873; font-size: 14px; font-weight: 500;">
            Matrícula
          </label>
          ${renderInput({ 
            type: 'text',
            placeholder: '000000',
            icon: 'hash',
            value: '202401234',
            state: 'valid'
          })}
        </div>
        
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
          <div>
            <label style="display: block; margin-bottom: 6px; color: #5E5873; font-size: 14px; font-weight: 500;">
              Data de Nascimento
            </label>
            ${renderInput({ 
              type: 'text',
              placeholder: 'DD/MM/AAAA',
              icon: 'calendar',
              value: '15/08/2012',
              size: 'md'
            })}
          </div>
          <div>
            <label style="display: block; margin-bottom: 6px; color: #5E5873; font-size: 14px; font-weight: 500;">
              Telefone
            </label>
            ${renderInput({ 
              type: 'tel',
              placeholder: '(00) 00000-0000',
              icon: 'telephone',
              size: 'md'
            })}
          </div>
        </div>
      </div>
    </div>
  `
};

export const BuscaDeTurma = {
  render: () => `
    ${styles}
    <div style="max-width: 600px; padding: 24px; background: #fff; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
      <h2 style="margin: 0 0 16px 0; color: #5E5873; font-size: 18px; font-weight: 600;">
        🔍 Buscar Turmas
      </h2>
      
      <div style="display: flex; flex-direction: column; gap: 16px;">
        ${renderInput({ 
          type: 'search',
          placeholder: 'Digite o nome ou código da turma...',
          icon: 'search',
          size: 'lg'
        })}
        
        <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 12px;">
          ${renderInput({ 
            type: 'text',
            placeholder: 'Ano',
            icon: 'calendar3',
            size: 'sm'
          })}
          ${renderInput({ 
            type: 'text',
            placeholder: 'Turma',
            icon: 'collection',
            size: 'sm'
          })}
          ${renderInput({ 
            type: 'text',
            placeholder: 'Período',
            icon: 'clock',
            size: 'sm'
          })}
        </div>
        
        <div style="padding: 16px; background: #F8F8F8; border-radius: 6px;">
          <div style="color: #6E6B7B; font-size: 13px; margin-bottom: 8px;">
            <strong>Dica:</strong> Use filtros para refinar sua busca
          </div>
          <div style="color: #6E6B7B; font-size: 12px;">
            • Use o código da turma para busca exata<br>
            • Filtre por ano letivo e período<br>
            • Busque por nome parcial do professor
          </div>
        </div>
      </div>
    </div>
  `
};

export const FormularioDeMissao = {
  render: () => `
    ${styles}
    <div style="max-width: 600px; padding: 24px; background: #fff; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
      <h2 style="margin: 0 0 24px 0; color: #5E5873; font-size: 18px; font-weight: 600;">
        📚 Criar Nova Missão
      </h2>
      
      <div style="display: flex; flex-direction: column; gap: 18px;">
        <div>
          <label style="display: block; margin-bottom: 6px; color: #5E5873; font-size: 14px; font-weight: 500;">
            Título da Missão <span style="color: #EA5455;">*</span>
          </label>
          ${renderInput({ 
            placeholder: 'Ex: Frações e Números Decimais',
            icon: 'bookmark',
            value: 'Frações - Conceitos Básicos',
            state: 'valid',
            maxLength: 80
          })}
        </div>
        
        <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 16px;">
          <div>
            <label style="display: block; margin-bottom: 6px; color: #5E5873; font-size: 14px; font-weight: 500;">
              Pontuação Máxima <span style="color: #EA5455;">*</span>
            </label>
            ${renderInput({ 
              type: 'number',
              placeholder: '0',
              icon: 'star',
              value: '100'
            })}
          </div>
          <div>
            <label style="display: block; margin-bottom: 6px; color: #5E5873; font-size: 14px; font-weight: 500;">
              Duração (min)
            </label>
            ${renderInput({ 
              type: 'number',
              placeholder: '0',
              icon: 'clock',
              value: '45'
            })}
          </div>
        </div>
        
        <div>
          <label style="display: block; margin-bottom: 6px; color: #5E5873; font-size: 14px; font-weight: 500;">
            Tags (separadas por vírgula)
          </label>
          ${renderInput({ 
            placeholder: 'Ex: matemática, frações, 5º ano',
            icon: 'tags',
            value: 'matemática, frações, ensino fundamental'
          })}
        </div>
        
        <div>
          <label style="display: block; margin-bottom: 6px; color: #5E5873; font-size: 14px; font-weight: 500;">
            URL de Referência (opcional)
          </label>
          ${renderInput({ 
            type: 'url',
            placeholder: 'https://...',
            icon: 'link-45deg'
          })}
        </div>
      </div>
    </div>
  `
};

export const KeyboardAccessibility = {
  render: () => `
    ${styles}
    <div style="max-width: 500px; padding: 24px; background: #F8F8F8; border-radius: 8px;">
      <div style="margin-bottom: 16px; padding: 12px; background: #E8F5E9; border-left: 4px solid #28C76F; border-radius: 4px;">
        <strong style="color: #28C76F;">♿ Acessibilidade:</strong>
        <ul style="margin: 8px 0 0 0; padding-left: 20px; color: #5E5873; font-size: 13px;">
          <li>Use <kbd>Tab</kbd> para navegar entre campos</li>
          <li>Focus ring visível em todos os inputs</li>
          <li>Labels associados com aria-describedby</li>
          <li>Estados de validação acessíveis</li>
          <li>Placeholders não substituem labels</li>
        </ul>
      </div>
      
      <div style="display: flex; flex-direction: column; gap: 16px;">
        <div>
          <label for="name-input" style="display: block; margin-bottom: 6px; color: #5E5873; font-size: 14px; font-weight: 500;">
            Nome (com label)
          </label>
          ${renderInput({ 
            placeholder: 'Digite seu nome',
            icon: 'person'
          })}
        </div>
        <div>
          <label for="email-input" style="display: block; margin-bottom: 6px; color: #5E5873; font-size: 14px; font-weight: 500;">
            Email (com validação)
          </label>
          ${renderInput({ 
            type: 'email',
            placeholder: 'seu@email.com',
            icon: 'envelope',
            state: 'invalid',
            feedback: 'Mensagem acessível via aria-describedby'
          })}
        </div>
      </div>
    </div>
  `
};
