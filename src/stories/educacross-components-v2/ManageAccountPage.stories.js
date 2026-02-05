/**
 * ManageAccountPage - Página "Seja bem-vindo(a)!"
 * =================================================
 * Template completo da página de gerenciamento de contas com navbar, filtros laterais,
 * grid de UserCards e painel de convites.
 * 
 * @component ManageAccountPage
 * @category Educacross Components V2 / Templates
 * @source educacross-frontoffice/src/views/pages/auth-context/manage-account/ManageAccount.vue
 * @priority P1 - Core UI
 * @status EXPANDED
 * @since 2.0.0
 */

export default {
  title: 'Front-office/Templates/ManageAccountPage',
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
## ManageAccountPage - Gerenciamento de Contas

Página completa "Seja bem-vindo(a)!" para seleção de perfil de usuário após login inicial.

### Estrutura

- **Navbar**: Logo + "Como Jogar?" + dropdown usuário
- **Hero**: "Seja bem-vindo(a)!" com background estrelas
- **Filtros**: Sidebar esquerda (desktop) / Dropdown (mobile)
- **Grid**: UserCards responsivos
- **Convites**: Painel lateral direito (desktop) / Card roxo (mobile)
- **Footer**: Rodapé institucional
        `
      }
    }
  }
};

const styles = `<style>
* { box-sizing: border-box; margin: 0; padding: 0; }

.navbar-container {
  background: #fff;
  padding: 0.75rem 1rem;
  box-shadow: 0 4px 24px 0 rgba(34, 41, 47, 0.1);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}
.navbar-column { flex: 1; }
.logo-container img { height: 38px; }
.btn-how-to-play {
  background: #7367F0;
  color: #fff;
  border: none;
  border-radius: 1.428rem;
  padding: 0.571rem 1.143rem;
  font-size: 0.857rem;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.2s ease;
}
.btn-how-to-play:hover { 
  background: #5E50EE;
  box-shadow: 0 8px 25px -8px #7367F0;
}
.user-dropdown { cursor: pointer; }
.user-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(115, 103, 240, 0.12);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #7367F0;
  font-weight: 500;
}

.hero-card {
  background: #fff;
  padding: 2rem;
  text-align: center;
  border-radius: 0.428rem;
  margin-bottom: 1.25rem;
  border: 1px solid #EBE9F1;
}
.hero-card h1 {
  color: #7367F0;
  font-size: 2rem;
  font-weight: 500;
  margin: 0;
}

.layout-container {
  display: flex;
  min-height: calc(100vh - 64px);
  gap: 0.75rem;
  padding: 0.25rem;
}

.sidebar-left {
  width: 200px;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  position: sticky;
  top: 1rem;
  height: fit-content;
}
.filter-btn {
  background: #fff;
  border: 1px solid #7367F0;
  color: #7367F0;
  padding: 0.714rem 1.143rem;
  border-radius: 1.714rem;
  font-weight: 500;
  text-transform: uppercase;
  font-size: 0.857rem;
  cursor: pointer;
  transition: all 0.2s ease;
}
.filter-btn:hover { 
  background: rgba(115, 103, 240, 0.08);
  box-shadow: 0 4px 24px 0 rgba(34, 41, 47, 0.1);
}
.filter-btn.active {
  background: #7367F0;
  color: #fff;
  box-shadow: 0 8px 25px -8px #7367F0;
}

.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
}
.cards-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-bottom: 2rem;
}
.cards-grid .user-card {
  flex: 1 1 calc(33.333% - 0.5rem);
  min-width: 292px;
  max-width: 400px;
}

