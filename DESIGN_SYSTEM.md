# 🎨 Vuexy Design System

Design System completo baseado no tema Vuexy, construído com Storybook e pronto para uso em projetos externos.

## 📦 Acesso ao Design System

### 🌐 Storybook Online
Acesse a documentação completa do Design System:

**🔗 https://fabioeducacross.github.io/DesignSystem-Vuexy/**

> O Storybook é atualizado automaticamente a cada push na branch `main`

## ✨ Características

### 🎯 Foundations Completas
- **Cores**: Paleta completa do Vuexy com variantes e uso documentado
- **Tipografia**: Public Sans com hierarquia H1-H6, pesos e escalas
- **Espaçamento**: Grid system e spacing scale
- **Ícones**: 4 bibliotecas disponíveis (8000+ ícones)
  - Bootstrap Icons (2000+) - Recomendado
  - Font Awesome 6.7.2 (2000+ incluindo brands)
  - Tabler Icons (5000+ minimalistas)
  - Flag Icons (250+ bandeiras)
- **Imagens**: Sistema de placeholders SVG inline (zero dependências externas)

### 🧩 Componentes Implementados

#### Atoms (8)
- Avatar
- Badge
- Button
- Card
- Close Button
- Icon Button
- Link
- Pagination Item

#### Molecules (15)
- Alert
- Breadcrumb
- Button Group
- Dropdown
- Form Group
- Input Group
- List Group
- Notification
- Pagination
- Popover
- Progress Bar
- Stepper
- Tabs
- Toast
- Tooltip

#### Organisms (30+)
Navegação, formulários, data display, apps, charts, content...

#### Templates (10+)
Auth pages, dashboards, user profiles, error pages...

## 🚀 Como Usar em Projetos Externos

### 1. Explorar no Storybook
Acesse o Storybook online para:
- Ver todos os componentes disponíveis
- Copiar código HTML pronto
- Visualizar variantes e estados
- Entender padrões de uso

### 2. Copiar Assets Necessários

#### CSS do Vuexy
```html
<!-- Core CSS -->
<link rel="stylesheet" href="https://fabioeducacross.github.io/DesignSystem-Vuexy/vuexy/css/core.css">
```

#### Bibliotecas de Ícones
```html
<!-- Bootstrap Icons (Recomendado) -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">

<!-- Font Awesome (Opcional - para ícones de marcas) -->
<link rel="stylesheet" href="https://fabioeducacross.github.io/DesignSystem-Vuexy/vuexy/fonts/fontawesome.css">

<!-- Tabler Icons (Opcional) -->
<link rel="stylesheet" href="https://fabioeducacross.github.io/DesignSystem-Vuexy/vuexy/fonts/iconify-icons.css">
```

#### JavaScript (se necessário)
```html
<!-- jQuery (para componentes interativos) -->
<script src="https://fabioeducacross.github.io/DesignSystem-Vuexy/vuexy/vendors/libs/jquery/jquery.js"></script>

<!-- Bootstrap Bundle (JS + Popper) -->
<script src="https://fabioeducacross.github.io/DesignSystem-Vuexy/vuexy/js/bootstrap.js"></script>
```

### 3. Usar Placeholders SVG

Os placeholders estão disponíveis como funções JavaScript:

```javascript
// Copiar do Storybook: Foundations > Images > Interactive
import { AvatarPlaceholder, ProductPlaceholder } from './placeholders.js';

// Avatar
<img src="${AvatarPlaceholder('JD', '#7367f0', 40)}" class="rounded-circle">

// Produto
<img src="${ProductPlaceholder(150)}" alt="Product">
```

### 4. Copiar Componentes

Cada story no Storybook mostra o código HTML completo. Exemplo:

```html
<!-- Botão Primary do Storybook -->
<button type="button" class="btn btn-primary">
  <i class="bi bi-plus"></i> Adicionar
</button>

<!-- Alert Success -->
<div class="alert alert-success alert-dismissible fade show" role="alert">
  <i class="bi bi-check-circle me-2"></i>
  Operação realizada com sucesso!
  <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
</div>
```

