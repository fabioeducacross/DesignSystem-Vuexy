/** @type { import('@storybook/html-vite').StorybookConfig } */
const config = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-links',
  ],
  framework: {
    name: '@storybook/html-vite',
    options: {},
  },
  staticDirs: [
    '../packages/vuexy_theme/public',
    { from: '../.storybook/public', to: '/' }
  ],
  // Configuração do Vite para GitHub Pages
  viteFinal: async (config) => {
    // Define base path para GitHub Pages (quando STORYBOOK_BASE_PATH está definido)
    if (process.env.STORYBOOK_BASE_PATH) {
      config.base = process.env.STORYBOOK_BASE_PATH;
    }
    return config;
  },
};
export default config;
