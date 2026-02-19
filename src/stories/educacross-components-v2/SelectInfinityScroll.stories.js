/**
 * SelectInfinityScroll - Educational Select with Infinite Scroll
 * ==============================================================
 * Select com scroll infinito para listas grandes (alunos, missões, turmas)
 * 
 * @component SelectInfinityScroll
 * @source educacross-frontoffice/src/components/selects/SelectInfinityScroll.vue
 * @category Forms
 * @priority P1 - Core UI
 * @status PIXEL-PERFECT
 * 
 * ## Contexto Educacional
 * - **Professor**: Selecionar alunos de grandes turmas, escolher missões de biblioteca extensa
 * - **Coordenador**: Filtrar turmas de toda escola, selecionar professores
 * - **Sistema**: Listas com 100+, 500+, 1000+ itens (performance crítica)
 * 
 * ## Casos de Uso
 * - Lista de 100+ alunos para aplicar missão
 * - Biblioteca com 500+ missões disponíveis
 * - Seleção de turmas em escola com muitas salas
 * - Histórico de atividades do ano letivo
 * - Bancos de questões extensos
 * - Catálogo completo de conteúdos BNCC
 * 
 * ## Props API
 * @prop {Array} options - Array de opções { id, label, ...extra }
 * @prop {*} value - Valor selecionado (id ou objeto)
 * @prop {boolean} loading - Estado de carregamento
 * @prop {boolean} hasMore - Indica se há mais itens para carregar
 * @prop {Function} onLoadMore - Callback quando scroll chega ao fim
 * @prop {string} placeholder - Texto placeholder
 * @prop {boolean} searchable - Habilita busca
 * @prop {boolean} clearable - Permite limpar seleção
 * @prop {boolean} disabled - Desabilita interação
 * @prop {string} size - Tamanho: 'sm', 'md', 'lg'
 * @prop {number} pageSize - Quantidade de itens por página (padrão: 20)
 * 
 * ## Figma Design Specs
 * 
 * ### Dimensões
 * - **Small (sm)**: height 32px, font-size 13px, dropdown max-height 200px
 * - **Medium (md)**: height 38px, font-size 14px, dropdown max-height 300px
 * - **Large (lg)**: height 46px, font-size 16px, dropdown max-height 400px
 * - **Item Height**: 36px (md), 32px (sm), 40px (lg)
 * - **Loader Height**: 40px
 * - **Border**: 1px solid
 * - **Border Radius**: 6px
 * 
 * ### Cores
 * - **Border**: #D8D6DE
 * - **Border Focus**: #6E63E8
 * - **Background**: #FFFFFF
 * - **Dropdown BG**: #FFFFFF
 * - **Item Hover**: #F8F9FA
 * - **Item Selected**: #E8F5E9 (verde claro)
 * - **Item Active**: #6E63E8 (background azul)
 * - **Text**: #5E5873
 * - **Placeholder**: #B8C2CC
 * - **Loader**: #6E63E8
 * - **Scroll Indicator**: #E0E0E0
 * - **Focus Ring**: rgba(110, 99, 232, 0.25)
 * 
 * ### Tipografia
 * - **Font Family**: Inter, sans-serif
 * - **Font Weight**: 400 (regular), 500 (selected)
 * - **Line Height**: 1.5
 * 
 * ### Comportamento Scroll Infinito
 * - Carrega 20 itens iniciais
 * - Ao chegar a 80% do scroll, carrega próxima página
 * - Loader visível durante carregamento
 * - Smooth scroll para melhor UX
 * - Mantém posição do scroll após carregar mais
 * - Throttle de 300ms para evitar requisições excessivas
 * 
 * ### Acessibilidade
 * - role: combobox
 * - aria-expanded: estado do dropdown
 * - aria-activedescendant: item com foco
 * - aria-busy: carregando mais itens
 * - Keyboard: ↑↓ navega, Enter seleciona, Esc fecha, Tab navega
 * - Focus visible em todos os elementos
 * - Screen reader anuncia quantidade de itens e carregamento
 * 
 * ## Integração Vue 2.7
 * ```vue
 * <SelectInfinityScroll
 *   v-model="selectedStudent"
 *   :options="students"
 *   :loading="loadingMore"
 *   :hasMore="hasMoreStudents"
 *   @loadMore="loadNextPage"
 *   placeholder="Selecione um aluno..."
 *   searchable
 * />
 * ```
 */

