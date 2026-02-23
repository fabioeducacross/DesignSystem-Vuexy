# Guia de Contribuição

Este documento estabelece as diretrizes para contribuir com o projeto **Educacross Frontend**, incluindo padrões de código, processo de desenvolvimento e boas práticas.

## 🤝 Como Contribuir

### Processo de Contribuição

1. **Fork do Repositório** - Crie uma cópia do projeto em sua conta
2. **Clone Local** - Baixe o fork para sua máquina
3. **Crie uma Branch** - Desenvolva em uma branch específica
4. **Implemente as Mudanças** - Siga os padrões estabelecidos
5. **Teste Suas Mudanças** - Execute todos os testes
6. **Commit e Push** - Envie suas alterações
7. **Abra um Pull Request** - Solicite revisão da equipe

### Primeiros Passos

```bash
# 1. Fork o repositório no GitHub
# 2. Clone seu fork
git clone https://github.com/SEU_USUARIO/educacross-frontend.git
cd educacross-frontend

# 3. Adicione o repositório original como remote
git remote add upstream https://github.com/ORIGINAL_OWNER/educacross-frontend.git

# 4. Instale as dependências
npm install

# 5. Configure hooks de git
npm run prepare

# 6. Execute os testes para verificar se está tudo OK
npm run test:unit
```

## 🌳 Branching Strategy

### Branches Principais

- **`nave-develop`**: Branch principal de desenvolvimento
- **`master`**: Branch de produção
- **`homolog`**: Branch de homologação

### Branches de Trabalho

#### Feature Branches

```bash
# Formato: feature/EC-XXXX-nome-da-feature
git checkout nave-develop
git pull upstream nave-develop
git checkout -b feature/EC-1234-criar-componente-filtro

# Trabalhe na feature...
git add .
git commit -m "feat(filter): adiciona componente de filtro avançado"

# Push para seu fork
git push origin feature/EC-1234-criar-componente-filtro
```

#### Hotfix Branches

```bash
# Formato: hotfix/EC-XXXX-nome-do-hotfix
git checkout master
git pull upstream master
git checkout -b hotfix/EC-5678-corrigir-bug-login

# Implemente a correção...
git add .
git commit -m "fix(auth): corrige erro de validação no login"

# Push para seu fork
git push origin hotfix/EC-5678-corrigir-bug-login
```

#### Bug Fix Branches

```bash
# Formato: bugfix/EC-XXXX-nome-do-bug
git checkout nave-develop
git pull upstream nave-develop
git checkout -b bugfix/EC-9012-corrigir-filtro-missoes

# Corrija o bug...
git add .
git commit -m "fix(missions): corrige filtro de missões por disciplina"
```

## 📝 Convenções de Commit

### Formato de Commit Message

```
tipo(escopo): descrição breve

Descrição mais detalhada explicando o que foi feito e por que.
Quebra de linha para separar do corpo da mensagem.

Closes #123
```

### Tipos de Commit

- **feat**: Nova funcionalidade
- **fix**: Correção de bug
- **docs**: Documentação
- **style**: Formatação (sem mudança de lógica)
- **refactor**: Refatoração de código
- **test**: Adição ou correção de testes
- **chore**: Tarefas de build, ferramentas, etc.
- **perf**: Melhoria de performance
- **ci**: Configuração de CI/CD

### Exemplos de Commits

```bash
# Feature
git commit -m "feat(missions): adiciona criação de missões personalizadas

Implementa funcionalidade completa para professores criarem
suas próprias missões com seleção de atividades customizadas.

- Adiciona formulário de criação
- Implementa validação de campos
- Integra com API de missões
- Adiciona testes unitários

Closes #456"

# Bug Fix
git commit -m "fix(auth): corrige redirecionamento após login

Corrige problema onde usuários não eram redirecionados
corretamente após fazer login com sucesso.

Fixes #789"

# Documentação
git commit -m "docs(readme): atualiza instruções de instalação

Adiciona seção sobre configuração de variáveis de ambiente
e atualiza versões de dependências necessárias."

# Estilo
git commit -m "style(components): aplica formatação prettier

Formata arquivos de componentes seguindo padrões do projeto."

# Refatoração
git commit -m "refactor(store): simplifica módulo de missões

Refatora store de missões para usar Composition API
e reduz complexidade do código.

- Remove código duplicado
- Melhora tipagem
- Adiciona documentação JSDoc"
```

