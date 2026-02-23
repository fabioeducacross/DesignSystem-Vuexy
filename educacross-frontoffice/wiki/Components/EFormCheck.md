# Componente EFormCheck

Documentação do componente `EFormCheck` - um checkbox customizado com estados avançados e design moderno.

## 📋 Visão Geral

O `EFormCheck` é um componente de checkbox personalizado que oferece:

- ✅ **Estados múltiplos** (marcado, desmarcado, indeterminado)
- 🎨 **Design moderno** com ícones Material Symbols
- 🔒 **Estado desabilitado** com feedback visual
- 🎯 **Facilidade de uso** com v-model
- 🎨 **Customização** de cores e classes
- ♿ **Acessibilidade** nativa

## 🚀 Como Usar

### Importação

```javascript
import EFormCheck from '@/components/form/EFormCheck.vue'

export default {
  components: {
    EFormCheck,
  },
}
```

### Uso Básico

```vue
<template>
  <div>
    <!-- Checkbox simples -->
    <EFormCheck
      :checked="isAgreed"
      label="Aceito os termos e condições"
      @update:checked="isAgreed = $event"
    />

    <!-- Com v-model simulado -->
    <EFormCheck
      :checked="notifications"
      label="Receber notificações por email"
      @update:checked="notifications = $event"
    />
  </div>
</template>

<script>
  export default {
    data() {
      return {
        isAgreed: false,
        notifications: true,
      }
    },
  }
</script>
```

## ⚙️ Props

### Props Principais

| Prop            | Tipo      | Padrão  | Descrição                               |
| --------------- | --------- | ------- | --------------------------------------- |
| `checked`       | `Boolean` | `false` | Estado do checkbox (marcado/desmarcado) |
| `indeterminate` | `Boolean` | `false` | Estado indeterminado do checkbox        |
| `disabled`      | `Boolean` | `false` | Desabilita o checkbox                   |
| `label`         | `String`  | `''`    | Texto do rótulo do checkbox             |

### Props de Customização

| Prop                 | Tipo     | Padrão        | Descrição                            |
| -------------------- | -------- | ------------- | ------------------------------------ |
| `indeterminateClass` | `String` | `'text-gray'` | Classe CSS para estado indeterminado |

## 📤 Eventos

| Evento                 | Payload                  | Descrição                                  |
| ---------------------- | ------------------------ | ------------------------------------------ |
| `update:checked`       | `checked: Boolean`       | Emitido quando o estado checked muda       |
| `update:indeterminate` | `indeterminate: Boolean` | Emitido quando o estado indeterminate muda |

## 🎯 Estados do Componente

### Estados Visuais

1. **Desmarcado** (`checked: false`)

   - Ícone: `check_box_outline_blank`
   - Cor: padrão (sem classe especial)

2. **Marcado** (`checked: true`)

   - Ícone: `check_box`
   - Cor: `text-primary`

3. **Indeterminado** (`indeterminate: true`)

   - Ícone: `indeterminate_check_box`
   - Cor: configurável via `indeterminateClass`

4. **Desabilitado** (`disabled: true`)
   - Cursor: `not-allowed`
   - Cor: `--secondary`

## 💡 Exemplos Práticos

### Checkbox com Ações

```vue
<template>
  <div>
    <EFormCheck
      :checked="termsAccepted"
      label="Li e aceito os termos de uso"
      @update:checked="handleTermsChange"
    />

    <b-button :disabled="!termsAccepted" variant="primary" class="mt-3" @click="submitForm">
      Criar Conta
    </b-button>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        termsAccepted: false,
      }
    },
    methods: {
      handleTermsChange(checked) {
        this.termsAccepted = checked
        if (checked) {
          this.$toast.info('Termos aceitos!')
        }
      },
      submitForm() {
        if (this.termsAccepted) {
          // Lógica de submissão
          console.log('Formulário enviado!')
        }
      },
    },
  }
</script>
```

### Lista de Permissões

