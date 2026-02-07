/**
 * GameDetailsModal - Modal de Detalhes de Jogo/Gamificação
 * ========================================================
 * Modal com detalhes completos de jogo educacional ou missão gamificada
 * 
 * @component GameDetailsModal
 * @category Educacross Components V2 / Modals
 * @source educacross-frontoffice (missões gamificadas)
 * @priority P2
 * @status PIXEL-PERFECT
 * @since 2.0.0
 */

export default {
  title: 'Front-office/Modals/GameDetailsModal',
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' }
};

const css = `.modal-backdrop{min-height:100vh;padding:40px;background:linear-gradient(135deg,#1E1D2F,#2C2B44,#1A1B2D);display:flex;align-items:center;justify-content:center}.modal-surface{width:760px;max-width:calc(100% - 48px);background:#fff;border-radius:18px;box-shadow:0 32px 80px rgba(15,23,42,.45);display:flex;flex-direction:column;overflow:hidden}.modal-header{padding:26px 28px;border-bottom:1px solid #F0EEF8;display:flex;flex-wrap:wrap;justify-content:space-between;gap:18px;align-items:flex-start}.modal-heading{display:grid;gap:8px}.modal-title{font-size:22px;font-weight:700;color:#2F2B3D}.modal-subtitle{font-size:13px;color:#6E6B7B}.chip-row{display:flex;flex-wrap:wrap;gap:8px}.chip{display:inline-flex;align-items:center;gap:6px;padding:6px 12px;border-radius:999px;font-size:11px;font-weight:600}.chip-primary{background:#E7E5FF;color:#675FEA}.chip-success{background:#E3FCEC;color:#1F9D55}.chip-warning{background:#FFF4E5;color:#C05621}.chip-info{background:#E0F7FA;color:#0E7490}.chip-dark{background:#E5E3F3;color:#433878}.modal-actions{display:flex;gap:10px;margin-left:auto}.modal-actions button{padding:8px 14px;border-radius:8px;border:1px solid #D8D6DE;background:#fff;color:#3F3F46;font-size:12px;font-weight:600;cursor:pointer;transition:.2s}.modal-actions button.primary{background:#6E63E8;color:#fff;border-color:#6E63E8}.modal-close{width:36px;height:36px;border-radius:10px;border:1px solid rgba(110,99,232,.25);background:#fff;color:#6E63E8;display:flex;align-items:center;justify-content:center;cursor:pointer}.modal-body{padding:26px 28px;display:grid;gap:20px}.section{display:grid;gap:12px}.section-title{font-size:15px;font-weight:600;color:#2F2B3D;display:flex;align-items:center;gap:8px}.section-title i{color:#6E63E8}.section-text{font-size:13px;line-height:1.6;color:#514F5E}.stats-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:14px}.stat-card{border:1px solid #E5E3F3;border-radius:12px;padding:14px;background:#FBFAFF;display:grid;gap:4px}.stat-label{font-size:11px;text-transform:uppercase;color:#6E6B7B;font-weight:600}.stat-value{font-size:20px;font-weight:700;color:#3F3F46}.progress-bar{height:6px;border-radius:999px;background:#E5E3F3;overflow:hidden}.progress-bar span{display:block;height:100%;background:linear-gradient(90deg,#6E63E8,#48C3F7)}.table{width:100%;border-collapse:collapse;font-size:13px}.table thead{background:#F6F5FE;text-transform:uppercase;font-size:11px;color:#6E63E8}.table th,.table td{padding:10px;border-bottom:1px solid #E5E3F3;text-align:left}.table tbody tr:hover{background:#F8F7FD}.badge{display:inline-flex;align-items:center;gap:6px;padding:4px 10px;border-radius:999px;font-size:11px;font-weight:600}.badge-gold{background:#FFF4D6;color:#C27803}.badge-silver{background:#F4F4F6;color:#4B5563}.badge-bronze{background:#FFE8D6;color:#9A5A2E}.list{display:grid;gap:10px}.list-item{border:1px solid #E5E3F3;border-radius:10px;padding:14px;background:#fff;display:flex;justify-content:space-between;align-items:center}.list-info{display:grid;gap:6px}.toggle-list{display:grid;gap:12px}.toggle-row{display:flex;justify-content:space-between;align-items:center;padding:12px;border:1px solid #E5E3F3;border-radius:10px;background:#FBFAFF}.toggle-row span{font-size:13px;color:#3F3F46;font-weight:600}.toggle-row small{color:#6E6B7B;font-size:11px}.switch{width:42px;height:22px;border-radius:999px;background:#E5E3F3;position:relative}.switch::after{content:'';width:18px;height:18px;border-radius:50%;background:#fff;position:absolute;top:2px;left:2px;transition:.2s}.switch.on{background:#6E63E8}.switch.on::after{left:22px}.modal-footer{padding:20px 28px;border-top:1px solid #F0EEF8;display:flex;flex-wrap:wrap;gap:10px;justify-content:space-between;font-size:12px;color:#6E6B7B}.empty{padding:70px 30px;text-align:center;border:2px dashed #D8D6DE;border-radius:16px;background:#F9F8FE;color:#6E6B7B}.empty svg{width:120px;height:120px;margin-bottom:18px;opacity:.3}.compact .modal-surface{width:520px}.compact .modal-header,.compact .modal-body,.compact .modal-footer{padding:20px 22px}.compact .chip-row{gap:6px}`;

