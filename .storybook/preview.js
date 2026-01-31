/** @type { import('@storybook/html').Preview } */

// Load Vuexy CSS - Real template assets integrated!
if (typeof window !== 'undefined') {
  const cssFiles = [
    '/vuexy/css/core.css',
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
    options: {
      storySort: {
        order: [
          '📚 Getting Started',
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
    docs: {
      theme: {
        brandTitle: 'Educacross Design System',
        brandUrl: 'https://educacross.com',
        colorPrimary: '#7367f0',
        colorSecondary: '#00bad1',
        fontBase: '"Public Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      },
    },
  },
  decorators: [
    (Story) => {
      const wrapper = document.createElement('div');
      wrapper.style.minHeight = '100vh';
      wrapper.style.padding = '2rem';
      wrapper.style.backgroundColor = '#F8F8F8';
      wrapper.className = 'vuexy-wrapper';
      
      const story = Story();
      if (typeof story === 'string') {
        wrapper.innerHTML = story;
      } else {
        wrapper.appendChild(story);
      }
      
      return wrapper;
    },
  ],
};

export default preview;
