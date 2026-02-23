<template>
  <div>
    <b-skeleton-wrapper :loading="isLoading">
      <template v-slot:loading>
        <b-skeleton type="text" class="w-100" height="70px" />
        <b-skeleton type="text" class="w-100" height="70px" />
        <b-skeleton type="text" class="w-100" height="70px" />
        <b-skeleton type="text" class="w-100" height="70px" />
        <b-skeleton type="text" class="w-100" height="70px" />
      </template>
    </b-skeleton-wrapper>
    <b-card
      v-for="module in data"
      :key="module.moduleId"
      :bg-variant="module.enabled ? 'light-primary' : ''"
      class="mb-1"
    >
      <b-row>
        <b-col cols="12" md="6">
          <div>
            <span class="text-body">{{ module.moduleName }}</span>
            <!-- <span
              v-b-tooltip.hover.top="'Teste'"
              class="material-symbols-outlined cursor-pointer align-middle ml-50"
              style="font-size: 16px"
            >
              info
            </span> -->
          </div>
        </b-col>
        <b-col cols="12" md="6">
          <div>
            <div class="d-flex align-items-center justify-content-end">
              <b-form-checkbox
                v-model="module.enabled"
                class="custom-control-primary"
                name="check-button"
                switch
                @change="onCheckboxChange(module)"
              >
                <span class="switch-icon-left">
                  <span class="material-symbols-outlined align-middle" style="font-size: 16px">
                    done
                  </span>
                </span>
                <span class="switch-icon-right">
                  <span
                    class="material-symbols-outlined align-middle text-secondary"
                    style="font-size: 16px"
                  >
                    close
                  </span>
                </span>
              </b-form-checkbox>
              <span>{{ module.enabled ? 'Habilitado' : 'Desabilitado' }}</span>
            </div>
          </div>
        </b-col>
      </b-row>
    </b-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  data: {
    type: Array,
  },
  isLoading: {
    type: Boolean,
  },
})

const emit = defineEmits(['enableModule'])

const checked = ref(null)
const onCheckboxChange = (module) => {
  emit('enableModule', module)
}
</script>