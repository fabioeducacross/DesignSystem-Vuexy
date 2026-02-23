<template>
  <b-modal
    ref="refModal"
    title="Histórico de ações"
    size="lg"
    centered
    no-close-on-esc
    no-close-on-backdrop
    hide-footer
    static
    @close="onClose"
    @shown="onShown"
  >
    <div v-if="modalVisible">
      <ListTableLocalSorting
        v-if="guideId"
        ref="refTable"
        :loading="loading"
        :data-table="tableData"
        :table-columns="tableFields"
        search-placeholder="Pesquisar por usuário"
        :per-page-default="10"
        :border="true"
      >
        <template #cell(date)="{ item }">
          <div>
            <div>{{ formatDate(item.date) }}</div>
            <small class="text-muted">{{ formatTime(item.date) }}</small>
          </div>
        </template>

        <template #cell(applicationUserName)="{ item }">
          <div class="d-flex align-items-center gap-2">
            <b-avatar
              :text="getInitials(item.applicationUserName)"
              variant="light-primary"
              size="32"
            />
            <span>{{ item.applicationUserName }}</span>
          </div>
        </template>

        <template #cell(userType)="{ value }">
          <span>{{ getUserTypeLabel(value) }}</span>
        </template>

        <template #cell(action)="{ value }">
          <span>{{ value }}</span>
        </template>

        <template #cell(oldStatus)="{ value }">
          <b-badge
            v-if="value !== null && value !== undefined"
            pill
            :variant="'light-' + (getVariantByRule(value, 'guideStatus').variant || '')"
          >
            {{ getVariantByRule(value, 'guideStatus').label }}
          </b-badge>
          <span v-else>-</span>
        </template>

        <template #cell(newStatus)="{ value }">
          <b-badge
            v-if="value !== null && value !== undefined"
            pill
            :variant="'light-' + (getVariantByRule(value, 'guideStatus').variant || '')"
          >
            {{ getVariantByRule(value, 'guideStatus').label }}
          </b-badge>
          <span v-else>-</span>
        </template>
      </ListTableLocalSorting>
    </div>
  </b-modal>
</template>

<script>
  import { useEducationSystemMissions } from './useEducationSystemMissions'
  import ListTableLocalSorting from '@/components/table/ListTableLocalSorting.vue'
  import { getVariantByRule } from '@/consts/legends'
  import { defineComponent, ref, nextTick, computed } from 'vue'

  export default defineComponent({
    name: 'HistoryModal',
    components: { ListTableLocalSorting },
    setup() {
      const refModal = ref(null)
      const refTable = ref(null)
      const guideId = ref(null)
      const modalVisible = ref(false)

      const { history, historyLoading, fetchHistory } = useEducationSystemMissions()

      const loading = computed(() => historyLoading.value)

      const tableFields = [
        {
          key: 'date',
          label: 'DATA E HORA',
          sortable: true,
        },
        {
          key: 'applicationUserName',
          label: 'USUÁRIO',
          sortable: true,
          searchable: true,
        },
        {
          key: 'userType',
          label: 'PERFIL',
          sortable: true,
        },
        {
          key: 'action',
          label: 'AÇÃO',
          sortable: true,
        },
        {
          key: 'oldStatus',
          label: 'STATUS ANTES',
          sortable: true,
        },
        {
          key: 'newStatus',
          label: 'STATUS ATUAL',
          sortable: true,
        },
      ]

      const tableData = computed(() => history.value || [])
      const totalItems = computed(() => (history.value || []).length)

      const fetchTableData = async () => {
        if (!guideId.value) {
          return
        }

        await fetchHistory(guideId.value)
      }

      const resetComponent = () => {
        guideId.value = null
        history.value = []
      }

      const openModal = guide => {
        guideId.value = guide.guideId
        modalVisible.value = true
        refModal.value.show()
      }

      const onClose = () => {
        refModal.value.hide()
        modalVisible.value = false
        guideId.value = null
        resetComponent()
      }

      const onShown = async () => {
        await nextTick()
        await fetchTableData()
      }

      const formatDate = dateString => {
        if (!dateString) return '-'
        const date = new Date(dateString)
        return date.toLocaleDateString('pt-BR')
      }

      const formatTime = dateString => {
        if (!dateString) return '-'
        const date = new Date(dateString)
        return date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
      }

      const getInitials = name => {
        if (!name) return '?'
        const parts = name.split(' ')
        if (parts.length >= 2) {
          return `${parts[0][0]}${parts[1][0]}`.toUpperCase()
        }
        return parts[0].substring(0, 2).toUpperCase()
      }

      const getUserTypeLabel = userType => {
        const userTypeMap = {
          0: 'Secretaria',
          1: 'Diretor',
          2: 'Coordenador',
          3: 'Gestor de Rede',
          4: 'Professor',
          5: 'Auditor',
          6: 'Aluno',
          7: 'Responsável',
        }
        return userTypeMap[userType] || 'Não definido'
      }

      return {
        refModal,
        refTable,
        tableData,
        totalItems,
        guideId,
        tableFields,
        modalVisible,
        loading,
        onClose,
        openModal,
        onShown,
        formatDate,
        formatTime,
        getInitials,
        getUserTypeLabel,
        getVariantByRule,
      }
    },
  })
</script>

<style lang="scss" scoped></style>
