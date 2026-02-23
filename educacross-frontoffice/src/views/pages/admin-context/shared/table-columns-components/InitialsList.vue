<template>
  <div>
    <span>
      <div class="className">
        <initials v-if="content.teachers.length >= 1" :content="content.teachers[0]" color="red" />
        <initials
          v-if="content.teachers.length >= 2"
          :content="content.teachers[1]"
          color="purple"
        />
        <initials
          v-if="content.teachers.length >= 3"
          :content="content.teachers[2]"
          color="yellow"
        />

        <span
          v-if="content.teachers.length > 3"
          :id="content.id"
          class="text-primary bg-st-primary text-nowrap"
          :name="content.id"
        >
          Mais {{ content.teachers.length - 3 }}
        </span>
      </div>

      <b-tooltip :target="content.id.toString()" placement="bottom">
        <div
          v-for="(eTeacher, eTeacherIndex) in content.teachers.slice(3)"
          :key="eTeacherIndex"
          class="text-left px-4"
        >
          {{ eTeacher.name }}
        </div>
      </b-tooltip>
    </span>
  </div>
</template>

<script setup>
import Initials from '@/views/pages/admin-context/shared/table-columns-components/Initials.vue'
import { BTooltip } from 'bootstrap-vue'

const props = defineProps({
  content: {
    type: Object,
    required: true,
  },
})
</script>

<style lang="scss" scoped>
  @import '@/assets/scss/variables/_variables.scss';

  .className {
    display: flex;
    padding-right: 1rem;
  }

  span.text-primary {
    display: flex;
    font-weight: bold;
    font-size: 0.9rem;
    align-self: center;
    padding: 1px 9px;
    border-radius: 17px;
  }
</style>