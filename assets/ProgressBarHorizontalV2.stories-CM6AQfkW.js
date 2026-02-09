const L={title:"Educacross Components V2/ProgressBarHorizontalV2",tags:["autodocs"],argTypes:{value:{control:{type:"range",min:0,max:100,step:1},description:"Valor da barra de progresso (0-100)"},variant:{control:"select",options:["danger","warning","success","primary"],description:"Variante de cor (danger=Abaixo Básico, warning=Básico, success=Proficiente, primary=Avançado)"},showInfo:{control:"boolean",description:"Mostrar informações abaixo da barra"},height:{control:"text",description:'Altura da barra (ex: "8px", "12px")'},label:{control:"text",description:"Label abaixo da barra"},infoText:{control:"text",description:"Texto informativo ao lado do label"}},parameters:{layout:"padded",docs:{description:{component:"Barra de progresso horizontal com sistema de proficiência educacional (Abaixo Básico, Básico, Proficiente, Avançado) e informações detalhadas."}}}},s=`
.progress-bar-horizontal-v2 {
  width: 100%;
}

.progress-bar-horizontal-v2 .progress {
  border-radius: 4px;
  overflow: hidden;
  background-color: #f3f2f7;
}

.progress-bar-horizontal-v2 .progress-bar {
  transition: width 0.6s ease;
  border-radius: 4px;
}

/* Proficiency Colors */
.progress-bar-horizontal-v2 .bg-danger {
  background-color: #ea5455 !important;
}

.progress-bar-horizontal-v2 .bg-warning {
  background-color: #ffb443 !important;
}

.progress-bar-horizontal-v2 .bg-success {
  background-color: #28c76f !important;
}

.progress-bar-horizontal-v2 .bg-primary {
  background-color: #7367f0 !important;
}

.progress-bar-horizontal-v2 .info-section {
  display: flex;
  align-items: center;
  margin-top: 8px;
  font-size: 14px;
  color: #5e5873;
}

.progress-bar-horizontal-v2 .info-section .percentage {
  font-weight: 700;
  margin-right: 4px;
}

.progress-bar-horizontal-v2 .info-section .label {
  margin-right: auto;
}

.progress-bar-horizontal-v2 .info-section .info-text {
  color: #6e6b7b;
  white-space: nowrap;
}

.progress-bar-horizontal-v2 .info-section .info-text strong {
  font-weight: 600;
}
`,e=n=>`
<div class="progress-bar-horizontal-v2">
  <div class="progress" style="height: ${n.height||"8px"}">
    <div 
      class="progress-bar bg-${n.variant}" 
      role="progressbar" 
      style="width: ${n.value}%"
      aria-valuenow="${n.value}" 
      aria-valuemin="0" 
      aria-valuemax="100"
    ></div>
  </div>
  ${n.showInfo?`
  <div class="info-section">
    <span class="percentage">${n.value}%</span>
    <span class="label">${n.label}</span>
    <span class="info-text">${n.infoText}</span>
  </div>
  `:""}
</div>
`,r={args:{value:65,variant:"success",height:"8px",showInfo:!0,label:"Proficiente",infoText:"<strong>13</strong> de 20 alunos"},render:n=>`
    <style>${s}</style>
    <div style="max-width: 500px;">
      ${e(n)}
    </div>
  `},a={args:{value:25,variant:"danger",height:"8px",showInfo:!0,label:"Abaixo do Básico",infoText:"<strong>5</strong> de 20 alunos"},render:n=>`
    <style>${s}</style>
    <div style="max-width: 500px;">
      ${e(n)}
    </div>
  `},o={args:{value:40,variant:"warning",height:"8px",showInfo:!0,label:"Básico",infoText:"<strong>8</strong> de 20 alunos"},render:n=>`
    <style>${s}</style>
    <div style="max-width: 500px;">
      ${e(n)}
    </div>
  `},t={args:{value:70,variant:"success",height:"8px",showInfo:!0,label:"Proficiente",infoText:"<strong>14</strong> de 20 alunos"},render:n=>`
    <style>${s}</style>
    <div style="max-width: 500px;">
      ${e(n)}
    </div>
  `},i={args:{value:90,variant:"primary",height:"8px",showInfo:!0,label:"Avançado",infoText:"<strong>18</strong> de 20 alunos"},render:n=>`
    <style>${s}</style>
    <div style="max-width: 500px;">
      ${e(n)}
    </div>
  `},l={args:{value:55,variant:"success",height:"8px",showInfo:!1},render:n=>`
    <style>${s}</style>
    <div style="max-width: 500px;">
      ${e(n)}
    </div>
  `},d={args:{value:75,variant:"success",height:"12px",showInfo:!0,label:"Turma 5º A - Proficiente",infoText:"<strong>15</strong> de 20 alunos"},render:n=>`
    <style>${s}</style>
    <div style="max-width: 500px;">
      ${e(n)}
    </div>
  `},c={render:()=>`
    <style>${s}</style>
    <div style="max-width: 600px;">
      <div class="card">
        <div class="card-header">
          <h5 class="mb-0">Desempenho da Turma 5º Ano A - Matemática</h5>
          <small class="text-muted">Missão: Frações - Novembro 2024</small>
        </div>
        <div class="card-body">
          <div class="mb-3">
            ${e({value:15,variant:"danger",height:"10px",showInfo:!0,label:"Abaixo do Básico",infoText:"<strong>3</strong> de 20 alunos"})}
          </div>
          <div class="mb-3">
            ${e({value:35,variant:"warning",height:"10px",showInfo:!0,label:"Básico",infoText:"<strong>7</strong> de 20 alunos"})}
          </div>
          <div class="mb-3">
            ${e({value:40,variant:"success",height:"10px",showInfo:!0,label:"Proficiente",infoText:"<strong>8</strong> de 20 alunos"})}
          </div>
          <div>
            ${e({value:10,variant:"primary",height:"10px",showInfo:!0,label:"Avançado",infoText:"<strong>2</strong> de 20 alunos"})}
          </div>
        </div>
      </div>
    </div>
  `},g={render:()=>`
    <style>${s}</style>
    <div style="max-width: 700px;">
      <div class="card">
        <div class="card-header">
          <h5 class="mb-0">Relatório Geral - 5º Ano</h5>
          <small class="text-muted">Todas as turmas - Português</small>
        </div>
        <div class="card-body">
          <div class="mb-4">
            <h6 class="mb-2">Turma 5º A</h6>
            ${e({value:68,variant:"success",height:"8px",showInfo:!0,label:"Proficiente",infoText:"<strong>17</strong> de 25 alunos"})}
          </div>
          <div class="mb-4">
            <h6 class="mb-2">Turma 5º B</h6>
            ${e({value:52,variant:"success",height:"8px",showInfo:!0,label:"Proficiente",infoText:"<strong>13</strong> de 25 alunos"})}
          </div>
          <div>
            <h6 class="mb-2">Turma 5º C</h6>
            ${e({value:44,variant:"warning",height:"8px",showInfo:!0,label:"Básico",infoText:"<strong>11</strong> de 25 alunos"})}
          </div>
        </div>
      </div>
    </div>
  `},v={render:()=>`
    <style>${s}</style>
    <div style="max-width: 500px;">
      <div class="mb-3">
        <p class="mb-1"><strong>0% - Nenhum aluno</strong></p>
        ${e({value:0,variant:"danger",height:"8px",showInfo:!0,label:"Abaixo do Básico",infoText:"<strong>0</strong> de 20 alunos"})}
      </div>
      <div class="mb-3">
        <p class="mb-1"><strong>5% - Mínimo visível</strong></p>
        ${e({value:5,variant:"danger",height:"8px",showInfo:!0,label:"Abaixo do Básico",infoText:"<strong>1</strong> de 20 alunos"})}
      </div>
      <div class="mb-3">
        <p class="mb-1"><strong>50% - Metade</strong></p>
        ${e({value:50,variant:"warning",height:"8px",showInfo:!0,label:"Básico",infoText:"<strong>10</strong> de 20 alunos"})}
      </div>
      <div class="mb-3">
        <p class="mb-1"><strong>95% - Quase completo</strong></p>
        ${e({value:95,variant:"primary",height:"8px",showInfo:!0,label:"Avançado",infoText:"<strong>19</strong> de 20 alunos"})}
      </div>
      <div>
        <p class="mb-1"><strong>100% - Completo</strong></p>
        ${e({value:100,variant:"primary",height:"8px",showInfo:!0,label:"Avançado",infoText:"<strong>20</strong> de 20 alunos"})}
      </div>
    </div>
  `};var p,u,h;r.parameters={...r.parameters,docs:{...(p=r.parameters)==null?void 0:p.docs,source:{originalSource:`{
  args: {
    value: 65,
    variant: 'success',
    height: '8px',
    showInfo: true,
    label: 'Proficiente',
    infoText: '<strong>13</strong> de 20 alunos'
  },
  render: args => \`
    <style>\${componentStyles}</style>
    <div style="max-width: 500px;">
      \${renderProgressBar(args)}
    </div>
  \`
}`,...(h=(u=r.parameters)==null?void 0:u.docs)==null?void 0:h.source}}};var m,x,b;a.parameters={...a.parameters,docs:{...(m=a.parameters)==null?void 0:m.docs,source:{originalSource:`{
  args: {
    value: 25,
    variant: 'danger',
    height: '8px',
    showInfo: true,
    label: 'Abaixo do Básico',
    infoText: '<strong>5</strong> de 20 alunos'
  },
  render: args => \`
    <style>\${componentStyles}</style>
    <div style="max-width: 500px;">
      \${renderProgressBar(args)}
    </div>
  \`
}`,...(b=(x=a.parameters)==null?void 0:x.docs)==null?void 0:b.source}}};var f,y,w;o.parameters={...o.parameters,docs:{...(f=o.parameters)==null?void 0:f.docs,source:{originalSource:`{
  args: {
    value: 40,
    variant: 'warning',
    height: '8px',
    showInfo: true,
    label: 'Básico',
    infoText: '<strong>8</strong> de 20 alunos'
  },
  render: args => \`
    <style>\${componentStyles}</style>
    <div style="max-width: 500px;">
      \${renderProgressBar(args)}
    </div>
  \`
}`,...(w=(y=o.parameters)==null?void 0:y.docs)==null?void 0:w.source}}};var $,B,T;t.parameters={...t.parameters,docs:{...($=t.parameters)==null?void 0:$.docs,source:{originalSource:`{
  args: {
    value: 70,
    variant: 'success',
    height: '8px',
    showInfo: true,
    label: 'Proficiente',
    infoText: '<strong>14</strong> de 20 alunos'
  },
  render: args => \`
    <style>\${componentStyles}</style>
    <div style="max-width: 500px;">
      \${renderProgressBar(args)}
    </div>
  \`
}`,...(T=(B=t.parameters)==null?void 0:B.docs)==null?void 0:T.source}}};var A,P,I;i.parameters={...i.parameters,docs:{...(A=i.parameters)==null?void 0:A.docs,source:{originalSource:`{
  args: {
    value: 90,
    variant: 'primary',
    height: '8px',
    showInfo: true,
    label: 'Avançado',
    infoText: '<strong>18</strong> de 20 alunos'
  },
  render: args => \`
    <style>\${componentStyles}</style>
    <div style="max-width: 500px;">
      \${renderProgressBar(args)}
    </div>
  \`
}`,...(I=(P=i.parameters)==null?void 0:P.docs)==null?void 0:I.source}}};var S,E,z;l.parameters={...l.parameters,docs:{...(S=l.parameters)==null?void 0:S.docs,source:{originalSource:`{
  args: {
    value: 55,
    variant: 'success',
    height: '8px',
    showInfo: false
  },
  render: args => \`
    <style>\${componentStyles}</style>
    <div style="max-width: 500px;">
      \${renderProgressBar(args)}
    </div>
  \`
}`,...(z=(E=l.parameters)==null?void 0:E.docs)==null?void 0:z.source}}};var C,M,D;d.parameters={...d.parameters,docs:{...(C=d.parameters)==null?void 0:C.docs,source:{originalSource:`{
  args: {
    value: 75,
    variant: 'success',
    height: '12px',
    showInfo: true,
    label: 'Turma 5º A - Proficiente',
    infoText: '<strong>15</strong> de 20 alunos'
  },
  render: args => \`
    <style>\${componentStyles}</style>
    <div style="max-width: 500px;">
      \${renderProgressBar(args)}
    </div>
  \`
}`,...(D=(M=d.parameters)==null?void 0:M.docs)==null?void 0:D.source}}};var k,V,F;c.parameters={...c.parameters,docs:{...(k=c.parameters)==null?void 0:k.docs,source:{originalSource:`{
  render: () => \`
    <style>\${componentStyles}</style>
    <div style="max-width: 600px;">
      <div class="card">
        <div class="card-header">
          <h5 class="mb-0">Desempenho da Turma 5º Ano A - Matemática</h5>
          <small class="text-muted">Missão: Frações - Novembro 2024</small>
        </div>
        <div class="card-body">
          <div class="mb-3">
            \${renderProgressBar({
    value: 15,
    variant: 'danger',
    height: '10px',
    showInfo: true,
    label: 'Abaixo do Básico',
    infoText: '<strong>3</strong> de 20 alunos'
  })}
          </div>
          <div class="mb-3">
            \${renderProgressBar({
    value: 35,
    variant: 'warning',
    height: '10px',
    showInfo: true,
    label: 'Básico',
    infoText: '<strong>7</strong> de 20 alunos'
  })}
          </div>
          <div class="mb-3">
            \${renderProgressBar({
    value: 40,
    variant: 'success',
    height: '10px',
    showInfo: true,
    label: 'Proficiente',
    infoText: '<strong>8</strong> de 20 alunos'
  })}
          </div>
          <div>
            \${renderProgressBar({
    value: 10,
    variant: 'primary',
    height: '10px',
    showInfo: true,
    label: 'Avançado',
    infoText: '<strong>2</strong> de 20 alunos'
  })}
          </div>
        </div>
      </div>
    </div>
  \`
}`,...(F=(V=c.parameters)==null?void 0:V.docs)==null?void 0:F.source}}};var N,R,_;g.parameters={...g.parameters,docs:{...(N=g.parameters)==null?void 0:N.docs,source:{originalSource:`{
  render: () => \`
    <style>\${componentStyles}</style>
    <div style="max-width: 700px;">
      <div class="card">
        <div class="card-header">
          <h5 class="mb-0">Relatório Geral - 5º Ano</h5>
          <small class="text-muted">Todas as turmas - Português</small>
        </div>
        <div class="card-body">
          <div class="mb-4">
            <h6 class="mb-2">Turma 5º A</h6>
            \${renderProgressBar({
    value: 68,
    variant: 'success',
    height: '8px',
    showInfo: true,
    label: 'Proficiente',
    infoText: '<strong>17</strong> de 25 alunos'
  })}
          </div>
          <div class="mb-4">
            <h6 class="mb-2">Turma 5º B</h6>
            \${renderProgressBar({
    value: 52,
    variant: 'success',
    height: '8px',
    showInfo: true,
    label: 'Proficiente',
    infoText: '<strong>13</strong> de 25 alunos'
  })}
          </div>
          <div>
            <h6 class="mb-2">Turma 5º C</h6>
            \${renderProgressBar({
    value: 44,
    variant: 'warning',
    height: '8px',
    showInfo: true,
    label: 'Básico',
    infoText: '<strong>11</strong> de 25 alunos'
  })}
          </div>
        </div>
      </div>
    </div>
  \`
}`,...(_=(R=g.parameters)==null?void 0:R.docs)==null?void 0:_.source}}};var G,H,Q;v.parameters={...v.parameters,docs:{...(G=v.parameters)==null?void 0:G.docs,source:{originalSource:`{
  render: () => \`
    <style>\${componentStyles}</style>
    <div style="max-width: 500px;">
      <div class="mb-3">
        <p class="mb-1"><strong>0% - Nenhum aluno</strong></p>
        \${renderProgressBar({
    value: 0,
    variant: 'danger',
    height: '8px',
    showInfo: true,
    label: 'Abaixo do Básico',
    infoText: '<strong>0</strong> de 20 alunos'
  })}
      </div>
      <div class="mb-3">
        <p class="mb-1"><strong>5% - Mínimo visível</strong></p>
        \${renderProgressBar({
    value: 5,
    variant: 'danger',
    height: '8px',
    showInfo: true,
    label: 'Abaixo do Básico',
    infoText: '<strong>1</strong> de 20 alunos'
  })}
      </div>
      <div class="mb-3">
        <p class="mb-1"><strong>50% - Metade</strong></p>
        \${renderProgressBar({
    value: 50,
    variant: 'warning',
    height: '8px',
    showInfo: true,
    label: 'Básico',
    infoText: '<strong>10</strong> de 20 alunos'
  })}
      </div>
      <div class="mb-3">
        <p class="mb-1"><strong>95% - Quase completo</strong></p>
        \${renderProgressBar({
    value: 95,
    variant: 'primary',
    height: '8px',
    showInfo: true,
    label: 'Avançado',
    infoText: '<strong>19</strong> de 20 alunos'
  })}
      </div>
      <div>
        <p class="mb-1"><strong>100% - Completo</strong></p>
        \${renderProgressBar({
    value: 100,
    variant: 'primary',
    height: '8px',
    showInfo: true,
    label: 'Avançado',
    infoText: '<strong>20</strong> de 20 alunos'
  })}
      </div>
    </div>
  \`
}`,...(Q=(H=v.parameters)==null?void 0:H.docs)==null?void 0:Q.source}}};const O=["Default","AbaixoBasico","Basico","Proficiente","Avancado","SemInformacao","BarraAlta","ProfessorDashboard","CoordenadorRelatorio","EdgeCases"];export{a as AbaixoBasico,i as Avancado,d as BarraAlta,o as Basico,g as CoordenadorRelatorio,r as Default,v as EdgeCases,c as ProfessorDashboard,t as Proficiente,l as SemInformacao,O as __namedExportsOrder,L as default};
