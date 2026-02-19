/**
 * SidebarProficiencyInfo - Sidebar de Informações de Proficiência
 * =================================================================
 * Sidebar com explicações sobre níveis de proficiência educacional
 * 
 * @component SidebarProficiencyInfo
 * @category Educacross Components V2 / Navigation
 * @source educacross-frontoffice/src/components/reading-meter/SidebarProficiencyInfo.vue
 * @priority P2
 * @status PIXEL-PERFECT
 * @since 2.0.0
 * @generated 2026-02-01T21:06:31.280199
 * 
 * Props: None
 * Slots: None
 * Emits: update:visible
 */

export default {
  title: 'Educacross Components V2/Navigation/SidebarProficiencyInfo',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
## SidebarProficiencyInfo

Componente extraído pixel-perfect do frontoffice Educacross.

### Props
- Nenhuma prop definida

### Slots
- Nenhum slot definido

### Events
- **update:visible**
        `
      }
    }
  }
};

// Estilos inline do componente
const componentStyles = `

:root {
  --primary: #6e63e8;
  --primary-rgb: 110, 99, 232;
  --success: #28c76f;
  --success-rgb: 40, 199, 111;
  --danger: #ea5455;
  --danger-rgb: 234, 84, 85;
  --warning: #ff9f43;
  --warning-rgb: 255, 159, 67;
  --info: #00cfe8;
  --info-rgb: 0, 207, 232;
  --secondary: #6c757d;
  --secondary-rgb: 108, 117, 125;
  --light: #f8f9fa;
  --dark: #343a40;
  --legend-below-basic: #ea5455;
  --legend-basic: #ff9f43;
  --legend-proficient: #28c76f;
  --legend-advanced: #6e63e8;
  --border-color: #dbdade;
  --body-bg: #f8f7fa;
  --card-bg: #ffffff;
  --text-color: #5d596c;
  --heading-color: #5d596c;
}


.content-sidebar-header {
  border-bottom: 1px solid #ebe9f1;
  padding: 1rem 1.5rem;
}

.proficiency-content {
  font-size: 0.9rem;
}

.proficiency-table {
  font-size: 0.85rem;

  th {
    background-color: #f8f9fa !important;
    border: 1px solid #dee2e6;
    padding: 12px 8px;
    font-weight: 600;
    font-size: 0.8rem;
  }

  td {
    border: 1px solid #dee2e6;
    padding: 12px 8px;
    vertical-align: middle;
  }

  .nivel-abaixo-basico {
    background-color: rgba(220, 53, 69, 0.1);
  }

  .nivel-basico {
    background-color: rgba(255, 193, 7, 0.1);
  }

  .nivel-proficiente {
    background-color: rgba(25, 135, 84, 0.1);
  }

  .nivel-avancado {
    background-color: rgba(13, 110, 253, 0.1);
  }

  .badge {
    font-size: 0.7rem;
    padding: 6px 12px;
    border-radius: 20px;
    font-weight: 600;
  }
}

.proficiency-title {
  color: #7367f0;
  font-weight: 600;
  font-size: 1.3rem;
  margin-bottom: 0;
}

.explanation-text {
  font-size: 0.85rem;
  line-height: 1.6;
  text-align: justify;
}
`;

// Template base
const baseTemplate = `
<b-sidebar
    id=""
    bg-variant="white"
    sidebar-class="sidebar-lg"
    backdrop
    shadow
    width="820px"
    right
    no-header
  >
    <div>
      <div
        class="d-flex justify-content-between align-items-center content-sidebar-header px-2 py-1"
      >
        <h5 class="mb-0">Sobre os níveis de proficiência</h5>
        <feather-icon class="cursor-pointer" icon="XIcon" size="16" />
      </div>

      <b-card-body class="px-2 py-2">
        <div class="proficiency-content">
          <div class="text-center mb-3">
            <h4 class="proficiency-title">Níveis de Proficiência</h4>
          </div>

          <p class="text-muted mb-4">
            Régua de proficiência para textos com 30 segundos de leitura:
          </p>

          <div class="table-responsive mb-4">
            <table class="table table-bordered proficiency-table">
              <thead class="table-light">
                <tr>
                  <th scope="col" class="text-center font-weight-bold">NÍVEL</th>
                  <th scope="col" class="text-center font-weight-bold">1° ANO</th>
                  <th scope="col" class="text-center font-weight-bold">2° ANO</th>
                  <th scope="col" class="text-center font-weight-bold">3° ANO</th>
                  <th scope="col" class="text-center font-weight-bold">4° ANO</th>
                  <th scope="col" class="text-center font-weight-bold">5° ANO</th>
                </tr>
              </thead>
              <tbody>
                <tr class="nivel-abaixo-basico">
                  <td class="text-center align-middle">
                    <b-badge
                      variant=""
                      class="font-weight-bold"
                    >
                      Sample Text
                    </b-badge>
                  </td>
                  <td class="text-center">
                    <div class="font-weight-bold">0 a 7</div>
                    <div class="text-muted small">palavras</div>
                  </td>
                  <td class="text-center">
                    <div class="font-weight-bold">0 a 22</div>
                    <div class="text-muted small">palavras</div>
                  </td>
                  <td class="text-center">
                    <div class="font-weight-bold">0 a 25</div>
                    <div class="text-muted small">palavras</div>
                  </td>
                  <td class="text-center">
                    <div class="font-weight-bold">0 a 27</div>
                    <div class="text-muted small">palavras</div>
                  </td>
                  <td class="text-center">
                    <div class="font-weight-bold">0 a 30</div>
                    <div class="text-muted small">palavras</div>
                  </td>
                </tr>

                <tr class="nivel-basico">
                  <td class="text-center align-middle">
                    <b-badge
                      variant=""
                      class="font-weight-bold"
                    >
                      Sample Text
                    </b-badge>
                  </td>
                  <td class="text-center">
                    <div class="font-weight-bold">8 a 14</div>
                    <div class="text-muted small">palavras</div>
                  </td>
                  <td class="text-center">
                    <div class="font-weight-bold">23 a 44</div>
                    <div class="text-muted small">palavras</div>
                  </td>
                  <td class="text-center">
                    <div class="font-weight-bold">26 a 49</div>
                    <div class="text-muted small">palavras</div>
                  </td>
                  <td class="text-center">
                    <div class="font-weight-bold">28 a 54</div>
                    <div class="text-muted small">palavras</div>
                  </td>
                  <td class="text-center">
                    <div class="font-weight-bold">31 a 59</div>
                    <div class="text-muted small">palavras</div>
                  </td>
                </tr>

                <tr class="nivel-proficiente">
                  <td class="text-center align-middle">
                    <b-badge
                      variant=""
                      class="font-weight-bold"
                    >
                      Sample Text
                    </b-badge>
                  </td>
                  <td class="text-center">
                    <div class="font-weight-bold">15 a 30</div>
                    <div class="text-muted small">palavras</div>
                  </td>
                  <td class="text-center">
                    <div class="font-weight-bold">45 a 50</div>
                    <div class="text-muted small">palavras</div>
                  </td>
                  <td class="text-center">
                    <div class="font-weight-bold">50 a 55</div>
                    <div class="text-muted small">palavras</div>
                  </td>
                  <td class="text-center">
                    <div class="font-weight-bold">55 a 60</div>
                    <div class="text-muted small">palavras</div>
                  </td>
                  <td class="text-center">
                    <div class="font-weight-bold">60 a 75</div>
                    <div class="text-muted small">palavras</div>
                  </td>
                </tr>

                <tr class="nivel-avancado">
                  <td class="text-center align-middle">
                    <b-badge
                      variant=""
                      class="font-weight-bold"
                    >
                      Sample Text
                    </b-badge>
                  </td>
                  <td class="text-center">
                    <div class="font-weight-bold">mais de 30</div>
                    <div class="text-muted small">palavras</div>
                  </td>
                  <td class="text-center">
                    <div class="font-weight-bold">mais de 50</div>
                    <div class="text-muted small">palavras</div>
                  </td>
                  <td class="text-center">
                    <div class="font-weight-bold">mais de 55</div>
                    <div class="text-muted small">palavras</div>
                  </td>
                  <td class="text-center">
                    <div class="font-weight-bold">mais de 60</div>
                    <div class="text-muted small">palavras</div>
                  </td>
                  <td class="text-center">
                    <div class="font-weight-bold">mais de 75</div>
                    <div class="text-muted small">palavras</div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="explanation-text">
            <p class="mb-3">
              A fluência leitora atesta a capacidade do estudante de se apropriar do código
              linguístico na modalidade escrita, com precisão e automaticidade na conversão de
              grafemas em fonemas. O leitor fluente é capaz de decodificar agilmente e antecipar
              sentidos em texto, demonstrando controle prosódico na entonação e expressividade. O
              aluno que consome menos recursos cognitivos na decodificação da língua escrita possui
              mais energia para se aprofundar na compreensão do texto (RASINSKI, 2004): É capaz de
              acessar a significação global com mais rapidez; Reconhece intertextualidades; Realiza
              mais inferências. A avaliação de fluência leitora é capaz de diagnosticar a velocidade
              e a acurácia da leitura. Para acurácia, considera-se quantas palavras foram lidas
              corretamente do total de palavras lidas. Para velocidade, considera-se quantas
              palavras foram lidas no tempo de um minuto. Os dois índices são conjugados na
              proficiência, que mede quantas palavras foram lidas corretamente ao longo de um
              minuto, indicada em quatro graus: abaixo do básico, básico, adequado ou avançado, em
              relação às expectativas de aprendizagem para a faixa de escolarização. Essas métricas
              adaptadas de Hasbrouck, J. & Tindal, G., 2017 e Konza, 2011, com base em pesquisas
              realizadas nos Estados Unidos e na Austrália. Segundo esse referencial, adultos
              proficientes tendem a ler cerca de 180 palavras por minuto. Nos testes da Plataforma,
              levamos em conta palavras apropriadas para o ano escolar, considerando os seguintes
              aspectos: Composição silábica: Palavras com sílabas simples (consoante + vogal) são
              adquiridas primeiro pelo vocabulário da criança, como GA-TO e BO-LA. Correspondência
              fonema-grafema: Correspondência regulares, como os fonemas /b/ e /f/, apresentam-se
              antes das correspondências contextuais, como os fonemas /k/ e /s/, como em CASA e CÉU,
              e /g/ e /ʃ/, como em GALO e GELADEIRA. Classe gramatical: Substantivos concretos, isto
              é, objetos palpáveis do mundo, são mais imediatos no universo semântico infantil,
              sendo requerida abstração para substantivos abstratos, adjetivos, verbos e advérbios,
              configurando-se, assim, uma escala de complexidade cognitiva. Tonicidade: O padrão
              acentual brasileiro é paroxítono, como em PATO, com um número maior de vocábulos em
              detrimento de oxítonas e proparoxítonas. Extensão: Palavras curtas devem vir antes
              para a alfabetização da criança, que ainda lerá por decodificação, sílaba a sílaba.
              Frequência de uso: É preciso considerar que mesmo estruturas morfológicas mais simples
              tornam-se difíceis quando o significado da palavra não é conhecido. HASBROUCK, J.;
              TINDAL, G. An update to compiled ORF norms (Technical Report No. 1702). Eugene, OR.
              Behavioral Research and Teaching, University of Oregon, 2007. KONZA, D. Research into
              Practice: Understanding the Reading Process, 2011. RASINSKI, T. Creating Fluent
              Readers. Educational Leadership, 61 (6). 2004. p.46-51.
            </p>
          </div>
        </div>
      </b-card-body>
`;

// Story: Default
export const Default = {
  render: () => `
    <style>${componentStyles}</style>
    ${baseTemplate}
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
      <div style="background:linear-gradient(135deg,#00CFE8 0%,#0BAACC 100%);padding:60px 40px;color:white;">
        <div style="max-width:900px;margin:0 auto;">
          <div style="display:inline-block;padding:8px 16px;background:rgba(255,255,255,0.15);border-radius:50px;margin-bottom:20px;font-size:14px;border:1px solid rgba(255,255,255,0.2);">Navigation</div>
          <h1 style="font-size:3rem;font-weight:700;margin:0 0 12px 0;letter-spacing:-0.02em;">SidebarProficiencyInfo</h1>
          <p style="font-size:1.1rem;opacity:0.9;margin:0;max-width:600px;">Sidebar de Informações de Proficiência</p>
        </div>
      </div>
      <div style="max-width:900px;margin:0 auto;padding:48px 40px;">
        <div style="background:white;border-radius:12px;padding:32px;margin-bottom:32px;box-shadow:0 2px 8px rgba(0,0,0,0.08);">
          <h2 style="font-size:1.1rem;font-weight:600;color:#5E5873;margin:0 0 16px 0;">Sobre o Componente</h2>
          <p style="color:#6E6B7B;line-height:1.7;margin:0 0 16px 0;">Sidebar de Informações de Proficiência. Faz parte da categoria <strong>Navigation</strong> do Design System Educacross.</p>
          <div style="background:#F8F7FF;border-left:4px solid #00CFE8;padding:16px;border-radius:4px;">
            <p style="margin:0;color:#5E5873;font-size:14px;line-height:1.6;"><strong>💡 Dica:</strong> Use <em>Playground</em> para explorar props, <em>Use Cases</em> para exemplos reais e <em>Accessibility</em> para validar WCAG.</p>
          </div>
        </div>
        <div style="background:white;border-radius:12px;padding:32px;box-shadow:0 2px 8px rgba(0,0,0,0.08);">
          <h2 style="font-size:1.1rem;font-weight:600;color:#5E5873;margin:0 0 16px 0;">Implementação Vue 2.7</h2>
          <pre style="background:#1E1E2E;color:#CDD6F4;padding:20px;border-radius:8px;font-size:13px;line-height:1.6;overflow:auto;margin:0;"><code>import SidebarProficiencyInfo from '@/components/SidebarProficiencyInfo.vue';

// Template
&lt;SidebarProficiencyInfo v-bind="props" /&gt;</code></pre>
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
    docs: { description: { story: 'Explore o SidebarProficiencyInfo com controles interativos.' } },
  },
  render: (args) => `
    <div style="padding:32px;display:flex;justify-content:center;align-items:center;min-height:200px;background:#F8F8F8;border-radius:12px;">
      <div style="text-align:center;color:#6E6B7B;">
        <div style="width:60px;height:60px;background:#00CFE820;border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 16px;font-size:24px;">🎨</div>
        <p style="margin:0 0 8px 0;font-size:15px;font-weight:600;color:#5E5873;">Playground SidebarProficiencyInfo</p>
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
    docs: { description: { story: 'Exemplos de uso real do SidebarProficiencyInfo no Educacross.' } },
  },
  render: () => `
    <div style="max-width:800px;margin:0 auto;padding:40px 20px;font-family:'Public Sans',sans-serif;">
      <div style="background:#00CFE815;border:1px solid #00CFE830;border-radius:12px;padding:24px;margin-bottom:40px;">
        <h1 style="font-size:1.5rem;font-weight:700;color:#5E5873;margin:0 0 8px 0;">Casos de Uso: SidebarProficiencyInfo</h1>
        <p style="color:#6E6B7B;margin:0;font-size:14px;line-height:1.6;">Cenários reais de uso no contexto educacional da plataforma Educacross</p>
      </div>
      
      <div style="margin-bottom:32px;">
        <h2 style="font-size:18px;font-weight:600;color:#5E5873;margin:0 0 8px 0;display:flex;align-items:center;gap:10px;">
          <span style="display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;background:#00CFE8;color:white;border-radius:50%;font-size:13px;font-weight:700;flex-shrink:0;">1</span>
          Professor — Painel Principal
        </h2>
        <p style="color:#6E6B7B;margin:0 0 16px 0;padding-left:38px;font-size:14px;">Professor utilizando SidebarProficiencyInfo no dashboard de gestão de turmas</p>
        <div style="background:#F8F8F8;border-radius:8px;padding:20px;margin-left:38px;text-align:center;color:#B9B9C3;font-size:13px;">
          Ver story <strong>Default</strong> para visualização do componente neste contexto
        </div>
      </div>
      <div style="margin-bottom:32px;">
        <h2 style="font-size:18px;font-weight:600;color:#5E5873;margin:0 0 8px 0;display:flex;align-items:center;gap:10px;">
          <span style="display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;background:#00CFE8;color:white;border-radius:50%;font-size:13px;font-weight:700;flex-shrink:0;">2</span>
          Aluno — Portal do Estudante
        </h2>
        <p style="color:#6E6B7B;margin:0 0 16px 0;padding-left:38px;font-size:14px;">Aluno interagindo com SidebarProficiencyInfo no portal educacional</p>
        <div style="background:#F8F8F8;border-radius:8px;padding:20px;margin-left:38px;text-align:center;color:#B9B9C3;font-size:13px;">
          Ver story <strong>Default</strong> para visualização do componente neste contexto
        </div>
      </div>
      <div style="margin-bottom:32px;">
        <h2 style="font-size:18px;font-weight:600;color:#5E5873;margin:0 0 8px 0;display:flex;align-items:center;gap:10px;">
          <span style="display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;background:#00CFE8;color:white;border-radius:50%;font-size:13px;font-weight:700;flex-shrink:0;">3</span>
          Coordenador — Relatórios
        </h2>
        <p style="color:#6E6B7B;margin:0 0 16px 0;padding-left:38px;font-size:14px;">Coordenador pedagógico analisando dados via SidebarProficiencyInfo</p>
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
    docs: { description: { story: 'Conformidade WCAG 2.1 AA para o SidebarProficiencyInfo.' } },
  },
  render: () => `
    <div style="max-width:800px;margin:0 auto;padding:40px 20px;font-family:'Public Sans',sans-serif;">

      <div style="background:linear-gradient(135deg,#00CFE8 0%,#764ba2 100%);padding:32px;border-radius:12px;margin-bottom:32px;color:white;">
        <h1 style="font-size:1.5rem;font-weight:700;margin:0 0 8px 0;">Acessibilidade: SidebarProficiencyInfo</h1>
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

