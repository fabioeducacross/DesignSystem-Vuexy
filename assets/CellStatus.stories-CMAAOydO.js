const R={title:"Educacross Components V2/Badges/CellStatus",tags:["autodocs"],parameters:{layout:"centered",docs:{description:{component:`
# CellStatus

Badge de **status em célula** com overlay absoluto.

## Contexto de Uso

- **Tabelas de edição**: Status de correção/revisão
- **Dashboards**: Indicadores de progresso
- **Listas de tarefas**: Estado de cada item
- **Acompanhamento**: Ritmo de progresso (pace)
- **Admin panels**: Status de aprovação

## Características

- **Position absolute**: Overlay completo da célula
- **Badge pill**: Badge arredondado com ícone
- **Icons Material**: person_edit, check, pace
- **Flex centered**: Centralizado vertical/horizontal
- **Gap 1**: Espaçamento entre elementos
- **Text uppercase**: Texto em maiúsculas

## Props

- Nenhuma prop - estilo via classes
        `}}}},s=`
<style>
  .demo-table {
    border-collapse: collapse;
    width: 100%;
    max-width: 800px;
  }
  
  .demo-table th,
  .demo-table td {
    border: 1px solid #DBDADE;
    padding: 12px;
    text-align: left;
  }
  
  .demo-table th {
    background: #F8F7FA;
    font-weight: 600;
    color: #5D596C;
  }
  
  .status-cell {
    position: relative;
    height: 80px;
    width: 120px;
  }
  
  .cell-status-overlay {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 8px;
  }
  
  .status-badge {
    padding: 6px 12px;
    border-radius: 16px;
    font-size: 12px;
    font-weight: 600;
    text-transform: uppercase;
    display: inline-flex;
    align-items: center;
    gap: 6px;
  }
  
  .badge-editing {
    background: #E3F2FD;
    color: #1565C0;
  }
  
  .badge-reviewing {
    background: #FFF3E0;
    color: #E65100;
  }
  
  .badge-completed {
    background: #E8F5E9;
    color: #2E7D32;
  }
  
  .badge-pending {
    background: #F3F2F7;
    color: #6E6B7B;
  }
  
  .badge-error {
    background: #FFEBEE;
    color: #C62828;
  }
  
  .status-info {
    display: flex;
    align-items: center;
    gap: 4px;
    font-size: 11px;
    color: #6E6B7B;
    text-transform: uppercase;
  }
  
  .pace-indicator {
    display: flex;
    align-items: center;
    gap: 4px;
    font-weight: 700;
    font-size: 12px;
    color: #5D596C;
  }
</style>
`,e={render:()=>`
    ${s}
    <div class="status-cell" style="background: white; border: 1px solid #DBDADE; border-radius: 8px;">
      <div class="cell-status-overlay">
        <div class="status-badge badge-editing">
          <i class="bi bi-pencil"></i>
          Editando
        </div>
      </div>
    </div>
  `},a={render:()=>`
    ${s}
    <div class="status-cell" style="background: white; border: 1px solid #DBDADE; border-radius: 8px;">
      <div class="cell-status-overlay">
        <div class="status-badge badge-reviewing">
          <i class="bi bi-eye"></i>
          Revisando
        </div>
        <div class="status-info">
          <i class="bi bi-clock"></i>
          <small>2h restantes</small>
        </div>
      </div>
    </div>
  `},i={render:()=>`
    ${s}
    <div class="status-cell" style="background: white; border: 1px solid #DBDADE; border-radius: 8px;">
      <div class="cell-status-overlay">
        <div class="status-badge badge-completed">
          <i class="bi bi-check-circle-fill"></i>
          Concluído
        </div>
        <div class="status-info">
          <i class="bi bi-calendar-check"></i>
          <small>12/01/2026</small>
        </div>
      </div>
    </div>
  `},t={render:()=>`
    ${s}
    <div class="status-cell" style="background: white; border: 1px solid #DBDADE; border-radius: 8px;">
      <div class="cell-status-overlay">
        <div class="status-badge badge-pending">
          <i class="bi bi-clock-history"></i>
          Pendente
        </div>
        <div class="status-info">
          <i class="bi bi-hourglass-split"></i>
          <small>Aguardando</small>
        </div>
      </div>
    </div>
  `},d={render:()=>`
    ${s}
    <div class="status-cell" style="background: white; border: 1px solid #DBDADE; border-radius: 8px;">
      <div class="cell-status-overlay">
        <div class="status-badge badge-error">
          <i class="bi bi-exclamation-triangle-fill"></i>
          Erro
        </div>
        <div class="status-info">
          <i class="bi bi-arrow-repeat"></i>
          <small>Tentar novamente</small>
        </div>
      </div>
    </div>
  `},l={render:()=>`
    ${s}
    <div class="status-cell" style="background: white; border: 1px solid #DBDADE; border-radius: 8px;">
      <div class="cell-status-overlay">
        <div class="status-badge badge-editing">
          <i class="bi bi-pencil"></i>
          Em edição
        </div>
        <div class="status-info">
          <i class="bi bi-person"></i>
          <small>Ana Silva</small>
        </div>
        <div class="pace-indicator">
          <i class="bi bi-speedometer2"></i>
          <span>85%</span>
        </div>
      </div>
    </div>
  `},r={render:()=>`
    ${s}
    <table class="demo-table">
      <thead>
        <tr>
          <th>Aluno</th>
          <th>Disciplina</th>
          <th>Status</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Ana Clara</td>
          <td>Matemática</td>
          <td class="status-cell">
            <div class="cell-status-overlay">
              <div class="status-badge badge-completed">
                <i class="bi bi-check-lg"></i>
                OK
              </div>
            </div>
          </td>
          <td>
            <button style="padding: 4px 8px; font-size: 12px; border: 1px solid #DBDADE; border-radius: 4px; cursor: pointer;">
              Ver
            </button>
          </td>
        </tr>
        <tr>
          <td>Bruno Oliveira</td>
          <td>Português</td>
          <td class="status-cell">
            <div class="cell-status-overlay">
              <div class="status-badge badge-editing">
                <i class="bi bi-pencil"></i>
                Edit
              </div>
            </div>
          </td>
          <td>
            <button style="padding: 4px 8px; font-size: 12px; border: 1px solid #DBDADE; border-radius: 4px; cursor: pointer;">
              Ver
            </button>
          </td>
        </tr>
        <tr>
          <td>Carlos Lima</td>
          <td>Geografia</td>
          <td class="status-cell">
            <div class="cell-status-overlay">
              <div class="status-badge badge-pending">
                <i class="bi bi-clock"></i>
                Pend
              </div>
            </div>
          </td>
          <td>
            <button style="padding: 4px 8px; font-size: 12px; border: 1px solid #DBDADE; border-radius: 4px; cursor: pointer;">
              Ver
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  `},n={render:()=>`
    ${s}
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); gap: 16px;">
      <div class="status-cell" style="background: white; border: 1px solid #DBDADE; border-radius: 8px;">
        <div class="cell-status-overlay">
          <div class="status-badge badge-editing">
            <i class="bi bi-pencil"></i>
            Edit
          </div>
          <div class="pace-indicator">
            <i class="bi bi-speedometer2"></i>
            <span>75%</span>
          </div>
        </div>
      </div>
      
      <div class="status-cell" style="background: white; border: 1px solid #DBDADE; border-radius: 8px;">
        <div class="cell-status-overlay">
          <div class="status-badge badge-reviewing">
            <i class="bi bi-eye"></i>
            Rev
          </div>
          <div class="pace-indicator">
            <i class="bi bi-speedometer2"></i>
            <span>50%</span>
          </div>
        </div>
      </div>
      
      <div class="status-cell" style="background: white; border: 1px solid #DBDADE; border-radius: 8px;">
        <div class="cell-status-overlay">
          <div class="status-badge badge-completed">
            <i class="bi bi-check-lg"></i>
            Done
          </div>
          <div class="pace-indicator">
            <i class="bi bi-speedometer2"></i>
            <span>100%</span>
          </div>
        </div>
      </div>
    </div>
  `};var o,c,b;e.parameters={...e.parameters,docs:{...(o=e.parameters)==null?void 0:o.docs,source:{originalSource:`{
  render: () => \`
    \${cellStatusStyles}
    <div class="status-cell" style="background: white; border: 1px solid #DBDADE; border-radius: 8px;">
      <div class="cell-status-overlay">
        <div class="status-badge badge-editing">
          <i class="bi bi-pencil"></i>
          Editando
        </div>
      </div>
    </div>
  \`
}`,...(b=(c=e.parameters)==null?void 0:c.docs)==null?void 0:b.source}}};var p,u,v;a.parameters={...a.parameters,docs:{...(p=a.parameters)==null?void 0:p.docs,source:{originalSource:`{
  render: () => \`
    \${cellStatusStyles}
    <div class="status-cell" style="background: white; border: 1px solid #DBDADE; border-radius: 8px;">
      <div class="cell-status-overlay">
        <div class="status-badge badge-reviewing">
          <i class="bi bi-eye"></i>
          Revisando
        </div>
        <div class="status-info">
          <i class="bi bi-clock"></i>
          <small>2h restantes</small>
        </div>
      </div>
    </div>
  \`
}`,...(v=(u=a.parameters)==null?void 0:u.docs)==null?void 0:v.source}}};var g,m,x;i.parameters={...i.parameters,docs:{...(g=i.parameters)==null?void 0:g.docs,source:{originalSource:`{
  render: () => \`
    \${cellStatusStyles}
    <div class="status-cell" style="background: white; border: 1px solid #DBDADE; border-radius: 8px;">
      <div class="cell-status-overlay">
        <div class="status-badge badge-completed">
          <i class="bi bi-check-circle-fill"></i>
          Concluído
        </div>
        <div class="status-info">
          <i class="bi bi-calendar-check"></i>
          <small>12/01/2026</small>
        </div>
      </div>
    </div>
  \`
}`,...(x=(m=i.parameters)==null?void 0:m.docs)==null?void 0:x.source}}};var D,y,h;t.parameters={...t.parameters,docs:{...(D=t.parameters)==null?void 0:D.docs,source:{originalSource:`{
  render: () => \`
    \${cellStatusStyles}
    <div class="status-cell" style="background: white; border: 1px solid #DBDADE; border-radius: 8px;">
      <div class="cell-status-overlay">
        <div class="status-badge badge-pending">
          <i class="bi bi-clock-history"></i>
          Pendente
        </div>
        <div class="status-info">
          <i class="bi bi-hourglass-split"></i>
          <small>Aguardando</small>
        </div>
      </div>
    </div>
  \`
}`,...(h=(y=t.parameters)==null?void 0:y.docs)==null?void 0:h.source}}};var E,f,k;d.parameters={...d.parameters,docs:{...(E=d.parameters)==null?void 0:E.docs,source:{originalSource:`{
  render: () => \`
    \${cellStatusStyles}
    <div class="status-cell" style="background: white; border: 1px solid #DBDADE; border-radius: 8px;">
      <div class="cell-status-overlay">
        <div class="status-badge badge-error">
          <i class="bi bi-exclamation-triangle-fill"></i>
          Erro
        </div>
        <div class="status-info">
          <i class="bi bi-arrow-repeat"></i>
          <small>Tentar novamente</small>
        </div>
      </div>
    </div>
  \`
}`,...(k=(f=d.parameters)==null?void 0:f.docs)==null?void 0:k.source}}};var A,B,S;l.parameters={...l.parameters,docs:{...(A=l.parameters)==null?void 0:A.docs,source:{originalSource:`{
  render: () => \`
    \${cellStatusStyles}
    <div class="status-cell" style="background: white; border: 1px solid #DBDADE; border-radius: 8px;">
      <div class="cell-status-overlay">
        <div class="status-badge badge-editing">
          <i class="bi bi-pencil"></i>
          Em edição
        </div>
        <div class="status-info">
          <i class="bi bi-person"></i>
          <small>Ana Silva</small>
        </div>
        <div class="pace-indicator">
          <i class="bi bi-speedometer2"></i>
          <span>85%</span>
        </div>
      </div>
    </div>
  \`
}`,...(S=(B=l.parameters)==null?void 0:B.docs)==null?void 0:S.source}}};var w,C,F;r.parameters={...r.parameters,docs:{...(w=r.parameters)==null?void 0:w.docs,source:{originalSource:`{
  render: () => \`
    \${cellStatusStyles}
    <table class="demo-table">
      <thead>
        <tr>
          <th>Aluno</th>
          <th>Disciplina</th>
          <th>Status</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Ana Clara</td>
          <td>Matemática</td>
          <td class="status-cell">
            <div class="cell-status-overlay">
              <div class="status-badge badge-completed">
                <i class="bi bi-check-lg"></i>
                OK
              </div>
            </div>
          </td>
          <td>
            <button style="padding: 4px 8px; font-size: 12px; border: 1px solid #DBDADE; border-radius: 4px; cursor: pointer;">
              Ver
            </button>
          </td>
        </tr>
        <tr>
          <td>Bruno Oliveira</td>
          <td>Português</td>
          <td class="status-cell">
            <div class="cell-status-overlay">
              <div class="status-badge badge-editing">
                <i class="bi bi-pencil"></i>
                Edit
              </div>
            </div>
          </td>
          <td>
            <button style="padding: 4px 8px; font-size: 12px; border: 1px solid #DBDADE; border-radius: 4px; cursor: pointer;">
              Ver
            </button>
          </td>
        </tr>
        <tr>
          <td>Carlos Lima</td>
          <td>Geografia</td>
          <td class="status-cell">
            <div class="cell-status-overlay">
              <div class="status-badge badge-pending">
                <i class="bi bi-clock"></i>
                Pend
              </div>
            </div>
          </td>
          <td>
            <button style="padding: 4px 8px; font-size: 12px; border: 1px solid #DBDADE; border-radius: 4px; cursor: pointer;">
              Ver
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  \`
}`,...(F=(C=r.parameters)==null?void 0:C.docs)==null?void 0:F.source}}};var $,P,z;n.parameters={...n.parameters,docs:{...($=n.parameters)==null?void 0:$.docs,source:{originalSource:`{
  render: () => \`
    \${cellStatusStyles}
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); gap: 16px;">
      <div class="status-cell" style="background: white; border: 1px solid #DBDADE; border-radius: 8px;">
        <div class="cell-status-overlay">
          <div class="status-badge badge-editing">
            <i class="bi bi-pencil"></i>
            Edit
          </div>
          <div class="pace-indicator">
            <i class="bi bi-speedometer2"></i>
            <span>75%</span>
          </div>
        </div>
      </div>
      
      <div class="status-cell" style="background: white; border: 1px solid #DBDADE; border-radius: 8px;">
        <div class="cell-status-overlay">
          <div class="status-badge badge-reviewing">
            <i class="bi bi-eye"></i>
            Rev
          </div>
          <div class="pace-indicator">
            <i class="bi bi-speedometer2"></i>
            <span>50%</span>
          </div>
        </div>
      </div>
      
      <div class="status-cell" style="background: white; border: 1px solid #DBDADE; border-radius: 8px;">
        <div class="cell-status-overlay">
          <div class="status-badge badge-completed">
            <i class="bi bi-check-lg"></i>
            Done
          </div>
          <div class="pace-indicator">
            <i class="bi bi-speedometer2"></i>
            <span>100%</span>
          </div>
        </div>
      </div>
    </div>
  \`
}`,...(z=(P=n.parameters)==null?void 0:P.docs)==null?void 0:z.source}}};const T=["Default","Reviewing","Completed","Pending","Error","WithPace","InTable","Responsive"];export{i as Completed,e as Default,d as Error,r as InTable,t as Pending,n as Responsive,a as Reviewing,l as WithPace,T as __namedExportsOrder,R as default};
