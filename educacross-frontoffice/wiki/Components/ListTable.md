# Componente ListTable

Documentação completa do componente `ListTable` - uma tabela de dados avançada com recursos de paginação, busca, ordenação e exportação.

## 📋 Visão Geral

O `ListTable` é um componente de tabela altamente configurável que oferece:

- 📊 **Exibição de dados tabulares** com suporte a diferentes tipos de dados
- 🔍 **Busca integrada** com debounce automático
- 📄 **Paginação** com controle de itens por página
- 📱 **Visualização responsiva** (lista ou grid)
- 📤 **Exportação para Excel** nativa
- ⚡ **Loading states** com skeleton
- 🎨 **Customização via slots** para células e controles
- 🔧 **Controles flexíveis** (busca, paginação, filtros)

## 🚀 Como Usar

### Importação

```javascript
import ListTable from '@/components/table/ListTable.vue'

export default {
  components: {
    ListTable,
  },
}
```

### Uso Básico

```vue
<template>
  <ListTable
    :data="students"
    :columns="tableColumns"
    :loading="loading"
    :total-data="totalStudents"
    :current-page="currentPage"
    :per-page="perPage"
    search-placeholder="searchStudents"
    @page-changed="handlePageChange"
    @search="handleSearch"
  >
    <!-- Slot para customizar células específicas -->
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
      <b-button size="sm" variant="outline-danger" @click="deleteStudent(item)">
        <feather-icon icon="TrashIcon" size="16" />
      </b-button>
    </template>
  </ListTable>
</template>

<script>
  export default {
    data() {
      return {
        students: [],
        loading: false,
        totalStudents: 0,
        currentPage: 1,
        perPage: 10,
        tableColumns: [
          { key: 'name', label: 'Nome', sortable: true },
          { key: 'email', label: 'Email', sortable: true },
          { key: 'grade', label: 'Turma', sortable: false },
          { key: 'status', label: 'Status', sortable: false },
          { key: 'actions', label: 'Ações', sortable: false },
        ],
      }
    },
    methods: {
      handlePageChange(page) {
        this.currentPage = page
        this.fetchStudents()
      },
      handleSearch(searchTerm) {
        this.searchQuery = searchTerm
        this.currentPage = 1
        this.fetchStudents()
      },
    },
  }
</script>
```

## ⚙️ Props

### Props Principais

| Prop          | Tipo      | Padrão  | Descrição                            |
| ------------- | --------- | ------- | ------------------------------------ |
| `data`        | `Array`   | `[]`    | Array de dados para exibir na tabela |
| `columns`     | `Array`   | `[]`    | Configuração das colunas da tabela   |
| `loading`     | `Boolean` | `false` | Estado de carregamento               |
| `totalData`   | `Number`  | `0`     | Total de registros (para paginação)  |
| `currentPage` | `Number`  | `1`     | Página atual                         |
| `perPage`     | `Number`  | `10`    | Itens por página                     |

### Props de Controle

| Prop                   | Tipo      | Padrão     | Descrição                                  |
| ---------------------- | --------- | ---------- | ------------------------------------------ |
| `showControls`         | `Boolean` | `true`     | Exibe controles (busca, paginação, etc.)   |
| `showSearchQueryInput` | `Boolean` | `true`     | Exibe campo de busca                       |
| `showViewSelection`    | `Boolean` | `false`    | Exibe seletor de visualização (lista/grid) |
| `border`               | `Boolean` | `true`     | Exibe borda do card                        |
| `searchPlaceholder`    | `String`  | `'search'` | Placeholder do campo de busca              |
| `searchType`           | `String`  | `'text'`   | Tipo do input de busca                     |

### Props de Exportação

| Prop              | Tipo       | Padrão  | Descrição                             |
| ----------------- | ---------- | ------- | ------------------------------------- |
| `exportToExcel`   | `Function` | `null`  | Função para exportar dados para Excel |
| `generatingExcel` | `Boolean`  | `false` | Estado de geração do Excel            |

### Props de Visualização

| Prop              | Tipo     | Padrão              | Descrição                                             |
| ----------------- | -------- | ------------------- | ----------------------------------------------------- |
| `itemView`        | `String` | `'list-view'`       | Modo de visualização (`'list-view'` ou `'grid-view'`) |
| `itemViewOptions` | `Array`  | `[...]`             | Opções de visualização disponíveis                    |
| `perPageOptions`  | `Array`  | `[10, 25, 50, 100]` | Opções de itens por página                            |

