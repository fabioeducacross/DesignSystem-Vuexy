// Original vue.config.js archived on migration to Vite
// ...this file was moved from project root to archive/vue-cli for safekeeping.
// Path: /archive/vue-cli/vue.config.js

const path = require('path')
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

module.exports = {
  publicPath: '/',
  css: {
    loaderOptions: {
      sass: {
        sassOptions: {
          includePaths: ['./node_modules', './src/assets'],
        },
        additionalData: (() => {
          const whiteLabel = process.env.VUE_APP_WHITELABEL?.toLowerCase() || 'educacross'
          const validWhiteLabels = ['educacross', 'seduc', 'superensino', 'somosplay']
          const safeWhiteLabel = validWhiteLabels.includes(whiteLabel) ? whiteLabel : 'educacross'
          return `@import "./src/assets/scss/whitelabel/${safeWhiteLabel}.scss";`
        })(),
      },
    },
  },
  configureWebpack: {
    // plugins: [new BundleAnalyzerPlugin()],
    output: {
      filename: '[name].[hash].js',
      chunkFilename: '[name].[chunkhash].js',
    },
    resolve: {
      alias: {
        '@themeConfig': path.resolve(__dirname, 'themeConfig.js'),
        '@core': path.resolve(__dirname, 'src/@core'),
        '@validations': path.resolve(__dirname, 'src/@core/utils/validations/validations.js'),
        '@axios': path.resolve(__dirname, 'src/libs/axios'),
        '@components': path.resolve(__dirname, 'src/layouts/components'),
        // Vue 2.7 has built-in Composition API, alias for packages expecting the external package
        '@vue/composition-api': 'vue',
      },
    },
    mode: process.env.NODE_ENV,
    devtool: process.env.NODE_ENV === 'development' ? 'source-map' : false,
    // optimization: {
    //   splitChunks: {
    //     cacheGroups: {
    //       vendors: {
    //         test: /[\\/]node_modules[\\/]/,
    //         priority: -10,
    //       },
    //       default: {
    //         minChunks: 2,
    //         priority: -20,
    //         reuseExistingChunk: true,
    //       },
    //     },
    //   },
    // },
  },

  chainWebpack: config => {
    config.module
      .rule('vue')
      .use('vue-loader')
      .loader('vue-loader')
      .tap(options => {
        // eslint-disable-next-line no-param-reassign
        options.transformAssetUrls = {
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
        }
        return options
      })
  },

  transpileDependencies: ['vue-echarts', 'resize-detector', 'vuex-persist', 'portal-vue'],
  integrity: false,
  pluginOptions: {
    lintOnSave: process.env.NODE_ENV !== 'production',
  },
}
