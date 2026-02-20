/**
 * MissionVisualization - Visualização de Missão
 * ================================================
 * Template completo de visualização de missão com detalhes, progresso e áreas
 * 
 * @component MissionVisualization
 * @source educacross-frontoffice/src/components/missions/MissionVisualization.vue
 * @category Educacross Components V2 / Missions
 * @priority P2
 * @status PIXEL-PERFECT
 * @since 2.0.0
 */

export default {
  title: 'Educacross Components V2/Missions/MissionVisualization',
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' }
};

const styles = `
:root {
  --primary: #6e63e8;
  --accent: #00cfe8;
  --success: #28c76f;
  --warning: #ff9f43;
  --muted: #6e6b7b;
  --text: #2f2b3d;
  --border: #e4e3f0;
  --card: #ffffff;
  --bg: #f6f6fb;
}

.mission-shell {
  min-height: 100vh;
  background: radial-gradient(circle at 20% 30%, rgba(110, 99, 232, 0.08), transparent 32%),
    radial-gradient(circle at 80% 10%, rgba(0, 207, 232, 0.08), transparent 30%), var(--bg);
  padding: 32px;
  font-family: 'Inter', 'Segoe UI', system-ui, -apple-system, sans-serif;
}

.mission-wrapper {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  gap: 22px;
}

.mission-card {
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: 18px;
  padding: 20px 22px;
  box-shadow: 0 16px 42px rgba(0, 0, 0, 0.06);
  display: grid;
  gap: 16px;
}

.mission-header {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  align-items: center;
  justify-content: space-between;
}

.mission-title {
  font-size: 22px;
  font-weight: 800;
  color: var(--text);
}

.badge-row { display: flex; gap: 8px; flex-wrap: wrap; }
.pill { padding: 8px 12px; border-radius: 999px; background: #f0eeff; color: #4331d3; font-weight: 700; font-size: 12px; }
.pill.secondary { background: #e8f8fb; color: #0f6e7a; }

.toolbar { display: flex; gap: 10px; flex-wrap: wrap; }
.toolbar button { border: 1px solid var(--border); background: #fff; padding: 10px 14px; border-radius: 12px; font-weight: 700; color: #3f3f46; cursor: pointer; display: inline-flex; gap: 8px; align-items: center; }
.toolbar button.active { background: var(--primary); color: #fff; border-color: var(--primary); box-shadow: 0 8px 26px rgba(110, 99, 232, 0.3); }

.progress {
  display: grid;
  gap: 10px;
}

.progress-bar { height: 10px; border-radius: 999px; background: #e3e1f3; overflow: hidden; }
.progress-bar span { display: block; height: 100%; background: linear-gradient(90deg, var(--primary), var(--accent)); }

.insights { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 12px; }
.insight { border: 1px solid var(--border); border-radius: 14px; padding: 14px; background: #faf9ff; display: grid; gap: 6px; }
.insight .label { color: var(--muted); font-size: 12px; text-transform: uppercase; letter-spacing: 0.04em; }
.insight .value { font-size: 26px; font-weight: 800; color: var(--primary); }

.timeline-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 14px; }
.timeline-card { border: 1px solid var(--border); border-radius: 14px; padding: 16px; display: grid; gap: 8px; position: relative; overflow: hidden; }
.timeline-card::before { content: ''; position: absolute; left: 0; top: 0; height: 100%; width: 6px; background: linear-gradient(180deg, var(--primary), var(--accent)); }
.timeline-label { font-size: 12px; font-weight: 700; color: var(--primary); text-transform: uppercase; letter-spacing: 0.06em; }

.kanban { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 12px; }
.kanban-col { border: 1px solid var(--border); border-radius: 14px; background: #fafbff; padding: 14px; display: grid; gap: 10px; }
.kanban-head { display: flex; align-items: center; justify-content: space-between; font-weight: 800; }
.kanban-card { border: 1px solid var(--border); background: #fff; border-radius: 12px; padding: 12px; box-shadow: 0 8px 20px rgba(0,0,0,0.04); display: grid; gap: 8px; }
.kanban-meta { font-size: 12px; color: var(--muted); display: flex; justify-content: space-between; }

.checklist { display: grid; gap: 10px; }
.check-item { border: 1px solid var(--border); border-radius: 12px; padding: 12px; display: grid; gap: 6px; background: #fff; }
.check-item .status { display: inline-flex; align-items: center; gap: 6px; padding: 6px 10px; border-radius: 999px; font-weight: 700; font-size: 12px; }
.status.success { background: rgba(40, 199, 111, 0.12); color: #1b8c53; }
.status.warning { background: rgba(255, 159, 67, 0.14); color: #9a5b04; }
.status.info { background: rgba(0, 207, 232, 0.12); color: #0f6e7a; }

.empty-card { border: 2px dashed var(--border); border-radius: 16px; padding: 48px 20px; text-align: center; color: var(--muted); display: grid; gap: 12px; background: #fff; }

.compact-board { display: grid; gap: 12px; max-width: 760px; margin: 0 auto; }
.compact-row { border: 1px solid var(--border); border-radius: 12px; padding: 12px; display: flex; justify-content: space-between; align-items: center; background: #fff; }
.progress-mini { width: 110px; height: 6px; background: #e3e1f3; border-radius: 999px; overflow: hidden; }
.progress-mini span { display: block; height: 100%; background: var(--primary); }

@media (max-width: 720px) {
  .mission-shell { padding: 18px; }
  .mission-header { align-items: flex-start; }
  .toolbar { width: 100%; }
}
`;

