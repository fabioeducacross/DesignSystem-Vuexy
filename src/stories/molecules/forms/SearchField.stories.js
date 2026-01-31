/**
 * SearchField - Molecule (Forms)
 * 
 * Source: packages/vuexy_theme/public/vuexy/css/core.css (.input-group, .form-control)
 * Priority: P1 (Important)
 * Status: ✅ DONE
 * 
 * Campo de busca com botão integrado.
 */

import { createOverviewGrid, generateSnippetDocs } from '../../_helpers/snippets';

export default {
  title: 'Molecules/Forms/SearchField',
  tags: ['autodocs'],
  argTypes: {
    placeholder: {
      control: 'text',
      description: 'Input placeholder text',
      table: {
        defaultValue: { summary: 'Search...' }
      }
    },
    buttonLabel: {
      control: 'text',
      description: 'Button text',
      table: {
        defaultValue: { summary: 'Search' }
      }
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state',
      table: {
        defaultValue: { summary: false }
      }
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'Component size',
      table: {
        defaultValue: { summary: 'md' }
      }
    },
    value: {
      control: 'text',
      description: 'Input value',
      table: {
        defaultValue: { summary: '' }
      }
    },
  },
  parameters: {
    docs: {
      description: {
        component: `
# SearchField

Campo de busca composto por Input + Ícone + Button usando input-group do Bootstrap/Vuexy.

## Composição (Atoms usados)
- **Input** (text)
- **Icon** (bx-search)
- **Button** (submit)

## Quando usar
- Barras de busca em headers
- Filtros de listagem
- Pesquisa em tabelas
- Formulários de busca

## Estados
- Default (vazio)
- With value (preenchido)
- Disabled
- Focus

## Variações
- Com botão de texto
- Com botão de ícone apenas
- Com dropdown de filtros (avançado)

## Acessibilidade
- Label visualmente oculto mas presente para screen readers
- Placeholder descritivo
- Button com texto ou aria-label
        `
      }
    }
  },
};

// Helper para criar markup do SearchField
const createSearchField = ({ 
  placeholder = 'Search...', 
  buttonLabel = 'Search',
  disabled = false,
  size = 'md',
  value = '',
  iconOnly = false
}) => {
  const sizeClass = size === 'md' ? '' : `input-group-${size}`;
  const groupClasses = ['input-group', sizeClass].filter(Boolean).join(' ');
  const buttonContent = iconOnly ? '<i class="bx bx-search"></i>' : buttonLabel;
  
  return `<div class="${groupClasses}">
  <span class="input-group-text">
    <i class="bx bx-search"></i>
  </span>
  <input 
    type="text" 
    class="form-control" 
    placeholder="${placeholder}"
    value="${value}"
    ${disabled ? 'disabled' : ''}
    aria-label="${placeholder}"
  />
  <button 
    class="btn btn-primary" 
    type="button"
    ${disabled ? 'disabled' : ''}
  >
    ${buttonContent}
  </button>
</div>`;
};

// Overview
export const Overview = {
  render: () => {
    const variations = [
      { 
        html: createSearchField({ placeholder: 'Default search' }), 
        label: 'Default' 
      },
      { 
        html: createSearchField({ placeholder: 'Small size', size: 'sm' }), 
        label: 'Small' 
      },
      { 
        html: createSearchField({ placeholder: 'Large size', size: 'lg' }), 
        label: 'Large' 
      },
      { 
        html: createSearchField({ placeholder: 'Icon button', iconOnly: true }), 
        label: 'Icon Only' 
      },
    ];
    
    return `<div style="display: flex; flex-direction: column; gap: 1.5rem; padding: 2rem; max-width: 600px;">
      ${variations.map(v => `
        <div>
          ${v.html}
          <div style="margin-top: 0.5rem; font-size: 0.875rem; color: #6c757d;">
            ${v.label}
          </div>
        </div>
      `).join('')}
    </div>`;
  },
  parameters: {
    docs: {
      source: {
        code: createSearchField({ placeholder: 'Search...' }),
      },
      description: {
        story: 'Visão geral das variações de tamanho e estilo do SearchField.'
      }
    }
  }
};

// Default Story
export const Default = {
  args: {
    placeholder: 'Search...',
    buttonLabel: 'Search',
    disabled: false,
    size: 'md',
    value: '',
  },
  render: (args) => createSearchField(args),
  parameters: {
    docs: {
      source: {
        code: createSearchField({ placeholder: 'Search...' }),
      },
      description: {
        story: 'Campo de busca padrão com input, ícone e botão.'
      }
    }
  }
};

