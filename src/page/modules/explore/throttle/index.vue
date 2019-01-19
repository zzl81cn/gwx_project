<template>
  <div class="flyweight">
    <input v-model="number"
      type="number"
      @input="onInputChange" />
    <div ref="box"
      class='flyweight__box'></div>
    <input v-model="value"
      type="text"
      @input="onDebounceInput">
  </div>
</template>

<script>
import { throttle, debounce } from './throttle.js'
export default {
  name: '',

  data() {
    return {
      // 使用throttle来节流时传入需要执行的函数、间隔时间
      // throttle用到b包并且返回一个函数,在返回函数中修改存储的变量 previous用来判断是否该执行传入函数

      // 生成input值变化的节流函数
      handle: throttle(this.resizeChange, 1000),
      // 生成input值变化的防抖函数
      debounceHandle: debounce(this.debounceLog, 1000),
      // 生成滚动的节流函数
      scrollHandle: throttle(this.judegeBottom, 500),
      number: 50,
      value: '',
      time: 0
    }
  },

  methods: {
    onDebounceInput() {
      this.debounceHandle()
    },
    onInputChange() {
      this.handle()
    },
    debounceLog() {
      console.log('打印value值 : ' + this.value)
    },
    resizeChange() {
      // 记录每次执行函数时间的间隔
      const interval = new Date().getTime() - this.time
      // 记录上一次执行函数的时间
      this.time = new Date().getTime()
      // 如果不停触发throttle函数,每次执行时间的间隔相同
      console.log('number', this.number, interval)
      this.$refs.box.style.height = this.number + 'px'
      this.$refs.box.style.width = this.number + 'px'
    },
    judegeBottom() {
      const scrollTop = document.documentElement.scrollTop
      const clientHeight = document.body.clientHeight
      const scrollHeight = document.documentElement.scrollHeight
      console.log(document.documentElement.scrollTop)
      if (scrollHeight - scrollTop - clientHeight < 50) {
        console.log('触底了')
      }
    }
  },
  mounted() {
    window.addEventListener('scroll', this.scrollHandle)
  }
}
</script>
<style lang='scss' scoped>
.flyweight {
  height: 1000px;
  &__box {
    background-color: #f66;
    width: 100px;
    height: 100px;
  }
}
</style>
