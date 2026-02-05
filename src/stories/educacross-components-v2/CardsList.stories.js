export default {
  title: 'Front-office/Lists/CardsList',
  tags: ['autodocs'],
  parameters: { layout: 'padded' }
};

const css = `.cards-list{display:grid;gap:20px;padding:24px}.list-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:24px;flex-wrap:wrap;gap:12px}.list-title{font-size:20px;font-weight:600;color:#3F3F46}.list-count{font-size:13px;color:#6E6B7B;margin-left:8px}.list-filters{display:flex;gap:8px;flex-wrap:wrap}.filter-btn{padding:8px 16px;border:1px solid #D8D6DE;border-radius:6px;background:#fff;font-size:13px;color:#6E6B7B;cursor:pointer;transition:.2s}.filter-btn:hover{border-color:#6E63E8}.filter-btn.active{background:#6E63E8;color:#fff;border-color:#6E63E8}.view-toggle{display:flex;gap:4px;border:1px solid #D8D6DE;border-radius:6px;padding:4px}.view-btn{padding:6px 12px;border:none;background:transparent;border-radius:4px;cursor:pointer;color:#6E6B7B;transition:.2s}.view-btn:hover{background:#F3F2F7}.view-btn.active{background:#6E63E8;color:#fff}.cards-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:16px}.cards-list-view{display:flex;flex-direction:column;gap:12px}.card-item{background:#fff;border:1px solid #D8D6DE;border-radius:8px;padding:16px;transition:.2s;cursor:pointer}.card-item:hover{border-color:#6E63E8;transform:translateY(-2px);box-shadow:0 4px 12px rgba(0,0,0,.08)}.card-header{display:flex;justify-content:space-between;align-items:start;margin-bottom:12px}.card-icon{width:40px;height:40px;border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:20px;flex-shrink:0}.card-status{padding:4px 10px;border-radius:12px;font-size:11px;font-weight:600;text-transform:uppercase}.status-open{background:#E8F5E9;color:#28C76F}.status-draft{background:#FFF3E0;color:#FF9F43}.status-closed{background:#F3F2F7;color:#6E6B7B}.card-title{font-size:15px;font-weight:600;color:#3F3F46;margin-bottom:6px}.card-subtitle{font-size:13px;color:#6E6B7B}.card-meta{display:flex;gap:16px;font-size:12px;color:#6E6B7B;margin-top:12px;padding-top:12px;border-top:1px solid #F3F2F7}.meta-item{display:flex;align-items:center;gap:6px}.list-empty{text-align:center;padding:80px 20px;color:#6E6B7B}.list-empty svg{width:100px;height:100px;opacity:0.3;margin-bottom:20px}`;

export const Default = {
  render: () => `
<div class="cards-list">
  <div class="list-header">
    <div>
      <span class="list-title">Missões</span>
      <span class="list-count">(12 missões)</span>
    </div>
    <div class="view-toggle">
      <button class="view-btn active"><i class="bi bi-grid-3x3-gap"></i></button>
      <button class="view-btn"><i class="bi bi-list-ul"></i></button>
    </div>
  </div>
  <div class="cards-grid">
    ${[
      { title: 'Frações Básicas', subject: 'Matemática', date: '10/02/2026', students: 28, status: 'open', icon: '📐', bg: '#E8F0FE' },
      { title: 'Verbos no Pretérito', subject: 'Português', date: '12/02/2026', students: 32, status: 'open', icon: '📖', bg: '#E8F5E9' },
      { title: 'Sistema Solar', subject: 'Ciências', date: '08/02/2026', students: 25, status: 'closed', icon: '🔬', bg: '#FFF3E0' },
      { title: 'Período Colonial', subject: 'História', date: '15/02/2026', students: 0, status: 'draft', icon: '📜', bg: '#F3E5F5' }
    ].map(m => `
      <div class="card-item">
        <div class="card-header">
          <div class="card-icon" style="background:${m.bg}">${m.icon}</div>
          <span class="card-status status-${m.status}">
            ${m.status === 'open' ? 'Aberta' : m.status === 'draft' ? 'Rascunho' : 'Encerrada'}
          </span>
        </div>
        <div class="card-title">${m.title}</div>
        <div class="card-subtitle">${m.subject}</div>
        <div class="card-meta">
          <div class="meta-item"><i class="bi bi-calendar3"></i> ${m.date}</div>
          <div class="meta-item"><i class="bi bi-people"></i> ${m.students} alunos</div>
        </div>
      </div>
    `).join('')}
  </div>
</div>
<style>${css}</style>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.0/font/bootstrap-icons.css">
`
};

