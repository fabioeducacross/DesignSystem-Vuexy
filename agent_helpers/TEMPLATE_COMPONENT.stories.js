/**
 * ComponentName - Título Descritivo em Português
 * =========================================
 * Breve descrição funcional do componente (1-2 linhas máximo)
 * 
 * @component ComponentName
 * @category Educacross Components V2
 * @source educacross-frontoffice\src\components\Path\To\Component.vue
 * @assets Assets/Pasta/Relevante/
 * @status PIXEL-PERFECT
 * @since 2.0.0
 */

export default {
  title: 'Educacross Components V2/Categoria/ComponentName',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded', // opcões: 'padded', 'centered', 'fullscreen'
    docs: {
      description: {
        component: `
<style>
  /* Base Typography - Figma Professional Style */
  /* COPIAR LINES 24-163 DO Card.stories.js OU CancelMission.stories.js */
  .sbdocs-wrapper {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
    color: #1d1d1d;
    line-height: 1.6;
    font-size: 15px;
    max-width: 880px;
    margin: 0 auto;
  }

  .sbdocs h1 {
    font-size: 2.75rem;
    font-weight: 700;
    color: #000;
    margin: 0 0 1rem 0;
    line-height: 1.2;
    letter-spacing: -0.02em;
  }

  .sbdocs h2 {
    font-size: 1.75rem;
    font-weight: 700;
    color: #000;
    margin: 3.5rem 0 1.25rem 0;
    line-height: 1.3;
    letter-spacing: -0.01em;
  }

  .sbdocs h3 {
    font-size: 1.25rem;
    font-weight: 600;
    color: #1d1d1d;
    margin: 2.5rem 0 1rem 0;
    line-height: 1.4;
  }

  .sbdocs h4 {
    font-size: 1.05rem;
    font-weight: 600;
    color: #333;
    margin: 2rem 0 0.75rem 0;
    line-height: 1.4;
  }

  .sbdocs p {
    margin-bottom: 1.25rem;
    color: #333;
    font-size: 15px;
    line-height: 1.7;
  }

  .sbdocs p strong {
    color: #000;
    font-weight: 600;
  }

  .sbdocs ul {
    margin: 1.5rem 0;
    padding-left: 0;
    list-style: none;
  }

  .sbdocs ul li {
    position: relative;
    padding-left: 1.75rem;
    margin-bottom: 0.875rem;
    color: #333;
    line-height: 1.7;
  }

  .sbdocs ul li::before {
    content: '•';
    position: absolute;
    left: 0.5rem;
    color: #6e63e8;
    font-weight: bold;
    font-size: 1.25em;
  }

  .sbdocs table {
    width: 100%;
    border-collapse: collapse;
    margin: 2rem 0;
    font-size: 14px;
  }

  .sbdocs thead {
    background: #fff;
    border-bottom: 2px solid #e5e5e5;
  }

  .sbdocs thead th {
    color: #1d1d1d;
    font-weight: 600;
    text-align: left;
    padding: 0.875rem 1rem;
    font-size: 13px;
    letter-spacing: 0.02em;
  }

  .sbdocs tbody tr {
    border-bottom: 1px solid #f1f3f5;
  }

  .sbdocs tbody tr:hover {
    background-color: #fafbfc;
  }

  .sbdocs tbody td {
    padding: 0.875rem 1rem;
    color: #333;
    line-height: 1.6;
  }

  .sbdocs tbody td:first-child {
    font-weight: 500;
    color: #1d1d1d;
  }

  .sbdocs code {
    background: #f1f3f5;
    color: #6e63e8;
    padding: 0.15rem 0.4rem;
    border-radius: 3px;
    font-size: 0.9em;
    font-family: 'SF Mono', 'Monaco', 'Menlo', 'Consolas', monospace;
    font-weight: 500;
  }

  .sbdocs pre {
    background: #f8f9fa;
    border: 1px solid #e5e5e5;
    border-radius: 6px;
    padding: 1.5rem;
    overflow-x: auto;
    margin: 2rem 0;
    font-size: 13px;
    line-height: 1.6;
  }

  .sbdocs pre code {
    background: transparent;
    padding: 0;
    color: #1d1d1d;
    font-size: 13px;
    font-weight: 400;
  }
</style>

Descrição funcional curta do componente.

---

## Contexto de Uso

### Jornada do Usuário

**Persona:** [Aluno / Professor / Coordenador / Admin]  
**Tela:** [Nome da Tela Principal] → [Submenu/Seção]  
**Fluxo:** Passo 1 → Passo 2 → Ação → Resultado

### Casos de Uso

1. **Caso de Uso 1:** Descrição do primeiro cenário de uso
2. **Caso de Uso 2:** Descrição do segundo cenário
3. **Caso de Uso 3:** Descrição do terceiro cenário

---

## Arquitetura da Informação

### Estrutura do Componente

\`\`\`
ComponentName (Container)
│
├── Section 1 (Header/Top)
│   ├── Element A
│   └── Element B
│
├── Section 2 (Content/Body)
│   ├── Subsection A
│   │   ├── Item 1
│   │   └── Item 2
│   └── Subsection B
│
└── Section 3 (Footer/Actions)
    └── Action Buttons
\`\`\`

### Hierarquia Visual (DOM)

\`\`\`
.component-root
└── .component-wrapper
    ├── .component-header
    │   ├── .header-title
    │   └── .header-actions
    │
    ├── .component-body
    │   └── .body-content
    │
    └── .component-footer
        └── .footer-actions
\`\`\`

---

## Especificações de Design

### Dimensões do Componente

| Propriedade | Valor | Uso |
|-------------|-------|-----|
| Width | [px/rem/%] | Largura padrão |
| Height | [px/rem/auto] | Altura padrão |
| Padding | [valor] | Espaçamento interno |
| Margin | [valor] | Espaçamento externo |

### Sistema Tipográfico

| Elemento | Size | Weight | Transform | Color |
|----------|------|--------|-----------|-------|
| Heading 1 | [px] | [weight] | [none/uppercase] | [hex] |
| Heading 2 | [px] | [weight] | [none/uppercase] | [hex] |
| Body Text | [px] | [weight] | [none/uppercase] | [hex] |
| Label | [px] | [weight] | [none/uppercase] | [hex] |
| Caption | [px] | [weight] | [none/uppercase] | [hex] |

### Cores

| Token | Hex | Uso |
|-------|-----|-----|
| Primary | #[hex] | Ação principal |
| Secondary | #[hex] | Ação secundária |
| Background | #[hex] | Fundo |
| Text Primary | #[hex] | Texto principal |
| Text Secondary | #[hex] | Texto secundário |
| Border | #[hex] | Bordas |
| Success | #[hex] | Estado de sucesso |
| Warning | #[hex] | Estado de aviso |
| Error | #[hex] | Estado de erro |

### Layout e Espaçamento

| Propriedade | Valor | Aplicação |
|-------------|-------|-----------|
| Gap | [px/rem] | Espaço entre elementos |
| Section Padding | [px/rem] | Padding de seções |
| Element Margin | [px/rem] | Margem entre elementos |
| Border Radius | [px/rem] | Arredondamento |

### Assets Utilizados

| Tipo | Caminho | Dimensões | Uso |
|------|---------|-----------|-----|
| [Ícone/Imagem] | Assets/Pasta/arquivo.svg | [width × height] | [Onde é usado] |

---

## Comportamento e Estados

### Estados Visuais

| Estado | Descrição | Trigger |
|--------|-----------|---------|
| Default | Estado inicial | Componente montado |
| Hover | Ao passar mouse | Mouse over |
| Active | Ao clicar/selecionar | Click/focus |
| Disabled | Componente desabilitado | Prop disabled=true |
| Loading | Carregando dados | Async operation |
| Error | Estado de erro | Validação falha |

### Animações e Transições

| Propriedade | Duração | Easing | Uso |
|-------------|---------|--------|-----|
| [Transform/Opacity] | [ms] | [ease/linear] | [Quando ocorre] |

---

## Regras de Negócio

### Validações

**Campo/Prop X:**
- Formato: [Descrição do formato]
- Obrigatório: [Sim/Não]
- Valores permitidos: [Range/Enum]
- Mensagem de erro: "[Texto]"

### Cálculos (se aplicável)

**Métrica Y:**
- Fórmula: (A + B) / C × 100
- Arredondamento: [casas decimais]
- Range: [min - max]

### Lógica de Negócio

1. **Regra 1:** Descrição da regra
2. **Regra 2:** Descrição da regra
3. **Regra 3:** Descrição da regra

---

## Acessibilidade

### Considerações

| Aspecto | Implementação |
|---------|---------------|
| Contraste | WCAG [A/AA/AAA] ([ratio]) |
| Navegação por Teclado | Tab order + [keys] |
| Screen Reader | aria-label em [elementos] |
| Focus Visible | Outline [style] |

### ARIA Attributes

```html
aria-label="[Descrição]"
aria-describedby="[id]"
role="[role]"
tabindex="[index]"
```

---

## Exemplo de Integração

### Vue 2 Component

\`\`\`vue
<template>
  <div>
    <ComponentName
      :prop1="value1"
      :prop2="value2"
      @event1="handleEvent1"
      @event2="handleEvent2"
    >
      <template #slot1>
        Conteúdo do slot
      </template>
    </ComponentName>
  </div>
</template>

<script>
import ComponentName from '@/components/Path/ComponentName.vue'

export default {
  components: { ComponentName },
  
  data() {
    return {
      value1: 'exemplo',
      value2: 123
    }
  },
  
  methods: {
    handleEvent1(payload) {
      console.log('Event 1:', payload)
    },
    
    handleEvent2(payload) {
      console.log('Event 2:', payload)
    }
  }
}
</script>
\`\`\`

### Props API

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| prop1 | String | '' | Yes | Descrição da prop |
| prop2 | Number | 0 | No | Descrição da prop |

### Events API

| Event | Payload | Description |
|-------|---------|-------------|
| event1 | { data } | Descrição do evento |
| event2 | value | Descrição do evento |

---

## Performance (se relevante)

### Otimizações

| Métrica | Target | Implementação |
|---------|--------|---------------|
| Load Time | < [ms] | [Técnica] |
| Bundle Size | < [KB] | [Técnica] |
| Render Time | < [ms] | [Técnica] |

---

## Variações (se houver)

### Variant 1: Nome da Variação

Descrição de quando e como usar esta variação.

### Variant 2: Nome da Variação

Descrição de quando e como usar esta variação.

---

## Componentes Relacionados

- **ComponenteA** - Relação ou uso conjunto
- **ComponenteB** - Alternativa para caso X
- **ComponenteC** - Usado internamente por este componente
        `
      }
    }
  }
};

