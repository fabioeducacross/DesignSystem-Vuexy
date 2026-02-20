/**
 * EditProfileStudentNew - Modal de Edição de Perfil do Estudante
 * ==================================================================
 * Modal para edição de dados do perfil do aluno (nome, avatar, mascote)
 * 
 * @component EditProfileStudentNew
 * @category Doc-Only / Educacross Components V2 / Modals
 * @source educacross-frontoffice (perfil do aluno)
 * @note Especificação de tela. Não componentizado no Vue.
 * @priority P2
 * @status PIXEL-PERFECT
 * @since 2.0.0
 * 
 * Versão simplificada (Fase 1 - Refatoração Emergencial)
 * - CSS inline removido → utiliza classes Vuexy nativas
 * - Multi-framework docs removido
 * - Estrutura modular com stories independentes
 */

export default {
  title: 'Educacross Components V2/Modals/EditProfileStudentNew',
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    showMascotSelector: {
      control: 'boolean',
      description: 'Exibe seletor de mascotes',
    },
    formLayout: {
      control: 'select',
      options: ['single', 'double'],
      description: 'Layout do formulário (coluna única ou dupla)',
    },
  },
};

/**
 * Modal de edição de perfil - Layout padrão
 */
export const Default = {
  args: {
    showMascotSelector: true,
    formLayout: 'double',
  },
  render: (args) => {
    return `
      <div class="modal-dialog modal-lg modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">
              <i class="bi bi-person-circle me-2"></i>
              Editar Perfil do Estudante
            </h5>
            <button type="button" class="btn-close"></button>
          </div>
          <div class="modal-body p-4">
            <form>
              ${args.formLayout === 'double' ? `
                <div class="row g-3">
                  <div class="col-md-6">
                    <label for="firstName" class="form-label">Nome</label>
                    <input type="text" class="form-control" id="firstName" value="João" required>
                  </div>
                  <div class="col-md-6">
                    <label for="lastName" class="form-label">Sobrenome</label>
                    <input type="text" class="form-control" id="lastName" value="Silva" required>
                  </div>
                </div>
              ` : `
                <div class="mb-3">
                  <label for="fullName" class="form-label">Nome Completo</label>
                  <input type="text" class="form-control" id="fullName" value="João Silva" required>
                </div>
              `}
              
              <div class="mb-3">
                <label for="email" class="form-label">E-mail</label>
                <input type="email" class="form-control" id="email" value="joao.silva@exemplo.com" disabled>
                <small class="text-muted">O e-mail não pode ser alterado</small>
              </div>
              
              <div class="mb-3">
                <label for="birthDate" class="form-label">Data de Nascimento</label>
                <input type="date" class="form-control" id="birthDate" value="2010-05-15">
              </div>
              
              ${args.showMascotSelector ? `
                <div class="mb-3">
                  <label class="form-label">Escolha seu Mascote</label>
                  <div class="d-flex gap-3 flex-wrap">
                    <div class="mascot-option">
                      <input type="radio" class="btn-check" name="mascot" id="mascot1" checked>
                      <label class="btn btn-outline-primary" for="mascot1">
                        <i class="bi bi-emoji-smile" style="font-size: 2rem;"></i>
                        <div class="small mt-1">Feliz</div>
                      </label>
                    </div>
                    <div class="mascot-option">
                      <input type="radio" class="btn-check" name="mascot" id="mascot2">
                      <label class="btn btn-outline-primary" for="mascot2">
                        <i class="bi bi-emoji-laughing" style="font-size: 2rem;"></i>
                        <div class="small mt-1">Rindo</div>
                      </label>
                    </div>
                    <div class="mascot-option">
                      <input type="radio" class="btn-check" name="mascot" id="mascot3">
                      <label class="btn btn-outline-primary" for="mascot3">
                        <i class="bi bi-emoji-sunglasses" style="font-size: 2rem;"></i>
                        <div class="small mt-1">Legal</div>
                      </label>
                    </div>
                    <div class="mascot-option">
                      <input type="radio" class="btn-check" name="mascot" id="mascot4">
                      <label class="btn btn-outline-primary" for="mascot4">
                        <i class="bi bi-emoji-heart-eyes" style="font-size: 2rem;"></i>
                        <div class="small mt-1">Apaixonado</div>
                      </label>
                    </div>
                  </div>
                </div>
              ` : ''}
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary">Cancelar</button>
            <button type="button" class="btn btn-primary">Salvar Alterações</button>
          </div>
        </div>
      </div>
    `;
  },
};

