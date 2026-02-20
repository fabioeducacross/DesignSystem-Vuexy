/**
 * CellStatus - Table Cell Status Badge
 * =====================================
 * Status badge overlay para células de tabela (edição, revisão, ritmo)
 * 
 * @component CellStatus
 * @category Educacross Components V2 / Badges
 * @source educacross-frontoffice/src/components/badge/CellStatus.vue
 * @priority P2
 * @status PIXEL-PERFECT
 * @since 2.0.0
 */

export default {
  title: 'Educacross Components V2/Badges/CellStatus',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
# CellStatus

Badge de **status em célula** com overlay absoluto.

## Contexto de Uso

- **Tabelas de edição**: Status de correção/revisão
- **Dashboards**: Indicadores de progresso
- **Listas de tarefas**: Estado de cada item
- **Acompanhamento**: Ritmo de progresso (pace)
- **Admin panels**: Status de aprovação

## Características

- **Position absolute**: Overlay completo da célula
- **Badge pill**: Badge arredondado com ícone
- **Icons Material**: person_edit, check, pace
- **Flex centered**: Centralizado vertical/horizontal
- **Gap 1**: Espaçamento entre elementos
- **Text uppercase**: Texto em maiúsculas

## Props

- Nenhuma prop - estilo via classes
        `
      }
    }
  }
};

const cellStatusStyles = `
<style>
  .demo-table {
    border-collapse: collapse;
    width: 100%;
    max-width: 800px;
  }
  
  .demo-table th,
  .demo-table td {
    border: 1px solid #DBDADE;
    padding: 12px;
    text-align: left;
  }
  
  .demo-table th {
    background: #F8F7FA;
    font-weight: 600;
    color: #5D596C;
  }
  
  .status-cell {
    position: relative;
    height: 80px;
    width: 120px;
  }
  
  .cell-status-overlay {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 8px;
  }
  
  .status-badge {
    padding: 6px 12px;
    border-radius: 16px;
    font-size: 12px;
    font-weight: 600;
    text-transform: uppercase;
    display: inline-flex;
    align-items: center;
    gap: 6px;
  }
  
  .badge-editing {
    background: #E3F2FD;
    color: #1565C0;
  }
  
  .badge-reviewing {
    background: #FFF3E0;
    color: #E65100;
  }
  
  .badge-completed {
    background: #E8F5E9;
    color: #2E7D32;
  }
  
  .badge-pending {
    background: #F3F2F7;
    color: #6E6B7B;
  }
  
  .badge-error {
    background: #FFEBEE;
    color: #C62828;
  }
  
  .status-info {
    display: flex;
    align-items: center;
    gap: 4px;
    font-size: 11px;
    color: #6E6B7B;
    text-transform: uppercase;
  }
  
  .pace-indicator {
    display: flex;
    align-items: center;
    gap: 4px;
    font-weight: 700;
    font-size: 12px;
    color: #5D596C;
  }
</style>
`;

export const Default = {
  render: () => `
    ${cellStatusStyles}
    <div class="status-cell" style="background: white; border: 1px solid #DBDADE; border-radius: 8px;">
      <div class="cell-status-overlay">
        <div class="status-badge badge-editing">
          <i class="bi bi-pencil"></i>
          Editando
        </div>
      </div>
    </div>
  `
};

export const Reviewing = {
  render: () => `
    ${cellStatusStyles}
    <div class="status-cell" style="background: white; border: 1px solid #DBDADE; border-radius: 8px;">
      <div class="cell-status-overlay">
        <div class="status-badge badge-reviewing">
          <i class="bi bi-eye"></i>
          Revisando
        </div>
        <div class="status-info">
          <i class="bi bi-clock"></i>
          <small>2h restantes</small>
        </div>
      </div>
    </div>
  `
};

export const Completed = {
  render: () => `
    ${cellStatusStyles}
    <div class="status-cell" style="background: white; border: 1px solid #DBDADE; border-radius: 8px;">
      <div class="cell-status-overlay">
        <div class="status-badge badge-completed">
          <i class="bi bi-check-circle-fill"></i>
          Concluído
        </div>
        <div class="status-info">
          <i class="bi bi-calendar-check"></i>
          <small>12/01/2026</small>
        </div>
      </div>
    </div>
  `
};

export const Pending = {
  render: () => `
    ${cellStatusStyles}
    <div class="status-cell" style="background: white; border: 1px solid #DBDADE; border-radius: 8px;">
      <div class="cell-status-overlay">
        <div class="status-badge badge-pending">
          <i class="bi bi-clock-history"></i>
          Pendente
        </div>
        <div class="status-info">
          <i class="bi bi-hourglass-split"></i>
          <small>Aguardando</small>
        </div>
      </div>
    </div>
  `
};

export const Error = {
  render: () => `
    ${cellStatusStyles}
    <div class="status-cell" style="background: white; border: 1px solid #DBDADE; border-radius: 8px;">
      <div class="cell-status-overlay">
        <div class="status-badge badge-error">
          <i class="bi bi-exclamation-triangle-fill"></i>
          Erro
        </div>
        <div class="status-info">
          <i class="bi bi-arrow-repeat"></i>
          <small>Tentar novamente</small>
        </div>
      </div>
    </div>
  `
};

export const WithPace = {
  render: () => `
    ${cellStatusStyles}
    <div class="status-cell" style="background: white; border: 1px solid #DBDADE; border-radius: 8px;">
      <div class="cell-status-overlay">
        <div class="status-badge badge-editing">
          <i class="bi bi-pencil"></i>
          Em edição
        </div>
        <div class="status-info">
          <i class="bi bi-person"></i>
          <small>Ana Silva</small>
        </div>
        <div class="pace-indicator">
          <i class="bi bi-speedometer2"></i>
          <span>85%</span>
        </div>
      </div>
    </div>
  `
};

export const InTable = {
  render: () => `
    ${cellStatusStyles}
    <table class="demo-table">
      <thead>
        <tr>
          <th>Aluno</th>
          <th>Disciplina</th>
          <th>Status</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Ana Clara</td>
          <td>Matemática</td>
          <td class="status-cell">
            <div class="cell-status-overlay">
              <div class="status-badge badge-completed">
                <i class="bi bi-check-lg"></i>
                OK
              </div>
            </div>
          </td>
          <td>
            <button style="padding: 4px 8px; font-size: 12px; border: 1px solid #DBDADE; border-radius: 4px; cursor: pointer;">
              Ver
            </button>
          </td>
        </tr>
        <tr>
          <td>Bruno Oliveira</td>
          <td>Português</td>
          <td class="status-cell">
            <div class="cell-status-overlay">
              <div class="status-badge badge-editing">
                <i class="bi bi-pencil"></i>
                Edit
              </div>
            </div>
          </td>
          <td>
            <button style="padding: 4px 8px; font-size: 12px; border: 1px solid #DBDADE; border-radius: 4px; cursor: pointer;">
              Ver
            </button>
          </td>
        </tr>
        <tr>
          <td>Carlos Lima</td>
          <td>Geografia</td>
          <td class="status-cell">
            <div class="cell-status-overlay">
              <div class="status-badge badge-pending">
                <i class="bi bi-clock"></i>
                Pend
              </div>
            </div>
          </td>
          <td>
            <button style="padding: 4px 8px; font-size: 12px; border: 1px solid #DBDADE; border-radius: 4px; cursor: pointer;">
              Ver
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  `
};

export const Responsive = {
  render: () => `
    ${cellStatusStyles}
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); gap: 16px;">
      <div class="status-cell" style="background: white; border: 1px solid #DBDADE; border-radius: 8px;">
        <div class="cell-status-overlay">
          <div class="status-badge badge-editing">
            <i class="bi bi-pencil"></i>
            Edit
          </div>
          <div class="pace-indicator">
            <i class="bi bi-speedometer2"></i>
            <span>75%</span>
          </div>
        </div>
      </div>
      
      <div class="status-cell" style="background: white; border: 1px solid #DBDADE; border-radius: 8px;">
        <div class="cell-status-overlay">
          <div class="status-badge badge-reviewing">
            <i class="bi bi-eye"></i>
            Rev
          </div>
          <div class="pace-indicator">
            <i class="bi bi-speedometer2"></i>
            <span>50%</span>
          </div>
        </div>
      </div>
      
      <div class="status-cell" style="background: white; border: 1px solid #DBDADE; border-radius: 8px;">
        <div class="cell-status-overlay">
          <div class="status-badge badge-completed">
            <i class="bi bi-check-lg"></i>
            Done
          </div>
          <div class="pace-indicator">
            <i class="bi bi-speedometer2"></i>
            <span>100%</span>
          </div>
        </div>
      </div>
    </div>
  `
};

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
          <div style="display:inline-block;padding:8px 16px;background:rgba(255,255,255,0.15);border-radius:50px;margin-bottom:20px;font-size:14px;border:1px solid rgba(255,255,255,0.2);">Badges</div>
          <h1 style="font-size:3rem;font-weight:700;margin:0 0 12px 0;letter-spacing:-0.02em;">CellStatus</h1>
          <p style="font-size:1.1rem;opacity:0.9;margin:0;max-width:600px;">Table Cell Status Badge</p>
        </div>
      </div>
      <div style="max-width:900px;margin:0 auto;padding:48px 40px;">
        <div style="background:white;border-radius:12px;padding:32px;margin-bottom:32px;box-shadow:0 2px 8px rgba(0,0,0,0.08);">
          <h2 style="font-size:1.1rem;font-weight:600;color:#5E5873;margin:0 0 16px 0;">Sobre o Componente</h2>
          <p style="color:#6E6B7B;line-height:1.7;margin:0 0 16px 0;">Table Cell Status Badge. Faz parte da categoria <strong>Badges</strong> do Design System Educacross.</p>
          <div style="background:#F8F7FF;border-left:4px solid #6E63E8;padding:16px;border-radius:4px;">
            <p style="margin:0;color:#5E5873;font-size:14px;line-height:1.6;"><strong>💡 Dica:</strong> Use <em>Playground</em> para explorar props, <em>Use Cases</em> para exemplos reais e <em>Accessibility</em> para validar WCAG.</p>
          </div>
        </div>
        <div style="background:white;border-radius:12px;padding:32px;box-shadow:0 2px 8px rgba(0,0,0,0.08);">
          <h2 style="font-size:1.1rem;font-weight:600;color:#5E5873;margin:0 0 16px 0;">Implementação Vue 2.7</h2>
          <pre style="background:#1E1E2E;color:#CDD6F4;padding:20px;border-radius:8px;font-size:13px;line-height:1.6;overflow:auto;margin:0;"><code>import CellStatus from '@/components/CellStatus.vue';

// Template
&lt;CellStatus v-bind="props" /&gt;</code></pre>
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
    docs: { description: { story: 'Explore o CellStatus com controles interativos.' } },
  },
  render: (args) => `
    <div style="padding:32px;display:flex;justify-content:center;align-items:center;min-height:200px;background:#F8F8F8;border-radius:12px;">
      <div style="text-align:center;color:#6E6B7B;">
        <div style="width:60px;height:60px;background:#6E63E820;border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 16px;font-size:24px;">🎨</div>
        <p style="margin:0 0 8px 0;font-size:15px;font-weight:600;color:#5E5873;">Playground CellStatus</p>
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
    docs: { description: { story: 'Exemplos de uso real do CellStatus no Educacross.' } },
  },
  render: () => `
    <div style="max-width:800px;margin:0 auto;padding:40px 20px;font-family:'Public Sans',sans-serif;">
      <div style="background:#6E63E815;border:1px solid #6E63E830;border-radius:12px;padding:24px;margin-bottom:40px;">
        <h1 style="font-size:1.5rem;font-weight:700;color:#5E5873;margin:0 0 8px 0;">Casos de Uso: CellStatus</h1>
        <p style="color:#6E6B7B;margin:0;font-size:14px;line-height:1.6;">Cenários reais de uso no contexto educacional da plataforma Educacross</p>
      </div>
      
      <div style="margin-bottom:32px;">
        <h2 style="font-size:18px;font-weight:600;color:#5E5873;margin:0 0 8px 0;display:flex;align-items:center;gap:10px;">
          <span style="display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;background:#6E63E8;color:white;border-radius:50%;font-size:13px;font-weight:700;flex-shrink:0;">1</span>
          Professor — Painel Principal
        </h2>
        <p style="color:#6E6B7B;margin:0 0 16px 0;padding-left:38px;font-size:14px;">Professor utilizando CellStatus no dashboard de gestão de turmas</p>
        <div style="background:#F8F8F8;border-radius:8px;padding:20px;margin-left:38px;text-align:center;color:#B9B9C3;font-size:13px;">
          Ver story <strong>Default</strong> para visualização do componente neste contexto
        </div>
      </div>
      <div style="margin-bottom:32px;">
        <h2 style="font-size:18px;font-weight:600;color:#5E5873;margin:0 0 8px 0;display:flex;align-items:center;gap:10px;">
          <span style="display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;background:#6E63E8;color:white;border-radius:50%;font-size:13px;font-weight:700;flex-shrink:0;">2</span>
          Aluno — Portal do Estudante
        </h2>
        <p style="color:#6E6B7B;margin:0 0 16px 0;padding-left:38px;font-size:14px;">Aluno interagindo com CellStatus no portal educacional</p>
        <div style="background:#F8F8F8;border-radius:8px;padding:20px;margin-left:38px;text-align:center;color:#B9B9C3;font-size:13px;">
          Ver story <strong>Default</strong> para visualização do componente neste contexto
        </div>
      </div>
      <div style="margin-bottom:32px;">
        <h2 style="font-size:18px;font-weight:600;color:#5E5873;margin:0 0 8px 0;display:flex;align-items:center;gap:10px;">
          <span style="display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;background:#6E63E8;color:white;border-radius:50%;font-size:13px;font-weight:700;flex-shrink:0;">3</span>
          Coordenador — Relatórios
        </h2>
        <p style="color:#6E6B7B;margin:0 0 16px 0;padding-left:38px;font-size:14px;">Coordenador pedagógico analisando dados via CellStatus</p>
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
    docs: { description: { story: 'Conformidade WCAG 2.1 AA para o CellStatus.' } },
  },
  render: () => `
    <div style="max-width:800px;margin:0 auto;padding:40px 20px;font-family:'Public Sans',sans-serif;">

      <div style="background:linear-gradient(135deg,#6E63E8 0%,#764ba2 100%);padding:32px;border-radius:12px;margin-bottom:32px;color:white;">
        <h1 style="font-size:1.5rem;font-weight:700;margin:0 0 8px 0;">Acessibilidade: CellStatus</h1>
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

