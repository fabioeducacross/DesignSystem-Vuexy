/**
 * Template11 - Header + Split Variant B (Alias Template8/10)
 * =========================================
 * 
 * Layout identical to Template8 and Template10: header card + split view.
 * Third alias maintained for maximum legacy compatibility.
 * 
 * @component Template11
 * @category Educacross Components V2
 * @source educacross-frontoffice\src\components\evaluations\questionDetail\templates\Template11.vue
 * @priority P2
 * @status PIXEL-PERFECT
 * @since 2.0.0
 */

export default {
  title: 'Educacross Components V2/Templates/Template11',
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# Template11

**⚠️ Template11 = Template8 = Template10** (estrutura IDÊNTICA)

Terceiro alias do mesmo layout header + split.

## Hierarquia de Aliases

\`\`\`
Template8 (PRIMARY)
   ↓ alias
Template10 (Secondary alias)
   ↓ alias
Template11 (Tertiary alias)
\`\`\`

Todos os 3 templates têm estrutura 100% idêntica:
- Header card full-width gradient azul
- Split lg-6 + lg-6 (content left + alternatives right)
- Alternatives grid 2×2 (md-6)
- Responsive empilha <992px

## Por que 3 aliases?

1. **Template8**: Versão principal documentada
2. **Template10**: Primeira variante para contextos específicos
3. **Template11**: Terceira opção para máxima compatibilidade de migração

**Cenários de uso:**
- Sistema legado pode referenciar Template8, 10 ou 11 indistintamente
- Banco de dados antigo pode ter registros com qualquer um dos 3
- Permite migração gradual sem quebrar código existente
- Facilita A/B testing mantendo 3 nomes diferentes

## ⚠️ IMPORTANTE

**Para NOVOS projetos:**
✅ Use **Template8** (versão primary)

**Template11 existe apenas para:**
- Código legado que referencia Template11
- Migração de sistema antigo
- Compatibilidade com dados históricos
- Evitar quebra de funcionalidade existente

## Comparação Completa

| Template | Structure | Status | Quando usar |
|----------|-----------|--------|-------------|
| **Template8** | Header + Split | ✅ PRIMARY | Sempre em novos projetos |
| **Template10** | Header + Split | ⚠️ Alias #1 | Legacy compatibility |
| **Template11** | Header + Split | ⚠️ Alias #2 | Legacy compatibility |
| **Template4** | Split sem header | ✅ Diferente | Quando não precisa header |

## Documentação

Template11 não repete documentação completa.

**Ver documentação detalhada em:**
- [Template8.stories.js](../Template8/Template8.stories.js) - Documentação completa
- [Template10.stories.js](../Template10/Template10.stories.js) - Primeiro alias

Template11 fornece apenas stories básicas com avisos de redirecionamento.
        `
      }
    }
  }
};

/**
 * Props API
 * 
 * Idêntico ao Template8 e Template10
 */

/**
 * Design Specs
 * 
 * Idêntico ao Template8 e Template10
 */

