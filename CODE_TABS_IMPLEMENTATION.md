# Implementação das Code Tabs Multi-Framework

## ✅ Conclusão

Adicionadas **tabs de código** com Vue 2, Vue 3, React e Vanilla JavaScript nos 3 exemplos da story **Documentation** do **EInput**.

## 📋 Mudanças Implementadas

### 1. Input Básico (Nome Completo)
**Antes:**
```javascript
code: '<EInput\n  v-model="name"\n  type="text"\n  placeholder="Digite seu nome"\n  icon="person"\n  icon-position="left"\n  size="md"\n/>'
```

**Depois:**
```javascript
codes: {
  html: `<!-- HTML/Vanilla JavaScript -->
<div class="form-group">
  <label class="form-label">Nome Completo</label>
  <div class="input-icon-wrapper">
    <i class="bi bi-person input-icon-left"></i>
    <input type="text" class="form-control input-with-icon-left" 
           placeholder="Digite seu nome" id="nameInput" />
  </div>
</div>
<script>
const nameInput = document.getElementById('nameInput');
nameInput.addEventListener('input', (e) => {
  console.log('Nome:', e.target.value);
});
</script>`,
  
  vue2: `<!-- Vue 2 - Options API -->
<template>
  <div class="form-group">
    <label class="form-label">Nome Completo</label>
    <EInput v-model="name" type="text" placeholder="Digite seu nome"
            icon="person" icon-position="left" size="md" />
  </div>
</template>
<script>
export default {
  data() {
    return { name: '' }
  },
  watch: {
    name(newValue) {
      console.log('Nome:', newValue);
    }
  }
}
</script>`,
  
  vue3: `<!-- Vue 3 - Composition API -->
<script setup>
import { ref, watch } from 'vue';
import EInput from '@/components/EInput.vue';

const name = ref('');
watch(name, (newValue) => {
  console.log('Nome:', newValue);
});
</script>
<template>
  <div class="form-group">
    <label class="form-label">Nome Completo</label>
    <EInput v-model="name" type="text" placeholder="Digite seu nome"
            icon="person" icon-position="left" size="md" />
  </div>
</template>`,
  
  react: `// React + TypeScript
import { useState } from 'react';
import { EInput } from '@/components/EInput';

export default function NameForm() {
  const [name, setName] = useState('');
  
  const handleChange = (value: string) => {
    setName(value);
    console.log('Nome:', value);
  };
  
  return (
    <div className="form-group">
      <label className="form-label">Nome Completo</label>
      <EInput value={name} onChange={handleChange} type="text"
              placeholder="Digite seu nome" icon="person" 
              iconPosition="left" size="md" />
    </div>
  );
}`
}
```

### 2. Estados de Validação (Email Valid/Invalid)
- **HTML/Vanilla**: Classes `is-valid` e `is-invalid`, validação com regex
- **Vue 2**: Options API com `validateEmail()` method e `state` reativo
- **Vue 3**: Composition API com `computed` para estado dinâmico
- **React**: TypeScript com `useCallback` e tipo `ValidationState`

### 3. Com Ícone Direito (Busca com Debounce)
- **HTML/Vanilla**: `debounceTimer` manual com `clearTimeout`/`setTimeout`
- **Vue 2**: Options API com `debounceTimer` em `data()` e `handleSearch` method
- **Vue 3**: Composition API com `useDebounceFn` do VueUse
- **React**: Hook `useDebouncedCallback` com async fetch

## 🎯 Padrões Estabelecidos

### Estrutura dos Códigos

1. **HTML/Vanilla**: 
   - Markup HTML puro com classes Bootstrap/Vuexy
   - JavaScript puro com `addEventListener`, `getElementById`
   - Sem dependências externas

2. **Vue 2**: 
   - Options API com `export default`
   - `data()` para estado
   - `methods` para handlers
   - `watch` para reatividade
   - Template com `v-model`

3. **Vue 3**: 
   - Composition API com `<script setup>`
   - `ref` para estado reativo
   - `watch`, `computed` para reatividade
   - Imports explícitos (`vue`, VueUse quando necessário)

4. **React**: 
   - TypeScript com tipos explícitos
   - Hooks funcionais (`useState`, `useCallback`, `useMemo`)
   - Destructuring e arrow functions
   - JSX com `className`, `onChange`, `value`

