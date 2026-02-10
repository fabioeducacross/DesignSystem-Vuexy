/**
 * Code Snippet Generator
 * 
 * Gera exemplos de código em múltiplos frameworks (Vue 3, Vue 2, React, Vanilla)
 * baseados nos metadados do componente (props, events, slots).
 */

import { VueProp } from '../types/vue.js';
import { Component, ComponentSnippets } from '../types/component.js';

/**
 * Gera snippet básico em Vue 3 (Composition API)
 */
function generateVue3Snippet(component: Component): string {
  const { name, vue } = component;
  const props = vue.props || [];
  
  // Props obrigatórias
  const requiredProps = props.filter(p => p.required);
  
  // Montar exemplo de props
  const propsExample = requiredProps.length > 0
    ? requiredProps.map(p => `:${p.name}="${getDefaultPropValue(p)}"`).join('\n    ')
    : '';
  
  // Eventos
  const events = vue.events || [];
  const eventsExample = events.length > 0
    ? events.slice(0, 2).map(e => `@${e.name}="handle${capitalize(e.name)}"`).join('\n    ')
    : '';
  
  // Slots
  const slots = vue.slots || [];
  const hasDefaultSlot = slots.some(s => s.name === 'default');
  
  let template = '';
  
  if (hasDefaultSlot) {
    // Componente com slot default
    template = `<template>
  <${name}
    ${propsExample}${eventsExample ? `\n    ${eventsExample}` : ''}
  >
    Conteúdo do slot
  </${name}>
</template>`;
  } else {
    // Componente self-closing
    template = `<template>
  <${name}
    ${propsExample}${eventsExample ? `\n    ${eventsExample}` : ''}
  />
</template>`;
  }
  
  // Script setup
  const script = events.length > 0
    ? `\n\n<script setup>\nconst handle${capitalize(events[0].name)} = (${events[0].payload ? 'payload' : ''}) => {\n  console.log('${events[0].name} emitted'${events[0].payload ? ', payload' : ''})\n}\n</script>`
    : '';
  
  return template + script;
}

/**
 * Gera snippet básico em Vue 2 (Options API)
 */
function generateVue2Snippet(component: Component): string {
  const { name, vue } = component;
  const props = vue.props || [];
  
  // Props obrigatórias
  const requiredProps = props.filter(p => p.required);
  const propsExample = requiredProps.length > 0
    ? requiredProps.map(p => `:${p.name}="${getDefaultPropValue(p)}"`).join('\n    ')
    : '';
  
  // Eventos
  const events = vue.events || [];
  const eventsExample = events.length > 0
    ? events.slice(0, 2).map(e => `@${e.name}="handle${capitalize(e.name)}"`).join('\n    ')
    : '';
  
  // Slots
  const slots = vue.slots || [];
  const hasDefaultSlot = slots.some(s => s.name === 'default');
  
  let template = '';
  
  if (hasDefaultSlot) {
    template = `<template>
  <div>
    <${name}
      ${propsExample}${eventsExample ? `\n      ${eventsExample}` : ''}
    >
      Conteúdo do slot
    </${name}>
  </div>
</template>`;
  } else {
    template = `<template>
  <div>
    <${name}
      ${propsExample}${eventsExample ? `\n      ${eventsExample}` : ''}
    />
  </div>
</template>`;
  }
  
  // Script Options API
  const methods = events.length > 0
    ? `\n  methods: {\n${events.slice(0, 2).map(e => `    handle${capitalize(e.name)}(${e.payload ? 'payload' : ''}) {\n      console.log('${e.name} emitted'${e.payload ? ', payload' : ''})\n    }`).join(',\n')}\n  }`
    : '';
  
  const script = `\n\n<script>\nexport default {\n  name: 'ExampleComponent'${methods ? `,${methods}` : ''}\n}\n</script>`;
  
  return template + script;
}

/**
 * Gera snippet básico em React
 */
