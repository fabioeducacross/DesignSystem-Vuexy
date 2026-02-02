/**
 * SidebarProficiencyInfo - Pixel Perfect Stories
 * =========================================
 * Extraído automaticamente do frontoffice Educacross
 * 
 * @component SidebarProficiencyInfo
 * @source educacross-frontoffice\src\components\reading-meter\SidebarProficiencyInfo.vue
 * @generated 2026-02-01T21:06:31.280199
 * 
 * Props: None
 * Slots: None
 * Emits: update:visible
 */

export default {
  title: 'Educacross V2/SidebarProficiencyInfo',
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


