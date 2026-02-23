<template>
  <b-overlay v-if="$can(ACTION.READ, PERMISSION.GENERAL.IDIOM)" :show.sync="loading">
    <b-dropdown variant="flat-primary" toggle-class=" p-0" no-caret size="sm">
      <template #button-content>
        <div class="flag-container">
          <b-img
            v-for="(lang, index) in appLanguagesEnum"
            v-show="isSelected(lang.id)"
            :key="index"
            :src="lang.img"
            class="country-flag"
          />
        </div>
      </template>
      <b-dropdown-item
        v-for="(lang, index) in appLanguagesEnum"
        v-show="$can(ACTION.READ, PERMISSION.GENERAL[lang.permission])"
        :key="index"
        @click="selectLanguage(lang.id)"
      >
        <b-img :src="lang.img" class="country-flag-option fixed-size" />
        <span>{{ lang.name }}</span>
      </b-dropdown-item>
    </b-dropdown>
  </b-overlay>
</template>

<script setup>
import appLanguagesEnum from '@/consts/appLanguagesEnum'
import { PERMISSION, ACTION } from '@/consts/permissions'
import { ref, watch } from 'vue'

// Props
const props = defineProps({
  value: {
    type: [Number, null],
    default: null,
  },
})

// Emits
const emit = defineEmits(['input'])

// State
const selectedLanguage = ref(null)
const loading = ref(false)

// Methods
const selectLanguage = id => {
  selectedLanguage.value = id
  emit('input', id)
}

const isSelected = id => {
  return selectedLanguage.value === id
}

// Watchers
watch(
  () => props.value,
  newValue => {
    selectedLanguage.value = newValue
  },
  { immediate: true },
)
</script>

<style lang="scss" scoped>
.flag-container {
  height: 24px;
  width: 24px;
}

.country-flag {
  height: 24px;
}

.country-flag-option {
  margin-right: 10px;
  height: 24px;
  display: inline-block;
}
</style>