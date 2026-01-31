/**
 * Avatar - Atom (Data Display)
 * 
 * Source: packages/vuexy_theme/public/vuexy/css/core.css (.avatar)
 * Priority: P0 (Critical)
 * Status: ✅ DONE
 */

import { formatHtmlSnippet, formatReactSnippet } from '../../_helpers/snippets';

export default {
  title: 'Atoms/Data Display/Avatar',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
# Avatar

Avatar do Vuexy para exibir imagens de perfil ou iniciais.

## Quando usar
- Representação visual de usuários
- Listas de membros ou colaboradores
- Perfis e identificação

## Variantes
- **Tamanhos**: xs (24px), sm (32px), default (40px), lg (48px), xl (56px)
- **Tipos**: image (com foto), initials (com letras)
- **Formatos**: circle (padrão), rounded, square

## Acessibilidade
- Use \`alt\` descritivo para imagens
- Iniciais devem ser legíveis
- Mantenha contraste adequado
        `
      }
    }
  },
  argTypes: {
    src: { 
      control: 'text',
      description: 'URL da imagem',
      table: { defaultValue: { summary: '' } }
    },
    alt: { 
      control: 'text',
      description: 'Texto alternativo',
      table: { defaultValue: { summary: 'Avatar' } }
    },
    initials: { 
      control: 'text',
      description: 'Iniciais (fallback)',
      table: { defaultValue: { summary: 'AB' } }
    },
    size: { 
      control: 'select',
      options: ['xs', 'sm', 'default', 'lg', 'xl'],
      description: 'Tamanho do avatar',
      table: { defaultValue: { summary: 'default' } }
    },
    bgColor: {
      control: 'select',
      options: ['primary', 'success', 'danger', 'warning', 'info', 'secondary'],
      description: 'Cor de fundo (iniciais)',
      table: { defaultValue: { summary: 'primary' } }
    }
  }
};

const createAvatar = ({ src = '', alt = 'Avatar', initials = 'AB', size = 'default', bgColor = 'primary' }) => {
  const sizeClass = size !== 'default' ? `avatar-${size}` : '';
  const classes = ['avatar', sizeClass].filter(Boolean).join(' ');
  
  const content = src
    ? `<img src="${src}" alt="${alt}" class="rounded">`
    : `<span class="avatar-initial rounded bg-label-${bgColor}">${initials}</span>`;

  return `<div class="${classes}">
  ${content}
</div>`;
};

const Template = (args) => {
  const markup = createAvatar(args);
  
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
        <pre><code>${formatReactSnippet(markup, 'Avatar').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
      </div>
    </details>
  `;
};

export const Overview = () => `
  <div class="row g-4">
    <div class="col-12">
      <h5>Tamanhos (Com Iniciais)</h5>
      <div class="d-flex align-items-center gap-3">
        ${createAvatar({ initials: 'XS', size: 'xs', bgColor: 'primary' })}
        ${createAvatar({ initials: 'SM', size: 'sm', bgColor: 'success' })}
        ${createAvatar({ initials: 'MD', size: 'default', bgColor: 'info' })}
        ${createAvatar({ initials: 'LG', size: 'lg', bgColor: 'warning' })}
        ${createAvatar({ initials: 'XL', size: 'xl', bgColor: 'danger' })}
      </div>
    </div>
    <div class="col-12 mt-4">
      <h5>Cores</h5>
      <div class="d-flex align-items-center gap-3">
        ${createAvatar({ initials: 'PR', bgColor: 'primary' })}
        ${createAvatar({ initials: 'SU', bgColor: 'success' })}
        ${createAvatar({ initials: 'DA', bgColor: 'danger' })}
        ${createAvatar({ initials: 'WA', bgColor: 'warning' })}
        ${createAvatar({ initials: 'IN', bgColor: 'info' })}
        ${createAvatar({ initials: 'SE', bgColor: 'secondary' })}
      </div>
    </div>
  </div>
`;

export const Default = Template.bind({});
Default.args = {
  src: '',
  alt: 'Avatar',
  initials: 'AB',
  size: 'default',
  bgColor: 'primary'
};

export const WithImage = Template.bind({});
WithImage.args = {
  ...Default.args,
  src: 'https://via.placeholder.com/100',
  alt: 'User Avatar'
};

export const Sizes = Template.bind({});
Sizes.args = {
  ...Default.args,
  size: 'xl',
  initials: 'XL'
};

// Interactive Story (state controlado)
export const Interactive = {
  render: () => {
    return `
      <div class="p-4">
        <h6 class="mb-3">Interactive Demos</h6>
        
        <!-- Demo 1: Toggle Avatar Type -->
        <div class="mb-4">
          <h6 class="mb-2">Toggle Avatar Type (Click to switch)</h6>
          <div id="avatar-toggle" class="avatar" style="cursor: pointer;" onclick="
            const content = this.querySelector('.avatar-initial, img');
            if (content.tagName === 'SPAN') {
              this.innerHTML = '<img src=&quot;https://via.placeholder.com/100&quot; alt=&quot;User&quot; class=&quot;rounded&quot;>';
            } else {
              this.innerHTML = '<span class=&quot;avatar-initial rounded bg-label-primary&quot;>JD</span>';
            }
          ">
            <span class="avatar-initial rounded bg-label-primary">JD</span>
          </div>
        </div>
        
        <!-- Demo 2: Avatar Size Selector -->
        <div class="mb-4">
          <h6 class="mb-2">Size Selector</h6>
          <div class="btn-group mb-3" role="group">
            <button class="btn btn-sm btn-outline-primary" onclick="
              const avatar = document.getElementById('size-avatar');
              avatar.className = 'avatar avatar-xs';
            ">XS</button>
            <button class="btn btn-sm btn-outline-primary" onclick="
              const avatar = document.getElementById('size-avatar');
              avatar.className = 'avatar avatar-sm';
            ">SM</button>
            <button class="btn btn-sm btn-outline-primary active" onclick="
              const avatar = document.getElementById('size-avatar');
              avatar.className = 'avatar';
            ">MD</button>
            <button class="btn btn-sm btn-outline-primary" onclick="
              const avatar = document.getElementById('size-avatar');
              avatar.className = 'avatar avatar-lg';
            ">LG</button>
            <button class="btn btn-sm btn-outline-primary" onclick="
              const avatar = document.getElementById('size-avatar');
              avatar.className = 'avatar avatar-xl';
            ">XL</button>
          </div>
          <div id="size-avatar" class="avatar">
            <span class="avatar-initial rounded bg-label-success">AB</span>
          </div>
        </div>
        
        <!-- Demo 3: Color Cycle -->
        <div class="mb-4">
          <h6 class="mb-2">Color Cycle (Click to change)</h6>
          <div class="avatar" style="cursor: pointer;" onclick="
            const colors = ['primary', 'success', 'danger', 'warning', 'info', 'secondary'];
            const span = this.querySelector('.avatar-initial');
            const currentClass = span.className.match(/bg-label-(\\w+)/)[1];
            const currentIndex = colors.indexOf(currentClass);
            const nextColor = colors[(currentIndex + 1) % colors.length];
            span.className = 'avatar-initial rounded bg-label-' + nextColor;
          ">
            <span class="avatar-initial rounded bg-label-primary">CC</span>
          </div>
        </div>
        
        <p class="text-muted mt-4 small">
          <i class="ri-information-line"></i> Interactive demo via Storybook state (no external dependencies)
        </p>
      </div>
    `;
  },
  parameters: {
    docs: {
      description: {
        story: 'Demo interativo com avatares funcionais usando state controlado (classes/DOM). Clique para alternar estados.'
      }
    }
  }
};