## 🔍 Padrões de Código

### Estrutura de Componentes Vue

```vue
<template>
  <div class="component-name">
    <!-- Template limpo e semântico -->
    <header class="component-name__header">
      <h1>{{ title }}</h1>
    </header>

    <main class="component-name__content">
      <!-- Conteúdo principal -->
    </main>
  </div>
</template>

<script>
  import { defineComponent, ref, computed } from '@vue/composition-api'

  export default defineComponent({
    name: 'ComponentName',

    props: {
      title: {
        type: String,
        required: true,
        validator: value => value.length > 0,
      },
      items: {
        type: Array,
        default: () => [],
      },
    },

    emits: ['item-selected', 'item-removed'],

    setup(props, { emit }) {
      // Refs reativos
      const selectedItem = ref(null)
      const isLoading = ref(false)

      // Computed properties
      const hasItems = computed(() => props.items.length > 0)

      // Methods
      const selectItem = item => {
        selectedItem.value = item
        emit('item-selected', item)
      }

      const removeItem = item => {
        emit('item-removed', item)
      }

      // Lifecycle hooks
      onMounted(() => {
        // Inicialização
      })

      return {
        selectedItem,
        isLoading,
        hasItems,
        selectItem,
        removeItem,
      }
    },
  })
</script>

<style lang="scss" scoped>
  .component-name {
    // Estilos usando BEM methodology

    &__header {
      margin-bottom: 1rem;
    }

    &__content {
      // Estilos do conteúdo
    }

    // Estados
    &--loading {
      opacity: 0.6;
      pointer-events: none;
    }
  }
</style>
```

### Padrões JavaScript

```javascript
// ✅ Bom - Nomenclatura clara
const getUserMissions = async userId => {
  try {
    const response = await api.get(`/users/${userId}/missions`)
    return response.data
  } catch (error) {
    console.error('Erro ao buscar missões:', error)
    throw error
  }
}

// ✅ Bom - Destructuring
const { name, email, role } = user
const { missions, loading, error } = useMissions()

// ✅ Bom - Arrow functions para callbacks
const activeMissions = missions.filter(mission => mission.active)
const missionNames = missions.map(mission => mission.name)

// ✅ Bom - Template literals
const message = `Bem-vindo, ${user.name}! Você tem ${missions.length} missões.`

// ✅ Bom - Spread operator
const updatedMission = { ...mission, status: 'completed' }
const allMissions = [...educacrossMissions, ...customMissions]

// ✅ Bom - Async/await
const createMission = async missionData => {
  const response = await api.post('/missions', missionData)
  return response.data
}
```

### Padrões CSS/SCSS

```scss
// ✅ Bom - BEM methodology
.mission-card {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 1rem;

  &__header {
    border-bottom: 1px solid #eee;
    padding-bottom: 0.5rem;
    margin-bottom: 1rem;
  }

  &__title {
    font-size: 1.25rem;
    font-weight: 600;
    color: var(--primary-color);
  }

  &__content {
    line-height: 1.5;
  }

  &--active {
    border-color: var(--success-color);
    background-color: var(--success-bg);
  }

  &--inactive {
    opacity: 0.6;
  }
}

// ✅ Bom - Variáveis CSS
:root {
  --primary-color: #1976d2;
  --success-color: #4caf50;
  --success-bg: #f1f8e9;
  --border-radius: 8px;
}

// ✅ Bom - Mixins utilitários
@mixin flex-center {
  display: flex;
  align-items: center;
  justify-content: center;
}

@mixin truncate-text {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
```

