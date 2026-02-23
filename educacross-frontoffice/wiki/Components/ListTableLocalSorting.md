# Componente ListTableLocalSorting

Documentação do componente `ListTableLocalSorting` - uma tabela com ordenação e filtragem local dos dados carregados.

## 📋 Visão Geral

O `ListTableLocalSorting` é um componente de tabela otimizado para trabalhar com datasets pequenos a médios que podem ser carregados completamente na memória. Ele oferece:

- 🔄 **Ordenação local** por qualquer coluna configurada como ordenável
- 🔍 **Busca local** instantânea sem requisições ao servidor
- 📄 **Paginação local** dos dados filtrados
- 📱 **Visualização responsiva** (lista e grid)
- 🎛️ **Controles de ordenação** com dropdown personalizado
- ⚡ **Performance otimizada** para datasets locais
- 🎨 **Customização via slots** para células e layout

## 🚀 Como Usar

### Importação

```javascript
import ListTableLocalSorting from '@/components/table/ListTableLocalSorting.vue'

export default {
  components: {
    ListTableLocalSorting,
  },
}
```

### Uso Básico

```vue
<template>
  <ListTableLocalSorting
    :data-table="allStudents"
    :table-columns="tableColumns"
    :loading="loading"
    :show-view-selection="true"
    search-placeholder="searchStudents"
    @update:sortBy="handleSortChange"
    @update:sortDesc="handleSortOrderChange"
  >
    <!-- Slot para customizar células -->
    <template #cell(status)="{ item }">
      <b-badge :variant="getStatusVariant(item.status)">
        {{ $t(item.status) }}
      </b-badge>
    </template>

    <!-- Slot para ações -->
    <template #cell(actions)="{ item }">
      <b-button size="sm" variant="outline-primary" @click="editStudent(item)">
        <feather-icon icon="EditIcon" size="16" />
      </b-button>
    </template>
  </ListTableLocalSorting>
</template>

<script>
  export default {
    data() {
      return {
        allStudents: [], // Todos os dados carregados
        loading: false,
        tableColumns: [
          { key: 'name', label: 'Nome', sortable: true },
          { key: 'email', label: 'Email', sortable: true },
          { key: 'grade', label: 'Turma', sortable: true },
          { key: 'score', label: 'Pontuação', sortable: true },
          { key: 'status', label: 'Status', sortable: false },
          { key: 'actions', label: 'Ações', sortable: false },
        ],
      }
    },

    async mounted() {
      await this.loadAllStudents()
    },

    methods: {
      async loadAllStudents() {
        this.loading = true
        try {
          // Carregar TODOS os dados de uma vez
          const response = await this.$api.get('/students/all')
          this.allStudents = response.data
        } catch (error) {
          this.$toast.error('Erro ao carregar estudantes')
        } finally {
          this.loading = false
        }
      },

      handleSortChange(sortBy) {
        console.log('Ordenando por:', sortBy)
      },

      handleSortOrderChange(sortDesc) {
        console.log('Ordem decrescente:', sortDesc)
      },
    },
  }
</script>
```

## ⚙️ Props

### Props Obrigatórias

| Prop           | Tipo    | Descrição                            |
| -------------- | ------- | ------------------------------------ |
| `dataTable`    | `Array` | Array com TODOS os dados para exibir |
| `tableColumns` | `Array` | Configuração das colunas da tabela   |

### Props de Controle

| Prop                   | Tipo      | Padrão  | Descrição                         |
| ---------------------- | --------- | ------- | --------------------------------- |
| `loading`              | `Boolean` | `false` | Estado de carregamento inicial    |
| `border`               | `Boolean` | `false` | Exibe borda do card               |
| `showSearchQueryInput` | `Boolean` | `true`  | Exibe campo de busca              |
| `showViewSelection`    | `Boolean` | `false` | Exibe seletor de visualização     |
| `showPerPageOptions`   | `Boolean` | `true`  | Exibe seletor de itens por página |

### Props de Paginação

| Prop             | Tipo     | Padrão                 | Descrição                  |
| ---------------- | -------- | ---------------------- | -------------------------- |
| `perPageDefault` | `Number` | `10`                   | Itens por página padrão    |
| `perPageOptions` | `Array`  | `[5, 10, 25, 50, 100]` | Opções de itens por página |

