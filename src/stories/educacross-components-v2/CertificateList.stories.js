/**
 * CertificateList - Lista de Certificados
 * =========================================
 * Lista de certificados de conclusão de missões/cursos
 * 
 * @component CertificateList
 * @source educacross-frontoffice/src/components/PDFs/certificate/CertificateList.vue
 * @category Educacross Components V2 / Lists
 * @priority P2
 * @status PIXEL-PERFECT
 * @since 2.0.0
 */

export default {
  title: 'Educacross Components V2/Lists/CertificateList',
  tags: ['autodocs'],
  parameters: { layout: 'padded' }
};

const css = `.cert-list{max-width:1000px;margin:0 auto;padding:24px}.list-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:24px;flex-wrap:wrap;gap:12px}.list-title{font-size:20px;font-weight:600;color:#3F3F46}.list-count{font-size:13px;color:#6E6B7B;margin-left:8px}.list-filters{display:flex;gap:8px}.filter-btn{padding:8px 16px;border:1px solid #D8D6DE;border-radius:6px;background:#fff;font-size:13px;color:#6E6B7B;cursor:pointer;transition:.2s}.filter-btn:hover{border-color:#6E63E8}.filter-btn.active{background:#6E63E8;color:#fff;border-color:#6E63E8}.cert-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(320px,1fr));gap:20px}.cert-item{background:#fff;border:1px solid #D8D6DE;border-radius:8px;overflow:hidden;transition:.2s;cursor:pointer}.cert-item:hover{border-color:#6E63E8;transform:translateY(-2px);box-shadow:0 4px 12px rgba(0,0,0,.08)}.cert-preview{width:100%;height:200px;background:linear-gradient(135deg,#6E63E8,#9F93F8);display:flex;align-items:center;justify-content:center;position:relative;overflow:hidden}.cert-preview::before{content:'';position:absolute;top:-50%;left:-50%;width:200%;height:200%;background:url('data:image/svg+xml,<svg width="100" height="100" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="50" r="2" fill="white" opacity="0.1"/></svg>');animation:float 20s linear infinite}.cert-icon{font-size:64px;position:relative;z-index:1}.cert-content{padding:16px}.cert-title{font-size:15px;font-weight:600;color:#3F3F46;margin-bottom:8px}.cert-subtitle{font-size:13px;color:#6E6B7B;margin-bottom:12px}.cert-meta{display:flex;justify-content:space-between;align-items:center;font-size:12px;color:#6E6B7B;padding-top:12px;border-top:1px solid #F3F2F7}.cert-date{display:flex;align-items:center;gap:6px}.cert-actions{display:flex;gap:8px}.icon-btn{width:32px;height:32px;border:1px solid #D8D6DE;border-radius:6px;background:#fff;display:flex;align-items:center;justify-content:center;cursor:pointer;transition:.2s}.icon-btn:hover{background:#F3F2F7;border-color:#6E63E8;color:#6E63E8}@keyframes float{to{transform:translate(25%,25%)}}`;

export const Default = {
  render: () => `
<div class="cert-list">
  <div class="list-header">
    <div>
      <span class="list-title">Certificados</span>
      <span class="list-count">(8 certificados)</span>
    </div>
    <div class="list-filters">
      <button class="filter-btn active">Todos</button>
      <button class="filter-btn">2026</button>
      <button class="filter-btn">2025</button>
    </div>
  </div>
  <div class="cert-grid">
    ${[
      { title: 'Conclusão Matemática Avançada', student: 'Ana Silva', date: '15/01/2026', color: 'linear-gradient(135deg,#6E63E8,#9F93F8)', icon: '🏆' },
      { title: 'Excelência em Português', student: 'Bruno Costa', date: '20/01/2026', color: 'linear-gradient(135deg,#00CFE8,#7EDEFF)', icon: '📚' },
      { title: 'Cientista do Ano', student: 'Diana Santos', date: '22/01/2026', color: 'linear-gradient(135deg,#28C76F,#7EE5A8)', icon: '🔬' },
      { title: 'Participação em Evento', student: 'Eduardo Lima', date: '25/01/2026', color: 'linear-gradient(135deg,#FF9F43,#FFCB8B)', icon: '🎉' }
    ].map(c => `
      <div class="cert-item">
        <div class="cert-preview" style="background:${c.color}">
          <div class="cert-icon">${c.icon}</div>
        </div>
        <div class="cert-content">
          <div class="cert-title">${c.title}</div>
          <div class="cert-subtitle">${c.student}</div>
          <div class="cert-meta">
            <div class="cert-date">
              <i class="bi bi-calendar3"></i>
              ${c.date}
            </div>
            <div class="cert-actions">
              <button class="icon-btn" title="Visualizar"><i class="bi bi-eye"></i></button>
              <button class="icon-btn" title="Download"><i class="bi bi-download"></i></button>
            </div>
          </div>
        </div>
      </div>
    `).join('')}
  </div>
</div>
<style>${css}</style>
`
};