export default {
  title: 'Educacross Components V2/Forms/SelectInfinityScroll',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
Select com scroll infinito otimizado para listas grandes (100+, 500+, 1000+ itens).

---

## Contexto de Uso

### Professor
Selecionar alunos de turmas grandes (100+ estudantes), escolher missões de biblioteca extensa (500+ atividades), filtrar conteúdos BNCC.

### Coordenador
Selecionar turmas de toda escola, filtrar professores, visualizar histórico completo de atividades do ano letivo.

### Sistema
Performance crítica para listas com centenas ou milhares de itens. Carregamento sob demanda evita travamentos.

---

## Especificações Técnicas (Figma)

### 📐 Dimensões
\`\`\`
Control Height:
- sm: 32px
- md: 38px  (padrão)
- lg: 46px

Dropdown Max-Height:
- sm: 200px
- md: 300px
- lg: 400px

Item Height:
- sm: 32px
- md: 36px
- lg: 40px

Loader: 40px fixo
Border: 1px solid
Border Radius: 6px
\`\`\`

### 🎨 Cores
\`\`\`css
Border: #D8D6DE
Border Focus: #6E63E8
Background: #FFFFFF
Dropdown BG: #FFFFFF
Item Hover: #F8F9FA
Item Selected: #E8F5E9 (verde claro)
Item Active: #6E63E8 (fundo azul, texto branco)
Text: #5E5873
Placeholder: #B8C2CC
Loader: #6E63E8
Focus Ring: rgba(110, 99, 232, 0.25) com 4px blur
\`\`\`

### 🔤 Tipografia
\`\`\`
Font Family: Inter, sans-serif
Font Size: 13px (sm) | 14px (md) | 16px (lg)
Font Weight: 400 (regular) | 500 (selected item)
Line Height: 1.5
\`\`\`

### ⚡ Comportamento
\`\`\`
Carregamento Inicial: 20 itens
Trigger Scroll: 80% da altura do dropdown
Throttle: 300ms entre requisições
Smooth Scroll: mantém posição após carregar mais
Busca: filtro local em tempo real
Contador: "X de Y itens carregados"
\`\`\`

### ♿ Acessibilidade
- **role**: combobox
- **aria-expanded**: true/false (dropdown aberto/fechado)
- **aria-activedescendant**: ID do item com foco
- **aria-busy**: true durante carregamento
- **Keyboard**: ↑↓ navega itens, Enter seleciona, Esc fecha, Tab sai
- **Focus visible**: outline em todos elementos interativos
- **Screen reader**: anuncia "X de Y itens carregados", "Carregando mais itens..."

---

## Props API
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| options | Array | [] | Array de { id, label, ...extra } |
| value | * | null | Valor selecionado (id ou objeto) |
| loading | Boolean | false | Estado de carregamento |
| hasMore | Boolean | false | Há mais itens para carregar |
| onLoadMore | Function | - | Callback ao scroll chegar a 80% |
| placeholder | String | - | Texto quando vazio |
| searchable | Boolean | true | Habilita campo de busca |
| clearable | Boolean | true | Permite limpar seleção |
| disabled | Boolean | false | Desabilita interação |
| size | String | 'md' | Tamanho: 'sm', 'md', 'lg' |
| pageSize | Number | 20 | Itens por página |

---

## Integração Vue 2.7
\`\`\`vue
<template>
  <SelectInfinityScroll
    v-model="selectedStudent"
    :options="students"
    :loading="loadingMore"
    :hasMore="hasMoreStudents"
    @loadMore="loadNextPage"
    placeholder="Selecione um aluno..."
    searchable
    size="md"
  />
</template>

<script>
export default {
  data() {
    return {
      selectedStudent: null,
      students: [],
      loadingMore: false,
      hasMoreStudents: true,
      currentPage: 1,
    };
  },
  methods: {
    async loadNextPage() {
      this.loadingMore = true;
      const nextStudents = await this.fetchStudents(this.currentPage + 1);
      this.students.push(...nextStudents);
      this.currentPage++;
      this.hasMoreStudents = nextStudents.length === 20;
      this.loadingMore = false;
    }
  }
};
</script>
\`\`\`

---

## Features
- ✅ Scroll infinito com carregamento sob demanda
- ✅ Busca/filtro local em tempo real
- ✅ 3 tamanhos responsivos (sm, md, lg)
- ✅ Loading spinner durante carregamento
- ✅ Contador "X de Y itens carregados"
- ✅ Performance otimizada (throttle 300ms)
- ✅ Estados: default, hover, focus, selected, disabled
- ✅ Acessibilidade completa (WCAG 2.1 AA)
- ✅ Contexto educacional (100+ alunos, 500+ missões)
        `
      }
    }
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Tamanho do componente',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'md' }
      }
    },
    placeholder: {
      control: 'text',
      description: 'Texto placeholder',
      table: {
        type: { summary: 'string' }
      }
    },
    searchable: {
      control: 'boolean',
      description: 'Habilita busca',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' }
      }
    },
    clearable: {
      control: 'boolean',
      description: 'Permite limpar seleção',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' }
      }
    },
    disabled: {
      control: 'boolean',
      description: 'Desabilita interação',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' }
      }
    }
  }
};

