/**
 * StudentGameDetailsModal - Modal de Detalhes do Jogo do Aluno
 * =============================================================
 * Modal para exibir o histórico de tentativas de um aluno num jogo gamificado,
 * com acertos, erros, status de conclusão e tempo investido por tentativa.
 *
 * @component StudentGameDetailsModal
 * @category Educacross Components V2 / Modals
 * @source educacross-frontoffice/src/components/modal/StudentGameDetailsModal.vue
 * @priority P2
 * @status PIXEL-PERFECT
 * @since 2.0.0
 */

export default {
  title: 'Educacross Components V2/Modals/StudentGameDetailsModal',
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# StudentGameDetailsModal

Modal de **detalhes do jogo do aluno**. Exibe o histórico completo de tentativas com acertos, erros, status de conclusão e tempo investido — fiel ao componente Vue do educacross-frontoffice.

## Quando usar

- ✅ Professor clica em linha de aluno na tabela de resultados
- ✅ Exibir evolução de tentativas de um aluno em jogo específico
- ✅ Análise de desempenho individual (acertos vs erros por tentativa)
- ✅ Verificar se o aluno concluiu o jogo em cada tentativa

## Variantes

| Story | Descrição |
|-------|-----------|
| **Default** | 5 tentativas carregadas |
| **Loading** | Skeleton loader (busca de dados) |
| **Vazio** | Sem tentativas (estado empty) |
| **MuitasTentativas** | 10 tentativas com scroll |
| **AlunaDestaque** | 3 tentativas todas concluídas |

## Características visuais

- **Overlay**: \`rgba(75, 70, 92, 0.2)\` — padrão Vuexy Bootstrap
- **Modal**: \`modal-xl\` (1140px), \`box-shadow\`, \`border-radius: 0.375rem\`
- **Fechar**: botão flutuante \`top: -0.95rem; right: -0.95rem\` com shadow
- **Imagem**: \`100×100px\`, \`border-radius: 0.375rem\`, \`border: 1px solid #ebe9f1\`
- **text-primary**: desafios/tentativas/nome do aluno
- **Thead**: uppercase bold text-primary 11px
- **Badges**: \`bg-label-success\` / \`bg-label-danger\` (padrão Vuexy)
- **text-success / text-danger**: acertos e erros
        `
      }
    }
  },
  argTypes: {
    isLoading: {
      control: 'boolean',
      description: 'Exibe skeleton enquanto carrega'
    },
    studentName: {
      control: 'text',
      description: 'Nome do aluno exibido no cabeçalho'
    },
    gameName: {
      control: 'text',
      description: 'Nome do jogo'
    },
    challengesDone: {
      control: 'number',
      description: 'Total de desafios realizados'
    },
    totalAttempts: {
      control: 'number',
      description: 'Total de tentativas de jogo'
    }
  }
};

// ============================================================
// ESTILOS — padrão Vuexy / Educacross
// ============================================================

