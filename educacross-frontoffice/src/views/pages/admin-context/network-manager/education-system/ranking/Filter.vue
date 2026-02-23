<template>
  <b-card>
    <b-row>
      <b-col cols="auto">
        <SelectSubject :fetch-on-mounted="false" />
      </b-col>
      <b-col cols="12" md="auto">
        <b-form-group label="Ano Escolar" label-for="year">
          <ESelect
            :value="serie"
            :options="serieOptions"
            :loading="serieLoading"
            @change="setSerie"
          >
            <template v-slot:selected-option="item">
              <b-badge variant="light-primary" class="mr-1" pill>{{ item.name }}</b-badge>
            </template>
            <template v-slot:option="item">
              <b-badge variant="light-primary" pill>{{ item.name }}</b-badge>
            </template>
          </ESelect>
        </b-form-group>
      </b-col>
      <b-col v-if="showGroups(networkGroups)" cols="12" md>
        <b-form-group :label="$t('Grupo de Escolas')" label-for="network-grou">
          <ESelect
            id="network-group"
            label="name"
            :value="networkGroup"
            :options="networkGroups"
            :clearable="false"
            :loading="networkLoading"
            :disabled="networkLoading"
            @input="setNetworkGroup"
          >
          </ESelect>
        </b-form-group>
      </b-col>
      <b-col cols="12" md>
        <b-form-group label="Período" label-for="period">
          <ESelect
            v-model="month"
            :options="monthsSelectOptions"
            label="name"
            :clearable="false"
            @change="fetchRanking"
          />
        </b-form-group>
      </b-col>
    </b-row>
    <ExpandableFilterArea>
      <b-row>
        <b-col col md>
          <b-form-group label="Livro" label-for="book">
            <ESelect
              id="book"
              :value="book"
              :options="bookOptions"
              paginated
              :loading="bookLoading"
              :page="bookPage"
              :total-pages="bookTotalPages"
              @next-page="fetchBooks"
              @change="changeBook"
            />
          </b-form-group>
        </b-col>
        <b-col cols="12" md>
          <b-form-group label="Missão" label-for="mission">
            <ESelect
              id="mission"
              v-model="mission"
              :options="missionOptions"
              :clearable="false"
              :loading="missionLoading"
              :disabled="missionLoading"
              :page="missionPage"
              :total-pages="missionTotalpages"
              @change="fetchRanking"
              @nextPage="fetchMissions"
            />
          </b-form-group>
        </b-col>
        <b-col cols="12">
          <div class="w-100 d-flex justify-content-end">
            <b-link
              variant="flat-primary"
              class="d-flex align-items-center p-0 gap-1"
              @click.stop="cleanFilter"
            >
              <span class="material-symbols-outlined"> cancel </span> Limpar busca
            </b-link>
          </div>
        </b-col>
      </b-row>
    </ExpandableFilterArea>
  </b-card>
</template>

<script setup>
import ExpandableFilterArea from '@/components/filter/ExpandableFilterArea.vue'
import ESelect from '@/components/selects/ESelect.vue'
import SelectSubject from '@/layouts/components/SelectSubject.vue'
import router from '@/router'
import {
  getEducationSystemGuidesLabel,
  getEducationSystemSeriesLabel,
} from '@/services/shared/educationSystem/EducationSystem.Service.js'
import { getNetworkGroups } from '@/services/shared/network-groups/NetworkGroups.Service'
import { getBooks } from '@/services/teacher-context/books/Books.service'
import useFilters from '@/store/filters/useFilters'
import { getMonthList } from '@/utils/date'
import { useEducationSystemRankingNetwork } from '@/views/pages/admin-context/network-manager/education-system/ranking/useEducationSystemRankingNetwork.js'
import { ref, watch, computed } from 'vue'

const { subject, educationSystemId, serie, networkGroup } = useFilters()
const {
  month,
  monthFirstOption,
  book,
  classe,
  mission,
  bookFirstoption,
  missionFirstOption,
  fetchRanking,
} = useEducationSystemRankingNetwork()

const serieOptions = ref([])
const serieLoading = ref(true)

const { bookId } = router.currentRoute.params

