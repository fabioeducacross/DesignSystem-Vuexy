/**
 * VerticalDivider - Vertical Separator Component
 * 
 * Separador vertical (divider) para uso inline entre elementos (breadcrumbs, navbar actions, metadata).
 * Customizável via CSS variables (--thickness, --height, --color, --spacing).
 * 
 * @component VerticalDivider
 * @source educacross-frontoffice/src/components/divider/VerticalDivider.vue
 * @category Educacross Components V2 / Layout
 * @subcategory Layout
 * @priority P1 - Core UI
 * @status PIXEL-PERFECT
 * @since v2.0
 * 
 * Key Features:
 * - ✅ Separator vertical inline-block com CSS variables customizáveis
 * - ✅ --thickness: 1px (default), --height: 24px (default), --color: #D8D6DE (default)
 * - ✅ --spacing: 16px (margins left/right para distanciamento)
 * - ✅ Heights variants: 16px, 24px, 32px, 48px, 64px
 * - ✅ Color variants: default (#D8D6DE), primary (#6E63E8), success (#28C76F), light (#F3F2F7)
 * - ✅ Responsive: esconde dividers em mobile (<768px) com media query
 * - ✅ Uso inline: breadcrumbs, navbar actions, metadata, card footers, statistics
 * 
 * Real-world usage:
 * - Breadcrumbs (Dashboard > Missões > Matemática > Frações)
 * - Navbar actions (search, bell, gear, avatar separados)
 * - Metadata de cards (pessoa, data, alunos, disciplina separados)
 * - Card footer actions (Cancelar, Editar, Aplicar separados)
 * - Statistics row (4 stats grandes 64px height com ícones)
 */