.sidebar-right {
  width: 320px;
  position: sticky;
  top: 1rem;
  height: fit-content;
}
.invites-panel {
  background: #fff;
  border: 1px solid #7367F0;
  border-radius: 0.428rem;
  overflow: hidden;
  box-shadow: 0 4px 24px 0 rgba(34, 41, 47, 0.1);
}
.invites-header {
  background: rgba(115, 103, 240, 0.12);
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-weight: 500;
  color: #5E5873;
  text-transform: uppercase;
  font-size: 0.857rem;
}
.invites-icon-header {
  background: #fff;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #7367F0;
  font-size: 1.5rem;
}
.invites-body {
  padding: 1rem;
  padding-top: 0.25rem;
  max-height: 75vh;
  overflow-y: auto;
}
.invite-item {
  background: rgba(115, 103, 240, 0.04);
  border: 1px solid rgba(115, 103, 240, 0.2);
  border-radius: 0.428rem;
  padding: 0.75rem;
  margin-bottom: 0.75rem;
}
.invite-item:last-child { margin-bottom: 0; }
.invite-title {
  font-weight: 600;
  color: #5E5873;
  margin-bottom: 0.25rem;
  font-size: 1rem;
}
.invite-subtitle {
  font-size: 0.857rem;
  color: #6E6B7B;
  margin-bottom: 0.5rem;
}
.invite-actions {
  display: flex;
  gap: 0.5rem;
}
.btn-accept {
  flex: 1;
  background: #28C76F;
  color: #fff;
  border: none;
  padding: 0.5rem 0.857rem;
  border-radius: 0.357rem;
  font-size: 0.857rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}
.btn-accept:hover { 
  background: #24B263;
  box-shadow: 0 8px 25px -8px #28C76F;
}
.btn-decline {
  flex: 1;
  background: #EA5455;
  color: #fff;
  border: none;
  padding: 0.5rem 0.857rem;
  border-radius: 0.357rem;
  font-size: 0.857rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}
.btn-decline:hover { 
  background: #D64747;
  box-shadow: 0 8px 25px -8px #EA5455;
}

.footer {
  background: #F8F8F8;
  padding: 1.5rem;
  text-align: center;
  color: #6E6B7B;
  font-size: 0.857rem;
  border-top: 1px solid #EBE9F1;
  margin-top: auto;
}

/* UserCard */
.user-card {
  background: #fff;
  border: 1px solid #D8D6DE;
  border-radius: 0.428rem;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.25s ease, box-shadow 0.25s ease;
  display: flex;
  flex-direction: column;
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
  background-position: center center !important;
  background-repeat: no-repeat !important;
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
  margin: 0;
  text-align: center;
}
.user-info {
  text-align: center;
  font-size: 1rem;
  color: #6E6B7B;
  line-height: 1.45;
  margin-top: 0;
}
.user-info p { margin: 0 0 0.25rem 0; }
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

