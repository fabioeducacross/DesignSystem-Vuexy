# Checklist de Tarefas - Storybook + Vuexy

## Parte A: Workflow do Agente
- [x] Criar pasta agent_helpers
- [x] Criar agent_helpers/README.md
- [x] Criar agent_helpers/tarefas.md
- [ ] Criar agent_helpers/decisoes.md
- [ ] Criar agent_helpers/validacao.md

## Parte B: Localizar Vuexy HTML
- [ ] Procurar pasta com template Vuexy (vuexy + versão)
- [ ] Localizar diretório da versão HTML
- [ ] Identificar assets (css, js, vendors, fonts, images)
- [ ] Registrar caminho em decisoes.md

## Parte C: Criar Pacote de Tema
- [ ] Criar packages/vuexy_theme/public/vuexy
- [ ] Copiar conteúdo da versão HTML
- [ ] Preservar estrutura e paths relativos
- [ ] Confirmar existência de pastas css, fonts, vendors

## Parte D: Inicializar Storybook
- [ ] Executar npx storybook@latest init
- [ ] Verificar scripts no package.json
- [ ] Testar inicialização do Storybook

## Parte E: Servir Assets do Vuexy
- [ ] Configurar diretório estático no Storybook
- [ ] Validar acesso a CSS via /vuexy no navegador

## Parte F: Carregar CSS do Vuexy
- [ ] Identificar links de CSS em HTML de exemplo
- [ ] Configurar preview para carregar CSS na mesma ordem
- [ ] Usar paths absolutos com /vuexy

## Parte G: Scripts (se necessário)
- [ ] Começar sem scripts
- [ ] Adicionar vendors/scripts core se necessário
- [ ] Apontar para /vuexy

## Parte H: Decorator Global
- [ ] Identificar classes base do Vuexy (body/wrapper)
- [ ] Adicionar decorator global no preview
- [ ] Garantir min-height 100vh e padding

## Parte I: Criar Stories Iniciais
- [ ] Criar src/stories/vuexy
- [ ] Story: Button (variantes, tamanhos, disabled)
- [ ] Story: Input (placeholder, estados, validação)
- [ ] Story: Card (header, conteúdo)
- [ ] Story: Table (linhas, estado vazio)
- [ ] Adicionar docs com snippets (HTML, React, Vue2, Vue3)

## Parte J: Validação
- [ ] Rodar Storybook
- [ ] Validar ausência de 404s (css, fonts, vendors)
- [ ] Validar tipografia, cores e componentes
- [ ] Commit com mensagem clara
- [ ] Abrir PR com instruções de execução
