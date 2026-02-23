# Componente ListTableSelect

Documentação do componente `ListTableSelect` - uma tabela com funcionalidade de seleção múltipla de itens em formato de lista ou cards.

## 📋 Visão Geral

O `ListTableSelect` é um componente especializado que combina visualização de dados com seleção múltipla. Ele oferece:

- ✅ **Seleção múltipla** com checkboxes individuais e "selecionar todos"
- 📊 **Múltiplas visualizações** (lista e grid/cards)
- 🔍 **Busca integrada** com debounce automático
- 📄 **Paginação** integrada com controle de itens por página
- 📤 **Exportação para Excel** dos itens selecionados
- 🎨 **Customização via slots** para layout de cards
- ⚡ **Estados de loading** com skeleton

## 🚀 Como Usar

### Importação

```javascript
import ListTableSelect from '@/components/table/ListTableSelect.vue'

export default {
  components: {
    ListTableSelect,
  },
}
```

### Uso Básico

```vue
<template>
  <ListTableSelect
    :data-table="missions"
    :table-columns="tableColumns"
    :total-data="totalMissions"
    :loading="loading"
    @selectedRows="handleSelection"
    @search="handleSearch"
    @changePage="handlePageChange"
  >
    <!-- Slot para customizar layout do card -->
    <template #card="{ data, checked }">
      <b-card :class="{ 'border-primary': checked }" class="h-100">
        <div class="d-flex justify-content-between align-items-start">
          <div>
            <h5>{{ data.title }}</h5>
            <p class="text-muted">{{ data.description }}</p>
          </div>
          <b-badge :variant="getStatusVariant(data.status)">
            {{ data.status }}
          </b-badge>
        </div>

        <div class="mt-auto pt-2">
          <small class="text-muted"> Criado em: {{ formatDate(data.createdAt) }} </small>
        </div>
      </b-card>
    </template>
  </ListTableSelect>
</template>

<script>
  export default {
    data() {
      return {
        missions: [],
        selectedMissions: [],
        loading: false,
        totalMissions: 0,
        tableColumns: [
          { key: 'title', label: 'Título', sortable: true },
          { key: 'status', label: 'Status', sortable: false },
          { key: 'createdAt', label: 'Data de Criação', sortable: true },
        ],
      }
    },
    methods: {
      handleSelection(selectedItems) {
        this.selectedMissions = selectedItems
        console.log('Itens selecionados:', selectedItems)
      },
      handleSearch(searchTerm) {
        // Implementar lógica de busca
      },
      handlePageChange(page) {
        // Implementar mudança de página
      },
    },
  }
</script>
```

## ⚙️ Props

### Props Obrigatórias

| Prop           | Tipo     | Descrição                            |
| -------------- | -------- | ------------------------------------ |
| `dataTable`    | `Array`  | Array de dados para exibir na tabela |
| `tableColumns` | `Array`  | Configuração das colunas da tabela   |
| `totalData`    | `Number` | Total de registros para paginação    |

### Props de Controle

| Prop                   | Tipo      | Padrão  | Descrição                            |
| ---------------------- | --------- | ------- | ------------------------------------ |
| `loading`              | `Boolean` | `false` | Estado de carregamento               |
| `columns`              | `Number`  | `4`     | Número de colunas no modo grid       |
| `showViewSelection`    | `Boolean` | `false` | Exibe seletor de visualização        |
| `showSearchQueryInput` | `Boolean` | `true`  | Exibe campo de busca                 |
| `showSelectAll`        | `Boolean` | `true`  | Exibe checkbox "selecionar todos"    |
| `showSelectAllLabel`   | `Boolean` | `true`  | Exibe contador de itens selecionados |

### Props de Customização

