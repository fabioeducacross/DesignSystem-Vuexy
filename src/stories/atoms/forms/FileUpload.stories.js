/**
 * FileUpload - Atom (Forms)
 * 
 * Source: packages/vuexy_theme/public/vuexy/js/forms-file-upload.js
 * Library: Dropzone.js (produção)
 * Priority: P1 (Important)
 * Status: ✅ DONE
 */

// previewTemplate idêntico ao usado em produção (forms-file-upload.js)
const previewTemplate = `<div class="dz-preview dz-file-preview">
  <div class="dz-details">
    <div class="dz-thumbnail">
      <img data-dz-thumbnail>
      <span class="dz-nopreview">No preview</span>
      <div class="dz-success-mark"></div>
      <div class="dz-error-mark"></div>
      <div class="dz-error-message"><span data-dz-errormessage></span></div>
      <div class="progress">
        <div class="progress-bar progress-bar-primary" role="progressbar" aria-valuemin="0" aria-valuemax="100" data-dz-uploadprogress></div>
      </div>
    </div>
    <div class="dz-filename" data-dz-name></div>
    <div class="dz-size" data-dz-size></div>
  </div>
</div>`;

// Inicializa Dropzone num elemento pelo ID (aguarda Dropzone estar disponível)
function initDropzone(id, options = {}) {
  const el = document.getElementById(id);
  if (!el) return;
  // Evita dupla inicialização
  if (el.dropzone) { el.dropzone.destroy(); }
  // Dropzone desabilita submit automático — aqui usamos url fictícia para demo
  new window.Dropzone(el, {
    url: '/upload',
    previewTemplate,
    parallelUploads: options.parallelUploads ?? 1,
    maxFilesize: options.maxFilesize ?? 5,
    addRemoveLinks: options.addRemoveLinks ?? true,
    maxFiles: options.maxFiles ?? null,
    autoProcessQueue: false, // não tenta fazer upload real no demo
  });
}

export default {
  title: 'Vuexy/Atoms/Forms/FileUpload',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
# File Upload — Dropzone.js

Upload de arquivos usando **Dropzone.js**, exatamente como implementado na produção (\`forms-file-upload.js\`).

## Implementação em produção

\`\`\`js
// forms-file-upload.js
const previewTemplate = \`<div class="dz-preview dz-file-preview">
  <div class="dz-details">
    <div class="dz-thumbnail">
      <img data-dz-thumbnail>
      <span class="dz-nopreview">No preview</span>
      <div class="dz-success-mark"></div>
      <div class="dz-error-mark"></div>
      <div class="dz-error-message"><span data-dz-errormessage></span></div>
      <div class="progress">
        <div class="progress-bar progress-bar-primary" role="progressbar"
          aria-valuemin="0" aria-valuemax="100" data-dz-uploadprogress></div>
      </div>
    </div>
    <div class="dz-filename" data-dz-name></div>
    <div class="dz-size" data-dz-size></div>
  </div>
</div>\`;

// Basic (1 arquivo, 5MB)
new Dropzone('#dropzone-basic', {
  previewTemplate,
  parallelUploads: 1,
  maxFilesize: 5,
  addRemoveLinks: true,
  maxFiles: 1
});

// Multiple (vários arquivos, 5MB cada)
new Dropzone('#dropzone-multi', {
  previewTemplate,
  parallelUploads: 1,
  maxFilesize: 5,
  addRemoveLinks: true
});
\`\`\`

## Props / Configuração

| Opção | Basic | Multiple | Descrição |
|-------|-------|----------|-----------|
| \`maxFiles\` | 1 | ilimitado | Número máximo de arquivos |
| \`maxFilesize\` | 5 | 5 | Tamanho máximo em MB |
| \`addRemoveLinks\` | true | true | Exibe link para remover arquivo |
| \`parallelUploads\` | 1 | 1 | Uploads simultâneos |
| \`previewTemplate\` | custom | custom | Template com thumbnail + progress bar |
        `
      }
    }
  }
};