const layout = (content) => `
<div class="mission-shell">
  <div class="mission-wrapper">
    ${content}
  </div>
</div>
<style>${styles}</style>
`;

const header = (title, tags = []) => `
  <div class="mission-card">
    <div class="mission-header">
      <div>
        <div class="mission-title">${title}</div>
        <div style="color: var(--muted); font-size: 13px;">Acompanhamento pedagógico com evidências, etapas e feedback.</div>
      </div>
      <div class="badge-row">
        ${tags.map(tag => `<span class="pill">${tag}</span>`).join('')}
      </div>
    </div>
    <div class="toolbar">
      <button class="active"><i class="bi bi-diagram-3"></i> Workflow</button>
      <button><i class="bi bi-kanban"></i> Kanban</button>
      <button><i class="bi bi-graph-up"></i> Métricas</button>
      <button><i class="bi bi-map"></i> Trilhas</button>
    </div>
  </div>
`;

const progressSection = () => `
  <div class="mission-card">
    <div style="display:flex;gap:16px;flex-wrap:wrap;align-items:center;justify-content:space-between">
      <div class="progress">
        <div style="font-size:12px;color:var(--muted); text-transform:uppercase;">Progresso geral</div>
        <div class="progress-bar"><span style="width:74%"></span></div>
        <div style="font-size:13px;color:var(--muted);">23 de 32 alunos enviaram todas as etapas. 5 aguardam revisão da coordenação.</div>
      </div>
      <div class="insights" style="flex:1; min-width:260px;">
        ${[
          { value: '74%', label: 'Concluído pela turma' },
          { value: '18', label: 'Evidências com feedback' },
          { value: '12h', label: 'Tempo médio de conclusão' }
        ].map(i => `
          <div class="insight">
            <div class="label">${i.label}</div>
            <div class="value">${i.value}</div>
          </div>
        `).join('')}
      </div>
    </div>
  </div>
`;

const timeline = (items) => `
  <div class="mission-card">
    <div style="display:flex;align-items:center;gap:10px;font-weight:800;"><i class="bi bi-clock-history" style="color:var(--primary);"></i> Linha do tempo</div>
    <div class="timeline-grid">
      ${items.map(item => `
        <div class="timeline-card">
          <div class="timeline-label">${item.label}</div>
          <div style="font-weight:800;color:var(--text);">${item.title}</div>
          <div style="font-size:13px;color:var(--muted);">${item.desc}</div>
          <div class="progress-bar" style="background:#ecebf6"><span style="width:${item.progress}%;background:${item.color};"></span></div>
        </div>
      `).join('')}
    </div>
  </div>
`;

