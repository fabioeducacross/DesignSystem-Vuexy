<template>
  <b-dropdown
    id="dropdown-button-subject-parent"
    text="Primary"
    variant="outline-secondary"
    no-caret
    block
    menu-class="w-100 mt-0"
    :disabled="loading"
  >
    <template #button-content>
      <div class="select-subject-wrapper">
        <div v-if="loading">
          <b-spinner small />
        </div>
        <span v-else-if="!data.length" class="font-normal text-body">
          {{ emptyText }}
        </span>
        <span v-else class="font-normal text-body">
          {{ selected ? selected.name : emptyText }}
          {{ selectedChildren ? ` - ${selectedChildren.name}` : '' }}
        </span>
        <span class="material-symbols-outlined text-body" style="font-size: 20px">
          expand_more
        </span>
      </div>
    </template>

    <b-dropdown-item
      v-for="(item, index) in data"
      :key="`${item.name}-${index}`"
      link-class="position-relative p-0"
    >
      <div
        class="dropdown-item"
        @mouseover="hoveredModule = item"
        @mouseleave="hoveredModule = null"
      >
        <div class="w-100 d-flex" @click="setSelected(item)">
          <span class="flex-grow-1">{{ item.name }}</span>
          <span
            v-if="item.details"
            class="material-symbols-outlined text-body"
            style="font-size: 20px"
          >
            chevron_right
          </span>
        </div>
        <div v-if="hoveredModule === item" class="sub-items">
          <b-dropdown-item
            v-for="(subItem, subIdx) in item.details"
            :key="`${subItem.name}-${subIdx}`"
            @click.stop="setSelected(item, subItem)"
          >
            {{ subItem.name }}
          </b-dropdown-item>
        </div>
      </div>
    </b-dropdown-item>
  </b-dropdown>
</template>

<script setup>
import { ref } from 'vue'

// Props
const props = defineProps({
  loading: {
    type: Boolean,
    default: false,
  },
  data: {
    type: Array,
    default: () => [],
  },
  selected: {},
  selectedChildren: {},
  emptyText: {
    type: String,
    default: 'Sem Opções',
  },
})

// Emits
const emit = defineEmits(['change'])

// State
const hoveredModule = ref(null)

// Methods
const setSelected = (item, subItem = null) => {
  emit('change', item, subItem)
}
</script>

<style lang="scss" scoped>
.sub-items {
  position: absolute;
  background: white;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  // padding: 8px;
  z-index: 10;
  left: 100%;
  top: 0;
}
.select-subject-wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px;
}
</style>