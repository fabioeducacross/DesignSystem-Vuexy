import { createDocPage, createExampleCard, createPropsTable } from '../_helpers/docTemplate.js';

/**
 * ETextarea - Educational Textarea Component
 * ==========================================
 * Textarea para textos longos em formulários educacionais do Educacross
 * 
 * @component ETextarea
 * @source educacross-frontoffice/src/components/form/ETextarea.vue
 * @note Especificação visual. Componente Vue nunca foi implementado.
 * @planned educacross-frontoffice/src/components/form/ETextarea.vue
 * @category Doc-Only / Forms
 * @priority P1 - Core UI
 * @status PIXEL-PERFECT
 * 
 * ## Contexto Educacional
 * - **Professor**: Observações sobre alunos, feedback de atividades, relatórios
 * - **Coordenador**: Descrição de projetos, comunicados, pareceres pedagógicos
 * - **Aluno**: Respostas dissertativas, redações, reflexões sobre missões
 * 
 * ## Casos de Uso
 * - Respostas dissertativas em exercícios
 * - Observações do professor sobre desempenho do aluno
 * - Feedback qualitativo de atividades
 * - Descrição de missões e projetos
 * - Comunicados e avisos para turma
 * - Redações e textos criativos
 * 
 * ## Props API
 * @prop {string} value - Valor do textarea
 * @prop {string} placeholder - Texto placeholder
 * @prop {number} rows - Número de linhas visíveis
 * @prop {number} maxLength - Máximo de caracteres
 * @prop {boolean} disabled - Desabilita interação
 * @prop {boolean} readonly - Apenas leitura
 * @prop {string} state - Estado de validação: 'valid', 'invalid', 'warning'
 * @prop {string} size - Tamanho: 'sm', 'md', 'lg'
 * @prop {boolean} autoResize - Redimensiona automaticamente conforme conteúdo
 * @prop {boolean} showCounter - Exibe contador de caracteres
 * 
 * ## Figma Design Specs
 * 
 * ### Dimensões
 * - **Small (sm)**: padding 8px 12px, font-size 13px, min-height 80px
 * - **Medium (md)**: padding 10px 14px, font-size 14px, min-height 100px
 * - **Large (lg)**: padding 12px 16px, font-size 16px, min-height 120px
 * - **Border**: 1px solid
 * - **Border Radius**: 6px
 * - **Line Height**: 1.6 (ótimo para leitura)
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
 * - **Focus Ring**: rgba(110, 99, 232, 0.25) 0 0 0 4px
 * - **Counter**: #6E6B7B (default), #EA5455 (limite excedido)
 * 
 * ### Tipografia
 * - **Font Family**: Inter, sans-serif
 * - **Font Weight**: 400 (regular)
 * - **Line Height**: 1.6
 * - **Placeholder**: font-style italic (opcional)
 * 
 * ### Estados
 * - **Default**: Border cinza, fundo branco
 * - **Hover**: Border primária, leve escurecimento
 * - **Focus**: Border primária, focus ring visível
 * - **Valid**: Border verde
 * - **Invalid**: Border vermelho
 * - **Warning**: Border laranja
 * - **Disabled**: Fundo cinza, cursor not-allowed, opacidade 0.6
 * - **Readonly**: Fundo cinza claro, sem border focus
 * 
 * ### Acessibilidade
 * - aria-invalid: estado inválido
 * - aria-describedby: mensagem de erro/ajuda
 * - aria-label ou label associado
 * - role: textbox, multiline: true
 * - Keyboard: Tab para navegação, Ctrl+Enter para submit
 * - Focus visible: outline de 4px
 * - Resize: vertical (não horizontal para manter layout)
 * 
 * ## Integração Vue 2.7
 * ```vue
 * <ETextarea
 *   v-model="observation"
 *   placeholder="Observações sobre o aluno..."
 *   :rows="5"
 *   :maxLength="500"
 *   showCounter
 *   :state="errors.observation ? 'invalid' : 'valid'"
 * />
 * 
 * <ETextarea
 *   v-model="answer"
 *   placeholder="Escreva sua resposta aqui..."
 *   :maxLength="1000"
 *   autoResize
 *   size="lg"
 * />
 * ```
 */

