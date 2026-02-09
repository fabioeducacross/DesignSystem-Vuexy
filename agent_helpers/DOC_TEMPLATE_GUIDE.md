# Guia de Uso - Doc Template System

## 📚 Visão Geral

Sistema de templates para criar páginas de documentação consistentes usando `createDocPage` e `createExampleCard`.

**Localização**: `src/stories/_helpers/docTemplate.js`

---

## 🎨 createDocPage

Cria estrutura completa de página de documentação com hero, stats, features e componentes relacionados.

### Exemplo Básico

```javascript
import { createDocPage, createExampleCard } from '../_helpers/docTemplate.js';

export const Documentation = {
  render: () => createDocPage({
    title: 'ComponentName',
    subtitle: 'Descrição clara do componente e seu propósito',
    badge: 'Categoria',
    badgeIcon: 'widgets',
    colors: {
      primary: '#667eea',
      secondary: '#764ba2'
    },
    showStats: true,
    stats: {
      'Fluxos': '2',
      'Estados': '5',
      'Perfis': '4+'
    },
    content: `
      ${createExampleCard({ /* ... */ })}
      ${createExampleCard({ /* ... */ })}
    `,
    features: [
      {
        icon: 'swap_horiz',
        title: 'Feature Name',
        description: 'Descrição da funcionalidade'
      }
    ],
    relatedComponents: [
      {
        icon: 'widgets',
        title: 'RelatedComponent',
        description: 'Breve descrição',
        path: '?path=/docs/category-relatedcomponent--docs'
      }
    ]
  })
};
```

---

## 🔧 createExampleCard - Parâmetros Importantes

### ⚠️ wrapPreview - LIÇÃO CRÍTICA

**Problema identificado**: Modal e code tabs grudados sem espaçamento.

**Solução**: Sempre usar `wrapPreview` corretamente para componentes que precisam centralização.

### Opção 1: wrapPreview: true (Padrão)

**Quando usar**: Componentes pequenos, inline, ou que não precisam centralização especial.

```javascript
createExampleCard({
  title: 'Exemplo Simples',
  wrapPreview: true, // ✅ Ou omitir (é o padrão)
  preview: `<button class="btn">Clique aqui</button>`,
  codes: { /* ... */ }
})
```

