// 判断是否为对象或者数组
function isObject(value) {
  const type = Object.prototype.toString.call(value).slice(8, -1)
  return type === 'Object' || type === 'Array'
}
// 递归 clone对象和数组
export const clone = function(obj) {
  let target = Array.isArray(obj) ? [] : {}
  if (!obj) {
    return Object.prototype.toString.call(obj).slice(8, -1)
  }
  for (let key in obj) {
    target[key] = isObject(obj[key]) ? clone(obj[key]) : obj[key]
  }
  return target
}

// WeakMap只能用对象作为键名
let hash = new WeakMap()
// 递归 clone循环引用数据
export const removeCycle = function (source) {
  // 如果是传入的不是对象则停止,输出值
  if (Object.prototype.toString.call(source).slice(8, -1) !== 'Object') {
    return source
  }
  // 判断WeakMap数据中是否有该对象,如果有则说明是循环引用数据类型,则停止递归返回
  // 由于是循环引用数据 source是同一个对象,否则对象引用不同has返回的值是false
  if (hash.has(source)) {
    return hash.get(source);
  }
  let target = Array.isArray(source) ? [] : {}
  // 将对象作为键名存储到hash结构中
  hash.set(source, target)
  for (let key in source) {
    target[key] = isObject(source[key]) ? removeCycle(source[key]) : source[key]
  }
  return target
}

export const cloneLoop = function(value) {
  const root = {}
  const loopList = {
    parent: root,
    key: undefined,
    data: value
  }
  // while()
}
