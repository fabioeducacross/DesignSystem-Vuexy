<template>
  <b-row>
    <b-col cols="12">
      <ReadingMeterFilter />
    </b-col>
    <b-col cols="12">
      <ListTable
        :table-columns="tableColumns"
        :data-table="readings"
        :total-data="totalData"
        search-placeholder="Pesquisar por teste"
        :loading="loading"
        @change="changePage"
      >
        <template #cell(name)="{ item }">
          <div class="d-flex align-items-center gap-2">
            <b-img-lazy :src="item.imageUrl" v-bind="bookImgConfig" :alt="item.name" />
            <span class="whitespace-no-wrap font-bold">
              {{ item.name }}
            </span>
          </div>
        </template>

        <template #cell(serieName)="{ item }">
          <div>
            <b-badge variant="light-primary" pill>{{ item.serieName }}</b-badge>
          </div>
        </template>

        <template #cell(status)="{ value }">
          <div>
            <b-badge :variant="`light-${getReadingMeterStatusEnum(value).variant}`" pill>
              {{ getReadingMeterStatusEnum(value).text }}
            </b-badge>
          </div>
        </template>

        <template #cell(actions)="{ item }">
          <div class="text-nowrap d-flex align-items-center gap-3">
            <span
              v-for="(action, index) in tableActions"
              :key="index"
              v-b-tooltip.hover.top="action.tooltip(item, action.isEnabled(item))"
              :class="
                action.isEnabled(item)
                  ? `${action.color} cursor-pointer`
                  : 'cursor-not-allowed text-muted'
              "
              class="material-symbols-outlined"
              @click.stop="action.isEnabled(item) ? action.action(item) : null"
            >
              {{ action.icon }}
            </span>
          </div>
        </template>
      </ListTable>
      <ModalConfirm
        v-model="confirmEnableIsOpen"
        :callback-confirm="enableItem"
        label-confirm="Sim, habilitar"
        :busy="loadingEnable"
      >
        <h4>Tem certeza que deseja habilitar?</h4>
        <p>
          O teste ficará disponível para todos os alunos da
          <span class="text-primary font-bold">{{ classe.Name }}</span> e só será finalizado quando
          todos os alunos completarem a atividade.
        </p>
      </ModalConfirm>
    </b-col>
  </b-row>
</template>

<script setup>
import ReadingMeterFilter from './ReadingMeterFilter.vue'
import ListTable from '@/components/table/ListTable.vue'
import { getReadingMeterStatusEnum } from '@/consts/ReadingMeterEnum.js'
import router from '@/router'
import { enableReading } from '@/services/shared/readingMeter/readingMeter.service'
import store from '@/store'
import useFilters from '@/store/filters/useFilters.js'
import Toast from '@/views/pages/admin-context/shared/components/toast/Toast.vue'
import ModalConfirm from '@/views/pages/groups/components/ModalConfirm.vue'
import { computed, ref } from 'vue'
import { useToast } from 'vue-toastification/composition'

const { classe } = useFilters()
const toast = useToast()

const pagination = computed(() => store.getters['ReadingMeterModule/pagination'])
const totalData = computed(() => pagination.value.totalData)
const readings = computed(() => store.getters['ReadingMeterModule/readings'])
const loading = computed(() => store.getters['ReadingMeterModule/loading'])
const tableColumns = [
  {
    key: 'name',
    label: 'Teste',
  },
  {
    key: 'serieName',
    label: 'Ano Escolar',
  },
  {
    key: 'status',
    label: 'Status',
  },
  {
    key: 'actions',
    label: 'AÇÕES',
    thStyle: { width: '120px' },
  },
]

const tableActions = [
  {
    icon: 'task_alt',
    tooltip: (data, isEnabled) => {
      return isEnabled
        ? 'Habilitar'
        : 'Esta função não está disponível, pois o teste está em andamento.'
    },
    isEnabled: data => data.status === 1,
    color: 'text-success',
    action: data => {
      prepareEnableItem(data)
    },
  },
  {
    icon: 'pie_chart',
    tooltip: (data, isEnabled) => {
      return isEnabled
        ? 'Relatórios'
        : 'Esta função não está disponível, pois o teste está desabilitado.'
    },
    isEnabled: data => data.status !== 1,
    color: 'text-primary',
    action: data => {
      router.push({
        name: 'readingMeterTest',
        params: {
          testId: data.id,
        },
      })
    },
  },
]

const currentItem = ref({})
const confirmEnableIsOpen = ref(false)
const loadingEnable = ref(false)

const prepareEnableItem = data => {
  currentItem.value = data
  confirmEnableIsOpen.value = true
}

const enableItem = async () => {
  loadingEnable.value = true
  const { id } = currentItem.value

  const res = await enableReading({
    readingFluencyTestId: id,
    classId: classe.value.ClassId,
  })

  currentItem.value = {}
  confirmEnableIsOpen.value = false

  if (res.status === 200) {
    toast({
      component: Toast,
      props: {
        title: 'Habilitado com sucesso',
        icon: 'CheckCircleIcon',
        variant: 'success',
      },
    })
  }

  loadingEnable.value = false
  store.dispatch('ReadingMeterModule/fetchData')
}

const bookImgConfig = {
  blank: true,
  blankColor: '#bbb',
  width: 41,
  height: 54,
}

const changePage = ({ currentPage, perPage, sortBy, isSortDirDesc, searchQuery }) => {
  store.commit('ReadingMeterModule/setParams', {
    Search: searchQuery,
    OrderBy: `${sortBy}`,
    Ascending: `${!isSortDirDesc}`,
    Page: currentPage,
    PageSize: perPage,
    ClassId: classe.value.ClassId,
  })
  store.dispatch('ReadingMeterModule/fetchData')
}

store.commit('ReadingMeterModule/reset')
// store.dispatch('ReadingMeterModule/fetchData')

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

</script>