**Resultado visual**:
- Background cinza leve (#f8f9fa)
- Padding 24px
- Border-radius 12px
- **Margin-bottom 24px** ← separa dos code tabs

---

### Opção 2: wrapPreview: false (Centralizado)

**Quando usar**: Modais, cards grandes, componentes que precisam estar visualmente centralizados.

```javascript
createExampleCard({
  title: 'Modal Centralizado',
  wrapPreview: false, // ✅ IMPORTANTE!
  preview: `
    <style>/* CSS do componente */</style>
    <div class="modal-container">
      <!-- Modal HTML -->
    </div>
  `,
  codes: { /* ... */ }
})
```

**Resultado visual**:
- Container com display: flex, justify-content: center, align-items: center
- Background cinza (#f8f9fa)
- Min-height 400px ← dá espaço respirável
- Padding 2rem
- Border-radius 12px
- **Margin-bottom 24px** ← ⭐ CRÍTICO para separar dos code tabs

---

## 📐 Espaçamento - Regra Fundamental

### ✅ SEMPRE garantir 24px entre preview e code tabs

**Antes (ERRADO)**:
```javascript
// Modal grudado nos code tabs ❌
wrapPreview: false,
preview: `<div class="modal">...</div>`
// Sem espaçamento!
```

**Depois (CORRETO)**:
```javascript
// Sistema automaticamente adiciona margin-bottom: 24px ✅
wrapPreview: false,
preview: `<div class="modal">...</div>`
// ↕️ 24px de espaço automático
```

---

## 🎯 Padrão Completo - Componente Modal

```javascript
export const Documentation = {
  parameters: {
    layout: 'fullscreen',
    docs: {
      page: () => null // Remove wrappers do Storybook
    }
  },
  render: () => createDocPage({
    title: 'AcceptOrRejectAccess',
    subtitle: 'Modal de decisão para aceitar/recusar convites',
    badge: 'Front-office / Modals',
    badgeIcon: 'door_open',
    
    content: `
      ${createExampleCard({
        title: 'Fluxo de Recusa',
        description: 'Modal para recusar convite de perfil institucional',
        showTitle: false,         // ← Remove título duplicado
        wrapPreview: false,        // ← ⭐ CENTRALIZA O MODAL
        preview: \`
          <style>/* CSS compartilhado */</style>
          <div class="modal-container">
            <!-- Modal recusa -->
          </div>
        \`,
        codes: {
          html: \`<!-- HTML code -->\`,
          vue2: \`<!-- Vue 2 code -->\`,
          vue3: \`<!-- Vue 3 code -->\`,
          react: \`// React code\`
        }
      })}

      ${createExampleCard({
        title: 'Fluxo de Aceitação',
        description: 'Modal para aceitar convite com validação de termos',
        showTitle: false,
        wrapPreview: false,        // ← ⭐ CENTRALIZA O MODAL
        preview: \`
          <style>/* CSS compartilhado */</style>
          <div class="modal-container">
            <!-- Modal aceitação -->
          </div>
        \`,
        codes: { /* ... */ }
      })}
    \`,
    
    features: [/* ... */],
    relatedComponents: [/* ... */]
  })
};
```

---

## 📋 Checklist - Antes de Criar Doc Page

- [ ] `wrapPreview: false` para modais/componentes grandes
- [ ] `wrapPreview: true` ou omitir para componentes inline
- [ ] `showTitle: false` quando não quiser título da section duplicado
- [ ] CSS compartilhado extraído em variável/helper
- [ ] Code tabs com HTML, Vue2, Vue3, React (quando aplicável)
- [ ] Preview visual SEMPRE separado dos code tabs (24px)
- [ ] `parameters.docs.page: () => null` para remover wrappers Storybook

---

## 🐛 Troubleshooting

### Modal grudado nos code tabs?
- ✅ Verificar `wrapPreview: false` está configurado
- ✅ Sistema automaticamente adiciona margin-bottom: 24px

### Card cinza aparece quando não deveria?
- ✅ Usar `wrapPreview: false` para remover padding excessivo
- ✅ Componente será centralizado com background cinza visualmente separado

### Título duplicado aparecendo?
- ✅ Adicionar `showTitle: false` no createExampleCard

---

## 📝 Changelog

### v1.2 (2026-02-05)
- **FIX CRÍTICO**: wrapPreview: false agora centraliza componente em container com espaçamento adequado
- Adicionado margin-bottom: 24px automático entre preview e code tabs
- Container de preview com min-height: 400px, padding: 2rem, background: #f8f9fa
- Documentação completa do padrão para replicar em outros componentes

### v1.1 (2026-02-04)
- Implementação inicial do Doc Template System
- createDocPage, createExampleCard, createCodeTabs
- Suporte multi-framework (HTML, Vue2, Vue3, React)

---

## 🔗 Arquivos Relacionados

- `src/stories/_helpers/docTemplate.js` - Implementação do sistema
- `.storybook/preview-head.html` - CSS global para remover wrappers Storybook
- `.storybook/preview.js` - Decorator configurado para doc pages
- `src/stories/educacross-components-v2/AcceptOrRejectAccess.stories.js` - Exemplo de uso completo

---

## 🎓 Aplicando para Outros Componentes

1. Copiar estrutura do AcceptOrRejectAccess.stories.js
2. Ajustar `wrapPreview: false` para modais/cards grandes
3. Adicionar CSS compartilhado no preview
4. Criar code tabs com 4 frameworks
5. Configurar features e related components
6. Testar visualmente: preview separado dos code tabs ✅
