const d={title:"📚 Getting Started",parameters:{previewTabs:{canvas:{hidden:!0}},viewMode:"docs"}},e={render:()=>`
    <div style="padding: 2rem; max-width: 900px; margin: 0 auto; font-family: system-ui, -apple-system, sans-serif;">
      <h1 style="font-size: 2.5rem; margin-bottom: 1rem; color: #5f61e6;">
        🎨 Vuexy Design System
      </h1>
      <p style="font-size: 1.25rem; color: #6c757d; margin-bottom: 2rem;">
        Sistema de design baseado no tema Vuexy utilizando <strong>Atomic Design</strong> para organização escalável de componentes.
      </p>

      <div style="background: #f8f9fa; padding: 1.5rem; border-radius: 8px; margin-bottom: 2rem;">
        <h2 style="font-size: 1.5rem; margin-bottom: 1rem;">🎯 Objetivo</h2>
        <p style="line-height: 1.6;">
          Catalogar e documentar todos os componentes visuais do Vuexy de forma organizada,
          mantendo fidelidade visual completa e fornecendo código reutilizável para múltiplos stacks
          (HTML, React, Vue 2, Vue 3).
        </p>
      </div>

      <h2 style="font-size: 1.75rem; margin-bottom: 1rem; margin-top: 2rem;">🧬 O que é Atomic Design?</h2>
      <p style="line-height: 1.6; margin-bottom: 1.5rem;">
        Atomic Design é uma metodologia criada por Brad Frost que organiza componentes em 5 níveis de complexidade:
      </p>

      <div style="display: grid; gap: 1rem; margin-bottom: 2rem;">
        <div style="border-left: 4px solid #5f61e6; padding: 1rem; background: white;">
          <h3 style="margin: 0 0 0.5rem 0; color: #5f61e6;">⚛️ Atoms</h3>
          <p style="margin: 0; line-height: 1.6;">
            Elementos indivisíveis da interface (botões, inputs, labels, ícones).
            <br><strong>Exemplo:</strong> Button, Input, Badge, Avatar
          </p>
        </div>

        <div style="border-left: 4px solid #16b1ff; padding: 1rem; background: white;">
          <h3 style="margin: 0 0 0.5rem 0; color: #16b1ff;">🔬 Molecules</h3>
          <p style="margin: 0; line-height: 1.6;">
            Combinação de 2+ átomos formando componentes simples (campo de busca, card básico).
            <br><strong>Exemplo:</strong> SearchField, FormGroup, MenuItem
          </p>
        </div>

        <div style="border-left: 4px solid #56ca00; padding: 1rem; background: white;">
          <h3 style="margin: 0 0 0.5rem 0; color: #56ca00;">🧪 Organisms</h3>
          <p style="margin: 0; line-height: 1.6;">
            Seções complexas com funcionalidade definida (navbar, datatable, modal).
            <br><strong>Exemplo:</strong> DataTable, Navbar, Sidebar, ModalDialog
          </p>
        </div>

        <div style="border-left: 4px solid #ffb400; padding: 1rem; background: white;">
          <h3 style="margin: 0 0 0.5rem 0; color: #ffb400;">📐 Templates</h3>
          <p style="margin: 0; line-height: 1.6;">
            Estruturas de página com placeholders (layout de dashboard, layout de auth).
            <br><strong>Exemplo:</strong> DashboardLayout, AuthLayout, EmptyLayout
          </p>
        </div>

        <div style="border-left: 4px solid #ff4c51; padding: 1rem; background: white;">
          <h3 style="margin: 0 0 0.5rem 0; color: #ff4c51;">📄 Pages</h3>
          <p style="margin: 0; line-height: 1.6;">
            Instâncias de templates com conteúdo real (página de dashboard, página de login).
            <br><strong>Exemplo:</strong> DashboardPage, LoginPage, ProductListPage
          </p>
        </div>
      </div>

      <h2 style="font-size: 1.75rem; margin-bottom: 1rem; margin-top: 2rem;">✅ Definition of Done</h2>
      
      <div style="background: white; border: 1px solid #dee2e6; border-radius: 8px; padding: 1.5rem; margin-bottom: 2rem;">
        <h3 style="margin-top: 0;">Para Atoms</h3>
        <ul style="line-height: 1.8;">
          <li>✓ Story com Overview (grid de todas as variações)</li>
          <li>✓ Stories individuais para cada estado/variante</li>
          <li>✓ Controls funcionais (variant, size, disabled, etc.)</li>
          <li>✓ Visual 100% idêntico ao Vuexy (classes originais)</li>
          <li>✓ Snippets: HTML + React + Vue2 + Vue3</li>
          <li>✓ Documentação de estados (hover, focus, active, disabled)</li>
        </ul>

        <h3>Para Molecules</h3>
        <ul style="line-height: 1.8;">
          <li>✓ Tudo dos Atoms +</li>
          <li>✓ Demonstrar composição (quais atoms usou)</li>
          <li>✓ Props/controls para interação entre partes</li>
          <li>✓ Estados de validação se aplicável (error, success)</li>
        </ul>

        <h3>Para Organisms</h3>
        <ul style="line-height: 1.8;">
          <li>✓ Tudo das Molecules +</li>
          <li>✓ Estados complexos (loading, empty, error)</li>
          <li>✓ Comportamento interativo documentado</li>
          <li>✓ Props de dados mockados</li>
          <li>✓ Responsividade documentada</li>
        </ul>
      </div>

      <h2 style="font-size: 1.75rem; margin-bottom: 1rem; margin-top: 2rem;">🚀 Como criar um novo componente</h2>
      
      <div style="background: #282c34; color: #abb2bf; padding: 1.5rem; border-radius: 8px; margin-bottom: 2rem; overflow-x: auto;">
        <pre style="margin: 0; font-family: 'Courier New', monospace; font-size: 0.9rem;"><code>// 1. Escolha o nível Atomic correto
// 2. Crie o arquivo no caminho:
//    src/stories/[atoms|molecules|organisms]/[categoria]/[Nome].stories.js

// 3. Use este template:

import { formatHtmlSnippet, formatReactSnippet, formatVue2Snippet, formatVue3Snippet } from '../../_helpers/snippets';

export default {
  title: 'Atoms/Actions/Button', // Padrão: Nível/Categoria/Nome
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'success'],
      description: 'Visual variant'
    },
    // ... mais controls
  },
  parameters: {
    docs: {
      description: {
        component: 'Descrição do componente e quando usar.'
      }
    }
  }
};

// Story Overview (grid de variações)
export const Overview = {
  render: () =&gt; '&lt;!-- HTML com todas as variações --&gt;',
  parameters: {
    docs: {
      source: {
        code: formatHtmlSnippet('&lt;!-- Markup --&gt;')
      }
    }
  }
};

// Stories individuais
export const Primary = {
  args: { variant: 'primary', label: 'Primary' },
  render: (args) =&gt; createMarkup(args)
};</code></pre>
      </div>

      <h2 style="font-size: 1.75rem; margin-bottom: 1rem; margin-top: 2rem;">📦 Snippets Multi-Stack</h2>
      <p style="line-height: 1.6; margin-bottom: 1rem;">
        Todos os componentes devem incluir código para os 4 stacks suportados:
      </p>
      
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; margin-bottom: 2rem;">
        <div style="background: #fff3cd; padding: 1rem; border-radius: 4px; text-align: center;">
          <strong>HTML</strong><br>Markup puro
        </div>
        <div style="background: #d1ecf1; padding: 1rem; border-radius: 4px; text-align: center;">
          <strong>React</strong><br>JSX Component
        </div>
        <div style="background: #d4edda; padding: 1rem; border-radius: 4px; text-align: center;">
          <strong>Vue 2</strong><br>Options API
        </div>
        <div style="background: #e2e3e5; padding: 1rem; border-radius: 4px; text-align: center;">
          <strong>Vue 3</strong><br>Composition API
        </div>
      </div>

      <p style="line-height: 1.6;">
        Use os helpers em <code>_helpers/snippets.js</code> para formatar automaticamente.
      </p>

      <div style="background: #e7f3ff; border-left: 4px solid #2196f3; padding: 1rem; margin-top: 2rem;">
        <strong>💡 Próximos passos:</strong>
        <ul style="margin: 0.5rem 0 0 0; line-height: 1.8;">
          <li>Explore <strong>Foundations</strong> para ver cores, tipografia e espaçamento do Vuexy</li>
          <li>Veja <strong>Atoms &gt; Actions &gt; Button</strong> como referência completa</li>
          <li>Use os helpers em <code>_helpers/</code> para criar novos componentes rapidamente</li>
        </ul>
      </div>
    </div>
  `},t={render:()=>`
    <div style="padding: 2rem; max-width: 900px; margin: 0 auto;">
      <h1 style="font-size: 2rem; margin-bottom: 1rem; color: #5f61e6;">🧙‍♂️ Getting Started - Step by Step</h1>
      
      <div id="wizard-container">
        <!-- Progress Bar -->
        <div class="mb-4">
          <div class="d-flex justify-content-between mb-2">
            <span class="text-muted">Step <span id="current-step">1</span> of 4</span>
            <span class="text-muted"><span id="progress-percent">0</span>%</span>
          </div>
          <div class="progress" style="height: 8px;">
            <div id="progress-bar" class="progress-bar bg-primary" style="width: 0%"></div>
          </div>
        </div>
        
        <!-- Step 1: Welcome -->
        <div id="step-1" class="wizard-step">
          <h3>👋 Welcome to Vuexy Design System!</h3>
          <p class="lead">This wizard will guide you through the key concepts.</p>
          <div class="alert alert-info">
            <strong>💡 Tip:</strong> This system uses Atomic Design methodology
          </div>
        </div>
        
        <!-- Step 2: Atomic Design -->
        <div id="step-2" class="wizard-step" style="display: none;">
          <h3>🧬 Understanding Atomic Design</h3>
          <div class="row g-3">
            <div class="col-md-6">
              <div class="card">
                <div class="card-body">
                  <h5>⚛️ Atoms</h5>
                  <p class="small">Basic building blocks like buttons, inputs</p>
                </div>
              </div>
            </div>
            <div class="col-md-6">
              <div class="card">
                <div class="card-body">
                  <h5>🔬 Molecules</h5>
                  <p class="small">Simple combinations of atoms</p>
                </div>
              </div>
            </div>
            <div class="col-md-6">
              <div class="card">
                <div class="card-body">
                  <h5>🧪 Organisms</h5>
                  <p class="small">Complex UI sections</p>
                </div>
              </div>
            </div>
            <div class="col-md-6">
              <div class="card">
                <div class="card-body">
                  <h5>📐 Templates</h5>
                  <p class="small">Page layouts and structures</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Step 3: Components -->
        <div id="step-3" class="wizard-step" style="display: none;">
          <h3>🎨 Exploring Components</h3>
          <p>Navigate through the sidebar to explore:</p>
          <ul class="list-group">
            <li class="list-group-item">✅ Foundations (Colors, Typography, Spacing)</li>
            <li class="list-group-item">✅ Atoms (17 components)</li>
            <li class="list-group-item">✅ Molecules (18 components)</li>
            <li class="list-group-item">✅ Organisms (22 components)</li>
            <li class="list-group-item">✅ Templates (8 layouts)</li>
          </ul>
        </div>
        
        <!-- Step 4: Done -->
        <div id="step-4" class="wizard-step" style="display: none;">
          <h3>🎉 You're All Set!</h3>
          <div class="text-center py-4">
            <div class="mb-3">
              <i class="bx bx-check-circle" style="font-size: 5rem; color: #56ca00;"></i>
            </div>
            <p class="lead">Start exploring the design system!</p>
            <a href="#" class="btn btn-primary">Browse Components</a>
          </div>
        </div>
        
        <!-- Navigation -->
        <div class="d-flex justify-content-between mt-4">
          <button id="btn-prev" class="btn btn-outline-secondary" onclick="
            const current = parseInt(document.getElementById('current-step').textContent);
            if (current > 1) {
              document.getElementById('step-' + current).style.display = 'none';
              document.getElementById('step-' + (current - 1)).style.display = 'block';
              document.getElementById('current-step').textContent = current - 1;
              const progress = ((current - 2) / 3) * 100;
              document.getElementById('progress-bar').style.width = progress + '%';
              document.getElementById('progress-percent').textContent = Math.round(progress);
              document.getElementById('btn-next').textContent = '➡️ Next';
              document.getElementById('btn-next').className = 'btn btn-primary';
              if (current - 1 === 1) {
                document.getElementById('btn-prev').disabled = true;
              }
            }
          " disabled>⬅️ Previous</button>
          <button id="btn-next" class="btn btn-primary" onclick="
            const current = parseInt(document.getElementById('current-step').textContent);
            if (current < 4) {
              document.getElementById('step-' + current).style.display = 'none';
              document.getElementById('step-' + (current + 1)).style.display = 'block';
              document.getElementById('current-step').textContent = current + 1;
              const progress = (current / 3) * 100;
              document.getElementById('progress-bar').style.width = progress + '%';
              document.getElementById('progress-percent').textContent = Math.round(progress);
              document.getElementById('btn-prev').disabled = false;
              if (current + 1 === 4) {
                this.textContent = '✅ Finish';
                this.className = 'btn btn-success';
              }
            } else {
              alert('🎉 Tutorial completed! Happy coding!');
            }
          ">➡️ Next</button>
        </div>
      </div>
    </div>
  `};var n,s,o;e.parameters={...e.parameters,docs:{...(n=e.parameters)==null?void 0:n.docs,source:{originalSource:`{
  render: () => \`
    <div style="padding: 2rem; max-width: 900px; margin: 0 auto; font-family: system-ui, -apple-system, sans-serif;">
      <h1 style="font-size: 2.5rem; margin-bottom: 1rem; color: #5f61e6;">
        🎨 Vuexy Design System
      </h1>
      <p style="font-size: 1.25rem; color: #6c757d; margin-bottom: 2rem;">
        Sistema de design baseado no tema Vuexy utilizando <strong>Atomic Design</strong> para organização escalável de componentes.
      </p>

      <div style="background: #f8f9fa; padding: 1.5rem; border-radius: 8px; margin-bottom: 2rem;">
        <h2 style="font-size: 1.5rem; margin-bottom: 1rem;">🎯 Objetivo</h2>
        <p style="line-height: 1.6;">
          Catalogar e documentar todos os componentes visuais do Vuexy de forma organizada,
          mantendo fidelidade visual completa e fornecendo código reutilizável para múltiplos stacks
          (HTML, React, Vue 2, Vue 3).
        </p>
      </div>

      <h2 style="font-size: 1.75rem; margin-bottom: 1rem; margin-top: 2rem;">🧬 O que é Atomic Design?</h2>
      <p style="line-height: 1.6; margin-bottom: 1.5rem;">
        Atomic Design é uma metodologia criada por Brad Frost que organiza componentes em 5 níveis de complexidade:
      </p>

      <div style="display: grid; gap: 1rem; margin-bottom: 2rem;">
        <div style="border-left: 4px solid #5f61e6; padding: 1rem; background: white;">
          <h3 style="margin: 0 0 0.5rem 0; color: #5f61e6;">⚛️ Atoms</h3>
          <p style="margin: 0; line-height: 1.6;">
            Elementos indivisíveis da interface (botões, inputs, labels, ícones).
            <br><strong>Exemplo:</strong> Button, Input, Badge, Avatar
          </p>
        </div>

        <div style="border-left: 4px solid #16b1ff; padding: 1rem; background: white;">
          <h3 style="margin: 0 0 0.5rem 0; color: #16b1ff;">🔬 Molecules</h3>
          <p style="margin: 0; line-height: 1.6;">
            Combinação de 2+ átomos formando componentes simples (campo de busca, card básico).
            <br><strong>Exemplo:</strong> SearchField, FormGroup, MenuItem
          </p>
        </div>

        <div style="border-left: 4px solid #56ca00; padding: 1rem; background: white;">
          <h3 style="margin: 0 0 0.5rem 0; color: #56ca00;">🧪 Organisms</h3>
          <p style="margin: 0; line-height: 1.6;">
            Seções complexas com funcionalidade definida (navbar, datatable, modal).
            <br><strong>Exemplo:</strong> DataTable, Navbar, Sidebar, ModalDialog
          </p>
        </div>

        <div style="border-left: 4px solid #ffb400; padding: 1rem; background: white;">
          <h3 style="margin: 0 0 0.5rem 0; color: #ffb400;">📐 Templates</h3>
          <p style="margin: 0; line-height: 1.6;">
            Estruturas de página com placeholders (layout de dashboard, layout de auth).
            <br><strong>Exemplo:</strong> DashboardLayout, AuthLayout, EmptyLayout
          </p>
        </div>

        <div style="border-left: 4px solid #ff4c51; padding: 1rem; background: white;">
          <h3 style="margin: 0 0 0.5rem 0; color: #ff4c51;">📄 Pages</h3>
          <p style="margin: 0; line-height: 1.6;">
            Instâncias de templates com conteúdo real (página de dashboard, página de login).
            <br><strong>Exemplo:</strong> DashboardPage, LoginPage, ProductListPage
          </p>
        </div>
      </div>

      <h2 style="font-size: 1.75rem; margin-bottom: 1rem; margin-top: 2rem;">✅ Definition of Done</h2>
      
      <div style="background: white; border: 1px solid #dee2e6; border-radius: 8px; padding: 1.5rem; margin-bottom: 2rem;">
        <h3 style="margin-top: 0;">Para Atoms</h3>
        <ul style="line-height: 1.8;">
          <li>✓ Story com Overview (grid de todas as variações)</li>
          <li>✓ Stories individuais para cada estado/variante</li>
          <li>✓ Controls funcionais (variant, size, disabled, etc.)</li>
          <li>✓ Visual 100% idêntico ao Vuexy (classes originais)</li>
          <li>✓ Snippets: HTML + React + Vue2 + Vue3</li>
          <li>✓ Documentação de estados (hover, focus, active, disabled)</li>
        </ul>

        <h3>Para Molecules</h3>
        <ul style="line-height: 1.8;">
          <li>✓ Tudo dos Atoms +</li>
          <li>✓ Demonstrar composição (quais atoms usou)</li>
          <li>✓ Props/controls para interação entre partes</li>
          <li>✓ Estados de validação se aplicável (error, success)</li>
        </ul>

        <h3>Para Organisms</h3>
        <ul style="line-height: 1.8;">
          <li>✓ Tudo das Molecules +</li>
          <li>✓ Estados complexos (loading, empty, error)</li>
          <li>✓ Comportamento interativo documentado</li>
          <li>✓ Props de dados mockados</li>
          <li>✓ Responsividade documentada</li>
        </ul>
      </div>

      <h2 style="font-size: 1.75rem; margin-bottom: 1rem; margin-top: 2rem;">🚀 Como criar um novo componente</h2>
      
      <div style="background: #282c34; color: #abb2bf; padding: 1.5rem; border-radius: 8px; margin-bottom: 2rem; overflow-x: auto;">
        <pre style="margin: 0; font-family: 'Courier New', monospace; font-size: 0.9rem;"><code>// 1. Escolha o nível Atomic correto
// 2. Crie o arquivo no caminho:
//    src/stories/[atoms|molecules|organisms]/[categoria]/[Nome].stories.js

// 3. Use este template:

import { formatHtmlSnippet, formatReactSnippet, formatVue2Snippet, formatVue3Snippet } from '../../_helpers/snippets';

export default {
  title: 'Atoms/Actions/Button', // Padrão: Nível/Categoria/Nome
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'success'],
      description: 'Visual variant'
    },
    // ... mais controls
  },
  parameters: {
    docs: {
      description: {
        component: 'Descrição do componente e quando usar.'
      }
    }
  }
};

// Story Overview (grid de variações)
export const Overview = {
  render: () =&gt; '&lt;!-- HTML com todas as variações --&gt;',
  parameters: {
    docs: {
      source: {
        code: formatHtmlSnippet('&lt;!-- Markup --&gt;')
      }
    }
  }
};

// Stories individuais
export const Primary = {
  args: { variant: 'primary', label: 'Primary' },
  render: (args) =&gt; createMarkup(args)
};</code></pre>
      </div>

      <h2 style="font-size: 1.75rem; margin-bottom: 1rem; margin-top: 2rem;">📦 Snippets Multi-Stack</h2>
      <p style="line-height: 1.6; margin-bottom: 1rem;">
        Todos os componentes devem incluir código para os 4 stacks suportados:
      </p>
      
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; margin-bottom: 2rem;">
        <div style="background: #fff3cd; padding: 1rem; border-radius: 4px; text-align: center;">
          <strong>HTML</strong><br>Markup puro
        </div>
        <div style="background: #d1ecf1; padding: 1rem; border-radius: 4px; text-align: center;">
          <strong>React</strong><br>JSX Component
        </div>
        <div style="background: #d4edda; padding: 1rem; border-radius: 4px; text-align: center;">
          <strong>Vue 2</strong><br>Options API
        </div>
        <div style="background: #e2e3e5; padding: 1rem; border-radius: 4px; text-align: center;">
          <strong>Vue 3</strong><br>Composition API
        </div>
      </div>

      <p style="line-height: 1.6;">
        Use os helpers em <code>_helpers/snippets.js</code> para formatar automaticamente.
      </p>

      <div style="background: #e7f3ff; border-left: 4px solid #2196f3; padding: 1rem; margin-top: 2rem;">
        <strong>💡 Próximos passos:</strong>
        <ul style="margin: 0.5rem 0 0 0; line-height: 1.8;">
          <li>Explore <strong>Foundations</strong> para ver cores, tipografia e espaçamento do Vuexy</li>
          <li>Veja <strong>Atoms &gt; Actions &gt; Button</strong> como referência completa</li>
          <li>Use os helpers em <code>_helpers/</code> para criar novos componentes rapidamente</li>
        </ul>
      </div>
    </div>
  \`
}`,...(o=(s=e.parameters)==null?void 0:s.docs)==null?void 0:o.source}}};var r,i,a;t.parameters={...t.parameters,docs:{...(r=t.parameters)==null?void 0:r.docs,source:{originalSource:`{
  render: () => \`
    <div style="padding: 2rem; max-width: 900px; margin: 0 auto;">
      <h1 style="font-size: 2rem; margin-bottom: 1rem; color: #5f61e6;">🧙‍♂️ Getting Started - Step by Step</h1>
      
      <div id="wizard-container">
        <!-- Progress Bar -->
        <div class="mb-4">
          <div class="d-flex justify-content-between mb-2">
            <span class="text-muted">Step <span id="current-step">1</span> of 4</span>
            <span class="text-muted"><span id="progress-percent">0</span>%</span>
          </div>
          <div class="progress" style="height: 8px;">
            <div id="progress-bar" class="progress-bar bg-primary" style="width: 0%"></div>
          </div>
        </div>
        
        <!-- Step 1: Welcome -->
        <div id="step-1" class="wizard-step">
          <h3>👋 Welcome to Vuexy Design System!</h3>
          <p class="lead">This wizard will guide you through the key concepts.</p>
          <div class="alert alert-info">
            <strong>💡 Tip:</strong> This system uses Atomic Design methodology
          </div>
        </div>
        
        <!-- Step 2: Atomic Design -->
        <div id="step-2" class="wizard-step" style="display: none;">
          <h3>🧬 Understanding Atomic Design</h3>
          <div class="row g-3">
            <div class="col-md-6">
              <div class="card">
                <div class="card-body">
                  <h5>⚛️ Atoms</h5>
                  <p class="small">Basic building blocks like buttons, inputs</p>
                </div>
              </div>
            </div>
            <div class="col-md-6">
              <div class="card">
                <div class="card-body">
                  <h5>🔬 Molecules</h5>
                  <p class="small">Simple combinations of atoms</p>
                </div>
              </div>
            </div>
            <div class="col-md-6">
              <div class="card">
                <div class="card-body">
                  <h5>🧪 Organisms</h5>
                  <p class="small">Complex UI sections</p>
                </div>
              </div>
            </div>
            <div class="col-md-6">
              <div class="card">
                <div class="card-body">
                  <h5>📐 Templates</h5>
                  <p class="small">Page layouts and structures</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Step 3: Components -->
        <div id="step-3" class="wizard-step" style="display: none;">
          <h3>🎨 Exploring Components</h3>
          <p>Navigate through the sidebar to explore:</p>
          <ul class="list-group">
            <li class="list-group-item">✅ Foundations (Colors, Typography, Spacing)</li>
            <li class="list-group-item">✅ Atoms (17 components)</li>
            <li class="list-group-item">✅ Molecules (18 components)</li>
            <li class="list-group-item">✅ Organisms (22 components)</li>
            <li class="list-group-item">✅ Templates (8 layouts)</li>
          </ul>
        </div>
        
        <!-- Step 4: Done -->
        <div id="step-4" class="wizard-step" style="display: none;">
          <h3>🎉 You're All Set!</h3>
          <div class="text-center py-4">
            <div class="mb-3">
              <i class="bx bx-check-circle" style="font-size: 5rem; color: #56ca00;"></i>
            </div>
            <p class="lead">Start exploring the design system!</p>
            <a href="#" class="btn btn-primary">Browse Components</a>
          </div>
        </div>
        
        <!-- Navigation -->
        <div class="d-flex justify-content-between mt-4">
          <button id="btn-prev" class="btn btn-outline-secondary" onclick="
            const current = parseInt(document.getElementById('current-step').textContent);
            if (current > 1) {
              document.getElementById('step-' + current).style.display = 'none';
              document.getElementById('step-' + (current - 1)).style.display = 'block';
              document.getElementById('current-step').textContent = current - 1;
              const progress = ((current - 2) / 3) * 100;
              document.getElementById('progress-bar').style.width = progress + '%';
              document.getElementById('progress-percent').textContent = Math.round(progress);
              document.getElementById('btn-next').textContent = '➡️ Next';
              document.getElementById('btn-next').className = 'btn btn-primary';
              if (current - 1 === 1) {
                document.getElementById('btn-prev').disabled = true;
              }
            }
          " disabled>⬅️ Previous</button>
          <button id="btn-next" class="btn btn-primary" onclick="
            const current = parseInt(document.getElementById('current-step').textContent);
            if (current < 4) {
              document.getElementById('step-' + current).style.display = 'none';
              document.getElementById('step-' + (current + 1)).style.display = 'block';
              document.getElementById('current-step').textContent = current + 1;
              const progress = (current / 3) * 100;
              document.getElementById('progress-bar').style.width = progress + '%';
              document.getElementById('progress-percent').textContent = Math.round(progress);
              document.getElementById('btn-prev').disabled = false;
              if (current + 1 === 4) {
                this.textContent = '✅ Finish';
                this.className = 'btn btn-success';
              }
            } else {
              alert('🎉 Tutorial completed! Happy coding!');
            }
          ">➡️ Next</button>
        </div>
      </div>
    </div>
  \`
}`,...(a=(i=t.parameters)==null?void 0:i.docs)==null?void 0:a.source}}};const l=["Introduction","InteractiveWizard"];export{t as InteractiveWizard,e as Introduction,l as __namedExportsOrder,d as default};
