/**
 * Tag Input - Molecule (Forms)
 * 
 * Source: vendors/tagify or custom implementation
 * Priority: P1 (Important)
 * Status: ✅ DONE
 * 
 * Input para criação de tags/chips.
 */

import { formatHtmlSnippet } from '../../_helpers/snippets';

export default {
  title: 'Molecules/Forms/TagInput',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
# Tag Input

Input para criação e gerenciamento de tags/chips.

## Quando usar
- Categorização de conteúdo
- Adicionar múltiplos itens
- Keywords/hashtags
- Skills/tecnologias
- Filtros múltiplos
- Emails múltiplos
- Categorias de produtos

## Características
- Adicionar tags via Enter ou vírgula
- Remover tags individualmente
- Limite de tags (opcional)
- Autocompletar (opcional)
- Validação de formato
- Tags pré-definidas
- Cores customizáveis

## Funcionalidades
- Input inline
- Backspace para remover
- Click para remover (×)
- Drag & drop (opcional)
- Max tags
- Duplicatas previstas
- Paste múltiplo

## Acessibilidade
- ARIA labels
- Navegação por teclado
- Focus visible
- Screen reader support
        `
      }
    }
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'default', 'lg'],
      description: 'Tamanho das tags',
      table: { defaultValue: { summary: 'default' } }
    },
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'info', 'warning', 'danger'],
      description: 'Cor das tags',
      table: { defaultValue: { summary: 'primary' } }
    }
  }
};

const createTagInput = ({ size = 'default', variant = 'primary' }) => {
  const sizeClass = size === 'sm' ? 'form-control-sm' : size === 'lg' ? 'form-control-lg' : '';
  
  return `<div class="tag-input-wrapper">
  <div class="form-control ${sizeClass} tag-input d-flex flex-wrap gap-2 align-items-center" style="min-height: 40px; cursor: text;">
    <span class="badge bg-${variant} d-inline-flex align-items-center gap-1">
      JavaScript
      <button type="button" class="btn-close btn-close-white" style="width: 0.75em; height: 0.75em;" aria-label="Remove"></button>
    </span>
    <span class="badge bg-${variant} d-inline-flex align-items-center gap-1">
      React
      <button type="button" class="btn-close btn-close-white" style="width: 0.75em; height: 0.75em;" aria-label="Remove"></button>
    </span>
    <span class="badge bg-${variant} d-inline-flex align-items-center gap-1">
      Vue.js
      <button type="button" class="btn-close btn-close-white" style="width: 0.75em; height: 0.75em;" aria-label="Remove"></button>
    </span>
    <input type="text" 
           class="border-0 flex-grow-1" 
           placeholder="Type and press Enter..."
           style="outline: none; min-width: 150px; background: transparent;">
  </div>
  <small class="form-text text-muted">Press Enter or comma to add tags</small>
</div>`;
};

const Template = (args) => {
  const markup = createTagInput(args);
  
  return `
    <div style="max-width: 600px;">
      ${markup}
    </div>
    
    <hr class="my-5" />
    
    <details>
      <summary><strong>Code Snippets</strong></summary>
      <div class="mt-3">
        <h6>HTML</h6>
        <pre><code>${formatHtmlSnippet(markup).replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
        
        <div class="alert alert-info mt-3">
          <strong>JavaScript Required:</strong> This component requires JavaScript for tag management (add, remove, validation).
        </div>
      </div>
    </details>
  `;
};

export const Overview = () => `
  <div class="row g-4">
    <div class="col-12">
      <h6>Default Tag Input</h6>
      <div class="card">
        <div class="card-body">
          <label class="form-label">Skills</label>
          <div class="form-control tag-input d-flex flex-wrap gap-2 align-items-center" style="min-height: 40px;">
            <span class="badge bg-primary d-inline-flex align-items-center gap-1">
              HTML
              <button type="button" class="btn-close btn-close-white" style="width: 0.75em; height: 0.75em;"></button>
            </span>
            <span class="badge bg-primary d-inline-flex align-items-center gap-1">
              CSS
              <button type="button" class="btn-close btn-close-white" style="width: 0.75em; height: 0.75em;"></button>
            </span>
            <span class="badge bg-primary d-inline-flex align-items-center gap-1">
              JavaScript
              <button type="button" class="btn-close btn-close-white" style="width: 0.75em; height: 0.75em;"></button>
            </span>
            <input type="text" class="border-0 flex-grow-1" placeholder="Add skill..." style="outline: none; min-width: 120px; background: transparent;">
          </div>
          <small class="form-text text-muted">Press Enter to add</small>
        </div>
      </div>
    </div>
    
    <div class="col-md-6">
      <h6>With Different Colors</h6>
      <div class="card">
        <div class="card-body">
          <label class="form-label">Categories</label>
          <div class="form-control tag-input d-flex flex-wrap gap-2 align-items-center" style="min-height: 40px;">
            <span class="badge bg-success d-inline-flex align-items-center gap-1">
              Frontend
              <button type="button" class="btn-close btn-close-white" style="width: 0.75em; height: 0.75em;"></button>
            </span>
            <span class="badge bg-info d-inline-flex align-items-center gap-1">
              Backend
              <button type="button" class="btn-close btn-close-white" style="width: 0.75em; height: 0.75em;"></button>
            </span>
            <span class="badge bg-warning d-inline-flex align-items-center gap-1">
              DevOps
              <button type="button" class="btn-close btn-close-white" style="width: 0.75em; height: 0.75em;"></button>
            </span>
            <input type="text" class="border-0 flex-grow-1" placeholder="Add category..." style="outline: none; min-width: 120px; background: transparent;">
          </div>
        </div>
      </div>
    </div>
    
    <div class="col-md-6">
      <h6>Email Tags</h6>
      <div class="card">
        <div class="card-body">
          <label class="form-label">To:</label>
          <div class="form-control tag-input d-flex flex-wrap gap-2 align-items-center" style="min-height: 40px;">
            <span class="badge bg-secondary d-inline-flex align-items-center gap-1">
              john@example.com
              <button type="button" class="btn-close btn-close-white" style="width: 0.75em; height: 0.75em;"></button>
            </span>
            <span class="badge bg-secondary d-inline-flex align-items-center gap-1">
              jane@example.com
              <button type="button" class="btn-close btn-close-white" style="width: 0.75em; height: 0.75em;"></button>
            </span>
            <input type="text" class="border-0 flex-grow-1" placeholder="Add email..." style="outline: none; min-width: 150px; background: transparent;">
          </div>
        </div>
      </div>
    </div>
    
    <div class="col-12">
      <h6>Small Size</h6>
      <div class="card">
        <div class="card-body">
          <label class="form-label">Tags (Small)</label>
          <div class="form-control form-control-sm tag-input d-flex flex-wrap gap-2 align-items-center" style="min-height: 32px;">
            <span class="badge badge-sm bg-primary d-inline-flex align-items-center gap-1">
              Tag1
              <button type="button" class="btn-close btn-close-white" style="width: 0.6em; height: 0.6em;"></button>
            </span>
            <span class="badge badge-sm bg-primary d-inline-flex align-items-center gap-1">
              Tag2
              <button type="button" class="btn-close btn-close-white" style="width: 0.6em; height: 0.6em;"></button>
            </span>
            <input type="text" class="border-0 flex-grow-1 small" placeholder="Add..." style="outline: none; min-width: 80px; background: transparent;">
          </div>
        </div>
      </div>
    </div>
    
    <div class="col-12">
      <h6>In Form Context</h6>
      <div class="card">
        <div class="card-body">
          <form>
            <div class="mb-3">
              <label class="form-label">Article Title</label>
              <input type="text" class="form-control" placeholder="Enter title">
            </div>
            
            <div class="mb-3">
              <label class="form-label">Keywords</label>
              <div class="form-control tag-input d-flex flex-wrap gap-2 align-items-center" style="min-height: 40px;">
                <span class="badge bg-primary d-inline-flex align-items-center gap-1">
                  web development
                  <button type="button" class="btn-close btn-close-white" style="width: 0.75em; height: 0.75em;"></button>
                </span>
                <span class="badge bg-primary d-inline-flex align-items-center gap-1">
                  tutorial
                  <button type="button" class="btn-close btn-close-white" style="width: 0.75em; height: 0.75em;"></button>
                </span>
                <input type="text" class="border-0 flex-grow-1" placeholder="Add keywords..." style="outline: none; min-width: 150px; background: transparent;">
              </div>
              <small class="form-text text-muted">Max 10 keywords</small>
            </div>
            
            <div class="mb-3">
              <label class="form-label">Categories</label>
              <div class="form-control tag-input d-flex flex-wrap gap-2 align-items-center" style="min-height: 40px;">
                <span class="badge bg-success d-inline-flex align-items-center gap-1">
                  Programming
                  <button type="button" class="btn-close btn-close-white" style="width: 0.75em; height: 0.75em;"></button>
                </span>
                <input type="text" class="border-0 flex-grow-1" placeholder="Add category..." style="outline: none; min-width: 150px; background: transparent;">
              </div>
            </div>
            
            <button type="submit" class="btn btn-primary">Publish Article</button>
          </form>
        </div>
      </div>
    </div>
  </div>
  
  <div class="alert alert-info mt-4">
    <i class="bx bx-info-circle me-2"></i>
    <strong>Interactive Component:</strong> This component requires JavaScript for full functionality (adding/removing tags, validation, etc.).
  </div>
`;

export const Default = Template.bind({});
Default.args = {
  size: 'default',
  variant: 'primary'
};

export const Small = Template.bind({});
Small.args = {
  size: 'sm',
  variant: 'primary'
};

export const Large = Template.bind({});
Large.args = {
  size: 'lg',
  variant: 'primary'
};

export const Success = Template.bind({});
Success.args = {
  size: 'default',
  variant: 'success'
};

export const Secondary = Template.bind({});
Secondary.args = {
  size: 'default',
  variant: 'secondary'
};
