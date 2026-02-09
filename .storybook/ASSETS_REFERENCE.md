# Assets Reference - Educacross Components

Este arquivo documenta todos os assets copiados do `educacross-frontoffice` para o Storybook.

## 📁 Estrutura de Diretórios

Todos os assets estão disponíveis em `.storybook/public/` e podem ser referenciados nas stories usando caminhos absolutos a partir da raiz:

```
/images/           → Todas as imagens do educacross-frontoffice
/profile-corujinhas/ → Avatares de corujinhas (8 mascotes)
/css/              → CSS customizados
/css/tailwind/     → Tailwind CSS
/fonts/            → Fontes customizadas (Montserrat, dimbo-regular)
```

## 🖼️ Imagens Disponíveis

### Avatares e Perfis
- `/profile-corujinhas/1.png` até `/profile-corujinhas/8.png` - Mascotes de corujinhas
- `/images/belinha/` - Personagem Belinha
- `/images/educacross/` - Logos e branding Educacross
- `/images/whitelabel-teacher/` - Assets para professores

### Ícones e UI
- `/images/icons/` - Ícones diversos
- `/images/dashboard-teacher-icons/` - Ícones do dashboard de professor
- `/images/badges-icon/` - Ícones de badges
- `/images/ranking-icons/` - Ícones de ranking
- `/images/arrows/` - Setas e indicadores
- `/images/arrows-white.svg` - Setas brancas

### Conteúdo Educacional
- `/images/missions/` - Imagens de missões
- `/images/mission-plus/` - Missões especiais
- `/images/subjects/` - Ícones de matérias
- `/images/educateca/` - Conteúdo Educateca
- `/images/fruits/` - Frutas (gamificação)
- `/images/trophy/` - Troféus e conquistas
- `/images/stars/` - Estrelas (pontuação)

### Status e Feedback
- `/images/questionAnswerStatus/` - Status de respostas
- `/images/ranking/` - Rankings e leaderboards
- `/images/ranking-example/` - Exemplos de ranking
- `/images/errors/` - Páginas de erro
- `/images/how-to-play/` - Tutorial/Como jogar

### Relatórios e Documentos
- `/images/pdf/` - Ícones e assets PDF
- `/images/pdf-progress/` - Progresso em PDF
- `/images/relatorioEvidencias/` - Relatórios de evidências
- `/images/pages/` - Assets de páginas

### Outros
- `/images/flags/` - Bandeiras (idiomas/países)
- `/images/logo/` - Logos diversos
- `/images/teacher-context/` - Contexto de professor
- `/images/tours/` - Tours guiados
- `/images/images-educa/` - Coleção geral Educacross

## 🎨 CSS Disponíveis

### Tailwind CSS
- `/css/tailwind/tailwind.css` - Tailwind completo
- `/css/tailwind/tailwind.min.css` - Versão minificada
- `/css/tailwind/base.css` - Base do Tailwind
- `/css/tailwind/components.css` - Componentes Tailwind
- `/css/tailwind/utilities.css` - Utilitários Tailwind
- `/css/tailwind/tailwind-experimental.css` - Features experimentais

### CSS Customizado
- `/css/main.css` - CSS principal do Educacross

## 🔤 Fontes Disponíveis

### Montserrat (Google Fonts)
- `/fonts/Montserrat/Montserrat-VariableFont_wght.ttf` - Variable font
- `/fonts/Montserrat/Montserrat-Italic-VariableFont_wght.ttf` - Italic variable
- `/fonts/Montserrat/static/` - Weights estáticos (Thin, Light, Regular, Medium, SemiBold, Bold, ExtraBold, Black)

### Dimbo (Fonte customizada Educacross)
- `/fonts/dimbo-regular.ttf` - Fonte display para títulos e destaque

### Como usar fontes
```css
@font-face {
  font-family: 'Dimbo';
  src: url('/fonts/dimbo-regular.ttf') format('truetype');
}

@font-face {
  font-family: 'Montserrat';
  src: url('/fonts/Montserrat/Montserrat-VariableFont_wght.ttf') format('truetype');
  font-weight: 100 900;
}
```

## 📝 Como Usar nas Stories

### Exemplo 1: Imagem simples
```javascript
export const Default = {
  render: () => `
    <img src="/images/educacross/logo-educacross.png" alt="Logo Educacross">
  `
};
```

### Exemplo 2: Avatar de corujinha
```javascript
const mascotImage = '<img src="/profile-corujinhas/5.png" alt="Corujinha 5">';
```

### Exemplo 3: Ícone de matéria
```javascript
export const MathSubject = {
  render: () => `
    <div class="subject-icon">
      <img src="/images/subjects/matematica.svg" alt="Matemática">
    </div>
  `
};
```

### Exemplo 4: Importar CSS
```javascript
// Em .storybook/preview.js ou preview-head.html
import '/css/tailwind/tailwind.css';
```

## 🔄 Atualização de Assets

Para atualizar os assets do educacross-frontoffice:

```powershell
# Copiar todas as imagens
Copy-Item -Path "educacross-frontoffice\src\assets\images\*" -Destination ".storybook\public\images\" -Recurse -Force

# Copiar CSS
Copy-Item -Path "educacross-frontoffice\src\assets\css\*" -Destination ".storybook\public\css\" -Recurse -Force
Copy-Item -Path "educacross-frontoffice\src\assets\tailwind\*" -Destination ".storybook\public\css\tailwind\" -Recurse -Force

# Copiar fontes
Copy-Item -Path "educacross-frontoffice\src\assets\fonts\*" -Destination ".storybook\public\fonts\" -Recurse -Force
```

## ⚠️ Notas Importantes

1. **Caminhos Absolutos**: Sempre use `/` no início (ex: `/images/logo.png`) para referenciar assets
2. **Cache do Browser**: Se uma imagem não aparecer após copiar, limpe o cache do navegador
3. **Hot Reload**: O Storybook pode precisar ser reiniciado após adicionar novos assets
4. **Tamanho**: Verifique o tamanho das imagens - use versões otimizadas quando possível
5. **SVGs**: Preferir SVGs para ícones (melhor escalabilidade)

## 📊 Estatísticas

- **Total de arquivos copiados**: ~350+ assets
- **Diretórios principais**: 35+
- **Formatos de imagem suportados**: PNG, SVG, JPG, WebP
- **Fontes**: Montserrat (18 variações) + Dimbo Regular
- **CSS modules**: Tailwind completo + customizações Educacross
- **Total estimado**: ~50MB de assets

## 🔗 Links Úteis

- [educacross-frontoffice source](../educacross-frontoffice/src/assets/)
- [Storybook static files docs](https://storybook.js.org/docs/react/configure/images-and-assets)