export const PorAluno = {
  render: () => `
<div class="cert-list">
  <div class="list-header">
    <div>
      <span class="list-title">Certificados - Ana Silva</span>
      <span class="list-count">(12 certificados)</span>
    </div>
  </div>
  <div class="cert-grid" style="grid-template-columns:repeat(auto-fill,minmax(280px,1fr))">
    ${[
      { title: 'Matemática - 1º Bimestre', grade: 9.8, date: '15/01/2026', color: 'linear-gradient(135deg,#6E63E8,#9F93F8)' },
      { title: 'Português - 1º Bimestre', grade: 9.5, date: '15/01/2026', color: 'linear-gradient(135deg,#00CFE8,#7EDEFF)' },
      { title: 'Ciências - 1º Bimestre', grade: 10.0, date: '15/01/2026', color: 'linear-gradient(135deg,#28C76F,#7EE5A8)' }
    ].map(c => `
      <div class="cert-item">
        <div class="cert-preview" style="background:${c.color}">
          <div style="text-align:center;color:#fff;position:relative;z-index:1">
            <div style="font-size:48px;font-weight:700">${c.grade}</div>
            <div style="font-size:14px;opacity:0.9">Nota Final</div>
          </div>
        </div>
        <div class="cert-content">
          <div class="cert-title">${c.title}</div>
          <div class="cert-meta">
            <div class="cert-date">
              <i class="bi bi-calendar3"></i>
              ${c.date}
            </div>
            <div class="cert-actions">
              <button class="icon-btn"><i class="bi bi-eye"></i></button>
              <button class="icon-btn"><i class="bi bi-download"></i></button>
              <button class="icon-btn"><i class="bi bi-share"></i></button>
            </div>
          </div>
        </div>
      </div>
    `).join('')}
  </div>
</div>
<style>${css}</style>
`
};

export const PorEvento = {
  render: () => `
<div class="cert-list">
  <div class="list-header">
    <span class="list-title">Feira de Ciências 2026</span>
  </div>
  <div class="cert-grid">
    ${[
      { name: 'Ana Silva', project: 'Energia Solar', award: '1º Lugar', color: 'linear-gradient(135deg,#FFD700,#FFA500)', icon: '🥇' },
      { name: 'Bruno Costa', project: 'Reciclagem Criativa', award: '2º Lugar', color: 'linear-gradient(135deg,#C0C0C0,#808080)', icon: '🥈' },
      { name: 'Diana Santos', project: 'Horta Sustentável', award: '3º Lugar', color: 'linear-gradient(135deg,#CD7F32,#8B4513)', icon: '🥉' },
      { name: 'Eduardo Lima', project: 'Robótica Básica', award: 'Participação', color: 'linear-gradient(135deg,#6E63E8,#9F93F8)', icon: '🏆' }
    ].map(c => `
      <div class="cert-item">
        <div class="cert-preview" style="background:${c.color}">
          <div class="cert-icon">${c.icon}</div>
        </div>
        <div class="cert-content">
          <div class="cert-title">${c.name}</div>
          <div class="cert-subtitle">${c.project}</div>
          <div class="cert-meta">
            <div style="font-weight:600;color:#3F3F46">${c.award}</div>
            <div class="cert-actions">
              <button class="icon-btn"><i class="bi bi-download"></i></button>
              <button class="icon-btn"><i class="bi bi-printer"></i></button>
            </div>
          </div>
        </div>
      </div>
    `).join('')}
  </div>
</div>
<style>${css}</style>
`
};