```vue
<template>
  <div>
    <h5>Permissões do Usuário</h5>

    <div class="mt-3">
      <EFormCheck
        v-for="permission in permissions"
        :key="permission.id"
        :checked="permission.granted"
        :label="permission.name"
        :disabled="permission.locked"
        class="mb-2"
        @update:checked="updatePermission(permission.id, $event)"
      />
    </div>

    <div class="mt-3 pt-3 border-top">
      <EFormCheck
        :checked="allSelected"
        :indeterminate="someSelected"
        label="Selecionar todas as permissões"
        @update:checked="toggleAllPermissions"
      />
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        permissions: [
          { id: 1, name: 'Visualizar relatórios', granted: false, locked: false },
          { id: 2, name: 'Editar estudantes', granted: true, locked: false },
          { id: 3, name: 'Gerenciar sistema', granted: false, locked: true },
          { id: 4, name: 'Exportar dados', granted: false, locked: false },
        ],
      }
    },
    computed: {
      editablePermissions() {
        return this.permissions.filter(p => !p.locked)
      },
      grantedEditablePermissions() {
        return this.editablePermissions.filter(p => p.granted)
      },
      allSelected() {
        return (
          this.editablePermissions.length > 0 &&
          this.grantedEditablePermissions.length === this.editablePermissions.length
        )
      },
      someSelected() {
        const granted = this.grantedEditablePermissions.length
        return granted > 0 && granted < this.editablePermissions.length
      },
    },
    methods: {
      updatePermission(id, granted) {
        const permission = this.permissions.find(p => p.id === id)
        if (permission && !permission.locked) {
          permission.granted = granted
        }
      },
      toggleAllPermissions(selectAll) {
        this.editablePermissions.forEach(permission => {
          permission.granted = selectAll
        })
      },
    },
  }
</script>
```

### Formulário de Configurações

```vue
<template>
  <b-card title="Configurações de Notificações">
    <div class="space-y-3">
      <EFormCheck
        :checked="settings.emailNotifications"
        label="Notificações por email"
        @update:checked="updateSetting('emailNotifications', $event)"
      />

      <EFormCheck
        :checked="settings.pushNotifications"
        :disabled="!settings.emailNotifications"
        label="Notificações push (requer email habilitado)"
        @update:checked="updateSetting('pushNotifications', $event)"
      />

      <EFormCheck
        :checked="settings.weeklyReports"
        label="Relatórios semanais"
        @update:checked="updateSetting('weeklyReports', $event)"
      />

      <EFormCheck
        :checked="settings.marketingEmails"
        label="Emails promocionais"
        indeterminate-class="text-warning"
        @update:checked="updateSetting('marketingEmails', $event)"
      />
    </div>

    <template #footer>
      <b-button variant="primary" @click="saveSettings"> Salvar Configurações </b-button>
      <b-button variant="outline-secondary" @click="resetSettings"> Restaurar Padrões </b-button>
    </template>
  </b-card>
</template>

<script>
  export default {
    data() {
      return {
        settings: {
          emailNotifications: true,
          pushNotifications: false,
          weeklyReports: true,
          marketingEmails: false,
        },
        originalSettings: {},
      }
    },

    mounted() {
      this.originalSettings = { ...this.settings }
    },

    watch: {
      'settings.emailNotifications'(enabled) {
        if (!enabled) {
          this.settings.pushNotifications = false
        }
      },
    },

    methods: {
      updateSetting(key, value) {
        this.settings[key] = value
      },

      async saveSettings() {
        try {
          // Simular chamada API
          await this.$api.post('/user/settings', this.settings)
          this.$toast.success('Configurações salvas!')
          this.originalSettings = { ...this.settings }
        } catch (error) {
          this.$toast.error('Erro ao salvar configurações')
        }
      },

      resetSettings() {
        this.settings = { ...this.originalSettings }
      },
    },
  }
</script>

<style scoped>
  .space-y-3 > * + * {
    margin-top: 1rem;
  }
</style>
```

### Checkbox em Tabelas

