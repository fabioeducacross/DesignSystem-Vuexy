const M={title:"Educacross Components V2/PDF/StudentEvidenceReportPDF",tags:["autodocs"],parameters:{layout:"fullscreen",docs:{description:{component:`
# StudentEvidenceReportPDF

Relatório de evidências de desempenho do aluno em formato PDF.
Inclui gráficos de rendimento, jogos completados e tabela detalhada.

## Características
- Layout A4 (992px width) com margens para impressão
- Gráficos: donut (rendimento turma) e barras (jogos completados)
- Tabela com nome, badges de proficiência, estatísticas
- Legendas de cores (abaixo básico, básico, proficiente, avançado)
- @setInfos event para coletar dados antes de renderizar

## Uso educacional
- Relatórios bimestrais/trimestrais de desempenho
- Evidências para reuniões pedagógicas com pais
- Acompanhamento longitudinal de aprendizagem
        `}}}},a=`
<style>
.evidence-report-body {
  max-width: 992px;
  margin: 0 auto;
  padding: 40px;
  background: white;
  font-family: Arial, sans-serif;
}

.text-center {
  text-align: center;
}

.font-bold {
  font-weight: 700;
}

.font-12 {
  font-size: 12px;
}

.font-semibold {
  font-weight: 600;
}

.text-body {
  color: #5D596C;
}

h1 {
  font-size: 28px;
  color: #2c2c2c;
  margin-bottom: 8px;
}

h2 {
  font-size: 22px;
  color: #5D596C;
  margin-bottom: 16px;
}

h4 {
  font-size: 16px;
  margin-bottom: 12px;
}

.report-info-card {
  border: 1px solid #DBDADE;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 24px;
  background: #F8F7FA;
}

.report-info-card p {
  margin: 8px 0;
  font-size: 14px;
  color: #5D596C;
}

.charts-container {
  display: flex;
  gap: 24px;
  margin-bottom: 24px;
}

.chart-wrapper {
  flex: 1;
  border: 1px solid #DBDADE;
  border-radius: 12px;
  padding: 20px;
  background: white;
}

.donut-chart,
.bar-chart {
  width: 100%;
  height: 250px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.donut-placeholder {
  width: 180px;
  height: 180px;
  border-radius: 50%;
  border: 40px solid #E0E0E0;
  border-top-color: #EA5455;
  border-right-color: #FF9F43;
  border-bottom-color: #28C76F;
  border-left-color: #6E63E8;
  position: relative;
}

.donut-center {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
}

.donut-value {
  font-size: 32px;
  font-weight: 700;
  color: #5D596C;
}

.donut-label {
  font-size: 12px;
  color: #6E6B7B;
}

.bar-chart-placeholder {
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
}

.bar-item {
  display: flex;
  align-items: center;
  gap: 12px;
}

.bar-label {
  width: 120px;
  font-size: 13px;
  color: #5D596C;
  font-weight: 600;
}

.bar-track {
  flex: 1;
  height: 24px;
  background: #F3F2F7;
  border-radius: 4px;
  overflow: hidden;
  position: relative;
}

.bar-fill {
  height: 100%;
  background: linear-gradient(90deg, #6E63E8, #9F93F8);
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-right: 8px;
  color: white;
  font-size: 12px;
  font-weight: 700;
}

.charts-legends-container {
  border-top: 1px solid #DBDADE;
  padding-top: 20px;
  margin-top: 20px;
}

.legend-row {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin-bottom: 16px;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
}

.legend-box {
  width: 20px;
  height: 20px;
  border-radius: 4px;
}

.legend-below-basic {
  background: #EA5455;
}

.legend-basic {
  background: #FF9F43;
}

.legend-proficient {
  background: #28C76F;
}

.legend-advanced {
  background: #6E63E8;
}

.games-list {
  font-size: 13px;
  color: #6E6B7B;
  margin-top: 12px;
}

.games-list-item {
  display: inline-block;
  margin-right: 16px;
  margin-bottom: 8px;
}

.performance-table {
  width: 100%;
  border-collapse: collapse;
  border: 1px solid #DBDADE;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 24px;
}

.table-header-title {
  background: rgba(110, 99, 232, 0.12) !important;
  padding: 16px;
  font-size: 16px;
  font-weight: 700;
  color: #6E63E8;
  text-align: center;
}

.table-header-row {
  background-color: #F3F2F7 !important;
}

.performance-table th {
  padding: 12px;
  font-size: 13px;
  font-weight: 600;
  color: #5D596C;
  border: 1px solid #DBDADE;
  text-align: left;
}

.performance-table td {
  padding: 12px;
  font-size: 13px;
  color: #5D596C;
  border: 1px solid #DBDADE;
}

.whitespace-no-wrap {
  white-space: nowrap;
}

.badge-proficiency {
  display: inline-block;
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
}

.badge-below-basic {
  background: rgba(234, 84, 85, 0.12);
  color: #EA5455;
}

.badge-basic {
  background: rgba(255, 159, 67, 0.12);
  color: #FF9F43;
}

.badge-proficient {
  background: rgba(40, 199, 111, 0.12);
  color: #28C76F;
}

.badge-advanced {
  background: rgba(110, 99, 232, 0.12);
  color: #6E63E8;
}

.badge-no-data {
  background: rgba(108, 117, 125, 0.12);
  color: #6E6B7B;
}

@page {
  size: A4;
  margin: 40px 40px 80px 40px;
}

@media print {
  .evidence-report-body {
    padding: 0;
  }
  
  .performance-table {
    page-break-inside: avoid;
  }
}
</style>
`,t={render:()=>`
    ${a}
    <div class="evidence-report-body">
      <div class="text-center">
        <h1 class="font-bold">Colégio Educacional São Paulo</h1>
        <h2>Relatório de Evidências</h2>
        <p class="font-12 font-bold">1º Trimestre de 2024 - Turma 7º A</p>
      </div>

      <div class="report-info-card">
        <p><strong>Professor:</strong> Carlos Eduardo Silva</p>
        <p><strong>Matriz/Currículo:</strong> BNCC - Base Nacional Comum Curricular 7º Ano</p>
        <p><strong>Módulo:</strong> Frações e Decimais</p>
        <p><strong>Turma:</strong> 7º Ano A - Matutino</p>
      </div>

      <div class="charts-container">
        <div class="chart-wrapper">
          <h4 class="font-semibold text-center text-body">Rendimento da turma</h4>
          <div class="donut-chart">
            <div class="donut-placeholder">
              <div class="donut-center">
                <div class="donut-value">75%</div>
                <div class="donut-label">Proficiente</div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="chart-wrapper">
          <h4 class="font-semibold text-center text-body">Jogos finalizados</h4>
          <div class="bar-chart">
            <div class="bar-chart-placeholder">
              ${[{game:"Desafio Frações",value:18,total:25},{game:"Quiz Decimais",value:22,total:25},{game:"Missão Equivalências",value:15,total:25}].map(e=>`
                <div class="bar-item">
                  <div class="bar-label">${e.game}</div>
                  <div class="bar-track">
                    <div class="bar-fill" style="width: ${e.value/e.total*100}%;">
                      ${e.value}/${e.total}
                    </div>
                  </div>
                </div>
              `).join("")}
            </div>
          </div>
        </div>
      </div>

      <div class="charts-legends-container">
        <div class="legend-row">
          <div class="legend-item">
            <div class="legend-box legend-below-basic"></div>
            <span>Abaixo do Básico (0-50%)</span>
          </div>
          <div class="legend-item">
            <div class="legend-box legend-basic"></div>
            <span>Básico (51-70%)</span>
          </div>
          <div class="legend-item">
            <div class="legend-box legend-proficient"></div>
            <span>Proficiente (71-90%)</span>
          </div>
          <div class="legend-item">
            <div class="legend-box legend-advanced"></div>
            <span>Avançado (91-100%)</span>
          </div>
        </div>
        
        <hr />
        
        <div class="games-list">
          <strong>Jogos Finalizados:</strong>
          ${["Desafio das Frações","Quiz de Decimais","Missão Equivalências","Batalha Matemática"].map(e=>`<span class="games-list-item"><i class="bi bi-controller"></i> ${e}</span>`).join("")}
        </div>
      </div>
    </div>
  `},n={render:()=>`
    ${a}
    <div class="evidence-report-body">
      <div class="text-center">
        <h1 class="font-bold">Instituto Educacional Futuro</h1>
        <h2>Relatório de Evidências - Matemática</h2>
        <p class="font-12 font-bold">2º Trimestre de 2024</p>
      </div>

      <div class="report-info-card">
        <p><strong>Professor:</strong> Ana Paula Costa</p>
        <p><strong>Matriz/Currículo:</strong> BNCC 8º Ano - Matemática</p>
        <p><strong>Módulo:</strong> Geometria Plana</p>
        <p><strong>Turma:</strong> 8º B - Vespertino</p>
      </div>

      <div class="charts-container">
        <div class="chart-wrapper">
          <h4 class="font-semibold text-center text-body">Distribuição de Rendimento</h4>
          <div class="donut-chart">
            <div class="donut-placeholder" style="border-top-color: #6E63E8; border-right-color: #28C76F; border-bottom-color: #FF9F43; border-left-color: #EA5455;">
              <div class="donut-center">
                <div class="donut-value">85%</div>
                <div class="donut-label">Média Turma</div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="chart-wrapper">
          <h4 class="font-semibold text-center text-body">Atividades Completadas</h4>
          <div class="bar-chart">
            <div class="bar-chart-placeholder">
              ${[{game:"Área de Figuras",value:20,total:22},{game:"Perímetro Desafio",value:19,total:22},{game:"Teorema Pitágoras",value:17,total:22}].map(e=>`
                <div class="bar-item">
                  <div class="bar-label">${e.game}</div>
                  <div class="bar-track">
                    <div class="bar-fill" style="width: ${e.value/e.total*100}%; background: linear-gradient(90deg, #28C76F, #57E395);">
                      ${e.value}/${e.total}
                    </div>
                  </div>
                </div>
              `).join("")}
            </div>
          </div>
        </div>
      </div>

      <div class="charts-legends-container">
        <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px;">
          <div>
            <strong>Legenda de Proficiência:</strong>
            <div class="legend-row" style="margin-top: 8px; flex-direction: column; gap: 8px;">
              ${[{name:"Avançado",className:"legend-advanced",desc:"12 alunos (55%)"},{name:"Proficiente",className:"legend-proficient",desc:"8 alunos (36%)"},{name:"Básico",className:"legend-basic",desc:"2 alunos (9%)"}].map(e=>`
                <div class="legend-item">
                  <div class="legend-box ${e.className}"></div>
                  <span>${e.name}: ${e.desc}</span>
                </div>
              `).join("")}
            </div>
          </div>
          <div>
            <strong>Estatísticas Gerais:</strong>
            <div style="margin-top: 8px; font-size: 13px; color: #6E6B7B;">
              <p style="margin: 6px 0;"><i class="bi bi-people"></i> Total de alunos: 22</p>
              <p style="margin: 6px 0;"><i class="bi bi-clock-history"></i> Tempo médio: 45 minutos</p>
              <p style="margin: 6px 0;"><i class="bi bi-graph-up"></i> Taxa de conclusão: 90%</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `},s={render:()=>`
    ${a}
    <div class="evidence-report-body">
      <div class="text-center">
        <h1 class="font-bold">Relatório Detalhado</h1>
        <h2>Desempenho Individual - Turma 7A</h2>
      </div>

      <table class="performance-table">
        <thead>
          <tr>
            <th colspan="6" class="table-header-title">Desempenho Geral</th>
          </tr>
          <tr class="table-header-row">
            <th>Nome</th>
            <th>Proficiência</th>
            <th class="text-center">Jogos</th>
            <th class="text-center">Finalizados</th>
            <th class="text-center">Rendimento</th>
            <th class="text-center">Tempo Investido</th>
          </tr>
        </thead>
        <tbody>
          ${[{name:"Ana Beatriz Silva",proficiency:"avançado",games:15,completed:14,score:95,time:"38h"},{name:"Bruno Henrique Costa",proficiency:"proficiente",games:15,completed:13,score:82,time:"42h"},{name:"Carlos Eduardo Lima",proficiency:"proficiente",games:15,completed:12,score:78,time:"35h"},{name:"Daniela Souza Santos",proficiency:"básico",games:15,completed:10,score:65,time:"50h"},{name:"Eduardo Ferreira Alves",proficiency:"avançado",games:15,completed:15,score:98,time:"40h"}].map(e=>`
            <tr>
              <td class="whitespace-no-wrap">${e.name}</td>
              <td class="text-center">
                <span class="badge-proficiency badge-${e.proficiency}">
                  ${e.proficiency==="avançado"?"Avançado":e.proficiency==="proficiente"?"Proficiente":"Básico"}
                </span>
              </td>
              <td class="text-center">${e.games}</td>
              <td class="text-center">${e.completed}</td>
              <td class="text-center"><strong>${e.score}%</strong></td>
              <td class="text-center">${e.time}</td>
            </tr>
          `).join("")}
        </tbody>
      </table>
    </div>
  `},o={render:()=>`
    ${a}
    <div class="evidence-report-body">
      <div class="text-center">
        <h1 class="font-bold">Relatório de Evidências</h1>
        <h2>Turma 9C - Período sem dados</h2>
      </div>

      <div class="report-info-card">
        <p><strong>Professor:</strong> Roberto Mendes</p>
        <p><strong>Turma:</strong> 9º C - Noturno</p>
        <p><strong>Status:</strong> Aguardando atividades</p>
      </div>

      <table class="performance-table">
        <thead>
          <tr>
            <th colspan="6" class="table-header-title">Desempenho Geral</th>
          </tr>
          <tr class="table-header-row">
            <th>Nome</th>
            <th>Status</th>
            <th class="text-center">Jogos</th>
            <th class="text-center">Rendimento</th>
          </tr>
        </thead>
        <tbody>
          ${["Aluno 1","Aluno 2","Aluno 3"].map(e=>`
            <tr>
              <td>${e}</td>
              <td class="text-center">
                <span class="badge-proficiency badge-no-data">Não há dados para exibir</span>
              </td>
              <td class="text-center">-</td>
              <td class="text-center">-</td>
            </tr>
          `).join("")}
        </tbody>
      </table>

      <div style="text-align: center; padding: 40px 20px; color: #6E6B7B; font-size: 14px;">
        <i class="bi bi-inbox" style="font-size: 64px; opacity: 0.3; display: block; margin-bottom: 16px;"></i>
        <p>Nenhuma atividade registrada neste período.</p>
        <p style="font-size: 12px; margin-top: 8px;">Inicie missões e jogos para gerar relatórios de evidências.</p>
      </div>
    </div>
  `},r={render:()=>`
    ${a}
    <div class="evidence-report-body">
      <div class="text-center">
        <h1 class="font-bold">🏆 Relatório de Alto Desempenho</h1>
        <h2>Turma Destaque - 7º A</h2>
        <p class="font-12 font-bold">Média geral: 92% - Excelente!</p>
      </div>

      <table class="performance-table">
        <thead>
          <tr>
            <th colspan="5" class="table-header-title" style="background: rgba(40, 199, 111, 0.12) !important; color: #28C76F;">
              Desempenho Excepcional
            </th>
          </tr>
          <tr class="table-header-row">
            <th>Nome</th>
            <th class="text-center">Proficiência</th>
            <th class="text-center">Rendimento</th>
            <th class="text-center">Missões</th>
            <th class="text-center">Destaque</th>
          </tr>
        </thead>
        <tbody>
          ${[{name:"Fernanda Oliveira",score:98,missions:"20/20",badge:"🥇 1º Lugar"},{name:"Gabriel Santos",score:96,missions:"20/20",badge:"🥈 2º Lugar"},{name:"Helena Costa",score:94,missions:"19/20",badge:"🥉 3º Lugar"},{name:"Igor Almeida",score:92,missions:"20/20",badge:"⭐ Top 5"},{name:"Júlia Ribeiro",score:90,missions:"19/20",badge:"⭐ Top 5"}].map(e=>`
            <tr style="background: rgba(40, 199, 111, 0.04);">
              <td class="whitespace-no-wrap"><strong>${e.name}</strong></td>
              <td class="text-center">
                <span class="badge-proficiency badge-advanced">Avançado</span>
              </td>
              <td class="text-center"><strong style="color: #28C76F; font-size: 16px;">${e.score}%</strong></td>
              <td class="text-center">${e.missions}</td>
              <td class="text-center">${e.badge}</td>
            </tr>
          `).join("")}
        </tbody>
      </table>

      <div style="margin-top: 24px; padding: 20px; background: rgba(40, 199, 111, 0.08); border-radius: 12px; border: 2px solid #28C76F;">
        <h4 style="color: #28C76F; margin-bottom: 12px;"><i class="bi bi-trophy-fill"></i> Parabéns à Turma!</h4>
        <p style="font-size: 14px; color: #5D596C;">
          Esta turma demonstrou excelente desempenho em todas as atividades propostas. 
          Todos os alunos atingiram proficiência avançada, com média geral de 94%.
        </p>
      </div>
    </div>
  `},i={render:()=>`
    ${a}
    <div class="evidence-report-body">
      <div class="text-center">
        <h1 class="font-bold">Relatório de Acompanhamento</h1>
        <h2>Turma 8D - Requer atenção</h2>
        <p class="font-12 font-bold">Média geral: 58% - Abaixo do esperado</p>
      </div>

      <table class="performance-table">
        <thead>
          <tr>
            <th colspan="5" class="table-header-title" style="background: rgba(255, 159, 67, 0.12) !important; color: #FF9F43;">
              Desempenho Requer Atenção
            </th>
          </tr>
          <tr class="table-header-row">
            <th>Nome</th>
            <th class="text-center">Proficiência</th>
            <th class="text-center">Rendimento</th>
            <th class="text-center">Missões Pendentes</th>
            <th class="text-center">Recomendação</th>
          </tr>
        </thead>
        <tbody>
          ${[{name:"Aluno A",proficiency:"básico",score:68,pending:5,rec:"Reforço"},{name:"Aluno B",proficiency:"básico",score:62,pending:7,rec:"Reforço"},{name:"Aluno C",proficiency:"below-basic",score:45,pending:10,rec:"Recuperação"},{name:"Aluno D",proficiency:"básico",score:58,pending:8,rec:"Acompanhamento"}].map(e=>`
            <tr style="background: rgba(255, 159, 67, 0.04);">
              <td>${e.name}</td>
              <td class="text-center">
                <span class="badge-proficiency badge-${e.proficiency==="below-basic"?"below-basic":"basic"}">
                  ${e.proficiency==="below-basic"?"Abaixo do Básico":"Básico"}
                </span>
              </td>
              <td class="text-center"><strong style="color: #FF9F43;">${e.score}%</strong></td>
              <td class="text-center">${e.pending}</td>
              <td class="text-center"><span style="font-size: 12px; font-weight: 600; color: #FF9F43;">${e.rec}</span></td>
            </tr>
          `).join("")}
        </tbody>
      </table>

      <div style="margin-top: 24px; padding: 20px; background: rgba(255, 159, 67, 0.08); border-radius: 12px; border: 2px solid #FF9F43;">
        <h4 style="color: #FF9F43; margin-bottom: 12px;"><i class="bi bi-exclamation-triangle-fill"></i> Ações Recomendadas</h4>
        <ul style="font-size: 14px; color: #5D596C; margin: 0; padding-left: 24px;">
          <li>Agendar aulas de reforço para alunos com proficiência básica ou abaixo</li>
          <li>Revisar conteúdos das missões pendentes em grupos menores</li>
          <li>Reunião com responsáveis para acompanhamento individual</li>
          <li>Planejar atividades complementares adaptadas ao nível atual</li>
        </ul>
      </div>
    </div>
  `},d={render:()=>`
    ${a}
    <style>
      .print-indicator {
        background: #E3F2FD;
        border: 2px solid #2196F3;
        border-radius: 8px;
        padding: 16px;
        margin-bottom: 20px;
        text-align: center;
        font-size: 14px;
        color: #1976D2;
      }
    </style>
    <div class="evidence-report-body" style="max-width: 210mm; padding: 20mm;">
      <div class="print-indicator">
        <strong>📄 Visualização de Impressão</strong> - Este relatório está formatado para A4 (210×297mm)
      </div>
      
      <div class="text-center">
        <h1 class="font-bold">Relatório Completo</h1>
        <h2>Evidências de Aprendizagem</h2>
      </div>

      <div class="report-info-card">
        <p><strong>Professor:</strong> Marcos Oliveira</p>
        <p><strong>Turma:</strong> 9º A - Integral</p>
        <p><strong>Período:</strong> Março a Maio 2024</p>
      </div>

      <table class="performance-table">
        <thead>
          <tr>
            <th colspan="4" class="table-header-title">Resumo de Desempenho</th>
          </tr>
          <tr class="table-header-row">
            <th>Métrica</th>
            <th class="text-center">Valor</th>
            <th class="text-center">Meta</th>
            <th class="text-center">Status</th>
          </tr>
        </thead>
        <tbody>
          ${[{metric:"Média Geral",value:"8.5",goal:"7.0",status:"success"},{metric:"Taxa de Aprovação",value:"95%",goal:"85%",status:"success"},{metric:"Missões Completas",value:"18/20",goal:"15/20",status:"success"}].map(e=>`
            <tr>
              <td><strong>${e.metric}</strong></td>
              <td class="text-center">${e.value}</td>
              <td class="text-center">${e.goal}</td>
              <td class="text-center">
                <span class="badge-proficiency badge-${e.status==="success"?"proficient":"basic"}">
                  ${e.status==="success"?"✓ Atingido":"⚠ Pendente"}
                </span>
              </td>
            </tr>
          `).join("")}
        </tbody>
      </table>

      <div style="margin-top: 40px; padding-top: 20px; border-top: 2px solid #DBDADE; text-align: center; font-size: 12px; color: #6E6B7B;">
        <p>Documento gerado em ${new Date().toLocaleDateString("pt-BR")} às ${new Date().toLocaleTimeString("pt-BR")}</p>
        <p>Sistema Educacross - Plataforma de Gestão Escolar</p>
      </div>
    </div>
  `},c={render:()=>(setTimeout(()=>{const e=document.querySelector(".evidence-report-body");e&&(e.style.cursor="pointer",e.addEventListener("click",l=>{(l.target.closest(".bar-item")||l.target.closest(".donut-chart"))&&alert(`Interação com gráfico!

Em produção, isso abriria detalhes expandidos do gráfico com drill-down de dados por aluno.`)}))},100),`
      ${a}
      <style>
        .bar-item:hover {
          background: rgba(110, 99, 232, 0.04);
          border-radius: 8px;
          cursor: pointer;
          transition: background 0.2s;
        }
        .donut-chart:hover .donut-placeholder {
          transform: scale(1.05);
          transition: transform 0.3s;
          cursor: pointer;
        }
        .interaction-hint {
          background: #F4F3FF;
          border: 2px dashed #6E63E8;
          border-radius: 8px;
          padding: 12px;
          margin-bottom: 20px;
          text-align: center;
          font-size: 13px;
          color: #6E63E8;
          animation: pulse 2s ease-in-out infinite;
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.8; }
          50% { opacity: 1; }
        }
      </style>
      <div class="evidence-report-body">
        <div class="interaction-hint">
          💡 Clique nos gráficos para ver detalhes interativos
        </div>
        
        <div class="text-center">
          <h1 class="font-bold">Relatório Interativo</h1>
          <h2>Demonstração de funcionalidades</h2>
        </div>

        <div class="charts-container">
          <div class="chart-wrapper">
            <h4 class="font-semibold text-center text-body">Rendimento da turma</h4>
            <div class="donut-chart">
              <div class="donut-placeholder">
                <div class="donut-center">
                  <div class="donut-value">78%</div>
                  <div class="donut-label">Proficiente</div>
                </div>
              </div>
            </div>
          </div>
          
          <div class="chart-wrapper">
            <h4 class="font-semibold text-center text-body">Jogos finalizados</h4>
            <div class="bar-chart">
              <div class="bar-chart-placeholder">
                ${[{game:"Desafio 1",value:20,total:25},{game:"Desafio 2",value:18,total:25},{game:"Desafio 3",value:16,total:25}].map(e=>`
                  <div class="bar-item">
                    <div class="bar-label">${e.game}</div>
                    <div class="bar-track">
                      <div class="bar-fill" style="width: ${e.value/e.total*100}%;">
                        ${e.value}/${e.total}
                      </div>
                    </div>
                  </div>
                `).join("")}
              </div>
            </div>
          </div>
        </div>

        <div style="margin-top: 24px; padding: 20px; background: rgba(110, 99, 232, 0.08); border-radius: 12px;">
          <h4 style="color: #6E63E8; margin-bottom: 12px;"><i class="bi bi-info-circle-fill"></i> Recursos Interativos</h4>
          <p style="font-size: 14px; color: #5D596C; margin: 0;">
            Em produção, este relatório permite exportar para PDF, compartilhar por email, 
            visualizar drill-down de dados por aluno, filtrar por período e comparar com trimestres anteriores.
          </p>
        </div>
      </div>
    `)};var p,m,g;t.parameters={...t.parameters,docs:{...(p=t.parameters)==null?void 0:p.docs,source:{originalSource:`{
  render: () => \`
    \${componentStyles}
    <div class="evidence-report-body">
      <div class="text-center">
        <h1 class="font-bold">Colégio Educacional São Paulo</h1>
        <h2>Relatório de Evidências</h2>
        <p class="font-12 font-bold">1º Trimestre de 2024 - Turma 7º A</p>
      </div>

      <div class="report-info-card">
        <p><strong>Professor:</strong> Carlos Eduardo Silva</p>
        <p><strong>Matriz/Currículo:</strong> BNCC - Base Nacional Comum Curricular 7º Ano</p>
        <p><strong>Módulo:</strong> Frações e Decimais</p>
        <p><strong>Turma:</strong> 7º Ano A - Matutino</p>
      </div>

      <div class="charts-container">
        <div class="chart-wrapper">
          <h4 class="font-semibold text-center text-body">Rendimento da turma</h4>
          <div class="donut-chart">
            <div class="donut-placeholder">
              <div class="donut-center">
                <div class="donut-value">75%</div>
                <div class="donut-label">Proficiente</div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="chart-wrapper">
          <h4 class="font-semibold text-center text-body">Jogos finalizados</h4>
          <div class="bar-chart">
            <div class="bar-chart-placeholder">
              \${[{
    game: 'Desafio Frações',
    value: 18,
    total: 25
  }, {
    game: 'Quiz Decimais',
    value: 22,
    total: 25
  }, {
    game: 'Missão Equivalências',
    value: 15,
    total: 25
  }].map(item => \`
                <div class="bar-item">
                  <div class="bar-label">\${item.game}</div>
                  <div class="bar-track">
                    <div class="bar-fill" style="width: \${item.value / item.total * 100}%;">
                      \${item.value}/\${item.total}
                    </div>
                  </div>
                </div>
              \`).join('')}
            </div>
          </div>
        </div>
      </div>

      <div class="charts-legends-container">
        <div class="legend-row">
          <div class="legend-item">
            <div class="legend-box legend-below-basic"></div>
            <span>Abaixo do Básico (0-50%)</span>
          </div>
          <div class="legend-item">
            <div class="legend-box legend-basic"></div>
            <span>Básico (51-70%)</span>
          </div>
          <div class="legend-item">
            <div class="legend-box legend-proficient"></div>
            <span>Proficiente (71-90%)</span>
          </div>
          <div class="legend-item">
            <div class="legend-box legend-advanced"></div>
            <span>Avançado (91-100%)</span>
          </div>
        </div>
        
        <hr />
        
        <div class="games-list">
          <strong>Jogos Finalizados:</strong>
          \${['Desafio das Frações', 'Quiz de Decimais', 'Missão Equivalências', 'Batalha Matemática'].map(game => \`<span class="games-list-item"><i class="bi bi-controller"></i> \${game}</span>\`).join('')}
        </div>
      </div>
    </div>
  \`
}`,...(g=(m=t.parameters)==null?void 0:m.docs)==null?void 0:g.source}}};var v,b,x;n.parameters={...n.parameters,docs:{...(v=n.parameters)==null?void 0:v.docs,source:{originalSource:`{
  render: () => \`
    \${componentStyles}
    <div class="evidence-report-body">
      <div class="text-center">
        <h1 class="font-bold">Instituto Educacional Futuro</h1>
        <h2>Relatório de Evidências - Matemática</h2>
        <p class="font-12 font-bold">2º Trimestre de 2024</p>
      </div>

      <div class="report-info-card">
        <p><strong>Professor:</strong> Ana Paula Costa</p>
        <p><strong>Matriz/Currículo:</strong> BNCC 8º Ano - Matemática</p>
        <p><strong>Módulo:</strong> Geometria Plana</p>
        <p><strong>Turma:</strong> 8º B - Vespertino</p>
      </div>

      <div class="charts-container">
        <div class="chart-wrapper">
          <h4 class="font-semibold text-center text-body">Distribuição de Rendimento</h4>
          <div class="donut-chart">
            <div class="donut-placeholder" style="border-top-color: #6E63E8; border-right-color: #28C76F; border-bottom-color: #FF9F43; border-left-color: #EA5455;">
              <div class="donut-center">
                <div class="donut-value">85%</div>
                <div class="donut-label">Média Turma</div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="chart-wrapper">
          <h4 class="font-semibold text-center text-body">Atividades Completadas</h4>
          <div class="bar-chart">
            <div class="bar-chart-placeholder">
              \${[{
    game: 'Área de Figuras',
    value: 20,
    total: 22
  }, {
    game: 'Perímetro Desafio',
    value: 19,
    total: 22
  }, {
    game: 'Teorema Pitágoras',
    value: 17,
    total: 22
  }].map(item => \`
                <div class="bar-item">
                  <div class="bar-label">\${item.game}</div>
                  <div class="bar-track">
                    <div class="bar-fill" style="width: \${item.value / item.total * 100}%; background: linear-gradient(90deg, #28C76F, #57E395);">
                      \${item.value}/\${item.total}
                    </div>
                  </div>
                </div>
              \`).join('')}
            </div>
          </div>
        </div>
      </div>

      <div class="charts-legends-container">
        <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px;">
          <div>
            <strong>Legenda de Proficiência:</strong>
            <div class="legend-row" style="margin-top: 8px; flex-direction: column; gap: 8px;">
              \${[{
    name: 'Avançado',
    className: 'legend-advanced',
    desc: '12 alunos (55%)'
  }, {
    name: 'Proficiente',
    className: 'legend-proficient',
    desc: '8 alunos (36%)'
  }, {
    name: 'Básico',
    className: 'legend-basic',
    desc: '2 alunos (9%)'
  }].map(item => \`
                <div class="legend-item">
                  <div class="legend-box \${item.className}"></div>
                  <span>\${item.name}: \${item.desc}</span>
                </div>
              \`).join('')}
            </div>
          </div>
          <div>
            <strong>Estatísticas Gerais:</strong>
            <div style="margin-top: 8px; font-size: 13px; color: #6E6B7B;">
              <p style="margin: 6px 0;"><i class="bi bi-people"></i> Total de alunos: 22</p>
              <p style="margin: 6px 0;"><i class="bi bi-clock-history"></i> Tempo médio: 45 minutos</p>
              <p style="margin: 6px 0;"><i class="bi bi-graph-up"></i> Taxa de conclusão: 90%</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  \`
}`,...(x=(b=n.parameters)==null?void 0:b.docs)==null?void 0:x.source}}};var h,u,f;s.parameters={...s.parameters,docs:{...(h=s.parameters)==null?void 0:h.docs,source:{originalSource:`{
  render: () => \`
    \${componentStyles}
    <div class="evidence-report-body">
      <div class="text-center">
        <h1 class="font-bold">Relatório Detalhado</h1>
        <h2>Desempenho Individual - Turma 7A</h2>
      </div>

      <table class="performance-table">
        <thead>
          <tr>
            <th colspan="6" class="table-header-title">Desempenho Geral</th>
          </tr>
          <tr class="table-header-row">
            <th>Nome</th>
            <th>Proficiência</th>
            <th class="text-center">Jogos</th>
            <th class="text-center">Finalizados</th>
            <th class="text-center">Rendimento</th>
            <th class="text-center">Tempo Investido</th>
          </tr>
        </thead>
        <tbody>
          \${[{
    name: 'Ana Beatriz Silva',
    proficiency: 'avançado',
    games: 15,
    completed: 14,
    score: 95,
    time: '38h'
  }, {
    name: 'Bruno Henrique Costa',
    proficiency: 'proficiente',
    games: 15,
    completed: 13,
    score: 82,
    time: '42h'
  }, {
    name: 'Carlos Eduardo Lima',
    proficiency: 'proficiente',
    games: 15,
    completed: 12,
    score: 78,
    time: '35h'
  }, {
    name: 'Daniela Souza Santos',
    proficiency: 'básico',
    games: 15,
    completed: 10,
    score: 65,
    time: '50h'
  }, {
    name: 'Eduardo Ferreira Alves',
    proficiency: 'avançado',
    games: 15,
    completed: 15,
    score: 98,
    time: '40h'
  }].map(student => \`
            <tr>
              <td class="whitespace-no-wrap">\${student.name}</td>
              <td class="text-center">
                <span class="badge-proficiency badge-\${student.proficiency}">
                  \${student.proficiency === 'avançado' ? 'Avançado' : student.proficiency === 'proficiente' ? 'Proficiente' : 'Básico'}
                </span>
              </td>
              <td class="text-center">\${student.games}</td>
              <td class="text-center">\${student.completed}</td>
              <td class="text-center"><strong>\${student.score}%</strong></td>
              <td class="text-center">\${student.time}</td>
            </tr>
          \`).join('')}
        </tbody>
      </table>
    </div>
  \`
}`,...(f=(u=s.parameters)==null?void 0:u.docs)==null?void 0:f.source}}};var y,E,D;o.parameters={...o.parameters,docs:{...(y=o.parameters)==null?void 0:y.docs,source:{originalSource:`{
  render: () => \`
    \${componentStyles}
    <div class="evidence-report-body">
      <div class="text-center">
        <h1 class="font-bold">Relatório de Evidências</h1>
        <h2>Turma 9C - Período sem dados</h2>
      </div>

      <div class="report-info-card">
        <p><strong>Professor:</strong> Roberto Mendes</p>
        <p><strong>Turma:</strong> 9º C - Noturno</p>
        <p><strong>Status:</strong> Aguardando atividades</p>
      </div>

      <table class="performance-table">
        <thead>
          <tr>
            <th colspan="6" class="table-header-title">Desempenho Geral</th>
          </tr>
          <tr class="table-header-row">
            <th>Nome</th>
            <th>Status</th>
            <th class="text-center">Jogos</th>
            <th class="text-center">Rendimento</th>
          </tr>
        </thead>
        <tbody>
          \${['Aluno 1', 'Aluno 2', 'Aluno 3'].map(name => \`
            <tr>
              <td>\${name}</td>
              <td class="text-center">
                <span class="badge-proficiency badge-no-data">Não há dados para exibir</span>
              </td>
              <td class="text-center">-</td>
              <td class="text-center">-</td>
            </tr>
          \`).join('')}
        </tbody>
      </table>

      <div style="text-align: center; padding: 40px 20px; color: #6E6B7B; font-size: 14px;">
        <i class="bi bi-inbox" style="font-size: 64px; opacity: 0.3; display: block; margin-bottom: 16px;"></i>
        <p>Nenhuma atividade registrada neste período.</p>
        <p style="font-size: 12px; margin-top: 8px;">Inicie missões e jogos para gerar relatórios de evidências.</p>
      </div>
    </div>
  \`
}`,...(D=(E=o.parameters)==null?void 0:E.docs)==null?void 0:D.source}}};var F,A,$;r.parameters={...r.parameters,docs:{...(F=r.parameters)==null?void 0:F.docs,source:{originalSource:`{
  render: () => \`
    \${componentStyles}
    <div class="evidence-report-body">
      <div class="text-center">
        <h1 class="font-bold">🏆 Relatório de Alto Desempenho</h1>
        <h2>Turma Destaque - 7º A</h2>
        <p class="font-12 font-bold">Média geral: 92% - Excelente!</p>
      </div>

      <table class="performance-table">
        <thead>
          <tr>
            <th colspan="5" class="table-header-title" style="background: rgba(40, 199, 111, 0.12) !important; color: #28C76F;">
              Desempenho Excepcional
            </th>
          </tr>
          <tr class="table-header-row">
            <th>Nome</th>
            <th class="text-center">Proficiência</th>
            <th class="text-center">Rendimento</th>
            <th class="text-center">Missões</th>
            <th class="text-center">Destaque</th>
          </tr>
        </thead>
        <tbody>
          \${[{
    name: 'Fernanda Oliveira',
    score: 98,
    missions: '20/20',
    badge: '🥇 1º Lugar'
  }, {
    name: 'Gabriel Santos',
    score: 96,
    missions: '20/20',
    badge: '🥈 2º Lugar'
  }, {
    name: 'Helena Costa',
    score: 94,
    missions: '19/20',
    badge: '🥉 3º Lugar'
  }, {
    name: 'Igor Almeida',
    score: 92,
    missions: '20/20',
    badge: '⭐ Top 5'
  }, {
    name: 'Júlia Ribeiro',
    score: 90,
    missions: '19/20',
    badge: '⭐ Top 5'
  }].map(student => \`
            <tr style="background: rgba(40, 199, 111, 0.04);">
              <td class="whitespace-no-wrap"><strong>\${student.name}</strong></td>
              <td class="text-center">
                <span class="badge-proficiency badge-advanced">Avançado</span>
              </td>
              <td class="text-center"><strong style="color: #28C76F; font-size: 16px;">\${student.score}%</strong></td>
              <td class="text-center">\${student.missions}</td>
              <td class="text-center">\${student.badge}</td>
            </tr>
          \`).join('')}
        </tbody>
      </table>

      <div style="margin-top: 24px; padding: 20px; background: rgba(40, 199, 111, 0.08); border-radius: 12px; border: 2px solid #28C76F;">
        <h4 style="color: #28C76F; margin-bottom: 12px;"><i class="bi bi-trophy-fill"></i> Parabéns à Turma!</h4>
        <p style="font-size: 14px; color: #5D596C;">
          Esta turma demonstrou excelente desempenho em todas as atividades propostas. 
          Todos os alunos atingiram proficiência avançada, com média geral de 94%.
        </p>
      </div>
    </div>
  \`
}`,...($=(A=r.parameters)==null?void 0:A.docs)==null?void 0:$.source}}};var w,C,B;i.parameters={...i.parameters,docs:{...(w=i.parameters)==null?void 0:w.docs,source:{originalSource:`{
  render: () => \`
    \${componentStyles}
    <div class="evidence-report-body">
      <div class="text-center">
        <h1 class="font-bold">Relatório de Acompanhamento</h1>
        <h2>Turma 8D - Requer atenção</h2>
        <p class="font-12 font-bold">Média geral: 58% - Abaixo do esperado</p>
      </div>

      <table class="performance-table">
        <thead>
          <tr>
            <th colspan="5" class="table-header-title" style="background: rgba(255, 159, 67, 0.12) !important; color: #FF9F43;">
              Desempenho Requer Atenção
            </th>
          </tr>
          <tr class="table-header-row">
            <th>Nome</th>
            <th class="text-center">Proficiência</th>
            <th class="text-center">Rendimento</th>
            <th class="text-center">Missões Pendentes</th>
            <th class="text-center">Recomendação</th>
          </tr>
        </thead>
        <tbody>
          \${[{
    name: 'Aluno A',
    proficiency: 'básico',
    score: 68,
    pending: 5,
    rec: 'Reforço'
  }, {
    name: 'Aluno B',
    proficiency: 'básico',
    score: 62,
    pending: 7,
    rec: 'Reforço'
  }, {
    name: 'Aluno C',
    proficiency: 'below-basic',
    score: 45,
    pending: 10,
    rec: 'Recuperação'
  }, {
    name: 'Aluno D',
    proficiency: 'básico',
    score: 58,
    pending: 8,
    rec: 'Acompanhamento'
  }].map(student => \`
            <tr style="background: rgba(255, 159, 67, 0.04);">
              <td>\${student.name}</td>
              <td class="text-center">
                <span class="badge-proficiency badge-\${student.proficiency === 'below-basic' ? 'below-basic' : 'basic'}">
                  \${student.proficiency === 'below-basic' ? 'Abaixo do Básico' : 'Básico'}
                </span>
              </td>
              <td class="text-center"><strong style="color: #FF9F43;">\${student.score}%</strong></td>
              <td class="text-center">\${student.pending}</td>
              <td class="text-center"><span style="font-size: 12px; font-weight: 600; color: #FF9F43;">\${student.rec}</span></td>
            </tr>
          \`).join('')}
        </tbody>
      </table>

      <div style="margin-top: 24px; padding: 20px; background: rgba(255, 159, 67, 0.08); border-radius: 12px; border: 2px solid #FF9F43;">
        <h4 style="color: #FF9F43; margin-bottom: 12px;"><i class="bi bi-exclamation-triangle-fill"></i> Ações Recomendadas</h4>
        <ul style="font-size: 14px; color: #5D596C; margin: 0; padding-left: 24px;">
          <li>Agendar aulas de reforço para alunos com proficiência básica ou abaixo</li>
          <li>Revisar conteúdos das missões pendentes em grupos menores</li>
          <li>Reunião com responsáveis para acompanhamento individual</li>
          <li>Planejar atividades complementares adaptadas ao nível atual</li>
        </ul>
      </div>
    </div>
  \`
}`,...(B=(C=i.parameters)==null?void 0:C.docs)==null?void 0:B.source}}};var z,R,P;d.parameters={...d.parameters,docs:{...(z=d.parameters)==null?void 0:z.docs,source:{originalSource:`{
  render: () => \`
    \${componentStyles}
    <style>
      .print-indicator {
        background: #E3F2FD;
        border: 2px solid #2196F3;
        border-radius: 8px;
        padding: 16px;
        margin-bottom: 20px;
        text-align: center;
        font-size: 14px;
        color: #1976D2;
      }
    </style>
    <div class="evidence-report-body" style="max-width: 210mm; padding: 20mm;">
      <div class="print-indicator">
        <strong>📄 Visualização de Impressão</strong> - Este relatório está formatado para A4 (210×297mm)
      </div>
      
      <div class="text-center">
        <h1 class="font-bold">Relatório Completo</h1>
        <h2>Evidências de Aprendizagem</h2>
      </div>

      <div class="report-info-card">
        <p><strong>Professor:</strong> Marcos Oliveira</p>
        <p><strong>Turma:</strong> 9º A - Integral</p>
        <p><strong>Período:</strong> Março a Maio 2024</p>
      </div>

      <table class="performance-table">
        <thead>
          <tr>
            <th colspan="4" class="table-header-title">Resumo de Desempenho</th>
          </tr>
          <tr class="table-header-row">
            <th>Métrica</th>
            <th class="text-center">Valor</th>
            <th class="text-center">Meta</th>
            <th class="text-center">Status</th>
          </tr>
        </thead>
        <tbody>
          \${[{
    metric: 'Média Geral',
    value: '8.5',
    goal: '7.0',
    status: 'success'
  }, {
    metric: 'Taxa de Aprovação',
    value: '95%',
    goal: '85%',
    status: 'success'
  }, {
    metric: 'Missões Completas',
    value: '18/20',
    goal: '15/20',
    status: 'success'
  }].map(row => \`
            <tr>
              <td><strong>\${row.metric}</strong></td>
              <td class="text-center">\${row.value}</td>
              <td class="text-center">\${row.goal}</td>
              <td class="text-center">
                <span class="badge-proficiency badge-\${row.status === 'success' ? 'proficient' : 'basic'}">
                  \${row.status === 'success' ? '✓ Atingido' : '⚠ Pendente'}
                </span>
              </td>
            </tr>
          \`).join('')}
        </tbody>
      </table>

      <div style="margin-top: 40px; padding-top: 20px; border-top: 2px solid #DBDADE; text-align: center; font-size: 12px; color: #6E6B7B;">
        <p>Documento gerado em \${new Date().toLocaleDateString('pt-BR')} às \${new Date().toLocaleTimeString('pt-BR')}</p>
        <p>Sistema Educacross - Plataforma de Gestão Escolar</p>
      </div>
    </div>
  \`
}`,...(P=(R=d.parameters)==null?void 0:R.docs)==null?void 0:P.source}}};var k,T,S;c.parameters={...c.parameters,docs:{...(k=c.parameters)==null?void 0:k.docs,source:{originalSource:`{
  render: () => {
    setTimeout(() => {
      const report = document.querySelector('.evidence-report-body');
      if (report) {
        report.style.cursor = 'pointer';
        report.addEventListener('click', e => {
          if (e.target.closest('.bar-item') || e.target.closest('.donut-chart')) {
            alert('Interação com gráfico!\\n\\nEm produção, isso abriria detalhes expandidos do gráfico com drill-down de dados por aluno.');
          }
        });
      }
    }, 100);
    return \`
      \${componentStyles}
      <style>
        .bar-item:hover {
          background: rgba(110, 99, 232, 0.04);
          border-radius: 8px;
          cursor: pointer;
          transition: background 0.2s;
        }
        .donut-chart:hover .donut-placeholder {
          transform: scale(1.05);
          transition: transform 0.3s;
          cursor: pointer;
        }
        .interaction-hint {
          background: #F4F3FF;
          border: 2px dashed #6E63E8;
          border-radius: 8px;
          padding: 12px;
          margin-bottom: 20px;
          text-align: center;
          font-size: 13px;
          color: #6E63E8;
          animation: pulse 2s ease-in-out infinite;
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.8; }
          50% { opacity: 1; }
        }
      </style>
      <div class="evidence-report-body">
        <div class="interaction-hint">
          💡 Clique nos gráficos para ver detalhes interativos
        </div>
        
        <div class="text-center">
          <h1 class="font-bold">Relatório Interativo</h1>
          <h2>Demonstração de funcionalidades</h2>
        </div>

        <div class="charts-container">
          <div class="chart-wrapper">
            <h4 class="font-semibold text-center text-body">Rendimento da turma</h4>
            <div class="donut-chart">
              <div class="donut-placeholder">
                <div class="donut-center">
                  <div class="donut-value">78%</div>
                  <div class="donut-label">Proficiente</div>
                </div>
              </div>
            </div>
          </div>
          
          <div class="chart-wrapper">
            <h4 class="font-semibold text-center text-body">Jogos finalizados</h4>
            <div class="bar-chart">
              <div class="bar-chart-placeholder">
                \${[{
      game: 'Desafio 1',
      value: 20,
      total: 25
    }, {
      game: 'Desafio 2',
      value: 18,
      total: 25
    }, {
      game: 'Desafio 3',
      value: 16,
      total: 25
    }].map(item => \`
                  <div class="bar-item">
                    <div class="bar-label">\${item.game}</div>
                    <div class="bar-track">
                      <div class="bar-fill" style="width: \${item.value / item.total * 100}%;">
                        \${item.value}/\${item.total}
                      </div>
                    </div>
                  </div>
                \`).join('')}
              </div>
            </div>
          </div>
        </div>

        <div style="margin-top: 24px; padding: 20px; background: rgba(110, 99, 232, 0.08); border-radius: 12px;">
          <h4 style="color: #6E63E8; margin-bottom: 12px;"><i class="bi bi-info-circle-fill"></i> Recursos Interativos</h4>
          <p style="font-size: 14px; color: #5D596C; margin: 0;">
            Em produção, este relatório permite exportar para PDF, compartilhar por email, 
            visualizar drill-down de dados por aluno, filtrar por período e comparar com trimestres anteriores.
          </p>
        </div>
      </div>
    \`;
  }
}`,...(S=(T=c.parameters)==null?void 0:T.docs)==null?void 0:S.source}}};const j=["Default","WithCharts","StudentList","EmptyData","HighPerformance","LowPerformance","PrintView","Interactive"];export{t as Default,o as EmptyData,r as HighPerformance,c as Interactive,i as LowPerformance,d as PrintView,s as StudentList,n as WithCharts,j as __namedExportsOrder,M as default};
