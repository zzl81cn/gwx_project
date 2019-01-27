let weakMap = new WeakMap()
export function copy(value) {
  if (!value || !isObject(value)) {
    return value
  }
    let result = getType(value) === 'Object' ? {} : []
    if (weakMap.has(value)) {
      return weakMap.get(value)
    } else {
      weakMap.set(value, result)
    }
    for (let key in value) {
      result[key] = isObject(value[key]) ? copy(value[key]) : value[key]
    }
    return result
}
function isObject(value) {
  return getType(value) === 'Object' || getType(value) === 'Array'
}
function getType(value) {
  return Object.prototype.toString.call(value).slice(8, -1)
}
export function interatorClone(value) {
  let weakMap = new WeakMap()
  let root = {}
  let stackList = [
    {
      parent: root,
      key: undefined,
      value
    }
  ]
  while (stackList.length > 0) {
  let currentValue = stackList.pop()
  /**
   * 通过对象结构赋值的方式取到需要遍历对象下的属性
   * 在第一次遍历的时候通过res和root建立同一指针引用的关系
   */
  let {parent: res, key, value} = currentValue
    if (key !== undefined) {
      // 将父级对象下的属性和res 指向同一指针 这样修改res对象的数据都会同样应用在父级上
      res = currentValue.parent[key] = {}
    }
    if (!isObject(value)) {
      return value
    }
    for (let k in value) {
      if (isObject(value[k])) {
        // 如果weakMap数据中没有该值则则推向遍历数组，否则返回该值
        if (weakMap.has(value)) {
          res[k] = weakMap.get(value)
        } else {
        /**
         * 如果子项中还存在这对象的话将其推入需要遍历的数组
         * 通过parent属性将父级的引用地址保存
         * 下次res取的值还是同一地址下数据或引用地址
         */
          stackList.push({
            parent: res,
            key: k,
            value: value[k]
          })
          weakMap.set(value, res)
        }
      } else {
        res[k] = value[k]
      }
    }
  }
  return root
}