// ===================================
// UX Writing - Arquitetura de Conteúdo
// ===================================

/**
 * Matriz de UX Writing para ComponentName
 * 
 * | Elemento | Tipo | Conteúdo | Tom | Função |
 * |----------|------|----------|-----|--------|
 * | Elemento1 | [Heading/CTA/Label/Body] | "TEXTO" | [Tom] | [Função] |
 * | Elemento2 | [Tipo] | "TEXTO" | [Tom] | [Função] |
 * | Elemento3 | [Tipo] | "TEXTO" | [Tom] | [Função] |
 * 
 * Princípios de UX Writing:
 * - [Princípio 1: ex: Linguagem clara e direta]
 * - [Princípio 2: ex: Verbos no imperativo para ações]
 * - [Princípio 3: ex: Mensagens curtas - máximo X palavras]
 */

// ===================================
// Estilos do Componente (Inline CSS)
// ===================================

const componentStyles = `
<style>
  .component-root {
    /* Estilos principais do componente */
  }
  
  .component-wrapper {
    /* Estilos do wrapper */
  }
  
  /* Estados */
  .component-root:hover {
    /* Hover state */
  }
  
  .component-root.active {
    /* Active state */
  }
  
  .component-root.disabled {
    /* Disabled state */
  }
  
  /* Responsivo */
  @media (max-width: 768px) {
    .component-root {
      /* Mobile styles */
    }
  }
  
  /* Print (se aplicável) */
  @media print {
    .component-root {
      /* Print styles */
    }
  }
</style>
`;

