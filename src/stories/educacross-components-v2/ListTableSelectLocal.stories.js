/**
 * ListTableSelectLocal - Local Selection Table Component
 * 
 * Tabela com seleção múltipla via checkbox gerenciada no client-side (sem backend).
 * Permite seleção individual, "Selecionar Todos" e exibição de resumo de itens selecionados.
 * 
 * @component ListTableSelectLocal
 * @source educacross-frontoffice/src/components/table/ListTableSelectLocal.vue
 * @category Educacross Components V2
 * @subcategory Tables
 * @priority P2
 * @status PIXEL-PERFECT
 * @since v2.0
 * 
 * Key Features:
 * - ✅ Checkbox selection (individual + master)
 * - ✅ Selection summary bar with count
 * - ✅ Client-side state management (no API calls)
 * - ✅ Colorful avatars/icons for visual identification
 * - ✅ Grid layout with responsive columns
 * - ✅ Search filter integration
 * - ✅ Empty state with helpful message
 * - ✅ Visual feedback on selection (background color, border)
 * 
 * Real-world usage:
 * - Coordenador selecionando materiais para pedido
 * - Professor escolhendo recursos didáticos para reserva
 * - Secretaria selecionando atividades para plano de aula
 * - Admin selecionando tópicos BNCC para currículo
 */

