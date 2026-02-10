export default {
  title: 'MCP Setup Guide/Quick Start',
  parameters: {
    previewTabs: {
      canvas: { hidden: true },
    },
    viewMode: 'docs',
    layout: 'fullscreen',
  },
  tags: ['!autodocs'],
};

export const QuickStart = {
  render: () => `
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/themes/prism-tomorrow.min.css">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/prism.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-json.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-bash.min.js"></script>
    
    <style>
      .mcp-setup,
      .mcp-setup * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }

      .mcp-setup {
        font-family: 'Public Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        background: linear-gradient(to bottom, #f8f9fa 0%, #e9ecef 100%);
        min-height: 100vh;
        padding: 40px 20px;
      }
      
      .container {
        max-width: 1200px;
        margin: 0 auto;
      }
      
      /* Hero */
      .hero {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        border-radius: 24px;
        padding: 60px 40px;
        text-align: center;
        color: white;
        box-shadow: 0 20px 60px rgba(0,0,0,0.15);
        margin-bottom: 40px;
        position: relative;
        overflow: hidden;
      }
      
      .hero::before {
        content: '';
        position: absolute;
        inset: 0;
        background-image: 
          radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 0%, transparent 50%),
          radial-gradient(circle at 80% 80%, rgba(255,255,255,0.1) 0%, transparent 50%);
        pointer-events: none;
      }
      
      .hero-content {
        position: relative;
        z-index: 1;
      }
      
      .hero h1 {
        font-size: 3rem;
        font-weight: 800;
        margin-bottom: 16px;
        text-shadow: 0 2px 10px rgba(0,0,0,0.1);
      }
      
      .hero p {
        font-size: 1.25rem;
        opacity: 0.95;
        max-width: 700px;
        margin: 0 auto;
        line-height: 1.6;
      }
      
      .badge {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        padding: 8px 16px;
        background: rgba(255,255,255,0.2);
        backdrop-filter: blur(10px);
        border-radius: 50px;
        font-size: 0.875rem;
        font-weight: 600;
        margin-bottom: 20px;
        border: 1px solid rgba(255,255,255,0.3);
      }
      
      /* Quick Stats */
      .quick-stats {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 20px;
        margin-bottom: 40px;
      }
      
      .stat-card {
        background: white;
        border-radius: 16px;
        padding: 24px;
        text-align: center;
        box-shadow: 0 2px 8px rgba(0,0,0,0.05);
        border: 1px solid #e9ecef;
        transition: all 0.3s ease;
      }
      
      .stat-card:hover {
        transform: translateY(-4px);
        box-shadow: 0 8px 20px rgba(0,0,0,0.1);
      }
      
      .stat-number {
        font-size: 2.5rem;
        font-weight: 800;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        margin-bottom: 8px;
      }
      
      .stat-label {
        font-size: 0.875rem;
        color: #6c757d;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.5px;
      }
      
      /* Steps */
      .steps {
        background: white;
        border-radius: 16px;
        padding: 40px;
        box-shadow: 0 2px 8px rgba(0,0,0,0.05);
        margin-bottom: 40px;
      }
      
      .step {
        display: grid;
        grid-template-columns: 60px 1fr;
        gap: 24px;
        margin-bottom: 40px;
        position: relative;
      }
      
      .step:not(:last-child)::after {
        content: '';
        position: absolute;
        left: 29px;
        top: 60px;
        bottom: -40px;
        width: 2px;
        background: linear-gradient(to bottom, #667eea, transparent);
        opacity: 0.3;
      }
      
      .step-number {
        width: 60px;
        height: 60px;
        border-radius: 16px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.5rem;
        font-weight: 800;
        box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
        flex-shrink: 0;
      }
      
      .step-content h3 {
        font-size: 1.5rem;
        margin-bottom: 12px;
        color: #212529;
      }
      
      .step-content p {
        color: #6c757d;
        line-height: 1.6;
        margin-bottom: 16px;
      }
      
      /* Code Block */
      .code-block {
        position: relative;
        margin: 16px 0;
        border-radius: 12px;
        overflow: hidden;
        background: #2d2d2d;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      }
      
      .code-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 12px 16px;
        background: #1e1e1e;
        border-bottom: 1px solid rgba(255,255,255,0.1);
      }
      
      .code-title {
        font-size: 0.875rem;
        color: #a0a0a0;
        font-weight: 600;
      }
      
      .copy-btn {
        padding: 6px 12px;
        background: rgba(102, 126, 234, 0.2);
        border: 1px solid rgba(102, 126, 234, 0.4);
        border-radius: 6px;
        color: #667eea;
        font-size: 0.8rem;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.2s;
        display: flex;
        align-items: center;
        gap: 6px;
      }
      
      .copy-btn:hover {
        background: rgba(102, 126, 234, 0.3);
        border-color: #667eea;
      }
      
      .copy-btn.copied {
        background: rgba(40, 199, 111, 0.2);
        border-color: rgba(40, 199, 111, 0.4);
        color: #28c76f;
      }
      
      pre {
        margin: 0 !important;
        padding: 20px !important;
        overflow-x: auto;
        background: #2d2d2d !important;
      }
      
      pre code {
        font-family: 'Courier New', Courier, monospace;
        font-size: 0.9rem;
        line-height: 1.6;
      }
      
      /* Alert */
      .alert {
        padding: 16px 20px;
        border-radius: 12px;
        margin: 16px 0;
        display: flex;
        align-items: flex-start;
        gap: 12px;
        border-left: 4px solid;
      }
      
      .alert-info {
        background: #e7f3ff;
        border-left-color: #0d6efd;
        color: #084298;
      }
      
      .alert-warning {
        background: #fff3cd;
        border-left-color: #ffc107;
        color: #664d03;
      }
      
      .alert-success {
        background: #d1e7dd;
        border-left-color: #28c76f;
        color: #0f5132;
      }
      
      .alert-icon {
        font-size: 24px;
        flex-shrink: 0;
      }
      
      .alert-content {
        flex: 1;
      }
      
      .alert strong {
        display: block;
        margin-bottom: 4px;
      }
      
      /* Accordion */
      .accordion {
        background: white;
        border-radius: 16px;
        overflow: hidden;
        box-shadow: 0 2px 8px rgba(0,0,0,0.05);
        margin-bottom: 40px;
      }
      
      .accordion-item {
        border-bottom: 1px solid #e9ecef;
      }
      
      .accordion-item:last-child {
        border-bottom: none;
      }
      
      .accordion-header {
        padding: 20px 24px;
        background: white;
        cursor: pointer;
        display: flex;
        justify-content: space-between;
        align-items: center;
        transition: background 0.2s;
        user-select: none;
      }
      
      .accordion-header:hover {
        background: #f8f9fa;
      }
      
      .accordion-header h4 {
        font-size: 1.125rem;
        color: #212529;
        margin: 0;
        display: flex;
        align-items: center;
        gap: 12px;
      }
      
      .accordion-icon {
        font-size: 24px;
        color: #667eea;
        transition: transform 0.3s;
      }
      
      .accordion-item.active .accordion-icon {
        transform: rotate(180deg);
      }
      
      .accordion-body {
        max-height: 0;
        overflow: hidden;
        transition: max-height 0.3s ease;
      }
      
      .accordion-item.active .accordion-body {
        max-height: 2000px;
      }
      
      .accordion-content {
        padding: 0 24px 24px;
        color: #6c757d;
        line-height: 1.6;
      }
      
      /* CTA */
      .cta {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        border-radius: 16px;
        padding: 40px;
        text-align: center;
        color: white;
        box-shadow: 0 8px 24px rgba(102, 126, 234, 0.3);
      }
      
      .cta h2 {
        font-size: 2rem;
        margin-bottom: 16px;
      }
      
      .cta p {
        font-size: 1.125rem;
        opacity: 0.9;
        margin-bottom: 24px;
      }
      
      .btn-primary {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        padding: 14px 32px;
        background: white;
        color: #667eea;
        border: none;
        border-radius: 12px;
        font-size: 1rem;
        font-weight: 700;
        cursor: pointer;
        text-decoration: none;
        transition: all 0.3s;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      }
      
      .btn-primary:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 20px rgba(0,0,0,0.2);
      }
    </style>
    
    <div class="mcp-setup">
      <div class="container">
        <!-- Hero -->
        <div class="hero">
          <div class="hero-content">
            <div class="badge">
              <span class="material-symbols-outlined">rocket_launch</span>
              Model Context Protocol
            </div>
            <h1>🔧 MCP Setup Guide</h1>
            <p>
              Configure o servidor MCP para acessar 123 componentes documentados do Design System Educacross
              diretamente no Claude Desktop, Cursor, VSCode, ou qualquer cliente MCP.
            </p>
          </div>
        </div>
        
        <!-- Quick Stats -->
        <div class="quick-stats">
          <div class="stat-card">
            <div class="stat-number">123</div>
            <div class="stat-label">Componentes</div>
          </div>
          <div class="stat-card">
            <div class="stat-number">967</div>
            <div class="stat-label">Stories</div>
          </div>
          <div class="stat-card">
            <div class="stat-number">7</div>
            <div class="stat-label">MCP Tools</div>
          </div>
          <div class="stat-card">
            <div class="stat-number">&lt;10ms</div>
            <div class="stat-label">Response Time</div>
          </div>
        </div>
        
        <!-- Steps -->
        <div class="steps">
          <div class="step">
            <div class="step-number">1</div>
            <div class="step-content">
              <h3>Instalar Dependências</h3>
              <p>Certifique-se que o projeto está instalado e o servidor MCP está pronto.</p>
              
              <div class="code-block">
                <div class="code-header">
                  <span class="code-title">Terminal</span>
                  <button class="copy-btn" onclick="copyCode(this, 'code-1')">
                    <span class="material-symbols-outlined" style="font-size: 16px">content_copy</span>
                    Copiar
                  </button>
                </div>
                <pre><code id="code-1" class="language-bash"># Clone o repositório (se ainda não fez)
git clone https://github.com/fabioeducacross/DesignSystem-Vuexy.git
cd DesignSystem-Vuexy

# Instalar dependências do projeto principal
npm install

# Instalar dependências do MCP Server
cd design-system-mcp
npm install

# Build do servidor MCP
npm run build

# Testar servidor (opcional)
npm test</code></pre>
              </div>
              
              <div class="alert alert-success">
                <span class="material-symbols-outlined alert-icon">check_circle</span>
                <div class="alert-content">
                  <strong>Validação</strong>
                  Se todos os comandos rodarem sem erros, você está pronto para o próximo passo!
                </div>
              </div>
            </div>
          </div>
          
          <div class="step">
            <div class="step-number">2</div>
            <div class="step-content">
              <h3>Configurar Claude Desktop</h3>
              <p>Adicione o servidor MCP ao arquivo de configuração do Claude Desktop.</p>
              
              <div class="alert alert-info">
                <span class="material-symbols-outlined alert-icon">info</span>
                <div class="alert-content">
                  <strong>Localização do arquivo</strong>
                  <br>Windows: <code>%APPDATA%\\Claude\\claude_desktop_config.json</code>
                  <br>Mac: <code>~/Library/Application Support/Claude/claude_desktop_config.json</code>
                </div>
              </div>
              
              <div class="code-block">
                <div class="code-header">
                  <span class="code-title">claude_desktop_config.json</span>
                  <button class="copy-btn" onclick="copyCode(this, 'code-2')">
                    <span class="material-symbols-outlined" style="font-size: 16px">content_copy</span>
                    Copiar
                  </button>
                </div>
                <pre><code id="code-2" class="language-json">{
  "mcpServers": {
    "educacross-design-system": {
      "command": "node",
      "args": [
        "C:\\\\Users\\\\SEU_USUARIO\\\\Documents\\\\Educacross\\\\DesignSystem-Vuexy\\\\design-system-mcp\\\\dist\\\\index.js"
      ],
      "env": {
        "NODE_ENV": "production"
      }
    }
  }
}</code></pre>
              </div>
              
              <div class="alert alert-warning">
                <span class="material-symbols-outlined alert-icon">warning</span>
                <div class="alert-content">
                  <strong>⚠️ Importante:</strong>
                  Substitua <code>SEU_USUARIO</code> pelo seu nome de usuário do Windows!
                  Use barras duplas (<code>\\\\</code>) no caminho para Windows.
                </div>
              </div>
            </div>
          </div>
          
          <div class="step">
            <div class="step-number">3</div>
            <div class="step-content">
              <h3>Reiniciar & Testar</h3>
              <p>Reinicie o Claude Desktop e teste as ferramentas MCP.</p>
              
              <div class="code-block">
                <div class="code-header">
                  <span class="code-title">Teste no Claude Desktop</span>
                  <button class="copy-btn" onclick="copyCode(this, 'code-3')">
                    <span class="material-symbols-outlined" style="font-size: 16px">content_copy</span>
                    Copiar
                  </button>
                </div>
                <pre><code id="code-3" class="language-bash"># 1. Liste todos os componentes
Liste todos os componentes do Design System Educacross

# 2. Busque um componente específico
Me mostre detalhes do componente Button

# 3. Busca textual
Busque componentes relacionados a "forms input validation"

# 4. Estatísticas
Mostre as estatísticas do Design System</code></pre>
              </div>
              
              <div class="alert alert-success">
                <span class="material-symbols-outlined alert-icon">celebration</span>
                <div class="alert-content">
                  <strong>🎉 Sucesso!</strong>
                  Se você ver respostas com dados dos componentes, o MCP está funcionando!
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Troubleshooting -->
        <div class="accordion">
          <div class="accordion-item">
            <div class="accordion-header" onclick="toggleAccordion(this)">
              <h4>
                <span class="material-symbols-outlined">help</span>
                Troubleshooting
              </h4>
              <span class="material-symbols-outlined accordion-icon">expand_more</span>
            </div>
            <div class="accordion-body">
              <div class="accordion-content">
                <h5>❌ Erro: "Cannot find module"</h5>
                <p><strong>Solução:</strong> Verifique se o caminho no <code>claude_desktop_config.json</code> está correto e use barras duplas no Windows.</p>
                
                <h5>❌ Servidor não aparece no Claude</h5>
                <p><strong>Solução:</strong> Reinicie completamente o Claude Desktop. Se persistir, verifique os logs em <code>%APPDATA%\\Claude\\logs</code>.</p>
                
                <h5>❌ Erro: "SyntaxError" ao executar</h5>
                <p><strong>Solução:</strong> Execute <code>npm run build</code> dentro da pasta <code>design-system-mcp</code> para compilar o TypeScript.</p>
                
                <h5>❌ Componentes não carregam</h5>
                <p><strong>Solução:</strong> Certifique-se que o Storybook esteja buildado com <code>npm run build-storybook</code> na raiz do projeto.</p>
              </div>
            </div>
          </div>
          
          <div class="accordion-item">
            <div class="accordion-header" onclick="toggleAccordion(this)">
              <h4>
                <span class="material-symbols-outlined">terminal</span>
                Ferramentas MCP Disponíveis
              </h4>
              <span class="material-symbols-outlined accordion-icon">expand_more</span>
            </div>
            <div class="accordion-body">
              <div class="accordion-content">
                <h5>📋 listComponents</h5>
                <p>Lista componentes com paginação e filtros (categoria, prioridade, tags).</p>
                
                <h5>🔍 getComponent</h5>
                <p>Obtém detalhes completos de um componente (props, events, slots, stories).</p>
                
                <h5>🔎 searchComponents</h5>
                <p>Busca textual com scoring TF-IDF para encontrar componentes relevantes.</p>
                
                <h5>📊 getStats</h5>
                <p>Estatísticas agregadas do Design System (componentes, stories, categorias).</p>
                
                <h5>📁 getCategories</h5>
                <p>Lista todas as categorias disponíveis com contagem de componentes.</p>
                
                <h5>🏷️ getTags</h5>
                <p>Lista todas as tags usadas no Design System.</p>
                
                <h5>🎯 getByPriority</h5>
                <p>Filtra componentes por nível de prioridade (P0, P1, P2).</p>
              </div>
            </div>
          </div>
          
          <div class="accordion-item">
            <div class="accordion-header" onclick="toggleAccordion(this)">
              <h4>
                <span class="material-symbols-outlined">integration_instructions</span>
                Integração com Outros Clientes
              </h4>
              <span class="material-symbols-outlined accordion-icon">expand_more</span>
            </div>
            <div class="accordion-body">
              <div class="accordion-content">
                <h5>VSCode com Copilot</h5>
                <p>Adicione ao <code>settings.json</code> do VSCode:</p>
                <div class="code-block">
                  <pre><code class="language-json">{
  "github.copilot.chat.codeGeneration.useInstructionFiles": true,
  "mcp.servers": {
    "educacross-design-system": {
      "command": "node",
      "args": ["path/to/design-system-mcp/dist/index.js"]
    }
  }
}</code></pre>
                </div>
                
                <h5>Cursor</h5>
                <p>Configure em Settings → Features → MCP Servers → Add Server</p>
                
                <h5>CLI (Terminal)</h5>
                <p>Execute diretamente via Node.js para testes:</p>
                <div class="code-block">
                  <pre><code class="language-bash">node design-system-mcp/dist/index.js</code></pre>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- CTA -->
        <div class="cta">
          <h2>✅ Tudo Pronto!</h2>
          <p>
            Agora você pode explorar todos os 123 componentes do Design System Educacross
            diretamente no Claude Desktop ou qualquer cliente MCP compatível.
          </p>
          <a href="?path=/docs/getting-started--introduction" class="btn-primary">
            <span class="material-symbols-outlined">arrow_back</span>
            Voltar ao Getting Started
          </a>
        </div>
      </div>
    </div>
    
    <script>
      // Copy code functionality
      function copyCode(button, codeId) {
        const code = document.getElementById(codeId).textContent;
        navigator.clipboard.writeText(code).then(() => {
          button.classList.add('copied');
          const originalText = button.innerHTML;
          button.innerHTML = '<span class="material-symbols-outlined" style="font-size: 16px">check</span> Copiado!';
          
          setTimeout(() => {
            button.classList.remove('copied');
            button.innerHTML = originalText;
          }, 2000);
        });
      }
      
      // Accordion functionality
      function toggleAccordion(header) {
        const item = header.parentElement;
        const isActive = item.classList.contains('active');
        
        // Close all items
        document.querySelectorAll('.accordion-item').forEach(i => {
          i.classList.remove('active');
        });
        
        // Open clicked item if it wasn't active
        if (!isActive) {
          item.classList.add('active');
        }
      }
      
      // Initialize Prism syntax highlighting
      if (window.Prism) {
        Prism.highlightAll();
      }
    </script>
  `,
};
