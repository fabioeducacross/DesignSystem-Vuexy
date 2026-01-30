/** @type { import('@storybook/html').Preview } */

// Load Vuexy CSS
if (typeof window !== 'undefined') {
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = '/vuexy/css/vuexy-theme.css';
  document.head.appendChild(link);
}

const preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
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
