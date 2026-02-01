import { addons } from '@storybook/manager-api';
import { themes } from '@storybook/theming';

addons.setConfig({
  theme: themes.light,
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
