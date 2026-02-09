import{c as Y,b,d as Z}from"./docTemplate-RKjNfURf.js";const ae={title:"Educacross Components V2/Forms/FilterChip",tags:["autodocs"],argTypes:{label:{control:"text",description:"Texto do chip/badge"},variant:{control:"select",options:["primary","secondary","success","danger","warning","info","light-primary","light-secondary","light-success","light-danger"],description:"Variante de cor do badge"},size:{control:"select",options:["sm","md","lg"],description:"Tamanho do badge"},removable:{control:"boolean",description:"Se o chip pode ser removido (mostra X)"},icon:{control:"text",description:"Ícone Material Symbols (opcional)"}},parameters:{layout:"padded",docs:{description:{component:`
# FilterChip - Badge de Filtro

Chip visual removível usado para exibir filtros ativos em dashboards, relatórios e listagens da plataforma Educacross.

---

## 📋 Contexto de Uso

### Personas

**Professor** (Usuário Principal)
- Aplica filtros em dashboards de alunos (turma, disciplina, período)
- Remove filtros clicando no X
- Visualiza filtros ativos no cabeçalho de relatórios

**Coordenador Pedagógico**
- Filtra múltiplas turmas em relatórios consolidados
- Aplica filtros de ano letivo e período
- Compara dados com diferentes combinações de filtros

### Casos de Uso

1. **Dashboard de Alunos**: Filtrar por turma (5º A) + disciplina (Matemática)
2. **Relatórios**: Aplicar período (Novembro 2024) + status (Ativa)
3. **Listagens**: Filtrar missões por ano escolar (5º Ano)

---

## 🎨 Props API

| Prop | Type | Default | Descrição |
|------|------|---------|-----------|
| label | String | Required | Texto exibido no chip |
| variant | String | 'light-primary' | Cor: primary, success, danger, info, warning, secondary |
| size | String | 'md' | Tamanho: sm, md, lg |
| removable | Boolean | false | Mostra botão X para remover |
| icon | String | - | Ícone Material Symbols (opcional) |

---

## 🎨 Design Specs

### Dimensões

| Tamanho | Height | Padding H | Font Size |
|---------|--------|-----------|-----------|
| Small | 24px | 8px | 11px |
| Medium | 28px | 12px | 13px |
| Large | 32px | 16px | 14px |

### Cores

| Variant | Background | Text | Border |
|---------|-----------|------|--------|
| primary | #7367f0 | white | - |
| light-primary | rgba(115,103,240,0.12) | #7367f0 | - |
| success | #28c76f | white | - |
| light-success | rgba(40,199,111,0.12) | #28c76f | - |
| danger | #ea5455 | white | - |
| light-danger | rgba(234,84,85,0.12) | #ea5455 | - |

### Comportamento

- **Border Radius**: 20px (pill completo)
- **Gap Interno**: 4px (ícone + texto + botão)
- **Transition**: 0.2s ease em hover/focus
- **Remove Button**: Opacity 0.7 → 1.0 em hover
        `}}}},a=`
.filter-chip {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 13px;
  font-weight: 500;
  white-space: nowrap;
  line-height: 1.5;
  transition: all 0.2s ease;
}

.filter-chip.size-sm {
  padding: 2px 8px;
  font-size: 11px;
}

.filter-chip.size-lg {
  padding: 6px 16px;
  font-size: 14px;
}

/* Primary variants */
.filter-chip.badge-primary {
  background-color: #7367f0;
  color: white;
}

.filter-chip.badge-light-primary {
  background-color: rgba(115, 103, 240, 0.12);
  color: #7367f0;
}

/* Secondary variants */
.filter-chip.badge-secondary {
  background-color: #82868b;
  color: white;
}

.filter-chip.badge-light-secondary {
  background-color: rgba(130, 134, 139, 0.12);
  color: #82868b;
}

/* Success variants */
.filter-chip.badge-success {
  background-color: #28c76f;
  color: white;
}

.filter-chip.badge-light-success {
  background-color: rgba(40, 199, 111, 0.12);
  color: #28c76f;
}

/* Danger variants */
.filter-chip.badge-danger {
  background-color: #ea5455;
  color: white;
}

.filter-chip.badge-light-danger {
  background-color: rgba(234, 84, 85, 0.12);
  color: #ea5455;
}

/* Warning variants */
.filter-chip.badge-warning {
  background-color: #ff9f43;
  color: white;
}

.filter-chip.badge-light-warning {
  background-color: rgba(255, 159, 67, 0.12);
  color: #ff9f43;
}

/* Info variants */
.filter-chip.badge-info {
  background-color: #00cfe8;
  color: white;
}

.filter-chip.badge-light-info {
  background-color: rgba(0, 207, 232, 0.12);
  color: #00cfe8;
}

.filter-chip .material-symbols-outlined {
  font-size: 16px;
}

.filter-chip .remove-btn {
  margin-left: 4px;
  cursor: pointer;
  background: none;
  border: none;
  padding: 0;
  color: inherit;
  opacity: 0.7;
  transition: opacity 0.2s;
  display: flex;
  align-items: center;
}

.filter-chip .remove-btn:hover {
  opacity: 1;
}

.filter-chip .remove-btn .material-symbols-outlined {
  font-size: 16px;
}

.filter-chip-group {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  align-items: center;
}
`,e=i=>`
<span class="filter-chip badge-${i.variant} size-${i.size||"md"}">
  ${i.icon?`<span class="material-symbols-outlined">${i.icon}</span>`:""}
  <span>${i.label}</span>
  ${i.removable?`
    <button class="remove-btn" aria-label="Remover">
      <span class="material-symbols-outlined">close</span>
    </button>
  `:""}
</span>
`,n={args:{label:"5º Ano A",variant:"light-primary",size:"md",removable:!1},render:i=>`
    <style>${a}</style>
    ${e(i)}
  `},r={render:()=>`
    <style>${a}</style>
    <div class="filter-chip-group">
      ${e({label:"5º Ano A",variant:"light-primary",size:"md"})}
      ${e({label:"5º Ano B",variant:"light-primary",size:"md"})}
      ${e({label:"6º Ano A",variant:"light-primary",size:"md"})}
      ${e({label:"6º Ano B",variant:"light-primary",size:"md"})}
    </div>
  `},s={render:()=>`
    <style>${a}</style>
    <div class="filter-chip-group">
      ${e({label:"Matemática",variant:"primary",size:"md"})}
      ${e({label:"Português",variant:"info",size:"md"})}
      ${e({label:"Ciências",variant:"success",size:"md"})}
      ${e({label:"História",variant:"warning",size:"md"})}
    </div>
  `},t={render:()=>`
    <style>${a}</style>
    <div class="filter-chip-group">
      ${e({label:"1º Ano",variant:"light-primary",size:"md"})}
      ${e({label:"2º Ano",variant:"light-primary",size:"md"})}
      ${e({label:"3º Ano",variant:"light-primary",size:"md"})}
      ${e({label:"4º Ano",variant:"light-primary",size:"md"})}
      ${e({label:"5º Ano",variant:"light-primary",size:"md"})}
    </div>
  `},l={render:()=>`
    <style>${a}</style>
    <div class="filter-chip-group">
      ${e({label:"Ativa",variant:"light-success",size:"md"})}
      ${e({label:"Pendente",variant:"light-warning",size:"md"})}
      ${e({label:"Concluída",variant:"light-secondary",size:"md"})}
      ${e({label:"Expirada",variant:"light-danger",size:"md"})}
    </div>
  `},o={render:()=>`
    <style>${a}</style>
    <div class="filter-chip-group">
      ${e({label:"Turmas",variant:"light-primary",size:"md",icon:"groups"})}
      ${e({label:"Matemática",variant:"primary",size:"md",icon:"calculate"})}
      ${e({label:"Período",variant:"light-secondary",size:"md",icon:"calendar_month"})}
      ${e({label:"Filtros",variant:"light-info",size:"md",icon:"filter_alt"})}
    </div>
  `},d={render:()=>`
    <style>${a}</style>
    <div class="filter-chip-group">
      ${e({label:"5º Ano A",variant:"light-primary",size:"md",removable:!0})}
      ${e({label:"Matemática",variant:"primary",size:"md",removable:!0})}
      ${e({label:"Novembro 2024",variant:"light-secondary",size:"md",removable:!0})}
    </div>
  `},p={render:()=>`
    <style>${a}</style>
    <div style="display: flex; flex-direction: column; gap: 16px; align-items: flex-start;">
      <div>
        <p class="mb-2"><strong>Small</strong></p>
        <div class="filter-chip-group">
          ${e({label:"5º Ano A",variant:"light-primary",size:"sm"})}
          ${e({label:"Matemática",variant:"primary",size:"sm"})}
          ${e({label:"Novembro",variant:"light-secondary",size:"sm"})}
        </div>
      </div>
      <div>
        <p class="mb-2"><strong>Medium (Default)</strong></p>
        <div class="filter-chip-group">
          ${e({label:"5º Ano A",variant:"light-primary",size:"md"})}
          ${e({label:"Matemática",variant:"primary",size:"md"})}
          ${e({label:"Novembro",variant:"light-secondary",size:"md"})}
        </div>
      </div>
      <div>
        <p class="mb-2"><strong>Large</strong></p>
        <div class="filter-chip-group">
          ${e({label:"5º Ano A",variant:"light-primary",size:"lg"})}
          ${e({label:"Matemática",variant:"primary",size:"lg"})}
          ${e({label:"Novembro",variant:"light-secondary",size:"lg"})}
        </div>
      </div>
    </div>
  `},c={render:()=>`
    <style>${a}</style>
    <div style="max-width: 800px;">
      <div class="card">
        <div class="card-header">
          <h5 class="mb-0">Filtros Aplicados</h5>
        </div>
        <div class="card-body">
          <div class="mb-3">
            <p class="text-muted mb-2" style="font-size: 12px;">TURMA</p>
            <div class="filter-chip-group">
              ${e({label:"5º Ano A",variant:"light-primary",size:"md",removable:!0})}
            </div>
          </div>
          <div class="mb-3">
            <p class="text-muted mb-2" style="font-size: 12px;">DISCIPLINA</p>
            <div class="filter-chip-group">
              ${e({label:"Matemática",variant:"primary",size:"md",removable:!0})}
            </div>
          </div>
          <div>
            <p class="text-muted mb-2" style="font-size: 12px;">PERÍODO</p>
            <div class="filter-chip-group">
              ${e({label:"Novembro 2024",variant:"light-secondary",size:"md",removable:!0})}
            </div>
          </div>
        </div>
      </div>
    </div>
  `},m={render:()=>`
    <style>${a}</style>
    <div style="max-width: 900px;">
      <div class="card">
        <div class="card-header d-flex justify-content-between align-items-center">
          <div>
            <h5 class="mb-1">Relatório de Desempenho</h5>
            <div class="filter-chip-group mt-2">
              ${e({label:"5º Ano A",variant:"light-primary",size:"md"})}
              ${e({label:"Matemática",variant:"primary",size:"md"})}
              ${e({label:"2º Bimestre",variant:"light-secondary",size:"md"})}
            </div>
          </div>
          <button class="btn btn-sm btn-outline-secondary">
            <span class="material-symbols-outlined" style="font-size: 16px;">filter_alt</span>
            Filtrar
          </button>
        </div>
        <div class="card-body">
          <p class="text-muted">Mostrando resultados para os filtros selecionados acima...</p>
        </div>
      </div>
    </div>
  `},g={render:()=>`
    <style>${a}</style>
    <div style="display: grid; gap: 16px;">
      <div>
        <p class="mb-2"><strong>Solid Variants</strong></p>
        <div class="filter-chip-group">
          ${e({label:"Primary",variant:"primary",size:"md"})}
          ${e({label:"Secondary",variant:"secondary",size:"md"})}
          ${e({label:"Success",variant:"success",size:"md"})}
          ${e({label:"Danger",variant:"danger",size:"md"})}
          ${e({label:"Warning",variant:"warning",size:"md"})}
          ${e({label:"Info",variant:"info",size:"md"})}
        </div>
      </div>
      <div>
        <p class="mb-2"><strong>Light Variants</strong></p>
        <div class="filter-chip-group">
          ${e({label:"Light Primary",variant:"light-primary",size:"md"})}
          ${e({label:"Light Secondary",variant:"light-secondary",size:"md"})}
          ${e({label:"Light Success",variant:"light-success",size:"md"})}
          ${e({label:"Light Danger",variant:"light-danger",size:"md"})}
        </div>
      </div>
    </div>
  `},v={render:()=>Y({title:"FilterChip",subtitle:"Badge pill para filtros em dashboards e relatórios",badge:"Forms / Filters",colors:{primary:"#6E63E8",secondary:"#00CFE8"},stats:[{label:"Variantes",value:"10",description:"primary, secondary, success, danger, warning, info + light"},{label:"Tamanhos",value:"3",description:"sm, md, lg"},{label:"Removível",value:"Sim",description:"Com ícone X para remoção"},{label:"Uso Principal",value:"Filtros",description:"Dashboards, relatórios, listagens"}],content:`
${b({title:"Chip Básico",description:"Badge pill simples com label",preview:'<div style="padding: 20px;"><span style="display: inline-flex; align-items: center; gap: 6px; padding: 6px 12px; background-color: #6E63E8; color: white; border-radius: 20px; font-size: 13px; font-weight: 500;">Matemática</span></div>',code:`<FilterChip
  label="Matemática"
  variant="primary"
  size="md"
/>`})}

${b({title:"Chip Removível",description:"Com ícone X para remover filtro",preview:'<div style="padding: 20px; display: flex; gap: 8px; flex-wrap: wrap;"><span style="display: inline-flex; align-items: center; gap: 6px; padding: 6px 12px; background-color: #6E63E8; color: white; border-radius: 20px; font-size: 13px; font-weight: 500; cursor: pointer;">Turma A <i class="bi bi-x" style="font-size: 16px; margin-left: 2px;"></i></span><span style="display: inline-flex; align-items: center; gap: 6px; padding: 6px 12px; background-color: #28C76F; color: white; border-radius: 20px; font-size: 13px; font-weight: 500; cursor: pointer;">2024 <i class="bi bi-x" style="font-size: 16px; margin-left: 2px;"></i></span><span style="display: inline-flex; align-items: center; gap: 6px; padding: 6px 12px; background-color: #00CFE8; color: white; border-radius: 20px; font-size: 13px; font-weight: 500; cursor: pointer;">1º Trimestre <i class="bi bi-x" style="font-size: 16px; margin-left: 2px;"></i></span></div>',code:`<FilterChip
  label="Turma A"
  variant="primary"
  :removable="true"
  @remove="handleRemove"
/>`})}

${b({title:"Variantes de Cor",description:"Diferentes cores para categorização visual",preview:'<div style="padding: 20px; display: flex; gap: 8px; flex-wrap: wrap;"><span style="padding: 6px 12px; background-color: #6E63E8; color: white; border-radius: 20px; font-size: 13px; font-weight: 500;">Primary</span><span style="padding: 6px 12px; background-color: #28C76F; color: white; border-radius: 20px; font-size: 13px; font-weight: 500;">Success</span><span style="padding: 6px 12px; background-color: #FF9F43; color: white; border-radius: 20px; font-size: 13px; font-weight: 500;">Warning</span><span style="padding: 6px 12px; background-color: #EA5455; color: white; border-radius: 20px; font-size: 13px; font-weight: 500;">Danger</span><span style="padding: 6px 12px; background-color: #00CFE8; color: white; border-radius: 20px; font-size: 13px; font-weight: 500;">Info</span></div>',code:`<FilterChip variant="primary" label="Primary" />
<FilterChip variant="success" label="Success" />
<FilterChip variant="warning" label="Warning" />`})}

${Z([{name:"label",type:"String",default:"''",description:"Texto do chip/badge"},{name:"variant",type:"String",default:"'primary'",description:"Cor: primary, secondary, success, danger, warning, info, light-*"},{name:"size",type:"String",default:"'md'",description:"Tamanho: 'sm', 'md', 'lg'"},{name:"removable",type:"Boolean",default:"false",description:"Mostra ícone X para remoção"}])}
    `,features:[{icon:"funnel",title:"Filtros Visuais",description:"Representação visual de filtros ativos"},{icon:"palette",title:"10 Variantes",description:"Cores sólidas e light para categorização"},{icon:"x-circle",title:"Removível",description:"Ícone X para remover filtro rapidamente"},{icon:"stack",title:"Agrupação",description:"Funciona bem em grupos de filtros"}],relatedComponents:[{name:"ESelect",path:"/story/front-office-forms-eselect--default"},{name:"BadgeStatus",path:"/story/front-office-badges-badgestatus--default"}]})};var h,u,y;n.parameters={...n.parameters,docs:{...(h=n.parameters)==null?void 0:h.docs,source:{originalSource:`{
  args: {
    label: '5º Ano A',
    variant: 'light-primary',
    size: 'md',
    removable: false
  },
  render: args => \`
    <style>\${componentStyles}</style>
    \${renderChip(args)}
  \`
}`,...(y=(u=n.parameters)==null?void 0:u.docs)==null?void 0:y.source}}};var x,f,z;r.parameters={...r.parameters,docs:{...(x=r.parameters)==null?void 0:x.docs,source:{originalSource:`{
  render: () => \`
    <style>\${componentStyles}</style>
    <div class="filter-chip-group">
      \${renderChip({
    label: '5º Ano A',
    variant: 'light-primary',
    size: 'md'
  })}
      \${renderChip({
    label: '5º Ano B',
    variant: 'light-primary',
    size: 'md'
  })}
      \${renderChip({
    label: '6º Ano A',
    variant: 'light-primary',
    size: 'md'
  })}
      \${renderChip({
    label: '6º Ano B',
    variant: 'light-primary',
    size: 'md'
  })}
    </div>
  \`
}`,...(z=(f=r.parameters)==null?void 0:f.docs)==null?void 0:z.source}}};var $,C,A;s.parameters={...s.parameters,docs:{...($=s.parameters)==null?void 0:$.docs,source:{originalSource:`{
  render: () => \`
    <style>\${componentStyles}</style>
    <div class="filter-chip-group">
      \${renderChip({
    label: 'Matemática',
    variant: 'primary',
    size: 'md'
  })}
      \${renderChip({
    label: 'Português',
    variant: 'info',
    size: 'md'
  })}
      \${renderChip({
    label: 'Ciências',
    variant: 'success',
    size: 'md'
  })}
      \${renderChip({
    label: 'História',
    variant: 'warning',
    size: 'md'
  })}
    </div>
  \`
}`,...(A=(C=s.parameters)==null?void 0:C.docs)==null?void 0:A.source}}};var w,E,S;t.parameters={...t.parameters,docs:{...(w=t.parameters)==null?void 0:w.docs,source:{originalSource:`{
  render: () => \`
    <style>\${componentStyles}</style>
    <div class="filter-chip-group">
      \${renderChip({
    label: '1º Ano',
    variant: 'light-primary',
    size: 'md'
  })}
      \${renderChip({
    label: '2º Ano',
    variant: 'light-primary',
    size: 'md'
  })}
      \${renderChip({
    label: '3º Ano',
    variant: 'light-primary',
    size: 'md'
  })}
      \${renderChip({
    label: '4º Ano',
    variant: 'light-primary',
    size: 'md'
  })}
      \${renderChip({
    label: '5º Ano',
    variant: 'light-primary',
    size: 'md'
  })}
    </div>
  \`
}`,...(S=(E=t.parameters)==null?void 0:E.docs)==null?void 0:S.source}}};var F,D,B;l.parameters={...l.parameters,docs:{...(F=l.parameters)==null?void 0:F.docs,source:{originalSource:`{
  render: () => \`
    <style>\${componentStyles}</style>
    <div class="filter-chip-group">
      \${renderChip({
    label: 'Ativa',
    variant: 'light-success',
    size: 'md'
  })}
      \${renderChip({
    label: 'Pendente',
    variant: 'light-warning',
    size: 'md'
  })}
      \${renderChip({
    label: 'Concluída',
    variant: 'light-secondary',
    size: 'md'
  })}
      \${renderChip({
    label: 'Expirada',
    variant: 'light-danger',
    size: 'md'
  })}
    </div>
  \`
}`,...(B=(D=l.parameters)==null?void 0:D.docs)==null?void 0:B.source}}};var M,P,k;o.parameters={...o.parameters,docs:{...(M=o.parameters)==null?void 0:M.docs,source:{originalSource:`{
  render: () => \`
    <style>\${componentStyles}</style>
    <div class="filter-chip-group">
      \${renderChip({
    label: 'Turmas',
    variant: 'light-primary',
    size: 'md',
    icon: 'groups'
  })}
      \${renderChip({
    label: 'Matemática',
    variant: 'primary',
    size: 'md',
    icon: 'calculate'
  })}
      \${renderChip({
    label: 'Período',
    variant: 'light-secondary',
    size: 'md',
    icon: 'calendar_month'
  })}
      \${renderChip({
    label: 'Filtros',
    variant: 'light-info',
    size: 'md',
    icon: 'filter_alt'
  })}
    </div>
  \`
}`,...(k=(P=o.parameters)==null?void 0:P.docs)==null?void 0:k.source}}};var T,R,V;d.parameters={...d.parameters,docs:{...(T=d.parameters)==null?void 0:T.docs,source:{originalSource:`{
  render: () => \`
    <style>\${componentStyles}</style>
    <div class="filter-chip-group">
      \${renderChip({
    label: '5º Ano A',
    variant: 'light-primary',
    size: 'md',
    removable: true
  })}
      \${renderChip({
    label: 'Matemática',
    variant: 'primary',
    size: 'md',
    removable: true
  })}
      \${renderChip({
    label: 'Novembro 2024',
    variant: 'light-secondary',
    size: 'md',
    removable: true
  })}
    </div>
  \`
}`,...(V=(R=d.parameters)==null?void 0:R.docs)==null?void 0:V.source}}};var L,I,N;p.parameters={...p.parameters,docs:{...(L=p.parameters)==null?void 0:L.docs,source:{originalSource:`{
  render: () => \`
    <style>\${componentStyles}</style>
    <div style="display: flex; flex-direction: column; gap: 16px; align-items: flex-start;">
      <div>
        <p class="mb-2"><strong>Small</strong></p>
        <div class="filter-chip-group">
          \${renderChip({
    label: '5º Ano A',
    variant: 'light-primary',
    size: 'sm'
  })}
          \${renderChip({
    label: 'Matemática',
    variant: 'primary',
    size: 'sm'
  })}
          \${renderChip({
    label: 'Novembro',
    variant: 'light-secondary',
    size: 'sm'
  })}
        </div>
      </div>
      <div>
        <p class="mb-2"><strong>Medium (Default)</strong></p>
        <div class="filter-chip-group">
          \${renderChip({
    label: '5º Ano A',
    variant: 'light-primary',
    size: 'md'
  })}
          \${renderChip({
    label: 'Matemática',
    variant: 'primary',
    size: 'md'
  })}
          \${renderChip({
    label: 'Novembro',
    variant: 'light-secondary',
    size: 'md'
  })}
        </div>
      </div>
      <div>
        <p class="mb-2"><strong>Large</strong></p>
        <div class="filter-chip-group">
          \${renderChip({
    label: '5º Ano A',
    variant: 'light-primary',
    size: 'lg'
  })}
          \${renderChip({
    label: 'Matemática',
    variant: 'primary',
    size: 'lg'
  })}
          \${renderChip({
    label: 'Novembro',
    variant: 'light-secondary',
    size: 'lg'
  })}
        </div>
      </div>
    </div>
  \`
}`,...(N=(I=p.parameters)==null?void 0:I.docs)==null?void 0:N.source}}};var X,_,U;c.parameters={...c.parameters,docs:{...(X=c.parameters)==null?void 0:X.docs,source:{originalSource:`{
  render: () => \`
    <style>\${componentStyles}</style>
    <div style="max-width: 800px;">
      <div class="card">
        <div class="card-header">
          <h5 class="mb-0">Filtros Aplicados</h5>
        </div>
        <div class="card-body">
          <div class="mb-3">
            <p class="text-muted mb-2" style="font-size: 12px;">TURMA</p>
            <div class="filter-chip-group">
              \${renderChip({
    label: '5º Ano A',
    variant: 'light-primary',
    size: 'md',
    removable: true
  })}
            </div>
          </div>
          <div class="mb-3">
            <p class="text-muted mb-2" style="font-size: 12px;">DISCIPLINA</p>
            <div class="filter-chip-group">
              \${renderChip({
    label: 'Matemática',
    variant: 'primary',
    size: 'md',
    removable: true
  })}
            </div>
          </div>
          <div>
            <p class="text-muted mb-2" style="font-size: 12px;">PERÍODO</p>
            <div class="filter-chip-group">
              \${renderChip({
    label: 'Novembro 2024',
    variant: 'light-secondary',
    size: 'md',
    removable: true
  })}
            </div>
          </div>
        </div>
      </div>
    </div>
  \`
}`,...(U=(_=c.parameters)==null?void 0:_.docs)==null?void 0:U.source}}};var W,O,H;m.parameters={...m.parameters,docs:{...(W=m.parameters)==null?void 0:W.docs,source:{originalSource:`{
  render: () => \`
    <style>\${componentStyles}</style>
    <div style="max-width: 900px;">
      <div class="card">
        <div class="card-header d-flex justify-content-between align-items-center">
          <div>
            <h5 class="mb-1">Relatório de Desempenho</h5>
            <div class="filter-chip-group mt-2">
              \${renderChip({
    label: '5º Ano A',
    variant: 'light-primary',
    size: 'md'
  })}
              \${renderChip({
    label: 'Matemática',
    variant: 'primary',
    size: 'md'
  })}
              \${renderChip({
    label: '2º Bimestre',
    variant: 'light-secondary',
    size: 'md'
  })}
            </div>
          </div>
          <button class="btn btn-sm btn-outline-secondary">
            <span class="material-symbols-outlined" style="font-size: 16px;">filter_alt</span>
            Filtrar
          </button>
        </div>
        <div class="card-body">
          <p class="text-muted">Mostrando resultados para os filtros selecionados acima...</p>
        </div>
      </div>
    </div>
  \`
}`,...(H=(O=m.parameters)==null?void 0:O.docs)==null?void 0:H.source}}};var j,q,G;g.parameters={...g.parameters,docs:{...(j=g.parameters)==null?void 0:j.docs,source:{originalSource:`{
  render: () => \`
    <style>\${componentStyles}</style>
    <div style="display: grid; gap: 16px;">
      <div>
        <p class="mb-2"><strong>Solid Variants</strong></p>
        <div class="filter-chip-group">
          \${renderChip({
    label: 'Primary',
    variant: 'primary',
    size: 'md'
  })}
          \${renderChip({
    label: 'Secondary',
    variant: 'secondary',
    size: 'md'
  })}
          \${renderChip({
    label: 'Success',
    variant: 'success',
    size: 'md'
  })}
          \${renderChip({
    label: 'Danger',
    variant: 'danger',
    size: 'md'
  })}
          \${renderChip({
    label: 'Warning',
    variant: 'warning',
    size: 'md'
  })}
          \${renderChip({
    label: 'Info',
    variant: 'info',
    size: 'md'
  })}
        </div>
      </div>
      <div>
        <p class="mb-2"><strong>Light Variants</strong></p>
        <div class="filter-chip-group">
          \${renderChip({
    label: 'Light Primary',
    variant: 'light-primary',
    size: 'md'
  })}
          \${renderChip({
    label: 'Light Secondary',
    variant: 'light-secondary',
    size: 'md'
  })}
          \${renderChip({
    label: 'Light Success',
    variant: 'light-success',
    size: 'md'
  })}
          \${renderChip({
    label: 'Light Danger',
    variant: 'light-danger',
    size: 'md'
  })}
        </div>
      </div>
    </div>
  \`
}`,...(G=(q=g.parameters)==null?void 0:q.docs)==null?void 0:G.source}}};var J,K,Q;v.parameters={...v.parameters,docs:{...(J=v.parameters)==null?void 0:J.docs,source:{originalSource:`{
  render: () => createDocPage({
    title: 'FilterChip',
    subtitle: 'Badge pill para filtros em dashboards e relatórios',
    badge: 'Forms / Filters',
    colors: {
      primary: '#6E63E8',
      secondary: '#00CFE8'
    },
    stats: [{
      label: 'Variantes',
      value: '10',
      description: 'primary, secondary, success, danger, warning, info + light'
    }, {
      label: 'Tamanhos',
      value: '3',
      description: 'sm, md, lg'
    }, {
      label: 'Removível',
      value: 'Sim',
      description: 'Com ícone X para remoção'
    }, {
      label: 'Uso Principal',
      value: 'Filtros',
      description: 'Dashboards, relatórios, listagens'
    }],
    content: \`
\${createExampleCard({
      title: 'Chip Básico',
      description: 'Badge pill simples com label',
      preview: '<div style="padding: 20px;"><span style="display: inline-flex; align-items: center; gap: 6px; padding: 6px 12px; background-color: #6E63E8; color: white; border-radius: 20px; font-size: 13px; font-weight: 500;">Matemática</span></div>',
      code: '<FilterChip\\n  label="Matemática"\\n  variant="primary"\\n  size="md"\\n/>'
    })}

\${createExampleCard({
      title: 'Chip Removível',
      description: 'Com ícone X para remover filtro',
      preview: '<div style="padding: 20px; display: flex; gap: 8px; flex-wrap: wrap;"><span style="display: inline-flex; align-items: center; gap: 6px; padding: 6px 12px; background-color: #6E63E8; color: white; border-radius: 20px; font-size: 13px; font-weight: 500; cursor: pointer;">Turma A <i class="bi bi-x" style="font-size: 16px; margin-left: 2px;"></i></span><span style="display: inline-flex; align-items: center; gap: 6px; padding: 6px 12px; background-color: #28C76F; color: white; border-radius: 20px; font-size: 13px; font-weight: 500; cursor: pointer;">2024 <i class="bi bi-x" style="font-size: 16px; margin-left: 2px;"></i></span><span style="display: inline-flex; align-items: center; gap: 6px; padding: 6px 12px; background-color: #00CFE8; color: white; border-radius: 20px; font-size: 13px; font-weight: 500; cursor: pointer;">1º Trimestre <i class="bi bi-x" style="font-size: 16px; margin-left: 2px;"></i></span></div>',
      code: '<FilterChip\\n  label="Turma A"\\n  variant="primary"\\n  :removable="true"\\n  @remove="handleRemove"\\n/>'
    })}

\${createExampleCard({
      title: 'Variantes de Cor',
      description: 'Diferentes cores para categorização visual',
      preview: '<div style="padding: 20px; display: flex; gap: 8px; flex-wrap: wrap;"><span style="padding: 6px 12px; background-color: #6E63E8; color: white; border-radius: 20px; font-size: 13px; font-weight: 500;">Primary</span><span style="padding: 6px 12px; background-color: #28C76F; color: white; border-radius: 20px; font-size: 13px; font-weight: 500;">Success</span><span style="padding: 6px 12px; background-color: #FF9F43; color: white; border-radius: 20px; font-size: 13px; font-weight: 500;">Warning</span><span style="padding: 6px 12px; background-color: #EA5455; color: white; border-radius: 20px; font-size: 13px; font-weight: 500;">Danger</span><span style="padding: 6px 12px; background-color: #00CFE8; color: white; border-radius: 20px; font-size: 13px; font-weight: 500;">Info</span></div>',
      code: '<FilterChip variant="primary" label="Primary" />\\n<FilterChip variant="success" label="Success" />\\n<FilterChip variant="warning" label="Warning" />'
    })}

\${createPropsTable([{
      name: 'label',
      type: 'String',
      default: "''",
      description: 'Texto do chip/badge'
    }, {
      name: 'variant',
      type: 'String',
      default: "'primary'",
      description: 'Cor: primary, secondary, success, danger, warning, info, light-*'
    }, {
      name: 'size',
      type: 'String',
      default: "'md'",
      description: "Tamanho: 'sm', 'md', 'lg'"
    }, {
      name: 'removable',
      type: 'Boolean',
      default: 'false',
      description: 'Mostra ícone X para remoção'
    }])}
    \`,
    features: [{
      icon: 'funnel',
      title: 'Filtros Visuais',
      description: 'Representação visual de filtros ativos'
    }, {
      icon: 'palette',
      title: '10 Variantes',
      description: 'Cores sólidas e light para categorização'
    }, {
      icon: 'x-circle',
      title: 'Removível',
      description: 'Ícone X para remover filtro rapidamente'
    }, {
      icon: 'stack',
      title: 'Agrupação',
      description: 'Funciona bem em grupos de filtros'
    }],
    relatedComponents: [{
      name: 'ESelect',
      path: '/story/front-office-forms-eselect--default'
    }, {
      name: 'BadgeStatus',
      path: '/story/front-office-badges-badgestatus--default'
    }]
  })
}`,...(Q=(K=v.parameters)==null?void 0:K.docs)==null?void 0:Q.source}}};const ie=["Default","Turmas","Disciplinas","AnosEscolares","StatusMissoes","ComIcones","Removivel","Tamanhos","BarraDeFiltros","ProfessorDashboard","AllVariants","Documentation"];export{g as AllVariants,t as AnosEscolares,c as BarraDeFiltros,o as ComIcones,n as Default,s as Disciplinas,v as Documentation,m as ProfessorDashboard,d as Removivel,l as StatusMissoes,p as Tamanhos,r as Turmas,ie as __namedExportsOrder,ae as default};