```vue
<template>
  <div>
    <b-table :items="students" :fields="fields">
      <!-- Checkbox no cabeçalho para selecionar todos -->
      <template #head(selected)>
        <EFormCheck
          :checked="allSelected"
          :indeterminate="someSelected"
          @update:checked="toggleAllStudents"
        />
      </template>

      <!-- Checkbox em cada linha -->
      <template #cell(selected)="{ item }">
        <EFormCheck
          :checked="selectedStudents.includes(item.id)"
          @update:checked="toggleStudent(item.id, $event)"
        />
      </template>

      <template #cell(name)="{ item }">
        {{ item.name }}
      </template>

      <template #cell(grade)="{ item }">
        {{ item.grade }}
      </template>
    </b-table>

    <div v-if="selectedStudents.length" class="mt-3">
      <b-alert variant="info" show>
        {{ selectedStudents.length }} estudante(s) selecionado(s)
        <b-button size="sm" variant="outline-primary" class="ml-2" @click="processSelected">
          Processar Selecionados
        </b-button>
      </b-alert>
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
        fields: [
          { key: 'selected', label: '', tdClass: 'text-center', thClass: 'text-center' },
          { key: 'name', label: 'Nome' },
          { key: 'grade', label: 'Turma' },
        ],
      }
    },
    computed: {
      allSelected() {
        return this.students.length > 0 && this.selectedStudents.length === this.students.length
      },
      someSelected() {
        return (
          this.selectedStudents.length > 0 && this.selectedStudents.length < this.students.length
        )
      },
    },
    methods: {
      toggleStudent(studentId, selected) {
        if (selected) {
          if (!this.selectedStudents.includes(studentId)) {
            this.selectedStudents.push(studentId)
          }
        } else {
          this.selectedStudents = this.selectedStudents.filter(id => id !== studentId)
        }
      },
      toggleAllStudents(selectAll) {
        if (selectAll) {
          this.selectedStudents = this.students.map(s => s.id)
        } else {
          this.selectedStudents = []
        }
      },
      processSelected() {
        const selected = this.students.filter(s => this.selectedStudents.includes(s.id))
        console.log('Processando estudantes:', selected)
        this.$toast.success(`${selected.length} estudantes processados!`)
      },
    },
  }
</script>
```

## 🎨 Customização Visual

### Classes CSS Personalizadas

```vue
<template>
  <div>
    <!-- Checkbox com classe customizada para estado indeterminado -->
    <EFormCheck
      :checked="partialSelection"
      :indeterminate="hasPartialSelection"
      indeterminate-class="text-warning"
      label="Seleção parcial (amarelo)"
    />

    <!-- Checkbox com estilos customizados -->
    <EFormCheck
      :checked="important"
      label="Item importante"
      class="important-checkbox"
    />
  </div>
</template>

<style scoped>
.important-checkbox {
  padding: 0.5rem;
  border-radius: 0.25rem;
  background-color: var(--bs-light);
}

.important-checkbox:hover {
  background-color: var(--bs-primary-bg-subtle);
}

/* Customizar o tamanho do ícone */
.important-checkbox :deep(.material-symbols-outlined) {
  font-size: 28px;
}
</style>
```

### Variantes de Cores

```vue
<template>
  <div class="d-flex flex-column gap-2">
    <EFormCheck
      :checked="option1"
      label="Opção Primária"
      class="text-primary"
      @update:checked="option1 = $event"
    />

    <EFormCheck
      :checked="option2"
      label="Opção de Sucesso"
      class="text-success"
      @update:checked="option2 = $event"
    />

    <EFormCheck
      :checked="option3"
      label="Opção de Aviso"
      class="text-warning"
      indeterminate-class="text-warning"
      @update:checked="option3 = $event"
    />

    <EFormCheck
      :checked="option4"
      label="Opção de Perigo"
      class="text-danger"
      @update:checked="option4 = $event"
    />
  </div>
</template>
```

## ♿ Acessibilidade

O componente `EFormCheck` implementa as melhores práticas de acessibilidade:

- ✅ **Navegação por teclado** - Use Tab para navegar e Space para alternar
- ✅ **Screen readers** - Suporte nativo para leitores de tela
- ✅ **Estados visuais** - Indicadores claros para todos os estados
- ✅ **Foco visual** - Indicação clara quando o elemento tem foco

### Melhorias de Acessibilidade

```vue
<template>
  <div>
    <!-- Adicionar IDs e aria-labels para melhor acessibilidade -->
    <EFormCheck
      :checked="newsletter"
      label="Receber newsletter semanal"
      aria-describedby="newsletter-help"
      @update:checked="newsletter = $event"
    />
    <small id="newsletter-help" class="form-text text-muted">
      Você receberá um email por semana com as últimas novidades.
    </small>
  </div>
</template>
```

## ⚠️ Considerações Importantes

1. **Estado Indeterminado**: Use apenas quando apropriado (seleções parciais em listas)
2. **Rótulos**: Sempre forneça rótulos descritivos para melhor UX
3. **Eventos**: Use os eventos `update:checked` e `update:indeterminate` corretamente
4. **Performance**: O componente é leve, mas evite criar centenas de instâncias desnecessárias
5. **Styling**: Mantenha consistência visual com o design system do projeto

## 🔗 Componentes Relacionados

- [`ESelect`](./ESelect.md) - Para seleções de opções em dropdown
- [`ListTableSelect`](./ListTableSelect.md) - Para seleção em tabelas
- Componentes de formulário do Bootstrap Vue (b-form-checkbox)
