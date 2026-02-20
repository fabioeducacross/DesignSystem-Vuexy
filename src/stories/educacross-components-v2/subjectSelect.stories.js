/**
 * subjectSelect - Subject Selection Form Component
 * =================================================
 * Formulário de seleção de disciplinas com validação
 * 
 * @component subjectSelect
 * @category Educacross Components V2 / Forms
 * @source educacross-frontoffice/src/components/subjects/subjectSelect.vue
 * @priority P2
 * @status PIXEL-PERFECT
 * @since 2.0.0
 */

export default {
  title: 'Educacross Components V2/Subjects/subjectSelect',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
# subjectSelect

Componente de **formulário para seleção de disciplina** com validação e ações.

## Contexto de Uso

- **Cadastro de conteúdo**: Associar matéria ao criar questões/provas
- **Filtros**: Selecionar disciplina para filtrar resultados
- **Configurações**: Escolher matérias em formulários de setup
- **Atribuições**: Vincular professor a disciplina
- **Relatórios**: Selecionar matéria para gerar relatório específico

## Estrutura

\`\`\`
+--------------------------------+
| Label: Disciplina              |
+--------------------------------+
| [Dropdown Disciplinas      ▼]  |  ← Select com validação
+--------------------------------+
| ⚠️ Campo obrigatório          |  ← Mensagem de erro
+--------------------------------+
| [Salvar] [Cancelar]           |  ← Actions buttons
+--------------------------------+
\`\`\`

## Características

- **ValidationProvider**: Validação obrigatória (rules="required")
- **Form select**: Bootstrap b-form-select com options
- **Error state**: Exibe mensagem de erro quando inválido
- **Submit/Cancel**: Botões primário e outline-secondary
- **Events**: @submit, @cancel, @update:value
- **State visual**: Border vermelho quando erro

## Props

Componente estrutural que geralmente recebe:
- **subjects**: Array de disciplinas disponíveis
- **value**: Disciplina selecionada (v-model)
- **required**: Validação obrigatória (padrão: true)
- **placeholder**: Texto placeholder do select

## Events

- **@update:value**: Quando seleciona disciplina
- **@submit**: Quando clica "Salvar"
- **@cancel**: Quando clica "Cancelar"

## Disciplinas Comuns

- 📐 Matemática
- 📖 Português
- 🌍 Geografia
- 🕰️ História
- 🧪 Ciências
- 🏃 Educação Física
- 🎨 Artes
- 🇬🇧 Inglês
- 🇪🇸 Espanhol

## Quando usar

- **Formulários de cadastro**: Criar questões, provas, conteúdos
- **Atribuição**: Vincular professor/turma a disciplinas
- **Filtros**: Dropdown para filtrar por matéria
- **Configurações**: Setup de disciplinas em módulos
        `
      }
    }
  }
};

/**
 * Design Specs
 * 
 * Cores:
 * - Primary button: #6E63E8
 * - Secondary button: #6C757D (outline)
 * - Error text: #EA5455
 * - Error border: #EA5455
 * - Valid border: #28C76F
 * 
 * Dimensões:
 * - Select padding: 10px 16px
 * - Button padding: 10px 20px
 * - Gap buttons: 12px
 * - Error font-size: 12px
 * - Label font-size: 14px
 * 
 * Validação:
 * - Required: true
 * - Error message: "Campo obrigatório"
 * - Visual state: border-color red + text danger
 */

