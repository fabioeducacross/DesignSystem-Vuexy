<template>
  <v-select
    :options="data"
    :label="label"
    :filterable="false"
    :calculate-position="withPopper"
    :clear-search-on-blur="() => false"
    :close-on-select="closeOnSelect"
    :disabled="disabled"
    :multiple="multiple"
    :placeholder="placeholder"
    :reduce="reduce"
    :clearable="clearable"
    :value="value"
    @search="query => (params.name = query)"
    @input="handleInput"
  >
    <template #spinner>
      <b-spinner v-show="loading" small variant="secondary" />
    </template>
    <template #no-options> Nenhum dado encontrado </template>
    <template v-if="isClass" #selected-option="{ name, serieName }">
      <span class="d-flex class-badge">
        {{ name }}
        <SchoolYearBadge v-if="serieName" class="ml-1" :text="serieName" />
      </span>
    </template>
    <template v-if="isClass" #option="{ name, serieName, id }">
      <span class="d-flex">
        <span style="margin-top: 1px">{{ name }}</span>
        <SchoolYearBadge
          v-if="serieName"
          :text="serieName"
          :selected="value ? value.id === id : false"
          class="ml-1"
        />
      </span>
    </template>
    <template #list-footer>
      <li v-show="hasNextPage" ref="loader" v-b-visible="infiniteScroll" class="loader">
        Carregando mais opções...
      </li>
    </template>
  </v-select>
</template>

<script setup>
import { ref, computed, onMounted, watch, nextTick } from 'vue'
import SchoolYearBadge from '@/layouts/components/SchoolYearBadge'
import { SSelectInfinityScroll } from '@/services/shared/selectInfinityScroll/selectInfinityScroll.service'
import Toast from '@/views/pages/admin-context/shared/components/toast/Toast'
import { createPopper } from '@popperjs/core'
import debounce from 'lodash/debounce'
import vSelect from 'vue-select'

// Props
const props = defineProps({
  api: { type: String, required: true },
  fatherParams: {
    type: Object,
    default: () => ({}),
  },
  awaitFatherParams: { type: Boolean, default: false },
  label: { type: String, default: 'name' },
  multiple: { type: Boolean, default: false },
  placeholder: { type: String, default: 'Selecione uma opção' },
  reduce: { type: Function, default: undefined },
  clearable: { type: Boolean, default: false },
  value: { type: [Number, Array, String, Object], default: undefined },
  getOnCreated: { type: Boolean, default: false },
  selectFirst: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
  firstOption: { type: Object, default: undefined },
  closeOnSelect: { type: Boolean, default: false },
  isClass: { type: Boolean, default: false },
})

const emit = defineEmits([
  'input',
  'isReady',
  'noClasses'
])

const observer = ref(null)
const totalPages = ref(1)
const data = ref([])
const params = ref({
  pageSize: 15,
  page: 0,
  name: '',
})
const placement = ref('top')
const ul = ref(null)
const scrollTop = ref(0)
const loading = ref(false)

const loader = ref(null)

const hasNextPage = computed(() => params.value.page < totalPages.value)

const scrollToLastPosition = async () => {
  if (ul.value) {
    await nextTick()
    ul.value.scrollTop = scrollTop.value
  }
}

const handleInput = (e) => {
  emit('input', e)
}

const infiniteScroll = async (isVisible) => {
  if (isVisible) {
    ul.value = loader.value?.offsetParent
    scrollTop.value = loader.value?.offsetParent?.scrollTop || 0
    getOptions()
  }
}

const getOptions = async (page) => {
  if (isWaitingForFatherParams() && !hasFatherParams()) {
    return
  }

  setPageNumber(page)
  if (isFirstPage(page)) {
    resetData()
  }

  startLoading()

  try {
    const value = await fetchDataFromAPI()
    processFetchedData(value)
    emit('isReady', true)
  } catch (err) {
    handleFetchError(err)
    emit('isReady', true)
  } finally {
    stopLoading()
  }
}

const isWaitingForFatherParams = () => props.awaitFatherParams

const hasFatherParams = () => !!props.fatherParams && Object.keys(props.fatherParams).length > 0

const setPageNumber = (page) => {
  params.value.page = page || params.value.page + 1
}

const isFirstPage = (page) => page === 1

const resetData = () => {
  data.value = []
}

const startLoading = () => {
  loading.value = true
}

const stopLoading = () => {
  loading.value = false
}

const fetchDataFromAPI = () => {
  return SSelectInfinityScroll(props.api, { ...params.value, ...props.fatherParams })
}

const processFetchedData = (value) => {
  data.value.push(...value.data.data)
  scrollToLastPosition()
  totalPages.value = value.data.totalPages

  if (dataNotEmpty()) {
    processNonEmptyData()
  } else {
    emit('noClasses', true)
  }
}

const dataNotEmpty = () => data.value.length !== 0

const processNonEmptyData = () => {
  if (isFirstPage(params.value.page)) {
    checkForSerieName()
    prependFirstOption()
    selectFirstOptionIfNeeded()
    emit('noClasses', false)
  }
}

const checkForSerieName = () => {
  if (Array.isArray(data.value)) {
    Object.hasOwnProperty.call(data.value[0] || {}, 'serieName')
  } else if (typeof data.value === 'object' && data.value !== null) {
    Object.hasOwnProperty.call(data.value, 'serieName')
  }
}

const prependFirstOption = () => {
  if (props.firstOption && typeof props.firstOption === 'object') {
    data.value.unshift(props.firstOption)
  }
}

const selectFirstOptionIfNeeded = () => {
  if (props.selectFirst) {
    handleInput(data.value[0])
  }
}

const handleFetchError = (err) => {
  if (err.status !== 401 && typeof window !== 'undefined' && window.Vue && window.Vue.prototype.$toast) {
    window.Vue.prototype.$toast({
      component: Toast,
      props: {
        text: err.message,
        icon: 'AlertTriangleIcon',
        variant: 'danger',
      },
    })
  }
}

const withPopper = (dropdownList, component, { width }) => {
  dropdownList.style.width = width

  const popper = createPopper(component.$refs.toggle, dropdownList, {
    placement: placement.value,
    modifiers: [
      {
        name: 'offset',
        options: {
          offset: [0, -1],
        },
      },
      {
        name: 'toggleClass',
        enabled: true,
        phase: 'write',
        fn({ state }) {
          component.$el.classList.toggle('drop-up', state.placement === 'top')
        },
      },
    ],
  })
  return () => popper.destroy()
}

watch(() => params.value.name, debounce(() => {
  data.value = []
  getOptions(1)
}, 300))

watch(() => props.fatherParams, () => {
  emit('isReady', false)
  getOptions(1)
}, { deep: true })

onMounted(() => {
  if (props.getOnCreated) {
    getOptions()
  }
})
</script>

<style lang="scss" scoped>
.loader {
  text-align: center;
}
</style>