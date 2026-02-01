/**
 * Educacross Assets - Ícones e Ilustrações SVG
 * 
 * Assets oficiais da marca Educacross
 * Disponíveis em /vuexy/img/educacross/
 */

export default {
  title: 'Educacross/Foundations/Assets',
  parameters: {
    layout: 'padded',
  },
};

/**
 * Logos - Logotipos oficiais
 */
export const Logos = {
  render: () => `
    <style>
      .asset-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
        gap: 1.5rem;
      }
      
      .asset-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 1.5rem;
        background: #f8f9fa;
        border-radius: 0.5rem;
        text-align: center;
        transition: all 0.2s;
        border: 1px solid #e9ecef;
      }
      
      .asset-item:hover {
        background: #fff;
        box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        transform: translateY(-2px);
      }
      
      .asset-item img {
        max-width: 120px;
        max-height: 80px;
        margin-bottom: 1rem;
        object-fit: contain;
      }
      
      .asset-name {
        font-size: 0.75rem;
        color: #6c757d;
        word-break: break-all;
      }
      
      .asset-path {
        font-size: 0.625rem;
        color: #adb5bd;
        font-family: monospace;
        margin-top: 0.25rem;
      }
      
      .section-title {
        font-family: var(--edu-font-brand);
        font-weight: 600;
        color: var(--edu-primary, #0C5257);
        margin: 2rem 0 1rem;
        padding-bottom: 0.5rem;
        border-bottom: 2px solid var(--edu-gold, #FAB84A);
      }
      
      .logo-large {
        max-width: 200px !important;
        max-height: 100px !important;
      }
    </style>
    
    <div>
      <h4 class="mb-4">Logos Educacross</h4>
      <p class="text-muted mb-4">Logotipos oficiais da marca. Base path: <code>/vuexy/img/educacross/logos/</code></p>
      
      <div class="asset-grid">
        <div class="asset-item">
          <img src="/vuexy/img/educacross/logos/Horizontal.svg" alt="Logo Horizontal" class="logo-large">
          <span class="asset-name">Horizontal</span>
          <span class="asset-path">logos/Horizontal.svg</span>
        </div>
        
        <div class="asset-item">
          <img src="/vuexy/img/educacross/logos/Centralizado.svg" alt="Logo Centralizado" class="logo-large">
          <span class="asset-name">Centralizado</span>
          <span class="asset-path">logos/Centralizado.svg</span>
        </div>
        
        <div class="asset-item">
          <img src="/vuexy/img/educacross/logos/Justificado.svg" alt="Logo Justificado" class="logo-large">
          <span class="asset-name">Justificado</span>
          <span class="asset-path">logos/Justificado.svg</span>
        </div>
        
        <div class="asset-item">
          <img src="/vuexy/img/educacross/logos/Belinha.svg" alt="Belinha Mascote">
          <span class="asset-name">Belinha (Mascote)</span>
          <span class="asset-path">logos/Belinha.svg</span>
        </div>
      </div>
    </div>
  `,
};

/**
 * Gamificação - Elementos de gamificação
 */