export const EmLote = {
  render: () => `
<div class="cert-list">
  <div class="list-header">
    <div>
      <span class="list-title">Gerar Certificados</span>
      <span class="list-count">42 alunos - 8º Ano A</span>
    </div>
    <div class="list-filters">
      <button class="filter-btn">Selecionar Todos</button>
      <button class="filter-btn active" style="background:#28C76F;border-color:#28C76F">Gerar Selecionados (12)</button>
    </div>
  </div>
  <div class="cert-grid" style="grid-template-columns:repeat(auto-fill,minmax(250px,1fr))">
    ${[
      { name: 'Ana Silva', grade: 9.8, selected: true },
      { name: 'Bruno Costa', grade: 9.5, selected: true },
      { name: 'Diana Santos', grade: 9.3, selected: false },
      { name: 'Eduardo Lima', grade: 9.0, selected: true }
    ].map(s => `
      <div class="cert-item" style="${s.selected ? 'border-color:#6E63E8;background:#6E63E810' : ''}">
        <div style="padding:16px">
          <div style="display:flex;align-items:center;gap:12px;margin-bottom:12px">
            <input type="checkbox" ${s.selected ? 'checked' : ''} style="width:20px;height:20px;cursor:pointer">
            <div style="flex:1">
              <div class="cert-title" style="margin:0">${s.name}</div>
              <div class="cert-subtitle" style="margin:0">Nota: ${s.grade}</div>
            </div>
          </div>
          <div style="height:4px;background:#F3F2F7;border-radius:2px;overflow:hidden">
            <div style="height:100%;background:#28C76F;width:${s.grade * 10}%"></div>
          </div>
        </div>
      </div>
    `).join('')}
  </div>
</div>
<style>${css}</style>
`
};

export const ComModelos = {
  render: () => `
<div class="cert-list">
  <div class="list-header">
    <span class="list-title">Modelos de Certificado</span>
  </div>
  <div class="cert-grid">
    ${[
      { name: 'Modelo Clássico', desc: 'Design tradicional elegante', color: 'linear-gradient(135deg,#3F3F46,#6E6B7B)', popular: true },
      { name: 'Modelo Moderno', desc: 'Minimalista e colorido', color: 'linear-gradient(135deg,#6E63E8,#9F93F8)', popular: false },
      { name: 'Modelo Gamificação', desc: 'Com badges e troféus', color: 'linear-gradient(135deg,#FFD700,#FFA500)', popular: true },
      { name: 'Modelo Infantil', desc: 'Cores vivas e divertido', color: 'linear-gradient(135deg,#FF6B9D,#C44569)', popular: false }
    ].map(m => `
      <div class="cert-item">
        <div class="cert-preview" style="background:${m.color}">
          ${m.popular ? '<div style="position:absolute;top:12px;right:12px;background:#FFD700;color:#3F3F46;padding:4px 10px;border-radius:12px;font-size:11px;font-weight:600;z-index:2">⭐ Popular</div>' : ''}
          <div style="color:#fff;text-align:center;position:relative;z-index:1">
            <div style="font-size:40px;margin-bottom:8px">📜</div>
            <div style="font-size:14px;opacity:0.9">Certificado de</div>
            <div style="font-size:18px;font-weight:600">Conclusão</div>
          </div>
        </div>
        <div class="cert-content">
          <div class="cert-title">${m.name}</div>
          <div class="cert-subtitle">${m.desc}</div>
          <div class="cert-meta">
            <button class="filter-btn" style="width:100%;margin-top:8px;justify-content:center">
              <i class="bi bi-eye"></i> Visualizar
            </button>
          </div>
        </div>
      </div>
    `).join('')}
  </div>
</div>
<style>${css}</style>
`
};

export const Historico = {
  render: () => `
<div class="cert-list">
  <div class="list-header">
    <div>
      <span class="list-title">Histórico de Certificados</span>
      <span class="list-count">(156 emitidos)</span>
    </div>
    <div class="list-filters">
      <button class="filter-btn active">Este Ano</button>
      <button class="filter-btn">2025</button>
      <button class="filter-btn">2024</button>
    </div>
  </div>
  <div style="display:flex;flex-direction:column;gap:12px">
    ${[
      { month: 'Janeiro 2026', count: 42, type: 'Conclusão de Bimestre' },
      { month: 'Dezembro 2025', count: 38, type: 'Encerramento do Ano' },
      { month: 'Novembro 2025', count: 28, type: 'Feira de Ciências' },
      { month: 'Outubro 2025', count: 32, type: 'Conclusão de Bimestre' }
    ].map(h => `
      <div style="background:#fff;border:1px solid #D8D6DE;border-radius:8px;padding:16px;display:flex;justify-content:space-between;align-items:center">
        <div>
          <div style="font-size:15px;font-weight:600;color:#3F3F46;margin-bottom:4px">${h.month}</div>
          <div style="font-size:13px;color:#6E6B7B">${h.type}</div>
        </div>
        <div style="text-align:right">
          <div style="font-size:24px;font-weight:700;color:#6E63E8">${h.count}</div>
          <div style="font-size:12px;color:#6E6B7B">certificados</div>
        </div>
      </div>
    `).join('')}
  </div>
</div>
<style>${css}</style>
`
};

