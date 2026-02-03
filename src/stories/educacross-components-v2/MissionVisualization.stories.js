export default {
  title: 'Educacross Components V2/Missions/MissionVisualization',
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' }
};

const css = `.mission-visualization{background:#F6F6FB;min-height:100vh;padding:32px}.visual-wrapper{max-width:1200px;margin:0 auto;display:grid;gap:24px}.visual-header{display:flex;flex-wrap:wrap;gap:16px;align-items:center;justify-content:space-between;background:#fff;padding:24px;border-radius:16px;border:1px solid #E4E3F0;box-shadow:0 4px 18px rgba(31,45,91,.05)}.visual-title{font-size:24px;font-weight:700;color:#2F2B3D}.visual-tags{display:flex;flex-wrap:wrap;gap:10px}.visual-tag{padding:6px 12px;border-radius:999px;background:#F0EEFF;color:#6E63E8;font-weight:600;font-size:12px}.visual-toolbar{display:flex;flex-wrap:wrap;gap:10px}.toolbar-btn{padding:10px 18px;border-radius:10px;border:1px solid #D8D6DE;background:#fff;font-size:13px;color:#3F3F46;cursor:pointer;transition:.2s;display:flex;align-items:center;gap:8px}.toolbar-btn.active{background:#6E63E8;color:#fff;border-color:#6E63E8}.visual-card{background:#fff;border-radius:16px;border:1px solid #E4E3F0;box-shadow:0 6px 24px rgba(17,24,39,.06);padding:24px;display:grid;gap:20px}.timeline-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:18px}.timeline-step{border:1px solid #E4E3F0;border-radius:14px;padding:20px;display:grid;gap:12px;position:relative;overflow:hidden}.timeline-step::after{content:'';position:absolute;top:0;left:0;width:6px;height:100%;background:linear-gradient(180deg,#6E63E8,#A39BF4)}.step-label{font-size:12px;font-weight:600;color:#6E63E8;text-transform:uppercase;letter-spacing:.05em}.step-title{font-size:16px;font-weight:700;color:#2F2B3D}.step-content{font-size:13px;line-height:1.5;color:#514F5E}.progress-bar{height:8px;border-radius:999px;background:#E3E1F3;overflow:hidden}.progress-bar span{display:block;height:100%;background:linear-gradient(90deg,#6E63E8,#00CFE8)}.kanban-board{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:16px}.kanban-column{background:#F8F7FD;border-radius:14px;border:1px solid #E4E3F0;padding:18px;display:grid;gap:14px}.column-header{display:flex;justify-content:space-between;align-items:center;font-size:14px;font-weight:600;color:#3F3F46}.column-header span{font-size:12px;color:#6E6B7B}.kanban-card{background:#fff;border-radius:12px;padding:14px;border:1px solid #E4E3F0;display:grid;gap:8px;box-shadow:0 4px 12px rgba(31,45,91,.04)}.kanban-card strong{font-size:14px;color:#2F2B3D}.kanban-meta{font-size:12px;color:#6E6B7B;display:flex;justify-content:space-between}.badge{padding:3px 8px;border-radius:999px;font-size:11px;font-weight:600}.badge-success{background:#E3FCEC;color:#1F9D55}.badge-warning{background:#FFF4E5;color:#C05621}.badge-info{background:#E0F7FA;color:#0E7490}.insight-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:16px}.insight-card{padding:20px;border-radius:14px;border:1px solid #E4E3F0;background:#fff;display:grid;gap:8px}.insight-value{font-size:28px;font-weight:700;color:#6E63E8}.insight-label{font-size:12px;color:#6E6B7B;text-transform:uppercase}.visual-empty{background:#fff;border:2px dashed #D8D6DE;border-radius:16px;padding:80px 20px;text-align:center;color:#6E6B7B;display:grid;gap:16px}.visual-empty svg{width:160px;height:160px;margin:0 auto;opacity:.2}.compact-board{max-width:720px;margin:0 auto;display:grid;gap:12px}.compact-card{background:#fff;border:1px solid #E4E3F0;border-radius:12px;padding:16px;display:flex;justify-content:space-between;align-items:center}.compact-info{display:grid;gap:6px;font-size:13px;color:#3F3F46}.compact-progress{width:120px;height:6px;background:#E0DEF2;border-radius:999px;overflow:hidden}.compact-progress span{display:block;height:100%;background:#6E63E8}`;

