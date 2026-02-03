export default {
  title: 'Educacross Components V2/Modals/DefaultFAQModal',
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' }
};

const css = `.faq-backdrop{min-height:100vh;padding:32px;background:linear-gradient(135deg,#1A1D2E,#232741,#1A1D2E);display:flex;align-items:center;justify-content:center}.faq-modal{width:720px;max-width:calc(100% - 40px);background:#fff;border-radius:20px;box-shadow:0 32px 80px rgba(10,18,34,.6);overflow:hidden;display:flex;flex-direction:column;max-height:85vh}.faq-header{padding:28px 30px;border-bottom:1px solid #EDEDF5;background:linear-gradient(135deg,#7367F0,#5E50C8);color:#fff;display:flex;justify-content:space-between;align-items:center}.faq-title{font-size:22px;font-weight:700;display:flex;align-items:center;gap:12px}.faq-close{width:36px;height:36px;border-radius:10px;border:1px solid rgba(255,255,255,.4);background:rgba(255,255,255,.12);color:#fff;display:flex;align-items:center;justify-content:center;cursor:pointer;transition:.2s}.faq-close:hover{background:rgba(255,255,255,.2)}.faq-body{padding:28px 30px;overflow-y:auto;display:grid;gap:20px}.faq-search{position:relative;margin-bottom:8px}.faq-search input{width:100%;padding:12px 16px 12px 44px;border:1px solid #E5E3F3;border-radius:12px;font-size:14px;background:#F9F8FE;transition:.2s}.faq-search input:focus{outline:none;border-color:#7367F0;background:#fff}.faq-search i{position:absolute;left:16px;top:50%;transform:translateY(-50%);color:#9795B5;font-size:18px}.faq-section{display:grid;gap:12px}.faq-section-title{font-size:16px;font-weight:700;color:#2F2B3D;display:flex;align-items:center;gap:10px}.faq-section-title i{color:#7367F0;font-size:20px}.faq-item{border:1px solid #E5E3F3;border-radius:14px;padding:18px 20px;background:#fff;cursor:pointer;transition:.2s;display:grid;gap:10px}.faq-item:hover{border-color:#7367F0;box-shadow:0 4px 14px rgba(115,103,240,.12)}.faq-item.expanded{background:#F9F8FE}.faq-question{font-size:14px;font-weight:600;color:#3F3F46;display:flex;justify-content:space-between;align-items:center;gap:12px}.faq-question i{color:#7367F0;transition:.2s}.faq-item.expanded .faq-question i{transform:rotate(180deg)}.faq-answer{font-size:13px;line-height:1.7;color:#6E6B7B;margin-top:4px;display:none}.faq-item.expanded .faq-answer{display:block}.contact-card{border:1px solid #D9D6F3;border-radius:14px;padding:20px;background:linear-gradient(135deg,#F9F8FE,#F3F2FF);display:grid;gap:12px}.contact-title{font-size:14px;font-weight:600;color:#433878;display:flex;align-items:center;gap:8px}.contact-options{display:grid;grid-template-columns:repeat(auto-fit,minmax(140px,1fr));gap:10px}.contact-btn{padding:12px 16px;border-radius:10px;border:1px solid #E1DFFE;background:#fff;color:#433878;font-size:13px;font-weight:600;display:flex;align-items:center;justify-content:center;gap:8px;cursor:pointer;transition:.2s}.contact-btn:hover{background:#7367F0;color:#fff;border-color:#7367F0}.quick-link{display:flex;align-items:center;gap:10px;padding:12px 16px;border-radius:10px;background:#F9F8FE;border:1px solid #EDEDF5;cursor:pointer;transition:.2s}.quick-link:hover{background:#fff;border-color:#7367F0}.quick-link i{width:32px;height:32px;border-radius:8px;background:#E6E4FF;color:#7367F0;display:flex;align-items:center;justify-content:center}.quick-text{flex:1}.quick-text-title{font-size:13px;font-weight:600;color:#3F3F46}.quick-text-desc{font-size:11px;color:#9795B5}.badge-pill{display:inline-flex;padding:4px 10px;border-radius:999px;font-size:11px;font-weight:600;background:#E6E4FF;color:#5E50C8}.compact .faq-modal{width:480px}.empty{padding:50px 24px;text-align:center;border:2px dashed #D8D6DE;border-radius:16px;background:#F9F8FE;color:#6E6B7B;display:grid;gap:12px}.empty svg{width:100px;height:100px;margin:0 auto;opacity:.3}.faq-footer{padding:18px 30px;border-top:1px solid #EDEDF5;background:#F9F8FE;display:flex;align-items:center;justify-content:space-between;font-size:12px;color:#9795B5}`;

