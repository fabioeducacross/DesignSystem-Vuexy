function u(t){return t.trim()}function d(t,e="Component"){let r=t.trim().replace(/\sclass=/g," className=").replace(/\sfor=/g," htmlFor=").replace(/style="([^"]*)"/g,(o,s)=>{const p=s.split(";").filter(n=>n.trim()).map(n=>{const[l,c]=n.split(":").map(a=>a.trim());return`${l.replace(/-([a-z])/g,a=>a[1].toUpperCase())}: '${c}'`}).join(", ");return p?`style={{ ${p} }}`:""});return`// ${e}.jsx
export default function ${e}() {
  return (
    ${i(r,4)}
  );
}`}function f(t,e="Component"){const r=t.trim();return`<!-- ${e}.vue -->
<template>
  ${i(r,2)}
</template>

<script>
export default {
  name: '${e}',
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
<\/script>

<style scoped>
/* Estilos específicos do componente */
</style>`}function y(t,e="Component"){const r=t.trim();return`<!-- ${e}.vue -->
<template>
  ${i(r,2)}
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
<\/script>

<style scoped>
/* Estilos específicos do componente */
</style>`}function i(t,e){const r=" ".repeat(e);return t.split(`
`).map(o=>o.trim()?r+o:o).join(`
`)}function v(t,e=4){const r=`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 1.5rem;
    padding: 2rem;
  `,o=t.map(s=>`
    <div style="text-align: center;">
      <div style="margin-bottom: 0.5rem;">
        ${s.html}
      </div>
      <div style="font-size: 0.875rem; color: #6c757d;">
        ${s.label}
      </div>
    </div>
  `).join("");return`<div style="${r}">${o}</div>`}export{d as a,f as b,v as c,y as d,u as f};
