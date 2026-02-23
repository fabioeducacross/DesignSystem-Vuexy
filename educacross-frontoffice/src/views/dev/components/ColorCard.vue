<template>
  <div class="color-card">
    <div
      class="color-preview"
      :style="{
        backgroundColor: value,
        color: isLight ? '#000' : '#fff',
      }"
      @click="copyColor"
    >
      <span class="color-value">{{ value }}</span>
    </div>
    <div class="color-info">
      <div class="color-name">{{ displayName }}</div>
      <div class="color-variables">
        <small class="text-muted d-block variable-name" @click="copyCSSVar">
          {{ cssVarName }}
        </small>
        <small class="text-muted d-block variable-name" @click="copySCSSVar">
          {{ scssVarName }}
        </small>
      </div>
    </div>
  </div>
</template>

<script setup>
  // ⚠️ PRESERVE ORIGINAL IMPORTS EXACTLY
  // (No imports present in original file)

  // Props
  const props = defineProps({
    name: {
      type: String,
      required: true,
    },
    value: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      default: 'default',
    },
  })

  // Computed
  import { computed } from 'vue'

  const isLight = computed(() => {
    const hex = props.value.replace('#', '')
    const r = parseInt(hex.substr(0, 2), 16)
    const g = parseInt(hex.substr(2, 2), 16)
    const b = parseInt(hex.substr(4, 2), 16)
    const brightness = (r * 299 + g * 587 + b * 114) / 1000
    return brightness > 155
  })

  const displayName = computed(() => {
    return props.name
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, str => str.toUpperCase())
      .trim()
  })

  const cssVarName = computed(() =>
    `--whitelabel-${props.name.replace(/([A-Z])/g, '-$1').toLowerCase()}`
  )

  const scssVarName = computed(() =>
    `${props.name.replace(/([A-Z])/g, '-$1').toLowerCase()}`
  )

  // Methods
  const copyColor = () => {
    navigator.clipboard.writeText(props.value)
    // @toast: global injection, Vue 2.7 pattern
    // eslint-disable-next-line vue/no-global-api
    // $toast usage as before
    // We can access via globalProperties or assume it's available as this.$toast in setup as $toast
    // Vue 2.7 doesn't support inject(): just use global instance as in Options API
    // So, use window.$toast if available, else this.$toast via legacy context
    // Since rules require direct conversion and likely $toast is accessible in global context

    if (typeof window !== 'undefined' && window.$toast) {
      window.$toast.success(`Copied ${props.value}`)
    } else if (typeof $toast !== 'undefined') {
      $toast.success(`Copied ${props.value}`)
    }
  }

  const copyCSSVar = () => {
    navigator.clipboard.writeText(cssVarName.value)
    if (typeof window !== 'undefined' && window.$toast) {
      window.$toast.success(`Copied ${cssVarName.value}`)
    } else if (typeof $toast !== 'undefined') {
      $toast.success(`Copied ${cssVarName.value}`)
    }
  }

  const copySCSSVar = () => {
    navigator.clipboard.writeText(scssVarName.value)
    if (typeof window !== 'undefined' && window.$toast) {
      window.$toast.success(`Copied ${scssVarName.value}`)
    } else if (typeof $toast !== 'undefined') {
      $toast.success(`Copied ${scssVarName.value}`)
    }
  }
</script>

<style lang="scss" scoped>
  .color-card {
    border: 1px solid #dee2e6;
    border-radius: 8px;
    overflow: hidden;
    transition: transform 0.2s, box-shadow 0.2s;
    background: white;

    &:hover {
      transform: translateY(-4px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    }

    .color-preview {
      height: 120px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      position: relative;
      transition: opacity 0.2s;

      &:hover {
        opacity: 0.9;
      }

      .color-value {
        font-weight: 600;
        font-size: 1.1rem;
        text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
        letter-spacing: 0.5px;
      }
    }

    .color-info {
      padding: 1rem;

      .color-name {
        font-weight: 600;
        font-size: 1rem;
        color: #2c2c2c;
        margin-bottom: 0.5rem;
      }

      .color-variables {
        .variable-name {
          font-family: 'Courier New', monospace;
          font-size: 0.85rem;
          padding: 2px 0;
          transition: color 0.2s;
          cursor: pointer;

          &:hover {
            color: #007bff !important;
            text-decoration: underline;
          }
        }
      }
    }
  }
</style>