const renderModal = (content, extra = '') => `
<div class="faq-backdrop ${extra}">
  <div class="faq-modal">
    ${content}
  </div>
</div>
<style>${css}</style>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.0/font/bootstrap-icons.css">
<script>
  setTimeout(() => {
    document.querySelectorAll('.faq-item').forEach(item => {
      item.addEventListener('click', () => {
        item.classList.toggle('expanded');
      });
    });
  }, 100);
</script>
`;

const header = (title) => `
  <div class="faq-header">
    <div class="faq-title"><i class="bi bi-question-circle"></i> ${title}</div>
    <div class="faq-close"><i class="bi bi-x-lg"></i></div>
  </div>
`;

export const Default = {
  render: () => renderModal(`
    ${header('Central de Ajuda')}
    <div class="faq-body">
      <div class="faq-search">
        <i class="bi bi-search"></i>
        <input type="text" placeholder="Buscar dúvidas frequentes...">
      </div>
      <div class="faq-section">
        <div class="faq-section-title"><i class="bi bi-patch-question"></i> Perguntas frequentes</div>
        ${[
          { q: 'Como adicionar um novo aluno à turma?', a: 'Acesse a aba "Turmas" no menu principal, selecione a turma desejada e clique em "+ Adicionar Aluno". Você pode importar via arquivo CSV ou adicionar manualmente.' },
          { q: 'Como faço para resetar a senha de um estudante?', a: 'Na lista de alunos, clique no ícone de engrenagem ao lado do nome do estudante, selecione "Resetar senha" e confirme. O aluno receberá instruções por e-mail.' },
          { q: 'Posso editar uma missão após publicá-la?', a: 'Sim, mas apenas ajustes de texto e configurações. Mudanças estruturais podem afetar o progresso dos alunos. Recomendamos duplicar e criar nova versão.' }
        ].map(faq => `
          <div class="faq-item">
            <div class="faq-question">${faq.q}<i class="bi bi-chevron-down"></i></div>
            <div class="faq-answer">${faq.a}</div>
          </div>
        `).join('')}
      </div>
    </div>
    <div class="faq-footer">
      <span><i class="bi bi-lightbulb"></i> Última atualização: 28/01/2026</span>
      <span>Idioma: Português (BR)</span>
    </div>
  `)
};

export const ComContato = {
  render: () => renderModal(`
    ${header('Precisa de ajuda?')}
    <div class="faq-body">
      <div class="faq-section">
        <div class="faq-section-title"><i class="bi bi-chat-dots"></i> Canais de suporte</div>
        <div class="contact-card">
          <div class="contact-title"><i class="bi bi-headset"></i> Entre em contato com nossa equipe</div>
          <div class="contact-options">
            <button class="contact-btn"><i class="bi bi-envelope"></i> E-mail</button>
            <button class="contact-btn"><i class="bi bi-telephone"></i> Telefone</button>
            <button class="contact-btn"><i class="bi bi-chat-left-text"></i> Chat ao vivo</button>
          </div>
        </div>
      </div>
      <div class="faq-section">
        <div class="faq-section-title"><i class="bi bi-clock-history"></i> Tempo médio de resposta</div>
        <div style="font-size:13px;color:#6E6B7B;padding:0 4px">E-mail: até 24h úteis | Telefone: imediato | Chat: 5-10 minutos</div>
      </div>
    </div>
  `)
};

