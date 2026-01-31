import{f as T}from"./snippets-m8t1HIl1.js";const S={title:"Organisms/Forms/WysiwygEditor",tags:["autodocs"],parameters:{docs:{description:{component:`
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
        `}}},argTypes:{theme:{control:"select",options:["snow","bubble"],description:"Tema do editor",table:{defaultValue:{summary:"snow"}}}}},k=({theme:e="snow"})=>{const l=`editor${e}`;return`<div class="card">
  <div class="card-header">
    <h5 class="mb-0">Write Your Content</h5>
  </div>
  <div class="card-body">
    <!-- Quill Editor -->
    <div id="${l}">
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
  
  var quill = new Quill('#${l}', {
    theme: '${e}',
    modules: {
      toolbar: toolbarOptions
    },
    placeholder: 'Start writing your content...'
  });
  
  // Get/Set content
  // var content = quill.root.innerHTML; // Get HTML
  // quill.root.innerHTML = content; // Set HTML
<\/script>

<div class="alert alert-info mt-4">
  <strong>Quill Editor Required:</strong> This component requires Quill library. Include:
  <pre class="mb-0 mt-2"><code>&lt;link href="vendors/libs/quill/editor.css" rel="stylesheet"&gt;
&lt;script src="vendors/libs/quill/quill.js"&gt;&lt;/script&gt;</code></pre>
</div>`},C=e=>{const l=k(e);return`
    ${l}
    
    <hr class="my-5" />
    
    <details>
      <summary><strong>Code Snippets</strong></summary>
      <div class="mt-3">
        <h6>HTML</h6>
        <pre><code>${T(l).replace(/</g,"&lt;").replace(/>/g,"&gt;")}</code></pre>
        
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
  `},a=()=>k({theme:"snow"}),i=C.bind({});i.args={theme:"snow"};const s=C.bind({});s.args={theme:"bubble"};const o={parameters:{docs:{description:{story:`
### WYSIWYG Editor com Quill Real

Implementação oficial usando Quill do Vuexy:

- ✅ **Toolbar Completa** - todos os controles de formatação
- ✅ **Bold, Italic, Underline, Strike** - estilos de texto
- ✅ **Headings** - H1, H2, H3 para estruturar conteúdo
- ✅ **Lists** - bullet points e listas numeradas
- ✅ **Links** - inserir e editar hyperlinks
- ✅ **Images** - upload/insert de imagens (base64)
- ✅ **Blockquote** - citações
- ✅ **Code Block** - blocos de código
- ✅ **Text Align** - left, center, right, justify
- ✅ **Colors** - texto e background
- ✅ **Undo/Redo** - desfazer e refazer
- ✅ **Clean Format** - remover formatação

**Casos de uso:**
- Editor de blog posts
- Descrições de produtos
- Email composer
- Comentários ricos
- Documentação
- CMS content

### Como testar:
1. Selecione texto para formatar
2. Use toolbar para aplicar estilos
3. Teste atalhos (Ctrl+B, Ctrl+I, etc)
4. Insira links e imagens
        `}}},loaders:[async()=>typeof window<"u"?document.querySelector('link[href*="quill"]')?{quillLoaded:!0}:new Promise((e,l)=>{const n=document.createElement("link");n.rel="stylesheet",n.href="/vuexy/vendors/libs/quill/editor.css",n.onload=()=>{if(window.Quill)e({quillLoaded:!0});else{const t=document.createElement("script");t.src="/vuexy/vendors/libs/quill/quill.js",t.onload=()=>{console.log("✅ Quill CSS + JS carregados"),e({quillLoaded:!0})},t.onerror=()=>l(new Error("Failed to load Quill JS")),document.head.appendChild(t)}},n.onerror=()=>l(new Error("Failed to load Quill CSS")),document.head.appendChild(n)}):{}],render:()=>(setTimeout(()=>{if(window.Quill){const e=new Quill("#editor-full",{theme:"snow",modules:{toolbar:[[{header:[1,2,3,!1]}],["bold","italic","underline","strike"],[{list:"ordered"},{list:"bullet"}],[{align:[]}],["link","image"],[{color:[]},{background:[]}],["blockquote","code-block"],["clean"]]},placeholder:"Digite seu conteúdo aqui..."});e.root.innerHTML=`
          <h2>Bem-vindo ao Editor Quill! 📝</h2>
          <p>Este é um editor <strong>WYSIWYG</strong> (What You See Is What You Get) completo. Você pode:</p>
          <ul>
            <li><strong>Negrito</strong>, <em>itálico</em>, <u>sublinhado</u></li>
            <li>Criar listas ordenadas e não ordenadas</li>
            <li>Adicionar <a href="https://quilljs.com" target="_blank">links</a></li>
            <li>Inserir imagens</li>
          </ul>
          <blockquote>
            "A escrita é a pintura da voz." - Voltaire
          </blockquote>
          <p>Experimente selecionar texto e usar a toolbar acima! 🎨</p>
        `;const l=new Quill("#editor-essential",{theme:"snow",modules:{toolbar:[["bold","italic","underline"],[{list:"ordered"},{list:"bullet"}],["link"],["clean"]]},placeholder:"Editor com toolbar essencial..."});l.root.innerHTML=`
          <p>Este editor tem apenas as <strong>ferramentas essenciais</strong>:</p>
          <ul>
            <li>Formatação básica (bold, italic, underline)</li>
            <li>Listas</li>
            <li>Links</li>
          </ul>
          <p>Ideal para comentários ou descrições simples.</p>
        `;const n=new Quill("#editor-bubble",{theme:"bubble",placeholder:"Selecione texto para ver a toolbar aparecer..."});n.root.innerHTML=`
          <p>Este editor usa o <strong>tema Bubble</strong>! 🎈</p>
          <p>A toolbar aparece como um <em>tooltip</em> quando você seleciona texto.</p>
          <p>Perfeito para edição inline e interface minimalista.</p>
        `,e.on("text-change",function(){const t=e.getLength()-1,r=e.getText().trim().split(/\\s+/).length;document.getElementById("char-count").textContent=t,document.getElementById("word-count").textContent=r}),document.getElementById("get-html-btn").addEventListener("click",()=>{const t=e.root.innerHTML,r=document.getElementById("html-modal"),w=document.getElementById("html-code");w.textContent=t,r.style.display="block"}),document.getElementById("close-modal-btn").addEventListener("click",()=>{document.getElementById("html-modal").style.display="none"}),document.getElementById("html-modal").addEventListener("click",t=>{t.target.id==="html-modal"&&(document.getElementById("html-modal").style.display="none")}),console.log("✅ Quill inicializado em 3 editores")}},100),`
      <style>
        .ql-container {
          min-height: 200px;
          font-size: 14px;
        }
        .ql-editor {
          min-height: 200px;
        }
        .ql-editor.ql-blank::before {
          font-style: italic;
          color: #adb5bd;
        }
        #html-modal {
          display: none;
          position: fixed;
          z-index: 9999;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0,0,0,0.4);
        }
        #html-modal-content {
          background-color: #fff;
          margin: 5% auto;
          padding: 0;
          border-radius: 8px;
          width: 90%;
          max-width: 700px;
          box-shadow: 0 4px 24px 0 rgba(34,41,47,0.1);
        }
        #html-code {
          background: #f8f9fa;
          padding: 15px;
          border-radius: 4px;
          font-family: 'Courier New', monospace;
          font-size: 12px;
          max-height: 400px;
          overflow-y: auto;
          white-space: pre-wrap;
          word-break: break-all;
        }
      </style>
      
      <div style="padding: 30px;">
        <h5 class="mb-4">
          <i class="ti ti-text me-2 text-primary"></i>
          WYSIWYG Editor com Quill
        </h5>
        
        <div class="row g-4">
          <!-- 1. Full Toolbar Editor -->
          <div class="col-12">
            <div class="card">
              <div class="card-header d-flex justify-content-between align-items-center">
                <h6 class="mb-0">
                  <i class="ti ti-edit me-2"></i>
                  Editor Completo
                </h6>
                <div class="d-flex gap-2">
                  <span class="badge bg-label-primary">
                    <i class="ti ti-letter-a me-1"></i>
                    <span id="char-count">0</span> caracteres
                  </span>
                  <span class="badge bg-label-success">
                    <i class="ti ti-book me-1"></i>
                    <span id="word-count">0</span> palavras
                  </span>
                </div>
              </div>
              <div class="card-body">
                <div id="editor-full"></div>
                <div class="mt-3">
                  <button class="btn btn-sm btn-primary" id="get-html-btn">
                    <i class="ti ti-code me-1"></i>
                    Ver HTML
                  </button>
                  <button class="btn btn-sm btn-outline-secondary" onclick="window.Quill && document.querySelector('#editor-full').querySelector('.ql-editor').innerHTML = ''">
                    <i class="ti ti-trash me-1"></i>
                    Limpar
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- 2. Essential Toolbar -->
          <div class="col-lg-6">
            <div class="card">
              <div class="card-header">
                <h6 class="mb-0">
                  <i class="ti ti-layout-navbar me-2"></i>
                  Toolbar Essencial
                </h6>
              </div>
              <div class="card-body">
                <p class="text-muted small mb-3">Apenas ferramentas básicas</p>
                <div id="editor-essential"></div>
              </div>
            </div>
          </div>

          <!-- 3. Bubble Theme -->
          <div class="col-lg-6">
            <div class="card">
              <div class="card-header">
                <h6 class="mb-0">
                  <i class="ti ti-bubble me-2"></i>
                  Tema Bubble (Inline)
                </h6>
              </div>
              <div class="card-body">
                <p class="text-muted small mb-3">Toolbar aparece ao selecionar texto</p>
                <div id="editor-bubble"></div>
              </div>
            </div>
          </div>

          <!-- Use Cases -->
          <div class="col-md-4">
            <div class="card border-primary">
              <div class="card-body">
                <h6 class="text-primary mb-2">
                  <i class="ti ti-article me-1"></i>
                  Blog Post
                </h6>
                <p class="small mb-0">Editor completo com todas as opções de formatação, imagens, links e código.</p>
              </div>
            </div>
          </div>
          
          <div class="col-md-4">
            <div class="card border-success">
              <div class="card-body">
                <h6 class="text-success mb-2">
                  <i class="ti ti-message me-1"></i>
                  Comentários
                </h6>
                <p class="small mb-0">Toolbar essencial para permitir formatação básica sem exageros.</p>
              </div>
            </div>
          </div>
          
          <div class="col-md-4">
            <div class="card border-info">
              <div class="card-body">
                <h6 class="text-info mb-2">
                  <i class="ti ti-pencil me-1"></i>
                  Edição Inline
                </h6>
                <p class="small mb-0">Tema bubble para edição discreta sem toolbar fixa.</p>
              </div>
            </div>
          </div>

          <!-- Features List -->
          <div class="col-12">
            <div class="card bg-label-secondary">
              <div class="card-body">
                <h6 class="mb-3">
                  <i class="ti ti-sparkles me-2"></i>
                  Funcionalidades do Quill
                </h6>
                <div class="row g-3">
                  <div class="col-md-3">
                    <ul class="list-unstyled small mb-0">
                      <li>✅ <strong>Bold</strong> (Ctrl+B)</li>
                      <li>✅ <em>Italic</em> (Ctrl+I)</li>
                      <li>✅ <u>Underline</u> (Ctrl+U)</li>
                      <li>✅ <s>Strike</s></li>
                    </ul>
                  </div>
                  <div class="col-md-3">
                    <ul class="list-unstyled small mb-0">
                      <li>📋 Headings (H1, H2, H3)</li>
                      <li>🔢 Listas ordenadas</li>
                      <li>• Listas bullet</li>
                      <li>⇄ Alinhamento</li>
                    </ul>
                  </div>
                  <div class="col-md-3">
                    <ul class="list-unstyled small mb-0">
                      <li>🔗 Links</li>
                      <li>🖼️ Imagens</li>
                      <li>💬 Blockquote</li>
                      <li>💻 Code block</li>
                    </ul>
                  </div>
                  <div class="col-md-3">
                    <ul class="list-unstyled small mb-0">
                      <li>🎨 Text color</li>
                      <li>🖌️ Background color</li>
                      <li>↩️ Undo/Redo</li>
                      <li>🧹 Clean format</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="alert alert-info mt-4">
          <strong>💡 Teste a interatividade:</strong>
          <ul class="mb-0 mt-2">
            <li><strong>Formatação Básica:</strong> Selecione texto, clique em Bold/Italic/Underline na toolbar</li>
            <li><strong>Headings:</strong> Dropdown "Normal" na toolbar - escolha H1, H2 ou H3</li>
            <li><strong>Listas:</strong> Botões de lista ordenada (1,2,3) ou bullet (•)</li>
            <li><strong>Links:</strong> Selecione texto, clique no ícone de link, cole URL</li>
            <li><strong>Imagens:</strong> Clique no ícone de imagem, cole URL ou base64</li>
            <li><strong>Colors:</strong> Selecione texto, clique no dropdown de cor</li>
            <li><strong>Atalhos:</strong> Ctrl+B (bold), Ctrl+I (italic), Ctrl+U (underline), Ctrl+Z (undo)</li>
            <li><strong>Bubble Theme:</strong> No terceiro editor, a toolbar SÓ aparece quando você seleciona texto</li>
            <li><strong>Ver HTML:</strong> Clique "Ver HTML" para extrair conteúdo formatado</li>
            <li><strong>Counter:</strong> Caracteres e palavras atualizam em tempo real</li>
          </ul>
        </div>
      </div>
      
      <!-- HTML Output Modal -->
      <div id="html-modal">
        <div id="html-modal-content">
          <div class="card mb-0">
            <div class="card-header d-flex justify-content-between align-items-center">
              <h5 class="mb-0">HTML Gerado</h5>
              <button type="button" class="btn-close" id="close-modal-btn"></button>
            </div>
            <div class="card-body">
              <p class="text-muted small">Este é o HTML gerado pelo editor:</p>
              <pre id="html-code"></pre>
              <button class="btn btn-sm btn-primary mt-2" onclick="navigator.clipboard.writeText(document.getElementById('html-code').textContent); alert('HTML copiado!')">
                <i class="ti ti-copy me-1"></i>
                Copiar HTML
              </button>
            </div>
          </div>
        </div>
      </div>
    `)};var d,c,m;a.parameters={...a.parameters,docs:{...(d=a.parameters)==null?void 0:d.docs,source:{originalSource:`() => createWysiwygEditor({
  theme: 'snow'
})`,...(m=(c=a.parameters)==null?void 0:c.docs)==null?void 0:m.source}}};var u,b,p;i.parameters={...i.parameters,docs:{...(u=i.parameters)==null?void 0:u.docs,source:{originalSource:`args => {
  const markup = createWysiwygEditor(args);
  return \`
    \${markup}
    
    <hr class="my-5" />
    
    <details>
      <summary><strong>Code Snippets</strong></summary>
      <div class="mt-3">
        <h6>HTML</h6>
        <pre><code>\${formatHtmlSnippet(markup).replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
        
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
  \`;
}`,...(p=(b=i.parameters)==null?void 0:b.docs)==null?void 0:p.source}}};var g,v,h;s.parameters={...s.parameters,docs:{...(g=s.parameters)==null?void 0:g.docs,source:{originalSource:`args => {
  const markup = createWysiwygEditor(args);
  return \`
    \${markup}
    
    <hr class="my-5" />
    
    <details>
      <summary><strong>Code Snippets</strong></summary>
      <div class="mt-3">
        <h6>HTML</h6>
        <pre><code>\${formatHtmlSnippet(markup).replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
        
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
  \`;
}`,...(h=(v=s.parameters)==null?void 0:v.docs)==null?void 0:h.source}}};var x,f,y,E,q;o.parameters={...o.parameters,docs:{...(x=o.parameters)==null?void 0:x.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: \`
### WYSIWYG Editor com Quill Real

Implementação oficial usando Quill do Vuexy:

- ✅ **Toolbar Completa** - todos os controles de formatação
- ✅ **Bold, Italic, Underline, Strike** - estilos de texto
- ✅ **Headings** - H1, H2, H3 para estruturar conteúdo
- ✅ **Lists** - bullet points e listas numeradas
- ✅ **Links** - inserir e editar hyperlinks
- ✅ **Images** - upload/insert de imagens (base64)
- ✅ **Blockquote** - citações
- ✅ **Code Block** - blocos de código
- ✅ **Text Align** - left, center, right, justify
- ✅ **Colors** - texto e background
- ✅ **Undo/Redo** - desfazer e refazer
- ✅ **Clean Format** - remover formatação

**Casos de uso:**
- Editor de blog posts
- Descrições de produtos
- Email composer
- Comentários ricos
- Documentação
- CMS content

### Como testar:
1. Selecione texto para formatar
2. Use toolbar para aplicar estilos
3. Teste atalhos (Ctrl+B, Ctrl+I, etc)
4. Insira links e imagens
        \`
      }
    }
  },
  loaders: [async () => {
    if (typeof window !== 'undefined') {
      // Load Quill CSS
      if (!document.querySelector('link[href*="quill"]')) {
        return new Promise((resolve, reject) => {
          const link = document.createElement('link');
          link.rel = 'stylesheet';
          link.href = '/vuexy/vendors/libs/quill/editor.css';
          link.onload = () => {
            // Load Quill JS after CSS
            if (!window.Quill) {
              const script = document.createElement('script');
              script.src = '/vuexy/vendors/libs/quill/quill.js';
              script.onload = () => {
                console.log('✅ Quill CSS + JS carregados');
                resolve({
                  quillLoaded: true
                });
              };
              script.onerror = () => reject(new Error('Failed to load Quill JS'));
              document.head.appendChild(script);
            } else {
              resolve({
                quillLoaded: true
              });
            }
          };
          link.onerror = () => reject(new Error('Failed to load Quill CSS'));
          document.head.appendChild(link);
        });
      }
      return {
        quillLoaded: true
      };
    }
    return {};
  }],
  render: () => {
    // Initialize Quill after render
    setTimeout(() => {
      if (window.Quill) {
        // 1. Full Toolbar Editor
        const quillFull = new Quill('#editor-full', {
          theme: 'snow',
          modules: {
            toolbar: [[{
              'header': [1, 2, 3, false]
            }], ['bold', 'italic', 'underline', 'strike'], [{
              'list': 'ordered'
            }, {
              'list': 'bullet'
            }], [{
              'align': []
            }], ['link', 'image'], [{
              'color': []
            }, {
              'background': []
            }], ['blockquote', 'code-block'], ['clean']]
          },
          placeholder: 'Digite seu conteúdo aqui...'
        });

        // Set initial content
        quillFull.root.innerHTML = \`
          <h2>Bem-vindo ao Editor Quill! 📝</h2>
          <p>Este é um editor <strong>WYSIWYG</strong> (What You See Is What You Get) completo. Você pode:</p>
          <ul>
            <li><strong>Negrito</strong>, <em>itálico</em>, <u>sublinhado</u></li>
            <li>Criar listas ordenadas e não ordenadas</li>
            <li>Adicionar <a href="https://quilljs.com" target="_blank">links</a></li>
            <li>Inserir imagens</li>
          </ul>
          <blockquote>
            "A escrita é a pintura da voz." - Voltaire
          </blockquote>
          <p>Experimente selecionar texto e usar a toolbar acima! 🎨</p>
        \`;

        // 2. Essential Toolbar (simplified)
        const quillEssential = new Quill('#editor-essential', {
          theme: 'snow',
          modules: {
            toolbar: [['bold', 'italic', 'underline'], [{
              'list': 'ordered'
            }, {
              'list': 'bullet'
            }], ['link'], ['clean']]
          },
          placeholder: 'Editor com toolbar essencial...'
        });
        quillEssential.root.innerHTML = \`
          <p>Este editor tem apenas as <strong>ferramentas essenciais</strong>:</p>
          <ul>
            <li>Formatação básica (bold, italic, underline)</li>
            <li>Listas</li>
            <li>Links</li>
          </ul>
          <p>Ideal para comentários ou descrições simples.</p>
        \`;

        // 3. Bubble Theme (inline toolbar)
        const quillBubble = new Quill('#editor-bubble', {
          theme: 'bubble',
          placeholder: 'Selecione texto para ver a toolbar aparecer...'
        });
        quillBubble.root.innerHTML = \`
          <p>Este editor usa o <strong>tema Bubble</strong>! 🎈</p>
          <p>A toolbar aparece como um <em>tooltip</em> quando você seleciona texto.</p>
          <p>Perfeito para edição inline e interface minimalista.</p>
        \`;

        // Listen to changes
        quillFull.on('text-change', function () {
          const length = quillFull.getLength() - 1;
          const words = quillFull.getText().trim().split(/\\\\s+/).length;
          document.getElementById('char-count').textContent = length;
          document.getElementById('word-count').textContent = words;
        });

        // Get HTML content button
        document.getElementById('get-html-btn').addEventListener('click', () => {
          const html = quillFull.root.innerHTML;
          const modal = document.getElementById('html-modal');
          const code = document.getElementById('html-code');
          code.textContent = html;
          modal.style.display = 'block';
        });

        // Close modal
        document.getElementById('close-modal-btn').addEventListener('click', () => {
          document.getElementById('html-modal').style.display = 'none';
        });
        document.getElementById('html-modal').addEventListener('click', e => {
          if (e.target.id === 'html-modal') {
            document.getElementById('html-modal').style.display = 'none';
          }
        });
        console.log('✅ Quill inicializado em 3 editores');
      }
    }, 100);
    return \`
      <style>
        .ql-container {
          min-height: 200px;
          font-size: 14px;
        }
        .ql-editor {
          min-height: 200px;
        }
        .ql-editor.ql-blank::before {
          font-style: italic;
          color: #adb5bd;
        }
        #html-modal {
          display: none;
          position: fixed;
          z-index: 9999;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0,0,0,0.4);
        }
        #html-modal-content {
          background-color: #fff;
          margin: 5% auto;
          padding: 0;
          border-radius: 8px;
          width: 90%;
          max-width: 700px;
          box-shadow: 0 4px 24px 0 rgba(34,41,47,0.1);
        }
        #html-code {
          background: #f8f9fa;
          padding: 15px;
          border-radius: 4px;
          font-family: 'Courier New', monospace;
          font-size: 12px;
          max-height: 400px;
          overflow-y: auto;
          white-space: pre-wrap;
          word-break: break-all;
        }
      </style>
      
      <div style="padding: 30px;">
        <h5 class="mb-4">
          <i class="ti ti-text me-2 text-primary"></i>
          WYSIWYG Editor com Quill
        </h5>
        
        <div class="row g-4">
          <!-- 1. Full Toolbar Editor -->
          <div class="col-12">
            <div class="card">
              <div class="card-header d-flex justify-content-between align-items-center">
                <h6 class="mb-0">
                  <i class="ti ti-edit me-2"></i>
                  Editor Completo
                </h6>
                <div class="d-flex gap-2">
                  <span class="badge bg-label-primary">
                    <i class="ti ti-letter-a me-1"></i>
                    <span id="char-count">0</span> caracteres
                  </span>
                  <span class="badge bg-label-success">
                    <i class="ti ti-book me-1"></i>
                    <span id="word-count">0</span> palavras
                  </span>
                </div>
              </div>
              <div class="card-body">
                <div id="editor-full"></div>
                <div class="mt-3">
                  <button class="btn btn-sm btn-primary" id="get-html-btn">
                    <i class="ti ti-code me-1"></i>
                    Ver HTML
                  </button>
                  <button class="btn btn-sm btn-outline-secondary" onclick="window.Quill && document.querySelector('#editor-full').querySelector('.ql-editor').innerHTML = ''">
                    <i class="ti ti-trash me-1"></i>
                    Limpar
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- 2. Essential Toolbar -->
          <div class="col-lg-6">
            <div class="card">
              <div class="card-header">
                <h6 class="mb-0">
                  <i class="ti ti-layout-navbar me-2"></i>
                  Toolbar Essencial
                </h6>
              </div>
              <div class="card-body">
                <p class="text-muted small mb-3">Apenas ferramentas básicas</p>
                <div id="editor-essential"></div>
              </div>
            </div>
          </div>

          <!-- 3. Bubble Theme -->
          <div class="col-lg-6">
            <div class="card">
              <div class="card-header">
                <h6 class="mb-0">
                  <i class="ti ti-bubble me-2"></i>
                  Tema Bubble (Inline)
                </h6>
              </div>
              <div class="card-body">
                <p class="text-muted small mb-3">Toolbar aparece ao selecionar texto</p>
                <div id="editor-bubble"></div>
              </div>
            </div>
          </div>

          <!-- Use Cases -->
          <div class="col-md-4">
            <div class="card border-primary">
              <div class="card-body">
                <h6 class="text-primary mb-2">
                  <i class="ti ti-article me-1"></i>
                  Blog Post
                </h6>
                <p class="small mb-0">Editor completo com todas as opções de formatação, imagens, links e código.</p>
              </div>
            </div>
          </div>
          
          <div class="col-md-4">
            <div class="card border-success">
              <div class="card-body">
                <h6 class="text-success mb-2">
                  <i class="ti ti-message me-1"></i>
                  Comentários
                </h6>
                <p class="small mb-0">Toolbar essencial para permitir formatação básica sem exageros.</p>
              </div>
            </div>
          </div>
          
          <div class="col-md-4">
            <div class="card border-info">
              <div class="card-body">
                <h6 class="text-info mb-2">
                  <i class="ti ti-pencil me-1"></i>
                  Edição Inline
                </h6>
                <p class="small mb-0">Tema bubble para edição discreta sem toolbar fixa.</p>
              </div>
            </div>
          </div>

          <!-- Features List -->
          <div class="col-12">
            <div class="card bg-label-secondary">
              <div class="card-body">
                <h6 class="mb-3">
                  <i class="ti ti-sparkles me-2"></i>
                  Funcionalidades do Quill
                </h6>
                <div class="row g-3">
                  <div class="col-md-3">
                    <ul class="list-unstyled small mb-0">
                      <li>✅ <strong>Bold</strong> (Ctrl+B)</li>
                      <li>✅ <em>Italic</em> (Ctrl+I)</li>
                      <li>✅ <u>Underline</u> (Ctrl+U)</li>
                      <li>✅ <s>Strike</s></li>
                    </ul>
                  </div>
                  <div class="col-md-3">
                    <ul class="list-unstyled small mb-0">
                      <li>📋 Headings (H1, H2, H3)</li>
                      <li>🔢 Listas ordenadas</li>
                      <li>• Listas bullet</li>
                      <li>⇄ Alinhamento</li>
                    </ul>
                  </div>
                  <div class="col-md-3">
                    <ul class="list-unstyled small mb-0">
                      <li>🔗 Links</li>
                      <li>🖼️ Imagens</li>
                      <li>💬 Blockquote</li>
                      <li>💻 Code block</li>
                    </ul>
                  </div>
                  <div class="col-md-3">
                    <ul class="list-unstyled small mb-0">
                      <li>🎨 Text color</li>
                      <li>🖌️ Background color</li>
                      <li>↩️ Undo/Redo</li>
                      <li>🧹 Clean format</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="alert alert-info mt-4">
          <strong>💡 Teste a interatividade:</strong>
          <ul class="mb-0 mt-2">
            <li><strong>Formatação Básica:</strong> Selecione texto, clique em Bold/Italic/Underline na toolbar</li>
            <li><strong>Headings:</strong> Dropdown "Normal" na toolbar - escolha H1, H2 ou H3</li>
            <li><strong>Listas:</strong> Botões de lista ordenada (1,2,3) ou bullet (•)</li>
            <li><strong>Links:</strong> Selecione texto, clique no ícone de link, cole URL</li>
            <li><strong>Imagens:</strong> Clique no ícone de imagem, cole URL ou base64</li>
            <li><strong>Colors:</strong> Selecione texto, clique no dropdown de cor</li>
            <li><strong>Atalhos:</strong> Ctrl+B (bold), Ctrl+I (italic), Ctrl+U (underline), Ctrl+Z (undo)</li>
            <li><strong>Bubble Theme:</strong> No terceiro editor, a toolbar SÓ aparece quando você seleciona texto</li>
            <li><strong>Ver HTML:</strong> Clique "Ver HTML" para extrair conteúdo formatado</li>
            <li><strong>Counter:</strong> Caracteres e palavras atualizam em tempo real</li>
          </ul>
        </div>
      </div>
      
      <!-- HTML Output Modal -->
      <div id="html-modal">
        <div id="html-modal-content">
          <div class="card mb-0">
            <div class="card-header d-flex justify-content-between align-items-center">
              <h5 class="mb-0">HTML Gerado</h5>
              <button type="button" class="btn-close" id="close-modal-btn"></button>
            </div>
            <div class="card-body">
              <p class="text-muted small">Este é o HTML gerado pelo editor:</p>
              <pre id="html-code"></pre>
              <button class="btn btn-sm btn-primary mt-2" onclick="navigator.clipboard.writeText(document.getElementById('html-code').textContent); alert('HTML copiado!')">
                <i class="ti ti-copy me-1"></i>
                Copiar HTML
              </button>
            </div>
          </div>
        </div>
      </div>
    \`;
  }
}`,...(y=(f=o.parameters)==null?void 0:f.docs)==null?void 0:y.source},description:{story:`====================================
INTERACTIVE STORY - Quill Real
====================================`,...(q=(E=o.parameters)==null?void 0:E.docs)==null?void 0:q.description}}};const H=["Overview","SnowTheme","BubbleTheme","Interactive"];export{s as BubbleTheme,o as Interactive,a as Overview,i as SnowTheme,H as __namedExportsOrder,S as default};
