# Guia de Integração do Template Vuexy v10.9.0

## 📋 Informações do Template

- **Nome**: Vuexy Admin Dashboard Template
- **Versão**: v10.9.0
- **Origem**: ThemeForest
- **Localização Original**: `themeforest-lV6WYTyr-vuexy-vuejs-html-laravel-admin-dashboard-template/vuexy-admin-v10.9.0`
- **Tipo**: VueJS + HTML + Laravel Admin Dashboard

## 🎯 Objetivo

Integrar o template Vuexy v10.9.0 ao Storybook já configurado, substituindo o CSS placeholder pelos assets reais do template.

## 📁 Estrutura Esperada do Template

O template Vuexy v10.9.0 geralmente contém:

```
vuexy-admin-v10.9.0/
├── html-version/           # Versão HTML pura (NOSSA PRIORIDADE)
│   ├── css/
│   │   ├── bootstrap.css
│   │   ├── bootstrap-extended.css
│   │   ├── colors.css
│   │   ├── components.css
│   │   └── ...
│   ├── fonts/
│   │   ├── feather/
│   │   ├── fontawesome/
│   │   └── ...
│   ├── vendors/
│   │   ├── js/
│   │   └── css/
│   ├── js/
│   │   └── scripts.js
│   ├── images/
│   └── *.html              # Arquivos HTML de exemplo
├── vue-version/            # Versão Vue (ignorar por enquanto)
└── laravel-version/        # Versão Laravel (ignorar por enquanto)
```

## 🚀 Passo a Passo para Integração

### Passo 1: Upload do Template

**Opção A - Via Git (Recomendado para templates pequenos)**
```bash
# No seu computador local, copie a pasta html-version para o repositório
cp -r /caminho/para/themeforest-*/vuexy-admin-v10.9.0/html-version /caminho/para/DesignSystem-Vuexy/vuexy-template-source
git add vuexy-template-source
git commit -m "Add Vuexy v10.9.0 HTML template source"
git push
```

**Opção B - Via GitHub Web Interface**
1. Crie uma pasta `vuexy-template-source` na raiz do repositório
2. Faça upload da versão HTML do template via interface web do GitHub
3. Commit as mudanças

**Opção C - Via Git LFS (Recomendado para templates grandes)**
```bash
# Instalar Git LFS
git lfs install

# Adicionar tipos de arquivo grandes ao LFS
git lfs track "*.zip"
git lfs track "*.woff"
git lfs track "*.woff2"
git lfs track "*.ttf"
git lfs track "*.eot"

# Comprimir e adicionar
cd /caminho/para/themeforest-*/vuexy-admin-v10.9.0/
zip -r html-version.zip html-version/
mv html-version.zip /caminho/para/DesignSystem-Vuexy/vuexy-template-source.zip

git add vuexy-template-source.zip
git commit -m "Add Vuexy v10.9.0 HTML template (compressed)"
git push
```

### Passo 2: Executar Script de Integração

Uma vez que o template esteja no repositório, execute:

```bash
# Na raiz do projeto DesignSystem-Vuexy
npm run integrate-vuexy
```

Ou manualmente:

```bash
# Copiar CSS
cp -r vuexy-template-source/html-version/css/* packages/vuexy_theme/public/vuexy/css/

# Copiar Fonts
cp -r vuexy-template-source/html-version/fonts/* packages/vuexy_theme/public/vuexy/fonts/

# Copiar Vendors
cp -r vuexy-template-source/html-version/vendors/* packages/vuexy_theme/public/vuexy/vendors/

# Copiar JavaScript
cp -r vuexy-template-source/html-version/js/* packages/vuexy_theme/public/vuexy/js/

# Copiar Images
cp -r vuexy-template-source/html-version/images/* packages/vuexy_theme/public/vuexy/images/
```

### Passo 3: Identificar CSS Principais

Abra um arquivo HTML de exemplo do Vuexy (ex: `vuexy-template-source/html-version/index.html`) e identifique os CSS carregados na ordem correta:

Exemplo típico:
```html
<!-- CSS base -->
<link rel="stylesheet" href="vendors/css/vendors.min.css">
<link rel="stylesheet" href="css/bootstrap.css">
<link rel="stylesheet" href="css/bootstrap-extended.css">
<link rel="stylesheet" href="css/colors.css">

<!-- CSS de componentes -->
<link rel="stylesheet" href="css/components.css">
<link rel="stylesheet" href="css/themes/dark-layout.css">
<link rel="stylesheet" href="css/themes/bordered-layout.css">

<!-- CSS customizado -->
<link rel="stylesheet" href="css/core/menu/menu-types/vertical-menu.css">
<link rel="stylesheet" href="assets/css/style.css">
```

### Passo 4: Atualizar .storybook/preview.js

Edite `.storybook/preview.js` para carregar os CSS reais do Vuexy na ordem correta:

```javascript
/** @type { import('@storybook/html-vite').Preview } */

// Load Vuexy CSS in the correct order
if (typeof window !== 'undefined') {
  const cssFiles = [
    '/vuexy/vendors/css/vendors.min.css',
    '/vuexy/css/bootstrap.css',
    '/vuexy/css/bootstrap-extended.css',
    '/vuexy/css/colors.css',
    '/vuexy/css/components.css',
    '/vuexy/css/themes/dark-layout.css',
    '/vuexy/css/themes/bordered-layout.css',
    '/vuexy/css/core/menu/menu-types/vertical-menu.css',
  ];

  cssFiles.forEach(href => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    document.head.appendChild(link);
  });
}

const preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    (Story) => {
      const wrapper = document.createElement('div');
      wrapper.style.minHeight = '100vh';
      wrapper.style.padding = '2rem';
      wrapper.className = 'vuexy-wrapper';
      
      const story = Story();
      if (typeof story === 'string') {
        wrapper.innerHTML = story;
      } else {
        wrapper.appendChild(story);
      }
      
      return wrapper;
    },
  ],
};

export default preview;
```

