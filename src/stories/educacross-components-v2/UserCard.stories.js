/**
 * UserCard - Card de Seleção de Usuário
 * =======================================
 * Card interativo para seleção de perfil de usuário na tela "Seja bem-vindo(a)!"
 * 
 * @component UserCard
 * @category Educacross Components V2 / Cards
 * @source educacross-frontoffice/src/views/pages/auth-context/manage-account/components/UserCard.vue
 * @priority P1 - Core UI
 * @status EXPANDED
 * @since 2.0.0
 */

export default {
  title: 'Front-office/Cards/UserCard',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
## UserCard - Card de Perfil de Usuário

Card interativo para seleção de perfil na página de gerenciamento de contas. Exibe informações do usuário com avatar/mascote, credenciais e dados contextuais.

### Casos de Uso

**Usuário Multi-Perfil**: Selecionar entre múltiplas contas (aluno, professor, coordenador) na tela inicial de boas-vindas

**Responsável**: Escolher qual filho/aluno logar quando possui múltiplos dependentes vinculados

**Professor**: Acessar perfil como professor em diferentes instituições ou trocar de contexto entre perfis administrativos

**Gestor**: Alternar entre perfis de gestor de rede, diretor ou coordenador em diferentes escolas

### Variações

**Card de Aluno** (student):
- Background colorido com mascote/avatar do aluno
- Badge "Aluno" no canto superior esquerdo
- Nome do aluno, escola, turma e série
- Credenciais: nome de usuário e senha (toggleable)
- Botão de configurações (engrenagem) no canto superior direito

**Card de Professor/Staff** (Professor, Coordenador, Diretor, etc.):
- Background com ícone do perfil (SVG) + cor específica do papel
- Badge com nome do papel
- Nome do usuário
- Lista de turmas vinculadas (até 4 visíveis + popover)
- Contador de alunos/escolas (quando aplicável)
        `
      }
    }
  }
};

const styles = `<style>
.user-card {
  background: #fff;
  border: 1px solid #D8D6DE;
  border-radius: 0.428rem;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.25s ease, box-shadow 0.25s ease;
  display: flex;
  flex-direction: column;
  max-width: 400px;
  margin-bottom: 0;
}
.user-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 24px 0 rgba(34, 41, 47, 0.1);
}
.user-card-header {
  height: 97px;
  width: 100%;
  padding: 0.5rem;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  background-size: 80px, cover, cover !important;
  background-position: center center, center center, center center !important;
  background-repeat: no-repeat, no-repeat, no-repeat !important;
  position: relative;
}
.user-badge {
  background: #fff;
  color: #7367F0;
  padding: 0.286rem 0.857rem;
  border-radius: 50rem;
  font-size: 0.857rem;
  font-weight: 500;
  z-index: 1;
  line-height: 1;
}
.settings-icon {
  color: #fff;
  cursor: pointer;
  font-size: 1.25rem;
  z-index: 1;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.settings-icon:hover {
  opacity: 0.8;
}
.user-card-body {
  padding: 1rem;
  padding-top: 0.25rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 1;
}
.user-name {
  font-size: 1.285rem;
  font-weight: 500;
  color: #7367F0;
  margin: 0 0 0.5rem 0;
  text-align: center;
  line-height: 1.2;
}
.user-info {
  text-align: center;
  font-size: 1rem;
  color: #6E6B7B;
  line-height: 1.45;
}
.user-info p {
  margin: 0 0 0.25rem 0;
}
.class-badge {
  display: inline-block;
  background: rgba(115, 103, 240, 0.12);
  color: #7367F0;
  padding: 0.286rem 0.857rem;
  border-radius: 0.857rem;
  font-size: 0.857rem;
  font-weight: 400;
  margin-left: 0.5rem;
  line-height: 1;
}
.credentials-section {
  border-top: 1px solid #EBE9F1;
  padding-top: 0.75rem;
  margin-top: 0.5rem;
  font-size: 1rem;
  text-align: center;
}
.credential-row {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}
.credential-value {
  color: #7367F0;
  font-weight: 700;
}
.visibility-toggle {
  color: #7367F0;
  cursor: pointer;
  font-size: 1.25rem;
  vertical-align: middle;
  margin-left: 0.5rem;
}
.visibility-toggle:hover {
  opacity: 0.7;
}
.stats-section {
  border-top: 1px solid #EBE9F1;
  padding-top: 0.5rem;
  margin-top: 0.5rem;
  text-align: center;
}
.stat-label {
  font-size: 1rem;
  color: #6E6B7B;
  margin-bottom: 0;
  line-height: 1;
}
.stat-value {
  font-size: 1.714rem;
  font-weight: 700;
  color: #7367F0;
  line-height: 1;
}
.classes-wrapper {
  display: flex;
  flex-wrap: wrap;
  gap: 0.25rem;
  justify-content: center;
  margin-top: 0;
}
.class-tag {
  background: rgba(115, 103, 240, 0.12);
  color: #7367F0;
  padding: 0.286rem 0.857rem;
  border-radius: 0.857rem;
  font-size: 0.857rem;
  font-weight: 400;
  line-height: 1;
}
.class-more {
  background: rgba(115, 103, 240, 0.12);
  color: #7367F0;
  padding: 0.286rem 0.857rem;
  border-radius: 0.857rem;
  font-size: 0.857rem;
  font-weight: 700;
  cursor: pointer;
  line-height: 1;
}
.class-more:hover {
  background: rgba(115, 103, 240, 0.2);
}
</style>`;

/**
 * Story: Default (Aluno)
 * 
 * Card de aluno "Fabio G5" do Colégio Nova Jornada, turma G5 - Manhã, 2º Ano.
 * Background azul claro com mascote pinguim.
 * Credenciais: fabioj9484 / ******.
 * 
 * Educational context: Página de boas-vindas. Responsável escolhendo qual filho logar.
 */
export const Default = {
  render: () => `
    ${styles}
    <div class="user-card" onclick="this.style.transform='translateY(-2px)'; setTimeout(() => this.style.transform='', 200)">
      <div class="user-card-header" style="background: url('/profile-corujinhas/7.png') center center / 80px no-repeat, url('/images/images-educa/bg-bolinhas.svg') center center / cover no-repeat, #5F4B8B linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.2) 100%);">
        <span class="user-badge">Aluno</span>
        <i class="bi bi-gear-fill settings-icon"></i>
      </div>
      <div class="user-card-body">
        <div>
          <h2 class="user-name">Fabio G5</h2>
          <div class="user-info">
            <p>Colégio Nova Jornada</p>
            <p>
              G5 - Manhã
              <span class="class-badge">2º Ano</span>
            </p>
          </div>
        </div>
        <div class="credentials-section">
          <div class="credential-row">
            <span>Nome de usuário:</span>
            <span class="credential-value">fabioj9484</span>
          </div>
          <div class="credential-row">
            <span>Senha:</span>
            <span class="credential-value">******</span>
            <i class="bi bi-eye-fill visibility-toggle" onclick="event.stopPropagation(); const pwd = this.previousElementSibling; pwd.textContent = pwd.textContent === '******' ? 'abc123' : '******'; this.className = pwd.textContent === '******' ? 'bi bi-eye-fill visibility-toggle' : 'bi bi-eye-slash-fill visibility-toggle';"></i>
          </div>
        </div>
      </div>
    </div>
    <p style="margin-top: 16px; font-size: 13px; color: #6E6B7B;">
      <strong>Contexto:</strong> Card de aluno na página "Seja bem-vindo(a)!". Responsável escolhendo perfil.
    </p>
  `
};

/**
 * Story: Professor
 * 
 * Card de professora "Colégio Nova Jornada" (institucional) com 4 turmas + contador "+78".
 * Background roxo com ícone de professor.
 * Contador: 190 alunos.
 * 
 * Educational context: Professor com múltiplas turmas acessando plataforma.
 */
export const Professor = {
  render: () => `
    ${styles}
    <div class="user-card">
      <div class="user-card-header" style="background: url('/assets/profiles/teacher.svg') center center / 80px no-repeat, url('/assets/bg-bolinhas.svg') center center / cover no-repeat, #7F6CC3 linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.2) 100%);">
        <span class="user-badge">Professor</span>
      </div>
      <div class="user-card-body">
        <div>
          <h2 class="user-name">Colégio Nova Jornada</h2>
          <div class="classes-wrapper">
            <span class="class-tag">1º Ano A - Manhã</span>
            <span class="class-tag">1º Ano A - Tarde</span>
            <span class="class-tag">1º Ano ANG - Manhã</span>
            <span class="class-tag">1º Ano asd - Manhã</span>
            <span class="class-more">+78</span>
          </div>
        </div>
        <div class="stats-section">
          <p class="stat-label">Alunos</p>
          <span class="stat-value">190</span>
        </div>
      </div>
    </div>
    <p style="margin-top: 16px; font-size: 13px; color: #6E6B7B;">
      <strong>Contexto:</strong> Card de professor institucional com múltiplas turmas vinculadas.
    </p>
  `
};

/**
 * Story: Coordenador
 * 
 * Card de coordenador "Colégio Nova Jornada" com background rosa/magenta.
 * 4 turmas visíveis + contador "+78".
 * Contador: 190 alunos.
 * 
 * Educational context: Coordenador acessando perfil para gestão pedagógica.
 */
export const Coordenador = {
  render: () => `
    ${styles}
    <div class="user-card">
      <div class="user-card-header" style="background: url('/assets/profiles/coordinator.svg') center center / 80px no-repeat, url('/assets/bg-bolinhas.svg') center center / cover no-repeat, #F05FF3 linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.2) 100%);">
        <span class="user-badge">Coordenador</span>
      </div>
      <div class="user-card-body">
        <div>
          <h2 class="user-name">Colégio Nova Jornada</h2>
          <div class="classes-wrapper">
            <span class="class-tag">1º Ano A - Manhã</span>
            <span class="class-tag">1º Ano A - Tarde</span>
            <span class="class-tag">1º Ano ANG - Manhã</span>
            <span class="class-tag">1º Ano asd - Manhã</span>
            <span class="class-more">+78</span>
          </div>
        </div>
        <div class="stats-section">
          <p class="stat-label">Alunos</p>
          <span class="stat-value">190</span>
        </div>
      </div>
    </div>
    <p style="margin-top: 16px; font-size: 13px; color: #6E6B7B;">
      <strong>Contexto:</strong> Coordenador acessando perfil para gestão de turmas e docentes.
    </p>
  `
};

/**
 * Story: Diretor
 * 
 * Card de diretor "Colégio Nova Jornada" com background vermelho/coral.
 * Sem turmas específicas (gestão geral).
 * Contador: 190 alunos.
 * 
 * Educational context: Diretor acessando perfil para visão estratégica da escola.
 */
export const Diretor = {
  render: () => `
    ${styles}
    <div class="user-card">
      <div class="user-card-header" style="background: url('/assets/profiles/principal.svg') center center / 80px no-repeat, url('/assets/bg-bolinhas.svg') center center / cover no-repeat, #FE6E6E linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.2) 100%);">
        <span class="user-badge">Diretor</span>
      </div>
      <div class="user-card-body">
        <div>
          <h2 class="user-name">Colégio Nova Jornada</h2>
        </div>
        <div class="stats-section">
          <p class="stat-label">Alunos</p>
          <span class="stat-value">190</span>
        </div>
      </div>
    </div>
    <p style="margin-top: 16px; font-size: 13px; color: #6E6B7B;">
      <strong>Contexto:</strong> Diretor escolar acessando visão estratégica da instituição.
    </p>
  `
};

/**
 * Story: GestorDeRedes
 * 
 * Card de gestor de redes "Rede Produt o" com background turquesa/teal.
 * Sem turmas (gestão de rede).
 * Contador: 2 escolas.
 * 
 * Educational context: Gestor de rede acessando visão consolidada de múltiplas instituições.
 */
export const GestorDeRedes = {
  render: () => `
    ${styles}
    <div class="user-card">
      <div class="user-card-header" style="background: url('/assets/profiles/network-manager.svg') center center / 80px no-repeat, url('/assets/bg-bolinhas.svg') center center / cover no-repeat, #00BDB8 linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.2) 100%);">
        <span class="user-badge">Gestor de Redes</span>
      </div>
      <div class="user-card-body">
        <div>
          <h2 class="user-name">Rede Produto</h2>
        </div>
        <div class="stats-section">
          <p class="stat-label">Escolas</p>
          <span class="stat-value">2</span>
        </div>
      </div>
    </div>
    <p style="margin-top: 16px; font-size: 13px; color: #6E6B7B;">
      <strong>Contexto:</strong> Gestor de rede acessando dashboard consolidado de instituições.
    </p>
  `
};

/**
 * Story: Administrador
 * 
 * Card de administrador "Colégio Nova Jornada" com background laranja/amarelo.
 * 4 turmas visíveis + contador "+78".
 * Contador: 190 alunos.
 * 
 * Educational context: Admin escolar acessando perfil para gestão administrativa.
 */
export const Administrador = {
  render: () => `
    ${styles}
    <div class="user-card">
      <div class="user-card-header" style="background: url('/assets/profiles/admin.svg') center center / 80px no-repeat, url('/assets/bg-bolinhas.svg') center center / cover no-repeat, #FFB443 linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.2) 100%);">
        <span class="user-badge">Administrador</span>
      </div>
      <div class="user-card-body">
        <div>
          <h2 class="user-name">Colégio Nova Jornada</h2>
          <div class="classes-wrapper">
            <span class="class-tag">1º Ano A - Manhã</span>
            <span class="class-tag">1º Ano A - Tarde</span>
            <span class="class-tag">1º Ano ANG - Manhã</span>
            <span class="class-tag">1º Ano asd - Manhã</span>
            <span class="class-more">+78</span>
          </div>
        </div>
        <div class="stats-section">
          <p class="stat-label">Alunos</p>
          <span class="stat-value">190</span>
        </div>
      </div>
    </div>
    <p style="margin-top: 16px; font-size: 13px; color: #6E6B7B;">
      <strong>Contexto:</strong> Administrador escolar acessando gestão administrativa da instituição.
    </p>
  `
};

/**
 * Story: MultiPerfil
 * 
 * Grid 3x3 mostrando múltiplos perfis de um mesmo responsável:
 * - 3 filhos (Fabio G5, Fabio 2º Ano, Alice 5º)
 * - 3 perfis aluno (Alice 6º Ano)
 * - 3 perfis institucionais (Coordenador, Diretor, Gestor de Redes)
 * 
 * Educational context: Responsável/profissional com múltiplos perfis vinculados.
 */
export const MultiPerfil = {
  render: () => `
    ${styles}
    <div style="display: grid; grid-template-columns: repeat(3, 280px); gap: 20px; max-width: 900px;">
      <!-- Aluno 1 -->
      <div class="user-card">
        <div class="user-card-header" style="background: url('/profile-corujinhas/7.png') center center / 80px no-repeat, url('/assets/bg-bolinhas.svg') center center / cover no-repeat, #5F4B8B linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.2) 100%);">
          <span class="user-badge">Aluno</span>
          <i class="bi bi-gear-fill settings-icon"></i>
        </div>
        <div class="user-card-body">
          <h2 class="user-name">Fabio G5</h2>
          <div class="user-info">
            <p>Colégio Nova Jornada</p>
            <p>G5 - Manhã <span class="class-badge">2º Ano</span></p>
          </div>
        </div>
      </div>

      <!-- Aluno 2 -->
      <div class="user-card">
        <div class="user-card-header" style="background: url('data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%2780%27 height=%2780%27 viewBox=%270 0 80 80%27%3E%3Ccircle cx=%2740%27 cy=%2730%27 r=%2720%27 fill=%27%23FFB84D%27/%3E%3Cellipse cx=%2740%27 cy=%2755%27 rx=%2725%27 ry=%2730%27 fill=%27%23fff%27/%3E%3Ccircle cx=%2732%27 cy=%2728%27 r=%273%27 fill=%27%23000%27/%3E%3Ccircle cx=%2748%27 cy=%2728%27 r=%273%27 fill=%27%23000%27/%3E%3C/svg%3E') center center no-repeat, #5DADE2;">
          <span class="user-badge">Aluno</span>
          <i class="bi bi-gear-fill settings-icon"></i>
        </div>
        <div class="user-card-body">
          <h2 class="user-name">Fabio 2º Ano</h2>
          <div class="user-info">
            <p>Colégio Nova Jornada</p>
            <p>2º Ano B - Manhã <span class="class-badge">2º Ano</span></p>
          </div>
        </div>
      </div>

      <!-- Aluno 3 -->
      <div class="user-card">
        <div class="user-card-header" style="background: url('/profile-corujinhas/5.png') center center / 80px no-repeat, url('/assets/bg-bolinhas.svg') center center / cover no-repeat, #FF69B4 linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.2) 100%);">
          <span class="user-badge">Aluno</span>
          <i class="bi bi-gear-fill settings-icon"></i>
        </div>
        <div class="user-card-body">
          <h2 class="user-name">Alice 5º</h2>
          <div class="user-info">
            <p>Colégio Nova Jornada</p>
            <p>5º Ano A - Tarde <span class="class-badge">5º Ano</span></p>
          </div>
        </div>
      </div>

      <!-- Coordenador -->
      <div class="user-card">
        <div class="user-card-header" style="background: url('/assets/profiles/coordinator.svg') center center / 80px no-repeat, url('/assets/bg-bolinhas.svg') center center / cover no-repeat, #F05FF3 linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.2) 100%);">
          <span class="user-badge">Coordenador</span>
        </div>
        <div class="user-card-body">
          <h2 class="user-name">Colégio Nova Jornada</h2>
          <div class="classes-wrapper">
            <span class="class-tag">1º Ano A - Manhã</span>
            <span class="class-more">+78</span>
          </div>
        </div>
      </div>

      <!-- Diretor -->
      <div class="user-card">
        <div class="user-card-header" style="background: url('/assets/profiles/principal.svg') center center / 80px no-repeat, url('/assets/bg-bolinhas.svg') center center / cover no-repeat, #FE6E6E linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.2) 100%);">
          <span class="user-badge">Diretor</span>
        </div>
        <div class="user-card-body">
          <h2 class="user-name">Colégio Nova Jornada</h2>
        </div>
      </div>

      <!-- Gestor de Redes -->
      <div class="user-card">
        <div class="user-card-header" style="background: url('/assets/profiles/network-manager.svg') center center / 80px no-repeat, url('/assets/bg-bolinhas.svg') center center / cover no-repeat, #00BDB8 linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.2) 100%);">
          <span class="user-badge">Gestor de Redes</span>
        </div>
        <div class="user-card-body">
          <h2 class="user-name">Rede Produto</h2>
          <div class="stats-section">
            <p class="stat-label">Escolas</p>
            <span class="stat-value">2</span>
          </div>
        </div>
      </div>

      <!-- Professor -->
      <div class="user-card">
        <div class="user-card-header" style="background: url('/assets/profiles/teacher.svg') center center / 80px no-repeat, url('/assets/bg-bolinhas.svg') center center / cover no-repeat, #7F6CC3 linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.2) 100%);">
          <span class="user-badge">Professor</span>
        </div>
        <div class="user-card-body">
          <h2 class="user-name">Hogwarts</h2>
          <div class="classes-wrapper">
            <span class="class-tag">EXPLORE 2</span>
            <span class="class-tag">EXPLORE 8</span>
          </div>
          <div class="stats-section">
            <p class="stat-label">Alunos</p>
            <span class="stat-value">6</span>
          </div>
        </div>
      </div>

      <!-- Administrador -->
      <div class="user-card">
        <div class="user-card-header" style="background: url('data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%2780%27 height=%2780%27%3E%3Ccircle cx=%2740%27 cy=%2732%27 r=%2720%27 fill=%27%23FFB443%27/%3E%3Cellipse cx=%2740%27 cy=%2758%27 rx=%2728%27 ry=%2724%27 fill=%27%23fff%27/%3E%3C/svg%3E') center center no-repeat, #FFB443;">
          <span class="user-badge">Administrador</span>
        </div>
        <div class="user-card-body">
          <h2 class="user-name">Colégio Nova Jornada</h2>
          <div class="classes-wrapper">
            <span class="class-tag">1º Ano A - Manhã</span>
            <span class="class-more">+78</span>
          </div>
          <div class="stats-section">
            <p class="stat-label">Alunos</p>
            <span class="stat-value">190</span>
          </div>
        </div>
      </div>

      <!-- Alice 6º Ano -->
      <div class="user-card">
        <div class="user-card-header" style="background: url('data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%2780%27 height=%2780%27%3E%3Ccircle cx=%2740%27 cy=%2730%27 r=%2718%27 fill=%27%23B19CD9%27/%3E%3Cellipse cx=%2740%27 cy=%2755%27 rx=%2725%27 ry=%2730%27 fill=%27%23fff%27/%3E%3C/svg%3E') center center no-repeat, #8B7AB8;">
          <span class="user-badge">Aluno</span>
          <i class="bi bi-gear-fill settings-icon"></i>
        </div>
        <div class="user-card-body">
          <h2 class="user-name">Alice 6º Ano</h2>
          <div class="user-info">
            <p>Colégio Nova Jornada</p>
            <p>6º Ano A - Manhã <span class="class-badge">6º Ano</span></p>
          </div>
        </div>
      </div>
    </div>
    <p style="margin-top: 16px; font-size: 13px; color: #6E6B7B;">
      <strong>Contexto:</strong> Responsável/profissional com múltiplos perfis vinculados. Página "Seja bem-vindo(a)!".
    </p>
  `
};

/**
 * Story: Loading
 * 
 * Card de aluno com overlay de loading (spinner).
 * Estado durante autenticação/login.
 * 
 * Educational context: Usuário clicou no card, aguardando autenticação.
 */
export const Loading = {
  render: () => `
    ${styles}
    <style>
    .loading-overlay {
      position: absolute;
      inset: 0;
      background: rgba(255, 255, 255, 0.8);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 10;
      border-radius: 8px;
    }
    .spinner {
      width: 40px;
      height: 40px;
      border: 4px solid #E8E8E8;
      border-top-color: #6E63E8;
      border-radius: 50%;
      animation: spin 0.8s linear infinite;
    }
    @keyframes spin {
      to { transform: rotate(360deg); }
    }
    </style>
    <div class="user-card" style="position: relative; pointer-events: none; opacity: 0.95;">
      <div class="loading-overlay">
        <div class="spinner"></div>
      </div>
      <div class="user-card-header" style="background: url('data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%2780%27 height=%2780%27 viewBox=%270 0 80 80%27%3E%3Ccircle cx=%2740%27 cy=%2730%27 r=%2720%27 fill=%27%23FFB84D%27/%3E%3Cellipse cx=%2740%27 cy=%2755%27 rx=%2725%27 ry=%2730%27 fill=%27%23fff%27/%3E%3Ccircle cx=%2732%27 cy=%2728%27 r=%273%27 fill=%27%23000%27/%3E%3Ccircle cx=%2748%27 cy=%2728%27 r=%273%27 fill=%27%23000%27/%3E%3C/svg%3E') center center no-repeat, #4DD9F5;">
        <span class="user-badge">Aluno</span>
        <i class="bi bi-gear-fill settings-icon"></i>
      </div>
      <div class="user-card-body">
        <div>
          <h2 class="user-name">Fabio G5</h2>
          <div class="user-info">
            <p>Colégio Nova Jornada</p>
            <p>G5 - Manhã <span class="class-badge">2º Ano</span></p>
          </div>
        </div>
        <div class="credentials-section">
          <div class="credential-row">
            <span>Nome de usuário:</span>
            <span class="credential-value">fabioj9484</span>
          </div>
          <div class="credential-row">
            <span>Senha:</span>
            <span class="credential-value">******</span>
            <i class="bi bi-eye-fill visibility-toggle"></i>
          </div>
        </div>
      </div>
    </div>
    <p style="margin-top: 16px; font-size: 13px; color: #6E6B7B;">
      <strong>Contexto:</strong> Card em estado de loading durante autenticação após clique.
    </p>
  `
};
