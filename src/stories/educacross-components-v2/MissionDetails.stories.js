/**
 * MissionDetails - Detalhes Completos de Missão
 * ============================================
 * Visualização detalhada de missão com objetivos, timeline e recursos
 * 
 * @component MissionDetails
 * @category Educacross Components V2 / Missions
 * @source educacross-frontoffice (gestão de missões)
 * @priority P2
 * @status PIXEL-PERFECT
 * @since 2.0.0
 */

export default {
  title: 'Front-office/Missions/MissionDetails',
  tags: ['autodocs'],
  parameters: { layout: 'padded' }
};

const baseCss = `.mission-details{max-width:960px;margin:0 auto;padding:24px;display:grid;gap:20px}.mission-card{background:#fff;border:1px solid #D8D6DE;border-radius:12px;overflow:hidden;box-shadow:0 4px 16px rgba(15,23,42,.04)}.mission-header{padding:24px;border-bottom:1px solid #F3F2F7;display:flex;flex-wrap:wrap;gap:16px;align-items:center;justify-content:space-between}.mission-title{font-size:22px;font-weight:700;color:#2F2B3D}.mission-meta{display:flex;flex-wrap:wrap;gap:12px;font-size:13px;color:#6E6B7B}.meta-item{display:inline-flex;align-items:center;gap:6px;padding:4px 10px;border-radius:999px;background:#F3F2F7}.meta-item i{color:#6E63E8}.mission-body{padding:24px;display:grid;gap:20px}.mission-section{display:grid;gap:12px}.section-title{display:flex;align-items:center;gap:8px;font-size:15px;font-weight:600;color:#3F3F46}.section-title i{color:#6E63E8}.section-content{font-size:13px;line-height:1.6;color:#524F5E}.objective-list{display:grid;gap:10px}.objective-item{display:flex;gap:10px;align-items:flex-start;background:#F8F7FD;border-radius:10px;padding:12px 16px;border:1px solid #E2E1F7}.objective-index{width:24px;height:24px;border-radius:50%;background:#6E63E8;color:#fff;font-weight:600;display:flex;align-items:center;justify-content:center;font-size:13px}.objective-info{display:grid;gap:4px}.objective-tags{display:flex;flex-wrap:wrap;gap:6px;font-size:11px}.objective-tag{padding:3px 8px;border-radius:999px;background:#E2E1F7;color:#6E63E8;font-weight:600}.timeline{display:grid;gap:12px}.timeline-item{display:flex;align-items:center;gap:12px;padding:12px;border:1px solid #E9E7EF;border-radius:8px}.timeline-badge{width:10px;height:10px;border-radius:50%;background:#6E63E8}.timeline-label{font-size:13px;color:#2F2B3D;font-weight:600}.timeline-date{font-size:12px;color:#6E6B7B}.student-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:12px}.student-card{border:1px solid #E9E7EF;border-radius:10px;padding:14px;display:grid;gap:10px;background:#FCFCFE}.student-header{display:flex;align-items:center;gap:12px}.student-avatar{width:40px;height:40px;border-radius:50%;background:#E2E1F7;color:#6E63E8;font-weight:700;display:flex;align-items:center;justify-content:center}.student-name{font-weight:600;color:#3F3F46;font-size:14px}.student-status{font-size:12px;color:#6E6B7B}.student-progress{height:6px;border-radius:999px;background:#E9E7EF;overflow:hidden}.student-progress span{display:block;height:100%;background:#6E63E8;border-radius:999px}.resource-list{display:grid;gap:8px}.resource-item{display:flex;justify-content:space-between;align-items:center;padding:12px 14px;border:1px solid #E9E7EF;border-radius:8px;background:#fff}.resource-left{display:flex;align-items:center;gap:10px;font-size:13px;color:#3F3F46}.resource-chip{padding:3px 8px;border-radius:999px;font-size:11px;font-weight:600;background:#F3F2F7;color:#6E63E8}.progress-card{display:flex;align-items:center;justify-content:space-between;padding:18px;border:1px solid #E9E7EF;border-radius:12px;background:linear-gradient(135deg,#6E63E8,#3F3F8F);color:#fff}.progress-value{font-size:40px;font-weight:700}.progress-meta{font-size:12px;opacity:.85}.mission-footer{padding:20px;border-top:1px solid #F3F2F7;display:flex;flex-wrap:wrap;gap:12px;justify-content:space-between;font-size:12px;color:#6E6B7B}.mission-badges{display:flex;flex-wrap:wrap;gap:8px}.mission-badge{padding:6px 12px;border-radius:999px;font-size:11px;font-weight:600}.mission-badge.subject{background:#6E63E810;color:#6E63E8}.mission-badge.level{background:#00CFE810;color:#00CFE8}.mission-badge.status{background:#28C76F12;color:#28C76F}.mission-empty{padding:60px 20px;text-align:center;border:2px dashed #D8D6DE;border-radius:12px;color:#6E6B7B;display:grid;gap:12px}.mission-empty svg{width:140px;height:140px;margin:0 auto;opacity:.25}.mission-empty button{align-self:center;padding:10px 20px;border:none;border-radius:8px;background:#6E63E8;color:#fff;font-weight:600;cursor:pointer;transition:.2s}.mission-empty button:hover{background:#5C52D8}`;