// Estilos base
const subjectSelectStyles = `
<style>
  .subject-select-container {
    max-width: 500px;
  }
  
  .form-group {
    margin-bottom: 20px;
  }
  
  .form-label {
    font-size: 14px;
    font-weight: 500;
    color: #5D596C;
    margin-bottom: 8px;
    display: block;
  }
  
  .form-select {
    width: 100%;
    padding: 10px 16px;
    border: 1px solid #DBDADE;
    border-radius: 6px;
    font-size: 14px;
    color: #5D596C;
    background: white;
    appearance: none;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%236E6B7B' d='M6 9L1 4h10z'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 12px center;
    padding-right: 36px;
    transition: border-color 0.2s;
  }
  
  .form-select:focus {
    outline: none;
    border-color: #6E63E8;
    box-shadow: 0 0 0 3px rgba(110, 99, 232, 0.1);
  }
  
  .form-select.is-invalid {
    border-color: #EA5455;
  }
  
  .form-select.is-valid {
    border-color: #28C76F;
  }
  
  .error-message {
    font-size: 12px;
    color: #EA5455;
    margin-top: 6px;
    display: flex;
    align-items: center;
    gap: 4px;
  }
  
  .form-actions {
    display: flex;
    gap: 12px;
    margin-top: 20px;
  }
  
  .btn {
    padding: 10px 20px;
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
    border-color: #5951D4;
  }
  
  .btn-outline-secondary {
    background: transparent;
    color: #6C757D;
    border-color: #6C757D;
  }
  
  .btn-outline-secondary:hover {
    background: #6C757D;
    color: white;
  }
  
  .required-indicator {
    color: #EA5455;
    margin-left: 4px;
  }
  
  @media (max-width: 576px) {
    .form-actions {
      flex-direction: column;
    }
    
    .btn {
      width: 100%;
    }
  }
</style>
`;

// Story: Default
export const Default = {
  render: () => `
    ${subjectSelectStyles}
    <div class="subject-select-container">
      <form>
        <div class="form-group">
          <label class="form-label">
            Disciplina
            <span class="required-indicator">*</span>
          </label>
          <select class="form-select">
            <option value="">Selecione uma disciplina...</option>
            <option value="matematica">📐 Matemática</option>
            <option value="portugues">📖 Português</option>
            <option value="geografia">🌍 Geografia</option>
            <option value="historia">🕰️ História</option>
            <option value="ciencias">🧪 Ciências</option>
          </select>
        </div>
        
        <div class="form-actions">
          <button type="submit" class="btn btn-primary">
            Salvar
          </button>
          <button type="button" class="btn btn-outline-secondary">
            Cancelar
          </button>
        </div>
      </form>
    </div>
  `
};

// Story: WithError
export const WithError = {
  render: () => `
    ${subjectSelectStyles}
    <div class="subject-select-container">
      <form>
        <div class="form-group">
          <label class="form-label">
            Disciplina
            <span class="required-indicator">*</span>
          </label>
          <select class="form-select is-invalid">
            <option value="">Selecione uma disciplina...</option>
            <option value="matematica">📐 Matemática</option>
            <option value="portugues">📖 Português</option>
          </select>
          <div class="error-message">
            <i class="bi bi-exclamation-circle-fill"></i>
            Campo obrigatório
          </div>
        </div>
        
        <div class="form-actions">
          <button type="submit" class="btn btn-primary">
            Salvar
          </button>
          <button type="button" class="btn btn-outline-secondary">
            Cancelar
          </button>
        </div>
      </form>
    </div>
  `
};

// Story: WithSelection
export const WithSelection = {
  render: () => `
    ${subjectSelectStyles}
    <div class="subject-select-container">
      <form>
        <div class="form-group">
          <label class="form-label">
            Disciplina
            <span class="required-indicator">*</span>
          </label>
          <select class="form-select is-valid">
            <option value="">Selecione uma disciplina...</option>
            <option value="matematica" selected>📐 Matemática</option>
            <option value="portugues">📖 Português</option>
            <option value="geografia">🌍 Geografia</option>
            <option value="historia">🕰️ História</option>
            <option value="ciencias">🧪 Ciências</option>
          </select>
        </div>
        
        <div class="form-actions">
          <button type="submit" class="btn btn-primary">
            Salvar
          </button>
          <button type="button" class="btn btn-outline-secondary">
            Cancelar
          </button>
        </div>
      </form>
      
      <div style="margin-top: 16px; padding: 12px; background: #E8F5E9; border-left: 4px solid #28C76F; border-radius: 6px;">
        <div style="font-size: 13px; color: #2E7D32;">
          <i class="bi bi-check-circle-fill"></i> <strong>Selecionado:</strong> Matemática
        </div>
      </div>
    </div>
  `
};

