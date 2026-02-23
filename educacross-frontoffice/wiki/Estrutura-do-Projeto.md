# Estrutura do Projeto

Este documento descreve a organização de arquivos e diretórios do projeto **Educacross Frontend**, explicando o propósito de cada seção e como navegar pela estrutura do código.

## 📁 Visão Geral da Estrutura

```
educacross-frontend/
├── 📁 public/              # Arquivos estáticos públicos
├── 📁 src/                 # Código fonte principal
├── 📁 tests/               # Testes unitários e de integração
├── 📁 wiki/                # Documentação do projeto
├── 📁 docker/              # Configurações Docker
├── 📁 .devcontainer/       # Configuração VS Code Dev Container
├── 📄 package.json         # Dependências e scripts
├── 📄 vue.config.js        # Configuração do Vue CLI
├── 📄 tailwind.config.js   # Configuração do Tailwind CSS
├── 📄 jest.config.js       # Configuração de testes
└── 📄 README.md           # Documentação básica
```

## 📂 Diretório `public/`

Contém arquivos estáticos que são servidos diretamente pelo servidor web.

```
public/
├── 📄 index.html           # Template HTML principal
├── 📄 loader.css          # Estilos do loading inicial
├── 🖼️ educacross.ico      # Favicon Educacross
├── 🖼️ seduc.ico          # Favicon SEDUC
├── 🖼️ superensino.ico    # Favicon Superensino
├── 📁 assets/             # Recursos estáticos
│   ├── 🖼️ bg-bolinhas.svg
│   ├── 🖼️ bg-estrelas.svg
│   └── 📁 profiles/       # Imagens de perfil
└── 📁 whiteLabel/         # Assets por marca
    ├── 📁 educacross/
    └── 📁 superensino/
```

### Propósito

- **index.html**: Template principal da SPA
- **Assets**: Imagens, SVGs e recursos visuais
- **WhiteLabel**: Recursos específicos para cada marca

## 📂 Diretório `src/`

Contém todo o código fonte da aplicação Vue.js.

### Estrutura Principal

```
src/
├── 📄 App.vue             # Componente raiz da aplicação
├── 📄 main.js             # Ponto de entrada da aplicação
├── 📄 eventBus.js         # Event Bus global
├── 📄 global-components.js # Registro de componentes globais
├── 📁 @core/              # Funcionalidades principais (Vuexy)
├── 📁 assets/             # Recursos estáticos
├── 📁 auth/               # Autenticação e autorização
├── 📁 components/         # Componentes Vue reutilizáveis
├── 📁 consts/             # Constantes e enums
├── 📁 filters/            # Filtros Vue globais
├── 📁 layouts/            # Layouts da aplicação
├── 📁 libs/               # Bibliotecas e configurações externas
├── 📁 navigation/         # Configuração de menus
├── 📁 router/             # Configuração de rotas
├── 📁 services/           # Serviços de API
├── 📁 store/              # Gerenciamento de estado (Vuex)
├── 📁 utils/              # Utilitários e helpers
├── 📁 views/              # Páginas/Views da aplicação
└── 📁 whiteLabel/         # Configurações por marca
```

### 📁 `src/@core/` - Core do Vuexy

Funcionalidades base do template Vuexy:

```
@core/
├── 📁 app-config/         # Configurações da aplicação
├── 📁 assets/             # Assets do core
├── 📁 auth/               # Sistema de autenticação
├── 📁 comp-functions/     # Composition API functions
├── 📁 components/         # Componentes base do Vuexy
├── 📁 directives/         # Diretivas Vue personalizadas
├── 📁 layouts/            # Layouts base
├── 📁 libs/               # Bibliotecas do core
├── 📁 mixins/             # Mixins globais
├── 📁 scss/               # Estilos SCSS base
└── 📁 utils/              # Utilitários do core
```

### 📁 `src/components/` - Componentes

Organização dos componentes reutilizáveis:

```
components/
├── 📁 app-collapse/       # Componente de colapso
├── 📁 app-language-selector/ # Seletor de idioma
├── 📁 badge/              # Badges e tags
├── 📁 card/               # Cards personalizados
├── 📁 cells/              # Células de tabela
├── 📁 chart/              # Gráficos e dashboards
├── 📁 descriptors/        # Descritores educacionais
├── 📁 evaluations/        # Componentes de avaliação
├── 📁 filter/             # Filtros avançados
├── 📁 form/               # Formulários e inputs
├── 📁 global/             # Componentes globais
├── 📁 missions/           # Componentes de missões
├── 📁 modal/              # Modais e dialogs
├── 📁 NPS/                # Net Promoter Score
├── 📁 PDFs/               # Geração de PDFs
├── 📁 proficiency/        # Proficiência educacional
├── 📁 question/           # Questões e respostas
├── 📁 selects/            # Seletores customizados
├── 📁 student-evidence-report/ # Relatórios de evidência
├── 📁 subjects/           # Disciplinas
├── 📁 table/              # Tabelas avançadas
└── 📁 teacher/            # Componentes específicos do professor
```

