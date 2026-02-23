import store from '@/store'
import SharedMissionsList from '@/views/pages/teacher-context/records/missions/shared/SharedMissionsList.vue'
import Vue from 'vue'
import { mount, createLocalVue } from '@vue/test-utils'
import { BootstrapVue } from 'bootstrap-vue'

jest.mock('@/store', () => ({
  commit: jest.fn(),
  dispatch: jest.fn(),
  getters: {
    'sharedMissionsModule/loadingSharedMissions': false,
    'sharedMissionsModule/sharedMissions': [
      {
        id: 1,
        name: 'Missão 1',
        isCustoMissionPlus: false,
        serieName: 'Ano 1',
        teacherName: 'Professor A',
        annotation: 'Anotação 1',
      },
      {
        id: 2,
        name: 'Missão 2',
        isCustoMissionPlus: true,
        serieName: 'Ano 2',
        teacherName: 'Professor B',
        annotation: null,
      },
    ],
    'sharedMissionsModule/selectedMissionType': { id: 1, name: 'Tipo 1' },
    'sharedMissionsModule/selectedSchoolYear': { id: 1, name: 'Ano 1' },
    'sharedMissionsModule/currentPage': 1,
    'sharedMissionsModule/pageSize': 10,
    'sharedMissionsModule/totalData': 2,
  },
}))

const localVue = createLocalVue()
localVue.use(BootstrapVue)

const stubs = {
  ListTable: {
    template: `
      <div>
        <slot name="cell(name)" :item="dataTable[0]"></slot>
        <slot name="cell(actions)" :item="dataTable[0]"></slot>
      </div>
    `,
    props: ['dataTable'],
  },
  'guide-feedback-confirmation': true,
  MissionDetails: true,
  MissionDetailsPlus: true,
  'b-modal': true,
  'b-badge': true,
}

describe('SharedMissionsList.vue', () => {
  let wrapper

  beforeEach(() => {
    jest.clearAllMocks()
    wrapper = mount(SharedMissionsList, {
      localVue,
      stubs,
    })
  })

  afterEach(() => {
    wrapper.destroy()
  })

  describe('Renderização do componente', () => {
    it('deve renderizar o componente ListTable', () => {
      expect(wrapper.findComponent({ name: 'ListTable' }).exists()).toBe(true)
    })

    it('deve passar as missões da store para a prop "data-table" do ListTable', () => {
      const listTable = wrapper.findComponent({ name: 'ListTable' })
      expect(listTable.props('dataTable')).toEqual(
        store.getters['sharedMissionsModule/sharedMissions'],
      )
    })

    it('deve exibir o nome da missão usando o slot "cell(name)"', () => {
      const missionName = store.getters['sharedMissionsModule/sharedMissions'][0].name
      expect(wrapper.text()).toContain(missionName)
    })
  })

  describe('Ações do Usuário', () => {
    it('deve abrir o modal de detalhes ao clicar no ícone de "Detalhes da missão"', async () => {
      const detailsButton = wrapper.findAll('.material-symbols-outlined').at(0)
      await detailsButton.trigger('click')

      expect(wrapper.vm.showDetailsMission).toBe(true)
      expect(wrapper.vm.selectedMission).toEqual(
        store.getters['sharedMissionsModule/sharedMissions'][0],
      )
    })

    it('deve abrir o modal de confirmação ao clicar em "Usar missão"', async () => {
      const useMissionButton = wrapper.findAll('.material-symbols-outlined').at(1)
      await useMissionButton.trigger('click')

      expect(wrapper.vm.activePromptGuideFeedbackConfirmation).toBe(true)
      expect(wrapper.vm.missionDetailModal).toEqual(
        store.getters['sharedMissionsModule/sharedMissions'][0],
      )
    })
  })

  describe('Reatividade e Comunicação com a Store', () => {
    it('deve chamar as mutations e a action "fetchSharedMissions" no evento "change" da tabela', async () => {
      const listTable = wrapper.findComponent({ name: 'ListTable' })
      const tableEventPayload = { currentPage: 2, perPage: 20, searchQuery: 'Pesquisa' }

      await listTable.vm.$emit('change', tableEventPayload)

      expect(store.commit).toHaveBeenCalledWith('sharedMissionsModule/setPageSize', 20)
      expect(store.commit).toHaveBeenCalledWith('sharedMissionsModule/setCurrentPage', 2)
      expect(store.commit).toHaveBeenCalledWith('sharedMissionsModule/setSearchQuery', 'Pesquisa')
      expect(store.dispatch).toHaveBeenCalledWith('sharedMissionsModule/fetchSharedMissions')
    })
  })
})