### Props de Busca

| Prop                | Tipo     | Padrão     | Descrição                     |
| ------------------- | -------- | ---------- | ----------------------------- |
| `searchPlaceholder` | `String` | `'search'` | Placeholder do campo de busca |
| `searchType`        | `String` | `'text'`   | Tipo do input de busca        |

### Props de Ordenação

| Prop              | Tipo      | Padrão        | Descrição                    |
| ----------------- | --------- | ------------- | ---------------------------- |
| `itemViewDefault` | `String`  | `'list-view'` | Modo de visualização padrão  |
| `sortByDefault`   | `String`  | `''`          | Coluna de ordenação padrão   |
| `sortDescDefault` | `Boolean` | `false`       | Ordem decrescente por padrão |

### Props de Exportação

| Prop              | Tipo       | Padrão  | Descrição                            |
| ----------------- | ---------- | ------- | ------------------------------------ |
| `exportToExcel`   | `Function` | `null`  | Função para exportar dados filtrados |
| `generatingExcel` | `Boolean`  | `false` | Estado de geração do Excel           |

## 📤 Eventos

| Evento            | Payload   | Descrição                                 |
| ----------------- | --------- | ----------------------------------------- |
| `update:sortBy`   | `String`  | Emitido quando a coluna de ordenação muda |
| `update:sortDesc` | `Boolean` | Emitido quando a ordem de ordenação muda  |

## 🎯 Slots

### Slot `header`

Customiza o cabeçalho da tabela.

```vue
<ListTableLocalSorting :data-table="data" :table-columns="columns">
  <template #header>
    <b-card-header>
      <h4>Lista de Estudantes ({{ filteredCount }} de {{ totalCount }})</h4>
    </b-card-header>
  </template>
</ListTableLocalSorting>
```

### Slot `cell(column-key)`

Customiza células específicas.

```vue
<ListTableLocalSorting :data-table="students" :table-columns="columns">
  <!-- Customizar coluna de pontuação -->
  <template #cell(score)="{ item }">
    <div class="d-flex align-items-center">
      <b-progress
        :value="item.score"
        :max="100"
        height="8px"
        class="flex-grow-1 mr-2"
        :variant="getScoreVariant(item.score)"
      />
      <span class="font-weight-bold">{{ item.score }}%</span>
    </div>
  </template>

  <!-- Customizar coluna de última atividade -->
  <template #cell(lastActivity)="{ item }">
    <div>
      <div>{{ formatDate(item.lastActivity) }}</div>
      <small class="text-muted">{{ formatTimeAgo(item.lastActivity) }}</small>
    </div>
  </template>
</ListTableLocalSorting>
```

## 💡 Exemplos Práticos

### Relatório de Performance Local

