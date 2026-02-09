const J={title:"Educacross Components V2/Data Display/PerformanceCell",tags:["autodocs"],parameters:{layout:"padded",docs:{description:{component:`
## PerformanceCell - Célula de Desempenho

Componente de célula de tabela com indicador visual colorido e barra de progresso para exibir notas, percentuais e conceitos.

### Casos de Uso

**Professor**: Visualizar notas de alunos em tabelas, comparar desempenho entre missões, analisar evolução temporal, identificar rapidamente alunos com dificuldade

**Coordenador**: Relatórios de desempenho por turma, comparação entre disciplinas, rankings e estatísticas, boletins e análises pedagógicas

**Aluno/Responsável**: Consultar boletim escolar, acompanhar evolução nas disciplinas, ver ranking da turma, entender feedback visual das notas
        `}}}},r=`<style>
  .performance-cell {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 8px 16px;
    min-width: 80px;
    border-radius: 6px;
    font-weight: 700;
    overflow: hidden;
  }
  .performance-bg {
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    transition: width 0.3s ease;
  }
  .perf-high {
    background: #E8F5E9;
    color: #28C76F;
  }
  .perf-high .performance-bg {
    background: rgba(40, 199, 111, 0.2);
  }
  .perf-medium {
    background: #FFF8E1;
    color: #FF9F43;
  }
  .perf-medium .performance-bg {
    background: rgba(255, 159, 67, 0.2);
  }
  .perf-low {
    background: #FFEBEE;
    color: #EA5455;
  }
  .perf-low .performance-bg {
    background: rgba(234, 84, 85, 0.2);
  }
  .perf-neutral {
    background: #F3F2F7;
    color: #6E6B7B;
  }
  .perf-neutral .performance-bg {
    background: rgba(110, 107, 123, 0.1);
  }
  .performance-value {
    position: relative;
    z-index: 1;
    font-size: 16px;
  }
  .performance-compact {
    padding: 4px 10px;
    min-width: 60px;
  }
  .performance-compact .performance-value {
    font-size: 14px;
  }
  .grade-badge {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    font-size: 18px;
    font-weight: 700;
  }
  .sort-indicator {
    margin-left: 6px;
    font-size: 12px;
    opacity: 0.6;
  }
</style>
`,l=t=>t>=80?"high":t>=60?"medium":"low",d={render:()=>`
    ${r}
    <div style="display: flex; flex-direction: column; gap: 12px;">
      <div class="performance-cell perf-high">
        <div class="performance-bg" style="width: 92%"></div>
        <span class="performance-value">9.2/10</span>
      </div>
      
      <div class="performance-cell perf-medium">
        <div class="performance-bg" style="width: 70%"></div>
        <span class="performance-value">7.0/10</span>
      </div>
      
      <div class="performance-cell perf-low">
        <div class="performance-bg" style="width: 45%"></div>
        <span class="performance-value">4.5/10</span>
      </div>
      
      <div class="performance-cell perf-neutral">
        <div class="performance-bg" style="width: 0%"></div>
        <span class="performance-value">-</span>
      </div>
    </div>
  `},c={render:()=>`
    ${r}
    <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; max-width: 600px;">
      <div style="text-align: center;">
        <div style="margin-bottom: 8px; font-size: 12px; color: #6E6B7B; font-weight: 600;">Percentual</div>
        <div class="performance-cell perf-high">
          <div class="performance-bg" style="width: 87%"></div>
          <span class="performance-value">87%</span>
        </div>
      </div>
      
      <div style="text-align: center;">
        <div style="margin-bottom: 8px; font-size: 12px; color: #6E6B7B; font-weight: 600;">Nota</div>
        <div class="performance-cell perf-high">
          <div class="performance-bg" style="width: 87%"></div>
          <span class="performance-value">8.7/10</span>
        </div>
      </div>
      
      <div style="text-align: center;">
        <div style="margin-bottom: 8px; font-size: 12px; color: #6E6B7B; font-weight: 600;">Conceito</div>
        <div class="grade-badge perf-high">A</div>
      </div>
    </div>
  `},p={render:()=>{const o=[{nome:"Ana Silva",notas:[9.2,8.5,9]},{nome:"Bruno Costa",notas:[7,7.5,8]},{nome:"Carlos Mendes",notas:[5.5,6,6.5]},{nome:"Diana Santos",notas:[8,8.5,8.2]},{nome:"Eduardo Lima",notas:[4.5,5,null]}].map(e=>{const a=e.notas.map(n=>{if(n===null)return'<td style="padding: 12px; text-align: center;"><div class="performance-cell perf-neutral"><span class="performance-value">-</span></div></td>';const i=l(n*10),s=n*10;return'<td style="padding: 12px; text-align: center;"><div class="performance-cell perf-'+i+'"><div class="performance-bg" style="width: '+s+'%"></div><span class="performance-value">'+n.toFixed(1)+"/10</span></div></td>"}).join("");return'<tr style="border-bottom: 1px solid #F3F2F7;"><td style="padding: 12px; font-size: 14px; color: #5E5873; font-weight: 600;">'+e.nome+"</td>"+a+"</tr>"}).join("");return`
      ${r}
      <div style="background: #fff; border: 1px solid #D8D6DE; border-radius: 8px; padding: 20px; max-width: 900px;">
        <h3 style="margin: 0 0 16px; font-size: 18px; font-weight: 600; color: #5E5873;">
          Desempenho da Turma - Matemática 5º A
        </h3>
        <table style="width: 100%; border-collapse: collapse;">
          <thead>
            <tr style="border-bottom: 2px solid #E8E8E8;">
              <th style="padding: 12px; text-align: left; font-size: 13px; font-weight: 600; color: #6E6B7B;">Aluno</th>
              <th style="padding: 12px; text-align: center; font-size: 13px; font-weight: 600; color: #6E6B7B;">Missão 1</th>
              <th style="padding: 12px; text-align: center; font-size: 13px; font-weight: 600; color: #6E6B7B;">Missão 2</th>
              <th style="padding: 12px; text-align: center; font-size: 13px; font-weight: 600; color: #6E6B7B;">Missão 3</th>
            </tr>
          </thead>
          <tbody>
            ${o}
          </tbody>
        </table>
      </div>
      <p style="margin-top: 16px; font-size: 13px; color: #6E6B7B;">
        <strong>Contexto:</strong> Tabela de desempenho de alunos em missões. Professor analisando performance da turma.
      </p>
    `}},m={render:()=>{const o=[{pos:1,nome:"Ana Silva",nota:9.2,medal:"🥇"},{pos:2,nome:"Diana Santos",nota:8.5,medal:"🥈"},{pos:3,nome:"Bruno Costa",nota:7.5,medal:"🥉"},{pos:4,nome:"Carlos Mendes",nota:6,medal:""},{pos:5,nome:"Eduardo Lima",nota:4.8,medal:""}].map(e=>{const a=l(e.nota*10),n=e.nota*10;return'<div style="display: flex; align-items: center; gap: 12px; padding: 12px; background: #F8F8F8; border-radius: 8px;"><span style="font-size: 24px; min-width: 30px;">'+(e.medal||e.pos+"º")+'</span><span style="flex: 1; font-size: 14px; font-weight: 600; color: #5E5873;">'+e.nome+'</span><div class="performance-cell perf-'+a+'"><div class="performance-bg" style="width: '+n+'%"></div><span class="performance-value">'+e.nota.toFixed(1)+"/10</span></div></div>"}).join("");return`
      ${r}
      <div style="background: #fff; border: 1px solid #D8D6DE; border-radius: 8px; padding: 20px; max-width: 500px;">
        <h3 style="margin: 0 0 16px; font-size: 18px; font-weight: 600; color: #5E5873;">
          🏆 Ranking Geral - Matemática 5º A
        </h3>
        <div style="display: flex; flex-direction: column; gap: 12px;">
          ${o}
        </div>
      </div>
      <p style="margin-top: 16px; font-size: 13px; color: #6E6B7B;">
        <strong>Contexto:</strong> Ranking de alunos com medalhas. Aluno visualizando posição na turma.
      </p>
    `}},x={render:()=>{const o=[{disciplina:"Matemática",notas:[9.2,8.5,9,8.8],conceito:"A"},{disciplina:"Português",notas:[8,8.5,7.5,8],conceito:"B"},{disciplina:"Ciências",notas:[7,7.5,8,7.8],conceito:"B"},{disciplina:"História",notas:[8.5,9,8.8,9.2],conceito:"A"}].map(e=>{const a=e.notas.map(i=>{const s=l(i*10),u=i*10;return'<td style="padding: 12px; text-align: center;"><div class="performance-cell performance-compact perf-'+s+'"><div class="performance-bg" style="width: '+u+'%"></div><span class="performance-value">'+i.toFixed(1)+"</span></div></td>"}).join(""),n=e.conceito==="A"?"high":"medium";return'<tr style="border-bottom: 1px solid #F3F2F7;"><td style="padding: 12px; font-size: 14px; color: #5E5873; font-weight: 600;">'+e.disciplina+"</td>"+a+'<td style="padding: 12px; text-align: center;"><div class="grade-badge perf-'+n+'">'+e.conceito+"</div></td></tr>"}).join("");return`
      ${r}
      <div style="background: #fff; border: 1px solid #D8D6DE; border-radius: 8px; padding: 24px; max-width: 800px;">
        <h3 style="margin: 0 0 20px; font-size: 20px; font-weight: 600; color: #5E5873;">
          Boletim Escolar 2024 - Ana Silva
        </h3>
        <table style="width: 100%; border-collapse: collapse;">
          <thead>
            <tr style="border-bottom: 2px solid #E8E8E8;">
              <th style="padding: 12px; text-align: left; font-size: 13px; font-weight: 600; color: #6E6B7B;">Disciplina</th>
              <th style="padding: 12px; text-align: center; font-size: 13px; font-weight: 600; color: #6E6B7B;">1º Bim</th>
              <th style="padding: 12px; text-align: center; font-size: 13px; font-weight: 600; color: #6E6B7B;">2º Bim</th>
              <th style="padding: 12px; text-align: center; font-size: 13px; font-weight: 600; color: #6E6B7B;">3º Bim</th>
              <th style="padding: 12px; text-align: center; font-size: 13px; font-weight: 600; color: #6E6B7B;">4º Bim</th>
              <th style="padding: 12px; text-align: center; font-size: 13px; font-weight: 600; color: #6E6B7B;">Conceito</th>
            </tr>
          </thead>
          <tbody>
            ${o}
          </tbody>
        </table>
      </div>
      <p style="margin-top: 16px; font-size: 13px; color: #6E6B7B;">
        <strong>Contexto:</strong> Boletim completo com notas bimestrais. Responsável visualizando desempenho.
      </p>
    `}},g={render:()=>{const t=[{mes:"Jan",nota:6},{mes:"Fev",nota:6.5},{mes:"Mar",nota:7},{mes:"Abr",nota:7.2},{mes:"Mai",nota:7.8},{mes:"Jun",nota:8.5}],o=t.map((e,a)=>{const n=l(e.nota*10),i=e.nota*10,s=a>0?t[a-1].nota:e.nota;return'<div style="flex: 1; display: flex; flex-direction: column; align-items: center; gap: 8px;"><div style="font-size: 12px; color: #6E6B7B;">'+(e.nota>s?"↗️":e.nota<s?"↘️":"→")+'</div><div class="performance-cell perf-'+n+'" style="writing-mode: vertical-rl; transform: rotate(180deg); height: '+i*1.5+'px; min-width: 60px;"><span class="performance-value" style="writing-mode: horizontal-tb; transform: rotate(180deg);">'+e.nota.toFixed(1)+'</span></div><div style="font-size: 13px; font-weight: 600; color: #5E5873;">'+e.mes+"</div></div>"}).join("");return`
      ${r}
      <div style="background: #fff; border: 1px solid #D8D6DE; border-radius: 8px; padding: 20px; max-width: 700px;">
        <h3 style="margin: 0 0 16px; font-size: 18px; font-weight: 600; color: #5E5873;">
          Evolução Mensal - Bruno Costa
        </h3>
        <div style="display: flex; gap: 10px; align-items: flex-end;">
          ${o}
        </div>
      </div>
      <p style="margin-top: 16px; font-size: 13px; color: #6E6B7B;">
        <strong>Contexto:</strong> Gráfico de evolução com indicadores de tendência. Aluno acompanhando progresso.
      </p>
    `}},f={render:()=>{const o=[{disciplina:"Matemática",nota:8.5,variacao:"+0.8"},{disciplina:"Português",nota:7.2,variacao:"-0.3"},{disciplina:"Ciências",nota:9,variacao:"+1.2"},{disciplina:"História",nota:6.5,variacao:"+0.2"},{disciplina:"Geografia",nota:7.8,variacao:"-0.5"},{disciplina:"Inglês",nota:8.2,variacao:"+0.6"}].map(e=>{const a=l(e.nota*10),n=e.nota*10,s=e.variacao.startsWith("+")?"#28C76F":"#EA5455";return'<div style="padding: 16px; border: 1px solid #E8E8E8; border-radius: 8px;"><div style="margin-bottom: 12px; font-size: 14px; font-weight: 600; color: #5E5873;">'+e.disciplina+'</div><div style="display: flex; align-items: center; gap: 12px;"><div class="performance-cell perf-'+a+'"><div class="performance-bg" style="width: '+n+'%"></div><span class="performance-value">'+e.nota.toFixed(1)+'</span></div><div style="font-size: 14px; font-weight: 700; color: '+s+';">'+e.variacao+"</div></div></div>"}).join("");return`
      ${r}
      <div style="background: #fff; border: 1px solid #D8D6DE; border-radius: 8px; padding: 20px; max-width: 900px;">
        <h3 style="margin: 0 0 16px; font-size: 18px; font-weight: 600; color: #5E5873;">
          Performance por Disciplina - 5º A
        </h3>
        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px;">
          ${o}
        </div>
      </div>
      <p style="margin-top: 16px; font-size: 13px; color: #6E6B7B;">
        <strong>Contexto:</strong> Cards de disciplinas com variação de desempenho. Coordenador analisando métricas.
      </p>
    `}},v={render:()=>{const o=[{conceito:"A",descricao:"Excelente",faixa:"9.0 - 10.0",nivel:"high"},{conceito:"B",descricao:"Bom",faixa:"7.0 - 8.9",nivel:"medium"},{conceito:"C",descricao:"Regular",faixa:"6.0 - 6.9",nivel:"medium"},{conceito:"D",descricao:"Insuficiente",faixa:"4.0 - 5.9",nivel:"low"},{conceito:"E",descricao:"Muito Insuficiente",faixa:"0.0 - 3.9",nivel:"low"}].map(e=>'<div style="display: flex; align-items: center; gap: 16px; padding: 12px; background: #F8F8F8; border-radius: 8px;"><div class="grade-badge perf-'+e.nivel+'">'+e.conceito+'</div><div style="flex: 1;"><div style="font-size: 16px; font-weight: 600; color: #5E5873; margin-bottom: 4px;">'+e.descricao+'</div><div style="font-size: 13px; color: #6E6B7B;">'+e.faixa+"</div></div></div>").join("");return`
      ${r}
      <div style="background: #fff; border: 1px solid #D8D6DE; border-radius: 8px; padding: 24px; max-width: 600px;">
        <h3 style="margin: 0 0 20px; font-size: 18px; font-weight: 600; color: #5E5873;">
          Legenda de Conceitos
        </h3>
        <div style="display: flex; flex-direction: column; gap: 16px;">
          ${o}
        </div>
      </div>
      <p style="margin-top: 16px; font-size: 13px; color: #6E6B7B;">
        <strong>Contexto:</strong> Legenda explicativa do sistema de conceitos. Documentação para responsáveis.
      </p>
    `}};var h,y,b;d.parameters={...d.parameters,docs:{...(h=d.parameters)==null?void 0:h.docs,source:{originalSource:`{
  render: () => \`
    \${css}
    <div style="display: flex; flex-direction: column; gap: 12px;">
      <div class="performance-cell perf-high">
        <div class="performance-bg" style="width: 92%"></div>
        <span class="performance-value">9.2/10</span>
      </div>
      
      <div class="performance-cell perf-medium">
        <div class="performance-bg" style="width: 70%"></div>
        <span class="performance-value">7.0/10</span>
      </div>
      
      <div class="performance-cell perf-low">
        <div class="performance-bg" style="width: 45%"></div>
        <span class="performance-value">4.5/10</span>
      </div>
      
      <div class="performance-cell perf-neutral">
        <div class="performance-bg" style="width: 0%"></div>
        <span class="performance-value">-</span>
      </div>
    </div>
  \`
}`,...(b=(y=d.parameters)==null?void 0:y.docs)==null?void 0:b.source}}};var E,B,w;c.parameters={...c.parameters,docs:{...(E=c.parameters)==null?void 0:E.docs,source:{originalSource:`{
  render: () => \`
    \${css}
    <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; max-width: 600px;">
      <div style="text-align: center;">
        <div style="margin-bottom: 8px; font-size: 12px; color: #6E6B7B; font-weight: 600;">Percentual</div>
        <div class="performance-cell perf-high">
          <div class="performance-bg" style="width: 87%"></div>
          <span class="performance-value">87%</span>
        </div>
      </div>
      
      <div style="text-align: center;">
        <div style="margin-bottom: 8px; font-size: 12px; color: #6E6B7B; font-weight: 600;">Nota</div>
        <div class="performance-cell perf-high">
          <div class="performance-bg" style="width: 87%"></div>
          <span class="performance-value">8.7/10</span>
        </div>
      </div>
      
      <div style="text-align: center;">
        <div style="margin-bottom: 8px; font-size: 12px; color: #6E6B7B; font-weight: 600;">Conceito</div>
        <div class="grade-badge perf-high">A</div>
      </div>
    </div>
  \`
}`,...(w=(B=c.parameters)==null?void 0:B.docs)==null?void 0:w.source}}};var z,D,F;p.parameters={...p.parameters,docs:{...(z=p.parameters)==null?void 0:z.docs,source:{originalSource:`{
  render: () => {
    const alunos = [{
      nome: 'Ana Silva',
      notas: [9.2, 8.5, 9.0]
    }, {
      nome: 'Bruno Costa',
      notas: [7.0, 7.5, 8.0]
    }, {
      nome: 'Carlos Mendes',
      notas: [5.5, 6.0, 6.5]
    }, {
      nome: 'Diana Santos',
      notas: [8.0, 8.5, 8.2]
    }, {
      nome: 'Eduardo Lima',
      notas: [4.5, 5.0, null]
    }];
    const rows = alunos.map(aluno => {
      const cells = aluno.notas.map(nota => {
        if (nota === null) return '<td style="padding: 12px; text-align: center;"><div class="performance-cell perf-neutral"><span class="performance-value">-</span></div></td>';
        const level = getLevel(nota * 10);
        const percent = nota * 10;
        return '<td style="padding: 12px; text-align: center;"><div class="performance-cell perf-' + level + '"><div class="performance-bg" style="width: ' + percent + '%"></div><span class="performance-value">' + nota.toFixed(1) + '/10</span></div></td>';
      }).join('');
      return '<tr style="border-bottom: 1px solid #F3F2F7;"><td style="padding: 12px; font-size: 14px; color: #5E5873; font-weight: 600;">' + aluno.nome + '</td>' + cells + '</tr>';
    }).join('');
    return \`
      \${css}
      <div style="background: #fff; border: 1px solid #D8D6DE; border-radius: 8px; padding: 20px; max-width: 900px;">
        <h3 style="margin: 0 0 16px; font-size: 18px; font-weight: 600; color: #5E5873;">
          Desempenho da Turma - Matemática 5º A
        </h3>
        <table style="width: 100%; border-collapse: collapse;">
          <thead>
            <tr style="border-bottom: 2px solid #E8E8E8;">
              <th style="padding: 12px; text-align: left; font-size: 13px; font-weight: 600; color: #6E6B7B;">Aluno</th>
              <th style="padding: 12px; text-align: center; font-size: 13px; font-weight: 600; color: #6E6B7B;">Missão 1</th>
              <th style="padding: 12px; text-align: center; font-size: 13px; font-weight: 600; color: #6E6B7B;">Missão 2</th>
              <th style="padding: 12px; text-align: center; font-size: 13px; font-weight: 600; color: #6E6B7B;">Missão 3</th>
            </tr>
          </thead>
          <tbody>
            \${rows}
          </tbody>
        </table>
      </div>
      <p style="margin-top: 16px; font-size: 13px; color: #6E6B7B;">
        <strong>Contexto:</strong> Tabela de desempenho de alunos em missões. Professor analisando performance da turma.
      </p>
    \`;
  }
}`,...(F=(D=p.parameters)==null?void 0:D.docs)==null?void 0:F.source}}};var C,A,k;m.parameters={...m.parameters,docs:{...(C=m.parameters)==null?void 0:C.docs,source:{originalSource:`{
  render: () => {
    const alunos = [{
      pos: 1,
      nome: 'Ana Silva',
      nota: 9.2,
      medal: '🥇'
    }, {
      pos: 2,
      nome: 'Diana Santos',
      nota: 8.5,
      medal: '🥈'
    }, {
      pos: 3,
      nome: 'Bruno Costa',
      nota: 7.5,
      medal: '🥉'
    }, {
      pos: 4,
      nome: 'Carlos Mendes',
      nota: 6.0,
      medal: ''
    }, {
      pos: 5,
      nome: 'Eduardo Lima',
      nota: 4.8,
      medal: ''
    }];
    const items = alunos.map(aluno => {
      const level = getLevel(aluno.nota * 10);
      const percent = aluno.nota * 10;
      const position = aluno.medal || aluno.pos + 'º';
      return '<div style="display: flex; align-items: center; gap: 12px; padding: 12px; background: #F8F8F8; border-radius: 8px;"><span style="font-size: 24px; min-width: 30px;">' + position + '</span><span style="flex: 1; font-size: 14px; font-weight: 600; color: #5E5873;">' + aluno.nome + '</span><div class="performance-cell perf-' + level + '"><div class="performance-bg" style="width: ' + percent + '%"></div><span class="performance-value">' + aluno.nota.toFixed(1) + '/10</span></div></div>';
    }).join('');
    return \`
      \${css}
      <div style="background: #fff; border: 1px solid #D8D6DE; border-radius: 8px; padding: 20px; max-width: 500px;">
        <h3 style="margin: 0 0 16px; font-size: 18px; font-weight: 600; color: #5E5873;">
          🏆 Ranking Geral - Matemática 5º A
        </h3>
        <div style="display: flex; flex-direction: column; gap: 12px;">
          \${items}
        </div>
      </div>
      <p style="margin-top: 16px; font-size: 13px; color: #6E6B7B;">
        <strong>Contexto:</strong> Ranking de alunos com medalhas. Aluno visualizando posição na turma.
      </p>
    \`;
  }
}`,...(k=(A=m.parameters)==null?void 0:A.docs)==null?void 0:k.source}}};var M,$,j;x.parameters={...x.parameters,docs:{...(M=x.parameters)==null?void 0:M.docs,source:{originalSource:`{
  render: () => {
    const disciplinas = [{
      disciplina: 'Matemática',
      notas: [9.2, 8.5, 9.0, 8.8],
      conceito: 'A'
    }, {
      disciplina: 'Português',
      notas: [8.0, 8.5, 7.5, 8.0],
      conceito: 'B'
    }, {
      disciplina: 'Ciências',
      notas: [7.0, 7.5, 8.0, 7.8],
      conceito: 'B'
    }, {
      disciplina: 'História',
      notas: [8.5, 9.0, 8.8, 9.2],
      conceito: 'A'
    }];
    const rows = disciplinas.map(disc => {
      const cells = disc.notas.map(nota => {
        const level = getLevel(nota * 10);
        const percent = nota * 10;
        return '<td style="padding: 12px; text-align: center;"><div class="performance-cell performance-compact perf-' + level + '"><div class="performance-bg" style="width: ' + percent + '%"></div><span class="performance-value">' + nota.toFixed(1) + '</span></div></td>';
      }).join('');
      const conceitoLevel = disc.conceito === 'A' ? 'high' : 'medium';
      return '<tr style="border-bottom: 1px solid #F3F2F7;"><td style="padding: 12px; font-size: 14px; color: #5E5873; font-weight: 600;">' + disc.disciplina + '</td>' + cells + '<td style="padding: 12px; text-align: center;"><div class="grade-badge perf-' + conceitoLevel + '">' + disc.conceito + '</div></td></tr>';
    }).join('');
    return \`
      \${css}
      <div style="background: #fff; border: 1px solid #D8D6DE; border-radius: 8px; padding: 24px; max-width: 800px;">
        <h3 style="margin: 0 0 20px; font-size: 20px; font-weight: 600; color: #5E5873;">
          Boletim Escolar 2024 - Ana Silva
        </h3>
        <table style="width: 100%; border-collapse: collapse;">
          <thead>
            <tr style="border-bottom: 2px solid #E8E8E8;">
              <th style="padding: 12px; text-align: left; font-size: 13px; font-weight: 600; color: #6E6B7B;">Disciplina</th>
              <th style="padding: 12px; text-align: center; font-size: 13px; font-weight: 600; color: #6E6B7B;">1º Bim</th>
              <th style="padding: 12px; text-align: center; font-size: 13px; font-weight: 600; color: #6E6B7B;">2º Bim</th>
              <th style="padding: 12px; text-align: center; font-size: 13px; font-weight: 600; color: #6E6B7B;">3º Bim</th>
              <th style="padding: 12px; text-align: center; font-size: 13px; font-weight: 600; color: #6E6B7B;">4º Bim</th>
              <th style="padding: 12px; text-align: center; font-size: 13px; font-weight: 600; color: #6E6B7B;">Conceito</th>
            </tr>
          </thead>
          <tbody>
            \${rows}
          </tbody>
        </table>
      </div>
      <p style="margin-top: 16px; font-size: 13px; color: #6E6B7B;">
        <strong>Contexto:</strong> Boletim completo com notas bimestrais. Responsável visualizando desempenho.
      </p>
    \`;
  }
}`,...(j=($=x.parameters)==null?void 0:$.docs)==null?void 0:j.source}}};var P,S,L;g.parameters={...g.parameters,docs:{...(P=g.parameters)==null?void 0:P.docs,source:{originalSource:`{
  render: () => {
    const meses = [{
      mes: 'Jan',
      nota: 6.0
    }, {
      mes: 'Fev',
      nota: 6.5
    }, {
      mes: 'Mar',
      nota: 7.0
    }, {
      mes: 'Abr',
      nota: 7.2
    }, {
      mes: 'Mai',
      nota: 7.8
    }, {
      mes: 'Jun',
      nota: 8.5
    }];
    const items = meses.map((item, idx) => {
      const level = getLevel(item.nota * 10);
      const percent = item.nota * 10;
      const prevNota = idx > 0 ? meses[idx - 1].nota : item.nota;
      const trend = item.nota > prevNota ? '↗️' : item.nota < prevNota ? '↘️' : '→';
      return '<div style="flex: 1; display: flex; flex-direction: column; align-items: center; gap: 8px;"><div style="font-size: 12px; color: #6E6B7B;">' + trend + '</div><div class="performance-cell perf-' + level + '" style="writing-mode: vertical-rl; transform: rotate(180deg); height: ' + percent * 1.5 + 'px; min-width: 60px;"><span class="performance-value" style="writing-mode: horizontal-tb; transform: rotate(180deg);">' + item.nota.toFixed(1) + '</span></div><div style="font-size: 13px; font-weight: 600; color: #5E5873;">' + item.mes + '</div></div>';
    }).join('');
    return \`
      \${css}
      <div style="background: #fff; border: 1px solid #D8D6DE; border-radius: 8px; padding: 20px; max-width: 700px;">
        <h3 style="margin: 0 0 16px; font-size: 18px; font-weight: 600; color: #5E5873;">
          Evolução Mensal - Bruno Costa
        </h3>
        <div style="display: flex; gap: 10px; align-items: flex-end;">
          \${items}
        </div>
      </div>
      <p style="margin-top: 16px; font-size: 13px; color: #6E6B7B;">
        <strong>Contexto:</strong> Gráfico de evolução com indicadores de tendência. Aluno acompanhando progresso.
      </p>
    \`;
  }
}`,...(L=(S=g.parameters)==null?void 0:S.docs)==null?void 0:L.source}}};var R,T,G;f.parameters={...f.parameters,docs:{...(R=f.parameters)==null?void 0:R.docs,source:{originalSource:`{
  render: () => {
    const disciplinas = [{
      disciplina: 'Matemática',
      nota: 8.5,
      variacao: '+0.8'
    }, {
      disciplina: 'Português',
      nota: 7.2,
      variacao: '-0.3'
    }, {
      disciplina: 'Ciências',
      nota: 9.0,
      variacao: '+1.2'
    }, {
      disciplina: 'História',
      nota: 6.5,
      variacao: '+0.2'
    }, {
      disciplina: 'Geografia',
      nota: 7.8,
      variacao: '-0.5'
    }, {
      disciplina: 'Inglês',
      nota: 8.2,
      variacao: '+0.6'
    }];
    const cards = disciplinas.map(disc => {
      const level = getLevel(disc.nota * 10);
      const percent = disc.nota * 10;
      const variacaoPositiva = disc.variacao.startsWith('+');
      const cor = variacaoPositiva ? '#28C76F' : '#EA5455';
      return '<div style="padding: 16px; border: 1px solid #E8E8E8; border-radius: 8px;"><div style="margin-bottom: 12px; font-size: 14px; font-weight: 600; color: #5E5873;">' + disc.disciplina + '</div><div style="display: flex; align-items: center; gap: 12px;"><div class="performance-cell perf-' + level + '"><div class="performance-bg" style="width: ' + percent + '%"></div><span class="performance-value">' + disc.nota.toFixed(1) + '</span></div><div style="font-size: 14px; font-weight: 700; color: ' + cor + ';">' + disc.variacao + '</div></div></div>';
    }).join('');
    return \`
      \${css}
      <div style="background: #fff; border: 1px solid #D8D6DE; border-radius: 8px; padding: 20px; max-width: 900px;">
        <h3 style="margin: 0 0 16px; font-size: 18px; font-weight: 600; color: #5E5873;">
          Performance por Disciplina - 5º A
        </h3>
        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px;">
          \${cards}
        </div>
      </div>
      <p style="margin-top: 16px; font-size: 13px; color: #6E6B7B;">
        <strong>Contexto:</strong> Cards de disciplinas com variação de desempenho. Coordenador analisando métricas.
      </p>
    \`;
  }
}`,...(G=(T=f.parameters)==null?void 0:T.docs)==null?void 0:G.source}}};var I,N,H;v.parameters={...v.parameters,docs:{...(I=v.parameters)==null?void 0:I.docs,source:{originalSource:`{
  render: () => {
    const conceitos = [{
      conceito: 'A',
      descricao: 'Excelente',
      faixa: '9.0 - 10.0',
      nivel: 'high'
    }, {
      conceito: 'B',
      descricao: 'Bom',
      faixa: '7.0 - 8.9',
      nivel: 'medium'
    }, {
      conceito: 'C',
      descricao: 'Regular',
      faixa: '6.0 - 6.9',
      nivel: 'medium'
    }, {
      conceito: 'D',
      descricao: 'Insuficiente',
      faixa: '4.0 - 5.9',
      nivel: 'low'
    }, {
      conceito: 'E',
      descricao: 'Muito Insuficiente',
      faixa: '0.0 - 3.9',
      nivel: 'low'
    }];
    const items = conceitos.map(item => {
      return '<div style="display: flex; align-items: center; gap: 16px; padding: 12px; background: #F8F8F8; border-radius: 8px;"><div class="grade-badge perf-' + item.nivel + '">' + item.conceito + '</div><div style="flex: 1;"><div style="font-size: 16px; font-weight: 600; color: #5E5873; margin-bottom: 4px;">' + item.descricao + '</div><div style="font-size: 13px; color: #6E6B7B;">' + item.faixa + '</div></div></div>';
    }).join('');
    return \`
      \${css}
      <div style="background: #fff; border: 1px solid #D8D6DE; border-radius: 8px; padding: 24px; max-width: 600px;">
        <h3 style="margin: 0 0 20px; font-size: 18px; font-weight: 600; color: #5E5873;">
          Legenda de Conceitos
        </h3>
        <div style="display: flex; flex-direction: column; gap: 16px;">
          \${items}
        </div>
      </div>
      <p style="margin-top: 16px; font-size: 13px; color: #6E6B7B;">
        <strong>Contexto:</strong> Legenda explicativa do sistema de conceitos. Documentação para responsáveis.
      </p>
    \`;
  }
}`,...(H=(N=v.parameters)==null?void 0:N.docs)==null?void 0:H.source}}};const V=["Default","AllFormats","TabelaAlunos","RankingTurma","BoletimCompleto","EvolucaoMensal","ComVariacao","Conceitos"];export{c as AllFormats,x as BoletimCompleto,f as ComVariacao,v as Conceitos,d as Default,g as EvolucaoMensal,m as RankingTurma,p as TabelaAlunos,V as __namedExportsOrder,J as default};
