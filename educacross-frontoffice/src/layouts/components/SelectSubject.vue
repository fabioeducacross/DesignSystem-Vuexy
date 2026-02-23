<template>
  <div class="w-100">
    <b-form-group :label="showLabel ? $t(label) : ''" label-for="subject-dropdown">
      <b-dropdown
        v-if="!selectMode"
        id="subject-dropdown"
        v-b-tooltip="
          disabled ? `Alterar a área de conhecimento não está disponível nessa página` : $t(tooltip)
        "
        :disabled="disabled"
        class="p-0"
        no-caret
        size="sm"
        toggle-class="text-decoration-none"
        variant="flat-primary"
      >
        <template v-slot:button-content>
          <div class="dropdown-icon d-flex align-items-center justify-content-between gap-1 pr-50">
            <mission-math v-if="subject.id === 1" :height="height" :width="width" />
            <mission-port v-else-if="subject.id === 2" :height="height" :width="width" />
            <mission-liga v-else-if="subject.id === 3" :height="height" :width="width" />
            <mission-math-ing v-else-if="subject.id === 4" :height="height" :width="width" />
            <belinha-option-all v-else :height="height" :width="width" />
            <span class="material-symbols-outlined text-secondary"> keyboard_arrow_down </span>
          </div>
        </template>
        <b-dropdown-item
          v-for="subject in subjectsList"
          :key="subject.id"
          @click="changeSubject(subject)"
        >
          {{ getSubjectDetail(subject.id, 'label') }}
        </b-dropdown-item>
      </b-dropdown>

      <ESelect
        v-else
        :style="selectStyle"
        :value="subject"
        :options="subjectsList"
        style="min-width: 215px"
        @change="changeSubject"
      >
        <template v-slot:option="item">
          <div class="d-flex align-items-center gap-1">
            <mission-math v-if="item.id === 1" :height="26" :width="26" />
            <mission-port v-else-if="item.id === 2" :height="26" :width="26" />
            <mission-liga v-else-if="item.id === 3" :height="26" :width="26" />
            <mission-math-ing v-else-if="item.id === 4" :height="26" :width="26" />

            <span>{{ item.name }}</span>
          </div>
        </template>

        <template v-slot:selected-option="item">
          <div class="d-flex align-items-center gap-1">
            <mission-math v-if="item.id === 1" :height="26" :width="26" />
            <mission-port v-else-if="item.id === 2" :height="26" :width="26" />
            <mission-liga v-else-if="item.id === 3" :height="26" :width="26" />
            <mission-math-ing v-else-if="item.id === 4" :height="26" :width="26" />

            <span>{{ item.name }}</span>
          </div>
        </template>
      </ESelect>
    </b-form-group>
  </div>
</template>

<script setup>
import { computed, ref, onMounted, onUnmounted, watch } from 'vue'
import router from '@/router'
import BelinhaOptionAll from '@/assets/icons/mission-icons/BelinhaOptionAll.vue'
import MissionLiga from '@/assets/icons/mission-icons/MissionLiga.vue'
import MissionMath from '@/assets/icons/mission-icons/MissionMath.vue'
import MissionMathIng from '@/assets/icons/mission-icons/MissionMathIng.vue'
import MissionPort from '@/assets/icons/mission-icons/MissionPort.vue'
import ESelect from '@/components/selects/ESelect.vue'
import { SubjectEnum as SubjectEnumList } from '@/consts/SubjectEnum.js'
import { SubjectEnum } from '@/consts/teacher-context/enums/subjectEnum'
import useFilters from '@/store/filters/useFilters.js'

const route = router.currentRoute

const blockSubjectRegs = [
  /\/teacher\/[\w-]+\/[0-9]+\/reports\/[0-9]+/,
  /\/teacher\/[\w-]+\/[0-9]+\/missions\/[0-9]+/,
  /\/teacher\/reports\/missions/,
  /\/student-detail/,
  /\/activity-detail/,
  /\/teacher\/inclusion-mission/,
  /\/teacher\/custom-mission/,
  /\/teacher\/evaluations\/[0-9]+\/students/,
  /\/teacher\/event\/[0-9]+/,
  /\/teacher\/dashboard\/followup\/[0-9]+/,
  /\/teacher\/events\/[0-9]+\/individual-report/,
]