```vue
<template>
  <div>
    <!-- Resumo dos dados -->
    <b-row class="mb-3">
      <b-col md="3">
        <b-card>
          <b-card-text>
            <div class="d-flex justify-content-between">
              <span>Total de Estudantes</span>
              <strong>{{ totalStudents }}</strong>
            </div>
          </b-card-text>
        </b-card>
      </b-col>
      <b-col md="3">
        <b-card>
          <b-card-text>
            <div class="d-flex justify-content-between">
              <span>Média Geral</span>
              <strong>{{ averageScore.toFixed(1) }}%</strong>
            </div>
          </b-card-text>
        </b-card>
      </b-col>
      <b-col md="3">
        <b-card>
          <b-card-text>
            <div class="d-flex justify-content-between">
              <span>Acima da Média</span>
              <strong>{{ studentsAboveAverage }}</strong>
            </div>
          </b-card-text>
        </b-card>
      </b-col>
      <b-col md="3">
        <b-card>
          <b-card-text>
            <div class="d-flex justify-content-between">
              <span>Precisam Atenção</span>
              <strong class="text-warning">{{ studentsNeedAttention }}</strong>
            </div>
          </b-card-text>
        </b-card>
      </b-col>
    </b-row>

    <!-- Tabela com ordenação local -->
    <ListTableLocalSorting
      :data-table="studentsData"
      :table-columns="performanceColumns"
      :loading="loading"
      :show-view-selection="true"
      :sort-by-default="'score'"
      :sort-desc-default="true"
      search-placeholder="searchStudentsByName"
      @update:sortBy="currentSort = $event"
      @update:sortDesc="currentSortDesc = $event"
    >
      <template #header>
        <b-card-header>
          <div class="d-flex justify-content-between align-items-center">
            <div>
              <h4 class="mb-1">Relatório de Performance</h4>
              <small class="text-muted"> Dados atualizados em: {{ lastUpdateTime }} </small>
            </div>
            <b-button variant="outline-primary" @click="refreshData">
              <feather-icon icon="RefreshCwIcon" size="16" />
              Atualizar
            </b-button>
          </div>
        </b-card-header>
      </template>

      <!-- Avatar do estudante -->
      <template #cell(avatar)="{ item }">
        <b-avatar :src="item.avatar" size="sm" :text="item.name.charAt(0)" />
      </template>

      <!-- Nome com status online -->
      <template #cell(name)="{ item }">
        <div class="d-flex align-items-center">
          <span>{{ item.name }}</span>
          <b-badge v-if="item.isOnline" variant="success" class="ml-2" pill> Online </b-badge>
        </div>
      </template>

      <!-- Pontuação com barra de progresso -->
      <template #cell(score)="{ item }">
        <div class="d-flex align-items-center">
          <b-progress
            :value="item.score"
            :max="100"
            height="12px"
            class="flex-grow-1 mr-2"
            :variant="getScoreVariant(item.score)"
          />
          <span class="font-weight-bold" :class="getScoreTextClass(item.score)">
            {{ item.score }}%
          </span>
        </div>
      </template>

      <!-- Atividades completadas -->
      <template #cell(completedActivities)="{ item }">
        <div class="text-center">
          <div class="font-weight-bold">{{ item.completedActivities }}</div>
          <small class="text-muted">de {{ item.totalActivities }}</small>
        </div>
      </template>

      <!-- Tempo total estudado -->
      <template #cell(studyTime)="{ item }">
        <div class="text-center">
          <div>{{ formatDuration(item.studyTime) }}</div>
          <small class="text-muted">esta semana</small>
        </div>
      </template>

      <!-- Status de atenção -->
      <template #cell(needsAttention)="{ item }">
        <div class="text-center">
          <b-badge
            :variant="item.needsAttention ? 'warning' : 'success'"
            :class="{ pulse: item.needsAttention }"
          >
            {{ item.needsAttention ? 'Atenção' : 'Normal' }}
          </b-badge>
        </div>
      </template>

      <!-- Ações rápidas -->
      <template #cell(actions)="{ item }">
        <b-dropdown variant="link" no-caret right>
          <template #button-content>
            <feather-icon icon="MoreVerticalIcon" size="16" />
          </template>
          <b-dropdown-item @click="viewStudentDetail(item)">
            <feather-icon icon="EyeIcon" size="16" />
            Ver Detalhes
          </b-dropdown-item>
          <b-dropdown-item @click="sendMessage(item)">
            <feather-icon icon="MessageSquareIcon" size="16" />
            Enviar Mensagem
          </b-dropdown-item>
          <b-dropdown-divider />
          <b-dropdown-item
            v-if="item.needsAttention"
            @click="markAsAttended(item)"
            variant="warning"
          >
            <feather-icon icon="CheckIcon" size="16" />
            Marcar como Atendido
          </b-dropdown-item>
        </b-dropdown>
      </template>
    </ListTableLocalSorting>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        studentsData: [],
        loading: false,
        currentSort: 'score',
        currentSortDesc: true,
        lastUpdateTime: new Date().toLocaleString(),
        performanceColumns: [
          {
            key: 'avatar',
            label: '',
            sortable: false,
            thClass: 'text-center',
            tdClass: 'text-center',
          },
          { key: 'name', label: 'Nome', sortable: true },
          { key: 'score', label: 'Pontuação', sortable: true },
          { key: 'completedActivities', label: 'Atividades', sortable: true },
          { key: 'studyTime', label: 'Tempo de Estudo', sortable: true },
          { key: 'needsAttention', label: 'Status', sortable: true },
          { key: 'actions', label: 'Ações', sortable: false },
        ],
      }
    },

    computed: {
      totalStudents() {
        return this.studentsData.length
      },

      averageScore() {
        if (!this.studentsData.length) return 0
        const total = this.studentsData.reduce((sum, student) => sum + student.score, 0)
        return total / this.studentsData.length
      },

      studentsAboveAverage() {
        return this.studentsData.filter(student => student.score >= this.averageScore).length
      },

      studentsNeedAttention() {
        return this.studentsData.filter(student => student.needsAttention).length
      },
    },

    async mounted() {
      await this.loadStudentsData()
    },

    methods: {
      async loadStudentsData() {
        this.loading = true
        try {
          const response = await this.$api.get('/students/performance-report')
          this.studentsData = response.data.map(student => ({
            ...student,
            needsAttention: student.score < 60 || student.completedActivities < 5,
            isOnline: Math.random() > 0.7, // Simulação de status online
          }))
          this.lastUpdateTime = new Date().toLocaleString()
        } catch (error) {
          this.$toast.error('Erro ao carregar relatório')
        } finally {
          this.loading = false
        }
      },

      async refreshData() {
        await this.loadStudentsData()
        this.$toast.success('Dados atualizados!')
      },

      getScoreVariant(score) {
        if (score >= 80) return 'success'
        if (score >= 60) return 'warning'
        return 'danger'
      },

      getScoreTextClass(score) {
        if (score >= 80) return 'text-success'
        if (score >= 60) return 'text-warning'
        return 'text-danger'
      },

      formatDuration(minutes) {
        const hours = Math.floor(minutes / 60)
        const mins = minutes % 60
        return `${hours}h ${mins}m`
      },

      viewStudentDetail(student) {
        this.$router.push(`/students/${student.id}`)
      },

      sendMessage(student) {
        // Implementar envio de mensagem
      },

      markAsAttended(student) {
        student.needsAttention = false
        this.$toast.success(`${student.name} marcado como atendido`)
      },
    },
  }
</script>

<style scoped>
  .pulse {
    animation: pulse 2s infinite;
  }

  @keyframes pulse {
    0% {
      opacity: 1;
    }
    50% {
      opacity: 0.5;
    }
    100% {
      opacity: 1;
    }
  }
</style>
```

