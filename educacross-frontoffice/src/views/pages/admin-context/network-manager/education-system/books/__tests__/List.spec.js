import PerformanceCell from '@/components/cells/PerformanceCell.vue'
import ProgressBarHorizontalV2 from '@/components/progessBar/ProgressBarHorizontalV2.vue'
import ListTableLocalSorting from '@/components/table/ListTableLocalSorting.vue'
import List from '@/views/pages/admin-context/network-manager/education-system/books/List.vue'
import { shallowMount, createLocalVue } from '@vue/test-utils'

jest.mock('@/router', () => ({
  push: jest.fn(),
  currentRoute: { params: { educationSystemId: 123 } },
}))

const localVue = createLocalVue()

describe('EducationSystemBooksListNetworkManager.vue', () => {
  let wrapper
  const dataTable = [
    {
      id: 1,
      name: 'Livro 1',
      serieName: '1º Ano',
      serieOrder: 1,
      imageUrl: 'img1.png',
      hasGuideEnabled: true,
      progress: 75,
      performance: 80,
    },
    {
      id: 2,
      name: 'Livro 2',
      serieName: '2º Ano',
      serieOrder: 2,
      imageUrl: 'img2.png',
      hasGuideEnabled: false,
      progress: 0,
      performance: 0,
    },
  ]

  const factory = (propsData = {}) => {
    return shallowMount(List, {
      localVue,
      stubs: {
        ListTableLocalSorting,
        PerformanceCell,
        ProgressBarHorizontalV2,
        'b-card': true,
        'b-badge': true,
        'b-img-lazy': true,
        'b-media': true,
        'b-button': true,
        'b-tooltip': true,
      },
      propsData: {
        dataTable,
        totalData: 2,
        loading: false,
        ...propsData,
      },
      mocks: {
        $t: msg => msg,
      },
    })
  }

  beforeEach(() => {
    wrapper = factory()
  })

  it('renders ListTableLocalSorting with correct props', () => {
    const table = wrapper.findComponent(ListTableLocalSorting)
    expect(table.exists()).toBe(true)

    const actualSortedData = table.props('dataTable')
    expect(actualSortedData).toHaveLength(2)

    // Check that the data is sorted correctly
    // With sort-desc-default="false" in template, should be ascending order
    // '1º Ano' should come before '2º Ano' alphabetically
    expect(actualSortedData[0].serieName).toBe('1º Ano')
    expect(actualSortedData[0].id).toBe(1)
    expect(actualSortedData[1].serieName).toBe('2º Ano')
    expect(actualSortedData[1].id).toBe(2)

    expect(table.props('loading')).toBe(false)
  })

  it('renders table columns correctly', () => {
    expect(wrapper.vm.tableColumns.map(c => c.key)).toEqual([
      'name',
      'serieName',
      'progress',
      'performance',
      'actions',
    ])
  })

  it('possui opções de paginação fixas', () => {
    const table = wrapper.findComponent(ListTableLocalSorting)
    expect(table.props('perPageOptions')).toEqual([4, 12, 24, 50, 100])
  })

  it('tooltip da ação deve ser "Ver Missões"', () => {
    expect(wrapper.vm.tableActions[0].tooltip()).toBe('Ver Missões')
  })

  it('ação de tabela deve navegar para detalhes do livro', () => {
    const router = require('@/router')
    const action = wrapper.vm.tableActions[0]
    action.action(dataTable[0])
    expect(router.push).toHaveBeenCalledWith({
      name: 'educationSystemNetworkBookDetails',
      params: { educationSystemId: 123, bookId: dataTable[0].id },
    })
  })
})