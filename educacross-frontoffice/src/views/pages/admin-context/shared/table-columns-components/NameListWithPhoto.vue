<template>
  <div>
    <span>
      <div class="className">
        <initialsRed
          v-if="content.teachers.length >= 1"
          v-b-tooltip.hover.bottom="content.teachers[0]"
          :name="content.teachers[0]"
        />

        <initialsBlue
          v-if="content.teachers.length >= 2"
          v-b-tooltip.hover.bottom="content.teachers[1]"
          :name="content.teachers[1]"
        />

        <initialsYellow
          v-if="content.teachers.length >= 3"
          v-b-tooltip.hover.bottom="content.teachers[2]"
          :name="content.teachers[2]"
        />

        <span
          v-if="content.teachers.length > 3"
          :id="content.id"
          class="text-primary bg-st-primary"
          :name="content.id"
        >
          Mais {{ content.teachers.length - 3 }}
        </span>

        <b-tooltip :target="content.id.toString()" placement="bottom">
          <div
            v-for="(eTeacher, eTeacherIndex) in content.teachers.slice(3)"
            :key="eTeacherIndex"
            class="text-left"
          >
            {{ eTeacher }}
          </div>
        </b-tooltip>
      </div>
    </span>
  </div>
</template>

<script setup>
  import InitialsBlue from '@/views/pages/admin-context/shared/table-columns-components/InitialsBlue.vue'
  import InitialsRed from '@/views/pages/admin-context/shared/table-columns-components/InitialsRed.vue'
  import InitialsYellow from '@/views/pages/admin-context/shared/table-columns-components/InitialsYellow.vue'
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