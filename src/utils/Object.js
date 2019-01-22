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
