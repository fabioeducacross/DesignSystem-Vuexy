/**
 * BackgroundSpace - Empty State Component
 * 
 * Componente de estado vazio (empty state) com ícone SVG, título, texto descritivo e ação opcional.
 * Usado quando não há dados para exibir (missões vazias, alunos, resultados, etc).
 * 
 * @component BackgroundSpace
 * @category Educacross Components V2
 * @subcategory Feedback
 * @priority P2
 * @status PIXEL-PERFECT
 * @since v2.0
 * 
 * Key Features:
 * - ✅ Empty state com SVG icon grande (120×120px) opacity 0.3
 * - ✅ Título 20px weight 600 + texto descritivo 14px max-width 400px
 * - ✅ Botão ação opcional (Criar Missão, Adicionar Alunos, Tentar Novamente)
 * - ✅ Compact variant: padding 40px, icon 80×80px, min-height 300px
 * - ✅ Error states: 404 Page Not Found, Erro de Conexão (vermelho)
 * - ✅ Icons biblioteca: grid, layers, people, download, calendar, info-circle, x-circle, circle-slash
 * - ✅ Alinhamento flex column center padding 60×20px min-height 400px
 * 
 * Real-world usage:
 * - Listas vazias (missões, alunos, atividades, resultados)
 * - Tabelas sem dados (relatórios, buscas)
 * - 404 Page Not Found + botão "Voltar"
 * - Erro de conexão + botão "Tentar Novamente"
 * - Compact variant em cards/sidebars
 */