const baseStyles = `
  .sgd-wrapper {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1.5rem;
    background: rgba(75, 70, 92, 0.2);
  }
  .sgd-modal-xl {
    max-width: 1140px;
    width: 100%;
    position: relative;
  }
  .sgd-modal-content {
    border: 0;
    box-shadow: 0 0.25rem 1rem rgba(47, 43, 61, 0.14);
    border-radius: 0.375rem;
    overflow: visible;
    background: #fff;
  }
  .sgd-modal-header {
    position: relative;
    min-height: 3.5rem;
    padding: 0.8rem 1rem 0.25rem;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    border-bottom: 0;
  }
  .sgd-btn-close {
    position: absolute;
    top: -0.95rem;
    right: -0.95rem;
    width: 2.3rem;
    height: 2.3rem;
    border: 0;
    border-radius: 0.625rem;
    background: #fff;
    color: #6e6b7b;
    box-shadow: 0 5px 20px 0 rgb(34 41 47 / 10%);
    display: inline-flex;
    align-items: center;
    justify-content: center;
    z-index: 2;
    cursor: pointer;
    font-size: 1.65rem;
    line-height: 1;
    transition: all .23s ease .1s;
  }
  .sgd-btn-close:hover { transform: translate(-1px, 1px); }
  .sgd-modal-body {
    padding: 0 1.5rem 1.5rem;
    max-height: 70vh;
    overflow: auto;
  }
  .sgd-game-image {
    width: 100px;
    height: 100px;
    object-fit: contain;
    border-radius: 0.375rem;
    background: #f5f4fb;
    border: 1px solid #ebe9f1;
    flex-shrink: 0;
    padding: 8px;
  }
  .sgd-info-header {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.25rem;
  }
  .sgd-info-left {
    display: flex;
    align-items: center;
    gap: 1rem;
  }
  .sgd-game-title {
    margin: 0 0 .25rem;
    color: #2f2b3d;
    font-size: 1.25rem;
    font-weight: 600;
  }
  .sgd-count {
    display: block;
    font-size: .9375rem;
    color: var(--bs-primary, #7367f0);
  }
  .sgd-info-right {
    font-size: .9375rem;
    color: #5e5873;
    text-align: right;
  }
  .sgd-info-right strong {
    color: var(--bs-primary, #7367f0);
    font-weight: 700;
  }

  /* TABELA */
  .sgd-table-wrap { overflow-x: auto; }
  .sgd-table {
    width: 100%;
    border-collapse: collapse;
    color: #5e5873;
    border: 1px solid #ebe9f1;
    border-radius: 0.375rem;
    overflow: hidden;
  }
  .sgd-table thead tr { border-bottom: 2px solid #ebe9f1; }
  .sgd-table thead th {
    text-transform: uppercase;
    font-size: 11px;
    font-weight: 700;
    color: var(--bs-primary, #7367f0);
    padding: .75rem 1.25rem;
    white-space: nowrap;
    background: #fff;
  }
  .sgd-table tbody td {
    padding: .75rem 1.25rem;
    vertical-align: middle;
    border-bottom: 1px solid #ebe9f1;
    font-size: .9375rem;
  }
  .sgd-table tbody tr:last-child td { border-bottom: 0; }
  .sgd-table tbody tr:hover { background: rgba(115,103,240,.04); }
  .sgd-text-success { color: #28c76f; font-weight: 600; }
  .sgd-text-danger  { color: #ea5455; font-weight: 600; }
  .sgd-fw-bold      { font-weight: 600; }
  .bg-label-success {
    background: rgba(40,199,111,.16) !important;
    color: #28c76f !important;
    border-radius: 999px;
    padding: 4px 12px;
    font-size: 12px;
    font-weight: 600;
    display: inline-block;
  }
  .bg-label-danger {
    background: rgba(234,84,85,.16) !important;
    color: #ea5455 !important;
    border-radius: 999px;
    padding: 4px 12px;
    font-size: 12px;
    font-weight: 600;
    display: inline-block;
  }

  /* SKELETON */
  @keyframes sgd-shimmer {
    0%   { background-position: -200% 0; }
    100% { background-position:  200% 0; }
  }
  .sgd-skel {
    background: linear-gradient(90deg, #f0eff5 25%, #e8e7ef 50%, #f0eff5 75%);
    background-size: 200% 100%;
    animation: sgd-shimmer 1.4s infinite;
    border-radius: .375rem;
    display: block;
  }

  /* EMPTY */
  .sgd-empty {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 3rem 1rem;
    gap: .75rem;
  }
  .sgd-empty-icon { font-size: 4rem; opacity: .35; }
  .sgd-empty-text {
    font-size: .9375rem;
    font-weight: 600;
    text-align: center;
    color: var(--bs-primary, #7367f0);
  }
`;

// ============================================================
// HELPERS
// ============================================================

function buildTableRow(row) {
  var badge = row.finish
    ? '<span class="bg-label-success">Conclu\u00eddo</span>'
    : '<span class="bg-label-danger">N\u00e3o conclu\u00eddo</span>';
  return '<tr>'
    + '<td class="sgd-fw-bold">' + row.attempt + '\u00aa tentativa</td>'
    + '<td>' + row.date + '</td>'
    + '<td><span class="sgd-text-success">' + row.hits + '</span></td>'
    + '<td><span class="sgd-text-danger">' + row.errors + '</span></td>'
    + '<td>' + badge + '</td>'
    + '<td style="color:#6e6b7b">' + row.totalTime + '</td>'
    + '</tr>';
}

