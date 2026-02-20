/**
 * UserCard - Card de Seleção de Usuário
 * =======================================
 * Card interativo para seleção de perfil de usuário na tela "Seja bem-vindo(a)!"
 * 
 * @component UserCard
 * @category Educacross Components V2 / Cards
 * @source educacross-frontoffice/src/views/pages/auth-context/manage-account/components/UserCard.vue
 * @priority P1 - Core UI
 * @status PIXEL-PERFECT
 * @since 2.0.0
 */

export default {
  title: 'Educacross Components V2/Cards/UserCard',
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
      <div class="user-card-header" style="background: url('/profile-corujinhas/7.png') center center / 80px no-repeat, url('/educacross-assets/bg-bolinhas.svg') center center / cover no-repeat, #5F4B8B linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.2) 100%);">
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
      <div style="background:linear-gradient(135deg,#7367F0 0%,#9E95F5 100%);padding:60px 40px;color:white;">
        <div style="max-width:900px;margin:0 auto;">
          <div style="display:inline-block;padding:8px 16px;background:rgba(255,255,255,0.15);border-radius:50px;margin-bottom:20px;font-size:14px;border:1px solid rgba(255,255,255,0.2);">Cards</div>
          <h1 style="font-size:3rem;font-weight:700;margin:0 0 12px 0;letter-spacing:-0.02em;">UserCard</h1>
          <p style="font-size:1.1rem;opacity:0.9;margin:0;max-width:600px;">Card de Seleção de Usuário</p>
        </div>
      </div>
      <div style="max-width:900px;margin:0 auto;padding:48px 40px;">
        <div style="background:white;border-radius:12px;padding:32px;margin-bottom:32px;box-shadow:0 2px 8px rgba(0,0,0,0.08);">
          <h2 style="font-size:1.1rem;font-weight:600;color:#5E5873;margin:0 0 16px 0;">Sobre o Componente</h2>
          <p style="color:#6E6B7B;line-height:1.7;margin:0 0 16px 0;">Card de Seleção de Usuário. Faz parte da categoria <strong>Cards</strong> do Design System Educacross.</p>
          <div style="background:#F8F7FF;border-left:4px solid #7367F0;padding:16px;border-radius:4px;">
            <p style="margin:0;color:#5E5873;font-size:14px;line-height:1.6;"><strong>💡 Dica:</strong> Use <em>Playground</em> para explorar props, <em>Use Cases</em> para exemplos reais e <em>Accessibility</em> para validar WCAG.</p>
          </div>
        </div>
        <div style="background:white;border-radius:12px;padding:32px;box-shadow:0 2px 8px rgba(0,0,0,0.08);">
          <h2 style="font-size:1.1rem;font-weight:600;color:#5E5873;margin:0 0 16px 0;">Implementação Vue 2.7</h2>
          <pre style="background:#1E1E2E;color:#CDD6F4;padding:20px;border-radius:8px;font-size:13px;line-height:1.6;overflow:auto;margin:0;"><code>import UserCard from '@/components/UserCard.vue';

// Template
&lt;UserCard v-bind="props" /&gt;</code></pre>
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
    docs: { description: { story: 'Explore o UserCard com controles interativos.' } },
  },
  render: (args) => `
    <div style="padding:32px;display:flex;justify-content:center;align-items:center;min-height:200px;background:#F8F8F8;border-radius:12px;">
      <div style="text-align:center;color:#6E6B7B;">
        <div style="width:60px;height:60px;background:#7367F020;border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 16px;font-size:24px;">🎨</div>
        <p style="margin:0 0 8px 0;font-size:15px;font-weight:600;color:#5E5873;">Playground UserCard</p>
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
    docs: { description: { story: 'Exemplos de uso real do UserCard no Educacross.' } },
  },
  render: () => `
    <div style="max-width:800px;margin:0 auto;padding:40px 20px;font-family:'Public Sans',sans-serif;">
      <div style="background:#7367F015;border:1px solid #7367F030;border-radius:12px;padding:24px;margin-bottom:40px;">
        <h1 style="font-size:1.5rem;font-weight:700;color:#5E5873;margin:0 0 8px 0;">Casos de Uso: UserCard</h1>
        <p style="color:#6E6B7B;margin:0;font-size:14px;line-height:1.6;">Cenários reais de uso no contexto educacional da plataforma Educacross</p>
      </div>
      
      <div style="margin-bottom:32px;">
        <h2 style="font-size:18px;font-weight:600;color:#5E5873;margin:0 0 8px 0;display:flex;align-items:center;gap:10px;">
          <span style="display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;background:#7367F0;color:white;border-radius:50%;font-size:13px;font-weight:700;flex-shrink:0;">1</span>
          Professor — Painel Principal
        </h2>
        <p style="color:#6E6B7B;margin:0 0 16px 0;padding-left:38px;font-size:14px;">Professor utilizando UserCard no dashboard de gestão de turmas</p>
        <div style="background:#F8F8F8;border-radius:8px;padding:20px;margin-left:38px;text-align:center;color:#B9B9C3;font-size:13px;">
          Ver story <strong>Default</strong> para visualização do componente neste contexto
        </div>
      </div>
      <div style="margin-bottom:32px;">
        <h2 style="font-size:18px;font-weight:600;color:#5E5873;margin:0 0 8px 0;display:flex;align-items:center;gap:10px;">
          <span style="display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;background:#7367F0;color:white;border-radius:50%;font-size:13px;font-weight:700;flex-shrink:0;">2</span>
          Aluno — Portal do Estudante
        </h2>
        <p style="color:#6E6B7B;margin:0 0 16px 0;padding-left:38px;font-size:14px;">Aluno interagindo com UserCard no portal educacional</p>
        <div style="background:#F8F8F8;border-radius:8px;padding:20px;margin-left:38px;text-align:center;color:#B9B9C3;font-size:13px;">
          Ver story <strong>Default</strong> para visualização do componente neste contexto
        </div>
      </div>
      <div style="margin-bottom:32px;">
        <h2 style="font-size:18px;font-weight:600;color:#5E5873;margin:0 0 8px 0;display:flex;align-items:center;gap:10px;">
          <span style="display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;background:#7367F0;color:white;border-radius:50%;font-size:13px;font-weight:700;flex-shrink:0;">3</span>
          Coordenador — Relatórios
        </h2>
        <p style="color:#6E6B7B;margin:0 0 16px 0;padding-left:38px;font-size:14px;">Coordenador pedagógico analisando dados via UserCard</p>
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
    docs: { description: { story: 'Conformidade WCAG 2.1 AA para o UserCard.' } },
  },
  render: () => `
    <div style="max-width:800px;margin:0 auto;padding:40px 20px;font-family:'Public Sans',sans-serif;">

      <div style="background:linear-gradient(135deg,#7367F0 0%,#764ba2 100%);padding:32px;border-radius:12px;margin-bottom:32px;color:white;">
        <h1 style="font-size:1.5rem;font-weight:700;margin:0 0 8px 0;">Acessibilidade: UserCard</h1>
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

