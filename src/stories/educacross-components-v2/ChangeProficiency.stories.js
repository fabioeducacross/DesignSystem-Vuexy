export default {
  title: 'Front-office/Proficiency/ChangeProficiency',
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' }
};

const styles = `
:root {
  --primary: #6e63e8;
  --success: #28c76f;
  --warning: #ff9f43;
  --danger: #ea5455;
  --info: #00cfe8;
  --text: #4b465c;
  --muted: #7f7b96;
  --border: #e4e3ed;
  --card: #ffffff;
  --bg: linear-gradient(135deg, #f7f6ff, #eef0ff);
}

.change-prof-shell {
  min-height: 100vh;
  background: var(--bg);
  display: grid;
  place-items: center;
  padding: 32px;
  color: var(--text);
  font-family: 'Inter', 'Segoe UI', system-ui, -apple-system, sans-serif;
}

.change-prof-modal {
  width: min(760px, 100%);
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: 18px;
  box-shadow: 0 24px 64px rgba(0, 0, 0, 0.08);
  overflow: hidden;
}

.change-prof-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 18px 20px;
  background: linear-gradient(120deg, rgba(110, 99, 232, 0.08), rgba(0, 207, 232, 0.08));
  border-bottom: 1px solid var(--border);
}

.change-prof-title {
  font-weight: 800;
  font-size: 18px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.change-prof-title .badge {
  background: #e7e4ff;
  color: #4331d3;
  padding: 6px 10px;
  border-radius: 999px;
  font-size: 12px;
}

.change-prof-body {
  padding: 20px;
  display: grid;
  gap: 18px;
}

.proficiency-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 12px;
}

.proficiency-card {
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 14px;
  background: #faf9ff;
  display: grid;
  gap: 6px;
  position: relative;
  overflow: hidden;
  transition: border-color 0.15s ease, box-shadow 0.15s ease;
}

.proficiency-card:hover {
  border-color: var(--primary);
  box-shadow: 0 8px 24px rgba(110, 99, 232, 0.12);
}

.proficiency-card.current::after,
.proficiency-card.target::after {
  content: attr(data-label);
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 11px;
  font-weight: 700;
  color: #fff;
  padding: 4px 10px;
  border-radius: 999px;
  background: linear-gradient(120deg, rgba(110, 99, 232, 0.9), rgba(0, 207, 232, 0.9));
}

.proficiency-card.current::after {
  background: linear-gradient(120deg, rgba(40, 199, 111, 0.9), rgba(110, 99, 232, 0.9));
}

.proficiency-score {
  font-size: 32px;
  font-weight: 800;
  color: #2f2b3d;
}

.proficiency-label {
  font-size: 13px;
  font-weight: 700;
  color: var(--muted);
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.delta-chip {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 10px;
  border-radius: 10px;
  font-weight: 700;
  font-size: 12px;
}

.delta-chip.up { background: rgba(40, 199, 111, 0.12); color: #1b8c53; }
.delta-chip.down { background: rgba(234, 84, 85, 0.12); color: #b54042; }

.change-prof-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 16px 20px;
  border-top: 1px solid var(--border);
  background: #fbfbfe;
}

.footer-actions {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.btn {
  border: 1px solid var(--border);
  background: #fff;
  padding: 10px 14px;
  border-radius: 10px;
  font-weight: 700;
  font-size: 14px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  transition: all 0.15s ease;
}

.btn.primary { background: var(--primary); color: #fff; border-color: var(--primary); box-shadow: 0 10px 30px rgba(110, 99, 232, 0.25); }
.btn.ghost { background: transparent; }
.btn.danger { border-color: var(--danger); color: var(--danger); }
.btn:disabled { opacity: 0.6; cursor: not-allowed; }

.reason-box {
  display: grid;
  gap: 10px;
  padding: 14px;
  border: 1px dashed var(--border);
  border-radius: 12px;
  background: #fff;
}

.reason-box textarea {
  width: 100%;
  min-height: 110px;
  border-radius: 10px;
  border: 1px solid var(--border);
  padding: 12px;
  resize: vertical;
  font-size: 14px;
  color: var(--text);
  background: #fbfbff;
}

.inline-banner {
  border-radius: 12px;
  border: 1px solid rgba(255, 159, 67, 0.35);
  background: linear-gradient(120deg, rgba(255, 159, 67, 0.08), rgba(255, 159, 67, 0.02));
  color: #8b5500;
  padding: 14px 16px;
  display: grid;
  gap: 6px;
}

.timeline {
  display: grid;
  gap: 12px;
  border-left: 2px solid var(--border);
  padding-left: 16px;
}

.timeline-item {
  position: relative;
  padding: 10px 12px;
  background: #fff;
  border-radius: 10px;
  border: 1px solid var(--border);
  display: grid;
  gap: 4px;
}

.timeline-item::before {
  content: '';
  position: absolute;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: var(--primary);
  left: -22px;
  top: 12px;
  box-shadow: 0 0 0 4px rgba(110, 99, 232, 0.2);
}

.badge-pill {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 10px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 700;
  background: #eef0ff;
  color: #4b3cc4;
}

.scale-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 10px;
}

.scale-chip {
  padding: 12px 14px;
  border-radius: 12px;
  border: 1px solid var(--border);
  background: #fff;
  display: grid;
  gap: 4px;
  font-size: 13px;
  font-weight: 700;
  color: var(--text);
}

.scale-chip small { color: var(--muted); font-weight: 600; }

.scale-chip.advanced { border-color: rgba(110, 99, 232, 0.4); background: rgba(110, 99, 232, 0.04); }
.scale-chip.proficient { border-color: rgba(40, 199, 111, 0.35); background: rgba(40, 199, 111, 0.05); }
.scale-chip.basic { border-color: rgba(255, 159, 67, 0.35); background: rgba(255, 159, 67, 0.05); }
.scale-chip.below { border-color: rgba(234, 84, 85, 0.35); background: rgba(234, 84, 85, 0.05); }

.mobile .change-prof-modal { width: min(480px, 100%); border-radius: 16px; }
.mobile .change-prof-body { gap: 14px; }
.mobile .change-prof-header { flex-direction: column; align-items: flex-start; gap: 6px; }
.mobile .change-prof-footer { flex-direction: column; align-items: flex-start; }

@media (max-width: 640px) {
  .change-prof-shell { padding: 20px; }
  .change-prof-modal { border-radius: 14px; }
  .change-prof-footer { flex-direction: column; align-items: flex-start; }
}
`;

