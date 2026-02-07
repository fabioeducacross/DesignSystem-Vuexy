/**
 * StudentGameDetailsModal - Modal de Detalhes do Jogo do Aluno
 * =============================================================
 * Modal para exibir detalhes completos do progresso em missões gamificadas
 * 
 * @component StudentGameDetailsModal
 * @category Educacross Components V2 / Modals
 * @source educacross-frontoffice (relatórios de missões)
 * @priority P2
 * @status PIXEL-PERFECT
 * @since 2.0.0
 */

export default {
  title: 'Front-office/Modals/StudentGameDetailsModal',
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' }
};

const css = `.student-backdrop{min-height:100vh;padding:36px;background:linear-gradient(135deg,#181B2F,#222645,#181B2F);display:flex;align-items:center;justify-content:center}.student-modal{width:640px;max-width:calc(100% - 40px);background:#fff;border-radius:20px;box-shadow:0 28px 70px rgba(12,20,38,.55);overflow:hidden;display:flex;flex-direction:column}.student-header{padding:24px 26px;border-bottom:1px solid #F1F0F7;background:linear-gradient(135deg,#6E63E8,#4F46E5);color:#fff;display:flex;flex-wrap:wrap;gap:16px;justify-content:space-between;align-items:flex-start}.student-title{font-size:20px;font-weight:700}.student-meta{display:flex;flex-wrap:wrap;gap:8px;font-size:12px}.student-meta span{padding:4px 10px;border-radius:999px;background:rgba(255,255,255,.15);border:1px solid rgba(255,255,255,.3);font-weight:600}.student-close{width:34px;height:34px;border-radius:10px;border:1px solid rgba(255,255,255,.4);background:rgba(255,255,255,.12);color:#fff;display:flex;align-items:center;justify-content:center;cursor:pointer}.student-body{padding:24px 26px;display:grid;gap:18px}.student-section{display:grid;gap:10px}.student-section-title{font-size:15px;font-weight:600;color:#2F2B3D;display:flex;align-items:center;gap:8px}.student-section-title i{color:#6E63E8}.student-text{font-size:13px;line-height:1.6;color:#514F5E}.progress-track{display:flex;gap:10px}.progress-step{flex:1;padding:12px;border-radius:12px;border:1px solid #E5E3F3;display:grid;gap:6px;background:#FBFAFF}.progress-title{font-size:13px;font-weight:600;color:#3F3F46}.progress-status{font-size:12px;color:#6E6B7B}.pill{display:inline-flex;align-items:center;gap:6px;padding:4px 10px;border-radius:999px;font-size:11px;font-weight:600;background:#E6E4FF;color:#5146E0}.card{border:1px solid #E5E3F3;border-radius:12px;padding:16px;background:#fff;display:grid;gap:8px}.card-header{display:flex;justify-content:space-between;align-items:center}.card-value{font-size:18px;font-weight:700;color:#3F3F46}.timeline{display:grid;gap:12px}.timeline-item{display:flex;gap:12px;align-items:flex-start;padding:12px;border-radius:10px;background:#F8F7FD;border:1px solid #E5E3F3}.timeline-icon{width:32px;height:32px;border-radius:10px;background:#6E63E8;color:#fff;display:flex;align-items:center;justify-content:center;font-size:16px}.feedback-box{border-radius:12px;padding:18px;background:#F4F3FF;border:1px solid #E1DFFE;color:#3F3F46;display:grid;gap:10px}.badge-collection{display:flex;flex-wrap:wrap;gap:10px}.badge-card{width:82px;height:82px;border-radius:14px;background:#F4F3FF;color:#433878;display:flex;flex-direction:column;align-items:center;justify-content:center;font-size:13px;font-weight:600;border:1px solid #E1DFFE}.badge-card span{font-size:11px;font-weight:500;color:#6E6B7B;margin-top:4px}.callout{padding:14px;border-radius:12px;border:1px solid rgba(110,99,232,.3);background:#F8F7FD;color:#433878;font-size:12px;font-weight:600;display:flex;align-items:center;gap:8px}.student-footer{padding:18px 26px;border-top:1px solid #F1F0F7;background:#F9F8FE;display:flex;flex-wrap:wrap;gap:10px;justify-content:space-between;font-size:12px;color:#6E6B7B}.compact .student-modal{width:420px}.empty{padding:60px 24px;text-align:center;border:2px dashed #D8D6DE;border-radius:16px;background:#F9F8FE;color:#6E6B7B;display:grid;gap:12px}.empty svg{width:120px;height:120px;margin:0 auto;opacity:.3}`;