## 🧪 Testes Obrigatórios

### Para Componentes

```javascript
// Testes mínimos obrigatórios
describe('MeuComponente', () => {
  // ✅ Obrigatório - Renderização básica
  it('deve renderizar sem erros', () => {
    const wrapper = shallowMount(MeuComponente)
    expect(wrapper.exists()).toBe(true)
  })

  // ✅ Obrigatório - Props obrigatórias
  it('deve renderizar com props obrigatórias', () => {
    const wrapper = shallowMount(MeuComponente, {
      propsData: { title: 'Teste' },
    })
    expect(wrapper.find('h1').text()).toBe('Teste')
  })

  // ✅ Obrigatório - Eventos emitidos
  it('deve emitir evento ao clicar', async () => {
    const wrapper = shallowMount(MeuComponente)
    await wrapper.find('button').trigger('click')
    expect(wrapper.emitted('button-clicked')).toBeTruthy()
  })
})
```

### Para Stores

```javascript
// Testes mínimos obrigatórios para stores
describe('MissionsStore', () => {
  // ✅ Obrigatório - Mutations
  it('deve atualizar estado com mutation', () => {
    const state = { missions: [] }
    const missions = [{ id: 1, name: 'Test' }]

    mutations.SET_MISSIONS(state, missions)

    expect(state.missions).toEqual(missions)
  })

  // ✅ Obrigatório - Actions com API
  it('deve fazer chamada de API correta', async () => {
    const commit = jest.fn()
    api.getMissions.mockResolvedValue({ data: [] })

    await actions.fetchMissions({ commit })

    expect(api.getMissions).toHaveBeenCalled()
    expect(commit).toHaveBeenCalledWith('SET_MISSIONS', [])
  })
})
```

## 📋 Checklist de Pull Request

### Antes de Abrir o PR

- [ ] Código segue os padrões estabelecidos
- [ ] Todos os testes passam (`npm run test:unit`)
- [ ] Lint não reporta erros (`npm run lint`)
- [ ] Build de produção funciona (`npm run build`)
- [ ] Documentação foi atualizada (se necessário)
- [ ] Variáveis e funções têm nomes descritivos
- [ ] Commits seguem o padrão estabelecido
- [ ] Branch está atualizada com a branch base

### Template de Pull Request

```markdown
## 📋 Descrição

Breve descrição das mudanças implementadas.

## 🎯 Tipo de Mudança

- [ ] 🐛 Bug fix
- [ ] ✨ Nova feature
- [ ] 💄 Mudanças de UI/UX
- [ ] ♻️ Refatoração
- [ ] 📝 Documentação
- [ ] 🔧 Configuração
- [ ] 🧪 Testes

## 🧪 Testes

- [ ] Testes unitários adicionados/atualizados
- [ ] Testes passam localmente
- [ ] Testado manualmente

## 📸 Screenshots (se aplicável)

<!-- Adicione screenshots das mudanças visuais -->

## 📋 Checklist

- [ ] Código segue os padrões do projeto
- [ ] Self-review do código foi feito
- [ ] Comentários foram adicionados em código complexo
- [ ] Documentação foi atualizada
- [ ] Não há warnings ou errors no console
- [ ] Mudanças foram testadas em diferentes navegadores
- [ ] Funciona corretamente em mobile

## 📚 Referências

- Issue relacionada: #123
- Documentação: [link]
- Design: [link]
```

## 🔍 Code Review

### Como Revisor

1. **Verifique a Funcionalidade**

   - A implementação resolve o problema?
   - Funciona conforme esperado?
   - Não quebra funcionalidades existentes?

2. **Analise o Código**

   - Segue os padrões estabelecidos?
   - É legível e bem documentado?
   - Não há código duplicado?

3. **Avalie a Performance**

   - Há impacto na performance?
   - Lazy loading está sendo usado adequadamente?
   - Não há vazamentos de memória?

4. **Verifique os Testes**
   - Testes adequados foram adicionados?
   - Coverage está adequado?
   - Testes são significativos?