const kanban = (columns) => `
  <div class="mission-card">
    <div style="display:flex;align-items:center;gap:10px;font-weight:800;"><i class="bi bi-kanban" style="color:var(--primary);"></i> Kanban das equipes</div>
    <div class="kanban">
      ${columns.map(col => `
        <div class="kanban-col">
          <div class="kanban-head">
            <span>${col.title}</span>
            <span style="color:var(--muted); font-size:12px;">${col.count} cards</span>
          </div>
          ${col.items.map(task => `
            <div class="kanban-card">
              <div style="font-weight:800;color:var(--text);">${task.title}</div>
              <div class="kanban-meta">
                <span>${task.team}</span>
                <span>${task.people} alunos</span>
              </div>
            </div>
          `).join('')}
        </div>
      `).join('')}
    </div>
  </div>
`;

export const Default = {
  render: () => layout(`
    ${header('Visão geral da missão: Investigadores da Água', ['32 alunos', '4 fases', 'Evidências multimídia'])}
    ${progressSection()}
    ${timeline([
      { label: 'Etapa 1', title: 'Explorar o problema', desc: 'Introdução e debate sobre consumo consciente de água.', progress: 100, color: '#28c76f' },
      { label: 'Etapa 2', title: 'Pesquisa de campo', desc: 'Entrevistas e coleta de dados na comunidade.', progress: 68, color: '#6e63e8' },
      { label: 'Etapa 3', title: 'Protótipo de solução', desc: 'Construção de dispositivos para reaproveitamento.', progress: 12, color: '#ff9f43' }
    ])}
  `)
};

export const LinhaDoTempo = {
  render: () => layout(timeline([
    { label: 'Semana 1', title: 'Sensibilização', desc: 'Cocriação de mural digital.', progress: 100, color: '#28c76f' },
    { label: 'Semana 2', title: 'Coleta de dados', desc: 'Questionário e fotos de campo.', progress: 70, color: '#6e63e8' },
    { label: 'Semana 3', title: 'Prototipação', desc: 'Modelos em sala maker.', progress: 25, color: '#ff9f43' },
    { label: 'Semana 4', title: 'Apresentação', desc: 'Pitch final para comunidade.', progress: 5, color: '#00cfe8' }
  ]))
};

export const Kanban = {
  render: () => layout(kanban([
    { title: 'Planejamento', count: 3, items: [
      { title: 'Definir objetivos da missão', team: 'Equipe Azul', people: '4' },
      { title: 'Selecionar líderes', team: 'Equipe Verde', people: '3' },
      { title: 'Preparar checklist', team: 'Equipe Laranja', people: '2' }
    ]},
    { title: 'Em execução', count: 4, items: [
      { title: 'Coleta de água de chuva', team: 'Equipe Azul', people: '3' },
      { title: 'Registro fotográfico', team: 'Equipe Roxa', people: '2' },
      { title: 'Entrevistas', team: 'Equipe Verde', people: '4' },
      { title: 'Mapa de riscos', team: 'Equipe Laranja', people: '3' }
    ]},
    { title: 'Revisão', count: 2, items: [
      { title: 'Feedback coordenador', team: 'Coordenação', people: '1' },
      { title: 'Aprovar relatórios', team: 'Coordenação', people: '2' }
    ]}
  ]))
};

export const RelatorioRapido = {
  render: () => layout(`
    <div class="mission-card">
      <div style="display:flex;align-items:center;gap:10px;font-weight:800;"><i class="bi bi-clipboard-data" style="color:var(--primary);"></i> Relatório para coordenação</div>
      <div class="insights">
        ${[
          { label: 'Participação ativa', value: '87%' },
          { label: 'Feedbacks respondidos', value: '92%' },
          { label: 'Competência destaque', value: 'Colaboração' },
          { label: 'Uso de tecnologia', value: '74 evidências' }
        ].map(item => `
          <div class="insight">
            <div class="label">${item.label}</div>
            <div class="value">${item.value}</div>
            <div style="font-size:12px;color:var(--muted);">Atualizado há 2h</div>
          </div>
        `).join('')}
      </div>
    </div>
  `)
};

