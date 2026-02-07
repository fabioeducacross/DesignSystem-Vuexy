/**
 * DefaultFAQModal - Modal de Perguntas Frequentes
 * ================================================
 * Modal com lista de FAQ (Frequently Asked Questions)
 * 
 * @component DefaultFAQModal
 * @category Educacross Components V2 / Modals
 * @source educacross-frontoffice (ajuda, suporte)
 * @priority P2
 * @status PIXEL-PERFECT
 * @since 2.0.0
 */

export default {
  title: 'Front-office/Modals/DefaultFAQModal',
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' }
};

const styles = `
:root {
  --primary: #6e63e8;
  --accent: #00cfe8;
  --muted: #8f8ca8;
  --text: #2f2b3d;
  --border: #e6e5f2;
  --card: #ffffff;
}

.faq-shell {
  min-height: 100vh;
  background: radial-gradient(circle at 10% 20%, rgba(110, 99, 232, 0.1), transparent 32%),
    radial-gradient(circle at 90% 10%, rgba(0, 207, 232, 0.08), transparent 32%),
    linear-gradient(135deg, #1a1d2e, #232741 60%, #1a1d2e);
  display: grid;
  place-items: center;
  padding: 30px;
  font-family: 'Inter', 'Segoe UI', system-ui, -apple-system, sans-serif;
}

.faq-modal {
  width: min(840px, calc(100% - 32px));
  background: var(--card);
  border-radius: 18px;
  overflow: hidden;
  box-shadow: 0 28px 80px rgba(0, 0, 0, 0.25);
  display: grid;
  grid-template-rows: auto 1fr auto;
  max-height: 88vh;
}

.faq-header {
  padding: 22px 24px;
  background: linear-gradient(135deg, #7367f0, #5e50c8);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.faq-title { display: flex; align-items: center; gap: 12px; font-weight: 800; font-size: 20px; }
.faq-close { width: 34px; height: 34px; border-radius: 10px; border: 1px solid rgba(255,255,255,0.35); display:grid; place-items:center; cursor:pointer; background: rgba(255,255,255,0.14); }
.faq-body { padding: 22px 24px; overflow: hidden; display: grid; gap: 16px; }
.faq-scroll { overflow-y: auto; display: grid; gap: 14px; padding-right: 6px; }

.faq-search { position: relative; }
.faq-search input { width: 100%; padding: 12px 14px 12px 42px; border-radius: 12px; border: 1px solid var(--border); background: #f8f7ff; font-size: 14px; }
.faq-search i { position: absolute; left: 14px; top: 50%; transform: translateY(-50%); color: var(--muted); }

.faq-section { border: 1px solid var(--border); border-radius: 14px; padding: 14px; background: #fbfaff; display: grid; gap: 12px; }
.faq-section-title { display: flex; align-items: center; gap: 10px; font-weight: 800; color: var(--text); }
.faq-section-title small { color: var(--muted); font-size: 12px; }

.faq-item { border: 1px solid var(--border); border-radius: 12px; padding: 12px; background: #fff; display: grid; gap: 8px; cursor: pointer; transition: border-color 0.15s ease, box-shadow 0.15s ease; }
.faq-item:hover { border-color: var(--primary); box-shadow: 0 10px 24px rgba(115, 103, 240, 0.18); }
.faq-item.active { background: #f7f6ff; border-color: rgba(115, 103, 240, 0.4); }
.faq-question { display: flex; justify-content: space-between; align-items: center; gap: 8px; font-weight: 700; color: var(--text); }
.faq-answer { display: none; font-size: 13px; color: var(--muted); line-height: 1.6; }
.faq-item.active .faq-answer { display: block; }

.contact-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(170px, 1fr)); gap: 10px; }
.contact-btn { padding: 12px; border: 1px solid var(--border); border-radius: 12px; background: #fff; font-weight: 700; color: var(--text); display: flex; align-items: center; gap: 10px; cursor: pointer; }
.contact-btn.primary { background: var(--primary); color: #fff; border-color: var(--primary); box-shadow: 0 12px 28px rgba(115, 103, 240, 0.3); }

.quick-link { display: flex; gap: 12px; align-items: center; padding: 12px; border-radius: 12px; border: 1px solid var(--border); background: #fff; cursor: pointer; }
.quick-link:hover { border-color: var(--primary); box-shadow: 0 10px 20px rgba(115,103,240,0.12); }

.badge-pill { padding: 6px 10px; border-radius: 999px; background: #efeefe; color: #4b3cc4; font-weight: 700; font-size: 11px; }

.video-box { aspect-ratio: 16/9; border-radius: 16px; border: 1px solid var(--border); background: linear-gradient(135deg, #e6e4ff, #d9d6f3); display: grid; place-items: center; color: var(--text); }

.status-card { border: 1px solid var(--border); border-radius: 12px; padding: 12px; display: grid; gap: 6px; background: #fff; }

.footer { padding: 14px 22px; border-top: 1px solid var(--border); background: #f8f7ff; display: flex; align-items: center; justify-content: space-between; color: var(--muted); font-size: 12px; }

.empty { border: 2px dashed var(--border); border-radius: 14px; padding: 40px 20px; text-align: center; display: grid; gap: 10px; color: var(--muted); background: #fbfaff; }

.compact .faq-modal { width: min(520px, 100%); }

@media (max-width: 720px) {
  .faq-shell { padding: 16px; }
  .faq-modal { max-height: none; }
  .footer { flex-direction: column; gap: 6px; align-items: flex-start; }
}
`;

