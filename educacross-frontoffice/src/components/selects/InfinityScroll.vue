<template>
  <v-select
    :options="items"
    :filterable="false"
    :label="label"
    :value="value"
    :clearable="clearable"
    :reduce="reduce"
    :placeholder="placeholder"
    :searchable="isSearchable"
    @search="query => (search = query)"
    @input="val => emit('input', val)"
  >
    <template #no-options> Nenhuma opção foi encontrada. </template>
    <template #list-footer>
      <li
        v-if="hasNextPage"
        ref="loaderRef"
        v-b-visible="infiniteScroll"
        class="loader"
      >
        Carregando mais opções...
      </li>
    </template>
    <template #spinner="{ loading }">
      <b-spinner v-if="loading" variant="primary" small />
    </template>
    <template v-for="slotName in Object.keys($slots)" #[slotName]="slotScope">
      <slot :name="slotName" v-bind="slotScope" />
    </template>
  </v-select>
</template>

<script setup>
import { ref, computed, watch, onMounted, nextTick } from 'vue'
import vSelect from 'vue-select'
import { emitter } from '@/eventBus'

const props = defineProps({
  options: {
    type: [Array, Function],
    default: () => [],
  },
  totalPages: {
    type: Number,
    default: 1,
  },
  label: {
    type: String,
    default: 'name',
  },
  value: {
    type: [Object, String, Number, Array, Boolean, null],
    default: null,
  },
  clearable: {
    type: Boolean,
    default: false,
  },
  reduce: {
    type: Function,
    default: option => option,
  },
  // eslint-disable-next-line vue/prop-name-casing
  'first-option': {
    type: Object,
    default: null,
  },
  placeholder: {
    type: String,
    default: '',
  },
  isSearchable: {
    type: Boolean,
    default: true,
  },
})

const emit = defineEmits(['input', 'load'])

const observer = ref(null)
const search = ref('')
const page = ref(1)
const items = ref([])
const loaderRef = ref(null)

const hasNextPage = computed(() => page.value <= props.totalPages)

const insertFirstOption = () => {
  if (props['first-option']) {
    items.value.unshift(props['first-option'])
  }
}

const setItems = (newItems) => {
  items.value.push(...newItems)
}

const getItems = async () => {
  if (typeof props.options === 'function') {
    const ctx = { page: page.value, search: search.value, pageSize: 10 }
    await props.options(ctx, setItems)
    return items.value
  }
  setItems(props.options)
  return items.value
}

const infiniteScroll = async (isVisible) => {
  if (isVisible) {
    const loaderEl = loaderRef.value
    if (!loaderEl || !loaderEl.offsetParent) return

    const ul = loaderEl.offsetParent
    const { scrollTop } = ul

    emit('load')
    await getItems()

    page.value += 1

    await nextTick()
    ul.scrollTop = scrollTop
  }
}

const reset = () => {
  page.value = 1
  items.value = []
  emit('input', null)
  insertFirstOption()
}

// Sync search changes: whenever `search` is changed, reload items and reset page
watch(search, async () => {
  reset()
  await getItems()
  page.value += 1
})

// On mount: initialize items and page
onMounted(async () => {
  insertFirstOption()
  await getItems()
  page.value += 1
})
</script>

<style lang="scss" scoped>
.loader {
  text-align: center;
  color: #bbbbbb;
}
</style>