const ss={title:"Educacross Components V2/Feedback/StudentsDetail",tags:["autodocs"],parameters:{docs:{description:{component:`
# StudentsDetail

Painel de **detalhes do aluno** com avatar gradiente, estatísticas de desempenho, conquistas e progresso. Componente central para visualização de perfil individual.

## Quando usar

- ✅ Visualização de perfil completo do aluno
- ✅ Dashboard de desempenho individual
- ✅ Acompanhamento de progresso em missões
- ✅ Visualização de conquistas e XP
- ✅ Lista compacta de alunos da turma
- ✅ Modal de detalhes expandido

## Variantes

- **Default**: Card completo com avatar, info, 3 stats
- **ComDesempenho**: + Performance bars por disciplina (4 disciplinas)
- **ComConquistas**: + Badges de conquistas + XP progress bar
- **ListaCompacta**: 5 alunos em cards compactos (avatar 48px)
- **ComProgresso**: Missões em andamento com progress bars
- **ComContato**: Dados de contato + responsável
- **ComHistorico**: Timeline de atividades recentes
- **CardSimples**: Card centralizado para grid (300px)

## Características visuais

- **Avatar grande**: 80×80px gradient circular com iniciais (48px compact)
- **Badge status**: Ativo (green #28C76F) ou outro status
- **Stats grid**: 3-4 métricas com valores grandes (28px) + labels (12px)
- **Performance bars**: 6px altura, colors por disciplina
- **XP progress**: 8px altura, gradient roxo→verde
        `}}}},a=`<style>
.student-detail {
  background: #fff;
  border: 1px solid #D8D6DE;
  border-radius: 8px;
  padding: 20px;
}

.student-header {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 20px;
  padding-bottom: 20px;
  border-bottom: 1px solid #E8E8E8;
}

.student-avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: linear-gradient(135deg, #6E63E8, #28C76F);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 32px;
  font-weight: 700;
  flex-shrink: 0;
}

.student-info h3 {
  margin: 0 0 6px;
  font-size: 20px;
  font-weight: 700;
  color: #5E5873;
}

.student-info p {
  margin: 0;
  font-size: 14px;
  color: #6E6B7B;
}

.student-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 16px;
  margin-bottom: 20px;
}

.stat-box {
  text-align: center;
  padding: 16px;
  background: #F8F8F8;
  border-radius: 8px;
}

.stat-value {
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 6px;
}

.stat-label {
  font-size: 12px;
  color: #6E6B7B;
}

.student-badges {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 16px;
}

.badge-item {
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 13px;
  font-weight: 600;
}

.student-compact {
  padding: 12px;
  border-radius: 6px;
}

.student-compact .student-avatar {
  width: 48px;
  height: 48px;
  font-size: 18px;
}

.student-compact .student-info h3 {
  font-size: 16px;
}

.section-title {
  margin: 0 0 12px;
  font-size: 14px;
  font-weight: 600;
  color: #5E5873;
}

.progress-bar-container {
  background: #E8E8E8;
  height: 6px;
  border-radius: 3px;
  overflow: hidden;
}

.progress-bar {
  height: 100%;
  transition: width 0.3s ease;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
  background: #F8F8F8;
  border-radius: 6px;
}

.timeline-item {
  display: flex;
  align-items: start;
  gap: 12px;
  padding: 12px;
  background: #F8F8F8;
  border-radius: 6px;
  margin-bottom: 8px;
}

.timeline-item:last-child {
  margin-bottom: 0;
}
</style>`,t={render:()=>`
    ${a}
    <div class="student-detail">
      <div class="student-header">
        <div class="student-avatar">JS</div>
        <div class="student-info" style="flex: 1">
          <h3>João Silva</h3>
          <p>5º Ano A • Matrícula 2024001</p>
          <p style="margin-top: 4px">
            <i class="bi bi-envelope" style="margin-right: 6px"></i>joao.silva@educacross.com
          </p>
        </div>
        <span style="padding: 6px 12px; background: #E8F5E9; color: #28C76F; border-radius: 12px; font-size: 13px; font-weight: 600">
          <i class="bi bi-check-circle-fill"></i> Ativo
        </span>
      </div>
      
      <div class="student-stats">
        <div class="stat-box">
          <div class="stat-value" style="color: #6E63E8">45</div>
          <div class="stat-label">Missões Concluídas</div>
        </div>
        <div class="stat-box">
          <div class="stat-value" style="color: #28C76F">8.5</div>
          <div class="stat-label">Média Geral</div>
        </div>
        <div class="stat-box">
          <div class="stat-value" style="color: #FF9F43">87%</div>
          <div class="stat-label">Taxa de Acerto</div>
        </div>
      </div>
    </div>
  `},i={render:()=>`
    ${a}
    <div class="student-detail" style="max-width: 600px">
      <div class="student-header">
        <div class="student-avatar" style="background: linear-gradient(135deg, #FF9F43, #EA5455)">AS</div>
        <div class="student-info" style="flex: 1">
          <h3>Ana Silva</h3>
          <p>5º Ano A • Matrícula 2024002</p>
        </div>
      </div>
      
      <div class="student-stats">
        <div class="stat-box">
          <div class="stat-value" style="color: #6E63E8">52</div>
          <div class="stat-label">Missões</div>
        </div>
        <div class="stat-box">
          <div class="stat-value" style="color: #28C76F">9.2</div>
          <div class="stat-label">Média</div>
        </div>
        <div class="stat-box">
          <div class="stat-value" style="color: #28C76F">92%</div>
          <div class="stat-label">Acerto</div>
        </div>
        <div class="stat-box">
          <div class="stat-value" style="color: #00CFE8">3.2h</div>
          <div class="stat-label">Tempo</div>
        </div>
      </div>
      
      <h4 class="section-title">Desempenho por Disciplina</h4>
      <div style="display: flex; flex-direction: column; gap: 12px">
        ${[{d:"Matemática",v:95,c:"#28C76F"},{d:"Português",v:88,c:"#6E63E8"},{d:"Ciências",v:92,c:"#00CFE8"},{d:"História",v:85,c:"#FF9F43"}].map(s=>`
          <div>
            <div style="display: flex; justify-content: space-between; margin-bottom: 6px">
              <span style="font-size: 13px; color: #5E5873; font-weight: 600">${s.d}</span>
              <span style="font-size: 13px; color: ${s.c}; font-weight: 700">${s.v}%</span>
            </div>
            <div class="progress-bar-container">
              <div class="progress-bar" style="width: ${s.v}%; background: ${s.c}"></div>
            </div>
          </div>
        `).join("")}
      </div>
    </div>
  `},n={render:()=>`
    ${a}
    <div class="student-detail" style="max-width: 500px">
      <div class="student-header">
        <div class="student-avatar" style="background: linear-gradient(135deg, #00CFE8, #6E63E8)">BC</div>
        <div class="student-info" style="flex: 1">
          <h3>Bruno Costa</h3>
          <p>5º Ano B • Matrícula 2024015</p>
        </div>
      </div>
      
      <h4 class="section-title">Conquistas Recentes</h4>
      <div class="student-badges">
        ${[{t:"🏆 Mestre das Frações",c:"#FFD700",b:"#FFF8E1"},{t:"📚 Leitor Expert",c:"#6E63E8",b:"#E8E5F7"},{t:"🔬 Cientista",c:"#00CFE8",b:"#E0F7FA"},{t:"⭐ Destaque do Mês",c:"#FF9F43",b:"#FFF8E1"}].map(s=>`
          <span class="badge-item" style="background: ${s.b}; color: ${s.c}">${s.t}</span>
        `).join("")}
      </div>
      
      <div style="margin-top: 20px; padding: 16px; background: #F8F8F8; border-radius: 8px; text-align: center">
        <div style="font-size: 48px; font-weight: 700; color: #6E63E8; margin-bottom: 6px">1.250</div>
        <div style="font-size: 13px; color: #6E6B7B">Pontos de Experiência (XP)</div>
        
        <div style="margin-top: 12px; background: #E8E8E8; height: 8px; border-radius: 4px; overflow: hidden">
          <div style="width: 65%; height: 100%; background: linear-gradient(90deg, #6E63E8, #28C76F)"></div>
        </div>
        <div style="margin-top: 6px; font-size: 12px; color: #6E6B7B">Faltam 750 XP para o próximo nível</div>
      </div>
    </div>
  `},o={render:()=>`
    ${a}
    <div style="display: flex; flex-direction: column; gap: 12px; max-width: 500px">
      ${["João Silva","Ana Costa","Bruno Oliveira","Diana Santos","Eduardo Lima"].map((s,e)=>{const p=[8.5,9.2,7.8,9.5,6.9][e],v=p>=9?"#28C76F":p>=8?"#6E63E8":p>=7?"#FF9F43":"#EA5455";return`
          <div class="student-detail student-compact">
            <div style="display: flex; align-items: center; gap: 12px">
              <div class="student-avatar" style="background: linear-gradient(135deg, ${v}, #6E63E8)">
                ${s.split(" ").map(Z=>Z[0]).join("")}
              </div>
              <div class="student-info" style="flex: 1">
                <h3>${s}</h3>
                <p style="font-size: 13px">5º Ano ${["A","A","B","A","B"][e]}</p>
              </div>
              <div style="text-align: right">
                <div style="font-size: 20px; font-weight: 700; color: ${v}">${p}</div>
                <div style="font-size: 11px; color: #6E6B7B">Média</div>
              </div>
            </div>
          </div>
        `}).join("")}
    </div>
    <p style="margin-top: 12px; font-size: 13px; color: #6E6B7B">
      <strong>Contexto:</strong> Lista compacta de alunos com média.
    </p>
  `},d={render:()=>`
    ${a}
    <div class="student-detail" style="max-width: 600px">
      <div class="student-header">
        <div class="student-avatar">DS</div>
        <div class="student-info" style="flex: 1">
          <h3>Diana Santos</h3>
          <p>5º Ano A • Matrícula 2024018</p>
        </div>
        <span style="padding: 6px 12px; background: #E0F7FA; color: #00CFE8; border-radius: 12px; font-size: 13px; font-weight: 600">
          <i class="bi bi-graph-up-arrow"></i> Em Progresso
        </span>
      </div>
      
      <h4 class="section-title">Missões em Andamento</h4>
      <div style="display: flex; flex-direction: column; gap: 12px">
        ${[{m:"Frações Básicas",p:75},{m:"Verbos e Conjugações",p:40},{m:"Ciclo da Água",p:90}].map(s=>{const e=s.p>=80?"#28C76F":s.p>=50?"#FF9F43":"#6E63E8";return`
            <div style="padding: 12px; background: #F8F8F8; border-radius: 8px">
              <div style="display: flex; justify-content: space-between; margin-bottom: 8px">
                <span style="font-size: 14px; font-weight: 600; color: #5E5873">${s.m}</span>
                <span style="font-size: 13px; color: ${e}; font-weight: 700">${s.p}%</span>
              </div>
              <div class="progress-bar-container">
                <div class="progress-bar" style="width: ${s.p}%; background: ${e}"></div>
              </div>
            </div>
          `}).join("")}
      </div>
    </div>
  `},r={render:()=>`
    ${a}
    <div class="student-detail" style="max-width: 500px">
      <div class="student-header">
        <div class="student-avatar" style="background: linear-gradient(135deg, #9C27B0, #E91E63)">EL</div>
        <div class="student-info" style="flex: 1">
          <h3>Eduardo Lima</h3>
          <p>5º Ano B • Matrícula 2024022</p>
        </div>
      </div>
      
      <h4 class="section-title">Dados de Contato</h4>
      <div style="display: flex; flex-direction: column; gap: 10px">
        <div class="contact-item">
          <i class="bi bi-envelope" style="font-size: 18px; color: #6E63E8"></i>
          <span style="font-size: 14px; color: #5E5873">eduardo.lima@email.com</span>
        </div>
        <div class="contact-item">
          <i class="bi bi-phone" style="font-size: 18px; color: #28C76F"></i>
          <span style="font-size: 14px; color: #5E5873">(11) 91234-5678</span>
        </div>
      </div>
      
      <h4 style="margin: 16px 0 12px; font-size: 14px; font-weight: 600; color: #5E5873">Responsável</h4>
      <div style="padding: 12px; background: #F8F8F8; border-radius: 8px">
        <div style="font-weight: 600; color: #5E5873; margin-bottom: 6px">Carlos Lima (Pai)</div>
        <div style="display: flex; flex-direction: column; gap: 6px; font-size: 13px; color: #6E6B7B">
          <div><i class="bi bi-envelope" style="margin-right: 6px"></i>carlos.lima@email.com</div>
          <div><i class="bi bi-phone" style="margin-right: 6px"></i>(11) 99876-5432</div>
        </div>
      </div>
    </div>
  `},l={render:()=>`
    ${a}
    <div class="student-detail" style="max-width: 650px">
      <div class="student-header">
        <div class="student-avatar" style="background: linear-gradient(135deg, #28C76F, #00CFE8)">FC</div>
        <div class="student-info" style="flex: 1">
          <h3>Fernanda Costa</h3>
          <p>5º Ano A • Matrícula 2024025</p>
        </div>
      </div>
      
      <h4 class="section-title">Histórico de Atividades</h4>
      <div style="display: flex; flex-direction: column; gap: 8px">
        ${[{d:"05/02/2026",a:'Completou missão "Frações Básicas"',i:"bi-trophy",c:"#28C76F"},{d:"03/02/2026",a:'Desbloqueou conquista "Matemático"',i:"bi-award",c:"#FFD700"},{d:"01/02/2026",a:'Iniciou missão "Verbos e Conjugações"',i:"bi-play-circle",c:"#6E63E8"},{d:"30/01/2026",a:"Entregou trabalho de Ciências",i:"bi-file-earmark-check",c:"#00CFE8"}].map(s=>`
          <div class="timeline-item">
            <i class="bi ${s.i}" style="font-size: 20px; color: ${s.c}; margin-top: 2px"></i>
            <div style="flex: 1">
              <div style="font-size: 14px; color: #5E5873; font-weight: 600">${s.a}</div>
              <div style="font-size: 12px; color: #6E6B7B; margin-top: 2px">${s.d}</div>
            </div>
          </div>
        `).join("")}
      </div>
    </div>
  `},c={render:()=>`
    ${a}
    <div class="student-detail" style="max-width: 300px">
      <div style="text-align: center">
        <div class="student-avatar" style="margin: 0 auto 16px">GS</div>
        <h3 style="margin: 0 0 6px; font-size: 18px; color: #5E5873">Gabriela Santos</h3>
        <p style="margin: 0 0 16px; font-size: 13px; color: #6E6B7B">5º Ano B</p>
        
        <div class="student-stats" style="grid-template-columns: 1fr 1fr">
          <div class="stat-box">
            <div class="stat-value" style="color: #6E63E8; font-size: 24px">38</div>
            <div class="stat-label">Missões</div>
          </div>
          <div class="stat-box">
            <div class="stat-value" style="color: #28C76F; font-size: 24px">8.8</div>
            <div class="stat-label">Média</div>
          </div>
        </div>
      </div>
    </div>
    <p style="margin-top: 12px; font-size: 13px; color: #6E6B7B">
      <strong>Contexto:</strong> Card simplificado para grid de alunos.
    </p>
  `};var x,m,u,g,E;t.parameters={...t.parameters,docs:{...(x=t.parameters)==null?void 0:x.docs,source:{originalSource:`{
  render: () => \`
    \${styles}
    <div class="student-detail">
      <div class="student-header">
        <div class="student-avatar">JS</div>
        <div class="student-info" style="flex: 1">
          <h3>João Silva</h3>
          <p>5º Ano A • Matrícula 2024001</p>
          <p style="margin-top: 4px">
            <i class="bi bi-envelope" style="margin-right: 6px"></i>joao.silva@educacross.com
          </p>
        </div>
        <span style="padding: 6px 12px; background: #E8F5E9; color: #28C76F; border-radius: 12px; font-size: 13px; font-weight: 600">
          <i class="bi bi-check-circle-fill"></i> Ativo
        </span>
      </div>
      
      <div class="student-stats">
        <div class="stat-box">
          <div class="stat-value" style="color: #6E63E8">45</div>
          <div class="stat-label">Missões Concluídas</div>
        </div>
        <div class="stat-box">
          <div class="stat-value" style="color: #28C76F">8.5</div>
          <div class="stat-label">Média Geral</div>
        </div>
        <div class="stat-box">
          <div class="stat-value" style="color: #FF9F43">87%</div>
          <div class="stat-label">Taxa de Acerto</div>
        </div>
      </div>
    </div>
  \`
}`,...(u=(m=t.parameters)==null?void 0:m.docs)==null?void 0:u.source},description:{story:`Story: Default

Card padrão com avatar JS (João Silva), informações básicas, status "Ativo" e 3 estatísticas.

Educational context: Professor visualizando resumo de desempenho de aluno.`,...(E=(g=t.parameters)==null?void 0:g.docs)==null?void 0:E.description}}};var y,b,f,h,F;i.parameters={...i.parameters,docs:{...(y=i.parameters)==null?void 0:y.docs,source:{originalSource:`{
  render: () => \`
    \${styles}
    <div class="student-detail" style="max-width: 600px">
      <div class="student-header">
        <div class="student-avatar" style="background: linear-gradient(135deg, #FF9F43, #EA5455)">AS</div>
        <div class="student-info" style="flex: 1">
          <h3>Ana Silva</h3>
          <p>5º Ano A • Matrícula 2024002</p>
        </div>
      </div>
      
      <div class="student-stats">
        <div class="stat-box">
          <div class="stat-value" style="color: #6E63E8">52</div>
          <div class="stat-label">Missões</div>
        </div>
        <div class="stat-box">
          <div class="stat-value" style="color: #28C76F">9.2</div>
          <div class="stat-label">Média</div>
        </div>
        <div class="stat-box">
          <div class="stat-value" style="color: #28C76F">92%</div>
          <div class="stat-label">Acerto</div>
        </div>
        <div class="stat-box">
          <div class="stat-value" style="color: #00CFE8">3.2h</div>
          <div class="stat-label">Tempo</div>
        </div>
      </div>
      
      <h4 class="section-title">Desempenho por Disciplina</h4>
      <div style="display: flex; flex-direction: column; gap: 12px">
        \${[{
    d: 'Matemática',
    v: 95,
    c: '#28C76F'
  }, {
    d: 'Português',
    v: 88,
    c: '#6E63E8'
  }, {
    d: 'Ciências',
    v: 92,
    c: '#00CFE8'
  }, {
    d: 'História',
    v: 85,
    c: '#FF9F43'
  }].map(s => \`
          <div>
            <div style="display: flex; justify-content: space-between; margin-bottom: 6px">
              <span style="font-size: 13px; color: #5E5873; font-weight: 600">\${s.d}</span>
              <span style="font-size: 13px; color: \${s.c}; font-weight: 700">\${s.v}%</span>
            </div>
            <div class="progress-bar-container">
              <div class="progress-bar" style="width: \${s.v}%; background: \${s.c}"></div>
            </div>
          </div>
        \`).join('')}
      </div>
    </div>
  \`
}`,...(f=(b=i.parameters)==null?void 0:b.docs)==null?void 0:f.source},description:{story:`Story: ComDesempenho

Card com avatar AS (Ana Silva, gradient laranja→vermelho) + 4 stats + barras de desempenho por disciplina.
Matemática 95% (verde), Português 88% (roxo), Ciências 92% (cyan), História 85% (laranja).

Educational context: Coordenador analisando desempenho detalhado por matéria.`,...(F=(h=i.parameters)==null?void 0:h.docs)==null?void 0:F.description}}};var C,A,B,$,z;n.parameters={...n.parameters,docs:{...(C=n.parameters)==null?void 0:C.docs,source:{originalSource:`{
  render: () => \`
    \${styles}
    <div class="student-detail" style="max-width: 500px">
      <div class="student-header">
        <div class="student-avatar" style="background: linear-gradient(135deg, #00CFE8, #6E63E8)">BC</div>
        <div class="student-info" style="flex: 1">
          <h3>Bruno Costa</h3>
          <p>5º Ano B • Matrícula 2024015</p>
        </div>
      </div>
      
      <h4 class="section-title">Conquistas Recentes</h4>
      <div class="student-badges">
        \${[{
    t: '🏆 Mestre das Frações',
    c: '#FFD700',
    b: '#FFF8E1'
  }, {
    t: '📚 Leitor Expert',
    c: '#6E63E8',
    b: '#E8E5F7'
  }, {
    t: '🔬 Cientista',
    c: '#00CFE8',
    b: '#E0F7FA'
  }, {
    t: '⭐ Destaque do Mês',
    c: '#FF9F43',
    b: '#FFF8E1'
  }].map(b => \`
          <span class="badge-item" style="background: \${b.b}; color: \${b.c}">\${b.t}</span>
        \`).join('')}
      </div>
      
      <div style="margin-top: 20px; padding: 16px; background: #F8F8F8; border-radius: 8px; text-align: center">
        <div style="font-size: 48px; font-weight: 700; color: #6E63E8; margin-bottom: 6px">1.250</div>
        <div style="font-size: 13px; color: #6E6B7B">Pontos de Experiência (XP)</div>
        
        <div style="margin-top: 12px; background: #E8E8E8; height: 8px; border-radius: 4px; overflow: hidden">
          <div style="width: 65%; height: 100%; background: linear-gradient(90deg, #6E63E8, #28C76F)"></div>
        </div>
        <div style="margin-top: 6px; font-size: 12px; color: #6E6B7B">Faltam 750 XP para o próximo nível</div>
      </div>
    </div>
  \`
}`,...(B=(A=n.parameters)==null?void 0:A.docs)==null?void 0:B.source},description:{story:`Story: ComConquistas

Card BC (Bruno Costa, gradient cyan→roxo) com 4 badges de conquistas (emojis + cores) + XP progress bar.
1.250 XP, faltam 750 XP para próximo nível (65% progress, gradient roxo→verde).

Educational context: Sistema de gamificação exibindo conquistas e progresso de XP do aluno.`,...(z=($=n.parameters)==null?void 0:$.docs)==null?void 0:z.description}}};var w,D,S,k,M;o.parameters={...o.parameters,docs:{...(w=o.parameters)==null?void 0:w.docs,source:{originalSource:`{
  render: () => \`
    \${styles}
    <div style="display: flex; flex-direction: column; gap: 12px; max-width: 500px">
      \${['João Silva', 'Ana Costa', 'Bruno Oliveira', 'Diana Santos', 'Eduardo Lima'].map((name, i) => {
    const avg = [8.5, 9.2, 7.8, 9.5, 6.9][i];
    const color = avg >= 9 ? '#28C76F' : avg >= 8 ? '#6E63E8' : avg >= 7 ? '#FF9F43' : '#EA5455';
    return \`
          <div class="student-detail student-compact">
            <div style="display: flex; align-items: center; gap: 12px">
              <div class="student-avatar" style="background: linear-gradient(135deg, \${color}, #6E63E8)">
                \${name.split(' ').map(n => n[0]).join('')}
              </div>
              <div class="student-info" style="flex: 1">
                <h3>\${name}</h3>
                <p style="font-size: 13px">5º Ano \${['A', 'A', 'B', 'A', 'B'][i]}</p>
              </div>
              <div style="text-align: right">
                <div style="font-size: 20px; font-weight: 700; color: \${color}">\${avg}</div>
                <div style="font-size: 11px; color: #6E6B7B">Média</div>
              </div>
            </div>
          </div>
        \`;
  }).join('')}
    </div>
    <p style="margin-top: 12px; font-size: 13px; color: #6E6B7B">
      <strong>Contexto:</strong> Lista compacta de alunos com média.
    </p>
  \`
}`,...(S=(D=o.parameters)==null?void 0:D.docs)==null?void 0:S.source},description:{story:`Story: ListaCompacta

Lista vertical com 5 alunos em cards compactos (avatar 48px, padding 12px).
Cada aluno com nome, turma e média grande (20px) à direita. Cores por nível de média.

Educational context: Lista rápida de alunos da turma para visualização do professor.`,...(M=(k=o.parameters)==null?void 0:k.docs)==null?void 0:M.description}}};var P,j,L,q,X;d.parameters={...d.parameters,docs:{...(P=d.parameters)==null?void 0:P.docs,source:{originalSource:`{
  render: () => \`
    \${styles}
    <div class="student-detail" style="max-width: 600px">
      <div class="student-header">
        <div class="student-avatar">DS</div>
        <div class="student-info" style="flex: 1">
          <h3>Diana Santos</h3>
          <p>5º Ano A • Matrícula 2024018</p>
        </div>
        <span style="padding: 6px 12px; background: #E0F7FA; color: #00CFE8; border-radius: 12px; font-size: 13px; font-weight: 600">
          <i class="bi bi-graph-up-arrow"></i> Em Progresso
        </span>
      </div>
      
      <h4 class="section-title">Missões em Andamento</h4>
      <div style="display: flex; flex-direction: column; gap: 12px">
        \${[{
    m: 'Frações Básicas',
    p: 75
  }, {
    m: 'Verbos e Conjugações',
    p: 40
  }, {
    m: 'Ciclo da Água',
    p: 90
  }].map(m => {
    const color = m.p >= 80 ? '#28C76F' : m.p >= 50 ? '#FF9F43' : '#6E63E8';
    return \`
            <div style="padding: 12px; background: #F8F8F8; border-radius: 8px">
              <div style="display: flex; justify-content: space-between; margin-bottom: 8px">
                <span style="font-size: 14px; font-weight: 600; color: #5E5873">\${m.m}</span>
                <span style="font-size: 13px; color: \${color}; font-weight: 700">\${m.p}%</span>
              </div>
              <div class="progress-bar-container">
                <div class="progress-bar" style="width: \${m.p}%; background: \${color}"></div>
              </div>
            </div>
          \`;
  }).join('')}
      </div>
    </div>
  \`
}`,...(L=(j=d.parameters)==null?void 0:j.docs)==null?void 0:L.source},description:{story:`Story: ComProgresso

Card DS (Diana Santos) com badge "Em Progresso" (cyan) + 3 missões em andamento com progress bars.
Frações Básicas 75% (verde), Verbos 40% (laranja), Ciclo da Água 90% (verde).

Educational context: Dashboard mostrando missões ativas do aluno com progresso percentual.`,...(X=(q=d.parameters)==null?void 0:q.docs)==null?void 0:X.description}}};var H,V,G,J,R;r.parameters={...r.parameters,docs:{...(H=r.parameters)==null?void 0:H.docs,source:{originalSource:`{
  render: () => \`
    \${styles}
    <div class="student-detail" style="max-width: 500px">
      <div class="student-header">
        <div class="student-avatar" style="background: linear-gradient(135deg, #9C27B0, #E91E63)">EL</div>
        <div class="student-info" style="flex: 1">
          <h3>Eduardo Lima</h3>
          <p>5º Ano B • Matrícula 2024022</p>
        </div>
      </div>
      
      <h4 class="section-title">Dados de Contato</h4>
      <div style="display: flex; flex-direction: column; gap: 10px">
        <div class="contact-item">
          <i class="bi bi-envelope" style="font-size: 18px; color: #6E63E8"></i>
          <span style="font-size: 14px; color: #5E5873">eduardo.lima@email.com</span>
        </div>
        <div class="contact-item">
          <i class="bi bi-phone" style="font-size: 18px; color: #28C76F"></i>
          <span style="font-size: 14px; color: #5E5873">(11) 91234-5678</span>
        </div>
      </div>
      
      <h4 style="margin: 16px 0 12px; font-size: 14px; font-weight: 600; color: #5E5873">Responsável</h4>
      <div style="padding: 12px; background: #F8F8F8; border-radius: 8px">
        <div style="font-weight: 600; color: #5E5873; margin-bottom: 6px">Carlos Lima (Pai)</div>
        <div style="display: flex; flex-direction: column; gap: 6px; font-size: 13px; color: #6E6B7B">
          <div><i class="bi bi-envelope" style="margin-right: 6px"></i>carlos.lima@email.com</div>
          <div><i class="bi bi-phone" style="margin-right: 6px"></i>(11) 99876-5432</div>
        </div>
      </div>
    </div>
  \`
}`,...(G=(V=r.parameters)==null?void 0:V.docs)==null?void 0:G.source},description:{story:`Story: ComContato

Card EL (Eduardo Lima, gradient roxo→rosa) com seção "Dados de Contato" (email + telefone) +
seção "Responsável" (Carlos Lima - Pai com email e telefone).

Educational context: Sistema exibindo informações de contato para comunicação com responsáveis.`,...(R=(J=r.parameters)==null?void 0:J.docs)==null?void 0:R.description}}};var T,I,O,_,Q;l.parameters={...l.parameters,docs:{...(T=l.parameters)==null?void 0:T.docs,source:{originalSource:`{
  render: () => \`
    \${styles}
    <div class="student-detail" style="max-width: 650px">
      <div class="student-header">
        <div class="student-avatar" style="background: linear-gradient(135deg, #28C76F, #00CFE8)">FC</div>
        <div class="student-info" style="flex: 1">
          <h3>Fernanda Costa</h3>
          <p>5º Ano A • Matrícula 2024025</p>
        </div>
      </div>
      
      <h4 class="section-title">Histórico de Atividades</h4>
      <div style="display: flex; flex-direction: column; gap: 8px">
        \${[{
    d: '05/02/2026',
    a: 'Completou missão "Frações Básicas"',
    i: 'bi-trophy',
    c: '#28C76F'
  }, {
    d: '03/02/2026',
    a: 'Desbloqueou conquista "Matemático"',
    i: 'bi-award',
    c: '#FFD700'
  }, {
    d: '01/02/2026',
    a: 'Iniciou missão "Verbos e Conjugações"',
    i: 'bi-play-circle',
    c: '#6E63E8'
  }, {
    d: '30/01/2026',
    a: 'Entregou trabalho de Ciências',
    i: 'bi-file-earmark-check',
    c: '#00CFE8'
  }].map(h => \`
          <div class="timeline-item">
            <i class="bi \${h.i}" style="font-size: 20px; color: \${h.c}; margin-top: 2px"></i>
            <div style="flex: 1">
              <div style="font-size: 14px; color: #5E5873; font-weight: 600">\${h.a}</div>
              <div style="font-size: 12px; color: #6E6B7B; margin-top: 2px">\${h.d}</div>
            </div>
          </div>
        \`).join('')}
      </div>
    </div>
  \`
}`,...(O=(I=l.parameters)==null?void 0:I.docs)==null?void 0:O.source},description:{story:`Story: ComHistorico

Card FC (Fernanda Costa, gradient verde→cyan) com timeline de 4 atividades recentes:
Completou Frações (trophy), Desbloqueou Matemático (award), Iniciou Verbos (play), Entregou Ciências (file-check).

Educational context: Histórico cronológico de ações do aluno no sistema.`,...(Q=(_=l.parameters)==null?void 0:_.docs)==null?void 0:Q.description}}};var K,N,U,W,Y;c.parameters={...c.parameters,docs:{...(K=c.parameters)==null?void 0:K.docs,source:{originalSource:`{
  render: () => \`
    \${styles}
    <div class="student-detail" style="max-width: 300px">
      <div style="text-align: center">
        <div class="student-avatar" style="margin: 0 auto 16px">GS</div>
        <h3 style="margin: 0 0 6px; font-size: 18px; color: #5E5873">Gabriela Santos</h3>
        <p style="margin: 0 0 16px; font-size: 13px; color: #6E6B7B">5º Ano B</p>
        
        <div class="student-stats" style="grid-template-columns: 1fr 1fr">
          <div class="stat-box">
            <div class="stat-value" style="color: #6E63E8; font-size: 24px">38</div>
            <div class="stat-label">Missões</div>
          </div>
          <div class="stat-box">
            <div class="stat-value" style="color: #28C76F; font-size: 24px">8.8</div>
            <div class="stat-label">Média</div>
          </div>
        </div>
      </div>
    </div>
    <p style="margin-top: 12px; font-size: 13px; color: #6E6B7B">
      <strong>Contexto:</strong> Card simplificado para grid de alunos.
    </p>
  \`
}`,...(U=(N=c.parameters)==null?void 0:N.docs)==null?void 0:U.source},description:{story:`Story: CardSimples

Card simplificado centralizado (300px) com avatar GS (Gabriela Santos), nome, turma e 2 stats (38 missões, 8.8 média).

Educational context: Card compacto para grid de alunos em dashboard.`,...(Y=(W=c.parameters)==null?void 0:W.docs)==null?void 0:Y.description}}};const as=["Default","ComDesempenho","ComConquistas","ListaCompacta","ComProgresso","ComContato","ComHistorico","CardSimples"];export{c as CardSimples,n as ComConquistas,r as ComContato,i as ComDesempenho,l as ComHistorico,d as ComProgresso,t as Default,o as ListaCompacta,as as __namedExportsOrder,ss as default};
