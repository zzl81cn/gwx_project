# 一星期后的自测
## 递归拷贝
### 发现
*  之前对象拷贝没有考虑清楚非对象这一块，先返回不是对象而不是返回没有值的
* 更换代码位置，当值不是对象的情况下就不需要去判断对象类型了。
* 由于是递归方式值，在遍历子数据前判断weakMap则返回之前保存的值
是否有该对象值，如果有就返回
```
if (!isObject(value)) {
    return value
  }
```
### 代码
```
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
```

## 循环深拷贝
### 发现
* 使用对象结构赋值的方式代码更加简洁
```
let {parent: res, key, value} = currentValue
```
* 理清了res为什么会和root指向同一引用
* 添加非对象的判断
* 理解针对循环引用时使用weakMap数据，在遍历每个子对象时判断是否已经添加过这个数据，如果已添加则停止向栈数组中添加遍历对象，这样就终止了循环遍历。
```
export function interatorClone(value) {
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
    for (let k in value) {
      if (isObject(value[k])) {
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
      } else {
        res[k] = value[k]
      }
    }
  }
  return root
}
```