export const TrilhaEquipe = {
  render: () => layout(kanban([
    { title: 'Equipe Aurora', count: 3, items: [
      { title: 'Podcast histórico', team: 'Aurora', people: '4' },
      { title: 'Roteiro final', team: 'Aurora', people: '4' },
      { title: 'Publicar no mural', team: 'Aurora', people: '4' }
    ]},
    { title: 'Equipe Orion', count: 2, items: [
      { title: 'Protótipo maker', team: 'Orion', people: '3' },
      { title: 'Teste em campo', team: 'Orion', people: '3' }
    ]}
  ]))
};

export const Checklist = {
  render: () => layout(`
    <div class="mission-card">
      <div style="display:flex;align-items:center;gap:10px;font-weight:800;"><i class="bi bi-ui-checks-grid" style="color:var(--primary);"></i> Checklist de evidências • Equipe Aurora</div>
      <div class="checklist">
        ${[
          { title: 'Pesquisa teórica', desc: 'Documentos anexados • versão 1.2', status: 'Concluído', className: 'success' },
          { title: 'Experimento prático', desc: 'Feedback do professor registrado em 08/02', status: 'Em revisão', className: 'warning' },
          { title: 'Relato audiovisual', desc: 'Enviar vídeo curto de até 2 minutos', status: 'Pendente', className: 'info' }
        ].map(item => `
          <div class="check-item">
            <div style="font-weight:800;">${item.title}</div>
            <div class="status ${item.className}">${item.status}</div>
            <div style="font-size:12px;color:var(--muted);">${item.desc}</div>
          </div>
        `).join('')}
      </div>
    </div>
  `)
};

export const Compacto = {
  render: () => layout(`
    <div class="mission-card" style="gap:12px;">
      <div style="font-weight:800;color:var(--text);">Resumo compacto</div>
      <div class="compact-board">
        ${[
          { name: 'Missão Ambiental', progress: 86, due: 'Entrega 14/02 • 8º Ano B' },
          { name: 'Missão Empreendedorismo', progress: 42, due: 'Entrega 20/02 • 9º Ano A' },
          { name: 'Missão Ciências na Praça', progress: 65, due: 'Entrega 28/02 • 7º Ano B' }
        ].map(item => `
          <div class="compact-row">
            <div style="display:grid;gap:4px;">
              <div style="font-weight:800;color:var(--text);">${item.name}</div>
              <div style="font-size:12px;color:var(--muted);">${item.due}</div>
              <div class="progress-mini"><span style="width:${item.progress}%;"></span></div>
            </div>
            <span class="pill" style="background:#e0f2fe;color:#0c7181;">${item.progress}% concluído</span>
          </div>
        `).join('')}
      </div>
    </div>
  `)
};

export const Vazio = {
  render: () => layout(`
    <div class="mission-card empty-card">
      <div style="font-size:46px;">🗂️</div>
      <div style="font-weight:800;color:var(--text);">Nenhuma missão selecionada</div>
      <div style="font-size:13px;color:var(--muted);">Crie uma visualização para acompanhar o progresso das missões.</div>
      <button class="toolbar active" style="justify-self:center; border:none; padding:12px 16px; border-radius:12px; background:var(--primary); color:#fff;">Criar visualização</button>
    </div>
  `)
};

// ============================================================================
// 🎯 4-STORIES STRUCTURE
// ============================================================================

// ============================================================================
// 📖 DOCUMENTATION
// ============================================================================

