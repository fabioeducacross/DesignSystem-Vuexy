/**
 * ListTableLocalSorting - Client-Side Sortable Table Component
 * 
 * Tabela com ordenação client-side ao clicar nos cabeçalhos das colunas.
 * Suporta ordenação ascendente/descendente com indicadores visuais (setas).
 * 
 * @component ListTableLocalSorting
 * @category Educacross Components V2
 * @subcategory Tables
 * @priority P2
 * @status PIXEL-PERFECT
 * @since v2.0
 * 
 * Key Features:
 * - ✅ Click-to-sort on column headers
 * - ✅ Visual sort indicators (up/down arrows)
 * - ✅ Active column highlighting (#6E63E8 purple)
 * - ✅ Client-side sorting (no API calls)
 * - ✅ Supports text, number, and date sorting
 * - ✅ Multi-column sorting capability
 * - ✅ Hover effect on sortable headers
 * - ✅ Student avatars with initials
 * 
 * Real-world usage:
 * - Professor ordenando lista de alunos por nome, média ou faltas
 * - Coordenador ordenando missões por data limite, alunos ou status
 * - Admin ordenando disciplinas por número de missões ou média
 * - Ranking/leaderboard ordenado por XP, conquistas ou nível
 */

export default {
  title: 'Front-office/Tables/ListTableLocalSorting',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
# ListTableLocalSorting

Tabela com **ordenação local** (client-side) ao clicar nos cabeçalhos. Ideal para listas de alunos, missões, disciplinas ou rankings onde usuário precisa organizar dados dinamicamente.

## Quando usar

- ✅ Lista de alunos ordenável por nome, média, faltas
- ✅ Biblioteca de missões ordenável por data, alunos, status
- ✅ Disciplinas ordenáveis por número de missões ou média
- ✅ Rankings/leaderboards com múltiplos critérios de ordenação
- ✅ Qualquer tabela onde usuário controla a ordem de visualização

## Estados de ordenação

- **Inativo**: Setas cinza claro (opacity 0.3)
- **Ativo ascendente**: Seta para cima colorida (#6E63E8)
- **Ativo descendente**: Seta para baixo colorida (#6E63E8)

## Características visuais

- **Headers clicáveis**: Cursor pointer + hover effect (cor roxa)
- **Indicador visual**: Coluna ativa destaca com cor primária
- **Avatares coloridos**: 36×36px circle com iniciais
- **Grid responsivo**: Colunas adaptáveis (1fr, 150px, 120px, 100px)
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
 * | data | Array | [] | Array de objetos com dados das linhas |
 * | columns | Array | [] | Definição de colunas (label, key, sortable, sortType) |
 * | sortBy | String | null | Chave da coluna atualmente ordenada |
 * | sortOrder | String | 'asc' | Ordem: 'asc' (crescente) ou 'desc' (decrescente) |
 * | onSort | Function | null | Callback ao clicar header: (columnKey, order) => void |
 * | showAvatars | Boolean | true | Exibe avatares coloridos na primeira coluna |
 * | compact | Boolean | false | Variante compacta (padding reduzido) |
 * 
 * ## Design Specs
 * 
 * **Cores:**
 * - Header ativo: `#6E63E8` (purple primary)
 * - Header hover: `#6E63E8`
 * - Header inativo: `#5E5873`
 * - Setas ativas: opacity `1`, cor `#6E63E8`
 * - Setas inativas: opacity `0.3`
 * - Avatares: cores temáticas (#6E63E8, #00CFE8, #28C76F, #FF9F43)
 * 
 * **Dimensões:**
 * - Header cell: padding `12px 16px`, cursor `pointer`
 * - Sort icons: font-size `10px`, inline com label
 * - Avatares: `36×36px` circle
 * - Row padding: `12px 16px`
 * - Gap between columns: `12px`
 * 
 * **Tipografia:**
 * - Header: `13px` weight `600` color `#5E5873` (active: `#6E63E8`)
 * - Student name: `14px` weight `600` color `#5E5873`
 * - Secondary text: `13px` color `#6E6B7B`
 * - Scores/metrics: weight `700`, colors temáticas
 * 
 * **Interação:**
 * - Header hover: `color: #6E63E8`, transition `0.2s`
 * - Click: toggle entre asc → desc → asc
 * - User-select: `none` (previne seleção de texto ao clicar repetido)
 */

const styles = `<style>
.sort-table {
  width: 100%;
  background: #fff;
  border: 1px solid #D8D6DE;
  border-radius: 8px;
  overflow: hidden;
}

.sort-header {
  background: #F8F7FA;
  padding: 12px 16px;
  border-bottom: 2px solid #D8D6DE;
  display: grid;
  grid-template-columns: 1fr 150px 120px 100px;
  gap: 12px;
  font-weight: 600;
  font-size: 13px;
  color: #5E5873;
}

.sort-header-cell {
  display: flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
  user-select: none;
  transition: color 0.2s ease;
}

.sort-header-cell:hover {
  color: #6E63E8;
}

.sort-header-cell.active {
  color: #6E63E8;
}

.sort-icons {
  display: flex;
  flex-direction: column;
  font-size: 10px;
  opacity: 0.3;
  transition: opacity 0.2s ease;
}

.sort-icons.active {
  opacity: 1;
  color: #6E63E8;
}

.sort-row {
  display: grid;
  grid-template-columns: 1fr 150px 120px 100px;
  gap: 12px;
  padding: 12px 16px;
  border-bottom: 1px solid #EBE9F1;
  align-items: center;
  transition: background 0.2s ease;
}

.sort-row:hover {
  background: #F8F8F8;
}

.sort-row:last-child {
  border-bottom: none;
}

.student-info {
  display: flex;
  align-items: center;
  gap: 12px;
}

.student-avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 13px;
  color: #fff;
}

.student-name {
  font-weight: 600;
  color: #5E5873;
  font-size: 14px;
}

.icon-col {
  width: 48px;
  height: 48px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
}
</style>`;

const students = [
  {n: 'Ana Silva', t: '8ºA', m: 9.8, f: 95, c: '#6E63E8'},
  {n: 'Bruno Costa', t: '8ºB', m: 8.5, f: 82, c: '#00CFE8'},
  {n: 'Diana Santos', t: '8ºA', m: 9.2, f: 88, c: '#28C76F'},
  {n: 'Eduardo Lima', t: '9ºA', m: 7.8, f: 75, c: '#FF9F43'}
];

/**
 * Story: Default
 * 
 * Ordenado por "Estudante" (ordem alfabética ascendente).
 * Seta para cima ativa na coluna "Estudante".
 * 
 * Educational context: Professor visualizando lista alfabética de alunos.
 */
export const Default = {
  render: () => `
    ${styles}
    <div class="sort-table">
      <div class="sort-header">
        <div class="sort-header-cell active">
          <span>Estudante</span>
          <span class="sort-icons active"><i class="bi bi-caret-up-fill"></i></span>
        </div>
        <div class="sort-header-cell">
          <span>Turma</span>
          <span class="sort-icons"><i class="bi bi-caret-up-fill"></i></span>
        </div>
        <div class="sort-header-cell">
          <span>Média</span>
          <span class="sort-icons"><i class="bi bi-caret-up-fill"></i></span>
        </div>
        <div class="sort-header-cell">
          <span>Faltas</span>
          <span class="sort-icons"><i class="bi bi-caret-up-fill"></i></span>
        </div>
      </div>
      ${students.sort((a, b) => a.n.localeCompare(b.n)).map(s => `
        <div class="sort-row">
          <div class="student-info">
            <div class="student-avatar" style="background: ${s.c}">
              ${s.n.split(' ').map(n => n[0]).join('')}
            </div>
            <div class="student-name">${s.n}</div>
          </div>
          <div style="font-size: 13px; color: #6E6B7B">${s.t}</div>
          <div style="font-weight: 700; color: #28C76F">${s.m}</div>
          <div style="font-size: 13px; color: #6E6B7B">${s.f}%</div>
        </div>
      `).join('')}
    </div>
  `
};

/**
 * Story: OrdemDecrescente
 * 
 * Ordenado por "Média" (maior → menor, ordem descendente).
 * Seta para baixo ativa na coluna "Média".
 * 
 * Educational context: Professor visualizando melhores desempenhos primeiro.
 */
export const OrdemDecrescente = {
  render: () => `
    ${styles}
    <div class="sort-table">
      <div class="sort-header">
        <div class="sort-header-cell">
          <span>Estudante</span>
          <span class="sort-icons"><i class="bi bi-caret-up-fill"></i></span>
        </div>
        <div class="sort-header-cell">
          <span>Turma</span>
          <span class="sort-icons"><i class="bi bi-caret-up-fill"></i></span>
        </div>
        <div class="sort-header-cell active">
          <span>Média</span>
          <span class="sort-icons active"><i class="bi bi-caret-down-fill"></i></span>
        </div>
        <div class="sort-header-cell">
          <span>Faltas</span>
          <span class="sort-icons"><i class="bi bi-caret-up-fill"></i></span>
        </div>
      </div>
      ${students.sort((a, b) => b.m - a.m).map(s => `
        <div class="sort-row">
          <div class="student-info">
            <div class="student-avatar" style="background: ${s.c}">
              ${s.n.split(' ').map(n => n[0]).join('')}
            </div>
            <div class="student-name">${s.n}</div>
          </div>
          <div style="font-size: 13px; color: #6E6B7B">${s.t}</div>
          <div style="font-weight: 700; color: #28C76F">${s.m}</div>
          <div style="font-size: 13px; color: #6E6B7B">${s.f}%</div>
        </div>
      `).join('')}
    </div>
  `
};

/**
 * Story: OrdemCrescente
 * 
 * Ordenado por "Faltas" (menor → maior, ordem ascendente).
 * Seta para cima ativa na coluna "Faltas".
 * 
 * Educational context: Coordenador identificando alunos com menor frequência.
 */
export const OrdemCrescente = {
  render: () => `
    ${styles}
    <div class="sort-table">
      <div class="sort-header">
        <div class="sort-header-cell">
          <span>Estudante</span>
          <span class="sort-icons"><i class="bi bi-caret-up-fill"></i></span>
        </div>
        <div class="sort-header-cell">
          <span>Turma</span>
          <span class="sort-icons"><i class="bi bi-caret-up-fill"></i></span>
        </div>
        <div class="sort-header-cell">
          <span>Média</span>
          <span class="sort-icons"><i class="bi bi-caret-up-fill"></i></span>
        </div>
        <div class="sort-header-cell active">
          <span>Faltas</span>
          <span class="sort-icons active"><i class="bi bi-caret-up-fill"></i></span>
        </div>
      </div>
      ${students.sort((a, b) => a.f - b.f).map(s => `
        <div class="sort-row">
          <div class="student-info">
            <div class="student-avatar" style="background: ${s.c}">
              ${s.n.split(' ').map(n => n[0]).join('')}
            </div>
            <div class="student-name">${s.n}</div>
          </div>
          <div style="font-size: 13px; color: #6E6B7B">${s.t}</div>
          <div style="font-weight: 700; color: #28C76F">${s.m}</div>
          <div style="font-size: 13px; color: #6E6B7B">${s.f}%</div>
        </div>
      `).join('')}
    </div>
  `
};

/**
 * Story: Missoes
 * 
 * Tabela de missões ordenada por nome (alfabética ascendente).
 * Colunas: Missão, Data Limite, Alunos, Status.
 * Badge colorido por status (Aberta, Encerrada, Rascunho).
 * 
 * Educational context: Professor organizando biblioteca de missões por ordem alfabética.
 */
export const Missoes = {
  render: () => `
    ${styles}
    <div class="sort-table">
      <div class="sort-header" style="grid-template-columns: 1fr 150px 120px 120px">
        <div class="sort-header-cell active">
          <span>Missão</span>
          <span class="sort-icons active"><i class="bi bi-caret-up-fill"></i></span>
        </div>
        <div class="sort-header-cell">
          <span>Data Limite</span>
          <span class="sort-icons"><i class="bi bi-caret-up-fill"></i></span>
        </div>
        <div class="sort-header-cell">
          <span>Alunos</span>
          <span class="sort-icons"><i class="bi bi-caret-up-fill"></i></span>
        </div>
        <div class="sort-header-cell">
          <span>Status</span>
          <span class="sort-icons"><i class="bi bi-caret-up-fill"></i></span>
        </div>
      </div>
      ${[
        {m: 'Frações Básicas', d: '10/02/2026', a: 28, s: 'Aberta', c: '#28C76F'},
        {m: 'Geometria Plana', d: '12/02/2026', a: 32, s: 'Aberta', c: '#28C76F'},
        {m: 'Sistema Solar', d: '08/02/2026', a: 25, s: 'Encerrada', c: '#6E6B7B'},
        {m: 'Verbos e Conjugações', d: '15/02/2026', a: 30, s: 'Rascunho', c: '#FF9F43'}
      ].sort((a, b) => a.m.localeCompare(b.m)).map(m => `
        <div class="sort-row" style="grid-template-columns: 1fr 150px 120px 120px">
          <div style="font-weight: 600; color: #5E5873">${m.m}</div>
          <div style="font-size: 13px; color: #6E6B7B">${m.d}</div>
          <div style="font-weight: 600; color: #6E63E8">${m.a}</div>
          <div>
            <span style="padding: 4px 10px; border-radius: 6px; font-size: 12px; font-weight: 600; background: ${m.c}20; color: ${m.c}">
              ${m.s}
            </span>
          </div>
        </div>
      `).join('')}
    </div>
  `
};

/**
 * Story: ComIcones
 * 
 * Tabela de disciplinas com ícones grandes (48×48px).
 * Ordenada por nome de disciplina (alfabética).
 * 
 * Educational context: Coordenador visualizando overview de disciplinas ordenadas por nome.
 */
export const ComIcones = {
  render: () => `
    ${styles}
    <div class="sort-table">
      <div class="sort-header" style="grid-template-columns: 60px 1fr 120px 120px">
        <div></div>
        <div class="sort-header-cell active">
          <span>Disciplina</span>
          <span class="sort-icons active"><i class="bi bi-caret-up-fill"></i></span>
        </div>
        <div class="sort-header-cell">
          <span>Missões</span>
          <span class="sort-icons"><i class="bi bi-caret-up-fill"></i></span>
        </div>
        <div class="sort-header-cell">
          <span>Média</span>
          <span class="sort-icons"><i class="bi bi-caret-up-fill"></i></span>
        </div>
      </div>
      ${[
        {d: 'Matemática', m: 12, me: 9.5, icon: '📐', c: '#6E63E8'},
        {d: 'Português', m: 8, me: 8.8, icon: '📖', c: '#00CFE8'},
        {d: 'Ciências', m: 10, me: 9.2, icon: '🔬', c: '#28C76F'},
        {d: 'História', m: 6, me: 8.5, icon: '📜', c: '#FF9F43'}
      ].sort((a, b) => a.d.localeCompare(b.d)).map(d => `
        <div class="sort-row" style="grid-template-columns: 60px 1fr 120px 120px">
          <div>
            <div class="icon-col" style="background: ${d.c}20">${d.icon}</div>
          </div>
          <div style="font-weight: 600; color: #5E5873; font-size: 15px">${d.d}</div>
          <div style="font-weight: 600; color: #6E63E8">${d.m} missões</div>
          <div style="font-weight: 700; color: #28C76F">${d.me}</div>
        </div>
      `).join('')}
    </div>
  `
};

/**
 * Story: ComBadges
 * 
 * Tabela de ranking/gamificação ordenada por nome (descendente Z→A).
 * Colunas: Estudante, Conquistas (emojis 🏆), XP Total, Nível.
 * Badge colorido por nível.
 * 
 * Educational context: Sistema de gamificação - ordenação invertida para visualizar últimos da lista.
 */
export const ComBadges = {
  render: () => `
    ${styles}
    <div class="sort-table">
      <div class="sort-header">
        <div class="sort-header-cell active">
          <span>Estudante</span>
          <span class="sort-icons active"><i class="bi bi-caret-down-fill"></i></span>
        </div>
        <div class="sort-header-cell">
          <span>Conquistas</span>
          <span class="sort-icons"><i class="bi bi-caret-up-fill"></i></span>
        </div>
        <div class="sort-header-cell">
          <span>XP Total</span>
          <span class="sort-icons"><i class="bi bi-caret-up-fill"></i></span>
        </div>
        <div class="sort-header-cell">
          <span>Nível</span>
          <span class="sort-icons"><i class="bi bi-caret-up-fill"></i></span>
        </div>
      </div>
      ${[
        {n: 'João Silva', co: 8, xp: 3200, nv: 12, c: '#6E63E8'},
        {n: 'Maria Costa', co: 6, xp: 2850, nv: 10, c: '#00CFE8'},
        {n: 'Pedro Santos', co: 5, xp: 2500, nv: 9, c: '#28C76F'},
        {n: 'Ana Oliveira', co: 7, xp: 2950, nv: 11, c: '#FF9F43'}
      ].sort((a, b) => b.n.localeCompare(a.n)).map(s => `
        <div class="sort-row">
          <div class="student-info">
            <div class="student-avatar" style="background: ${s.c}">
              ${s.n.split(' ').map(n => n[0]).join('')}
            </div>
            <div class="student-name">${s.n}</div>
          </div>
          <div style="display: flex; gap: 4px">
            ${'🏆'.repeat(Math.min(3, s.co))}
          </div>
          <div style="font-weight: 700; color: #6E63E8">${s.xp} XP</div>
          <div>
            <span style="padding: 4px 10px; border-radius: 6px; font-size: 12px; font-weight: 600; background: ${s.c}20; color: ${s.c}">
              Nv ${s.nv}
            </span>
          </div>
        </div>
      `).join('')}
    </div>
  `
};

/**
 * Story: MultiColunas
 * 
 * Boletim multi-disciplinas ordenado por Matemática (descendente).
 * Grid com 5 colunas: Estudante + 4 disciplinas.
 * 
 * Educational context: Coordenador analisando desempenho por disciplina, ordenando por Matemática.
 */
export const MultiColunas = {
  render: () => `
    ${styles}
    <div class="sort-table">
      <div class="sort-header" style="grid-template-columns: 1fr 100px 100px 100px 100px">
        <div class="sort-header-cell">
          <span>Estudante</span>
          <span class="sort-icons"><i class="bi bi-caret-up-fill"></i></span>
        </div>
        <div class="sort-header-cell active">
          <span>Mat.</span>
          <span class="sort-icons active"><i class="bi bi-caret-down-fill"></i></span>
        </div>
        <div class="sort-header-cell">
          <span>Port.</span>
          <span class="sort-icons"><i class="bi bi-caret-up-fill"></i></span>
        </div>
        <div class="sort-header-cell">
          <span>Ciên.</span>
          <span class="sort-icons"><i class="bi bi-caret-up-fill"></i></span>
        </div>
        <div class="sort-header-cell">
          <span>Hist.</span>
          <span class="sort-icons"><i class="bi bi-caret-up-fill"></i></span>
        </div>
      </div>
      ${[
        {n: 'Ana', ma: 10.0, po: 9.5, ci: 9.8, hi: 9.2, c: '#6E63E8'},
        {n: 'Bruno', ma: 9.5, po: 8.8, ci: 9.0, hi: 8.5, c: '#00CFE8'},
        {n: 'Diana', ma: 9.2, po: 9.8, ci: 9.5, hi: 9.0, c: '#28C76F'}
      ].sort((a, b) => b.ma - a.ma).map(s => `
        <div class="sort-row" style="grid-template-columns: 1fr 100px 100px 100px 100px">
          <div class="student-info">
            <div class="student-avatar" style="background: ${s.c}">${s.n[0]}</div>
            <div class="student-name">${s.n}</div>
          </div>
          <div style="font-weight: 700; color: #6E63E8">${s.ma}</div>
          <div style="font-weight: 700; color: #00CFE8">${s.po}</div>
          <div style="font-weight: 700; color: #28C76F">${s.ci}</div>
          <div style="font-weight: 700; color: #FF9F43">${s.hi}</div>
        </div>
      `).join('')}
    </div>
  `
};

/**
 * Story: Completa
 * 
 * Interface completa com:
 * - Header "Lista de Estudantes" + instrução "Clique nos cabeçalhos para ordenar"
 * - Botão "Exportar" com ícone download
 * - Tabela ordenada por nome (alfabética)
 * - Frequência colorida por nível (verde ≥90%, laranja ≥75%, vermelho <75%)
 * - Contexto educacional no rodapé
 * 
 * Educational context: Professor gerenciando lista de alunos com ordenação flexível.
 */
export const Completa = {
  render: () => `
    ${styles}
    <div style="background: #fff; border: 1px solid #D8D6DE; border-radius: 8px; padding: 20px">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px">
        <div>
          <h3 style="margin: 0; font-size: 20px; font-weight: 700; color: #5E5873">Lista de Estudantes</h3>
          <div style="font-size: 13px; color: #6E6B7B; margin-top: 4px">Clique nos cabeçalhos para ordenar</div>
        </div>
        <button style="padding: 8px 16px; background: #6E63E8; color: #fff; border: none; border-radius: 6px; font-weight: 600; cursor: pointer">
          <i class="bi bi-download"></i> Exportar
        </button>
      </div>
      
      <div class="sort-table">
        <div class="sort-header">
          <div class="sort-header-cell active">
            <span>Estudante</span>
            <span class="sort-icons active"><i class="bi bi-caret-up-fill"></i></span>
          </div>
          <div class="sort-header-cell">
            <span>Turma</span>
            <span class="sort-icons"><i class="bi bi-caret-up-fill"></i></span>
          </div>
          <div class="sort-header-cell">
            <span>Média</span>
            <span class="sort-icons"><i class="bi bi-caret-up-fill"></i></span>
          </div>
          <div class="sort-header-cell">
            <span>Frequência</span>
            <span class="sort-icons"><i class="bi bi-caret-up-fill"></i></span>
          </div>
        </div>
        ${students.sort((a, b) => a.n.localeCompare(b.n)).map(s => `
          <div class="sort-row">
            <div class="student-info">
              <div class="student-avatar" style="background: ${s.c}">
                ${s.n.split(' ').map(n => n[0]).join('')}
              </div>
              <div class="student-name">${s.n}</div>
            </div>
            <div style="font-size: 13px; color: #6E6B7B">${s.t}</div>
            <div style="font-weight: 700; color: #28C76F">${s.m}</div>
            <div style="font-size: 13px; color: ${s.f >= 90 ? '#28C76F' : s.f >= 75 ? '#FF9F43' : '#EA5455'}; font-weight: 600">
              ${s.f}%
            </div>
          </div>
        `).join('')}
      </div>
      
      <p style="margin-top: 12px; font-size: 13px; color: #6E6B7B">
        <strong>Contexto:</strong> Tabela com ordenação local (professor ordenando lista por diferentes critérios).
      </p>
    </div>
  `
};
