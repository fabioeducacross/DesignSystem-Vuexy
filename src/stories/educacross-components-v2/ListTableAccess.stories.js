/**
 * ListTableAccess - Access Control Table Component
 * 
 * Tabela de controle de acesso com gestão de usuários, perfis e permissões.
 * Inclui toggle switch para ativar/desativar acessos.
 * 
 * @component ListTableAccess
 * @category Educacross Components V2
 * @subcategory Tables
 * @priority P2
 * @status EXPANDED
 * @since v2.0
 * 
 * Key Features:
 * - ✅ User management with avatars and email
 * - ✅ Toggle switch for active/inactive status
 * - ✅ Profile badges (Admin, Professor, Coordenador)
 * - ✅ Last access tracking
 * - ✅ Permission grid visualization
 * - ✅ Filter bar (profile, status, search)
 * - ✅ Hierarchical levels with subordinate count
 * - ✅ Activity logs with IP tracking
 * - ✅ Invite management
 * 
 * Real-world usage:
 * - Admin gerenciando usuários do sistema
 * - Coordenador controlando acessos de professores
 * - Gestão de permissões por perfil
 * - Logs de auditoria (login, ações, IP)
 * - Envio e reenvio de convites
 */

export default {
  title: 'Front-office/Tables/ListTableAccess',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
# ListTableAccess

Tabela de **controle de acesso** para gestão de usuários, perfis e permissões. Inclui toggle switch para ativar/desativar usuários, badges de perfil e tracking de último acesso.

## Quando usar

- ✅ Admin gerenciando usuários e permissões
- ✅ Coordenador controlando acessos de professores
- ✅ Visualização de logs de auditoria (login, ações, IP)
- ✅ Gestão de convites pendentes
- ✅ Hierarquia organizacional com subordinados
- ✅ Permissões granulares por usuário

## Estados do usuário

- **Ativo**: Switch verde (#28C76F), último acesso recente
- **Inativo**: Switch cinza (#D8D6DE), último acesso antigo

## Características visuais

- **Toggle switch**: 44×24px, animação suave (0.3s)
- **Avatares coloridos**: 36×36px circle com iniciais
- **Badges de perfil**: Background roxo claro (#6E63E820)
- **Grid responsivo**: 4 colunas (Usuário, Perfil, Último Acesso, Status)
        `
      }
    }
  }
};

/**
 * ## Props API
 * 
 * | Prop | Type | Default | Description |
 * |------|------|---------|-------------|
 * | users | Array | [] | Array de objetos com dados dos usuários |
 * | showFilters | Boolean | false | Exibe barra de filtros (perfil, status, busca) |
 * | showPermissions | Boolean | false | Exibe grid de permissões ao invés de último acesso |
 * | mode | String | 'users' | Modo: 'users', 'logs', 'invites', 'hierarchy' |
 * | onToggleStatus | Function | null | Callback ao clicar toggle: (userId, newStatus) => void |
 * | onResendInvite | Function | null | Callback ao reenviar convite: (email) => void |
 * | compact | Boolean | false | Variante compacta (padding/avatares reduzidos) |
 * 
 * ## Design Specs
 * 
 * **Cores:**
 * - Switch ativo: background `#28C76F`
 * - Switch inativo: background `#D8D6DE`
 * - Badge perfil: background `#6E63E820`, color `#6E63E8`
 * - Avatares: cores temáticas (#6E63E8, #00CFE8, #28C76F, #FF9F43, #6E6B7B)
 * - Logs: success `#28C76F`, info `#6E63E8`, warning `#00CFE8`, error `#EA5455`
 * 
 * **Dimensões:**
 * - Toggle switch: `44×24px`, circle `18×18px`
 * - Avatares: `36×36px` circle (32px compact)
 * - Badge: padding `4px 10px`, border-radius `6px`, font-size `12px`
 * - Row padding: `12px 16px` (10px compact)
 * - Grid columns: `1fr 150px 150px 120px`
 * 
 * **Tipografia:**
 * - User name: `14px` weight `600` color `#5E5873`
 * - User email: `12px` color `#6E6B7B`
 * - Last access: `13px` color `#6E6B7B`
 * - Badge: `12px` weight `600`
 * - IP address: `12px` monospace color `#6E6B7B`
 * 
 * **Animação:**
 * - Toggle: transition `0.3s ease` (background + circle position)
 * - Row hover: background `#F8F8F8`, transition `0.2s`
 */

const styles = `<style>
.access-table {
  width: 100%;
  background: #fff;
  border: 1px solid #D8D6DE;
  border-radius: 8px;
  overflow: hidden;
}

.access-header {
  background: #F8F7FA;
  padding: 12px 16px;
  border-bottom: 2px solid #D8D6DE;
  display: grid;
  grid-template-columns: 1fr 150px 150px 120px;
  gap: 12px;
  font-weight: 600;
  font-size: 13px;
  color: #5E5873;
}

.access-row {
  display: grid;
  grid-template-columns: 1fr 150px 150px 120px;
  gap: 12px;
  padding: 12px 16px;
  border-bottom: 1px solid #EBE9F1;
  align-items: center;
  transition: background 0.2s ease;
}

.access-row:hover {
  background: #F8F8F8;
}

.access-row:last-child {
  border-bottom: none;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 12px;
}

.user-avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: #6E63E8;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 13px;
}

.user-name {
  font-weight: 600;
  color: #5E5873;
  font-size: 14px;
}

.user-email {
  font-size: 12px;
  color: #6E6B7B;
}

.badge {
  padding: 4px 10px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  display: inline-block;
}

.switch {
  position: relative;
  width: 44px;
  height: 24px;
  background: #D8D6DE;
  border-radius: 12px;
  cursor: pointer;
  transition: background 0.3s ease;
}

.switch.active {
  background: #28C76F;
}

.switch-circle {
  position: absolute;
  top: 3px;
  left: 3px;
  width: 18px;
  height: 18px;
  background: #fff;
  border-radius: 50%;
  transition: left 0.3s ease;
}

.switch.active .switch-circle {
  left: 23px;
}

.filter-bar {
  display: flex;
  gap: 12px;
  padding: 16px;
  background: #F8F7FA;
  border-bottom: 1px solid #D8D6DE;
}

.filter-select {
  padding: 8px 12px;
  border-radius: 6px;
  border: 1px solid #D8D6DE;
  background: #fff;
  font-size: 13px;
}

.permission-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
  font-size: 12px;
}

.permission-item {
  display: flex;
  align-items: center;
  gap: 4px;
  color: #6E6B7B;
}

.permission-item i {
  color: #28C76F;
}

.hierarchy-badge {
  padding: 3px 8px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
}

.log-badge {
  padding: 3px 8px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 600;
}

.invite-btn {
  padding: 6px 12px;
  border-radius: 6px;
  border: none;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: opacity 0.2s ease;
}

.invite-btn:hover {
  opacity: 0.85;
}
</style>`;

/**
 * Story: Default
 * 
 * Lista padrão de 4 usuários com perfis (Admin, Professor, Coordenador).
 * 3 ativos (switch verde) + 1 inativo (switch cinza).
 * 
 * Educational context: Admin visualizando usuários cadastrados no sistema.
 */
export const Default = {
  render: () => `
    ${styles}
    <div class="access-table">
      <div class="access-header">
        <div>Usuário</div>
        <div>Perfil</div>
        <div>Último Acesso</div>
        <div>Status</div>
      </div>
      ${[
        {n: 'Ana Silva', e: 'ana@escola.com', p: 'Admin', u: 'Hoje 10:30', a: true, c: '#6E63E8'},
        {n: 'Bruno Costa', e: 'bruno@escola.com', p: 'Professor', u: 'Hoje 09:15', a: true, c: '#00CFE8'},
        {n: 'Diana Santos', e: 'diana@escola.com', p: 'Coordenador', u: 'Ontem 16:45', a: true, c: '#28C76F'},
        {n: 'Eduardo Lima', e: 'eduardo@escola.com', p: 'Professor', u: '05/02/2026', a: false, c: '#FF9F43'}
      ].map(u => `
        <div class="access-row">
          <div class="user-info">
            <div class="user-avatar" style="background: ${u.c}">
              ${u.n.split(' ').map(n => n[0]).join('')}
            </div>
            <div>
              <div class="user-name">${u.n}</div>
              <div class="user-email">${u.e}</div>
            </div>
          </div>
          <div>
            <span class="badge" style="background: #6E63E820; color: #6E63E8">${u.p}</span>
          </div>
          <div style="font-size: 13px; color: #6E6B7B">${u.u}</div>
          <div>
            <div class="switch${u.a ? ' active' : ''}">
              <div class="switch-circle"></div>
            </div>
          </div>
        </div>
      `).join('')}
    </div>
  `
};

/**
 * Story: Permissoes
 * 
 * Grid de permissões ao invés de último acesso.
 * Cada usuário com 2-3 permissões checadas (ícone verde).
 * 
 * Educational context: Admin configurando permissões granulares por usuário.
 */
export const Permissoes = {
  render: () => `
    ${styles}
    <div class="access-table">
      <div class="access-header">
        <div>Usuário</div>
        <div colspan="3">Permissões</div>
      </div>
      ${[
        {n: 'Ana Silva', p: ['Gerenciar Usuários', 'Criar Missões', 'Ver Relatórios'], c: '#6E63E8'},
        {n: 'Bruno Costa', p: ['Criar Missões', 'Ver Alunos'], c: '#00CFE8'},
        {n: 'Diana Santos', p: ['Ver Relatórios', 'Gerenciar Turmas', 'Criar Missões'], c: '#28C76F'}
      ].map((u, i) => `
        <div class="access-row" style="grid-template-columns: 200px 1fr">
          <div class="user-info">
            <div class="user-avatar" style="background: ${u.c}">
              ${u.n.split(' ').map(n => n[0]).join('')}
            </div>
            <div class="user-name">${u.n}</div>
          </div>
          <div class="permission-grid">
            ${u.p.map(p => `
              <div class="permission-item">
                <i class="bi bi-check-circle-fill"></i>${p}
              </div>
            `).join('')}
          </div>
        </div>
      `).join('')}
    </div>
  `
};

/**
 * Story: ComFiltro
 * 
 * Barra de filtros com 3 controles:
 * - Select perfil (Todos, Admin, Professor, Coordenador)
 * - Select status (Todos, Ativos, Inativos)
 * - Input de busca
 * 
 * Resultado filtrado: 1 usuário Admin ativo.
 * 
 * Educational context: Admin filtrando usuários por perfil e status.
 */
export const ComFiltro = {
  render: () => `
    ${styles}
    <div class="access-table">
      <div class="filter-bar">
        <select class="filter-select">
          <option>Todos os Perfis</option>
          <option selected>Admin</option>
          <option>Professor</option>
          <option>Coordenador</option>
        </select>
        <select class="filter-select">
          <option>Todos Status</option>
          <option selected>Ativos</option>
          <option>Inativos</option>
        </select>
        <input type="text" placeholder="Buscar usuário..." class="filter-select" style="flex: 1">
      </div>
      <div class="access-header">
        <div>Usuário</div>
        <div>Perfil</div>
        <div>Último Acesso</div>
        <div>Status</div>
      </div>
      ${[
        {n: 'Ana Silva', e: 'ana@escola.com', p: 'Admin', u: 'Hoje', a: true}
      ].map(u => `
        <div class="access-row">
          <div class="user-info">
            <div class="user-avatar">${u.n.split(' ').map(n => n[0]).join('')}</div>
            <div>
              <div class="user-name">${u.n}</div>
              <div class="user-email">${u.e}</div>
            </div>
          </div>
          <div>
            <span class="badge" style="background: #6E63E820; color: #6E63E8">${u.p}</span>
          </div>
          <div style="font-size: 13px; color: #6E6B7B">${u.u}</div>
          <div>
            <div class="switch active">
              <div class="switch-circle"></div>
            </div>
          </div>
        </div>
      `).join('')}
    </div>
  `
};

/**
 * Story: Hierarquia
 * 
 * Hierarquia organizacional com 3 níveis:
 * - Nível 1 (Diretora): 3 subordinados
 * - Nível 2 (Coordenador): 5 subordinados
 * - Nível 3 (Professora): 0 subordinados
 * 
 * Badge colorido por nível hierárquico.
 * 
 * Educational context: Diretora visualizando estrutura organizacional da escola.
 */
export const Hierarquia = {
  render: () => `
    ${styles}
    <div class="access-table">
      <div class="access-header">
        <div>Usuário</div>
        <div>Nível</div>
        <div>Subordinados</div>
        <div>Status</div>
      </div>
      ${[
        {n: 'Maria Diretora', p: 'Nível 1', s: 3, b: '#6E63E8'},
        {n: 'João Coordenador', p: 'Nível 2', s: 5, b: '#00CFE8'},
        {n: 'Ana Professora', p: 'Nível 3', s: 0, b: '#28C76F'}
      ].map(u => `
        <div class="access-row">
          <div class="user-info">
            <div class="user-avatar" style="background: ${u.b}">
              ${u.n.split(' ').map(n => n[0]).join('')}
            </div>
            <div class="user-name">${u.n}</div>
          </div>
          <div>
            <span class="hierarchy-badge" style="background: ${u.b}; color: #fff">${u.p}</span>
          </div>
          <div style="font-weight: 600; color: #6E63E8">${u.s} usuários</div>
          <div>
            <div class="switch active">
              <div class="switch-circle"></div>
            </div>
          </div>
        </div>
      `).join('')}
    </div>
  `
};

/**
 * Story: Logs
 * 
 * Logs de auditoria com 4 ações:
 * - Login (success green)
 * - Criar Missão (info purple)
 * - Editar Turma (info cyan)
 * - Login Failed (error red)
 * 
 * Colunas: Usuário, Ação, Data/Hora, IP.
 * 
 * Educational context: Admin auditando ações do sistema com tracking de IP.
 */
export const Logs = {
  render: () => `
    ${styles}
    <div class="access-table">
      <div class="access-header">
        <div>Usuário</div>
        <div>Ação</div>
        <div>Data/Hora</div>
        <div>IP</div>
      </div>
      ${[
        {n: 'Ana Silva', a: 'Login', d: 'Hoje 10:30', ip: '192.168.1.10', c: '#28C76F'},
        {n: 'Bruno Costa', a: 'Criar Missão', d: 'Hoje 09:45', ip: '192.168.1.25', c: '#6E63E8'},
        {n: 'Diana Santos', a: 'Editar Turma', d: 'Hoje 09:20', ip: '192.168.1.18', c: '#00CFE8'},
        {n: 'Eduardo Lima', a: 'Login Failed', d: 'Ontem 23:50', ip: '177.45.32.8', c: '#EA5455'}
      ].map(l => `
        <div class="access-row">
          <div class="user-info">
            <div class="user-avatar" style="background: ${l.c}">
              ${l.n.split(' ').map(n => n[0]).join('')}
            </div>
            <div class="user-name">${l.n}</div>
          </div>
          <div>
            <span class="log-badge" style="background: ${l.c}20; color: ${l.c}">${l.a}</span>
          </div>
          <div style="font-size: 13px; color: #6E6B7B">${l.d}</div>
          <div style="font-size: 12px; color: #6E6B7B; font-family: monospace">${l.ip}</div>
        </div>
      `).join('')}
    </div>
  `
};

/**
 * Story: Convites
 * 
 * Gestão de convites pendentes.
 * 2 convites com perfis Professor e Coordenador.
 * Botão "Reenviar" roxo por convite.
 * 
 * Educational context: Admin gerenciando convites enviados aguardando aceitação.
 */
export const Convites = {
  render: () => `
    ${styles}
    <div class="access-table">
      <div class="access-header">
        <div>Email Convidado</div>
        <div>Perfil</div>
        <div>Enviado Em</div>
        <div>Ação</div>
      </div>
      ${[
        {e: 'novo@escola.com', p: 'Professor', d: 'Hoje'},
        {e: 'outro@escola.com', p: 'Coordenador', d: 'Ontem'}
      ].map(i => `
        <div class="access-row">
          <div style="font-weight: 600; color: #6E6B7B">${i.e}</div>
          <div>
            <span class="badge" style="background: #FF9F4320; color: #FF9F43">${i.p}</span>
          </div>
          <div style="font-size: 13px; color: #6E6B7B">${i.d}</div>
          <div>
            <button class="invite-btn" style="background: #6E63E8; color: #fff">Reenviar</button>
          </div>
        </div>
      `).join('')}
    </div>
  `
};

/**
 * Story: Compacta
 * 
 * Variante compacta com:
 * - Avatares 32×32px (reduzidos)
 * - Padding 10px (reduzido de 12px)
 * - Switch 36×20px (reduzido de 44×24px)
 * - Font-size 13px nos nomes
 * - Grid simplificado (3 colunas: Usuário, Perfil, Status)
 * 
 * Educational context: Widget sidebar com lista compacta de usuários.
 */
export const Compacta = {
  render: () => `
    ${styles}
    <div class="access-table" style="font-size: 13px">
      <div class="access-header" style="padding: 10px 12px">
        <div>Usuário</div>
        <div>Perfil</div>
        <div>Status</div>
      </div>
      ${[
        {n: 'Ana Silva', p: 'Admin', a: true, c: '#6E63E8'},
        {n: 'Bruno Costa', p: 'Professor', a: true, c: '#00CFE8'},
        {n: 'Diana Santos', p: 'Coordenador', a: false, c: '#28C76F'}
      ].map((u, i) => `
        <div class="access-row" style="padding: 10px 12px; grid-template-columns: 1fr 120px 80px">
          <div class="user-info" style="gap: 8px">
            <div class="user-avatar" style="width: 32px; height: 32px; font-size: 12px; background: ${u.c}">
              ${u.n.split(' ').map(n => n[0]).join('')}
            </div>
            <div class="user-name" style="font-size: 13px">${u.n}</div>
          </div>
          <div>
            <span class="badge" style="padding: 3px 8px; font-size: 11px; background: #6E63E820; color: #6E63E8">${u.p}</span>
          </div>
          <div>
            <div class="switch${u.a ? ' active' : ''}" style="width: 36px; height: 20px">
              <div class="switch-circle" style="width: 14px; height: 14px"></div>
            </div>
          </div>
        </div>
      `).join('')}
    </div>
  `
};

/**
 * Story: Completa
 * 
 * Interface completa com:
 * - Header "Controle de Acesso" + subtitle "4 usuários ativos • 1 inativo"
 * - Botão "Adicionar Usuário" roxo com ícone +
 * - Tabela com 4 usuários (3 ativos, 1 inativo)
 * - Contexto educacional no rodapé
 * 
 * Educational context: Admin gerenciando painel completo de controle de acesso.
 */
export const Completa = {
  render: () => `
    ${styles}
    <div style="background: #fff; border: 1px solid #D8D6DE; border-radius: 8px; padding: 20px">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px">
        <div>
          <h3 style="margin: 0; font-size: 20px; font-weight: 700; color: #5E5873">Controle de Acesso</h3>
          <div style="font-size: 13px; color: #6E6B7B; margin-top: 4px">4 usuários ativos • 1 inativo</div>
        </div>
        <button style="padding: 10px 20px; background: #6E63E8; color: #fff; border: none; border-radius: 6px; font-weight: 600; cursor: pointer">
          <i class="bi bi-plus-lg"></i> Adicionar Usuário
        </button>
      </div>
      
      <div class="access-table">
        <div class="access-header">
          <div>Usuário</div>
          <div>Perfil</div>
          <div>Último Acesso</div>
          <div>Status</div>
        </div>
        ${[
          {n: 'Ana Silva', e: 'ana@escola.com', p: 'Admin', u: 'Hoje 10:30', a: true, c: '#6E63E8'},
          {n: 'Bruno Costa', e: 'bruno@escola.com', p: 'Professor', u: 'Hoje 09:15', a: true, c: '#00CFE8'},
          {n: 'Diana Santos', e: 'diana@escola.com', p: 'Coordenador', u: 'Ontem 16:45', a: true, c: '#28C76F'},
          {n: 'Eduardo Lima', e: 'eduardo@escola.com', p: 'Professor', u: '05/02/2026', a: false, c: '#6E6B7B'}
        ].map(u => `
          <div class="access-row">
            <div class="user-info">
              <div class="user-avatar" style="background: ${u.c}">
                ${u.n.split(' ').map(n => n[0]).join('')}
              </div>
              <div>
                <div class="user-name">${u.n}</div>
                <div class="user-email">${u.e}</div>
              </div>
            </div>
            <div>
              <span class="badge" style="background: #6E63E820; color: #6E63E8">${u.p}</span>
            </div>
            <div style="font-size: 13px; color: #6E6B7B">${u.u}</div>
            <div>
              <div class="switch${u.a ? ' active' : ''}">
                <div class="switch-circle"></div>
              </div>
            </div>
          </div>
        `).join('')}
      </div>
      
      <p style="margin-top: 12px; font-size: 13px; color: #6E6B7B">
        <strong>Contexto:</strong> Gestão de acessos (admin gerenciando permissões de usuários).
      </p>
    </div>
  `
};