function buildTable(rows) {
  if (!rows || rows.length === 0) {
    return '<div class="sgd-empty">'
      + '<img src="/educacross-assets/images/belinha/confusion.svg" style="width:80px;height:80px;opacity:0.85" alt="sem tentativas">'
      + '<span class="sgd-empty-text">Nenhuma tentativa registrada para esse jogo.</span>'
      + '</div>';
  }
  return '<div class="sgd-table-wrap">'
    + '<table class="sgd-table">'
    + '<thead><tr>'
    + '<th>Tentativa</th>'
    + '<th>\u00daltimo acesso</th>'
    + '<th>Acertos</th>'
    + '<th>Erros</th>'
    + '<th>Status</th>'
    + '<th>Tempo investido</th>'
    + '</tr></thead>'
    + '<tbody>' + rows.map(buildTableRow).join('') + '</tbody>'
    + '</table>'
    + '</div>';
}

function buildInfoHeader(args) {
  return '<div class="sgd-info-header">'
    + '<div class="sgd-info-left">'
    + '<img class="sgd-game-image" src="/educacross-assets/images/icons/retro-joystick.svg" alt="game icon">'
    + '<div>'
    + '<h4 class="sgd-game-title">' + (args.gameName || 'Fra\u00e7\u00f5es Intergal\u00e1cticas') + '</h4>'
    + '<span class="sgd-count"><strong>' + (args.challengesDone != null ? args.challengesDone : 12) + '</strong> desafios realizados</span>'
    + '<span class="sgd-count"><strong>' + (args.totalAttempts != null ? args.totalAttempts : 5) + '</strong> tentativas de jogo</span>'
    + '</div>'
    + '</div>'
    + '<div class="sgd-info-right">'
    + 'Acompanhe a evolu\u00e7\u00e3o de <strong>' + (args.studentName || 'Jo\u00e3o Silva') + '</strong> nesse jogo.'
    + '</div>'
    + '</div>';
}

function buildSkeletonInfoHeader() {
  return '<div class="sgd-info-header">'
    + '<div class="sgd-info-left">'
    + '<span class="sgd-skel" style="width:100px;height:100px;flex-shrink:0;border-radius:.375rem"></span>'
    + '<div style="display:grid;gap:8px;width:180px">'
    + '<span class="sgd-skel" style="height:18px;width:90%"></span>'
    + '<span class="sgd-skel" style="height:14px;width:75%"></span>'
    + '<span class="sgd-skel" style="height:14px;width:80%"></span>'
    + '</div>'
    + '</div>'
    + '<span class="sgd-skel" style="height:14px;width:200px"></span>'
    + '</div>';
}

function buildSkeletonTable() {
  var rows = '';
  for (var i = 0; i < 5; i++) {
    rows += '<tr>'
      + '<td><span class="sgd-skel" style="height:13px;width:90px;display:block"></span></td>'
      + '<td><span class="sgd-skel" style="height:13px;width:80px;display:block"></span></td>'
      + '<td><span class="sgd-skel" style="height:13px;width:28px;display:block"></span></td>'
      + '<td><span class="sgd-skel" style="height:13px;width:28px;display:block"></span></td>'
      + '<td><span class="sgd-skel" style="height:22px;width:95px;border-radius:999px;display:block"></span></td>'
      + '<td><span class="sgd-skel" style="height:13px;width:65px;display:block"></span></td>'
      + '</tr>';
  }
  return '<div class="sgd-table-wrap">'
    + '<table class="sgd-table">'
    + '<thead><tr>'
    + '<th>Tentativa</th>'
    + '<th>\u00daltimo acesso</th>'
    + '<th>Acertos</th>'
    + '<th>Erros</th>'
    + '<th>Status</th>'
    + '<th>Tempo investido</th>'
    + '</tr></thead>'
    + '<tbody>' + rows + '</tbody>'
    + '</table>'
    + '</div>';
}

function renderModal(args, bodyContent) {
  return '<div class="sgd-wrapper">'
    + '<div class="sgd-modal-xl">'
    + '<div class="sgd-modal-content">'
    + '<div class="sgd-modal-header">'
    + '<button class="sgd-btn-close" aria-label="Fechar">&times;</button>'
    + '</div>'
    + '<div class="sgd-modal-body">'
    + bodyContent
    + '</div>'
    + '</div>'
    + '</div>'
    + '</div>'
    + '<style>' + baseStyles + '</style>';
}

// ============================================================
// DADOS DE EXEMPLO
// ============================================================