### 📁 `src/consts/` - Constantes

```
consts/
├── 📄 accessRoleEnum.js      # Roles de acesso
├── 📄 activityType.js        # Tipos de atividade
├── 📄 appLanguagesEnum.js    # Idiomas suportados
├── 📄 EApplicationUserStatus.js # Status de usuário
├── 📄 EQuestionType.js       # Tipos de questão
├── 📄 evaluationsEnum.js     # Enums de avaliação
├── 📄 eventsEnum.js          # Eventos do sistema
├── 📄 missionsEnum.js        # Tipos de missão
├── 📄 permissions.js         # Permissões de acesso
└── 📄 menuColors.js          # Cores dos menus
```

### 📁 `src/views/` - Páginas

Estrutura das páginas por contexto:

```
views/
├── 📁 pages/
│   ├── 📁 admin-context/        # Páginas do administrador
│   │   ├── 📁 analytics/        # Analytics e métricas
│   │   ├── 📁 institutions/     # Gestão de instituições
│   │   ├── 📁 reports/          # Relatórios administrativos
│   │   └── 📁 users/           # Gestão de usuários
│   │
│   ├── 📁 teacher-context/      # Páginas do professor
│   │   ├── 📁 analytics/        # Dashboards do professor
│   │   ├── 📁 classes/          # Gestão de turmas
│   │   ├── 📁 missions/         # Criação de missões
│   │   ├── 📁 records/          # Registros e históricos
│   │   ├── 📁 reports/          # Relatórios pedagógicos
│   │   └── 📁 students/         # Gestão de estudantes
│   │
│   ├── 📁 student-context/      # Páginas do estudante
│   │   ├── 📁 dashboard/        # Dashboard do estudante
│   │   ├── 📁 missions/         # Missões disponíveis
│   │   ├── 📁 profile/          # Perfil do estudante
│   │   └── 📄 StudentHome.vue   # Home do estudante
│   │
│   └── 📁 authentication/       # Páginas de autenticação
│       ├── 📄 Login.vue
│       ├── 📄 ForgotPassword.vue
│       └── 📄 ResetPassword.vue
│
└── 📁 apps/                     # Aplicações específicas
    ├── 📁 education-system/     # Sistema educacional
    └── 📁 family/              # Contexto familiar
```

### 📁 `src/store/` - Vuex Store

Gerenciamento de estado da aplicação:

```
store/
├── 📄 index.js                  # Store principal
├── 📁 modules/                  # Módulos Vuex
│   ├── 📄 auth.js              # Autenticação
│   ├── 📄 user.js              # Dados do usuário
│   ├── 📄 classes.js           # Turmas
│   ├── 📄 missions.js          # Missões
│   ├── 📄 students.js          # Estudantes
│   └── 📄 reports.js           # Relatórios
├── 📁 pageModules/             # Módulos específicos de páginas
│   ├── 📁 missions/
│   ├── 📁 analytics/
│   └── 📁 reports/
└── 📁 filters/                 # Filtros globais
    └── 📄 useFilters.js
```

### 📁 `src/router/` - Roteamento

```
router/
├── 📄 index.js                 # Configuração principal do router
├── 📄 admin-routes.js          # Rotas do administrador
├── 📄 auth-routes.js           # Rotas de autenticação
├── 📄 professor-routes.js      # Rotas do professor
├── 📄 student-routes.js        # Rotas do estudante
├── 📄 layoutFull-routes.js     # Rotas com layout completo
└── 📄 education-system-routes.js # Rotas do sistema educacional
```

### 📁 `src/services/` - Serviços de API

```
services/
├── 📄 api.js                   # Cliente API base
├── 📄 auth.js                  # Serviços de autenticação
├── 📄 missions.js              # API de missões
├── 📄 students.js              # API de estudantes
├── 📄 classes.js               # API de turmas
├── 📄 reports.js               # API de relatórios
├── 📄 analytics.js             # API de analytics
└── 📄 institutions.js          # API de instituições
```

### 📁 `src/whiteLabel/` - Multi-tenant

```
whiteLabel/
├── 📄 config.js                # Configurações por marca
├── 📁 educacross/              # Configurações Educacross
├── 📁 superensino/             # Configurações Superensino
└── 📁 seduc/                   # Configurações SEDUC
```

## ⚙️ Arquivos de Configuração

### `vue.config.js`

Configuração principal do Vue CLI:

