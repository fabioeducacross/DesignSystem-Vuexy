<template>
  <b-card>
    <b-row align-v="center">
      <b-col cols="12" md="3">
        <b-button v-if="backFunc" variant="link" class="p-0" @click="redirectBack">
          <div class="d-flex align-items-center">
            <span class="material-symbols-outlined">chevron_left</span>
            <span class="underline">Voltar</span>
          </div>
        </b-button>
      </b-col>
      <b-col cols="12" md="6">
        <div class="text-center">
          <span class="h4 m-0 text-primary">
            <span class="font-bold">{{ title }}</span>
          </span>
        </div>
      </b-col>
      <b-col cols="12" md="3">
        <div class="text-right">
          <slot></slot>
        </div>
      </b-col>
    </b-row>
  </b-card>
</template>

<script setup>
const props = defineProps({
  backFunc: {
    type: [Function, null],
    required: false,
  },
  title: {
    type: String,
    default: 'Análise das Fases da Escrita',
  },
})

const redirectBack = () => {
  if (props.backFunc) {
    props.backFunc()
  }
}
</script>

<style lang="scss" scoped></style>