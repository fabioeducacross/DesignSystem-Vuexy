import ListTablePagination from './ListTablePagination.vue'
import { shallowMount } from '@vue/test-utils'

jest.mock('@/filters/filters', () => ({
  formatNumber: val => `formatted-${val}`,
}))

describe('ListTablePagination.vue', () => {
  let wrapper

  const defaultProps = {
    value: 1,
    totalData: 100,
    perPage: 10,
  }

  const mocks = {
    $t: (key, params) => {
      if (key === 'ShowingEntries') {
        return `Showing ${params.from} to ${params.to} of ${params.of}`
      }
      return key
    },
  }

  const stubs = {
    'b-row': true,
    'b-col': true,
    'b-pagination': true,
    'feather-icon': true,
  }

  afterEach(() => {
    if (wrapper) {
      wrapper.destroy()
      wrapper = null
    }
  })

  const createWrapper = (propsData = {}) => {
    return shallowMount(ListTablePagination, {
      propsData: { ...defaultProps, ...propsData },
      mocks,
      stubs,
    })
  }

  describe('Renderização básica', () => {
    it('deve renderizar o componente corretamente', () => {
      wrapper = createWrapper()
      expect(wrapper.exists()).toBe(true)
    })

    it('deve renderizar o componente de paginação', () => {
      wrapper = createWrapper()
      expect(wrapper.find('b-pagination-stub').exists()).toBe(true)
    })
  })

  describe('Prop showEntries', () => {
    it('deve renderizar o texto "Showing entries" quando showEntries é true', () => {
      wrapper = createWrapper({ showEntries: true })
      const textCol = wrapper.findAll('b-col-stub').at(0)
      expect(textCol.exists()).toBe(true)
      expect(textCol.text()).toContain('Showing')
    })

    it('não deve renderizar o texto "Showing entries" quando showEntries é false', () => {
      wrapper = createWrapper({ showEntries: false })
      const cols = wrapper.findAll('b-col-stub')
      expect(cols.length).toBe(1)
    })
  })

  describe('Prop forceResposive', () => {
    it('deve aplicar classes responsivas quando forceResposive é true', () => {
      wrapper = createWrapper({ forceResposive: true })
      const cols = wrapper.findAll('b-col-stub')
      const textCol = cols.at(0)
      const paginationCol = cols.at(1)

      expect(textCol.classes()).toContain('justify-content-sm-center')
      expect(textCol.classes()).toContain('mb-sm-1')
      expect(paginationCol.classes()).toContain('justify-content-sm-center')
    })

    it('deve aplicar classes padrão quando forceResposive é false', () => {
      wrapper = createWrapper({ forceResposive: false })
      const cols = wrapper.findAll('b-col-stub')
      const textCol = cols.at(0)
      const paginationCol = cols.at(1)

      expect(textCol.classes()).toContain('justify-content-sm-start')
      expect(paginationCol.classes()).toContain('justify-content-sm-end')
    })
  })

  describe('Exibição de valores de paginação', () => {
    it('deve exibir corretamente os valores "from", "to" e "of" para a primeira página', () => {
      wrapper = createWrapper({ value: 1, perPage: 10, totalData: 100 })
      // from: 10 * (1 - 1) + 1 = 1
      // to: 1 * 10 = 10
      // of: 100
      expect(wrapper.text()).toContain('Showing formatted-1 to formatted-10 of formatted-100')
    })

    it('deve exibir corretamente os valores "from", "to" e "of" para uma página intermediária', () => {
      wrapper = createWrapper({ value: 5, perPage: 10, totalData: 100 })
      // from: 10 * (5 - 1) + 1 = 41
      // to: 5 * 10 = 50
      expect(wrapper.text()).toContain('Showing formatted-41 to formatted-50 of formatted-100')
    })

    it('deve exibir corretamente os valores "from", "to" e "of" para a última página (limitando endItem)', () => {
      wrapper = createWrapper({ value: 11, perPage: 10, totalData: 105 })
      // from: 10 * (11 - 1) + 1 = 101
      // to: 11 * 10 = 110 -> capped at 105
      expect(wrapper.text()).toContain('Showing formatted-101 to formatted-105 of formatted-105')
    })

    it('deve lidar corretamente com dados vazios', () => {
      wrapper = createWrapper({ value: 1, perPage: 10, totalData: 0 })
      // from: 10 * 0 + 0 = 0
      // to: 0
      expect(wrapper.text()).toContain('Showing formatted-0 to formatted-0 of formatted-0')
    })
  })

  describe('Eventos', () => {
    it('deve emitir o evento input quando a paginação mudar', async () => {
      wrapper = createWrapper()
      const pagination = wrapper.find('b-pagination-stub')
      pagination.vm.$emit('change', 2)
      await wrapper.vm.$nextTick()

      expect(wrapper.emitted().input).toBeTruthy()
      expect(wrapper.emitted().input[0]).toEqual([2])
    })
  })

  describe('Computed Property - endItem', () => {
    it('deve calcular endItem corretamente quando não excede totalData', () => {
      wrapper = createWrapper({ value: 2, perPage: 10, totalData: 100 })
      expect(wrapper.vm.endItem).toBe(20)
    })

    it('deve limitar endItem ao totalData quando excede', () => {
      wrapper = createWrapper({ value: 11, perPage: 10, totalData: 105 })
      expect(wrapper.vm.endItem).toBe(105)
    })

    it('deve retornar 0 quando totalData é 0', () => {
      wrapper = createWrapper({ value: 1, perPage: 10, totalData: 0 })
      expect(wrapper.vm.endItem).toBe(0)
    })
  })

  describe('Props do b-pagination', () => {
    it('deve passar as props corretas para b-pagination', () => {
      wrapper = createWrapper({ value: 3, perPage: 20, totalData: 200 })
      const pagination = wrapper.find('b-pagination-stub')

      expect(pagination.attributes('value')).toBe('3')
      expect(pagination.attributes('total-rows')).toBe('200')
      expect(pagination.attributes('per-page')).toBe('20')
      expect(pagination.attributes('first-number')).toBe('')
      expect(pagination.attributes('last-number')).toBe('')
      expect(pagination.classes()).toContain('mb-0')
    })
  })

  describe('Estrutura das colunas', () => {
    it('deve ter 2 colunas quando showEntries é true', () => {
      wrapper = createWrapper({ showEntries: true })
      expect(wrapper.findAll('b-col-stub').length).toBe(2)
    })

    it('deve configurar corretamente as props sm das colunas', () => {
      wrapper = createWrapper()
      const cols = wrapper.findAll('b-col-stub')

      expect(cols.at(0).attributes('sm')).toBe('6')
      expect(cols.at(1).attributes('sm')).toBe('6')
    })

    it('deve configurar sm="12" nas colunas quando forceResposive é true', () => {
      wrapper = createWrapper({ forceResposive: true })
      const cols = wrapper.findAll('b-col-stub')

      expect(cols.at(0).attributes('sm')).toBe('12')
      expect(cols.at(1).attributes('sm')).toBe('12')
    })
  })
})
