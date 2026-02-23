<template>
  <div>
    <h1 class="schoolMission-title">Missões {{ $route.query.classTitle }}</h1>
    <div class="filters-wrapper">
      <SelectSubject :fetch-on-mounted="false" />
    </div>
    <dynamic-table-paginated
      role="mission"
      :data="booksList"
      :config="tableConfig"
      :actions="actions"
      show-by="list"
      :rows="rows"
      :per-page="perPage"
      :busy="busy"
      @changePage="setPage"
    />
  </div>
</template>

<script setup>
import DynamicTablePaginated from '../../../shared/components/tables/DynamicTablePaginated.vue'
import { formatNumber } from '@/filters/filters'
import SelectSubject from '@/layouts/components/SelectSubject.vue'
import router from '@/router'
import { getEducationSystemBooks } from '@/services/shared/educationSystem/EducationSystem.Service'
import store from '@/store'
import useFilters from '@/store/filters/useFilters'
import Toast from '@/views/pages/admin-context/shared/components/toast/Toast.vue'
import { BForm, BFormGroup } from 'bootstrap-vue'
import { computed, getCurrentInstance, onMounted, ref, watch } from 'vue'
import VSelect from 'vue-select'

const vm = getCurrentInstance().proxy
const { subject } = useFilters()

const busy = ref(false)
const filters = ref({})
const subjects = ref([])
const educationSystemId = ref(0)
const booksList = ref([])

const tableConfig = ref({
  tableFields: [
    {
      key: 'bookName',
      label: 'Livro',
      sortable: true,
      componentName: 'ImageIconBook',
    },
    {
      key: 'amountMissions',
      label: 'Missões disponíveis',
      sortable: true,
      formatter: value => formatNumber(value),
    },
    {
      key: 'guidesEnabled',
      label: 'Missões habilitadas',
      sortable: true,
      formatter: value => formatNumber(value),
    },
    {
      key: 'actions',
      label: '',
    },
  ],
  cardFields: [],
})

const actions = ref([])
const rows = ref(0)
const perPage = ref(0)
const page = ref(1)
const institutionId = ref(null)
const institutionEducationSystemId = ref(null)

const currentPage = computed(() => page.value)

const Role = store.getters.accessRole

if (Role === 'NetworkManager') {
  institutionId.value = parseInt(router.currentRoute.params.institutionId)
}

institutionEducationSystemId.value = parseInt(router.currentRoute.params.EducationSystemId)

const getBooksList = async id => {
  filters.value.SubjectId = id

  try {
    busy.value = true
    const { data } = await getEducationSystemBooks(
      {
        InstitutionId: institutionId.value,
        EducationSystemId: institutionEducationSystemId.value,
        ClassId: router.currentRoute.params.classId,
        ...filters.value,
      },
      currentPage.value,
    )
    booksList.value = data
    busy.value = false
  } catch (err) {
    vm.$toast({
      component: Toast,
      props: {
        title: 'Aviso',
        icon: 'AlertTriangleIcon',
        text: 'Um problema ocorreu!',
        variant: 'danger',
      },
    })

    router.push({
      name: 'listEducationSystemMissions',
      params: {
        EducationSystemId: router.currentRoute.params.EducationSystemId,
      },
    })
  }
}

const createFilters = () => {
  let sessionSubjectId = router.currentRoute.params.subjectId

  subjects.value = router.currentRoute.params.subjects

  if (!sessionSubjectId) {
    sessionSubjectId = store.getters.subjectId
  }

  if (!router.currentRoute.params.subjects) {
    subjects.value = store.getters.educationSystemSubjects
  }

  subjects.value = subjects.value.filter(item => item !== null && item !== undefined)

  subject.value = subjects.value.find(item => item.id === sessionSubjectId)

  getBooksList(subject.value.id)
}

createFilters()

const setPage = p => {
  page.value = p
  getBooksList(subject.value.id)
}

onMounted(() => {
  busy.value = true
  actions.value = [
    {
      label: data => {
        if (!data.amountMissions) {
          return 'Não é possível ver os detalhes do livro, pois não há Missões disponíveis.'
        }
        return 'Ver detalhes'
      },
      icon: 'ChevronRightIcon',
      class: 'icon-primary',
      disabled: data => !data.amountMissions,
      action: data => {
        const { subjects } = router.currentRoute.params
        const { classTitle } = vm.$route.query
        const { EducationSystemId, classId } = router.currentRoute.params
        const Role = store.getters.accessRole

        if (Role === 'NetworkManager') {
          return router.push({
            name: 'educationSystemBookPageNM',
            params: {
              bookId: data.bookId,
              EducationSystemId,
              classId,
              institutionId: institutionId.value,
              subjects: router.currentRoute.params.subjects,
            },
            query: { classTitle, subjectId: data.subjectId },
          })
        }
        return router.push({
          name: 'educationSystemBookPage',
          params: {
            bookId: data.bookId,
            EducationSystemId,
            classId,
            subjects,
            subjectId: data.subjectId,
          },
          query: { classTitle, subjectId: data.subjectId },
        })
      },
    },
  ]
})

watch(subject, (newVal, oldVal) => {
  if (newVal.id !== oldVal.id) {
    getBooksList(subject.value.id)
  }
})
</script>

<style lang="scss" scoped>
  .schoolMission-title {
    font-weight: 500;
    font-size: 24px;
    line-height: 29px;

    color: #2c2c2c;
  }

  .filters-form {
    display: flex;
    flex-wrap: wrap;
    align-content: stretch;
    justify-content: space-between;
  }

  .filters-form-items {
    flex: 1;
    margin: 0px 5px;
  }

  .filters-wrapper {
    margin-top: 24px;
    margin-bottom: 24px;

    width: 25%;
  }

  @media (max-width: 900px) {
    .column-order {
      display: flex;
      flex-direction: column;
    }

    .filters-wrapper {
      margin-top: 24px;
      margin-bottom: 24px;

      width: 100%;
    }

    .filters-form {
      display: flex;
      flex-direction: column;
    }

    .filters-form-items {
      margin-bottom: 1rem;
    }

    .custom-button-margin {
      margin-top: 1rem;
    }
  }
</style>