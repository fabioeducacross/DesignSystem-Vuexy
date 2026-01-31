import { addons } from '@storybook/manager-api';
import { themes } from '@storybook/theming';

const theme = {
  ...themes.light,
  
  // Brand
  brandTitle: 'Educacross Design System',
  brandUrl: 'https://educacross.com',
  brandImage: undefined,
  brandTarget: '_self',
  
  // Colors
  colorPrimary: '#7367f0',
  colorSecondary: '#00bad1',
  
  // UI
  appBg: '#F8F8F8',
  appContentBg: '#FFFFFF',
  appBorderColor: '#E7E7E7',
  appBorderRadius: 8,
  
  // Text
  textColor: '#6E6B7B',
  textInverseColor: '#FFFFFF',
  
  // Toolbar
  barTextColor: '#6E6B7B',
  barSelectedColor: '#7367f0',
  barBg: '#FFFFFF',
  
  // Form
  inputBg: '#FFFFFF',
  inputBorder: '#D8D6DE',
  inputTextColor: '#6E6B7B',
  inputBorderRadius: 6,
  
  // Font
  fontBase: '"Public Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  fontCode: 'SFMono-Regular, Menlo, Monaco, Consolas, monospace',
};

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