| Prop                | Tipo     | Padrão                 | Descrição                         |
| ------------------- | -------- | ---------------------- | --------------------------------- |
| `searchPlaceholder` | `String` | `'search'`             | Placeholder do campo de busca     |
| `searchType`        | `String` | `'text'`               | Tipo do input de busca            |
| `emptyText`         | `String` | `'noInformationFound'` | Texto quando não há dados         |
| `selectedLabel`     | `String` | `'Selecionados'`       | Label do contador de selecionados |
| `cardClass`         | `String` | `''`                   | Classes CSS do card container     |
| `rowClass`          | `String` | `'tbody-row'`          | Classes CSS das linhas            |

### Props de Paginação

| Prop             | Tipo      | Padrão                 | Descrição                  |
| ---------------- | --------- | ---------------------- | -------------------------- |
| `perPageDefault` | `Number`  | `10`                   | Itens por página padrão    |
| `perPageOptions` | `Array`   | `[5, 10, 25, 50, 100]` | Opções de itens por página |
| `forceResposive` | `Boolean` | `false`                | Força layout responsivo    |

### Props de Exportação

| Prop              | Tipo       | Padrão  | Descrição                  |
| ----------------- | ---------- | ------- | -------------------------- |
| `exportToExcel`   | `Function` | `null`  | Função para exportar dados |
| `generatingExcel` | `Boolean`  | `false` | Estado de geração do Excel |

## 📤 Eventos

| Evento          | Payload  | Descrição                                         |
| --------------- | -------- | ------------------------------------------------- |
| `selectedRows`  | `Array`  | Emitido quando itens são selecionados/desmarcados |
| `search`        | `String` | Emitido quando o usuário busca (com debounce)     |
| `changePage`    | `Number` | Emitido quando a página muda                      |
| `changePerPage` | `Number` | Emitido quando itens por página muda              |

## 🎯 Slots

### Slot `header`

Customiza o cabeçalho da tabela.

```vue
<ListTableSelect :data-table="data" :table-columns="columns">
  <template #header>
    <b-card-header>
      <h4>Selecionar Missões</h4>
      <p class="mb-0">Escolha as missões para a turma</p>
    </b-card-header>
  </template>
</ListTableSelect>
```

### Slot `card`

Customiza o layout dos cards no modo grid.

```vue
<ListTableSelect :data-table="missions" :table-columns="columns">
  <template #card="{ data, checked }">
    <b-card
      :class="{ 'border-primary shadow-sm': checked }"
      class="h-100 mission-card"
    >
      <!-- Header do card com ícone -->
      <div class="d-flex align-items-center mb-3">
        <div class="mission-icon mr-2">
          <component :is="getMissionIcon(data.subject)" />
        </div>
        <div class="flex-grow-1">
          <h5 class="mb-1">{{ data.title }}</h5>
          <small class="text-muted">{{ data.subject }}</small>
        </div>
        <b-badge :variant="getStatusVariant(data.status)">
          {{ $t(data.status) }}
        </b-badge>
      </div>

      <!-- Conteúdo do card -->
      <p class="text-muted">{{ data.description }}</p>

      <!-- Footer com estatísticas -->
      <div class="mt-auto">
        <div class="d-flex justify-content-between align-items-center">
          <small class="text-muted">
            {{ data.questionsCount }} questões
          </small>
          <small class="text-muted">
            Nível {{ data.difficultyLevel }}
          </small>
        </div>
      </div>
    </b-card>
  </template>
</ListTableSelect>
```

## 💡 Exemplos Práticos

### Seleção de Missões para Turma

