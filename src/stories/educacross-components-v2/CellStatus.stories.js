/**
 * CellStatus - Table Cell Status Badge
 * =====================================
 * 
 * Status badge overlay for table cells.
 * Shows editing state, review status, and pace indicators.
 * 
 * @component CellStatus
 * @source educacross-frontoffice\src\components\badge\CellStatus.vue
 */

export default {
  title: 'Front-office/Badges/CellStatus',
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
