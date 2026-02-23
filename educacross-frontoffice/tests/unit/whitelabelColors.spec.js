const whitelabelColorsModule = require('../../src/consts/whitelabelColors.config.cjs')
const whitelabelColorsWrapper = require('../../src/consts/whitelabelColors.config.js')

// Wrapper default export resolution
const whitelabelColorsFromWrapper =
  whitelabelColorsWrapper.default || whitelabelColorsWrapper.whitelabelColors

describe('whitelabelColors.config interop', () => {
  it('CJS source exports expected keys', () => {
    expect(Object.keys(whitelabelColorsModule).sort()).toEqual(
      ['educacross', 'seduc', 'somosplay', 'superensino'].sort(),
    )
  })

  it('Wrapper resolves to same object (reference equality)', () => {
    expect(whitelabelColorsFromWrapper).toBe(whitelabelColorsModule)
  })

  it('superensino primary color matches expected value', () => {
    expect(whitelabelColorsFromWrapper.superensino.primary).toBe('#0089CA')
  })

  it('educacross exists and is object', () => {
    expect(typeof whitelabelColorsFromWrapper.educacross).toBe('object')
  })
})
