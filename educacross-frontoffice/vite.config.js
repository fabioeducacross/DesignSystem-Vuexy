import legacy from '@vitejs/plugin-legacy'
import vue from '@vitejs/plugin-vue2'
import { createRequire } from 'module'
import path from 'path'
import { defineConfig, loadEnv } from 'vite'

const nodeRequire = createRequire(import.meta.url)

const moduleSassImporter = url => {
  const cleanedUrl = url.replace(/^~+/, '')
  const strippedUrl = cleanedUrl.replace(/^(?:\.\.\/)+/, '')

  const libsMatch = strippedUrl.match(/^@core\/scss\/vue\/libs\/([^/]+)\/dist\/(.+)$/)
  if (libsMatch) {
    try {
      return { file: nodeRequire.resolve(`${libsMatch[1]}/dist/${libsMatch[2]}`) }
    } catch (error) {
      // fallback to default resolution below
    }
  }

  if (cleanedUrl.startsWith('.') || cleanedUrl.startsWith('/')) {
    return null
  }

  try {
    return { file: nodeRequire.resolve(cleanedUrl) }
  } catch (error) {
    return null
  }
}


// Plugin to fix incorrect path resolution for NotificationDropdown
const fixNotificationDropdownPath = () => {
  const correctPath = path.resolve(__dirname, './src/layouts/components/NotificationDropdown.vue')

  return {
    name: 'fix-notification-dropdown-path',
    enforce: 'pre',

    resolveId(source, importer) {
      // Fix any incorrect /teacher/NotificationDropdown.vue paths
      if (
        source === '/teacher/NotificationDropdown.vue' ||
        source.endsWith('/teacher/NotificationDropdown.vue') ||
        source.includes('teacher/NotificationDropdown')
      ) {
        return correctPath
      }
      return null
    },

    configureServer(server) {
      // Intercept requests for the bad path
      server.middlewares.use((req, res, next) => {
        if (req.url && req.url.includes('/teacher/NotificationDropdown.vue')) {
          req.url = '/src/layouts/components/NotificationDropdown.vue'
        }
        next()
      })
    },
  }
}

export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  const env = loadEnv(mode, process.cwd(), '')

  const whiteLabel = env.VITE_APP_WHITELABEL?.toLowerCase() || 'educacross'
  const validWhiteLabels = ['educacross', 'seduc', 'superensino', 'somosplay']
  const safeWhiteLabel = validWhiteLabels.includes(whiteLabel) ? whiteLabel : 'educacross'

  return {
    plugins: [
      fixNotificationDropdownPath(),
      vue({
        template: {
          transformAssetUrls: {
            img: 'src',
            image: 'xlink:href',
            'b-avatar': 'src',
            'b-img': 'src',
            'b-img-lazy': ['src', 'blank-src'],
            'b-card': 'img-src',
            'b-card-img': 'src',
            'b-card-img-lazy': ['src', 'blank-src'],
            'b-carousel-slide': 'img-src',
            'b-embed': 'src',
          },
        },
      }),
      legacy({
        targets: ['defaults', 'not IE 11'],
      }),
    ],

    resolve: {
      alias: {
        '~@': path.resolve(__dirname, './src'),
        '~@core': path.resolve(__dirname, './src/@core'),
        '@': path.resolve(__dirname, './src'),
        '@themeConfig': path.resolve(__dirname, './themeConfig.js'),
        '@core': path.resolve(__dirname, './src/@core'),
        '@validations': path.resolve(__dirname, './src/@core/utils/validations/validations.js'),
        '@axios': path.resolve(__dirname, './src/libs/axios'),
        '@components': path.resolve(__dirname, './src/layouts/components'),
        quill: path.resolve(__dirname, 'node_modules/quill'),
        // Vue 2.7 has built-in Composition API
        '@vue/composition-api': 'vue',
      },
      extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue'],
    },

    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@import "./src/assets/scss/whitelabel/${safeWhiteLabel}.scss";`,
          includePaths: [
            path.resolve(__dirname, 'node_modules'),
            path.resolve(__dirname, 'src/assets'),
          ],
          importer: [moduleSassImporter],
        },
      },
    },

    build: {
      outDir: 'dist',
      assetsDir: 'assets',
      sourcemap: mode === 'development',
      // Enable minification for better production builds
      minify: mode === 'production' ? 'esbuild' : false,
      // Target modern browsers for better optimization
      target: 'es2015',
      // CSS code splitting for better caching
      cssCodeSplit: true,
      rollupOptions: {
        output: {
          // Use hash-based naming for all chunks (no named chunks)
          entryFileNames: 'assets/js/[name]-[hash].js',
          chunkFileNames: 'assets/js/[hash].js',
          assetFileNames: assetInfo => {
            // Organize assets by type with hashes
            const info = assetInfo.name.split('.')
            const ext = info[info.length - 1]
            if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(ext)) {
              return 'assets/images/[hash][extname]'
            }
            if (/woff2?|eot|ttf|otf/i.test(ext)) {
              return 'assets/fonts/[hash][extname]'
            }
            if (/css/i.test(ext)) {
              return 'assets/css/[hash][extname]'
            }
            return 'assets/[hash][extname]'
          },
          // Simpler chunk strategy to avoid loading issues
          manualChunks(id) {
            if (id.includes('node_modules')) {
              // Extract package name more reliably
              const match = id.match(/node_modules\/(@[^/]+\/[^/]+|[^/]+)/)
              if (!match) return 'vendor'

              const packageName = match[1]

              // Large charting libraries
              if (packageName.includes('echarts') || packageName === 'zrender') {
                return 'echarts'
              }
              if (packageName.includes('apexcharts')) {
                return 'apexcharts'
              }

              // Excel/Office libraries
              if (packageName === 'xlsx' || packageName === 'exceljs') {
                return 'excel'
              }

              // PDF generation libs
              if (packageName === 'jspdf' ||
                  packageName === 'html2canvas' ||
                  packageName === 'jszip') {
                return 'pdf'
              }

              // Editor
              if (packageName === 'quill') {
                return 'quill'
              }

              // All other node_modules go to vendor
              return 'vendor'
            }
            return undefined
          },
        },
      },
      // Increase warning limit but monitor bundle size
      chunkSizeWarningLimit: 1000,
      // Improve build performance
      reportCompressedSize: mode === 'production',
      // Ensure proper module format
      commonjsOptions: {
        include: [/node_modules/],
        transformMixedEsModules: true,
      },
    },

    server: {
      port: 8080,
      open: true,
      cors: true,
    },

    optimizeDeps: {
      include: [
        'vue',
        'vue-router',
        'vuex',
        'axios',
        'bootstrap-vue',
        'portal-vue',
        'vue-echarts',
        'vuex-persist',
      ],
    },

    define: {
      'process.env': env,
      __VUE_OPTIONS_API__: true,
      __VUE_PROD_DEVTOOLS__: false,
    },
  }
})
