<template>
  <div class="w-100 d-flex flex-start flex-column" style="min-width: 90px">
    <span v-if="content.guideName">{{ content.guideName }}</span>
    <div class="d-flex flex-no-wrap row-icons gap-1">
      <img
        v-if="content.subject === 'LigaDasCorujinhas'"
        v-b-tooltip.hover.bottom="'Liga das Corujinhas'"
        src="@/assets/icons/mission-icons/missao-liga.svg"
      />
      <img
        v-if="content.subject === 'Math'"
        v-b-tooltip.hover.bottom="'Matemática'"
        src="@/assets/icons/mission-icons/missao-math.svg"
      />
      <img
        v-if="content.subject === 'Portuguese'"
        v-b-tooltip.hover.bottom="'Língua Portuguesa'"
        src="@/assets/icons/mission-icons/missao-portugues.svg"
      />
      <div>
        <img
          v-if="content.type === 'Collective'"
          v-b-tooltip.hover.bottom="'Missão coletiva'"
          src="@/assets/icons/mission-icons/missao-coletiva.svg"
        />
        <img
          v-if="content.type === 'Individual'"
          v-b-tooltip.hover.bottom="'Missão individual'"
          src="@/assets/icons/mission-icons/missao-individual.svg"
        />
        <img
          v-if="content.type === 'Mixed'"
          v-b-tooltip.hover.bottom="'Missão mista'"
          src="@/assets/icons/mission-icons/missao-mista.svg"
        />
      </div>
      <div>
        <img
          v-if="applicationTypeEnum[content.application]"
          v-b-tooltip.hover.bottom="applicationTypeEnum[content.application].label"
          :src="applicationTypeEnum[content.application].img"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
  import { applicationTypeEnum } from '@/consts/missionsEnum.js'

  // Props
  const props = defineProps({
    content: {
      type: Object,
      default: () => {},
    },
  })

  // Expose applicationTypeEnum for template access
</script>

<style lang="scss" scoped>
  span {
    margin-bottom: 6px;
    color: #6e6b7b;
  }

  .row-icons {
    img {
      height: 24px;
      width: 24px;
    }
  }

  // img {
  //   margin-right: 6px;
  // }
</style>