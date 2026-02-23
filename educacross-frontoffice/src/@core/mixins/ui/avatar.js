export default function useInitials() {
  const getInitials = name => {
    if (name) {
      const formattedInitials = name.trim().split(' ').filter(Boolean)
      return formattedInitials.length === 1
        ? formattedInitials[0].charAt(0).toUpperCase()
        : formattedInitials[0].charAt(0).toUpperCase() +
            formattedInitials[formattedInitials.length - 1].charAt(0).toUpperCase()
    }
    return ''
  }

  return {
    getInitials,
  }
}