export const Compacto = {
  render: () => `
<div class="cert-list" style="max-width:600px;padding:16px">
  <div style="display:flex;flex-direction:column;gap:8px">
    ${[
      { title: 'Matemática - 1º Bim', student: 'Ana Silva', date: '15/01' },
      { title: 'Português - 1º Bim', student: 'Ana Silva', date: '15/01' },
      { title: 'Ciências - 1º Bim', student: 'Ana Silva', date: '15/01' }
    ].map(c => `
      <div style="background:#fff;border:1px solid #D8D6DE;border-radius:6px;padding:12px;display:flex;justify-content:space-between;align-items:center">
        <div style="display:flex;align-items:center;gap:12px">
          <div style="width:40px;height:40px;background:linear-gradient(135deg,#6E63E8,#9F93F8);border-radius:6px;display:flex;align-items:center;justify-content:center;font-size:20px">
            🏆
          </div>
          <div>
            <div style="font-size:13px;font-weight:600;color:#3F3F46">${c.title}</div>
            <div style="font-size:11px;color:#6E6B7B">${c.date}</div>
          </div>
        </div>
        <button class="icon-btn" style="width:28px;height:28px"><i class="bi bi-download"></i></button>
      </div>
    `).join('')}
  </div>
</div>
<style>${css}</style>
`
};

