export default function debounce(fn, wait) {
  let timer
  return text => {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      if (typeof fn === 'function') {
        fn(text, true)
      }
    }, wait)
  }
}
