const W={title:"Educacross Components V2/Forms/SelectInfinityScroll",tags:["autodocs"],parameters:{layout:"padded",docs:{description:{component:`
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
<\/script>
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
        `}}},argTypes:{size:{control:"select",options:["sm","md","lg"],description:"Tamanho do componente",table:{type:{summary:"string"},defaultValue:{summary:"md"}}},placeholder:{control:"text",description:"Texto placeholder",table:{type:{summary:"string"}}},searchable:{control:"boolean",description:"Habilita busca",table:{type:{summary:"boolean"},defaultValue:{summary:"true"}}},clearable:{control:"boolean",description:"Permite limpar seleção",table:{type:{summary:"boolean"},defaultValue:{summary:"true"}}},disabled:{control:"boolean",description:"Desabilita interação",table:{type:{summary:"boolean"},defaultValue:{summary:"false"}}}}},K=()=>{const i=["Ana Silva","Bruno Santos","Carlos Oliveira","Daniela Costa","Eduardo Souza","Fernanda Lima","Gabriel Alves","Helena Rodrigues","Igor Pereira","Juliana Martins","Kaique Ferreira","Larissa Gomes","Mateus Ribeiro","Natália Barbosa","Otávio Cardoso","Paula Mendes","Rafael Araújo","Sofia Nascimento","Thiago Carvalho","Vitória Dias"],e=["5º A","5º B","6º A","6º B","7º A"];return Array.from({length:100},(t,n)=>({id:n+1,label:`${i[n%20]} - ${e[Math.floor(n/20)]}`,turma:e[Math.floor(n/20)],nome:i[n%20]}))},a=K(),s=`
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
`,o={args:{size:"md",placeholder:"Selecione um aluno...",searchable:!0,clearable:!0,disabled:!1},render:i=>`
      ${s}
      <div class="select-infinity-wrapper size-${i.size}">
        <div class="select-infinity-control" tabindex="0" onclick="this.classList.toggle('open'); this.nextElementSibling.classList.toggle('open')">
          <span class="select-infinity-placeholder">${i.placeholder}</span>
          <div class="select-infinity-icons">
            ${i.clearable?'<i class="select-infinity-icon bi bi-x-circle"></i>':""}
            <i class="select-infinity-icon bi bi-chevron-down"></i>
          </div>
        </div>
        <div class="select-infinity-dropdown">
          ${i.searchable?'<div class="select-infinity-search"><input type="text" placeholder="Buscar..." /></div>':""}
          <div class="select-infinity-list">
            ${a.slice(0,20).map(e=>`
              <div class="select-infinity-item">${e.label}</div>
            `).join("")}
          </div>
          <div class="select-infinity-counter">20 de 100 alunos carregados</div>
        </div>
      </div>
      <p style="margin-top: 16px; font-size: 13px; color: #6E6B7B;">
        <strong>Contexto:</strong> Professor da Escola Municipal seleciona aluno do 5º ano para aplicar missão de Matemática.
      </p>
    `},l={args:{size:"md",placeholder:"Buscar aluno...",searchable:!0},render:i=>`
    ${s}
    <div class="select-infinity-wrapper size-${i.size}">
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
          ${a.filter(e=>e.nome.includes("Ana")).map(e=>`
            <div class="select-infinity-item ${e.id===1?"selected":""}">${e.label}</div>
          `).join("")}
        </div>
        <div class="select-infinity-counter">100 de 100 alunos carregados</div>
      </div>
    </div>
    <p style="margin-top: 16px; font-size: 13px; color: #6E6B7B;">
      <strong>Contexto:</strong> Coordenador visualiza lista completa de 100 alunos com busca ativa.
    </p>
  `},r={args:{size:"md"},render:i=>`
    ${s}
    <div class="select-infinity-wrapper size-${i.size}">
      <div class="select-infinity-control open" tabindex="0">
        <span class="select-infinity-placeholder">Selecione um aluno...</span>
        <div class="select-infinity-icons">
          <i class="select-infinity-icon bi bi-chevron-down"></i>
        </div>
      </div>
      <div class="select-infinity-dropdown open">
        <div class="select-infinity-list">
          ${a.slice(0,20).map(e=>`
            <div class="select-infinity-item">${e.label}</div>
          `).join("")}
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
  `},c={render:()=>`
    ${s}
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
  `},d={args:{size:"md",disabled:!0},render:i=>`
    ${s}
    <div class="select-infinity-wrapper size-${i.size}">
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
  `},p={args:{size:"md"},render:i=>`
    ${s}
    <div class="select-infinity-wrapper size-${i.size}">
      <div class="select-infinity-control open" tabindex="0">
        <span class="select-infinity-placeholder">Selecione um aluno...</span>
        <div class="select-infinity-icons">
          <i class="select-infinity-icon bi bi-chevron-down"></i>
        </div>
      </div>
      <div class="select-infinity-dropdown open">
        <div class="select-infinity-search"><input type="text" placeholder="Buscar..." value="Gabriel" /></div>
        <div class="select-infinity-list">
          ${a.filter(e=>e.nome.includes("Gabriel")).map(e=>`
            <div class="select-infinity-item">${e.label}</div>
          `).join("")}
        </div>
        <div class="select-infinity-counter">${a.filter(e=>e.nome.includes("Gabriel")).length} resultados encontrados</div>
      </div>
    </div>
    <p style="margin-top: 16px; font-size: 13px; color: #6E6B7B;">
      <strong>Contexto:</strong> Professor busca "Gabriel" e sistema filtra 5 alunos com esse nome.
    </p>
  `},v={args:{size:"md"},render:i=>`
    ${s}
    <div class="select-infinity-wrapper size-${i.size}">
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
  `},f={args:{size:"md"},render:i=>`
    ${s}
    <div style="max-width: 600px;">
      <div style="background: #fff; padding: 24px; border-radius: 8px; border: 1px solid #D8D6DE;">
        <h3 style="margin: 0 0 8px; font-size: 18px; font-weight: 600;">Aplicar Missão: Frações Básicas</h3>
        <p style="margin: 0 0 20px; font-size: 13px; color: #6E6B7B;">Disciplina: Matemática | Duração: 45 min | 10 questões</p>
        
        <label style="display: block; margin-bottom: 8px; font-size: 14px; font-weight: 500;">Selecionar Alunos</label>
        <div class="select-infinity-wrapper size-${i.size}">
          <div class="select-infinity-control" tabindex="0" onclick="this.classList.toggle('open'); this.nextElementSibling.classList.toggle('open')">
            <span class="select-infinity-placeholder">Selecione os alunos para esta missão...</span>
            <div class="select-infinity-icons">
              <i class="select-infinity-icon bi bi-chevron-down"></i>
            </div>
          </div>
          <div class="select-infinity-dropdown">
            <div class="select-infinity-search"><input type="text" placeholder="Buscar aluno por nome..." /></div>
            <div class="select-infinity-list">
              ${a.slice(0,20).map(e=>`
                <div class="select-infinity-item">${e.label}</div>
              `).join("")}
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
  `},m={args:{size:"md"},render:i=>{const e=Array.from({length:20},(t,n)=>({id:n+1,nome:`Missão ${n+1}: ${["Frações","Geometria","Álgebra","Estatística"][n%4]}`,disciplina:"Matemática",ano:`${5+n%3}º ano`}));return`
      ${s}
      <div style="max-width: 600px;">
        <div style="background: #fff; padding: 24px; border-radius: 8px; border: 1px solid #D8D6DE;">
          <h3 style="margin: 0 0 20px; font-size: 18px; font-weight: 600;">Biblioteca de Missões</h3>
          
          <label style="display: block; margin-bottom: 8px; font-size: 14px; font-weight: 500;">Escolher Missão</label>
          <div class="select-infinity-wrapper size-${i.size}">
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
                ${e.map(t=>`
                  <div class="select-infinity-item">
                    <div>
                      <div style="font-weight: 500;">${t.nome}</div>
                      <div style="font-size: 12px; color: #6E6B7B;">${t.disciplina} • ${t.ano}</div>
                    </div>
                  </div>
                `).join("")}
              </div>
              <div class="select-infinity-counter">20 de 500 missões carregadas</div>
            </div>
          </div>
        </div>
      </div>
      <p style="margin-top: 16px; font-size: 13px; color: #6E6B7B;">
        <strong>Contexto:</strong> Professor busca na biblioteca com 500 missões. Scroll infinito carrega 20 por vez para performance otimizada.
      </p>
    `}},u={args:{size:"md"},render:i=>`
    ${s}
    <div class="select-infinity-wrapper size-${i.size}">
      <div class="select-infinity-control open" tabindex="0">
        <span class="select-infinity-placeholder">Selecione um aluno...</span>
        <div class="select-infinity-icons">
          <i class="select-infinity-icon bi bi-chevron-down"></i>
        </div>
      </div>
      <div class="select-infinity-dropdown open">
        <div class="select-infinity-search"><input type="text" placeholder="Buscar..." /></div>
        <div class="select-infinity-list">
          ${a.slice(0,20).map((e,t)=>`
            <div class="select-infinity-item ${t===3?"active":""}">${e.label}</div>
          `).join("")}
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
  `};var y,x,g;o.parameters={...o.parameters,docs:{...(y=o.parameters)==null?void 0:y.docs,source:{originalSource:`{
  args: {
    size: 'md',
    placeholder: 'Selecione um aluno...',
    searchable: true,
    clearable: true,
    disabled: false
  },
  render: args => {
    return \`
      \${styles}
      <div class="select-infinity-wrapper size-\${args.size}">
        <div class="select-infinity-control" tabindex="0" onclick="this.classList.toggle('open'); this.nextElementSibling.classList.toggle('open')">
          <span class="select-infinity-placeholder">\${args.placeholder}</span>
          <div class="select-infinity-icons">
            \${args.clearable ? '<i class="select-infinity-icon bi bi-x-circle"></i>' : ''}
            <i class="select-infinity-icon bi bi-chevron-down"></i>
          </div>
        </div>
        <div class="select-infinity-dropdown">
          \${args.searchable ? '<div class="select-infinity-search"><input type="text" placeholder="Buscar..." /></div>' : ''}
          <div class="select-infinity-list">
            \${allStudents.slice(0, 20).map(s => \`
              <div class="select-infinity-item">\${s.label}</div>
            \`).join('')}
          </div>
          <div class="select-infinity-counter">20 de 100 alunos carregados</div>
        </div>
      </div>
      <p style="margin-top: 16px; font-size: 13px; color: #6E6B7B;">
        <strong>Contexto:</strong> Professor da Escola Municipal seleciona aluno do 5º ano para aplicar missão de Matemática.
      </p>
    \`;
  }
}`,...(g=(x=o.parameters)==null?void 0:x.docs)==null?void 0:g.source}}};var b,h,z;l.parameters={...l.parameters,docs:{...(b=l.parameters)==null?void 0:b.docs,source:{originalSource:`{
  args: {
    size: 'md',
    placeholder: 'Buscar aluno...',
    searchable: true
  },
  render: args => \`
    \${styles}
    <div class="select-infinity-wrapper size-\${args.size}">
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
          \${allStudents.filter(s => s.nome.includes('Ana')).map(s => \`
            <div class="select-infinity-item \${s.id === 1 ? 'selected' : ''}">\${s.label}</div>
          \`).join('')}
        </div>
        <div class="select-infinity-counter">100 de 100 alunos carregados</div>
      </div>
    </div>
    <p style="margin-top: 16px; font-size: 13px; color: #6E6B7B;">
      <strong>Contexto:</strong> Coordenador visualiza lista completa de 100 alunos com busca ativa.
    </p>
  \`
}`,...(z=(h=l.parameters)==null?void 0:h.docs)==null?void 0:z.source}}};var E,B,w;r.parameters={...r.parameters,docs:{...(E=r.parameters)==null?void 0:E.docs,source:{originalSource:`{
  args: {
    size: 'md'
  },
  render: args => \`
    \${styles}
    <div class="select-infinity-wrapper size-\${args.size}">
      <div class="select-infinity-control open" tabindex="0">
        <span class="select-infinity-placeholder">Selecione um aluno...</span>
        <div class="select-infinity-icons">
          <i class="select-infinity-icon bi bi-chevron-down"></i>
        </div>
      </div>
      <div class="select-infinity-dropdown open">
        <div class="select-infinity-list">
          \${allStudents.slice(0, 20).map(s => \`
            <div class="select-infinity-item">\${s.label}</div>
          \`).join('')}
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
  \`
}`,...(w=(B=r.parameters)==null?void 0:B.docs)==null?void 0:w.source}}};var S,$,k;c.parameters={...c.parameters,docs:{...(S=c.parameters)==null?void 0:S.docs,source:{originalSource:`{
  render: () => \`
    \${styles}
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
  \`
}`,...(k=($=c.parameters)==null?void 0:$.docs)==null?void 0:k.source}}};var D,A,F;d.parameters={...d.parameters,docs:{...(D=d.parameters)==null?void 0:D.docs,source:{originalSource:`{
  args: {
    size: 'md',
    disabled: true
  },
  render: args => \`
    \${styles}
    <div class="select-infinity-wrapper size-\${args.size}">
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
  \`
}`,...(F=(A=d.parameters)==null?void 0:A.docs)==null?void 0:F.source}}};var C,M,P;p.parameters={...p.parameters,docs:{...(C=p.parameters)==null?void 0:C.docs,source:{originalSource:`{
  args: {
    size: 'md'
  },
  render: args => \`
    \${styles}
    <div class="select-infinity-wrapper size-\${args.size}">
      <div class="select-infinity-control open" tabindex="0">
        <span class="select-infinity-placeholder">Selecione um aluno...</span>
        <div class="select-infinity-icons">
          <i class="select-infinity-icon bi bi-chevron-down"></i>
        </div>
      </div>
      <div class="select-infinity-dropdown open">
        <div class="select-infinity-search"><input type="text" placeholder="Buscar..." value="Gabriel" /></div>
        <div class="select-infinity-list">
          \${allStudents.filter(s => s.nome.includes('Gabriel')).map(s => \`
            <div class="select-infinity-item">\${s.label}</div>
          \`).join('')}
        </div>
        <div class="select-infinity-counter">\${allStudents.filter(s => s.nome.includes('Gabriel')).length} resultados encontrados</div>
      </div>
    </div>
    <p style="margin-top: 16px; font-size: 13px; color: #6E6B7B;">
      <strong>Contexto:</strong> Professor busca "Gabriel" e sistema filtra 5 alunos com esse nome.
    </p>
  \`
}`,...(P=(M=p.parameters)==null?void 0:M.docs)==null?void 0:P.source}}};var L,j,I;v.parameters={...v.parameters,docs:{...(L=v.parameters)==null?void 0:L.docs,source:{originalSource:`{
  args: {
    size: 'md'
  },
  render: args => \`
    \${styles}
    <div class="select-infinity-wrapper size-\${args.size}">
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
  \`
}`,...(I=(j=v.parameters)==null?void 0:j.docs)==null?void 0:I.source}}};var T,G,N;f.parameters={...f.parameters,docs:{...(T=f.parameters)==null?void 0:T.docs,source:{originalSource:`{
  args: {
    size: 'md'
  },
  render: args => \`
    \${styles}
    <div style="max-width: 600px;">
      <div style="background: #fff; padding: 24px; border-radius: 8px; border: 1px solid #D8D6DE;">
        <h3 style="margin: 0 0 8px; font-size: 18px; font-weight: 600;">Aplicar Missão: Frações Básicas</h3>
        <p style="margin: 0 0 20px; font-size: 13px; color: #6E6B7B;">Disciplina: Matemática | Duração: 45 min | 10 questões</p>
        
        <label style="display: block; margin-bottom: 8px; font-size: 14px; font-weight: 500;">Selecionar Alunos</label>
        <div class="select-infinity-wrapper size-\${args.size}">
          <div class="select-infinity-control" tabindex="0" onclick="this.classList.toggle('open'); this.nextElementSibling.classList.toggle('open')">
            <span class="select-infinity-placeholder">Selecione os alunos para esta missão...</span>
            <div class="select-infinity-icons">
              <i class="select-infinity-icon bi bi-chevron-down"></i>
            </div>
          </div>
          <div class="select-infinity-dropdown">
            <div class="select-infinity-search"><input type="text" placeholder="Buscar aluno por nome..." /></div>
            <div class="select-infinity-list">
              \${allStudents.slice(0, 20).map(s => \`
                <div class="select-infinity-item">\${s.label}</div>
              \`).join('')}
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
  \`
}`,...(N=(G=f.parameters)==null?void 0:G.docs)==null?void 0:N.source}}};var q,H,V;m.parameters={...m.parameters,docs:{...(q=m.parameters)==null?void 0:q.docs,source:{originalSource:`{
  args: {
    size: 'md'
  },
  render: args => {
    const missions = Array.from({
      length: 20
    }, (_, i) => ({
      id: i + 1,
      nome: \`Missão \${i + 1}: \${['Frações', 'Geometria', 'Álgebra', 'Estatística'][i % 4]}\`,
      disciplina: 'Matemática',
      ano: \`\${5 + i % 3}º ano\`
    }));
    return \`
      \${styles}
      <div style="max-width: 600px;">
        <div style="background: #fff; padding: 24px; border-radius: 8px; border: 1px solid #D8D6DE;">
          <h3 style="margin: 0 0 20px; font-size: 18px; font-weight: 600;">Biblioteca de Missões</h3>
          
          <label style="display: block; margin-bottom: 8px; font-size: 14px; font-weight: 500;">Escolher Missão</label>
          <div class="select-infinity-wrapper size-\${args.size}">
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
                \${missions.map(m => \`
                  <div class="select-infinity-item">
                    <div>
                      <div style="font-weight: 500;">\${m.nome}</div>
                      <div style="font-size: 12px; color: #6E6B7B;">\${m.disciplina} • \${m.ano}</div>
                    </div>
                  </div>
                \`).join('')}
              </div>
              <div class="select-infinity-counter">20 de 500 missões carregadas</div>
            </div>
          </div>
        </div>
      </div>
      <p style="margin-top: 16px; font-size: 13px; color: #6E6B7B;">
        <strong>Contexto:</strong> Professor busca na biblioteca com 500 missões. Scroll infinito carrega 20 por vez para performance otimizada.
      </p>
    \`;
  }
}`,...(V=(H=m.parameters)==null?void 0:H.docs)==null?void 0:V.source}}};var R,_,O;u.parameters={...u.parameters,docs:{...(R=u.parameters)==null?void 0:R.docs,source:{originalSource:`{
  args: {
    size: 'md'
  },
  render: args => \`
    \${styles}
    <div class="select-infinity-wrapper size-\${args.size}">
      <div class="select-infinity-control open" tabindex="0">
        <span class="select-infinity-placeholder">Selecione um aluno...</span>
        <div class="select-infinity-icons">
          <i class="select-infinity-icon bi bi-chevron-down"></i>
        </div>
      </div>
      <div class="select-infinity-dropdown open">
        <div class="select-infinity-search"><input type="text" placeholder="Buscar..." /></div>
        <div class="select-infinity-list">
          \${allStudents.slice(0, 20).map((s, i) => \`
            <div class="select-infinity-item \${i === 3 ? 'active' : ''}">\${s.label}</div>
          \`).join('')}
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
  \`
}`,...(O=(_=u.parameters)==null?void 0:_.docs)==null?void 0:O.source}}};const Z=["Default","WithManyItems","Loading","AllSizes","Disabled","SearchActive","EmptySearch","AplicarMissaoEm100Alunos","BibliotecaDe500Missoes","KeyboardNavigation"];export{c as AllSizes,f as AplicarMissaoEm100Alunos,m as BibliotecaDe500Missoes,o as Default,d as Disabled,v as EmptySearch,u as KeyboardNavigation,r as Loading,p as SearchActive,l as WithManyItems,Z as __namedExportsOrder,W as default};
