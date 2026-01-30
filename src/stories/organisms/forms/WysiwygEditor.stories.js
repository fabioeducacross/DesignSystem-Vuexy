/**
 * WYSIWYG Editor - Organism (Forms)
 * 
 * Source: packages/vuexy_theme/public/vuexy/vendors/libs/quill
 * Priority: P2 (Nice-to-have)
 * Status: ✅ DONE
 * 
 * Editor de texto rico (What You See Is What You Get).
 */

import { formatHtmlSnippet } from '../../_helpers/snippets';

export default {
  title: 'Organisms/Forms/WysiwygEditor',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
# WYSIWYG Editor

Editor de texto rico para criação de conteúdo formatado.

## Quando usar
- Edição de artigos/posts
- Descrições ricas
- Email templates
- Documentação
- CMS content
- Comments com formatação

## Características
- Rich text formatting
- Bold, italic, underline
- Headings (H1-H6)
- Lists (ordered/unordered)
- Links
- Images
- Code blocks
- Quotes
- Text alignment
- Colors e background
- Undo/redo

## Toolbar buttons
- Text formatting (bold, italic, underline, strike)
- Headers (H1, H2, H3)
- Lists (bullet, numbered)
- Blockquote
- Code block
- Links
- Images
- Text color
- Text alignment
- Clean formatting

## Quill Editor
Este componente utiliza Quill editor library.
Requer quill.js e quill.css.

## Casos de uso
- Blog posts
- Product descriptions
- Email composition
- Comments
- Documentation
- News articles

## Acessibilidade
- Keyboard shortcuts
- ARIA labels
- Screen reader support
- Focus management
        `
      }
    }
  },
  argTypes: {
    theme: {
      control: 'select',
      options: ['snow', 'bubble'],
      description: 'Tema do editor',
      table: { defaultValue: { summary: 'snow' } }
    }
  }
};

const createWysiwygEditor = ({ theme = 'snow' }) => {
  const editorId = `editor${theme}`;
  
  return `<div class="card">
  <div class="card-header">
    <h5 class="mb-0">Write Your Content</h5>
  </div>
  <div class="card-body">
    <!-- Quill Editor -->
    <div id="${editorId}">
      <h2>Welcome to the Editor!</h2>
      <p>This is a <strong>WYSIWYG</strong> (What You See Is What You Get) editor. You can format your text with:</p>
      <ul>
        <li><strong>Bold</strong> and <em>italic</em> formatting</li>
        <li>Different <span style="color: #696cff;">text colors</span> and backgrounds</li>
        <li>Headers of various sizes</li>
        <li>Lists and quotes</li>
      </ul>
      <blockquote>
        "The best way to predict the future is to invent it." - Alan Kay
      </blockquote>
      <p>You can also add <a href="https://example.com">links</a> and insert images.</p>
      <pre><code>// Code blocks for technical content
function example() {
  return "Hello World!";
}</code></pre>
    </div>
    
    <div class="mt-3">
      <button class="btn btn-primary">
        <i class="bx bx-save me-1"></i> Save Content
      </button>
      <button class="btn btn-label-secondary ms-2">
        <i class="bx bx-x me-1"></i> Cancel
      </button>
    </div>
  </div>
</div>

<style>
/* Quill Editor Styles */
.ql-container {
  font-family: inherit;
  font-size: 1rem;
}

.ql-editor {
  min-height: 300px;
  max-height: 500px;
  overflow-y: auto;
}

.ql-toolbar {
  background-color: #f8f9fa;
  border: 1px solid #d9dee3;
  border-bottom: none;
  border-radius: 0.375rem 0.375rem 0 0;
}

.ql-container {
  border: 1px solid #d9dee3;
  border-radius: 0 0 0.375rem 0.375rem;
}

.ql-editor h1 {
  font-size: 2rem;
  margin-bottom: 0.5rem;
}

.ql-editor h2 {
  font-size: 1.75rem;
  margin-bottom: 0.5rem;
}

.ql-editor h3 {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
}

.ql-editor blockquote {
  border-left: 4px solid #696cff;
  padding-left: 1rem;
  margin-left: 0;
  color: #697a8d;
}

.ql-editor pre {
  background-color: #f8f9fa;
  border-radius: 0.375rem;
  padding: 1rem;
}

.ql-snow .ql-stroke {
  stroke: #697a8d;
}

.ql-snow .ql-fill {
  fill: #697a8d;
}

.ql-snow .ql-picker-label {
  color: #697a8d;
}

.ql-toolbar button:hover,
.ql-toolbar button:focus,
.ql-toolbar button.ql-active,
.ql-toolbar .ql-picker-label:hover,
.ql-toolbar .ql-picker-label.ql-active {
  color: #696cff;
}

.ql-toolbar button:hover .ql-stroke,
.ql-toolbar button:focus .ql-stroke,
.ql-toolbar button.ql-active .ql-stroke {
  stroke: #696cff;
}

.ql-toolbar button:hover .ql-fill,
.ql-toolbar button:focus .ql-fill,
.ql-toolbar button.ql-active .ql-fill {
  fill: #696cff;
}
</style>

<script>
  // Initialize Quill Editor
  var toolbarOptions = [
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
    ['bold', 'italic', 'underline', 'strike'],
    [{ 'color': [] }, { 'background': [] }],
    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
    [{ 'indent': '-1'}, { 'indent': '+1' }],
    [{ 'align': [] }],
    ['blockquote', 'code-block'],
    ['link', 'image'],
    ['clean']
  ];
  
  var quill = new Quill('#${editorId}', {
    theme: '${theme}',
    modules: {
      toolbar: toolbarOptions
    },
    placeholder: 'Start writing your content...'
  });
  
  // Get/Set content
  // var content = quill.root.innerHTML; // Get HTML
  // quill.root.innerHTML = content; // Set HTML
</script>

<div class="alert alert-info mt-4">
  <strong>Quill Editor Required:</strong> This component requires Quill library. Include:
  <pre class="mb-0 mt-2"><code>&lt;link href="vendors/libs/quill/quill.snow.css" rel="stylesheet"&gt;
&lt;script src="vendors/libs/quill/quill.js"&gt;&lt;/script&gt;</code></pre>
</div>`;
};

const Template = (args) => {
  const markup = createWysiwygEditor(args);
  
  return `
    ${markup}
    
    <hr class="my-5" />
    
    <details>
      <summary><strong>Code Snippets</strong></summary>
      <div class="mt-3">
        <h6>HTML</h6>
        <pre><code>${formatHtmlSnippet(markup).replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
        
        <div class="alert alert-warning mt-3">
          <strong>JavaScript API:</strong>
          <ul class="mb-0">
            <li><code>quill.root.innerHTML</code> - Get HTML content</li>
            <li><code>quill.getText()</code> - Get plain text</li>
            <li><code>quill.getContents()</code> - Get Delta format</li>
            <li><code>quill.setContents(delta)</code> - Set content from Delta</li>
          </ul>
        </div>
      </div>
    </details>
  `;
};

export const Overview = () => createWysiwygEditor({ theme: 'snow' });

export const SnowTheme = Template.bind({});
SnowTheme.args = {
  theme: 'snow'
};

export const BubbleTheme = Template.bind({});
BubbleTheme.args = {
  theme: 'bubble'
};