// With Value
export const WithValue = {
  args: {
    placeholder: 'Search...',
    buttonLabel: 'Search',
    value: 'React components',
  },
  render: (args) => createSearchField(args),
  parameters: {
    docs: {
      source: {
        code: createSearchField({ placeholder: 'Search...', value: 'React components' }),
      },
      description: {
        story: 'Campo de busca com valor preenchido.'
      }
    }
  }
};

// Disabled
export const Disabled = {
  args: {
    placeholder: 'Search...',
    buttonLabel: 'Search',
    disabled: true,
  },
  render: (args) => createSearchField(args),
  parameters: {
    docs: {
      source: {
        code: createSearchField({ placeholder: 'Search...', disabled: true }),
      },
      description: {
        story: 'Estado desabilitado - input e botão não interativos.'
      }
    }
  }
};

// Sizes
export const Sizes = {
  render: () => {
    return `
      <div style="display: flex; flex-direction: column; gap: 1rem; max-width: 600px;">
        ${createSearchField({ size: 'sm', placeholder: 'Small search' })}
        ${createSearchField({ size: 'md', placeholder: 'Medium search' })}
        ${createSearchField({ size: 'lg', placeholder: 'Large search' })}
      </div>
    `;
  },
  parameters: {
    docs: {
      source: {
        code: `<!-- Small -->
${createSearchField({ size: 'sm', placeholder: 'Small' })}

<!-- Medium (default) -->
${createSearchField({ size: 'md', placeholder: 'Medium' })}

<!-- Large -->
${createSearchField({ size: 'lg', placeholder: 'Large' })}`,
      },
      description: {
        story: 'Três tamanhos disponíveis: sm, md (padrão) e lg.'
      }
    }
  }
};

// Icon Only Button
export const IconOnlyButton = {
  render: () => createSearchField({ 
    placeholder: 'Search...', 
    iconOnly: true 
  }),
  parameters: {
    docs: {
      source: {
        code: `<div class="input-group">
  <span class="input-group-text">
    <i class="bx bx-search"></i>
  </span>
  <input 
    type="text" 
    class="form-control" 
    placeholder="Search..."
    aria-label="Search"
  />
  <button 
    class="btn btn-primary" 
    type="button"
    aria-label="Search"
  >
    <i class="bx bx-search"></i>
  </button>
</div>`,
      },
      description: {
        story: 'Variante com botão apenas de ícone (sem texto).'
      }
    }
  }
};

// In Navbar (Example)
export const InNavbar = {
  render: () => {
    return `
      <nav class="navbar navbar-expand-lg bg-light">
        <div class="container-fluid">
          <a class="navbar-brand" href="#">Logo</a>
          <div class="d-flex ms-auto" style="width: 300px;">
            ${createSearchField({ 
              placeholder: 'Search in navbar...', 
              size: 'sm',
              iconOnly: true 
            })}
          </div>
        </div>
      </nav>
    `;
  },
  parameters: {
    docs: {
      description: {
        story: 'Exemplo de uso em navbar - tamanho pequeno com botão de ícone.'
      }
    }
  }
};

// States Demo
export const StatesDemo = {
  render: () => {
    return `
      <div style="display: flex; flex-direction: column; gap: 2rem; padding: 2rem; max-width: 600px;">
        <div>
          <h4 style="margin-bottom: 1rem; font-size: 1rem; font-weight: 600;">Normal</h4>
          ${createSearchField({ placeholder: 'Type to search...' })}
        </div>
        
        <div>
          <h4 style="margin-bottom: 1rem; font-size: 1rem; font-weight: 600;">With Value</h4>
          ${createSearchField({ placeholder: 'Search...', value: 'Current search query' })}
        </div>
        
        <div>
          <h4 style="margin-bottom: 1rem; font-size: 1rem; font-weight: 600;">Disabled</h4>
          ${createSearchField({ placeholder: 'Search...', disabled: true })}
        </div>
        
        <div>
          <h4 style="margin-bottom: 1rem; font-size: 1rem; font-weight: 600;">Focused</h4>
          ${createSearchField({ placeholder: 'Search...' })}
          <p style="margin-top: 0.5rem; font-size: 0.875rem; color: #6c757d;">
            Click on input to see focus state
          </p>
        </div>
      </div>
    `;
  },
  parameters: {
    docs: {
      description: {
        story: 'Demonstração de todos os estados do componente.'
      }
    }
  }
};