@media (max-width: 1200px) {
  .sidebar-left, .sidebar-right { display: none; }
}
</style>`;

export const Default = {
  render: () => `
    ${styles}
    <div class="navbar-container">
      <div class="navbar-column"></div>
      <div class="navbar-column" style="display: flex; justify-content: center;">
        <div class="logo-container">
          <img src="/images/images-educa/logo-educacross.png" alt="Logo Educacross" style="height: 35px" />
        </div>
      </div>
      <div class="navbar-column" style="display: flex; justify-content: flex-end; gap: 12px;">
        <button class="btn-how-to-play">
          <span>🎮</span>
          <span>Como Jogar?</span>
        </button>
        <div class="user-dropdown">
          <div class="user-avatar">MN</div>
        </div>
      </div>
    </div>

    <div class="layout-container">
      <div class="sidebar-left">
        <button class="filter-btn active">Todos</button>
        <button class="filter-btn">Alunos</button>
        <button class="filter-btn">Professores</button>
        <button class="filter-btn">Gestores</button>
      </div>

      <div class="main-content">
        <div class="hero-card" style="background: url('/assets/bg-estrelas.svg') center center no-repeat; background-size: cover;">
          <h1>Seja bem-vindo(a)!</h1>
        </div>

        <div class="cards-grid">
          <div class="user-card">
            <div class="user-card-header" style="background: url('/profile-corujinhas/1.png') center center / 80px no-repeat, url('/assets/bg-bolinhas.svg') center center / cover no-repeat, #4DD9F5 linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.2) 100%);">
              <span class="user-badge">Aluno</span>
              <span class="settings-icon">⚙️</span>
            </div>
            <div class="user-card-body">
              <h2 class="user-name">Fabio G5</h2>
              <div class="user-info">
                <p>Colégio Nova Jornada</p>
                <p>G5 - Manhã <span class="class-badge">2º Ano</span></p>
              </div>
            </div>
          </div>

          <div class="user-card">
            <div class="user-card-header" style="background: url('/profile-corujinhas/2.png') center center / 80px no-repeat, url('/assets/bg-bolinhas.svg') center center / cover no-repeat, #5DADE2 linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.2) 100%);">
              <span class="user-badge">Aluno</span>
              <span class="settings-icon">⚙️</span>
            </div>
            <div class="user-card-body">
              <h2 class="user-name">Fabio 2º Ano</h2>
              <div class="user-info">
                <p>Colégio Nova Jornada</p>
              </div>
            </div>
          </div>

          <div class="user-card">
            <div class="user-card-header" style="background: url('/profile-corujinhas/5.png') center center / 80px no-repeat, url('/assets/bg-bolinhas.svg') center center / cover no-repeat, #FF8FB1 linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.2) 100%);">
              <span class="user-badge">Aluno</span>
              <span class="settings-icon">⚙️</span>
            </div>
            <div class="user-card-body">
              <h2 class="user-name">Alice 5º</h2>
              <div class="user-info">
                <p>Colégio Nova Jornada</p>
              </div>
            </div>
          </div>

          <div class="user-card">
            <div class="user-card-header" style="background: url('/assets/profiles/teacher.svg') center center / 80px no-repeat, url('/assets/bg-bolinhas.svg') center center / cover no-repeat, #7F6CC3 linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.2) 100%);">
              <span class="user-badge">Professor</span>
            </div>
            <div class="user-card-body">
              <h2 class="user-name">Colégio Nova Jornada</h2>
              <div class="classes-wrapper">
                <span class="class-tag">1º Ano A</span>
              </div>
              <div class="stats-section">
                <p class="stat-label">Alunos</p>
                <span class="stat-value">190</span>
              </div>
            </div>
          </div>

          <div class="user-card">
            <div class="user-card-header" style="background: url('/assets/profiles/coordinator.svg') center center / 80px no-repeat, url('/assets/bg-bolinhas.svg') center center / cover no-repeat, #F05FF3 linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.2) 100%);">
              <span class="user-badge">Coordenador</span>
            </div>
            <div class="user-card-body">
              <h2 class="user-name">Colégio Nova Jornada</h2>
              <div class="stats-section">
                <p class="stat-label">Alunos</p>
                <span class="stat-value">190</span>
              </div>
            </div>
          </div>

          <div class="user-card">
            <div class="user-card-header" style="background: url('/assets/profiles/network-manager.svg') center center / 80px no-repeat, url('/assets/bg-bolinhas.svg') center center / cover no-repeat, #00BDB8 linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.2) 100%);">
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
        </div>

        <div class="footer">
          © 2026 Educacross. Todos os direitos reservados.
        </div>
      </div>

      <div class="sidebar-right">
        <div class="invites-panel">
          <div class="invites-header">
            Novos Convites
            <div class="invites-icon-header">📬</div>
          </div>
          <div class="invites-body">
            <div class="invite-item">
              <div class="invite-title">Colégio Horizonte</div>
              <div class="invite-subtitle">Convite para Professor - 3º Ano B</div>
              <div class="invite-actions">
                <button class="btn-accept">Aceitar</button>
                <button class="btn-decline">Recusar</button>
              </div>
            </div>
            <div class="invite-item">
              <div class="invite-title">Escola Municipal Santos</div>
              <div class="invite-subtitle">Convite para Coordenador</div>
              <div class="invite-actions">
                <button class="btn-accept">Aceitar</button>
                <button class="btn-decline">Recusar</button>
              </div>
            </div>
            <div class="invite-item">
              <div class="invite-title">Rede Educacional ABC</div>
              <div class="invite-subtitle">Convite para Gestor de Redes</div>
              <div class="invite-actions">
                <button class="btn-accept">Aceitar</button>
                <button class="btn-decline">Recusar</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
};