const wrapModal = (content, extraClass = '') => `
<div class="modal-backdrop ${extraClass}">
  <div class="modal-surface">
    ${content}
  </div>
</div>
<style>${css}</style>
`;

export const Default = {
  render: () => wrapModal(`
    <div class="modal-header">
      <div class="modal-heading">
        <div class="modal-title">Game Center • Frações Intergalácticas</div>
        <div class="modal-subtitle">Desempenho atual das turmas no modo desafio cooperativo.</div>
        <div class="chip-row">
          <span class="chip chip-primary"><i class="bi bi-controller"></i> 4 turmas ativas</span>
          <span class="chip chip-success"><i class="bi bi-arrow-up"></i> +18% engajamento</span>
          <span class="chip chip-info"><i class="bi bi-clock-history"></i> Próxima rodada: amanhã</span>
        </div>
      </div>
      <div class="modal-actions">
        <button class="modal-close"><i class="bi bi-x-lg"></i></button>
        <button>Duplicar jogo</button>
        <button class="primary">Criar nova rodada</button>
      </div>
    </div>
    <div class="modal-body">
      <div class="section">
        <div class="section-title"><i class="bi bi-graph-up"></i> Indicadores principais</div>
        <div class="stats-grid">
          ${[
            { label: 'Pontuação média', value: '912 XP', percent: 72 },
            { label: 'Concluíram missão', value: '27 / 32', percent: 84 },
            { label: 'Tempo médio', value: '18min', percent: 58 }
          ].map(stat => `
            <div class="stat-card">
              <div class="stat-label">${stat.label}</div>
              <div class="stat-value">${stat.value}</div>
              <div class="progress-bar"><span style="width:${stat.percent}%"></span></div>
            </div>
          `).join('')}
        </div>
      </div>
      <div class="section">
        <div class="section-title"><i class="bi bi-trophy"></i> Destaques da semana</div>
        <div class="list">
          ${[
            { name: 'Equipe Astros - 8º Ano A', detail: '1º lugar • 1280 XP acumulados' },
            { name: 'Equipe Orbitas - 8º Ano B', detail: 'Missão concluída com todas as evidências' }
          ].map(item => `
            <div class="list-item">
              <div class="list-info">
                <strong>${item.name}</strong>
                <span style="font-size:12px;color:#6E6B7B">${item.detail}</span>
              </div>
              <span class="badge badge-gold"><i class="bi bi-star-fill"></i> Destaque</span>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
    <div class="modal-footer">
      <span><i class="bi bi-shield-check"></i> Avaliação automática habilitada</span>
      <div class="chip-row">
        <span class="chip chip-dark">Criado por Prof. Ricardo</span>
        <span class="chip chip-dark">Atualizado em 09/02 às 09h12</span>
      </div>
    </div>
  `)
};

export const RankingTurma = {
  render: () => wrapModal(`
    <div class="modal-header">
      <div class="modal-heading">
        <div class="modal-title">Ranking por turma • Rodada 5</div>
        <div class="chip-row">
          <span class="chip chip-primary"><i class="bi bi-people"></i> 32 estudantes</span>
          <span class="chip chip-warning"><i class="bi bi-flag"></i> Revisar empates</span>
        </div>
      </div>
      <div class="modal-actions">
        <button class="modal-close"><i class="bi bi-x-lg"></i></button>
        <button>Exportar CSV</button>
      </div>
    </div>
    <div class="modal-body">
      <table class="table">
        <thead>
          <tr><th>#</th><th>Aluno</th><th>Turma</th><th>XP acumulado</th><th>Badges</th></tr>
        </thead>
        <tbody>
          ${[
            { pos: 1, name: 'Ana Silva', class: '8º A', xp: '1480 XP', badge: '<span class="badge badge-gold"><i class="bi bi-trophy"></i> Lendária</span>' },
            { pos: 2, name: 'Bruno Costa', class: '8º B', xp: '1395 XP', badge: '<span class="badge badge-silver"><i class="bi bi-award"></i> Épica</span>' },
            { pos: 3, name: 'Diana Santos', class: '8º A', xp: '1310 XP', badge: '<span class="badge badge-bronze"><i class="bi bi-gem"></i> Rara</span>' },
            { pos: 4, name: 'Eduardo Lima', class: '8º B', xp: '1205 XP', badge: '<span class="badge badge-info"><i class="bi bi-lightning"></i> Mentor</span>' }
          ].map(row => `
            <tr>
              <td>${row.pos}</td>
              <td>${row.name}</td>
              <td>${row.class}</td>
              <td>${row.xp}</td>
              <td>${row.badge}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
      <div class="section-text" style="text-align:right">* Pontuação considera missões concluídas, tempo de resposta e bonus de colaboração.</div>
    </div>
    <div class="modal-footer">
      <span><i class="bi bi-info-circle"></i> Alunos empatados serão reavaliados na próxima rodada</span>
      <button class="primary" style="padding:8px 18px;border-radius:8px;background:#6E63E8;color:#fff;border:none;font-weight:600">Publicar no mural</button>
    </div>
  `)
};

export const PlanejamentoMissao = {
  render: () => wrapModal(`
    <div class="modal-header">
      <div class="modal-heading">
        <div class="modal-title">Planejamento da missão gamificada</div>
        <div class="modal-subtitle">Ajuste as etapas antes de liberar para as turmas.</div>
      </div>
      <div class="modal-actions">
        <button class="modal-close"><i class="bi bi-x-lg"></i></button>
        <button>Salvar rascunho</button>
        <button class="primary">Liberar missão</button>
      </div>
    </div>
    <div class="modal-body">
      <div class="section">
        <div class="section-title"><i class="bi bi-list-check"></i> Etapas configuradas</div>
        <div class="toggle-list">
          ${[
            { title: 'Introdução ao tabuleiro digital', desc: 'Vídeo tutorial com explicação do jogo', on: true },
            { title: 'Missão colaborativa', desc: 'Equipes com 4 alunos para resolver desafios', on: true },
            { title: 'Desafio bônus relâmpago', desc: 'Questões extras valendo XP dobrado', on: false }
          ].map(step => `
            <div class="toggle-row">
              <div>
                <span>${step.title}</span>
                <small>${step.desc}</small>
              </div>
              <div class="switch ${step.on ? 'on' : ''}"></div>
            </div>
          `).join('')}
        </div>
      </div>
      <div class="section">
        <div class="section-title"><i class="bi bi-people"></i> Turmas convidadas</div>
        <div class="list">
          ${[
            { name: '8º Ano A', detail: '32 alunos • segunda-feira às 10h' },
            { name: '8º Ano B', detail: '29 alunos • terça-feira às 14h' }
          ].map(turma => `
            <div class="list-item">
              <div class="list-info">
                <strong>${turma.name}</strong>
                <span style="font-size:12px;color:#6E6B7B">${turma.detail}</span>
              </div>
              <button class="modal-close" style="width:auto;padding:6px 12px"><i class="bi bi-pencil"></i> Editar</button>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
    <div class="modal-footer">
      <span><i class="bi bi-calendar-event"></i> Agenda sincronizada com painel pedagógico</span>
      <span><i class="bi bi-shield-exclamation"></i> Regras de privacidade revisadas</span>
    </div>
  `)
};

export const Recompensas = {
  render: () => wrapModal(`
    <div class="modal-header">
      <div class="modal-heading">
        <div class="modal-title">Recompensas e badges</div>
        <div class="modal-subtitle">Defina quais badges estão disponíveis nesta temporada.</div>
      </div>
      <div class="modal-actions">
        <button class="modal-close"><i class="bi bi-x-lg"></i></button>
        <button class="primary">Aplicar mudanças</button>
      </div>
    </div>
    <div class="modal-body">
      <div class="section">
        <div class="section-title"><i class="bi bi-gem"></i> Badges ativas</div>
        <div class="stats-grid">
          ${[
            { label: 'Guardião Lendário', value: 'Requer 2000 XP', color: '#FFD700' },
            { label: 'Mentor da Turma', value: 'Apoia 3 colegas', color: '#6E63E8' },
            { label: 'Velocista', value: 'Conclui em < 5 min', color: '#00CFE8' }
          ].map(badge => `
            <div class="stat-card" style="border-color:${badge.color}33;background:#fff">
              <div class="stat-label" style="color:${badge.color}">${badge.label}</div>
              <div class="stat-value" style="font-size:16px;color:#3F3F46">${badge.value}</div>
            </div>
          `).join('')}
        </div>
      </div>
      <div class="section">
        <div class="section-title"><i class="bi bi-award"></i> Recompensas extras</div>
        <div class="list">
          ${[
            { name: 'Passe VIP Maker', detail: 'Acesso extra à sala maker por 1 semana' },
            { name: 'Cartas de poder', detail: 'Itens especiais para próxima rodada' }
          ].map(reward => `
            <div class="list-item">
              <div class="list-info">
                <strong>${reward.name}</strong>
                <span style="font-size:12px;color:#6E6B7B">${reward.detail}</span>
              </div>
              <span class="chip chip-success">Disponível</span>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
    <div class="modal-footer">
      <span><i class="bi bi-emoji-smile"></i> Gamificação alinhada ao plano pedagógico</span>
      <span><i class="bi bi-journal-text"></i> Registro automático na ficha de competências</span>
    </div>
  `)
};

export const Estatisticas = {
  render: () => wrapModal(`
    <div class="modal-header">
      <div class="modal-heading">
        <div class="modal-title">Análises avançadas</div>
        <div class="modal-subtitle">Resumo dos indicadores das últimas 6 rodadas.</div>
      </div>
      <div class="modal-actions">
        <button class="modal-close"><i class="bi bi-x-lg"></i></button>
        <button>Exportar relatório</button>
      </div>
    </div>
    <div class="modal-body">
      <div class="section">
        <div class="section-title"><i class="bi bi-bar-chart"></i> Evolução de XP</div>
        <div class="section-text">Média geral por rodada (XP)</div>
        <div style="display:grid;grid-template-columns:repeat(6,1fr);gap:12px;align-items:end;height:140px;background:linear-gradient(180deg,#F8F7FD 0%,#fff 70%);padding:16px;border:1px solid #E5E3F3;border-radius:12px">
          ${[480,620,710,780,820,910].map(value => `
            <div style="background:linear-gradient(180deg,#6E63E8,#00CFE8);height:${value/11}px;border-radius:8px;position:relative">
              <span style="position:absolute;bottom:100%;left:50%;transform:translate(-50%, -6px);font-size:11px;color:#3F3F46">${value}</span>
            </div>
          `).join('')}
        </div>
      </div>
      <div class="section">
        <div class="section-title"><i class="bi bi-activity"></i> Indicadores de engajamento</div>
        <div class="stats-grid">
          ${[
            { label: 'Interações por aluno', value: '9.4', percent: 82 },
            { label: 'Feedback respondido', value: '94%', percent: 94 },
            { label: 'Uso mobile', value: '68%', percent: 68 }
          ].map(stat => `
            <div class="stat-card">
              <div class="stat-label">${stat.label}</div>
              <div class="stat-value">${stat.value}</div>
              <div class="progress-bar"><span style="width:${stat.percent}%"></span></div>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
    <div class="modal-footer">
      <span><i class="bi bi-lightbulb"></i> Sugestão: criar missão intermediária para turmas com menor XP</span>
    </div>
  `)
};

export const Configuracao = {
  render: () => wrapModal(`
    <div class="modal-header">
      <div class="modal-heading">
        <div class="modal-title">Configurações avançadas do jogo</div>
        <div class="chip-row">
          <span class="chip chip-info"><i class="bi bi-gear"></i> Versão 1.4</span>
          <span class="chip chip-warning"><i class="bi bi-exclamation-circle"></i> Mudanças impactam rodadas ativas</span>
        </div>
      </div>
      <div class="modal-actions">
        <button class="modal-close"><i class="bi bi-x-lg"></i></button>
        <button>Reverter</button>
        <button class="primary">Salvar configurações</button>
      </div>
    </div>
    <div class="modal-body">
      <div class="toggle-list">
        ${[
          { name: 'Ativar modo colaborativo', detail: 'Times com até 5 alunos por rodada', on: true },
          { name: 'Permitir dicas automáticas', detail: 'Libera 1 dica após 2 tentativas sem sucesso', on: true },
          { name: 'Bloquear respostas repetidas', detail: 'Evita spam de tentativas idênticas', on: true },
          { name: 'Ranking público', detail: 'Exibe ranking para alunos em tempo real', on: false }
        ].map(opt => `
          <div class="toggle-row">
            <div>
              <span>${opt.name}</span>
              <small>${opt.detail}</small>
            </div>
            <div class="switch ${opt.on ? 'on' : ''}"></div>
          </div>
        `).join('')}
      </div>
    </div>
    <div class="modal-footer">
      <span><i class="bi bi-check2-square"></i> Configurações sincronizadas com educacross-frontoffice</span>
    </div>
  `)
};

export const Compacto = {
  render: () => wrapModal(`
    <div class="modal-header">
      <div class="modal-heading">
        <div class="modal-title">Resumo rápido do jogo</div>
        <div class="modal-subtitle">Visualização compacta para dispositivos menores.</div>
      </div>
      <div class="modal-actions">
        <button class="modal-close"><i class="bi bi-x-lg"></i></button>
      </div>
    </div>
    <div class="modal-body">
      <div class="stats-grid">
        ${[
          { label: 'Equipes', value: '8' },
          { label: 'Rodadas', value: '6' },
          { label: 'XP médio', value: '840' }
        ].map(stat => `
          <div class="stat-card">
            <div class="stat-label">${stat.label}</div>
            <div class="stat-value">${stat.value}</div>
          </div>
        `).join('')}
      </div>
      <div class="section-text">Próxima atualização automática em 2 horas.</div>
    </div>
  `, 'compact')
};

export const Vazio = {
  render: () => wrapModal(`
    <div class="modal-body" style="padding:48px 32px">
      <div class="empty">
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M5 4h14a2 2 0 0 1 2 2v11.5a1.5 1.5 0 0 1-2.45 1.11L14 15.5l-4.55 3.11A1.5 1.5 0 0 1 7 17.5V6a2 2 0 0 1 2-2z"/>
          <path d="M9 9h6M9 12h4" stroke="#fff" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <div style="font-size:16px;font-weight:600">Nenhum jogo selecionado</div>
        <div style="font-size:13px">Escolha um jogo para visualizar desempenho ou crie uma nova experiência gamificada.</div>
        <button class="modal-actions button primary" style="margin-top:12px;padding:8px 16px;border:none;border-radius:8px;background:#6E63E8;color:#fff;font-weight:600;cursor:pointer">Criar jogo</button>
      </div>
    </div>
  `)
};
