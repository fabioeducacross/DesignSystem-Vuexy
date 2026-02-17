# 📘 Guia de Validação de Componentes Educacross

## 📋 Visão Geral

Este guia explica como usar o script de validação de componentes para garantir que todas as stories do Storybook estejam 100% fiéis aos componentes Vue do `educacross-frontoffice`.

## 🎯 O Que o Script Valida

O script `scripts/validate-components.py` realiza três tipos de validação:

### 1. **Validação de Props**
- ✅ Todas as props do componente Vue estão documentadas nos `argTypes` da story?
- ⚠️ Existem `argTypes` na story que não correspondem a props no Vue?
- ❌ Props obrigatórias (`required: true`) estão faltando?

### 2. **Validação de Estrutura HTML**
- 📊 Quais elementos HTML o componente Vue usa (`<div>`, `<b-button>`, etc.)?
- 💡 Informação útil para verificar manualmente se a story renderiza estrutura similar

### 3. **Validação de Dados de Exemplo**
- 🔍 Props obrigatórias sem valor default precisam de exemplos realistas na story
- 📝 Ajuda a identificar stories com dados de teste inadequados

### 4. **Componentes Doc-Only** 📚
- Componentes marcados com `@category Doc-Only` são válidos mesmo sem arquivo `.vue`
- Incluem: protótipos, conceitos arquiteturais, componentes deletados
- Mantidos para documentação visual e histórico de design

## 🚀 Como Usar

### Execução Básica

```bash
# Na raiz do projeto
python scripts/validate-components.py
```

### Saída no Terminal

O script mostra progresso em tempo real:

```
🔍 Validando: ProgressBar.stories.js... ✅ PASSED
🔍 Validando: EInput.stories.js... ⚠️  Componente Vue não encontrado
🔍 Validando: ESelect.stories.js... ✅ PASSED
```

### Relatórios Gerados

Após a execução, dois relatórios são criados:

1. **`scripts/validation-reports/validation-report.json`**
   - Relatório completo em formato JSON
   - Todos os componentes, issues detalhados, sugestões
   - Ideal para processamento automatizado

2. **`scripts/validation-reports/validation-report.md`**
   - Relatório human-readable em Markdown
   - Sumário executivo com métricas
   - Componentes organizados por status (erros, avisos, aprovados)

## 📊 Interpretando os Resultados

### Status dos Componentes

| Status | Emoji | Significado |
|--------|-------|-------------|
| `passed` | ✅ | Story corresponde 100% ao componente Vue |
| `warning` | ⚠️ | Pequenas diferenças (props faltando nos argTypes) |
| `error` | ❌ | Diferenças críticas (props obrigatórias ausentes) |
| `not_found` | 🔍 | Componente Vue não encontrado (problema de @source) |

### Resultados da Última Validação (16/02/2026)

```
Total: 125 stories
✅ Aprovados: 69 (55.2%)
⚠️ Avisos: 0 (0.0%)
❌ Erros: 0 (0.0%)
🔍 Não Encontrados: 56 (44.8%)
```

## 📋 Como Manter 100% de Validação

### Ao Adicionar Novo Componente

1. **Criar story Storybook**:
   ```javascript
   /**
    * @component MeuComponente
    * @source educacross-frontoffice/src/components/path/MeuComponente.vue
    * @category [categoria]
    */
   ```

2. **Documentar todas as props em `argTypes`**:
   ```javascript
   argTypes: {
     propName: {
       control: 'text',
       description: 'Descrição clara da prop',
       defaultValue: 'valor default'
     }
   }
   ```

3. **Validar antes de commit**:
   ```bash
   python scripts/validate-components.py
   ```

### Componentes Doc-Only

**Quando usar**: Specs de design, protótipos, conceitos arquiteturais ou componentes deletados que ainda têm valor educacional.

**Como marcar**:
```javascript
/**
 * @component MeuPrototipo
 * @category Doc-Only
 * @note Este é um protótipo de design, não possui implementação Vue correspondente
 */
```

**Exemplos válidos**:
- **Protótipos**: EInput, ETextarea, FilterChip (specs não implementadas)
- **Conceitos**: Sidebar (composto por múltiplos arquivos)
- **Deletados**: ProfilePicture, ResourceCard (removidos na refatoração)
- **Parciais**: AppNavbar (snippet de código, não componente reutilizável)

---

## 🔍 Problemas Comuns e Soluções

### 1. Componente Vue Não Encontrado (56 casos)

**Problema**: Story não tem tag `@source` ou o caminho está incorreto.

**Exemplo de story problemática**:
```javascript
/**
 * AcceptOrRejectAccess Component
 * 
 * @component AcceptOrRejectAccess
 * @category Modals
 * // ❌ Falta: @source educacross-frontoffice/src/components/...
 */
```

**Solução**: Adicionar tag `@source` no header:
```javascript
/**
 * AcceptOrRejectAccess Component
 * 
 * @component AcceptOrRejectAccess
 * @source educacross-frontoffice/src/components/modal/AcceptOrRejectAccess.vue
 * @category Modals
 */
```

### 2. Props Faltando nos ArgTypes

**Problema**: Componente Vue define props que não estão documentadas na story.

**Exemplo**:
```javascript
// Vue Component - ProgressBar.vue
defineProps({
  value: { type: Number, required: true },
  label: { type: String },
  labelClass: { type: String } // ❌ Faltando nos argTypes
})

// Story - ProgressBar.stories.js
argTypes: {
  value: { control: 'number', description: '...' },
  label: { control: 'text', description: '...' }
  // ❌ labelClass não documentado
}
```

