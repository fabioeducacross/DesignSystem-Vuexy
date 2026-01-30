import { createOverviewGrid, generateSnippetDocs } from '../../_helpers/snippets';

export default {
  title: 'Atoms/Actions/Button',
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'dark'],
      description: 'Visual variant (color scheme)',
      table: {
        defaultValue: { summary: 'primary' }
      }
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'Button size',
      table: {
        defaultValue: { summary: 'md' }
      }
    },
    outline: {
      control: 'boolean',
      description: 'Outline style (transparent background)',
      table: {
        defaultValue: { summary: false }
      }
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state',
      table: {
        defaultValue: { summary: false }
      }
    },
    label: {
      control: 'text',
      description: 'Button text',
      table: {
        defaultValue: { summary: 'Button' }
      }
    },
    icon: {
      control: 'text',
      description: 'Icon class (optional, e.g., "bx bx-user")',
      table: {
        defaultValue: { summary: '' }
      }
    },
    iconOnly: {
      control: 'boolean',
      description: 'Icon only button (no text)',
      table: {
        defaultValue: { summary: false }
      }
    },
  },
  parameters: {
    docs: {
      description: {
        component: `
# Button

Botão do Vuexy com múltiplas variantes, tamanhos e estados.

## Quando usar
- Ações primárias e secundárias
- Formulários (submit, cancel)
- Navegação e CTAs

## Variantes
- **Primary**: Ação principal (CTA)
- **Secondary**: Ação secundária
- **Success**: Confirmação positiva
- **Danger**: Ações destrutivas
- **Warning**: Avisos que requerem atenção
- **Info**: Informações adicionais
- **Dark**: Contraste alternativo

## Estados
- Default, Hover, Focus, Active, Disabled
- Outline (variante transparente)

## Acessibilidade
- Use \`disabled\` attribute para desabilitar
- Sempre forneça texto descritivo
- Ícones sozinhos devem ter \`aria-label\`
        `
      }
    }
  },
};

// Helper para criar markup do botão
const createButton = ({ 
  variant = 'primary', 
  size = 'md', 
  outline = false, 
  disabled = false, 
  label = 'Button',
  icon = '',
  iconOnly = false
}) => {
  const sizeClass = size === 'md' ? '' : `btn-${size}`;
  const variantClass = outline ? `btn-outline-${variant}` : `btn-${variant}`;
  const classes = ['btn', variantClass, sizeClass].filter(Boolean).join(' ');
  
  const iconHtml = icon ? `<i class="${icon}"></i>` : '';
  const labelHtml = iconOnly ? '' : label;
  const spacing = icon && !iconOnly ? ' ' : '';
  
  return `<button type="button" class="${classes}" ${disabled ? 'disabled' : ''}>
  ${iconHtml}${spacing}${labelHtml}
</button>`;
};

// Overview Grid com todas as variações
export const Overview = {
  render: () => {
    const variants = [
      { html: createButton({ variant: 'primary', label: 'Primary' }), label: 'Primary' },
      { html: createButton({ variant: 'secondary', label: 'Secondary' }), label: 'Secondary' },
      { html: createButton({ variant: 'success', label: 'Success' }), label: 'Success' },
      { html: createButton({ variant: 'danger', label: 'Danger' }), label: 'Danger' },
      { html: createButton({ variant: 'warning', label: 'Warning' }), label: 'Warning' },
      { html: createButton({ variant: 'info', label: 'Info' }), label: 'Info' },
      { html: createButton({ variant: 'dark', label: 'Dark' }), label: 'Dark' },
      { html: createButton({ variant: 'primary', outline: true, label: 'Outline' }), label: 'Outline Primary' },
    ];
    
    return createOverviewGrid(variants, 4);
  },
  parameters: {
    docs: {
      source: {
        code: `<!-- Solid Buttons -->
<button type="button" class="btn btn-primary">Primary</button>
<button type="button" class="btn btn-secondary">Secondary</button>
<button type="button" class="btn btn-success">Success</button>
<button type="button" class="btn btn-danger">Danger</button>

<!-- Outline Buttons -->
<button type="button" class="btn btn-outline-primary">Outline Primary</button>
<button type="button" class="btn btn-outline-secondary">Outline Secondary</button>`,
        language: 'html',
      },
      description: {
        story: 'Visão geral de todas as variantes disponíveis.'
      }
    }
  }
};

