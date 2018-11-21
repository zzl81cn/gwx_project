/**
 * @param {Array} arr 递归方法
 */
export function twoPoint(arr, target, first, last) {
  if (first === last) {
    return arr[first] === target ? first : -1
  } else {
    const mid = Math.floor((last + first) / 2)
    // 当起始和结束的数组项长度为2时 判断起始和结束是否为目标值
    if (last - first === 1) {
      if (arr[first] === target) {
        return first
      }
      if (arr[last] === target) {
        return last
      }
    }
    if (arr[mid] === target) {
      if (twoPoint(arr, target, first, mid) === -1) {
        return mid
      } else {
        return twoPoint(arr, target, first, mid)
      }
    }
    if (arr[mid] > target) {
      return twoPoint(arr, target, first, mid)
    }
    if (arr[mid] < target) {
      return twoPoint(arr, target, mid, last)
    }
    return -1
  }
}
/**
 * @param{Array} arr 需要平铺展开的数组 递归
 */
export function expandArray(arr) {
  let itemList = []
  arr.forEach(item => {
    itemList = itemList.concat(Array.isArray(item) ? expandArray(item) : item)
  })
  return itemList
}