export const Mobile = {
  parameters: {
    viewport: { defaultViewport: 'mobile1' }
  },
  render: () => `
    ${styles}
    <div class="navbar-container">
      <div class="navbar-column"></div>
      <div class="navbar-column" style="display: flex; justify-content: center;">
        <div class="logo-container">
          <img src="/images/images-educa/logo-educacross.png" alt="Logo Educacross" style="height: 35px" />
        </div>
      </div>
      <div class="navbar-column" style="display: flex; justify-content: flex-end; gap: 8px;">
        <button class="btn-how-to-play">
          <span>🎮</span>
        </button>
        <div class="user-dropdown">
          <div class="user-avatar">MN</div>
        </div>
      </div>
    </div>

    <div style="padding: 12px;">
      <div class="hero-card" style="padding: 20px; background: url('/assets/bg-estrelas.svg') center center no-repeat; background-size: cover;">
        <h1 style="font-size: 24px;">Seja bem-vindo(a)!</h1>
      </div>

      <div style="display: flex; flex-direction: column; gap: 12px;">
        <div class="user-card">
          <div class="user-card-header" style="background: url('/profile-corujinhas/1.png') center center / 80px no-repeat, url('/assets/bg-bolinhas.svg') center center / cover no-repeat, #4DD9F5 linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.2) 100%);">
            <span class="user-badge">Aluno</span>
            <span class="settings-icon">⚙️</span>
          </div>
          <div class="user-card-body">
            <h2 class="user-name">Fabio G5</h2>
            <div class="user-info">
              <p>Colégio Nova Jornada</p>
            </div>
          </div>
        </div>

        <div class="user-card">
          <div class="user-card-header" style="background: url('/assets/profiles/teacher.svg') center center / 80px no-repeat, url('/assets/bg-bolinhas.svg') center center / cover no-repeat, #7F6CC3 linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.2) 100%);">
            <span class="user-badge">Professor</span>
          </div>
          <div class="user-card-body">
            <h2 class="user-name">Colégio Nova Jornada</h2>
            <div class="stats-section">
              <p class="stat-label">Alunos</p>
              <span class="stat-value">190</span>
            </div>
          </div>
        </div>
      </div>

      <div class="footer" style="margin-top: 24px;">
        © 2026 Educacross. Todos os direitos reservados.
      </div>
    </div>
  `
};