### Lista de Produtos com Filtros Locais

```vue
<template>
  <div>
    <!-- Filtros rápidos -->
    <b-card class="mb-3">
      <b-row>
        <b-col md="4">
          <b-form-group label="Categoria:">
            <b-form-select v-model="categoryFilter" :options="categoryOptions" />
          </b-form-group>
        </b-col>
        <b-col md="4">
          <b-form-group label="Faixa de Preço:">
            <b-form-select v-model="priceFilter" :options="priceRangeOptions" />
          </b-form-group>
        </b-col>
        <b-col md="4" class="d-flex align-items-end">
          <b-button-group class="w-100">
            <b-button
              :variant="stockFilter === 'all' ? 'primary' : 'outline-primary'"
              @click="stockFilter = 'all'"
            >
              Todos
            </b-button>
            <b-button
              :variant="stockFilter === 'inStock' ? 'success' : 'outline-success'"
              @click="stockFilter = 'inStock'"
            >
              Em Estoque
            </b-button>
            <b-button
              :variant="stockFilter === 'lowStock' ? 'warning' : 'outline-warning'"
              @click="stockFilter = 'lowStock'"
            >
              Estoque Baixo
            </b-button>
          </b-button-group>
        </b-col>
      </b-row>
    </b-card>

    <!-- Tabela com dados filtrados -->
    <ListTableLocalSorting
      :data-table="filteredProducts"
      :table-columns="productColumns"
      :loading="loading"
      :show-view-selection="true"
      search-placeholder="searchProducts"
    >
      <!-- Customização das células -->
      <template #cell(image)="{ item }">
        <b-img :src="item.image" width="50" height="50" rounded />
      </template>

      <template #cell(price)="{ item }">
        <span class="font-weight-bold">{{ formatCurrency(item.price) }}</span>
      </template>

      <template #cell(stock)="{ item }">
        <b-badge :variant="getStockVariant(item.stock)"> {{ item.stock }} unidades </b-badge>
      </template>
    </ListTableLocalSorting>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        allProducts: [],
        categoryFilter: '',
        priceFilter: '',
        stockFilter: 'all',
        productColumns: [
          { key: 'image', label: 'Imagem', sortable: false },
          { key: 'name', label: 'Nome', sortable: true },
          { key: 'category', label: 'Categoria', sortable: true },
          { key: 'price', label: 'Preço', sortable: true },
          { key: 'stock', label: 'Estoque', sortable: true },
        ],
      }
    },

    computed: {
      filteredProducts() {
        let filtered = [...this.allProducts]

        // Aplicar filtros
        if (this.categoryFilter) {
          filtered = filtered.filter(p => p.category === this.categoryFilter)
        }

        if (this.stockFilter === 'inStock') {
          filtered = filtered.filter(p => p.stock > 10)
        } else if (this.stockFilter === 'lowStock') {
          filtered = filtered.filter(p => p.stock <= 10 && p.stock > 0)
        }

        return filtered
      },
    },
  }
</script>
```

