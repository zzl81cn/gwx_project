// 判断是否为对象或者数组
function isObject(value) {
  const type = Reflect.toString(value).slice(8, -1)
  return type === 'Object' || type === 'Array'
}
// 递归 clone对象和数组
export const clone = function(obj) {
  if (!isObject(obj)) {
    return obj
  }
  let target = Array.isArray(obj) ? [] : {}
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
  if (Reflect.toString(source).slice(8, -1) !== 'Object') {
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

// 循环clone的方式
/**
 * 用循环遍历一棵树，需要借助一个栈，栈里面存储下一个需要拷贝的节点
 * 首先我们往栈里放入种子数据，key用来存储放哪一个父元素的那一个子元素拷贝对象
 * 然后遍历当前节点下的子元素，如果是对象就放到栈里，否则直接拷贝
 * 当栈为空时就遍历完了
*/
export const cloneLoop = function(value) {
  const root = {}
  // 存储需要遍历的对象
  const loopList = [ {
    parent: root,
    key: undefined,
    data: value
  }]
  while (loopList.length > 0) {
    // 遍历栈的最后一项
    const node = loopList.pop()
    // 遍历当前元素的父级
    const parent = node.parent
    // 遍历当前元素的key值
    const key = node.key
    // 遍历当前元素的数据
    const data = node.data
    // 默认拷贝父级 res和root保持同一个引用
    let res = parent
    // 如果key有值时(有子节点时)则拷贝子元素
    if (key !== undefined) {
      // a = b = {} a,b都为变量 都会被赋值{} 可以看作先执行 b = {} 运算完结果为 {} 然后赋值给a
      res = parent[key] = {}
    }
    for (let k in data) {
      // 如果为对象则将对象推到 loopList 数组中继续遍历
      if (isObject(data[k])) {
        loopList.push({
          parent: res,
          key: k,
          data: data[k]
        })
      } else {
        res[k] = data[k]
      }
    }
  }
  return root
}