const props = defineProps({
  showLabel: { type: Boolean, default: true },
  label: { type: String, default: 'Área de conhecimento' },
  tooltip: { type: String, default: 'knowledgeArea' },
  optionAll: { type: Boolean, default: false },
  isDisabled: { type: Boolean, default: false },
  width: { type: Number, default: 36 },
  height: { type: Number, default: 36 },
  fetchOnMounted: { type: Boolean, default: true },
  selectMode: { type: Boolean, default: true },
  additionalModules: {
    type: Array,
    default: () => [],
    required: false,
  },
  fullWidth: {
    type: Boolean,
    default: false,
  },
})
const emit = defineEmits(['input'])

const { subjects, subject, classe, fetchSubjects, fetchSubjectsWithParams, getSubjectRequestParams } =
  useFilters()

const selectWidth = ref('auto')
const windowWidth = ref(typeof window !== 'undefined' ? window.innerWidth : 0)
const hasWindow = typeof window !== 'undefined'

const onResize = () => {
  if (!hasWindow) return
  windowWidth.value = window.innerWidth
}

onMounted(() => {
  if (hasWindow) {
    window.addEventListener('resize', onResize)
  }

  if (props.fetchOnMounted) {
    if (props.additionalModules.length > 0) {
      fetchSubjectsWithParams(getSubjectRequestParams(props.additionalModules))
      return
    }
    fetchSubjects()
  }
})

onUnmounted(() => {
  if (!hasWindow) return
  window.removeEventListener('resize', onResize)
})

const selectStyle = computed(() => {
  if (props.fullWidth) {
    return { width: '100%' }
  }

  if (windowWidth.value < 768) {
    return { width: '100%' }
  }

  return { width: selectWidth.value }
})

const path = computed(() => route.path)

const disabled = computed(() => {
  return props.isDisabled || blockSubjectRegs.some(regex => regex.test(path.value))
})

const getHighfiveSubjects = () => {
  return subjects.value.filter(item => {
    return item.Id !== SubjectEnum.math || item.Id !== SubjectEnum.mathEnglish
  })
}

const subjectsList = computed(() => {
  if (route.fullPath.includes('/highfive')) {
    return getHighfiveSubjects()
  }

  if (props.optionAll) {
    return [
      {
        id: null,
        name: 'Todas',
      },
      ...subjects.value,
    ]
  }
  return subjects.value
})

const classeId = computed(() => classe.value?.ClassId)

const setFirstOption = () => {
  const list = subjectsList.value
  if (!list?.length) return

  if (props.optionAll) {
    subject.value = list[0]
    return
  }

  const currentSubjectId = subject.value?.id

  if (currentSubjectId) {
    const lastSubjectValue = list.find(item => item.id === currentSubjectId)

    if (lastSubjectValue) {
      subject.value = lastSubjectValue
      return
    }
  }

  const firstSubjectValue = list[0]

  subject.value = firstSubjectValue || {}
}

watch(classeId, async () => {
  if (props.additionalModules.length > 0) {
    await fetchSubjectsWithParams(getSubjectRequestParams(props.additionalModules))
    return
  }
  await fetchSubjects()
})

watch(subjects, () => {
  setFirstOption()
})

const changeSubject = value => {
  subject.value = value
  emit('input', value)
}

const getSubjectDetail = (subjectId, subjectAtt) => {
  if (!subjectId && props.optionAll) return 'Todas'
  if (!subjectId) return ''
  return SubjectEnumList[subjectId]?.[subjectAtt] || ''
}
</script>

<style lang="scss">
  #subject-dropdown {
    .btn {
      padding: 0;
      border-color: #d8d6de;
      border-radius: 8px;
      background-color: #fff;
    }
  }
</style>

<style lang="scss" scoped>
  .select-subject-wrapper {
    color: #6e6b7b;
  }
</style>