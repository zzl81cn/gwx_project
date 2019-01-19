<template>
  <div class="flyweight">
    <div @click="onCreateTeacher">查看老师</div>
    <div @click="debounceLog">debounceLog按钮</div>
    <div ref="box"
      class='flyweight__box'></div>
    <input @input="onInputChange" />
  </div>
</template>

<script>
import Learn from './index.js'
import { debounce } from 'throttle-debounce'
// import { throttle } from './throttle.js'
export default {
  name: 'flyweight',

  data() {
    return {
      timer: undefined
    }
  },

  methods: {
    resizeChange() {
      console.log('clientWidth', document.body.clientWidth)
      this.$refs.box.style.height = document.body.clientWidth / 8 + 'px'
      this.$refs.box.style.width = document.body.clientWidth / 8 + 'px'
    },
    onInputChange() {
      this.handle()
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
    window.addEventListener('resize', this.handle())
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