### Feedback Construtivo

````markdown
# ✅ Bom - feedback específico e construtivo

Sugiro extrair essa lógica para um composable separado para
melhor reutilização e testabilidade.

# ✅ Bom - oferece solução

Pode usar `computed` ao invés de `watch` aqui para melhor performance:

```javascript
const filteredItems = computed(() => items.value.filter(item => item.active))
```
````

# ❌ Ruim - feedback vago

Esse código não está bom.

# ❌ Ruim - crítica sem sugestão

Por que fez assim?

````

## 🚀 Deployment e Release

### Processo de Release

1. **Desenvolvimento** → `nave-develop`
2. **Homologação** → `homolog`
3. **Produção** → `master`

### Versionamento

Seguimos [Semantic Versioning](https://semver.org/):

- `MAJOR.MINOR.PATCH` (exemplo: 2.1.4)
- **MAJOR**: Mudanças que quebram compatibilidade
- **MINOR**: Novas funcionalidades (compatível)
- **PATCH**: Correções de bug (compatível)

### Hotfixes

```bash
# Hotfix deve ser aplicado em todas as branches
git checkout master
git pull upstream master
git checkout -b hotfix/EC-1234-critical-fix

# Implemente a correção
git commit -m "fix(auth): corrige vulnerabilidade de segurança"

# Merge para master
git checkout master
git merge hotfix/EC-1234-critical-fix

# Merge para homolog
git checkout homolog
git merge hotfix/EC-1234-critical-fix

# Merge para nave-develop
git checkout nave-develop
git merge hotfix/EC-1234-critical-fix
````

## 📚 Recursos Úteis

### Documentação

- [Vue.js 2 Guide](https://vuejs.org/v2/guide/)
- [Vue Composition API](https://composition-api.vuejs.org/)
- [Vuex Documentation](https://vuex.vuejs.org/)
- [Vue Router Documentation](https://router.vuejs.org/)
- [Bootstrap Vue](https://bootstrap-vue.org/)

### Ferramentas

- [Vue DevTools](https://github.com/vuejs/vue-devtools)
- [ESLint](https://eslint.org/)
- [Prettier](https://prettier.io/)
- [Jest](https://jestjs.io/)

### Padrões e Convenções

- [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript)
- [Vue.js Style Guide](https://vuejs.org/v2/style-guide/)
- [Conventional Commits](https://www.conventionalcommits.org/)

## 🆘 Obtendo Ajuda

### Onde Buscar Ajuda

1. **Documentação do Projeto** - Consulte esta wiki
2. **Issues do GitHub** - Procure por problemas similares
3. **Discussões da Equipe** - Entre em contato com outros desenvolvedores
4. **Code Review** - Peça feedback específico no PR

### Como Fazer Boas Perguntas

````markdown
## ❓ Problema

Descreva claramente o problema que está enfrentando.

## 🔍 O que tentei

Liste o que já tentou fazer para resolver.

## 💻 Código Relevante

```javascript
// Cole o código relevante aqui
```
````

## 🌐 Ambiente

- Node.js: v14.17.0
- npm: 6.14.13
- Browser: Chrome 91.0.4472.124
- OS: macOS Big Sur 11.4

```

## 🎯 Metas da Contribuição

### Qualidade

- **Código Limpo**: Fácil de ler e manter
- **Testes Abrangentes**: Coverage > 80%
- **Performance**: Aplicação rápida e responsiva
- **Acessibilidade**: Seguir padrões WCAG

### Colaboração

- **Comunicação Clara**: Documentação e comentários úteis
- **Feedback Construtivo**: Reviews que ajudam a melhorar
- **Conhecimento Compartilhado**: Ensinar e aprender juntos
- **Respeito Mútuo**: Ambiente inclusivo e acolhedor

---

🙏 **Obrigado por contribuir!** Sua colaboração é fundamental para o sucesso do projeto Educacross. Qualquer contribuição, por menor que seja, é muito valiosa para a comunidade.
```