const shell = (content, extra = '') => `
<div class="change-prof-shell ${extra}">
  <div class="change-prof-modal">
    ${content}
  </div>
</div>
<style>${styles}</style>
`;

const header = (title, badge = 'Avaliação manual') => `
  <div class="change-prof-header">
    <div class="change-prof-title">
      <span aria-hidden="true">⚙️</span>
      <span>${title}</span>
      <span class="badge">${badge}</span>
    </div>
    <div style="display:flex;align-items:center;gap:10px;color:#7f7b96;font-size:13px">
      <span>Última revisão • 2min atrás</span>
    </div>
  </div>
`;

const proficiencyCards = (current, target) => `
  <div class="proficiency-grid">
    <div class="proficiency-card current" data-label="ATUAL">
      <div class="proficiency-label">Proficiência atual</div>
      <div class="proficiency-score">${current.score}</div>
      <div class="badge-pill">${current.label}</div>
      <div class="delta-chip ${current.delta > 0 ? 'up' : 'down'}">${current.delta > 0 ? '▲' : '▼'} ${Math.abs(current.delta)} pts desde o último ciclo</div>
    </div>
    <div class="proficiency-card target" data-label="NOVA">
      <div class="proficiency-label">Aplicar para</div>
      <div class="proficiency-score">${target.score}</div>
      <div class="badge-pill">${target.label}</div>
      <div style="font-size:12px;color:#6e6b7b">Justifique a mudança antes de confirmar.</div>
    </div>
  </div>
`;

const footer = (primaryLabel = 'Confirmar alteração', disabled = false) => `
  <div class="change-prof-footer">
    <div style="font-size:13px;color:#7f7b96">A alteração será registrada no histórico da missão e visível para o aluno.</div>
    <div class="footer-actions">
      <button class="btn ghost">Cancelar</button>
      <button class="btn danger">Reportar inconsistência</button>
      <button class="btn primary" ${disabled ? 'disabled' : ''}>${disabled ? 'Processando...' : primaryLabel}</button>
    </div>
  </div>
`;

const reasonBlock = (placeholder) => `
  <div class="reason-box">
    <div style="font-weight:700;font-size:14px;color:#2f2b3d">Deseja registrar um motivo?</div>
    <textarea placeholder="${placeholder}"></textarea>
    <div style="display:flex;justify-content:space-between;align-items:center;font-size:12px;color:#7f7b96">
      <span>Visível apenas para equipe pedagógica</span>
      <span>0/280</span>
    </div>
  </div>
`;

const inlineHistory = () => `
  <div class="timeline">
    ${[
      { label: 'Coordenação', desc: 'Proficiente → Avançado', time: 'Ontem, 15:40' },
      { label: 'Professor', desc: 'Básico → Proficiente', time: '23 Jan' },
      { label: 'Análise automática', desc: 'Sugeriu revisão por discrepância', time: '21 Jan' }
    ].map(item => `
      <div class="timeline-item">
        <div style="font-weight:700;color:#2f2b3d">${item.label}</div>
        <div style="font-size:13px;color:#4b465c">${item.desc}</div>
        <div style="font-size:12px;color:#7f7b96">${item.time}</div>
      </div>
    `).join('')}
  </div>
`;

export const Default = {
  render: () => shell(`
    ${header('Alterar proficiência do aluno')}
    <div class="change-prof-body">
      ${proficiencyCards({ score: 'B+', label: 'Básico Superior', delta: 1.2 }, { score: 'A-', label: 'Proficiente', delta: 0 })}
      ${inlineHistory()}
    </div>
    ${footer()}
  `)
};

