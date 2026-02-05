/**
 * FixedStickyFooter - Fixed Footer Component
 * =========================================
 * 
 * Sticky footer that remains visible at bottom of viewport.
 * Used for action buttons and persistent controls.
 * 
 * @component FixedStickyFooter
 * @source educacross-frontoffice\src\components\FixedStickyFooter.vue
 */

export default {
  title: 'Front-office/Layout/FixedStickyFooter',
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# FixedStickyFooter

Componente de **rodapé fixo** que permanece visível no fundo da tela.

## Contexto de Uso

- **Action buttons**: Botões de salvar/cancelar sempre visíveis
- **Navigation**: Navegação fixa em formulários longos
- **Quiz/Provas**: Botões de envio/próxima questão
- **Checkout flows**: Ações de pagamento/finalização
- **Mobile apps**: Barra de navegação inferior

## Características

- **Position fixed**: \`position: fixed; bottom: 0\`
- **Z-index 998**: Sobrepõe conteúdo mas abaixo de modais (z-1000)
- **Box shadow top**: Sombra superior para destaque
- **Responsive**: Adapta left offset para sidebar
- **Expand state**: Suporta sidebar expandida/colapsada

## CSS Classes

- \`.fixed-footer-wrapper\`: Container principal
- \`.expand\`: Classe para sidebar expandida
- \`left: inherit\` em desktop, \`left: 0\` em mobile (<1199px)
        `
      }
    }
  }
};

const fixedStickyFooterStyles = `
<style>
  .demo-content {
    min-height: 600px;
    padding: 40px 20px;
    background: linear-gradient(180deg, #F8F7FA 0%, #E0E0E0 100%);
  }
  
  .fixed-footer-wrapper {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 998;
    background: white;
    box-shadow: 0px -6px 14px 0px rgba(0, 0, 0, 0.16);
    padding: 16px 24px;
  }
  
  .fixed-footer-wrapper.expand {
    left: inherit;
  }
  
  @media (max-width: 1199px) {
    .fixed-footer-wrapper {
      left: 0 !important;
    }
    
    .fixed-footer-wrapper.expand {
      left: 0 !important;
    }
  }
  
  .footer-content {
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .btn {
    padding: 10px 24px;
    border-radius: 6px;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
    border: 1px solid transparent;
  }
  
  .btn-primary {
    background: #6E63E8;
    color: white;
    border-color: #6E63E8;
  }
  
  .btn-primary:hover {
    background: #5951D4;
  }
  
  .btn-outline {
    background: transparent;
    color: #6E6B7B;
    border-color: #DBDADE;
  }
  
  .btn-outline:hover {
    background: #F8F7FA;
  }
  
  .content-with-footer {
    padding-bottom: 80px;
  }
</style>
`;

export const Default = {
  render: () => `
    ${fixedStickyFooterStyles}
    <div>
      <div class="demo-content content-with-footer">
        <h2 style="color: #5D596C; margin-bottom: 16px;">Conteúdo da Página</h2>
        <p style="color: #6E6B7B;">Role para baixo para ver o footer fixo sempre visível...</p>
        <div style="height: 800px; background: rgba(255,255,255,0.5); border-radius: 12px; padding: 20px; margin-top: 20px;">
          <p>Conteúdo longo para demonstrar scroll</p>
        </div>
      </div>
      
      <div class="fixed-footer-wrapper">
        <div class="footer-content">
          <button class="btn btn-outline">Cancelar</button>
          <button class="btn btn-primary">Salvar Alterações</button>
        </div>
      </div>
    </div>
  `
};