// Dados educacionais - 100 alunos simulados
const generate100Students = () => {
  const nomes = [
    'Ana Silva', 'Bruno Santos', 'Carlos Oliveira', 'Daniela Costa', 'Eduardo Souza',
    'Fernanda Lima', 'Gabriel Alves', 'Helena Rodrigues', 'Igor Pereira', 'Juliana Martins',
    'Kaique Ferreira', 'Larissa Gomes', 'Mateus Ribeiro', 'Natália Barbosa', 'Otávio Cardoso',
    'Paula Mendes', 'Rafael Araújo', 'Sofia Nascimento', 'Thiago Carvalho', 'Vitória Dias'
  ];
  
  const turmas = ['5º A', '5º B', '6º A', '6º B', '7º A'];
  
  return Array.from({ length: 100 }, (_, i) => ({
    id: i + 1,
    label: `${nomes[i % 20]} - ${turmas[Math.floor(i / 20)]}`,
    turma: turmas[Math.floor(i / 20)],
    nome: nomes[i % 20]
  }));
};

const allStudents = generate100Students();

// Estilos do componente
const styles = `
<style>
  .select-infinity-wrapper {
    position: relative;
    width: 400px;
    max-width: 100%;
  }
  
  .select-infinity-control {
    width: 100%;
    height: var(--height);
    padding: var(--padding);
    font-size: var(--font-size);
    font-family: Inter, sans-serif;
    color: #5E5873;
    background: #fff;
    border: 1px solid #D8D6DE;
    border-radius: 6px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    transition: all 0.2s;
  }
  
  .select-infinity-control:hover:not(.disabled) {
    border-color: #6E63E8;
  }
  
  .select-infinity-control:focus,
  .select-infinity-control.open {
    outline: none;
    border-color: #6E63E8;
    box-shadow: 0 0 0 4px rgba(110, 99, 232, 0.25);
  }
  
  .select-infinity-control.disabled {
    background: #F8F8F8;
    cursor: not-allowed;
    opacity: 0.6;
  }
  
  .select-infinity-placeholder {
    color: #B8C2CC;
    flex: 1;
  }
  
  .select-infinity-value {
    color: #5E5873;
    flex: 1;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  
  .select-infinity-icons {
    display: flex;
    gap: 4px;
    align-items: center;
    flex-shrink: 0;
  }
  
  .select-infinity-icon {
    color: #6E6B7B;
    font-size: 18px;
    cursor: pointer;
    padding: 2px;
  }
  
  .select-infinity-icon:hover {
    color: #6E63E8;
  }
  
  .select-infinity-dropdown {
    position: absolute;
    top: calc(100% + 4px);
    left: 0;
    right: 0;
    background: #fff;
    border: 1px solid #D8D6DE;
    border-radius: 6px;
    box-shadow: 0 4px 16px rgba(0,0,0,0.1);
    z-index: 1000;
    max-height: var(--dropdown-height);
    display: none;
    flex-direction: column;
  }
  
  .select-infinity-dropdown.open {
    display: flex;
  }
  
  .select-infinity-search {
    padding: 8px 12px;
    border-bottom: 1px solid #E0E0E0;
    flex-shrink: 0;
  }
  
  .select-infinity-search input {
    width: 100%;
    padding: 6px 10px;
    font-size: 13px;
    border: 1px solid #D8D6DE;
    border-radius: 4px;
    font-family: Inter, sans-serif;
  }
  
  .select-infinity-search input:focus {
    outline: none;
    border-color: #6E63E8;
  }
  
  .select-infinity-list {
    overflow-y: auto;
    overflow-x: hidden;
    flex: 1;
  }
  
  .select-infinity-item {
    padding: 8px 12px;
    cursor: pointer;
    font-size: var(--font-size);
    color: #5E5873;
    display: flex;
    align-items: center;
    gap: 8px;
    min-height: var(--item-height);
    transition: background 0.1s;
  }
  
  .select-infinity-item:hover {
    background: #F8F9FA;
  }
  
  .select-infinity-item.selected {
    background: #E8F5E9;
    font-weight: 500;
  }
  
  .select-infinity-item.active {
    background: #6E63E8;
    color: #fff;
  }
  
  .select-infinity-loader {
    padding: 12px;
    text-align: center;
    color: #6E6B7B;
    font-size: 13px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    border-top: 1px solid #E0E0E0;
  }
  
  .select-infinity-spinner {
    width: 16px;
    height: 16px;
    border: 2px solid #E0E0E0;
    border-top-color: #6E63E8;
    border-radius: 50%;
    animation: spin 0.6s linear infinite;
  }
  
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
  
  .select-infinity-empty {
    padding: 20px;
    text-align: center;
    color: #B8C2CC;
    font-size: 13px;
  }
  
  .select-infinity-counter {
    padding: 6px 12px;
    font-size: 11px;
    color: #6E6B7B;
    border-top: 1px solid #E0E0E0;
    text-align: center;
    background: #F8F9FA;
  }
  
  /* Sizes */
  .size-sm {
    --height: 32px;
    --padding: 6px 10px;
    --font-size: 13px;
    --dropdown-height: 200px;
    --item-height: 32px;
  }
  
  .size-md {
    --height: 38px;
    --padding: 8px 12px;
    --font-size: 14px;
    --dropdown-height: 300px;
    --item-height: 36px;
  }
  
  .size-lg {
    --height: 46px;
    --padding: 10px 14px;
    --font-size: 16px;
    --dropdown-height: 400px;
    --item-height: 40px;
  }
</style>
`;

