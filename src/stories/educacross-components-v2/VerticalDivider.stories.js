/**
 * VerticalDivider - Vertical Separator Component
 * 
 * Separador vertical (divider) para uso inline entre elementos (breadcrumbs, navbar actions, metadata).
 * Customizável via CSS variables (--thickness, --height, --color, --spacing).
 * 
 * @component VerticalDivider
 * @category Educacross Components V2
 * @subcategory Layout
 * @priority P2
 * @status EXPANDED
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
  title: 'Front-office/Layout/VerticalDivider',
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