export const WithMultipleActions = {
  render: () => `
    ${fixedStickyFooterStyles}
    <div>
      <div class="demo-content content-with-footer">
        <h2 style="color: #5D596C;">Formulário Longo</h2>
        <div style="height: 600px; background: white; border-radius: 12px; padding: 20px; margin-top: 20px;">
          <p>Campos do formulário...</p>
        </div>
      </div>
      
      <div class="fixed-footer-wrapper">
        <div class="footer-content" style="justify-content: flex-end; gap: 12px;">
          <button class="btn btn-outline">Descartar</button>
          <button class="btn btn-outline">Salvar Rascunho</button>
          <button class="btn btn-primary">Publicar</button>
        </div>
      </div>
    </div>
  `
};

export const WithProgress = {
  render: () => `
    ${fixedStickyFooterStyles}
    <style>
      .progress-bar-container {
        flex: 1;
        height: 6px;
        background: #E0E0E0;
        border-radius: 3px;
        overflow: hidden;
        max-width: 400px;
      }
      .progress-bar {
        height: 100%;
        background: #6E63E8;
        transition: width 0.3s;
      }
    </style>
    <div>
      <div class="demo-content content-with-footer">
        <h2 style="color: #5D596C;">Etapa 3 de 5</h2>
        <div style="height: 500px; background: white; border-radius: 12px; padding: 20px; margin-top: 20px;">
          <p>Conteúdo do wizard...</p>
        </div>
      </div>
      
      <div class="fixed-footer-wrapper">
        <div class="footer-content">
          <button class="btn btn-outline">Voltar</button>
          <div style="display: flex; align-items: center; gap: 12px;">
            <span style="font-size: 13px; color: #6E6B7B;">Etapa 3/5</span>
            <div class="progress-bar-container">
              <div class="progress-bar" style="width: 60%;"></div>
            </div>
          </div>
          <button class="btn btn-primary">Próximo</button>
        </div>
      </div>
    </div>
  `
};

export const QuizFooter = {
  render: () => `
    ${fixedStickyFooterStyles}
    <div>
      <div class="demo-content content-with-footer">
        <h2 style="color: #5D596C;">Questão 5 de 20</h2>
        <div style="height: 500px; background: white; border-radius: 12px; padding: 20px; margin-top: 20px;">
          <h3>Quanto é 2 + 2?</h3>
          <div style="margin-top: 20px;">
            <div style="padding: 12px; border: 2px solid #6E63E8; border-radius: 8px; margin-bottom: 8px; background: rgba(110,99,232,0.1);">
              A) 4 ✓
            </div>
            <div style="padding: 12px; border: 1px solid #DBDADE; border-radius: 8px; margin-bottom: 8px;">
              B) 5
            </div>
            <div style="padding: 12px; border: 1px solid #DBDADE; border-radius: 8px; margin-bottom: 8px;">
              C) 3
            </div>
          </div>
        </div>
      </div>
      
      <div class="fixed-footer-wrapper">
        <div class="footer-content">
          <div style="display: flex; align-items: center; gap: 16px;">
            <span style="font-size: 14px; color: #6E6B7B;">
              <i class="bi bi-clock"></i> 15:30
            </span>
            <span style="font-size: 14px; font-weight: 600; color: #5D596C;">
              5 / 20
            </span>
          </div>
          <div style="display: flex; gap: 12px;">
            <button class="btn btn-outline">Questão Anterior</button>
            <button class="btn btn-primary">Próxima Questão</button>
          </div>
        </div>
      </div>
    </div>
  `
};

export const MobileView = {
  render: () => `
    ${fixedStickyFooterStyles}
    <div style="max-width: 375px; margin: 0 auto; border: 1px solid #E0E0E0;">
      <div class="demo-content content-with-footer">
        <h2 style="color: #5D596C; font-size: 18px;">Mobile View</h2>
        <div style="height: 400px; background: white; border-radius: 12px; padding: 16px; margin-top: 16px;">
          <p style="font-size: 14px;">Conteúdo mobile...</p>
        </div>
      </div>
      
      <div class="fixed-footer-wrapper" style="position: absolute;">
        <div class="footer-content" style="flex-direction: column; gap: 8px;">
          <button class="btn btn-primary" style="width: 100%;">Confirmar</button>
          <button class="btn btn-outline" style="width: 100%;">Cancelar</button>
        </div>
      </div>
    </div>
  `
};

