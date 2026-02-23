# Componente ESelect

Documentação completa do componente `ESelect` - um seletor customizado Vue.js com funcionalidades avançadas de busca, paginação e seleção múltipla.

## 📋 Visão Geral

O `ESelect` é um componente de seleção altamente customizável que oferece uma interface dropdown com suporte a:

- ✅ Seleção única ou múltipla
- 🔍 Busca em tempo real
- 📄 Paginação de opções
- ⚡ Carregamento assíncrono de dados
- ✔️ Validação de estado
- 📱 Interface responsiva
- ♿ Acessibilidade
- 🎨 Variantes de cores personalizáveis
- 🗂️ Modal para visualização de itens selecionados
- 🧹 Opção de limpeza (clearable)

## 🚀 Como Usar

### Importação

```javascript
import ESelect from '@/components/selects/ESelect.vue'

export default {
  components: {
    ESelect,
  },
}
```

### Uso Básico

```vue
<template>
  <ESelect
    v-model="selectedValue"
    :options="myOptions"
    label="name"
    placeholder="Selecione uma opção"
  />
</template>

<script>
  export default {
    data() {
      return {
        selectedValue: null,
        myOptions: [
          { id: 1, name: 'Opção 1', value: 'option1' },
          { id: 2, name: 'Opção 2', value: 'option2' },
          { id: 3, name: 'Opção 3', value: 'option3' },
        ],
      }
    },
  }
</script>
```

## ⚙️ Props

### Props Obrigatórias

| Prop      | Tipo    | Descrição                                     |
| --------- | ------- | --------------------------------------------- |
| `options` | `Array` | Lista de opções para seleção. **Obrigatório** |

### Props Opcionais

| Prop            | Tipo                                  | Padrão                  | Descrição                                                |
| --------------- | ------------------------------------- | ----------------------- | -------------------------------------------------------- |
| `value`         | `String`, `Number`, `Object`, `Array` | `null`                  | Valor(es) selecionado(s)                                 |
| `label`         | `String`                              | `'name'`                | Propriedade do objeto a ser usada como texto de exibição |
| `trackBy`       | `String`                              | `'id'`                  | Propriedade para identificar unicamente cada opção       |
| `loading`       | `Boolean`                             | `false`                 | Indica se as opções estão sendo carregadas               |
| `variant`       | `String`                              | `'primary'`             | Variante visual do componente                            |
| `state`         | `String`, `Boolean`                   | `null`                  | Estado de validação (`true`, `false`, `null`)            |
| `multiple`      | `Boolean`                             | `false`                 | Permite seleção múltipla                                 |
| `closeOnSelect` | `Boolean`                             | `true`                  | Fecha o dropdown após seleção                            |
| `clearable`     | `Boolean`                             | `false`                 | Permite limpar a seleção                                 |
| `searchable`    | `Boolean`                             | `false`                 | Habilita busca nas opções                                |
| `placeholder`   | `String`                              | `'Selecione uma opção'` | Texto exibido quando nada está selecionado               |
| `disabled`      | `Boolean`                             | `false`                 | Desabilita o componente                                  |
| `paginated`     | `Boolean`                             | `false`                 | Habilita paginação                                       |
| `page`          | `Number`                              | `1`                     | Página atual (para paginação)                            |
| `totalPages`    | `Number`                              | `1`                     | Total de páginas disponíveis                             |
| `maxHeight`     | `String`                              | `'200px'`               | Altura máxima do dropdown                                |

### Validação de Props

```javascript
props: {
  options: {
    type: Array,
    required: true,
    validator: (options) => {
      return Array.isArray(options) && options.length >= 0
    }
  },
  variant: {
    type: String,
    default: 'primary',
    validator: (value) => {
      return ['primary', 'secondary', 'success', 'warning', 'danger'].includes(value)
    }
  },
  state: {
    type: [String, Boolean],
    default: null,
    validator: (value) => {
      return [true, false, null, 'valid', 'invalid'].includes(value)
    }
  }
}
```

## 📤 Eventos

| Evento     | Payload      | Descrição                                      |
| ---------- | ------------ | ---------------------------------------------- |
| `input`    | `value`      | Emitido quando a seleção muda                  |
| `nextPage` | `void`       | Emitido quando precisa carregar próxima página |
| `search`   | `searchTerm` | Emitido quando o usuário busca                 |
| `open`     | `void`       | Emitido quando o dropdown é aberto             |
| `close`    | `void`       | Emitido quando o dropdown é fechado            |
| `clear`    | `void`       | Emitido quando a seleção é limpa               |

### Exemplo de Eventos

