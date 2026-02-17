/**
 * MissionBookDetails - Detalhes de Livro/Conteúdo de Missão
 * ===========================================================
 * Card com detalhes completos de livro didático ou conteúdo de missão
 * 
 * @component MissionBookDetails
 * @category Educacross Components V2 / Missions
 * @source educacross-frontoffice/src/components/mission-plus/MissionBookDetails.vue
 * @priority P2
 * @status PIXEL-PERFECT
 * @since 2.0.0
 */

export default {
  title: 'Educacross Components V2/Missions/MissionBookDetails',
  tags: ['autodocs'],
  parameters: { layout: 'padded' }
};

const css = `.mission-book{max-width:960px;margin:0 auto;padding:24px;display:grid;gap:20px}.book-card{background:#fff;border:1px solid #D8D6DE;border-radius:16px;box-shadow:0 6px 20px rgba(17,24,39,.08);overflow:hidden}.book-header{display:flex;flex-wrap:wrap;gap:20px;align-items:center;padding:24px;border-bottom:1px solid #F1F0F7;background:linear-gradient(135deg,#6E63E8,#3F3F8F);color:#fff}.book-cover{width:120px;height:160px;background:#fff;border-radius:12px;box-shadow:0 10px 24px rgba(17,24,39,.16);display:flex;align-items:center;justify-content:center;flex-shrink:0}.book-info{display:grid;gap:12px}.book-title{font-size:22px;font-weight:700}.book-meta{display:flex;flex-wrap:wrap;gap:10px;font-size:12px}.book-meta span{padding:4px 10px;border-radius:999px;background:rgba(255,255,255,.12);border:1px solid rgba(255,255,255,.2);font-weight:600}.book-body{display:grid;padding:24px;gap:24px}.book-section{display:grid;gap:12px}.section-heading{display:flex;align-items:center;gap:10px;font-size:15px;font-weight:600;color:#2F2B3D}.section-heading i{color:#6E63E8}.section-text{font-size:13px;line-height:1.6;color:#524F5E}.chapter-list{display:grid;gap:12px}.chapter-item{border:1px solid #E5E3F3;border-radius:12px;padding:16px;display:grid;gap:10px;background:#FBFAFF}.chapter-meta{display:flex;flex-wrap:wrap;gap:8px;font-size:11px;color:#6E6B7B}.chapter-progress{height:6px;border-radius:999px;background:#E5E3F3;overflow:hidden}.chapter-progress span{display:block;height:100%;background:linear-gradient(90deg,#6E63E8,#00CFE8)}.activity-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(240px,1fr));gap:16px}.activity-card{border:1px solid #E5E3F3;border-radius:12px;padding:18px;display:grid;gap:10px;background:#fff}.activity-card strong{font-size:14px;color:#2F2B3D}.activity-meta{display:flex;justify-content:space-between;align-items:center;font-size:12px;color:#6E6B7B}.resource-chip{padding:4px 10px;border-radius:999px;font-size:11px;font-weight:600;background:#F3F2F7;color:#6E63E8}.book-footer{padding:20px;border-top:1px solid #F1F0F7;display:flex;flex-wrap:wrap;gap:12px;justify-content:space-between;font-size:12px;color:#6E6B7B}.notes-grid{display:grid;gap:12px;background:#F8F7FD;border:1px solid #E5E3F3;border-radius:12px;padding:20px}.note-item{display:flex;gap:12px}.note-icon{width:36px;height:36px;border-radius:10px;background:#6E63E8;color:#fff;display:flex;align-items:center;justify-content:center}.note-text{font-size:13px;color:#3F3F46}.timeline{display:grid;gap:10px}.timeline-row{display:flex;align-items:center;gap:12px;padding:12px;border-radius:10px;background:#FBFAFF;border:1px solid #E5E3F3}.timeline-dot{width:10px;height:10px;border-radius:50%;background:#6E63E8}.compact-list{display:grid;gap:10px}.compact-item{display:flex;justify-content:space-between;align-items:center;background:#fff;border:1px solid #E5E3F3;border-radius:10px;padding:12px}.compact-item strong{font-size:13px;color:#2F2B3D}.empty-state{padding:80px 20px;border:2px dashed #D8D6DE;border-radius:16px;text-align:center;color:#6E6B7B;display:grid;gap:14px}.empty-state svg{width:160px;height:160px;opacity:.2;margin:0 auto}.empty-state button{justify-self:center;padding:10px 18px;border-radius:8px;border:none;background:#6E63E8;color:#fff;font-weight:600;cursor:pointer;transition:.2s}.empty-state button:hover{background:#5C52D8}`;

const wrap = (content) => `
<div class="mission-book">${content}</div>
<style>${css}</style>
`;