const layout = (content) => `
<div class="mission-visualization">
  <div class="visual-wrapper">
    ${content}
  </div>
</div>
<style>${css}</style>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.0/font/bootstrap-icons.css">
`;

export const Default = {
  render: () => layout(`
    <div class="visual-header">
      <div>
        <div class="visual-title">Visão Geral da Missão: Investigadores da Água</div>
        <div style="font-size:13px;color:#6E6B7B">Acompanhamento pedagógico completo da missão transversal em Ciências e Geografia.</div>
      </div>
      <div class="visual-tags">
        <span class="visual-tag">32 alunos</span>
        <span class="visual-tag">4 fases</span>
        <span class="visual-tag">Evidências multimídia</span>
      </div>
      <div class="visual-toolbar">
        <button class="toolbar-btn active"><i class="bi bi-diagram-3"></i> Workflow</button>
        <button class="toolbar-btn"><i class="bi bi-kanban"></i> Kanban</button>
        <button class="toolbar-btn"><i class="bi bi-bar-chart"></i> Métricas</button>
        <button class="toolbar-btn"><i class="bi bi-geo-alt"></i> Trilhas</button>
      </div>
    </div>
    <div class="visual-card">
      <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:24px;flex-wrap:wrap">
        <div style="display:grid;gap:12px;min-width:260px">
          <div style="font-size:12px;color:#6E6B7B;text-transform:uppercase">Progresso Geral</div>
          <div class="progress-bar"><span style="width:74%"></span></div>
          <div style="font-size:13px;color:#3F3F46">23 de 32 alunos enviaram todas as etapas. 5 aguardam revisão da coordenação.</div>
        </div>
        <div class="insight-grid" style="flex:1">
          ${[
            { value: '74%', label: 'Concluído pela turma' },
            { value: '18', label: 'Evidências com feedback' },
            { value: '12h', label: 'Tempo médio de conclusão' }
          ].map(insight => `
            <div class="insight-card">
              <div class="insight-value">${insight.value}</div>
              <div class="insight-label">${insight.label}</div>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
    <div class="visual-card">
      <div style="display:flex;align-items:center;gap:12px">
        <i class="bi bi-diagram-3" style="color:#6E63E8;font-size:18px"></i>
        <div style="font-size:16px;font-weight:600;color:#2F2B3D">Fluxo por etapas</div>
      </div>
      <div class="timeline-grid">
        ${[
          { label: 'Etapa 1', title: 'Explorar o problema', description: 'Introdução ao tema consumo consciente de água com vídeos e debate.' },
          { label: 'Etapa 2', title: 'Pesquisa de campo', description: 'Levantamento de dados sobre consumo das famílias e escolas da região.' },
          { label: 'Etapa 3', title: 'Protótipo de solução', description: 'Construção de dispositivos para reaproveitamento de água da chuva.' },
          { label: 'Etapa 4', title: 'Apresentação pública', description: 'Pitch para comunidade escolar e publicação no mural digital.' }
        ].map(step => `
          <div class="timeline-step">
            <div class="step-label">${step.label}</div>
            <div class="step-title">${step.title}</div>
            <div class="step-content">${step.description}</div>
          </div>
        `).join('')}
      </div>
    </div>
  `)
};

export const LinhaDoTempo = {
  render: () => layout(`
    <div class="visual-card">
      <div style="display:flex;align-items:center;gap:12px">
        <i class="bi bi-clock-history" style="color:#6E63E8;font-size:18px"></i>
        <div style="font-size:16px;font-weight:600;color:#2F2B3D">Linha do Tempo • Missão Semanas Sustentáveis</div>
      </div>
      <div class="timeline-grid">
        ${[
          { period: 'Semana 1', focus: 'Sensibilização e diário de bordo digital', status: 'Concluída', color: '#28C76F', percent: 100 },
          { period: 'Semana 2', focus: 'Coleta de dados e entrevistas familiares', status: 'Em andamento', color: '#6E63E8', percent: 68 },
          { period: 'Semana 3', focus: 'Construção de protótipos em sala maker', status: 'Agendada', color: '#FF9F43', percent: 12 }
        ].map(slot => `
          <div class="timeline-step" style="padding-left:26px">
            <div class="step-label" style="color:${slot.color}">${slot.period}</div>
            <div class="step-title" style="color:#2F2B3D">${slot.focus}</div>
            <div class="progress-bar" style="background:#EAE9F5"><span style="width:${slot.percent}%;background:${slot.color}"></span></div>
            <div class="step-content" style="font-size:12px;color:#6E6B7B">Status: ${slot.status}</div>
          </div>
        `).join('')}
      </div>
    </div>
  `)
};

export const Kanban = {
  render: () => layout(`
    <div class="visual-card">
      <div style="display:flex;align-items:center;gap:12px">
        <i class="bi bi-kanban" style="color:#6E63E8;font-size:18px"></i>
        <div style="font-size:16px;font-weight:600;color:#2F2B3D">Kanban das equipes</div>
      </div>
      <div class="kanban-board">
        ${[
          { title: 'Planejamento', count: 4, items: ['Mapear recursos disponíveis', 'Selecionar líderes de equipe', 'Preparar checklists'] },
          { title: 'Em execução', count: 6, items: ['Coleta de água de chuva', 'Registro fotográfico', 'Entrevistas com moradores'] },
          { title: 'Revisão', count: 3, items: ['Avaliar planilhas', 'Dar feedback no app', 'Aprovar relatórios finais'] }
        ].map(column => `
          <div class="kanban-column">
            <div class="column-header">
              <span>${column.title}</span>
              <span>${column.count} cards</span>
            </div>
            ${column.items.map(task => `
              <div class="kanban-card">
                <strong>${task}</strong>
                <div class="kanban-meta">
                  <span class="badge badge-info">Equipe Azul</span>
                  <span><i class="bi bi-people"></i> 3 alunos</span>
                </div>
              </div>
            `).join('')}
          </div>
        `).join('')}
      </div>
    </div>
  `)
};

export const Checklist = {
  render: () => layout(`
    <div class="visual-card">
      <div style="display:flex;align-items:center;gap:12px">
        <i class="bi bi-ui-checks-grid" style="color:#6E63E8;font-size:18px"></i>
        <div style="font-size:16px;font-weight:600;color:#2F2B3D">Checklist de evidências • Equipe Aurora</div>
      </div>
      <div class="timeline-grid">
        ${[
          { name: 'Pesquisa teórica', status: 'Concluído', detail: 'Documentos anexados • versão 1.2', badge: 'badge-success' },
          { name: 'Experimento prático', status: 'Em revisão', detail: 'Feedback do professor registrado em 08/02', badge: 'badge-warning' },
          { name: 'Relato audiovisual', status: 'Pendente', detail: 'Enviar vídeo curto de até 2 minutos', badge: 'badge-info' }
        ].map(item => `
          <div class="timeline-step" style="padding-left:26px">
            <div class="step-title">${item.name}</div>
            <span class="badge ${item.badge}">${item.status}</span>
            <div class="step-content" style="font-size:12px;color:#6E6B7B">${item.detail}</div>
          </div>
        `).join('')}
      </div>
    </div>
  `)
};

export const Relatorio = {
  render: () => layout(`
    <div class="visual-card">
      <div style="display:flex;align-items:center;gap:12px">
        <i class="bi bi-clipboard-data" style="color:#6E63E8;font-size:18px"></i>
        <div style="font-size:16px;font-weight:600;color:#2F2B3D">Relatório para coordenação</div>
      </div>
      <div class="insight-grid">
        ${[
          { title: 'Participação ativa', value: '87%', detail: 'Alunos com pelo menos 2 interações na missão' },
          { title: 'Feedbacks respondidos', value: '92%', detail: 'Evidências com retorno dentro de 48h' },
          { title: 'Competência destaque', value: 'Colaboração', detail: '82% das equipes relataram trabalho cooperativo' },
          { title: 'Uso de tecnologia', value: '74 evidências', detail: 'Arquivos enviados via app mobile Educacross' }
        ].map(report => `
          <div class="insight-card">
            <div style="font-size:13px;font-weight:600;color:#3F3F46">${report.title}</div>
            <div class="insight-value" style="font-size:26px">${report.value}</div>
            <div style="font-size:12px;color:#6E6B7B">${report.detail}</div>
          </div>
        `).join('')}
      </div>
    </div>
  `)
};

export const Storyboard = {
  render: () => layout(`
    <div class="visual-card">
      <div style="display:flex;align-items:center;gap:12px">
        <i class="bi bi-film" style="color:#6E63E8;font-size:18px"></i>
        <div style="font-size:16px;font-weight:600;color:#2F2B3D">Storyboard da missão • Podcast histórico</div>
      </div>
      <div class="timeline-grid">
        ${[
          { label: 'Cena 1', title: 'Descoberta do tema', description: 'Estudantes gravam perguntas iniciais sobre o período colonial.' },
          { label: 'Cena 2', title: 'Pesquisa documental', description: 'Consulta a fontes históricas e entrevistas com especialistas.' },
          { label: 'Cena 3', title: 'Produção do roteiro', description: 'Equipe cria roteiro colaborativo no editor Educacross.' },
          { label: 'Cena 4', title: 'Edição e publicação', description: 'Podcast final com vinhetas e depoimentos publicado no mural.' }
        ].map(scene => `
          <div class="timeline-step" style="padding-left:26px">
            <div class="step-label">${scene.label}</div>
            <div class="step-title">${scene.title}</div>
            <div class="step-content">${scene.description}</div>
          </div>
        `).join('')}
      </div>
    </div>
  `)
};

export const Compacto = {
  render: () => layout(`
    <div class="compact-board">
      ${[
        { name: 'Missão Ambiental', progress: 86, due: 'Entrega 14/02 • 8º Ano B' },
        { name: 'Missão Empreendedorismo', progress: 42, due: 'Entrega 20/02 • 9º Ano A' },
        { name: 'Missão Ciências na Praça', progress: 65, due: 'Entrega 28/02 • 7º Ano B' }
      ].map(item => `
        <div class="compact-card">
          <div class="compact-info">
            <strong>${item.name}</strong>
            <span style="color:#6E6B7B">${item.due}</span>
            <div class="compact-progress"><span style="width:${item.progress}%"></span></div>
          </div>
          <span class="badge badge-info" style="background:#E0F2FE;color:#0369A1">${item.progress}% concluído</span>
        </div>
      `).join('')}
    </div>
  `)
};

export const Vazio = {
  render: () => layout(`
    <div class="visual-empty">
      <svg viewBox="0 0 32 32" fill="currentColor">
        <path d="M6 5a2 2 0 0 0-2 2v16.5a1.5 1.5 0 0 0 2.42 1.13L12 20l5.58 4.63A1.5 1.5 0 0 0 20 23.5V7a2 2 0 0 0-2-2H6zm8 7h4m-4 4h2" stroke="#fff" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      <div style="font-size:18px;font-weight:600">Nenhuma missão selecionada</div>
      <div style="font-size:14px">Crie uma nova visualização para acompanhar o progresso das suas missões ou selecione uma existente.</div>
      <button class="toolbar-btn active" style="justify-self:center"><i class="bi bi-plus-lg"></i> Criar visualização</button>
    </div>
  `)
};
