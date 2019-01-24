<template>
  <div>
  </div>
</template>

<script>
import { Super1 } from './extend.js'
export default {
  name: '',

  data() {
    return {}
  },

  methods: {
    // 父类的一个实例赋给子类的原型
    sub1() {
      class Sub extends Super1 {
        constructor(value) {
          super(value)
        }
        getParent() {
          console.log(super.age)
        }
      }
      const instance = new Sub('zs')
      instance.getParent()
      console.log(Object.getPrototypeOf(instance))
    }
  },
  created() {
    this.sub1()
  }
}
</script>

<style lang='scss' scoped>
</style>