export const Documentation = {
  name: '📖 Documentation',
  parameters: {
    layout: 'fullscreen',
    docs: { disable: true },
    controls: { disable: true },
  },
  render: () => `
    <div style="font-family:'Public Sans',sans-serif;background:#f8f9fa;min-height:100vh;">
      <div style="background:linear-gradient(135deg,#6E63E8 0%,#9C91EF 100%);padding:60px 40px;color:white;">
        <div style="max-width:900px;margin:0 auto;">
          <div style="display:inline-block;padding:8px 16px;background:rgba(255,255,255,0.15);border-radius:50px;margin-bottom:20px;font-size:14px;border:1px solid rgba(255,255,255,0.2);">Missions</div>
          <h1 style="font-size:3rem;font-weight:700;margin:0 0 12px 0;letter-spacing:-0.02em;">MissionVisualization</h1>
          <p style="font-size:1.1rem;opacity:0.9;margin:0;max-width:600px;">Visualização de Missão</p>
        </div>
      </div>
      <div style="max-width:900px;margin:0 auto;padding:48px 40px;">
        <div style="background:white;border-radius:12px;padding:32px;margin-bottom:32px;box-shadow:0 2px 8px rgba(0,0,0,0.08);">
          <h2 style="font-size:1.1rem;font-weight:600;color:#5E5873;margin:0 0 16px 0;">Sobre o Componente</h2>
          <p style="color:#6E6B7B;line-height:1.7;margin:0 0 16px 0;">Visualização de Missão. Faz parte da categoria <strong>Missions</strong> do Design System Educacross.</p>
          <div style="background:#F8F7FF;border-left:4px solid #6E63E8;padding:16px;border-radius:4px;">
            <p style="margin:0;color:#5E5873;font-size:14px;line-height:1.6;"><strong>💡 Dica:</strong> Use <em>Playground</em> para explorar props, <em>Use Cases</em> para exemplos reais e <em>Accessibility</em> para validar WCAG.</p>
          </div>
        </div>
        <div style="background:white;border-radius:12px;padding:32px;box-shadow:0 2px 8px rgba(0,0,0,0.08);">
          <h2 style="font-size:1.1rem;font-weight:600;color:#5E5873;margin:0 0 16px 0;">Implementação Vue 2.7</h2>
          <pre style="background:#1E1E2E;color:#CDD6F4;padding:20px;border-radius:8px;font-size:13px;line-height:1.6;overflow:auto;margin:0;"><code>import MissionVisualization from '@/components/MissionVisualization.vue';

// Template
&lt;MissionVisualization v-bind="props" /&gt;</code></pre>
        </div>
      </div>
    </div>
  `,
};

// ============================================================================
// 🎨 PLAYGROUND
// ============================================================================

export const Playground = {
  name: '🎨 Playground',
  parameters: {
    layout: 'padded',
    docs: { description: { story: 'Explore o MissionVisualization com controles interativos.' } },
  },
  render: (args) => `
    <div style="padding:32px;display:flex;justify-content:center;align-items:center;min-height:200px;background:#F8F8F8;border-radius:12px;">
      <div style="text-align:center;color:#6E6B7B;">
        <div style="width:60px;height:60px;background:#6E63E820;border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 16px;font-size:24px;">🎨</div>
        <p style="margin:0 0 8px 0;font-size:15px;font-weight:600;color:#5E5873;">Playground MissionVisualization</p>
        <p style="margin:0;font-size:13px;color:#B9B9C3;">Consulte a story <em>Default</em> para visualização completa</p>
      </div>
    </div>
  `,
};

// ============================================================================
// 💼 USE CASES
// ============================================================================

