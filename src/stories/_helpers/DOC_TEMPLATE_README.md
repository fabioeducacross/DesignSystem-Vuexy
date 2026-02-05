# 📘 Template de Documentação

Template reutilizável para criar páginas de documentação com design consistente no Educacross Design System.

## 🎨 Recursos

- **Design Moderno**: Hero section com gradiente, cards com hover effects, glassmorphism
- **Totalmente Customizável**: Cores, badges, stats, features, componentes relacionados
- **Responsivo**: Layout adaptável para mobile, tablet e desktop
- **Ícones Material Symbols**: Integração nativa com biblioteca de ícones
- **Componentes Reutilizáveis**: Funções helper para exemplos, props, uso

## 📦 Importação

```javascript
import { 
  createDocPage,          // Template principal
  createExampleCard,      // Card de exemplo com código
  createPropsTable,       // Tabela de propriedades
  createUsageSection      // Seção de instruções de uso
} from '../_helpers/docTemplate.js';
```

## 🚀 Uso Básico

### Exemplo Minimalista

```javascript
export const MyComponentDocs = {
  render: () => createDocPage({
    title: 'My Component',
    subtitle: 'Brief description of what it does',
    content: `
      <div class="doc-section">
        <p>Component documentation here...</p>
      </div>
    `
  })
};
```

### Exemplo Completo

```javascript
export const CompleteExample = {
  render: () => createDocPage({
    // Hero Section
    title: 'Button Component',
    subtitle: 'Buttons allow users to take actions with a single tap',
    badge: 'Atoms / Actions',
    badgeIcon: 'smart_button',
    
    // Estatísticas (opcional)
    showStats: true,
    stats: {
      'Variantes': '8',
      'Tamanhos': '3',
      'Acessível': '✓'
    },
    
    // Cores customizadas (opcional)
    colors: {
      primary: '#667eea',
      secondary: '#764ba2'
    },
    
    // Conteúdo principal
    content: `
      ${createUsageSection({
        title: 'Como Usar',
        icon: 'integration_instructions',
        steps: [
          'Passo 1: Importe o componente',
          'Passo 2: Configure as props',
          'Passo 3: Use em seu template'
        ]
      })}

      ${createExampleCard({
        title: 'Exemplo Básico',
        description: 'Descrição do exemplo',
        preview: '<button class="btn btn-primary">Click</button>',
        code: '<button class="btn btn-primary">Click</button>'
      })}

      ${createPropsTable([
        {
          name: 'variant',
          type: 'string',
          default: 'primary',
          description: 'Estilo visual do botão'
        }
      ])}
    `,
    
    // Features (opcional)
    features: [
      {
        icon: 'palette',
        title: '8 Variantes',
        description: 'Primary, Secondary, Success...'
      },
      {
        icon: 'accessibility_new',
        title: 'Acessível',
        description: 'WCAG AA compliant'
      }
    ],
    
    // Componentes relacionados (opcional)
    relatedComponents: [
      {
        title: 'Button Group',
        icon: 'view_week',
        description: 'Agrupe múltiplos botões',
        path: '?path=/docs/atoms-actions-buttongroup--docs'
      }
    ]
  })
};
```

## 🎨 API Reference

### `createDocPage(options)`

Template principal para criar página de documentação.

#### Options

| Propriedade | Tipo | Default | Descrição |
|-------------|------|---------|-----------|
| `title` | string | `'Component Title'` | Título principal da página |
| `subtitle` | string | `'Description'` | Subtítulo/descrição |
| `badge` | string\|null | `null` | Texto do badge (ex: "Atoms / Actions") |
| `badgeIcon` | string | `'widgets'` | Ícone Material Symbols do badge |
| `category` | string | `'Components'` | Categoria do componente |
| `content` | string | `''` | Conteúdo HTML principal (use funções helper) |
| `colors.primary` | string | `'#667eea'` | Cor primária do gradiente |
| `colors.secondary` | string | `'#764ba2'` | Cor secundária do gradiente |
| `showStats` | boolean | `false` | Exibir card de estatísticas |
| `stats` | object | `{}` | Objeto com estatísticas (label: valor) |
| `features` | array | `[]` | Array de features para exibir |
| `relatedComponents` | array | `[]` | Array de componentes relacionados |

#### Example colors

```javascript
// Purple (default)
colors: { primary: '#667eea', secondary: '#764ba2' }

// Green
colors: { primary: '#28c76f', secondary: '#48da89' }

// Blue
colors: { primary: '#00cfe8', secondary: '#4dd4e8' }

// Red
colors: { primary: '#ea5455', secondary: '#f08182' }

// Orange
colors: { primary: '#ff9f43', secondary: '#ffcb8b' }
```

### `createExampleCard(options)`

Cria um card de exemplo com preview e código.

#### Options

| Propriedade | Tipo | Descrição |
|-------------|------|-----------|
| `title` | string | Título do exemplo |
| `description` | string | Descrição opcional |
| `preview` | string | HTML do preview visual |
| `code` | string | Código-fonte a exibir |

#### Example

```javascript
createExampleCard({
  title: 'Button Primário',
  description: 'Exemplo de button com ícone',
  preview: `
    <button class="btn btn-primary">
      <span class="material-symbols-outlined">add</span>
      Add New
    </button>
  `,
  code: '<button class="btn btn-primary">...</button>'
})
```

