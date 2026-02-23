<template>
  <div>
    <div
      v-if="showTextMore"
      class="text-primary cursor-pointer d-flex align-items-center gap-1 text-nowrap"
      @click="changeSidebar()"
    >
      <span class="material-symbols-outlined"> help </span>
      <u class="underline">Saber Mais</u>
    </div>
    <b-sidebar
      id="add-new-user-sidebar"
      :visible="sidebarActive"
      bg-variant="white"
      sidebar-class="sidebar-lg"
      body-class="d-flex flex-column"
      width="820px"
      shadow
      backdrop
      no-header
      right
    >
      <template v-slot="{}">
        <div
          class="d-flex justify-content-between align-items-center content-sidebar-header px-2 py-1"
        >
          <h6 class="mb-0">Sobre os níveis de proficiência</h6>

          <span
            class="material-symbols-outlined cursor-pointer"
            style="font-size: 16px"
            @click="changeSidebar(false)"
          >
            close
          </span>
        </div>

        <!-- BODY -->
        <div class="p-2 overflow-y-auto">
          <h4 class="text-primary">Níveis de Proficiência</h4>
          <h5 class="text-body font-bold">O que se espera em cada faixa.</h5>
          <div>
            <b-table
              id="list-table"
              ref="refListTable"
              thead-tr-class="thead-row"
              :fields="tableColumns"
              :items="dataTable"
              responsive
              outlined
            >
              <template #head()="item">
                <span class="text-uppercase"> {{ item.label }} </span>
              </template>
              <template #cell(type)="{ item }">
                <div class="d-flex justify-content-center align-items-center">
                  <BadgeStatus :value="item.type" :pill="true" enum="ReadingProficiencyEnum" />
                </div>
              </template>
              <template #cell()="{ value }">
                <span class="font-semibold">{{ value }} PALAVRAS</span>
              </template>
            </b-table>
          </div>
          <div class="text-justify">
            <p>
              A fluência leitora atesta a capacidade do estudante de se apropriar do código
              linguístico na modalidade escrita, com precisão e automaticidade na conversão de
              grafemas em fonemas. O leitor fluente é capaz de decodificar agilmente e antecipar
              sentidos em texto, demonstrando controle prosódico na entonação e expressividade. O
              aluno que consome menos recursos cognitivos na decodificação da língua escrita possui
              mais energia para se aprofundar na compreensão do texto (RASINSKI, 2004):
            </p>
            <ul class="pl-2">
              <li>É capaz de acessar a significação global com mais rapidez;</li>
              <li>Reconhece intertextualidades;</li>
              <li>Realiza mais inferências.</li>
            </ul>
            <p>
              A avaliação de fluência leitora é capaz de diagnosticar a velocidade e a acurácia da
              leitura. Para acurácia, considera-se quantas palavras foram lidas corretamente do
              total de palavras lidas. Para velocidade, considera-se quantas palavras foram lidas no
              tempo de um minuto. Os dois índices são conjugados na proficiência, que mede quantas
              palavras foram lidas corretamente ao longo de um minuto, indicada em quatro graus:
              abaixo do básico, básico, adequado ou avançado, em relação às expectativas de
              aprendizagem para a faixa de escolarização.
            </p>
            <p>
              Essas métricas adaptadas de Hasbrouck, J. & Tindal, G., 2017 e Konza, 2011, com base
              em pesquisas realizadas nos Estados Unidos e na Austrália. Segundo esse referencial,
              adultos proficientes tendem a ler cerca de 180 palavras por minuto.
            </p>
            <p>
              Nos testes da Plataforma, levamos em conta palavras apropriadas para o ano escolar,
              considerando os seguintes aspectos:
            </p>
            <ul class="pl-2">
              <li>
                Composição silábica: Palavras com sílabas simples (consoante + vogal) são adquiridas
                primeiro pelo vocabulário da criança, como GA-TO e BO-LA.
              </li>
              <li>
                Correspondência fonema-grafema: Correspondência regulares, como os fonemas /b/ e
                /f/, apresentam-se antes das correspondências contextuais, como os fonemas /k/ e
                /s/, como em CASA e CÉU, e /g/ e /ʃ/, como em GALO e GELADEIRA.
              </li>
              <li>
                Classe gramatical: Substantivos concretos, isto é, objetos palpáveis do mundo, são
                mais imediatos no universo semântico infantil, sendo requerida abstração para
                substantivos abstratos, adjetivos, verbos e advérbios, configurando-se, assim, uma
                escala de complexidade cognitiva.
              </li>
              <li>
                Tonicidade: O padrão acentual brasileiro é paroxítono, como em PATO, com um número
                maior de vocábulos em detrimento de oxítonas e proparoxítonas.
              </li>
              <li>
                Extensão: Palavras curtas devem vir antes para a alfabetização da criança, que ainda
                lerá por decodificação, sílaba a sílaba.
              </li>
              <li>
                Frequência de uso: É preciso considerar que mesmo estruturas morfológicas mais
                simples tornam-se difíceis quando o significado da palavra não é conhecido.
              </li>
            </ul>
            <p>
              HASBROUCK, J.; TINDAL, G. An update to compiled ORF norms (Technical Report No. 1702).
              Eugene, OR. Behavioral Research and Teaching, University of Oregon, 2007. KONZA, D.
              Research into Practice: Understanding the Reading Process, 2011. RASINSKI, T. Creating
              Fluent Readers. Educational Leadership, 61 (6). 2004. p.46-51.
            </p>
          </div>
        </div>
      </template>
    </b-sidebar>
  </div>
</template>

<script setup>
import BadgeStatus from '@/components/badge/BadgeStatus.vue'
import CellStatus from '@/components/badge/CellStatus.vue'
import { getReadingExpeditionProficiency } from '@/services/shared/reading-expedition/reading-expedition.service.js'
import { computed, ref, getCurrentInstance, onUnmounted } from 'vue'

const props = defineProps({
  showTextMore: {
    type: Boolean,
    default: true,
  },
})

const vm = getCurrentInstance().proxy
const sidebarActive = ref(false)

const proficiency = ref([])

getReadingExpeditionProficiency().then(res => {
  proficiency.value = res.data
})

const tableColumns = computed(() => {
  const transformedArray = [
    {
      key: 'type',
      label: 'NÍVEL',
      class: 'position-relative',
    },
  ]

  proficiency.value.forEach(series => {
    transformedArray.push({
      key: `serie${series.serieId}`,
      label: `${series.serieId}º ano`,
      class: 'position-relative',
    })
  })
  return transformedArray
})

const dataTable = computed(() => {
  const transformedData = []

  proficiency.value.forEach(series => {
    series.indicators.forEach(indicator => {
      let existing = transformedData.find(item => item.type === indicator.type)
      if (!existing) {
        existing = { type: indicator.type }
        if (indicator.type === 3) {
          // eslint-disable-next-line no-underscore-dangle
          existing._rowVariant = 'light-success'
        }
        transformedData.push(existing)
      }

      existing[`serie${series.serieId}`] = indicator.label.replace('-', ' a ')
    })
  })

  return transformedData
})

const changeSidebar = (val = !sidebarActive.value) => {
  sidebarActive.value = val
}

vm.$bus.on('changeSidebar', () => {
  changeSidebar()
})

onUnmounted(() => {
  vm.$bus.off('changeSidebar')
})
</script>

<style lang="scss">
  .table-light-success {
    background-color: #e5f8ee !important;
  }
</style>