// ─── Basic Dropzone (produção: #dropzone-basic) ────────────────────────────
export const Basic = {
  name: 'Basic (1 arquivo)',
  render: () => `
    <div class="card">
      <div class="card-header"><h5 class="card-title mb-0">Upload de Arquivo (básico)</h5></div>
      <div class="card-body">
        <p class="text-muted small mb-3">Máximo: 1 arquivo · 5MB</p>
        <form id="dropzone-basic-story" class="dropzone needsclick" action="/upload">
          <div class="dz-message needsclick">
            <span class="note needsclick">
              <span class="d-block fw-semibold mb-1">Arraste arquivos aqui ou clique para selecionar</span>
              <span class="text-muted small">Máximo 5MB por arquivo</span>
            </span>
          </div>
        </form>
      </div>
    </div>
  `,
  play: async ({ canvasElement }) => {
    await new Promise(r => setTimeout(r, 100));
    if (window.Dropzone) {
      window.Dropzone.autoDiscover = false;
      initDropzone('dropzone-basic-story', { maxFiles: 1, maxFilesize: 5 });
    }
  },
  parameters: {
    docs: {
      source: {
        code: `<!-- HTML -->
<form id="dropzone-basic" class="dropzone needsclick" action="/upload">
  <div class="dz-message needsclick">
    Arraste arquivos aqui ou clique para selecionar
  </div>
</form>

<!-- JS (forms-file-upload.js) -->
<script>
new Dropzone('#dropzone-basic', {
  previewTemplate: previewTemplate,
  parallelUploads: 1,
  maxFilesize: 5,
  addRemoveLinks: true,
  maxFiles: 1
});
</script>`
      },
      description: { story: 'Upload básico com 1 arquivo e 5MB máximo — configuração exata da produção.' }
    }
  }
};

// ─── Multiple Dropzone (produção: #dropzone-multi) ─────────────────────────
export const Multiple = {
  name: 'Multiple (vários arquivos)',
  render: () => `
    <div class="card">
      <div class="card-header"><h5 class="card-title mb-0">Upload Múltiplo</h5></div>
      <div class="card-body">
        <p class="text-muted small mb-3">Múltiplos arquivos · 5MB cada</p>
        <form id="dropzone-multi-story" class="dropzone needsclick" action="/upload">
          <div class="dz-message needsclick">
            <span class="note needsclick">
              <span class="d-block fw-semibold mb-1">Arraste arquivos aqui ou clique para selecionar</span>
              <span class="text-muted small">Máximo 5MB por arquivo · Sem limite de quantidade</span>
            </span>
          </div>
        </form>
      </div>
    </div>
  `,
  play: async ({ canvasElement }) => {
    await new Promise(r => setTimeout(r, 100));
    if (window.Dropzone) {
      window.Dropzone.autoDiscover = false;
      initDropzone('dropzone-multi-story', { maxFilesize: 5 });
    }
  },
  parameters: {
    docs: {
      source: {
        code: `<!-- HTML -->
<form id="dropzone-multi" class="dropzone needsclick" action="/upload">
  <div class="dz-message needsclick">
    Arraste arquivos aqui ou clique para selecionar
  </div>
</form>

<!-- JS (forms-file-upload.js) -->
<script>
new Dropzone('#dropzone-multi', {
  previewTemplate: previewTemplate,
  parallelUploads: 1,
  maxFilesize: 5,
  addRemoveLinks: true
});
</script>`
      },
      description: { story: 'Upload múltiplo sem limite de arquivos, 5MB cada — configuração exata da produção.' }
    }
  }
};

// ─── Ambos lado a lado (visão geral) ───────────────────────────────────────
export const Overview = {
  name: 'Overview (Basic + Multiple)',
  render: () => `
    <div class="row g-4">
      <div class="col-md-6">
        <div class="card h-100">
          <div class="card-header"><h5 class="card-title mb-0">Basic — 1 arquivo</h5></div>
          <div class="card-body">
            <form id="dz-overview-basic" class="dropzone needsclick" action="/upload">
              <div class="dz-message needsclick">
                <span class="note needsclick">Clique ou arraste (máx 1 arquivo · 5MB)</span>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div class="col-md-6">
        <div class="card h-100">
          <div class="card-header"><h5 class="card-title mb-0">Multiple — vários arquivos</h5></div>
          <div class="card-body">
            <form id="dz-overview-multi" class="dropzone needsclick" action="/upload">
              <div class="dz-message needsclick">
                <span class="note needsclick">Clique ou arraste (5MB cada)</span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  `,
  play: async () => {
    await new Promise(r => setTimeout(r, 100));
    if (window.Dropzone) {
      window.Dropzone.autoDiscover = false;
      initDropzone('dz-overview-basic', { maxFiles: 1, maxFilesize: 5 });
      initDropzone('dz-overview-multi', { maxFilesize: 5 });
    }
  },
  parameters: {
    docs: {
      description: { story: 'Os dois modos de Dropzone usados na produção, lado a lado.' }
    }
  }
};