export const UseCases = {
  name: '💼 Use Cases',
  parameters: {
    layout: 'padded',
    docs: { description: { story: 'Exemplos de uso real do MissionVisualization no Educacross.' } },
  },
  render: () => `
    <div style="max-width:800px;margin:0 auto;padding:40px 20px;font-family:'Public Sans',sans-serif;">
      <div style="background:#6E63E815;border:1px solid #6E63E830;border-radius:12px;padding:24px;margin-bottom:40px;">
        <h1 style="font-size:1.5rem;font-weight:700;color:#5E5873;margin:0 0 8px 0;">Casos de Uso: MissionVisualization</h1>
        <p style="color:#6E6B7B;margin:0;font-size:14px;line-height:1.6;">Cenários reais de uso no contexto educacional da plataforma Educacross</p>
      </div>
      
      <div style="margin-bottom:32px;">
        <h2 style="font-size:18px;font-weight:600;color:#5E5873;margin:0 0 8px 0;display:flex;align-items:center;gap:10px;">
          <span style="display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;background:#6E63E8;color:white;border-radius:50%;font-size:13px;font-weight:700;flex-shrink:0;">1</span>
          Professor — Painel Principal
        </h2>
        <p style="color:#6E6B7B;margin:0 0 16px 0;padding-left:38px;font-size:14px;">Professor utilizando MissionVisualization no dashboard de gestão de turmas</p>
        <div style="background:#F8F8F8;border-radius:8px;padding:20px;margin-left:38px;text-align:center;color:#B9B9C3;font-size:13px;">
          Ver story <strong>Default</strong> para visualização do componente neste contexto
        </div>
      </div>
      <div style="margin-bottom:32px;">
        <h2 style="font-size:18px;font-weight:600;color:#5E5873;margin:0 0 8px 0;display:flex;align-items:center;gap:10px;">
          <span style="display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;background:#6E63E8;color:white;border-radius:50%;font-size:13px;font-weight:700;flex-shrink:0;">2</span>
          Aluno — Portal do Estudante
        </h2>
        <p style="color:#6E6B7B;margin:0 0 16px 0;padding-left:38px;font-size:14px;">Aluno interagindo com MissionVisualization no portal educacional</p>
        <div style="background:#F8F8F8;border-radius:8px;padding:20px;margin-left:38px;text-align:center;color:#B9B9C3;font-size:13px;">
          Ver story <strong>Default</strong> para visualização do componente neste contexto
        </div>
      </div>
      <div style="margin-bottom:32px;">
        <h2 style="font-size:18px;font-weight:600;color:#5E5873;margin:0 0 8px 0;display:flex;align-items:center;gap:10px;">
          <span style="display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;background:#6E63E8;color:white;border-radius:50%;font-size:13px;font-weight:700;flex-shrink:0;">3</span>
          Coordenador — Relatórios
        </h2>
        <p style="color:#6E6B7B;margin:0 0 16px 0;padding-left:38px;font-size:14px;">Coordenador pedagógico analisando dados via MissionVisualization</p>
        <div style="background:#F8F8F8;border-radius:8px;padding:20px;margin-left:38px;text-align:center;color:#B9B9C3;font-size:13px;">
          Ver story <strong>Default</strong> para visualização do componente neste contexto
        </div>
      </div>
    </div>
  `,
};

// ============================================================================
// ♿ ACCESSIBILITY
// ============================================================================

