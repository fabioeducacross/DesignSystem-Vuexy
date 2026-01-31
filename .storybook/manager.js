import { addons } from '@storybook/manager-api';
import { create } from '@storybook/theming/create';

const theme = create({
  base: 'light',
  
  // Brand
  brandTitle: 'Educacross Design System',
  brandUrl: 'https://educacross.com',
  brandImage: undefined, // Pode adicionar logo depois
  brandTarget: '_self',
  
  // Colors - Paleta Educacross + Vuexy
  colorPrimary: '#7367f0', // Vuexy Primary (roxo)
  colorSecondary: '#00bad1', // Vuexy Info (azul)
  
  // UI
  appBg: '#F8F8F8',
  appContentBg: '#FFFFFF',
  appPreviewBg: '#FFFFFF',
  appBorderColor: '#E7E7E7',
  appBorderRadius: 8,
  
  // Text colors
  textColor: '#6E6B7B',
  textInverseColor: '#FFFFFF',
  textMutedColor: '#B9B9C3',
  
  // Toolbar
  barTextColor: '#6E6B7B',
  barSelectedColor: '#7367f0',
  barHoverColor: '#7367f0',
  barBg: '#FFFFFF',
  
  // Form
  inputBg: '#FFFFFF',
  inputBorder: '#D8D6DE',
  inputTextColor: '#6E6B7B',
  inputBorderRadius: 6,
  
  // Font
  fontBase: '"Public Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  fontCode: 'SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
});

addons.setConfig({
  theme: theme,
  panelPosition: 'bottom',
  showPanel: true,
  sidebar: {
    showRoots: true,
    collapsedRoots: [],
  },
  toolbar: {
    title: { hidden: false },
    zoom: { hidden: false },
    eject: { hidden: false },
    copy: { hidden: false },
    fullscreen: { hidden: false },
  },
});