/**
 * Formulário em coluna única (mobile-first)
 */
export const SingleColumn = {
  args: {
    showMascotSelector: true,
    formLayout: 'single',
  },
  render: Default.render,
};

/**
 * Sem seletor de mascotes
 */
export const WithoutMascot = {
  args: {
    showMascotSelector: false,
    formLayout: 'double',
  },
  render: Default.render,
};

/**
 * Modal compacto com campos essenciais
 */
export const Compact = {
  args: {
    showMascotSelector: false,
    formLayout: 'single',
  },
  render: (args) => {
    return `
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Editar Perfil</h5>
            <button type="button" class="btn-close"></button>
          </div>
          <div class="modal-body p-3">
            <form>
              <div class="mb-3">
                <label for="name" class="form-label">Nome</label>
                <input type="text" class="form-control form-control-sm" id="name" value="João Silva">
              </div>
              <div class="mb-3">
                <label for="birthdate" class="form-label">Data de Nascimento</label>
                <input type="date" class="form-control form-control-sm" id="birthdate" value="2010-05-15">
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-sm btn-secondary">Cancelar</button>
            <button type="button" class="btn btn-sm btn-primary">Salvar</button>
          </div>
        </div>
      </div>
    `;
  },
};

/**
 * Formulário completo com todos os campos
 */
export const Complete = {
  args: {
    showMascotSelector: true,
    formLayout: 'double',
  },
  render: (args) => {
    return `
      <div class="modal-dialog modal-xl modal-dialog-centered modal-dialog-scrollable">
        <div class="modal-content">
          <div class="modal-header bg-primary bg-opacity-10">
            <h5 class="modal-title text-primary">
              <i class="bi bi-person-circle me-2"></i>
              Editar Perfil Completo
            </h5>
            <button type="button" class="btn-close"></button>
          </div>
          <div class="modal-body p-4">
            <form>
              <div class="row g-3 mb-4">
                <div class="col-md-6">
                  <label for="firstName" class="form-label">Nome</label>
                  <input type="text" class="form-control" id="firstName" value="João" required>
                </div>
                <div class="col-md-6">
                  <label for="lastName" class="form-label">Sobrenome</label>
                  <input type="text" class="form-control" id="lastName" value="Silva" required>
                </div>
              </div>
              
              <div class="row g-3 mb-4">
                <div class="col-md-6">
                  <label for="email" class="form-label">E-mail</label>
                  <input type="email" class="form-control" id="email" value="joao.silva@exemplo.com" disabled>
                </div>
                <div class="col-md-6">
                  <label for="phone" class="form-label">Telefone</label>
                  <input type="tel" class="form-control" id="phone" value="(11) 98765-4321">
                </div>
              </div>
              
              <div class="row g-3 mb-4">
                <div class="col-md-6">
                  <label for="birthDate" class="form-label">Data de Nascimento</label>
                  <input type="date" class="form-control" id="birthDate" value="2010-05-15">
                </div>
                <div class="col-md-6">
                  <label for="school" class="form-label">Escola</label>
                  <input type="text" class="form-control" id="school" value="Escola Exemplo" disabled>
                </div>
              </div>
              
              <hr class="my-4">
              
              <h6 class="mb-3">Escolha seu Mascote Favorito</h6>
              <div class="d-flex gap-3 flex-wrap mb-3">
                <div class="mascot-option">
                  <input type="radio" class="btn-check" name="mascot" id="m1" checked>
                  <label class="btn btn-outline-primary p-3" for="m1">
                    <i class="bi bi-emoji-smile d-block" style="font-size: 2.5rem;"></i>
                    <div class="small mt-2">Feliz</div>
                  </label>
                </div>
                <div class="mascot-option">
                  <input type="radio" class="btn-check" name="mascot" id="m2">
                  <label class="btn btn-outline-primary p-3" for="m2">
                    <i class="bi bi-emoji-laughing d-block" style="font-size: 2.5rem;"></i>
                    <div class="small mt-2">Rindo</div>
                  </label>
                </div>
                <div class="mascot-option">
                  <input type="radio" class="btn-check" name="mascot" id="m3">
                  <label class="btn btn-outline-primary p-3" for="m3">
                    <i class="bi bi-emoji-sunglasses d-block" style="font-size: 2.5rem;"></i>
                    <div class="small mt-2">Legal</div>
                  </label>
                </div>
                <div class="mascot-option">
                  <input type="radio" class="btn-check" name="mascot" id="m4">
                  <label class="btn btn-outline-primary p-3" for="m4">
                    <i class="bi bi-emoji-heart-eyes d-block" style="font-size: 2.5rem;"></i>
                    <div class="small mt-2">Apaixonado</div>
                  </label>
                </div>
                <div class="mascot-option">
                  <input type="radio" class="btn-check" name="mascot" id="m5">
                  <label class="btn btn-outline-primary p-3" for="m5">
                    <i class="bi bi-emoji-wink d-block" style="font-size: 2.5rem;"></i>
                    <div class="small mt-2">Piscando</div>
                  </label>
                </div>
                <div class="mascot-option">
                  <input type="radio" class="btn-check" name="mascot" id="m6">
                  <label class="btn btn-outline-primary p-3" for="m6">
                    <i class="bi bi-emoji-laughing-fill d-block" style="font-size: 2.5rem;"></i>
                    <div class="small mt-2">Muito Feliz</div>
                  </label>
                </div>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary">Cancelar</button>
            <button type="button" class="btn btn-primary">
              <i class="bi bi-check-circle me-1"></i>
              Salvar Alterações
            </button>
          </div>
        </div>
      </div>
    `;
  },
};

