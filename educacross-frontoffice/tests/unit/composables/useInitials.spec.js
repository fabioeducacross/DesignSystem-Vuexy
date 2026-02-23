import useInitials from '@/@core/mixins/ui/avatar.js'

describe('useInitials', () => {
  let getInitials

  beforeEach(() => {
    ;({ getInitials } = useInitials())
  })

  test('should return empty string for null input', () => {
    expect(getInitials(null)).toBe('')
  })

  test('should return empty string for undefined input', () => {
    expect(getInitials(undefined)).toBe('')
  })

  test('should return empty string for an empty string input', () => {
    expect(getInitials('')).toBe('')
  })

  test('should return the first letter capitalized for a single-word name', () => {
    expect(getInitials('john')).toBe('J')
    expect(getInitials('doe')).toBe('D')
  })

  test('should return the first letters of first and last name capitalized for a two-word name', () => {
    expect(getInitials('John Doe')).toBe('JD')
    expect(getInitials('jane smith')).toBe('JS')
  })

  test('should handle names with multiple middle names, returning first and last initials', () => {
    expect(getInitials('Peter James William Smith')).toBe('PS')
    expect(getInitials('Maria da Silva Santos')).toBe('MS')
  })

  test('should handle names with leading/trailing spaces', () => {
    expect(getInitials('  John Doe  ')).toBe('JD')
    expect(getInitials(' John ')).toBe('J')
  })

  test('should handle names with special characters (if expected behavior is to ignore)', () => {
    expect(getInitials('João Silva')).toBe('JS')
    expect(getInitials('ana-luiza pereira')).toBe('AP')
  })
})