```javascript
module.exports = {
  publicPath: '/',
  css: {
    loaderOptions: {
      sass: {
        additionalData: `@import "./src/assets/scss/whitelabel/${process.env.VUE_APP_WHITELABEL.toLowerCase()}.scss";`,
      },
    },
  },
  configureWebpack: {
    resolve: {
      alias: {
        '@themeConfig': path.resolve(__dirname, 'themeConfig.js'),
        '@core': path.resolve(__dirname, 'src/@core'),
        '@validations': path.resolve(__dirname, 'src/@core/utils/validations/validations.js'),
        '@axios': path.resolve(__dirname, 'src/libs/axios'),
        '@components': path.resolve(__dirname, 'src/layouts/components'),
      },
    },
  },
}
```

### `tailwind.config.js`

Configuração do Tailwind CSS:

```javascript
module.exports = {
  purge: ['./src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#1976d2',
        secondary: '#424242',
      },
    },
  },
}
```

### `package.json`

Scripts e dependências principais:

```json
{
  "scripts": {
    "serve": "vue-cli-service serve",
    "build": "vue-cli-service build",
    "test:unit": "TZ=UTC vue-cli-service test:unit",
    "test:coverage": "TZ=UTC vue-cli-service test:unit --coverage",
    "lint": "vue-cli-service lint",
    "pretty": "prettier --write \"./**/*.{vue,json,scss,css}\""
  }
}
```

## 🐳 Docker

Configurações de containerização:

```
docker/
├── 📄 Dockerfile.dev           # Desenvolvimento
├── 📄 Dockerfile.prod          # Produção
├── 📄 Dockerfile.hmg           # Homologação
├── 📄 Dockerfile.seduc.prod    # Produção SEDUC
├── 📄 Dockerfile.superensino.hmg # Homologação Superensino
├── 📄 Dockerfile.superensino.prod # Produção Superensino
└── 📄 Dockerfile.test          # Testes
```

## 📝 Convenções de Nomenclatura

### Arquivos e Diretórios

- **Componentes**: PascalCase (`MyComponent.vue`)
- **Páginas/Views**: PascalCase (`StudentDashboard.vue`)
- **Serviços**: camelCase (`authService.js`)
- **Utilitários**: camelCase (`dateUtils.js`)
- **Constantes**: camelCase (`permissions.js`)
- **Diretórios**: kebab-case (`student-context/`)

### Código

- **Variáveis**: camelCase (`userName`)
- **Constantes**: UPPER_SNAKE_CASE (`API_BASE_URL`)
- **Funções**: camelCase (`getUserData()`)
- **Classes**: PascalCase (`UserService`)

## 🔄 Fluxo de Dados

### Hierarquia de Componentes

```
App.vue
├── Layout (Admin/Teacher/Student)
│   ├── Navbar
│   ├── Sidebar
│   └── Content
│       ├── Page Components
│       └── Feature Components
│           └── Base Components
```

### Estado Global (Vuex)

```
Store
├── Auth Module      # Autenticação e usuário
├── Classes Module   # Turmas e estudantes
├── Missions Module  # Missões e atividades
└── Reports Module   # Relatórios e analytics
```

## 🧩 Padrões de Desenvolvimento

### Estrutura de Componente Vue

```vue
<template>
  <!-- Template HTML -->
</template>

<script>
  import { defineComponent } from '@vue/composition-api'

  export default defineComponent({
    name: 'ComponentName',
    props: {
      // Props do componente
    },
    setup(props, { emit }) {
      // Composition API logic
      return {
        // Reactive refs e methods
      }
    },
  })
</script>

<style lang="scss" scoped>
  /* Estilos do componente */
</style>
```

### Estrutura de Página

```vue
<template>
  <div class="page-container">
    <FilterComponent />
    <ContentComponent />
    <ModalComponent />
  </div>
</template>

<script>
  import ContentComponent from '@/components/content/ContentComponent.vue'
  import FilterComponent from '@/components/filter/FilterComponent.vue'
  import ModalComponent from '@/components/modal/ModalComponent.vue'

  export default {
    name: 'PageName',
    components: {
      FilterComponent,
      ContentComponent,
      ModalComponent,
    },
    // ... lógica da página
  }
</script>
```

## 📱 Responsividade

### Breakpoints Utilizados

- **xs**: < 576px (Extra small)
- **sm**: ≥ 576px (Small)
- **md**: ≥ 768px (Medium)
- **lg**: ≥ 992px (Large)
- **xl**: ≥ 1200px (Extra large)

### Classes Utility

```scss
// Bootstrap + Tailwind
.d-none.d-md-block    // Oculto em mobile, visível em desktop
.col-12.col-lg-6      // Full width mobile, meio desktop
.text-center.text-lg-left // Centralizado mobile, esquerda desktop
```

---

📚 **Próximos Passos**: Consulte [Gerenciamento de Estado](Gerenciamento-de-Estado-e-Fluxo-de-Dados.md) para entender como os dados fluem pela aplicação.