### `createPropsTable(props)`

Cria tabela de propriedades/props.

#### Props Array Structure

```javascript
[
  {
    name: 'variant',           // Nome da prop
    type: 'string',           // Tipo
    default: 'primary',       // Valor default (opcional)
    description: 'Estilo...'  // Descrição
  }
]
```

#### Example

```javascript
createPropsTable([
  {
    name: 'size',
    type: 'string',
    default: 'md',
    description: 'Tamanho do componente (sm, md, lg)'
  },
  {
    name: 'disabled',
    type: 'boolean',
    default: 'false',
    description: 'Desabilita o componente'
  }
])
```

### `createUsageSection(options)`

Cria seção de instruções de uso.

#### Options

| Propriedade | Tipo | Default | Descrição |
|-------------|------|---------|-----------|
| `title` | string | `'Como Usar'` | Título da seção |
| `icon` | string | `'integration_instructions'` | Ícone Material Symbols |
| `steps` | array | `[]` | Array de strings com os passos |

#### Example

```javascript
createUsageSection({
  title: 'Instalação',
  icon: 'download',
  steps: [
    'Execute: npm install @educacross/button',
    'Importe: import Button from "@educacross/button"',
    'Use: <Button variant="primary">Click</Button>'
  ]
})
```

## 🎯 Ícones Material Symbols

Ícones recomendados por tipo de seção:

### Headers/Badges
- `widgets` - Componentes em geral
- `smart_button` - Buttons/Actions
- `input` - Forms/Inputs
- `view_module` - Layout/Grid
- `notifications` - Alerts/Feedback
- `table_chart` - Tables/Data
- `navigation` - Navigation
- `image` - Media/Images

### Seções de Conteúdo
- `info` - Overview/Informação geral
- `code` - Exemplos de código
- `settings` - Propriedades/Configuração
- `integration_instructions` - Como usar/Instalação
- `auto_awesome` - Features/Recursos
- `link` - Componentes relacionados
- `palette` - Customização/Temas
- `security` - Segurança/Boas práticas

### Features
- `check_circle` - Funcionalidade confirmada
- `accessibility_new` - Acessibilidade
- `devices` - Responsividade
- `speed` - Performance
- `palette` - Customização
- `verified` - Qualidade/Testado

## 📋 Exemplos de Uso

Veja os exemplos completos em:
- `src/stories/_helpers/DocTemplateExample.stories.js`

### Quick Start

1. **Crie seu arquivo de story**:
```javascript
// src/stories/atoms/actions/Button.stories.js
import { createDocPage } from '../../_helpers/docTemplate.js';

export default {
  title: 'Atoms/Actions/Button',
  parameters: {
    previewTabs: { canvas: { hidden: true } },
    viewMode: 'docs',
    layout: 'fullscreen',
  },
};

export const Documentation = {
  render: () => createDocPage({
    title: 'Button',
    subtitle: 'Interactive element for user actions',
    badge: 'Atoms / Actions',
    content: '...'
  })
};
```

2. **Adicione conteúdo com helpers**:
```javascript
content: `
  ${createUsageSection({
    steps: ['Step 1', 'Step 2']
  })}
  
  ${createExampleCard({
    title: 'Example',
    preview: '<button>Click</button>'
  })}
  
  ${createPropsTable([
    { name: 'variant', type: 'string', description: '...' }
  ])}
`
```

3. **Navegue para visualizar**:
```
http://localhost:6006/?path=/docs/atoms-actions-button--documentation
```

## 🎨 Customização de Cores

### Cores por Categoria

```javascript
// Atoms - Purple
colors: { primary: '#667eea', secondary: '#764ba2' }

// Molecules - Blue
colors: { primary: '#00cfe8', secondary: '#4dd4e8' }

// Organisms - Green  
colors: { primary: '#28c76f', secondary: '#48da89' }

// Templates - Orange
colors: { primary: '#ff9f43', secondary: '#ffcb8b' }

// Educacross Components - Purple Dark
colors: { primary: '#7367f0', secondary: '#9e95f5' }
```

## 📝 Boas Práticas

1. **Use badge para categorização**: `badge: "Atoms / Actions"`
2. **Subtítulo conciso**: Máximo 2 linhas de texto
3. **Stats apenas quando relevante**: Não force números desnecessários
4. **Features 3-6 itens**: Mantenha foco nos principais recursos
5. **Componentes relacionados**: Máximo 4-6 para não sobrecarregar
6. **Exemplos progressivos**: Do mais simples ao mais complexo
7. **Código limpo**: Use indentação e formatação consistente

## 🚀 Próximos Passos

Depois de criar sua documentação:
1. Teste em diferentes viewports (mobile, tablet, desktop)
2. Valide links de componentes relacionados
3. Revise ortografia e gramática
4. Adicione aos índices de navegação
5. Compartilhe com a equipe

## 📚 Referências

- [Material Symbols Icons](https://fonts.google.com/icons)
- [Bootstrap 5 Docs](https://getbootstrap.com/docs/5.0/)
- [Storybook Docs](https://storybook.js.org/docs)