export const Default = {
  render: () => wrap(`
    <div class="book-card">
      <div class="book-header">
        <div class="book-cover">
          <div style="text-align:center;color:#3F3F8F;font-size:30px;font-weight:700">📘</div>
        </div>
        <div class="book-info">
          <div class="book-title">Missão Livro: Guardiões do Cerrado</div>
          <div style="font-size:13px;max-width:540px">Sequência de aprendizagem com capítulos interativos, trilhas de leitura e evidências para desenvolver consciência ambiental e produção textual.</div>
          <div class="book-meta">
            <span>Português • 7º Ano</span>
            <span>6 capítulos</span>
            <span>Tempo estimado: 4 semanas</span>
            <span>Atualizado em 08/02 às 09h</span>
          </div>
        </div>
      </div>
      <div class="book-body">
        <div class="book-section">
          <div class="section-heading"><i class="bi bi-journal-bookmark"></i> Resumo da obra</div>
          <div class="section-text">A missão propõe uma jornada narrativa em torno de histórias sobre o Cerrado brasileiro. Cada capítulo traz desafios, recursos multimídia e momentos de reflexão conectados à BNCC. Ao final, as equipes produzem um guia ilustrado para a comunidade escolar.</div>
        </div>
        <div class="book-section">
          <div class="section-heading"><i class="bi bi-list-ol"></i> Estrutura dos capítulos</div>
          <div class="chapter-list">
            ${[
              { title: 'Capítulo 1 • Conhecendo o Cerrado', tags: ['Podcast introdutório', 'Mapa mental'], progress: 100 },
              { title: 'Capítulo 2 • Fauna e flora', tags: ['Laboratório virtual', 'Glossário colaborativo'], progress: 82 },
              { title: 'Capítulo 3 • Comunidades tradicionais', tags: ['Entrevista guiada', 'Registro fotográfico'], progress: 65 }
            ].map(cap => `
              <div class="chapter-item">
                <div style="font-weight:600;color:#2F2B3D">${cap.title}</div>
                <div class="chapter-meta">
                  ${cap.tags.map(tag => `<span>${tag}</span>`).join('')}
                </div>
                <div class="chapter-progress"><span style="width:${cap.progress}%"></span></div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
      <div class="book-footer">
        <div>Responsável: Profª Helena • Compartilhado com coordenação pedagógica</div>
        <div style="display:flex;gap:10px">
          <span class="resource-chip">Versão 2.3</span>
          <span class="resource-chip">Plano exportável</span>
        </div>
      </div>
    </div>
  `)
};

export const SequenciaCapitulos = {
  render: () => wrap(`
    <div class="book-card">
      <div class="book-header" style="background:linear-gradient(135deg,#00CFE8,#2F8DEE)">
        <div class="book-cover">
          <div style="text-align:center;color:#0C4A6E;font-size:30px;font-weight:700">📗</div>
        </div>
        <div class="book-info">
          <div class="book-title">Missão Livro: Viagem pelo Sistema Solar</div>
          <div class="book-meta">
            <span>Ciências • 6º Ano</span>
            <span>5 capítulos interativos</span>
            <span>Laboratório virtual integrado</span>
          </div>
        </div>
      </div>
      <div class="book-body">
        <div class="chapter-list">
          ${[
            { number: 'Cap. 1', title: 'Terra: nosso ponto de partida', detail: 'Observação guiada e quiz diagnóstico', status: 'Concluído' },
            { number: 'Cap. 2', title: 'Planetas rochosos', detail: 'Modelagem 3D e produção de podcasts', status: 'Em andamento' },
            { number: 'Cap. 3', title: 'Gigantes gasosos', detail: 'Análise de dados da NASA e infográfico colaborativo', status: 'Agendado' }
          ].map(chapter => `
            <div class="chapter-item" style="background:#F1FCFF;border-color:#CDECF7">
              <div style="display:flex;justify-content:space-between;align-items:center">
                <div style="display:flex;align-items:center;gap:12px">
                  <span class="resource-chip" style="background:#E0F7FA;color:#0D4E75">${chapter.number}</span>
                  <div style="font-weight:600;color:#0C4A6E">${chapter.title}</div>
                </div>
                <span class="resource-chip" style="background:#E0F2FE;color:#0C4A6E">${chapter.status}</span>
              </div>
              <div class="section-text" style="color:#0C4A6E">${chapter.detail}</div>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `)
};

export const AtividadesComplementares = {
  render: () => wrap(`
    <div class="book-card">
      <div class="book-header" style="background:linear-gradient(135deg,#FF9F43,#F76B1C)">
        <div class="book-cover">
          <div style="text-align:center;color:#A43E00;font-size:30px;font-weight:700">📙</div>
        </div>
        <div class="book-info">
          <div class="book-title">Missão Livro: Histórias e Sabores do Brasil</div>
          <div class="book-meta">
            <span>Interdisciplinar • 5º Ano</span>
            <span>Gastronomia + História</span>
            <span>Projetos para famílias</span>
          </div>
        </div>
      </div>
      <div class="book-body">
        <div class="book-section">
          <div class="section-heading"><i class="bi bi-collection"></i> Atividades por capítulo</div>
          <div class="activity-grid">
            ${[
              { name: 'Receita em família', xp: '+150 XP', entrega: 'Upload de vídeo até 12/02' },
              { name: 'Linha do tempo histórica', xp: '+90 XP', entrega: 'Quadro colaborativo' },
              { name: 'Podcast com entrevistas', xp: '+120 XP', entrega: 'Aplicativo mobile' },
              { name: 'Caderno de campo ilustrado', xp: '+80 XP', entrega: 'Fotos e relatos' }
            ].map(act => `
              <div class="activity-card">
                <strong>${act.name}</strong>
                <div class="section-text" style="font-size:12px">${act.entrega}</div>
                <div class="activity-meta">
                  <span class="resource-chip" style="background:#FFE8CC;color:#A43E00">${act.xp}</span>
                  <span><i class="bi bi-clock"></i> 1 semana</span>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    </div>
  `)
};

export const LeiturasGuiadas = {
  render: () => wrap(`
    <div class="book-card">
      <div class="book-header" style="background:linear-gradient(135deg,#2F8DEE,#7847FB)">
        <div class="book-cover">
          <div style="text-align:center;color:#1A237E;font-size:30px;font-weight:700">📔</div>
        </div>
        <div class="book-info">
          <div class="book-title">Missão Livro: Poemas Urbanos</div>
          <div class="book-meta">
            <span>Português • 9º Ano</span>
            <span>Leitura compartilhada</span>
            <span>Clubes de escrita</span>
          </div>
        </div>
      </div>
      <div class="book-body">
        <div class="book-section">
          <div class="section-heading"><i class="bi bi-people"></i> Grupos de leitura</div>
          <div class="activity-grid">
            ${[
              { grupo: 'Coletivo Vozes', foco: 'Poetas contemporâneos', encontro: 'Quartas às 14h' },
              { grupo: 'Ritmo da Cidade', foco: 'Slam e poesia falada', encontro: 'Segundas às 16h' },
              { grupo: 'Verso & Metrô', foco: 'Lirismo e memória', encontro: 'Sextas às 10h' }
            ].map(group => `
              <div class="activity-card" style="background:#F3F2FF;border-color:#D7D4FF">
                <strong>${group.grupo}</strong>
                <div class="section-text">${group.foco}</div>
                <div class="activity-meta">
                  <span><i class="bi bi-calendar-event"></i> ${group.encontro}</span>
                  <span class="resource-chip" style="background:#E5E2FF;color:#433878">Modalidade híbrida</span>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
        <div class="book-section">
          <div class="section-heading"><i class="bi bi-chat-square-text"></i> Perguntas disparadoras</div>
          <div class="notes-grid">
            ${[
              'Quais imagens da cidade aparecem nos poemas e como dialogam com a realidade dos estudantes?',
              'Como a voz poética se manifesta em diferentes estilos? Comparar com produções dos estudantes.',
              'Que conexões podem ser feitas entre poesia urbana e movimentos sociais atuais?'
            ].map(note => `
              <div class="note-item">
                <div class="note-icon"><i class="bi bi-lightbulb"></i></div>
                <div class="note-text">${note}</div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    </div>
  `)
};

export const LinhaDoTempo = {
  render: () => wrap(`
    <div class="book-card">
      <div class="book-header" style="background:linear-gradient(135deg,#28C76F,#19A463)">
        <div class="book-cover">
          <div style="text-align:center;color:#0B3D2E;font-size:30px;font-weight:700">📒</div>
        </div>
        <div class="book-info">
          <div class="book-title">Missão Livro: Projeto Agroecologia</div>
          <div class="book-meta">
            <span>Ciências da Natureza</span>
            <span>BNCC EF08CI16</span>
            <span>Parceria com Agricultura Familiar</span>
          </div>
        </div>
      </div>
      <div class="book-body">
        <div class="timeline">
          ${[
            { etapa: 'Leitura orientada', detalhe: 'Capítulos 1 e 2 com foco em sistemas agroflorestais', data: 'Semana 1', status: 'Concluído' },
            { etapa: 'Visita técnica', detalhe: 'Registro de diário de campo e entrevistas', data: 'Semana 2', status: 'Em andamento' },
            { etapa: 'Produção de cartilha', detalhe: 'Equipe define layout e recursos multimídia', data: 'Semana 3', status: 'Planejado' }
          ].map(line => `
            <div class="timeline-row">
              <span class="timeline-dot" style="background:${line.status === 'Concluído' ? '#28C76F' : line.status === 'Em andamento' ? '#6E63E8' : '#FF9F43'}"></span>
              <div>
                <div style="font-weight:600;color:#2F2B3D">${line.etapa}</div>
                <div style="font-size:12px;color:#6E6B7B">${line.detalhe}</div>
              </div>
              <div style="margin-left:auto;text-align:right;font-size:11px;color:#6E6B7B">
                <div>${line.data}</div>
                <div>${line.status}</div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `)
};

export const ChecklistProfessor = {
  render: () => wrap(`
    <div class="book-card">
      <div class="book-header" style="background:linear-gradient(135deg,#3F3F8F,#171742)">
        <div class="book-cover">
          <div style="text-align:center;color:#DBEAFE;font-size:30px;font-weight:700">📓</div>
        </div>
        <div class="book-info">
          <div class="book-title">Checklist para mediação</div>
          <div class="book-meta">
            <span>Professor responsável: Marcelo</span>
            <span>Atualizado em 09/02 às 07h30</span>
          </div>
        </div>
      </div>
      <div class="book-body">
        <div class="book-section">
          <div class="section-heading"><i class="bi bi-check2-square"></i> Itens essenciais</div>
          <div class="chapter-list">
            ${[
              { item: 'Aplicar sondagem diagnóstica antes do Cap. 1', status: 'Concluído', obs: 'Dados registrados no painel da turma' },
              { item: 'Reservar laboratório para experiência do Cap. 3', status: 'Em andamento', obs: 'Solicitação enviada à coordenação' },
              { item: 'Disponibilizar rubrica de avaliação no app', status: 'Pendente', obs: 'Criar modelo para feedback em vídeo' }
            ].map(check => `
              <div class="chapter-item" style="background:#F8F7FD">
                <div style="font-weight:600;color:#2F2B3D">${check.item}</div>
                <div class="section-text" style="font-size:12px;color:#6E6B7B">${check.obs}</div>
                <div class="resource-chip" style="width:max-content;background:${check.status==='Concluído'?'#E3FCEC':'#E0E7FF'};color:${check.status==='Concluído'?'#1F9D55':'#3F3F8F'}">${check.status}</div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
      <div class="book-footer">
        <div>Compartilhar com monitoria • Notificar coordenação caso prazos se alterem</div>
      </div>
    </div>
  `)
};

export const Compacto = {
  render: () => wrap(`
    <div class="book-card" style="max-width:540px;margin:0 auto">
      <div class="book-header" style="padding:20px">
        <div class="book-info" style="gap:8px">
          <div class="book-title" style="font-size:18px">Missão Livro: Diário de Bordo</div>
          <div class="book-meta" style="gap:6px">
            <span>3 capítulos curtos</span>
            <span>Modo mobile</span>
          </div>
        </div>
      </div>
      <div class="book-body" style="padding:20px">
        <div class="compact-list">
          ${[
            { title: 'Cap. 1 • Viagem inaugural', entrega: 'Áudio reflexivo', status: 'Concluído' },
            { title: 'Cap. 2 • Obstáculos e aprendizados', entrega: 'Texto breve', status: 'Em andamento' },
            { title: 'Cap. 3 • Projeção de futuro', entrega: 'Infográfico', status: 'Agendado' }
          ].map(item => `
            <div class="compact-item">
              <div>
                <strong>${item.title}</strong>
                <div style="font-size:11px;color:#6E6B7B">${item.entrega}</div>
              </div>
              <span class="resource-chip" style="background:${item.status==='Concluído'?'#E3FCEC':'#F1F0F7'};color:${item.status==='Concluído'?'#1F9D55':'#6E63E8'}">${item.status}</span>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `)
};

export const Vazio = {
  render: () => wrap(`
    <div class="empty-state">
      <svg viewBox="0 0 32 32" fill="currentColor">
        <path d="M7 5h18a2 2 0 0 1 2 2v18l-6-3-6 3-6-3-6 3V7a2 2 0 0 1 2-2z"/>
        <path d="M12 10h8M12 14h5" stroke="#fff" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      <div style="font-size:18px;font-weight:600">Nenhuma missão livro configurada</div>
      <div style="font-size:14px">Monte uma sequência de capítulos com recursos multimídia e evidências avaliativas.</div>
      <button><i class="bi bi-plus-lg"></i> Criar missão livro</button>
    </div>
  `)
};
