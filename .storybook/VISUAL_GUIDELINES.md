# 🎨 Guia de Diretrizes Visuais do Storybook

> Como criar stories com excelente UI/UX para o Educacross Design System

## 📋 Índice

- [Estrutura de Stories](#estrutura-de-stories)
- [Formatação de Código](#formatação-de-código)
- [Organização Visual](#organização-visual)
- [Documentação](#documentação)
- [Acessibilidade](#acessibilidade)

---

## 🏗️ Estrutura de Stories

### ✅ BOM: Story bem estruturada

```javascript
export const Default = {
  args: {
    label: 'Button',
    variant: 'primary',
    size: 'md'
  },
  parameters: {
    docs: {
      description: {
        story: 'Botão padrão com variante primary e tamanho médio.'
      },
      source: {
        code: `<button class="btn btn-primary">Button</button>`
      }
    }
  }
};
```

### ❌ RUIM: Story mal estruturada

```javascript
export const Default = () => `<button class="btn btn-primary">Button</button>`;
// Sem args, sem description, sem source code configurado
```

---

## 💻 Formatação de Código

### ✅ BOM: Código limpo e formatado

```javascript
export const Interactive = {
  render: () => {
    return `
      <div class="card">
        <div class="card-header">
          <h5>Título</h5>
        </div>
        <div class="card-body">
          <p>Conteúdo do card</p>
        </div>
      </div>
    `;
  },
  parameters: {
    docs: {
      source: {
        // Código limpo SEM lógica de interação
        code: `<div class="card">
  <div class="card-header">
    <h5>Título</h5>
  </div>
  <div class="card-body">
    <p>Conteúdo do card</p>
  </div>
</div>`
      }
    }
  }
};
```

### ❌ RUIM: Código poluído

```javascript
export const Interactive = {
  render: () => `<div class="card" onclick="alert('clicked')"><div class="card-header" id="header123"><h5>Título</h5></div><div class="card-body"><p>Conteúdo</p></div></div>`,
  // Código minificado, sem quebras de linha, com IDs e handlers inline
};
```

---

## 🎯 Organização Visual

### Container e Espaçamento

O Storybook já aplica automaticamente um **decorator** que:

- ✅ Centraliza componentes
- ✅ Adiciona background cinza (#FAFAFA)
- ✅ Cria container branco com sombra
- ✅ Adiciona padding adequado

**Exceção:** Templates, Pages e Interactive stories são renderizadas SEM decorator (full-page).

### Quando usar `style` inline nas stories

```javascript
// ✅ BOM: Apenas para demo/visualização
export const ColorVariants = () => `
  <div style="display: flex; gap: 1rem;">
    <div class="badge bg-primary">Primary</div>
    <div class="badge bg-secondary">Secondary</div>
  </div>
`;

// ❌ RUIM: Estilo complexo que deveria estar no CSS
export const ComplexLayout = () => `
  <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1.5rem; padding: 2rem; background: linear-gradient(45deg, #667eea 0%, #764ba2 100%); border-radius: 12px; box-shadow: 0 10px 40px rgba(0,0,0,0.2);">
    ...
  </div>
`;
```

---

## 📚 Documentação

### Descrição do Componente

```javascript
export default {
  title: 'Molecules/Forms/InputGroup',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
# Input Group

Componente para agrupar inputs com addons (ícones, texto, botões).

## Quando usar
- Formulários com prefixos/sufixos ($, @, .com)
- Inputs com ações (busca com botão)
- Campos com contexto visual (ícones)

## Composição
- **Input** - Campo de texto principal
- **Addon** - Prefixo/sufixo (.input-group-text)
- **Button** - Ação relacionada ao input

## Variantes
- Prepend: Addon no início
- Append: Addon no final
- Both: Addon em ambos os lados
        `
      }
    }
  }
};
```

### Descrição de Stories

```javascript
export const WithIcon = {
  args: {
    prepend: '<i class="bx bx-user"></i>',
    placeholder: 'Username'
  },
  parameters: {
    docs: {
      description: {
        story: 'Input group com ícone de usuário no início. Ideal para campos de login/cadastro.'
      }
    }
  }
};
```

---

## ♿ Acessibilidade

### Checklist para todas as stories

- [ ] Usar tags semânticas (`<button>`, `<nav>`, `<header>`)
- [ ] Adicionar `aria-label` em ícones sem texto
- [ ] Usar `role` quando necessário (`role="navigation"`)
- [ ] Estados de foco visíveis (já configurado globalmente)
- [ ] Contraste de cores adequado (WCAG AA)
- [ ] Suporte a navegação por teclado

### Exemplo de componente acessível

```javascript
export const AccessibleButton = () => `
  <button 
    type="button" 
    class="btn btn-primary"
    aria-label="Salvar documento"
  >
    <i class="bx bx-save" aria-hidden="true"></i>
    <span>Salvar</span>
  </button>
`;
```

---

## 🎨 Cores e Tokens

Use as variáveis CSS do Vuexy para consistência:

```css
/* Cores principais */
--bs-primary: #7367f0;
--bs-secondary: #00bad1;
--bs-success: #56ca00;
--bs-danger: #ff4c51;
--bs-warning: #ffb400;
--bs-info: #16b1ff;

/* Texto */
--bs-body-color: #6e6b7b;
--bs-heading-color: #2f2b3d;

/* Backgrounds */
--bs-body-bg: #f8f8f8;
--bs-card-bg: #ffffff;
```

---

## 📏 Tamanhos Padrão

```javascript
// Espaçamento (padding/margin)
.p-1  // 0.25rem (4px)
.p-2  // 0.5rem (8px)
.p-3  // 1rem (16px)
.p-4  // 1.5rem (24px)
.p-5  // 3rem (48px)

// Tamanhos de componentes
.btn-sm     // Pequeno
.btn        // Médio (padrão)
.btn-lg     // Grande

// Larguras úteis
max-width: 400px   // Inputs/Forms
max-width: 600px   // Cards pequenos
max-width: 800px   // Cards médios
max-width: 1200px  // Containers grandes
```

---

## 🚀 Exemplos Práticos

### Story Simples (Atom)

```javascript
export const Default = {
  args: {
    label: 'Click me',
    variant: 'primary'
  },
  render: (args) => `
    <button class="btn btn-${args.variant}">
      ${args.label}
    </button>
  `,
  parameters: {
    docs: {
      source: {
        code: `<button class="btn btn-primary">Click me</button>`
      }
    }
  }
};
```

### Story Interativa (Organism)

```javascript
export const Interactive = {
  render: () => {
    return `
      <div class="card" style="max-width: 500px;">
        <div class="card-header">
          <h5>Interactive Demo</h5>
        </div>
        <div class="card-body">
          <button class="btn btn-primary" onclick="alert('Hello!')">
            Click me
          </button>
        </div>
      </div>
      
      <script>
        // Lógica de interação aqui
        window.handleClick = function() {
          alert('Hello from Educacross!');
        };
      </script>
    `;
  },
  parameters: {
    docs: {
      description: {
        story: 'Demo interativo com state controlado via JavaScript.'
      },
      source: {
        // Source limpo sem JavaScript
        code: `<div class="card">
  <div class="card-header">
    <h5>Interactive Demo</h5>
  </div>
  <div class="card-body">
    <button class="btn btn-primary">Click me</button>
  </div>
</div>`
      }
    }
  }
};
```

---

## ✅ Checklist Final

Antes de fazer commit de uma nova story, verifique:

- [ ] Código formatado e identado corretamente
- [ ] `parameters.docs.source.code` definido (se usar `render`)
- [ ] Descrição clara em `docs.description.story`
- [ ] Args com valores padrão e tipos corretos
- [ ] Sem `console.log` ou código de debug
- [ ] Classes CSS do Bootstrap/Vuexy usadas corretamente
- [ ] Acessibilidade verificada (aria-*, roles, etc.)
- [ ] Testado em diferentes viewports (mobile, tablet, desktop)
- [ ] Source code sem IDs únicos ou event handlers inline

---

## 🎯 Resultado Esperado

✅ **UI Profissional**
- Componentes bem espaçados e centralizados
- Hierarquia visual clara
- Código legível e formatado

✅ **UX Intuitiva**
- Documentação completa e clara
- Controles organizados e rotulados
- Exemplos práticos e didáticos

✅ **Credibilidade**
- Design consistente com Vuexy
- Atenção aos detalhes
- Qualidade enterprise-ready

---

**Mantido por:** Educacross Design System Team  
**Última atualização:** Janeiro 2026
