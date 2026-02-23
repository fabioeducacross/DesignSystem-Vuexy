import List from './List.vue'
import Vue from 'vue'
import { createLocalVue, shallowMount } from '@vue/test-utils'

const localVue = createLocalVue()

// Mock Child Components to avoid import side effects (like CSS)
jest.mock('@/components/mission-plus/MissionBookDetails.vue', () => ({
  name: 'MissionBookDetails',
  render: h => h('div'),
}))

jest.mock('@/components/cells/PerformanceCell.vue', () => ({
  name: 'PerformanceCell',
  render: h => h('div'),
}))

jest.mock('@/components/progessBar/ProgressBarHorizontalV2.vue', () => ({
  name: 'ProgressBarHorizontalV2',
  render: h => h('div'),
}))

jest.mock('@/components/table/ListTableLocalSorting.vue', () => ({
  name: 'ListTableLocalSorting',
  render: h => h('div'),
  props: ['dataTable', 'loading', 'tableColumns'],
}))

jest.mock(
  '@/views/pages/teacher-context/educationSystem/EducationSystemMissionsEnableModal.vue',
  () => ({
    name: 'EducationSystemMissionsEnableModal',
    render: h => h('div'),
  }),
)

// Mock dependencies
jest.mock(
  '@/views/pages/teacher-context/educationSystem/missions/useEducationSystemMissions.js',
  () => ({
    useEducationSystemMissions: () => ({
      fetch: jest.fn(),
    }),
  }),
)

jest.mock('@/store/filters/useFilters', () => () => ({
  classe: { value: { Name: 'Class A', ClassId: 1 } },
  educationSystemId: { value: 1 },
}))

const mockDataTable = { value: [] }
const mockLoading = { value: false }
const mockResetPage = jest.fn()
jest.mock('@/store/table/useTable.js', () => () => ({
  loading: mockLoading,
  dataTable: mockDataTable,
  reset: jest.fn(),
  tableRef: { value: null },
  resetPage: mockResetPage,
}))

jest.mock('@/router', () => ({
  currentRoute: { params: { bookId: 1 } },
  push: jest.fn(),
}))

jest.mock('@/consts/legends', () => ({
  getVariantByRule: jest.fn(() => ({ variant: 'primary', label: 'Label' })),
}))

jest.mock('@/filters/filters', () => ({
  formattedDate: jest.fn(val => val),
}))

jest.mock('@/services/teacher-context/educationSystem/EducationSystem.Service', () => ({
  enableDisableEducationSystemBooks: jest.fn(),
}))

describe('List.vue', () => {
  let wrapper

  beforeEach(() => {
    mockDataTable.value = [
      { unityId: 2, name: 'Mission B', status: 1 },
      { unityId: 1, name: 'Mission C', status: 1 },
      { unityId: 2, name: 'Mission A', status: 1 },
      { unityId: 1, name: 'Mission D', status: 1 },
    ]

    wrapper = shallowMount(List, {
      localVue,
      stubs: {
        // We still provide stubs for what shallowMount sees, although jest.mock handles the imports
        ListTableLocalSorting: true,
        PerformanceCell: true,
        ProgressBarHorizontalV2: true,
        ModalConfirm: true,
        MissionBookDetails: true,
        EducationSystemMissionsEnableModal: true,
        'b-badge': true,
        'b-modal': true,
        'b-tooltip': true,
      },
      mocks: {
        $t: key => key,
        $toast: jest.fn(),
        $copyText: jest.fn(),
      },
    })
  })

  it('should pass sorted missions to ListTableLocalSorting', async () => {
    const table = wrapper.findComponent({ name: 'ListTableLocalSorting' })

    // Initial state: no sorting, returns dataTable as is
    expect(table.props('dataTable')).toEqual(mockDataTable.value)
  })

  it('should sort by unityId (Ascending) and tie-break by name (Ascending)', async () => {
    const table = wrapper.findComponent({ name: 'ListTableLocalSorting' })

    // Simulate user clicking "Unidade" header (Ascending)
    table.vm.$emit('update:sortBy', 'unityId')
    table.vm.$emit('update:sortDesc', false)
    await wrapper.vm.$nextTick()

    const sorted = table.props('dataTable')

    // Expected:
    // Unity 1, Mission C
    // Unity 1, Mission D
    // Unity 2, Mission A
    // Unity 2, Mission B

    expect(sorted[0]).toEqual(expect.objectContaining({ unityId: 1, name: 'Mission C' }))
    expect(sorted[1]).toEqual(expect.objectContaining({ unityId: 1, name: 'Mission D' }))
    expect(sorted[2]).toEqual(expect.objectContaining({ unityId: 2, name: 'Mission A' }))
    expect(sorted[3]).toEqual(expect.objectContaining({ unityId: 2, name: 'Mission B' }))
  })

  it('should sort by unityId (Descending) but KEEP tie-break by name (Ascending)', async () => {
    const table = wrapper.findComponent({ name: 'ListTableLocalSorting' })

    // Simulate user clicking "Unidade" header again (Descending)
    table.vm.$emit('update:sortBy', 'unityId')
    table.vm.$emit('update:sortDesc', true)
    await wrapper.vm.$nextTick()

    const sorted = table.props('dataTable')

    // Expected:
    // Unity 2, Mission A (Name is still A-Z within Unity 2)
    // Unity 2, Mission B
    // Unity 1, Mission C (Name is still A-Z within Unity 1)
    // Unity 1, Mission D

    expect(sorted[0]).toEqual(expect.objectContaining({ unityId: 2, name: 'Mission A' }))
    expect(sorted[1]).toEqual(expect.objectContaining({ unityId: 2, name: 'Mission B' }))
    expect(sorted[2]).toEqual(expect.objectContaining({ unityId: 1, name: 'Mission C' }))
    expect(sorted[3]).toEqual(expect.objectContaining({ unityId: 1, name: 'Mission D' }))
  })

  it('should sort by Name (Descending) correctly', async () => {
    const table = wrapper.findComponent({ name: 'ListTableLocalSorting' })

    // Simulate user clicking "Missão" header (Descending)
    table.vm.$emit('update:sortBy', 'name')
    table.vm.$emit('update:sortDesc', true)
    await wrapper.vm.$nextTick()

    const sorted = table.props('dataTable')

    // Expected: D, C, B, A
    expect(sorted[0].name).toBe('Mission D')
    expect(sorted[1].name).toBe('Mission C')
    expect(sorted[2].name).toBe('Mission B')
    expect(sorted[3].name).toBe('Mission A')
  })
})