const renderModal = (content, extra = '') => `
<div class="student-backdrop ${extra}">
  <div class="student-modal">
    ${content}
  </div>
</div>
<style>${css}</style>
`;

const header = (title, meta = []) => `
  <div class="student-header">
    <div>
      <div class="student-title">${title}</div>
      <div class="student-meta">
        ${meta.map(text => `<span>${text}</span>`).join('')}
      </div>
    </div>
    <div class="student-close"><i class="bi bi-x-lg"></i></div>
  </div>
`;

export const Default = {
  render: () => renderModal(`
    ${header('Seu progresso no jogo • Frações Intergalácticas', ['Missão ativa', 'XP total: 1280', 'Equipe Cosmos'])}
    <div class="student-body">
      <div class="student-section">
        <div class="student-section-title"><i class="bi bi-flag"></i> Etapas da missão</div>
        <div class="progress-track">
          ${[
            { title: 'Explorar tutorial', status: 'Concluído', done: true },
            { title: 'Desafios cooperativos', status: 'Em andamento', done: true },
            { title: 'Quiz relâmpago', status: 'Faltam 2 questões', done: false }
          ].map(step => `
            <div class="progress-step" style="border-color:${step.done ? '#6E63E8' : '#E5E3F3'}">
              <div class="progress-title">${step.title}</div>
              <div class="progress-status">${step.status}</div>
              <span class="pill">${step.done ? '✔ Completo' : 'Em progresso'}</span>
            </div>
          `).join('')}
        </div>
      </div>
      <div class="student-section">
        <div class="student-section-title"><i class="bi bi-graph-up"></i> Estatísticas pessoais</div>
        <div class="card">
          <div class="card-header">
            <span style="font-size:13px;color:#6E6B7B">Pontuação desta rodada</span>
            <span class="card-value">420 XP</span>
          </div>
          <div class="student-text">Você ganhou +80 XP por colaborar com a equipe e +40 XP por concluir o desafio bônus.</div>
        </div>
      </div>
    </div>
    <div class="student-footer">
      <span><i class="bi bi-lightbulb"></i> Próxima dica libera às 19h</span>
      <span><i class="bi bi-chat-dots"></i> Feedback disponível na caixa de mensagens</span>
    </div>
  `)
};