```vue
<template>
  <ESelect
    v-model="selectedValue"
    :options="options"
    @input="handleSelection"
    @search="handleSearch"
    @nextPage="loadNextPage"
    @open="onOpen"
    @close="onClose"
  />
</template>

<script>
  export default {
    methods: {
      handleSelection(value) {
        console.log('Selecionado:', value)
      },

      handleSearch(term) {
        console.log('Buscando por:', term)
        this.filterOptions(term)
      },

      loadNextPage() {
        console.log('Carregando próxima página...')
        this.fetchMoreOptions()
      },

      onOpen() {
        console.log('Dropdown aberto')
      },

      onClose() {
        console.log('Dropdown fechado')
      },
    },
  }
</script>
```

## 🎯 Slots

### Slot `selected-option`

Customiza como a opção selecionada é exibida (apenas para seleção única).

```vue
<ESelect v-model="selected" :options="options">
  <template #selected-option="{ option }">
    <div class="custom-selected">
      <img :src="option.avatar" alt="" class="avatar-sm">
      <span>{{ option.name }}</span>
    </div>
  </template>
</ESelect>
```

### Slot `option`

Customiza como cada opção é exibida na lista dropdown.

```vue
<ESelect v-model="selected" :options="options">
  <template #option="{ option, isSelected }">
    <div class="custom-option" :class="{ selected: isSelected }">
      <img :src="option.avatar" alt="" class="avatar-xs">
      <div>
        <div class="option-title">{{ option.name }}</div>
        <div class="option-subtitle">{{ option.email }}</div>
      </div>
      <feather-icon v-if="isSelected" icon="check" size="16" />
    </div>
  </template>
</ESelect>
```

### Slot `no-options`

Customiza a mensagem quando não há opções disponíveis.

```vue
<ESelect v-model="selected" :options="[]">
  <template #no-options>
    <div class="text-center p-3">
      <feather-icon icon="inbox" size="24" class="text-muted" />
      <p class="mt-2 mb-0">Nenhuma opção disponível</p>
    </div>
  </template>
</ESelect>
```

## 💡 Exemplos Práticos

### Seleção Múltipla

```vue
<template>
  <div>
    <ESelect
      v-model="selectedStudents"
      :options="students"
      :multiple="true"
      :clearable="true"
      :searchable="true"
      label="name"
      track-by="id"
      placeholder="Selecione os estudantes"
    />

    <div v-if="selectedStudents.length" class="mt-2">
      <span class="badge badge-primary mr-1" v-for="student in selectedStudents" :key="student.id">
        {{ student.name }}
      </span>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        selectedStudents: [],
        students: [
          { id: 1, name: 'Ana Silva', grade: '5A' },
          { id: 2, name: 'João Santos', grade: '5A' },
          { id: 3, name: 'Maria Costa', grade: '5B' },
        ],
      }
    },
  }
</script>
```

### Com Paginação

```vue
<template>
  <ESelect
    v-model="selectedMission"
    :options="missions"
    :loading="loading"
    :paginated="true"
    :page="currentPage"
    :total-pages="totalPages"
    :searchable="true"
    label="name"
    track-by="id"
    placeholder="Busque por missões..."
    @nextPage="loadNextPage"
    @search="searchMissions"
  />
</template>

<script>
  export default {
    data() {
      return {
        selectedMission: null,
        missions: [],
        loading: false,
        currentPage: 1,
        totalPages: 1,
        searchTerm: '',
      }
    },

    methods: {
      async loadNextPage() {
        if (this.currentPage < this.totalPages) {
          this.loading = true
          this.currentPage++

          try {
            const response = await this.fetchMissions({
              page: this.currentPage,
              search: this.searchTerm,
            })

            this.missions.push(...response.data.missions)
            this.totalPages = response.data.totalPages
          } finally {
            this.loading = false
          }
        }
      },

      async searchMissions(term) {
        this.searchTerm = term
        this.currentPage = 1
        this.loading = true

        try {
          const response = await this.fetchMissions({
            page: 1,
            search: term,
          })

          this.missions = response.data.missions
          this.totalPages = response.data.totalPages
        } finally {
          this.loading = false
        }
      },

      async fetchMissions(params) {
        // Chamada para API
        return await this.$http.get('/missions', { params })
      },
    },

    mounted() {
      this.loadNextPage()
    },
  }
</script>
```

### Com Validação