const render = (body, opts = {}) => `
<div class="faq-shell ${opts.extra || ''}">
  <div class="faq-modal">
    <div class="faq-header">
      <div class="faq-title"><i class="bi bi-question-circle"></i> ${opts.title || 'Central de Ajuda'}</div>
      <div class="faq-close"><i class="bi bi-x"></i></div>
    </div>
    <div class="faq-body">
      ${body}
    </div>
    <div class="footer">
      <span><i class="bi bi-lightbulb"></i> Última atualização: 28/01/2026</span>
      <span>Idioma: Português (BR)</span>
    </div>
  </div>
</div>
<style>${styles}</style>
<script>
  setTimeout(() => {
    document.querySelectorAll('.faq-item').forEach(item => {
      item.addEventListener('click', () => item.classList.toggle('active'));
    });
  }, 100);
</script>
`;

const faqList = (items, expandedIndex = 0) => items.map((faq, idx) => `
  <div class="faq-item ${idx === expandedIndex ? 'active' : ''}">
    <div class="faq-question">${faq.q} <i class="bi bi-chevron-down"></i></div>
    <div class="faq-answer">${faq.a}</div>
  </div>
`).join('');

export const Default = {
  render: () => render(`
    <div class="faq-search">
      <i class="bi bi-search"></i>
      <input type="text" placeholder="Buscar dúvidas frequentes..." />
    </div>
    <div class="faq-scroll">
      <div class="faq-section">
        <div class="faq-section-title"><i class="bi bi-patch-question"></i> Perguntas frequentes</div>
        ${faqList([
          { q: 'Como adicionar um novo aluno à turma?', a: 'Acesse Turmas > Adicionar Aluno e escolha CSV ou manual.' },
          { q: 'Posso editar uma missão após publicá-la?', a: 'Apenas ajustes de texto e configurações são seguros. Para mudanças estruturais, duplique a missão.' },
          { q: 'Como enviar feedback para o aluno?', a: 'Abra a evidência, clique em Feedback e registre o retorno com rubricas.' }
        ])}
      </div>
    </div>
  `)
};

