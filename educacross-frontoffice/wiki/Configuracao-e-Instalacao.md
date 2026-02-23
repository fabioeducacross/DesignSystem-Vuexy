# Configuração e Instalação

Este guia fornece instruções detalhadas para configurar e instalar o projeto **Educacross Frontend** em ambiente de desenvolvimento.

## 🚀 Instalação Rápida

### 1. Clonar o Repositório

```bash
git clone <URL_DO_REPOSITORIO>
cd educacross-frontend
```

### 2. Instalar Dependências

```bash
npm install
```

### 3. Configurar Variáveis de Ambiente

```bash
# Copiar arquivo de exemplo
cp .env.example .env

# Editar com suas configurações
VUE_APP_WHITELABEL=educacross
VUE_APP_DEVELOP=true
NODE_ENV=development
```

### 4. Executar o Projeto

```bash
npm run serve
```

O projeto estará disponível em `http://localhost:8080`

## 📋 Instalação Detalhada

### Pré-requisitos

Certifique-se de ter instalado:

- Node.js 12.x ou 14.x
- NPM 6.x ou superior
- Git 2.20+

### Clone e Configuração Inicial

```bash
# 1. Clonar repositório
git clone <URL_DO_REPOSITORIO>
cd educacross-frontend

# 2. Verificar branch principal
git checkout nave-develop

# 3. Instalar dependências
npm install
```

### Configuração de Ambiente

#### Arquivo .env

Crie um arquivo `.env` na raiz do projeto:

```bash
# Configurações de desenvolvimento
NODE_ENV=development
VUE_APP_DEVELOP=true

# White Label (educacross, superensino, seduc)
VUE_APP_WHITELABEL=educacross

# URLs da API
VUE_APP_API_URL=https://apieducacrossmanager-test.azurewebsites.net

# Configurações opcionais
VUE_APP_VERSION=7.0.0
```

#### Configurações por White Label

**Educacross:**

```bash
VUE_APP_WHITELABEL=educacross
```

**Superensino:**

```bash
VUE_APP_WHITELABEL=superensino
```

**SEDUC:**

```bash
VUE_APP_WHITELABEL=seduc
```

## 🔧 Scripts Disponíveis

### Desenvolvimento

```bash
# Executar servidor de desenvolvimento
npm run serve

# Executar com hot-reload
npm run serve -- --hot
```

### Build e Deploy

```bash
# Build para produção
npm run build

# Analisar bundle (opcional)
npm run build -- --analyze
```

### Testes

```bash
# Executar testes unitários
npm run test:unit

# Executar testes com coverage
npm run test:coverage

# Executar testes em modo watch
npm run test:unit -- --watch
```

### Code Quality

```bash
# Executar linting
npm run lint

# Executar linting com correção automática
npm run lint -- --fix

# Formatação de código
npm run pretty
```

## 🐳 Configuração com Docker

### Docker Compose (Desenvolvimento)

```yaml
# docker-compose.yml
version: '3.8'
services:
  app:
    build:
      context: .
      dockerfile: docker/Dockerfile.dev
    ports:
      - '8080:8080'
    volumes:
      - ./src:/app/src
      - ./public:/app/public
    environment:
      - NODE_ENV=development
      - VUE_APP_WHITELABEL=educacross
```

### Executar com Docker

```bash
# Build e executar
docker-compose up --build

# Executar em background
docker-compose up -d

# Parar containers
docker-compose down
```

## 🔐 Processo de Login

### Login para Desenvolvimento

#### Método 1: Via Manager Test

