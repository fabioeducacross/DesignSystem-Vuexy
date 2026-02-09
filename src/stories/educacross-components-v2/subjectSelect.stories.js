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