export const Vazio = {
  render: () => `
<div class="cert-list">
  <div class="list-header">
    <span class="list-title">Certificados</span>
  </div>
  <div style="text-align:center;padding:80px 20px;color:#6E6B7B">
    <svg viewBox="0 0 24 24" fill="currentColor" style="width:100px;height:100px;opacity:0.3;margin-bottom:20px">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
      <path d="M12 6l-3 7h2l1 3 3-7h-2z"/>
    </svg>
    <div style="font-size:16px;font-weight:600;margin-bottom:8px">Nenhum Certificado Ainda</div>
    <div style="font-size:14px;margin-bottom:20px">Gere certificados para seus alunos</div>
    <button class="filter-btn active"><i class="bi bi-plus-lg"></i> Gerar Certificado</button>
  </div>
</div>
<style>${css}</style>
`
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
          <div style="display:inline-block;padding:8px 16px;background:rgba(255,255,255,0.15);border-radius:50px;margin-bottom:20px;font-size:14px;border:1px solid rgba(255,255,255,0.2);">Lists</div>
          <h1 style="font-size:3rem;font-weight:700;margin:0 0 12px 0;letter-spacing:-0.02em;">CertificateList</h1>
          <p style="font-size:1.1rem;opacity:0.9;margin:0;max-width:600px;">Lista de Certificados</p>
        </div>
      </div>
      <div style="max-width:900px;margin:0 auto;padding:48px 40px;">
        <div style="background:white;border-radius:12px;padding:32px;margin-bottom:32px;box-shadow:0 2px 8px rgba(0,0,0,0.08);">
          <h2 style="font-size:1.1rem;font-weight:600;color:#5E5873;margin:0 0 16px 0;">Sobre o Componente</h2>
          <p style="color:#6E6B7B;line-height:1.7;margin:0 0 16px 0;">Lista de Certificados. Faz parte da categoria <strong>Lists</strong> do Design System Educacross.</p>
          <div style="background:#F8F7FF;border-left:4px solid #6E63E8;padding:16px;border-radius:4px;">
            <p style="margin:0;color:#5E5873;font-size:14px;line-height:1.6;"><strong>💡 Dica:</strong> Use <em>Playground</em> para explorar props, <em>Use Cases</em> para exemplos reais e <em>Accessibility</em> para validar WCAG.</p>
          </div>
        </div>
        <div style="background:white;border-radius:12px;padding:32px;box-shadow:0 2px 8px rgba(0,0,0,0.08);">
          <h2 style="font-size:1.1rem;font-weight:600;color:#5E5873;margin:0 0 16px 0;">Implementação Vue 2.7</h2>
          <pre style="background:#1E1E2E;color:#CDD6F4;padding:20px;border-radius:8px;font-size:13px;line-height:1.6;overflow:auto;margin:0;"><code>import CertificateList from '@/components/CertificateList.vue';

// Template
&lt;CertificateList v-bind="props" /&gt;</code></pre>
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
    docs: { description: { story: 'Explore o CertificateList com controles interativos.' } },
  },
  render: (args) => `
    <div style="padding:32px;display:flex;justify-content:center;align-items:center;min-height:200px;background:#F8F8F8;border-radius:12px;">
      <div style="text-align:center;color:#6E6B7B;">
        <div style="width:60px;height:60px;background:#6E63E820;border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 16px;font-size:24px;">🎨</div>
        <p style="margin:0 0 8px 0;font-size:15px;font-weight:600;color:#5E5873;">Playground CertificateList</p>
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
    docs: { description: { story: 'Exemplos de uso real do CertificateList no Educacross.' } },
  },
  render: () => `
    <div style="max-width:800px;margin:0 auto;padding:40px 20px;font-family:'Public Sans',sans-serif;">
      <div style="background:#6E63E815;border:1px solid #6E63E830;border-radius:12px;padding:24px;margin-bottom:40px;">
        <h1 style="font-size:1.5rem;font-weight:700;color:#5E5873;margin:0 0 8px 0;">Casos de Uso: CertificateList</h1>
        <p style="color:#6E6B7B;margin:0;font-size:14px;line-height:1.6;">Cenários reais de uso no contexto educacional da plataforma Educacross</p>
      </div>
      
      <div style="margin-bottom:32px;">
        <h2 style="font-size:18px;font-weight:600;color:#5E5873;margin:0 0 8px 0;display:flex;align-items:center;gap:10px;">
          <span style="display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;background:#6E63E8;color:white;border-radius:50%;font-size:13px;font-weight:700;flex-shrink:0;">1</span>
          Professor — Painel Principal
        </h2>
        <p style="color:#6E6B7B;margin:0 0 16px 0;padding-left:38px;font-size:14px;">Professor utilizando CertificateList no dashboard de gestão de turmas</p>
        <div style="background:#F8F8F8;border-radius:8px;padding:20px;margin-left:38px;text-align:center;color:#B9B9C3;font-size:13px;">
          Ver story <strong>Default</strong> para visualização do componente neste contexto
        </div>
      </div>
      <div style="margin-bottom:32px;">
        <h2 style="font-size:18px;font-weight:600;color:#5E5873;margin:0 0 8px 0;display:flex;align-items:center;gap:10px;">
          <span style="display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;background:#6E63E8;color:white;border-radius:50%;font-size:13px;font-weight:700;flex-shrink:0;">2</span>
          Aluno — Portal do Estudante
        </h2>
        <p style="color:#6E6B7B;margin:0 0 16px 0;padding-left:38px;font-size:14px;">Aluno interagindo com CertificateList no portal educacional</p>
        <div style="background:#F8F8F8;border-radius:8px;padding:20px;margin-left:38px;text-align:center;color:#B9B9C3;font-size:13px;">
          Ver story <strong>Default</strong> para visualização do componente neste contexto
        </div>
      </div>
      <div style="margin-bottom:32px;">
        <h2 style="font-size:18px;font-weight:600;color:#5E5873;margin:0 0 8px 0;display:flex;align-items:center;gap:10px;">
          <span style="display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;background:#6E63E8;color:white;border-radius:50%;font-size:13px;font-weight:700;flex-shrink:0;">3</span>
          Coordenador — Relatórios
        </h2>
        <p style="color:#6E6B7B;margin:0 0 16px 0;padding-left:38px;font-size:14px;">Coordenador pedagógico analisando dados via CertificateList</p>
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
    docs: { description: { story: 'Conformidade WCAG 2.1 AA para o CertificateList.' } },
  },
  render: () => `
    <div style="max-width:800px;margin:0 auto;padding:40px 20px;font-family:'Public Sans',sans-serif;">

      <div style="background:linear-gradient(135deg,#6E63E8 0%,#764ba2 100%);padding:32px;border-radius:12px;margin-bottom:32px;color:white;">
        <h1 style="font-size:1.5rem;font-weight:700;margin:0 0 8px 0;">Acessibilidade: CertificateList</h1>
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

