/**
 * 返回数字的阶层
 * @param {Number} number 数字
 * @return {Number} number
 * */
export function numberClass(number) {
  // 判断是否为数字，不是则返回-1
  if (isNaN(Number(number))) {
    return -1
  }
  if (number <= 1) {
    return 1
  } else {
    // 递归
    return number * numberClass(number - 1)
  }
}