// Story 1: Default - Seleção básica com 100 alunos
export const Default = {
  args: {
    size: 'md',
    placeholder: 'Selecione um aluno...',
    searchable: true,
    clearable: true,
    disabled: false
  },
  render: (args) => {
    return `
      ${styles}
      <div class="select-infinity-wrapper size-${args.size}">
        <div class="select-infinity-control" tabindex="0" onclick="this.classList.toggle('open'); this.nextElementSibling.classList.toggle('open')">
          <span class="select-infinity-placeholder">${args.placeholder}</span>
          <div class="select-infinity-icons">
            ${args.clearable ? '<i class="select-infinity-icon bi bi-x-circle"></i>' : ''}
            <i class="select-infinity-icon bi bi-chevron-down"></i>
          </div>
        </div>
        <div class="select-infinity-dropdown">
          ${args.searchable ? '<div class="select-infinity-search"><input type="text" placeholder="Buscar..." /></div>' : ''}
          <div class="select-infinity-list">
            ${allStudents.slice(0, 20).map(s => `
              <div class="select-infinity-item">${s.label}</div>
            `).join('')}
          </div>
          <div class="select-infinity-counter">20 de 100 alunos carregados</div>
        </div>
      </div>
      <p style="margin-top: 16px; font-size: 13px; color: #6E6B7B;">
        <strong>Contexto:</strong> Professor da Escola Municipal seleciona aluno do 5º ano para aplicar missão de Matemática.
      </p>
    `;
  }
};

// Story 2: WithManyItems - 100 alunos carregados
export const WithManyItems = {
  args: {
    size: 'md',
    placeholder: 'Buscar aluno...',
    searchable: true
  },
  render: (args) => `
    ${styles}
    <div class="select-infinity-wrapper size-${args.size}">
      <div class="select-infinity-control" tabindex="0">
        <span class="select-infinity-value">Ana Silva - 5º A</span>
        <div class="select-infinity-icons">
          <i class="select-infinity-icon bi bi-x-circle"></i>
          <i class="select-infinity-icon bi bi-chevron-down"></i>
        </div>
      </div>
      <div class="select-infinity-dropdown open">
        <div class="select-infinity-search"><input type="text" placeholder="Buscar..." value="Ana" /></div>
        <div class="select-infinity-list">
          ${allStudents.filter(s => s.nome.includes('Ana')).map(s => `
            <div class="select-infinity-item ${s.id === 1 ? 'selected' : ''}">${s.label}</div>
          `).join('')}
        </div>
        <div class="select-infinity-counter">100 de 100 alunos carregados</div>
      </div>
    </div>
    <p style="margin-top: 16px; font-size: 13px; color: #6E6B7B;">
      <strong>Contexto:</strong> Coordenador visualiza lista completa de 100 alunos com busca ativa.
    </p>
  `
};

