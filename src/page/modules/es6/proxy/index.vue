<template>
  <div>
  </div>
</template>

<script>
import { CreateProxy } from './index.js'
export default {
  name: '',

  data() {
    return {
      obj: {
        name: 'dd'
      },

      proxyHandle1: {
        get(target, property) {
          if (property === 'name') {
            return 'my name is ' + target[property]
            // 判断对象本身是否有该值
          } else if (target.hasOwnProperty(property)) {
            return target[property]
          } else {
            return '没有该属性'
          }
        },
        set(target, property, value) {
          if (value > 68) {
            throw Error('年龄太大了')
          } else if (value > 38) {
            target[property] = '中年人'
          } else {
            target[property] = value
          }
          return true
        }
      },
      proxy1: {}
    }
  },

  methods: {},
  created() {
    // 生成一个 proxy 实例
    this.proxy1 = new CreateProxy(this.obj, this.proxyHandle1).proxy1
    console.log(this.proxy1)
    // proxy 实例设置值
    this.proxy1.age = 58
    console.log(this.proxy1.age)
  }
}
</script>

<style lang='scss' scoped>
</style>
