<template>
  <b-row>
    <b-col cols="12">
      <b-card>
        <b-skeleton-wrapper :loading="loading">
          <template v-slot:loading>
            <b-skeleton></b-skeleton>
          </template>
          <div class="d-flex justify-between align-items-center">
            <b-link class="text-primary" :to="{ name: 'readingMetherLibrary' }">
              <span
                class="material-symbols-outlined"
                style="font-size: 12px; vertical-align: middle"
              >
                arrow_back_ios
              </span>
              <span class="underline"> Voltar para todos os livros </span>
            </b-link>
            <div class="d-flex align-items-center gap-2">
              <span class="whitespace-no-wrap font-bold text-primary">
                {{ data.name }}
              </span>
              <b-img-lazy :src="data.imageUrl" v-bind="bookImgConfig" :alt="data.name" />
            </div>
          </div>
        </b-skeleton-wrapper>
      </b-card>
    </b-col>
    <b-col cols="12">
      <LibraryListDetailFilter />
    </b-col>
    <b-col cols="12">
      <ListTableLocalSorting
        :table-columns="tableColumns"
        :data-table="filteredStudentsTable"
        :loading="loading"
        search-placeholder="searchForStudent"
        @change="changePage"
      >
        <template #cell(name)="{ value, item }">
          <div class="d-flex gap-2">
            <span
              v-b-tooltip="!item.readingDate ? undefined : 'Ver Passaporte de Leitura'"
              class="font-semibold text-nowrap text-primary cursor-pointer"
              @click="openModalStudentPassport(item)"
            >
              <span
                class="material-symbols-outlined text-primary"
                style="font-size: 16px; vertical-align: middle"
              >
                airplane_ticket
              </span>
              {{ value }}
            </span>
            <b-badge v-if="!item.readingDate" variant="light-danger" pill>
              Não acessou o livro
            </b-badge>
          </div>
        </template>

        <template #cell(writingChallenge)="{ value, item }">
          <span
            v-b-tooltip.hover="'Ver texto'"
            class="material-symbols-outlined text-primary cursor-pointer"
            :class="{ 'cursor-not-allowed text-muted': !value }"
            @click="selectStudent(item, !value)"
          >
            draw
          </span>
        </template>

        <template #cell(audioFileUrl)="{ value }">
          <audio :src="value" controls preload="metadata"></audio>
        </template>

        <template #cell(audioProficiency)="{ value, item }">
          <div v-if="item.audioFileUrl" class="d-flex gap-2">
            <b-badge
              v-for="(pro, index) in proficiencyEnum"
              :key="index"
              pill
              :variant="value === pro.id ? `light-${pro.variant}` : 'light-secondary'"
              class="cursor-pointer"
              @click="
                () =>
                  evaluateStudent({
                    studentId: item.id,
                    proficiency: pro.id,
                    type: 1,
                  })
              "
            >
              {{ pro.text }}
            </b-badge>
          </div>
          <span v-else>-</span>
        </template>
      </ListTableLocalSorting>
    </b-col>
    <b-modal
      v-model="refShowEvaluateModal"
      centered
      size="xl"
      hide-footer
      title="Desafio da escrita"
      :busy="true"
      @close="closeModal"
    >
      <div>
        <div
          class="d-flex justify-content-between align-items-center mb-1"
          style="
            border: 1px solid var(--7-border-input, #d8d6de);
            padding: 10px 20px;
            border-radius: 6px;
          "
        >
          <span
            >Aluno:
            <span class="text-primary font-bold">{{ selectedEveluateStudent.name }}</span> </span
          ><span>
            Turma:
            <span class="text-primary font-bold">{{ classe.Name }}</span>
          </span>
        </div>
        <b-card>
          <p class="text-primary text-center">TEXTO ENVIADO PELO ALUNO</p>
          <p>{{ selectedEveluateStudent.writingChallenge }}</p>
        </b-card>
        <p class="text-primary text-center">Que tal avaliar este material?</p>
        <div class="d-flex gap-2 justify-content-center">
          <b-badge
            v-for="(pro, index) in proficiencyEnum"
            :key="index"
            pill
            :variant="
              selectedEveluateStudent.writingProficiency === pro.id
                ? `light-${pro.variant}`
                : 'light-secondary'
            "
            class="cursor-pointer"
            @click="
              evaluateStudent({
                studentId: selectedEveluateStudent.id,
                proficiency: pro.id,
                type: 2,
              })
            "
          >
            {{ pro.text }}
          </b-badge>
        </div>
      </div>
    </b-modal>
    <ReadPassport
      v-model="showReadingPassport"
      :loading="loadingPassaport"
      :passport-data="passportData"
      :selected-eveluate-student="selectedEveluateStudent"
      :global-class="classe"
      @close="closeModal"
    />
  </b-row>
</template>

<script setup>
import LibraryListDetailFilter from './LibraryListDetailFilter.vue'
import MediaCard from '@/components/card/MediaCard.vue'
import ListTableLocalSorting from '@/components/table/ListTableLocalSorting.vue'
import { getReadingProficiencyEnum, ReadingProficiencyEnum, getPassportStatusEnum } from '@/consts/ReadingMeterEnum.js'
import router from '@/router'
import { putEvaluateStudent, getStudentPassport } from '@/services/shared/readingMeter/readingMeter.service.js'
import store from '@/store'
import useFilters from '@/store/filters/useFilters.js'
import formatDate from '@/utils/date'
import { formattedTime } from '@/utils/utils'
import ReadPassport from '@/views/pages/reading-meter/components/ReadPasport.vue'
import { computed, ref, reactive, watch, getCurrentInstance } from 'vue'

const { classe } = useFilters()
const vm = getCurrentInstance().proxy
const { bookId } = router.currentRoute.params
const proficiencyEnum = [...ReadingProficiencyEnum]
proficiencyEnum.reverse()

const data = computed(() => store.getters['ReadingMeterModule/libraryBookStudentsData'])
const loading = computed(() => store.getters['ReadingMeterModule/loading'])
const proficiency = computed(() => store.getters['ReadingMeterModule/proficiency'])

const filteredStudentsTable = computed(() => {
  if (proficiency.value.id !== null) {
    return data.value.students.filter(s => s.audioProficiency === proficiency.value.id)
  }
  return data.value.students
})

const refShowEvaluateModal = ref(false)
const defaultSelectedEvaluatedStudent = () => ({
  id: undefined,
  name: undefined,
  readingDate: undefined,
  writingChallenge: undefined,
  audioFileUrl: undefined,
  audioProficiency: undefined,
  writingProficiency: undefined,
})
const selectedEveluateStudent = reactive(defaultSelectedEvaluatedStudent())

const showReadingPassport = ref(false)
const loadingPassaport = ref(false)

const defaultPassportData = () => ({
  readBooks: {
    readBooks: undefined,
    time: undefined,
  },
  readingTests: {
    performed: undefined,
    total: undefined,
    proficiency: undefined,
    enum: {
      variant: undefined,
      teaxt: undefined,
    },
  },
  readingChallenges: {
    sent: undefined,
    total: undefined,
    proficiency: undefined,
    enum: {
      variant: undefined,
      teaxt: undefined,
    },
  },
  writingChallenges: {
    sent: undefined,
    total: undefined,
    proficiency: undefined,
    enum: {
      variant: undefined,
      teaxt: undefined,
    },
  },
  table: [],
})
const passportData = reactive(defaultPassportData())

const tableColumns = [
  {
    key: 'name',
    label: 'Aluno',
    searchable: true,
  },
  {
    key: 'readingDate',
    label: 'DATA DA LEITURA',
    formatter: formatDate,
  },
  {
    key: 'writingChallenge',
    label: 'DESAFIO DA ESCRITA',
  },
  {
    key: 'audioFileUrl',
    label: 'DESAFIO DE LEITURA',
    thStyle: { width: '350px' },
  },
  {
    key: 'audioProficiency',
    label: 'PROFICIÊNCIA LEITORA (avaliação do professor)',
    thStyle: { width: '350px' },
  },
]

const changePage = ({ currentPage, perPage, sortBy, isSortDirDesc, searchQuery }) => {
  store.commit('ReadingMeterModule/setParams', {
    Search: searchQuery,
    OrderBy: `${sortBy}`,
    Ascending: `${!isSortDirDesc}`,
    Page: currentPage,
    PageSize: perPage,
  })
  store.dispatch('ReadingMeterModule/fetchBookStudents', bookId)
}

store.commit('ReadingMeterModule/reset')
store.dispatch('ReadingMeterModule/fetchBookStudents', bookId)

const generatingExcel = ref(false)

const exportToExcel = () => {
  generatingExcel.value = true
  /*  getTeachersAccessExcel({
        month: monthId.value,
        module: moduleId.value,
        educationSystemId: moduleId.value === 11 ? educationSystemId.value : null,
        institutionId: institutionId.value,
      })
        .then(response => {
          const fileName = 'Relatório acesso de Professores.xlsx'
          saveAs(response.data, fileName)
        })
        .finally(() => {
          generatingExcel.value = false
        }) */
}

const bookImgConfig = {
  blank: true,
  blankColor: '#bbb',
  width: 45,
  height: 60,
}

const selectStudent = (student, notAllowed) => {
  if (notAllowed) return

  Object.assign(selectedEveluateStudent, student)
  refShowEvaluateModal.value = true
}

const evaluateStudent = async ({ studentId, proficiency, type }) => {
  await putEvaluateStudent({
    bookId,
    classId: classe.value.ClassId,
    studentId,
    proficiency,
    type,
  })

  if (type === 2) {
    setSelectedStudentProficiency(proficiency, 2)
  }

  store.dispatch('ReadingMeterModule/fetchBookStudents', bookId)
}

const setSelectedStudentProficiency = (proficiency, type) => {
  if (type === 1) {
    selectedEveluateStudent.audioProficiency = proficiency
  } else {
    selectedEveluateStudent.writingProficiency = proficiency
  }
}

const closeModal = () => {
  Object.assign(selectedEveluateStudent, defaultSelectedEvaluatedStudent())
  Object.assign(passportData, defaultPassportData())
}

const openModalStudentPassport = item => {
  showReadingPassport.value = true
  Object.assign(selectedEveluateStudent, item)
  fetchStudentPassPort({ studentId: item.id })
}

const fetchStudentPassPort = async ({ studentId }) => {
  loadingPassaport.value = true
  const res = await getStudentPassport({ studentId })

  const { data: passportResData } = res

  passportResData.readingChallenges.enum = getReadingProficiencyEnum(passportResData.readingChallenges.proficiency)
  passportResData.readingTests.enum = getReadingProficiencyEnum(passportResData.readingTests.proficiency)
  passportResData.writingChallenges.enum = getReadingProficiencyEnum(passportResData.writingChallenges.proficiency)
  passportResData.table = passportResData.table.map(item => {
    const { status } = item
    status.enum = getPassportStatusEnum(status.percentage)
    return {
      ...item,
      status,
    }
  })

  Object.assign(passportData, passportResData)

  loadingPassaport.value = false
}

watch(
  data,
  () => {
    vm.$bus.emit('setBreadcrumb', ['', data.value.name])
  },
  { deep: true },
)
</script>

<style lang="scss" scoped>
  audio {
    height: 30px;
  }
</style>