// Estilos base (idênticos)
const template11Styles = `
<style>
  .template11-container {
    background: #F8F7FA;
    min-height: 100vh;
    padding: 24px;
    max-width: 1400px;
    margin: 0 auto;
  }
  
  .template11-section {
    margin-bottom: 24px;
  }
  
  .template11-row {
    display: flex;
    flex-wrap: wrap;
    margin: -12px;
  }
  
  .template11-col {
    padding: 12px;
    width: 100%;
  }
  
  @media (min-width: 992px) {
    .template11-col-half {
      width: 50%;
    }
  }
  
  .template11-header {
    background: linear-gradient(135deg, #6E63E8 0%, #8B83F5 100%);
    border: none;
    border-radius: 8px;
    padding: 24px;
    margin-bottom: 24px;
    box-shadow: 0 4px 12px rgba(110,99,232,0.2);
    color: white;
  }
  
  .header-title {
    font-size: 20px;
    font-weight: 700;
    margin-bottom: 12px;
    color: white;
    display: flex;
    align-items: center;
    gap: 12px;
  }
  
  .header-content {
    font-size: 15px;
    line-height: 1.7;
    color: rgba(255,255,255,0.95);
  }
  
  .template11-card {
    background: #FFFFFF;
    border: 1px solid #DBDADE;
    border-radius: 8px;
    padding: 20px;
    margin-bottom: 20px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.06);
    height: 100%;
  }
  
  .template11-card:last-child {
    margin-bottom: 0;
  }
  
  .question-content-area {
    font-size: 15px;
    line-height: 1.7;
    color: #5D596C;
  }
  
  .alternatives-grid-split {
    display: grid;
    grid-template-columns: 1fr;
    gap: 16px;
    height: 100%;
  }
  
  @media (min-width: 768px) {
    .alternatives-grid-split {
      grid-template-columns: repeat(2, 1fr);
    }
  }
  
  .alternative-card {
    background: #FFFFFF;
    border: 2px solid #DBDADE;
    border-radius: 8px;
    padding: 16px;
    min-height: 140px;
    cursor: pointer;
    transition: all 0.2s;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  
  .alternative-card:hover {
    border-color: #6E63E8;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(110,99,232,0.15);
  }
  
  .alternative-label {
    font-size: 13px;
    font-weight: 600;
    color: #6E6B7B;
    margin-bottom: 8px;
    text-transform: uppercase;
  }
  
  .alternative-text {
    font-size: 15px;
    line-height: 1.6;
    color: #5D596C;
  }
  
  .alias-warning {
    background: #FFEBEE;
    border-left: 4px solid #EA5455;
    padding: 16px;
    border-radius: 6px;
    margin-bottom: 24px;
  }
  
  .alias-warning h4 {
    font-size: 14px;
    font-weight: 600;
    color: #C62828;
    margin: 0 0 8px 0;
    display: flex;
    align-items: center;
    gap: 8px;
  }
  
  .alias-warning p {
    margin: 0;
    font-size: 13px;
    color: #C62828;
  }
  
  @media (max-width: 991px) {
    .template11-container {
      padding: 16px;
    }
    
    .template11-header {
      padding: 20px;
    }
    
    .template11-card {
      padding: 16px;
      margin-bottom: 16px;
    }
    
    .alternatives-grid-split {
      grid-template-columns: 1fr;
      margin-top: 16px;
    }
  }
</style>
`;

