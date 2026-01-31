import { addons } from '@storybook/manager-api';
import { themes } from '@storybook/theming';

/**
 * ==============================================
 * EDUCACROSS DESIGN SYSTEM - STORYBOOK THEME
 * ==============================================
 * 
 * Paleta de cores extraída do logo oficial:
 * - Teal Principal: #0C5257 (texto "educa")
 * - Teal Escuro: #225054 (corpo da coruja)
 * - Dourado: #FAB84A (olhos da coruja)
 * - Laranja: #E9934C (pés da coruja)
 * - Vermelho: #DF2B3C (texto "cross")
 * - Creme: #F2EEE3 (face da coruja)
 */

const educacrossTheme = {
  ...themes.light,
  
  // =========================================
  // BRAND IDENTITY
  // =========================================
  brandTitle: 'Educacross Design System',
  brandUrl: 'https://educacross.com',
  // Logo oficial Educacross (asset real)
  brandImage: './vuexy/img/educacross/logo-horizontal.svg',
  brandTarget: '_self',
  
  // =========================================
  // PRIMARY COLORS (Teal da Coruja)
  // =========================================
  colorPrimary: '#0C5257',      // Teal principal (texto "educa")
  colorSecondary: '#FAB84A',    // Dourado (olhos da coruja)
  
  // =========================================
  // UI BACKGROUNDS
  // =========================================
  appBg: '#F8F6EF',             // Creme suave da marca
  appContentBg: '#FFFFFF',       // Conteúdo em branco puro
  appPreviewBg: '#FFFFFF',       // Preview em branco
  appBorderColor: '#E0DDD4',     // Borda sutil tom creme
  appBorderRadius: 8,
  
  // =========================================
  // TYPOGRAPHY
  // =========================================
  textColor: '#225054',          // Teal para textos principais
  textInverseColor: '#FFFFFF',
  textMutedColor: '#6E6B7B',     // Cinza neutro para textos secundários
  
  // =========================================
  // TOOLBAR (Top bar)
  // =========================================
  barTextColor: '#6E6B7B',
  barSelectedColor: '#0C5257',   // Teal quando selecionado
  barHoverColor: '#FAB84A',      // Dourado no hover
  barBg: '#FFFFFF',
  
  // =========================================
  // FORM ELEMENTS
  // =========================================
  inputBg: '#FFFFFF',
  inputBorder: '#D8D6DE',
  inputTextColor: '#225054',
  inputBorderRadius: 6,
  
  // =========================================
  // BUTTON ELEMENTS
  // =========================================
  buttonBg: '#0C5257',           // Botão primário teal
  buttonBorder: '#0C5257',
  
  // =========================================
  // SIDEBAR NAVIGATION
  // =========================================
  // Links/items
  
  // =========================================
  // TYPOGRAPHY STACK
  // =========================================
  fontBase: '"Public Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  fontCode: '"JetBrains Mono", "Fira Code", SFMono-Regular, Menlo, Monaco, Consolas, monospace',
};

addons.setConfig({
  theme: educacrossTheme,
  panelPosition: 'bottom',
  showPanel: true,
  
  sidebar: {
    showRoots: true,
    collapsedRoots: [],
    // Renderiza etiquetas de status nos items
    renderLabel: ({ name, type }) => {
      // Adiciona emoji de estrela para items "New"
      if (name.includes('New') || name.includes('Novo')) {
        return `⭐ ${name}`;
      }
      return name;
    },
  },
  
  toolbar: {
    title: { hidden: false },
    zoom: { hidden: false },
    eject: { hidden: false },
    copy: { hidden: false },
    fullscreen: { hidden: false },
  },
  
  // Habilitando atalhos úteis
  enableShortcuts: true,
});
