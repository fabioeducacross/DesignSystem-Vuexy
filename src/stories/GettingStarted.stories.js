export default {
  title: '📚 Getting Started',
  parameters: {
    previewTabs: {
      canvas: { hidden: true },
    },
    viewMode: 'docs',
    layout: 'fullscreen',
  },
};

export const Introduction = {
  render: () => `
    <div class="bg-body" style="font-family: 'Public Sans', sans-serif;">
      
      <!-- HERO SECTION -->
      <div style="background: linear-gradient(135deg, #696cff 0%, #5e5ce6 100%); position: relative; overflow: hidden;">
        <div style="position: absolute; inset: 0; opacity: 0.1; background: repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(255,255,255,0.1) 35px, rgba(255,255,255,0.1) 70px);"></div>
        
        <div class="container py-5">
          <div class="row align-items-center justify-content-center text-center">
            <div class="col-lg-8">
              <p class="mb-3" style="color: rgba(255,255,255,0.7); font-size: 0.9rem; text-transform: uppercase; letter-spacing: 2px;">
                Educacross Design System
              </p>
              
              <h1 class="display-4 fw-bold mb-3" style="color: white; line-height: 1.2;">
                Design System & AI Context<br>Universal Server
              </h1>
              
              <p class="lead mb-4" style="color: rgba(255,255,255,0.85); font-size: 1.1rem; max-width: 600px; margin: 0 auto;">
                Uma biblioteca dual de componentes baseada no tema Vuexy e customizada para o ecossistema Educacross V2, integrada via Model Context Protocol (MCP).
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- AI & HUMAN DUAL ARCHITECTURE -->
      <div class="container py-5">
        <div class="row g-5">
          
          <!-- Lado Humano: Categorias -->
          <div class="col-md-6">
            <h3 class="fw-bold mb-4" style="color: #5d596c;">🚀 Estrutura de Componentes</h3>
            <div class="d-flex flex-column gap-3">
              <div class="p-3 border rounded-3 bg-light">
                <h6 class="fw-bold text-primary mb-1">Educacross V2 (Produção)</h6>
                <p class="small text-muted mb-0">Componentes reais usados no Frontoffice. Localizados em <code>src/stories/educacross-components-v2/</code> na branch <strong>v1.2</strong>.</p>
              </div>
              <div class="p-3 border rounded-3 bg-light">
                <h6 class="fw-bold text-secondary mb-1">Vuexy Generic (Referência)</h6>
                <p class="small text-muted mb-0">Componentes originais do template (Atoms, Molecules, etc.). Usados apenas como base ou referência visual.</p>
              </div>
            </div>
          </div>

          <!-- Lado IA: Instruções MCP -->
          <div class="col-md-6" style="background: #f0f2ff; border-radius: 20px; padding: 2rem;">
            <h3 class="fw-bold mb-4" style="color: #696cff;">🤖 AI Context (MCP)</h3>
            <p class="small mb-3">Este Design System expõe um servidor <strong>Model Context Protocol</strong> para que IAs possam gerar código preciso.</p>
            
            <div class="bg-white p-3 rounded-3 shadow-sm mb-3">
              <code style="font-size: 0.85rem; color: #d63384;">
                # Endpoint MCP<br>
                design-system://production/components<br>
                design-system://reference/vuexy-core
              </code>
            </div>
            
            <ul class="small text-muted ps-3">
              <li><strong>Contexto:</strong> A IA sempre deve priorizar a branch <code>v1.2</code> para componentes Educacross.</li>
              <li><strong>Tools:</strong> Use <code>get_component_context</code> para extrair metadados.</li>
              <li><strong>Regra:</strong> Não misturar lógica Vuexy Generic com Educacross V2.</li>
            </ul>
          </div>
        </div>
      </div>

      <!-- QUICK START -->
      <div style="background: #f8f9fa;" class="py-5">
        <div class="container text-center">
          <h2 class="fw-bold mb-5" style="color: #5d596c;">Como Utilizar</h2>
          <div class="row g-4 text-start">
            <div class="col-md-4">
              <h5 class="fw-bold"><i class="ti ti-user me-2"></i>Para Humanos</h5>
              <p class="text-muted small">Navegue pelas pastas ao lado. Use a aba "Docs" para ver as variantes de cada componente e copiar os snippets de código.</p>
            </div>
            <div class="col-md-4">
              <h5 class="fw-bold text-primary"><i class="ti ti-robot me-2"></i>Para IAs</h5>
              <p class="text-muted small">Conecte seu agente ao servidor em <code>agent_helpers/mcp-server/</code>. Ele fornecerá os tokens do Figma e o código-fonte atualizado.</p>
            </div>
            <div class="col-md-4">
              <h5 class="fw-bold"><i class="ti ti-git-branch me-2"></i>Controle de Versão</h5>
              <p class="text-muted small"><strong>Main:</strong> Infraestrutura e Core.<br><strong>v1.2:</strong> Componentes estáveis de Produção.</p>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  `,
};