### Convenções de Nomenclatura

| Framework | Evento | Props | Estado |
|-----------|--------|-------|--------|
| HTML/Vanilla | `addEventListener('input')` | atributos HTML | variáveis globais |
| Vue 2 | `@input` | `v-model` | `this.value` |
| Vue 3 | `@input` | `v-model` | `value.value` (ref) |
| React | `onChange` | `value={x}` | `const [x, setX] = useState()` |

## 📊 Métricas

- **Arquivo**: `src/stories/educacross-components-v2/EInput.stories.js`
- **Linhas**: 954 → 1380 (+426 linhas, +45%)
- **Build**: 23.02s (stable)
- **Bundle**: 71.20 kB gzipped (EInput.stories-Bc0Rpx3Y.js)
- **Erros**: 0
- **Warnings**: 0

## 🎨 Sistema de Tabs

As tabs de código utilizam o sistema existente em `docTemplate.js`:

```javascript
// Em createExampleCard, substitui:
code: 'string'

// Por:
codes: {
  html: 'código HTML/Vanilla',
  vue2: 'código Vue 2 Options API',
  vue3: 'código Vue 3 Composition API',
  react: 'código React + TypeScript'
}
```

O sistema `createCodeTabs()` filtra automaticamente as tabs disponíveis e renderiza com:
- Header com 4 botões de tab (HTML/Vanilla, Vue 2, Vue 3, React)
- Conteúdo com syntax highlighting
- Troca de tab com onclick handler
- Primeira tab ativa por default
- CSS com `:hover` e `.active` states

## 🔄 Próximos Passos

### Phase 1 - Replicação Imediata (4 componentes, ~3h)
1. **EFormCheck** (checkboxes/radios) - 2 exemplos
2. **ESelect** (dropdowns) - 2 exemplos  
3. **ETextarea** (text multiline) - 2 exemplos
4. **FilterChip** (filtros visuais) - 2 exemplos

### Phase 2-6 - Componentes Restantes (118 componentes, 6-8h)
- Aplicar mesmo padrão de tabs
- Usar EInput como template de referência
- Manter consistência de nomenclatura e estrutura

## 🎯 Template de Replicação

Para adicionar tabs em qualquer componente:

```javascript
${createExampleCard({
  title: 'Título do Exemplo',
  description: 'Descrição breve',
  preview: '<div>...HTML de preview...</div>',
  codes: {
    html: `<!-- HTML/Vanilla JavaScript -->
<div class="component">...</div>
<script>
// Vanilla JS code
</script>`,
    
    vue2: `<!-- Vue 2 - Options API -->
<template>
  <ComponentName v-model="value" />
</template>
<script>
export default {
  data() {
    return { value: '' }
  }
}
</script>`,
    
    vue3: `<!-- Vue 3 - Composition API -->
<script setup>
import { ref } from 'vue';
const value = ref('');
</script>
<template>
  <ComponentName v-model="value" />
</template>`,
    
    react: `// React + TypeScript
import { useState } from 'react';
export default function Example() {
  const [value, setValue] = useState('');
  return <ComponentName value={value} onChange={setValue} />;
}`
  }
})}
```

## 📚 Referências

- **docTemplate.js**: Funções `createDocPage`, `createExampleCard`, `createCodeTabs`
- **snippets.js**: Conversores automáticos (não usados nesta implementação manual)
- **EInput.stories.js**: Template completo com 3 exemplos de código multi-framework
- **Doc Template Example**: Padrão visual e estrutural do design system

## ✅ Validação

Build completa sem erros:
```bash
npm run build-storybook
# ✓ 305 modules transformed in 23.02s
# storybook-static/assets/EInput.stories-Bc0Rpx3Y.js (71.20 kB │ gzip: 11.59 kB)
```

Commit:
```bash
git commit 24964b0
# feat(einput): adiciona tabs de código multi-framework (Vue 2, Vue 3, React, Vanilla JS)
```

---

**Status**: ✅ **CONCLUÍDO**  
**Data**: 2026-02-08  
**Commit**: `24964b0`  
**Build Time**: 23.02s  
**Bundle Size**: 71.20 kB (gzip: 11.59 kB)