// Primary Button
export const Primary = {
  args: {
    variant: 'primary',
    size: 'md',
    outline: false,
    disabled: false,
    label: 'Primary Button',
    icon: '',
    iconOnly: false,
  },
  render: (args) => createButton(args),
  parameters: {
    docs: {
      source: {
        code: createButton({ variant: 'primary', label: 'Primary Button' }),
      },
      description: {
        story: 'Botão principal usado para ações primárias (CTAs).'
      }
    }
  }
};

// Outline Variant
export const Outline = {
  args: {
    variant: 'primary',
    outline: true,
    label: 'Outline Button',
  },
  render: (args) => createButton(args),
  parameters: {
    docs: {
      source: {
        code: createButton({ variant: 'primary', outline: true, label: 'Outline Button' }),
      },
      description: {
        story: 'Variante outline com fundo transparente.'
      }
    }
  }
};

// Sizes
export const Sizes = {
  render: () => {
    return `
      <div style="display: flex; align-items: center; gap: 1rem;">
        ${createButton({ size: 'sm', label: 'Small' })}
        ${createButton({ size: 'md', label: 'Medium' })}
        ${createButton({ size: 'lg', label: 'Large' })}
      </div>
    `;
  },
  parameters: {
    docs: {
      source: {
        code: `<button type="button" class="btn btn-primary btn-sm">Small</button>
<button type="button" class="btn btn-primary">Medium</button>
<button type="button" class="btn btn-primary btn-lg">Large</button>`,
      },
      description: {
        story: 'Três tamanhos disponíveis: small (sm), medium (padrão) e large (lg).'
      }
    }
  }
};

// Disabled State
export const Disabled = {
  args: {
    variant: 'primary',
    disabled: true,
    label: 'Disabled Button',
  },
  render: (args) => createButton(args),
  parameters: {
    docs: {
      source: {
        code: createButton({ variant: 'primary', disabled: true, label: 'Disabled Button' }),
      },
      description: {
        story: 'Estado desabilitado. Use o atributo `disabled` para prevenir interação.'
      }
    }
  }
};

// With Icon
export const WithIcon = {
  render: () => {
    return `
      <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
        ${createButton({ variant: 'primary', icon: 'bx bx-user', label: 'Profile' })}
        ${createButton({ variant: 'success', icon: 'bx bx-check', label: 'Confirm' })}
        ${createButton({ variant: 'danger', icon: 'bx bx-trash', label: 'Delete' })}
        ${createButton({ variant: 'info', icon: 'bx bx-download', label: 'Download' })}
      </div>
    `;
  },
  parameters: {
    docs: {
      source: {
        code: `<!-- Buttons with icons -->
<button type="button" class="btn btn-primary">
  <i class="bx bx-user"></i> Profile
</button>
<button type="button" class="btn btn-success">
  <i class="bx bx-check"></i> Confirm
</button>`,
      },
      description: {
        story: 'Botões com ícones usando Boxicons do Vuexy.'
      }
    }
  }
};

// Icon Only
export const IconOnly = {
  render: () => {
    return `
      <div style="display: flex; gap: 0.5rem;">
        ${createButton({ variant: 'primary', icon: 'bx bx-plus', iconOnly: true, size: 'sm' })}
        ${createButton({ variant: 'danger', icon: 'bx bx-trash', iconOnly: true, size: 'sm' })}
        ${createButton({ variant: 'info', icon: 'bx bx-edit', iconOnly: true, size: 'sm' })}
        ${createButton({ variant: 'success', icon: 'bx bx-check', iconOnly: true, size: 'sm' })}
      </div>
    `;
  },
  parameters: {
    docs: {
      source: {
        code: `<!-- Icon-only buttons (adicione aria-label para acessibilidade) -->
<button type="button" class="btn btn-primary btn-sm" aria-label="Add">
  <i class="bx bx-plus"></i>
</button>
<button type="button" class="btn btn-danger btn-sm" aria-label="Delete">
  <i class="bx bx-trash"></i>
</button>`,
      },
      description: {
        story: 'Botões apenas com ícone. Sempre adicione `aria-label` para acessibilidade.'
      }
    }
  }
};

// All Variants
export const AllVariants = {
  render: () => {
    const variants = ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'dark'];
    
    return `
      <div style="display: flex; flex-direction: column; gap: 1rem;">
        <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
          ${variants.map(v => createButton({ variant: v, label: v.charAt(0).toUpperCase() + v.slice(1) })).join('')}
        </div>
        <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
          ${variants.map(v => createButton({ variant: v, outline: true, label: `Outline ${v}` })).join('')}
        </div>
      </div>
    `;
  },
  parameters: {
    docs: {
      description: {
        story: 'Todas as variantes de cor disponíveis (solid e outline).'
      }
    }
  }
};
