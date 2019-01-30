<template>
  <div ref="wrap">
    文字
  </div>
</template>

<script>
import { Super1, Child, Parent } from './extend.js'
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
      str1: undefined,
      instance: {}
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
      console.log(Reflect.getPrototypeOf(this.instance))
    }
  },
  created() {
    // this.sub1()
    this.obj1 = interatorClone(this.obj)
    this.str1 = interatorClone(this.str)
  },
  mounted() {
    this.onResizeChange()
    this.instance = new Child('guan', 29)
    console.log('instance', this.instance)
    // 这里 getName 是通过 this.instance来调用的，所以其中的this指向实例对象
    console.log(this.instance.age)

    console.log(Parent)
    console.log(Reflect.getPrototypeOf(Child))

    console.log(
      '是否继承于parent',
      Reflect.getPrototypeOf(Child) === Parent.proto
    )
  }
}
</script>

<style lang='scss' scoped>
</style>
