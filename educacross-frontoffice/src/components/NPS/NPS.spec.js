import NPS from '@/components/NPS/NPS.vue'
import { mount, createLocalVue } from '@vue/test-utils'
import { BootstrapVue } from 'bootstrap-vue'
import Vue from 'vue'

const localVue = createLocalVue()
localVue.use(BootstrapVue)

// Mock do serviço postNps
jest.mock('@/services/shared/NPS/Nps.Service', () => ({
  postNps: jest.fn(),
}))

// Mock do getWhitelabelConfig
jest.mock('@/services/whitelabel/WhiteLabel.Service', () => jest.fn(() => 'Plataforma Teste'))

// Mock do Toast component
jest.mock('@/views/pages/admin-context/shared/components/toast/Toast.vue', () => ({
  name: 'Toast',
  template: '<div>Toast</div>',
}))

// Mock do store
jest.mock('@/store', () => ({
  getters: {
    accessUserData: { UserId: 123 },
    accessRole: 'Teacher',
    getInstitutionId: 456,
  },
}))

// Factory function para criar props mock
const createMockNPSData = (overrides = {}) => ({
  id: 1,
  question: 'Como foi sua experiência hoje?',
  ...overrides,
})

describe('NPS.vue', () => {
  let wrapper
  let mockToast
  const { postNps } = require('@/services/shared/NPS/Nps.Service')

  beforeEach(() => {
    jest.clearAllMocks()

    // Mock do $toast
    mockToast = jest.fn()

    wrapper = mount(NPS, {
      localVue,
      propsData: {
        NPSData: createMockNPSData(),
        index: 0,
        isTeacher: true,
      },
      mocks: {
        $toast: mockToast,
      },
      stubs: {
        'b-row': true,
        'b-col': true,
        'b-form-textarea': true,
        'b-button': {
          template: '<button @click="$emit(\'click\')" :disabled="disabled"><slot /></button>',
          props: ['disabled'],
        },
        'b-spinner': true,
      },
    })
  })

  afterEach(() => {
    if (wrapper) wrapper.destroy()
    jest.restoreAllMocks()
  })

  describe('Renderização Inicial', () => {
    it('deve montar o componente corretamente', () => {
      expect(wrapper.exists()).toBe(true)
    })

    it('deve exibir o título principal com o nome da plataforma', () => {
      expect(wrapper.text()).toContain('Qual é a probabilidade de você recomendar a')
      expect(wrapper.text()).toContain('Plataforma Teste')
    })

    it('deve exibir a pergunta personalizada do NPS', () => {
      expect(wrapper.text()).toContain('Como foi sua experiência hoje?')
    })

    it('deve renderizar todos os números de avaliação (1-10)', () => {
      const numbers = wrapper.findAll('.numbers')
      expect(numbers.length).toBe(10)
    })

    it('deve inicializar formNPS com id da prop NPSData', () => {
      expect(wrapper.vm.formNPS.id).toBe(1)
    })

    it('deve inicializar com textarea desabilitado', () => {
      expect(wrapper.vm.isTextareaDisabled).toBe(true)
    })

    it('deve inicializar sem rating selecionado', () => {
      expect(wrapper.vm.formNPS.rating).toBeNull()
    })
  })

  describe('Seleção de Nota (chooseGrade)', () => {
    it('deve selecionar uma nota quando clicada', async () => {
      const numbers = wrapper.findAll('.numbers')
      await numbers.at(4).trigger('click')

      expect(wrapper.vm.formNPS.rating).toBe(5)
      expect(wrapper.vm.isTextareaDisabled).toBe(false)
    })

    it('deve desselecionar nota quando clicada novamente', async () => {
      wrapper.vm.formNPS.rating = 7
      wrapper.vm.isTextareaDisabled = false

      const numbers = wrapper.findAll('.numbers')
      await numbers.at(6).trigger('click')

      expect(wrapper.vm.formNPS.rating).toBeNull()
      expect(wrapper.vm.isTextareaDisabled).toBe(true)
    })

    it('deve limpar comentário ao desselecionar nota', async () => {
      wrapper.vm.formNPS.rating = 8
      wrapper.vm.formNPS.comment = 'Ótimo serviço'

      const numbers = wrapper.findAll('.numbers')
      await numbers.at(7).trigger('click')

      expect(wrapper.vm.formNPS.comment).toBe('')
    })

    it('deve habilitar textarea após selecionar nota', async () => {
      wrapper.vm.chooseGrade(6)
      await wrapper.vm.$nextTick()

      expect(wrapper.vm.isTextareaDisabled).toBe(false)
    })
  })

  describe('Computed: hasSelectedRating', () => {
    it('deve retornar falsy quando nenhuma nota está selecionada', () => {
      wrapper.vm.formNPS.rating = null
      expect(wrapper.vm.hasSelectedRating).toBeFalsy()
    })

    it('deve retornar truthy quando uma nota está selecionada', () => {
      wrapper.vm.formNPS.rating = 5
      expect(wrapper.vm.hasSelectedRating).toBeTruthy()
    })
  })

  describe('Botão Enviar', () => {
    it('deve estar desabilitado quando nenhuma nota está selecionada', () => {
      const submitButton = wrapper.findAll('button').at(1)
      expect(submitButton.attributes('disabled')).toBe('disabled')
    })

    it('deve estar habilitado quando uma nota está selecionada', async () => {
      wrapper.vm.formNPS.rating = 9
      await wrapper.vm.$nextTick()

      const submitButton = wrapper.findAll('button').at(1)
      expect(submitButton.attributes('disabled')).toBeUndefined()
    })
  })

  describe('submitFormNPS - Submissão com sucesso', () => {
    beforeEach(() => {
      postNps.mockResolvedValue({ status: 200, data: {} })
      wrapper.vm.formNPS.rating = 8
      wrapper.vm.formNPS.comment = 'Muito bom!'
    })

    it('deve chamar postNps com dados corretos ao submeter', async () => {
      await wrapper.vm.submitFormNPS('submit')

      expect(postNps).toHaveBeenCalledWith([
        {
          id: 1,
          rating: 8,
          comment: 'Muito bom!',
        },
      ])
    })

    it('deve desabilitar botões durante submissão', async () => {
      const submitPromise = wrapper.vm.submitFormNPS('submit')

      expect(wrapper.vm.disabledButton).toBe(true)
      expect(wrapper.vm.loadingSubmitNPS).toBe(true)

      await submitPromise
    })

    it('deve exibir toast de sucesso após submissão', async () => {
      await wrapper.vm.submitFormNPS('submit')

      expect(mockToast).toHaveBeenCalledWith(
        expect.objectContaining({
          props: expect.objectContaining({
            text: 'Obrigado pela sua avaliação',
            variant: 'success',
            icon: 'CheckCircleIcon',
          }),
        }),
      )
    })

    it('deve emitir evento close após submissão bem-sucedida', async () => {
      await wrapper.vm.submitFormNPS('submit')

      expect(wrapper.emitted().close).toBeTruthy()
      expect(wrapper.emitted().close[0]).toEqual([0])
    })

    it('deve reabilitar botões após submissão', async () => {
      await wrapper.vm.submitFormNPS('submit')

      expect(wrapper.vm.disabledButton).toBe(false)
      expect(wrapper.vm.loadingSubmitNPS).toBe(false)
    })
  })

  describe('submitFormNPS - Tratamento de Erro', () => {
    beforeEach(() => {
      postNps.mockRejectedValue(new Error('Network error'))
      wrapper.vm.formNPS.rating = 7
    })

    it('deve exibir toast de erro quando submissão falha', async () => {
      await wrapper.vm.submitFormNPS('submit')

      await new Promise(resolve => setTimeout(resolve, 0))

      expect(mockToast).toHaveBeenCalledWith(
        expect.objectContaining({
          props: expect.objectContaining({
            title: 'Atenção',
            text: 'Erro ao enviar avaliação',
            variant: 'danger',
            icon: 'AlertTriangleIcon',
          }),
        }),
      )
    })

    it('deve reabilitar botões após erro', async () => {
      await wrapper.vm.submitFormNPS('submit')

      await new Promise(resolve => setTimeout(resolve, 0))

      expect(wrapper.vm.disabledButton).toBe(false)
      expect(wrapper.vm.loadingSubmitNPS).toBe(false)
    })

    it('não deve emitir evento close quando há erro', async () => {
      await wrapper.vm.submitFormNPS('submit')

      expect(wrapper.emitted().close).toBeFalsy()
    })
  })

  describe('submitFormNPS - Botão "Não aparecer novamente"', () => {
    beforeEach(() => {
      postNps.mockResolvedValue({ status: 200, data: {} })
    })

    it('deve ativar loading específico do botão dontShowAgain', async () => {
      const submitPromise = wrapper.vm.submitFormNPS('dontShowAgain')

      expect(wrapper.vm.loadingDontShowAgainNPS).toBe(true)
      expect(wrapper.vm.loadingSubmitNPS).toBe(false)

      await submitPromise
    })

    it('deve enviar formNPS mesmo sem rating ao clicar em dontShowAgain', async () => {
      wrapper.vm.formNPS.rating = null

      await wrapper.vm.submitFormNPS('dontShowAgain')

      expect(postNps).toHaveBeenCalledWith([
        expect.objectContaining({
          id: 1,
          rating: null,
        }),
      ])
    })

    it('não deve exibir toast de sucesso ao usar dontShowAgain', async () => {
      await wrapper.vm.submitFormNPS('dontShowAgain')

      expect(mockToast).not.toHaveBeenCalled()
    })

    it('deve emitir evento close após dontShowAgain bem-sucedido', async () => {
      await wrapper.vm.submitFormNPS('dontShowAgain')

      expect(wrapper.emitted().close).toBeTruthy()
    })

    it('deve desativar loading após erro em dontShowAgain', async () => {
      postNps.mockRejectedValue(new Error('Error'))

      await wrapper.vm.submitFormNPS('dontShowAgain')

      await new Promise(resolve => setTimeout(resolve, 0))

      expect(wrapper.vm.loadingDontShowAgainNPS).toBe(false)
    })
  })

  describe('showLater - Responder Depois', () => {
    it('deve emitir evento close ao clicar em "Responder depois"', () => {
      wrapper.vm.showLater(1)

      expect(wrapper.emitted().close).toBeTruthy()
      expect(wrapper.emitted().close[0]).toEqual([0])
    })

    it('deve chamar showLater ao clicar no botão "Responder depois"', async () => {
      const spy = jest.spyOn(wrapper.vm, 'showLater')

      // Encontrar o botão "Responder depois" (terceiro botão)
      const buttons = wrapper.findAll('button')
      const responderDepoisButton = buttons
        .filter(btn => btn.text().includes('Responder depois'))
        .at(0)

      await responderDepoisButton.trigger('click')

      expect(spy).toHaveBeenCalledWith(1)
      expect(wrapper.emitted().close).toBeTruthy()
    })
  })

  describe('closeNPS', () => {
    it('deve emitir evento close com index correto', () => {
      wrapper.vm.closeNPS()

      expect(wrapper.emitted().close).toBeTruthy()
      expect(wrapper.emitted().close[0]).toEqual([0])
    })
  })
})