```vue
<template>
  <div>
    <!-- Cabeçalho com informações -->
    <b-row class="mb-3">
      <b-col>
        <h3>Selecionar Missões para a Turma {{ className }}</h3>
        <p class="text-muted">Escolha as missões que os estudantes devem completar</p>
      </b-col>
      <b-col cols="auto">
        <b-button
          variant="primary"
          :disabled="selectedMissions.length === 0"
          @click="assignMissions"
        >
          Atribuir {{ selectedMissions.length }} Missões
        </b-button>
      </b-col>
    </b-row>

    <!-- Tabela de seleção -->
    <ListTableSelect
      :data-table="availableMissions"
      :table-columns="missionColumns"
      :total-data="totalMissions"
      :loading="loading"
      :columns="3"
      item-view="grid-view"
      :show-view-selection="true"
      selected-label="missões selecionadas"
      @selectedRows="handleMissionSelection"
      @search="searchMissions"
      @changePage="loadMissions"
    >
      <template #card="{ data, checked }">
        <b-card
          :class="{
            'border-primary shadow': checked,
            'border-danger': data.expired,
            'border-warning': data.draft,
          }"
          class="h-100"
        >
          <!-- Cabeçalho com status -->
          <div class="d-flex justify-content-between align-items-start mb-2">
            <h5 class="mb-1">{{ data.title }}</h5>
            <div class="d-flex flex-column align-items-end">
              <b-badge :variant="getStatusVariant(data.status)" class="mb-1">
                {{ $t(data.status) }}
              </b-badge>
              <small class="text-muted">{{ data.subject }}</small>
            </div>
          </div>

          <!-- Descrição -->
          <p class="text-muted small">{{ data.description }}</p>

          <!-- Estatísticas -->
          <div class="border-top pt-2 mt-auto">
            <b-row class="text-center">
              <b-col>
                <div class="font-weight-bold">{{ data.questionsCount }}</div>
                <small class="text-muted">Questões</small>
              </b-col>
              <b-col>
                <div class="font-weight-bold">{{ data.estimatedTime }}min</div>
                <small class="text-muted">Tempo Est.</small>
              </b-col>
              <b-col>
                <div class="font-weight-bold">Nível {{ data.difficultyLevel }}</div>
                <small class="text-muted">Dificuldade</small>
              </b-col>
            </b-row>
          </div>
        </b-card>
      </template>
    </ListTableSelect>

    <!-- Ações em lote -->
    <b-card v-if="selectedMissions.length" class="mt-3">
      <div class="d-flex justify-content-between align-items-center">
        <div>
          <strong>{{ selectedMissions.length }} missões selecionadas</strong>
          <p class="mb-0 text-muted">Tempo total estimado: {{ totalEstimatedTime }} minutos</p>
        </div>
        <div>
          <b-button variant="outline-secondary" class="mr-2" @click="clearSelection">
            Limpar Seleção
          </b-button>
          <b-button variant="primary" @click="assignMissions"> Atribuir Missões </b-button>
        </div>
      </div>
    </b-card>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        availableMissions: [],
        selectedMissions: [],
        loading: false,
        totalMissions: 0,
        className: '5° Ano A',
        missionColumns: [
          { key: 'title', label: 'Título', sortable: true },
          { key: 'subject', label: 'Matéria', sortable: true },
          { key: 'status', label: 'Status', sortable: false },
          { key: 'questionsCount', label: 'Questões', sortable: true },
        ],
      }
    },

    computed: {
      totalEstimatedTime() {
        return this.selectedMissions.reduce((total, mission) => {
          return total + mission.estimatedTime
        }, 0)
      },
    },

    async mounted() {
      await this.loadMissions(1)
    },

    methods: {
      handleMissionSelection(selectedItems) {
        this.selectedMissions = selectedItems
      },

      async loadMissions(page = 1) {
        this.loading = true
        try {
          const response = await this.$api.get(`/missions`, {
            params: { page, status: 'published' },
          })
          this.availableMissions = response.data.missions
          this.totalMissions = response.data.total
        } catch (error) {
          this.$toast.error('Erro ao carregar missões')
        } finally {
          this.loading = false
        }
      },

      async searchMissions(searchTerm) {
        // Implementar busca de missões
        const response = await this.$api.get(`/missions`, {
          params: { search: searchTerm },
        })
        this.availableMissions = response.data.missions
      },

      async assignMissions() {
        try {
          await this.$api.post('/classes/assign-missions', {
            classId: this.classId,
            missionIds: this.selectedMissions.map(m => m.id),
          })

          this.$toast.success(`${this.selectedMissions.length} missões atribuídas com sucesso!`)
          this.$router.push('/classes')
        } catch (error) {
          this.$toast.error('Erro ao atribuir missões')
        }
      },

      clearSelection() {
        this.selectedMissions = []
      },

      getStatusVariant(status) {
        const variants = {
          published: 'success',
          draft: 'warning',
          archived: 'secondary',
          expired: 'danger',
        }
        return variants[status] || 'secondary'
      },
    },
  }
</script>
```

