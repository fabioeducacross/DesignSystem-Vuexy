<template>
  <b-sidebar
    id="sidebar-info-reading-meter-evaluation"
    v-model="isOpen"
    bg-variant="white"
    sidebar-class="sidebar-lg"
    backdrop
    shadow
    width="700px"
    right
    no-header
  >
    <template v-slot="{ hide }">
      <div
        class="d-flex justify-content-between align-items-center content-sidebar-header px-2 py-1"
      >
        <h5 class="mb-0">Sobre os níveis de proficiência</h5>
        <feather-icon class="cursor-pointer" icon="XIcon" size="16" @click="hide" />
      </div>

      <b-card-body class="px-2 py-2">
        <div class="proficiency-content">
          <div>
            <h2 class="text-primary">Níveis de Proficiência</h2>
          </div>

          <p class="text-body font-bold">
            Régua de proficiência para textos com 1 minuto de leitura:
          </p>

          <div class="table-responsive mb-1">
            <table class="table table-bordered proficiency-table">
              <thead class="table-light">
                <tr>
                  <th scope="col" class="text-center font-bold table-header-title">NÍVEL</th>
                  <th
                    v-for="serie in seriesData"
                    :key="serie.serieId"
                    scope="col"
                    class="text-center font-bold table-header-title"
                  >
                    {{ serie.serieName }}
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="proficiencyType in proficiencyTypes"
                  :key="proficiencyType.id"
                  :class="proficiencyType.rowClass"
                >
                  <td class="text-center align-middle">
                    <b-badge
                      :variant="`light-${proficiencyType.variant}`"
                      class="font-bold proficiency-badge"
                      pill
                    >
                      {{ proficiencyType.label.toUpperCase() }}
                    </b-badge>
                  </td>
                  <td
                    v-for="serie in seriesData"
                    :key="`${proficiencyType.id}-${serie.serieId}`"
                    class="text-center"
                  >
                    <div class="font-bold">
                      {{ getIndicatorLabel(serie, proficiencyType.id) }}
                    </div>
                    <div class="font-bold">palavras</div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="explanation-text text-body">
            <p class="mb-0">
              A fluência leitora atesta a capacidade do estudante de se apropriar do código
              linguístico na modalidade escrita, com precisão e automaticidade na conversão de
              grafemas em fonemas. O leitor fluente é capaz de decodificar agilmente e antecipar
              sentidos em texto, demonstrando controle prosódico na entonação e expressividade. O
              aluno que consome menos recursos cognitivos na decodificação da língua escrita possui
              mais energia para se aprofundar na compreensão do texto (RASINSKI, 2004):
            </p>

            <ul class="pl-4">
              <li>É capaz de acessar a significação global com mais rapidez;</li>
              <li>Reconhece intertextualidades;</li>
              <li>Realiza mais inferências.</li>
            </ul>

            <p class="mb-0">
              A avaliação de fluência leitora é capaz de diagnosticar a velocidade e a acurácia da
              leitura. Para acurácia, considera-se quantas palavras foram lidas corretamente do
              total de palavras lidas. Para velocidade, considera-se quantas palavras foram lidas no
              tempo de um minuto. Os dois índices são conjugados na proficiência, que mede quantas
              palavras foram lidas corretamente ao longo de um minuto, indicada em quatro graus:
              abaixo do básico, básico, adequado ou avançado, em relação às expectativas de
              aprendizagem para a faixa de escolarização.
            </p>

            <p class="mb-0">
              Essas métricas adaptadas de Hasbrouck, J. & Tindal, G., 2017 e Konza, 2011, com base
              em pesquisas realizadas nos Estados Unidos e na Austrália. Segundo esse referencial,
              adultos proficientes tendem a ler cerca de 180 palavras por minuto.
            </p>

            <p class="mb-0">
              Nos testes da Plataforma, levamos em conta palavras apropriadas para o ano escolar,
              considerando os seguintes aspectos:
            </p>

            <ul class="pl-4">
              <li>
                <span>Composição silábica:</span> Palavras com sílabas simples (consoante + vogal)
                são adquiridas primeiro pelo vocabulário da criança, como GA-TO e BO-LA.
              </li>
              <li>
                <span>Correspondência fonema-grafema:</span>
                Correspondência regulares, como os fonemas /b/ e /f/, apresentam-se antes das
                correspondências contextuais, como os fonemas /k/ e /s/, como em CASA e CÉU, e /g/ e
                /ʃ/, como em GALO e GELADEIRA.
              </li>
              <li>
                <span>Classe gramatical:</span>
                Substantivos concretos, isto é, objetos palpáveis do mundo, são mais imediatos no
                universo semântico infantil, sendo requerida abstração para substantivos abstratos,
                adjetivos, verbos e advérbios, configurando-se, assim, uma escala de complexidade
                cognitiva.
              </li>
            </ul>

            <p class="mb-0">
              HASBROUCK, J.; TINDAL, G. An update to compiled ORF norms (Technical Report No. 1702).
              Eugene, OR. Behavioral Research and Teaching, University of Oregon, 2007.
            </p>

            <p class="mb-0">
              KONZA, D. Research into Practice: Understanding the Reading Process, 2011.
            </p>

            <p class="mb-0">
              RASINSKI, T. Creating Fluent Readers. Educational Leadership, 61 (6). 2004. p.46-51.
            </p>
          </div>
        </div>
      </b-card-body>
    </template>
  </b-sidebar>
