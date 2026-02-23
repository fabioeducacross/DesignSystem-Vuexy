<template>
  <AppLanguageSelector
    v-if="$can(ACTION.READ, PERMISSION.GENERAL.IDIOM)"
    ref="refLangSelector"
    :value="content.idiomId"
    @input="changeLanguage"
  />
</template>

<script setup>
import AppLanguageSelector from '@/components/app-language-selector/AppLanguageSelector.vue'
import { ACTION, PERMISSION } from '@/consts/permissions.js'
import { ref } from 'vue'

// Props
const props = defineProps({
  content: {
    type: Object,
    default: () => {},
  },
})

// Emits
const emit = defineEmits(['action'])

// Refs
const refLangSelector = ref(null)

// Methods
const changeLanguage = newLangId => {
  emit('action', newLangId, props.content, refLangSelector.value)
}
</script>