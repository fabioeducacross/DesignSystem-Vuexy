# Componentes do Projeto

Esta seção documenta os principais componentes Vue.js reutilizáveis do projeto **Educacross Frontend**, organizados por categoria e funcionalidade.

## 🧩 Visão Geral dos Componentes

O projeto utiliza uma arquitetura de componentes modular e reutilizável, seguindo as melhores práticas do Vue.js 2 com Composition API.

### Estrutura de Componentes

```
src/components/
├── 📁 app-collapse/           # Componentes de colapso/accordion
├── 📁 app-language-selector/  # Seletor de idioma
├── 📁 badge/                  # Badges e etiquetas
├── 📁 card/                   # Cards personalizados
├── 📁 cells/                  # Células de tabela customizadas
├── 📁 chart/                  # Gráficos e visualizações
├── 📁 descriptors/            # Descritores educacionais
├── 📁 evaluations/            # Componentes de avaliação
├── 📁 filter/                 # Filtros avançados
├── 📁 form/                   # Formulários e inputs
├── 📁 global/                 # Componentes globais
├── 📁 missions/               # Componentes específicos de missões
├── 📁 modal/                  # Modais e dialogs
├── 📁 NPS/                    # Net Promoter Score
├── 📁 PDFs/                   # Geração de PDFs
├── 📁 proficiency/            # Componentes de proficiência
├── 📁 question/               # Questões e respostas
├── 📁 selects/                # Seletores customizados
├── 📁 student-evidence-report/ # Relatórios de evidência
├── 📁 subjects/               # Componentes de disciplinas
├── 📁 table/                  # Tabelas avançadas
└── 📁 teacher/                # Componentes específicos do professor
```

## 🎯 Componentes Mais Utilizados

### 📊 Tabelas e Listas

#### ListTable - Tabela Principal

- **Localização**: `src/components/table/ListTable.vue`
- **Descrição**: Tabela de dados com paginação, busca, ordenação e exportação
- **Funcionalidades**:
  - 🔍 Busca integrada com debounce
  - 📄 Paginação server-side e client-side
  - 📤 Exportação para Excel
  - 📱 Visualização responsiva (lista/grid)
  - 🎨 Slots para customização de células
- **Documentação**: [📖 ListTable.md](ListTable.md)

#### ListTablePagination - Paginação

- **Localização**: `src/components/table/ListTablePagination.vue`
- **Descrição**: Componente de paginação reutilizável para listas e tabelas
- **Funcionalidades**:
  - 🔢 Navegação por páginas
  - 📊 Informações de contexto (X de Y registros)
  - 📱 Design responsivo
- **Documentação**: [📖 ListTablePagination.md](ListTablePagination.md)

#### Outras Variantes de Tabela

- **ListTableSelect**: Tabela com seleção de itens
- **ListTableLocalSorting**: Tabela com ordenação local
- **ListTableAccess**: Tabela para controle de acesso

### 📝 Formulários e Seletores

#### ESelect - Seletor Avançado

- **Localização**: `src/components/selects/ESelect.vue`
- **Descrição**: Componente de seleção customizado com funcionalidades avançadas
- **Funcionalidades**:
  - ✅ Seleção única ou múltipla
  - 🔍 Busca em tempo real
  - 📄 Paginação de opções
  - ⚡ Carregamento assíncrono
  - 🎨 Customização via slots
  - 🗂️ Modal para itens selecionados
- **Documentação**: [📖 ESelect.md](ESelect.md)

#### EFormCheck - Checkbox Customizado

- **Localização**: `src/components/form/EFormCheck.vue`
- **Descrição**: Checkbox com estados avançados e design moderno
- **Funcionalidades**:
  - ✅ Estados múltiplos (marcado, desmarcado, indeterminado)
  - 🎨 Design moderno com Material Symbols
  - 🔒 Estado desabilitado
  - ♿ Acessibilidade nativa
- **Documentação**: [📖 EFormCheck.md](EFormCheck.md)

#### Outros Seletores

- **MultipleDropdown**: Dropdown com seleção múltipla
- **SelectInfinityScroll**: Seletor com scroll infinito
- **InfinityScroll**: Componente de scroll infinito genérico

