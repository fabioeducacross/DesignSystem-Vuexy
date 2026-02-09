const U={title:"Educacross Components V2/Tables/ListTableSelectLocal",tags:["autodocs"],parameters:{docs:{description:{component:`
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
        `}}}},e=`<style>
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
</style>`,s={render:()=>`
    ${e}
    <div class="local-select-table">
      <div class="local-header">
        <div><div class="checkbox"></div></div>
        <div>Item</div>
        <div>Quantidade</div>
        <div>Valor</div>
      </div>
      ${[{i:"Cadernos",q:50,v:"R$ 250",icon:"📓",c:"#6E63E8",selected:!0},{i:"Canetas",q:120,v:"R$ 180",icon:"✒️",c:"#00CFE8",selected:!1},{i:"Lápis",q:200,v:"R$ 100",icon:"✏️",c:"#28C76F",selected:!1}].map(i=>`
        <div class="local-row${i.selected?" selected":""}">
          <div><div class="checkbox${i.selected?" checked":""}"></div></div>
          <div class="item-info">
            <div class="item-icon" style="background: ${i.c}20">${i.icon}</div>
            <div class="item-name">${i.i}</div>
          </div>
          <div style="font-size: 13px; color: #6E6B7B">${i.q} un.</div>
          <div style="font-weight: 600; color: #5E5873">${i.v}</div>
        </div>
      `).join("")}
      <div class="selection-summary">
        <span><i class="bi bi-check-circle-fill"></i> 1 item selecionado</span>
      </div>
    </div>
  `},o={render:()=>`
    ${e}
    <div class="local-select-table">
      <div class="local-header">
        <div><div class="checkbox checked"></div></div>
        <div>Material</div>
        <div>Quantidade</div>
        <div>Total</div>
      </div>
      ${[{i:"Livros Didáticos",q:35,v:"R$ 1.750",icon:"📚",c:"#6E63E8"},{i:"Atlas Geográfico",q:35,v:"R$ 875",icon:"🗺️",c:"#00CFE8"},{i:"Calculadoras",q:35,v:"R$ 525",icon:"🔢",c:"#28C76F"}].map(i=>`
        <div class="local-row selected">
          <div><div class="checkbox checked"></div></div>
          <div class="item-info">
            <div class="item-icon" style="background: ${i.c}20">${i.icon}</div>
            <div class="item-name">${i.i}</div>
          </div>
          <div style="font-size: 13px; color: #6E6B7B">${i.q}</div>
          <div style="font-weight: 700; color: #28C76F">${i.v}</div>
        </div>
      `).join("")}
      <div class="selection-summary">
        <span><i class="bi bi-check-circle-fill"></i> 3 itens selecionados • Total: R$ 3.150</span>
      </div>
    </div>
  `},d={render:()=>`
    ${e}
    <div class="local-select-table">
      <div class="local-header">
        <div><div class="checkbox indeterminate"></div></div>
        <div>Recurso Didático</div>
        <div>Disponível</div>
        <div>Status</div>
      </div>
      ${[{r:"Projetor Multimídia",d:5,s:"Disponível",icon:"📽️",c:"#28C76F",sel:!0},{r:"Laboratório de Ciências",d:2,s:"Disponível",icon:"🔬",c:"#28C76F",sel:!0},{r:"Quadra Esportiva",d:1,s:"Reservado",icon:"⚽",c:"#FF9F43",sel:!1}].map(i=>`
        <div class="local-row${i.sel?" selected":""}">
          <div><div class="checkbox${i.sel?" checked":""}"></div></div>
          <div class="item-info">
            <div class="item-icon" style="background: ${i.c}20">${i.icon}</div>
            <div class="item-name">${i.r}</div>
          </div>
          <div style="font-size: 13px; color: #6E6B7B">${i.d} un.</div>
          <div>
            <span style="padding: 4px 10px; border-radius: 6px; font-size: 12px; font-weight: 600; background: ${i.c}20; color: ${i.c}">${i.s}</span>
          </div>
        </div>
      `).join("")}
      <div class="selection-summary">
        <span><i class="bi bi-check-circle-fill"></i> 2 recursos selecionados</span>
      </div>
    </div>
  `},a={render:()=>`
    ${e}
    <div class="local-select-table">
      <div class="local-header">
        <div><div class="checkbox checked"></div></div>
        <div>Atividade</div>
        <div>Duração</div>
        <div>Tipo</div>
      </div>
      ${[{a:"Leitura de Texto",d:"30 min",t:"Individual",icon:"📖",c:"#6E63E8"},{a:"Discussão em Grupo",d:"45 min",t:"Grupo",icon:"💬",c:"#00CFE8"},{a:"Exercícios Práticos",d:"60 min",t:"Individual",icon:"✍️",c:"#28C76F"}].map(i=>`
        <div class="local-row selected">
          <div><div class="checkbox checked"></div></div>
          <div class="item-info">
            <div class="item-icon" style="background: ${i.c}20">${i.icon}</div>
            <div class="item-name">${i.a}</div>
          </div>
          <div style="font-size: 13px; color: #6E6B7B">${i.d}</div>
          <div>
            <span style="padding: 4px 10px; border-radius: 6px; font-size: 12px; font-weight: 600; background: ${i.c}20; color: ${i.c}">${i.t}</span>
          </div>
        </div>
      `).join("")}
      <div class="selection-summary">
        <span><i class="bi bi-check-circle-fill"></i> 3 atividades • Tempo total: 2h 15min</span>
      </div>
    </div>
  `},n={render:()=>`
    ${e}
    <div class="local-select-table">
      <div class="local-header">
        <div><div class="checkbox indeterminate"></div></div>
        <div>Tópico BNCC</div>
        <div>Ano</div>
        <div>Disciplina</div>
      </div>
      ${[{t:"Operações com Frações",a:"7º",d:"Matemática",sel:!0,c:"#6E63E8"},{t:"Verbos no Pretérito",a:"8º",d:"Português",sel:!0,c:"#00CFE8"},{t:"Ciclo da Água",a:"6º",d:"Ciências",sel:!1,c:"#28C76F"}].map(i=>`
        <div class="local-row${i.sel?" selected":""}">
          <div><div class="checkbox${i.sel?" checked":""}"></div></div>
          <div style="font-weight: 600; color: #5E5873">${i.t}</div>
          <div style="font-size: 13px; color: #6E6B7B">${i.a} Ano</div>
          <div>
            <span style="padding: 4px 10px; border-radius: 6px; font-size: 12px; font-weight: 600; background: ${i.c}20; color: ${i.c}">${i.d}</span>
          </div>
        </div>
      `).join("")}
      <div class="selection-summary">
        <span><i class="bi bi-check-circle-fill"></i> 2 tópicos selecionados</span>
      </div>
    </div>
  `},c={render:()=>`
    ${e}
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
      ${[{i:"Livros Didáticos",q:35,v:"R$ 1.750",icon:"📚",c:"#6E63E8",sel:!0}].map(i=>`
        <div class="local-row selected">
          <div><div class="checkbox checked"></div></div>
          <div class="item-info">
            <div class="item-icon" style="background: ${i.c}20">${i.icon}</div>
            <div class="item-name">${i.i}</div>
          </div>
          <div style="font-size: 13px; color: #6E6B7B">${i.q}</div>
          <div style="font-weight: 600; color: #5E5873">${i.v}</div>
        </div>
      `).join("")}
      <div class="selection-summary">
        <span><i class="bi bi-check-circle-fill"></i> 1 item encontrado e selecionado</span>
      </div>
    </div>
  `},t={render:()=>`
    ${e}
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
  `},l={render:()=>`
    ${e}
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
        ${[{i:"Livros Didáticos",q:35,v:"R$ 1.750",icon:"📚",c:"#6E63E8"},{i:"Cadernos",q:50,v:"R$ 250",icon:"📓",c:"#00CFE8"},{i:"Canetas",q:120,v:"R$ 180",icon:"✒️",c:"#28C76F"}].map(i=>`
          <div class="local-row selected">
            <div><div class="checkbox checked"></div></div>
            <div class="item-info">
              <div class="item-icon" style="background: ${i.c}20">${i.icon}</div>
              <div class="item-name">${i.i}</div>
            </div>
            <div style="font-size: 13px; color: #6E6B7B">${i.q}</div>
            <div style="font-weight: 700; color: #28C76F">${i.v}</div>
          </div>
        `).join("")}
        <div class="selection-summary">
          <span><i class="bi bi-check-circle-fill"></i> 3 itens selecionados • Valor total: R$ 2.180</span>
        </div>
      </div>
      
      <p style="margin-top: 12px; font-size: 13px; color: #6E6B7B">
        <strong>Contexto:</strong> Seleção local (coordenador escolhendo materiais para pedido, sem API).
      </p>
    </div>
  `};var r,v,p,m,u;s.parameters={...s.parameters,docs:{...(r=s.parameters)==null?void 0:r.docs,source:{originalSource:`{
  render: () => \`
    \${styles}
    <div class="local-select-table">
      <div class="local-header">
        <div><div class="checkbox"></div></div>
        <div>Item</div>
        <div>Quantidade</div>
        <div>Valor</div>
      </div>
      \${[{
    i: 'Cadernos',
    q: 50,
    v: 'R$ 250',
    icon: '📓',
    c: '#6E63E8',
    selected: true
  }, {
    i: 'Canetas',
    q: 120,
    v: 'R$ 180',
    icon: '✒️',
    c: '#00CFE8',
    selected: false
  }, {
    i: 'Lápis',
    q: 200,
    v: 'R$ 100',
    icon: '✏️',
    c: '#28C76F',
    selected: false
  }].map(item => \`
        <div class="local-row\${item.selected ? ' selected' : ''}">
          <div><div class="checkbox\${item.selected ? ' checked' : ''}"></div></div>
          <div class="item-info">
            <div class="item-icon" style="background: \${item.c}20">\${item.icon}</div>
            <div class="item-name">\${item.i}</div>
          </div>
          <div style="font-size: 13px; color: #6E6B7B">\${item.q} un.</div>
          <div style="font-weight: 600; color: #5E5873">\${item.v}</div>
        </div>
      \`).join('')}
      <div class="selection-summary">
        <span><i class="bi bi-check-circle-fill"></i> 1 item selecionado</span>
      </div>
    </div>
  \`
}`,...(p=(v=s.parameters)==null?void 0:v.docs)==null?void 0:p.source},description:{story:`Story: Default

Estado padrão com 3 itens (Cadernos, Canetas, Lápis), 1 selecionado.

Educational context: Coordenador iniciando seleção de materiais para pedido de papelaria.`,...(u=(m=s.parameters)==null?void 0:m.docs)==null?void 0:u.description}}};var x,b,E,h,f;o.parameters={...o.parameters,docs:{...(x=o.parameters)==null?void 0:x.docs,source:{originalSource:`{
  render: () => \`
    \${styles}
    <div class="local-select-table">
      <div class="local-header">
        <div><div class="checkbox checked"></div></div>
        <div>Material</div>
        <div>Quantidade</div>
        <div>Total</div>
      </div>
      \${[{
    i: 'Livros Didáticos',
    q: 35,
    v: 'R$ 1.750',
    icon: '📚',
    c: '#6E63E8'
  }, {
    i: 'Atlas Geográfico',
    q: 35,
    v: 'R$ 875',
    icon: '🗺️',
    c: '#00CFE8'
  }, {
    i: 'Calculadoras',
    q: 35,
    v: 'R$ 525',
    icon: '🔢',
    c: '#28C76F'
  }].map(item => \`
        <div class="local-row selected">
          <div><div class="checkbox checked"></div></div>
          <div class="item-info">
            <div class="item-icon" style="background: \${item.c}20">\${item.icon}</div>
            <div class="item-name">\${item.i}</div>
          </div>
          <div style="font-size: 13px; color: #6E6B7B">\${item.q}</div>
          <div style="font-weight: 700; color: #28C76F">\${item.v}</div>
        </div>
      \`).join('')}
      <div class="selection-summary">
        <span><i class="bi bi-check-circle-fill"></i> 3 itens selecionados • Total: R$ 3.150</span>
      </div>
    </div>
  \`
}`,...(E=(b=o.parameters)==null?void 0:b.docs)==null?void 0:E.source},description:{story:`Story: Multiplos

Todos os 3 itens selecionados (Livros Didáticos, Atlas Geográfico, Calculadoras).
Barra de resumo exibe total acumulado: R$ 3.150.

Educational context: Coordenador selecionou todos os materiais didáticos para requisição da turma 9º Ano.`,...(f=(h=o.parameters)==null?void 0:h.docs)==null?void 0:f.description}}};var g,$,y,k,C;d.parameters={...d.parameters,docs:{...(g=d.parameters)==null?void 0:g.docs,source:{originalSource:`{
  render: () => \`
    \${styles}
    <div class="local-select-table">
      <div class="local-header">
        <div><div class="checkbox indeterminate"></div></div>
        <div>Recurso Didático</div>
        <div>Disponível</div>
        <div>Status</div>
      </div>
      \${[{
    r: 'Projetor Multimídia',
    d: 5,
    s: 'Disponível',
    icon: '📽️',
    c: '#28C76F',
    sel: true
  }, {
    r: 'Laboratório de Ciências',
    d: 2,
    s: 'Disponível',
    icon: '🔬',
    c: '#28C76F',
    sel: true
  }, {
    r: 'Quadra Esportiva',
    d: 1,
    s: 'Reservado',
    icon: '⚽',
    c: '#FF9F43',
    sel: false
  }].map(r => \`
        <div class="local-row\${r.sel ? ' selected' : ''}">
          <div><div class="checkbox\${r.sel ? ' checked' : ''}"></div></div>
          <div class="item-info">
            <div class="item-icon" style="background: \${r.c}20">\${r.icon}</div>
            <div class="item-name">\${r.r}</div>
          </div>
          <div style="font-size: 13px; color: #6E6B7B">\${r.d} un.</div>
          <div>
            <span style="padding: 4px 10px; border-radius: 6px; font-size: 12px; font-weight: 600; background: \${r.c}20; color: \${r.c}">\${r.s}</span>
          </div>
        </div>
      \`).join('')}
      <div class="selection-summary">
        <span><i class="bi bi-check-circle-fill"></i> 2 recursos selecionados</span>
      </div>
    </div>
  \`
}`,...(y=($=d.parameters)==null?void 0:$.docs)==null?void 0:y.source},description:{story:`Story: Recursos

Seleção de recursos didáticos: 2 selecionados (Projetor, Laboratório), 1 não (Quadra reservada).
Status badge colorido por disponibilidade.

Educational context: Professor reservando recursos para aula prática de Ciências (projetor + laboratório).`,...(C=(k=d.parameters)==null?void 0:k.docs)==null?void 0:C.description}}};var D,F,B,w,z;a.parameters={...a.parameters,docs:{...(D=a.parameters)==null?void 0:D.docs,source:{originalSource:`{
  render: () => \`
    \${styles}
    <div class="local-select-table">
      <div class="local-header">
        <div><div class="checkbox checked"></div></div>
        <div>Atividade</div>
        <div>Duração</div>
        <div>Tipo</div>
      </div>
      \${[{
    a: 'Leitura de Texto',
    d: '30 min',
    t: 'Individual',
    icon: '📖',
    c: '#6E63E8'
  }, {
    a: 'Discussão em Grupo',
    d: '45 min',
    t: 'Grupo',
    icon: '💬',
    c: '#00CFE8'
  }, {
    a: 'Exercícios Práticos',
    d: '60 min',
    t: 'Individual',
    icon: '✍️',
    c: '#28C76F'
  }].map(a => \`
        <div class="local-row selected">
          <div><div class="checkbox checked"></div></div>
          <div class="item-info">
            <div class="item-icon" style="background: \${a.c}20">\${a.icon}</div>
            <div class="item-name">\${a.a}</div>
          </div>
          <div style="font-size: 13px; color: #6E6B7B">\${a.d}</div>
          <div>
            <span style="padding: 4px 10px; border-radius: 6px; font-size: 12px; font-weight: 600; background: \${a.c}20; color: \${a.c}">\${a.t}</span>
          </div>
        </div>
      \`).join('')}
      <div class="selection-summary">
        <span><i class="bi bi-check-circle-fill"></i> 3 atividades • Tempo total: 2h 15min</span>
      </div>
    </div>
  \`
}`,...(B=(F=a.parameters)==null?void 0:F.docs)==null?void 0:B.source},description:{story:`Story: Atividades

Todas as 3 atividades selecionadas (Leitura, Discussão, Exercícios).
Resumo exibe tempo total acumulado: 2h 15min.

Educational context: Professor montando plano de aula com 3 atividades sequenciais.`,...(z=(w=a.parameters)==null?void 0:w.docs)==null?void 0:z.description}}};var A,S,R,q,L;n.parameters={...n.parameters,docs:{...(A=n.parameters)==null?void 0:A.docs,source:{originalSource:`{
  render: () => \`
    \${styles}
    <div class="local-select-table">
      <div class="local-header">
        <div><div class="checkbox indeterminate"></div></div>
        <div>Tópico BNCC</div>
        <div>Ano</div>
        <div>Disciplina</div>
      </div>
      \${[{
    t: 'Operações com Frações',
    a: '7º',
    d: 'Matemática',
    sel: true,
    c: '#6E63E8'
  }, {
    t: 'Verbos no Pretérito',
    a: '8º',
    d: 'Português',
    sel: true,
    c: '#00CFE8'
  }, {
    t: 'Ciclo da Água',
    a: '6º',
    d: 'Ciências',
    sel: false,
    c: '#28C76F'
  }].map(t => \`
        <div class="local-row\${t.sel ? ' selected' : ''}">
          <div><div class="checkbox\${t.sel ? ' checked' : ''}"></div></div>
          <div style="font-weight: 600; color: #5E5873">\${t.t}</div>
          <div style="font-size: 13px; color: #6E6B7B">\${t.a} Ano</div>
          <div>
            <span style="padding: 4px 10px; border-radius: 6px; font-size: 12px; font-weight: 600; background: \${t.c}20; color: \${t.c}">\${t.d}</span>
          </div>
        </div>
      \`).join('')}
      <div class="selection-summary">
        <span><i class="bi bi-check-circle-fill"></i> 2 tópicos selecionados</span>
      </div>
    </div>
  \`
}`,...(R=(S=n.parameters)==null?void 0:S.docs)==null?void 0:R.source},description:{story:`Story: Topicos

Seleção de tópicos BNCC: 2 selecionados (Frações, Verbos), 1 não (Ciclo da Água).
Badge colorido por disciplina.

Educational context: Coordenador selecionando tópicos BNCC para currículo bimestral de 7º/8º Anos.`,...(L=(q=n.parameters)==null?void 0:q.docs)==null?void 0:L.description}}};var T,j,M,V,I;c.parameters={...c.parameters,docs:{...(T=c.parameters)==null?void 0:T.docs,source:{originalSource:`{
  render: () => \`
    \${styles}
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
      \${[{
    i: 'Livros Didáticos',
    q: 35,
    v: 'R$ 1.750',
    icon: '📚',
    c: '#6E63E8',
    sel: true
  }].map(item => \`
        <div class="local-row selected">
          <div><div class="checkbox checked"></div></div>
          <div class="item-info">
            <div class="item-icon" style="background: \${item.c}20">\${item.icon}</div>
            <div class="item-name">\${item.i}</div>
          </div>
          <div style="font-size: 13px; color: #6E6B7B">\${item.q}</div>
          <div style="font-weight: 600; color: #5E5873">\${item.v}</div>
        </div>
      \`).join('')}
      <div class="selection-summary">
        <span><i class="bi bi-check-circle-fill"></i> 1 item encontrado e selecionado</span>
      </div>
    </div>
  \`
}`,...(M=(j=c.parameters)==null?void 0:j.docs)==null?void 0:M.source},description:{story:`Story: ComBusca

Campo de busca no topo + 1 resultado filtrado (Livros Didáticos).
Input com ícone de lupa integrado.

Educational context: Coordenador filtrando lista de materiais por palavra-chave "Livro".`,...(I=(V=c.parameters)==null?void 0:V.docs)==null?void 0:I.description}}};var P,Q,H,G,N;t.parameters={...t.parameters,docs:{...(P=t.parameters)==null?void 0:P.docs,source:{originalSource:`{
  render: () => \`
    \${styles}
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
  \`
}`,...(H=(Q=t.parameters)==null?void 0:Q.docs)==null?void 0:H.source},description:{story:`Story: Vazio

Estado vazio com SVG placeholder + mensagem "Nenhum Item Disponível".

Educational context: Lista de materiais vazia aguardando cadastro.`,...(N=(G=t.parameters)==null?void 0:G.docs)==null?void 0:N.description}}};var Z,O,_,J,K;l.parameters={...l.parameters,docs:{...(Z=l.parameters)==null?void 0:Z.docs,source:{originalSource:`{
  render: () => \`
    \${styles}
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
        \${[{
    i: 'Livros Didáticos',
    q: 35,
    v: 'R$ 1.750',
    icon: '📚',
    c: '#6E63E8'
  }, {
    i: 'Cadernos',
    q: 50,
    v: 'R$ 250',
    icon: '📓',
    c: '#00CFE8'
  }, {
    i: 'Canetas',
    q: 120,
    v: 'R$ 180',
    icon: '✒️',
    c: '#28C76F'
  }].map(item => \`
          <div class="local-row selected">
            <div><div class="checkbox checked"></div></div>
            <div class="item-info">
              <div class="item-icon" style="background: \${item.c}20">\${item.icon}</div>
              <div class="item-name">\${item.i}</div>
            </div>
            <div style="font-size: 13px; color: #6E6B7B">\${item.q}</div>
            <div style="font-weight: 700; color: #28C76F">\${item.v}</div>
          </div>
        \`).join('')}
        <div class="selection-summary">
          <span><i class="bi bi-check-circle-fill"></i> 3 itens selecionados • Valor total: R$ 2.180</span>
        </div>
      </div>
      
      <p style="margin-top: 12px; font-size: 13px; color: #6E6B7B">
        <strong>Contexto:</strong> Seleção local (coordenador escolhendo materiais para pedido, sem API).
      </p>
    </div>
  \`
}`,...(_=(O=l.parameters)==null?void 0:O.docs)==null?void 0:_.source},description:{story:`Story: Completa

Interface completa com:
- Header "Selecionar Materiais" + botão "Confirmar Seleção"
- Tabela com 3 itens todos selecionados
- Barra de resumo com total acumulado: R$ 2.180
- Contexto educacional no rodapé

Educational context: Coordenador confirmando seleção de materiais para envio ao fornecedor.`,...(K=(J=l.parameters)==null?void 0:J.docs)==null?void 0:K.description}}};const W=["Default","Multiplos","Recursos","Atividades","Topicos","ComBusca","Vazio","Completa"];export{a as Atividades,c as ComBusca,l as Completa,s as Default,o as Multiplos,d as Recursos,n as Topicos,t as Vazio,W as __namedExportsOrder,U as default};
