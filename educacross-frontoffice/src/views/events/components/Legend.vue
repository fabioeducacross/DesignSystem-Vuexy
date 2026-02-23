<template>
  <div>
    <b-card-group deck>
      <b-card
        header-class="d-flex justify-content-start justify-content-md-center"
        no-body
        header-tag="header"
        footer-tag="footer"
      >
        <template v-slot:header>
          <div class="text-sm">
            <ul class="d-md-flex justify-content-sm-center gap-2 mb-0">
              <li v-for="(item, index) of LegendStatusEnum" :key="index">
                <div class="d-flex align-items-center gap-2">
                  <SemaphoreStatus :status-enum="item" />
                  <span>{{ item.label }}</span>
                </div>
              </li>
            </ul>
          </div>
        </template>
        <template v-slot:footer>
          <span class="text-sm">
            ¹ A cor verde foi ancorada na Meta 3 do Todos Pela Educação, de que 70% dos alunos
            deveriam apresentar aprendizado adequado e a cor amarela de que ainda se está um pouco
            abaixo desse percentual. Já a cor laranja, na visão de que é insucesso se menos de 50%
            dos alunos demonstra aprendizado adequado. Por fim, a cor vermelha ilustra que a grande
            maioria dos alunos não apresenta um bom nível de aprendizagem. Fonte: Saeb, INEP
          </span>
        </template>
      </b-card>
    </b-card-group>
  </div>
</template>

<script setup>
import { LegendStatusEnum } from '@/consts/StatusEnums.js'
import SemaphoreStatus from '@/views/pages/admin-context/shared/table-columns-components/SemaphoreStatus.vue'
</script>