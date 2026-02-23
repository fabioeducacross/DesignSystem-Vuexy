<template>
  <div class="color-palette-page">
    <div class="page-header">
      <h1>🎨 Whitelabel Color Palette</h1>
      <p class="subtitle">Development Only - Color Reference Guide</p>

      <div class="current-whitelabel-badge">
        <span class="badge badge-primary badge-lg">
          Current Whitelabel: <strong>{{ currentWhitelabel }}</strong>
        </span>
      </div>
    </div>

    <!-- Whitelabel Selector -->
    <div class="whitelabel-selector card mb-4">
      <div class="card-body">
        <h5 class="card-title">Select Whitelabel to View</h5>
        <div class="btn-group btn-group-lg" role="group">
          <button
            v-for="label in whitelabels"
            :key="label"
            :class="['btn', selectedWhitelabel === label ? 'btn-primary' : 'btn-outline-primary']"
            @click="selectedWhitelabel = label"
          >
            {{ formatWhitelabelName(label) }}
          </button>
        </div>
      </div>
    </div>

    <!-- Color Categories -->
    <div v-if="colors" class="color-sections">
      <!-- Bootstrap/Theme Colors -->
      <section class="color-category card mb-4">
        <div class="card-header">
          <h3>Bootstrap & Theme Colors</h3>
          <p class="text-muted mb-0">Main theme colors used throughout the application</p>
        </div>
        <div class="card-body">
          <div class="color-grid">
            <ColorCard
              v-for="colorName in bootstrapColors"
              :key="colorName"
              :name="colorName"
              :value="colors[colorName]"
              :category="'bootstrap'"
            />
          </div>
        </div>
      </section>

      <!-- Subject Colors -->
      <section class="color-category card mb-4">
        <div class="card-header">
          <h3>Subject Colors</h3>
          <p class="text-muted mb-0">Colors for educational subjects</p>
        </div>
        <div class="card-body">
          <div class="color-grid">
            <ColorCard
              v-for="colorName in subjectColors"
              :key="colorName"
              :name="colorName"
              :value="colors[colorName]"
              :category="'subject'"
            />
          </div>
        </div>
      </section>

      <!-- Custom Color Patterns -->
      <section class="color-category card mb-4">
        <div class="card-header">
          <h3>Custom Color Patterns (1-19)</h3>
          <p class="text-muted mb-0">Legacy color system used throughout components</p>
        </div>
        <div class="card-body">
          <div class="color-grid">
            <ColorCard
              v-for="colorName in customColorPatterns"
              :key="colorName"
              :name="colorName"
              :value="colors[colorName]"
              :category="'custom'"
            />
          </div>
        </div>
      </section>

      <!-- Additional UI Colors -->
      <section class="color-category card mb-4">
        <div class="card-header">
          <h3>Additional UI Colors</h3>
          <p class="text-muted mb-0">Specialized colors for specific UI elements</p>
        </div>
        <div class="card-body">
          <div class="color-grid">
            <ColorCard
              v-for="colorName in additionalColors"
              :key="colorName"
              :name="colorName"
              :value="colors[colorName]"
              :category="'additional'"
            />
          </div>
        </div>
      </section>
    </div>

    <!-- Export Section -->
    <div class="export-section card">
      <div class="card-body">
        <h5 class="card-title">Export Colors</h5>
        <div class="btn-group">
          <button class="btn btn-outline-secondary" @click="copyAsJSON">📋 Copy as JSON</button>
          <button class="btn btn-outline-secondary" @click="copyAsSCSS">📋 Copy as SCSS</button>
          <button class="btn btn-outline-secondary" @click="copyAsCSS">
            📋 Copy as CSS Variables
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import ColorCard from './components/ColorCard.vue'
import whitelabelColors from '@/consts/whitelabelColors.config'

// Reactive state and props
import { ref, computed } from 'vue'

const whitelabels = Object.keys(whitelabelColors)
const selectedWhitelabel = ref(import.meta.env.VITE_APP_WHITELABEL || 'educacross')