export const Gamification = {
  render: () => `
    <div>
      <h4 class="mb-4">Gamificação</h4>
      <p class="text-muted mb-4">Elementos de gamificação. Base path: <code>/vuexy/img/educacross/gamification/</code></p>
      
      <h6 class="section-title">Troféus</h6>
      <div class="asset-grid">
        <div class="asset-item">
          <img src="/vuexy/img/educacross/gamification/Trofeu-bronze.svg" alt="Troféu Bronze">
          <span class="asset-name">Troféu Bronze</span>
        </div>
        <div class="asset-item">
          <img src="/vuexy/img/educacross/gamification/Trofeu-Prata.svg" alt="Troféu Prata">
          <span class="asset-name">Troféu Prata</span>
        </div>
        <div class="asset-item">
          <img src="/vuexy/img/educacross/gamification/Troféu-Ouro.svg" alt="Troféu Ouro">
          <span class="asset-name">Troféu Ouro</span>
        </div>
      </div>
      
      <h6 class="section-title">Insígnias</h6>
      <div class="asset-grid">
        <div class="asset-item">
          <img src="/vuexy/img/educacross/gamification/Insignia-Bronze.svg" alt="Insígnia Bronze">
          <span class="asset-name">Insígnia Bronze</span>
        </div>
        <div class="asset-item">
          <img src="/vuexy/img/educacross/gamification/Insignia-Prata.svg" alt="Insígnia Prata">
          <span class="asset-name">Insígnia Prata</span>
        </div>
        <div class="asset-item">
          <img src="/vuexy/img/educacross/gamification/Insignia-Ouro.svg" alt="Insígnia Ouro">
          <span class="asset-name">Insígnia Ouro</span>
        </div>
      </div>
      
      <h6 class="section-title">Recompensas</h6>
      <div class="asset-grid">
        <div class="asset-item">
          <img src="/vuexy/img/educacross/gamification/Estrelas.svg" alt="Estrelas">
          <span class="asset-name">Estrelas</span>
        </div>
        <div class="asset-item">
          <img src="/vuexy/img/educacross/gamification/Moedas.svg" alt="Moedas">
          <span class="asset-name">Moedas</span>
        </div>
        <div class="asset-item">
          <img src="/vuexy/img/educacross/gamification/Pontos-XP.svg" alt="Pontos XP">
          <span class="asset-name">Pontos XP</span>
        </div>
        <div class="asset-item">
          <img src="/vuexy/img/educacross/gamification/Pontos-Eventos.svg" alt="Pontos Eventos">
          <span class="asset-name">Pontos Eventos</span>
        </div>
      </div>
    </div>
  `,
};

/**
 * Áreas de Conhecimento - Disciplinas
 */
export const Subjects = {
  render: () => `
    <div>
      <h4 class="mb-4">Áreas de Conhecimento</h4>
      <p class="text-muted mb-4">Ícones de disciplinas. Base path: <code>/vuexy/img/educacross/subjects/</code></p>
      
      <div class="asset-grid">
        <div class="asset-item">
          <img src="/vuexy/img/educacross/subjects/Matemática.svg" alt="Matemática">
          <span class="asset-name">Matemática</span>
        </div>
        <div class="asset-item">
          <img src="/vuexy/img/educacross/subjects/Math.svg" alt="Math">
          <span class="asset-name">Math (compacto)</span>
        </div>
        <div class="asset-item">
          <img src="/vuexy/img/educacross/subjects/MT.svg" alt="MT">
          <span class="asset-name">MT (abreviado)</span>
        </div>
        <div class="asset-item">
          <img src="/vuexy/img/educacross/subjects/Língua Portuguesa.svg" alt="Língua Portuguesa">
          <span class="asset-name">Língua Portuguesa</span>
        </div>
        <div class="asset-item">
          <img src="/vuexy/img/educacross/subjects/LP.svg" alt="LP">
          <span class="asset-name">LP (abreviado)</span>
        </div>
        <div class="asset-item">
          <img src="/vuexy/img/educacross/subjects/Liga das Corujinhas.svg" alt="Liga das Corujinhas">
          <span class="asset-name">Liga das Corujinhas</span>
        </div>
        <div class="asset-item">
          <img src="/vuexy/img/educacross/subjects/LIGA.svg" alt="Liga">
          <span class="asset-name">Liga (compacto)</span>
        </div>
        <div class="asset-item">
          <img src="/vuexy/img/educacross/subjects/Todas.svg" alt="Todas">
          <span class="asset-name">Todas as áreas</span>
        </div>
      </div>
    </div>
  `,
};

/**
 * Métricas - Indicadores de desempenho
 */
