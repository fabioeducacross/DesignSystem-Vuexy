import PerformanceCell from '@/components/cells/PerformanceCell.vue'
import ProgressBarHorizontalV2 from '@/components/progessBar/ProgressBarHorizontalV2.vue'
import ListTableLocalSorting from '@/components/table/ListTableLocalSorting.vue'
import List from '@/views/pages/admin-context/network-manager/education-system/schools/institutions/List.vue'
import { shallowMount, createLocalVue } from '@vue/test-utils'

jest.mock('@/store/table/useTable.js', () => () => ({
  loading: false,
  dataTable: [
    {
      id: 1,
      name: 'Escola Teste',
      networkGroupName: 'Grupo 1',
      guidesSend: 5,
      totalGuides: 10,
      progressTotal: 60,
      progressSend: 80,
      performance: 75,
      serieName: '1a Serie',
    },
  ],
  reset: jest.fn(),
  tableRef: null,
}))

const useTableMock = require('@/store/table/useTable.js').default

jest.mock('@/router', () => ({
  currentRoute: {
    params: { bookId: '1', educationSystemId: '2' },
    meta: { routeClasses: 'routeClasses' },
  },
  push: jest.fn(),
}))

jest.mock(
  '@/views/pages/admin-context/network-manager/education-system/schools/institutions/useEducationSystemInstitutions.js',
  () => {
    const { ref } = require('vue')
    return {
      useEducationSystemInstitutions: () => ({
        classe: ref([{ id: 1 }]),
        groups: ref([{ id: null }, { id: 1 }]),
        resetAndfetch: jest.fn(),
      }),
    }
  },
)

describe('List.vue', () => {
  const localVue = createLocalVue()

  afterEach(() => {
    jest.clearAllMocks()
  })

  const mountComponent = () =>
    shallowMount(List, {
      localVue,
      mocks: {
        $t: key => key,
      },
    })

  it('propaga dados corretos para ListTableLocalSorting', () => {
    const wrapper = mountComponent()
    const table = wrapper.findComponent(ListTableLocalSorting)
    expect(table.exists()).toBe(true)
    expect(table.props('dataTable')).toHaveLength(1)
    expect(table.props('loading')).toBe(false)
  })

  it('define colunas de desempenho na tabela', () => {
    const wrapper = mountComponent()
    const columnKeys = wrapper.vm.tableColumns.map(column => column.key)
    expect(columnKeys).toEqual(
      expect.arrayContaining(['progressTotal', 'progressSend', 'performance']),
    )
  })

  it('oculta coluna networkGroupName quando ha apenas uma classe', () => {
    const wrapper = mountComponent()
    expect(wrapper.vm.setFields.some(field => field.key === 'networkGroupName')).toBe(false)
  })

  it('navega para a rota de classes ao acionar a acao', () => {
    const wrapper = mountComponent()
    const action = wrapper.vm.tableActions[0]
    action.action({ id: 123 })
    const router = require('@/router')
    expect(router.push).toHaveBeenCalledWith({
      name: 'routeClasses',
      params: { bookId: '1', educationSystemId: '2', institutionId: 123 },
    })
  })

  it('invoca reset do useTable ao destruir', () => {
    const wrapper = mountComponent()
    wrapper.destroy()
    const { value: instance } = useTableMock.mock.results[useTableMock.mock.results.length - 1]
    expect(instance.reset).toHaveBeenCalled()
  })
})
