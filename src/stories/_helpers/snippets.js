/**
 * Helpers para formatar snippets de código em múltiplos stacks
 * Mantém o código legível e consistente entre HTML, React, Vue2 e Vue3
 */

/**
 * Formata HTML puro (sem alterações, apenas formatação)
 */
export function formatHtmlSnippet(markup) {
  return markup.trim();
}

/**
 * Converte HTML para JSX (React)
 * - class → className
 * - for → htmlFor
 * - atributos boolean (disabled, checked, etc.)
 */
export function formatReactSnippet(markup, componentName = 'Component') {
  let jsx = markup
    .trim()
    // class → className
    .replace(/\sclass=/g, ' className=')
    // for → htmlFor
    .replace(/\sfor=/g, ' htmlFor=')
    // data-* attributes mantém
    // style inline: converte se necessário (básico)
    .replace(/style="([^"]*)"/g, (match, styles) => {
      const styleObj = styles
        .split(';')
        .filter(s => s.trim())
        .map(s => {
          const [key, value] = s.split(':').map(v => v.trim());
          const camelKey = key.replace(/-([a-z])/g, g => g[1].toUpperCase());
          return `${camelKey}: '${value}'`;
        })
        .join(', ');
      return styleObj ? `style={{ ${styleObj} }}` : '';
    });

  return `// ${componentName}.jsx
export default function ${componentName}() {
  return (
    ${indent(jsx, 4)}
  );
}`;
}

/**
 * Converte HTML para Vue 2 (Options API)
 */
export function formatVue2Snippet(markup, componentName = 'Component') {
  const cleanMarkup = markup.trim();
  
  return `<!-- ${componentName}.vue -->
<template>
  ${indent(cleanMarkup, 2)}
</template>

<script>
export default {
  name: '${componentName}',
  props: {
    // Defina props aqui
  },
  data() {
    return {
      // Estado local
    };
  },
  methods: {
    // Métodos
  }
};
</script>

<style scoped>
/* Estilos específicos do componente */
</style>`;
}

/**
 * Converte HTML para Vue 3 (Composition API)
 */
export function formatVue3Snippet(markup, componentName = 'Component') {
  const cleanMarkup = markup.trim();
  
  return `<!-- ${componentName}.vue -->
<template>
  ${indent(cleanMarkup, 2)}
</template>

<script setup>
import { ref } from 'vue';

// Props
const props = defineProps({
  // Defina props aqui
});

// Estado reativo
// const state = ref(null);

// Métodos
// const handleAction = () => { };
</script>

<style scoped>
/* Estilos específicos do componente */
</style>`;
}

/**
 * Cria objeto com todos os snippets para documentação
 */
export function createSnippets(markup, componentName = 'Component') {
  return {
    html: formatHtmlSnippet(markup),
    react: formatReactSnippet(markup, componentName),
    vue2: formatVue2Snippet(markup, componentName),
    vue3: formatVue3Snippet(markup, componentName),
  };
}

/**
 * Gera documentação de snippets formatada para Storybook
 */
export function generateSnippetDocs(markup, componentName = 'Component') {
  const snippets = createSnippets(markup, componentName);
  
  return `
## Código

### HTML
\`\`\`html
${snippets.html}
\`\`\`

### React
\`\`\`jsx
${snippets.react}
\`\`\`

### Vue 2
\`\`\`vue
${snippets.vue2}
\`\`\`

### Vue 3
\`\`\`vue
${snippets.vue3}
\`\`\`
`;
}

/**
 * Adiciona indentação a cada linha
 */
function indent(text, spaces) {
  const indentation = ' '.repeat(spaces);
  return text
    .split('\n')
    .map(line => line.trim() ? indentation + line : line)
    .join('\n');
}

/**
 * Helper para criar grid de overview de variações
 */
export function createOverviewGrid(items, columns = 4) {
  const gridStyle = `
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 1.5rem;
    padding: 2rem;
  `;
  
  const itemsHtml = items.map(item => `
    <div style="text-align: center;">
      <div style="margin-bottom: 0.5rem;">
        ${item.html}
      </div>
      <div style="font-size: 0.875rem; color: #6c757d;">
        ${item.label}
      </div>
    </div>
  `).join('');
  
  return `<div style="${gridStyle}">${itemsHtml}</div>`;
}