export const Metrics = {
  render: () => `
    <div>
      <h4 class="mb-4">Métricas</h4>
      <p class="text-muted mb-4">Ícones de métricas e indicadores. Base path: <code>/vuexy/img/educacross/metrics/</code></p>
      
      <div class="asset-grid">
        <div class="asset-item">
          <img src="/vuexy/img/educacross/metrics/Progresso.svg" alt="Progresso">
          <span class="asset-name">Progresso</span>
        </div>
        <div class="asset-item">
          <img src="/vuexy/img/educacross/metrics/Percentual de acertos.svg" alt="Percentual de acertos">
          <span class="asset-name">% de Acertos</span>
        </div>
        <div class="asset-item">
          <img src="/vuexy/img/educacross/metrics/Tempo de Aprendizagem.svg" alt="Tempo de Aprendizagem">
          <span class="asset-name">Tempo de Aprendizagem</span>
        </div>
        <div class="asset-item">
          <img src="/vuexy/img/educacross/metrics/Pontos.svg" alt="Pontos">
          <span class="asset-name">Pontos</span>
        </div>
        <div class="asset-item">
          <img src="/vuexy/img/educacross/metrics/Jogos.svg" alt="Jogos">
          <span class="asset-name">Jogos</span>
        </div>
        <div class="asset-item">
          <img src="/vuexy/img/educacross/metrics/Desafios.svg" alt="Desafios">
          <span class="asset-name">Desafios</span>
        </div>
        <div class="asset-item">
          <img src="/vuexy/img/educacross/metrics/Dificuldade.svg" alt="Dificuldade">
          <span class="asset-name">Dificuldade</span>
        </div>
        <div class="asset-item">
          <img src="/vuexy/img/educacross/metrics/Top.svg" alt="Top">
          <span class="asset-name">Top / Ranking</span>
        </div>
      </div>
    </div>
  `,
};

/**
 * Proficiência - Níveis de proficiência
 */
export const Proficiency = {
  render: () => `
    <div>
      <h4 class="mb-4">Proficiência</h4>
      <p class="text-muted mb-4">Níveis de proficiência do aluno. Base path: <code>/vuexy/img/educacross/proficiency/</code></p>
      
      <div class="asset-grid">
        <div class="asset-item" style="border-color: #28C76F;">
          <img src="/vuexy/img/educacross/proficiency/avançado.svg" alt="Avançado">
          <span class="asset-name" style="color: #28C76F; font-weight: 600;">Avançado</span>
        </div>
        <div class="asset-item" style="border-color: #00CFE8;">
          <img src="/vuexy/img/educacross/proficiency/proficiente.svg" alt="Proficiente">
          <span class="asset-name" style="color: #00CFE8; font-weight: 600;">Proficiente</span>
        </div>
        <div class="asset-item" style="border-color: #FF9F43;">
          <img src="/vuexy/img/educacross/proficiency/básico.svg" alt="Básico">
          <span class="asset-name" style="color: #FF9F43; font-weight: 600;">Básico</span>
        </div>
        <div class="asset-item" style="border-color: #EA5455;">
          <img src="/vuexy/img/educacross/proficiency/abaixo do básico.svg" alt="Abaixo do Básico">
          <span class="asset-name" style="color: #EA5455; font-weight: 600;">Abaixo do Básico</span>
        </div>
        <div class="asset-item" style="border-color: #6c757d;">
          <img src="/vuexy/img/educacross/proficiency/não fizeram.svg" alt="Não fizeram">
          <span class="asset-name" style="color: #6c757d; font-weight: 600;">Não Fizeram</span>
        </div>
      </div>
      
      <div class="alert alert-info mt-4">
        <strong>Uso:</strong> Estes ícones são usados em relatórios de proficiência e dashboards 
        de acompanhamento para indicar o nível de desempenho do aluno.
      </div>
    </div>
  `,
};

/**
 * Tipos de Usuários - Perfis do sistema
 */
export const UserTypes = {
  render: () => `
    <div>
      <h4 class="mb-4">Tipos de Usuários</h4>
      <p class="text-muted mb-4">Ícones de perfis de usuário. Base path: <code>/vuexy/img/educacross/users/</code></p>
      
      <div class="asset-grid">
        <div class="asset-item">
          <img src="/vuexy/img/educacross/users/Aluno.svg" alt="Aluno">
          <span class="asset-name">Aluno</span>
        </div>
        <div class="asset-item">
          <img src="/vuexy/img/educacross/users/Professor.svg" alt="Professor">
          <span class="asset-name">Professor</span>
        </div>
        <div class="asset-item">
          <img src="/vuexy/img/educacross/users/Coordenadores.svg" alt="Coordenador">
          <span class="asset-name">Coordenador</span>
        </div>
        <div class="asset-item">
          <img src="/vuexy/img/educacross/users/Diretor.svg" alt="Diretor">
          <span class="asset-name">Diretor</span>
        </div>
        <div class="asset-item">
          <img src="/vuexy/img/educacross/users/Gestor de rede.svg" alt="Gestor de Rede">
          <span class="asset-name">Gestor de Rede</span>
        </div>
        <div class="asset-item">
          <img src="/vuexy/img/educacross/users/Administrador.svg" alt="Administrador">
          <span class="asset-name">Administrador</span>
        </div>
      </div>
    </div>
  `,
};