const withContainer = (content) => `
<div class="mission-details">${content}</div>
<style>${baseCss}</style>
`;

export const Default = {
  render: () => withContainer(`
    <div class="mission-card">
      <div class="mission-header">
        <div>
          <div class="mission-title">Missão: Frações na Cozinha</div>
          <div class="mission-meta">
            <span class="meta-item"><i class="bi bi-bookmark"></i> Matemática • 8º Ano A</span>
            <span class="meta-item"><i class="bi bi-graph-up"></i> Dificuldade: Intermediário</span>
            <span class="meta-item"><i class="bi bi-alarm"></i> Concluir até 20/02</span>
          </div>
        </div>
        <div class="progress-card">
          <div>
            <div class="progress-value">72%</div>
            <div class="progress-meta">23 de 32 alunos finalizaram</div>
          </div>
          <div style="font-size:13px;text-align:right">
            <div><i class="bi bi-trophy"></i> 420 XP</div>
            <div><i class="bi bi-clock"></i> 3h estimadas</div>
          </div>
        </div>
      </div>
      <div class="mission-body">
        <div class="mission-section">
          <div class="section-title"><i class="bi bi-bullseye"></i> Objetivos de Aprendizagem</div>
          <div class="objective-list">
            ${[
              { title: 'Identificar frações equivalentes no cotidiano', tags: ['BNCC - EF08MA09', 'Competência 3'] },
              { title: 'Resolver problemas com frações em receitas', tags: ['Habilidade 8B', 'Pensamento crítico'] },
              { title: 'Colaborar em equipes para dividir tarefas', tags: ['Competência socioemocional'] }
            ].map((obj, index) => `
              <div class="objective-item">
                <div class="objective-index">${index + 1}</div>
                <div class="objective-info">
                  <div style="font-weight:600;color:#2F2B3D">${obj.title}</div>
                  <div class="objective-tags">
                    ${obj.tags.map(tag => `<span class="objective-tag">${tag}</span>`).join('')}
                  </div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
        <div class="mission-section">
          <div class="section-title"><i class="bi bi-calendar-event"></i> Cronograma</div>
          <div class="timeline">
            ${[
              { label: 'Preparação e leitura da missão', date: '01 a 05 de fevereiro' },
              { label: 'Execução em equipes (laboratório de ciências)', date: '06 a 15 de fevereiro' },
              { label: 'Apresentação dos resultados', date: '18 a 20 de fevereiro' }
            ].map(item => `
              <div class="timeline-item">
                <span class="timeline-badge"></span>
                <div>
                  <div class="timeline-label">${item.label}</div>
                  <div class="timeline-date">${item.date}</div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
        <div class="mission-section">
          <div class="section-title"><i class="bi bi-people"></i> Equipes e Progresso</div>
          <div class="student-grid">
            ${[
              { name: 'Equipe 1 • Ana, João, Laura', status: 'Missão em revisão', progress: 88 },
              { name: 'Equipe 2 • Bruno, Camila, Igor', status: 'Enviaram evidências', progress: 76 },
              { name: 'Equipe 3 • Diana, Enzo, Maria', status: 'Precisam reenviar foto', progress: 58 },
              { name: 'Equipe 4 • Felipe, Helena, Otávio', status: 'Começando atividades', progress: 32 }
            ].map(team => `
              <div class="student-card">
                <div class="student-header">
                  <div class="student-avatar">${team.name.charAt(7)}</div>
                  <div>
                    <div class="student-name">${team.name}</div>
                    <div class="student-status">${team.status}</div>
                  </div>
                </div>
                <div class="student-progress"><span style="width:${team.progress}%"></span></div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
      <div class="mission-footer">
        <div class="mission-badges">
          <span class="mission-badge subject">Temática: Alimentação saudável</span>
          <span class="mission-badge level">Competências socioemocionais</span>
          <span class="mission-badge status">Status: Ativa</span>
        </div>
        <div>Última atualização pelo Prof. Ricardo em 08/02 às 10h14</div>
      </div>
    </div>
  `)
};

export const ComEvidencias = {
  render: () => withContainer(`
    <div class="mission-card">
      <div class="mission-header">
        <div>
          <div class="mission-title">Missão: Documentando Experimentos</div>
          <div class="mission-meta">
            <span class="meta-item"><i class="bi bi-book"></i> Ciências • 7º Ano B</span>
            <span class="meta-item"><i class="bi bi-cloud-arrow-up"></i> Evidências obrigatórias</span>
            <span class="meta-item"><i class="bi bi-check-circle"></i> Avaliação automática + manual</span>
          </div>
        </div>
        <div class="progress-card" style="background:linear-gradient(135deg,#00CFE8,#0288D1)">
          <div>
            <div class="progress-value">18</div>
            <div class="progress-meta">Evidências aguardando revisão</div>
          </div>
          <div style="text-align:right;font-size:13px">
            <div><i class="bi bi-image"></i> Fotos</div>
            <div><i class="bi bi-journal-text"></i> Relatórios</div>
          </div>
        </div>
      </div>
      <div class="mission-body">
        <div class="mission-section">
          <div class="section-title"><i class="bi bi-camera"></i> Evidências Enviadas</div>
          <div class="resource-list">
            ${[
              { type: 'Relatório PDF', by: 'Ana e Sofia', date: 'Enviado em 07/02 às 18h40', status: 'Aguardando feedback' },
              { type: 'Galeria de fotos', by: 'Bruno e Tiago', date: 'Enviado em 07/02 às 19h05', status: 'Aprovado' },
              { type: 'Vídeo curto', by: 'Lia e Pedro', date: 'Enviado em 08/02 às 08h10', status: 'Solicitar ajustes' }
            ].map(ev => `
              <div class="resource-item" style="border-radius:10px">
                <div class="resource-left">
                  <i class="bi bi-file-earmark-richtext" style="color:#6E63E8"></i>
                  <div>
                    <div style="font-weight:600">${ev.type}</div>
                    <div style="font-size:12px;color:#6E6B7B">${ev.by} • ${ev.date}</div>
                  </div>
                </div>
                <span class="resource-chip">${ev.status}</span>
              </div>
            `).join('')}
          </div>
        </div>
        <div class="mission-section">
          <div class="section-title"><i class="bi bi-chat-left-text"></i> Feedback do Professor</div>
          <div class="section-content">
            <p>Excelente registro fotográfico das etapas do experimento. Atenção para padronizar títulos dos arquivos e incluir data no relatório final. Lembrar de anexar consentimento de imagem das famílias antes da publicação no mural da turma.</p>
            <div class="objective-tags">
              <span class="objective-tag">Roteiro disponibilizado</span>
              <span class="objective-tag">Checklist concluído</span>
              <span class="objective-tag">Próxima revisão: 12/02</span>
            </div>
          </div>
        </div>
      </div>
      <div class="mission-footer">
        <div class="mission-badges">
          <span class="mission-badge subject">Requer revisão manual</span>
          <span class="mission-badge level">Evidências multimídia</span>
        </div>
        <div>Última resposta enviada às 09h12 por Profª Camila</div>
      </div>
    </div>
  `)
};

export const Gamificacao = {
  render: () => withContainer(`
    <div class="mission-card">
      <div class="mission-header">
        <div>
          <div class="mission-title">Missão Gamificada: Guardiões da Biblioteca</div>
          <div class="mission-meta">
            <span class="meta-item"><i class="bi bi-stack"></i> Português • 6º Ano</span>
            <span class="meta-item"><i class="bi bi-stars"></i> Pontos por colaboração</span>
            <span class="meta-item"><i class="bi bi-gem"></i> Badges exclusivos</span>
          </div>
        </div>
        <div class="progress-card" style="background:linear-gradient(135deg,#FF9F43,#F76B1C)">
          <div>
            <div class="progress-value" style="font-size:36px">1280 XP</div>
            <div class="progress-meta">Pontuação média da turma</div>
          </div>
          <div style="font-size:13px;text-align:right">
            <div><i class="bi bi-award"></i> Medalhas raras: 6</div>
            <div><i class="bi bi-gift"></i> Recompensas desbloqueadas: 12</div>
          </div>
        </div>
      </div>
      <div class="mission-body">
        <div class="mission-section">
          <div class="section-title"><i class="bi bi-trophy"></i> Conquistas Disponíveis</div>
          <div class="objective-list">
            ${[
              { title: 'Guardião Dourado', tags: ['Entrega pontual', '+150 XP', 'Badge lendária'] },
              { title: 'Narrador Criativo', tags: ['Texto com 3 recursos narrativos', '+80 XP'] },
              { title: 'Mentor da Turma', tags: ['Ajudou 3 colegas', '+60 XP', 'Mentoria'] }
            ].map((badge, index) => `
              <div class="objective-item" style="background:#FFF7E9;border-color:#FDD9A5">
                <div class="objective-index" style="background:#FF9F43">${index + 1}</div>
                <div class="objective-info">
                  <div style="font-weight:600;color:#C05621">${badge.title}</div>
                  <div class="objective-tags">
                    ${badge.tags.map(tag => `<span class="objective-tag" style="background:#FFE8CC;color:#BF4B17">${tag}</span>`).join('')}
                  </div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
        <div class="mission-section">
          <div class="section-title"><i class="bi bi-bar-chart"></i> Ranking semanal</div>
          <div class="student-grid" style="grid-template-columns:repeat(auto-fill,minmax(200px,1fr))">
            ${[
              { name: 'Ana Clara', xp: 1890, badge: 'Lendária' },
              { name: 'Gabriel Souza', xp: 1720, badge: 'Épica' },
              { name: 'Isabela Nunes', xp: 1615, badge: 'Rara' },
              { name: 'Miguel Teixeira', xp: 1580, badge: 'Rara' }
            ].map(player => `
              <div class="student-card" style="background:#FFF4E8;border-color:#FBD0A3">
                <div class="student-header">
                  <div class="student-avatar" style="background:#FFB26B;color:#fff">${player.name.charAt(0)}</div>
                  <div>
                    <div class="student-name" style="color:#C05621">${player.name}</div>
                    <div class="student-status">${player.xp} XP • Badge ${player.badge}</div>
                  </div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
      <div class="mission-footer">
        <div class="mission-badges">
          <span class="mission-badge" style="background:#FF9F4315;color:#C05621">Regras gamificadas</span>
          <span class="mission-badge" style="background:#FF9F4315;color:#C05621">Feedback instantâneo</span>
        </div>
        <div>Recompensa semanal: escolha coletiva de leitura</div>
      </div>
    </div>
  `)
};

export const PlanejamentoProfessor = {
  render: () => withContainer(`
    <div class="mission-card">
      <div class="mission-header">
        <div>
          <div class="mission-title">Planejamento - Missão Interdisciplinar</div>
          <div class="mission-meta">
            <span class="meta-item"><i class="bi bi-collection"></i> Matemática + Ciências + Arte</span>
            <span class="meta-item"><i class="bi bi-people"></i> 3 turmas • 92 alunos</span>
            <span class="meta-item"><i class="bi bi-broadcast-pin"></i> Aula híbrida</span>
          </div>
        </div>
        <div class="progress-card" style="background:linear-gradient(135deg,#2F8DEE,#5ED0FF)">
          <div>
            <div class="progress-value">4</div>
            <div class="progress-meta">Encontros planejados</div>
          </div>
          <div style="text-align:right;font-size:13px">
            <div><i class="bi bi-clipboard-check"></i> Materiais prontos</div>
            <div><i class="bi bi-shield-check"></i> Autorizações ok</div>
          </div>
        </div>
      </div>
      <div class="mission-body">
        <div class="mission-section">
          <div class="section-title"><i class="bi bi-journal-text"></i> Estrutura da Missão</div>
          <div class="section-content" style="display:grid;gap:8px">
            <div><strong>Contexto:</strong> Estudo das fases da lua com criação artística de painéis luminosos.</div>
            <div><strong>Competências:</strong> Observação científica, registro fotográfico, apresentação oral e criatividade visual.</div>
            <div><strong>Recursos agendados:</strong> Laboratório de ciências, sala maker e biblioteca.</div>
          </div>
        </div>
        <div class="mission-section">
          <div class="section-title"><i class="bi bi-ui-checks"></i> Checklist do Professor</div>
          <div class="resource-list">
            ${[
              { item: 'Disponibilizar diário de bordo digital', status: 'Concluído', icon: 'bi-check-circle', color: '#28C76F' },
              { item: 'Enviar lembrete às famílias', status: 'Agendado para 12/02', icon: 'bi-clock-history', color: '#FF9F43' },
              { item: 'Separar materiais para mini planetário', status: 'Em andamento', icon: 'bi-gear', color: '#6E63E8' }
            ].map(check => `
              <div class="resource-item">
                <div class="resource-left">
                  <i class="bi ${check.icon}" style="color:${check.color}"></i>
                  <div>
                    <div style="font-weight:600">${check.item}</div>
                    <div style="font-size:12px;color:#6E6B7B">${check.status}</div>
                  </div>
                </div>
                <span class="resource-chip">${check.color === '#28C76F' ? 'OK' : 'Planejado'}</span>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
      <div class="mission-footer">
        <div class="mission-badges">
          <span class="mission-badge" style="background:#2F8DEE20;color:#2F8DEE">Interdisciplinar</span>
          <span class="mission-badge" style="background:#2F8DEE20;color:#2F8DEE">Metodologias ativas</span>
        </div>
        <div>Compartilhado com coordenação pedagógica em 09/02</div>
      </div>
    </div>
  `)
};

export const PainelGestor = {
  render: () => withContainer(`
    <div class="mission-card">
      <div class="mission-header">
        <div>
          <div class="mission-title">Resumo para Coordenação</div>
          <div class="mission-meta">
            <span class="meta-item"><i class="bi bi-columns-gap"></i> 28 missões ativas</span>
            <span class="meta-item"><i class="bi bi-mortarboard"></i> 612 alunos envolvidos</span>
            <span class="meta-item"><i class="bi bi-graph-up"></i> 86% conclusão média</span>
          </div>
        </div>
        <div class="progress-card" style="background:linear-gradient(135deg,#3F3F8F,#171742)">
          <div>
            <div class="progress-value" style="font-size:36px">12</div>
            <div class="progress-meta">Missões com atenção</div>
          </div>
          <div style="font-size:13px;text-align:right">
            <div><i class="bi bi-exclamation-triangle"></i> 4 sem evidências</div>
            <div><i class="bi bi-arrow-repeat"></i> 8 aguardando revisão</div>
          </div>
        </div>
      </div>
      <div class="mission-body">
        <div class="mission-section">
          <div class="section-title"><i class="bi bi-list-check"></i> Prioridades da Semana</div>
          <div class="resource-list">
            ${[
              { mission: 'Projeto Cidadania Digital', owner: 'Profª Helena', status: 'Solicitar atualização de evidências' },
              { mission: 'Laboratório de Química Verde', owner: 'Prof. Victor', status: 'Sem nota atribuída há 5 dias' },
              { mission: 'Crônicas do Cotidiano', owner: 'Profª Carla', status: 'Feedback da coordenação enviado' }
            ].map(priority => `
              <div class="resource-item">
                <div class="resource-left">
                  <i class="bi bi-flag"></i>
                  <div>
                    <div style="font-weight:600">${priority.mission}</div>
                    <div style="font-size:12px;color:#6E6B7B">${priority.owner}</div>
                  </div>
                </div>
                <span class="resource-chip">${priority.status}</span>
              </div>
            `).join('')}
          </div>
        </div>
        <div class="mission-section">
          <div class="section-title"><i class="bi bi-award"></i> Destaques da Semana</div>
          <div class="student-grid" style="grid-template-columns:repeat(auto-fill,minmax(210px,1fr))">
            ${[
              { name: 'Missão Matemática Financeira', prof: 'Prof. Diego', result: '98% dos alunos entregaram com excelência' },
              { name: 'Circuito de Ciências', prof: 'Profª Larissa', result: 'Projeto apresentado na feira municipal' }
            ].map(highlight => `
              <div class="student-card" style="background:#F3F2FF;border-color:#D7D4FF">
                <div class="student-name" style="color:#3F3F8F">${highlight.name}</div>
                <div class="student-status">${highlight.prof}</div>
                <div style="font-size:12px;color:#3F3F46">${highlight.result}</div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
      <div class="mission-footer">
        <div class="mission-badges">
          <span class="mission-badge" style="background:#3F3F8F15;color:#3F3F8F">Painel de acompanhamento</span>
        </div>
        <div>Dados sincronizados às 07h45 • Coordenador: Rodrigo</div>
      </div>
    </div>
  `)
};

export const VisaoAluno = {
  render: () => withContainer(`
    <div class="mission-card">
      <div class="mission-header">
        <div>
          <div class="mission-title">Missão do Aluno: Exploradores do Cerrado</div>
          <div class="mission-meta">
            <span class="meta-item"><i class="bi bi-person"></i> Aluna: Júlia Menezes</span>
            <span class="meta-item"><i class="bi bi-calendar-check"></i> Entregar até 18/02</span>
            <span class="meta-item"><i class="bi bi-star"></i> XP máximo: 320</span>
          </div>
        </div>
        <div class="progress-card" style="background:linear-gradient(135deg,#6E63E8,#00CFE8)">
          <div>
            <div class="progress-value" style="font-size:36px">3/5</div>
            <div class="progress-meta">Etapas concluídas</div>
          </div>
          <div style="font-size:13px;text-align:right">
            <div><i class="bi bi-lightbulb"></i> 2 dicas restantes</div>
            <div><i class="bi bi-chat-dots"></i> Feedback disponível</div>
          </div>
        </div>
      </div>
      <div class="mission-body">
        <div class="mission-section">
          <div class="section-title"><i class="bi bi-list-ol"></i> Tarefas da Missão</div>
          <div class="objective-list">
            ${[
              { title: 'Ler o resumo sobre biomas brasileiros', status: 'Concluído', icon: 'bi-check-circle', color: '#28C76F' },
              { title: 'Registrar observações em diário ilustrado', status: 'Em andamento', icon: 'bi-pencil-square', color: '#6E63E8' },
              { title: 'Enviar áudio explicando descobertas', status: 'Pendente', icon: 'bi-mic', color: '#FF9F43' }
            ].map((task, index) => `
              <div class="objective-item" style="background:#F8F7FD;border-color:#E2E1F7">
                <div class="objective-index" style="background:${task.color}">${index + 1}</div>
                <div class="objective-info">
                  <div style="display:flex;align-items:center;gap:8px;font-weight:600;color:#2F2B3D">
                    <i class="bi ${task.icon}" style="color:${task.color}"></i>
                    ${task.title}
                  </div>
                  <div style="font-size:12px;color:#6E6B7B">Status: ${task.status}</div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
        <div class="mission-section">
          <div class="section-title"><i class="bi bi-emoji-smile"></i> Feedback recebido</div>
          <div class="section-content">
            <p>Excelente conexão entre textos e ilustrações! Para a próxima etapa, lembre de citar a fonte das imagens pesquisadas e gravar o áudio em ambiente silencioso.</p>
            <div class="objective-tags">
              <span class="objective-tag">Feedback 08/02</span>
              <span class="objective-tag">2 revisões restantes</span>
              <span class="objective-tag">Professor: Marcos</span>
            </div>
          </div>
        </div>
      </div>
      <div class="mission-footer">
        <div class="mission-badges">
          <span class="mission-badge" style="background:#00CFE812;color:#00CFE8">Modo aluno</span>
          <span class="mission-badge" style="background:#00CFE812;color:#00CFE8">Progressão guiada</span>
        </div>
        <div>Último acesso pelo app mobile em 09/02 às 19h08</div>
      </div>
    </div>
  `)
};

export const Compacto = {
  render: () => withContainer(`
    <div class="mission-card" style="max-width:520px;margin:0 auto">
      <div class="mission-header" style="gap:12px">
        <div>
          <div class="mission-title" style="font-size:18px">Missão Relâmpago: Quiz de História</div>
          <div class="mission-meta" style="gap:8px">
            <span class="meta-item">8º Ano • Duração: 40 min</span>
            <span class="meta-item">XP máximo: 180</span>
          </div>
        </div>
        <div class="progress-card" style="flex-direction:column;align-items:flex-start;background:linear-gradient(135deg,#6E63E8,#9F93F8)">
          <div class="progress-value" style="font-size:32px">12</div>
          <div class="progress-meta">Questões</div>
        </div>
      </div>
      <div class="mission-body" style="padding:20px">
        <div class="mission-section">
          <div class="section-title"><i class="bi bi-info-circle"></i> Resumo</div>
          <div class="section-content">Quiz interativo para revisão de conteúdos sobre Revolução Industrial. Ideal para fechamento rápido de aula.</div>
        </div>
        <div class="mission-section">
          <div class="section-title"><i class="bi bi-lightning"></i> Recursos rápidos</div>
          <div class="resource-list">
            <div class="resource-item">
              <div class="resource-left"><i class="bi bi-tablet"></i> Plataforma Kahoot</div>
              <span class="resource-chip">Código 725-981</span>
            </div>
            <div class="resource-item">
              <div class="resource-left"><i class="bi bi-link-45deg"></i> Link de acesso</div>
              <span class="resource-chip">Enviar pelo chat</span>
            </div>
          </div>
        </div>
      </div>
      <div class="mission-footer">
        <div>Agendado para 11/02 às 09h20</div>
        <div><i class="bi bi-person"></i> Profª Marina</div>
      </div>
    </div>
  `)
};

export const Vazio = {
  render: () => withContainer(`
    <div class="mission-empty">
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M5 4h14a2 2 0 0 1 2 2v11.5a1.5 1.5 0 0 1-2.45 1.11L14 15.5l-4.55 3.11A1.5 1.5 0 0 1 7 17.5V6a2 2 0 0 1 2-2z"/>
        <path d="M9 9h6M9 12h4" stroke="#fff" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      <div style="font-size:18px;font-weight:600">Nenhuma missão selecionada</div>
      <div style="font-size:14px">Escolha uma missão para visualizar detalhes ou crie uma nova experiência para sua turma.</div>
      <button>Criar nova missão</button>
    </div>
  `)
};