### 📊 Gráficos e Visualizações

#### Componentes de Gráficos

- **Localização**: `src/components/chart/`
- **Descrição**: Gráficos baseados em ApexCharts para visualização de dados educacionais
- **Tipos Disponíveis**:
  - 🍩 **DefaultChart**: Gráfico de rosquinha para progresso
  - 📊 **BarChart**: Gráficos de barras para comparações
  - 🥧 **PieChart**: Gráfico de pizza para proporções
  - ⭕ **RadialBar**: Indicadores radiais de progresso
- **Documentação**: [📖 Charts.md](Charts.md)

## 🎯 Componentes por Categoria

## 📁 Componentes por Diretório

### �️ `/selects` - Componentes de Seleção

| Componente               | Descrição                              | Uso Principal                        |
| ------------------------ | -------------------------------------- | ------------------------------------ |
| **ESelect**              | Seletor avançado com busca e paginação | Seleção de estudantes, missões, etc. |
| **MultipleDropdown**     | Dropdown com seleção múltipla          | Filtros avançados                    |
| **SelectInfinityScroll** | Seletor com scroll infinito            | Listas grandes de dados              |
| **InfinityScroll**       | Scroll infinito genérico               | Base para outros componentes         |

### 📊 `/table` - Componentes de Tabela

| Componente                | Descrição                              | Uso Principal                       |
| ------------------------- | -------------------------------------- | ----------------------------------- |
| **ListTable**             | Tabela principal com todos os recursos | Listagem de dados principais        |
| **ListTablePagination**   | Componente de paginação                | Navegação por páginas               |
| **ListTableSelect**       | Tabela com seleção de itens            | Seleção em massa                    |
| **ListTableLocalSorting** | Tabela com ordenação local             | Dados pequenos que cabem em memória |
| **ListTableAccess**       | Tabela para controle de acesso         | Permissões e configurações          |

### 📊 `/chart` - Componentes de Gráficos

| Componente         | Descrição                   | Uso Principal              |
| ------------------ | --------------------------- | -------------------------- |
| **DefaultChart**   | Gráfico de rosquinha padrão | Progresso geral            |
| **BarChart**       | Gráfico de barras           | Comparações e rankings     |
| **PieChart**       | Gráfico de pizza            | Distribuições simples      |
| **RadialBar**      | Gráfico radial              | Indicadores de performance |
| **RadialBarChart** | Variante do radial          | Múltiplos indicadores      |

### 📝 `/form` - Componentes de Formulário

| Componente            | Descrição                      | Uso Principal         |
| --------------------- | ------------------------------ | --------------------- |
| **EFormCheck**        | Checkbox customizado           | Seleções booleanas    |
| **FormGroup**         | Wrapper de campo de formulário | Estrutura padrão      |
| **ValidationWrapper** | Wrapper com validação          | Formulários complexos |

### �️ `/modal` - Componentes de Modal

| Componente                  | Descrição                         | Uso Principal            |
| --------------------------- | --------------------------------- | ------------------------ |
| **DefaultFAQModal**         | Modal de FAQ padrão               | Ajuda e documentação     |
| **GameDetailsModal**        | Detalhes de jogos/atividades      | Visualização de conteúdo |
| **StudentGameDetailsModal** | Detalhes específicos do estudante | Performance individual   |
| **ZipLoading**              | Modal de carregamento             | Operações longas         |

## 🎨 Padrões de Design

### Naming Convention

- **Prefixo E**: Componentes core do projeto (`ESelect`, `EFormCheck`)
- **CamelCase**: Todos os nomes seguem padrão camelCase
- **Descritivo**: Nomes auto-explicativos (`ListTablePagination`)

### Estrutura de Props

```javascript
// Padrão para props de componentes
props: {
  // Props obrigatórias primeiro
  data: {
    type: Array,
    required: true,
  },

  // Props opcionais com valores padrão
  loading: {
    type: Boolean,
    default: false,
  },

  // Props com validação
  variant: {
    type: String,
    default: 'primary',
    validator: (value) => ['primary', 'secondary', 'success'].includes(value),
  },
}
```