export const ListaDeAlunos = {
  render: () => `
<div class="cards-list">
  <div class="list-header">
    <div>
      <span class="list-title">Alunos</span>
      <span class="list-count">(42 alunos)</span>
    </div>
    <div class="list-filters">
      <button class="filter-btn active">Todos</button>
      <button class="filter-btn">8º Ano A</button>
      <button class="filter-btn">8º Ano B</button>
    </div>
  </div>
  <div class="cards-grid">
    ${[
      { name: 'Ana Silva', class: '8º Ano A', grade: 9.8, attendance: 98, status: 'open', avatar: 'AS', color: '#6E63E8' },
      { name: 'Bruno Costa', class: '8º Ano A', grade: 9.5, attendance: 95, status: 'open', avatar: 'BC', color: '#00CFE8' },
      { name: 'Diana Santos', class: '8º Ano B', grade: 9.3, attendance: 92, status: 'open', avatar: 'DS', color: '#28C76F' },
      { name: 'Eduardo Lima', class: '8º Ano B', grade: 9.0, attendance: 88, status: 'open', avatar: 'EL', color: '#FF9F43' }
    ].map(s => `
      <div class="card-item">
        <div class="card-header">
          <div class="card-icon" style="background:${s.color};color:#fff;font-size:16px">${s.avatar}</div>
          <span class="card-status status-${s.status}">Ativo</span>
        </div>
        <div class="card-title">${s.name}</div>
        <div class="card-subtitle">${s.class}</div>
        <div class="card-meta">
          <div class="meta-item"><i class="bi bi-star-fill" style="color:#FFD700"></i> ${s.grade}</div>
          <div class="meta-item"><i class="bi bi-calendar-check"></i> ${s.attendance}%</div>
        </div>
      </div>
    `).join('')}
  </div>
</div>
<style>${css}</style>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.0/font/bootstrap-icons.css">
`
};

export const LayoutLista = {
  render: () => `
<div class="cards-list">
  <div class="list-header">
    <div>
      <span class="list-title">Missões</span>
      <span class="list-count">(8 missões)</span>
    </div>
    <div class="view-toggle">
      <button class="view-btn"><i class="bi bi-grid-3x3-gap"></i></button>
      <button class="view-btn active"><i class="bi bi-list-ul"></i></button>
    </div>
  </div>
  <div class="cards-list-view">
    ${[
      { title: 'Frações Básicas', subject: 'Matemática', date: '10/02/2026', students: 28, completed: 24, status: 'open' },
      { title: 'Verbos no Pretérito', subject: 'Português', date: '12/02/2026', students: 32, completed: 28, status: 'open' },
      { title: 'Sistema Solar', subject: 'Ciências', date: '08/02/2026', students: 25, completed: 25, status: 'closed' }
    ].map(m => `
      <div class="card-item" style="display:flex;align-items:center;gap:16px">
        <span class="card-status status-${m.status}">${m.status === 'open' ? 'Aberta' : 'Encerrada'}</span>
        <div style="flex:1">
          <div class="card-title">${m.title}</div>
          <div class="card-subtitle">${m.subject}</div>
        </div>
        <div class="card-meta" style="border:none;margin:0;padding:0">
          <div class="meta-item"><i class="bi bi-calendar3"></i> ${m.date}</div>
          <div class="meta-item"><i class="bi bi-people"></i> ${m.completed}/${m.students}</div>
        </div>
      </div>
    `).join('')}
  </div>
</div>
<style>${css}</style>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.0/font/bootstrap-icons.css">
`
};

export const ComFiltros = {
  render: () => `
<div class="cards-list">
  <div class="list-header">
    <div>
      <span class="list-title">Missões</span>
      <span class="list-count">(12 missões)</span>
    </div>
    <div class="list-filters">
      <button class="filter-btn active">Todas</button>
      <button class="filter-btn">Matemática</button>
      <button class="filter-btn">Português</button>
      <button class="filter-btn">Ciências</button>
    </div>
  </div>
  <div class="cards-grid" style="grid-template-columns:repeat(auto-fill,minmax(320px,1fr))">
    ${[
      { title: 'Frações e Decimais', subject: 'Matemática', progress: 85, students: 28, icon: '📐', bg: '#E8F0FE' },
      { title: 'Geometria Plana', subject: 'Matemática', progress: 72, students: 32, icon: '📐', bg: '#E8F0FE' },
      { title: 'Equações do 1º Grau', subject: 'Matemática', progress: 90, students: 28, icon: '📐', bg: '#E8F0FE' }
    ].map(m => `
      <div class="card-item">
        <div class="card-header">
          <div class="card-icon" style="background:${m.bg}">${m.icon}</div>
        </div>
        <div class="card-title">${m.title}</div>
        <div class="card-subtitle">${m.subject} • ${m.students} alunos</div>
        <div style="margin-top:12px">
          <div style="display:flex;justify-content:space-between;font-size:12px;color:#6E6B7B;margin-bottom:6px">
            <span>Progresso</span>
            <span style="font-weight:600;color:#6E63E8">${m.progress}%</span>
          </div>
          <div style="height:6px;background:#F3F2F7;border-radius:3px;overflow:hidden">
            <div style="height:100%;background:#6E63E8;width:${m.progress}%;transition:.3s"></div>
          </div>
        </div>
      </div>
    `).join('')}
  </div>
</div>
<style>${css}</style>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.0/font/bootstrap-icons.css">
`
};