**Solução**: Adicionar ao `argTypes`:
```javascript
argTypes: {
  value: { control: 'number', description: '...' },
  label: { control: 'text', description: '...' },
  labelClass: { 
    control: 'text', 
    description: 'Classe CSS customizada para o label'
  }
}
```

### 3. ArgTypes Extras (Não São Props)

**Problema**: Story define argTypes que não existem como props no Vue.

**Possíveis razões**:
- Erro de digitação
- Prop foi removida do Vue mas esqueceram de remover da story
- É um controle auxiliar para a story (não é problema real)

**Ação**: Revisar manualmente e remover se não for necessário.

### 4. Caminho @source Não-Convencional

**Problema**: Story referencia uma View ou snippet de código, não um componente completo.

**Exemplo**:
```javascript
/**
 * AppNavbar
 * @source educacross-frontoffice/src/views/pages/auth-context/manage-account/ManageAccount.vue (linhas 6-68)
 */
```

**Solução**: Se é realmente um snippet, considerar:
- Extrair para componente standalone
- Ou documentar claramente na story que é uma recriação

## 📝 Próximos Passos Recomendados

### Fase 1: Corrigir Tags @source (Prioridade Alta)

56 stories precisam de tag `@source` ou correção de caminho.

**Estratégia**:
1. Listar todas as stories `not_found` no relatório JSON
2. Para cada story, buscar o componente Vue correspondente manualmente
3. Adicionar tag `@source` correta
4. Re-executar validação

**Exemplo de busca**:
```powershell
# Buscar componente por nome
Get-ChildItem -Path "educacross-frontoffice\src\components" -Recurse -Filter "AcceptOrRejectAccess.vue"
```

### Fase 2: Completar ArgTypes (Prioridade Média)

Para os 69 componentes aprovados, verificar se todos os argTypes estão completos.

**Ações**:
1. Abrir relatório JSON
2. Filtrar componentes com `status: 'passed'` mas que têm issues `type: 'missing_prop'`
3. Adicionar argTypes faltantes

### Fase 3: Validação Manual de HTML (Prioridade Baixa)

O script lista elementos HTML principais do Vue. Validar manualmente se a story renderiza estrutura similar.

**Como fazer**:
1. Abrir Storybook: `npm run storybook`
2. Navegar até a story
3. Inspecionar HTML gerado no DevTools
4. Comparar com template do Vue component

## 🛠️ Customizando o Script

### Adicionar Novas Validações

O script está organizado em classes modulares:

```python
# scripts/validate-components.py

class ComponentValidator:
    @staticmethod
    def validate_props(vue_comp, story):
        # Sua lógica de validação de props
        pass
    
    @staticmethod
    def validate_custom(vue_comp, story):
        # Adicionar nova validação aqui
        issues = []
        
        # Exemplo: Verificar se story tem pelo menos 1 exemplo
        if len(story.examples) == 0:
            issues.append(ValidationIssue(
                type='no_examples',
                severity='warning',
                message='Story não tem exemplos de uso'
            ))
        
        return issues
```

### Ajustar Severidades

Modificar a lógica de severidade em `ComponentValidator.validate_props()`:

```python
# Atualmente: prop não-obrigatória faltando = warning
# Mudar para: prop não-obrigatória faltando = info

issues.append(ValidationIssue(
    type='missing_prop',
    severity='info',  # Era 'warning'
    message=f"Prop '{prop_name}' existe no Vue mas não está documentada",
    prop_name=prop_name
))
```

### Ignorar Componentes Específicos

```python
# No início do main()
IGNORE_COMPONENTS = ['TemplateOld', 'DeprecatedComponent']

for story_file in story_files:
    if story_file.stem in IGNORE_COMPONENTS:
        continue
    # ... resto da validação
```

## 🤔 FAQ

### Por que alguns componentes aparecem como "Aprovados" mas não têm 100% das props?

O status `passed` significa que não há **erros críticos**. Props não-obrigatórias faltando geram apenas issues `type: 'info'` que não mudam o status para `warning` ou `error`.

### O script valida se o HTML renderizado é idêntico?

Não completamente. O script extrai elementos HTML do template Vue, mas não analisa o `render()` da story. Validação de HTML idêntico deve ser feita manualmente ou com testes visuais (Playwright, Percy, Chromatic).

### Posso automatizar a correção das tags @source?

Sim, mas com cuidado. Você poderia criar um script que:
1. Para cada story sem @source
2. Busca componente Vue com nome similar
3. Sugere tag @source
4. Pede confirmação antes de adicionar

### Como integrar no CI/CD?

```yaml
# .github/workflows/validate-components.yml
name: Validate Components

on: [push, pull_request]

jobs:
  validate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Setup Python
        uses: actions/setup-python@v4
        with:
          python-version: '3.11'
      - name: Run Validation
        run: python scripts/validate-components.py
      - name: Upload Reports
        uses: actions/upload-artifact@v3
        with:
          name: validation-reports
          path: scripts/validation-reports/
```

## 📞 Suporte

Para dúvidas ou problemas:
1. Verificar este guia primeiro
2. Consultar relatórios em `scripts/validation-reports/`
3. Abrir issue no repositório com detalhes do erro

---

**Última atualização**: 16/02/2026  
**Versão do script**: 1.0.0  
**Mantido por**: Equipe Educacross