## 📤 Eventos

| Evento             | Payload              | Descrição                                        |
| ------------------ | -------------------- | ------------------------------------------------ |
| `page-changed`     | `page: Number`       | Emitido quando a página muda                     |
| `search`           | `searchTerm: String` | Emitido quando o usuário busca (com debounce)    |
| `per-page-changed` | `perPage: Number`    | Emitido quando o número de itens por página muda |
| `view-changed`     | `view: String`       | Emitido quando o modo de visualização muda       |

## 🎯 Slots

### Slot `header`

Customiza o cabeçalho da tabela (dentro do card).

```vue
<ListTable :data="data" :columns="columns">
  <template #header>
    <b-card-header>
      <b-card-title>Lista de Estudantes</b-card-title>
      <b-card-subtitle>Gerencie os estudantes da sua turma</b-card-subtitle>
    </b-card-header>
  </template>
</ListTable>
```

### Slot `cell(column-key)`

Customiza a renderização de células específicas.

```vue
<ListTable :data="students" :columns="columns">
  <!-- Customizar coluna de status -->
  <template #cell(status)="{ item, value }">
    <b-badge :variant="getStatusVariant(value)">
      {{ $t(value) }}
    </b-badge>
  </template>

  <!-- Customizar coluna de foto -->
  <template #cell(avatar)="{ item }">
    <b-avatar :src="item.avatar" size="sm"></b-avatar>
  </template>

  <!-- Customizar coluna de ações -->
  <template #cell(actions)="{ item, index }">
    <b-dropdown variant="link" no-caret right>
      <template #button-content>
        <feather-icon icon="MoreVerticalIcon" size="16" />
      </template>
      <b-dropdown-item @click="editItem(item)">
        <feather-icon icon="EditIcon" size="16" />
        Editar
      </b-dropdown-item>
      <b-dropdown-item @click="deleteItem(item)" variant="danger">
        <feather-icon icon="TrashIcon" size="16" />
        Excluir
      </b-dropdown-item>
    </b-dropdown>
  </template>
</ListTable>
```

### Slot `card-view-order`

Customiza controles de ordenação quando em modo grid.

```vue
<ListTable :data="data" :columns="columns" item-view="grid-view">
  <template #card-view-order>
    <b-form-select v-model="sortBy" :options="sortOptions">
    </b-form-select>
  </template>
</ListTable>
```

## 💡 Configuração de Colunas

### Estrutura Básica

```javascript
const columns = [
  {
    key: 'name', // Chave do campo no objeto de dados
    label: 'Nome', // Texto do cabeçalho
    sortable: true, // Se a coluna é ordenável
    formatter: value => {
      // Função para formatar o valor
      return value.toUpperCase()
    },
    class: 'text-center', // Classes CSS para a coluna
    thClass: 'text-center', // Classes CSS para o cabeçalho
    tdClass: 'text-center', // Classes CSS para as células
  },
]
```

### Exemplo Avançado de Colunas

```javascript
const tableColumns = [
  {
    key: 'avatar',
    label: '',
    sortable: false,
    class: 'text-center',
    thClass: 'border-0',
    tdClass: 'border-0',
  },
  {
    key: 'name',
    label: 'Nome Completo',
    sortable: true,
    formatter: (value, key, item) => {
      return `${item.firstName} ${item.lastName}`
    },
  },
  {
    key: 'email',
    label: 'Email',
    sortable: true,
    formatter: value => value.toLowerCase(),
  },
  {
    key: 'createdAt',
    label: 'Data de Criação',
    sortable: true,
    formatter: value => {
      return new Date(value).toLocaleDateString('pt-BR')
    },
  },
  {
    key: 'status',
    label: 'Status',
    sortable: false,
    class: 'text-center',
  },
  {
    key: 'actions',
    label: 'Ações',
    sortable: false,
    class: 'text-center',
    thClass: 'border-0',
    tdClass: 'border-0',
  },
]
```

## 📊 Exemplo com Exportação Excel