### Seleção com Filtros Avançados

```vue
<template>
  <div>
    <!-- Filtros -->
    <b-card class="mb-3">
      <b-row>
        <b-col md="3">
          <b-form-group label="Matéria:">
            <b-form-select v-model="filters.subject" :options="subjectOptions" />
          </b-form-group>
        </b-col>
        <b-col md="3">
          <b-form-group label="Nível:">
            <b-form-select v-model="filters.level" :options="levelOptions" />
          </b-form-group>
        </b-col>
        <b-col md="3">
          <b-form-group label="Status:">
            <b-form-select v-model="filters.status" :options="statusOptions" />
          </b-form-group>
        </b-col>
        <b-col md="3" class="d-flex align-items-end">
          <b-button variant="outline-secondary" @click="resetFilters"> Limpar Filtros </b-button>
        </b-col>
      </b-row>
    </b-card>

    <!-- Tabela de seleção com filtros aplicados -->
    <ListTableSelect
      :data-table="filteredData"
      :table-columns="columns"
      :total-data="totalData"
      :loading="loading"
      @selectedRows="handleSelection"
    >
      <template #card="{ data, checked }">
        <!-- Layout customizado do card -->
      </template>
    </ListTableSelect>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        filters: {
          subject: '',
          level: '',
          status: 'published',
        },
      }
    },

    watch: {
      filters: {
        handler() {
          this.applyFilters()
        },
        deep: true,
      },
    },

    methods: {
      applyFilters() {
        // Implementar lógica de filtros
      },
    },
  }
</script>
```

## 🎨 Customização Visual

### Estilos para Cards Selecionados

```vue
<style scoped>
/* Estilos para cards selecionados */
:deep(.selectable-card-container.checked) {
  transform: translateY(-2px);
  transition: transform 0.2s ease;
}

:deep(.selectable-card-container.checked .card) {
  border-color: var(--bs-primary);
  box-shadow: 0 4px 8px rgba(115, 103, 240, 0.2);
}

/* Posicionamento do checkbox */
:deep(.checkbox-container) {
  top: 0.75rem;
  right: 0.75rem;
  z-index: 10;
}

/* Hover effects */
:deep(.selectable-card-container:hover .card) {
  transform: translateY(-1px);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease;
}

/* Grid responsivo */
@media (max-width: 768px) {
  :deep(.match-height .col-md-6) {
    margin-bottom: 1rem;
  }
}
</style>
```

## ⚠️ Considerações Importantes

1. **Performance**: Para grandes datasets, implemente paginação server-side
2. **Seleção**: O estado de seleção é mantido apenas na página atual
3. **Acessibilidade**: Cards selecionáveis mantêm suporte a navegação por teclado
4. **Mobile**: O modo grid se adapta automaticamente a telas menores
5. **Estado**: Use store (Vuex/Pinia) para persistir seleções entre páginas

## 🔗 Componentes Relacionados

- [`ListTable`](./ListTable.md) - Tabela principal sem seleção
- [`ListTablePagination`](./ListTablePagination.md) - Componente de paginação
- [`ListTableLocalSorting`](./ListTableLocalSorting.md) - Tabela com ordenação local
