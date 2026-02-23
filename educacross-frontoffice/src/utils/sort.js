/**
 * Returns a list of ordered objects
 *
 * @param {Array} list Array list of data
 * @param {String} key Key name inside of object
 * @param {Boolean} desc Flag to sort descending or ascending
 * @returns {Array} Returns an ordered list
 * */
export default function sortObjectListByKey(list, key, desc = false) {
  try {
    return list.sort((a, b) => {
      if (desc) {
        if (a[key] < b[key]) {
          return 1
        }
        if (a[key] > b[key]) {
          return -1
        }
        return 0
      }
      if (a[key] > b[key]) {
        return 1
      }
      if (a[key] < b[key]) {
        return -1
      }
      return 0
    })
  } catch (error) {
    return list
  }
}