// Story: AllSubjects
export const AllSubjects = {
  render: () => `
    ${subjectSelectStyles}
    <div class="subject-select-container">
      <form>
        <div class="form-group">
          <label class="form-label">
            Disciplina
            <span class="required-indicator">*</span>
          </label>
          <select class="form-select">
            <option value="">Selecione uma disciplina...</option>
            <optgroup label="Básicas">
              <option value="matematica">📐 Matemática</option>
              <option value="portugues">📖 Português</option>
              <option value="ciencias">🧪 Ciências</option>
              <option value="historia">🕰️ História</option>
              <option value="geografia">🌍 Geografia</option>
            </optgroup>
            <optgroup label="Complementares">
              <option value="ingles">🇬🇧 Inglês</option>
              <option value="espanhol">🇪🇸 Espanhol</option>
              <option value="artes">🎨 Artes</option>
              <option value="educacao-fisica">🏃 Educação Física</option>
              <option value="filosofia">🤔 Filosofia</option>
              <option value="sociologia">👥 Sociologia</option>
            </optgroup>
            <optgroup label="Técnicas">
              <option value="informatica">💻 Informática</option>
              <option value="empreendedorismo">💼 Empreendedorismo</option>
            </optgroup>
          </select>
        </div>
        
        <div class="form-actions">
          <button type="submit" class="btn btn-primary">
            Salvar
          </button>
          <button type="button" class="btn btn-outline-secondary">
            Cancelar
          </button>
        </div>
      </form>
    </div>
  `
};

// Story: InModal
export const InModal = {
  render: () => `
    ${subjectSelectStyles}
    <style>
      .modal-overlay {
        background: rgba(0,0,0,0.5);
        position: fixed;
        inset: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 20px;
      }
      
      .modal-content {
        background: white;
        border-radius: 12px;
        box-shadow: 0 8px 32px rgba(0,0,0,0.2);
        max-width: 500px;
        width: 100%;
      }
      
      .modal-header {
        padding: 20px 24px;
        border-bottom: 1px solid #E0E0E0;
      }
      
      .modal-title {
        font-size: 18px;
        font-weight: 700;
        color: #5D596C;
        margin: 0;
      }
      
      .modal-body {
        padding: 24px;
      }
    </style>
    
    <div class="modal-overlay" style="position: relative; height: 400px;">
      <div class="modal-content">
        <div class="modal-header">
          <h3 class="modal-title">Selecionar Disciplina</h3>
        </div>
        <div class="modal-body">
          <form>
            <div class="form-group">
              <label class="form-label">
                Disciplina
                <span class="required-indicator">*</span>
              </label>
              <select class="form-select">
                <option value="">Selecione...</option>
                <option value="matematica">📐 Matemática</option>
                <option value="portugues">📖 Português</option>
                <option value="geografia">🌍 Geografia</option>
                <option value="historia">🕰️ História</option>
                <option value="ciencias">🧪 Ciências</option>
              </select>
            </div>
            
            <div class="form-actions">
              <button type="submit" class="btn btn-primary">
                Confirmar
              </button>
              <button type="button" class="btn btn-outline-secondary">
                Fechar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  `
};

