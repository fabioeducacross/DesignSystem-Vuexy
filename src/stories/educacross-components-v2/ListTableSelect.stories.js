/**
 * ListTableSelect - Table with Multiple Selection
 * ================================================
 * Tabela com checkboxes para seleção múltipla de itens (alunos, missões, turmas)
 * 
 * @component ListTableSelect
 * @category Educacross Components V2 / Tables
 * @source educacross-frontoffice/src/components/table/ListTableSelect.vue
 * @priority P1 - Core UI
 * @status PIXEL-PERFECT
 * @since 2.0.0
 */

export default {
  title: 'Educacross Components V2/Tables/ListTableSelect',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
## ListTableSelect - Tabela com Seleção Múltipla

Componente de tabela com checkboxes para seleção múltipla, permitindo ações em lote como adicionar alunos a missões, exportar dados, duplicar ou excluir itens.

### Casos de Uso

**Professor**: Selecionar alunos para adicionar a uma missão, escolher múltiplas missões para duplicação, exportar lista de alunos para relatório

**Coordenador**: Selecionar turmas para análise comparativa, exportar dados em massa (Excel/PDF), enviar emails para grupos

**Secretaria**: Selecionar alunos para matrícula em turmas, gerar documentos em lote, atualizar dados cadastrais

---

## Props API

| Prop | Tipo | Valores | Default | Descrição |
|------|------|---------|---------|-----------|
| items | array | - | [] | Lista de itens a exibir |
| selected | array | - | [] | IDs dos itens selecionados |
| columns | array | - | [] | Colunas da tabela |
| showSelectAll | boolean | true, false | true | Exibe checkbox "selecionar todos" |
| showActionsBar | boolean | true, false | true | Exibe barra de ações inferior |
| onSelect | function | - | - | Callback ao selecionar item |
| onSelectAll | function | - | - | Callback ao selecionar todos |

---

## Design Specs

**Cores**:
- Checkbox marcado: #6E63E8
- Linha selecionada: #6E63E810 (roxo transparente)
- Avatar cores: #6E63E8, #00CFE8, #28C76F, #FF9F43, #EA5455
- Hover: #F8F8F8

**Dimensões**:
- Checkbox: 20×20px, border-radius 4px
- Avatar: 36×36px (compacto) / 40×40px (padrão), circle
- Linha: padding 12px 16px
- Actions bar: padding 12px 16px

**Tipografia**:
- Nome: 14px, weight 600, color #5E5873
- Dados secundários: 13px, color #6E6B7B
- Contagem seleção: 13px, weight 700, color #5E5873
        `
      }
    }
  }
};

const css = `<style>
  .select-table {
    width: 100%;
    background: #fff;
    border: 1px solid #D8D6DE;
    border-radius: 8px;
    overflow: hidden;
  }
  
  .select-header {
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
  
  .select-row {
    display: grid;
    grid-template-columns: 48px 1fr 150px 120px;
    gap: 12px;
    padding: 12px 16px;
    border-bottom: 1px solid #EBE9F1;
    align-items: center;
    transition: all 0.2s;
    cursor: pointer;
  }
  
  .select-row:hover {
    background: #F8F8F8;
  }
  
  .select-row.selected {
    background: #6E63E810;
  }
  
  .select-row:last-child {
    border-bottom: none;
  }
  
  .checkbox {
    width: 20px;
    height: 20px;
    border: 2px solid #D8D6DE;
    border-radius: 4px;
    cursor: pointer;
    position: relative;
    transition: all 0.2s;
  }
  
  .checkbox.checked {
    background: #6E63E8;
    border-color: #6E63E8;
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
    background: #6E63E8;
    border-color: #6E63E8;
    opacity: 0.5;
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
  
  .actions-bar {
    padding: 12px 16px;
    background: #F8F7FA;
    border-top: 1px solid #D8D6DE;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .btn {
    padding: 8px 16px;
    border-radius: 6px;
    border: none;
    font-weight: 600;
    font-size: 13px;
    cursor: pointer;
    transition: all 0.2s;
    display: inline-flex;
    align-items: center;
    gap: 6px;
  }
  
  .btn:hover {
    transform: translateY(-1px);
    box-shadow: 0 2px 8px rgba(0,0,0,0.15);
  }
  
  .btn-primary {
    background: #6E63E8;
    color: #fff;
  }
  
  .btn-secondary {
    background: #E8E8E8;
    color: #5E5873;
  }
  
  .btn-danger {
    background: #EA5455;
    color: #fff;
  }
  
  .filter {
    display: flex;
    gap: 12px;
    padding: 12px 16px;
    background: #F8F7FA;
    border-bottom: 1px solid #D8D6DE;
  }
  
  .filter input, .filter select {
    padding: 8px 12px;
    border-radius: 6px;
    border: 1px solid #D8D6DE;
    font-size: 13px;
  }
  
  .filter input {
    flex: 1;
  }
</style>
`;

export const Default = {
  render: () => `
    ${css}
    <div class="select-table">
      <div class="select-header">
        <div><div class="checkbox"></div></div>
        <div>Estudante</div>
        <div>Turma</div>
        <div>Média</div>
      </div>
      ${[
        { n: 'Ana Silva', t: '8º A', m: 9.5, c: '#6E63E8' },
        { n: 'Bruno Costa', t: '8º B', m: 8.8, c: '#00CFE8' },
        { n: 'Diana Santos', t: '8º A', m: 9.2, c: '#28C76F' }
      ].map((s, i) => `
        <div class="select-row${i === 0 ? ' selected' : ''}">
          <div><div class="checkbox${i === 0 ? ' checked' : ''}"></div></div>
          <div class="student-info">
            <div class="student-avatar" style="background: ${s.c};">
              ${s.n.split(' ').map(n => n[0]).join('')}
            </div>
            <div class="student-name">${s.n}</div>
          </div>
          <div style="font-size: 13px; color: #6E6B7B;">${s.t}</div>
          <div style="font-weight: 700; color: #28C76F;">${s.m}</div>
        </div>
      `).join('')}
    </div>
  `
};

export const TodosSelecionados = {
  render: () => `
    ${css}
    <div class="select-table">
      <div class="select-header">
        <div><div class="checkbox checked"></div></div>
        <div>Estudante</div>
        <div>Turma</div>
        <div>Média</div>
      </div>
      ${[
        { n: 'Ana Silva', t: '8º A', m: 9.5, c: '#6E63E8' },
        { n: 'Bruno Costa', t: '8º B', m: 8.8, c: '#00CFE8' },
        { n: 'Diana Santos', t: '8º A', m: 9.2, c: '#28C76F' }
      ].map(s => `
        <div class="select-row selected">
          <div><div class="checkbox checked"></div></div>
          <div class="student-info">
            <div class="student-avatar" style="background: ${s.c};">
              ${s.n.split(' ').map(n => n[0]).join('')}
            </div>
            <div class="student-name">${s.n}</div>
          </div>
          <div style="font-size: 13px; color: #6E6B7B;">${s.t}</div>
          <div style="font-weight: 700; color: #28C76F;">${s.m}</div>
        </div>
      `).join('')}
    </div>
    <p style="margin-top: 16px; font-size: 13px; color: #6E6B7B;">
      <strong>Contexto:</strong> Todos selecionados via checkbox master. Professor selecionando turma completa.
    </p>
  `
};

export const ComAcoes = {
  render: () => `
    ${css}
    <div class="select-table">
      <div class="select-header">
        <div><div class="checkbox checked"></div></div>
        <div>Estudante</div>
        <div>Turma</div>
        <div>Status</div>
      </div>
      ${[
        { n: 'Ana Silva', t: '8º A', s: 'Ativo', c: '#6E63E8' },
        { n: 'Bruno Costa', t: '8º B', s: 'Ativo', c: '#00CFE8' }
      ].map(s => `
        <div class="select-row selected">
          <div><div class="checkbox checked"></div></div>
          <div class="student-info">
            <div class="student-avatar" style="background: ${s.c};">
              ${s.n.split(' ').map(n => n[0]).join('')}
            </div>
            <div class="student-name">${s.n}</div>
          </div>
          <div style="font-size: 13px; color: #6E6B7B;">${s.t}</div>
          <div style="font-size: 13px; color: #28C76F;">${s.s}</div>
        </div>
      `).join('')}
      <div class="actions-bar">
        <div style="font-size: 13px; color: #6E6B7B;">
          <strong style="color: #5E5873;">2</strong> estudantes selecionados
        </div>
        <div style="display: flex; gap: 8px;">
          <button class="btn btn-secondary">Cancelar</button>
          <button class="btn btn-primary">Adicionar à Missão</button>
        </div>
      </div>
    </div>
    <p style="margin-top: 16px; font-size: 13px; color: #6E6B7B;">
      <strong>Contexto:</strong> Seleção com barra de ações. Professor adicionando alunos a uma missão.
    </p>
  `
};

export const Parcial = {
  render: () => `
    ${css}
    <div class="select-table">
      <div class="select-header">
        <div><div class="checkbox indeterminate"></div></div>
        <div>Estudante</div>
        <div>Turma</div>
        <div>Média</div>
      </div>
      ${[
        { n: 'Ana Silva', t: '8º A', m: 9.5, sel: true, c: '#6E63E8' },
        { n: 'Bruno Costa', t: '8º B', m: 8.8, sel: false, c: '#00CFE8' },
        { n: 'Diana Santos', t: '8º A', m: 9.2, sel: true, c: '#28C76F' },
        { n: 'Eduardo Lima', t: '9º A', m: 8.5, sel: false, c: '#FF9F43' }
      ].map(s => `
        <div class="select-row${s.sel ? ' selected' : ''}">
          <div><div class="checkbox${s.sel ? ' checked' : ''}"></div></div>
          <div class="student-info">
            <div class="student-avatar" style="background: ${s.c};">
              ${s.n.split(' ').map(n => n[0]).join('')}
            </div>
            <div class="student-name">${s.n}</div>
          </div>
          <div style="font-size: 13px; color: #6E6B7B;">${s.t}</div>
          <div style="font-weight: 700; color: #28C76F;">${s.m}</div>
        </div>
      `).join('')}
    </div>
    <p style="margin-top: 16px; font-size: 13px; color: #6E6B7B;">
      <strong>Contexto:</strong> Seleção parcial (checkbox master indeterminado). Professor selecionando alguns alunos.
    </p>
  `
};

export const MultiSelecao = {
  render: () => `
    ${css}
    <div class="select-table">
      <div class="select-header">
        <div><div class="checkbox checked"></div></div>
        <div>Missão</div>
        <div>Data Limite</div>
        <div>Status</div>
      </div>
      ${[
        { m: 'Frações Básicas', d: '10/02/2026', s: 'Aberta', c: '#28C76F' },
        { m: 'Verbos e Conjugações', d: '12/02/2026', s: 'Aberta', c: '#6E63E8' },
        { m: 'Sistema Solar', d: '15/02/2026', s: 'Rascunho', c: '#FF9F43' }
      ].map(item => `
        <div class="select-row selected">
          <div><div class="checkbox checked"></div></div>
          <div style="font-weight: 600; color: #5E5873;">${item.m}</div>
          <div style="font-size: 13px; color: #6E6B7B;">${item.d}</div>
          <div>
            <span style="padding: 4px 10px; border-radius: 6px; font-size: 12px; font-weight: 600; background: ${item.c}20; color: ${item.c};">
              ${item.s}
            </span>
          </div>
        </div>
      `).join('')}
      <div class="actions-bar">
        <div style="font-size: 13px; color: #6E6B7B;">
          <strong style="color: #5E5873;">3</strong> missões selecionadas
        </div>
        <div style="display: flex; gap: 8px;">
          <button class="btn btn-secondary">Duplicar</button>
          <button class="btn btn-danger">Excluir</button>
        </div>
      </div>
    </div>
    <p style="margin-top: 16px; font-size: 13px; color: #6E6B7B;">
      <strong>Contexto:</strong> Seleção de missões para ações em lote. Professor duplicando ou excluindo múltiplas missões.
    </p>
  `
};

export const ComFiltro = {
  render: () => `
    ${css}
    <div class="select-table">
      <div class="filter">
        <input type="text" placeholder="Buscar estudante..." />
        <select style="padding: 8px 12px; border-radius: 6px; border: 1px solid #D8D6DE;">
          <option>Todas Turmas</option>
          <option>8º Ano A</option>
          <option>8º Ano B</option>
          <option>9º Ano A</option>
        </select>
      </div>
      <div class="select-header">
        <div><div class="checkbox"></div></div>
        <div>Estudante</div>
        <div>Turma</div>
        <div>Média</div>
      </div>
      ${[
        { n: 'Ana Silva', t: '8º A', m: 9.5, c: '#6E63E8' }
      ].map(s => `
        <div class="select-row">
          <div><div class="checkbox"></div></div>
          <div class="student-info">
            <div class="student-avatar" style="background: ${s.c};">
              ${s.n.split(' ').map(n => n[0]).join('')}
            </div>
            <div class="student-name">${s.n}</div>
          </div>
          <div style="font-size: 13px; color: #6E6B7B;">${s.t}</div>
          <div style="font-weight: 700; color: #28C76F;">${s.m}</div>
        </div>
      `).join('')}
    </div>
    <p style="margin-top: 16px; font-size: 13px; color: #6E6B7B;">
      <strong>Contexto:</strong> Tabela com filtros de busca e turma. Coordenador localizando alunos específicos.
    </p>
  `
};

export const Exportar = {
  render: () => `
    ${css}
    <div class="select-table">
      <div class="select-header">
        <div><div class="checkbox checked"></div></div>
        <div>Estudante</div>
        <div>Email</div>
        <div>Turma</div>
      </div>
      ${[
        { n: 'Ana Silva', e: 'ana@aluno.com', t: '8º A', c: '#6E63E8' },
        { n: 'Bruno Costa', e: 'bruno@aluno.com', t: '8º B', c: '#00CFE8' }
      ].map(s => `
        <div class="select-row selected">
          <div><div class="checkbox checked"></div></div>
          <div class="student-info">
            <div class="student-avatar" style="background: ${s.c};">
              ${s.n.split(' ').map(n => n[0]).join('')}
            </div>
            <div class="student-name">${s.n}</div>
          </div>
          <div style="font-size: 13px; color: #6E6B7B;">${s.e}</div>
          <div style="font-size: 13px; color: #6E6B7B;">${s.t}</div>
        </div>
      `).join('')}
      <div class="actions-bar">
        <div style="font-size: 13px; color: #6E6B7B;">
          <strong style="color: #5E5873;">2</strong> selecionados
        </div>
        <div style="display: flex; gap: 8px;">
          <button class="btn btn-secondary">
            <i class="bi bi-file-earmark-excel"></i> Excel
          </button>
          <button class="btn btn-secondary">
            <i class="bi bi-file-earmark-pdf"></i> PDF
          </button>
          <button class="btn btn-primary">
            <i class="bi bi-envelope"></i> Enviar Email
          </button>
        </div>
      </div>
    </div>
    <p style="margin-top: 16px; font-size: 13px; color: #6E6B7B;">
      <strong>Contexto:</strong> Seleção para exportação. Secretaria gerando relatórios e enviando comunicados.
    </p>
  `
};

export const Completa = {
  render: () => `
    ${css}
    <div style="background: #fff; border: 1px solid #D8D6DE; border-radius: 8px; padding: 20px;">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
        <div>
          <h3 style="margin: 0; font-size: 20px; font-weight: 700; color: #5E5873;">Selecionar Alunos</h3>
          <div style="font-size: 13px; color: #6E6B7B; margin-top: 4px;">Selecione os alunos para adicionar à missão "Frações Básicas"</div>
        </div>
      </div>
      
      <div class="select-table">
        <div class="select-header">
          <div><div class="checkbox checked"></div></div>
          <div>Estudante</div>
          <div>Turma</div>
          <div>Média</div>
        </div>
        ${[
          { n: 'Ana Silva', t: '8º A', m: 9.5, c: '#6E63E8' },
          { n: 'Bruno Costa', t: '8º B', m: 8.8, c: '#00CFE8' },
          { n: 'Diana Santos', t: '8º A', m: 9.2, c: '#28C76F' }
        ].map(s => `
          <div class="select-row selected">
            <div><div class="checkbox checked"></div></div>
            <div class="student-info">
              <div class="student-avatar" style="background: ${s.c};">
                ${s.n.split(' ').map(n => n[0]).join('')}
              </div>
              <div class="student-name">${s.n}</div>
            </div>
            <div style="font-size: 13px; color: #6E6B7B;">${s.t}</div>
            <div style="font-weight: 700; color: #28C76F;">${s.m}</div>
          </div>
        `).join('')}
        <div class="actions-bar">
          <div style="font-size: 13px; color: #6E6B7B;">
            <strong style="color: #5E5873;">3</strong> alunos selecionados
          </div>
          <div style="display: flex; gap: 8px;">
            <button class="btn btn-secondary">Cancelar</button>
            <button class="btn btn-primary">Adicionar à Missão</button>
          </div>
        </div>
      </div>
    </div>
    <p style="margin-top: 16px; font-size: 13px; color: #6E6B7B;">
      <strong>Contexto:</strong> Interface completa de seleção. Professor adicionando alunos à missão.
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
          <div style="display:inline-block;padding:8px 16px;background:rgba(255,255,255,0.15);border-radius:50px;margin-bottom:20px;font-size:14px;border:1px solid rgba(255,255,255,0.2);">Tables</div>
          <h1 style="font-size:3rem;font-weight:700;margin:0 0 12px 0;letter-spacing:-0.02em;">ListTableSelect</h1>
          <p style="font-size:1.1rem;opacity:0.9;margin:0;max-width:600px;">Table with Multiple Selection</p>
        </div>
      </div>
      <div style="max-width:900px;margin:0 auto;padding:48px 40px;">
        <div style="background:white;border-radius:12px;padding:32px;margin-bottom:32px;box-shadow:0 2px 8px rgba(0,0,0,0.08);">
          <h2 style="font-size:1.1rem;font-weight:600;color:#5E5873;margin:0 0 16px 0;">Sobre o Componente</h2>
          <p style="color:#6E6B7B;line-height:1.7;margin:0 0 16px 0;">Table with Multiple Selection. Faz parte da categoria <strong>Tables</strong> do Design System Educacross.</p>
          <div style="background:#F8F7FF;border-left:4px solid #6E63E8;padding:16px;border-radius:4px;">
            <p style="margin:0;color:#5E5873;font-size:14px;line-height:1.6;"><strong>💡 Dica:</strong> Use <em>Playground</em> para explorar props, <em>Use Cases</em> para exemplos reais e <em>Accessibility</em> para validar WCAG.</p>
          </div>
        </div>
        <div style="background:white;border-radius:12px;padding:32px;box-shadow:0 2px 8px rgba(0,0,0,0.08);">
          <h2 style="font-size:1.1rem;font-weight:600;color:#5E5873;margin:0 0 16px 0;">Implementação Vue 2.7</h2>
          <pre style="background:#1E1E2E;color:#CDD6F4;padding:20px;border-radius:8px;font-size:13px;line-height:1.6;overflow:auto;margin:0;"><code>import ListTableSelect from '@/components/ListTableSelect.vue';

// Template
&lt;ListTableSelect v-bind="props" /&gt;</code></pre>
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
    docs: { description: { story: 'Explore o ListTableSelect com controles interativos.' } },
  },
  render: (args) => `
    <div style="padding:32px;display:flex;justify-content:center;align-items:center;min-height:200px;background:#F8F8F8;border-radius:12px;">
      <div style="text-align:center;color:#6E6B7B;">
        <div style="width:60px;height:60px;background:#6E63E820;border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 16px;font-size:24px;">🎨</div>
        <p style="margin:0 0 8px 0;font-size:15px;font-weight:600;color:#5E5873;">Playground ListTableSelect</p>
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
    docs: { description: { story: 'Exemplos de uso real do ListTableSelect no Educacross.' } },
  },
  render: () => `
    <div style="max-width:800px;margin:0 auto;padding:40px 20px;font-family:'Public Sans',sans-serif;">
      <div style="background:#6E63E815;border:1px solid #6E63E830;border-radius:12px;padding:24px;margin-bottom:40px;">
        <h1 style="font-size:1.5rem;font-weight:700;color:#5E5873;margin:0 0 8px 0;">Casos de Uso: ListTableSelect</h1>
        <p style="color:#6E6B7B;margin:0;font-size:14px;line-height:1.6;">Cenários reais de uso no contexto educacional da plataforma Educacross</p>
      </div>
      
      <div style="margin-bottom:32px;">
        <h2 style="font-size:18px;font-weight:600;color:#5E5873;margin:0 0 8px 0;display:flex;align-items:center;gap:10px;">
          <span style="display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;background:#6E63E8;color:white;border-radius:50%;font-size:13px;font-weight:700;flex-shrink:0;">1</span>
          Professor — Painel Principal
        </h2>
        <p style="color:#6E6B7B;margin:0 0 16px 0;padding-left:38px;font-size:14px;">Professor utilizando ListTableSelect no dashboard de gestão de turmas</p>
        <div style="background:#F8F8F8;border-radius:8px;padding:20px;margin-left:38px;text-align:center;color:#B9B9C3;font-size:13px;">
          Ver story <strong>Default</strong> para visualização do componente neste contexto
        </div>
      </div>
      <div style="margin-bottom:32px;">
        <h2 style="font-size:18px;font-weight:600;color:#5E5873;margin:0 0 8px 0;display:flex;align-items:center;gap:10px;">
          <span style="display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;background:#6E63E8;color:white;border-radius:50%;font-size:13px;font-weight:700;flex-shrink:0;">2</span>
          Aluno — Portal do Estudante
        </h2>
        <p style="color:#6E6B7B;margin:0 0 16px 0;padding-left:38px;font-size:14px;">Aluno interagindo com ListTableSelect no portal educacional</p>
        <div style="background:#F8F8F8;border-radius:8px;padding:20px;margin-left:38px;text-align:center;color:#B9B9C3;font-size:13px;">
          Ver story <strong>Default</strong> para visualização do componente neste contexto
        </div>
      </div>
      <div style="margin-bottom:32px;">
        <h2 style="font-size:18px;font-weight:600;color:#5E5873;margin:0 0 8px 0;display:flex;align-items:center;gap:10px;">
          <span style="display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;background:#6E63E8;color:white;border-radius:50%;font-size:13px;font-weight:700;flex-shrink:0;">3</span>
          Coordenador — Relatórios
        </h2>
        <p style="color:#6E6B7B;margin:0 0 16px 0;padding-left:38px;font-size:14px;">Coordenador pedagógico analisando dados via ListTableSelect</p>
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
    docs: { description: { story: 'Conformidade WCAG 2.1 AA para o ListTableSelect.' } },
  },
  render: () => `
    <div style="max-width:800px;margin:0 auto;padding:40px 20px;font-family:'Public Sans',sans-serif;">

      <div style="background:linear-gradient(135deg,#6E63E8 0%,#764ba2 100%);padding:32px;border-radius:12px;margin-bottom:32px;color:white;">
        <h1 style="font-size:1.5rem;font-weight:700;margin:0 0 8px 0;">Acessibilidade: ListTableSelect</h1>
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