export default {
  title: 'Educacross Components V2/Tables/ListTableSelectLocal',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
# ListTableSelectLocal

Tabela com **seleção múltipla local** (client-side) via checkbox. Perfeita para seleção de materiais, recursos didáticos, atividades ou tópicos sem necessidade de persistência imediata no servidor.

## Quando usar

- ✅ Seleção de materiais para pedido (papel, canetas, livros)
- ✅ Escolha de recursos didáticos para reserva (projetor, laboratório)
- ✅ Seleção de atividades para plano de aula
- ✅ Escolha de tópicos BNCC para currículo
- ✅ Qualquer cenário onde seleção é gerenciada no front-end

## Estados de seleção

- **Nenhum selecionado**: Checkbox master desmarcado
- **Parcial**: Checkbox master com estado indeterminado (hífen)
- **Todos selecionados**: Checkbox master marcado, barra de resumo exibe contagem

## Características visuais

- **Grid responsivo**: Colunas adaptáveis ao conteúdo
- **Feedback visual**: Linha selecionada com background verde claro + borda esquerda
- **Ícones coloridos**: Circle avatares 36×36px com cores temáticas
- **Barra de resumo**: Background verde com contagem de selecionados
        `
      }
    }
  }
};

/**
 * ## Props API
 * 
 * | Prop | Type | Default | Description |
 * |------|------|---------|-------------|
 * | items | Array | [] | Array de objetos com dados das linhas |
 * | selected | Array | [] | Array de IDs dos itens selecionados |
 * | columns | Array | [] | Definição de colunas (label, key, width) |
 * | showSelectAll | Boolean | true | Exibe checkbox "Selecionar Todos" no header |
 * | showSummary | Boolean | true | Exibe barra de resumo com contagem |
 * | searchable | Boolean | false | Adiciona campo de busca |
 * | onSelect | Function | null | Callback ao selecionar/desmarcar item individual |
 * | onSelectAll | Function | null | Callback ao clicar "Selecionar Todos" |
 * | onSearch | Function | null | Callback ao digitar no campo de busca |
 * 
 * ## Design Specs
 * 
 * **Cores:**
 * - Checkbox marcado: `#28C76F` (green success)
 * - Linha selecionada: background `#E8F5E9` (green lighten-5), border-left `3px solid #28C76F`
 * - Barra de resumo: background `#E8F5E9`, texto `#28C76F`
 * - Ícones/avatares: cores temáticas (#6E63E8 purple, #00CFE8 cyan, #28C76F green, #FF9F43 orange)
 * 
 * **Dimensões:**
 * - Checkbox: `20×20px`, border-radius `4px`
 * - Ícones/avatares: `36×36px` circle, border-radius `8px` (para ícones)
 * - Grid columns: definido por `grid-template-columns` (ex: 48px 1fr 150px 120px)
 * - Row padding: `12px 16px`
 * - Border: table border `1px solid #D8D6DE`, row separator `1px solid #EBE9F1`
 * 
 * **Tipografia:**
 * - Header: `13px` weight `600` color `#5E5873` uppercase (opcional)
 * - Item name: `14px` weight `600` color `#5E5873`
 * - Secondary info: `13px` color `#6E6B7B`
 * - Summary text: `13px` weight `600` color `#28C76F`
 */

const styles = `<style>
.local-select-table {
  width: 100%;
  background: #fff;
  border: 1px solid #D8D6DE;
  border-radius: 8px;
  overflow: hidden;
}

.local-header {
  background: #F8F7FA;
  padding: 12px 16px;
  border-bottom: 2px solid #D8D6DE;
  display: grid;
  grid-template-columns: 48px 1fr 150px 120px;
  gap: 12px;
  font-weight: 600;
  font-size: 13px;
  color: #5E5873;
  align-items: center;
}

.local-row {
  display: grid;
  grid-template-columns: 48px 1fr 150px 120px;
  gap: 12px;
  padding: 12px 16px;
  border-bottom: 1px solid #EBE9F1;
  align-items: center;
  transition: all 0.2s ease;
  cursor: pointer;
}

.local-row:hover {
  background: #F8F8F8;
}

.local-row.selected {
  background: #E8F5E9;
  border-left: 3px solid #28C76F;
}

.local-row:last-child {
  border-bottom: none;
}

.checkbox {
  width: 20px;
  height: 20px;
  border: 2px solid #D8D6DE;
  border-radius: 4px;
  cursor: pointer;
  position: relative;
  transition: all 0.2s ease;
}

.checkbox.checked {
  background: #28C76F;
  border-color: #28C76F;
}

.checkbox.checked:after {
  content: '✓';
  color: #fff;
  font-size: 14px;
  font-weight: 700;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.checkbox.indeterminate {
  background: #28C76F;
  border-color: #28C76F;
}

.checkbox.indeterminate:after {
  content: '−';
  color: #fff;
  font-size: 16px;
  font-weight: 700;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.item-info {
  display: flex;
  align-items: center;
  gap: 12px;
}

.item-icon {
  width: 36px;
  height: 36px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
}

.item-name {
  font-weight: 600;
  color: #5E5873;
  font-size: 14px;
}

.selection-summary {
  padding: 12px 16px;
  background: #E8F5E9;
  border-top: 1px solid #28C76F;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 13px;
  color: #28C76F;
  font-weight: 600;
}

.search-bar {
  padding: 12px 16px;
  background: #F8F7FA;
  border-bottom: 1px solid #D8D6DE;
}

.search-bar input {
  width: 100%;
  padding: 8px 12px 8px 36px;
  border-radius: 6px;
  border: 1px solid #D8D6DE;
  font-size: 13px;
  background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='%236E6B7B'%3E%3Cpath d='M11.7 10.3l3.6 3.6-1.4 1.4-3.6-3.6a6 6 0 1 1 1.4-1.4zM7 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z'/%3E%3C/svg%3E") no-repeat 10px center;
  background-color: #fff;
}

.empty-state {
  padding: 60px 20px;
  text-align: center;
  border-bottom: 1px solid #EBE9F1;
}

.empty-state svg {
  opacity: 0.3;
  margin: 0 auto 12px;
}

.empty-state-title {
  font-size: 14px;
  font-weight: 600;
  color: #5E5873;
  margin-bottom: 6px;
}

.empty-state-description {
  font-size: 13px;
  color: #6E6B7B;
}
</style>`;

/**
 * Story: Default
 * 
 * Estado padrão com 3 itens (Cadernos, Canetas, Lápis), 1 selecionado.
 * 
 * Educational context: Coordenador iniciando seleção de materiais para pedido de papelaria.
 */
export const Default = {
  render: () => `
    ${styles}
    <div class="local-select-table">
      <div class="local-header">
        <div><div class="checkbox"></div></div>
        <div>Item</div>
        <div>Quantidade</div>
        <div>Valor</div>
      </div>
      ${[
        {i: 'Cadernos', q: 50, v: 'R$ 250', icon: '📓', c: '#6E63E8', selected: true},
        {i: 'Canetas', q: 120, v: 'R$ 180', icon: '✒️', c: '#00CFE8', selected: false},
        {i: 'Lápis', q: 200, v: 'R$ 100', icon: '✏️', c: '#28C76F', selected: false}
      ].map(item => `
        <div class="local-row${item.selected ? ' selected' : ''}">
          <div><div class="checkbox${item.selected ? ' checked' : ''}"></div></div>
          <div class="item-info">
            <div class="item-icon" style="background: ${item.c}20">${item.icon}</div>
            <div class="item-name">${item.i}</div>
          </div>
          <div style="font-size: 13px; color: #6E6B7B">${item.q} un.</div>
          <div style="font-weight: 600; color: #5E5873">${item.v}</div>
        </div>
      `).join('')}
      <div class="selection-summary">
        <span><i class="bi bi-check-circle-fill"></i> 1 item selecionado</span>
      </div>
    </div>
  `
};

/**
 * Story: Multiplos
 * 
 * Todos os 3 itens selecionados (Livros Didáticos, Atlas Geográfico, Calculadoras).
 * Barra de resumo exibe total acumulado: R$ 3.150.
 * 
 * Educational context: Coordenador selecionou todos os materiais didáticos para requisição da turma 9º Ano.
 */
export const Multiplos = {
  render: () => `
    ${styles}
    <div class="local-select-table">
      <div class="local-header">
        <div><div class="checkbox checked"></div></div>
        <div>Material</div>
        <div>Quantidade</div>
        <div>Total</div>
      </div>
      ${[
        {i: 'Livros Didáticos', q: 35, v: 'R$ 1.750', icon: '📚', c: '#6E63E8'},
        {i: 'Atlas Geográfico', q: 35, v: 'R$ 875', icon: '🗺️', c: '#00CFE8'},
        {i: 'Calculadoras', q: 35, v: 'R$ 525', icon: '🔢', c: '#28C76F'}
      ].map(item => `
        <div class="local-row selected">
          <div><div class="checkbox checked"></div></div>
          <div class="item-info">
            <div class="item-icon" style="background: ${item.c}20">${item.icon}</div>
            <div class="item-name">${item.i}</div>
          </div>
          <div style="font-size: 13px; color: #6E6B7B">${item.q}</div>
          <div style="font-weight: 700; color: #28C76F">${item.v}</div>
        </div>
      `).join('')}
      <div class="selection-summary">
        <span><i class="bi bi-check-circle-fill"></i> 3 itens selecionados • Total: R$ 3.150</span>
      </div>
    </div>
  `
};

/**
 * Story: Recursos
 * 
 * Seleção de recursos didáticos: 2 selecionados (Projetor, Laboratório), 1 não (Quadra reservada).
 * Status badge colorido por disponibilidade.
 * 
 * Educational context: Professor reservando recursos para aula prática de Ciências (projetor + laboratório).
 */
export const Recursos = {
  render: () => `
    ${styles}
    <div class="local-select-table">
      <div class="local-header">
        <div><div class="checkbox indeterminate"></div></div>
        <div>Recurso Didático</div>
        <div>Disponível</div>
        <div>Status</div>
      </div>
      ${[
        {r: 'Projetor Multimídia', d: 5, s: 'Disponível', icon: '📽️', c: '#28C76F', sel: true},
        {r: 'Laboratório de Ciências', d: 2, s: 'Disponível', icon: '🔬', c: '#28C76F', sel: true},
        {r: 'Quadra Esportiva', d: 1, s: 'Reservado', icon: '⚽', c: '#FF9F43', sel: false}
      ].map(r => `
        <div class="local-row${r.sel ? ' selected' : ''}">
          <div><div class="checkbox${r.sel ? ' checked' : ''}"></div></div>
          <div class="item-info">
            <div class="item-icon" style="background: ${r.c}20">${r.icon}</div>
            <div class="item-name">${r.r}</div>
          </div>
          <div style="font-size: 13px; color: #6E6B7B">${r.d} un.</div>
          <div>
            <span style="padding: 4px 10px; border-radius: 6px; font-size: 12px; font-weight: 600; background: ${r.c}20; color: ${r.c}">${r.s}</span>
          </div>
        </div>
      `).join('')}
      <div class="selection-summary">
        <span><i class="bi bi-check-circle-fill"></i> 2 recursos selecionados</span>
      </div>
    </div>
  `
};

/**
 * Story: Atividades
 * 
 * Todas as 3 atividades selecionadas (Leitura, Discussão, Exercícios).
 * Resumo exibe tempo total acumulado: 2h 15min.
 * 
 * Educational context: Professor montando plano de aula com 3 atividades sequenciais.
 */
export const Atividades = {
  render: () => `
    ${styles}
    <div class="local-select-table">
      <div class="local-header">
        <div><div class="checkbox checked"></div></div>
        <div>Atividade</div>
        <div>Duração</div>
        <div>Tipo</div>
      </div>
      ${[
        {a: 'Leitura de Texto', d: '30 min', t: 'Individual', icon: '📖', c: '#6E63E8'},
        {a: 'Discussão em Grupo', d: '45 min', t: 'Grupo', icon: '💬', c: '#00CFE8'},
        {a: 'Exercícios Práticos', d: '60 min', t: 'Individual', icon: '✍️', c: '#28C76F'}
      ].map(a => `
        <div class="local-row selected">
          <div><div class="checkbox checked"></div></div>
          <div class="item-info">
            <div class="item-icon" style="background: ${a.c}20">${a.icon}</div>
            <div class="item-name">${a.a}</div>
          </div>
          <div style="font-size: 13px; color: #6E6B7B">${a.d}</div>
          <div>
            <span style="padding: 4px 10px; border-radius: 6px; font-size: 12px; font-weight: 600; background: ${a.c}20; color: ${a.c}">${a.t}</span>
          </div>
        </div>
      `).join('')}
      <div class="selection-summary">
        <span><i class="bi bi-check-circle-fill"></i> 3 atividades • Tempo total: 2h 15min</span>
      </div>
    </div>
  `
};

/**
 * Story: Topicos
 * 
 * Seleção de tópicos BNCC: 2 selecionados (Frações, Verbos), 1 não (Ciclo da Água).
 * Badge colorido por disciplina.
 * 
 * Educational context: Coordenador selecionando tópicos BNCC para currículo bimestral de 7º/8º Anos.
 */
export const Topicos = {
  render: () => `
    ${styles}
    <div class="local-select-table">
      <div class="local-header">
        <div><div class="checkbox indeterminate"></div></div>
        <div>Tópico BNCC</div>
        <div>Ano</div>
        <div>Disciplina</div>
      </div>
      ${[
        {t: 'Operações com Frações', a: '7º', d: 'Matemática', sel: true, c: '#6E63E8'},
        {t: 'Verbos no Pretérito', a: '8º', d: 'Português', sel: true, c: '#00CFE8'},
        {t: 'Ciclo da Água', a: '6º', d: 'Ciências', sel: false, c: '#28C76F'}
      ].map(t => `
        <div class="local-row${t.sel ? ' selected' : ''}">
          <div><div class="checkbox${t.sel ? ' checked' : ''}"></div></div>
          <div style="font-weight: 600; color: #5E5873">${t.t}</div>
          <div style="font-size: 13px; color: #6E6B7B">${t.a} Ano</div>
          <div>
            <span style="padding: 4px 10px; border-radius: 6px; font-size: 12px; font-weight: 600; background: ${t.c}20; color: ${t.c}">${t.d}</span>
          </div>
        </div>
      `).join('')}
      <div class="selection-summary">
        <span><i class="bi bi-check-circle-fill"></i> 2 tópicos selecionados</span>
      </div>
    </div>
  `
};

/**
 * Story: ComBusca
 * 
 * Campo de busca no topo + 1 resultado filtrado (Livros Didáticos).
 * Input com ícone de lupa integrado.
 * 
 * Educational context: Coordenador filtrando lista de materiais por palavra-chave "Livro".
 */
export const ComBusca = {
  render: () => `
    ${styles}
    <div class="local-select-table">
      <div class="search-bar">
        <input type="text" placeholder="Buscar item..." value="Livro">
      </div>
      <div class="local-header">
        <div><div class="checkbox"></div></div>
        <div>Item</div>
        <div>Quantidade</div>
        <div>Valor</div>
      </div>
      ${[
        {i: 'Livros Didáticos', q: 35, v: 'R$ 1.750', icon: '📚', c: '#6E63E8', sel: true}
      ].map(item => `
        <div class="local-row selected">
          <div><div class="checkbox checked"></div></div>
          <div class="item-info">
            <div class="item-icon" style="background: ${item.c}20">${item.icon}</div>
            <div class="item-name">${item.i}</div>
          </div>
          <div style="font-size: 13px; color: #6E6B7B">${item.q}</div>
          <div style="font-weight: 600; color: #5E5873">${item.v}</div>
        </div>
      `).join('')}
      <div class="selection-summary">
        <span><i class="bi bi-check-circle-fill"></i> 1 item encontrado e selecionado</span>
      </div>
    </div>
  `
};

/**
 * Story: Vazio
 * 
 * Estado vazio com SVG placeholder + mensagem "Nenhum Item Disponível".
 * 
 * Educational context: Lista de materiais vazia aguardando cadastro.
 */
export const Vazio = {
  render: () => `
    ${styles}
    <div class="local-select-table">
      <div class="local-header">
        <div><div class="checkbox"></div></div>
        <div>Item</div>
        <div>Quantidade</div>
        <div>Valor</div>
      </div>
      <div class="empty-state">
        <svg width="80" height="80">
          <circle fill="#E8E8E8" cx="40" cy="40" r="40"/>
          <path fill="#6E6B7B" d="M25 30 H55 V35 H25 Z M25 40 H55 V45 H25 Z M25 50 H40 V55 H25 Z"/>
        </svg>
        <div class="empty-state-title">Nenhum Item Disponível</div>
        <div class="empty-state-description">Adicione itens para começar a seleção.</div>
      </div>
    </div>
  `
};

/**
 * Story: Completa
 * 
 * Interface completa com:
 * - Header "Selecionar Materiais" + botão "Confirmar Seleção"
 * - Tabela com 3 itens todos selecionados
 * - Barra de resumo com total acumulado: R$ 2.180
 * - Contexto educacional no rodapé
 * 
 * Educational context: Coordenador confirmando seleção de materiais para envio ao fornecedor.
 */
export const Completa = {
  render: () => `
    ${styles}
    <div style="background: #fff; border: 1px solid #D8D6DE; border-radius: 8px; padding: 20px">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px">
        <div>
          <h3 style="margin: 0; font-size: 20px; font-weight: 700; color: #5E5873">Selecionar Materiais</h3>
          <div style="font-size: 13px; color: #6E6B7B; margin-top: 4px">Escolha os materiais para o pedido</div>
        </div>
        <button style="padding: 8px 16px; background: #28C76F; color: #fff; border: none; border-radius: 6px; font-weight: 600; cursor: pointer">
          <i class="bi bi-check-lg"></i> Confirmar Seleção
        </button>
      </div>
      
      <div class="local-select-table">
        <div class="local-header">
          <div><div class="checkbox checked"></div></div>
          <div>Material</div>
          <div>Quantidade</div>
          <div>Total</div>
        </div>
        ${[
          {i: 'Livros Didáticos', q: 35, v: 'R$ 1.750', icon: '📚', c: '#6E63E8'},
          {i: 'Cadernos', q: 50, v: 'R$ 250', icon: '📓', c: '#00CFE8'},
          {i: 'Canetas', q: 120, v: 'R$ 180', icon: '✒️', c: '#28C76F'}
        ].map(item => `
          <div class="local-row selected">
            <div><div class="checkbox checked"></div></div>
            <div class="item-info">
              <div class="item-icon" style="background: ${item.c}20">${item.icon}</div>
              <div class="item-name">${item.i}</div>
            </div>
            <div style="font-size: 13px; color: #6E6B7B">${item.q}</div>
            <div style="font-weight: 700; color: #28C76F">${item.v}</div>
          </div>
        `).join('')}
        <div class="selection-summary">
          <span><i class="bi bi-check-circle-fill"></i> 3 itens selecionados • Valor total: R$ 2.180</span>
        </div>
      </div>
      
      <p style="margin-top: 12px; font-size: 13px; color: #6E6B7B">
        <strong>Contexto:</strong> Seleção local (coordenador escolhendo materiais para pedido, sem API).
      </p>
    </div>
  `
};