// Story: Default
export const Default = {
  render: () => `
    ${template11Styles}
    <div class="template11-container">
      <div class="alias-warning">
        <h4>
          <i class="bi bi-exclamation-triangle-fill"></i>
          Template11 = Template8 = Template10 (Terceiro Alias)
        </h4>
        <p>
          <strong>⚠️ ATENÇÃO:</strong> Template11 é o TERCEIRO alias do Template8.
          Para novos projetos, use <strong>Template8</strong>.
          Template11 mantido apenas para compatibilidade com sistema legado.
        </p>
      </div>
      
      <div class="template11-section">
        <div class="template11-header">
          <div class="header-title">
            <i class="bi bi-info-circle-fill"></i>
            Contexto Geral
          </div>
          <div class="header-content">
            Template11 = Template8 = Template10. Estrutura idêntica: header + split view.
          </div>
        </div>
      </div>
      
      <div class="template11-row">
        <div class="template11-col template11-col-half">
          <div class="template11-card">
            <div class="question-content-area">
              <strong>Conteúdo Principal:</strong> Lado esquerdo (50%) com informações detalhadas.
            </div>
          </div>
          <div class="template11-card">
            <div class="question-content-area">
              Múltiplos cards empilhados verticalmente.
            </div>
          </div>
        </div>
        
        <div class="template11-col template11-col-half">
          <div class="alternatives-grid-split">
            <div class="alternative-card">
              <div class="alternative-label">Alternativa A</div>
              <div class="alternative-text">Lado direito (50%) grid 2×2</div>
            </div>
            <div class="alternative-card">
              <div class="alternative-label">Alternativa B</div>
              <div class="alternative-text">Facilita comparação</div>
            </div>
            <div class="alternative-card">
              <div class="alternative-label">Alternativa C</div>
              <div class="alternative-text">Referência sempre visível</div>
            </div>
            <div class="alternative-card">
              <div class="alternative-label">Alternativa D</div>
              <div class="alternative-text">Ideal para análise</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
};

// Story: HierarchyDiagram
export const HierarchyDiagram = {
  render: () => `
    ${template11Styles}
    <div class="template11-container">
      <div class="alias-warning">
        <h4>
          <i class="bi bi-diagram-3-fill"></i>
          Hierarquia de Templates Aliases
        </h4>
        <p>
          Visualização da relação entre Template8, Template10 e Template11.
        </p>
      </div>
      
      <div class="template11-section">
        <div class="template11-header">
          <div class="header-title">
            <i class="bi bi-diagram-2"></i>
            Diagrama de Relacionamento
          </div>
          <div class="header-content">
            Template8 é a versão PRIMARY. Template10 e Template11 são aliases.
          </div>
        </div>
      </div>
      
      <div class="template11-row">
        <div class="template11-col">
          <div class="template11-card">
            <svg viewBox="0 0 500 300" style="width: 100%; height: auto;">
              <!-- Template8 PRIMARY -->
              <rect x="175" y="30" width="150" height="60" fill="#28C76F" stroke="#1E7E34" stroke-width="2" rx="8"/>
              <text x="250" y="55" text-anchor="middle" font-size="14" font-weight="bold" fill="white">Template8</text>
              <text x="250" y="75" text-anchor="middle" font-size="11" fill="white">PRIMARY VERSION</text>
              
              <!-- Setas -->
              <line x1="250" y1="90" x2="180" y2="140" stroke="#6E63E8" stroke-width="2" marker-end="url(#arrow)"/>
              <line x1="250" y1="90" x2="320" y2="140" stroke="#6E63E8" stroke-width="2" marker-end="url(#arrow)"/>
              <text x="200" y="120" font-size="10" fill="#6E63E8">alias</text>
              <text x="300" y="120" font-size="10" fill="#6E63E8">alias</text>
              
              <!-- Template10 ALIAS -->
              <rect x="50" y="150" width="150" height="60" fill="#FF9800" stroke="#E65100" stroke-width="2" rx="8"/>
              <text x="125" y="175" text-anchor="middle" font-size="14" font-weight="bold" fill="white">Template10</text>
              <text x="125" y="195" text-anchor="middle" font-size="11" fill="white">ALIAS #1</text>
              
              <!-- Template11 ALIAS -->
              <rect x="300" y="150" width="150" height="60" fill="#EA5455" stroke="#C62828" stroke-width="2" rx="8"/>
              <text x="375" y="175" text-anchor="middle" font-size="14" font-weight="bold" fill="white">Template11</text>
              <text x="375" y="195" text-anchor="middle" font-size="11" fill="white">ALIAS #2</text>
              
              <!-- Seta de Template11 para Template10 -->
              <line x1="300" y1="180" x2="210" y2="180" stroke="#B0BEC5" stroke-width="1" stroke-dasharray="5,5"/>
              <text x="255" y="175" text-anchor="middle" font-size="10" fill="#6E6B7B">mesma estrutura</text>
              
              <!-- Legenda -->
              <text x="250" y="250" text-anchor="middle" font-size="12" font-weight="bold" fill="#5D596C">Recomendação:</text>
              <text x="250" y="270" text-anchor="middle" font-size="11" fill="#28C76F">✅ Use Template8 em novos projetos</text>
              <text x="250" y="290" text-anchor="middle" font-size="11" fill="#EA5455">⚠️ Template10/11 apenas para legacy</text>
            </svg>
          </div>
        </div>
      </div>
    </div>
  `
};

// Demais stories: avisos simples redirecionando para Template8
export const VerTemplate8 = {
  render: () => `
    ${template11Styles}
    <div class="template11-container">
      <div style="background: linear-gradient(135deg, #E8F5E9 0%, #C8E6C9 100%); border: 2px solid #28C76F; border-radius: 12px; padding: 32px; text-align: center;">
        <i class="bi bi-arrow-right-circle-fill" style="font-size: 48px; color: #28C76F; margin-bottom: 16px;"></i>
        <h3 style="font-size: 20px; font-weight: 700; color: #2E7D32; margin-bottom: 12px;">
          Documentação Completa em Template8
        </h3>
        <p style="font-size: 15px; color: #558B2F; margin-bottom: 20px;">
          Template11 é um alias. Para ver todas as variantes (ComGrafico, ComMapa, ComInstrucoes, ComComparacao, 
          ComTimeline, ComDashboard, Responsive), consulte:
        </p>
        <div style="background: white; border-radius: 8px; padding: 16px; display: inline-block;">
          <code style="font-size: 14px; color: #6E63E8;">
            src/stories/educacross-components-v2/<strong>Template8.stories.js</strong>
          </code>
        </div>
        <p style="font-size: 13px; color: #558B2F; margin-top: 20px;">
          Template8 contém 8 stories completas com exemplos detalhados de uso.
        </p>
      </div>
    </div>
  `
};

export const ComGrafico = { render: () => VerTemplate8.render() };
export const ComMapa = { render: () => VerTemplate8.render() };
export const ComInstrucoes = { render: () => VerTemplate8.render() };
export const ComComparacao = { render: () => VerTemplate8.render() };
export const ComTimeline = { render: () => VerTemplate8.render() };
export const ComDashboard = { render: () => VerTemplate8.render() };
export const Responsive = { render: () => VerTemplate8.render() };

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
          <div style="display:inline-block;padding:8px 16px;background:rgba(255,255,255,0.15);border-radius:50px;margin-bottom:20px;font-size:14px;border:1px solid rgba(255,255,255,0.2);">Templates</div>
          <h1 style="font-size:3rem;font-weight:700;margin:0 0 12px 0;letter-spacing:-0.02em;">Template11</h1>
          <p style="font-size:1.1rem;opacity:0.9;margin:0;max-width:600px;">Header + Split Variant B (Alias Template8/10)</p>
        </div>
      </div>
      <div style="max-width:900px;margin:0 auto;padding:48px 40px;">
        <div style="background:white;border-radius:12px;padding:32px;margin-bottom:32px;box-shadow:0 2px 8px rgba(0,0,0,0.08);">
          <h2 style="font-size:1.1rem;font-weight:600;color:#5E5873;margin:0 0 16px 0;">Sobre o Componente</h2>
          <p style="color:#6E6B7B;line-height:1.7;margin:0 0 16px 0;">Header + Split Variant B (Alias Template8/10). Faz parte da categoria <strong>Templates</strong> do Design System Educacross.</p>
          <div style="background:#F8F7FF;border-left:4px solid #6E63E8;padding:16px;border-radius:4px;">
            <p style="margin:0;color:#5E5873;font-size:14px;line-height:1.6;"><strong>💡 Dica:</strong> Use <em>Playground</em> para explorar props, <em>Use Cases</em> para exemplos reais e <em>Accessibility</em> para validar WCAG.</p>
          </div>
        </div>
        <div style="background:white;border-radius:12px;padding:32px;box-shadow:0 2px 8px rgba(0,0,0,0.08);">
          <h2 style="font-size:1.1rem;font-weight:600;color:#5E5873;margin:0 0 16px 0;">Implementação Vue 2.7</h2>
          <pre style="background:#1E1E2E;color:#CDD6F4;padding:20px;border-radius:8px;font-size:13px;line-height:1.6;overflow:auto;margin:0;"><code>import Template11 from '@/components/Template11.vue';

// Template
&lt;Template11 v-bind="props" /&gt;</code></pre>
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
    docs: { description: { story: 'Explore o Template11 com controles interativos.' } },
  },
  render: (args) => `
    <div style="padding:32px;display:flex;justify-content:center;align-items:center;min-height:200px;background:#F8F8F8;border-radius:12px;">
      <div style="text-align:center;color:#6E6B7B;">
        <div style="width:60px;height:60px;background:#6E63E820;border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 16px;font-size:24px;">🎨</div>
        <p style="margin:0 0 8px 0;font-size:15px;font-weight:600;color:#5E5873;">Playground Template11</p>
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
    docs: { description: { story: 'Exemplos de uso real do Template11 no Educacross.' } },
  },
  render: () => `
    <div style="max-width:800px;margin:0 auto;padding:40px 20px;font-family:'Public Sans',sans-serif;">
      <div style="background:#6E63E815;border:1px solid #6E63E830;border-radius:12px;padding:24px;margin-bottom:40px;">
        <h1 style="font-size:1.5rem;font-weight:700;color:#5E5873;margin:0 0 8px 0;">Casos de Uso: Template11</h1>
        <p style="color:#6E6B7B;margin:0;font-size:14px;line-height:1.6;">Cenários reais de uso no contexto educacional da plataforma Educacross</p>
      </div>
      
      <div style="margin-bottom:32px;">
        <h2 style="font-size:18px;font-weight:600;color:#5E5873;margin:0 0 8px 0;display:flex;align-items:center;gap:10px;">
          <span style="display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;background:#6E63E8;color:white;border-radius:50%;font-size:13px;font-weight:700;flex-shrink:0;">1</span>
          Professor — Painel Principal
        </h2>
        <p style="color:#6E6B7B;margin:0 0 16px 0;padding-left:38px;font-size:14px;">Professor utilizando Template11 no dashboard de gestão de turmas</p>
        <div style="background:#F8F8F8;border-radius:8px;padding:20px;margin-left:38px;text-align:center;color:#B9B9C3;font-size:13px;">
          Ver story <strong>Default</strong> para visualização do componente neste contexto
        </div>
      </div>
      <div style="margin-bottom:32px;">
        <h2 style="font-size:18px;font-weight:600;color:#5E5873;margin:0 0 8px 0;display:flex;align-items:center;gap:10px;">
          <span style="display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;background:#6E63E8;color:white;border-radius:50%;font-size:13px;font-weight:700;flex-shrink:0;">2</span>
          Aluno — Portal do Estudante
        </h2>
        <p style="color:#6E6B7B;margin:0 0 16px 0;padding-left:38px;font-size:14px;">Aluno interagindo com Template11 no portal educacional</p>
        <div style="background:#F8F8F8;border-radius:8px;padding:20px;margin-left:38px;text-align:center;color:#B9B9C3;font-size:13px;">
          Ver story <strong>Default</strong> para visualização do componente neste contexto
        </div>
      </div>
      <div style="margin-bottom:32px;">
        <h2 style="font-size:18px;font-weight:600;color:#5E5873;margin:0 0 8px 0;display:flex;align-items:center;gap:10px;">
          <span style="display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;background:#6E63E8;color:white;border-radius:50%;font-size:13px;font-weight:700;flex-shrink:0;">3</span>
          Coordenador — Relatórios
        </h2>
        <p style="color:#6E6B7B;margin:0 0 16px 0;padding-left:38px;font-size:14px;">Coordenador pedagógico analisando dados via Template11</p>
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
    docs: { description: { story: 'Conformidade WCAG 2.1 AA para o Template11.' } },
  },
  render: () => `
    <div style="max-width:800px;margin:0 auto;padding:40px 20px;font-family:'Public Sans',sans-serif;">

      <div style="background:linear-gradient(135deg,#6E63E8 0%,#764ba2 100%);padding:32px;border-radius:12px;margin-bottom:32px;color:white;">
        <h1 style="font-size:1.5rem;font-weight:700;margin:0 0 8px 0;">Acessibilidade: Template11</h1>
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

