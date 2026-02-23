# Sistema de Cores Whitelabel - Documentação Completa

## 📋 Índice

1. [Visão Geral](#visão-geral)
2. [Referência Rápida](#referência-rápida)
3. [Arquitetura do Sistema](#arquitetura-do-sistema)
4. [Como Funciona](#como-funciona)
5. [Cores Disponíveis](#cores-disponíveis)
6. [Guia de Uso](#guia-de-uso)
7. [Página de Desenvolvimento](#página-de-desenvolvimento)
8. [Resolução de Problemas](#resolução-de-problemas)
9. [Histórico de Implementação](#histórico-de-implementação)

---

## Visão Geral

O Sistema de Cores Whitelabel permite configurar diferentes esquemas de cores para cada marca (educacross, superensino, seduc, somosplay). O sistema utiliza uma abordagem dupla: **geração em tempo de build** para compatibilidade com SCSS/Bootstrap e **propriedades CSS customizadas** para acesso dinâmico via JavaScript.

### ✨ Benefícios

- ✅ **Fonte Única de Verdade**: Todas as cores em um único arquivo de configuração
- ✅ **Compatível com Bootstrap**: Funções SCSS (`darken()`, `lighten()`, etc.) funcionam perfeitamente
- ✅ **Flexível em Runtime**: JavaScript pode acessar cores dinamicamente
- ✅ **Fácil Manutenção**: Mudanças de cores em um único lugar
- ✅ **Tipagem Segura**: Acesso a cores com funções auxiliares
- ✅ **Pronto para Produção**: Validação em tempo de compilação

---

## Referência Rápida

### 🚀 Como Alterar Cores

1. **Edite o arquivo de configuração** (ÚNICA FONTE):
   ```bash
   src/consts/whitelabelColors.config.js
   ```

2. **Encontre seu whitelabel** e atualize os valores:
   ```javascript
   superensino: {
     primary: '#0089ca',     // Altere aqui
     secondary: '#b4b7bd',
     // ... outras cores
   }
   ```

3. **Reinicie o servidor**:
   ```bash
   npm run serve
   ```

### 🔄 Como Alternar Entre Whitelabels

1. Edite o arquivo `.env`:
   ```bash
   VUE_APP_WHITELABEL=superensino
   ```

2. Reinicie o servidor:
   ```bash
   npm run serve
   ```

### 📝 Comandos Úteis

```bash
# Iniciar servidor de desenvolvimento (gera cores automaticamente)
npm run serve

# Build para produção (gera cores automaticamente)
npm run build

# Gerar cores manualmente (se necessário)
node ./scripts/generate-whitelabel-colors.js

# Verificar whitelabel atual
cat .env | grep WHITELABEL

# Acessar página de desenvolvimento de cores
# http://localhost:8080/dev/color-palette
```

---

## Arquitetura do Sistema

### 📂 Estrutura de Arquivos

```
educacross-frontoffice/
├── scripts/
│   └── generate-whitelabel-colors.js    ← Gera overrides SCSS
├── src/
│   ├── consts/
│   │   ├── whitelabelColors.config.js   ← ⭐ FONTE ÚNICA DE VERDADE
│   │   └── whitelabelColors.js          ← Wrapper ES6 (não editar cores)
│   ├── utils/
│   │   └── whitelabelColorLoader.js     ← Carregador CSS vars runtime
│   ├── assets/scss/variables/
│   │   ├── _variables.scss              ← Importa whitelabel PRIMEIRO
│   │   └── _whitelabel-colors.scss      ← Gerado (em .gitignore)
│   ├── views/dev/
│   │   └── ColorPalette.vue             ← Página dev de cores
│   ├── router/
│   │   └── dev-routes.js                ← Rotas de desenvolvimento
│   └── App.vue                          ← Carrega CSS vars runtime
├── .gitignore                           ← Exclui arquivo gerado
└── package.json                         ← Scripts prestart/prebuild
```

### 🔄 Fluxo de Dados

```
whitelabelColors.config.js (FONTE ÚNICA)
    ↓                           ↓
    ↓                           ↓
Script Node.js              Componentes Vue
(build-time)                (runtime)
    ↓                           ↓
generate-whitelabel-        whitelabelColors.js
colors.js                   (wrapper ES6)
    ↓                           ↓
_whitelabel-colors.scss     whitelabelColorLoader.js
    ↓                           ↓
Bootstrap SCSS              Propriedades CSS Customizadas
```

---

## Como Funciona

### Fase 1: Build Time (SCSS)

```
1. npm run serve/build
2. → Script prestart/prebuild executa
3. → generate-whitelabel-colors.js lê VUE_APP_WHITELABEL do .env
4. → Gera _whitelabel-colors.scss:
     $primary: #0089ca;
     $secondary: #b4b7bd;
     // etc...
5. → Compilador SCSS executa
6. → _variables.scss importa _whitelabel-colors.scss PRIMEIRO (linha 7)
7. → Sobrescreve valores padrão (marcados com !default)
8. → Bootstrap compila com cores do whitelabel
9. → Todos os componentes usam cores corretas ✅
```

### Fase 2: Runtime (CSS Custom Properties)

```
1. App.vue carrega
2. → loadWhitelabelColors() executa
3. → Define propriedades CSS customizadas no :root:
     --whitelabel-primary: #0089ca
     --whitelabel-secondary: #b4b7bd
     // etc...
4. → JavaScript pode acessar cores dinamicamente ✅
```

### Por Que Esta Abordagem?

**Problema Original**: Variáveis SCSS com `var()` não funcionavam porque:
- Funções SCSS (`darken()`, `lighten()`) precisam de valores literais em tempo de compilação
- CSS `var()` é resolvido em runtime, não em compile-time
- SCSS estendido do Bootstrap não conseguia processar as variáveis

**Solução**: Duas fases complementares:
1. **Build-time**: Gera SCSS estático com valores reais
2. **Runtime**: Define CSS custom properties para JavaScript

---

## Cores Disponíveis

### Categorias de Cores

Cada whitelabel possui ~40 cores configuráveis organizadas em 4 categorias:

#### 1. Bootstrap & Cores de Tema (6 cores)

| Variável | Uso | Padrão |
|----------|-----|--------|
| `primary` | Cor principal da marca (botões, links) | - |
| `secondary` | Cor secundária de destaque | - |
| `success` | Estados de sucesso | #28c76f |
| `danger` | Estados de erro | #ea5455 |
| `warning` | Estados de aviso | #ffd643 |
| `dark` | Cor do tema escuro | - |

#### 2. Cores de Disciplinas (4 cores)

| Variável | Disciplina | Uso |
|----------|-----------|-----|
| `math` | Matemática | Identificação de conteúdo matemático |
| `port` | Português | Identificação de conteúdo de linguagem |
| `liga` | Liga | Competições e desafios |
| `mathIng` | Math English | Matemática em inglês |

#### 3. Padrões de Cores Customizadas (19 cores)

Sistema legado usado em vários componentes:
- `colorOne` até `colorNineteen`

#### 4. Cores Adicionais de UI (11 cores)

Cores especializadas para casos específicos:
- `colorGreen60`, `colorGray40`, `colorPurpleLdc`, etc.

### Cores Por Whitelabel

#### educacross
```javascript
{
  primary: '#6e63e8',    // Roxo
  secondary: '#b4b7bd',
  math: '#00bdb8',       // Turquesa
  port: '#ec6300',       // Laranja
  // ...
}
```

#### superensino
```javascript
{
  primary: '#0089ca',    // Azul
  secondary: '#b4b7bd',
  math: '#0089ca',       // Azul
  port: '#ec6300',       // Laranja
  // ...
}
```

#### seduc (Hora da Matemática)
```javascript
{
  primary: '#00bdb8',    // Turquesa
  secondary: '#b4b7bd',
  math: '#00bdb8',       // Turquesa
  port: '#ec6300',       // Laranja
  // ...
}
```

#### somosplay
```javascript
{
  primary: '#6e63e8',    // Roxo (igual educacross)
  secondary: '#b4b7bd',
  math: '#00bdb8',       // Turquesa
  port: '#ec6300',       // Laranja
  // ...
}
```

---

## Guia de Uso

### 📝 Em Arquivos SCSS

```scss
.my-button {
  background: $primary;  // Usa cor do whitelabel
  border: 1px solid darken($primary, 10%);  // Funções SCSS funcionam!
  
  &:hover {
    background: lighten($primary, 5%);
  }
}

.card {
  background: $color-one;
  color: $math;
}
```

### 💻 Em JavaScript

```javascript
import { getWhitelabelColor, getWhitelabelColors } from '@/utils/whitelabelColorLoader'

// Obter uma cor específica
const primaryColor = getWhitelabelColor('educacross', 'primary')
// Retorna: '#6e63e8'

// Obter todas as cores
const allColors = getWhitelabelColors('educacross')
// Retorna: { primary: '#6e63e8', secondary: '#b4b7bd', ... }
```

### 🎨 Em Templates Vue

```vue
<template>
  <div>
    <!-- Usando propriedade CSS customizada -->
    <div :style="{ color: 'var(--whitelabel-primary)' }">
      Texto na cor primária
    </div>
    
    <!-- Usando classe com SCSS -->
    <button class="btn-primary">
      Botão com cor do whitelabel
    </button>
  </div>
</template>

<style lang="scss" scoped>
.btn-primary {
  background: $primary;
  
  &:hover {
    background: darken($primary, 10%);
  }
}
</style>
```

### ➕ Adicionando Uma Nova Cor

1. **Adicione ao arquivo de configuração**:
   ```javascript
   // src/consts/whitelabelColors.config.js
   educacross: {
     // ... cores existentes
     minhaCorNova: '#ff0000',
   }
   ```

2. **Adicione a variável SCSS** (opcional, se quiser usar em SCSS):
   ```scss
   // src/assets/scss/variables/_variables.scss
   $minha-cor-nova: var(--whitelabel-minha-cor-nova, #ff0000) !default;
   ```

3. **Reinicie o servidor**:
   ```bash
   npm run serve
   ```

**Nota**: O nome camelCase (`minhaCorNova`) é automaticamente convertido para kebab-case (`--whitelabel-minha-cor-nova`) nas propriedades CSS.

### ➕ Adicionando Uma Nova Marca

1. **Adicione a configuração**:
   ```javascript
   // src/consts/whitelabelColors.config.js
   module.exports = {
     // ... marcas existentes
     novaMarca: {
       primary: '#123456',
       secondary: '#abcdef',
       // ... todas as cores necessárias
     }
   }
   ```

2. **Configure a marca** no arquivo principal:
   ```javascript
   // src/whiteLabel/config.js
   // Adicione configuração da nova marca
   ```

3. **Configure a variável de ambiente**:
   ```bash
   VUE_APP_WHITELABEL=novaMarca
   ```

4. **Reinicie o servidor**:
   ```bash
   npm run serve
   ```

---

## Página de Desenvolvimento

### 🎨 Color Palette Page

Uma página exclusiva para desenvolvedores visualizarem e interagirem com todas as cores do whitelabel.

#### Acesso

- **URL**: `/dev/color-palette`
- **Ambiente**: Apenas desenvolvimento (ou quando `VUE_APP_DEVELOP=true`)
- **URL Completa**: `http://localhost:8080/dev/color-palette`

#### Funcionalidades

##### 1. **Display Visual de Cores**
- Todas as cores organizadas por categoria:
  - Bootstrap & Cores de Tema (6)
  - Cores de Disciplinas (4)
  - Padrões de Cores Customizadas (19)
  - Cores Adicionais de UI (11)

##### 2. **Cards Interativos de Cores**
- Clique na visualização da cor para copiar o valor hex
- Clique no nome da variável CSS para copiá-lo
- Clique no nome da variável SCSS para copiá-lo
- Efeitos de hover para melhor UX

##### 3. **Alternador de Whitelabel**
- Alterne entre todos os 4 whitelabels:
  - Educacross
  - Super Ensino
  - Seduc (Hora da Matemática)
  - Somos Play
- Veja as cores atualizarem em tempo real

##### 4. **Opções de Exportação**
Três formatos de exportação:
- **JSON**: Copie todas as cores como objeto JSON
- **SCSS**: Copie como variáveis SCSS
- **CSS Variables**: Copie como propriedades customizadas CSS

##### 5. **Badge de Whitelabel Atual**
- Mostra qual whitelabel está configurado no `.env`

#### Como Usar

```bash
# 1. Inicie o servidor de desenvolvimento
npm run serve

# 2. Navegue para
http://localhost:8080/dev/color-palette

# 3. Interaja com as cores:
# - Clique nos quadrados de cor para copiar valores hex
# - Clique em nomes de variáveis para copiá-los
# - Use os botões de exportação para copiar todas as cores
```

#### Arquivos Relacionados

- `src/views/dev/ColorPalette.vue` - Componente da página
- `src/router/dev-routes.js` - Configuração de rota
- `src/consts/whitelabelColors.config.js` - Fonte de dados

---

## Resolução de Problemas

### ❌ Cores não estão mudando?

**Solução**:
```bash
# 1. Delete o arquivo gerado
rm src/assets/scss/variables/_whitelabel-colors.scss

# 2. Reinicie o servidor
npm run serve

# 3. Verifique no console:
# "✅ Successfully generated: .../_whitelabel-colors.scss"
# "Whitelabel colors loaded for: [nome]"
```

### ❌ Componentes Bootstrap mostrando cores padrão?

**Verificações**:
1. Certifique-se que `_variables.scss` importa `_whitelabel-colors.scss` na linha 7
2. Verifique se todas as variáveis de cor padrão têm a flag `!default`
3. Confirme que o arquivo `_whitelabel-colors.scss` foi gerado

**Solução**:
```scss
// src/assets/scss/variables/_variables.scss

// Linha 7: DEVE estar no topo
@import './_whitelabel-colors.scss';

// Linhas 10-15: DEVEM ter !default
$primary: #6e63e8 !default;
$secondary: #b4b7bd !default;
// ... etc
```

### ❌ Erros de compilação SCSS com darken()/lighten()?

**Causa**: O arquivo gerado não existe ou não está sendo importado corretamente.

**Solução**:
1. Verifique se o arquivo foi gerado:
   ```bash
   cat src/assets/scss/variables/_whitelabel-colors.scss
   ```

2. Verifique a ordem de importação em `_variables.scss`

3. Reinicie o servidor completamente

### ❌ Arquivo gerado com whitelabel errado?

**Causa**: A variável de ambiente não está configurada corretamente.

**Solução**:
```bash
# Verifique o arquivo .env
cat .env | grep WHITELABEL

# Deve mostrar algo como:
# VUE_APP_WHITELABEL=somosplay

# Se necessário, edite:
vim .env

# Reinicie o servidor
npm run serve
```

### ❌ Variáveis CSS não disponíveis no :root?

**Verificações**:
1. Abra o DevTools do navegador
2. Vá para Elements → Selecione `:root`
3. Procure por propriedades começando com `--whitelabel-`

**Solução**:
1. Verifique se `App.vue` está chamando `loadWhitelabelColors()`
2. Verifique o console do navegador para erros
3. Limpe o cache do navegador e recarregue

### 🧪 Testando a Implementação

```bash
# 1. Verificar arquivo gerado
cat src/assets/scss/variables/_whitelabel-colors.scss

# 2. Iniciar servidor
npm run serve

# 3. Procurar no console:
# "Generating SCSS color overrides for whitelabel: [nome]"
# "✅ Successfully generated: .../_whitelabel-colors.scss"
# "Whitelabel colors loaded for: [nome]"

# 4. Verificar no navegador:
# - Componentes Bootstrap devem usar cores do whitelabel
# - DevTools → :root deve mostrar propriedades CSS customizadas
```

---

## Histórico de Implementação

### Problema Original

**Issue**: Componentes Bootstrap não usavam cores do whitelabel porque variáveis SCSS com `var()` não funcionam com funções Sass como `darken()` e `lighten()`.

**Causa Raiz**:
- Funções SCSS precisam de valores literais de cores em tempo de compilação
- CSS `var()` é resolvido em runtime
- SCSS estendido do Bootstrap tentava usar `darken($primary, 5%)` mas `$primary` era `var(--whitelabel-primary, #6e63e8)`

### Primeira Implementação (Runtime apenas)

**Data**: Setembro 2025

**Abordagem**: Carregamento de cores em runtime usando propriedades CSS customizadas.

**Arquivos Criados**:
- `src/consts/whitelabelColors.js` - Configuração de cores
- `src/utils/whitelabelColorLoader.js` - Carregador de cores
- Atualização de `src/assets/scss/variables/_variables.scss`
- Atualização de `src/App.vue`

**Problema**: Funções SCSS não funcionavam porque recebiam `var()` em vez de valores literais.

### Solução Final (Build-time + Runtime)

**Data**: 30 de Setembro de 2025

**Abordagem Dupla**:
1. **Build-time**: Gerar arquivo SCSS com valores estáticos
2. **Runtime**: Também definir propriedades CSS para JavaScript

**Mudanças Chave**:

1. **Script de Build Criado**:
   - `scripts/generate-whitelabel-colors.js`
   - Usa `dotenv` para carregar variáveis de ambiente
   - Lê `VUE_APP_WHITELABEL` do `.env`
   - Gera `_whitelabel-colors.scss` com variáveis SCSS estáticas
   - Executa automaticamente antes de serve/build

2. **Ordem de Importação Atualizada**:
   - `src/assets/scss/variables/_variables.scss`
   - **Linha 7**: `@import './_whitelabel-colors.scss';` ← PRIMEIRO!
   - **Linhas 10-15**: Valores padrão com flag `!default`

3. **Scripts do Package Atualizados**:
   ```json
   {
     "prestart": "node ./scripts/generate-whitelabel-colors.js",
     "serve": "npm run prestart && vue-cli-service serve",
     "prebuild": "node ./scripts/generate-whitelabel-colors.js",
     "build": "npm run prebuild && vue-cli-service build"
   }
   ```

4. **Adicionado ao .gitignore**:
   ```
   src/assets/scss/variables/_whitelabel-colors.scss
   ```

### Refatoração para Fonte Única

**Data**: 30 de Setembro de 2025

**Problema**: Cores duplicadas em dois lugares:
1. `src/consts/whitelabelColors.js` (módulo ES6)
2. `scripts/generate-whitelabel-colors.js` (cores hardcoded)

**Solução**: Criar arquivo de configuração CommonJS compartilhado.

**Arquivos Criados**:
- `src/consts/whitelabelColors.config.js` ⭐ **FONTE ÚNICA DE VERDADE**
- Formato CommonJS (`module.exports`) para compatibilidade Node.js/ES6

**Arquivos Atualizados**:
- `src/consts/whitelabelColors.js` - Agora apenas um wrapper ES6
- `scripts/generate-whitelabel-colors.js` - Importa da config
- `src/utils/whitelabelColorLoader.js` - Importa da config

**Benefícios**:
- ✅ Uma única fonte de verdade
- ✅ Sem duplicação de código
- ✅ Manutenção mais fácil
- ✅ Menos propenso a erros

### Página de Desenvolvimento

**Data**: 30 de Setembro de 2025

**Funcionalidade**: Página visual para desenvolvedores interagirem com cores.

**Arquivos Criados**:
- `src/views/dev/ColorPalette.vue`
- `src/router/dev-routes.js`

**Recursos**:
- Display visual de todas as cores
- Alternador de whitelabel em tempo real
- Copiar cores/variáveis com um clique
- Exportação em múltiplos formatos
- Apenas em ambiente de desenvolvimento

### Estado Atual

**Status**: ✅ Implementado e Funcionando

**Whitelabel Atual**: `somosplay` (do arquivo `.env`)

**O Que Funciona**:
- ✅ Botões Bootstrap usam roxo (#6e63e8)
- ✅ Cards, badges, alerts usam cores do whitelabel
- ✅ `darken()` e `lighten()` funcionam em SCSS
- ✅ JavaScript pode acessar cores via propriedades CSS
- ✅ Todos os 4 whitelabels suportados
- ✅ Página de desenvolvimento disponível
- ✅ Exportação de cores em múltiplos formatos

---

## Referências

### Arquivos de Documentação

- `DEV_COLOR_PALETTE.md` - Documentação da página de desenvolvimento
- `FIX_SUMMARY.md` - Resumo da solução do problema
- `IMPLEMENTATION_SUMMARY.md` - Detalhes de implementação
- `REFACTORING_SUMMARY.md` - Refatoração para fonte única
- `WHITELABEL_COLORS_FIXED.md` - Explicação técnica detalhada
- `WHITELABEL_COLORS_README.md` - Guia original
- `WHITELABEL_COLORS_QUICK_REF.md` - Cartão de referência rápida

### Arquivos Chave do Sistema

| Arquivo | Propósito | Editar? |
|---------|-----------|---------|
| `src/consts/whitelabelColors.config.js` | ⭐ **FONTE ÚNICA** - Definições de cores | ✅ SIM |
| `src/consts/whitelabelColors.js` | Wrapper ES6 para Vue | ❌ NÃO |
| `scripts/generate-whitelabel-colors.js` | Gera overrides SCSS | ❌ NÃO |
| `src/assets/scss/variables/_whitelabel-colors.scss` | SCSS gerado | ❌ NÃO (auto-gerado) |
| `src/assets/scss/variables/_variables.scss` | Importa arquivo gerado | ⚠️ Apenas estrutura |
| `src/views/dev/ColorPalette.vue` | Página de desenvolvimento | ⚠️ Apenas funcionalidades |

---

## Conclusão

O Sistema de Cores Whitelabel fornece uma solução robusta e eficiente para gerenciar múltiplos esquemas de cores. Com uma única fonte de verdade, geração em tempo de build para compatibilidade SCSS, e propriedades CSS em runtime para flexibilidade, o sistema atende todas as necessidades de customização visual mantendo a facilidade de manutenção.

Para qualquer dúvida ou problema, consulte as seções de [Resolução de Problemas](#resolução-de-problemas) ou os arquivos de documentação detalhados no diretório raiz do projeto.

---

**Última Atualização**: 30 de Setembro de 2025  
**Status**: ✅ Implementado e Documentado  
**Versão**: 2.0 (Fonte Única + Dev Page)
