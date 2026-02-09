// Template de Documentação - Educacross Design System
// Template reutilizável para criar páginas de documentação com design consistente
// baseado no estilo da página de introdução (Getting Started).
//
// CSS global para esconder wrappers do Storybook está em:
// .storybook/preview-head.html (usa seletor :has(.doc-page) com fallback JS)

export const createDocPage = ({
  title = 'Component Title',
  subtitle = 'Component description and usage guidelines',
  badge = null,
  badgeIcon = 'widgets',
  category = 'Components',
  content = '',
  features = [],
  colors = {
    primary: '#667eea',
    secondary: '#764ba2'
  },
  showStats = false,
  stats = {},
  relatedComponents = []
}) => {
  const hasBadge = badge !== null;
  const hasFeatures = features.length > 0;
  const hasRelated = relatedComponents.length > 0;

  return `
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
    
    <style>
      /* Estilos específicos do template (não relacionados a esconder Storybook) */
      .doc-page {
        font-family: 'Public Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        background: #f8f9fa;
        min-height: 100vh;
        padding: 0;
        margin: 0;
      }
      
      .doc-hero {
        background: linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%);
        padding: 60px 0 80px;
        position: relative;
        overflow: hidden;
      }
      
      .doc-hero::before {
        content: '';
        position: absolute;
        inset: 0;
        opacity: 0.08;
        background-image: 
          radial-gradient(circle at 20% 50%, rgba(255,255,255,0.15) 0%, transparent 50%),
          radial-gradient(circle at 80% 80%, rgba(255,255,255,0.15) 0%, transparent 50%);
      }
      
      .doc-hero-content {
        position: relative;
        z-index: 2;
      }
      
      .doc-badge {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        padding: 8px 16px;
        background: rgba(255,255,255,0.15);
        backdrop-filter: blur(10px);
        border-radius: 50px;
        color: white;
        font-size: 0.875rem;
        font-weight: 500;
        border: 1px solid rgba(255,255,255,0.2);
        margin-bottom: 20px;
      }
      
      .doc-badge .material-symbols-outlined {
        font-size: 18px;
      }
      
      .doc-title {
        font-size: clamp(2rem, 4vw, 3rem);
        font-weight: 700;
        color: white;
        line-height: 1.2;
        margin: 0 0 16px 0;
        text-shadow: 0 2px 20px rgba(0,0,0,0.1);
      }
      
      .doc-subtitle {
        font-size: 1.125rem;
        color: rgba(255,255,255,0.9);
        line-height: 1.6;
        max-width: 700px;
        margin: 0 auto;
      }
      
      .doc-stats-card {
        background: white;
        border-radius: 20px;
        padding: 32px;
        margin-top: -40px;
        position: relative;
        z-index: 10;
        box-shadow: 0 10px 40px rgba(0,0,0,0.08);
      }
      
      .doc-stat-item {
        text-align: center;
        padding: 12px;
      }
      
      .doc-stat-value {
        font-size: 2rem;
        font-weight: 700;
        background: linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        line-height: 1;
        margin-bottom: 8px;
      }
      
      .doc-stat-label {
        color: #6c757d;
        font-size: 0.85rem;
        font-weight: 500;
      }
      
      .doc-content {
        padding: 60px 0;
      }
      
      .doc-section {
        background: white;
        border-radius: 16px;
        padding: 40px;
        margin-bottom: 24px;
        box-shadow: 0 2px 8px rgba(0,0,0,0.04);
      }
      
      .doc-section-title {
        font-size: 1.5rem;
        font-weight: 700;
        color: #2d3748;
        margin-bottom: 20px;
        display: flex;
        align-items: center;
        gap: 12px;
      }
      
      .doc-section-title .material-symbols-outlined {
        color: ${colors.primary};
        font-size: 28px;
      }
      
      .doc-feature-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
        gap: 24px;
        margin-top: 32px;
      }
      
      .doc-feature-card {
        background: white;
        border: 1px solid #e9ecef;
        border-radius: 12px;
        padding: 24px;
        transition: all 0.3s ease;
      }
      
      .doc-feature-card:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 24px rgba(0,0,0,0.08);
        border-color: ${colors.primary};
      }
      
      .doc-feature-icon {
        width: 48px;
        height: 48px;
        border-radius: 12px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: linear-gradient(135deg, ${colors.primary}15 0%, ${colors.secondary}15 100%);
        color: ${colors.primary};
        margin-bottom: 16px;
      }
      
      .doc-feature-icon .material-symbols-outlined {
        font-size: 28px;
      }
      
      .doc-feature-title {
        font-size: 1.125rem;
        font-weight: 600;
        color: #2d3748;
        margin-bottom: 8px;
      }
      
      .doc-feature-description {
        color: #6c757d;
        font-size: 0.9rem;
        line-height: 1.5;
      }
      
      .doc-related-card {
        background: white;
        border: 1px solid #e9ecef;
        border-radius: 12px;
        padding: 20px;
        text-decoration: none;
        display: block;
        transition: all 0.3s ease;
      }
      
      .doc-related-card:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 24px rgba(0,0,0,0.08);
        border-color: ${colors.primary};
      }
      
      .doc-related-title {
        font-size: 1rem;
        font-weight: 600;
        color: #2d3748;
        margin-bottom: 4px;
        display: flex;
        align-items: center;
        gap: 8px;
      }
      
      .doc-related-title .material-symbols-outlined {
        color: ${colors.primary};
        font-size: 20px;
      }
      
      .doc-related-description {
        color: #6c757d;
        font-size: 0.875rem;
      }
      
      .doc-divider {
        height: 1px;
        background: linear-gradient(90deg, transparent, #e9ecef 50%, transparent);
        margin: 40px 0;
      }
      
      .code-tabs {
        margin-top: 16px;
      }
      
      .code-tabs-header {
        display: flex;
        gap: 4px;
        border-bottom: 2px solid #e9ecef;
        margin-bottom: 0;
      }
      
      .code-tab-btn {
        padding: 10px 20px;
        background: transparent;
        border: none;
        border-bottom: 2px solid transparent;
        color: #6c757d;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.2s ease;
        font-size: 0.875rem;
        margin-bottom: -2px;
      }
      
      .code-tab-btn:hover {
        color: #2d3748;
        background: #f8f9fa;
      }
      
      .code-tab-btn.active {
        color: ${colors.primary};
        border-bottom-color: ${colors.primary};
        font-weight: 600;
      }
      
      .code-tab-content {
        display: none;
      }
      
      .code-tab-content.active {
        display: block;
      }
    </style>

    <div class="doc-page">
      <!-- Hero Section -->
      <section class="doc-hero">
        <div class="doc-hero-content">
          <div class="container">
            <div class="row justify-content-center">
              <div class="col-lg-10 text-center">
                ${hasBadge ? `
                <div class="doc-badge">
                  <span class="material-symbols-outlined">${badgeIcon}</span>
                  <span>${badge}</span>
                </div>
                ` : ''}
                
                <h1 class="doc-title">${title}</h1>
                <p class="doc-subtitle">${subtitle}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      ${showStats ? `
      <!-- Stats Section -->
      <div class="container">
        <div class="doc-stats-card">
          <div class="row g-0">
            ${Object.entries(stats).map(([label, value]) => `
            <div class="col-6 col-md-${12 / Math.min(Object.keys(stats).length, 4)}">
              <div class="doc-stat-item">
                <div class="doc-stat-value">${value}</div>
                <div class="doc-stat-label">${label}</div>
              </div>
            </div>
            `).join('')}
          </div>
        </div>
      </div>
      ` : ''}

      <!-- Main Content -->
      <div class="container doc-content">
        ${content}

        ${hasFeatures ? `
        <div class="doc-divider"></div>
        <div class="doc-section">
          <h2 class="doc-section-title">
            <span class="material-symbols-outlined">auto_awesome</span>
            <span>Recursos & Funcionalidades</span>
          </h2>
          <div class="doc-feature-grid">
            ${features.map(feature => `
            <div class="doc-feature-card">
              <div class="doc-feature-icon">
                <span class="material-symbols-outlined">${feature.icon || 'check_circle'}</span>
              </div>
              <h4 class="doc-feature-title">${feature.title}</h4>
              <p class="doc-feature-description">${feature.description}</p>
            </div>
            `).join('')}
          </div>
        </div>
        ` : ''}

        ${hasRelated ? `
        <div class="doc-divider"></div>
        <div class="doc-section">
          <h2 class="doc-section-title">
            <span class="material-symbols-outlined">link</span>
            <span>Componentes Relacionados</span>
          </h2>
          <div class="doc-feature-grid">
            ${relatedComponents.map(component => `
            <a href="${component.path}" class="doc-related-card">
              <div class="doc-related-title">
                <span class="material-symbols-outlined">${component.icon || 'widgets'}</span>
                <span>${component.title}</span>
              </div>
              <p class="doc-related-description">${component.description}</p>
            </a>
            `).join('')}
          </div>
        </div>
        ` : ''}
      </div>
    </div>
  `;
};