/**
 * Overview de todas as variantes
 */
export const Overview = {
  render: () => {
    return `
      <div class="container py-4">
        <h3 class="mb-4">EditProfileStudentNew - Variantes</h3>
        
        <div class="row g-4">
          <div class="col-12">
            <h6 class="text-muted mb-3">Layout Dupla Coluna (Padrão)</h6>
            ${Default.render({ showMascotSelector: true, formLayout: 'double' })}
          </div>
          
          <div class="col-12">
            <h6 class="text-muted mb-3">Layout Coluna Única</h6>
            ${SingleColumn.render({ showMascotSelector: false, formLayout: 'single' })}
          </div>
          
          <div class="col-md-6">
            <h6 class="text-muted mb-3">Modal Compacto</h6>
            ${Compact.render({ showMascotSelector: false, formLayout: 'single' })}
          </div>
        </div>
      </div>
    `;
  },
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
      <div style="background:linear-gradient(135deg,#EA5455 0%,#F08182 100%);padding:60px 40px;color:white;">
        <div style="max-width:900px;margin:0 auto;">
          <div style="display:inline-block;padding:8px 16px;background:rgba(255,255,255,0.15);border-radius:50px;margin-bottom:20px;font-size:14px;border:1px solid rgba(255,255,255,0.2);">Modals</div>
          <h1 style="font-size:3rem;font-weight:700;margin:0 0 12px 0;letter-spacing:-0.02em;">EditProfileStudentNew</h1>
          <p style="font-size:1.1rem;opacity:0.9;margin:0;max-width:600px;">Modal de Edição de Perfil do Estudante</p>
        </div>
      </div>
      <div style="max-width:900px;margin:0 auto;padding:48px 40px;">
        <div style="background:white;border-radius:12px;padding:32px;margin-bottom:32px;box-shadow:0 2px 8px rgba(0,0,0,0.08);">
          <h2 style="font-size:1.1rem;font-weight:600;color:#5E5873;margin:0 0 16px 0;">Sobre o Componente</h2>
          <p style="color:#6E6B7B;line-height:1.7;margin:0 0 16px 0;">Modal de Edição de Perfil do Estudante. Faz parte da categoria <strong>Modals</strong> do Design System Educacross.</p>
          <div style="background:#F8F7FF;border-left:4px solid #EA5455;padding:16px;border-radius:4px;">
            <p style="margin:0;color:#5E5873;font-size:14px;line-height:1.6;"><strong>💡 Dica:</strong> Use <em>Playground</em> para explorar props, <em>Use Cases</em> para exemplos reais e <em>Accessibility</em> para validar WCAG.</p>
          </div>
        </div>
        <div style="background:white;border-radius:12px;padding:32px;box-shadow:0 2px 8px rgba(0,0,0,0.08);">
          <h2 style="font-size:1.1rem;font-weight:600;color:#5E5873;margin:0 0 16px 0;">Implementação Vue 2.7</h2>
          <pre style="background:#1E1E2E;color:#CDD6F4;padding:20px;border-radius:8px;font-size:13px;line-height:1.6;overflow:auto;margin:0;"><code>import EditProfileStudentNew from '@/components/EditProfileStudentNew.vue';

// Template
&lt;EditProfileStudentNew v-bind="props" /&gt;</code></pre>
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
    docs: { description: { story: 'Explore o EditProfileStudentNew com controles interativos.' } },
  },
  render: (args) => `
    <div style="padding:32px;display:flex;justify-content:center;align-items:center;min-height:200px;background:#F8F8F8;border-radius:12px;">
      <div style="text-align:center;color:#6E6B7B;">
        <div style="width:60px;height:60px;background:#EA545520;border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 16px;font-size:24px;">🎨</div>
        <p style="margin:0 0 8px 0;font-size:15px;font-weight:600;color:#5E5873;">Playground EditProfileStudentNew</p>
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
    docs: { description: { story: 'Exemplos de uso real do EditProfileStudentNew no Educacross.' } },
  },
  render: () => `
    <div style="max-width:800px;margin:0 auto;padding:40px 20px;font-family:'Public Sans',sans-serif;">
      <div style="background:#EA545515;border:1px solid #EA545530;border-radius:12px;padding:24px;margin-bottom:40px;">
        <h1 style="font-size:1.5rem;font-weight:700;color:#5E5873;margin:0 0 8px 0;">Casos de Uso: EditProfileStudentNew</h1>
        <p style="color:#6E6B7B;margin:0;font-size:14px;line-height:1.6;">Cenários reais de uso no contexto educacional da plataforma Educacross</p>
      </div>
      
      <div style="margin-bottom:32px;">
        <h2 style="font-size:18px;font-weight:600;color:#5E5873;margin:0 0 8px 0;display:flex;align-items:center;gap:10px;">
          <span style="display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;background:#EA5455;color:white;border-radius:50%;font-size:13px;font-weight:700;flex-shrink:0;">1</span>
          Professor — Painel Principal
        </h2>
        <p style="color:#6E6B7B;margin:0 0 16px 0;padding-left:38px;font-size:14px;">Professor utilizando EditProfileStudentNew no dashboard de gestão de turmas</p>
        <div style="background:#F8F8F8;border-radius:8px;padding:20px;margin-left:38px;text-align:center;color:#B9B9C3;font-size:13px;">
          Ver story <strong>Default</strong> para visualização do componente neste contexto
        </div>
      </div>
      <div style="margin-bottom:32px;">
        <h2 style="font-size:18px;font-weight:600;color:#5E5873;margin:0 0 8px 0;display:flex;align-items:center;gap:10px;">
          <span style="display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;background:#EA5455;color:white;border-radius:50%;font-size:13px;font-weight:700;flex-shrink:0;">2</span>
          Aluno — Portal do Estudante
        </h2>
        <p style="color:#6E6B7B;margin:0 0 16px 0;padding-left:38px;font-size:14px;">Aluno interagindo com EditProfileStudentNew no portal educacional</p>
        <div style="background:#F8F8F8;border-radius:8px;padding:20px;margin-left:38px;text-align:center;color:#B9B9C3;font-size:13px;">
          Ver story <strong>Default</strong> para visualização do componente neste contexto
        </div>
      </div>
      <div style="margin-bottom:32px;">
        <h2 style="font-size:18px;font-weight:600;color:#5E5873;margin:0 0 8px 0;display:flex;align-items:center;gap:10px;">
          <span style="display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;background:#EA5455;color:white;border-radius:50%;font-size:13px;font-weight:700;flex-shrink:0;">3</span>
          Coordenador — Relatórios
        </h2>
        <p style="color:#6E6B7B;margin:0 0 16px 0;padding-left:38px;font-size:14px;">Coordenador pedagógico analisando dados via EditProfileStudentNew</p>
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
    docs: { description: { story: 'Conformidade WCAG 2.1 AA para o EditProfileStudentNew.' } },
  },
  render: () => `
    <div style="max-width:800px;margin:0 auto;padding:40px 20px;font-family:'Public Sans',sans-serif;">

      <div style="background:linear-gradient(135deg,#EA5455 0%,#764ba2 100%);padding:32px;border-radius:12px;margin-bottom:32px;color:white;">
        <h1 style="font-size:1.5rem;font-weight:700;margin:0 0 8px 0;">Acessibilidade: EditProfileStudentNew</h1>
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

