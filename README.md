# DesignSystem-Vuexy

Design System based on Vuexy theme with Storybook.

## 📖 Overview

This project provides a component library based on the Vuexy theme, documented and showcased using Storybook. It includes reusable components with multiple variants, states, and comprehensive documentation.

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm 9+

### Installation

```bash
# Clone the repository
git clone https://github.com/fabioeducacross/DesignSystem-Vuexy.git

# Navigate to the project directory
cd DesignSystem-Vuexy

# Install dependencies
npm install
```

### Running Storybook

```bash
# Start Storybook development server
npm run storybook
```

Storybook will start on [http://localhost:6006](http://localhost:6006)

### Integrating Vuexy Template v10.9.0

**Important**: This project currently uses placeholder CSS. To integrate the actual Vuexy template:

```bash
# Option 1: Using the integration script (recommended)
npm run integrate-vuexy /path/to/vuexy-admin-v10.9.0/html-version

# Option 2: Manual integration
# See detailed guide: agent_helpers/INTEGRACAO_VUEXY.md
```

**Template Information**:
- Version: v10.9.0
- Source: `themeforest-lV6WYTyr-vuexy-vuejs-html-laravel-admin-dashboard-template/vuexy-admin-v10.9.0`
- See complete integration guide: [`agent_helpers/INTEGRACAO_VUEXY.md`](agent_helpers/INTEGRACAO_VUEXY.md)

### Building Storybook

```bash
# Build static Storybook for deployment
npm run build-storybook
```

## 📦 Components

Currently available components:

### Button
- **Variants**: Primary, Secondary, Success, Danger, Warning, Info
- **Sizes**: Small, Medium, Large
- **States**: Default, Disabled
- **Documentation**: Includes HTML, React, Vue2, and Vue3 code snippets

### Input
- **States**: Default, Disabled, Valid, Invalid
- **Features**: Placeholder support, value binding
- **Documentation**: Includes HTML, React, Vue2, and Vue3 code snippets

### Card
- **Features**: Optional header, customizable content
- **Variants**: With/without header, rich content, with buttons
- **Documentation**: Includes HTML, React, Vue2, and Vue3 code snippets

### Table
- **Features**: Hover effects, empty state
- **Variants**: Default, without hover, empty state, in card
- **Documentation**: Includes HTML, React, Vue2, and Vue3 code snippets

## 🎨 Theme

The project uses a Vuexy-inspired theme with the following color palette:

- **Primary**: `#7367F0` (Purple)
- **Secondary**: `#82868B` (Gray)
- **Success**: `#28C76F` (Green)
- **Danger**: `#EA5455` (Red)
- **Warning**: `#FF9F43` (Orange)
- **Info**: `#00CFE8` (Cyan)

### Theme Structure

```
packages/vuexy_theme/
└── public/
    └── vuexy/
        ├── css/           # Theme CSS files
        ├── fonts/         # Theme fonts
        ├── vendors/       # Third-party libraries
        ├── images/        # Theme images
        └── js/            # Theme JavaScript
```

## 📝 Documentation

All components include:
- Interactive controls in Storybook
- Multiple story variants
- Code snippets for HTML, React, Vue2, and Vue3
- Visual examples with Vuexy styling

## 🛠️ Development

### Project Structure

```
DesignSystem-Vuexy/
├── .storybook/              # Storybook configuration
│   ├── main.js             # Main config
│   └── preview.js          # Preview config with theme
├── agent_helpers/           # Agent workflow documentation
│   ├── README.md           # Workflow overview
│   ├── tarefas.md          # Task checklist
│   ├── decisoes.md         # Technical decisions log
│   └── validacao.md        # QA validation steps
├── packages/
│   └── vuexy_theme/        # Vuexy theme package
│       └── public/vuexy/   # Theme assets
├── src/
│   └── stories/
│       └── vuexy/          # Component stories
│           ├── Button.stories.js
│           ├── Input.stories.js
│           ├── Card.stories.js
│           └── Table.stories.js
└── package.json
```

### Adding New Components

1. Create a new story file in `src/stories/vuexy/`
2. Follow the existing component structure
3. Include multiple variants and states
4. Add code snippets in documentation
5. Use Vuexy CSS classes for styling

## 📋 Agent Workflow

This project includes detailed agent workflow documentation in the `agent_helpers/` directory:

- **README.md**: Overview of the development workflow
- **tarefas.md**: Complete task checklist
- **decisoes.md**: Technical decisions and rationale
- **validacao.md**: QA validation procedures

## 🔧 Configuration

### Storybook

Storybook is configured to:
- Use HTML rendering with Vite
- Serve static assets from `packages/vuexy_theme/public`
- Load Vuexy theme CSS globally
- Apply a global decorator for consistent styling

### Theme Loading

The Vuexy theme is loaded in `.storybook/preview.js` and applied globally to all stories with:
- Minimum height of 100vh
- Light gray background
- Consistent padding

## 🚧 Vuexy Template Integration

### Current Status

This project is **ready for Vuexy template integration**. Currently using placeholder CSS with Vuexy color palette.

### Template Information

- **Version**: v10.9.0
- **Source**: `themeforest-lV6WYTyr-vuexy-vuejs-html-laravel-admin-dashboard-template/vuexy-admin-v10.9.0`
- **Type**: VueJS + HTML + Laravel Admin Dashboard Template

### Integration Steps

#### Quick Start (Automated)

```bash
# Run the integration script
npm run integrate-vuexy /path/to/vuexy-admin-v10.9.0/html-version
```

#### Manual Integration

See the comprehensive guide: [`agent_helpers/INTEGRACAO_VUEXY.md`](agent_helpers/INTEGRACAO_VUEXY.md)

The guide includes:
- Step-by-step instructions
- Template structure analysis
- CSS loading configuration
- Component markup updates
- Troubleshooting tips
- Validation checklist

### What Will Change After Integration

1. ✅ **CSS**: Real Vuexy CSS replaces placeholder
2. ✅ **Fonts**: Montserrat, Feather Icons, Font Awesome
3. ✅ **Components**: Enhanced with exact Vuexy markup
4. ✅ **Visual Fidelity**: 100% match with Vuexy theme
5. ✅ **JavaScript**: Vuexy behaviors and interactions

### Files Ready for Integration

```
packages/vuexy_theme/public/vuexy/
├── css/          ← Replace with Vuexy CSS
├── fonts/        ← Add Vuexy fonts
├── vendors/      ← Add Vuexy vendors
├── js/           ← Add Vuexy JavaScript
└── images/       ← Add Vuexy images
```

### Post-Integration Tasks

After successful integration:

1. [ ] Update `.storybook/preview.js` with correct CSS order
2. [ ] Verify all 26 stories render correctly
3. [ ] Check for 404 errors in browser console
4. [ ] Validate font loading
5. [ ] Update component stories with real Vuexy markup
6. [ ] Add screenshots to documentation
7. [ ] Run full QA validation (see `agent_helpers/validacao.md`)

## 📄 License

ISC

## 👥 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Contact

For questions or support, please open an issue in the GitHub repository.