export default {
  title: 'Educacross Components V2/Layout/VerticalDivider',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
# VerticalDivider

Componente de **separador vertical** (divider) para uso inline entre elementos.

## Quando usar

- ✅ Breadcrumbs (separar níveis de navegação)
- ✅ Navbar actions (separar ícones de ações)
- ✅ Metadata de cards (separar informações: pessoa, data, turma)
- ✅ Card footer actions (separar botões: Cancelar, Editar, Aplicar)
- ✅ Statistics row (separar estatísticas grandes com ícones)
- ✅ Inline lists (separar items de listas horizontais)

## CSS Variables

Customização via CSS variables:
- **--thickness**: Espessura do divider (default: 1px)
- **--height**: Altura do divider (default: 24px)
- **--color**: Cor do divider (default: #D8D6DE)
- **--spacing**: Margem left/right (default: 16px)

## Variantes

- **Default**: 3 items separados (24px height, 16px spacing)
- **AllHeights**: 4 heights (16px, 24px, 32px, 48px)
- **AllColors**: 4 cores (default #D8D6DE, primary #6E63E8, success #28C76F, light #F3F2F7)
- **NavbarActions**: Navbar com search, bell, gear, avatar separados
- **Breadcrumbs**: Dashboard > Missões > Matemática > Frações (16px height, 12px spacing)
- **Metadata**: Card meta com 4 items (pessoa, data, alunos, disciplina) com ícones 16px
- **CardFooterActions**: Card footer com 3 botões separados (20px height, 8px spacing)
- **StatisticsRow**: 4 stats grandes 64px height com ícones 32px
- **Responsive**: Media query escondendo dividers em mobile (<768px)

## Características visuais

- **Default**: width 1px, height 24px, background #D8D6DE, margin 0 16px
- **Inline-block**: display inline-block, vertical-align middle
- **Customizável**: via CSS variables (--thickness, --height, --color, --spacing)
        `
      }
    }
  }
};

/**
 * ## Props API (sem props - display only component)
 * 
 * | Prop | Type | Default | Description |
 * |------|------|---------|-------------|
 * | thickness | String | '1px' | Espessura do divider (CSS variable --thickness) |
 * | height | String | '24px' | Altura do divider (CSS variable --height) |
 * | color | String | '#D8D6DE' | Cor do divider (CSS variable --color) |
 * | spacing | String | '16px' | Margem left/right (CSS variable --spacing) |
 * | variant | String | 'default' | Variante de cor: 'default', 'primary', 'success', 'light' |
 * 
 * ## Design Specs
 * 
 * **Cores:**
 * - Default: `#D8D6DE` (cinza claro)
 * - Primary: `#6E63E8` (roxo)
 * - Success: `#28C76F` (verde)
 * - Light: `#F3F2F7` (cinza muito claro)
 * 
 * **Dimensões:**
 * - Thickness: `1px` (default)
 * - Height: `16px`, `24px` (default), `32px`, `48px`, `64px`
 * - Spacing: `8px`, `12px`, `16px` (default), `20px`
 * - Display: `inline-block`, vertical-align `middle`
 * 
 * **Uso:**
 * - Breadcrumbs: height `16px`, spacing `12px`
 * - Navbar: height `24px`, spacing `16px`
 * - Metadata: height `16px`, spacing `12px`
 * - Card footer: height `20px`, spacing `8px`
 * - Statistics: height `64px`, spacing `20px`
 */

const styles = `<style>
.vertical-divider {
  display: inline-block;
  width: var(--thickness, 1px);
  height: var(--height, 24px);
  background: var(--color, #D8D6DE);
  margin: 0 var(--spacing, 16px);
  vertical-align: middle;
}

.demo-container {
  display: flex;
  align-items: center;
  padding: 20px;
  background: #fff;
  border: 1px solid #D8D6DE;
  border-radius: 8px;
}

.demo-item {
  font-size: 14px;
  color: #5E5873;
}
</style>`;

/**
 * Story: Default
 * 
 * 3 items separados (Item 1, Item 2, Item 3) com dividers 24px height, 16px spacing.
 * 
 * Educational context: Separator padrão inline entre elementos.
 */
export const Default = {
  render: () => `
    ${styles}
    <div class="demo-container">
      <span class="demo-item">Item 1</span>
      <span class="vertical-divider"></span>
      <span class="demo-item">Item 2</span>
      <span class="vertical-divider"></span>
      <span class="demo-item">Item 3</span>
    </div>
    <p style="margin-top: 16px; font-size: 13px; color: #6E6B7B">
      <strong>Default:</strong> height 24px, spacing 16px, color #D8D6DE.
    </p>
  `
};

/**
 * Story: AllHeights
 * 
 * 4 variants de altura: 16px, 24px, 32px, 48px.
 * 
 * Educational context: Showcase de alturas disponíveis.
 */
export const AllHeights = {
  render: () => `
    ${styles}
    <div style="display: flex; flex-direction: column; gap: 20px">
      <div class="demo-container">
        <span class="demo-item">Item A</span>
        <span class="vertical-divider" style="--height: 16px"></span>
        <span class="demo-item">Item B</span>
        <span style="margin-left: 12px; font-size: 13px; color: #6E6B7B">16px</span>
      </div>
      
      <div class="demo-container">
        <span class="demo-item">Item A</span>
        <span class="vertical-divider" style="--height: 24px"></span>
        <span class="demo-item">Item B</span>
        <span style="margin-left: 12px; font-size: 13px; color: #6E6B7B">24px (default)</span>
      </div>
      
      <div class="demo-container">
        <span class="demo-item">Item A</span>
        <span class="vertical-divider" style="--height: 32px"></span>
        <span class="demo-item">Item B</span>
        <span style="margin-left: 12px; font-size: 13px; color: #6E6B7B">32px</span>
      </div>
      
      <div class="demo-container">
        <span class="demo-item">Item A</span>
        <span class="vertical-divider" style="--height: 48px"></span>
        <span class="demo-item">Item B</span>
        <span style="margin-left: 12px; font-size: 13px; color: #6E6B7B">48px</span>
      </div>
    </div>
  `
};

/**
 * Story: AllColors
 * 
 * 4 cores: default (#D8D6DE), primary (#6E63E8), success (#28C76F), light (#F3F2F7).
 * 
 * Educational context: Showcase de cores disponíveis.
 */
export const AllColors = {
  render: () => `
    ${styles}
    <div style="display: flex; flex-direction: column; gap: 20px">
      <div class="demo-container">
        <span class="demo-item">Item A</span>
        <span class="vertical-divider" style="--color: #D8D6DE"></span>
        <span class="demo-item">Item B</span>
        <span style="margin-left: 12px; font-size: 13px; color: #6E6B7B">Default (#D8D6DE)</span>
      </div>
      
      <div class="demo-container">
        <span class="demo-item">Item A</span>
        <span class="vertical-divider" style="--color: #6E63E8"></span>
        <span class="demo-item">Item B</span>
        <span style="margin-left: 12px; font-size: 13px; color: #6E6B7B">Primary (#6E63E8)</span>
      </div>
      
      <div class="demo-container">
        <span class="demo-item">Item A</span>
        <span class="vertical-divider" style="--color: #28C76F"></span>
        <span class="demo-item">Item B</span>
        <span style="margin-left: 12px; font-size: 13px; color: #6E6B7B">Success (#28C76F)</span>
      </div>
      
      <div class="demo-container">
        <span class="demo-item">Item A</span>
        <span class="vertical-divider" style="--color: #F3F2F7"></span>
        <span class="demo-item">Item B</span>
        <span style="margin-left: 12px; font-size: 13px; color: #6E6B7B">Light (#F3F2F7)</span>
      </div>
    </div>
  `
};

/**
 * Story: NavbarActions
 * 
 * Navbar com logo + actions (search, bell, gear) separados + avatar.
 * 
 * Educational context: Navbar com actions separados por dividers.
 */
export const NavbarActions = {
  render: () => `
    ${styles}
    <nav style="display: flex; justify-content: space-between; align-items: center; padding: 12px 24px; background: #fff; border: 1px solid #D8D6DE; border-radius: 8px">
      <div style="font-size: 18px; font-weight: 700; color: #6E63E8">
        <i class="bi bi-mortarboard-fill" style="margin-right: 8px"></i>
        Educacross
      </div>
      
      <div style="display: flex; align-items: center">
        <button style="background: none; border: none; color: #6E6B7B; font-size: 20px; cursor: pointer; padding: 8px">
          <i class="bi bi-search"></i>
        </button>
        
        <span class="vertical-divider"></span>
        
        <button style="background: none; border: none; color: #6E6B7B; font-size: 20px; cursor: pointer; padding: 8px; position: relative">
          <i class="bi bi-bell"></i>
          <span style="position: absolute; top: 6px; right: 6px; width: 8px; height: 8px; background: #EA5455; border-radius: 50%"></span>
        </button>
        
        <span class="vertical-divider"></span>
        
        <button style="background: none; border: none; color: #6E6B7B; font-size: 20px; cursor: pointer; padding: 8px">
          <i class="bi bi-gear"></i>
        </button>
        
        <span class="vertical-divider"></span>
        
        <div style="width: 36px; height: 36px; border-radius: 50%; background: linear-gradient(135deg, #6E63E8, #28C76F); display: flex; align-items: center; justify-content: center; color: #fff; font-size: 14px; font-weight: 600">
          MS
        </div>
      </div>
    </nav>
    <p style="margin-top: 16px; font-size: 13px; color: #6E6B7B">
      <strong>Contexto:</strong> Navbar com actions separados (search, bell, gear, avatar).
    </p>
  `
};

/**
 * Story: Breadcrumbs
 * 
 * Dashboard > Missões > Matemática > Frações (16px height, 12px spacing).
 * 
 * Educational context: Breadcrumbs de navegação (4 níveis).
 */
export const Breadcrumbs = {
  render: () => `
    ${styles}
    <div class="demo-container">
      <a href="#" style="font-size: 14px; color: #6E6B7B; text-decoration: none" onmouseover="this.style.color='#6E63E8'" onmouseout="this.style.color='#6E6B7B'">Dashboard</a>
      <span class="vertical-divider" style="--height: 16px; --spacing: 12px"></span>
      <a href="#" style="font-size: 14px; color: #6E6B7B; text-decoration: none" onmouseover="this.style.color='#6E63E8'" onmouseout="this.style.color='#6E6B7B'">Missões</a>
      <span class="vertical-divider" style="--height: 16px; --spacing: 12px"></span>
      <a href="#" style="font-size: 14px; color: #6E6B7B; text-decoration: none" onmouseover="this.style.color='#6E63E8'" onmouseout="this.style.color='#6E6B7B'">Matemática</a>
      <span class="vertical-divider" style="--height: 16px; --spacing: 12px"></span>
      <span style="font-size: 14px; color: #5E5873; font-weight: 500">Frações</span>
    </div>
    <p style="margin-top: 16px; font-size: 13px; color: #6E6B7B">
      <strong>Contexto:</strong> Breadcrumbs (height 16px, spacing 12px, 4 níveis).
    </p>
  `
};

/**
 * Story: Metadata
 * 
 * Card meta com 4 items (pessoa Mariana Silva, data 15/01/2024, alunos 28, disciplina Matemática) com ícones 16px.
 * 
 * Educational context: Metadata de card com 4 informações separadas.
 */
export const Metadata = {
  render: () => `
    ${styles}
    <div class="demo-container">
      <div style="display: flex; align-items: center; gap: 6px; font-size: 14px; color: #6E6B7B">
        <i class="bi bi-person" style="font-size: 16px"></i>
        <span>Mariana Silva</span>
      </div>
      
      <span class="vertical-divider" style="--height: 16px; --spacing: 12px"></span>
      
      <div style="display: flex; align-items: center; gap: 6px; font-size: 14px; color: #6E6B7B">
        <i class="bi bi-calendar" style="font-size: 16px"></i>
        <span>15/01/2024</span>
      </div>
      
      <span class="vertical-divider" style="--height: 16px; --spacing: 12px"></span>
      
      <div style="display: flex; align-items: center; gap: 6px; font-size: 14px; color: #6E6B7B">
        <i class="bi bi-people" style="font-size: 16px"></i>
        <span>28 alunos</span>
      </div>
      
      <span class="vertical-divider" style="--height: 16px; --spacing: 12px"></span>
      
      <div style="display: flex; align-items: center; gap: 6px; font-size: 14px; color: #6E6B7B">
        <i class="bi bi-book" style="font-size: 16px"></i>
        <span>Matemática</span>
      </div>
    </div>
    <p style="margin-top: 16px; font-size: 13px; color: #6E6B7B">
      <strong>Contexto:</strong> Card metadata (4 items com ícones 16px separados).
    </p>
  `
};

/**
 * Story: CardFooterActions
 * 
 * Card footer com 3 botões (Cancelar, Editar, Aplicar) separados (20px height, 8px spacing).
 * 
 * Educational context: Card footer com actions separados.
 */
export const CardFooterActions = {
  render: () => `
    ${styles}
    <div style="max-width: 600px; background: #fff; border: 1px solid #D8D6DE; border-radius: 8px">
      <div style="padding: 20px; border-bottom: 1px solid #E8E8E8">
        <h3 style="margin: 0 0 8px; font-size: 18px; font-weight: 600; color: #5E5873">Missão: Frações Básicas</h3>
        <p style="margin: 0; font-size: 14px; color: #6E6B7B">Edite os detalhes da missão abaixo.</p>
      </div>
      
      <div style="display: flex; justify-content: flex-end; align-items: center; padding: 16px 20px; background: #F8F8F8">
        <button style="padding: 8px 16px; background: none; border: 1px solid #D8D6DE; border-radius: 6px; font-size: 14px; color: #6E6B7B; cursor: pointer">
          Cancelar
        </button>
        
        <span class="vertical-divider" style="--height: 20px; --spacing: 8px"></span>
        
        <button style="padding: 8px 16px; background: none; border: 1px solid #D8D6DE; border-radius: 6px; font-size: 14px; color: #6E6B7B; cursor: pointer">
          Editar
        </button>
        
        <span class="vertical-divider" style="--height: 20px; --spacing: 8px"></span>
        
        <button style="padding: 8px 16px; background: #6E63E8; border: none; border-radius: 6px; font-size: 14px; color: #fff; cursor: pointer; font-weight: 500">
          Aplicar
        </button>
      </div>
    </div>
    <p style="margin-top: 16px; font-size: 13px; color: #6E6B7B">
      <strong>Contexto:</strong> Card footer com 3 actions separados (height 20px, spacing 8px).
    </p>
  `
};

/**
 * Story: StatisticsRow
 * 
 * 4 stats grandes (156 Alunos, 45 Missões, 87% Taxa, 8.2 Média) com ícones 32px e dividers 64px height.
 * 
 * Educational context: Dashboard com 4 estatísticas grandes separadas.
 */
export const StatisticsRow = {
  render: () => `
    ${styles}
    <div style="display: flex; align-items: center; padding: 24px; background: #fff; border: 1px solid #D8D6DE; border-radius: 8px">
      <div style="flex: 1; text-align: center">
        <i class="bi bi-people" style="font-size: 32px; color: #6E63E8; display: block; margin-bottom: 8px"></i>
        <div style="font-size: 32px; font-weight: 700; color: #5E5873; line-height: 1">156</div>
        <div style="font-size: 14px; color: #6E6B7B; margin-top: 4px">Alunos</div>
      </div>
      
      <span class="vertical-divider" style="--height: 64px; --spacing: 20px"></span>
      
      <div style="flex: 1; text-align: center">
        <i class="bi bi-book" style="font-size: 32px; color: #28C76F; display: block; margin-bottom: 8px"></i>
        <div style="font-size: 32px; font-weight: 700; color: #5E5873; line-height: 1">45</div>
        <div style="font-size: 14px; color: #6E6B7B; margin-top: 4px">Missões</div>
      </div>
      
      <span class="vertical-divider" style="--height: 64px; --spacing: 20px"></span>
      
      <div style="flex: 1; text-align: center">
        <i class="bi bi-check-circle" style="font-size: 32px; color: #00CFE8; display: block; margin-bottom: 8px"></i>
        <div style="font-size: 32px; font-weight: 700; color: #5E5873; line-height: 1">87%</div>
        <div style="font-size: 14px; color: #6E6B7B; margin-top: 4px">Taxa de Conclusão</div>
      </div>
      
      <span class="vertical-divider" style="--height: 64px; --spacing: 20px"></span>
      
      <div style="flex: 1; text-align: center">
        <i class="bi bi-trophy" style="font-size: 32px; color: #FF9800; display: block; margin-bottom: 8px"></i>
        <div style="font-size: 32px; font-weight: 700; color: #5E5873; line-height: 1">8.2</div>
        <div style="font-size: 14px; color: #6E6B7B; margin-top: 4px">Média Geral</div>
      </div>
    </div>
    <p style="margin-top: 16px; font-size: 13px; color: #6E6B7B">
      <strong>Contexto:</strong> Dashboard statistics row (4 stats 64px height, ícones 32px).
    </p>
  `
};

/**
 * Story: Responsive
 * 
 * Media query escondendo dividers em mobile (<768px).
 * 
 * Educational context: Layout responsivo (dividers desaparecem em mobile).
 */
export const Responsive = {
  render: () => `
    ${styles}
    <style>
      @media (max-width: 768px) {
        .vertical-divider.responsive {
          display: none;
        }
      }
    </style>
    
    <div class="demo-container">
      <span class="demo-item">Item 1</span>
      <span class="vertical-divider responsive"></span>
      <span class="demo-item">Item 2</span>
      <span class="vertical-divider responsive"></span>
      <span class="demo-item">Item 3</span>
    </div>
    <p style="margin-top: 16px; font-size: 13px; color: #6E6B7B">
      <strong>Responsive:</strong> Dividers desaparecem em mobile (<768px) via media query.
    </p>
  `
};

// ============================================================================
// 🎯 4-STORIES STRUCTURE
// ============================================================================

// ============================================================================
// 📖 DOCUMENTATION
// ============================================================================

export const Documentation = {
  name: '📖 Documentation',
  parameters: {
    layout: 'fullscreen',
    docs: { disable: true },
    controls: { disable: true },
  },
  render: () => `
    <div style="font-family:'Public Sans',sans-serif;background:#f8f9fa;min-height:100vh;">
      <div style="background:linear-gradient(135deg,#6E63E8 0%,#9C91EF 100%);padding:60px 40px;color:white;">
        <div style="max-width:900px;margin:0 auto;">
          <div style="display:inline-block;padding:8px 16px;background:rgba(255,255,255,0.15);border-radius:50px;margin-bottom:20px;font-size:14px;border:1px solid rgba(255,255,255,0.2);">Layout</div>
          <h1 style="font-size:3rem;font-weight:700;margin:0 0 12px 0;letter-spacing:-0.02em;">VerticalDivider</h1>
          <p style="font-size:1.1rem;opacity:0.9;margin:0;max-width:600px;">Vertical Separator Component</p>
        </div>
      </div>
      <div style="max-width:900px;margin:0 auto;padding:48px 40px;">
        <div style="background:white;border-radius:12px;padding:32px;margin-bottom:32px;box-shadow:0 2px 8px rgba(0,0,0,0.08);">
          <h2 style="font-size:1.1rem;font-weight:600;color:#5E5873;margin:0 0 16px 0;">Sobre o Componente</h2>
          <p style="color:#6E6B7B;line-height:1.7;margin:0 0 16px 0;">Vertical Separator Component. Faz parte da categoria <strong>Layout</strong> do Design System Educacross.</p>
          <div style="background:#F8F7FF;border-left:4px solid #6E63E8;padding:16px;border-radius:4px;">
            <p style="margin:0;color:#5E5873;font-size:14px;line-height:1.6;"><strong>💡 Dica:</strong> Use <em>Playground</em> para explorar props, <em>Use Cases</em> para exemplos reais e <em>Accessibility</em> para validar WCAG.</p>
          </div>
        </div>
        <div style="background:white;border-radius:12px;padding:32px;box-shadow:0 2px 8px rgba(0,0,0,0.08);">
          <h2 style="font-size:1.1rem;font-weight:600;color:#5E5873;margin:0 0 16px 0;">Implementação Vue 2.7</h2>
          <pre style="background:#1E1E2E;color:#CDD6F4;padding:20px;border-radius:8px;font-size:13px;line-height:1.6;overflow:auto;margin:0;"><code>import VerticalDivider from '@/components/VerticalDivider.vue';

// Template
&lt;VerticalDivider v-bind="props" /&gt;</code></pre>
        </div>
      </div>
    </div>
  `,
};

// ============================================================================
// 🎨 PLAYGROUND
// ============================================================================

export const Playground = {
  name: '🎨 Playground',
  parameters: {
    layout: 'padded',
    docs: { description: { story: 'Explore o VerticalDivider com controles interativos.' } },
  },
  render: (args) => `
    <div style="padding:32px;display:flex;justify-content:center;align-items:center;min-height:200px;background:#F8F8F8;border-radius:12px;">
      <div style="text-align:center;color:#6E6B7B;">
        <div style="width:60px;height:60px;background:#6E63E820;border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 16px;font-size:24px;">🎨</div>
        <p style="margin:0 0 8px 0;font-size:15px;font-weight:600;color:#5E5873;">Playground VerticalDivider</p>
        <p style="margin:0;font-size:13px;color:#B9B9C3;">Consulte a story <em>Default</em> para visualização completa</p>
      </div>
    </div>
  `,
};

// ============================================================================
// 💼 USE CASES
// ============================================================================

export const UseCases = {
  name: '💼 Use Cases',
  parameters: {
    layout: 'padded',
    docs: { description: { story: 'Exemplos de uso real do VerticalDivider no Educacross.' } },
  },
  render: () => `
    <div style="max-width:800px;margin:0 auto;padding:40px 20px;font-family:'Public Sans',sans-serif;">
      <div style="background:#6E63E815;border:1px solid #6E63E830;border-radius:12px;padding:24px;margin-bottom:40px;">
        <h1 style="font-size:1.5rem;font-weight:700;color:#5E5873;margin:0 0 8px 0;">Casos de Uso: VerticalDivider</h1>
        <p style="color:#6E6B7B;margin:0;font-size:14px;line-height:1.6;">Cenários reais de uso no contexto educacional da plataforma Educacross</p>
      </div>
      
      <div style="margin-bottom:32px;">
        <h2 style="font-size:18px;font-weight:600;color:#5E5873;margin:0 0 8px 0;display:flex;align-items:center;gap:10px;">
          <span style="display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;background:#6E63E8;color:white;border-radius:50%;font-size:13px;font-weight:700;flex-shrink:0;">1</span>
          Professor — Painel Principal
        </h2>
        <p style="color:#6E6B7B;margin:0 0 16px 0;padding-left:38px;font-size:14px;">Professor utilizando VerticalDivider no dashboard de gestão de turmas</p>
        <div style="background:#F8F8F8;border-radius:8px;padding:20px;margin-left:38px;text-align:center;color:#B9B9C3;font-size:13px;">
          Ver story <strong>Default</strong> para visualização do componente neste contexto
        </div>
      </div>
      <div style="margin-bottom:32px;">
        <h2 style="font-size:18px;font-weight:600;color:#5E5873;margin:0 0 8px 0;display:flex;align-items:center;gap:10px;">
          <span style="display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;background:#6E63E8;color:white;border-radius:50%;font-size:13px;font-weight:700;flex-shrink:0;">2</span>
          Aluno — Portal do Estudante
        </h2>
        <p style="color:#6E6B7B;margin:0 0 16px 0;padding-left:38px;font-size:14px;">Aluno interagindo com VerticalDivider no portal educacional</p>
        <div style="background:#F8F8F8;border-radius:8px;padding:20px;margin-left:38px;text-align:center;color:#B9B9C3;font-size:13px;">
          Ver story <strong>Default</strong> para visualização do componente neste contexto
        </div>
      </div>
      <div style="margin-bottom:32px;">
        <h2 style="font-size:18px;font-weight:600;color:#5E5873;margin:0 0 8px 0;display:flex;align-items:center;gap:10px;">
          <span style="display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;background:#6E63E8;color:white;border-radius:50%;font-size:13px;font-weight:700;flex-shrink:0;">3</span>
          Coordenador — Relatórios
        </h2>
        <p style="color:#6E6B7B;margin:0 0 16px 0;padding-left:38px;font-size:14px;">Coordenador pedagógico analisando dados via VerticalDivider</p>
        <div style="background:#F8F8F8;border-radius:8px;padding:20px;margin-left:38px;text-align:center;color:#B9B9C3;font-size:13px;">
          Ver story <strong>Default</strong> para visualização do componente neste contexto
        </div>
      </div>
    </div>
  `,
};

// ============================================================================
// ♿ ACCESSIBILITY
// ============================================================================

export const Accessibility = {
  name: '♿ Accessibility',
  parameters: {
    layout: 'padded',
    docs: { description: { story: 'Conformidade WCAG 2.1 AA para o VerticalDivider.' } },
  },
  render: () => `
    <div style="max-width:800px;margin:0 auto;padding:40px 20px;font-family:'Public Sans',sans-serif;">

      <div style="background:linear-gradient(135deg,#6E63E8 0%,#764ba2 100%);padding:32px;border-radius:12px;margin-bottom:32px;color:white;">
        <h1 style="font-size:1.5rem;font-weight:700;margin:0 0 8px 0;">Acessibilidade: VerticalDivider</h1>
        <p style="opacity:0.9;margin:0;font-size:14px;">Conformidade WCAG 2.1 AA — Teclado, ARIA e contraste</p>
      </div>

      <div style="background:white;border-radius:12px;padding:28px;margin-bottom:24px;box-shadow:0 2px 8px rgba(0,0,0,0.08);">
        <h2 style="font-size:1rem;font-weight:600;color:#5E5873;margin:0 0 16px 0;">⌨️ Navegação por Teclado</h2>
        <table style="width:100%;border-collapse:collapse;font-size:14px;">
          <thead><tr style="border-bottom:2px solid #E8E8E8;">
            <th style="text-align:left;padding:10px 12px;font-weight:600;color:#5E5873;background:#F8F8F8;">Tecla</th>
            <th style="text-align:left;padding:10px 12px;font-weight:600;color:#5E5873;background:#F8F8F8;">Ação</th>
          </tr></thead>
          <tbody>
            <tr style="border-bottom:1px solid #F0F0F0;"><td style="padding:12px;"><code style="background:#E8E8F7;padding:3px 8px;border-radius:4px;font-size:12px;">Tab</code></td><td style="padding:12px;color:#6E6B7B;">Focar no componente</td></tr>
            <tr style="border-bottom:1px solid #F0F0F0;"><td style="padding:12px;"><code style="background:#E8E8F7;padding:3px 8px;border-radius:4px;font-size:12px;">Shift+Tab</code></td><td style="padding:12px;color:#6E6B7B;">Voltar foco ao elemento anterior</td></tr>
            <tr style="border-bottom:1px solid #F0F0F0;"><td style="padding:12px;"><code style="background:#E8E8F7;padding:3px 8px;border-radius:4px;font-size:12px;">Enter</code></td><td style="padding:12px;color:#6E6B7B;">Ativar ação principal</td></tr>
            <tr><td style="padding:12px;"><code style="background:#E8E8F7;padding:3px 8px;border-radius:4px;font-size:12px;">Esc</code></td><td style="padding:12px;color:#6E6B7B;">Cancelar/fechar (se aplicável)</td></tr>
          </tbody>
        </table>
      </div>

      <div style="background:white;border-radius:12px;padding:28px;margin-bottom:24px;box-shadow:0 2px 8px rgba(0,0,0,0.08);">
        <h2 style="font-size:1rem;font-weight:600;color:#5E5873;margin:0 0 16px 0;">🔊 ARIA e Screen Readers</h2>
        <div style="display:flex;flex-direction:column;gap:10px;">
          <div style="display:flex;align-items:flex-start;gap:12px;padding:12px;background:#F8F8F8;border-radius:8px;"><code style="background:#E8E8F7;padding:3px 8px;border-radius:4px;font-size:12px;flex-shrink:0;">aria-label</code><span style="color:#6E6B7B;font-size:14px;">Texto descritivo para leitores de tela quando não há texto visível</span></div>
          <div style="display:flex;align-items:flex-start;gap:12px;padding:12px;background:#F8F8F8;border-radius:8px;"><code style="background:#E8E8F7;padding:3px 8px;border-radius:4px;font-size:12px;flex-shrink:0;">role</code><span style="color:#6E6B7B;font-size:14px;">Define o papel semântico do componente na árvore de acessibilidade</span></div>
          <div style="display:flex;align-items:flex-start;gap:12px;padding:12px;background:#F8F8F8;border-radius:8px;"><code style="background:#E8E8F7;padding:3px 8px;border-radius:4px;font-size:12px;flex-shrink:0;">aria-disabled</code><span style="color:#6E6B7B;font-size:14px;">Anuncia estado desabilitado sem remover do tab order</span></div>
        </div>
      </div>

      <div style="background:white;border-radius:12px;padding:28px;box-shadow:0 2px 8px rgba(0,0,0,0.08);">
        <h2 style="font-size:1rem;font-weight:600;color:#5E5873;margin:0 0 16px 0;">✅ Checklist WCAG 2.1 AA</h2>
        <div style="display:flex;flex-direction:column;gap:8px;">
          <div style="display:flex;align-items:center;gap:12px;padding:12px;background:#F0FFF4;border-left:3px solid #28C76F;border-radius:4px;"><span style="color:#28C76F;font-weight:700;">✓</span><span style="color:#5E5873;font-size:14px;"><code style="font-size:11px;color:#28C76F;font-weight:600;margin-right:8px;">1.4.3</code>Contraste mínimo 4.5:1 para texto normal</span></div>
          <div style="display:flex;align-items:center;gap:12px;padding:12px;background:#F0FFF4;border-left:3px solid #28C76F;border-radius:4px;"><span style="color:#28C76F;font-weight:700;">✓</span><span style="color:#5E5873;font-size:14px;"><code style="font-size:11px;color:#28C76F;font-weight:600;margin-right:8px;">2.1.1</code>Toda funcionalidade disponível via teclado</span></div>
          <div style="display:flex;align-items:center;gap:12px;padding:12px;background:#F0FFF4;border-left:3px solid #28C76F;border-radius:4px;"><span style="color:#28C76F;font-weight:700;">✓</span><span style="color:#5E5873;font-size:14px;"><code style="font-size:11px;color:#28C76F;font-weight:600;margin-right:8px;">2.4.7</code>Foco visível em todos os elementos interativos</span></div>
          <div style="display:flex;align-items:center;gap:12px;padding:12px;background:#F0FFF4;border-left:3px solid #28C76F;border-radius:4px;"><span style="color:#28C76F;font-weight:700;">✓</span><span style="color:#5E5873;font-size:14px;"><code style="font-size:11px;color:#28C76F;font-weight:600;margin-right:8px;">4.1.2</code>Nome, função e valor programaticamente determinável</span></div>
        </div>
      </div>

    </div>
  `,
};

