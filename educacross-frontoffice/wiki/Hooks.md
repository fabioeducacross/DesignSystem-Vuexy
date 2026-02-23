# Git Hooks - Configuração e Uso

Este documento explica como configurar e usar Git hooks no projeto **Educacross Frontend** para manter a qualidade do código e automatizar verificações antes de commits e pushes.

## 🎯 O que são Git Hooks

Git hooks são scripts que são executados automaticamente em pontos específicos do fluxo de trabalho Git. Eles permitem automatizar tarefas como:

- Validação de código (linting)
- Execução de testes
- Formatação automática
- Validação de mensagens de commit
- Verificações de segurança

## 🛠️ Configuração Inicial

### Instalação do Husky

O projeto utiliza [Husky](https://typicode.github.io/husky/) para gerenciar os Git hooks de forma moderna e confiável.

```bash
# Instalar Husky (já incluído no package.json)
npm install

# Inicializar Husky
npx husky install

# Configurar Husky para executar automaticamente
npm set-script prepare "husky install"
```

### Estrutura de Hooks

```
.husky/
├── 📄 _/              # Configurações internas do Husky
├── 📄 pre-commit      # Hook executado antes do commit
├── 📄 pre-push        # Hook executado antes do push
├── 📄 commit-msg      # Hook para validar mensagem de commit
└── 📄 post-merge      # Hook executado após merge
```

## 🔍 Pre-commit Hook

O hook `pre-commit` executa verificações antes de cada commit para garantir qualidade do código.

### Configuração Atual

```bash
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

echo "🔍 Executando verificações pré-commit..."

# 1. Executar linting
echo "📋 Verificando lint..."
npm run lint

# Verificar se lint passou
if [ $? -ne 0 ]; then
  echo "❌ Erros de lint encontrados. Commit cancelado."
  echo "💡 Execute 'npm run lint -- --fix' para corrigir automaticamente alguns erros."
  exit 1
fi

# 2. Executar formatação
echo "🎨 Verificando formatação..."
npm run pretty -- --check

# Verificar se formatação está correta
if [ $? -ne 0 ]; then
  echo "❌ Código não está formatado corretamente. Commit cancelado."
  echo "💡 Execute 'npm run pretty' para formatar automaticamente."
  exit 1
fi

# 3. Executar testes unitários (opcional - apenas arquivos modificados)
echo "🧪 Executando testes unitários..."
npm run test:unit -- --passWithNoTests --findRelatedTests

if [ $? -ne 0 ]; then
  echo "❌ Testes falharam. Commit cancelado."
  exit 1
fi

echo "✅ Todas as verificações passaram. Commit autorizado!"
```

### Configuração Personalizada

Para personalizar o hook `pre-commit`, edite o arquivo `.husky/pre-commit`:

```bash
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

# Configurações personalizáveis
SKIP_TESTS=${SKIP_TESTS:-false}
SKIP_LINT=${SKIP_LINT:-false}
VERBOSE=${VERBOSE:-false}

if [ "$VERBOSE" = "true" ]; then
  set -x
fi

echo "🚀 Iniciando verificações pré-commit..."

# Verificar se há arquivos para commit
if git diff --cached --quiet; then
  echo "⚠️  Nenhum arquivo modificado para commit."
  exit 0
fi

# 1. Linting (se não estiver desabilitado)
if [ "$SKIP_LINT" != "true" ]; then
  echo "📋 Executando ESLint..."
  npx lint-staged

  if [ $? -ne 0 ]; then
    echo "❌ Erros de lint encontrados."
    echo "💡 Dicas:"
    echo "  - Execute: npm run lint -- --fix"
    echo "  - Ou pule esta verificação: SKIP_LINT=true git commit"
    exit 1
  fi
fi

# 2. Testes (se não estiver desabilitado)
if [ "$SKIP_TESTS" != "true" ]; then
  echo "🧪 Executando testes relacionados..."
  npm run test:unit -- --passWithNoTests --watchAll=false --coverage=false

  if [ $? -ne 0 ]; then
    echo "❌ Testes falharam."
    echo "💡 Dicas:"
    echo "  - Verifique os testes que falharam"
    echo "  - Ou pule esta verificação: SKIP_TESTS=true git commit"
    exit 1
  fi
fi

echo "✅ Pré-commit: Todas as verificações passaram!"
```

## 🚀 Pre-push Hook

O hook `pre-push` executa verificações mais abrangentes antes de enviar commits para o repositório remoto.

### Configuração Atual

```bash
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

echo "🚀 Executando verificações pré-push..."

# 1. Executar linting completo
echo "📋 Executando lint completo..."
npm run lint

if [ $? -ne 0 ]; then
  echo "❌ Erros de lint encontrados. Push cancelado."
  echo "💡 Execute 'npm run lint -- --fix' para corrigir."
  exit 1
fi

# 2. Executar todos os testes
echo "🧪 Executando suite completa de testes..."
npm run test:unit

if [ $? -ne 0 ]; then
  echo "❌ Testes falharam. Push cancelado."
  echo "💡 Verifique os testes que falharam e corrija antes de fazer push."
  exit 1
fi

# 3. Verificar se build de produção funciona
echo "🔨 Verificando build de produção..."
npm run build

if [ $? -ne 0 ]; then
  echo "❌ Build de produção falhou. Push cancelado."
  echo "💡 Verifique os erros de build e corrija antes de fazer push."
  exit 1
fi

# 4. Limpar arquivos de build (opcional)
echo "🧹 Limpando arquivos de build..."
rm -rf dist/

echo "✅ Pré-push: Todas as verificações passaram!"
```

### Configuração com Bypass

```bash
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

# Verificar se deve pular verificações
if [ "$SKIP_HOOKS" = "true" ] || [ "$NO_VERIFY" = "true" ]; then
  echo "⚠️  Hooks pulados (SKIP_HOOKS=true ou --no-verify usado)"
  exit 0
fi

# Verificar branch protegida
protected_branch='master'
current_branch=$(git symbolic-ref HEAD | sed -e 's,.*/\(.*\),\1,')

if [ "$protected_branch" = "$current_branch" ]; then
  echo "❌ Push direto para branch '$protected_branch' não é permitido."
  echo "💡 Use Pull Request para fazer merge na branch principal."
  exit 1
fi

echo "🚀 Executando verificações pré-push na branch '$current_branch'..."

# Restante das verificações...
```

## 📝 Commit-msg Hook

Valida as mensagens de commit para seguir padrões estabelecidos.

### Configuração

```bash
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

# Arquivo com a mensagem do commit
commit_message_file=$1
commit_message=$(cat $commit_message_file)

echo "📝 Validando mensagem de commit..."

# Regex para validar formato de commit convencional
commit_regex='^(feat|fix|docs|style|refactor|test|chore|perf|ci)(\(.+\))?: .{1,50}'

if echo "$commit_message" | grep -qE "$commit_regex"; then
  echo "✅ Mensagem de commit válida!"
  exit 0
else
  echo "❌ Mensagem de commit inválida!"
  echo ""
  echo "📋 Formato esperado:"
  echo "  tipo(escopo): descrição breve"
  echo ""
  echo "📚 Tipos válidos:"
  echo "  feat     - Nova funcionalidade"
  echo "  fix      - Correção de bug"
  echo "  docs     - Documentação"
  echo "  style    - Formatação"
  echo "  refactor - Refatoração"
  echo "  test     - Testes"
  echo "  chore    - Tarefas auxiliares"
  echo "  perf     - Performance"
  echo "  ci       - CI/CD"
  echo ""
  echo "💡 Exemplo:"
  echo "  feat(missions): adiciona criação de missões personalizadas"
  echo "  fix(auth): corrige erro de validação no login"
  echo ""
  echo "📝 Sua mensagem:"
  echo "  $commit_message"

  exit 1
fi
```

## 🔧 Lint-staged Configuration

Para executar verificações apenas nos arquivos modificados, configure o `lint-staged` no `package.json`:

```json
{
  "lint-staged": {
    "*.{js,vue}": ["eslint --fix", "prettier --write"],
    "*.{css,scss,less}": ["stylelint --fix", "prettier --write"],
    "*.{json,md}": ["prettier --write"]
  }
}
```

## 🚫 Pulando Hooks

### Temporariamente

```bash
# Pular pre-commit
git commit --no-verify -m "WIP: trabalho em progresso"

# Pular pre-push
git push --no-verify

# Pular com variável de ambiente
SKIP_HOOKS=true git commit -m "commit sem verificações"
```

### Permanentemente (não recomendado)

```bash
# Desabilitar hook específico
chmod -x .husky/pre-commit

# Remover hook
rm .husky/pre-commit
```

## 🔍 Troubleshooting

### Problema: Hook não executa

```bash
# Verificar se Husky está instalado
ls -la .git/hooks/

# Reinstalar hooks
npx husky install

# Verificar permissões
chmod +x .husky/pre-commit
```

### Problema: Erro de dependências

```bash
# Reinstalar dependências
rm -rf node_modules package-lock.json
npm install

# Verificar Node.js version
node --version  # Deve ser >= 12
```

### Problema: Testes lentos no pre-commit

```bash
# Executar apenas testes relacionados
npm run test:unit -- --findRelatedTests --passWithNoTests

# Ou configurar para pular testes específicos
SKIP_TESTS=true git commit -m "commit sem testes"
```

## 📊 Monitoramento e Métricas

### Script de Estatísticas

```bash
#!/bin/bash
# .husky/stats.sh

echo "📊 Estatísticas do projeto:"
echo "  Arquivos JS/Vue: $(find src -name '*.js' -o -name '*.vue' | wc -l)"
echo "  Linhas de código: $(find src -name '*.js' -o -name '*.vue' | xargs wc -l | tail -1)"
echo "  Testes: $(find tests -name '*.spec.js' | wc -l)"
echo "  Cobertura atual: $(npm run test:coverage --silent | grep 'All files' | awk '{print $10}')"
```

### Integração com CI/CD

```yaml
# .github/workflows/quality.yml
name: Code Quality
on: [push, pull_request]

jobs:
  quality:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2

      - name: Setup Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '14'

      - name: Install dependencies
        run: npm ci

      - name: Run linting
        run: npm run lint

      - name: Run tests
        run: npm run test:unit

      - name: Check build
        run: npm run build
```

## 🎛️ Configurações Avançadas

### Hook Condicional por Branch

```bash
#!/usr/bin/env sh
# .husky/pre-push

current_branch=$(git rev-parse --abbrev-ref HEAD)

case $current_branch in
  master|main)
    echo "🔒 Branch principal - verificações completas"
    npm run test:unit
    npm run lint
    npm run build
    ;;
  develop|nave-develop)
    echo "🚧 Branch de desenvolvimento - verificações médias"
    npm run lint
    npm run test:unit -- --passWithNoTests
    ;;
  feature/*|bugfix/*)
    echo "🔧 Branch de feature - verificações básicas"
    npm run lint
    ;;
  *)
    echo "ℹ️  Branch pessoal - verificações mínimas"
    ;;
esac
```

### Hook com Notificações

```bash
#!/usr/bin/env sh
# .husky/post-commit

# Notificação de sucesso (macOS)
if command -v osascript > /dev/null; then
  osascript -e 'display notification "Commit realizado com sucesso!" with title "Git Hook"'
fi

# Log de commit
echo "$(date): Commit $(git rev-parse --short HEAD) realizado" >> .git/commits.log
```

## 📋 Checklist de Configuração

### Configuração Inicial

- [ ] Husky instalado (`npm install`)
- [ ] Hooks configurados (`.husky/` directory)
- [ ] Permissões corretas (`chmod +x .husky/*`)
- [ ] Lint-staged configurado (`package.json`)

### Testes dos Hooks

- [ ] Pre-commit funciona (`git commit`)
- [ ] Pre-push funciona (`git push`)
- [ ] Commit-msg valida mensagens
- [ ] Bypass funciona (`--no-verify`)

### Documentação da Equipe

- [ ] README atualizado com instruções
- [ ] Wiki documentada
- [ ] Exemplos de uso fornecidos
- [ ] Troubleshooting documentado

---

🔧 **Próximos Passos**: Consulte [Git e Pull Requests](Commits.md) para entender o fluxo completo de desenvolvimento com Git hooks integrados.