export const ComContato = {
  render: () => render(`
    <div class="faq-scroll">
      <div class="faq-section">
        <div class="faq-section-title"><i class="bi bi-chat-dots"></i> Canais de suporte <small>Escolha o canal preferido</small></div>
        <div class="contact-grid">
          <button class="contact-btn primary"><i class="bi bi-whatsapp"></i> WhatsApp</button>
          <button class="contact-btn"><i class="bi bi-chat-left-text"></i> Chat ao vivo</button>
          <button class="contact-btn"><i class="bi bi-envelope"></i> E-mail</button>
          <button class="contact-btn"><i class="bi bi-telephone"></i> Telefone</button>
        </div>
      </div>
      <div class="faq-section">
        <div class="faq-section-title"><i class="bi bi-clock-history"></i> Tempo médio de resposta</div>
        <div style="font-size:13px;color:var(--muted);">E-mail: até 24h • Telefone: imediato • Chat: 5-10 min</div>
      </div>
    </div>
  `, { title: 'Precisa de ajuda?' })
};

export const LinksRapidos = {
  render: () => render(`
    <div class="faq-scroll">
      <div class="faq-section">
        <div class="faq-section-title"><i class="bi bi-bookmark"></i> Acesso rápido</div>
        ${[
          { icon: 'bi-book', title: 'Guia do Professor', desc: 'Manual completo de uso', badge: 'Atualizado' },
          { icon: 'bi-play-circle', title: 'Vídeos tutoriais', desc: '18 aulas em vídeo', badge: 'Novo' },
          { icon: 'bi-file-earmark-pdf', title: 'Download PDF', desc: 'Documentação offline' },
          { icon: 'bi-journal-code', title: 'API e integrações', desc: 'Para desenvolvedores' }
        ].map(link => `
          <div class="quick-link">
            <div style="width:36px;height:36px;border-radius:10px;display:grid;place-items:center;background:#efeefe;color:#4b3cc4;"><i class="bi ${link.icon}"></i></div>
            <div style="flex:1;">
              <div style="font-weight:800;color:var(--text);">${link.title}</div>
              <div style="font-size:12px;color:var(--muted);">${link.desc}</div>
            </div>
            ${link.badge ? `<span class="badge-pill">${link.badge}</span>` : ''}
            <i class="bi bi-arrow-right" style="color:var(--muted);"></i>
          </div>
        `).join('')}
      </div>
    </div>
  `, { title: 'Recursos e documentação' })
};

export const CategoriasPorTopico = {
  render: () => render(`
    <div class="faq-scroll">
      ${[
        { title: 'Primeiros passos', icon: 'bi-rocket-takeoff', count: 8 },
        { title: 'Gestão de turmas', icon: 'bi-people', count: 12 },
        { title: 'Missões e jogos', icon: 'bi-trophy', count: 15 },
        { title: 'Avaliação e relatórios', icon: 'bi-graph-up', count: 9 },
        { title: 'Configurações da conta', icon: 'bi-gear', count: 6 }
      ].map(cat => `
        <div class="faq-section">
          <div class="faq-section-title"><i class="bi ${cat.icon}"></i> ${cat.title} <span class="badge-pill">${cat.count} artigos</span></div>
          <div style="font-size:13px;color:var(--muted);">Clique para explorar artigos desta categoria</div>
        </div>
      `).join('')}
    </div>
  `, { title: 'Tópicos de ajuda' })
};

export const ComBusca = {
  render: () => render(`
    <div class="faq-search">
      <i class="bi bi-search"></i>
      <input type="text" value="como importar alunos" />
    </div>
    <div style="font-size:12px;color:var(--muted);">3 resultados encontrados</div>
    <div class="faq-scroll">
      ${faqList([
        { q: 'Como importar alunos via CSV?', a: 'Prepare um arquivo com nome, email, data_nascimento, responsável e importe em Turmas > Importar.' },
        { q: 'Formatos aceitos para importação', a: 'CSV separado por vírgula ou ponto e vírgula, com cabeçalho.' },
        { q: 'Corrigir erros de importação', a: 'Baixe o log de erros, ajuste o CSV e reenviar.' }
      ], 0)}
    </div>
  `, { title: 'Buscar ajuda' })
};