if (bookId) {
  book.value = { id: bookId, name: '' }
} else {
  book.value = bookFirstoption
}

const fetchSeries = async () => {
  serieLoading.value = true

  const response = await getEducationSystemSeriesLabel(educationSystemId.value, {
    SubjectId: subject.value.id,
  })

  if (response.status === 200) {
    serieOptions.value = response.data
    if (
      !serie.value ||
      !serie.value.id ||
      !response.data.some(s => s.id === serie.value.id)
    ) {
      serie.value = response.data[0]
    }
    fetchRanking()
  } else {
    serieOptions.value = []
    serie.value = {}
  }

  serieLoading.value = false
}

const bookOptions = ref([bookFirstoption])
const bookPage = ref(1)
const bookTotalPages = ref(1)
const bookLoading = ref(true)

const fetchBooks = async (ctx = {}) => {
  if (!serie.value.id) return

  const { page } = ctx
  bookPage.value = page || 1
  bookLoading.value = true

  const { data } = await getBooks({
    EducationSystemId: educationSystemId.value,
    SubjectId: subject.value.id,
    SerieId: serie.value.id,
  })

  bookTotalPages.value = data.totalPages

  if (bookPage.value === 1) {
    bookOptions.value = [bookFirstoption]
  }

  bookOptions.value.push(...data.data)
  bookLoading.value = false
}

const missionOptions = ref([])
const missionLoading = ref(true)
const missionPage = ref(1)
const missionTotalpages = ref(1)

const fetchMissions = async (ctx = {}) => {
  if (!serie.value.id) return

  missionLoading.value = true

  const { page } = ctx
  missionPage.value = page || 1

  if (!subject.value.id) return
  try {
    const { data } = await getEducationSystemGuidesLabel(educationSystemId.value, {
      subjectId: subject.value.id,
      bookId: book.value.id,
      SerieId: serie.value?.id,
    })

    const options = data.data || []

    if (missionPage.value === 1) {
      missionOptions.value = [missionFirstOption]
      mission.value = missionFirstOption
    }

    missionOptions.value.push(...options)
    missionTotalpages.value = data.totalPages
    missionLoading.value = false
  } catch (error) {
    missionOptions.value = []
    missionTotalpages.value = 0
    missionLoading.value = false
  }
}

month.value = monthFirstOption

const monthsSelectOptions = [monthFirstOption, ...getMonthList()]

const changeBook = async value => {
  book.value = value
  if (mission.value.id) mission.value = missionFirstOption
  fetchMissions()
  fetchRanking()
}

const setSerie = value => {
  serie.value = value

  book.value = bookFirstoption
  mission.value = missionFirstOption
  bookPage.value = 1
  bookTotalPages.value = 1
  fetchBooks()
  fetchMissions()
  fetchRanking()
}

const networkGroupDefault = { id: null, name: 'Todos os grupos de escolas' }
networkGroup.value = networkGroupDefault

const networkLoading = ref(true)
const networkGroups = ref([])

getNetworkGroups()
  .then(response => {
    networkGroups.value = response.data
    classe.value = response.data
  })
  .finally(() => {
    networkGroups.value.unshift(networkGroupDefault)
    networkLoading.value = false
  })

const setNetworkGroup = value => {
  networkGroup.value = value
  fetchRanking()
}

const showGroups = group => {
  return group.filter(cs => cs.id).length > 1
}

const cleanFilter = () => {
  month.value = monthFirstOption
  serie.value = serieOptions.value[0]
  bookPage.value = 1
  missionPage.value = 1
  mission.value = missionFirstOption
  networkGroup.value = networkGroupDefault
  fetchBooks()
  fetchMissions()
}

const subjectId = computed(() => subject.value.id)

watch(subjectId, () => {
  month.value = monthFirstOption

  book.value = bookFirstoption
  bookPage.value = 1
  bookTotalPages.value = 1
  mission.value = missionFirstOption
  fetchSeries().then(() => {
    fetchBooks()
    fetchMissions()
  })
})

if (subject.value.id) {
  fetchSeries().then(() => {
    fetchBooks()
    fetchMissions()
  })
}

</script>