const bootstrapColors = [
  'primary',
  'secondary',
  'success',
  'danger',
  'warning',
  'dark',
]
const subjectColors = [
  'math',
  'port',
  'liga',
  'mathIng',
]
const customColorPatterns = [
  'colorOne',
  'colorTwo',
  'colorThree',
  'colorFour',
  'colorFive',
  'colorSix',
  'colorSeven',
  'colorEight',
  'colorNine',
  'colorTen',
  'colorEleven',
  'colorTwelve',
  'colorThirteen',
  'colorFourteen',
  'colorFifteen',
  'colorSixteen',
  'colorSeventeen',
  'colorEighteen',
  'colorNineteen',
]
const additionalColors = [
  'colorGreen60',
  'colorGray40',
  'colorPurpleLdc',
  'colorGray100',
  'colorGrayTheme',
  'colorGrayThemeBodyText',
  'colorGrayThemeLight',
  'colorGrayMutedPlaceholder',
  'colorBlueBootstrap',
  'colorGaryThemelightBorder',
  'brandColorPrimaryMedium',
]

const currentWhitelabel = computed(() => import.meta.env.VITE_APP_WHITELABEL || 'educacross')
const colors = computed(() => whitelabelColors[selectedWhitelabel.value] || {})

function formatWhitelabelName(name) {
  const names = {
    educacross: 'Educacross',
    superensino: 'Super Ensino',
    seduc: 'Seduc (Hora da Matemática)',
    somosplay: 'Somos Play',
  }
  return names[name] || name
}

// $toast usage: get root instance
import { getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()

function copyAsJSON() {
  const json = JSON.stringify(colors.value, null, 2)
  navigator.clipboard.writeText(json)
  proxy.$toast.success('Colors copied as JSON')
}
function copyAsSCSS() {
  let scss = `// ${selectedWhitelabel.value} colors\n`
  Object.entries(colors.value).forEach(([key, value]) => {
    const scssVar = key.replace(/([A-Z])/g, '-$1').toLowerCase()
    scss += `${scssVar}: ${value};\n`
  })
  navigator.clipboard.writeText(scss)
  proxy.$toast.success('Colors copied as SCSS')
}
function copyAsCSS() {
  let css = `:root {\n`
  Object.entries(colors.value).forEach(([key, value]) => {
    const cssVar = key.replace(/([A-Z])/g, '-$1').toLowerCase()
    css += `  --whitelabel-${cssVar}: ${value};\n`
  })
  css += `}`
  navigator.clipboard.writeText(css)
  proxy.$toast.success('Colors copied as CSS Variables')
}
</script>

<style lang="scss" scoped>
  .color-palette-page {
    padding: 2rem;
    max-width: 1400px;
    margin: 0 auto;
    background: #f8f9fa;
    min-height: 100vh;
  }

  .page-header {
    text-align: center;
    margin-bottom: 2rem;

    h1 {
      font-size: 2.5rem;
      font-weight: 700;
      color: #2c2c2c;
      margin-bottom: 0.5rem;
    }

    .subtitle {
      font-size: 1.1rem;
      color: #6c757d;
      margin-bottom: 1rem;
    }

    .current-whitelabel-badge {
      margin-top: 1rem;

      .badge-lg {
        font-size: 1rem;
        padding: 0.75rem 1.5rem;
      }
    }
  }

  .whitelabel-selector {
    .btn-group {
      width: 100%;
      display: flex;

      .btn {
        flex: 1;
      }
    }
  }

  .color-category {
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

    .card-header {
      background: #fff;
      border-bottom: 2px solid #e9ecef;
      padding: 1.5rem;

      h3 {
        margin: 0 0 0.5rem 0;
        font-size: 1.5rem;
        font-weight: 600;
      }
    }
  }

  .color-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 1.5rem;
  }

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
        small {
          font-family: 'Courier New', monospace;
          font-size: 0.85rem;
          padding: 2px 0;
          transition: color 0.2s;

          &:hover {
            color: #007bff !important;
            text-decoration: underline;
          }
        }
      }
    }
  }

  .export-section {
    margin-top: 2rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

    .btn-group {
      display: flex;
      gap: 0.5rem;
      flex-wrap: wrap;
    }
  }

  @media (max-width: 768px) {
    .color-palette-page {
      padding: 1rem;
    }

    .color-grid {
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      gap: 1rem;
    }

    .whitelabel-selector .btn-group {
      flex-direction: column;
    }
  }
</style>