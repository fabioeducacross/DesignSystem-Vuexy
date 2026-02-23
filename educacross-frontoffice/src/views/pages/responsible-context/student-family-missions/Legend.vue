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
              <li v-for="(item, index) of familyMissionsLegendEnum" :key="index">
                <div class="d-flex align-items-center gap-2">
                  <SemaphoreStatus :status-enum="item" />
                  <span>{{ item.label }}</span>
                </div>
              </li>
            </ul>
          </div>
        </template>
      </b-card>
    </b-card-group>
  </div>
</template>

<script setup>
import familyMissionsLegendEnum from '@/consts/familyMissionsLegendEnum.js'
import SemaphoreStatus from '@/views/pages/admin-context/shared/table-columns-components/SemaphoreStatus.vue'
</script>