var defaultAttempts = [
  { attempt: 1, date: '10/01/2025', hits: 8,  errors: 2, finish: true,  totalTime: '8min 32s' },
  { attempt: 2, date: '11/01/2025', hits: 6,  errors: 4, finish: true,  totalTime: '9min 15s' },
  { attempt: 3, date: '14/01/2025', hits: 9,  errors: 1, finish: true,  totalTime: '7min 48s' },
  { attempt: 4, date: '16/01/2025', hits: 4,  errors: 6, finish: false, totalTime: '3min 22s' },
  { attempt: 5, date: '18/01/2025', hits: 10, errors: 0, finish: true,  totalTime: '6min 55s' }
];

var manyAttempts = [
  { attempt: 1,  date: '02/01/2025', hits: 5,  errors: 5,  finish: false, totalTime: '4min 02s' },
  { attempt: 2,  date: '03/01/2025', hits: 6,  errors: 4,  finish: true,  totalTime: '8min 14s' },
  { attempt: 3,  date: '05/01/2025', hits: 7,  errors: 3,  finish: true,  totalTime: '7min 50s' },
  { attempt: 4,  date: '07/01/2025', hits: 5,  errors: 5,  finish: false, totalTime: '3min 30s' },
  { attempt: 5,  date: '09/01/2025', hits: 8,  errors: 2,  finish: true,  totalTime: '9min 01s' },
  { attempt: 6,  date: '11/01/2025', hits: 9,  errors: 1,  finish: true,  totalTime: '7min 22s' },
  { attempt: 7,  date: '13/01/2025', hits: 7,  errors: 3,  finish: true,  totalTime: '8min 40s' },
  { attempt: 8,  date: '15/01/2025', hits: 10, errors: 0,  finish: true,  totalTime: '6min 11s' },
  { attempt: 9,  date: '17/01/2025', hits: 8,  errors: 2,  finish: true,  totalTime: '7min 58s' },
  { attempt: 10, date: '19/01/2025', hits: 10, errors: 0,  finish: true,  totalTime: '5min 44s' }
];

// ============================================================
// STORIES
// ============================================================

export const Default = {
  name: 'Default',
  args: {
    isLoading: false,
    studentName: 'Jo\u00e3o Silva',
    gameName: 'Fra\u00e7\u00f5es Intergal\u00e1cticas',
    challengesDone: 12,
    totalAttempts: 5
  },
  render: function (args) {
    return renderModal(args, buildInfoHeader(args) + buildTable(defaultAttempts));
  }
};

export const Loading = {
  name: 'Loading (Skeleton)',
  args: {
    isLoading: true,
    studentName: 'Jo\u00e3o Silva',
    gameName: 'Fra\u00e7\u00f5es Intergal\u00e1cticas',
    challengesDone: 12,
    totalAttempts: 5
  },
  render: function (args) {
    return renderModal(args, buildSkeletonInfoHeader() + buildSkeletonTable());
  }
};

export const Vazio = {
  name: 'Vazio',
  args: {
    isLoading: false,
    studentName: 'Maria Oliveira',
    gameName: 'Equa\u00e7\u00f5es Espaciais',
    challengesDone: 0,
    totalAttempts: 0
  },
  render: function (args) {
    return renderModal(args, buildInfoHeader(args) + buildTable([]));
  }
};

export const MuitasTentativas = {
  name: 'Muitas Tentativas (scroll)',
  args: {
    isLoading: false,
    studentName: 'Pedro Almeida',
    gameName: '\u00c1lgebra Espacial',
    challengesDone: 28,
    totalAttempts: 10
  },
  render: function (args) {
    return renderModal(args, buildInfoHeader(args) + buildTable(manyAttempts));
  }
};

export const AlunaDestaque = {
  name: 'Aluna Destaque (100% conclu\u00eddo)',
  args: {
    isLoading: false,
    studentName: 'Ana Beatriz Costa',
    gameName: 'Desafios Matem\u00e1ticos',
    challengesDone: 15,
    totalAttempts: 3
  },
  render: function (args) {
    var perfeito = [
      { attempt: 1, date: '08/01/2025', hits: 9,  errors: 1, finish: true, totalTime: '8min 10s' },
      { attempt: 2, date: '10/01/2025', hits: 10, errors: 0, finish: true, totalTime: '6min 30s' },
      { attempt: 3, date: '12/01/2025', hits: 10, errors: 0, finish: true, totalTime: '5min 45s' }
    ];
    return renderModal(args, buildInfoHeader(args) + buildTable(perfeito));
  }
};