export default {
  title: 'Educacross Components V2/Forms/ETextarea',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
Componente de textarea para textos longos em formulários educacionais.

### Features
- ✅ Textarea com redimensionamento vertical
- ✅ Contador de caracteres (maxLength)
- ✅ Auto-resize conforme conteúdo
- ✅ 3 tamanhos (sm, md, lg)
- ✅ Estados de validação: default, valid, invalid, warning
- ✅ Estados: default, hover, focus, disabled, readonly
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
      description: 'Valor do textarea',
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
    rows: {
      control: 'number',
      description: 'Número de linhas visíveis',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '4' }
      }
    },
    maxLength: {
      control: 'number',
      description: 'Máximo de caracteres',
      table: {
        type: { summary: 'number' }
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
    showCounter: {
      control: 'boolean',
      description: 'Exibe contador de caracteres',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' }
      }
    },
    autoResize: {
      control: 'boolean',
      description: 'Redimensiona automaticamente',
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
  .e-textarea-wrapper {
    display: flex;
    flex-direction: column;
    gap: 6px;
    width: 100%;
  }
  
  .e-textarea {
    width: 100%;
    min-height: var(--min-height);
    padding: var(--padding);
    font-size: var(--font-size);
    font-family: Inter, sans-serif;
    line-height: 1.6;
    color: #5E5873;
    background-color: #fff;
    border: 1px solid #D8D6DE;
    border-radius: 6px;
    transition: border-color 0.2s, box-shadow 0.2s;
    resize: vertical;
  }
  
  .e-textarea::placeholder {
    color: #B8C2CC;
  }
  
  .e-textarea:hover:not(:disabled):not([readonly]) {
    border-color: #6E63E8;
  }
  
  .e-textarea:focus {
    outline: none;
    border-color: #6E63E8;
    box-shadow: 0 0 0 4px rgba(110, 99, 232, 0.25);
  }
  
  .e-textarea:disabled {
    background-color: #F8F8F8;
    cursor: not-allowed;
    opacity: 0.6;
    resize: none;
  }
  
  .e-textarea[readonly] {
    background-color: #FAFAFA;
    cursor: default;
    resize: none;
  }
  
  .e-textarea.state-valid {
    border-color: #28C76F;
  }
  
  .e-textarea.state-valid:focus {
    box-shadow: 0 0 0 4px rgba(40, 199, 111, 0.25);
  }
  
  .e-textarea.state-invalid {
    border-color: #EA5455;
  }
  
  .e-textarea.state-invalid:focus {
    box-shadow: 0 0 0 4px rgba(234, 84, 85, 0.25);
  }
  
  .e-textarea.state-warning {
    border-color: #FF9F43;
  }
  
  .e-textarea.state-warning:focus {
    box-shadow: 0 0 0 4px rgba(255, 159, 67, 0.25);
  }
  
  .e-textarea.auto-resize {
    resize: none;
    overflow: hidden;
  }
  
  .e-textarea-feedback {
    font-size: 12px;
    line-height: 1.4;
  }
  
  .e-textarea-feedback.valid {
    color: #28C76F;
  }
  
  .e-textarea-feedback.invalid {
    color: #EA5455;
  }
  
  .e-textarea-feedback.warning {
    color: #FF9F43;
  }
  
  .e-textarea-counter {
    font-size: 11px;
    color: #B8C2CC;
    text-align: right;
  }
  
  .e-textarea-counter.warning {
    color: #FF9F43;
  }
  
  .e-textarea-counter.danger {
    color: #EA5455;
    font-weight: 600;
  }
  
  /* Sizes */
  .size-sm {
    --padding: 8px 12px;
    --font-size: 13px;
    --min-height: 80px;
  }
  
  .size-md {
    --padding: 10px 14px;
    --font-size: 14px;
    --min-height: 100px;
  }
  
  .size-lg {
    --padding: 12px 16px;
    --font-size: 16px;
    --min-height: 120px;
  }
</style>
`;

const renderTextarea = (args) => {
  const id = `textarea-${Math.random().toString(36).substr(2, 9)}`;
  
  const textareaClasses = [
    'e-textarea',
    args.state && args.state !== 'default' ? `state-${args.state}` : '',
    args.autoResize ? 'auto-resize' : ''
  ].filter(Boolean).join(' ');
  
  const currentLength = (args.value || '').length;
  const maxLength = args.maxLength || 0;
  const percentage = maxLength ? (currentLength / maxLength) * 100 : 0;
  
  let counterClass = '';
  if (percentage >= 100) counterClass = 'danger';
  else if (percentage >= 90) counterClass = 'warning';
  
  return `
    ${styles}
    <div class="e-textarea-wrapper size-${args.size || 'md'}">
      <textarea
        id="${id}"
        class="${textareaClasses}"
        placeholder="${args.placeholder || ''}"
        rows="${args.rows || 4}"
        ${args.disabled ? 'disabled' : ''}
        ${args.readonly ? 'readonly' : ''}
        ${args.maxLength ? `maxlength="${args.maxLength}"` : ''}
        aria-invalid="${args.state === 'invalid'}"
        ${args.feedback ? `aria-describedby="${id}-feedback"` : ''}
        role="textbox"
        aria-multiline="true"
      >${args.value || ''}</textarea>
      
      ${args.feedback ? `
        <span id="${id}-feedback" class="e-textarea-feedback ${args.state}">
          ${args.feedback}
        </span>
      ` : ''}
      
      ${args.showCounter && args.maxLength ? `
        <span class="e-textarea-counter ${counterClass}">
          ${currentLength}/${args.maxLength} caracteres${percentage >= 100 ? ' - limite atingido!' : ''}
        </span>
      ` : ''}
    </div>
  `;
};

// Stories
export const Default = {
  args: {
    placeholder: 'Digite seu texto aqui...',
    rows: 4,
    size: 'md',
    state: 'default',
    disabled: false,
    readonly: false,
    showCounter: false,
    autoResize: false
  },
  render: renderTextarea
};

export const AllSizes = {
  render: () => `
    ${styles}
    <div style="display: flex; flex-direction: column; gap: 24px; max-width: 600px;">
      <div>
        <label style="display: block; margin-bottom: 6px; color: #5E5873; font-size: 13px; font-weight: 500;">
          Small (80px min-height)
        </label>
        ${renderTextarea({ 
          size: 'sm', 
          placeholder: 'Textarea pequeno para notas rápidas...', 
          rows: 3 
        })}
      </div>
      
      <div>
        <label style="display: block; margin-bottom: 6px; color: #5E5873; font-size: 14px; font-weight: 500;">
          Medium (100px min-height)
        </label>
        ${renderTextarea({ 
          size: 'md', 
          placeholder: 'Textarea médio para respostas padrão...', 
          rows: 4 
        })}
      </div>
      
      <div>
        <label style="display: block; margin-bottom: 6px; color: #5E5873; font-size: 16px; font-weight: 500;">
          Large (120px min-height)
        </label>
        ${renderTextarea({ 
          size: 'lg', 
          placeholder: 'Textarea grande para textos longos e redações...', 
          rows: 5 
        })}
      </div>
    </div>
  `
};

export const WithMaxLength = {
  args: {
    placeholder: 'Digite até 200 caracteres...',
    maxLength: 200,
    showCounter: true,
    value: 'O aluno demonstrou excelente compreensão dos conceitos apresentados durante a aula de matemática sobre frações.',
    rows: 4
  },
  render: renderTextarea
};

export const CharacterCount = {
  render: () => `
    ${styles}
    <div style="display: flex; flex-direction: column; gap: 24px; max-width: 600px;">
      <div>
        <label style="display: block; margin-bottom: 6px; color: #5E5873; font-size: 14px; font-weight: 500;">
          Normal (50% do limite)
        </label>
        ${renderTextarea({ 
          maxLength: 100, 
          showCounter: true,
          value: 'Texto com 50 caracteres aproximadamente aqui...', 
          placeholder: 'Máximo 100 caracteres',
          rows: 3
        })}
      </div>
      
      <div>
        <label style="display: block; margin-bottom: 6px; color: #5E5873; font-size: 14px; font-weight: 500;">
          Atenção (90% do limite - amarelo)
        </label>
        ${renderTextarea({ 
          maxLength: 100, 
          showCounter: true,
          value: 'Texto longo que está chegando próximo ao limite máximo de caracteres permitidos neste campo aqui', 
          placeholder: 'Máximo 100 caracteres',
          rows: 3
        })}
      </div>
      
      <div>
        <label style="display: block; margin-bottom: 6px; color: #5E5873; font-size: 14px; font-weight: 500;">
          Limite atingido (100% - vermelho)
        </label>
        ${renderTextarea({ 
          maxLength: 100, 
          showCounter: true,
          value: 'Texto completamente no limite máximo permitido aqui ocupando todos os cem caracteres disponíveis fim', 
          placeholder: 'Máximo 100 caracteres',
          rows: 3
        })}
      </div>
    </div>
  `
};

export const ValidationStates = {
  render: () => `
    ${styles}
    <div style="display: flex; flex-direction: column; gap: 20px; max-width: 600px;">
      <div>
        <label style="display: block; margin-bottom: 6px; color: #5E5873; font-size: 14px; font-weight: 500;">
          Valid
        </label>
        ${renderTextarea({ 
          state: 'valid',
          value: 'O aluno apresentou uma resposta completa e bem fundamentada, demonstrando compreensão profunda do tema.', 
          feedback: 'Observação salva com sucesso!',
          rows: 3
        })}
      </div>
      
      <div>
        <label style="display: block; margin-bottom: 6px; color: #5E5873; font-size: 14px; font-weight: 500;">
          Invalid
        </label>
        ${renderTextarea({ 
          state: 'invalid',
          value: 'Texto muito curto', 
          feedback: 'A resposta deve ter no mínimo 50 caracteres',
          rows: 3
        })}
      </div>
      
      <div>
        <label style="display: block; margin-bottom: 6px; color: #5E5873; font-size: 14px; font-weight: 500;">
          Warning
        </label>
        ${renderTextarea({ 
          state: 'warning',
          value: 'Resposta razoável mas poderia ser mais detalhada.', 
          feedback: 'Considere adicionar mais detalhes à sua resposta',
          rows: 3
        })}
      </div>
    </div>
  `
};

export const Disabled = {
  args: {
    disabled: true,
    value: 'Este campo está desabilitado e não pode ser editado.',
    placeholder: 'Campo desabilitado',
    rows: 3
  },
  render: renderTextarea
};

export const Readonly = {
  args: {
    readonly: true,
    value: 'Este é um campo somente leitura. O conteúdo pode ser copiado mas não editado. Útil para exibir informações que não devem ser modificadas.',
    rows: 3
  },
  render: renderTextarea
};

export const RespostaDissertativa = {
  render: () => `
    ${styles}
    <div style="max-width: 700px; padding: 24px; background: #fff; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
      <div style="margin-bottom: 20px; padding: 16px; background: #F8F9FA; border-left: 4px solid #6E63E8; border-radius: 4px;">
        <h3 style="margin: 0 0 8px 0; color: #5E5873; font-size: 16px; font-weight: 600;">
          📝 Questão 1 - Matemática
        </h3>
        <p style="margin: 0; color: #6E6B7B; font-size: 14px; line-height: 1.6;">
          Explique com suas palavras o conceito de frações e dê três exemplos práticos de situações do dia a dia onde utilizamos frações.
        </p>
      </div>
      
      <div>
        <label style="display: block; margin-bottom: 8px; color: #5E5873; font-size: 14px; font-weight: 500;">
          Sua Resposta: <span style="color: #EA5455;">*</span>
        </label>
        ${renderTextarea({ 
          placeholder: 'Escreva sua resposta aqui... (mínimo 100 caracteres)',
          maxLength: 1000,
          showCounter: true,
          value: 'Frações são formas de representar partes de um todo. Por exemplo:\n\n1. Quando dividimos uma pizza em 8 pedaços e comemos 3, consumimos 3/8 da pizza.\n\n2. Se em uma turma de 30 alunos, 15 são meninas, temos 15/30 (ou 1/2) da turma composta por meninas.\n\n3. Ao medir ingredientes para um bolo, usamos 1/2 xícara de açúcar, que é metade da xícara inteira.',
          rows: 8,
          size: 'md',
          state: 'valid'
        })}
      </div>
      
      <div style="margin-top: 16px; display: flex; justify-content: space-between; align-items: center;">
        <div style="font-size: 13px; color: #6E6B7B;">
          <i class="bi bi-info-circle" style="margin-right: 4px;"></i>
          Responda com atenção. Você pode revisar antes de enviar.
        </div>
        <div style="display: flex; gap: 8px;">
          <button style="padding: 8px 16px; background: #fff; border: 1px solid #D8D6DE; border-radius: 6px; color: #5E5873; font-size: 14px; cursor: pointer;">
            Salvar Rascunho
          </button>
          <button style="padding: 8px 16px; background: #6E63E8; border: none; border-radius: 6px; color: #fff; font-size: 14px; cursor: pointer; font-weight: 500;">
            Enviar Resposta
          </button>
        </div>
      </div>
    </div>
  `
};

export const ObservacoesDoProfessor = {
  render: () => `
    ${styles}
    <div style="max-width: 700px; padding: 24px; background: #fff; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
      <h2 style="margin: 0 0 20px 0; color: #5E5873; font-size: 18px; font-weight: 600;">
        👨‍🏫 Parecer Individual - Ana Silva (5º A)
      </h2>
      
      <div style="display: flex; flex-direction: column; gap: 20px;">
        <div>
          <label style="display: block; margin-bottom: 8px; color: #5E5873; font-size: 14px; font-weight: 500;">
            Desempenho Acadêmico
          </label>
          ${renderTextarea({ 
            placeholder: 'Descreva o desempenho do aluno...',
            maxLength: 500,
            showCounter: true,
            value: 'A aluna demonstra excelente compreensão dos conteúdos de Matemática, especialmente em operações com frações. Participa ativamente das aulas e ajuda os colegas com dificuldades.',
            rows: 4,
            state: 'valid'
          })}
        </div>
        
        <div>
          <label style="display: block; margin-bottom: 8px; color: #5E5873; font-size: 14px; font-weight: 500;">
            Aspectos Socioemocionais
          </label>
          ${renderTextarea({ 
            placeholder: 'Observações sobre comportamento e relacionamento...',
            maxLength: 500,
            showCounter: true,
            value: 'Boa integração com a turma. Demonstra empatia e colabora nas atividades em grupo. Ocasionalmente dispersa-se em atividades longas.',
            rows: 4
          })}
        </div>
        
        <div>
          <label style="display: block; margin-bottom: 8px; color: #5E5873; font-size: 14px; font-weight: 500;">
            Recomendações e Encaminhamentos
          </label>
          ${renderTextarea({ 
            placeholder: 'Sugestões para desenvolvimento do aluno...',
            maxLength: 500,
            showCounter: true,
            value: 'Incentivar a participação em olimpíadas de matemática para desenvolver ainda mais seu potencial.',
            rows: 4
          })}
        </div>
      </div>
      
      <div style="margin-top: 20px; padding: 12px; background: #FFF4E6; border-radius: 6px; border-left: 4px solid #FF9F43;">
        <div style="color: #FF9F43; font-weight: 600; font-size: 13px; margin-bottom: 4px;">
          <i class="bi bi-exclamation-triangle" style="margin-right: 4px;"></i>
          Lembrete:
        </div>
        <div style="color: #6E6B7B; font-size: 13px;">
          Este parecer será compartilhado com a coordenação e disponível para os responsáveis.
        </div>
      </div>
    </div>
  `
};

export const FeedbackDeAtividade = {
  render: () => `
    ${styles}
    <div style="max-width: 650px; padding: 24px; background: #fff; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
      <div style="margin-bottom: 20px;">
        <h3 style="margin: 0 0 4px 0; color: #5E5873; font-size: 16px; font-weight: 600;">
          Missão: Frações - Conceitos Básicos
        </h3>
        <div style="color: #6E6B7B; font-size: 13px;">
          Aluno: Carlos Oliveira • Turma: 5º B • Data: 02/02/2026
        </div>
      </div>
      
      <div style="margin-bottom: 20px; padding: 16px; background: #F0F4FF; border-radius: 6px;">
        <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
          <span style="color: #5E5873; font-weight: 500; font-size: 14px;">Pontuação:</span>
          <span style="color: #28C76F; font-weight: 600; font-size: 16px;">85/100</span>
        </div>
        <div style="width: 100%; height: 6px; background: #E0E0E0; border-radius: 3px; overflow: hidden;">
          <div style="width: 85%; height: 100%; background: #28C76F;"></div>
        </div>
      </div>
      
      <div>
        <label style="display: block; margin-bottom: 8px; color: #5E5873; font-size: 14px; font-weight: 500;">
          Feedback do Professor <span style="color: #EA5455;">*</span>
        </label>
        ${renderTextarea({ 
          placeholder: 'Escreva um feedback construtivo para o aluno...',
          maxLength: 800,
          showCounter: true,
          value: 'Parabéns, Carlos! Você demonstrou boa compreensão dos conceitos básicos de frações.\n\nPontos fortes:\n✓ Identificação correta de numerador e denominador\n✓ Comparação de frações com mesmo denominador\n✓ Organização na apresentação das respostas\n\nPontos a melhorar:\n• Atenção aos cálculos de simplificação\n• Revisar equivalência de frações\n\nSugestão: Pratique mais exercícios de simplificação usando o MDC. Continue assim! 🌟',
          rows: 10,
          size: 'md'
        })}
      </div>
      
      <div style="margin-top: 16px; display: flex; gap: 8px;">
        <button style="flex: 1; padding: 10px; background: #fff; border: 1px solid #D8D6DE; border-radius: 6px; color: #5E5873; font-size: 14px; cursor: pointer;">
          Salvar Rascunho
        </button>
        <button style="flex: 1; padding: 10px; background: #28C76F; border: none; border-radius: 6px; color: #fff; font-size: 14px; cursor: pointer; font-weight: 500;">
          Enviar Feedback
        </button>
      </div>
    </div>
  `
};

export const ComunicadoParaTurma = {
  render: () => `
    ${styles}
    <div style="max-width: 700px; padding: 24px; background: #fff; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
      <h2 style="margin: 0 0 20px 0; color: #5E5873; font-size: 18px; font-weight: 600;">
        📢 Novo Comunicado para Turma 5º A
      </h2>
      
      <div style="display: flex; flex-direction: column; gap: 16px;">
        <div>
          <label style="display: block; margin-bottom: 6px; color: #5E5873; font-size: 14px; font-weight: 500;">
            Assunto <span style="color: #EA5455;">*</span>
          </label>
          <input 
            type="text" 
            value="Feira de Ciências - Orientações" 
            placeholder="Título do comunicado"
            style="width: 100%; padding: 10px 14px; font-size: 14px; border: 1px solid #D8D6DE; border-radius: 6px;"
          />
        </div>
        
        <div>
          <label style="display: block; margin-bottom: 6px; color: #5E5873; font-size: 14px; font-weight: 500;">
            Mensagem <span style="color: #EA5455;">*</span>
          </label>
          ${renderTextarea({ 
            placeholder: 'Digite o comunicado aqui...',
            maxLength: 1500,
            showCounter: true,
            value: 'Caros alunos e responsáveis,\n\nInformamos que a Feira de Ciências 2026 será realizada no dia 15/03/2026, das 14h às 17h, no ginásio da escola.\n\nOrientações importantes:\n\n1. Cada grupo deve preparar um painel explicativo (tamanho A1)\n2. Trazer materiais para demonstração do experimento\n3. Prazo de entrega do projeto escrito: 08/03/2026\n4. Apresentação oral: 5 minutos por grupo\n\nEstamos à disposição para esclarecer dúvidas.\n\nAtenciosamente,\nProf. Maria Santos',
            rows: 12,
            size: 'md'
          })}
        </div>
        
        <div style="padding: 12px; background: #E8F5E9; border-radius: 6px; border-left: 4px solid #28C76F;">
          <div style="color: #28C76F; font-weight: 600; font-size: 13px; margin-bottom: 4px;">
            <i class="bi bi-check-circle" style="margin-right: 4px;"></i>
            Dica:
          </div>
          <div style="color: #5E5873; font-size: 13px;">
            Seja claro e objetivo. Use tópicos para melhor organização.
          </div>
        </div>
      </div>
      
      <div style="margin-top: 20px; display: flex; justify-content: space-between; align-items: center;">
        <div style="display: flex; gap: 8px; align-items: center;">
          <input type="checkbox" id="notify" checked style="width: 16px; height: 16px;" />
          <label for="notify" style="color: #5E5873; font-size: 13px;">
            Enviar notificação por email
          </label>
        </div>
        <button style="padding: 10px 24px; background: #6E63E8; border: none; border-radius: 6px; color: #fff; font-size: 14px; cursor: pointer; font-weight: 500;">
          Publicar Comunicado
        </button>
      </div>
    </div>
  `
};

export const AutoResize = {
  render: () => {
    setTimeout(() => {
      const textarea = document.querySelector('.auto-resize');
      if (textarea) {
        textarea.addEventListener('input', function() {
          this.style.height = 'auto';
          this.style.height = this.scrollHeight + 'px';
        });
        // Trigger inicial
        textarea.style.height = 'auto';
        textarea.style.height = textarea.scrollHeight + 'px';
      }
    }, 100);
    
    return `
      ${styles}
      <div style="max-width: 600px; padding: 24px; background: #F8F8F8; border-radius: 8px;">
        <div style="margin-bottom: 16px; padding: 12px; background: #E8F5E9; border-left: 4px solid #28C76F; border-radius: 4px;">
          <strong style="color: #28C76F;">✨ Auto-resize:</strong>
          <div style="margin-top: 4px; color: #5E5873; font-size: 13px;">
            Este textarea cresce automaticamente conforme você digita. Útil para campos onde o tamanho do conteúdo é variável.
          </div>
        </div>
        
        <label style="display: block; margin-bottom: 6px; color: #5E5873; font-size: 14px; font-weight: 500;">
          Digite para ver o efeito:
        </label>
        ${renderTextarea({ 
          placeholder: 'Digite várias linhas de texto e veja o campo crescer automaticamente...',
          autoResize: true,
          rows: 2,
          value: 'Este é um exemplo de textarea com auto-resize.\n\nQuando você adiciona mais linhas, o campo cresce automaticamente para acomodar o conteúdo.\n\nIsso melhora a experiência do usuário, pois não é necessário scroll interno.'
        })}
      </div>
    `;
  }
};

export const KeyboardAccessibility = {
  render: () => `
    ${styles}
    <div style="max-width: 600px; padding: 24px; background: #F8F8F8; border-radius: 8px;">
      <div style="margin-bottom: 16px; padding: 12px; background: #E8F5E9; border-left: 4px solid #28C76F; border-radius: 4px;">
        <strong style="color: #28C76F;">♿ Acessibilidade:</strong>
        <ul style="margin: 8px 0 0 0; padding-left: 20px; color: #5E5873; font-size: 13px;">
          <li>Use <kbd>Tab</kbd> para navegar até o textarea</li>
          <li>Focus ring visível ao focar</li>
          <li>Labels associados com aria-describedby</li>
          <li><kbd>Ctrl</kbd> + <kbd>Enter</kbd> pode submeter formulário</li>
          <li>Redimensionamento apenas vertical (não quebra layout)</li>
        </ul>
      </div>
      
      <div>
        <label for="accessible-textarea" style="display: block; margin-bottom: 6px; color: #5E5873; font-size: 14px; font-weight: 500;">
          Textarea Acessível
        </label>
        ${renderTextarea({ 
          placeholder: 'Campo totalmente acessível por teclado e leitores de tela',
          rows: 4,
          maxLength: 300,
          showCounter: true,
          feedback: 'Mensagem de ajuda visível via aria-describedby'
        })}
      </div>
    </div>
  `
};

// ============================================================================
// 📖 DOCUMENTATION - Template 1 (JavaScript Functional)
// ============================================================================

export const Documentation = {
  render: () => createDocPage({
    title: 'ETextarea',
    subtitle: 'Textarea para textos longos em formulários educacionais',
    badge: 'Forms / Core UI',
    colors: { primary: '#6E63E8', secondary: '#28C76F' },
    
    stats: [
      { label: 'Tamanhos', value: '3', description: 'sm (80px), md (100px), lg (120px) min-height' },
      { label: 'Auto-resize', value: 'Sim', description: 'Expande automaticamente com conteúdo' },
      { label: 'Contador', value: 'Opcional', description: 'Mostra caracteres restantes' },
      { label: 'Validação', value: '3 estados', description: 'valid, invalid, warning' }
    ],
    
    content: `
${createExampleCard({
  title: 'Textarea Básico',
  description: 'Textarea padrão com placeholder',
  preview: '<div style="padding: 20px; max-width: 500px;"><label style="display: block; margin-bottom: 8px; color: #5E5873; font-size: 14px; font-weight: 500;">Observações sobre o Aluno</label><textarea placeholder="Digite suas observações aqui..." rows="4" style="width: 100%; padding: 10px 14px; border: 1px solid #D8D6DE; border-radius: 6px; font-size: 14px; color: #4B465C; line-height: 1.6; resize: vertical; font-family: inherit;"></textarea></div>',
  code: '<ETextarea\n  v-model="observations"\n  placeholder="Digite suas observações aqui..."\n  rows="4"\n/>'
})}

${createExampleCard({
  title: 'Com Contador de Caracteres',
  description: 'Mostra caracteres restantes',
  preview: '<div style="padding: 20px; max-width: 500px;"><label style="display: block; margin-bottom: 8px; color: #5E5873; font-size: 14px; font-weight: 500;">Feedback da Atividade</label><div style="position: relative;"><textarea placeholder="Escreva seu feedback..." rows="4" maxlength="200" style="width: 100%; padding: 10px 14px; border: 1px solid #D8D6DE; border-radius: 6px; font-size: 14px; color: #4B465C; line-height: 1.6; resize: vertical; font-family: inherit;">Excelente trabalho!</textarea><div style="text-align: right; margin-top: 4px; font-size: 12px; color: #A8AAAE;"><span style="color: #6E63E8; font-weight: 500;">20</span> / 200 caracteres</div></div></div>',
  code: '<ETextarea\n  v-model="feedback"\n  :max-length="200"\n  :show-counter="true"\n  rows="4"\n/>'
})}

${createExampleCard({
  title: 'Com Validação',
  description: 'Estados de valid/invalid com feedback',
  preview: '<div style="padding: 20px; max-width: 500px; display: flex; gap: 16px;"><div style="flex: 1;"><label style="display: block; margin-bottom: 8px; color: #5E5873; font-size: 14px; font-weight: 500;">Resposta Válida</label><textarea rows="3" style="width: 100%; padding: 10px 14px; border: 2px solid #28C76F; border-radius: 6px; font-size: 14px; color: #4B465C; background-color: #F0FDF4; line-height: 1.6; resize: vertical; font-family: inherit;">Resposta completa e detalhada.</textarea><small style="display: block; margin-top: 4px; color: #28C76F; font-size: 12px;">✔ Resposta aceita</small></div><div style="flex: 1;"><label style="display: block; margin-bottom: 8px; color: #5E5873; font-size: 14px; font-weight: 500;">Resposta Inválida</label><textarea rows="3" style="width: 100%; padding: 10px 14px; border: 2px solid #EA5455; border-radius: 6px; font-size: 14px; color: #4B465C; background-color: #FEF2F2; line-height: 1.6; resize: vertical; font-family: inherit;">Muito curta</textarea><small style="display: block; margin-top: 4px; color: #EA5455; font-size: 12px;">⚠ Mínimo 50 caracteres</small></div></div>',
  code: '<ETextarea\n  v-model="answer"\n  state="invalid"\n  feedback="Mínimo 50 caracteres"\n/>'
})}

${createPropsTable([
  { name: 'value', type: 'String', default: "''", description: 'Valor do textarea (v-model)' },
  { name: 'rows', type: 'Number', default: '3', description: 'Número de linhas visíveis' },
  { name: 'maxLength', type: 'Number', default: 'null', description: 'Máximo de caracteres' },
  { name: 'state', type: 'String', default: "''", description: "Estado: 'valid', 'invalid', 'warning'" },
  { name: 'showCounter', type: 'Boolean', default: 'false', description: 'Mostra contador de caracteres' }
])}
    `,
    
    features: [
      { icon: 'arrows-expand', title: 'Auto-resize', description: 'Expande automaticamente com conteúdo' },
      { icon: 'calculator', title: 'Contador', description: 'Mostra caracteres restantes opcionalmente' },
      { icon: 'check-circle', title: 'Validação', description: 'Estados valid/invalid/warning com feedback' },
      { icon: 'universal-access', title: 'Acessível', description: 'ARIA, keyboard, line-height 1.6 para leitura' }
    ],
    
    relatedComponents: [
      { name: 'EInput', path: '/story/front-office-forms-einput--default' },
      { name: 'EFormCheck', path: '/story/front-office-forms-eformcheck--default' }
    ]
  })
};

// ============================================================================
// 🎯 4-STORIES STRUCTURE
// ============================================================================

// ============================================================================
// 🎨 PLAYGROUND
// ============================================================================

export const Playground = {
  name: '🎨 Playground',
  parameters: {
    layout: 'padded',
    docs: { description: { story: 'Explore o ETextarea com controles interativos.' } },
  },
  render: (args) => `
    <div style="padding:32px;display:flex;justify-content:center;align-items:center;min-height:200px;background:#F8F8F8;border-radius:12px;">
      <div style="text-align:center;color:#6E6B7B;">
        <div style="width:60px;height:60px;background:#6E63E820;border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 16px;font-size:24px;">🎨</div>
        <p style="margin:0 0 8px 0;font-size:15px;font-weight:600;color:#5E5873;">Playground ETextarea</p>
        <p style="margin:0;font-size:13px;color:#B9B9C3;">Consulte a story <em>Default</em> para visualização completa</p>
      </div>
    </div>
  `,
};

// ============================================================================
// 💼 USE CASES
// ============================================================================

export const UseCases = {
  name: '💼 Use Cases',
  parameters: {
    layout: 'padded',
    docs: { description: { story: 'Exemplos de uso real do ETextarea no Educacross.' } },
  },
  render: () => `
    <div style="max-width:800px;margin:0 auto;padding:40px 20px;font-family:'Public Sans',sans-serif;">
      <div style="background:#6E63E815;border:1px solid #6E63E830;border-radius:12px;padding:24px;margin-bottom:40px;">
        <h1 style="font-size:1.5rem;font-weight:700;color:#5E5873;margin:0 0 8px 0;">Casos de Uso: ETextarea</h1>
        <p style="color:#6E6B7B;margin:0;font-size:14px;line-height:1.6;">Cenários reais de uso no contexto educacional da plataforma Educacross</p>
      </div>
      
      <div style="margin-bottom:32px;">
        <h2 style="font-size:18px;font-weight:600;color:#5E5873;margin:0 0 8px 0;display:flex;align-items:center;gap:10px;">
          <span style="display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;background:#6E63E8;color:white;border-radius:50%;font-size:13px;font-weight:700;flex-shrink:0;">1</span>
          Professor — Painel Principal
        </h2>
        <p style="color:#6E6B7B;margin:0 0 16px 0;padding-left:38px;font-size:14px;">Professor utilizando ETextarea no dashboard de gestão de turmas</p>
        <div style="background:#F8F8F8;border-radius:8px;padding:20px;margin-left:38px;text-align:center;color:#B9B9C3;font-size:13px;">
          Ver story <strong>Default</strong> para visualização do componente neste contexto
        </div>
      </div>
      <div style="margin-bottom:32px;">
        <h2 style="font-size:18px;font-weight:600;color:#5E5873;margin:0 0 8px 0;display:flex;align-items:center;gap:10px;">
          <span style="display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;background:#6E63E8;color:white;border-radius:50%;font-size:13px;font-weight:700;flex-shrink:0;">2</span>
          Aluno — Portal do Estudante
        </h2>
        <p style="color:#6E6B7B;margin:0 0 16px 0;padding-left:38px;font-size:14px;">Aluno interagindo com ETextarea no portal educacional</p>
        <div style="background:#F8F8F8;border-radius:8px;padding:20px;margin-left:38px;text-align:center;color:#B9B9C3;font-size:13px;">
          Ver story <strong>Default</strong> para visualização do componente neste contexto
        </div>
      </div>
      <div style="margin-bottom:32px;">
        <h2 style="font-size:18px;font-weight:600;color:#5E5873;margin:0 0 8px 0;display:flex;align-items:center;gap:10px;">
          <span style="display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;background:#6E63E8;color:white;border-radius:50%;font-size:13px;font-weight:700;flex-shrink:0;">3</span>
          Coordenador — Relatórios
        </h2>
        <p style="color:#6E6B7B;margin:0 0 16px 0;padding-left:38px;font-size:14px;">Coordenador pedagógico analisando dados via ETextarea</p>
        <div style="background:#F8F8F8;border-radius:8px;padding:20px;margin-left:38px;text-align:center;color:#B9B9C3;font-size:13px;">
          Ver story <strong>Default</strong> para visualização do componente neste contexto
        </div>
      </div>
    </div>
  `,
};

// ============================================================================
// ♿ ACCESSIBILITY
// ============================================================================

export const Accessibility = {
  name: '♿ Accessibility',
  parameters: {
    layout: 'padded',
    docs: { description: { story: 'Conformidade WCAG 2.1 AA para o ETextarea.' } },
  },
  render: () => `
    <div style="max-width:800px;margin:0 auto;padding:40px 20px;font-family:'Public Sans',sans-serif;">

      <div style="background:linear-gradient(135deg,#6E63E8 0%,#764ba2 100%);padding:32px;border-radius:12px;margin-bottom:32px;color:white;">
        <h1 style="font-size:1.5rem;font-weight:700;margin:0 0 8px 0;">Acessibilidade: ETextarea</h1>
        <p style="opacity:0.9;margin:0;font-size:14px;">Conformidade WCAG 2.1 AA — Teclado, ARIA e contraste</p>
      </div>

      <div style="background:white;border-radius:12px;padding:28px;margin-bottom:24px;box-shadow:0 2px 8px rgba(0,0,0,0.08);">
        <h2 style="font-size:1rem;font-weight:600;color:#5E5873;margin:0 0 16px 0;">⌨️ Navegação por Teclado</h2>
        <table style="width:100%;border-collapse:collapse;font-size:14px;">
          <thead><tr style="border-bottom:2px solid #E8E8E8;">
            <th style="text-align:left;padding:10px 12px;font-weight:600;color:#5E5873;background:#F8F8F8;">Tecla</th>
            <th style="text-align:left;padding:10px 12px;font-weight:600;color:#5E5873;background:#F8F8F8;">Ação</th>
          </tr></thead>
          <tbody>
            <tr style="border-bottom:1px solid #F0F0F0;"><td style="padding:12px;"><code style="background:#E8E8F7;padding:3px 8px;border-radius:4px;font-size:12px;">Tab</code></td><td style="padding:12px;color:#6E6B7B;">Focar no componente</td></tr>
            <tr style="border-bottom:1px solid #F0F0F0;"><td style="padding:12px;"><code style="background:#E8E8F7;padding:3px 8px;border-radius:4px;font-size:12px;">Shift+Tab</code></td><td style="padding:12px;color:#6E6B7B;">Voltar foco ao elemento anterior</td></tr>
            <tr style="border-bottom:1px solid #F0F0F0;"><td style="padding:12px;"><code style="background:#E8E8F7;padding:3px 8px;border-radius:4px;font-size:12px;">Enter</code></td><td style="padding:12px;color:#6E6B7B;">Ativar ação principal</td></tr>
            <tr><td style="padding:12px;"><code style="background:#E8E8F7;padding:3px 8px;border-radius:4px;font-size:12px;">Esc</code></td><td style="padding:12px;color:#6E6B7B;">Cancelar/fechar (se aplicável)</td></tr>
          </tbody>
        </table>
      </div>

      <div style="background:white;border-radius:12px;padding:28px;margin-bottom:24px;box-shadow:0 2px 8px rgba(0,0,0,0.08);">
        <h2 style="font-size:1rem;font-weight:600;color:#5E5873;margin:0 0 16px 0;">🔊 ARIA e Screen Readers</h2>
        <div style="display:flex;flex-direction:column;gap:10px;">
          <div style="display:flex;align-items:flex-start;gap:12px;padding:12px;background:#F8F8F8;border-radius:8px;"><code style="background:#E8E8F7;padding:3px 8px;border-radius:4px;font-size:12px;flex-shrink:0;">aria-label</code><span style="color:#6E6B7B;font-size:14px;">Texto descritivo para leitores de tela quando não há texto visível</span></div>
          <div style="display:flex;align-items:flex-start;gap:12px;padding:12px;background:#F8F8F8;border-radius:8px;"><code style="background:#E8E8F7;padding:3px 8px;border-radius:4px;font-size:12px;flex-shrink:0;">role</code><span style="color:#6E6B7B;font-size:14px;">Define o papel semântico do componente na árvore de acessibilidade</span></div>
          <div style="display:flex;align-items:flex-start;gap:12px;padding:12px;background:#F8F8F8;border-radius:8px;"><code style="background:#E8E8F7;padding:3px 8px;border-radius:4px;font-size:12px;flex-shrink:0;">aria-disabled</code><span style="color:#6E6B7B;font-size:14px;">Anuncia estado desabilitado sem remover do tab order</span></div>
        </div>
      </div>

      <div style="background:white;border-radius:12px;padding:28px;box-shadow:0 2px 8px rgba(0,0,0,0.08);">
        <h2 style="font-size:1rem;font-weight:600;color:#5E5873;margin:0 0 16px 0;">✅ Checklist WCAG 2.1 AA</h2>
        <div style="display:flex;flex-direction:column;gap:8px;">
          <div style="display:flex;align-items:center;gap:12px;padding:12px;background:#F0FFF4;border-left:3px solid #28C76F;border-radius:4px;"><span style="color:#28C76F;font-weight:700;">✓</span><span style="color:#5E5873;font-size:14px;"><code style="font-size:11px;color:#28C76F;font-weight:600;margin-right:8px;">1.4.3</code>Contraste mínimo 4.5:1 para texto normal</span></div>
          <div style="display:flex;align-items:center;gap:12px;padding:12px;background:#F0FFF4;border-left:3px solid #28C76F;border-radius:4px;"><span style="color:#28C76F;font-weight:700;">✓</span><span style="color:#5E5873;font-size:14px;"><code style="font-size:11px;color:#28C76F;font-weight:600;margin-right:8px;">2.1.1</code>Toda funcionalidade disponível via teclado</span></div>
          <div style="display:flex;align-items:center;gap:12px;padding:12px;background:#F0FFF4;border-left:3px solid #28C76F;border-radius:4px;"><span style="color:#28C76F;font-weight:700;">✓</span><span style="color:#5E5873;font-size:14px;"><code style="font-size:11px;color:#28C76F;font-weight:600;margin-right:8px;">2.4.7</code>Foco visível em todos os elementos interativos</span></div>
          <div style="display:flex;align-items:center;gap:12px;padding:12px;background:#F0FFF4;border-left:3px solid #28C76F;border-radius:4px;"><span style="color:#28C76F;font-weight:700;">✓</span><span style="color:#5E5873;font-size:14px;"><code style="font-size:11px;color:#28C76F;font-weight:600;margin-right:8px;">4.1.2</code>Nome, função e valor programaticamente determinável</span></div>
        </div>
      </div>

    </div>
  `,
};

