export const clone = function(obj) {
  let target = Array.isArray(obj) ? [] : {}
  if (!obj) {
    return Object.prototype.toString.call(obj).slice(8, -1)
  }
  for (let key in obj) {
    let type = Object.prototype.toString.call(obj[key]).slice(8, -1)
    target[key] = (type === 'Object' || type === 'Array') ? clone(obj[key]) : obj[key]
  }
  return target
}
let hash = new WeakMap()
export const removeCycle = function (source) {
  if (Object.prototype.toString.call(source).slice(8, -1) !== 'Object') {
    return source
  }
  if (hash.has(source)) {
    return hash.get(source);
  }
  let target = Array.isArray(source) ? [] : {}
  hash.set(source, target)
  for (let key in source) {
    let type = Object.prototype.toString.call(source[key]).slice(8, -1)
    target[key] = (type === 'Object' || type === 'Array') ? removeCycle(source[key]) : source[key]
  }
  return target
}