export default {
  title: 'Front-office/Feedback/BackgroundSpace',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
# BackgroundSpace

Componente de **estado vazio** (empty state) com ícone grande, título, texto descritivo e ação opcional.

## Quando usar

- ✅ Listas vazias (missões, alunos, atividades, resultados)
- ✅ Tabelas sem dados para exibir (relatórios, buscas)
- ✅ Filtros sem resultados (busca vazia)
- ✅ Páginas de erro (404 Not Found, erro de conexão)
- ✅ Cards/sidebars sem conteúdo (compact variant)
- ✅ Primeiro uso de features (onboarding vazio)

## Variantes

- **Default**: Grid icon cinza + "Nenhum dado disponível"
- **SemMissoes**: Layers icon + "Nenhuma missão encontrada" + botão "Criar Missão" roxo
- **SemAlunos**: People icon + "Nenhum aluno na turma" + botão "Adicionar Alunos" verde
- **SemResultados**: Download icon + "Nenhum resultado disponível" + texto aguardar
- **SemAtividades**: Calendar icon + "Nenhuma atividade agendada"
- **CompactVariant**: Icon 80px, padding 40px, min-height 300px (para cards)
- **PaginaNaoEncontrada**: X-circle 160px + "404" 48px + botão "Voltar"
- **ErroConexao**: Circle-slash icon + título vermelho "Erro de conexão" + botão "Tentar Novamente"
- **AllIcons**: Grid 3×2 com 6 ícones diferentes (Missões, Alunos, Atividades, Resultados, Relatórios, Busca)

## Características visuais

- **Icon**: 120×120px (default), 80×80px (compact), opacity 0.3 cinza
- **Title**: font-size 20px, font-weight 600, color #5E5873
- **Text**: font-size 14px, color #6E6B7B, max-width 400px, line-height 1.6
- **Button**: padding 10×24px, border-radius 6px, cores variadas (roxo #6E63E8, verde #28C76F, vermelho #EA5455)
- **Container**: flex column center, padding 60×20px (default) / 40×20px (compact), min-height 400px (default) / 300px (compact)
        `
      }
    }
  }
};

/**
 * ## Props API (sem props - display only component)
 * 
 * | Prop | Type | Default | Description |
 * |------|------|---------|-------------|
 * | icon | String | 'bi-grid' | Ícone Bootstrap Icons (bi-grid, bi-layers, bi-people, etc) |
 * | title | String | '' | Título do empty state (20px weight 600) |
 * | text | String | null | Texto descritivo opcional (14px) |
 * | actionLabel | String | null | Label do botão de ação opcional |
 * | actionColor | String | 'primary' | Cor do botão: 'primary' (roxo), 'success' (verde), 'danger' (vermelho) |
 * | onAction | Function | null | Callback ao clicar no botão |
 * | variant | String | 'default' | Variante: 'default' (120px icon), 'compact' (80px icon, padding reduzido) |
 * | iconSize | Number | 120 | Tamanho do ícone em pixels (120 default, 80 compact) |
 * 
 * ## Design Specs
 * 
 * **Cores:**
 * - Icon: color `#D8D6DE`, opacity `0.3`
 * - Title: color `#5E5873`
 * - Text: color `#6E6B7B`
 * - Button primary: background `#6E63E8`, color `#fff`
 * - Button success: background `#28C76F`, color `#fff`
 * - Button danger: background `#EA5455`, color `#fff`
 * - Error title: color `#EA5455` (erro de conexão)
 * 
 * **Dimensões:**
 * - Container: padding `60px 20px` (default), `40px 20px` (compact), min-height `400px` (default) / `300px` (compact)
 * - Icon: font-size `120px` (default), `80px` (compact), `160px` (404 page)
 * - Title: font-size `20px` (default), `48px` (404), font-weight `600`
 * - Text: font-size `14px`, max-width `400px`, line-height `1.6`, margin-top `12px`
 * - Button: padding `10px 24px`, border-radius `6px`, font-size `14px`, margin-top `20px`
 * 
 * **Tipografia:**
 * - Title: font-size `20px`, font-weight `600`
 * - Text: font-size `14px`, line-height `1.6`
 * - Button: font-size `14px`, font-weight `500`
 * 
 * **Animações:**
 * - Button hover: opacity `0.9`, transition `opacity .2s`
 */

const styles = `<style>
.background-space {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  min-height: 400px;
  text-align: center;
}

.background-space.compact {
  padding: 40px 20px;
  min-height: 300px;
}

.bg-space-icon {
  font-size: 120px;
  color: #D8D6DE;
  opacity: 0.3;
  margin-bottom: 20px;
}

.background-space.compact .bg-space-icon {
  font-size: 80px;
}

.bg-space-title {
  font-size: 20px;
  font-weight: 600;
  color: #5E5873;
  margin: 0 0 12px;
}

.bg-space-text {
  font-size: 14px;
  color: #6E6B7B;
  max-width: 400px;
  line-height: 1.6;
  margin: 0;
}

.bg-space-button {
  margin-top: 20px;
  padding: 10px 24px;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  color: #fff;
  cursor: pointer;
  transition: opacity .2s;
}

.bg-space-button:hover {
  opacity: 0.9;
}

.bg-space-button.primary {
  background: #6E63E8;
}

.bg-space-button.success {
  background: #28C76F;
}

.bg-space-button.danger {
  background: #EA5455;
}
</style>`;

/**
 * Story: Default
 * 
 * Empty state padrão com grid icon + "Nenhum dado disponível".
 * 
 * Educational context: Lista vazia genérica (sem dados).
 */
export const Default = {
  render: () => `
    ${styles}
    <div class="background-space">
      <i class="bi bi-grid bg-space-icon"></i>
      <h3 class="bg-space-title">Nenhum dado disponível</h3>
      <p class="bg-space-text">Não há informações para exibir no momento.</p>
    </div>
  `
};

/**
 * Story: SemMissoes
 * 
 * Empty state missões com layers icon + botão "Criar Missão" roxo.
 * 
 * Educational context: Professor sem missões criadas na turma.
 */
export const SemMissoes = {
  render: () => `
    ${styles}
    <div class="background-space">
      <i class="bi bi-layers bg-space-icon"></i>
      <h3 class="bg-space-title">Nenhuma missão encontrada</h3>
      <p class="bg-space-text">
        Você ainda não criou nenhuma missão para esta turma. 
        Crie sua primeira missão para começar a avaliar os alunos.
      </p>
      <button class="bg-space-button primary" onclick="alert('Navegar para criação de missão')">
        <i class="bi bi-plus-circle" style="margin-right: 6px"></i>
        Criar Missão
      </button>
    </div>
    <p style="margin-top: 16px; font-size: 13px; color: #6E6B7B; text-align: center">
      <strong>Contexto:</strong> Professor sem missões criadas (ação CTA roxo).
    </p>
  `
};

/**
 * Story: SemAlunos
 * 
 * Empty state alunos com people icon + botão "Adicionar Alunos" verde.
 * 
 * Educational context: Turma sem alunos cadastrados.
 */
export const SemAlunos = {
  render: () => `
    ${styles}
    <div class="background-space">
      <i class="bi bi-people bg-space-icon"></i>
      <h3 class="bg-space-title">Nenhum aluno na turma</h3>
      <p class="bg-space-text">
        Esta turma ainda não possui alunos cadastrados. 
        Adicione alunos para começar a trabalhar com a turma.
      </p>
      <button class="bg-space-button success" onclick="alert('Abrir modal adicionar alunos')">
        <i class="bi bi-person-plus" style="margin-right: 6px"></i>
        Adicionar Alunos
      </button>
    </div>
    <p style="margin-top: 16px; font-size: 13px; color: #6E6B7B; text-align: center">
      <strong>Contexto:</strong> Turma sem alunos (ação CTA verde).
    </p>
  `
};

/**
 * Story: SemResultados
 * 
 * Empty state resultados com download icon + texto aguardar aplicação.
 * 
 * Educational context: Missão aplicada mas sem resultados disponíveis ainda.
 */
export const SemResultados = {
  render: () => `
    ${styles}
    <div class="background-space">
      <i class="bi bi-download bg-space-icon"></i>
      <h3 class="bg-space-title">Nenhum resultado disponível</h3>
      <p class="bg-space-text">
        Os resultados desta missão ainda não estão disponíveis. 
        Aguarde a aplicação da missão pelos alunos.
      </p>
    </div>
    <p style="margin-top: 16px; font-size: 13px; color: #6E6B7B; text-align: center">
      <strong>Contexto:</strong> Missão aplicada mas sem resultados (aguardar aplicação).
    </p>
  `
};

/**
 * Story: SemAtividades
 * 
 * Empty state atividades com calendar icon + "Nenhuma atividade agendada".
 * 
 * Educational context: Calendário vazio (sem atividades futuras).
 */
export const SemAtividades = {
  render: () => `
    ${styles}
    <div class="background-space">
      <i class="bi bi-calendar-x bg-space-icon"></i>
      <h3 class="bg-space-title">Nenhuma atividade agendada</h3>
      <p class="bg-space-text">
        Não há atividades agendadas para os próximos dias. 
        Agende uma nova atividade para aparecer aqui.
      </p>
    </div>
    <p style="margin-top: 16px; font-size: 13px; color: #6E6B7B; text-align: center">
      <strong>Contexto:</strong> Calendário sem atividades futuras.
    </p>
  `
};

/**
 * Story: CompactVariant
 * 
 * Empty state compacto: icon 80px, padding 40px, min-height 300px (para cards/sidebars).
 * 
 * Educational context: Card vazio em dashboard (uso em containers menores).
 */
export const CompactVariant = {
  render: () => `
    ${styles}
    <div style="max-width: 400px; padding: 20px; background: #fff; border: 1px solid #D8D6DE; border-radius: 8px">
      <div class="background-space compact">
        <i class="bi bi-info-circle bg-space-icon"></i>
        <h3 class="bg-space-title">Nenhum dado</h3>
        <p class="bg-space-text" style="font-size: 13px">
          Selecione um filtro para visualizar os dados.
        </p>
      </div>
    </div>
    <p style="margin-top: 16px; font-size: 13px; color: #6E6B7B">
      <strong>Variante:</strong> Compact (icon 80px, padding 40px, min-height 300px) para cards menores.
    </p>
  `
};

/**
 * Story: PaginaNaoEncontrada
 * 
 * Página 404 com X-circle icon 160px + "404" 48px + botão "Voltar".
 * 
 * Educational context: Página não encontrada (erro 404).
 */
export const PaginaNaoEncontrada = {
  render: () => `
    ${styles}
    <style>
      .error-404 .bg-space-icon {
        font-size: 160px;
        opacity: 0.2;
      }
      .error-404 .bg-space-title {
        font-size: 48px;
        margin-bottom: 8px;
      }
      .error-404 .bg-space-subtitle {
        font-size: 20px;
        font-weight: 600;
        color: #5E5873;
        margin: 0 0 12px;
      }
    </style>
    
    <div class="background-space error-404">
      <i class="bi bi-x-circle bg-space-icon"></i>
      <h1 class="bg-space-title">404</h1>
      <h3 class="bg-space-subtitle">Página não encontrada</h3>
      <p class="bg-space-text">
        A página que você está procurando não existe ou foi movida.
      </p>
      <button class="bg-space-button primary" onclick="history.back()">
        <i class="bi bi-arrow-left" style="margin-right: 6px"></i>
        Voltar
      </button>
    </div>
    <p style="margin-top: 16px; font-size: 13px; color: #6E6B7B; text-align: center">
      <strong>Contexto:</strong> Página 404 Not Found (icon 160px, "404" 48px).
    </p>
  `
};

/**
 * Story: ErroConexao
 * 
 * Erro de conexão com circle-slash icon + título vermelho + botão "Tentar Novamente" vermelho.
 * 
 * Educational context: Falha de conexão (API offline, timeout).
 */
export const ErroConexao = {
  render: () => `
    ${styles}
    <style>
      .error-connection .bg-space-title {
        color: #EA5455;
      }
    </style>
    
    <div class="background-space error-connection">
      <i class="bi bi-wifi-off bg-space-icon"></i>
      <h3 class="bg-space-title">Erro de conexão</h3>
      <p class="bg-space-text">
        Não foi possível conectar ao servidor. 
        Verifique sua conexão com a internet e tente novamente.
      </p>
      <button class="bg-space-button danger" onclick="location.reload()">
        <i class="bi bi-arrow-clockwise" style="margin-right: 6px"></i>
        Tentar Novamente
      </button>
    </div>
    <p style="margin-top: 16px; font-size: 13px; color: #6E6B7B; text-align: center">
      <strong>Contexto:</strong> Erro de conexão (título vermelho + botão "Tentar Novamente").
    </p>
  `
};

/**
 * Story: AllIcons
 * 
 * Grid 3×2 com 6 ícones diferentes (Missões layers, Alunos people, Atividades calendar, 
 * Resultados download, Relatórios file-bar-graph, Busca search).
 * 
 * Educational context: Showcase de ícones disponíveis para empty states.
 */
export const AllIcons = {
  render: () => `
    ${styles}
    <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; max-width: 900px">
      <div class="background-space compact" style="border: 1px solid #D8D6DE; border-radius: 8px">
        <i class="bi bi-layers bg-space-icon"></i>
        <p class="bg-space-title" style="font-size: 14px; margin: 0">Missões</p>
      </div>
      
      <div class="background-space compact" style="border: 1px solid #D8D6DE; border-radius: 8px">
        <i class="bi bi-people bg-space-icon"></i>
        <p class="bg-space-title" style="font-size: 14px; margin: 0">Alunos</p>
      </div>
      
      <div class="background-space compact" style="border: 1px solid #D8D6DE; border-radius: 8px">
        <i class="bi bi-calendar-x bg-space-icon"></i>
        <p class="bg-space-title" style="font-size: 14px; margin: 0">Atividades</p>
      </div>
      
      <div class="background-space compact" style="border: 1px solid #D8D6DE; border-radius: 8px">
        <i class="bi bi-download bg-space-icon"></i>
        <p class="bg-space-title" style="font-size: 14px; margin: 0">Resultados</p>
      </div>
      
      <div class="background-space compact" style="border: 1px solid #D8D6DE; border-radius: 8px">
        <i class="bi bi-file-bar-graph bg-space-icon"></i>
        <p class="bg-space-title" style="font-size: 14px; margin: 0">Relatórios</p>
      </div>
      
      <div class="background-space compact" style="border: 1px solid #D8D6DE; border-radius: 8px">
        <i class="bi bi-search bg-space-icon"></i>
        <p class="bg-space-title" style="font-size: 14px; margin: 0">Busca</p>
      </div>
    </div>
    <p style="margin-top: 16px; font-size: 13px; color: #6E6B7B">
      <strong>Showcase:</strong> 6 ícones disponíveis para empty states (layers, people, calendar, download, file-bar-graph, search).
    </p>
  `
};
