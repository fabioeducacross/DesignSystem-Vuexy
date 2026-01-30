# Passos de Validação e QA

## Antes de Abrir o PR

### 1. Validação de Estrutura
- [ ] Diretório `agent_helpers/` existe com todos os arquivos
- [ ] Diretório `packages/vuexy_theme/public/vuexy` existe
- [ ] Assets do Vuexy (css, fonts, vendors) foram copiados corretamente
- [ ] Estrutura de diretórios está preservada

### 2. Validação do Storybook
- [ ] Storybook foi inicializado com sucesso
- [ ] `package.json` contém scripts `storybook` e `build-storybook`
- [ ] Comando `npm run storybook` inicia sem erros
- [ ] Interface do Storybook abre no navegador

### 3. Validação de Assets Estáticos
- [ ] Configuração de `staticDirs` no Storybook está correta
- [ ] Assets CSS acessíveis via `/vuexy/css/...`
- [ ] Assets de fonts acessíveis via `/vuexy/fonts/...`
- [ ] Assets de vendors acessíveis via `/vuexy/...`
- [ ] Nenhum erro 404 no console do navegador

### 4. Validação de CSS e Estilos
- [ ] CSS do Vuexy carregado no preview
- [ ] Ordem de carregamento dos CSS está correta
- [ ] Paths dos CSS são absolutos com `/vuexy`
- [ ] Fonts carregam corretamente (verificar no DevTools)

### 5. Validação do Decorator Global
- [ ] Decorator global aplicado com classes base do Vuexy
- [ ] Wrapper tem `min-height: 100vh`
- [ ] Padding aplicado corretamente
- [ ] Classes do Vuexy funcionam nos componentes

### 6. Validação das Stories

#### Button Story
- [ ] Renderiza corretamente
- [ ] Variantes (primary, secondary, etc.) funcionam
- [ ] Tamanhos (small, medium, large) funcionam
- [ ] Estado disabled funciona
- [ ] Markup é fiel ao HTML do Vuexy
- [ ] Docs incluem snippets para HTML, React, Vue2, Vue3

#### Input Story
- [ ] Renderiza corretamente
- [ ] Placeholder funciona
- [ ] Estado disabled funciona
- [ ] Estados de validação (válido/inválido) funcionam
- [ ] Markup é fiel ao HTML do Vuexy
- [ ] Docs incluem snippets para HTML, React, Vue2, Vue3

#### Card Story
- [ ] Renderiza corretamente
- [ ] Header aparece
- [ ] Conteúdo aparece
- [ ] Markup é fiel ao HTML do Vuexy
- [ ] Docs incluem snippets para HTML, React, Vue2, Vue3

#### Table Story
- [ ] Renderiza corretamente
- [ ] Linhas aparecem formatadas
- [ ] Estado vazio funciona
- [ ] Markup é fiel ao HTML do Vuexy
- [ ] Docs incluem snippets para HTML, React, Vue2, Vue3

### 7. Validação Visual
- [ ] Tipografia está igual ao Vuexy
- [ ] Cores estão iguais ao Vuexy
- [ ] Espaçamento e padding estão iguais
- [ ] Border radius está igual
- [ ] Sombras (shadows) estão iguais
- [ ] Ícones (se usados) estão iguais

### 8. Validação de Performance
- [ ] Storybook carrega em tempo razoável (< 10s)
- [ ] Navegação entre stories é fluida
- [ ] Nenhum warning no console
- [ ] Nenhum erro no console

### 9. Validação de Documentação
- [ ] README.md atualizado com instruções de instalação
- [ ] Instruções de como rodar o Storybook
- [ ] Instruções de como usar os componentes
- [ ] Links relevantes incluídos

### 10. Validação de Código
- [ ] Nenhum arquivo temporário commitado
- [ ] `.gitignore` configurado adequadamente
- [ ] `node_modules` não commitado
- [ ] Builds artifacts não commitados
- [ ] Código segue padrões do projeto

## Comandos de Teste

```bash
# Instalar dependências
npm install

# Rodar Storybook
npm run storybook

# Build do Storybook (verificar se não há erros)
npm run build-storybook

# Verificar estrutura de arquivos
tree -L 3 packages/vuexy_theme/
tree -L 2 agent_helpers/

# Verificar no navegador
# Abrir http://localhost:6006
# Verificar DevTools Console (sem erros)
# Verificar DevTools Network (sem 404s)
```

## Checklist Final antes do PR

- [ ] Todos os itens acima validados
- [ ] Commit message claro e descritivo
- [ ] PR description completa com:
  - [ ] Descrição do que foi feito
  - [ ] Instruções de como rodar
  - [ ] Screenshots do Storybook funcionando
  - [ ] Lista de stories criadas
  - [ ] Notas sobre o tema Vuexy aplicado
- [ ] Sem arquivos desnecessários commitados
- [ ] Código testado em ambiente limpo (npm install + npm run storybook)