// Cria um card de exemplo/demonstração dentro do conteúdo
export const createExampleCard = ({
  title = 'Example',
  description = '',
  code = '',
  preview = '',
  showTitle = true,
  wrapPreview = true,
  codes = null
}) => {
  const uniqueId = `tab-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  
  return `
  <div class="doc-section">
    ${showTitle ? `
    <h3 class="doc-section-title">
      <span class="material-symbols-outlined">code</span>
      <span>${title}</span>
    </h3>
    ` : ''}
    ${description ? `<p style="color: #6c757d; margin-bottom: 24px;">${description}</p>` : ''}
    ${preview ? (wrapPreview ? `
    <div style="padding: 24px; background: #f8f9fa; border-radius: 12px; margin-bottom: 24px;">
      ${preview}
    </div>
    ` : `
    <div style="margin-bottom: 24px; display: flex; justify-content: center; align-items: center; min-height: 400px; background: #f8f9fa; border-radius: 12px; padding: 2rem;">
      ${preview}
    </div>
    `) : ''}
    ${codes ? createCodeTabs(codes, uniqueId) : (code ? `
    <pre style="background: #2d3748; color: #fff; padding: 20px; border-radius: 12px; overflow-x: auto; margin: 0;"><code>${escapeHtml(code)}</code></pre>
    ` : '')}
  </div>
`;
};

// Cria tabs de código para múltiplos frameworks
export const createCodeTabs = (codes, groupId) => {
  const tabs = [
    { key: 'html', label: 'HTML/Vanilla', code: codes.html },
    { key: 'vue2', label: 'Vue 2', code: codes.vue2 },
    { key: 'vue3', label: 'Vue 3', code: codes.vue3 },
    { key: 'react', label: 'React', code: codes.react }
  ].filter(tab => tab.code);

  if (tabs.length === 0) return '';

  return `
    <div class="code-tabs">
      <div class="code-tabs-header">
        ${tabs.map((tab, index) => `
          <button 
            class="code-tab-btn ${index === 0 ? 'active' : ''}" 
            data-tab-group="${groupId}"
            data-tab="${tab.key}"
            onclick="(function(gid, tk) {
              var buttons = document.querySelectorAll('[data-tab-group=&quot;' + gid + '&quot;]');
              var contents = document.querySelectorAll('[data-content-group=&quot;' + gid + '&quot;]');
              buttons.forEach(function(btn) { btn.classList.remove('active'); });
              contents.forEach(function(content) { content.classList.remove('active'); });
              var activeBtn = document.querySelector('[data-tab-group=&quot;' + gid + '&quot;][data-tab=&quot;' + tk + '&quot;]');
              var activeContent = document.querySelector('[data-content-group=&quot;' + gid + '&quot;][data-tab=&quot;' + tk + '&quot;]');
              if (activeBtn) activeBtn.classList.add('active');
              if (activeContent) activeContent.classList.add('active');
            })('${groupId}', '${tab.key}')"
          >
            ${tab.label}
          </button>
        `).join('')}
      </div>
      ${tabs.map((tab, index) => `
        <div 
          class="code-tab-content ${index === 0 ? 'active' : ''}" 
          data-content-group="${groupId}"
          data-tab="${tab.key}"
        >
          <pre style="background: #2d3748; color: #fff; padding: 20px; border-radius: 0 0 12px 12px; overflow-x: auto; margin: 0;"><code>${escapeHtml(tab.code)}</code></pre>
        </div>
      `).join('')}
    </div>
  `;
};

// Cria uma seção de propriedades/props
export const createPropsTable = (props = []) => `
  <div class="doc-section">
    <h3 class="doc-section-title">
      <span class="material-symbols-outlined">settings</span>
      <span>Propriedades</span>
    </h3>
    <div style="overflow-x: auto;">
      <table style="width: 100%; border-collapse: collapse;">
        <thead>
          <tr style="border-bottom: 2px solid #e9ecef;">
            <th style="padding: 12px; text-align: left; font-weight: 600; color: #2d3748;">Propriedade</th>
            <th style="padding: 12px; text-align: left; font-weight: 600; color: #2d3748;">Tipo</th>
            <th style="padding: 12px; text-align: left; font-weight: 600; color: #2d3748;">Default</th>
            <th style="padding: 12px; text-align: left; font-weight: 600; color: #2d3748;">Descrição</th>
          </tr>
        </thead>
        <tbody>
          ${props.map(prop => `
          <tr style="border-bottom: 1px solid #e9ecef;">
            <td style="padding: 12px; font-family: 'Courier New', monospace; color: #667eea; font-weight: 500;">${prop.name}</td>
            <td style="padding: 12px; font-family: 'Courier New', monospace; color: #6c757d; font-size: 0.875rem;">${prop.type}</td>
            <td style="padding: 12px; font-family: 'Courier New', monospace; color: #6c757d; font-size: 0.875rem;">${prop.default || '-'}</td>
            <td style="padding: 12px; color: #6c757d;">${prop.description}</td>
          </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
  </div>
`;

// Cria uma seção de uso/instalação
export const createUsageSection = ({
  title = 'Como Usar',
  icon = 'integration_instructions',
  steps = []
}) => `
  <div class="doc-section">
    <h3 class="doc-section-title">
      <span class="material-symbols-outlined">${icon}</span>
      <span>${title}</span>
    </h3>
    <ol style="padding-left: 24px; color: #6c757d; line-height: 1.8;">
      ${steps.map(step => `<li style="margin-bottom: 12px;">${step}</li>`).join('')}
    </ol>
  </div>
`;

// Utilitário para escapar HTML
const escapeHtml = (text) => {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return text.replace(/[&<>"']/g, m => map[m]);
};
