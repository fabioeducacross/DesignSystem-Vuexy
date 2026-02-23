<template>
  <b-card>
    <b-row>
      <b-col cols="auto" md class="mb-1 mb-md-0">
        <div class="w-100 d-flex flex-md-row flex-col justify-content-center gap-2">
          <span>Escolha a forma de exibição:</span>
          <div class="d-flex align-items-center">
            <b-form-radio v-model="viewMode" name="viewMode" :value="0" class="radio-inline">
              <span class="text-body">Por habilidade</span>
            </b-form-radio>
          </div>
          <div class="d-flex align-items-center">
            <b-form-radio v-model="viewMode" name="viewMode" :value="1" class="radio-inline">
              <span class="text-body">Por tópico de conteúdo</span>
            </b-form-radio>
          </div>
        </div>
      </b-col>
    </b-row>
  </b-card>
</template>

<script setup>
import { useEducationSystemBookReportNetworkManager } from '@/views/pages/admin-context/network-manager/education-system/books/book/hability/useEducationSystemBookReportNetwork.js'
import { ref, watch } from 'vue'

const { exhibition, loading } = useEducationSystemBookReportNetworkManager()
const viewMode = ref(exhibition.value)

watch(
  [viewMode],
  () => {
    loading.value = true
    exhibition.value = viewMode.value
  },
  { immediate: true },
)
</script>

<style lang="scss" scoped></style>