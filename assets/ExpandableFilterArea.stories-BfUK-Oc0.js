const G={title:"Educacross Components V2/Filters/ExpandableFilterArea",tags:["autodocs"],parameters:{layout:"padded",docs:{description:{component:`
# ExpandableFilterArea

Painel de **filtros expansível** com animação suave de abertura/fechamento.

## Contexto de Uso

- **Busca avançada**: Filtros extras além da busca básica
- **Relatórios**: Parâmetros de geração de relatórios
- **Listagens**: Filtros para missões/alunos/turmas
- **Dashboard**: Filtros de período/disciplina
- **Questionários**: Filtros de dificuldade/tipo

## Características

- **Expand/Collapse**: Animação max-height + opacity
- **Toggle button**: Botão com ícone expand_more/expand_less
- **Slot footer**: Área customizável no rodapé
- **Event update:modelValue**: Emite estado aberto/fechado
- **Smooth transition**: 0.3s ease para UX fluida

## Props

- Nenhuma prop - controle via v-model

## Slots

- **footer**: Botões de ação (aplicar filtros, limpar)
        `}}}},e=`
<style>
  .filter-container {
    background: white;
    border: 1px solid #DBDADE;
    border-radius: 12px;
    padding: 20px;
    max-width: 800px;
  }
  
  .expand-content {
    overflow: hidden;
    transition: max-height 0.3s ease, opacity 0.3s ease;
  }
  
  .expand-content.collapsed {
    max-height: 0;
    opacity: 0;
  }
  
  .expand-content.expanded {
    max-height: 500px;
    opacity: 1;
  }
  
  .filter-group {
    margin-bottom: 16px;
  }
  
  .filter-label {
    font-size: 13px;
    font-weight: 600;
    color: #5D596C;
    margin-bottom: 6px;
    display: block;
  }
  
  .form-control {
    padding: 8px 12px;
    border: 1px solid #DBDADE;
    border-radius: 6px;
    font-size: 14px;
    width: 100%;
  }
  
  .toggle-button {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 8px;
    background: transparent;
    border: none;
    color: #6E63E8;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    padding: 12px;
    width: 100%;
    transition: background 0.2s;
  }
  
  .toggle-button:hover {
    background: rgba(110, 99, 232, 0.08);
  }
  
  .toggle-icon {
    font-size: 20px;
    transition: transform 0.3s;
  }
  
  .toggle-icon.rotated {
    transform: rotate(180deg);
  }
  
  .filter-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 16px;
    border-top: 1px solid #F3F2F7;
    margin-top: 16px;
  }
  
  .btn {
    padding: 8px 16px;
    border-radius: 6px;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    border: 1px solid transparent;
    transition: all 0.2s;
  }
  
  .btn-primary {
    background: #6E63E8;
    color: white;
  }
  
  .btn-outline {
    background: transparent;
    color: #6E6B7B;
    border-color: #DBDADE;
  }
</style>
`,t={render:()=>`
    ${e}
    <div class="filter-container">
      <div class="filter-group">
        <label class="filter-label">Disciplina</label>
        <select class="form-control">
          <option>Todas as disciplinas</option>
          <option>Matemática</option>
          <option>Português</option>
        </select>
      </div>
      
      <div class="expand-content collapsed" id="expandArea">
        <div class="filter-group">
          <label class="filter-label">Período</label>
          <select class="form-control">
            <option>Todo o período</option>
            <option>Último mês</option>
            <option>Último trimestre</option>
          </select>
        </div>
        
        <div class="filter-group">
          <label class="filter-label">Status</label>
          <select class="form-control">
            <option>Todos os status</option>
            <option>Ativa</option>
            <option>Concluída</option>
          </select>
        </div>
      </div>
      
      <button class="toggle-button" onclick="
        const area = document.getElementById('expandArea');
        const icon = document.getElementById('toggleIcon');
        area.classList.toggle('collapsed');
        area.classList.toggle('expanded');
        icon.classList.toggle('rotated');
      ">
        <span>Filtros avançados</span>
        <i class="bi bi-chevron-down toggle-icon" id="toggleIcon"></i>
      </button>
    </div>
  `},o={render:()=>`
    ${e}
    <div class="filter-container">
      <div class="filter-group">
        <label class="filter-label">Turma</label>
        <select class="form-control">
          <option>Todas as turmas</option>
          <option>7º A</option>
          <option>7º B</option>
        </select>
      </div>
      
      <div class="expand-content expanded">
        <div class="filter-group">
          <label class="filter-label">Data início</label>
          <input type="date" class="form-control" value="2026-01-01" />
        </div>
        
        <div class="filter-group">
          <label class="filter-label">Data fim</label>
          <input type="date" class="form-control" value="2026-02-01" />
        </div>
        
        <div class="filter-group">
          <label class="filter-label">Dificuldade</label>
          <select class="form-control">
            <option>Todas</option>
            <option>Fácil</option>
            <option>Média</option>
            <option>Difícil</option>
          </select>
        </div>
        
        <div class="filter-footer">
          <button class="btn btn-outline">Limpar filtros</button>
          <button class="btn btn-primary">Aplicar filtros</button>
        </div>
      </div>
      
      <button class="toggle-button">
        <span>Ocultar filtros avançados</span>
        <i class="bi bi-chevron-down toggle-icon rotated"></i>
      </button>
    </div>
  `},n={render:()=>`
    ${e}
    <div class="filter-container">
      <div class="filter-group">
        <label class="filter-label">Buscar por nome</label>
        <input type="text" class="form-control" placeholder="Digite o nome..." />
      </div>
      
      <div class="expand-content expanded">
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
          <div class="filter-group">
            <label class="filter-label">Ano</label>
            <select class="form-control">
              <option>2026</option>
              <option>2025</option>
            </select>
          </div>
          
          <div class="filter-group">
            <label class="filter-label">Bimestre</label>
            <select class="form-control">
              <option>1º Bimestre</option>
              <option>2º Bimestre</option>
            </select>
          </div>
          
          <div class="filter-group">
            <label class="filter-label">Proficiência</label>
            <select class="form-control">
              <option>Todas</option>
              <option>Avançado</option>
              <option>Proficiente</option>
              <option>Básico</option>
            </select>
          </div>
          
          <div class="filter-group">
            <label class="filter-label">Tipo</label>
            <select class="form-control">
              <option>Todos</option>
              <option>Missão</option>
              <option>Avaliação</option>
            </select>
          </div>
        </div>
        
        <div class="filter-footer">
          <span style="font-size: 13px; color: #6E6B7B;">5 filtros ativos</span>
          <div style="display: flex; gap: 8px;">
            <button class="btn btn-outline">Limpar</button>
            <button class="btn btn-primary">Aplicar (143 resultados)</button>
          </div>
        </div>
      </div>
      
      <button class="toggle-button">
        <span>Filtros avançados</span>
        <i class="bi bi-chevron-down toggle-icon rotated"></i>
      </button>
    </div>
  `},l={render:()=>`
    ${e}
    <div class="filter-container">
      <div class="filter-group">
        <label class="filter-label">Disciplina</label>
        <select class="form-control">
          <option>Matemática</option>
        </select>
      </div>
      
      <div class="expand-content collapsed">
        <p>Filtros ocultos...</p>
      </div>
      
      <button class="toggle-button">
        <span>Mostrar mais filtros</span>
        <i class="bi bi-chevron-down toggle-icon"></i>
      </button>
    </div>
  `},a={render:()=>`
    ${e}
    <style>
      .filter-chip {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        background: #F3F2F7;
        padding: 6px 12px;
        border-radius: 16px;
        font-size: 12px;
        color: #5D596C;
        margin-right: 8px;
        margin-bottom: 8px;
      }
      .chip-remove {
        cursor: pointer;
        color: #6E6B7B;
        font-weight: 700;
      }
    </style>
    <div class="filter-container">
      <div style="margin-bottom: 16px;">
        <span class="filter-chip">
          7º A
          <span class="chip-remove">×</span>
        </span>
        <span class="filter-chip">
          Matemática
          <span class="chip-remove">×</span>
        </span>
        <span class="filter-chip">
          Janeiro 2026
          <span class="chip-remove">×</span>
        </span>
      </div>
      
      <div class="expand-content expanded">
        <div class="filter-group">
          <label class="filter-label">Turma</label>
          <select class="form-control">
            <option>7º A</option>
            <option>7º B</option>
          </select>
        </div>
        
        <div class="filter-group">
          <label class="filter-label">Disciplina</label>
          <select class="form-control">
            <option>Matemática</option>
            <option>Português</option>
          </select>
        </div>
        
        <div class="filter-group">
          <label class="filter-label">Período</label>
          <select class="form-control">
            <option>Janeiro 2026</option>
            <option>Fevereiro 2026</option>
          </select>
        </div>
      </div>
      
      <button class="toggle-button">
        <span>Filtros</span>
        <i class="bi bi-chevron-down toggle-icon rotated"></i>
      </button>
    </div>
  `},i={render:()=>`
    ${e}
    <div class="filter-container">
      <h3 style="font-size: 16px; font-weight: 600; margin-bottom: 16px; color: #5D596C;">
        Gerar Relatório de Desempenho
      </h3>
      
      <div class="expand-content expanded">
        <div class="filter-group">
          <label class="filter-label">Tipo de relatório</label>
          <select class="form-control">
            <option>Desempenho individual</option>
            <option>Desempenho por turma</option>
            <option>Comparativo disciplinas</option>
          </select>
        </div>
        
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
          <div class="filter-group">
            <label class="filter-label">Período inicial</label>
            <input type="date" class="form-control" value="2026-01-01" />
          </div>
          
          <div class="filter-group">
            <label class="filter-label">Período final</label>
            <input type="date" class="form-control" value="2026-02-01" />
          </div>
        </div>
        
        <div class="filter-group">
          <label class="filter-label">Incluir no relatório</label>
          <div style="display: flex; flex-direction: column; gap: 8px; padding: 8px 0;">
            <label style="display: flex; align-items: center; gap: 8px; font-size: 14px; color: #5D596C;">
              <input type="checkbox" checked /> Gráficos de desempenho
            </label>
            <label style="display: flex; align-items: center; gap: 8px; font-size: 14px; color: #5D596C;">
              <input type="checkbox" checked /> Análise por disciplina
            </label>
            <label style="display: flex; align-items: center; gap: 8px; font-size: 14px; color: #5D596C;">
              <input type="checkbox" /> Comparativo com média da turma
            </label>
          </div>
        </div>
        
        <div class="filter-footer">
          <button class="btn btn-outline">Cancelar</button>
          <button class="btn btn-primary">
            <i class="bi bi-file-earmark-pdf"></i> Gerar PDF
          </button>
        </div>
      </div>
      
      <button class="toggle-button">
        <span>Opções avançadas</span>
        <i class="bi bi-chevron-down toggle-icon rotated"></i>
      </button>
    </div>
  `},s={render:()=>`
    ${e}
    <div style="max-width: 375px; margin: 0 auto;">
      <div class="filter-container">
        <div class="filter-group">
          <label class="filter-label">Buscar</label>
          <input type="text" class="form-control" placeholder="Digite..." />
        </div>
        
        <div class="expand-content expanded">
          <div class="filter-group">
            <label class="filter-label">Turma</label>
            <select class="form-control">
              <option>7º A</option>
            </select>
          </div>
          
          <div class="filter-group">
            <label class="filter-label">Status</label>
            <select class="form-control">
              <option>Ativa</option>
            </select>
          </div>
          
          <div class="filter-footer" style="flex-direction: column; gap: 8px;">
            <button class="btn btn-primary" style="width: 100%;">Aplicar</button>
            <button class="btn btn-outline" style="width: 100%;">Limpar</button>
          </div>
        </div>
        
        <button class="toggle-button">
          <span>Filtros</span>
          <i class="bi bi-chevron-down toggle-icon rotated"></i>
        </button>
      </div>
    </div>
  `},r={render:()=>(setTimeout(()=>{const d=document.getElementById("interactiveToggle"),c=document.getElementById("interactiveArea"),b=document.getElementById("interactiveIcon"),O=document.getElementById("interactiveText");if(d&&c&&b){let p=!1;d.addEventListener("click",()=>{p=!p,c.classList.toggle("collapsed"),c.classList.toggle("expanded"),b.classList.toggle("rotated"),O.textContent=p?"Ocultar filtros":"Mostrar filtros"})}},100),`
      ${e}
      <div class="filter-container">
        <div class="filter-group">
          <label class="filter-label">Campo básico</label>
          <input type="text" class="form-control" placeholder="Sempre visível" />
        </div>
        
        <div class="expand-content collapsed" id="interactiveArea">
          <div class="filter-group">
            <label class="filter-label">Campo avançado 1</label>
            <input type="text" class="form-control" placeholder="Aparece ao expandir" />
          </div>
          
          <div class="filter-group">
            <label class="filter-label">Campo avançado 2</label>
            <input type="text" class="form-control" placeholder="Animação suave" />
          </div>
        </div>
        
        <button class="toggle-button" id="interactiveToggle">
          <span id="interactiveText">Mostrar filtros</span>
          <i class="bi bi-chevron-down toggle-icon" id="interactiveIcon"></i>
        </button>
      </div>
    `)};var u,v,f;t.parameters={...t.parameters,docs:{...(u=t.parameters)==null?void 0:u.docs,source:{originalSource:`{
  render: () => \`
    \${expandableFilterAreaStyles}
    <div class="filter-container">
      <div class="filter-group">
        <label class="filter-label">Disciplina</label>
        <select class="form-control">
          <option>Todas as disciplinas</option>
          <option>Matemática</option>
          <option>Português</option>
        </select>
      </div>
      
      <div class="expand-content collapsed" id="expandArea">
        <div class="filter-group">
          <label class="filter-label">Período</label>
          <select class="form-control">
            <option>Todo o período</option>
            <option>Último mês</option>
            <option>Último trimestre</option>
          </select>
        </div>
        
        <div class="filter-group">
          <label class="filter-label">Status</label>
          <select class="form-control">
            <option>Todos os status</option>
            <option>Ativa</option>
            <option>Concluída</option>
          </select>
        </div>
      </div>
      
      <button class="toggle-button" onclick="
        const area = document.getElementById('expandArea');
        const icon = document.getElementById('toggleIcon');
        area.classList.toggle('collapsed');
        area.classList.toggle('expanded');
        icon.classList.toggle('rotated');
      ">
        <span>Filtros avançados</span>
        <i class="bi bi-chevron-down toggle-icon" id="toggleIcon"></i>
      </button>
    </div>
  \`
}`,...(f=(v=t.parameters)==null?void 0:v.docs)==null?void 0:f.source}}};var g,m,x;o.parameters={...o.parameters,docs:{...(g=o.parameters)==null?void 0:g.docs,source:{originalSource:`{
  render: () => \`
    \${expandableFilterAreaStyles}
    <div class="filter-container">
      <div class="filter-group">
        <label class="filter-label">Turma</label>
        <select class="form-control">
          <option>Todas as turmas</option>
          <option>7º A</option>
          <option>7º B</option>
        </select>
      </div>
      
      <div class="expand-content expanded">
        <div class="filter-group">
          <label class="filter-label">Data início</label>
          <input type="date" class="form-control" value="2026-01-01" />
        </div>
        
        <div class="filter-group">
          <label class="filter-label">Data fim</label>
          <input type="date" class="form-control" value="2026-02-01" />
        </div>
        
        <div class="filter-group">
          <label class="filter-label">Dificuldade</label>
          <select class="form-control">
            <option>Todas</option>
            <option>Fácil</option>
            <option>Média</option>
            <option>Difícil</option>
          </select>
        </div>
        
        <div class="filter-footer">
          <button class="btn btn-outline">Limpar filtros</button>
          <button class="btn btn-primary">Aplicar filtros</button>
        </div>
      </div>
      
      <button class="toggle-button">
        <span>Ocultar filtros avançados</span>
        <i class="bi bi-chevron-down toggle-icon rotated"></i>
      </button>
    </div>
  \`
}`,...(x=(m=o.parameters)==null?void 0:m.docs)==null?void 0:x.source}}};var y,h,E;n.parameters={...n.parameters,docs:{...(y=n.parameters)==null?void 0:y.docs,source:{originalSource:`{
  render: () => \`
    \${expandableFilterAreaStyles}
    <div class="filter-container">
      <div class="filter-group">
        <label class="filter-label">Buscar por nome</label>
        <input type="text" class="form-control" placeholder="Digite o nome..." />
      </div>
      
      <div class="expand-content expanded">
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
          <div class="filter-group">
            <label class="filter-label">Ano</label>
            <select class="form-control">
              <option>2026</option>
              <option>2025</option>
            </select>
          </div>
          
          <div class="filter-group">
            <label class="filter-label">Bimestre</label>
            <select class="form-control">
              <option>1º Bimestre</option>
              <option>2º Bimestre</option>
            </select>
          </div>
          
          <div class="filter-group">
            <label class="filter-label">Proficiência</label>
            <select class="form-control">
              <option>Todas</option>
              <option>Avançado</option>
              <option>Proficiente</option>
              <option>Básico</option>
            </select>
          </div>
          
          <div class="filter-group">
            <label class="filter-label">Tipo</label>
            <select class="form-control">
              <option>Todos</option>
              <option>Missão</option>
              <option>Avaliação</option>
            </select>
          </div>
        </div>
        
        <div class="filter-footer">
          <span style="font-size: 13px; color: #6E6B7B;">5 filtros ativos</span>
          <div style="display: flex; gap: 8px;">
            <button class="btn btn-outline">Limpar</button>
            <button class="btn btn-primary">Aplicar (143 resultados)</button>
          </div>
        </div>
      </div>
      
      <button class="toggle-button">
        <span>Filtros avançados</span>
        <i class="bi bi-chevron-down toggle-icon rotated"></i>
      </button>
    </div>
  \`
}`,...(E=(h=n.parameters)==null?void 0:h.docs)==null?void 0:E.source}}};var A,D,B;l.parameters={...l.parameters,docs:{...(A=l.parameters)==null?void 0:A.docs,source:{originalSource:`{
  render: () => \`
    \${expandableFilterAreaStyles}
    <div class="filter-container">
      <div class="filter-group">
        <label class="filter-label">Disciplina</label>
        <select class="form-control">
          <option>Matemática</option>
        </select>
      </div>
      
      <div class="expand-content collapsed">
        <p>Filtros ocultos...</p>
      </div>
      
      <button class="toggle-button">
        <span>Mostrar mais filtros</span>
        <i class="bi bi-chevron-down toggle-icon"></i>
      </button>
    </div>
  \`
}`,...(B=(D=l.parameters)==null?void 0:D.docs)==null?void 0:B.source}}};var F,w,C;a.parameters={...a.parameters,docs:{...(F=a.parameters)==null?void 0:F.docs,source:{originalSource:`{
  render: () => \`
    \${expandableFilterAreaStyles}
    <style>
      .filter-chip {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        background: #F3F2F7;
        padding: 6px 12px;
        border-radius: 16px;
        font-size: 12px;
        color: #5D596C;
        margin-right: 8px;
        margin-bottom: 8px;
      }
      .chip-remove {
        cursor: pointer;
        color: #6E6B7B;
        font-weight: 700;
      }
    </style>
    <div class="filter-container">
      <div style="margin-bottom: 16px;">
        <span class="filter-chip">
          7º A
          <span class="chip-remove">×</span>
        </span>
        <span class="filter-chip">
          Matemática
          <span class="chip-remove">×</span>
        </span>
        <span class="filter-chip">
          Janeiro 2026
          <span class="chip-remove">×</span>
        </span>
      </div>
      
      <div class="expand-content expanded">
        <div class="filter-group">
          <label class="filter-label">Turma</label>
          <select class="form-control">
            <option>7º A</option>
            <option>7º B</option>
          </select>
        </div>
        
        <div class="filter-group">
          <label class="filter-label">Disciplina</label>
          <select class="form-control">
            <option>Matemática</option>
            <option>Português</option>
          </select>
        </div>
        
        <div class="filter-group">
          <label class="filter-label">Período</label>
          <select class="form-control">
            <option>Janeiro 2026</option>
            <option>Fevereiro 2026</option>
          </select>
        </div>
      </div>
      
      <button class="toggle-button">
        <span>Filtros</span>
        <i class="bi bi-chevron-down toggle-icon rotated"></i>
      </button>
    </div>
  \`
}`,...(C=(w=a.parameters)==null?void 0:w.docs)==null?void 0:C.source}}};var T,S,k;i.parameters={...i.parameters,docs:{...(T=i.parameters)==null?void 0:T.docs,source:{originalSource:`{
  render: () => \`
    \${expandableFilterAreaStyles}
    <div class="filter-container">
      <h3 style="font-size: 16px; font-weight: 600; margin-bottom: 16px; color: #5D596C;">
        Gerar Relatório de Desempenho
      </h3>
      
      <div class="expand-content expanded">
        <div class="filter-group">
          <label class="filter-label">Tipo de relatório</label>
          <select class="form-control">
            <option>Desempenho individual</option>
            <option>Desempenho por turma</option>
            <option>Comparativo disciplinas</option>
          </select>
        </div>
        
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
          <div class="filter-group">
            <label class="filter-label">Período inicial</label>
            <input type="date" class="form-control" value="2026-01-01" />
          </div>
          
          <div class="filter-group">
            <label class="filter-label">Período final</label>
            <input type="date" class="form-control" value="2026-02-01" />
          </div>
        </div>
        
        <div class="filter-group">
          <label class="filter-label">Incluir no relatório</label>
          <div style="display: flex; flex-direction: column; gap: 8px; padding: 8px 0;">
            <label style="display: flex; align-items: center; gap: 8px; font-size: 14px; color: #5D596C;">
              <input type="checkbox" checked /> Gráficos de desempenho
            </label>
            <label style="display: flex; align-items: center; gap: 8px; font-size: 14px; color: #5D596C;">
              <input type="checkbox" checked /> Análise por disciplina
            </label>
            <label style="display: flex; align-items: center; gap: 8px; font-size: 14px; color: #5D596C;">
              <input type="checkbox" /> Comparativo com média da turma
            </label>
          </div>
        </div>
        
        <div class="filter-footer">
          <button class="btn btn-outline">Cancelar</button>
          <button class="btn btn-primary">
            <i class="bi bi-file-earmark-pdf"></i> Gerar PDF
          </button>
        </div>
      </div>
      
      <button class="toggle-button">
        <span>Opções avançadas</span>
        <i class="bi bi-chevron-down toggle-icon rotated"></i>
      </button>
    </div>
  \`
}`,...(k=(S=i.parameters)==null?void 0:S.docs)==null?void 0:k.source}}};var I,M,L;s.parameters={...s.parameters,docs:{...(I=s.parameters)==null?void 0:I.docs,source:{originalSource:`{
  render: () => \`
    \${expandableFilterAreaStyles}
    <div style="max-width: 375px; margin: 0 auto;">
      <div class="filter-container">
        <div class="filter-group">
          <label class="filter-label">Buscar</label>
          <input type="text" class="form-control" placeholder="Digite..." />
        </div>
        
        <div class="expand-content expanded">
          <div class="filter-group">
            <label class="filter-label">Turma</label>
            <select class="form-control">
              <option>7º A</option>
            </select>
          </div>
          
          <div class="filter-group">
            <label class="filter-label">Status</label>
            <select class="form-control">
              <option>Ativa</option>
            </select>
          </div>
          
          <div class="filter-footer" style="flex-direction: column; gap: 8px;">
            <button class="btn btn-primary" style="width: 100%;">Aplicar</button>
            <button class="btn btn-outline" style="width: 100%;">Limpar</button>
          </div>
        </div>
        
        <button class="toggle-button">
          <span>Filtros</span>
          <i class="bi bi-chevron-down toggle-icon rotated"></i>
        </button>
      </div>
    </div>
  \`
}`,...(L=(M=s.parameters)==null?void 0:M.docs)==null?void 0:L.source}}};var P,z,$;r.parameters={...r.parameters,docs:{...(P=r.parameters)==null?void 0:P.docs,source:{originalSource:`{
  render: () => {
    setTimeout(() => {
      const toggleBtn = document.getElementById('interactiveToggle');
      const area = document.getElementById('interactiveArea');
      const icon = document.getElementById('interactiveIcon');
      const text = document.getElementById('interactiveText');
      if (toggleBtn && area && icon) {
        let isExpanded = false;
        toggleBtn.addEventListener('click', () => {
          isExpanded = !isExpanded;
          area.classList.toggle('collapsed');
          area.classList.toggle('expanded');
          icon.classList.toggle('rotated');
          text.textContent = isExpanded ? 'Ocultar filtros' : 'Mostrar filtros';
        });
      }
    }, 100);
    return \`
      \${expandableFilterAreaStyles}
      <div class="filter-container">
        <div class="filter-group">
          <label class="filter-label">Campo básico</label>
          <input type="text" class="form-control" placeholder="Sempre visível" />
        </div>
        
        <div class="expand-content collapsed" id="interactiveArea">
          <div class="filter-group">
            <label class="filter-label">Campo avançado 1</label>
            <input type="text" class="form-control" placeholder="Aparece ao expandir" />
          </div>
          
          <div class="filter-group">
            <label class="filter-label">Campo avançado 2</label>
            <input type="text" class="form-control" placeholder="Animação suave" />
          </div>
        </div>
        
        <button class="toggle-button" id="interactiveToggle">
          <span id="interactiveText">Mostrar filtros</span>
          <i class="bi bi-chevron-down toggle-icon" id="interactiveIcon"></i>
        </button>
      </div>
    \`;
  }
}`,...($=(z=r.parameters)==null?void 0:z.docs)==null?void 0:$.source}}};const R=["Default","WithFooter","MultipleFilters","Collapsed","WithChips","ReportFilters","MobileView","Interactive"];export{l as Collapsed,t as Default,r as Interactive,s as MobileView,n as MultipleFilters,i as ReportFilters,a as WithChips,o as WithFooter,R as __namedExportsOrder,G as default};