function generateReactSnippet(component: Component): string {
  const { name, vue } = component;
  const props = vue.props || [];
  
  // Props obrigatórias
  const requiredProps = props.filter(p => p.required);
  const propsExample = requiredProps.length > 0
    ? requiredProps.map(p => `${p.name}={${getDefaultPropValue(p, 'react')}}`).join('\n    ')
    : '';
  
  // Eventos (em React são callbacks onXxx)
  const events = vue.events || [];
  const eventsExample = events.length > 0
    ? events.slice(0, 2).map(e => `on${capitalize(e.name)}={(${e.payload ? 'payload' : ''}) => console.log('${e.name}'${e.payload ? ', payload' : ''})}`).join('\n    ')
    : '';
  
  // Children (equivalente a slot default)
  const slots = vue.slots || [];
  const hasDefaultSlot = slots.some(s => s.name === 'default');
  
  let jsx = '';
  
  if (hasDefaultSlot) {
    jsx = `import React from 'react';
import { ${name} } from '@educacross/design-system';

function Example() {
  return (
    <${name}
      ${propsExample}${eventsExample ? `\n      ${eventsExample}` : ''}
    >
      Conteúdo do componente
    </${name}>
  );
}

export default Example;`;
  } else {
    jsx = `import React from 'react';
import { ${name} } from '@educacross/design-system';

function Example() {
  return (
    <${name}
      ${propsExample}${eventsExample ? `\n      ${eventsExample}` : ''}
    />
  );
}

export default Example;`;
  }
  
  return jsx;
}

/**
 * Gera snippet básico em Vanilla JS/HTML
 */
function generateVanillaSnippet(component: Component): string {
  const { name, vue } = component;
  const props = vue.props || [];
  
  // Props obrigatórias (viram data-attributes)
  const requiredProps = props.filter(p => p.required);
  const propsExample = requiredProps.length > 0
    ? requiredProps.map(p => `  data-${kebabCase(p.name)}="${getDefaultPropValue(p, 'vanilla')}"`).join('\n')
    : '';
  
  // Eventos
  const events = vue.events || [];
  const eventsSetup = events.length > 0
    ? `\n\n// Event listeners\ncomponent.addEventListener('${events[0].name}', (event) => {\n  console.log('${events[0].name} emitted', event.detail)\n});`
    : '';
  
  const html = `<!-- HTML -->\n<${kebabCase(name)}\n${propsExample}>\n</${kebabCase(name)}>\n\n<script>\n// Inicializar componente\nconst component = document.querySelector('${kebabCase(name)}');${eventsSetup}\n</script>`;
  
  return html;
}

/**
 * Gera todos os snippets para um componente
 */
export function generateSnippets(component: Component): ComponentSnippets {
  return {
    basic: {
      vue3: generateVue3Snippet(component),
      vue2: generateVue2Snippet(component),
      react: generateReactSnippet(component),
      vanilla: generateVanillaSnippet(component)
    },
    setup: {
      npm: `npm install @educacross/design-system`,
      yarn: `yarn add @educacross/design-system`,
      imports: `import { ${component.name} } from '@educacross/design-system'`
    }
  };
}

// ===== HELPERS =====

/**
 * Obtém valor padrão para prop (para uso em exemplos)
 */
function getDefaultPropValue(prop: VueProp, framework: 'vue' | 'react' | 'vanilla' = 'vue'): string {
  // Se prop tem default explícito, usar
  if (prop.default) {
    return String(prop.default);
  }
  
  // Inferir baseado no tipo
  const type = String(prop.type).toLowerCase();
  
  if (framework === 'react') {
    if (type.includes('string')) return '"exemplo"';
    if (type.includes('number')) return '{42}';
    if (type.includes('boolean')) return '{true}';
    if (type.includes('array')) return '{[]}';
    if (type.includes('object')) return '{{}}';
    return '""';
  }
  
  if (framework === 'vanilla') {
    if (type.includes('string')) return 'exemplo';
    if (type.includes('number')) return '42';
    if (type.includes('boolean')) return 'true';
    return 'valor';
  }
  
  // Vue (default)
  if (type.includes('string')) return 'exemplo';
  if (type.includes('number')) return '42';
  if (type.includes('boolean')) return 'true';
  if (type.includes('array')) return '[]';
  if (type.includes('object')) return '{}';
  
  return 'valor';
}

/**
 * Capitaliza primeira letra
 */
function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Converte camelCase para kebab-case
 */
function kebabCase(str: string): string {
  return str
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/([A-Z])([A-Z])([a-z])/g, '$1-$2$3')
    .toLowerCase();
}
