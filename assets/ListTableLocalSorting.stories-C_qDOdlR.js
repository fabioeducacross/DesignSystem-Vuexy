const W={title:"Educacross Components V2/Tables/ListTableLocalSorting",tags:["autodocs"],parameters:{docs:{description:{component:`
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
        `}}}},n=`<style>
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
</style>`,p=[{n:"Ana Silva",t:"8ºA",m:9.8,f:95,c:"#6E63E8"},{n:"Bruno Costa",t:"8ºB",m:8.5,f:82,c:"#00CFE8"},{n:"Diana Santos",t:"8ºA",m:9.2,f:88,c:"#28C76F"},{n:"Eduardo Lima",t:"9ºA",m:7.8,f:75,c:"#FF9F43"}],i={render:()=>`
    ${n}
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
      ${p.sort((s,a)=>s.n.localeCompare(a.n)).map(s=>`
        <div class="sort-row">
          <div class="student-info">
            <div class="student-avatar" style="background: ${s.c}">
              ${s.n.split(" ").map(a=>a[0]).join("")}
            </div>
            <div class="student-name">${s.n}</div>
          </div>
          <div style="font-size: 13px; color: #6E6B7B">${s.t}</div>
          <div style="font-weight: 700; color: #28C76F">${s.m}</div>
          <div style="font-size: 13px; color: #6E6B7B">${s.f}%</div>
        </div>
      `).join("")}
    </div>
  `},e={render:()=>`
    ${n}
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
      ${p.sort((s,a)=>a.m-s.m).map(s=>`
        <div class="sort-row">
          <div class="student-info">
            <div class="student-avatar" style="background: ${s.c}">
              ${s.n.split(" ").map(a=>a[0]).join("")}
            </div>
            <div class="student-name">${s.n}</div>
          </div>
          <div style="font-size: 13px; color: #6E6B7B">${s.t}</div>
          <div style="font-weight: 700; color: #28C76F">${s.m}</div>
          <div style="font-size: 13px; color: #6E6B7B">${s.f}%</div>
        </div>
      `).join("")}
    </div>
  `},o={render:()=>`
    ${n}
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
      ${p.sort((s,a)=>s.f-a.f).map(s=>`
        <div class="sort-row">
          <div class="student-info">
            <div class="student-avatar" style="background: ${s.c}">
              ${s.n.split(" ").map(a=>a[0]).join("")}
            </div>
            <div class="student-name">${s.n}</div>
          </div>
          <div style="font-size: 13px; color: #6E6B7B">${s.t}</div>
          <div style="font-weight: 700; color: #28C76F">${s.m}</div>
          <div style="font-size: 13px; color: #6E6B7B">${s.f}%</div>
        </div>
      `).join("")}
    </div>
  `},t={render:()=>`
    ${n}
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
      ${[{m:"Frações Básicas",d:"10/02/2026",a:28,s:"Aberta",c:"#28C76F"},{m:"Geometria Plana",d:"12/02/2026",a:32,s:"Aberta",c:"#28C76F"},{m:"Sistema Solar",d:"08/02/2026",a:25,s:"Encerrada",c:"#6E6B7B"},{m:"Verbos e Conjugações",d:"15/02/2026",a:30,s:"Rascunho",c:"#FF9F43"}].sort((s,a)=>s.m.localeCompare(a.m)).map(s=>`
        <div class="sort-row" style="grid-template-columns: 1fr 150px 120px 120px">
          <div style="font-weight: 600; color: #5E5873">${s.m}</div>
          <div style="font-size: 13px; color: #6E6B7B">${s.d}</div>
          <div style="font-weight: 600; color: #6E63E8">${s.a}</div>
          <div>
            <span style="padding: 4px 10px; border-radius: 6px; font-size: 12px; font-weight: 600; background: ${s.c}20; color: ${s.c}">
              ${s.s}
            </span>
          </div>
        </div>
      `).join("")}
    </div>
  `},r={render:()=>`
    ${n}
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
      ${[{d:"Matemática",m:12,me:9.5,icon:"📐",c:"#6E63E8"},{d:"Português",m:8,me:8.8,icon:"📖",c:"#00CFE8"},{d:"Ciências",m:10,me:9.2,icon:"🔬",c:"#28C76F"},{d:"História",m:6,me:8.5,icon:"📜",c:"#FF9F43"}].sort((s,a)=>s.d.localeCompare(a.d)).map(s=>`
        <div class="sort-row" style="grid-template-columns: 60px 1fr 120px 120px">
          <div>
            <div class="icon-col" style="background: ${s.c}20">${s.icon}</div>
          </div>
          <div style="font-weight: 600; color: #5E5873; font-size: 15px">${s.d}</div>
          <div style="font-weight: 600; color: #6E63E8">${s.m} missões</div>
          <div style="font-weight: 700; color: #28C76F">${s.me}</div>
        </div>
      `).join("")}
    </div>
  `},l={render:()=>`
    ${n}
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
      ${[{n:"João Silva",co:8,xp:3200,nv:12,c:"#6E63E8"},{n:"Maria Costa",co:6,xp:2850,nv:10,c:"#00CFE8"},{n:"Pedro Santos",co:5,xp:2500,nv:9,c:"#28C76F"},{n:"Ana Oliveira",co:7,xp:2950,nv:11,c:"#FF9F43"}].sort((s,a)=>a.n.localeCompare(s.n)).map(s=>`
        <div class="sort-row">
          <div class="student-info">
            <div class="student-avatar" style="background: ${s.c}">
              ${s.n.split(" ").map(a=>a[0]).join("")}
            </div>
            <div class="student-name">${s.n}</div>
          </div>
          <div style="display: flex; gap: 4px">
            ${"🏆".repeat(Math.min(3,s.co))}
          </div>
          <div style="font-weight: 700; color: #6E63E8">${s.xp} XP</div>
          <div>
            <span style="padding: 4px 10px; border-radius: 6px; font-size: 12px; font-weight: 600; background: ${s.c}20; color: ${s.c}">
              Nv ${s.nv}
            </span>
          </div>
        </div>
      `).join("")}
    </div>
  `},c={render:()=>`
    ${n}
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
      ${[{n:"Ana",ma:10,po:9.5,ci:9.8,hi:9.2,c:"#6E63E8"},{n:"Bruno",ma:9.5,po:8.8,ci:9,hi:8.5,c:"#00CFE8"},{n:"Diana",ma:9.2,po:9.8,ci:9.5,hi:9,c:"#28C76F"}].sort((s,a)=>a.ma-s.ma).map(s=>`
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
      `).join("")}
    </div>
  `},d={render:()=>`
    ${n}
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
        ${p.sort((s,a)=>s.n.localeCompare(a.n)).map(s=>`
          <div class="sort-row">
            <div class="student-info">
              <div class="student-avatar" style="background: ${s.c}">
                ${s.n.split(" ").map(a=>a[0]).join("")}
              </div>
              <div class="student-name">${s.n}</div>
            </div>
            <div style="font-size: 13px; color: #6E6B7B">${s.t}</div>
            <div style="font-weight: 700; color: #28C76F">${s.m}</div>
            <div style="font-size: 13px; color: ${s.f>=90?"#28C76F":s.f>=75?"#FF9F43":"#EA5455"}; font-weight: 600">
              ${s.f}%
            </div>
          </div>
        `).join("")}
      </div>
      
      <p style="margin-top: 12px; font-size: 13px; color: #6E6B7B">
        <strong>Contexto:</strong> Tabela com ordenação local (professor ordenando lista por diferentes critérios).
      </p>
    </div>
  `};var v,u,m,b,f;i.parameters={...i.parameters,docs:{...(v=i.parameters)==null?void 0:v.docs,source:{originalSource:`{
  render: () => \`
    \${styles}
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
      \${students.sort((a, b) => a.n.localeCompare(b.n)).map(s => \`
        <div class="sort-row">
          <div class="student-info">
            <div class="student-avatar" style="background: \${s.c}">
              \${s.n.split(' ').map(n => n[0]).join('')}
            </div>
            <div class="student-name">\${s.n}</div>
          </div>
          <div style="font-size: 13px; color: #6E6B7B">\${s.t}</div>
          <div style="font-weight: 700; color: #28C76F">\${s.m}</div>
          <div style="font-size: 13px; color: #6E6B7B">\${s.f}%</div>
        </div>
      \`).join('')}
    </div>
  \`
}`,...(m=(u=i.parameters)==null?void 0:u.docs)==null?void 0:m.source},description:{story:`Story: Default

Ordenado por "Estudante" (ordem alfabética ascendente).
Seta para cima ativa na coluna "Estudante".

Educational context: Professor visualizando lista alfabética de alunos.`,...(f=(b=i.parameters)==null?void 0:b.docs)==null?void 0:f.description}}};var x,E,h,g,y;e.parameters={...e.parameters,docs:{...(x=e.parameters)==null?void 0:x.docs,source:{originalSource:`{
  render: () => \`
    \${styles}
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
      \${students.sort((a, b) => b.m - a.m).map(s => \`
        <div class="sort-row">
          <div class="student-info">
            <div class="student-avatar" style="background: \${s.c}">
              \${s.n.split(' ').map(n => n[0]).join('')}
            </div>
            <div class="student-name">\${s.n}</div>
          </div>
          <div style="font-size: 13px; color: #6E6B7B">\${s.t}</div>
          <div style="font-weight: 700; color: #28C76F">\${s.m}</div>
          <div style="font-size: 13px; color: #6E6B7B">\${s.f}%</div>
        </div>
      \`).join('')}
    </div>
  \`
}`,...(h=(E=e.parameters)==null?void 0:E.docs)==null?void 0:h.source},description:{story:`Story: OrdemDecrescente

Ordenado por "Média" (maior → menor, ordem descendente).
Seta para baixo ativa na coluna "Média".

Educational context: Professor visualizando melhores desempenhos primeiro.`,...(y=(g=e.parameters)==null?void 0:g.docs)==null?void 0:y.description}}};var $,F,C,w,B;o.parameters={...o.parameters,docs:{...($=o.parameters)==null?void 0:$.docs,source:{originalSource:`{
  render: () => \`
    \${styles}
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
      \${students.sort((a, b) => a.f - b.f).map(s => \`
        <div class="sort-row">
          <div class="student-info">
            <div class="student-avatar" style="background: \${s.c}">
              \${s.n.split(' ').map(n => n[0]).join('')}
            </div>
            <div class="student-name">\${s.n}</div>
          </div>
          <div style="font-size: 13px; color: #6E6B7B">\${s.t}</div>
          <div style="font-weight: 700; color: #28C76F">\${s.m}</div>
          <div style="font-size: 13px; color: #6E6B7B">\${s.f}%</div>
        </div>
      \`).join('')}
    </div>
  \`
}`,...(C=(F=o.parameters)==null?void 0:F.docs)==null?void 0:C.source},description:{story:`Story: OrdemCrescente

Ordenado por "Faltas" (menor → maior, ordem ascendente).
Seta para cima ativa na coluna "Faltas".

Educational context: Coordenador identificando alunos com menor frequência.`,...(B=(w=o.parameters)==null?void 0:w.docs)==null?void 0:B.description}}};var D,z,S,j,M;t.parameters={...t.parameters,docs:{...(D=t.parameters)==null?void 0:D.docs,source:{originalSource:`{
  render: () => \`
    \${styles}
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
      \${[{
    m: 'Frações Básicas',
    d: '10/02/2026',
    a: 28,
    s: 'Aberta',
    c: '#28C76F'
  }, {
    m: 'Geometria Plana',
    d: '12/02/2026',
    a: 32,
    s: 'Aberta',
    c: '#28C76F'
  }, {
    m: 'Sistema Solar',
    d: '08/02/2026',
    a: 25,
    s: 'Encerrada',
    c: '#6E6B7B'
  }, {
    m: 'Verbos e Conjugações',
    d: '15/02/2026',
    a: 30,
    s: 'Rascunho',
    c: '#FF9F43'
  }].sort((a, b) => a.m.localeCompare(b.m)).map(m => \`
        <div class="sort-row" style="grid-template-columns: 1fr 150px 120px 120px">
          <div style="font-weight: 600; color: #5E5873">\${m.m}</div>
          <div style="font-size: 13px; color: #6E6B7B">\${m.d}</div>
          <div style="font-weight: 600; color: #6E63E8">\${m.a}</div>
          <div>
            <span style="padding: 4px 10px; border-radius: 6px; font-size: 12px; font-weight: 600; background: \${m.c}20; color: \${m.c}">
              \${m.s}
            </span>
          </div>
        </div>
      \`).join('')}
    </div>
  \`
}`,...(S=(z=t.parameters)==null?void 0:z.docs)==null?void 0:S.source},description:{story:`Story: Missoes

Tabela de missões ordenada por nome (alfabética ascendente).
Colunas: Missão, Data Limite, Alunos, Status.
Badge colorido por status (Aberta, Encerrada, Rascunho).

Educational context: Professor organizando biblioteca de missões por ordem alfabética.`,...(M=(j=t.parameters)==null?void 0:j.docs)==null?void 0:M.description}}};var A,k,T,P,L;r.parameters={...r.parameters,docs:{...(A=r.parameters)==null?void 0:A.docs,source:{originalSource:`{
  render: () => \`
    \${styles}
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
      \${[{
    d: 'Matemática',
    m: 12,
    me: 9.5,
    icon: '📐',
    c: '#6E63E8'
  }, {
    d: 'Português',
    m: 8,
    me: 8.8,
    icon: '📖',
    c: '#00CFE8'
  }, {
    d: 'Ciências',
    m: 10,
    me: 9.2,
    icon: '🔬',
    c: '#28C76F'
  }, {
    d: 'História',
    m: 6,
    me: 8.5,
    icon: '📜',
    c: '#FF9F43'
  }].sort((a, b) => a.d.localeCompare(b.d)).map(d => \`
        <div class="sort-row" style="grid-template-columns: 60px 1fr 120px 120px">
          <div>
            <div class="icon-col" style="background: \${d.c}20">\${d.icon}</div>
          </div>
          <div style="font-weight: 600; color: #5E5873; font-size: 15px">\${d.d}</div>
          <div style="font-weight: 600; color: #6E63E8">\${d.m} missões</div>
          <div style="font-weight: 700; color: #28C76F">\${d.me}</div>
        </div>
      \`).join('')}
    </div>
  \`
}`,...(T=(k=r.parameters)==null?void 0:k.docs)==null?void 0:T.source},description:{story:`Story: ComIcones

Tabela de disciplinas com ícones grandes (48×48px).
Ordenada por nome de disciplina (alfabética).

Educational context: Coordenador visualizando overview de disciplinas ordenadas por nome.`,...(L=(P=r.parameters)==null?void 0:P.docs)==null?void 0:L.description}}};var O,q,I,H,N;l.parameters={...l.parameters,docs:{...(O=l.parameters)==null?void 0:O.docs,source:{originalSource:`{
  render: () => \`
    \${styles}
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
      \${[{
    n: 'João Silva',
    co: 8,
    xp: 3200,
    nv: 12,
    c: '#6E63E8'
  }, {
    n: 'Maria Costa',
    co: 6,
    xp: 2850,
    nv: 10,
    c: '#00CFE8'
  }, {
    n: 'Pedro Santos',
    co: 5,
    xp: 2500,
    nv: 9,
    c: '#28C76F'
  }, {
    n: 'Ana Oliveira',
    co: 7,
    xp: 2950,
    nv: 11,
    c: '#FF9F43'
  }].sort((a, b) => b.n.localeCompare(a.n)).map(s => \`
        <div class="sort-row">
          <div class="student-info">
            <div class="student-avatar" style="background: \${s.c}">
              \${s.n.split(' ').map(n => n[0]).join('')}
            </div>
            <div class="student-name">\${s.n}</div>
          </div>
          <div style="display: flex; gap: 4px">
            \${'🏆'.repeat(Math.min(3, s.co))}
          </div>
          <div style="font-weight: 700; color: #6E63E8">\${s.xp} XP</div>
          <div>
            <span style="padding: 4px 10px; border-radius: 6px; font-size: 12px; font-weight: 600; background: \${s.c}20; color: \${s.c}">
              Nv \${s.nv}
            </span>
          </div>
        </div>
      \`).join('')}
    </div>
  \`
}`,...(I=(q=l.parameters)==null?void 0:q.docs)==null?void 0:I.source},description:{story:`Story: ComBadges

Tabela de ranking/gamificação ordenada por nome (descendente Z→A).
Colunas: Estudante, Conquistas (emojis 🏆), XP Total, Nível.
Badge colorido por nível.

Educational context: Sistema de gamificação - ordenação invertida para visualizar últimos da lista.`,...(N=(H=l.parameters)==null?void 0:H.docs)==null?void 0:N.description}}};var X,G,R,V,_;c.parameters={...c.parameters,docs:{...(X=c.parameters)==null?void 0:X.docs,source:{originalSource:`{
  render: () => \`
    \${styles}
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
      \${[{
    n: 'Ana',
    ma: 10.0,
    po: 9.5,
    ci: 9.8,
    hi: 9.2,
    c: '#6E63E8'
  }, {
    n: 'Bruno',
    ma: 9.5,
    po: 8.8,
    ci: 9.0,
    hi: 8.5,
    c: '#00CFE8'
  }, {
    n: 'Diana',
    ma: 9.2,
    po: 9.8,
    ci: 9.5,
    hi: 9.0,
    c: '#28C76F'
  }].sort((a, b) => b.ma - a.ma).map(s => \`
        <div class="sort-row" style="grid-template-columns: 1fr 100px 100px 100px 100px">
          <div class="student-info">
            <div class="student-avatar" style="background: \${s.c}">\${s.n[0]}</div>
            <div class="student-name">\${s.n}</div>
          </div>
          <div style="font-weight: 700; color: #6E63E8">\${s.ma}</div>
          <div style="font-weight: 700; color: #00CFE8">\${s.po}</div>
          <div style="font-weight: 700; color: #28C76F">\${s.ci}</div>
          <div style="font-weight: 700; color: #FF9F43">\${s.hi}</div>
        </div>
      \`).join('')}
    </div>
  \`
}`,...(R=(G=c.parameters)==null?void 0:G.docs)==null?void 0:R.source},description:{story:`Story: MultiColunas

Boletim multi-disciplinas ordenado por Matemática (descendente).
Grid com 5 colunas: Estudante + 4 disciplinas.

Educational context: Coordenador analisando desempenho por disciplina, ordenando por Matemática.`,...(_=(V=c.parameters)==null?void 0:V.docs)==null?void 0:_.description}}};var J,Q,Z,K,U;d.parameters={...d.parameters,docs:{...(J=d.parameters)==null?void 0:J.docs,source:{originalSource:`{
  render: () => \`
    \${styles}
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
        \${students.sort((a, b) => a.n.localeCompare(b.n)).map(s => \`
          <div class="sort-row">
            <div class="student-info">
              <div class="student-avatar" style="background: \${s.c}">
                \${s.n.split(' ').map(n => n[0]).join('')}
              </div>
              <div class="student-name">\${s.n}</div>
            </div>
            <div style="font-size: 13px; color: #6E6B7B">\${s.t}</div>
            <div style="font-weight: 700; color: #28C76F">\${s.m}</div>
            <div style="font-size: 13px; color: \${s.f >= 90 ? '#28C76F' : s.f >= 75 ? '#FF9F43' : '#EA5455'}; font-weight: 600">
              \${s.f}%
            </div>
          </div>
        \`).join('')}
      </div>
      
      <p style="margin-top: 12px; font-size: 13px; color: #6E6B7B">
        <strong>Contexto:</strong> Tabela com ordenação local (professor ordenando lista por diferentes critérios).
      </p>
    </div>
  \`
}`,...(Z=(Q=d.parameters)==null?void 0:Q.docs)==null?void 0:Z.source},description:{story:`Story: Completa

Interface completa com:
- Header "Lista de Estudantes" + instrução "Clique nos cabeçalhos para ordenar"
- Botão "Exportar" com ícone download
- Tabela ordenada por nome (alfabética)
- Frequência colorida por nível (verde ≥90%, laranja ≥75%, vermelho <75%)
- Contexto educacional no rodapé

Educational context: Professor gerenciando lista de alunos com ordenação flexível.`,...(U=(K=d.parameters)==null?void 0:K.docs)==null?void 0:U.description}}};const Y=["Default","OrdemDecrescente","OrdemCrescente","Missoes","ComIcones","ComBadges","MultiColunas","Completa"];export{l as ComBadges,r as ComIcones,d as Completa,i as Default,t as Missoes,c as MultiColunas,o as OrdemCrescente,e as OrdemDecrescente,Y as __namedExportsOrder,W as default};
