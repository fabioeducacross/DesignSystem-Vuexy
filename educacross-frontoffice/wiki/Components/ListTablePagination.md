# Componente ListTablePagination

Documentação do componente `ListTablePagination` - um componente de paginação reutilizável para tabelas e listas.

## 📋 Visão Geral

O `ListTablePagination` é um componente especializado em fornecer navegação por páginas para conjuntos grandes de dados. Ele oferece:

- 🔢 **Navegação por páginas** com botões anterior/próximo
- 📊 **Informações de contexto** (mostrando X de Y registros)
- 📱 **Design responsivo** adaptável a diferentes tamanhos de tela
- 🎨 **Customização visual** com ícones e estilos modernos
- ⚙️ **Configuração flexível** de exibição

## 🚀 Como Usar

### Importação

```javascript
import ListTablePagination from '@/components/table/ListTablePagination.vue'

export default {
  components: {
    ListTablePagination,
  },
}
```

### Uso Básico

```vue
<template>
  <div>
    <!-- Sua tabela ou lista aqui -->
    <ListTable :data="filteredData" />

    <!-- Componente de paginação -->
    <ListTablePagination
      v-model="currentPage"
      :total-data="totalStudents"
      :per-page="perPage"
      @input="handlePageChange"
    />
  </div>
</template>

<script>
  export default {
    data() {
      return {
        currentPage: 1,
        perPage: 10,
        totalStudents: 150,
      }
    },
    methods: {
      handlePageChange(page) {
        this.currentPage = page
        this.fetchData()
      },
    },
  }
</script>
```

## ⚙️ Props

### Props Obrigatórias

| Prop        | Tipo     | Descrição                        |
| ----------- | -------- | -------------------------------- |
| `value`     | `Number` | Página atual (usado com v-model) |
| `totalData` | `Number` | Total de registros no dataset    |
| `perPage`   | `Number` | Número de itens por página       |

### Props Opcionais

| Prop             | Tipo      | Padrão  | Descrição                                           |
| ---------------- | --------- | ------- | --------------------------------------------------- |
| `forceResposive` | `Boolean` | `false` | Força layout responsivo (centralizado)              |
| `showEntries`    | `Boolean` | `true`  | Exibe informações de registros ("Mostrando X de Y") |

## 📤 Eventos

| Evento  | Payload        | Descrição                                             |
| ------- | -------------- | ----------------------------------------------------- |
| `input` | `page: Number` | Emitido quando a página muda (compatível com v-model) |

## 💡 Exemplos Práticos

### Uso com Controle de Estado

```vue
<template>
  <div>
    <div class="d-flex justify-content-between align-items-center mb-3">
      <h4>Lista de Estudantes</h4>
      <div>
        <label>Itens por página:</label>
        <b-form-select
          v-model="perPage"
          :options="perPageOptions"
          class="ml-2"
          style="width: auto;"
        />
      </div>
    </div>

    <b-table :items="paginatedStudents" :fields="fields" />

    <ListTablePagination
      v-model="currentPage"
      :total-data="totalStudents"
      :per-page="perPage"
      class="mt-3"
    />
  </div>
</template>

<script>
  export default {
    data() {
      return {
        currentPage: 1,
        perPage: 10,
        perPageOptions: [
          { value: 5, text: '5' },
          { value: 10, text: '10' },
          { value: 25, text: '25' },
          { value: 50, text: '50' },
        ],
        students: [], // Array com todos os estudantes
      }
    },
    computed: {
      totalStudents() {
        return this.students.length
      },
      paginatedStudents() {
        const start = (this.currentPage - 1) * this.perPage
        const end = start + this.perPage
        return this.students.slice(start, end)
      },
    },
    watch: {
      perPage() {
        // Reset para primeira página quando mudar itens por página
        this.currentPage = 1
      },
    },
  }
</script>
```

### Uso com API (Server-side Pagination)

```vue
<template>
  <div>
    <b-table :items="students" :fields="fields" :busy="loading">
      <template #table-busy>
        <div class="text-center text-muted my-2">
          <b-spinner class="align-middle"></b-spinner>
          <strong>Carregando...</strong>
        </div>
      </template>
    </b-table>

    <ListTablePagination
      v-model="currentPage"
      :total-data="totalStudents"
      :per-page="perPage"
      @input="fetchStudents"
    />
  </div>
</template>

<script>
  import { studentsAPI } from '@/services/api'

  export default {
    data() {
      return {
        students: [],
        currentPage: 1,
        perPage: 10,
        totalStudents: 0,
        loading: false,
      }
    },

    async mounted() {
      await this.fetchStudents()
    },

    methods: {
      async fetchStudents() {
        this.loading = true
        try {
          const response = await studentsAPI.getStudents({
            page: this.currentPage,
            limit: this.perPage,
          })

          this.students = response.data
          this.totalStudents = response.total
        } catch (error) {
          this.$toast.error('Erro ao carregar estudantes')
        } finally {
          this.loading = false
        }
      },
    },
  }
</script>
```

### Layout Responsivo Forçado

```vue
<template>
  <div>
    <!-- Em telas pequenas, centraliza tudo -->
    <ListTablePagination
      v-model="currentPage"
      :total-data="totalData"
      :per-page="perPage"
      :force-resposive="true"
      class="mt-3"
    />
  </div>
</template>
```

### Sem Informações de Registros

```vue
<template>
  <div>
    <!-- Apenas a navegação, sem "Mostrando X de Y" -->
    <ListTablePagination
      v-model="currentPage"
      :total-data="totalData"
      :per-page="perPage"
      :show-entries="false"
    />
  </div>
</template>
```