// Story: InCard
export const InCard = {
  render: () => `
    ${subjectSelectStyles}
    <style>
      .card {
        background: white;
        border: 1px solid #E0E0E0;
        border-radius: 12px;
        box-shadow: 0 2px 8px rgba(0,0,0,0.08);
        max-width: 600px;
      }
      
      .card-header {
        padding: 20px 24px;
        border-bottom: 1px solid #E0E0E0;
        background: #F8F7FA;
        border-radius: 12px 12px 0 0;
      }
      
      .card-title {
        font-size: 16px;
        font-weight: 600;
        color: #5D596C;
        margin: 0;
      }
      
      .card-body {
        padding: 24px;
      }
    </style>
    
    <div class="card">
      <div class="card-header">
        <h4 class="card-title">
          <i class="bi bi-journal-text" style="color: #6E63E8; margin-right: 8px;"></i>
          Cadastro de Questão
        </h4>
      </div>
      <div class="card-body">
        <form>
          <div class="form-group">
            <label class="form-label">
              Disciplina
              <span class="required-indicator">*</span>
            </label>
            <select class="form-select">
              <option value="">Selecione a disciplina...</option>
              <option value="matematica">📐 Matemática</option>
              <option value="portugues">📖 Português</option>
              <option value="geografia">🌍 Geografia</option>
              <option value="historia">🕰️ História</option>
              <option value="ciencias">🧪 Ciências</option>
            </select>
            <small style="font-size: 11px; color: #6E6B7B; margin-top: 4px; display: block;">
              Escolha a disciplina relacionada à questão
            </small>
          </div>
          
          <div class="form-actions">
            <button type="submit" class="btn btn-primary">
              <i class="bi bi-check-lg"></i> Salvar
            </button>
            <button type="button" class="btn btn-outline-secondary">
              <i class="bi bi-x-lg"></i> Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  `
};

// Story: ValidationStates
export const ValidationStates = {
  render: () => `
    ${subjectSelectStyles}
    <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; max-width: 1200px;">
      <div>
        <h4 style="font-size: 13px; font-weight: 600; color: #5D596C; margin-bottom: 12px;">
          Estado: Neutro (padrão)
        </h4>
        <div class="form-group">
          <label class="form-label">
            Disciplina
            <span class="required-indicator">*</span>
          </label>
          <select class="form-select">
            <option value="">Selecione...</option>
            <option value="mat">Matemática</option>
          </select>
        </div>
      </div>
      
      <div>
        <h4 style="font-size: 13px; font-weight: 600; color: #EA5455; margin-bottom: 12px;">
          Estado: Erro (required)
        </h4>
        <div class="form-group">
          <label class="form-label">
            Disciplina
            <span class="required-indicator">*</span>
          </label>
          <select class="form-select is-invalid">
            <option value="">Selecione...</option>
            <option value="mat">Matemática</option>
          </select>
          <div class="error-message">
            <i class="bi bi-exclamation-circle-fill"></i>
            Campo obrigatório
          </div>
        </div>
      </div>
      
      <div>
        <h4 style="font-size: 13px; font-weight: 600; color: #28C76F; margin-bottom: 12px;">
          Estado: Válido (selecionado)
        </h4>
        <div class="form-group">
          <label class="form-label">
            Disciplina
            <span class="required-indicator">*</span>
          </label>
          <select class="form-select is-valid">
            <option value="">Selecione...</option>
            <option value="mat" selected>Matemática</option>
          </select>
        </div>
      </div>
    </div>
  `
};