// Story 3: Loading - Carregando mais itens
export const Loading = {
  args: {
    size: 'md'
  },
  render: (args) => `
    ${styles}
    <div class="select-infinity-wrapper size-${args.size}">
      <div class="select-infinity-control open" tabindex="0">
        <span class="select-infinity-placeholder">Selecione um aluno...</span>
        <div class="select-infinity-icons">
          <i class="select-infinity-icon bi bi-chevron-down"></i>
        </div>
      </div>
      <div class="select-infinity-dropdown open">
        <div class="select-infinity-list">
          ${allStudents.slice(0, 20).map(s => `
            <div class="select-infinity-item">${s.label}</div>
          `).join('')}
        </div>
        <div class="select-infinity-loader">
          <div class="select-infinity-spinner"></div>
          <span>Carregando mais itens...</span>
        </div>
        <div class="select-infinity-counter">20 de 100 alunos carregados</div>
      </div>
    </div>
    <p style="margin-top: 16px; font-size: 13px; color: #6E6B7B;">
      <strong>Contexto:</strong> Sistema carrega próximos 20 alunos quando scroll chega a 80% da lista.
    </p>
  `
};

// Story 4: AllSizes - Comparação de tamanhos
export const AllSizes = {
  render: () => `
    ${styles}
    <div style="display: flex; flex-direction: column; gap: 20px; width: 400px;">
      <div>
        <label style="display: block; margin-bottom: 8px; font-size: 13px; font-weight: 500;">Small (32px)</label>
        <div class="select-infinity-wrapper size-sm">
          <div class="select-infinity-control" tabindex="0">
            <span class="select-infinity-value">Bruno Santos - 5º B</span>
            <div class="select-infinity-icons">
              <i class="select-infinity-icon bi bi-chevron-down"></i>
            </div>
          </div>
        </div>
      </div>
      
      <div>
        <label style="display: block; margin-bottom: 8px; font-size: 14px; font-weight: 500;">Medium (38px) - Padrão</label>
        <div class="select-infinity-wrapper size-md">
          <div class="select-infinity-control" tabindex="0">
            <span class="select-infinity-value">Carlos Oliveira - 6º A</span>
            <div class="select-infinity-icons">
              <i class="select-infinity-icon bi bi-chevron-down"></i>
            </div>
          </div>
        </div>
      </div>
      
      <div>
        <label style="display: block; margin-bottom: 8px; font-size: 16px; font-weight: 500;">Large (46px)</label>
        <div class="select-infinity-wrapper size-lg">
          <div class="select-infinity-control" tabindex="0">
            <span class="select-infinity-value">Daniela Costa - 6º B</span>
            <div class="select-infinity-icons">
              <i class="select-infinity-icon bi bi-chevron-down"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
};

// Story 5: Disabled - Estado desabilitado
export const Disabled = {
  args: {
    size: 'md',
    disabled: true
  },
  render: (args) => `
    ${styles}
    <div class="select-infinity-wrapper size-${args.size}">
      <div class="select-infinity-control disabled">
        <span class="select-infinity-value">Eduardo Souza - 7º A</span>
        <div class="select-infinity-icons">
          <i class="select-infinity-icon bi bi-chevron-down"></i>
        </div>
      </div>
    </div>
    <p style="margin-top: 16px; font-size: 13px; color: #6E6B7B;">
      <strong>Contexto:</strong> Select desabilitado quando missão já foi aplicada (não permite alterar aluno).
    </p>
  `
};

// Story 6: SearchActive - Busca ativa filtrando
export const SearchActive = {
  args: {
    size: 'md'
  },
  render: (args) => `
    ${styles}
    <div class="select-infinity-wrapper size-${args.size}">
      <div class="select-infinity-control open" tabindex="0">
        <span class="select-infinity-placeholder">Selecione um aluno...</span>
        <div class="select-infinity-icons">
          <i class="select-infinity-icon bi bi-chevron-down"></i>
        </div>
      </div>
      <div class="select-infinity-dropdown open">
        <div class="select-infinity-search"><input type="text" placeholder="Buscar..." value="Gabriel" /></div>
        <div class="select-infinity-list">
          ${allStudents.filter(s => s.nome.includes('Gabriel')).map(s => `
            <div class="select-infinity-item">${s.label}</div>
          `).join('')}
        </div>
        <div class="select-infinity-counter">${allStudents.filter(s => s.nome.includes('Gabriel')).length} resultados encontrados</div>
      </div>
    </div>
    <p style="margin-top: 16px; font-size: 13px; color: #6E6B7B;">
      <strong>Contexto:</strong> Professor busca "Gabriel" e sistema filtra 5 alunos com esse nome.
    </p>
  `
};

// Story 7: EmptySearch - Busca sem resultados
export const EmptySearch = {
  args: {
    size: 'md'
  },
  render: (args) => `
    ${styles}
    <div class="select-infinity-wrapper size-${args.size}">
      <div class="select-infinity-control open" tabindex="0">
        <span class="select-infinity-placeholder">Selecione um aluno...</span>
        <div class="select-infinity-icons">
          <i class="select-infinity-icon bi bi-chevron-down"></i>
        </div>
      </div>
      <div class="select-infinity-dropdown open">
        <div class="select-infinity-search"><input type="text" placeholder="Buscar..." value="Zezinho" /></div>
        <div class="select-infinity-empty">
          <i class="bi bi-search" style="font-size: 32px; color: #D8D6DE; display: block; margin-bottom: 8px;"></i>
          Nenhum aluno encontrado com "Zezinho"
        </div>
      </div>
    </div>
    <p style="margin-top: 16px; font-size: 13px; color: #6E6B7B;">
      <strong>Contexto:</strong> Busca não encontrou resultados. Sistema sugere verificar ortografia.
    </p>
  `
};

// Story 8: AplicarMissaoEm100Alunos - Caso de uso real
export const AplicarMissaoEm100Alunos = {
  args: {
    size: 'md'
  },
  render: (args) => `
    ${styles}
    <div style="max-width: 600px;">
      <div style="background: #fff; padding: 24px; border-radius: 8px; border: 1px solid #D8D6DE;">
        <h3 style="margin: 0 0 8px; font-size: 18px; font-weight: 600;">Aplicar Missão: Frações Básicas</h3>
        <p style="margin: 0 0 20px; font-size: 13px; color: #6E6B7B;">Disciplina: Matemática | Duração: 45 min | 10 questões</p>
        
        <label style="display: block; margin-bottom: 8px; font-size: 14px; font-weight: 500;">Selecionar Alunos</label>
        <div class="select-infinity-wrapper size-${args.size}">
          <div class="select-infinity-control" tabindex="0" onclick="this.classList.toggle('open'); this.nextElementSibling.classList.toggle('open')">
            <span class="select-infinity-placeholder">Selecione os alunos para esta missão...</span>
            <div class="select-infinity-icons">
              <i class="select-infinity-icon bi bi-chevron-down"></i>
            </div>
          </div>
          <div class="select-infinity-dropdown">
            <div class="select-infinity-search"><input type="text" placeholder="Buscar aluno por nome..." /></div>
            <div class="select-infinity-list">
              ${allStudents.slice(0, 20).map(s => `
                <div class="select-infinity-item">${s.label}</div>
              `).join('')}
            </div>
            <div class="select-infinity-loader">
              <div class="select-infinity-spinner"></div>
              <span>Carregando mais alunos...</span>
            </div>
            <div class="select-infinity-counter">20 de 100 alunos carregados</div>
          </div>
        </div>
        
        <div style="margin-top: 20px; display: flex; gap: 12px; justify-content: flex-end;">
          <button style="padding: 10px 20px; border: 1px solid #D8D6DE; background: #fff; border-radius: 6px; cursor: pointer;">Cancelar</button>
          <button style="padding: 10px 20px; border: none; background: #6E63E8; color: #fff; border-radius: 6px; cursor: pointer;">Aplicar Missão</button>
        </div>
      </div>
    </div>
    <p style="margin-top: 16px; font-size: 13px; color: #6E6B7B;">
      <strong>Contexto:</strong> Professora Mariana aplica missão de Frações Básicas para turma do 5º ano (100 alunos). Usa busca para encontrar alunos específicos.
    </p>
  `
};

// Story 9: BibliotecaDe500Missoes - 500 missões
export const BibliotecaDe500Missoes = {
  args: {
    size: 'md'
  },
  render: (args) => {
    const missions = Array.from({ length: 20 }, (_, i) => ({
      id: i + 1,
      nome: `Missão ${i + 1}: ${['Frações', 'Geometria', 'Álgebra', 'Estatística'][i % 4]}`,
      disciplina: 'Matemática',
      ano: `${5 + (i % 3)}º ano`
    }));
    
    return `
      ${styles}
      <div style="max-width: 600px;">
        <div style="background: #fff; padding: 24px; border-radius: 8px; border: 1px solid #D8D6DE;">
          <h3 style="margin: 0 0 20px; font-size: 18px; font-weight: 600;">Biblioteca de Missões</h3>
          
          <label style="display: block; margin-bottom: 8px; font-size: 14px; font-weight: 500;">Escolher Missão</label>
          <div class="select-infinity-wrapper size-${args.size}">
            <div class="select-infinity-control" tabindex="0" onclick="this.classList.toggle('open'); this.nextElementSibling.classList.toggle('open')">
              <span class="select-infinity-placeholder">Buscar na biblioteca (500 missões disponíveis)...</span>
              <div class="select-infinity-icons">
                <i class="select-infinity-icon bi bi-search"></i>
                <i class="select-infinity-icon bi bi-chevron-down"></i>
              </div>
            </div>
            <div class="select-infinity-dropdown">
              <div class="select-infinity-search"><input type="text" placeholder="Buscar por disciplina, ano ou palavra-chave..." /></div>
              <div class="select-infinity-list">
                ${missions.map(m => `
                  <div class="select-infinity-item">
                    <div>
                      <div style="font-weight: 500;">${m.nome}</div>
                      <div style="font-size: 12px; color: #6E6B7B;">${m.disciplina} • ${m.ano}</div>
                    </div>
                  </div>
                `).join('')}
              </div>
              <div class="select-infinity-counter">20 de 500 missões carregadas</div>
            </div>
          </div>
        </div>
      </div>
      <p style="margin-top: 16px; font-size: 13px; color: #6E6B7B;">
        <strong>Contexto:</strong> Professor busca na biblioteca com 500 missões. Scroll infinito carrega 20 por vez para performance otimizada.
      </p>
    `;
  }
};

// Story 10: KeyboardNavigation - Navegação por teclado
export const KeyboardNavigation = {
  args: {
    size: 'md'
  },
  render: (args) => `
    ${styles}
    <div class="select-infinity-wrapper size-${args.size}">
      <div class="select-infinity-control open" tabindex="0">
        <span class="select-infinity-placeholder">Selecione um aluno...</span>
        <div class="select-infinity-icons">
          <i class="select-infinity-icon bi bi-chevron-down"></i>
        </div>
      </div>
      <div class="select-infinity-dropdown open">
        <div class="select-infinity-search"><input type="text" placeholder="Buscar..." /></div>
        <div class="select-infinity-list">
          ${allStudents.slice(0, 20).map((s, i) => `
            <div class="select-infinity-item ${i === 3 ? 'active' : ''}">${s.label}</div>
          `).join('')}
        </div>
        <div class="select-infinity-counter">20 de 100 alunos carregados</div>
      </div>
    </div>
    <div style="margin-top: 20px; padding: 16px; background: #F8F9FA; border-radius: 6px; border: 1px solid #D8D6DE;">
      <p style="margin: 0 0 8px; font-size: 14px; font-weight: 600;">Atalhos de Teclado:</p>
      <ul style="margin: 0; padding-left: 20px; font-size: 13px; color: #6E6B7B;">
        <li><kbd>↓</kbd> / <kbd>↑</kbd> - Navegar entre itens</li>
        <li><kbd>Enter</kbd> - Selecionar item com foco</li>
        <li><kbd>Esc</kbd> - Fechar dropdown</li>
        <li><kbd>Tab</kbd> - Sair do componente</li>
        <li><kbd>Backspace</kbd> - Limpar busca</li>
      </ul>
      <p style="margin: 12px 0 0; font-size: 12px; color: #6E6B7B;">
        <strong>ARIA:</strong> role="combobox", aria-expanded="true", aria-activedescendant="item-4"
      </p>
    </div>
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
          <div style="display:inline-block;padding:8px 16px;background:rgba(255,255,255,0.15);border-radius:50px;margin-bottom:20px;font-size:14px;border:1px solid rgba(255,255,255,0.2);">Forms</div>
          <h1 style="font-size:3rem;font-weight:700;margin:0 0 12px 0;letter-spacing:-0.02em;">SelectInfinityScroll</h1>
          <p style="font-size:1.1rem;opacity:0.9;margin:0;max-width:600px;">Educational Select with Infinite Scroll</p>
        </div>
      </div>
      <div style="max-width:900px;margin:0 auto;padding:48px 40px;">
        <div style="background:white;border-radius:12px;padding:32px;margin-bottom:32px;box-shadow:0 2px 8px rgba(0,0,0,0.08);">
          <h2 style="font-size:1.1rem;font-weight:600;color:#5E5873;margin:0 0 16px 0;">Sobre o Componente</h2>
          <p style="color:#6E6B7B;line-height:1.7;margin:0 0 16px 0;">Educational Select with Infinite Scroll. Faz parte da categoria <strong>Forms</strong> do Design System Educacross.</p>
          <div style="background:#F8F7FF;border-left:4px solid #6E63E8;padding:16px;border-radius:4px;">
            <p style="margin:0;color:#5E5873;font-size:14px;line-height:1.6;"><strong>💡 Dica:</strong> Use <em>Playground</em> para explorar props, <em>Use Cases</em> para exemplos reais e <em>Accessibility</em> para validar WCAG.</p>
          </div>
        </div>
        <div style="background:white;border-radius:12px;padding:32px;box-shadow:0 2px 8px rgba(0,0,0,0.08);">
          <h2 style="font-size:1.1rem;font-weight:600;color:#5E5873;margin:0 0 16px 0;">Implementação Vue 2.7</h2>
          <pre style="background:#1E1E2E;color:#CDD6F4;padding:20px;border-radius:8px;font-size:13px;line-height:1.6;overflow:auto;margin:0;"><code>import SelectInfinityScroll from '@/components/SelectInfinityScroll.vue';

// Template
&lt;SelectInfinityScroll v-bind="props" /&gt;</code></pre>
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
    docs: { description: { story: 'Explore o SelectInfinityScroll com controles interativos.' } },
  },
  render: (args) => `
    <div style="padding:32px;display:flex;justify-content:center;align-items:center;min-height:200px;background:#F8F8F8;border-radius:12px;">
      <div style="text-align:center;color:#6E6B7B;">
        <div style="width:60px;height:60px;background:#6E63E820;border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 16px;font-size:24px;">🎨</div>
        <p style="margin:0 0 8px 0;font-size:15px;font-weight:600;color:#5E5873;">Playground SelectInfinityScroll</p>
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
    docs: { description: { story: 'Exemplos de uso real do SelectInfinityScroll no Educacross.' } },
  },
  render: () => `
    <div style="max-width:800px;margin:0 auto;padding:40px 20px;font-family:'Public Sans',sans-serif;">
      <div style="background:#6E63E815;border:1px solid #6E63E830;border-radius:12px;padding:24px;margin-bottom:40px;">
        <h1 style="font-size:1.5rem;font-weight:700;color:#5E5873;margin:0 0 8px 0;">Casos de Uso: SelectInfinityScroll</h1>
        <p style="color:#6E6B7B;margin:0;font-size:14px;line-height:1.6;">Cenários reais de uso no contexto educacional da plataforma Educacross</p>
      </div>
      
      <div style="margin-bottom:32px;">
        <h2 style="font-size:18px;font-weight:600;color:#5E5873;margin:0 0 8px 0;display:flex;align-items:center;gap:10px;">
          <span style="display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;background:#6E63E8;color:white;border-radius:50%;font-size:13px;font-weight:700;flex-shrink:0;">1</span>
          Professor — Painel Principal
        </h2>
        <p style="color:#6E6B7B;margin:0 0 16px 0;padding-left:38px;font-size:14px;">Professor utilizando SelectInfinityScroll no dashboard de gestão de turmas</p>
        <div style="background:#F8F8F8;border-radius:8px;padding:20px;margin-left:38px;text-align:center;color:#B9B9C3;font-size:13px;">
          Ver story <strong>Default</strong> para visualização do componente neste contexto
        </div>
      </div>
      <div style="margin-bottom:32px;">
        <h2 style="font-size:18px;font-weight:600;color:#5E5873;margin:0 0 8px 0;display:flex;align-items:center;gap:10px;">
          <span style="display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;background:#6E63E8;color:white;border-radius:50%;font-size:13px;font-weight:700;flex-shrink:0;">2</span>
          Aluno — Portal do Estudante
        </h2>
        <p style="color:#6E6B7B;margin:0 0 16px 0;padding-left:38px;font-size:14px;">Aluno interagindo com SelectInfinityScroll no portal educacional</p>
        <div style="background:#F8F8F8;border-radius:8px;padding:20px;margin-left:38px;text-align:center;color:#B9B9C3;font-size:13px;">
          Ver story <strong>Default</strong> para visualização do componente neste contexto
        </div>
      </div>
      <div style="margin-bottom:32px;">
        <h2 style="font-size:18px;font-weight:600;color:#5E5873;margin:0 0 8px 0;display:flex;align-items:center;gap:10px;">
          <span style="display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;background:#6E63E8;color:white;border-radius:50%;font-size:13px;font-weight:700;flex-shrink:0;">3</span>
          Coordenador — Relatórios
        </h2>
        <p style="color:#6E6B7B;margin:0 0 16px 0;padding-left:38px;font-size:14px;">Coordenador pedagógico analisando dados via SelectInfinityScroll</p>
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
    docs: { description: { story: 'Conformidade WCAG 2.1 AA para o SelectInfinityScroll.' } },
  },
  render: () => `
    <div style="max-width:800px;margin:0 auto;padding:40px 20px;font-family:'Public Sans',sans-serif;">

      <div style="background:linear-gradient(135deg,#6E63E8 0%,#764ba2 100%);padding:32px;border-radius:12px;margin-bottom:32px;color:white;">
        <h1 style="font-size:1.5rem;font-weight:700;margin:0 0 8px 0;">Acessibilidade: SelectInfinityScroll</h1>
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