export const LinksRapidos = {
  render: () => renderModal(`
    ${header('Recursos e documentação')}
    <div class="faq-body">
      <div class="faq-section">
        <div class="faq-section-title"><i class="bi bi-bookmark"></i> Acesso rápido</div>
        ${[
          { icon: 'bi-book', title: 'Guia do Professor', desc: 'Manual completo de uso', badge: 'Atualizado' },
          { icon: 'bi-play-circle', title: 'Vídeos tutoriais', desc: '18 aulas em vídeo', badge: 'Novo' },
          { icon: 'bi-file-earmark-pdf', title: 'Download do PDF', desc: 'Documentação offline', badge: null },
          { icon: 'bi-journal-code', title: 'API e integrações', desc: 'Para desenvolvedores', badge: null }
        ].map(link => `
          <div class="quick-link">
            <div class="quick-link i"><i class="bi ${link.icon}"></i></div>
            <div class="quick-text">
              <div class="quick-text-title">${link.title}</div>
              <div class="quick-text-desc">${link.desc}</div>
            </div>
            ${link.badge ? `<span class="badge-pill">${link.badge}</span>` : ''}
            <i class="bi bi-arrow-right" style="color:#9795B5"></i>
          </div>
        `).join('')}
      </div>
    </div>
  `)
};

export const CategoriasPorTopico = {
  render: () => renderModal(`
    ${header('Tópicos de ajuda')}
    <div class="faq-body">
      ${[
        { title: 'Primeiros passos', icon: 'bi-rocket-takeoff', count: 8 },
        { title: 'Gestão de turmas', icon: 'bi-people', count: 12 },
        { title: 'Missões e jogos', icon: 'bi-trophy', count: 15 },
        { title: 'Avaliação e relatórios', icon: 'bi-graph-up', count: 9 },
        { title: 'Configurações da conta', icon: 'bi-gear', count: 6 }
      ].map(cat => `
        <div class="faq-section">
          <div class="faq-section-title"><i class="bi ${cat.icon}"></i> ${cat.title} <span class="badge-pill">${cat.count} artigos</span></div>
          <div style="font-size:13px;color:#9795B5;padding:0 4px">Clique para explorar artigos desta categoria</div>
        </div>
      `).join('')}
    </div>
  `)
};

export const ComBusca = {
  render: () => renderModal(`
    ${header('Buscar ajuda')}
    <div class="faq-body">
      <div class="faq-search">
        <i class="bi bi-search"></i>
        <input type="text" placeholder="Digite sua dúvida..." value="como importar alunos">
      </div>
      <div style="font-size:12px;color:#9795B5;margin-bottom:12px">3 resultados encontrados</div>
      <div class="faq-section">
        ${[
          { q: 'Como importar alunos via planilha CSV?', highlight: true },
          { q: 'Formatos aceitos para importação de dados', highlight: false },
          { q: 'Como corrigir erros na importação de alunos?', highlight: false }
        ].map(item => `
          <div class="faq-item ${item.highlight ? 'expanded' : ''}">
            <div class="faq-question">${item.q}<i class="bi bi-chevron-down"></i></div>
            ${item.highlight ? '<div class="faq-answer">Prepare um arquivo CSV com as colunas: nome, email, data_nascimento, responsavel. Acesse Turmas > Importar e faça upload do arquivo. Revise a pré-visualização antes de confirmar.</div>' : ''}
          </div>
        `).join('')}
      </div>
    </div>
  `)
};