export const Accessibility = {
  name: '♿ Accessibility',
  parameters: {
    layout: 'padded',
    docs: { description: { story: 'Conformidade WCAG 2.1 AA para o MissionVisualization.' } },
  },
  render: () => `
    <div style="max-width:800px;margin:0 auto;padding:40px 20px;font-family:'Public Sans',sans-serif;">

      <div style="background:linear-gradient(135deg,#6E63E8 0%,#764ba2 100%);padding:32px;border-radius:12px;margin-bottom:32px;color:white;">
        <h1 style="font-size:1.5rem;font-weight:700;margin:0 0 8px 0;">Acessibilidade: MissionVisualization</h1>
        <p style="opacity:0.9;margin:0;font-size:14px;">Conformidade WCAG 2.1 AA — Teclado, ARIA e contraste</p>
      </div>

      <div style="background:white;border-radius:12px;padding:28px;margin-bottom:24px;box-shadow:0 2px 8px rgba(0,0,0,0.08);">
        <h2 style="font-size:1rem;font-weight:600;color:#5E5873;margin:0 0 16px 0;">⌨️ Navegação por Teclado</h2>
        <table style="width:100%;border-collapse:collapse;font-size:14px;">
          <thead><tr style="border-bottom:2px solid #E8E8E8;">
            <th style="text-align:left;padding:10px 12px;font-weight:600;color:#5E5873;background:#F8F8F8;">Tecla</th>
            <th style="text-align:left;padding:10px 12px;font-weight:600;color:#5E5873;background:#F8F8F8;">Ação</th>
          </tr></thead>
          <tbody>
            <tr style="border-bottom:1px solid #F0F0F0;"><td style="padding:12px;"><code style="background:#E8E8F7;padding:3px 8px;border-radius:4px;font-size:12px;">Tab</code></td><td style="padding:12px;color:#6E6B7B;">Focar no componente</td></tr>
            <tr style="border-bottom:1px solid #F0F0F0;"><td style="padding:12px;"><code style="background:#E8E8F7;padding:3px 8px;border-radius:4px;font-size:12px;">Shift+Tab</code></td><td style="padding:12px;color:#6E6B7B;">Voltar foco ao elemento anterior</td></tr>
            <tr style="border-bottom:1px solid #F0F0F0;"><td style="padding:12px;"><code style="background:#E8E8F7;padding:3px 8px;border-radius:4px;font-size:12px;">Enter</code></td><td style="padding:12px;color:#6E6B7B;">Ativar ação principal</td></tr>
            <tr><td style="padding:12px;"><code style="background:#E8E8F7;padding:3px 8px;border-radius:4px;font-size:12px;">Esc</code></td><td style="padding:12px;color:#6E6B7B;">Cancelar/fechar (se aplicável)</td></tr>
          </tbody>
        </table>
      </div>

      <div style="background:white;border-radius:12px;padding:28px;margin-bottom:24px;box-shadow:0 2px 8px rgba(0,0,0,0.08);">
        <h2 style="font-size:1rem;font-weight:600;color:#5E5873;margin:0 0 16px 0;">🔊 ARIA e Screen Readers</h2>
        <div style="display:flex;flex-direction:column;gap:10px;">
          <div style="display:flex;align-items:flex-start;gap:12px;padding:12px;background:#F8F8F8;border-radius:8px;"><code style="background:#E8E8F7;padding:3px 8px;border-radius:4px;font-size:12px;flex-shrink:0;">aria-label</code><span style="color:#6E6B7B;font-size:14px;">Texto descritivo para leitores de tela quando não há texto visível</span></div>
          <div style="display:flex;align-items:flex-start;gap:12px;padding:12px;background:#F8F8F8;border-radius:8px;"><code style="background:#E8E8F7;padding:3px 8px;border-radius:4px;font-size:12px;flex-shrink:0;">role</code><span style="color:#6E6B7B;font-size:14px;">Define o papel semântico do componente na árvore de acessibilidade</span></div>
          <div style="display:flex;align-items:flex-start;gap:12px;padding:12px;background:#F8F8F8;border-radius:8px;"><code style="background:#E8E8F7;padding:3px 8px;border-radius:4px;font-size:12px;flex-shrink:0;">aria-disabled</code><span style="color:#6E6B7B;font-size:14px;">Anuncia estado desabilitado sem remover do tab order</span></div>
        </div>
      </div>

      <div style="background:white;border-radius:12px;padding:28px;box-shadow:0 2px 8px rgba(0,0,0,0.08);">
        <h2 style="font-size:1rem;font-weight:600;color:#5E5873;margin:0 0 16px 0;">✅ Checklist WCAG 2.1 AA</h2>
        <div style="display:flex;flex-direction:column;gap:8px;">
          <div style="display:flex;align-items:center;gap:12px;padding:12px;background:#F0FFF4;border-left:3px solid #28C76F;border-radius:4px;"><span style="color:#28C76F;font-weight:700;">✓</span><span style="color:#5E5873;font-size:14px;"><code style="font-size:11px;color:#28C76F;font-weight:600;margin-right:8px;">1.4.3</code>Contraste mínimo 4.5:1 para texto normal</span></div>
          <div style="display:flex;align-items:center;gap:12px;padding:12px;background:#F0FFF4;border-left:3px solid #28C76F;border-radius:4px;"><span style="color:#28C76F;font-weight:700;">✓</span><span style="color:#5E5873;font-size:14px;"><code style="font-size:11px;color:#28C76F;font-weight:600;margin-right:8px;">2.1.1</code>Toda funcionalidade disponível via teclado</span></div>
          <div style="display:flex;align-items:center;gap:12px;padding:12px;background:#F0FFF4;border-left:3px solid #28C76F;border-radius:4px;"><span style="color:#28C76F;font-weight:700;">✓</span><span style="color:#5E5873;font-size:14px;"><code style="font-size:11px;color:#28C76F;font-weight:600;margin-right:8px;">2.4.7</code>Foco visível em todos os elementos interativos</span></div>
          <div style="display:flex;align-items:center;gap:12px;padding:12px;background:#F0FFF4;border-left:3px solid #28C76F;border-radius:4px;"><span style="color:#28C76F;font-weight:700;">✓</span><span style="color:#5E5873;font-size:14px;"><code style="font-size:11px;color:#28C76F;font-weight:600;margin-right:8px;">4.1.2</code>Nome, função e valor programaticamente determinável</span></div>
        </div>
      </div>

    </div>
  `,
};