```vue
<template>
  <form @submit.prevent="submitForm">
    <div class="form-group">
      <label for="subject">Disciplina *</label>
      <ESelect
        id="subject"
        v-model="form.subject"
        :options="subjects"
        :state="subjectState"
        label="name"
        track-by="id"
        placeholder="Selecione uma disciplina"
      />
      <div v-if="errors.subject" class="invalid-feedback d-block">
        {{ errors.subject }}
      </div>
    </div>

    <button type="submit" :disabled="!isFormValid">Salvar</button>
  </form>
</template>

<script>
  export default {
    data() {
      return {
        form: {
          subject: null,
        },
        errors: {},
        subjects: [
          { id: 1, name: 'Matemática' },
          { id: 2, name: 'Português' },
          { id: 3, name: 'Ciências' },
        ],
      }
    },

    computed: {
      subjectState() {
        if (this.errors.subject) return false
        if (this.form.subject) return true
        return null
      },

      isFormValid() {
        return this.form.subject && Object.keys(this.errors).length === 0
      },
    },

    methods: {
      validateForm() {
        this.errors = {}

        if (!this.form.subject) {
          this.errors.subject = 'Selecione uma disciplina'
        }
      },

      submitForm() {
        this.validateForm()

        if (this.isFormValid) {
          console.log('Formulário válido:', this.form)
          // Enviar dados
        }
      },
    },
  }
</script>
```

### Com Carregamento Assíncrono

```vue
<template>
  <ESelect
    v-model="selectedClass"
    :options="classes"
    :loading="loading"
    :searchable="true"
    label="name"
    track-by="id"
    placeholder="Digite para buscar turmas..."
    @search="debouncedSearch"
  />
</template>

<script>
  import { debounce } from 'lodash'

  export default {
    data() {
      return {
        selectedClass: null,
        classes: [],
        loading: false,
      }
    },

    created() {
      // Criar versão debounced da busca
      this.debouncedSearch = debounce(this.searchClasses, 300)
    },

    methods: {
      async searchClasses(term) {
        if (!term || term.length < 2) {
          this.classes = []
          return
        }

        this.loading = true

        try {
          const response = await this.$http.get('/classes/search', {
            params: { q: term },
          })

          this.classes = response.data
        } catch (error) {
          console.error('Erro ao buscar turmas:', error)
          this.classes = []
        } finally {
          this.loading = false
        }
      },
    },
  }
</script>
```

## 🎨 Customização Visual

### CSS Classes

```scss
.e-select {
  &__trigger {
    // Estilo do elemento clicável
  }

  &__dropdown {
    // Estilo do dropdown
  }

  &__option {
    // Estilo de cada opção

    &--selected {
      // Opção selecionada
    }

    &--highlighted {
      // Opção destacada (hover/teclado)
    }
  }

  &__loading {
    // Indicador de loading
  }

  &__no-options {
    // Mensagem quando não há opções
  }

  // Estados
  &--open {
    // Quando dropdown está aberto
  }

  &--disabled {
    // Quando está desabilitado
  }

  &--invalid {
    // Estado de erro
  }

  &--valid {
    // Estado válido
  }
}
```

### Variantes

```scss
// Variante primária (padrão)
.e-select--primary {
  .e-select__trigger {
    border-color: var(--primary);
  }
}

// Variante de sucesso
.e-select--success {
  .e-select__trigger {
    border-color: var(--success);
  }
}

// Variante de erro
.e-select--danger {
  .e-select__trigger {
    border-color: var(--danger);
  }
}
```

## 📱 Responsividade

O componente é totalmente responsivo e se adapta a diferentes tamanhos de tela:

```scss
.e-select {
  // Desktop
  @media (min-width: 768px) {
    .e-select__dropdown {
      max-width: 400px;
    }
  }

  // Mobile
  @media (max-width: 767px) {
    .e-select__dropdown {
      width: 100vw;
      left: 0 !important;
      max-height: 50vh;
    }
  }
}
```

## ♿ Acessibilidade

O componente implementa as práticas de acessibilidade:

- **ARIA labels**: `aria-label`, `aria-expanded`, `aria-selected`
- **Navegação por teclado**: Arrow keys, Enter, Escape, Tab
- **Screen reader**: Anúncios de estado e seleções
- **Focus management**: Foco visível e lógico

```vue
<!-- Exemplo com acessibilidade -->
<ESelect
  v-model="selected"
  :options="options"
  aria-label="Selecionar disciplina"
  aria-describedby="subject-help"
/>
<div id="subject-help" class="form-text">
  Escolha a disciplina para esta atividade
</div>
```

## 🧪 Testes

### Teste Básico