### Eventos Padronizados

```javascript
// Eventos comuns em todos os componentes
emits: [
  'input', // Para v-model
  'change', // Para mudanças de valor
  'update:prop', // Para props.sync
  'loading', // Para estados de carregamento
  'error', // Para tratamento de erros
]
```

## 🛠️ Como Usar os Componentes

### 1. Importação

```javascript
// Importação individual (recomendado)
import ESelect from '@/components/selects/ESelect.vue'
import ListTable from '@/components/table/ListTable.vue'

export default {
  components: {
    ESelect,
    ListTable,
  },
}
```

### 2. Uso Básico

```vue
<template>
  <div>
    <!-- Seletor de estudantes -->
    <ESelect
      v-model="selectedStudents"
      :options="students"
      :multiple="true"
      :searchable="true"
      label="name"
      placeholder="Selecione os estudantes"
    />

    <!-- Tabela de resultados -->
    <ListTable
      :data="tableData"
      :columns="tableColumns"
      :loading="loading"
      @page-changed="handlePageChange"
    />
  </div>
</template>
```

### 3. Customização com Slots

```vue
<template>
  <ListTable :data="students" :columns="columns">
    <!-- Customizar célula de status -->
    <template #cell(status)="{ item }">
      <b-badge :variant="getStatusVariant(item.status)">
        {{ $t(item.status) }}
      </b-badge>
    </template>

    <!-- Customizar células de ações -->
    <template #cell(actions)="{ item }">
      <b-button size="sm" @click="editStudent(item)">
        Editar
      </b-button>
    </template>
  </ListTable>
</template>
```

## 📖 Documentação Disponível

### Componentes Documentados

- ✅ [**ESelect**](ESelect.md) - Seletor customizado completo
- ✅ [**ListTable**](ListTable.md) - Tabela principal
- ✅ [**ListTablePagination**](ListTablePagination.md) - Paginação
- ✅ [**EFormCheck**](EFormCheck.md) - Checkbox customizado
- ✅ [**Charts**](Charts.md) - Componentes de gráficos

### Em Desenvolvimento

- 🚧 **MultipleDropdown** - Dropdown múltiplo
- 🚧 **FormGroup** - Wrapper de formulário
- 🚧 **AppCard** - Card customizado
- 🚧 **Modal Components** - Modais diversos

## 🚀 Próximos Passos

1. **Expandir Documentação**: Documentar todos os componentes principais
2. **Storybook**: Implementar Storybook para visualização de componentes
3. **Testes Unitários**: Aumentar cobertura de testes
4. **TypeScript**: Migração gradual para TypeScript
5. **Design System**: Formalizar o design system do projeto

## 💡 Boas Práticas

### Desenvolvimento

1. **Reutilização**: Sempre considere se um componente pode ser reutilizado
2. **Props Interface**: Mantenha interfaces de props consistentes
3. **Documentação**: Documente props, eventos e slots importantes
4. **Acessibilidade**: Implemente suporte à acessibilidade
5. **Performance**: Otimize componentes para grandes volumes de dados

### Uso

1. **Composição**: Combine componentes para criar interfaces complexas
2. **Estado**: Use Vuex/Pinia para estado compartilhado
3. **Validação**: Implemente validação adequada em formulários
4. **Loading States**: Sempre forneça feedback visual
5. **Error Handling**: Trate erros graciosamente

## 🔗 Recursos Relacionados

- [🏠 Wiki Home](../Home.md)
- [🏗️ Estrutura do Projeto](../Estrutura-do-Projeto.md)
- [🧪 Testes](../Testes.md)
- [🎨 Design System](../themeConfig.js)
- [📚 Storybook](../storybook/) (quando implementado)

#### AppModal

- **Props**: `size`, `title`, `hideFooter`, `persistent`
- **Events**: `show`, `hide`, `ok`, `cancel`

### 🎓 Componentes Educacionais

#### MissionCard

- **Localização**: `src/components/missions/`
- **Props**: `mission`, `editable`, `compact`
- **Events**: `edit`, `delete`, `duplicate`, `assign`