export const TurmasGrid = {
  render: () => `
<div class="cards-list">
  <div class="list-header">
    <span class="list-title">Minhas Turmas</span>
  </div>
  <div class="cards-grid" style="grid-template-columns:repeat(auto-fill,minmax(250px,1fr))">
    ${[
      { name: '8º Ano A', students: 32, missions: 12, avg: 9.1, color: '#6E63E8' },
      { name: '8º Ano B', students: 28, missions: 10, avg: 8.7, color: '#00CFE8' },
      { name: '9º Ano A', students: 30, missions: 15, avg: 8.9, color: '#28C76F' }
    ].map(t => `
      <div class="card-item">
        <div style="width:100%;height:80px;background:${t.color};border-radius:6px;margin-bottom:12px;display:flex;align-items:center;justify-content:center;font-size:32px;color:#fff;font-weight:700">
          ${t.name.split(' ')[0]}<br/><span style="font-size:24px">${t.name.split(' ')[1]}</span>
        </div>
        <div class="card-title">${t.name}</div>
        <div class="card-meta" style="border:none;margin-top:8px;padding:0">
          <div class="meta-item"><i class="bi bi-people"></i> ${t.students}</div>
          <div class="meta-item"><i class="bi bi-clipboard-check"></i> ${t.missions}</div>
          <div class="meta-item"><i class="bi bi-star-fill" style="color:#FFD700"></i> ${t.avg}</div>
        </div>
      </div>
    `).join('')}
  </div>
</div>
<style>${css}</style>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.0/font/bootstrap-icons.css">
`
};

export const RecursosEducacionais = {
  render: () => `
<div class="cards-list">
  <div class="list-header">
    <span class="list-title">Recursos Disponíveis</span>
  </div>
  <div class="cards-grid">
    ${[
      { name: 'Projetor Multimídia', qty: 5, status: 'open', available: 3, icon: '📽️', bg: '#E8F0FE' },
      { name: 'Laboratório de Ciências', qty: 2, status: 'draft', available: 0, icon: '🔬', bg: '#E8F5E9' },
      { name: 'Quadra Esportiva', qty: 1, status: 'open', available: 1, icon: '⚽', bg: '#FFF3E0' },
      { name: 'Sala de Informática', qty: 3, status: 'open', available: 2, icon: '💻', bg: '#F3E5F5' }
    ].map(r => `
      <div class="card-item">
        <div class="card-header">
          <div class="card-icon" style="background:${r.bg}">${r.icon}</div>
          <span class="card-status ${r.available > 0 ? 'status-open' : 'status-draft'}">
            ${r.available > 0 ? 'Disponível' : 'Reservado'}
          </span>
        </div>
        <div class="card-title">${r.name}</div>
        <div class="card-subtitle">Quantidade: ${r.qty}</div>
        <div class="card-meta">
          <div class="meta-item"><i class="bi bi-check-circle"></i> ${r.available} disponíveis</div>
        </div>
      </div>
    `).join('')}
  </div>
</div>
<style>${css}</style>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.0/font/bootstrap-icons.css">
`
};

export const ConquistasAluno = {
  render: () => `
<div class="cards-list">
  <div class="list-header">
    <div>
      <span class="list-title">Conquistas Desbloqueadas</span>
      <span class="list-count">(37 badges)</span>
    </div>
  </div>
  <div class="cards-grid" style="grid-template-columns:repeat(auto-fill,minmax(200px,1fr))">
    ${[
      { name: 'Leitor Expert', desc: '50 leituras', rarity: 'legendary', icon: '📚', color: '#FFD700' },
      { name: 'Matemático', desc: '100 exercícios', rarity: 'epic', icon: '📐', color: '#9F7AEA' },
      { name: 'Cientista', desc: '30 experimentos', rarity: 'rare', icon: '🔬', color: '#00CFE8' },
      { name: 'Pontual', desc: '95% frequência', rarity: 'common', icon: '⏰', color: '#6E6B7B' }
    ].map(b => `
      <div class="card-item">
        <div style="text-align:center">
          <div style="width:80px;height:80px;margin:0 auto 12px;border-radius:50%;background:${b.color};display:flex;align-items:center;justify-content:center;font-size:40px;box-shadow:0 4px 12px ${b.color}40">
            ${b.icon}
          </div>
          <div class="card-title" style="text-align:center">${b.name}</div>
          <div class="card-subtitle" style="text-align:center">${b.desc}</div>
        </div>
      </div>
    `).join('')}
  </div>
</div>
<style>${css}</style>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.0/font/bootstrap-icons.css">
`
};

export const Vazio = {
  render: () => `
<div class="cards-list">
  <div class="list-header">
    <span class="list-title">Missões</span>
  </div>
  <div class="list-empty">
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14z"/>
      <path d="M7 10h2v7H7zm4-3h2v10h-2zm4 6h2v4h-2z"/>
    </svg>
    <div style="font-size:16px;font-weight:600;margin-bottom:8px">Nenhuma Missão Encontrada</div>
    <div style="font-size:14px">Crie sua primeira missão para começar</div>
  </div>
</div>
<style>${css}</style>
`
};