export const SemConvites = {
  render: () => `
    ${styles}
    <div class="navbar-container">
      <div class="navbar-column"></div>
      <div class="navbar-column" style="display: flex; justify-content: center;">
        <div class="logo-container">
          <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='40' viewBox='0 0 120 40'%3E%3Ctext x='10' y='28' font-family='Arial,sans-serif' font-size='24' font-weight='bold' fill='%237367F0'%3EEducacross%3C/text%3E%3C/svg%3E" alt="Logo" />
        </div>
      </div>
      <div class="navbar-column" style="display: flex; justify-content: flex-end; gap: 12px;">
        <button class="btn-how-to-play">
          <span>🎮</span>
          <span>Como Jogar?</span>
        </button>
        <div class="user-dropdown">
          <div class="user-avatar">MN</div>
        </div>
      </div>
    </div>

    <div class="layout-container">
      <div class="sidebar-left">
        <button class="filter-btn active">Todos</button>
        <button class="filter-btn">Alunos</button>
        <button class="filter-btn">Professores</button>
      </div>

      <div class="main-content" style="max-width: 100%;">
        <div class="hero-card" style="background: url('/assets/bg-estrelas.svg') center center no-repeat; background-size: cover;">
          <h1>Seja bem-vindo(a)!</h1>
        </div>

        <div class="cards-grid">
          <div class="user-card">
            <div class="user-card-header" style="background: url('/profile-corujinhas/1.png') center center / 80px no-repeat, url('/assets/bg-bolinhas.svg') center center / cover no-repeat, #4DD9F5 linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.2) 100%);">
              <span class="user-badge">Aluno</span>
              <span class="settings-icon">⚙️</span>
            </div>
            <div class="user-card-body">
              <h2 class="user-name">Fabio G5</h2>
              <div class="user-info">
                <p>Colégio Nova Jornada</p>
              </div>
            </div>
          </div>

          <div class="user-card">
            <div class="user-card-header" style="background: url('/profile-corujinhas/2.png') center center / 80px no-repeat, url('/assets/bg-bolinhas.svg') center center / cover no-repeat, #5DADE2 linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.2) 100%);">
              <span class="user-badge">Aluno</span>
              <span class="settings-icon">⚙️</span>
            </div>
            <div class="user-card-body">
              <h2 class="user-name">Fabio 2º Ano</h2>
              <div class="user-info">
                <p>Colégio Nova Jornada</p>
              </div>
            </div>
          </div>

          <div class="user-card">
            <div class="user-card-header" style="background: url('/assets/profiles/teacher.svg') center center / 80px no-repeat, url('/assets/bg-bolinhas.svg') center center / cover no-repeat, #7F6CC3 linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.2) 100%);">
              <span class="user-badge">Professor</span>
            </div>
            <div class="user-card-body">
              <h2 class="user-name">Colégio Nova Jornada</h2>
              <div class="stats-section">
                <p class="stat-label">Alunos</p>
                <span class="stat-value">190</span>
              </div>
            </div>
          </div>

          <div class="user-card">
            <div class="user-card-header" style="background: url('/assets/profiles/coordinator.svg') center center / 80px no-repeat, url('/assets/bg-bolinhas.svg') center center / cover no-repeat, #F05FF3 linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.2) 100%);">
              <span class="user-badge">Coordenador</span>
            </div>
            <div class="user-card-body">
              <h2 class="user-name">Colégio Nova Jornada</h2>
              <div class="stats-section">
                <p class="stat-label">Alunos</p>
                <span class="stat-value">190</span>
              </div>
            </div>
          </div>
        </div>

        <div class="footer">
          © 2026 Educacross. Todos os direitos reservados.
        </div>
      </div>
    </div>
  `
};

/**
 * Story mostrando modal de edição aberto ao clicar na engrenagem
 */
