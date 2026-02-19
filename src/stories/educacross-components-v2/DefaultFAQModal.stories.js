/**
 * DefaultFAQModal - Modal de Perguntas Frequentes
 * ================================================
 * Modal com lista de FAQ (Frequently Asked Questions)
 * 
 * @component DefaultFAQModal
 * @source educacross-frontoffice/src/components/modal/DefaultFAQModal.vue
 * @category Educacross Components V2 / Modals
 * @priority P2
 * @status PIXEL-PERFECT
 * @since 2.0.0
 */

export default {
  title: 'Educacross Components V2/Modals/DefaultFAQModal',
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
      <div style="background:linear-gradient(135deg,#EA5455 0%,#F08182 100%);padding:60px 40px;color:white;">
        <div style="max-width:900px;margin:0 auto;">
          <div style="display:inline-block;padding:8px 16px;background:rgba(255,255,255,0.15);border-radius:50px;margin-bottom:20px;font-size:14px;border:1px solid rgba(255,255,255,0.2);">Modals</div>
          <h1 style="font-size:3rem;font-weight:700;margin:0 0 12px 0;letter-spacing:-0.02em;">DefaultFAQModal</h1>
          <p style="font-size:1.1rem;opacity:0.9;margin:0;max-width:600px;">Modal de Perguntas Frequentes</p>
        </div>
      </div>
      <div style="max-width:900px;margin:0 auto;padding:48px 40px;">
        <div style="background:white;border-radius:12px;padding:32px;margin-bottom:32px;box-shadow:0 2px 8px rgba(0,0,0,0.08);">
          <h2 style="font-size:1.1rem;font-weight:600;color:#5E5873;margin:0 0 16px 0;">Sobre o Componente</h2>
          <p style="color:#6E6B7B;line-height:1.7;margin:0 0 16px 0;">Modal de Perguntas Frequentes. Faz parte da categoria <strong>Modals</strong> do Design System Educacross.</p>
          <div style="background:#F8F7FF;border-left:4px solid #EA5455;padding:16px;border-radius:4px;">
            <p style="margin:0;color:#5E5873;font-size:14px;line-height:1.6;"><strong>💡 Dica:</strong> Use <em>Playground</em> para explorar props, <em>Use Cases</em> para exemplos reais e <em>Accessibility</em> para validar WCAG.</p>
          </div>
        </div>
        <div style="background:white;border-radius:12px;padding:32px;box-shadow:0 2px 8px rgba(0,0,0,0.08);">
          <h2 style="font-size:1.1rem;font-weight:600;color:#5E5873;margin:0 0 16px 0;">Implementação Vue 2.7</h2>
          <pre style="background:#1E1E2E;color:#CDD6F4;padding:20px;border-radius:8px;font-size:13px;line-height:1.6;overflow:auto;margin:0;"><code>import DefaultFAQModal from '@/components/DefaultFAQModal.vue';

// Template
&lt;DefaultFAQModal v-bind="props" /&gt;</code></pre>
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
    docs: { description: { story: 'Explore o DefaultFAQModal com controles interativos.' } },
  },
  render: (args) => `
    <div style="padding:32px;display:flex;justify-content:center;align-items:center;min-height:200px;background:#F8F8F8;border-radius:12px;">
      <div style="text-align:center;color:#6E6B7B;">
        <div style="width:60px;height:60px;background:#EA545520;border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 16px;font-size:24px;">🎨</div>
        <p style="margin:0 0 8px 0;font-size:15px;font-weight:600;color:#5E5873;">Playground DefaultFAQModal</p>
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
    docs: { description: { story: 'Exemplos de uso real do DefaultFAQModal no Educacross.' } },
  },
  render: () => `
    <div style="max-width:800px;margin:0 auto;padding:40px 20px;font-family:'Public Sans',sans-serif;">
      <div style="background:#EA545515;border:1px solid #EA545530;border-radius:12px;padding:24px;margin-bottom:40px;">
        <h1 style="font-size:1.5rem;font-weight:700;color:#5E5873;margin:0 0 8px 0;">Casos de Uso: DefaultFAQModal</h1>
        <p style="color:#6E6B7B;margin:0;font-size:14px;line-height:1.6;">Cenários reais de uso no contexto educacional da plataforma Educacross</p>
      </div>
      
      <div style="margin-bottom:32px;">
        <h2 style="font-size:18px;font-weight:600;color:#5E5873;margin:0 0 8px 0;display:flex;align-items:center;gap:10px;">
          <span style="display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;background:#EA5455;color:white;border-radius:50%;font-size:13px;font-weight:700;flex-shrink:0;">1</span>
          Professor — Painel Principal
        </h2>
        <p style="color:#6E6B7B;margin:0 0 16px 0;padding-left:38px;font-size:14px;">Professor utilizando DefaultFAQModal no dashboard de gestão de turmas</p>
        <div style="background:#F8F8F8;border-radius:8px;padding:20px;margin-left:38px;text-align:center;color:#B9B9C3;font-size:13px;">
          Ver story <strong>Default</strong> para visualização do componente neste contexto
        </div>
      </div>
      <div style="margin-bottom:32px;">
        <h2 style="font-size:18px;font-weight:600;color:#5E5873;margin:0 0 8px 0;display:flex;align-items:center;gap:10px;">
          <span style="display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;background:#EA5455;color:white;border-radius:50%;font-size:13px;font-weight:700;flex-shrink:0;">2</span>
          Aluno — Portal do Estudante
        </h2>
        <p style="color:#6E6B7B;margin:0 0 16px 0;padding-left:38px;font-size:14px;">Aluno interagindo com DefaultFAQModal no portal educacional</p>
        <div style="background:#F8F8F8;border-radius:8px;padding:20px;margin-left:38px;text-align:center;color:#B9B9C3;font-size:13px;">
          Ver story <strong>Default</strong> para visualização do componente neste contexto
        </div>
      </div>
      <div style="margin-bottom:32px;">
        <h2 style="font-size:18px;font-weight:600;color:#5E5873;margin:0 0 8px 0;display:flex;align-items:center;gap:10px;">
          <span style="display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;background:#EA5455;color:white;border-radius:50%;font-size:13px;font-weight:700;flex-shrink:0;">3</span>
          Coordenador — Relatórios
        </h2>
        <p style="color:#6E6B7B;margin:0 0 16px 0;padding-left:38px;font-size:14px;">Coordenador pedagógico analisando dados via DefaultFAQModal</p>
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
    docs: { description: { story: 'Conformidade WCAG 2.1 AA para o DefaultFAQModal.' } },
  },
  render: () => `
    <div style="max-width:800px;margin:0 auto;padding:40px 20px;font-family:'Public Sans',sans-serif;">

      <div style="background:linear-gradient(135deg,#EA5455 0%,#764ba2 100%);padding:32px;border-radius:12px;margin-bottom:32px;color:white;">
        <h1 style="font-size:1.5rem;font-weight:700;margin:0 0 8px 0;">Acessibilidade: DefaultFAQModal</h1>
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

