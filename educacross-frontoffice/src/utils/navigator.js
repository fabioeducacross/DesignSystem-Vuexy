const dataos = [
  { name: 'Windows Phone', value: 'Windows Phone' },
  { name: 'Windows', value: 'Windows NT 10.0;', version: '10.0' },
  { name: 'Windows', value: 'Windows NT 6.3;', version: '8.1' },
  { name: 'Windows', value: 'Windows NT 6.2;', version: '8' },
  { name: 'Windows', value: 'Windows NT 6.1;', version: '7' },
  { name: 'iPhone', value: 'iPhone' },
  { name: 'iPad', value: 'iPad' },
  { name: 'Kindle', value: ' Kindle/' },
  { name: 'Android', value: 'Linux; Android' },
  { name: 'PlayBook', value: 'PlayBook;' },
  { name: 'BlackBerry', value: 'BlackBerry;' },
  { name: 'Macintosh', value: 'Macintosh;' },
  {
    name: 'Linux',
    value: ['X11; Linux', 'X11; Ubuntu;', 'X11; Ubuntu; Linux'],
  },
  { name: 'Palm', value: 'Palm' },
  { name: 'Chrome OS', value: 'X11; CrOS' },
]
const getOS = () => {
  const ua = navigator.userAgent

  return (
    dataos.find(os => {
      if (os.value instanceof Array) {
        return os.value.some(value => ua.indexOf(value) !== -1)
      }
      return ua.indexOf(os.value) !== -1
    }) || { name: 'unknown', value: 'unknown' }
  )
}

export { getOS }