### Passo 5: Atualizar Stories com Markup Real

Depois de integrar o CSS real, atualize os componentes nas stories para usar o markup exato do Vuexy:

**Exemplo - Button.stories.js**

Abra um arquivo HTML do Vuexy e copie o markup exato de um botão:

```javascript
// De:
const createButton = ({ variant, size, label }) => {
  return `<button class="btn btn-${variant} btn-${size}">${label}</button>`;
};

// Para (usando markup real do Vuexy):
const createButton = ({ variant, size, label }) => {
  return `
    <button type="button" class="btn btn-${variant} btn-${size} waves-effect waves-float waves-light">
      ${label}
    </button>
  `;
};
```

### Passo 6: Testar e Validar

```bash
# Rodar Storybook
npm run storybook

# Verificar no navegador (http://localhost:6006):
# 1. Sem erros 404 no console
# 2. Fonts carregando corretamente
# 3. Cores do Vuexy aplicadas
# 4. Componentes com visual idêntico ao template
```

### Passo 7: Remover Placeholder CSS

Uma vez que o CSS real esteja funcionando:

```bash
# Renomear o placeholder para backup
mv packages/vuexy_theme/public/vuexy/css/vuexy-theme.css packages/vuexy_theme/public/vuexy/css/vuexy-theme.css.backup

# Ou deletar
rm packages/vuexy_theme/public/vuexy/css/vuexy-theme.css
```

## 📝 Checklist de Validação

Após integração, verificar:

### CSS
- [ ] Todos os CSS carregam sem erro 404
- [ ] Cores do Vuexy aplicadas corretamente
- [ ] Tipografia (Montserrat) carregando
- [ ] Componentes com estilo correto

### Fonts
- [ ] Feather Icons carregando
- [ ] Font Awesome carregando (se usado)
- [ ] Fonte Montserrat carregando
- [ ] Sem erros de CORS

### Componentes
- [ ] Buttons com todas as variantes funcionando
- [ ] Cards com sombras e bordas corretas
- [ ] Inputs com foco e validação visual
- [ ] Tables com hover effects
- [ ] Todas as 26 stories renderizando corretamente

### JavaScript (se necessário)
- [ ] Vendors carregando
- [ ] Scripts do Vuexy funcionando
- [ ] Sem conflitos com Storybook

## 🔧 Troubleshooting

### Problema: CSS não carrega (404)

**Solução**: Verifique se o caminho no preview.js corresponde à estrutura real de arquivos:

```bash
# Listar CSS disponíveis
ls -la packages/vuexy_theme/public/vuexy/css/
```

### Problema: Fonts não carregam

**Solução**: Verifique paths relativos no CSS. Pode ser necessário ajustar:

```bash
# Buscar referências a fonts no CSS
grep -r "fonts/" packages/vuexy_theme/public/vuexy/css/
```

### Problema: Cores diferentes do esperado

**Solução**: Certifique-se de carregar `colors.css` e que não há CSS conflitante do placeholder.

### Problema: Template muito grande para Git

**Solução**: Use Git LFS ou mantenha template em storage separado e copie apenas assets necessários.

## 📊 Estrutura Final Esperada

Após integração completa:

```
packages/vuexy_theme/public/vuexy/
├── css/
│   ├── bootstrap.css
│   ├── bootstrap-extended.css
│   ├── colors.css
│   ├── components.css
│   ├── themes/
│   │   ├── dark-layout.css
│   │   └── bordered-layout.css
│   └── core/
│       └── menu/
│           └── menu-types/
│               └── vertical-menu.css
├── fonts/
│   ├── feather/
│   │   ├── feather.woff
│   │   └── feather.woff2
│   └── montserrat/
│       ├── Montserrat-*.woff
│       └── Montserrat-*.woff2
├── vendors/
│   ├── css/
│   │   └── vendors.min.css
│   └── js/
│       └── vendors.min.js
├── js/
│   └── scripts.js
└── images/
    └── (imagens do template)
```

## 🎨 Customização Pós-Integração

Depois da integração bem-sucedida, você pode:

1. **Ajustar cores** editando `css/colors.css`
2. **Adicionar novos componentes** criando stories baseadas em exemplos do template
3. **Criar variações** dos componentes existentes
4. **Documentar padrões** específicos do seu projeto

## 📞 Suporte

Se encontrar problemas durante a integração:

1. Verifique `agent_helpers/decisoes.md` para decisões técnicas
2. Consulte `agent_helpers/validacao.md` para procedimentos de QA
3. Revise a documentação oficial do Vuexy
4. Abra uma issue no repositório com detalhes do erro

## ✅ Próximos Passos Após Integração

1. [ ] Adicionar mais componentes do Vuexy (Modals, Alerts, Forms, etc.)
2. [ ] Criar variações de layouts (Vertical menu, Horizontal menu, etc.)
3. [ ] Implementar JavaScript behaviors do Vuexy
4. [ ] Adicionar testes de acessibilidade
5. [ ] Criar documentação de uso para o time
6. [ ] Configurar CI/CD para Storybook
7. [ ] Publicar Storybook em ambiente de staging

---

**Última atualização**: 2026-01-30
**Template Version**: v10.9.0
**Status**: Aguardando upload do template para o repositório