export const WithEditModalOpen = {
  render: () => `
    ${styles}
    <style>
      /* Modal Styles - Copiado de EditProfileStudentNew */
      .modal {
        position: fixed;
        top: 0;
        left: 0;
        z-index: 1055;
        display: block;
        width: 100%;
        height: 100%;
        overflow-x: hidden;
        overflow-y: auto;
        outline: 0;
      }

      .modal-backdrop {
        position: fixed;
        top: 0;
        left: 0;
        z-index: 1050;
        width: 100vw;
        height: 100vh;
        background-color: #000;
        opacity: 0.5;
      }

      .modal-dialog {
        position: relative;
        width: auto;
        margin: 1.75rem auto;
        pointer-events: none;
        max-width: 800px;
      }

      .modal-dialog-centered {
        display: flex;
        align-items: center;
        min-height: calc(100% - 3.5rem);
      }

      .modal-content {
        position: relative;
        display: flex;
        flex-direction: column;
        width: 100%;
        pointer-events: auto;
        background-color: #fff;
        background-clip: padding-box;
        border: 1px solid rgba(0, 0, 0, 0.2);
        border-radius: 0.428rem;
        outline: 0;
        box-shadow: 0 0.25rem 0.5rem rgba(0, 0, 0, 0.5);
      }

      .modal-header {
        display: flex;
        flex-shrink: 0;
        align-items: center;
        justify-content: space-between;
        padding: 1.5rem;
        border-bottom: 1px solid #EBE9F1;
        border-top-left-radius: 0.428rem;
        border-top-right-radius: 0.428rem;
      }

      .modal-title {
        margin-bottom: 0;
        line-height: 1.5;
        font-size: 1.285rem;
        font-weight: 600;
        color: #5E5873;
      }

      .btn-close {
        padding: 0.25rem 0.25rem;
        margin: -0.5rem -0.5rem -0.5rem auto;
        background: transparent;
        border: 0;
        border-radius: 0.285rem;
        opacity: 0.5;
        cursor: pointer;
        width: 1em;
        height: 1em;
        box-sizing: content-box;
      }

      .btn-close:hover {
        opacity: 0.75;
      }

      .btn-close::before {
        content: '×';
        font-size: 2rem;
        line-height: 1;
        color: #5E5873;
      }

      .modal-body {
        padding: 24px;
      }

      .edit-container {
        display: grid;
        grid-template-columns: 210px 1fr;
        gap: 32px;
      }

      .avatar-section {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 8px;
      }

      .pet-img-selected-container {
        width: 202px;
        height: 202px;
        border-radius: 8px;
        background: #5F4B8B;
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
      }

      .pet-img-selected-container img {
        max-width: 70%;
        max-height: 70%;
      }

      .list-pets {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 6px;
        width: 100%;
      }

      .pet-container {
        width: 64px;
        height: 64px;
        border: 2px solid transparent;
        border-radius: 6px;
        cursor: pointer;
        opacity: 0.7;
        transition: all 0.2s;
      }

      .pet-container:hover {
        opacity: 0.9;
      }

      .pet-container.selected {
        border-color: #7367f0;
        opacity: 1;
      }

      .pet-img-container {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 4px;
        background: #f8f8f8;
      }

      .pet-img-container img {
        max-width: 90%;
        max-height: 90%;
      }

      .form-section {
        display: flex;
        flex-direction: column;
        gap: 16px;
      }

      .form-group {
        display: flex;
        flex-direction: column;
        gap: 8px;
      }

      .form-label {
        font-size: 14px;
        font-weight: 500;
        color: #5e5873;
      }

      .form-control {
        padding: 10px 12px;
        border: 1px solid #d8d6de;
        border-radius: 6px;
        font-size: 14px;
        transition: border-color 0.2s;
      }

      .form-control:focus {
        outline: none;
        border-color: #7367f0;
      }

      .form-control:disabled {
        background-color: #f0f0f0;
        cursor: not-allowed;
      }

      .password-input-group {
        position: relative;
      }

      .password-toggle {
        position: absolute;
        right: 12px;
        top: 50%;
        transform: translateY(-50%);
        background: none;
        border: none;
        cursor: pointer;
        color: #6e6b7b;
        padding: 4px;
      }

      .modal-footer {
        display: flex;
        justify-content: flex-end;
        gap: 12px;
        padding: 16px 24px;
        border-top: 1px solid #ebe9f1;
      }

      .btn {
        padding: 10px 24px;
        border-radius: 6px;
        font-size: 14px;
        font-weight: 500;
        cursor: pointer;
        border: 1px solid;
        transition: all 0.2s;
      }

      .btn-outline-danger {
        background: white;
        color: #ea5455;
        border-color: #ea5455;
      }

      .btn-outline-danger:hover {
        background: #ea5455;
        color: white;
      }

      .btn-primary {
        background: #7367f0;
        color: white;
        border-color: #7367f0;
      }

      .btn-primary:hover {
        background: #5e50ee;
        border-color: #5e50ee;
      }
    </style>

    <div style="background: #f8f8f8; padding: 24px;">
      <div class="navbar-container">
        <div class="navbar-column"></div>
        <div class="navbar-column" style="display: flex; justify-content: center;">
          <div class="logo-container">
            <img src="/images/images-educa/logo-educacross.png" alt="Logo Educacross" style="height: 40px" />
          </div>
        </div>
        <div class="navbar-column" style="display: flex; justify-content: flex-end; gap: 12px;">
          <button class="btn-how-to-play">
            <span>🎮</span>
            <span>Como Jogar?</span>
          </button>
          <div class="user-dropdown">
            <div class="user-avatar">MN</div>
          </div>
        </div>
      </div>

      <div class="main-content">
        <div class="hero-card" style="background: url('/assets/bg-estrelas.svg') center center no-repeat; background-size: cover;">
          <h1>Seja bem-vindo(a)!</h1>
        </div>

        <div class="cards-grid">
          <div class="user-card">
            <div class="user-card-header" style="background: url('/profile-corujinhas/7.png') center center / 80px no-repeat, url('/assets/bg-bolinhas.svg') center center / cover no-repeat, #5F4B8B linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.2) 100%);">
              <span class="user-badge">Aluno</span>
              <span class="settings-icon">⚙️</span>
            </div>
            <div class="user-card-body">
              <h2 class="user-name">Fabio G5</h2>
              <div class="user-info">
                <p>Colégio Nova Jornada</p>
                <p>G5 - Manhã <span class="class-badge">2º Ano</span></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal Backdrop -->
    <div class="modal-backdrop"></div>

    <!-- Modal -->
    <div class="modal" tabindex="-1">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Editar Perfil de Fabio G5</h5>
            <button type="button" class="btn-close" aria-label="Close"></button>
          </div>
          
          <div class="modal-body">
            <div class="edit-container">
              <!-- Avatar Section -->
              <div class="avatar-section">
                <div class="pet-img-selected-container">
                  <img src="/profile-corujinhas/7.png" alt="Avatar selecionado" />
                </div>
                
                <div class="list-pets">
                  <div class="pet-container">
                    <div class="pet-img-container">
                      <img src="/profile-corujinhas/1.png" alt="Mascote 1" />
                    </div>
                  </div>
                  <div class="pet-container">
                    <div class="pet-img-container">
                      <img src="/profile-corujinhas/2.png" alt="Mascote 2" />
                    </div>
                  </div>
                  <div class="pet-container">
                    <div class="pet-img-container">
                      <img src="/profile-corujinhas/3.png" alt="Mascote 3" />
                    </div>
                  </div>
                  <div class="pet-container">
                    <div class="pet-img-container">
                      <img src="/profile-corujinhas/4.png" alt="Mascote 4" />
                    </div>
                  </div>
                  <div class="pet-container">
                    <div class="pet-img-container">
                      <img src="/profile-corujinhas/5.png" alt="Mascote 5" />
                    </div>
                  </div>
                  <div class="pet-container">
                    <div class="pet-img-container">
                      <img src="/profile-corujinhas/6.png" alt="Mascote 6" />
                    </div>
                  </div>
                  <div class="pet-container selected">
                    <div class="pet-img-container">
                      <img src="/profile-corujinhas/7.png" alt="Mascote 7" />
                    </div>
                  </div>
                  <div class="pet-container">
                    <div class="pet-img-container">
                      <img src="/profile-corujinhas/8.png" alt="Mascote 8" />
                    </div>
                  </div>
                </div>
              </div>

              <!-- Form Section -->
              <div class="form-section">
                <div class="form-group">
                  <label class="form-label">Nome completo</label>
                  <input type="text" class="form-control" value="Fabio Garcia" disabled />
                </div>

                <div class="form-group">
                  <label class="form-label">Usuário</label>
                  <input type="text" class="form-control" value="fabiog5" disabled />
                </div>

                <div class="form-group">
                  <label class="form-label">Senha *</label>
                  <div class="password-input-group">
                    <input type="password" class="form-control" value="senha123" />
                    <button class="password-toggle">👁️</button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="modal-footer">
            <button class="btn btn-outline-danger">Cancelar</button>
            <button class="btn btn-primary">Salvar</button>
          </div>
        </div>
      </div>
    </div>
  `
};
