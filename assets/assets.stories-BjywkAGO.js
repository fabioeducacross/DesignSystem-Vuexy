const os={title:"Educacross/Foundations/Assets",parameters:{layout:"padded",docs:{description:{component:`Educacross Assets - Ícones e Ilustrações SVG

Assets oficiais da marca Educacross
Disponíveis em /vuexy/img/educacross/`}}}},s={render:()=>`
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
  `},a={render:()=>`
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
  `},e={render:()=>`
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
  `},i={render:()=>`
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
  `},n={render:()=>`
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
  `},c={render:()=>`
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
  `},o={render:()=>`
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
  `},t={render:()=>`
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
  `},r={render:()=>`
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
  `},d={render:()=>`
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
  `};var m,l,g,v,u;s.parameters={...s.parameters,docs:{...(m=s.parameters)==null?void 0:m.docs,source:{originalSource:`{
  render: () => \`
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
  \`
}`,...(g=(l=s.parameters)==null?void 0:l.docs)==null?void 0:g.source},description:{story:"Logos - Logotipos oficiais",...(u=(v=s.parameters)==null?void 0:v.docs)==null?void 0:u.description}}};var p,x,y,h,f;a.parameters={...a.parameters,docs:{...(p=a.parameters)==null?void 0:p.docs,source:{originalSource:`{
  render: () => \`
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
  \`
}`,...(y=(x=a.parameters)==null?void 0:x.docs)==null?void 0:y.source},description:{story:"Gamificação - Elementos de gamificação",...(f=(h=a.parameters)==null?void 0:h.docs)==null?void 0:f.description}}};var b,E,_,L,A;e.parameters={...e.parameters,docs:{...(b=e.parameters)==null?void 0:b.docs,source:{originalSource:`{
  render: () => \`
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
  \`
}`,...(_=(E=e.parameters)==null?void 0:E.docs)==null?void 0:_.source},description:{story:"Áreas de Conhecimento - Disciplinas",...(A=(L=e.parameters)==null?void 0:L.docs)==null?void 0:A.description}}};var z,D,P,T,w;i.parameters={...i.parameters,docs:{...(z=i.parameters)==null?void 0:z.docs,source:{originalSource:`{
  render: () => \`
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
  \`
}`,...(P=(D=i.parameters)==null?void 0:D.docs)==null?void 0:P.source},description:{story:"Métricas - Indicadores de desempenho",...(w=(T=i.parameters)==null?void 0:T.docs)==null?void 0:w.description}}};var C,I,F,G,B;n.parameters={...n.parameters,docs:{...(C=n.parameters)==null?void 0:C.docs,source:{originalSource:`{
  render: () => \`
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
  \`
}`,...(F=(I=n.parameters)==null?void 0:I.docs)==null?void 0:F.source},description:{story:"Proficiência - Níveis de proficiência",...(B=(G=n.parameters)==null?void 0:G.docs)==null?void 0:B.description}}};var R,M,j,k,S;c.parameters={...c.parameters,docs:{...(R=c.parameters)==null?void 0:R.docs,source:{originalSource:`{
  render: () => \`
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
  \`
}`,...(j=(M=c.parameters)==null?void 0:M.docs)==null?void 0:j.source},description:{story:"Tipos de Usuários - Perfis do sistema",...(S=(k=c.parameters)==null?void 0:k.docs)==null?void 0:S.description}}};var H,U,J,N,O;o.parameters={...o.parameters,docs:{...(H=o.parameters)==null?void 0:H.docs,source:{originalSource:`{
  render: () => \`
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
  \`
}`,...(J=(U=o.parameters)==null?void 0:U.docs)==null?void 0:J.source},description:{story:"Agrupamentos - Níveis organizacionais",...(O=(N=o.parameters)==null?void 0:N.docs)==null?void 0:O.description}}};var V,X,q,Y,K;t.parameters={...t.parameters,docs:{...(V=t.parameters)==null?void 0:V.docs,source:{originalSource:`{
  render: () => \`
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
  \`
}`,...(q=(X=t.parameters)==null?void 0:X.docs)==null?void 0:q.source},description:{story:"Ícones do Menu - Navegação principal",...(K=(Y=t.parameters)==null?void 0:Y.docs)==null?void 0:K.description}}};var Q,W,Z,$,ss;r.parameters={...r.parameters,docs:{...(Q=r.parameters)==null?void 0:Q.docs,source:{originalSource:`{
  render: () => \`
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
  \`
}`,...(Z=(W=r.parameters)==null?void 0:W.docs)==null?void 0:Z.source},description:{story:"Ícones de Ação - Botões e ações",...(ss=($=r.parameters)==null?void 0:$.docs)==null?void 0:ss.description}}};var as,es,is,ns,cs;d.parameters={...d.parameters,docs:{...(as=d.parameters)==null?void 0:as.docs,source:{originalSource:`{
  render: () => \`
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
  \`
}`,...(is=(es=d.parameters)==null?void 0:es.docs)==null?void 0:is.source},description:{story:"Como Usar - Guia de uso dos assets",...(cs=(ns=d.parameters)==null?void 0:ns.docs)==null?void 0:cs.description}}};const ts=["Logos","Gamification","Subjects","Metrics","Proficiency","UserTypes","Groups","MenuIcons","ActionIcons","HowToUse"];export{r as ActionIcons,a as Gamification,o as Groups,d as HowToUse,s as Logos,t as MenuIcons,i as Metrics,n as Proficiency,e as Subjects,c as UserTypes,ts as __namedExportsOrder,os as default};