export const TutorialVideo = {
  render: () => render(`
    <div class="faq-scroll">
      <div class="video-box">
        <div style="width:72px;height:72px;border-radius:50%;background:var(--primary);color:#fff;display:grid;place-items:center;font-size:32px;cursor:pointer;"><i class="bi bi-play-fill"></i></div>
      </div>
      <div class="faq-section">
        <div class="faq-section-title"><i class="bi bi-film"></i> Como criar sua primeira missão</div>
        <div style="font-size:13px;color:var(--muted);">Aprenda passo a passo como configurar objetivos, adicionar desafios e publicar uma missão. Duração: 8 minutos.</div>
      </div>
      <div class="faq-section" style="background:#fff;">
        <div class="faq-section-title"><i class="bi bi-collection-play"></i> Mais vídeos</div>
        ${['Importar alunos (3:20)', 'Configurar pontos XP (5:15)', 'Usar relatórios (6:40)'].map(v => `
          <div class="quick-link" style="border:none; padding:8px 10px;">
            <div style="width:30px; height:30px; border-radius:8px; background:#efeefe; display:grid; place-items:center; color:#4b3cc4;"><i class="bi bi-play-circle"></i></div>
            <div style="font-weight:700;">${v}</div>
          </div>
        `).join('')}
      </div>
    </div>
  `, { title: 'Tutorial em vídeo' })
};

export const StatusDoSistema = {
  render: () => render(`
    <div class="faq-scroll">
      <div class="faq-section">
        <div class="faq-section-title"><i class="bi bi-activity"></i> Serviços operacionais</div>
        ${[
          { service: 'Plataforma web', status: 'operational', desc: 'Todos os sistemas funcionando' },
          { service: 'API de integrações', status: 'operational', desc: 'Tempo de resposta: 120ms' },
          { service: 'Upload de arquivos', status: 'degraded', desc: 'Lentidão temporária detectada' }
        ].map(item => {
          const map = item.status === 'operational'
            ? { bg: '#e6f7ed', border: '#34c759', text: '#1b874e', label: '✓ Operacional' }
            : { bg: '#fff4e5', border: '#ff9500', text: '#b86e00', label: '⚠ Degradado' };
          return `
            <div class="status-card">
              <div style="display:flex;justify-content:space-between;align-items:center;">
                <div>
                  <div style="font-weight:800;color:var(--text);">${item.service}</div>
                  <div style="font-size:12px;color:var(--muted);">${item.desc}</div>
                </div>
                <span style="padding:6px 12px;border-radius:999px;background:${map.bg};border:1px solid ${map.border};color:${map.text};font-weight:700;font-size:12px;">${map.label}</span>
              </div>
            </div>
          `;
        }).join('')}
      </div>
    </div>
  `, { title: 'Status do sistema' })
};

export const Compacto = {
  render: () => render(`
    <div class="faq-search">
      <i class="bi bi-search"></i>
      <input type="text" placeholder="O que você precisa?" />
    </div>
    <div class="faq-section" style="padding:12px;">
      <div class="contact-grid" style="grid-template-columns:repeat(auto-fit,minmax(140px,1fr));">
        <button class="contact-btn"><i class="bi bi-envelope"></i> E-mail</button>
        <button class="contact-btn"><i class="bi bi-chat-left-text"></i> Chat</button>
      </div>
    </div>
  `, { extra: 'compact', title: 'Ajuda' })
};

export const Vazio = {
  render: () => render(`
    <div class="faq-scroll" style="align-content:center;">
      <div class="empty">
        <div style="font-size:44px;">🔍</div>
        <div style="font-weight:800;color:var(--text);">Nenhum resultado encontrado</div>
        <div style="font-size:13px;">Tente palavras-chave diferentes ou navegue pelas categorias.</div>
        <button class="contact-btn primary" style="justify-content:center;">Ver todas as categorias</button>
      </div>
    </div>
  `)
};