export const WithNotification = {
  render: () => `
    ${fixedStickyFooterStyles}
    <style>
      .footer-notification {
        background: #E8F5E9;
        border-left: 4px solid #28C76F;
        padding: 12px 16px;
        margin-bottom: 8px;
        border-radius: 6px;
        display: flex;
        align-items: center;
        gap: 12px;
      }
    </style>
    <div>
      <div class="demo-content content-with-footer">
        <h2 style="color: #5D596C;">Formulário com Notificação</h2>
        <div style="height: 500px; background: white; border-radius: 12px; padding: 20px; margin-top: 20px;">
          <p>Campos editados...</p>
        </div>
      </div>
      
      <div class="fixed-footer-wrapper">
        <div class="footer-notification">
          <i class="bi bi-check-circle-fill" style="color: #28C76F; font-size: 20px;"></i>
          <span style="font-size: 14px; color: #2E7D32;">Alterações salvas automaticamente</span>
        </div>
        <div class="footer-content">
          <button class="btn btn-outline">Descartar</button>
          <button class="btn btn-primary">Salvar</button>
        </div>
      </div>
    </div>
  `
};

export const ExpandedSidebar = {
  render: () => `
    ${fixedStickyFooterStyles}
    <style>
      .sidebar-demo {
        position: fixed;
        top: 0;
        left: 0;
        width: 260px;
        height: 100vh;
        background: #5D596C;
        padding: 20px;
        z-index: 999;
      }
    </style>
    <div>
      <div class="sidebar-demo">
        <h3 style="color: white; font-size: 16px;">Sidebar</h3>
        <p style="color: rgba(255,255,255,0.7); font-size: 13px;">Expandida</p>
      </div>
      
      <div style="margin-left: 260px;">
        <div class="demo-content content-with-footer">
          <h2 style="color: #5D596C;">Com Sidebar Expandida</h2>
          <div style="height: 500px; background: white; border-radius: 12px; padding: 20px; margin-top: 20px;">
            <p>Footer respeita offset da sidebar</p>
          </div>
        </div>
        
        <div class="fixed-footer-wrapper expand" style="left: 260px;">
          <div class="footer-content">
            <button class="btn btn-outline">Cancelar</button>
            <button class="btn btn-primary">Salvar</button>
          </div>
        </div>
      </div>
    </div>
  `
};

export const Responsive = {
  render: () => `
    ${fixedStickyFooterStyles}
    <div style="background: #E3F2FD; padding: 16px; border-radius: 6px; margin-bottom: 16px;">
      <p style="margin: 0; font-size: 13px; color: #1565C0;">
        <i class="bi bi-arrows-fullscreen"></i> <strong>Responsive:</strong> left: inherit (desktop) → left: 0 (mobile &lt;1199px)
      </p>
    </div>
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px;">
      <div>
        <h4 style="text-align: center; font-size: 13px; margin-bottom: 12px;">Desktop (&gt;1199px)</h4>
        <div style="height: 300px; position: relative; border: 1px solid #E0E0E0;">
          <div class="fixed-footer-wrapper" style="position: absolute; left: inherit;">
            <div style="padding: 12px; text-align: center;">
              <span style="font-size: 12px;">left: inherit</span>
            </div>
          </div>
        </div>
      </div>
      <div>
        <h4 style="text-align: center; font-size: 13px; margin-bottom: 12px;">Mobile (&lt;1199px)</h4>
        <div style="height: 300px; position: relative; border: 1px solid #E0E0E0; max-width: 375px;">
          <div class="fixed-footer-wrapper" style="position: absolute; left: 0 !important;">
            <div style="padding: 12px; text-align: center;">
              <span style="font-size: 12px;">left: 0</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
};