export const MissoesParciais = {
  render: () => renderModal(`
    ${header('Missões em andamento', ['2 de 4 concluídas', 'Tempo estimado restante: 35 min'])}
    <div class="student-body">
      <div class="student-section">
        <div class="student-section-title"><i class="bi bi-list-check"></i> Próximos passos</div>
        <div class="timeline">
          ${[
            { icon: 'bi-journal-text', title: 'Registrar diário de bordo', desc: 'Conte o que sua equipe descobriu sobre frações equivalentes.' },
            { icon: 'bi-camera-video', title: 'Enviar vídeo curto', desc: 'Explique a solução do enigma 3 usando exemplos do cotidiano.' },
            { icon: 'bi-upload', title: 'Upload da evidência final', desc: 'Anexe o arquivo PDF com todas as etapas resolvidas.' }
          ].map(item => `
            <div class="timeline-item">
              <div class="timeline-icon"><i class="bi ${item.icon}"></i></div>
              <div>
                <div style="font-size:13px;font-weight:600;color:#3F3F46">${item.title}</div>
                <div class="student-text" style="font-size:12px">${item.desc}</div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `)
};

export const Conquistas = {
  render: () => renderModal(`
    ${header('Suas conquistas liberadas', ['Total de badges: 6', 'Próxima recompensa em 120 XP'])}
    <div class="student-body">
      <div class="student-section">
        <div class="student-section-title"><i class="bi bi-award"></i> Badges conquistadas</div>
        <div class="badge-collection">
          ${[
            { icon: '🚀', name: 'Explorador', label: 'Primeira missão' },
            { icon: '🧠', name: 'Estrategista', label: 'Plano da equipe' },
            { icon: '⚡', name: 'Velocista', label: 'Quiz em <5min' },
            { icon: '🤝', name: 'Mentor', label: 'Ajudou colegas' }
          ].map(badge => `
            <div class="badge-card">
              <span style="font-size:28px">${badge.icon}</span>
              ${badge.name}
              <span>${badge.label}</span>
            </div>
          `).join('')}
        </div>
      </div>
      <div class="callout"><i class="bi bi-gift"></i> Complete 2 desafios extras para liberar a badge lendária.</div>
    </div>
  `)
};

export const FeedbackProfessor = {
  render: () => renderModal(`
    ${header('Feedback do professor', ['Profª Camila', 'Enviado em 09/02 às 11h'])}
    <div class="student-body">
      <div class="feedback-box">
        <div style="font-size:13px;font-weight:600">Parabéns pelo trabalho em equipe!</div>
        <div class="student-text">Vocês foram muito criativos ao relacionar frações com receitas. Para fortalecer ainda mais, adicione um exemplo envolvendo medidas de litros e garrafas. Revise também a legenda do gráfico para reforçar interpretação de dados.</div>
        <div class="student-text" style="font-size:12px"><i class="bi bi-lightbulb"></i> Sugestão: anotem observações no diário de bordo durante o laboratório.</div>
      </div>
      <div class="callout"><i class="bi bi-chat-left-text"></i> Responda ao feedback ou envie uma dúvida pelo chat.</div>
    </div>
  `)
};

export const Estatisticas = {
  render: () => renderModal(`
    ${header('Resumo estatístico pessoal', ['Rodadas jogadas: 5', 'XP médio: 910'])}
    <div class="student-body">
      <div class="student-section">
        <div class="student-section-title"><i class="bi bi-bar-chart"></i> Desempenho por rodada</div>
        <div style="display:grid;grid-template-columns:repeat(5,1fr);gap:12px;align-items:end;height:140px;padding:16px;border:1px solid #E5E3F3;border-radius:12px;background:#F8F7FD">
          ${[620,780,860,790,950].map(score => `
            <div style="background:linear-gradient(180deg,#6E63E8,#9F93F8);height:${score/8}px;border-radius:8px;position:relative">
              <span style="position:absolute;bottom:100%;left:50%;transform:translate(-50%,-6px);font-size:11px;color:#3F3F46">${score}</span>
            </div>
          `).join('')}
        </div>
      </div>
      <div class="student-section">
        <div class="card">
          <div class="card-header"><span style="font-size:13px;color:#6E6B7B">Tempo médio por desafio</span><span class="card-value">4 min 30 s</span></div>
          <div class="student-text">Você está 18% mais rápido do que a média da turma. Mantenha o ritmo e revise apenas as missões com notas abaixo de 80%.</div>
        </div>
      </div>
    </div>
  `)
};

export const Cooperativo = {
  render: () => renderModal(`
    ${header('Modo cooperativo', ['Equipe Cosmos', 'Membros: Ana, Júlia, Pedro, Robson'])}
    <div class="student-body">
      <div class="student-section">
        <div class="student-section-title"><i class="bi bi-people"></i> Responsabilidades da equipe</div>
        <div class="timeline">
          ${[
            { icon: 'bi-person', name: 'Ana', task: 'Coordena diário de bordo' },
            { icon: 'bi-mic', name: 'Júlia', task: 'Grava vídeo explicativo' },
            { icon: 'bi-layers', name: 'Pedro', task: 'Organiza evidências no app' },
            { icon: 'bi-palette', name: 'Robson', task: 'Cria apresentação final' }
          ].map(member => `
            <div class="timeline-item" style="background:#fff">
              <div class="timeline-icon" style="background:#E6E4FF;color:#433878"><i class="${member.icon}"></i></div>
              <div>
                <div style="font-size:13px;font-weight:600;color:#3F3F46">${member.name}</div>
                <div class="student-text" style="font-size:12px">${member.task}</div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
      <div class="callout"><i class="bi bi-bell"></i> Reunião rápida marcada para hoje às 17h no chat da missão.</div>
    </div>
  `)
};

export const Compacto = {
  render: () => renderModal(`
    ${header('Resumo rápido', ['XP atual: 1280', 'Lugar no ranking: #4'])}
    <div class="student-body" style="padding:20px">
      <div class="card" style="gap:4px">
        <div style="font-size:12px;color:#6E6B7B">Próxima etapa</div>
        <div class="card-value">Enviar vídeo explicativo</div>
        <div class="student-text" style="font-size:12px">Use até 2 minutos e cite ao menos um exemplo de fração imprópria.</div>
      </div>
    </div>
  `, 'compact')
};

export const Vazio = {
  render: () => renderModal(`
    <div class="student-body" style="padding:48px 30px">
      <div class="empty">
        <img src="/educacross-assets/belinha/belinha-school-doubt.png" class="mascot-image" alt="Belinha - dúvida" />
        <div style="font-size:16px;font-weight:600;color:#3F3F46">Nenhum jogo em andamento</div>
        <div style="font-size:13px">Comece uma nova missão para ver seus progressos aqui.</div>
      </div>
    </div>
  `)
};