```javascript
import ESelect from '@/components/selects/ESelect.vue'
import { shallowMount } from '@vue/test-utils'

describe('ESelect', () => {
  const defaultProps = {
    options: [
      { id: 1, name: 'Opção 1' },
      { id: 2, name: 'Opção 2' },
    ],
  }

  it('deve renderizar corretamente', () => {
    const wrapper = shallowMount(ESelect, {
      propsData: defaultProps,
    })

    expect(wrapper.find('.e-select').exists()).toBe(true)
  })

  it('deve exibir placeholder quando nada selecionado', () => {
    const wrapper = shallowMount(ESelect, {
      propsData: {
        ...defaultProps,
        placeholder: 'Teste placeholder',
      },
    })

    expect(wrapper.text()).toContain('Teste placeholder')
  })

  it('deve emitir evento input ao selecionar opção', async () => {
    const wrapper = shallowMount(ESelect, {
      propsData: defaultProps,
    })

    // Abrir dropdown
    await wrapper.find('.e-select__trigger').trigger('click')

    // Selecionar primeira opção
    await wrapper.find('.e-select__option').trigger('click')

    expect(wrapper.emitted('input')).toBeTruthy()
    expect(wrapper.emitted('input')[0][0]).toEqual(defaultProps.options[0])
  })
})
```

## 📋 Propriedades Computadas

O componente utiliza várias propriedades computadas internas:

```javascript
computed: {
  selectedOptions() {
    // Retorna array de opções selecionadas
    if (this.multiple) {
      return Array.isArray(this.value) ? this.value : []
    }
    return this.value ? [this.value] : []
  },

  selectedLength() {
    // Número de opções selecionadas
    return this.selectedOptions.length
  },

  hasNextPage() {
    // Verifica se há próxima página
    return this.paginated && this.page < this.totalPages
  },

  canRemoveOption() {
    // Verifica se pode remover opções
    return this.multiple && this.clearable
  },

  componentClasses() {
    // Classes CSS do componente
    return {
      'e-select--open': this.isOpen,
      'e-select--disabled': this.disabled,
      'e-select--multiple': this.multiple,
      [`e-select--${this.variant}`]: this.variant,
      'e-select--invalid': this.state === false,
      'e-select--valid': this.state === true
    }
  }
}
```

## 🔧 Métodos Públicos

```javascript
methods: {
  // Abrir dropdown
  open() {
    if (!this.disabled) {
      this.isOpen = true
      this.$emit('open')
    }
  },

  // Fechar dropdown
  close() {
    this.isOpen = false
    this.$emit('close')
  },

  // Alternar dropdown
  toggle() {
    this.isOpen ? this.close() : this.open()
  },

  // Limpar seleção
  clear() {
    if (this.clearable) {
      this.$emit('input', this.multiple ? [] : null)
      this.$emit('clear')
    }
  },

  // Focar no input de busca
  focusSearch() {
    this.$nextTick(() => {
      const searchInput = this.$refs.searchInput
      if (searchInput) {
        searchInput.focus()
      }
    })
  }
}
```

---

📚 **Recursos Adicionais**: Este componente é baseado nas melhores práticas de UX/UI e pode ser estendido conforme necessário. Para dúvidas ou sugestões de melhorias, consulte o [Guia de Contribuição](../Contribuicao.md).
:page="currentPage"
:totalPages="totalPages"
paginated
@input="updateSelectedOption"
@nextPage="fetchNextPage" ></PaginatedSelect>

  </div>
</template>

<script>
  import PaginatedSelect from './components/PaginatedSelect.vue'

  export default {
    components: {
      PaginatedSelect,
    },
    data() {
      return {
        selectedOption: null,
        paginatedOptions: [],
        currentPage: 1,
        totalPages: 0,
        isLoading: false,
      }
    },
    methods: {
      updateSelectedOption(value) {
        this.selectedOption = value
      },
      async fetchNextPage({ page }) {
        if (page > this.totalPages) return

        this.isLoading = true
        try {
          // Replace with your actual API call
          const response = await this.fetchOptionsFromApi(page)
          this.paginatedOptions = [...this.paginatedOptions, ...response.data]
          this.totalPages = response.totalPages
        } catch (error) {
          console.error('Error fetching options:', error)
        } finally {
          this.isLoading = false
        }
      },
      async fetchOptionsFromApi(page) {
        // Replace with your actual API call logic.
        // This function should return an object with `data` and `totalPages`.
        // Example response format: { data: [{ id: 1, name: 'Option 1' }, ...], totalPages: 5 }
        // Mocking an API response:
        return new Promise(resolve => {
          setTimeout(() => {
            resolve({
              data: Array.from({ length: 10 }, (_, i) => ({
                id: (page - 1) * 10 + i + 1,
                name: `Option ${(page - 1) * 10 + i + 1}`,
              })),
              totalPages: 5,
            })
          }, 1000)
        })
      },
    },
    mounted() {
      // Initial fetch for the first page
      this.fetchNextPage({ page: this.currentPage })
    },
  }
</script>

```

```
