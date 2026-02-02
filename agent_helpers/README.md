# Agent Helpers - Workflow de Configuração do Storybook com Vuexy

## ⚠️ LIÇÃO APRENDIDA: Estrutura Dual do Projeto

**CRITICAL**: O DesignSystem-Vuexy possui DUAS categorias distintas de componentes:

### 1. Vuexy Generic (Template Reference)
- **Pasta**: `src/stories/atoms/`, `molecules/`, `organisms/`, `templates/`, `pages/`
- **Propósito**: Documentar componentes do template Vuexy genérico (botões, cards, invoices, etc.)
- **Status**: **NÃO são usados no educacross-frontoffice**
- **Exemplo**: InvoiceListImproved foi criado aqui por engano

### 2. Educacross Components V2 (⭐ Real Production)
- **Pasta**: `src/stories/educacross-components-v2/`
- **Propósito**: Documentar **111 componentes reais** do educacross-frontoffice
- **Status**: **Componentes em uso em produção**
- **Exemplos**: ProgressBar, MediaCard, ListTable, MissionDetails, QuestionAlternative

**REGRA DE OURO**: Sempre verificar se componente existe em `educacross-frontoffice/src/components/` antes de criar story. Se existir, vai para `educacross-components-v2/`.

## Descrição
Este diretório contém a documentação do fluxo de trabalho para configuração do Storybook com o tema Vuexy.

## Arquivos

- **tarefas.md**: Checklist completo de todas as tarefas a serem executadas
- **decisoes.md**: Log de decisões técnicas tomadas durante a implementação
- **validacao.md**: Passos de QA e validação antes de abrir o PR

## Fluxo de Trabalho

1. Localizar template Vuexy HTML no repositório
2. Criar estrutura de pacote de tema
3. Copiar assets do Vuexy preservando estrutura
4. Inicializar Storybook do zero
5. Configurar servição de assets estáticos
6. Carregar CSS do Vuexy no preview
7. Criar decorator global com classes base
8. Criar stories iniciais com markup Vuexy
9. Validar fidelidade visual e funcionalidade

## Objetivo
Garantir máxima fidelidade visual ao tema Vuexy sem alterar arquivos originais do template.