export const TutorialVideo = {
  render: () => renderModal(`
    ${header('Tutorial em vídeo')}
    <div class="faq-body">
      <div style="aspect-ratio:16/9;border-radius:16px;background:linear-gradient(135deg,#E6E4FF,#D9D6F3);display:flex;align-items:center;justify-content:center;border:1px solid #E1DFFE;margin-bottom:16px">
        <div style="width:72px;height:72px;border-radius:50%;background:#7367F0;color:#fff;display:flex;align-items:center;justify-content:center;font-size:32px;cursor:pointer"><i class="bi bi-play-fill"></i></div>
      </div>
      <div class="faq-section">
        <div class="faq-section-title"><i class="bi bi-film"></i> Como criar sua primeira missão</div>
        <div style="font-size:13px;color:#6E6B7B;line-height:1.7">Aprenda passo a passo como configurar objetivos, adicionar desafios e publicar uma missão educacional. Duração: 8 minutos.</div>
      </div>
      <div class="contact-card" style="margin-top:8px">
        <div class="contact-title"><i class="bi bi-collection-play"></i> Mais vídeos relacionados</div>
        <div style="display:grid;gap:8px">
          ${['Importar alunos (3:20)', 'Configurar pontos XP (5:15)', 'Usar relatórios (6:40)'].map(v => `
            <div style="font-size:13px;color:#433878;cursor:pointer;padding:8px 12px;border-radius:8px;background:#fff;border:1px solid #E1DFFE"><i class="bi bi-play-circle" style="margin-right:8px"></i>${v}</div>
          `).join('')}
        </div>
      </div>
    </div>
  `)
};

export const StatusDoSistema = {
  render: () => renderModal(`
    ${header('Status do sistema')}
    <div class="faq-body">
      <div class="faq-section">
        <div class="faq-section-title"><i class="bi bi-activity"></i> Serviços operacionais</div>
        ${[
          { service: 'Plataforma web', status: 'operational', desc: 'Todos os sistemas funcionando' },
          { service: 'API de integrações', status: 'operational', desc: 'Tempo de resposta: 120ms' },
          { service: 'Upload de arquivos', status: 'degraded', desc: 'Lentidão temporária detectada' },
          { service: 'Notificações por e-mail', status: 'operational', desc: 'Entrega em até 2 minutos' }
        ].map(item => {
          const colors = {
            operational: { bg: '#E6F7ED', border: '#34C759', text: '#1B874E' },
            degraded: { bg: '#FFF4E5', border: '#FF9500', text: '#B86E00' }
          };
          const c = colors[item.status];
          return `
            <div class="faq-item" style="cursor:default">
              <div style="display:flex;justify-content:space-between;align-items:center">
                <div>
                  <div style="font-size:14px;font-weight:600;color:#3F3F46">${item.service}</div>
                  <div style="font-size:12px;color:#6E6B7B;margin-top:4px">${item.desc}</div>
                </div>
                <span style="padding:6px 12px;border-radius:999px;background:${c.bg};border:1px solid ${c.border};color:${c.text};font-size:11px;font-weight:600">${item.status === 'operational' ? '✓ Operacional' : '⚠ Degradado'}</span>
              </div>
            </div>
          `;
        }).join('')}
      </div>
    </div>
    <div class="faq-footer">
      <span><i class="bi bi-clock"></i> Atualizado há 2 minutos</span>
      <a href="#" style="color:#7367F0;text-decoration:none">Histórico completo →</a>
    </div>
  `)
};

export const Compacto = {
  render: () => renderModal(`
    ${header('Ajuda')}
    <div class="faq-body" style="padding:20px 24px">
      <div class="faq-search" style="margin-bottom:14px">
        <i class="bi bi-search"></i>
        <input type="text" placeholder="O que você precisa?">
      </div>
      <div class="contact-options">
        <button class="contact-btn"><i class="bi bi-envelope"></i> E-mail</button>
        <button class="contact-btn"><i class="bi bi-chat-left-text"></i> Chat</button>
      </div>
    </div>
  `, 'compact')
};

export const Vazio = {
  render: () => renderModal(`
    <div class="faq-body" style="padding:48px 30px">
      <div class="empty">
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm1 15h-2v-2h2zm0-4h-2V7h2z"/>
        </svg>
        <div style="font-size:16px;font-weight:600">Nenhum resultado encontrado</div>
        <div style="font-size:13px">Tente usar palavras-chave diferentes ou navegue pelas categorias.</div>
        <button style="justify-self:center;padding:10px 18px;border-radius:10px;border:none;background:#7367F0;color:#fff;font-weight:600;cursor:pointer">Ver todas as categorias</button>
      </div>
    </div>
  `)
};