## 📁 Estrutura do Projeto

```
DesignSystem-Vuexy/
├── .storybook/              # Configuração do Storybook
│   ├── main.js
│   ├── preview.js
│   └── preview-head.html    # Carregamento de assets
├── src/
│   └── stories/
│       ├── atoms/           # Componentes básicos
│       ├── molecules/       # Componentes compostos
│       ├── organisms/       # Seções complexas
│       ├── templates/       # Layouts de página
│       ├── foundations/     # Cores, tipografia, ícones, etc.
│       └── _helpers/        # Placeholders e utilitários
├── packages/
│   └── vuexy_theme/
│       └── public/
│           └── vuexy/       # Assets do tema Vuexy
│               ├── css/
│               ├── js/
│               ├── fonts/
│               └── vendors/
└── .github/
    └── workflows/
        └── deploy-storybook.yml  # CI/CD automático
```

## 🛠️ Desenvolvimento Local

### Pré-requisitos
- Node.js 20+
- npm

### Instalação
```bash
git clone https://github.com/fabioeducacross/DesignSystem-Vuexy.git
cd DesignSystem-Vuexy
npm install
```

### Executar Storybook
```bash
npm run storybook
```
Abre em `http://localhost:6006`

### Build de Produção
```bash
npm run build-storybook
```
Gera arquivos em `storybook-static/`

## 🎯 Padrões de Uso

### Nomenclatura de Classes
- Seguir convenções do Bootstrap 5.3
- Usar classes utilitárias quando disponível
- Prefixo `btn-` para botões, `alert-` para alertas, etc.

### Cores
- Primary: `#7367f0` (roxo)
- Success: `#28c76f` (verde)
- Warning: `#ff9f43` (laranja)
- Danger: `#ff4c51` (vermelho)
- Info: `#00bad1` (ciano)

### Ícones
- **Preferir Bootstrap Icons** para consistência
- Font Awesome apenas para ícones de marcas (social media)
- Tabler Icons para casos específicos não cobertos

### Responsividade
- Mobile-first approach
- Breakpoints: xs, sm, md, lg, xl, xxl
- Usar classes responsivas: `d-none d-md-block`, `col-12 col-md-6`

## 📝 Documentação

- **Storybook Online**: https://fabioeducacross.github.io/DesignSystem-Vuexy/
- **Getting Started**: Ver story "Getting Started" no Storybook
- **Foundations**: Ver seção "Foundations" para cores, tipografia, ícones
- **Exemplos de Código**: Cada componente tem code snippets prontos

## 🚢 Deploy e CI/CD

- **Deploy Automático**: A cada push na `main`, o Storybook é rebuilded e publicado
- **GitHub Actions**: `.github/workflows/deploy-storybook.yml`
- **GitHub Pages**: Servindo em `https://fabioeducacross.github.io/DesignSystem-Vuexy/`
- **Build Time**: ~30 segundos

## 📊 Status

✅ **Foundations**: 100% completas (Cores, Tipografia, Ícones, Imagens, Espaçamento)  
✅ **Atoms**: 8 componentes  
✅ **Molecules**: 15 componentes  
✅ **Organisms**: 30+ componentes  
✅ **Templates**: 10+ layouts  
✅ **Zero Dependências Externas**: Imagens inline SVG  
✅ **Zero 404s**: Todos os assets carregando corretamente  
✅ **Offline Ready**: Funciona sem internet (exceto Bootstrap Icons CDN)  

## 🤝 Contribuindo

1. Fork o repositório
2. Crie uma branch: `git checkout -b feature/nova-feature`
3. Commit: `git commit -m 'feat: Adiciona nova feature'`
4. Push: `git push origin feature/nova-feature`
5. Abra um Pull Request

## 📄 Licença

Este projeto é baseado no tema Vuexy. Consulte a licença do tema original para uso comercial.

## 👥 Autor

**Educacross Team**
- GitHub: [@fabioeducacross](https://github.com/fabioeducacross)

---

**📌 URL do Design System**: https://fabioeducacross.github.io/DesignSystem-Vuexy/

Feito com ❤️ usando Storybook e Vuexy