</template>

<script setup>
import { useEvaluationReport } from './useEvaluationReport.js'
import { getVariantByRuleV2 } from '@/consts/ReadingMeterV2ProficiencyEnum'
import { getVariantByRule } from '@/consts/legends/index.js'
import { BSidebar, BCardBody } from 'bootstrap-vue'
import { computed, getCurrentInstance, onMounted, onUnmounted } from 'vue'

const vm = getCurrentInstance().proxy
const { proficiencyIndicators } = useEvaluationReport()

const isOpen = computed({
  get: () => vm.$store.state.readingMeterEvaluationInfo?.sidebarOpen || false,
  set: value => {
    if (!vm.$store.state.readingMeterEvaluationInfo) {
      vm.$store.registerModule('readingMeterEvaluationInfo', {
        namespaced: true,
        state: { sidebarOpen: false },
        mutations: {
          SET_SIDEBAR_OPEN: (state, payload) => {
            state.sidebarOpen = payload
          },
        },
      })
    }
    vm.$store.commit('readingMeterEvaluationInfo/SET_SIDEBAR_OPEN', value)
  },
})

const seriesData = computed(() => {
  if (!proficiencyIndicators.value?.length) {
    return [
      { serieId: 1, serieName: '1° ANO' },
      { serieId: 2, serieName: '2° ANO' },
      { serieId: 3, serieName: '3° ANO' },
      { serieId: 4, serieName: '4° ANO' },
      { serieId: 5, serieName: '5° ANO' },
    ]
  }

  return proficiencyIndicators.value.map(serie => ({
    serieId: serie.serieId,
    serieName: `${serie.serieId}° ANO`,
    indicators: serie.indicators,
  }))
})

const proficiencyTypes = computed(() => {
  const types = [
    {
      id: 1,
      label: getVariantByRuleV2(1, 'proficiency').label,
      variant: getVariantByRuleV2(1, 'proficiency').variant,
      rowClass: 'nivel-abaixo-basico',
    },
    {
      id: 2,
      label: getVariantByRuleV2(2, 'proficiency').label,
      variant: getVariantByRuleV2(2, 'proficiency').variant,
      rowClass: 'nivel-basico',
    },
    {
      id: 3,
      label: getVariantByRuleV2(3, 'proficiency').label,
      variant: getVariantByRuleV2(3, 'proficiency').variant,
      rowClass: 'nivel-proficiente',
    },
    {
      id: 4,
      label: getVariantByRuleV2(4, 'proficiency').label,
      variant: getVariantByRuleV2(4, 'proficiency').variant,
      rowClass: 'nivel-avancado',
    },
  ]

  return types
})

const getIndicatorLabel = (serie, proficiencyTypeId) => {
  if (!serie.indicators) {
    return '-'
  }

  const indicator = serie.indicators.find(ind => ind.type === proficiencyTypeId)


    return indicator.label.replace('-', ' a ') || '-'
}

const changeSidebar = () => {
  isOpen.value = !isOpen.value
}

onMounted(() => {
  vm.$bus.on('changeSidebar', changeSidebar)
})

onUnmounted(() => {
  vm.$bus.off('changeSidebar', changeSidebar)
})
</script>

<style lang="scss" scoped>
  .content-sidebar-header {
    border-bottom: 1px solid #ebe9f1;
    padding: 1rem 1.5rem;
  }

  .proficiency-content {
    font-size: 0.9rem;
  }

  .table-header-title {
    font-family: 'Montserrat', sans-serif;
    font-weight: 700;
    font-size: 12px;
    line-height: 100%;
    letter-spacing: 1px;
    text-transform: uppercase;
  }

  .proficiency-badge {
    width: 120px;
    display: inline-block;
    border: 1px solid currentColor !important;
  }

  .proficiency-table {
    font-size: 0.85rem;
    border: solid 1px #dee2e6;

    th {
      background-color: #f8f9fa !important;
      border-top: 1px solid #dee2e6;
      border-bottom: 2px solid #dee2e6;
      border-left: none;
      border-right: none;
      padding: 12px 8px;
      font-size: 0.875rem;
    }

    td {
      padding: 12px 8px;
      vertical-align: middle;
      border: 2px solid #dee2e6;
      border-left: none;
      border-right: none;
    }

    tbody tr:last-child td {
      border-bottom: 2px solid #dee2e6;
    }

    .nivel-proficiente {
      background-color: rgba(25, 135, 84, 0.1);
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
</style>
