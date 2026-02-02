# Lições Aprendidas - DesignSystem-Vuexy

## 2 de Fevereiro de 2026 - Estrutura Dual do Projeto

### Problema Identificado

Durante a criação do componente `InvoiceListImproved`, foi identificada uma confusão fundamental sobre a estrutura do projeto:

**Erro**: Componente criado em `src/stories/organisms/apps/InvoiceListImproved.stories.js` pensando que era um componente educacional.

**Realidade**: O projeto possui DUAS categorias distintas de componentes que não devem ser confundidas.

### Estrutura Real do Projeto

```
DesignSystem-Vuexy/
├── src/stories/
│   ├── atoms/              ❌ Vuexy generic (NÃO usar para Educacross)
│   ├── molecules/          ❌ Vuexy generic (NÃO usar para Educacross)
│   ├── organisms/          ❌ Vuexy generic (NÃO usar para Educacross)
│   ├── templates/          ❌ Vuexy generic (NÃO usar para Educacross)
│   ├── pages/              ❌ Vuexy generic (NÃO usar para Educacross)
│   └── educacross-components-v2/  ✅ COMPONENTES REAIS (111 componentes)
└── educacross-frontoffice/        ✅ Aplicação Vue 2.7 em produção
```

### 1. Vuexy Generic Components (Template Reference)

**Localização**: `src/stories/atoms/`, `molecules/`, `organisms/`, `templates/`, `pages/`

**Propósito**:
- Documentar componentes do template Vuexy v10.9.0
- Exemplos genéricos de UI (buttons, cards, modals, invoices, dashboards)
- Demonstração de capacidades do template base

**Status**: 
- **NÃO são usados no educacross-frontoffice**
- Apenas referência de design patterns do template
- Exemplos: InvoiceList, EcommerceCart, UserProfile (contextos que não existem no Educacross)

**Quando usar**:
- Nunca para features do Educacross
- Apenas para documentar o template Vuexy base

### 2. Educacross Components V2 (Real Production)

**Localização**: `src/stories/educacross-components-v2/`

**Propósito**:
- Documentar **111 componentes REAIS** do educacross-frontoffice
- Componentes em uso em produção
- Mapeados diretamente de `educacross-frontoffice/src/components/`

**Status**:
- ✅ **ProgressBar** - Reconstruído (12 min, pixel-perfect)
- 🔄 **MediaCard** - P0 #2 (broken images)
- 🔄 **QuestionAlternative** - P0 (empty props)
- ... 108 componentes restantes

**Exemplos**:
- ProgressBar (proficiência do aluno)
- MediaCard (cards de missões/jogos)
- ListTable (tabelas de alunos/professores)
- MissionDetails (detalhes de missões)
- QuestionAlternative (questões de avaliação)

**Quando usar**:
- **SEMPRE** quando trabalhando em features do Educacross
- Se o componente existe em `educacross-frontoffice/src/components/`, vai para aqui

### Contexto do Educacross

**Educacross-frontoffice** é uma **plataforma educacional** com os seguintes perfis:
- Admin (Administrador)
- Teacher (Professor)
- Coordinator (Coordenador)
- Director (Diretor)
- Network Manager (Gestor de Rede)
- Student (Aluno)
- Auditor

**NÃO possui**:
- ❌ Gerente Financeiro
- ❌ Contador
- ❌ Sistema de faturas/invoices
- ❌ E-commerce
- ❌ CRM

### O Que Foi Aprendido

1. **Verificar contexto antes de criar componente**
   - InvoiceListImproved foi criado baseado no template Vuexy genérico
   - Não reflete nenhuma funcionalidade real do Educacross
   - Foi um desvio desnecessário do trabalho real

2. **Sempre consultar educacross-frontoffice**
   - Buscar em `educacross-frontoffice/src/components/`
   - Verificar rotas em `educacross-frontoffice/src/router/`
   - Consultar navegação em `educacross-frontoffice/src/navigation/`

3. **Focar nos 111 componentes reais**
   - Todos estão em `educacross-components-v2/`
   - Priorizar componentes P0 (Critical) primeiro
   - Ignorar componentes Vuexy genéricos

### Regras Estabelecidas

**REGRA DE OURO**:
> Se o componente existe em `educacross-frontoffice/src/components/`, ele DEVE ser criado em `src/stories/educacross-components-v2/`

**Checklist antes de criar novo componente**:
1. ✅ Buscar componente em `educacross-frontoffice/src/components/`
2. ✅ Verificar se já existe story em `educacross-components-v2/`
3. ✅ Confirmar que componente é usado em produção
4. ✅ Entender contexto educacional (não assumir contexto financeiro/comercial)
5. ✅ Consultar personas corretas (Professor, Coordenador, Aluno, etc.)

**Hierarquia de títulos**:
- Vuexy generic: `title: 'Atoms/Actions/Button'` (Atomic Design)
- Educacross real: `title: 'Educacross Components V2/Category/ComponentName'`

### Ação Corretiva

**InvoiceListImproved**:
- Deixar como exemplo de "design patterns" genéricos
- Adicionar disclaimer no início da documentação explicando que não é componente real
- Usar como referência de como eliminar redundâncias visuais
- Aplicar princípios aprendidos aos componentes reais (ListTable, etc.)

### Impacto

**Tempo desperdiçado**: ~45 minutos criando componente fora de contexto

**Aprendizado**:
- ✅ Estrutura dual do projeto bem mapeada
- ✅ Regras claras de categorização estabelecidas
- ✅ Documentação atualizada (copilot-instructions.md, README.md, tarefas.md)
- ✅ Não repetir erro nos 108 componentes restantes

### Próximos Passos

1. **Validar todos os 111 componentes** em `educacross-components-v2/`
2. **Comparar com** `educacross-frontoffice/src/components/` para garantir alinhamento
3. **Reconstruir componentes P0** (Critical) primeiro:
   - MediaCard (broken images)
   - QuestionAlternative (empty props)
   - ESelect (empty options)
   - ... 17 componentes P0 restantes
4. **Aplicar padrão ProgressBar** (documentação Figma-style) a todos

### Referências

- educacross-frontoffice: `c:\Users\Educacross\Documents\Educacross\DesignSystem-Vuexy\educacross-frontoffice\`
- Componentes reais: `educacross-frontoffice/src/components/`
- Stories reais: `src/stories/educacross-components-v2/`
- Vuexy generic: `src/stories/atoms/`, `molecules/`, `organisms/`, etc.

---

**Data**: 2 de Fevereiro de 2026  
**Responsável**: AI Agent (Claude Sonnet 4.5)  
**Ticket**: N/A (Descoberta durante desenvolvimento)  
**Status**: Documentado e corrigido
