// Original babel.config.js archived on migration to Vite
// ...this file was moved from project root to archive/vue-cli for safekeeping.
// Path: /archive/vue-cli/babel.config.js

module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        modules: false,
        targets: {
          browsers: ['> 1%', 'last 2 versions', 'not dead'],
        },
      },
    ],
  ],
}