/**
 * Agrupamentos - Níveis organizacionais
 */
export const Groups = {
  render: () => `
    <div>
      <h4 class="mb-4">Tipos de Agrupamentos</h4>
      <p class="text-muted mb-4">Níveis organizacionais do sistema. Base path: <code>/vuexy/img/educacross/groups/</code></p>
      
      <div class="asset-grid">
        <div class="asset-item">
          <img src="/vuexy/img/educacross/groups/Rede.svg" alt="Rede">
          <span class="asset-name">Rede</span>
        </div>
        <div class="asset-item">
          <img src="/vuexy/img/educacross/groups/Escola.svg" alt="Escola">
          <span class="asset-name">Escola</span>
        </div>
        <div class="asset-item">
          <img src="/vuexy/img/educacross/groups/Ano.svg" alt="Ano">
          <span class="asset-name">Ano</span>
        </div>
        <div class="asset-item">
          <img src="/vuexy/img/educacross/groups/Turmas.svg" alt="Turmas">
          <span class="asset-name">Turmas</span>
        </div>
      </div>
      
      <div class="alert alert-info mt-4">
        <strong>Hierarquia:</strong> Rede → Escola → Ano → Turmas → Alunos
      </div>
    </div>
  `,
};

/**
 * Ícones do Menu - Navegação principal
 */
export const MenuIcons = {
  render: () => `
    <div>
      <h4 class="mb-4">Ícones do Menu</h4>
      <p class="text-muted mb-4">Ícones usados na navegação principal. Base path: <code>/vuexy/img/educacross/menu/</code></p>
      
      <div class="asset-grid">
        <div class="asset-item">
          <img src="/vuexy/img/educacross/menu/Avaliação.svg" alt="Avaliação">
          <span class="asset-name">Avaliação</span>
        </div>
        <div class="asset-item">
          <img src="/vuexy/img/educacross/menu/Eventos.svg" alt="Eventos">
          <span class="asset-name">Eventos</span>
        </div>
        <div class="asset-item">
          <img src="/vuexy/img/educacross/menu/search_FILL0_wght400_GRAD0_opsz48 1.svg" alt="Buscar">
          <span class="asset-name">Buscar</span>
        </div>
        <div class="asset-item">
          <img src="/vuexy/img/educacross/menu/grid_view_FILL0_wght400_GRAD0_opsz48 1.svg" alt="Grid View">
          <span class="asset-name">Grid View</span>
        </div>
        <div class="asset-item">
          <img src="/vuexy/img/educacross/menu/groups_FILL0_wght400_GRAD0_opsz48 1.svg" alt="Grupos">
          <span class="asset-name">Grupos</span>
        </div>
        <div class="asset-item">
          <img src="/vuexy/img/educacross/menu/pie_chart_FILL0_wght400_GRAD0_opsz48 1.svg" alt="Gráficos">
          <span class="asset-name">Gráficos</span>
        </div>
        <div class="asset-item">
          <img src="/vuexy/img/educacross/menu/map_FILL0_wght400_GRAD0_opsz48 1.svg" alt="Mapa">
          <span class="asset-name">Mapa</span>
        </div>
        <div class="asset-item">
          <img src="/vuexy/img/educacross/menu/download_FILL0_wght400_GRAD0_opsz48 1.svg" alt="Download">
          <span class="asset-name">Download</span>
        </div>
      </div>
    </div>
  `,
};

/**
 * Ícones de Ação - Botões e ações
 */