```vue
<MissionCard :mission="mission" :editable="canEdit" @edit="handleEdit" @assign="handleAssign" />
```

#### ProficiencyLevel

- **Props**: `level`, `description`, `color`, `showLabel`
- **Tipos**: `iniciante`, `em-desenvolvimento`, `proficiente`, `avancado`

#### SubjectBadge

- **Props**: `subject`, `size`, `showIcon`
- **Disciplinas**: Matemática, Português, Ciências, etc.

### 📋 Relatórios e Analytics

#### ReportCard

- **Props**: `title`, `value`, `trend`, `icon`, `color`
- **Slots**: `subtitle`, `actions`

```vue
<ReportCard
  title="Missões Concluídas"
  :value="completedMissions"
  trend="up"
  icon="check-circle"
  color="success"
/>
```

#### ProgressBar

- **Props**: `value`, `max`, `label`, `animated`, `striped`
- **Variações**: Linear, circular, com etapas

### 🔍 Filtros e Busca

#### FilterGroup

- **Props**: `filters`, `values`, `orientation`
- **Events**: `filter-change`, `reset`

```vue
<FilterGroup
  :filters="availableFilters"
  :values="currentFilters"
  @filter-change="handleFilterChange"
/>
```

#### SearchInput

- **Props**: `placeholder`, `debounce`, `clearable`
- **Events**: `search`, `clear`

## 🛠️ Padrões de Desenvolvimento

### Estrutura Padrão de Componente

```vue
<template>
  <div class="component-name" :class="componentClasses">
    <!-- Template content -->
  </div>
</template>

<script>
  import { defineComponent, computed } from '@vue/composition-api'

  export default defineComponent({
    name: 'ComponentName',

    props: {
      // Props com validação
      title: {
        type: String,
        required: true,
      },
      variant: {
        type: String,
        default: 'default',
        validator: value => ['default', 'primary', 'success'].includes(value),
      },
    },

    emits: ['click', 'change'],

    setup(props, { emit }) {
      // Computed properties
      const componentClasses = computed(() => ({
        [`component-name--${props.variant}`]: props.variant !== 'default',
      }))

      // Methods
      const handleClick = () => {
        emit('click')
      }

      return {
        componentClasses,
        handleClick,
      }
    },
  })
</script>

<style lang="scss" scoped>
  .component-name {
    // Base styles

    &--primary {
      // Variant styles
    }
  }
</style>
```

### Props e Validação

```javascript
// ✅ Bom - Props bem definidas
props: {
  mission: {
    type: Object,
    required: true,
    validator: (mission) => {
      return mission && mission.id && mission.name
    }
  },
  editable: {
    type: Boolean,
    default: false
  },
  variant: {
    type: String,
    default: 'default',
    validator: (value) => ['default', 'compact', 'detailed'].includes(value)
  }
}
```

### Eventos Customizados

```javascript
// ✅ Bom - Eventos bem documentados
emits: {
  'mission-selected': (mission) => {
    return mission && typeof mission.id === 'number'
  },
  'filter-changed': (filters) => {
    return typeof filters === 'object'
  }
}
```

## 🎨 Sistema de Design

### Tokens de Design

```scss
// Cores primárias
$primary: #1976d2;
$secondary: #424242;
$success: #4caf50;
$warning: #ff9800;
$danger: #f44336;

// Espaçamentos
$spacing-xs: 0.25rem;
$spacing-sm: 0.5rem;
$spacing-md: 1rem;
$spacing-lg: 1.5rem;
$spacing-xl: 2rem;

// Tipografia
$font-size-xs: 0.75rem;
$font-size-sm: 0.875rem;
$font-size-base: 1rem;
$font-size-lg: 1.125rem;
$font-size-xl: 1.25rem;
```

### Componentes Atômicos

#### Buttons

- **Variantes**: primary, secondary, success, warning, danger
- **Tamanhos**: xs, sm, md, lg, xl
- **Estados**: normal, hover, active, disabled, loading

#### Icons

- **Biblioteca**: Feather Icons, Material Icons
- **Tamanhos**: 16px, 20px, 24px, 32px
- **Usage**: `<feather-icon icon="plus" size="20" />`

#### Typography