// ===================================
// Stories: Variações do Componente
// ===================================

/**
 * Story: Default - Estado Básico
 * Componente no estado padrão com dados de exemplo
 */
export const Default = {
  parameters: {
    docs: {
      description: {
        story: `
Estado padrão do componente com dados de exemplo básicos.
- [Característica 1]
- [Característica 2]
- [Característica 3]
        `
      }
    }
  },
  render: () => `
    <style>${componentStyles}</style>
    <div class="component-root">
      <!-- HTML DO COMPONENTE AQUI -->
      <div class="component-wrapper">
        <h3>Título</h3>
        <p>Conteúdo de exemplo</p>
      </div>
    </div>
  `
};

/**
 * Story: WithData - Com Dados Reais
 * Componente preenchido com dados realistas de produção
 */
export const WithRealData = {
  parameters: {
    docs: {
      description: {
        story: `
Exemplo com dados realistas que seriam usados em produção:
- [Dado real 1]
- [Dado real 2]
- [Dado real 3]
        `
      }
    }
  },
  render: () => `
    <style>${componentStyles}</style>
    <div class="component-root">
      <!-- HTML COM DADOS REALISTAS -->
      <div class="component-wrapper">
        <h3>Nome Real do Aluno</h3>
        <p>Dados realistas aqui</p>
      </div>
    </div>
  `
};