## 🎨 Controles de Ordenação

### Dropdown de Ordenação Personalizado

O componente inclui um dropdown especial para ordenação no modo grid:

```vue
<!-- Controles de ordenação são automaticamente gerados -->
<b-dropdown text="Classificar e ordenar" variant="outline-primary">
  <!-- Opções de colunas sortable -->
  <b-dropdown-item v-for="column in sortableColumns" :key="column.key">
    {{ column.label }}
  </b-dropdown-item>

  <!-- Controles de ordem -->
  <b-dropdown-divider />
  <b-form-radio v-model="sortDesc" :value="false">
    Ordem decrescente
  </b-form-radio>
  <b-form-radio v-model="sortDesc" :value="true">
    Ordem crescente
  </b-form-radio>
</b-dropdown>
```

## 🔧 Algoritmo de Ordenação

O componente implementa ordenação inteligente:

```javascript
// Ordem de precedência para tipos de dados
function typeOrder(value) {
  if (value === null) return 1
  if (value === undefined) return 2
  if (typeof value === 'boolean') return 3
  if (typeof value === 'number') return 4
  if (typeof value === 'string') return 5
  if (typeof value === 'object') return 6
  return 7
}

// Comparação de valores
function compareValues(a, b, sortDesc = false) {
  const typeA = typeOrder(a)
  const typeB = typeOrder(b)

  if (typeA !== typeB) {
    return sortDesc ? typeB - typeA : typeA - typeB
  }

  // Comparação por tipo
  if (typeof a === 'string') {
    return sortDesc ? b.localeCompare(a) : a.localeCompare(b)
  }

  return sortDesc ? b - a : a - b
}
```

## ⚠️ Considerações Importantes

1. **Tamanho dos Dados**: Ideal para datasets até 1000-2000 itens
2. **Memória**: Todos os dados ficam carregados na memória
3. **Performance**: Ordenação e busca são instantâneas
4. **Atualização**: Requer recarregamento manual dos dados
5. **Filtros**: Todos os filtros são aplicados localmente

## 🔄 Comparação com Outros Componentes

| Funcionalidade  | ListTable      | ListTableSelect | ListTableLocalSorting |
| --------------- | -------------- | --------------- | --------------------- |
| **Paginação**   | Server-side    | Server-side     | Local                 |
| **Ordenação**   | Server-side    | Não             | Local                 |
| **Busca**       | Server-side    | Server-side     | Local                 |
| **Seleção**     | Não            | Sim             | Não                   |
| **Performance** | Grande volume  | Grande volume   | Pequeno/médio volume  |
| **Latência**    | Depende da API | Depende da API  | Instantânea           |

## 🔗 Componentes Relacionados

- [`ListTable`](./ListTable.md) - Tabela principal com paginação server-side
- [`ListTableSelect`](./ListTableSelect.md) - Tabela com seleção de itens
- [`ListTablePagination`](./ListTablePagination.md) - Componente de paginação