## 🎨 Customização Visual

### Sobrescrevendo Estilos

```vue
<style scoped>
/* Customizar cores da paginação */
:deep(.pagination) {
  justify-content: center;
}

:deep(.page-link) {
  color: var(--bs-primary);
  border-color: var(--bs-border-color);
}

:deep(.page-item.active .page-link) {
  background-color: var(--bs-primary);
  border-color: var(--bs-primary);
}

:deep(.page-link:hover) {
  background-color: var(--bs-primary-bg-subtle);
  border-color: var(--bs-primary-border-subtle);
}

/* Customizar texto de informações */
:deep(.text-muted) {
  font-size: 0.875rem;
  font-weight: 500;
}
</style>
```

### Adicionando Elementos Extras

```vue
<template>
  <div class="d-flex justify-content-between align-items-center flex-wrap">
    <!-- Informações customizadas -->
    <div class="mb-2 mb-sm-0">
      <small class="text-muted">
        Total de {{ formatNumber(totalData) }} registros encontrados
      </small>
    </div>

    <!-- Paginação -->
    <ListTablePagination
      v-model="currentPage"
      :total-data="totalData"
      :per-page="perPage"
      :show-entries="false"
    />

    <!-- Controles extras -->
    <div class="mb-2 mb-sm-0">
      <b-button size="sm" variant="outline-secondary" @click="refreshData">
        <feather-icon icon="RefreshCwIcon" size="14" />
        Atualizar
      </b-button>
    </div>
  </div>
</template>
```

## 🔧 Integração com Outros Componentes

### Com ListTable

```vue
<template>
  <div>
    <ListTable
      :data="currentPageData"
      :columns="columns"
      :loading="loading"
      :show-controls="false" <!-- Desabilita controles internos da tabela -->
    />

    <!-- Controles customizados -->
    <div class="d-flex justify-content-between align-items-center mt-3">
      <div class="d-flex align-items-center">
        <label class="mr-2">Itens por página:</label>
        <b-form-select v-model="perPage" :options="perPageOptions" style="width: auto;" />
      </div>

      <ListTablePagination
        v-model="currentPage"
        :total-data="totalData"
        :per-page="perPage"
        :show-entries="false"
      />
    </div>
  </div>
</template>
```

### Com Filtros e Busca

```vue
<template>
  <div>
    <!-- Controles de filtro -->
    <b-card class="mb-3">
      <b-row>
        <b-col md="6">
          <b-form-group label="Buscar:">
            <b-form-input v-model="searchTerm" placeholder="Digite para buscar..." debounce="500" />
          </b-form-group>
        </b-col>
        <b-col md="6">
          <b-form-group label="Status:">
            <b-form-select v-model="statusFilter" :options="statusOptions" />
          </b-form-group>
        </b-col>
      </b-row>
    </b-card>

    <!-- Tabela -->
    <b-table :items="filteredData" :fields="fields" />

    <!-- Paginação -->
    <ListTablePagination
      v-model="currentPage"
      :total-data="filteredData.length"
      :per-page="perPage"
    />
  </div>
</template>

<script>
  export default {
    data() {
      return {
        searchTerm: '',
        statusFilter: 'all',
        currentPage: 1,
        perPage: 10,
      }
    },
    computed: {
      filteredData() {
        let filtered = this.allData

        // Aplicar busca
        if (this.searchTerm) {
          filtered = filtered.filter(item =>
            item.name.toLowerCase().includes(this.searchTerm.toLowerCase()),
          )
        }

        // Aplicar filtro de status
        if (this.statusFilter !== 'all') {
          filtered = filtered.filter(item => item.status === this.statusFilter)
        }

        return filtered
      },
    },
    watch: {
      searchTerm() {
        this.currentPage = 1 // Reset para primeira página ao buscar
      },
      statusFilter() {
        this.currentPage = 1 // Reset para primeira página ao filtrar
      },
    },
  }
</script>
```

## 📱 Comportamento Responsivo

### Breakpoints

- **Desktop (md+)**: Layout lado a lado (informações à esquerda, paginação à direita)
- **Mobile (sm-)**: Layout empilhado (informações em cima, paginação embaixo)
- **Force Responsive**: Sempre usa layout empilhado e centralizado

### Exemplo de Uso Responsivo

```vue
<template>
  <div>
    <!-- Desktop: info na esquerda, paginação na direita -->
    <!-- Mobile: info em cima, paginação embaixo, ambos centralizados -->
    <ListTablePagination
      v-model="currentPage"
      :total-data="1000"
      :per-page="25"
    />
  </div>
</template>

<style scoped>
/* Adicionar espaçamento em mobile */
@media (max-width: 576px) {
  :deep(.row) {
    gap: 0.5rem;
  }
}
</style>
```

## ⚠️ Considerações Importantes

1. **Performance**: Use paginação server-side para grandes datasets (>1000 itens)
2. **UX**: Sempre reset para página 1 quando aplicar filtros ou busca
3. **Estado**: Mantenha o estado da página atual na URL para melhor experiência
4. **Loading**: Forneça feedback visual durante carregamento de páginas
5. **Acessibilidade**: O componente usa b-pagination que já tem suporte adequado

## 🔗 Componentes Relacionados

- [`ListTable`](./ListTable.md) - Tabela principal que usa este componente
- [`ListTableSelect`](./ListTableSelect.md) - Variante com seleção de itens
- [`ListTableLocalSorting`](./ListTableLocalSorting.md) - Variante com ordenação local