1. Acesse: [https://account-test.educacross.com.br/login](https://account-test.educacross.com.br/login)
2. Faça login com credenciais de teste
3. Acesse o perfil com coroa (administrador geral)
4. Abra DevTools → Application → Local Storage
5. Copie os valores de `token` e `refresh_token`
6. Acesse: `http://localhost:8080/login?accessToken=[TOKEN]&refreshToken=[REFRESH_TOKEN]`

#### Método 2: Configuração Local

```javascript
// src/auth/utils.js
export const devLoginTokens = {
  accessToken: 'seu-token-aqui',
  refreshToken: 'seu-refresh-token-aqui',
}
```

### Perfis de Usuário

#### Administrador Geral

- Acesso completo ao sistema
- Gerenciamento de instituições
- Configurações globais

#### Professor

- Criação de missões
- Relatórios de turma
- Gestão de estudantes

#### Estudante

- Acesso às missões
- Visualização de progresso
- Perfil personalizado

## 🔗 Configuração de APIs

### API Principal

```javascript
// src/libs/axios/index.js
const API_BASE_URL =
  process.env.VUE_APP_API_URL || 'https://apieducacrossmanager-test.azurewebsites.net'
```

### Endpoints Principais

- **Authentication**: `/auth/login`
- **Missions**: `/missions`
- **Students**: `/students`
- **Reports**: `/reports`
- **Classes**: `/classes`

### Headers Necessários

```javascript
{
  'Authorization': `Bearer ${token}`,
  'Content-Type': 'application/json',
  'Accept': 'application/json'
}
```

## 🎨 Configuração de Temas

### White Label

O sistema suporta múltiplas marcas:

```scss
// src/assets/scss/whitelabel/educacross.scss
$primary-color: #1976d2;
$secondary-color: #424242;
$accent-color: #82b1ff;
```

### Customização Visual

1. **Logos**: `public/whiteLabel/[marca]/`
2. **Cores**: `src/assets/scss/whitelabel/[marca].scss`
3. **Fontes**: `src/assets/fonts/`
4. **Ícones**: `src/assets/icons/`

## 📱 Configuração PWA

### Service Worker

```javascript
// vue.config.js
pwa: {
  name: 'Educacross',
  themeColor: '#1976d2',
  msTileColor: '#000000',
  appleMobileWebAppCapable: 'yes',
  appleMobileWebAppStatusBarStyle: 'black',
}
```

### Manifest

```json
{
  "name": "Educacross",
  "short_name": "Educacross",
  "icons": [
    {
      "src": "./img/icons/android-chrome-192x192.png",
      "sizes": "192x192",
      "type": "image/png"
    }
  ],
  "start_url": "./index.html",
  "display": "standalone",
  "background_color": "#000000",
  "theme_color": "#1976d2"
}
```

## 🛠️ Configuração do VS Code

### Extensões Recomendadas

```json
{
  "recommendations": [
    "octref.vetur",
    "dbaeumer.vscode-eslint",
    "esbenp.prettier-vscode",
    "formulahendry.auto-rename-tag",
    "ms-vscode.vscode-typescript-next"
  ]
}
```

### Settings.json

```json
{
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "vetur.format.defaultFormatter.html": "prettier",
  "vetur.format.defaultFormatter.css": "prettier",
  "vetur.format.defaultFormatter.js": "prettier",
  "emmet.includeLanguages": {
    "vue-html": "html"
  }
}
```

## 🔧 Configuração de Hooks Git

### Instalar Husky

```bash
npm install --save-dev husky
npx husky install
```

### Pre-commit Hook

```bash
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

npm run lint
npm run test:unit
```

### Pre-push Hook

```bash
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

npm run build
```

## 🚨 Troubleshooting

### Problemas Comuns

#### Erro: "Cannot resolve module"

```bash
# Limpar cache e reinstalar
rm -rf node_modules package-lock.json
npm cache clean --force
npm install
```

#### Erro: "Port 8080 is already in use"

```bash
# Usar porta diferente
npm run serve -- --port 8081
```

#### Erro: "ESLint configuration error"

```bash
# Verificar arquivo .eslintrc.js
npm run lint -- --fix
```

#### Erro de CORS na API

```javascript
// vue.config.js
devServer: {
  proxy: {
    '/api': {
      target: 'https://apieducacrossmanager-test.azurewebsites.net',
      changeOrigin: true,
      pathRewrite: {
        '^/api': ''
      }
    }
  }
}
```

### Logs e Debugging

#### Habilitar Debug Mode

```bash
DEBUG=* npm run serve
```

#### Vue DevTools

1. Instalar extensão no navegador
2. Abrir DevTools → Vue tab
3. Explorar componentes e Vuex

### Performance

#### Análise de Bundle

```bash
npm run build -- --report
```

#### Lazy Loading

```javascript
// Importação dinâmica de componentes
const MyComponent = () => import('./MyComponent.vue')
```

## ✅ Verificação da Instalação

Execute estes comandos para verificar se tudo está funcionando:

```bash
# 1. Verificar sintaxe
npm run lint

# 2. Executar testes
npm run test:unit

# 3. Build de produção
npm run build

# 4. Verificar servidor de desenvolvimento
npm run serve
```

### Checklist Final

- [ ] Projeto executa em `http://localhost:8080`
- [ ] Login funciona com tokens de teste
- [ ] Build de produção é gerada sem erros
- [ ] Testes unitários passam
- [ ] ESLint não reporta erros
- [ ] Hot-reload funciona durante desenvolvimento

---

🎉 **Parabéns!** Seu ambiente de desenvolvimento está configurado e pronto para uso. Consulte a [Estrutura do Projeto](Estrutura-do-Projeto.md) para entender a organização do código.