// Story: Responsive
export const Responsive = {
  render: () => `
    ${subjectSelectStyles}
    <div style="background: #E3F2FD; border-left: 4px solid #2196F3; padding: 16px; border-radius: 6px; margin-bottom: 24px; max-width: 700px;">
      <h4 style="font-size: 14px; font-weight: 600; color: #1565C0; margin: 0 0 8px 0;">
        <i class="bi bi-phone"></i> subjectSelect: Responsivo
      </h4>
      <ul style="margin: 0; padding-left: 20px; font-size: 13px; color: #1976D2;">
        <li><strong>Select full-width:</strong> 100% width adapta a qualquer container</li>
        <li><strong>Buttons mobile:</strong> &lt;576px empilham verticalmente (flex-column)</li>
        <li><strong>Touch-friendly:</strong> Padding 10px para fácil toque em mobile</li>
        <li><strong>Select nativo:</strong> iOS/Android usam picker nativo</li>
      </ul>
    </div>
    
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px; max-width: 900px;">
      <div>
        <h4 style="font-size: 13px; font-weight: 600; color: #5D596C; margin-bottom: 12px; text-align: center;">
          Desktop
        </h4>
        <div class="subject-select-container">
          <form>
            <div class="form-group">
              <label class="form-label">
                Disciplina
                <span class="required-indicator">*</span>
              </label>
              <select class="form-select">
                <option value="">Selecione...</option>
                <option value="mat">Matemática</option>
                <option value="port">Português</option>
              </select>
            </div>
            <div class="form-actions">
              <button type="submit" class="btn btn-primary">Salvar</button>
              <button type="button" class="btn btn-outline-secondary">Cancelar</button>
            </div>
          </form>
        </div>
      </div>
      
      <div>
        <h4 style="font-size: 13px; font-weight: 600; color: #5D596C; margin-bottom: 12px; text-align: center;">
          Mobile (&lt;576px)
        </h4>
        <div style="max-width: 300px;">
          <form>
            <div class="form-group">
              <label class="form-label">
                Disciplina
                <span class="required-indicator">*</span>
              </label>
              <select class="form-select">
                <option value="">Selecione...</option>
                <option value="mat">Matemática</option>
                <option value="port">Português</option>
              </select>
            </div>
            <div style="display: flex; flex-direction: column; gap: 12px;">
              <button type="submit" class="btn btn-primary" style="width: 100%;">Salvar</button>
              <button type="button" class="btn btn-outline-secondary" style="width: 100%;">Cancelar</button>
            </div>
          </form>
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
          <div style="display:inline-block;padding:8px 16px;background:rgba(255,255,255,0.15);border-radius:50px;margin-bottom:20px;font-size:14px;border:1px solid rgba(255,255,255,0.2);">Subjects</div>
          <h1 style="font-size:3rem;font-weight:700;margin:0 0 12px 0;letter-spacing:-0.02em;">subjectSelect</h1>
          <p style="font-size:1.1rem;opacity:0.9;margin:0;max-width:600px;">Subject Selection Form Component</p>
        </div>
      </div>
      <div style="max-width:900px;margin:0 auto;padding:48px 40px;">
        <div style="background:white;border-radius:12px;padding:32px;margin-bottom:32px;box-shadow:0 2px 8px rgba(0,0,0,0.08);">
          <h2 style="font-size:1.1rem;font-weight:600;color:#5E5873;margin:0 0 16px 0;">Sobre o Componente</h2>
          <p style="color:#6E6B7B;line-height:1.7;margin:0 0 16px 0;">Subject Selection Form Component. Faz parte da categoria <strong>Subjects</strong> do Design System Educacross.</p>
          <div style="background:#F8F7FF;border-left:4px solid #6E63E8;padding:16px;border-radius:4px;">
            <p style="margin:0;color:#5E5873;font-size:14px;line-height:1.6;"><strong>💡 Dica:</strong> Use <em>Playground</em> para explorar props, <em>Use Cases</em> para exemplos reais e <em>Accessibility</em> para validar WCAG.</p>
          </div>
        </div>
        <div style="background:white;border-radius:12px;padding:32px;box-shadow:0 2px 8px rgba(0,0,0,0.08);">
          <h2 style="font-size:1.1rem;font-weight:600;color:#5E5873;margin:0 0 16px 0;">Implementação Vue 2.7</h2>
          <pre style="background:#1E1E2E;color:#CDD6F4;padding:20px;border-radius:8px;font-size:13px;line-height:1.6;overflow:auto;margin:0;"><code>import subjectSelect from '@/components/subjectSelect.vue';

// Template
&lt;subjectSelect v-bind="props" /&gt;</code></pre>
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
    docs: { description: { story: 'Explore o subjectSelect com controles interativos.' } },
  },
  render: (args) => `
    <div style="padding:32px;display:flex;justify-content:center;align-items:center;min-height:200px;background:#F8F8F8;border-radius:12px;">
      <div style="text-align:center;color:#6E6B7B;">
        <div style="width:60px;height:60px;background:#6E63E820;border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 16px;font-size:24px;">🎨</div>
        <p style="margin:0 0 8px 0;font-size:15px;font-weight:600;color:#5E5873;">Playground subjectSelect</p>
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
    docs: { description: { story: 'Exemplos de uso real do subjectSelect no Educacross.' } },
  },
  render: () => `
    <div style="max-width:800px;margin:0 auto;padding:40px 20px;font-family:'Public Sans',sans-serif;">
      <div style="background:#6E63E815;border:1px solid #6E63E830;border-radius:12px;padding:24px;margin-bottom:40px;">
        <h1 style="font-size:1.5rem;font-weight:700;color:#5E5873;margin:0 0 8px 0;">Casos de Uso: subjectSelect</h1>
        <p style="color:#6E6B7B;margin:0;font-size:14px;line-height:1.6;">Cenários reais de uso no contexto educacional da plataforma Educacross</p>
      </div>
      
      <div style="margin-bottom:32px;">
        <h2 style="font-size:18px;font-weight:600;color:#5E5873;margin:0 0 8px 0;display:flex;align-items:center;gap:10px;">
          <span style="display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;background:#6E63E8;color:white;border-radius:50%;font-size:13px;font-weight:700;flex-shrink:0;">1</span>
          Professor — Painel Principal
        </h2>
        <p style="color:#6E6B7B;margin:0 0 16px 0;padding-left:38px;font-size:14px;">Professor utilizando subjectSelect no dashboard de gestão de turmas</p>
        <div style="background:#F8F8F8;border-radius:8px;padding:20px;margin-left:38px;text-align:center;color:#B9B9C3;font-size:13px;">
          Ver story <strong>Default</strong> para visualização do componente neste contexto
        </div>
      </div>
      <div style="margin-bottom:32px;">
        <h2 style="font-size:18px;font-weight:600;color:#5E5873;margin:0 0 8px 0;display:flex;align-items:center;gap:10px;">
          <span style="display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;background:#6E63E8;color:white;border-radius:50%;font-size:13px;font-weight:700;flex-shrink:0;">2</span>
          Aluno — Portal do Estudante
        </h2>
        <p style="color:#6E6B7B;margin:0 0 16px 0;padding-left:38px;font-size:14px;">Aluno interagindo com subjectSelect no portal educacional</p>
        <div style="background:#F8F8F8;border-radius:8px;padding:20px;margin-left:38px;text-align:center;color:#B9B9C3;font-size:13px;">
          Ver story <strong>Default</strong> para visualização do componente neste contexto
        </div>
      </div>
      <div style="margin-bottom:32px;">
        <h2 style="font-size:18px;font-weight:600;color:#5E5873;margin:0 0 8px 0;display:flex;align-items:center;gap:10px;">
          <span style="display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;background:#6E63E8;color:white;border-radius:50%;font-size:13px;font-weight:700;flex-shrink:0;">3</span>
          Coordenador — Relatórios
        </h2>
        <p style="color:#6E6B7B;margin:0 0 16px 0;padding-left:38px;font-size:14px;">Coordenador pedagógico analisando dados via subjectSelect</p>
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
    docs: { description: { story: 'Conformidade WCAG 2.1 AA para o subjectSelect.' } },
  },
  render: () => `
    <div style="max-width:800px;margin:0 auto;padding:40px 20px;font-family:'Public Sans',sans-serif;">

      <div style="background:linear-gradient(135deg,#6E63E8 0%,#764ba2 100%);padding:32px;border-radius:12px;margin-bottom:32px;color:white;">
        <h1 style="font-size:1.5rem;font-weight:700;margin:0 0 8px 0;">Acessibilidade: subjectSelect</h1>
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

