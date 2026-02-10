/** @type { import('@storybook/html').Preview } */

// Load Vuexy CSS - Real template assets integrated!
if (typeof window !== 'undefined') {
  const cssFiles = [
    '/vuexy/css/core.css',
    '/vuexy/fonts/bootstrap-icons.css',
    '/vuexy/fonts/iconify-icons.css', // Tabler Icons + outros ícones
    // Add more CSS files as needed for specific components
  ];

  cssFiles.forEach(href => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    document.head.appendChild(link);
  });
}

const preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
      expanded: true, // Expande controles por padrão
      sort: 'requiredFirst', // Mostra campos obrigatórios primeiro
    },
    backgrounds: {
      default: 'light',
      values: [
        {
          name: 'light',
          value: '#F8F8F8',
        },
        {
          name: 'white',
          value: '#FFFFFF',
        },
        {
          name: 'dark',
          value: '#2F2B3D',
        },
        {
          name: 'primary',
          value: '#7367f0',
        },
      ],
    },
    // Melhor layout para código
    docs: {
      source: {
        type: 'code',
        language: 'html',
        format: true,
        excludeDecorators: true,
      },
      canvas: {
        sourceState: 'shown', // Mostra código por padrão no Canvas
      },
    },
    // Layout melhorado
    layout: 'padded', // Adiciona padding automático
    // Viewport responsivo
    viewport: {
      viewports: {
        mobile: {
          name: 'Mobile',
          styles: { width: '375px', height: '667px' },
        },
        tablet: {
          name: 'Tablet',
          styles: { width: '768px', height: '1024px' },
        },
        desktop: {
          name: 'Desktop',
          styles: { width: '1440px', height: '900px' },
        },
      },
    },
    options: {
      storySort: {
        order: [
          'Getting Started',
          'MCP Setup Guide',
          'Foundations',
          ['Colors', 'Typography', 'Icons', 'Images', 'Spacing'],
          'Atoms',
          'Molecules',
          'Organisms',
          'Templates',
          'Pages',
          '*',
        ],
      },
    },
  },
  decorators: [
    (Story, context) => {
      const wrapper = document.createElement('div');
      
      // Não aplicar decorator em páginas/templates completos ou stories de documentação
      const isFullPage = context.title.includes('Templates') || 
                         context.title.includes('Pages') ||
                         context.name === 'Interactive' ||
                         context.name === 'Documentation' ||
                         context.viewMode === 'docs';
      
      if (isFullPage) {
        // Para páginas completas, retorna sem wrapper
        const story = Story();
        if (typeof story === 'string') {
          const container = document.createElement('div');
          container.innerHTML = story;
          
          // Detecta se é uma doc-page para aplicar classe no body
          if (container.querySelector('.doc-page')) {
            setTimeout(() => {
              document.body?.classList.add('sb-doc-page-active');
            }, 0);
          }
          
          return container;
        }
        return story;
      }
      
      // Para componentes, adiciona container estilizado
      wrapper.style.cssText = `
        min-height: 400px;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 3rem;
        background-color: #FAFAFA;
        border-radius: 8px;
      `;
      wrapper.className = 'storybook-component-wrapper';
      
      // Container interno para o componente
      const innerContainer = document.createElement('div');
      innerContainer.style.cssText = `
        width: 100%;
        max-width: 1200px;
        background: white;
        padding: 2rem;
        border-radius: 8px;
        box-shadow: 0 2px 8px rgba(0,0,0,0.08);
      `;
      
      const story = Story();
      if (typeof story === 'string') {
        innerContainer.innerHTML = story;
      } else {
        innerContainer.appendChild(story);
      }
      
      wrapper.appendChild(innerContainer);
      return wrapper;
    },
  ],
};

export default preview;
