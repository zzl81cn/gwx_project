<template>
  <div ref="wrap">
    文字
  </div>
</template>

<script>
import { Super1 } from './extend.js'
import { interatorClone } from './test.js'
export default {
  name: '',

  data() {
    return {
      obj: {
        a: 12,
        parent: {
          mother: 'cc',
          father: 'dd',
          son: {
            age: 14
          }
        }
      },
      obj1: {},
      str: null,
      str1: undefined
    }
  },

  methods: {
    onResizeChange() {
      Object.assign(this.$refs.wrap.style, {
        background: 'red',
        fontSize: '20px'
      })
    },
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
    // this.sub1()
    this.obj1 = interatorClone(this.obj)
    this.str1 = interatorClone(this.str)
  },
  mounted() {
    this.onResizeChange()
  }
}
</script>

<style lang='scss' scoped>
</style>
