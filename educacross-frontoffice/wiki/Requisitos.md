# Requisitos do Sistema

Este documento descreve todos os requisitos necessários para executar o projeto **Educacross Frontend** em ambiente de desenvolvimento e produção.

## 📋 Pré-requisitos

### Node.js e NPM

- **Node.js**: Versão 12.x (recomendado) ou 14.x
- **NPM**: Versão 6.x ou superior (instalado automaticamente com Node.js)
- **Verificação**: Execute `node --version` e `npm --version` para verificar as versões instaladas

### Sistema Operacional

- **Windows**: 8.1 ou superior
- **macOS**: 10.12 ou superior
- **Linux**: Ubuntu 16.04+, CentOS 7+, ou distribuições equivalentes

### Navegadores Suportados

- **Chrome**: 88+ (recomendado)
- **Firefox**: 78+
- **Safari**: 13+
- **Edge**: 88+

## 🛠️ Dependências de Desenvolvimento

### Git

- **Versão**: 2.20 ou superior
- **Configuração**: Nome de usuário e email configurados
- **SSH/HTTPS**: Acesso ao repositório configurado

### Editor de Código (Recomendado)

- **Visual Studio Code** com extensões:
  - Vetur (Vue.js)
  - ESLint
  - Prettier
  - Auto Rename Tag
  - Bracket Pair Colorizer

### Ferramentas Opcionais

- **Docker**: Para desenvolvimento em containers
- **Postman**: Para testes de API
- **Vue DevTools**: Extensão do navegador para debug

## 📦 Dependências do Projeto

### Principais (package.json)

```json
{
  "vue": "2.x",
  "vuex": "3.6.0",
  "vue-router": "^3.6.5",
  "bootstrap-vue": "2.23.0",
  "axios": "^1.7.8",
  "@vue/composition-api": "^1.4.9"
}
```

### Desenvolvimento

```json
{
  "@vue/cli-service": "~4.5.9",
  "jest": "^27.0.5",
  "eslint": "^7.32.0",
  "prettier": "^2.7.1",
  "sass": "1.32.*",
  "tailwindcss": "1.0.1"
}
```

## 🌐 Requisitos de Rede

### APIs Externas

- **API Educacross Manager**: Acesso à API principal do sistema
  - Desenvolvimento: `apieducacrossmanager-test.azurewebsites.net`
  - Produção: `apieducacrossmanager.azurewebsites.net`

### Serviços Microsoft

- **Azure Authentication**: Para login Microsoft
- **Microsoft Graph**: Para integração com Office 365

### CDNs e Recursos Externos

- **Google Fonts**: Para fontes customizadas
- **Material Icons**: Para ícones do sistema
- **Bootstrap CDN**: Para estilos base

## 💾 Requisitos de Armazenamento

### Desenvolvimento

- **Espaço em disco**: Mínimo 2GB livres
- **node_modules**: ~500MB após instalação
- **Cache do navegador**: ~100MB para assets

### Produção (Build)

- **Bundle size**: ~15MB (minificado)
- **Assets estáticos**: ~50MB
- **Docker image**: ~200MB

## 🔐 Requisitos de Segurança

### Variáveis de Ambiente

```bash
VUE_APP_WHITELABEL=educacross
VUE_APP_DEVELOP=false
NODE_ENV=development
```

### Certificados SSL

- **Desenvolvimento**: Certificado auto-assinado (opcional)
- **Produção**: Certificado SSL válido obrigatório

## ⚡ Requisitos de Performance

### Desenvolvimento

- **RAM**: Mínimo 4GB, recomendado 8GB
- **CPU**: 2 cores mínimo, 4 cores recomendado
- **Conexão**: Banda larga para download de dependências

### Produção

- **RAM**: 2GB por instância
- **CPU**: 2 cores por instância
- **Conexão**: 100Mbps para carregamento de assets

## 🐳 Docker (Opcional)

Se preferir usar Docker para desenvolvimento:

```dockerfile
# Versões suportadas
FROM node:14-alpine
FROM node:16-alpine
```

### Docker Compose

- **Docker**: 20.10+
- **Docker Compose**: 1.29+

## 📱 Requisitos Mobile (PWA)

### Dispositivos Suportados

- **iOS**: 12.0+ (Safari)
- **Android**: 8.0+ (Chrome)
- **Resolução**: Mínimo 360x640px

### Funcionalidades PWA

- **Service Worker**: Suportado
- **Push Notifications**: Configurado
- **Offline Mode**: Parcialmente suportado

## 🔧 Configurações Recomendadas

### VS Code Settings

```json
{
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "vetur.format.defaultFormatter.html": "prettier",
  "vetur.format.defaultFormatter.js": "prettier"
}
```

### Git Hooks

- **pre-commit**: ESLint check
- **pre-push**: Testes unitários
- **commit-msg**: Validação de mensagem

## ✅ Verificação de Ambiente

Execute estes comandos para verificar se seu ambiente está configurado corretamente:

```bash
# Verificar versões
node --version  # >= 12.0.0
npm --version   # >= 6.0.0
git --version   # >= 2.20.0

# Testar conectividade
ping apieducacrossmanager-test.azurewebsites.net

# Verificar dependências globais (se instaladas)
vue --version
```

## 🚨 Troubleshooting

### Problemas Comuns

1. **Erro de permissão no npm**: Use `npm config set registry https://registry.npmjs.org/`
2. **Porta ocupada**: Altere a porta no `vue.config.js`
3. **Erro de certificado SSL**: Configure `NODE_TLS_REJECT_UNAUTHORIZED=0` para desenvolvimento

### Limpeza de Cache

```bash
# Limpar cache npm
npm cache clean --force

# Remover node_modules e reinstalar
rm -rf node_modules package-lock.json
npm install
```

---

📝 **Nota**: Mantenha este documento atualizado sempre que houver mudanças nos requisitos do projeto.