/**
 * Story: Interactive - Com Interação
 * Demonstra comportamento interativo do componente
 * 
 * NOTA: Se o componente usa Bootstrap JS, Flatpickr, Select2, etc,
 * adicionar loader apropriado aqui
 */
export const Interactive = {
  loaders: [
    async () => {
      // Exemplo: Carregar Bootstrap JS se necessário
      if (typeof window !== 'undefined' && !window.bootstrap) {
        return new Promise((resolve) => {
          const script = document.createElement('script');
          script.src = '/vuexy/js/bootstrap.js';
          script.onload = () => resolve({ bootstrapLoaded: true });
          document.head.appendChild(script);
        });
      }
      return {};
    }
  ],
  parameters: {
    docs: {
      description: {
        story: `
Demonstra as interações do componente:
- [Interação 1]
- [Interação 2]
- [Interação 3]
        `
      }
    }
  },
  render: () => {
    // Inicialização de JS libraries após render
    setTimeout(() => {
      if (window.bootstrap) {
        // Exemplo: Inicializar modals
        document.querySelectorAll('[data-bs-toggle="modal"]').forEach(el => {
          new bootstrap.Modal(el);
        });
      }
    }, 100);
    
    return `
      <style>${componentStyles}</style>
      <div class="component-root">
        <!-- HTML COM ELEMENTOS INTERATIVOS -->
        <button 
          class="btn btn-primary" 
          data-bs-toggle="modal" 
          data-bs-target="#exampleModal"
        >
          Ação Interativa
        </button>
      </div>
    `;
  }
};

/**
 * STORIES ADICIONAIS ESPECÍFICAS POR TIPO DE COMPONENTE:
 * 
 * Para Formulários:
 * - export const WithValidation
 * - export const WithError
 * - export const Disabled
 * 
 * Para Feedback:
 * - export const Success
 * - export const Warning
 * - export const Error
 * - export const Loading
 * 
 * Para Layout:
 * - export const Responsive
 * - export const Nested
 * - export const WithContent
 * 
 * Para Impressão:
 * - export const PrintReady
 * - export const BatchPrint
 */
