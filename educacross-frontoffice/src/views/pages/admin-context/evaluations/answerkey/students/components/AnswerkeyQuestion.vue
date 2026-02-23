<template>
  <b-tr v-if="value">
    <b-td style="width: 140px">
      <div
        class="d-flex align-items-center gap-2 rounded p-50"
        :class="`bg-light-${subject ? subject.variant : ''}`"
      >
        <Subjects v-if="subjectId" :key="subjectId" :subject-id="subjectId" :size="24" />
        <span class="text-body">
          {{ formatAlternativeIndex(questionIndex) }}
        </span>
      </div>
    </b-td>
    <b-td>
      <b-form-group
        v-slot="{ ariaDescribedby }"
        v-b-tooltip:hover.top="
          value.answerKey === EAnswerKey.EvaluationDigital ? 'Os dados não podem ser alterados' : ''
        "
        class="mb-0"
      >
        <b-form-radio-group
          v-model="selectedAlternative"
          :aria-describedby="ariaDescribedby"
          :name="`radio-group-${uid}-${value?.id || questionIndex}-${uniqueSuffix}`"
          class="d-flex justify-content-between"
          :disabled="disabled || value.answerKey === EAnswerKey.EvaluationDigital"
        >
          <b-form-radio
            :disabled="disabled || value.answerKey === EAnswerKey.EvaluationDigital"
            :value="1"
          >
            A
          </b-form-radio>
          <b-form-radio
            :disabled="disabled || value.answerKey === EAnswerKey.EvaluationDigital"
            :value="2"
          >
            B
          </b-form-radio>
          <b-form-radio
            :disabled="disabled || value.answerKey === EAnswerKey.EvaluationDigital"
            :value="3"
          >
            C
          </b-form-radio>
          <b-form-radio
            :disabled="disabled || value.answerKey === EAnswerKey.EvaluationDigital"
            :value="4"
          >
            D
          </b-form-radio>
          <b-form-radio
            :disabled="disabled || value.answerKey === EAnswerKey.EvaluationDigital"
            :value="0"
          >
            N/A
          </b-form-radio>
        </b-form-radio-group>
      </b-form-group>
    </b-td>
  </b-tr>
</template>

<script setup>
import Subjects from '@/components/subjects/subjects.vue'
import { SubjectEnum } from '@/consts/SubjectEnum.js'
import { EAnswerKey } from '@/consts/evaluationsEnum'
import { getCurrentInstance, computed } from 'vue'
import { v4 as uuidv4 } from 'uuid'

// Props
const props = defineProps({
  value: {
    type: Object,
  },
  subjectId: {},
  disabled: {
    type: Boolean,
    required: true,
  },
  questionIndex: {
    type: Number,
    default: 1,
  },
})

// Emits
const emit = defineEmits(['input'])

const uid = getCurrentInstance().uid
const uniqueSuffix = uuidv4()

const subject = computed(() => SubjectEnum[props.subjectId] || {})

const selectedAlternative = computed({
  get: () => (props.value?.alternative != null ? Number(props.value.alternative) : null),
  set: val => {
    emit('input', {
      ...props.value,
      alternative: typeof val === 'string' ? parseInt(val, 10) : Number(val),
    })
  },
})

function formatAlternativeIndex(value) {
  return value < 10 ? `0${value}` : value
}
</script>