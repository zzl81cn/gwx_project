class ProxyCache {
  constructor() {
    // 用于存放缓存
    this.cache = {}
    // 存放计算结果
    this.result = 0
  }
  // ...list 来
  getAddResult(...list) {
    for (let item of list) {
      this.result += item
    }
    return this.result
  }
  proxyAdd(...list) {
    console.log(this.cache, 'cache')
    const paramsString = list.join()
    if (paramsString in this.cache) {
      return this.cache[paramsString]
    }
    this.cache[paramsString] = this.getAddResult.apply(this, list)
    return this.cache[paramsString]
  }
}
export default ProxyCache