export const ComJustificativa = {
  render: () => shell(`
    ${header('Registrar justificativa detalhada', 'Obrigatório')}
    <div class="change-prof-body">
      ${proficiencyCards({ score: 'C+', label: 'Básico', delta: -0.4 }, { score: 'B', label: 'Proficiente inicial', delta: 0 })}
      ${reasonBlock('Descreva a evidência que motivou a alteração...')}
    </div>
    ${footer('Salvar justificativa')}
  `)
};

export const ReportarInconsistencia = {
  render: () => shell(`
    ${header('Relatar inconsistência na análise automática', 'Fluxo de validação')}
    <div class="change-prof-body">
      <div class="inline-banner">
        <div style="font-weight:700">Detectamos divergência entre a nota automática e o padrão da turma.</div>
        <div style="font-size:13px">Adicione detalhes para que possamos reprocessar a evidência.</div>
      </div>
      ${reasonBlock('Relate o motivo da inconsistência ou anexe link da evidência.')}
      <div class="timeline">
        <div class="timeline-item">
          <div style="font-weight:700;color:#2f2b3d">Análise automática</div>
          <div style="font-size:13px;color:#4b465c">Erros recorrentes em questões discursivas</div>
          <div style="font-size:12px;color:#7f7b96">Sugestão: Revisão manual</div>
        </div>
      </div>
    </div>
    ${footer('Enviar reporte')}
  `)
};

export const SelecionarEscala = {
  render: () => shell(`
    ${header('Escolher escala de proficiência', 'Multi-escala')}
    <div class="change-prof-body">
      <div class="scale-grid">
        ${[
          { label: 'Avançado', desc: 'Entrega acima do esperado', className: 'advanced' },
          { label: 'Proficiente', desc: 'Cumpre todos os critérios', className: 'proficient' },
          { label: 'Básico', desc: 'Atende parcialmente', className: 'basic' },
          { label: 'Abaixo do básico', desc: 'Precisa de reforço', className: 'below' }
        ].map(item => `
          <div class="scale-chip ${item.className}">
            <span>${item.label}</span>
            <small>${item.desc}</small>
          </div>
        `).join('')}
      </div>
      <div class="inline-banner" style="border-color: rgba(0, 207, 232, 0.35); color: #0c7181; background: rgba(0, 207, 232, 0.05);">
        <div style="font-weight:700">Dica</div>
        <div style="font-size:13px">Use a escala para gerar feedback imediato ao estudante.</div>
      </div>
    </div>
    ${footer('Aplicar escala')}
  `)
};

export const HistoricoCompacto = {
  render: () => shell(`
    ${header('Histórico de alterações', 'Log completo')}
    <div class="change-prof-body">
      ${inlineHistory()}
    </div>
    ${footer('Exportar registro')}
  `, 'mobile')
};

export const BannerInline = {
  render: () => shell(`
    ${header('Aviso rápido', 'Banner inline')}
    <div class="change-prof-body">
      <div class="inline-banner">
        <div style="font-weight:800;font-size:15px">Você está prestes a alterar a proficiência de 3 alunos.</div>
        <div style="font-size:13px">A alteração afetará relatórios e métricas de missão.</div>
      </div>
      ${proficiencyCards({ score: 'B', label: 'Básico', delta: 0.2 }, { score: 'A', label: 'Avançado', delta: 0 })}
    </div>
    ${footer('Confirmar para todos')}
  `)
};

export const ProcessoEmAndamento = {
  render: () => shell(`
    ${header('Processando alteração', 'Sincronizando')}
    <div class="change-prof-body">
      ${proficiencyCards({ score: 'A-', label: 'Proficiente', delta: 0.8 }, { score: 'A', label: 'Avançado', delta: 0 })}
      <div class="inline-banner" style="background: rgba(110, 99, 232, 0.06); color: #4331d3; border-color: rgba(110, 99, 232, 0.25);">
        <div style="font-weight:700">Sincronizando com relatórios</div>
        <div style="font-size:13px">Pode levar até 45 segundos. Não feche esta tela.</div>
      </div>
    </div>
    ${footer('Salvando...', true)}
  `)
};

export const EstadoVazio = {
  render: () => shell(`
    ${header('Nenhuma alteração pendente', 'Limpo')}
    <div class="change-prof-body" style="align-items:center;justify-items:center;text-align:center;padding:40px 20px;">
      <div style="font-size:48px">📄</div>
      <div style="font-weight:800;font-size:18px;color:#2f2b3d">Nada para ajustar agora</div>
      <div style="font-size:13px;color:#7f7b96">Quando uma evidência for reavaliada, ela aparecerá aqui.</div>
      <div class="footer-actions" style="justify-content:center;">
        <button class="btn ghost">Voltar</button>
        <button class="btn primary">Adicionar feedback manual</button>
      </div>
    </div>
  `)
};