- **Headers**: h1-h6 com classes utilitárias
- **Body**: text-sm, text-base, text-lg
- **Weight**: font-light, font-normal, font-semibold, font-bold

## 📱 Responsividade

### Breakpoints

```scss
$breakpoints: (
  xs: 0,
  sm: 576px,
  md: 768px,
  lg: 992px,
  xl: 1200px,
  xxl: 1400px,
);
```

### Classes Utilitárias

```scss
// Visibilidade responsiva
.d-none.d-md-block     // Oculto em mobile, visível em desktop
.d-block.d-lg-none     // Visível em mobile, oculto em desktop

// Grid responsivo
.col-12.col-md-6.col-lg-4  // Full mobile, half tablet, third desktop

// Texto responsivo
.text-center.text-lg-left  // Centro mobile, esquerda desktop
```

## 🧪 Testando Componentes

### Teste Básico

```javascript
import ComponentName from '@/components/ComponentName.vue'
import { shallowMount } from '@vue/test-utils'

describe('ComponentName', () => {
  it('deve renderizar corretamente', () => {
    const wrapper = shallowMount(ComponentName, {
      propsData: {
        title: 'Teste',
      },
    })

    expect(wrapper.find('.component-name').exists()).toBe(true)
    expect(wrapper.find('h1').text()).toBe('Teste')
  })
})
```

### Teste de Interação

```javascript
it('deve emitir evento ao clicar', async () => {
  const wrapper = shallowMount(ComponentName)

  await wrapper.find('button').trigger('click')

  expect(wrapper.emitted('click')).toBeTruthy()
})
```

## 📚 Componentes Documentados

### Seletores

- **[ESelect](ESelect.md)** - Componente de seleção avançado com busca e paginação

### Formulários

- **FormInput** - Input customizado com validação
- **FormSelect** - Select com opções dinâmicas
- **FormTextarea** - Textarea com contador de caracteres
- **FormCheckbox** - Checkbox com estados customizados

### Modais

- **ConfirmModal** - Modal de confirmação
- **FormModal** - Modal com formulário
- **InfoModal** - Modal informativo

### Tabelas

- **DataTable** - Tabela com funcionalidades avançadas
- **SimpleTable** - Tabela básica
- **ResponsiveTable** - Tabela responsiva para mobile

## 🔄 Ciclo de Vida dos Componentes

### Padrão com Composition API

```javascript
import { ref, computed, watch, onMounted, onUnmounted } from '@vue/composition-api'

export default defineComponent({
  setup() {
    const data = ref(null)
    const loading = ref(false)

    // Computed
    const computedValue = computed(() => {
      return data.value ? data.value.processed : null
    })

    // Watchers
    watch(data, newValue => {
      console.log('Data changed:', newValue)
    })

    // Lifecycle
    onMounted(() => {
      fetchData()
    })

    onUnmounted(() => {
      cleanup()
    })

    // Methods
    const fetchData = async () => {
      loading.value = true
      try {
        data.value = await api.getData()
      } finally {
        loading.value = false
      }
    }

    return {
      data,
      loading,
      computedValue,
      fetchData,
    }
  },
})
```

## 📋 Checklist para Novos Componentes

### Desenvolvimento

- [ ] Nome descritivo e em PascalCase
- [ ] Props bem definidas com validação
- [ ] Eventos documentados no array `emits`
- [ ] Estilos seguem padrão BEM
- [ ] Responsivo para mobile
- [ ] Acessível (ARIA labels, keyboard navigation)

### Documentação

- [ ] JSDoc nos métodos principais
- [ ] Exemplos de uso no código
- [ ] Props documentadas
- [ ] Eventos documentados

### Testes

- [ ] Teste de renderização básica
- [ ] Teste de props obrigatórias
- [ ] Teste de eventos emitidos
- [ ] Teste de casos extremos

### Performance

- [ ] Lazy loading quando aplicável
- [ ] Otimização de re-renders
- [ ] Cleanup de listeners/timers

---

🧩 **Próximos Passos**: Explore os componentes específicos ou consulte o [Guia de Contribuição](../Contribuicao.md) para aprender como criar novos componentes.
