/**
 * @file Toasts & Alerts - Educacross Design System
 * @description Notificações e alertas contextuais
 * 
 * Status: DONE
 * Phase: 1 - Componentes simples
 */

export default {
  title: 'Educacross/Components/Toasts & Alerts',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
## Toasts & Alerts

Notificações e alertas para feedback do sistema.

### Uso no Educacross
- **Toasts**: Notificações temporárias (sucesso, erro, info)
- **Alerts**: Mensagens importantes que requerem atenção
- **Banners**: Avisos gerais no topo da página

### Variantes
- Cores semânticas (success, danger, warning, info)
- Com ícones
- Dismissible (fechável)
- Com ações
        `
      }
    }
  }
};

// Story: Alerts básicos
export const BasicAlerts = {
  name: '📢 Alerts Básicos',
  render: () => `
    <div class="d-flex flex-column gap-3">
      <div class="alert alert-primary" role="alert">
        <i class="bi bi-info-circle me-2"></i>
        <strong>Informação:</strong> Esta é uma mensagem informativa.
      </div>
      
      <div class="alert alert-success" role="alert">
        <i class="bi bi-check-circle me-2"></i>
        <strong>Sucesso!</strong> A operação foi concluída com sucesso.
      </div>
      
      <div class="alert alert-warning" role="alert">
        <i class="bi bi-exclamation-triangle me-2"></i>
        <strong>Atenção!</strong> Verifique os dados antes de continuar.
      </div>
      
      <div class="alert alert-danger" role="alert">
        <i class="bi bi-x-circle me-2"></i>
        <strong>Erro!</strong> Não foi possível completar a operação.
      </div>
      
      <div class="alert alert-info" role="alert">
        <i class="bi bi-lightbulb me-2"></i>
        <strong>Dica:</strong> Você pode usar atalhos de teclado para navegar.
      </div>
    </div>
  `
};

// Story: Alerts com conteúdo
export const RichAlerts = {
  name: '📝 Alerts com Conteúdo',
  render: () => `
    <div class="d-flex flex-column gap-4">
      <!-- Alert com título e descrição -->
      <div class="alert alert-success" role="alert">
        <h5 class="alert-heading">
          <i class="bi bi-check-circle-fill me-2"></i>
          Cadastro Realizado!
        </h5>
        <p class="mb-0">
          O aluno <strong>João Silva</strong> foi cadastrado com sucesso na turma 
          <strong>5º Ano A</strong>. As credenciais de acesso foram enviadas para o 
          e-mail do responsável.
        </p>
        <hr>
        <div class="d-flex gap-2">
          <button class="btn btn-success btn-sm">Ver Perfil</button>
          <button class="btn btn-outline-success btn-sm">Cadastrar Outro</button>
        </div>
      </div>
      
      <!-- Alert de erro com detalhes -->
      <div class="alert alert-danger" role="alert">
        <h5 class="alert-heading">
          <i class="bi bi-x-circle-fill me-2"></i>
          Erro ao Importar Alunos
        </h5>
        <p>Encontramos problemas em algumas linhas do arquivo:</p>
        <ul class="mb-0">
          <li>Linha 5: E-mail inválido</li>
          <li>Linha 12: Turma não encontrada</li>
          <li>Linha 23: Data de nascimento inválida</li>
        </ul>
        <hr>
        <p class="mb-0">
          <a href="#" class="alert-link">Clique aqui</a> para baixar o relatório de erros.
        </p>
      </div>
      
      <!-- Alert de aviso com lista -->
      <div class="alert alert-warning" role="alert">
        <h5 class="alert-heading">
          <i class="bi bi-exclamation-triangle-fill me-2"></i>
          Alunos Precisam de Atenção
        </h5>
        <p>Os seguintes alunos estão com desempenho abaixo da média:</p>
        <div class="d-flex gap-2 flex-wrap">
          <span class="badge bg-warning text-dark">Pedro Santos</span>
          <span class="badge bg-warning text-dark">Ana Oliveira</span>
          <span class="badge bg-warning text-dark">Carlos Lima</span>
        </div>
        <hr>
        <button class="btn btn-warning btn-sm">Ver Detalhes</button>
      </div>
    </div>
  `
};

// Story: Alerts dismissible
export const Dismissible = {
  name: '❌ Fecháveis',
  render: () => `
    <div class="d-flex flex-column gap-3">
      <div class="alert alert-success alert-dismissible fade show" role="alert">
        <i class="bi bi-check-circle me-2"></i>
        Alterações salvas com sucesso!
        <button type="button" class="btn-close" aria-label="Close"></button>
      </div>
      
      <div class="alert alert-info alert-dismissible fade show" role="alert">
        <i class="bi bi-info-circle me-2"></i>
        Nova atualização disponível. <a href="#" class="alert-link">Saiba mais</a>
        <button type="button" class="btn-close" aria-label="Close"></button>
      </div>
      
      <div class="alert alert-warning alert-dismissible fade show" role="alert">
        <i class="bi bi-exclamation-triangle me-2"></i>
        Sua sessão expira em 5 minutos.
        <button type="button" class="btn-close" aria-label="Close"></button>
      </div>
      
      <div class="alert alert-danger alert-dismissible fade show" role="alert">
        <i class="bi bi-x-circle me-2"></i>
        Conexão perdida. Tentando reconectar...
        <button type="button" class="btn-close" aria-label="Close"></button>
      </div>
    </div>
  `
};

// Story: Toasts
export const Toasts = {
  name: '🔔 Toasts',
  render: () => `
    <div class="d-flex flex-column gap-3" style="max-width: 350px;">
      <!-- Toast de sucesso -->
      <div class="toast show" role="alert">
        <div class="toast-header bg-success text-white">
          <i class="bi bi-check-circle me-2"></i>
          <strong class="me-auto">Sucesso</strong>
          <small>agora</small>
          <button type="button" class="btn-close btn-close-white" aria-label="Close"></button>
        </div>
        <div class="toast-body">
          Aluno cadastrado com sucesso!
        </div>
      </div>
      
      <!-- Toast de erro -->
      <div class="toast show" role="alert">
        <div class="toast-header bg-danger text-white">
          <i class="bi bi-x-circle me-2"></i>
          <strong class="me-auto">Erro</strong>
          <small>2 min atrás</small>
          <button type="button" class="btn-close btn-close-white" aria-label="Close"></button>
        </div>
        <div class="toast-body">
          Não foi possível salvar as alterações. Tente novamente.
        </div>
      </div>
      
      <!-- Toast de info -->
      <div class="toast show" role="alert">
        <div class="toast-header bg-info text-white">
          <i class="bi bi-info-circle me-2"></i>
          <strong class="me-auto">Informação</strong>
          <small>5 min atrás</small>
          <button type="button" class="btn-close btn-close-white" aria-label="Close"></button>
        </div>
        <div class="toast-body">
          3 novos alunos foram adicionados à turma.
        </div>
      </div>
      
      <!-- Toast de warning -->
      <div class="toast show" role="alert">
        <div class="toast-header bg-warning text-dark">
          <i class="bi bi-exclamation-triangle me-2"></i>
          <strong class="me-auto">Atenção</strong>
          <small>10 min atrás</small>
          <button type="button" class="btn-close" aria-label="Close"></button>
        </div>
        <div class="toast-body">
          Sessão expira em 10 minutos. Salve seu trabalho.
        </div>
      </div>
    </div>
  `
};

// Story: Toasts com ações
export const ToastsWithActions = {
  name: '🎯 Toasts com Ações',
  render: () => `
    <div class="d-flex flex-column gap-3" style="max-width: 350px;">
      <!-- Toast com botão -->
      <div class="toast show" role="alert">
        <div class="toast-header">
          <i class="bi bi-trophy-fill text-warning me-2"></i>
          <strong class="me-auto">Nova Conquista!</strong>
          <button type="button" class="btn-close" aria-label="Close"></button>
        </div>
        <div class="toast-body">
          <p class="mb-2">Maria Silva conquistou o troféu "Mestre da Matemática"!</p>
          <div class="d-flex gap-2">
            <button class="btn btn-primary btn-sm">Ver Conquista</button>
            <button class="btn btn-outline-secondary btn-sm">Fechar</button>
          </div>
        </div>
      </div>
      
      <!-- Toast de atualização -->
      <div class="toast show" role="alert">
        <div class="toast-header">
          <i class="bi bi-arrow-repeat text-primary me-2"></i>
          <strong class="me-auto">Atualização Disponível</strong>
          <button type="button" class="btn-close" aria-label="Close"></button>
        </div>
        <div class="toast-body">
          <p class="mb-2">Nova versão 2.5.0 disponível com melhorias.</p>
          <div class="d-flex gap-2">
            <button class="btn btn-success btn-sm">Atualizar Agora</button>
            <button class="btn btn-link btn-sm text-muted">Depois</button>
          </div>
        </div>
      </div>
      
      <!-- Toast de desfazer -->
      <div class="toast show bg-dark text-white" role="alert">
        <div class="toast-body d-flex justify-content-between align-items-center">
          <span><i class="bi bi-trash me-2"></i>Aluno excluído</span>
          <button class="btn btn-link btn-sm text-warning p-0">Desfazer</button>
        </div>
      </div>
    </div>
  `
};

// Story: Posicionamento de Toasts
export const ToastPositions = {
  name: '📍 Posicionamento',
  render: () => `
    <div class="position-relative bg-light rounded" style="min-height: 400px;">
      <!-- Top Right -->
      <div class="position-absolute top-0 end-0 p-3">
        <div class="toast show" role="alert" style="width: 250px;">
          <div class="toast-header bg-success text-white">
            <strong class="me-auto">Top Right</strong>
            <button type="button" class="btn-close btn-close-white" aria-label="Close"></button>
          </div>
          <div class="toast-body">
            Posição padrão para toasts.
          </div>
        </div>
      </div>
      
      <!-- Top Center -->
      <div class="position-absolute top-0 start-50 translate-middle-x p-3">
        <div class="toast show" role="alert" style="width: 250px;">
          <div class="toast-header bg-info text-white">
            <strong class="me-auto">Top Center</strong>
            <button type="button" class="btn-close btn-close-white" aria-label="Close"></button>
          </div>
          <div class="toast-body">
            Centralizado no topo.
          </div>
        </div>
      </div>
      
      <!-- Bottom Right -->
      <div class="position-absolute bottom-0 end-0 p-3">
        <div class="toast show" role="alert" style="width: 250px;">
          <div class="toast-header bg-warning text-dark">
            <strong class="me-auto">Bottom Right</strong>
            <button type="button" class="btn-close" aria-label="Close"></button>
          </div>
          <div class="toast-body">
            Canto inferior direito.
          </div>
        </div>
      </div>
      
      <!-- Bottom Left -->
      <div class="position-absolute bottom-0 start-0 p-3">
        <div class="toast show" role="alert" style="width: 250px;">
          <div class="toast-header bg-danger text-white">
            <strong class="me-auto">Bottom Left</strong>
            <button type="button" class="btn-close btn-close-white" aria-label="Close"></button>
          </div>
          <div class="toast-body">
            Canto inferior esquerdo.
          </div>
        </div>
      </div>
    </div>
  `
};

// Story: Banners
export const Banners = {
  name: '🏷️ Banners',
  render: () => `
    <div class="d-flex flex-column gap-3">
      <!-- Banner de manutenção -->
      <div class="alert alert-warning mb-0 rounded-0 d-flex align-items-center justify-content-between">
        <div>
          <i class="bi bi-tools me-2"></i>
          <strong>Manutenção programada:</strong> O sistema ficará indisponível amanhã das 02h às 04h.
        </div>
        <button type="button" class="btn-close" aria-label="Close"></button>
      </div>
      
      <!-- Banner de novidade -->
      <div class="alert alert-info mb-0 rounded-0 d-flex align-items-center justify-content-between">
        <div>
          <i class="bi bi-stars me-2"></i>
          <strong>Novidade!</strong> Confira os novos jogos de Matemática disponíveis.
          <a href="#" class="alert-link ms-1">Ver jogos →</a>
        </div>
        <button type="button" class="btn-close" aria-label="Close"></button>
      </div>
      
      <!-- Banner de trial -->
      <div class="alert alert-primary mb-0 rounded-0 d-flex align-items-center justify-content-between">
        <div>
          <i class="bi bi-clock-history me-2"></i>
          Seu período de teste termina em <strong>7 dias</strong>.
        </div>
        <button class="btn btn-primary btn-sm">Assinar Agora</button>
      </div>
      
      <!-- Banner de sucesso -->
      <div class="alert alert-success mb-0 rounded-0 text-center">
        <i class="bi bi-check-circle me-2"></i>
        <strong>Parabéns!</strong> Você completou todas as atividades desta semana! 🎉
      </div>
    </div>
  `
};

// Story: Inline Alerts
export const InlineAlerts = {
  name: '📍 Inline',
  render: () => `
    <div class="card">
      <div class="card-header">
        <h5 class="mb-0">Cadastrar Aluno</h5>
      </div>
      <div class="card-body">
        <!-- Alerta inline de erro -->
        <div class="alert alert-danger py-2 d-flex align-items-center" role="alert">
          <i class="bi bi-exclamation-circle me-2"></i>
          <small>Por favor, corrija os erros destacados abaixo.</small>
        </div>
        
        <form>
          <div class="mb-3">
            <label class="form-label">Nome Completo <span class="text-danger">*</span></label>
            <input type="text" class="form-control is-invalid" placeholder="Digite o nome">
            <div class="invalid-feedback">
              <i class="bi bi-exclamation-circle me-1"></i>
              O nome é obrigatório
            </div>
          </div>
          
          <div class="mb-3">
            <label class="form-label">E-mail</label>
            <input type="email" class="form-control is-invalid" value="email@invalido">
            <div class="invalid-feedback">
              <i class="bi bi-exclamation-circle me-1"></i>
              Digite um e-mail válido
            </div>
          </div>
          
          <div class="mb-3">
            <label class="form-label">Turma <span class="text-danger">*</span></label>
            <select class="form-select is-valid">
              <option value="">Selecione...</option>
              <option selected>5º Ano A</option>
            </select>
            <div class="valid-feedback">
              <i class="bi bi-check-circle me-1"></i>
              Turma selecionada!
            </div>
          </div>
          
          <!-- Alerta inline de dica -->
          <div class="alert alert-light py-2 border" role="alert">
            <i class="bi bi-lightbulb text-warning me-2"></i>
            <small class="text-muted">
              As credenciais de acesso serão enviadas automaticamente para o e-mail do responsável.
            </small>
          </div>
          
          <button type="submit" class="btn btn-primary" disabled>Salvar Aluno</button>
        </form>
      </div>
    </div>
  `
};
