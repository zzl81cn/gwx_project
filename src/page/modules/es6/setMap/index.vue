<template>
  <div class="map">
    <div class="map__button"
      :class="{'map__button--blue':isBlue,'map__button--yellow':isYellow}"
      @click="onButtonClick">按钮</div>
    <div class="map__button"
      @click="onExpButtonClick">正则匹配</div>
    <div class="map__button"
      @click="onDefalutButtonClick(0)">有设置默认值</div>
  </div>
</template>

<script>
// Map数据格式 定义 对象作为键值 函数作为键值 每个子项都是一个数组形式
const USER_TYPE = new Map([
  [
    { user: 'teacher', color: 'blue' },
    // 接受vue实例作为对象，这样就可以取到实例中的数据和方法
    _this => {
      _this.isBlue = true
    }
  ],
  [
    { user: 'student', color: 'yellow' },
    // 接受vue实例作为对象，这样就可以取到实例中的数据和方法
    _this => {
      _this.isYellow = true
    }
  ]
])

// 使用map 结构定义正则规则 已经匹配到对应条件对应的执行函数
const USER_EXP = new Map([
  [
    /^teacher_\w/,
    _this => {
      _this.successCallback()
    }
  ]
])
// 设置匹配正则，正则条件如果有交集会匹配到多个子项
// /false_[^58]$/表示匹配到最后以为非58结尾的，位数要相同否则会匹配不到
const SET_DEFAULT_STATUS = new Map([
  [/true_[1-3]$/, () => console.log('我是真的情况，1-3的情况')],
  [/true_[^123]$/, () => console.log('我是真的情况，非1-3')],
  [/false_[58]$/, () => console.log('为假的情况，5,8')],
  [/false_[^58]$/, () => console.log('其他情况')]
])
export default {
  name: 'setMap',
  data() {
    return {
      type: 'teacher',
      color: 'blue',
      prompt: '成功获取数据',
      isBlue: false,
      isYellow: false,
      isTeacher: false
    }
  },

  methods: {
    onExpButtonClick() {
      // 筛选出符合正则条件的子项(是一个数组)
      const expList = [...USER_EXP].filter(([exp]) => {
        // 使用 正则实例对象的test方法返回一个布尔值 /cat/.test('cats and dogs')
        return exp.test(this.type + '_' + this.color)
      })
      // 执行匹配成功子项中定义的函数
      expList.forEach(([exp, fn]) => {
        Reflect.apply(fn, this)
      })
    },
    onButtonClick() {
      // 将 Map数据结构转化成数组 [obj, color] = [{user,color},()=>{}] filter的回调中数组作为第一个形参需要写出 ([obj, color])
      // 筛选出当前条件 符合Map对象中设定的条件和回调函数， 也就是筛选出数组中的一个子项
      const typeList = [...USER_TYPE].filter(([obj]) => {
        return obj.user === this.type && obj.color === this.color
      })
      // 将符合条件的数组遍历 并执行设定的方法
      typeList.forEach(([key, value]) => {
        // 改变方法中的this指向 并且可以传入参数,如果需要改变多个参数,可以用apply方法
        Reflect.apply(this)
      })
    },
    successCallback() {
      console.log(this.prompt)
    },
    onDefalutButtonClick(type) {
      const typeList = [...SET_DEFAULT_STATUS].filter(([reg]) => {
        return reg.test(this.isTeacher + '_' + type)
      })
      typeList.forEach(([reg, fn]) => {
        Reflect.apply(this)
      })
    }
  }
}
</script>

<style lang='scss' scoped>
.map {
  &__button {
    width: 100px;
    text-align: center;
    border-radius: 10px;
    line-height: 30px;
    background-color: #f66;
    color: #fff;
    cursor: pointer;
    &--blue {
      background-color: blue;
    }
    &--yellow {
      background: yellow;
    }
  }
}
</style>