```vue
<template>
  <ListTable
    :data="students"
    :columns="tableColumns"
    :loading="loading"
    :export-to-excel="exportStudentsToExcel"
    :generating-excel="generatingExcel"
    @page-changed="handlePageChange"
    @search="handleSearch"
  />
</template>

<script>
  export default {
    data() {
      return {
        generatingExcel: false,
        // ... outros dados
      }
    },
    methods: {
      async exportStudentsToExcel() {
        this.generatingExcel = true
        try {
          // Buscar todos os dados
          const allStudents = await this.fetchAllStudents()

          // Preparar dados para exportação
          const exportData = allStudents.map(student => ({
            Nome: student.name,
            Email: student.email,
            Turma: student.grade,
            Status: this.$t(student.status),
            'Data de Criação': new Date(student.createdAt).toLocaleDateString('pt-BR'),
          }))

          // Exportar usando uma biblioteca como xlsx
          const worksheet = XLSX.utils.json_to_sheet(exportData)
          const workbook = XLSX.utils.book_new()
          XLSX.utils.book_append_sheet(workbook, worksheet, 'Estudantes')
          XLSX.writeFile(workbook, 'estudantes.xlsx')

          this.$toast.success('Dados exportados com sucesso!')
        } catch (error) {
          this.$toast.error('Erro ao exportar dados')
        } finally {
          this.generatingExcel = false
        }
      },
    },
  }
</script>
```

## 🎨 Customização Visual

### Classes CSS Personalizadas

```vue
<style scoped>
/* Customizar aparência da tabela */
:deep(.table) {
  border-radius: 8px;
  overflow: hidden;
}

:deep(.table thead th) {
  background-color: var(--bs-gray-100);
  border-bottom: 2px solid var(--bs-primary);
  font-weight: 600;
}

:deep(.table tbody tr:hover) {
  background-color: var(--bs-primary-bg-subtle);
}

/* Customizar controles */
.per-page-selector {
  min-width: 70px;
}

.searchQuery {
  max-width: 300px;
}
</style>
```

## 🔧 Integração com API

### Exemplo Completo com API

```vue
<template>
  <div>
    <ListTable
      :data="students"
      :columns="tableColumns"
      :loading="loading"
      :total-data="totalStudents"
      :current-page="currentPage"
      :per-page="perPage"
      search-placeholder="searchStudents"
      @page-changed="handlePageChange"
      @search="handleSearch"
      @per-page-changed="handlePerPageChange"
    >
      <template #cell(status)="{ value }">
        <b-badge :variant="getStatusVariant(value)">
          {{ $t(value) }}
        </b-badge>
      </template>
    </ListTable>
  </div>
</template>

<script>
  import { studentsService } from '@/services/studentsService'

  export default {
    data() {
      return {
        students: [],
        loading: false,
        totalStudents: 0,
        currentPage: 1,
        perPage: 10,
        searchQuery: '',
        tableColumns: [
          { key: 'name', label: 'Nome', sortable: true },
          { key: 'email', label: 'Email', sortable: true },
          { key: 'grade', label: 'Turma', sortable: false },
          { key: 'status', label: 'Status', sortable: false },
        ],
      }
    },

    async mounted() {
      await this.fetchStudents()
    },

    methods: {
      async fetchStudents() {
        this.loading = true
        try {
          const response = await studentsService.getStudents({
            page: this.currentPage,
            perPage: this.perPage,
            search: this.searchQuery,
          })

          this.students = response.data
          this.totalStudents = response.total
        } catch (error) {
          this.$toast.error('Erro ao buscar estudantes')
        } finally {
          this.loading = false
        }
      },

      async handlePageChange(page) {
        this.currentPage = page
        await this.fetchStudents()
      },

      async handleSearch(searchTerm) {
        this.searchQuery = searchTerm
        this.currentPage = 1
        await this.fetchStudents()
      },

      async handlePerPageChange(perPage) {
        this.perPage = perPage
        this.currentPage = 1
        await this.fetchStudents()
      },

      getStatusVariant(status) {
        const variants = {
          active: 'success',
          inactive: 'secondary',
          pending: 'warning',
          blocked: 'danger',
        }
        return variants[status] || 'secondary'
      },
    },
  }
</script>
```

## ⚠️ Considerações Importantes

1. **Performance**: Para grandes volumes de dados, considere implementar paginação server-side
2. **Responsividade**: Use o modo grid para melhor experiência mobile
3. **Acessibilidade**: Certifique-se de que as células customizadas mantêm a acessibilidade
4. **Loading States**: Sempre forneça feedback visual durante carregamentos
5. **Tratamento de Erros**: Implemente tratamento adequado para falhas de API

## 🔗 Componentes Relacionados

- [`ListTablePagination`](./ListTablePagination.md) - Componente de paginação
- [`ListTableSelect`](./ListTableSelect.md) - Tabela com seleção de itens
- [`ListTableLocalSorting`](./ListTableLocalSorting.md) - Tabela com ordenação local
