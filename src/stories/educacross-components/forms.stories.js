/**
 * @file Form Elements - Educacross Design System
 * @description Elementos de formulário e inputs
 * 
 * Status: DONE
 * Phase: 1 - Componentes simples
 */

export default {
  title: 'Educacross/Components/Forms',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
## Form Elements

Componentes de formulário para entrada de dados.

### Uso no Educacross
- **Cadastro**: Formulários de alunos, turmas
- **Busca**: Campos de pesquisa
- **Filtros**: Seleção de opções
- **Login**: Autenticação

### Componentes
- Inputs (text, email, password)
- Select/Dropdown
- Checkbox/Radio
- Switch
- Textarea
- Input Groups
        `
      }
    }
  }
};

// Story: Inputs básicos
export const BasicInputs = {
  name: '📝 Inputs Básicos',
  render: () => `
    <div class="row g-4" style="max-width: 600px;">
      <!-- Text -->
      <div class="col-12">
        <label class="form-label">Nome Completo</label>
        <input type="text" class="form-control" placeholder="Digite o nome">
      </div>
      
      <!-- Email -->
      <div class="col-md-6">
        <label class="form-label">E-mail</label>
        <input type="email" class="form-control" placeholder="email@exemplo.com">
      </div>
      
      <!-- Password -->
      <div class="col-md-6">
        <label class="form-label">Senha</label>
        <input type="password" class="form-control" placeholder="••••••••">
      </div>
      
      <!-- Number -->
      <div class="col-md-6">
        <label class="form-label">Idade</label>
        <input type="number" class="form-control" placeholder="10" min="5" max="18">
      </div>
      
      <!-- Date -->
      <div class="col-md-6">
        <label class="form-label">Data de Nascimento</label>
        <input type="date" class="form-control">
      </div>
      
      <!-- Disabled -->
      <div class="col-12">
        <label class="form-label">Campo Desabilitado</label>
        <input type="text" class="form-control" placeholder="Não editável" disabled>
      </div>
      
      <!-- Readonly -->
      <div class="col-12">
        <label class="form-label">Apenas Leitura</label>
        <input type="text" class="form-control" value="Valor fixo" readonly>
      </div>
    </div>
  `
};

// Story: Estados de validação
export const ValidationStates = {
  name: '✅ Estados de Validação',
  render: () => `
    <div class="row g-4" style="max-width: 500px;">
      <!-- Normal -->
      <div class="col-12">
        <label class="form-label">Normal</label>
        <input type="text" class="form-control" placeholder="Campo padrão">
        <div class="form-text">Texto de ajuda opcional.</div>
      </div>
      
      <!-- Válido -->
      <div class="col-12">
        <label class="form-label">Válido</label>
        <input type="text" class="form-control is-valid" value="João Silva">
        <div class="valid-feedback">
          <i class="bi bi-check-circle me-1"></i>
          Nome válido!
        </div>
      </div>
      
      <!-- Inválido -->
      <div class="col-12">
        <label class="form-label">Inválido</label>
        <input type="email" class="form-control is-invalid" value="email@invalido">
        <div class="invalid-feedback">
          <i class="bi bi-exclamation-circle me-1"></i>
          Digite um e-mail válido.
        </div>
      </div>
      
      <!-- Obrigatório -->
      <div class="col-12">
        <label class="form-label">Campo Obrigatório <span class="text-danger">*</span></label>
        <input type="text" class="form-control is-invalid" placeholder="Este campo é obrigatório">
        <div class="invalid-feedback">
          <i class="bi bi-exclamation-circle me-1"></i>
          Este campo é obrigatório.
        </div>
      </div>
    </div>
  `
};

// Story: Tamanhos
export const Sizes = {
  name: '📐 Tamanhos',
  render: () => `
    <div class="d-flex flex-column gap-4" style="max-width: 400px;">
      <!-- Small -->
      <div>
        <label class="form-label">Pequeno (form-control-sm)</label>
        <input type="text" class="form-control form-control-sm" placeholder="Input pequeno">
      </div>
      
      <!-- Default -->
      <div>
        <label class="form-label">Padrão</label>
        <input type="text" class="form-control" placeholder="Input padrão">
      </div>
      
      <!-- Large -->
      <div>
        <label class="form-label">Grande (form-control-lg)</label>
        <input type="text" class="form-control form-control-lg" placeholder="Input grande">
      </div>
    </div>
  `
};

// Story: Select
export const Selects = {
  name: '📋 Select',
  render: () => `
    <div class="row g-4" style="max-width: 500px;">
      <!-- Select básico -->
      <div class="col-12">
        <label class="form-label">Turma</label>
        <select class="form-select">
          <option value="">Selecione uma turma...</option>
          <option value="1">5º Ano A</option>
          <option value="2">5º Ano B</option>
          <option value="3">6º Ano A</option>
          <option value="4">6º Ano B</option>
        </select>
      </div>
      
      <!-- Select com valor selecionado -->
      <div class="col-12">
        <label class="form-label">Disciplina</label>
        <select class="form-select">
          <option value="">Selecione...</option>
          <option value="mt" selected>Matemática</option>
          <option value="lp">Língua Portuguesa</option>
          <option value="lc">Liga das Corujinhas</option>
        </select>
      </div>
      
      <!-- Select múltiplo -->
      <div class="col-12">
        <label class="form-label">Habilidades (múltiplo)</label>
        <select class="form-select" multiple size="4">
          <option value="1">Adição</option>
          <option value="2" selected>Subtração</option>
          <option value="3" selected>Multiplicação</option>
          <option value="4">Divisão</option>
          <option value="5">Frações</option>
        </select>
        <div class="form-text">Segure Ctrl para selecionar múltiplos</div>
      </div>
      
      <!-- Select desabilitado -->
      <div class="col-12">
        <label class="form-label">Período (bloqueado)</label>
        <select class="form-select" disabled>
          <option selected>2024</option>
        </select>
      </div>
    </div>
  `
};

// Story: Checkbox e Radio
export const CheckboxRadio = {
  name: '☑️ Checkbox & Radio',
  render: () => `
    <div class="row g-4">
      <!-- Checkboxes -->
      <div class="col-md-6">
        <h6 class="mb-3">Checkboxes</h6>
        <div class="form-check mb-2">
          <input class="form-check-input" type="checkbox" id="check1" checked>
          <label class="form-check-label" for="check1">Matemática</label>
        </div>
        <div class="form-check mb-2">
          <input class="form-check-input" type="checkbox" id="check2" checked>
          <label class="form-check-label" for="check2">Língua Portuguesa</label>
        </div>
        <div class="form-check mb-2">
          <input class="form-check-input" type="checkbox" id="check3">
          <label class="form-check-label" for="check3">Liga das Corujinhas</label>
        </div>
        <div class="form-check mb-2">
          <input class="form-check-input" type="checkbox" id="check4" disabled>
          <label class="form-check-label" for="check4">Desabilitado</label>
        </div>
      </div>
      
      <!-- Radio buttons -->
      <div class="col-md-6">
        <h6 class="mb-3">Radio Buttons</h6>
        <div class="form-check mb-2">
          <input class="form-check-input" type="radio" name="proficiency" id="radio1" checked>
          <label class="form-check-label" for="radio1">Avançado</label>
        </div>
        <div class="form-check mb-2">
          <input class="form-check-input" type="radio" name="proficiency" id="radio2">
          <label class="form-check-label" for="radio2">Proficiente</label>
        </div>
        <div class="form-check mb-2">
          <input class="form-check-input" type="radio" name="proficiency" id="radio3">
          <label class="form-check-label" for="radio3">Básico</label>
        </div>
        <div class="form-check mb-2">
          <input class="form-check-input" type="radio" name="proficiency" id="radio4" disabled>
          <label class="form-check-label" for="radio4">Desabilitado</label>
        </div>
      </div>
      
      <!-- Inline -->
      <div class="col-12">
        <h6 class="mb-3">Inline</h6>
        <div class="d-flex gap-4 flex-wrap">
          <div class="form-check form-check-inline">
            <input class="form-check-input" type="checkbox" id="inlineCheck1" checked>
            <label class="form-check-label" for="inlineCheck1">Opção 1</label>
          </div>
          <div class="form-check form-check-inline">
            <input class="form-check-input" type="checkbox" id="inlineCheck2">
            <label class="form-check-label" for="inlineCheck2">Opção 2</label>
          </div>
          <div class="form-check form-check-inline">
            <input class="form-check-input" type="checkbox" id="inlineCheck3">
            <label class="form-check-label" for="inlineCheck3">Opção 3</label>
          </div>
        </div>
      </div>
    </div>
  `
};

// Story: Switch
export const Switches = {
  name: '🔘 Switches',
  render: () => `
    <div class="d-flex flex-column gap-3" style="max-width: 400px;">
      <div class="form-check form-switch">
        <input class="form-check-input" type="checkbox" id="switch1" checked>
        <label class="form-check-label" for="switch1">Ativar notificações</label>
      </div>
      
      <div class="form-check form-switch">
        <input class="form-check-input" type="checkbox" id="switch2">
        <label class="form-check-label" for="switch2">Modo escuro</label>
      </div>
      
      <div class="form-check form-switch">
        <input class="form-check-input" type="checkbox" id="switch3" checked>
        <label class="form-check-label" for="switch3">Enviar e-mails de relatórios</label>
      </div>
      
      <div class="form-check form-switch">
        <input class="form-check-input" type="checkbox" id="switch4" disabled>
        <label class="form-check-label" for="switch4">Desabilitado</label>
      </div>
      
      <div class="form-check form-switch">
        <input class="form-check-input" type="checkbox" id="switch5" checked disabled>
        <label class="form-check-label" for="switch5">Ativo (desabilitado)</label>
      </div>
    </div>
  `
};

// Story: Input Groups
export const InputGroups = {
  name: '🔗 Input Groups',
  render: () => `
    <div class="d-flex flex-column gap-4" style="max-width: 500px;">
      <!-- Com ícone à esquerda -->
      <div>
        <label class="form-label">Busca</label>
        <div class="input-group">
          <span class="input-group-text"><i class="bi bi-search"></i></span>
          <input type="text" class="form-control" placeholder="Buscar aluno...">
        </div>
      </div>
      
      <!-- Com ícone à direita -->
      <div>
        <label class="form-label">Senha</label>
        <div class="input-group">
          <input type="password" class="form-control" placeholder="Digite sua senha">
          <span class="input-group-text" style="cursor: pointer;"><i class="bi bi-eye"></i></span>
        </div>
      </div>
      
      <!-- Com botão -->
      <div>
        <label class="form-label">E-mail para convite</label>
        <div class="input-group">
          <input type="email" class="form-control" placeholder="email@exemplo.com">
          <button class="btn btn-primary" type="button">
            <i class="bi bi-send me-1"></i> Enviar
          </button>
        </div>
      </div>
      
      <!-- Com texto -->
      <div>
        <label class="form-label">Pontuação</label>
        <div class="input-group">
          <input type="number" class="form-control" value="100">
          <span class="input-group-text">pontos</span>
        </div>
      </div>
      
      <!-- Com select -->
      <div>
        <label class="form-label">Filtro</label>
        <div class="input-group">
          <select class="form-select" style="max-width: 150px;">
            <option>Nome</option>
            <option>E-mail</option>
            <option>Turma</option>
          </select>
          <input type="text" class="form-control" placeholder="Buscar...">
          <button class="btn btn-outline-secondary" type="button">
            <i class="bi bi-search"></i>
          </button>
        </div>
      </div>
    </div>
  `
};

// Story: Textarea
export const Textareas = {
  name: '📄 Textarea',
  render: () => `
    <div class="d-flex flex-column gap-4" style="max-width: 500px;">
      <!-- Básico -->
      <div>
        <label class="form-label">Observações</label>
        <textarea class="form-control" rows="3" placeholder="Digite suas observações..."></textarea>
      </div>
      
      <!-- Com contador -->
      <div>
        <label class="form-label">Mensagem (máx. 200 caracteres)</label>
        <textarea class="form-control" rows="3" maxlength="200">Esta é uma mensagem de exemplo...</textarea>
        <div class="form-text text-end">35/200</div>
      </div>
      
      <!-- Desabilitado -->
      <div>
        <label class="form-label">Feedback Automático</label>
        <textarea class="form-control" rows="2" disabled>Gerado automaticamente pelo sistema.</textarea>
      </div>
    </div>
  `
};

// Story: Formulário Completo
export const CompleteForm = {
  name: '📋 Formulário Completo',
  render: () => `
    <div class="card" style="max-width: 600px;">
      <div class="card-header">
        <h5 class="mb-0">
          <i class="bi bi-person-plus me-2 text-primary"></i>
          Cadastrar Novo Aluno
        </h5>
      </div>
      <div class="card-body">
        <form>
          <div class="row g-3">
            <!-- Nome -->
            <div class="col-12">
              <label class="form-label">Nome Completo <span class="text-danger">*</span></label>
              <input type="text" class="form-control" placeholder="Digite o nome completo">
            </div>
            
            <!-- Data de nascimento e Gênero -->
            <div class="col-md-6">
              <label class="form-label">Data de Nascimento</label>
              <input type="date" class="form-control">
            </div>
            <div class="col-md-6">
              <label class="form-label">Gênero</label>
              <select class="form-select">
                <option value="">Selecione...</option>
                <option>Masculino</option>
                <option>Feminino</option>
                <option>Outro</option>
                <option>Prefiro não informar</option>
              </select>
            </div>
            
            <!-- Turma -->
            <div class="col-12">
              <label class="form-label">Turma <span class="text-danger">*</span></label>
              <select class="form-select">
                <option value="">Selecione a turma...</option>
                <option>5º Ano A</option>
                <option>5º Ano B</option>
                <option>6º Ano A</option>
              </select>
            </div>
            
            <!-- E-mail do responsável -->
            <div class="col-12">
              <label class="form-label">E-mail do Responsável</label>
              <div class="input-group">
                <span class="input-group-text"><i class="bi bi-envelope"></i></span>
                <input type="email" class="form-control" placeholder="responsavel@email.com">
              </div>
              <div class="form-text">Credenciais serão enviadas para este e-mail</div>
            </div>
            
            <!-- Opções -->
            <div class="col-12">
              <div class="form-check form-switch mb-2">
                <input class="form-check-input" type="checkbox" id="sendEmail" checked>
                <label class="form-check-label" for="sendEmail">Enviar credenciais por e-mail</label>
              </div>
              <div class="form-check form-switch">
                <input class="form-check-input" type="checkbox" id="activeStudent" checked>
                <label class="form-check-label" for="activeStudent">Aluno ativo</label>
              </div>
            </div>
            
            <!-- Observações -->
            <div class="col-12">
              <label class="form-label">Observações</label>
              <textarea class="form-control" rows="2" placeholder="Observações adicionais (opcional)"></textarea>
            </div>
          </div>
        </form>
      </div>
      <div class="card-footer d-flex justify-content-end gap-2">
        <button type="button" class="btn btn-outline-secondary">Cancelar</button>
        <button type="submit" class="btn btn-primary">
          <i class="bi bi-check-lg me-1"></i> Cadastrar Aluno
        </button>
      </div>
    </div>
  `
};