export const ActionIcons = {
  render: () => `
    <div>
      <h4 class="mb-4">Ícones de Ação</h4>
      <p class="text-muted mb-4">Ícones usados em botões e ações. Base path: <code>/vuexy/img/educacross/actions/</code></p>
      
      <div class="asset-grid">
        <div class="asset-item">
          <img src="/vuexy/img/educacross/actions/edit_FILL0_wght400_GRAD0_opsz48.svg" alt="Editar">
          <span class="asset-name">Editar</span>
        </div>
        <div class="asset-item">
          <img src="/vuexy/img/educacross/actions/delete_FILL0_wght400_GRAD0_opsz48.svg" alt="Excluir">
          <span class="asset-name">Excluir</span>
        </div>
        <div class="asset-item">
          <img src="/vuexy/img/educacross/actions/visibility_FILL0_wght400_GRAD0_opsz48 2.svg" alt="Visualizar">
          <span class="asset-name">Visualizar</span>
        </div>
        <div class="asset-item">
          <img src="/vuexy/img/educacross/actions/upload_file_FILL0_wght400_GRAD0_opsz48 1.svg" alt="Upload">
          <span class="asset-name">Upload</span>
        </div>
        <div class="asset-item">
          <img src="/vuexy/img/educacross/actions/ios_share_FILL0_wght400_GRAD0_opsz48 1.svg" alt="Compartilhar">
          <span class="asset-name">Compartilhar</span>
        </div>
        <div class="asset-item">
          <img src="/vuexy/img/educacross/actions/link_FILL0_wght400_GRAD0_opsz48 1.svg" alt="Link">
          <span class="asset-name">Link</span>
        </div>
        <div class="asset-item">
          <img src="/vuexy/img/educacross/actions/person_search_FILL0_wght400_GRAD0_opsz48 1.svg" alt="Buscar Pessoa">
          <span class="asset-name">Buscar Pessoa</span>
        </div>
        <div class="asset-item">
          <img src="/vuexy/img/educacross/actions/badge_FILL0_wght400_GRAD0_opsz48.svg" alt="Badge">
          <span class="asset-name">Badge</span>
        </div>
        <div class="asset-item">
          <img src="/vuexy/img/educacross/actions/trophy_FILL0_wght400_GRAD0_opsz48 1.svg" alt="Troféu">
          <span class="asset-name">Troféu</span>
        </div>
        <div class="asset-item">
          <img src="/vuexy/img/educacross/actions/social_leaderboard_FILL0_wght400_GRAD0_opsz48 1.svg" alt="Leaderboard">
          <span class="asset-name">Leaderboard</span>
        </div>
      </div>
    </div>
  `,
};

/**
 * Como Usar - Guia de uso dos assets
 */
export const HowToUse = {
  render: () => `
    <div>
      <h4 class="mb-4">Como Usar os Assets</h4>
      
      <div class="card mb-4">
        <div class="card-header">
          <h6 class="mb-0">HTML - Tag img</h6>
        </div>
        <div class="card-body">
          <pre class="bg-dark text-light p-3 rounded"><code>&lt;img src="/vuexy/img/educacross/logos/Horizontal.svg" alt="Educacross Logo"&gt;
&lt;img src="/vuexy/img/educacross/gamification/Estrelas.svg" alt="Estrelas" width="32"&gt;
&lt;img src="/vuexy/img/educacross/proficiency/avançado.svg" alt="Avançado" height="24"&gt;</code></pre>
        </div>
      </div>
      
      <div class="card mb-4">
        <div class="card-header">
          <h6 class="mb-0">CSS - Background Image</h6>
        </div>
        <div class="card-body">
          <pre class="bg-dark text-light p-3 rounded"><code>.user-avatar {
  background-image: url('/vuexy/img/educacross/users/Aluno.svg');
  background-size: contain;
  background-repeat: no-repeat;
}

.subject-icon {
  background-image: url('/vuexy/img/educacross/subjects/Matemática.svg');
}</code></pre>
        </div>
      </div>
      
      <div class="card mb-4">
        <div class="card-header">
          <h6 class="mb-0">Estrutura de Pastas</h6>
        </div>
        <div class="card-body">
          <pre class="bg-light p-3 rounded"><code>/vuexy/img/educacross/
├── logos/          # Logotipos oficiais
├── gamification/   # Troféus, estrelas, moedas
├── subjects/       # Áreas de conhecimento
├── metrics/        # Indicadores de desempenho
├── proficiency/    # Níveis de proficiência
├── users/          # Tipos de usuários
├── groups/         # Agrupamentos organizacionais
├── menu/           # Ícones do menu
└── actions/        # Ícones de ação</code></pre>
        </div>
      </div>
      
      <div class="alert alert-success">
        <strong>Total de Assets:</strong> 75+ arquivos SVG vetoriais prontos para uso
      </div>
    </div>
  `,
};
