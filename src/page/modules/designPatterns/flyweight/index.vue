<template>
  <div class="flyweight">
    <div @click="onCreateTeacher">查看老师</div>
    <div @click="debounceLog">debounceLog按钮</div>
    <div @click="throttleLog">throttleLog按钮</div>
    <div ref="box"
      class='flyweight__box'></div>
  </div>
</template>

<script>
import Learn from './index.js'
import { debounce } from 'throttle-debounce'
import { clearTimeout } from 'timers'
export default {
  name: 'flyweight',

  data() {
    return {
      timer: undefined
    }
  },

  methods: {
    throttle(method, scope) {
      if (this.timer) {
        clearTimeout(this.timer)
      }
      this.timer = setTimeout(() => {
        method.call(scope)
        this.timer = undefined
      }, 1000)
    },
    resizeChange() {
      console.log(document.body.clientWidth)
      this.$refs.box.style.height = document.body.clientWidth / 2 + 'px'
      this.$refs.box.style.width = document.body.clientWidth / 2 + 'px'
    },
    debounceLog() {
      debounce(1000, () => {
        console.log('执行debounce打印')
      })()
    },
    onCreateTeacher() {
      // 创建
      const learn = new Learn('2019年', 1001, 'guan')
      console.log(learn.getInfo())
      console.log('good')
    }
  },
  mounted() {
    window.onresize = () => {
      // this.resizeChange()

      this.throttle(this.resizeChange)
    }
  }
}
</script>

<style lang='scss' scoped>
.flyweight {
  &__box {
    background-color: #f66;
    width: 100px;
    height: 100px;
  }
}
</style>
