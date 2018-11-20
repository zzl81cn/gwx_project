/**
 * @param {Array} arr
 */
export function twoPoint(arr, target, first, last) {
  if (first === last) {
    return arr[first] === target ? first : -1
  } else {
    console.log(2)

    const mid = (last + first) / 2
    if (arr[mid] === target) {
      if (twoPoint(arr, target, first, mid) === -1) {
        return mid
      } else {
        return twoPoint(arr, target, first, mid)
      }
    }
    if (arr[mid] > target) {
      console.log(arr[mid], target, '大于')

      return twoPoint(arr, target, first, mid)
    }
    if (arr[mid] < target) {
      console.log(arr[mid], target, '小于')

      return twoPoint(arr, target, mid, last)
    }
    return -1
  }
}
