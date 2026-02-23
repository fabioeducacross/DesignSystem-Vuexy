<template>
  <section>
    <ListTableLocalSorting
      :loading="loading"
      :table-columns="tableColumns"
      :data-table="dataTable"
      search-placeholder="Pesquisar por aluno"
    >
      <template #cell(status)="{ item }">
        <b-button
          v-if="
            !item.status &&
            evaluationDetails.status !== EEvaluationActiveStatus.Canceled &&
            evaluationDetails.status !== EEvaluationActiveStatus.Finished
          "
          variant="primary"
          size="sm"
          @click="openAnswerKey(item.id)"
        >
          Preencher gabarito
        </b-button>

        <b-badge v-else :variant="`light-${getStatus(item.status).variant}`">
          <div class="text-capitalize d-flex align-items-center gap-1">
            <span
              class="material-symbols-outlined"
              :class="`status-icon-${getStatus(item.status).icon}`"
              style="font-size: 18px"
            >
              {{ getStatus(item.status).icon }}
            </span>
            {{ getStatus(item.status).text }}
          </div>
        </b-badge>
      </template>

      <template #cell(actions)="{ item }">
        <div class="text-nowrap d-flex align-items-center gap-3">
          <span
            v-for="(action, index) in tableActions"
            :key="index"
            v-b-tooltip.hover.top="action.tooltip(item, action.isEnabled(item))"
            :class="
              action.isEnabled(item)
                ? 'text-primary cursor-pointer'
                : 'cursor-not-allowed text-muted'
            "
            class="material-symbols-outlined"
            @click.stop="action.isEnabled(item) ? action.action(item) : null"
          >
            {{ action.icon }}
          </span>
        </div>
      </template>
    </ListTableLocalSorting>

    <ModalAnswerkeyDetails
      v-model="modalIsOpen"
      :student="selectedStudent"
      :evaluation-details="evaluationDetails"
      @close="closeModal"
    />
  </section>
</template>

<script setup>
  import ListTableLocalSorting from '@/components/table/ListTableLocalSorting.vue'
  import { EAnswerKey, answerKeyStatus, EEvaluationActiveStatus } from '@/consts/evaluationsEnum.js'
  import { formatNumber } from '@/filters/filters'
  import router from '@/router'
  import { getEvaluationAnswerKey } from '@/services/shared/evaluations/Evaluation.Service.js'
  import store from '@/store'
  import useFilters from '@/store/filters/useFilters'
  import ModalAnswerkeyDetails from '@/views/pages/admin-context/evaluations/answerkey/students/components/ModalAnswerkeyDetails.vue'
  import { ref, computed } from 'vue'

  const { classe } = useFilters()

  const loading = ref(true)
  const dataTable = ref([])

  const evaluationId = router.currentRoute.params.evaluationId

  const evaluationDetails = computed(
    () => store.getters['evaluations/evaluationDetails'] || {},
  )

  const tableColumns = [
    { key: 'name', label: 'Nome', sortable: true, searchable: true, tdClass: 'font-bold' },
    {
      key: 'status',
      label: 'GABARITO',
      sortable: false,
      thStyle: { width: '300px' },
      tooltip:
        'Via Prova Digital: se o aluno finalizar a avaliação de forma totalmente digital, seu gabarito será gerado automaticamente e não poderá ser alterado. Via Professor ou Leitura Automática: caso a aplicação da avaliação seja parcial ou totalmente física, o professor deverá inserir o gabarito manualmente ou fazer a leitura automática do mesmo. A inclusão manual ficará disponível apenas durante o período da Avaliação — após o encerramento, essa funcionalidade será bloqueada.',
    },
    { key: 'actions', label: 'Ações', sortable: false, thStyle: { width: '80px' } },
  ]

  const fetchData = () => {
    loading.value = true
    dataTable.value = []

    getEvaluationAnswerKey(evaluationId, {
      ClassId: classe.value.ClassId,
    })
      .then(({ data }) => {
        dataTable.value = data
      })
      .finally(() => {
        loading.value = false
      })
  }

  const getStatus = status => {
    return answerKeyStatus.find(s => s.rule(status))
  }

  const modalIsOpen = ref(false)
  const selectedStudent = ref(null)

  const openModal = data => {
    modalIsOpen.value = true
    selectedStudent.value = data
  }

  const closeModal = () => {
    selectedStudent.value = null
  }

  const openAnswerKey = id => {
    router.push({
      name: 'evaluationsAnswerTeacherStudentAnswers',
      params: {
        studentId: id,
      },
    })
  }

  const tableActions = [
    {
      icon: 'visibility',
      tooltip: (data, isEnabled) => {
        return isEnabled ? 'Ver gabarito' : 'Ação bloqueada, pois o gabarito não foi preenchido'
      },
      isEnabled: data => data.status,
      action: data => {
        openModal(data)
      },
    },
    {
      icon: 'edit',
      tooltip: (data, isEnabled) => {
        if (
          data.status === EAnswerKey.EvaluationDigital ||
          data.status === EAnswerKey.TeacherAutomaticInput
        ) {
          return 'Os dados não podem ser alterados'
        }

        if (evaluationDetails.value.status === EEvaluationActiveStatus.Canceled) {
          return 'Ação bloqueada, pois a Avaliação foi cancelada'
        }

        if (evaluationDetails.value.status === EEvaluationActiveStatus.Finished) {
          return 'Ação bloqueada, pois a Avaliação foi finalizada'
        }

        if (!data.status) {
          return 'Ação bloqueada, pois o gabarito não foi preenchido'
        }

        return 'Editar gabarito'
      },
      isEnabled: data =>
        data.status &&
        data.status !== EAnswerKey.EvaluationDigital &&
        data.status !== EAnswerKey.TeacherAutomaticInput &&
        evaluationDetails.value.status !== EEvaluationActiveStatus.Canceled &&
        evaluationDetails.value.status !== EEvaluationActiveStatus.Finished,
      action: data => {
        openAnswerKey(data.id)
      },
    },
  ]

  fetchData()
</script>

<style lang="scss" scoped>
  .material-symbols-outlined.status-icon-info {
    font-variation-settings: 'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24;
  }
</style>